'use strict';
// ===== Act V support: one shared three.js (WebGL) renderer, ghost shaders, procedural meshes =====
// World units = canvas px on the z=0 plane (x right, y UP, origin at canvas centre). Everything is a pure function of t.
const G3=(()=>{
const T3=typeof THREE!='undefined'?THREE:null,FOV=30,FZ=H/2/M.tan(FOV*M.PI/360);
let q=cl(+QS.gl||.6,.2,1),R=null,cv=null,bad=!T3,lost=false,lastRun=0,slow=0;
const cache={},errs=[],RES={value:null},QU={value:q},TU={value:0};
const wx=x=>x-W/2,wy=y=>H/2-y,V3=(x,y,z)=>new T3.Vector3(x,y,z),C3=(r,g,b)=>new T3.Color(r,g,b);
function size(){R.setSize(M.round(W*q),M.round(H*q),false);QU.value=q;RES.value.set(cv.width,cv.height)}
function init(){if(R||bad)return R;
  try{cv=document.createElement('canvas');
    cv.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true});cv.addEventListener('webglcontextrestored',()=>{lost=false});
    R=new T3.WebGLRenderer({canvas:cv,antialias:false,alpha:false,stencil:false,powerPreference:'high-performance'});
    R.setPixelRatio(1);R.setClearColor(0,1);RES.value=new T3.Vector2();size();
    R.debug.onShaderError=(gl,p,vs,fs)=>errs.push((gl.getProgramInfoLog(p)||'')+(gl.getShaderInfoLog(vs)||'')+(gl.getShaderInfoLog(fs)||''));
  }catch(e){bad=true;R=null}
  return R}
// ---- GLSL: simplex noise (Ashima Arts / Stefan Gustavson, MIT) + fbm + 2D SDF helpers ----
const NZ=`
vec3 m289(vec3 x){return x-floor(x*(1./289.))*289.;}vec4 m289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 prm(vec4 x){return m289(((x*34.)+1.)*x);}
float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
 vec3 i=floor(v+dot(v,C.yyy)),x0=v-i+dot(i,C.xxx),g=step(x0.yzx,x0.xyz),l=1.-g,i1=min(g.xyz,l.zxy),i2=max(g.xyz,l.zxy);
 vec3 x1=x0-i1+C.xxx,x2=x0-i2+C.yyy,x3=x0-D.yyy;i=m289(i);
 vec4 p=prm(prm(prm(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
 vec3 ns=.142857142857*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z),x_=floor(j*ns.z),y_=floor(j-7.*x_);
 vec4 x=x_*ns.x+ns.yyyy,y=y_*ns.x+ns.yyyy,h=1.-abs(x)-abs(y),b0=vec4(x.xy,y.xy),b1=vec4(x.zw,y.zw);
 vec4 s0=floor(b0)*2.+1.,s1=floor(b1)*2.+1.,sh=-step(h,vec4(0.)),a0=b0.xzyw+s0.xzyw*sh.xxyy,a1=b1.xzyw+s1.xzyw*sh.zzww;
 vec3 p0=vec3(a0.xy,h.x),p1=vec3(a0.zw,h.y),p2=vec3(a1.xy,h.z),p3=vec3(a1.zw,h.w);
 vec4 nr=1.79284291400159-.85373472095314*vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3));p0*=nr.x;p1*=nr.y;p2*=nr.z;p3*=nr.w;
 vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
 return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*snoise(p);p=p*2.03+vec3(1.7,9.2,3.1);a*=.5;}return s;}
float fb2(vec3 p){return .66*snoise(p)+.34*snoise(p*2.1+vec3(4.1,1.3,7.7));}
float sdCap(vec2 p,vec2 a,vec2 b,float r){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);return length(pa-ba*h)-r;}
float sdEl(vec2 p,vec2 r){return (length(p/r)-1.)*min(r.x,r.y);}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
uniform float uT,uQ;uniform vec2 uRes;
`;
const U=o=>{const u={uT:TU,uQ:QU,uRes:RES};for(const k in o)u[k]={value:o[k]};return u};
function mat(vs,fs,u,o={}){return new T3.ShaderMaterial(Object.assign({uniforms:u,vertexShader:NZ+vs,fragmentShader:NZ+fs,transparent:true,depthWrite:false,depthTest:false,
  blending:T3.AdditiveBlending,side:T3.DoubleSide},o))}
