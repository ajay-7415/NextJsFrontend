'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';

interface Form {
    _id: string;
    title: string;
    uniqueUrl: string;
    fields: any[];
    createdAt: string;
}

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }

        if (user) {
            fetchForms();
        }
    }, [user, authLoading]);

    const fetchForms = async () => {
        try {
            const response = await api.get('/forms');
            if (response.data.success) {
                setForms(response.data.forms);
            }
        } catch (err) {
            setError('Failed to fetch forms');
        } finally {
            setLoading(false);
        }
    };

    const deleteForm = async (id: string) => {
        if (!confirm('Are you sure you want to delete this form?')) return;

        try {
            await api.delete(`/forms/${id}`);
            setForms(forms.filter(f => f._id !== id));
        } catch (err) {
            alert('Failed to delete form');
        }
    };

    const copyToClipboard = (url: string, id: string) => {
        const fullUrl = `${window.location.origin}/forms/public/${url}`;
        navigator.clipboard.writeText(fullUrl);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0C15]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#B026FF]/30 border-t-[#B026FF] rounded-full animate-spin"></div>
                    <p className="text-white font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0C15] py-8 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#B026FF]/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-[#4D4DFF]/10 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Dashboard</h1>
                        <p className="text-slate-100 mt-1">Manage your forms and view submissions</p>
                    </div>

                    <Link
                        href="/forms/new"
                        className="group flex items-center gap-2 px-5 py-2.5 bg-white text-[#0B0C15] rounded-xl hover:bg-slate-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)] transform hover:scale-105"
                    >
                        <span className="text-xl leading-none group-hover:rotate-90 transition-transform duration-300">+</span>
                        <span className="font-bold">Create New Form</span>
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-500/10 border-l-4 border-red-500 text-red-200 p-4 mb-6 rounded-r backdrop-blur-sm">
                        <p>{error}</p>
                    </div>
                )}

                {forms.length === 0 ? (
                    <div className="bg-[#FFFFFF0D] rounded-2xl p-12 text-center border border-[#FFFFFF1A] border-dashed backdrop-blur-md">
                        <div className="w-20 h-20 bg-[#FFFFFF0D] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl border border-[#FFFFFF1A]">
                            📝
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No forms yet</h3>
                        <p className="text-slate-100 mb-8 max-w-md mx-auto">
                            Create your first form to start collecting responses from your users.
                        </p>
                        <Link
                            href="/forms/new"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-[#B026FF] to-[#4D4DFF] hover:opacity-90 transition-all shadow-[0_0_20px_-5px_rgba(176,38,255,0.4)]"
                        >
                            Create Form
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {forms.map((form) => (
                            <div key={form._id} className="bg-[#FFFFFF0D] rounded-2xl shadow-lg border border-[#FFFFFF1A] p-6 transition-all duration-300 group hover:border-[#B026FF]/50 hover:bg-[#FFFFFF14] backdrop-blur-md relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#B026FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <h3 className="text-lg font-bold text-white truncate pr-2 group-hover:text-[#B026FF] transition-colors">
                                        {form.title}
                                    </h3>
                                    <span className="bg-[#FFFFFF1A] text-white text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap border border-[#FFFFFF0D]">
                                        {form.fields.length} fields
                                    </span>
                                </div>

                                <p className="text-slate-100 text-sm mb-6 relative z-10">
                                    Created on {new Date(form.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>

                                <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
                                    <Link
                                        href={`/forms/${form._id}/edit`}
                                        className="flex justify-center items-center px-3 py-2 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg text-sm font-medium text-white hover:bg-[#FFFFFF1A] hover:border-[#FFFFFF26] transition-colors"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <Link
                                        href={`/forms/${form._id}/submissions`}
                                        className="flex justify-center items-center px-3 py-2 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg text-sm font-medium text-white hover:bg-[#FFFFFF1A] hover:border-[#FFFFFF26] transition-colors"
                                    >
                                        📊 Results
                                    </Link>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-[#FFFFFF1A] relative z-10">
                                    <button
                                        onClick={() => copyToClipboard(form.uniqueUrl, form._id)}
                                        className={`flex-1 flex justify-center items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${copiedId === form._id
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                            : 'bg-[#FFFFFF05] text-slate-100 hover:bg-[#FFFFFF14] hover:text-white border border-transparent'
                                            }`}
                                    >
                                        {copiedId === form._id ? '✓ Copied!' : '🔗 Share Link'}
                                    </button>
                                    <button
                                        onClick={() => deleteForm(form._id)}
                                        className="w-10 flex justify-center items-center text-slate-100 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                        title="Delete Form"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
