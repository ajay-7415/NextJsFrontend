'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';

interface Submission {
    _id: string;
    responses: Array<{
        fieldLabel: string;
        value: any;
    }>;
    submittedAt: string;
}

// SSR - Server-Side Rendering for real-time data
export default function SubmissionsPage() {
    const router = useRouter();
    const params = useParams();
    const formId = params.id as string;
    const { user } = useAuth();

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [formTitle, setFormTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            fetchSubmissions();
        }
    }, [user, formId]);

    const fetchSubmissions = async () => {
        try {
            // Fetch form details
            const formResponse = await api.get(`/forms/${formId}`);
            if (formResponse.data.success) {
                setFormTitle(formResponse.data.form.title);
            }

            // Fetch submissions
            const response = await api.get(`/submissions/form/${formId}`);
            if (response.data.success) {
                setSubmissions(response.data.submissions);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load submissions');
        } finally {
            setLoading(false);
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
                <div className="text-xl text-white">Please login to view submissions</div>
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

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="mb-8">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="text-[#B026FF] hover:text-[#9020DD] mb-4 transition-colors"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2">Form Submissions</h1>
                    <p className="text-slate-100">{formTitle}</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
                        {error}
                    </div>
                )}

                {submissions.length === 0 ? (
                    <div className="bg-[#FFFFFF0D] backdrop-blur-md border border-[#FFFFFF1A] rounded-2xl text-center py-12">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-semibold mb-2 text-white">No submissions yet</h3>
                        <p className="text-slate-100">Share your form to start collecting responses</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <p className="text-slate-100">
                                Total submissions: <span className="font-semibold text-white">{submissions.length}</span>
                            </p>
                        </div>

                        {submissions.map((submission, index) => (
                            <div key={submission._id} className="bg-[#FFFFFF0D] backdrop-blur-md border border-[#FFFFFF1A] rounded-2xl p-6 hover:border-[#B026FF]/30 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-semibold text-white">Submission #{submissions.length - index}</h3>
                                    <span className="text-sm text-slate-200">
                                        {new Date(submission.submittedAt).toLocaleString()}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {submission.responses.map((response, idx) => (
                                        <div key={idx} className="border-l-4 border-[#B026FF]/50 pl-4">
                                            <p className="text-sm font-medium text-slate-100 mb-1">
                                                {response.fieldLabel}
                                            </p>
                                            <p className="text-white">
                                                {Array.isArray(response.value)
                                                    ? response.value.join(', ')
                                                    : response.value || '(No response)'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
