'use strict';
// ===== ACT II — Haunted Night (spooky fun) =====

function sil(g,x,y,s,o={}){ // black person, feet at (x,y)
  g.save();g.translate(x,y);g.scale(s,s);const l=o.walk?M.sin(o.walk)*14:0;
  ln(g,[[-8,-70],[-8+l,0]],'#000',12);ln(g,[[8,-70],[8-l,0]],'#000',12);poly(g,[[-22,-150],[22,-150],[28,-60],[-28,-60]],'#000');
  ln(g,[[-22,-145],o.al||[-34,-90]],'#000',10);ln(g,[[22,-145],o.ar||[34,-90]],'#000',10);ell(g,0,-172,15,18,'#000');
  if(o.hat){g.fillStyle='#000';g.fillRect(-26,-188,52,5);g.fillRect(-16,-216,32,30)}
  g.restore();
}
function winEvent(g,ev,u,w,h,t,i){
  const dark=ev==4||ev==5,b=M.sin(t*3.1+i)*M.sin(t*1.7)*.12;
  if(dark){vg(g,0,0,w,h,'#0a1030','#04060f');rg(g,w/2,h/2,260,'80,110,255',.2)}
  else{vg(g,0,0,w,h,'#c9791f','#6e2a05');rg(g,w/2,h*.45,300,'255,200,110',.38+b)}
  switch(ev){
    case 0:sil(g,lerp(-60,w+60,u/12),h-6-M.abs(M.sin(u*5))*5,1.9,{walk:u*5,hat:1});break;
    case 1:{const s=2.2;sil(g,w/2,h-4,s,{ar:[40,-200],al:[-30,-80]});flame(g,w/2+40*s,h-4-218*s,.9,t);break}
    case 2:for(let j=0;j<2;j++){const a=u*2+j*M.PI;sil(g,w/2+M.cos(a)*50,h-4,1.8+M.sin(a)*.12,{al:[-40,-130],ar:[40,-130]})}break;
    case 3:{for(let j=0;j<7;j++)g.fillRect(40+j*50,h-130-j%3*30,34,200);const q=M.sin(u*9);sil(g,w/2,h-4,1.9,{al:[-40,-90+q*30],ar:[40,-90-q*30]});break}
    case 4:{const q=sm(pr(u,.5,2));ghost(g,w/2,h/2+30,2.5*q,{t,m:.7});
      const wv=M.sin(u*6);ln(g,[[w/2+70*q,h/2+20],[w/2+130*q,h/2-60+wv*50]],'#e6f8ff',14*q);break}
    case 5:{const q=pr(u,1,4),bl=(u%5>4.7)?.1:1,sz=.5+q*.9;eye(g,w/2-70*sz,h/2,sz,{col:'#ff2a2a',open:bl,round:0});eye(g,w/2+70*sz,h/2,sz,{col:'#ff2a2a',open:bl});break}
    case 6:{const x=lerp(-80,w+80,u/12);xf(g,x,h*.5+M.sin(u*2)*60,1,M.PI/2,()=>spider(g,0,0,3.2,t*1.5,'#000'));break}
    case 7:for(let j=0;j<7;j++)bat(g,lerp(-60,w+60,((u/12)+j*.14)%1),60+rr(j)*(h-120)+M.sin(t*3+j)*30,1.3,t*12+j,'#000');break;
  }
  g.fillStyle='#000';g.fillRect(w/2-7,0,14,h);g.fillRect(0,h/2-7,w,14);
  g.lineWidth=18;g.strokeStyle='#000';g.strokeRect(0,0,w,h);
  g.fillStyle=`rgba(0,0,0,${1-M.min(pr(u,0,.7),pr(12-u,0,.7))})`;g.fillRect(0,0,w,h);
}
S(2,'Haunted Mansion',120,'S',(g,t,c,i,w,h)=>winEvent(g,(M.floor(t/12)+i*3)%8,t%12,w,h,t,i));