function uf(m,o){for(const k in o){const u=m.uniforms[k],v=o[k];if(typeof v=='number')u.value=v;else if(u.value.isColor)u.value.setRGB(v[0],v[1],v[2]);else u.value.set(...v)}}

// ---- translucent "ghost shell": fresnel rim + drifting inner wisps + noise dissolve with glowing edge + hollow eyes/mouth ----
// cloth: uv.y = 0 at the crown .. 1 at the hem. uTr = world offsets of the path in the past (trailing cloth lag).
const SHV=`uniform float uFold,uFlut,uSeed,uLagP,uJaw,uArm,uWob;uniform vec3 uTr[8],uWind;varying vec3 vO,vN,vV;varying vec2 vU;
void main(){vec3 p=position;float v=uv.y,th=uv.x*6.2831,w=pow(v,1.4);p+=normal*uWob*snoise(p*2.2+vec3(0.,-uT*.35,uSeed));
 p+=normal*uFold*w*(sin(th*9.+uT*1.7+v*7.)*.07+snoise(vec3(th*1.3,v*3.-uT*.7,uSeed))*.16);
 p.y+=uFlut*w*w*sin(th*5.+uT*3.1+v*4.)*.14-uJaw*smoothstep(-.3,-.8,p.y)*smoothstep(-.2,.4,p.z)*.42;
 float ar=uArm*pow(max(cos(th),0.),6.)*smoothstep(.3,.4,v)*(1.-smoothstep(.45,.8,v));p.y+=ar*.75*max(p.x,0.);p.x-=ar*.22*max(p.x,0.);
 vec4 wp=modelMatrix*vec4(p,1.);float f=pow(v,uLagP)*7.;vec3 off=vec3(0.);
 for(int k=0;k<8;k++)off+=uTr[k]*max(0.,1.-abs(f-float(k)));
 wp.xyz+=off+uWind*w*(.6+.4*snoise(vec3(th,v*2.-uT*.5,uSeed+3.)));
 vec4 mv=viewMatrix*wp;vO=p;vU=uv;vN=normalize(normalMatrix*normal);vV=-mv.xyz;gl_Position=projectionMatrix*mv;}`;
const SHF=`uniform float uAlpha,uBody,uRimP,uDis,uDisF,uSeed,uHem,uNS,uNS2,uHoleZ,uGlint,uY0,uY1,uBack;uniform vec3 uCol,uRim,uEdge,uDisDir;uniform vec4 uH[3];
varying vec3 vO,vN,vV;varying vec2 vU;
void main(){vec3 N=normalize(vN),V=normalize(vV);float fr=pow(1.-abs(dot(N,V)),uRimP);
 float n=fbm(vO*uNS+vec3(0.,-uT*.45,uT*.13+uSeed));
 float dv=(fb2(vO*uDisF+uSeed*7.)*.5+.5)*.7+.3*clamp(dot(vO,uDisDir)*.25+.5,0.,1.),e=(dv-uDis*1.3+.12)/.13;if(e<=0.)discard;
 float edge=exp(-e*e*3.)*step(.001,uDis),a=uAlpha*smoothstep(uY0,uY1,vO.y)*mix(1.,smoothstep(-.9,.2,vO.z),uBack);
 if(uHem>0.)a*=1.-smoothstep(uHem,1.,vU.y+n*.2);
 float wp=smoothstep(-.25,.65,n);vec3 c=uCol*uBody*(.25+1.1*wp*wp)*(.8+.5*smoothstep(-1.5,1.,vO.y))+uRim*fr*(.75+.75*n);float h=0.,rim=0.,gl=0.,fac=dot(N,V)*uNS2;
 if(fac<0.&&vO.y>uHoleZ){c*=.22;}else for(int i=0;i<3;i++){vec4 Hh=uH[i];if(Hh.z>.001){vec2 d2=(vO.xy-Hh.xy)/Hh.zw;float d=length(d2);
   h=max(h,1.-smoothstep(.72,1.,d));rim+=exp(-abs(d-1.)*7.)*.55;if(i<2)gl+=exp(-dot(d2,d2)*14.);}}
 c=c*(1.-h*.96)+uRim*rim*(1.-h)*.6+vec3(.85,1.,1.)*gl*uGlint+uEdge*edge*1.1;
 gl_FragColor=vec4(c,a*min(e,1.));}`;
