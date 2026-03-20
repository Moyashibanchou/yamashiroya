import React, { useEffect } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductList() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 合計8個のダミー商品
    const products = [
        {
            id: 1,
            name: '季節のお祝いアレンジメント\n（華やか）',
            price: '¥5,500',
            image: 'https://images.unsplash.com/photo-1543881524-76f578496417?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: 'おすすめ'
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
        },
        // 追加のダミー商品
        {
            id: 5,
            name: '感謝を伝える\nカーネーション花束',
            price: '¥3,850',
            image: 'https://images.unsplash.com/photo-1560790671-b76ca4de55ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 6,
            name: 'ご開業祝い\nプレミアム胡蝶蘭（3本立）',
            price: '¥22,000',
            image: 'https://images.unsplash.com/photo-1613521140785-e87e408ec563?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: '人気No.1'
        },
        {
            id: 7,
            name: '爽やかなグリーン\n観葉植物ギフト',
            price: '¥8,800',
            image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 8,
            name: '思い出を残す\nプリザーブドフラワーBOX',
            price: '¥7,700',
            image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ];

    return (
        <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-x-hidden md:pb-20">

            {/* 1. 戻るボタン */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-2">
                <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 md:gap-2.5 text-[#6e5e54] font-bold text-sm md:text-base hover:text-[#3E2723] active:scale-95 transition-all w-fit cursor-pointer">
                    <ArrowLeft className="w-[18px] md:w-[22px]" strokeWidth={2.5} />
                    戻る
                </button>
            </div>

            {/* 2. 検索条件・絞り込みサマリー */}
            <div className="bg-[#f5efe9] border-b border-[#ebdcd0]">
                <div className="max-w-6xl mx-auto px-5 md:px-6 py-4 flex justify-between items-center text-[#6e5e54]">
                    <div>
                        <span className="text-[0.7rem] md:text-[0.8rem] font-bold tracking-widest block mb-0.5 opacity-80">現在の検索条件：</span>
                        <div className="text-[0.95rem] md:text-[1.1rem] font-bold tracking-wider text-[#4a3f35] flex items-center gap-2">
                            すべての商品 <span className="text-[0.8rem] font-normal text-[#8a7a6c]">（全{products.length}件）</span>
                        </div>
                    </div>

                    <button className="flex items-center gap-1.5 md:gap-2 text-[0.8rem] md:text-[0.9rem] font-bold border border-[#d8c8b6] bg-white px-3 md:px-4 py-2 md:py-2.5 rounded-full hover:bg-[#ebdcd0] transition-colors">
                        <SlidersHorizontal size={16} className="md:w-[18px]" />
                        絞り込み <ChevronDown size={14} />
                    </button>
                </div>
            </div>

            {/* 3. 商品一覧グリッド */}
            <main className="max-w-6xl mx-auto px-5 md:px-6 pt-10 md:pt-16 pb-20 md:pb-28">

                {/* ページ内での並び替えなどのツールバー */}
                <div className="flex justify-between items-end mb-8 md:mb-12">
                    <h2 className="text-lg md:text-2xl font-bold text-[#4a3f35] tracking-widest border-b-2 border-[#bc8a7e] pb-2 md:pb-3 inline-block">
                        商品一覧
                    </h2>
                    <div className="hidden md:flex items-center gap-3 text-[0.9rem] font-bold text-[#8a7a6c]">
                        並び順：
                        <select className="bg-white border border-[#ebdcd0] py-2 px-3 rounded-md text-[#4a3f35] outline-none cursor-pointer hover:border-[#bc8a7e]">
                            <option>おすすめ順</option>
                            <option>価格が安い順</option>
                            <option>価格が高い順</option>
                            <option>新着順</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 flex-1">
                    {products.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="bg-[#fdfbf6] rounded-2xl md:rounded-3xl soft-shadow border border-[#ebdcd0] overflow-hidden flex flex-col group cursor-pointer block hover:shadow-[0_16px_40px_rgba(74,63,53,0.1)] transition-shadow duration-300 relative">
                            {/* バッジ */}
                            {product.badge && (
                                <div className="absolute top-4 left-4 z-10 bg-[#9e4646] text-white text-[0.75rem] font-bold px-3 py-1 rounded-sm shadow-md tracking-wider">
                                    {product.badge}
                                </div>
                            )}

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
                                    <span className="text-[0.7rem] ml-1 font-normal text-[#8a7a6c]">税込</span>
                                </p>
                                <div className="mt-5 w-full py-3 md:py-3.5 bg-[#f5f2e9] border border-[#d8c8b6] rounded-xl text-[0.95rem] font-bold group-hover:bg-[#bc8a7e] group-hover:text-white group-hover:border-[#bc8a7e] text-center transition-all duration-300 text-[#4a3f35]">
                                    詳細を見る
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* ページネーション */}
                <div className="mt-16 flex justify-center items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ebdcd0] text-[#a38f7d] hover:bg-[#f5efe9] transition-colors bg-white font-bold">&lsaquo;</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#bc8a7e] bg-[#bc8a7e] text-white font-bold shadow-sm">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ebdcd0] text-[#6e5e54] hover:bg-[#f5efe9] transition-colors bg-white font-bold">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ebdcd0] text-[#6e5e54] hover:bg-[#f5efe9] transition-colors bg-white font-bold">3</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ebdcd0] text-[#a38f7d] hover:bg-[#f5efe9] transition-colors bg-white font-bold">&rsaquo;</button>
                </div>

            </main>

        </div>
    );
}