S(2,'Graveyard Rave',110,'A',(g,t)=>{
  vg(g,0,0,W,H,'#1a0a3a','#06020f');stars(g,0,0,W,H,t,50);
  const beat=t*2,pulse=M.pow(M.abs(M.sin(beat*M.PI)),8);
  g.save();g.globalCompositeOperation='lighter';const cols=['255,40,160','40,220,255','140,255,60','255,200,40'];
  for(let j=0;j<8;j++){const bx=80+j*145,dx=M.sin(M.sin(t*.8+j*1.3)*.5+(j%2?.15:-.15))*900,q=g.createLinearGradient(bx,0,bx+dx,900);
    q.addColorStop(0,`rgba(${cols[j%4]},.55)`);q.addColorStop(1,`rgba(${cols[j%4]},0)`);g.fillStyle=q;
    g.beginPath();g.moveTo(bx-14,0);g.lineTo(bx+14,0);g.lineTo(bx+dx+170,900);g.lineTo(bx+dx-170,900);g.fill()}
  g.restore();
  for(const bx of[265,915]){ln(g,[[bx,0],[bx,100]],'#aaa',3);g.save();g.shadowColor='#fff';g.shadowBlur=30;
    const q=g.createRadialGradient(bx-15,125,5,bx,150,60);q.addColorStop(0,'#fff');q.addColorStop(1,'#7a86a8');g.fillStyle=q;g.beginPath();g.arc(bx,150,55,0,TAU);g.fill();g.restore();
    for(let j=0;j<5;j++){g.beginPath();g.ellipse(bx,150,55,12+j*10,0,0,TAU);g.strokeStyle='rgba(30,30,60,.4)';g.lineWidth=2;g.stroke()}
    for(let j=0;j<30;j++){const a=t*.7+j*.9,R=90+rr(j+bx)*520;spark(g,bx+M.cos(a)*R,150+M.sin(a*1.3)*R*.8,4+rr(j)*5,cols[j%4].split(',').length?`rgb(${cols[j%4]})`:'#fff')}}
  for(let j=0;j<6;j++){const x=100+j*190;pumpkin(g,x,330+M.sin(t*4+j)*10,.9+pulse*.1,{k:j%3,m:.3+pulse*.5});bat(g,x+90,200+M.sin(t*5+j)*30,.8,t*14+j)}
  [[110,'RIP'],[480,'OOO'],[700,'BOO'],[1070,'RIP']].forEach(([x,s],j)=>tomb(g,x,1040,1.4,s));
  [150,380,800,1030].forEach((x,j)=>skel(g,x,885,1.5,sdance(t,j*.9)));
});

S(2,'Zombie Hands',90,'S',(g,t,c,i,w,h)=>{
  vg(g,0,0,w,h,'#12082a','#050210');fog(g,0,h-220,w,200,t,'120,255,140',.14);stars(g,0,0,w,h,t,12,i*9);
  const P=14,cy=(t+i*2.5)%P,rise=sm(pr(cy,1,3))*(1-sm(pr(cy,11,13))),gy=h-80,wy=gy+240*(1-rise)-30;
  const hands=i==3?[[w/2-85,-.35],[w/2+85,.35]]:[[w/2,0]];
  hands.forEach(([x,r0],j)=>{let r=r0,cu=0,th=0,sp=.12;
    if(i==0){r=M.sin(t*2)*.3;cu=cy>7&&cy<9.5?1:.15+.3*M.pow(M.sin(t*5),2)}
    if(i==1){cu=sm(pr(cy,3,4.5));th=cu;r=-.1}
    if(i==2){r=cy>4&&cy<10?M.sin(t*8)*.4:0;sp=.3}
    if(i==3){sp=.35;r=r0+M.sin(t*7+j*2)*.3}
    zhand(g,x,wy,1.5,{r,c:cu,th,sp})});
  g.fillStyle='#2b1a12';g.beginPath();g.moveTo(0,h);g.lineTo(0,gy+10);for(let x=0;x<=w;x+=16)g.lineTo(x,gy+M.sin(x*.05+i)*10+(x%32?0:6));g.lineTo(w,h);g.fill();
  g.strokeStyle='#4a6a3a';g.lineWidth=3;for(let x=10;x<w;x+=34){g.beginPath();g.moveTo(x,gy+8);g.lineTo(x+M.sin(t*2+x)*5,gy-16);g.stroke()}
});

