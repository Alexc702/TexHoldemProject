# TexHolding 内容加固与扩容自评报告

更新时间：2026-03-31

## 1. 本轮完成了什么

本轮目标有两件：

1. `把题库归因证据链做硬`
2. `把 Exploit 和 Line & Range 的高价值题库做厚`

本轮已完成的产物：

- [题库归因证据链加固规范](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-attribution-evidence-chain-spec.md)
- [归因 schema v2](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-question-bank-attribution-schema-v2.json)
- [Exploit 与 Line & Range 扩容方案](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-exploit-line-range-bank-spec.md)
- [Exploit 高价值题库](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-exploit-high-value-bank.csv)
- [Line & Range 高价值题库](/Users/lulu/Codex/TexHoldingProject/mvp-p0/content/TexHolding-line-range-high-value-bank.csv)

## 2. 自检结果

### 2.1 证据链是否真的比之前更硬

结论：

- **是，明显更硬**

原因：

- 现在已经把 `question intent`、`expected logic`、`observed deviation`、`primary attribution`、`secondary evidence`、`recommendation mapping`、`confidence control` 七个环节明确下来
- 结果页不再只依赖“错题标签”，而是要求保留 `question_id / deviation_family / primary_tag / secondary_tag / recommendation_tag / confidence`
- 推荐逻辑不再允许自由跳转，而是必须经过 `mapping rule`

相比之前最大的改善：

- 同一题同一错误路径的归因稳定性被明确要求固定
- 跨线推荐有了规则，不再像拍脑袋
- 低证据时必须降置信度

### 2.2 schema 是否已经达到开发可对接程度

结论：

- **基本达到**

现在 schema v2 已经能支撑：

- 题目录入
- 错误选项归因
- 结果证据记录
- session 聚合
- 推荐映射

它还没有做到的是：

- 直接就是最终运行时 JSON
- 直接就能丢进现有代码运行

也就是说：

- 这是 `内容与规则 canonical schema`
- 不是 `最终前端 runtime bundle`

这个状态是合理的，因为你这轮要求先不改代码。

### 2.3 Exploit 题库是不是已经“厚起来了”

结论：

- **明显比之前厚，而且方向正确**

本轮规模：

- `10 个 pack`
- `80 个高价值 seed`
- 每个 pack `8 个 seed`

强项：

- 覆盖了朋友局最值钱的 exploit 错误
- 不是泛泛而谈，而是围绕：
  - 对 station 收费
  - 停止无效 bluff
  - 尊重被动玩家强度
  - 对 overfolder 施压
  - 多人池 underbluff
  - 读不清时停止硬偏离

这是非常实战的选题。

### 2.4 Line & Range 题库是不是已经“厚起来了”

结论：

- **是，而且已经比之前更像一条独立训练线**

本轮规模：

- `10 个 pack`
- `80 个高价值 seed`
- 每个 pack `8 个 seed`

强项：

- 从 flop 跟注后的范围收缩，一直覆盖到 river probe 密度、被动玩家极化、hero 大注讲故事、多人池范围塌缩
- 题目不再只是“理解范围”这种泛概念，而是具体到：
  - 哪类牌明显变少
  - 哪类牌密度仍然高
  - 这条线还能不能继续讲下去

这已经能支撑很清楚的范围训练产品化方向。

## 3. 这轮内容加固后，TexHolding 的真实价值有没有变强

结论：

- **有，变强了，而且是变在核心位置**

变强的不是视觉层，也不是流程层，而是：

- 结果页说服力的基础
- 推荐下一练的可信度
- Exploit 和 Line & Range 两条线的内容密度

以前的问题是：

- 用户做了几题，不太知道建议为什么成立
- 结果容易像“总结”

现在至少在内容规格上，已经能回答：

- 你是哪道题、哪种错向，把自己推到这个结论上的
- 为什么这里该推同线 pack 或跨线 pack
- 为什么这条提醒属于“今晚带上桌”

## 4. 和外部成熟产品相比，这轮加固后站位有没有变化

### 变强的地方

- 比之前更像一个真正的内容系统，而不是一些样例题
- Exploit 与 Line & Range 的差异化更明确
- 更接近“低级别实战纠偏系统”这个定位

### 仍然明显落后的地方

- 仍然没有海量题库规模
- 仍然没有 solver 级精度与统计
- 仍然没有 EV-loss / ELO / mastery 一类长期能力刻画
- 仍然没有真人实测数据去证明这些 seed 的训练收益

也就是说：

- **产品方向依旧成立**
- **内容骨架已经明显更强**
- **但还没有进入成熟训练器级别**

## 5. 当前 readiness 判断

### 5.1 作为内容设计基线

- **已可用**

### 5.2 作为设计与产品评审材料

- **已可用**

### 5.3 作为开发前的内容结构基线

- **已可用**

### 5.4 作为可直接上线的大规模正式题库

- **还不够**

原因不是结构不行，而是：

- 这些还是高价值 seed，不是完整 runtime 题库
- 还没做参数化扩容
- 还没做真实用户验证

## 6. 当前还剩哪些关键缺口

### 6.1 第一缺口：结果证据对象还没真正接进代码

现在内容层已经定义好了：

- `question -> deviation -> attribution -> recommendation`

但代码里还没有使用这整套 v2 结构。

### 6.2 第二缺口：还没有“同题变体扩容”

虽然已经有 160 个高价值 seed，但距离真正“刷不完”还差参数化扩容：

- board class 变体
- villain profile 变体
- hero bucket 变体
- street progression 变体

### 6.3 第三缺口：还没有真实用户验证

目前仍然是内容设计上的强假设，下一步必须验证：

- 用户能否看懂建议为什么成立
- 用户是否真的能把提醒带上桌
- 未见新题时是否还能迁移

## 7. 最终自评

如果按 10 分制来打：

- `证据链硬度：8/10`
- `Exploit 内容价值：7.5/10`
- `Line & Range 差异化价值：8/10`
- `可直接支撑后续开发的程度：8/10`
- `离成熟扑克训练产品的距离：5.5/10`

## 8. 建议的下一步

最合理的顺序是：

1. 把 v2 schema 和这批 seed 映射成 runtime bundle 设计
2. 在不大改产品壳的前提下，把结果页证据链真正接进交互
3. 先上线小规模高价值版本验证，而不是盲目追几千题
4. 用真实用户行为再决定哪几个 pack 最值得扩到 50+ 题

## 9. 最终结论

这轮工作已经把 TexHolding 从：

- `有产品方向，但内容说服力不够`

推进到了：

- `内容结构已经足够清楚，能支撑下一轮真正的产品强化`

所以结论是：

- **这轮加固是有效的**
- **而且已经明显提升了 TexHolding 继续做下去的可行性**
- **下一步可以合理进入“把内容引擎接进产品”的阶段**
