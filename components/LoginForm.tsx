'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#FFFFFF0D] backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_40px_-10px_rgba(176,38,255,0.3)] w-full max-w-md relative z-10 border border-[#FFFFFF1A]">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                    Welcome Back
                </h1>
                <p className="text-slate-300 mt-2">Sign in to continue to your dashboard</p>
            </div>

            {error && (
                <div className="bg-red-500/10 border-l-4 border-red-500 text-red-200 p-4 mb-6 rounded-r backdrop-blur-sm">
                    <p className="text-sm font-medium">Error</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-200 mb-1.5">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg focus:ring-2 focus:ring-[#B026FF] focus:border-[#B026FF] transition-all outline-none text-white placeholder-slate-500"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-200 mb-1.5">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg focus:ring-2 focus:ring-[#B026FF] focus:border-[#B026FF] transition-all outline-none text-white placeholder-slate-500"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#B026FF] to-[#4D4DFF] text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_30px_-5px_rgba(176,38,255,0.5)]"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                        </span>
                    ) : 'Sign In'}
                </button>
            </form>

            <p className="mt-8 text-center text-slate-400 text-sm">
                Don't have an account?{' '}
                <Link href="/register" className="text-[#B026FF] font-semibold hover:text-[#9020DD] hover:underline">
                    Create account
                </Link>
            </p>
        </div>
    );
}
