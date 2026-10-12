'use strict';
// ===== player, controls, calibration =====
(()=>{
const cv=document.getElementById('c'),o=cv.getContext('2d'),hud=document.getElementById('hud');
finalize();
let T=0,paused=!!QS.pause,dbg=!!QS.dbg,cal=!!QS.cal,sel=0,help=false,last=performance.now();
let mirror=true;try{if(localStorage.hw_mirror==='0')mirror=false}catch(e){}if(QS.mirror==='0')mirror=false;
let CAL;try{CAL=JSON.parse(localStorage.hw_cal)}catch(e){}
if(!(CAL&&CAL.length==4))CAL=[0,1,2,3].map(()=>({dx:0,dy:0,dw:0,dh:0}));
const save=()=>{try{localStorage.hw_cal=JSON.stringify(CAL)}catch(e){}};
if(QS.s!=null)T=SCENES[+QS.s].start+(+QS.t||0);

const HELP=`HALLOWEEN WINDOW
F fullscreen   M mirror (now ${mirror?'ON':'OFF'})   P pause   D debug
N/B next/previous scene   1-4 jump to act   H this help
C calibrate: 1-4 pick pane, arrows move, Shift+arrows resize, R reset pane`;
function overlay(){
  CFG.panes.forEach((p,i)=>{const c=CAL[i],x=p.x+c.dx,y=p.y+c.dy,w=p.w+c.dw,h=p.h+c.dh,col=i==sel?'#ff0':'#fff';
    o.save();o.fillStyle='rgba(255,255,255,.18)';o.fillRect(x,y,w,h);o.strokeStyle=col;o.lineWidth=i==sel?6:3;o.strokeRect(x,y,w,h);
    o.beginPath();o.moveTo(x,y);o.lineTo(x+w,y+h);o.moveTo(x+w,y);o.lineTo(x,y+h);o.stroke();
    o.translate(x+w/2,y+h/2);if(mirror)o.scale(-1,1);o.fillStyle=col;o.font='bold 90px sans-serif';o.textAlign='center';o.textBaseline='middle';o.fillText(p.k,0,0);o.restore()});
}
let fps=60,fc=0,ft=performance.now();
function hudUpdate(i,t){const s=SCENES[i];fc++;if(performance.now()-ft>1000){fps=fc;fc=0;ft=performance.now()}
  hud.style.display=(dbg||cal||help)?'block':'none';
  hud.textContent=(help||cal?HELP.replace(/now \w+/,'now '+(mirror?'ON':'OFF'))+'\n\n':'')+(cal?`CALIBRATING  pane ${CFG.panes[sel].k}  ${JSON.stringify(CAL[sel])}\n`:'')+
    `Act ${s.act}  #${i+1}/${SCENES.length}  ${s.name}  ${t.toFixed(1)}/${s.dur.toFixed(0)}s  loop ${(T%TOTAL/60).toFixed(1)}/${(TOTAL/60).toFixed(0)}min${paused?'  [PAUSED]':''}  ${fps}fps`}
function draw(){
  const[i,t]=locate(T);renderScene(i,t,o,CAL);if(cal)overlay();
  cv.style.transform=`translate(-50%,-50%) scaleX(${mirror?-1:1})`;hudUpdate(i,t);
}
function go(d){const[i]=locate(T),n=(i+d+SCENES.length)%SCENES.length;T=SCENES[n].start+.01}
addEventListener('keydown',e=>{const k=e.key,K=k.toLowerCase();wl();
  if(K=='f')document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
  else if(K=='m'){mirror=!mirror;try{localStorage.hw_mirror=mirror?1:0}catch(x){}}
  else if(K=='p')paused=!paused;
  else if(K=='d')dbg=!dbg;
  else if(K=='h')help=!help;
  else if(K=='c'){cal=!cal;if(!cal)save()}
  else if(cal&&'1234'.includes(k))sel=+k-1;
  else if(cal&&K=='r'){CAL[sel]={dx:0,dy:0,dw:0,dh:0};save()}
  else if(cal&&k.startsWith('Arrow')){e.preventDefault();const c=CAL[sel],st=e.shiftKey?2:2,v={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[k],sg=mirror?-1:1;
    if(e.shiftKey){c.dw+=v[0]*st*sg;c.dh+=v[1]*st;if(mirror)c.dx-=v[0]*st*sg}else{c.dx+=v[0]*st*sg;c.dy+=v[1]*st}save()}
  else if(K=='n'||k=='ArrowRight')go(1);
  else if(K=='b'||k=='ArrowLeft')go(-1);
  else if('1234'.includes(k)){const n=SCENES.findIndex(s=>s.act==+k);if(n>=0)T=SCENES[n].start+.01}
});
let lock;async function wl(){try{if(!lock||lock.released)lock=await navigator.wakeLock.request('screen')}catch(e){}}
wl();document.addEventListener('visibilitychange',()=>{if(!document.hidden)wl()});
if(QS.still){(document.fonts?document.fonts.ready:Promise.resolve()).then(()=>setTimeout(()=>{draw();document.title='ready'},300))}
else{const frame=n=>{const dt=M.min(.1,(n-last)/1e3);last=n;if(!paused)T+=dt;draw();requestAnimationFrame(frame)};requestAnimationFrame(frame)}
})();
