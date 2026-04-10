import { apiUrl, API_BASE_URL } from './apiConfig';

function safeNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function monthLabelFromISO(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
}

function normalizeSessionsByChannel(input) {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input
      .map((x) => ({
        channel: String(x?.channel ?? x?.name ?? ''),
        sessions: safeNumber(x?.sessions ?? x?.count ?? x?.value),
      }))
      .filter((x) => x.channel);
  }

  if (typeof input === 'object') {
    return Object.entries(input)
      .map(([k, v]) => ({ channel: String(k), sessions: safeNumber(v) }))
      .filter((x) => x.channel);
  }

  return [];
}

function normalizeFunnel(input) {
  if (!input) return [];

  if (Array.isArray(input)) {
    return input
      .map((x) => ({
        step: String(x?.step ?? x?.label ?? x?.name ?? ''),
        count: safeNumber(x?.count ?? x?.value ?? x?.sessions ?? x?.users),
      }))
      .filter((x) => x.step);
  }

  if (typeof input === 'object') {
    const entries = Object.entries(input);
    return entries
      .map(([k, v]) => ({ step: String(k), count: safeNumber(v) }))
      .filter((x) => x.step);
  }

  return [];
}

function pick(obj, keys) {
  for (const k of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, k)) return obj[k];
  }
  return undefined;
}

function normalizeMetricBlock(block) {
  if (!block || typeof block !== 'object') {
    return { current: 0, prev: 0, target: 0 };
  }
  return {
    current: safeNumber(pick(block, ['current', 'now', 'value', 'thisMonth', 'currentMonth'])),
    prev: safeNumber(pick(block, ['prev', 'previous', 'lastMonth', 'prevMonth'])),
    target: safeNumber(pick(block, ['target', 'goal', 'objective'])),
  };
}

function normalizeFromCurrentPreviousShape(source) {
  const cur = source?.current && typeof source.current === 'object' ? source.current : null;
  const prev = source?.previous && typeof source.previous === 'object' ? source.previous : null;
  if (!cur || !prev) return null;

  const monthLabel = monthLabelFromISO(cur.from);
  const prevMonthLabel = monthLabelFromISO(prev.from);

  const curRevenue = safeNumber(cur.totalRevenue);
  const prevRevenue = safeNumber(prev.totalRevenue);

  const curOrders = safeNumber(cur.totalOrders);
  const prevOrders = safeNumber(prev.totalOrders);

  const curCvr = safeNumber(cur.purchaseRate);
  const prevCvr = safeNumber(prev.purchaseRate);

  const curAov = curOrders ? curRevenue / curOrders : 0;
  const prevAov = prevOrders ? prevRevenue / prevOrders : 0;

  const funnelCur = cur.funnel && typeof cur.funnel === 'object' ? cur.funnel : {};
  const sessions = safeNumber(cur.totalSessions);
  const funnel = [
    { step: '商品閲覧', count: sessions },
    { step: 'カート投入', count: safeNumber(funnelCur.cartAdds) },
    { step: '配送先入力', count: safeNumber(funnelCur.checkoutStarts) },
    { step: '決済完了', count: safeNumber(funnelCur.checkoutCompletes) },
  ];

  return {
    period: {
      monthLabel: monthLabel || '—',
      prevMonthLabel: prevMonthLabel || '—',
    },
    outcome: {
      revenue: { current: curRevenue, prev: prevRevenue, target: 0 },
      purchases: { current: curOrders, prev: prevOrders, target: 0 },
      purchaseRate: { current: curCvr, prev: prevCvr, target: 0 },
      avgOrderValue: { current: curAov, prev: prevAov, target: 0 },
    },
    behavior: {
      funnel,
      addressInput: {
        starts: safeNumber(funnelCur.checkoutStarts),
        completes: safeNumber(funnelCur.checkoutCompletes),
        otaruBlocked: 0,
        otherDropOff: 0,
      },
      form: {
        starts: safeNumber(funnelCur.checkoutStarts),
        completes: safeNumber(funnelCur.checkoutCompletes),
        errorCount: 0,
      },
    },
    acquisition: {
      sessionsByChannel: normalizeSessionsByChannel(cur.channels),
    },
  };
}

