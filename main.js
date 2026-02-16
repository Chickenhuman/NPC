const CONFIG = {
  initialParticipants: 8,
  minParticipants: 1,
  seasonDays: 20,
  hostActionsPerDay: 1,
  day1To2DeathDisabled: true,
  actionTypes: ["TALK", "FORM_ALLIANCE", "BREAK_ALLIANCE", "FLIRT", "GOSSIP", "BETRAY", "INTIMIDATE", "PROTECT"],
};

const HOST_ACTIONS = {
  BOOST_POINTS: { needB: false },
  REDUCE_STRESS: { needB: false },
  SPREAD_RUMOR: { needB: true },
  INCREASE_ATTRACTION: { needB: true },
  TRIGGER_CONFLICT: { needB: true },
  ALTER_GAME_DIFFICULTY: { needB: false },
};

const SAVE_KEY = "island_broadcast_dark_survival_v1";

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

function participantById(state, id) {
  return state.participants.find((p) => p.id === id);
}

function aliveParticipants(state) {
  return state.participants.filter((p) => p.alive);
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
    jealousy: archetype.jealousy,
    trustBaseline: archetype.trustBaseline,
    traits: { ...archetype.traits },
    trust: {},
    attraction: {},
    allianceId: null,
    previousNightCage: false,
    wasNightCageToday: false,
    difficultyOffset: 0,
    latestRank: null,
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
    day: 1,
    participants,
    alliances: {},
    rankings: [],
    top3: [],
    cageVictimId: null,
    latestDeath: null,
    deaths: [],
    dailyLog: [],
    dailyBroadcast: "시즌 초기화 완료.",
    pendingHostAction: null,
    hostActionUsedDay: null,
    suspicion: 0,
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

function livingTargets(state, actorId) {
  return aliveParticipants(state).filter((p) => p.id !== actorId);
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
  const scaledDelta = delta > 0 ? delta * trustGainMultiplier : delta;
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

  if (actionType === "TALK") {
    growTrust(state, actor, target.id, 4);
    actor.stress = clamp(actor.stress - 3, 0, 100);
    target.stress = clamp(target.stress - 1, 0, 100);
    log.push(`${actor.name} -> TALK -> ${target.name}`);
  }

  if (actionType === "FORM_ALLIANCE") {
    growTrust(state, actor, target.id, 6);
    growAttraction(actor, target.id, 5);
    log.push(`${actor.name}가 ${target.name}에게 동맹 신호`);
  }

  if (actionType === "BREAK_ALLIANCE") {
    if (actor.allianceId && actor.allianceId === target.allianceId) {
      dissolveAlliance(state, actor.allianceId, `${actor.name}가 동맹 파기`);
    }
    growTrust(state, actor, target.id, -12);
    actor.stress = clamp(actor.stress + 4, 0, 100);
    log.push(`${actor.name} -> BREAK_ALLIANCE -> ${target.name}`);
  }

  if (actionType === "FLIRT") {
    growAttraction(actor, target.id, 8);
    growTrust(state, actor, target.id, 2);
    target.fear = clamp(target.fear - 2, 0, 100);
    log.push(`${actor.name} -> FLIRT -> ${target.name}`);
  }

  if (actionType === "GOSSIP") {
    growTrust(state, actor, target.id, -6);
    target.stress = clamp(target.stress + 6, 0, 100);
    target.fear = clamp(target.fear + 4, 0, 100);
    log.push(`${actor.name} -> GOSSIP about ${target.name}`);
  }

  if (actionType === "BETRAY") {
    growTrust(state, actor, target.id, -20);
    target.stress = clamp(target.stress + 12, 0, 100);
    target.fear = clamp(target.fear + 6, 0, 100);
    if (actor.allianceId && actor.allianceId === target.allianceId) {
      dissolveAlliance(state, actor.allianceId, `${actor.name}의 BETRAY로 동맹 붕괴`);
    }
    log.push(`${actor.name} -> BETRAY -> ${target.name}`);
  }

  if (actionType === "INTIMIDATE") {
    growTrust(state, actor, target.id, -10);
    target.fear = clamp(target.fear + 9, 0, 100);
    target.stress = clamp(target.stress + 5, 0, 100);
    log.push(`${actor.name} -> INTIMIDATE -> ${target.name}`);
  }

  if (actionType === "PROTECT") {
    growTrust(state, actor, target.id, 7);
    target.stress = clamp(target.stress - 8, 0, 100);
    target.fear = clamp(target.fear - 6, 0, 100);
    log.push(`${actor.name} -> PROTECT -> ${target.name}`);
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
        state.dailyLog.push(`[ALLIANCE] ${a.name} + ${b.name}`);
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
  if (reason) state.dailyLog.push(`[ALLIANCE BREAK] ${reason}`);
}

function checkBetrayalTrigger(state, actor, target) {
  if (!actor.allianceId || actor.allianceId !== target.allianceId) return false;
  const pointsDiff = actor.points - target.points;
  return (actor.ambition > 70 && pointsDiff > 5) || actor.stress > 75;
}

function applyBetrayalEffect(state, actor, target) {
  growTrust(state, actor, target.id, -40);
  target.stress = clamp(target.stress + 15, 0, 100);
  target.fear = clamp(target.fear + 10, 0, 100);
  dissolveAlliance(state, actor.allianceId, `${actor.name}의 배신`);
  state.dailyLog.push(`[BETRAYAL TRIGGER] ${actor.name} -> ${target.name}`);
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
      logs.forEach((line) => state.dailyLog.push(`[SOCIAL] ${line}`));

      if (checkBetrayalTrigger(state, actor, target)) {
        applyBetrayalEffect(state, actor, target);
      }
    }
  }

  autoFormAlliances(state);
}

