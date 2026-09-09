import panorama from './campus-panorama.json';
export const campusPanorama = panorama;
export const campusBuildings = [
  { id:'east', name:'东校门', group:'校园风景', x:988,z:251,h:10, scene:3327945, text:'校园东入口。双弧形门廊与中轴道路相接，向内可见毓秀湖及教学楼群。', features:['双弧形门廊','毓秀湖入口','校园中轴'] },
  { id:'lake', name:'毓秀湖', group:'校园风景', x:862,z:242,h:1, scene:4011226, text:'东门内的校园湖景。湖岸、步道与亭廊环绕水面，将图书馆与教学楼群联系在一起。', features:['滨水步道','湖畔亭廊','校园景观'] },
  { id:'zhenshan', name:'臻善楼', group:'校园楼宇', x:731,z:249,h:25, scene:3327940, ath:.312,atv:19.694, text:'毓秀湖西侧的中轴建筑。模型保留白色立面、中央玻璃幕墙、入口台阶与屋顶构架。', features:['中轴建筑','中央玻璃幕墙','外观全景对照'] },
  { id:'library', name:'图书馆', group:'校园楼宇', x:891,z:370,h:23, scene:3327940, ath:-34.075,atv:38.622, text:'位于毓秀湖南侧。模型参照航拍中的转折体量与白色立面；实景入口定位到校园航拍中的图书馆。', features:['湖畔楼宇','转折式体量','外观全景对照'] },
  { id:'shuren', name:'树人楼', group:'校园楼宇', x:694,z:410,h:24, scene:3327940, ath:-27.362,atv:28.862, text:'校园南侧楼宇，与图书馆及臻善楼共同围合前区。可在校园航拍全景中对照其位置。', features:['南侧楼宇','外观全景对照'] },
  { id:'zhixing', name:'知行楼', group:'教学实训', x:876,z:130,h:24, scene:3327940, ath:20.325,atv:31.071, text:'毓秀湖北侧教学楼群。模型保留多翼楼体、竖向窗带与入口构架，位置依据原全景标注。', features:['北侧教学楼群','外观全景对照'] },
  { id:'duxing', name:'笃行楼', group:'教学实训', x:878,z:64,h:22, scene:4051058, category:5, text:'原全景中的笃行楼教学区。可进入书法教室、虚拟幼儿园和舞蹈教室，查看教学空间。', features:['书法教室','虚拟幼儿园','舞蹈教室'] },
  { id:'shangji', name:'尚技楼', group:'教学实训', x:476,z:378,h:24, scene:4962286, category:6, text:'连接建筑、给排水与能源专业实训场景。通过原全景中的六个教学场景查看设备和实训环境。', features:['智慧工地','建筑与给排水','能源专业实训'] },
  { id:'shangneng', name:'尚能楼', group:'教学实训', x:492,z:87,h:24, scene:4962283, category:7, text:'原全景中的尚能楼教学区，涵盖东数西算机房、工业机器人、汽车和焊接实训空间。', features:['东数西算机房','工业机器人','汽车与焊接实训'] },
  { id:'luban', name:'鲁班工坊', group:'教学实训', x:405,z:126,h:9, scene:3907000, category:8, text:'面向实践与创新的实训场景。四个全景分别呈现智能制造、智能家居、电工电子和 PLC 实训。', features:['智能制造','智能家居','电工电子与 PLC'] },
  { id:'yixiu', name:'怡秀苑', group:'校园生活', x:391,z:412,h:23, scene:4962363, text:'原校园航拍标注的生活区建筑。宿舍实景来自原全景生活区分类，具体楼栋与房间未作测绘确认。', features:['校园生活区','宿舍实景参考'] },
  { id:'cuiying', name:'萃英苑', group:'校园生活', x:358,z:56,h:23, scene:3327940, ath:16.278,atv:12.859, text:'原校园航拍标注的北侧生活区建筑。可从空中全景查看其与体育场、实训楼的空间关系。', features:['北侧生活区','外观全景对照'] },
  { id:'stadium', name:'体育场', group:'校园生活', x:201,z:250,h:7, scene:4962280, text:'校园西侧运动空间。模型包含田径跑道、足球场、看台及相邻球场，可切换地面或航拍夜景。', features:['田径跑道','足球场','体育场夜景'] },
];
export type CampusBuilding = typeof campusBuildings[number];
export type PanoramaScene = typeof panorama.scenes[number];
export function sceneTitle(scene: PanoramaScene) { return scene.categoryId===4 ? `思政中心 · ${scene.name}` : scene.name; }
export function sceneThumb(id:number) { return `/images/school/panoramas/${id}/thumb.webp`; }
