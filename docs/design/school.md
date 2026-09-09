# 数字孪生智慧校园

- Surface: `/school/`
- Mode: Experience
- Implementation: Astro static page + Three.js, independent from `/society/`.
- User direction: a recognizable digital twin of the actual Qingyang Vocational and Technical College campus, based on the supplied 720yun tour; homepage dropdown entry “数字孪生智慧校园”. Preserve the existing deep navy and mint interaction language.
- First viewport: the campus model leads. White teaching buildings, lake, twin entry arches and west sports facilities occupy the main stage; an indexed landmark directory sits left and source-backed details sit right. Full-width panorama thumbnails connect the model to recorded places.
- Signature interaction: select a named building to move the camera toward its model, then enter its corresponding authentic panorama. Buildings without their own interior source use a directed aerial view. Panorama-to-panorama hotspots and the 39-scene catalogue permit continuous exploration.
- Motion: manual eased camera travel remains available; the showcase is now an authored 180-second, ten-chapter tour for a 16:9 departmental recording. Reduced motion uses immediate manual changes and fixed cinematic chapter poses. The visibility handler pauses playback and the renderer skips hidden-document work; native hidden-tab behavior was not directly observed in automation.

## Sources and boundaries

Primary: https://www.720yun.com/vr/fb72cc8fjus — “庆阳职业技术学院VR全景智慧校园”, public tour version 332, 39 scenes / 8 categories, accessed 2026-09-09. Building names, scene assignments, initial views and navigation hotspots come from this source. Only the necessary public scene metadata is preserved in `src/data/campus-panorama.json`; third-party player code, author contact details and dated institutional statistics are excluded.

Plan: the tour’s own sandBox overview image, `https://media-t.720static.com/e0a219f6wn6/image/ddf454e983aad267862056778bf697a6v5.png`. The modeled long rectangular plot has west on 庆化大道 and east on 长庆大道. East entrance and lake, central 臻善楼, north/south teaching wings and west sports zone follow this reference.

Secondary: official college 2026-09-04 new-student guide, https://www.qyvtc.cn/info/1097/70132.htm; campus aerial photograph `https://www.qyvtc.cn/__local/B/89/79/EBF12086C00C80A70E520A88113_EAC417B8_99CFE.jpg`. It supports visible facade, gateway, lake and planting character. The 2024 official aerial series https://www.qyvtc.cn/info/1108/40972.htm was a supplementary facade reference. Different capture dates are not assumed to be a synchronized current survey.

Model footprints, heights, road widths, trees, furniture, lighting, and repeated windows are visual approximations. No measured GIS/BIM, operational telemetry, current room inventory, live occupancy or real energy statistics were supplied. Night mode is a lighting preview. White-box spaces do not imply verified building functions: the page retains neutral building labels where the source does not establish a function. 宿舍 panorama is a life-area reference; its precise room/building match is not confirmed. 原全景的“知行楼”与“笃行楼”热点指向同一室内场景，因此知行楼采用航拍定位，避免把室内归属当作已核验事实。

Panoramas are locally optimized WebP cube faces from the supplied public tour. Six faces for requested panoramas are loaded on demand or prefetched into a two-cube cache; inactive cubes are disposed on eviction. A separate source aerial texture remains as GroundedSkybox context, in addition to this panorama cache. The projected source suppresses near-ground photographic detail and retains only distant context/sky. This is a recorded visual guide, not a live feed. The original tour and official photo sources remain accessible in the interface.


## Implemented visual system

The surface keeps its own `school` CSS scope and tokens. Deep navy background (`#081522`), blue panels (`#0d2030`), pale text (`#eaf3f6`), muted text (`#a3bbc8`) and mint interaction accent (`#8be0cd`) support a pale architectural model, green planting, teal lake and terracotta running track. This is a code-led extension of the user-confirmed navy/mint direction, independent from the photo-based indoor system at `/society/`.

The page uses locally hosted Noto Sans SC, followed by PingFang SC, Microsoft YaHei and sans-serif. `public/fonts/school/noto-sans-sc-campus.woff` is a variable 100–900 weight WOFF subset of all current campus copy and printable ASCII, loaded through `@font-face` with `format('woff')` and `font-display: swap`; source and SIL OFL 1.1 details remain in the adjacent README.md and OFL.txt. The font family is applied only to `.school-page`; new campus text may require a subset refresh.

The detail panel starts directly with its h2, followed by description and photograph. Source category appears below the photograph in figcaption after the source caption, rather than as an eyebrow above the heading. Local scene thumbnails and the official aerial remain photographic evidence, distinct from the approximate 3D model.

## Layout and responsive reflow

Desktop above 900px uses an app height of `max(800px, 100svh)` with fixed-height header, gallery and footer surrounding a flexible three-column workspace. Columns are 220px / flexible stage / 278px; at 1800px or wider they become 250px / flexible / 310px, and at 1200px or narrower 180px / flexible / 235px. Sidebar directory and detail panel scroll independently. The header is 86px high.