S(2,'Witch Crash',100,'A',(g,t)=>{
  vg(g,0,0,W,H,'#1a1048','#06030f');stars(g,0,0,W,H,t,70);moon(g,590,120,80);fog(g,0,800,W,260,t,'140,110,255',.12);
  const P=15,k=(t/P)|0,cy=t%P,d=k%2?-1:1;
  g.save();if(d<0){g.translate(W,0);g.scale(-1,1)}
  let x=-150,y=260,sx=1,sy=1,r=0,bend=0,dz=false;
  if(cy<4){x=lerp(-150,440,sm(cy/4));y=260+M.sin(cy*3)*30}
  else if(cy<4.25){x=lerp(440,478,(cy-4)/.25);y=260;sx=lerp(1,.5,(cy-4)/.25);bend=-14}
  else if(cy<6){const u=sm(pr(cy,4.25,6));x=478;y=lerp(260,960,u);sx=.5;sy=1.1;bend=-14;if(cy>5.6){r=-.2}}
  else if(cy<9.5){x=420;y=980;r=-.25;bend=-24;dz=true}
  else if(cy<11){const u=sm(pr(cy,9.5,11));x=420;y=lerp(980,820,u);r=lerp(-.25,0,u);bend=-24}
  else if(cy<15){const u=pr(cy,11,14.5);x=lerp(420,-250,u*u)+M.sin(u*9)*60;y=lerp(820,160,u)+M.sin(u*9+1)*70;r=-.3;bend=-24}
  if(cy>4&&cy<4.9)burst(g,490,y,12,cy-4,{col:['#ffe96a','#fff'],life:.9,sp:260});
  witch(g,x,y,1.8,{sx,sy,r,bend});
  if(dz)for(let j=0;j<3;j++){const a=t*5+j*2.1;spark(g,x+M.cos(a)*60,y-130+M.sin(a)*14,12,'#ffe96a',a)}
  g.restore();
});

S(2,'Bubbling Cauldron',90,'P',(g,t,c,i)=>{
  const rgb=i?'200,90,255':'120,255,80',hex=i?'#c05bff':'#7CFF4F',cx=266,oy=900;
  vg(g,0,0,532,1080,'#0a0f1e','#03040a');rg(g,cx,oy-40,330,rgb,.25);
  const P=18,cyc=(t+(i?7:0))%P,rise=sm(pr(cyc,2,5))*(1-sm(pr(cyc,14,17))),cy=lerp(oy-60,330,rise)+M.sin(t*2)*14*rise;
  for(let j=0;j<5;j++)flame(g,cx-84+j*42,1035,1.2+.3*M.sin(t*5+j),t+j,'#ff7a1a');
  ell(g,cx,oy-60,122,34,'#16161f');ell(g,cx,oy-60,108,26,hex);
  g.save();g.beginPath();g.rect(0,0,532,oy-58);g.clip();
  if(!i)ghost(g,cx+M.sin(t)*30,cy,1.5,{t,m:.7,r:M.sin(t*1.5)*.2});else eye(g,cx,cy,1.1,{lx:M.sin(t*.9),ly:M.cos(t*.7),col:'#ff4fd0'});
  g.restore();
  for(let j=0;j<8;j++){const u=(t*.5+rr(j)*5)%1,x=cx+(rr(j+3)-.5)*170,y=oy-60+(rr(j+7)-.5)*30;
    if(u<.85)ell(g,x,y-u*8,3+u*14,2+u*10,`rgba(${rgb},${.7*(1-u)})`);else burst(g,x,y,6,(u-.85)*3,{col:`rgb(${rgb})`,life:.45,sp:90,sz:2.5,g:200,seed:j})}
  g.save();g.shadowColor=hex;g.shadowBlur=12;g.fillStyle='#14141c';g.strokeStyle='#5a5a8a';g.lineWidth=4;
  g.beginPath();g.moveTo(cx-126,oy-52);g.bezierCurveTo(cx-190,oy+60,cx-120,oy+170,cx,oy+174);g.bezierCurveTo(cx+120,oy+170,cx+190,oy+60,cx+126,oy-52);g.quadraticCurveTo(cx,oy-8,cx-126,oy-52);g.fill();g.stroke();g.restore();
  for(let j=0;j<10;j++){const u=(t*.14+rr(j))%1;rg(g,cx+M.sin(u*6+j)*70,oy-70-u*760,30+u*60,rgb,.2*(1-u))}
});

