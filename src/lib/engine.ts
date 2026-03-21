import { packMeta, runtimeLeaks, runtimeReminders, runtimeScenarios } from "../data/runtime";
import type {
  PackId,
  ReminderCard,
  ReviewResult,
  ReviewSubmission,
  RuntimeScenario,
  TrainingAnswer,
  TrainingSession,
  UserGoal,
} from "../types";

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getInitialPackId(goal?: UserGoal): PackId {
  if (goal === "bluff" || goal === "exploit") {
    return "pack_bluff_control";
  }

  if (goal === "direct_start") {
    return "pack_pot_control";
  }

  return "pack_cbet_basic";
}

export function getScenarioById(id: string) {
  return runtimeScenarios.find((scenario) => scenario.scenario_id === id);
}

export function createTrainingSession(packId: PackId): TrainingSession {
  const scenarios = runtimeScenarios
    .filter((scenario) => scenario.pack_id === packId)
    .slice(0, 5);

  return {
    session_id: uid("session"),
    pack_id: packId,
    scenario_ids: scenarios.map((scenario) => scenario.scenario_id),
    current_index: 0,
    answers: [],
    leak_scores: {},
    secondary_leak_tags: [],
    reminder_ids: [],
    is_complete: false,
  };
}

export function getCurrentScenario(session?: TrainingSession): RuntimeScenario | undefined {
  if (!session) {
    return undefined;
  }

  const scenarioId = session.scenario_ids[session.current_index];
  return scenarioId ? getScenarioById(scenarioId) : undefined;
}

export function answerScenario(
  session: TrainingSession,
  scenario: RuntimeScenario,
  selectedOptionId: string,
): TrainingSession {
  const isCorrect = scenario.correct_option_id === selectedOptionId;
  const answer: TrainingAnswer = {
    scenario_id: scenario.scenario_id,
    selected_option_id: selectedOptionId,
    is_correct: isCorrect,
    derived_leak_tags: isCorrect ? [] : scenario.linked_leak_tags,
  };

  const leakScores = { ...session.leak_scores };

  if (!isCorrect) {
    for (const leakTag of scenario.linked_leak_tags) {
      leakScores[leakTag] = (leakScores[leakTag] ?? 0) + 1;
    }
  }

  const incorrectFeedback = scenario.feedback_incorrect[selectedOptionId];
  const feedbackState = isCorrect
    ? {
        scenarioId: scenario.scenario_id,
        selectedOptionId,
        title: "推荐",
        body: scenario.feedback_correct.summary,
        translation: scenario.feedback_correct.coach_translation,
      }
    : {
        scenarioId: scenario.scenario_id,
        selectedOptionId,
        title: "这手别急",
        body: incorrectFeedback?.why_wrong ?? "这条线不够稳妥。",
        translation: incorrectFeedback?.fix ?? "回到最简单、最稳的做法。",
      };

  return {
    ...session,
    answers: [...session.answers, answer],
    leak_scores: leakScores,
    feedback_state: feedbackState,
  };
}

export function advanceTrainingSession(session: TrainingSession): TrainingSession {
  const nextIndex = session.current_index + 1;

  if (nextIndex >= session.scenario_ids.length) {
    const result = finalizeTrainingSession({
      ...session,
      current_index: session.scenario_ids.length - 1,
      is_complete: true,
      feedback_state: undefined,
    });

    return result;
  }

  return {
    ...session,
    current_index: nextIndex,
    feedback_state: undefined,
  };
}

export function finalizeTrainingSession(session: TrainingSession): TrainingSession {
  const sorted = Object.entries(session.leak_scores).sort((a, b) => b[1] - a[1]);
  const primaryLeakTag = sorted[0]?.[0] ?? packMeta[session.pack_id].defaultFocusLeak;
  const secondaryLeakTags = sorted.slice(1, 3).map(([tag]) => tag);
  const recommendedPackId =
    runtimeLeaks.find((leak) => leak.leak_tag === primaryLeakTag)?.recommended_pack_ids[0] ??
    session.pack_id;

  const reminderIds = runtimeReminders
    .filter((reminder) =>
      [primaryLeakTag, ...secondaryLeakTags].includes(reminder.source_leak_tag),
    )
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 4)
    .map((reminder) => reminder.reminder_id);

  return {
    ...session,
    is_complete: true,
    primary_leak_tag: primaryLeakTag,
    secondary_leak_tags: secondaryLeakTags,
    reminder_ids: reminderIds,
    recommended_pack_id: recommendedPackId,
  };
}

