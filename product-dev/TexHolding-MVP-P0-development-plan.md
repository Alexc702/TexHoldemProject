# TexHolding MVP P0 开发计划

## 1. 评审结论

### 1.1 总体判断

当前 `TexHolding-MVP-P0-UX.pen` 的设计稿已经足够支持 **前端页面结构、组件拆分、交互主路径实现**。

当前 `texholding-mvp-prd.md` 仍然是 **原始大范围 PRD**，还不能直接作为唯一开发依据。

结论：

- UI 设计稿：`基本满足前端开发要求`
- PRD：`不满足端到端开发要求`
- 整体材料包：`尚未完全满足开发要求`

要进入正式开发，必须先补一个 **P0 版本的开发基线文档**，统一范围、状态和数据契约，否则前后端、内容和测试会按不同版本理解执行。

---

## 2. 核心发现

### [P0] 设计稿和 PRD 的范围不一致，当前没有唯一可执行版本

`texholding-mvp-prd.md` 仍然定义了 13 个页面，并明确包含“新手引导承接页 / 我的成长页 / 会员页 / 我的页”等非 P0 页面与流程。

参考：

- `product-design/texholding-mvp-prd.md:31`
- `product-design/texholding-mvp-prd.md:227`
- `product-design/texholding-mvp-prd.md:243`
- `product-design/texholding-mvp-prd.md:1064`
- `product-design/texholding-mvp-prd.md:1166`
- `product-design/texholding-mvp-prd.md:1252`
- `product-design/texholding-mvp-prd.md:1473`

而 `TexHolding-MVP-P0-UX.pen` 实际只落了 P0 主链路 11 个业务画板，并直接把引导改为两步后进入训练，没有承接页，也没有成长/会员/我的页面。

参考：

- `product-design/TexHolding-MVP-P0-UX.pen:1729`
- `product-design/TexHolding-MVP-P0-UX.pen:2006`
- `product-design/TexHolding-MVP-P0-UX.pen:2308`
- `product-design/TexHolding-MVP-P0-UX.pen:2610`
- `product-design/TexHolding-MVP-P0-UX.pen:3257`
- `product-design/TexHolding-MVP-P0-UX.pen:3567`
- `product-design/TexHolding-MVP-P0-UX.pen:3838`
- `product-design/TexHolding-MVP-P0-UX.pen:4134`
- `product-design/TexHolding-MVP-P0-UX.pen:4403`
- `product-design/TexHolding-MVP-P0-UX.pen:4731`
- `product-design/TexHolding-MVP-P0-UX.pen:5008`

影响：

- 前端会按 11 个画板开发
- 产品/测试会按 13 页 PRD 验收
- 登录时机、首页 CTA 逻辑、复盘步数都会出现口径冲突

处理要求：

- 立刻冻结一份 `P0 Canonical Spec`
- 明确以 P0 设计稿为主，PRD 改为 P0 版本而不是继续沿用大范围原稿

### [P0] PRD 提到了规则引擎，但没有给出可实现的数据契约

PRD 多次要求“由训练规则引擎生成” leak、提醒、对手提示与推荐内容，但没有定义：

- 题目数据结构
- 训练 session 结构
- leak 计分与聚合规则
- reminder 选取规则
- 复盘输入映射规则
- 登录前本地数据与登录后账号数据的合并规则

参考：

- `product-design/texholding-mvp-prd.md:497`
- `product-design/texholding-mvp-prd.md:600`
- `product-design/texholding-mvp-prd.md:1394`
- `product-design/texholding-mvp-prd.md:1408`

影响：

- 前端可以把页面搭出来，但无法稳定串起真实结果
- 后端/本地存储实现会各自猜测字段
- QA 无法判断“结果正确”还是“只是文案合理”

处理要求：

- 在开发前补齐运行时数据契约
- 明确首版只消费轻量 runtime bundle，而不是直接驱动整套知识库

### [P1] 设计稿主要覆盖 Happy Path，缺少开发必需的异常与边界状态

设计稿已经覆盖了训练初始态、训练反馈态、结果态、提醒页、登录 sheet、两种首页态，以及复盘输入/结果态。

参考：

- `product-design/TexHolding-MVP-P0-UX.pen:2921`
- `product-design/TexHolding-MVP-P0-UX.pen:3823`
- `product-design/TexHolding-MVP-P0-UX.pen:4388`
- `product-design/TexHolding-MVP-P0-UX.pen:4993`
- `product-design/TexHolding-MVP-P0-UX.pen:5262`

但仍缺少单独定义的开发状态：

- 欢迎页“我已有账号”的登录入口态
- 训练中退出确认弹窗
- 提醒保存成功 / 失败反馈
- 登录验证码发送中 / 失败 / 重试态
- 首页空状态
- 复盘表单校验失败态

PRD 已明确提到其中一部分状态，但设计稿没有对应画板。

参考：

- `product-design/texholding-mvp-prd.md:81`
- `product-design/texholding-mvp-prd.md:325`
- `product-design/texholding-mvp-prd.md:1414`

影响：

- 工程实现时仍需自行推断
- 测试用例无法直接从设计稿穷举

处理要求：

- 不一定要补完整高保真画板
- 但必须补“状态矩阵”和“交互补充页”

### [P1] 复盘流程在 PRD 与设计稿之间已发生结构变化，但没有同步成开发规则

PRD 仍按 5 步录入写法描述复盘流程。

参考：

- `product-design/texholding-mvp-prd.md:797`
- `product-design/texholding-mvp-prd.md:897`
- `product-design/texholding-mvp-prd.md:1457`

设计稿已经改成 4 步模型，并在注释中写明 Step 4 会合并多个问题。

