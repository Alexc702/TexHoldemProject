import {
  skillMeta,
  threeLinesPacks,
  threeLinesScenarios,
  threeLinesTracks,
} from "../data/runtime";
import type {
  ThreeLinesFocus,
  ThreeLinesPackId,
  ThreeLinesReviewResult,
  ThreeLinesReviewSubmission,
  ThreeLinesSession,
  ThreeLinesSkillIssue,
  ThreeLinesTrackId,
  ThreeLinesTrainingResult,
  ThreeLinesReminderCard,
  ThreeLinesScenario,
} from "../types";

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getTrackMeta(track: ThreeLinesTrackId) {
  return threeLinesTracks[track];
}

export function getSkillMeta(skill: ThreeLinesSkillIssue) {
  return skillMeta[skill];
}

export function getPackMeta(packId: ThreeLinesPackId) {
  return threeLinesPacks[packId];
}

export function getPacksForTrack(track: ThreeLinesTrackId) {
  return Object.values(threeLinesPacks).filter((pack) => pack.track === track);
}

export function getScenarioCountForPack(packId: ThreeLinesPackId) {
  return threeLinesScenarios.filter((scenario) => scenario.packId === packId).length;
}

export function getScenarioCountForTrack(track: ThreeLinesTrackId) {
  return threeLinesScenarios.filter((scenario) => scenario.track === track).length;
}

export function getDefaultTrack(focus?: ThreeLinesFocus): ThreeLinesTrackId {
  if (focus === "exploit" || focus === "line_range" || focus === "gto") {
    return focus;
  }

  return "gto";
}

export function getDefaultPack(track: ThreeLinesTrackId): ThreeLinesPackId {
  return getPacksForTrack(track)[0].id;
}

export function getScenarioById(id: string) {
  return threeLinesScenarios.find((scenario) => scenario.id === id);
}

export function createSession(
  track: ThreeLinesTrackId,
  packId: ThreeLinesPackId = getDefaultPack(track),
): ThreeLinesSession {
  const scenarioIds = threeLinesScenarios
    .filter((scenario) => scenario.track === track && scenario.packId === packId)
    .map((scenario) => scenario.id);

  return {
    id: uid("three-lines-session"),
    track,
    packId,
    scenarioIds,
    currentIndex: 0,
    answers: [],
    issueScores: {} as Record<ThreeLinesSkillIssue, number>,
    nextTrackScores: {},
    isComplete: false,
  };
}

export function getCurrentScenario(session?: ThreeLinesSession): ThreeLinesScenario | undefined {
  if (!session) {
    return undefined;
  }

  return getScenarioById(session.scenarioIds[session.currentIndex]);
}

export function answerScenario(
  session: ThreeLinesSession,
  scenario: ThreeLinesScenario,
  selectedOptionId: string,
): ThreeLinesSession {
  const isCorrect = selectedOptionId === scenario.correctOptionId;
  const issueScores = { ...session.issueScores };
  const nextTrackScores = { ...session.nextTrackScores };

  if (!isCorrect) {
    issueScores[scenario.attribution.primarySkill] =
      (issueScores[scenario.attribution.primarySkill] ?? 0) + 1;

    if (scenario.attribution.secondarySkill) {
      issueScores[scenario.attribution.secondarySkill] =
        (issueScores[scenario.attribution.secondarySkill] ?? 0) + 1;
    }

    if (scenario.attribution.nextTrack) {
      nextTrackScores[scenario.attribution.nextTrack] =
        (nextTrackScores[scenario.attribution.nextTrack] ?? 0) + 1;
    }
  }

  const answer = {
    scenarioId: scenario.id,
    scenarioTitle: scenario.title,
    packId: scenario.packId,
    selectedOptionId,
    isCorrect,
    primarySkill: isCorrect ? undefined : scenario.attribution.primarySkill,
    secondarySkill: isCorrect ? undefined : scenario.attribution.secondarySkill,
    secondaryTrack: isCorrect ? undefined : scenario.attribution.secondaryTrack,
    nextTrack: isCorrect ? undefined : scenario.attribution.nextTrack,
    nextPackId: isCorrect ? undefined : scenario.attribution.nextPackId,
  };

  const feedback =
    isCorrect || !scenario.feedbackIncorrect[selectedOptionId]
      ? scenario.feedbackCorrect
      : scenario.feedbackIncorrect[selectedOptionId];

  return {
    ...session,
    answers: [...session.answers, answer],
    issueScores,
    nextTrackScores,
    feedbackState: {
      scenarioId: scenario.id,
      selectedOptionId,
      title: feedback.title,
      body: feedback.body,
      translation: feedback.translation,
    },
  };
}

function pickPrimarySkill(issueScores: Partial<Record<ThreeLinesSkillIssue, number>>) {
  return (
    Object.entries(issueScores).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))[0]?.[0] ??
    "standard_line_recognition"
  ) as ThreeLinesSkillIssue;
}

