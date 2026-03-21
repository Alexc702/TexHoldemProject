export type UserLevel = "beginner" | "casual" | "improving" | "unknown";
export type UserGoal = "cbet" | "bluff" | "exploit" | "direct_start";
export type PackId = "pack_cbet_basic" | "pack_bluff_control" | "pack_pot_control";
export type Confidence = "high" | "medium" | "low";

export type RuntimeScenario = {
  scenario_id: string;
  pack_id: PackId;
  title_cn: string;
  theme_cn: string;
  difficulty: "low" | "medium" | "high";
  stage: "首轮训练" | "复训";
  setup: {
    positions: string;
    preflop: string;
    board: string;
    pot: string;
  };
  prompt_cn: string;
  options: Array<{
    id: string;
    label: string;
  }>;
  correct_option_id: string;
  feedback_correct: {
    summary: string;
    coach_translation: string;
  };
  feedback_incorrect: Record<
    string,
    {
      why_wrong: string;
      fix: string;
    }
  >;
  linked_leak_tags: string[];
  reminder_seed: string;
  recommended_next_pack_ids: PackId[];
};

export type RuntimeLeak = {
  leak_tag: string;
  leak_name_cn: string;
  family: string;
  user_facing_description: string;
  fix_principle: string;
  recommended_pack_ids: PackId[];
};

export type RuntimeReminder = {
  reminder_id: string;
  source_leak_tag: string;
  slot: "remember" | "watch_opponent" | "avoid";
  reminder_text: string;
  priority: number;
};

export type TrainingAnswer = {
  scenario_id: string;
  selected_option_id: string;
  is_correct: boolean;
  derived_leak_tags: string[];
};

export type TrainingFeedbackState = {
  scenarioId: string;
  selectedOptionId: string;
  title: string;
  body: string;
  translation: string;
};

export type TrainingSession = {
  session_id: string;
  pack_id: PackId;
  scenario_ids: string[];
  current_index: number;
  answers: TrainingAnswer[];
  leak_scores: Record<string, number>;
  primary_leak_tag?: string;
  secondary_leak_tags: string[];
  reminder_ids: string[];
  recommended_pack_id?: PackId;
  is_complete: boolean;
  feedback_state?: TrainingFeedbackState;
};

export type ReminderCard = {
  primaryLeakTag: string;
  remember: string[];
  watchOpponent: string;
  avoid: string;
};

export type ReviewSubmission = {
  preflop_type: string;
  hand_bucket: string;
  board_class: string;
  reached_street: string;
  key_action: string;
  self_doubt: string;
  opponent_type?: string;
};

export type ReviewResult = {
  confidence: Confidence;
  primary_leak_tag: string;
  secondary_leak_tags: string[];
  narrative_title: string;
  narrative_text: string;
  next_time_rules: string[];
  recommended_pack_id: PackId;
};

export type AppState = {
  level?: UserLevel;
  goal?: UserGoal;
  trainingSession?: TrainingSession;
  reminderCard?: ReminderCard;
  reviewSubmission?: ReviewSubmission;
  reviewResult?: ReviewResult;
  isLoggedIn: boolean;
  phone?: string;
};
