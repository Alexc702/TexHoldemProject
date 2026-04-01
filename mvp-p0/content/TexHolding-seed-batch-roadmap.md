# TexHolding 160 个 Seed 分批路线图

更新时间：2026-03-31

## 1. 这份文档解决什么问题

当前我们已经有：

- `80 个 Exploit seed`
- `80 个 Line & Range seed`

下一步不是把 160 个 seed 一次性全部写成题，而是要把它们拆成：

- 哪些先进入第一批
- 第一批如何生成 `canonical question + variant group`
- 剩余 seed 按什么顺序进入第二批、第三批、第四批

## 2. 分批原则

分批不按“先写完哪个表”来定，而按 4 个标准来定：

1. `高频`
   - 朋友局里最常见
2. `高损失`
   - 错一次就容易亏钱
3. `高信任`
   - 结果页最容易形成可信证据链
4. `高迁移`
   - 一旦学会，能快速带到真实牌桌

## 3. 四个批次

## 3.1 Batch 1: Foundation

目标：

- 先建立最能带来真实收益、也最容易形成信任的核心训练闭环

包含 6 个 pack，合计 `48 个 seed`：

- `exploit_vs_station_value_ip`
- `exploit_stop_bluff_vs_station`
- `exploit_respect_passive_strength`
- `line_range_flop_call_narrowing_high_dry`
- `line_range_turn_barrel_density`
- `line_range_river_probe_density`

这是最先要做成 runtime 的一批。

## 3.2 Batch 2: Applied Core

目标：

- 在第一批的基础上，引入更完整的 exploit 和更丰富的范围变化

包含 6 个 pack，合计 `48 个 seed`：

- `exploit_pressure_overfolders`
- `exploit_thin_value_vs_rec`
- `exploit_confidence_discipline`
- `line_range_flop_call_narrowing_dynamic`
- `line_range_passive_polarization`
- `line_range_draw_retention_runout`

## 3.3 Batch 3: Advanced Context

目标：

- 补上更复杂的上下文、capped line 和 hero 端讲故事能力

包含 4 个 pack，合计 `32 个 seed`：

- `exploit_attack_capped_checks`
- `exploit_loose_table_isolation`
- `line_range_turn_checkthrough_cap`
- `line_range_hero_big_bet_story`

## 3.4 Batch 4: Edge Integration

目标：

- 处理更高级、更容易歧义、更需要迁移验证的边界内容

包含 4 个 pack，合计 `32 个 seed`：

- `exploit_weak_3bettor_adjustments`
- `exploit_multiway_underbluff`
- `line_range_hero_checkback_story`
- `line_range_multiway_collapse`

## 4. 为什么 Batch 1 是这 48 个 seed

因为这一批最适合先验证产品最核心的价值：

- 我是不是知道该对谁收费
- 我是不是知道该对谁收手
- 我是不是知道被动玩家后程发力往往更强
- 我是不是知道 flop 跟注后空气已经变少
- 我是不是知道第二枪前要比较 value / bluff 密度
- 我是不是知道 turn check-through 后 river probe 往往不是“很多 bluff”

这 6 组内容都很贴近：

- 朋友局高频错误
- 结果页高说服力
- 赛前提醒可执行

## 5. Batch 1 的生成目标

对 Batch 1 的 `48 个 seed`，每个 seed 生成：

- `1 道 canonical question`
- `3 道 variant`
- `1 道 transfer item`

因此 Batch 1 的第一阶段总产出目标是：

- `48 道 canonical question`
- `144 道 variant`
- `48 道 transfer item`

合计：

- `240 道 runtime item`

## 6. Batch 1 的 6 个模板组

为了避免 48 个 seed 都从零写，Batch 1 先按 6 个 pack 模板来组织。

## 6.1 EXP-T1

- `template_id = EXP-T1`
- 对应 pack：`exploit_vs_station_value_ip`

### Canonical Question 模板

- 面对明显不爱弃牌的对手，判断这手是否该主动收费而不是保守错过价值

### Variant Group 模板

- `V1`
  - 同对象，换成更干或更极化的牌面，仍然测薄价值收费
- `V2`
  - 同对象，推进到 turn 或 river，测第二层与第三层收费纪律
- `V3`
  - 同对象，换成 3bet pot 或 multiway，测价值目标是否仍然清晰

### Transfer 模板

- 在没有明确写着 station 的新题里，仍能优先识别“先收费”而不是乱平衡

## 6.2 EXP-T2

