# TexHolding Seed -> 题目变体 -> 错因 -> 反馈 -> 推荐 生成框架

更新时间：2026-03-31

## 0. 文档定位

这份文档定义 TexHolding 的内容生产主流程：

`seed -> canonical question -> variant group -> wrong-path attribution -> feedback -> recommendation -> transfer validation`

目标不是“更快扩题”，而是：

- 让题库扩容仍然保持教学质量
- 让结果页建议有稳定证据链
- 让题量增长不破坏用户信任

关联文档：

- [题库归因证据链加固规范](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-attribution-evidence-chain-spec.md)
- [归因 schema v2](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-question-bank-attribution-schema-v2.json)
- [Exploit 高价值题库 80 题 seed](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-exploit-high-value-bank.csv)
- [Line & Range 高价值题库 80 题 seed](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-line-range-high-value-bank.csv)

## 1. 先给结论

好的教学软件不会从“题目文本”开始，而是从“能力与错误”开始。

TexHolding 也应该这样做：

1. 先定义 `seed`
2. 再生成 `canonical question`
3. 再扩成 `variant group`
4. 再为每个错误选项绑定 `wrong-path attribution`
5. 再生成 `feedback`
6. 再生成 `recommendation`
7. 最后用 `transfer item` 验证是否真的学会

如果顺序反过来，题库就会重新退化成：

- 题量很多
- 建议很多
- 但结果不可信

## 2. 框架中的 6 个核心对象

### 2.1 `Skill Atom`

这是最小教学能力单元，不直接给用户看，但决定所有内容结构。

示例：

- `standard_line_recognition`
- `deviation_discipline`
- `range_density_reading`
- `hero_representation`

### 2.2 `Seed`

seed 是“高价值场景原型”，不是最终题目。

它只定义：

- 这类 spot 值得练什么
- 最常见的错误是什么
- 应该落到哪条线、哪类归因

seed 的职责是：

- 稳定定义一个题族
- 稳定绑定一个主能力点
- 稳定绑定一条主要证据链

### 2.3 `Canonical Question`

每个 seed 必须先落成 1 道标准题。

这道题的作用不是扩题，而是定义：

- 这个 seed 的标准表达方式
- 这个 seed 最典型的正确逻辑
- 这个 seed 的 2 到 3 种典型错法

### 2.4 `Variant Group`

这是围绕同一个 seed 的小型题族。

variant 不是随便换一个牌面，而是保留：

- 同一个主能力
- 同一种主要错误方向
- 同一类结果页建议

### 2.5 `Evidence Record`

用户每答一道题，系统就生成一条 evidence record。

这条记录告诉系统：

- 这题在测什么
- 用户朝哪个方向错
- 这个错误支持哪条归因
- 这个错误应该把用户推向哪条提醒或哪组训练

### 2.6 `Result Bundle`

Result Bundle 是最终被用户看到的结果结构。

它由多条 evidence record 聚合而来，至少包含：

- 主问题线
- 主能力问题
- 主证据题
- 今晚上桌提醒
- 下一组训练推荐

## 3. 生成总流程

## 3.1 阶段 A：Seed 标准化

输入：

- seed 行记录

输出：

- `NormalizedSeed`

每个 seed 标准化后必须具备：

- `seed_id`
- `track`
- `pack_id`
- `skill_atom`
- `spot_family`
- `street`
- `pot_type`
- `board_class`
- `villain_profile`
- `core_error`
- `primary_attr`
- `secondary_attr`
- `recommendation_pack`

### 标准化规则

1. 一个 seed 只能有 1 个主能力
2. 一个 seed 只能有 1 个主归因标签
3. 一个 seed 最多允许 1 到 2 个稳定的次级标签
4. 一个 seed 必须能明确回答“这题教用户改什么”

## 3.2 阶段 B：生成 Canonical Question

输入：

- `NormalizedSeed`

输出：

- `CanonicalQuestion`

Canonical Question 必须补齐：

- 中文题干
- 具体牌局设定
- 2 到 4 个选项
- 正确答案
- 选项语义
- 预期逻辑

### 生成规则

1. 题干必须体现该 seed 的核心冲突
2. 错误选项必须代表“真实用户最常犯的错”，不是为了凑选项
3. 选项之间要能形成清晰错向：
   - 太激进
   - 太保守
   - 对错对象偏离
   - 范围收缩过少 / 过多

## 3.3 阶段 C：生成 Wrong-Path Attribution

输入：

- `CanonicalQuestion`

输出：

- `WrongPathMap`

每个错误选项必须生成：

- `deviation_family`
- `deviation_direction`
- `severity_weight`
- `primary_tag`
- `secondary_tags[]`
- `evidence_signals[]`

