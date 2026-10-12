'use strict';
// ===== ACT V — The Night Isn't Over (3D ghosts: three.js + custom shaders, see ghost3d.js) =====

// 37. A smoke vortex gathers in the dark, motes condense into a draped sheet ghost, it drifts, notices you, rushes the glass, dissolves
G3.scene('The Gathering',60,()=>{const o=G3.stage(),geo=G3.sheetGeo({len:5.4});
  o.fog=G3.quad(`uniform vec2 uC;uniform float uA,uB,uR;
void main(){vec2 p=pxc(),d=p-uC;float r=length(d)/uR,a=atan(d.y,d.x),sw=a-uT*.32+2.4/(r+.3);vec2 k=vec2(cos(sw),sin(sw))*r*2.2;
 float n=fbm(vec3(k*1.3,uT*.04)),n2=fbm(vec3(k*2.7+n*1.2,uT*.06+3.)),ring=exp(-pow((r-.62)/.42,2.)),v=smoothstep(.05,.95,n*.55+n2*.6+.2)*ring*uA;
 float low=smoothstep(600.,1080.,p.y)*smoothstep(-.1,.8,fbm(vec3(p*.0035+vec2(uT*.025,0.),uT*.03)))*uB;
 gl_FragColor=vec4(mix(vec3(.16,.24,.34),vec3(.66,.8,.95),v)*v+vec3(.25,.36,.48)*low*.4,1.);}`,{uC:new THREE.Vector2(266,430),uA:0,uB:0,uR:430});
  o.g=new THREE.Mesh(geo,G3.shell({uFold:.9,uFlut:.6,uHem:.86,uRimP:2}));o.g.frustumCulled=false;
  o.pt=G3.points(2400,`uniform float uIn,uOut;uniform mat4 uM;uniform vec3 uC;
void motion(vec4 r,vec3 tg,out vec3 p,out float a,out float s,inout vec3 c){
 float rad=(.2+r.y*.85)*430.,an=r.z*6.2831-uT*(.45/(.25+r.y));
 vec3 vo=uC+vec3(cos(an)*rad,sin(an)*rad*.55+(r.w-.5)*160.,sin(an)*rad*.5),tp=(uM*vec4(tg,1.)).xyz;float f=smoothstep(r.x*.5,r.x*.5+.5,uIn);
 p=mix(vo,tp,f)+vec3(0.,sin(f*3.1416)*90.*(r.y-.5),0.);
 float sh=fract(uT*.07+r.x*3.7)*step(.6,r.w);p+=vec3(sin(r.z*20.+uT)*30.,110.*sh,20.)*sh*f;
 float o=smoothstep(r.x*.4,r.x*.4+.6,uOut),ao=an-o*5.;p=mix(p,uC+vec3(cos(ao)*rad*(1.+o*1.6),sin(ao)*rad*.5+o*o*520.,sin(ao)*rad),o);
 a=(.25+.75*r.w)*mix(1.,sin(sh*3.1416),step(.6,r.w)*f)*(1.-o*o)*mix(1.,.28+.5*sh,f);s=5.+8.*r.y*(1.-f*.5);c=mix(vec3(.5,.66,.9),vec3(.9,1.,1.),r.w);}`,
  {uIn:0,uOut:0,uM:new THREE.Matrix4(),uC:G3.V3(G3.wx(266),G3.wy(430),0)},G3.sample(geo,2400,1));
  o.scene.add(o.fog,o.pt,o.g);
  o.path=G3.spline([[0,266,215,-250],[20,266,205,0],[24,330,200,0],[31,914,210,0],[37,905,200,60],[39.6,700,330,760],[42.5,420,200,-120],[48,266,215,-60],[60,266,225,-200]]);
  return o},
(o,t)=>{const m=o.g.material,b=1+.03*M.sin(t*1.3),sp=G3.drive(o.g,o.path,t,{dt:.1});o.g.scale.set(78*b,78/b,78*b);
  const nt=sm(pr(t,31.5,34.5))*(1-sm(pr(t,37.5,39.5)));o.g.rotation.y=M.sin(t*.37)*.4*(1-nt)-.25*nt;o.g.rotation.z+=.3*nt*M.sin(M.min(1,pr(t,31.5,33))*M.PI*.5);o.g.updateMatrixWorld();
  const out=sm(pr(t,50,57)),e=sm(pr(t,19,23.5))*(1-sm(pr(t,49,52))),mo=e*(.75+.25*M.sin(t*.9)+.7*sm(pr(t,38.5,39.6))*(1-sm(pr(t,41,43))));
  G3.uf(o.fog.material,{uA:sm(pr(t,3,14))*(1-.55*sm(pr(t,22,30)))+.55*sm(pr(t,42,47))*(1-sm(pr(t,52,59))),uB:sm(pr(t,0,8))*(1-sm(pr(t,52,59)))});
  G3.uf(m,{uDis:M.max(1-sm(pr(t,13,21.5)),out),uFlut:.5+M.min(sp,2500)*.0006});
  const H=m.uniforms.uH.value;H[0].set(-.36,.1,.15*e,.27*e);H[1].set(.36,.1,.15*e,.27*e);H[2].set(0,-.42-.1*mo,.13*mo,.2*mo);
  G3.uf(o.pt.material,{uIn:sm(pr(t,9,19)),uOut:out,uAlpha:sm(pr(t,4,10))});o.pt.material.uniforms.uM.value.copy(o.g.matrixWorld);
});

