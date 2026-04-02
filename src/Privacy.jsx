import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full washi-pattern text-[#4a3f35]">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-[1.25rem] md:text-[1.7rem] font-black tracking-[0.18em]">
            個人情報保護に関する基本方針
          </h1>
          <Link
            to="/"
            className="text-sm md:text-base font-bold tracking-widest text-[#6e5e54] hover:text-[#3E2723] transition-colors"
          >
            トップへ戻る
          </Link>
        </div>

        <p className="mt-6 md:mt-8 text-[0.95rem] md:text-[1.05rem] leading-relaxed tracking-widest text-[#6e5e54]">
          当ショップは個人情報の重要性を認識し、その保護を徹底するために、個人情報保護方針を制定、実施してまいります。
        </p>

        <div className="mt-8 md:mt-10 space-y-10">
          <section className="bg-[#fdfbf6]/85 backdrop-blur-md border border-[#ebdcd0] rounded-3xl soft-shadow overflow-hidden">
            <div className="px-6 md:px-10 py-8 md:py-10">
              <h2 className="text-[1.05rem] md:text-[1.25rem] font-bold tracking-[0.22em] pb-4 border-b border-[#ebdcd0]">
                ■基本方針について
              </h2>

              <ul className="mt-6 space-y-3 text-[0.95rem] md:text-[1.05rem] leading-relaxed tracking-widest">
                <li>個人情報の収集、利用にあたっては、その目的を明確に定め、業務に必要な範囲で取り扱います。</li>
                <li>個人情報の管理にあたっては、外部への流出防止に努め、外部からの不正アクセス、個人情報の紛失、破壊、改ざん、漏えいなどの危険に対し、適切かつ合理的な安全対策を講じます。</li>
                <li>個人情報は、法令に基づき司法機関、行政機関より法的義務を伴う要請を受けた場合を除き、お客様ご自身の同意なしに第三者に開示・提供はいたしません。</li>
                <li>個人情報は業務上必要がなくなったと判断した場合、消去する場合があります。</li>
                <li>個人情報に関する法令およびその他の規範を遵守します。</li>
              </ul>
            </div>
          </section>

          <section className="bg-[#fdfbf6]/85 backdrop-blur-md border border-[#ebdcd0] rounded-3xl soft-shadow overflow-hidden">
            <div className="px-6 md:px-10 py-8 md:py-10">
              <h2 className="text-[1.05rem] md:text-[1.25rem] font-bold tracking-[0.22em] pb-4 border-b border-[#ebdcd0]">
                ■本サイトにおける個人情報の取り扱いについて
              </h2>

              <div className="mt-6 space-y-7 text-[0.95rem] md:text-[1.05rem] leading-relaxed tracking-widest">
                <div>
                  <div className="font-bold text-[#4a3f35]">・個人情報の収集について</div>
                  <p className="mt-2 text-[#6e5e54]">本サイトを利用して商品の注文、会員登録、プレゼント応募、メルマガ購読、お問い合せ、アンケートをご利用いただく際に、個人情報を収集いたします。</p>
                </div>

                <div>
                  <div className="font-bold text-[#4a3f35]">・個人情報を収集する目的について</div>
                  <p className="mt-2 text-[#6e5e54]">注文商品の発送、代金の回収のため。お客様が個人情報の利用および目的を同意の上提供された場合、お客様に有益なサービスを電子メール、郵便により送信もしくは送付、またはお電話などでご案内させていただくため。プレゼントの抽選、発送のため。メールマガジンの配信のため。お問い合わせにお答えするため。</p>
                </div>

                <div>
                  <div className="font-bold text-[#4a3f35]">・個人情報の保護・管理について</div>
                  <p className="mt-2 text-[#6e5e54]">本サイトを利用して商品の注文、会員登録、プレゼント応募、メルマガ購読、お買い物アンケートをご利用いただく際に収集した個人情報は紛失、破壊、改ざん及び漏洩などのリスクに対しての施策を講じるとともに、当ショップの従業員に対し、安全な管理や関連法令に準じた適切な取扱いを徹底して参ります。</p>
                </div>

                <div>
                  <div className="font-bold text-[#4a3f35]">・個人情報に関するお客様からのお問い合わせなどについて</div>
                  <p className="mt-2 text-[#6e5e54]">お客様からお客様自身の個人情報について、次の要請を受けた場合は、問い合せに対応するため窓口を設置します。（開示 / 修正・削除 / 利用について同意した一部、または全部の撤回）。※個人情報に関するお問い合わせを希望される場合は、本人確認の為、住民票の写し又は運転免許証の写しと、開示の場合には手数料として750円の定額小為替を同封していただきますので、あらかじめご了承ください。</p>
                </div>

                <div>
                  <div className="font-bold text-[#4a3f35]">・個人情報の開示について</div>
                  <p className="mt-2 text-[#6e5e54]">次の項目に該当する場合、お客様の個人情報を開示する場合があります。お客様が他のお客様、弊社の権利、利益、名誉などを損ねるような行為をしたことが判明した場合、お客様の個人情報をその当事者、警察、関連機関に通知することがあります。警察等関連機関、その他行政機関などより、お客様の個人情報についての開示要請があった場合、これを開示することがあります。</p>
                </div>

                <div>
                  <div className="font-bold text-[#4a3f35]">・Cookie情報の使用について</div>
                  <p className="mt-2 text-[#6e5e54]">当ショップでは本サイトを閲覧された時など、お客様により良いサービスを提供するために、ご使用デバイスを識別するCookie情報を記録する事がありますが、これにより個人を特定できる情報の収集を行えるものではございません。 ご使用になるブラウザの設定によって、本サイトから送付されるクッキー情報の受取を拒否する事ができます。その場合、本サイトの一部サービスが正常に動作しない可能性があります。</p>
                </div>

                <div>
                  <div className="font-bold text-[#4a3f35]">・アクセスログの取得について</div>
                  <p className="mt-2 text-[#6e5e54]">当ショップでは、本サイトのアクセスログを取得しています。 アクセスログは、アクセスされた方のIPアドレス、ホスト名、ご利用のブラウザやOSの種類、アクセス日時などの情報が含まれますが、個人を特定できる情報を含むものではありません。 アクセスログは、今後のサイトの利便性向上や、万一問題が発生した際の原因追及、利用状況に関する統計・分析処理などに使用するために採取しており、それ以外の目的には使用いたしません。</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#fdfbf6]/85 backdrop-blur-md border border-[#ebdcd0] rounded-3xl soft-shadow overflow-hidden">
            <div className="px-6 md:px-10 py-8 md:py-10">
              <h2 className="text-[1.05rem] md:text-[1.25rem] font-bold tracking-[0.22em] pb-4 border-b border-[#ebdcd0]">
                ■お問い合わせ先について
              </h2>

              <div className="mt-6 space-y-2 text-[0.95rem] md:text-[1.05rem] leading-relaxed tracking-widest text-[#6e5e54]">
                <div>有限会社 山城屋生花店</div>
                <div>代表: 山城栄太郎</div>
                <div>
                  Tel:{' '}
                  <a className="hover:underline" href="tel:0134-23-1187">0134-23-1187</a>
                </div>
                <div>
                  E-mail:{' '}
                  <a className="hover:underline" href="mailto:yamashiroya1187@gmail.com">yamashiroya1187@gmail.com</a>
                </div>
              </div>

              <div className="mt-8 text-[0.9rem] md:text-[0.95rem] tracking-widest text-[#8a7a6c]">
                制定：2020/01/31
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
