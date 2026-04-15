import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Search } from 'lucide-react';
import logoImg from '../shoplogo.png';

export default function Footer() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    navigate(`/products${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <footer className="w-full bg-[#faf8f1] border-t border-[#ebdcd0] text-[#4a3f35]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Link
              to="/"
              className="w-full py-4 rounded-full bg-white border border-[#ebdcd0] text-[#4a3f35] font-bold tracking-widest text-center hover:bg-[#f7f2e7] active:scale-95 transition-all"
            >
              トップ
            </Link>
            <Link
              to="/products"
              className="w-full py-4 rounded-full bg-[#123F2A] text-white font-bold tracking-widest text-center hover:opacity-95 active:scale-95 transition-all shadow-[0_10px_28px_rgba(18,63,42,0.18)]"
            >
              お花を探す
            </Link>
            <Link
              to="/about"
              className="w-full py-4 rounded-full bg-white border border-[#ebdcd0] text-[#4a3f35] font-bold tracking-widest text-center hover:bg-[#f7f2e7] active:scale-95 transition-all"
            >
              山城屋について
            </Link>
          </div>

          <form onSubmit={handleSearchSubmit} className="mt-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a38f7d]" strokeWidth={2.2} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="お花の名前や用途で検索（例：胡蝶蘭、誕生日）"
                className="w-full bg-white border border-[#ebdcd0] rounded-full py-4 pl-12 pr-24 text-[1rem] md:text-[1.05rem] tracking-widest outline-none focus:border-[#123F2A]"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4a3f35] text-white px-6 py-2.5 rounded-full text-sm md:text-base font-bold tracking-widest hover:bg-[#322a23] active:scale-95 transition-all"
              >
                検索
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 md:mt-12 border-t border-[#ebdcd0]/70" />

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-6 md:gap-10 items-start">
          <div className="flex items-start justify-center md:justify-start">
            <img src={logoImg} alt="花の山城屋 ロゴ" className="h-14 md:h-16 w-auto object-contain" />
          </div>

          <div className="min-w-0">
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[0.9rem] md:text-[0.95rem] tracking-widest font-medium">
              <Link to="/legal" className="hover:text-[#322a23] transition-colors">特定商取引法に基づく表記</Link>
              <Link to="/privacy" className="hover:text-[#322a23] transition-colors">個人情報保護方針</Link>
              <Link to="/legal#payment" className="hover:text-[#322a23] transition-colors">支払・配送</Link>
              <Link to="/legal#return" className="hover:text-[#322a23] transition-colors">返品特約</Link>
            </nav>
          </div>

          <div className="hidden md:block" />
        </div>

        <div className="mt-8 md:mt-10">
          <div id="footer-contact" className="max-w-xl mx-auto text-center space-y-3 text-[#6e5e54] tracking-widest">
            <div className="text-[0.85rem] md:text-[0.9rem] font-black tracking-[0.18em] text-[#4a3f35]">
              お問い合わせ窓口
            </div>
            <div className="text-[0.95rem] md:text-[1.0rem] leading-relaxed">
              〒047-0024 北海道小樽市花園4丁目4-2
            </div>
            <a
              href="tel:0134-23-1187"
              className="inline-flex items-center justify-center gap-2 text-red-700 font-black text-[1.35rem] md:text-[1.6rem] tracking-[0.08em] hover:opacity-90 transition-opacity"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6" />
              0134-23-1187
            </a>
            <div className="text-[0.95rem] md:text-[1.0rem] leading-relaxed">
              <a href="mailto:yamashiroya1187@gmail.com" className="text-red-700 hover:opacity-90 transition-opacity">
                メール：yamashiroya1187@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-7 text-center text-[0.9rem] md:text-[0.95rem] tracking-widest text-[#6e5e54] leading-relaxed">
            [定休日] 毎年 元日1月1日　[営業時間] 9:00〜18:00
          </div>
        </div>

        <div className="mt-10 md:mt-12 pt-6 border-t border-[#ebdcd0]/70 text-center">
          <div className="text-[0.82rem] md:text-[0.88rem] tracking-[0.18em] text-[#8a7a6c]">
            Copyright ©小樽 花の山城屋 All Rights Reserved.
          </div>
          <div className="mt-4">
            <Link
              to="/admin"
              onClick={() => window.scrollTo(0, 0)}
              className="text-[10px] text-[#a38f7d] hover:text-[#4a3f35] tracking-[0.2em] font-medium transition-colors"
            >
              管理者ログイン
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
 }