// 38. A ghost chandelier lights up; a couple condenses out of the floor mist and waltzes (3/4 rise and fall), fading behind the frame,
//     a second couple phases in far behind; they rise into the air spinning, turn to motes that drift up, the candles go out
function g5couple(sd){const G=new THREE.Group(),L=[.62,.88,.8],Lr=[.7,1,.88],B=[.55,.68,.95],Br=[.7,.84,1],ms=[];
  const mk=o=>{const m=G3.shell(Object.assign({seed:sd+ms.length},o));ms.push(m);return m};
  const lb=mk({uCol:L,uRim:Lr,uBody:.12}),ls=mk({uCol:L,uRim:Lr,uBody:.13,uFold:.5,uFlut:.9,uHem:.7,uLagP:1}),gb=mk({uCol:B,uRim:Br,uBody:.12}),gt=mk({uCol:B,uRim:Br,uBody:.12,uHem:.55,uFold:.3,uFlut:.4});
  const add=(geo,m,x,y,z,s=[1,1,1])=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.scale.set(...s);o.frustumCulled=false;G.add(o);return o};
  const lathe=p=>new THREE.LatheGeometry(p.map(q=>new THREE.Vector2(q[0],q[1])),24),tube=(p,r)=>new THREE.TubeGeometry(new THREE.CatmullRomCurve3(p.map(q=>new THREE.Vector3(...q))),24,r,8);
  add(new THREE.SphereGeometry(.12,24,18),lb,.2,1.63,0,[1,1.15,1]);add(new THREE.SphereGeometry(.07,16,12),lb,.29,1.72,0);
  add(lathe([[0,.97],[.12,1],[.14,1.12],[.16,1.3],[.17,1.42],[.12,1.5],[.045,1.54],[.04,1.58]]),lb,.2,0,0);
  G.skirt=add(G3.grid(56,24,(u,v)=>{const th=u*TAU,r=lerp(.12,.64,M.pow(v,.85))*(1+.07*M.sin(th*9)*v);return[r*M.cos(th),lerp(1,0,v),r*M.sin(th)]}),ls,.2,0,0);
  add(tube([[.2,1.45,.15],[.16,1.38,.42],[0,1.43,.6]],.035),lb,0,0,0);add(tube([[.2,1.46,-.15],[.02,1.5,-.26],[-.15,1.53,-.18]],.035),lb,0,0,0);
  add(new THREE.SphereGeometry(.13,24,18),gb,-.2,1.75,0,[1,1.12,1]);
  add(lathe([[0,.9],[.15,.92],[.17,1.1],[.2,1.35],[.23,1.48],[.12,1.59],[.05,1.62],[.05,1.68]]),gb,-.2,0,0,[1,1,.8]);
  add(G3.grid(40,10,(u,v)=>{const th=u*TAU,r=lerp(.16,.23,v);return[r*M.cos(th),lerp(.95,.42,v),r*M.sin(th)*.8]}),gt,-.2,0,0);
  add(tube([[-.2,1.5,.2],[-.17,1.4,.48],[0,1.43,.6]],.04),gb,0,0,0);add(tube([[-.2,1.5,-.2],[.04,1.3,-.27],[.26,1.25,-.1]],.04),gb,0,0,0);
  G.ms=ms;G.cloth=[ls,gt];return G}
