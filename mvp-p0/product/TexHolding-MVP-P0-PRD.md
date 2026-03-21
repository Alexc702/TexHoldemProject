# TexHolding MVP P0 PRD

## 0. 文档定位

- 文档状态：`Canonical P0 PRD`
- 适用阶段：`MVP / P0`
- 唯一设计基线：`/mvp-p0/design/TexHolding-MVP-P0-UX.pen`
- 本文用途：定义 P0 的业务范围、页面职责、交互规则与验收标准

本文件取代旧版大范围 PRD 在 P0 阶段的开发约束作用。

## 1. 产品定义

### 1.1 产品目标

验证一条最短价值链路：

`欢迎 -> 两步引导 -> 首轮 5 手训练 -> 训练结果 -> 今晚上桌提醒 -> 首页 -> 赛后录入 -> 赛后复盘结果 -> 推荐下一组训练`

### 1.2 用户完成链路后必须得到的价值

用户第一次跑完整条链路后，必须能明确说出：

- 我最容易犯的 1 个问题
- 今晚上桌前要记住的 1 到 3 条提醒
- 我下一步应该练哪一组

### 1.3 非目标

P0 不做以下内容：

- 会员与支付
- 成长页
- 我的页
- 通知中心
- 复杂历史记录
- AI 解释与生成
- 手牌导入器
- 桌面端专属设计

## 2. 目标用户

- 经常打朋友局、私局、松散娱乐局的中文玩家
- 会基本规则，但 postflop 判断体系不稳定
- 不想学重理论，更想拿到今晚能直接用的提醒

## 3. 设计与交互原则

- 每一页只承载 1 个核心任务
- 从欢迎页到进入第 1 题不超过 3 次点击
- 同一页面不超过 1 个主 CTA
- 尽量少术语，多桌边语言
- 分数不是主输出，主输出是 leak 和可执行提醒
- 所有关键结果先展示，再要求登录

## 4. P0 范围

### 4.1 路由级页面

- Welcome
- Onboarding Step 1
- Onboarding Step 2
- Training
- Training Result
- Reminder
- Home
- Review Input
- Review Result

### 4.2 显式状态页 / 覆层

- Training Feedback State
- Login Sheet
- Home After Review State

说明：

- `Training Feedback` 是 Training 的强制反馈态，不单独作为新路由
- `Login Sheet` 是 Reminder / Home 触发的覆层
- `Home After Review` 是 Home 的 CTA 变体态

## 5. 主链路

1. Welcome
2. Onboarding Step 1
3. Onboarding Step 2
4. Training
5. Training Feedback State
6. Training Result
7. Reminder
8. Login Sheet 或本地保存跳过
9. Home After Training
10. Review Input
11. Review Result
12. Home After Review

## 6. 页面需求

### 6.1 Welcome

页面目标：

- 10 秒内说明价值
- 把用户送进首轮训练

模块：

- 主标题
- 3 张卖点卡
- 示例结果预览
- 主 CTA
- 次按钮：我已有账号

主 CTA：

- `开始第一组训练`

关键规则：

- 未登录用户可直接进入引导
- 点击“我已有账号”时打开登录覆层，不跳独立账号页

### 6.2 Onboarding Step 1

页面目标：

- 轻量判断用户阶段

问题：

- 你现在更像哪类玩家？

字段：

- `level`
  - beginner
  - casual
  - improving
  - unknown

交互：

- 单选
- 选中后激活 `继续`

### 6.3 Onboarding Step 2

页面目标：

- 记录当前最强学习诉求

问题：

- 你现在最想先解决什么？

字段：

- `goal`
  - cbet
  - bluff
  - exploit
  - direct_start

交互：

- 单选
- 选中后主 CTA 激活
- 点击后直接进入 Training
- 不保留单独承接页

### 6.4 Training

页面目标：

- 让用户像在牌桌上一样做选择，而不是做考试题

输入：

- 1 个 session
- 5 道 scenario

模块：

- 顶部进度
- 牌局信息卡
- 问题题面
- 2 到 3 个动作按钮

动作约束：

- 点击选项即提交
- 不做二次确认
- 每题提交后必须进入 Training Feedback State

退出规则：

- 若中途退出，弹确认框
- 确认退出后丢失本轮未完成进度

### 6.5 Training Feedback State

