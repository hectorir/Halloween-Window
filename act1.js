'use strict';
// ===== ACT I — Trick or Treat (cute & funny) =====

S(1,'Bat Swarm',80,'A',(g,t)=>{
  vg(g,0,0,W,H,'#1a0b3d','#07030f');stars(g,0,0,W,H,t,90);moon(g,250,240,105);fog(g,0,700,W,300,t,'120,90,200',.12);
  for(let i=0;i<44;i++){const sp=50+rr(i)*90,x=(t*sp+rr(i+5)*1700)%(W+300)-150;bat(g,x,90+rr(i+9)*880+M.sin(t*1.7+i)*40,.45+rr(i+3)*.8,t*13+i*2)}
  const b=t%20;if(b<7)for(let j=0;j<26;j++){const a=rr(j+40)*TAU,r=b*(90+rr(j+60)*170);g.save();g.globalAlpha=1-b/7;
    bat(g,250+M.cos(a)*r,240+M.sin(a)*r*.8,.2+b*.13,t*14+j,'#d9a8ff');g.restore()}
});

S(1,'Sneezing Pumpkins',90,'S',(g,t,c,i,w,h)=>{
  vg(g,0,0,w,h,'#2a0d4a','#0c0418');stars(g,0,0,w,h,t,14,i*20);rg(g,w/2,h-60,230,'255,110,0',.3);
  const P=12.8,cy=t%P,pos=[0,1,3,2].indexOf(i),t0=pos*3.2,lt=cy-t0,lf=((cy-t0+1.2)%P+P)%P,dir=[0,M.PI/2,M.PI,-M.PI/2][pos];
  let s=1,e=1,m=.25,dx=0,dy=0;
  if(lf<.7){dx=M.sin(lf*70)*7;e=1.3;m=.1}
  if(lt>0&&lt<1.6){const u=lt/1.6;s=1+.28*u*u;e=1-.75*u;m=.15+.5*u;dx=M.sin(lt*40)*3*u}
  if(lt>=1.6&&lt<2.2){const v=(lt-1.6)/.6;s=lerp(1.28,1,v)-.25*M.sin(v*M.PI);e=.1;m=1;dy=-40*M.sin(v*M.PI)}
  const px=w/2+dx,py=h-135+dy;
  if(lt>=1.6&&lt<3.2){const v=lt-1.6;for(let j=0;j<14;j++){const a=dir+(rr(j+i)-.5)*.9,sp=260+rr(j+30)*220;
    ell(g,px+M.cos(a)*sp*v,py+M.sin(a)*sp*v+200*v*v,5,8,`rgba(255,241,192,${1-v/1.6})`,a)}}
  g.fillStyle='#1b0f2c';g.fillRect(0,h-40,w,40);g.fillStyle='#6a45a0';g.fillRect(0,h-40,w,4);
  pumpkin(g,px,py,2.1*s,{e,m,k:i%3});
  if(lt>1.6&&lt<3){const q=eb(pr(lt,1.6,1.9));g.save();g.globalAlpha=1-pr(lt,2.4,3);txt(g,'ACHOO!',w/2,70,70*q,'#ffe96a',{gc:'#ff9a00'});g.restore()}
});

S(1,'Tangled Ghost',90,'P',(g,t,c,i)=>{
  vg(g,0,0,532,1080,'#160a40','#060214');stars(g,0,0,532,1080,t,30,i*40);
  const P=22,cy=(t+(i?4:0))%P;
  if(!i){
    let y=130,sx=1,sy=1,ey=1,m=.2;
    if(cy<5)y=lerp(130,545,sm(cy/5));
    else if(cy<10){y=545+M.sin(cy*22)*5;sx=.78+.05*M.sin(cy*28);sy=1.12;ey=.35;m=.9}
    else if(cy<11){y=545-60*sm(cy-10);sx=.7;sy=1.4;ey=.2;m=1}
    else if(cy<11.4){const u=(cy-11)/.4;y=lerp(485,830,u*u);sx=.9;sy=1.3;m=.4}
    else if(cy<15){const u=cy-11.4;y=880-M.abs(M.sin(u*4.5))*110*M.exp(-u*.9);sy=y>870?.85:1;sx=y>870?1.15:1;m=.6}
    else{y=lerp(880,130,sm(pr(cy,15,22)));ey=.5;m=.9}
    ghost(g,266+M.sin(t*1.5)*8,y,2.2,{t,sx,sy,ey,m});
    if(cy>5&&cy<10)for(let j=0;j<4;j++){const u=(cy*1.5+j*.25)%1;ell(g,266+(j-1.5)*45,y-150+u*60,5,8,`rgba(150,220,255,${1-u})`)}
    if(cy>11&&cy<11.8)burst(g,266,830,12,cy-11,{col:'#fff',life:.8,sp:250});
  }else{
    const up=sm(pr(cy,3,5))*(1-sm(pr(cy,10.5,11.5))),lau=cy>5&&cy<10,fl=sm(pr(cy,11.4,12.5));
    ghost(g,266-fl*400,1000-up*130-(lau?M.abs(M.sin(cy*14))*10:0),1.3,{t,m:lau?1:.2,ey:lau?.4:1,a:1-fl});
    tomb(g,266,1038,1.5,'BOO');
  }
});

