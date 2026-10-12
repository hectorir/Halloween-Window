'use strict';
// ===== ACT IV — Finale (big set pieces, then a gentle landing) =====

S(4,'Skeleton Army',120,'A',(g,t)=>{
  vg(g,0,0,W,H,'#2a0a2e','#0a0310');stars(g,0,0,W,H,t,50);moon(g,590,150,60);fog(g,0,850,W,230,t,'200,120,255',.14);
  ln(g,[[0,60],[W/2,200+M.sin(t)*10],[W,60]],'#555',3);for(let j=0;j<11;j++){const f=j/10,x=f*W,y=lerp(60,200,1-M.pow(2*f-1,2));pumpkin(g,x,y+34+M.sin(t*2+j)*6,.42,{k:j%3})}
  for(let j=0;j<8;j++)bat(g,(t*70+j*190)%(W+200)-100,330+M.sin(t*2+j)*60,.8,t*13+j);
  const P=28,cy=t%P,S1=1.1,gy=900,xt=800;
  for(let j=0;j<12;j++){const tt=9+j,xr=-100+cy*100-j*100;let x=xr,fall=0,pose=swalk(t,j*.3);
    if(cy>=tt&&cy<22){x=xt+j*10;fall=sm(pr(cy,tt,tt+.5));pose=sdance(0,0)}
    else if(cy>=22){const u=pr(cy,22,22.6);x=xt+j*10+M.max(0,cy-22.6)*100;fall=1-sm(u)}
    if(x<-120||x>W+120)continue;
    g.save();g.translate(x,gy+98*S1);g.rotate(fall*M.PI/2);g.translate(0,-98*S1);
    skel(g,0,0,S1,fall>.1?{la:[-2.4,.3],ra:[2.4,-.3],ll:[.2,.1],rl:[-.2,.1],hr:.3}:pose);g.restore();
    if(cy>=tt&&cy<tt+.7)burst(g,x+20,1010,6,cy-tt,{col:'#c9b6ff',life:.7,sp:120,g:-100,sz:6})}
  if(cy>=9&&cy<22)txt(g,'oof',xt+40,780,64,'#ffe96a');
});

S(4,'Monster Stomp',120,'A',(g,t)=>{
  const P=60,cy=t%P;vg(g,0,0,W,H,'#3b1850','#ff6a3d');g.fillStyle='rgba(0,0,0,.35)';g.fillRect(0,0,W,H);stars(g,0,0,W,380,t,40);moon(g,590,230,70);
  g.fillStyle='#0a0510';for(let x=0;x<W;x+=60)g.fillRect(x,930-rr(x)*200,50,300);
  const walking=cy<35||cy>57,sp=2.4,ph=walking?t:35,stompT=[];let sh=0;
  const lift=d=>walking?M.max(0,M.sin(t/sp*M.PI*2+d*M.PI))*210:0;
  if(walking)for(const d of[0,1]){const q=((t/sp*M.PI*2+d*M.PI)%TAU+TAU)%TAU;if(q>M.PI)sh=M.max(sh,M.exp(-(q-M.PI)*2.2))}
  if(cy>=50&&cy<54)sh=M.max(sh,.6);
  g.save();g.translate((rr(M.floor(t*30))-.5)*14*sh,(rr(M.floor(t*30)+9)-.5)*14*sh);
  [[266,0],[914,1]].forEach(([x,d])=>{const l=lift(d),by=1040-l;g.fillStyle='#000';g.beginPath();g.moveTo(x-90,-60);g.lineTo(x+90,-60);g.lineTo(x+84,by-80);g.lineTo(x+140,by-30);g.lineTo(x+150,by);g.lineTo(x-150,by);g.lineTo(x-140,by-30);g.lineTo(x-84,by-80);g.closePath();g.fill();
    g.strokeStyle='#ff9a5a';g.lineWidth=3;g.shadowColor='#ff6a3d';g.shadowBlur=12;g.stroke();g.shadowBlur=0;
    for(const dx of[-100,-50,0,50,100])poly(g,[[x+dx-16,by],[x+dx+16,by],[x+dx,by+22]],'#fff4d0');if(l<8&&walking)rg(g,x,1040,150+sh*80,'70,40,50',.5*sh)});
  g.fillStyle='#000';g.beginPath();g.moveTo(90,-20);for(let x=90;x<=1090;x+=50)g.lineTo(x,200+(x/50%2?40:0)+M.sin(t*2+x)*8);g.lineTo(1090,-20);g.fill();
  const fy=cy<38?-320:cy<42?lerp(-320,0,sm((cy-38)/4)):cy<53?0:lerp(0,-320,sm((cy-53)/4)),roar=sm(pr(cy,50,51.5))*(1-sm(pr(cy,53,54)));
  if(fy>-319){g.save();g.translate(0,fy);g.fillStyle='#000';g.beginPath();g.roundRect(100,-200,980,560,80);g.fill();
    poly(g,[[130,-150],[90,-330],[260,-170]],'#000');poly(g,[[1050,-150],[1090,-330],[920,-170]],'#000');
    const lk=M.sin(t*.7)*.6;for(const x of[300,880]){eye(g,x,230,1.7,{col:'#ff2a1a',lx:lk,ly:.2});ln(g,[[x-90,150],[x+(x<590?90:-90),185]],'#000',26)}
    g.fillStyle=`rgb(${140+roar*80},16,10)`;g.fillRect(180,430,820,10+roar*50);
    for(let x=190;x<1000;x+=46){poly(g,[[x,430],[x+23,430+34+roar*30],[x+46,430]],'#fff4d0')}g.restore()}
  g.restore();
});

