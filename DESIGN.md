---
name: 庆阳职院数字孪生表面（society 与 school）
description: /society/ 与 /school/ 的独立视觉记录，按路由作用域使用
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
  school-bg: "#081522"
  school-panel: "#0d2030"
  school-line: "#264252"
  school-ink: "#eaf3f6"
  school-muted: "#a3bbc8"
  school-accent: "#8be0cd"
  school-enter: "#a0e8d4"
  school-enter-text: "#082a2c"
  school-mode-active: "#25484d"
  school-mode-text: "#c9ffec"
  school-wall: "#e3e7e3"
  school-water: "#2e9293"
  school-grass: "#416f59"
  school-track: "#b95c54"
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
  school-display:
    fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: "25px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "4px"
  school-title:
    fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: "25px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "1px"
  school-body:
    fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: "12px"
    lineHeight: 1.95
  school-label:
    fontSize: "10px"
    lineHeight: 1.6
rounded:
  landmark: "3px"
  icon-button: "4px"
  toolbar: "5px"
  school-control: "4px"
  school-card: "5px"
  school-input: "6px"
  school-toolbar: "8px"
spacing:
  inline: "6px"
  compact: "12px"
  panel-inline: "18px"
  workspace: "18px"
  school-inline: "7px"
  school-gallery-gap: "12px"
  school-mobile-edge: "16px"
  school-stage-edge: "24px"
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
  school-enter:
    backgroundColor: "{colors.school-enter}"
    textColor: "{colors.school-enter-text}"
    rounded: "{rounded.school-input}"
    padding: "13px 15px"
    width: "100%"
  school-mode:
    rounded: "{rounded.school-control}"
    padding: "9px 14px"
  school-mode-active:
    backgroundColor: "{colors.school-mode-active}"
    textColor: "{colors.school-mode-text}"
  school-search:
    backgroundColor: "#081724"
    textColor: "{colors.school-ink}"
    rounded: "{rounded.school-input}"
    padding: "10px 8px"
  school-tag:
    textColor: "#c9dfe3"
    rounded: "{rounded.school-control}"
    padding: "5px 8px"
  school-nav:
    rounded: "{rounded.school-card}"
    padding: "9px 10px"
---

# Design System: 庆阳职院数字孪生表面

## Overview

本文件并列记录两个独立表面。既有 tokens 与下述一期基地文字保持 `/society/` 作用域；所有 `school-*` tokens 和标为 `/school/` 的段落仅用于智慧校园。两者不覆盖个人学术网站其他页面。

### /society/ · 一期基地

**Creative North Star: "照片参照的一期空间导览"**

本段及既有无 school 前缀的 tokens 仅适用于 `/society/`。深海蓝数字孪生外壳承托一期基地的线性楼层剖视，青绿色反馈帮助参观者在七个导览节点、模型选区和照片档案之间建立对应。用户本期要求以现场照片与已确认走廊顺序建模，原有五节点概念园区已被替换。

空间身份来自真实照片可见的白蓝设备、木色长桌、蓝帘、透明布线通道与大厅发光展柱。十间模型房间为示意排布，尺寸、设备重复数未经实测，系统运维左右关系暂定。界面同时提供十张真实照片对照；原始公众号二维码继续保留，未使用生成式图片。

**Key Characteristics:**

- 深海蓝界面与青绿色选中反馈。
- 线性中轴走廊连接七个导览节点，剖视与近景/室内相互切换。
- 白蓝设备、木色桌面、透明蓝绿布线与现场照片形成辨识特征。
- 手机七项导航横向滚动，内容与照片仍可完整阅读。

依据为 `src/pages/society.astro`、`src/data/base-phase-one.ts`、`src/styles/society-twin.css`、`src/components/SocietyTwinScene.astro` 及两个 `society-twin` 脚本。页面方向见 `docs/design/society.md`，照片映射与事实边界见 `docs/design/base-phase-one-evidence.md`。本文件按代码记录实现，不独立证明测绘、设备清点或硬件验收。


### /school/ · 数字孪生智慧校园

**Creative North Star: "从校园模型走进真实全景"**

