'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import PublicFormRenderer from '@/components/PublicFormRenderer';

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

export default function PublicFormPage() {
    const params = useParams();
    const uniqueUrl = params.id as string;
    const [form, setForm] = useState<Form | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await api.get(`/forms/public/${uniqueUrl}`);
                if (response.data.success) {
                    setForm(response.data.form);
                }
            } catch (err) {
                setError('Form not found');
            } finally {
                setLoading(false);
            }
        };

        fetchForm();
    }, [uniqueUrl]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0C15]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#B026FF]/30 border-t-[#B026FF] rounded-full animate-spin"></div>
                    <div className="text-xl text-white">Loading form...</div>
                </div>
            </div>
        );
    }

    if (error || !form) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0C15]">
                <div className="bg-[#FFFFFF0D] backdrop-blur-md border border-[#FFFFFF1A] rounded-2xl p-8 max-w-md text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold mb-2 text-white">Form Not Found</h2>
                    <p className="text-slate-100">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0C15] py-12 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#B026FF]/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-[#4D4DFF]/10 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                <PublicFormRenderer initialForm={form} />
            </div>
        </div>
    );
}