G3.scene('The Last Waltz',62,()=>{const o=G3.stage();
  o.fog=G3.quad(`uniform float uA,uL;
void main(){vec2 p=pxc();float n=fbm(vec3(p*.003+vec2(uT*.03,0.),uT*.04)),fl=smoothstep(700.,1060.,p.y)*smoothstep(-.2,.8,n);
 float cone=exp(-abs(p.x-590.)/(140.+max(p.y-130.,0.)*.55))*smoothstep(130.,260.,p.y)*smoothstep(1000.,300.,p.y)*(.6+.4*fbm(vec3(p*.004,uT*.05+5.)));
 float hz=exp(-length((p-vec2(590.,150.))*vec2(.6,1.))/260.);
 gl_FragColor=vec4(vec3(.32,.42,.5)*fl*.5*uA+vec3(1.,.72,.42)*(cone*.045+hz*.03)*uL,1.);}`,{uA:0,uL:0});
  // chandelier: rings, arms, candles, hanging crystals
  const ch=o.ch=new THREE.Group(),cm=G3.shell({uCol:[.8,.68,.5],uRim:[.78,.66,.48],uBody:.05,uRimP:1.8}),cand=[];
  const ad=(g,x,y,z,r)=>{const m=new THREE.Mesh(g,cm);m.position.set(x,y,z);if(r)m.rotation.set(...r);m.frustumCulled=false;ch.add(m);return m};
  ad(new THREE.TorusGeometry(1,.035,8,64),0,0,0,[M.PI/2,0,0]);ad(new THREE.TorusGeometry(.5,.03,8,48),0,-.18,0,[M.PI/2,0,0]);ad(new THREE.CylinderGeometry(.025,.025,1.6,8),0,.8,0);
  ad(new THREE.SphereGeometry(.16,16,12),0,-.25,0);
  for(let i=0;i<10;i++){const a=i/10*TAU,x=M.cos(a),z=M.sin(a);ad(new THREE.CylinderGeometry(.05,.05,.22,10),x,.12,z);cand.push(x,.3,z);
    ad(new THREE.OctahedronGeometry(.055),x*.75,-.3-.08*(i%2),z*.75,[0,a,0]);ad(new THREE.OctahedronGeometry(.045),x,-.16,z)}
  ch.ms=[cm];const cp=new Float32Array(cand),fl=`uniform mat4 uM;uniform float uL,uOut,uSz,uSm;
float ci(vec3 t){return fract(sin(dot(t,vec3(12.9898,78.233,37.719)))*43758.5453);}
void motion(vec4 r,vec3 tg,out vec3 p,out float a,out float s,inout vec3 c){float h=ci(tg),on=smoothstep(h*4.,h*4.+1.5,uL)*(1.-smoothstep(h*5.,h*5.+.6,uOut));
 p=(uM*vec4(tg,1.)).xyz+vec3(sin(uT*1.3+h*20.)*3.,0.,0.);a=on*(.85+.15*sin(uT*1.7+h*30.));s=uSz*(.9+.1*sin(uT*1.1+h*9.));c=mix(vec3(1.,.62,.28),vec3(1.,.9,.7),uSm);
 if(uSm>0.){float age=fract(uT*.25+r.x),gone=smoothstep(h*5.+.3,h*5.+1.2,uOut);p+=vec3(sin(age*6.+r.y*9.)*20.,age*190.,0.);a=gone*(1.-age)*.35*(1.-smoothstep(.85,1.,uOut));s=10.+age*40.;c=vec3(.6,.62,.66);}}`;
  o.f1=G3.points(10,fl,{uM:new THREE.Matrix4(),uL:0,uOut:0,uSz:22,uSm:0},cp.slice(),3);o.f2=G3.points(10,fl,{uM:new THREE.Matrix4(),uL:0,uOut:0,uSz:85,uSm:0},cp.slice(),3);
  const sm2=new Float32Array(10*24*3);for(let i=0;i<240;i++)sm2.set(cand.slice((i%10)*3,(i%10)*3+3),i*3);o.f3=G3.points(240,fl,{uM:new THREE.Matrix4(),uL:0,uOut:0,uSz:20,uSm:1},sm2,4);
  o.c1=g5couple(1);o.c2=g5couple(7);
  o.mo=G3.points(900,`uniform vec3 uA0,uA1,uB;uniform float uRise,uDust;
void motion(vec4 r,vec3 tg,out vec3 p,out float a,out float s,inout vec3 c){
 vec3 dp=vec3((r.x-.5)*1100.,(r.y-.5)*1000.+sin(uT*.2+r.z*9.)*30.,(r.z-.5)*500.);dp.x+=sin(uT*.15+r.w*7.)*40.;
 vec3 sp=mix(uA0,uA1,step(.5,r.w))+vec3((r.x-.5)*120.,r.y*340.,(r.z-.5)*120.);float f=smoothstep(r.x*.45,r.x*.45+.55,uRise),an=f*6.+r.z*6.28;
 vec3 rp=mix(sp,uB+vec3(cos(an)*300.*r.y,-40.+r.z*60.,sin(an)*120.),f)+vec3(sin(f*5.+r.z*9.)*60.*(1.-f),0.,0.);
 float isR=step(.62,r.y+r.w*.0);p=mix(dp,rp,isR);a=mix(.22*uDust*(.4+.6*sin(uT*.6+r.w*20.)),sin(f*3.1416)*.9,isR);s=mix(4.+4.*r.z,6.+6.*r.z,isR);
 c=mix(vec3(.9,.82,.68),vec3(.75,.95,.9),isR);}`,{uA0:G3.V3(0,0,0),uA1:G3.V3(0,0,0),uB:G3.V3(0,0,0),uRise:0,uDust:0},null,9);
  o.scene.add(o.fog,ch,o.f2,o.f1,o.f3,o.c2,o.c1,o.mo);
  o.p1=G3.spline([[0,260,1010,0],[8,260,1010,0],[14,380,1000,-150],[18,600,990,-300],[22,840,1000,-150],[29,930,1010,60],[34,700,1000,-100],[38,330,990,0],[44,280,720,250],[52,266,440,200],[62,266,440,200]]);
  o.p2=G3.spline([[0,150,1010,-1700],[16,150,1010,-1700],[26,330,1000,-1900],[36,200,1010,-1700],[62,200,1010,-1700]]);
  return o},
(o,t)=>{const lit=pr(t,1,7)*6,out=pr(t,50,57)*6;
  o.ch.position.set(...G3.at(590,175,-250));o.ch.scale.setScalar(320);o.ch.rotation.set(-.32+M.sin(t*.35)*.03,t*.08,M.sin(t*.27)*.025);o.ch.updateMatrixWorld();
  o.ch.ms[0].uniforms.uAlpha.value=.75*sm(pr(t,0,6))*(1-sm(pr(t,55,60)));
  for(const f of[o.f1,o.f2,o.f3]){f.material.uniforms.uM.value.copy(o.ch.matrixWorld);G3.uf(f.material,{uL:lit,uOut:out})}
  G3.uf(o.fog.material,{uA:sm(pr(t,2,8))*(1-sm(pr(t,50,58))),uL:sm(pr(t,2,8))*(1-sm(pr(t,50,56)))});
  const pose=(G,P,t,spin,flare,dis,al)=>{const b=M.pow(M.sin((t%1.95)/1.95*M.PI),2);G.position.set(P[0],P[1]+b*14,P[2]);
    const k=(G3.FZ-P[2])/G3.FZ;G.scale.setScalar(205);G.rotation.set(.13,spin,M.sin(t*1.6)*.05);
    G.skirt.scale.set(1+flare,1-flare*.25,1+flare);G.updateMatrixWorld();
    G.ms.forEach(m=>G3.uf(m,{uDis:dis,uAlpha:al}));G.cloth.forEach(m=>{const u=m.uniforms.uTr.value;for(let j=0;j<8;j++){const Q=G===o.c1?o.p1(t-j*.09):o.p2(t-j*.09);u[j].set(Q[0]-P[0],Q[1]-P[1],Q[2]-P[2]).multiplyScalar(.004)}})};
  // behind the wall strip (x 490-690) the dancers thin out, then reappear
  const P1=o.p1(t),sx=W/2+P1[0]*G3.FZ/(G3.FZ-P1[2]),hide=sm(pr(170-M.abs(sx-590),0,120))*(t<38?1:0);
  const spin=t*TAU/3.3+sm(pr(t,38,50))*14,dis1=M.max(1-sm(pr(t,6,13)),hide*.85,sm(pr(t,46,52)));
  pose(o.c1,P1,t,spin,.06+.06*M.sin(t*TAU/1.95)+sm(pr(t,38,46))*.3,dis1,1);
  const ph=sm(pr(t,16,21))*(1-sm(pr(t,32,36)))*(.55+.45*M.sin(t*.9));pose(o.c2,o.p2(t),t+.7,-t*TAU/3.6+1,.08,1-ph*.85,.8);
  const B=G3.at(590,190,-250);G3.uf(o.mo.material,{uB:B,uRise:pr(t,46,56),uDust:sm(pr(t,3,10))*(1-sm(pr(t,52,59)))});
  o.mo.material.uniforms.uA0.value.set(P1[0]-40,P1[1],P1[2]);o.mo.material.uniforms.uA1.value.set(P1[0]+40,P1[1],P1[2]);
});

