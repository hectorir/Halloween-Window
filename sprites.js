'use strict';
// ===== shared drawing helpers & sprites =====
const FONT='Creepster,"Chalkduster","Marker Felt",Impact,fantasy';
function ell(g,x,y,rx,ry,f,rot=0){g.beginPath();g.ellipse(x,y,M.max(rx,.01),M.max(ry,.01),rot,0,TAU);if(f){g.fillStyle=f;g.fill()}}
function ln(g,p,col,w){g.beginPath();p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.strokeStyle=col;g.lineWidth=w;g.lineCap=g.lineJoin='round';g.stroke()}
function poly(g,p,f){g.beginPath();p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.closePath();if(f){g.fillStyle=f;g.fill()}}
function xf(g,x,y,s,r,f){g.save();g.translate(x,y);g.rotate(r||0);g.scale(s,s);f();g.restore()}
function vg(g,x,y,w,h,c1,c2){const q=g.createLinearGradient(0,y,0,y+h);q.addColorStop(0,c1);q.addColorStop(1,c2);g.fillStyle=q;g.fillRect(x,y,w,h)}
function rg(g,x,y,r,rgb,a=1){g.save();const q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,`rgba(${rgb},${a})`);q.addColorStop(1,`rgba(${rgb},0)`);g.fillStyle=q;g.fillRect(x-r,y-r,r*2,r*2);g.restore()}
function glow(g,c,b=20){g.shadowColor=c;g.shadowBlur=b}
function txt(g,s,x,y,sz,col='#fff',o={}){g.save();g.font=`${sz}px ${FONT}`;g.textAlign=o.al||'center';g.textBaseline='middle';
  g.shadowColor=o.gc||col;g.shadowBlur=o.glow??18;if(o.stroke){g.lineWidth=o.sw||6;g.strokeStyle=o.stroke;g.lineJoin='round';g.strokeText(s,x,y)}
  g.fillStyle=col;g.fillText(s,x,y);g.restore()}
function stars(g,x,y,w,h,t,n=30,sd=0){g.save();g.fillStyle='#fff';for(let i=0;i<n;i++){g.globalAlpha=.3+.7*M.abs(M.sin(t*(.6+rr(i+sd)*1.5)+i));const r=1.5+rr(i+sd+50)*2.5;g.fillRect(x+rr(i+sd+7)*w,y+rr(i+sd+13)*h,r,r)}g.restore()}
function fog(g,x,y,w,h,t,rgb='150,170,200',a=.25,n=6){for(let i=0;i<n;i++)rg(g,x+((rr(i)*w+t*(8+i*3))%(w+240))-120,y+rr(i+9)*h,130+rr(i+3)*130,rgb,a)}
function spark(g,x,y,r,col='#fff',rot=0){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle=col;g.shadowColor=col;g.shadowBlur=10;g.beginPath();
  for(let i=0;i<8;i++){const a=i*TAU/8,d=i%2?r*.25:r;g.lineTo(M.cos(a)*d,M.sin(a)*d)}g.closePath();g.fill();g.restore()}
function burst(g,x,y,n,age,o={}){const sp=o.sp||200,gr=o.g||300,col=o.col||'#ffe9a0',sz=o.sz||4,life=o.life||1.5,sd=o.seed||0;
  if(age<0||age>life)return;g.save();g.globalAlpha*=1-age/life;g.shadowColor=col;g.shadowBlur=8;
  for(let i=0;i<n;i++){const a=rr(i+sd)*TAU,v=sp*(.3+rr(i+sd+99)*.7);ell(g,x+M.cos(a)*v*age,y+M.sin(a)*v*age+gr*age*age*.5,sz,sz,Array.isArray(col)?col[i%col.length]:col)}g.restore()}
function flame(g,x,y,s,t,col='#ffb020'){g.save();g.translate(x,y);g.scale(s,s*(1+.12*M.sin(t*17)));g.rotate(M.sin(t*9)*.08);g.shadowColor=col;g.shadowBlur=30;
  g.beginPath();g.moveTo(0,-46);g.bezierCurveTo(26,-14,20,16,0,16);g.bezierCurveTo(-20,16,-26,-14,0,-46);g.fillStyle=col;g.fill();g.shadowBlur=0;
  g.beginPath();g.moveTo(0,-22);g.bezierCurveTo(12,-6,10,10,0,10);g.bezierCurveTo(-10,10,-12,-6,0,-22);g.fillStyle='#fff6c0';g.fill();g.restore()}