function gamePhase(state) {
  const scored = aliveParticipants(state).map((p) => {
    const variance = p.traits?.performanceVariance ?? 1;
    const randomBase = randFloat(0, 100);
    const varianceJitter = randFloat(-20, 20) * (variance - 1);
    const base = randomBase + varianceJitter + p.ambition * 0.3 - p.stress * 0.2 - p.difficultyOffset;
    const bonus = base * allianceBonus(state, p);
    const performance = base + bonus;
    return { id: p.id, performance };
  });

  scored.sort((a, b) => b.performance - a.performance);
  state.rankings = scored;

  scored.forEach((entry, idx) => {
    const p = participantById(state, entry.id);
    p.latestRank = idx + 1;
  });

  state.dailyLog.push(`[GAME] competition resolved (${scored.length} alive)`);
}

function rankingUpdate(state) {
  const ranked = state.rankings;
  ranked.forEach((r, i) => {
    const p = participantById(state, r.id);
    if (i === 0) p.points += 5;
    if (i === 1) p.points += 3;
    if (i === 2) p.points += 2;
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
    state.dailyLog.push(`[RANK] 1st ${first.name} (+5 points)`);
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
    }

    for (const other of aliveParticipants(state)) {
      if (other.id === cage.id) continue;
      cage.attraction[other.id] = clamp((cage.attraction[other.id] ?? 0) - 10, 0, 100);
    }

    if (cage.previousNightCage) {
      cage.stress = clamp(cage.stress + 10, 0, 100);
      cage.fear = clamp(cage.fear + 10, 0, 100);
    }

    state.dailyLog.push(`[CAGE] ${cage.name} confined`);
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
        state.dailyLog.push(`[TRADE] ${donor.name} -> ${receiver.name} (1 point)`);
      }
    }
  }

  if (!trades) state.dailyLog.push("[TRADE] no successful trade");
}

