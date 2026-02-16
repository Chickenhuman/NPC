const CONFIG = {
  initialParticipants: 8,
  minParticipants: 1,
  seasonDays: 20,
  hostActionsPerDay: 1,
  day1To2DeathDisabled: true,
  enableHostInfluence: false,
  enableFreeShockToken: true,
  actionTypes: ["TALK", "FORM_ALLIANCE", "BREAK_ALLIANCE", "FLIRT", "GOSSIP", "BETRAY", "INTIMIDATE", "PROTECT"],
};

const HOST_ACTIONS = {
  BOOST_POINTS: { needB: false, needsParam: false },
  REDUCE_STRESS: { needB: false, needsParam: false },
  SPREAD_RUMOR: { needB: true, needsParam: false },
  INCREASE_ATTRACTION: { needB: true, needsParam: false },
  TRIGGER_CONFLICT: { needB: true, needsParam: true },
  RIG_GAME_DIFFICULTY: { needB: false, needsParam: true },
};

const SAVE_KEY = "island_broadcast_dark_survival_v1";

const HOST_BASE_FOOTPRINT = {
  BOOST_POINTS: 15,
  REDUCE_STRESS: 10,
  SPREAD_RUMOR: 12,
  INCREASE_ATTRACTION: 18,
  TRIGGER_CONFLICT: 20,
  RIG_GAME_DIFFICULTY: 25,
};

const HOST_NARRATIVE_KEY = {
  BOOST_POINTS: "host.note.favor",
  REDUCE_STRESS: "host.note.relief",
  SPREAD_RUMOR: "host.note.rumor",
  INCREASE_ATTRACTION: "host.note.twist",
  TRIGGER_CONFLICT: "host.note.conflict",
  RIG_GAME_DIFFICULTY: "host.note.rig",
};

const HOST_ACTION_LABEL = {
  BOOST_POINTS: "점수 증폭",
  REDUCE_STRESS: "스트레스 완화",
  SPREAD_RUMOR: "루머 확산",
  INCREASE_ATTRACTION: "호감 조작",
  TRIGGER_CONFLICT: "충돌 유도",
  RIG_GAME_DIFFICULTY: "난이도 조작",
};

const ROLE_LABEL = {
  STRATEGIST: "전략가",
  CHARMER: "매혹자",
  REBEL: "반항아",
  ICE_QUEEN: "빙결형",
  UNSTABLE: "불안정형",
  CARETAKER: "보호자",
  OPPORTUNIST: "기회주의자",
  SHADOW: "그림자",
};

const NARRATIVE_TEMPLATES = {
  headline: {
    death: {
      moderate: ["철창의 밤이 끝난 뒤, 한 자리가 비었다", "밤의 공백이 오늘의 순위를 바꿨다"],
      intense: ["새벽 방송이 이름 하나를 지웠다", "남겨진 일곱은 서로를 오래 보지 못했다"],
    },
    violence: {
      moderate: ["침묵이 먼저 깨졌고 질서가 흔들렸다", "한 번의 충돌이 균형을 밀어냈다"],
      intense: ["억눌린 감정이 광장 한복판에서 폭발했다", "섬의 규칙은 오늘 더 날카로워졌다"],
    },
    betrayal: {
      moderate: ["동맹은 계약이었고, 계약은 파기됐다", "어제의 약속이 오늘의 무기가 됐다"],
      intense: ["가장 가까운 손이 가장 먼저 등을 밀었다", "신뢰 붕괴가 순위표를 찢어냈다"],
    },
    romance: {
      moderate: ["두 사람의 거리가 줄어든 밤", "속삭임이 연합보다 빠르게 퍼졌다"],
      intense: ["애정의 온기가 질투의 속도를 높였다", "눈빛의 합의가 전장을 재배치했다"],
    },
    ranking: {
      moderate: ["정상은 유지됐고 바닥은 더 낮아졌다", "순위표는 조용히 권력을 재분배했다"],
      intense: ["왕좌는 더 높아졌고 추락은 더 가팔라졌다", "하루 만에 위계가 다시 쓰였다"],
    },
    powerShift: {
      moderate: ["새로운 서열이 만들어졌다", "권력의 축이 옮겨갔다"],
      intense: ["왕좌는 비틀렸고 추격자는 얼굴을 드러냈다", "지배의 문장이 하루 만에 바뀌었다"],
    },
  },
  subtitle: {
    observational: ["낮에는 웃음이 있었지만 밤에는 계산이 남았다.", "오늘의 기록은 우연처럼 보였고, 우연은 반복됐다."],
    tense: ["누구도 먼저 확신하지 못한 채 다음 신호를 기다렸다.", "연결은 약해졌고 시선은 더 짧아졌다."],
    dark: ["안전해 보이는 얼굴부터 균열이 시작됐다.", "관계의 표면 아래에서 불신이 자라났다."],
    oppressive: ["모든 선택이 누군가의 퇴장을 예고하는 밤이었다.", "섬은 침묵으로도 위협을 전달했다."],
  },
  body: {
    deathIntro: [
      "{victim}는 새벽 호출에 응답하지 않았다.",
      "첫 빛이 닿기 전에 {victim}의 자리는 비어 있었다.",
    ],
    cageLine: [
      "{lastPlace}는 섬 중앙 철창에서 밤을 버텼다.",
      "철창의 조명은 {lastPlace}의 표정을 오래 붙잡아 두었다.",
    ],
    cageRepeat: [
      "{lastPlace}는 또 한 번 같은 철창으로 돌아갔다.",
      "반복된 철창의 밤이 {lastPlace}의 호흡을 더 짧게 만들었다.",
    ],
    betrayalLine: [
      "{betrayer}와 {betrayed} 사이의 약속은 순위 앞에서 무너졌다.",
      "한때 같은 편이던 {betrayer}-{betrayed}는 오늘 다른 문장을 말했다.",
    ],
    romanceLine: [
      "{loverA}와 {loverB}는 대화를 줄였지만 거리는 더 가까워졌다.",
      "{loverA}-{loverB}의 침묵은 오히려 명확한 신호로 읽혔다.",
    ],
    jealousyLine: [
      "주변의 시선은 오래 머물렀고, 몇몇은 미소를 거두지 못했다.",
      "호감의 이동은 곧바로 질투의 수치로 번졌다.",
    ],
    fearReaction: [
      "남은 참가자들은 서로를 오래 바라보지 못했다.",
      "다음 밤을 가정하는 대화는 끝까지 완성되지 않았다.",
    ],
    suspicionHint: [
      "일부 참가자들은 균형이 이상하게 맞아떨어진다고 속삭였다.",
      "우연치고는 너무 정확한 결과라는 말이 짧게 떠돌았다.",
    ],
    foreshadow: [
      "오늘의 정리는 내일의 충돌을 유예했을 뿐이었다.",
      "정적은 평온이 아니라 대기 중인 신호에 가까웠다.",
    ],
    powerShift: [
      "{shiftActor}의 급상승은 상위권의 표정을 바꿨다.",
      "{shiftActor}가 세 칸 이상 움직이자 기존 동맹은 다시 계산을 시작했다.",
    ],
  },
};