### 关键原则

不是每个错选项都只等于“错误动作”。

它必须回答：

- 用户究竟是错在方向
- 还是错在目标
- 还是错在密度理解
- 还是错在行动线故事根本不成立

## 3.4 阶段 D：生成 Feedback

输入：

- `CanonicalQuestion`
- `WrongPathMap`

输出：

- `FeedbackContract`

每个反馈必须由 4 层组成：

1. `正确结论`
2. `你错在什么`
3. `桌边翻译`
4. `下一组训练`

### 按 track 的反馈重点

#### GTO

- 正确默认线是什么
- 为什么是这个默认线
- 哪种牌面识别出了问题

#### Exploit

- baseline 是什么
- 为什么这里允许或不允许偏离
- 你是对错的人做了错事，还是没对该 exploit 的对象 exploit

#### Line & Range

- 这条线后哪些牌明显减少 / 保留
- 你忽略了哪类密度变化
- 这会如何影响下一街

## 3.5 阶段 E：生成 Recommendation

输入：

- `WrongPathMap`
- `FeedbackContract`

输出：

- `RecommendationContract`

每条推荐必须明确绑定：

- `primary_recommendation_tag`
- `primary_pack_id`
- `cross_track_recommendation_tag?`
- `cross_track_pack_id?`
- `why_this_pack`

### 推荐规则

1. 先修主问题，再考虑跨线解释
2. 如果主问题在线内能修，不要过早跨线
3. 如果错误根本依赖另一条线解释，才推跨线 pack

示例：

- `false_exploit + failed_to_identify_station`
  - 先推 `exploit_vs_station_value`
- `range_not_narrowed + overestimate_bluff_density`
  - 先推 `line_range_turn_density`
- `gto_bad_continuation + overestimate_bluff_density`
  - 主推 `gto_turn_barrel_conditions`
  - 次推 `line_range_turn_density`

## 3.6 阶段 F：生成 Variant Group

输入：

- `CanonicalQuestion`

输出：

- `VariantQuestions[]`

### Variant 的目的

不是扩题量，而是验证：

- 用户是不是真的掌握了这个能力
- 还是只记住了原题

### Variant 的生成红线

variant 必须保留：

- 同一个主能力
- 同一个主归因
- 同一种主要错向

如果变体一换，主能力和归因也变了，那不是 variant，而是新 seed。

## 3.7 阶段 G：生成 Transfer Item

输入：

- `VariantGroup`

输出：

- `TransferItem`

Transfer Item 的作用是：

- 检验用户能不能把这个能力迁移到“未见新题”

它通常会：

- 换牌面
- 换对象
- 换 runout
- 换上下文

但仍然考同一个核心能力。

## 4. 三条线各自怎么生成变体

## 4.1 GTO 线

### 变体维度

- `board_class`
- `pot_type`
- `street`
- `hero_hand_bucket`
- `sizing_family`

### 不应乱动的部分

- 主能力问题
- 正确逻辑类型
- 错向类型

### 示例

seed：

- `高张干燥面的小注窗口`

可扩：

- A72r
- K83r
- Q74r
- 3bet pot 的 A-high dry

它们都还是在测：

- `standard_line_recognition`
- 常见错向是：
  - `too_passive`
  - `too_large`

## 4.2 Exploit 线

### 变体维度

- `villain_profile`
- `population_scope`
- `confidence_level`
- `board_class`
- `street_progression`

### 不应乱动的部分

- baseline 与 exploit 的关系
- 主错因
- 推荐 pack 方向

### 示例

seed：

- `别在 station 身上乱 bluff`

可扩：

- flop 高张干燥面
- turn blank 继续补枪
- river 极化 bluff
- multiway 背景

这些题都还是在测：

- `deviation_discipline`
- 常见错因：
  - `false_exploit`
  - `failed_to_identify_station`

## 4.3 Line & Range 线

### 变体维度

- `street_focus`
- `action_history`
- `range_perspective`
  - villain / hero
- `density_focus`
- `future_street_requirement`

### 不应乱动的部分

- 核心范围变化模式
- 主要密度错误
- 主提醒方向

### 示例

seed：

- `river probe 后 value 还是 bluff 更多`

可扩：

- 单挑 probe
- 被动玩家 probe
- 多人池 probe
- flush complete runout probe

这些题都还是在测：

- `range_density_reading`
- 常见错因：
  - `villain_density_misread`
  - `underestimate_value_density`

## 5. 推荐题量如何形成

## 5.1 每个 seed 的最小产出

每个 seed 至少生成：

- `1 道 canonical question`
- `2 道变体题`
- `1 道 transfer item`

总计：

