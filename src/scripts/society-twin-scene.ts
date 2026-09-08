import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/** Conceptual spatial arrangement. These positions are not geographic coordinates. */
const places = [
  { x: -19, z: -10, h: 7.5, color: 0x72d9d0 },
  { x: -19, z: 13, h: 5, color: 0xa4d3b3 },
  { x: 0, z: -11, h: 14.5, color: 0x86cde8 },
  { x: 18, z: -9, h: 10, color: 0x82c8da },
  { x: 18, z: 13, h: 6, color: 0xe1c48b },
];

export function initSocietyTwin(app: HTMLElement, fallback: (message?: string) => void) {
  const host = app.querySelector<HTMLElement>('[data-twin-scene]')!;
  const canvas = app.querySelector<HTMLCanvasElement>('[data-twin-canvas]')!;
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'default' }); }
  catch { fallback(); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setClearColor(0x091923, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.45;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b1b26, .0075);
  scene.add(new THREE.HemisphereLight(0xbdebf4, 0x19313d, 2.8));
  const sun = new THREE.DirectionalLight(0xc2e9ff, 3.2);
  sun.position.set(-25, 65, 30);
  scene.add(sun);
  const warmLight = new THREE.DirectionalLight(0x73e9cf, 1.5);
  warmLight.position.set(30, 20, -30);
  scene.add(warmLight);
  const camera = new THREE.PerspectiveCamera(40, 1, .5, 400);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = .07;
  controls.enablePan = false;
  controls.minDistance = 40;
  controls.maxDistance = 160;
  controls.maxPolarAngle = Math.PI * .43;
  controls.minPolarAngle = .06;
  controls.rotateSpeed = .55;
  controls.zoomSpeed = .65;
  controls.autoRotateSpeed = .3;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;
  let animationFrame = 0;
  let visible = true;
  let destroyed = false;
  let transition: { from: THREE.Vector3; to: THREE.Vector3; lookFrom: THREE.Vector3; lookTo: THREE.Vector3; start: number } | null = null;
  let topView = false;
  const ground = new THREE.Group();
  scene.add(ground);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const materials = {
    base: new THREE.MeshStandardMaterial({ color: 0x172f3c, roughness: .85, metalness: .3 }),
    tile: new THREE.MeshStandardMaterial({ color: 0x1d3d48, roughness: .7 }),
    road: new THREE.MeshStandardMaterial({ color: 0x0a1c28, roughness: .9 }),
    wall: new THREE.MeshStandardMaterial({ color: 0x498494, roughness: .45, metalness: .3 }),
    roof: new THREE.MeshStandardMaterial({ color: 0x27505e, roughness: .65, metalness: .3 }),
    green: new THREE.MeshStandardMaterial({ color: 0x21534c, roughness: 1 }),
    tree: new THREE.MeshStandardMaterial({ color: 0x3a8171, roughness: .85 }),
    window: new THREE.MeshBasicMaterial({ color: 0xa5e2df, transparent: true, opacity: .82 }),
    line: new THREE.MeshBasicMaterial({ color: 0x5e8992 }),
    cyan: new THREE.MeshBasicMaterial({ color: 0x77e7d6 }),
    gold: new THREE.MeshBasicMaterial({ color: 0xe9ca8c }),
  };
  const box = (parent: THREE.Object3D, x: number, y: number, z: number, w: number, h: number, d: number, material: THREE.Material) => {
    const mesh = new THREE.Mesh(boxGeometry, material);
    mesh.position.set(x, y, z); mesh.scale.set(w, h, d); parent.add(mesh); return mesh;
  };
  box(ground, 0, -.65, 0, 64, 1.2, 51, materials.base);
  box(ground, 0, -.02, 0, 63.5, .12, 50.5, materials.tile);
  // Four illuminated edges define the concept model's physical plinth.
  box(ground, 0, -.25, 25.5, 64, .08, .07, materials.cyan);
  box(ground, 0, -.25, -25.5, 64, .08, .07, materials.cyan);
  box(ground, -32, -.25, 0, .07, .08, 51, materials.cyan);
  box(ground, 32, -.25, 0, .07, .08, 51, materials.cyan);
  const grid = new THREE.GridHelper(180, 60, 0x25414c, 0x18303c);
  grid.position.y = -1.4;
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = .45;
  scene.add(grid);
  const road = (x: number, z: number, w: number, d: number) => box(ground, x, .075, z, w, .09, d, materials.road);
  road(0, 1, 61, 4.5);
  road(-9.6, 0, 3.8, 48); road(9.6, 0, 3.8, 48);
  road(0, -22, 61, 2.6); road(0, 23, 61, 2.4);
  road(-29.5, 0, 2.5, 47); road(29.5, 0, 2.5, 47);
  for (let x = -28; x <= 28; x += 2.4) box(ground, x, .132, 1, 1, .018, .07, materials.line);
  for (const x of [-9.6, 9.6]) for (let z = -21; z <= 23; z += 2.4) box(ground, x, .132, z, .07, .018, 1, materials.line);
  for (const x of [-9.6, 9.6]) for (const z of [-1.6, 3.6]) for (let n = -3; n <= 3; n++) box(ground, x + n * .36, .14, z, .2, .02, 1.1, materials.line);
  // Shared instance buffers keep the city affordable on mobile GPUs.
  const windowTransforms: THREE.Matrix4[] = [];
  const treeTransforms: THREE.Matrix4[] = [];
  const transform = new THREE.Object3D();
  const instance = (target: THREE.Matrix4[], x: number, y: number, z: number, w: number, h: number, d: number, rotation = 0) => {
    transform.position.set(x,y,z); transform.scale.set(w,h,d); transform.rotation.set(0,rotation,0); transform.updateMatrix(); target.push(transform.matrix.clone());
  };
  const pickable: THREE.Object3D[] = [];
  function building(parent: THREE.Group, x: number, z: number, w: number, d: number, h: number, id: number) {
    const body = box(parent,x,h/2+.25,z,w,h,d,materials.wall);
    if (id >= 0) { body.userData.module = id; pickable.push(body); }
    box(parent,x,.27,z,w+.8,.35,d+.8,materials.roof);
    box(parent,x,h+.4,z,w+.15,.35,d+.15,materials.roof);
    box(parent,x,h+.65,z,w*.52,.24,d*.45,materials.base);
    const accent = new THREE.MeshBasicMaterial({ color: places[id]?.color ?? 0x78afc1 });
    box(parent,x,h+.58,z+d/2,.12+w,.07,.055,accent);
    box(parent,x-w/2,h+.58,z,.055,.07,d,accent);
    for(let y=1.05;y<h-.15;y+=1.12) {
      // Thin horizontal mullions divide the glass into readable floors.
      box(parent,x,y+.27,z+d/2+.025,w,.06,.04,materials.roof);
      for(let u=-w/2+.45;u<w/2-.2;u+=.8) {
        instance(windowTransforms,x+u,y,z+d/2+.03,.37,.47,.035);
        instance(windowTransforms,x+u,y,z-d/2-.03,.37,.47,.035);
      }
      for(let u=-d/2+.45;u<d/2-.2;u+=.8) {
        instance(windowTransforms,x+w/2+.03,y,z+u,.035,.47,.37);
        instance(windowTransforms,x-w/2-.03,y,z+u,.035,.47,.37);
      }
    }
  }
  const districts: THREE.Group[] = [];
  const pads: THREE.Mesh[] = [];
  places.forEach((p,i) => {
    const district = new THREE.Group(); ground.add(district); districts.push(district);
    const padMaterial = new THREE.MeshStandardMaterial({ color: p.color, transparent:true, opacity:.13, roughness:.85 });
    pads.push(box(district,p.x,.16,p.z,15,.13,16,padMaterial));
    if(i===0) {
      building(district,p.x-3,p.z,4.2,9,7.5,i);
      building(district,p.x+3.1,p.z-2,4.2,5,5.7,i);
      box(district,p.x,3,p.z-2,3,1.4,2,materials.wall);
      for(let a=0;a<4;a++) box(district,p.x+3.5,.4,p.z+3+a*.65,4,.4,.28,materials.roof);
    } else if(i===1) {
      building(district,p.x-3.2,p.z-2,4.5,6,4.8,i);
      building(district,p.x+2.8,p.z+1,4.5,8,3.7,i);
      box(district,p.x-3,.22,p.z+4,5,.12,3,materials.green);
      for(let a=0;a<3;a++) box(district,p.x+2.8,4.4,p.z-1+a*1.5,3.5,.08,.7,materials.cyan);
    } else if(i===2) {
      building(district,-2.1,p.z,4.7,6.2,14.5,i);
      building(district,3,p.z+1.1,3.5,5.5,10.5,i);
      building(district,-.2,p.z+4.8,9,2.6,3.1,i);
      box(district,-2.1,17,p.z,.1,4,.1,materials.cyan);
    } else if(i===3) {
      building(district,p.x-2.7,p.z-2,5,5,10,i);
      building(district,p.x+3.2,p.z+1.5,4.1,8,6.5,i);
      for(let a=0;a<3;a++) box(district,p.x-2.7,10.85,p.z-3.2+a*1.1,3.8,.35,.55,materials.base);
    } else {
      building(district,p.x-3,p.z,4.5,11,5.5,i);
      building(district,p.x+3.1,p.z,4.5,11,5.5,i);
      for(const dx of [-3,3.1]) for(let a=0;a<5;a++) box(district,p.x+dx,6.1,p.z-3.9+a*1.9,2.8,.2,1,materials.base);
    }
    for (let a=0;a<6;a++) {
      instance(treeTransforms,p.x-6.5,.9,p.z-5.8+a*2.2,.75,1.5,.75);
      instance(treeTransforms,p.x+6.5,.9,p.z-5.8+a*2.2,.75,1.5,.75);
    }
  });
  // Shared innovation plaza: rings, entrance walk, pavilion and garden terraces.
  const ring = (radius: number, width: number, color: number, opacity = 1) => {
    const mesh = new THREE.Mesh(new THREE.RingGeometry(radius-width,radius,80),new THREE.MeshBasicMaterial({color,transparent:opacity<1,opacity,side:THREE.DoubleSide}));
    mesh.rotation.x = -Math.PI/2; return mesh;
  };
  for (const radius of [3.3,4.3,5.9]) { const r=ring(radius,.1,0x69bcb5,.75);r.position.set(0,.22,11.5);ground.add(r); }
  const podium = new THREE.Mesh(new THREE.CylinderGeometry(2.7,3.1,.5,48),materials.roof);
  podium.position.set(0,.35,11.5);ground.add(podium);
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(1.5),new THREE.MeshStandardMaterial({color:0x80e5d7,metalness:.55,roughness:.23,emissive:0x135849,emissiveIntensity:.5}));
  core.position.set(0,3,11.5);ground.add(core);
  const coreEdge = new THREE.LineSegments(new THREE.EdgesGeometry(core.geometry),new THREE.LineBasicMaterial({color:0xc1fff2}));core.add(coreEdge);
  for(let z=19;z<22;z+=.65)box(ground,0,.2,z,4,.13,.33,materials.line);
  for(const x of [-5.7,5.7])for(const z of [6,9,15,18]) {box(ground,x,.17,z,1.4,.1,1.4,materials.green);instance(treeTransforms,x,1,z,.9,1.8,.9);}
  for(let x=-26;x<27;x+=2.2)for(const z of [-24,24.5])instance(treeTransforms,x,.8,z,.6,1.4,.6);
  // Peripheral water garden and parking bays make the spatial scale legible.
  box(ground,26.4,.15,-11,2.3,.08,17,new THREE.MeshStandardMaterial({color:0x246e7c,metalness:.7,roughness:.25}));
  for(let z=-18;z<-3;z+=2)box(ground,26.4,.21,z,1.8,.025,.045,materials.line);
  for(let x=-25;x<-13;x+=1.1) {box(ground,x,.14,20,.03,.02,1.5,materials.line);if(Math.round(x*10)%3===0)box(ground,x+.5,.4,20,.6,.45,1.05,materials.roof);}
  const makeInstances = (geo: THREE.BufferGeometry, material: THREE.Material, matrices: THREE.Matrix4[]) => {
    const mesh = new THREE.InstancedMesh(geo,material,matrices.length);
    matrices.forEach((matrix,index)=>mesh.setMatrixAt(index,matrix));mesh.instanceMatrix.needsUpdate=true;ground.add(mesh);return mesh;
  };
  makeInstances(boxGeometry,materials.window,windowTransforms);
  makeInstances(new THREE.ConeGeometry(.65,1,7),materials.tree,treeTransforms);
  // Context massing is intentionally subdued and is not a real city footprint.
  const context = new THREE.Group(); scene.add(context);
  const contextMat = new THREE.MeshStandardMaterial({color:0x1b3544,transparent:true,opacity:.48,roughness:1});
  for(let i=0;i<34;i++) {
    const x=-67+(i%17)*8.1;
    const z=i<17?-43:42;
    const h=2+((i*13)%11);
    box(context,x,h/2-1.1,z+Math.sin(i*4)*4,3+(i%3),h,4+(i%4),contextMat);
  }
  const connections = new THREE.Group(); ground.add(connections);
  const pulses: {mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; offset:number}[] = [];
  places.forEach((p,i)=>{
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0,1.6,11.5),new THREE.Vector3(p.x*.5,12+Math.abs(p.z)*.15,(11.5+p.z)/2),new THREE.Vector3(p.x,p.h+.9,p.z));
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(65)),new THREE.LineBasicMaterial({color:i===4?0xe1bc78:0x68c8c1,transparent:true,opacity:.44}));connections.add(line);
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(.15,8,6),i===4?materials.gold:materials.cyan);connections.add(mesh);pulses.push({mesh,curve,offset:i*.17});
  });
  const selection = ring(7.6,.13,0x9ef4da,.8);
  selection.position.set(places[0].x,.28,places[0].z);ground.add(selection);
  const traffic: {mesh:THREE.Mesh; direction:number; offset:number}[]=[];
  for(let i=0;i<10;i++) {
    const direction=i%2===0?1:-1;
    const mesh=box(ground,0,.3,1+direction*1.1,.7,.25,.35,i%3===0?materials.gold:materials.cyan);
    traffic.push({mesh,direction,offset:i*.1});
  }
  const labels = Array.from(app.querySelectorAll<HTMLElement>('[data-landmark]'));
  const projected = new THREE.Vector3();
  const overview = () => {
    const aspect=host.clientWidth / Math.max(host.clientHeight,1);
    const distance = aspect < .8 ? 125 : aspect < 1.2 ? 108 : 95;
    return new THREE.Vector3(distance*.49,distance*.65,distance*.67);
  };
  function moveCamera(position:THREE.Vector3,target:THREE.Vector3) {
    if(reducedMotion.matches){camera.position.copy(position);controls.target.copy(target);controls.update();transition=null;}
    else transition={from:camera.position.clone(),to:position,lookFrom:controls.target.clone(),lookTo:target,start:performance.now()};
  }
  function reset(immediate=false){
    topView=false;
    if(immediate){camera.position.copy(overview());controls.target.set(0,1.5,0);controls.update();}
    else moveCamera(overview(),new THREE.Vector3(0,1.5,0));
  }
  function resize(){
    if(destroyed)return;
    const w=host.clientWidth,h=host.clientHeight;
    if(!w||!h)return;
    renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
    // Resizing always returns to a readable full-model framing.
    transition=null;reset(true);
    app.querySelectorAll<HTMLElement>('[data-view]').forEach(node=>node.setAttribute('aria-pressed',String(node.dataset.view==='perspective')));
  }
  const observer=new ResizeObserver(resize);observer.observe(host);resize();
  controls.addEventListener('start',()=>{transition=null;app.dispatchEvent(new CustomEvent('twin-interact'));});
  app.addEventListener('twin-select',(event)=>{
    const {index,focus}=(event as CustomEvent).detail;selected=index;
    const p=places[index];selection.position.set(p.x,.28,p.z);
    pads.forEach((pad,i)=>{(pad.material as THREE.MeshStandardMaterial).opacity=i===index?.25:.11;});
    if(focus){
      const target=new THREE.Vector3(p.x*.5,2,p.z*.45);
      const offset=overview().multiplyScalar(host.clientWidth<500?.9:.79);
      moveCamera(topView?new THREE.Vector3(target.x,100,target.z+.1):offset.add(target),target);
    }
  });
  app.addEventListener('twin-view',(event)=>{
    topView=(event as CustomEvent).detail==='top';
    const position=topView?new THREE.Vector3(0,host.clientWidth/host.clientHeight<.85?125:102,.1):overview();
    moveCamera(position,new THREE.Vector3(0,1.5,0));
  });
  app.addEventListener('twin-reset',()=>reset());
  app.addEventListener('twin-tour',(event)=>{controls.autoRotate=(event as CustomEvent).detail&&!reducedMotion.matches;});
  app.addEventListener('twin-layer',(event)=>{const {layer,visible}=(event as CustomEvent).detail;if(layer==='connections')connections.visible=visible;});
  const raycaster=new THREE.Raycaster();const mouse=new THREE.Vector2();
  let down: {x:number;y:number}|null=null;
  canvas.addEventListener('pointerdown',event=>{down={x:event.clientX,y:event.clientY};});
  canvas.addEventListener('pointercancel',()=>{down=null;});
  canvas.addEventListener('pointerup',event=>{
    if(!down||Math.hypot(event.clientX-down.x,event.clientY-down.y)>6){down=null;return;}down=null;
    const rect=canvas.getBoundingClientRect();mouse.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
    raycaster.setFromCamera(mouse,camera);const hit=raycaster.intersectObjects(pickable,false)[0];
    if(hit)app.dispatchEvent(new CustomEvent('twin-pick',{detail:hit.object.userData.module}));
  });
  function frame(now:number){
    if(destroyed)return;
    if(!visible||document.hidden){animationFrame=0;return;}
    if(transition){
      const t=Math.min(1,(now-transition.start)/1100);const ease=1-Math.pow(1-t,4);
      camera.position.lerpVectors(transition.from,transition.to,ease);controls.target.lerpVectors(transition.lookFrom,transition.lookTo,ease);if(t===1)transition=null;
    }
    controls.update();
    if(!reducedMotion.matches){
      const time=now*.00008;core.rotation.y=now*.00022;
      pulses.forEach(({mesh,curve,offset})=>mesh.position.copy(curve.getPoint((time+offset)%1)));
      traffic.forEach(({mesh,direction,offset})=>{mesh.position.x=(((time*1.6+offset)%1)*56-28)*direction;});
    } else {pulses.forEach(({mesh,curve,offset})=>mesh.position.copy(curve.getPoint(.2+offset*.7)));traffic.forEach(({mesh,offset})=>mesh.position.x=offset*56-28);}
    const placed:{x:number;y:number;w:number;h:number}[]=[];
    // Place the active landmark first; displace other labels to avoid overlap.
    const order=[selected,...places.map((_,i)=>i).filter(i=>i!==selected)];
    order.forEach(i=>{
      const p=places[i];projected.set(p.x,p.h+2.4,p.z).project(camera);
      const node=labels[i],w=node.offsetWidth||108,h=node.offsetHeight||42;
      let x=(projected.x*.5+.5)*host.clientWidth-w/2;
      let y=(-projected.y*.5+.5)*host.clientHeight-h;
      const behind=projected.z>1||projected.z< -1;
      node.style.visibility=behind?'hidden':'visible';
      x=Math.max(3,Math.min(host.clientWidth-w-3,x));y=Math.max(10,Math.min(host.clientHeight-h-5,y));
      for(let attempt=0;attempt<5;attempt++){
        if(!placed.some(r=>x<r.x+r.w+5&&x+w+5>r.x&&y<r.y+r.h+5&&y+h+5>r.y))break;
        y=y+h+6<host.clientHeight-h?y+h+6:y-h-6;
      }
      placed.push({x,y,w,h});node.style.transform=`translate3d(${Math.round(x)}px,${Math.round(y)}px,0)`;
    });
    renderer.render(scene,camera);animationFrame=requestAnimationFrame(frame);
  }
  const resume=()=>{if(!animationFrame&&visible&&!document.hidden&&!destroyed)animationFrame=requestAnimationFrame(frame);};
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;resume();},{rootMargin:'100px'});intersection.observe(host);
  document.addEventListener('visibilitychange',resume);
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();destroy();fallback('三维显示已暂停，请刷新页面恢复。仍可通过下方入口查看全部培养内容。');});
  function destroy(){
    if(destroyed)return;destroyed=true;cancelAnimationFrame(animationFrame);controls.dispose();observer.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',resume);
    const geometries=new Set<THREE.BufferGeometry>();const allMaterials=new Set<THREE.Material>();
    scene.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.Line){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(material=>allMaterials.add(material));}});
    geometries.forEach(geometry=>geometry.dispose());allMaterials.forEach(material=>material.dispose());renderer.dispose();
  }
  window.addEventListener('pagehide',event=>{if(!event.persisted)destroy();},{once:true});
  renderer.render(scene,camera);
  app.querySelector<HTMLElement>('[data-scene-loading]')!.hidden=true;
  host.dataset.ready='true';
  app.querySelectorAll<HTMLInputElement>('[data-layer]').forEach(input=>{
    if(input.dataset.layer==='connections')connections.visible=input.checked;
  });
  resume();
}
