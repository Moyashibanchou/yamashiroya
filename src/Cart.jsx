import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext.jsx';

export default function Cart() {
    const { items, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-x-hidden md:pb-20">

            {/* 1. 戻るボタン */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-2">
                <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 md:gap-2.5 text-[#6e5e54] font-bold text-sm md:text-base hover:text-[#3E2723] active:scale-95 transition-all w-fit cursor-pointer">
                    <ArrowLeft className="w-[18px] md:w-[22px]" strokeWidth={2.5} />
                    戻る
                </button>
            </div>

            {/* 2. メインコンテンツ（PCは2カラム） */}
            <div className="max-w-6xl mx-auto px-5 md:px-6 py-8 md:py-16 md:flex md:gap-14 lg:gap-20 md:items-start">

                {/* 左側：商品リスト */}
                <section className="md:w-[60%] lg:w-[65%]">
                    <h2 className="text-xl md:text-2xl font-bold text-[#4a3f35] tracking-widest mb-8 md:mb-10 border-l-[4px] border-[#bc8a7e] pl-4">
                        お買い物かご
                    </h2>

                    {items.length === 0 ? (
                        <div className="text-center py-20 bg-[#fdfbf6] rounded-3xl border border-[#ebdcd0] soft-shadow-sm">
                            <p className="text-[#6e5e54] mb-10 text-[1rem] md:text-[1.1rem] font-medium leading-[2.2]">
                                カートに商品がありません。<br />
                                山城屋の心温まるお花をぜひご覧ください。
                            </p>
                            <Link to="/" className="inline-block py-4 px-10 bg-[#405342] text-[#fdfbf6] rounded-full text-[1rem] md:text-[1.05rem] font-bold shadow-md hover:bg-[#2B5740] active:scale-95 transition-all duration-300 tracking-widest hover:shadow-lg">
                                お花を探す
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6 md:space-y-8">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 md:gap-8 p-4 md:p-6 bg-[#fdfbf6] rounded-2xl md:rounded-3xl border border-[#ebdcd0] soft-shadow-sm relative transition-shadow hover:shadow-md group">
                                    <div className="w-24 h-24 md:w-36 md:h-36 bg-[#f5efe9] rounded-xl md:rounded-2xl overflow-hidden shrink-0">
                                        <img src={item.image} alt="商品" className="w-full h-full object-cover mix-blend-multiply opacity-95 group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex flex-col flex-1 py-1 md:py-3 justify-between">
                                        <div>
                                            <h3 className="text-[0.9rem] md:text-[1.15rem] font-bold text-[#4a3f35] leading-[1.6] md:leading-[1.8] mb-2 pr-8 md:pr-12">
                                                {item.name}
                                            </h3>
                                            <p className="text-[0.8rem] md:text-[0.95rem] font-bold text-[#8a7a6c]">数量: {item.quantity}</p>
                                        </div>
                                        <p className="text-[1.1rem] md:text-[1.4rem] font-bold text-[#9e4646] tracking-widest self-end">
                                            ¥{item.price.toLocaleString()} <span className="text-[0.65rem] md:text-[0.8rem] text-[#8a7a6c] font-normal">税込</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute top-4 md:top-6 right-4 md:right-6 text-[#bc8a7e] hover:text-[#9e4646] p-2 hover:bg-[#f5efe9] rounded-full active:scale-90 transition-all"
                                        aria-label="削除"
                                    >
                                        <Trash2 className="w-[18px] md:w-[22px]" />
                                    </button>
                                </div>
                            ))}

                            <p className="hidden md:block text-[0.9rem] text-[#8a7a6c] font-medium tracking-wider leading-relaxed pt-2 pl-2">
                                ※ 北海道内は送料無料。その他の地域への配送は、決済画面でご確認ください。
                            </p>
                        </div>
                    )}
                </section>

                {/* 右側：合計金額・レジへ進む（PCのみsticky） */}
                {items.length > 0 && (
                    <section className="md:w-[40%] lg:w-[35%] md:sticky md:top-32 mt-12 md:mt-0">
                        <div className="p-6 md:p-8 md:bg-[#fdfbf6]/80 md:backdrop-blur-xl bg-[#f5efe9] md:shadow-[0_8px_32px_rgba(74,63,53,0.06)] rounded-2xl md:rounded-3xl border border-[#ebdcd0] md:border-t-4 md:border-t-[#8e3a3a]">
                            <h3 className="hidden md:block text-[1.2rem] font-bold text-[#4a3f35] tracking-widest mb-6 border-b border-[#ebdcd0] pb-4">
                                ご注文内容
                            </h3>
                            <div className="flex justify-between items-center mb-4 md:mb-5">
                                <span className="text-[0.9rem] md:text-[1.05rem] font-bold text-[#6e5e54] tracking-widest">小計</span>
                                <span className="text-[1.1rem] md:text-[1.2rem] font-bold text-[#4a3f35] tracking-widest">¥{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center mb-5 md:mb-6 pb-5 md:pb-6 border-b border-[#d8c8b6]">
                                <span className="text-[0.9rem] md:text-[1.05rem] font-bold text-[#6e5e54] tracking-widest">送料</span>
                                <span className="text-[0.9rem] md:text-[1.05rem] font-bold text-[#6e5e54] tracking-widest">お届け先入力へ</span>
                            </div>
                            <div className="flex justify-between items-end mb-8">
                                <span className="text-lg md:text-xl font-bold text-[#4a3f35] tracking-widest">合計 <span className="text-[0.7rem] md:text-[0.8rem] font-normal text-[#6e5e54]">（税込）</span></span>
                                <span className="text-2xl md:text-3xl font-bold text-[#9e4646] tracking-widest">¥{cartTotal.toLocaleString()}</span>
                            </div>

                            {/* PC用のCTAボタン（モバイルでは非表示） */}
                            <div className="hidden md:block">
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full py-5 rounded-xl text-[1.1rem] font-bold shadow-md active:scale-95 transition-all duration-200 tracking-[0.15em] bg-[#8e3a3a] text-white hover:bg-[#7a3131]"
                                >
                                    レジへ進む
                                </button>
                            </div>
                        </div>

                        <p className="md:hidden text-[0.8rem] text-[#8a7a6c] tracking-wider leading-relaxed pt-6 pb-32 text-center">
                            ※北海道内は送料無料。その他の地域への配送は、決済画面でご確認ください。
                        </p>
                    </section>
                )}
            </div>

            {/* モバイル用固定フッター（PCでは非表示） */}
            {items.length > 0 && (
                <div className="md:hidden fixed bottom-0 w-full bg-[#fdfbf6]/95 backdrop-blur-md border-t border-[#ebdcd0] px-5 py-5 soft-shadow-sm pb-[env(safe-area-inset-bottom,1.25rem)] z-50">
                    <button
                        onClick={() => navigate('/checkout')}
                        className="w-full py-4 bg-[#8e3a3a] text-white rounded-xl text-[1.1rem] font-bold shadow-[0_8px_24px_rgba(142,58,58,0.2)] hover:bg-[#7a3131] active:scale-95 transition-all duration-200 tracking-widest border border-white/10"
                    >
                        レジへ進む
                    </button>
                </div>
            )}
        </div>
    );
}