S(4,'Ghost Parade & DJ',100,'A',(g,t)=>{
  vg(g,0,0,W,H,'#1d0a3a','#07020f');const cols=[['#ffd1f0','#ff4fd0'],['#cffaff','#37e6ff'],['#e6ffc8','#8cff4f'],['#fff3c0','#ffd23f']],beat=M.abs(M.sin(t*M.PI*2));
  g.save();g.globalCompositeOperation='lighter';for(let j=0;j<6;j++){const bx=100+j*190,a=M.sin(t*.9+j)*.6,q=g.createLinearGradient(bx,0,bx+a*700,800);q.addColorStop(0,`rgba(${['255,60,180','60,220,255','150,255,70'][j%3]},.4)`);q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;
    g.beginPath();g.moveTo(bx-10,0);g.lineTo(bx+10,0);g.lineTo(bx+a*700+130,800);g.lineTo(bx+a*700-130,800);g.fill()}g.restore();
  for(let j=0;j<24;j++){const h2=20+70*M.abs(M.sin(t*3+j*.7))*(.5+.5*M.sin(t*1.3+j)),x=40+j*47;g.fillStyle=`hsl(${280+j*5},90%,60%)`;g.fillRect(x,470-h2,30,h2)}
  for(let j=0;j<9;j++){const [c1,c2]=cols[j%4],x=(t*80+j*150)%(W+200)-100;ghost(g,x,300+M.sin(t*4+j)*30,1.1+beat*.05,{t:t+j,col:c1,gc:c2,m:.5})}
  for(let j=0;j<8;j++){const [c1,c2]=cols[(j+1)%4],x=W+100-((t*70+j*170)%(W+200));ghost(g,x,740+M.sin(t*4+j*2)*30,1.2,{t:t+j,col:c1,gc:c2,m:.5})}
  const bx=914,by=900;ghost(g,bx,by-60,1.6,{t,col:'#e8e8ff',gc:'#7a7aff',m:.4});
  g.fillStyle='#000';g.fillRect(bx-30,by-82,24,10);g.fillRect(bx+6,by-82,24,10);ln(g,[[bx-52,by-80],[bx-30,by-118],[bx+30,by-118],[bx+52,by-80]],'#ff4fd0',7);ell(g,bx-52,by-70,10,16,'#ff4fd0');ell(g,bx+52,by-70,10,16,'#ff4fd0');
  g.save();g.shadowColor='#37e6ff';g.shadowBlur=18;g.fillStyle='#14102a';g.strokeStyle='#37e6ff';g.lineWidth=4;g.beginPath();g.roundRect(bx-150,by,300,100,10);g.fill();g.stroke();g.restore();
  for(const d of[-1,1]){const cx=bx+d*70;ell(g,cx,by+50,38,38,'#07050f');ell(g,cx,by+50,36,36);g.strokeStyle='#37e6ff';g.lineWidth=3;g.stroke();ln(g,[[cx,by+50],[cx+M.cos(t*5*d)*34,by+50+M.sin(t*5*d)*34]],'#ff4fd0',5)}
  for(let j=0;j<50;j++){const x=rr(j)*W,y=((t*(60+rr(j+3)*80)+rr(j+9)*1100)%1150)-40;g.save();g.translate(x,y);g.rotate(t*3+j);g.fillStyle=['#ff4fd0','#37e6ff','#ffd23f','#8cff4f'][j%4];g.fillRect(-5,-3,10,6);g.restore()}
});

