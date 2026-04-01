# TexHolding 证据链接入 Runtime 与结果页计划

更新时间：2026-03-31

## 1. 现状体验评估

基于当前 Three-Lines 版本，整体体验已经具备不错的产品骨架，但还停留在：

- `训练流程顺`
- `概念分线清楚`
- `结果能给建议`

还没有做到：

- `结果为什么成立，用户一眼就信`
- `推荐为什么是这条线/这组 pack，用户能复述出来`

### 1.1 当前体验优点

- Welcome 到 Training Hub 的心智建立是清楚的
- 三条线区分明确，不会把学习目标混在一起
- 单轮 5 题的训练节奏轻，适合移动端
- 训练后能立刻给主问题、提醒和下一练
- 复盘链路已经能把用户拉回训练

### 1.2 当前体验短板

- 结果页仍然偏“黑盒”
- 用户看不到“哪些题是证据”
- 用户看不到“我是错向了哪里”
- 推荐 pack 的原因没有显式展示
- 复盘结果虽然有置信度，但证据来源仍不透明

### 1.3 当前最准确的体验判断

- `UI / 交互：已经足够验证`
- `内容结构：已经成型`
- `用户信任感：还差最后一跳`

这个“最后一跳”就是：

把 `schema v2 + seed library + 审计标准` 真正接进 runtime 和结果交互。

## 2. 这轮工作的核心目标

把 TexHolding 从：

- `做完一轮后知道结论`

推进到：

- `做完一轮后知道结论为什么成立`

### 2.1 产品目标

用户在结果页必须能回答 4 个问题：

1. 我主要错的是哪条线
2. 哪几题说明了这件事
3. 我每次是朝哪个方向错的
4. 为什么下一步该练这个 pack

### 2.2 开发目标

前端和内容层必须都能消费统一的结构化对象，而不是页面自己拼逻辑。

### 2.3 验收目标

任何一次训练结果，都必须带出：

- `evidence_question_ids`
- `evidence_primary_tags`
- `evidence_secondary_tags`
- `confidence`
- `recommendation_reason`

## 3. 目标状态

## 3.1 训练页目标状态

训练过程仍然保持轻，不增加重负担。

但每道题内部要已经能产出：

- 这题测的是什么能力
- 用户错向了哪里
- 这个错误对主问题分数加了多少权重

这些不一定全部在题面展示，但必须进入 runtime evidence record。

## 3.2 结果页目标状态

结果页新增 4 个关键模块：

1. `主问题结论`
2. `为什么是它`
3. `这 2 到 3 道题是主要证据`
4. `为什么推荐这条线 / 这个 pack`

结果页不应只展示“你这轮主问题是 X”，而应展示：

- `你在 3 道题里都朝同一个方向错了`
- `其中 2 道题的共同点是 ...`
- `所以今晚提醒先记住这 3 条`

## 3.3 复盘结果页目标状态

复盘结果页要做到：

- 不只告诉用户“更像哪条线的问题”
- 还要告诉用户：
  - 哪些输入字段支撑了这个判断
  - 还有哪些关键信息缺失
  - 为什么当前置信度是 low / medium / high

## 4. Runtime 应该怎么拆

建议把 runtime 从“题目列表”升级成 5 层结构：

1. `runtime_questions_v2`
2. `runtime_pack_catalog`
3. `runtime_recommendation_rules`
4. `runtime_copy_templates`
5. `runtime_quality_meta`

## 4.1 runtime_questions_v2

每题至少包含：

- `item_id`
- `track`
- `pack_id`
- `question_type`
- `decision_focus`
- `primary_skill_issue`
- `secondary_skill_issues`
- `expected_logic`
- `error_map`
- `recommendation_contract`
- `difficulty_tier`
- `mastery_weight`
- `variant_group_id`
- `provenance`
- `quality_gate`

## 4.2 runtime_pack_catalog

每个 pack 包含：

- `pack_id`
- `track`
- `title`
- `goal`
- `prerequisite_pack_ids`
- `seed_item_ids`
- `difficulty_mix`
- `recommended_for_primary_tags[]`

## 4.3 runtime_recommendation_rules

每条规则包含：

- `rule_id`
- `primary_tag`
- `secondary_tag_support[]`
- `minimum_score`
- `confidence_requirement`
- `primary_pack_id`
- `cross_track_pack_id?`
- `why_this_pack_template_id`

## 4.4 runtime_copy_templates

把用户可见文案模板结构化：

- `diagnosis_template`
- `evidence_explanation_template`
- `table_cue_template`
- `stop_rule_template`
- `next_pack_reason_template`
- `low_confidence_template`

## 4.5 runtime_quality_meta

用于内容运营和 QA：

- `qa_status`
- `review_owner`
- `population_scope`
- `source_version`