const ARCHETYPES = [
  {
    id: "p1",
    role: "STRATEGIST",
    name: "기현",
    gender: "M",
    age: 34,
    appearance: 65,
    ambition: 90,
    stress: 30,
    fear: 20,
    charisma: 72,
    jealousy: 28,
    trustBaseline: -2,
    traits: {
      empathy: 0.2,
      betrayalBias: 0.85,
      trustGainMultiplier: 1,
      attractionGainMultiplier: 1,
      allianceFormBias: 0.2,
      allianceBreakBias: 0.4,
      performanceVariance: 1,
      moralCold: true,
    },
  },
  {
    id: "p2",
    role: "CHARMER",
    name: "리아",
    gender: "F",
    age: 26,
    appearance: 88,
    ambition: 65,
    stress: 25,
    fear: 20,
    charisma: 95,
    jealousy: 32,
    trustBaseline: 6,
    traits: {
      empathy: 0.55,
      betrayalBias: 0.25,
      trustGainMultiplier: 1.05,
      attractionGainMultiplier: 1.2,
      allianceFormBias: 0.4,
      allianceBreakBias: 0.1,
      performanceVariance: 1,
      moralCold: false,
    },
  },
  {
    id: "p3",
    role: "REBEL",
    name: "태건",
    gender: "M",
    age: 24,
    appearance: 75,
    ambition: 70,
    stress: 45,
    fear: 35,
    charisma: 70,
    jealousy: 36,
    trustBaseline: -4,
    traits: {
      empathy: 0.35,
      betrayalBias: 0.45,
      trustGainMultiplier: 0.95,
      attractionGainMultiplier: 1.1,
      allianceFormBias: 0.2,
      allianceBreakBias: 0.35,
      performanceVariance: 1.1,
      moralCold: false,
    },
  },
  {
    id: "p4",
    role: "ICE_QUEEN",
    name: "세린",
    gender: "F",
    age: 29,
    appearance: 82,
    ambition: 75,
    stress: 20,
    fear: 15,
    charisma: 78,
    jealousy: 22,
    trustBaseline: -15,
    traits: {
      empathy: 0.3,
      betrayalBias: 0.35,
      trustGainMultiplier: 0.6,
      attractionGainMultiplier: 0.65,
      allianceFormBias: -0.2,
      allianceBreakBias: 0.2,
      performanceVariance: 1,
      moralCold: true,
    },
  },
  {
    id: "p5",
    role: "UNSTABLE",
    name: "우진",
    gender: "M",
    age: 22,
    appearance: 55,
    ambition: 50,
    stress: 55,
    fear: 40,
    charisma: 52,
    jealousy: 34,
    trustBaseline: -6,
    traits: {
      empathy: 0.4,
      betrayalBias: 0.35,
      trustGainMultiplier: 0.9,
      attractionGainMultiplier: 0.95,
      allianceFormBias: 0.15,
      allianceBreakBias: 0.2,
      performanceVariance: 1.2,
      moralCold: false,
    },
  },
  {
    id: "p6",
    role: "CARETAKER",
    name: "다인",
    gender: "F",
    age: 31,
    appearance: 60,
    ambition: 40,
    stress: 30,
    fear: 25,
    charisma: 58,
    jealousy: 15,
    trustBaseline: 10,
    traits: {
      empathy: 0.8,
      betrayalBias: 0.1,
      trustGainMultiplier: 1.2,
      attractionGainMultiplier: 1.05,
      allianceFormBias: 0.5,
      allianceBreakBias: -0.2,
      performanceVariance: 0.95,
      moralCold: false,
    },
  },
  {
    id: "p7",
    role: "OPPORTUNIST",
    name: "노아",
    gender: "X",
    age: 27,
    appearance: 72,
    ambition: 85,
    stress: 35,
    fear: 25,
    charisma: 74,
    jealousy: 38,
    trustBaseline: -3,
    traits: {
      empathy: 0.3,
      betrayalBias: 0.75,
      trustGainMultiplier: 0.95,
      attractionGainMultiplier: 1,
      allianceFormBias: 0.9,
      allianceBreakBias: 0.9,
      performanceVariance: 1.15,
      moralCold: true,
    },
  },
  {
    id: "p8",
    role: "SHADOW",
    name: "시우",
    gender: "M",
    age: 38,
    appearance: 50,
    ambition: 60,
    stress: 20,
    fear: 10,
    charisma: 54,
    jealousy: 18,
    trustBaseline: -8,
    traits: {
      empathy: 0.45,
      betrayalBias: 0.3,
      trustGainMultiplier: 0.65,
      attractionGainMultiplier: 0.85,
      allianceFormBias: -0.15,
      allianceBreakBias: 0.15,
      performanceVariance: 1.45,
      moralCold: false,
    },
  },
];

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randFloat(min, max) {
  return min + Math.random() * (max - min);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function weightedPick(items) {
  const positive = items.map((item) => ({ ...item, w: Math.max(0.01, item.weight) }));
  const total = positive.reduce((sum, item) => sum + item.w, 0);
  let cursor = Math.random() * total;
  for (const item of positive) {
    cursor -= item.w;
    if (cursor <= 0) return item;
  }
  return positive[positive.length - 1];
}

function hashString(input) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function createDeterministicRng(seed) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function participantById(state, id) {
  return state.participants.find((p) => p.id === id);
}

function aliveParticipants(state) {
  return state.participants.filter((p) => p.alive);
}

function pairKey(aId, bId) {
  return [aId, bId].sort().join("::");
}

function toPercent(v) {
  return `${Math.round(v)}%`;
}

function createParticipantFromArchetype(archetype) {
  return {
    id: archetype.id,
    role: archetype.role,
    name: archetype.name,
    gender: archetype.gender,
    age: archetype.age,
    appearance: archetype.appearance,
    points: 0,
    alive: true,
    stress: archetype.stress,
    fear: archetype.fear,
    ambition: archetype.ambition,
    charisma: archetype.charisma,
    jealousy: randInt(10, 40),
    loneliness: 30,
    stability: clamp(100 - archetype.stress, 0, 100),
    suspicion: randInt(0, 10),
    paranoia: 0,
    publicImage: clamp(50 + archetype.charisma * 0.2 + randInt(-10, 10), 0, 100),
    instabilityScore: 0,
    trustBaseline: archetype.trustBaseline,
    traits: { ...archetype.traits },
    trust: {},
    attraction: {},
    allianceId: null,
    previousNightCage: false,
    wasNightCageToday: false,
    difficultyOffset: 0,
    latestRank: null,
    lowRankStreak: 0,
    violentEventBonus: 0,
    nextGameModifier: 0,
    riggedLastDay: null,
  };
}

function initParticipants() {
  if (ARCHETYPES.length !== CONFIG.initialParticipants) {
    throw new Error(`Archetype count mismatch: expected ${CONFIG.initialParticipants}, got ${ARCHETYPES.length}`);
  }

  const participants = ARCHETYPES.map((archetype) => createParticipantFromArchetype(archetype));

  for (const a of participants) {
    for (const b of participants) {
      if (a.id === b.id) continue;
      a.trust[b.id] = clamp(randInt(-20, 20) + (a.trustBaseline ?? 0), -100, 100);
      const attraction = b.appearance * 0.4 + b.charisma * 0.3 + randInt(-20, 20);
      a.attraction[b.id] = clamp(Math.round(attraction), 0, 100);
    }
  }

  applyInitialRelationSeeds(participants);
  for (const p of participants) {
    p.paranoia = clamp(p.fear * 0.5 + p.suspicion * 0.5, 0, 100);
  }
  return participants;
}

function applyInitialRelationSeeds(participants) {
  const byRole = {};
  for (const p of participants) byRole[p.role] = p;

  const strategist = byRole.STRATEGIST;
  const charmer = byRole.CHARMER;
  const rebel = byRole.REBEL;
  const iceQueen = byRole.ICE_QUEEN;
  const unstable = byRole.UNSTABLE;
  const caretaker = byRole.CARETAKER;

  if (charmer) {
    for (const p of participants) {
      if (p.id === charmer.id) continue;
      p.attraction[charmer.id] = clamp((p.attraction[charmer.id] ?? 0) + 20, 0, 100);
    }
  }

  if (charmer && rebel) {
    charmer.attraction[rebel.id] = 80;
    rebel.attraction[charmer.id] = 80;
  }
  if (strategist && iceQueen) {
    strategist.attraction[iceQueen.id] = 65;
  }

  if (strategist && rebel) {
    strategist.trust[rebel.id] = -60;
    rebel.trust[strategist.id] = -60;
  }
  if (iceQueen && charmer) {
    iceQueen.trust[charmer.id] = -40;
  }

  if (caretaker && unstable) {
    caretaker.trust[unstable.id] = 65;
    unstable.trust[caretaker.id] = 65;
  }
}

function initState() {
  const participants = initParticipants();
  const state = {
    seasonSeed: randInt(1, 2147483640),
    day: 1,
    participants,
    hostActionsUsedToday: 0,
    hostSuspicionGlobal: 0,
    hostAgendaTargetId: null,
    broadcastBias: 0,
    hostInfluence: 50,
    freeShockTokenToday: false,
    globalTension: 0,
    broadcastTone: "neutral",
    alliances: {},
    relationships: {},
    rumors: [],
    rankings: [],
    top3: [],
    cageVictimId: null,
    triangleDetected: null,
    latestDeath: null,
    deaths: [],
    dramaScore: 0,
    dailyLog: [],
    dailyBroadcast: "시즌 초기화 완료.",
    dailyRelationshipEvents: [],
    newAlliancesToday: [],
    confrontationEventsToday: [],
    hostEventToday: false,
    detectionEventToday: false,
    hostLogs: [],
    hostProducerNote: "",
    storyMemory: {
      previousRivalries: [],
      previousCageVictims: [],
      previousRelationships: [],
      lastUsedTemplate: {},
    },
    pendingHostAction: null,
    gameOver: false,
    winnerId: null,
  };
  saveState(state);
  return state;
}

function saveState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.participants)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function hydrateState(state) {
  if (typeof state.seasonSeed !== "number") state.seasonSeed = randInt(1, 2147483640);
  if (typeof state.hostActionsUsedToday !== "number") state.hostActionsUsedToday = 0;
  if (typeof state.hostSuspicionGlobal !== "number") state.hostSuspicionGlobal = state.suspicion ?? 0;
  if (!("hostAgendaTargetId" in state)) state.hostAgendaTargetId = null;
  if (typeof state.broadcastBias !== "number") state.broadcastBias = 0;
  if (typeof state.hostInfluence !== "number") state.hostInfluence = 50;
  if (typeof state.freeShockTokenToday !== "boolean") state.freeShockTokenToday = false;
  if (typeof state.globalTension !== "number") state.globalTension = 0;
  if (typeof state.broadcastTone !== "string") state.broadcastTone = "neutral";
  if (!Array.isArray(state.hostLogs)) state.hostLogs = [];
  if (typeof state.hostProducerNote !== "string") state.hostProducerNote = "";
  if (!state.storyMemory) {
    state.storyMemory = {
      previousRivalries: [],
      previousCageVictims: [],
      previousRelationships: [],
      lastUsedTemplate: {},
    };
  }
  if (!Array.isArray(state.rumors)) state.rumors = [];
  if (!("detectionEventToday" in state)) state.detectionEventToday = false;
  if (!state.relationships) state.relationships = {};
  if (!Array.isArray(state.dailyRelationshipEvents)) state.dailyRelationshipEvents = [];
  if (!Array.isArray(state.newAlliancesToday)) state.newAlliancesToday = [];
  if (!Array.isArray(state.confrontationEventsToday)) state.confrontationEventsToday = [];
  if (typeof state.dramaScore !== "number") state.dramaScore = 0;
  if (!("triangleDetected" in state)) state.triangleDetected = null;
  if (!("hostEventToday" in state)) state.hostEventToday = false;

  for (const p of state.participants) {
    if (typeof p.jealousy !== "number") p.jealousy = randInt(10, 40);
    if (typeof p.loneliness !== "number") p.loneliness = 30;
    if (typeof p.stability !== "number") p.stability = clamp(100 - p.stress, 0, 100);
    if (typeof p.lowRankStreak !== "number") p.lowRankStreak = 0;
    if (typeof p.violentEventBonus !== "number") p.violentEventBonus = 0;
    if (typeof p.nextGameModifier !== "number") p.nextGameModifier = 0;
    if (!("riggedLastDay" in p)) p.riggedLastDay = null;
    if (typeof p.suspicion !== "number") p.suspicion = randInt(0, 10);
    if (typeof p.publicImage !== "number") p.publicImage = clamp(50 + p.charisma * 0.2 + randInt(-10, 10), 0, 100);
    if (typeof p.instabilityScore !== "number") p.instabilityScore = 0;
    p.paranoia = clamp(p.fear * 0.6 + p.suspicion * 0.4, 0, 100);
    if (!p.role) p.role = "UNDEFINED";
    if (!p.traits) p.traits = {};
  }
  return state;
}

function livingTargets(state, actorId) {
  return aliveParticipants(state).filter((p) => p.id !== actorId);
}

function isRival(a, b) {
  return (a.trust[b.id] ?? 0) < -40 || (b.trust[a.id] ?? 0) < -40;
}

function getDirectIdsFromAction(action) {
  const ids = [];
  if (action.targetA) ids.push(action.targetA);
  if (action.targetB) ids.push(action.targetB);
  return [...new Set(ids)];
}

function witnessFactorForParticipant(state, participant, directIds) {
  if (directIds.includes(participant.id)) return 1;
  const direct = directIds.map((id) => participantById(state, id)).filter(Boolean);
  for (const d of direct) {
    const allianceLinked = participant.allianceId && d.allianceId && participant.allianceId === d.allianceId;
    const relationLinked = !!state.relationships[pairKey(participant.id, d.id)];
    if (allianceLinked || relationLinked || isRival(participant, d)) return 0.6;
  }
  return 0.2;
}

function helpedAction(type) {
  return type === "BOOST_POINTS" || type === "REDUCE_STRESS";
}

function timesHelpedLast5Days(state, targetId) {
  return state.hostLogs.filter(
    (log) => log.day >= state.day - 4 && helpedAction(log.type) && log.params?.targetA === targetId
  ).length;
}

function allianceBonus(state, p) {
  if (!p.allianceId) return 0;
  const alliance = state.alliances[p.allianceId];
  if (!alliance || !Array.isArray(alliance.members)) return 0;
  const aliveMembers = alliance.members.filter((id) => participantById(state, id)?.alive);
  if (aliveMembers.length < 2) return 0;
  return 0.1;
}

function growTrust(state, from, toId, delta) {
  const allied = from.allianceId && from.allianceId === participantById(state, toId)?.allianceId;
  const trustGainMultiplier = from.traits?.trustGainMultiplier ?? 1;
  const desperationBoost = from.loneliness > 70 ? 1.2 : 1;
  const scaledDelta = delta > 0 ? delta * trustGainMultiplier * desperationBoost : delta;
  const realDelta = allied && scaledDelta > 0 ? scaledDelta * 1.15 : scaledDelta;
  from.trust[toId] = clamp(from.trust[toId] + realDelta, -100, 100);
}

