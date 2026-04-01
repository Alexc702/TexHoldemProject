import type {
  ThreeLinesConfidence,
  ThreeLinesScenario,
  ThreeLinesSkillIssue,
} from "../types";

type TrainingContextDisplay = {
  summary: string;
  heroPosition: string;
  heroHand: string;
  villainInfo: string;
  actionLine: string;
  board: string;
  street: string;
};

const positionMap: Record<string, string> = {
  BTN: "按钮位 BTN",
  CO: "劫位 CO",
  SB: "小盲 SB",
  BB: "大盲 BB",
  UTG: "枪口位 UTG",
  IP: "有位置 IP",
  OOP: "无位置 OOP",
};

const skillLabelMap: Record<ThreeLinesSkillIssue, string> = {
  standard_line_recognition: "标准线识别不稳 / Baseline recognition",
  sizing_calibration: "尺度校准不稳 / Sizing calibration",
  line_continuation: "延续条件判断不稳 / Line continuation",
  opponent_identification: "对手识别不准 / Opponent identification",
  deviation_discipline: "偏离纪律不稳 / Deviation discipline",
  value_targeting: "价值目标选错了 / Value targeting",
  range_narrowing: "范围收缩不稳 / Range narrowing",
  range_density_reading: "密度判断不稳 / Range density",
  hero_representation: "自己的行动线表达不清 / Hero representation",
};

const confidenceLabelMap: Record<ThreeLinesConfidence, string> = {
  high: "高 / High",
  medium: "中 / Medium",
  low: "低 / Low",
};

const termReplacements: Array<[RegExp, string]> = [
  [/\bGTO\b/gi, "标准线 GTO"],
  [/\bLine\s*&\s*Range\b/gi, "行动线与范围 Line & Range"],
  [/\bExploit\b/gi, "针对人 Exploit"],
  [/\bcalling station\b/gi, "爱跟玩家 calling station"],
  [/\bcall-happy rec\b/gi, "会宽跟的娱乐玩家 call-happy rec"],
  [/\bloose-passive bluffcatcher\b/gi, "偏被动跟注型玩家 loose-passive bluffcatcher"],
  [/\bsticky range\b/gi, "黏性范围 sticky range"],
  [/\bmerge value\b/gi, "合并价值 merge value"],
  [/\bvalue density\b/gi, "价值密度 value density"],
  [/\bbluff density\b/gi, "诈唬密度 bluff density"],
  [/\bvalue-heavy\b/gi, "价值偏重 value-heavy"],
  [/\bpair-heavy\b/gi, "对子偏重 pair-heavy"],
  [/\bdraw-heavy\b/gi, "听牌偏重 draw-heavy"],
  [/\bblank turn\b/gi, "空白转牌 blank turn"],
  [/\bscare turn\b/gi, "吓人转牌 scare turn"],
  [/\bscare card\b/gi, "吓人牌 scare card"],
  [/\bcheck-through\b/gi, "双方过牌 check-through"],
  [/\bprobe\b/gi, "探测下注 probe"],
  [/\bmultiway\b/gi, "多人池 multiway"],
  [/\boverfolder\b/gi, "过度弃牌者 overfolder"],
  [/\bunderbluffed\b/gi, "诈唬不足 underbluffed"],
  [/\breg\b/gi, "常规玩家 reg"],
  [/\brec\b/gi, "娱乐玩家 rec"],
  [/\bfold equity\b/gi, "弃牌率 fold equity"],
  [/\bcheck back\b/gi, "过牌控制 check back"],
  [/\bcheck-raise\b/gi, "过牌加注 check-raise"],
  [/\bcheck-call\b/gi, "过牌跟注 check-call"],
  [/\bvalue bet\b/gi, "价值下注 value bet"],
  [/\bc-bet\b/gi, "持续下注 c-bet"],
  [/\boverbet\b/gi, "超池下注 overbet"],
  [/\bsecond barrel\b/gi, "第二枪 second barrel"],
  [/\bstation\b/gi, "爱跟玩家 station"],
  [/\bpassive\b/gi, "被动玩家 passive"],
  [/\bbluffcatch(?:er)?\b/gi, "抓诈唬 bluffcatcher"],
  [/\bbluff\b/gi, "诈唬 bluff"],
  [/\bvalue\b/gi, "价值 value"],
  [/\bdraw\b/gi, "听牌 draw"],
  [/\bair\b/gi, "空气 air"],
  [/\brange density\b/gi, "范围密度 range density"],
  [/\brange narrowing\b/gi, "范围收缩 range narrowing"],
  [/\bturn\b/gi, "转牌 Turn"],
  [/\briver\b/gi, "河牌 River"],
  [/\bflop\b/gi, "翻牌 Flop"],
];

