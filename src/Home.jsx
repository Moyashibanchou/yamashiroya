import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Award, HeartHandshake, Truck, Gift, Heart, Store, CalendarHeart, Leaf } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext.jsx';

export default function Home() {
    const [isReady, setIsReady] = useState(false);
    const [activeOccasion, setActiveOccasion] = useState('すべて');
    const [activeColor, setActiveColor] = useState('すべて');
    const [activeBudget, setActiveBudget] = useState('すべて');

    const { cartCount } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 3800);
        return () => clearTimeout(timer);
    }, []);

    const dummyProducts = [
        {
            id: 1,
            name: '季節のお祝いアレンジメント\n（華やか）',
            price: '¥5,500',
            image: 'https://images.unsplash.com/photo-1543881524-76f578496417?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            name: '【店長おまかせ】\n旬の特選ブーケ',
            price: '¥4,400',
            image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            name: 'お供え・お悔やみ\n哀悼のアレンジ',
            price: '¥6,600',
            image: 'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 4,
            name: '特別な日のための、\n赤バラのブーケ',
            price: '¥11,000',
            image: 'https://images.unsplash.com/photo-1582791694770-bd6198df12cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ];

    return (
        <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-x-hidden">

            {/* 1. スプラッシュ・オープニングアニメーション */}
            <AnimatePresence>
                {!isReady && (
                    <motion.div
                        key="splash"
                        className="fixed inset-0 z-[999] bg-[#fdfbf6] flex flex-col items-center justify-center pointer-events-none"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        <div
                            className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-multiply"
                            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)' }}
                        />

                        <div className="relative w-80 h-80 flex items-center justify-center md:scale-125">
                            <motion.div
                                initial={{ rotate: -15, y: -15, x: -30, opacity: 0, scale: 0.8 }}
                                animate={{ rotate: 10, y: 5, x: 5, opacity: 1, scale: 1 }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                                className="absolute text-[#e09a9a] drop-shadow-sm z-20"
                                style={{ top: '5%', left: '5%' }}
                            >
                                <svg width="140" height="140" viewBox="0 0 100 100" fill="none">
                                    <path d="M50 8C55 25 75 35 92 50C75 65 55 75 50 92C45 75 25 65 8 50C25 35 45 25 50 8Z" fill="currentColor" opacity="0.85" />
                                    <circle cx="50" cy="50" r="10" fill="#c47a7a" />
                                </svg>
                            </motion.div>

                            <motion.div
                                initial={{ rotate: 15, y: 25, x: 25, opacity: 0, scale: 0.5 }}
                                animate={{ rotate: -10, y: -5, x: -10, opacity: 1, scale: 1 }}
                                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.3 }}
                                className="absolute text-[#e6c27a] drop-shadow-sm z-20"
                                style={{ bottom: '-5%', right: '-5%' }}
                            >
                                <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
                                    <path d="M50 15C60 30 70 40 85 50C70 60 60 70 50 85C40 70 30 60 15 50C30 40 40 30 50 15Z" fill="currentColor" opacity="0.95" />
                                    <circle cx="50" cy="50" r="12" fill="#d4a355" />
                                </svg>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 0.1, scale: 1.05 }}
                                transition={{ duration: 3, delay: 0.5 }}
                                className="absolute z-10 w-full flex justify-center mt-10"
                            >
                                <svg width="220" height="90" viewBox="0 0 200 80" fill="currentColor" className="text-[#4a3f35]">
                                    <path d="M10 80L10 60L30 50L30 80M35 80L35 45L50 40L50 80M55 80L55 30L80 20L80 80M85 80L85 55L100 50L100 80M105 80L105 25L135 15L135 80M140 80L140 40L160 35L160 80M165 80L165 55L190 50L190 80Z" />
                                </svg>
                            </motion.div>

                            <motion.div
                                className="z-30 flex flex-col items-center"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5, delay: 0.8 }}
                            >
                                <p className="text-[0.8rem] md:text-[1rem] text-[#6e5e54] tracking-[0.3em] mb-1 font-bold">想いを花に　小樽で百年</p>
                                <h1 className="text-4xl md:text-5xl text-[#3E2723] brush-font drop-shadow-sm font-bold">花の山城屋</h1>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isReady && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>


                    {/* 3. ヒーローセクション */}
                    <section className="relative w-full h-[60vh] md:h-[75vh] min-h-[420px]">
                        <img
                            src="https://images.unsplash.com/photo-1563241598-6ce8646bbf20?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                            alt="美しいブーケ"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#4a3f35]/90 flex flex-col items-center justify-end pb-12 md:pb-20 px-6 text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                                className="text-[#fdfbf6] text-[2rem] md:text-[3.5rem] font-bold leading-relaxed mb-4 md:mb-8 drop-shadow-2xl tracking-widest"
                            >
                                想いを束ねて、百年。
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                                className="text-[#fdfbf6] text-[0.9rem] md:text-[1.1rem] leading-[2.2] md:leading-[2.4] font-bold mb-10 md:mb-14 drop-shadow-md px-2 max-w-[340px] md:max-w-2xl text-justify tracking-widest opacity-95"
                            >
                                大正九年創業。小樽の街で愛され続ける老舗『花の山城屋』。熟練のフローリストが、あなたの特別な日を彩るお花を心を込めてお仕立てします。
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.0, ease: "easeOut", delay: 0.7 }}
                            >
                                <button onClick={() => navigate('/products')} className="w-full max-w-[280px] md:max-w-[340px] bg-[#bc8a7e] text-white font-bold py-4 md:py-5 rounded-xl shadow-[0_8px_24px_rgba(74,63,53,0.3)] active:scale-95 transition-transform text-lg md:text-xl tracking-widest hover:bg-[#a67468] border border-white/20 cursor-pointer">
                                    お花を探す
                                </button>
                            </motion.div>
                        </div>
                    </section>

                    {/* 4. こだわりセクション */}
                    <section className="brick-pattern border-b border-[#ebdcd0] relative z-20 soft-shadow-sm">
                        <div className="max-w-6xl mx-auto px-6 py-14 md:py-24 text-center">
                            <div className="bg-[#fdfbf6]/90 backdrop-blur-md rounded-2xl p-8 md:p-16 soft-shadow-sm border border-[#ebdcd0] max-w-3xl mx-auto">
                                <h3 className="text-[1.2rem] md:text-[1.6rem] font-bold text-[#4a3f35] leading-relaxed mb-8 md:mb-10 tracking-[0.15em]">
                                    この街の花屋として、<br />あなたの様々なシーンに、<br />そっと寄り添う。
                                </h3>
                                <p className="text-[0.95rem] md:text-[1.1rem] text-[#6e5e54] leading-[2.2] md:leading-[2.4] text-justify px-2 md:px-10">
                                    大正栄華の小樽で産声を上げ、いつの時代も、あたたかい心に支えられながら、まちの花屋として営んでくることができました。創業百年を迎え、心あらたに次の百年へ進んでまいります。
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="max-w-6xl mx-auto">
                        {/* 5. 高度な商品検索・絞り込みエリア（日比谷花壇風） */}
                        <motion.section
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="pt-16 md:pt-24 pb-8 md:pb-16 px-5 md:px-0 relative z-10"
                        >
                            <h2 className="text-xl md:text-2xl font-bold text-[#4a3f35] tracking-widest mb-10 text-center border-b-2 border-[#bc8a7e] pb-4 inline-block relative left-1/2 -translate-x-1/2">
                                お花を探す
                            </h2>

                            <div className="bg-[#fdfbf6]/60 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-[#ebdcd0] soft-shadow-sm max-w-5xl mx-auto space-y-12">

                                {/* 1. キーワード検索窓 */}
                                <div className="max-w-2xl mx-auto">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            placeholder="お花の名前や用途で検索（例：胡蝶蘭、誕生日）"
                                            className="w-full bg-white border border-[#d8c8b6] text-[#4a3f35] py-4 pl-12 pr-6 rounded-full text-base focus:outline-none focus:border-[#bc8a7e] shadow-[0_2px_8px_rgba(74,63,53,0.03)] transition-all"
                                            onKeyDown={(e) => e.key === 'Enter' && navigate('/products')}
                                        />
                                        <Search onClick={() => navigate('/products')} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#a38f7d] w-5 h-5 group-focus-within:text-[#bc8a7e] transition-colors cursor-pointer" strokeWidth={2.5} />
                                        <button onClick={() => navigate('/products')} className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4a3f35] text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest hover:bg-[#322a23] transition-colors cursor-pointer">
                                            検索
                                        </button>
                                    </div>
                                </div>

                                {/* 2. 用途から探す */}
                                <div>
                                    <h3 className="text-[0.95rem] md:text-[1.1rem] font-bold text-[#8a7a6c] mb-6 tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-4 bg-[#bc8a7e] inline-block rounded-full"></span>
                                        ご用途から探す
                                    </h3>
                                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
                                        {[
                                            { label: '誕生日', icon: <Gift className="w-6 h-6 mb-2 text-[#bc8a7e]" /> },
                                            { label: '結婚記念日', icon: <Heart className="w-6 h-6 mb-2 text-[#bc8a7e]" /> },
                                            { label: '開店・開業祝い', icon: <Store className="w-6 h-6 mb-2 text-[#bc8a7e]" /> },
                                            { label: 'お供え・お悔やみ', icon: <Leaf className="w-6 h-6 mb-2 text-[#5c6b5d]" /> },
                                            { label: '送別・退職祝い', icon: <CalendarHeart className="w-6 h-6 mb-2 text-[#bc8a7e]" /> },
                                        ].map((item) => (
                                            <button
                                                key={item.label}
                                                onClick={() => navigate('/products')}
                                                className="bg-white border border-[#ebdcd0] rounded-2xl p-4 flex flex-col items-center justify-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                                            >
                                                <div className="group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                                <span className="text-[0.8rem] md:text-[0.9rem] font-bold text-[#4a3f35] tracking-wide mt-1 text-center whitespace-nowrap">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. スタイルから探す */}
                                <div>
                                    <h3 className="text-[0.95rem] md:text-[1.1rem] font-bold text-[#8a7a6c] mb-6 tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-4 bg-[#bc8a7e] inline-block rounded-full"></span>
                                        スタイルから探す
                                    </h3>
                                    <div className="flex gap-4 overflow-x-auto hide-scroll pb-4 lg:grid lg:grid-cols-5 lg:pb-0">
                                        {[
                                            { label: 'アレンジメント', img: 'https://images.unsplash.com/photo-1543881524-76f578496417?auto=format&fit=crop&q=80&w=300' },
                                            { label: '花束（ブーケ）', img: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=300' },
                                            { label: '胡蝶蘭', img: 'https://images.unsplash.com/photo-1613521140785-e87e408ec563?auto=format&fit=crop&q=80&w=300' },
                                            { label: '観葉植物', img: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&q=80&w=300' },
                                            { label: 'プリザーブド', img: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&q=80&w=300' },
                                        ].map((item) => (
                                            <button
                                                key={item.label}
                                                onClick={() => navigate('/products')}
                                                className="min-w-[120px] lg:min-w-0 bg-white border border-[#ebdcd0] rounded-2xl overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300"
                                            >
                                                <div className="w-full aspect-square overflow-hidden bg-[#f5efe9]">
                                                    <img src={item.img} alt={item.label} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div className="p-3 text-center">
                                                    <span className="text-[0.8rem] md:text-[0.9rem] font-bold text-[#4a3f35] tracking-wide">{item.label}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 色から探す */}
                                <div>
                                    <h3 className="text-[0.95rem] md:text-[1.1rem] font-bold text-[#8a7a6c] mb-6 tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-4 bg-[#bc8a7e] inline-block rounded-full"></span>
                                        色から探す
                                    </h3>
                                    <div className="flex gap-4 overflow-x-auto hide-scroll pb-4 lg:grid lg:grid-cols-5 lg:pb-0">
                                        {[
                                            { label: '赤系', color: 'bg-red-500' },
                                            { label: 'ピンク系', color: 'bg-pink-400' },
                                            { label: '黄・オレンジ系', color: 'bg-yellow-400' },
                                            { label: '白・グリーン系', color: 'bg-emerald-500' },
                                            { label: '青・紫系', color: 'bg-blue-600' },
                                        ].map((item) => (
                                            <button
                                                key={item.label}
                                                onClick={() => navigate('/products')}
                                                className="min-w-[130px] lg:min-w-0 bg-white/50 border border-gray-200 rounded-full py-3 md:py-4 px-4 flex items-center justify-center gap-2 hover:shadow-md hover:border-[#bc8a7e] hover:bg-white transition-all duration-300"
                                            >
                                                <span className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full shadow-sm flex-shrink-0 ${item.color}`}></span>
                                                <span className="text-[0.8rem] md:text-[0.9rem] font-bold text-[#4a3f35] tracking-wide whitespace-nowrap">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 4. 予算から探す */}
                                <div>
                                    <h3 className="text-[0.95rem] md:text-[1.1rem] font-bold text-[#8a7a6c] mb-6 tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-4 bg-[#bc8a7e] inline-block rounded-full"></span>
                                        ご予算から探す
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {['〜 3,000円', '3,000円 〜 5,000円', '5,000円 〜 10,000円', '10,000円 〜'].map((price) => (
                                            <button
                                                key={price}
                                                onClick={() => navigate('/products')}
                                                className="bg-white border border-[#ebdcd0] text-[#6e5e54] px-5 py-3 rounded-full text-[0.85rem] md:text-base font-bold tracking-widest hover:bg-[#4a3f35] hover:text-white hover:border-[#4a3f35] transition-colors shadow-sm"
                                            >
                                                {price}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </motion.section>

                        {/* 6. 商品一覧グリッド */}
                        <motion.section
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="px-5 md:px-6 pt-12 md:pt-16 pb-20 md:pb-28"
                        >
                            <h2 className="text-xl md:text-3xl font-bold text-[#4a3f35] tracking-widest mb-8 md:mb-12 text-center md:text-left border-b-2 border-[#bc8a7e] pb-4 inline-block md:block">おすすめの品</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 flex-1">
                                {dummyProducts.map((product) => (
                                    <Link to={`/product/${product.id}`} key={product.id} className="bg-[#fdfbf6] rounded-2xl md:rounded-3xl soft-shadow border border-[#ebdcd0] overflow-hidden flex flex-col group cursor-pointer block hover:shadow-[0_16px_40px_rgba(74,63,53,0.1)] transition-shadow duration-300">
                                        <div className="aspect-[4/3] md:aspect-square bg-[#f5efe9] relative overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name.replace('\n', ' ')}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply opacity-95"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-5 md:p-6 flex flex-col flex-1 border-t border-[#ebdcd0]/50">
                                            <h3 className="text-[1rem] md:text-[1.1rem] text-[#6e5e54] leading-[1.8] mb-4 font-bold whitespace-pre-wrap flex-1">
                                                {product.name}
                                            </h3>
                                            <p className="text-[1.3rem] md:text-[1.5rem] font-bold text-[#4a3f35] mt-auto">
                                                {product.price}
                                            </p>
                                            <div className="mt-5 w-full py-3 md:py-3.5 bg-[#fdfbf6] border border-[#a38f7d] text-[#6e5e54] rounded-xl text-[0.95rem] font-bold group-hover:bg-[#a38f7d] group-hover:text-[#fdfbf6] text-center transition-all duration-200">
                                                商品を見る
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    {/* About Us セクション */}
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="bg-[#f5efe9] px-6 pt-16 md:pt-28 pb-20 md:pb-28 border-y border-[#ebdcd0]"
                    >
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-[1.3rem] md:text-[2.2rem] font-bold text-[#4a3f35] text-center tracking-[0.2em] mb-10 md:mb-16">
                                百年の歩み、小樽と共に。
                            </h2>

                            <div className="md:flex md:gap-16 md:items-center text-center md:text-left">
                                <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-[3/2] bg-[#fdfbf6] relative border border-[#ebdcd0] rounded-2xl overflow-hidden mb-10 md:mb-0 shadow-xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&q=80&w=1200"
                                        alt="花の山城屋"
                                        className="w-full h-full object-cover mix-blend-multiply opacity-95"
                                    />
                                </div>

                                <div className="md:w-1/2">
                                    <div className="text-[0.95rem] md:text-[1.1rem] text-[#6e5e54] leading-[2.2] md:leading-[2.4] space-y-6 text-justify px-2 md:px-0 mb-14 tracking-wide font-medium">
                                        <p>大正九年（1920年）、小樽の街角で産声を上げた『花の山城屋』。</p>
                                        <p>時代は移り変われど、花を愛でる人々の想いは変わりません。</p>
                                        <p>市場から厳選した新鮮な花材と、一世紀にわたり受け継がれてきた熟練の技。私たちはこれからも、皆様の特別な日を彩る『心に寄り添う花』をお届けしてまいります。</p>
                                    </div>

                                    <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                                        <div className="flex items-center gap-4 bg-[#fdfbf6] p-4 rounded-xl border border-[#ebdcd0] soft-shadow-sm transition-transform hover:-translate-y-1">
                                            <Award className="text-[#bc8a7e] shrink-0" size={24} strokeWidth={2} />
                                            <span className="font-bold text-[#4a3f35] text-[0.95rem] tracking-wider">創業100余年の信頼</span>
                                        </div>
                                        <div className="flex items-center gap-4 bg-[#fdfbf6] p-4 rounded-xl border border-[#ebdcd0] soft-shadow-sm transition-transform hover:-translate-y-1">
                                            <HeartHandshake className="text-[#bc8a7e] shrink-0" size={24} strokeWidth={2} />
                                            <span className="font-bold text-[#4a3f35] text-[0.95rem] tracking-wider">経験豊富なフローリスト</span>
                                        </div>
                                        <div className="flex items-center gap-4 bg-[#fdfbf6] p-4 rounded-xl border border-[#ebdcd0] soft-shadow-sm transition-transform hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                                            <Truck className="text-[#bc8a7e] shrink-0" size={24} strokeWidth={2} />
                                            <span className="font-bold text-[#4a3f35] text-[0.95rem] tracking-wider">小樽市内・全国配送対応</span>
                                        </div>
                                    </div>

                                    <div className="mt-14 flex justify-center md:justify-start">
                                        <Link to="/about" className="w-full max-w-[320px] py-4 md:py-4 border-[1.5px] border-[#4a3f35] text-[#4a3f35] rounded-full font-bold text-center hover:bg-[#4a3f35] hover:text-[#fdfbf6] active:scale-95 transition-all duration-300 text-sm md:text-[1rem] tracking-widest bg-transparent block">
                                            歴史とこだわりを詳しく見る
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* 7. 年表・歴史セクション */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="bg-[#f0e9df] px-6 pt-20 md:pt-32 pb-24 md:pb-32 border-t border-[#d8c8b6] shadow-inner relative"
                    >
                        <div className="max-w-4xl mx-auto">
                            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]" />

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                                className="text-center mb-16 md:mb-24 relative z-10"
                            >
                                <h2 className="text-[1.4rem] md:text-[2.4rem] font-bold text-[#4a3f35] leading-loose tracking-widest drop-shadow-sm">
                                    大正から令和へ。<br />小樽の街と生きてきた<br />100年の軌跡。
                                </h2>
                            </motion.div>

                            <div className="relative max-w-sm md:max-w-2xl mx-auto pl-10 md:pl-16 border-l-2 border-[#b5a392] space-y-16 md:space-y-20 pb-4 z-10">
                                <motion.div
                                    className="relative"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
                                >
                                    <span className="absolute -left-[46px] md:-left-[71px] bg-[#6e5e54] w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full border-2 border-[#f0e9df] top-2 soft-shadow-sm ring-4 ring-[#f0e9df]"></span>
                                    <h4 className="text-xl md:text-2xl font-bold text-[#4a3f35] mb-3 md:mb-5 tracking-wider">1920年：誕生</h4>
                                    <p className="text-[0.95rem] md:text-[1.1rem] text-[#6e5e54] leading-[2.2]">
                                        大正9年、小樽で産声を上げる。
                                    </p>
                                </motion.div>

                                <motion.div
                                    className="relative"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
                                >
                                    <span className="absolute -left-[46px] md:-left-[71px] bg-[#6e5e54] w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full border-2 border-[#f0e9df] top-2 soft-shadow-sm ring-4 ring-[#f0e9df]"></span>
                                    <h4 className="text-xl md:text-2xl font-bold text-[#4a3f35] mb-3 md:mb-5 tracking-wider">寄り添う</h4>
                                    <p className="text-[0.95rem] md:text-[1.1rem] text-[#6e5e54] leading-[2.2]">
                                        嬉しい日も悲しい日も、街の暮らしに花を添える。
                                    </p>
                                </motion.div>

                                <motion.div
                                    className="relative"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
                                >
                                    <span className="absolute -left-[46px] md:-left-[71px] bg-[#6e5e54] w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full border-2 border-[#f0e9df] top-2 soft-shadow-sm ring-4 ring-[#f0e9df]"></span>
                                    <h4 className="text-xl md:text-2xl font-bold text-[#4a3f35] mb-3 md:mb-5 tracking-wider">これから</h4>
                                    <p className="text-[0.95rem] md:text-[1.1rem] text-[#6e5e54] leading-[2.2]">
                                        品質へのこだわりと、次の100年への想。
                                    </p>
                                </motion.div>
                            </div>

                            <Link to="/about" className="relative z-10 mt-20 md:mt-28 w-full max-w-[320px] md:max-w-[400px] py-4 md:py-5 border-[1.5px] border-[#6e5e54] text-[#6e5e54] rounded-full font-bold mx-auto block hover:bg-[#6e5e54] hover:text-[#fdfbf6] active:scale-95 transition-all text-sm md:text-[1.05rem] tracking-widest bg-transparent text-center shadow-sm">
                                歴史とこだわりを詳しく見る
                            </Link>
                        </div>
                    </motion.section>
                </motion.div>
            )}
        </div>
    );
}