S(1,'Spider Fail',80,'P',(g,t,c,i)=>{
  vg(g,0,0,532,1080,'#0a2a22','#03100c');
  const P=18,cy=(t+(i?6:0))%P,x=266;let sy=-120,yawn=0;
  if(cy<5)sy=lerp(-40,800,sm(cy/5));else if(cy<9){sy=800+M.sin(cy*3)*14;yawn=M.sin(pr(cy,5,9)*M.PI)}
  else if(cy<11)sy=800+(cy-9)*10;else if(cy<12){const u=cy-11;sy=lerp(820,-120,u*u)}
  const smug=cy>12;
  rg(g,x,980,200,'80,255,160',.18);
  if(sy>-100){ln(g,[[x,0],[x,sy-18]],'#cfeee0',3);xf(g,x,sy,1,M.PI,()=>spider(g,0,0,1.8,t))}
  if(!i)pumpkin(g,x,975,1.7,{e:smug?.15:yawn>0?.4:1,m:yawn,k:1});else skull(g,x,975,1.9,{jaw:yawn});
  if(cy>9&&cy<11.3)txt(g,'...',x+90,720,60,'#dffff0');
  g.fillStyle='#10201c';g.fillRect(0,1038,532,42);
});

S(1,'Falling Apart',100,'A',(g,t)=>{
  vg(g,0,0,W,H,'#1d0a3a','#08030f');stars(g,0,0,W,H,t,60);
  const P=22,k=(t/P)|0,cy=t%P,d=k%2?-1:1,xa=d>0?300:880,xb=d>0?880:300,SS=1.7,gy=840,nk=gy-96*SS*.98;
  let x=xa,pose=sdance(t),att=true,hx=0,hy=0,hr=0,hj=0;
  if(cy>=5&&cy<7){att=false;const u=(cy-5)/2;hx=lerp(xa,xb,u);hy=lerp(nk,1000,u)-M.sin(u*M.PI)*330;hr=u*9;pose={...sdance(t),la:[-2.6,.3],ra:[2.6,-.3],hy:0}}
  else if(cy>=7&&cy<15){att=false;const b=cy-7;x=lerp(xa,xb,sm(pr(cy,8,15)));hx=xb;hy=1000-M.abs(M.sin(b*5))*70*M.exp(-b*1.4);hr=9+(1-M.exp(-b*2))*2;hj=cy>9?M.abs(M.sin(cy*12))*.8:0;
    pose={...swalk(t),lean:.15*d,la:[-2.2+M.sin(t*3)*.3,.2],ra:[2.2+M.cos(t*3)*.3,-.2]}}
  else if(cy>=15&&cy<17){att=false;x=xb;const u=sm(pr(cy,16,17));hx=xb;hy=lerp(1000,nk,u);hr=lerp(11,3*M.PI,u);pose={...swalk(t),lean:.5*sm(cy-15)*(1-u),la:[-.5,0],ra:[.5,0]}}
  else if(cy>=17){x=xb;pose={...sdance(t),hr:cy<21?3*M.PI:lerp(3*M.PI,4*M.PI,eb(pr(cy,21,21.8)))};if(cy<21)pose.jaw=.4}
  if(cy>=17&&cy<17.6)burst(g,xb,nk,10,cy-17,{col:'#fff',life:.6,sp:200});
  rg(g,x,gy+120,260,'140,100,255',.18);
  skel(g,x,gy,SS,{...pose,nohead:!att});
  if(!att)skull(g,hx,hy,1.5,{r:hr,jaw:hj});
});