function pickSecondarySkills(issueScores: Partial<Record<ThreeLinesSkillIssue, number>>) {
  return Object.entries(issueScores)
    .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
    .slice(1, 3)
    .map(([skill]) => skill as ThreeLinesSkillIssue);
}

function pickSecondaryTrack(session: ThreeLinesSession) {
  return Object.entries(session.nextTrackScores)
    .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
    .map(([track]) => track as ThreeLinesTrackId)
    .find((track) => track !== session.track);
}

export function finalizeSession(session: ThreeLinesSession): ThreeLinesSession {
  const hasMistakes = session.answers.some((answer) => !answer.isCorrect);
  const steadySkill: ThreeLinesSkillIssue =
    session.track === "exploit"
      ? "value_targeting"
      : session.track === "line_range"
        ? "range_narrowing"
        : "standard_line_recognition";
  const primarySkill = hasMistakes ? pickPrimarySkill(session.issueScores) : steadySkill;
  const secondarySkills = hasMistakes ? pickSecondarySkills(session.issueScores) : [];
  const secondaryTrack = hasMistakes ? pickSecondaryTrack(session) : undefined;
  const sameTrackPacks = getPacksForTrack(session.track);
  const currentPackIndex = sameTrackPacks.findIndex((pack) => pack.id === session.packId);
  const nextSameTrackPackId =
    sameTrackPacks[currentPackIndex + 1]?.id ?? sameTrackPacks[0]?.id ?? session.packId;
  const recommendation = hasMistakes
    ? secondaryTrack ?? skillMeta[primarySkill].defaultNextTrack
    : session.track;
  const recommendedPackId = hasMistakes
    ? session.answers.find((answer) => answer.nextTrack === recommendation && answer.nextPackId)
        ?.nextPackId ?? skillMeta[primarySkill].defaultNextPackId
    : nextSameTrackPackId;
  const evidenceTitles = session.answers
    .filter((answer) => !answer.isCorrect && answer.primarySkill === primarySkill)
    .slice(0, 3)
    .map((answer) => answer.scenarioTitle);
  const evidenceScenarioIds = session.answers
    .filter((answer) => !answer.isCorrect && answer.primarySkill === primarySkill)
    .slice(0, 3)
    .map((answer) => answer.scenarioId);
  const reminderPool = session.answers
    .filter((answer) => !answer.isCorrect)
    .flatMap((answer) => getScenarioById(answer.scenarioId)?.reminderSeeds ?? []);
  const uniqueReminders = Array.from(
    new Set([...reminderPool, ...skillMeta[primarySkill].reminders]),
  ).slice(0, 3);
  const recommendedPack = getPackMeta(recommendedPackId);
  const currentPack = getPackMeta(session.packId);
  const recommendationReason =
    evidenceTitles.length > 0
      ? `这轮里 ${evidenceTitles.join("、")} 反复暴露了 ${skillMeta[primarySkill].name}，下一组先去练 ${recommendedPack.title}。`
      : `这轮最明显的问题是 ${skillMeta[primarySkill].name}，下一组先去练 ${recommendedPack.title}。`;

  const result: ThreeLinesTrainingResult = {
    sessionId: session.id,
    track: session.track,
    completedPackId: session.packId,
    primaryTrackIssue: session.track,
    primarySkillIssue: primarySkill,
    secondaryTrackIssue: secondaryTrack,
    secondarySkillIssues: secondarySkills,
    diagnosis: hasMistakes
      ? skillMeta[primarySkill].diagnosis
      : `这组 ${getTrackMeta(session.track).label} 题你打得比较稳，暂时没有明显的单点爆雷。`,
    tonightReminders: hasMistakes
      ? uniqueReminders
      : [
          `这组 ${currentPack.title} 先保持住，不要回到自动驾驶。`,
          `下一组直接去练 ${recommendedPack.title}，看自己能不能迁移过去。`,
          "继续把“为什么对”说清楚，而不是只靠直觉按对。",
        ],
    evidenceScenarioIds,
    evidenceTitles,
    recommendationReason: hasMistakes
      ? recommendationReason
      : `这组没有明显爆雷，下一步直接去练 ${recommendedPack.title} 做迁移验证。`,
    recommendedTrack: recommendation,
    recommendedPackId,
  };

  return {
    ...session,
    isComplete: true,
    feedbackState: undefined,
    result,
  };
}

export function advanceSession(session: ThreeLinesSession): ThreeLinesSession {
  const nextIndex = session.currentIndex + 1;

  if (nextIndex >= session.scenarioIds.length) {
    return finalizeSession({
      ...session,
      currentIndex: session.scenarioIds.length - 1,
    });
  }

  return {
    ...session,
    currentIndex: nextIndex,
    feedbackState: undefined,
  };
}