function growAttraction(from, toId, delta) {
  const attractionGainMultiplier = from.traits?.attractionGainMultiplier ?? 1;
  const scaledDelta = delta > 0 ? delta * attractionGainMultiplier : delta;
  from.attraction[toId] = clamp((from.attraction[toId] ?? 0) + scaledDelta, 0, 100);
}

function applySocialAction(state, actor, target, actionType) {
  const log = [];
  if (!actor || !target) return log;
  const trustGain = randInt(5, 15);

  if (actionType === "TALK") {
    growTrust(state, actor, target.id, trustGain);
    actor.stress = clamp(actor.stress - 3, 0, 100);
    target.stress = clamp(target.stress - 1, 0, 100);
    log.push(`${actor.name}가 ${target.name}와 대화`);
  }

  if (actionType === "FORM_ALLIANCE") {
    growTrust(state, actor, target.id, trustGain);
    growAttraction(actor, target.id, 5);
    log.push(`${actor.name}가 ${target.name}에게 동맹 신호`);
  }

  if (actionType === "BREAK_ALLIANCE") {
    if (actor.allianceId && actor.allianceId === target.allianceId) {
      dissolveAlliance(state, actor.allianceId, `${actor.name}가 동맹 파기`);
    }
    growTrust(state, actor, target.id, -12);
    actor.stress = clamp(actor.stress + 4, 0, 100);
    log.push(`${actor.name}가 ${target.name}와 동맹 파기`);
  }

  if (actionType === "FLIRT") {
    growAttraction(actor, target.id, 8);
    growTrust(state, actor, target.id, trustGain);
    target.fear = clamp(target.fear - 2, 0, 100);
    log.push(`${actor.name}가 ${target.name}에게 호감 표현`);
  }

  if (actionType === "GOSSIP") {
    growTrust(state, actor, target.id, -6);
    target.stress = clamp(target.stress + 6, 0, 100);
    target.fear = clamp(target.fear + 4, 0, 100);
    log.push(`${actor.name}가 ${target.name} 관련 루머 유포`);
  }

  if (actionType === "BETRAY") {
    growTrust(state, actor, target.id, -20);
    target.stress = clamp(target.stress + 20, 0, 100);
    target.fear = clamp(target.fear + 6, 0, 100);
    target.jealousy = clamp(target.jealousy + 15, 0, 100);
    if (actor.allianceId && actor.allianceId === target.allianceId) {
      dissolveAlliance(state, actor.allianceId, `${actor.name}의 BETRAY로 동맹 붕괴`);
    }
    log.push(`${actor.name}가 ${target.name}를 배신`);
  }

  if (actionType === "INTIMIDATE") {
    growTrust(state, actor, target.id, -10);
    target.fear = clamp(target.fear + 9, 0, 100);
    target.stress = clamp(target.stress + 5, 0, 100);
    log.push(`${actor.name}가 ${target.name}를 위협`);
  }

  if (actionType === "PROTECT") {
    growTrust(state, actor, target.id, trustGain);
    target.stress = clamp(target.stress - 8, 0, 100);
    target.fear = clamp(target.fear - 6, 0, 100);
    log.push(`${actor.name}가 ${target.name}를 보호`);
  }

  return log;
}

function chooseTarget(actor, targets) {
  const scored = targets.map((target) => {
    const trust = actor.trust[target.id] ?? 0;
    const attraction = actor.attraction[target.id] ?? 0;
    const weight =
      actor.ambition * 0.3 + actor.stress * 0.2 + (100 - trust) * 0.2 + attraction * 0.2 + randInt(0, 20);
    return { target, weight };
  });
  return weightedPick(scored).target;
}

function chooseActionType(actor, target) {
  const trust = actor.trust[target.id] ?? 0;
  const attraction = actor.attraction[target.id] ?? 0;
  const betrayalBias = actor.traits?.betrayalBias ?? 0.3;
  const empathy = actor.traits?.empathy ?? 0.5;
  const allianceFormBias = actor.traits?.allianceFormBias ?? 0;
  const allianceBreakBias = actor.traits?.allianceBreakBias ?? 0;
  const base = {
    TALK: 14,
    FORM_ALLIANCE: (trust > 45 ? 12 : 5) + allianceFormBias * 8,
    BREAK_ALLIANCE: (actor.allianceId && actor.allianceId === target.allianceId ? 10 : 2) + allianceBreakBias * 8,
    FLIRT: attraction > 55 ? 13 : 6,
    GOSSIP: 8 + actor.ambition * 0.08,
    BETRAY: (actor.ambition > 70 ? 10 : 3) + betrayalBias * 11 + (1 - empathy) * 5,
    INTIMIDATE: 5 + actor.stress * 0.07 + (1 - empathy) * 3,
    PROTECT: 7 + Math.max(0, trust * 0.06),
  };

  if (actor.jealousy > 60) {
    base.GOSSIP *= 1.25;
    base.BETRAY *= 1.2;
  }
  if (actor.jealousy > 80) {
    base.INTIMIDATE *= 1.15;
    base.BETRAY *= 1.15;
  }

  const weighted = CONFIG.actionTypes.map((type) => ({ type, weight: base[type] + Math.random() * 4 }));
  return weightedPick(weighted).type;
}

function autoFormAlliances(state) {
  const people = aliveParticipants(state);
  for (let i = 0; i < people.length; i += 1) {
    for (let j = i + 1; j < people.length; j += 1) {
      const a = people[i];
      const b = people[j];
      if (a.allianceId || b.allianceId) continue;
      if (a.trust[b.id] > 60 && b.trust[a.id] > 60 && a.attraction[b.id] > 50 && b.attraction[a.id] > 50) {
        const id = `alliance_${state.day}_${a.id}_${b.id}`;
        state.alliances[id] = { id, members: [a.id, b.id], createdDay: state.day };
        a.allianceId = id;
        b.allianceId = id;
        state.newAlliancesToday.push([a.id, b.id]);
        state.dailyLog.push(`[동맹] ${a.name} + ${b.name}`);
      }
    }
  }
}

function dissolveAlliance(state, allianceId, reason) {
  const alliance = state.alliances[allianceId];
  if (!alliance) return;
  for (const id of alliance.members) {
    const p = participantById(state, id);
    if (p) p.allianceId = null;
  }
  delete state.alliances[allianceId];
  if (reason) state.dailyLog.push(`[동맹 붕괴] ${reason}`);
}

function checkBetrayalTrigger(state, actor, target) {
  if (!actor.allianceId || actor.allianceId !== target.allianceId) return false;
  const pointsDiff = actor.points - target.points;
  return (actor.ambition > 70 && pointsDiff > 5) || actor.stress > 75;
}

function applyBetrayalEffect(state, actor, target) {
  growTrust(state, actor, target.id, -40);
  target.stress = clamp(target.stress + 20, 0, 100);
  target.fear = clamp(target.fear + 10, 0, 100);
  target.jealousy = clamp(target.jealousy + 15, 0, 100);
  dissolveAlliance(state, actor.allianceId, `${actor.name}의 배신`);
  state.dailyLog.push(`[배신 발동] ${actor.name} -> ${target.name}`);
}

function socialPhase(state) {
  const people = aliveParticipants(state);
  for (const actor of people) {
    const count = randInt(1, 2);
    for (let i = 0; i < count; i += 1) {
      const targets = livingTargets(state, actor.id);
      if (!targets.length) continue;
      const target = chooseTarget(actor, targets);
      const actionType = chooseActionType(actor, target);
      const logs = applySocialAction(state, actor, target, actionType);
      logs.forEach((line) => state.dailyLog.push(`[사회] ${line}`));

      if (checkBetrayalTrigger(state, actor, target)) {
        applyBetrayalEffect(state, actor, target);
      }
    }
  }

  autoFormAlliances(state);
}

function gamePhase(state) {
  const scored = aliveParticipants(state).map((p) => {
    const previousRank = p.latestRank;
    const variance = p.traits?.performanceVariance ?? 1;
    const randomBase = randFloat(0, 100);
    const varianceJitter = randFloat(-20, 20) * (variance - 1);
    const base = randomBase + varianceJitter + p.ambition * 0.3 - p.stress * 0.2 - p.difficultyOffset + p.nextGameModifier;
    const bonus = base * allianceBonus(state, p);
    const performance = base + bonus;
    return { id: p.id, performance, previousRank };
  });

  scored.sort((a, b) => b.performance - a.performance);
  state.rankings = scored;

  scored.forEach((entry, idx) => {
    const p = participantById(state, entry.id);
    p.prevRankForStory = entry.previousRank ?? null;
    p.latestRank = idx + 1;
    if (p.riggedLastDay && entry.previousRank && Math.abs(entry.previousRank - p.latestRank) >= 3) {
      p.suspicion = clamp(p.suspicion + 15, 0, 100);
    }
    p.nextGameModifier = 0;
    p.riggedLastDay = null;
  });

  state.dailyLog.push(`[게임] 일일 경쟁 완료 (${scored.length}명 생존)`);
}

function rankingUpdate(state) {
  const ranked = state.rankings;
  const aliveCount = ranked.length;
  ranked.forEach((r, i) => {
    const p = participantById(state, r.id);
    if (i === 0) p.points += 5;
    if (i === 1) p.points += 3;
    if (i === 2) p.points += 2;

    const lowRankThreshold = Math.max(1, aliveCount - 2);
    if (i + 1 >= lowRankThreshold) {
      p.lowRankStreak += 1;
    } else {
      p.lowRankStreak = 0;
    }
    if (p.lowRankStreak >= 2) {
      p.fear = clamp(p.fear + 10, 0, 100);
    }
  });

  if (ranked[0]) {
    const first = participantById(state, ranked[0].id);
    first.stress = clamp(first.stress - 20, 0, 100);
    first.fear = clamp(first.fear - 10, 0, 100);
    for (const other of aliveParticipants(state)) {
      if (other.id !== first.id) {
        growTrust(state, first, other.id, 2);
      }
    }
    state.dailyLog.push(`[순위] 1위 ${first.name} (+5점)`);
  }

  const bottomEntry = ranked[ranked.length - 1];
  if (bottomEntry) {
    const cage = participantById(state, bottomEntry.id);
    state.cageVictimId = cage.id;
    cage.wasNightCageToday = true;
    cage.stress = clamp(cage.stress + 30, 0, 100);
    cage.fear = clamp(cage.fear + 25, 0, 100);
    for (const other of aliveParticipants(state)) {
      if (other.id === cage.id) continue;
      growTrust(state, cage, other.id, -5);
      if (other.allianceId && other.allianceId === cage.allianceId) {
        growTrust(state, other, cage.id, 5);
      } else {
        growTrust(state, other, cage.id, -5);
      }
    }

    for (const other of aliveParticipants(state)) {
      if (other.id === cage.id) continue;
      cage.attraction[other.id] = clamp((cage.attraction[other.id] ?? 0) - 10, 0, 100);
    }

    if (cage.previousNightCage) {
      cage.stress = clamp(cage.stress + 10, 0, 100);
      cage.fear = clamp(cage.fear + 10, 0, 100);
    }

    state.dailyLog.push(`[케이지] ${cage.name} 수감`);
  }

  state.top3 = ranked.slice(0, 3).map((entry) => entry.id);
}