function normalizeSpacing(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function formatPositionToken(token: string) {
  const clean = normalizeSpacing(token.toUpperCase());
  return positionMap[clean] ?? token.trim();
}

function formatVillainFromPositions(positions: string, villain?: string) {
  const parts = positions.split(/\s+vs\s+/i);
  const rawVillain = parts[1]?.trim() ?? "";

  let base = "对手未指明 / Villain not specified";
  if (rawVillain.includes("两个盲位")) {
    base = "小盲 SB + 大盲 BB（2 人）";
  } else if (rawVillain) {
    base = `${formatPositionToken(rawVillain)}（1 人）`;
  }

  if (!villain) {
    return base;
  }

  return `${base} · ${localizePokerTerms(villain)}`;
}

function detectHeroHand(text: string) {
  const exactSuited = text.match(/([AKQJT2-9][♣♦♥♠]\s*[AKQJT2-9][♣♦♥♠])/);
  if (exactSuited) {
    return normalizeSpacing(exactSuited[1]);
  }

  const exactRank = text.match(/你拿\s*([AKQJT2-9]{2})\b/i);
  if (exactRank) {
    return `${exactRank[1].toUpperCase()}（示例手牌）`;
  }

  if (/overpair/i.test(text)) return "超对 / Overpair";
  if (/中等顶对/.test(text)) return "中等顶对 / Medium top pair";
  if (/强顶对/.test(text)) return "强顶对 / Strong top pair";
  if (/顶对/.test(text)) return "顶对 / Top pair";
  if (/纯空气|空气/.test(text)) return "空气 / Air";
  if (/听牌/.test(text)) return "听牌 / Draw";
  if (/中等价值手/.test(text)) return "中等价值手 / Medium value hand";
  if (/中等成手/.test(text)) return "中等成手 / Medium made hand";
  if (/强成手/.test(text)) return "强成手 / Strong made hand";

  return "示例手牌 / Example hand";
}

function expandBoardSegment(segment: string, streetIndex: number) {
  const trimmed = segment.trim();
  if (!trimmed) {
    return trimmed;
  }

  if (/[♣♦♥♠]/.test(trimmed)) {
    return trimmed;
  }

  const ranksOnly = trimmed.replace(/[^AKQJT2-9]/gi, "");
  if (!ranksOnly) {
    return trimmed;
  }

  const baseSuits = streetIndex === 0 ? ["♠", "♦", "♣"] : streetIndex === 1 ? ["♥"] : ["♠"];
  return ranksOnly
    .split("")
    .map((rank, index) => `${rank.toUpperCase()}${baseSuits[index] ?? "♣"}`)
    .join(" ");
}

function formatBoardDisplay(board: string) {
  return board
    .split(/\s*->\s*/)
    .map((segment, index) => expandBoardSegment(segment, index))
    .join(" -> ");
}

function formatStreetDisplay(pot: string, board: string) {
  const lower = `${pot} ${board}`.toLowerCase();
  const street = lower.includes("river")
    ? "河牌 River"
    : lower.includes("turn") || board.includes("->")
      ? "转牌 Turn"
      : "翻牌 Flop";

  let structure = "";
  if (/3bet/i.test(lower)) {
    structure = "3bet 底池 / 3-bet pot";
  } else if (/multiway|多人/.test(lower)) {
    structure = "多人池 / Multiway pot";
  } else if (/srp|单挑|小池/.test(lower)) {
    structure = "单挑底池 SRP";
  }

  return structure ? `${street} / ${structure}` : street;
}

function formatActionLine(preflop: string) {
  const raw = normalizeSpacing(preflop);
  if (/3bet/i.test(raw) && /call/i.test(raw)) {
    return "3bet 后被跟 / 3-bet called";
  }
  if (/c-bet|bet-call|小注被跟|下注被跟|被跟/.test(raw)) {
    return "翻牌持续下注被跟 / Flop c-bet called";
  }
  if (/open/i.test(raw) && /call/i.test(raw)) {
    return "翻前加注被跟 / Raise-call";
  }

  return localizePokerTerms(raw.replace(/\bopen\b/gi, "开池加注 open"));
}

export function localizePokerTerms(text: string) {
  let localized = text;
  const placeholders: string[] = [];

  for (const [pattern, replacement] of termReplacements) {
    localized = localized.replace(pattern, () => {
      const token = `__TERM_${placeholders.length}__`;
      placeholders.push(replacement);
      return token;
    });
  }

  placeholders.forEach((replacement, index) => {
    localized = localized.split(`__TERM_${index}__`).join(replacement);
  });

  return localized;
}

export function getSkillIssueLabel(skill: ThreeLinesSkillIssue) {
  return skillLabelMap[skill];
}

export function getConfidenceLabel(confidence: ThreeLinesConfidence) {
  return confidenceLabelMap[confidence];
}

export function getTrainingContextDisplay(
  scenario: ThreeLinesScenario,
): TrainingContextDisplay {
  const [rawHero = "Hero"] = scenario.setup.positions.split(/\s+vs\s+/i);
  const sourceText = `${scenario.prompt} ${scenario.title} ${scenario.subtitle}`;

  return {
    summary: localizePokerTerms(
      `${formatPositionToken(rawHero)}，${formatVillainFromPositions(
        scenario.setup.positions,
        scenario.setup.villain,
      )}。`,
    ),
    heroPosition: formatPositionToken(rawHero),
    heroHand: detectHeroHand(sourceText),
    villainInfo: formatVillainFromPositions(scenario.setup.positions, scenario.setup.villain),
    actionLine: formatActionLine(scenario.setup.preflop),
    board: formatBoardDisplay(scenario.setup.board),
    street: formatStreetDisplay(scenario.setup.pot, scenario.setup.board),
  };
}
