import React from 'react';
import { ArrowLeft, Leaf, Sparkles, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-x-hidden pb-32 md:pb-40">

            {/* 1. ヘッダー（固定） */}
            <header className="sticky top-0 z-50 bg-[#fdfbf6]/90 backdrop-blur-md border-b border-[#ebdcd0] soft-shadow-header">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 md:gap-2.5 text-[#6e5e54] font-bold text-sm md:text-base hover:text-[#3E2723] active:scale-95 transition-all w-[70px] md:w-[100px]">
                        <ArrowLeft className="w-[18px] md:w-[22px]" strokeWidth={2.5} />
                        戻る
                    </button>
                    <h1 className="text-[1.1rem] md:text-[1.4rem] text-[#3E2723] brush-font font-bold absolute left-1/2 -translate-x-1/2">山城屋について</h1>
                    <div className="w-[70px] md:w-[100px]"></div>
                </div>
            </header>

            {/* 2. メインビジュアル */}
            <section className="w-full max-w-6xl mx-auto md:px-6 md:pt-10">
                <div className="w-full aspect-square md:aspect-[21/9] relative border-b md:border border-[#ebdcd0] md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl">
                    <img
                        src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=2000"
                        alt="美しいブーケと職人の手"
                        className="w-full h-full object-cover mix-blend-multiply opacity-90"
                    />
                    {/* 薄いグラデーションオーバーレイで画像の存在感を引き立てる */}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#4a3f35]/80 via-[#4a3f35]/40 to-transparent flex items-end md:items-center justify-center md:justify-start pb-10 md:pb-0 pl-0 md:pl-20">
                        <h2 className="text-[#fdfbf6] text-[1.4rem] md:text-[2.6rem] font-bold leading-relaxed md:leading-[1.6] tracking-[0.2em] md:tracking-[0.25em] drop-shadow-2xl text-center md:text-left">
                            大正九年より、<br />小樽の街と共に。
                        </h2>
                    </div>
                </div>
            </section>

            {/* 3. ストーリー本文 */}
            <section className="px-6 pt-16 md:pt-24 pb-14 md:pb-24 text-justify">
                <div className="max-w-3xl mx-auto space-y-8 md:space-y-12 text-[0.95rem] md:text-[1.2rem] text-[#4a3f35] leading-[2.2] md:leading-[2.4] tracking-wide font-medium">
                    <p>
                        1920年の創業以来、私たち花の山城屋は、小樽の人々の喜怒哀楽に花を添えてまいりました。
                    </p>
                    <p>
                        嬉しい日も、悲しい日も。何気ない日常や、一度きりの特別な瞬間にも。花は言葉以上の想いを伝える「手紙」のようなものだと考えています。
                    </p>
                    <p>
                        市場で直接目利きをした新鮮な花材だけを使用し、花に携わり続けてきた熟練のスタッフが、お客様の想いを一つひとつ丁寧にお仕立てします。
                    </p>
                </div>
            </section>

            {/* 4. こだわりのポイント（3つの特徴） */}
            <section className="bg-[#f5efe9] border-y border-[#ebdcd0] py-16 md:py-28">
                <div className="max-w-6xl mx-auto px-6">
                    <h3 className="text-[1.2rem] md:text-[1.8rem] font-bold text-[#4a3f35] mb-12 md:mb-20 text-center tracking-[0.2em] relative max-w-4xl mx-auto">
                        <span className="bg-[#f5efe9] px-6 md:px-10 relative z-10">私たちのこだわり</span>
                        <span className="absolute top-1/2 left-0 w-full h-[1px] md:h-[2px] bg-[#d8c8b6] -z-0"></span>
                    </h3>

                    <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
                        {/* 特徴 1 */}
                        <div className="bg-[#fdfbf6] p-8 md:p-10 rounded-2xl md:rounded-3xl border border-[#ebdcd0] soft-shadow md:shadow-lg flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#f5efe9] rounded-full flex justify-center items-center mb-6 text-[#8e3a3a] border border-[#d8c8b6]">
                                <Leaf size={32} strokeWidth={2} className="md:w-10 md:h-10" />
                            </div>
                            <h4 className="text-[1.05rem] md:text-[1.25rem] font-bold text-[#4a3f35] tracking-widest mb-4">鮮度へのこだわり</h4>
                            <p className="text-[0.85rem] md:text-[1rem] text-[#6e5e54] leading-[2.2] text-justify md:text-center mt-2">
                                全国から質の高い花材を直接仕入れ、一つひとつ水揚げから丁寧に管理しています。花本来の美しさを長く楽しんでいただけるよう、最高水準の鮮度でお届けします。
                            </p>
                        </div>

                        {/* 特徴 2 */}
                        <div className="bg-[#fdfbf6] p-8 md:p-10 rounded-2xl md:rounded-3xl border border-[#ebdcd0] soft-shadow md:shadow-lg flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#f5efe9] rounded-full flex justify-center items-center mb-6 text-[#8e3a3a] border border-[#d8c8b6]">
                                <Sparkles size={32} strokeWidth={2} className="md:w-10 md:h-10" />
                            </div>
                            <h4 className="text-[1.05rem] md:text-[1.25rem] font-bold text-[#4a3f35] tracking-widest mb-4">技術へのこだわり</h4>
                            <p className="text-[0.85rem] md:text-[1rem] text-[#6e5e54] leading-[2.2] text-justify md:text-center mt-2">
                                長年花と向き合ってきた経験豊富なフローリストたちが、皆様のご要望にお応えします。伝統的なアレンジからモダンなブーケまで、確かな技術で花を束ねます。
                            </p>
                        </div>

                        {/* 特徴 3 */}
                        <div className="bg-[#fdfbf6] p-8 md:p-10 rounded-2xl md:rounded-3xl border border-[#ebdcd0] soft-shadow md:shadow-lg flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#f5efe9] rounded-full flex justify-center items-center mb-6 text-[#8e3a3a] border border-[#d8c8b6]">
                                <MapPin size={32} strokeWidth={2} className="md:w-10 md:h-10" />
                            </div>
                            <h4 className="text-[1.05rem] md:text-[1.25rem] font-bold text-[#4a3f35] tracking-widest mb-4">地域への想い</h4>
                            <p className="text-[0.85rem] md:text-[1rem] text-[#6e5e54] leading-[2.2] text-justify md:text-center mt-2">
                                大正・昭和・平成・令和と、100年にわたり小樽の街と共に歩んできました。地元の皆様への感謝を胸に、これからも「まちの花屋」であり続けます。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* フッターリンクエリア（トップへ戻る） */}
            <div className="pt-20 flex justify-center px-6">
                <Link
                    to="/"
                    className="w-full max-w-[320px] md:max-w-[400px] py-4 md:py-5 bg-[#fdfbf6] text-[#4a3f35] border-[2px] border-[#a38f7d] rounded-full text-center text-[1rem] md:text-[1.1rem] font-bold hover:bg-[#4a3f35] hover:text-[#fdfbf6] hover:border-[#4a3f35] active:scale-95 transition-all duration-300 tracking-[0.2em] shadow-sm hover:shadow-lg"
                >
                    お花を探す
                </Link>
            </div>

        </div>
    );
}
