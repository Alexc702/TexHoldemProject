# TexHolding MVP P0 Development Plan

## 1. 计划定位

本计划只对应 `/mvp-p0` 目录下的 P0 Canonical Package。

开发基线：

- 产品需求：`/mvp-p0/product/TexHolding-MVP-P0-PRD.md`
- 设计基线：`/mvp-p0/design/TexHolding-MVP-P0-UX.pen`
- 状态补充：`/mvp-p0/design/TexHolding-MVP-P0-design-baseline.md`
- 内容契约：`/mvp-p0/content/TexHolding-MVP-P0-content-spec.md`

## 2. 总体判断

当前材料已经满足：

- 前端页面与组件拆分
- 路由与状态管理搭建
- 运行时内容结构定义
- P0 范围内的测试与验收设计

当前不包含：

- P1 页面开发
- AI 解释能力
- 复杂后端服务设计

## 3. 开发目标

交付一个可测试的 P0 版本，验证以下闭环：

`首训 -> 结果 -> 提醒 -> 首页 -> 复盘 -> 复盘结果 -> 推荐训练`

## 4. 推荐实施顺序

### Phase 0. 冻结规格

目标：

- 确保所有角色只按 `/mvp-p0` 工作

输出：

- 路由表
- 状态矩阵
- 埋点表
- runtime bundle 字段确认

完成标准：

- 不再引用旧版 `product-design/texholding-mvp-prd.md`
- 复盘固定为 4 步
- 首页 CTA 切换规则冻结

### Phase 1. 运行时内容准备

目标：

- 让训练、结果、提醒、复盘有稳定数据可接

任务：

- 从 `knowledge-base` 编译出 `runtime_scenarios.json`
- 编译 `runtime_leaks.json`
- 编译 `runtime_reminders.json`
- 做 alias -> standard leak 归一化
- 固定 24 个首发 scenario 与 8 个首发 leak

完成标准：

- 任一 scenario 都能映射标准 leak
- 任一 primary leak 都能生成 3 条提醒和 1 个推荐 pack

### Phase 2. 前端基础与组件层

目标：

- 先把骨架与复用层搭好

任务：

- 路由容器
- 页面壳与 layout
- 主题 token
- Button / Card / Sheet / Stepper 组件
- 本地存储封装
- 埋点基础封装

完成标准：

- 设计稿中的所有核心组件都有对应实现
- Login Sheet / Training Feedback / Review Stepper 可独立复用

### Phase 3. 首训主链路

目标：

- 跑通从 Welcome 到 Reminder 的主链路

任务：

- Welcome
- Onboarding Step 1
- Onboarding Step 2
- Training 初始态
- Training Feedback 态
- Training Result
- Reminder
- Login Sheet

完成标准：

- 首轮 5 题可完整跑通
- 结果页稳定输出 primary leak / reminders / recommended pack
- Reminder 支持本地保存和登录后绑定

### Phase 4. 首页与复盘链路

目标：

- 跑通从 Home 到 Review Result 的第二段价值链

任务：

- Home After Training
- Home After Review variant
- Review Input 4-step flow
- Review Result
- Home CTA 切换逻辑

完成标准：

- Review Input 支持低精度提交
- Review Result 支持 low confidence
- Home 根据阶段切换唯一主 CTA

### Phase 5. 边界状态与 QA

目标：

- 把 P0 从“能演示”提升到“能测试”

任务：

- Welcome 已有账号入口
- Training 退出确认
- Reminder 保存成功 / 失败
- Login 验证码发送 / 失败 / 重试
- Home 空状态
- Review Input 校验失败态
- 埋点校验
- 内容 QA

完成标准：

- 所有状态都能在测试中显式触达
- 关键异常态有明确 UI 与处理结果

## 5. 任务拆分

### 5.1 产品 / 设计

- 冻结 route 与 state
- 确认埋点
- 确认边界状态文案
- 保持 pen 与 baseline 同步

### 5.2 内容 / 策略

- 选定 24 个 scenario
- 选定 8 个首发 leak
- 产出 reminder 模板
- 定义 review 规则映射

### 5.3 前端

- 页面实现
- 组件复用
- 状态管理
- 本地存储
- runtime bundle 读取

### 5.4 测试

- Happy Path
- 边界状态
- 结果稳定性
- 本地保存与登录绑定

## 6. 埋点建议

至少覆盖：

- welcome_start_clicked
- onboarding_step_1_completed
- onboarding_step_2_completed
- training_question_answered
- training_session_completed
- result_generate_reminder_clicked
- reminder_saved
- login_sheet_opened
- login_completed
- home_primary_cta_clicked
- review_started
- review_submitted
- review_result_viewed
- recommended_pack_clicked

## 7. 验收门槛

### 7.1 功能

- 首轮训练可跑通
- Reminder 可生成且可保存
- Review Result 可生成
- Home CTA 可切换

### 7.2 内容

- 结果可解释
- 提醒可执行
- 复盘结果在低置信度下不伪精确

### 7.3 一致性

- 实现结果与 `/mvp-p0` 文档无冲突
- 不混用旧 PRD 定义

## 8. 建议交付顺序

1. Phase 0 + Phase 1
2. Phase 2
3. Phase 3
4. Phase 4
5. Phase 5

优先级原则：

- 先保证内容契约和主链路跑通
- 再补边界状态
- 最后再考虑视觉精修
