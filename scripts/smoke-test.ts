import assert from "node:assert/strict";
import {
  answerScenario,
  buildReminderCard,
  buildReviewResult,
  createTrainingSession,
  getCurrentScenario,
  getInitialPackId,
  getLeakByTag,
  getPackSummary,
  getScenarioById,
  advanceTrainingSession,
} from "../src/lib/engine";

function completeSessionWithMixedAnswers() {
  let session = createTrainingSession(getInitialPackId("cbet"));

  for (let index = 0; index < session.scenario_ids.length; index += 1) {
    const scenario = getCurrentScenario(session);
    assert.ok(scenario, "current scenario should exist");

    const selectedOptionId = index < 2 ? scenario.correct_option_id : scenario.options[0].id;
    session = answerScenario(session, scenario, selectedOptionId);

    assert.ok(session.feedback_state, "feedback state should exist after answering");
    session = advanceTrainingSession(session);
  }

  return session;
}

function run() {
  const initialPack = getInitialPackId("cbet");
  assert.equal(initialPack, "pack_cbet_basic");
  assert.ok(getPackSummary(initialPack));

  const knownScenario = getScenarioById("MVP-F-CBET-001");
  assert.ok(knownScenario, "known scenario should be available");

  const session = completeSessionWithMixedAnswers();
  assert.equal(session.is_complete, true);
  assert.ok(session.primary_leak_tag, "completed session should produce a primary leak");
  assert.ok(session.recommended_pack_id, "completed session should recommend a pack");
  assert.ok(getLeakByTag(session.primary_leak_tag), "primary leak should map to leak metadata");

  const reminderCard = buildReminderCard(session);
  assert.ok(reminderCard, "completed session should produce a reminder card");
  assert.equal(reminderCard?.remember.length, 3);
  assert.ok(reminderCard?.watchOpponent);
  assert.ok(reminderCard?.avoid);

  const highSignalReview = buildReviewResult({
    preflop_type: "翻前加注后被跟",
    hand_bucket: "一对类中等牌",
    board_class: "高张干燥面",
    reached_street: "turn",
    key_action: "我持续下注了",
    self_doubt: "我是不是错过了简单下注",
    opponent_type: "passive",
  });
  assert.notEqual(highSignalReview.confidence, "low");
  assert.ok(highSignalReview.next_time_rules.length >= 3);

  const lowSignalReview = buildReviewResult({
    preflop_type: "",
    hand_bucket: "",
    board_class: "",
    reached_street: "turn",
    key_action: "",
    self_doubt: "我是不是诈唬过头了",
    opponent_type: "",
  });
  assert.equal(lowSignalReview.confidence, "low");

  console.log("smoke test passed");
}

run();
