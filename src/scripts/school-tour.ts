import * as THREE from 'three';
import { campusPanorama } from '../data/campus';
import type { createSchoolScene } from './school-scene';

const DURATION=180;
const chapters=[
  {start:0,end:16,title:'由此，走进庆阳职院',sub:'东校门 · 双弧门廊，开启校园之旅',label:'校园序章'},
  {start:16,end:36,title:'一湖毓秀，满园书香',sub:'毓秀湖 · 沿着水岸，看见校园的日常',label:'湖畔风景'},
  {start:36,end:58,title:'明理求真 · 精工致用',sub:'臻善楼 · 白色立面与中央玻璃幕墙',label:'校园中轴'},
  {start:58,end:72,title:'湖光与书香相伴',sub:'图书馆 · 连接学习、探索与成长',label:'书香校园'},
  {start:72,end:96,title:'尚能楼 · 从课堂走向实践',sub:'教学实训楼群 · 走近数字技术与智能装备课堂',label:'教学实训'},
  {start:96,end:114,title:'东数西算机房',sub:'尚能楼 · 走进数字技术教学空间',label:'数字技术',pano:4962283,ath:345,atv:8},
  {start:114,end:130,title:'工业机器人综合实训平台',sub:'尚能楼 · 在实训现场认识智能装备',label:'智能装备',pano:3896767,ath:42,atv:10},
  {start:130,end:146,title:'智能制造创新创业实训区',sub:'鲁班工坊 · 让创意与实践在这里相遇',label:'智能制造',pano:3907000,ath:-15,atv:4},
  {start:146,end:162,title:'智能家居实训区',sub:'鲁班工坊 · 探索万物互联的应用场景',label:'应用创新',pano:3918057,ath:12,atv:7},
  {start:162,end:180,title:'技能成就梦想，实践点亮未来',sub:'庆阳职业技术学院 · 欢迎您的到来',label:'相约庆阳职院'},
];
const poses=[[1090,280,38],[1010,250,20],[940,260,13],[875,279,19],[893,247,28],[854,215,38],[760,290,92],[620,174,62],[550,145,44]];
const targets=[[930,251,8],[835,248,10],[753,246,15],[733,246,18],[733,246,18],[890,356,18],[600,200,15],[490,87,16],[490,87,18]];
const curve=(points:number[][])=>new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p as [number,number,number])),false,'catmullrom',.3);
const flight=curve(poses),focus=curve(targets),outro=curve([[670,190,95],[930,343,82],poses[0]]),outroFocus=curve([[740,245,15],[820,250,12],targets[0]]);
const smooth=(t:number)=>{t=THREE.MathUtils.clamp(t,0,1);return t*t*(3-2*t);};