S(4,'The Final Countdown',100,'P',(g,t,c,i)=>{
  vg(g,0,0,532,1080,'#14082e','#05030c');const hw=halloween();
  if(!i){
    const now=QS.date?new Date(QS.date+'T23:58:30'):new Date(),sc2=now.getSeconds()+now.getMilliseconds()/1000,mn=now.getMinutes()+sc2/60,hr=now.getHours()%12+mn/60,tick=M.floor(sc2)+sm((sc2%1)*5)*.99;
    g.save();g.translate(266,260);g.shadowColor='#ffb347';g.shadowBlur=28;ell(g,0,0,190,190,'#1a1030');g.strokeStyle='#e8b04a';g.lineWidth=12;g.stroke();g.shadowBlur=0;
    for(let q=0;q<12;q++){const a=q*M.PI/6;ln(g,[[M.cos(a)*150,M.sin(a)*150],[M.cos(a)*172,M.sin(a)*172]],'#f1e4c1',q%3?6:12)}
    const hand=(a,l,w,col)=>ln(g,[[0,0],[M.sin(a)*l,-M.cos(a)*l]],col,w);hand(hr*M.PI/6,100,14,'#f1e4c1');hand(mn*M.PI/30,150,10,'#f1e4c1');hand(tick*M.PI/30,160,4,'#ff3a2a');ell(g,0,0,12,12,'#ff3a2a');g.restore();
    for(let j=0;j<5;j++)bat(g,266+M.cos(t*.7+j*1.3)*230,260+M.sin(t*.9+j*1.3)*200,.6,t*13+j);
    const a=M.sin(t*1.8)*.5;ln(g,[[266,570],[266+M.sin(a)*380,570+M.cos(a)*380]],'#999',5);skull(g,266+M.sin(a)*400,570+M.cos(a)*400,1.2,{r:-a});rg(g,266+M.sin(a)*400,570+M.cos(a)*400,120,'255,180,80',.25);
    txt(g,'TICK',266,960,70,'#ffcf6a',{glow:20});g.save();g.globalAlpha=.4+.6*(M.floor(sc2)%2);txt(g,M.floor(sc2)%2?'TOCK':'',266,1020,50,'#ff6a3d');g.restore();
  }else{
    const pd=n=>String(n).padStart(2,'0');
    if(hw.state=='before'){txt(g,String(hw.d),266,230,300,'#ff8a1f',{gc:'#ff4a00',glow:40,stroke:'#2a0a00',sw:10});txt(g,hw.d==1?'DAY':'DAYS',266,420,100,'#fff0c0');
      txt(g,`${pd(hw.h)}:${pd(hw.m)}:${pd(hw.s)}`,266,740,86,'#ffd23f',{gc:'#ff7a00',glow:30});txt(g,'UNTIL HALLOWEEN',266,880,40,'#c9b6ff');
      for(let j=0;j<7;j++)flame(g,40+j*75,1060,1.5+.4*M.sin(t*4+j),t+j,'#ff6a1a')}
    else if(hw.state=='tonight'){txt(g,'TONIGHT',266,260,150,'#ff8a1f',{gc:'#ff4a00',glow:40,stroke:'#2a0a00',sw:10});pumpkin(g,266,780,3.4,{k:1,m:.8+.2*M.sin(t*4)});
      for(let j=0;j<3;j++)burst(g,266+(j-1)*150,520,30,(t*.9+j*.35)%1.6,{col:['#ffd23f','#ff4fd0','#37e6ff'],life:1.6,sp:200})}
    else{txt(g,'SEE YOU',266,240,140,'#c9b6ff');txt(g,'NEXT YEAR',266,400,110,'#c9b6ff');ghost(g,266,830,2.8,{t,m:.3});const w2=M.sin(t*6);ln(g,[[330,840],[400,760+w2*30]],'#e6f8ff',22)}
  }
});

