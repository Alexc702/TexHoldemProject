import { foundationScenarios } from "./foundationScenarios";
import { gtoScenarios } from "./gtoScenarios";
import type {
  ThreeLinesPackId,
  ThreeLinesPackMeta,
  ThreeLinesScenario,
  ThreeLinesSkillIssue,
  ThreeLinesTrackId,
  ThreeLinesTrackMeta,
} from "../types";

export const threeLinesTracks: Record<ThreeLinesTrackId, ThreeLinesTrackMeta> = {
  gto: {
    id: "gto",
    title: "标准线 / GTO",
    label: "标准线",
    shortLabel: "GTO",
    subtitle: "默认应该怎么打，先把自动错误降下来。",
    accent: "gold",
  },
  exploit: {
    id: "exploit",
    title: "针对人 / Exploit",
    label: "针对人",
    shortLabel: "Exploit",
    subtitle: "先认人，再决定偏离方向和价值目标。",
    accent: "ink",
  },
  line_range: {
    id: "line_range",
    title: "行动线与范围 / Line & Range",
    label: "行动线与范围",
    shortLabel: "L&R",
    subtitle: "这条线后还剩什么牌，密度怎么变，你自己又在代表什么。",
    accent: "ivory",
  },
};

export const threeLinesPacks: Record<ThreeLinesPackId, ThreeLinesPackMeta> = {
  gto_cbet_windows: {
    id: "gto_cbet_windows",
    track: "gto",
    title: "什么时候可以放心持续下注（c-bet）",
    subtitle: "高张干燥面和轻压窗口。",
    estimatedMinutes: 3,
  },
  gto_bad_boards: {
    id: "gto_bad_boards",
    track: "gto",
    title: "坏牌面什么时候该停手",
    subtitle: "动态面、坏 turn 和控池节点。",
    estimatedMinutes: 3,
  },
  exploit_vs_station_value_ip: {
    id: "exploit_vs_station_value_ip",
    track: "exploit",
    title: "对爱跟玩家先收费",
    subtitle: "先拿价值，不要把会付钱的人打跑。",
    estimatedMinutes: 6,
  },
  exploit_stop_bluff_vs_station: {
    id: "exploit_stop_bluff_vs_station",
    track: "exploit",
    title: "别在爱跟玩家身上乱诈唬",
    subtitle: "低弃牌率对象前先把诈唬许可收紧。",
    estimatedMinutes: 6,
  },
  exploit_respect_passive_strength: {
    id: "exploit_respect_passive_strength",
    track: "exploit",
    title: "尊重被动玩家后程发力",
    subtitle: "被动人突然加速时，默认更偏价值端。",
    estimatedMinutes: 6,
  },
  line_range_flop_call_narrowing_high_dry: {
    id: "line_range_flop_call_narrowing_high_dry",
    track: "line_range",
    title: "高张干燥面翻牌跟注后怎么缩窄",
    subtitle: "先削空气，再保留中间层和真实继续。",
    estimatedMinutes: 6,
  },
  line_range_turn_barrel_density: {
    id: "line_range_turn_barrel_density",
    track: "line_range",
    title: "第二枪前后看密度",
    subtitle: "空白转牌、吓人牌和完成牌怎样改写继续条件。",
    estimatedMinutes: 6,
  },
  line_range_river_probe_density: {
    id: "line_range_river_probe_density",
    track: "line_range",
    title: "河牌探测下注后价值还是诈唬更多",
    subtitle: "转牌过牌后，学会重估合并价值和真实诈唬密度。",
    estimatedMinutes: 6,
  },
};

type SkillMeta = {
  name: string;
  diagnosis: string;
  reminders: string[];
  defaultNextTrack: ThreeLinesTrackId;
  defaultNextPackId: ThreeLinesPackId;
};