export function createSchoolTour(app:HTMLElement,engine:ReturnType<typeof createSchoolScene>,onExit:()=>void){
  const one=<T extends HTMLElement=HTMLElement>(s:string)=>app.querySelector<T>(s)!;
  const shell=one('[data-tour-shell]'),intro=one('[data-tour-intro]'),start=one<HTMLButtonElement>('[data-tour-start]'),fade=one('[data-tour-fade]'),controls=one('[data-tour-controls]'),pause=one('[data-tour-pause]'),seek=one<HTMLInputElement>('[data-tour-seek]');
  let active=false,playing=false,elapsed=0,current=-1,waiting=false,failed=false,session=0,hudTimer=0,countdownTimer=0,ownsFullscreen=false,lap=1;
  const sceneCanvas=one<HTMLCanvasElement>('.school-canvas canvas');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const showControls=()=>{app.dataset.tourControls='visible';window.clearTimeout(hudTimer);if(playing)hudTimer=window.setTimeout(()=>{app.dataset.tourControls='hidden';},2200);};
  function pauseLabel(){pause.textContent=playing?'暂停':'继续';pause.setAttribute('aria-label',playing?'暂停自动巡游':'继续自动巡游');app.dataset.tourPlaying=String(playing);}
  function setPlaying(value:boolean){playing=value;pauseLabel();showControls();}
  function caption(index:number){const c=chapters[index];one('[data-tour-title]').textContent=c.title;one('[data-tour-subtitle]').textContent=c.sub;one('[data-tour-chapter]').textContent=`${String(index+1).padStart(2,'0')} / ${chapters.length} · ${c.label}`;one('[data-tour-kind]').textContent='pano' in c?'校园实景 · 拍摄存档':'数字校园 · 三维巡游';one('[data-announcement]').textContent=`自动巡游：${c.title}`;}
  function sceneFor(index:number){const c=chapters[index];return 'pano' in c?campusPanorama.scenes.find(s=>s.id===c.pano):undefined;}
  async function applyChapter(index:number){
    current=index;caption(index);const source=sceneFor(index),ticket=session;
    if(source){waiting=true;fade.style.opacity='1';try{const ok=await engine.panorama(source);if(!active||ticket!==session)return;if(!ok)throw new Error('Panorama interrupted');app.dataset.mode='panorama';const next=sceneFor(index+1);if(next)engine.preloadPanorama(next).catch(()=>{});}catch{if(ticket!==session)return;setPlaying(false);one('[data-tour-feedback]').textContent='实景暂时未载入，点击继续重试，或退出巡游。';current=-1;failed=true;}finally{if(ticket===session)waiting=false;}}
    else{engine.campus();app.dataset.mode='campus';}
  }
  function pose(){
    const index=Math.max(0,chapters.findIndex(c=>elapsed>=c.start&&elapsed<c.end));if(index!==current){void applyChapter(index);if(waiting)return;}
    const c=chapters[index],u=(elapsed-c.start)/(c.end-c.start);let opacity=0;
    if('pano' in c){engine.panoramaPose(c.ath+(reduced?14:28*u),c.atv,68-(reduced?0:3*u));opacity=Math.max(1-smooth((elapsed-c.start)/1.1),smooth((elapsed-c.end+1.1)/1.1));}
    else{const t=elapsed<96?elapsed/96:(elapsed-162)/18;const fixed=reduced?(elapsed<96?(c.start+c.end)/192:.5):t;engine.cameraPose((elapsed<96?flight:outro).getPoint(fixed).toArray(),(elapsed<96?focus:outroFocus).getPoint(fixed).toArray(),elapsed<96?46:48);if(elapsed<96)opacity=Math.max(1-smooth(elapsed/1.2),smooth((elapsed-94.8)/1.2));else opacity=Math.max(1-smooth((elapsed-162)/1.2),smooth((elapsed-178.8)/1.2));}
    fade.style.opacity=String(opacity);seek.value=String(elapsed);one('[data-tour-progress]').style.transform=`scaleX(${elapsed/DURATION})`;one('[data-tour-time]').textContent=`${Math.floor(elapsed/60)}:${String(Math.floor(elapsed%60)).padStart(2,'0')} / 3:00`;
    app.dataset.tourTime=elapsed.toFixed(2);app.dataset.tourChapter=String(index);app.dataset.tourLap=String(lap);
  }
  function update(dt:number){if(!active||intro.hidden===false||!one('[data-tour-countdown]').hidden||waiting||failed)return;if(playing){elapsed+=dt;if(elapsed>=DURATION){if(one<HTMLInputElement>('[data-tour-loop]').checked){elapsed=0;current=-1;lap++;}else{elapsed=DURATION-.01;setPlaying(false);one('[data-tour-feedback]').textContent='本轮巡游已结束，可从头播放。';}}}pose();}
  async function prepare(){
    start.disabled=true;one('[data-tour-status]').textContent='正在准备材质与实训实景，完成后即可播放';
    const ticket=session;
    try{await engine.ready();const scenes=chapters.flatMap(c=>'pano' in c?[campusPanorama.scenes.find(s=>s.id===c.pano)!]:[]);
      await Promise.all(scenes.flatMap(s=>['l','r','u','d','b','f'].map(async face=>{const response=await fetch(`/images/school/panoramas/${s.id}/${face}.webp`,{cache:'force-cache'});if(!response.ok)throw new Error('Image unavailable');await response.arrayBuffer();})));
      await engine.preloadPanorama(scenes[0]);if(ticket!==session||!active)return;
      one('[data-tour-status]').textContent=reduced?'已就绪 · 已按系统偏好减少镜头移动':'已就绪 · 画面与实景已准备好';start.disabled=false;
    }catch{if(ticket!==session||!active)return;one('[data-tour-status]').textContent='部分画面未能准备好，请检查网络后重试。';one<HTMLButtonElement>('[data-tour-prepare-retry]').hidden=false;}
  }
  async function open(){if(active)return;active=true;sceneCanvas.inert=true;session++;elapsed=0;lap=1;current=-1;playing=false;waiting=false;failed=false;intro.hidden=false;shell.hidden=false;controls.hidden=true;one('[data-tour-countdown]').hidden=true;one('[data-tour-feedback]').textContent='';app.classList.add('is-showcase');engine.setNight(false);engine.campus();engine.setCinematic(true,update);engine.cameraPose(poses[0],targets[0],46);fade.style.opacity='0';showControls();one('[data-tour-close-intro]').focus();void prepare();}
  function stop(){if(!active)return;active=false;sceneCanvas.inert=false;session++;setPlaying(false);clearTimeout(hudTimer);clearInterval(countdownTimer);engine.setCinematic(false);engine.campus();shell.hidden=true;app.classList.remove('is-showcase');if(ownsFullscreen&&document.fullscreenElement)void document.exitFullscreen().catch(()=>{});ownsFullscreen=false;onExit();one('[data-tour]').focus();}
  start.addEventListener('click',()=>{
    if(start.disabled)return;sceneCanvas.inert=false;intro.hidden=true;controls.hidden=false;elapsed=0;current=-1;const counter=one('[data-tour-countdown]');let n=3;counter.hidden=false;counter.textContent=String(n);fade.style.opacity='.45';one<HTMLCanvasElement>('.school-canvas canvas').focus();
    if(one<HTMLInputElement>('[data-tour-fullscreen]').checked&&document.fullscreenEnabled&&!document.fullscreenElement)app.requestFullscreen().then(()=>{if(!active){void document.exitFullscreen();return;}ownsFullscreen=true;}).catch(()=>{one('[data-tour-feedback]').textContent='可使用浏览器全屏键放大画面。';});
    countdownTimer=window.setInterval(()=>{n--;if(n===0){clearInterval(countdownTimer);counter.hidden=true;setPlaying(true);pose();}else counter.textContent=String(n);},1000);
  });
  pause.addEventListener('click',()=>{if(failed){failed=false;current=-1;}setPlaying(!playing);if(playing)sceneCanvas.focus();one('[data-tour-feedback]').textContent='';});
  const restart=()=>{elapsed=0;current=-1;session++;waiting=false;failed=false;one('[data-tour-feedback]').textContent='';setPlaying(true);pose();};
  one('[data-tour-restart]').addEventListener('click',()=>{restart();sceneCanvas.focus();});
  document.addEventListener('fullscreenchange',()=>{if(active&&ownsFullscreen&&!document.fullscreenElement)stop();});
  seek.addEventListener('input',()=>{setPlaying(false);elapsed=Math.min(DURATION-.01,Number(seek.value));session++;waiting=false;failed=false;current=-1;pose();});
  one('[data-tour-exit]').addEventListener('click',stop);one('[data-tour-close-intro]').addEventListener('click',stop);
  one('[data-tour-prepare-retry]').addEventListener('click',()=>{const url=new URL(location.href);url.searchParams.set('showcase','1');location.assign(url.toString());});
  app.addEventListener('pointerdown',()=>{if(active)showControls();});
  intro.addEventListener('keydown',event=>{if(event.key!=='Tab')return;const items=Array.from(intro.querySelectorAll<HTMLElement>('button:not(:disabled):not([hidden]),input:not(:disabled),a[href]'));const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}});
  app.addEventListener('pointermove',()=>{if(active)showControls();});app.addEventListener('focusin',()=>{if(active)showControls();});
  document.addEventListener('keydown',e=>{if(!active)return;if(e.key==='Escape'){e.preventDefault();stop();}else if(intro.hidden&&one('[data-tour-countdown]').hidden&&!(e.target instanceof HTMLInputElement)){if(e.code==='Space'){e.preventDefault();setPlaying(!playing);}else if(e.code==='KeyR'){restart();}}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&active){setPlaying(false);clearInterval(countdownTimer);one('[data-tour-countdown]').hidden=true;one('[data-tour-feedback]').textContent='巡游已暂停，返回后点击继续。';}});
  window.addEventListener('pagehide',stop,{once:true});
  return {open,stop,isActive:()=>active};
}
