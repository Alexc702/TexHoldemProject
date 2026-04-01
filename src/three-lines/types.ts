export type ThreeLinesTrackId = "gto" | "exploit" | "line_range";
export type ThreeLinesLevel = "beginner" | "casual" | "improving";
export type ThreeLinesFocus = ThreeLinesTrackId | "direct_start";
export type ThreeLinesSkillIssue =
  | "standard_line_recognition"
  | "sizing_calibration"
  | "line_continuation"
  | "opponent_identification"
  | "deviation_discipline"
  | "value_targeting"
  | "range_narrowing"
  | "range_density_reading"
  | "hero_representation";
export type ThreeLinesConfidence = "high" | "medium" | "low";
export type ThreeLinesPackId =
  | "gto_cbet_windows"
  | "gto_bad_boards"
  | "exploit_vs_station_value_ip"
  | "exploit_stop_bluff_vs_station"
  | "exploit_respect_passive_strength"
  | "line_range_flop_call_narrowing_high_dry"
  | "line_range_turn_barrel_density"
  | "line_range_river_probe_density";

export type ThreeLinesTrackMeta = {
  id: ThreeLinesTrackId;
  title: string;
  label: string;
  shortLabel: string;
  subtitle: string;
  accent: "gold" | "ink" | "ivory";
};

export type ThreeLinesPackMeta = {
  id: ThreeLinesPackId;
  track: ThreeLinesTrackId;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
};

export type ThreeLinesScenarioOption = {
  id: string;
  label: string;
};

export type ThreeLinesScenario = {
  id: string;
  track: ThreeLinesTrackId;
  packId: ThreeLinesPackId;
  title: string;
  subtitle: string;
  prompt: string;
  setup: {
    positions: string;
    preflop: string;
    board: string;
    pot: string;
    villain?: string;
  };
  options: ThreeLinesScenarioOption[];
  correctOptionId: string;
  feedbackCorrect: {
    title: string;
    body: string;
    translation: string;
  };
  feedbackIncorrect: Record<
    string,
    {
      title: string;
      body: string;
      translation: string;
    }
  >;
  attribution: {
    primaryTrack: ThreeLinesTrackId;
    primarySkill: ThreeLinesSkillIssue;
    secondaryTrack?: ThreeLinesTrackId;
    secondarySkill?: ThreeLinesSkillIssue;
    nextTrack?: ThreeLinesTrackId;
    nextPackId?: ThreeLinesPackId;
  };
  reminderSeeds: string[];
};

export type ThreeLinesAnswer = {
  scenarioId: string;
  scenarioTitle: string;
  packId: ThreeLinesPackId;
  selectedOptionId: string;
  isCorrect: boolean;
  primarySkill?: ThreeLinesSkillIssue;
  secondarySkill?: ThreeLinesSkillIssue;
  secondaryTrack?: ThreeLinesTrackId;
  nextTrack?: ThreeLinesTrackId;
  nextPackId?: ThreeLinesPackId;
};

export type ThreeLinesFeedbackState = {
  scenarioId: string;
  selectedOptionId: string;
  title: string;
  body: string;
  translation: string;
};

export type ThreeLinesTrainingResult = {
  sessionId: string;
  track: ThreeLinesTrackId;
  completedPackId: ThreeLinesPackId;
  primaryTrackIssue: ThreeLinesTrackId;
  primarySkillIssue: ThreeLinesSkillIssue;
  secondaryTrackIssue?: ThreeLinesTrackId;
  secondarySkillIssues: ThreeLinesSkillIssue[];
  diagnosis: string;
  tonightReminders: string[];
  evidenceScenarioIds: string[];
  evidenceTitles: string[];
  recommendationReason: string;
  recommendedTrack: ThreeLinesTrackId;
  recommendedPackId: ThreeLinesPackId;
};

export type ThreeLinesSession = {
  id: string;
  track: ThreeLinesTrackId;
  packId: ThreeLinesPackId;
  scenarioIds: string[];
  currentIndex: number;
  answers: ThreeLinesAnswer[];
  issueScores: Record<ThreeLinesSkillIssue, number>;
  nextTrackScores: Partial<Record<ThreeLinesTrackId, number>>;
  feedbackState?: ThreeLinesFeedbackState;
  isComplete: boolean;
  result?: ThreeLinesTrainingResult;
};

export type ThreeLinesReminderCard = {
  sourceTrack: ThreeLinesTrackId;
  remember: string[];
  versus: string;
  lineCue: string;
};

export type ThreeLinesReviewSubmission = {
  preflopType: string;
  handBucket: string;
  boardClass: string;
  reachedStreet: string;
  keyAction: string;
  selfDoubt: string;
  rangeRead?: string;
};

export type ThreeLinesReviewResult = {
  confidence: ThreeLinesConfidence;
  primaryTrack: ThreeLinesTrackId;
  secondaryTrack?: ThreeLinesTrackId;
  title: string;
  body: string;
  takeaways: string[];
  recommendedTrack: ThreeLinesTrackId;
  recommendedPackId: ThreeLinesPackId;
};

export type ThreeLinesState = {
  level?: ThreeLinesLevel;
  focus?: ThreeLinesFocus;
  currentTrack?: ThreeLinesTrackId;
  currentSession?: ThreeLinesSession;
  latestResult?: ThreeLinesTrainingResult;
  reminderCard?: ThreeLinesReminderCard;
  reviewSubmission?: ThreeLinesReviewSubmission;
  reviewResult?: ThreeLinesReviewResult;
  username?: string;
  lastSavedAt?: string;
  saveMode?: "server" | "local";
};