// ---- pumpkin: e=eye open, m=mouth open, k=face style 0..2, lit=glow ----
function pumpkin(g,x,y,s,o={}){
  const e=o.e??1,m=o.m??.3,k=o.k||0,lit=o.lit??1;
  g.save();g.translate(x,y);g.scale(s,s);
  g.shadowColor='#ff7a00';g.shadowBlur=lit*34;
  ell(g,-30,0,40,46,'#ff8a1f');ell(g,30,0,40,46,'#ff8a1f');ell(g,0,0,38,50,'#ffa032');g.shadowBlur=0;
  g.strokeStyle='#b34700';g.lineWidth=4;for(const d of[-1,1]){g.beginPath();g.moveTo(d*14,-48);g.quadraticCurveTo(d*40,0,d*14,48);g.stroke()}
  poly(g,[[-8,-46],[-4,-68],[10,-64],[9,-46]],'#4fae35');
  if(!o.nf){g.save();g.translate((o.fs||0)*-34,0);g.scale(o.fx??1,1);
  g.fillStyle=lit>=1?'#fff0a0':lit<=0?'#3a1800':mixc([58,24,0],[255,240,160],lit);g.shadowColor='#ffd000';g.shadowBlur=lit*16;
  const eye=cx=>{g.beginPath();if(k==1)g.ellipse(cx,-14,9,M.max(1,11*e),0,0,TAU);
    else if(k==2){const r=cx<0?13:6;g.ellipse(cx,-14,r,M.max(1,r*e),0,0,TAU)}
    else{g.moveTo(cx-12,-8);g.lineTo(cx+12,-8);g.lineTo(cx,-8-M.max(2,24*e))}g.closePath();g.fill()};
  eye(-20);eye(20);g.beginPath();g.moveTo(0,-2);g.lineTo(-6,8);g.lineTo(6,8);g.fill();
  const mh=3+m*30;g.beginPath();
  if(k==1)g.ellipse(0,26,12+m*8,mh*.7,0,0,TAU);
  else{g.moveTo(-32,16);for(let i=1;i<=8;i++)g.lineTo(-32+i*8,16+(i%2?-5:3));g.quadraticCurveTo(0,16+mh*2,-32,16)}
  g.fill();g.restore()}
  g.restore();
}
// ---- ghost: ey=eye open, m=mouth, sx/sy squash, a=alpha ----
function ghost(g,x,y,s,o={}){
  const t=o.t||0,ey=o.ey??1,mo=o.m??.2;
  g.save();g.translate(x,y);g.rotate(o.r||0);g.scale(s*(o.sx||1),s*(o.sy||1));g.globalAlpha*=o.a??1;
  g.shadowColor=o.gc||'#8fe8ff';g.shadowBlur=30;g.fillStyle=o.col||'#e6f8ff';
  g.beginPath();g.moveTo(-40,40);g.lineTo(-40,-10);g.bezierCurveTo(-40,-72,40,-72,40,-10);g.lineTo(40,40);
  for(let i=0;i<4;i++){const x0=40-i*20;g.quadraticCurveTo(x0-10,40+24*(.6+.4*M.sin(t*6+i*1.7)),x0-20,40)}
  g.closePath();g.fill();g.shadowBlur=0;
  ell(g,-15,-20,7,M.max(1,11*ey),'#12122a');ell(g,15,-20,7,M.max(1,11*ey),'#12122a');ell(g,0,8,7+mo*4,3+mo*13,'#12122a');
  g.restore();
}
function bat(g,x,y,s,f,col='#b266ff'){
  g.save();g.translate(x,y);g.scale(s,s);g.fillStyle=col;g.shadowColor=col;g.shadowBlur=12;const w=M.sin(f);
  for(const d of[-1,1]){g.beginPath();g.moveTo(d*5,-2);g.quadraticCurveTo(d*22,-28-w*22,d*50,-14-w*34);g.quadraticCurveTo(d*40,-4,d*36,6);g.quadraticCurveTo(d*26,0,d*18,10);g.quadraticCurveTo(d*10,2,d*5,8);g.closePath();g.fill()}
  ell(g,0,3,8,12,col);poly(g,[[-6,-8],[-8,-20],[-1,-10]],col);poly(g,[[6,-8],[8,-20],[1,-10]],col);
  g.shadowBlur=0;ell(g,-3,0,1.8,1.8,'#ff3355');ell(g,3,0,1.8,1.8,'#ff3355');g.restore();
}
function spider(g,x,y,s,t,col='#8cff4f'){
  g.save();g.translate(x,y);g.scale(s,s);g.shadowColor=col;g.shadowBlur=14;
  for(const d of[-1,1])for(let i=0;i<4;i++){
    const w=M.sin(t*9+i*1.3+(d>0?1.6:0))*5,y0=-6+i*5;
    ln(g,[[d*8,y0],[d*(26+i%2*8),y0-18+i*4+w],[d*(46+i%2*10),y0+6+i*9+w*1.5]],col,4)}
  ell(g,0,6,15,19,col);ell(g,0,-16,10,9,col);g.shadowBlur=0;ell(g,-4,-18,2.5,3,'#f22');ell(g,4,-18,2.5,3,'#f22');ell(g,0,8,5,9,'rgba(0,40,0,.55)');g.restore();
}
function skull(g,x,y,s,o={}){
  const c=o.col||'#f4f0e0',j=o.jaw||0,K='#10101c';
  g.save();g.translate(x,y);g.rotate(o.r||0);g.scale(s,s);g.shadowColor='#bfe';g.shadowBlur=o.glow??12;
  ell(g,0,-6,30,28,c);g.beginPath();g.roundRect(-18,10,36,14,5);g.fillStyle=c;g.fill();
  g.beginPath();g.roundRect(-16,24+j*16,32,13,6);g.fill();g.shadowBlur=0;
  ell(g,-12,-4,8.5,10.5,K);ell(g,12,-4,8.5,10.5,K);poly(g,[[0,8],[-4,15],[4,15]],K);
  g.strokeStyle=K;g.lineWidth=2.5;for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(i*5,14);g.lineTo(i*5,24);g.moveTo(i*5,24+j*16);g.lineTo(i*5,33+j*16);g.stroke()}
  if(o.eyec){ell(g,-12,-4,4,5,o.eyec);ell(g,12,-4,4,5,o.eyec)}
  g.restore();
}
// ---- skeleton rig. Angles: 0 = hanging down, + swings toward +x ----
function limb(g,x,y,a1,a2,L1,L2,w=9){const c='#f4f0e0',x1=x+M.sin(a1)*L1,y1=y+M.cos(a1)*L1,x2=x1+M.sin(a1+a2)*L2,y2=y1+M.cos(a1+a2)*L2;
  ln(g,[[x,y],[x1,y1],[x2,y2]],c,w);ell(g,x1,y1,w*.7,w*.7,c);ell(g,x2,y2,w*.6,w*.6,c)}
