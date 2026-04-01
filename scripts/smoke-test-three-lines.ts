import assert from "node:assert/strict";
import {
  advanceSession,
  answerScenario,
  buildReminderCard,
  buildReviewResult,
  createSession,
  getCurrentScenario,
  getDefaultTrack,
  getPackMeta,
  getPacksForTrack,
  getScenarioById,
  getScenarioCountForPack,
  getScenarioCountForTrack,
} from "../src/three-lines/lib/engine";
import { generateLocalUsername } from "../src/three-lines/lib/resultApi";
import {
  getConfidenceLabel,
  getSkillIssueLabel,
  getTrainingContextDisplay,
  localizePokerTerms,
} from "../src/three-lines/lib/terminology";

function finishSession(
  track: "gto" | "exploit" | "line_range",
  packId?: Parameters<typeof createSession>[1],
) {
  let session = createSession(track, packId);

  for (let index = 0; index < session.scenarioIds.length; index += 1) {
    const scenario = getCurrentScenario(session);
    assert.ok(scenario, "scenario should exist");

    const selectedOptionId =
      index === 0 ? scenario.correctOptionId : scenario.options[1]?.id ?? scenario.options[0].id;
    session = answerScenario(session, scenario, selectedOptionId);
    assert.ok(session.feedbackState, "feedback should exist after answer");
    session = advanceSession(session);
  }

  return session;
}

function run() {
  assert.equal(getDefaultTrack("direct_start"), "gto");
  assert.equal(getPacksForTrack("exploit").length, 3);
  assert.equal(getScenarioCountForTrack("exploit"), 24);
  assert.equal(getScenarioCountForTrack("line_range"), 24);
  assert.equal(getScenarioCountForPack("exploit_vs_station_value_ip"), 8);
  assert.ok(getPackMeta("line_range_river_probe_density"));
  const lineRangeScenario = getScenarioById("TL-LR-035");
  assert.ok(lineRangeScenario);

  const contextDisplay = getTrainingContextDisplay(lineRangeScenario!);
  assert.match(contextDisplay.board, /[♣♦♥♠]/);
  assert.match(contextDisplay.heroPosition, /(按钮位|劫位|小盲|大盲|枪口位|有位置|无位置)/);

  const localizedSentence = localizePokerTerms("blank turn 对 station 的 bluff density 会下降");
  assert.match(localizedSentence, /空白转牌 blank turn/);
  assert.match(localizedSentence, /爱跟玩家 station/);
  assert.match(localizedSentence, /(诈唬密度 bluff density|诈唬 bluff density)/);
  assert.equal(getSkillIssueLabel("range_density_reading"), "密度判断不稳 / Range density");
  assert.equal(getConfidenceLabel("medium"), "中 / Medium");
  assert.match(generateLocalUsername("line_range"), /^tex-lr-\d{6}-[A-Z0-9]{4}$/);

  const gtoSession = finishSession("gto");
  assert.equal(gtoSession.isComplete, true);
  assert.ok(gtoSession.result);
  assert.equal(gtoSession.result?.track, "gto");

  const exploitSession = finishSession("exploit", "exploit_stop_bluff_vs_station");
  assert.equal(exploitSession.isComplete, true);
  assert.equal(exploitSession.scenarioIds.length, 8);
  assert.ok(exploitSession.result?.recommendedTrack);
  assert.ok(exploitSession.result?.evidenceTitles.length);

  const reminderCard = buildReminderCard(exploitSession.result);
  assert.ok(reminderCard);
  assert.equal(reminderCard?.remember.length, 3);

  const review = buildReviewResult({
    preflopType: "翻前主动加注",
    handBucket: "中等成手",
    boardClass: "高张干燥面",
    reachedStreet: "river",
    keyAction: "我 river bluff 了",
    selfDoubt: "我可能把对手类型看错了",
    rangeRead: "空气应该不多了",
  });
  assert.equal(review.primaryTrack, "line_range");
  assert.equal(review.secondaryTrack, "exploit");
  assert.equal(review.recommendedPackId, "line_range_river_probe_density");

  const lowConfidenceReview = buildReviewResult({
    preflopType: "",
    handBucket: "",
    boardClass: "",
    reachedStreet: "",
    keyAction: "我 river bluff 了",
    selfDoubt: "我可能把对手类型看错了",
    rangeRead: "",
  });
  assert.equal(lowConfidenceReview.confidence, "low");

  console.log("three-lines smoke test passed");
}

run();
