'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

export default function Header() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    // Don't show header on public form pages to keep them clean
    if (pathname.includes('/forms/') && !pathname.includes('/edit') && !pathname.includes('/new') && !pathname.includes('/submissions')) {
        return null;
    }

    // Also hiding on landing page since it has its own navigation? 
    // keeping it for now but making it transparent on landing page could be cool.
    // For now let's make a solid consistent header.

    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-[#0B0C15]/50 backdrop-blur-xl border-b border-[#FFFFFF1A] supports-[backdrop-filter]:bg-[#0B0C15]/20">
            <style jsx global>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: .5; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                <Link href="/" className="group relative flex items-center gap-2">
                    <span className="text-2xl animate-pulse-slow">✨</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent group-hover:first-letter:text-[#B026FF] transition-all duration-300">
                        FormBuilder
                    </span>
                    <div className="absolute -inset-4 bg-[#B026FF]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </Link>

                <nav className="flex items-center gap-8">
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className={`text-sm font-medium transition-all duration-300 hover:text-[#B026FF] relative group ${pathname === '/dashboard' ? 'text-[#B026FF]' : 'text-slate-200'
                                    }`}
                            >
                                Dashboard
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B026FF] transition-all duration-300 group-hover:w-full" />
                            </Link>
                            <div className="h-4 w-px bg-[#FFFFFF1A]"></div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-slate-300 hidden sm:block">
                                    Hi, <span className="text-white">{user.name}</span>
                                </span>
                                <button
                                    onClick={logout}
                                    className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                            >
                                Log in
                                <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            </Link>
                            <Link
                                href="/register"
                                className="relative text-sm font-medium px-5 py-2 rounded-lg group overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 transition-transform duration-300 group-hover:scale-105" />
                                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative text-white group-hover:text-white transition-colors">
                                    Sign up
                                </span>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}