智慧校园沿用用户确认的深海蓝与薄荷青绿界面，在 13 处可辨识地标组成的三维校园与 39 个原始记录全景之间建立可直接操作的对应。白色楼群、毓秀湖、双弧形东门和西侧体育场构成场景主体，目录与档案提供清楚的地名和来源。

实际建筑位置与外观参考原 720yun 全景、导览图和学院官方航拍，体量、树木、家具、灯光和比例仍为展示近似。缺乏室内来源的建筑使用定向航拍，不能因模型可点击便推断其内部功能。全景与夜景均不代表实时状态。

来源地址、版本及拍摄边界保留于 `docs/design/school.md`，本期数据见 `src/data/campus.ts` 和 `src/data/campus-panorama.json`。

## Colors

**/society/ · 一期基地（既有规范）**

### Primary

`twin-accent` 是选中与方向提示的青绿；`source-highlight` 用于照片来源提示与工具激活文字。`focus-ring` 专用于键盘焦点。空间入口按钮使用 `enter-background` 与 `enter-text` 配对。

### Secondary

照片参照的材料色包括 `equipment-blue`、`curtain-blue`、`room-wood`、`wire-blue` 和 `wire-green`。`glass-floor` 配合材质透明度呈现布线通道；`route-warm` 用于场景中的暖色提示。材质颜色是模型基础色，会受光照与透明度影响，不等同于照片色彩测量结果。

### Neutral

`stage-background` 承托工作台，`twin-surface` 组织导航，`twin-line` 分隔面板。`text-primary` 与 `twin-muted` 区分主要与辅助文字。`room-wall`、`room-white` 为室内浅色墙面、桌架和设备主体，使室内造型与深色外壳分开。


### /school/ · 独立色板

Primary 为 `school-accent`，承担焦点与选中反馈；实景入口使用更明亮的 `school-enter` 与深色 `school-enter-text` 配对，模式选中使用 `school-mode-active` 与 `school-mode-text`。Neutral 为 `school-bg`、`school-panel`、`school-line`、`school-ink`、`school-muted`，分别组织全页、两侧面板、边界、正文和辅助文字。

Secondary 是模型中的 `school-water`、`school-grass` 与 `school-track`，共同区分湖面、绿化和跑道；`school-wall` 是浅色建筑基色。模型色受材质、光照与色调映射影响，不是建筑涂料的测量值。日夜切换只改变灯光与模型发光效果，不给来源全景添加虚构运行含义。

## Typography

**/society/ · 一期基地（既有规范）**

中文采用 PingFang SC / Microsoft YaHei 系统黑体栈。主标题默认 23px / 600、字距 .025em；宽屏为 27px，低高度桌面为 20px。手机主标题 17px、副标题 12px 且换行显示，行高 1.5。

空间档案标题默认 20px / 500，低高度桌面 18px、手机 21px。档案正文默认 11px / 1.9，宽屏 13px、手机 12px。位置说明为 10px 青绿辅助文字。左侧动线标题默认 12px，手机 13px；照片说明为 9px / 1.6。7–10px 的次级文字仅承担方向与来源提示，正文层次按上述角色保持。


### /school/ · 本地中文字体

校园使用独立的 Noto Sans SC / PingFang SC / Microsoft YaHei 字体栈。字体文件为 `public/fonts/school/noto-sans-sc-campus.woff`，保留可变字重 100–900，覆盖交付时全部校园文本和可打印 ASCII（当前共 498 个字符），以 WOFF 格式通过 `format('woff')` 和 `font-display: swap` 本地加载。字体来源与 SIL OFL 1.1 许可在相邻 README.md、OFL.txt；样式只施加于 `.school-page`，不会改动 `/society/`。新增文字后需使子集覆盖与页面保持一致。

校园主标题默认 25px / 600，字距 4px；1200px 以下为 22px、900px 以下 19px、手机 18px。详情标题为 25px / 500 / 1.4，紧凑桌面 22px、手机恢复 25px。正文默认 12px / 1.95，宽屏与手机 13px。10px 来源说明置于照片下方，不在详情标题上叠加小字眉题。39 个实景与 8 个分类使用等宽数字特性，表达来源目录数量。

