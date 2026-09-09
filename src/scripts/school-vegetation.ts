import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/** Branch and leaf geometry is instanced; foliage textures use actual CC0 leaf photographs. */
export function addSchoolVegetation(root: THREE.Group, positions: THREE.Vector3[], texture: (name:string,color?:boolean)=>THREE.Texture, bark: THREE.Material) {
  let seed=78231; const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  const trunkParts: THREE.BufferGeometry[] = [], leafParts: THREE.BufferGeometry[] = [], pineParts: THREE.BufferGeometry[] = [];
  function branch(a:THREE.Vector3,b:THREE.Vector3,r:number) {
    const g=new THREE.CylinderGeometry(r*.3,r,a.distanceTo(b),6,1);g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),b.clone().sub(a).normalize()));g.translate(...a.clone().add(b).multiplyScalar(.5).toArray());trunkParts.push(g);
  }
  const leaves=new THREE.MeshStandardMaterial({map:texture('leaves.webp',true),alphaTest:.48,side:THREE.DoubleSide,roughness:.82,color:'#dae0af'});
  const needles=new THREE.MeshStandardMaterial({map:texture('twigs.webp',true),alphaTest:.42,side:THREE.DoubleSide,roughness:.92,color:'#bacaa3'});
  // Atlas rectangles exclude the dilation borders and unrelated pieces in source scans.
  function card(x:number,y:number,z:number,w:number,h:number,rx:number,ry:number,rz:number,rect:number[],out:THREE.BufferGeometry[]) {
    const g=new THREE.PlaneGeometry(w,h);const uv=g.getAttribute('uv');for(let i=0;i<uv.count;i++)uv.setXY(i,(rect[0]+uv.getX(i)*rect[2])/1024,1-(rect[1]+(1-uv.getY(i))*rect[3])/1024);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x,y,z),new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,ry,rz)),new THREE.Vector3(1,1,1)));out.push(g);
  }
  branch(new THREE.Vector3(),new THREE.Vector3(.1,6.6,0),.23);
  for(let j=0;j<11;j++){const a=j*2.399,r=1.6+random()*1.4,y=3.4+random()*3.5;branch(new THREE.Vector3(0,1.8+j*.29,0),new THREE.Vector3(Math.cos(a)*r,y,Math.sin(a)*r),.095);}
  for(let j=0;j<950;j++){
    const y=random()*2-1,a=random()*Math.PI*2,r=Math.cbrt(random()),s=Math.sqrt(1-y*y)*r;
    card(Math.cos(a)*s*3,5.5+y*r*3.1,Math.sin(a)*s*2.7,.49+random()*.23,.39+random()*.19,random()*Math.PI,random()*Math.PI*2,random()*2,[28,167,190,155],leafParts);
  }
  for(let layer=0;layer<11;layer++){const y=1.5+layer*.59,r=(1-layer/12)*2.65;
    for(let j=0;j<27;j++){const a=j/27*Math.PI*2+layer*.61,dist=(.3+random()*.7)*r;card(Math.cos(a)*dist,y+random()*.6,Math.sin(a)*dist,r*.9,r*.8,-.7+random()*1.4,-a,random()*.3,[183,24,282,307],pineParts);}}
  const trunkGeo=mergeGeometries(trunkParts),leafGeo=mergeGeometries(leafParts),pineGeo=mergeGeometries(pineParts);
  [...trunkParts,...leafParts,...pineParts].forEach(g=>g.dispose());
  const trunks=new THREE.InstancedMesh(trunkGeo,bark,positions.length),broad=new THREE.InstancedMesh(leafGeo,leaves,positions.length),pines=new THREE.InstancedMesh(pineGeo,needles,positions.length);
  const dummy=new THREE.Object3D();let n=0,p=0;
  positions.forEach((pos,i)=>{const conifer=i%4===0,scale=.75+random()*.65;dummy.position.copy(pos);dummy.rotation.set(0,random()*Math.PI*2,0);dummy.scale.set(scale,scale*(.9+random()*.2),scale);dummy.updateMatrix();trunks.setMatrixAt(i,dummy.matrix);const m=conifer?pines:broad;const idx=conifer?p++:n++;m.setMatrixAt(idx,dummy.matrix);m.setColorAt(idx,new THREE.Color().setHSL(.20+random()*.06,.2+random()*.12,.64+random()*.2));});
  broad.count=n;pines.count=p;
  for(const m of [trunks,broad,pines]){m.castShadow=true;m.receiveShadow=true;root.add(m);m.computeBoundingSphere();}
  return {dispose(){[trunkGeo,leafGeo,pineGeo].forEach(g=>g.dispose());leaves.dispose();needles.dispose();}};
}
