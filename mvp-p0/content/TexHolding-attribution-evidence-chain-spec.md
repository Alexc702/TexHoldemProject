# TexHolding 题库归因证据链加固规范

更新时间：2026-03-31

## 0. 文档目的

这份文档解决一个核心问题：

`用户为什么会相信这条建议真的是从自己的错误里推出来的？`

TexHolding 过去的风险不是没有建议，而是：

- 题目和建议之间的关系不够明显
- 结果像总结，不像证据链推导
- 推荐下一练时，用户看不见“为什么是这条”

因此本规范的目标不是补更多文案，而是把整条链条钉死：

`题目 -> 错误类型 -> 归因标签 -> 证据权重 -> 结果结论 -> 今晚提醒 -> 下一练推荐`

## 1. 总原则

每一次训练结果、复盘结果、提醒卡，都必须满足 4 个条件：

1. `可追溯`
   - 任何结论都能回溯到具体题目或具体复盘输入
2. `可解释`
   - 能说清是哪里错、为什么错、错在三条线中的哪一条
3. `可执行`
   - 结果最终要变成桌边语言，而不是抽象标签
4. `可反驳`
   - 如果证据不足，系统必须降置信度，而不是假装精确

## 2. 一条硬证据链必须包含什么

每个题目最终进入结果页前，必须经历 7 个环节：

1. `Question Intent`
   - 这道题到底在测什么
2. `Expected Logic`
   - 正确答案成立的逻辑是什么
3. `Observed Deviation`
   - 用户偏离了正确逻辑的哪个方向
4. `Primary Attribution`
   - 主错误属于哪条线、哪种能力问题
5. `Secondary Evidence`
   - 有哪些辅助信号支持或修正主归因
6. `Recommendation Mapping`
   - 为什么要给这条提醒、这组训练
7. `Confidence Control`
   - 这条结论的把握有多高

如果其中任何一步缺失，这条证据链都算不完整。

## 3. Question Intent 层

每道题都必须明确写出它测的不是“这手牌对不对”，而是具体能力。

### 3.1 必填字段

- `track`
- `question_type`
- `primary_skill_issue`
- `secondary_skill_issue[]`
- `decision_focus`
- `spot_family`

### 3.2 允许的 decision_focus

- `baseline_action`
- `sizing_choice`
- `continuation_discipline`
- `deviation_permission`
- `target_selection`
- `range_narrowing`
- `density_comparison`
- `hero_representation`
- `future_street_forecast`

### 3.3 设计红线

禁止存在这种题：

- 看起来像在练 GTO，实际又想测 exploit
- 看起来像在练 exploit，实际错误又只能落到范围阅读
- 一道题同时承担 4 种以上能力判断

每题最多：

- `1 个主能力`
- `1 到 2 个辅能力`

## 4. Expected Logic 层

每道题都必须明确“正确答案为什么成立”，不能只写正确按钮。

### 4.1 GTO 题必须包含

- `baseline_reason`
  - 范围优势 / nut 优势 / 牌面结构 / 控池需求 / 频率逻辑
- `action_family`
  - bet / check / call / fold / raise
- `sizing_family`
  - small / medium / large / overbet
- `future_line_validity`
  - 这条线到下一街是否容易延续

### 4.2 Exploit 题必须包含

- `baseline_before_deviation`
  - 如果没有 exploit 理由，默认线是什么
- `villain_assumption`
  - 对手类型或人群倾向是什么
- `deviation_reason`
  - 为什么偏离比 baseline 更高 EV
- `failure_if_wrong_read`
  - 如果对手读错，会错在哪里

### 4.3 Line & Range 题必须包含

- `range_before`
  - 当前街前的双方范围桶
- `range_after`
  - 当前行动线后的范围桶变化
- `density_shift`
  - 哪类牌密度上升 / 下降
- `decision_impact`
  - 这个范围变化会如何影响下一步决策

## 5. Observed Deviation 层

用户一旦答错，系统不能只记录“错了”，必须记录“错向了哪边”。

### 5.1 必填字段

- `selected_option`
- `correct_option`
- `deviation_family`
- `deviation_direction`
- `severity_weight`

### 5.2 deviation_family

