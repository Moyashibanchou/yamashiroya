import React from 'react';
import { motion } from 'framer-motion';

const historyItems = [
    {
        year: '1876年',
        era: '明治9年',
        imageUrl: '/otaru6.jpg',
        yamashiroya: '10月14日 山城屋初代・山城榮作、富山県東砺波郡井波町井波にて出生。',
        world: '明治13年 小樽－札幌間鉄道開通'
    },
    {
        year: '1902年',
        era: '明治35年',
        yamashiroya: '明治35年6月〜38年5月 山城榮作小樽に入植。植木職人として働き始める。',
        world: '明治37年2月10日 日露戦争始まる / 明治37年10月8日 小樽－函館鉄道開通'
    },
    {
        year: '1908年',
        era: '明治41年',
        yamashiroya: '12月10日 小樽区開運町畑1番地にて山城榮作・やのの四男として山城屋2代目・繁雄誕生。',
        world: '明治42年8月22日 韓国併合'
    },
    {
        year: '1913年',
        era: '大正2年',
        yamashiroya: '8月7日 東京市本所区 厩橋にて渡辺澄子誕生。（後の2代目繁雄の妻）',
        world: '大正2年5月小樽大火 / 大正2年6月小樽最初の映画館「公演館」開設。小樽人口10万人 / 大正3年8月第一次世界大戦 / 大正3年9月小樽上水道工事完成 / 大正8年6月ベルサイユ条約調印 / 大正8年9月小樽港湾労働者スト'
    },
    {
        year: '1920年',
        era: '大正9年頃',
        yamashiroya: '山城榮作がこの頃より松ヶ枝町の農家で切り出した花を、繁華街である花園公園通りにてリヤカーで夜店として売り始める。花屋としての創業。',
        world: '大正11年8月1日 小樽市市制施行'
    },
    {
        year: '1923年',
        era: '大正12年',
        imageUrl: '/otaru13.png',
        yamashiroya: '9月1日 関東大震災発生。この地震で被災した渡辺澄子が小樽に疎開。後の三浦澄子（2代目繁雄の妻）',
        world: '昭和5年 小樽人口14万5千人 / 昭和6年 満州事変'
    },
    {
        year: '1932〜1934年',
        era: '昭和7～9年',
        imageUrl: '/otaru14.png',
        yamashiroya: '花園公園通りで山城、三浦別々にやっていた夜店のリヤカーの花屋。澄子の器量もあり、三浦のほうが売れていたらしい。その後繁雄と澄子が仲良くなり、リヤカーが一つになったという。',
        world: '昭和10年 小樽人口15万4千人 / 昭和11年 226事件'
    },
    {
        year: '1938年',
        era: '昭和13年',
        imageUrl: '/otaru15.png',
        yamashiroya: '8月5日 山城繁雄・澄子長男・重信（山城屋3代目）誕生。同日繁雄・澄子婚姻届提出。',
        world: '昭和14年9月 第二次世界大戦勃発 / 昭和14年12月8日 太平洋戦争勃発'
    },
    {
        year: '1945年',
        era: '昭和20年',
        imageUrl: '/otaru9.jpg',
        yamashiroya: '3月7日 小樽市花園町西3丁目19番地にて初代・山城榮作 逝去。',
        world: '昭和21年11月 ソ連からの引き揚げ船小樽に続々到着'
    },
    {
        year: '1953年',
        era: '昭和28年',
        imageUrl: '/otaru16.png',
        yamashiroya: '5月11日 （有）山城屋生花店 会社設立 資本金10万円',
        world: 'JFTD（現 花キューピット）創立'
    },
    {
        year: '1960年',
        era: '昭和35年',
        yamashiroya: '早稲田大学卒業後3代目重信帰樽・山城屋入社',
        world: '昭和35年 北海道生花商組合連合会（現 道花連）発足 / 昭和39年 東京オリンピック'
    },
    {
        year: '1965年',
        era: '昭和40年',
        imageUrl: '/otaru17.png',
        yamashiroya: 'JFTD（現 花キューピット）入会。',
        world: ''
    },
    {
        year: '1966年',
        era: '昭和41年',
        imageUrl: '/otaru18.png',
        yamashiroya: '8月22日 重信・由岐、小樽商工会館にて結婚。',
        world: ''
    },
    {
        year: '1967年',
        era: '昭和42年',
        imageUrl: '/otaru19.png',
        yamashiroya: '4月26日 重信・由岐長男4代目山城栄太郎誕生。',
        world: ''
    },
    {
        year: '1968年',
        era: '昭和43年',
        imageUrl: '/otaru4.jpg',
        yamashiroya: '山城俊秘（現 専務取締役）入社。グリーンロード沿い車庫購入。',
        world: '第9回北海道生花商組合連合会を小樽市で開催 / 昭和50年9月25日 株式会社小樽花卉園芸市場設立'
    },
    {
        year: '1976年',
        era: '昭和51年',
        yamashiroya: '4月 小樽駅前にサンポート支店出店',
        world: '昭和53年8月 第19回北海道生花商協同組合大会を小樽市で開催'
    },
    {
        year: '1977年',
        era: '昭和52年頃',
        imageUrl: '/otaru11.jpg',
        yamashiroya: '国道拡幅によりグリーンロード車庫、花園公園通り本店ほぼ同時に新築。',
        world: ''
    },
    {
        year: '1982年',
        era: '昭和57年',
        yamashiroya: '6月28日 代表取締役、山城繁雄より3代目重信が継承。',
        world: ''
    },
    {
        year: '1985年',
        era: '昭和60年',
        yamashiroya: '6月28日 坂田行次朗監査役就任。澄子取締役就任。',
        world: ''
    },
    {
        year: '1986年',
        era: '昭和61年',
        yamashiroya: '栄太郎 上京青山学院大進学',
        world: ''
    },
    {
        year: '1990年',
        era: '平成2年',
        yamashiroya: '栄太郎 学習研究社入社。10年勤務',
        world: '平成3年バブル崩壊'
    },
    {
        year: '1992年',
        era: '平成4年',
        yamashiroya: '7月2日 2代目山城繁雄 逝去。',
        world: ''
    },
    {
        year: '1993年',
        era: '平成5年',
        yamashiroya: '3月20日 朝里ホクレンショップにテナント入居。',
        world: '平成9年 拓銀破たん / 第38回 道花連小樽大会開催'
    },
    {
        year: '2001年',
        era: '平成13年',
        yamashiroya: '4月 東京より山城栄太郎帰郷。山城屋入社。',
        world: '911テロ'
    },
    {
        year: '2005年',
        era: '平成17年',
        yamashiroya: '11月 朝里ホクレン店移転リニューアル 平成17年11月18日～平成20年9月30日迄サンモールネオ店営業。その後閉鎖',
        world: '平成20年 リーマンショック'
    },
    {
        year: '2010年',
        era: '平成22年',
        imageUrl: '/otaru8.jpg',
        yamashiroya: '9月 4代目山城栄太郎 代表取締役就任。',
        world: '平成23年 3月11日 東日本大震災'
    },
    {
        year: '2019年',
        era: '令和元年',
        yamashiroya: '9月末 サンポート店閉店。本店・朝里店の2店舗体制に。',
        world: ''
    },
    {
        year: '2020年',
        era: '令和2年',
        yamashiroya: '本店 店舗改装。',
        world: '新型コロナウィルス危機'
    }
];

