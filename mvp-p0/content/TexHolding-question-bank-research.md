# TexHolding 题库研究与组织方案

## 1. 这份文档解决什么问题

当前 H5 的页面与交互已经足够，但最核心的训练内容还不够强：

- 题目密度不够
- 题目之间缺少体系
- 做题与结果建议之间的映射关系偏弱
- 用户很快就会觉得“做几次就没新收获”

这份文档的目标是把题库能力直接拉高到一个更专业的水位：

- 不再做一套混合型题库
- 明确拆成 `GTO` 和 `Exploit` 两条独立训练线
- 用最强的外部训练源做研究基线
- 组织成可扩展到 `上千 / 上万题` 的结构，而不是只堆若干题

## 2. 先说结论

### 2.1 不要继续做“一套题库混着练”

应该拆成两套完全不同的训练系统：

- `GTO 题库`
  - 目标：让用户知道标准线、频率感、尺度逻辑、节点结构
  - 题目判断标准：更接近 solver / equilibrium 的正确动作
- `Exploit 题库`
  - 目标：让用户识别对手漏洞、人口倾向和低级别常见失误，并学会偏离标准线
  - 题目判断标准：针对特定对手与环境的更高 EV 偏离

### 2.2 不要直接复制外部付费题库

外部最好的训练源大多是商业产品：

- GTO Wizard
- PeakGTO
- DTO Poker
- Upswing Poker
- Red Chip Poker

这些来源非常适合做：

- 训练体系研究
- 题型组织研究
- taxonomy 设计
- 反馈结构研究
- 题目难度分层研究

但不适合直接照搬它们的题干、图表、答案或付费 drills。  
TexHolding 应该做的是：

- 基于这些最强来源建立自己的 `题库结构`
- 用公开概念和自有表达生成原创题
- 如果未来要大规模复用付费内容，必须走授权或合作

### 2.3 GTO 与 Exploit 两条题库的最佳来源并不对称

GTO 线已经有非常成熟的“海量训练器”：

- GTO Wizard
- PeakGTO
- DTO Poker

Exploit 线则更像“高价值教材 + quiz + playbook”的组合：

- Upswing 的 exploit hub 和 quiz
- Red Chip 的 exploit 文章、范围 app 和 playbook

所以：

- `GTO 题库` 适合做成海量参数化题库
- `Exploit 题库` 适合做成 opponent / leak / node 驱动的场景库

## 3. 研究方法

本次研究使用了两种方式：

- 搜索官方页面与帮助文档
- 用本地安装的 `web-content-fetcher` skill 脚本提取官方页面正文

确认过的官方来源包括：