function frank(g,x,y,s,a,m){
  g.save();g.translate(x,y);g.scale(s,s);g.globalAlpha=a;g.shadowColor='#9dff9d';g.shadowBlur=14;
  ell(g,0,170,190,80,'#3b4a5a');g.fillStyle='#6fa86f';g.fillRect(-42,70,84,70);g.fillStyle='#b8c0d0';g.fillRect(-78,92,34,22);g.fillRect(44,92,34,22);
  g.fillStyle='#79b87a';g.beginPath();g.roundRect(-92,-110,184,190,16);g.fill();g.shadowBlur=0;
  g.fillStyle='#0c0c14';g.fillRect(-94,-126,188,58);ell(g,-96,0,13,26,'#6aa56b');ell(g,96,0,13,26,'#6aa56b');
  g.fillStyle='#3e6a40';g.fillRect(-84,-50,168,20);ell(g,-38,-24,16,11,'#f0f0a0');ell(g,38,-24,16,11,'#f0f0a0');ell(g,-38,-23,5,5,'#210');ell(g,38,-23,5,5,'#210');
  ln(g,[[0,-24],[-8,22],[8,22]],'#4a8a4a',6);ln(g,[[-60,-62],[-30,-70],[0,-62]],'#2d4a2d',4);
  g.fillStyle='#220';g.beginPath();g.roundRect(-44,44,88,10+m*40,6);g.fill();
  for(let j=-3;j<=3;j++)ln(g,[[j*12,38],[j*12,62+m*20]],'#4a8a4a',3);
  ln(g,[[-70,-92],[-40,-72]],'#4a8a4a',5);ln(g,[[-60,-98],[-60,-78]],'#2d4a2d',3);
  g.restore();
}
S(2,'Lightning Lab',100,'A',(g,t)=>{
  let L=0,bk=0,bx=0;const k0=M.floor(t/7);
  for(let k=k0-1;k<=k0;k++){const e=k*7+1+rr(k)*4;for(const[dt,a]of[[0,1],[.38,.6]]){const x=t-e-dt;if(x>=0){const v=a*M.exp(-x*4.5);if(v>L){L=v;bk=k;bx=150+rr(k+3)*880}}}}
  vg(g,0,0,W,H,'#0b1430','#050810');rg(g,W/2,200,700,'120,150,220',.12);
  g.fillStyle=`rgba(190,210,255,${L*.5})`;g.fillRect(0,0,W,H);
  g.save();g.lineWidth=2;for(let j=0;j<140;j++){const sp=900*(.7+rr(j+5)*.6),y=(t*sp+rr(j+9)*1300)%1300-60,x=rr(j)*W+y*.2;g.strokeStyle='rgba(170,200,255,.5)';g.beginPath();g.moveTo(x,y);g.lineTo(x-8,y-36);g.stroke()}g.restore();
  if(L>.25){const bolt=(x0,y1,sd,wd)=>{let x=x0,y=0;const pts=[[x,y]];for(let q=1;y<y1;q++){y+=40+rr(sd+q)*30;x+=(rr(sd+q+50)-.5)*80;pts.push([x,y])}
      g.save();g.globalAlpha=L;ln(g,pts,'#cfe2ff',wd*2.4);ln(g,pts,'#fff',wd);g.restore();return pts};
    g.shadowColor='#9cf';g.shadowBlur=30;const p=bolt(bx,650+rr(bk)*300,bk*77,5);const q=p[3];
    g.save();g.translate(q[0],q[1]);bolt(0,300,bk*99,3);g.restore();g.shadowBlur=0}
  frank(g,266,800,1.5,.12+M.min(1,L*1.5),L>.35?1:.1);
  const sinceFlash=t-(M.floor(t/7)*7+1+rr(M.floor(t/7))*4);
  if(M.floor(t/7)%2==0&&sinceFlash>.3&&sinceFlash<3.5){g.save();g.globalAlpha=pr(sinceFlash,.3,.6)*(1-pr(sinceFlash,3,3.5));txt(g,"IT'S ALIVE!",880,850,74,'#9dff7a');g.restore()}
});

