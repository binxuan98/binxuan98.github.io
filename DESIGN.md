---
name: 东数西算人才培养基地一期（society 路由）
description: 仅用于 /society/ 的照片参照一期剖视与室内导览视觉系统
colors:
  twin-accent: "#66e2d2"
  twin-muted: "#90aaba"
  twin-line: "#213845"
  twin-surface: "#0b1924"
  stage-background: "#060e17"
  text-primary: "#deedf3"
  focus-ring: "#a6ffea"
  control-active: "#183b42"
  control-hover: "#17313f"
  source-highlight: "#8df3df"
  enter-background: "#183c42"
  enter-text: "#a6f1e1"
  room-wall: "#e4e9e6"
  room-white: "#f0f0e8"
  room-wood: "#c69a60"
  equipment-blue: "#2376bc"
  curtain-blue: "#225181"
  glass-floor: "#78bdc7"
  wire-blue: "#297bdd"
  wire-green: "#51934a"
  route-warm: "#f4d598"
typography:
  display:
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: "23px"
    fontWeight: 600
    letterSpacing: "0.025em"
  title:
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.015em"
  body:
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: "11px"
    lineHeight: 1.9
  label:
    fontSize: "9px"
rounded:
  landmark: "3px"
  icon-button: "4px"
  toolbar: "5px"
spacing:
  inline: "6px"
  compact: "12px"
  panel-inline: "18px"
  workspace: "18px"
components:
  toolbar-button:
    textColor: "{colors.text-primary}"
    rounded: "{rounded.landmark}"
    padding: "6px 12px"
  toolbar-button-active:
    backgroundColor: "{colors.control-active}"
    textColor: "{colors.source-highlight}"
  toolbar-button-hover:
    backgroundColor: "{colors.control-hover}"
  dock-item:
    backgroundColor: "{colors.twin-surface}"
    textColor: "{colors.text-primary}"
    padding: "14px 12px"
  enter-space:
    backgroundColor: "{colors.enter-background}"
    textColor: "{colors.enter-text}"
    rounded: "{rounded.landmark}"
    padding: "10px 12px"
    width: "100%"
---

# Design System: 东数西算人才培养基地一期

## Overview

**Creative North Star: "照片参照的一期空间导览"**

本规范仅适用于 `/society/`。深海蓝数字孪生外壳承托一期基地的线性楼层剖视，青绿色反馈帮助参观者在七个导览节点、模型选区和照片档案之间建立对应。用户本期要求以现场照片与已确认走廊顺序建模，原有五节点概念园区已被替换。

空间身份来自真实照片可见的白蓝设备、木色长桌、蓝帘、透明布线通道与大厅发光展柱。十间模型房间为示意排布，尺寸、设备重复数未经实测，系统运维左右关系暂定。界面同时提供十张真实照片对照；原始公众号二维码继续保留，未使用生成式图片。

**Key Characteristics:**

- 深海蓝界面与青绿色选中反馈。
- 线性中轴走廊连接七个导览节点，剖视与近景/室内相互切换。
- 白蓝设备、木色桌面、透明蓝绿布线与现场照片形成辨识特征。
- 手机七项导航横向滚动，内容与照片仍可完整阅读。

依据为 `src/pages/society.astro`、`src/data/base-phase-one.ts`、`src/styles/society-twin.css`、`src/components/SocietyTwinScene.astro` 及两个 `society-twin` 脚本。页面方向见 `docs/design/society.md`，照片映射与事实边界见 `docs/design/base-phase-one-evidence.md`。本文件按代码记录实现，不独立证明测绘、设备清点或硬件验收。

## Colors

### Primary

`twin-accent` 是选中与方向提示的青绿；`source-highlight` 用于照片来源提示与工具激活文字。`focus-ring` 专用于键盘焦点。空间入口按钮使用 `enter-background` 与 `enter-text` 配对。

### Secondary

照片参照的材料色包括 `equipment-blue`、`curtain-blue`、`room-wood`、`wire-blue` 和 `wire-green`。`glass-floor` 配合材质透明度呈现布线通道；`route-warm` 用于场景中的暖色提示。材质颜色是模型基础色，会受光照与透明度影响，不等同于照片色彩测量结果。

### Neutral

`stage-background` 承托工作台，`twin-surface` 组织导航，`twin-line` 分隔面板。`text-primary` 与 `twin-muted` 区分主要与辅助文字。`room-wall`、`room-white` 为室内浅色墙面、桌架和设备主体，使室内造型与深色外壳分开。

## Typography

中文采用 PingFang SC / Microsoft YaHei 系统黑体栈。主标题默认 23px / 600、字距 .025em；宽屏为 27px，低高度桌面为 20px。手机主标题 17px、副标题 12px 且换行显示，行高 1.5。

