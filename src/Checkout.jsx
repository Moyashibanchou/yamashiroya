import React from 'react';
import { ArrowLeft, Lock, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext.jsx';

export default function Checkout() {
    const navigate = useNavigate();
    const { cartTotal, clearCart } = useCart();

    const handleConfirmOrder = () => {
        // 注文処理を想定したモック
        clearCart(); // カートを空にする
        navigate('/success'); // 注文完了ページへ
    };

    return (
        <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-x-hidden md:pb-20">

            {/* 1. ヘッダー（固定） */}
            <header className="sticky top-0 z-50 bg-[#fdfbf6]/90 backdrop-blur-md border-b border-[#ebdcd0] soft-shadow-header">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 md:gap-2.5 text-[#6e5e54] font-bold text-sm md:text-base hover:text-[#3E2723] active:scale-95 transition-all w-[70px] md:w-[100px]">
                        <ArrowLeft className="w-[18px] md:w-[22px]" strokeWidth={2.5} />
                        戻る
                    </button>
                    <h1 className="text-[1.1rem] md:text-[1.4rem] text-[#3E2723] brush-font font-bold absolute left-1/2 -translate-x-1/2 drop-shadow-sm">決済情報の入力</h1>
                    <div className="w-[70px] md:w-[100px]"></div>
                </div>
            </header>

            {/* 2. メインコンテンツ（PCは2カラム） */}
            <div className="max-w-6xl mx-auto px-6 py-8 md:py-16 md:flex md:gap-14 lg:gap-20 md:items-start">

                {/* 左側：入力フォーム */}
                <section className="md:w-[60%] lg:w-[65%]">
                    {/* お届け先情報 */}
                    <div className="mb-12">
                        <h2 className="text-[1.1rem] md:text-[1.3rem] font-bold text-[#4a3f35] tracking-widest mb-6 md:mb-8 border-b-2 border-[#bc8a7e] pb-3 inline-block">
                            1. お届け先情報
                        </h2>
                        <div className="space-y-5 md:space-y-6">
                            <div>
                                <label className="block text-[0.85rem] md:text-[0.95rem] font-bold text-[#8a7a6c] mb-2 tracking-wider">お名前（必須）</label>
                                <input type="text" placeholder="例：山田 太郎" className="w-full bg-[#fdfbf6] border border-[#d8c8b6] text-[#4a3f35] py-3.5 md:py-4 px-4 md:px-5 rounded-xl text-[0.95rem] md:text-[1.05rem] focus:outline-none focus:border-[#a38f7d] shadow-[0_2px_8px_rgba(74,63,53,0.03)]" />
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="block text-[0.85rem] md:text-[0.95rem] font-bold text-[#8a7a6c] mb-2 tracking-wider">郵便番号（必須）</label>
                                    <input type="text" placeholder="例：047-0000" className="w-full bg-[#fdfbf6] border border-[#d8c8b6] text-[#4a3f35] py-3.5 md:py-4 px-4 md:px-5 rounded-xl text-[0.95rem] md:text-[1.05rem] focus:outline-none focus:border-[#a38f7d] shadow-[0_2px_8px_rgba(74,63,53,0.03)]" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[0.85rem] md:text-[0.95rem] font-bold text-[#8a7a6c] mb-2 tracking-wider">ご住所（必須）</label>
                                <input type="text" placeholder="例：北海道小樽市〇〇" className="w-full bg-[#fdfbf6] border border-[#d8c8b6] text-[#4a3f35] py-3.5 md:py-4 px-4 md:px-5 rounded-xl text-[0.95rem] md:text-[1.05rem] focus:outline-none focus:border-[#a38f7d] shadow-[0_2px_8px_rgba(74,63,53,0.03)]" />
                            </div>
                        </div>
                    </div>

                    {/* ご依頼主情報 */}
                    <div className="mb-12">
                        <h2 className="text-[1.1rem] md:text-[1.3rem] font-bold text-[#4a3f35] tracking-widest mb-6 md:mb-8 border-b-2 border-[#bc8a7e] pb-3 inline-block">
                            2. ご依頼主情報
                        </h2>
                        <p className="text-[0.85rem] md:text-[0.95rem] text-[#6e5e54] mb-4 bg-[#f5efe9] p-4 rounded-xl border border-[#ebdcd0]">
                            お届け先と同じ場合は入力を省略できます。
                        </p>
                    </div>

                    {/* お支払い方法 */}
                    <div className="mb-12">
                        <h2 className="text-[1.1rem] md:text-[1.3rem] font-bold text-[#4a3f35] tracking-widest mb-6 md:mb-8 border-b-2 border-[#bc8a7e] pb-3 inline-block">
                            3. お支払い方法
                        </h2>
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 p-4 border border-[#ebdcd0] rounded-xl bg-[#fdfbf6] cursor-pointer hover:bg-[#f5efe9] transition-colors">
                                <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-[#8e3a3a]" />
                                <span className="font-bold text-[#4a3f35] text-[0.95rem] md:text-[1.05rem]">クレジットカード</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 border border-[#ebdcd0] rounded-xl bg-[#fdfbf6] cursor-pointer hover:bg-[#f5efe9] transition-colors">
                                <input type="radio" name="payment" className="w-5 h-5 accent-[#8e3a3a]" />
                                <span className="font-bold text-[#4a3f35] text-[0.95rem] md:text-[1.05rem]">銀行振込（前払い）</span>
                            </label>
                        </div>

                        <div className="mt-8 flex items-center gap-2 text-[0.8rem] md:text-[0.9rem] text-[#8a7a6c] justify-center bg-[#fdfbf6] py-3 border border-[#ebdcd0] rounded-xl soft-shadow-sm">
                            <Lock size={16} className="text-[#bc8a7e]" />
                            SSL暗号化通信によりお客様の情報は安全に保護されます。
                        </div>
                    </div>

                    <div className="md:hidden pb-32"></div>

                </section>

                {/* 右側：合計金額・注文を確定する（PCのみsticky） */}
                <section className="md:w-[40%] lg:w-[35%] md:sticky md:top-32">
                    <div className="p-6 md:p-8 bg-[#f5efe9] rounded-2xl md:rounded-3xl border border-[#ebdcd0] md:border-t-4 md:border-t-[#8e3a3a] mb-8">
                        <h3 className="hidden md:block text-[1.2rem] font-bold text-[#4a3f35] tracking-widest mb-6 border-b border-[#ebdcd0] pb-4">
                            最終確認
                        </h3>
                        <div className="flex justify-between items-center mb-4 md:mb-5">
                            <span className="text-[0.9rem] md:text-[1.05rem] font-bold text-[#6e5e54] tracking-widest">小計</span>
                            <span className="text-[1.1rem] md:text-[1.2rem] font-bold text-[#4a3f35] tracking-widest">¥{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-5 md:mb-6 pb-5 md:pb-6 border-b border-[#d8c8b6]">
                            <span className="text-[0.9rem] md:text-[1.05rem] font-bold text-[#6e5e54] tracking-widest">送料</span>
                            <span className="text-[0.9rem] md:text-[1.05rem] font-bold text-[#6e5e54] tracking-widest">¥1,100</span>
                        </div>
                        <div className="flex justify-between items-end mb-8 md:mb-10">
                            <span className="text-lg md:text-xl font-bold text-[#4a3f35] tracking-widest">合計 <span className="text-[0.7rem] md:text-[0.8rem] font-normal text-[#6e5e54]">（税込）</span></span>
                            <span className="text-3xl md:text-4xl font-bold text-[#9e4646] tracking-widest">¥{(cartTotal + 1100).toLocaleString()}</span>
                        </div>

                        {/* PC用のCTAボタン（モバイルでは非表示） */}
                        <div className="hidden md:block">
                            <button
                                onClick={handleConfirmOrder}
                                className="w-full py-5 rounded-xl text-[1.1rem] font-bold shadow-md active:scale-95 transition-all duration-200 tracking-[0.15em] bg-[#8e3a3a] text-white hover:bg-[#7a3131]"
                            >
                                注文を確定する
                            </button>
                            <p className="text-center text-[0.8rem] text-[#8a7a6c] mt-4 tracking-widest">
                                商品と希望日にお間違いがないか<br />再度ご確認ください。
                            </p>
                        </div>
                    </div>

                    {/* サポート案内 */}
                    <div className="hidden md:flex flex-col items-center justify-center p-6 bg-[#fdfbf6] rounded-2xl border border-[#ebdcd0]">
                        <Phone size={24} className="text-[#bc8a7e] mb-3" />
                        <p className="text-[0.85rem] font-bold text-[#4a3f35] mb-1">ご不明な点がございましたら</p>
                        <p className="text-[1.2rem] font-bold text-[#9e4646] tracking-widest">0134-XX-XXXX</p>
                        <p className="text-[0.7rem] text-[#8a7a6c] mt-1">受付時間：9:00 〜 18:00（水曜定休）</p>
                    </div>
                </section>
            </div>

            {/* 4. モバイル用固定フッター（PCでは非表示） */}
            <div className="md:hidden fixed bottom-0 w-full bg-[#fdfbf6]/95 backdrop-blur-md border-t border-[#ebdcd0] px-5 py-5 soft-shadow-sm pb-[env(safe-area-inset-bottom,1.25rem)] z-50">
                <button
                    onClick={handleConfirmOrder}
                    className="w-full py-4 bg-[#8e3a3a] text-white rounded-xl text-[1.1rem] font-bold shadow-[0_8px_24px_rgba(142,58,58,0.2)] hover:bg-[#7a3131] active:scale-95 transition-all duration-200 tracking-[0.15em] border border-white/10"
                >
                    注文を確定する
                </button>
            </div>

        </div>
    );
}