function candy(g,x,y,s,r,col){g.save();g.translate(x,y);g.rotate(r);g.scale(s,s);g.shadowColor=col;g.shadowBlur=10;poly(g,[[-30,0],[-12,-9],[-12,9]],col);poly(g,[[30,0],[12,-9],[12,9]],col);ell(g,0,0,16,11,col);ln(g,[[-6,-9],[6,9]],'#fff',3);g.restore()}
S(4,'Pumpkin Inflation',120,'A',(g,t)=>{
  vg(g,0,0,W,H,'#2a0d3a','#0a0316');stars(g,0,0,W,H,t,60);
  const P=24,cy=t%P,cols=['#ff4fd0','#37e6ff','#ffd23f','#8cff4f','#ff6a3d'];
  if(cy<17){const u=pr(cy,1.5,16),s=1.4+10.8*u*u*(3-2*u)*1+M.sin(cy*3)*.04*u,sh=cy>14?(rr(M.floor(t*40))-.5)*18:0;
    const ap=sm(pr(cy,0,1.2)),mv=sm(pr(u,.05,.65)),px=lerp(266,590,mv),py=lerp(800,620,mv);g.save();g.translate(sh,sh*.6);pumpkin(g,px,py,s*ap,{e:lerp(1,1.5,u),m:.1+u*.9,k:1,lit:lerp(1,.4,u)});
    if(u>.1&&u<.97)for(let j=0;j<4;j++){const q=(cy*1.2+j*.25)%1;ell(g,px+(j-1.5)*60*s*.3,py-50*s*.6+q*40*s*.3,3*s*.3,5*s*.3,`rgba(150,220,255,${1-q})`)}g.restore()}
  if(cy>=17){const a=cy-17;if(a<.7){g.fillStyle=`rgba(255,200,120,${.5*(1-a/.7)})`;g.fillRect(0,0,W,H)}
    for(let j=0;j<70;j++){const x0=rr(j)*W,v=380+rr(j+3)*300,y=-80-rr(j+7)*500+a*v;
      if(y>-40)candy(g,x0+M.sin(a*3+j)*30,M.min(y,1030),1,M.min(a,4)*5+j,cols[j%5])}
    burst(g,590,650,60,a,{col:cols,life:2,sp:620,sz:6})}
});

S(4,'Music Box',100,'S',(g,t,c,i,w,h)=>{
  vg(g,0,0,w,h,'#190a30','#07030f');
  if(i==0){stars(g,0,0,w,h,t,20);for(let j=0;j<6;j++){const u=(t*.12+j/6)%1,x=w/2+M.sin(u*7+j)*120;g.save();g.globalAlpha=M.sin(u*M.PI);g.font=`${60+rr(j)*40}px sans-serif`;g.textAlign='center';g.fillStyle=['#ffd1f0','#cffaff','#fff3c0'][j%3];g.shadowColor=g.fillStyle;g.shadowBlur=18;g.fillText(j%2?'♪':'♫',x,h-u*(h+60));g.restore()}}
  if(i==1||i==3){const cs=i==1?[[w/2,1.6]]:[[110,.9],[w/2,1.3],[w-110,.7]];cs.forEach(([x,s],j)=>{const bh=170*s;g.fillStyle='#f1e4c1';g.shadowColor='#ffb347';g.shadowBlur=14;g.beginPath();g.roundRect(x-30*s,h-bh-10,60*s,bh,8);g.fill();
      g.beginPath();g.moveTo(x-30*s,h-bh-10);g.quadraticCurveTo(x-34*s,h-bh+40*s,x-24*s,h-bh+70*s);g.lineTo(x-18*s,h-bh-10);g.fill();g.shadowBlur=0;ln(g,[[x,h-bh-10],[x,h-bh-24*s]],'#222',3);flame(g,x,h-bh-50*s,s,t+j*2);rg(g,x,h-bh-50*s,230*s,'255,170,50',.28)})}
  if(i==2){rg(g,w/2,h-80,250,'255,150,200',.3);g.fillStyle='#6b3a22';g.shadowColor='#ffb347';g.shadowBlur=14;g.beginPath();g.roundRect(w/2-140,h-150,280,130,12);g.fill();g.fillStyle='#e8b04a';g.fillRect(w/2-140,h-150,280,10);g.shadowBlur=0;
    g.save();g.translate(w/2,h-150);g.scale(M.max(.12,M.abs(M.cos(t*3))),1);
    ln(g,[[-8,0],[-8,-70]],'#f4f0e0',9);ln(g,[[8,0],[8,-70]],'#f4f0e0',9);ell(g,0,-82,52,14,'#ffb8e8');for(let q=-4;q<=4;q++)ell(g,q*12,-76,9,10,'#ff9ad8');
    ln(g,[[0,-90],[0,-132]],'#f4f0e0',10);ln(g,[[-10,-120],[-56,-170],[-34,-228]],'#f4f0e0',7);ln(g,[[10,-120],[56,-170],[34,-228]],'#f4f0e0',7);g.restore();
    skull(g,w/2,h-150-148,.6,{});for(let j=0;j<5;j++){const a=t*2+j*1.3;spark(g,w/2+M.cos(a)*90,h-250+M.sin(a*1.4)*80,6+rr(j)*5,'#ffd1f0',a)}}
});

