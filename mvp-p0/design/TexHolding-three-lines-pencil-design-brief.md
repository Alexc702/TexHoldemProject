# TexHolding Three-Lines Pencil Design Brief

## 0. 交付目标

产出一份可以直接进入视觉设计与前端实现的中保真移动端交互稿，完整覆盖：

- `GTO`
- `Exploit`
- `Line & Range`

三条训练线，以及它们在首页、训练、结果、提醒、复盘中的融合关系。

## 1. 文件策略

- 新建设计文件，不覆盖旧版 `TexHolding-MVP-P0-UX.pen`
- 建议文件名：
  - `TexHolding-Three-Lines-UX.pen`

## 2. 载体与尺寸

- 载体：移动端 H5 / PWA
- 画板尺寸：`393 x 852`
- 风格：桌边决策工具，不做赌场娱乐感

## 3. 设计目标

- 用户一眼知道自己当前练的是哪条线
- 三条线虽不同，但整体仍像一个产品
- 结果页能清楚解释：这是标准线问题、偏离问题，还是范围理解问题
- 复盘页能体现跨线归因

## 4. 画布结构

顶层仍分 4 个区域：

1. 封面与说明
2. 信息架构 / 主流程
3. 组件库
4. 主链路页面稿

## 5. 建议画板清单

### 5.1 文档层

1. 封面
2. 信息架构与主流程
3. 三线关系图
4. 视觉与组件规范

### 5.2 业务层

5. Welcome
6. Onboarding Step 1
7. Onboarding Step 2
8. Home
9. Training Hub
10. Track Detail - GTO
11. Track Detail - Exploit
12. Track Detail - Line & Range
13. Training Session - GTO
14. Training Feedback - GTO
15. Session Result - GTO
16. Training Session - Exploit
17. Training Feedback - Exploit
18. Session Result - Exploit
19. Training Session - Line & Range
20. Training Feedback - Line & Range
21. Session Result - Line & Range
22. Reminder
23. Login Sheet
24. Review Input
25. Review Result
26. Home After Review
27. Edge State Board

## 6. 页面说明要求

每个业务画板右侧固定注释区，统一包含：

- 页面目标
- 进入条件
- 当前训练线
- 主 CTA
- 关键状态
- 跳转去向

## 7. 组件要求

除旧版组件外，新增：

- `Track Card`
- `Track Pill`
- `Skill Snapshot`
- `Range Bucket Chip`
- `Density Meter`
- `Track-Aware Result Card`
- `Cross-Track Recommendation Card`

## 8. 页面关键设计点

### 8.1 Home

- 只显示一个主 CTA
- 明确“今天主练线”
- 可显示三条线的小型能力快照

### 8.2 Training Hub

- 三张训练线卡片必须差异清楚
- 但布局和视觉要统一

### 8.3 Track Detail

- 分别说明这条线练什么
- 用什么类型的题
- 适合解决什么问题

### 8.4 Training Session

- 三条线共用同一交互壳
- 题面内容不同

### 8.5 Session Result

- 每个结果页都必须显式显示：
  - 错的是哪条线
  - 错的是哪类能力
  - 今晚提醒
  - 下一组训练

### 8.6 Review Result

- 必须显示主问题线与次问题线
- 必须支持低置信度状态

## 9. 边界状态要求

至少画出或在状态板中定义：

- Welcome 登录覆层
- 训练中退出确认
- Reminder 保存成功 / 失败
- Login 验证码发送 / 失败 / 倒计时
- Home 空状态
- Review Input 校验失败
- Review Result 低置信度

## 10. 视觉方向

- 主背景：深墨绿 / 炭黑
- 内容卡：暖米白
- 主 CTA：琥珀金
- 风险提醒：珊瑚红
- GTO：偏理性、稳定
- Exploit：偏锋利、机会感
- Line & Range：偏分析感、结构感

注意：

- 三条线可以通过小范围色相或标签区分
- 但不能做成三个品牌

## 11. 交互原则

- 训练入口分线
- 训练体验统一
- 结果与复盘统一归因
- 一屏一个核心动作
- 桌边语言优先

## 12. 验收标准

- 看图就能讲清三条线如何融合
- 任一结果页都能明确告诉用户“你错的是哪条线”
- Review Result 能体现跨线归因
- 设计稿可以直接支持前端组件拆分与路由实现
