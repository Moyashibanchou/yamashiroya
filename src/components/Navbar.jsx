import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            {/* グローバルヘッダー */}
            <header className="sticky top-0 z-50 w-full bg-[#fdfbf6]/90 backdrop-blur-md border-b border-[#ebdcd0] soft-shadow-header elegant-font">
                <div className="max-w-6xl mx-auto px-4 md:px-6 h-[72px] flex justify-between items-center">

                    {/* 左側：ロゴ */}
                    <Link to="/" className="flex flex-col hover:text-[#8e3a3a] transition-colors cursor-pointer group" onClick={closeMenu}>
                        <span className="text-[0.6rem] md:text-[0.7rem] text-[#8a7a6c] font-bold tracking-[0.2em] md:tracking-[0.25em] mb-[2px] md:mb-1 group-hover:text-[#8e3a3a] transition-colors">想いを花に 小樽で百年</span>
                        <span className="text-[1.25rem] md:text-[1.6rem] text-[#4a3f35] brush-font font-bold leading-none group-hover:text-[#8e3a3a] transition-colors drop-shadow-sm">花の山城屋</span>
                    </Link>

                    {/* 右側：PCメニュー＆アイコン */}
                    <div className="flex items-center gap-6 md:gap-8">

                        {/* PC表示用テキストリンク (スマホでは非表示) */}
                        <nav className="hidden md:flex items-center gap-8 text-[#4a3f35] font-bold tracking-widest text-[0.95rem]">
                            <Link to="/" className="hover:text-[#8e3a3a] transition-colors cursor-pointer">トップ</Link>
                            <Link to="/products" className="hover:text-[#8e3a3a] transition-colors cursor-pointer">お花を探す</Link>
                            <Link to="/about" className="hover:text-[#8e3a3a] transition-colors cursor-pointer">山城屋について</Link>
                        </nav>

                        {/* カートアイコン (全サイズ共通表示) */}
                        <Link to="/cart" aria-label="Cart" className="relative text-[#4a3f35] hover:text-[#8e3a3a] active:scale-95 transition-transform cursor-pointer" onClick={closeMenu}>
                            <ShoppingCart className="w-[24px] h-[24px]" strokeWidth={2} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-2 bg-[#8e3a3a] text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* ハンバーガーアイコン (スマホ・タブレット用、PCで非表示) */}
                        <button
                            className="md:hidden text-[#4a3f35] hover:text-[#8e3a3a] active:scale-95 transition-transform cursor-pointer"
                            onClick={toggleMenu}
                            aria-label="Menu"
                        >
                            <Menu className="w-[26px] h-[26px]" strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </header>

            {/* スマホ用 ドロワーメニュー (Framer Motionでアニメーション構成) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* 背景の半透明オーバーレイ */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-[#4a3f35]/30 z-[60] backdrop-blur-sm md:hidden"
                            onClick={closeMenu}
                        />

                        {/* 右からスライドインするメニュー本体 */}
                        <motion.nav
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }} // ゆったりした上品な動き
                            className="fixed top-0 right-0 w-[80%] max-w-[320px] h-full bg-[#fdfbf6] shadow-2xl z-[70] flex flex-col pt-6 px-6 elegant-font md:hidden border-l border-[#ebdcd0]"
                        >
                            <div className="flex justify-end mb-10">
                                <button onClick={closeMenu} className="text-[#6e5e54] hover:text-[#3E2723] transition-colors cursor-pointer p-2 active:scale-90">
                                    <X className="w-8 h-8" strokeWidth={1.5} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-8 text-[1.1rem] font-bold text-[#4a3f35] tracking-widest text-center mt-4">
                                <Link to="/" onClick={closeMenu} className="py-4 border-b border-[#ebdcd0]/50 hover:text-[#8e3a3a] transition-colors">
                                    トップ
                                </Link>
                                <Link to="/products" onClick={closeMenu} className="py-4 border-b border-[#ebdcd0]/50 hover:text-[#8e3a3a] transition-colors">
                                    お花を探す
                                </Link>
                                <Link to="/about" onClick={closeMenu} className="py-4 border-b border-[#ebdcd0]/50 hover:text-[#8e3a3a] transition-colors">
                                    山城屋について
                                </Link>
                            </div>

                            {/* ドロワー下部のあしらいや連絡先なども追加可能 */}
                            <div className="mt-auto pb-12 text-center text-[#a38f7d] text-sm tracking-widest">
                                <p className="brush-font text-xl mb-4 text-[#8a7a6c]">花の山城屋</p>
                                <p>© 1920 Yamashiroya</p>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
