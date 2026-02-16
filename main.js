const SAVE_KEY = "sim_save_v1";
const SAVE_VERSION = 1;

const CONFIG = {
  actionsPerDayMin: 1,
  actionsPerDayMax: 2,
  softmaxTemp: 0.95,
  decay: {
    stress: 2,
    anger: 3,
    envy: 2,
  },
  thresholds: {
    fightAnger: 70,
    fightResent: 30,
    burnoutStress: 85,
  },
  rumor: {
    createChanceBase: 0.08,
  },
  eventCapPerDay: 5,
  sameTypeCapPerDay: 2,
  headlineCount: 3,
};

const ACTION_TYPES = ["TALK", "HELP", "GOSSIP", "INSULT", "APOLOGIZE", "WITHDRAW"];

const TYPE_GROUP = {
  TALK: "SOCIAL",
  HELP: "SOCIAL",
  INSULT: "CONFLICT",
  FIGHT: "CONFLICT",
  APOLOGIZE: "RECONCILE",
  RECONCILE: "RECONCILE",
  GOSSIP: "RUMOR",
  SCANDAL: "RUMOR",
  EXPOSE: "RUMOR",
  WITHDRAW: "WITHDRAW",
  BURNOUT: "WITHDRAW",
  ALLIANCE: "SOCIAL",
};

const EVENT_IMPORTANCE = {
  SCANDAL: 0.85,
  EXPOSE: 0.8,
  FIGHT: 0.75,
  BURNOUT: 0.65,
  RECONCILE: 0.6,
  ALLIANCE: 0.55,
};

const WORLD = {
  townName: "라일리타운",
  newspaper: "라일리타운 데일리",
  locations: ["square", "tavern", "workshop", "clinic", "market", "townhall"],
  locationName: {
    square: "광장",
    tavern: "여관",
    workshop: "작업장",
    clinic: "진료소",
    market: "시장",
    townhall: "시청",
  },
  weather: ["clear", "cloudy", "rain", "windy"],
  weatherName: {
    clear: "맑음",
    cloudy: "흐림",
    rain: "비",
    windy: "강풍",
  },
  events: ["none", "festival", "heavy_rain", "inspection", "blackout"],
  eventName: {
    none: "없음",
    festival: "축제",
    heavy_rain: "폭우",
    inspection: "점검",
    blackout: "정전",
  },
};

const SECRET_TOPICS = {
  raon_accident: "과거 사고",
  doyun_favor: "서류 봐주기 의혹",
  minseok_delay: "납품 지연 원인",
};

const NPC_SEED = [
  {
    id: "npc_harin",
    name: "하린",
    role: "tavern_owner",
    traits: { extroversion: 0.85, jealousy: 0.35, agreeableness: 0.55, neuroticism: 0.35, ambition: 0.4, honesty: 0.25 },
    needs: { social: 75, status: 55, rest: 40, security: 50 },
    emotions: { stress: 30, happiness: 60, anger: 10, sadness: 10, envy: 15, trust_baseline: 50 },
    flags: { is_gossip_source: true },
    location: "tavern",
  },
  {
    id: "npc_minseok",
    name: "민석",
    role: "blacksmith",
    traits: { extroversion: 0.45, jealousy: 0.3, agreeableness: 0.3, neuroticism: 0.25, ambition: 0.6, honesty: 0.7 },
    needs: { social: 40, status: 70, rest: 55, security: 55 },
    emotions: { stress: 35, happiness: 50, anger: 25, sadness: 12, envy: 10, trust_baseline: 50 },
    flags: {},
    location: "workshop",
  },
  {
    id: "npc_yuna",
    name: "유나",
    role: "clinic_assistant",
    traits: { extroversion: 0.5, jealousy: 0.15, agreeableness: 0.8, neuroticism: 0.55, ambition: 0.3, honesty: 0.85 },
    needs: { social: 55, status: 35, rest: 65, security: 70 },
    emotions: { stress: 40, happiness: 55, anger: 5, sadness: 15, envy: 5, trust_baseline: 60 },
    flags: {},
    location: "clinic",
  },
  {
    id: "npc_doyun",
    name: "도윤",
    role: "townhall_clerk",
    traits: { extroversion: 0.6, jealousy: 0.4, agreeableness: 0.35, neuroticism: 0.3, ambition: 0.85, honesty: 0.45 },
    needs: { social: 45, status: 80, rest: 45, security: 55 },
    emotions: { stress: 45, happiness: 45, anger: 15, sadness: 15, envy: 20, trust_baseline: 45 },
    flags: {},
    location: "townhall",
  },
  {
    id: "npc_sea",
    name: "세아",
    role: "merchant",
    traits: { extroversion: 0.75, jealousy: 0.25, agreeableness: 0.45, neuroticism: 0.25, ambition: 0.7, honesty: 0.4 },
    needs: { social: 50, status: 65, rest: 50, security: 50 },
    emotions: { stress: 30, happiness: 55, anger: 10, sadness: 10, envy: 10, trust_baseline: 50 },
    flags: {},
    location: "market",
  },
  {
    id: "npc_junho",
    name: "준호",
    role: "courier",
    traits: { extroversion: 0.8, jealousy: 0.2, agreeableness: 0.6, neuroticism: 0.4, ambition: 0.35, honesty: 0.75, impulsiveness: 0.75 },
    needs: { social: 70, status: 40, rest: 35, security: 45 },
    emotions: { stress: 25, happiness: 60, anger: 10, sadness: 8, envy: 5, trust_baseline: 55 },
    flags: {},
    location: "square",
  },
  {
    id: "npc_sujin",
    name: "수진",
    role: "teacher",
    traits: { extroversion: 0.55, jealousy: 0.1, agreeableness: 0.5, neuroticism: 0.35, ambition: 0.55, honesty: 0.9 },
    needs: { social: 45, status: 55, rest: 55, security: 60 },
    emotions: { stress: 35, happiness: 50, anger: 15, sadness: 10, envy: 0, trust_baseline: 55 },
    flags: { moralist: true },
    location: "townhall",
  },
  {
    id: "npc_raon",
    name: "라온",
    role: "fixer",
    traits: { extroversion: 0.25, jealousy: 0.15, agreeableness: 0.55, neuroticism: 0.2, ambition: 0.4, honesty: 0.65 },
    needs: { social: 25, status: 35, rest: 60, security: 65 },
    emotions: { stress: 30, happiness: 50, anger: 5, sadness: 8, envy: 0, trust_baseline: 50 },
    flags: { has_secret: true },
    location: "workshop",
  },
];

