import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Legal() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace('#', '');
    const el = document.getElementById(id);

    if (!el) return;

    const t = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);

    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <div className="w-full washi-pattern text-[#4a3f35]">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-[1.25rem] md:text-[1.7rem] font-black tracking-[0.18em]">
            会社情報・特定商取引法に基づく表示
          </h1>
          <Link
            to="/"
            className="text-sm md:text-base font-bold tracking-widest text-[#6e5e54] hover:text-[#3E2723] transition-colors"
          >
            トップへ戻る
          </Link>
        </div>

        <div className="mt-8 md:mt-10 space-y-10">
          <section className="bg-[#fdfbf6]/85 backdrop-blur-md border border-[#ebdcd0] rounded-3xl soft-shadow overflow-hidden">
            <div className="px-6 md:px-10 py-8 md:py-10">
              <h2 className="text-[1.05rem] md:text-[1.25rem] font-bold tracking-[0.22em] pb-4 border-b border-[#ebdcd0]">
                販売事業者情報
              </h2>

              <dl className="mt-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-y-4 md:gap-y-5">
                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">店舗名</dt>
                <dd className="tracking-widest leading-relaxed">小樽 花の山城屋</dd>

                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">店舗URL</dt>
                <dd className="tracking-widest leading-relaxed">
                  <a
                    href="https://yamashiroya.easy-myshop.jp/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    https://yamashiroya.easy-myshop.jp/
                  </a>
                </dd>

                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">販売事業者名</dt>
                <dd className="tracking-widest leading-relaxed">
                  有限会社 山城屋生花店 (ユウゲンガイシャヤマシロヤセイカテン)
                </dd>

                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">販売責任者</dt>
                <dd className="tracking-widest leading-relaxed">山城栄太郎 (ヤマシロエイタロウ)</dd>

                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">所在地</dt>
                <dd className="tracking-widest leading-relaxed">〒047-0024 北海道 小樽市花園4-4-2</dd>

                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">電話番号</dt>
                <dd className="tracking-widest leading-relaxed">
                  <a className="hover:underline" href="tel:0134-23-1187">0134-23-1187</a>
                </dd>

                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">メールアドレス</dt>
                <dd className="tracking-widest leading-relaxed">
                  <a className="hover:underline" href="mailto:yamashiroya1187@gmail.com">yamashiroya1187@gmail.com</a>
                </dd>
              </dl>
            </div>
          </section>

          <section className="bg-[#fdfbf6]/85 backdrop-blur-md border border-[#ebdcd0] rounded-3xl soft-shadow overflow-hidden">
            <div className="px-6 md:px-10 py-8 md:py-10">
              <h2 className="text-[1.05rem] md:text-[1.25rem] font-bold tracking-[0.22em] pb-4 border-b border-[#ebdcd0]">
                商品の販売について
              </h2>

              <dl className="mt-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-y-4 md:gap-y-5">
                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">販売数量・条件等</dt>
                <dd className="tracking-widest leading-relaxed">数量制限などはございません。</dd>

                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">お支払方法及び支払い時期</dt>
                <dd className="tracking-widest leading-relaxed">
                  支払方法および支払期限については「支払方法に関して」をご確認ください。
                </dd>

                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">商品代金以外の必要料金</dt>
                <dd className="tracking-widest leading-relaxed">
                  支払方法や配送方法によって、所定の手数料や送料が必要になる場合があります。「支払方法に関して」および「配送方法に関して」をご確認ください。
                </dd>

                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">申し込みの有効期限</dt>
                <dd className="tracking-widest leading-relaxed">
                  支払期限までにご入金の確認ができない場合は、キャンセルとさせていただきます。
                </dd>

                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">商品引渡し時期</dt>
                <dd className="tracking-widest leading-relaxed">
                  ご入金確認日から通常3営業日以内に発送いたします。「オーダー品」、「特注品」については2ヵ月以内の発送となります。※納期の厳守には細心の注意を払っておりますが、生産・在庫状況、交通状況、システムトラブル等、予期せぬ事故・都合により納期の変動が起こり得る場合もあります。それによりお客様または第3者に損害が発生したとしても当店は一切責任を負わないものとします。また、お客様の都合による納期の遅れにつきましても、これと同じものとします。予めご了承くださいませ。
                </dd>

                <dt className="text-[#8a7a6c] font-bold tracking-[0.2em] text-xs md:text-sm">不良品について</dt>
                <dd className="tracking-widest leading-relaxed">
                  不良品・破損品については責任を持ってお取り換え致します。条件などの詳細は「返品特約に関して」をご確認ください。
                </dd>
              </dl>
            </div>
          </section>

          <section id="payment" className="bg-[#fdfbf6]/85 backdrop-blur-md border border-[#ebdcd0] rounded-3xl soft-shadow overflow-hidden scroll-mt-24">
            <div className="px-6 md:px-10 py-8 md:py-10">
              <h2 className="text-[1.05rem] md:text-[1.25rem] font-bold tracking-[0.22em] pb-4 border-b border-[#ebdcd0]">
                支払方法に関して
              </h2>

              <div className="mt-6 space-y-6 tracking-widest leading-[2.1]">
                <div>
                  <div className="font-bold">&lt;お支払い方法の種類について&gt;</div>
                  <p className="mt-2">以下の支払方法をお選びいただけます。一部のご利用には制限事項があります。</p>
                </div>

                <div>
                  <div className="font-bold">■クレジットカード決済</div>
                  <p className="mt-2">お支払い方法は「一括払い」・「リボ払い」・「分割払い」からお選びできます。「セキュリティコード」の入力が必要となります。</p>
                </div>

                <div>
                  <div className="font-bold">■銀行振込</div>
                  <p className="mt-2">【振込先】北洋銀行 小樽中央支店 当座 1066331 ユウ）ヤマシロヤセイカテン</p>
                  <p className="mt-2">※振込手数料はお客様のご負担とさせていただきます。ご注文後、3日以内にお支払いを確認することができない場合は、キャンセルとさせていただきます。</p>
                </div>
              </div>
            </div>
          </section>

          <section id="delivery" className="bg-[#fdfbf6]/85 backdrop-blur-md border border-[#ebdcd0] rounded-3xl soft-shadow overflow-hidden scroll-mt-24">
            <div className="px-6 md:px-10 py-8 md:py-10">
              <h2 className="text-[1.05rem] md:text-[1.25rem] font-bold tracking-[0.22em] pb-4 border-b border-[#ebdcd0]">
                配送方法に関して
              </h2>

              <div className="mt-6 space-y-4 tracking-widest leading-[2.1]">
                <div>
                  <div className="font-bold">■小樽市内配達</div>
                  <p className="mt-2">通常、ご入金確認後翌々営業日以内、もしくはご指定の日時に配達いたします。本商品は小樽市内への配達に限定させていただいておりますので、配達料は無料です。</p>
                </div>
              </div>
            </div>
          </section>

          <section id="return" className="bg-[#fdfbf6]/85 backdrop-blur-md border border-[#ebdcd0] rounded-3xl soft-shadow overflow-hidden scroll-mt-24">
            <div className="px-6 md:px-10 py-8 md:py-10">
              <h2 className="text-[1.05rem] md:text-[1.25rem] font-bold tracking-[0.22em] pb-4 border-b border-[#ebdcd0]">
                返品特約に関して
              </h2>

              <div className="mt-6 space-y-6 tracking-widest leading-[2.1]">
                <div>
                  <div className="font-bold">■不良品・破損品・商品相違の交換について</div>
                  <p className="mt-2">商品到着後7日以内にメールにてお早めにご連絡ください。不良品・破損品・商品相違などの場合の送料は当社が負担します。</p>
                </div>

                <div>
                  <div className="font-bold">■お客様のご都合による返品・交換について</div>
                  <p className="mt-2">商品到着後7日以内にメールにてご連絡ください。商品返品時の送料・返金時の振り込み手数料はお客様のご負担となります。</p>
                </div>

                <div>
                  <div className="font-bold">■返品・交換できない商品について</div>
                  <p className="mt-2">ご使用になられた商品、お取り寄せ商品、商品本来の使用目的以外のご使用により生じた不具合によるもの。</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
