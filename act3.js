'use strict';
// ===== ACT III — Something's Watching (creepy) =====

S(3,'Eyes in the Dark',100,'A',(g,t)=>{
  vg(g,0,0,W,H,'#0a0612','#020104');const cols=['#ffe14d','#ff3030','#7dff6a','#e8f4ff','#37e6ff','#ff4fd0'];
  for(let j=0;j<16;j++){const p=CFG.panes[j%4],x=p.x+50+rr(j+3)*(p.w-100),y=p.y+50+rr(j+9)*(p.h-100),to=3+j*4.4,s=.22+rr(j+5)*.2;
    const o=sm(pr(t,to,to+1.4))*(1-sm(pr(t,84+(15-j)*.7,86+(15-j)*.7))),bl=((t*.35+rr(j)*9)%7>6.85||(t>70&&t<71.2))?.05:1,f=sm(pr(t,66,76));
    if(o<=0)continue;g.save();g.globalAlpha=o;for(const d of[-1,1])eye(g,x+d*s*62,y,s,{col:cols[j%6],open:bl,lx:lerp(M.sin(t*.3+j)*.9,0,f),ly:lerp(.3*M.sin(t*.4+j),0,f)});g.restore()}
  const q=sm(pr(t,60,66))*(1-sm(pr(t,82,86)));if(q>0){g.save();g.globalAlpha=q;const p=CFG.panes[2];for(const d of[-1,1])eye(g,p.x+p.w/2+d*130,p.y+p.h/2,1,{col:'#ff2a2a',open:t>70&&t<71.2?.05:1,lx:0,ly:0});g.restore()}
});

function hprint(g,x,y,s,a){g.save();g.globalAlpha=a;g.translate(x,y);g.scale(s,s);g.fillStyle='#000';ell(g,0,0,34,40,'#000');
  [[-30,-30,-20,-84],[-12,-42,-10,-102],[8,-42,10,-100],[26,-34,32,-90]].forEach(f=>ln(g,[[f[0],f[1]],[f[2],f[3]]],'#000',13));ln(g,[[-32,6],[-58,-20]],'#000',14);g.restore()}