- `template_id = EXP-T2`
- 对应 pack：`exploit_stop_bluff_vs_station`

### Canonical Question 模板

- 面对会跟到底的人群，判断当前空气/弱权益手是否应该停止 bluff

### Variant Group 模板

- `V1`
  - 换 flop 结构，仍然测对低弃牌率对象是否该放弃第一枪
- `V2`
  - 推进到 turn blank 或 scare card，测是否会错误补第二枪
- `V3`
  - 推进到 river 极化节点，测是否仍对 bluffcatch-heavy 范围硬开火

### Transfer 模板

- 在对象标签不完全明确的新题里，仍能识别低 fold equity 并主动收手

## 6.3 EXP-T3

- `template_id = EXP-T3`
- 对应 pack：`exploit_respect_passive_strength`

### Canonical Question 模板

- 面对被动玩家在 turn / river 突然发力，判断是否应该显著收紧继续范围

### Variant Group 模板

- `V1`
  - 换 turn raise / lead 形式，仍然测被动强度识别
- `V2`
  - 换 river donk / overbet 形式，测是否会过度 bluffcatch
- `V3`
  - 换 multiway 或 3bet pot 场景，测强度判断是否仍然保守

### Transfer 模板

- 在不完全标准的后程突然加速线里，仍然优先把被动玩家归入 value-heavy

## 6.4 LR-T1

- `template_id = LR-T1`
- 对应 pack：`line_range_flop_call_narrowing_high_dry`

### Canonical Question 模板

- 在高张干燥面被跟注后，判断空气下降、对子与高张保留的基础结构

### Variant Group 模板

- `V1`
  - 换 A-high / K-high / paired dry 板面，仍然测空气削减与中等牌保留
- `V2`
  - 换 pool 画像如 station / passive / overfolder，测收缩幅度调整
- `V3`
  - 换成 3bet pot dry board，测 pot type 改变后保留范围

### Transfer 模板

- 在未见过的高张干燥面里，仍能先削掉纯空气而保留合理 showdown/value 区域

## 6.5 LR-T2

- `template_id = LR-T2`
- 对应 pack：`line_range_turn_barrel_density`

### Canonical Question 模板

- 在 flop 被跟后到 turn，判断 blank/scare/完成牌面对 bluff 与 value 密度的影响

### Variant Group 模板

- `V1`
  - 换 blank turn，测是否错误高估继续 fold equity
- `V2`
  - 换 scare 或 completed draw turn，测密度是否发生真实重排
- `V3`
  - 换 station / passive / multiway 语境，测人口倾向下的 turn density 调整

### Transfer 模板

- 面对新 runout 时，仍能先判断 turn 是否真的支持继续讲故事

## 6.6 LR-T3

- `template_id = LR-T3`
- 对应 pack：`line_range_river_probe_density`

### Canonical Question 模板

- 在 turn check-through 之后遇到 river probe，判断这条线更多保留的是中等 value 还是 bluff

### Variant Group 模板

- `V1`
  - 换 heads-up 不同 runout，仍测 probe line 的 merge/value 权重
- `V2`
  - 换 passive rec / station / weak reg，测 pool 对 probe 密度的影响
- `V3`
  - 换 multiway 或 completed-draw river，测 probe 线是否更 underbluffed

### Transfer 模板

- 在陌生 river probe 题里，仍能避免把“turn 过牌”误读成“river bluff 很多”

## 7. Batch 1 的最合理产出顺序

建议把 Batch 1 再拆成 3 个小步：

### Step A

- `exploit_vs_station_value_ip`
- `line_range_flop_call_narrowing_high_dry`

目标：

- 先建立“先收费”和“跟注后空气减少”这两个最直观收益点

### Step B

- `exploit_stop_bluff_vs_station`
- `line_range_turn_barrel_density`

目标：

- 先压掉最亏钱的 turn / river 乱 bluff

### Step C

- `exploit_respect_passive_strength`
- `line_range_river_probe_density`

目标：

- 建立后程价值密度判断与被动玩家强度识别

## 8. 配套清单

第一批 `48 个 seed` 的逐项 manifest 在这里：

- [TexHolding-batch-1-canonical-variant-manifest.csv](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-batch-1-canonical-variant-manifest.csv)

## 9. 最终结论

这份路线图的核心价值不是“把 160 个 seed 机械分组”，而是：

- 先把最能建立用户信任的内容做出来
- 先把最值钱的题族变成 canonical + variants + transfer
- 让 TexHolding 从一开始就按“教学系统”而不是“题库堆积”来扩容