function cape(g,x,y,s,fl,col='#3c0818',st='#9a3050'){
  g.save();g.translate(x,y);g.scale(s,s);g.fillStyle=col;g.strokeStyle=st;g.lineWidth=3;g.shadowColor=st;g.shadowBlur=14;
  const wd=240+fl*60;g.beginPath();g.moveTo(-70,0);g.bezierCurveTo(-170-fl*60,200,-wd-30,520,-wd,700);
  for(let j=0;j<=6;j++)g.lineTo(-wd+j*wd/3,j%2?730:696);g.bezierCurveTo(wd+30,520,170+fl*60,200,70,0);g.closePath();g.fill();g.stroke();
  poly(g,[[-70,0],[-140-fl*20,-90],[-20,-10]],col);poly(g,[[70,0],[140+fl*20,-90],[20,-10]],col);g.restore();
}
S(2,'Vampire No Reflection',100,'P',(g,t,c,i)=>{
  vg(g,0,0,532,1080,'#0f0a2a','#04030c');const P=20,cy=t%P;
  const smile=cy<4?1:0,hair=sm(pr(cy,4,5))*(1-sm(pr(cy,7.5,8))),flex=sm(pr(cy,8,9))*(1-sm(pr(cy,11.5,12))),puz=sm(pr(cy,12,13))*(1-sm(pr(cy,15.5,16))),shr=sm(pr(cy,16,17))*(1-sm(pr(cy,19.5,20)));
  const fl=shr+flex*.3+M.sin(t*1.2)*.05;
  if(!i){
    cape(g,266,430,1.0,fl);
    g.save();g.translate(0,-12*shr);g.shadowColor='#6a7aff';g.shadowBlur=12;
    ln(g,[[266,430],[266,1000]],'#222a44',150);poly(g,[[236,430],[296,430],[266,620]],'#eef0ff');poly(g,[[255,470],[277,470],[266,500]],'#c0102a');
    const arm=(d,up)=>{const sx=266+d*76,sy=450,hx=sx+d*(40+shr*60)+(up?d*-30:0),hy=up?sy-70-flex*10:sy+160-shr*60-flex*90*(1);ln(g,[[sx,sy],[sx+d*50,sy+80-flex*80-shr*40],[hx,hy]],'#222a44',34);ell(g,hx,hy,17,17,'#ece6f6')};
    arm(-1,0);if(hair>0){const hx=266+80,hy=300-hair*0;ln(g,[[342,450],[390,380],[310+M.sin(t*10)*10,290]],'#222a44',34);ell(g,310+M.sin(t*10)*10,290,17,17,'#ece6f6')}else arm(1,0);
    g.restore();
    const hx=266+16,hy=330-6*puz;g.save();g.translate(hx,hy);g.rotate(puz*.12);
    g.shadowColor='#c9b6ff';g.shadowBlur=16;ell(g,0,0,66,86,'#ece6f6');g.shadowBlur=0;
    g.fillStyle='#07060f';g.beginPath();g.moveTo(-68,-10);g.bezierCurveTo(-72,-100,72,-100,68,-10);g.lineTo(40,-52);g.lineTo(0,-30);g.lineTo(-40,-52);g.closePath();g.fill();
    g.strokeStyle='#8a8aff';g.lineWidth=2;g.stroke();
    for(const e of[-1,1]){ln(g,[[e*38,-26-puz*14],[e*12,-34]],'#07060f',6);g.shadowColor='#f22';g.shadowBlur=14;ell(g,e*24+14,-8,10,8+3*puz,'#ff2a2a');g.shadowBlur=0}
    ln(g,[[22,10],[30,34]],'#bbaad0',4);const mo=smile?1:.35;g.fillStyle='#4a0010';g.beginPath();g.ellipse(14,52,22,6+mo*14,0,0,TAU);g.fill();
    poly(g,[[-2,47],[6,47],[2,64+mo*6]],'#fff');poly(g,[[26,47],[34,47],[30,64+mo*6]],'#fff');
    if(smile&&cy>3&&cy<3.8)spark(g,32,64,22,'#fff',cy*5);g.restore();
  }else{
    g.save();g.beginPath();g.ellipse(266,540,190,400,0,0,TAU);g.clip();vg(g,0,100,532,880,'#12203a','#27466e');
    cape(g,266,300,1.0,fl,'#3a0c1e','#8a3050');
    const sh=(t*60)%700;g.fillStyle='rgba(255,255,255,.1)';g.beginPath();g.moveTo(sh-200,140);g.lineTo(sh-120,140);g.lineTo(sh+200,940);g.lineTo(sh+120,940);g.fill();g.restore();
    g.save();g.shadowColor='#ffd24a';g.shadowBlur=28;g.beginPath();g.ellipse(266,540,190,400,0,0,TAU);g.strokeStyle='#d4a017';g.lineWidth=24;g.stroke();g.strokeStyle='#fff0a0';g.lineWidth=4;g.stroke();g.restore();
    if(puz>.1){g.save();g.globalAlpha=puz;txt(g,'?',266,180,150,'#cfe2ff');g.restore()}
  }
});

