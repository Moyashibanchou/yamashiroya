export async function getAdminInsights() {
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
