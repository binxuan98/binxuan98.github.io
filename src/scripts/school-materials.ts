import * as THREE from 'three';
import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

/** Local CC0 assets: see public/images/school/materials/sources.json. */
export function schoolMaterials(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
  const pending: Promise<unknown>[] = [], textures: THREE.Texture[] = [];
  const loader = new THREE.TextureLoader();
  const texture = (name: string, color = false) => {
    let resolve!: (v: unknown) => void, reject!: (e: unknown) => void;
    const task = new Promise((a, b) => { resolve = a; reject = b; });
    pending.push(task); task.catch(() => {});
    const t = loader.load(`/images/school/materials/${name}`, resolve, undefined, reject);
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    if (color) t.colorSpace = THREE.SRGBColorSpace;
    textures.push(t); return t;
  };
  const surface = (asset: string, scale: number, color = '#ffffff', normal = .2) => {
    const m = new THREE.MeshStandardMaterial({color, map:texture(asset==='white_plaster_02'?'campus-wall.webp':`${asset}-color.webp`, true), normalMap:texture(`${asset}-normal.webp`), roughnessMap:texture(`${asset}-rough.webp`), roughness:1, normalScale:new THREE.Vector2(normal,normal)});
    // World-space mapping keeps real material grain consistent across instanced wall and road sizes.
    m.onBeforeCompile = shader => {
      shader.vertexShader = 'varying vec3 schoolWorld; varying vec3 schoolNormal;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
        vec4 schoolP = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          schoolP = instanceMatrix * schoolP;
        #endif
        schoolWorld = (modelMatrix * schoolP).xyz;
        schoolNormal = normalize(mat3(modelMatrix) * objectNormal);`);
      shader.fragmentShader = 'varying vec3 schoolWorld; varying vec3 schoolNormal;\n' + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `vec3 sn = abs(schoolNormal); vec2 schoolUV = (sn.y > .5 ? schoolWorld.xz : (sn.x > .5 ? schoolWorld.zy : schoolWorld.xy)) * ${scale.toFixed(4)};
        vec4 sampledDiffuseColor = texture2D(map, schoolUV); diffuseColor *= sampledDiffuseColor;`);
      shader.fragmentShader = shader.fragmentShader.replace('#include <roughnessmap_fragment>', THREE.ShaderChunk.roughnessmap_fragment.replaceAll('vRoughnessMapUv','schoolUV'));
      shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_maps>', THREE.ShaderChunk.normal_fragment_maps.replaceAll('vNormalMapUv','schoolUV'));
    };
    m.customProgramCacheKey = () => `school-surface-${scale}`;
    return m;
  };
  let environment: THREE.Texture | null = null, sky: THREE.Texture | null = null;let disposed=false;let contextMesh:THREE.Mesh|null=null;let contextMaterial:THREE.ShaderMaterial|null=null;
  const daylight = new RGBELoader().loadAsync('/images/school/materials/daylight.hdr').then(hdr => {
    sky = hdr; hdr.mapping = THREE.EquirectangularReflectionMapping;
    const pmrem = new THREE.PMREMGenerator(renderer); environment = pmrem.fromEquirectangular(hdr).texture;
    scene.environment = environment; scene.environmentIntensity = .65; scene.background = hdr;
    scene.backgroundIntensity = 1; scene.backgroundBlurriness = 0; pmrem.dispose();
    return new Promise<THREE.CubeTexture>((resolve,reject)=>new THREE.CubeTextureLoader().load(['l','r','u','d','b','f'].map(face=>`/images/school/panoramas/3327940/${face}.webp`),resolve,undefined,reject)).then(context=>{
      if(disposed){context.dispose();return;}context.colorSpace=THREE.SRGBColorSpace;sky=context;scene.background=new THREE.Color('#91badd');hdr.dispose();
      // Reproject the aerial source onto a level ground plane. A full background cube
      // otherwise puts a second oversized campus underneath the modeled campus.
      const grounded=new GroundedSkybox(null as unknown as THREE.Texture,85,1500,96);
      const uv=grounded.geometry.getAttribute('uv'),directions=new Float32Array(uv.count*3);
      for(let i=0;i<uv.count;i++){const phi=uv.getX(i)*Math.PI*2,theta=(1-uv.getY(i))*Math.PI;directions[i*3]=-Math.cos(phi)*Math.sin(theta);directions[i*3+1]=Math.cos(theta);directions[i*3+2]=-Math.sin(phi)*Math.sin(theta);}
      grounded.geometry.setAttribute('schoolSkyDirection',new THREE.BufferAttribute(directions,3));grounded.material.dispose();
      contextMaterial=new THREE.ShaderMaterial({uniforms:{schoolContext:{value:context},schoolBrightness:{value:1}},depthWrite:false,
        vertexShader:'attribute vec3 schoolSkyDirection; varying vec3 skyDirection; void main(){skyDirection=schoolSkyDirection; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
        fragmentShader:'uniform samplerCube schoolContext; uniform float schoolBrightness; varying vec3 skyDirection; void main(){vec3 d=normalize(skyDirection); gl_FragColor=textureCube(schoolContext,vec3(-d.x,d.yz));gl_FragColor.rgb=mix(vec3(.40,.43,.36),gl_FragColor.rgb,smoothstep(-.007,.008,d.y));gl_FragColor.rgb*=schoolBrightness;\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}'
      });
      grounded.material=contextMaterial;grounded.position.set((1100-535)*.44,84.9,(250-235)*.44);grounded.rotation.y=Math.PI/2;grounded.renderOrder=-2;scene.add(grounded);contextMesh=grounded;
    });
  }); pending.push(daylight); daylight.catch(() => {});
  return {texture, surface, ready: () => Promise.all(pending), sky: () => new THREE.Color('#91badd'), setContextNight(value:boolean){if(contextMaterial)contextMaterial.uniforms.schoolBrightness.value=value?.12:1;},
    dispose() {disposed=true;textures.forEach(t=>t.dispose()); environment?.dispose(); sky?.dispose();if(contextMesh){scene.remove(contextMesh);contextMesh.geometry.dispose();contextMaterial?.dispose();}}};
}
