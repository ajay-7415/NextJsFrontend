'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0C15] text-white selection:bg-[#B026FF] selection:text-white overflow-x-hidden">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shine { animation: shine 2s linear infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#B026FF]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-[#4D4DFF]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-1000" />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[100px] animate-spin-slow" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B026FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B026FF]"></span>
            </span>
            <span className="text-sm font-medium text-purple-200">The Future of Form Building</span>
          </div>

          <h1 className="text-5xl lg:text-8xl font-bold mb-8 tracking-tight">
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent block mb-2">
              Create Stunning Forms
            </span>
            <span className="bg-gradient-to-r from-[#B026FF] via-purple-400 to-[#4D4DFF] bg-clip-text text-transparent animate-shine bg-[length:200%_auto]">
              In Seconds
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed lg:text-2xl">
            Drag, drop, and deploy. The most intuitive builder for creating
            responsive, accessible, and beautiful forms without writing code.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/register"
              className="group relative px-8 py-4 bg-white text-[#0B0C15] rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)]"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B026FF] to-[#4D4DFF] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />
              <span className="relative z-10">Start Building Free</span>
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-[rgba(255,255,255,0.05)] text-white rounded-full font-bold border border-[rgba(255,255,255,0.1)] hover:bg-white/10 transition-all backdrop-blur-md hover:border-white/20"
            >
              Live Demo
            </Link>
          </div>
        </div>

        {/* Floating UI Elements (Decorative) */}
        <div className="hidden lg:block absolute left-[10%] top-1/2 -translate-y-1/2 w-64 h-80 bg-[#120B2E]/50 border border-[rgba(255,255,255,0.1)] rounded-xl backdrop-blur-md -rotate-6 animate-float shadow-2xl z-0" style={{ animationDelay: '1s' }} />
        <div className="hidden lg:block absolute right-[10%] top-1/2 -translate-y-1/2 w-64 h-80 bg-[#120B2E]/50 border border-[rgba(255,255,255,0.1)] rounded-xl backdrop-blur-md rotate-6 animate-float shadow-2xl z-0" style={{ animationDelay: '2s' }} />
      </section>

      {/* Features Section - Bento Grid */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-6">
              Everything You Need
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Powerful features wrapped in a beautiful interface.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Feature 1 - Large Span */}
            <div className="md:col-span-2 p-10 rounded-3xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:border-[#B026FF]/50 transition-all group relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B026FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="text-5xl mb-6 bg-white/5 w-20 h-20 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-500 border border-white/10">
                    🚀
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Drag & Drop Builder</h3>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                    Intuitive interface to create complex forms in minutes. No coding required, just pure creativity.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-10 rounded-3xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:border-[#4D4DFF]/50 transition-all group relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4D4DFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-4xl mb-6">⚡</div>
                <h3 className="text-2xl font-bold mb-4 text-white">Instant Sharing</h3>
                <p className="text-slate-300">Get a unique URL instantly. Share anywhere, collect everywhere.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-10 rounded-3xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:border-pink-500/50 transition-all group relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-4xl mb-6">📊</div>
                <h3 className="text-2xl font-bold mb-4 text-white">Real-time Analytics</h3>
                <p className="text-slate-300">View submissions as they arrive. Visualize data with built-in charts.</p>
              </div>
            </div>

            {/* Feature 4 - Large Span */}
            <div className="md:col-span-2 p-10 rounded-3xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:border-purple-500/50 transition-all group relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center h-full">
                <div className="w-full">
                  <h3 className="text-3xl font-bold mb-4 text-white">Enterprise Security</h3>
                  <p className="text-slate-300 text-lg">
                    Bank-grade encryption for all your data. Your submissions are safe with us.
                  </p>
                </div>
                <div className="text-6xl opacity-50 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  🔒
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative rounded-[3rem] p-12 lg:p-24 text-center overflow-hidden border border-[rgba(255,255,255,0.1)] backdrop-blur-xl bg-gradient-to-b from-white/5 to-transparent">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#B026FF]/20 via-transparent to-[#4D4DFF]/20 opacity-50" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#B026FF]/30 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#4D4DFF]/30 rounded-full blur-[100px]" />

            <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white relative z-10">
              Ready to start building?
            </h2>
            <p className="text-purple-200 mb-12 max-w-xl mx-auto relative z-10 text-xl">
              Join thousands of users creating stunning forms. <br />
              No credit card required.
            </p>
            <Link
              href="/register"
              className="inline-block px-10 py-5 bg-white text-[#0B0C15] rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-xl relative z-10"
            >
              Create Your First Form
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/20 border-t border-[rgba(255,255,255,0.1)] backdrop-blur-lg">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 mb-4">© 2024 Dynamic Form Builder. Built with Next.js 16.</p>
          <div className="flex justify-center gap-6 text-slate-300">
            <a href="#" className="hover:text-[#B026FF] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#B026FF] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#B026FF] transition-colors">Github</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
