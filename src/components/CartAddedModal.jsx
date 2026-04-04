import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingCart, ArrowRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function CartAddedModal() {
    const { showCartModal, closeCartModal, lastAddedProduct } = useCart();
    const navigate = useNavigate();

    // モーダル表示中はbodyのスクロールを止める
    useEffect(() => {
        if (showCartModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showCartModal]);

    // Escキーで閉じる
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeCartModal();
        };
        if (showCartModal) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showCartModal, closeCartModal]);

    const handleGoToCart = () => {
        closeCartModal();
        navigate('/cart');
    };

    return (
        <AnimatePresence>
            {showCartModal && (
                // 背景オーバーレイ
                <motion.div
                    key="cart-modal-backdrop"
                    className="fixed inset-0 z-[9000] flex items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={closeCartModal}
                >
                    {/* 半透明黒背景 */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

                    {/* モーダルカード */}
                    <motion.div
                        key="cart-modal-card"
                        className="relative z-10 bg-[#fdfbf6] rounded-3xl shadow-2xl w-full max-w-sm md:max-w-md p-8 md:p-10 border border-[#ebdcd0]"
                        initial={{ opacity: 0, scale: 0.88, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 16 }}
                        transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 閉じるボタン */}
                        <button
                            onClick={closeCartModal}
                            className="absolute top-4 right-4 text-[#a38f7d] hover:text-[#4a3f35] transition-colors p-1 rounded-full hover:bg-[#f5efe9]"
                            aria-label="閉じる"
                        >
                            <X size={20} strokeWidth={2.5} />
                        </button>

                        {/* チェックアイコン */}
                        <div className="flex justify-center mb-5">
                            <div className="w-16 h-16 rounded-full bg-[#f5efe9] flex items-center justify-center">
                                <CheckCircle className="text-[#bc8a7e]" size={36} strokeWidth={1.8} />
                            </div>
                        </div>

                        {/* メッセージ */}
                        <div className="text-center mb-6">
                            <h2 className="text-[1.1rem] md:text-[1.2rem] font-bold text-[#4a3f35] tracking-widest mb-2">
                                カートに追加しました
                            </h2>
                            {lastAddedProduct?.name && (
                                <p className="text-[0.85rem] text-[#8a7a6c] tracking-wide leading-relaxed whitespace-pre-wrap line-clamp-2">
                                    {lastAddedProduct.name}
                                </p>
                            )}
                        </div>

                        {/* アクションボタン */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleGoToCart}
                                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#4a3f35] text-white font-bold tracking-widest text-sm md:text-base hover:bg-[#322a23] active:scale-[0.98] transition-all shadow-md"
                            >
                                <ShoppingCart size={18} strokeWidth={2.5} />
                                カートを見る
                                <ArrowRight size={16} strokeWidth={2.5} />
                            </button>
                            <button
                                onClick={closeCartModal}
                                className="w-full py-4 rounded-2xl bg-white border border-[#d8c8b6] text-[#6e5e54] font-bold tracking-widest text-sm md:text-base hover:bg-[#f5efe9] hover:border-[#bc8a7e] active:scale-[0.98] transition-all"
                            >
                                買い物を続ける
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
