import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Award,
  HeartHandshake,
  Truck,
  Gift,
  Heart,
  Store,
  CalendarHeart,
  Leaf,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext.jsx";
import logoImg from "./shoplogo.png";
import API_BASE_URL from "./apiConfig";

export default function Home() {
  const [hasSeenAnimation, setHasSeenAnimation] = useState(() => {
    try {
      return sessionStorage.getItem("hasSeenAnimation") === "true";
    } catch {
      return false;
    }
  });
  const [isReady, setIsReady] = useState(hasSeenAnimation);
  const [activeOccasion, setActiveOccasion] = useState("すべて");
  const [activeColor, setActiveColor] = useState("すべて");
  const [activeBudget, setActiveBudget] = useState("すべて");
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [recommendedLoading, setRecommendedLoading] = useState(false);
  const [recommendedError, setRecommendedError] = useState(null);

  const { cartCount, addToCart } = useCart();
  const navigate = useNavigate();

  const shouldAnimate = !hasSeenAnimation;

  const finishIntro = () => {
    try {
      sessionStorage.setItem("hasSeenAnimation", "true");
    } catch {
      // no-op
    }
    setHasSeenAnimation(true);
    setIsReady(true);
  };

  const heroImages = ["/otaru1.jpg", "/otaru2.jpg"];

  useEffect(() => {
    // 初回以外はアニメーションを完全にスキップ
    if (!shouldAnimate) return;

    // すでに準備ができている場合は何もしない
    if (isReady) return;

    // 2.6秒後に自動で終了
    const timer = setTimeout(() => finishIntro(), 2600);

    // Enterキーでスキップ
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        finishIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // クリーンアップ
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReady, shouldAnimate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [heroImages.length]);

  const resolveImageUrl = (imageUrl) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))
      return imageUrl;
    const path = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
    return `${API_BASE_URL}${path}`;
  };

  useEffect(() => {
    let canceled = false;
    const fetchRecommended = async () => {
      setRecommendedLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/recommended-products`);
        if (!res.ok) throw new Error("おすすめ商品の取得に失敗しました");
        const data = await res.json();
        if (!canceled) {
          setRecommendedProducts(Array.isArray(data) ? data : []);
          setRecommendedError(null);
        }
      } catch (e) {
        if (!canceled) {
          setRecommendedProducts([]);
          setRecommendedError(e?.message || "おすすめ商品の取得に失敗しました");
        }
      } finally {
        if (!canceled) setRecommendedLoading(false);
      }
    };

    fetchRecommended();
    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-x-hidden">
      {/* 1. スプラッシュ・オープニングアニメーション */}
      <AnimatePresence>
        {!isReady && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[999] bg-[#fdfbf6] flex flex-col items-center justify-center cursor-pointer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={() => finishIntro()}
          >
            <div
              className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-multiply"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)",
              }}
            />

            <motion.div
              initial={{ rotate: -15, y: -15, x: -30, opacity: 0, scale: 0.8 }}
              animate={{
                rotate: [10, 6, 12],
                y: [5, -4, 6],
                x: [5, 10, 2],
                opacity: 1,
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute text-[#e09a9a] drop-shadow-sm z-0"
              style={{ top: "5%", left: "5%" }}
            >
              <svg width="140" height="140" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 8C55 25 75 35 92 50C75 65 55 75 50 92C45 75 25 65 8 50C25 35 45 25 50 8Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                <circle cx="50" cy="50" r="10" fill="#c47a7a" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ rotate: 15, y: 25, x: 25, opacity: 0, scale: 0.5 }}
              animate={{
                rotate: [-10, -14, -8],
                y: [-5, 6, -4],
                x: [-10, -18, -6],
                opacity: 1,
                scale: [1, 1.06, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.3,
              }}
              className="absolute text-[#e6c27a] drop-shadow-sm z-0"
              style={{ bottom: "-5%", right: "-5%" }}
            >
              <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 15C60 30 70 40 85 50C70 60 60 70 50 85C40 70 30 60 15 50C30 40 40 30 50 15Z"
                  fill="currentColor"
                  opacity="0.95"
                />
                <circle cx="50" cy="50" r="12" fill="#d4a355" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10, x: 10, scale: 0.9, rotate: -6 }}
              animate={{
                opacity: 1,
                y: [10, -6, 8],
                x: [10, 0, 12],
                scale: [0.9, 1.0, 0.92],
                rotate: [-6, 3, -5],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.15,
              }}
              className="absolute text-[#bc8a7e] drop-shadow-sm z-0"
              style={{ top: "18%", right: "10%" }}
            >
              <svg width="92" height="92" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 12C58 28 72 38 88 50C72 62 58 72 50 88C42 72 28 62 12 50C28 38 42 28 50 12Z"
                  fill="currentColor"
                  opacity="0.5"
                />
                <circle cx="50" cy="50" r="9" fill="#a67468" opacity="0.7" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.85, rotate: 8 }}
              animate={{
                opacity: 1,
                y: [0, 10, -2],
                x: [0, -10, -2],
                scale: [0.85, 0.95, 0.88],
                rotate: [8, 0, 10],
              }}
              transition={{
                duration: 4.4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.25,
              }}
              className="absolute text-[#5c6b5d] drop-shadow-sm z-0"
              style={{ bottom: "18%", left: "12%" }}
            >
              <svg width="84" height="84" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 18C58 32 66 40 82 50C66 60 58 68 50 82C42 68 34 60 18 50C34 40 42 32 50 18Z"
                  fill="currentColor"
                  opacity="0.45"
                />
                <circle cx="50" cy="50" r="10" fill="#2B5740" opacity="0.35" />
              </svg>
            </motion.div>

            <motion.div
              className="relative z-10 flex flex-col items-center text-center px-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <img
                src={logoImg}
                alt="花の山城屋 ロゴ"
                className="h-20 md:h-28 w-auto object-contain"
              />
              <div className="mt-7 text-[#4a3f35]">
                <div className="text-[1.2rem] md:text-[1.7rem] font-bold tracking-widest leading-relaxed">
                  想いを花に
                  <br />
                  小樽で百年。
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isReady && (
        <motion.div
          initial={shouldAnimate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={shouldAnimate ? { duration: 1.2 } : { duration: 0 }}
        >
          {/* 3. ヒーローセクション */}
          <section className="relative w-full h-[60vh] md:h-[75vh] min-h-[420px]">
            <div className="absolute inset-0">
              {heroImages.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt="小樽の風景"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${idx === heroSlideIndex ? "opacity-100" : "opacity-0"}`}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-[#4a3f35]/90 flex flex-col items-center justify-end pb-12 md:pb-20 px-6 text-center">
              <motion.h2
                initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldAnimate
                    ? { duration: 1.2, ease: "easeOut", delay: 0.3 }
                    : { duration: 0 }
                }
                className="font-hand text-[#fdfbf6] text-[1.5rem] md:text-[3.5rem] font-bold leading-relaxed mb-4 md:mb-8 drop-shadow-2xl tracking-widest whitespace-nowrap"
              >
                想いを束ねて、百年。
              </motion.h2>
              <motion.p
                initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldAnimate
                    ? { duration: 1.2, ease: "easeOut", delay: 0.5 }
                    : { duration: 0 }
                }
                className="text-[#fdfbf6] text-[0.9rem] md:text-[1.1rem] leading-[2.2] md:leading-[2.4] font-bold mb-10 md:mb-14 drop-shadow-md px-2 max-w-[340px] md:max-w-2xl text-center tracking-widest opacity-95"
              >
                大正九年創業。小樽の街で愛され続ける老舗『花の山城屋』。
                <br />
                熟練のフローリストが、あなたの特別な日を彩るお花を心を込めて
                <br />
                お仕立てします。
              </motion.p>
              <motion.div
                initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldAnimate
                    ? { duration: 1.0, ease: "easeOut", delay: 0.7 }
                    : { duration: 0 }
                }
              >
                <button
                  onClick={() => navigate("/products")}
                  className="w-full max-w-[280px] md:max-w-[340px] bg-[#bc8a7e] text-white font-bold py-4 md:py-5 rounded-xl shadow-[0_8px_24px_rgba(74,63,53,0.3)] active:scale-95 transition-transform text-lg md:text-xl tracking-widest hover:bg-[#a67468] border border-white/20 cursor-pointer"
                >
                  お花を探す
                </button>
              </motion.div>
            </div>
          </section>

          {/* 4. こだわりセクション */}
          <section className="brick-pattern -mt-px border-b border-[#ebdcd0] relative z-20">
            <div className="max-w-6xl mx-auto px-6 py-14 md:py-24 text-center">
              <div className="bg-[#fdfbf6]/90 backdrop-blur-md rounded-2xl p-8 md:p-16 soft-shadow-sm border border-[#ebdcd0] max-w-3xl mx-auto">
                <h3 className="text-[1.2rem] md:text-[1.6rem] font-bold text-[#4a3f35] leading-relaxed mb-8 md:mb-10 tracking-[0.15em]">
                  この街の花屋として、
                  <br />
                  あなたの様々なシーンに、
                  <br />
                  そっと寄り添う。
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
              initial={shouldAnimate ? { opacity: 0, y: 40 } : false}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                shouldAnimate
                  ? { duration: 1.2, ease: "easeOut" }
                  : { duration: 0 }
              }
              className="pt-16 md:pt-24 pb-8 md:pb-16 px-5 md:px-0 relative z-10"
            >
              <h2 className="font-hand text-xl md:text-2xl font-bold text-[#4a3f35] tracking-widest mb-10 text-center border-b-2 border-[#bc8a7e] pb-4 inline-block relative left-1/2 -translate-x-1/2">
                お花を探す
              </h2>

              <div className="bg-[#fdfbf6]/60 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-[#ebdcd0] soft-shadow-sm max-w-5xl mx-auto space-y-12">
                {/* 1. キーワード検索窓 */}
                <div className="max-w-2xl mx-auto">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="お花の名前や用途で検索（例：胡蝶蘭、誕生日）"
                      className="w-full bg-white border border-[#d8c8b6] text-[#4a3f35] py-4 pl-12 pr-28 rounded-full text-base focus:outline-none focus:border-[#bc8a7e] shadow-[0_2px_8px_rgba(74,63,53,0.03)] transition-all"
                      onKeyDown={(e) =>
                        e.key === "Enter" && navigate("/products")
                      }
                    />
                    <Search
                      onClick={() => navigate("/products")}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#a38f7d] w-5 h-5 group-focus-within:text-[#bc8a7e] transition-colors cursor-pointer"
                      strokeWidth={2.5}
                    />
                    <button
                      onClick={() => navigate("/products")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4a3f35] text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest hover:bg-[#322a23] transition-colors cursor-pointer"
                    >
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
                      {
                        label: "誕生日・記念日",
                        value: "birthday",
                        icon: <Gift className="w-6 h-6 mb-2 text-[#bc8a7e]" />,
                      },
                      {
                        label: "お祝い",
                        value: "celebration",
                        icon: <Heart className="w-6 h-6 mb-2 text-[#bc8a7e]" />,
                      },
                      {
                        label: "開店・開業祝い",
                        value: "celebration",
                        icon: <Store className="w-6 h-6 mb-2 text-[#bc8a7e]" />,
                      },
                      {
                        label: "お供え・お悔やみ",
                        value: "condolence",
                        icon: <Leaf className="w-6 h-6 mb-2 text-[#5c6b5d]" />,
                      },
                      {
                        label: "自宅用",
                        value: "home",
                        icon: (
                          <CalendarHeart className="w-6 h-6 mb-2 text-[#bc8a7e]" />
                        ),
                      },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() =>
                          navigate(`/products?purpose=${item.value}`)
                        }
                        className="bg-white border border-[#ebdcd0] rounded-2xl p-4 flex flex-col items-center justify-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                      >
                        <div className="group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <span className="text-[0.8rem] md:text-[0.9rem] font-bold text-[#4a3f35] tracking-wide mt-1 text-center whitespace-nowrap">
                          {item.label}
                        </span>
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
                      {
                        label: "アレンジメント",
                        value: "arrangement",
                        img: "/hana1.jpg",
                      },
                      {
                        label: "花束（ブーケ）",
                        value: "bouquet",
                        img: "/hana2.jpg",
                      },
                      { label: "胡蝶蘭", value: "orchid", img: "/hana3.jpg" },
                      {
                        label: "観葉植物",
                        value: "plant",
                        img: "https://images.unsplash.com/photo-1459156212016-c812468e2115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85",
                      },
                      {
                        label: "プリザーブド",
                        value: "preserved",
                        img: "/hana4.png",
                      },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() =>
                          navigate(`/products?style=${item.value}`)
                        }
                        className="min-w-[120px] lg:min-w-0 bg-white border border-[#ebdcd0] rounded-2xl overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-full aspect-square overflow-hidden bg-[#f5efe9]">
                          <img
                            src={item.img}
                            alt={item.label}
                            className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="p-3 text-center">
                          <span className="text-[0.8rem] md:text-[0.9rem] font-bold text-[#4a3f35] tracking-wide">
                            {item.label}
                          </span>
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
                      { label: "赤系", value: "red", color: "bg-red-500" },
                      {
                        label: "ピンク系",
                        value: "pink",
                        color: "bg-pink-400",
                      },
                      {
                        label: "黄・オレンジ系",
                        value: "yellow_orange",
                        color: "bg-yellow-400",
                      },
                      { label: "白系", value: "white", color: "bg-zinc-200" },
                      {
                        label: "ブルー・パープル系",
                        value: "blue_purple",
                        color: "bg-blue-600",
                      },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() =>
                          navigate(`/products?color=${item.value}`)
                        }
                        className="min-w-[130px] lg:min-w-0 bg-white/50 border border-gray-200 rounded-full py-3 md:py-4 px-4 flex items-center justify-center gap-2 hover:shadow-md hover:border-[#bc8a7e] hover:bg-white transition-all duration-300"
                      >
                        <span
                          className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full shadow-sm flex-shrink-0 ${item.color}`}
                        ></span>
                        <span className="text-[0.8rem] md:text-[0.9rem] font-bold text-[#4a3f35] tracking-wide whitespace-nowrap">
                          {item.label}
                        </span>
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
                    {[
                      { label: "〜 3,000円", value: "0_3000" },
                      { label: "3,000円 〜 5,000円", value: "3000_5000" },
                      { label: "5,000円 〜 10,000円", value: "5000_10000" },
                      { label: "10,000円 〜", value: "10000_" },
                    ].map((price) => (
                      <button
                        key={price.value}
                        onClick={() =>
                          navigate(`/products?price=${price.value}`)
                        }
                        className="bg-white border border-[#ebdcd0] text-[#6e5e54] px-5 py-3 rounded-full text-[0.85rem] md:text-base font-bold tracking-widest hover:bg-[#4a3f35] hover:text-white hover:border-[#4a3f35] transition-colors shadow-sm"
                      >
                        {price.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 6. 商品一覧グリッド */}
            <motion.section
              initial={shouldAnimate ? { opacity: 0, y: 40 } : false}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                shouldAnimate
                  ? { duration: 1.2, ease: "easeOut" }
                  : { duration: 0 }
              }
              className="px-5 md:px-6 pt-12 md:pt-16 pb-20 md:pb-28"
            >
              <h2 className="font-hand text-xl md:text-3xl font-bold text-[#4a3f35] tracking-widest mb-8 md:mb-12 text-center md:text-left border-b-2 border-[#bc8a7e] pb-4 inline-block md:block">
                おすすめの品
              </h2>
              {recommendedLoading ? (
                <div className="bg-[#fdfbf6]/70 border border-[#ebdcd0] rounded-2xl px-6 py-10 text-center text-[#8a7a6c] tracking-widest">
                  読み込み中...
                </div>
              ) : recommendedError ? (
                <div className="bg-[#fdfbf6]/70 border border-[#ebdcd0] rounded-2xl px-6 py-10 text-center text-[#8a7a6c] tracking-widest">
                  {recommendedError}
                </div>
              ) : recommendedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 flex-1">
                  {recommendedProducts.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      className="bg-[#fffdf7] rounded-2xl md:rounded-3xl soft-shadow border border-[#ebdcd0] overflow-hidden flex flex-col group cursor-pointer block hover:shadow-[0_16px_40px_rgba(74,63,53,0.1)] transition-shadow duration-300 relative"
                    >
                      <div className="absolute top-4 left-4 z-10 bg-red-700 text-white text-[0.8rem] font-bold px-3 py-1 rounded-sm shadow-md tracking-wider">
                        小樽限定配送
                      </div>
                      <div className="aspect-[4/3] md:aspect-square bg-[#f5efe9] relative overflow-hidden">
                        {product.imageUrl ? (
                          <img
                            src={resolveImageUrl(product.imageUrl)}
                            alt={String(product.name || "").replace("\n", " ")}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply opacity-95"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full" />
                        )}
                      </div>
                      <div className="p-5 md:p-6 flex flex-col flex-1 border-t border-[#ebdcd0]/50">
                        <h3 className="text-[1rem] md:text-[1.1rem] text-[#6e5e54] leading-[1.8] mb-4 font-bold whitespace-pre-wrap flex-1">
                          {product.name}
                        </h3>
                        <p className="text-[1.3rem] md:text-[1.5rem] font-bold text-[#4a3f35] mt-auto">
                          ¥
                          {typeof product.price === "number"
                            ? product.price.toLocaleString()
                            : product.price}
                          <span className="text-[0.7rem] ml-1 font-normal text-[#8a7a6c]">
                            税込
                          </span>
                        </p>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                          <div className="w-full py-3 md:py-3.5 bg-[#f5f2e9] border border-[#d8c8b6] rounded-xl text-[0.95rem] font-bold group-hover:bg-[#bc8a7e] group-hover:text-white group-hover:border-[#bc8a7e] text-center transition-all duration-300 text-[#4a3f35]">
                            詳細を見る
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (addToCart) addToCart(product);
                            }}
                            className="w-full py-3 md:py-3.5 bg-primary text-white rounded-xl text-[0.95rem] font-bold tracking-widest hover:opacity-90 active:scale-[0.98] transition-all"
                          >
                            カートに入れる
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-[#fdfbf6]/70 border border-[#ebdcd0] rounded-2xl px-6 py-10 text-center text-[#8a7a6c] tracking-widest">
                  現在、おすすめの商品の準備中です。
                </div>
              )}
            </motion.section>
          </div>

          {/* About Us セクション */}
          <motion.section
            initial={shouldAnimate ? { opacity: 0, y: 40 } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-50px" }}
            transition={
              shouldAnimate
                ? { duration: 1.2, ease: "easeOut" }
                : { duration: 0 }
            }
            className="bg-[#f5efe9] px-6 pt-16 md:pt-28 pb-20 md:pb-28 border-y border-[#ebdcd0]"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="font-hand text-[1.3rem] md:text-[2.2rem] font-normal text-[#4a3f35] text-center tracking-[0.2em] mb-10 md:mb-16">
                百年の歩み、小樽と共に。
              </h2>

              <div className="text-center md:text-left md:grid md:grid-cols-[220px_minmax(0,560px)] md:justify-center md:gap-10">
                <div className="w-full md:w-[220px] aspect-[3/4] bg-[#fdfbf6] border border-[#ebdcd0] rounded-2xl mb-10 md:mb-0 shadow-xl overflow-hidden mx-auto">
                  <img
                    src="/otaru8.jpg"
                    alt="花の山城屋"
                    className="w-full h-full object-cover object-top mix-blend-multiply opacity-95"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="min-w-0">
                  <div className="text-[0.95rem] md:text-[1.1rem] text-[#6e5e54] leading-[2.2] md:leading-[2.4] space-y-6 text-center md:text-left px-2 md:px-0 mb-10 md:mb-12 tracking-wide font-medium">
                    <p>
                      大正九年（1920年）、
                      <br className="block md:hidden" />
                      小樽の街角で産声を上げた『花の山城屋』。
                    </p>
                    <p>
                      時代は移り変われど、
                      <br className="block md:hidden" />
                      花を愛でる人々の想いは変わりません。
                    </p>
                    <p>
                      市場から厳選した新鮮な花材と、
                      <br className="block md:hidden" />
                      一世紀にわたり受け継がれてきた熟練の技。私たちはこれからも、皆様の特別な日を彩る『心に寄り添う花』をお届けしてまいります。
                    </p>
                  </div>

                  <div className="mt-14 flex justify-center md:justify-start">
                    <Link
                      to="/about"
                      className="w-full max-w-[320px] py-4 md:py-4 border-[1.5px] border-[#4a3f35] text-[#4a3f35] rounded-full font-bold text-center hover:bg-[#4a3f35] hover:text-[#fdfbf6] active:scale-95 transition-all duration-300 text-sm md:text-[1rem] tracking-widest bg-transparent block"
                    >
                      歴史とこだわりを詳しく見る
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-12 md:mt-14 max-w-3xl mx-auto space-y-5 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 justify-items-center">
                <div className="w-full max-w-[320px] h-full min-h-[84px] flex items-start gap-4 bg-[#fdfbf6] px-6 py-5 rounded-2xl border border-[#ebdcd0] soft-shadow-sm transition-transform hover:-translate-y-1 min-w-0">
                  <Award
                    className="text-[#bc8a7e] shrink-0"
                    size={28}
                    strokeWidth={2}
                  />
                  <span className="min-w-0 flex-1 font-bold text-[#4a3f35] text-[1.02rem] tracking-wider whitespace-normal break-words leading-snug">
                    創業100余年の信頼
                  </span>
                </div>
                <div className="w-full max-w-[320px] h-full min-h-[84px] flex items-start gap-4 bg-[#fdfbf6] px-6 py-5 rounded-2xl border border-[#ebdcd0] soft-shadow-sm transition-transform hover:-translate-y-1 min-w-0">
                  <HeartHandshake
                    className="text-[#bc8a7e] shrink-0"
                    size={28}
                    strokeWidth={2}
                  />
                  <span className="min-w-0 flex-1 font-bold text-[#4a3f35] text-[1.02rem] tracking-wider whitespace-normal break-words leading-snug">
                    経験豊富なフローリスト
                  </span>
                </div>
                <div className="w-full max-w-[320px] h-full min-h-[84px] flex items-start gap-4 bg-[#fdfbf6] px-6 py-5 rounded-2xl border border-[#ebdcd0] soft-shadow-sm transition-transform hover:-translate-y-1 md:col-span-2 lg:col-span-1 min-w-0">
                  <Truck
                    className="text-[#bc8a7e] shrink-0"
                    size={28}
                    strokeWidth={2}
                  />
                  <span className="min-w-0 flex-1 font-bold text-[#4a3f35] text-[1.02rem] tracking-wider whitespace-normal break-words leading-snug">
                    小樽市内・全国配送対応
                  </span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 7. 年表・歴史セクション */}
          <motion.section
            initial={shouldAnimate ? { opacity: 0 } : false}
            whileInView={shouldAnimate ? { opacity: 1 } : undefined}
            viewport={{ once: true, margin: "-50px" }}
            transition={
              shouldAnimate
                ? { duration: 1.5, ease: "easeOut" }
                : { duration: 0 }
            }
            className="bg-[#f0e9df] px-6 pt-20 md:pt-32 pb-24 md:pb-32 border-t border-[#d8c8b6] shadow-inner relative"
          >
            <div className="max-w-4xl mx-auto">
              <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]" />

              <motion.div
                initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, margin: "-50px" }}
                transition={
                  shouldAnimate
                    ? { duration: 1.2, ease: "easeOut", delay: 0.2 }
                    : { duration: 0 }
                }
                className="text-center mb-16 md:mb-24 relative z-10"
              >
                <h2 className="font-hand text-[1.4rem] md:text-[2.4rem] font-bold text-[#4a3f35] leading-loose tracking-widest drop-shadow-sm">
                  大正から令和へ。
                  <br />
                  小樽の街と生きてきた
                  <br />
                  100年の軌跡。
                </h2>
              </motion.div>

              <div className="relative max-w-sm md:max-w-2xl mx-auto pl-10 md:pl-16 border-l-2 border-[#b5a392] space-y-16 md:space-y-20 pb-4 z-10">
                <motion.div
                  className="relative"
                  initial={shouldAnimate ? { opacity: 0, x: -20 } : false}
                  whileInView={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={
                    shouldAnimate
                      ? { duration: 1.0, ease: "easeOut", delay: 0.1 }
                      : { duration: 0 }
                  }
                >
                  <span className="absolute -left-[46px] md:-left-[71px] bg-[#6e5e54] w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full border-2 border-[#f0e9df] top-2 soft-shadow-sm ring-4 ring-[#f0e9df]"></span>
                  <h4 className="text-xl md:text-2xl font-bold text-[#4a3f35] mb-3 md:mb-5 tracking-wider">
                    1920年：誕生
                  </h4>
                  <p className="text-[0.95rem] md:text-[1.1rem] text-[#6e5e54] leading-[2.2]">
                    大正9年、小樽で産声を上げる。
                  </p>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={shouldAnimate ? { opacity: 0, x: -20 } : false}
                  whileInView={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={
                    shouldAnimate
                      ? { duration: 1.0, ease: "easeOut", delay: 0.1 }
                      : { duration: 0 }
                  }
                >
                  <span className="absolute -left-[46px] md:-left-[71px] bg-[#6e5e54] w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full border-2 border-[#f0e9df] top-2 soft-shadow-sm ring-4 ring-[#f0e9df]"></span>
                  <h4 className="text-xl md:text-2xl font-bold text-[#4a3f35] mb-3 md:mb-5 tracking-wider">
                    寄り添う
                  </h4>
                  <p className="text-[0.95rem] md:text-[1.1rem] text-[#6e5e54] leading-[2.2]">
                    嬉しい日も悲しい日も、街の暮らしに花を添える。
                  </p>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={shouldAnimate ? { opacity: 0, x: -20 } : false}
                  whileInView={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={
                    shouldAnimate
                      ? { duration: 1.0, ease: "easeOut", delay: 0.1 }
                      : { duration: 0 }
                  }
                >
                  <span className="absolute -left-[46px] md:-left-[71px] bg-[#6e5e54] w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full border-2 border-[#f0e9df] top-2 soft-shadow-sm ring-4 ring-[#f0e9df]"></span>
                  <h4 className="text-xl md:text-2xl font-bold text-[#4a3f35] mb-3 md:mb-5 tracking-wider">
                    これから
                  </h4>
                  <p className="text-[0.95rem] md:text-[1.1rem] text-[#6e5e54] leading-[2.2]">
                    品質へのこだわりと、次の100年への想。
                  </p>
                </motion.div>
              </div>

              <Link
                to="/about"
                className="relative z-10 mt-20 md:mt-28 w-full max-w-[320px] md:max-w-[400px] py-4 md:py-5 border-[1.5px] border-[#6e5e54] text-[#6e5e54] rounded-full font-bold mx-auto block hover:bg-[#6e5e54] hover:text-[#fdfbf6] active:scale-95 transition-all text-sm md:text-[1.05rem] tracking-widest bg-transparent text-center shadow-sm"
              >
                歴史とこだわりを詳しく見る
              </Link>
            </div>
          </motion.section>
        </motion.div>
      )}
    </div>
  );
}
