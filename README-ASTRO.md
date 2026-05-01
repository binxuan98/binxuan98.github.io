# Astro 个人品牌站分支

这个分支用于将 `binxuan98.github.io` 迁移为 Astro 架构，保留原仓库作为可回退版本。

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