function mixc(a,b,t){return`rgb(${a.map((v,i)=>M.round(lerp(v,b[i],t)))})`}
S(2,'Werewolf Moon',100,'P',(g,t,c,i)=>{
  vg(g,0,0,532,1080,'#10163a','#2a1b4a');const P=50,cy=t%P;
  if(!i){
    moon(g,130,230,70);rg(g,130,230,300,'140,160,255',.25);
    for(let j=0;j<6;j++){const x=40+j*95,hh=420+rr(j)*220;g.save();for(const[w,col]of[[22,'#5a6cb0'],[14,'#07081a']]){
      g.lineCap='round';g.strokeStyle=col;g.lineWidth=w;g.beginPath();g.moveTo(x,1080);g.lineTo(x+M.sin(j)*14,1080-hh);g.stroke();
      for(let q=0;q<4;q++){g.lineWidth=w*.45;g.beginPath();const by=1080-hh*(.35+q*.17),dx=(q%2?1:-1)*(70+rr(j+q)*40);g.moveTo(x,by);g.lineTo(x+dx,by-60-rr(q)*40);g.stroke()}}g.restore()}
    fog(g,0,860,532,200,t,'150,170,255',.2);
    [[120,790],[410,700],[330,460],[90,520],[440,900]].forEach(([x,y],j)=>{const o=sm(pr(cy,8+j*3,10+j*3))*(1-sm(pr(cy,44,47))),bl=(t*.7+j)%6>5.8?.1:1;
      if(o>0){g.save();g.globalAlpha=o;for(const d of[-1,1])eye(g,x+d*22,y,.2,{col:j%2?'#ffe14d':'#ff4040',open:bl,lx:M.sin(t*.5+j)});g.restore()}});
  }else{
    const tr=sm(pr(cy,10,26))*(1-sm(pr(cy,42,48))),howl=sm(pr(cy,26,30))*(1-sm(pr(cy,40,43))),mr=70+95*sm(pr(cy,0,24))*(1-.8*sm(pr(cy,42,50)));
    moon(g,266,240,mr);g.fillStyle='#0c0a1e';g.strokeStyle='#8f9bff';g.lineWidth=4;g.shadowColor='#8f9bff';g.shadowBlur=14;
    g.beginPath();g.moveTo(0,1080);g.lineTo(0,960);g.quadraticCurveTo(266,880,532,960);g.lineTo(532,1080);g.fill();g.stroke();g.shadowBlur=0;
    const fur=mixc([150,112,96],[14,10,30],tr),rim='#cfd8ff',lean=tr*.4;
    g.save();g.translate(266,955);g.scale(1.3,1.3);g.lineJoin='round';g.shadowColor=rim;g.shadowBlur=10;g.strokeStyle=rim;g.lineWidth=2;
    ln(g,[[-14,-95],[-20,-48],[-16,0]],fur,lerp(12,18,tr));ln(g,[[14,-95],[18,-48],[16,0]],fur,lerp(12,18,tr));
    g.save();g.translate(0,-150);g.rotate(lean);const rx=lerp(26,38,tr),ry=lerp(55,48,tr);ell(g,0,0,rx,ry,fur);
    for(let q=0;q<7;q++){const a=M.PI*.55+q*.2,sp=.07,k2=1+.32*tr*(q%2?1:.7),P1=a-sp,P2=a+sp;if(tr>.15)poly(g,[[M.cos(P1)*rx,M.sin(P1)*ry],[M.cos(P2)*rx,M.sin(P2)*ry],[M.cos(a)*rx*k2,M.sin(a)*ry*k2]],fur)}
    for(const d of[-1,1]){ln(g,[[d*24,-40],[d*(34+tr*10),10],[d*(30+tr*16),48+tr*14]],fur,lerp(9,14,tr));if(tr>.5)for(let q=-1;q<=1;q++)poly(g,[[d*(30+tr*16)+q*5-3,52+tr*14],[d*(30+tr*16)+q*5+3,52+tr*14],[d*(30+tr*16)+q*7,72+tr*14]],'#e8e8ff')}
    g.restore();g.save();g.translate(6*tr,-205+tr*14);g.rotate(-.2-howl*.85);
    const HH=[[-18,-14],[-6,-24],[10,-22],[20,-10],[22,2],[22,12],[16,22],[4,26],[-8,22],[-18,12],[-22,0],[-22,-8]],WW=[[-20,-12],[-6,-20],[10,-18],[28,-8],[54,-2],[58,6],[52,12],[30,16],[14,24],[0,26],[-14,20],[-22,6]];
    poly(g,HH.map((p,j)=>[lerp(p[0],WW[j][0],tr),lerp(p[1],WW[j][1],tr)]),fur);g.stroke();
    for(const e of[0,12])poly(g,[[-14+e,-18],[-10+e,-22-tr*34],[0+e,-18]],fur);
    if(howl>.05){poly(g,[[30,5],[56,4],[40,6+howl*18]],'#07050f');if(tr>.6)for(const f of[34,44])poly(g,[[f,5],[f+5,5],[f+2,5+8]],'#fff')}
    g.shadowBlur=10;g.shadowColor='#fe0';ell(g,10+tr*8,-6,3.6,3.6,tr>.3?'#ffe14d':'#222');g.restore();g.restore();
    if(howl>.3)for(let j=0;j<3;j++){const u=(t*.7+j/3)%1,a=-.2-howl*.85;g.save();g.globalAlpha=(1-u)*howl*.7;g.strokeStyle='#cfd8ff';g.lineWidth=4;
      g.beginPath();g.arc(266+20,955-215*1.3,50+u*220,-1.9,-.9);g.stroke();g.restore()}
  }
});