function skel(g,x,y,s,p={}){
  const c='#f4f0e0';g.save();g.translate(x,y-(p.hop||0));g.scale(s,s);g.shadowColor='#9fe';g.shadowBlur=10;
  const ll=p.ll||[.1,.1],rl=p.rl||[-.1,.1],la=p.la||[-.3,-.2],ra=p.ra||[.3,.2];
  limb(g,-12,0,ll[0],ll[1],50,48);limb(g,12,0,rl[0],rl[1],50,48);
  g.rotate(p.lean||0);ln(g,[[0,0],[0,-70]],c,8);ell(g,0,2,22,9,c);
  for(let i=0;i<4;i++){g.beginPath();g.ellipse(0,-26-i*11,22-i*2,6,0,0,TAU);g.strokeStyle=c;g.lineWidth=5;g.stroke()}
  limb(g,-24,-66,la[0],la[1],42,38,8);limb(g,24,-66,ra[0],ra[1],42,38,8);
  if(!p.nohead)skull(g,p.hx||0,-96+(p.hy||0),.9,{r:p.hr||0,jaw:p.jaw||0,glow:0});
  g.restore();
}
function sdance(t,ph=0){const a=t*7+ph,b=M.sin(a),c=M.cos(a);
  return{hop:M.abs(b)*8,lean:b*.07,la:[-1.9+c*.7,-.3+b*.5],ra:[1.9-c*.7,.3-b*.5],ll:[-.15+b*.25,.2+M.max(0,b)*.4],rl:[.15+b*.25,.2+M.max(0,-b)*.4],hr:b*.1}}