// 39. Pale hands drift out of the fog behind the glass and press against it, leaving frost prints; some drag down; then a face presses through
const G5F=[[-.32,.44,.74,.17],[-.11,.5,.86,.06],[.11,.49,.8,-.06],[.31,.42,.62,-.17],[-.43,-.18,.6,1.0]];   // fingers + thumb: base x,y, length, angle
const G5FS=1.3;   // splay when pressed
const G5PRINT=`uniform float uA,uSl,uGr,uSeed;
float hsd(vec2 p){float d=sdEl(p,vec2(.47,.56));
 ${G5F.map(([x,y,l,a])=>{const b=a*G5FS;return `d=smin(d,sdCap(p,vec2(${x},${y}),vec2(${(x-l*M.sin(b)).toFixed(3)},${(y+l*M.cos(b)).toFixed(3)}),.11),.07);`}).join('')}
 return d;}
void main(){vec2 p=q*1.9+vec2(0.,.35);float d=hsd(p),sl=1e3;
 ${G5F.slice(0,4).map(([x,y,l,a])=>{const b=a*G5FS;return `sl=min(sl,sdCap(p,vec2(${(x-l*M.sin(b)).toFixed(3)},${(y+l*M.cos(b)-.05).toFixed(3)}),vec2(${(x-l*M.sin(b)).toFixed(3)},${(y+l*M.cos(b)-.05).toFixed(3)}-uSl),.06+.02*sin(p.y*9.+uSeed)));`}).join('')}
 d=smin(d,sl,.04);float body=smoothstep(.05,-.08,d),fr=fbm(vec3(p*7.,uSeed)),cr=pow(1.-abs(snoise(vec3(p*11.,uSeed+3.))),7.);
 float gr=smoothstep(uGr,uGr-.45,length(p-vec2(0.,.15))),fz=body*(.08+.3*smoothstep(-.1,.8,fr))+cr*smoothstep(.3,-.05,d)*.6+exp(-abs(d)*30.)*.4;
 gl_FragColor=vec4(vec3(.58,.85,1.)*fz*gr,uA*smoothstep(1.,.85,max(abs(q.x),abs(q.y))));}`;
function g5hand(sd){const G=new THREE.Group(),m=G3.shell({seed:sd,uCol:[.62,.82,.95],uRim:[.72,.9,1],uBody:.09,uRimP:2}),fa=G3.shell({seed:sd+.5,uCol:[.62,.82,.95],uRim:[.72,.9,1],uBody:.06,uY0:-.2,uY1:.75,uAlpha:.6});
  const mesh=(g,mt)=>{const o=new THREE.Mesh(g,mt);o.frustumCulled=false;return o};
  const palm=mesh(new THREE.SphereGeometry(.5,28,20),m);palm.scale.set(.95,1.12,.3);G.add(palm);G.palm=palm;
  const arm=mesh(new THREE.CapsuleGeometry(.3,1.2,6,14),fa);arm.position.set(0,-1.15,-.12);arm.scale.z=.7;G.add(arm);
  G.f=G5F.map(([x,y,l,a],i)=>{const pv=new THREE.Group(),c=mesh(new THREE.CapsuleGeometry(i==4?.12:.1,l-.2,6,12),m);c.position.y=l/2-.05;pv.add(c);pv.position.set(x,y,0);pv.a=a;G.add(pv);return pv});
  G.ms=[m,fa];return G}
G3.scene('Hands on the Glass',48,()=>{const o=G3.stage();
  o.fog=G3.quad(`uniform float uA;void main(){vec2 p=pxc();float n=fbm(vec3(p*.0026+vec2(uT*.015,-uT*.01),uT*.035)),m=fbm(vec3(p*.006-vec2(0.,uT*.02),uT*.06+4.));
 gl_FragColor=vec4(vec3(.11,.17,.23)*pow(smoothstep(-.2,1.,n+.35*m),1.6)*uA,1.);}`,{uA:0});o.scene.add(o.fog);
  // [start, x, y, mirrored, size, slide]
  o.ev=[[2,266,830,0,120,0],[7,900,250,1,105,0],[9.5,1030,330,0,95,0],[12,900,820,0,115,170],[14.5,170,230,1,100,0],[16,390,900,0,90,0],[17.5,360,300,0,105,120],
    [18.5,1040,700,1,90,0],[19.5,790,160,0,85,0],[20.5,140,690,1,100,140],[21.5,640,980,1,80,0],[22.5,1050,130,1,80,0]];
  o.h=o.ev.map((e,i)=>{const G=g5hand(i*3.3);const pc=G3.card(G5PRINT,{uA:0,uSl:0,uGr:0,uSeed:i*1.3});o.scene.add(pc,G);G.pc=pc;return G});
  o.face=new THREE.Mesh(G3.faceGeo(),G3.shell({seed:9,uCol:[.6,.8,.95],uRim:[.72,.9,1],uBody:.1,uRimP:2.4,uBack:1,uHoleZ:-3,uGlint:.9}));o.face.frustumCulled=false;o.scene.add(o.face);
  return o},
(o,t)=>{G3.uf(o.fog.material,{uA:sm(pr(t,0,5))*(1-sm(pr(t,40,47)))});const all=sm(pr(t,36,42));
  o.ev.forEach(([t0,x,y,mi,sz,sl],i)=>{const G=o.h[i],a=t-t0,ap=1-M.pow(1-cl(a/3.6),3),hold=pr(a,3.6,6.4),slide=sm(pr(a,4.6,6.6))*sl,back=sm(pr(a,6.8,10))+all;
    const z=lerp(-2600,0,ap)-back*1800,P=G3.at(x,y+slide,z),pz=sm(pr(a,3.2,3.9))*(1-back);
    G.position.set(P[0],P[1],P[2]);G.scale.set(sz*(mi?-1:1),sz,sz*(1-.45*pz));G.rotation.set(-.25*(1-ap)+.1*M.sin(t*.7+i),M.sin(t*.5+i)*.25*(1-pz),M.sin(i*2.1)*.15+M.sin(t*.6+i)*.06*(1-pz));
    G.f.forEach((f,k)=>{f.rotation.z=f.a*lerp(1,G5FS,pz)+M.sin(t*2+k+i)*.05*(1-pz);f.rotation.x=lerp(.55+.25*M.sin(t*1.3+k*.7+i),0,pz)});
    const dis=M.max(1-sm(pr(a,0,2.6)),sm(pr(a,7.2,10)),all);G.visible=a>0&&dis<1;G.ms.forEach(m=>G3.uf(m,{uDis:dis}));
    const pa=sm(pr(a,3.5,4))*(1-sm(pr(a,9,15)))*(1-all);G.pc.visible=pa>0;G.pc.position.set(...G3.at(x,y,1));G.pc.scale.set(sz*1.7*(mi?-1:1),sz*1.7,1);
    G3.uf(G.pc.material,{uA:pa,uSl:slide/sz,uGr:pr(a,3.5,5.5)*2.4})});
  // the face: rises out of the fog in the lower-right pane, presses, gasps, pulls back
  const a=t-26,ap=1-M.pow(1-cl(a/4),3),bk=sm(pr(a,8,12)),fz=lerp(-3000,-40,ap)-bk*2600,P=G3.at(905,800,fz),f=o.face;
  f.visible=a>0&&a<13;f.position.set(P[0],P[1],P[2]);f.scale.set(150,150,150*(1-.3*sm(pr(a,3.6,4.4))*(1-bk)));f.rotation.set(-.1+.08*M.sin(t*.6),M.sin(t*.4)*.3*(1-sm(pr(a,2,4))),M.sin(t*.5)*.06);
  G3.uf(f.material,{uDis:M.max(1-sm(pr(a,0,3)),sm(pr(a,9,12.5))),uJaw:sm(pr(a,4,5.5))*(1-sm(pr(a,7.5,9)))*.9,uGlint:.9*sm(pr(a,4,5))});
  const mo=sm(pr(a,4,5.5))*(1-sm(pr(a,7.5,9))),H=f.material.uniforms.uH.value;H[0].set(-.36,.22,.19,.14);H[1].set(.36,.22,.19,.14);H[2].set(0,-.5-.2*mo,.16+.06*mo,.04+.22*mo);
});

