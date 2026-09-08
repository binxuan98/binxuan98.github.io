---
name: 智研社数字孪生园区（society 路由）
description: 仅用于 /society/ 的智慧城市概念园区视觉系统
colors:
  twin-accent: "#66e2d2"
  twin-muted: "#90aaba"
  twin-line: "#213845"
  twin-surface: "#0b1924"
  stage-background: "#060e17"
  text-primary: "#deedf3"
  focus-ring: "#a6ffea"
  metric-highlight: "#8df3df"
  connection-gold: "#e9ca8c"
  tag-background: "#15303d"
  tag-text: "#a4d6db"
  control-active: "#183b42"
  control-hover: "#17313f"
typography:
  display:
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: "27px"
    fontWeight: 600
    letterSpacing: "0.08em"
  title:
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.015em"
  body:
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: "12px"
    lineHeight: 1.95
  metric:
    fontFamily: '"Avenir Next", "Segoe UI", sans-serif'
    fontSize: "35px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  label:
    fontSize: "9px"
rounded:
  tag: "2px"
  landmark: "3px"
  icon-button: "4px"
  toolbar: "5px"
spacing:
  inline: "6px"
  compact: "12px"
  panel-inline: "18px"
  workspace: "20px"
components:
  toolbar-button:
    textColor: "{colors.text-primary}"
    rounded: "{rounded.landmark}"
    padding: "6px 12px"
  toolbar-button-active:
    backgroundColor: "{colors.control-active}"
    textColor: "{colors.metric-highlight}"
  toolbar-button-hover:
    backgroundColor: "{colors.control-hover}"
  tag:
    backgroundColor: "{colors.tag-background}"
    textColor: "{colors.tag-text}"
    rounded: "{rounded.tag}"
    padding: "5px 7px"
  dock-item:
    backgroundColor: "{colors.twin-surface}"
    textColor: "{colors.text-primary}"
    padding: "16px 20px"
---
# Design System: 智研社数字孪生园区

## Overview

**Creative North Star: "智研社数字孪生园区"**

本文件仅记录 `/society/` 已实现的视觉系统，不是个人学术网站的全站重设计规范。用户已确认智慧城市数字孪生方向，并要求突出智研社教学、科研和算力。深海蓝工作台承托程序化三维园区，青绿色承担选中反馈，窄边面板组织教学与培养内容。

园区以模型体量、道路、绿化、建筑窗格和协同连线形成可探索空间；它是概念模型，不是真实地理测绘、BIM 复原或实时监测。图像策略为 Three.js 几何场景与既有公众号二维码，未使用生成式图片。以下名称是对已确认方向与真实实现的描述。

**Key Characteristics:**

- 深海蓝背景与低饱和面板，明亮青绿选中反馈。
- 桌面以三维园区为主体，两侧信息面板和五项空间导航互相对应。
- 小圆角、细边线和描边图标，空间模型承担主要景深。
- 降低动态效果与无 WebGL 内容回退均有实现。

本次记录依据：`src/styles/society-twin.css`、`src/pages/society.astro`、`src/components/SocietyTwinScene.astro`、`src/scripts/society-twin.ts`、`src/scripts/society-twin-scene.ts`。具体页面策略见 `docs/design/society.md`，事实边界见 `PRODUCT.md`。本文件记录实现，不独立证明浏览器验收或二维码扫码结果。

## Colors

### Primary

`twin-accent` 为青绿交互色，用于页面顶线、图标、路径节点和状态指示；`metric-highlight` 用于关键数字与已激活工具。`focus-ring` 专用于键盘焦点。

### Secondary

`connection-gold` 是三维场景中算力相关连线粒子与部分交通模型的暖金色，辅助区分空间关系。它不代表告警或实时状态。

### Neutral

`stage-background` 承托全屏舞台；`twin-surface` 用于导航等深色面；`twin-line` 划分信息区域。`text-primary` 用于主要文字，`twin-muted` 用于辅助说明。标签和工具状态使用 frontmatter 中对应的背景与文字配对。

## Typography

中文以系统黑体栈为主，数值采用 Avenir Next / Segoe UI 回退与等宽数字特性。界面紧凑，标题强于说明，数值强于标签；小号英文仅作为辅助识别。