function toEvents(text) {
    return String(text || '')
        .split(' / ')
        .map((s) => s.trim())
        .filter(Boolean);
}

export function HistoryTimeline() {
    return (
        <div className="max-w-6xl mx-auto px-5 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="text-center"
            >
                <h2 className="font-hand text-2xl md:text-4xl font-bold tracking-[0.25em] text-[#4a3f35]">山城屋の歴史</h2>
                <p className="mt-4 text-[0.95rem] md:text-[1.05rem] text-[#6e5e54] leading-[2.2] md:leading-[2.4] tracking-widest max-w-3xl mx-auto">
                    花園の夜店から、まちの花屋として。山城屋の歩みと、時代のうねりを並べて振り返ります。
                </p>
            </motion.div>

            <div className="mt-12 md:mt-16 relative">
                {/* Mobile: simple left-line stacked timeline */}
                <div className="md:hidden">
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-[#ebdcd0]" />

                    <div className="space-y-10">
                        {historyItems.map((item, idx) => {
                            const yEvents = toEvents(item.yamashiroya);
                            const wEvents = toEvents(item.world);

                            return (
                                <motion.div
                                    key={`${item.year}-${item.era}-${idx}`}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                    className="relative"
                                >
                                    <div className="absolute left-3 top-2.5 w-2.5 h-2.5 rounded-full bg-[#bc8a7e] shadow-sm ring-4 ring-[#fdfbf6]" />

                                    <div className="pl-10">
                                        <div className="w-full max-w-3xl bg-[#fdfbf6]/80 backdrop-blur-md border border-[#ebdcd0]/70 rounded-2xl shadow-sm overflow-hidden">
                                            <div className="px-5 py-5">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="min-w-0">
                                                        {item.era && (
                                                            <div className="text-[0.75rem] tracking-[0.28em] text-[#a38f7d] font-bold">
                                                                {item.era}
                                                            </div>
                                                        )}
                                                        <div className={(item.era ? 'mt-1 ' : '') + 'text-lg font-bold tracking-[0.22em] text-[#2f2721]'}>
                                                            {item.year}
                                                        </div>
                                                    </div>
                                                    {item.imageUrl && (
                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.year}
                                                            className="w-32 h-32 object-cover rounded-md flex-shrink-0"
                                                        />
                                                    )}
                                                </div>

                                                <div className="mt-4 space-y-3 text-[0.92rem] leading-[2.05] text-[#4a3f35]">
                                                    {yEvents.map((e, i) => (
                                                        <p key={i} className="tracking-widest">{e}</p>
                                                    ))}
                                                </div>

                                                {wEvents.length > 0 && (
                                                    <div className="mt-5 pt-4 border-t border-[#ebdcd0]/60">
                                                        <div className="text-[0.8rem] font-bold tracking-[0.25em] text-[#6e5e54]">世の中</div>
                                                        <div className="mt-2 space-y-2 text-[0.9rem] leading-[2.0] text-[#6e5e54]">
                                                            {wEvents.map((e, i) => (
                                                                <p key={i} className="tracking-widest">{e}</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Desktop: roadmap zigzag with S-curve connectors (no center line) */}
                <div className="hidden md:block">
                    <div className="space-y-12">
                        {historyItems.map((item, idx) => {
                            const isLeft = idx % 2 === 0;
                            const yEvents = toEvents(item.yamashiroya);
                            const wEvents = toEvents(item.world);
                            const isLast = idx === historyItems.length - 1;

                            return (
                                <motion.div
                                    key={`${item.year}-${item.era}-${idx}`}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                    className="relative"
                                >
                                    <div className="md:grid md:grid-cols-2 md:gap-16">
                                        <div className={isLeft ? 'md:col-start-1 md:pr-6' : 'md:col-start-2 md:pl-6'}>
                                            <div className={(isLeft ? '' : 'ml-auto ') + 'relative w-full max-w-3xl bg-[#fdfbf6]/80 backdrop-blur-md border border-[#ebdcd0]/70 rounded-2xl shadow-sm overflow-hidden'}>
                                                <div className={isLeft ? 'absolute -right-3 top-10' : 'absolute -left-3 top-10'}>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#d6b38a] ring-4 ring-[#fdfbf6] shadow-sm" />
                                                </div>

                                                <div className="px-6 py-6">
                                                    <div className="flex items-start justify-between gap-6">
                                                        <div className="min-w-0">
                                                            {item.era && (
                                                                <div className="text-[0.8rem] tracking-[0.28em] text-[#a38f7d] font-bold">
                                                                    {item.era}
                                                                </div>
                                                            )}
                                                            <div className={(item.era ? 'mt-1 ' : '') + 'text-xl font-bold tracking-[0.22em] text-[#2f2721]'}>
                                                                {item.year}
                                                            </div>
                                                        </div>
                                                        {item.imageUrl && (
                                                            <img
                                                                src={item.imageUrl}
                                                                alt={item.year}
                                                                className="w-32 h-32 object-cover rounded-md flex-shrink-0"
                                                            />
                                                        )}
                                                    </div>

                                                    <div className="mt-4 space-y-3 text-[0.98rem] leading-[2.05] text-[#4a3f35]">
                                                        {yEvents.map((e, i) => (
                                                            <p key={i} className="tracking-widest">{e}</p>
                                                        ))}
                                                    </div>

                                                    {wEvents.length > 0 && (
                                                        <div className="mt-5 pt-4 border-t border-[#ebdcd0]/60">
                                                            <div className="text-[0.85rem] font-bold tracking-[0.25em] text-[#6e5e54]">世の中</div>
                                                            <div className="mt-2 space-y-2 text-[0.95rem] leading-[2.0] text-[#6e5e54]">
                                                                {wEvents.map((e, i) => (
                                                                    <p key={i} className="tracking-widest">{e}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={isLeft ? 'md:col-start-2' : 'md:col-start-1'}>
                                            <div className="h-full" />
                                        </div>

                                        {!isLast && (
                                            <div className="md:col-span-2 relative h-28">
                                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                    {isLeft ? (
                                                        <>
                                                            <path d="M35,10 C55,10 45,90 65,90" fill="none" stroke="#d6b38a" strokeWidth="2.5" strokeLinecap="round" />
                                                            <circle cx="35" cy="10" r="3" fill="#d6b38a" />
                                                            <circle cx="65" cy="90" r="3" fill="#d6b38a" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <path d="M65,10 C45,10 55,90 35,90" fill="none" stroke="#d6b38a" strokeWidth="2.5" strokeLinecap="round" />
                                                            <circle cx="65" cy="10" r="3" fill="#d6b38a" />
                                                            <circle cx="35" cy="90" r="3" fill="#d6b38a" />
                                                        </>
                                                    )}
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function History() {
    return (
        <div className="w-full min-h-screen washi-pattern text-[#4a3f35] elegant-font">
            <div className="pt-10 md:pt-14 pb-20">
                <HistoryTimeline />
            </div>
        </div>
    );
}
