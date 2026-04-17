import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Flower2 } from 'lucide-react';
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
  <div className="w-full min-h-screen bg-[#fff8f4] text-[#231a11] overflow-x-hidden">
    <div className="max-w-6xl mx-auto w-full px-4 md:px-6 pt-6 md:pt-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-[#231a11]/70 font-bold text-sm md:text-base hover:text-[#123F2A] active:scale-95 transition-all w-fit cursor-pointer"
      >
        <ArrowLeft className="w-[18px] md:w-[22px]" strokeWidth={2.5} />
        戻る
      </button>
    </div>

    {/* Hero */}
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative h-[520px] md:h-[720px] lg:h-[820px] overflow-hidden flex items-center justify-center"
    >
      <motion.div variants={itemFadeIn} className="absolute inset-0">
        <img
          src="/picture_city.jpg"
          alt="山城屋の内装"
          className="w-full h-full object-cover brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fff8f4]" />
      </motion.div>

      <div className="absolute left-6 md:left-12 top-24 md:top-28 text-white/90">
        <div
          className="font-hand tracking-[0.25em] text-[0.95rem] md:text-[1.05rem]"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          山城屋の歩み
        </div>
      </div>

      <div className="relative z-10 text-center text-white px-6">
        <motion.h1
          variants={itemFadeUp}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.12em] md:tracking-[0.2em] mb-6 drop-shadow-lg whitespace-normal break-words max-w-[92vw] mx-auto"
        >
          山城屋の歩み
        </motion.h1>
        <motion.p variants={itemFadeUp} className="text-lg md:text-2xl font-hand tracking-wide md:tracking-widest opacity-90 whitespace-normal break-words max-w-[92vw] mx-auto">
          小樽の地で百余年。四季折々の花と共に。
        </motion.p>
      </div>
    </motion.section>

    {/* Story */}
    <section className="py-24 bg-[#fff8f4] px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">
        <div className="w-full space-y-8">
          <div className="inline-block border-b border-[#123F2A]/30 pb-2">
            <span className="text-[#586330] text-sm tracking-[0.3em] uppercase">Origin</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#123F2A] tracking-wide md:tracking-widest whitespace-normal break-words">
            運河の街、小樽に根ざして
          </h2>
          <p className="text-lg leading-[1.9] text-[#231a11]/80 tracking-widest">
            1920年の創業以来、私たち花の山城屋は、小樽の人々の喜怒哀楽に花を添えてまいりました。
          </p>
          <p className="text-lg leading-[1.9] text-[#231a11]/80 tracking-widest">
            嬉しい日も、悲しい日も。何気ない日常や、一度きりの特別な瞬間にも。花は言葉以上の想いを伝える「手紙」のようなものだと考えています。
          </p>
          <p className="text-lg leading-[1.9] text-[#231a11]/80 tracking-widest">
            市場で直接目利きをした新鮮な花材だけを使用し、花に携わり続けてきた熟練のスタッフが、お客様の想いを一つひとつ丁寧にお仕立てします。
          </p>
        </div>
      </div>
    </section>

    {/* Bento Grid */}
    <section className="py-28 md:py-32 bg-[#fff1e7] px-6 md:px-12 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 100% 100%, transparent 15%, #123f2a 16%, #123f2a 20%, transparent 21%), radial-gradient(circle at 0 100%, transparent 15%, #123f2a 16%, #123f2a 20%, transparent 21%), radial-gradient(circle at 100% 0, transparent 15%, #123f2a 16%, #123f2a 20%, transparent 21%), radial-gradient(circle at 0 0, transparent 15%, #123f2a 16%, #123f2a 20%, transparent 21%)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#123F2A] mb-6 tracking-[0.15em]">誠心誠意、一花入魂</h2>
          <div className="w-12 h-px bg-[#123F2A] mx-auto mb-6" />
          <p className="text-[#231a11]/60 tracking-[0.3em] text-sm uppercase">The Soul of Yamashiroya</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-stretch">
          <div className="md:col-span-8 bg-[#fff8f4] border border-[#123F2A]/5 rounded-xl px-10 py-12 md:px-16 md:py-16 flex flex-col justify-center relative overflow-hidden group min-h-[520px]">
            <div className="absolute top-0 right-14 md:right-16 bottom-0 w-px bg-[#123F2A]/10" />
            <div className="absolute -bottom-20 -right-20 w-[340px] h-[340px] rounded-full bg-[#123F2A]/[0.035]" />
            <div className="space-y-10 max-w-2xl relative z-10">
              <div className="inline-block px-4 py-1 border border-[#123F2A] text-[#123F2A] text-xs font-bold tracking-widest">
                CONCEPT 01
              </div>
              <h3 className="text-[1.75rem] md:text-[2.75rem] font-bold text-[#123F2A] leading-[1.18] tracking-[0.08em]">
                朝摘みの息吹を、
                <br />
                <span className="md:whitespace-nowrap">その一瞬の輝きのまま。</span>
              </h3>
              <div className="flex items-start gap-8">
                <div
                  className="hidden lg:block font-hand text-2xl text-[#123F2A]/40 pt-1 tracking-[0.25em]"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                  鮮度への誓い
                </div>
                <p className="text-[0.98rem] md:text-base text-[#231a11]/70 leading-[2.1] tracking-[0.08em]">
                  「花の命は短いからこそ、最も美しい瞬間を届けたい」
                  <br />
                  毎朝仕入れた花々は、独自の水揚げ技術と温度管理を徹底した環境で休ませます。お届けする瞬間まで、その生命力を損なうことはありません。
                </p>
              </div>
            </div>
            <div className="absolute -bottom-16 -right-14 opacity-[0.06] pointer-events-none transition-transform duration-1000 group-hover:scale-110">
              <Flower2 className="w-[240px] h-[240px] md:w-[300px] md:h-[300px] text-[#123F2A]" strokeWidth={1} />
            </div>
          </div>

          <div className="md:col-span-4 bg-[#123F2A] text-white rounded-xl px-10 py-12 md:px-12 md:py-16 flex flex-col justify-between shadow-2xl shadow-[#123F2A]/20 min-h-[520px]">
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-full border border-white/25" />
                <div className="w-10 h-px bg-white/15" />
              </div>
              <h3 className="text-[1.25rem] md:text-[1.55rem] font-bold leading-[1.75] tracking-[0.1em]">
                確かな審美眼、
                <br />
                研ぎ澄まされた感性。
              </h3>
              <div className="w-full h-px bg-white/15" />
              <p className="text-white/80 leading-[2.05] text-[0.92rem] md:text-base tracking-[0.08em]">
                旬の素材はもちろん、形、色艶、そして香りの奥行き。店主自らが一輪一輪と対話し、山城屋の基準を満たすものだけが店頭に並びます。
              </p>
            </div>
            <div className="pt-10 border-t border-white/20">
              <div className="font-hand text-xl md:text-2xl text-white/85 mb-2 tracking-[0.18em] text-center md:whitespace-nowrap">「花に心あり」</div>
              <p className="text-xs tracking-[0.35em] text-white/40 uppercase text-center">SPIRIT OF FLOWER</p>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-7 bg-white rounded-xl px-10 py-12 md:px-16 md:py-16 flex flex-col justify-center border border-[#123F2A]/5 relative overflow-hidden group min-h-[260px]">
            <div className="absolute top-8 left-8 text-[96px] md:text-[120px] font-black text-[#123F2A]/5 leading-none select-none">STORY</div>
            <div className="relative z-10 space-y-8">
              <h3 className="text-xl md:text-2xl font-bold text-[#123F2A] tracking-widest">あなただけの物語を束ねる</h3>
              <p className="text-[0.95rem] md:text-base text-[#231a11]/80 leading-loose max-w-xl tracking-widest">
                記念日、感謝、祈り。お客様の「想い」を色と形に翻訳するのが私たちの仕事です。言葉にできない感情を、花束に託してお届けします。
              </p>
              <div className="pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center text-[#123F2A] font-bold gap-4 transition-all text-base"
                >
                  <span className="border-b-2 border-[#123F2A]/30 pb-1 hover:border-[#123F2A] transition-colors">詳しく見る</span>
                  <span className="transition-transform hover:translate-x-2">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-5 bg-white rounded-xl px-10 py-12 md:px-12 md:py-16 flex flex-col justify-center text-center border border-[#123F2A]/5 relative min-h-[260px]">
            <div className="space-y-6">
              <div className="inline-block w-8 h-px bg-[#123F2A]/20 mx-auto" />
              <h4 className="text-xl md:text-2xl font-bold text-[#123F2A] tracking-[0.2em]">癒やしの空間</h4>
              <p className="text-[0.92rem] md:text-base text-[#231a11]/60 leading-[2.0] max-w-xs mx-auto tracking-[0.08em]">
                都会の喧騒を忘れさせる、土と花の香り。ただ静かに、植物と向き合う時間。
              </p>
              <div className="inline-block w-8 h-px bg-[#123F2A]/20 mx-auto" />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] text-[#123F2A]/30 uppercase">
              Atelier & Boutique
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Timeline (既存ロジック維持) */}
    <section className="py-24 px-6 md:px-12 bg-[#fff8f4]">
      <div className="max-w-6xl mx-auto">
        <button
          type="button"
          onClick={() => setIsTimelineOpen((v) => !v)}
          className="w-full bg-white/80 backdrop-blur-md border border-[#c1c9c1] rounded-xl px-6 py-6 text-left hover:shadow-md transition-shadow"
          aria-expanded={isTimelineOpen}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[0.78rem] md:text-[0.85rem] tracking-[0.25em] text-[#231a11]/45 font-bold">
                100年以上の歩み
              </div>
              <div className="mt-1 text-xl md:text-2xl font-bold tracking-widest text-[#123F2A]">
                山城屋の歴史
              </div>
            </div>
            <span className="text-[#231a11]/70 font-bold tracking-widest text-[0.95rem] md:text-[1.0rem]">
              {isTimelineOpen ? '閉じる' : '開く'}
            </span>
          </div>
          <p className="mt-3 text-[0.9rem] md:text-[1.0rem] text-[#231a11]/70 leading-[2.1] tracking-widest">
            山城屋の出来事と、時代の出来事を並べてご覧いただけます。
          </p>
        </button>

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
      </div>
    </section>

    {/* Access（アンカー維持） */}
    <section className="py-24 bg-[#fff8f4] px-6 md:px-12" id="access">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-bold text-[#123F2A] mb-2 tracking-widest">アクセス</h2>
              <p className="text-[#231a11]/40 tracking-[0.2em]">ACCESS & INFORMATION</p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <MapPin className="text-[#123F2A] mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1 tracking-widest">住所</h4>
                  <p className="text-[#231a11]/80 text-lg tracking-widest">〒047-0024 北海道小樽市花園4丁目4-2</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <Clock className="text-[#123F2A] mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1 tracking-widest">営業時間 / 定休日</h4>
                  <p className="text-[#231a11]/80 text-lg tracking-widest">9:00 - 18:00 / 元日のみ</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <Phone className="text-[#123F2A] mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1 tracking-widest">電話番号</h4>
                  <p className="text-[#123F2A] text-2xl font-bold tracking-widest">0134-23-1187</p>
                  <p className="text-sm text-[#231a11]/50 mt-1 tracking-widest">※お電話でのご注文・配送のご相談も承っております。</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="https://www.google.com/maps/search/?api=1&query=%E5%B0%8F%E6%A8%BD%E5%B8%82%E8%8A%B1%E5%9C%924%E4%B8%81%E7%9B%AE4-2"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#123F2A] text-white px-12 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg shadow-[#123F2A]/20"
              >
                Google Mapsで開く
              </a>
            </div>
          </div>

          <div className="w-full">
            <div className="w-full aspect-square md:aspect-video rounded-xl overflow-hidden shadow-2xl bg-white">
              <iframe
                title="花の山城屋 Google Map"
                src="https://maps.google.co.jp/maps?output=embed&q=北海道小樽市花園4-4-2+花の山城屋"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="mt-6 bg-white/70 backdrop-blur-md border border-[#c1c9c1] rounded-xl p-6 shadow-sm">
              <div className="space-y-4 text-[#231a11]/80 text-[0.98rem] md:text-[1.02rem] leading-[2.0] tracking-widest">
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
          </div>
        </div>
      </div>
    </section>

    <div id="contact" />
  </div>
);
}