function tradePhase(state) {
  const people = aliveParticipants(state);
  let trades = 0;

  for (const a of people) {
    const candidates = people.filter((b) => b.id !== a.id && (a.trust[b.id] ?? 0) > 40);
    if (!candidates.length) continue;
    const b = pickRandom(candidates);
    const success = (a.trust[b.id] ?? 0) * 0.6 + (a.attraction[b.id] ?? 0) * 0.3;
    if (randFloat(0, 100) < success) {
      const donor = a.points > b.points ? a : b;
      const receiver = donor.id === a.id ? b : a;
      if (donor.points > 0) {
        donor.points -= 1;
        receiver.points += 1;
        trades += 1;
        state.dailyLog.push(`[거래] ${donor.name} -> ${receiver.name} (1점)`);
      }
    }
  }

  if (!trades) state.dailyLog.push("[거래] 성사 없음");
}

function findLatestHostLog(state, predicate) {
  return [...state.hostLogs].reverse().find(predicate);
}

function canUseHostAction(state, action) {
  const freeShockValid =
    state.freeShockTokenToday && (action.type === "SPREAD_RUMOR" || (action.type === "TRIGGER_CONFLICT" && action.param === 1));
  if (!freeShockValid && state.hostActionsUsedToday >= CONFIG.hostActionsPerDay) {
    return { ok: false, reason: "오늘 주최자 행동 횟수를 모두 사용했습니다." };
  }

  if (action.type === "BOOST_POINTS") {
    const last = findLatestHostLog(state, (log) => log.type === "BOOST_POINTS" && log.params?.targetA === action.targetA);
    if (last && last.day === state.day - 1) {
      return { ok: false, reason: "같은 대상 연속 점수 증폭은 금지됩니다." };
    }
  }

  if (action.type === "RIG_GAME_DIFFICULTY") {
    const last = findLatestHostLog(state, (log) => log.type === "RIG_GAME_DIFFICULTY" && log.params?.targetA === action.targetA);
    if (last && last.day === state.day - 1) {
      return { ok: false, reason: "같은 대상 연속 난이도 조작은 금지됩니다." };
    }
  }

  if (action.type === "TRIGGER_CONFLICT") {
    const pair = pairKey(action.targetA, action.targetB);
    const last = findLatestHostLog(
      state,
      (log) =>
        log.type === "TRIGGER_CONFLICT" &&
        log.params?.targetA &&
        log.params?.targetB &&
        pairKey(log.params.targetA, log.params.targetB) === pair
    );
    if (last && state.day - last.day <= 2) {
      return { ok: false, reason: "같은 페어 충돌 유도는 2일 쿨다운입니다." };
    }
  }

  return { ok: true, reason: "" };
}

function applyFootprintAndSuspicion(state, action, footprint) {
  const beforeGlobal = state.hostSuspicionGlobal;
  state.hostSuspicionGlobal = clamp(state.hostSuspicionGlobal + footprint * 0.15, 0, 100);
  const directIds = getDirectIdsFromAction(action);

  for (const participant of aliveParticipants(state)) {
    const witness = witnessFactorForParticipant(state, participant, directIds);
    const delta = footprint * witness * (0.2 + participant.paranoia / 200);
    participant.suspicion = clamp(participant.suspicion + delta, 0, 100);
    participant.paranoia = clamp(participant.fear * 0.6 + participant.suspicion * 0.4, 0, 100);
  }

  return state.hostSuspicionGlobal - beforeGlobal;
}

function applyHostActionDelta(state, action) {
  const a = participantById(state, action.targetA);
  const b = action.targetB ? participantById(state, action.targetB) : null;
  if (!a || !a.alive) return "대상 A가 유효하지 않습니다.";
  if (action.targetB && (!b || !b.alive || a.id === b.id)) return "대상 B가 유효하지 않습니다.";

  if (action.type === "BOOST_POINTS") {
    a.points += 2;
    a.publicImage = clamp(a.publicImage + 3, 0, 100);
    const rivals = aliveParticipants(state).filter((p) => p.id !== a.id && isRival(p, a));
    for (const rival of rivals) {
      rival.jealousy = clamp(rival.jealousy + 8, 0, 100);
      rival.suspicion = clamp(rival.suspicion + 5, 0, 100);
    }
    a.suspicion = clamp(a.suspicion + 5, 0, 100);
    return `${a.name} 점수 +2`;
  }

  if (action.type === "REDUCE_STRESS") {
    a.stress = clamp(a.stress - 20, 0, 100);
    a.fear = clamp(a.fear - 5, 0, 100);
    a.loneliness = clamp(a.loneliness - 5, 0, 100);
    return `${a.name} 스트레스 완화`;
  }

  if (action.type === "SPREAD_RUMOR" && b) {
    const trustedByOthersAvg =
      aliveParticipants(state).filter((p) => p.id !== a.id).reduce((sum, p) => sum + (a.trust[p.id] ?? 0), 0) /
      Math.max(1, aliveParticipants(state).length - 1);
    const rumor = {
      id: `rumor_${state.day}_${a.id}_${b.id}_${Date.now()}`,
      dayCreated: state.day,
      topicKey: `topic_${state.day}_${a.id}`,
      sourceId: a.id,
      targetId: b.id,
      severity: clamp(0.35 + randFloat(0, 0.15), 0, 1),
      spread: clamp(0.25 + randFloat(0, 0.15) + trustedByOthersAvg / 200, 0, 1),
      truthiness: clamp(randFloat(0.2, 0.8), 0, 1),
    };
    state.rumors.push(rumor);
    b.stress = clamp(b.stress + 8, 0, 100);
    b.publicImage = clamp(b.publicImage - 10, 0, 100);
    for (const p of aliveParticipants(state)) {
      if (p.id === b.id) continue;
      if ((p.attraction[b.id] ?? 0) > 60) p.jealousy = clamp(p.jealousy + 10, 0, 100);
    }
    return `${a.name} 출처 루머 확산 -> ${b.name}`;
  }

  if (action.type === "INCREASE_ATTRACTION" && b) {
    growAttraction(a, b.id, 15);
    growAttraction(b, a.id, 5);
    for (const p of aliveParticipants(state)) {
      if (p.id === a.id || p.id === b.id) continue;
      if ((p.attraction[b.id] ?? 0) > 60) p.jealousy = clamp(p.jealousy + 12, 0, 100);
    }
    return `${a.name}<->${b.name} 호감도 조작`;
  }

  if (action.type === "TRIGGER_CONFLICT" && b) {
    const intensity = clamp(action.param ?? 2, 1, 3);
    if (intensity === 1) {
      growTrust(state, a, b.id, -10);
      a.stress = clamp(a.stress + 5, 0, 100);
      b.stress = clamp(b.stress + 5, 0, 100);
    } else if (intensity === 2) {
      growTrust(state, a, b.id, -25);
      growTrust(state, b, a.id, -15);
      a.stress = clamp(a.stress + 10, 0, 100);
      b.stress = clamp(b.stress + 10, 0, 100);
    } else {
      growTrust(state, a, b.id, -40);
      growTrust(state, b, a.id, -30);
      a.stress = clamp(a.stress + 15, 0, 100);
      b.stress = clamp(b.stress + 15, 0, 100);
      a.fear = clamp(a.fear + 5, 0, 100);
      b.fear = clamp(b.fear + 5, 0, 100);
    }
    a.publicImage = clamp(a.publicImage - 5, 0, 100);
    b.publicImage = clamp(b.publicImage - 5, 0, 100);
    return `${a.name} vs ${b.name} 충돌 유도 (${intensity})`;
  }

  if (action.type === "RIG_GAME_DIFFICULTY") {
    const param = action.param ?? 2;
    const delta = param === 1 ? -15 : param === 2 ? 15 : 20;
    a.nextGameModifier = delta;
    a.riggedLastDay = state.day;
    return `${a.name} 게임 난이도 조작 (${delta >= 0 ? "+" : ""}${delta})`;
  }

  return "행동 적용 실패";
}

function applyHostIntervention(state) {
  const action = state.pendingHostAction;
  if (!action) {
    state.dailyLog.push("[주최자] 개입 없음");
    return;
  }

  const validation = canUseHostAction(state, action);
  if (!validation.ok) {
    state.dailyLog.push(`[주최자] ${validation.reason}`);
    state.pendingHostAction = null;
    return;
  }

  if (CONFIG.enableHostInfluence) {
    const cost = 10 + Math.floor((HOST_BASE_FOOTPRINT[action.type] ?? 12) * 0.6);
    if (state.hostInfluence < cost) {
      state.dailyLog.push("[주최자] 영향력 부족");
      state.pendingHostAction = null;
      return;
    }
    state.hostInfluence = clamp(state.hostInfluence - cost, 0, 100);
  }

  let footprint = (HOST_BASE_FOOTPRINT[action.type] ?? 12) + randInt(0, 5);

  if (helpedAction(action.type)) {
    const repeat = 1 + timesHelpedLast5Days(state, action.targetA) * 0.25;
    footprint *= repeat;
  }

  const agenda = state.hostAgendaTargetId;
  if (agenda) {
    const helpfulToAgenda =
      action.targetA === agenda && (action.type === "BOOST_POINTS" || action.type === "REDUCE_STRESS" || action.type === "INCREASE_ATTRACTION");
    const harmfulToAgenda =
      (action.type === "SPREAD_RUMOR" && action.targetB === agenda) ||
      (action.type === "TRIGGER_CONFLICT" && (action.targetA === agenda || action.targetB === agenda)) ||
      (action.type === "RIG_GAME_DIFFICULTY" && action.targetA === agenda && (action.param ?? 2) === 1);
    if (helpfulToAgenda) footprint *= 0.8;
    if (harmfulToAgenda) footprint *= 1.2;
  }

  let consumeDailySlot = true;
  if (state.freeShockTokenToday) {
    const validShock = action.type === "SPREAD_RUMOR" || (action.type === "TRIGGER_CONFLICT" && action.param === 1);
    if (validShock) {
      footprint *= 0.7;
      state.freeShockTokenToday = false;
      consumeDailySlot = false;
    }
  }

  const note = applyHostActionDelta(state, action);
  const suspicionDeltaGlobal = applyFootprintAndSuspicion(state, action, footprint);

  for (const p of aliveParticipants(state)) {
    p.fear = clamp(p.fear + 3, 0, 100);
    p.paranoia = clamp(p.fear * 0.6 + p.suspicion * 0.4, 0, 100);
  }

  state.hostLogs.push({
    day: state.day,
    type: action.type,
    params: { ...action },
    footprint: Number(footprint.toFixed(2)),
    suspicionDeltaGlobal: Number(suspicionDeltaGlobal.toFixed(2)),
    narrativeKey: HOST_NARRATIVE_KEY[action.type] ?? "host.note.twist",
  });

  if (consumeDailySlot) state.hostActionsUsedToday += 1;
  state.hostEventToday = true;
  state.hostProducerNote = `프로듀서 노트: ${note}`;
  state.dailyLog.push(`[주최자] ${note} / 흔적 ${footprint.toFixed(1)}`);
  state.pendingHostAction = null;
}