function applyHostIntervention(state) {
  const action = state.pendingHostAction;
  if (!action) {
    state.dailyLog.push("[HOST] intervention skipped");
    return;
  }

  if (state.hostActionUsedDay === state.day) {
    state.dailyLog.push("[HOST] already used today");
    return;
  }

  const a = participantById(state, action.targetA);
  const b = action.targetB ? participantById(state, action.targetB) : null;
  if (!a || !a.alive) {
    state.dailyLog.push("[HOST] invalid target");
    state.pendingHostAction = null;
    return;
  }

  if (action.type === "BOOST_POINTS") {
    a.points += 2;
  }

  if (action.type === "REDUCE_STRESS") {
    a.stress = clamp(a.stress - 20, 0, 100);
  }

  if (action.type === "SPREAD_RUMOR" && b && b.alive && a.id !== b.id) {
    growTrust(state, b, a.id, -15);
    a.fear = clamp(a.fear + 12, 0, 100);
    a.stress = clamp(a.stress + 8, 0, 100);
  }

  if (action.type === "INCREASE_ATTRACTION" && b && b.alive && a.id !== b.id) {
    growAttraction(a, b.id, 15);
    growAttraction(b, a.id, 15);
  }

  if (action.type === "TRIGGER_CONFLICT" && b && b.alive && a.id !== b.id) {
    growTrust(state, a, b.id, -22);
    growTrust(state, b, a.id, -18);
    a.stress = clamp(a.stress + 10, 0, 100);
    b.stress = clamp(b.stress + 10, 0, 100);
    a.fear = clamp(a.fear + 5, 0, 100);
    b.fear = clamp(b.fear + 5, 0, 100);
  }

  if (action.type === "ALTER_GAME_DIFFICULTY") {
    a.difficultyOffset = clamp(a.difficultyOffset + 15, 0, 50);
  }

  state.suspicion += 5;
  state.hostActionUsedDay = state.day;
  state.dailyLog.push(`[HOST] ${action.type} executed (suspicion +5)`);
  state.pendingHostAction = null;
}

function nightPhase(state) {
  for (const p of aliveParticipants(state)) {
    p.stress = clamp(p.stress - 5, 0, 100);
    p.fear = clamp(p.fear - 3, 0, 100);

    for (const target of aliveParticipants(state)) {
      if (target.id === p.id) continue;
      p.attraction[target.id] = clamp((p.attraction[target.id] ?? 0) - 2, 0, 100);
    }
  }

  const caretaker = aliveParticipants(state).find((p) => p.role === "CARETAKER");
  if (caretaker && caretaker.allianceId) {
    const alliance = state.alliances[caretaker.allianceId];
    if (alliance) {
      for (const memberId of alliance.members) {
        if (memberId === caretaker.id) continue;
        const partner = participantById(state, memberId);
        if (!partner || !partner.alive) continue;
        partner.stress = clamp(partner.stress - 4, 0, 100);
      }
    }
  }

  state.dailyLog.push("[NIGHT] stress/fear/attraction decay applied");
}

function cleanMatricesAfterDeath(state, deadId) {
  for (const p of state.participants) {
    if (p.id === deadId) continue;
    delete p.trust[deadId];
    delete p.attraction[deadId];
  }
}

function killParticipant(state, p, reason) {
  p.alive = false;
  p.allianceId = null;
  p.latestRank = null;
  p.wasNightCageToday = false;
  p.previousNightCage = false;
  cleanMatricesAfterDeath(state, p.id);
  state.latestDeath = { id: p.id, name: p.name, reason, day: state.day };
  state.deaths.push(state.latestDeath);
  state.dailyLog.push(`[DEATH] ${p.name} | ${reason}`);

  for (const [allianceId, alliance] of Object.entries(state.alliances)) {
    if (alliance.members.includes(p.id)) {
      dissolveAlliance(state, allianceId, `${p.name} 사망`);
    }
  }
}

function deathCheck(state) {
  state.latestDeath = null;
  if (CONFIG.day1To2DeathDisabled && state.day <= 2) {
    state.dailyLog.push("[DEATH CHECK] disabled (Day 1-2)");
    return;
  }

  const people = aliveParticipants(state);
  for (const p of people) {
    if (p.stress >= 95 && p.fear >= 80 && p.wasNightCageToday) {
      killParticipant(state, p, "Psychological Collapse");
      return;
    }
  }

  for (const a of people) {
    const violentTarget = people.find((b) => b.id !== a.id && (a.trust[b.id] ?? 0) < -70);
    if (violentTarget && a.stress > 80) {
      killParticipant(state, a, `Violent Incident linked to ${violentTarget.name}`);
      return;
    }
  }

  state.dailyLog.push("[DEATH CHECK] no death");
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
  state.dailyLog.push("[BALANCE] runaway leader correction applied");
}