空间档案标题默认 20px / 500，低高度桌面 18px、手机 21px。档案正文默认 11px / 1.9，宽屏 13px、手机 12px。位置说明为 10px 青绿辅助文字。左侧动线标题默认 12px，手机 13px；照片说明为 9px / 1.6。7–10px 的次级文字仅承担方向与来源提示，正文层次按上述角色保持。

## Layout

桌面容器上限 2400px，默认 100svh、最小高度 800px、横向内边距 26px。当前三栏为 235px / 弹性场景 / 305px，间距 18px；两侧可滚动，中央模型为主体。1700px 以上三栏扩大为 260px / 弹性场景 / 330px。桌面高度不超过 850px 时最小高度 730px，三栏为 220px / 弹性场景 / 275px，顶部高度 80px，照片高度 130px。

1100px 及以下采用自然页面高度，720px 高地图先占整行，面板在下方排两列，七项导航固定于底部。600px 及以下为地图、照片档案、图层与二维码、概览动线的单列流；地图高 650px、页边距 14px、顶部高 112px。底部导航使用七项 `minmax(68px, 1fr)` 横向滚动，页尾预留 105px 并支持安全区。

照片桌面高度 160px，宽屏 190px，平板 230px，采用裁切填充；手机 210px 并使用完整包含显示。照片均可打开原图。

## Elevation & Depth

界面主要由深蓝半透明面板、顶部细线和局部工具栏阴影（`0 8px 24px #02091040`）构成。空间景深由 Three.js 几何、浅色墙体、木桌、蓝帘、透明地板、设备、光照与材料表现。

剖视保留整条走廊及房间选区；近景/室内只显示当前所属空间。入口为专用外部近景；成果展示中心采用 3.25 模型单位高的机位以越过沙盘；普通室内视点为 1.9 模型单位，以上均是场景参数，不是实测高度。室内自动显示所属顶棚与灯具，大厅呈现格栅顶与蓝色发光展柱。

镜头过渡为 1100ms 四次缓出。巡游由用户启动，每 6500ms 切换节点，保持自动旋转关闭；手动操作中止巡游。减少动态效果时镜头直接定位，CSS 过渡和动画关闭。无旧园区交通流或协同粒子动画。

## Shapes

面板以直角、顶部细线与描边图标组成。地标、照片、入口按钮和照片切换按钮采用 3px 小圆角；工具栏为 5px。路线编号为 23px 圆形，沿竖线连接。透明通道与蓝绿线缆、白蓝设备、穿孔物联网实训架和大厅格栅柱面为当前空间形态特征。

## Components

- **七项导航与动线列表**：对应入口、成果展示、软件技术、中门大厅、大数据技术、系统运维、人工智能；左侧动线、地标和底部导航同步显示选中项。
- **场景地标**：标题和方位说明带引导线连接模型；桌面宽度上限 160px，手机 130px。室内模式隐藏地标以让出视野。
- **空间档案**：标题、方位、正文、现场照片、可见特征及进入按钮；有多张照片时提供视角切换，照片含来源说明并能打开原图。保留运维左右暂定措辞。
- **进入空间按钮**：全宽青绿深底按钮；入口切换外部近景、展厅切换较高近景、其他节点切换室内视角，窄屏滚回场景位置。
- **模式工具栏**：剖视、俯视、巡游和重置；`data-mode` 为 overview / top / interior，`twin-mode` 事件同步 `aria-pressed`。overview 选中剖视，top 选中俯视，interior 时两者均不选中。切换剖视/俯视退出室内，并将标题同步为“一期空间总览”或“一期空间总览 · 俯视”；重置回到总览。
- **图层开关**：空间名称、透明通道与布线、剖视显示顶棚。室内自动显示当前顶棚，不由剖视顶棚偏好关闭；回到非室内后按保存的开关偏好显示。
- **二维码**：使用既有原文件与白底，保持比例，提供原图入口。
- **回退**：WebGL 不可用时保留七节点文字与照片导览，禁用三维工具和进入按钮；无脚本时提供所有空间正文。

`.impeccable/design.json` 提供独立设计预览片段及断点、动效扩展；预览片段不替代业务交互。

## Do's and Don'ts

### Do:

- Do 将本规范限定于 `/society/`，其他路由继续沿用其独立视觉系统。
- Do 保持七节点选择、地标、动线、档案与模型选区同步。
- Do 保留照片来源、原始二维码及系统运维左右暂定说明。
- Do 区分剖视顶棚偏好与室内自动显示顶棚，保持工具状态随场景模式更新。
- Do 保留键盘焦点、减少动态效果、照片对照和无 WebGL 内容回退。

### Don't:

- Don't 将示意尺寸、十间模型房间或设备重复数用作实测数据和资产台账。
- Don't 将本期导览表述为实时监测或精确测绘复原。
- Don't 恢复旧版五节点园区、园区道路、交通流和协同连线作为当前页面主体。
- Don't 重新绘制既有二维码或以生成式图片冒充现场照片。