function tryDetectionEvent(state) {
  state.detectionEventToday = false;
  const maxSuspicion = aliveParticipants(state).reduce((max, p) => Math.max(max, p.suspicion), 0);
  if (state.hostSuspicionGlobal <= 70 && maxSuspicion <= 80) return;

  const p = clamp((state.hostSuspicionGlobal - 60) * 0.01 + maxSuspicion * 0.005, 0, 0.6);
  if (Math.random() > p) return;

  state.detectionEventToday = true;
  state.dailyLog.push("[탐지] 제작진 개입 의혹이 공개되었다.");

  const alive = aliveParticipants(state);
  for (const a of alive) {
    a.fear = clamp(a.fear + 10, 0, 100);
    a.paranoia = clamp(a.fear * 0.6 + a.suspicion * 0.4, 0, 100);
    if (a.role === "UNSTABLE") a.stress = clamp(a.stress + 10, 0, 100);
    for (const b of alive) {
      if (a.id === b.id) continue;
      a.trust[b.id] = clamp((a.trust[b.id] ?? 0) - 5, -100, 100);
    }
  }
}

function isInRelationship(state, participantId) {
  return Object.values(state.relationships).some((rel) => rel.aId === participantId || rel.bId === participantId);
}

function strongestAttractionTarget(state, actor) {
  const others = aliveParticipants(state).filter((p) => p.id !== actor.id);
  if (!others.length) return null;
  return others.reduce((best, candidate) => {
    const score = actor.attraction[candidate.id] ?? 0;
    if (!best) return { id: candidate.id, score };
    return score > best.score ? { id: candidate.id, score } : best;
  }, null);
}

function updateAttractionDynamics(state) {
  const people = aliveParticipants(state);
  for (const a of people) {
    for (const b of people) {
      if (a.id === b.id) continue;
      const delta = b.charisma * 0.05 + (a.trust[b.id] ?? 0) * 0.03 - a.stress * 0.02 + randFloat(-5, 5) - 2;
      a.attraction[b.id] = clamp((a.attraction[b.id] ?? 0) + delta, 0, 100);
    }
  }
}

function processRelationships(state) {
  const people = aliveParticipants(state);

  for (let i = 0; i < people.length; i += 1) {
    for (let j = i + 1; j < people.length; j += 1) {
      const a = people[i];
      const b = people[j];
      const key = pairKey(a.id, b.id);
      if (state.relationships[key]) continue;
      if ((a.attraction[b.id] ?? 0) > 70 && (b.attraction[a.id] ?? 0) > 70 && (a.trust[b.id] ?? 0) > 50 && (b.trust[a.id] ?? 0) > 50) {
        state.relationships[key] = { key, aId: a.id, bId: b.id, sinceDay: state.day };
        a.trust[b.id] = clamp((a.trust[b.id] ?? 0) + 15, -100, 100);
        b.trust[a.id] = clamp((b.trust[a.id] ?? 0) + 15, -100, 100);
        a.loneliness = clamp(a.loneliness - 20, 0, 100);
        b.loneliness = clamp(b.loneliness - 20, 0, 100);
        for (const other of people) {
          if (other.id === a.id || other.id === b.id) continue;
          other.jealousy = clamp(other.jealousy + 10, 0, 100);
        }
        state.dailyRelationshipEvents.push(`[연애 형성] ${a.name} & ${b.name}`);
      }
    }
  }

  for (const rel of Object.values({ ...state.relationships })) {
    const a = participantById(state, rel.aId);
    const b = participantById(state, rel.bId);
    if (!a || !b || !a.alive || !b.alive) {
      delete state.relationships[rel.key];
      continue;
    }
    const pointsDiff = Math.abs(a.points - b.points);
    const unstable = a.jealousy > 70 || b.jealousy > 70 || pointsDiff > 8 || a.stress > 80 || b.stress > 80;
    if (!unstable) continue;

    a.trust[b.id] = clamp((a.trust[b.id] ?? 0) - 50, -100, 100);
    b.trust[a.id] = clamp((b.trust[a.id] ?? 0) - 50, -100, 100);
    a.attraction[b.id] = clamp((a.attraction[b.id] ?? 0) - 30, 0, 100);
    b.attraction[a.id] = clamp((b.attraction[a.id] ?? 0) - 30, 0, 100);
    a.jealousy = clamp(a.jealousy + 20, 0, 100);
    b.jealousy = clamp(b.jealousy + 20, 0, 100);
    delete state.relationships[rel.key];
    state.dailyRelationshipEvents.push(`[연애 파기] ${a.name} x ${b.name}`);
  }
}

function updateLonelinessSystem(state) {
  for (const p of aliveParticipants(state)) {
    const hasAlliance = !!(p.allianceId && state.alliances[p.allianceId]);
    const hasRelationship = isInRelationship(state, p.id);
    const hasMutualAttraction = aliveParticipants(state).some(
      (other) => other.id !== p.id && (p.attraction[other.id] ?? 0) > 70 && (other.attraction[p.id] ?? 0) > 70
    );
    if (!hasAlliance && !hasMutualAttraction) {
      p.loneliness = clamp(p.loneliness + 5, 0, 100);
    }
    if (hasRelationship) {
      p.loneliness = clamp(p.loneliness - 10, 0, 100);
    }
    if (p.loneliness > 70) {
      const target = aliveParticipants(state)
        .filter((t) => t.id !== p.id)
        .sort((a, b) => b.charisma - a.charisma)[0];
      if (target) {
        p.attraction[target.id] = clamp((p.attraction[target.id] ?? 0) + 15, 0, 100);
      }
    }
  }
}

function updateJealousySystem(state) {
  const alive = aliveParticipants(state);
  for (const a of alive) {
    const targetInfo = strongestAttractionTarget(state, a);
    if (!targetInfo) continue;
    const b = participantById(state, targetInfo.id);
    if (!b) continue;

    let jealousyDelta = Math.max(0, (a.attraction[b.id] ?? 0) - (b.attraction[a.id] ?? 0)) * 0.3;
    const bNewAlliance = state.newAlliancesToday.some((pair) => pair.includes(b.id) && !pair.includes(a.id));
    if (bNewAlliance) jealousyDelta += 10;
    const lowRank = (a.latestRank ?? 99) >= Math.max(4, alive.length - 1);
    if (state.rankings[0] && state.rankings[0].id === b.id && lowRank) jealousyDelta += 5;

    a.jealousy = clamp(a.jealousy + jealousyDelta - 3, 0, 100);

    if (a.jealousy > 60) {
      a.trust[b.id] = clamp((a.trust[b.id] ?? 0) - 10, -100, 100);
    }
    if (a.jealousy > 80) {
      a.stress = clamp(a.stress + 10, 0, 100);
      a.violentEventBonus = clamp(a.violentEventBonus + 0.15, 0, 1);
    }
  }
}

function applyLoveTriangleEffects(state) {
  state.triangleDetected = null;
  const people = aliveParticipants(state);
  for (const b of people) {
    for (const a of people) {
      if (a.id === b.id) continue;
      const mutualHigh = (a.attraction[b.id] ?? 0) > 70 && (b.attraction[a.id] ?? 0) > 70;
      if (!mutualHigh) continue;
      for (const c of people) {
        if (c.id === a.id || c.id === b.id) continue;
        if ((c.attraction[b.id] ?? 0) <= 60) continue;
        c.jealousy = clamp(c.jealousy + 20, 0, 100);
        c.violentEventBonus = clamp(c.violentEventBonus + 0.15, 0, 1);
        state.triangleDetected = [a.id, b.id, c.id];
        state.dailyRelationshipEvents.push(`[삼각관계] ${a.name}-${b.name}<-${c.name}`);
        return;
      }
    }
  }
}

function applyStressFearModel(state) {
  const firstId = state.rankings[0]?.id ?? null;
  const endgameMode = aliveParticipants(state).length <= 3;
  const stressGrowthMultiplier = 1 + state.globalTension * 0.01;
  for (const p of aliveParticipants(state)) {
    const allianceSupport = p.allianceId && state.alliances[p.allianceId] ? 10 : 0;
    const firstPlaceBonus = p.id === firstId ? 20 : 0;
    const stressGrowth = (p.fear * 0.3 + p.jealousy * 0.2) * stressGrowthMultiplier;
    p.stress = clamp(p.stress + stressGrowth - allianceSupport - firstPlaceBonus, 0, 100);
    if (endgameMode) p.stress = clamp(p.stress + 10, 0, 100);
    p.stress = clamp(p.stress - 5, 0, 100);
    if (!endgameMode) p.fear = clamp(p.fear - 3, 0, 100);
    p.stability = clamp(100 - p.stress, 0, 100);
    p.paranoia = clamp(p.fear * 0.6 + p.suspicion * 0.4, 0, 100);
  }
}

function applyCaretakerSupport(state) {
  const caretaker = aliveParticipants(state).find((p) => p.role === "CARETAKER");
  if (!caretaker || !caretaker.allianceId) return;
  const alliance = state.alliances[caretaker.allianceId];
  if (!alliance) return;
  for (const memberId of alliance.members) {
    if (memberId === caretaker.id) continue;
    const partner = participantById(state, memberId);
    if (!partner || !partner.alive) continue;
    partner.stress = clamp(partner.stress - 4, 0, 100);
    partner.stability = clamp(100 - partner.stress, 0, 100);
  }
}

function triggerEmotionalCascade(state) {
  state.confrontationEventsToday = [];
  const people = aliveParticipants(state);
  for (const actor of people) {
    const worst = people
      .filter((p) => p.id !== actor.id)
      .map((target) => ({ target, trust: actor.trust[target.id] ?? 0 }))
      .sort((a, b) => a.trust - b.trust)[0];
    if (!worst) continue;
    if (!(actor.stress > 85 && actor.jealousy > 70 && worst.trust < -50)) continue;

    const roll = Math.random();
    if (roll < 0.45) {
      actor.stress = clamp(actor.stress + 8, 0, 100);
      worst.target.stress = clamp(worst.target.stress + 8, 0, 100);
      actor.trust[worst.target.id] = clamp((actor.trust[worst.target.id] ?? 0) - 20, -100, 100);
      worst.target.trust[actor.id] = clamp((worst.target.trust[actor.id] ?? 0) - 20, -100, 100);
      state.confrontationEventsToday.push(`public_fight:${actor.id}:${worst.target.id}`);
      state.dailyLog.push(`[대치] 공개 충돌 ${actor.name} vs ${worst.target.name}`);
    } else if (roll < 0.75) {
      actor.violentEventBonus = clamp(actor.violentEventBonus + 0.2, 0, 1);
      for (const other of people) {
        if (other.id === actor.id) continue;
        other.fear = clamp(other.fear + 8, 0, 100);
      }
      state.confrontationEventsToday.push(`violent_incident:${actor.id}:${worst.target.id}`);
      state.dailyLog.push(`[대치] 폭력 사건 위험 ${actor.name}`);
    } else {
      actor.loneliness = clamp(actor.loneliness + 12, 0, 100);
      actor.stress = clamp(actor.stress - 6, 0, 100);
      state.confrontationEventsToday.push(`self_isolation:${actor.id}`);
      state.dailyLog.push(`[대치] 자기 고립 ${actor.name}`);
    }
  }
}

