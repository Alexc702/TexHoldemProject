# TexHolding Line & Range Training Spec

## 0. 文档定位

- 文档状态：`Draft for Product / Content / Design / Dev`
- 所属体系：TexHolding 三线学习系统
- 关联文档：
  - `/mvp-p0/content/TexHolding-real-value-and-feedback-logic.md`
  - `/mvp-p0/content/TexHolding-question-bank-research.md`
  - `/mvp-p0/content/TexHolding-question-bank-attribution-schema.json`

本文定义 `Line & Range` 训练线，即：

- 每条街行动线如何改变双方范围
- 自己这条线在代表什么
- 对手这条线后还剩哪些牌 / 组合
- 这些判断如何影响 GTO 标准线与 Exploit 偏离

## 1. 为什么它必须加入产品

TexHolding 如果只做：

- `GTO 题`
- `Exploit 题`

那用户很容易停留在：

- 我该 bet 还是 check
- 我该 bluff 还是 value

但真实牌局里真正决定质量的是：

- 这条线之后，对手还有多少 value / bluff / draw / 中等牌
- 我这条线把自己讲成了什么范围
- 我是不是拿绝对牌力在思考，而不是拿范围密度在思考

所以 `Line & Range` 不是附加知识，而是连接：

- GTO 标准线
- Exploit 偏离
- 赛后复盘解释力

的中间桥梁。

## 2. 训练目标

`Line & Range` 训练线要让用户逐步掌握 5 个能力：

1. `Street-by-Street Narrowing`
   - 每条街之后能缩窄对手范围
2. `Hero Representation`
   - 知道自己这条线在代表什么牌
3. `Density Reading`
   - 知道某类牌是“很多 / 一些 / 很少 / 几乎没有”
4. `Value / Bluff Balance Intuition`
   - 知道一条线后 bluff 密度还是 value 密度更高
5. `Future Street Forecast`
   - 能预判这条线在下一街是否还能继续成立

## 3. 产品定位

`Line & Range` 不应该做成 solver clone，也不应该做成满屏组合矩阵。

TexHolding 对这条训练线的定位应是：

- 面向真实牌桌的 `范围直觉训练`
- 用中文桌边语言讲清“还剩什么牌”
- 先训练范围桶，再训练密度，再训练组合

### 3.1 优先顺序

按复杂度拆成三层：

#### Layer 1. 范围桶

- 空气
- 高张未成手
- 弱对子
- 中等成手
- 强成手
- 听牌
- 坚果 / 接近坚果

#### Layer 2. 密度

- 很多
- 一些
- 很少
- 几乎没有

#### Layer 3. 组合精度

- 约 3-5 组
- 约 6-10 组
- 10+ 组

对 TexHolding 目标用户，P1 先做 Layer 1 + Layer 2 就够了。  
Layer 3 可以作为更高阶训练。

## 4. 题库定位

`Line & Range` 题不是在问：

- 单点动作对不对

而是在问：

- 经过这条行动线后，范围结构发生了什么变化

它既可以独立成一条训练线，也可以嵌入 GTO / Exploit 题后的反馈中。

## 5. 题型设计

建议先做 6 类题。

### 5.1 Villain Range Narrowing

问题形式：

- 对手在 flop 跟注后，哪类牌明显减少了？
- 被动玩家 turn 突然打大后，哪类 bluff 应明显减少？

训练目标：

- 让用户学会随着行动线缩窄对手范围

### 5.2 Hero Range Representation

问题形式：

- 如果你这里选择大注，你在代表什么范围？
- 你这条 turn 继续大注线，不该包含哪类牌？

训练目标：

- 让用户明白自己每个动作都在“讲故事”

### 5.3 Range Density

问题形式：

- 这条线后，对手的 top pair 密度是很多、一些还是很少？
- 河牌突然大注后，value 密度还是 bluff 密度更高？

训练目标：

- 让用户停止只看单手牌力，转而看范围密度

### 5.4 Combo Delta

问题形式：

- 经过 flop check-call -> turn check-call 后，missed draw 还剩多少？
- 这条线后，nuts 组合数是上升还是下降？

训练目标：

- 为更高阶用户引入组合感

### 5.5 Range Shift Trigger

问题形式：

- 哪个动作最明显地让对手范围从“宽”变“窄”？
- 哪个 turn card 让你的继续开火更可信？

训练目标：

- 让用户识别“范围重排”的关键节点

### 5.6 Future Street Forecast

问题形式：

- 你如果 flop 这样打，turn 哪些牌还能继续讲故事？
- 对手这条线到了 river 还可能保留哪些 bluff？

训练目标：

- 把行动线、范围和未来街道串起来

## 6. 题目字段

每道 `Line & Range` 题至少需要这些字段：

- `track = line_range`
- `question_type`
- `pot_type`
- `positions`
- `street_focus`
- `board_runout`
- `action_history`
- `hero_hand_bucket`
- `villain_profile`
- `hero_range_before`
- `villain_range_before`
- `hero_range_after`
- `villain_range_after`
- `correct_answer`
- `acceptable_answers`
- `primary_attribution_tag`
- `secondary_attribution_tags`
- `feedback_pattern`
- `recommendation_links`

