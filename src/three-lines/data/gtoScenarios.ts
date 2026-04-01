import type { ThreeLinesScenario } from "../types";

function makeScenario(scenario: ThreeLinesScenario): ThreeLinesScenario {
  return scenario;
}

export const gtoScenarios: ThreeLinesScenario[] = [
  makeScenario({
    id: "TL-GTO-001",
    track: "gto",
    packId: "gto_cbet_windows",
    title: "A72r 的小注窗口",
    subtitle: "标准线先看范围优势和轻压空间。",
    prompt: "按钮位翻前开局后，大盲跟注。翻牌 A♣ 7♦ 2♠，默认标准线最推荐什么？",
    setup: {
      positions: "BTN vs BB",
      preflop: "BTN open，BB call",
      board: "A♣ 7♦ 2♠",
      pot: "单挑小池",
    },
    options: [
      { id: "A", label: "小注 c-bet" },
      { id: "B", label: "过牌" },
      { id: "C", label: "大注施压" },
    ],
    correctOptionId: "A",
    feedbackCorrect: {
      title: "推荐动作",
      body: "这是标准线里很舒服的小注窗口。你有范围优势，不需要把池子做大。",
      translation: "这种面轻轻打一枪最舒服，不需要猛轰。",
    },
    feedbackIncorrect: {
      B: {
        title: "这手别太被动",
        body: "你错过了一个很轻松拿主动的 spot。",
        translation: "该拿的小池先拿，不要白白让过。",
      },
      C: {
        title: "方向不差，尺度过重",
        body: "这里不是大注场景，你把 easy spot 打复杂了。",
        translation: "方向没错，但别用重锤打小钉子。",
      },
    },
    attribution: {
      primaryTrack: "gto",
      primarySkill: "standard_line_recognition",
      secondaryTrack: "gto",
      secondarySkill: "sizing_calibration",
      nextTrack: "gto",
      nextPackId: "gto_cbet_windows",
    },
    reminderSeeds: ["高张干燥面先想小注拿主动。"],
  }),
  makeScenario({
    id: "TL-GTO-002",
    track: "gto",
    packId: "gto_cbet_windows",
    title: "K83r 的低成本拿池",
    subtitle: "简单牌面优先轻压，不要无故让牌。",
    prompt: "CO 开局被大盲跟住，翻牌 K♦ 8♠ 3♣。默认标准线更推荐？",
    setup: {
      positions: "CO vs BB",
      preflop: "CO open，BB call",
      board: "K♦ 8♠ 3♣",
      pot: "单挑小池",
    },
    options: [
      { id: "A", label: "小注 c-bet" },
      { id: "B", label: "过牌看 turn" },
      { id: "C", label: "过池大注" },
    ],
    correctOptionId: "A",
    feedbackCorrect: {
      title: "推荐动作",
      body: "这类偏干高张面就是便宜施压的场景，小注已经足够。",
      translation: "先把最容易拿的小池拿下来。",
    },
    feedbackIncorrect: {
      B: {
        title: "这手别让得太轻",
        body: "你过牌过于保守，白白放掉了主动权。",
        translation: "偏干高张面别轻易把回合送出去。",
      },
      C: {
        title: "尺度用重了",
        body: "你没有必要在这么简单的牌面用大注极化自己。",
        translation: "轻轻打就够，不用重炮。",
      },
    },
    attribution: {
      primaryTrack: "gto",
      primarySkill: "sizing_calibration",
      secondaryTrack: "gto",
      secondarySkill: "standard_line_recognition",
      nextTrack: "gto",
      nextPackId: "gto_cbet_windows",
    },
    reminderSeeds: ["简单牌面先轻压，不要过度极化。"],
  }),
  makeScenario({
    id: "TL-GTO-003",
    track: "gto",
    packId: "gto_bad_boards",
    title: "J95 两同花面不要自动开枪",
    subtitle: "动态面和高连接面别拿默认线硬压。",
    prompt: "翻牌 J♣ 9♣ 5♦，对手跟注范围里连接牌和同花听牌很多。默认标准线更稳妥的是？",
    setup: {
      positions: "CO vs BB",
      preflop: "CO open，BB call",
      board: "J♣ 9♣ 5♦",
      pot: "单挑小池",
    },
    options: [
      { id: "A", label: "过牌" },
      { id: "B", label: "小注 c-bet" },
      { id: "C", label: "大注 c-bet" },
    ],
    correctOptionId: "A",
    feedbackCorrect: {
      title: "推荐动作",
      body: "这不是默认线里舒服的空气开枪位。对手的继续范围很活跃。",
      translation: "这种面别自动打一枪，先收一点更稳。",
    },
    feedbackIncorrect: {
      B: {
        title: "你把坏面当成了好面",
        body: "动态面上对手的继续部分不少，自动小注会把自己带进难受的 turn。",
        translation: "这不是随手打一枪就舒服的牌面。",
      },
      C: {
        title: "动作和尺度都过头了",
        body: "你在最不适合的时候把局面做大了。",
        translation: "坏牌面别硬轰，不值得。",
      },
    },
    attribution: {
      primaryTrack: "gto",
      primarySkill: "line_continuation",
      secondaryTrack: "line_range",
      secondarySkill: "range_narrowing",
      nextTrack: "line_range",
      nextPackId: "line_range_flop_call_narrowing_high_dry",
    },
    reminderSeeds: ["动态面先判断对手的继续范围，再决定要不要开枪。"],
  }),
  makeScenario({
    id: "TL-GTO-004",
    track: "gto",
    packId: "gto_bad_boards",
    title: "翻牌打一枪后，turn 坏牌先别补",
    subtitle: "延续条件不成立时，别为了主动硬续。",
    prompt: "你在 A 高干燥面翻牌小注后被跟住，turn 落下连张湿牌。默认标准线更稳妥的是？",
    setup: {
      positions: "BTN vs BB",
      preflop: "Flop 小注被跟",
      board: "A72r -> T♣",
      pot: "turn",
    },
    options: [
      { id: "A", label: "过牌控制" },
      { id: "B", label: "继续补第二枪" },
      { id: "C", label: "大注极化" },
    ],
    correctOptionId: "A",
    feedbackCorrect: {
      title: "推荐动作",
      body: "turn 没有继续帮你施压，默认线先收一点更稳。",
      translation: "一枪之后没帮忙的 turn，先别硬续。",
    },
    feedbackIncorrect: {
      B: {
        title: "你在机械补第二枪",
        body: "翻牌打过不代表 turn 一定还能继续讲故事。",
        translation: "不是每个 turn 都值得补。",
      },
      C: {
        title: "这手补得太重",
        body: "你在没有足够支持的 turn 上用重尺度继续施压。",
        translation: "没帮忙的 turn 别又续又打大。",
      },
    },
    attribution: {
      primaryTrack: "gto",
      primarySkill: "line_continuation",
      secondaryTrack: "line_range",
      secondarySkill: "hero_representation",
      nextTrack: "gto",
      nextPackId: "gto_bad_boards",
    },
    reminderSeeds: ["第二枪之前先确认 turn 有没有真帮你。"],
  }),
  makeScenario({
    id: "TL-GTO-005",
    track: "gto",
    packId: "gto_bad_boards",
    title: "中等顶对别轻易把池子做大",
    subtitle: "标准线不只管攻击，也管控池。",
    prompt: "你在 turn 持中等顶对，对手是普通娱乐局玩家，没有明显弃牌倾向。默认标准线更偏向？",
    setup: {
      positions: "IP vs OOP",
      preflop: "翻牌已被跟注",
      board: "Q74r -> 6♠",
      pot: "turn",
    },
    options: [
      { id: "A", label: "中等尺度继续开火" },
      { id: "B", label: "过牌控制" },
      { id: "C", label: "超池施压" },
    ],
    correctOptionId: "B",
    feedbackCorrect: {
      title: "推荐动作",
      body: "这是可控成手，不需要默认把池子做大。",
      translation: "这种牌先稳住，别自己把池子抬高。",
    },
    feedbackIncorrect: {
      A: {
        title: "这手打得有点过头",
        body: "你把原本可控的成手又往波动更大的方向推了一步。",
        translation: "中等牌先想控池，不是默认收费到底。",
      },
      C: {
        title: "这手打得太凶",
        body: "你在没有足够理由时把中等牌打成了极化线。",
        translation: "别把一对类的牌讲成怪物。",
      },
    },
    attribution: {
      primaryTrack: "gto",
      primarySkill: "standard_line_recognition",
      secondaryTrack: "line_range",
      secondarySkill: "hero_representation",
      nextTrack: "gto",
      nextPackId: "gto_bad_boards",
    },
    reminderSeeds: ["中等牌先想控池，别轻易把池子做大。"],
  }),
];
