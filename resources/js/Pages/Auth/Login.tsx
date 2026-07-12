import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex bg-[#FCF9F9] dark:bg-[#150A0B] text-gray-800 dark:text-gray-100 font-sans">
            <Head title="Log In - Dapoer Ratu Admin" />

            {/* Left Panel: Visual Branding (Visible on Desktop) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero_background.webp"
                        alt="Catering Setup"
                        className="w-full h-full object-cover filter brightness-[0.35]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#150A0B]/90 via-primary/45 to-transparent" />
                </div>

                {/* Floating Content */}
                <div className="relative z-10 flex flex-col justify-between p-16 text-white w-full">
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="inline-flex items-center text-xs font-semibold text-white/80 hover:text-white transition-all space-x-1.5 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20">
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Kembali ke Website</span>
                        </Link>
                    </div>

                    <div className="space-y-6">
                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-2 flex items-center justify-center">
                            <img src="/images/logo_original.png" alt="Dapoer Ratu Logo" className="w-full h-full object-contain" />
                        </div>
                        <h2 className="font-playfair text-4xl lg:text-5xl font-bold leading-tight">
                            Citarasa Legendaris <br />
                            <span className="text-secondary">Penyajian Bintang Lima</span>
                        </h2>
                        <p className="text-white/70 max-w-md text-sm font-light leading-relaxed">
                            Akses ke panel admin CMS Dapoer Ratu Catering untuk mengelola menu, testimonial, portofolio galeri, dan kontak website secara dinamis.
                        </p>
                    </div>

                    <div className="text-xs text-white/40">
                        © {new Date().getFullYear()} CV. Data Cipta Celebes. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Right Panel: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 relative">
                {/* Back to Website Button for Mobile */}
                <Link href="/" className="lg:hidden absolute top-6 left-6 inline-flex items-center text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-primary transition-all space-x-1.5">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Ke Website</span>
                </Link>

                <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#1E1112] p-8 rounded-3xl shadow-xl border border-red-100/50 dark:border-red-950/40 relative overflow-hidden">
                    {/* Top Decorative Line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary via-primary to-secondary" />

                    <div className="text-center space-y-3">
                        <div className="lg:hidden mx-auto w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 p-1.5 flex items-center justify-center mb-2">
                            <img src="/images/logo_original.png" alt="Dapoer Ratu Logo" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="font-playfair text-2xl sm:text-3xl font-extrabold text-primary dark:text-white">
                            Akses Admin Panel
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Masukkan email dan kata sandi admin Anda
                        </p>
                    </div>

                    {status && (
                        <div className="p-3 text-xs font-semibold text-center rounded-lg bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 border border-green-200 dark:border-green-950/40">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email Address */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                Alamat Email
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                                    <Mail className="w-4 h-4" />
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-red-950/40 dark:bg-[#130708] focus:border-primary focus:ring-primary'} outline-none focus:ring-1 text-gray-905 dark:text-white`}
                                    placeholder="admin@dapoerratucatering.com"
                                    required
                                    autoFocus
                                    autoComplete="username"
                                />
                            </div>
                            <InputError message={errors.email} className="mt-1 text-xs" />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                                    Kata Sandi
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs text-secondary hover:text-primary dark:hover:text-white hover:underline transition-all"
                                    >
                                        Lupa sandi?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                                    <Lock className="w-4 h-4" />
                                </span>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-red-950/40 dark:bg-[#130708] focus:border-primary focus:ring-primary'} outline-none focus:ring-1 text-gray-905 dark:text-white`}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1 text-xs" />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center cursor-pointer select-none">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    className="rounded border-gray-300 dark:border-red-950/40 dark:bg-[#130708] text-primary focus:ring-primary"
                                />
                                <span className="ms-2 text-xs text-gray-600 dark:text-gray-400">
                                    Ingat perangkat ini
                                </span>
                            </label>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-2 py-3 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-950/10 hover:shadow-xl transition-all duration-300 transform active:scale-98 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                        >
                            {processing ? (
                                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <span>Masuk ke Panel</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
