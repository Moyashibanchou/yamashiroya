import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "./context/CartContext.jsx";
import { AnimatePresence, motion } from "framer-motion";
import API_BASE_URL from "./apiConfig";

export default function ProductDetail() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [petals, setPetals] = useState([]);

  const API_URL = useMemo(() => `${API_BASE_URL}/api/products/${id}`, [id]);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let canceled = false;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        if (res.status === 404) {
          if (!canceled) {
            setProduct(null);
            setError(null);
          }
          return;
        }
        if (!res.ok) throw new Error("商品データの取得に失敗しました");
        const data = await res.json();
        if (!canceled) {
          setProduct(data || null);
          setError(null);
        }
      } catch (e) {
        if (!canceled) {
          setProduct(null);
          setError(e?.message || "商品データの取得に失敗しました");
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      canceled = true;
    };
  }, [API_URL]);

  const resolveImageUrl = (imageUrl) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))
      return imageUrl;
    const path = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
    return `${API_BASE_URL}${path}`;
  };

  const normalizeMulti = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean);
    return [value].filter(Boolean);
  };

  const LABEL_MAP = useMemo(() => {
    return {
      purpose: {
        celebration: "お祝い",
        condolence: "お供え・お悔やみ",
        birthday: "誕生日・記念日",
        visit: "お見舞い",
        home: "自宅用",
      },
      style: {
        arrangement: "アレンジメント",
        bouquet: "花束（ブーケ）",
        orchid: "胡蝶蘭",
        plant: "観葉植物",
        preserved: "プリザーブド",
      },
      color: {
        red: "赤系",
        pink: "ピンク系",
        white: "白系",
        yellow_orange: "黄・オレンジ系",
        blue_purple: "ブルー・パープル系",
        other: "その他・おまかせ",
      },
    };
  }, []);

  const labelFor = (kind, value) => {
    const v = String(value || "");
    const m = LABEL_MAP[kind];
    if (!m) return v;
    return m[v] || v;
  };

  const spawnPetalBurst = (clientX, clientY) => {
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const next = Array.from({ length: 10 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.5;
      const dist = 30 + Math.random() * 26;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 18;
      return {
        key: `${id}_${i}`,
        x: clientX,
        y: clientY,
        dx,
        dy,
        rotate: (Math.random() - 0.5) * 140,
        delay: Math.random() * 0.05,
        emoji: Math.random() > 0.35 ? "🌸" : "❀",
      };
    });
    setPetals((prev) => [...prev, ...next]);
  };

  const handleAddToCart = (e) => {
    if (!product) return;
    addToCart(product);
    if (e?.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      spawnPetalBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  return (
    <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-x-hidden md:pb-20">
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <AnimatePresence>
          {petals.map((p) => (
            <motion.span
              key={p.key}
              initial={{ opacity: 0, scale: 0.6, x: p.x, y: p.y, rotate: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.6, 1, 0.85],
                x: p.x + p.dx,
                y: p.y + p.dy,
                rotate: p.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: p.delay }}
              onAnimationComplete={() =>
                setPetals((prev) => prev.filter((x) => x.key !== p.key))
              }
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                willChange: "transform",
              }}
              className="select-none"
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* 1. 戻るボタン */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-2">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 md:gap-2.5 text-[#6e5e54] font-bold text-sm md:text-base hover:text-[#3E2723] active:scale-95 transition-all w-fit"
        >
          <ArrowLeft className="w-[18px] md:w-[22px]" strokeWidth={2.5} />
          一覧へ戻る
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-10 md:pt-16 pb-20">
        {loading ? (
          <div className="bg-[#fdfbf6]/70 border border-[#ebdcd0] rounded-2xl px-6 py-10 text-center text-[#8a7a6c] tracking-widest">
            読み込み中...
          </div>
        ) : error ? (
          <div className="bg-[#fdfbf6]/70 border border-[#ebdcd0] rounded-2xl px-6 py-10 text-center text-[#8a7a6c] tracking-widest">
            {error}
          </div>
        ) : !product ? (
          <div className="bg-[#fdfbf6]/70 border border-[#ebdcd0] rounded-2xl px-6 py-10 text-center text-[#8a7a6c] tracking-widest">
            商品が見つかりません。
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-7">
              <div className="bg-[#fdfbf6] border border-[#ebdcd0] rounded-3xl overflow-hidden soft-shadow">
                <div className="aspect-[4/3] md:aspect-square bg-[#f5efe9] relative overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={resolveImageUrl(product.imageUrl)}
                      alt={String(product.name || "").replace("\n", " ")}
                      className="object-cover w-full h-full mix-blend-multiply opacity-95"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#d8c8b6] gap-2">
                      <ImageIcon className="opacity-60" size={30} />
                      <span className="text-[0.8rem] tracking-widest">
                        画像なし
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#fdfbf6]/70 border border-[#ebdcd0] rounded-3xl p-7 md:p-9 soft-shadow-sm">
                <div className="text-[0.75rem] font-bold tracking-[0.2em] uppercase text-[#8a7a6c] mb-3">
                  商品ID: {product.id}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-widest text-[#4a3f35] leading-[1.6] whitespace-pre-wrap">
                  {product.name}
                </h1>

                <div className="mt-5 text-2xl md:text-3xl font-bold text-[#2B5740] tracking-wider">
                  ¥
                  {typeof product.price === "number"
                    ? product.price.toLocaleString()
                    : product.price}
                  <span className="text-[0.8rem] ml-2 font-normal text-[#8a7a6c]">
                    税込
                  </span>
                </div>

                {product.description ? (
                  <div className="mt-6 text-[0.95rem] md:text-[1rem] text-[#6e5e54] leading-[2] whitespace-pre-wrap">
                    {product.description}
                  </div>
                ) : null}

                <div className="mt-8 grid grid-cols-1 gap-3">
                  <div className="text-red-700 font-bold text-lg md:text-xl leading-relaxed">
                    ※この商品は小樽市内限定でお届けします
                  </div>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full py-4 rounded-2xl bg-[#4a3f35] text-white font-bold tracking-[0.25em] shadow-xl hover:bg-[#322a23] active:scale-[0.98] transition-all"
                  >
                    カートに入れる
                  </button>
                </div>

                <div className="mt-6 text-[0.8rem] text-[#8a7a6c] tracking-widest">
                  {normalizeMulti(product.style).length > 0 ||
                  normalizeMulti(product.color).length > 0 ||
                  normalizeMulti(product.purpose).length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {normalizeMulti(product.style).map((v) => (
                        <span
                          key={`style_${v}`}
                          className="px-3 py-1 rounded-full bg-white/60 border border-[#ebdcd0] text-[#6e5e54] text-[0.75rem] font-bold tracking-widest"
                        >
                          スタイル: {labelFor("style", v)}
                        </span>
                      ))}
                      {normalizeMulti(product.color).map((v) => (
                        <span
                          key={`color_${v}`}
                          className="px-3 py-1 rounded-full bg-white/60 border border-[#ebdcd0] text-[#6e5e54] text-[0.75rem] font-bold tracking-widest"
                        >
                          カラー: {labelFor("color", v)}
                        </span>
                      ))}
                      {normalizeMulti(product.purpose).map((v) => (
                        <span
                          key={`purpose_${v}`}
                          className="px-3 py-1 rounded-full bg-[#f5efe9] border border-[#ebdcd0] text-[#4a3f35] text-[0.75rem] font-bold tracking-widest"
                        >
                          ご用途: {labelFor("purpose", v)}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