## Layout

**/society/ · 一期基地（既有规范）**

桌面容器上限 2400px，默认 100svh、最小高度 800px、横向内边距 26px。当前三栏为 235px / 弹性场景 / 305px，间距 18px；两侧可滚动，中央模型为主体。1700px 以上三栏扩大为 260px / 弹性场景 / 330px。桌面高度不超过 850px 时最小高度 730px，三栏为 220px / 弹性场景 / 275px，顶部高度 80px，照片高度 130px。

1100px 及以下采用自然页面高度，720px 高地图先占整行，面板在下方排两列，七项导航固定于底部。600px 及以下为地图、照片档案、图层与二维码、概览动线的单列流；地图高 650px、页边距 14px、顶部高 112px。底部导航使用七项 `minmax(68px, 1fr)` 横向滚动，页尾预留 105px 并支持安全区。

照片桌面高度 160px，宽屏 190px，平板 230px，采用裁切填充；手机 210px 并使用完整包含显示。照片均可打开原图。


### /school/ · 校园三栏与全景目录

900px 以上使用 `max(800px, 100svh)` 整页工作台；86px 顶栏、底部全景目录及页脚不压缩，三栏工作区弹性占用剩余高度。默认栏宽 220px / 弹性舞台 / 278px，1800px 以上为 250px / 弹性 / 310px，1200px 以下为 180px / 弹性 / 235px。地标目录与详情独立滚动。这里不使用一期基地的七项固定 dock。

601–900px 为左侧 180px 目录与右侧 620px 高舞台，详情另占下一整行并排正文和照片。600px 以下顺序为 88px 顶栏、490px 场景、两列分组地标目录、详情、可横向滚动的全景缩略图和页脚。全景卡片默认宽 155px、图片高 85px；手机为 142px / 80px。目录按 8 个来源分类筛选，始终有全部场景入口。

## Elevation & Depth

**/society/ · 一期基地（既有规范）**

界面主要由深蓝半透明面板、顶部细线和局部工具栏阴影（`0 8px 24px #02091040`）构成。空间景深由 Three.js 几何、浅色墙体、木桌、蓝帘、透明地板、设备、光照与材料表现。

剖视保留整条走廊及房间选区；近景/室内只显示当前所属空间。入口为专用外部近景；成果展示中心采用 3.25 模型单位高的机位以越过沙盘；普通室内视点为 1.9 模型单位，以上均是场景参数，不是实测高度。室内自动显示所属顶棚与灯具，大厅呈现格栅顶与蓝色发光展柱。

镜头过渡为 1100ms 四次缓出。巡游由用户启动，每 6500ms 切换节点，保持自动旋转关闭；手动操作中止巡游。减少动态效果时镜头直接定位，CSS 过渡和动画关闭。无旧园区交通流或协同粒子动画。


### /school/ · 模型与真实全景

校园模型使用有阴影的几何体、浅色建筑、蓝绿湖面和树木形成尺度关系。实际三维体量承担深度，面板以边框和色阶分层；地标使用 `0 4px 10px #02121a40` 小投影，加载提示使用 `0 8px 35px #00101b66`，不将大阴影施加于所有卡片。

模型镜头切换为 1050ms 四次缓出，减少动态效果时立即定位；手动轨道控制保留输入阻尼。巡游由用户开启，每 6500ms 推进：校园沿九处预设停靠点，全景沿当前过滤后的目录。显式选择与后台切换停止巡游；文档隐藏期间跳过场景渲染工作。全景一次加载选中场景的六面纹理，替换后释放旧纹理；过期加载不覆盖更新的选择。上下面资产在准备时旋转 180 度，以匹配 Three.js 坐标约定。

## Shapes

**/society/ · 一期基地（既有规范）**

面板以直角、顶部细线与描边图标组成。地标、照片、入口按钮和照片切换按钮采用 3px 小圆角；工具栏为 5px。路线编号为 23px 圆形，沿竖线连接。透明通道与蓝绿线缆、白蓝设备、穿孔物联网实训架和大厅格栅柱面为当前空间形态特征。


### /school/ · 小圆角工具与可读地标

