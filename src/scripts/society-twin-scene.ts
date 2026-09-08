import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { baseRooms, baseSpaces, type BaseRoom } from '../data/base-phase-one';

/** Photo-based interiors arranged along the visitor-confirmed corridor.
 * Units are presentation scale, not surveyed metres or an equipment inventory.
 */
export function initSocietyTwin(app: HTMLElement, fallback: (message?: string) => void) {
  const host=app.querySelector<HTMLElement>('[data-twin-scene]')!;
  const canvas=app.querySelector<HTMLCanvasElement>('[data-twin-canvas]')!;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'default'});}catch{fallback();return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0x0b1b26,0);
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  const scene=new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xe9f3ff,0x56717b,2.2));
  const sun=new THREE.DirectionalLight(0xfff0da,2.1);sun.position.set(-45,90,45);scene.add(sun);
  const fill=new THREE.DirectionalLight(0xa3cfee,1.3);fill.position.set(30,45,-55);scene.add(fill);
  const camera=new THREE.PerspectiveCamera(38,1,.08,650);
  const controls=new OrbitControls(camera,canvas);
  controls.enableDamping=true;controls.dampingFactor=.085;controls.enablePan=false;
  controls.minDistance=4;controls.maxDistance=300;controls.maxPolarAngle=Math.PI*.47;controls.minPolarAngle=.06;controls.rotateSpeed=.45;controls.zoomSpeed=.65;controls.autoRotateSpeed=.22;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const geometry=new THREE.BoxGeometry(1,1,1);
  const materials={
    plinth:new THREE.MeshStandardMaterial({color:0x183747,roughness:.7,metalness:.2}),
    wall:new THREE.MeshStandardMaterial({color:0xe4e9e6,roughness:.8}),
    trim:new THREE.MeshStandardMaterial({color:0x526571,roughness:.55}),
    white:new THREE.MeshStandardMaterial({color:0xf0f0e8,roughness:.65}),
    dark:new THREE.MeshStandardMaterial({color:0x17232c,roughness:.5}),
    wood:new THREE.MeshStandardMaterial({color:0xc69a60,roughness:.58}),
    blue:new THREE.MeshStandardMaterial({color:0x2376bc,roughness:.6}),
    curtain:new THREE.MeshStandardMaterial({color:0x225181,roughness:.95}),
    metal:new THREE.MeshStandardMaterial({color:0x9baab0,metalness:.55,roughness:.4}),
    glass:new THREE.MeshPhysicalMaterial({color:0x9acbdc,transparent:true,opacity:.28,roughness:.05,metalness:.15,depthWrite:false,side:THREE.DoubleSide}),
    glassFloor:new THREE.MeshPhysicalMaterial({color:0x78bdc7,transparent:true,opacity:.19,roughness:.08,metalness:.15,depthWrite:false}),
    window:new THREE.MeshBasicMaterial({color:0xc4e5ea,transparent:true,opacity:.42}),
    screen:new THREE.MeshStandardMaterial({color:0x163e70,emissive:0x166cb2,emissiveIntensity:.65,roughness:.3}),
    glow:new THREE.MeshBasicMaterial({color:0x86ead9}),
    warm:new THREE.MeshBasicMaterial({color:0xf4d598}),
    green:new THREE.MeshStandardMaterial({color:0x348368,roughness:.9}),
    wireBlue:new THREE.MeshBasicMaterial({color:0x297bdd}),
    wireGreen:new THREE.MeshBasicMaterial({color:0x51934a}),
    light:new THREE.MeshBasicMaterial({color:0xeaf6ff}),
    red:new THREE.MeshStandardMaterial({color:0xb23948,roughness:.65}),
  };
  const textures:THREE.Texture[]=[];
  const materialList:THREE.Material[]=[];
  function textureMaterial(draw:(ctx:CanvasRenderingContext2D)=>void,w=512,h=256,unlit=false){
    const surface=document.createElement('canvas');surface.width=w;surface.height=h;
    const ctx=surface.getContext('2d')!;draw(ctx);const texture=new THREE.CanvasTexture(surface);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;textures.push(texture);
    const material=unlit?new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}):new THREE.MeshStandardMaterial({map:texture,roughness:.8,side:THREE.DoubleSide});materialList.push(material);return material;
  }
  const textBoard=(title:string,subtitle='',bg='#123452',color='#e3f9fc',ratio=4)=>{
    const w=1536,h=Math.round(w/ratio);
    return textureMaterial(ctx=>{
      ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);ctx.strokeStyle='#56a6ce';ctx.lineWidth=2;ctx.strokeRect(12,8,w-24,h-16);
      ctx.fillStyle=color;ctx.font=`500 ${Math.min(h*.55,w/(title.length+2))}px "PingFang SC",sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(title,w/2,h*(subtitle?.40:.5),w-60);
      if(subtitle){ctx.font=`${h*.20}px "PingFang SC",sans-serif`;ctx.fillStyle='#9dccdf';ctx.fillText(subtitle,w/2,h*.74,w-70);}
    },w,h,true);
  };
  const floorMaterial=textureMaterial(ctx=>{
    ctx.fillStyle='#c7d0cf';ctx.fillRect(0,0,512,512);ctx.strokeStyle='#9aa8ac';ctx.lineWidth=2;
    for(let n=0;n<=512;n+=128){ctx.beginPath();ctx.moveTo(n,0);ctx.lineTo(n,512);ctx.moveTo(0,n);ctx.lineTo(512,n);ctx.stroke();}
    for(let n=0;n<80;n++){ctx.strokeStyle=n%2?'#c1cac9':'#d0d6d3';ctx.lineWidth=1;const x=(n*137)%512,y=(n*83)%512;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+15,y+8);ctx.stroke();}
  },512,512);
  const floorMap=(floorMaterial as THREE.MeshStandardMaterial).map!;floorMap.wrapS=floorMap.wrapT=THREE.RepeatWrapping;floorMap.repeat.set(4,4);
  const ceilingMaterial=textureMaterial(ctx=>{ctx.fillStyle='#d5dcda';ctx.fillRect(0,0,512,512);ctx.strokeStyle='#a3acaf';ctx.lineWidth=3;for(let n=0;n<=512;n+=128){ctx.beginPath();ctx.moveTo(n,0);ctx.lineTo(n,512);ctx.moveTo(0,n);ctx.lineTo(512,n);ctx.stroke();}},512,512);
  const ceilingMap=(ceilingMaterial as THREE.MeshStandardMaterial).map!;ceilingMap.wrapS=ceilingMap.wrapT=THREE.RepeatWrapping;ceilingMap.repeat.set(4,4);
  const monitorMaterial=textureMaterial(ctx=>{
    ctx.fillStyle='#0e233b';ctx.fillRect(0,0,512,320);ctx.fillStyle='#2d728d';ctx.fillRect(0,0,512,28);ctx.fillStyle='#77d8cd';ctx.font='18px sans-serif';ctx.fillText('DIGITAL LEARNING',22,20);
    for(let i=0;i<11;i++){ctx.fillStyle=i%3?'#3c718d':'#75b5be';ctx.fillRect(24,52+i*19,80+(i*47)%340,5);}
    ctx.fillStyle='#194960';ctx.fillRect(335,75,148,174);ctx.strokeStyle='#71dcca';ctx.beginPath();ctx.moveTo(342,218);ctx.lineTo(361,177);ctx.lineTo(389,185);ctx.lineTo(414,130);ctx.lineTo(453,143);ctx.lineTo(477,99);ctx.stroke();
  },512,320,true);
  const pillarMaterial=textureMaterial(ctx=>{
    const gradient=ctx.createLinearGradient(0,0,256,768);gradient.addColorStop(0,'#162695');gradient.addColorStop(.65,'#2863d4');gradient.addColorStop(1,'#93aafc');ctx.fillStyle=gradient;ctx.fillRect(0,0,256,768);
    ctx.textAlign='center';ctx.fillStyle='#ffffff';ctx.font='27px "PingFang SC",sans-serif';Array.from('科技引领未来').forEach((char,i)=>ctx.fillText(char,165,90+i*44));Array.from('数算驱动变革').forEach((char,i)=>ctx.fillText(char,94,135+i*44));
    ctx.strokeStyle='#c2ebff';ctx.lineWidth=3;for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(35+i*36,748);ctx.lineTo(35+i*36,590-i*17);ctx.lineTo(52+i*36,574-i*17);ctx.lineTo(52+i*36,520-i*17);ctx.stroke();}
  },256,768,true);
  const entranceBoard=textBoard('东数西算·数字经济人才培养基地','','#f2f2ea','#493c49',27);
  const newlandBoard=textBoard('新大陆教育','Newland Edu','#2175a3');
  const common=new THREE.Group();scene.add(common);
  const groups=baseSpaces.map(()=>new THREE.Group());groups.forEach(group=>scene.add(group));
  const roofs=baseSpaces.map(()=>new THREE.Group());roofs.forEach(group=>{group.visible=false;scene.add(group);});
  const cables=baseSpaces.map(()=>new THREE.Group());cables.forEach(group=>scene.add(group));
  const groundPickables:THREE.Object3D[]=[];
  const roomFloors:THREE.Mesh[]=[];
  const batches=new Map<THREE.Object3D,Map<THREE.Material,THREE.Matrix4[]>>();const dummy=new THREE.Object3D();
  function solid(parent:THREE.Object3D,x:number,y:number,z:number,w:number,h:number,d:number,material:THREE.Material,ry=0){
    let byMaterial=batches.get(parent);if(!byMaterial){byMaterial=new Map();batches.set(parent,byMaterial);}let matrices=byMaterial.get(material);if(!matrices){matrices=[];byMaterial.set(material,matrices);}
    dummy.position.set(x,y,z);dummy.scale.set(w,h,d);dummy.rotation.set(0,ry,0);dummy.updateMatrix();matrices.push(dummy.matrix.clone());
  }
  function meshBox(parent:THREE.Object3D,x:number,y:number,z:number,w:number,h:number,d:number,material:THREE.Material){const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);mesh.scale.set(w,h,d);parent.add(mesh);return mesh;}
  function board(parent:THREE.Object3D,x:number,y:number,z:number,w:number,h:number,material:THREE.Material,ry=0){const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),material);mesh.position.set(x,y,z);mesh.rotation.y=ry;parent.add(mesh);return mesh;}
  function floor(parent:THREE.Object3D,x:number,z:number,w:number,d:number,space:number,channel=false){
    const pickMaterial=channel?new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}):floorMaterial;
    const mesh=meshBox(parent,x,-.035,z,w,.1,d,pickMaterial);
    if(channel){const sideWidth=(w-1.5)/2;for(const sign of [-1,1])solid(parent,x+sign*(.75+sideWidth/2),-.035,z,sideWidth,.1,d,floorMaterial);for(const sign of [-1,1])solid(parent,x,-.035,z+sign*(d/2-.75),1.5,.1,1.5,floorMaterial);}mesh.userData.module=space;groundPickables.push(mesh);roomFloors.push(mesh);return mesh;
  }
  solid(common,0,-.8,3,44,1.4,125,materials.plinth);
  solid(common,0,-.055,3,4.1,.12,122,materials.trim);
  for(const x of [-22,22])solid(common,x,-.2,3,.09,.13,125,materials.glow);
  for(const z of [-59.5,65.5])solid(common,0,-.2,z,44,.13,.09,materials.glow);
  // A single central corridor follows the user's entry-to-rear narrative.
  for(let z=-54;z<59;z+=4){
    solid(common,0,.04,z,1.05,.025,.07,materials.glow,Math.PI/6);
    solid(common,.85,.04,z,1.05,.025,.07,materials.glow,-Math.PI/6);
  }
  function computer(parent:THREE.Object3D,x:number,z:number,rotation:number,hardware:boolean,kind:string){
    const local=(dx:number,y:number,dz:number,w:number,h:number,d:number,mat:THREE.Material)=>{const a=x+dx*Math.cos(rotation)+dz*Math.sin(rotation),b=z-dx*Math.sin(rotation)+dz*Math.cos(rotation);solid(parent,a,y,b,w,h,d,mat,rotation);};
    local(0,1.44,-.22,1.13,.7,.10,materials.dark);local(0,1.06,-.22,.09,.3,.09,materials.metal);local(0,.91,-.22,.44,.035,.28,materials.dark);
    const screenX=x+(-.159)*Math.sin(rotation),screenZ=z+(-.159)*Math.cos(rotation);board(parent,screenX,1.44,screenZ,1.03,.59,monitorMaterial,rotation);
    local(0,.93,.42,.88,.055,.32,materials.dark);for(let i=0;i<6;i++)local(-.35+i*.14,.963,.43,.075,.012,.18,materials.trim);
    local(.67,.93,.42,.13,.07,.19,materials.dark);
    if(hardware){
      local(.04,1.96,-.83,1.58,2.08,.55,materials.white);local(-.60,2.07,-.515,.15,1.52,.025,materials.blue);local(.57,2.07,-.515,.13,1.52,.025,materials.blue);
      local(.04,2.23,-.50,.80,.59,.03,materials.dark);local(.04,2.23,-.48,.70,.47,.015,materials.screen);
      for(let row=0;row<3;row++)for(let col=0;col<3;col++)local(-.27+col*.32,1.3+row*.21,-.48,.18,.15,.03,row%2?materials.dark:materials.blue);
      local(.1,3.1,-.82,.26,.14,.22,materials.dark);local(.1,3.03,-.82,.065,.22,.065,materials.metal);
    }
    const stool=kind==='bigdata'||hardware;
    local(0,.53,1.25,.75,.12,.71,stool?materials.wood:materials.blue);
    for(const dx of [-.30,.30])for(const dz of [1,1.5])local(dx,.26,dz,.045,.52,.045,materials.white);
    if(!stool){local(0,.96,1.55,.74,.68,.065,materials.white);for(const dx of [-.31,.31])local(dx,.69,1.53,.04,.76,.04,materials.white);}
  }
  function cableChannel(room:BaseRoom){
    const layer=cables[room.space];
    solid(layer,room.x,-.115,room.z,1.38,.2,room.depth-3,materials.dark);
    for(let n=0;n<13;n++)solid(layer,room.x-.58+n*.094,.013,room.z,.043,.028,room.depth-3.2,n%3?materials.wireBlue:materials.wireGreen);
    for(let z=room.z-room.depth/2+1.5;z<room.z+room.depth/2-1;z+=1.5){
      solid(layer,room.x,.044,z,1.48,.055,.07,materials.metal);
      solid(layer,room.x,.053,z+.72,1.35,.035,1.35,materials.glassFloor);
    }
    for(const dx of [-.74,.74])solid(layer,room.x+dx,.044,room.z,.065,.06,room.depth-3,materials.metal);
  }
  function newlandRack(parent:THREE.Object3D,x:number,z:number,rotation:number){
    const local=(dx:number,y:number,dz:number,w:number,h:number,d:number,mat:THREE.Material)=>solid(parent,x+dx*Math.cos(rotation)+dz*Math.sin(rotation),y,z-dx*Math.sin(rotation)+dz*Math.cos(rotation),w,h,d,mat,rotation);
    for(const dx of [-1.18,1.18])local(dx,1.7,-.7,.10,3.25,.10,materials.metal);
    local(0,1.85,-.7,2.3,2.55,.12,materials.white);
    for(let row=0;row<12;row++)for(let col=0;col<13;col++)local(-1.05+col*.175,.85+row*.19,-.625,.035,.035,.018,materials.trim);
    for(let row=0;row<3;row++)for(let col=0;col<3;col++){
      const dx=-.74+col*.72,y=1.12+row*.68;
      local(dx,y,-.51,.48,.42,.21,row===0?materials.dark:materials.blue);
      local(dx+.10,y+.08,-.395,.11,.07,.035,(row+col)%2?materials.glow:materials.red);
      local(dx,y-.30,-.37,.023,.20,.023,materials.wireBlue);
    }
    const bx=x-.58*Math.sin(rotation),bz=z-.58*Math.cos(rotation);board(parent,bx,3.4,bz,2.45,.52,newlandBoard,rotation);
    local(0,.9,.05,2.75,.13,1.45,materials.wood);for(const dx of [-1.15,1.15])local(dx,.45,.1,.075,.8,.075,materials.white);
    local(.2,1.23,.1,.95,.6,.08,materials.dark);local(.2,.98,.3,.7,.035,.26,materials.dark);
  }
  function createRoom(room:BaseRoom){
    const p=groups[room.space],{x,z,width:w,depth:d}=room;floor(p,x,z,w,d,room.space,room.kind!=='exhibition');
    // Back wall and exterior windows stay full height. Corridor walls are cut down.
    solid(p,x,1.78,z-d/2,w,3.55,.18,materials.wall);
    solid(p,x,0.36,z+d/2,w,.72,.18,materials.wall);
    const outer=x<0?x-w/2:x+w/2,inner=x<0?x+w/2:x-w/2;
    solid(p,outer,.45,z,.18,.9,d,materials.wall);solid(p,outer,3.25,z,.18,.65,d,materials.wall);
    solid(p,inner,.45,z-d*.25,.18,.9,d*.50,materials.wall);solid(p,inner,.45,z+d*.33,.18,.9,d*.32,materials.wall);
    solid(p,inner,.03,z+d*.05,.35,.055,2.2,materials.glow);
    for(let wz=z-d/2+2;wz<z+d/2-1;wz+=3.2){
      solid(p,outer,1.99,wz,.08,2.16,2.55,materials.window);
      for(const zz of [-1.33,0,1.33])solid(p,outer,1.99,wz+zz,.13,2.24,.065,materials.white);
      solid(p,outer,2,wz,.14,.07,2.75,materials.white);
      const inside=outer+(x<0?.17:-.17);
      for(const side of [-1,1])for(let n=0;n<3;n++)solid(p,inside+(n%2)*.08,1.95,wz+side*(.95+n*.1),.15,2.6,.14,materials.curtain);
    }
    // Omit roofs by default; the roof layer restores suspended tiles and lighting.
    solid(roofs[room.space],x,3.75,z,w,.12,d,ceilingMaterial);
    for(const dx of [-3.6,3.6])for(const dz of [-5.4,0,5.4])solid(roofs[room.space],x+dx,3.66,z+dz,1.15,.06,1.15,materials.light);
    if(room.kind==='exhibition'){createExhibition(p,room);return;}
    const deskX=3.65;
    if(room.kind==='operations'){
      for(const dx of [-3.85,3.85])for(const dz of [-4.2,1.3,5.7])newlandRack(p,x+dx,z+dz,dx<0?Math.PI/2:-Math.PI/2);
    }else{
      for(const side of [-1,1]){
        solid(p,x+side*deskX,.87,z,2.1,.15,d-4,materials.wood);
        for(const dz of [-5.7,-2.1,2.1,5.7])solid(p,x+side*deskX,.42,z+dz,1.5,.8,.10,materials.white);
        for(let n=0;n<7;n++)computer(p,x+side*deskX,z-5.4+n*1.8,side<0?Math.PI/2:-Math.PI/2,room.kind==='ai',room.kind);
      }
    }
    cableChannel(room);
    solid(p,x,1.53,z-d/2+.21,5.5,1.45,.14,materials.dark);
    if(room.kind!=='ai')board(p,x,1.53,z-d/2+.29,5.26,1.23,monitorMaterial);
    solid(p,x,.48,z-d/2+1.1,2,.9,.9,materials.trim);solid(p,x,.99,z-d/2+1.1,2.2,.13,1,materials.wood);
    const clock=new THREE.Mesh(new THREE.CircleGeometry(.27,24),materials.white);clock.position.set(x,2.58,z-d/2+.12);p.add(clock);
    solid(p,x,2.63,z-d/2+.13,.025,.20,.02,materials.dark);solid(p,x+.06,2.58,z-d/2+.14,.16,.025,.02,materials.dark);
  }
  function createExhibition(p:THREE.Group,room:BaseRoom){
    const {x,z}=room;
    solid(p,x,1.85,z-8.15,11,2.5,.16,materials.dark);board(p,x,1.85,z-8.04,10.5,2.12,textBoard('成果展示中心','师生作品 · 项目实践 · 校企合作'));
    // The exhibition's own road-table model is grounded in the project photograph.
    solid(p,x,.72,z-1,10,1.35,7,materials.white);solid(p,x,1.43,z-1,9.6,.10,6.6,materials.dark);
    for(const dx of [-4.85,4.85])solid(p,x+dx,1.5,z-1,.07,.06,6.7,materials.blue);
    solid(p,x,1.51,z-1,1,.02,6,materials.trim);solid(p,x,1.51,z-1,9,.02,.75,materials.trim);
    for(const dx of [-2.8,2.8])for(const dz of [-2.0,1]){
      solid(p,x+dx,1.55,z+dz,2.3,.06,1.85,materials.green);solid(p,x+dx,1.94,z+dz,.75,.75,.9,materials.white);
      for(let yy=0;yy<3;yy++)solid(p,x+dx,1.73+yy*.22,z+dz+.46,.61,.075,.025,materials.blue);
    }
    for(const dx of [-4,-2,2,4]){solid(p,x+dx,1.70,z-1,.45,.25,.3,materials.warm);solid(p,x+dx,1.86,z-1,.18,.08,.20,materials.dark);}
    for(const dx of [-5,5]){
      solid(p,x+dx,.74,z+5.2,2.7,.12,1.5,materials.white);for(const sx of [-1,1]){solid(p,x+dx+sx,.36,z+5.2,.06,.7,.06,materials.trim);solid(p,x+dx+sx,.48,z+6.4,.65,.12,.65,materials.dark);solid(p,x+dx+sx,.82,z+6.7,.65,.6,.08,materials.dark);}
    }
    for(const dx of [-6.2,6.2])board(p,x+dx,2,z-5.5,2.5,1.5,monitorMaterial,dx<0?Math.PI/2:-Math.PI/2);
  }
  const leafGeometry=new THREE.SphereGeometry(1,8,5);
  const potGeometry=new THREE.CylinderGeometry(.31,.24,.5,14);
  function plant(parent:THREE.Group,x:number,y:number,z:number,flower=false){
    const pot=new THREE.Mesh(potGeometry,materials.trim);pot.position.set(x,y+.25,z);parent.add(pot);
    for(let i=0;i<11;i++){
      const a=i*2.4,r=.16+(i%3)*.10;
      const leaf=new THREE.Mesh(leafGeometry,materials.green);leaf.position.set(x+Math.cos(a)*r,y+.55+(i%4)*.10,z+Math.sin(a)*r);leaf.scale.set(.12,.38,.055);leaf.rotation.set(Math.sin(a)*.9,a,Math.cos(a)*.9);parent.add(leaf);
      if(flower&&i%2===0){const bloom=new THREE.Mesh(leafGeometry,materials.red);bloom.position.copy(leaf.position);bloom.position.y+=.28;bloom.scale.set(.14,.065,.13);parent.add(bloom);}
    }
  }
  baseRooms.forEach(createRoom);
  // Mid-entry hall: gray floor, illuminated paired pillars, plants and slatted ceiling.
  floor(groups[3],0,10,42,16,3);
  for(const x of [-12,-4,4,12])for(const z of [6,14]){
    solid(groups[3],x,1.85,z,1.5,3.7,1.5,materials.wall);solid(groups[3],x,.16,z,1.7,.3,1.7,materials.dark);
    board(groups[3],x,1.9,z+.755,1.18,3.22,pillarMaterial);board(groups[3],x+.755,1.9,z,1.18,3.22,pillarMaterial,Math.PI/2);
  }
  for(let x=-20;x<=20;x+=.72)solid(roofs[3],x,4.05,10,.28,.3,16,materials.trim);
  for(const x of [-15,-5,5,15])solid(roofs[3],x,3.91,10,.17,.04,13,materials.light);
  solid(groups[3],0,.23,10,4.5,.45,3.2,materials.white);
  for(let i=0;i<12;i++)plant(groups[3],-1.7+(i%4)*1.1,.46,9+Math.floor(i/4)*.8,i%3!==0);
  for(const side of [-1,1]){
    solid(groups[3],side*11.5,1.9,2,19,3.8,.2,materials.wall);
    solid(groups[3],side*9,1.6,2.13,2.3,3.2,.07,materials.metal);
    solid(groups[3],side*9,1.6,2.18,.025,3.2,.035,materials.trim);
    solid(groups[3],side*21,1.9,10,.2,3.8,16,materials.wall);
    board(groups[3],side*16,1.9,2.14,4.4,2.2,textBoard('东数西算','数字人才 · 实践成长'));
    plant(groups[3],side*6,0,3.2);
  }
  // Front entrance is taken from the uploaded facade photograph.
  const front=groups[0];floor(front,0,61.5,42,6.5,0);
  for(const x of [-16,-7.7,0,7.7,16])solid(front,x,2.5,62,Math.abs(x)>10?10:1.2,5,.45,materials.wall);
  solid(front,0,5.35,62,42,.7,.55,materials.wall);solid(front,0,4.8,64,43,.4,4.5,materials.white);
  board(front,0,5.7,64.28,31,1.15,entranceBoard);
  for(const x of [-4,4]){
    solid(front,x,1.85,62,6.6,3.7,.12,materials.glass);for(const dx of [-3.3,0,3.3])solid(front,x+dx,1.85,62,.08,3.75,.13,materials.metal);
    for(const dx of [-.3,.3])solid(front,x+dx,1.3,62.13,.06,.85,.07,materials.metal);
  }
  for(const x of [-18,18]){
    solid(front,x,.42,64.2,3.5,.75,1.2,materials.white);
    for(let n=0;n<4;n++)plant(front,x-1.2+n*.8,.81,64.2);
  }
  for(let i=0;i<4;i++){solid(front,11+i*1.25,.56,64.5,1.08,.12,.8,materials.metal);solid(front,11+i*1.25,1.02,64.85,1.08,.85,.09,materials.blue);solid(front,11+i*1.25,.29,64.5,.075,.55,.7,materials.metal);}
  // Flush repeated geometry to per-space instances; hundreds of devices use few draw calls.
  batches.forEach((byMaterial,parent)=>byMaterial.forEach((matrices,mat)=>{
    const mesh=new THREE.InstancedMesh(geometry,mat,matrices.length);matrices.forEach((matrix,i)=>mesh.setMatrixAt(i,matrix));mesh.instanceMatrix.needsUpdate=true;parent.add(mesh);
  }));
  const stageGrid=new THREE.GridHelper(200,50,0x244450,0x17323e);stageGrid.position.set(0,-1.6,3);scene.add(stageGrid);
  const selectedMaterial=new THREE.LineBasicMaterial({color:0x8ff0d8});
  let outlines:THREE.LineLoop[]=[];
  function outline(x:number,z:number,w:number,d:number){
    const points=[[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2]].map(([dx,dz])=>new THREE.Vector3(x+dx,.14,z+dz));
    const line=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points),selectedMaterial);scene.add(line);outlines.push(line);
  }
  let selected=0,interior=false,top=false,cabling=true,ceiling=false;
  let transition:{from:THREE.Vector3;to:THREE.Vector3;lookFrom:THREE.Vector3;lookTo:THREE.Vector3;start:number}|null=null;
  let visible=true,frameId=0,destroyed=false;
  const fullTarget=new THREE.Vector3(0,0,3);
  const overall=()=>{const aspect=host.clientWidth/Math.max(host.clientHeight,1);const distance=aspect<.7?238:aspect<1?215:178;return aspect>1.2?new THREE.Vector3(distance*.78,distance*.70,distance*.37+3):new THREE.Vector3(distance*.32,distance*.62,distance*.76+3);};
  const anchors=baseSpaces.map(space=>new THREE.Vector3(...space.anchor as [number,number,number]));
  const representative=(index:number)=>baseRooms.find(room=>room.space===index);
  const layerState=()=>{
    groups.forEach((group,i)=>group.visible=!interior||i===selected);
    roofs.forEach((group,i)=>group.visible=(ceiling||interior)&&(!interior||i===selected));
    cables.forEach((group,i)=>group.visible=cabling&&(!interior||i===selected));
    common.visible=!interior;stageGrid.visible=!interior;outlines.forEach(line=>line.visible=!interior);
    host.dataset.mode=interior?'interior':top?'top':'overview';
    app.dispatchEvent(new CustomEvent('twin-mode',{detail:host.dataset.mode}));
  };
  function highlight(index:number){selected=index;outlines.forEach(line=>{scene.remove(line);line.geometry.dispose();});outlines=[];
    const rooms=baseRooms.filter(room=>room.space===index);if(rooms.length)rooms.forEach(room=>outline(room.x,room.z,room.width+.3,room.depth+.3));else outline(0,index===0?61.5:10,42,index===0?6.5:16);
  }
  function move(to:THREE.Vector3,target:THREE.Vector3){
    if(reduce.matches){transition=null;camera.position.copy(to);controls.target.copy(target);controls.update();}
    else transition={from:camera.position.clone(),to,lookFrom:controls.target.clone(),lookTo:target,start:performance.now()};
  }
  function focus(index:number,enter=false){
    interior=enter;if(enter)top=false;camera.fov=enter?58:38;camera.updateProjectionMatrix();highlight(index);layerState();controls.maxPolarAngle=enter?Math.PI*.52:Math.PI*.47;
    const room=representative(index);
    const target=room?new THREE.Vector3(room.x,1,room.z):new THREE.Vector3(0,1,index===0?61.5:10);
    if(enter&&index===0){
      move(new THREE.Vector3(8,7.5,97),new THREE.Vector3(0,2.4,62));
    }else if(enter&&index===1&&room){
      move(new THREE.Vector3(room.x+1.5,3.25,room.z+7.7),new THREE.Vector3(room.x,1.2,room.z-1.5));
    }else if(enter){
      const z=room?room.z+room.depth/2-.6:index===0?70:17;
      const lookZ=room?room.z-room.depth*.3:index===0?61:3;
      move(new THREE.Vector3(room?.x??0,1.9,z),new THREE.Vector3(room?.x??0,1.75,lookZ));
    }else{
      const d=host.clientWidth<500?43:35;
      move(top?new THREE.Vector3(target.x,50,target.z+.1):new THREE.Vector3(target.x+d*.64,d*.75,target.z+d*.80),target);
    }
  }
  function reset(immediate=false){interior=false;top=false;camera.fov=38;camera.updateProjectionMatrix();layerState();controls.maxPolarAngle=Math.PI*.47;
    if(immediate){transition=null;camera.position.copy(overall());controls.target.copy(fullTarget);controls.update();}else move(overall(),fullTarget);
  }
  const resize=()=>{if(destroyed)return;const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();if(interior)focus(selected,true);else reset(true);};
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize();highlight(0);
  controls.addEventListener('start',()=>{transition=null;app.dispatchEvent(new CustomEvent('twin-interact'));});
  app.addEventListener('twin-select',event=>{const {index,focus:zoom}=(event as CustomEvent).detail;highlight(index);if(zoom)focus(index);});
  app.addEventListener('twin-enter',event=>focus((event as CustomEvent).detail,true));
  app.addEventListener('twin-view',event=>{
    interior=false;camera.fov=38;camera.updateProjectionMatrix();top=(event as CustomEvent).detail==='top';layerState();controls.maxPolarAngle=Math.PI*.47;
    if(top){const y=host.clientWidth/host.clientHeight<.8?215:190;move(new THREE.Vector3(0,y,3.1),fullTarget);}else reset();
  });
  app.addEventListener('twin-reset',()=>reset());
  app.addEventListener('twin-tour',()=>{controls.autoRotate=false;});
  app.addEventListener('twin-layer',event=>{const {layer,visible}=(event as CustomEvent).detail;if(layer==='ceiling')ceiling=visible;if(layer==='cabling')cabling=visible;layerState();});
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down:{x:number;y:number}|null=null;
  canvas.addEventListener('pointerdown',event=>{down={x:event.clientX,y:event.clientY};});canvas.addEventListener('pointercancel',()=>{down=null;});
  canvas.addEventListener('pointerup',event=>{
    if(!down||Math.hypot(event.clientX-down.x,event.clientY-down.y)>6){down=null;return;}down=null;const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);
    const hit=raycaster.intersectObjects(groundPickables.filter(mesh=>mesh.parent?.visible),false)[0];if(hit)app.dispatchEvent(new CustomEvent('twin-pick',{detail:hit.object.userData.module}));
  });
  const labels=Array.from(app.querySelectorAll<HTMLElement>('[data-landmark]'));const projected=new THREE.Vector3();
  function frame(now:number){
    if(destroyed)return;if(!visible||document.hidden){frameId=0;return;}
    if(transition){const t=Math.min(1,(now-transition.start)/1100),e=1-Math.pow(1-t,4);camera.position.lerpVectors(transition.from,transition.to,e);controls.target.lerpVectors(transition.lookFrom,transition.lookTo,e);if(t===1)transition=null;}
    controls.update();
    const placed:{x:number;y:number;w:number;h:number}[]=[];
    baseSpaces.map((_,i)=>i).sort((a,b)=>anchors[b].clone().project(camera).y-anchors[a].clone().project(camera).y).forEach(i=>{
      const node=labels[i];projected.copy(anchors[i]).project(camera);const w=node.offsetWidth||110,h=node.offsetHeight||40;
      const hidden=interior||projected.z>1||projected.z< -1||Math.abs(projected.x)>1.06||Math.abs(projected.y)>1.06;
      node.style.visibility=hidden?'hidden':'visible';const leader=app.querySelector<SVGLineElement>(`[data-leader="${i}"]`)!;leader.style.display=hidden?'none':'';if(hidden)return;
      let x=Math.max(3,Math.min(host.clientWidth-w-3,(projected.x*.5+.5)*host.clientWidth-w/2));
      let y=Math.max(3,Math.min(host.clientHeight-h-3,(-projected.y*.5+.5)*host.clientHeight-h));
      for(let n=0;n<7;n++){const clash=placed.some(r=>x<r.x+r.w+5&&x+w+5>r.x&&y<r.y+r.h+5&&y+h+5>r.y);if(!clash)break;y=y+h+6<host.clientHeight-h?y+h+6:y-h-6;}
      placed.push({x,y,w,h});const ax=(projected.x*.5+.5)*host.clientWidth,ay=(-projected.y*.5+.5)*host.clientHeight;leader.setAttribute('x1',String(ax));leader.setAttribute('y1',String(ay+12));leader.setAttribute('x2',String(x+w/2));leader.setAttribute('y2',String(y+h));node.style.transform=`translate3d(${Math.round(x)}px,${Math.round(y)}px,0)`;
    });
    renderer.render(scene,camera);frameId=requestAnimationFrame(frame);
  }
  const resume=()=>{if(!frameId&&visible&&!document.hidden&&!destroyed)frameId=requestAnimationFrame(frame);};
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;resume();},{rootMargin:'100px'});intersection.observe(host);document.addEventListener('visibilitychange',resume);
  function destroy(){if(destroyed)return;destroyed=true;cancelAnimationFrame(frameId);controls.dispose();resizeObserver.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',resume);
    const geos=new Set<THREE.BufferGeometry>(),mats=new Set<THREE.Material>();scene.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.Line){geos.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(material=>mats.add(material));}});geos.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();}
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();destroy();fallback('三维显示暂不可用，请刷新恢复。空间文字与现场照片仍可查看。');});
  window.addEventListener('pagehide',event=>{if(!event.persisted)destroy();},{once:true});
  renderer.render(scene,camera);app.querySelector<HTMLElement>('[data-scene-loading]')!.hidden=true;host.dataset.ready='true';layerState();resume();
}