- Display 对应桌面主标题；在窄桌面变为 23px，平板 25px，手机主标题 20px、副标题 17px。
- Title 对应空间档案标题；宽屏增至 23px，手机为 21px。
- Body 对应桌面档案正文；宽屏 14px，手机 13px、行高 1.9，低高度桌面为 11px。
- 面板标题一般为 14px / 500；标签为 9px。实现中的部分辅助说明为 7–10px，不应把该尺寸推广为正文规范。
- Metric 对应概览数字；宽屏 42px、平板 40px、手机 32px，年份单独降低字号以适应长度。

## Layout

桌面容器上限为 2400px，默认高度 100svh，最小高度 800px，横向内边距 26px。内容区使用 252px / 弹性地图 / 280px 三栏及 20px 栏间距。顶部为三列标题栏，底部为五等分导航。两侧面板可独立纵向滚动；地图保持中心主体。

1700px 及以上扩大为 290px / 弹性地图 / 310px，间距 28px。1101–1250px 使用 215px / 弹性地图 / 235px，间距 14px。桌面高度不超过 850px 时，最小高度降为 730px，压缩面板间距与内部节奏。

1100px 及以下采用自然页面高度：地图先占整行（620px 高），面板在下方排两列；导航固定于视口底部。600px 及以下改为地图（485px 高）、空间档案、图层与二维码、概览的单列流；页边距 14px，导航五等分且支持安全区，页尾底部留出 100px 空间。

## Elevation & Depth

主要景深来自真实三维几何、雾效、材质、光照和明暗分层。面板使用深蓝透明渐变与顶部细边线，不采用大幅悬浮阴影。工具栏只有局部轻阴影（`0 8px 24px #02091040`）。地标以投影定位覆盖在场景上，并优先保证选中地标的可辨识性。

三维镜头切换为 1100ms、四次缓出。巡游由用户启动，每 6500ms 切换空间；手动操作终止巡游。减少动态效果偏好下，镜头直接定位，关闭连续旋转及粒子和交通移动，CSS 过渡与加载转圈关闭。巡游的内容切换仍由用户明确启动。

## Shapes

面板以直角和顶部细线构成。小型标签、地标、图标按钮、工具栏依次采用 frontmatter 中对应的小圆角。开关与状态点为圆形语言。图标是细描边 SVG，不采用额外图标字体；三维体块、建筑窗格、道路与绿化构成空间特征。

## Components

- **地图地标**：标题加小号空间类别，深色半透明底与 1px 边框；选中时亮边、青绿底和亮色状态点同步变化。支持 hover 与键盘 focus。
- **场景工具栏**：三维、俯视、巡游、重置成组出现；选中态使用 `aria-pressed`。工具条在地图下方居中；WebGL 回退时禁用无法工作的工具。
- **五项空间导航**：固定五等分，图标、标题与桌面副标题组成入口；当前项同时显示背景、顶线和文字颜色变化。手机省略副标题与箭头，图标位于文字上方。
- **空间档案面板**：由符号、标题、正文、标签与培养价值组成；内容更新使用礼貌播报区域，始终与地标和导航同步。
- **图层开关**：原生 checkbox 配合视觉滑块，焦点描边落在可见开关上；关闭/开启只控制标注或协同连线。
- **公众号二维码**：保留原始二维码文件、白底和完整比例；可打开原图，桌面为 76px，低高度桌面 64px，手机 82px。
- **回退视图**：简洁 SVG 园区线稿与说明代替不可用场景；底部入口仍可阅读全部空间档案。无脚本环境另列全部培养正文。

完整可独立渲染的组件摘录及动效、断点扩展见 `.impeccable/design.json`。摘录用于设计预览，不替代业务交互实现。

## Do's and Don'ts

### Do:

- Do 将本规范限定于 `/society/`；其他路由沿用其独立视觉系统。
- Do 让地标、底部入口和空间档案保持同一个选中项。
- Do 保留原始二维码和概念示意说明。
- Do 在窄屏保留完整正文与固定导航的底部安全空间。
- Do 保持键盘焦点可见，保留减少动态效果与内容回退。

### Don't:

- Don't 将概念建筑、交通与连线表述为真实位置、实时设备或监测数据。
- Don't 用生成式效果图替代当前可操作的几何园区，或重新绘制既有二维码。
- Don't 把地图作为唯一的信息访问入口。
