import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from './context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import API_BASE_URL from './apiConfig';

export default function ProductList() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const cart = useCart();

    const [petalBursts, setPetalBursts] = useState([]);

    const API_URL = `${API_BASE_URL}/api/products`;

    const STYLE_OPTIONS = [
        { label: 'アレンジメント', value: 'arrangement' },
        { label: '花束（ブーケ）', value: 'bouquet' },
        { label: '胡蝶蘭', value: 'orchid' },
        { label: '観葉植物', value: 'plant' },
        { label: 'プリザーブド', value: 'preserved' },
    ];

    const COLOR_OPTIONS = [
        { label: '赤系', value: 'red' },
        { label: 'ピンク系', value: 'pink' },
        { label: '白系', value: 'white' },
        { label: '黄・オレンジ系', value: 'yellow_orange' },
        { label: 'ブルー・パープル系', value: 'blue_purple' },
        { label: 'その他・おまかせ', value: 'other' },
    ];

    const PURPOSE_OPTIONS = [
        { label: 'お祝い', value: 'celebration' },
        { label: 'お供え・お悔やみ', value: 'condolence' },
        { label: '誕生日・記念日', value: 'birthday' },
        { label: 'お見舞い', value: 'visit' },
        { label: '自宅用', value: 'home' },
    ];

    const VALUE_LABEL_MAP = useMemo(() => {
        const toMap = (options) => {
            const m = new Map();
            options.forEach((o) => m.set(o.value, o.label));
            return m;
        };

        return {
            style: toMap(STYLE_OPTIONS),
            color: toMap(COLOR_OPTIONS),
            purpose: toMap(PURPOSE_OPTIONS),
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const labelFor = (kind, value) => {
        const v = String(value || '');
        const m = VALUE_LABEL_MAP[kind];
        if (!m) return v;
        return m.get(v) || v;
    };

    const PRICE_OPTIONS = [
        { label: '〜3,000円', value: '0_3000' },
        { label: '3,000円〜5,000円', value: '3000_5000' },
        { label: '5,000円〜10,000円', value: '5000_10000' },
        { label: '10,000円〜', value: '10000_' },
    ];

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        style: new Set(),
        color: new Set(),
        purpose: new Set(),
        price: new Set(),
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        let canceled = false;
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error('商品データの取得に失敗しました');
                const data = await res.json();
                if (!canceled) {
                    setProducts(Array.isArray(data) ? data : []);
                    setError(null);
                }
            } catch (e) {
                if (!canceled) {
                    setProducts([]);
                    setError(e?.message || '商品データの取得に失敗しました');
                }
            } finally {
                if (!canceled) setLoading(false);
            }
        };

        fetchProducts();
        return () => {
            canceled = true;
        };
    }, []);

    useEffect(() => {
        const toSet = (key) => {
            const raw = searchParams.get(key);
            if (!raw) return new Set();
            return new Set(raw.split(',').map((v) => v.trim()).filter(Boolean));
        };

        setFilters({
            style: toSet('style'),
            color: toSet('color'),
            purpose: toSet('purpose'),
            price: toSet('price'),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const next = new URLSearchParams(searchParams);

        const setOrDelete = (key, set) => {
            if (set.size === 0) {
                next.delete(key);
                return;
            }
            next.set(key, Array.from(set).join(','));
        };

        setOrDelete('style', filters.style);
        setOrDelete('color', filters.color);
        setOrDelete('purpose', filters.purpose);
        setOrDelete('price', filters.price);

        setSearchParams(next, { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const resolveImageUrl = (imageUrl) => {
        if (!imageUrl) return '';
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
        const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
        return `${API_BASE_URL}${path}`;
    };

    const handleAddToCart = (product) => {
        if (cart?.addToCart) {
            cart.addToCart(product);
        } else {
            // eslint-disable-next-line no-console
            console.log('カートに追加:', product);
        }
    };

    const spawnPetalBurst = (clientX, clientY) => {
        const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
        const petals = Array.from({ length: 8 }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.6;
            const dist = 26 + Math.random() * 22;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist - 14;
            return {
                key: `${id}_${i}`,
                x: clientX,
                y: clientY,
                dx,
                dy,
                rotate: (Math.random() - 0.5) * 120,
                delay: Math.random() * 0.04,
                emoji: Math.random() > 0.3 ? '🌸' : '❀',
            };
        });

        setPetalBursts((prev) => [...prev, { id, petals }]);
    };

    const filteredProducts = useMemo(() => {
        const matchesValueOr = (value, selected) => {
            if (selected.size === 0) return true;
            if (!value) return false;

            if (Array.isArray(value)) {
                return value.some((v) => selected.has(v));
            }
            return selected.has(value);
        };

        const matchesPrice = (price, selected) => {
            if (selected.size === 0) return true;
            if (typeof price !== 'number') return false;

            const inRange = (rangeValue) => {
                switch (rangeValue) {
                    case '0_3000':
                        return price <= 3000;
                    case '3000_5000':
                        return price >= 3000 && price <= 5000;
                    case '5000_10000':
                        return price >= 5000 && price <= 10000;
                    case '10000_':
                        return price >= 10000;
                    default:
                        return true;
                }
            };

            return Array.from(selected).some((v) => inRange(v));
        };

        return products.filter((p) => {
            const styleOk = matchesValueOr(p.style, filters.style);
            const colorOk = matchesValueOr(p.color, filters.color);
            const purposeOk = matchesValueOr(p.purpose, filters.purpose);
            const priceOk = matchesPrice(p.price, filters.price);
            return styleOk && colorOk && purposeOk && priceOk;
        });
    }, [products, filters]);

    const normalizeMulti = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) return value.filter(Boolean);
        return [value].filter(Boolean);
    };

    const toggleFilterValue = (key, value) => {
        setFilters((prev) => {
            const nextSet = new Set(prev[key]);
            if (nextSet.has(value)) nextSet.delete(value);
            else nextSet.add(value);
            return { ...prev, [key]: nextSet };
        });
    };

    const clearFilters = () => {
        setFilters({
            style: new Set(),
            color: new Set(),
            purpose: new Set(),
            price: new Set(),
        });
    };

    const selectedLabels = useMemo(() => {
        const pickLabels = (options, set) => options.filter((o) => set.has(o.value)).map((o) => o.label);
        return [
            ...pickLabels(STYLE_OPTIONS, filters.style),
            ...pickLabels(COLOR_OPTIONS, filters.color),
            ...pickLabels(PURPOSE_OPTIONS, filters.purpose),
            ...pickLabels(PRICE_OPTIONS, filters.price),
        ];
    }, [filters]);

    return (
        <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-x-hidden md:pb-20">

            <div className="fixed inset-0 pointer-events-none z-[9999]">
                <AnimatePresence>
                    {petalBursts.flatMap((b) =>
                        b.petals.map((p) => (
                            <motion.span
                                key={p.key}
                                initial={{ opacity: 0, scale: 0.6, x: p.x, y: p.y, rotate: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.6, 1, 0.8],
                                    x: p.x + p.dx,
                                    y: p.y + p.dy,
                                    rotate: p.rotate,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.55, ease: 'easeOut', delay: p.delay }}
                                onAnimationComplete={() => {
                                    setPetalBursts((prev) => {
                                        const next = prev
                                            .map((burst) => ({
                                                ...burst,
                                                petals: burst.petals.filter((petal) => petal.key !== p.key),
                                            }))
                                            .filter((burst) => burst.petals.length > 0);
                                        return next;
                                    });
                                }}
                                style={{ position: 'absolute', left: 0, top: 0, willChange: 'transform' }}
                                className="select-none"
                            >
                                {p.emoji}
                            </motion.span>
                        ))
                    )}
                </AnimatePresence>
            </div>

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
                            {selectedLabels.length > 0 ? (
                                <>
                                    絞り込み中
                                    <span className="text-[0.8rem] font-normal text-[#8a7a6c]">（{filteredProducts.length}件）</span>
                                </>
                            ) : (
                                <>
                                    すべての商品
                                    <span className="text-[0.8rem] font-normal text-[#8a7a6c]">（全{products.length}件）</span>
                                </>
                            )}
                        </div>
                    </div>

                    <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-1.5 md:gap-2 text-[0.8rem] md:text-[0.9rem] font-bold border border-[#d8c8b6] bg-white px-3 md:px-4 py-2 md:py-2.5 rounded-full hover:bg-[#ebdcd0] transition-colors">
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

                {loading ? (
                    <div className="bg-[#fdfbf6]/70 border border-[#ebdcd0] rounded-2xl px-6 py-10 text-center text-[#8a7a6c] tracking-widest">
                        読み込み中...
                    </div>
                ) : error ? (
                    <div className="bg-[#fdfbf6]/70 border border-[#ebdcd0] rounded-2xl px-6 py-10 text-center text-[#8a7a6c] tracking-widest">
                        {error}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 flex-1">
                        {filteredProducts.map((product) => (
                            <Link to={`/product/${product.id}`} key={product.id} className="bg-[#fffdf7] rounded-2xl md:rounded-3xl soft-shadow border border-[#ebdcd0] overflow-hidden flex flex-col group cursor-pointer block hover:shadow-[0_16px_40px_rgba(74,63,53,0.1)] transition-shadow duration-300 relative">
                                {/* バッジ */}
                                <div className="absolute top-4 left-4 z-10 bg-red-700 text-white text-[0.8rem] font-bold px-3 py-1 rounded-sm shadow-md tracking-wider">
                                    小樽限定
                                </div>
                                {product.badge && (
                                    <div className="absolute top-14 left-4 z-10 bg-[#2B5740] text-white text-[0.75rem] font-bold px-3 py-1 rounded-sm shadow-md tracking-wider">
                                        {product.badge}
                                    </div>
                                )}

                                <div className="aspect-[4/3] md:aspect-square bg-[#f5efe9] relative overflow-hidden">
                                    {product.imageUrl ? (
                                        <img
                                            src={resolveImageUrl(product.imageUrl)}
                                            alt={product.name.replace('\n', ' ')}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply opacity-95"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#d8c8b6] gap-2">
                                            <ImageIcon className="opacity-60" size={26} />
                                            <span className="text-[0.75rem] tracking-widest">画像なし</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 md:p-6 flex flex-col flex-1 border-t border-[#ebdcd0]/50">
                                    <h3 className="text-[1rem] md:text-[1.1rem] text-[#6e5e54] leading-[1.8] mb-4 font-bold whitespace-pre-wrap flex-1">
                                        {product.name}
                                    </h3>
                                    {normalizeMulti(product.purpose).length > 0 ? (
                                        <div className="-mt-2 mb-3 flex flex-wrap gap-1.5">
                                            {normalizeMulti(product.purpose)
                                                .slice(0, 3)
                                                .map((v) => (
                                                    <span
                                                        key={`purpose_${product.id}_${v}`}
                                                        className="px-2.5 py-1 rounded-full bg-[#f5efe9] border border-[#ebdcd0] text-[#4a3f35] text-[0.7rem] font-bold tracking-widest"
                                                    >
                                                        {labelFor('purpose', v)}
                                                    </span>
                                                ))}
                                        </div>
                                    ) : null}
                                    <p className="text-[1.3rem] md:text-[1.5rem] font-bold text-[#4a3f35] mt-auto">
                                        ¥{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                                        <span className="text-[0.7rem] ml-1 font-normal text-[#8a7a6c]">税込</span>
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
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                spawnPetalBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
                                                handleAddToCart(product);
                                            }}
                                            className="w-full py-3 md:py-3.5 bg-[#4a3f35] text-white rounded-xl text-[0.95rem] font-bold tracking-widest hover:bg-[#322a23] active:scale-[0.98] transition-all"
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
                        現在、商品の準備中です。
                    </div>
                )}

                {/* ページネーション */}
                <div className="mt-16 flex justify-center items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ebdcd0] text-[#a38f7d] hover:bg-[#f5efe9] transition-colors bg-white font-bold">&lsaquo;</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#bc8a7e] bg-[#bc8a7e] text-white font-bold shadow-sm">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ebdcd0] text-[#6e5e54] hover:bg-[#f5efe9] transition-colors bg-white font-bold">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ebdcd0] text-[#6e5e54] hover:bg-[#f5efe9] transition-colors bg-white font-bold">3</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ebdcd0] text-[#a38f7d] hover:bg-[#f5efe9] transition-colors bg-white font-bold">&rsaquo;</button>
                </div>

            </main>

            {/* 4. 絞り込みドロワー */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-[9999]">
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="absolute inset-0 bg-black/30"
                        aria-label="close filter"
                    />

                    <aside className="absolute right-0 top-0 h-full w-[92%] max-w-md bg-[#fdfbf6] border-l border-[#ebdcd0] shadow-2xl">
                        <div className="h-full flex flex-col">
                            <div className="px-6 py-5 border-b border-[#ebdcd0] flex items-center justify-between">
                                <div className="text-[#4a3f35] font-bold tracking-widest">絞り込み</div>
                                <button onClick={() => setIsFilterOpen(false)} className="text-[#6e5e54] font-bold tracking-widest text-sm hover:text-[#3E2723]">
                                    閉じる
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                                <div>
                                    <div className="text-[#8a7a6c] font-bold tracking-widest text-[0.85rem] mb-3 border-l-[3px] border-[#bc8a7e] pl-3">スタイル</div>
                                    <div className="flex flex-wrap gap-2">
                                        {STYLE_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => toggleFilterValue('style', opt.value)}
                                                className={`${filters.style.has(opt.value)
                                                    ? 'bg-[#4a3f35] text-white border-[#4a3f35]'
                                                    : 'bg-white text-[#6e5e54] border-[#ebdcd0] hover:border-[#bc8a7e]'
                                                    } border px-4 py-2 rounded-full text-[0.85rem] font-bold tracking-widest transition-colors`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[#8a7a6c] font-bold tracking-widest text-[0.85rem] mb-3 border-l-[3px] border-[#bc8a7e] pl-3">カラー</div>
                                    <div className="flex flex-wrap gap-2">
                                        {COLOR_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => toggleFilterValue('color', opt.value)}
                                                className={`${filters.color.has(opt.value)
                                                    ? 'bg-[#4a3f35] text-white border-[#4a3f35]'
                                                    : 'bg-white text-[#6e5e54] border-[#ebdcd0] hover:border-[#bc8a7e]'
                                                    } border px-4 py-2 rounded-full text-[0.85rem] font-bold tracking-widest transition-colors`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[#8a7a6c] font-bold tracking-widest text-[0.85rem] mb-3 border-l-[3px] border-[#bc8a7e] pl-3">ご用途</div>
                                    <div className="flex flex-wrap gap-2">
                                        {PURPOSE_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => toggleFilterValue('purpose', opt.value)}
                                                className={`${filters.purpose.has(opt.value)
                                                    ? 'bg-[#4a3f35] text-white border-[#4a3f35]'
                                                    : 'bg-white text-[#6e5e54] border-[#ebdcd0] hover:border-[#bc8a7e]'
                                                    } border px-4 py-2 rounded-full text-[0.85rem] font-bold tracking-widest transition-colors`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[#8a7a6c] font-bold tracking-widest text-[0.85rem] mb-3 border-l-[3px] border-[#bc8a7e] pl-3">価格帯</div>
                                    <div className="flex flex-wrap gap-2">
                                        {PRICE_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => toggleFilterValue('price', opt.value)}
                                                className={`${filters.price.has(opt.value)
                                                    ? 'bg-[#4a3f35] text-white border-[#4a3f35]'
                                                    : 'bg-white text-[#6e5e54] border-[#ebdcd0] hover:border-[#bc8a7e]'
                                                    } border px-4 py-2 rounded-full text-[0.85rem] font-bold tracking-widest transition-colors`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-5 border-t border-[#ebdcd0] bg-[#fdfbf6]">
                                <div className="flex gap-3">
                                    <button
                                        onClick={clearFilters}
                                        className="flex-1 py-3 rounded-xl border border-[#d8c8b6] bg-white text-[#6e5e54] font-bold tracking-widest hover:bg-[#f5efe9] transition-colors"
                                    >
                                        クリア
                                    </button>
                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="flex-1 py-3 rounded-xl bg-[#4a3f35] text-white font-bold tracking-widest hover:bg-[#322a23] transition-colors"
                                    >
                                        適用
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            )}

        </div>
    );
}