// 40. Electric-blue wraith: wanders far off in jerky stops, lunges at the glass screaming, swerves away, crawls back along the sill, lunges again, bursts into sparks
const WRAITH=`uniform float uA,uScr,uSeed,uTurn,uLay,uCr,uCw,uK;uniform vec4 uArm;
vec2 hc,eL,eR;float hole;
float fig(vec2 p){float m=uScr;hc=vec2(uTurn*.035,.42);eL=hc+vec2(-.062+uTurn*.03,.035);eR=hc+vec2(.062+uTurn*.03,.035);
 float d=sdEl(p-hc-vec2(0.,-.035*m),vec2(.145-.02*m,.185+.055*m));
 d=smin(d,sdCap(p,vec2(0.,.2),vec2(0.,-.06),.14),.07);d=smin(d,sdCap(p,vec2(-.19,.2),vec2(.19,.2),.065),.08);
 d=smin(d,sdCap(p,vec2(0.,-.06),vec2(.1*sin(uT*.7+uSeed),-.8),.05+.09*smoothstep(-.8,-.06,p.y)),.12);
 for(int s=0;s<2;s++){float sg=s==0?-1.:1.,ra=s==0?uArm.x:uArm.y,re=s==0?uArm.z:uArm.w;
  vec2 S=vec2(sg*.19,.2),E=vec2(sg*(.47+.06*re),.24+ra*.16),Hd=vec2(sg*(.74+.12*re),.13+ra*.38);float cw=uCw*sg;
  E=mix(E,vec2(sg*.36,.4+.12*cw),uCr);Hd=mix(Hd,vec2(sg*(.3-.08*cw),.72+.2*cw),uCr);
  d=smin(d,sdCap(p,S,E,.052),.05);d=smin(d,sdCap(p,E,Hd,.04),.03);vec2 dr=normalize(Hd-E);
  for(int i=0;i<4;i++){float an=(float(i)-1.5)*.34*sg;vec2 f=vec2(dr.x*cos(an)-dr.y*sin(an),dr.x*sin(an)+dr.y*cos(an));d=smin(d,sdCap(p,Hd,Hd+f*(.12+.03*float(i==1||i==2)),.016),.025);}}
 hole=min(min(sdEl(p-eL,vec2(.036,.027+.012*m)),sdEl(p-eR,vec2(.036,.027+.012*m))),sdEl(p-hc-vec2(uTurn*.025,-.085-.05*m),vec2(.04+.018*m,.025+.1*m)));
 return d;}
void main(){vec2 p=q*1.04;float tf=smoothstep(.0,-.85,p.y),af=smoothstep(.45,.95,abs(p.x));
 p+=.03*vec2(fb2(vec3(p*5.,uT*.8+uSeed)),fb2(vec3(p*5.+7.,uT*.8-uSeed)))*(1.+3.5*tf+2.5*af);p.x+=.07*sin(p.y*7.+uT*2.3+uSeed)*tf;
 float kk=pow(uK,.7),d=fig(p),ins=smoothstep(.012,-.012,d),edg=exp(-abs(d)*55.*kk),halo=exp(-max(d,0.)*9.*kk)*.22/kk;
 float st=fb2(vec3(p.x*13.,p.y*3.5-uT*.9,uSeed)),rib=smoothstep(.5,.95,sin(p.y*80.))*smoothstep(.13,.0,abs(p.x))*smoothstep(-.04,.02,p.y)*smoothstep(.22,.14,p.y);
 float ho=smoothstep(.006,-.006,hole),he=exp(-abs(hole)*85.*kk);
 float I=edg*1.15+ins*(.1+.38*smoothstep(-.2,.8,st)+.55*rib)/kk+halo;I=I*(1.-ho*.95)+he*.8;
 float pu=exp(-dot(p-eL,p-eL)*5000.)+exp(-dot(p-eR,p-eR)*5000.);
 float fade=smoothstep(-.98,-.5,p.y)*(1.-smoothstep(.9,1.,abs(q.x)))*(1.-smoothstep(.9,1.,q.y));
 vec3 c=vec3(.1,.36,1.)*I+vec3(.7,.88,1.)*(pow(edg,3.)*.7+he*.4*ins+pu*1.6);
 gl_FragColor=vec4(c,uA*fade);}`;