export function buildReminderCard(session?: TrainingSession): ReminderCard | undefined {
  if (!session?.primary_leak_tag) {
    return undefined;
  }

  const leak = runtimeLeaks.find((item) => item.leak_tag === session.primary_leak_tag);
  const relevantReminders = runtimeReminders
    .filter(
      (item) =>
        item.source_leak_tag === session.primary_leak_tag ||
        session.secondary_leak_tags.includes(item.source_leak_tag),
    )
    .sort((a, b) => b.priority - a.priority);

  const remember = relevantReminders
    .filter((item) => item.slot === "remember")
    .slice(0, 3)
    .map((item) => item.reminder_text);

  while (remember.length < 3 && leak) {
    remember.push(leak.fix_principle);
  }

  const watchOpponent =
    relevantReminders.find((item) => item.slot === "watch_opponent")?.reminder_text ??
    "先看对手是不是那种轻易弃牌的人，再决定要不要施压。";
  const avoid =
    relevantReminders.find((item) => item.slot === "avoid")?.reminder_text ??
    leak?.fix_principle ??
    "别把简单 spot 打复杂。";

  return {
    primaryLeakTag: session.primary_leak_tag,
    remember: remember.slice(0, 3),
    watchOpponent,
    avoid,
  };
}

export function getLeakByTag(tag?: string) {
  return runtimeLeaks.find((leak) => leak.leak_tag === tag);
}

export function getPackSummary(packId?: PackId) {
  return packId ? packMeta[packId] : undefined;
}

export function buildReviewResult(submission: ReviewSubmission): ReviewResult {
  const filledCount = [
    submission.preflop_type,
    submission.hand_bucket,
    submission.board_class,
    submission.reached_street,
    submission.key_action,
    submission.self_doubt,
  ].filter(Boolean).length;

  const confidence =
    !submission.board_class || !submission.key_action || filledCount < 4
      ? "low"
      : filledCount < 6
        ? "medium"
        : "high";

  let primaryLeakTag = "overvalue_medium_hands";
  if (submission.self_doubt.includes("诈唬") || submission.key_action.includes("补枪")) {
    primaryLeakTag = "overbluff_vs_station";
  } else if (submission.self_doubt.includes("下注") || submission.board_class.includes("高张")) {
    primaryLeakTag = "missed_easy_cbet";
  } else if (submission.key_action.includes("跟注") || submission.opponent_type === "passive") {
    primaryLeakTag = "misread_passive_aggression";
  }

  const leak = getLeakByTag(primaryLeakTag)!;

  return {
    confidence,
    primary_leak_tag: primaryLeakTag,
    secondary_leak_tags:
      primaryLeakTag === "overbluff_vs_station" ? ["auto_double_barrel"] : [],
    narrative_title:
      primaryLeakTag === "missed_easy_cbet"
        ? "这手更像错过了最简单的主动权"
        : primaryLeakTag === "overbluff_vs_station"
          ? "这手更像在错误对象身上做了多余施压"
          : "这手更像把中等牌打过头了",
    narrative_text: `${leak.user_facing_description}${confidence === "low" ? " 由于你提供的信息不完整，这里按低置信度建议处理。" : ""}`,
    next_time_rules: [
      leak.fix_principle,
      "先问自己：这条线是为了让更差的牌继续，还是把更好的牌打走？",
      "如果信息不够清楚，优先选择更低波动的线。",
    ],
    recommended_pack_id: leak.recommended_pack_ids[0],
  };
}
