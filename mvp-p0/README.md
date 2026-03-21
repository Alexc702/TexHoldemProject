# TexHolding MVP P0 Canonical Package

本目录是 TexHolding 的唯一 `MVP / P0` 材料包。

目标：把 `产品 / 设计 / 内容 / 开发` 统一到同一个可执行版本，避免继续混用旧 PRD 与新设计稿。

## 1. 使用规则

### 1.1 主从关系

P0 开发时，文件优先级固定如下：

1. `design/TexHolding-MVP-P0-UX.pen`
   - 页面范围
   - 组件结构
   - Happy Path 布局与 CTA 位置
2. `product/TexHolding-MVP-P0-PRD.md`
   - MVP 需求范围
   - 页面职责
   - 交互规则
   - 验收标准
3. `design/TexHolding-MVP-P0-design-baseline.md`
   - 设计稿未单独落板的边界状态
   - route / overlay / state 口径
4. `content/TexHolding-MVP-P0-content-spec.md`
   - 知识库到 runtime bundle 的映射
   - leak / reminder / review 的数据契约
5. `development/TexHolding-MVP-P0-development-plan.md`
   - 开发拆分
   - 实施顺序
   - 里程碑与验收门槛

如文件之间有冲突，按上述顺序处理。

### 1.2 已废止文件

以下文件不再作为 P0 开发依据，只保留历史参考价值：

- `product-design/texholding-mvp-prd.md`
- `product-dev/TexHolding-MVP-P0-development-plan.md`

## 2. P0 冻结范围

### 2.1 业务页面与状态

P0 只覆盖以下主链路：

- Welcome
- Onboarding Step 1
- Onboarding Step 2
- Training
- Training Feedback State
- Training Result
- Reminder
- Login Sheet
- Home After Training
- Review Input
- Review Result
- Home After Review

不包含：

- 新手引导承接页
- 我的成长页
- 会员页
- 我的页
- 推送通知中心
- 完整历史记录
- AI 解释态

### 2.2 P0 内容范围

- 3 个训练包
- 24 个训练场景
- 8 个首发标准 leak
- 运行时 bundle 驱动，不直接在 App 中加载整套知识库

## 3. 推荐阅读顺序

1. 先看 `product/TexHolding-MVP-P0-PRD.md`
2. 再看 `design/TexHolding-MVP-P0-UX.pen`
3. 然后看 `design/TexHolding-MVP-P0-design-baseline.md`
4. 内容与前后端对接时看 `content/TexHolding-MVP-P0-content-spec.md`
5. 排期与拆任务时看 `development/TexHolding-MVP-P0-development-plan.md`

## 4. 目录结构

```text
mvp-p0/
├── README.md
├── product/
│   └── TexHolding-MVP-P0-PRD.md
├── design/
│   ├── TexHolding-MVP-P0-UX.pen
│   └── TexHolding-MVP-P0-design-baseline.md
├── content/
│   └── TexHolding-MVP-P0-content-spec.md
└── development/
    └── TexHolding-MVP-P0-development-plan.md
```

## 5. 变更规则

P0 阶段如需改动：

- 改页面范围：先改 `PRD`，再改 `pen`，最后更新 `development plan`
- 改交互状态：先改 `design baseline`，再同步 `PRD`
- 改 leak / reminder / runtime schema：先改 `content spec`
- 改交付节奏：只改 `development plan`

未同步更新这 4 类文件的变更，不视为 P0 已冻结版本。