G3.scene('The Wraith',52,()=>{const o=G3.stage();
  o.fog=G3.quad(`uniform vec3 uW;uniform float uA;
void main(){vec2 p=pxc();float n=fbm(vec3(p*.0024+vec2(0.,uT*.02),uT*.05)),cu=pow(.5+.5*sin(p.x*.012+sin(p.x*.0037+uT*.13)*2.3),5.);
 float v=smoothstep(-.25,.9,n)*.45+cu*smoothstep(-.3,.7,fbm(vec3(p.x*.008,p.y*.0018-uT*.04,2.)))*.5,gl=exp(-length(p-uW.xy)/uW.z);
 gl_FragColor=vec4((vec3(.02,.06,.17)+vec3(.08,.28,.85)*gl*.5)*v*uA,1.);}`,{uW:G3.V3(0,0,1),uA:0});
  o.cards=[0,1,2,3,4,5].map(k=>{const c=G3.card(WRAITH,{uA:0,uScr:0,uSeed:k*1.7,uTurn:0,uLay:k,uCr:0,uCw:0,uK:1,uArm:new THREE.Vector4()});o.scene.add(c);return c});
  o.sp=G3.points(700,`uniform vec3 uW;uniform float uBurst,uS;
void motion(vec4 r,vec3 tg,out vec3 p,out float a,out float s,inout vec3 c){
 float age=fract(uT*(.05+.05*r.x)+r.y);p=vec3((r.z-.5)*1180.+sin(uT*.3+r.w*9.)*40.,-560.+age*1200.,(r.w-.5)*600.);a=.5*sin(age*3.1416)*(1.-uBurst);s=5.+6.*r.w;
 float b=smoothstep(r.x*.3,r.x*.3+.5,uBurst);vec3 dir=normalize(vec3(r.z-.5,r.w-.35,r.x-.5)+.001);
 vec3 bp=uW+dir*uS*(.15+r.y*1.2)*b+vec3(sin(r.z*30.+uT)*40.,b*b*350.*r.x,0.);
 if(uBurst>0.){p=mix(p,bp,step(.35,r.y));a=mix(a,(1.-b)*b*4.*(.5+r.w),step(.35,r.y));s=mix(s,6.+10.*r.w,step(.35,r.y));}
 c=mix(vec3(.2,.5,1.),vec3(.8,.95,1.),r.w*r.w);}`,{uW:G3.V3(0,0,0),uBurst:0,uS:300});o.scene.add(o.fog,o.sp);
  // jerky "uncanny" path: ease-out lunges that stop dead; [t,x,y,z]
  const eo=u=>1-M.pow(1-u,4);
  o.path=G3.track([[0,830,700,-3600],[6,830,700,-3600],[8,700,760,-3000],[10.5,700,760,-3000],[11.5,980,640,-2600],[14,980,640,-2600],[15,880,250,-1900],
    [19.4,900,240,-1500],[21.2,914,240,1500],[23.4,922,256,1430],[25.6,-500,-300,600],[27,1500,840,-700],[29,1300,840,-700],[36.5,170,840,-700],
    [38.6,260,720,-600],[40.6,262,250,1560],[44,270,262,1460],[52,272,266,1400]],eo);   // head position
  return o},
(o,t)=>{const P=o.path(t);
  const scr=M.max(.25*sm(pr(t,15,19)),sm(pr(t,19.6,20.8))*(1-sm(pr(t,23,24.5))),sm(pr(t,39,40.6)))*(1-sm(pr(t,46,48)))+.06*M.sin(t*1.7);
  const crawl=sm(pr(t,26.5,27.5))*(1-sm(pr(t,36.3,38))),cw=M.sin(t*3.2);
  const arm=M.max(sm(pr(t,19.4,21)),sm(pr(t,38.6,40.5)))*(1-crawl),A=sm(pr(t,5,9))*(1-sm(pr(t,44.5,47)));
  const burst=sm(pr(t,43.5,49));
  o.cards.forEach((c,k)=>{const tr=k>2,lag=tr?(k-2)*.07:0,Q=o.path(t-lag),jx=k==1?6:k==2?-6:0;
    const nr=(G3.FZ-Q[2])/G3.FZ,rz=crawl*1.45+M.sin(t*.9)*.08+(k?M.sin(t*2.1+k)*.02:0),s=300*(k==2?1+.05*nr:1);c.rotation.z=rz;c.scale.set(s,s,1);
    c.position.set(Q[0]+jx*nr+126*M.sin(rz),Q[1]-126*M.cos(rz),Q[2]-(k==1?40:k==2?-40:0)*nr);
    G3.uf(c.material,{uA:A*(k==0?1:k<3?.42:.38/(k-2))*(tr?sm(pr(M.hypot(...[0,1,2].map(i=>P[i]-Q[i])),20,200)):1),uK:M.max(1,o.cam.position.z/(o.cam.position.z-Q[2])),uScr:cl(scr),uTurn:M.sin(t*.45)*.7*(1-arm),uCr:crawl,uCw:cw,
      uArm:[.15+arm*.9,.15+arm*.9,arm*.8,arm*.8]})});
  const k=o.cam.position.z/(o.cam.position.z-P[2]);G3.uf(o.fog.material,{uA:sm(pr(t,0,6))*(1-sm(pr(t,47,51))),uW:[W/2+P[0]*k,H/2-P[1]*k,M.min(500,220*k)*A+1]});
  G3.uf(o.sp.material,{uW:P,uBurst:burst,uS:300*k,uAlpha:sm(pr(t,1,6))*(1-sm(pr(t,48,51.5)))});
});

