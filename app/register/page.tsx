import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0C15] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#4D4DFF]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#B026FF]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

            <RegisterForm />
        </div>
    );
}