## 7. 错题归因逻辑

`Line & Range` 题的核心不是“动作方向错”，而是“范围理解错”。

建议归因分两层。

### 7.1 一级归因

- `range_not_narrowed`
  - 没有随着行动线缩窄范围
- `range_over_narrowed`
  - 把对手范围收得过窄，忽略了中间层
- `hero_line_misrepresentation`
  - 不知道自己这条线在代表什么
- `villain_density_misread`
  - 误判某类牌的密度
- `future_street_disconnect`
  - 不会把当前行动线和下一街连起来
- `combo_weight_misread`
  - 高阶用户的组合权重判断不准

### 7.2 二级归因

- `overestimate_bluff_density`
- `underestimate_value_density`
- `ignore_draw_retention`
- `ignore_showdown_value_retention`
- `misread_passive_strength`
- `misread_polarization`
- `misread_capped_range`
- `misread_range_merge`

## 8. 反馈模板

每道题答错后的反馈必须固定为 4 层：

1. `范围变化`
   - 这条线后，哪类牌明显变多 / 变少
2. `你忽略了什么`
   - 用户在范围理解上漏掉的关键点
3. `桌边翻译`
   - 直接可执行的中文提醒
4. `下一组训练`
   - 推荐回到哪类线继续练

### 8.1 反馈示例：对手 flop 跟注后 bluff 密度被高估

- 范围变化：对手 flop 跟注后，纯空气已经明显减少
- 你忽略了什么：你把“还没弃牌”错误理解成“还在大量 bluff”
- 桌边翻译：他都跟到这一步了，空牌已经没那么多了
- 下一组训练：`turn barrel vs sticky range`

### 8.2 反馈示例：自己大注线代表过强

- 范围变化：你这条大注线天然更像强成手或强听牌
- 你忽略了什么：你把一手中等牌放进了会被高估强度的线
- 桌边翻译：你这条线讲得太像强牌了，中等牌别总这样打
- 下一组训练：`hero representation with medium hands`

## 9. 如何嵌入产品

`Line & Range` 最好不是一个孤立模块，而是“三种接入方式同时存在”。

### 9.1 方式 A：独立训练线

在训练中心里作为第三张主卡：

- `标准线 / GTO`
- `针对人 / Exploit`
- `行动线 / 范围`

适合：

- 用户主动练“看懂范围”
- 形成能力地图

### 9.2 方式 B：作为 GTO / Exploit 题后的反馈层

每题答完后，在反馈底部增加：

- `他这样打以后，还剩哪些牌`
- `你这样打以后，你在代表什么`

适合：

- 让 Line & Range 不变成孤立知识
- 直接提升题目解释力

### 9.3 方式 C：作为复盘解释层

在复盘结果页中增加：

- 你当时高估了什么密度
- 你低估了什么强度
- 你这条线让自己范围看起来过强还是过弱

适合：

- 把真实手牌和训练线打通

## 10. 产品中的最佳形态

结论是：

- 要有独立训练线
- 但不能只做独立训练线

最好的形态是：

- `训练入口独立`
- `反馈解释嵌入`
- `复盘诊断联动`

## 11. 与 GTO / Exploit 的关系

### 11.1 它和 GTO 的关系

`Line & Range` 是 GTO 的解释层。

GTO 回答：

- 标准线是什么

Line & Range 回答：

- 为什么这条标准线成立

### 11.2 它和 Exploit 的关系

`Line & Range` 是 Exploit 的判断基础。

Exploit 回答：

- 什么时候偏离

Line & Range 回答：

- 为什么这个对象 / 这条线值得偏离

## 12. 先做哪些内容最值钱

P1 优先做这 5 组：

1. `Flop c-bet 后的范围收缩`
2. `Turn second barrel 后的范围变化`
3. `被动玩家突然发力后的 value 密度`
4. `自己大注线的范围代表`
5. `river bluffcatch 的 bluff / value 密度判断`

## 13. 首批 100 题建议结构

- 30 题：Flop 继续线后的范围变化
- 25 题：Turn 继续线与第二枪
- 15 题：River 大注 / bluffcatch 范围密度
- 15 题：Hero line representation
- 15 题：被动玩家 / 爱跟玩家的典型范围误读

## 14. 设计原则

- 不给满屏 solver 矩阵
- 先给范围桶，再给密度，再给组合
- 桌边语言优先，理论术语次之
- 每题都要让用户知道：
  - `他这样打，还剩什么`
  - `我这样打，在代表什么`

## 15. 最终建议

如果 TexHolding 想真正让用户“做题之外真的进步”，`Line & Range` 必须进产品。  
但它应该作为：

- 一条独立训练线
- 两条训练线的解释层
- 复盘结果的诊断层

三者合一，而不是单独做成一个重理论专区。