At 601–900px the directory and 620px-high scene remain side by side; detail content moves below across two columns, with its photo on the right. At 600px and below the flow is 88px header, 490px stage, searchable directory, detail, horizontal panorama gallery and footer. Directory groups wrap into two columns; gallery thumbnails remain horizontally scrollable and desktop previous/next arrows are hidden. The gallery is not a fixed seven-item dock: it contains all 39 scenes, filtered by the eight source categories, with scroll-snap proximity and selected-state borders.

The main header title is 25px / 600 on desktop, 22px below 1200px, 19px below 900px and 18px on phones. Detail headings are 25px / 500, compact desktop 22px and phone 25px; body is 12px with 1.95 line height, rising to 13px on wide screens and phones. Interface controls and source captions use smaller roles. Most components have 4–8px corners, subtle 1px borders and local shadows; source captions stay part of the photo group.

## Interaction and accessibility contract

- The top segmented control uses `aria-pressed` to distinguish campus and panorama modes. Campus labels disappear in panorama mode; panorama hotspots disappear in campus mode. Top-view, night control and compass are hidden in panorama mode.
- Named directory buttons are the keyboard alternative to clicking the 13 model landmarks. Search matches names, group, description and features, hides empty groups and shows an explicit no-results message. Model labels use `tabIndex=-1` because the named directory supplies the keyboard route.
- The selected building updates model highlight, directory state, detail copy and corresponding source preview. Unsupported interior assignments open a directed aerial panorama; the action text says “在航拍中查看”. Panorama mode changes the detail action to “回到三维校园”.
- The 39-scene gallery uses original source categories and updates the visible count. All scene buttons carry selected state; source hotspots link only to scenes available in the local catalogue. Label-only hotspots remain noninteractive text.
- The canvas is focusable. In panorama mode arrow keys change view and + / - change zoom; mouse/touch drag and wheel remain supported. Interface focus uses a 2px mint outline with 4px offset. Search/select fields, buttons and source disclosure retain native semantics; loading uses `role=status` and `aria-busy`, and scene transitions or failures have a status announcement.
- Model camera travel lasts 1050ms with quartic ease-out. Reduced-motion users receive immediate model camera changes, nonanimated loading and non-smooth gallery/scroll movement. User-selected orbit controls retain their input damping. The optional showcase now follows the 180-second ten-chapter sequence below, replacing the earlier 6.5-second catalogue cycling. The visibility handler pauses playback; rendering work is skipped while the document is hidden.
- Cube faces load for requested or prefetched panoramas. Stale asynchronous requests cannot overwrite a later selection. The panorama cache retains at most two completed cube textures and disposes inactive textures on eviction; the source aerial texture for GroundedSkybox is retained separately; its near-ground photo detail is masked. Top and bottom faces were rotated 180 degrees during local preparation for the Three.js convention. The original 275 panorama/aerial WebP files each have provenance JSON; new material and photo-atlas assets have separate source records, including the original asset address and transformation notes.
- If WebGL cannot start, the official aerial and information remain visible with a retry and original-tour link; 3D-only controls are disabled. Fullscreen is hidden when unsupported. This fallback does not claim equivalent local interactive panorama capability.

## Verification record

The local `.impeccable/review-school/qa.json` records homepage navigation, all 39 scene loads, all eight category filters, drag rotation, zoom and keyboard operation, with empty error/failure lists. Those records describe the earlier manual-exploration surface. Current cinematic captures are maintained in `.impeccable/review-school-cinematic/` after the high-resolution atlas rebuild. This documentation pass uses the final source code as its visual and semantic authority; it does not assert live deployment or measured campus fidelity.


## Cinematic recording surface

The user confirmed an approximately three-minute loop for recording on a departmental leadership-visit display, with a 16:9 campus-and-training-room composition. `.impeccable/review-school-cinematic/direction.md` records the source-led direction. The default navy/mint manual exploration remains; showcase mode makes the stage fill the viewport and hides the directory, detail, gallery, header, model labels and hotspots. White Chinese captions and restrained warm-gold chapter/progress accents take their place. This fills the available viewport rather than generating or enforcing a 16:9 video file.

Institution and caption placement stays within the recorded 5% left/right safe margins. Institution is at 5.5% from the top, chapter captions at 11% from the bottom and the one-pixel progress line at 5%. Caption h2 uses `clamp(26px, 3.2vw, 110px)`, weight 500, line-height 1.4 and letter spacing .09em; the supporting line uses weight 300. At 600px and below the title becomes 24px and shifts upward to 18% bottom. The setup panel is at most 570px / 90vw, with a 94svh scrolling limit. A quiet vertical scrim and short fades keep captions readable over both model and source panoramas.

