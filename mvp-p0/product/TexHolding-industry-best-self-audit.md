# TexHolding 业界最佳标准自审报告

更新时间：2026-03-31

## 1. 先给结论

### 1.1 诚实结论

如果按“业界最佳”这个标准严格来审，**TexHolding 当前还不能诚实地宣称自己已经是业界最佳**。

原因很简单：

- 内容结构已经明显变强
- 差异化方向也成立
- 但在题库规模、长期表现刻画、内容 QA、未见新题迁移验证这几块，还没有达到成熟头部产品的完成度

### 1.2 这次自审后的判断

- `方向是否有机会成为业界最佳：有`
- `当前内容框架是否已接近一线水平：在差异化设计上接近，在训练器成熟度上仍未达标`
- `是否已经补上最关键的结构缺口：大部分补上了`
- `是否已经可以停止审查并默认最好：不可以`

### 1.3 我这轮已经直接补了什么

为了不让这次自审流于“写报告”，我已经把几项真正决定上限的结构补进去了：

- 在 [题库归因证据链加固规范](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-attribution-evidence-chain-spec.md) 里新增了：
  - `Source Provenance`
  - `Difficulty & Mastery`
  - `Recurrence & Spaced Reinforcement`
  - `Unseen Transfer Validation`
  - `Content QA & Release Gate`
- 在 [schema v2](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-question-bank-attribution-schema-v2.json) 里新增了对应的结构字段：
  - `difficulty_tier`
  - `mastery_weight`
  - `variant_group_id`
  - `provenance`
  - `quality_gate`
  - `repeat_error_score`
  - `time_decay_weight`
  - `spacing_trigger_days`
  - `unseen_transfer_required`
  - `transfer_test_required`

也就是说，这次不是只指出缺点，而是把“离业界最佳还差什么”提前预埋进规范了。

## 2. 业界最佳到底看什么

结合头部产品与成熟内容体系，我用 8 个标准来审 TexHolding：

1. `策略正确性与可解释性`
2. `训练规模与覆盖度`
3. `结果归因可信度`
4. `训练到实战的迁移能力`
5. `个体化推荐质量`
6. `长期能力刻画`
7. `内容工程与 QA 流程`
8. `对目标用户的适配度`

## 3. 逐项自审

## 3.1 策略正确性与可解释性

### 当前判断

- `中上`

### 为什么不是更高

- 我们已经把 GTO / Exploit / Line & Range 分开，逻辑结构是对的
- 也已经把 baseline、偏离理由、范围变化这些字段写进内容规范
- 但我们还没有给每个题的内容项都补上明确的 provenance 和版本来源

### 结论

- 结构层已经接近优秀
- 数据层还没到“头部训练器可审计”的程度

## 3.2 训练规模与覆盖度

### 当前判断

- `中`

### 事实

- 现在有 `160 个高价值 seed`
- 这对内容设计已经很不错
- 但和 GTO Wizard、PeakGTO 这种规模型产品相比，仍然只是骨架，不是成品规模

### 结论

- 对内核设计来说够了
- 对“业界最佳训练产品”来说远远不够

## 3.3 结果归因可信度

### 当前判断

- `中上`

### 为什么提升了

- 现在已经有清楚的：
  - `question intent`
  - `expected logic`
  - `observed deviation`
  - `primary attribution`
  - `secondary evidence`
  - `recommendation mapping`
  - `confidence control`

### 为什么还没到顶

- 这套证据链还停留在规范与 seed 层
- 还没有进入真实 runtime 和用户可见交互
- 也还没做真实用户验证

### 结论

- 这是本轮最明显的进步
- 但还不能说已经达到了行业最高说服力

## 3.4 训练到实战的迁移能力

### 当前判断

- `中高潜力，当前完成度中`

### 优势

- TexHolding 的差异化就是迁移能力
- 结果页、提醒卡、复盘链路天然比纯训练器更接近真实牌桌

### 核心缺口

- 还没有真正做 `未见新题迁移验证`
- 还没有 `spaced reinforcement`
- 还没有 `repeat error recurrence` 机制

### 结论

- 方向上强于很多只做题的产品
- 执行上还没到业界最佳

## 3.5 个体化推荐质量

### 当前判断

- `中`

### 优势

- 当前已经比普通题库更接近“基于错误推荐下一练”

### 不足

- 还没有真实表现历史
- 还没有长期 mastery 状态
- 还没有用变体题去验证“这个人真的修复了这个错误”