## 5. 引擎改造计划

## 5.1 阶段 1：Evidence Record 引擎

目标：

- 每次答题后不只记录答案，还记录证据对象

新增对象：

- `SessionEvidenceRecord`

字段建议：

- `session_id`
- `question_id`
- `track`
- `selected_option_id`
- `correct_option_id`
- `deviation_family`
- `deviation_direction`
- `primary_tag`
- `secondary_tags[]`
- `severity_weight`
- `mastery_weight`
- `recommendation_tag`
- `cross_track_recommendation_tag?`

验收：

- 任意 session 都能导出完整 evidence record 列表

## 5.2 阶段 2：Aggregation 引擎

目标：

- 从“累计错题”升级成“累计证据”

输出对象：

- `AggregatedResultEvidence`

字段建议：

- `primary_track_issue`
- `primary_skill_issue`
- `primary_tag`
- `secondary_tags[]`
- `evidence_question_ids[]`
- `evidence_score_breakdown`
- `repeat_error_score`
- `confidence`
- `recommended_pack_id`
- `recommendation_reason`

验收：

- 结果页所有结论都能追到 evidence object

## 5.3 阶段 3：Transfer / Recurrence 钩子

目标：

- 先把接口和结构预留好，即使第一版不做完整算法

至少预留：

- `variant_group_id`
- `repeat_error_score`
- `time_decay_weight`
- `spacing_trigger_days`

验收：

- 同一能力问题后续能接入“再练一题”与“未见变体题”

## 6. 页面改造计划

## 6.1 Training Result Page

新增模块：

1. `主问题卡`
2. `为什么是它`
3. `这 3 道题是证据`
4. `今晚提醒`
5. `推荐下一练`

### “为什么是它”模块建议显示

- `你连续 3 次把 blank turn 当成了继续 bluff 的好牌`
- `共同错误是：高估了 bluff 密度`

### “这 3 道题是证据”模块建议显示

每条证据卡至少展示：

- 题面摘要
- 用户所选动作
- 正确方向
- 错向说明

## 6.2 Review Result Page

新增模块：

1. `主问题线`
2. `判断依据`
3. `缺失了哪些信息`
4. `所以本次置信度是 ...`
5. `推荐回练`

### 判断依据示例

- 你选择了 `river bluff`
- 你同时写了 `可能把 bluff 密度看高了`
- 你补充了 `空气应该不多了`
- 所以系统优先判断为 `Line & Range`

## 6.3 Home Page

首页不做大改，只增加一块轻量入口：

- `最近一次推荐为什么是这条`

避免首页变成 dashboard。

## 7. 交互原则

### 7.1 不要把结果页做成解释课

规则是：

- 给证据
- 给一句说明
- 给一条可执行动作

不要在移动端塞太多长文。

### 7.2 用户看见的是“证据翻译”，不是 schema

内部有很多结构字段，但用户层只需要看到：

- 你错在哪
- 为什么
- 下次怎么做

### 7.3 低置信度必须真低置信度

不允许低证据时给高确定语气。

## 8. 开发阶段计划

### Phase A. 内容接线

目标：

- 把 schema v2 和 seed library 映射成 runtime 设计稿

产物：

- `runtime_questions_v2.json` 结构定义
- `runtime_pack_catalog.json` 结构定义
- `runtime_recommendation_rules.json` 结构定义

### Phase B. 引擎接线

目标：

- 改造 session 与 result engine，使其输出 evidence object

产物：

- `SessionEvidenceRecord`
- `AggregatedResultEvidence`
- `ReviewEvidenceResult`

### Phase C. 页面接线

目标：

- 让结果页、复盘页真正显示证据链

产物：

- Result Page 新模块
- Review Result 新模块
- Home 轻量解释入口

### Phase D. 验证

目标：

- 确认用户真的更相信结果

需要验证：

- 用户能否复述“为什么是这条建议”
- 用户能否指出至少 1 道证据题
- 用户是否更愿意点击“练这个”

## 9. 成功指标

这轮改造成功，不看 UI 是否更花，而看以下指标：

1. `结果可解释率`
   - 80% 以上用户能复述为什么推荐这条线
2. `证据识别率`
   - 70% 以上用户能指出至少 1 条结果证据
3. `推荐信任度`
   - 结果页到推荐训练点击率提升
4. `复盘说服力`
   - 用户对低置信度和高置信度差异有感知

## 10. 最终目标

最终不是把结果页做得更复杂，而是把 TexHolding 从：

- `我知道系统给了我一个结论`

推进到：

- `我知道系统为什么这样判断，而且我愿意按它去练`

这一步一旦做好，TexHolding 才会从“训练产品”真正变成“可信的实战纠偏系统”。
