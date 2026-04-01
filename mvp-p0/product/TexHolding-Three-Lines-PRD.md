# TexHolding Three-Lines PRD

## 0. 文档定位

- 文档状态：`Canonical PRD for Next Design / Dev Stage`
- 适用范围：TexHolding 三线学习系统
- 目标：把 `GTO / Exploit / Line & Range` 三条线完整融合到可开发的产品方案中

关联文档：

- `/mvp-p0/content/TexHolding-line-range-training-spec.md`
- `/mvp-p0/content/TexHolding-real-value-and-feedback-logic.md`
- `/mvp-p0/content/TexHolding-question-bank-attribution-schema.json`
- `/mvp-p0/product/TexHolding-three-lines-product-integration.md`

## 1. 产品目标

TexHolding 的目标不是做“更多题”，而是让用户：

- 在朋友局中明显减少高频错误
- 区分标准线错误和错误偏离
- 更快地理解行动线对应的范围变化
- 把训练结果真正带到赛前和赛后

产品价值闭环升级为：

`欢迎 -> 引导 -> 首页 -> 选定主练线 -> 三线训练 -> 训练结果 -> 今晚提醒 -> 真实牌局 -> 复盘 -> 跨线归因 -> 下一组训练`

## 2. 三条线定义

### 2.1 GTO

中文名称：

- `标准线`

回答的问题：

- 在没有特殊读牌时，默认应该怎么打

### 2.2 Exploit

中文名称：

- `针对人`

回答的问题：

- 面对什么对手 / 人群倾向时，标准线该往哪个方向偏离

### 2.3 Line & Range

中文名称：

- `行动线 / 范围`

回答的问题：

- 每条街行动线如何改变双方范围
- 自己这条线在代表什么
- 哪类牌密度在上升 / 下降

## 3. 目标用户

- 经常打朋友局 / 私局 / 松散娱乐局
- 会规则，但没有稳定 postflop 判断框架
- 不想学重理论，但愿意练可以马上用的模式
- 愿意通过短训练、赛前提醒、赛后复盘提升实战

## 4. 产品原则

- 同一时间只让用户练一条主线
- 结果必须解释“错的是哪条线”
- 每次训练都必须能转成赛前可执行提醒
- 复盘必须允许跨线归因
- 桌边语言优先，不做 solver 式重界面

## 5. 信息架构

### 5.1 顶层页面

- Welcome
- Onboarding Step 1
- Onboarding Step 2
- Home
- Training Hub
- Track Detail
- Training Session
- Training Feedback State
- Session Result
- Reminder
- Review Input
- Review Result

### 5.2 参数化页面

以下页面不拆成三个完全不同 route，而是按 `track` 变体：

- Track Detail
- Training Session
- Training Feedback State
- Session Result

## 6. 核心对象

### 6.1 Track

- `gto`
- `exploit`
- `line_range`

### 6.2 Skill Issue

统一技能问题层：

- `standard_line_recognition`
- `sizing_calibration`
- `line_continuation`
- `opponent_identification`
- `deviation_discipline`
- `range_narrowing`
- `range_density_reading`
- `hero_representation`

### 6.3 Result Frame

每次训练 / 复盘都输出：

- `primary_track_issue`
- `primary_skill_issue`
- `one_sentence_diagnosis`
- `tonight_reminders[]`
- `recommended_next_track`
- `recommended_next_pack`

### 6.4 Generated Username

当用户在 Reminder 页面点击 `保存并进入首页` 时，系统必须：

- 自动生成一个不重复用户名
- 立即把本轮训练结果、提醒卡和时间戳写入后台记录
- 不再要求手机号或验证码

命名要求：

- 用户名对用户可见
- 格式简洁、可读、可重复访问
- 示例：`tex-lr-240401-7K3M`

## 7. 页面需求

## 7.1 Welcome

页面目标：

- 说明产品从“两条线”升级为“三条线”
- 让用户知道不只是学动作，还学怎么看范围和针对人

模块：

- 主标题
- 价值点
- 三线示意
- 主 CTA
- 次 CTA：继续我的训练 / 直接看看首页

主标题建议：

- `不只是做题，练成真正会赢钱的决策模型`

## 7.2 Onboarding Step 1

与旧版一致，主要判断阶段。

## 7.3 Onboarding Step 2

与旧版一致，但选项改成与三线更贴近：

- 我先想学标准线
- 我更想学针对人调整
- 我更想看懂行动线和范围
- 直接带我开始

## 7.4 Home

页面目标：

- 给用户一个统一调度入口

首屏保留 4 块：

1. 今天主问题
2. 今日主练线
3. 唯一主 CTA
4. 今晚上桌提醒

辅助模块：

- 三线能力快照

CTA 逻辑：

- 若今日主问题已很明确，主 CTA = `继续练这条`
- 若刚打完一手牌，主 CTA = `复盘一手`

## 7.5 Training Hub

页面目标：

- 让用户清楚看到三条训练线

模块：

- 今日推荐主练线
- 三张训练线卡片
- 快速开始按钮
- 今日推荐 pack

每张卡展示：

- 线的名称
- 这条线训练什么
- 当前命中问题
- 适合的用户场景

## 7.6 Track Detail

页面目标：

- 解释某条训练线的目标、典型题型与推荐 pack

这是参数化页面：

