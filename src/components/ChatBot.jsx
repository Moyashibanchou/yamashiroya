import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flower2, Send, X } from 'lucide-react';

const INITIAL_OPTIONS = [
  '記念日の贈り物を相談したい 🎁',
  '5000円以内でおすすめは？ 💐',
  '小樽の店舗について聞きたい 🏠',
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(true);
  const navigate = useNavigate();

  const greeting = useMemo(
    () => '山城屋へようこそ！今日はどのようなお花をお探しですか？',
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    setSelectedOption('');
    setInput('');
    setMessages([{ role: 'bot', text: greeting }]);
    setIsQuickMenuOpen(true);
  }, [isOpen]);

  const handleOption = (label) => {
    setSelectedOption(label);

    if (label.includes('記念日')) {
      navigate('/products?purpose=celebration,birthday');
      setIsOpen(false);
      return;
    }

    if (label.includes('5000')) {
      navigate('/products?price=0_3000,3000_5000');
      setIsOpen(false);
      return;
    }

    if (label.includes('店舗')) {
      navigate('/about#access');
      setIsOpen(false);
    }
  };

  const buildReply = (text) => {
    const t = String(text || '').trim();
    const lower = t.toLowerCase();

    if (!t) return '';

    if (
      t.includes('小樽') ||
      t.includes('店舗') ||
      t.includes('場所') ||
      t.includes('アクセス') ||
      t.includes('行き方')
    ) {
      return '小樽の店舗・アクセスは「アクセス」ページからご案内できます。右上のメニューの「アクセス」からも移動できます。';
    }

    if (t.includes('配送') || t.includes('配達') || t.includes('届け') || t.includes('送')) {
      return '配達は小樽市内のみ対応しています。用途やご予算を教えていただければ、ぴったりのご提案をします。';
    }

    if (
      t.includes('営業時間') ||
      t.includes('何時') ||
      t.includes('何時まで') ||
      t.includes('定休日')
    ) {
      return '営業時間は 9:00〜18:00、定休日は元日（1/1）です。';
    }

    if (
      t.includes('5000') ||
      t.includes('5,000') ||
      t.includes('五千') ||
      t.includes('予算') ||
      t.includes('円')
    ) {
      return 'ご予算に合わせてご提案できます。よければ「ご用途（誕生日/記念日/お祝い/お供え）」と「色のイメージ」を教えてください。';
    }

    if (lower.includes('thank') || t.includes('ありがとう') || t.includes('助かる')) {
      return 'こちらこそありがとうございます。用途とご予算が決まっていれば、すぐおすすめをご案内できます。';
    }

    return 'ありがとうございます。ご用途（誕生日/記念日/お祝い/お供え）と、ご予算、色のイメージ（赤/ピンク/白など）を教えてください。';
  };

  const handleSend = () => {
    const t = input.trim();
    if (!t) return;

    setMessages((prev) => {
      const next = [...prev, { role: 'user', text: t }];
      const reply = buildReply(t);
      if (reply) next.push({ role: 'bot', text: reply });
      return next;
    });

    setInput('');
    setIsQuickMenuOpen(false);
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[80]">
      {isOpen && (
        <div className="mb-4 w-[350px] max-w-[calc(100vw-2rem)] max-h-[70vh] bg-[#fff8f4] border border-[#ebdcd0] rounded-2xl shadow-[0_18px_48px_rgba(18,63,42,0.18)] overflow-hidden flex flex-col">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#123F2A] text-white">
            <div className="flex items-center gap-2 min-w-0">
              <Flower2 className="w-5 h-5 shrink-0" strokeWidth={2.2} />
              <div className="font-bold tracking-widest text-[0.95rem] truncate">山城屋チャット</div>
            </div>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-white/15 active:scale-95 transition-transform"
              aria-label="閉じる"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" strokeWidth={2.2} />
            </button>
          </div>

          <div className="px-4 py-3 flex-1 overflow-y-auto">
            <div className="space-y-3 pr-1">
              {messages.map((m, idx) => (
                <div
                  key={`${m.role}_${idx}`}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-4 py-3 leading-relaxed tracking-wide border ${
                      m.role === 'user'
                        ? 'bg-[#123F2A] text-white border-[#123F2A]'
                        : 'bg-white/85 text-[#4a3f35] border-[#ebdcd0]'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 border-t border-[#ebdcd0] bg-[#fff8f4] shrink-0">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsQuickMenuOpen((v) => !v)}
                className="text-[0.85rem] font-bold tracking-widest text-[#4a3f35] hover:opacity-90 transition-opacity"
              >
                クイックメニュー
              </button>
              <button
                type="button"
                onClick={() => setIsQuickMenuOpen(false)}
                className="text-[0.8rem] font-bold tracking-widest text-[#6e5e54] hover:opacity-90 transition-opacity"
                aria-label="クイックメニューを閉じる"
              >
                ×
              </button>
            </div>

            {isQuickMenuOpen && (
              <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                {INITIAL_OPTIONS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleOption(label)}
                    className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-full border transition-colors text-[0.85rem] font-bold tracking-wide ${
                      selectedOption === label
                        ? 'bg-[#123F2A] text-white border-[#123F2A]'
                        : 'bg-white border-[#ebdcd0] text-[#4a3f35] hover:bg-[#f7f2e7]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            <div className={`${isQuickMenuOpen ? 'mt-2' : 'mt-2'} flex items-center gap-2`}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                type="text"
                placeholder="メッセージを入力…"
                className="flex-1 bg-white border border-[#ebdcd0] rounded-full px-4 py-2.5 text-[0.95rem] tracking-wide outline-none focus:border-[#123F2A]"
              />
              <button
                type="button"
                onClick={handleSend}
                className="w-10 h-10 rounded-full bg-[#123F2A] text-white flex items-center justify-center shadow-md hover:opacity-95 active:scale-95 transition-transform"
                aria-label="送信"
              >
                <Send className="w-5 h-5" strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        className="w-16 h-16 md:w-14 md:h-14 rounded-full bg-[#123F2A] text-white shadow-[0_14px_40px_rgba(18,63,42,0.35)] hover:shadow-[0_18px_52px_rgba(18,63,42,0.45)] active:scale-95 transition-transform flex items-center justify-center"
        aria-label="チャットを開く"
        onClick={() => setIsOpen((v) => !v)}
      >
        <Flower2 className="w-8 h-8 md:w-7 md:h-7" strokeWidth={2.2} />
      </button>
    </div>
  );
}