const RELATION_SEED = [
  ["npc_harin", "npc_doyun", { trust: -15, affinity: -5 }],
  ["npc_doyun", "npc_harin", { trust: -25, rivalry: 15 }],
  ["npc_harin", "npc_sea", { affinity: 10, trust: 5 }],
  ["npc_sea", "npc_harin", { trust: 10 }],

  ["npc_minseok", "npc_sea", { rivalry: 20, trust: -10 }],
  ["npc_sea", "npc_minseok", { affinity: -10, rivalry: 15 }],
  ["npc_minseok", "npc_junho", { affinity: 5, trust: 5 }],
  ["npc_junho", "npc_minseok", { affinity: 10 }],

  ["npc_sujin", "npc_doyun", { trust: -15, resentment: 10 }],
  ["npc_doyun", "npc_sujin", { fear: 5, resentment: 10 }],
  ["npc_sujin", "npc_harin", { trust: -10 }],

  ["npc_raon", "npc_yuna", { trust: 15, affinity: 10 }],
];

const TEXT_BANK = {
  "log.talk.simple": [
    "{A}가 {place}에서 {B}와 짧게 이야기를 나눴다.",
    "{A}와 {B}가 {place}에서 대화를 나눴다.",
    "{place}에서 {A}-{B}의 대화가 포착됐다.",
    "{A}가 {B}에게 먼저 말을 걸었다.",
    "{B}가 {A}의 이야기에 귀를 기울였다.",
    "{A}와 {B}의 분위기는 나쁘지 않았다.",
    "{place}에서 두 사람의 대화가 이어졌다.",
    "{A}가 {B}에게 근황을 물었다.",
    "{A}-{B}의 대화가 예상보다 길어졌다.",
    "{A}와 {B}가 조용히 이야기를 나눴다.",
  ],
  "log.help.simple": [
    "{A}가 {B}를 도왔다.",
    "{B}의 문제를 {A}가 처리했다.",
    "{place}에서 {A}가 {B}에게 손을 내밀었다.",
    "{A}가 {B}의 부담을 덜어줬다.",
    "{A}의 도움으로 {B}가 한숨 돌렸다.",
    "{A}가 {B}의 요청을 수락했다.",
    "{B}는 {A}의 지원을 받았다.",
    "{A}가 묵묵히 {B}를 지원했다.",
    "{place}에서 협력이 이루어졌다.",
    "{A}의 행동이 {B}에게 긍정적 영향을 줬다.",
  ],
  "log.gossip.simple": [
    "{A}가 {T}에 대한 이야기를 흘렸다.",
    "{place}에서 {T} 관련 소문이 돌기 시작했다.",
    "{A}가 {B}에게 {T}의 이야기를 전했다.",
    "{A}의 말이 파장을 일으킬 가능성이 있다.",
    "{T}에 대한 의혹이 수면 위로 떠올랐다.",
    "{A}의 발언이 조용히 확산 중이다.",
    "{B}는 {T} 이야기를 들었다.",
    "{place}에서 은밀한 대화가 오갔다.",
    "{T}의 이름이 다시 언급됐다.",
    "{A}의 발언이 의미심장했다.",
  ],
  "log.insult.simple": [
    "{A}가 {B}를 노골적으로 비판했다.",
    "{A}의 발언에 {B}가 불쾌감을 드러냈다.",
    "{place}에서 날 선 말이 오갔다.",
    "{A}가 {B}를 공개적으로 지적했다.",
    "{B}는 {A}의 태도에 반발했다.",
    "{A}의 말이 분위기를 얼어붙게 했다.",
    "{A}가 {B}를 자극했다.",
    "{place}에서 긴장감이 감돌았다.",
    "{B}의 표정이 굳었다.",
    "{A}의 비난이 도를 넘었다.",
  ],
  "log.apologize.simple": [
    "{A}가 {B}에게 사과했다.",
    "{A}가 한 발 물러섰다.",
    "{B}는 {A}의 사과를 들었다.",
    "{place}에서 화해의 움직임이 보였다.",
    "{A}가 태도를 바꿨다.",
    "{A}의 사과가 분위기를 완화했다.",
    "{B}는 조용히 고개를 끄덕였다.",
    "{A}가 책임을 인정했다.",
    "{place}에서 갈등이 일부 해소됐다.",
    "{A}의 말이 관계 회복의 계기가 될지 주목된다.",
  ],
  "log.withdraw.simple": [
    "{A}가 사람들과 거리를 두기 시작했다.",
    "{A}가 {place}에서 모습을 감췄다.",
    "{A}의 활동이 눈에 띄게 줄었다.",
    "{A}가 대화를 피했다.",
    "{A}는 조용히 자리를 떠났다.",
    "{A}가 고립을 택한 듯 보인다.",
    "{A}의 반응이 차가워졌다.",
    "{A}는 혼자 있는 시간을 선택했다.",
    "{place}에서 {A}의 존재감이 약해졌다.",
    "{A}의 침묵이 길어지고 있다.",
  ],
  "news.conflict.major": [
    "[속보] {A}와 {B}, {place}에서 정면 충돌",
    "{A}-{B} 갈등 폭발… 마을 긴장",
    "공개 설전: {A} vs {B}",
    "{place}에서 언쟁 발생, 주민들 주목",
    "{A}와 {B} 관계 급랭",
    "예고된 충돌? {A}-{B} 대립 격화",
    "{A}의 발언에 {B} 격분",
    "마을 분위기 얼어붙다: {A}-{B}",
    "{A}와 {B}, 타협 실패",
    "{A}-{B} 갈등, 새 국면",
  ],
  "news.scandal.major": [
    "[특종] {topicName} 의혹 확산",
    "{T} 둘러싼 소문 급속 확산",
    "여론 흔들: {T} 관련 의혹",
    "{T}에 대한 신뢰 시험대",
    "마을 발칵: {topicName}",
    "{T}, 해명 요구 커져",
    "의혹의 중심에 선 {T}",
    "소문이 사실일까? {T} 논란",
    "{T}를 둘러싼 진실 공방",
    "라일리타운 데일리 단독: {topicName}",
  ],
  "news.reconcile.major": [
    "{A}-{B} 극적 화해",
    "갈등 봉합: {A}와 {B}",
    "반전 드라마, 관계 회복",
    "{place}에서 화해 장면 포착",
    "{A}-{B}, 새로운 시작?",
    "분위기 반전, 갈등 해소",
    "{A}와 {B} 다시 손 잡다",
    "냉기 걷히나? 화해 신호",
    "{A}-{B} 대화 재개",
    "마을 안도: 갈등 일단락",
  ],
  "news.expose.major": [
    "{A}, {T}에게 공개 질의",
    "폭로 발언… {T} 압박",
    "{place}에서 진실 공방",
    "{A}의 추궁, 파장 예고",
    "정면 승부: {A} vs {T}",
    "{A}, 의혹 제기",
    "숨겨진 사실 드러나나",
    "{T}, 설명 요구 받아",
    "{A}의 문제 제기 확산",
    "의혹 재점화",
  ],
  "news.burnout.major": [
    "{A}, 결국 거리두기 선언",
    "{A} 활동 중단… 우려 확산",
    "과로 신호? {A} 침묵",
    "{A}의 휴식 필요성 제기",
    "{A}, 마을 활동 축소",
    "고립 선택한 {A}",
    "{A}의 변화, 이유는?",
    "{A} 한발 물러서다",
    "{A}, 당분간 휴식",
    "{A}의 공백이 느껴진다",
  ],
  "news.alliance.major": [
    "{A}와 {B}, 협력 체제 구축",
    "새 동맹 형성: {A}-{B}",
    "{A}-{B} 전략적 협력",
    "{place}에서 공동 움직임",
    "판도 변화 예고",
    "{A}와 {B} 이해관계 일치",
    "협력 신호 감지",
    "{A}-{B} 공동 행보",
    "연합 형성",
    "새로운 축 등장",
  ],
};

