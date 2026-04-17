import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import logoImg from '../shoplogo.png';

export default function Footer() {
  return (
    <footer className="w-full bg-[#faf8f1] border-t border-[#ebdcd0] text-[#4a3f35]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-12">
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
