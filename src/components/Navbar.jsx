import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';
import logoImg from '../shoplogo.png';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            {/* グローバルヘッダー */}
            <header className="sticky top-0 z-50 w-full bg-[#fdfbf6]/95 backdrop-blur-md border-b border-[#ebdcd0] soft-shadow-header elegant-font">
                <div className="max-w-6xl mx-auto px-4 md:px-6 h-[80px] md:h-[100px] grid grid-cols-3 items-center">

                    {/* 左側：ハンバーガーメニュー（モバイルのみ） */}
                    <div className="flex justify-start items-center">
                        {/* PC表示用テキストリンク (スマホでは非表示) */}
                        <nav className="hidden md:flex items-center gap-6 text-[#4a3f35] font-bold tracking-widest text-[0.9rem]">
                            <Link to="/" className="hover:text-[#8e3a3a] transition-colors cursor-pointer">トップ</Link>
                            <Link to="/products" className="hover:text-[#8e3a3a] transition-colors cursor-pointer">お花を探す</Link>
                            <Link to="/about" className="hover:text-[#8e3a3a] transition-colors cursor-pointer">山城屋について</Link>
                        </nav>

                        <button
                            className="md:hidden text-[#4a3f35] hover:text-[#8e3a3a] active:scale-95 transition-transform cursor-pointer"
                            onClick={toggleMenu}
                            aria-label="Menu"
                        >
                            <Menu className="w-[26px] h-[26px]" strokeWidth={2} />
                        </button>
                    </div>

                    {/* 中央：新ロゴ画像 */}
                    <div className="flex justify-center items-center">
                        <Link to="/" className="hover:opacity-80 transition-opacity cursor-pointer" onClick={closeMenu}>
                            <img 
                                src={logoImg} 
                                alt="花の山城屋 ロゴ" 
                                className="h-16 md:h-20 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* 右側：カートアイコン */}
                    <div className="flex justify-end items-center gap-4">
                        <Link to="/cart" aria-label="Cart" className="relative text-[#4a3f35] hover:text-[#8e3a3a] active:scale-95 transition-transform cursor-pointer p-2" onClick={closeMenu}>
                            <ShoppingCart className="w-[24px] h-[24px] md:w-[28px] md:h-[28px]" strokeWidth={2} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-[#8e3a3a] text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
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

                            {/* ドロワー下部のロゴデザイン */}
                            <div className="mt-auto pb-12 text-center border-t border-[#ebdcd0]/30 pt-8">
                                <img 
                                    src={logoImg} 
                                    alt="花の山城屋 ロゴ" 
                                    className="h-16 w-auto mx-auto mb-4 object-contain"
                                />
                                <p className="text-[#a38f7d] text-sm tracking-widest">© 1920 Yamashiroya</p>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