function countRivalries(state) {
  const people = aliveParticipants(state);
  let count = 0;
  for (let i = 0; i < people.length; i += 1) {
    for (let j = i + 1; j < people.length; j += 1) {
      const a = people[i];
      const b = people[j];
      if ((a.trust[b.id] ?? 0) < -50 || (b.trust[a.id] ?? 0) < -50) count += 1;
    }
  }
  return count;
}

function computeDramaScore(state) {
  const people = aliveParticipants(state);
  if (!people.length) {
    state.dramaScore = 0;
    return;
  }
  const avgJealousy = people.reduce((sum, p) => sum + p.jealousy, 0) / people.length;
  const avgStress = people.reduce((sum, p) => sum + p.stress, 0) / people.length;
  const activeRelationships = Object.keys(state.relationships).length;
  const rivalries = countRivalries(state);
  const recentDeaths = state.latestDeath ? 1 : 0;
  state.dramaScore = Math.round(avgJealousy * 0.3 + avgStress * 0.3 + activeRelationships * 10 + rivalries * 15 + recentDeaths * 25);
}

function nightPhase(state) {
  updateAttractionDynamics(state);
  processRelationships(state);
  updateLonelinessSystem(state);
  updateJealousySystem(state);
  applyLoveTriangleEffects(state);
  applyStressFearModel(state);
  applyCaretakerSupport(state);
  triggerEmotionalCascade(state);
  computeDramaScore(state);
  state.dailyLog.push("[야간] 감정·관계 엔진 반영");
}

function cleanMatricesAfterDeath(state, deadId) {
  for (const p of state.participants) {
    if (p.id === deadId) continue;
    delete p.trust[deadId];
    delete p.attraction[deadId];
  }
}

function computeInstabilityScore(p) {
  return clamp(
    p.stress * 0.35 + p.fear * 0.25 + p.jealousy * 0.2 + (100 - p.stability) * 0.2,
    0,
    100
  );
}

function deathsLastNDays(state, n) {
  const startDay = Math.max(1, state.day - n + 1);
  return state.deaths.filter((d) => d.day >= startDay).length;
}

function noDeathDays(state) {
  if (state.deaths.length === 0) return Math.max(0, state.day - 1);
  const lastDay = Math.max(...state.deaths.map((d) => d.day));
  return Math.max(0, state.day - lastDay);
}

function globalViolenceModifier(state) {
  if (deathsLastNDays(state, 3) >= 2) return -0.2;
  if (noDeathDays(state) >= 6) return 0.15;
  return 0;
}

function lowestTrustTarget(state, actor) {
  const others = aliveParticipants(state).filter((p) => p.id !== actor.id);
  if (!others.length) return null;
  return others.reduce((worst, target) => {
    const score = actor.trust[target.id] ?? 0;
    if (!worst) return { target, score };
    return score < worst.score ? { target, score } : worst;
  }, null)?.target;
}

function nearestRivalTarget(state, actor) {
  const others = aliveParticipants(state).filter((p) => p.id !== actor.id);
  const rivals = others.filter((p) => (actor.trust[p.id] ?? 0) < -20 || (p.trust[actor.id] ?? 0) < -20);
  if (!rivals.length) return lowestTrustTarget(state, actor);
  return rivals.sort((a, b) => (actor.trust[a.id] ?? 0) - (actor.trust[b.id] ?? 0))[0];
}

function hasAllianceProtection(state, victim) {
  if (!victim.allianceId || !state.alliances[victim.allianceId]) return false;
  const members = state.alliances[victim.allianceId].members
    .map((id) => participantById(state, id))
    .filter((p) => p && p.alive && p.id !== victim.id);
  if (members.length < 2) return false;
  const avgTrust = members.reduce((sum, m) => sum + (victim.trust[m.id] ?? 0), 0) / members.length;
  return avgTrust > 60;
}

function resolveDeathAttempt(state, actor, victim, reason, globalModifier) {
  if (!victim || !victim.alive) return false;

  let pDeath = 0.4 + actor.instabilityScore / 200 - victim.stability / 300;
  if (hasAllianceProtection(state, victim)) pDeath -= 0.2;
  if (victim.publicImage > 75) pDeath -= 0.1;
  pDeath = clamp(pDeath + globalModifier, 0.2, 0.8);

  if (state.day <= 2) pDeath = 0;
  else if (state.day <= 4) pDeath *= 0.5;

  if (Math.random() < pDeath) {
    killParticipant(state, victim, reason);
    return true;
  }

  victim.stress = clamp(victim.stress + 20, 0, 100);
  victim.fear = clamp(victim.fear + 15, 0, 100);
  victim.paranoia = clamp(victim.paranoia + 10, 0, 100);
  state.dailyLog.push(`[중상] ${victim.name} 중상 발생 (사망 없음)`);
  return false;
}

function killParticipant(state, p, reason) {
  const survivorsBefore = aliveParticipants(state).filter((x) => x.id !== p.id);
  const closestAlly = survivorsBefore
    .filter((x) => (x.allianceId && p.allianceId && x.allianceId === p.allianceId) || (x.trust[p.id] ?? -100) > 40)
    .sort((a, b) => (b.trust[p.id] ?? -100) - (a.trust[p.id] ?? -100))[0];
  const closestRival = survivorsBefore
    .filter((x) => (x.trust[p.id] ?? 100) < -20 || (p.trust[x.id] ?? 100) < -20)
    .sort((a, b) => (a.trust[p.id] ?? 100) - (b.trust[p.id] ?? 100))[0];

  p.alive = false;
  p.allianceId = null;
  p.latestRank = null;
  p.wasNightCageToday = false;
  p.previousNightCage = false;
  cleanMatricesAfterDeath(state, p.id);
  for (const relKey of Object.keys(state.relationships)) {
    const rel = state.relationships[relKey];
    if (rel.aId === p.id || rel.bId === p.id) delete state.relationships[relKey];
  }
  state.rumors = state.rumors.filter((r) => r.sourceId !== p.id && r.targetId !== p.id);
  state.latestDeath = { id: p.id, name: p.name, reason, day: state.day };
  state.deaths.push(state.latestDeath);
  state.dailyLog.push(`[사망] ${p.name} | ${reason}`);
  for (const other of aliveParticipants(state)) {
    other.fear = clamp(other.fear + 15, 0, 100);
    other.stress = clamp(other.stress + 10, 0, 100);
    other.paranoia = clamp(other.paranoia + 10, 0, 100);
  }

  if (closestAlly && closestAlly.alive) {
    closestAlly.stress = clamp(closestAlly.stress + 20, 0, 100);
    closestAlly.jealousy = clamp(closestAlly.jealousy + 10, 0, 100);
  }

  if (closestRival && closestRival.alive) {
    closestRival.fear = clamp(closestRival.fear + 5, 0, 100);
  }

  for (const [allianceId, alliance] of Object.entries(state.alliances)) {
    if (alliance.members.includes(p.id)) {
      dissolveAlliance(state, allianceId, `${p.name} 사망`);
    }
  }

  state.globalTension = clamp(state.globalTension + 10, 0, 100);
  state.broadcastTone = "dark";
  state.dramaScore += 25;
}

function deathCheck(state) {
  state.latestDeath = null;
  const people = aliveParticipants(state);
  const endgameMode = people.length <= 3;
  const globalModifier = globalViolenceModifier(state);

  for (const p of people) {
    p.instabilityScore = computeInstabilityScore(p);
  }

  if (state.day <= 2) {
    state.dailyLog.push("[사망판정] Day 1-2 안전구간");
    return;
  }

  // Psychological collapse branch
  const collapseStressThreshold = endgameMode ? 80 : 90;
  const collapseFearThreshold = endgameMode ? 65 : 75;
  for (const p of people) {
    const isolated = !p.allianceId && !isInRelationship(state, p.id);
    const collapseEligible = p.wasNightCageToday || (isolated && p.loneliness > 80);
    if (!collapseEligible) continue;
    if (!(p.stress > collapseStressThreshold && p.fear > collapseFearThreshold)) continue;

    let pCollapse = (p.stress - 85) * 0.02 + (p.fear - 70) * 0.015;
    pCollapse = clamp(pCollapse, 0, 0.6);
    if (state.day <= 4) pCollapse *= 0.5;

    if (Math.random() < pCollapse) {
      if (Math.random() < 0.5) {
        const dead = resolveDeathAttempt(state, p, p, "심리 붕괴 (자해)", globalModifier);
        if (dead) return;
      } else {
        const target = nearestRivalTarget(state, p);
        const dead = resolveDeathAttempt(state, p, target, `심리 붕괴 폭발 (${p.name})`, globalModifier);
        if (dead) return;
      }
    }
  }

  // Violent incident branch
  for (const a of people) {
    const hostileTarget = people.find((b) => b.id !== a.id && (a.trust[b.id] ?? 0) < -60);
    if (!hostileTarget) continue;
    if (a.instabilityScore <= 70) continue;

    let pViolent = 0.01 + a.instabilityScore / 200 + state.hostSuspicionGlobal / 500 + globalModifier;
    pViolent += 0.15;
    if (a.jealousy > 75) pViolent += 0.1;
    if (endgameMode) pViolent += 0.1;
    pViolent = clamp(pViolent, 0, 0.35);
    if (state.day <= 2) pViolent = 0;

    if (Math.random() < pViolent) {
      const victim = lowestTrustTarget(state, a);
      if (!victim) continue;
      const dead = resolveDeathAttempt(state, a, victim, `폭력 사건 (${a.name} 기점)`, globalModifier);
      if (dead) {
        return;
      }
    }
  }

  state.dailyLog.push("[사망판정] 사망자 없음");
}

function applyRunawayLeaderBalance(state) {
  const people = aliveParticipants(state);
  if (people.length < 2) return;
  const sorted = [...people].sort((a, b) => b.points - a.points);
  const leadDiff = sorted[0].points - sorted[1].points;
  if (leadDiff <= 10) return;

  for (let i = 1; i < sorted.length; i += 1) {
    sorted[i].ambition = clamp(sorted[i].ambition + 10, 0, 100);
    sorted[i].jealousy = clamp(sorted[i].jealousy + 15, 0, 100);
  }
  state.dailyLog.push("[밸런스] 선두 독주 보정 적용");
}

function relationEventText(state) {
  const relEvent = state.dailyRelationshipEvents[0];
  if (relEvent) return relEvent.replace(/^\[(연애 형성|연애 파기|삼각관계)\]\s*/, "");
  const betrayalLine = state.dailyLog.find((line) => line.includes("[배신 발동]"));
  if (betrayalLine) return betrayalLine.replace("[배신 발동] ", "");
  const allianceLine = state.dailyLog.find((line) => line.includes("[동맹]"));
  if (allianceLine) return allianceLine.replace("[동맹] ", "");
  return "관계는 냉각과 접근을 반복했지만 고정되지 않았다.";
}

function toneByDramaScore(dramaScore) {
  if (dramaScore < 30) return "observational";
  if (dramaScore < 60) return "tense";
  if (dramaScore < 80) return "dark";
  return "oppressive";
}

function intensityLevel(dramaScore) {
  return dramaScore > 70 ? "intense" : "moderate";
}