const SUMMARY_BY_GROUP = {
  CONFLICT: [
    "당사자 간 원망이 빠르게 상승하며 주변 인물의 긴장도 함께 올라갔다.",
    "대립이 공개화되며 다음 날 추가 충돌 가능성이 커졌다.",
  ],
  RECONCILE: [
    "신뢰 회복 지표가 상승하며 단기 안정 효과가 관측됐다.",
    "직전 갈등 이력이 완전히 해소되진 않았지만 완충이 생겼다.",
  ],
  RUMOR: [
    "소문의 확산도가 임계치에 접근해 2차 반응이 이어지고 있다.",
    "의혹 중심 인물의 스트레스가 상승해 후속 사건 가능성이 존재한다.",
  ],
  SOCIAL: [
    "협력 형성으로 일부 관계가 빠르게 개선됐다.",
    "상호 지원이 늘며 갈등 축이 일시적으로 완화됐다.",
  ],
  WITHDRAW: [
    "스트레스 누적 신호가 확인돼 사회적 접촉이 줄어들었다.",
    "회복을 위한 휴식 행동이 증가했지만 고립 리스크도 남아 있다.",
  ],
};

const LOG_KEY_BY_TYPE = {
  TALK: "log.talk.simple",
  HELP: "log.help.simple",
  GOSSIP: "log.gossip.simple",
  INSULT: "log.insult.simple",
  APOLOGIZE: "log.apologize.simple",
  WITHDRAW: "log.withdraw.simple",
};

const NEWS_KEY_BY_TYPE = {
  FIGHT: "news.conflict.major",
  INSULT: "news.conflict.major",
  SCANDAL: "news.scandal.major",
  GOSSIP: "news.scandal.major",
  RECONCILE: "news.reconcile.major",
  EXPOSE: "news.expose.major",
  BURNOUT: "news.burnout.major",
  WITHDRAW: "news.burnout.major",
  ALLIANCE: "news.alliance.major",
  TALK: "news.alliance.major",
  HELP: "news.alliance.major",
  APOLOGIZE: "news.reconcile.major",
};

function mulberry32(seed) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function randRangeInt(rng, min, max) {
  return min + Math.floor(rng() * (max - min + 1));
}