小型控件与标签 4px、地标目录行与缩略图 5px、搜索及照片及主按钮 6px、模式和工具组 8px。图标采用 1.6 描边 SVG；模型地标用竖短线连接空间位置，来源全景热点用圆点加文字按钮。模型以长条校园、白色多翼建筑、双弧东门、湖岸、跑道和球场建立识别，不借用一期室内模型的房间动线。

## Components

**/society/ · 一期基地（既有规范）**

- **七项导航与动线列表**：对应入口、成果展示、软件技术、中门大厅、大数据技术、系统运维、人工智能；左侧动线、地标和底部导航同步显示选中项。
- **场景地标**：标题和方位说明带引导线连接模型；桌面宽度上限 160px，手机 130px。室内模式隐藏地标以让出视野。
- **空间档案**：标题、方位、正文、现场照片、可见特征及进入按钮；有多张照片时提供视角切换，照片含来源说明并能打开原图。保留运维左右暂定措辞。
- **进入空间按钮**：全宽青绿深底按钮；入口切换外部近景、展厅切换较高近景、其他节点切换室内视角，窄屏滚回场景位置。
- **模式工具栏**：剖视、俯视、巡游和重置；`data-mode` 为 overview / top / interior，`twin-mode` 事件同步 `aria-pressed`。overview 选中剖视，top 选中俯视，interior 时两者均不选中。切换剖视/俯视退出室内，并将标题同步为“一期空间总览”或“一期空间总览 · 俯视”；重置回到总览。
- **图层开关**：空间名称、透明通道与布线、剖视显示顶棚。室内自动显示当前顶棚，不由剖视顶棚偏好关闭；回到非室内后按保存的开关偏好显示。
- **二维码**：使用既有原文件与白底，保持比例，提供原图入口。
- **回退**：WebGL 不可用时保留七节点文字与照片导览，禁用三维工具和进入按钮；无脚本时提供所有空间正文。

`.impeccable/design.json` 提供独立设计预览片段及断点、动效扩展；预览片段不替代业务交互。


### /school/ · 校园专属组件

- **搜索与分组目录**：13 地标分成教学实训、校园楼宇、校园风景、校园生活四组。搜索匹配名称、组、描述和特征；空结果有提示。此四组目录不是全景的八个来源分类。
- **模式分段控件**：campus 与 panorama 用 `aria-pressed` 同步；全景中隐藏模型标签、俯视、夜景和罗盘，校园中隐藏全景热点。
- **详情与照片**：直接从 h2 开始，正文后为照片；拍摄来源及分类放在 figcaption 中。主按钮按上下文显示进入实景、在航拍中查看或回到三维校园。无确认室内来源的建筑定向至航拍位置；来源歧义保留在文案中。
- **全景目录**：39 张缩略图与八分类筛选，可横向滚动和选中定位；桌面左右翻组按钮在边缘禁用，手机改为直接滑动。场景间热点遵守来源导航，只有本地目录存在的目标才成为可点按钮。
- **画布与焦点**：画布可聚焦，全景方向键环视、+ / - 缩放；所有地标都有目录键盘入口，模型浮动标签不重复进入 Tab 次序。控件使用 2px 薄荷色焦点、4px 外偏移。输入、下拉、按钮、来源 details 保留原生语义，加载与结果通过状态区域和 `aria-busy` 提示。
- **回退与来源**：无法启动 WebGL 时保留官方航拍、文本与原全景链接，提供重试，禁用三维工具。全屏不被支持时隐藏入口。旧场景异步请求不会覆盖新选择。原 tour 和官方图片来源保持可访问。

## Do's and Don'ts

**/society/ · 一期基地（既有规范）**

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

### /school/ · 独立边界

- Do 保持校园模型、来源全景和一期室内基地为明确的独立表面，通过导航连接。
- Do 保留原来源链接、39 场景/8 分类目录和每个本地 WebP 的来源记录。
- Do 以地标目录提供键盘访问，以图下注明来源和类别。
- Don't 将模型尺寸、树木数量、夜间灯光或全景存档视作测绘、实时遥测或当前资产台账。
- Don't 为没有室内来源的建筑虚构内部全景或确认楼栋用途。
