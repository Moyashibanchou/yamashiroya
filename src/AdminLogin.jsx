import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Key, LogIn, AlertCircle, ChevronLeft } from 'lucide-react';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        // 簡易認証（テスト用）
        if (email === 'admin@yamashiroya.com' && password === 'password123') {
            localStorage.setItem('yamashiroya_admin_logged_in', 'true');
            navigate('/admin');
        } else {
            setError('メールアドレスまたはパスワードが正しくありません。');
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen washi-pattern text-[#4a3f35] elegant-font flex flex-col items-center justify-center p-6"
        >
            <div className="w-full max-w-md bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-[#ebdcd0] p-10 md:p-12 soft-shadow-header relative overflow-hidden">
                {/* 装飾的な透かし */}
                <div className="absolute top-0 right-0 opacity-[0.05] pointer-events-none -mr-10 -mt-10">
                    <Lock size={200} className="text-[#4a3f35]" />
                </div>

                <div className="relative z-10">
                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-[#8a7a6c] hover:text-[#4a3f35] mb-8 transition-colors text-sm"
                    >
                        <ChevronLeft size={16} />
                        <span>ショップに戻る</span>
                    </button>

                    <header className="text-center mb-10">
                        <div className="w-16 h-16 bg-[#4a3f35] rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                            <Lock size={28} />
                        </div>
                        <h1 className="text-2xl font-bold tracking-[0.2em]">管理者ログイン</h1>
                        <p className="text-xs text-[#8a7a6c] mt-2 tracking-widest font-medium uppercase">Administration Access</p>
                    </header>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-bold"
                        >
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#8a7a6c] tracking-[0.2em] uppercase ml-1">Email Address</label>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="admin@yamashiroya.com"
                                    className="w-full bg-white/60 border border-[#d8c8b6] text-[#4a3f35] py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/10 focus:border-[#4a3f35] transition-all"
                                />
                                <Mail className="absolute left-4.5 top-1/2 -translate-y-1/2 text-[#a38f7d]/50" size={18} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#8a7a6c] tracking-[0.2em] uppercase ml-1">Password</label>
                            <div className="relative">
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-white/60 border border-[#d8c8b6] text-[#4a3f35] py-4 pl-12 pr-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/10 focus:border-[#4a3f35] transition-all"
                                />
                                <Key className="absolute left-4.5 top-1/2 -translate-y-1/2 text-[#a38f7d]/50" size={18} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 rounded-2xl bg-[#4a3f35] text-white font-bold tracking-[0.3em] shadow-xl hover:bg-[#322a23] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4"
                        >
                            <LogIn size={20} />
                            <span>ログイン</span>
                        </button>
                    </form>
                </div>
            </div>
            
            <p className="mt-8 text-[10px] text-[#a38f7d] tracking-[0.3em] font-medium">© 1920 YAMASHIROYA OTARU</p>
        </motion.div>
    );
}