// 41. Faces with smoke tails rise through fog, moaning out of step; they all turn to you at once, stream together into one huge face
//     that fills the left window, turns, glints, screams silently, then drains away like sand
const G5TAIL=`uniform float uA,uSeed;void main(){float y=q.y*.5+.5,x=q.x+.3*fb2(vec3(q.x*1.5,q.y*2.+uT*.4,uSeed))*(1.-y),w=mix(.12,.62,pow(y,1.4));
 float I=smoothstep(w,w*.15,abs(x))*smoothstep(-.25,.8,fbm(vec3(x*4.,q.y*2.5-uT*.5,uSeed)))*smoothstep(0.,.7,y)*smoothstep(1.,.9,y);
 gl_FragColor=vec4(vec3(.45,.66,.82)*I*.55,uA);}`;
const G5FC=[[150,290,-900],[390,170,-1500],[300,830,-600],[120,930,-1300],[830,250,-800],[1050,140,-1600],[1010,860,-700],[790,800,-1200]];
G3.scene('The Choir',56,()=>{const o=G3.stage(),fg=G3.faceGeo();
  o.fog=G3.quad(`uniform float uA;void main(){vec2 p=pxc();float n=fbm(vec3(p*.0028+vec2(uT*.02,uT*.03),uT*.04));
 gl_FragColor=vec4(vec3(.16,.24,.3)*smoothstep(-.2,.9,n)*(.25+.75*smoothstep(500.,1080.,p.y))*uA,1.);}`,{uA:0});o.scene.add(o.fog);
  o.f=G5FC.map((c,i)=>{const m=new THREE.Mesh(fg,G3.shell({seed:i*2.1,uCol:[.6,.82,.9],uRim:[.72,.92,.95],uBody:.1,uRimP:2.4,uBack:1,uHoleZ:-3,uY0:-1.25,uY1:-.75,uWob:.05}));
    m.frustumCulled=false;m.tail=G3.card(G5TAIL,{uA:0,uSeed:i*1.7});o.scene.add(m.tail,m);return m});
  o.big=new THREE.Mesh(fg,G3.shell({seed:5,uCol:[.6,.8,.92],uRim:[.72,.9,1],uBody:.07,uRimP:2.4,uBack:1,uHoleZ:-3,uNS:1.8,uDisF:10,uWob:.05}));o.big.frustumCulled=false;o.scene.add(o.big);
  o.pt=G3.points(3200,`uniform vec3 uFP[8];uniform mat4 uM;uniform float uIn,uOut;
void motion(vec4 r,vec3 tg,out vec3 p,out float a,out float s,inout vec3 c){int i=int(r.x*7.999);vec3 st=uFP[0];
 for(int k=1;k<8;k++)if(k==i)st=uFP[k];
 st+=vec3(r.y-.5,r.z-.5,r.w-.5)*110.;vec3 tp=(uM*vec4(tg,1.)).xyz;float d=fract(r.x*8.)*.4,f=smoothstep(d,d+.6,uIn);
 p=mix(st,tp,f*f*(3.-2.*f))+vec3(0.,sin(f*3.1416)*(r.w-.5)*140.,sin(f*3.1416)*120.);
 float o=smoothstep(r.y*.5,r.y*.5+.5,uOut);p+=vec3((r.z-.5)*260.*o+sin(uT*2.+r.w*30.)*20.*o,-o*o*(500.+700.*r.w),(r.w-.5)*300.*o);
 a=sin(f*3.1416)*.55+f*.2*(1.-o)+(o>0.?o*(1.-o)*3.*(.3+r.w):0.);a*=step(.001,uIn);s=5.+6.*r.w;c=mix(vec3(.5,.7,.85),vec3(.85,.97,1.),r.z);}`,
  {uFP:G5FC.map(()=>G3.V3(0,0,0)),uM:new THREE.Matrix4(),uIn:0,uOut:0},G3.sample(fg,3200,3),5);o.scene.add(o.pt);
  return o},
(o,t)=>{G3.uf(o.fog.material,{uA:sm(pr(t,0,6))*(1-sm(pr(t,48,55)))});const turn=sm(pr(t,21,24.5)),go=pr(t,27,34);
  o.f.forEach((f,i)=>{const[x,y,z]=G5FC[i],r=1-M.pow(1-cl((t-1.5-i*1.4)/12),2),P=G3.at(x+M.sin(t*.3+i)*25,y+(1-r)*720+M.sin(t*.5+i*2)*10-pr(t,14,27)*30,z);
    f.position.set(P[0],P[1],P[2]);f.scale.setScalar(78);f.rotation.set(lerp(.18*M.sin(t*.4+i),0,turn),lerp(M.sin(t*.27+i*1.9)*.9,0,turn),lerp(.12*M.sin(t*.33+i),0,turn));
    const mo=(.5+.5*M.sin(t*.8+i*1.3))*(1-turn*.6)+turn*.4,dis=M.max(1-sm(pr(t,1.5+i*1.4,6+i*1.4)),sm(pr(go,i/8*.6,i/8*.6+.35)));
    G3.uf(f.material,{uDis:dis,uJaw:mo*.6,uGlint:turn*.9});const H=f.material.uniforms.uH.value;H[0].set(-.36,.22,.19,.14);H[1].set(.36,.22,.19,.14);H[2].set(0,-.5-.15*mo,.15+.05*mo,.04+.18*mo);
    f.tail.position.set(P[0],P[1]-78*1.15-150,P[2]-5);f.tail.scale.set(85,170,1);G3.uf(f.tail.material,{uA:(1-dis)*.9});
    o.pt.material.uniforms.uFP.value[i].set(P[0],P[1],P[2])});
  const b=o.big,B=G3.at(266,470,-150),tw=sm(pr(t,36,42)),scr=sm(pr(t,42.5,44.5))*(1-sm(pr(t,47,49)));b.position.set(B[0],B[1]-scr*8,B[2]);b.scale.set(275,275*(1+scr*.04),275);
  b.rotation.set(lerp(.25,-.05,tw)+M.sin(t*.4)*.03,lerp(-.62,0,tw)+M.sin(t*.3)*.04,lerp(-.15,.05,tw));b.updateMatrixWorld();
  const out=sm(pr(t,47.5,53));G3.uf(b.material,{uDis:M.max(1-sm(pr(t,31,39)),out),uJaw:scr*.6+.06,uGlint:sm(pr(t,40,41.5))*1.1*(1-out),uDisDir:[0,-1,0]});
  const H=b.material.uniforms.uH.value,e=sm(pr(t,38,41));H[0].set(-.36,.22,.19*e,.14*e);H[1].set(.36,.22,.19*e,.14*e);H[2].set(0,-.5-.2*scr,.15+.07*scr,.03+.24*scr);
  o.pt.material.uniforms.uM.value.copy(b.matrixWorld);G3.uf(o.pt.material,{uIn:go,uOut:pr(t,47,54),uAlpha:1-sm(pr(t,52,55))});
});