S(3,'Fogged Glass',100,'P',(g,t,c,i)=>{
  vg(g,0,0,532,1080,'#46606a','#222f35');fog(g,0,0,532,1080,t,'210,230,240',.1,12);
  const P=20,cy=(t+i*3)%P,k=(t/P)|0,a=1-pr(cy,15,19);
  if(!i){[1.5,5,9].forEach((tp,n)=>{if(cy<tp)return;const x=100+rr(k*3+n)*330,y=(n%2?700:150)+rr(k*3+n+9)*240,tl=pr(cy,tp+.3,tp+3.5)*160,u=sm(pr(cy,tp,tp+.12));
      g.save();g.globalAlpha=a;for(const dx of[-30,-12,8,26])ln(g,[[x+dx,y-60],[x+dx,y-60+tl]],'#000',10);g.restore();hprint(g,x,y,1.4,a*u)})}
  else{
    g.save();g.globalAlpha=a;g.beginPath();g.rect(0,0,pr(cy,1,6)*532,1080);g.clip();g.font=`150px ${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText('HELP',266,230);g.restore();
    g.save();g.globalAlpha=a;for(let j=0;j<6;j++){const x=96+j*68,tl=pr(cy,5.5+j*.3,9)*(70+rr(j)*120);ln(g,[[x,290],[x,290+tl]],'#000',7)}g.restore();
    const m=pr(cy,8,11.5);if(m>0&&m<1){hprint(g,266,lerp(660,990,m),1.7,a);g.save();g.globalAlpha=a;for(const dx of[-40,-15,10,36])ln(g,[[266+dx,lerp(660,990,m)-70],[266+dx,610]],'#000',9);g.restore()}
  }
});

const CRK={};
function genCracks(w,h,sd){const segs=[];let n=0,mx=0;
  const br=(x,y,a,len,dep,d)=>{if(dep>4)return;let px=x,py=y;for(let s=0;s<len;s++){a+=(rr(sd+n++)-.5)*.7;const l=12+rr(sd+n)*14,nx=px+M.cos(a)*l,ny=py+M.sin(a)*l;
    segs.push([px,py,nx,ny,d,M.max(1.5,5-dep)]);d+=l;mx=M.max(mx,d);px=nx;py=ny;if(px<-5||py<-5||px>w+5||py>h+5)return;
    if(rr(sd+n*3)<.09&&len-s>8)br(px,py,a+(rr(sd+n+2)>.5?1:-1)*(.5+rr(sd+n+1)),M.floor((len-s)*.7),dep+1,d)}};
  const ox=w*(.3+rr(sd)*.4),oy=h*(.3+rr(sd+1)*.4);for(let r=0;r<7;r++)br(ox,oy,r*TAU/7+rr(sd+r)*.5,26,0,0);return{segs,mx}}
S(3,'Cracks',100,'S',(g,t,c,i,w,h)=>{
  const cr=CRK[i]||(CRK[i]=genCracks(w,h,i*1000+7)),P=35,cy=t%P,k=(t/P)|0,a=1-pr(cy,31,35),pu=.6+.4*M.sin(t*2);
  vg(g,0,0,w,h,'#1c0606','#080202');rg(g,w/2,h/2,300,'255,40,20',.3*pu*sm(pr(cy,8,14))*a);
  if(k%4==i&&cy>10&&cy<30){g.save();g.globalAlpha=sm(pr(cy,10,13))*(1-sm(pr(cy,28,30)));eye(g,w/2,h/2,3.4,{col:'#ff3a2a',lx:M.sin(t*.8),ly:M.cos(t*.6)*.5});g.restore()}
  const prog=sm(cy/12)*cr.mx*1.05;g.save();g.globalAlpha=a;g.shadowColor='#9cf';g.shadowBlur=10;
  for(const[x1,y1,x2,y2,d,wd]of cr.segs){if(d>prog)continue;ln(g,[[x1,y1],[x2,y2]],'#e8f4ff',wd)}
  g.restore();
});

function figure(g,x,y,s,t,o={}){
  g.save();g.translate(x,y);g.scale(s,s);const sw=M.sin(t*.8)*2;
  ln(g,[[-5,-92],[-8,0]],'#000',9);ln(g,[[5,-92],[8,0]],'#000',9);poly(g,[[-15,-166],[15,-166],[10,-90],[-10,-90]],'#000');
  ln(g,[[-15,-162],[-24+sw,-60]],'#000',6);ln(g,[[15,-162],[24-sw,-60]],'#000',6);ln(g,[[0,-166],[0,-186]],'#000',6);
  g.save();g.translate(0,-198);g.rotate(o.tilt??M.sin(t*.4)*.12);ell(g,0,0,9,13,'#000');g.shadowColor='#fff';g.shadowBlur=8;ell(g,-3.6,-1,2.3,2.8,'#fff');ell(g,3.6,-1,2.3,2.8,'#fff');g.restore();g.restore();
}
function deadTree(g,x,y,h,sd){g.lineCap='round';g.strokeStyle='#000';g.lineWidth=h*.05;g.beginPath();g.moveTo(x,y);g.lineTo(x+rr(sd)*20-10,y-h);g.stroke();
  for(let q=0;q<5;q++){const by=y-h*(.3+q*.15),dx=(q%2?1:-1)*(h*.25+rr(sd+q)*h*.2);g.lineWidth=h*.025;g.beginPath();g.moveTo(x,by);g.lineTo(x+dx,by-h*.2);g.lineTo(x+dx*1.3,by-h*.3);g.stroke()}}
S(3,'The Shadow Approaches',100,'P',(g,t,c,i)=>{
  vg(g,0,0,532,1080,'#4f736b','#1d312d');moon(g,380,170,52,{col:'#eef6e6'});fog(g,0,500,532,500,t,'200,230,220',.16,10);
  const flick=i&&M.sin(t*23)*M.sin(t*7.3)>.7?.4:1;
  if(!i){deadTree(g,70,1000,420,1);deadTree(g,470,1000,360,2);deadTree(g,60,470,250,3);
    const u=pr(t,5,82),e=u*u,s=.1+2.2*e,y0=700+430*M.pow(u,1.2);
    if(t>3){figure(g,266+M.sin(t*.2)*30*(1-u),y0,s,t,{tilt:u>.9?.25:undefined});
      if(t>82){const q=sm(pr(t,82,90));g.save();g.translate(266,lerp(1100,820,q));g.scale(3.2,3.2);
        ell(g,0,0,34,40,'#000');[[-30,-30,-20,-84],[-12,-42,-10,-102],[8,-42,10,-100],[26,-34,32,-90]].forEach(f=>ln(g,[[f[0],f[1]],[f[2],f[3]]],'#000',13));g.restore()}}
  }else{deadTree(g,100,1010,380,5);deadTree(g,450,1000,300,6);deadTree(g,300,720,120,7);
    rg(g,150,640,260,'255,214,120',.5*flick);ln(g,[[150,1000],[150,660]],'#000',10);ell(g,150,650,14,10,`rgba(255,235,170,${flick})`);
    [[30,350,730,.34],[55,300,790,.6],[75,250,880,1]].forEach(([ts,x,y,s],j)=>{const o=sm(pr(t,ts,ts+.3));if(o>0){g.save();g.globalAlpha=o;figure(g,x,y,s*1.1,t);g.restore()}});
  }
});

function web(g,x,y,s,f){g.save();g.translate(x,y);g.scale(s*f,s);g.strokeStyle='rgba(235,240,255,.7)';g.lineWidth=1.5;
  for(let j=0;j<=6;j++){const a=j*M.PI/12;g.beginPath();g.moveTo(0,0);g.lineTo(M.cos(a)*140,M.sin(a)*140);g.stroke()}
  for(let r=1;r<=6;r++){g.beginPath();for(let j=0;j<=6;j++){const a=j*M.PI/12,rr2=r*22+(j%2?-5:0);g.lineTo(M.cos(a)*rr2,M.sin(a)*rr2)}g.stroke()}g.restore()}
S(3,'Spider Infestation',100,'A',(g,t)=>{
  vg(g,0,0,W,H,'#150a24','#050208');CFG.panes.forEach((p,i)=>web(g,i%2?p.x+p.w:p.x,p.y,1.5,i%2?-1:1));
  const cols=['#8cff4f','#e8f4ff','#c27bff'];
  for(let j=0;j<46;j++){const d=j%2?1:-1,sp=40+rr(j)*80,r=((t*sp+rr(j+4)*1600)%(W+240))-120,x=d>0?r:W-r,y=60+rr(j+7)*950;xf(g,x,y,1,d*M.PI/2,()=>spider(g,0,0,.8+rr(j+2)*.7,t*1.4+j,cols[j%3]))}
  const b=pr(t,35,75);if(b>0&&b<1)xf(g,lerp(-250,W+250,b),700,1,M.PI/2,()=>spider(g,0,0,4.5,t*.9,'#8cff4f'));
});

S(3,'The Watchers',90,'S',(g,t,c,i,w,h)=>{
  vg(g,0,0,w,h,'#0e0a24','#05030f');
  if(i==0){moon(g,w/2,h/2,150,{face:1,look:M.sin(t*.5)});stars(g,0,0,w,h,t,18)}
  if(i==1){ln(g,[[0,h-80],[w,h-60]],'#2a1f12',16);const hx=M.sin(t*.4)*34;ell(g,w/2,h-170,92,100,'#6b4a2e');ell(g,w/2+hx,h-250,86,70,'#80583a');
    poly(g,[[w/2+hx-70,h-300],[w/2+hx-50,h-345],[w/2+hx-30,h-295]],'#80583a');poly(g,[[w/2+hx+70,h-300],[w/2+hx+50,h-345],[w/2+hx+30,h-295]],'#80583a');
    const bl=(t%7>6.8)?.1:1;for(const d of[-1,1])eye(g,w/2+hx+d*40,h-250,.6,{col:'#ffb020',round:1,open:bl,lx:-hx/34});poly(g,[[w/2+hx-8,h-232],[w/2+hx+8,h-232],[w/2+hx,h-205]],'#e8a020')}
  if(i==2){const a=M.sin(t*1.4)*.6,px=w/2,py=0;rg(g,px+M.sin(a)*330,M.cos(a)*330,230,'255,170,40',.4);ln(g,[[px,py],[px+M.sin(a)*300,M.cos(a)*300]],'#777',4);
    xf(g,px+M.sin(a)*330,M.cos(a)*330,1,-a,()=>{g.fillStyle='#2a2a30';g.fillRect(-30,-30,60,60);flame(g,0,10,.9,t);ln(g,[[-30,-30],[30,-30]],'#999',6);ln(g,[[-30,30],[30,30]],'#999',6)});
    for(let j=0;j<4;j++){const q=t*2+j*1.7;spark(g,px+M.sin(a)*330+M.cos(q)*(60+j*14),M.cos(a)*330+M.sin(q*1.3)*50,5,'#dfe',q)}}
  if(i==3){[[90,.9],[w/2,1.2],[w-90,.9]].forEach(([x,s],j)=>{const turn=j==1?sm(pr(t%40,18,26))*(1-sm(pr(t%40,34,38))):0;pumpkin(g,x,h-110,s*1.5,{nf:turn<.02,fx:M.max(.05,turn),fs:1-turn,k:j,e:turn,m:.2+turn*.3,lit:j==1?.4+turn*.6:.2})});stars(g,0,0,w,h-200,t,10,3)}
});

S(3,'Crows on the Rail',100,'A',(g,t)=>{
  vg(g,0,0,W,H,'#241a42','#8a4a6a');moon(g,590,300,60,{col:'#fff0e0'});
  g.fillStyle='#120c22';g.fillRect(0,880,W,200);ln(g,[[0,904],[W,904]],'#120c22',10);for(let x=20;x<W;x+=130)ln(g,[[x,1080],[x,880]],'#120c22',14);
  const pk=[];for(let j=0;j<5;j++)pk.push([70+j*85,472],[720+j*85,472]);for(const x of[150,420,760,1010])pk.push([x,880]);
  pk.forEach(([px,py],j)=>{const ta=3+j*5.5,u=pr(t,ta,ta+3),last=j==9,out=last?0:pr(t,76+rr(j)*3,80+rr(j)*3);
    const dir=t>62?-1:(rr(j+3)>.5?1:-1),bob=t>ta+3&&M.sin(t*.7+j*3)>.92?4:0;
    if(t<ta||out>=1)return;
    if(u<1){const e=sm(u),sx=(px<590?-120:W+120),x=lerp(sx,px,e),y=py-M.sin(e*M.PI)*160-(1-e)*140;crow(g,x,y,1.6,{fl:t*18+j,dir:px>sx?1:-1})}
    else if(out>0){const e=out*out,x=px+e*(px<590?-1:1)*900,y=py-e*600;crow(g,x,y,1.6,{fl:t*18+j,dir:px<590?-1:1})}
    else crow(g,px,py+bob,1.6,{dir,ec:last&&t>85?'#f33':'#fff'})});
});

S(3,'Creeping Tendrils',100,'A',(g,t)=>{
  vg(g,0,0,W,H,'#0a2a1a','#030c06');for(let j=0;j<4;j++)rg(g,150+j*300,300+M.sin(t*.4+j)*100,380,'90,255,150',.1);fog(g,0,0,W,H,t,'120,255,170',.05,8);
  const P=50,cy=t%P,gr=sm(pr(cy,0,24))*(1-sm(pr(cy,40,50)));
  [[120,1080,-.9],[560,1080,0],[1060,1080,.9],[W/2,0,.2]].forEach(([bx,by,bias],j)=>{
    const n=M.floor(46*gr*(j==3?.7:1));let x=bx,y=by,a=(by?-M.PI/2:M.PI/2)+bias*.6;const pts=[];
    for(let q=0;q<n;q++){a+=M.sin(t*.8+q*.2+j*2)*.12;x+=M.cos(a)*24;y+=M.sin(a)*24;pts.push([x,y,34-q*.55])}
    for(const[col,ex]of[['rgba(130,255,190,.6)',7],['#000',0]])pts.forEach(([px,py,wd],q)=>{if(q)ln(g,[[pts[q-1][0],pts[q-1][1]],[px,py]],col,M.max(4,wd)+ex)});
    if(n>2){const l=pts[n-1];eye(g,l[0],l[1],.32,{col:'#c8ff4f',lx:M.sin(t+j),ly:M.cos(t*.7)})}});
});

S(3,'Giant Eye',90,'S',(g,t,c,i,w,h)=>{
  vg(g,0,0,w,h,'#140404','#050101');const P=15,act=(t/P|0)%4,cy=t%P;if(act!=i){rg(g,w/2,h/2,200,'140,20,20',.2);return}
  const e=sm(pr(cy,0,2))*(1-sm(pr(cy,13,15))),lx=M.sin(cy*.9)*.9,ly=M.cos(cy*.6)*.4,off=(1-e)*(i%2?1:-1)*w;
  g.save();g.translate(off,0);g.beginPath();g.ellipse(w/2,h/2,w*.52,h*.4,0,0,TAU);g.fillStyle='#f4d9d0';g.shadowColor='#ff5a5a';g.shadowBlur=30;g.fill();g.shadowBlur=0;
  g.save();g.clip();for(let j=0;j<22;j++){const a=rr(j)*TAU;g.beginPath();g.moveTo(w/2+M.cos(a)*w*.55,h/2+M.sin(a)*h*.45);g.quadraticCurveTo(w/2+M.cos(a+.3)*w*.35,h/2+M.sin(a+.3)*h*.3,w/2+M.cos(a)*100+lx*40,h/2+M.sin(a)*70+ly*30);g.strokeStyle='rgba(200,30,30,.55)';g.lineWidth=2;g.stroke()}
  const ix=w/2+lx*70,iy=h/2+ly*40,pu=34+26*M.sin(cy*1.3);ell(g,ix,iy,100,100,'#9a7a1a');ell(g,ix,iy,78,78,'#c8a02a');ell(g,ix,iy,pu,pu,'#000');ell(g,ix-26,iy-28,12,9,'#fff');
  const bl=cy%6;if(bl>5.3){const m=(bl-5.3)/.7,x=lerp(-w*.2,w*1.2,m);g.fillStyle='rgba(215,238,240,.92)';g.fillRect(x-80,0,160,h)}g.restore();g.restore();
});

S(3,'Flickering Hall',90,'S',(g,t,c,i,w,h)=>{
  vg(g,0,0,w,h,'#6f93b0','#36546e');const P=24,cy=t%P,te=[3,7,11,15];let dip=0;te.forEach(e=>{dip=M.max(dip,M.max(0,1-M.abs(cy-e)/.45))});
  const st=te.filter(e=>cy>e).length,s=[.1,.35,.55,.85,1.3][st]*1.7,out=cy>19&&cy<22.5;
  if(!out&&st>0||st==0&&cy>1){const y=h-6;
    if(i==0)sil(g,w/2,y,s);
    if(i==1){sil(g,w/2,y,s*.7);ln(g,[[w/2+30*s*.7,y-90*s*.7],[w/2+60*s*.7,y-300*s*.7]],'#000',2);ell(g,w/2+60*s*.7,y-330*s*.7,20*s*.7,26*s*.7,'#e0182c')}
    if(i==2){g.save();g.translate(w/2,y);g.scale(s*1.2,s*1.2);ell(g,0,-50,60,28,'#000',-.2);ell(g,-62,-62,16,15,'#000');
      ln(g,[[-40,-48],[-80,0]],'#000',9);ln(g,[[30,-40],[60,0]],'#000',9);ln(g,[[-20,-52],[-60,-5]],'#000',9);ln(g,[[50,-50],[90,-4]],'#000',9);g.restore()}
    if(i==3){sil(g,w/2,y,s);for(let q=-3;q<=3;q++)ln(g,[[w/2+q*5*s,y-185*s],[w/2+q*9*s+M.sin(t+q)*3,y-95*s]],'#000',6*s)}}
  g.fillStyle=`rgba(0,0,0,${M.min(1,dip*.97+(out?.97:0))})`;g.fillRect(0,0,w,h);
});
