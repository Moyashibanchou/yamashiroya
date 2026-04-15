import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';
import logoImg from '../shoplogo.png';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState('');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const drawerLinkClass = (to) => {
        const isActive = location.pathname === to;
        return `py-5 px-3 rounded-xl border-b border-[#ebdcd0]/50 transition-colors ${
            isActive ? 'text-[#2B5740] bg-[#f7f2e7]' : 'hover:text-[#2B5740] hover:bg-[#f7f2e7]'
        }`;
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const q = query.trim();
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        navigate(`/products${params.toString() ? `?${params.toString()}` : ''}`);
    };

    return (
        <>
            {/* グローバルヘッダー */}
            <header className="sticky top-0 z-50 w-full bg-[#faf8f1]/95 backdrop-blur-md border-b border-[#ebdcd0] soft-shadow-header elegant-font">
                <div className="max-w-6xl mx-auto px-4 md:px-6 h-[80px] md:h-[100px] flex items-center justify-between">

                    {/* 左側：ハンバーガー（モバイル） + ロゴ（PC） */}
                    <div className="flex items-center gap-6 min-w-0 md:w-[220px]">
                        <button
                            className="md:hidden text-[#4a3f35] hover:text-[#2B5740] active:scale-95 transition-transform cursor-pointer p-2 -ml-2"
                            onClick={toggleMenu}
                            aria-label="メニュー"
                        >
                            <Menu className="w-[30px] h-[30px]" strokeWidth={2} />
                        </button>

                        <Link to="/" className="hidden md:inline-flex hover:opacity-80 transition-opacity cursor-pointer" onClick={closeMenu}>
                            <img
                                src={logoImg}
                                alt="花の山城屋 ロゴ"
                                className="h-12 md:h-14 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* 中央：PC表示用テキストリンク（中央寄せ） */}
                    <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-[#4a3f35] font-bold tracking-widest text-[0.9rem]">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `pb-2 border-b-2 ${
                                    isActive
                                        ? 'border-[#2B5740] text-[#2B5740]'
                                        : 'border-transparent hover:border-[#2B5740]/40 hover:text-[#2B5740]'
                                } transition-colors cursor-pointer`
                            }
                        >
                            トップ
                        </NavLink>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `pb-2 border-b-2 ${
                                    isActive
                                        ? 'border-[#2B5740] text-[#2B5740]'
                                        : 'border-transparent hover:border-[#2B5740]/40 hover:text-[#2B5740]'
                                } transition-colors cursor-pointer`
                            }
                        >
                            お花を探す
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `pb-2 border-b-2 ${
                                    isActive
                                        ? 'border-[#2B5740] text-[#2B5740]'
                                        : 'border-transparent hover:border-[#2B5740]/40 hover:text-[#2B5740]'
                                } transition-colors cursor-pointer`
                            }
                        >
                            山城屋について
                        </NavLink>

                        <NavLink
                            to="/about#access"
                            className={() => {
                                const active = location.pathname === '/about' && location.hash === '#access';
                                return `pb-2 border-b-2 ${
                                    active
                                        ? 'border-[#2B5740] text-[#2B5740]'
                                        : 'border-transparent hover:border-[#2B5740]/40 hover:text-[#2B5740]'
                                } transition-colors cursor-pointer`;
                            }}
                        >
                            アクセス
                        </NavLink>

                        <a
                            href="#footer-contact"
                            className="pb-2 border-b-2 border-transparent hover:border-[#2B5740]/40 hover:text-[#2B5740] transition-colors cursor-pointer"
                        >
                            お問い合わせ
                        </a>
                    </nav>

                    {/* 中央：ロゴ（モバイル） */}
                    <div className="md:hidden flex justify-center items-center flex-1">
                        <Link to="/" className="hover:opacity-80 transition-opacity cursor-pointer" onClick={closeMenu}>
                            <img
                                src={logoImg}
                                alt="花の山城屋 ロゴ"
                                className="h-16 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* 右側：検索 + カート */}
                    <div className="flex justify-end items-center gap-3 md:gap-4 md:w-[280px]">
                        <form onSubmit={handleSearchSubmit} className="hidden md:block">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a38f7d]" strokeWidth={2.2} />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    type="search"
                                    placeholder="検索"
                                    className="w-[180px] lg:w-[220px] bg-white border border-[#ebdcd0] rounded-full py-2 pl-9 pr-3 text-[0.85rem] tracking-widest outline-none focus:border-[#2B5740]"
                                />
                            </div>
                        </form>

                        <Link to="/cart" aria-label="カート" className="relative text-[#4a3f35] hover:text-[#2B5740] active:scale-95 transition-transform cursor-pointer p-2" onClick={closeMenu}>
                            <ShoppingCart className="w-[24px] h-[24px] md:w-[28px] md:h-[28px]" strokeWidth={2} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-[#2B5740] text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-sm">
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
                            className="fixed top-0 right-0 w-[86%] max-w-[340px] h-full bg-[#fdfbf6] shadow-2xl z-[70] flex flex-col pt-6 px-6 pb-8 elegant-font md:hidden border-l border-[#ebdcd0]"
                        >
                            <div className="flex justify-end mb-10">
                                <button onClick={closeMenu} className="text-[#6e5e54] hover:text-[#3E2723] transition-colors cursor-pointer p-2 active:scale-90">
                                    <X className="w-8 h-8" strokeWidth={1.5} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-8 text-[1.1rem] font-bold text-[#4a3f35] tracking-widest text-center mt-4">
                                <form onSubmit={handleSearchSubmit} className="w-full">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a38f7d]" strokeWidth={2.2} />
                                        <input
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            type="search"
                                            placeholder="商品を検索"
                                            className="w-full bg-white border border-[#ebdcd0] rounded-full py-3 pl-12 pr-4 text-[0.95rem] tracking-widest outline-none focus:border-[#2B5740]"
                                        />
                                    </div>
                                </form>

                                <Link to="/" onClick={closeMenu} className={drawerLinkClass('/')}> 
                                    トップ
                                </Link>
                                <Link to="/products" onClick={closeMenu} className={drawerLinkClass('/products')}>
                                    お花を探す
                                </Link>
                                <Link to="/about" onClick={closeMenu} className={drawerLinkClass('/about')}>
                                    山城屋について
                                </Link>
                                <Link to="/about#access" onClick={closeMenu} className={drawerLinkClass('/about')}>
                                    アクセス
                                </Link>
                                <a href="#footer-contact" onClick={closeMenu} className={drawerLinkClass('/')}>
                                    お問い合わせ
                                </a>
                            </div>

                            {/* ドロワー下部のロゴデザイン */}
                            <div className="mt-auto pb-12 text-center border-t border-[#ebdcd0]/30 pt-8">
                                <img 
                                    src={logoImg} 
                                    alt="花の山城屋 ロゴ" 
                                    className="h-16 w-auto mx-auto mb-4 object-contain"
                                />
                                <p className="text-[#a38f7d] text-sm tracking-widest">© 1920 花の山城屋</p>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