function normalizeAdminStats(raw) {
  const source = raw && typeof raw === 'object' ? raw : {};

  const mapped = normalizeFromCurrentPreviousShape(source);
  if (mapped) return mapped;

  const period = source.period && typeof source.period === 'object' ? source.period : {};
  const monthLabel = String(
    pick(period, ['monthLabel', 'month', 'label']) ??
      monthLabelFromISO(pick(period, ['monthStart', 'from', 'start', 'date']))
  );
  const prevMonthLabel = String(
    pick(period, ['prevMonthLabel', 'previousMonthLabel', 'prevMonth', 'previousMonth']) ??
      monthLabelFromISO(pick(period, ['prevMonthStart', 'prevFrom', 'previousFrom']))
  );

  const outcomeSrc = source.outcome ?? source.kpi ?? source.metrics ?? {};
  const outcome = {
    revenue: normalizeMetricBlock(pick(outcomeSrc, ['revenue', 'sales', 'totalSales'])),
    purchases: normalizeMetricBlock(pick(outcomeSrc, ['purchases', 'orders', 'orderCount', 'purchaseCount'])),
    purchaseRate: normalizeMetricBlock(pick(outcomeSrc, ['purchaseRate', 'cvr', 'conversionRate'])),
    avgOrderValue: normalizeMetricBlock(pick(outcomeSrc, ['avgOrderValue', 'aov', 'averageOrderValue'])),
  };

  const behaviorSrc = source.behavior ?? source.funnel ?? {};
  const addressInputSrc = behaviorSrc.addressInput ?? behaviorSrc.address ?? {};
  const formSrc = behaviorSrc.form ?? behaviorSrc.checkoutForm ?? {};

  const behavior = {
    funnel: normalizeFunnel(pick(behaviorSrc, ['funnel', 'steps', 'counts'])),
    addressInput: {
      starts: safeNumber(pick(addressInputSrc, ['starts', 'start', 'started'])),
      completes: safeNumber(pick(addressInputSrc, ['completes', 'complete', 'completed'])),
      otaruBlocked: safeNumber(pick(addressInputSrc, ['otaruBlocked', 'blocked', 'blockedCount'])),
      otherDropOff: safeNumber(pick(addressInputSrc, ['otherDropOff', 'dropOff', 'dropoff', 'other'])),
    },
    form: {
      starts: safeNumber(pick(formSrc, ['starts', 'start', 'started'])),
      completes: safeNumber(pick(formSrc, ['completes', 'complete', 'completed'])),
      errorCount: safeNumber(pick(formSrc, ['errorCount', 'errors', 'error'])),
    },
  };

  const acquisitionSrc = source.acquisition ?? source.traffic ?? source.channels ?? {};
  const acquisition = {
    sessionsByChannel: normalizeSessionsByChannel(
      pick(acquisitionSrc, ['sessionsByChannel', 'sessions', 'channels', 'byChannel'])
    ),
  };

  return {
    period: {
      monthLabel: monthLabel || '—',
      prevMonthLabel: prevMonthLabel || '—',
    },
    outcome,
    behavior,
    acquisition,
  };
}

function mockAdminInsights() {
  return {
    period: {
      monthLabel: '2026年4月',
      prevMonthLabel: '2026年3月',
    },
    outcome: {
      revenue: { current: 420000, prev: 380000, target: 450000 },
      purchases: { current: 56, prev: 49, target: 60 },
      purchaseRate: { current: 0.031, prev: 0.028, target: 0.035 },
      avgOrderValue: { current: 7500, prev: 7400, target: 7800 },
    },
    behavior: {
      funnel: [
        { step: '商品閲覧', count: 1800 },
        { step: 'カート投入', count: 220 },
        { step: '配送先入力', count: 140 },
        { step: '決済完了', count: 56 },
      ],
      addressInput: {
        starts: 140,
        completes: 95,
        otaruBlocked: 18,
        otherDropOff: 27,
      },
      form: {
        starts: 140,
        completes: 95,
        errorCount: 32,
      },
    },
    acquisition: {
      sessionsByChannel: [
        { channel: 'LINE', sessions: 520 },
        { channel: 'SNS', sessions: 430 },
        { channel: '検索', sessions: 610 },
        { channel: '直接', sessions: 240 },
      ],
    },
  };
}

export async function getAdminInsights(options = {}) {
  const { useMock = false } = options;
  if (useMock) return mockAdminInsights();

  const apiBaseUrl = API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error('VITE_API_URL が未設定のため、統計データを取得できませんでした。');
  }

  const url = apiUrl('/api/admin/stats');
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('データが取得できませんでした');
  }

  const raw = await res.json();
  return normalizeAdminStats(raw);
}