function choice(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function softmaxSample(rng, items, temp) {
  const max = Math.max(...items.map((x) => x.score));
  const exps = items.map((x) => Math.exp((x.score - max) / temp));
  const sum = exps.reduce((a, b) => a + b, 0);
  let p = rng() * sum;
  for (let i = 0; i < items.length; i += 1) {
    p -= exps[i];
    if (p <= 0) return items[i];
  }
  return items[items.length - 1];
}

function relationKey(from, to) {
  return `${from}->${to}`;
}

function pairKey(a, b) {
  return [a, b].sort().join("::");
}

function sortNpcIds(state) {
  return state.npcs.map((n) => n.id).sort((a, b) => a.localeCompare(b));
}

function getNpc(state, id) {
  return state.npcs.find((n) => n.id === id);
}

function getRelation(state, from, to) {
  return state.relations[relationKey(from, to)];
}

function applyNpcDelta(npc, deltaObj) {
  for (const [k, v] of Object.entries(deltaObj || {})) {
    if (k in npc.emotions) npc.emotions[k] = clamp(npc.emotions[k] + v, 0, 100);
    if (k in npc.needs) npc.needs[k] = clamp(npc.needs[k] + v, 0, 100);
  }
}

function applyRelDelta(rel, deltaObj) {
  for (const [k, v] of Object.entries(deltaObj || {})) {
    rel.stats[k] = clamp(rel.stats[k] + v, -100, 100);
  }
}

function initRelations(npcs) {
  const relations = {};
  for (const a of npcs) {
    for (const b of npcs) {
      if (a.id === b.id) continue;
      relations[relationKey(a.id, b.id)] = {
        from: a.id,
        to: b.id,
        stats: {
          affinity: 0,
          trust: 0,
          rivalry: 0,
          fear: 0,
          resentment: 0,
          rumor_belief: 0,
        },
      };
    }
  }

  for (const [from, to, delta] of RELATION_SEED) {
    applyRelDelta(relations[relationKey(from, to)], delta);
  }

  for (const npc of npcs) {
    if (npc.id === "npc_yuna") {
      for (const target of npcs) {
        if (target.id === npc.id) continue;
        const bonus = target.id === "npc_minseok" || target.id === "npc_raon" ? 12 : 10;
        applyRelDelta(relations[relationKey("npc_yuna", target.id)], { trust: bonus });
      }
    }
  }

  return relations;
}

function initSecrets() {
  return [
    { id: "secret_1", ownerNpcId: "npc_raon", rumorTopic: "raon_accident", active: true },
    { id: "secret_2", ownerNpcId: "npc_doyun", rumorTopic: "doyun_favor", active: true },
    { id: "secret_3", ownerNpcId: "npc_minseok", rumorTopic: "minseok_delay", active: true },
  ];
}

function initGame(seed) {
  const npcs = NPC_SEED.map((n) => ({
    ...n,
    memory: {
      recent: [],
      flags: {
        has_secret: !!n.flags.has_secret,
        is_gossip_source: !!n.flags.is_gossip_source,
        moralist: !!n.flags.moralist,
      },
    },
  }));

  const state = {
    saveVersion: SAVE_VERSION,
    seed,
    day: 1,
    worldMood: 0,
    environment: {
      weather: "clear",
      event: "none",
      securityLevel: 0.5,
    },
    npcs,
    relations: initRelations(npcs),
    secrets: initSecrets(),
    rumors: [],
    log: [],
    headlines: [],
    todayLogs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return state;
}

function chooseEnvironment(state, rng) {
  state.environment.weather = choice(rng, WORLD.weather);
  state.environment.event = choice(rng, WORLD.events);
  if (state.day <= 2 && rng() < 0.4) {
    state.environment.event = "festival";
  }
  state.environment.securityLevel = clamp(state.environment.securityLevel + (rng() - 0.5) * 0.1, 0, 1);
}

function dailySetup(state, rng) {
  chooseEnvironment(state, rng);

  for (const npc of state.npcs) {
    applyNpcDelta(npc, {
      stress: -CONFIG.decay.stress,
      anger: -CONFIG.decay.anger,
      envy: -CONFIG.decay.envy,
    });
  }

  for (const rumor of state.rumors) {
    rumor.severity = clamp(rumor.severity * 0.97, 0, 1);
    rumor.spread = clamp(rumor.spread * 0.95, 0, 1);
  }
  state.rumors = state.rumors.filter((r) => !(r.spread < 0.05 && r.severity < 0.1));
}

function salienceScore(relStats) {
  return Math.abs(relStats.affinity) * 0.6 + Math.abs(relStats.trust) * 0.3 + Math.abs(relStats.resentment) * 0.1;
}

function pickTargets(state, npcId, rng) {
  const others = state.npcs.filter((n) => n.id !== npcId).sort((a, b) => a.id.localeCompare(b.id));
  const scored = others.map((o) => {
    const rel = getRelation(state, npcId, o.id);
    return { id: o.id, s: salienceScore(rel.stats) };
  });

  scored.sort((a, b) => {
    if (b.s !== a.s) return b.s - a.s;
    return a.id.localeCompare(b.id);
  });

  const top = scored.slice(0, 3).map((x) => x.id);
  const remaining = scored.slice(3).map((x) => x.id);

  const randomPick = [];
  while (remaining.length > 0 && randomPick.length < 2) {
    const idx = Math.floor(rng() * remaining.length);
    randomPick.push(remaining[idx]);
    remaining.splice(idx, 1);
  }

  const uniq = [...new Set([...top, ...randomPick])];
  if (uniq.length === 0 && others.length > 0) return [choice(rng, others).id];
  return uniq;
}

function envWeight(state, actionType) {
  let w = 0;
  if (state.environment.event === "festival") {
    if (actionType === "TALK" || actionType === "HELP" || actionType === "GOSSIP") w += 0.25;
    if (actionType === "WITHDRAW") w -= 0.1;
  }
  if ((state.environment.weather === "rain" || state.environment.event === "heavy_rain") && actionType === "WITHDRAW") w += 0.2;
  if (state.environment.event === "inspection" && actionType === "GOSSIP") w -= 0.1;
  return w;
}

function hasRecentConflict(npc, targetId, day) {
  return npc.memory.recent.some(
    (m) =>
      m.day >= day - 2 &&
      m.target === targetId &&
      (m.type === "INSULT" || m.type === "targeted_INSULT" || m.type === "FIGHT" || m.type === "targeted_FIGHT")
  );
}

function scoreAction(npc, target, rel, actionType, state) {
  const t = npc.traits;
  const e = npc.emotions;
  const n = npc.needs;
  const rs = rel.stats;

  let s = 0.1;
  if (actionType === "TALK") {
    s += t.extroversion * 0.8 + t.agreeableness * 0.4;
    s += (n.social / 100) * 0.6;
    s += (rs.affinity / 100) * 0.5;
  }
  if (actionType === "HELP") {
    s += t.agreeableness * 0.9 + t.honesty * 0.3;
    s += (rs.trust / 100) * 0.6 + (rs.affinity / 100) * 0.5;
    s += (target.emotions.stress / 100) * 0.5;
  }
  if (actionType === "GOSSIP") {
    s += (1 - t.honesty) * 0.6 + t.extroversion * 0.35 + t.jealousy * 0.65;
    s += (e.envy / 100) * 0.4 + (-rs.trust / 100) * 0.55;
    if (npc.id === "npc_harin") s += 0.25;
    if (state.day <= 3 && npc.id === "npc_harin") s += 0.15;
  }
  if (actionType === "INSULT") {
    s += (e.anger / 100) * 0.9 + (1 - t.agreeableness) * 0.45;
    s += (rs.rivalry / 100) * 0.7 + (rs.resentment / 100) * 0.6;
  }
  if (actionType === "APOLOGIZE") {
    s += t.agreeableness * 0.7 + t.honesty * 0.4;
    s += (rs.resentment / 100) * 0.3 + (hasRecentConflict(npc, target.id, state.day) ? 0.3 : 0);
    s += (e.anger / 100) * -0.3;
  }
  if (actionType === "WITHDRAW") {
    s += (e.stress / 100) * 1.0 + ((100 - n.rest) / 100) * 0.6;
    s += t.neuroticism * 0.45;
  }

  s += envWeight(state, actionType);
  return s;
}

function buildActionCandidates(state, npc, rng) {
  const targets = pickTargets(state, npc.id, rng);
  const candidates = [];
  for (const targetId of targets) {
    const target = getNpc(state, targetId);
    const rel = getRelation(state, npc.id, targetId);
    for (const actionType of ACTION_TYPES) {
      const score = scoreAction(npc, target, rel, actionType, state);
      candidates.push({ actorId: npc.id, targetId, actionType, score });
    }
  }
  return candidates;
}

function renderText(rng, key, vars) {
  const arr = TEXT_BANK[key] || ["기록 없음"];
  const tmpl = choice(rng, arr);
  return tmpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}

function getTopicForTarget(state, targetId, rng) {
  const s = state.secrets.find((x) => x.ownerNpcId === targetId && x.active);
  if (s) return s.rumorTopic;
  return choice(rng, Object.keys(SECRET_TOPICS));
}

function maybeCreateOrBoostRumor(state, actor, target, rng) {
  const rel = getRelation(state, actor.id, target.id);
  const p = CONFIG.rumor.createChanceBase + actor.traits.jealousy * 0.06 + ((-rel.stats.trust) / 100) * 0.08;
  if (rng() >= clamp(p, 0, 1)) return null;

  const topicKey = getTopicForTarget(state, target.id, rng);
  let rumor = state.rumors.find((r) => r.topicNpcId === target.id && r.originNpcId === actor.id && r.topicKey === topicKey);

  if (!rumor) {
    rumor = {
      id: `rumor_${state.day}_${actor.id}_${target.id}_${topicKey}`,
      topicNpcId: target.id,
      originNpcId: actor.id,
      topicKey,
      severity: 0.22,
      spread: 0.2,
    };
    state.rumors.push(rumor);
  } else {
    rumor.severity = clamp(rumor.severity + 0.05 * (0.5 + actor.traits.jealousy), 0, 1);
    rumor.spread = clamp(rumor.spread + 0.04, 0, 1);
  }
  return rumor;
}

function computeImportance(type, actor, target, relAT, state) {
  let base = 0.2;
  if (type === "INSULT") base += 0.4;
  if (type === "GOSSIP") base += 0.25;
  if (type === "HELP") base += 0.2;
  if (type === "APOLOGIZE") base += 0.18;
  if (type === "WITHDRAW") base += actor.emotions.stress / 180;
  base += Math.abs(relAT.stats.resentment) / 400;
  if (state.environment.event === "festival") base += 0.05;
  if (type === "GOSSIP" && actor.id === "npc_harin") base += 0.08;
  return clamp(base, 0, 1);
}

function applyAction(state, action, rng) {
  const actor = getNpc(state, action.actorId);
  const target = getNpc(state, action.targetId);
  const relAT = getRelation(state, actor.id, target.id);
  const relTA = getRelation(state, target.id, actor.id);

  let rumor = null;

  if (action.actionType === "TALK") {
    applyNpcDelta(actor, { stress: -1, happiness: +2, social: -5 });
    applyNpcDelta(target, { happiness: +2, social: -4 });
    applyRelDelta(relAT, { affinity: +2, trust: +1, resentment: -1 });
    applyRelDelta(relTA, { affinity: +1 });
  }

  if (action.actionType === "HELP") {
    applyNpcDelta(actor, { stress: -1, happiness: +1, status: +1 });
    applyNpcDelta(target, { stress: -2, happiness: +4, security: +3 });
    applyRelDelta(relAT, { affinity: +3, trust: +2, resentment: -1 });
    applyRelDelta(relTA, { trust: +3, affinity: +2 });
  }

  if (action.actionType === "GOSSIP") {
    applyNpcDelta(actor, { stress: -1, envy: +2, social: -2 });
    applyNpcDelta(target, { stress: +2, happiness: -2 });
    applyRelDelta(relAT, { resentment: +2, trust: -2 });
    applyRelDelta(relTA, { trust: -1, resentment: +2 });
    rumor = maybeCreateOrBoostRumor(state, actor, target, rng);
  }

  if (action.actionType === "INSULT") {
    applyNpcDelta(actor, { anger: +3, stress: +1, happiness: -1 });
    applyNpcDelta(target, { stress: +6, anger: +4, happiness: -5 });
    applyRelDelta(relAT, { resentment: +5, affinity: -4, trust: -3 });
    applyRelDelta(relTA, { resentment: +8, affinity: -6, trust: -4 });
  }

  if (action.actionType === "APOLOGIZE") {
    applyNpcDelta(actor, { stress: -2, anger: -2, happiness: +1 });
    applyNpcDelta(target, { anger: -1, stress: -1 });
    applyRelDelta(relAT, { trust: +2, resentment: -4, affinity: +1 });
    applyRelDelta(relTA, { trust: +1, resentment: -2 });
  }

  if (action.actionType === "WITHDRAW") {
    applyNpcDelta(actor, { stress: -3, happiness: -1, social: +4, rest: -5 });
  }

  const textVars = {
    A: actor.name,
    B: target.name,
    T: target.name,
    place: WORLD.locationName[actor.location],
    topicName: rumor ? SECRET_TOPICS[rumor.topicKey] : "사건",
  };

  const logItem = {
    day: state.day,
    importance: computeImportance(action.actionType, actor, target, relAT, state),
    type: action.actionType,
    typeGroup: TYPE_GROUP[action.actionType],
    actors: [actor.id],
    targets: [target.id],
    context: { place: actor.location, weather: state.environment.weather, rumorId: rumor ? rumor.id : null, topicKey: rumor ? rumor.topicKey : null },
    textKey: LOG_KEY_BY_TYPE[action.actionType],
    textVars,
    text: renderText(rng, LOG_KEY_BY_TYPE[action.actionType], textVars),
  };

  state.log.push(logItem);
  state.todayLogs.push(logItem);

  actor.memory.recent.unshift({ type: action.actionType, target: target.id, day: state.day, value: Math.round(logItem.importance * 10) });
  target.memory.recent.unshift({ type: `targeted_${action.actionType}`, target: actor.id, day: state.day, value: Math.round(logItem.importance * 10) });
  actor.memory.recent = actor.memory.recent.slice(0, 10);
  target.memory.recent = target.memory.recent.slice(0, 10);
}

function makeEvent(state, rng, eventType, actorId, targetId, importance, ctx = {}) {
  const actor = getNpc(state, actorId);
  const target = targetId ? getNpc(state, targetId) : actor;
  const topicName = ctx.topicKey ? SECRET_TOPICS[ctx.topicKey] : "의혹";
  const vars = {
    A: actor.name,
    B: target.name,
    T: target.name,
    place: WORLD.locationName[actor.location],
    topicName,
  };
  const newsKey = NEWS_KEY_BY_TYPE[eventType] || "news.conflict.major";
  return {
    day: state.day,
    importance,
    type: eventType,
    typeGroup: TYPE_GROUP[eventType],
    actors: [actorId],
    targets: targetId ? [targetId] : [],
    context: { place: actor.location, ...ctx },
    textKey: newsKey,
    textVars: vars,
    text: `[사건] ${renderText(rng, newsKey, vars)}`,
  };
}

function generateEventCandidates(state, rng) {
  const candidates = [];

  for (const a of state.npcs) {
    for (const b of state.npcs) {
      if (a.id === b.id) continue;
      const rel = getRelation(state, a.id, b.id);

      if (a.emotions.anger > CONFIG.thresholds.fightAnger && rel.stats.resentment > CONFIG.thresholds.fightResent) {
        candidates.push(makeEvent(state, rng, "FIGHT", a.id, b.id, EVENT_IMPORTANCE.FIGHT));
      }

      const recentConflict = hasRecentConflict(a, b.id, state.day);
      if (rel.stats.affinity > 40 && recentConflict && a.traits.agreeableness > 0.65) {
        candidates.push(makeEvent(state, rng, "RECONCILE", a.id, b.id, EVENT_IMPORTANCE.RECONCILE));
      }

      if (rel.stats.affinity > 35 && rel.stats.trust > 30 && (a.traits.ambition > 0.6 || b.traits.ambition > 0.6)) {
        candidates.push(makeEvent(state, rng, "ALLIANCE", a.id, b.id, EVENT_IMPORTANCE.ALLIANCE));
      }
    }

    if (a.emotions.stress > CONFIG.thresholds.burnoutStress) {
      candidates.push(makeEvent(state, rng, "BURNOUT", a.id, null, EVENT_IMPORTANCE.BURNOUT));
    }
  }

  const sujin = getNpc(state, "npc_sujin");
  for (const rumor of state.rumors) {
    if (rumor.severity >= 0.65 && rumor.spread >= 0.55) {
      candidates.push(
        makeEvent(state, rng, "SCANDAL", rumor.originNpcId, rumor.topicNpcId, EVENT_IMPORTANCE.SCANDAL, {
          rumorId: rumor.id,
          topicKey: rumor.topicKey,
        })
      );
    }

    if (sujin && sujin.memory.flags.moralist && rumor.spread >= 0.35 && rumor.severity >= 0.4) {
      candidates.push(
        makeEvent(state, rng, "EXPOSE", "npc_sujin", rumor.topicNpcId, EVENT_IMPORTANCE.EXPOSE, {
          rumorId: rumor.id,
          topicKey: rumor.topicKey,
        })
      );
    }
  }

  // Early drama hook for day 1-3
  if (state.day <= 3) {
    if (!candidates.some((c) => c.type === "ALLIANCE")) {
      candidates.push(makeEvent(state, rng, "ALLIANCE", "npc_yuna", "npc_raon", EVENT_IMPORTANCE.ALLIANCE + 0.02));
    }
    if (state.rumors.length > 0 && !candidates.some((c) => c.type === "EXPOSE")) {
      const topRumor = [...state.rumors].sort((a, b) => b.severity + b.spread - (a.severity + a.spread))[0];
      candidates.push(
        makeEvent(state, rng, "EXPOSE", "npc_sujin", topRumor.topicNpcId, EVENT_IMPORTANCE.EXPOSE - 0.05, {
          rumorId: topRumor.id,
          topicKey: topRumor.topicKey,
        })
      );
    }
  }

  return candidates;
}

function applyEvent(state, event) {
  const actor = getNpc(state, event.actors[0]);
  const target = event.targets[0] ? getNpc(state, event.targets[0]) : null;

  if (event.type === "FIGHT" && target) {
    const relAT = getRelation(state, actor.id, target.id);
    const relTA = getRelation(state, target.id, actor.id);
    applyNpcDelta(actor, { stress: +8, anger: +10, happiness: -4 });
    applyNpcDelta(target, { stress: +10, anger: +8, happiness: -6 });
    applyRelDelta(relAT, { resentment: +12, affinity: -10, trust: -10 });
    applyRelDelta(relTA, { resentment: +12, affinity: -10, trust: -10 });
  }

  if (event.type === "RECONCILE" && target) {
    const relAT = getRelation(state, actor.id, target.id);
    const relTA = getRelation(state, target.id, actor.id);
    applyNpcDelta(actor, { stress: -5, anger: -6, happiness: +5 });
    applyNpcDelta(target, { stress: -4, anger: -5, happiness: +4 });
    applyRelDelta(relAT, { resentment: -10, trust: +8, affinity: +8 });
    applyRelDelta(relTA, { resentment: -8, trust: +7, affinity: +7 });
  }

  if (event.type === "SCANDAL" && target) {
    applyNpcDelta(target, { stress: +10, happiness: -6 });
    const rumor = state.rumors.find((r) => r.id === event.context.rumorId);
    if (rumor) {
      rumor.severity = 0.3;
      rumor.spread = 0.2;
    }
  }

  if (event.type === "EXPOSE" && target) {
    const rel = getRelation(state, actor.id, target.id);
    applyNpcDelta(target, { stress: +6, anger: +4, happiness: -3 });
    applyRelDelta(rel, { trust: -3, resentment: +3 });
  }

  if (event.type === "ALLIANCE" && target) {
    const relAT = getRelation(state, actor.id, target.id);
    const relTA = getRelation(state, target.id, actor.id);
    applyNpcDelta(actor, { happiness: +3, stress: -2 });
    applyNpcDelta(target, { happiness: +3, stress: -2 });
    applyRelDelta(relAT, { trust: +6, affinity: +6, resentment: -3 });
    applyRelDelta(relTA, { trust: +6, affinity: +6, resentment: -3 });
  }

  if (event.type === "BURNOUT") {
    applyNpcDelta(actor, { stress: -8, happiness: -3, social: +5 });
  }

  state.log.push(event);
  state.todayLogs.push(event);
}

function pickEvents(candidates) {
  const picked = [];
  const typeCount = {};
  const pairBlocking = new Set();

  const sorted = [...candidates].sort((a, b) => b.importance - a.importance);

  for (const e of sorted) {
    if (picked.length >= CONFIG.eventCapPerDay) break;

    typeCount[e.type] = typeCount[e.type] || 0;
    if (typeCount[e.type] >= CONFIG.sameTypeCapPerDay) continue;

    const a = e.actors[0] || "";
    const b = e.targets[0] || "";
    const pKey = b ? pairKey(a, b) : null;

    if (pKey && (e.type === "FIGHT" || e.type === "RECONCILE")) {
      const clashKey = `${pKey}:conflictOrRecon`;
      if (pairBlocking.has(clashKey)) continue;
      pairBlocking.add(clashKey);
    }

    picked.push(e);
    typeCount[e.type] += 1;
  }

  return picked;
}

function dedupeForHeadlines(logItems) {
  const selected = [];
  const similarSet = new Set();
  const actorExposure = {};

  const sorted = [...logItems].sort((a, b) => b.importance - a.importance);

  for (const item of sorted) {
    if (selected.length >= CONFIG.headlineCount) break;

    const a = item.actors[0] || "";
    const b = item.targets[0] || "";
    const pair = b ? pairKey(a, b) : `${a}::solo`;
    const simKey = `${item.typeGroup}:${pair}`;
    if (similarSet.has(simKey)) continue;

    const involved = [a, b].filter(Boolean);
    if (involved.some((id) => (actorExposure[id] || 0) >= 2)) continue;

    selected.push(item);
    similarSet.add(simKey);
    for (const id of involved) actorExposure[id] = (actorExposure[id] || 0) + 1;
  }

  return selected;
}

function buildNewspaper(state, rng) {
  const deduped = dedupeForHeadlines(state.todayLogs);
  const headlines = deduped.map((logItem) => {
    const group = logItem.typeGroup || TYPE_GROUP[logItem.type] || "SOCIAL";
    const a = getNpc(state, logItem.actors[0]);
    const b = logItem.targets[0] ? getNpc(state, logItem.targets[0]) : a;
    const topicName = logItem.context.topicKey ? SECRET_TOPICS[logItem.context.topicKey] : "의혹";
    const vars = {
      A: a.name,
      B: b.name,
      T: b.name,
      topicName,
      place: WORLD.locationName[logItem.context.place] || "광장",
    };
    const newsKey = NEWS_KEY_BY_TYPE[logItem.type] || "news.alliance.major";
    return {
      typeGroup: group,
      sourceType: logItem.type,
      importance: logItem.importance,
      title: renderText(rng, newsKey, vars),
      summary: choice(rng, SUMMARY_BY_GROUP[group] || SUMMARY_BY_GROUP.SOCIAL),
    };
  });

  while (headlines.length < CONFIG.headlineCount) {
    headlines.push({
      typeGroup: "SOCIAL",
      sourceType: "NONE",
      importance: 0,
      title: "오늘은 비교적 조용한 하루",
      summary: "대형 사건은 없었지만 관계 변화는 계속 누적되고 있다.",
    });
  }

  state.headlines = headlines;
}

function chooseAction(npc, state, rng) {
  const candidates = buildActionCandidates(state, npc, rng);
  if (candidates.length === 0) return null;
  return softmaxSample(rng, candidates, CONFIG.softmaxTemp);
}

function nextDay(state) {
  const rng = mulberry32(state.seed + state.day * 9973);
  state.todayLogs = [];

  dailySetup(state, rng);

  for (const npcId of sortNpcIds(state)) {
    const npc = getNpc(state, npcId);
    const actionsCount = randRangeInt(rng, CONFIG.actionsPerDayMin, CONFIG.actionsPerDayMax);
    for (let i = 0; i < actionsCount; i += 1) {
      const action = chooseAction(npc, state, rng);
      if (action) applyAction(state, action, rng);
    }
  }

  const candidates = generateEventCandidates(state, rng);
  const pickedEvents = pickEvents(candidates);
  for (const ev of pickedEvents) applyEvent(state, ev);

  buildNewspaper(state, rng);
  state.day += 1;
  state.updatedAt = new Date().toISOString();
  return state;
}

function migrateSave(raw) {
  const data = { ...raw };
  if (!data.saveVersion) data.saveVersion = 0;
  if (data.saveVersion === 0) {
    data.saveVersion = 1;
    if (!data.headlines) data.headlines = [];
    if (!data.todayLogs) data.todayLogs = [];
  }
  if (!data.secrets) data.secrets = initSecrets();
  return data;
}

function save(state) {
  const payload = {
    ...state,
    saveVersion: SAVE_VERSION,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
}

function load() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return migrateSave(parsed);
  } catch {
    return null;
  }
}

function topRelations(state, npcId) {
  const rels = Object.values(state.relations).filter((r) => r.from === npcId);
  rels.sort((a, b) => {
    const sa = a.stats.affinity + a.stats.trust - a.stats.resentment;
    const sb = b.stats.affinity + b.stats.trust - b.stats.resentment;
    return sb - sa;
  });
  return rels.slice(0, 3);
}

function render(state) {
  const worldInfo = document.getElementById("world-info");
  worldInfo.textContent = `Day ${state.day} | 날씨: ${WORLD.weatherName[state.environment.weather]} | 이벤트: ${WORLD.eventName[state.environment.event]} | Seed: ${state.seed}`;

  const npcList = document.getElementById("npc-list");
  npcList.innerHTML = "";
  const npcs = [...state.npcs].sort((a, b) => b.emotions.stress - a.emotions.stress || a.name.localeCompare(b.name));
  for (const npc of npcs) {
    const li = document.createElement("li");
    li.className = "npc-item";

    const btn = document.createElement("button");
    btn.textContent = `${npc.name} (${npc.role}) | Stress ${npc.emotions.stress}`;
    btn.addEventListener("click", () => showNpcDetail(state, npc.id));

    const bar = document.createElement("div");
    bar.className = "bar";
    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.width = `${npc.emotions.stress}%`;
    bar.appendChild(fill);

    li.appendChild(btn);
    li.appendChild(bar);
    npcList.appendChild(li);
  }

  const headlines = document.getElementById("headlines");
  headlines.innerHTML = "";
  state.headlines.forEach((h) => {
    const el = document.createElement("div");
    el.className = "headline";
    el.innerHTML = `<div class="headline-title">${h.title}</div><div class="headline-summary">${h.summary}</div>`;
    headlines.appendChild(el);
  });

  const logList = document.getElementById("log-list");
  logList.innerHTML = "";
  const logs = [...state.todayLogs].sort((a, b) => b.importance - a.importance);
  for (const log of logs) {
    const div = document.createElement("div");
    div.className = "log-item";
    div.textContent = `[${log.type}] ${log.text}`;
    logList.appendChild(div);
  }
}

function showNpcDetail(state, npcId) {
  const npc = getNpc(state, npcId);
  const container = document.getElementById("npc-detail");
  const tops = topRelations(state, npcId)
    .map((rel) => {
      const target = getNpc(state, rel.to);
      return `<li>${target.name}: 호감 ${rel.stats.affinity}, 신뢰 ${rel.stats.trust}, 원망 ${rel.stats.resentment}</li>`;
    })
    .join("");

  const recent = npc.memory.recent.slice(0, 10).map((m) => `<li>Day ${m.day} - ${m.type}</li>`).join("") || "<li>없음</li>";

  container.innerHTML = `
    <h3>${npc.name}</h3>
    <p>직업: ${npc.role} | 위치: ${WORLD.locationName[npc.location]}</p>
    <p>감정: 스트레스 ${npc.emotions.stress} / 행복 ${npc.emotions.happiness} / 분노 ${npc.emotions.anger}</p>
    <p>최근 기억:</p>
    <ul>${recent}</ul>
    <p>관계 TOP3:</p>
    <ul>${tops || "<li>없음</li>"}</ul>
  `;
  document.getElementById("npc-modal").classList.remove("hidden");
}

function setupDebugButtons(stateRef) {
  const status = document.getElementById("debug-status");

  document.getElementById("debug-fight").addEventListener("click", () => {
    if (!stateRef.state) return;
    const rel = getRelation(stateRef.state, "npc_minseok", "npc_sea");
    const minseok = getNpc(stateRef.state, "npc_minseok");
    minseok.emotions.anger = 95;
    rel.stats.resentment = 80;
    status.textContent = "FIGHT 조건 주입 완료";
    save(stateRef.state);
    render(stateRef.state);
  });

  document.getElementById("debug-rumor").addEventListener("click", () => {
    if (!stateRef.state) return;
    stateRef.state.rumors.push({
      id: `debug_r_${Date.now()}`,
      topicNpcId: "npc_doyun",
      originNpcId: "npc_harin",
      topicKey: "doyun_favor",
      severity: 0.8,
      spread: 0.8,
    });
    status.textContent = "SCANDAL/EXPOSE 조건 주입 완료";
    save(stateRef.state);
    render(stateRef.state);
  });
}

function showScreen(name) {
  const start = document.getElementById("start-screen");
  const game = document.getElementById("game-screen");
  if (name === "game") {
    start.classList.add("hidden");
    game.classList.remove("hidden");
  } else {
    game.classList.add("hidden");
    start.classList.remove("hidden");
  }
}

function openGame(stateRef, state) {
  stateRef.state = state;
  document.getElementById("seed-input").value = String(state.seed);
  render(stateRef.state);
  showScreen("game");
}

function bootstrap() {
  const stateRef = { state: null };
  const startSeedInput = document.getElementById("start-seed-input");
  const startStatus = document.getElementById("start-status");
  const seedInput = document.getElementById("seed-input");

  const saved = load();
  startSeedInput.value = String(saved ? saved.seed : Date.now() % 1000000000);
  startStatus.textContent = saved
    ? `저장 데이터 감지: Day ${saved.day}, Seed ${saved.seed}`
    : "저장 데이터가 없습니다. 새 게임을 시작하세요.";

  document.getElementById("start-seed-random").addEventListener("click", () => {
    startSeedInput.value = String(Math.floor(Math.random() * 1000000000));
  });

  document.getElementById("start-new-game").addEventListener("click", () => {
    const seed = Number(startSeedInput.value);
    if (!Number.isFinite(seed)) {
      startStatus.textContent = "유효한 Seed를 입력해주세요.";
      return;
    }
    const state = initGame(Math.floor(seed));
    buildNewspaper(state, mulberry32(state.seed));
    save(state);
    openGame(stateRef, state);
    startStatus.textContent = `새 게임 시작: Seed ${state.seed}`;
  });

  document.getElementById("start-load-game").addEventListener("click", () => {
    const loaded = load();
    if (!loaded) {
      startStatus.textContent = "불러올 저장 데이터가 없습니다.";
      return;
    }
    openGame(stateRef, loaded);
    startStatus.textContent = `저장 데이터 불러옴: Day ${loaded.day}`;
  });

  document.getElementById("back-to-start").addEventListener("click", () => {
    const latest = load();
    startStatus.textContent = latest
      ? `현재 저장: Day ${latest.day}, Seed ${latest.seed}`
      : "저장 데이터가 없습니다.";
    showScreen("start");
  });

  document.getElementById("seed-apply").addEventListener("click", () => {
    const seed = Number(seedInput.value);
    if (!Number.isFinite(seed)) return;
    stateRef.state = initGame(Math.floor(seed));
    buildNewspaper(stateRef.state, mulberry32(stateRef.state.seed));
    save(stateRef.state);
    render(stateRef.state);
  });

  document.getElementById("seed-random").addEventListener("click", () => {
    const seed = Math.floor(Math.random() * 1000000000);
    seedInput.value = String(seed);
    stateRef.state = initGame(seed);
    buildNewspaper(stateRef.state, mulberry32(seed));
    save(stateRef.state);
    render(stateRef.state);
  });

  document.getElementById("next-day").addEventListener("click", () => {
    if (!stateRef.state) return;
    nextDay(stateRef.state);
    save(stateRef.state);
    render(stateRef.state);
  });

  document.getElementById("save-btn").addEventListener("click", () => {
    if (!stateRef.state) return;
    save(stateRef.state);
    document.getElementById("debug-status").textContent = "저장 완료";
  });

  document.getElementById("load-btn").addEventListener("click", () => {
    const loaded = load();
    if (loaded) {
      stateRef.state = loaded;
      seedInput.value = String(loaded.seed);
      document.getElementById("debug-status").textContent = "불러오기 완료";
      render(stateRef.state);
    }
  });

  document.getElementById("modal-close").addEventListener("click", () => {
    document.getElementById("npc-modal").classList.add("hidden");
  });

  document.getElementById("npc-modal").addEventListener("click", (e) => {
    if (e.target.id === "npc-modal") document.getElementById("npc-modal").classList.add("hidden");
  });

  setupDebugButtons(stateRef);
  showScreen("start");
}

bootstrap();
