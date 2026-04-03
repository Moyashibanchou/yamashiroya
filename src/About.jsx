import React, { useEffect, useState } from 'react';
import { ArrowLeft, Leaf, Sparkles, MapPin, Clock, Mail, Phone, Printer } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HistoryTimeline } from './History.jsx';

export default function About() {
    const navigate = useNavigate();
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ゆったりとした優美なフェードアニメーション（老舗・高級感）
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4,
                delayChildren: 0.2
            }
        }
    };

    const itemFadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.5, ease: [0.25, 0.8, 0.25, 1] }
        }
    };

    const itemFadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
        }
    };

    return (
        <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-x-hidden flex flex-col">
            {/* 1. 戻るボタン */}
            <div className="max-w-6xl mx-auto w-full px-4 md:px-6 pt-6 md:pt-8 pb-2">
                <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 md:gap-2.5 text-[#6e5e54] font-bold text-sm md:text-base hover:text-[#3E2723] active:scale-95 transition-all w-fit cursor-pointer">
                    <ArrowLeft className="w-[18px] md:w-[22px]" strokeWidth={2.5} />
                    戻る
                </button>
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* 2. メインビジュアル */}
                <section className="w-full max-w-6xl mx-auto md:px-6 md:pt-10">
                    <motion.div variants={itemFadeIn} className="w-full aspect-square md:aspect-[21/9] relative border-b md:border border-[#ebdcd0] md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl">
                        <img
                            src="/picture_city.jpg"
                            alt="小樽の水彩イメージ"
                            className="w-full h-full object-contain bg-[#f5efe9] opacity-95"
                        />
                        {/* 薄いグラデーションオーバーレイ */}
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#4a3f35]/80 via-[#4a3f35]/40 to-transparent flex items-end md:items-center justify-center md:justify-start pb-10 md:pb-0 pl-0 md:pl-20">
                            <motion.h2 variants={itemFadeUp} className="text-[#fdfbf6] text-[1.4rem] md:text-[2.6rem] font-bold leading-relaxed md:leading-[1.6] tracking-[0.2em] md:tracking-[0.25em] drop-shadow-2xl text-center md:text-left">
                                大正九年より、<br />小樽の街と共に。
                            </motion.h2>
                        </div>
                    </motion.div>
                </section>

                {/* 3. ストーリー本文 */}
                <section className="px-6 pt-16 md:pt-24 pb-14 md:pb-24 text-center md:text-left">
                    <div className="max-w-3xl mx-auto space-y-8 md:space-y-12 text-[0.95rem] md:text-[1.2rem] text-[#4a3f35] leading-[2.2] md:leading-[2.4] tracking-wide font-medium">
                        <motion.p variants={itemFadeUp}>
                            1920年の創業以来、<br className="block md:hidden" />私たち花の山城屋は、小樽の人々の喜怒哀楽に花を添えてまいりました。
                        </motion.p>
                        <motion.p variants={itemFadeUp}>
                            嬉しい日も、悲しい日も。<br className="block md:hidden" />何気ない日常や、一度きりの特別な瞬間にも。花は言葉以上の想いを伝える「手紙」のようなものだと考えています。
                        </motion.p>
                        <motion.p variants={itemFadeUp}>
                            市場で直接目利きをした新鮮な花材だけを使用し、<br className="block md:hidden" />花に携わり続けてきた熟練のスタッフが、お客様の想いを一つひとつ丁寧にお仕立てします。
                        </motion.p>
                    </div>
                </section>
            </motion.div>

            {/* 4. こだわりのポイント（3つの特徴） - スクロールアニメーション */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={containerVariants}
                className="bg-[#f5efe9] border-y border-[#ebdcd0] py-16 md:py-28"
            >
                <div className="max-w-6xl mx-auto px-6">
                    <motion.h3 variants={itemFadeUp} className="text-[1.2rem] md:text-[1.8rem] font-bold text-[#4a3f35] mb-12 md:mb-20 text-center tracking-[0.2em] relative max-w-4xl mx-auto">
                        <span className="bg-[#f5efe9] px-6 md:px-10 relative z-10">私たちのこだわり</span>
                        <span className="absolute top-1/2 left-0 w-full h-[1px] md:h-[2px] bg-[#d8c8b6] -z-0"></span>
                    </motion.h3>

                    <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
                        {/* 特徴 1 */}
                        <motion.div variants={itemFadeUp} className="bg-[#fffdf7] p-8 md:p-10 rounded-2xl md:rounded-3xl border border-[#ebdcd0] soft-shadow md:shadow-lg flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#f5efe9] rounded-full flex justify-center items-center mb-6 text-[#2B5740] border border-[#d8c8b6]">
                                <Leaf size={32} strokeWidth={2} className="md:w-10 md:h-10" />
                            </div>
                            <h4 className="text-[1.05rem] md:text-[1.25rem] font-bold text-[#4a3f35] tracking-widest mb-4">鮮度へのこだわり</h4>
                            <p className="text-[0.85rem] md:text-[1rem] text-[#6e5e54] leading-[2.2] text-center mt-2">
                                全国から質の高い花材を直接仕入れ、一つひとつ水揚げから丁寧に管理しています。花本来の美しさを長く楽しんでいただけるよう、最高水準の鮮度でお届けします。
                            </p>
                        </motion.div>

                        {/* 特徴 2 */}
                        <motion.div variants={itemFadeUp} className="bg-[#fffdf7] p-8 md:p-10 rounded-2xl md:rounded-3xl border border-[#ebdcd0] soft-shadow md:shadow-lg flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#f5efe9] rounded-full flex justify-center items-center mb-6 text-[#2B5740] border border-[#d8c8b6]">
                                <Sparkles size={32} strokeWidth={2} className="md:w-10 md:h-10" />
                            </div>
                            <h4 className="text-[1.05rem] md:text-[1.25rem] font-bold text-[#4a3f35] tracking-widest mb-4">技術へのこだわり</h4>
                            <p className="text-[0.85rem] md:text-[1rem] text-[#6e5e54] leading-[2.2] text-center mt-2">
                                長年花と向き合ってきた経験豊富なフローリストたちが、皆様のご要望にお応えします。伝統的なアレンジからモダンなブーケまで、確かな技術で花を束ねます。
                            </p>
                        </motion.div>

                        {/* 特徴 3 */}
                        <motion.div variants={itemFadeUp} className="bg-[#fffdf7] p-8 md:p-10 rounded-2xl md:rounded-3xl border border-[#ebdcd0] soft-shadow md:shadow-lg flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#f5efe9] rounded-full flex justify-center items-center mb-6 text-[#2B5740] border border-[#d8c8b6]">
                                <MapPin size={32} strokeWidth={2} className="md:w-10 md:h-10" />
                            </div>
                            <h4 className="text-[1.05rem] md:text-[1.25rem] font-bold text-[#4a3f35] tracking-widest mb-4">地域への想い</h4>
                            <p className="text-[0.85rem] md:text-[1rem] text-[#6e5e54] leading-[2.2] text-center mt-2">
                                大正・昭和・平成・令和と、100年にわたり小樽の街と共に歩んできました。地元の皆様への感謝を胸に、これからも「まちの花屋」であり続けます。
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* 5. 年表セクション（折りたたみ） */}
            <section className="pt-20 md:pt-28 px-6">
                <div className="max-w-6xl mx-auto">
                    <button
                        type="button"
                        onClick={() => setIsTimelineOpen((v) => !v)}
                        className="w-full bg-[#fdfbf6]/90 backdrop-blur-md border border-[#ebdcd0] rounded-2xl soft-shadow-sm px-5 md:px-6 py-5 md:py-6 text-left hover:shadow-md transition-shadow"
                        aria-expanded={isTimelineOpen}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-[0.78rem] md:text-[0.85rem] tracking-[0.25em] text-[#a38f7d] font-bold">
                                    100年以上の歩み
                                </div>
                                <div className="mt-1 text-xl md:text-2xl font-bold tracking-widest text-[#4a3f35]">
                                    山城屋の歴史
                                </div>
                            </div>
                            <span className="text-[#6e5e54] font-bold tracking-widest text-[0.95rem] md:text-[1.0rem]">
                                {isTimelineOpen ? '閉じる' : '開く'}
                            </span>
                        </div>
                        <p className="mt-3 text-[0.9rem] md:text-[1.0rem] text-[#6e5e54] leading-[2.1] md:leading-[2.25] tracking-widest">
                            山城屋の出来事と、時代の出来事を並べてご覧いただけます。
                        </p>
                    </button>
                </div>

                <AnimatePresence initial={false}>
                    {isTimelineOpen && (
                        <motion.div
                            key="timeline"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="pt-10">
                                <HistoryTimeline />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* 6. 会社情報（ページ最下部へ） */}
            <section className="mt-auto pb-12 md:pb-14 px-6 pt-20">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="bg-[#fdfbf6]/90 backdrop-blur-md border border-[#ebdcd0] rounded-3xl soft-shadow overflow-hidden relative">
                        <div className="absolute inset-0 p-6 md:p-10 pointer-events-none">
                            <img
                                src="/picture_city.jpg"
                                alt="小樽の水彩イメージ"
                                className="w-full h-full object-contain opacity-45"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf6]/85 via-[#fdfbf6]/55 to-[#fdfbf6]/85 pointer-events-none" />
                        <div className="relative z-10 px-6 md:px-10 py-8 md:py-10">
                            <h2 className="text-[#4a3f35] text-[1.15rem] md:text-[1.4rem] font-bold tracking-[0.2em] text-center">
                                有限会社 山城屋生花店
                            </h2>
                            <p className="mt-3 text-[#6e5e54] text-[0.9rem] md:text-[1.0rem] tracking-widest text-center">
                                山城 栄太郎（代表取締役）
                            </p>

                            <div className="mt-8 overflow-x-auto">
                                <table className="w-full text-left">
                                    <tbody className="text-[#4a3f35]">
                                        <tr className="border-t border-[#ebdcd0]/80">
                                            <th className="py-4 pr-4 w-[140px] md:w-[180px] text-xs md:text-sm tracking-[0.2em] text-[#8a7a6c] font-bold whitespace-nowrap">所在地</th>
                                            <td className="py-4 text-[0.95rem] md:text-[1.05rem] leading-[2.1] tracking-widest">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="mt-0.5 w-4 h-4 text-[#2B5740]" />
                                                    <span>〒047-0024<br className="block md:hidden" /> 北海道小樽市花園4-4-2</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-t border-[#ebdcd0]/80">
                                            <th className="py-4 pr-4 text-xs md:text-sm tracking-[0.2em] text-[#8a7a6c] font-bold whitespace-nowrap">定休日</th>
                                            <td className="py-4 text-[0.95rem] md:text-[1.05rem] tracking-widest">元日のみ</td>
                                        </tr>
                                        <tr className="border-t border-[#ebdcd0]/80">
                                            <th className="py-4 pr-4 text-xs md:text-sm tracking-[0.2em] text-[#8a7a6c] font-bold whitespace-nowrap">営業時間</th>
                                            <td className="py-4 text-[0.95rem] md:text-[1.05rem] tracking-widest">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-[#2B5740]" />
                                                    <span>9:00〜18:00</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-t border-[#ebdcd0]/80">
                                            <th className="py-4 pr-4 text-xs md:text-sm tracking-[0.2em] text-[#8a7a6c] font-bold whitespace-nowrap">メール</th>
                                            <td className="py-4 text-[0.95rem] md:text-[1.05rem] tracking-widest">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-[#2B5740]" />
                                                    <a className="hover:underline" href="mailto:yamashiroya1187@gmail.com">yamashiroya1187@gmail.com</a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-t border-[#ebdcd0]/80">
                                            <th className="py-4 pr-4 text-xs md:text-sm tracking-[0.2em] text-[#8a7a6c] font-bold whitespace-nowrap">Tel</th>
                                            <td className="py-4 text-[0.95rem] md:text-[1.05rem] tracking-widest">
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-[#2B5740]" />
                                                    <a className="hover:underline" href="tel:0134231187">0134-23-1187</a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-t border-[#ebdcd0]/80 border-b border-[#ebdcd0]/80">
                                            <th className="py-4 pr-4 text-xs md:text-sm tracking-[0.2em] text-[#8a7a6c] font-bold whitespace-nowrap">Fax</th>
                                            <td className="py-4 text-[0.95rem] md:text-[1.05rem] tracking-widest">
                                                <div className="flex items-center gap-2">
                                                    <Printer className="w-4 h-4 text-[#2B5740]" />
                                                    <span>0134-23-1188</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#2b2320]/70 backdrop-blur-md border border-[#ebdcd0]/30 rounded-3xl px-5 md:px-8 py-6 md:py-8 soft-shadow overflow-hidden">
                        <div className="text-center">
                            <div className="text-[0.75rem] md:text-[0.85rem] tracking-[0.28em] text-[#e8dfd6] font-bold">
                                Access
                            </div>
                            <h3 className="mt-2 text-[#fdfbf6] text-[1.15rem] md:text-[1.5rem] font-bold tracking-[0.22em]">
                                アクセス
                            </h3>
                        </div>

                        <div className="mt-6 md:mt-7">
                            <iframe src="https://maps.google.co.jp/maps?output=embed&q=北海道小樽市花園4-4-2+花の山城屋" className="w-full h-64 md:h-80 rounded-lg shadow-md border-0" allowFullScreen loading="lazy"></iframe>
                        </div>

                        <div className="mt-6 md:mt-7 space-y-4 text-[#f3ece6] text-[0.92rem] md:text-[1.02rem] leading-[2.1] tracking-widest">
                            <p>
                                <span className="font-bold tracking-[0.22em]">[鉄道]</span>
                                <span className="ml-2">JR函館本線・小樽駅から徒歩約13分、南小樽駅から徒歩約14分</span>
                            </p>
                            <p>
                                <span className="font-bold tracking-[0.22em]">[バス]</span>
                                <span className="ml-2">中央バス「花園公園通り（花の山城屋前）」停留所</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            to="/"
                            className="w-full max-w-[320px] md:max-w-[400px] py-4 md:py-5 bg-[#4a3f35] text-[#fdfbf6] rounded-full text-center text-[1rem] md:text-[1.1rem] font-bold hover:bg-[#322a23] active:scale-95 transition-all duration-300 tracking-[0.2em] shadow-md cursor-pointer"
                        >
                            トップページへ戻る
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
