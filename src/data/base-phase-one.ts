/** Names and longitudinal order confirmed by the user on 2026-09-09.
 * Local geometry is scaled from photos; dimensions and repeat counts are illustrative.
 * x < 0 is the visitor's left when entering from positive z and walking toward negative z.
 */
export const baseSpaces = [
  { id:'entrance', shortTitle:'基地入口', title:'东数西算·数字经济人才培养基地', icon:'city', location:'参观起点', text:'白色门头、玻璃双入口与门前连椅。由这里进入一期项目，沿中央走廊依次探索展示与实训空间。', tags:['白色立面','玻璃入口','基地门头'], photos:[{src:'entrance',caption:'基地入口 · 本次上传照片'}], features:['按现场门头保留基地名称','双开玻璃门与入口雨棚','灰色墙裙、门前连椅与绿植'], anchor:[0,3,63], color:0x7de3d1 },
  { id:'exhibition', shortTitle:'成果展示', title:'成果展示中心', icon:'lab', location:'进入基地后 · 左侧', text:'入口左侧为成果展示中心。依据一期项目资料，重建展示大屏、墙面展板、互动沙盘与交流桌，呈现成果展示空间。', tags:['成果大屏','互动沙盘','展示墙'], photos:[{src:'exhibition-model',caption:'成果展示沙盘 · 一期项目资料'},{src:'exhibition-panorama',caption:'展厅全景 · 一期项目资料'}], features:['展示大屏与蓝白展墙','桌面道路沙盘及模型车辆','交流桌与成果展台'], anchor:[-11,4,48], color:0xe7c17c },
  { id:'software', shortTitle:'软件技术', title:'软件技术实训中心', icon:'book', location:'入口右侧；继续向前的左右两侧', text:'由入口右侧的软件技术实训室向前，走廊两侧仍为软件技术实训空间。按照片保留双侧长桌、计算机工位和中央透明布线通道。', tags:['双侧计算机工位','透明布线通道','蓝色窗帘'], photos:[{src:'software-room',caption:'软件技术实训空间 · 本次上传照片'},{src:'software-event',caption:'创业创新大赛现场 · 本次上传照片'}], features:['木色长桌与黑色显示器','中央透明地板下的蓝绿线缆','蓝色窗帘、白色座椅与教学屏'], anchor:[10,4,30], color:0x76c8ec },
  { id:'lobby', shortTitle:'中门大厅', title:'中门大厅', icon:'layers', location:'软件技术实训区之后', text:'软件技术实训区与大数据实训区之间的中门大厅。依据本次上传照片，还原蓝色发光展柱、格栅顶棚和灰色石材地面。', tags:['发光展柱','格栅顶棚','中央公共空间'], photos:[{src:'lobby',caption:'大厅发光展柱 · 本次上传照片'}], features:['双列蓝色发光展柱','立柱下部线路纹样','灰色石材地面与入口花台'], anchor:[0,4,11], color:0xb1a4ef },
  { id:'bigdata', shortTitle:'大数据技术', title:'大数据技术实训中心', icon:'chip', location:'中门大厅之后 · 左右两侧', text:'穿过中门大厅，左右两侧为大数据技术实训中心。以资料中的长条形实训室为参考，重建计算机双排布置、教学端和透明布线通道。', tags:['双侧长桌','数据实践','布线通道'], photos:[{src:'bigdata',caption:'大数据实训空间 · 一期项目资料'}], features:['两侧连续计算机工位','木色桌面、白色桌架与方凳','教学屏、蓝帘与透明地板'], anchor:[0,4,-8], color:0x74d8bd },
  { id:'operations', shortTitle:'系统运维', title:'系统运维实训中心', icon:'network', location:'大数据技术实训区之后 · 左右分布暂定', text:'继续向前为系统运维实训中心。左右侧尚待补充，当前按该区段作展示排布。依据你的说明和一期项目照片，将新大陆物联网实训架作为核心设备，呈现穿孔面板、控制模块与配套计算机。', tags:['新大陆物联网实训架','模块化面板','配套工作站'], photos:[{src:'operations',caption:'新大陆设备与实训现场 · 一期项目资料'}], features:['新大陆物联网实训架','穿孔板、控制模块与指示灯','配套显示器、键盘和操作台'], anchor:[0,4,-28], color:0xefa77a },
  { id:'ai', shortTitle:'人工智能', title:'人工智能实训中心', icon:'chip', location:'动线末端 · 左右两侧', text:'系统运维实训区之后，左右两侧为人工智能实训中心。依据本次照片还原白蓝实训终端、显示屏与板卡、双侧操作长桌和中央透明布线通道。', tags:['白蓝实训终端','双侧操作台','透明布线通道'], photos:[{src:'ai-front',caption:'人工智能实训空间前视角 · 本次上传照片'},{src:'ai-rear',caption:'人工智能实训设备后视角 · 本次上传照片'}], features:['白色机身与蓝色侧面饰条','显示屏、板卡与顶部传感部件','前方黑板、讲台与蓝色窗帘'], anchor:[0,4,-48], color:0x81c5f5 },
];
export type SpaceKind='exhibition'|'software'|'bigdata'|'operations'|'ai';
export type BaseRoom={id:string;space:number;x:number;z:number;width:number;depth:number;kind:SpaceKind};
export const baseRooms:BaseRoom[]=[
  {id:'exhibition-left',space:1,x:-11,z:48,width:17,depth:17,kind:'exhibition'},
  {id:'software-entry-right',space:2,x:11,z:48,width:17,depth:17,kind:'software'},
  {id:'software-left',space:2,x:-11,z:29,width:17,depth:17,kind:'software'},
  {id:'software-right',space:2,x:11,z:29,width:17,depth:17,kind:'software'},
  {id:'bigdata-left',space:4,x:-11,z:-8,width:17,depth:17,kind:'bigdata'},
  {id:'bigdata-right',space:4,x:11,z:-8,width:17,depth:17,kind:'bigdata'},
  {id:'operations-left',space:5,x:-11,z:-28,width:17,depth:17,kind:'operations'},
  {id:'operations-right',space:5,x:11,z:-28,width:17,depth:17,kind:'operations'},
  {id:'ai-left',space:6,x:-11,z:-48,width:17,depth:17,kind:'ai'},
  {id:'ai-right',space:6,x:11,z:-48,width:17,depth:17,kind:'ai'},
];
export const basePhotoPath=(name:string)=>`/images/base-phase-one/${name}.webp`;