function reaper(g,t,look,tilt){
  g.shadowColor='#7a7aff';g.shadowBlur=18;g.fillStyle='#1b1744';g.strokeStyle='#5c5cf0';g.lineWidth=3;
  g.beginPath();g.moveTo(-70,330);g.bezierCurveTo(-170,420,-190,800,-230,1060);
  for(let j=0;j<=6;j++)g.lineTo(-230+j*76.6,j%2?1075:1042);g.bezierCurveTo(190,800,170,420,70,330);g.closePath();g.fill();g.stroke();
  g.beginPath();g.moveTo(-80,340);g.bezierCurveTo(-125,160,-60,70,0,60);g.bezierCurveTo(60,70,125,160,80,340);g.closePath();g.fill();g.stroke();g.shadowBlur=0;
  g.save();g.translate(tilt*60,0);g.rotate(tilt);ell(g,0,230,52,78,'#04030a');g.shadowColor='#f22';g.shadowBlur=16;
  ell(g,-20+look*12,214,9,12,'#ff3030');ell(g,20+look*12,214,9,12,'#ff3030');g.restore();g.shadowBlur=0;
  for(let j=0;j<5;j++){g.beginPath();g.moveTo(-60+j*30,420);g.quadraticCurveTo(-70+j*34,700,-100+j*50,1030);g.strokeStyle='rgba(8,6,30,.6)';g.lineWidth=5;g.stroke()}
  g.shadowColor='#bfe';g.shadowBlur=14;ln(g,[[150,0],[150,1080]],'#6b4a2a',14);
  g.fillStyle='#d6ecff';g.beginPath();g.moveTo(150,34);g.bezierCurveTo(60,-6,-30,50,-52,160);g.bezierCurveTo(0,86,80,66,150,86);g.closePath();g.fill();
  ln(g,[[95,380],[130,450],[150,480]],'#1b1744',42);g.shadowBlur=0;ell(g,150,482,22,18,'#f4f0e0');
  for(let j=0;j<4;j++)ln(g,[[140+j*7,478],[134+j*8,498]],'#f4f0e0',6);
}
S(1,'Grim Calendar',90,'P',(g,t,c,i)=>{
  vg(g,0,0,532,1080,'#0f0a2a','#05030f');const hw=halloween(),P=15,cy=t%P;
  if(!i){fog(g,0,800,532,260,t,'110,90,220',.14);g.save();g.translate(266,0);reaper(g,t,cy<3?1:.6,M.sin(t*.9)*.08+(cy>11?M.sin(cy*7)*.05:0));g.restore()}
  else{
    const u=sm(pr(cy,.3,2.8)),n=hw.state=='before'?hw.d+M.floor((1-u)*25):0;
    g.save();g.shadowColor='#ffb347';g.shadowBlur=26;g.fillStyle='#f1e4c1';g.beginPath();g.roundRect(56,110,420,380,16);g.fill();g.restore();
    g.fillStyle='#b3201c';g.beginPath();g.roundRect(56,110,420,90,[16,16,0,0]);g.fill();
    for(let j=0;j<5;j++){ell(g,110+j*78,110,9,9,'#111')}
    txt(g,'OCTOBER',266,158,54,'#ffe9c0',{glow:0});
    let big=hw.state=='before'?String(n):hw.state=='tonight'?'TONIGHT':'SEE YOU',sub=hw.state=='before'?(n==1?'DAY LEFT':'DAYS LEFT'):hw.state=='tonight'?'IS THE NIGHT':'NEXT YEAR';
    g.save();if(cy<2.8&&hw.state=='before')g.translate(0,M.sin(cy*30)*3);txt(g,big,266,320,big.length>4?96:190,'#2a1a12',{glow:0});g.restore();
    txt(g,sub,266,440,52,'#7a1a14',{glow:0});
    // hourglass
    g.save();g.translate(266,830);g.shadowColor='#ffb347';g.shadowBlur=24;ln(g,[[-90,-170],[90,-170]],'#c58b3a',16);ln(g,[[-90,170],[90,170]],'#c58b3a',16);
    g.fillStyle='rgba(200,230,255,.28)';g.beginPath();g.moveTo(-76,-162);g.lineTo(76,-162);g.lineTo(10,0);g.lineTo(76,162);g.lineTo(-76,162);g.lineTo(-10,0);g.closePath();g.fill();
    const f=(t%30)/30;g.fillStyle='#ffc45a';g.beginPath();g.moveTo(-66*(1-f),-150+f*120);g.lineTo(66*(1-f),-150+f*120);g.lineTo(6,-8);g.lineTo(-6,-8);g.fill();
    poly(g,[[-62*f-6,160],[62*f+6,160],[0,160-110*f]],'#ffc45a');ln(g,[[0,-6],[0,160-110*f]],'#ffc45a',3);g.restore();
  }
});