function swalk(t,ph=0){const a=t*6+ph,b=M.sin(a);
  return{hop:M.abs(M.cos(a))*4,lean:.04,la:[b*.7,-.3],ra:[-b*.7,.3],ll:[-b*.6,M.max(0,b)*.8],rl:[b*.6,M.max(0,-b)*.8],hr:0}}
function eye(g,x,y,s,o={}){
  const open=o.open??1,lx=o.lx||0,ly=o.ly||0,col=o.col||'#ffe14d',h=M.max(.5,34*open);
  g.save();g.translate(x,y);g.scale(s,s);g.beginPath();g.moveTo(-50,0);g.quadraticCurveTo(0,-h*2,50,0);g.quadraticCurveTo(0,h*2,-50,0);g.closePath();
  g.shadowColor=col;g.shadowBlur=26;g.fillStyle=o.sc||'#fffbe0';g.fill();g.shadowBlur=0;g.save();g.clip();
  ell(g,lx*22,ly*12,26,26,col);ell(g,lx*22,ly*12,o.round?12:5,o.round?12:22,'#000');g.restore();g.restore();
}
function moon(g,x,y,r,o={}){
  rg(g,x,y,r*2.4,'255,240,170',.35);g.save();g.shadowColor='#fff0a0';g.shadowBlur=40;ell(g,x,y,r,r,o.col||'#fff6c8');g.restore();
  for(const[a,b,c]of[[-.3,-.25,.18],[.35,.1,.12],[-.1,.4,.1],[.2,-.5,.08]])ell(g,x+a*r,y+b*r,c*r,c*r*.9,'rgba(200,185,120,.45)');
  if(o.face){const l=o.look||0;for(const d of[-1,1]){ell(g,x+d*.36*r,y-.12*r,.17*r,.2*r,'#1a1030');ell(g,x+d*.36*r+l*.07*r,y-.1*r,.06*r,.09*r,'#fff')}
    g.beginPath();g.moveTo(x-.4*r,y+.35*r);g.quadraticCurveTo(x+l*.1*r,y+.55*r,x+.4*r,y+.3*r);g.strokeStyle='#1a1030';g.lineWidth=r*.06;g.lineCap='round';g.stroke()}
}
function tomb(g,x,y,s,t='RIP',col='#8c97b8'){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle=col;g.shadowColor=col;g.shadowBlur=8;
  g.beginPath();g.moveTo(-30,0);g.lineTo(-30,-60);g.arc(0,-60,30,M.PI,0);g.lineTo(30,0);g.closePath();g.fill();g.shadowBlur=0;
  g.strokeStyle='#5b6585';g.lineWidth=3;g.stroke();txt(g,t,0,-52,22,'#232a48',{glow:0});g.restore()}