// 42. Hide and seek: a little sheet ghost peeks from behind the wall strip, then over the rail, plays with a warm orb, waves...
//     and then it isn't there. The orb drifts on alone and breaks into fireflies that fade into the dark (gentle end of the loop)
G3.scene('Hide and Seek',50,()=>{const o=G3.stage();
  o.fog=G3.quad(`uniform float uA;void main(){vec2 p=pxc();float n=fbm(vec3(p*.003+vec2(uT*.02,0.),uT*.03));
 gl_FragColor=vec4(vec3(.12,.17,.22)*smoothstep(-.1,.9,n)*smoothstep(650.,1080.,p.y)*uA,1.);}`,{uA:0});
  o.g=new THREE.Mesh(G3.sheetGeo({arm:1.1,len:2.3}),G3.shell({seed:4,uFold:.8,uFlut:.7,uHem:.72,uCol:[.62,.8,.92],uRim:[.78,.93,1],uBody:.2}));o.g.frustumCulled=false;
  o.orb=G3.card(`uniform float uA;void main(){float r=length(q);gl_FragColor=vec4(vec3(1.,.78,.5)*(exp(-r*r*70.)*1.4+exp(-r*r*7.)*.22),uA);}`,{uA:0});
  o.ff=G3.points(14,`uniform vec3 uO;uniform float uS;
void motion(vec4 r,vec3 tg,out vec3 p,out float a,out float s,inout vec3 c){float f=smoothstep(0.,.25,uS),u=uS;
 p=uO+vec3((r.x-.5)*700.*u+sin(uT*.7+r.y*20.)*30.*f,(r.y-.2)*500.*u+cos(uT*.6+r.z*20.)*25.*f,(r.z-.5)*400.*u);
 a=f*(1.-smoothstep(.25+r.w*.55,.35+r.w*.6,u))*(.7+.3*sin(uT*1.4+r.x*30.));s=20.+10.*r.z;c=mix(vec3(1.,.8,.5),vec3(.85,1.,.7),r.y);}`,{uO:G3.V3(0,0,0),uS:0},null,11);
  o.scene.add(o.fog,o.orb,o.ff,o.g);
  // ghost: peek from the strip into LL, duck; rise over the rail into UR, sink; appear in LR, play; wave; gone
  o.path=G3.track([[0,620,860,0],[4.5,620,860,0],[6,470,855,0],[8.5,470,855,0],[9.4,640,860,0],[12,800,700,0],[13.6,800,470,0],[16,800,480,0],[16.8,800,700,0],
    [19,900,830,-200],[23,960,800,-150],[25.5,880,820,-100],[27,880,800,0],[38,880,800,0]],sm);
  o.op=G3.spline([[0,266,860,0],[4,420,840,0],[8,400,800,0],[11,560,530,0],[14,760,420,-50],[17,900,700,-100],[19,820,760,-120],[21,1000,720,-150],[23,880,880,-150],[25,800,760,-100],
    [27,960,760,0],[33,960,740,0],[38,900,700,200],[42,800,620,300],[50,800,620,300]]);
  return o},
(o,t)=>{G3.uf(o.fog.material,{uA:sm(pr(t,0,5))*(1-sm(pr(t,36,44)))});
  const g=o.g,P=o.path(t);G3.drive(g,o.path,t,{dt:.09,lag:.7});g.position.set(P[0],P[1]+M.sin(t*1.7)*6,P[2]);const sc=62*(1+.03*M.sin(t*1.5));g.scale.set(sc,sc,sc);
  const peekL=sm(pr(t,5,6.5))*(1-sm(pr(t,8.4,9.4))),peekU=sm(pr(t,13,14.5))*(1-sm(pr(t,15.8,16.8))),face=sm(pr(t,26,28));
  g.rotation.z+=.45*peekL-.15*peekU*M.sin(t*2)+.12*face*M.sin(t*.9);g.rotation.y=-.6*peekL+M.sin(t*1.3)*.5*peekU+(t>17&&t<26?M.sin(t*1.1)*.5:0)*(1-face);g.updateMatrixWorld();
  const vis=M.max(peekL,peekU,sm(pr(t,17,19))),gone=sm(pr(t,32.5,35.5));
  G3.uf(g.material,{uDis:M.max(1-vis,gone),uAlpha:1,uArm:sm(pr(t,28.5,29.2))*(1-sm(pr(t,31.5,32.3)))*(.75+.25*M.sin(t*7))});
  const e=sm(pr(t,4,5)),H=g.material.uniforms.uH.value;H[0].set(-.34,.12,.15*e,.25*e);H[1].set(.34,.12,.15*e,.25*e);H[2].set(0,-.38,.07*e,.1*e);
  const O=o.op(t),al=sm(pr(t,0,3))*(1-sm(pr(t,40,42.5)));o.orb.position.set(O[0],O[1]+M.sin(t*2.1)*8,O[2]);o.orb.scale.set(70,70,1);G3.uf(o.orb.material,{uA:al});
  G3.uf(o.ff.material,{uO:[O[0],O[1],O[2]],uS:pr(t,40,49)});
});
