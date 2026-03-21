# TexHolding MVP P0 Design Baseline

## 1. 设计基线说明

本文件是 `TexHolding-MVP-P0-UX.pen` 的文字补充。

作用：

- 把 `.pen` 已表达的页面结构翻译成可开发口径
- 补齐设计稿未单独画出的边界状态
- 固定 route / overlay / state 的实现方式

## 2. 设计源文件

- 主文件：`/mvp-p0/design/TexHolding-MVP-P0-UX.pen`
- 画板尺寸：`393 x 852`
- 载体：移动端 `H5 / PWA`

## 3. 画板清单

### 3.1 文档层

- 00 Cover & Notes
- 01 Flow Map
- 02 Component Library

### 3.2 业务层

- 03 Welcome
- 04 Onboarding Step 1
- 05 Onboarding Step 2
- 06 Training
- 07 Training Feedback
- 08 Training Result
- 09 Reminder
- 10 Login Sheet
- 11 Home After Training
- 12 Review Input
- 13 Review Result
- 14 Home After Review

## 4. Route / State 口径

### 4.1 Route

按独立路由实现：

- `/welcome`
- `/onboarding/step-1`
- `/onboarding/step-2`
- `/training`
- `/training/result`
- `/reminder`
- `/home`
- `/review/input`
- `/review/result`

### 4.2 Overlay / State

不做新路由，按覆盖态或页面状态实现：

- `Training Feedback`
- `Login Sheet`
- `Home After Review`

## 5. 组件基线

P0 组件以以下可复用块为准：

- `Cmp / Status Bar`
- `Cmp / Page Header`
- `Cmp / Button Primary`
- `Cmp / Button Secondary`
- `Cmp / Button Text`
- `Cmp / Option Card`
- `Cmp / Training Progress`
- `Cmp / Hand Info Card`
- `Cmp / Instant Feedback Sheet`
- `Cmp / Leak Card`
- `Cmp / Reminder Card`
- `Cmp / Recommendation Card`
- `Cmp / Review Stepper`
- `Cmp / Login Sheet`

实现要求：

- 训练、结果、提醒页尽量复用同一组卡片组件
- 首页不引入 P1 组件
- Stepper 和 Bottom Sheet 必须做成独立可复用模块

## 6. 视觉基线

- 主背景：深墨绿 / 炭黑
- 内容卡：暖米白
- 主 CTA：琥珀金
- 风险提醒：珊瑚红
- 间距体系：8pt 栅格
- 主容器左右 padding：20
- 模块大间距：24
- 模块小间距：12 / 16

## 7. 页面级关键规则

### 7.1 Welcome

- 必须同时存在 `开始第一组训练` 与 `我已有账号`
- 示例结果区默认为收起或弱展示，不可压过主 CTA

### 7.2 Onboarding

- 共 2 步，不再保留承接页
- Step 2 完成后直接进 Training

### 7.3 Training

- 题面中部展示
- 动作按钮固定底部
- 页面本身只负责题面与动作，不承载反馈正文

### 7.4 Training Feedback

- 用底部 sheet 形式覆盖在 Training 上
- 主动作只能是 `下一手`

### 7.5 Training Result

- 主 leak 卡必须位于首屏核心区
- 分数不可占用最大视觉层级

### 7.6 Reminder

- 3 段提醒结构固定
- 保存提醒后进入登录覆层

### 7.7 Home

- 首屏只保留 3 个模块：
  - 今天提醒
  - 唯一主 CTA
  - 当前主 leak

### 7.8 Review Input

- 同一页面内实现 4 步流程
- 必须显式展示 `记不清也能继续`

### 7.9 Review Result

- 必须支持 `低置信度建议`
- 推荐训练卡在首屏内可见

## 8. 边界状态矩阵

以下状态不一定单独画板实现，但必须在开发时补齐：

### 8.1 Welcome 已有账号

- 触发：点击 `我已有账号`
- 形式：打开 `Login Sheet`
- 结果：
  - 登录成功：进入 Home 或恢复最近 session
  - 关闭：留在 Welcome

### 8.2 Training 中途退出

- 触发：点击返回或关闭
- 形式：确认弹窗
- 文案：
  - 标题：退出本轮训练？
  - 正文：现在退出将丢失本轮未完成进度
- 按钮：
  - 继续训练
  - 确认退出

### 8.3 Reminder 保存结果

- 保存成功：toast `已保存提醒`
- 保存失败：toast `保存失败，请重试`
- 若用户未登录且选择跳过，仍先写本地缓存

### 8.4 Login Sheet 状态

- 默认态
- 发送验证码中
- 已发送倒计时态
- 验证失败态
- 网络失败重试态

实现要求：

- 发送按钮进入 loading
- 成功后 60 秒倒计时
- 失败时保留手机号并允许重试

### 8.5 Home 空状态

- 仅用于异常恢复场景
- 触发：本地 session 丢失或提醒未生成
- 展示：
  - 标题：先完成第一组训练
  - 按钮：开始第一组训练

### 8.6 Review Input 校验失败

- 触发：关键字段组合不足且用户点击提交
- 形式：step 区块下方红色提示
- 文案方向：
  - 还需要至少补充牌面或关键动作，才能生成复盘结果

## 9. 工程实现提示

- Home After Review 不新建页面，按 `home_variant=review_priority` 实现
- Login Sheet 由来源控制：
  - `source=welcome_existing_user`
  - `source=save_reminder`
  - `source=enter_home_first_time`
- Review Input 的最终提交页可作为同一页面的最后 step 状态，不新开 route
