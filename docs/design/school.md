# 数字孪生智慧校园

- Surface: `/school/`
- Mode: Experience
- Implementation: Astro static page + Three.js, independent from `/society/`.
- User direction: a recognizable digital twin of the actual Qingyang Vocational and Technical College campus, based on the supplied 720yun tour; homepage dropdown entry “数字孪生智慧校园”. Preserve the existing deep navy and mint interaction language.
- First viewport: the campus model leads. White teaching buildings, lake, twin entry arches and west sports facilities occupy the main stage; an indexed landmark directory sits left and source-backed details sit right. Full-width panorama thumbnails connect the model to recorded places.
- Signature interaction: select a named building to move the camera toward its model, then enter its corresponding authentic panorama. Buildings without their own interior source use a directed aerial view. Panorama-to-panorama hotspots and the 39-scene catalogue permit continuous exploration.
- Motion: eased camera travel, orbit/zoom, deliberate optional touring. Reduced motion makes model camera changes immediate; no animation is required to reveal interface content. Background tabs suspend rendering and stop touring.

## Sources and boundaries

Primary: https://www.720yun.com/vr/fb72cc8fjus — “庆阳职业技术学院VR全景智慧校园”, public tour version 332, 39 scenes / 8 categories, accessed 2026-09-09. Building names, scene assignments, initial views and navigation hotspots come from this source. Only the necessary public scene metadata is preserved in `src/data/campus-panorama.json`; third-party player code, author contact details and dated institutional statistics are excluded.

Plan: the tour’s own sandBox overview image, `https://media-t.720static.com/e0a219f6wn6/image/ddf454e983aad267862056778bf697a6v5.png`. The modeled long rectangular plot has west on 庆化大道 and east on 长庆大道. East entrance and lake, central 臻善楼, north/south teaching wings and west sports zone follow this reference.

Secondary: official college 2026-09-04 new-student guide, https://www.qyvtc.cn/info/1097/70132.htm; campus aerial photograph `https://www.qyvtc.cn/__local/B/89/79/EBF12086C00C80A70E520A88113_EAC417B8_99CFE.jpg`. It supports visible facade, gateway, lake and planting character. The 2024 official aerial series https://www.qyvtc.cn/info/1108/40972.htm was a supplementary facade reference. Different capture dates are not assumed to be a synchronized current survey.

Model footprints, heights, road widths, trees, furniture, lighting, and repeated windows are visual approximations. No measured GIS/BIM, operational telemetry, current room inventory, live occupancy or real energy statistics were supplied. Night mode is a lighting preview. White-box spaces do not imply verified building functions: the page retains neutral building labels where the source does not establish a function. 宿舍 panorama is a life-area reference; its precise room/building match is not confirmed. 原全景的“知行楼”与“笃行楼”热点指向同一室内场景，因此知行楼采用航拍定位，避免把室内归属当作已核验事实。

Panoramas are locally optimized WebP cube faces from the supplied public tour. Six faces for the selected panorama are loaded on demand; replacing a panorama disposes the previous GPU texture. This is a recorded visual guide, not a live feed. The original tour and official photo sources remain accessible in the interface.


## Implemented visual system

The surface keeps its own `school` CSS scope and tokens. Deep navy background (`#081522`), blue panels (`#0d2030`), pale text (`#eaf3f6`), muted text (`#a3bbc8`) and mint interaction accent (`#8be0cd`) support a pale architectural model, green planting, teal lake and terracotta running track. This is a code-led extension of the user-confirmed navy/mint direction, independent from the photo-based indoor system at `/society/`.

The page uses locally hosted Noto Sans SC, followed by PingFang SC, Microsoft YaHei and sans-serif. `public/fonts/school/noto-sans-sc-campus.woff` is a variable 100–900 weight WOFF subset of all current campus copy and printable ASCII (498 current characters), loaded through `@font-face` with `format('woff')` and `font-display: swap`; source and SIL OFL 1.1 details remain in the adjacent README.md and OFL.txt. The font family is applied only to `.school-page`; new campus text may require a subset refresh.

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
- Model camera travel lasts 1050ms with quartic ease-out. Reduced-motion users receive immediate model camera changes, nonanimated loading and non-smooth gallery/scroll movement. User-selected orbit controls retain their input damping. Optional tours advance every 6500ms: the model tour follows a nine-stop route; the panorama tour follows the currently visible gallery. Explicit selections and backgrounding stop the tour. Rendering work is skipped while the document is hidden.
- Cube faces load only for the requested panorama. Stale asynchronous requests cannot overwrite a later selection; old GPU cube textures are disposed when replaced. Top and bottom faces were rotated 180 degrees during local preparation for the Three.js convention. The 275 WebP files each have provenance JSON, including the original asset address and transformation notes.
- If WebGL cannot start, the official aerial and information remain visible with a retry and original-tour link; 3D-only controls are disabled. Fullscreen is hidden when unsupported. This fallback does not claim equivalent local interactive panorama capability.

## Verification record

The local `.impeccable/review-school/qa.json` records homepage navigation, all 39 scene loads, all eight category filters, drag rotation, zoom and keyboard operation, with empty error/failure lists. Final visual captures in `.impeccable/review-school/` are being refreshed for local typography and caption placement. This documentation pass uses the final source code as its visual and semantic authority; it does not assert live deployment or measured campus fidelity.
