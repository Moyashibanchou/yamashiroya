import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertTriangle, ArrowDown, ArrowUp, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAdminInsights } from './adminInsights';

function formatYen(v) {
  return `¥${Number(v || 0).toLocaleString()}`;
}

function formatPct(v, digits = 1) {
  const n = Number(v || 0) * 100;
  return `${n.toFixed(digits)}%`;
}

function deltaPct(current, base) {
  const c = Number(current || 0);
  const b = Number(base || 0);
  if (!b) return null;
  return (c - b) / b;
}

function Trend({ value }) {
  if (value === null || value === undefined) return <span className="text-[#8a7a6c]">—</span>;
  const up = value >= 0;
  const color = up ? 'text-blue-700' : 'text-red-700';
  const Arrow = up ? ArrowUp : ArrowDown;
  return (
    <span className={`inline-flex items-center gap-1 font-black ${color}`}>
      <Arrow className="w-4 h-4" />
      {(Math.abs(value) * 100).toFixed(1)}%
    </span>
  );
}

function MetricCard({ title, currentText, prevDelta, targetDelta, note, alert }) {
  return (
    <div className="bg-white/55 border border-[#d8c8b6]/70 rounded-3xl p-6 soft-shadow-header">
      <div className="flex items-start justify-between gap-3">
        <div className="text-[0.85rem] font-black tracking-[0.18em] text-[#6e5e54]">{title}</div>
        {alert ? (
          <div className="inline-flex items-center gap-2 text-red-700 font-black text-[0.85rem] tracking-widest">
            <AlertTriangle className="w-4 h-4" />
            注意
          </div>
        ) : null}
      </div>
      <div className="mt-3 text-2xl md:text-3xl font-black tracking-widest text-[#1c2b3a]">
        {currentText}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2 text-[0.9rem] tracking-widest">
        <div className="flex items-center justify-between">
          <span className="text-[#8a7a6c] font-bold">前月比</span>
          <Trend value={prevDelta} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#8a7a6c] font-bold">目標比</span>
          <Trend value={targetDelta} />
        </div>
      </div>
      {note ? <div className="mt-4 text-[0.9rem] leading-relaxed tracking-wide text-[#4a3f35] font-medium">{note}</div> : null}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('yamashiroya_admin_logged_in') === 'true';
    if (!isLoggedIn) {
      window.scrollTo(0, 0);
      navigate('/admin-login');
      return;
    }

    let canceled = false;
    (async () => {
      setLoading(true);
      try {
        const next = await getAdminInsights();
        if (!canceled) {
          setData(next);
          setError('');
        }
      } catch (e) {
        if (!canceled) {
          setData(null);
          setError('データが取得できませんでした');
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
    };
  }, [navigate]);

  const computed = useMemo(() => {
    if (!data) return null;

    const o = data.outcome;
    const b = data.behavior;

    const revenuePrev = deltaPct(o.revenue.current, o.revenue.prev);
    const revenueTarget = deltaPct(o.revenue.current, o.revenue.target);

    const purchasesPrev = deltaPct(o.purchases.current, o.purchases.prev);
    const purchasesTarget = deltaPct(o.purchases.current, o.purchases.target);

    const prPrev = deltaPct(o.purchaseRate.current, o.purchaseRate.prev);
    const prTarget = deltaPct(o.purchaseRate.current, o.purchaseRate.target);

    const aovPrev = deltaPct(o.avgOrderValue.current, o.avgOrderValue.prev);
    const aovTarget = deltaPct(o.avgOrderValue.current, o.avgOrderValue.target);

    const funnel = Array.isArray(b.funnel) ? b.funnel : [];
    const funnelMax = funnel.length ? Math.max(...funnel.map((x) => x.count)) : 0;

    const formStartRate = funnelMax ? (b.form.starts || 0) / funnelMax : null;
    const formCompleteRate = b.form.starts ? (b.form.completes || 0) / b.form.starts : null;
    const formGap = b.form.starts ? (b.form.starts - (b.form.completes || 0)) : null;

    const shouldWarnForm =
      (formCompleteRate !== null && formCompleteRate < 0.75) ||
      (Number(b.form.errorCount || 0) >= 30);

    const shouldWarnAddress =
      Number(b.addressInput.otaruBlocked || 0) >= 10 ||
      (b.addressInput.starts ? (b.addressInput.otaruBlocked || 0) / b.addressInput.starts > 0.1 : false);

    const suggestions = [];
    if (shouldWarnForm) {
      suggestions.push(
        `入力フォームの完了率が低めです（開始${b.form.starts}件→完了${b.form.completes}件 / 完了率${formCompleteRate ? formatPct(formCompleteRate) : '—'}）。入力エラーや項目の分かりにくさが原因の可能性があります。`
      );
    } else {
      suggestions.push('入力フォームは比較的スムーズに完了されています。引き続き入力補助（自動整形など）を維持してください。');
    }

    if (shouldWarnAddress) {
      suggestions.push(
        `配送先入力で「小樽市外」の可能性があるブロックが目立ちます（${b.addressInput.otaruBlocked}件）。商品ページで「小樽市内限定」をさらに目立たせる、購入前に配送対象エリアの確認を入れる等が有効です。`
      );
    }

    return {
      revenuePrev,
      revenueTarget,
      purchasesPrev,
      purchasesTarget,
      prPrev,
      prTarget,
      aovPrev,
      aovTarget,
      funnel,
      formStartRate,
      formCompleteRate,
      formGap,
      shouldWarnForm,
      shouldWarnAddress,
      suggestions,
    };
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen washi-pattern text-[#4a3f35] elegant-font pb-20"
    >
      <div className="max-w-6xl mx-auto px-4 pt-10 md:pt-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-[#8a7a6c] hover:text-[#4a3f35] mb-4 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>商品管理へ戻る</span>
            </button>
            <h1 className="text-3xl md:text-4xl font-bold tracking-[0.2em] border-l-8 border-[#0055AA] pl-6">
              分析ダッシュボード
            </h1>
            <div className="mt-4 text-[0.95rem] tracking-widest text-[#6e5e54] font-bold">
              {data?.period?.monthLabel ? `対象：${data.period.monthLabel}` : '対象：—'}
            </div>
          </div>

          <div className="bg-white/50 border border-[#d8c8b6]/70 rounded-3xl px-6 py-5 soft-shadow-header">
            <div className="text-[0.85rem] font-black tracking-[0.18em] text-[#6e5e54]">インサイト（自動提案）</div>
            <div className="mt-2 text-[0.95rem] tracking-wide leading-relaxed text-[#1c2b3a] font-medium">
              管理者が「次に何を直すか」を判断しやすいように、気になる点を自動でまとめます。
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-[#fdfbf6]/70 border border-[#ebdcd0] rounded-2xl px-6 py-10 text-center text-[#8a7a6c] tracking-widest">
            読み込み中...
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-10 text-center text-red-700 tracking-widest font-bold">
            {error}
          </div>
        ) : !data || !computed ? (
          <div className="bg-[#fdfbf6]/70 border border-[#ebdcd0] rounded-2xl px-6 py-10 text-center text-[#8a7a6c] tracking-widest">
            データがありません。
          </div>
        ) : (
          <div className="space-y-12">
            <section>
              <div className="flex items-end justify-between gap-6 mb-6">
                <h2 className="text-xl md:text-2xl font-black tracking-[0.18em] text-[#1c2b3a]">
                  成果（売上・購入）
                </h2>
                <div className="text-[0.85rem] tracking-widest text-[#8a7a6c] font-bold">用語：購入率 = CVR、平均客単価 = AOV</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="売上高"
                  currentText={formatYen(data.outcome.revenue.current)}
                  prevDelta={computed.revenuePrev}
                  targetDelta={computed.revenueTarget}
                  note="売上の伸びが鈍い場合は、閲覧→カート投入の改善が効きやすいです。"
                />
                <MetricCard
                  title="購入数（購入件数）"
                  currentText={`${Number(data.outcome.purchases.current || 0).toLocaleString()}件`}
                  prevDelta={computed.purchasesPrev}
                  targetDelta={computed.purchasesTarget}
                />
                <MetricCard
                  title="購入率（購入率）"
                  currentText={formatPct(data.outcome.purchaseRate.current)}
                  prevDelta={computed.prPrev}
                  targetDelta={computed.prTarget}
                  alert={computed.shouldWarnForm}
                />
                <MetricCard
                  title="平均客単価"
                  currentText={formatYen(data.outcome.avgOrderValue.current)}
                  prevDelta={computed.aovPrev}
                  targetDelta={computed.aovTarget}
                />
              </div>
            </section>

            <section>
              <div className="flex items-end justify-between gap-6 mb-6">
                <h2 className="text-xl md:text-2xl font-black tracking-[0.18em] text-[#1c2b3a]">
                  行動（ファネル）
                </h2>
                <div className="text-[0.85rem] tracking-widest text-[#8a7a6c] font-bold">商品閲覧 → カート → 配送先入力 → 決済完了</div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white/55 border border-[#d8c8b6]/70 rounded-3xl p-6 soft-shadow-header">
                  <div className="text-[0.85rem] font-black tracking-[0.18em] text-[#6e5e54] mb-4">ファネル（階段状）</div>
                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={computed.funnel} layout="vertical" margin={{ top: 8, right: 18, left: 18, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e7d7c8" />
                        <XAxis type="number" tick={{ fontSize: 12 }} />
                        <YAxis type="category" dataKey="step" tick={{ fontSize: 12 }} width={92} />
                        <Tooltip formatter={(v) => `${Number(v).toLocaleString()}件`} />
                        <Bar dataKey="count" name="件数" fill="#0055AA" radius={[0, 10, 10, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <MetricCard
                    title="フォーム開始率（閲覧→配送先入力）"
                    currentText={computed.formStartRate !== null ? formatPct(computed.formStartRate) : '—'}
                    prevDelta={null}
                    targetDelta={null}
                    note={computed.formStartRate !== null ? `商品閲覧から配送先入力を始めた割合です。` : ''}
                  />

                  <MetricCard
                    title="フォーム完了率（配送先入力→完了）"
                    currentText={computed.formCompleteRate !== null ? formatPct(computed.formCompleteRate) : '—'}
                    prevDelta={null}
                    targetDelta={null}
                    note={computed.formGap !== null ? `未完了：${Number(computed.formGap).toLocaleString()}件（入力途中の離脱）` : ''}
                    alert={computed.shouldWarnForm}
                  />

                  <MetricCard
                    title="配送先入力：小樽市外の可能性（ブロック）"
                    currentText={`${Number(data.behavior.addressInput.otaruBlocked || 0).toLocaleString()}件`}
                    prevDelta={null}
                    targetDelta={null}
                    note="小樽市外の可能性がある入力により進めないケースです。"
                    alert={computed.shouldWarnAddress}
                  />
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-end justify-between gap-6 mb-6">
                <h2 className="text-xl md:text-2xl font-black tracking-[0.18em] text-[#1c2b3a]">
                  集客（流入元）
                </h2>
                <div className="text-[0.85rem] tracking-widest text-[#8a7a6c] font-bold">LINE / SNS / 検索 / 直接</div>
              </div>

              <div className="bg-white/55 border border-[#d8c8b6]/70 rounded-3xl p-6 soft-shadow-header">
                <div className="text-[0.85rem] font-black tracking-[0.18em] text-[#6e5e54] mb-4">チャネル別セッション数</div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.acquisition.sessionsByChannel} margin={{ top: 10, right: 18, left: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e7d7c8" />
                      <XAxis dataKey="channel" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(v) => `${Number(v).toLocaleString()}件`} />
                      <Legend />
                      <Bar dataKey="sessions" name="セッション数" fill="#1f6fd6" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-end justify-between gap-6 mb-6">
                <h2 className="text-xl md:text-2xl font-black tracking-[0.18em] text-[#1c2b3a]">
                  改善ポイント（おもてなし）
                </h2>
                <div className="text-[0.85rem] tracking-widest text-[#8a7a6c] font-bold">見てすぐ分かる言葉でまとめます</div>
              </div>

              <div className="bg-white/55 border border-[#d8c8b6]/70 rounded-3xl p-6 soft-shadow-header">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#f3f8ff] border border-[#cfe2ff] rounded-3xl p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-[0.9rem] font-black tracking-[0.18em] text-[#1c2b3a]">入力の離脱</div>
                      {computed.shouldWarnForm ? (
                        <div className="inline-flex items-center gap-2 text-red-700 font-black tracking-widest text-[0.85rem]">
                          <AlertTriangle className="w-4 h-4" />
                          注意
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-3 text-[1.05rem] font-bold tracking-wide text-[#1c2b3a] leading-relaxed">
                      フォーム開始：{Number(data.behavior.form.starts || 0).toLocaleString()}件 / 完了：{Number(data.behavior.form.completes || 0).toLocaleString()}件
                    </div>
                    <div className="mt-2 text-[0.95rem] tracking-wide leading-relaxed text-[#4a3f35] font-medium">
                      差（未完了）：{computed.formGap !== null ? Number(computed.formGap).toLocaleString() : '—'}件
                    </div>
                  </div>

                  <div className="bg-[#fff4f4] border border-[#ffd0d0] rounded-3xl p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-[0.9rem] font-black tracking-[0.18em] text-[#1c2b3a]">配送エリアの誤解</div>
                      {computed.shouldWarnAddress ? (
                        <div className="inline-flex items-center gap-2 text-red-700 font-black tracking-widest text-[0.85rem]">
                          <AlertTriangle className="w-4 h-4" />
                          注意
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-3 text-[1.05rem] font-bold tracking-wide text-[#1c2b3a] leading-relaxed">
                      小樽市外の可能性（ブロック）：{Number(data.behavior.addressInput.otaruBlocked || 0).toLocaleString()}件
                    </div>
                    <div className="mt-2 text-[0.95rem] tracking-wide leading-relaxed text-[#4a3f35] font-medium">
                      入力途中離脱（その他）：{Number(data.behavior.addressInput.otherDropOff || 0).toLocaleString()}件
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-[0.9rem] font-black tracking-[0.18em] text-[#6e5e54]">自動提案</div>
                  <div className="mt-4 space-y-3">
                    {computed.suggestions.map((t, i) => (
                      <div key={String(i)} className="bg-white/70 border border-[#ebdcd0] rounded-2xl px-5 py-4 text-[0.95rem] leading-relaxed tracking-wide font-medium text-[#1c2b3a]">
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </motion.div>
  );
}
