import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from './context/CartContext.jsx';
import { AnimatePresence, motion } from 'framer-motion';

export default function Success() {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isVerified, setIsVerified] = useState(false);
    const [checking, setChecking] = useState(true);

    const [petals, setPetals] = useState([]);

    const CHECKOUT_FORM_STORAGE_KEY = 'checkoutFormData';

    useEffect(() => {
        window.scrollTo(0, 0);

        let canceled = false;
        const verify = async () => {
            setChecking(true);
            try {
                const sessionId = searchParams.get('session_id') || searchParams.get('sessionId') || '';
                if (!sessionId) {
                    if (!canceled) {
                        setIsVerified(false);
                        navigate('/cart', { replace: true });
                    }
                    return;
                }

                const res = await fetch(`/api/payments/verify-session?sessionId=${encodeURIComponent(sessionId)}`);
                if (!res.ok) {
                    throw new Error('verify failed');
                }
                const data = await res.json();
                const ok = Boolean(data && data.verified === true);

                if (!canceled) {
                    if (ok) {
                        setIsVerified(true);
                        clearCart();
                        try {
                            sessionStorage.removeItem(CHECKOUT_FORM_STORAGE_KEY);
                        } catch {
                            // ignore
                        }
                    } else {
                        setIsVerified(false);
                        navigate('/cart', { replace: true });
                    }
                }
            } catch (e) {
                if (!canceled) {
                    setIsVerified(false);
                    navigate('/cart', { replace: true });
                }
            } finally {
                if (!canceled) setChecking(false);
            }
        };

        verify();
        return () => {
            canceled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isVerified) return;

        let canceled = false;
        const startAt = Date.now();
        const createForMs = 4200;

        const spawn = () => {
            const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
            const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
            const x = Math.random() * width;
            const duration = 7 + Math.random() * 4;
            const rotate = (Math.random() - 0.5) * 260;
            const scale = 0.75 + Math.random() * 0.6;
            const emoji = Math.random() > 0.25 ? '🌸' : '❀';

            setPetals((prev) => [
                ...prev,
                {
                    key: id,
                    x,
                    duration,
                    rotate,
                    scale,
                    emoji,
                    drift: (Math.random() - 0.5) * 90,
                },
            ]);
        };

        const tick = () => {
            if (canceled) return;
            const elapsed = Date.now() - startAt;
            if (elapsed <= createForMs) {
                spawn();
                if (Math.random() > 0.55) spawn();
                setTimeout(tick, 120 + Math.random() * 120);
            }
        };

        tick();
        return () => {
            canceled = true;
        };
    }, [isVerified]);

    if (checking) {
        return (
            <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-hidden flex flex-col items-center justify-center -mt-[3rem] md:-mt-[4rem]">
                <div className="bg-[#f0e9df] p-6 md:p-10 rounded-2xl md:rounded-3xl border border-[#d8c8b6] soft-shadow-sm w-full max-w-xl mx-auto text-center">
                    <p className="text-[0.95rem] md:text-[1.1rem] text-[#4a3f35] leading-loose tracking-wide font-medium">
                        決済状況を確認しています...
                    </p>
                </div>
            </div>
        );
    }

    if (!isVerified) {
        return null;
    }

    return (
        <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-hidden flex flex-col items-center justify-center -mt-[3rem] md:-mt-[4rem]">

            <div className="fixed inset-0 pointer-events-none z-[9999]">
                <AnimatePresence>
                    {petals.map((p) => (
                        <motion.span
                            key={p.key}
                            initial={{ opacity: 0, x: p.x, y: -30, rotate: 0, scale: p.scale }}
                            animate={{
                                opacity: [0, 0.9, 0.9, 0],
                                x: [p.x, p.x + p.drift, p.x - p.drift, p.x],
                                y: ['-30px', '110vh'],
                                rotate: [0, p.rotate],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: p.duration, ease: 'easeOut' }}
                            onAnimationComplete={() => setPetals((prev) => prev.filter((x) => x.key !== p.key))}
                            style={{ position: 'absolute', left: 0, top: 0, willChange: 'transform' }}
                            className="select-none drop-shadow-[0_6px_10px_rgba(74,63,53,0.08)]"
                        >
                            {p.emoji}
                        </motion.span>
                    ))}
                </AnimatePresence>
            </div>

            {/* 1. 薄い背景の装飾（老舗の透かし文字のようなデザイン） */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
                <span className="text-[12rem] md:text-[20rem] font-bold brush-font whitespace-nowrap -rotate-12 mix-blend-multiply text-[#3E2723]">山城屋</span>
            </div>

            <div className="max-w-2xl mx-auto w-full px-8 md:px-12 relative z-10 flex flex-col items-center text-center mt-12 md:mt-20">

                {/* 2. アイコン */}
                <div className="mb-8 md:mb-12">
                    <CheckCircle className="w-20 h-20 md:w-28 md:h-28 text-[#2b4c33] opacity-90 mx-auto drop-shadow-md" strokeWidth={1.5} />
                </div>

                {/* 3. メインメッセージ */}
                <h1 className="text-[1.6rem] md:text-[2.2rem] font-bold text-[#3E2723] leading-relaxed mb-6 md:mb-8 tracking-widest drop-shadow-sm">
                    ご注文ありがとう<br className="md:hidden" />ございました。
                </h1>

                {/* 4. サブメッセージ */}
                <div className="bg-[#f0e9df] p-6 md:p-10 rounded-2xl md:rounded-3xl border border-[#d8c8b6] soft-shadow-sm mb-12 md:mb-16 w-full max-w-xl mx-auto">
                    <p className="text-[0.95rem] md:text-[1.1rem] text-[#4a3f35] leading-loose text-justify md:text-center tracking-wide font-medium">
                        ご入力いただいたメールアドレスに、<br className="hidden md:block" />自動配信の確認メールをお送りいたしました。<br /><br />
                        小樽の店舗より、心を込めて発送準備に<br className="hidden md:block" />入らせていただきます。<br className="md:hidden" />
                        到着まで今しばらくお待ちくださいませ。
                    </p>

                    <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-[#d8c8b6]/70">
                        <p className="text-[0.8rem] md:text-[0.95rem] text-[#6e5e54] tracking-widest font-bold">注文番号：<span className="text-[#2B5740] font-normal text-[1rem] md:text-[1.1rem]">#1092-A</span></p>
                    </div>
                </div>

                {/* 5. 導線（トップへ戻る） */}
                <Link
                    to="/"
                    className="w-full max-w-[280px] md:max-w-[340px] py-4 md:py-5 border-[1.5px] border-[#6e5e54] text-[#6e5e54] rounded-full font-bold text-center hover:bg-[#6e5e54] hover:text-[#fdfbf6] active:scale-95 transition-all text-sm md:text-[1.05rem] tracking-[0.2em] bg-transparent shadow-sm mx-auto"
                >
                    ホームへ戻る
                </Link>
            </div>

        </div>
    );
}
