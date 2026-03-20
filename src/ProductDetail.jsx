import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ShoppingCart } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext.jsx';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, cartCount } = useCart();

    const [activePurpose, setActivePurpose] = useState('お祝い');
    const [message, setMessage] = useState('');

    const currentProduct = {
        id: id || 1,
        name: '季節のお祝いアレンジメント（華やか）',
        price: 5500,
        image: 'https://images.unsplash.com/photo-1543881524-76f578496417?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };

    const handleAddToCart = () => {
        addToCart(currentProduct);
        navigate('/cart');
    };

    return (
        <div className="w-full min-h-screen washi-pattern text-[#4a3f35] relative shadow-2xl elegant-font overflow-x-hidden md:pb-20">

            {/* 1. ヘッダー（固定） */}
            <header className="sticky top-0 z-50 bg-[#fdfbf6]/90 backdrop-blur-md border-b border-[#ebdcd0] soft-shadow-header">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-1.5 md:gap-2.5 text-[#6e5e54] font-bold text-sm md:text-base hover:text-[#3E2723] active:scale-95 transition-all w-[80px] md:w-[100px]">
                        <ArrowLeft className="w-[18px] md:w-[22px]" strokeWidth={2.5} />
                        戻る
                    </Link>
                    <h1 className="text-[1.1rem] md:text-[1.4rem] text-[#3E2723] brush-font font-bold absolute left-1/2 -translate-x-1/2 drop-shadow-sm">花の山城屋</h1>

                    <div className="w-[80px] md:w-[100px] flex justify-end">
                        <Link to="/cart" aria-label="Cart" className="relative active:scale-90 transition-transform text-[#4a3f35] hover:text-[#8e3a3a]">
                            <ShoppingCart className="w-[22px] md:w-[26px]" strokeWidth={2} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-2 bg-[#9e4646] text-[#fdfbf6] text-[0.6rem] md:text-[0.7rem] font-bold w-[1.1rem] md:w-[1.3rem] h-[1.1rem] md:h-[1.3rem] flex items-center justify-center rounded-full shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto md:px-6 md:py-16 md:flex md:gap-16 lg:gap-24 md:items-start">
                {/* 2. 商品画像＆基本情報（左側） */}
                <section className="md:w-1/2 md:sticky md:top-28">
                    <div className="w-full aspect-square bg-[#f5efe9] relative border-b md:border border-[#ebdcd0] md:rounded-3xl overflow-hidden shadow-lg">
                        <img
                            src={currentProduct.image}
                            alt={currentProduct.name}
                            className="w-full h-full object-cover mix-blend-multiply opacity-95 hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* モバイルでのみ画像下に表示するタイトルエリア（PCは右カラムのトップに置く） */}
                    <div className="px-6 pt-8 pb-4 md:hidden">
                        <h2 className="text-[1.3rem] font-bold text-[#4a3f35] leading-relaxed mb-4 tracking-widest">
                            季節のお祝いアレンジメント<br />（華やか）
                        </h2>
                        <div className="flex items-end gap-2">
                            <p className="text-2xl font-bold text-[#9e4646] tracking-widest">¥{currentProduct.price.toLocaleString()}</p>
                            <span className="text-sm font-bold text-[#8a7a6c] mb-1">税込</span>
                        </div>

                        <p className="text-[0.95rem] text-[#6e5e54] leading-loose mt-6 pb-6 border-b border-[#ebdcd0] text-justify font-medium">
                            市場から直接仕入れた新鮮な花材を使用し、贈る方・贈られる方の想いに寄り添って一つひとつ丁寧にお作りします。<br /><br />
                            <span className="text-[0.8rem] text-[#8a7a6c]">※写真はイメージです。季節や仕入れ状況により、花材が一部変更になる場合がございます。</span>
                        </p>
                    </div>
                </section>

                {/* 3. 商品の詳細と選択・ギフト専用オプションフォーム（右側） */}
                <section className="px-6 py-4 md:py-0 md:w-1/2 flex flex-col justify-between">

                    {/* PC用タイトルエリア */}
                    <div className="hidden md:block mb-10 pb-10 border-b border-[#ebdcd0]">
                        <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-[#4a3f35] leading-[1.6] mb-6 tracking-widest">
                            季節のお祝いアレンジメント<br />（華やか）
                        </h2>
                        <div className="flex items-end gap-2 mb-8">
                            <p className="text-3xl lg:text-4xl font-bold text-[#9e4646] tracking-widest outline-none border-none">¥{currentProduct.price.toLocaleString()}</p>
                            <span className="text-[1rem] font-bold text-[#8a7a6c] mb-1.5 ml-1">税込</span>
                        </div>
                        <p className="text-[1.05rem] text-[#6e5e54] leading-[2.2] text-justify font-medium">
                            市場から直接仕入れた新鮮な花材を使用し、贈る方・贈られる方の想いに寄り添って一つひとつ丁寧にお作りします。<br /><br />
                            <span className="text-[0.9rem] text-[#8a7a6c]">※写真はイメージです。季節や仕入れ状況により、花材が一部変更になる場合がございます。</span>
                        </p>
                    </div>

                    <div className="space-y-10 md:space-y-12">
                        <div>
                            <label className="block text-[0.85rem] md:text-[1rem] font-bold text-[#8a7a6c] mb-3 md:mb-4 tracking-widest border-l-[3px] border-[#bc8a7e] pl-3">お届け希望日</label>
                            <div className="relative">
                                <select className="w-full appearance-none bg-[#fdfbf6] border border-[#ebdcd0] md:border-[#d8c8b6] text-[#4a3f35] py-4 md:py-5 px-5 md:px-6 rounded-xl md:rounded-2xl font-bold text-[0.95rem] md:text-[1.05rem] focus:outline-none focus:border-[#a38f7d] shadow-[0_2px_8px_rgba(74,63,53,0.03)] cursor-pointer tracking-wider hover:bg-[#f5efe9] transition-colors">
                                    <option>指定なし（最短でお届け）</option>
                                    <option>3月22日（木）</option>
                                    <option>3月23日（金）</option>
                                    <option>3月24日（土）</option>
                                    <option>3月25日（日）</option>
                                </select>
                                <ChevronDown className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 text-[#8a7a6c] pointer-events-none w-5 h-5 md:w-6 md:h-6" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[0.85rem] md:text-[1rem] font-bold text-[#8a7a6c] mb-3 md:mb-4 tracking-widest border-l-[3px] border-[#bc8a7e] pl-3">ご用途</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                {['お祝い', 'お誕生日', 'お供え・お悔やみ', '開店・開業祝い', '送別・退職', 'その他（おまかせ）'].map(item => (
                                    <button
                                        key={item}
                                        onClick={() => setActivePurpose(item)}
                                        className={`py-3.5 md:py-4 px-2 rounded-xl md:rounded-2xl text-[0.85rem] md:text-[0.95rem] font-bold border transition-all duration-200 tracking-wider ${activePurpose === item
                                                ? 'bg-[#405342] text-[#fdfbf6] border-[#405342] shadow-[0_4px_12px_rgba(64,83,66,0.2)]'
                                                : 'bg-[#fdfbf6] text-[#6e5e54] border-[#d8c8b6] hover:bg-[#f5efe9]'
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pb-32 md:pb-0">
                            <div className="flex justify-between items-end mb-3 md:mb-4">
                                <label className="block text-[0.85rem] md:text-[1rem] font-bold text-[#8a7a6c] tracking-widest border-l-[3px] border-[#bc8a7e] pl-3">
                                    メッセージカード <span className="text-[#9e4646] text-[0.7rem] md:text-[0.8rem] ml-2 font-bold px-2 py-0.5 md:py-1 bg-[#f5efe9] rounded-md border border-[#ebdcd0]">無料</span>
                                </label>
                                <span className={`text-[0.75rem] md:text-[0.9rem] font-bold tracking-wider ${message.length === 50 ? 'text-[#9e4646]' : 'text-[#8a7a6c]'}`}>
                                    {message.length}/50
                                </span>
                            </div>
                            <textarea
                                maxLength={50}
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="大切な方へ、心を込めたメッセージを無料で添えられます。"
                                className="w-full bg-[#fdfbf6] border border-[#d8c8b6] text-[#4a3f35] py-4 md:py-5 px-5 md:px-6 rounded-xl md:rounded-2xl font-medium text-[0.95rem] md:text-[1.05rem] leading-[2] md:leading-[2.2] focus:outline-none focus:border-[#a38f7d] shadow-[0_2px_8px_rgba(74,63,53,0.03)] resize-none"
                            ></textarea>
                            <p className="text-[0.8rem] md:text-[0.9rem] text-[#8a7a6c] mt-3 md:mt-4 tracking-wider leading-relaxed">※ メッセージカードは無料で承ります。心を込めて代筆いたします。</p>
                        </div>

                        {/* PC用のCTAボタン（モバイルでは非表示） */}
                        <div className="hidden md:block mt-12 pt-8 border-t border-[#ebdcd0]">
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-5 lg:py-6 bg-[#8e3a3a] text-white rounded-2xl text-[1.2rem] lg:text-[1.3rem] font-bold shadow-[0_8px_32px_rgba(142,58,58,0.25)] hover:bg-[#7a3131] hover:shadow-[0_12px_40px_rgba(142,58,58,0.3)] active:scale-95 transition-all duration-300 tracking-[0.15em] border border-white/10"
                            >
                                カートに入れる
                            </button>
                        </div>

                    </div>
                </section>
            </div>

            {/* 4. モバイル用固定フッター（PCでは非表示） */}
            <div className="md:hidden fixed bottom-0 w-full bg-[#fdfbf6]/95 backdrop-blur-md border-t border-[#ebdcd0] px-5 py-5 soft-shadow-sm pb-[env(safe-area-inset-bottom,1.25rem)] z-50">
                <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-[#8e3a3a] text-white rounded-xl text-[1.1rem] font-bold shadow-[0_8px_24px_rgba(142,58,58,0.2)] hover:bg-[#7a3131] active:scale-95 transition-all duration-200 tracking-widest border border-white/10"
                >
                    カートに入れる
                </button>
            </div>

        </div>
    );
}
