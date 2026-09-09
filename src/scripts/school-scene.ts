import * as THREE from 'three';
import { Water } from 'three/addons/objects/Water.js';
import { schoolMaterials } from './school-materials';
import { addSchoolVegetation } from './school-vegetation';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { campusBuildings, campusPanorama, type CampusBuilding, type PanoramaScene } from '../data/campus';

const S=.44;
const point=(x:number,z:number,y=0)=>new THREE.Vector3((x-535)*S,y,(z-235)*S);
const radians=THREE.MathUtils.degToRad;
const direction=(ath:number,atv:number)=>new THREE.Vector3(Math.sin(radians(ath))*Math.cos(radians(atv)),-Math.sin(radians(atv)),-Math.cos(radians(ath))*Math.cos(radians(atv)));

export function createSchoolScene(host:HTMLElement,onSelect:(id:string)=>void,onHotspot:(id:number)=>void){
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));
  renderer.setClearColor('#0b2031');renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const canvas=renderer.domElement;canvas.setAttribute('aria-label','校园三维模型，使用地标列表可通过键盘选择建筑');canvas.tabIndex=0;host.prepend(canvas);
  const scene=new THREE.Scene();scene.background=new THREE.Color('#0b2031');
  scene.fog=new THREE.FogExp2('#bed0cd',.00075);
  const assets=schoolMaterials(renderer,scene);
  const camera=new THREE.PerspectiveCamera(43,1,.5,2500);
  const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.dampingFactor=.085;controls.minDistance=35;controls.maxDistance=900;controls.maxPolarAngle=Math.PI*.465;controls.minPolarAngle=.08;controls.enablePan=true;
  controls.mouseButtons={LEFT:THREE.MOUSE.ROTATE,MIDDLE:THREE.MOUSE.DOLLY,RIGHT:THREE.MOUSE.PAN};
  const hemi=new THREE.HemisphereLight('#dceafd','#626348',1.3);scene.add(hemi);
  const sun=new THREE.DirectionalLight('#fff0d2',3.0);sun.position.set(160,210,80);sun.castShadow=true;sun.shadow.mapSize.set(4096,4096);Object.assign(sun.shadow.camera,{left:-260,right:260,top:170,bottom:-170,near:1,far:700});sun.shadow.bias=-.0001;sun.shadow.normalBias=.16;scene.add(sun);
  const root=new THREE.Group();scene.add(root);
  const materials:Record<string,THREE.MeshStandardMaterial>={};
  const material=(key:string,color:string,roughness=.8,metalness=0)=>materials[key]||(materials[key]=new THREE.MeshStandardMaterial({color,roughness,metalness}));
  const wall=assets.surface('white_plaster_02',.4,'#e5e6e2',.18),roof=assets.surface('asphalt_02',.25,'#a2a6a4',.25),glass=new THREE.MeshPhysicalMaterial({color:'#75919a',roughness:.13,metalness:.72,envMapIntensity:1.25,clearcoat:1}),trim=material('trim','#eeece2'),stone=assets.surface('concrete_pavement',.6,'#a7a797',.6),roadMat=assets.surface('asphalt_02',.2,'#aaaaa4',.2),grass=assets.surface('aerial_grass_rock',.08,'#a1ad73',.5),paving=assets.surface('concrete_pavement',.35,'#dad7c9',.3),track=material('track','#974941'),field=material('field','#497348'),wood=assets.surface('bark_willow',.5,'#7c6651',.4);
  const photoWindows=Array.from({length:8},(_,i)=>new THREE.MeshBasicMaterial({map:assets.texture(`campus-window-${i}.webp`,true),color:'#e4e8e8'}));
  const facadePhoto=new THREE.MeshBasicMaterial({map:assets.texture('campus-facade-wing.webp',true),color:'#f0f0eb'});
  facadePhoto.map!.repeat.set(1,7/3);
  const curtainPhoto=new THREE.MeshBasicMaterial({map:assets.texture('campus-curtain-wall.webp',true),color:'#d0d5d2'});
  const detailedMaterials=[wall,roof,glass,stone,roadMat,grass,paving,wood,...photoWindows,facadePhoto,curtainPhoto];

  const boxGeo=new THREE.BoxGeometry(1,1,1);
  const instances=new Map<THREE.Material,THREE.Matrix4[]>();
  const item=(mat:THREE.Material,x:number,y:number,z:number,w:number,h:number,d:number,rot=0)=>{const m=new THREE.Matrix4().compose(new THREE.Vector3(x,y,z),new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),rot),new THREE.Vector3(w,h,d));if(!instances.has(mat))instances.set(mat,[]);instances.get(mat)!.push(m);};
  const slab=(x:number,z:number,w:number,d:number,y:number,h:number,mat:THREE.Material)=>{const p=point(x,z,y);item(mat,p.x,y,p.z,w*S,h,d*S);};
  const mesh=(geo:THREE.BufferGeometry,mat:THREE.Material,pos:THREE.Vector3,parent=root)=>{const m=new THREE.Mesh(geo,mat);m.position.copy(pos);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
  const line=(coords:number[][],mat:THREE.Material,radius=.16,closed=false)=>{const pts=coords.map(p=>point(p[0],p[1],p[2]??.65));if(closed)pts.push(pts[0].clone());const curve=new THREE.CatmullRomCurve3(pts,false,'centripetal');return mesh(new THREE.TubeGeometry(curve,Math.max(20,pts.length*8),radius,5,false),mat,new THREE.Vector3());};
  const polygon=(coords:number[][],mat:THREE.Material,y=.6)=>{const shape=new THREE.Shape(coords.map(p=>new THREE.Vector2((p[0]-535)*S,-(p[1]-235)*S)));const geo=new THREE.ShapeGeometry(shape,32);geo.rotateX(-Math.PI/2);return mesh(geo,mat,new THREE.Vector3(0,y,0));};
  // A ground horizon removes the floating-island presentation while retaining the source campus boundary.
  // The recorded campus panorama supplies the distant urban/landscape context beyond the modeled plot.
  slab(537,232,1060,475,-.15,.2,paving);
  slab(537,232,1000,459,-.5,1,material('base','#aaa99a'));
  slab(536,230,966,423,.45,1,grass);
  // Low-detail surrounding forms follow the mixed low-rise/industrial character of the aerial.
  // These contextual masses are deliberately unnamed and are not surveyed building footprints.
  const contextTrees:THREE.Vector3[]=[];
  let contextSeed=4985;const contextRandom=()=>{contextSeed=(contextSeed*1664525+1013904223)>>>0;return contextSeed/4294967296;};
  const contextWalls=[material('contextWall1','#aeb7b3'),material('contextWall2','#c4c2b5'),material('contextWall3','#9daaad')];
  const contextRoofs=[material('contextRoof1','#718182'),material('contextRoof2','#658893'),material('contextRoof3','#8b8880')];
  for(let x=-310;x<1380;x+=71)for(let z=-330;z<810;z+=63){if(x>-15&&x<1090&&z>-40&&z<500)continue;if(contextRandom()<.18)continue;
    const xx=x+contextRandom()*14,zz=z+contextRandom()*13,w=25+contextRandom()*23,d=26+contextRandom()*22,h=3+contextRandom()*12;
    slab(xx,zz,w,d,h/2,h,contextWalls[Math.floor(contextRandom()*3)]);slab(xx,zz,w+1,d+1,h+.12,.35,contextRoofs[Math.floor(contextRandom()*3)]);
    if(contextRandom()<.42)contextTrees.push(point(xx+w*.65,zz+d*.65,.1));
  }
  for(const zz of [-92,534])slab(535,zz,1740,20,.04,.15,roadMat);
  for(const xx of [-90,1128])slab(xx,230,25,1260,.04,.15,roadMat);
  // Perimeter roads follow the rectangular campus plot shown in the source tour map.
  slab(535,12,1035,29,.15,.25,roadMat);slab(536,452,1035,29,.15,.25,roadMat);slab(35,232,26,460,.15,.25,roadMat);slab(1033,232,40,460,.15,.25,roadMat);
  const roadSegments:THREE.Vector3[][]=[];
  const road=(coords:number[][],width:number)=>{for(let i=1;i<coords.length;i++){const a=point(coords[i-1][0],coords[i-1][1],1.02),b=point(coords[i][0],coords[i][1],1.02);roadSegments.push([a,b,new THREE.Vector3(width*S/2,0,0)]);const mid=a.clone().add(b).multiplyScalar(.5);item(roadMat,mid.x,1.02,mid.z,a.distanceTo(b),.13,width*S,-Math.atan2(b.z-a.z,b.x-a.x));}for(const p of coords)mesh(new THREE.CylinderGeometry(width*S/2,width*S/2,.13,12),roadMat,point(p[0],p[1],1.02));};
  road([[72,35],[996,35],[996,421],[77,421],[77,37]],14);
  road([[983,250],[957,180],[927,162],[664,116],[641,180],[632,296],[647,353],[756,371],[807,319],[925,331],[987,250]],16);
  road([[641,240],[526,232],[494,310],[449,325],[299,309],[290,281],[298,170]],15);
  road([[527,233],[500,172],[411,151]],14);
  road([[80,325],[490,325]],13);
  road([[515,30],[521,418]],13);
  road([[306,33],[305,144],[496,151]],12);
  for(let i=0;i<29;i++)slab(1040,27+i*15,1.2,7,.4,.12,trim);
  for(let i=0;i<9;i++)slab(1010+i*5,250,2.5,31,.45,.12,trim);
  // Irregular lake shoreline with a west-bank peninsula, island, waterside paths and pavilions.
  const lakePts=[[788,198],[811,173],[844,173],[869,190],[917,190],[941,214],[936,259],[920,294],[876,308],[838,298],[801,310],[781,285],[785,254],[805,246],[808,224]];
  polygon(lakePts,stone,1);
  const lakeShape=new THREE.Shape(lakePts.map(([x,z])=>new THREE.Vector2((864+(x-864)*.98-535)*S,-(242+(z-242)*.97-235)*S)));
  const normalPixels=new Uint8Array(128*128*4);for(let j=0;j<128;j++)for(let i=0;i<128;i++){const k=(j*128+i)*4;normalPixels[k]=128+Math.sin(i/128*Math.PI*8+j/128*Math.PI*4)*19;normalPixels[k+1]=128+Math.cos(j/128*Math.PI*8-i/128*Math.PI*4)*19;normalPixels[k+2]=252;normalPixels[k+3]=255;}
  const waterNormals=new THREE.DataTexture(normalPixels,128,128);waterNormals.wrapS=waterNormals.wrapT=THREE.RepeatWrapping;waterNormals.needsUpdate=true;
  const lakeWater=new Water(new THREE.ShapeGeometry(lakeShape),{textureWidth:768,textureHeight:768,waterNormals,sunDirection:sun.position.clone().normalize(),sunColor:0xfff2d7,waterColor:0x475e39,distortionScale:.55,fog:true});lakeWater.rotation.x=-Math.PI/2;lakeWater.position.y=1.12;root.add(lakeWater);
  line([...lakePts,lakePts[0]],paving,.32);
  polygon([[790,220],[816,228],[835,251],[819,268],[787,268]],grass,1.5);
  polygon([[895,227],[908,218],[919,224],[918,238],[906,245],[896,238]],grass,1.5);
  const boardwalk=[[811,260],[839,272],[878,281],[908,245]];
  for(let j=1;j<boardwalk.length;j++){const a=point(...boardwalk[j-1] as [number,number],1.65),b=point(...boardwalk[j] as [number,number],1.65),delta=b.clone().sub(a),angle=-Math.atan2(delta.z,delta.x),len=delta.length();const side=new THREE.Vector3(-delta.z,0,delta.x).normalize();
    for(let d=0;d<len;d+=.4){const q=a.clone().addScaledVector(delta,d/len);item(wood,q.x,1.65,q.z,.35,.22,2.5,angle);}
    for(const sign of [-1,1]){const start=a.clone().addScaledVector(side,sign*1.22),end=b.clone().addScaledVector(side,sign*1.22);for(let d=0;d<=len;d+=1.1){const q=start.clone().lerp(end,d/len);item(wood,q.x,2.25,q.z,.12,1.3,.12);}const mid=start.clone().add(end).multiplyScalar(.5);for(const y of [2,2.85])item(wood,mid.x,y,mid.z,len,.12,.12,angle);}}
  const rockGeo=new THREE.DodecahedronGeometry(1,1),rocks=new THREE.InstancedMesh(rockGeo,stone,180),rockDummy=new THREE.Object3D();
  for(let i=0;i<180;i++){const k=i/180*lakePts.length,j=Math.floor(k),a=lakePts[j],b=lakePts[(j+1)%lakePts.length],f=k-j;rockDummy.position.copy(point(a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,1.4));rockDummy.scale.set(.5+(i%7)*.13,.35+(i%4)*.14,.6+(i%5)*.13);rockDummy.rotation.set(i*.27,i*2.3,.4);rockDummy.updateMatrix();rocks.setMatrixAt(i,rockDummy.matrix);}rocks.castShadow=true;rocks.receiveShadow=true;root.add(rocks);
  function pavilion(x:number,z:number){const p=point(x,z);for(const a of [0,Math.PI/2,Math.PI,Math.PI*1.5])item(wood,p.x+Math.cos(a)*2,3.5,p.z+Math.sin(a)*2,.3,5,.3);const g=new THREE.ConeGeometry(3.8,2.2,6);mesh(g,material('pavilion','#93564b'),point(x,z,6.5));}
  pavilion(813,258);pavilion(908,232);
  // White campus architecture: individual wings, dark sash windows, roof parapets and pergolas.
  const footprints:{x:number,z:number,w:number,d:number}[]=[];
  const buildingMeshes:THREE.Mesh[]=[];
  function wing(id:string,x:number,z:number,w:number,d:number,h:number,pergola=false){
    footprints.push({x,z,w,d});const p=point(x,z,h/2+1);
    const body=mesh(new THREE.BoxGeometry(w*S,h,d*S),wall,p);body.userData.building=id;buildingMeshes.push(body);
    slab(x,z,w+1,d+1,h+1.4,.65,trim);slab(x,z,w-3,d-3,h+1.8,.3,roof);
    const floors=Math.max(2,Math.round(h/3.6));
    for(let f=0;f<floors;f++){
      const y=3+f*(h-2)/floors;
      for(let j=0;j<Math.floor(w/7);j++){const wx=x-w/2+4+j*7;for(const side of [-1,1]){const zz=z+side*(d/2+.18);slab(wx,zz,4,.3,y,2.05,trim);slab(wx,zz+side*.22,3.5,.14,y,1.7,photoWindows[(j*3+f*5)%8]);}}
      for(let j=0;j<Math.floor(d/7);j++){const wz=z-d/2+4+j*7;for(const side of [-1,1]){const xx=x+side*(w/2+.18);slab(xx,wz,.3,4,y,2.05,trim);slab(xx+side*.22,wz,.14,3.5,y,1.7,photoWindows[(j*3+f*5)%8]);if(f%2===1&&j%5===0)slab(xx+side*.8,wz,.9,1.2,y-1.35,.55,material('aircon','#bfc1b9'));}}
      if(f>0){slab(x,z-d/2-.25,w,1,y-1.15,.16,trim);slab(x,z+d/2+.25,w,1,y-1.15,.16,trim);}
    }
    if(pergola){for(const side of [-1,1]){const xx=x+side*(w/2-4);for(const zz of [z-d/2+4,z+d/2-4])slab(xx,zz,1,1,h+3.5,5,trim);}slab(x,z,w,1,h+6, .4,trim);slab(x,z-d/2+3,w,1,h+6,.4,trim);slab(x,z+d/2-3,w,1,h+6,.4,trim);for(let j=0;j<w;j+=5)slab(x-w/2+j,z,1,d,h+6,.4,trim);}
    return body;
  }
  wing('zhenshan',733,246,32,177,25);wing('zhenshan',687,243,34,89,16);
  // The east-facing central curtain wall and twin stairs follow the frontal official aerial.
  slab(750.4,246,1.5,58,16,18,glass);
  const sourceGlass=mesh(new THREE.PlaneGeometry(58*S,18),curtainPhoto,point(751.22,246,16));sourceGlass.rotation.y=Math.PI/2;
  // One continuous seven-floor photo grid keeps window scale and exposure consistent across each wing.
  for(const z of [184,307]){const panel=mesh(new THREE.PlaneGeometry(54*S,24.9),facadePhoto,point(749.65,z,13.55));panel.rotation.y=Math.PI/2;}

  for(let z=217;z<=275;z+=12)slab(751.3,z,.2,.16,16,18,material('mullion','#9aabaa',.3,.55));
  for(let y=7;y<=25;y+=6)slab(751.3,246,.2,58,y,.075,material('mullion','#9aabaa',.3,.55));
  for(const z of [216,276])slab(752,z,1.5,1,16,19,trim);
  slab(751.5,246,1,62,25.6,.65,trim);
  for(const zz of [158,332]){for(const xx of [720,745])slab(xx,zz,1.3,1.3,28,7,trim);for(const offset of [0,15])slab(733,zz+offset,28,1.3,31.5,.5,trim);}
  for(const xx of [723,745])for(const zz of [211,229,246,263,281])slab(xx,zz,1.1,1.1,28.4,6,trim);
  for(const xx of [722,747])slab(xx,246,1,74,31.4,.6,trim);
  for(let j=0;j<16;j++)slab(735,212+j*4.6,29,.8,31.8,.4,trim);
  slab(747,246,.8,62,28,2.7,glass);for(let j=0;j<15;j++)slab(747.5,218+j*4,.4,.3,28,2.8,trim);
  slab(763,246,30,94,1.2,.35,paving);
  for(const z of [223,269]){for(let j=0;j<20;j++)slab(751+j*.68,z,.8,20,1.5+(20-j)*.17,.35,trim);for(const side of [-1,1])line([[751,z+side*10,5.8],[765,z+side*10,2.4]],material('rails','#a2a8a5',.3,.8),.08);}
  slab(757,246,14,42,6.8,.8,material('canopy','#696864',.6));slab(752,246,.8,22,3.7,4.3,glass);
  for(const z of [237,246,255])slab(760,z,1,1,3.6,4.7,trim);
  // Rooftop lettering is taken directly from the visible campus photograph.
  const signs: (()=>void)[]=[];
  function sign(text:string,x:number,z:number,y:number,w:number,h:number){const c=document.createElement('canvas');c.width=1536;c.height=200;const ctx=c.getContext('2d')!;const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;const mat=new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:THREE.DoubleSide});const m=mesh(new THREE.PlaneGeometry(w,h),mat,point(x,z,y));m.rotation.y=Math.PI/2;const paint=()=>{ctx.clearRect(0,0,1536,200);ctx.font='600 146px "Noto Sans SC",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#912b31';ctx.fillText(text,768,110);tex.needsUpdate=true;};paint();signs.push(paint);}
  sign('明 理 求 真',749,302,27.5,22,2.9);sign('精 工 致 用',749,190,27.5,22,2.9);sign('臻 善 楼',755,246,8.4,12,1.8);
  document.fonts.ready.then(()=>signs.forEach(paint=>paint()));
  line([[778,233,1],[778,233,19]],trim,.13);
  const flagCanvas=document.createElement('canvas');flagCanvas.width=450;flagCanvas.height=300;const fc=flagCanvas.getContext('2d')!;fc.fillStyle='#c92c30';fc.fillRect(0,0,450,300);fc.fillStyle='#ffde56';
  function star(cx:number,cy:number,r:number,rotation:number){fc.beginPath();for(let i=0;i<10;i++){const a=rotation+i*Math.PI/5,rr=i%2?r*.382:r;const x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr;i?fc.lineTo(x,y):fc.moveTo(x,y);}fc.closePath();fc.fill();}
  star(75,75,45,-Math.PI/2);for(const [x,y] of [[150,30],[180,60],[180,105],[150,135]])star(x,y,15,Math.atan2(75-y,75-x));
  const flagTexture=new THREE.CanvasTexture(flagCanvas);flagTexture.colorSpace=THREE.SRGBColorSpace;const flag=mesh(new THREE.PlaneGeometry(2.4,1.6),new THREE.MeshStandardMaterial({map:flagTexture,side:THREE.DoubleSide,roughness:.8}),point(778,235.6,17.4));flag.rotation.y=Math.PI/2;
  wing('library',887,363,116,29,23,true);wing('library',951,365,26,52,17);wing('library',813,363,25,56,23,true);
  wing('shuren',691,407,117,32,24,true);
  wing('zhixing',876,126,95,32,24,true);wing('zhixing',809,111,24,69,25,true);wing('zhixing',942,103,24,83,25,true);
  wing('duxing',894,57,110,33,22);wing('duxing',796,77,40,45,22);
  // Circular entry crown of the north teaching complex.
  const crown=mesh(new THREE.TorusGeometry(4.5,.25,6,32),trim,point(948,147,21));crown.rotation.x=Math.PI/2;
  for(let j=0;j<8;j++){const a=j*Math.PI/4;line([[948,147,16],[948+Math.cos(a)*10,147+Math.sin(a)*10,21]],trim,.14);}
  wing('shangneng',490,81,34,105,24);wing('shangneng',408,43,132,26,23);
  wing('luban',397,123,112,30,9);slab(397,123,114,32,10.3,.6,material('workshoproof','#83a4ab'));
  wing('shangji',471,375,35,87,24);wing('shangji',515,363,24,37,10);
  wing('yixiu',328,379,35,87,23);wing('yixiu',403,416,86,28,23);
  wing('cuiying',258,81,109,30,23);wing('cuiying',262,44,109,26,23);
  wing('cuiying',165,80,52,28,16);
  // Stadium and courts occupy the west end, with a north-south grandstand.
  const oval=(x:number,z:number,w:number,d:number,mat:THREE.Material,y:number)=>{const sh=new THREE.Shape();const r=d/2,half=w/2-r;sh.absarc(half,0,r,-Math.PI/2,Math.PI/2,false);sh.absarc(-half,0,r,Math.PI/2,Math.PI*1.5,false);const g=new THREE.ShapeGeometry(sh,48);g.rotateX(-Math.PI/2);mesh(g,mat,point(x,z,y));};
  oval(187,245,203*S,130*S,track,1.1);oval(187,245,170*S,97*S,field,1.2);
  const white=material('markings','#e8e6d1');
  for(let lane=0;lane<5;lane++){const pts=[];const r=(63-lane*3.8)*S,half=36*S;for(let a=0;a<=64;a++){const ang=a/64*Math.PI*2;pts.push(new THREE.Vector3(point(187,245).x+Math.cos(ang)*r+(Math.cos(ang)>0?half:-half),1.25,point(187,245).z+Math.sin(ang)*r));}const curve=new THREE.CatmullRomCurve3(pts,true);mesh(new THREE.TubeGeometry(curve,180,.045,3,true),white,new THREE.Vector3());}
  for(const zz of [212,278])slab(187,zz,140,.65,1.32,.05,white);for(const xx of [117,187,257])slab(xx,245,.65,66,1.32,.05,white);
  const circle=mesh(new THREE.TorusGeometry(5.4,.08,4,40),white,point(187,245,1.35));circle.rotation.x=Math.PI/2;
  for(const xx of [117,257]){line([[xx,235,1.5],[xx,235,4.5],[xx,255,4.5],[xx,255,1.5]],white,.15);}
  for(let i=0;i<6;i++)slab(86+i*3,245,3,139,1.5+i*.55,1.2,material('seats'+i,['#61959c','#629e9f','#d2b773','#bb575d','#598da6','#6b9aaa'][i]));
  for(let i=0;i<10;i++)slab(79,181+i*14,1,1,8,15,trim);
  slab(86,245,29,150,15,.9,trim);
  for(let col=0;col<3;col++)for(let row=0;row<3;row++){
    const x=347+col*49,z=188+row*43;slab(x,z,44,38,1,.2,material('courts','#4c9fa4'));slab(x,z,37,30,1.12,.05,material('courtinner','#b26561'));
    for(const zz of [-15,15])slab(x,z+zz,37,.5,1.2,.05,white);for(const xx of [-18.5,0,18.5])slab(x+xx,z,.5,30,1.2,.05,white);
    for(const zz of [-13,13]){slab(x,z+zz,1,1,2.1,2.5,trim);slab(x,z+zz,4,1,3.5,1.8,trim);}
  }
  // Distinctive two arch entry, oriented toward Changqing Avenue at the east edge.
  for(const centerZ of [234,267]){for(let j=0;j<8;j++){const x=987+j*1.15;const coords=[];for(let k=0;k<=28;k++){const a=k/28*Math.PI;coords.push([x,centerZ+Math.cos(a)*19,1+Math.sin(a)*10]);}line(coords,trim,.28);}for(const zz of [centerZ-19,centerZ+19])slab(991,zz,7,2,3,5,material('gateRed','#a34f47'));}
  // Deterministic landscaping: keep every tree clear of building footprints, sports surfaces and water.
  let seed=6417;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  const treePositions:THREE.Vector3[]=[];
  function tree(x:number,z:number){const p=point(x,z,1);if(roadSegments.some(([a,b,w])=>{const ab=b.clone().sub(a),t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/ab.lengthSq(),0,1);return p.distanceTo(a.clone().addScaledVector(ab,t))<w.x+1.2;}))return;treePositions.push(p);}
  for(let x=80;x<995;x+=14){tree(x,23);tree(x,434);}for(let z=35;z<430;z+=14){tree(62,z);if(z<218||z>282)tree(1010,z);}
  for(let x=554;x<637;x+=14)for(let z=45;z<423;z+=16)tree(x+random()*6,z+random()*6);
  for(let i=0;i<530;i++){const x=80+random()*910,z=45+random()*374;if(footprints.some(f=>Math.abs(x-f.x)<f.w/2+11&&Math.abs(z-f.z)<f.d/2+11))continue;if(x<504&&z>148&&z<329)continue;if(x>775&&x<958&&z>155&&z<324)continue;if(x>630&&x<780&&z>135&&z<358)continue;tree(x,z);}
  // Deliberately frame the lake with varied deciduous trees and conifers visible in the source photos.
  for(const [x,z] of [[786,195],[794,303],[812,318],[836,313],[942,284],[945,215],[769,290],[770,194],[814,253],[902,235]])treePositions.push(point(x,z,1.5));
  const vegetation=addSchoolVegetation(root,[...treePositions,...contextTrees],assets.texture,wood);
  // Parked cars and roadway lights are contextual geometry, not occupancy counts.
  for(let i=0;i<22;i++){const x=831+i*6;slab(x,413,4,8,1.2,1.2,material('car'+i%3,['#dddcd2','#7791a1','#3d5364'][i%3]));slab(x,413,3,4,2,1,glass);}
  const lamps:THREE.Mesh[]=[];const lampMat=material('lamps','#e6e3b6');
  for(let i=0;i<16;i++){const x=780+i*13,z=i%2?340:155;line([[x,z,1],[x,z,8]],stone,.13);lamps.push(mesh(new THREE.SphereGeometry(.6,6,4),lampMat,point(x,z,8)));}
  for(const [mat,matrices] of instances){const inst=new THREE.InstancedMesh(boxGeo,mat,matrices.length);matrices.forEach((m,i)=>inst.setMatrixAt(i,m));inst.castShadow=true;inst.receiveShadow=true;root.add(inst);}
  const selection=mesh(new THREE.RingGeometry(11,11.5,60),new THREE.MeshBasicMaterial({color:'#9df7df',side:THREE.DoubleSide,transparent:true,opacity:.8,depthWrite:false}),new THREE.Vector3(0,1.65,0));selection.rotation.x=-Math.PI/2;selection.visible=false;
  const labelHost=host.querySelector<HTMLElement>('[data-labels]')!;
  const labels=campusBuildings.map(b=>{const el=document.createElement('button');el.textContent=b.name;el.dataset.sceneBuilding=b.id;el.setAttribute('aria-label',`查看${b.name}`);el.tabIndex=-1;el.addEventListener('click',()=>onSelect(b.id));labelHost.append(el);return{el,b,pos:point(b.x,b.z,b.h+9)};});
  let cinematic=false,cinematicUpdate:((delta:number)=>void)|null=null,lastTime=0,elapsedWater=0;
  let mode:'campus'|'panorama'='campus',selected='',night=false,disposed=false,frame=0,needsResize=true;
  let tween:{from:THREE.Vector3,to:THREE.Vector3,fromTarget:THREE.Vector3,toTarget:THREE.Vector3,start:number}|null=null;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const go=(pos:THREE.Vector3,target:THREE.Vector3)=>{if(reduce){camera.position.copy(pos);controls.target.copy(target);controls.update();return;}tween={from:camera.position.clone(),to:pos,fromTarget:controls.target.clone(),toTarget:target,start:performance.now()};};
  function overview(top=false,animate=true){
    const aspect=host.clientWidth/host.clientHeight,target=point(537,232,8);
    const normal=(top?new THREE.Vector3(.001,1,.02):new THREE.Vector3(.65,1,1.2)).normalize();
    const right=new THREE.Vector3().crossVectors(new THREE.Vector3(0,1,0),normal).normalize(),up=new THREE.Vector3().crossVectors(normal,right).normalize();
    const tan=Math.tan(radians(camera.fov/2));let dist=0;
    for(const x of [20,1060])for(const z of [0,465])for(const y of [0,35]){const corner=point(x,z,y).sub(target);dist=Math.max(dist,normal.dot(corner)+Math.max(Math.abs(right.dot(corner))/(tan*aspect*.90),Math.abs(up.dot(corner))/(tan*.88)));}
    const pos=target.clone().add(normal.multiplyScalar(dist));if(animate)go(pos,target);else{camera.position.copy(pos);controls.target.copy(target);controls.update();}
  }
  const panoScene=new THREE.Scene(),panoCamera=new THREE.PerspectiveCamera(75,1,.1,10);
  let yaw=0,pitch=0,panoFov=75,panoSource:PanoramaScene|null=null,loadSequence=0,cube:THREE.CubeTexture|null=null;
  const cubeCache=new Map<number,Promise<THREE.CubeTexture>>();const loadedCubes=new Map<number,THREE.CubeTexture>();
  function loadPanorama(s:PanoramaScene){
    if(cubeCache.has(s.id))return cubeCache.get(s.id)!;
    const task=new Promise<THREE.CubeTexture>((resolve,reject)=>new THREE.CubeTextureLoader().load(['l','r','u','d','b','f'].map(face=>`/images/school/panoramas/${s.id}/${face}.webp`),resolve,undefined,reject)).then(next=>{
      if(disposed){next.dispose();throw new Error('Scene disposed');}next.colorSpace=THREE.SRGBColorSpace;loadedCubes.set(s.id,next);
      for(const [id,texture] of loadedCubes){if(loadedCubes.size<=2)break;if(texture!==cube&&id!==s.id){texture.dispose();loadedCubes.delete(id);cubeCache.delete(id);}}
      return next;
    }).catch(e=>{cubeCache.delete(s.id);throw e;});cubeCache.set(s.id,task);return task;
  }
  let savedPosition=new THREE.Vector3(),savedTarget=new THREE.Vector3();
  const hotHost=host.querySelector<HTMLElement>('[data-hotspots]')!;let hotspots:{el:HTMLElement,pos:THREE.Vector3}[]=[];
  const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();panoCamera.aspect=w/h;panoCamera.updateProjectionMatrix();needsResize=false;};
  const observer=new ResizeObserver(()=>{needsResize=true;});observer.observe(host);resize();overview(false,false);
  controls.addEventListener('start',()=>tween=null);
  let pointer:{x:number,y:number,yaw:number,pitch:number,id:number}|null=null;
  canvas.addEventListener('pointerdown',e=>{if(mode==='panorama'&&!cinematic){pointer={x:e.clientX,y:e.clientY,yaw,pitch,id:e.pointerId};canvas.setPointerCapture(e.pointerId);}});
  canvas.addEventListener('pointermove',e=>{if(pointer&&mode==='panorama'){yaw=pointer.yaw-(e.clientX-pointer.x)*.16;pitch=THREE.MathUtils.clamp(pointer.pitch+(e.clientY-pointer.y)*.16,-85,85);}});
  const clearPointer=()=>{pointer=null;};canvas.addEventListener('pointerup',clearPointer);canvas.addEventListener('pointercancel',clearPointer);
  canvas.addEventListener('wheel',e=>{if(mode!=='panorama'||cinematic)return;e.preventDefault();panoFov=THREE.MathUtils.clamp(panoFov+e.deltaY*.035,35,105);panoCamera.fov=panoFov;panoCamera.updateProjectionMatrix();},{passive:false});
  canvas.addEventListener('keydown',e=>{if(mode!=='panorama'||cinematic)return;const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-'];if(!keys.includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')yaw-=8;if(e.key==='ArrowRight')yaw+=8;if(e.key==='ArrowUp')pitch-=6;if(e.key==='ArrowDown')pitch+=6;if(e.key==='+')panoFov-=5;if(e.key==='-')panoFov+=5;pitch=THREE.MathUtils.clamp(pitch,-85,85);panoCamera.fov=THREE.MathUtils.clamp(panoFov,35,105);panoCamera.updateProjectionMatrix();});
  let downPoint=new THREE.Vector2();canvas.addEventListener('pointerdown',e=>downPoint.set(e.clientX,e.clientY));
  canvas.addEventListener('click',e=>{if(cinematic||mode!=='campus'||downPoint.distanceTo(new THREE.Vector2(e.clientX,e.clientY))>5)return;const rect=canvas.getBoundingClientRect(),ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),camera);const hit=ray.intersectObjects(buildingMeshes)[0];if(hit)onSelect(hit.object.userData.building);});
  const temp=new THREE.Vector3();const forward=new THREE.Vector3();let lastLabels=0;
  function render(now:number){if(disposed)return;frame=requestAnimationFrame(render);if(document.hidden){lastTime=now;return;}const delta=lastTime?Math.min((now-lastTime)/1000,.1):0;lastTime=now;cinematicUpdate?.(delta);if(!reduce)elapsedWater+=delta;lakeWater.material.uniforms.time.value=elapsedWater*.3;if(needsResize)resize();if(mode==='campus'){
    if(tween){const t=Math.min(1,(now-tween.start)/1050),ease=1-Math.pow(1-t,4);camera.position.lerpVectors(tween.from,tween.to,ease);controls.target.lerpVectors(tween.fromTarget,tween.toTarget,ease);if(t===1)tween=null;}if(!cinematic)controls.update();else camera.lookAt(controls.target);renderer.render(scene,camera);
    if(!cinematic&&now-lastLabels>70){lastLabels=now;const placed:{x:number,y:number}[]=[];const ordered=[...labels].sort((a,b)=>Number(b.b.id===selected)-Number(a.b.id===selected));for(const l of ordered){temp.copy(l.pos).project(camera);const x=(temp.x*.5+.5)*host.clientWidth,y=(-temp.y*.5+.5)*host.clientHeight;const visible=temp.z<1&&temp.z>-1&&x>25&&x<host.clientWidth-25&&y>85&&y<host.clientHeight-83&&!placed.some(p=>Math.abs(p.x-x)<(host.clientWidth<500?62:76)&&Math.abs(p.y-y)<26);l.el.hidden=!visible;if(visible){l.el.style.left=`${x}px`;l.el.style.top=`${y}px`;placed.push({x,y});}}const compass=document.querySelector<SVGElement>('[data-compass]');if(compass)compass.style.transform=`rotate(${Math.atan2(camera.position.x-controls.target.x,camera.position.z-controls.target.z)*180/Math.PI}deg)`;}
  }else{panoCamera.lookAt(direction(yaw,pitch));panoCamera.updateMatrixWorld();renderer.render(panoScene,panoCamera);panoCamera.getWorldDirection(forward);if(!cinematic)for(const h of hotspots){temp.copy(h.pos).project(panoCamera);const visible=h.pos.dot(forward)>.15&&temp.z<1&&Math.abs(temp.x)<.93&&Math.abs(temp.y)<.75;h.el.hidden=!visible;if(visible){h.el.style.left=`${(temp.x*.5+.5)*host.clientWidth}px`;h.el.style.top=`${(-temp.y*.5+.5)*host.clientHeight}px`;}}}}
  frame=requestAnimationFrame(render);host.classList.add('is-ready');host.dataset.ready='true';
  return {
    ready: assets.ready,
    preloadPanorama: loadPanorama,
    setCinematic(value:boolean,update?:((delta:number)=>void)){cinematic=value;cinematicUpdate=value?(update??null):null;controls.enabled=!value&&mode==='campus';tween=null;selection.visible=false;host.dataset.cinematic=String(value);if(!value){camera.fov=43;camera.updateProjectionMatrix();}},
    cameraPose(position:number[],target:number[],fov=43){camera.position.copy(point(position[0],position[1],position[2]));controls.target.copy(point(target[0],target[1],target[2]));camera.fov=fov;camera.updateProjectionMatrix();camera.lookAt(controls.target);},
    panoramaPose(ath:number,atv:number,fov:number){yaw=ath;pitch=atv;panoCamera.fov=fov;panoCamera.updateProjectionMatrix();},
    stats(){return {drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures,camera:camera.position.toArray(),mode};},
    select(b:CampusBuilding){selected=b.id;labels.forEach(l=>l.el.classList.toggle('is-active',l.b.id===selected));selection.position.copy(point(b.x,b.z,1.7));selection.visible=true;const target=point(b.x,b.z,b.h*.35),distance=Math.max(135,160/Math.max(.7,camera.aspect));go(target.clone().add(new THREE.Vector3(.85,.9,.73).normalize().multiplyScalar(distance)),target);},
    overview(top=false){selected='';selection.visible=false;labels.forEach(l=>l.el.classList.remove('is-active'));overview(top);},
    setNight(value:boolean){night=value;assets.setContextNight(night);hemi.intensity=night?.25:1.3;sun.intensity=night?.35:3;scene.background=night?new THREE.Color('#050e20'):(assets.sky()||new THREE.Color('#bacecf'));scene.environmentIntensity=night?.12:.65;scene.fog=new THREE.FogExp2(night?'#081324':'#bed0cd',.00075);[...photoWindows,facadePhoto,curtainPhoto].forEach(m=>m.color.set(night?'#657b80':'#f0f0eb'));glass.emissive.set(night?'#ffe0a1':'#000000');glass.emissiveIntensity=night?.65:0;lampMat.emissive.set(night?'#ffe7b3':'#000000');lampMat.emissiveIntensity=night?2:0;},
    campus(){loadSequence++;if(mode==='panorama'){camera.position.copy(savedPosition);controls.target.copy(savedTarget);}mode='campus';controls.enabled=!cinematic;tween=null;host.dataset.mode='campus';},
    async panorama(s:PanoramaScene,view?:{ath:number,atv:number}){
      const sequence=++loadSequence;
      const next=await loadPanorama(s);
      if(disposed||sequence!==loadSequence)return false;
      if(mode==='campus'){savedPosition.copy(camera.position);savedTarget.copy(controls.target);}mode='panorama';controls.enabled=false;tween=null;
      panoScene.background=next;cube=next;panoSource=s;yaw=view?.ath??s.view.ath;pitch=view?.atv??s.view.atv;panoFov=view?55:Math.min(92,s.view.fov);panoCamera.fov=panoFov;panoCamera.updateProjectionMatrix();
      hotHost.replaceChildren();hotspots=[];
      for(const h of s.hotspots){const targetId='sceneId'in h?Number(h.sceneId):0;if(targetId&&!campusPanorama.scenes.some(scene=>scene.id===targetId))continue;const el=document.createElement(targetId?'button':'span');el.textContent=h.title;if(targetId){el.setAttribute('aria-label',`进入${h.title}全景`);el.addEventListener('click',()=>onHotspot(targetId));}hotHost.append(el);hotspots.push({el,pos:direction(h.ath,h.atv)});}
      host.dataset.mode='panorama';host.dataset.panorama=String(s.id);return true;
    },
    reset(){if(mode==='campus'){overview();return;}if(panoSource){yaw=panoSource.view.ath;pitch=panoSource.view.atv;panoFov=Math.min(92,panoSource.view.fov);panoCamera.fov=panoFov;panoCamera.updateProjectionMatrix();}},
    dispose(){disposed=true;loadSequence++;cancelAnimationFrame(frame);observer.disconnect();controls.dispose();loadedCubes.forEach(t=>t.dispose());loadedCubes.clear();cubeCache.clear();root.traverse(o=>{if(o instanceof THREE.Mesh)o.geometry.dispose();});Object.values(materials).forEach(m=>m.dispose());detailedMaterials.forEach(m=>m.dispose());vegetation.dispose();waterNormals.dispose();flagTexture.dispose();assets.dispose();renderer.dispose();},
  };
}