S(4,'BOO!',100,'S',(g,t,c,i,w,h)=>{
  vg(g,0,0,w,h,'#0a1020','#02040a');for(let j=0;j<10;j++){const x=rr(j+i*9)*w+M.sin(t*.6+j)*40,y=rr(j+i*7+3)*h+M.cos(t*.5+j*2)*40,b=.4+.6*M.abs(M.sin(t*1.5+j));rg(g,x,y,26,'200,255,90',b*.8);ell(g,x,y,3,3,'#f4ffb0')}
  const P=25,k=(t/P)|0,cy=t%P,sp=(k*3+1)%4;
  if(i==sp&&cy>=18&&cy<21.8){const a=cy-18,s=a<.18?eb(a/.18)*5.4:5.4*(1-sm(pr(a,2.8,3.8))),sx=a>.2&&a<2.6?(rr(M.floor(t*40))-.5)*14:0;
    ghost(g,w/2+sx,h*.62,s,{t,m:1,ey:1.3,r:sx*.003});if(a>.2&&a<2.6)txt(g,'BOO!',w/2,70,90,'#ffe96a',{gc:'#ff4a00'})}
  const up=sm(pr(cy,22.2+i*.25,23+i*.25));if(up>0&&cy>=22){ghost(g,w/2+M.sin(t*20+i)*3,h+10-up*140,.95,{t,ey:.4,m:.8,gc:['#ff4fd0','#37e6ff','#8cff4f','#ffd23f'][i]})}
});

