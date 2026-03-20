import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Success() {

    useEffect(() => {
        // 画面の一番上へスクロールさせる
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-hidden flex flex-col items-center justify-center -mt-[3rem] md:-mt-[4rem]">

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
                        <p className="text-[0.8rem] md:text-[0.95rem] text-[#6e5e54] tracking-widest font-bold">注文番号：<span className="text-[#8e3a3a] font-normal text-[1rem] md:text-[1.1rem]">#1092-A</span></p>
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