function shell(o={}){const u=U({uWob:0,uJaw:0,uFold:0,uFlut:0,uSeed:o.seed||0,uLagP:1.5,uTr:[...Array(8)].map(()=>V3(0,0,0)),uWind:V3(0,0,0),
  uAlpha:1,uBody:.16,uRimP:2.2,uDis:0,uDisF:4,uArm:0,uHem:0,uNS:.9,uNS2:1,uHoleZ:-1,uGlint:0,uY0:-99,uY1:-98,uBack:0,
  uCol:C3(.55,.7,.9),uRim:C3(.72,.86,1),uEdge:C3(.6,.78,1),uDisDir:V3(0,1,0),uH:[0,1,2].map(()=>new T3.Vector4(0,0,0,0))});
  const m=mat(SHV,SHF,u);delete o.seed;uf(m,o);return m}

// ---- deterministic point clouds: motion is GLSL `void motion(vec4 r,vec3 tg,out vec3 p,out float a,out float s,inout vec3 c)` ----
function points(n,glsl,uo={},tg=null,sd=0){const gm=new T3.BufferGeometry(),R4=new Float32Array(n*4);
  for(let i=0;i<n*4;i++)R4[i]=rr(i*1.37+sd*911+.5);
  gm.setAttribute('position',new T3.BufferAttribute(tg||new Float32Array(n*3),3));gm.setAttribute('aR',new T3.BufferAttribute(R4,4));
  const m=mat(`attribute vec4 aR;uniform float uAlpha;uniform vec3 uCol;varying float vA;varying vec3 vC;${glsl}
void main(){vec3 p;float a,s;vec3 c=uCol;motion(aR,position,p,a,s,c);vec4 mv=viewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;
 gl_PointSize=min(s*uQ*${FZ.toFixed(1)}/max(-mv.z,1.),90.*uQ);vA=a*uAlpha;vC=c;}`,
  `varying float vA;varying vec3 vC;void main(){float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;gl_FragColor=vec4(vC,vA*exp(-d*d*3.5)*(1.-d));}`,
  U(Object.assign({uAlpha:1,uCol:C3(.7,.85,1)},uo)));
  const p=new T3.Points(gm,m);p.frustumCulled=false;return p}
// ---- full-screen shader layer; fragment code gets pxc() = canvas pixel coords (y down) ----
function quad(fs,uo={}){const m=mat('void main(){gl_Position=vec4(position.xy,0.,1.);}',
  `vec2 pxc(){return vec2(gl_FragCoord.x/uRes.x*${W}.,(1.-gl_FragCoord.y/uRes.y)*${H}.);}`+fs,U(uo));
  const o=new T3.Mesh(new T3.PlaneGeometry(2,2),m);o.frustumCulled=false;o.renderOrder=-1;return o}
// ---- camera-facing quad with a procedural fragment shader in local coords q in [-1,1]^2 ----
function card(fs,uo={}){const m=mat('varying vec2 q;void main(){q=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}','varying vec2 q;'+fs,U(uo));
  const o=new T3.Mesh(new T3.PlaneGeometry(2,2),m);o.frustumCulled=false;return o}

// ---- procedural meshes ----
function grid(nu,nv,f){const P=[],UV=[],I=[];
  for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){const p=f(i/nu,j/nv);P.push(p[0],p[1],p[2]);UV.push(i/nu,j/nv)}
  for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){const a=j*(nu+1)+i,b=a+1,c=a+nu+1,d=c+1;I.push(a,c,b,b,c,d)}
  const g=new T3.BufferGeometry();g.setAttribute('position',new T3.Float32BufferAttribute(P,3));g.setAttribute('uv',new T3.Float32BufferAttribute(UV,2));
  g.setIndex(I);g.computeVertexNormals();return g}
