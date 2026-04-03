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
                    zipcode: '',
                    prefectureCity: '',
                    addressLine: '',
                };
            }

            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object') {
                return {
                    name: '',
                    email: '',
                    phone: '',
                    zipcode: '',
                    prefectureCity: '',
                    addressLine: '',
                };
            }

            return {
                name: String(parsed.name || ''),
                email: String(parsed.email || ''),
                phone: String(parsed.phone || ''),
                zipcode: String(parsed.zipcode || ''),
                prefectureCity: String(parsed.prefectureCity || ''),
                addressLine: String(parsed.addressLine || ''),
            };
        } catch {
            return {
                name: '',
                email: '',
                phone: '',
                zipcode: '',
                prefectureCity: '',
                addressLine: '',
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

    // 送料（ダミー）
    const shippingFee = 1100;
    const totalAmount = cartTotal + (items.length > 0 ? shippingFee : 0);

    const emailIsValid = useMemo(() => {
        const v = String(form.email || '').trim();
        if (!v) return false;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }, [form.email]);

    const phoneIsValid = useMemo(() => {
        const v = String(form.phone || '').trim();
        if (!v) return false;
        if (/^\d{10,11}$/.test(v)) return true;
        return /^0\d{1,4}-\d{1,4}-\d{4}$/.test(v);
    }, [form.phone]);

    const zipcodeNormalized = useMemo(() => String(form.zipcode || '').replace(/-/g, ''), [form.zipcode]);

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
        }

        setErrors(next);
        return !next.email && !next.phone && !next.zipcode && !next.address;
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
    const handleConfirmOrder = async () => {
        if (!validateBeforeSubmit()) {
            return;
        }

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
            const response = await fetch(`${API_BASE_URL}/api/payments/create-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    amount: totalAmount,
                    paymentMethod: komojuPaymentType
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else {
                throw new Error('Checkout URL not found in response');
            }
        } catch (error) {
            console.error('Payment Error:', error);
            alert('決済処理に失敗しました。サーバーが起動しているか確認し、時間をおいて再度お試しください。');
            setIsProcessing(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-x-hidden pb-20 md:pb-32"
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
                        <section className="bg-white/30 p-8 md:p-10 rounded-[2.5rem] border border-[#ebdcd0] soft-shadow-header">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 bg-[#4a3f35] rounded-full flex items-center justify-center text-white">
                                    <User size={20} />
                                </div>
                                <h2 className="text-xl font-bold tracking-widest">お届け先 ＆ ご連絡先</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">お名前（姓名）</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                                        placeholder="例：山城 太郎"
                                        className="w-full bg-white/60 border border-[#d8c8b6] text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/20 focus:border-[#4a3f35] transition-all duration-300 placeholder:text-[#a38f7d]/40"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">メールアドレス</label>
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
                                        <p className="mt-2 text-xs font-bold tracking-widest text-red-600">{errors.email}</p>
                                    ) : null}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">電話番号</label>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => {
                                            const v = e.target.value;
                                            setForm((prev) => ({ ...prev, phone: v }));
                                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                                        }}
                                        placeholder="0134-00-0000 / 09012345678"
                                        className={`w-full bg-white/60 border ${errors.phone ? 'border-red-400' : 'border-[#d8c8b6]'} text-[#4a3f35] py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4a3f35]/20 focus:border-[#4a3f35] transition-all duration-300 placeholder:text-[#a38f7d]/40`}
                                    />
                                    {errors.phone ? (
                                        <p className="mt-2 text-xs font-bold tracking-widest text-red-600">{errors.phone}</p>
                                    ) : null}
                                </div>
                            </div>

                            <div className="space-y-8 pt-8 border-t border-[#ebdcd0]/50">
                                <div className="flex gap-4 items-end">
                                    <div className="w-full">
                                        <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">郵便番号</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={form.zipcode}
                                                onChange={(e) => {
                                                    const v = e.target.value;
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
                                            <p className="mt-2 text-xs font-bold tracking-widest text-red-600">{errors.zipcode}</p>
                                        ) : null}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={lookupAddressByZipcode}
                                        disabled={isLookingUpZip || isProcessing}
                                        className="bg-[#4a3f35] text-white px-8 py-4 rounded-2xl text-sm font-bold hover:bg-[#322a23] transition-all cursor-pointer whitespace-nowrap shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isLookingUpZip ? '検索中...' : '住所検索'}
                                    </button>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">都道府県・市区町村</label>
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
                                    <label className="block text-xs font-bold text-[#8a7a6c] mb-3 tracking-[0.2em] uppercase">番地・建物名</label>
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
                                        <p className="mt-2 text-xs font-bold tracking-widest text-red-600">{errors.address}</p>
                                    ) : null}
                                </div>
                            </div>
                        </section>

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
                                        onClick={handleConfirmOrder}
                                        disabled={isProcessing || items.length === 0}
                                        className={`w-full py-6 rounded-[2rem] text-lg font-bold tracking-[0.3em] shadow-2xl transition-all duration-500 flex items-center justify-center gap-4 group
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
                                                <span>注文を確定する</span>
                                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                    
                                    <div className="flex flex-col items-center gap-4 pt-4">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-[#ebdcd0]">
                                            <ShieldCheck size={14} className="text-[#2B5740]" />
                                            <span className="text-[10px] font-bold tracking-widest text-[#2B5740]">セキュア決済システム保護済み</span>
                                        </div>
                                        <p className="text-[9px] text-[#8a7a6c] text-center leading-loose tracking-widest font-medium uppercase">
                                            Trusted by customers for over 100 years. <br />
                                            Yamashiroya Otaru since 1920.
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