# Astro 个人品牌站分支

这个分支用于将 `binxuan98.github.io` 迁移为 Astro 架构，保留原仓库作为可回退版本。

## 这一版为什么用 Astro

- `src/pages/` 负责路由，`/` 和 `/society/` 都是静态生成页面，适合 GitHub Pages。
- `src/data/` 集中维护个人信息、项目、智研社模块，内容修改不用在大段 HTML 里翻找。
- `src/components/` 拆出指标、标签、头像、项目列表、智研社轮播等组件，复用更清楚。
- 首页默认不加载轮播脚本，只有 `/society/` 会按需加载 `public/scripts/site.js`。
- 头像与山水图在 Astro 页面中使用 `astro:assets`，构建时会生成带尺寸信息的优化资源。
- 输出目录仍然是纯静态 `dist/`，不需要服务器，部署到 GitHub Pages 成本低、速度快。

## Three.js 展厅实验分支

`codex/threejs-compute-showcase` 分支在 `/society/` 首屏加入了 Three.js/WebGL 场景：

- 3D 算力节点网络：节点、连线和中心枢纽构成空间化算力拓扑。
- 数据流穿梭：金色脉冲粒子沿节点连线持续移动。
- 庆阳地脉线条：底部用流动曲线和网格表达“地脉 + 东数西算数据网格”。
- 按需加载：Three.js 只在 `/society/` 页面加载，首页不加载 WebGL 代码。
- 可访问性：遵守 `prefers-reduced-motion`，减少动效时保留静态画面。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## GitHub Pages 发布方式

1. 推送 `astro` 分支。
2. 在 GitHub 仓库 `Settings -> Pages` 中，将 `Build and deployment` 的 `Source` 设置为 `GitHub Actions`。
3. 推送到 `astro` 分支后，`.github/workflows/deploy-astro.yml` 会构建 `dist/` 并发布到 `https://binxuan98.github.io/`。

需要切回原来的 Jekyll 版本时，可以把 Pages 来源重新设置为 `Deploy from a branch`，选择 `master / root`。