### 结论

- 推荐已经从“拍脑袋”进化到“有证据链规则”
- 但还未到顶级个体化水平

## 3.6 长期能力刻画

### 当前判断

- `低`

### 原因

- 没有 ELO
- 没有 EV-loss 替代体系
- 没有 mastery layer
- 没有错误复发率
- 没有分线成长轨迹

### 结论

- 这是当前最明显的短板之一
- 也是和 PeakGTO / GTO Wizard 拉开差距的重要原因

## 3.7 内容工程与 QA 流程

### 当前判断

- `中`

### 本轮补强

- 已经在规范中增加：
  - provenance
  - difficulty
  - QA gate
  - transfer validation

### 仍未完成

- 还没有真正的内容 authoring workflow
- 还没有 reviewer 制度
- 还没有 `draft -> reviewed -> tested -> production_ready` 的实际执行

### 结论

- 结构预留已经不错
- 生产体系还没搭起来

## 3.8 对目标用户的适配度

### 当前判断

- `高`

### 原因

- 我们不是为 solver 重度用户做产品
- 我们是为“想在朋友局明显进步”的人做产品
- 从这个目标看，三条线和提醒/复盘闭环非常贴合

### 结论

- 这是目前 TexHolding 最强的一项
- 也是最有机会赢过现有产品的地方

## 4. 严格意义上的发现

下面是按严重度排的审计发现。

### [P0] 还没有建立“内容来源可审计”体系

如果没有每题 provenance，后续扩容时内容会越来越难维护，也无法在争议题上快速回溯依据。这是能不能走向头部内容系统的基本门槛。

已补动作：

- 已把 provenance 字段补进 [schema v2](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-question-bank-attribution-schema-v2.json)

### [P0] 还没有“未见新题迁移验证”机制

如果用户只是在原题上答对，我们并不能证明他真的学会了。头部训练产品和高质量教学体系的分水岭，就在于能不能证明迁移，而不是只证明记忆。

已补动作：

- 已在 [证据链规范](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-attribution-evidence-chain-spec.md) 和 [schema v2](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-question-bank-attribution-schema-v2.json) 里补上 transfer 相关字段

### [P1] 还没有长期能力刻画层

没有 mastery、recurrence、spacing，就很难在长期学习价值上接近 PeakGTO / GTO Wizard 这类成熟产品。

已补动作：

- 已在 schema 里预留 `mastery_weight`、`repeat_error_score`、`time_decay_weight`、`spacing_trigger_days`

### [P1] 还没有真正的内容 QA 工作流

没有真实 QA 流程，seed 再多也容易进入“看起来完整，实际上质量不稳”的状态。

已补动作：

- 已补 `qa_status` 与 `quality_gate` 结构

## 5. 当前能不能说“这是业界最佳”

不能。

如果要诚实，只能说：

- **TexHolding 在“低级别实战纠偏系统”这个方向上，已经具备成为业界最佳的结构潜力**
- **但目前还没有完成到能直接宣称“业界最佳”的程度**

这是一个重要区别：

- `best-in-class direction`
- 不等于
- `already best-in-class product`

## 6. 自审后的最终判断

### 6.1 我认可的部分

- 三条线结构是对的
- Exploit 与 Line & Range 的差异化是对的
- 证据链方向是对的
- 目标用户定位是对的

### 6.2 我不认可直接自称“业界最佳”的部分

- 题库规模还不够
- 表现反馈体系还不够
- 内容 QA 还没跑起来
- 迁移验证还没真正执行

## 7. 我已经把什么补到位了

这次自审不是停在“指出问题”，而是已经把这些必要升级补成了正式规范：

- [题库归因证据链加固规范](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-attribution-evidence-chain-spec.md)
- [归因 schema v2](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-question-bank-attribution-schema-v2.json)
- [Exploit 与 Line & Range 高价值题库扩容方案](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-exploit-line-range-bank-spec.md)
- [Exploit 高价值题库](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-exploit-high-value-bank.csv)
- [Line & Range 高价值题库](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-line-range-high-value-bank.csv)

## 8. 最终结论

如果你要我严格自我审核，答案是：

- **我们现在还不能自称已经做到了业界最佳**
- **但我们已经把最关键的结构缺口补到了“可以继续朝业界最佳推进”的程度**

换句话说：

- 以前是“方向对，但根基不够硬”
- 现在是“根基已经明显变硬，但还没到封顶阶段”

这是我认为最诚实、也最有用的结论。