function capsule(g,x1,y1,x2,y2,w){const l=M.hypot(x2-x1,y2-y1);g.save();g.translate(x1,y1);g.rotate(M.atan2(y2-y1,x2-x1));g.roundRect(-w/2,-w/2,l+w,w,w/2);g.restore()}
function wrap(g,col,fn){g.save();g.beginPath();fn();g.fillStyle=col;g.fill();g.clip();
  for(let y=-280;y<320;y+=16){g.beginPath();g.moveTo(-170,y);g.lineTo(170,y+24);g.strokeStyle='#7d6650';g.lineWidth=4;g.stroke();g.beginPath();g.moveTo(-170,y+8);g.lineTo(170,y+32);g.strokeStyle='rgba(255,252,235,.6)';g.lineWidth=3;g.stroke()}g.restore()}
function mummy(g,x,y,s,u,t,spin){
  g.save();g.translate(x,y);g.scale(s*M.max(.45,M.abs(M.cos(spin))),s);const k=1-u*.35,cr=mixc([241,230,200],[190,176,140],u);g.shadowColor='#ffe9b0';g.shadowBlur=14;
  wrap(g,cr,()=>{capsule(g,-14,90,-16,230,52*k);capsule(g,14,90,16,230,52*k)});
  wrap(g,cr,()=>g.roundRect(-52*k,-110,104*k,210,26));
  wrap(g,cr,()=>{capsule(g,-50*k,-90,-80*k,0,30*k);capsule(g,-80*k,0,-70*k,80,28*k);capsule(g,50*k,-90,90*k,-10,30*k);capsule(g,90*k,-10,130*k,-60-M.sin(t*5)*20,28*k)});
  wrap(g,cr,()=>{g.ellipse(0,-175,56*k+6,68*k+6,0,0,TAU)});g.shadowBlur=0;
  g.fillStyle='#050308';g.fillRect(-44*k,-192,88*k,30*k);g.shadowColor='#7fff6a';g.shadowBlur=14;ell(g,-18*k,-178,9,8,'#9dff7a');ell(g,18*k,-178,9,8,'#9dff7a');g.restore();
}
S(2,'Mummy Unwrap',110,'A',(g,t)=>{
  vg(g,0,0,W,H,'#2a1a10','#0a0604');rg(g,266,700,500,'255,190,90',.16);
  const P=36,cy=t%P,u=cy<5?0:cy<26?sm(pr(cy,5,26)):cy<30?1:1-sm(pr(cy,30,35)),spin=cy>5&&cy<26?cy*3.2:(cy>=30&&cy<35?-cy*5:0);
  const hx=266,hy=640;mummy(g,hx,hy,1.6,u,t,spin);
  if(u>.01){const n=70,len=u*n;g.save();g.shadowColor='#ffe9b0';g.shadowBlur=10;
    let pts=[];for(let j=0;j<len;j++)pts.push([hx+208+j*12,550+M.sin(j*.22-t*4)*(110+j*3)]);
    if(pts.length>1){ln(g,pts,'#7d6650',34);ln(g,pts,'#f1e6c8',30);for(let j=1;j<pts.length;j++){g.beginPath();g.moveTo(pts[j][0]-3,pts[j][1]-15);g.lineTo(pts[j][0]+3,pts[j][1]+15);g.strokeStyle='#7d6650';g.lineWidth=2.5;g.stroke()}}g.restore()}
  if(cy>=24&&cy<31){const q=sm(pr(cy,24,26))*(1-sm(pr(cy,30,31)));g.save();g.globalAlpha=q;skel(g,hx,hy+120,.9,{la:[-.4,0],ra:[2.4,-.4],hop:M.abs(M.sin(t*6))*5,nohead:1});
    skull(g,hx,hy+120-96*.9,.9);g.fillStyle='#000';g.fillRect(hx-26,hy+120-96*.9-10,24,13);g.fillRect(hx+2,hy+120-96*.9-10,24,13);g.fillRect(hx-6,hy+120-96*.9-8,12,4);g.restore()}
});