S(1,'Cat Knocks Pumpkin',90,'P',(g,t,c,i)=>{
  vg(g,0,0,532,1080,'#2a0f3f','#0a0414');stars(g,0,0,532,1080,t,24,i*30);
  const P=20,cy=(t+(i?9:0))%P;
  g.fillStyle='#8a5a2b';g.shadowColor='#ffb347';g.shadowBlur=8;g.fillRect(42,466,300,12);g.shadowBlur=0;
  const push=sm(pr(cy,5,7.5))*(1-sm(pr(cy,8,9)));
  let px=270,py=424,e=1,m=.3,sq=1;
  if(cy>=8&&cy<9.3)px=lerp(270,350,(cy-8)/1.3);
  else if(cy>=9.3){px=350;const f=cy-9.3,f0=M.sqrt(561/900);
    if(f<f0)py=424+f*f*900;else{const u=f-f0;py=985-M.abs(M.sin(u*7))*90*M.exp(-u*2.2);sq=py>970?.8:1;e=.3}}
  if(cy<17)pumpkin(g,px,py,1.5*sq,{e,m,k:1});
  if(cy>=10.05&&cy<10.6)burst(g,350,985,10,cy-10.05,{col:'#fff1c0',life:.5,sp:260});
  if(cy>=17){const u=pr(cy,17,19);pumpkin(g,270,424,1.5*sm(u),{});if(u<1)spark(g,270,424,40*u,'#fff',cy*4)}
  const wl=cy>8&&cy<9.5;
  cat(g,150,466,1.5,{paw:push,tail:t*2,lx:cy>9?-.5:wl?0:M.sin(t),ec:i?'#7dff6a':'#ffe45a'});
  g.fillStyle='#2a1636';g.fillRect(0,1038,532,42);
});

function corn(g,x,y,s,t,ph){
  g.save();g.translate(x,y);g.scale(s,s);const l=M.sin(t*9+ph);
  ln(g,[[-14,30],[-14+l*12,64]],'#fff5e0',8);ln(g,[[14,30],[14-l*12,64]],'#fff5e0',8);
  ln(g,[[-26,0],[-46,14+l*10]],'#fff5e0',7);ln(g,[[26,0],[46,14-l*10]],'#fff5e0',7);
  g.shadowColor='#ffd23f';g.shadowBlur=14;g.save();g.beginPath();g.moveTo(0,-72);g.lineTo(38,40);g.quadraticCurveTo(0,52,-38,40);g.closePath();g.clip();
  g.fillStyle='#fff8e8';g.fillRect(-50,-80,100,52);g.fillStyle='#ff8a1f';g.fillRect(-50,-28,100,44);g.fillStyle='#ffd23f';g.fillRect(-50,16,100,46);g.restore();
  g.shadowBlur=0;ell(g,-9,14,3.5,5,'#241030');ell(g,9,14,3.5,5,'#241030');g.beginPath();g.arc(0,22,9,.15,M.PI-.15);g.strokeStyle='#241030';g.lineWidth=3;g.stroke();g.restore();
}
S(1,'Candy Corn Conga',80,'A',(g,t)=>{
  vg(g,0,0,W,H,'#3a0f3a','#12051a');
  for(let j=0;j<40;j++)ell(g,(rr(j)*W+t*20*(1+rr(j+4)))%W,(rr(j+8)*H+t*10)%H,3,3,['#ff8a1f','#ffd23f','#ff5fa2','#7affc4'][j%4]);
  for(let j=0;j<12;j++){const hop=M.abs(M.sin(t*4-j*.6))*34,x=(t*85-j*90)%(W+250)-90;corn(g,x,860-hop,1.55,t,j*.5)}
  for(let j=0;j<12;j++){const hop=M.abs(M.sin(t*4-j*.6+1))*30,x=W+90-((t*85-j*90)%(W+250));corn(g,x,380-hop,1.4,t,j*.5+2)}
});
