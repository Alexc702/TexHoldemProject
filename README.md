# TexHolding Frontend

基于 `/mvp-p0` Canonical Package 启动的前端开发骨架，目前同时包含：

- 现有 `P0` 版本
- 独立并存的 `Three-Lines` 版本

## 当前范围

- Welcome
- Onboarding Step 1 / Step 2
- Training
- Training Feedback Sheet
- Training Result
- Reminder
- Login Sheet
- Home
- Review Input
- Review Result
- Three-Lines Home / Training Hub / Track Detail
- Three-Lines Track-based Session / Result / Reminder
- Three-Lines Cross-track Review

## 当前实现

- `React + Vite + TypeScript` 工程骨架
- P0 主题与基础样式
- 路由与页面骨架
- 共享组件
- 本地状态持久化
- mock runtime 数据
- 训练结果 / 提醒 / 复盘结果的基础规则逻辑
- 独立三线版本路由与状态树

## 运行

项目依赖 Node.js 环境。

```bash
npm install
npm run dev
```

路由入口：

- 现有 P0：`/welcome`
- 三线独立版：`/three-lines/welcome`

自测：

```bash
npm run test:smoke
npm run test:smoke:three-lines
```

## 文档基线

- `mvp-p0/product/TexHolding-MVP-P0-PRD.md`
- `mvp-p0/design/TexHolding-MVP-P0-UX.pen`
- `mvp-p0/design/TexHolding-MVP-P0-design-baseline.md`
- `mvp-p0/content/TexHolding-MVP-P0-content-spec.md`
- `mvp-p0/development/TexHolding-MVP-P0-development-plan.md`
