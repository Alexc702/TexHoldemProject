# TexHolding MVP P0 Content And Runtime Spec

## 1. 目标

把 `knowledge-base` 中的内容内核收敛成 P0 可直接消费的运行时数据包，服务：

- 首轮 5 题训练
- 训练结果生成
- 今晚上桌提醒
- 赛后复盘结果
- 下一组训练推荐

P0 阶段不在 App 运行时直接加载整套知识库。

## 2. 内容源

### 2.1 输入文件

- `knowledge-base/manifest.json`
- `knowledge-base/poker_mvp_50_scenarios_training_db.json`
- `knowledge-base/standard_leak_taxonomy.v1.json`

### 2.2 使用原则

- `50 scenario db` 作为 P0 训练场景主来源
- `standard leak taxonomy` 作为唯一标准 leak 字典
- 训练场景中的旧别名 tag 必须在编译时归一化为标准 leak tag

例如：

- `MissedEasyCBet` -> `missed_easy_cbet`
- `TooPassiveOnDryAceHigh` -> `missed_easy_cbet`
- `OverbluffVsStation` -> `overbluff_vs_station`

## 3. P0 首发内容范围

### 3.1 训练包

P0 固定 3 个训练包：

1. `pack_cbet_basic`
   - 名称：什么时候可以放心开一枪
2. `pack_bluff_control`
   - 名称：什么时候别乱 bluff
3. `pack_pot_control`
   - 名称：别把中小底池越打越大

### 3.2 场景数量

- 首发运行时只编译 24 个 scenario
- 每个训练包 8 个
- 每次首训 session 抽 5 个

### 3.3 首发标准 leak

P0 只开放以下 8 个标准 leak：

- `auto_cbet_bad_boards`
- `missed_easy_cbet`
- `poor_cbet_sizing`
- `overbluff_vs_station`
- `auto_double_barrel`
- `misread_passive_aggression`
- `overvalue_medium_hands`
- `under_value_vs_station`

## 4. 运行时 bundle

P0 只给 App 3 份 bundle：

- `runtime_scenarios.json`
- `runtime_leaks.json`
- `runtime_reminders.json`

## 5. 数据契约

### 5.1 RuntimeScenario

```ts
type RuntimeScenario = {
  scenario_id: string
  pack_id: string
  title_cn: string
  theme_cn: string
  difficulty: "low" | "medium" | "high"
  stage: "首轮训练" | "复训"
  setup: {
    positions: string
    preflop: string
    board: string
    pot: string
  }
  prompt_cn: string
  options: Array<{
    id: string
    label: string
  }>
  correct_option_id: string
  feedback_correct: {
    summary: string
    coach_translation: string
  }
  feedback_incorrect: Record<
    string,
    {
      why_wrong: string
      fix: string
    }
  >
  linked_leak_tags: string[]
  reminder_seed: string
  recommended_next_pack_ids: string[]
}
```

### 5.2 RuntimeLeak

```ts
type RuntimeLeak = {
  leak_tag: string
  taxonomy_id: string
  leak_name_cn: string
  family: string
  user_facing_description: string
  fix_principle: string
  aliases: string[]
  default_reminder_texts: string[]
  recommended_pack_ids: string[]
}
```

### 5.3 RuntimeReminder

```ts
type RuntimeReminder = {
  reminder_id: string
  source_leak_tag: string
  slot: "remember" | "watch_opponent" | "avoid"
  reminder_text: string
  priority: number
}
```

### 5.4 TrainingSession

```ts
type TrainingSession = {
  session_id: string
  pack_id: string
  scenario_ids: string[]
  answers: Array<{
    scenario_id: string
    selected_option_id: string
    is_correct: boolean
    derived_leak_tags: string[]
  }>
  leak_scores: Record<string, number>
  primary_leak_tag: string
  secondary_leak_tags: string[]
  reminder_ids: string[]
  recommended_pack_id: string
  storage_scope: "local" | "account"
}
```

### 5.5 ReviewSubmission

```ts
type ReviewSubmission = {
  submission_id: string
  preflop_type: string
  hand_bucket: string
  board_class: string
  reached_street: string
  key_action: string
  self_doubt: string
  opponent_type?: string
}
```

### 5.6 ReviewResult

```ts
type ReviewResult = {
  submission_id: string
  confidence: "high" | "medium" | "low"
  primary_leak_tag: string
  secondary_leak_tags: string[]
  narrative_title: string
  narrative_text: string
  next_time_rules: string[]
  recommended_pack_id: string
}
```

## 6. 训练结果生成规则

### 6.1 leak 归一化

- 先把 scenario 的 `leak_tags` 通过 taxonomy alias 映射成标准 tag
- App 内只允许出现标准 tag

### 6.2 计分

- 答错：该 scenario 的 `linked_leak_tags` 各加 `1.0`
- 选择明显过激或过被动选项：可在编译时对特定 leak 加 `1.5`
- 答对：不累计 leak 分

### 6.3 primary leak 选取

按以下顺序选：

1. 最高 leak 分
2. 若并列，取更高优先级 leak
3. 若全对，使用当前训练包的 `default_focus_leak`

### 6.4 提醒生成

按以下顺序取 3 条：

1. primary leak 的高优先级 reminder
2. secondary leak 的高优先级 reminder
3. 若不足 3 条，用 primary leak 的 `fix_principle` 或 scenario 的 `reminder_seed` 补齐

### 6.5 推荐训练包

规则：

- 优先使用 `primary_leak_tag` 对应的 `recommended_pack_ids[0]`
- 若推荐结果与当前 pack 相同，则取次优 pack

## 7. 复盘结果生成规则

### 7.1 Review Input 字段映射

- `preflop_type`：怎么入池
- `hand_bucket`：大概拿的是什么牌
- `board_class`：翻牌面更像哪种
- `reached_street`：打到哪里
- `key_action`：最关键的动作
- `self_doubt`：最担心哪里打错
- `opponent_type`：可选

### 7.2 低置信度触发

满足任一条件即为 `low`：

- 缺少 `board_class`
- 缺少 `key_action`
- 6 个核心字段里有效值少于 4 个

### 7.3 ReviewResult 产出

P0 采用规则模板，不使用 AI：

1. 根据 `board_class + key_action + self_doubt + opponent_type` 命中 leak 候选
2. 选 1 个 primary leak 与 0 到 1 个 secondary leak
3. 用 leak 的 `user_facing_description + fix_principle` 生成 narrative
4. 用 leak reminder 模板生成 3 条 `next_time_rules`
5. 根据 primary leak 推荐训练包

## 8. 存储与登录绑定

### 8.1 未登录阶段

以下数据写本地：

- onboarding answers
- training session
- reminder card
- latest home state
- review submission / result

### 8.2 登录后

- 以本地最近一次未绑定 session 为主
- 登录成功后批量绑定到账号
- 已绑定后 `storage_scope` 改为 `account`

## 9. 内容 QA 清单

- 所有 scenario 都能映射到标准 leak
- 24 个首发 scenario 覆盖 8 个首发 leak
- 每个首发 leak 至少有 3 条可用 reminder
- 所有 primary leak 都能返回推荐训练包
- Review Result 在低置信度条件下仍能返回结果

## 10. 后续扩展

P1 再扩：

- 从 24 扩到 50 scenario
- 从 8 扩到 25 标准 leak
- 增加 narrative 模板精细化
- 增加按对手类型动态推荐 reminder