| Time | Chapter | Image basis |
| --- | --- | --- |
| 0–16s | 东校门 | Photo-referenced model |
| 16–36s | 毓秀湖 | Photo-referenced model |
| 36–58s | 臻善楼 | Official-photo facade atlas on model |
| 58–72s | 图书馆 | Photo-referenced model |
| 72–96s | 尚能楼 · 教学实训 | Reframed model approach to 尚能楼 |
| 96–114s | 东数西算机房 | Recorded scene 4962283 |
| 114–130s | 工业机器人综合实训平台 | Recorded scene 3896767 |
| 130–146s | 智能制造创新创业实训区 | Recorded scene 3907000 |
| 146–162s | 智能家居实训区 | Recorded scene 3918057 |
| 162–180s | 校园收束 | Model flight returning toward the opening |

The four featured panorama cubes have 1800 × 1800 pixel faces. Model travel uses Catmull–Rom camera/target curves; panorama chapters use slow yaw and modest FOV change, with 1.1-second boundary fades and 1.2-second model/panorama transitions. Reduced motion uses a fixed viewpoint for each chapter, fixed panorama pose and no evolving water animation; the sequence and short boundary fades remain.

Before enabling Start, the setup waits for materials and the context environment, fetches all 24 featured panorama faces into the browser cache and preloads the first panorama cube. A three-second countdown precedes the 180-second timeline. Loop and fullscreen are checked by default. Pause/resume, restart, a 0–180-second range control, Space, R and Esc are implemented; a load failure pauses and provides retry/exit feedback. The preparation dialog contains Tab focus and makes the underlying canvas inert until playback. Starting, clicking Continue or clicking Restart moves focus back to the canvas so playback controls can auto-hide; leaving fullscreen through the native browser also exits the tour when the tour owns that fullscreen session. Touch, mouse movement or focus reveal controls; when playing, controls auto-hide after 2200ms unless focused. Hidden-document handling pauses and cancels countdown, requiring Continue on return. This event handler was tested with controlled hidden state; the automation environment forced document visibility during attempted native tab hiding.

## Material provenance and fidelity

Official-photo atlases are derived from the 2024-10-10 college aerial series, https://www.qyvtc.cn/info/1108/40972.htm. The exact aerial-14 original is https://www.qyvtc.cn/__local/1/B5/50/A79387A6965C628BD894A0AD490_673211A3_12A3A81.jpg (8064 × 6048), rather than the 2048px article preview. Crops supply `campus-wall.webp`, eight `campus-window-*` variations, `campus-curtain-wall.webp` and `campus-facade-wing.webp`. The two 臻善楼 wings now share a continuous seven-floor-scale photo grid. The repeating unit uses an inter-floor plaster strip from the same photograph instead of its roof ledge; windows and mullions retain source pixels. This remains an approximate modeling atlas rather than a documentary photograph or measured seven-floor survey. These official source photos keep their own provenance; no CC0 license is inferred for them.

Poly Haven CC0 1.0 sources supply white-plaster normal/roughness maps, concrete pavement, asphalt, grass/rock, willow bark, tree_small_02 photographed leaves, fir_sapling_medium photographed needles, and kloppenheim_05_puresky HDR lighting. Credits and original download addresses are in `public/images/school/materials/sources.json`; per-file JSON records transformations. Leaf/needle WebP keeps source alpha (1024 × 1024, four channels), used with alpha testing on instanced geometry. The directory contains 27 WebP raster assets with individual provenance JSON; the HDR illumination resource is credited separately in sources.json. Trees and branch placement remain modeled approximations, not a surveyed tree inventory. The HDR supplies environment illumination/reflections; the fully loaded model uses the source aerial texture through GroundedSkybox projection, with near-ground photographic details masked so only distant surroundings and sky remain. Unnamed, approximate surrounding building masses and roads bridge the model edge; they are not surveyed or assigned verified building identities. This avoids presenting a second oversized photographic campus below the model.

World-space material mapping, photo facade/window variation and real leaf silhouettes increase source resemblance. Roof shape/material, lake geometry and reflective water, repeated windows, vehicle placement and lighting remain approximate. The combined method is neither measured GIS/BIM nor photogrammetry and contains no live telemetry claim. Photo capture dates remain distinct.

## Cinematic validation boundary

The 181-second real-time run established loop behavior. Browser runs at 1080p and 4K have been measured; the latest rebuilding checks are recorded in `.impeccable/review-school-cinematic/rebuild-verification.json`. This document does not freeze changing FPS values or treat local measurements as a hardware-independent guarantee. The same record confirms forward/backward focus containment, touch control reveal and controlled visibility-handler checks, with zero recorded JavaScript errors. Native hidden-tab behavior was not observed because automation held documents visible. Required viewports and chapter PNGs are maintained with the latest projection, facade and playback corrections. These records do not certify recording quality on the physical departmental display or deployment completion; independent final visual review is separate.

The local WOFF subset was regenerated for current cinematic captions, setup and playback copy. It retains weights 100–900; the old fixed 498-character coverage statement is superseded. Font provenance remains `public/fonts/school/README.md` and `OFL.txt`.