// zombie hand, wrist at (x,y) pointing up. f=[thumbOut, curl x4 ... ] use o.c (0..1 curl), o.th (thumb 0..1), o.sp splay
function zhand(g,x,y,s,o={}){
  const col=o.col||'#8fd16a',c=o.c??0,th=o.th??0,sp=o.sp??.12;
  g.save();g.translate(x,y);g.rotate(o.r||0);g.scale(s,s);g.shadowColor='#6f6';g.shadowBlur=14;
  ln(g,[[0,260],[0,0]],col,28);ell(g,0,-12,30,34,col);
  [-22,-8,6,20].forEach((px,i)=>{const L=[34,42,40,32][i],a=(i-1.5)*sp,p1=[px+M.sin(a)*L*.6,-34-M.cos(a)*L*.6],b=a-c*1.9,p2=[p1[0]+M.sin(b)*L*.55,p1[1]-M.cos(b)*L*.55];ln(g,[[px,-34],p1,p2],col,12)});
  ln(g,[[-24,-4],[lerp(-34,-40,th),lerp(-8,-34,th)],[lerp(-8,-34,th),lerp(-22,-70,th)]],col,13);
  g.shadowBlur=0;g.restore();
}
function crow(g,x,y,s,o={}){ // facing +x unless o.dir=-1; o.fl = flap phase (flying) else perched
  const d=o.dir||1,fly=o.fl!=null;
  g.save();g.translate(x,y);g.scale(s*d,s);g.shadowColor='#8f8cff';g.shadowBlur=8;const c='#1b1838';
  ell(g,0,-20,26,15,c,-.3);ell(g,24,-36,11,10,c);poly(g,[[33,-38],[50,-33],[33,-31]],'#3a3566');poly(g,[[-18,-14],[-52,-2],[-46,-14]],c);
  if(fly){const w=M.sin(o.fl);poly(g,[[-6,-24],[-36,-24-w*50],[-44,-18-w*40],[8,-16]],c)}else poly(g,[[-14,-26],[-34,-8],[4,-12]],'#26224a');
  if(!fly){ln(g,[[-4,-8],[-4,0]],'#6a66b0',3);ln(g,[[6,-8],[6,0]],'#6a66b0',3)}
  g.shadowBlur=0;ell(g,28,-38,2.5,2.5,o.ec||'#fff');g.restore();
}
function cat(g,x,y,s,o={}){ // sitting cat facing viewer; o.paw 0..1 reach right, o.tail phase, o.lx look, o.ec eye color
  const c='#2b1b52',paw=o.paw||0;g.save();g.translate(x,y);g.scale(s,s);g.shadowColor='#a07bff';g.shadowBlur=14;
  ln(g,[[34,-4],[62,-10+M.sin(o.tail||0)*10],[70,-44+M.sin((o.tail||0)+1)*14],[52,-74+M.sin((o.tail||0)+2)*14]],c,12);
  g.fillStyle=c;g.beginPath();g.moveTo(-34,0);g.bezierCurveTo(-52,-60,-24,-100,0,-104);g.bezierCurveTo(24,-100,52,-60,34,0);g.closePath();g.fill();
  ell(g,0,-122,30,27,c);poly(g,[[-26,-136],[-28,-170],[-8,-146]],c);poly(g,[[26,-136],[28,-170],[8,-146]],c);
  ln(g,[[-14,-60],[-14,-4]],c,13);ln(g,[[14,-60],[14+paw*66,-14-paw*8]],c,13);ell(g,14+paw*66,-14-paw*8,9,8,c);
  g.shadowBlur=0;const ec=o.ec||'#ffe45a',l=o.lx||0;for(const e of[-1,1]){ell(g,e*12,-124,8,9,ec);ell(g,e*12+l*3,-124,2.4,8,'#000')}g.restore();
}
function witch(g,x,y,s,o={}){ // on broom facing +x
  g.save();g.translate(x,y);g.rotate(o.r||0);g.scale(s*(o.sx||1),s*(o.sy||1));g.shadowColor='#c39bff';g.shadowBlur=14;
  ln(g,[[-60,18],[70,18]],'#8a5a2b',7);for(let i=0;i<7;i++)ln(g,[[-60,18],[-112,6+i*4.5]],i%2?'#ffb02e':'#e07a10',3);
  poly(g,[[-30,16],[-26,-34],[12,-34],[22,16]],'#6a2cb0');ell(g,-4,-40,22,24,'#6a2cb0');
  ln(g,[[-4,18],[-12,52]],'#3d1a70',9);ln(g,[[8,18],[4,52]],'#3d1a70',9);
  ell(g,14,-56,17,16,'#8ce05a');poly(g,[[26,-58],[42,-50],[28,-48]],'#8ce05a');ell(g,18,-60,2.6,2.6,'#101');
  poly(g,[[-6,-62],[34,-62],[40,-56],[-12,-56]],'#3b1a66');poly(g,[[0,-60],[24,-60],[30,-104+(o.bend||0)]],'#4b2386');ln(g,[[2,-62],[24,-62]],'#ffd93a',4);
  ln(g,[[-14,-50],[-30,-34],[-26,-20]],'#2a1a10',5);g.restore();
}