function relationEventText(state) {
  const allianceLine = state.dailyLog.find((line) => line.includes("[ALLIANCE]"));
  const betrayalLine = state.dailyLog.find((line) => line.includes("[BETRAYAL TRIGGER]"));
  if (betrayalLine) return betrayalLine.replace("[BETRAYAL TRIGGER] ", "");
  if (allianceLine) return allianceLine.replace("[ALLIANCE] ", "");
  return "관계는 냉각과 접근을 반복했지만 고정되지 않았다.";
}

function rankingEventText(state) {
  const first = state.top3[0] ? participantById(state, state.top3[0]) : null;
  const cage = state.cageVictimId ? participantById(state, state.cageVictimId) : null;
  if (!first && !cage) return "순위 변동은 미미했다.";
  const firstText = first ? `${first.name}가 1위를 유지하거나 탈환했다.` : "";
  const cageText = cage ? `${cage.name}는 케이지로 보내졌다.` : "";
  return `${firstText} ${cageText}`.trim();
}

function majorEventText(state) {
  const death = state.latestDeath;
  if (death) return `${death.name}의 이탈이 섬의 균형을 재정의했다.`;
  const hostLine = state.dailyLog.find((line) => line.includes("[HOST]") && line.includes("executed"));
  if (hostLine) return `제작진 개입 흔적이 통계에 미세한 왜곡을 남겼다.`;
  const cage = state.cageVictimId ? participantById(state, state.cageVictimId) : null;
  if (cage) return `${cage.name}의 공포 지표가 급상승했다.`;
  return "오늘은 조용해 보였지만 지표는 더 어두운 방향으로 이동했다.";
}

function generateStory(state) {
  const p1 = `Day ${state.day}. ${majorEventText(state)}`;
  const p2 = `관계 레이어: ${relationEventText(state)}`;
  const p3 = `랭킹 레이어: ${rankingEventText(state)}`;

  const lines = [p1, p2, p3];
  if (!state.latestDeath) lines.pop();

  state.dailyBroadcast = lines.join("\n\n");
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
  }
}