// draped sheet ghost: head radius 1 at origin, arms out along x, hem ~y=-3.4, front = +z. o.arm = arm reach, o.len = length
function sheetGeo(o={}){const arm=o.arm??1.75,len=o.len??4.4;return grid(80,60,(u,v)=>{const th=u*TAU,c=M.cos(th),s=M.sin(th);let r,y;
  if(v<.3){const f=v/.3*1.75;r=M.sin(f);y=M.cos(f)}
  else{const k=(v-.3)/.7,a=M.pow(M.abs(c),7),ex=a*arm*sm(pr(k,0,.16))*(1-.85*sm(pr(k,.16,.62)));
    y=M.cos(1.75)-k*len-ex*ex*.22-.7*k*k*k*(.5+.5*M.sin(th*3+1.3));r=lerp(.98,.4,k)+.3*M.sin(k*M.PI*.8)+ex;
    r*=1+sm(pr(k,0,.5))*(.07*M.sin(th*11+M.sin(th*3)*2+k*3)+.05*M.sin(th*23+k*9))}   // hanging folds, baked so the rim light catches them
  return[r*c,y,r*s*.74]})}
// a face/head: ~unit sphere, front +z, with sockets, brow, nose, cheekbones and a mouth cavity (opened in the shader)
function faceGeo(){const g=new T3.SphereGeometry(1,72,56),p=g.attributes.position;
  const bump=(x,y,cx,cy,rx,ry)=>M.exp(-(((x-cx)/rx)**2+((y-cy)/ry)**2));
  for(let i=0;i<p.count;i++){let x=p.getX(i),y=p.getY(i),z=p.getZ(i);y*=1.22;x*=1-.24*sm(pr(-y,0,1.2))+.04*sm(pr(y,0,1));
    const w=sm(pr(z,.05,.6));
    z+=w*(-.36*(bump(x,y,-.36,.22,.21,.16)+bump(x,y,.36,.22,.21,.16))+.1*bump(x,y,0,.44,.62,.08)+.24*bump(x,y,0,-.06,.075,.24)*sm(pr(y,-.34,.12))
      +.06*(bump(x,y,-.47,-.04,.15,.1)+bump(x,y,.47,-.04,.15,.1))-.1*(bump(x,y,-.38,-.36,.16,.16)+bump(x,y,.38,-.36,.16,.16))
      -.14*bump(x,y,0,-.52,.26,.1)+.06*bump(x,y,0,-.88,.2,.1));
    z*=z<0?.92:1;p.setXYZ(i,x,y,z)}
  g.computeVertexNormals();return g}
// area-weighted deterministic surface samples (object space) for particle targets
function sample(geo,n,sd=0){const P=geo.attributes.position,I=geo.index?geo.index.array:[...Array(P.count).keys()],A=[],o=new Float32Array(n*3);let tot=0;
  const v=k=>new T3.Vector3().fromBufferAttribute(P,k);
  for(let i=0;i<I.length;i+=3){const a=v(I[i]),b=v(I[i+1]),c=v(I[i+2]);tot+=b.clone().sub(a).cross(c.clone().sub(a)).length()/2;A.push(tot)}
  for(let j=0;j<n;j++){let x=rr(j*3.1+sd)*tot,lo=0,hi=A.length-1;while(lo<hi){const mi=(lo+hi)>>1;if(A[mi]<x)lo=mi+1;else hi=mi}
    let s=rr(j*5.7+sd+1),t=rr(j*7.3+sd+2);if(s+t>1){s=1-s;t=1-t}const a=v(I[lo*3]),b=v(I[lo*3+1]),c=v(I[lo*3+2]);
    a.multiplyScalar(1-s-t).add(b.multiplyScalar(s)).add(c.multiplyScalar(t));o.set([a.x,a.y,a.z],j*3)}
  return o}