S(4,'Fireworks',110,'A',(g,t)=>{
  vg(g,0,0,W,H,'#080818','#14082a');stars(g,0,0,W,H,t,50);
  const cols=[['#ffd23f','#fff3c0'],['#ff4fd0','#ffd1f0'],['#37e6ff','#cffaff'],['#8cff4f','#e6ffc8'],['#ff6a3d','#ffd23f']];
  const shapes=[
    (q,u)=>{const a=q*TAU/70+rr(q)*.1,v=270*(.4+rr(q+3)*.6);return[M.cos(a)*v*u,M.sin(a)*v*u]},
    (q,u)=>{const a=q*TAU/48;return[M.cos(a)*250*u,M.sin(a)*250*u]},
    (q,u)=>{const a=q*TAU/60;return q<46?[M.cos(a*60/46)*210*u,M.sin(a*60/46)*175*u]:q<50?[(q-48)*22*u,-205*u]:[((q-50)%3-1)*60*u,-60*u+(M.floor((q-50)/3)-1.5)*-30*u]},
    (q,u)=>{const f=(q%25)/24,d=q<25?1:-1;return q<50?[d*(10+f*180)*u,(f<.5?-60*M.sin(f*M.PI*1.6):-60*M.sin(.5*M.PI*1.6)+(f-.5)*60+22*M.abs(M.sin(f*M.PI*5)))*u]:[M.cos(q)*14*u,M.sin(q*2)*30*u]}];
  const n0=M.floor(t/1.7);
  for(let k=n0-2;k<=n0;k++){if(k<0)continue;const e=k*1.7+rr(k)*.8,x=100+rr(k+1)*980,y=120+rr(k+2)*560,a=t-e,col=cols[k%5],ty=(k%4);
    if(a>-.9&&a<0){const u=(a+.9)/.9;ln(g,[[x+(1-u)*40,lerp(1080,y,u*(2-u))],[x+(1-u)*40+3,lerp(1080,y,u*(2-u))+30]],'#ffe9a0',4)}
    if(a>=0&&a<3.2){const u=1-M.pow(1-M.min(1,a/.9),3),al=1-pr(a,1.6,3.2);g.save();g.globalAlpha=al;g.shadowBlur=10;
      if(a<.5)rg(g,x,y,300,'255,230,180',.3*(1-a/.5));const cnt=ty==0?70:ty==1?48:ty==2?60:75;
      for(let q=0;q<cnt;q++){const[px,py]=shapes[ty](q,u),fall=a>.9?(a-.9)*(a-.9)*30:0,cc=ty==2?(q<46?'#ff8a1f':q<50?'#4fae35':'#ffe27a'):ty==3?'#c27bff':col[q%2];
        g.shadowColor=cc;ell(g,x+px,y+py+fall,3.4,3.4,cc)}g.restore()}}
});

S(4,'Sweet Dreams',140,'A',(g,t)=>{
  vg(g,0,0,W,H,'#05030c','#020106');
  const out=sm(pr(t,108,114)),fl=sm(pr(t,10,16))*(1-out),lean=sm(pr(t,96,108))*(1-out);
  const cx=266,cy2=860;
  g.fillStyle='#f1e4c1';g.shadowColor='#ffb347';g.shadowBlur=10*fl;g.beginPath();g.roundRect(cx-34,cy2,68,170,8);g.fill();g.beginPath();g.moveTo(cx-34,cy2);g.quadraticCurveTo(cx-40,cy2+50,cx-28,cy2+90);g.lineTo(cx-20,cy2);g.fill();g.shadowBlur=0;
  ln(g,[[cx,cy2],[cx,cy2-16]],'#222',4);
  if(fl>0){g.save();g.translate(lean*14,0);rg(g,cx,cy2-40,420,'255,170,60',.35*fl*(.8+.2*M.sin(t*13)));flame(g,cx,cy2-44,(1.2-lean*.5)*fl,t);g.restore()}
  if(out>0&&out<1){for(let j=0;j<12;j++){const u=((t-108)*.25+j*.08)%1;rg(g,cx+M.sin(u*8+j)*24,cy2-30-u*300,20+u*40,'200,200,220',.2*(1-u)*(1-pr(t,114,125)))}}
  const lines=['Sweet','dreams...'],full=lines.join(' '),nch=M.floor(pr(t,20,50)*full.length),a2=1-sm(pr(t,108,112));
  if(nch>0){g.save();g.globalAlpha=a2;const s1=full.slice(0,nch);txt(g,s1.slice(0,5),914,200,110,'#ffe9c0',{gc:'#ffb347'});if(nch>6)txt(g,s1.slice(6),914,320,82,'#ffe9c0',{gc:'#ffb347'});g.restore()}
  const q=sm(pr(t,56,66))*a2;if(q>0){g.save();g.globalAlpha=q*(.6+.4*M.sin(t*7));txt(g,'?',914,420,160,'#ff3a2a');g.restore()}
  const ey=sm(pr(t,72,76))*(1-sm(pr(t,104,108)));if(ey>0){g.save();g.globalAlpha=ey;const bl=(t%9>8.8)?.05:1;for(const d of[-1,1])eye(g,914+d*100,820,.8,{col:'#ff3a2a',open:bl,lx:-.6+lean*0,ly:0});g.restore()}
  if(t>=114&&t<132){const e2=1-pr(t,114,132);rg(g,cx,cy2-6,40,'255,90,30',.7*e2)}
  if(t>125&&t<131){const u=pr(t,125,131);spark(g,860,260,24*M.sin(u*M.PI),'#fff',t*3)}
});
