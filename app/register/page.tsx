'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await register(name, email, password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0C15] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#4D4DFF]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#B026FF]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

            <div className="bg-[#FFFFFF0D] backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_40px_-10px_rgba(77,77,255,0.3)] w-full max-w-md relative z-10 border border-[#FFFFFF1A]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                        Create Account
                    </h1>
                    <p className="text-slate-300 mt-2">Join us and start building forms today</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border-l-4 border-red-500 text-red-200 p-4 mb-6 rounded-r backdrop-blur-sm">
                        <p className="text-sm font-medium">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1.5">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg focus:ring-2 focus:ring-[#4D4DFF] focus:border-[#4D4DFF] transition-all outline-none text-white placeholder-slate-500"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg focus:ring-2 focus:ring-[#4D4DFF] focus:border-[#4D4DFF] transition-all outline-none text-white placeholder-slate-500"
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
                            className="w-full px-4 py-3 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-lg focus:ring-2 focus:ring-[#4D4DFF] focus:border-[#4D4DFF] transition-all outline-none text-white placeholder-slate-500"
                            placeholder="Min. 6 characters"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#4D4DFF] to-[#B026FF] text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_30px_-5px_rgba(77,77,255,0.5)]"
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-400 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#4D4DFF] font-semibold hover:text-[#3D3DDD] hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