- `aggression_direction`
- `sizing_direction`
- `baseline_vs_deviation`
- `target_selection`
- `range_scope`
- `density_read`
- `line_story`
- `future_line_planning`

### 5.3 deviation_direction 示例

- `too_passive`
- `too_aggressive`
- `too_small`
- `too_large`
- `deviated_without_permission`
- `missed_allowed_deviation`
- `narrowed_too_little`
- `narrowed_too_much`
- `overestimated_bluff_density`
- `underestimated_value_density`
- `story_not_credible`
- `next_street_not_supported`

### 5.4 severity_weight 规则

- `1`
  - 轻微偏差，正确方向但力度有问题
- `2`
  - 中等错误，主方向错
- `3`
  - 高价值错误，会直接导致朋友局反复亏钱

P1 内容优先覆盖 `severity_weight = 2 或 3` 的题。

## 6. Primary Attribution 层

答错后必须落到统一归因 taxonomy，而不是自由发挥。

### 6.1 三线主归因

- `gto`
  - 默认线判断错误
- `exploit`
  - 偏离对象或偏离纪律错误
- `line_range`
  - 行动线对应范围理解错误

### 6.2 一级归因标签

#### GTO

- `gto_under_aggression`
- `gto_over_aggression`
- `gto_sizing_too_small`
- `gto_sizing_too_large`
- `gto_bad_continuation`
- `gto_range_confusion`

#### Exploit

- `missed_exploit`
- `false_exploit`
- `wrong_target`
- `over_extension`
- `value_bluff_inversion`
- `low_confidence_overreach`

#### Line & Range

- `range_not_narrowed`
- `range_over_narrowed`
- `hero_line_misrepresentation`
- `villain_density_misread`
- `future_street_disconnect`
- `combo_weight_misread`

### 6.3 归因稳定性规则

同一道题在相同错误选项下，一级归因必须稳定。

禁止：

- 今天答 B 落到 `wrong_target`
- 明天同样答 B 又落到 `false_exploit`

除非题目元数据本身变化，否则归因不能漂移。

## 7. Secondary Evidence 层

一级归因还不够，必须有“为什么是它”的证据补强。

### 7.1 证据来源

- `board_texture_signal`
- `range_advantage_signal`
- `villain_profile_signal`
- `line_consistency_signal`
- `density_signal`
- `future_street_signal`
- `repeat_error_signal`

### 7.2 二级标签作用

二级标签不直接给用户看，但必须参与：

- 结果页解释
- 提醒文案选择
- 下一练推荐
- 置信度判断

### 7.3 常用二级标签

- `misread_board_texture`
- `missed_range_advantage`
- `failed_to_identify_station`
- `failed_to_identify_passive_strength`
- `failed_to_extract_value`
- `failed_to_respect_uncertainty`
- `overestimate_bluff_density`
- `underestimate_value_density`
- `misread_capped_range`
- `misread_polarization`

## 8. Recommendation Mapping 层

系统不能从一级归因直接跳到“推荐 pack”。中间必须有规则。

### 8.1 推荐必须回答 3 个问题

1. `为什么给这条提醒`
2. `为什么推荐这条线`
3. `为什么推荐这个 pack`

### 8.2 提醒映射规则

提醒卡必须至少包含：

- `one_rule_to_do`
- `one_rule_to_stop`
- `one_table_cue`

例子：

- `one_rule_to_do`
  - 高张干燥面先用小注拿主动
- `one_rule_to_stop`
  - 不要对明显不弃牌的人硬 bluff
- `one_table_cue`
  - 跟住两街后先把空气密度往下调

### 8.3 pack 推荐规则

推荐 pack 不能只看主标签，还要看：

- 当前题属于哪个 `spot_family`
- 错误是否是 `基础补强` 还是 `跨线解释`

规则：

- 若主错误在线内可修复，先推同 track pack
- 若主错误依赖另一条线解释，再推跨线 pack

示例：

- `false_exploit + failed_to_identify_station`
  - 先推 `exploit_vs_station_value`
- `gto_bad_continuation + overestimate_bluff_density`
  - 可先推 `gto_turn_barrel_conditions`
  - 再推 `line_range_turn_density`

## 9. Confidence Control 层

### 9.1 为什么必须显式做置信度

