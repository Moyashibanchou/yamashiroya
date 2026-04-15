import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Lock, ShieldCheck, CreditCard, User, MapPin, Mail, Phone, Smartphone, Store, Apple, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './context/CartContext.jsx';
import API_BASE_URL from './apiConfig';

export default function Checkout() {
    const navigate = useNavigate();
    const { items, cartTotal, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('credit'); // 'credit', 'paypay', 'applepay', 'convenience'
    const [step, setStep] = useState('input'); // 'input' | 'confirm'

    useEffect(() => {
        console.log('Checkout mounted', { API_BASE_URL });
    }, []);

    const normalizeDigitsOnly = (value) => {
        const s = String(value ?? '');
        const half = s.replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0));
        return half.replace(/\D/g, '');
    };

    const resolveImageUrl = (imageUrl) => {
        if (!imageUrl) return '';
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
        const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
        return `${API_BASE_URL}${path}`;
    };

    const CHECKOUT_FORM_STORAGE_KEY = 'checkoutFormData';

    const [form, setForm] = useState(() => {
        try {
            const raw = sessionStorage.getItem(CHECKOUT_FORM_STORAGE_KEY);
            if (!raw) {
                return {
                    name: '',
                    email: '',
                    phone: '',
                    fax: '',
                    zipcode: '',
                    prefectureCity: '',
                    addressLine: '',
                    deliveryDateMode: 'none',
                    deliveryDate: '',
                    deliveryTimeNote: '',
                    requests: '',
                };
            }

            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object') {
                return {
                    name: '',
                    email: '',
                    phone: '',
                    fax: '',
                    zipcode: '',
                    prefectureCity: '',
                    addressLine: '',
                    deliveryDateMode: 'none',
                    deliveryDate: '',
                    deliveryTimeNote: '',
                    requests: '',
                };
            }

            return {
                name: String(parsed.name || ''),
                email: String(parsed.email || ''),
                phone: String(parsed.phone || ''),
                fax: String(parsed.fax || ''),
                zipcode: String(parsed.zipcode || ''),
                prefectureCity: String(parsed.prefectureCity || ''),
                addressLine: String(parsed.addressLine || ''),
                deliveryDateMode: parsed.deliveryDateMode === 'specified' ? 'specified' : 'none',
                deliveryDate: String(parsed.deliveryDate || ''),
                deliveryTimeNote: String(parsed.deliveryTimeNote || ''),
                requests: String(parsed.requests || ''),
            };
        } catch {
            return {
                name: '',
                email: '',
                phone: '',
                fax: '',
                zipcode: '',
                prefectureCity: '',
                addressLine: '',
                deliveryDateMode: 'none',
                deliveryDate: '',
                deliveryTimeNote: '',
                requests: '',
            };
        }
    });

    useEffect(() => {
        try {
            sessionStorage.setItem(CHECKOUT_FORM_STORAGE_KEY, JSON.stringify(form));
        } catch {
            // ignore
        }
    }, [form]);

    const [errors, setErrors] = useState({
        email: '',
        phone: '',
        zipcode: '',
        address: '',
    });

    const [isLookingUpZip, setIsLookingUpZip] = useState(false);

    const API_URL_CREATE_SESSION = '/api/payments/create-session';

    const shippingFee = 0;
    const totalAmount = cartTotal;

    const emailIsValid = useMemo(() => {
        const v = String(form.email || '').trim();
        if (!v) return false;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }, [form.email]);

    const phoneIsValid = useMemo(() => {
        const v = String(form.phone || '').trim();
        if (!v) return false;
        if (/^\d{10,11}$/.test(v)) return true;
        return false;
    }, [form.phone]);

    const zipcodeNormalized = useMemo(() => String(form.zipcode || '').replace(/\D/g, ''), [form.zipcode]);

    const isOtaruAddress = useMemo(() => {
        const v = `${String(form.prefectureCity || '')} ${String(form.addressLine || '')}`;
        return v.includes('北海道小樽市');
    }, [form.prefectureCity, form.addressLine]);

    const validateBeforeSubmit = () => {
        const next = {
            email: '',
            phone: '',
            zipcode: '',
            address: '',
        };

        if (!emailIsValid) {
            next.email = 'メールアドレスを正しい形式で入力してください。';
        }
        if (!phoneIsValid) {
            next.phone = '電話番号を正しい形式で入力してください。（例：09012345678 / 0134-00-0000）';
        }
        if (!zipcodeNormalized || !/^\d{7}$/.test(zipcodeNormalized)) {
            next.zipcode = '郵便番号は7桁で入力してください。';
        }
        if (!String(form.prefectureCity || '').trim() || !String(form.addressLine || '').trim()) {
            next.address = '住所を入力してください。';
        } else if (!isOtaruAddress) {
            next.address = '誠に申し訳ございません。配達は小樽市内のみとさせていただいております。';
        }

        setErrors(next);
        return !next.email && !next.phone && !next.zipcode && !next.address;
    };

    const handleGoToConfirm = () => {
        console.log('確認へ進む クリック', { step, isProcessing, itemsCount: items.length });
        const ok = validateBeforeSubmit();
        console.log('確認へ進む validateBeforeSubmit', { ok });
        if (!ok) return;
        setStep('confirm');
        window.scrollTo(0, 0);
    };

    const lookupAddressByZipcode = async () => {
        const zip = zipcodeNormalized;
        if (!/^\d{7}$/.test(zip)) {
            setErrors((prev) => ({ ...prev, zipcode: '郵便番号は7桁で入力してください。' }));
            return;
        }

        setIsLookingUpZip(true);
        try {
            const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${encodeURIComponent(zip)}`);
            if (!res.ok) throw new Error('郵便番号検索に失敗しました');
            const data = await res.json();

            if (data && data.status === 200 && Array.isArray(data.results) && data.results[0]) {
                const r = data.results[0];
                const prefecture = r.address1 || '';
                const city = r.address2 || '';
                const town = r.address3 || '';
                setForm((prev) => ({
                    ...prev,
                    prefectureCity: `${prefecture}${city}${town}`,
                }));
                setErrors((prev) => ({ ...prev, zipcode: '', address: '' }));
            } else {
                setErrors((prev) => ({ ...prev, zipcode: '該当する住所が見つかりませんでした。' }));
            }
        } catch (e) {
            setErrors((prev) => ({ ...prev, zipcode: '郵便番号検索に失敗しました。時間をおいてお試しください。' }));
        } finally {
            setIsLookingUpZip(false);
        }
    };

    // Spring Boot API との本番連携
    const handlePlaceOrder = async () => {
        console.log('handlePlaceOrder called', {
            step,
            isProcessing,
            itemsCount: items.length,
            paymentMethod,
            apiBase: API_BASE_URL,
        });

        const ok = validateBeforeSubmit();
        console.log('handlePlaceOrder validateBeforeSubmit', { ok });
        if (!ok) return;
        setIsProcessing(true);

        try {
            sessionStorage.setItem(CHECKOUT_FORM_STORAGE_KEY, JSON.stringify(form));
        } catch {
            // ignore
        }

        // KOMOJU への直行型決済用マッピング処理（厳密な文字列変換）
        let komojuPaymentType = "credit_card"; // デフォルト
        if (paymentMethod === "credit") {
            komojuPaymentType = "credit_card";
        } else if (paymentMethod === "paypay") {
            komojuPaymentType = "paypay";
        } else if (paymentMethod === "applepay") {
            komojuPaymentType = "apple_pay";
        } else if (paymentMethod === "convenience") {
            komojuPaymentType = "konbini";
        }

        try {
            // Spring Boot バックエンドに対して決済セッションの作成をリクエスト
            const payload = {
                amount: totalAmount,
                paymentMethod: komojuPaymentType,
            };

            try {
                sessionStorage.setItem('yamashiroya_last_create_session_request', JSON.stringify({
                    at: new Date().toISOString(),
                    endpoint: `${API_BASE_URL}/api/payments/create-session`,
                    payload,
                }));
            } catch {
                // ignore
            }

            console.log('送信開始', {
                endpoint: `${API_BASE_URL}/api/payments/create-session`,
                payload,
            });

            const response = await fetch(`${API_BASE_URL}/api/payments/create-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            console.log('fetch戻り値', {
                ok: response.ok,
                status: response.status,
                statusText: response.statusText,
            });

            if (!response.ok) {
                const text = await response.text().catch(() => '');
                console.log('失敗', {
                    status: response.status,
                    statusText: response.statusText,
                    body: text,
                });
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('成功', data);

            try {
                sessionStorage.setItem('yamashiroya_last_create_session_response', JSON.stringify({
                    at: new Date().toISOString(),
                    endpoint: `${API_BASE_URL}/api/payments/create-session`,
                    payload,
                    response: data,
                }));
            } catch {
                // ignore
            }
            
            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else {
                throw new Error('Checkout URL not found in response');
            }
        } catch (error) {
            console.log('失敗', {
                message: error?.message,
                error,
            });

            try {
                sessionStorage.setItem('yamashiroya_last_create_session_error', JSON.stringify({
                    at: new Date().toISOString(),
                    endpoint: `${API_BASE_URL}/api/payments/create-session`,
                    message: error?.message,
                }));
            } catch {
                // ignore
            }
            console.error('Payment Error:', error);
            alert('決済処理に失敗しました。サーバーが起動しているか確認し、時間をおいて再度お試しください。');
            setIsProcessing(false);
        }
    };

    const formatDeliveryDate = (value) => {
        const v = String(value || '').trim();
        if (!v) return '';
        const [y, m, d] = v.split('-');
        if (!y || !m || !d) return v;
        return `${y}年${m}月${d}日`;
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full min-h-screen washi-pattern text-[#1f1b16] relative shadow-2xl elegant-font overflow-x-hidden pb-20 md:pb-32 text-xl leading-relaxed"
        >
            {/* 1. 戻るボタン */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6 md:pt-12 pb-4">
                <button 
                    onClick={() => navigate('/cart')} 
                    className="inline-flex items-center gap-2 text-[#6e5e54] font-bold text-sm md:text-base hover:text-[#4a3f35] active:scale-95 transition-all w-fit cursor-pointer group"
                    disabled={isProcessing}
                >
                    <ArrowLeft className="w-[18px] md:w-[22px] group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
                    お買い物に戻る
                </button>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-4">
                <div className="bg-[#fffdf7]/80 border border-[#ebdcd0] rounded-2xl px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base font-black tracking-widest text-[#4a3f35]">
                        <span className={step === 'input' ? 'text-[#2B5740]' : 'text-[#a38f7d]'}>情報入力</span>
                        <span className="text-[#a38f7d]">＞</span>
                        <span className={step === 'confirm' ? 'text-[#2B5740]' : 'text-[#a38f7d]'}>入力確認</span>
                        <span className="text-[#a38f7d]">＞</span>
                        <span className="text-[#a38f7d]">完了</span>
                    </div>
                    <div className="mt-3 h-2 w-full bg-[#ebdcd0] rounded-full overflow-hidden">
                        <div className={`h-full ${step === 'confirm' ? 'w-[66%]' : 'w-[33%]'} bg-[#2B5740]`}></div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-6 md:py-8">
                <header className="text-center mb-12 md:mb-20">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-[0.3em] mb-4">お支払い</h1>
                    <p className="text-[#8a7a6c] text-sm md:text-base tracking-widest font-medium">ご注文を確定してください</p>
                </header>

                {/* 2. メインコンテンツ（PCは2カラム） */}
                <div className="md:flex md:gap-16 lg:gap-24 md:items-start">

                    {/* 左側：入力フォーム & 決済選択 */}
                    <div className="md:w-[55%] lg:w-[60%] space-y-12 md:space-y-20">
                        
                        {/* セクション：お客様情報 */}
                        {step === 'input' ? (
                        <>
                        <section className="bg-white/30 p-8 md:p-10 rounded-[2.5rem] border border-[#ebdcd0] soft-shadow-header">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 bg-[#4a3f35] rounded-full flex items-center justify-center text-white">
                                    <User size={20} />
                                </div>
                                <h2 className="text-xl font-bold tracking-widest">お届け先 ＆ ご連絡先</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="md:col-span-2">
                                    <label className="block text-sm md:text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">お名前（姓名）</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                                        placeholder="例：山城 太郎"
                                        className="w-full bg-white/60 border border-[#d8c8b6] text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/20 focus:border-[#4a3f35] transition-all duration-300 placeholder:text-[#a38f7d]/40"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm md:text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">メールアドレス</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => {
                                            const v = e.target.value;
                                            setForm((prev) => ({ ...prev, email: v }));
                                            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                                        }}
                                        placeholder="example@mail.com"
                                        className={`w-full bg-white/60 border ${errors.email ? 'border-red-400' : 'border-[#d8c8b6]'} text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/20 focus:border-[#4a3f35] transition-all duration-300 placeholder:text-[#a38f7d]/40`}
                                    />
                                    {errors.email ? (
                                        <p className="mt-2 text-sm md:text-xs font-bold tracking-widest text-red-600">{errors.email}</p>
                                    ) : null}
                                </div>
                                <div>
                                    <label className="block text-sm md:text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">電話番号</label>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => {
                                            const v = normalizeDigitsOnly(e.target.value);
                                            setForm((prev) => ({ ...prev, phone: v }));
                                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                                        }}
                                        placeholder="0134-00-0000 / 09012345678"
                                        className={`w-full bg-white/60 border ${errors.phone ? 'border-red-400' : 'border-[#d8c8b6]'} text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/20 focus:border-[#4a3f35] transition-all duration-300 placeholder:text-[#a38f7d]/40`}
                                    />
                                    {errors.phone ? (
                                        <p className="mt-2 text-sm md:text-xs font-bold tracking-widest text-red-600">{errors.phone}</p>
                                    ) : null}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm md:text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">FAX（任意）</label>
                                    <input
                                        type="text"
                                        value={form.fax}
                                        onChange={(e) => setForm((prev) => ({ ...prev, fax: e.target.value }))}
                                        placeholder="例：0134-00-0000"
                                        className="w-full bg-white/60 border border-[#d8c8b6] text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/20 focus:border-[#4a3f35] transition-all duration-300 placeholder:text-[#a38f7d]/40"
                                    />
                                </div>
                            </div>

                            <div className="space-y-8 pt-8 border-t border-[#ebdcd0]/50">
                                <div className="flex gap-4 items-end">
                                    <div className="w-full">
                                        <label className="block text-sm md:text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">郵便番号</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={form.zipcode}
                                                onChange={(e) => {
                                                    const v = normalizeDigitsOnly(e.target.value);
                                                    setForm((prev) => ({ ...prev, zipcode: v }));
                                                    if (errors.zipcode) setErrors((prev) => ({ ...prev, zipcode: '' }));
                                                }}
                                                onBlur={() => {
                                                    if (/^\d{7}$/.test(zipcodeNormalized)) {
                                                        lookupAddressByZipcode();
                                                    }
                                                }}
                                                placeholder="0470000"
                                                className={`w-full bg-white/60 border ${errors.zipcode ? 'border-red-400' : 'border-[#d8c8b6]'} text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/20 focus:border-[#4a3f35] transition-all duration-300`}
                                            />
                                            <MapPin className="absolute right-6 top-1/2 -translate-y-1/2 text-[#a38f7d]/40" size={18} />
                                        </div>
                                        {errors.zipcode ? (
                                            <p className="mt-2 text-sm md:text-xs font-bold tracking-widest text-red-600">{errors.zipcode}</p>
                                        ) : null}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={lookupAddressByZipcode}
                                        disabled={isLookingUpZip || isProcessing}
                                        className="bg-[#4a3f35] text-white px-8 py-4 rounded-2xl text-base md:text-sm font-bold hover:bg-[#322a23] transition-all cursor-pointer whitespace-nowrap shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isLookingUpZip ? '検索中...' : '住所検索'}
                                    </button>
                                </div>
                                <div>
                                    <label className="block text-sm md:text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">都道府県・市区町村</label>
                                    <input
                                        type="text"
                                        value={form.prefectureCity}
                                        onChange={(e) => {
                                            const v = e.target.value;
                                            setForm((prev) => ({ ...prev, prefectureCity: v }));
                                            if (errors.address) setErrors((prev) => ({ ...prev, address: '' }));
                                        }}
                                        placeholder="北海道小樽市..."
                                        className={`w-full bg-white/60 border ${errors.address ? 'border-red-400' : 'border-[#d8c8b6]'} text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/20 focus:border-[#4a3f35] transition-all duration-300`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm md:text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">番地・建物名</label>
                                    <input
                                        type="text"
                                        value={form.addressLine}
                                        onChange={(e) => {
                                            const v = e.target.value;
                                            setForm((prev) => ({ ...prev, addressLine: v }));
                                            if (errors.address) setErrors((prev) => ({ ...prev, address: '' }));
                                        }}
                                        placeholder="1-2-3 山城ビル 101"
                                        className={`w-full bg-white/60 border ${errors.address ? 'border-red-400' : 'border-[#d8c8b6]'} text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/20 focus:border-[#4a3f35] transition-all duration-300`}
                                    />
                                    {errors.address ? (
                                        <p className="mt-2 text-sm md:text-xs font-bold tracking-widest text-red-600">{errors.address}</p>
                                    ) : null}
                                </div>
                            </div>
                        </section>

                        <section className="bg-white/30 p-8 md:p-10 rounded-[2.5rem] border border-[#ebdcd0] soft-shadow-header">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 bg-[#2B5740] rounded-full flex items-center justify-center text-white">
                                    <MapPin size={20} />
                                </div>
                                <h2 className="text-xl font-bold tracking-widest">配送指定</h2>
                            </div>

                            <div className="bg-white/60 border border-[#ebdcd0] rounded-[2rem] p-7 md:p-8">
                                <div className="text-sm md:text-base font-bold tracking-widest text-[#4a3f35]">
                                    ■小樽市内配達
                                </div>
                                <p className="mt-4 text-sm text-[#6e5e54] leading-relaxed tracking-wide font-medium">
                                    通常、ご入金確認後翌々営業日以内、もしくはご指定の日時に配達いたします。本商品は小樽市内への配達に限定させていただいておりますので、配達料は無料です。
                                </p>

                                <div className="mt-8 space-y-6">
                                    <div>
                                        <div className="text-sm md:text-xs font-bold text-[#8a7a6c] tracking-[0.2em] uppercase mb-3">配送日指定</div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                                <input
                                                    type="radio"
                                                    name="deliveryDateMode"
                                                    value="none"
                                                    checked={form.deliveryDateMode === 'none'}
                                                    onChange={() => setForm((prev) => ({ ...prev, deliveryDateMode: 'none' }))}
                                                    className="w-5 h-5 accent-[#2B5740]"
                                                />
                                                <span className="text-sm font-bold tracking-widest text-[#6e5e54]">指定なし</span>
                                            </label>
                                            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                                <input
                                                    type="radio"
                                                    name="deliveryDateMode"
                                                    value="specified"
                                                    checked={form.deliveryDateMode === 'specified'}
                                                    onChange={() => setForm((prev) => ({ ...prev, deliveryDateMode: 'specified' }))}
                                                    className="w-5 h-5 accent-[#2B5740]"
                                                />
                                                <span className="text-sm font-bold tracking-widest text-[#6e5e54]">指定</span>
                                            </label>
                                        </div>

                                        <div className="mt-4">
                                            <input
                                                type="date"
                                                value={form.deliveryDate}
                                                onChange={(e) => setForm((prev) => ({ ...prev, deliveryDate: e.target.value }))}
                                                disabled={form.deliveryDateMode !== 'specified'}
                                                className="w-full bg-white/60 border border-[#d8c8b6] text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/20 focus:border-[#4a3f35] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm md:text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">配達時間帯指定</label>
                                        <input
                                            type="text"
                                            value={form.deliveryTimeNote}
                                            onChange={(e) => setForm((prev) => ({ ...prev, deliveryTimeNote: e.target.value }))}
                                            placeholder="例：午前中、18時以降...など"
                                            className="w-full bg-white/60 border border-[#d8c8b6] text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/20 focus:border-[#4a3f35] transition-all duration-300 placeholder:text-[#a38f7d]/40"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white/30 p-8 md:p-10 rounded-[2.5rem] border border-[#ebdcd0] soft-shadow-header">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 bg-[#bc8a7e] rounded-full flex items-center justify-center text-white">
                                    <Mail size={20} />
                                </div>
                                <h2 className="text-xl font-bold tracking-widest">その他</h2>
                            </div>

                            <div>
                                <label className="block text-sm md:text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">ご要望</label>
                                <textarea
                                    value={form.requests}
                                    onChange={(e) => setForm((prev) => ({ ...prev, requests: e.target.value }))}
                                    rows={5}
                                    placeholder="備考・ご要望などがありましたらご記入ください。"
                                    className="w-full bg-white/60 border border-[#d8c8b6] text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/20 focus:border-[#4a3f35] transition-all duration-300 placeholder:text-[#a38f7d]/40 resize-none"
                                />
                            </div>
                        </section>

                        </>
                        ) : (
                        <section className="bg-white/30 p-8 md:p-10 rounded-[2.5rem] border border-[#ebdcd0] soft-shadow-header">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 bg-[#4a3f35] rounded-full flex items-center justify-center text-white">
                                    <ShieldCheck size={20} />
                                </div>
                                <h2 className="text-xl font-bold tracking-widest">入力内容の確認</h2>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-white/70 border border-[#ebdcd0] rounded-[2rem] p-7 md:p-8">
                                    <div className="text-base md:text-lg font-bold tracking-widest">ご注文内容</div>
                                    <div className="mt-5 space-y-4">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex items-start gap-4 border-b border-[#ebdcd0]/60 pb-4">
                                                <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden shrink-0 border border-[#ebdcd0] shadow-sm">
                                                    <img src={resolveImageUrl(item.imageUrl)} alt={item.name} className="w-full h-full object-cover mix-blend-multiply opacity-95" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="font-bold tracking-wide break-words">{item.name}</div>
                                                    <div className="mt-2 flex justify-between gap-4 text-base font-bold text-[#2B5740]">
                                                        <span>数量: {item.quantity}</span>
                                                        <span>¥{(item.price * item.quantity).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {items.length === 0 ? (
                                            <div className="text-[#4a3f35] font-bold tracking-widest">カートが空です</div>
                                        ) : null}
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        <div className="flex justify-between font-bold">
                                            <span>商品小計</span>
                                            <span>¥{cartTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between font-bold">
                                            <span>送料</span>
                                            <span>¥0（小樽市内配達）</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-black pt-4 border-t border-[#ebdcd0]/70">
                                            <span>お支払い合計</span>
                                            <span className="text-[#2B5740]">¥{totalAmount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/70 border border-[#ebdcd0] rounded-[2rem] p-7 md:p-8">
                                    <div className="text-base md:text-lg font-bold tracking-widest">お客様情報</div>
                                    <div className="mt-5 space-y-3 font-bold">
                                        <div className="flex flex-col sm:flex-row sm:gap-4">
                                            <span className="text-[#6e5e54]">お名前</span>
                                            <span className="text-[#1f1b16]">{form.name || '（未入力）'}</span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:gap-4">
                                            <span className="text-[#6e5e54]">メール</span>
                                            <span className="text-[#1f1b16] break-all">{form.email || '（未入力）'}</span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:gap-4">
                                            <span className="text-[#6e5e54]">電話</span>
                                            <span className="text-[#1f1b16]">{form.phone || '（未入力）'}</span>
                                        </div>
                                        {String(form.fax || '').trim() ? (
                                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                                <span className="text-[#6e5e54]">FAX</span>
                                                <span className="text-[#1f1b16]">{form.fax}</span>
                                            </div>
                                        ) : null}
                                        <div className="pt-3 border-t border-[#ebdcd0]/70">
                                            <div className="text-[#6e5e54]">ご住所</div>
                                            <div className="mt-2 text-[#1f1b16] break-words">
                                                〒{form.zipcode} {form.prefectureCity} {form.addressLine}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/70 border border-[#ebdcd0] rounded-[2rem] p-7 md:p-8">
                                    <div className="text-base md:text-lg font-bold tracking-widest">配送指定</div>
                                    <div className="mt-5 space-y-4 font-bold">
                                        <div>
                                            <div className="text-[#6e5e54]">配送方法</div>
                                            <div className="mt-2 text-[#1f1b16]">小樽市内配達（送料無料）</div>
                                        </div>
                                        <div>
                                            <div className="text-[#6e5e54]">配送日</div>
                                            <div className="mt-2 text-[#1f1b16]">
                                                {form.deliveryDateMode === 'specified' ? (form.deliveryDate ? formatDeliveryDate(form.deliveryDate) : '（日付未入力）') : '指定なし'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[#6e5e54]">時間帯</div>
                                            <div className="mt-2 text-[#1f1b16]">{String(form.deliveryTimeNote || '').trim() ? form.deliveryTimeNote : '指定なし'}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/70 border border-[#ebdcd0] rounded-[2rem] p-7 md:p-8">
                                    <div className="text-base md:text-lg font-bold tracking-widest">ご要望</div>
                                    <div className="mt-5 whitespace-pre-wrap font-bold text-[#1f1b16]">
                                        {String(form.requests || '').trim() ? form.requests : '（なし）'}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep('input');
                                            window.scrollTo(0, 0);
                                        }}
                                        disabled={isProcessing}
                                        className="w-full py-4 rounded-2xl bg-white/70 border-2 border-[#4a3f35] text-[#4a3f35] font-black tracking-widest hover:bg-white active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        入力画面へ戻る（修正する）
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            console.log('注文を確定する クリック', { step, isProcessing, itemsCount: items.length });
                                            return handlePlaceOrder();
                                        }}
                                        disabled={isProcessing || items.length === 0}
                                        className="w-full py-4 rounded-2xl bg-[#4a3f35] text-white font-black tracking-widest shadow-xl hover:bg-[#322a23] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        注文を確定する
                                    </button>
                                </div>
                            </div>
                        </section>
                        )}

                        {/* セクション：決済方法 */}
                        <section className="bg-white/30 p-8 md:p-10 rounded-[2.5rem] border border-[#ebdcd0] soft-shadow-header">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 bg-[#bc8a7e] rounded-full flex items-center justify-center text-white">
                                    <Lock size={20} />
                                </div>
                                <h2 className="text-xl font-bold tracking-widest">お支払い方法</h2>
                            </div>

                            {/* 決済方法選択カード */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                {[
                                    { id: 'credit', label: 'クレジットカード', icon: <CreditCard size={20} /> },
                                    { id: 'paypay', label: 'PayPay（スマホ決済）', icon: <Smartphone size={20} /> },
                                    { id: 'applepay', label: 'Apple Pay / Google Pay', icon: <Apple size={20} /> },
                                    { id: 'convenience', label: 'コンビニ決済', icon: <Store size={20} /> },
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-500 text-left
                                            ${paymentMethod === method.id 
                                                ? 'bg-[#4a3f35] text-white border-[#4a3f35] shadow-xl' 
                                                : 'bg-white/60 text-[#4a3f35] border-[#ebdcd0] hover:border-[#bc8a7e] hover:bg-white'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                                            ${paymentMethod === method.id ? 'bg-white/20' : 'bg-[#f5efe9]'}`}>
                                            {method.icon}
                                        </div>
                                        <span className="text-sm font-bold tracking-widest">{method.label}</span>
                                        {paymentMethod === method.id && (
                                            <motion.div layoutId="activeCheck" className="ml-auto">
                                                <ShieldCheck size={20} className="text-white" />
                                            </motion.div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* 決済方法に応じた案内表示 */}
                            <AnimatePresence mode="wait">
                                {paymentMethod === 'credit' && (
                                    <motion.div
                                        key="credit"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        className="bg-white/60 p-10 rounded-[2rem] border border-[#ebdcd0] flex flex-col items-center text-center space-y-6"
                                    >
                                        <div className="w-16 h-16 bg-[#f5efe9] rounded-2xl flex items-center justify-center text-[#4a3f35]">
                                            <CreditCard size={32} />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-bold tracking-widest">クレジットカード決済</h3>
                                            <p className="text-sm text-[#6e5e54] leading-relaxed max-w-sm mx-auto font-medium">
                                                KOMOJUの安全な決済画面に移動して、お支払いを完了します。<br />
                                                高度な暗号化技術により、お客様のカード情報は安全に保護されます。
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {paymentMethod === 'paypay' && (
                                    <motion.div
                                        key="paypay"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        className="bg-white/60 p-10 rounded-[2rem] border border-[#ebdcd0] flex flex-col items-center text-center space-y-6"
                                    >
                                        <div className="w-16 h-16 bg-[#ff0033] rounded-2xl flex items-center justify-center text-white font-black text-2xl italic shadow-xl shadow-[#ff0033]/20">
                                            P
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-bold tracking-widest">PayPayでお支払い</h3>
                                            <p className="text-sm text-[#6e5e54] leading-relaxed max-w-sm mx-auto font-medium">
                                                KOMOJUの決済画面へ移動後、PayPayアプリまたはブラウザが起動します。内容を確認の上、お支払いください。
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {paymentMethod === 'applepay' && (
                                    <motion.div
                                        key="applepay"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        className="bg-white/60 p-10 rounded-[2rem] border border-[#ebdcd0] flex flex-col items-center text-center space-y-6"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Apple size={40} />
                                            <div className="w-px h-8 bg-[#ebdcd0]"></div>
                                            <div className="w-10 h-10 flex items-center justify-center">
                                                <svg viewBox="0 0 24 24" className="w-full h-full text-[#4a3f35]"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-bold tracking-widest">Apple Pay / Google Pay</h3>
                                            <p className="text-sm text-[#6e5e54] leading-relaxed max-w-sm mx-auto font-medium">
                                                KOMOJUの安全な決済画面に移動します。デバイスに設定された支払い情報で、素早く安全にお支払いが可能です。
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {paymentMethod === 'convenience' && (
                                    <motion.div
                                        key="convenience"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        className="bg-white/60 p-10 rounded-[2rem] border border-[#ebdcd0] flex flex-col items-center text-center space-y-6"
                                    >
                                        <div className="w-16 h-16 bg-[#f5efe9] rounded-2xl flex items-center justify-center text-[#a38f7d]">
                                            <Store size={32} />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-bold tracking-widest">コンビニ決済</h3>
                                            <p className="text-sm text-[#6e5e54] leading-relaxed max-w-sm mx-auto font-medium">
                                                KOMOJUの画面にてお支払い予定のコンビニを選択してください。完了後に発行される番号を控えて、店頭でお支払いいただけます。
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>
                    </div>

                    {/* 右側：注文確認（Sticky） */}
                    <div className="md:w-[45%] lg:w-[40%] mt-16 md:mt-0">
                        <aside className="sticky top-32 bg-[#f5efe9] rounded-[3rem] border border-[#ebdcd0] overflow-hidden soft-shadow-header">
                            <div className="p-8 lg:p-12">
                                <h3 className="text-xl font-bold tracking-[0.2em] mb-10 border-b border-[#d8c8b6] pb-6">ご注文内容</h3>
                                
                                {/* 商品リスト */}
                                <div className="space-y-8 max-h-[350px] overflow-y-auto pr-2 mb-10 hide-scroll">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-6">
                                            <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden shrink-0 border border-[#ebdcd0] shadow-sm">
                                                <img src={resolveImageUrl(item.imageUrl)} alt={item.name} className="w-full h-full object-cover mix-blend-multiply opacity-95" />
                                            </div>
                                            <div className="flex flex-col justify-center flex-1 min-w-0">
                                                <p className="text-sm font-bold leading-relaxed mb-1 truncate">{item.name}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-[#8a7a6c] font-bold">数量: {item.quantity}</span>
                                                    <span className="text-sm font-bold tracking-wider">¥{(item.price * item.quantity).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {items.length === 0 && (
                                        <div className="py-12 text-center space-y-4">
                                            <div className="w-16 h-16 bg-[#fdfbf6] rounded-full flex items-center justify-center mx-auto">
                                                <Smartphone size={24} className="text-[#ebdcd0]" />
                                            </div>
                                            <p className="text-sm text-[#8a7a6c] font-medium tracking-widest">カートが空です</p>
                                        </div>
                                    )}
                                </div>

                                {/* お会計明細 */}
                                <div className="space-y-5 pt-8 border-t border-[#d8c8b6] mb-12">
                                    <div className="flex justify-between text-sm text-[#6e5e54] font-medium tracking-widest">
                                        <span>商品小計</span>
                                        <span>¥{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-[#6e5e54] font-medium tracking-widest">
                                        <span>配送手数料</span>
                                        <span>¥{shippingFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-6 border-t border-[#d8c8b6]/30">
                                        <span className="text-lg font-bold tracking-[0.2em]">お支払い合計</span>
                                        <div className="text-right">
                                            <span className="text-[10px] block text-[#8a7a6c] font-bold mb-1">税込価格</span>
                                            <span className="text-4xl font-bold text-[#2B5740] tracking-tighter">
                                                <span className="text-xl mr-1 font-serif">¥</span>
                                                {totalAmount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 決済ボタン（KOMOJU等の統合決済をイメージ） */}
                                <div className="space-y-6">
                                    <button
                                        onClick={step === 'input' ? handleGoToConfirm : handlePlaceOrder}
                                        disabled={isProcessing || items.length === 0}
                                        className={`w-full py-6 rounded-[2rem] text-xl font-black tracking-[0.25em] shadow-2xl transition-all duration-500 flex items-center justify-center gap-4 group
                                            ${isProcessing 
                                                ? 'bg-[#a38f7d] text-white cursor-not-allowed opacity-80' 
                                                : 'bg-[#4a3f35] text-white hover:bg-[#322a23] active:scale-[0.97] cursor-pointer'
                                            }`}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                                    className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full"
                                                />
                                                <span>処理中</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{step === 'input' ? '入力内容を確認する' : '注文を確定する'}</span>
                                                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                    
                                    <div className="flex flex-col items-center gap-4 pt-4">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-[#ebdcd0]">
                                            <ShieldCheck size={14} className="text-[#2B5740]" />
                                            <span className="text-[10px] font-bold tracking-widest text-[#2B5740]">セキュア決済システム保護済み</span>
                                        </div>
                                        <p className="text-[9px] text-[#8a7a6c] text-center leading-loose tracking-widest font-medium uppercase">
                                            小樽で百年。<br />
                                            花の山城屋（創業1920年）
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}