页面目标：

- 用最低打断成本给出即时纠偏

结构：

- 推荐度
- 一句原因
- 一句桌边翻译
- 主 CTA：`下一手`

规则：

- 反馈态只允许一个主动作
- 第 5 题完成后不回题面，直接进 Training Result

### 6.6 Training Result

页面目标：

- 把 5 题结果翻译成可执行结论

固定输出：

- `primary_leak`
- 1 句用户描述
- 1 句修正原则
- 3 条提醒预览
- 1 个推荐训练包

规则：

- 分数只做辅助展示
- 必须始终产出一个 primary leak
- 主 CTA 固定为 `生成今晚上桌提醒`

### 6.7 Reminder

页面目标：

- 生成赛前可扫描的提醒卡

结构：

- `先记住这 3 条`
- `今晚特别注意的对手`
- `今晚先别这样`

规则：

- 点击主 CTA 时触发 Login Sheet
- 用户跳过登录时，提醒与训练结果先存本地
- 提醒不足 3 条时，用 leak 的 `fix_principle` 补齐

### 6.8 Login Sheet

页面目标：

- 在不打断价值感知的前提下完成绑定

支持动作：

- 输入手机号
- 发送验证码
- 验证并登录
- `稍后再说`

规则：

- 触发来源：
  - Reminder 保存后
  - 首次进入 Home 前
- 跳过登录不阻断主流程
- 登录成功后绑定本地 session

### 6.9 Home

页面目标：

- 成为训练与复盘的单一调度入口

首屏只保留：

- 今天提醒
- 唯一主 CTA
- 当前主 leak

CTA 规则：

- 完成首训未复盘：`继续训练`
- 完成至少 1 次复盘后再次进入：首页切到 `复盘一手`

首页空状态：

- 没有训练结果时，不开放首页
- 首次进首页前必须已经完成首训

### 6.10 Review Input

页面目标：

- 允许用户用低精度信息完成复盘

采用 4 步模型：

1. 这手怎么入池
2. 你大概拿的是什么牌
3. 翻牌面更像哪种
4. 打到哪里 + 关键动作 + 最担心哪里打错

字段：

- `preflop_type`
- `hand_bucket`
- `board_class`
- `reached_street`
- `key_action`
- `self_doubt`
- `opponent_type` 可选

规则：

- 每步必须提供 `记不清，继续`
- 信息不完整可以提交
- 提交前校验最少字段组合

### 6.11 Review Result

页面目标：

- 让用户觉得系统看见了真实问题

固定输出：

- 这手更像什么思路问题
- 暴露的 1 到 2 个 leak
- 下次先记住的 3 条
- 推荐训练包

规则：

- 信息不足时必须显示 `低置信度建议`
- 主 CTA 固定为 `练这个`
- 次 CTA 为 `返回首页`

## 7. 运行时依赖

P0 不直接在 App 内消费整套知识库，而是只消费 3 个运行时 bundle：

- `runtime_scenarios.json`
- `runtime_leaks.json`
- `runtime_reminders.json`

详细字段见：

- `/mvp-p0/content/TexHolding-MVP-P0-content-spec.md`

## 8. 核心交互规则

- 欢迎页到首题最多 3 次点击
- 首轮训练固定 5 题
- 每题点击动作即提交
- 训练结果页主 CTA 永远是 `生成今晚上桌提醒`
- Reminder 保存时触发登录，但允许跳过
- 首页不并列两个主 CTA
- Review Input 按 4 步实现，不再按旧 5 步 PRD 实现

## 9. P0 验收标准

### 9.1 产品验收

- 用户能完整跑通主链路
- 首轮训练后稳定得到 `1 个主 leak + 3 条提醒 + 1 个训练推荐`
- Review Result 在信息不足时输出低置信度结论，而不是空结果

### 9.2 设计验收

- 实现结果与 `TexHolding-MVP-P0-UX.pen` 主路径一致
- 缺失状态按 `design baseline` 补齐

### 9.3 工程验收

- 页面、状态、字段名与内容契约一致
- 不实现 P1 页面
- 不额外扩 scope

## 10. 版本边界

以下需求延期到 P1 之后：

- 成长数据面板
- 历史复盘列表
- 完整账号中心
- 会员订阅
- Push 提醒
- 更复杂的对手画像与 AI 扩展
