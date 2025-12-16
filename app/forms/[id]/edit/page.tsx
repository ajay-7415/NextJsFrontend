'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import FormBuilder from '@/components/FormBuilder';
import api from '@/lib/api';

export default function EditFormPage() {
    const router = useRouter();
    const params = useParams();
    const formId = params.id as string;
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [fields, setFields] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            fetchForm();
        }
    }, [user, formId]);

    const fetchForm = async () => {
        try {
            const response = await api.get(`/forms/${formId}`);
            if (response.data.success) {
                const form = response.data.form;
                setTitle(form.title);
                setFields(form.fields);
            }
        } catch (err) {
            setError('Failed to load form');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!title.trim()) {
            setError('Please enter a form title');
            return;
        }

        if (fields.length === 0) {
            setError('Please add at least one field');
            return;
        }

        setSaving(true);
        setError('');

        try {
            // Add order to fields
            const fieldsWithOrder = fields.map((field, index) => ({
                ...field,
                order: index
            }));

            const response = await api.put(`/forms/${formId}`, { title, fields: fieldsWithOrder });
            if (response.data.success) {
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update form');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0C15]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#B026FF]/30 border-t-[#B026FF] rounded-full animate-spin"></div>
                    <div className="text-xl text-white">Loading...</div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0C15]">
                <div className="text-xl text-white">Please login to edit forms</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0C15] py-8 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#B026FF]/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-[#4D4DFF]/10 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2">Edit Form</h1>
                    <p className="text-slate-100">Update your form fields and settings</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
                        {error}
                    </div>
                )}

                <div className="bg-[#FFFFFF0D] backdrop-blur-md border border-[#FFFFFF1A] rounded-2xl p-6 mb-6">
                    <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                        Form Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg focus:ring-2 focus:ring-[#B026FF] focus:border-[#B026FF] transition-all outline-none text-white placeholder-slate-400"
                        placeholder="e.g., Contact Form, Survey, Registration"
                    />
                </div>

                <FormBuilder fields={fields} setFields={setFields} />

                <div className="flex gap-4 mt-8">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 bg-gradient-to-r from-[#B026FF] to-[#4D4DFF] text-white py-3.5 px-6 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_30px_-5px_rgba(176,38,255,0.5)]"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-[#FFFFFF1A] transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