参考：

- `product-design/TexHolding-MVP-P0-UX.pen:4403`

影响：

- 表单 schema
- 埋点字段
- 结果映射逻辑

都会受影响。

处理要求：

- 明确以 4 步为准
- 更新 PRD 与字段定义

---

## 3. 当前可直接开始的工作

在不补完全部文档前，以下工作已经可以开始：

- 前端 UI 组件拆分
- 页面容器与路由搭建
- 训练页与反馈页的交互骨架
- 结果页、提醒页、登录 sheet 的静态页面实现
- 复盘输入页 stepper 容器
- 本地 session 与页面状态管理骨架

这些工作都以 `TexHolding-MVP-P0-UX.pen` 为准。

---

## 4. 开发前必须冻结的基线

正式开发开始前，需要补齐并冻结以下基线：

### 4.1 P0 范围基线

- 页面范围固定为：
  - Welcome
  - Onboarding Step 1
  - Onboarding Step 2
  - Training
  - Training Feedback
  - Training Result
  - Reminder
  - Login Sheet
  - Home After Training
  - Review Input
  - Review Result
  - Home After Review

### 4.2 运行时数据基线

- `RuntimeScenario`
- `RuntimeLeak`
- `RuntimeReminder`
- `TrainingSession`
- `ReviewSubmission`
- `ReviewResult`

### 4.3 交互基线

- 登录时机：提醒保存后 / 首次进首页前
- 首页主 CTA 切换规则
- 复盘四步字段与最终提交条件
- 低置信度建议触发条件

### 4.4 验收基线

- P0 只验 Happy Path + 核心异常态
- 不验成长页、会员页、我的页

---

## 5. 推荐开发方案

### 阶段 0：规格冻结

目标：把产品、设计、内容、开发统一到同一个 P0 版本。

输出：

- `P0 canonical spec`
- 页面清单
- 状态矩阵
- 数据契约
- 埋点表

任务：

- 从旧 PRD 中剥离 P1 / P2 页面
- 明确 11 个业务画板 + 1 个 CTA 变体首页是唯一交付范围
- 确认复盘 4 步模型
- 定义登录前本地保存与登录后绑定行为

### 阶段 1：内容运行时准备

目标：把知识库转成应用可消费的轻量数据包。

输出：

- `runtime_scenarios.json`
- `runtime_leaks.json`
- `runtime_reminders.json`

任务：

- 从 `knowledge-base` 中筛出 P0 所需场景和 leak
- 建立 scenario -> leak -> reminder 的静态映射
- 明确 review submission -> review result 的首版规则

### 阶段 2：前端基础与组件层

目标：先搭可复用组件与导航骨架。

输出：

- 状态栏
- 页面头部
- 主/次/文字按钮
- 选项卡
- 训练进度条
- leak / reminder / recommendation 卡
- review stepper
- login sheet

任务：

- 按 `.pen` 组件库拆前端组件
- 建立设计 token
- 接入本地状态管理

### 阶段 3：首训主链路

目标：打通欢迎 -> 引导 -> 训练 -> 结果 -> 提醒 -> 登录 -> 首页。

输出：

- 首训完整 happy path
- 登录前本地保存
- 登录后首页

任务：

- 训练题切换与答题提交
- 即时反馈 sheet
- 结果页 leak 与提醒展示
- 提醒保存与登录触发
- 首页训练态 CTA

### 阶段 4：赛后复盘链路

目标：打通首页 -> 复盘输入 -> 复盘结果 -> 首页切换态。

输出：

- 复盘 4 步表单
- 结果页低置信度建议
- 复盘后首页 CTA 切换

任务：

- stepper 流程与字段暂存
- review result 渲染
- 复盘后的首页主 CTA 切换

### 阶段 5：异常态、埋点与 QA

目标：补足“能用”到“可试运营”之间的最低工程质量。

输出：

- 状态矩阵实现
- 埋点接入
- QA case

任务：

- 训练退出确认
- 登录失败与验证码异常
- 首页空状态
- 复盘表单校验
- 提醒保存反馈
- 首训完成率与复盘完成率埋点

---

## 6. 任务拆分建议

### 前端

- `app-shell`: 路由、布局、设计 token、基础组件
- `training-flow`: 欢迎、引导、训练、反馈、结果、提醒
- `review-flow`: 首页、复盘输入、复盘结果、CTA 切换
- `auth-lite`: 登录 sheet、本地数据绑定

### 内容 / 策略

- 题库筛选
- leak 映射
- reminder 模板
- 复盘规则

### 测试

- 页面跳转
- 状态切换
- 登录前后数据行为
- 低置信度结果

---

## 7. 验收标准

### 产品验收

- 首训主链路能完整跑通
- 结果页能稳定给出主 leak、提醒、推荐训练
- 首页能根据阶段切换主 CTA
- 复盘结果能区分正常建议与低置信度建议

### 设计验收

- 前端实现与 `.pen` 画板结构一致
- 组件复用关系清晰
- 关键信息层级不偏离设计稿

### 开发验收

- 不再依赖旧 PRD 的 13 页范围
- 所有运行时字段都有唯一来源
- 所有核心状态都有实现定义

---

## 8. 推荐交付顺序

建议先交付：

1. 欢迎 / 引导 / 训练 / 反馈
2. 结果 / 提醒 / 登录
3. 首页训练态
4. 复盘输入 / 复盘结果
5. 首页复盘态
6. 异常态与埋点

---

## 9. 最终建议

如果只问一句话：

**设计稿已经足够开始前端开发，但整个需求包还不足以直接进入完整开发。先补 P0 canonical spec 和运行时数据契约，再按本文计划推进。**
