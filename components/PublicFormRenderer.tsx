'use client';

import { useState } from 'react';
import api from '@/lib/api';

interface Field {
    id: string;
    type: string;
    label: string;
    required: boolean;
    options?: string[];
}

interface Form {
    _id: string;
    title: string;
    fields: Field[];
}

interface PublicFormRendererProps {
    initialForm: Form;
}

export default function PublicFormRenderer({ initialForm }: PublicFormRendererProps) {
    const [responses, setResponses] = useState<Record<string, any>>({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (fieldId: string, value: any) => {
        setResponses({ ...responses, [fieldId]: value });
    };

    const handleCheckboxChange = (fieldId: string, option: string, checked: boolean) => {
        const current = responses[fieldId] || [];
        if (checked) {
            setResponses({ ...responses, [fieldId]: [...current, option] });
        } else {
            setResponses({ ...responses, [fieldId]: current.filter((v: string) => v !== option) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate required fields
        const missingFields = initialForm.fields
            .filter(field => field.required && !responses[field.id])
            .map(field => field.label);

        if (missingFields.length > 0) {
            setError(`Please fill in required fields: ${missingFields.join(', ')}`);
            return;
        }

        setSubmitting(true);

        try {
            const formattedResponses = initialForm.fields.map(field => ({
                fieldId: field.id,
                fieldLabel: field.label,
                value: responses[field.id] || '',
            }));

            const response = await api.post(`/submissions/${initialForm._id}`, {
                responses: formattedResponses,
            });

            if (response.data.success) {
                setSuccess(true);
                setResponses({});
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit form');
        } finally {
            setSubmitting(false);
        }
    };

    const renderField = (field: Field) => {
        const value = responses[field.id] || '';

        switch (field.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg focus:ring-2 focus:ring-[#B026FF] focus:border-[#B026FF] transition-all outline-none text-white placeholder-slate-400"
                        required={field.required}
                    />
                );

            case 'textarea':
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg focus:ring-2 focus:ring-[#B026FF] focus:border-[#B026FF] transition-all outline-none text-white placeholder-slate-500 min-h-[100px]"
                        required={field.required}
                    />
                );

            case 'dropdown':
                return (
                    <select
                        value={value}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg focus:ring-2 focus:ring-[#B026FF] focus:border-[#B026FF] transition-all outline-none text-white"
                        required={field.required}
                    >
                        <option value="">Select an option</option>
                        {field.options?.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );

            case 'checkbox':
                return (
                    <div className="space-y-2">
                        {field.options?.map((option, index) => (
                            <label key={index} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={(value || []).includes(option)}
                                    onChange={(e) => handleCheckboxChange(field.id, option, e.target.checked)}
                                    className="rounded bg-[#FFFFFF0D] border-[#FFFFFF1A] text-[#B026FF] focus:ring-[#B026FF]"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'radio':
                return (
                    <div className="space-y-2">
                        {field.options?.map((option, index) => (
                            <label key={index} className="flex items-center gap-2 text-white hover:text-white transition-colors cursor-pointer">
                                <input
                                    type="radio"
                                    name={field.id}
                                    value={option}
                                    checked={value === option}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    required={field.required}
                                    className="bg-[#FFFFFF0D] border-[#FFFFFF1A] text-[#B026FF] focus:ring-[#B026FF]"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'date':
                return (
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg focus:ring-2 focus:ring-[#B026FF] focus:border-[#B026FF] transition-all outline-none text-white"
                        required={field.required}
                    />
                );

            default:
                return null;
        }
    };

    if (success) {
        return (
            <div className="bg-[#FFFFFF0D] backdrop-blur-md border border-[#FFFFFF1A] rounded-2xl p-8 max-w-md text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-2 text-white">Thank You!</h2>
                <p className="text-slate-100 mb-6">Your response has been submitted successfully.</p>
                <button
                    onClick={() => setSuccess(false)}
                    className="bg-gradient-to-r from-[#B026FF] to-[#4D4DFF] text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all"
                >
                    Submit Another Response
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#FFFFFF0D] backdrop-blur-md border border-[#FFFFFF1A] rounded-2xl p-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2">{initialForm.title}</h1>
            <p className="text-slate-100 mb-8">Please fill out the form below</p>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {initialForm.fields.map((field) => (
                    <div key={field.id}>
                        <label className="block text-sm font-medium text-white mb-2">
                            {field.label}
                            {field.required && <span className="text-red-400 ml-1">*</span>}
                        </label>
                        {renderField(field)}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-[#B026FF] to-[#4D4DFF] text-white py-3.5 px-6 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_30px_-5px_rgba(176,38,255,0.5)]"
                >
                    {submitting ? 'Submitting...' : 'Submit Form'}
                </button>
            </form>
        </div>
    );
}