如果系统证据不足却给得很笃定，用户会最快失去信任。

### 9.2 训练结果置信度

建议按以下方式算：

- `high`
  - 命中同一主归因 >= 3 次，且二级证据方向一致
- `medium`
  - 命中主归因 2 次，或主归因 1 次但二级证据非常集中
- `low`
  - 错题分散，没有形成稳定模式

### 9.3 复盘结果置信度

必须同时看：

- 填写字段完整度
- 叙述是否包含动作线
- 是否有对手类型线索
- 是否有范围或密度线索

## 10. 结果页必须展示什么

对用户展示层必须至少有 5 个槽位：

1. `主问题线`
2. `主能力问题`
3. `一句解释`
4. `今晚 3 条提醒`
5. `下一组训练`

但在内部必须保留完整证据对象：

- `evidence_question_ids[]`
- `evidence_deviation_families[]`
- `evidence_primary_tags[]`
- `evidence_secondary_tags[]`
- `evidence_score_breakdown`
- `confidence`

## 11. 开发约束

### 11.1 不允许只有文案没有结构

任何结果页文案都必须从结构化字段生成或映射。

### 11.2 不允许 recommendation free text

所有推荐都必须来自：

- 明确的 `recommendation_tag`
- 明确的 `pack_id`
- 明确的 `mapping_rule_id`

### 11.3 不允许题库无证据字段上线

如果一个题只有：

- prompt
- options
- correct_answer

但没有：

- attribution
- evidence
- recommendation mapping

这道题不应进入生产题库。

## 12. 验收标准

一套内容要被认为“证据链做硬了”，至少满足：

1. 任意结果都能回溯到具体错题和具体错误方向
2. 同一错误路径不会出现漂移归因
3. 用户能看懂“为什么是这条建议”
4. 系统会在证据不足时主动降置信度
5. 同一主问题能够稳定推荐同一类 pack
6. 跨线推荐时能解释“为什么不是留在原线内解决”

## 13. 业界最佳还要求什么

仅有“可追溯归因”还不够。对标成熟训练器和高质量课程体系，TexHolding 若想达到业界最佳，内容系统还必须多满足 5 个要求：

### 13.1 `Source Provenance`

每个题和每个规则都要能回答：

- 这个标准线依据来自哪里
- 这个 exploit 假设依据什么人口倾向
- 这个范围结论依据什么行动线结构

最低要求：

- `source_family`
  - solver_baseline / coach_playbook / population_read / internal_model
- `source_version`
- `population_scope`
  - live_lowstakes / home_game / loose_private / generic
- `review_owner`

没有 provenance 的题，后续一定会在内容扩容时失真。

### 13.2 `Difficulty & Mastery`

业界最佳内容不是只把题堆多，而是知道：

- 哪些题是入门基线
- 哪些题是迁移检查
- 哪些题是高阶区分题

每题必须能落到：

- `difficulty_tier`
  - foundation / applied / edge_case
- `mastery_weight`
  - 1 / 2 / 3

### 13.3 `Recurrence & Spaced Reinforcement`

真正有效的训练不只看“这次错了”，还看：

- 同类错误是否重复出现
- 多久后再次出现
- 是否已经在未见新题里再次犯错

因此 session 聚合必须支持：

- `repeat_error_score`
- `time_decay_weight`
- `spacing_trigger`

### 13.4 `Unseen Transfer Validation`

只有原题答对，不代表真的学会。

业界最佳必须显式验证：

- 用户是否能在未见过的新牌面 / 新对手 / 新 runout 下迁移

因此至少要有：

- `variant_group_id`
- `transfer_test_required`
- `transfer_pass_threshold`

### 13.5 `Content QA & Release Gate`

不能所有 seed 都直接进题库。

每题至少要经过：

1. 内容作者填写结构化字段
2. 规则审阅
3. 用户语言审阅
4. 结果页映射审阅
5. 小样本试测

上线前必须有：

- `qa_status`
  - draft / reviewed / tested / production_ready
- `qa_notes`
- `last_reviewed_at`

## 14. 本轮落地范围

本轮先把这套规范应用到：

- `Exploit` 高价值题库
- `Line & Range` 高价值题库

GTO 线继续沿用已有结构，但后续应补到同一标准。
