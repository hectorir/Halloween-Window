'use strict';
// ===== Halloween Window — engine =====
const W=1180,H=1080,TAU=Math.PI*2,M=Math;
const QS=Object.fromEntries(new URLSearchParams(location.search));
const cl=(v,a=0,b=1)=>M.min(b,M.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t;
const sm=t=>{t=cl(t);return t*t*(3-2*t)};                 // smoothstep
const pr=(t,a,b)=>cl((t-a)/(b-a));                         // progress of t between a..b
const eb=t=>{t=cl(t)-1;return 1+2.7*t*t*t+1.7*t*t};       // ease-out-back
const rr=n=>{const x=M.sin(n*127.1+311.7)*43758.5453;return x-M.floor(x)}; // hash 0..1

// Glass areas in a 1180x1080 canvas (20px/inch). Fine-tune live with calibration mode (C).
const CFG={
  panes:[{k:'UL',x:42,y:42,w:448,h:430},{k:'UR',x:690,y:42,w:448,h:430},
         {k:'LL',x:42,y:600,w:448,h:438},{k:'LR',x:690,y:600,w:448,h:438}],
  wins:[{x:0,y:0,w:532,h:1080},{x:648,y:0,w:532,h:1080}],
  fade:1.5
};

// ---- scene registry. kind: A=all 4 panes, P=per window (upper+lower pair), S=per pane ----
const SCENES=[];
function S(act,name,dur,kind,fn){SCENES.push({act,name,dur,kind,fn})}
let TOTAL=3600;
function finalize(){const sum=SCENES.reduce((a,s)=>a+s.dur,0),k=3600/sum;let at=0;
  SCENES.forEach(s=>{s.dur*=k;s.start=at;at+=s.dur;s.end=at});TOTAL=at}
function locate(T){T=((T%TOTAL)+TOTAL)%TOTAL;for(let i=0;i<SCENES.length;i++)if(T<SCENES[i].end)return[i,T-SCENES[i].start];return[SCENES.length-1,0]}

// ---- Halloween countdown (laptop clock; ?date=2026-10-20 to preview) ----
function halloween(){
  const n=QS.date?new Date(QS.date+'T20:00:00'):new Date(),y=n.getFullYear(),d0=new Date(y,9,31),d1=new Date(y,10,1);
  if(n>=d0&&n<d1)return{state:'tonight',d:0,h:0,m:0,s:0};
  if(n>=d1&&n.getMonth()==10)return{state:'after',d:0,h:0,m:0,s:0};
  const tg=n>=d1?new Date(y+1,9,31):d0,s=M.floor((tg-n)/1000);
  return{state:'before',d:M.floor(s/86400),h:M.floor(s%86400/3600),m:M.floor(s%3600/60),s:s%60};
}

// ---- render pipeline ----
const mk=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
const sc=mk(W,H),sg=sc.getContext('2d'),b1=mk(W>>2,H>>2),b2=mk(W>>3,H>>3),b1g=b1.getContext('2d'),b2g=b2.getContext('2d');
function drawScene(g,s,t){
  g.save();g.fillStyle='#000';g.fillRect(0,0,W,H);
  if(s.kind=='A')s.fn(g,t);
  else{
    const rs=s.kind=='P'?CFG.wins:CFG.panes;
    rs.forEach((r,i)=>{g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.translate(r.x,r.y);s.fn(g,t,null,i,r.w,r.h);g.restore()});
  }
  g.restore();
  const f=sm(M.min(t/CFG.fade,(s.dur-t)/CFG.fade));
  if(f<1){g.fillStyle=`rgba(0,0,0,${1-f})`;g.fillRect(0,0,W,H)}
}
function bloom(g){
  b1g.drawImage(sc,0,0,b1.width,b1.height);b2g.drawImage(b1,0,0,b2.width,b2.height);
  g.save();g.globalCompositeOperation='lighter';g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';
  g.globalAlpha=.3;g.drawImage(b1,0,0,W,H);g.globalAlpha=.36;g.drawImage(b2,0,0,W,H);g.restore();
}
function renderScene(i,t,o,cal){
  drawScene(sg,SCENES[i],t);bloom(sg);
  o.fillStyle='#000';o.fillRect(0,0,W,H);
  CFG.panes.forEach((p,k)=>{const c=cal[k];o.drawImage(sc,p.x,p.y,p.w,p.h,p.x+c.dx,p.y+c.dy,p.w+c.dw,p.h+c.dh)});
}
