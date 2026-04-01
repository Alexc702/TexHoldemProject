# TexHolding Three-Lines 术语表

## 0. 目标

这份术语表用于统一 TexHolding 在训练题、结果页、提醒页和复盘页中的语言风格。

原则只有三条：

- 中文优先，英文补充
- 不允许只显示英文缩写
- 不允许只显示牌面简写而不显示花色

## 1. UI 渲染规则

### 1.1 展示顺序

- 首选：`中文 / English`
- 允许：`中文（English）`
- 禁止：只显示英文，例如 `check-call`、`range density`、`station`

### 1.2 牌面规则

- UI 中的牌面必须显示真实花色，例如：`A♣ 7♦ 2♠`
- 不允许只显示简写牌面，例如：`Q74r`
- 如果需要补充牌面类别，应写成：
  - `A♣ 7♦ 2♠ · 高张彩虹面`
  - `9♦ 7♣ 5♦ · 动态两同花面`

### 1.3 位置规则

- 位置要同时给中文和常用缩写
- 推荐格式：
  - `按钮位 BTN`
  - `大盲 BB`
  - `小盲 SB`
  - `劫位 CO`
  - `枪口位 UTG`
- 如果题目只知道相对位置，也不能只写 `IP / OOP`
- 推荐格式：
  - `有位置 IP`
  - `无位置 OOP`

### 1.4 行动线规则

- 行动线要写中文主描述，再补英文
- 推荐格式：
  - `翻前加注被跟 / Raise-call`
  - `翻牌持续下注被跟 / Flop c-bet called`
  - `过牌跟注 / Check-call`
  - `过牌加注 / Check-raise`

## 2. 核心产品术语

| 中文主标签 | 英文补充 | 说明 |
| --- | --- | --- |
| 标准线 | GTO / Baseline | 默认应该怎么打 |
| 针对人 | Exploit | 根据对手类型偏离标准线 |
| 行动线与范围 | Line & Range | 看每条街后还剩什么牌、自己代表什么 |
| 主问题线 | Primary Track Issue | 这轮最主要出错的能力线 |
| 主能力问题 | Primary Skill Issue | 更细的能力层错误 |
| 今晚上桌提醒 | Tonight Reminder | 赛前可直接扫描的动作提醒 |
| 推荐下一步 | Recommended Next Step | 下一组应该练什么 |

## 3. 街道与动作

| 中文主标签 | 英文补充 | 推荐 UI 文案 |
| --- | --- | --- |
| 翻牌 | Flop | `翻牌 Flop` |
| 转牌 | Turn | `转牌 Turn` |
| 河牌 | River | `河牌 River` |
| 过牌 | Check | `过牌 / Check` |
| 跟注 | Call | `跟注 / Call` |
| 下注 | Bet | `下注 / Bet` |
| 加注 | Raise | `加注 / Raise` |
| 弃牌 | Fold | `弃牌 / Fold` |
| 持续下注 | c-bet | `持续下注 / c-bet` |
| 过牌跟注 | Check-call | `过牌跟注 / Check-call` |
| 过牌加注 | Check-raise | `过牌加注 / Check-raise` |
| 第二枪 | Second barrel | `第二枪 / Second barrel` |
| 超池下注 | Overbet | `超池下注 / Overbet` |

## 4. 范围与读牌

| 中文主标签 | 英文补充 | 推荐 UI 文案 |
| --- | --- | --- |
| 范围 | Range | `范围 / Range` |
| 范围收缩 | Range narrowing | `范围收缩 / Range narrowing` |
| 密度判断 | Range density | `密度判断 / Range density` |
| 价值下注 | Value bet | `价值下注 / Value bet` |
| 诈唬 | Bluff | `诈唬 / Bluff` |
| 弃牌率 | Fold equity | `弃牌率 / Fold equity` |
| 听牌 | Draw | `听牌 / Draw` |
| 中等成手 | Medium made hand | `中等成手 / Medium made hand` |
| 强成手 | Strong made hand | `强成手 / Strong made hand` |
| 空气 | Air | `空气 / Air` |

## 5. 对手类型

| 中文主标签 | 英文补充 | 推荐 UI 文案 |
| --- | --- | --- |
| 爱跟玩家 | Calling station | `爱跟玩家 / Calling station` |
| 被动玩家 | Passive player | `被动玩家 / Passive player` |
| 松凶玩家 | Loose-aggressive | `松凶玩家 / LAG` |
| 紧弱玩家 | Tight-passive | `紧弱玩家 / Tight-passive` |
| 会宽跟的娱乐玩家 | Call-happy rec | `会宽跟的娱乐玩家 / Call-happy rec` |
| 黏性范围 | Sticky range | `黏性范围 / Sticky range` |

## 6. 牌局结构

| 中文主标签 | 英文补充 | 推荐 UI 文案 |
| --- | --- | --- |
| 单挑单加注底池 | Single-raised pot | `单挑底池 SRP / Single-raised pot` |
| 3bet 底池 | 3-bet pot | `3bet 底池 / 3-bet pot` |
| 多人池 | Multiway pot | `多人池 / Multiway pot` |
| 有位置 | In position | `有位置 IP / In position` |
| 无位置 | Out of position | `无位置 OOP / Out of position` |

## 7. 技能问题映射

| 内部 key | 用户可见中文 | 英文补充 |
| --- | --- | --- |
| `standard_line_recognition` | 标准线识别不稳 | Baseline recognition |
| `sizing_calibration` | 尺度校准不稳 | Sizing calibration |
| `line_continuation` | 延续条件判断不稳 | Line continuation |
| `opponent_identification` | 对手识别不准 | Opponent identification |
| `deviation_discipline` | 偏离纪律不稳 | Deviation discipline |
| `value_targeting` | 价值目标选错了 | Value targeting |
| `range_narrowing` | 范围收缩不稳 | Range narrowing |
| `range_density_reading` | 密度判断不稳 | Range density reading |
| `hero_representation` | 自己的行动线表达不清 | Hero representation |

规则：

- 任何用户可见页面都禁止显示内部 key
- 内部 key 只能存在于代码和日志

## 8. 训练题固定信息区规范

每道训练题都必须有固定信息区，字段顺序统一为：

1. `Hero 位置 / Hero`
2. `手牌 / Hand`
3. `对手 / Villain`
4. `行动线 / Line`
5. `牌面 / Board`
6. `街道 / Street`

显示要求：

- Hero 位置要显示中文位置名和缩写
- 手牌要显示具体两张牌；如果题目只训练范围，也要给一个明确示例手牌
- 对手要显示人数和位置，例如：`大盲 BB（1 人）`
- 牌面必须带花色
- 行动线和街道必须中文优先，英文补充

## 9. 禁止事项

- 禁止只写 `Q74r`、`A72r` 这类牌面简写
- 禁止只写 `IP vs OOP`
- 禁止只写 `station`、`check-call`、`range density`
- 禁止在结果页显示 `standard_line_recognition` 这类内部 key