- `track = gto`
- `track = exploit`
- `track = line_range`

模块：

- 线说明
- 适合解决什么问题
- pack 列表
- 立即开始训练

## 7.7 Training Session

页面目标：

- 在统一交互壳中训练不同能力

共用结构：

- 顶部进度
- 固定信息区
- 题面
- 操作区

固定信息区是训练题的强制模块，必须位于题面上方，字段顺序固定为：

1. `Hero 位置 / Hero`
2. `手牌 / Hand`
3. `对手 / Villain`
4. `行动线 / Line`
5. `牌面 / Board`
6. `街道 / Street`

说明：

- 这块区域的位置在所有训练题中保持一致
- 用户不应该为了找位置、手牌、对手人数而重新扫整页
- 牌面必须显示真实花色，不允许只显示 `Q74r`、`A72r` 这类简写
- 位置和行动线必须采用 `中文 / English` 的中英对照格式

### 7.7.1 GTO 版

题面重点：

- 正确动作 / 尺度 / 频率

### 7.7.2 Exploit 版

题面重点：

- 对手类型
- baseline
- 是否偏离

### 7.7.3 Line & Range 版

题面重点：

- 这条线之后还剩什么牌
- 你这条线在代表什么
- 哪类牌密度上升 / 下降

## 7.8 Training Feedback State

页面目标：

- 即时纠偏

共用结构：

- 标题
- 为什么
- 桌边翻译
- 主 CTA：`下一题`

差异内容：

- GTO：标准线解释
- Exploit：baseline + exploit 偏离条件
- Line & Range：范围变化解释

## 7.9 Session Result

页面目标：

- 把一轮训练的错误模式转成真实行动建议

固定输出：

- 你错的是哪条线
- 你错的是哪类能力
- 一句话诊断
- 今晚提醒
- 推荐下一组训练

结果页视觉壳统一，内容按 track 模板切换。

## 7.10 Reminder

页面目标：

- 把训练结果转成赛前提醒卡

结构：

- `今晚先记住`
- `如果遇到这类对手`
- `如果打到这类行动线`

说明：

- 当结果属于 GTO 线，提醒更偏标准线
- 当结果属于 Exploit 线，提醒更偏人群读法
- 当结果属于 Line & Range 线，提醒更偏密度判断

保存逻辑：

- CTA 仍为：`保存并进入首页`
- 点击后直接自动保存
- 系统自动生成唯一用户名
- 同时写入后台记录：
  - 用户名
  - 训练结果
  - 提醒卡
  - 保存时间
- 不再弹手机号 / 验证码 Bottom Sheet
- 若后台保存失败，允许本地兜底并提示稍后重试

## 7.11 Review Input

页面目标：

- 用低精度信息完成真实手牌复盘

固定 4 步：

1. 这手怎么入池
2. 你大概是什么牌
3. 翻牌面更像哪种
4. 打到哪里 + 关键动作 + 你最担心哪点

新增可选字段：

- 你当时觉得对手更像还剩哪几类牌

## 7.12 Review Result

页面目标：

- 跨线诊断真实手牌问题

固定输出：

- 主问题线
- 次问题线
- 这手更像哪里出了问题
- 下次先记住
- 推荐回哪条线练

示例：

- 主问题线：`exploit`
- 次问题线：`line_range`
- 解释：你不是没学会标准线，而是把 calling station 当成会弃牌的人，同时高估了他 river bluff 密度

## 8. 推荐与归因逻辑

### 8.1 单题结果

每题输出：

- `track`
- `primary_attribution`
- `secondary_attributions[]`
- `feedback_template_id`
- `recommendation_tags[]`

### 8.2 Session 聚合

一个 session 的结果必须聚合为：

- `primary_track_issue`
- `primary_skill_issue`
- `secondary_skill_issues[]`
- `tonight_reminders[]`
- `recommended_track`
- `recommended_pack`

### 8.3 跨线推荐

允许如下跨线推荐：

- `GTO -> Line & Range`
  - 当用户动作错主要因为范围理解不够
- `Exploit -> Line & Range`
  - 当用户偏离错主要因为密度判断错误
- `Line & Range -> Exploit`
  - 当用户会看范围，但不会把读牌变成针对人动作

## 9. 内容规模建议

### 9.1 第一阶段

- GTO：300 题
- Exploit：200 题
- Line & Range：100 题

### 9.2 第二阶段

- GTO：600+
- Exploit：400+
- Line & Range：250+

## 10. 开发边界

当前阶段先不做：

- solver 图表浏览器
- 满屏 range matrix
- 完整手牌导入器
- 社区功能
- 会员体系
- 手机号 / 验证码登录保存链路

## 11. 验收标准

### 11.1 产品验收

- 用户能清楚知道自己练的是哪条线
- 结果页能明确说出错的是哪条线
- 复盘结果能跨线解释真实错误

### 11.2 内容验收

- 每题都可追溯到 attribution rule
- 每条建议都有来源
- GTO / Exploit / Line & Range 不互相污染

### 11.3 设计验收

- 三条线入口明确
- 统一训练壳成立
- 结果页和复盘页仍然简洁，不失控

## 12. 最终建议

TexHolding 的正确方向不是做三个并排产品，而是做一个：

- 训练入口分线
- 结果诊断统一
- 复盘跨线归因

的决策提升系统。