function pickTemplate(state, key, candidates, rng) {
  if (!candidates || !candidates.length) return "";
  const last = state.storyMemory.lastUsedTemplate[key];
  const pool = candidates.length > 1 ? candidates.filter((_, i) => i !== last) : candidates;
  const index = Math.floor(rng() * pool.length);
  const picked = pool[index];
  const sourceIndex = candidates.indexOf(picked);
  state.storyMemory.lastUsedTemplate[key] = sourceIndex;
  return picked;
}

function formatTemplate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => `${vars[k] ?? ""}`);
}

function buildDailySummary(state) {
  const ranking = state.rankings
    .map((r) => participantById(state, r.id))
    .filter(Boolean);
  const firstPlace = ranking[0] ?? null;
  const lastPlace = ranking[ranking.length - 1] ?? null;
  const newRelationships = state.dailyRelationshipEvents
    .filter((e) => e.startsWith("[연애 형성]"))
    .map((e) => e.replace("[연애 형성] ", "").split(" & "));
  const betrayals = state.dailyLog
    .filter((line) => line.includes("[배신 발동]"))
    .map((line) => line.replace("[배신 발동] ", "").split(" -> "));
  const violentLine = state.dailyLog.find((line) => line.includes("폭력 사건"));
  const deathEvent = state.latestDeath
    ? {
        victim: state.latestDeath.name,
        reason: state.latestDeath.reason,
      }
    : null;
  const hostLog = [...state.hostLogs].reverse().find((log) => log.day === state.day) ?? null;
  const rankingShift = state.rankings
    .map((r) => participantById(state, r.id))
    .find((p) => p && p.latestRank && p.prevRankForStory && Math.abs(p.prevRankForStory - p.latestRank) >= 3);

  return {
    day: state.day,
    ranking,
    firstPlace,
    lastPlace,
    alliances: Object.values(state.alliances),
    newRelationships,
    betrayals,
    rumors: state.rumors.filter((r) => r.dayCreated === state.day),
    violentEvent: violentLine ? { text: violentLine } : null,
    deathEvent,
    hostLog,
    dramaScore: state.dramaScore,
    powerShift: rankingShift ? rankingShift.name : null,
  };
}

function chooseHeadlineType(summary) {
  if (summary.deathEvent) return "death";
  if (summary.violentEvent) return "violence";
  if (summary.betrayals.length) return "betrayal";
  if (summary.newRelationships.length) return "romance";
  if (summary.powerShift) return "powerShift";
  return "ranking";
}

function updateStoryMemory(state, summary) {
  const memory = state.storyMemory;
  const rivalPairs = summary.betrayals.map((pair) => pair.join("::"));
  if (summary.lastPlace) memory.previousCageVictims.unshift(summary.lastPlace.id);
  memory.previousRivalries = [...rivalPairs, ...memory.previousRivalries].slice(0, 6);
  const relPairs = summary.newRelationships.map((pair) => pair.join("::"));
  memory.previousRelationships = [...relPairs, ...memory.previousRelationships].slice(0, 6);
  memory.previousCageVictims = memory.previousCageVictims.slice(0, 6);
}

function generateStory(state) {
  const summary = buildDailySummary(state);
  const tone = toneByDramaScore(summary.dramaScore);
  const intensity = intensityLevel(summary.dramaScore);
  const rngSeed = hashString(`${state.seasonSeed}:${summary.day}:story:${summary.dramaScore}`);
  const rng = createDeterministicRng(rngSeed);

  const headlineType = chooseHeadlineType(summary);
  const headline = pickTemplate(state, `headline.${headlineType}`, NARRATIVE_TEMPLATES.headline[headlineType][intensity], rng);
  const subheadline = pickTemplate(state, `subtitle.${tone}`, NARRATIVE_TEMPLATES.subtitle[tone], rng);

  const first = summary.firstPlace;
  const last = summary.lastPlace;
  const death = summary.deathEvent;
  const betrayal = summary.betrayals[0];
  const rel = summary.newRelationships[0];
  const betrayalPairKey = betrayal ? betrayal.join("::") : null;
  const repeatedBetrayal = betrayalPairKey && state.storyMemory.previousRivalries.slice(0, 3).includes(betrayalPairKey);

  const vars = {
    victim: death?.victim ?? (last?.name ?? "누군가"),
    lastPlace: last?.name ?? "하위 참가자",
    betrayer: betrayal?.[0] ?? "어제의 동맹",
    betrayed: betrayal?.[1] ?? "오늘의 표적",
    loverA: rel?.[0] ?? "두 사람",
    loverB: rel?.[1] ?? "두 사람",
    shiftActor: summary.powerShift ?? first?.name ?? "상위권",
  };

  const repeatedCage = last && state.storyMemory.previousCageVictims.slice(0, 3).includes(last.id);
  const p1Main = death
    ? pickTemplate(state, "body.deathIntro", NARRATIVE_TEMPLATES.body.deathIntro, rng)
    : repeatedCage
      ? pickTemplate(state, "body.cageRepeat", NARRATIVE_TEMPLATES.body.cageRepeat, rng)
      : pickTemplate(state, "body.cageLine", NARRATIVE_TEMPLATES.body.cageLine, rng);
  const p1 = formatTemplate(p1Main, vars);

  let p2Core = "";
  if (summary.betrayals.length) {
    const line = pickTemplate(state, "body.betrayalLine", NARRATIVE_TEMPLATES.body.betrayalLine, rng);
    p2Core = `${repeatedBetrayal ? "또 한 번, " : ""}${formatTemplate(line, vars)}`;
  } else if (summary.newRelationships.length) {
    const line = pickTemplate(state, "body.romanceLine", NARRATIVE_TEMPLATES.body.romanceLine, rng);
    const jealousy = pickTemplate(state, "body.jealousyLine", NARRATIVE_TEMPLATES.body.jealousyLine, rng);
    p2Core = `${formatTemplate(line, vars)} ${jealousy}`;
  } else if (summary.powerShift) {
    const line = pickTemplate(state, "body.powerShift", NARRATIVE_TEMPLATES.body.powerShift, rng);
    p2Core = formatTemplate(line, vars);
  } else {
    const line = pickTemplate(state, "body.fearReaction", NARRATIVE_TEMPLATES.body.fearReaction, rng);
    p2Core = line;
  }

  const paragraphs = [p1, p2Core];
  if (summary.dramaScore > 60) {
    const foreshadow = pickTemplate(state, "body.foreshadow", NARRATIVE_TEMPLATES.body.foreshadow, rng);
    paragraphs.push(foreshadow);
  }

  let footer = "";
  if (summary.hostLog && rng() < 0.3) {
    footer = pickTemplate(state, "body.suspicionHint", NARRATIVE_TEMPLATES.body.suspicionHint, rng);
  }

  const output = [`[헤드라인] ${headline}`, `[부제] ${subheadline}`];
  paragraphs.forEach((p, i) => output.push(`[본문${i + 1}] ${p}`));
  if (footer) output.push(`[프로듀서 노트] ${footer}`);

  state.dailyBroadcast = output.join("\n\n");
  updateStoryMemory(state, summary);
}

function detectAttractionTriangle(state) {
  const people = aliveParticipants(state);
  for (let i = 0; i < people.length; i += 1) {
    for (let j = 0; j < people.length; j += 1) {
      for (let k = 0; k < people.length; k += 1) {
        if (i === j || j === k || i === k) continue;
        const a = people[i];
        const b = people[j];
        const c = people[k];
        if ((a.attraction[b.id] ?? 0) >= 68 && (b.attraction[c.id] ?? 0) >= 68 && (c.attraction[a.id] ?? 0) >= 68) {
          return [a, b, c];
        }
      }
    }
  }
  return null;
}

function checkSeasonEnd(state) {
  const alive = aliveParticipants(state);
  if (alive.length <= CONFIG.minParticipants) {
    state.gameOver = true;
    state.winnerId = alive[0] ? alive[0].id : null;
    return;
  }

  if (state.day >= CONFIG.seasonDays) {
    const sorted = [...alive].sort((a, b) => b.points - a.points);
    state.winnerId = sorted[0]?.id ?? null;
    state.gameOver = true;
  }
}

function resetDailyFlags(state) {
  for (const p of state.participants) {
    p.previousNightCage = p.wasNightCageToday;
    p.wasNightCageToday = false;
    p.difficultyOffset = Math.max(0, p.difficultyOffset - 5);
    p.violentEventBonus = 0;
  }
  state.newAlliancesToday = [];
  state.dailyRelationshipEvents = [];
  state.confrontationEventsToday = [];
  state.hostEventToday = false;
  state.detectionEventToday = false;
  state.hostActionsUsedToday = 0;
  state.hostProducerNote = "";
  if (CONFIG.enableHostInfluence) state.hostInfluence = clamp(state.hostInfluence + 10, 0, 100);
}

function nextDay(state) {
  if (state.gameOver) return;

  state.dailyLog = [];
  state.cageVictimId = null;
  state.triangleDetected = null;
  state.hostActionsUsedToday = 0;
  state.hostProducerNote = "";
  state.freeShockTokenToday = !!(CONFIG.enableFreeShockToken && state.dramaScore < 35);
  if (state.freeShockTokenToday) {
    state.dailyLog.push("[주최자] 무료 쇼크 토큰 활성화");
  }

  socialPhase(state);
  gamePhase(state);
  rankingUpdate(state);
  tradePhase(state);
  applyHostIntervention(state);
  tryDetectionEvent(state);
  nightPhase(state);
  deathCheck(state);
  computeDramaScore(state);
  applyRunawayLeaderBalance(state);
  generateStory(state);
  checkSeasonEnd(state);
  resetDailyFlags(state);

  saveState(state);

  if (!state.gameOver) {
    state.day += 1;
  }
}

function queueHostAction(state) {
  if (state.gameOver) return;
  const type = document.getElementById("host-action").value;
  const targetA = document.getElementById("host-target-a").value;
  const targetB = document.getElementById("host-target-b").value;
  const param = Number(document.getElementById("host-param").value);

  const rule = HOST_ACTIONS[type];
  if (!rule) return;
  if (!targetA) return;
  if (rule.needB && (!targetB || targetA === targetB)) return;
  if (rule.needsParam && !Number.isFinite(param)) return;

  state.pendingHostAction = {
    type,
    targetA,
    targetB: rule.needB ? targetB : null,
    param: rule.needsParam ? clamp(Math.round(param), 1, 3) : undefined,
  };
  saveState(state);
  render(state);
}

function setHostTargetOptions(state) {
  const selects = [document.getElementById("host-target-a"), document.getElementById("host-target-b")];
  const alive = aliveParticipants(state);

  for (const select of selects) {
    const prev = select.value;
    select.innerHTML = "";
    for (const p of alive) {
      const option = document.createElement("option");
      option.value = p.id;
      option.textContent = `${p.name} (${p.id})`;
      select.appendChild(option);
    }
    if ([...select.options].some((o) => o.value === prev)) select.value = prev;
  }
}

function renderTopBar(state) {
  const alive = aliveParticipants(state).length;
  const winner = state.winnerId ? participantById(state, state.winnerId) : null;
  const status = state.gameOver ? `시즌 종료 | 우승 ${winner ? winner.name : "-"}` : "시즌 진행 중";
  document.getElementById("season-meta").textContent = `${state.day}일/20일 | 생존 ${alive}/8 | 드라마 ${state.dramaScore} | ${status}`;
}

