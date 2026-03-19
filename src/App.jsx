import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart } from 'lucide-react';

// Require Noto Serif JP globally for the elegant look
//import '@fontsource/noto-serif-jp'; // Assuming users might have it, but we can also use a style tag.
// We'll use style tag injected in React to ensure the font loads regardless of local setup

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [activeOccasion, setActiveOccasion] = useState('すべて');
  const [activeColor, setActiveColor] = useState('すべて');
  const [activeBudget, setActiveBudget] = useState('すべて');

  useEffect(() => {
    // 3.8秒後にメイン画面へ遷移
    const timer = setTimeout(() => setIsReady(true), 3800);
    return () => clearTimeout(timer);
  }, []);

  const dummyProducts = [
    {
      id: 1,
      name: '季節のおまかせアレンジ\n- ピンク系 -',
      price: '¥5,500',
      image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: '華やかなお祝いスタンド花\n- 赤・オレンジ系 -',
      price: '¥16,500',
      image: 'https://images.unsplash.com/photo-1543881524-76f578496417?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'かすみ草とバラのブーケ\n- ミックス -',
      price: '¥8,800',
      image: 'https://images.unsplash.com/photo-1582791694770-bd6198df12cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: 'お供え用アレンジメント\n- 優しい白・グリーン系 -',
      price: '¥6,600',
      image: 'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap');
        
        .elegant-font { font-family: 'Noto Serif JP', serif; }
        .brush-font { font-family: 'Yuji Syuku', serif; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .brick-pattern {
          background-color: #f7f3f0;
          background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23e6d5c3' fill-opacity='0.4'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
      <div className="w-full max-w-[480px] mx-auto min-h-screen bg-white text-gray-800 relative shadow-2xl elegant-font overflow-x-hidden">

        {/* 1. スプラッシュ・オープニングアニメーション */}
        <AnimatePresence>
          {!isReady && (
            <motion.div
              key="splash"
              className="fixed inset-0 z-[999] bg-[#FAFAFA] flex flex-col items-center justify-center pointer-events-none"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div
                className="absolute inset-0 opacity-15 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)' }}
              />

              <div className="relative w-80 h-80 flex items-center justify-center">
                <motion.div
                  initial={{ rotate: -15, y: -15, x: -30, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 10, y: 5, x: 5, opacity: 1, scale: 1 }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  className="absolute text-pink-400 drop-shadow-md z-20"
                  style={{ top: '5%', left: '5%' }}
                >
                  <svg width="140" height="140" viewBox="0 0 100 100" fill="none">
                    <path d="M50 8C55 25 75 35 92 50C75 65 55 75 50 92C45 75 25 65 8 50C25 35 45 25 50 8Z" fill="currentColor" opacity="0.85" />
                    <circle cx="50" cy="50" r="10" fill="#ECA4A4" />
                  </svg>
                </motion.div>

                <motion.div
                  initial={{ rotate: 15, y: 25, x: 25, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: -10, y: -5, x: -10, opacity: 1, scale: 1 }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.3 }}
                  className="absolute text-yellow-300 drop-shadow-md z-20"
                  style={{ bottom: '-5%', right: '-5%' }}
                >
                  <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
                    <path d="M50 15C60 30 70 40 85 50C70 60 60 70 50 85C40 70 30 60 15 50C30 40 40 30 50 15Z" fill="currentColor" opacity="0.95" />
                    <circle cx="50" cy="50" r="12" fill="#FDE047" />
                  </svg>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 0.12, scale: 1.05 }}
                  transition={{ duration: 3, delay: 0.5 }}
                  className="absolute z-10 w-full flex justify-center mt-10"
                >
                  <svg width="220" height="90" viewBox="0 0 200 80" fill="currentColor" className="text-[#3E2723]">
                    <path d="M10 80L10 60L30 50L30 80M35 80L35 45L50 40L50 80M55 80L55 30L80 20L80 80M85 80L85 55L100 50L100 80M105 80L105 25L135 15L135 80M140 80L140 40L160 35L160 80M165 80L165 55L190 50L190 80Z" />
                  </svg>
                </motion.div>

                <motion.div
                  className="z-30 flex flex-col items-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                >
                  <p className="text-[0.75rem] text-[#5D4037] tracking-[0.3em] mb-1 font-bold">創業大正9年</p>
                  <h1 className="text-4xl text-[#3E2723] brush-font drop-shadow-sm font-bold">花の山城屋</h1>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isReady && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>

            {/* 2. ヘッダー（固定） */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EFEBE9] px-5 py-3 flex justify-between items-center shadow-[0_4px_16px_rgba(62,39,35,0.05)]">
              <div className="flex flex-col">
                <span className="text-[0.6rem] text-[#5D4037] font-bold tracking-widest mb-0.5">創業大正9年</span>
                <h1 className="text-xl text-[#3E2723] brush-font font-bold">花の山城屋</h1>
              </div>
              <div className="flex gap-4 text-[#3E2723]">
                <button aria-label="Search" className="active:scale-90 transition-transform"><Search size={22} strokeWidth={2} /></button>
                <button aria-label="Cart" className="active:scale-90 transition-transform"><ShoppingCart size={22} strokeWidth={2} /></button>
              </div>
            </header>

            {/* 3. ヒーローセクション */}
            <section className="relative w-full h-[60vh] min-h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1563241598-6ce8646bbf20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="美しいブーケ"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70 flex flex-col items-center justify-end pb-12 px-6 text-center">
                <h2 className="text-white text-[1.8rem] font-bold leading-relaxed mb-8 drop-shadow-xl tracking-widest">
                  想いを届ける、<br />特別な一輪を。
                </h2>
                <button className="w-full max-w-[280px] bg-[#D48989] text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_rgba(212,137,137,0.4)] active:scale-95 transition-transform text-lg tracking-widest border border-white/20">
                  お花を探す
                </button>
              </div>
            </section>

            {/* 4. こだわりセクション（歴史の品格） */}
            <section className="brick-pattern px-6 py-14 text-center border-b border-[#EFEBE9] relative z-20 shadow-sm">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-[#EFEBE9]">
                <h3 className="text-[1.2rem] font-bold text-[#3E2723] leading-relaxed mb-5 tracking-wide">
                  この街の花屋として、<br />あなたの様々なシーンに、<br />そっと寄り添う。
                </h3>
                <p className="text-[0.95rem] text-[#5D4037] leading-loose text-justify px-2">
                  大正栄華の小樽で産声を上げ、いつの時代も、あたたかい心に支えられながら、まちの花屋として営んでくることができました。創業百年を迎え、心あらたに次の百年へ進んでまいります。
                </p>
              </div>
            </section>

            {/* 5. 高度な絞り込みナビゲーション */}
            <section className="bg-white pt-10 pb-6 shadow-sm relative z-10 border-b border-[#EFEBE9]">
              {/* 目的で選ぶ */}
              <div className="mb-8">
                <h3 className="text-[0.8rem] font-bold text-[#795548] px-5 mb-4 tracking-widest border-l-2 border-[#D48989] ml-5 pl-2">目的で選ぶ</h3>
                <div className="flex gap-3 overflow-x-auto hide-scroll px-5 pb-2">
                  {['すべて', 'お祝い', 'お供え・お悔やみ', '誕生日', '開店祝い', '送別・退職'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveOccasion(item)}
                      className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 ${activeOccasion === item
                        ? 'bg-[#2B5740] text-white border-[#2B5740] shadow-md'
                        : 'bg-white text-[#5D4037] border-[#D7CCC8]'
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* 色で選ぶ */}
              <div className="mb-8">
                <h3 className="text-[0.8rem] font-bold text-[#795548] px-5 mb-4 tracking-widest border-l-2 border-[#D48989] ml-5 pl-2">色で選ぶ</h3>
                <div className="flex gap-3 overflow-x-auto hide-scroll px-5 pb-2">
                  {[
                    { label: 'すべて', color: '' },
                    { label: 'ピンク系', color: 'bg-[#ffb6c1]' },
                    { label: '白・グリーン系', color: 'bg-[#f0fff0]' },
                    { label: '黄・オレンジ系', color: 'bg-[#ffe4b5]' },
                    { label: 'おまかせ', color: 'bg-gradient-to-br from-[#ffb6c1] via-[#ffe4b5] to-[#f0fff0]' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveColor(item.label)}
                      className={`whitespace-nowrap px-4 py-2.5 flex items-center gap-2 rounded-full text-sm font-bold border transition-all duration-300 ${activeColor === item.label
                        ? 'bg-[#2B5740] text-white border-[#2B5740] shadow-md'
                        : 'bg-white text-[#5D4037] border-[#D7CCC8]'
                        }`}
                    >
                      {item.color && (
                        <span className={`block w-4 h-4 rounded-full border border-gray-300 shadow-sm ${item.color}`}></span>
                      )}
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 予算で選ぶ */}
              <div>
                <h3 className="text-[0.8rem] font-bold text-[#795548] px-5 mb-4 tracking-widest border-l-2 border-[#D48989] ml-5 pl-2">予算で選ぶ</h3>
                <div className="flex gap-3 overflow-x-auto hide-scroll px-5 pb-2">
                  {['すべて', '〜3,300円', '〜5,500円', '〜11,000円', '11,000円〜'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveBudget(item)}
                      className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 ${activeBudget === item
                        ? 'bg-[#2B5740] text-white border-[#2B5740] shadow-md'
                        : 'bg-white text-[#5D4037] border-[#D7CCC8]'
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. 商品一覧グリッド */}
            <section className="bg-[#FAF9F8] px-5 pt-12 pb-16">
              <h2 className="text-xl font-bold text-[#3E2723] tracking-widest mb-6 text-center">おすすめの品</h2>
              <div className="grid grid-cols-2 gap-4 flex-1">
                {dummyProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(62,39,35,0.04)] border border-[#EFEBE9] overflow-hidden flex flex-col group">
                    <div className="aspect-square bg-[#EFEBE9] relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name.replace('\n', ' ')}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-[0.85rem] text-[#5D4037] leading-snug mb-3 font-medium whitespace-pre-wrap flex-1">
                        {product.name}
                      </h3>
                      <p className="text-[1.2rem] font-bold text-[#1A4A38] mt-auto">
                        {product.price}
                      </p>
                      <button className="mt-4 w-full py-2.5 bg-white border border-[#2B5740] text-[#2B5740] rounded-xl text-sm font-bold hover:bg-[#2B5740] hover:text-white active:scale-95 transition-all duration-200 shadow-sm">
                        カートに入れる
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. 年表・歴史セクション */}
            <section className="bg-[#EFEBE9] px-6 pt-20 pb-24 border-t border-[#D7CCC8] shadow-inner">
              <div className="text-center mb-16">
                <h2 className="text-[1.4rem] font-bold text-[#3E2723] leading-loose tracking-widest drop-shadow-sm">
                  大正から令和へ。<br />小樽の街と生きてきた<br />100年の軌跡。
                </h2>
              </div>

              <div className="relative max-w-sm mx-auto pl-10 border-l border-[#8D6E63] space-y-16 pb-4">

                <div className="relative">
                  <span className="absolute -left-[44px] bg-[#3E2723] w-2 h-2 rounded-full border border-[#EFEBE9] top-2 shadow-sm ring-4 ring-[#EFEBE9]"></span>
                  <h4 className="text-xl font-bold text-[#3E2723] mb-3 tracking-wider">1920年：誕生</h4>
                  <p className="text-[0.95rem] text-[#5D4037] leading-loose">
                    大正9年、小樽で産声を上げる。
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[44px] bg-[#3E2723] w-2 h-2 rounded-full border border-[#EFEBE9] top-2 shadow-sm ring-4 ring-[#EFEBE9]"></span>
                  <h4 className="text-xl font-bold text-[#3E2723] mb-3 tracking-wider">寄り添う</h4>
                  <p className="text-[0.95rem] text-[#5D4037] leading-loose">
                    嬉しい日も悲しい日も、街の暮らしに花を添える。
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[44px] bg-[#3E2723] w-2 h-2 rounded-full border border-[#EFEBE9] top-2 shadow-sm ring-4 ring-[#EFEBE9]"></span>
                  <h4 className="text-xl font-bold text-[#3E2723] mb-3 tracking-wider">これから</h4>
                  <p className="text-[0.95rem] text-[#5D4037] leading-loose">
                    品質へのこだわりと、次の100年への想い。
                  </p>
                </div>

              </div>

              <button className="mt-16 w-full py-4 border-[1.5px] border-[#3E2723] text-[#3E2723] rounded-full font-bold max-w-[300px] mx-auto block hover:bg-[#3E2723] hover:text-[#EFEBE9] active:scale-95 transition-all text-sm tracking-widest">
                歴史とこだわりを詳しく見る
              </button>
            </section>
          </motion.div>
        )}
      </div>
    </>
  );
}