- `1 + 2 + 1 = 4 题`

## 5.2 推荐产出

更合理的中档方案：

- `1 道 canonical question`
- `3 到 4 道变体题`
- `1 道 transfer item`

总计：

- `5 到 6 题 / seed`

按当前 `160 seed` 算：

- `640 到 960 题`

这就是 TexHolding 第一阶段比较像样的题量目标。

## 5.3 为什么不建议一上来做更大

因为真正稀缺的不是题量，而是：

- 稳定归因
- 稳定推荐
- 稳定迁移

先把每个 seed 做成 `5 到 6 题的高质量题族`，远比匆忙做 3000 题更值钱。

## 6. 每个阶段的输入输出表

| 阶段 | 输入 | 输出 | 验收标准 |
|---|---|---|---|
| A. Seed 标准化 | seed 行记录 | NormalizedSeed | 1 seed = 1 主能力 + 1 主归因 |
| B. Canonical Question | NormalizedSeed | 标准题 | 有清晰题干、选项、正确逻辑 |
| C. Wrong-Path Attribution | 标准题 | WrongPathMap | 每个错项都有稳定错因 |
| D. Feedback | 标准题 + 错因 | FeedbackContract | 有正确结论、错因、桌边翻译 |
| E. Recommendation | 错因 + 反馈 | RecommendationContract | 能解释为什么推荐这条/这个 pack |
| F. Variant Group | 标准题 | 2-4 道变体题 | 不改变主能力与主归因 |
| G. Transfer Item | 题族 | 迁移题 | 未见新题仍测同一能力 |

## 7. 内容作者实际怎么用

内容作者不应直接“写题”，而应按以下顺序工作：

1. 先选 seed
2. 写这个 seed 的教学目标
3. 写主错因与次错因
4. 写 canonical question
5. 写 2 到 3 个最真实的错误选项
6. 给每个错误选项绑定错向
7. 生成反馈
8. 生成推荐
9. 再扩 2 到 4 个变体
10. 最后补 1 个 transfer item

## 8. 开发如何接这套框架

开发不需要理解每个 seed 的扑克逻辑细节，但必须遵守以下对象边界：

### 开发只消费这些对象

- `runtime_questions_v2`
- `error_map`
- `recommendation_contract`
- `result_evidence_record`
- `session_aggregation_rule`

### 开发不要自己推导这些逻辑

前端页面不应该自己猜：

- 为什么是这个主问题
- 为什么是这个 pack
- 这题错在什么方向

这些都应该由 runtime 结构直接提供。

## 9. 一个完整示例

## 9.1 Exploit 示例

seed：

- `EXP-009`
- spot：K83r 高张干燥面，对 sticky BB 乱 bluff

### Canonical Question

- 题面：CO open，BB call，翻牌 K83r
- 选项：
  - 小注 c-bet
  - 过牌
  - 大注施压

### Wrong Paths

- 选 `小注 c-bet`
  - 若对象明确是 station，这里可能落到：
  - `false_exploit`
  - `failed_to_identify_station`
- 选 `大注施压`
  - 更高 severity
  - 因为在错对象身上做更重的错误偏离

### Feedback

- 正确结论：这种人群先别拿空气去轻压
- 你错在什么：你把默认 c-bet 逻辑直接套给了不会弃牌的人
- 桌边翻译：他不是会让小枪生效的人

### Recommendation

- 主推：`exploit_vs_station_value`
- 原因：你当前更需要学“面对 station 先收费”，而不是“再想怎么 bluff”

## 9.2 Line & Range 示例

seed：

- `LR-033`
- spot：turn check-through 后 river probe，value 还是 bluff 更多

### Canonical Question

- 题面：flop cbet call，turn check-through，river villain probe
- 选项：
  - bluff 密度明显更高
  - value 密度略高
  - 两者差不多

### Wrong Paths

- 选 `bluff 密度明显更高`
  - `villain_density_misread`
  - `underestimate_value_density`

### Feedback

- 正确结论：这条线里中等 value 往往比用户直觉里多
- 你错在什么：你把 turn 没继续进攻误读成“空气很多”
- 桌边翻译：过了一条街，不等于他就只剩 bluff

### Recommendation

- 主推：`line_range_river_bluffcatch_density`
- 原因：你需要先纠正 river 的密度阅读，不是继续刷动作题

## 10. 最终目标

这个框架真正要达成的不是“能生成更多题”，而是：

- 让每一题都能回到同一条教学主线
- 让每一轮结果都能拿出证据
- 让题库扩容后系统仍然可信

如果做对了，TexHolding 才会从：

- `有很多题`

变成：

- `有很多题，而且每一题都在教同一套决策系统`