function renderPriority(state) {
  const top3El = document.getElementById("top3-list");
  top3El.innerHTML = "";
  const sorted = [...aliveParticipants(state)].sort((a, b) => b.points - a.points);
  const top3 = sorted.slice(0, 3);
  top3.forEach((p, idx) => {
    const li = document.createElement("li");
    li.textContent = `${idx + 1}. ${p.name} - ${p.points}점`;
    top3El.appendChild(li);
  });
  if (!top3.length) top3El.innerHTML = "<li>데이터 없음</li>";

  const cage = state.cageVictimId ? participantById(state, state.cageVictimId) : null;
  const cageBox = document.getElementById("cage-highlight");
  cageBox.textContent = cage ? `${cage.name} | 스트레스 ${cage.stress} | 공포 ${cage.fear}` : "오늘 케이지 기록 없음";

  const alliancesEl = document.getElementById("alliances-list");
  alliancesEl.innerHTML = "";
  const alliances = Object.values(state.alliances);
  if (!alliances.length) {
    alliancesEl.innerHTML = "<li>활성 동맹 없음</li>";
  } else {
    alliances.forEach((alliance) => {
      const names = alliance.members.map((id) => participantById(state, id)?.name ?? id).join(" + ");
      const li = document.createElement("li");
      li.textContent = names;
      alliancesEl.appendChild(li);
    });
  }

  const triangle = state.triangleDetected
    ? state.triangleDetected.map((id) => participantById(state, id))
    : detectAttractionTriangle(state);
  const triangleView = document.getElementById("triangle-view");
  triangleView.textContent = triangle
    ? `${triangle[0].name} -> ${triangle[1].name} -> ${triangle[2].name} -> ${triangle[0].name}`
    : "뚜렷한 삼각관계 없음";

  const deathBanner = document.getElementById("death-banner");
  if (state.latestDeath) {
    deathBanner.classList.remove("hidden");
    deathBanner.textContent = `사망: ${state.latestDeath.name} / ${state.latestDeath.reason}`;
  } else {
    deathBanner.classList.add("hidden");
    deathBanner.textContent = "";
  }
}

function renderBroadcast(state) {
  document.getElementById("broadcast-text").textContent = state.dailyBroadcast;

  const log = document.getElementById("event-log");
  log.innerHTML = "";
  const lines = state.dailyLog.slice().reverse();
  for (const line of lines) {
    const div = document.createElement("div");
    div.className = "log-item";
    div.textContent = line;
    log.appendChild(div);
  }
  if (!lines.length) {
    log.innerHTML = '<div class="log-item">아직 진행 기록이 없습니다.</div>';
  }
}

function statTag(value, warn, danger) {
  if (value >= danger) return '<span class="tag danger">위험</span>';
  if (value >= warn) return '<span class="tag warn">주의</span>';
  return '<span class="tag">안정</span>';
}

function renderParticipants(state) {
  const grid = document.getElementById("participants-grid");
  grid.innerHTML = "";

  const people = [...state.participants].sort((a, b) => {
    if (a.alive !== b.alive) return a.alive ? -1 : 1;
    return b.points - a.points;
  });

  for (const p of people) {
    const card = document.createElement("article");
    card.className = `participant-card${p.alive ? "" : " dead"}`;

    const alliance = p.allianceId && state.alliances[p.allianceId] ? "동맹" : "단독";
    card.innerHTML = `
      <div class="row-split"><strong>${p.name}</strong><span>${p.alive ? "생존" : "사망"}</span></div>
      <div class="row-split"><span>${ROLE_LABEL[p.role] ?? p.role}</span><span>${p.gender}/${p.age}</span></div>
      <div class="row-split"><span>점수 ${p.points}</span><span>순위 ${p.latestRank ?? "-"}</span></div>
      <div class="row-split"><span>스트레스 ${toPercent(p.stress)}</span>${statTag(p.stress, 65, 85)}</div>
      <div class="row-split"><span>공포 ${toPercent(p.fear)}</span>${statTag(p.fear, 55, 80)}</div>
      <div class="row-split"><span>질투 ${toPercent(p.jealousy)}</span>${statTag(p.jealousy, 60, 80)}</div>
      <div class="row-split"><span>고립 ${toPercent(p.loneliness)}</span>${statTag(p.loneliness, 55, 75)}</div>
      <div class="row-split"><span>안정성 ${toPercent(p.stability)}</span>${statTag(100 - p.stability, 50, 75)}</div>
      <div class="row-split"><span>야망 ${toPercent(p.ambition)}</span><span>${alliance}</span></div>
    `;

    grid.appendChild(card);
  }
}

function renderHostQueue(state) {
  const view = document.getElementById("host-queue-view");
  if (state.hostProducerNote) {
    view.textContent = `${state.hostProducerNote} | 사용 ${state.hostActionsUsedToday}/${CONFIG.hostActionsPerDay}`;
    return;
  }
  if (!state.pendingHostAction) {
    view.textContent = `대기중 | 사용 ${state.hostActionsUsedToday}/${CONFIG.hostActionsPerDay}`;
    return;
  }
  const a = participantById(state, state.pendingHostAction.targetA);
  const b = state.pendingHostAction.targetB ? participantById(state, state.pendingHostAction.targetB) : null;
  const actionLabel = HOST_ACTION_LABEL[state.pendingHostAction.type] ?? state.pendingHostAction.type;
  view.textContent = `준비됨: ${actionLabel} | ${a?.name ?? "?"}${b ? `, ${b.name}` : ""}`;
}

function render(state) {
  if (!state) return;
  renderTopBar(state);
  setHostTargetOptions(state);
  renderHostQueue(state);
  renderPriority(state);
  renderBroadcast(state);
  renderParticipants(state);
}

function showMainScreen() {
  document.getElementById("main-screen").classList.remove("hidden");
  document.getElementById("game-screen").classList.add("hidden");
}

function showGameScreen() {
  document.getElementById("main-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
}

function updateMainStatus(stateRef) {
  const status = document.getElementById("menu-status");
  const loaded = loadState();
  if (!loaded) {
    status.textContent = "저장 데이터 없음";
    return;
  }
  const s = hydrateState(loaded);
  const winner = s.winnerId ? participantById(s, s.winnerId)?.name ?? "-" : "-";
  status.textContent = `저장: ${s.day}일차, 생존 ${aliveParticipants(s).length}, 드라마 ${s.dramaScore}, 우승자 ${winner}`;
  stateRef.state = s;
}

function setAgendaTargetOptions(state) {
  const select = document.getElementById("agenda-target-select");
  select.innerHTML = "";
  const none = document.createElement("option");
  none.value = "";
  none.textContent = "없음";
  select.appendChild(none);
  for (const p of state.participants) {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = `${p.name} (${ROLE_LABEL[p.role] ?? p.role})`;
    select.appendChild(option);
  }
  select.value = state.hostAgendaTargetId || "";
}

function updateHostActionControls() {
  const actionType = document.getElementById("host-action").value;
  const rule = HOST_ACTIONS[actionType];
  const targetB = document.getElementById("host-target-b");
  const param = document.getElementById("host-param");

  targetB.disabled = !rule?.needB;
  param.disabled = !rule?.needsParam;
  param.innerHTML = "";

  if (actionType === "TRIGGER_CONFLICT") {
    [
      ["1", "약"],
      ["2", "중"],
      ["3", "강"],
    ].forEach(([v, t]) => {
      const o = document.createElement("option");
      o.value = v;
      o.textContent = t;
      param.appendChild(o);
    });
    param.value = "2";
  } else if (actionType === "RIG_GAME_DIFFICULTY") {
    [
      ["1", "하향(-15)"],
      ["2", "상향(+15)"],
      ["3", "강상향(+20)"],
    ].forEach(([v, t]) => {
      const o = document.createElement("option");
      o.value = v;
      o.textContent = t;
      param.appendChild(o);
    });
    param.value = "2";
  } else {
    const o = document.createElement("option");
    o.value = "1";
    o.textContent = "기본";
    param.appendChild(o);
    param.value = "1";
  }
}

function bindEvents(stateRef) {
  document.getElementById("menu-new-game").addEventListener("click", () => {
    stateRef.state = hydrateState(initState());
    render(stateRef.state);
    showGameScreen();
    updateMainStatus(stateRef);
  });

  document.getElementById("menu-continue").addEventListener("click", () => {
    const loaded = loadState();
    if (!loaded) {
      document.getElementById("menu-status").textContent = "이어할 저장 데이터가 없습니다.";
      return;
    }
    stateRef.state = hydrateState(loaded);
    render(stateRef.state);
    showGameScreen();
  });

  document.getElementById("menu-load-game").addEventListener("click", () => {
    const raw = window.prompt("저장 JSON을 붙여넣으세요.");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      stateRef.state = hydrateState(parsed);
      saveState(stateRef.state);
      render(stateRef.state);
      showGameScreen();
      updateMainStatus(stateRef);
    } catch {
      document.getElementById("menu-status").textContent = "불러오기 실패: JSON 형식 오류";
    }
  });

  document.getElementById("menu-settings").addEventListener("click", () => {
    if (!stateRef.state) stateRef.state = hydrateState(initState());
    setAgendaTargetOptions(stateRef.state);
    document.getElementById("settings-panel").classList.remove("hidden");
  });

  document.getElementById("settings-close").addEventListener("click", () => {
    document.getElementById("settings-panel").classList.add("hidden");
  });

  document.getElementById("settings-save").addEventListener("click", () => {
    if (!stateRef.state) return;
    const v = document.getElementById("agenda-target-select").value;
    stateRef.state.hostAgendaTargetId = v || null;
    saveState(stateRef.state);
    document.getElementById("settings-panel").classList.add("hidden");
    document.getElementById("menu-status").textContent = `설정 저장 완료 (${v ? "편애 대상 지정" : "편애 대상 없음"})`;
  });

  document.getElementById("menu-exit").addEventListener("click", () => {
    window.close();
    document.getElementById("menu-status").textContent = "브라우저 정책으로 자동 종료되지 않으면 탭을 닫아주세요.";
  });

  document.getElementById("back-main-btn").addEventListener("click", () => {
    if (stateRef.state) saveState(stateRef.state);
    updateMainStatus(stateRef);
    showMainScreen();
  });

  document.getElementById("new-game-btn").addEventListener("click", () => {
    stateRef.state = hydrateState(initState());
    render(stateRef.state);
    updateMainStatus(stateRef);
  });

  document.getElementById("queue-host-btn").addEventListener("click", () => {
    queueHostAction(stateRef.state);
  });

  document.getElementById("next-day-btn").addEventListener("click", () => {
    nextDay(stateRef.state);
    render(stateRef.state);
    saveState(stateRef.state);
    updateMainStatus(stateRef);
  });

  document.getElementById("host-action").addEventListener("change", () => {
    updateHostActionControls();
  });
}

function bootstrap() {
  const loaded = loadState();
  const stateRef = { state: loaded ? hydrateState(loaded) : null };
  bindEvents(stateRef);
  updateHostActionControls();
  updateMainStatus(stateRef);

  if (!stateRef.state) {
    showMainScreen();
    return;
  }
  render(stateRef.state);
  showMainScreen();
}

bootstrap();