export const skillMeta: Record<ThreeLinesSkillIssue, SkillMeta> = {
  standard_line_recognition: {
    name: "标准线识别不稳",
    diagnosis: "你不是完全不会打，而是默认线经常打得太自动或太保守。",
    reminders: [
      "先看牌面结构，再决定默认线。",
      "有范围优势时用更轻的方式拿主动。",
      "不舒服的牌面先别自动开枪。",
    ],
    defaultNextTrack: "gto",
    defaultNextPackId: "gto_cbet_windows",
  },
  sizing_calibration: {
    name: "尺度校准不稳",
    diagnosis: "你常把简单 spot 打重，把坏 spot 又打得过满。",
    reminders: [
      "简单牌面先想小注，不要默认大注。",
      "尺度是决策的一部分，不只是按钮大小。",
      "不确定时先减少波动。",
    ],
    defaultNextTrack: "gto",
    defaultNextPackId: "gto_cbet_windows",
  },
  line_continuation: {
    name: "延续条件判断不稳",
    diagnosis: "你容易把翻牌的主动权机械带到 turn，没有让 runout 真正改写计划。",
    reminders: [
      "补第二枪前先问 turn 有没有真的帮你。",
      "一枪没打走，不代表一定要继续。",
      "坏 turn 先收一点，别硬续。",
    ],
    defaultNextTrack: "gto",
    defaultNextPackId: "gto_bad_boards",
  },
  opponent_identification: {
    name: "对手识别不准",
    diagnosis: "你会把不同类型的娱乐局玩家混成一种人，结果对错的人做了错事。",
    reminders: [
      "先判断他是会弃，还是会跟。",
      "被动玩家突然发力，先把强度预期调高。",
      "别拿自己希望他弃牌，代替他真的会弃牌。",
    ],
    defaultNextTrack: "exploit",
    defaultNextPackId: "exploit_respect_passive_strength",
  },
  deviation_discipline: {
    name: "偏离纪律不稳",
    diagnosis: "你知道可以偏离，但常常在没有充分理由时就偏了，尤其容易对错的人 bluff。",
    reminders: [
      "baseline 不是唯一答案，但偏离一定要有对象。",
      "别为了显得会 exploit 就强行偏离。",
      "不确定时先回到更稳的默认线。",
    ],
    defaultNextTrack: "exploit",
    defaultNextPackId: "exploit_stop_bluff_vs_station",
  },
  value_targeting: {
    name: "价值目标选错了",
    diagnosis: "你常在该收费的人身上没收费，在不该 bluff 的人身上去 bluff。",
    reminders: [
      "对爱跟的人，先想怎么收费。",
      "value 和 bluff 要看对象，而不是看心情。",
      "先拿稳的钱，再追花活。",
    ],
    defaultNextTrack: "exploit",
    defaultNextPackId: "exploit_vs_station_value_ip",
  },
  range_narrowing: {
    name: "范围收缩不稳",
    diagnosis: "你还没有跟着行动线持续缩窄对手范围，经常把已经掉队的空气继续留在脑子里。",
    reminders: [
      "每跟住一街，纯空气就要往下调。",
      "别只看自己两张牌，先看他的继续范围。",
      "从空气、中等成手、听牌三层开始想。",
    ],
    defaultNextTrack: "line_range",
    defaultNextPackId: "line_range_flop_call_narrowing_high_dry",
  },
  range_density_reading: {
    name: "密度判断不稳",
    diagnosis: "你常把 bluff 密度看太高，或把 value 密度看太低，所以后程判断会过度乐观。",
    reminders: [
      "bluffcatch 前先问 value 密度还是 bluff 密度更高。",
      "一路跟到后程后，空牌通常没你想的那么多。",
      "别拿绝对牌力代替密度判断。",
    ],
    defaultNextTrack: "line_range",
    defaultNextPackId: "line_range_river_probe_density",
  },
  hero_representation: {
    name: "自己的行动线表达不清",
    diagnosis: "你常常没意识到自己这条线在代表什么范围，故事讲得太大或太断裂。",
    reminders: [
      "大注前先问：我在代表什么。",
      "未来街走不通的故事，当前街就别硬讲。",
      "自己的线要能自圆其说。",
    ],
    defaultNextTrack: "line_range",
    defaultNextPackId: "line_range_turn_barrel_density",
  },
};

export const threeLinesScenarios: ThreeLinesScenario[] = [...gtoScenarios, ...foundationScenarios];