// world point that projects onto canvas pixel (x,y) at depth z (z>0 = toward the viewer)
const at=(x,y,z=0)=>{const k=(FZ-z)/FZ;return[wx(x)*k,wy(y)*k,z]};
// keyframed path: keys [[t,x,y,z],...] = screen px + depth, eased per segment; returns world [x,y,z]
function track(keys,ease=sm){return t=>{let i=0;while(i<keys.length-2&&t>keys[i+1][0])i++;const a=keys[i],b=keys[i+1],u=ease(pr(t,a[0],b[0]));
  return at(lerp(a[1],b[1],u),lerp(a[2],b[2],u),lerp(a[3]||0,b[3]||0,u))}}
// smooth path through keys (Catmull-Rom style Hermite, continuous velocity), same key format as track
function spline(keys){return t=>{let i=0;while(i<keys.length-2&&t>keys[i+1][0])i++;const a=keys[i],b=keys[i+1],d=b[0]-a[0],u=pr(t,a[0],b[0]),
  p0=keys[M.max(0,i-1)],p3=keys[M.min(keys.length-1,i+2)],h=[2*u*u*u-3*u*u+1,u*u*u-2*u*u+u,-2*u*u*u+3*u*u,u*u*u-u*u],o=[];
  for(let k=1;k<4;k++){const m0=(b[k]-p0[k])/(b[0]-p0[0]||1)*d,m1=(p3[k]-a[k])/(p3[0]-a[0]||1)*d;o.push(h[0]*(a[k]||0)+h[1]*(m0||0)+h[2]*(b[k]||0)+h[3]*(m1||0))}
  return at(o[0],o[1],o[2])}}
// pose a cloth mesh on a path: position, lean into motion, trailing hem
function drive(mesh,path,t,o={}){const p=path(t),q2=path(t-.05),dt=o.dt||.12,u=mesh.material.uniforms;mesh.position.set(p[0],p[1],p[2]);
  const vx=(p[0]-q2[0])/.05,vy=(p[1]-q2[1])/.05;mesh.rotation.z=(o.rz||0)-cl(vx*.0005,-.5,.5);mesh.rotation.x=(o.rx||0)+cl(vy*.0003,-.3,.3);
  for(let k=0;k<8;k++){const b=path(t-k*dt);u.uTr.value[k].set(b[0]-p[0],b[1]-p[1],b[2]-p[2]).multiplyScalar(o.lag??1)}
  return M.hypot(vx,vy)}
function fallback(g,t,d){const a=sm(pr(t,2,6))*(1-sm(pr(t,d-7,d-2)));if(a<=0)return;
  const x=590+M.sin(t*.23)*330,y=540+M.sin(t*.17+1)*290;rg(g,x,y,260,'90,140,220',.18*a);
  g.save();g.globalAlpha=a*.38;ghost(g,x,y+M.sin(t*1.3)*12,2.4,{t,col:'#cfe6ff',gc:'#5aa0ff',m:.6+.3*M.sin(t*.8),ey:1.2,r:M.sin(t*.6)*.1});g.restore()}  // no WebGL: a faint 2D ghost
// register an Act V scene: build() -> {scene,cam,...} once (lazily), upd(o,t) poses it for time t, then render + blit
function scene(name,dur,build,upd){S(5,name,dur,'A',(g,t)=>{
  const r=init();if(!r||lost){fallback(g,t,dur);return}
  const n=performance.now(),gap=n-lastRun;lastRun=n;
  // live player only: if frames stay slower than ~22 fps for 3 s, lower the internal resolution; at the floor, use the 2D fallback
  if(G3.auto&&gap<1500){slow=gap>45?slow+gap:M.max(0,slow-gap*.5);if(slow>3000){slow=0;if(q>.36){q=M.max(.35,q-.1);size()}else{bad=true;fallback(g,t,dur);return}}}
  const o=cache[name]||(cache[name]=build());TU.value=t;
  upd(o,t);r.render(o.scene,o.cam);g.drawImage(cv,0,0,W,H)})}
function stage(){const c=new T3.PerspectiveCamera(FOV,W/H,20,FZ*8);c.position.z=FZ;return{scene:new T3.Scene(),cam:c}}
return{at,scene,stage,shell,points,quad,card,mat,uf,sheetGeo,faceGeo,grid,sample,track,spline,drive,wx,wy,V3,C3,FZ,errs,auto:false,get q(){return q},get ok(){return !!init()}};
})();