- [GTO Wizard Practice Mode](https://help.gtowizard.com/gto-wizard-trainer-tips-tricks/)
- [PeakGTO](https://pokercoaching.com/peakgto)
- [DTO Poker](https://www.dtopoker.com/)
- [Red Chip GTO Ranges App](https://redchippoker.com/gto-ranges-app)
- [Upswing Exploitative Poker Hub](https://upswingpoker.com/learn-exploitative-poker/)
- [Upswing vs RFI Quiz](https://upswingpoker.com/vs-rfi-quiz-answers-and-explanations/)
- [Red Chip Exploitative Poker 101](https://redchippoker.com/exploitative-poker-101/)
- [Red Chip Low-Stakes Poker Playbook](https://redchippoker.com/playbook)

## 4. GTO 题库：最优组织方案

### 4.1 题库定位

GTO 题库不是“记答案”，而是“练标准线和节点直觉”。

用户做完后应该获得：

- 标准线是什么
- 常见牌面 / 节点上应该更偏 check 还是 bet
- 尺度偏好是什么
- 什么时候该混频，什么时候该单一动作

### 4.2 最佳外部来源

#### A. GTO Wizard

价值判断：

- 目前最强的综合型 GTO trainer 之一
- 训练覆盖 `preflop -> river`
- 支持按街道、节点、range builder、performance stats 训练
- 非常适合作为 TexHolding 的 `GTO taxonomy` 参考基线

适合借鉴：

- 节点拆分方式
- drill 组织方式
- performance / leak 反馈方式
- `某一街 / 某一动作 / 某一范围` 的题库切片逻辑

不建议直接复制：

- solver 解答文本
- 图表
- 具体 drill 题目

#### B. PeakGTO

价值判断：

- 官方页面明确强调 `20M+ unique spots`
- 还有 `50+ hand-picked drills`、`drill of the day` 和 `ELO`
- 说明它同时具备海量题库和精选题包两层结构

适合借鉴：

- `海量 trainer + curated drills` 的双层架构
- ELO 或 mastery 的能力刻画方式
- 用“每日 drill”保持复访的机制

#### C. DTO Poker

价值判断：

- 强调 `simplified GTO`
- 不是一味追求复杂 tree，而是强调高 EV、易执行、适合真实打牌
- 对 TexHolding 很重要，因为我们的用户不一定愿意吃纯 solver 味很重的内容

适合借鉴：

- 简化后的标准线题
- 将复杂 solver 答案转成“可执行策略”的方式
- `cash / tournament` 拆线

#### D. Red Chip GTO Ranges App

价值判断：

- 主要强在 preflop ranges
- 还明确同时提供 `GTO + exploitative` 范围
- 很适合成为 TexHolding 的 preflop / 入池前章节补充

适合借鉴：

- `game type -> action -> position` 的范围组织方式
- 让用户以图表和简洁颜色快速识别正确动作

### 4.3 GTO 题库结构

建议拆成 6 大层：

1. `Preflop Exact`
   - 开局、3bet、4bet、vs open、vs cold call、ICM preflop
2. `Flop C-Bet`
   - 高频小注、check-back、不利牌面停手、范围优势识别
3. `Turn Barrel`
   - 好 turn / 坏 turn、第二枪条件、延迟持续下注
4. `River Decision`
   - thin value、bluff frequency、bluffcatch、blocker 逻辑
5. `Pot Type`
   - SRP、3bet pot、4bet pot、multiway、limped pot
6. `Game Type`
   - cash、MTT、浅筹码 push/fold、ICM

### 4.4 GTO 题目字段

每题都应带上：

- `spot_id`
- `game_type`
- `effective_stack`
- `pot_type`
- `positions`
- `street`
- `board_class`
- `action_history`
- `hero_hand_bucket`
- `villain_range_hint`
- `answer_type`
  - exact action
  - preferred size
  - frequency bucket
  - range construction
- `correct_action`
- `acceptable_alternatives`
- `feedback_why`
- `feedback_pattern`
- `linked_concepts`

### 4.5 GTO 题库的规模化方式

GTO 题库非常适合用参数化扩展：

- `position x stack depth x pot type x board class x street x hand bucket`

只要 taxonomy 够稳，很容易把题库扩到几千甚至几万题。

建议初始规模：

- P1 先做 `600 - 1000` 题
- 其中 preflop 约 `250`
- flop / turn / river 合计 `350 - 750`

## 5. Exploit 题库：最优组织方案

### 5.1 题库定位

Exploit 题库不是“标准答案题库”，而是“对错误对象、错误环境、错误人口倾向做出错误决策”的纠偏题库。

用户做完后应该获得：

- 识别对手类型
- 识别群体漏洞
- 学会什么时候偏离标准线
- 明白偏离的理由，而不是只看结果

### 5.2 最佳外部来源

#### A. Upswing Exploitative Poker Hub

价值判断：

- 官方页面已经把 exploit 学习拆成 `courses / articles / videos / quizzes`
- 说明 exploit 训练天然就应该是多形态组合，而不是只做题

适合借鉴：

- `主题文章 + quiz + deeper course` 的漏斗结构
- 玩家类型与 exploit 主题目录
- 把 exploit 内容跟具体对手问题绑定

#### B. Upswing vs RFI Quiz

价值判断：

- 这是很好的“单题 + 解释”结构样本
- 虽然题目本身基于 chart 和 solver，但解析里一直强调“若有 exploit reason 可以偏离”
- 说明它非常适合做 `GTO 基线 + exploit 偏离条件` 的桥梁题型

适合借鉴：

- 单题三选一结构
- 题后解释模板
- 将“标准线”和“偏离条件”放在同一反馈里

#### C. Red Chip Exploitative Poker 101

价值判断：

- 对 exploit 的定义非常清楚：识别失衡并攻击失衡
- 内容是低级别真实环境导向，不是 solver 崇拜
- 很适合做 TexHolding 的 exploit 理论底层

适合借鉴：

- `opponent imbalance -> exploit action -> line EV` 的结构
- 题后反馈要解释“为什么这条 exploit 有钱赚”

#### D. Low-Stakes Poker Playbook

价值判断：

- 这是非常强的 exploit 题库母本
- 官方明确强调 `99 proven plays`
- 并采用统一的 `IF / THEN` 结构
- 覆盖 preflop、postflop、value、bluff、defense、多方底池和 soft skills

这类结构非常适合 TexHolding：

- 每条 play 都能扩成一组题
- 每组题都可以围绕一个 exploit 原则
- 它不是死记 chart，而是按 `对象 / 条件 / 执行动作` 组织

### 5.3 Exploit 题库结构

Exploit 题库建议按 5 个维度组织：

1. `Opponent Type`
   - calling station
   - nit
   - weak reg
   - aggro reg
   - passive rec
   - maniac
2. `Population Leak`
   - overfold vs turn barrel
   - overcall flop
   - underbluff river
   - donk sizing tells
   - weak probe lines
3. `Node`
   - preflop
   - flop c-bet
   - turn barrel
   - river bluffcatch
   - check-raise
   - probe / donk / delayed c-bet
4. `Board / Texture`
   - dry high card
   - low connected
   - paired
   - monotone / two-tone
5. `Goal`
   - exploit fold frequency
   - extract value
   - induce mistake
   - deny realization
   - avoid punting

### 5.4 Exploit 题目字段

每题建议带上：

- `opponent_type`
- `population_assumption`
- `spot_id`
- `board_class`
- `line_context`
- `hero_goal`
- `action_options`
- `best_exploit_action`
- `best_baseline_action`
- `why_deviate`
- `what_leak_it_attacks`
- `what_goes_wrong_if_misapplied`
- `confidence`
  - high if opponent read is explicit
  - medium if based on population only
  - low if read weak

### 5.5 Exploit 题库的规模化方式

Exploit 题库适合用组合扩展，而不是直接抄题：

- `opponent_type x leak x node x board_class x hero_goal`

这个组合一旦稳定，几千题非常容易做出来。

建议初始规模：

- P1 先做 `400 - 800` 题
- 低级别 live / friends game 优先
- 每个 opponent archetype 先做 `50 - 100` 题

## 6. 最适合 TexHolding 的题型组合

### 6.1 GTO 线题型

- `单题判断题`
  - 适合首轮训练
- `尺度题`
  - 小注 / 中注 / 大注 / check
- `频率题`
  - 总是、经常、少量、几乎不
- `range builder`
  - 用于更高阶用户
- `drill pack`
  - 按节点集中刷题

### 6.2 Exploit 线题型

- `读对手题`
  - 先判断对手类型，再选动作
- `偏离标准线题`
  - 先给 GTO 基线，再问是否要偏离
- `IF / THEN 规则题`
  - 很适合快速形成桌边习惯
- `line continuation 题`
  - 好 exploit 开始后，下一街是否继续
- `止损题`
  - 防止用户用 exploit 当借口乱打

## 7. 对 TexHolding 最重要的改法

### 7.1 结果页不要只输出 leak

必须显式告诉用户：

- 这是 `GTO 基线问题` 还是 `Exploit 问题`
- 你错的是 `标准线`
- 还是你在 `错误对象身上做了错误偏离`

### 7.2 每题必须有“建议来源类型”

每题应该标记：

- `baseline_gto`
- `exploit_vs_station`
- `exploit_vs_underbluffer`
- `exploit_vs_overfolder`

否则结果页很难解释“为什么推荐这条建议”。

### 7.3 不要只做“正确动作”

每题反馈要分 3 层：

1. 标准线是什么
2. 为什么
3. 如果换成某类对手，是否允许偏离

这才是用户真正能学到东西的地方。

## 8. 推荐落地顺序

### 阶段 1：先把 2 套题库彻底分开

- `GTO Core Bank`
- `Exploit Edge Bank`

### 阶段 2：先做 1000 题的起步规模

- GTO：`600`
- Exploit：`400`

### 阶段 3：每题都绑定结果映射

- `question_tag -> leak_tag -> recommendation_tag`

### 阶段 4：再扩到几千题

扩容逻辑：

- GTO 按参数化扩展
- Exploit 按 archetype 和 leak 组合扩展

## 9. 最终建议

如果 TexHolding 想真正做出“有收获、刷不完、且建议有说服力”的题库，最优策略不是继续做一套混合题，而是：

- 用 `GTO Wizard / PeakGTO / DTO` 这一类产品定义 `GTO 训练线`
- 用 `Upswing / Red Chip / Low-Stakes Playbook` 这一类来源定义 `Exploit 训练线`
- 在产品里始终明确：`你现在练的是标准线，还是偏离标准线`

这会比现在的单一题库强非常多，也更容易扩到真正的大规模内容库。