function nextDay(state) {
  if (state.gameOver) return;

  state.dailyLog = [];
  state.cageVictimId = null;

  socialPhase(state);
  gamePhase(state);
  rankingUpdate(state);
  tradePhase(state);
  applyHostIntervention(state);
  nightPhase(state);
  deathCheck(state);
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

  const rule = HOST_ACTIONS[type];
  if (!rule) return;
  if (!targetA) return;
  if (rule.needB && (!targetB || targetA === targetB)) return;

  state.pendingHostAction = {
    type,
    targetA,
    targetB: rule.needB ? targetB : null,
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
  const status = state.gameOver ? `SEASON END | WINNER: ${winner ? winner.name : "N/A"}` : "SEASON RUNNING";
  document.getElementById("season-meta").textContent = `Day ${state.day}/20 | Alive ${alive}/8 | Suspicion ${state.suspicion} | ${status}`;
}

function renderPriority(state) {
  const top3El = document.getElementById("top3-list");
  top3El.innerHTML = "";
  const sorted = [...aliveParticipants(state)].sort((a, b) => b.points - a.points);
  const top3 = sorted.slice(0, 3);
  top3.forEach((p, idx) => {
    const li = document.createElement("li");
    li.textContent = `${idx + 1}. ${p.name} - ${p.points}pt`;
    top3El.appendChild(li);
  });
  if (!top3.length) top3El.innerHTML = "<li>no data</li>";

  const cage = state.cageVictimId ? participantById(state, state.cageVictimId) : null;
  const cageBox = document.getElementById("cage-highlight");
  cageBox.textContent = cage ? `${cage.name} | Stress ${cage.stress} | Fear ${cage.fear}` : "오늘 케이지 기록 없음";

  const alliancesEl = document.getElementById("alliances-list");
  alliancesEl.innerHTML = "";
  const alliances = Object.values(state.alliances);
  if (!alliances.length) {
    alliancesEl.innerHTML = "<li>active alliance 없음</li>";
  } else {
    alliances.forEach((alliance) => {
      const names = alliance.members.map((id) => participantById(state, id)?.name ?? id).join(" + ");
      const li = document.createElement("li");
      li.textContent = names;
      alliancesEl.appendChild(li);
    });
  }

  const triangle = detectAttractionTriangle(state);
  const triangleView = document.getElementById("triangle-view");
  triangleView.textContent = triangle
    ? `${triangle[0].name} -> ${triangle[1].name} -> ${triangle[2].name} -> ${triangle[0].name}`
    : "명확한 삼각 구도 없음";

  const deathBanner = document.getElementById("death-banner");
  if (state.latestDeath) {
    deathBanner.classList.remove("hidden");
    deathBanner.textContent = `DEATH: ${state.latestDeath.name} / ${state.latestDeath.reason}`;
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
  if (value >= danger) return '<span class="tag danger">HIGH</span>';
  if (value >= warn) return '<span class="tag warn">WARN</span>';
  return '<span class="tag">STABLE</span>';
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

    const alliance = p.allianceId && state.alliances[p.allianceId] ? "ALLIED" : "SOLO";
    card.innerHTML = `
      <div class="row-split"><strong>${p.name}</strong><span>${p.alive ? "ALIVE" : "DEAD"}</span></div>
      <div class="row-split"><span>${p.role}</span><span>${p.gender}/${p.age}</span></div>
      <div class="row-split"><span>Points ${p.points}</span><span>Rank ${p.latestRank ?? "-"}</span></div>
      <div class="row-split"><span>Stress ${toPercent(p.stress)}</span>${statTag(p.stress, 65, 85)}</div>
      <div class="row-split"><span>Fear ${toPercent(p.fear)}</span>${statTag(p.fear, 55, 80)}</div>
      <div class="row-split"><span>Ambition ${toPercent(p.ambition)}</span><span>${alliance}</span></div>
    `;

    grid.appendChild(card);
  }
}

function renderHostQueue(state) {
  const view = document.getElementById("host-queue-view");
  if (!state.pendingHostAction) {
    view.textContent = "큐 없음";
    return;
  }
  const a = participantById(state, state.pendingHostAction.targetA);
  const b = state.pendingHostAction.targetB ? participantById(state, state.pendingHostAction.targetB) : null;
  view.textContent = `큐: ${state.pendingHostAction.type} | ${a?.name ?? "?"}${b ? `, ${b.name}` : ""}`;
}

function render(state) {
  renderTopBar(state);
  setHostTargetOptions(state);
  renderHostQueue(state);
  renderPriority(state);
  renderBroadcast(state);
  renderParticipants(state);
}

function bindEvents(stateRef) {
  document.getElementById("new-game-btn").addEventListener("click", () => {
    stateRef.state = initState();
    render(stateRef.state);
  });

  document.getElementById("queue-host-btn").addEventListener("click", () => {
    queueHostAction(stateRef.state);
  });

  document.getElementById("next-day-btn").addEventListener("click", () => {
    nextDay(stateRef.state);
    render(stateRef.state);
  });

  document.getElementById("host-action").addEventListener("change", () => {
    const action = document.getElementById("host-action").value;
    const needsB = HOST_ACTIONS[action]?.needB;
    document.getElementById("host-target-b").disabled = !needsB;
  });
}

function bootstrap() {
  const loaded = loadState();
  const stateRef = { state: loaded || initState() };
  bindEvents(stateRef);
  const action = document.getElementById("host-action").value;
  document.getElementById("host-target-b").disabled = !HOST_ACTIONS[action].needB;
  render(stateRef.state);
}

bootstrap();