export function buildReminderCard(result?: ThreeLinesTrainingResult): ThreeLinesReminderCard | undefined {
  if (!result) {
    return undefined;
  }

  const [first = "先把最自动的错误压下来。", second = "针对错的人别做错事。", third = "顺着行动线重新想范围。"] =
    result.tonightReminders;

  const versusText =
    result.primaryTrackIssue === "exploit"
      ? "先判断他是会弃还是会跟，再决定 bluff 还是 value。"
      : "面对被动玩家突然发力时，先把强度预期调高。";
  const lineCue =
    result.primaryTrackIssue === "line_range"
      ? "跟住一街后，先把纯空气密度往下调。"
      : "每次想打大之前，都问自己这条线在代表什么。";

  return {
    sourceTrack: result.primaryTrackIssue,
    remember: [first, second, third].slice(0, 3),
    versus: versusText,
    lineCue,
  };
}

export function buildSkillSnapshot(result?: ThreeLinesTrainingResult, review?: ThreeLinesReviewResult) {
  const active = review?.primaryTrack ?? result?.recommendedTrack ?? "gto";
  const watch = review?.secondaryTrack ?? result?.secondaryTrackIssue ?? "line_range";

  return {
    gto: active === "gto" ? "主练" : watch === "gto" ? "观察" : "稳",
    exploit: active === "exploit" ? "主练" : watch === "exploit" ? "观察" : "稳",
    line_range: active === "line_range" ? "主练" : watch === "line_range" ? "观察" : "稳",
  };
}

export function buildReviewResult(
  submission: ThreeLinesReviewSubmission,
): ThreeLinesReviewResult {
  const presentCount = [
    submission.preflopType,
    submission.handBucket,
    submission.boardClass,
    submission.reachedStreet,
    submission.keyAction,
    submission.selfDoubt,
    submission.rangeRead,
  ].filter(Boolean).length;

  const confidence =
    presentCount >= 6 ? "high" : presentCount >= 4 ? "medium" : "low";

  const signal = `${submission.keyAction} ${submission.selfDoubt} ${submission.rangeRead ?? ""}`;
  let primaryTrack: ThreeLinesTrackId = "gto";
  let secondaryTrack: ThreeLinesTrackId | undefined;

  if (/范围|空气|密度|value|bluff/i.test(signal)) {
    primaryTrack = "line_range";
    secondaryTrack = /station|被动|错了人|bluff/i.test(signal) ? "exploit" : "gto";
  } else if (/station|被动|错了人|诈唬|bluff/i.test(signal)) {
    primaryTrack = "exploit";
    secondaryTrack = /范围|密度/i.test(signal) ? "line_range" : "gto";
  } else {
    primaryTrack = "gto";
    secondaryTrack = /范围|密度/i.test(signal) ? "line_range" : "exploit";
  }

  const recommendation =
    primaryTrack === "gto"
      ? "gto_cbet_windows"
      : primaryTrack === "exploit"
        ? "exploit_vs_station_value_ip"
        : "line_range_river_probe_density";

  const bodyBase =
    primaryTrack === "gto"
      ? "这手更像默认线判断不稳。你可能把原本不舒服的牌面或中等牌，按成了自动进攻位。"
      : primaryTrack === "exploit"
        ? "这手更像对错的人做了错事。你不是没想法，而是对手识别和偏离纪律出了问题。"
        : "这手更像行动线和范围没读清。你高估了 bluff 密度，或低估了 value 密度。";

  return {
    confidence,
    primaryTrack,
    secondaryTrack,
    title:
      secondaryTrack
        ? `主问题在线 ${threeLinesTracks[primaryTrack].label}，次问题在线 ${threeLinesTracks[secondaryTrack].label}`
        : `主问题在线 ${threeLinesTracks[primaryTrack].label}`,
    body:
      confidence === "low"
        ? `${bodyBase} 由于你提供的信息不完整，这里按低置信度建议处理。`
        : bodyBase,
    takeaways: [
      primaryTrack === "exploit"
        ? "先判断对手是不是会弃牌的人，再决定偏离。"
        : primaryTrack === "line_range"
          ? "先比较 value 密度和 bluff 密度，不要只看自己两张牌。"
          : "先回到更稳的默认线，不确定时少做自动延续。",
      secondaryTrack === "line_range"
        ? "一路跟到后程后，把空气密度往下调。"
        : secondaryTrack === "exploit"
          ? "别把不同类型的娱乐局玩家打成一种人。"
          : "尺度和方向是一体的，不要只顾着按按钮。",
      "如果记不清细节，优先选择更低波动、更不自欺的那条线。",
    ],
    recommendedTrack: primaryTrack,
    recommendedPackId: recommendation,
  };
}
