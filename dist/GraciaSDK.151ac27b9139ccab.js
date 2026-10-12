var _e=Object.freeze,bt=_e([0,0,0]),no=_e([1,1,1]),Xt=_e([1,0,0]),vt=_e([0,1,0]),rs=_e([0,0,1]),Nr=_e([0,0,-1]),oo=.25,F=_e({X:Xt,Y:vt,Z:rs,FORWARD:Nr,FLIP_X:_e([-1,1,1]),FLIP_Z:_e([1,1,-1])}),M={clamp:(i,e,t)=>Math.min(t,Math.max(e,i)),clampInt:(i,e,t)=>M.clamp(i|0,e,t),clamp01:i=>M.clamp(i,0,1),unlerp01:(i,e,t)=>t===e?0:M.clamp01((i-e)/(t-e)),finite:(i,e=0)=>Number.isFinite(i)?i:e,wrapPi(i){return i>Math.PI?i-2*Math.PI:i<-Math.PI?i+2*Math.PI:i},wrap(i,e){return e>0?(i%e+e)%e:0},wrapDelta(i,e){return e>0?i-e*Math.round(i/e):i},signedClamp(i,e,t){return i===0?0:M.clamp(Math.abs(i),e,t)*Math.sign(i)},zoomStep(i,e=.05,t=10){return i>0?M.signedClamp(Math.log2(i),e,t):0},absLogRatio(i,e){return i>0&&e>0?Math.abs(Math.log(i/e)):0},outside(i,e){return Math.abs(i)>e},perspectiveScale(i,e,t){return 2*i*Math.tan(e*Math.PI/360)/Math.max(1,t)},deadzone(i,e){let t=Math.abs(i);return t<e?0:((t-e)/(1-e))**2*Math.sign(i)},deltaSeconds(i,e,t=0,r=oo){return e?Math.min((i-e)/1e3,r):t}},Vt={center(i,e){return i[0]=(e.minX+e.maxX)*.5,i[1]=(e.minY+e.maxY)*.5,i[2]=(e.minZ+e.maxZ)*.5,i}},Y=class extends Float32Array{constructor(e){super(3),e&&this.from(e)}set(e,t,r){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this)}fromXYZ(e){return this.set(e.x,e.y,e.z)}from(e){return typeof e.x=="number"?this.fromXYZ(e):this.set(e[0],e[1],e[2])}copy(e){return this.set(e[0],e[1],e[2])}add(e){return this[0]+=e[0],this[1]+=e[1],this[2]+=e[2],this}addXYZ(e=0,t=0,r=0){return this[0]+=e,this[1]+=t,this[2]+=r,this}addTo(e,t=bt){return e[0]=t[0]+this[0],e[1]=t[1]+this[1],e[2]=t[2]+this[2],e}addScaled(e,t){return this[0]+=e[0]*t,this[1]+=e[1]*t,this[2]+=e[2]*t,this}addDelta(e,t){return this[0]+=e[0]-t[0],this[1]+=e[1]-t[1],this[2]+=e[2]-t[2],this}sub(e,t){return t?(this[0]=e[0]-t[0],this[1]=e[1]-t[1],this[2]=e[2]-t[2],this):(this[0]-=e[0],this[1]-=e[1],this[2]-=e[2],this)}subXYZ(e,t){return this.set(e.x-t.x,e.y-t.y,e.z-t.z)}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this}multiply(e){return this[0]*=e[0],this[1]*=e[1],this[2]*=e[2],this}multiplyXYZ(e=1,t=1,r=1){return this[0]*=e,this[1]*=t,this[2]*=r,this}divide(e){return this[0]=e[0]?this[0]/e[0]:0,this[1]=e[1]?this[1]/e[1]:0,this[2]=e[2]?this[2]/e[2]:0,this}clampScalar(e,t){return this[0]=M.clamp(this[0],e,t),this[1]=M.clamp(this[1],e,t),this[2]=M.clamp(this[2],e,t),this}normalize(e=bt){let t=Math.hypot(this[0],this[1],this[2]);return Number.isFinite(t)&&t>1e-6?this.scale(1/t):this.copy(e)}setLength(e,t=Xt){return this.normalize(t).scale(e)}cross(e,t){let r=e[0],s=e[1],n=e[2],o=t[0],a=t[1],l=t[2];return this[0]=s*l-n*a,this[1]=n*o-r*l,this[2]=r*a-s*o,this}lerp(e,t){return this[0]+=t*(e[0]-this[0]),this[1]+=t*(e[1]-this[1]),this[2]+=t*(e[2]-this[2]),this}midXYZ(e,t){return this.set((e.x+t.x)*.5,(e.y+t.y)*.5,(e.z+t.z)*.5)}fromMat4Column(e,t){let r=t*4;return this.set(e[r],e[r+1],e[r+2])}transformMat4(e){let t=this[0],r=this[1],s=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*s+e[12],this[1]=e[1]*t+e[5]*r+e[9]*s+e[13],this[2]=e[2]*t+e[6]*r+e[10]*s+e[14],this}transformMat4Direction(e){let t=this[0],r=this[1],s=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*s,this[1]=e[1]*t+e[5]*r+e[9]*s,this[2]=e[2]*t+e[6]*r+e[10]*s,this}transformQuat(e){let t=this[0],r=this[1],s=this[2],n=e[0],o=e[1],a=e[2],l=e[3],c=l*t+o*s-a*r,h=l*r+a*t-n*s,u=l*s+n*r-o*t,p=-n*t-o*r-a*s;return this[0]=c*l+p*-n+h*-a-u*-o,this[1]=h*l+p*-o+u*-n-c*-a,this[2]=u*l+p*-a+c*-o-h*-n,this}fromYawPitch(e,t){let r=Math.cos(t);return this.set(r*Math.sin(e),Math.sin(t),-r*Math.cos(e))}yawPitch(e){return this[0]=Math.atan2(e[0],-e[2]),this[1]=Math.asin(M.clamp(e[1],-1,1)),this[2]=0,this}basisFromForward(e,t,r=vt){return this.cross(t,r).normalize(Xt),e.cross(this,t),this}yawPitchBasis(e,t,r,s,n){return r.fromYawPitch(e,t),s.copy(r).scale(-1),this.set(Math.cos(e),0,Math.sin(e)),n.cross(s,this),this}rollBasis(e,t){let r=Math.cos(t),s=Math.sin(t),n=this[0],o=this[1],a=this[2],l=e[0],c=e[1],h=e[2];return this.set(n*r+l*s,o*r+c*s,a*r+h*s),e.set(l*r-n*s,c*r-o*s,h*r-a*s),this}fromSphereDir(e,t){let r=Math.sin(t);return this.set(r*Math.sin(e),Math.cos(t),r*Math.cos(e))}polarY(e,t,r=1e-6){let s=e[0]-t[0],n=e[1]-t[1],o=e[2]-t[2],a=Math.max(r,Math.hypot(s,n,o));return this[0]=Math.atan2(s,o),this[1]=Math.acos(M.clamp(n/a,-1,1)),this[2]=a,this}equals(e,t=1e-6){return Math.abs(this[0]-e[0])<=t&&Math.abs(this[1]-e[1])<=t&&Math.abs(this[2]-e[2])<=t}toArray(){return[this[0],this[1],this[2]]}toXYZ(){return{x:this[0],y:this[1],z:this[2]}}distanceXYZ(e){return Math.hypot(this[0]-e.x,this[1]-e.y,this[2]-e.z)}dot(e){return this[0]*e[0]+this[1]*e[1]+this[2]*e[2]}get sqrLen(){return this[0]*this[0]+this[1]*this[1]+this[2]*this[2]}get len(){return Math.hypot(this[0],this[1],this[2])}get xzLen(){return Math.hypot(this[0],this[2])}get minComponent(){return Math.min(this[0],this[1],this[2])}get maxAbs(){return Math.max(Math.abs(this[0]),Math.abs(this[1]),Math.abs(this[2]))}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}},ye=class extends Float32Array{constructor(e){super(4),e?this.from(e):this.identity()}set(e,t,r,s){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this[3]=s,this)}fromXYZW(e){return this.set(e.x,e.y,e.z,e.w)}from(e){return typeof e.x=="number"?this.fromXYZW(e):this.set(e[0],e[1],e[2],e[3])}copy(e){return this.set(e[0],e[1],e[2],e[3])}identity(){return this.set(0,0,0,1)}normalize(){let e=Math.hypot(this[0],this[1],this[2],this[3]);return e>1e-6?this.scale(1/e):this.identity()}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this[3]*=e,this}setAxisAngle(e,t){let r=t*.5,s=Math.sin(r);return this.set(e[0]*s,e[1]*s,e[2]*s,Math.cos(r))}rotatePre(e,t){return this.mul(Ht.setAxisAngle(e,t),this)}rotate(e,t){return this.mul(Ht.setAxisAngle(e,t))}mul(e,t){let r=t?e:this,s=t??e,n=r[0],o=r[1],a=r[2],l=r[3],c=s[0],h=s[1],u=s[2],p=s[3];return this[0]=n*p+l*c+o*u-a*h,this[1]=o*p+l*h+a*c-n*u,this[2]=a*p+l*u+n*h-o*c,this[3]=l*p-n*c-o*h-a*u,this}invert(e=this){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return this.set(-e[0]*r,-e[1]*r,-e[2]*r,e[3]*r)}slerp(e,t){let r=e[0],s=e[1],n=e[2],o=e[3],a=this[0]*r+this[1]*s+this[2]*n+this[3]*o;a<0&&(a=-a,r=-r,s=-s,n=-n,o=-o);let l=1-t,c=t;if(1-a>1e-6){let h=Math.acos(a),u=Math.sin(h);l=Math.sin((1-t)*h)/u,c=Math.sin(t*h)/u}return this.set(l*this[0]+c*r,l*this[1]+c*s,l*this[2]+c*n,l*this[3]+c*o)}toXYZW(){return{x:this[0],y:this[1],z:this[2],w:this[3]}}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}get w(){return this[3]}set w(e){this[3]=e}},xe=class extends Float32Array{constructor(e){super(16),e?this.copy(e):this.identity()}copy(e){return super.set(e),this}identity(){return this.fill(0),this[0]=this[5]=this[10]=this[15]=1,this}multiply(e,t){return t?zr(this,e,t):zr(this,this,e)}preMultiply(e){return zr(this,e,this)}fromTranslation(e){return this.identity(),this[12]=e[0],this[13]=e[1],this[14]=e[2],this}fromScaling(e){return this.identity(),this[0]=e[0],this[5]=e[1],this[10]=e[2],this}perspective(e,t,r,s){let n=1/Math.tan(e*Math.PI/360);return this.fill(0),this[0]=n/t,this[5]=n,this[10]=(s+r)/(r-s),this[11]=-1,this[14]=2*s*r/(r-s),this}cameraWorld(e,t,r=vt){let s=he.sub(e,t).normalize(rs),n=es.cross(r,s).normalize(Xt),o=lo.cross(s,n);return this.cameraWorldAxes(e,n,o,s)}cameraWorldAxes(e,t,r,s){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=0,this[4]=r[0],this[5]=r[1],this[6]=r[2],this[7]=0,this[8]=s[0],this[9]=s[1],this[10]=s[2],this[11]=0,this[12]=e[0],this[13]=e[1],this[14]=e[2],this[15]=1,this}fromQuat(e){return this.fromRotationTranslationScale(e,bt,no)}fromTransform(e){let{rotation:t,translation:r,scale:s}=e;return Ht.fromXYZW(t).normalize(),this.fromRotationTranslationScale(Ht,he.fromXYZ(r),es.set(s.x,s.y,s.z))}fromRotationTranslationScale(e,t,r){let s=e[0],n=e[1],o=e[2],a=e[3],l=s+s,c=n+n,h=o+o,u=s*l,p=s*c,f=s*h,g=n*c,d=n*h,m=o*h,x=a*l,b=a*c,y=a*h,v=r[0],_=r[1],w=r[2];return this[0]=(1-(g+m))*v,this[1]=(p+y)*v,this[2]=(f-b)*v,this[3]=0,this[4]=(p-y)*_,this[5]=(1-(u+m))*_,this[6]=(d+x)*_,this[7]=0,this[8]=(f+b)*w,this[9]=(d-x)*w,this[10]=(1-(u+g))*w,this[11]=0,this[12]=t[0],this[13]=t[1],this[14]=t[2],this[15]=1,this}setPosition(e){return this[12]=e[0],this[13]=e[1],this[14]=e[2],this}translate(e){let t=e[0],r=e[1],s=e[2];return this[12]=this[0]*t+this[4]*r+this[8]*s+this[12],this[13]=this[1]*t+this[5]*r+this[9]*s+this[13],this[14]=this[2]*t+this[6]*r+this[10]*s+this[14],this[15]=this[3]*t+this[7]*r+this[11]*s+this[15],this}scale(e){let t=e[0],r=e[1],s=e[2];for(let n=0;n<4;n++)this[n]*=t,this[n+4]*=r,this[n+8]*=s;return this}fromPivot(e,t,r,s,n){return this.fromTranslation(e).scale(r).translate(s),this.multiply(co.fromQuat(t)),this.translate(he.copy(s).scale(-1)),n?this.multiply(n):this}pointTo(e,t=bt,r=1){return is(e,this,t,r)}poseTo(e){return ss(e,this)}get determinant3(){return this[0]*(this[5]*this[10]-this[6]*this[9])+this[1]*(this[6]*this[8]-this[4]*this[10])+this[2]*(this[4]*this[9]-this[5]*this[8])}decompose(e,t,r){let s=Math.hypot(this[0],this[1],this[2]),n=Math.hypot(this[4],this[5],this[6]),o=Math.hypot(this[8],this[9],this[10]);this.determinant3<0&&(s=-s),e.set(this[12],this[13],this[14]),r.set(s,n,o);let a=s?1/s:0,l=n?1/n:0,c=o?1/o:0;return ge[0]=this[0]*a,ge[1]=this[1]*a,ge[2]=this[2]*a,ge[3]=this[4]*l,ge[4]=this[5]*l,ge[5]=this[6]*l,ge[6]=this[8]*c,ge[7]=this[9]*c,ge[8]=this[10]*c,ao(t,ge),this}};function ao(i,e){let t=e[0]+e[4]+e[8];if(t>0){let a=Math.sqrt(t+1),l=.5*a;return a=.5/a,i.set((e[5]-e[7])*a,(e[6]-e[2])*a,(e[1]-e[3])*a,l)}let r=0;e[4]>e[0]&&(r=1),e[8]>e[r*3+r]&&(r=2);let s=(r+1)%3,n=(r+2)%3,o=Math.sqrt(e[r*3+r]-e[s*3+s]-e[n*3+n]+1);return i[r]=.5*o,o=.5/o,i[3]=(e[s*3+n]-e[n*3+s])*o,i[s]=(e[s*3+r]+e[r*3+s])*o,i[n]=(e[n*3+r]+e[r*3+n])*o,i}var he=new Y,es=new Y,lo=new Y,Ht=new ye,co=new xe,ge=new Float32Array(9);function zr(i,e,t){let r=e[0],s=e[1],n=e[2],o=e[3],a=e[4],l=e[5],c=e[6],h=e[7],u=e[8],p=e[9],f=e[10],g=e[11],d=e[12],m=e[13],x=e[14],b=e[15],y=t[0],v=t[1],_=t[2],w=t[3];return i[0]=y*r+v*a+_*u+w*d,i[1]=y*s+v*l+_*p+w*m,i[2]=y*n+v*c+_*f+w*x,i[3]=y*o+v*h+_*g+w*b,y=t[4],v=t[5],_=t[6],w=t[7],i[4]=y*r+v*a+_*u+w*d,i[5]=y*s+v*l+_*p+w*m,i[6]=y*n+v*c+_*f+w*x,i[7]=y*o+v*h+_*g+w*b,y=t[8],v=t[9],_=t[10],w=t[11],i[8]=y*r+v*a+_*u+w*d,i[9]=y*s+v*l+_*p+w*m,i[10]=y*n+v*c+_*f+w*x,i[11]=y*o+v*h+_*g+w*b,y=t[12],v=t[13],_=t[14],w=t[15],i[12]=y*r+v*a+_*u+w*d,i[13]=y*s+v*l+_*p+w*m,i[14]=y*n+v*c+_*f+w*x,i[15]=y*o+v*h+_*g+w*b,i}function is(i,e,t=bt,r=1){let s=t[0]??0,n=t[1]??0,o=t[2]??0;return i[0]=e[0]*s+e[4]*n+e[8]*o+e[12],i[1]=e[1]*s+e[5]*n+e[9]*o+e[13],i[2]=e[2]*s+e[6]*n+e[10]*o+e[14],r!==1&&(i[0]*=r,i[1]*=r,i[2]*=r),i}function ts(i,e,t,r){let s=t[0],n=t[1],o=t[2];i[0]=e[0]*s+e[4]*n+e[8]*o,i[1]=e[1]*s+e[5]*n+e[9]*o,i[2]=e[2]*s+e[6]*n+e[10]*o;let a=Math.hypot(i[0],i[1],i[2]);if(Number.isFinite(a)&&a>1e-6){let l=1/a;i[0]*=l,i[1]*=l,i[2]*=l}else i[0]=r[0],i[1]=r[1],i[2]=r[2];return i}function ss(i,e){return i[0]=e[12],i[1]=e[13],i[2]=e[14],ts(he,e,Nr,Nr),i[3]=he[0],i[4]=he[1],i[5]=he[2],ts(he,e,vt,vt),i[6]=he[0],i[7]=he[1],i[8]=he[2],i}var L={create:()=>new Y},K={create:()=>new ye},V={create:()=>new xe,clone:i=>new xe(i),pointTo:is,poseTo:ss};var Wt=75,Ur=64,Wr=8,je=1e-6,Z=64,Ut=16,ho=9,ns=24,os=.9,wt=.001,as=8,uo=new Float64Array(3),_t=i=>typeof i=="number"&&Number.isFinite(i),po=i=>!!i&&_t(i.x)&&_t(i.y)&&_t(i.z),fo=(i,e)=>M.clamp01((i+e)/(2*e)),mo=i=>Array.from({length:i},(e,t)=>t/(i-1)),ls=i=>M.clamp(Math.abs(i??90),1,360)*Math.PI/360;function Yr(i,e){if(ls(i.angleDeg)>=Math.PI-je)return 0;let t=Math.min(e[0],e[2]),r=M.clamp(i.tiltDeg??0,-Wt,Wt)*Math.PI/180;return M.clamp(2*e[1]*Math.tan(r),-os*t,os*t)}function cs(i){switch(i?.type){case"box":case"sphere":return!0;case"sector":return(i.angleDeg==null||_t(i.angleDeg))&&(i.tiltDeg==null||_t(i.tiltDeg));case"polygon":return!!hs(i);default:return!1}}function Zt(i,e){let t=[e[0],e[1],e[2]];return i.type==="sphere"?new Hr(t):i.type==="sector"?new qt(Mo(i,t),t):i.type==="polygon"?new Vr(hs(i),t):new qt(So(t),t)}function go(i,e){let t=Math.abs(i[0])-e[0],r=Math.abs(i[2])-e[2];return Math.hypot(Math.max(t,0),Math.max(r,0))+Math.min(Math.max(t,r),0)}function yo(i,e){let t=Math.hypot(i[0]/e[0],i[1]/e[1],i[2]/e[2]);if(t===0)return-Math.min(e[0],e[1],e[2]);let r=Math.hypot(i[0]/(e[0]*e[0]),i[1]/(e[1]*e[1]),i[2]/(e[2]*e[2]));return t*(t-1)/r}function xo(i,e,t){let r=Math.abs(e)-t;return Math.min(Math.max(i,r),0)+Math.hypot(Math.max(i,0),Math.max(r,0))}function Dr(i){let e=i.length/2,t=0;for(let r=0;r<e;r++){let s=(r+1)%e*2;t+=i[r*2]*i[s+1]-i[s]*i[r*2+1]}return t/2}var Ae=(i,e,t,r,s,n)=>(t-i)*(n-e)-(r-e)*(s-i);function Ze(i,e,t,r,s,n){let o=s-t,a=n-r,l=M.clamp01(((i-t)*o+(e-r)*a)/(o*o+a*a));return Math.hypot(i-t-o*l,e-r-a*l)}function bo(i,e,t){let r=i.length/2,s=e*2,n=(e+1)%r*2,o=t*2,a=(t+1)%r*2,l=Ae(i[o],i[o+1],i[a],i[a+1],i[s],i[s+1]),c=Ae(i[o],i[o+1],i[a],i[a+1],i[n],i[n+1]),h=Ae(i[s],i[s+1],i[n],i[n+1],i[o],i[o+1]),u=Ae(i[s],i[s+1],i[n],i[n+1],i[a],i[a+1]);return l*c<0&&h*u<0?0:Math.min(Ze(i[s],i[s+1],i[o],i[o+1],i[a],i[a+1]),Ze(i[n],i[n+1],i[o],i[o+1],i[a],i[a+1]),Ze(i[o],i[o+1],i[s],i[s+1],i[n],i[n+1]),Ze(i[a],i[a+1],i[s],i[s+1],i[n],i[n+1]))}function vo(i){let e=i.length/2;for(let t=0;t<e;t++){let r=(t+e-1)%e*2,s=t*2,n=(t+1)%e*2;if(Math.hypot(i[n]-i[s],i[n+1]-i[s+1])<wt||Ze(i[n],i[n+1],i[r],i[r+1],i[s],i[s+1])<wt||Ze(i[r],i[r+1],i[s],i[s+1],i[n],i[n+1])<wt)return!1}for(let t=0;t<e;t++)for(let r=t+2;r<e;r++)if(!(t===0&&r===e-1)&&bo(i,t,r)<wt)return!1;return!0}function wo(i,e,t,r){for(let s=0;s<e.length;s++)i[s]=e[s]+(t[s]-e[s])*r;return i}function hs(i){let{layers:e}=i;if(!Array.isArray(e)||e.length<2||e.length>Wr)return null;let t=Array.isArray(e[0])?e[0].length:0;if(t<3||t>Ur||!e.every(a=>Array.isArray(a)&&a.length===t&&a.every(po)))return null;let r=e.map(a=>Float64Array.from(a.flatMap(l=>[l.x,l.y,l.z])));for(let a=1;a<r.length;a++)for(let l=0;l<t;l++)if(r[a][l*3+1]-r[a-1][l*3+1]<wt)return null;let s=r.map(Yt),n=Math.sign(Dr(s[0])),o=new Float64Array(t*2);for(let a=0;a<s.length-1;a++)for(let l=a?1:0;l<=as;l++){wo(o,s[a],s[a+1],l/as);let c=Dr(o);if(Math.abs(c)<je||Math.sign(c)!==n||!vo(o))return null}return n>0?r:r.map(_o)}function Yt(i){let e=i.length/3,t=new Float64Array(e*2);for(let r=0;r<e;r++)t[r*2]=i[r*3],t[r*2+1]=i[r*3+2];return t}function _o(i){let e=i.length/3,t=new Float64Array(i.length);for(let r=0;r<e;r++)t.set(i.subarray((e-1-r)*3,(e-r)*3),r*3);return t}function Xr(i){let e=i.length/2,t=Math.sign(Dr(i))||1,r=Array.from({length:e},(l,c)=>c),s=[],n=l=>i[l*2],o=l=>i[l*2+1],a=(l,c,h)=>{if(Ae(n(l),o(l),n(c),o(c),n(h),o(h))*t<=je*je)return!1;for(let u of r){if(u===l||u===c||u===h)continue;let p=Ae(n(l),o(l),n(c),o(c),n(u),o(u))*t,f=Ae(n(c),o(c),n(h),o(h),n(u),o(u))*t,g=Ae(n(h),o(h),n(l),o(l),n(u),o(u))*t;if(p>=0&&f>=0&&g>=0)return!1}return!0};for(;r.length>3;){let l=r.length,c=!1;for(let h=0;h<l;h++){let u=r[(h+l-1)%l],p=r[h],f=r[(h+1)%l];if(a(u,p,f)){s.push(u,p,f),r.splice(h,1),c=!0;break}}if(!c)break}return r.length===3&&s.push(r[0],r[1],r[2]),s}function So(i){let e=new Float32Array([-i[0],-i[2],i[0],-i[2],i[0],i[2],-i[0],i[2]]);return{walls:t=>go(t,i),ringAt:()=>e,wallRingAt:()=>e,levels:[0,1],rulings:[0,1,2,3]}}function Mo(i,e){let t=e[1],r=Math.min(e[0],e[2]),s=ls(i.angleDeg),n=s>=Math.PI-je,o=Math.sin(s),a=Math.cos(s),l=Yr(i,e),c=l/(2*t),h=Math.hypot(1,c*o),u=b=>-b*a+Math.sqrt(Math.max(r*r-b*b*o*o,0)),p=b=>Math.atan2(o*u(b),b+a*u(b)),f=b=>{let y=Math.hypot(b[0],b[2])-r;if(n)return y;let v=l*fo(b[1],t),_=Math.abs(b[0]),w=b[2]-v,P=_*o+w*a,T=M.clamp(P,0,u(v)),R=P>0?Math.hypot(_-o*T,w-a*T)/h:Math.hypot(_,w/Math.hypot(1,c));return Math.max(y,R*Math.sign(a*_-o*w))},g=b=>{if(n){let w=new Float32Array(Z*2);for(let P=0;P<Z;P++){let T=P/Z*2*Math.PI;w[P*2]=Math.sin(T)*r,w[P*2+1]=Math.cos(T)*r}return w}let y=l*b,v=p(y),_=new Float32Array((Z+2)*2);_[1]=y;for(let w=0;w<=Z;w++){let P=-v+w/Z*2*v;_[(w+1)*2]=Math.sin(P)*r,_[(w+1)*2+1]=Math.cos(P)*r}return _},d=Math.max(p(0),p(l)),m=Math.max(u(0),u(l));return{walls:f,ringAt:g,wallRingAt:b=>{if(n)return g(b);let y=l*b,v=u(y),_=p(y),w=new Float32Array((2*Ut+Z+2)*2),P=0,T=(I,z)=>{w[P++]=I,w[P++]=z},R=(I,z)=>{let X=Math.min(z/Ut*m,v);T(I*o*X,y+a*X)};T(0,y);for(let I=1;I<=Ut;I++)R(-1,I);for(let I=0;I<=Z;I++){let z=M.clamp(-d+I/Z*2*d,-_,_);T(Math.sin(z)*r,Math.cos(z)*r)}for(let I=Ut;I>=1;I--)R(1,I);return w},levels:l?mo(ho):[0,1],rulings:n?[]:[0,1,Z+1]}}var qt=class{#e;#t;#r=null;#i=null;#s=null;constructor(e,t){this.#e=e,this.#t=t}signedDistance(e){return xo(this.#e.walls(e),e[1],this.#t[1])}get outlines(){let e=this.#t[1];return this.#r??=[Xe(this.#e.ringAt(0),-e),Xe(this.#e.ringAt(1),e)],this.#r}get mesh(){return this.#i??=Lo(this.#e,this.#t[1]),this.#i}get lines(){return this.#s??=Co(this.#e,this.#t[1]),this.#s}},Hr=class{#e;#t=null;#r=null;#i=null;constructor(e){this.#e=e}signedDistance(e){return yo(e,this.#e)}get outlines(){return this.#t??=[Xe(us(this.#e[0],this.#e[2]),-this.#e[1])],this.#t}get mesh(){return this.#r??=Ro(this.#e),this.#r}get lines(){return this.#i??=Ao(this.#e),this.#i}},Vr=class{#e;#t;#r=null;#i=null;#s;constructor(e,t){this.#e=e.map(h=>h.map((u,p)=>u*2*t[p%3]));let r=this.#e[0].length/3,s=(h,u)=>this.#e[h].subarray(u*3,u*3+3),n=[],o=(h,u,p)=>n.push(...h,...u,...p);for(let h=0;h<this.#e.length-1;h++)for(let u=0;u<r;u++){let p=(u+1)%r;o(s(h,u),s(h+1,u),s(h+1,p)),o(s(h,u),s(h+1,p),s(h,p))}let a=this.#e.length-1,l=Xr(Yt(this.#e[a]));for(let h=0;h<l.length;h+=3)o(s(a,l[h]),s(a,l[h+2]),s(a,l[h+1]));let c=Xr(Yt(this.#e[0]));for(let h=0;h<c.length;h+=3)o(s(0,c[h]),s(0,c[h+1]),s(0,c[h+2]));this.#t=Float64Array.from(n),this.#s=[this.#e[0],this.#e[this.#e.length-1]].map(h=>Float32Array.from(h))}signedDistance(e){let t=this.#t,r=0,s=Number.POSITIVE_INFINITY;for(let n=0;n<t.length;n+=9)r+=Po(e,t,n),s=Math.min(s,To(e,t,n,uo));return Math.abs(r)>2*Math.PI?-s:s}get outlines(){return this.#s}get mesh(){return this.#r??=qr(this.#e,[this.#e[this.#e.length-1],this.#e[0]],!0),this.#r}get lines(){return this.#i??=Eo(this.#e),this.#i}};function De(i,e,t,r,s){for(let n=0;n<3;n++)i[n]=e[t+n]+(e[t+3+n]-e[t+n])*r+(e[t+6+n]-e[t+n])*s}function To(i,e,t,r){let s=e[t+3]-e[t],n=e[t+4]-e[t+1],o=e[t+5]-e[t+2],a=e[t+6]-e[t],l=e[t+7]-e[t+1],c=e[t+8]-e[t+2],h=s*(i[0]-e[t])+n*(i[1]-e[t+1])+o*(i[2]-e[t+2]),u=a*(i[0]-e[t])+l*(i[1]-e[t+1])+c*(i[2]-e[t+2]),p=s*(i[0]-e[t+3])+n*(i[1]-e[t+4])+o*(i[2]-e[t+5]),f=a*(i[0]-e[t+3])+l*(i[1]-e[t+4])+c*(i[2]-e[t+5]),g=s*(i[0]-e[t+6])+n*(i[1]-e[t+7])+o*(i[2]-e[t+8]),d=a*(i[0]-e[t+6])+l*(i[1]-e[t+7])+c*(i[2]-e[t+8]),m=p*d-g*f,x=g*u-h*d,b=h*f-p*u;if(h<=0&&u<=0)De(r,e,t,0,0);else if(p>=0&&f<=p)De(r,e,t,1,0);else if(b<=0&&h>=0&&p<=0)De(r,e,t,h/(h-p),0);else if(d>=0&&g<=d)De(r,e,t,0,1);else if(x<=0&&u>=0&&d<=0)De(r,e,t,0,u/(u-d));else if(m<=0&&f-p>=0&&g-d>=0){let y=(f-p)/(f-p+(g-d));De(r,e,t,1-y,y)}else{let y=1/(m+x+b);De(r,e,t,x*y,b*y)}return Math.hypot(i[0]-r[0],i[1]-r[1],i[2]-r[2])}function Po(i,e,t){let r=e[t]-i[0],s=e[t+1]-i[1],n=e[t+2]-i[2],o=e[t+3]-i[0],a=e[t+4]-i[1],l=e[t+5]-i[2],c=e[t+6]-i[0],h=e[t+7]-i[1],u=e[t+8]-i[2],p=Math.sqrt(r*r+s*s+n*n),f=Math.sqrt(o*o+a*a+l*l),g=Math.sqrt(c*c+h*h+u*u),d=r*(a*u-l*h)-s*(o*u-l*c)+n*(o*h-a*c),m=r*o+s*a+n*l,x=o*c+a*h+l*u,b=c*r+h*s+u*n;return 2*Math.atan2(d,p*f*g+m*g+x*p+b*f)}function qr(i,e,t){let r=i[0].length/3,s=[],n=[],o=[],a=Number.POSITIVE_INFINITY;for(let d of i)for(let m=1;m<d.length;m+=3)a=Math.min(a,d[m]);let l=(d,m)=>{let x=m*3,b=(m+1)%r*3;return Math.hypot(d[b]-d[x],d[b+1]-d[x+1],d[b+2]-d[x+2])},c=d=>{let m=0;for(let x=0;x<r;x++)m+=l(d,x);return m},h=i.reduce((d,m)=>c(m)>c(d)?m:d),u=new Float64Array(r*2),p=[0];for(let d=0;d<r;d++){let m=d*3,x=(d+1)%r*3,b=0,y=0,v=0;for(let P of i)b+=P[x]-P[m],y+=P[x+2]-P[m+2],v=Math.max(v,l(P,d));let _=Math.hypot(b,y);_>je&&(u[d*2]=b/_,u[d*2+1]=y/_);let w=(h[x]-h[m])*u[d*2]+(h[x+2]-h[m+2])*u[d*2+1];p.push(p[d]+(t?w:v))}let f=(d,m,x,b,y)=>{let v=m%r*3,_=x*3,w=t?p[x]+(d[v]-h[_])*u[x*2]+(d[v+2]-h[_+2])*u[x*2+1]:p[x+b];s.push(d[v],d[v+1],d[v+2]),n.push(w*y,d[v+1]-a,y)};for(let d=0;d<i.length-1;d++)for(let m=0;m<r;m++){let x=s.length/3,b=t?1:l(i[d],m),y=t?1:l(i[d+1],m);f(i[d],m,m,0,b),f(i[d],m+1,m,1,b),f(i[d+1],m+1,m,1,y),f(i[d+1],m,m,0,y),o.push(x,x+1,x+2,x,x+2,x+3)}let g=o.length;for(let d of e){let m=s.length/3;for(let x=0;x<d.length;x+=3)s.push(d[x],d[x+1],d[x+2]),n.push(0,d[x+1]-a,1);for(let x of Xr(Yt(d)))o.push(m+x)}return{positions:new Float32Array(s),grid:new Float32Array(n),indices:new Uint32Array(o),capStart:g}}function Lo(i,e){let t=i.levels.map(s=>Xe(i.wallRingAt(s),-e+2*e*s)),r=[Xe(i.ringAt(1),e),Xe(i.ringAt(0),-e)];return qr(t,r,!0)}function Co(i,e){let t=i.levels.map(a=>i.ringAt(a)),r=i.levels.map(a=>-e+2*e*a),s=t[0].length/2,n=[],o=(a,l,c,h,u,p)=>n.push(a[l*2],c,a[l*2+1],h[u*2],p,h[u*2+1]);for(let a of[0,t.length-1])for(let l=0;l<s;l++)o(t[a],l,r[a],t[a],(l+1)%s,r[a]);for(let a of i.rulings)for(let l=0;l<t.length-1;l++)o(t[l],a,r[l],t[l+1],a,r[l+1]);return new Float32Array(n)}function Xe(i,e){let t=i.length/2,r=new Float32Array(t*3);for(let s=0;s<t;s++)r.set([i[s*2],e,i[s*2+1]],s*3);return r}function Eo(i){let e=i[0].length/3,t=[],r=(s,n)=>t.push(s[n*3],s[n*3+1],s[n*3+2]);for(let s of i)for(let n=0;n<e;n++)r(s,n),r(s,(n+1)%e);for(let s=0;s<i.length-1;s++)for(let n=0;n<e;n++)r(i[s],n),r(i[s+1],n);return new Float32Array(t)}function us(i,e){let t=new Float32Array(Z*2);for(let r=0;r<Z;r++){let s=r/Z*2*Math.PI;t[r*2]=Math.sin(s)*i,t[r*2+1]=Math.cos(s)*e}return t}function Ro(i){let e=[];for(let t=0;t<=ns;t++){let r=-Math.PI/2+t/ns*Math.PI,s=Math.cos(r);e.push(Xe(us(i[0]*s,i[2]*s),i[1]*Math.sin(r)))}return qr(e,[],!1)}function Ao(i){let e=[],t=r=>{for(let s=0;s<Z;s++)e.push(...r(s/Z*2*Math.PI),...r((s+1)/Z*2*Math.PI))};return t(r=>[Math.cos(r)*i[0],Math.sin(r)*i[1],0]),t(r=>[Math.cos(r)*i[0],0,Math.sin(r)*i[2]]),t(r=>[0,Math.cos(r)*i[1],Math.sin(r)*i[2]]),new Float32Array(e)}var ko=.28209479177387814;function ps(i,e=.5){let t=1/(ko*Math.max(i[0],i[1],i[2],.01));for(let r=0;r<3;r++)i[r]*=t;for(let r=3;r<12;r++)i[r]*=t*e}function Zr(i,e=null,t=.5){let r=new Float32Array(12);for(let s=0;s<12;s++)r[s]=i[s];if(e){let s=e[0]??e.x,n=e[1]??e.y,o=e[2]??e.z;if(r[9]*s+r[3]*n+r[6]*o>0)for(let a=3;a<12;a++)r[a]*=-1}return ps(r,t),r}function ke(i){let e=new Float32Array(12);return e.set(i.ambient,0),e.set(i.topDown,3),i.frontBack&&e.set(i.frontBack,6),i.leftRight&&e.set(i.leftRight,9),e}async function jt(i="@gracia/web-sdk/wasm"){for(let e=0;;e++)try{let t=await import(i);return t.default??t}catch{await new Promise(r=>setTimeout(r,1e3))}}var Qt=class{#e;#t=0;constructor(e,t=512){this.#e=e,this.#t=e._malloc(t)}ptr(e=0){return this.#t+e}get f32(){return this.#e.HEAPF32}writeF32(e,t=0){this.#e.HEAPF32.set(e,this.#t+t>>2)}readF32(e,t=0){let r=this.#t+t;return new Float32Array(this.#e.HEAPF32.buffer,r,e)}free(){this.#t&&(this.#e._free(this.#t),this.#t=0)}};function jr(i,e,...t){if(!e)return;let r=new TextEncoder,s=[],n=t.map(a=>{if(typeof a!="string")return a;let l=r.encode(a),c=i._malloc(l.length+1);return i.HEAPU8.set(l,c),i.HEAPU8[c+l.length]=0,s.push(c),c}),o=e(...n);for(let a of s)i._free(a);return o}var C=(i,e)=>i[`_Gracia_${e}`];async function Io(){let i=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!i)throw new Error("WebGPU adapter not available");return await i.requestDevice({requiredLimits:{maxStorageBuffersPerShaderStage:10,maxComputeWorkgroupSizeX:256,maxBufferSize:i.limits.maxBufferSize,maxStorageBufferBindingSize:i.limits.maxStorageBufferBindingSize}})}var $t=class i{#e;#t;#r=null;#i=0;constructor(e){this.#e=e,this.#t=new Qt(e)}static async boot(e,t,{maxSplatsCount:r=0}={}){let s=typeof e=="function"?await e({canvas:t}):e,n=await Io();if(typeof e=="function"&&(s.preinitializedWebGPUDevice=n,s.WebGPU?.importJsDevice?.(n)),C(s,"Init")?.(r|0),!C(s,"Initialized")?.())throw new Error("Gracia init failed");return{module:new i(s),device:n}}get heap(){return this.#t}get backend(){return this.#r}get buildUnixTime(){return C(this.#e,"GetBuildTime")?.()??0}shutdownApp(){C(this.#e,"Shutdown")?.()}setCamera(e,t,r,s){let n=!!(r&&s),o=this.#t.ptr(),a=o>>2,l=this.#t.f32;l.set(e,a),n&&l.set(r,a+16),l.set(t,a+32),n&&l.set(s,a+48),C(this.#e,"SetCamera")?.(n,o)}getModelMatrix(){let e=C(this.#e,"GetModelMatrix");if(!e)return null;let t=this.#t.ptr(256);return e(t),this.#t.readF32(16,256)}setModelMatrix(e){let t=C(this.#e,"SetModelMatrix");t&&(this.#t.writeF32(e,256),t(this.#t.ptr(256)))}initPure(e){this.shutdownBackend(),this.#r="pure",C(this.#e,"P_Init")?.(e?1:0)}pureRenderTo(e,t,r,s){let n=this.#e.WebGPU,o=n?.importJsTexture?.(e)??0,a=t?n?.importJsTexture?.(t)??0:0;return C(this.#e,"P_RenderTo")?.(o,a,r,s)!==0}initHybrid(e){this.shutdownBackend(),this.registerGL(e),this.#r="hybrid",C(this.#e,"H_Init")?.()}hybridFrame(e,t,r){C(this.#e,"H_Frame")?.(e,t,r)}hybridPreprocess(e,t){return C(this.#e,"H_Preprocess")?.(e,t)??0}hybridRender(e,t,r,s,n,o){C(this.#e,"H_Render")?.(e,t,r,s,n,o)}hybridRenderMesh(e,t,r,s,n){this.#t.writeF32(e),C(this.#e,"H_RenderMeshMVP")?.(this.#t.ptr(),t,r,s,n)}hybridRenderMotionMV(e,t,r,s){C(this.#e,"H_RenderMotionMV")?.(e,t,r,s)}hybridCanMotion(){return!!C(this.#e,"H_CanMotion")?.()}hybridHasMultiview(){return!!C(this.#e,"H_HasMultiview")?.()}hybridReset(){C(this.#e,"H_Reset")?.()}registerGL(e){this.#i&&this.#e.GL?.deleteContext(this.#i);let t=this.#e.GL;if(!t)throw new Error("WASM GL layer not available");this.#i=t.registerContext(e,{majorVersion:2,minorVersion:0,enableExtensionsByDefault:!0}),t.makeContextCurrent(this.#i)}shutdownBackend(){this.#r==="pure"?C(this.#e,"P_Shutdown")?.():this.#r==="hybrid"&&C(this.#e,"H_Shutdown")?.(),this.#i&&(this.#e.GL?.deleteContext(this.#i),this.#i=0),this.#r=null}dispose(){this.shutdownBackend(),this.#t.free(),this.shutdownApp()}addDynamicScene(){return C(this.#e,"AddScene")?.()??0}addStaticScene(){return C(this.#e,"AddStaticScene")?.()??0}removeScene(e){C(this.#e,"RemoveScene")?.(e)}sceneReady(e){return e?(C(this.#e,"SceneReady")?.(e)??0)!==0:!1}sceneProgress(e){return e?C(this.#e,"SceneProgress")?.(e)??0:0}sceneDuration(e){return e?C(this.#e,"SceneDuration")?.(e)??0:0}sceneIsBuffering(e){return e?(C(this.#e,"SceneIsBuffering")?.(e)??0)!==0:!1}sceneLastFetchStatus(e){return e?C(this.#e,"SceneGetLastFetchStatus")?.(e)??0:0}sceneSetTime(e,t){C(this.#e,"SceneSetTime")?.(e,t)}sceneSetPlaybackRange(e,t,r){C(this.#e,"SceneSetPlaybackRange")?.(e,t,r)}sceneSetVisible(e,t){C(this.#e,"SceneSetVisible")?.(e,t)}sceneGetBBox(e){let t=C(this.#e,"SceneGetBBox");if(!t||!e)return null;let r=this.#t.ptr(256);t(e,r);let s=r>>2,n=this.#t.f32;return n[s]===0&&n[s+1]===0&&n[s+2]===0&&n[s+3]===0&&n[s+4]===0&&n[s+5]===0?null:{minX:n[s],minY:n[s+1],minZ:n[s+2],maxX:n[s+3],maxY:n[s+4],maxZ:n[s+5]}}sceneSetEnvLighting(e,t,r){let s=C(this.#e,"SceneSetEnvPreset");if(!s||!e)return;let n=this.#t.ptr(128),o=n>>2,a=this.#t.f32;for(let l=0;l<4;l++)a[o+l*4]=t[l*3],a[o+l*4+1]=t[l*3+1],a[o+l*4+2]=t[l*3+2],a[o+l*4+3]=0;a[o+3]=r,s(e,n)}sceneClearEnvLighting(e){C(this.#e,"SceneClearEnvPreset")?.(e)}sceneSetModelMatrix(e,t){let r=C(this.#e,"SceneSetModelMatrix");!r||!e||(this.#t.writeF32(t,256),r(e,this.#t.ptr(256)))}sceneOpen(e,t){jr(this.#e,C(this.#e,"SceneOpen"),e,t)}sceneOpenApi(e,t,r){jr(this.#e,C(this.#e,"SceneOpenApi"),e,t,r)}registerLocalFile(e){let t=this.#e.graciaRegisterLocalFile;if(!t)throw new Error("WASM local-file bridge unavailable");return t(e)}sceneOpenLocal(e,t){C(this.#e,"SceneOpenLocal")?.(e,t)}sceneOpenStatic(e,t){let r=C(this.#e,"SceneOpenStatic");if(!r)return-1;let s=this.#e._malloc(t.length);this.#e.HEAPU8.set(t,s);try{return r(e,s,t.length)}finally{this.#e._free(s)}}};var Fo={panningModel:"HRTF",distanceModel:"inverse",refDistance:1,maxDistance:100,rolloffFactor:1},Bo=[0,0,0],Oo=[0,0,0,0,0,-1,0,1,0],Go=.1,zo=40,ds=.01,fs=.08,No=1.5,ms=.05,Do=2e3;function gs(){typeof navigator<"u"&&navigator.audioSession&&(navigator.audioSession.type="playback")}function ys(){return typeof performance<"u"?performance.now():Date.now()}function ie(i,e,t,r=0){r>0?i.linearRampToValueAtTime(e,t.currentTime+r):i.setValueAtTime(e,t.currentTime)}function Xo(i,e,t){i.setTargetAtTime(e,t.currentTime,.01)}function Kt(i){try{i.disconnect()}catch{}}function se(i,e){return Math.abs(i-e)<1e-4}function re(i){try{i.automationRate="k-rate"}catch{}}function Qr(i){i.positionX&&(re(i.positionX),re(i.positionY),re(i.positionZ),"orientationX"in i?(re(i.orientationX),re(i.orientationY),re(i.orientationZ)):(re(i.forwardX),re(i.forwardY),re(i.forwardZ),re(i.upX),re(i.upY),re(i.upZ)))}function xs(i,e,t,r,s,n=0){ie(i.positionX,e,s,n),ie(i.positionY,t,s,n),ie(i.positionZ,r,s,n)}function Ho(i,e,t,r,s,n,o,a,l=0){if("orientationX"in i){ie(i.orientationX,e,a,l),ie(i.orientationY,t,a,l),ie(i.orientationZ,r,a,l);return}ie(i.forwardX,e,a,l),ie(i.forwardY,t,a,l),ie(i.forwardZ,r,a,l),ie(i.upX,s,a,l),ie(i.upY,n,a,l),ie(i.upZ,o,a,l)}var $r=class{#e=null;#t=null;#r=[0,0,0];#i=[0,0,-1,0,1,0];#s=!1;#o=new Float32Array(9);#n=!1;constructor(){gs(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&this.#e&&this.#e.state!=="running"&&this.resume()})}get ctx(){return this.#e}get destination(){return this.#t??this.#e?.destination??null}setOutput(e){e?.context&&e.context!==this.#e&&(this.#e=e.context,Qr(this.#e.listener),this.#n=!1),this.#t=e?.destination??null,this.#s=e?.externalListener===!0,this.#a()}prepare(){let e=this.#l();if(!e)throw new Error("Web Audio is not supported in this browser");return{ctx:e,destination:this.destination??e.destination}}resume(){gs();let e=this.#l();return e?e.state==="running"?Promise.resolve():e.resume().catch(()=>{}):Promise.resolve()}listener(e,t,r,s,n,o,a,l,c,h=0){this.#r=[e,t,r],this.#i=[s,n,o,a,l,c],this.#a(h)}resetListener(){this.listener(...Oo)}#l(){if(this.#e)return this.#e;if(typeof AudioContext>"u")return null;try{this.#e=new AudioContext}catch{return null}return Qr(this.#e.listener),this.#n=!1,this.#a(),this.#e}#a(e=0){let t=this.#e?.listener;if(!t||this.#s)return;let[r,s,n]=this.#r,[o,a,l,c,h,u]=this.#i,p=this.#o;this.#n&&se(r,p[0])&&se(s,p[1])&&se(n,p[2])&&se(o,p[3])&&se(a,p[4])&&se(l,p[5])&&se(c,p[6])&&se(h,p[7])&&se(u,p[8])||(p.set([r,s,n,o,a,l,c,h,u]),this.#n=!0,xs(t,r,s,n,this.#e,e),Ho(t,o,a,l,c,h,u,this.#e,e))}},be=new $r,Kr=class{#e;#t;#r;#i;#s;#o;ready;#n=null;#l=[];#a=null;#c=!1;#h=!1;#u=!1;#m=!1;#p=!1;#d=0;#f=0;#g=0;#b=NaN;#y=NaN;#x=NaN;constructor(e,t={}){let{ctx:r,destination:s}=be.prepare();this.#e=r,this.#o=t.destination??s;let n=new Audio;this.#t=n,n.crossOrigin="anonymous",n.preload="auto",n.loop=!0,n.preservesPitch=!1,this.#i=r.createGain(),this.#s=r.createPanner(),Qr(this.#s),this.pannerAttr({...Fo,...t.pannerAttr}),this.#r=r.createMediaElementSource(n),this.#r.connect(this.#s),this.#s.connect(this.#i),this.#i.connect(this.#o),this.volume(t.volume??1).rate(t.rate??1).pos(...t.pos??Bo),this.ready=new Promise(o=>{this.#n=o}),this.#M("loadedmetadata",()=>this.#C()),this.#M("canplay",()=>this.#S()),this.#M("loadeddata",()=>this.#S()),this.#M("error",()=>this.#L(`Media error ${n.error?.code??"unknown"}`)),n.src=e,n.load(),this.#S()}get context(){return this.#e}get blocked(){return this.#u}get failed(){return this.#c}get buffering(){return this.#w||this.#v&&this.#g>0}get clockRate(){return!this.#v||Math.abs(this.#f)<ds?1:1+M.clamp(No*this.#f,-ms,ms)}get#v(){return!this.#c&&!this.#u&&!this.#h}get#w(){return this.#v&&(!this.#m||this.#p||this.#t.paused||this.#t.readyState<3||this.#t.seeking||this.#a!==null)}#M(e,t){this.#l.push([e,t]),this.#t.addEventListener(e,t)}#S(){this.#t.readyState<3||this.#h||this.#_()}#_(){this.#n?.(),this.#n=null}#L(e){this.#h||this.#c||(this.#c=!0,this.pause(),this.#_())}allowPlayback(){this.#u=!1}play(){if(this.#c||this.#u||this.#h||this.#p||this.#m&&!this.#t.paused)return;let e=++this.#d;this.#p=!0;try{Promise.resolve(this.#t.play()).then(()=>{e!==this.#d||this.#h||(this.#p=!1,this.#m=!0)}).catch(t=>this.#T(e,t))}catch(t){this.#T(e,t)}}#T(e,t){e!==this.#d||this.#h||(this.#p=!1,this.#m=!1,t?.name==="NotAllowedError"?(this.#u=!0,this.#t.pause()):t?.name!=="AbortError"&&this.#L(t))}pause(){this.#d++,this.#p=!1,this.#m=!1,this.#P(),this.#t.paused||this.#t.pause()}unload(){this.pause(),this.#h=!0;for(let[e,t]of this.#l)this.#t.removeEventListener(e,t);this.#l=[],this.#t.removeAttribute("src"),this.#t.load(),this.#_(),Kt(this.#r),Kt(this.#s),Kt(this.#i)}seek(e){return typeof e=="number"&&(this.#P(),this.#a=Number.isFinite(e)?Math.max(0,e):0,this.#C()),this.#a??this.#t.currentTime}#C(){if(this.#a===null||this.#t.readyState<1)return;let e=this.#t.duration,t=Number.isFinite(e)&&e>0?M.wrap(this.#a,e):this.#a;Math.abs(this.#t.currentTime-t)>.005&&(this.#t.currentTime=t),this.#a=null}sync(e){this.#c||this.#u||this.#h||(!this.#m||this.#t.paused)&&!this.#p&&(this.seek(e),this.play())}follow(e){if(this.#w||!this.#v||this.#e.state!=="running"){this.#P();return}let t=this.#t.currentTime-e,r=this.#t.duration;Number.isFinite(r)&&r>0&&(t=M.wrapDelta(t,r));let s=ys();if(t<-fs?this.#g||=s:t>-ds&&(this.#g=0),t>fs||this.#g&&s-this.#g>Do){this.seek(e);return}this.#f=t}#P(){this.#f=0,this.#g=0}volume(e){return Xo(this.#i.gain,M.clamp01(e),this.#e),this}rate(e){return this.#t.playbackRate=M.clamp(M.finite(e,1),.1,4),this}pos(e,t,r,s=0){return se(e,this.#b)&&se(t,this.#y)&&se(r,this.#x)?this:(this.#b=e,this.#y=t,this.#x=r,xs(this.#s,e,t,r,this.#e,s),this)}destination(e){let t=e??this.#e.destination;return t===this.#o?this:(Kt(this.#i),this.#o=t,this.#i.connect(this.#o),this)}pannerAttr(e){return e?(e.panningModel&&(this.#s.panningModel=e.panningModel),e.distanceModel&&(this.#s.distanceModel=e.distanceModel),typeof e.refDistance=="number"&&(this.#s.refDistance=e.refDistance),typeof e.maxDistance=="number"&&(this.#s.maxDistance=e.maxDistance),typeof e.rolloffFactor=="number"&&(this.#s.rolloffFactor=e.rolloffFactor),this):this}},Jt=class{#e=null;#t=null;#r=[0,0,0];#i=L.create();#s=new Float32Array(9);#o={volume:1,rate:1,pannerAttr:{}};#n=!1;#l=0;#a=0;#c=0;#h=!1;get context(){return be.ctx}get isLoaded(){return!this.#h||!this.#n||be.ctx?.state!=="running"||this.#e?.blocked===!0}get isBuffering(){return this.#n&&(this.#e?.buffering??!1)}setOutput(e){if(be.setOutput(e),!!this.#e){if(this.#e.context!==be.ctx){let t=this.#t,r=this.#e.seek();this.unload(),t&&(this.load(t),this.#e?.seek(r));return}this.#e.destination(be.destination)}}async load(e){if(e===this.#t&&this.#e&&!this.#e.failed){await this.#e.ready;return}this.unload(),this.#t=e,this.#h=!0;let t=++this.#l;try{this.#e=new Kr(e,{...this.#o,pos:this.#r}),await this.#e.ready}catch{t===this.#l&&(this.#e?.unload(),this.#e=null,this.#t=null)}finally{t===this.#l&&(this.#h=!1)}}sync(e,t,r){let s=this.#e;return!this.#n||!r?(s?.pause(),!0):(s?.sync(e),s?.follow(e),!this.isBuffering)}get clockRate(){return this.#n?this.#e?.clockRate??1:1}seek(e){this.#e?.seek(e)}volume(e){this.#o.volume=M.clamp01(e),this.#e?.volume(this.#o.volume)}rate(e){this.#o.rate=e,this.#e?.rate(e)}setSpatial(e,t,r){this.#r=[e,t,r];let s=this.#u("spatial");s>=0&&this.#e?.pos(e,t,r,s)}setSourceMatrix(e,t,r=1){let s=e.pointTo?.(this.#i,t,r)??V.pointTo(this.#i,e,t,r);this.setSpatial(s.x,s.y,s.z)}setListenerMatrix(e){let t=this.#u("listener");if(t<0)return;let r=e.poseTo?.(this.#s)??V.poseTo(this.#s,e);be.listener(...r,t)}setPanner(e){Object.assign(this.#o.pannerAttr,e),this.#e?.pannerAttr(e)}stop(){this.#e?.pause()}get enabled(){return this.#n&&be.ctx?.state==="running"&&!this.#e?.blocked}enable(){this.#n=!0,be.resume(),this.#e?.allowPlayback()}disable(){this.#n=!1,this.#e?.pause()}unload(){this.#l++,this.#e?.unload(),this.#e=null,this.#t=null,this.#h=!1,be.resetListener()}#u(e){let t=ys(),r=e==="listener"?this.#a:this.#c;return r&&t-r<zo?-1:(e==="listener"?this.#a=t:this.#c=t,M.deltaSeconds(t,r,0,Go))}};var St=class{#e;#t=0;#r=!1;constructor(e){this.#e=e}get id(){return this.#t}get isStatic(){return this.#r}get isReady(){return this.#e.sceneReady(this.#t)}get progress(){return this.#e.sceneProgress(this.#t)}get duration(){return this.#r?0:this.#e.sceneDuration(this.#t)}get isBuffering(){return this.#r?!1:this.#e.sceneIsBuffering(this.#t)}get lastFetchStatus(){return this.#e.sceneLastFetchStatus(this.#t)}setTime(e){this.#t&&!this.#r&&this.#e.sceneSetTime(this.#t,e)}setPlaybackRange(e,t){this.#t&&!this.#r&&this.#e.sceneSetPlaybackRange(this.#t,e,t)}setVisible(e){this.#t&&this.#e.sceneSetVisible(this.#t,e)}getBBox(){return this.#e.sceneGetBBox(this.#t)}setEnvLighting(e,t){this.#t&&this.#e.sceneSetEnvLighting(this.#t,e,t)}clearEnvLighting(){this.#t&&this.#e.sceneClearEnvLighting(this.#t)}setModelMatrix(e){this.#t&&this.#e.sceneSetModelMatrix(this.#t,e)}openDynamic(e){if(this.remove(),this.#t=this.#e.addDynamicScene(),this.#r=!1,e.localFile||e.file){let r=e.localFile||e.file;this.#e.sceneOpenLocal(this.#t,this.#e.registerLocalFile(r));return}let t=e.url;if(e.token){this.#e.sceneOpenApi(this.#t,t,e.token);return}this.#e.sceneOpen(this.#t,t)}async openStatic(e){this.remove();let t=this.#e.addStaticScene();this.#t=t,this.#r=!0;let r=e.file?await e.file.arrayBuffer():await(await fetch(e.url)).arrayBuffer();this.#t===t&&this.#e.sceneOpenStatic(t,new Uint8Array(r))}remove(){this.#t&&(this.#e.removeScene(this.#t),this.#t=0)}};var bs={alpha:!0,premultipliedAlpha:!0,depth:!0,stencil:!1,antialias:!1,powerPreference:"high-performance",xrCompatible:!0},er=Object.freeze({start:0,end:1/0}),Qe=class i{#e;#t;#r=new Jt;#i=0;#s=null;#o=null;#n=null;#l=!1;#a=0;#c=0;#h=1;#u=er;#m=!1;#p=null;#d=null;static GL_CANVAS_OPTS=bs;constructor(e,t){this.#e=e,this.#t=t,typeof document<"u"&&document.addEventListener("visibilitychange",this.#f)}#f=()=>{document.hidden&&this.#r.stop()};static async create(e,{canvas:t,gl:r,backend:s,maxSplatsCount:n}={}){if(!t&&!r)throw new Error("canvas or gl required");let o=s??(r?"hybrid":"pure"),{module:a,device:l}=await $t.boot(e,t||r.canvas,{maxSplatsCount:n}),c=new i(a,l);return o==="hybrid"?c.#y(r??i.#g(t)):c.#b(t),c}static preferredFormat(){return navigator.gpu.getPreferredCanvasFormat()}static#g(e){let t=e.getContext("webgl2",bs);if(!t)throw new Error("WebGL2 not available");return t}get device(){return this.#t}get backend(){return this.#e.backend}get buildUnixTime(){return this.#e.buildUnixTime}get gl(){return this.#d}get isBGRA(){return i.preferredFormat()==="bgra8unorm"}assertDevice(e){if(e&&e!==this.#t)throw new Error("WebGPU device must match GraciaPlayer.device")}configureSurface(e,t={}){let{format:r,alphaMode:s="premultiplied",usage:n}=t;e.configure({device:this.#t,format:r??i.preferredFormat(),alphaMode:s,...n!=null?{usage:n}:{}})}bindCanvas(e,t={}){let r=e.getContext("webgpu");if(!r)throw new Error("WebGPU canvas context not available");return this.configureSurface(r,t),this.#p=r,r}setBackend(e,{canvas:t,gl:r}={}){if(this.shutdown(),e==="hybrid"){if(!r&&!t)throw new Error("canvas or gl required for hybrid backend");this.#y(r??i.#g(t))}else this.#b(t)}present(e,t){e===0||t===0||(this.#e.backend==="hybrid"?this.#v(e,t):this.#x())}renderTextures({color:e,depth:t,w:r,h:s}){return this.#L(),this.#e.backend!=="pure"?!1:this.#e.pureRenderTo(e,t,r,s)}copyTexture(e,t,r=null){let s=r??[e.width,e.height,1],n=this.#t.createCommandEncoder();n.copyTextureToTexture({texture:e},{texture:t},s),this.#t.queue.submit([n.finish()])}renderHybridViewport(e,t,{gl:r,drawMode:s,enableMesh:n=!1,x:o=0,y:a=0,eye:l=0}={}){let c=r??this.#d;if(!c)throw new Error("No WebGL context");let h=s??this.#i;this.preprocess(e,t),c.enable(c.DEPTH_TEST),c.depthFunc(c.LEQUAL),c.depthMask(!1),this.render(h,o,a,e,t,l),n&&(c.colorMask(!1,!1,!1,!1),c.depthMask(!0),this.render(1,o,a,e,t,l),c.colorMask(!0,!0,!0,!0)),c.depthMask(!0)}shutdown(){this.#e.shutdownBackend(),this.#d=null,this.#p=null}#b(e){this.#d=null,this.#p=null,this.#t.pushErrorScope("validation"),this.#e.initPure(this.isBGRA),this.#t.popErrorScope().then(t=>{}),e&&this.bindCanvas(e)}#y(e){this.#p=null,this.#d=e,this.#e.initHybrid(e)}#x(){if(!this.#p)throw new Error("bindCanvas() required");let{width:e,height:t}=this.#p.canvas;e===0||t===0||this.renderTextures({color:this.#p.getCurrentTexture(),w:e,h:t})}#v(e,t){let r=this.#d;if(!r)throw new Error("hybrid backend required");r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clearDepth(1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.disable(r.DEPTH_TEST),this.frame(e,t,this.#i)}get drawMode(){return this.#i}set drawMode(e){this.#i=M.clampInt(e,0,3)}get#w(){return this.#s??this.#o}get isReady(){return(this.#w?.isReady??!1)&&this.#r.isLoaded}get progress(){return this.#w?.progress??0}get duration(){return this.#s?.duration??0}get playbackRange(){let{start:e,end:t}=this.#u;return{start:e,end:Math.min(t,this.duration||1/0)}}get ended(){return this.#m}get currentTime(){return this.#a}get isPlaying(){return this.#l}get isBuffering(){return(this.#s?.isBuffering??!1)||this.#l&&this.#r.isBuffering}get lastFetchStatus(){return this.#w?.lastFetchStatus??0}play(){this.#l=!0,this.#_()}pause(){this.#l=!1,this.#c=0,this.#r.stop()}seek(e){let{start:t,end:r}=this.playbackRange;this.#a=M.clamp(e,t,r),this.#c=0,this.#r.seek(this.#a)}setPlaybackRange(e,t){if(!(e>=0&&e<t&&t<=this.duration))throw new RangeError(`Invalid playback range [${e}, ${t}) for ${this.duration}s`);this.#M({start:e,end:t})}clearPlaybackRange(){this.#M(er)}#M(e){this.#u=e,this.#s?.setPlaybackRange(e.start,e.end);let{start:t,end:r}=this.playbackRange;(this.#a<t||this.#a>=r)&&this.seek(t)}get speed(){return this.#h}setSpeed(e){this.#h=M.clamp(M.finite(e,1),.1,4),this.#r.rate(this.#h)}close(){this.#s?.remove(),this.#s=null,this.#o?.remove(),this.#o=null,this.#S(),this.#r.unload()}clearVideo(){this.#s?.remove(),this.#s=null,this.#S(),this.#r.unload()}#S(){this.#u=er,this.#m=!1,this.#a=0,this.#c=0,this.#l=!1}clearEnvironment(){this.#o?.remove(),this.#o=null}#_(){let e=this.#l&&(this.#s?.isReady??!1)&&!this.#s?.isBuffering;return this.#r.sync(this.#a,this.duration,e)}#L(){if(!this.#s)return;let e=performance.now(),t=this.#_(),r=this.#l&&this.#s.isReady&&!this.#s.isBuffering&&t;r&&this.#c>0&&this.#T(M.deltaSeconds(e,this.#c)*this.#h*this.#r.clockRate),this.#c=r?e:0,this.#s.setTime(this.#a)}#T(e){let{start:t,end:r}=this.playbackRange,s=this.#a+e;if(s<r){this.#a=s;return}this.#a=t+M.wrap(s-t,r-t),this.#u===er?this.#m=!0:this.#r.seek(this.#a)}open(e){if(this.#r.unload(),e.audio&&this.#r.load(e.audio),e.type==="static")return this.#C(e);this.#s||(this.#s=new St(this.#e)),this.#s.openDynamic(e),this.#P(this.#s),this.#S()}async#C(e){this.#o||(this.#o=new St(this.#e)),await this.#o.openStatic(e),this.#P(this.#o)}get audioContext(){return this.#r.context}get audioEnabled(){return this.#r.enabled}enableAudio(){this.#r.enable(),this.#_()}disableAudio(){this.#r.disable()}setAudioOutput(e){this.#r.setOutput(e)}setVolume(e){this.#r.volume(e)}loadAudio(e){return this.#r.load(e)}setAudioSpatial(e,t,r){this.#r.setSpatial(e,t,r)}setAudioSourceMatrix(e,t,r){this.#r.setSourceMatrix(e,t,r)}setAudioListenerMatrix(e){this.#r.setListenerMatrix(e)}setAudioPanner(e){this.#r.setPanner(e)}setCamera(e,t,r,s){this.#e.setCamera(e,t,r,s)}getBBox(){return this.#w?.getBBox()??null}getModelMatrix(){return this.#e.getModelMatrix()}setModelMatrix(e){this.#e.setModelMatrix(e)}setStaticModelMatrix(e){this.#o?.setModelMatrix(e)}setEnvLighting(e,t=1){this.#n={coefs:Float32Array.from(e),scale:t},this.#s?.setEnvLighting(e,t),this.#o?.setEnvLighting(e,t)}clearEnvLighting(){this.#n=null,this.#s?.clearEnvLighting(),this.#o?.clearEnvLighting()}#P(e){this.#n&&e.setEnvLighting(this.#n.coefs,this.#n.scale)}frame(e,t,r){this.#L(),this.#e.hybridFrame(e,t,r)}preprocess(e,t){return this.#L(),this.#e.hybridPreprocess(e,t)}render(e,t,r,s,n,o){this.#e.hybridRender(e,t,r,s,n,o)}renderMesh(e,t,r,s,n){this.#e.hybridRenderMesh(e,t,r,s,n)}renderMotionMV(e,t,r,s){this.#e.hybridRenderMotionMV(e,t,r,s)}canMotion(){return this.#e.hybridCanMotion()}hasMultiview(){return this.#e.hybridHasMultiview()}resetXR(){this.#e.hybridReset()}dispose(){typeof document<"u"&&document.removeEventListener("visibilitychange",this.#f),this.close(),this.#r.unload(),this.shutdown(),this.#e.dispose()}};var vs=.75,Vo=.35,Uo=.9,Wo=.1,Yo=.15,ws=3,qo=.5,_s=Float32Array.of(1,.72,.05,.12),Jr=Float32Array.of(1,.08,.04,.9),Zo=.001,ei=new Float32Array(0),jo=.25,Qo=1e-5,tr=i=>typeof i=="number"&&Number.isFinite(i),ti=i=>!!i&&tr(i.x)&&tr(i.y)&&tr(i.z),$o=i=>ti(i)&&tr(i.w);function ii(i){return!i||typeof i!="object"||!cs(i)||!ti(i.position)||!$o(i.rotation)||!ti(i.scale)?!1:i.scale.x>0&&i.scale.y>0&&i.scale.z>0}var Ms=(i,e,t)=>{let r=M.unlerp01(t,i,e);return r*r*(3-2*r)};function Ko(i,e=new Float32Array(4)){if(i>=vs)return e.fill(0);let t=Ms(0,1,1-Math.max(i,0)/vs);for(let r=0;r<4;r++)e[r]=_s[r]+(Jr[r]-_s[r])*t;return e}var Ts=i=>Ms(Vo,0,i),Jo=i=>Uo*Ts(i),ea=i=>1-M.unlerp01(i,ws,ws+qo);function ta(i,e,t){t.set(i);let r=Jr[3]*ea(e);return r>i[3]&&(t.set(Jr),t[3]=r),t}function Ss(i,e,t){if(e[3]>0){i[3]===0&&(i.set(e),i[3]=0);for(let r=0;r<4;r++)i[r]+=(e[r]-i[r])*t}else i[3]-=i[3]*t;i[3]<Zo&&(i[3]=0)}var $e=(i,e,t,r)=>(i[e]=t[r],i[e+1]=t[r+1],i[e+2]=t[r+2],e+3),ri=class{#e;#t=null;#r=new Y;#i=new Y;#s=new Y;#o=new ye;#n=ei;#l=ei;#a=new Y;#c=new xe;#h=new Y;#u=new ye;#m=new ye;#p=new Y;#d=1;#f=new Y;#g=new xe;constructor(e){this.#e=e,this.#i.fromXYZ(e.position),this.#s.fromXYZ(e.scale),this.#o.fromXYZW(e.rotation).normalize(),this.setRoomMatrix(null)}setRoomMatrix(e){return this.#c.fromRotationTranslationScale(this.#o,this.#i,this.#s),e&&this.#c.preMultiply(e),this.#c.decompose(this.#h,this.#u,this.#p),this.#m.copy(this.#u).invert(),this.#d=this.#p[0]<0?-1:1,this.#p.set(Math.abs(this.#p[0])*.5,Math.abs(this.#p[1])*.5,Math.abs(this.#p[2])*.5),this.#f.set(this.#d,1,1),this.#g.fromRotationTranslationScale(this.#u,this.#h,this.#f),(!this.#t||!this.#r.equals(this.#p,Qo))&&this.#b(),this}signedDistance(e){return this.#t.signedDistance(this.#x(e))}get mesh(){return this.#t.mesh}get meshMatrix(){return this.#g}outlineRibbon(e){let t=e*.5,r=this.#n,s=this.#l,n=0,o=0;for(let a of this.#t.outlines){let l=a.length/3;for(let c=0;c<l;c++)this.#y(a,c,l,t,(n+c)*6);for(let c=0;c<l;c++){let h=(n+c)*6,u=(n+(c+1)%l)*6;o=$e(s,o,r,h),o=$e(s,o,r,u),o=$e(s,o,r,u+3),o=$e(s,o,r,h),o=$e(s,o,r,u+3),o=$e(s,o,r,h+3)}n+=l}return s}#b(){this.#r.copy(this.#p),this.#t=Zt(this.#e,this.#p);let e=this.#t.outlines.reduce((t,r)=>t+r.length/3,0);this.#n=new Float32Array(e*6),this.#l=new Float32Array(e*18)}#y(e,t,r,s,n){let o=(t+r-1)%r*3,a=(t+1)%r*3,l=e[t*3],c=e[t*3+1],h=e[t*3+2],u=l-e[o],p=h-e[o+2],f=e[a]-l,g=e[a+2]-h,d=Math.hypot(u,p),m=Math.hypot(f,g),x=p/d+g/m,b=-u/d-f/m,y=Math.hypot(x,b),v=s/(y*Math.max(y/2,jo));this.#v(n,l+x*v,c,h+b*v),this.#v(n+3,l-x*v,c,h-b*v)}#x(e){let t=this.#a.sub(e,this.#h).transformQuat(this.#m);return t[0]*=this.#d,t}#v(e,t,r,s){let n=this.#a.set(t*this.#d,r,s).transformQuat(this.#u);this.#n.set(n.add(this.#h),e)}},Mt=class{#e=null;#t=0;#r=new Float32Array(4);#i=new Float32Array(4);#s=0;#o=new Float32Array(4);#n=new Float32Array(4);#l=!0;#a=null;#c=new Y;get active(){return!!this.#e}get darkness(){return this.#t}get outline(){return this.#r}get surface(){return this.#i}get aboveSplats(){return this.#s}get mesh(){return this.#e?.mesh??null}get meshMatrix(){return this.#e?.meshMatrix??null}setBounds(e){return this.#e=ii(e)?new ri(e):null,this.reset()}setRoomMatrix(e){return this.#e?.setRoomMatrix(e),this}queueIntro(){return this.#l=!0,this}reset(){return this.#t=0,this.#r.fill(0),this.#i.fill(0),this.#s=0,this.#a=null,this}update(e,t){if(!this.#e)return this.reset();this.#l?(this.#l=!1,this.#a=0):this.#a!==null&&(this.#a+=t),this.#c.from(e);let r=-this.#e.signedDistance(this.#c),s=Ko(r,this.#o),n=this.#a===null?s:ta(s,this.#a,this.#n),o=1-Math.exp(-t/Yo);Ss(this.#r,n,o),Ss(this.#i,s,o),this.#s+=(Ts(r)-this.#s)*o;let a=Jo(r);return this.#t+=(a-this.#t)*(1-Math.exp(-t/Wo)),this}ribbon(e){return this.#e?.outlineRibbon(e)??ei}};var Tt={daylight:{ambient:[3.62,3.54,3.37],topDown:[.5,.45,.4]},cloudy:{ambient:[3.19,3.26,3.44],topDown:[.05,.05,.07]},sunset:{ambient:[4.08,3.01,1.95],topDown:[.25,.12,.02],frontBack:[.15,.06,0],leftRight:[-.3,-.12,0]},indoor:{ambient:[3.72,3.37,2.84],topDown:[.3,.25,.15]},shade:{ambient:[3.12,3.3,3.72],topDown:[.1,.15,.3]},night:{ambient:[2.48,2.66,3.01],topDown:[.08,.1,.15]},off:null};var ra=2.5,Ls=1.6,ia=.0015,sa=2,Ps=.5,na=.6,oa=.022,aa=1e-4,rr=Math.PI/2-.01,ir=.05,sr=200,la=new Set(["w","a","s","d","r","f","q","e","shift"]),Pt=class{#e;#t=new Map;#r=null;#i=1;#s;#o;#n;#l=0;#a=0;#c=0;#h=0;#u=0;#m=e=>e.preventDefault();constructor(e,{pan:t=!0,rotate:r=ra,onDown:s}={}){this.#e=e,this.#s=t,this.#o=r,this.#n=s,this.#i=e.clientHeight||1,e.addEventListener("contextmenu",this.#m),e.addEventListener("pointerdown",this.#p),e.addEventListener("wheel",this.#g,{passive:!1})}get height(){return this.#i}consume(e){return e.rotX=this.#l,e.rotY=this.#a,e.panX=this.#c,e.panY=this.#h,e.zoom=this.#u,this.#l=this.#a=this.#c=this.#h=this.#u=0,e}dispose(){this.#e.removeEventListener("contextmenu",this.#m),this.#e.removeEventListener("pointerdown",this.#p),this.#e.removeEventListener("wheel",this.#g),window.removeEventListener("pointermove",this.#d),window.removeEventListener("pointerup",this.#f),window.removeEventListener("pointercancel",this.#f),this.#t.clear(),this.#r=null}#p=e=>{this.#e.setPointerCapture?.(e.pointerId),this.#t.size===0&&(window.addEventListener("pointermove",this.#d),window.addEventListener("pointerup",this.#f),window.addEventListener("pointercancel",this.#f)),this.#t.set(e.pointerId,{x:e.clientX,y:e.clientY,button:e.button,touch:e.pointerType==="touch"}),this.#i=this.#e.clientHeight||this.#i,this.#t.size===2&&this.#b(),this.#n?.()};#d=e=>{let t=this.#t.get(e.pointerId);if(!t)return;let r=e.clientX-t.x,s=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,this.#t.size>=2)return this.#y();!t.touch&&(t.button===2||e.buttons===2)?this.#s&&(this.#c+=r,this.#h+=s):(this.#l+=r/this.#i*this.#o,this.#a+=s/this.#i*this.#o)};#f=e=>{this.#e.releasePointerCapture?.(e.pointerId),this.#t.delete(e.pointerId),this.#r=null,this.#t.size===0&&(window.removeEventListener("pointermove",this.#d),window.removeEventListener("pointerup",this.#f),window.removeEventListener("pointercancel",this.#f))};#g=e=>{e.preventDefault(),this.#u+=-e.deltaY*ia};#b(){let[e,t]=this.#t.values();this.#r={dist:Math.hypot(e.x-t.x,e.y-t.y),cx:(e.x+t.x)/2,cy:(e.y+t.y)/2}}#y(){let[e,t]=this.#t.values(),r=Math.hypot(e.x-t.x,e.y-t.y),s=(e.x+t.x)/2,n=(e.y+t.y)/2,o=this.#r;o&&(o.dist>0&&r>0&&(this.#u+=Math.log(r/o.dist)),this.#s&&(this.#c+=s-o.cx,this.#h+=n-o.cy)),this.#r={dist:r,cx:s,cy:n}}},ca=i=>1-Math.exp(-i/oa),ne=()=>({rotX:0,rotY:0,panX:0,panY:0,zoom:0}),ha=i=>Math.abs(i.rotX)+Math.abs(i.rotY)+Math.abs(i.panX)+Math.abs(i.panY)+Math.abs(i.zoom)<aa;function ai(i,e,t,r,s){let n=i.consume(e);if(t.rotX+=n.rotX,t.rotY+=n.rotY,t.panX+=n.panX,t.panY+=n.panY,t.zoom+=n.zoom,ha(t))return!1;let o=ca(s);for(let a of["rotX","rotY","panX","panY","zoom"])r[a]=t[a]*o,t[a]-=r[a];return!0}var si=class{#e;#t;#r=L.create();#i=L.create();#s=L.create();#o=L.create();#n=L.create();#l=L.create();#a=1;#c=0;#h=0;#u=!1;#m=ne();#p=ne();#d=ne();constructor(e,t){this.#e=e,this.#t=new Pt(t),this.#x()}get type(){return"orbit"}update(e){this.#g(e)&&this.#x()}frame(e,t){this.#v(e,t)}reset(e,t){this.#v(e,t)}zoom(e){e>0&&(this.#p.zoom+=Math.log(e))}applyConstraints(e){this.#u=e,this.#h=M.clamp(this.#h,-rr,this.#f),this.#x()}dispose(){this.#t.dispose()}get#f(){return this.#u?0:rr}#g(e){if(!ai(this.#t,this.#m,this.#p,this.#d,e))return!1;let t=this.#d;return this.#c+=t.rotX,this.#h=M.clamp(this.#h-t.rotY,-rr,this.#f),t.zoom&&(this.#a=M.clamp(this.#a*Math.exp(-t.zoom),ir,sr)),(t.panX||t.panY)&&this.#y(t.panX,t.panY),!0}#b(){this.#o.yawPitchBasis(this.#c,this.#h,this.#i,this.#s,this.#n)}#y(e,t){this.#b();let r=M.perspectiveScale(this.#a,this.#e.fov,this.#t.height)*Ls;this.#r.addScaled(this.#o,-e*r).addScaled(this.#n,t*r)}#x(){this.#b(),this.#e.position.copy(this.#s).scale(this.#a).add(this.#r),this.#e.setAxes(this.#o,this.#n,this.#s)}#v(e,t){this.#r.from(e),this.#s.sub(this.#l.from(t),this.#r),this.#a=M.clamp(this.#s.len,ir,sr),this.#i.copy(this.#s).scale(-1).normalize(F.FORWARD),this.#l.yawPitch(this.#i),this.#c=this.#l.x,this.#h=M.clamp(this.#l.y,-rr,this.#f),this.#p=ne(),this.#x()}},ni=class{#e;#t;#r=new Set;#i=K.create();#s=L.create();#o=L.create();#n=L.create();#l=L.create();#a=L.create();#c=ne();#h=ne();#u=ne();constructor(e,t){this.#e=e,t.hasAttribute("tabindex")||(t.tabIndex=0),this.#t=new Pt(t,{pan:!1,onDown:()=>t.focus()}),window.addEventListener("keydown",this.#f),window.addEventListener("keyup",this.#g)}get type(){return"fly"}update(e){let t=this.#m(e);this.#p(e)&&(t=!0),t&&this.#d()}frame(e,t){this.reset(e,t)}reset(e,t){this.#e.position.from(t),this.#s.sub(this.#a.from(e),this.#e.position).normalize(F.FORWARD),this.#a.yawPitch(this.#s),this.#i.identity().rotate(F.Y,-this.#a.x).rotate(F.X,this.#a.y),this.#h=ne(),this.#d()}zoom(e){e>0&&(this.#h.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#t.dispose(),window.removeEventListener("keydown",this.#f),window.removeEventListener("keyup",this.#g),this.#r.clear()}#m(e){let t=sa*e*(this.#r.has("shift")?4:1),r=this.#e.position,s=!1,n=(a,l)=>{r.addScaled(a,l),s=!0},o=a=>{this.#i.rotate(F.Z,a),s=!0};return this.#r.has("w")&&n(this.#s,t),this.#r.has("s")&&n(this.#s,-t),this.#r.has("d")&&n(this.#n,t),this.#r.has("a")&&n(this.#n,-t),this.#r.has("r")&&n(this.#l,t),this.#r.has("f")&&n(this.#l,-t),this.#r.has("q")&&o(Ps*e),this.#r.has("e")&&o(-Ps*e),s}#p(e){if(!ai(this.#t,this.#c,this.#h,this.#u,e))return!1;let t=this.#u;return t.rotX&&this.#i.rotate(F.Y,-t.rotX),t.rotY&&this.#i.rotate(F.X,-t.rotY),t.zoom&&this.#e.position.addScaled(this.#s,t.zoom*na),!0}#d(){this.#i.normalize(),this.#n.copy(F.X).transformQuat(this.#i),this.#l.copy(F.Y).transformQuat(this.#i),this.#o.copy(F.Z).transformQuat(this.#i),this.#s.copy(this.#o).scale(-1),this.#e.setAxes(this.#n,this.#l,this.#o)}#f=e=>{let t=e.key.toLowerCase();!la.has(t)||this.#b()||(this.#r.add(t),e.preventDefault())};#g=e=>{this.#r.delete(e.key.toLowerCase())};#b(){let e=document.activeElement;return e?.tagName==="INPUT"||e?.tagName==="TEXTAREA"||e?.isContentEditable}},oi=class{#e;#t;#r=L.create();#i=L.create();#s=L.create().copy(F.Y);#o=L.create();#n=L.create();#l=L.create();#a=L.create();#c=L.create();#h=L.create();#u=K.create();#m=ne();#p=ne();#d=ne();constructor(e,t){this.#e=e,this.#t=new Pt(t)}get type(){return"trackball"}update(e){if(!ai(this.#t,this.#m,this.#p,this.#d,e))return;let t=this.#d;(t.rotX||t.rotY)&&this.#g(t.rotX,t.rotY),t.zoom&&this.#b(t.zoom),(t.panX||t.panY)&&this.#y(t.panX,t.panY),this.#x()}frame(e,t){this.#v(e,t)}reset(e,t){this.#v(e,t)}zoom(e){e>0&&(this.#p.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#t.dispose()}#f(){this.#o.copy(this.#i).normalize(F.Z),this.#n.cross(this.#s,this.#o).normalize(F.X),this.#l.cross(this.#o,this.#n)}#g(e,t){this.#f(),this.#a.copy(this.#n).scale(e).addScaled(this.#l,-t);let r=this.#a.len;r<1e-6||(this.#c.cross(this.#a,this.#i).normalize(F.Y),this.#u.setAxisAngle(this.#c,r),this.#i.transformQuat(this.#u),this.#s.transformQuat(this.#u).normalize())}#b(e){this.#i.setLength(M.clamp(this.#i.len*Math.exp(-e),ir,sr))}#y(e,t){this.#f();let r=M.perspectiveScale(this.#i.len,this.#e.fov,this.#t.height)*Ls;this.#r.addScaled(this.#n,-e*r).addScaled(this.#l,t*r)}#x(){this.#e.up.copy(this.#s),this.#e.position.copy(this.#r).add(this.#i),this.#e.lookAt(this.#r)}#v(e,t){this.#r.from(e),this.#i.sub(this.#h.from(t),this.#r),this.#i.setLength(M.clamp(this.#i.len,ir,sr)),this.#s.copy(F.Y),this.#f(),this.#s.copy(this.#l),this.#p=ne(),this.#x()}};function li(i,e,t){switch(i){case"fly":return new ni(e,t);case"trackball":return new oi(e,t);default:return new si(e,t)}}var ci=class{position=L.create();target=L.create();up=L.create().copy(F.Y);matrixWorld=V.create();projectionMatrix=V.create();fov;aspect;near;far;constructor(e=60,t=1,r=.05,s=1e4){this.fov=e,this.aspect=t,this.near=r,this.far=s,this.updateProjectionMatrix(),this.updateMatrixWorld()}lookAt(e){return this.target.from(e),this.updateMatrixWorld()}updateProjectionMatrix(){this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far)}updateMatrixWorld(){return this.matrixWorld.cameraWorld(this.position,this.target,this.up),this.matrixWorld}setAxes(e,t,r){return this.up.copy(t),this.target.copy(this.position).addScaled(r,-1),this.matrixWorld.cameraWorldAxes(this.position,e,t,r)}},Cs=1.5,Es=1,ua=[0,.4,0],pa=-.25,nr=class{#e=V.create();#t=L.create();#r=L.create();#i;#s;#o;#n=!1;#l=!1;#a=null;#c=null;constructor(e,t="orbit"){this.#o=e,this.#i=new ci,this.#s=li(t,this.#i,e),this.#h()}get canPresent(){return this.#n}get controls(){return this.#s}get controlsType(){return this.#s.type}setControls(e){e!==this.#s.type&&(this.#s.dispose(),this.#s=li(e,this.#i,this.#o),this.reset(),this.#s.applyConstraints(this.#l))}setSceneTransform(e){e?this.#e.fromTransform(e):this.#e.identity(),this.#l=!!e,this.#s.applyConstraints(this.#l),this.#n=!1}setAudioPosition(e){e?this.#t.fromXYZ(e):this.#t.set(0,0,0)}setBBox(e){if(!e)return;this.#e.pointTo(this.#r,Vt.center(this.#r,e)).addXYZ(0,pa);let t=this.#r.toArray(),r=[0,Cs,Es];this.#a=t,this.#c=r,this.#s.frame(t,r),this.#n=!0}update(e){this.#s.update(e)}apply(e,t,r){e.setModelMatrix(this.#e),t>0&&r>0&&(this.#i.aspect=t/r,this.#i.updateProjectionMatrix()),e.setCamera(this.#i.matrixWorld,this.#i.projectionMatrix),this.#n&&(e.setAudioSourceMatrix(this.#e,this.#t),e.setAudioListenerMatrix(this.#i.matrixWorld))}zoom(e){this.#s.zoom(e)}reset(){this.#a&&this.#c?(this.#s.frame(this.#a,this.#c),this.#n=!0):this.#h()}dispose(){this.#s.dispose()}#h(){this.#s.reset(ua,{x:0,y:Cs,z:Es}),this.#n=!1}};var or=class{#e;#t;#r;#i;#s;#o;#n;#l;#a=null;#c=!1;#h=!1;#u=!1;#m=null;#p=0;onFrame=null;onBeforeRender=null;onBeforeEyeRender=null;onEyeRender=null;onASWRender=null;onRefReset=null;onSessionEnd=null;externalLayers=[];constructor(e,t){this.#e=e,this.#t=t}get session(){return this.#r}get active(){return!!this.#r}get aswAvailable(){return!!this.onASWRender}get aswActive(){return this.#c&&!!this.#r}get layeredActive(){return this.#h&&!!this.#r}get isAR(){return this.#u&&!!this.#r}get defaultDt(){return 1/(this.#c?36:72)}get binding(){return this.#s}get refSpace(){return this.#i}set soundPosition(e){this.#m=e?[e.x,e.y,e.z]:null}async enter(e=!1){if(!navigator.xr||this.#r)return{isQuest:!1,isPico:!1,isAVP:!1};let t=this.#t,r=this.#e;this.#u=e,this.#a=t.getExtension("OCULUS_multiview")||t.getExtension("OVR_multiview2")||null;let s=navigator.userAgent,n=/PicoBrowser/i.test(s),o=/OculusBrowser/i.test(s)&&!n,a=/Version\//.test(s)&&/Safari\//.test(s)&&!o&&!n;if(this.#r=await navigator.xr.requestSession(e?"immersive-ar":"immersive-vr",{optionalFeatures:["local-floor",e&&"local",o&&"layers",o&&"space-warp",(o||n)&&"hand-tracking"].filter(Boolean)}),!this.#r)throw new Error(`Failed to start ${e?"AR":"VR"} session`);let l=new Set(this.#r.enabledFeatures??[]);for(let h of["local-floor","local","viewer"])try{this.#i=await this.#r.requestReferenceSpace(h);break}catch{}this.#i?.addEventListener("reset",()=>this.onRefReset?.()),this.#h=this.#c=!1;let c=n?.75:1;if(l.has("layers"))try{t.getExtension("EXT_color_buffer_half_float"),this.#s=new XRWebGLBinding(this.#r,t),this.#o=this.#s.createProjectionLayer({textureType:"texture-array",depthFormat:t.DEPTH_COMPONENT24,scaleFactor:c,...e&&{clearOnAccess:!1}}),this.#h=!0,this.#c=l.has("space-warp"),!this.#c&&this.#o.fixedFoveation!==void 0&&(this.#o.fixedFoveation=1),await this.#r.updateRenderState({layers:[this.#o]}),this.#n=t.createFramebuffer(),this.#c&&(this.#l=t.createFramebuffer())}catch{this.#h=this.#c=!1,this.#s=this.#o=null}if(!this.#h){let h=new XRWebGLLayer(this.#r,t,{framebufferScaleFactor:c,...e&&{alpha:!0}});h.fixedFoveation!==void 0&&(h.fixedFoveation=1),await this.#r.updateRenderState({baseLayer:h})}return r.resetXR(),this.#r.addEventListener("end",()=>this.#b()),this.#p=0,this.#r.requestAnimationFrame(this.#d),{isQuest:o,isPico:n,isAVP:a}}#d=(e,t)=>{let r=this.#r;if(!r)return;r.requestAnimationFrame(this.#d);let s=M.deltaSeconds(e,this.#p,this.defaultDt,4*this.defaultDt);this.#p=e,this.onFrame?.(s,t)};exit(){this.#r?.end()}renderFrame(e,t,r=1){let s=this.#e,n=this.#t,o=t.getViewerPose(this.#i);if(!o||o.views.length<1)return;let a=this.#y(o);if(!this.#u&&a.length<2){this.#f(s,o,r);return}(a.length>=2||this.#u)&&(this.onBeforeRender?.(e,t,this.#i,o,t.session.inputSources,s),this.#g());let l=a[1]??null;s.setCamera(a[0].transform.matrix,a[0].projectionMatrix,l?.transform.matrix,l?.projectionMatrix),this.#c?this.#S(n,s,a):this.#h?this.#M(n,s,a):this.#w(n,s,a,t),this.#f(s,o,r)}#f(e,t,r){let s=this.#m;if(!s){let o=e.getBBox();o&&(s=[(o.minX+o.maxX)*.5,(o.minY+o.maxY)*.5,(o.minZ+o.maxZ)*.5])}let n=e.getModelMatrix();s&&n&&e.setAudioSourceMatrix(n,s,r),e.setAudioListenerMatrix(t.transform.matrix)}#g(){!this.#r||!this.#h||this.#r.updateRenderState({layers:[this.#o,...this.externalLayers]})}#b=()=>{if(!this.#r)return;let e=this.#t;this.#n&&(e.deleteFramebuffer(this.#n),this.#n=null),this.#l&&(e.deleteFramebuffer(this.#l),this.#l=null),this.#r=this.#i=this.#o=this.#s=null,this.#c=this.#h=this.#u=!1,this.#p=0,this.externalLayers=[],this.onSessionEnd?.()};#y(e){if(e.views.length<2)return[e.views[0]];let t=e.views.find(s=>s.eye==="left")||e.views[0],r=e.views.find(s=>s.eye==="right")||e.views[1];return[t,r]}#x(e,t){e.bindFramebuffer(e.FRAMEBUFFER,t),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.clearColor(0,0,0,this.#u?0:1)}#v(e,t,r,s,n,o,a,l,c,h=e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT){e.viewport(n,o,a,l),e.clear(h),this.onBeforeEyeRender?.(e,r,s,n,o,a,l),t.render(t.drawMode,n,o,a,l,c),this.onEyeRender?.(e,r,s,n,o,a,l)}#w(e,t,r,s){let n=s.session.renderState.baseLayer,o=r.map(a=>n.getViewport(a));t.preprocess(o[0].width,o[0].height),e.bindFramebuffer(e.FRAMEBUFFER,n.framebuffer),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.clearColor(0,0,0,this.#u?0:1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.disable(e.DEPTH_TEST),e.depthMask(!1);for(let a=0;a<r.length;a++){let l=o[a];this.onBeforeEyeRender?.(e,n.framebuffer,r[a],l.x,l.y,l.width,l.height),t.render(t.drawMode,l.x,l.y,l.width,l.height,a),this.onEyeRender?.(e,n.framebuffer,r[a],l.x,l.y,l.width,l.height)}}#M(e,t,r){let s=r.map(a=>this.#s.getViewSubImage(this.#o,a)),n=s[0].colorTextureWidth,o=s[0].colorTextureHeight;t.preprocess(n,o),this.#x(e,this.#n);for(let a=0;a<r.length;a++){let l=s[a],c=l.imageIndex??a;e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.colorTexture,0,c),l.depthStencilTexture&&e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,c),this.#v(e,t,this.#n,r[a],0,0,n,o,a)}e.bindFramebuffer(e.FRAMEBUFFER,null)}#S(e,t,r){let s=r.map(h=>this.#s.getViewSubImage(this.#o,h)),n=s[0].colorTextureWidth,o=s[0].colorTextureHeight,a=s.map((h,u)=>h.imageIndex??u);this.#o&&(this.#o.deltaPose=null),t.preprocess(n,o),this.#x(e,this.#n);for(let h=0;h<r.length;h++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,s[h].colorTexture,0,a[h]),this.#v(e,t,this.#n,r[h],0,0,n,o,h,e.COLOR_BUFFER_BIT);let l=s[0];if(l.motionVectorTexture&&l.depthStencilTexture){let h=l.motionVectorTextureWidth,u=l.motionVectorTextureHeight,p=t.canMotion();if(e.bindFramebuffer(e.FRAMEBUFFER,this.#l),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),e.clearColor(0,0,0,0),e.clearDepth(1),this.#a&&a.length>=2&&a[1]===a[0]+1&&t.hasMultiview())this.#a.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.motionVectorTexture,0,a[0],2),this.#a.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,a[0],2),e.viewport(0,0,h,u),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),p&&t.renderMotionMV(0,0,h,u);else for(let g=0;g<r.length;g++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,s[g].motionVectorTexture,0,a[g]),e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,s[g].depthStencilTexture,0,a[g]),e.viewport(0,0,h,u),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),p&&t.render(3,0,0,h,u,g);let f=(g,d,m)=>({view:g,colorTex:d.colorTexture,colorIdx:m,mvTex:d.motionVectorTexture,mvIdx:m,depthTex:l.depthStencilTexture,w:n,h:o,mvW:h,mvH:u});this.onASWRender?.(e,r.map((g,d)=>f(g,s[d],a[d])))}else this.onASWRender?.(e,r.map((h,u)=>({view:h,colorTex:s[u].colorTexture,colorIdx:a[u],w:n,h:o})));e.bindFramebuffer(e.FRAMEBUFFER,null)}};var As=V.create().fromScaling(F.FLIP_Z),ar=V.create().copy(As).multiply(V.create().fromTranslation([0,1,-1])),da=.04,fa=.5,ma=1,ga=Math.PI/6,ue=L.create(),Lt=L.create(),Rs=L.create(),ya=K.create(),lr=class{#e=L.create();#t=K.create();#r=1;#i=L.create();#s=V.clone(ar);#o=ar;#n=V.create();#l=V.create();#a="none";#c=L.create();#h={mid:L.create(),dist:0,axX:0,axZ:0};#u="undecided";#m=0;#p=0;#d=!1;#f=!1;#g=!1;get position(){return this.#e}get scale(){return this.#r}get sceneTransform(){return this.#s}get scaleLocked(){return this.#d}set scaleLocked(e){this.#d=!!e}setCenter(e,t,r){this.#i.set(e,t,r)}setSceneTransform(e){this.#o=e?As:ar,e?this.#s.fromTransform(e).preMultiply(this.#o):this.#s.copy(ar)}resetToInitial(){this.#e.set(0,0,0),this.#r=1,this.#t.identity()}reset(){this.#a="none"}isHeld(e){return this.#a==="dual"||this.#a===e}update(e,t,r,s,n=!0,o=null){for(let p of r)this.#v(p,s,o);let a=e.gripTransform?.position,l=t.gripTransform?.position,c=n&&e.active&&e.gripping&&!!a,h=n&&t.active&&t.gripping&&!!l,u=c&&e.grabRestart||h&&t.grabRestart;c&&h?this.#x(a,l,u):c?this.#y("left",a,u):h?this.#y("right",l,u):this.reset()}buildModelMatrix(){return this.#b(this.#n,this.#s)}buildRoomMatrix(){return this.#b(this.#l,this.#o)}#b(e,t){return ue.copy(this.#i).transformMat4(this.#s),Lt.set(this.#r,this.#r,-this.#r),e.fromPivot(this.#e,this.#t,Lt,ue,t)}#y(e,t,r){if(r||this.#a!==e){this.#a=e,this.#c.fromXYZ(t);return}if(ue.fromXYZ(t).sub(this.#c),ue.sqrLen>.01){this.#c.fromXYZ(t);return}this.#e.add(ue),this.#c.fromXYZ(t)}#x(e,t,r){ue.midXYZ(e,t);let s=Lt.fromXYZ(e).distanceXYZ(t),n=s||1,o=(t.x-e.x)/n,a=(t.z-e.z)/n,l=this.#h;if(r||this.#a!=="dual"){this.#a="dual",l.mid.copy(ue),l.dist=s,l.axX=o,l.axZ=a,this.#u="undecided",this.#m=0,this.#p=0;return}let c=0;l.dist>.03&&s>.03&&(c=M.absLogRatio(s,l.dist));let h=l.axX,u=l.axZ;l.axX=o,l.axZ=a;let p=M.unlerp01(Math.min(Math.hypot(h,u),Math.hypot(o,a)),.08,.33),f=0;if(p>0&&(f=M.wrapPi(Math.atan2(a,o)-Math.atan2(u,h))*p),this.#u==="undecided"){this.#d||(this.#m+=c),this.#p+=Math.abs(f);let g=da;(this.#m>=g||this.#p>=g)&&(this.#u=this.#m>=this.#p?"scale":"rotate")}if(this.#u==="scale"&&!this.#d&&l.dist>.03&&s>.03){let g=this.#r;this.#r=M.clamp(g*(s/l.dist),.01,100);let d=this.#r-g;Lt.copy(this.#i).transformMat4(this.#s),this.#e.add(Rs.copy(Lt).multiplyXYZ(-d,-d,d))}this.#u==="rotate"&&M.outside(f,5e-4)&&this.#t.rotatePre(F.Y,f),this.#e.add(Rs.sub(ue,l.mid)),l.mid.copy(ue),l.dist=s}#v(e,t,r){let s=e.gamepad;if(!s?.axes||s.axes.length<2)return;let n=s.axes.length>=4?2:0;this.#w(s.axes[n],-s.axes[n+1],t,r);let o=s.buttons?.[3]?.pressed??!1;e.handedness==="left"?(o&&!this.#f&&this.resetToInitial(),this.#f=o):(o&&!this.#g&&this.resetToInitial(),this.#g=o)}#w(e,t,r,s){if(!(Math.hypot(e,t)<=fa)){if(Math.abs(t)<=Math.abs(e)){this.#t.rotatePre(F.Y,-Math.sign(e)*ga*r);return}s&&(ue.copy(F.FORWARD).transformQuat(ya.fromXYZW(s.orientation)).multiplyXYZ(1,0,1).normalize(F.FORWARD),this.#e.addScaled(ue,-t*ma*r))}}};var cr=class{on=!1;#e=-1;update(e){this.#e<0?this.#e=e:this.#e=e>this.#e?e:(this.#e+e)*.5,this.on=this.#e<(this.on?.018:.015)}reset(){this.on=!1,this.#e=-1}},hr=class i{static#e=30;static#t=300;static#r=.02;#i=L.create();#s=!1;#o=0;#n=null;tapped=!1;update(e,t){if(this.tapped=!1,e&&!this.#s)this.#o=performance.now(),this.#n=t?{x:t.x,y:t.y,z:t.z}:null;else if(!e&&this.#s){let r=performance.now()-this.#o,s=this.#n,n=s&&t?this.#i.fromXYZ(t).distanceXYZ(s):0;r>=i.#e&&r<=i.#t&&n<i.#r&&(this.tapped=!0)}this.#s=e}reset(){this.#s=!1,this.tapped=!1,this.#n=null}},ur=class i{static#e=30;static#t=300;#r=!1;#i=0;tapped=!1;update(e){if(this.tapped=!1,e&&!this.#r)this.#i=performance.now(),this.#r=!0;else if(!e&&this.#r){let t=performance.now()-this.#i;t>=i.#e&&t<=i.#t&&(this.tapped=!0),this.#r=!1}}reset(){this.#r=!1,this.tapped=!1}},pr=class{#e=[!1,!1];update(e){if(!e||e.length<=6)return 0;let t=e[5]?.pressed??!1,r=e[6]?.pressed??!1,s=t&&!this.#e[0]?-1:r&&!this.#e[1]?1:0;return this.#e[0]=t,this.#e[1]=r,s}reset(){this.#e[0]=this.#e[1]=!1}},dr=class{#e;left={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};right={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};stickSrcs=[];#t=null;#r=null;#i;#s;#o;#n;#l=new ur;#a=new ur;constructor({directGrab:e=!1}={}){this.#n=e,this.#e=K.create().setAxisAngle(F.X,-.8),this.#s=L.create(),this.#o=K.create(),this.#i=new Map([[this.left,{side:"left",pinch:new cr,tap:new hr,swipe:new pr,smooth:L.create(),smoothActive:!1,rayPos:L.create(),rayOri:K.create(),rayActive:!1}],[this.right,{side:"right",pinch:new cr,tap:new hr,swipe:new pr,smooth:L.create(),smoothActive:!1,rayPos:L.create(),rayOri:K.create(),rayActive:!1}]])}#c(e){e.active=e.gripping=e.isHandProfile=e.grabRestart=e.triggerPressed=e.menuPressed=e.isTransientPointer=!1,e.microSwipe=0,e.rayTransform=e.gripTransform=e.indexTip=e.thumbTip=null}read(e,t,r,s){this.#c(this.left),this.#c(this.right),this.stickSrcs.length=0;let n=null,o=null;for(let a of r||[]){if(a.targetRayMode==="transient-pointer"){let c=e.getPose(a.targetRaySpace,t);if(!c)continue;let u=((a.gripSpace?e.getPose(a.gripSpace,t):null)??c).transform,p=this.#h(a,u.position,n,o);this.#u(p,c.transform,u,a,s),p===this.left?n=a:o=a;continue}a.gripSpace&&!a.hand&&a.gamepad?.axes?.length>=2&&!a.profiles?.some(c=>c.includes("hand"))&&this.stickSrcs.push(a);let l=a.handedness==="left"?this.left:a.handedness==="right"?this.right:null;!l||l.active||(a.hand?this.#m(l,a,e,t,s):a.gripSpace&&this.#p(l,a,e,t,s))}this.#t=n,this.#r=o,(n||o)&&(this.stickSrcs.length=0,n||(this.left.gripping=!1),o||(this.right.gripping=!1)),s.uiActive?(this.#l.reset(),this.#a.reset()):(this.#l.update(!!n),this.#a.update(!!o)),this.#l.tapped&&(this.left.menuPressed=!0),this.#a.tapped&&(this.right.menuPressed=!0);for(let[a,l]of this.#i)a.indexTip||(l.pinch.reset(),l.tap.reset(),l.swipe.reset(),l.smoothActive=!1,l.rayActive=!1)}#h(e,t,r,s){if(e.handedness==="left")return this.left;if(e.handedness==="right")return this.right;if(r&&!s)return this.right;if(s&&!r)return this.left;let n=this.left.gripTransform?.position,o=this.right.gripTransform?.position,a=n?this.#s.fromXYZ(t).distanceXYZ(n):1/0,l=o?this.#s.fromXYZ(t).distanceXYZ(o):1/0;return a<=l?this.left:this.right}#u(e,t,r,s,{isHeld:n,hitTest:o,uiActive:a}){e.rayTransform=t,e.gripTransform=r,e.active=e.triggerPressed=e.isTransientPointer=!0;let{side:l}=this.#i.get(e),c=l==="left"?this.#t:this.#r,h=c!=null&&c!==s,u=c===s;!h&&n(l)?e.gripping=!0:a||(this.#n&&u||!this.#n&&o&&o(t)||n(l==="left"?"right":"left"))&&(e.gripping=!0,h&&(e.grabRestart=!0))}#m(e,t,r,s,{isHeld:n,uiActive:o,viewerPose:a}){let l=t.hand.get("wrist");if(!l)return;let c=r.getJointPose?.(l,s);if(!c)return;e.gripTransform=c.transform;let h=this.#d(t.hand,"index-finger-tip",r,s),u=this.#d(t.hand,"thumb-tip",r,s),p=this.#d(t.hand,"index-finger-phalanx-proximal",r,s);h&&(e.indexTip=h.transform.position),u&&(e.thumbTip=u.transform.position);let f=this.#i.get(e);if(p){this.#o.fromXYZW(c.transform.orientation).mul(this.#e);let d=f.rayPos,m=f.rayOri;f.rayActive?(d.lerp(this.#s.fromXYZ(p.transform.position),.5),m.slerp(this.#o,.5)):(d.fromXYZ(p.transform.position),m.copy(this.#o),f.rayActive=!0),e.rayTransform={position:d.toXYZ(),orientation:m.toXYZW()}}else e.rayTransform=h?.transform??null,f.rayActive=!1;if(h&&u){let d=h.transform.position,m=u.transform.position;f.pinch.update(this.#s.fromXYZ(d).distanceXYZ(m)),e.gripping=e.triggerPressed=f.pinch.on}else{f.pinch.reset();let d=t.gamepad?.buttons?.[0];e.gripping=d?d.pressed||d.value>.5:!1,e.triggerPressed=e.gripping}o?(f.tap.reset(),n(f.side)||(e.gripping=!1)):(f.tap.update(f.pinch.on,c.transform.position),f.tap.tapped&&(e.menuPressed=!0)),e.gripping&&!n(f.side)&&!this.#g(c.transform.position,a)&&(e.gripping=!1),e.active=!0,e.microSwipe=f.swipe.update(t.gamepad?.buttons);let g=f.smooth;f.smoothActive||(g.fromXYZ(c.transform.position),f.smoothActive=!0),g.lerp(this.#s.fromXYZ(c.transform.position),.4),e.gripTransform={position:g.toXYZ(),orientation:c.transform.orientation}}#p(e,t,r,s,{isHeld:n,uiActive:o,viewerPose:a}){let l=r.getPose(t.gripSpace,s);l&&(e.gripTransform=l.transform);let c=r.getPose(t.targetRaySpace,s);if(c&&(e.rayTransform=c.transform),!e.gripTransform&&!e.rayTransform)return;if(e.isHandProfile=t.profiles?.some(p=>p.includes("hand"))??!1,t.targetRayMode==="tracked-pointer"&&t.gamepad?.buttons?.[0]){let p=t.gamepad.buttons[0],f=p.pressed||p.value>.5;e.gripping=e.isHandProfile?f:t.gamepad?.buttons?.[1]?.pressed??!1}else e.gripping=t.gamepad?.buttons?.[1]?.pressed??!1;e.triggerPressed=t.gamepad?.buttons?.[0]?.pressed??!1;let h=t.gamepad?.buttons;e.menuPressed=!!(h?.[4]?.pressed||h?.[5]?.pressed||h?.[12]?.pressed);let{side:u}=this.#i.get(e);e.isHandProfile&&e.gripping&&!n(u)&&(o||!this.#g(e.gripTransform?.position,a))&&(e.gripping=!1),e.gripping&&!e.gripTransform&&(e.gripping=!1),e.active=!0,e.isHandProfile&&e.rayTransform&&(e.rayTransform=this.#f(e.rayTransform.orientation,e.rayTransform.position))}#d(e,t,r,s){let n=e.get(t);return n?r.getJointPose?.(n,s)??null:null}#f(e,t){return this.#o.fromXYZW(e).mul(this.#e),{position:t,orientation:this.#o.toXYZW()}}#g(e,t){if(!t||!e)return!0;let r=t.position;this.#s.subXYZ(e,r).transformQuat(this.#o.fromXYZW(t.orientation).invert());let s=this.#s.xzLen;return s<.05||this.#s.y>-1.19*s}};var Ke=class{#e;#t;#r;#i;#s=!0;#o=!1;#n=!1;#l=!1;#a=!1;constructor(e,t=null,{directGrab:r=!1}={}){this.#e=e,this.#t=t,this.#r=new dr({directGrab:r}),this.#i=new lr}setOverlay(e){this.#t=e,this.#s=!0}get#c(){return this.#t?this.#t.hasBBox:this.#o}reset(){this.#i.reset(),this.#l=this.#a=!1}invalidateBBox(){this.#s=!0}setInitialTransform(e){this.#i.setSceneTransform(e),this.#s=!0,this.#h()}get scene(){return this.#t?.scene??null}get scale(){return this.#i.scale}get roomMatrix(){return this.#i.buildRoomMatrix()}get leftHand(){return this.#r.left}get rightHand(){return this.#r.right}get locked(){return this.#n}set locked(e){this.#n=!!e,this.#n&&this.#i.reset()}get scaleLocked(){return this.#i.scaleLocked}set scaleLocked(e){this.#i.scaleLocked=e}resetToInitial(){this.#i.resetToInitial(),this.#i.reset()}update(e,t,r,s,n,o=!1){let a=t.getViewerPose(r);this.#r.read(t,r,s,{isHeld:h=>this.#i.isHeld(h),hitTest:h=>this.#t?.hitTest(h)??!1,uiActive:n,viewerPose:a?.transform??null}),(this.#s||!this.#c)&&this.#u();let l=this.#r.left,c=this.#r.right;if(l.held=c.held=!1,!this.#n){this.#i.update(l,c,this.#r.stickSrcs,e,this.#c&&!o,a?.transform??null);let h=this.#i.isHeld("left"),u=this.#i.isHeld("right");l.held=h&&this.#l,c.held=u&&this.#a,this.#l=h,this.#a=u}this.#h()}#h(){this.#c&&this.#t?.applyTransform(this.#i.position,this.#i.scale),this.#e.setModelMatrix?.(this.#i.buildModelMatrix())}#u(){let e=this.#e.getBBox?.();if(!e)return;let t,r,s;this.#t?{cx:t,cy:r,cz:s}=this.#t.rebuildBBox(e,this.#i.sceneTransform):(t=(e.minX+e.maxX)/2,r=(e.minY+e.maxY)/2,s=(e.minZ+e.maxZ)/2,this.#o=!0),this.#i.setCenter(t,r,s),this.#s=!1}};function ks(){let i=document.createElement("canvas");return i.style.display="block",i.style.width="100%",i.style.height="100%",i.style.touchAction="none",i}var Je=class i{#e=null;#t;#r=null;#i=null;#s=null;#o=null;#n=0;#l=0;#a=null;#c=null;#h=new Mt;#u=!1;#m=!1;#p=0;#d="pw";#f="pw";#g=null;#b=!1;#y={};#x=null;#v=null;#w=null;#M=!1;#S=[];#_=-1;onProgress=null;onReady=null;onError=null;onFrame=null;onBeforeFrame=null;onModeChange=null;onSceneChange=null;onSceneEnd=null;static async create(e,{container:t,overlay:r=null,boundaryRenderer:s=null,mode:n="pw"}={}){if(!t)throw new Error("container element required");if(!navigator.gpu)throw new Error("WebGPU not available");let o=new i;o.#a=r,o.#c=s,r&&(r.onSceneChange=(l,c)=>o.loadScene(c)),navigator.xr&&(o.#y.vr=await navigator.xr.isSessionSupported("immersive-vr").catch(()=>!1),o.#y.ar=await navigator.xr.isSessionSupported("immersive-ar").catch(()=>!1));let a=n==="hw"?"hw":n==="vr"||n==="ar"?n:"pw";return o.#t=ks(),t.appendChild(o.#t),o.#e=await Qe.create(e,{canvas:o.#t,backend:a==="hw"?"hybrid":"pure"}),o.#U(),await o.#C(a),o.#d=a,o}get player(){return this.#e}get camera(){return this.#i}get canvas(){return this.#t}get gl(){return this.#e?.gl??null}get audioContext(){return this.#e?.audioContext??null}get device(){return this.#e?.device??null}get mode(){return this.#d}get fallbackMode(){return this.#f}get xr(){return this.#s}get manipulator(){return this.#o}get drawMode(){return this.#e.drawMode}set drawMode(e){this.#e.drawMode=e}supports(e){return e==="pw"||e==="hw"||!!this.#y[e]}set sources(e){this.#S=e??[],this.#_=Math.min(this.#_,Math.max(0,this.#S.length-1)),this.#a&&(this.#a.sources=this.#S)}get sources(){return this.#S}get sceneIndex(){return this.#_}loadScene(e){let t=this.#S;if(e<0||e>=t.length)return;let r=t[e];this.#_=e,this.#v=null,this.setInitialTransform(r.initialTransform??null),this.setBackground(r.background??"#000"),r.controls&&this.setControls(r.controls),this.setBounds(r.bounds??null),this.#o&&(this.#o.locked=r.locked??this.#o.locked,this.#o.scaleLocked=r.scaleLocked??this.#o.scaleLocked);let s=r.staticTransform??null,n=r.staticUrl??null;this.#X(async o=>{if(n){let a=new File([await(await fetch(n)).arrayBuffer()],"static.sog");if(!o()||(await this.#e.open({file:a,type:"static"}),!o()))return}await this.#e.open(r),o()&&s&&this.#T(s)}),this.setAudioPosition(r.audioPosition??null),this.#a&&(this.#a.sceneIndex=e),this.onSceneChange?.(r,e)}start(){this.#u=!0,this.#F()}stop(){this.#u=!1,this.#E()}open(e){return this.setInitialTransform(e.initialTransform??null),this.setBounds(e.bounds??null),this.setAudioPosition(e.audioPosition??null),this.#X(()=>this.#e.open(e))}close(){++this.#p,this.#I(),this.#e.close(),this.#m=!1,this.#u=!1;let e=this.#d,t=this.#f,r=t!=="pw"?"hybrid":"pure";r!==this.#e.backend&&this.#V(r),this.#P(),this.#d=t,t!==e&&this.onModeChange?.(t,e)}async setMode(e){if(this.#g=e,!this.#b){this.#b=!0;do e=this.#g,this.#g=null,e!==this.#d&&await this.#L(e);while(this.#g!=null);this.#b=!1}}async#L(e){let t=this.#d;await this.#B();try{await this.#O(e)}catch(r){if(e===this.#f)throw r;this.onError?.(r),await this.#O(this.#f)}this.#d!==t&&this.onModeChange?.(this.#d,t)}setAudio(e){this.#e.loadAudio(e)}setVolume(e){this.#e?.setVolume(e)}enableAudio(){this.#e?.enableAudio()}disableAudio(){this.#e?.disableAudio()}get audioEnabled(){return this.#e?.audioEnabled??!1}setAudioPanner(e){this.#e?.setAudioPanner(e)}setBackground(e){this.#t&&(this.#t.style.background=e||"#000")}setInitialTransform(e,t=null){this.#x=e??null,this.#i?.setSceneTransform(this.#x),this.#o&&(this.#o.setInitialTransform(this.#x),!this.#m&&this.#S[this.#_]?.resetPositionOnStart!==!1&&this.#o.resetToInitial()),t?.translation&&t.rotation&&t.scale&&this.#T(t)}#T(e){this.#e?.setStaticModelMatrix(V.create().fromTransform(e))}reset(){this.#i?.reset()}setControls(e){this.#i?.setControls(e)}setBounds(e){this.#h.setBounds(e)}setAudioPosition(e){this.#w=e??null,this.#i?.setAudioPosition(this.#w),this.#s&&(this.#s.soundPosition=this.#w)}dispose(){++this.#p,this.#I(),this.#r?.disconnect(),this.#e?.dispose()}async#C(e){if(e==="vr"||e==="ar"){if(!this.#y[e])throw new Error(`${e.toUpperCase()} not supported`);await this.#A(e==="ar")}else if(e==="pw"||e==="hw")this.#P();else throw new Error(`Unknown mode: ${e}`)}#P(){let e=new nr(this.#t);this.#i=e,this.#e.backend==="pure"&&(this.#e.drawMode=0),e.setSceneTransform(this.#x),e.setAudioPosition(this.#w),this.#v&&e.setBBox(this.#v)}async#A(e){let t=new or(this.#e,this.#e.gl);t.soundPosition=this.#w,t.onSessionEnd=()=>{this.#k(),this.#s===t&&(this.#s=null,this.#o=null,this.setMode(this.#f))};let r=null;try{let s=await t.enter(e),n=this.#S[this.#_];r=new Ke(this.#e,null,{directGrab:s.isAVP}),r.locked=n?.locked??!1,r.scaleLocked=n?.scaleLocked??!0,r.setInitialTransform(this.#x),this.#h.reset().queueIntro(),this.#c?.init(this.#e.gl);let o=this.#a;o&&(o.manipulator=r,await o.init(this.#e,t.session,t.binding,t.refSpace,this.#e.gl,e),t.onASWRender=(l,c)=>o.render(l,c),t.onRefReset=()=>o.onRefReset?.()),t.onBeforeEyeRender=(l,c,h,u,p,f,g)=>this.#c?.renderUnderlay(l,c,h,u,p,f,g),t.onEyeRender=(l,c,h,u,p,f,g)=>{this.#c?.renderEye(l,c,h,u,p,f,g),o?.renderEye(l,c,h,u,p,f,g)};let a=r;t.onBeforeRender=(l,c,h,u,p,f)=>{if(a.update(l,c,h,p,o?.uiActive??!1,o?.uiDragging??!1),this.#D(l,u,a),o){o.frame(l,c,h,u,p,f);let g=[];for(let d of o.quads??[])d.layer&&(d.visible||d.placing)&&g.push(d.layer);t.externalLayers=g}},t.onFrame=(l,c)=>{if(!this.#z(l))return;let h=a.scale;t.renderFrame(l,c,h!==1?1/h:1),this.#N()}}catch(s){throw this.#R(t),this.#k(),t.exit(),s}if(!t.session)throw this.#R(t),new Error("XR session ended during entry");this.#o=r,this.#s=t}#R(e){e.onFrame=null,e.onSessionEnd=null,e.onBeforeRender=null,e.onBeforeEyeRender=null,e.onEyeRender=null,e.onASWRender=null,e.onRefReset=null}#k(){this.#a?.dispose(),this.#c?.dispose()}#D(e,t,r){let s=this.#c;s&&(this.#m?this.#h.reset():this.#h.setRoomMatrix(r.roomMatrix).update(t.transform.position,e),s.sync(this.#h))}#I(){this.#E(),this.#i?.dispose(),this.#i=null;let e=this.#s;e&&(this.#s=null,this.#o=null,this.#R(e),this.#k(),e.exit())}async#B(){this.#E(),this.#i?.dispose(),this.#i=null;let e=this.#s;if(e){this.#s=null,this.#o=null,e.onFrame=null;try{await e.session?.end()}catch{}}}async#O(e){let t=e!=="pw"?"hybrid":"pure";t!==this.#e.backend&&this.#V(t),await this.#C(e),(this.#u||this.#m)&&this.#F(),this.#d=e,this.#s||(this.#f=e)}#F(){this.#i&&!this.#n&&(this.#n=requestAnimationFrame(this.#G))}#E(){this.#n&&cancelAnimationFrame(this.#n),this.#n=0,this.#l=0}#G=e=>{this.#n=requestAnimationFrame(this.#G);let t=M.deltaSeconds(e,this.#l,1/60);if(this.#l=e,!this.#z(t))return this.#E();let r=this.#i;if(!r)return this.#E();r.update(t);let{width:s,height:n}=this.#t;r.apply(this.#e,s,n),this.#H(r.canPresent),this.#e.present(s,n),this.#N()};#z(e){return this.#Y(),!this.#u&&!this.#m?!1:(this.onBeforeFrame?.(e),!0)}#N(){this.#m&&this.onProgress?.(Math.round(this.#e.progress*100)),this.#W(),this.onFrame?.()}async#X(e){let t=++this.#p,r=()=>t===this.#p;this.#E(),this.#e.close(),this.#v=null,this.#H(!1),this.#m=!0,this.#M=!1;try{await e(r)}catch(s){if(!r())return;this.#m=!1,this.onError?.(s)}r()&&this.#F()}#W(){if(this.#M||!this.#e.ended)return;this.#M=!0;let e=this.#S[this.#_];this.onSceneEnd?.(e,this.#_),(e?.autoSwitchToNext??!0)&&this.#_<this.#S.length-1&&this.loadScene(this.#_+1)}#Y(){if(!this.#v&&this.#e.isReady){let t=this.#e.getBBox();t&&(this.#v=t,this.#i?.setBBox(t))}let e=this.#i;if(e&&!e.canPresent&&this.#v&&e.setBBox(this.#v),!!this.#m){if(!this.#e.isReady){let t=this.#e.lastFetchStatus;t&&t!==200&&t!==206&&(this.#m=!1,this.onError?.(t));return}this.#m=!1,this.#e.play(),this.#o&&(this.#S[this.#_]?.resetPositionOnStart!==!1&&this.#o.resetToInitial(),this.#o.invalidateBBox()),this.onProgress?.(100),this.onReady?.()}}#H(e){this.#t.style.visibility=e?"visible":"hidden"}#V(e){this.#r?.disconnect();let t=ks();this.#t.replaceWith(t),this.#t=t,this.#e?.setBackend(e,{canvas:t}),this.#U()}#U(){this.#r?.disconnect();let e=this.#t;this.#r=new ResizeObserver(([t])=>{if(!t)return;let r=M.clamp(devicePixelRatio||1,1,2),s=Math.round(t.contentRect.width*r),n=Math.round(t.contentRect.height*r);s>0&&n>0&&(e.width!==s||e.height!==n)&&(e.width=s,e.height=n)}),this.#r.observe(e)}};var fr=class i{#e;#t;#r;#i=null;#s=null;#o=null;#n=null;#l=!1;enableMesh=!1;static attach(e,t,r){let s=new i(e,t,r);return s.#h(),s.#a(),s}constructor(e,t,r){this.#e=e,this.#t=t,this.#r=r}get player(){return this.#e}set camera(e){this.#r=e}get camera(){return this.#r}async setAudio(e){await this.#e.loadAudio(e)}setAudioPanner(e){this.#e.setAudioPanner(e)}set entity(e){if(this.#s?.node?.destroy(),this.#s=null,this.#i=e,!e)return;let t=new this.#t.root.constructor("_SplatShadow",this.#t);t.addComponent("render",{type:"box",castShadows:!0,receiveShadows:!1});let r=t.render.meshInstances[0];r.visible=!1,r.cull=!1,e.addChild(t),this.#s=r}get entity(){return this.#i}dispose(){this.#s?.node?.destroy(),this.#n&&(this.#t.renderer.setMeshInstanceMatrices=this.#n[0],this.#t.graphicsDevice.draw=this.#n[1]),this.#e.close(),this.#e.dispose()}#a(){let{renderer:e,graphicsDevice:t}=this.#t,r=e.setMeshInstanceMatrices,s=t.draw;this.#n=[r,s];let n=this;e.setMeshInstanceMatrices=function(...o){return o[0]===n.#s&&(n.#l=!0),r.apply(this,o)},t.draw=function(...o){let a=n.#l;if(n.#l=!1,a){n.enableMesh&&n.#e.isReady&&n.#c();return}return s.apply(this,o)}}#c(){let e=this.#t.graphicsDevice,t=e.gl,r=t.getParameter(t.VIEWPORT),s=e.scope.resolve("matrix_viewProjection").value;s&&(this.#o||(this.#o=new(this.#i.getWorldTransform()).constructor),this.#o.data.set(s),this.#o.mul(this.#i.getWorldTransform()),this.#e.renderMesh(this.#o.data,r[0],r[1],r[2],r[3]),this.#h())}renderFrame(){let e=this.#t.graphicsDevice,t=e.gl,r=e.width,s=e.height;!r||!s||(this.#i&&this.#e.setModelMatrix(this.#i.getWorldTransform().data),this.#r?.camera&&(this.#e.setCamera(this.#r.getWorldTransform().data,this.#r.camera.projectionMatrix.data),this.#e.setAudioListenerMatrix(this.#r.getWorldTransform().data)),this.#i&&this.#e.setAudioSourceMatrix(this.#i.getWorldTransform().data),this.#e.renderHybridViewport(r,s,{gl:t,enableMesh:this.enableMesh}),this.#h())}#h(){let e=this.#t.graphicsDevice;e.shader=null,e.boundVao=null,e.textureUnit=-1;let t=e.textureUnits;if(t)for(let r=0;r<t.length;r++)t[r][0]=t[r][1]=t[r][2]=null}};async function hi(i,e,t){let r=`${i.replace(/\/+$/,"")}/${e}`,s=await fetch(r,{headers:{"X-VIEW-TOKEN":t}});if(!s.ok)throw new Error(`Streaming metadata fetch failed: ${s.status} ${s.statusText}`);let n=await s.json();return{metadata:n.metadata??null,audioFileLink:n.audioFileLink??null}}async function et(i,e){let t=e.replace(/\/+$/,"");return Promise.all(i.map(async(r,s)=>{let{metadata:n,audioFileLink:o}=await hi(t,r.streamingId,r.token);return{id:r.streamingId,label:r.label??n?.name??r.streamingId,url:`${t}/${r.streamingId}/`,token:r.token,displayName:n?.name??void 0,audio:o&&n?.withAudio!==!1?o:void 0,initialTransform:n?.initialSpawn??null,bounds:n?.bounds??null,locked:!1,scaleLocked:!0,autoSwitchToNext:!0,resetPositionOnStart:r.settings?.resetPositionOnStart}}))}import{useEffect as va,useMemo as ui,useReducer as wa,useRef as pi}from"react";import{useEffect as xa,useMemo as ba,useState as Is}from"react";function Fs(i,e){let[t,r]=Is(!1),[s,n]=Is(!1);xa(()=>{let a=navigator.xr;if(!a||!i)return;let l=async()=>{let[c,h]=await Promise.all([a.isSessionSupported("immersive-vr").catch(()=>!1),a.isSessionSupported("immersive-ar").catch(()=>!1)]);r(c),n(h)};return l(),a.addEventListener("devicechange",l),()=>a.removeEventListener("devicechange",l)},[i]);let o=e==="vr"||e==="ar";return ba(()=>({vrSupported:t,arSupported:s,isActive:o,setMode:async a=>{await i?.setMode(a)}}),[i,t,s,o])}var Os=new WeakMap;function Gs(i){return Os.get(i)}var zs={app:null,overlay:null,isContentReady:!1,isLoading:!1,progress:0,mode:"pw",error:null,isPlaying:!1,isBuffering:!1,currentTime:0,duration:0,controlsType:"orbit",isMuted:!0,volume:1};function _a(i,e){switch(e.type){case"init":return{...i,app:e.app,overlay:e.overlay};case"frame":{let{isPlaying:t,isBuffering:r,currentTime:s,duration:n,isMuted:o}=e,a=n>0?n:i.duration;return i.isPlaying===t&&i.isBuffering===r&&i.currentTime===s&&i.duration===a&&i.isMuted===o?i:{...i,isPlaying:t,isBuffering:r,currentTime:s,duration:a,isMuted:o}}case"progress":return i.progress===e.value?i:{...i,progress:e.value};case"ready":return{...i,isContentReady:!0,isLoading:!1,progress:100};case"mode":return i.mode===e.mode?i:{...i,mode:e.mode};case"error":return{...i,error:e.error,isLoading:!1};case"open":return{...i,error:null,isLoading:!0,progress:0};case"close":return{...i,isLoading:!1,progress:0};case"reset":return{...zs,mode:i.mode};case"seek":return{...i,currentTime:e.time};case"camera_controls":return i.controlsType===e.controlsType?i:{...i,controlsType:e.controlsType};case"set_volume":return{...i,volume:e.volume}}}var Bs=new Set(["vr","ar"]);function mr(i){let{containerRef:e,mode:t="pw",overlay:r,boundaryRenderer:s,moduleUrl:n,moduleFactory:o,onReady:a,onProgress:l,onModeChange:c,onXRStart:h,onXREnd:u,eventLogger:p}=i,[f,g]=wa(_a,{...zs,mode:t}),d=pi(null),m=pi(f);m.current=f;let x=pi({onReady:a,onProgress:l,onModeChange:c,onXRStart:h,onXREnd:u,eventLogger:p});x.current={onReady:a,onProgress:l,onModeChange:c,onXRStart:h,onXREnd:u,eventLogger:p},va(()=>{let T=e.current;if(!T)return;let R=!1;return(async()=>{try{if(!o&&!n)throw new Error("[gr-react] Either moduleUrl or moduleFactory must be provided");let I=o?await o():await jt(n);if(R)return;let z=r??null;z&&(z.eventLogger={event:(E,ce)=>x.current.eventLogger?.event?.(E,{...ce,mode:m.current.mode}),error:(E,ce)=>x.current.eventLogger?.error?.(E,{...ce,mode:m.current.mode})});let X=await Je.create(I,{container:T,overlay:z,boundaryRenderer:s,mode:t});if(R){X.dispose();return}d.current=X,X.onProgress=E=>{g({type:"progress",value:E}),x.current.onProgress?.(E)},X.onReady=()=>{g({type:"ready"}),X.audioEnabled&&X.enableAudio(),x.current.onReady?.()},X.onFrame=()=>{let E=d.current?.player;E&&g({type:"frame",isPlaying:E.isPlaying??!1,isBuffering:E.isBuffering??!1,currentTime:E.currentTime??0,duration:E.duration??0,isMuted:!(E.audioEnabled??!1)})},X.onModeChange=(E,ce)=>{g({type:"mode",mode:E}),x.current.onModeChange?.(E,ce);let Ne=Bs.has(ce),qe=Bs.has(E);Ne&&!qe&&x.current.onXREnd?.(),!Ne&&qe&&x.current.onXRStart?.()},X.onError=E=>{let[ce,Ne]=typeof E=="number"?[new Error(`Streaming fetch failed: HTTP ${E}`),"load"]:[E,"xr"];g({type:"error",error:ce}),x.current.eventLogger?.error?.(ce,{phase:Ne,mode:m.current.mode})},X.start(),g({type:"init",app:X,overlay:z}),g({type:"camera_controls",controlsType:X.camera?.controlsType??"orbit"})}catch(I){let z=I instanceof Error?I:new Error(String(I));g({type:"error",error:z}),x.current.eventLogger?.error?.(z,{phase:"init",mode:m.current.mode})}})(),()=>{R=!0;let I=d.current;I&&(I.stop(),I.dispose()),d.current=null,g({type:"reset"})}},[e,r,s,t,o,n]);let{app:b}=f,y=Fs(b,f.mode),v=ui(()=>({play:()=>b?.player?.play(),pause:()=>b?.player?.pause(),togglePlay:()=>{let T=b?.player;if(!T)return;let R=!T.isPlaying;R?T.play():T.pause(),x.current.eventLogger?.event?.("play_pause",{playing:R,mode:m.current.mode})},seek:T=>{g({type:"seek",time:T}),b?.player?.seek(T),x.current.eventLogger?.event?.("seek",{position:T,mode:m.current.mode})},setSpeed:T=>b?.player?.setSpeed(T),setVolume:T=>{g({type:"set_volume",volume:T}),b?.setVolume(T)},toggleMute:()=>{let T=!b?.audioEnabled;T?b?.enableAudio():b?.disableAudio(),x.current.eventLogger?.event?.("mute_toggle",{muted:!T,mode:m.current.mode})},setAudio:T=>b?.setAudio(T)}),[b]),_=ui(()=>({controlsType:f.controlsType,zoom:T=>b?.camera?.zoom(T),reset:()=>{b?.camera?.reset(),x.current.eventLogger?.event?.("reset",{mode:m.current.mode})},setControls:T=>{if(!b)return;b.setControls(T);let R=b.camera?.controlsType??T;g({type:"camera_controls",controlsType:R}),x.current.eventLogger?.event?.("camera_controls",{controls:R,requestedControls:T,mode:m.current.mode})}}),[b,f.controlsType]),w=ui(()=>({open(T){b&&(g({type:"open"}),b.open(T))},close(){b?.close(),g({type:"close"})},dispose(){b&&(b.stop(),b.dispose())}}),[b]),P={app:b,device:b?.device??null,overlay:f.overlay,isInitialized:b!==null,isLoading:f.isLoading,isContentReady:f.isContentReady,progress:f.progress,mode:f.mode,error:f.error,isRebuffering:f.isContentReady&&(f.isLoading||f.isBuffering),...w,playback:{isPlaying:f.isPlaying,isBuffering:f.isBuffering,currentTime:f.currentTime,duration:f.duration,isMuted:f.isMuted,volume:f.volume,...v},camera:_,xr:y};return Os.set(P,{dispatch:g}),P}import{useCallback as Ct,useEffect as Sa,useRef as Ma,useState as Ns}from"react";function gr(i,e={}){let{app:t}=i,r=Gs(i)?.dispatch,s=Ma(e.onSceneEnd);s.current=e.onSceneEnd;let[n,o]=Ns([]),[a,l]=Ns(-1);Sa(()=>{if(t)return t.onSceneChange=(d,m)=>{r?.({type:"open"}),r?.({type:"camera_controls",controlsType:t.camera?.controlsType??"orbit"}),l(m)},t.onSceneEnd=(d,m)=>s.current?.(d,m),()=>{t.onSceneChange=null,t.onSceneEnd=null}},[t,r]);let c=Ct(d=>{t&&(t.sources=d),o(d),l(-1)},[t]),h=Ct(d=>{t?.loadScene(d)},[t]),u=Ct(()=>{t&&t.loadScene(t.sceneIndex+1)},[t]),p=Ct(()=>{t&&t.loadScene(t.sceneIndex-1)},[t]),f=Ct(async(d,m)=>{let x=await et(d,m);c(x),x.length>0&&h(0)},[c,h]),g=a>=0&&a<n.length?n[a]:null;return{sources:n,index:a,total:n.length,currentSource:g,hasNext:a>=0&&a<n.length-1,hasPrev:a>0,hasAudio:!!g?.audio,setSources:c,loadFromApi:f,next:u,prev:p,goTo:h}}import{jsx as B,jsxs as Ta}from"react/jsx-runtime";function Ds(){return B("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:B("path",{d:"M5.74023 18.7266V5.17188C5.74023 4.68359 5.86068 4.32552 6.10156 4.09766C6.34245 3.86328 6.62891 3.74609 6.96094 3.74609C7.25391 3.74609 7.55339 3.83073 7.85938 4L19.2363 10.6504C19.64 10.8848 19.9199 11.0964 20.0762 11.2852C20.2389 11.4674 20.3203 11.6888 20.3203 11.9492C20.3203 12.2031 20.2389 12.4245 20.0762 12.6133C19.9199 12.8021 19.64 13.0137 19.2363 13.248L7.85938 19.8984C7.55339 20.0677 7.25391 20.1523 6.96094 20.1523C6.62891 20.1523 6.34245 20.0352 6.10156 19.8008C5.86068 19.5664 5.74023 19.2083 5.74023 18.7266Z"})})}function Xs(){return B("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:B("path",{d:"M7.3418 20.0254C6.91211 20.0254 6.58659 19.9147 6.36523 19.6934C6.15039 19.472 6.04297 19.1465 6.04297 18.7168V5.17188C6.04297 4.74219 6.15039 4.41992 6.36523 4.20508C6.58659 3.98372 6.91211 3.87305 7.3418 3.87305H9.56836C9.99154 3.87305 10.3138 3.97721 10.5352 4.18555C10.7565 4.39388 10.8672 4.72266 10.8672 5.17188V18.7168C10.8672 19.1465 10.7565 19.472 10.5352 19.6934C10.3138 19.9147 9.99154 20.0254 9.56836 20.0254H7.3418ZM14.4414 20.0254C14.0117 20.0254 13.6862 19.9147 13.4648 19.6934C13.2435 19.472 13.1328 19.1465 13.1328 18.7168V5.17188C13.1328 4.74219 13.2435 4.41992 13.4648 4.20508C13.6862 3.98372 14.0117 3.87305 14.4414 3.87305H16.6582C17.0879 3.87305 17.4102 3.97721 17.625 4.18555C17.8464 4.39388 17.957 4.72266 17.957 5.17188V18.7168C17.957 19.1465 17.8464 19.472 17.625 19.6934C17.4102 19.9147 17.0879 20.0254 16.6582 20.0254H14.4414Z"})})}function Hs(){return B("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:B("path",{d:"M8.03125 15.5391C7.5 15.5391 7.10156 15.4036 6.83594 15.1328C6.57031 14.8568 6.4375 14.4375 6.4375 13.875V10.8828C6.4375 10.362 6.55208 9.97135 6.78125 9.71094L15.6875 18.6094C15.625 18.8333 15.5208 18.9974 15.375 19.1016C15.2292 19.2057 15.0547 19.2578 14.8516 19.2578C14.6745 19.2578 14.5052 19.2188 14.3438 19.1406C14.1823 19.0625 14.0104 18.9375 13.8281 18.7656L10.4531 15.6094C10.401 15.5625 10.3359 15.5391 10.2578 15.5391H8.03125ZM15.7422 14.3984L10.3203 8.99219H10.5547C10.6016 8.99219 10.6458 8.97135 10.6875 8.92969L13.8281 6.01562C14.0312 5.82812 14.2057 5.69271 14.3516 5.60938C14.4974 5.52083 14.6615 5.47656 14.8438 5.47656C15.1094 5.47656 15.3255 5.56771 15.4922 5.75C15.6589 5.92708 15.7422 6.14323 15.7422 6.39844V14.3984ZM18.4453 20.0781L5.05469 6.70312C4.9401 6.58854 4.88281 6.44792 4.88281 6.28125C4.88281 6.10938 4.9401 5.96615 5.05469 5.85156C5.17448 5.73177 5.31771 5.67448 5.48438 5.67969C5.65104 5.67969 5.79427 5.73698 5.91406 5.85156L19.2891 19.2266C19.4089 19.3464 19.4688 19.487 19.4688 19.6484C19.4688 19.8151 19.4089 19.9583 19.2891 20.0781C19.1797 20.1979 19.0391 20.2578 18.8672 20.2578C18.7005 20.2578 18.5599 20.1979 18.4453 20.0781Z"})})}function Vs(){return B("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:B("path",{d:"M11.7031 19.2578C11.5208 19.2578 11.349 19.2188 11.1875 19.1406C11.026 19.0625 10.8568 18.9375 10.6797 18.7656L7.35156 15.6094C7.29948 15.5625 7.23438 15.5391 7.15625 15.5391H4.91406C4.38802 15.5391 3.98438 15.3958 3.70312 15.1094C3.42188 14.8229 3.28125 14.3958 3.28125 13.8281V10.9219C3.28125 10.3594 3.42188 9.9349 3.70312 9.64844C3.98438 9.35677 4.38802 9.21094 4.91406 9.21094H7.15625C7.23438 9.21094 7.29948 9.1875 7.35156 9.14062L10.6797 6.01562C10.8828 5.82812 11.0547 5.69271 11.1953 5.60938C11.3411 5.52083 11.5052 5.47656 11.6875 5.47656C11.9531 5.47656 12.1693 5.56771 12.3359 5.75C12.5026 5.92708 12.5859 6.14323 12.5859 6.39844V18.3828C12.5859 18.6328 12.5026 18.8411 12.3359 19.0078C12.1745 19.1745 11.9635 19.2578 11.7031 19.2578ZM15.375 15.6875C15.2188 15.5781 15.1302 15.4375 15.1094 15.2656C15.0885 15.0938 15.138 14.9245 15.2578 14.7578C15.4818 14.4401 15.6562 14.0755 15.7812 13.6641C15.9062 13.2474 15.9688 12.8125 15.9688 12.3594C15.9688 11.9062 15.9062 11.4714 15.7812 11.0547C15.6615 10.638 15.487 10.2734 15.2578 9.96094C15.1328 9.79948 15.0807 9.63281 15.1016 9.46094C15.1276 9.28385 15.2188 9.14062 15.375 9.03125C15.5104 8.9375 15.6589 8.90625 15.8203 8.9375C15.9818 8.96875 16.1146 9.0599 16.2188 9.21094C16.5208 9.60677 16.7552 10.0807 16.9219 10.6328C17.0938 11.1849 17.1797 11.7604 17.1797 12.3594C17.1797 12.9583 17.0938 13.5339 16.9219 14.0859C16.7552 14.638 16.5208 15.112 16.2188 15.5078C16.1146 15.6589 15.9818 15.75 15.8203 15.7812C15.6589 15.8073 15.5104 15.776 15.375 15.6875ZM18.2734 17.7266C18.1328 17.6276 18.0521 17.4974 18.0312 17.3359C18.0104 17.1693 18.0547 17.0052 18.1641 16.8438C18.5859 16.2344 18.9141 15.5443 19.1484 14.7734C19.388 13.9974 19.5078 13.1927 19.5078 12.3594C19.5078 11.526 19.3906 10.7214 19.1562 9.94531C18.9219 9.16927 18.5911 8.47917 18.1641 7.875C18.0495 7.71354 18.0026 7.55208 18.0234 7.39062C18.0495 7.22396 18.1328 7.09115 18.2734 6.99219C18.4193 6.89323 18.5729 6.85938 18.7344 6.89062C18.8958 6.92188 19.0286 7.01302 19.1328 7.16406C19.638 7.84115 20.0286 8.63542 20.3047 9.54688C20.5807 10.4583 20.7188 11.3958 20.7188 12.3594C20.7188 13.3229 20.5781 14.2578 20.2969 15.1641C20.0208 16.0703 19.6328 16.8672 19.1328 17.5547C19.0286 17.7057 18.8958 17.7969 18.7344 17.8281C18.5729 17.8542 18.4193 17.8203 18.2734 17.7266Z"})})}function Ie(){return B("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:B("path",{d:"M5.42188 13.1953V6.4375C5.42188 5.625 5.6224 5.01302 6.02344 4.60156C6.42969 4.1901 7.03646 3.98438 7.84375 3.98438H11.4297V9.71875C11.4297 10.7031 11.9219 11.1953 12.9062 11.1953H18.5625V18.2891C18.5625 19.1016 18.3594 19.7109 17.9531 20.1172C17.5521 20.5286 16.9479 20.7344 16.1406 20.7344H9.78125C10 20.3646 10.1667 19.9688 10.2812 19.5469C10.401 19.125 10.4609 18.6901 10.4609 18.2422C10.4609 17.5495 10.3307 16.8984 10.0703 16.2891C9.8099 15.6797 9.44792 15.1432 8.98438 14.6797C8.52083 14.2161 7.98438 13.8542 7.375 13.5938C6.76562 13.3281 6.11458 13.1953 5.42188 13.1953ZM12.9297 10.125C12.6432 10.125 12.5 9.98438 12.5 9.70312V4.07031C12.6615 4.09635 12.8255 4.16667 12.9922 4.28125C13.1589 4.39062 13.3333 4.53906 13.5156 4.72656L17.8203 9.10938C18.0078 9.30208 18.1562 9.47917 18.2656 9.64062C18.375 9.80208 18.4427 9.96354 18.4688 10.125H12.9297ZM5.42188 22.2109C4.88021 22.2109 4.36979 22.1068 3.89062 21.8984C3.41146 21.6953 2.98958 21.4115 2.625 21.0469C2.26042 20.6823 1.97396 20.2604 1.76562 19.7812C1.55729 19.3021 1.45312 18.7891 1.45312 18.2422C1.45312 17.6953 1.55729 17.1849 1.76562 16.7109C1.97396 16.2318 2.26042 15.8099 2.625 15.4453C2.98958 15.0755 3.41146 14.7891 3.89062 14.5859C4.36979 14.3776 4.88021 14.2734 5.42188 14.2734C5.96875 14.2734 6.48177 14.3776 6.96094 14.5859C7.4401 14.7891 7.86198 15.0729 8.22656 15.4375C8.59115 15.8021 8.875 16.224 9.07812 16.7031C9.28646 17.1823 9.39062 17.6953 9.39062 18.2422C9.39062 18.7839 9.28646 19.2943 9.07812 19.7734C8.86979 20.2526 8.58073 20.6745 8.21094 21.0391C7.84635 21.4036 7.42448 21.6901 6.94531 21.8984C6.46615 22.1068 5.95833 22.2109 5.42188 22.2109ZM5.42188 20.7266C5.56771 20.7266 5.68229 20.6823 5.76562 20.5938C5.85417 20.5052 5.89844 20.3906 5.89844 20.25V18.7188H7.42969C7.57031 18.7188 7.6849 18.6745 7.77344 18.5859C7.86198 18.5026 7.90625 18.388 7.90625 18.2422C7.90625 18.0964 7.86198 17.9818 7.77344 17.8984C7.6849 17.8099 7.57031 17.7656 7.42969 17.7656H5.89844V16.2344C5.89844 16.0938 5.85417 15.9792 5.76562 15.8906C5.68229 15.8021 5.56771 15.7578 5.42188 15.7578C5.27604 15.7578 5.15885 15.8021 5.07031 15.8906C4.98698 15.9792 4.94531 16.0938 4.94531 16.2344V17.7656H3.41406C3.27344 17.7656 3.15885 17.8099 3.07031 17.8984C2.98177 17.9818 2.9375 18.0964 2.9375 18.2422C2.9375 18.388 2.98177 18.5026 3.07031 18.5859C3.15885 18.6745 3.27344 18.7188 3.41406 18.7188H4.94531V20.25C4.94531 20.3906 4.98698 20.5052 5.07031 20.5938C5.15885 20.6823 5.27604 20.7266 5.42188 20.7266Z"})})}function Us(){return B("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:B("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.75 6.5A3.75 3.75 0 0 0 2 10.25v3.5a3.75 3.75 0 0 0 3.75 3.75h7.5A3.75 3.75 0 0 0 17 13.75v-.46l2.9 2.16A1.25 1.25 0 0 0 22 14.45v-4.9a1.25 1.25 0 0 0-2.1-1L17 10.71v-.46a3.75 3.75 0 0 0-3.75-3.75h-7.5ZM6 8h7a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 16H6a2.5 2.5 0 0 1-2.5-2.5v-3A2.5 2.5 0 0 1 6 8Zm11 4.6v-1.2l3.5-2.61v6.42L17 12.6Z"})})}function yr(){return B("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:B("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.25 6.75C3.46 6.75 2 8.21 2 10v4c0 1.79 1.46 3.25 3.25 3.25h3.24c.83 0 1.55-.54 1.8-1.33l.52-1.67h2.38l.52 1.67c.25.79.97 1.33 1.8 1.33h3.24c1.79 0 3.25-1.46 3.25-3.25v-4c0-1.79-1.46-3.25-3.25-3.25H5.25Zm.67 3.42c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52H5.92Zm10.2 0c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52h-1.96Z"})})}function xr(){return Ta("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[B("path",{d:"M5.5 3.75c-.97 0-1.75.78-1.75 1.75v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5A3.25 3.25 0 0 1 5.5 2.25h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5ZM16.25 3c0-.41.34-.75.75-.75h1.5a3.25 3.25 0 0 1 3.25 3.25v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5c0-.97-.78-1.75-1.75-1.75H17c-.41 0-.75-.34-.75-.75ZM3 15.5c.41 0 .75.34.75.75v2.25c0 .97.78 1.75 1.75 1.75h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5a3.25 3.25 0 0 1-3.25-3.25v-2.25c0-.41.34-.75.75-.75ZM21 15.5c.41 0 .75.34.75.75v2.25a3.25 3.25 0 0 1-3.25 3.25H17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.5c.97 0 1.75-.78 1.75-1.75v-2.25c0-.41.34-.75.75-.75Z"}),B("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z"})]})}function Ws(){return B("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:B("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"})})}function Ys(){return B("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:B("path",{d:"m480-236 93-93q12-12 29-12t29 12q12 12 12 29t-12 29L508-148q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L329-271q-12-12-12-29t12-29q12-12 29-12t29 12l93 93Zm0-484-93 93q-12 12-29 12t-29-12q-12-12-12-29t12-29l123-123q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l123 123q12 12 12 29t-12 29q-12 12-29 12t-29-12l-93-93Z"})})}function qs({active:i=!1}){return B("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:i?B("path",{d:"M240-240h-80q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h120q17 0 28.5 11.5T320-280v120q0 17-11.5 28.5T280-120q-17 0-28.5-11.5T240-160v-80Zm480 0v80q0 17-11.5 28.5T680-120q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320h120q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240h-80ZM240-720v-80q0-17 11.5-28.5T280-840q17 0 28.5 11.5T320-800v120q0 17-11.5 28.5T280-640H160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h80Zm480 0h80q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H680q-17 0-28.5-11.5T640-680v-120q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v80Z"}):B("path",{d:"M200-200h80q17 0 28.5 11.5T320-160q0 17-11.5 28.5T280-120H160q-17 0-28.5-11.5T120-160v-120q0-17 11.5-28.5T160-320q17 0 28.5 11.5T200-280v80Zm560 0v-80q0-17 11.5-28.5T800-320q17 0 28.5 11.5T840-280v120q0 17-11.5 28.5T800-120H680q-17 0-28.5-11.5T640-160q0-17 11.5-28.5T680-200h80ZM200-760v80q0 17-11.5 28.5T160-640q-17 0-28.5-11.5T120-680v-120q0-17 11.5-28.5T160-840h120q17 0 28.5 11.5T320-800q0 17-11.5 28.5T280-760h-80Zm560 0h-80q-17 0-28.5-11.5T640-800q0-17 11.5-28.5T680-840h120q17 0 28.5 11.5T840-800v120q0 17-11.5 28.5T800-640q-17 0-28.5-11.5T760-680v-80Z"})})}function br(){return B("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:B("path",{d:"m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"})})}function vr(){return B("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:B("path",{d:"M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"})})}var Zs=[{type:"orbit",label:"Orbit",hint:`Left-click drag to rotate / Right-click drag to pan
Scroll to zoom in/out`},{type:"trackball",label:"Trackball",hint:`Left-click drag to rotate freely / Right-click drag to pan
Scroll to zoom in/out`},{type:"fly",label:"Fly",hint:`W/S forward & back / A/D strafe / R/F up & down
Q/E roll / Drag to look around`}];var pe={PW:"pw",HW:"hw",VR:"vr",AR:"ar"},$h=[pe.VR,pe.AR];function wr(i){return i===pe.VR||i===pe.AR}var di=[".mint",".sog"],js=di.join(","),Qs="Open file",_r="local://",$s="static",Pa=".sog";function fi(i){return i.toLowerCase().endsWith(Pa)}function Fe(i){return typeof i?.url=="string"&&i.url.startsWith(_r)}var Ks="stepper";var La="@gracia/web-sdk/wasm",Ca="https://market.gracia.ai/api/v1/streaming/content";function Js(){return typeof __GRACIA_MODULE_URL__=="string"?__GRACIA_MODULE_URL__:La}function en(){return typeof __GRACIA_STREAMING_BASE_URL__=="string"?__GRACIA_STREAMING_BASE_URL__:Ca}function Ea(){return typeof navigator>"u"?!1:!!navigator.gpu}var Ra={xr:"xr-failed",fullscreen:"fullscreen-failed","local-file":"local-file-failed"};function Aa(i){let e=i.match(/http\s+(-?\d+)/i);return e?Number(e[1]):null}function ka(i,e){let t=e&&Ra[e];if(t)return t;let r=i.message.toLowerCase();if(r.includes("webgpu")||r.includes("not supported")||r.includes("getcontext"))return"unsupported-browser";let s=Aa(r);return s!==null?s===401||s===403?"access-denied":s===404?"not-found":s>=500?"server-error":"network":r.includes("failed to fetch dynamically imported module")?"load-failed":r.includes("forbidden")||r.includes("unauthorized")?"access-denied":Ea()?"unknown":"unsupported-browser"}var Ia=new Set(["unsupported-browser","not-found","access-denied","xr-failed","fullscreen-failed","local-file-failed"]),Fa=new Set(["xr-failed","fullscreen-failed","local-file-failed"]);function Ba(i,e){let t=!Ia.has(i);return i==="unsupported-browser"?{presentation:"blocking",recoverable:t}:Fa.has(i)?{presentation:"toast",recoverable:t}:{presentation:e?"toast":"blocking",recoverable:t}}var Oa={"unsupported-browser":{title:"This browser can\u2019t run the player",body:"The player requires WebGPU. Open it in a supported browser and device."},network:{title:"Connection lost",body:"We couldn\u2019t reach the stream. Check your connection and try again."},"not-found":{title:"Scene not found",body:"This content is no longer available."},"access-denied":{title:"Access denied",body:"You don\u2019t have permission to view this content."},"server-error":{title:"Something went wrong",body:"The server had a problem loading this scene. Please try again."},"load-failed":{title:"Couldn\u2019t load the scene",body:"We couldn\u2019t load this scene. Please try again."},"xr-failed":{title:"Couldn\u2019t enter immersive mode",body:"Immersive mode isn\u2019t available right now."},"fullscreen-failed":{title:"Couldn\u2019t enter fullscreen",body:"Fullscreen isn\u2019t available right now."},"local-file-failed":{title:"Couldn\u2019t open the file",body:"We couldn\u2019t open that file. Try a different one."},unknown:{title:"Something went wrong",body:"We couldn\u2019t load this scene. Please try again."}};function Ga(i){return Oa[i]}function tn(i,e,t){let r=ka(i,t);return{kind:r,cause:i,...Ba(r,e),...Ga(r)}}var rn="data:font/woff2;base64,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";var sn=`@font-face {
    font-family: "Golos Text";
    src: url("./assets/GolosText-Regular.woff2") format("woff2");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
}

.gr-player,
.gr-player *,
.gr-player *::before,
.gr-player *::after {
    box-sizing: border-box;
}

.gr-player {
    --gr-player-font-family:
        "Golos Text", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    --gr-player-bg: #0d1115;
    --gr-player-surface: #26282b;
    --gr-player-surface-strong: rgba(38, 40, 43, 0.8);
    --gr-player-surface-light: radial-gradient(
        ellipse 69% 100% at 50% 0%,
        #e3e3e3 0%,
        #d3dae3 100%
    );
    --gr-player-border: rgba(255, 255, 255, 0.06);
    --gr-player-text: rgba(233, 242, 255, 0.82);
    --gr-player-muted: rgba(233, 242, 255, 0.46);
    --gr-player-accent: #e9f2ff;
    --gr-player-accent-ink: #212833;
    --gr-player-radius: 5px;
    --gr-player-radius-small: 5px;
    --gr-player-radius-compact: 8px;
    --gr-player-radius-tiny: 2px;
    --gr-player-radius-superellipse: 14px;
    --gr-player-control-size: 48px;
    --gr-player-ui-font-size: 16px;
    --gr-player-time-display: none;
    --gr-player-mobile-top: calc(env(safe-area-inset-top, 0px) + 20px);
    --gr-player-mobile-bottom: calc(env(safe-area-inset-bottom, 0px) + 20px);
    --gr-player-mobile-edge: 20px;
    --gr-player-mobile-left: max(var(--gr-player-mobile-edge), env(safe-area-inset-left, 0px));
    --gr-player-mobile-right: max(var(--gr-player-mobile-edge), env(safe-area-inset-right, 0px));
    --gr-player-shadow: 0 4px 32px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.12);
    --gr-player-inner-shadow: inset 1px 1px 1px rgba(255, 255, 255, 0.07);
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    border-radius: var(--gr-player-radius);
    background: var(--gr-player-bg);
    color: var(--gr-player-text);
    font-family: var(--gr-player-font-family);
    container-type: size;
    isolation: isolate;
    touch-action: manipulation;
    overscroll-behavior-x: none;
}

.gr-player button {
    font: inherit;
}

.gr-player button:focus-visible,
.gr-player [tabindex]:focus-visible {
    outline: 2px solid rgba(233, 242, 255, 0.9);
    outline-offset: 2px;
}

@supports (corner-shape: superellipse(2)) {
    .gr-player {
        --gr-player-radius: var(--gr-player-radius-superellipse);
        --gr-player-radius-small: var(--gr-player-radius-superellipse);
        --gr-player-radius-compact: var(--gr-player-radius-superellipse);
        --gr-player-radius-tiny: var(--gr-player-radius-superellipse);
    }

    .gr-player,
    .gr-player__loader,
    .gr-player__button,
    .gr-player__seek-shell,
    .gr-player__seek,
    .gr-player__seek::before,
    .gr-player__seek-hover,
    .gr-player__seek-thumb,
    .gr-player__scene-inner,
    .gr-player__scene-segment,
    .gr-player__scene-menu,
    .gr-player__camera-panel,
    .gr-player__camera-option,
    .gr-player__error-screen,
    .gr-player__xr-active,
    .gr-player__error {
        corner-shape: superellipse(2);
    }
}

.gr-player__sr {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.gr-player__canvas {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: #000;
}

.gr-player__canvas canvas {
    display: block;
    width: 100%;
    height: 100%;
    background: #000;
    cursor: grab;
}

.gr-player__canvas canvas:active {
    cursor: grabbing;
}

.gr-player__file-input {
    display: none;
}

.gr-player:fullscreen {
    width: 100%;
    height: 100%;
    min-height: 100%;
    border-radius: 0;
}

.gr-player__loader {
    position: absolute;
    inset: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(13, 17, 21, 0.76);
    transition: opacity 0.25s ease;
    pointer-events: none;
}

/* One spinner for every loading state (initial load, scene switch, rebuffering). */
.gr-player__spinner {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    border: 3px solid rgba(233, 242, 255, 0.18);
    border-top-color: var(--gr-player-accent);
    animation: gr-player-spin 0.8s linear infinite;
}

.gr-player__rebuffer-spinner {
    position: absolute;
    inset: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

.gr-player__error-screen,
.gr-player__xr-active {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 72px 20px;
    background: #111316;
}

.gr-player__error-screen {
    z-index: 6;
    pointer-events: none;
}

.gr-player__xr-active {
    z-index: 7;
    pointer-events: auto;
}

.gr-player__state-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    max-width: min(420px, 100%);
    color: var(--gr-player-accent);
    text-align: center;
}

.gr-player__state-icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(233, 242, 255, 0.86);
}

.gr-player__state-message h2,
.gr-player__state-message p {
    margin: 0;
    font-weight: 400;
}

.gr-player__state-message h2 {
    color: var(--gr-player-accent);
    font-size: 24px;
    line-height: 1.2;
}

.gr-player__xr-exit {
    margin-top: 16px;
    min-width: 160px;
}

.gr-player__state-message p {
    max-width: 290px;
    color: rgba(233, 242, 255, 0.7);
    font-size: 14px;
    line-height: 1.25;
}

/* The error screen itself is pointer-events: none; re-enable the reload button. */
.gr-player__state-action {
    margin-top: 12px;
    padding: 8px 18px;
    pointer-events: auto;
}

.gr-player__overlay {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    opacity: 1;
    transition: opacity 0.25s ease;
    pointer-events: none;
}

.gr-player__overlay::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    height: 30vh;
    min-height: 180px;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.24) 42%,
        rgba(0, 0, 0, 0.2)
    );
    pointer-events: none;
}

.gr-player__top,
.gr-player__bottom {
    position: relative;
    z-index: 1;
    pointer-events: auto;
}

.gr-player__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.gr-player__top-left,
.gr-player__top-right {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
}

.gr-player__xr-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    min-width: 0;
}

.gr-player__xr-actions--mobile {
    display: none;
}

.gr-player__camera-control {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 0;
}

.gr-player__button--camera[aria-expanded="true"] {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.15);
    background: rgba(48, 52, 57, 0.96);
}

.gr-player__camera-panel {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 40;
    width: min(310px, calc(100vw - 32px));
    padding: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border: 0.5px solid var(--gr-player-border);
    border-radius: var(--gr-player-radius-small);
    background: var(--gr-player-surface-strong);
    box-shadow: var(--gr-player-inner-shadow), var(--gr-player-shadow);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    animation: gr-player-menu-enter 0.16s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    will-change: opacity, transform;
}

.gr-player__camera-title {
    padding: 7px 12px 3px;
    color: rgba(233, 242, 255, 0.42);
    font-size: calc(var(--gr-player-ui-font-size) - 6px);
    font-weight: 600;
    letter-spacing: 0;
    text-transform: uppercase;
}

.gr-player__camera-option {
    position: relative;
    width: 100%;
    min-height: 74px;
    padding: 10px 12px;
    border: 0.5px solid transparent;
    border-radius: var(--gr-player-radius-compact);
    background: transparent;
    box-shadow: none;
    color: var(--gr-player-muted);
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    cursor: pointer;
}

.gr-player__camera-option:hover {
    background: rgba(233, 242, 255, 0.08);
    color: var(--gr-player-text);
}

.gr-player__camera-option.is-active {
    border-color: rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.07);
    color: #fff;
}

.gr-player__camera-label {
    font-size: calc(var(--gr-player-ui-font-size) - 3px);
    line-height: 1.2;
}

.gr-player__camera-hint {
    color: rgba(233, 242, 255, 0.38);
    font-size: calc(var(--gr-player-ui-font-size) - 6px);
    line-height: 1.45;
    white-space: pre-line;
}

.gr-player__camera-option.is-active .gr-player__camera-hint {
    color: rgba(233, 242, 255, 0.58);
}

.gr-player__bottom {
    width: 100%;
}

.gr-player__controls {
    display: flex;
    align-items: stretch;
    gap: 8px;
    width: 100%;
}

.gr-player__button,
.gr-player__scene-nav,
.gr-player__scene-main,
.gr-player__scene-item {
    min-height: var(--gr-player-control-size);
    border: 0.5px solid var(--gr-player-border);
    border-radius: var(--gr-player-radius-small);
    background: var(--gr-player-surface);
    box-shadow: var(--gr-player-inner-shadow);
    color: var(--gr-player-text);
    transition:
        background 0.15s,
        color 0.15s,
        border-color 0.15s,
        opacity 0.15s,
        box-shadow 0.15s,
        filter 0.15s;
}

.gr-player__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 0 14px;
    font-size: var(--gr-player-ui-font-size);
    white-space: nowrap;
    cursor: pointer;
}

.gr-player__button:hover,
.gr-player__scene-nav:hover:not(:disabled),
.gr-player__scene-main:hover:not(:disabled),
.gr-player__scene-item:hover {
    background: rgba(48, 52, 57, 0.96);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.15);
}

.gr-player__button--secondary:active,
.gr-player__button--icon:active {
    background: rgba(0, 0, 0, 0.1);
}

.gr-player__button[aria-disabled="true"] {
    opacity: 0.42;
    cursor: not-allowed;
    pointer-events: none;
}

.gr-player__seek-shell[aria-disabled="true"] {
    opacity: 0.42;
    pointer-events: none;
}

.gr-player__scene[aria-disabled="true"] {
    opacity: 0.42;
    pointer-events: none;
}

.gr-player__button--icon {
    width: var(--gr-player-control-size);
    min-width: var(--gr-player-control-size);
    padding: 0;
}

.gr-player__button--primary {
    position: relative;
    overflow: hidden;
    background: var(--gr-player-surface-light);
    color: var(--gr-player-accent-ink);
    border-color: rgba(255, 255, 255, 0.66);
    box-shadow: var(--gr-player-inner-shadow), var(--gr-player-shadow);
}

.gr-player__button--primary::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(ellipse 69% 100% at 50% 0%, #f8fbff 0%, #edf3fa 100%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s;
}

.gr-player__button--primary:hover {
    background: var(--gr-player-surface-light);
    color: #111820;
}

.gr-player__button--primary:hover::before {
    opacity: 1;
}

.gr-player__button--primary:active {
    filter: brightness(0.9);
}

.gr-player__button--primary > * {
    position: relative;
    z-index: 1;
}

.gr-player__button--play {
    width: 72px;
    min-width: 72px;
    border-radius: var(--gr-player-radius-compact);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow:
        inset 1px 1px 1px #fff,
        0 2px 8px rgba(30, 47, 72, 0.06);
}

.gr-player__button--xr {
    height: var(--gr-player-control-size);
    min-width: 0;
    padding: 0 16px;
    gap: 8px;
    border-radius: var(--gr-player-radius-compact);
}

.gr-player__icon {
    display: block;
    width: 24px;
    height: 24px;
    fill: currentColor;
    pointer-events: none;
}

.gr-player__state-icon .gr-player__icon {
    width: 64px;
    height: 64px;
}

.gr-player__seek-shell {
    flex: 1;
    min-width: 80px;
    min-height: var(--gr-player-control-size);
    display: flex;
    align-items: center;
    overflow: hidden;
    border: 0.5px solid var(--gr-player-border);
    border-radius: var(--gr-player-radius-small);
    background: rgba(0, 0, 0, 0.3);
    box-shadow: var(--gr-player-inner-shadow);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}

.gr-player__seek {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: inherit;
    cursor: pointer;
    touch-action: none;
    isolation: isolate;
}

.gr-player__seek::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: rgba(233, 242, 255, 0.08);
    pointer-events: none;
}

.gr-player__seek-fill {
    position: absolute;
    inset: 0 auto 0 0;
    z-index: 1;
    width: 0;
    background: rgba(233, 242, 255, 0.28);
    pointer-events: none;
}

.gr-player__seek-hover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 0;
    opacity: 0;
    background: rgba(233, 242, 255, 0.16);
    border-right: 1px solid rgba(233, 242, 255, 0.32);
    pointer-events: none;
    transition: opacity 0.12s ease;
}

.gr-player__seek:hover .gr-player__seek-hover,
.gr-player__seek:focus-visible .gr-player__seek-hover {
    opacity: 1;
}

.gr-player__seek-thumb {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 3;
    width: 8px;
    left: 0;
    transform: translateX(-50%);
    border-radius: var(--gr-player-radius-small);
    background: var(--gr-player-accent);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
    pointer-events: none;
}

.gr-player__time {
    display: var(--gr-player-time-display);
    align-items: center;
    min-height: var(--gr-player-control-size);
    color: var(--gr-player-muted);
    font-size: calc(var(--gr-player-ui-font-size) - 3px);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
}

.gr-player__scene {
    position: relative;
    flex: 0 1 280px;
    min-width: 190px;
    height: var(--gr-player-control-size);
    --gr-player-scene-divider: rgba(0, 0, 0, 0.1);
}

.gr-player--scenes-single .gr-player__scene {
    display: none;
}

.gr-player__scene--stepper .gr-player__scene-main {
    justify-content: center;
    cursor: default;
}

.gr-player__scene--stepper .gr-player__scene-main:hover {
    background: transparent;
}

.gr-player__scene-inner {
    height: 100%;
    min-width: 0;
    display: flex;
    align-items: stretch;
    overflow: hidden;
    border: 0.5px solid var(--gr-player-border);
    border-radius: var(--gr-player-radius-small);
    background: var(--gr-player-surface);
    box-shadow: var(--gr-player-inner-shadow);
}

.gr-player__scene-nav,
.gr-player__scene-main,
.gr-player__scene-item {
    position: relative;
    overflow: hidden;
}

.gr-player__scene-nav::after,
.gr-player__scene-main::after,
.gr-player__scene-item::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.12s ease;
}

.gr-player__scene-nav:active:not(:disabled)::after,
.gr-player__scene-main:active:not(:disabled)::after,
.gr-player__scene-item:active::after {
    opacity: 1;
    transition-duration: 0.06s;
}

.gr-player__scene-nav,
.gr-player__scene-main {
    border: 0;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
    cursor: pointer;
}

.gr-player__scene-nav {
    width: var(--gr-player-control-size);
    min-width: var(--gr-player-control-size);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--gr-player-accent);
}

.gr-player__scene-nav:disabled {
    color: rgba(233, 242, 255, 0.1);
    cursor: not-allowed;
}

.gr-player__scene-nav:disabled:hover,
.gr-player__scene-main:disabled:hover {
    background: transparent;
}

.gr-player__scene-main {
    flex: 1;
    min-width: 0;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    text-align: left;
}

.gr-player__scene-main:disabled {
    cursor: default;
}

.gr-player__scene-inner > .gr-player__scene-nav:not(:first-child)::before,
.gr-player__scene-main:not(:first-child)::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    width: 1px;
    background: var(--gr-player-scene-divider);
    pointer-events: none;
}

.gr-player__scene-main > .gr-player__icon {
    flex: 0 0 24px;
    width: 24px;
    color: rgba(233, 242, 255, 0.7);
}

.gr-player__scene-main-copy {
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.gr-player__scene-copy {
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.gr-player__scene-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--gr-player-text);
    font-size: var(--gr-player-ui-font-size);
    line-height: 17px;
}

.gr-player__scene-count {
    color: var(--gr-player-muted);
    font-size: var(--gr-player-ui-font-size);
    white-space: nowrap;
}

.gr-player__scene-segments {
    display: flex;
    gap: 3px;
    width: 100%;
    height: 3px;
}

.gr-player__scene-segment {
    flex: 1;
    min-width: 3px;
    border-radius: var(--gr-player-radius-tiny);
    background: rgba(233, 242, 255, 0.16);
}

.gr-player__scene-segment.is-active {
    background: rgba(233, 242, 255, 0.8);
}

/* Local file surfaced as a scene: filename + file glyph in the stepper. */
.gr-player__scene-count--local {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    color: var(--gr-player-text);
}

.gr-player__scene-count--local .gr-player__icon {
    width: 16px;
    height: 16px;
    flex: none;
    fill: var(--gr-player-accent);
}

.gr-player__scene-count--local .gr-player__scene-label {
    min-width: 0;
}

.gr-player__scene-segment--local:not(.is-active) {
    background: rgba(233, 242, 255, 0.42);
}

.gr-player__scene-menu {
    position: absolute;
    left: 0;
    bottom: calc(100% + 8px);
    z-index: 30;
    width: calc(100% - 4px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 0.5px solid var(--gr-player-border);
    border-radius: var(--gr-player-radius-small);
    background: var(--gr-player-surface-strong);
    box-shadow: var(--gr-player-inner-shadow), var(--gr-player-shadow);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    animation: gr-player-menu-enter 0.16s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    will-change: opacity, transform;
}

.gr-player__scene-item {
    width: 100%;
    height: 43px;
    min-height: 43px;
    padding: 0 12px;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    color: var(--gr-player-muted);
    text-align: left;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
}

.gr-player__scene-item:hover {
    background: rgba(233, 242, 255, 0.1);
}

.gr-player__scene-item + .gr-player__scene-item::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
    height: 1px;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.8) 0 50%,
        rgba(233, 242, 255, 0.16) 50% 100%
    );
    pointer-events: none;
}

.gr-player__scene-item span {
    min-width: 12px;
    color: rgba(233, 242, 255, 0.24);
}

.gr-player__scene-item span .gr-player__icon {
    display: block;
    width: 15px;
    height: 15px;
    fill: var(--gr-player-accent);
}

.gr-player__scene-item strong {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(233, 242, 255, 0.7);
    font-weight: 400;
}

.gr-player__scene-item.is-active span,
.gr-player__scene-item.is-active strong,
.gr-player__scene-item:hover span,
.gr-player__scene-item:hover strong {
    color: var(--gr-player-accent);
}

/* --- Scene selector: tabs mode --- */

.gr-player__scene-tabs-scroll {
    display: flex;
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
}

.gr-player__scene-tabs-scroll::-webkit-scrollbar {
    display: none;
}

.gr-player__scene-tab {
    position: relative;
    overflow: hidden;
    flex: 1 0 64px;
    min-width: 64px;
    min-height: var(--gr-player-control-size);
    border: 0;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
    color: var(--gr-player-muted);
    cursor: pointer;
    font: inherit;
    font-size: var(--gr-player-ui-font-size);
}

.gr-player__scene-tab + .gr-player__scene-tab::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    width: 1px;
    background: var(--gr-player-scene-divider);
    pointer-events: none;
}

.gr-player__scene-tab::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.12s ease;
}

.gr-player__scene-tab:active::after {
    opacity: 1;
    transition-duration: 0.06s;
}

.gr-player__scene-tab:hover {
    background: rgba(48, 52, 57, 0.96);
}

.gr-player__scene-tab.is-active {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
}

.gr-player__scene-tab--local {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.gr-player__scene-tab--local .gr-player__icon {
    width: 16px;
    height: 16px;
}

.gr-player__error {
    display: flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
    max-width: min(420px, 100%);
    margin: 0 auto 10px;
    padding: 10px 14px;
    border-radius: var(--gr-player-radius-small);
    border: 1px solid rgba(248, 113, 113, 0.25);
    background: rgba(127, 29, 29, 0.82);
    color: rgba(255, 255, 255, 0.9);
    font-size: 12px;
    line-height: 1.5;
    box-shadow: var(--gr-player-shadow);
}

.gr-player__error-text {
    color: rgba(255, 255, 255, 0.72);
}

@container (width < 720px) {
    .gr-player__overlay {
        --gr-player-control-size: 44px;
        --gr-player-ui-font-size: 14px;
        padding: 12px;
    }

    .gr-player__controls {
        gap: 7px;
    }

    .gr-player__error {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
    }

    .gr-player__button--play {
        width: 56px;
        min-width: 56px;
    }

    .gr-player__scene {
        flex-basis: 210px;
        min-width: 150px;
    }
}

@container (height < 480px) {
    .gr-player__overlay {
        --gr-player-control-size: 44px;
        --gr-player-ui-font-size: 14px;
        padding: 12px;
    }

    .gr-player__controls {
        gap: 7px;
    }

    .gr-player__button--play {
        width: 56px;
        min-width: 56px;
    }

    .gr-player__scene {
        flex-basis: 210px;
        min-width: 150px;
    }
}

@container (width <= 640px) and (aspect-ratio < 1 / 1) {
    .gr-player__overlay {
        --gr-player-control-size: 48px;
        --gr-player-ui-font-size: 14px;
        --gr-player-mobile-controls-height: calc(var(--gr-player-control-size) * 2 + 8px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: var(--gr-player-mobile-top) var(--gr-player-mobile-right)
            var(--gr-player-mobile-bottom) var(--gr-player-mobile-left);
    }

    .gr-player__overlay::before {
        height: 42vh;
        min-height: 260px;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.34) 40%,
            rgba(0, 0, 0, 0.56)
        );
    }

    .gr-player__top {
        position: static;
        inset: auto;
        flex: 0 0 auto;
        width: 100%;
        height: auto;
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
        pointer-events: none;
    }

    .gr-player__top-left {
        flex: 0 0 auto;
        width: auto;
        justify-content: flex-start;
    }

    .gr-player__top-right {
        flex: 1 1 auto;
        width: auto;
        min-width: 0;
        flex-direction: row;
        align-items: stretch;
        justify-content: flex-end;
        gap: 8px;
    }

    .gr-player__top button {
        pointer-events: auto;
    }

    .gr-player__camera-control {
        flex: 0 0 auto;
        width: auto;
    }

    .gr-player__button--camera {
        margin-left: auto;
    }

    .gr-player__camera-panel {
        width: min(
            320px,
            calc(100vw - var(--gr-player-mobile-left) - var(--gr-player-mobile-right))
        );
    }

    .gr-player__xr-actions--desktop {
        display: none;
    }

    .gr-player__xr-actions--mobile {
        display: flex;
    }

    .gr-player__xr-actions {
        flex: 1 1 auto;
        width: 100%;
        min-width: 0;
        max-width: 100%;
    }

    .gr-player__button--xr {
        flex: 1;
        width: 100%;
        padding: 0 14px;
    }

    /* No stepper: line 2 collapses, so reset sits above the single control row. */
    .gr-player--scenes-single .gr-player__overlay {
        --gr-player-mobile-controls-height: var(--gr-player-control-size);
    }

    .gr-player__reset {
        position: absolute;
        right: var(--gr-player-mobile-right);
        bottom: calc(
            var(--gr-player-mobile-bottom) +
            var(--gr-player-mobile-controls-height) +
            8px
        );
        margin: 0;
        pointer-events: auto;
    }

    .gr-player__fullscreen {
        display: none;
    }

    .gr-player__bottom {
        position: relative;
        inset: auto;
        flex: 0 0 auto;
        width: 100%;
        min-width: 0;
        padding: 0;
        margin-top: auto;
    }

    .gr-player__controls {
        flex-wrap: wrap;
        gap: 8px;
        width: 100%;
        min-width: 0;
        max-width: 100%;
        overflow: visible;
    }

    .gr-player__controls .gr-player__button {
        height: 48px;
        min-height: 48px;
    }

    /* Line 2: stepper on its own full-width row. */
    .gr-player__scene {
        order: 1;
        flex: 1 1 100%;
        width: 100%;
        min-width: 0;
        max-width: none;
        overflow: visible;
    }

    /* Line 3: play, seek bar, mute share one row. */
    .gr-player__button--play {
        order: 2;
        flex: 0 0 72px;
    }

    .gr-player__seek-shell {
        order: 3;
        flex: 1 1 0;
        width: auto;
        min-width: 0;
        max-width: none;
    }

    .gr-player__mute {
        order: 4;
        flex: 0 0 var(--gr-player-control-size);
    }

    .gr-player__seek-thumb {
        width: 4px;
    }

    .gr-player__time {
        display: none;
    }

    .gr-player__scene-inner,
    .gr-player__scene-main,
    .gr-player__scene-main-copy {
        min-width: 0;
        max-width: 100%;
    }

    .gr-player__scene-nav {
        width: 40px;
        min-width: 40px;
    }

    .gr-player__scene-menu {
        width: calc(100% - 4px);
    }
}

@media (prefers-reduced-motion: reduce) {
    .gr-player__spinner,
    .gr-player__scene-menu {
        animation: none;
    }

    .gr-player__button,
    .gr-player__scene-nav,
    .gr-player__scene-main,
    .gr-player__scene-item,
    .gr-player__scene-tab,
    .gr-player__scene-nav::after,
    .gr-player__scene-main::after,
    .gr-player__scene-item::after,
    .gr-player__scene-tab::after {
        transition: none;
    }
}

@keyframes gr-player-spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes gr-player-menu-enter {
    from {
        opacity: 0;
        transform: translateY(4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;var nn="gracia-player-default-styles",mi=sn.replace('url("./assets/GolosText-Regular.woff2")',`url("${rn}")`);function Sr(i){if(typeof document>"u")return;let e=typeof ShadowRoot<"u"&&i instanceof ShadowRoot?i:i?.head??document.head;if(e.querySelector(`#${nn}`))return;let t=document.createElement("style");t.id=nn,t.textContent=mi,e.appendChild(t)}function J(...i){let e=[];for(let t of i)if(t){if(typeof t=="string"){e.push(t);continue}for(let[r,s]of Object.entries(t))s&&e.push(r)}return e.join(" ")}function de(i){return i.label??i.displayName??i.id??i.url??"Untitled"}function gi(i){return!Number.isFinite(i)||i<0?"0:00":`${Math.floor(i/60)}:${String(Math.floor(i%60)).padStart(2,"0")}`}function Se(i){return i instanceof Error?i:new Error(String(i))}function on(i,e){return{event:(t,r)=>i?.event?.(t,r),error:(t,r)=>{i?.error?.(t,r),e?.(t,r)}}}import{jsx as an,jsxs as Da}from"react/jsx-runtime";var oe=({variant:i="primary",className:e,type:t="button",children:r,...s})=>{let n=Array.isArray(i)?i:[i];return an("button",{type:t,className:J("gr-player__button",...n.map(o=>`gr-player__button--${o}`),e),...s,children:r})},Be=({variant:i="icon",srLabel:e,children:t,...r})=>Da(oe,{variant:i,...r,children:[t,e&&an("span",{className:"gr-player__sr",children:e})]});import{jsx as Et,jsxs as Xa}from"react/jsx-runtime";var tt=({icon:i,title:e,body:t,detail:r,action:s,className:n,role:o,ariaLive:a})=>Et("div",{className:n,role:o,"aria-live":a,children:Xa("div",{className:"gr-player__state-message",children:[Et("div",{className:"gr-player__state-icon",children:i}),Et("h2",{children:e}),Et("p",{children:t}),r&&Et("span",{className:"gr-player__sr",children:r}),s]})});import{jsx as ln}from"react/jsx-runtime";var yi=({message:i})=>ln("div",{className:"gr-player__error",role:"alert",children:ln("span",{className:"gr-player__error-text",children:i})});import{jsx as cn}from"react/jsx-runtime";var xi=({title:i,body:e,detail:t,action:r})=>cn(tt,{icon:cn(Ws,{}),title:i,body:e,detail:t,action:r,className:"gr-player__error-screen",role:"alert",ariaLive:"assertive"});import{jsx as hn}from"react/jsx-runtime";var bi=()=>hn("div",{className:"gr-player__loader",role:"status","aria-live":"polite",children:hn("div",{className:"gr-player__spinner"})});import{forwardRef as ic,useImperativeHandle as sc,useRef as Qn}from"react";import{createContext as Ha,useContext as Va}from"react";var un=Ha(null),vi=un.Provider,N=()=>{let i=Va(un);if(!i)throw new Error("usePlayerContext must be used within a PlayerProvider");return i};var Ua=`
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`,Wa=`
uniform float uOpacity;
void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, uOpacity); }`,Ya=`
attribute vec3 grid;
varying vec3 vGrid;
void main() {
    vGrid = grid;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,pn=`
uniform vec3 uColor;
uniform float uOpacity;
varying vec3 vGrid;
vec4 muted(float alpha) {
    float grey = dot(uColor, vec3(0.2126, 0.7152, 0.0722));
    return vec4(mix(uColor, vec3(grey), ${.3.toFixed(3)}), uOpacity * alpha * ${.8.toFixed(3)});
}`,qa=`${pn}
void main() {
    vec2 cells = vec2(vGrid.x / max(vGrid.z, 1e-5), vGrid.y) / ${.25.toFixed(3)};
    vec2 cellsPerPixel = fwidth(cells);
    vec2 toLine = abs(fract(cells + 0.5) - 0.5);
    float halfLine = ${(.5*.005/.25).toFixed(4)};
    vec2 onLine = 1.0 - smoothstep(vec2(halfLine), halfLine + cellsPerPixel, toLine);
    float moire = 1.0 - smoothstep(0.2, 0.5, max(cellsPerPixel.x, cellsPerPixel.y));
    float lines = max(onLine.x, onLine.y) * moire * ${.7.toFixed(3)};
    gl_FragColor = muted(max(lines, ${.3.toFixed(3)}));
}`,Za=`${pn}
void main() {
    gl_FragColor = muted(${.4.toFixed(3)});
}`,rt=class{#e;#t;#r;#i;#s;#o;#n;#l;#a=null;#c=null;#h=null;#u=!1;constructor(e){this.#e=e,this.#t=new e.Scene,this.#r=new e.PerspectiveCamera,this.#r.matrixAutoUpdate=!1,this.#i=new e.Mesh(new e.PlaneGeometry(2,2),new e.ShaderMaterial({uniforms:{uOpacity:{value:0}},vertexShader:Ua,fragmentShader:Wa,transparent:!0,depthTest:!1,depthWrite:!1})),this.#i.frustumCulled=!1,this.#i.renderOrder=10,this.#i.visible=!1;let t=new e.BufferGeometry;t.setAttribute("position",new e.BufferAttribute(new Float32Array(0),3)),this.#s=new e.Mesh(t,new e.MeshBasicMaterial({transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,side:e.DoubleSide})),this.#s.frustumCulled=!1,this.#s.visible=!1;let r={value:new e.Color},s=()=>{let n={uOpacity:{value:0},uColor:r},o=l=>new e.ShaderMaterial({uniforms:n,vertexShader:Ya,fragmentShader:l,transparent:!0,depthTest:!1,depthWrite:!1,side:e.DoubleSide}),a=new e.Mesh(new e.BufferGeometry,[o(qa),o(Za)]);return a.matrixAutoUpdate=!1,a.frustumCulled=!1,a.visible=!1,a};this.#o=s(),this.#o.renderOrder=11,this.#s.renderOrder=12,this.#t.add(this.#i,this.#o,this.#s),this.#l=s(),this.#n=new e.Scene,this.#n.add(this.#l)}init(e){this.#c=new this.#e.WebGLRenderer({context:e,canvas:e.canvas}),this.#c.autoClear=!1,this.#h=new this.#e.WebGLRenderTarget(1,1),this.#c.setRenderTarget(this.#h),this.#c.setRenderTarget(null)}sync(e){let t=e.darkness;this.#i.visible=t>.002,this.#i.material.uniforms.uOpacity.value=t;let r=e.outline;this.#s.visible=r[3]>.002,this.#s.visible&&(this.#s.material.opacity=r[3],this.#f(this.#s.material.color,r),this.#g(e.ribbon(.01))),this.#p(e),this.#u=this.#i.visible||this.#s.visible||this.#o.visible}renderUnderlay(e,t,r,s,n,o,a){this.#l.visible&&this.#m(this.#n,e,t,r,s,n,o,a)}renderEye(e,t,r,s,n,o,a){this.#u&&this.#m(this.#t,e,t,r,s,n,o,a)}dispose(){this.#i.geometry.dispose(),this.#i.material.dispose(),this.#s.geometry.dispose(),this.#s.material.dispose();for(let e of[this.#o,this.#l]){e.geometry.dispose();for(let t of e.material)t.dispose()}this.#a=null,this.#c?.dispose(),this.#c=null,this.#h?.dispose(),this.#h=null,this.#u=!1}#m(e,t,r,s,n,o,a,l){let c=this.#c;if(!c)return;let h=this.#r;h.projectionMatrix.fromArray(s.projectionMatrix),h.projectionMatrixInverse.copy(h.projectionMatrix).invert(),h.matrix.fromArray(s.transform.matrix),h.matrixWorld.copy(h.matrix),h.matrixWorldInverse.fromArray(s.transform.inverse.matrix),c.resetState(),c.setRenderTargetFramebuffer(this.#h,r),c.setRenderTarget(this.#h),c.setViewport(n,o,a,l),c.render(e,h),c.resetState(),t.bindFramebuffer(t.FRAMEBUFFER,r)}#p(e){let t=e.surface,r=t[3]>.002?e.mesh:null,s=r?t[3]:0;if(this.#d(this.#o,s*e.aboveSplats),this.#d(this.#l,s*(1-e.aboveSplats)),!!r){if(this.#f(this.#o.material[0].uniforms.uColor.value,t),r!==this.#a){this.#a=r;let n=this.#e,o=new n.BufferGeometry;o.setAttribute("position",new n.BufferAttribute(r.positions,3)),o.setAttribute("grid",new n.BufferAttribute(r.grid,3)),o.setIndex(new n.BufferAttribute(r.indices,1)),o.addGroup(0,r.capStart,0),o.addGroup(r.capStart,r.indices.length-r.capStart,1);for(let a of[this.#o,this.#l])a.geometry.dispose(),a.geometry=o}this.#o.matrix.fromArray(e.meshMatrix),this.#l.matrix.fromArray(e.meshMatrix)}}#d(e,t){e.visible=t>.002,e.material[0].uniforms.uOpacity.value=t}#f(e,t){e.setRGB(t[0],t[1],t[2],this.#e.LinearSRGBColorSpace)}#g(e){let t=this.#s.geometry,r=t.getAttribute("position");r.array.length<e.length?(t.dispose(),t.setAttribute("position",new this.#e.BufferAttribute(e.slice(),3))):(r.array.set(e),r.needsUpdate=!0),t.setDrawRange(0,e.length/3)}};import{signal as Me}from"@preact/signals-core";import{Container as Q,Fullscreen as Ja,Svg as Ve,Text as Pr}from"@react-three/uikit";import{signal as He}from"@preact/signals-core";import{forwardHtmlEvents as ja}from"@pmndrs/pointer-events";import{createRoot as Qa}from"@react-three/fiber";var Mr=class{#e;#t;#r;#i;#s;#o;#n=null;#l=null;#a;#c;#h=null;#u=null;#m=null;#p=!1;#d=!1;#f=!1;#g=!1;#b;#y;#x;#v;#w;#M;constructor(e,{pixelWidth:t,pixelHeight:r,worldWidth:s,worldHeight:n,cursorFactory:o,react:a=!1}){this.#s=e,this.#o=o,this.#p=a,this.#e=t*2,this.#t=r*2,this.#r=document.createElement("canvas"),this.#r.width=this.#e,this.#r.height=this.#t,this.#i=new e.WebGLRenderer({canvas:this.#r,alpha:!0,antialias:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.#i.setClearColor(0,0),this.#i.setSize(this.#e,this.#t,!1),this.#a=new e.Scene,this.#c=new e.OrthographicCamera(0,t,r,0,.1,10),this.#c.position.z=5,this.#b=new e.Raycaster,this.#y=new e.Vector3,this.#x=new e.Vector3,this.#v=new e.Quaternion,this.#w=new e.Mesh(new e.PlaneGeometry(s,n),new e.MeshBasicMaterial({visible:!1,side:e.DoubleSide}));let l=new e.SphereGeometry(.008,8,8),c=()=>new e.MeshBasicMaterial({color:65280,depthTest:!1});this.#M=[0,1].map(()=>{let h=new e.Mesh(l,c());return h.renderOrder=1001,h.visible=!1,h})}get canvas(){return this.#r}get scene(){return this.#a}get pixelWidth(){return this.#e/2}get pixelHeight(){return this.#t/2}get internalWidth(){return this.#e}get internalHeight(){return this.#t}get pointer(){return this.#n}get cursor(){return this.#l?.mesh??null}get ptrPressed(){return this.#d}get reactPending(){return this.#p}get hitMesh(){return this.#w}get hitSpheres(){return this.#M}async mountReact(e){this.#h=Qa(this.#r),await this.#h.configure({frameloop:"never",orthographic:!0,size:{width:this.#e/2,height:this.#t/2},dpr:2,gl:this.#i,events:()=>({enabled:!1,priority:0,handlers:{}})}),this.#u=this.#h.render(e),this.#a=this.#u.getState().scene,this.#m=ja(this.#r,()=>this.#u.getState().camera,this.#a,{batchEvents:!1}),this.#p=!1}patchCanvasForXR(){let e=this.pixelWidth,t=this.pixelHeight;this.#r.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,right:e,bottom:t,width:e,height:t,toJSON(){}});let r=new Set;this.#r.setPointerCapture=s=>r.add(s),this.#r.releasePointerCapture=s=>r.delete(s),this.#r.hasPointerCapture=s=>r.has(s)}setPointer(e,t,r,s=!1){if(!this.#n){if(!this.#a)return;this.#n={x:e,y:t,pressed:r};let c=this.#o(this.#s);c.position.z=.06,this.#a.add(c),this.#l={mesh:c,sx:e,sy:this.pixelHeight-t}}let n=this.#n;n.x=e,n.y=t,n.pressed=r;let o=this.#l,a=this.pixelHeight-t,l=o.mesh.visible?.6:1;o.sx+=(e-o.sx)*l,o.sy+=(a-o.sy)*l,o.mesh.visible=!0,this.#u?o.mesh.position.set(o.sx-this.pixelWidth/2,o.sy-this.pixelHeight/2,.06):o.mesh.position.set(o.sx,o.sy,.06),o.mesh.material.opacity=r?1:.7,s&&this.#S(e,t,r)}clearPointer(e=!1){e&&this.#n&&(this.#f?this.#g=!0:this.#_()),this.#n=null,this.#l&&(this.#l.mesh.visible=!1)}renderScene(){this.#p||(this.#m?.update(),this.#u?this.#u.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#a,this.#c))}clampAlpha(e){let t=this.#i.getContext();t.colorMask(!1,!1,!1,!0),t.clearColor(0,0,0,e),t.clear(t.COLOR_BUFFER_BIT),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0)}initFlat(){let e=!1,t=r=>{let s=this.#r.getBoundingClientRect();return{x:(r.clientX-s.left)/s.width*this.pixelWidth,y:(r.clientY-s.top)/s.height*this.pixelHeight}};this.#r.addEventListener("pointerdown",r=>{e=!0,this.#r.setPointerCapture(r.pointerId);let s=t(r);this.setPointer(s.x,s.y,!0)}),this.#r.addEventListener("pointermove",r=>{let s=t(r);this.setPointer(s.x,s.y,e)}),this.#r.addEventListener("pointerup",r=>{e=!1;let s=t(r);this.setPointer(s.x,s.y,!1)}),this.#r.addEventListener("pointerleave",()=>{e=!1,this.clearPointer()})}renderFlat(){this.#p||(this.#m?.update(),this.#u?this.#u.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#a,this.#c))}castRay(e,t){let r=e.rayTransform.position,s=e.rayTransform.orientation;return this.#y.set(r.x,r.y,r.z),this.#x.set(0,0,-1).applyQuaternion(this.#v.set(s.x,s.y,s.z,s.w)),this.rayHitQuad(this.#y,this.#x,t)}rayHitQuad(e,t,r=0){let s=this.pixelWidth,n=this.pixelHeight,o=this.#M[r];this.#b.ray.origin.copy(e),this.#b.ray.direction.copy(t);let a=this.#b.intersectObject(this.#w);if(a.length===0)return o.visible=!1,null;let l=a[0].point,c=a[0].uv;if(!c)return o.visible=!1,null;let h=c.x*s,u=(1-c.y)*n;return h<0||h>s||u<0||u>n?(o.visible=!1,null):(o.position.copy(l),o.visible=!0,o.updateMatrixWorld(!0),{x:h,y:u})}gazeHitsQuad(e,t){if(!e?.transform)return!0;let r=e.transform.position,s=e.transform.orientation,n=-2*(s.w*s.y+s.x*s.z),o=-2*(s.y*s.z-s.w*s.x),a=2*(s.x*s.x+s.y*s.y)-1,l=t||this.#w.position,c=l.x-r.x,h=l.y-r.y,u=l.z-r.z,p=Math.sqrt(c*c+h*h+u*u)||1;return(n*c+o*h+a*u)/p>.6}dispose(){this.#m?.destroy(),this.#m=null,this.#h&&(this.#h.unmount(),this.#h=null,this.#u=null),this.#i?.dispose(),this.#i=null}#S(e,t,r){let s=this.#d;this.#d=r;let n={clientX:e,clientY:t,pointerId:1,pointerType:"mouse",isPrimary:!0};this.#f=!0,r&&!s&&this.#r.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1,bubbles:!0})),this.#r.dispatchEvent(new PointerEvent("pointermove",{...n,buttons:r?1:0,bubbles:!0})),!r&&s&&this.#r.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0,bubbles:!0})),this.#f=!1,this.#g&&(this.#g=!1,this.#_())}#_(){let e={pointerId:1,pointerType:"mouse",isPrimary:!0};this.#d&&this.#r.dispatchEvent(new PointerEvent("pointerup",{...e,button:0,buttons:0,bubbles:!0})),this.#r.dispatchEvent(new PointerEvent("pointerleave",{...e,bubbles:!1})),this.#d=!1}};var $a=`attribute vec2 a_pos;
varying vec2 v_uv;
uniform mat4 u_mvp;
void main() {
    v_uv = a_pos + 0.5;
    gl_Position = u_mvp * vec4(a_pos, 0.0, 1.0);
}`,Ka=`precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_alpha;
void main() {
    vec4 c = texture2D(u_tex, v_uv);
    gl_FragColor = vec4(c.rgb, c.a * u_alpha);
}`,Tr=class{#e=null;#t=null;#r=null;#i=!1;#s=null;#o=null;#n=null;#l=null;#a=null;#c=null;#h=null;#u=null;#m;#p;#d;#f;#g;#b;#y;#x;#v;#w;#M;constructor(e,{worldWidth:t,worldHeight:r,internalWidth:s,internalHeight:n,canvas:o}){this.#v=t,this.#w=r,this.#y=s,this.#x=n,this.#M=o,this.#m=new e.Matrix4,this.#p=new e.Matrix4,this.#d=new e.Matrix4,this.#f=new e.Vector3,this.#g=new e.Quaternion,this.#b=new e.Vector3(t,r,1)}get projected(){return this.#i}get layer(){return this.#t}get pose(){return this.#s??null}async init(e,t,r,s){if(this.#e=s,t)try{return this.#r=t,this.#t=t.createQuadLayer({space:r,viewPixelWidth:this.#y,viewPixelHeight:this.#x,layout:"mono",isStatic:!1,width:this.#v/2,height:this.#w/2}),this.stash(),this.#t}catch{this.#t=null,this.#r=null}return this.#i=!0,this.#S(s),null}stash(){this.#o=null,this.#t&&(this.#t.transform=new XRRigidTransform({x:0,y:-1e3,z:0},{x:0,y:0,z:0,w:1}))}setTransform(e){this.#s=e,this.#o=e}applyPose(e,t,r,s,n,o,a){let l=new XRRigidTransform({x:e,y:t,z:r},{x:s,y:n,z:o,w:a});this.#s=l,this.#o=l}upload(e){this.#t?(this.#o&&(this.#t.transform=this.#o,this.#o=null),this.#_(e,this.#r.getSubImage(this.#t,e)?.colorTexture)):(this.#_(e,this.#c),this.#o=null)}renderEye(e,t,r,s,n,o,a,l){if(!this.#i||!l||!this.#s)return;let c=this.#s.position,h=this.#s.orientation;this.#f.set(c.x,c.y,c.z),this.#g.set(h.x,h.y,h.z,h.w),this.#m.compose(this.#f,this.#g,this.#b),this.#d.fromArray(t.transform.inverse.matrix),this.#p.multiplyMatrices(this.#d,this.#m),this.#d.fromArray(t.projectionMatrix),this.#p.premultiply(this.#d),e.viewport(r,s,n,o),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(this.#n),e.uniformMatrix4fv(this.#h,!1,this.#p.elements),e.uniform1f(this.#u,a),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.#c),e.bindVertexArray(this.#l),e.drawArrays(e.TRIANGLES,0,6),e.bindVertexArray(null),e.disable(e.BLEND),e.useProgram(null)}dispose(){let e=this.#e;e&&this.#i&&(this.#n&&e.deleteProgram(this.#n),this.#l&&e.deleteVertexArray(this.#l),this.#a&&e.deleteBuffer(this.#a),this.#c&&e.deleteTexture(this.#c)),this.#t=this.#r=this.#e=null,this.#n=this.#l=this.#a=this.#c=null}#S(e){let t=e.createShader(e.VERTEX_SHADER);e.shaderSource(t,$a),e.compileShader(t);let r=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(r,Ka),e.compileShader(r),this.#n=e.createProgram(),e.attachShader(this.#n,t),e.attachShader(this.#n,r),e.linkProgram(this.#n),e.deleteShader(t),e.deleteShader(r),this.#h=e.getUniformLocation(this.#n,"u_mvp"),this.#u=e.getUniformLocation(this.#n,"u_alpha"),e.useProgram(this.#n),e.uniform1i(e.getUniformLocation(this.#n,"u_tex"),0),e.uniform1f(this.#u,1);let s=e.getAttribLocation(this.#n,"a_pos");this.#l=e.createVertexArray(),e.bindVertexArray(this.#l),this.#a=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.#a),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-.5,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5]),e.STATIC_DRAW),e.enableVertexAttribArray(s),e.vertexAttribPointer(s,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),this.#c=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.#c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.#y,this.#x,0,e.RGBA,e.UNSIGNED_BYTE,null),e.generateMipmap(e.TEXTURE_2D)}#_(e,t){if(!t)return;let r=this.#e,s=!this.#i;r.bindTexture(r.TEXTURE_2D,t),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,this.#i?r.LINEAR_MIPMAP_LINEAR:r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!0),s&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,this.#M),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),s&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this.#i&&r.generateMipmap(r.TEXTURE_2D)}};function _i(i,e,t){let r=Math.sqrt(i*i+e*e+t*t)||1,s=Math.atan2(i/r,t/r)+Math.PI,n=Math.asin(e/r),o=s/2,a=n/2,l=Math.cos(o),c=Math.sin(o),h=Math.cos(a),u=Math.sin(a);return{qx:l*u,qy:c*h,qz:-c*u,qw:l*h}}var wi=class{#e;#t;#r;#i;#s;#o;#n;constructor(e,t,r){let{qx:s,qy:n,qz:o,qw:a}=_i(0,r,-t);this.#e=new e.Vector3(0,r,-t),this.#t=new e.Quaternion(s,n,o,a),this.#r=this.#e.clone(),this.#i=this.#t.clone(),this.#s=new e.Vector3,this.#o=new e.Quaternion,this.#n=new e.Vector3(0,1,0)}reset(){this.#r.copy(this.#e),this.#i.copy(this.#t)}remember(e,{position:t,orientation:r}){let s=this.#l(e).invert();this.#r.set(t.x,t.y,t.z).sub(this.#s).applyQuaternion(s),this.#i.set(r.x,r.y,r.z,r.w).premultiply(s)}place(e){let t=this.#l(e),r=this.#r.clone().applyQuaternion(t).add(this.#s),s=this.#i.clone().premultiply(t);return{x:r.x,y:r.y,z:r.z,qx:s.x,qy:s.y,qz:s.z,qw:s.w}}#l(e){let t=e.transform.position,r=e.transform.orientation,s=Math.atan2(2*(r.x*r.z+r.w*r.y),1-2*(r.x*r.x+r.y*r.y));return this.#s.set(t.x,t.y,t.z),this.#o.setFromAxisAngle(this.#n,s)}},it=class{#e;#t;#r=!1;#i=!1;#s;#o=null;#n=null;#l=!1;#a=null;#c=!1;#h=!1;#u=!1;alpha=1;onDragTick=null;onDragEnd=null;constructor(e,t){this.#s=new wi(e,t.quadZ??.5,t.quadY??-.5),this.#e=new Mr(e,t),this.#t=new Tr(e,{worldWidth:t.worldWidth,worldHeight:t.worldHeight,internalWidth:this.#e.internalWidth,internalHeight:this.#e.internalHeight,canvas:this.#e.canvas})}get canvas(){return this.#e.canvas}get scene(){return this.#e.scene}get pixelWidth(){return this.#e.pixelWidth}get pixelHeight(){return this.#e.pixelHeight}get hitMesh(){return this.#e.hitMesh}get hitSpheres(){return this.#e.hitSpheres}get pointer(){return this.#e.pointer}get cursor(){return this.#e.cursor}async mountReact(e){return this.#e.mountReact(e)}rayHitQuad(e,t,r){return this.#e.rayHitQuad(e,t,r)}gazeHitsQuad(e,t){return this.#e.gazeHitsQuad(e,t)}get projected(){return this.#t.projected}get layer(){return this.#t.layer}get pose(){return this.#t.pose}get visible(){return this.#r}get placing(){return this.#i}get session(){return this.#o}get interacting(){return this.#r&&(this.#h||this.#l||this.#u||!!this.#n)}get dragging(){return this.#l}set dragging(e){this.#l=e}get panelDragging(){return this.#u}set panelDragging(e){this.#u=e,e||this.onDragEnd?.()}setPointer(e,t,r){this.#e.setPointer(e,t,r,!!this.#o)}clearPointer(){this.#e.clearPointer(!!this.#o)}initFlat(){this.#r=!0,this.#e.initFlat()}renderFlat(){this.#r&&this.#e.renderFlat()}async init(e,t,r,s){return this.#o=e,this.#e.patchCanvasForXR(),this.#t.init(e,t,r,s)}show(){this.#i=!0}recenter(){this.#s.reset(),this.#r&&this.show()}hide(){this.#e.clearPointer(!!this.#o),this.#l=!1,this.#a=null,this.#n=null,this.#u=!1,this.onDragEnd?.(),this.#r=this.#i=!1;for(let e of this.#e.hitSpheres)e.visible=!1;this.#t.stash()}setTransform(e){this.#t.setTransform(e)}stash(){this.#t.stash()}applyPose(e,t,r,s,n,o,a){this.#t.applyPose(e,t,r,s,n,o,a);let l=this.#e.hitMesh;l.position.set(e,t,r),l.quaternion.set(s,n,o,a),l.updateMatrixWorld(!0)}updatePosition(e){if(!this.#i||!e)return;this.#i=!1,this.#r=!0;let{x:t,y:r,z:s,qx:n,qy:o,qz:a,qw:l}=this.#s.place(e);this.applyPose(t,r,s,n,o,a,l)}drawContent(e){!this.#r||this.#e.reactPending||(this.#e.renderScene(),this.alpha<1&&!this.#t.projected&&this.#e.clampAlpha(this.alpha),this.#t.upload(e))}renderEye(e,t,r,s,n,o){this.#t.renderEye(e,t,r,s,n,o,this.alpha,this.#r)}handleInput(e,t,r){if(!this.#o)return!1;let s=!1,n=!1,o=null,a=null;for(let c of this.#e.hitSpheres)c.visible=!1;for(let[c,h]of[["left",e],["right",t]]){if(h?.menuPressed&&(s=!0),!h?.active||!this.#r||!h.rayTransform||h.held)continue;let u=c==="left"?0:1,p=this.#e.castRay(h,u);if(p){let f={hand:h,hit:p,side:c,trigger:!!h.triggerPressed};c==="left"?o=f:a=f}}let l=!!(o||a);if(this.#u){if(this.#t.pose&&r?.transform&&this.onDragTick){let c=this.onDragTick(e,t,r,this.#a,this.#t.pose);c?(this.applyPose(c.x,c.y,c.z,c.qx,c.qy,c.qz,c.qw),this.#s.remember(r,this.#t.pose)):(this.#u=!1,this.onDragEnd?.())}}else{let c=null;if(this.#n){let h=this.#n==="left"?o:a,u=this.#n==="left"?e:t,p=!!u?.triggerPressed;c=h||(p?{hand:u,hit:null,side:this.#n,trigger:p}:null),p||(this.#n=null)}if(!c){let h=this.#a;c=h==="left"?o||a:h==="right"?a||o:o||a}if(c){this.#a=c.side??this.#a;let h=this.#a==="left"?1:0;if(this.#e.hitSpheres[h].visible=!1,c.hit){let u=this.#e.ptrPressed;this.setPointer(c.hit.x,c.hit.y,c.trigger),c.trigger&&!u&&!this.#n&&(this.#n=this.#a)}else this.#e.pointer?this.setPointer(this.#e.pointer.x,this.#e.pointer.y,c.trigger):this.clearPointer();c.hand?.isTransientPointer&&(n=!0)}else this.clearPointer(),this.#a=null;this.#h=!!(o||a)}return s&&!this.#c&&(this.#r||this.#i?l||this.hide():this.show()),this.#c=s,n}dispose(){this.#r=!1,this.#o=null,this.#e.dispose(),this.#t.dispose()}};var st=class{_quad;_sig=null;onPlayPause=null;onSeek=null;onPresetCycle=null;onExit=null;onClose=null;onSceneNav=null;constructor(e,t){this._quad=new it(e,{...t,react:!0})}get quad(){return this._quad}_createBaseSignals(){return{loadingD:He("none"),contentD:He("flex"),playD:He("flex"),pauseD:He("none"),spinD:He("none"),spinR:He(0),spinFast:He(!1)}}_updatePlayback(e,{loading:t,playing:r,spinning:s,buffering:n,progress:o}){e.loadingD.value=t?"flex":"none",e.contentD.value=t?"none":"flex",e.playD.value=!s&&!r?"flex":"none",e.pauseD.value=!s&&r?"flex":"none",e.spinD.value=s?"flex":"none",e.spinFast.value=s&&!n,this._quad.dragging||this._setProgress(o)}render(e){let t=this._sig;if(!this._quad.visible||!t)return;let r=t.loadingD.value==="flex",s=r?20:t.spinFast.value?14:6;(t.spinD.value==="flex"||r)&&(t.spinR.value-=e*s)}_seekFromEvent(e){this._seekTo(e.point.x+this._quad.pixelWidth/2)}_seekTo(e){}_setProgress(e){}};import{jsx as G,jsxs as Cr}from"react/jsx-runtime";var lt=i=>`data:image/svg+xml,${encodeURIComponent(i)}`,el=lt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#aaaaaa"/></svg>'),tl=lt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#aaaaaa"/></svg>'),rl=lt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#666666"/></svg>'),dn=lt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1 1 2 12L5 12A7 7 0 1 0 12 5Z" fill="#888888"/></svg>'),il=lt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z" fill="#888888"/></svg>'),sl=lt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.6 16.6L10 18l6-6-6-6-1.4 1.4L13.2 12z" fill="#888888"/></svg>'),ot=30,Oe=520,yn=72,Lr=yn+ot,Te=ot+yn/2,fn=14,Rt=40,At=26,nt=6,mn=26,Er=14,Si=Er/2,Rr=20,Mi=Rr/2,kt=50,gn=32,Ti={borderOpacity:.65},at=class extends st{#e=0;#t=0;constructor(e){let r=.86*(Lr/Oe);super(e,{pixelWidth:Oe,pixelHeight:Lr,worldWidth:.86,worldHeight:r,quadY:-.3,cursorFactory:s=>{let n=new s.Mesh(new s.CircleGeometry(4,32),new s.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#r().catch(s=>{})}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:s=!1,progress:n=0,timeText:o="0:00 / 0:00",presetName:a=null,sceneText:l=null,sceneLabel:c=null}){let h=this._sig;if(h&&(this._updatePlayback(h,{loading:e,playing:t,spinning:r,buffering:s,progress:n}),h.timeT.value=o,h.presetT&&a!=null&&(h.presetT.value=a),l!=null&&(h.sceneT.value=l),c!=null)){let u=String(c);h.sceneSub.value=u.length>gn?`${u.slice(0,gn-2)}...`:u}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-this.#e)/this.#t));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=this.#t*e;t.fillW.value=Math.max(.001,r),t.thumbL.value=this.#e+r-Si,t.thumbGlowL.value=this.#e+r-Mi}async#r(){let e=this._quad,t=fn,r=Te-Rt/2,s=Oe-fn-At,n=Te-At/2,o=s-10,a=66,l=24,c=o-a,h=Te-l/2;o=c-8;let u=78,p=o-u,f=Te-9,g=this.#e=t+Rt+12,d=this.#t=p-10-g,m=this._sig={...this._createBaseSignals(),fillW:Me(.001),thumbL:Me(g-Si),thumbGlowL:Me(g-Mi),thumbS:Me(1),thumbGlowOp:Me(0),timeT:Me("0:00 / 0:00"),sceneT:Me("1/1"),sceneSub:Me("SCENE"),presetT:Me("Off")},x=()=>{m.thumbGlowOp.value=.5,m.thumbS.value=1.15},b=()=>{e.dragging||(m.thumbGlowOp.value=0,m.thumbS.value=1)},y=T=>{T.target.setPointerCapture(T.pointerId),e.dragging=!0,this._seekFromEvent(T)},v=T=>{e.dragging&&this._seekFromEvent(T)},_=()=>{e.dragging=!1,m.thumbGlowOp.value=0,m.thumbS.value=1},w={backgroundColor:1710618},P=Cr(Ja,{backgroundColor:657930,backgroundOpacity:.88,children:[Cr(Q,{positionType:"absolute",positionLeft:0,positionTop:0,width:Oe,height:Lr,display:m.contentD,borderWidth:1,borderColor:3355443,borderOpacity:.3,children:[G(Q,{positionType:"absolute",positionLeft:0,positionTop:0,width:kt,height:ot,hover:w,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(-1),children:G(Ve,{src:il,width:18,height:18,pointerEvents:"none"})}),Cr(Q,{positionType:"absolute",positionLeft:kt,positionTop:0,width:Oe-kt*2,height:ot,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,overflow:"hidden",children:[G(Pr,{fontSize:13,color:11184810,children:m.sceneT}),G(Pr,{fontSize:10,color:6710886,children:m.sceneSub})]}),G(Q,{positionType:"absolute",positionLeft:Oe-kt,positionTop:0,width:kt,height:ot,hover:w,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(1),children:G(Ve,{src:sl,width:18,height:18,pointerEvents:"none"})}),G(Q,{positionType:"absolute",positionLeft:0,positionTop:ot,width:Oe,height:.5,backgroundColor:3355443,backgroundOpacity:.5,pointerEvents:"none"}),Cr(Q,{positionType:"absolute",positionLeft:t,positionTop:r,width:Rt,height:Rt,borderRadius:Rt/2,borderWidth:1,borderColor:4473924,borderOpacity:.5,hover:Ti,alignItems:"center",justifyContent:"center",onClick:()=>this.onPlayPause?.(),children:[G(Ve,{display:m.playD,src:el,width:20,height:20,marginLeft:2,pointerEvents:"none"}),G(Ve,{display:m.pauseD,src:tl,width:18,height:18,pointerEvents:"none"}),G(Ve,{display:m.spinD,src:dn,width:24,height:24,transformRotateZ:m.spinR,pointerEvents:"none"})]}),G(Q,{positionType:"absolute",positionLeft:g,positionTop:Te-mn/2,width:d,height:mn,onPointerEnter:x,onPointerLeave:b,onPointerDown:y,onPointerMove:v,onPointerUp:_}),G(Q,{positionType:"absolute",positionLeft:g,positionTop:Te-nt/2,width:d,height:nt,borderRadius:nt/2,backgroundColor:2236962,backgroundOpacity:.8,pointerEvents:"none"}),G(Q,{positionType:"absolute",positionLeft:g,positionTop:Te-nt/2,width:m.fillW,height:nt,borderRadius:nt/2,backgroundColor:7829367,zIndexOffset:1,pointerEvents:"none"}),G(Q,{positionType:"absolute",positionLeft:m.thumbGlowL,positionTop:Te-Rr/2,width:Rr,height:Rr,borderRadius:Mi,borderWidth:2,borderColor:10066329,borderOpacity:m.thumbGlowOp,zIndexOffset:2,pointerEvents:"none"}),G(Q,{positionType:"absolute",positionLeft:m.thumbL,positionTop:Te-Er/2,width:Er,height:Er,borderRadius:Si,backgroundColor:11184810,transformScaleX:m.thumbS,transformScaleY:m.thumbS,zIndexOffset:3,pointerEvents:"none"}),G(Q,{positionType:"absolute",positionLeft:p,positionTop:f,width:u,height:18,alignItems:"center",justifyContent:"center",children:G(Pr,{fontSize:13,color:16777215,opacity:.35,children:m.timeT})}),G(Q,{positionType:"absolute",positionLeft:s,positionTop:n,width:At,height:At,borderRadius:At/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:Ti,alignItems:"center",justifyContent:"center",onClick:()=>this.onExit?.(),children:G(Ve,{src:rl,width:11,height:11,pointerEvents:"none"})}),G(Q,{positionType:"absolute",positionLeft:c,positionTop:h,width:a,height:l,borderRadius:l/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:Ti,alignItems:"center",justifyContent:"center",onClick:()=>this.onPresetCycle?.(),children:G(Pr,{fontSize:11,color:10066329,pointerEvents:"none",children:m.presetT})})]}),G(Q,{positionType:"absolute",positionLeft:0,positionTop:0,width:Oe,height:Lr,backgroundColor:657930,backgroundOpacity:1,display:m.loadingD,alignItems:"center",justifyContent:"center",children:G(Ve,{src:dn,width:40,height:40,transformRotateZ:m.spinR,pointerEvents:"none"})})]});await e.mountReact(P)}};var ct=class{#e;#t;#r=null;#i=null;#s;#o;#n;#l;constructor(e,t){this.#e=e,this.#t=t;let r=t.scene,s=new e.BufferGeometry().setFromPoints([new e.Vector3(0,0,0),new e.Vector3(0,0,-5)]),n=new e.SphereGeometry(.015,6,6);this.#s=new e.MeshBasicMaterial({color:16711680,depthTest:!1}),this.#o=new e.MeshBasicMaterial({color:65280,depthTest:!1});let o=()=>{let a=new e.Group,l=new e.Group,c=new e.Line(s,new e.LineBasicMaterial({color:5227511,transparent:!0,opacity:.5,depthTest:!1}));c.visible=!1,a.add(c);let h=new e.Mesh(n,this.#s),u=new e.Mesh(n,this.#s);return h.renderOrder=u.renderOrder=999,h.visible=u.visible=!1,r.add(a,l,h,u),{ray:a,grip:l,line:c,idxSphere:h,thmSphere:u}};this.#n=o(),this.#l=o()}update(e,t){this.#a(),this.#c(this.#n,e),this.#c(this.#l,t)}dispose(){this.#r&&(this.#t.anchor.remove(this.#r),this.#r.geometry.dispose(),this.#r.material.dispose());for(let e of[this.#n,this.#l])e.line.material.dispose(),e.idxSphere.geometry.dispose(),e.thmSphere.geometry.dispose();this.#s.dispose(),this.#o.dispose()}#a(){let e=this.#t.bboxMesh;if(e===this.#i)return;this.#i=e;let t=this.#t.anchor;if(this.#r&&(t.remove(this.#r),this.#r.geometry.dispose(),this.#r.material.dispose(),this.#r=null),!e)return;let r=this.#e;this.#r=new r.LineSegments(new r.EdgesGeometry(e.geometry),new r.LineBasicMaterial({color:58879,transparent:!0,opacity:.35,depthTest:!1})),this.#r.position.copy(e.position),t.add(this.#r)}#c(e,t){if(t.rayTransform&&this.#h(e.ray,t.rayTransform),t.gripTransform&&this.#h(e.grip,t.gripTransform),e.line.visible=t.active,e.idxSphere.visible=e.thmSphere.visible=!1,!t.active)return;t.indexTip&&(e.idxSphere.position.set(t.indexTip.x,t.indexTip.y,t.indexTip.z),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0)),t.thumbTip&&(e.thmSphere.position.set(t.thumbTip.x,t.thumbTip.y,t.thumbTip.z),e.thmSphere.visible=!0,e.thmSphere.updateMatrixWorld(!0)),t.indexTip||(e.idxSphere.position.copy(e.grip.position),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0));let r=t.gripping?this.#o:this.#s;e.idxSphere.material=r,t.thumbTip&&(e.thmSphere.material=r)}#h(e,t){let r=t.position,s=t.orientation;e.position.set(r.x,r.y,r.z),e.quaternion.set(s.x,s.y,s.z,s.w),e.updateMatrixWorld(!0)}};import{signal as A}from"@preact/signals-core";import{Container as k,Fullscreen as nl,Image as ol,Svg as U,Text as $}from"@react-three/uikit";import{jsx as S,jsxs as le}from"react/jsx-runtime";var O=9684710,ae=1122603,al=661021,ll=2636615,cl=4086636,D=680,We=248,fe=34,Re=48,Ce=fe+Re,Tn=Re,It=26,Ue=We+Tn,xn=32,j=88,Ee=60,Ge=We-Ee,Pe=(D-j)/7,ve=Math.round(D/3),Pn=12,H=34,ee=j+Pn,ut=D-j-Pn*2,Le=Ce+50,Li=ut-H,ze=24,Ar=18,Ln=ee+ze,Cn=Li-ze*2,bn={phase:"off",start:0,end:1,gap:0},Ft=(i,e)=>e?Ln+Cn*i:ee+Li*i,Pi=(i,e)=>M.clamp01((i-(e?Ln:ee))/(e?Cn:Li)),vn=i=>Ft(i,!0)-ze,wn=i=>Ft(i,!0)+H,q=(i,e="#93c6e6")=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${i}" fill="${e}"/></svg>`),hl="data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${ut*2}" height="${H*2}" viewBox="0 0 ${ut} ${H}"><defs><pattern id="h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1.5" height="6" fill="#93c6e6" fill-opacity="0.2"/></pattern></defs><rect width="100%" height="100%" fill="#0a161d"/><rect width="100%" height="100%" fill="url(#h)"/></svg>`),_n="M8.76 21.6 7.221 20.1177 8.949 18.4235H8.76c-2.106 0-3.8925-.7191-5.3595-2.1573C1.9335 14.8279 1.2 13.0765 1.2 11.0118s.7335-3.81621 2.2005-5.25444C4.8675 4.31912 6.654 3.60001 8.76 3.60001h6.48c2.106 0 3.8925.71911 5.3595 2.15735C22.0665 7.19559 22.8 8.94707 22.8 11.0118s-.7335 3.8161-2.2005 5.2544c-1.467 1.4382-3.2535 2.1573-5.3595 2.1573v-2.1176c1.494 0 2.7675-.5162 3.8205-1.5485 1.053-1.0324 1.5795-2.2809 1.5795-3.7456s-.5265-2.71326-1.5795-3.74562c-1.053-1.03235-2.3265-1.54853-3.8205-1.54853H8.76c-1.494 0-2.7675.51618-3.8205 1.54853C3.8865 8.29854 3.36 9.54707 3.36 11.0118s.5265 2.722 1.5795 3.772c1.053 1.05 2.3265 1.628 3.8205 1.7339h.432l-1.944-1.9059 1.512-1.4824 4.32 4.2353L8.76 21.6Z",W={play:q("M8 5v14l11-7z"),pause:q("M6 4h4v16H6zm8 0h4v16h-4z"),spin:q("M12 2a10 10 0 1 1-10 10h3a7 7 0 1 0 7-7z"),bulb:q("M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"),mute:q("M7 9v6h4l5 5V4l-5 5H7z"),vol:q("M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"),loop:q(_n),loopOn:q(_n,"#11212b"),reset:q("M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"),exit:q("M17 7l-1.4 1.4L18.2 11H8v2h10.2l-2.6 2.6L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"),grip:q("M15.5 15.4V8.6L18.9 12l-3.4 3.4zM8.5 8.6v6.8L5.1 12l3.4-3.4z"),close:q("M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"),scale:q("M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z"),lock:q("M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"),unlk:q("M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"),arrL:q("M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"),arrR:q("M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z")},ht={backgroundColor:1849416},Sn=.9,ul=-.55,Mn=.866,pt=class extends st{#e;#t=null;#r=bn;#i=null;#s=null;#o;#n;onMuteToggle=null;onScaleLockToggle=null;onLockToggle=null;onReset=null;onAbLoopToggle=null;onAbLoopSet=null;constructor(e){super(e,{pixelWidth:D,pixelHeight:Ue,worldWidth:1,worldHeight:Ue/D,quadZ:Sn,quadY:ul,cursorFactory:t=>{let r=new t.Mesh(new t.CircleGeometry(5,32),new t.MeshBasicMaterial({color:O,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return r.renderOrder=999,r}}),this.#e=e,this.#o=new e.Vector3,this.#n=new e.Quaternion,this._quad.alpha=.9,this._quad.onDragTick=(t,r,s,n,o)=>this.#l(t,r,s,n,o),this._quad.onDragEnd=()=>{this.#t=null,this._quad.alpha=.9},this.#u().catch(t=>{})}#l(e,t,r,s,n){let o=this.#e,a=this.#t,l=a?.side??s??"right",c=l==="left"?e:t;if(!c?.triggerPressed)return this.#t=null,null;let h=c.rayTransform?.orientation;if(!h){let _=n.position,w=n.orientation;return{x:_.x,y:_.y,z:_.z,qx:w.x,qy:w.y,qz:w.z,qw:w.w}}let u=this.#o.set(0,0,-1).applyQuaternion(this.#n.set(h.x,h.y,h.z,h.w));if(!a){let _=r.transform.position,w=new o.Vector3(_.x,_.y,_.z),P=n.position,T=new o.Vector3(P.x,P.y,P.z).sub(w);this.#t={side:l,R:T.length()||Sn,oQ:new o.Quaternion().setFromUnitVectors(u.clone(),T.normalize()),eye:w};let R=n.orientation;return{x:P.x,y:P.y,z:P.z,qx:R.x,qy:R.y,qz:R.z,qw:R.w}}if(u.applyQuaternion(a.oQ),Math.abs(u.y)>Mn){u.y=Math.sign(u.y)*Mn;let _=Math.sqrt(u.x*u.x+u.z*u.z)||1e-6,w=Math.sqrt(1-u.y*u.y)/_;u.x*=w,u.z*=w}let p=a.eye,f=a.R,g=p.x+u.x*f,d=p.y+u.y*f,m=p.z+u.z*f,{qx:x,qy:b,qz:y,qw:v}=_i(u.x,u.y,u.z);return{x:g,y:d,z:m,qx:x,qy:b,qz:y,qw:v}}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:s=!1,progress:n=0,timeText:o="0:00 / 0:00",presetName:a=null,muted:l=!1,locked:c=!1,scaleLocked:h=!0,abLoop:u=bn,sceneText:p=null,sceneLabel:f=null,bannerText:g=null}){let d=this._sig;if(!d)return;u.phase!=="active"&&(this.#s=null),u.phase!=="setB"&&(this.#i=null);let m=this.#s;if(this.#r=m?{...u,start:m.start,end:m.end}:u,this._updatePlayback(d,{loading:e,playing:t,spinning:r,buffering:s,progress:n}),this.#c(d),d.playTextD.value=r?"none":"flex",d.playLbl.value=t?"PAUSE":"PLAY",d.timeT.value=o,a!=null&&(d.presetT.value=a),d.icA.value=l?"none":"flex",d.icB.value=l?"flex":"none",d.muteLbl.value=l?"UNMUTE":"MUTE",d.sclLkLbl.value=h?"UNLOCK SCALE":"LOCK SCALE",d.lockA.value=c?"none":"flex",d.lockB.value=c?"flex":"none",d.lockLbl.value=c?"UNLOCK SCENE":"LOCK SCENE",p!=null&&(d.sceneT.value=p),f!=null){let x=String(f);d.sceneSub.value=x.length>xn?`${x.slice(0,xn-2)}...`:x}g!=null&&(d.bannerT.value=g)}#a(){let{phase:e,start:t,end:r,gap:s}=this.#r,n=this.#i==null?null:M.clamp(this.#i,t+s,1);return{a:e==="off"?null:t,b:e==="active"?r:n}}#c(e){let{phase:t,start:r}=this.#r,s=t!=="off",{b:n}=this.#a(),o=vn(r),a=wn(n??1);e.abOnD.value=s?"flex":"none",e.abOffD.value=s?"none":"flex",e.abTxtC.value=s?ae:O,e.abLbl.value=t==="setB"?"A/B LOOP (2/2)":"A/B LOOP",e.abAL.value=o,e.abBL.value=a,e.abBD.value=n==null?"none":"flex",e.abMarkerPE.value=t==="active"?"auto":"none",e.abPreW.value=o-ee,e.abHoverD.value=this.#i==null?"none":"flex",e.abHoverL.value=o+ze,e.abHoverW.value=Math.max(0,a-o-ze)}#h(e){let{a:t,b:r}=this.#a(),s=e+(H-Ar)/2,n=o=>s<o+ze&&o<s+Ar;return t!=null&&n(vn(t))||r!=null&&n(wn(r))}_seekTo(e){let{phase:t,start:r,end:s}=this.#r,n=M.clamp(Pi(e-H/2,t!=="off"),r,s);this._setProgress(n),this.onSeek?.(n)}_setProgress(e){let t=this._sig;if(!t)return;let{phase:r,start:s,end:n}=this.#r,o=r!=="off",a=Ft(M.clamp(e,s,n),o),l=Ft(s,o);t.thumbL.value=a,t.fillL.value=l,t.fillW.value=Math.max(0,a+H-l),t.thumbIconD.value=this.#h(a)?"none":"flex"}async#u(){let e=this._sig={...this._createBaseSignals(),playTextD:A("flex"),playLbl:A("PAUSE"),fillL:A(ee),fillW:A(H),thumbL:A(ee),thumbS:A(1),thumbIconD:A("flex"),timeT:A("0:00 / 0:00"),sceneT:A("1/5"),sceneSub:A("SCENE"),icA:A("flex"),icB:A("none"),muteLbl:A("MUTE"),sclLkLbl:A("LOCK SCALE"),lockA:A("flex"),lockB:A("none"),lockLbl:A("LOCK SCENE"),abLbl:A("A/B LOOP"),abOnD:A("none"),abOffD:A("flex"),abTxtC:A(O),abAL:A(ee),abBD:A("none"),abBL:A(ee),abMarkerPE:A("none"),abPreW:A(0),abHoverD:A("none"),abHoverL:A(ee),abHoverW:A(0),presetT:A("OFF"),bannerT:A("")},t=({x:y,y:v,w:_,h:w})=>S(k,{positionType:"absolute",positionLeft:y,positionTop:v,width:_,height:w,backgroundColor:O,backgroundOpacity:.3}),r=({idx:y,onClick:v,active:_=null,children:w})=>{let P=j+y*Pe;return le(k,{positionType:"absolute",positionLeft:P,positionTop:Ge,width:Pe,height:Ee,backgroundColor:ae,hover:ht,onClick:v,children:[_&&S(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:Pe,height:Ee,backgroundColor:O,display:_,pointerEvents:"none"}),S(k,{width:"100%",height:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",children:w})]})},s=this._quad,n=y=>y.point.x+s.pixelWidth/2,o=y=>Pi(n(y)-ze/2-H,!0),a=()=>{e.thumbS.value=1.08},l=()=>{this.#i=null,s.dragging||(e.thumbS.value=1)},c=y=>{if(this.#r.phase==="setB"){this.#i=null,this.onAbLoopSet?.(this.#r.start,o(y));return}y.target.setPointerCapture(y.pointerId),s.dragging=!0,this._seekFromEvent(y)},h=y=>{this.#r.phase==="setB"?this.#i=o(y):s.dragging&&this._seekFromEvent(y)},u=()=>{s.dragging=!1,e.thumbS.value=1},p=y=>v=>{v.target.setPointerCapture(v.pointerId);let{start:_,end:w}=this.#r,P=n(v)-Ft(y==="a"?_:w,!0);this.#s={marker:y,grab:P,start:_,end:w}},f=y=>{let v=this.#s;if(!v)return;let _=Pi(n(y)-v.grab,!0),w=this.#r.gap;v.marker==="a"?v.start=Math.min(_,v.end-w):v.end=Math.max(_,v.start+w)},g=()=>{let y=this.#s;y&&(this.#s=null,this.onAbLoopSet?.(y.start,y.end))},d=({label:y,left:v,display:_,onPointerDown:w})=>S(k,{positionType:"absolute",positionLeft:v,positionTop:Le,width:ze,height:H,backgroundColor:ae,borderWidth:1,borderColor:O,hover:ht,alignItems:"center",justifyContent:"center",display:_,pointerEvents:e.abMarkerPE,zIndex:1,zIndexOffset:8,onPointerDown:w,onPointerMove:f,onPointerUp:g,children:S($,{fontSize:13,fontWeight:"bold",color:O,pointerEvents:"none",children:y})}),m=y=>{y.target.setPointerCapture(y.pointerId),s.panelDragging=!0,s.alpha=.3},x=()=>{s.panelDragging=!1},b=le(nl,{backgroundColor:ae,children:[le(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:D,height:Ue,display:e.contentD,children:[S(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:D,height:fe,backgroundColor:O,backgroundOpacity:.85}),S(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:D,height:fe,alignItems:"center",justifyContent:"center",children:S($,{fontSize:13,fontWeight:"bold",color:ae,children:e.bannerT})}),S(k,{positionType:"absolute",positionLeft:0,positionTop:fe,width:ve,height:Re,backgroundColor:ae,hover:ht,onClick:()=>this.onSceneNav?.(-1)}),S(k,{positionType:"absolute",positionLeft:0,positionTop:fe,width:ve,height:Re,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:S(U,{src:W.arrL,width:28,height:28})}),S(t,{x:ve,y:fe,w:.5,h:Re}),le(k,{positionType:"absolute",positionLeft:ve,positionTop:fe,width:D-ve*2,height:Re,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,overflow:"hidden",children:[S($,{fontSize:22,color:O,children:e.sceneT}),S($,{fontSize:10,color:O,opacity:.45,children:e.sceneSub})]}),S(t,{x:D-ve,y:fe,w:.5,h:Re}),S(k,{positionType:"absolute",positionLeft:D-ve,positionTop:fe,width:ve,height:Re,backgroundColor:ae,hover:ht,onClick:()=>this.onSceneNav?.(1)}),S(k,{positionType:"absolute",positionLeft:D-ve,positionTop:fe,width:ve,height:Re,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:S(U,{src:W.arrR,width:28,height:28})}),S(t,{x:0,y:Ce,w:D,h:.5}),S(k,{positionType:"absolute",positionLeft:0,positionTop:Ce,width:j,height:We-Ce,backgroundColor:ae,hover:ht,onClick:()=>this.onPlayPause?.()}),le(k,{positionType:"absolute",positionLeft:0,positionTop:Ce,width:j,height:We-Ce,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,pointerEvents:"none",children:[S(U,{display:e.playD,src:W.play,width:20,height:24,marginLeft:2}),S(U,{display:e.pauseD,src:W.pause,width:20,height:24}),S(U,{display:e.spinD,src:W.spin,width:28,height:28,transformRotateZ:e.spinR}),S($,{fontSize:13,fontWeight:"bold",color:O,display:e.playTextD,children:e.playLbl})]}),S(t,{x:j,y:Ce,w:.5,h:We-Ce}),S(k,{positionType:"absolute",positionLeft:j+16,positionTop:Ce+14,width:120,height:20,children:S($,{fontSize:14,color:O,children:e.timeT})}),S(k,{positionType:"absolute",positionLeft:ee,positionTop:Le,width:ut,height:H,backgroundColor:al,onPointerEnter:a,onPointerLeave:l,onPointerDown:c,onPointerMove:h,onPointerUp:u}),S(ol,{src:hl,positionType:"absolute",positionLeft:ee,positionTop:Le,width:ut,height:H,objectFit:"fill",keepAspectRatio:!1,zIndexOffset:1,pointerEvents:"none"}),S(k,{positionType:"absolute",positionLeft:e.abHoverL,positionTop:Le,width:e.abHoverW,height:H,backgroundColor:cl,display:e.abHoverD,zIndex:1,zIndexOffset:2,pointerEvents:"none"}),S(k,{positionType:"absolute",positionLeft:ee,positionTop:Le,width:e.abPreW,height:H,backgroundColor:ll,display:e.abOnD,zIndex:1,zIndexOffset:3,pointerEvents:"none"}),S(k,{positionType:"absolute",positionLeft:e.fillL,positionTop:Le,width:e.fillW,height:H,backgroundColor:O,backgroundOpacity:.85,zIndex:1,zIndexOffset:4,pointerEvents:"none"}),S(k,{positionType:"absolute",positionLeft:ee,positionTop:Le,width:ut,height:H,borderWidth:1,borderColor:O,borderOpacity:.6,zIndex:1,zIndexOffset:5,pointerEvents:"none"}),S(k,{positionType:"absolute",positionLeft:e.thumbL,positionTop:Le,width:H,height:H,backgroundColor:ae,borderWidth:1,borderColor:O,zIndex:1,zIndexOffset:6,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none"}),S(k,{positionType:"absolute",positionLeft:e.thumbL,positionTop:Le,width:H,height:H,alignItems:"center",justifyContent:"center",zIndex:1,zIndexOffset:7,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none",children:S(U,{display:e.thumbIconD,src:W.grip,width:Ar,height:Ar})}),S(d,{label:"A",left:e.abAL,display:e.abOnD,onPointerDown:p("a")}),S(d,{label:"B",left:e.abBL,display:e.abBD,onPointerDown:p("b")}),S(t,{x:j,y:Ge,w:D-j,h:.5}),le(r,{idx:0,onClick:()=>this.onPresetCycle?.(),children:[S(U,{src:W.bulb,width:20,height:20}),S($,{fontSize:10,fontWeight:"bold",color:O,children:e.presetT})]}),S(t,{x:j+Pe,y:Ge,w:.5,h:Ee}),le(r,{idx:1,onClick:()=>this.onMuteToggle?.(),children:[S(U,{display:e.icA,src:W.mute,width:20,height:20}),S(U,{display:e.icB,src:W.vol,width:20,height:20}),S($,{fontSize:10,fontWeight:"bold",color:O,children:e.muteLbl})]}),S(t,{x:j+Pe*2,y:Ge,w:.5,h:Ee}),le(r,{idx:2,onClick:()=>this.onScaleLockToggle?.(),children:[S(U,{src:W.scale,width:20,height:20}),S($,{fontSize:10,fontWeight:"bold",color:O,children:e.sclLkLbl})]}),S(t,{x:j+Pe*3,y:Ge,w:.5,h:Ee}),le(r,{idx:3,active:e.abOnD,onClick:()=>this.onAbLoopToggle?.(),children:[S(U,{display:e.abOffD,src:W.loop,width:20,height:20}),S(U,{display:e.abOnD,src:W.loopOn,width:20,height:20}),S($,{fontSize:10,fontWeight:"bold",color:e.abTxtC,children:e.abLbl})]}),S(t,{x:j+Pe*4,y:Ge,w:.5,h:Ee}),le(r,{idx:4,onClick:()=>this.onLockToggle?.(),children:[S(U,{display:e.lockA,src:W.unlk,width:20,height:20}),S(U,{display:e.lockB,src:W.lock,width:20,height:20}),S($,{fontSize:10,fontWeight:"bold",color:O,children:e.lockLbl})]}),S(t,{x:j+Pe*5,y:Ge,w:.5,h:Ee}),le(r,{idx:5,onClick:()=>this.onReset?.(),children:[S(U,{src:W.reset,width:20,height:20}),S($,{fontSize:10,fontWeight:"bold",color:O,children:"RESET SCENE"})]}),S(t,{x:j+Pe*6,y:Ge,w:.5,h:Ee}),le(r,{idx:6,onClick:()=>this.onExit?.(),children:[S(U,{src:W.exit,width:20,height:20}),S($,{fontSize:10,fontWeight:"bold",color:O,children:"EXIT"})]}),S(t,{x:0,y:We,w:D,h:.5}),S(k,{positionType:"absolute",positionLeft:0,positionTop:We+1,width:D,height:Tn-1,backgroundColor:ae,hover:ht,alignItems:"center",justifyContent:"center",onPointerDown:m,onPointerUp:x,children:S($,{fontSize:12,color:O,opacity:.45,pointerEvents:"none",children:"DRAG TO MOVE THE MENU"})}),S(k,{positionType:"absolute",positionLeft:D-It-4,positionTop:(fe-It)/2,width:It,height:It,borderRadius:It/2,backgroundColor:ae,backgroundOpacity:.8,borderWidth:1,borderColor:O,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",zIndexOffset:10,onClick:()=>this.onClose?.(),children:S(U,{src:W.close,width:12,height:12,pointerEvents:"none"})}),S(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:D,height:.5,backgroundColor:O,backgroundOpacity:.3,zIndexOffset:10}),S(k,{positionType:"absolute",positionLeft:0,positionTop:Ue-.5,width:D,height:.5,backgroundColor:O,backgroundOpacity:.3,zIndexOffset:10}),S(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:.5,height:Ue,backgroundColor:O,backgroundOpacity:.3,zIndexOffset:10}),S(k,{positionType:"absolute",positionLeft:D-.5,positionTop:0,width:.5,height:Ue,backgroundColor:O,backgroundOpacity:.3,zIndexOffset:10})]}),S(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:D,height:Ue,backgroundColor:ae,backgroundOpacity:1,display:e.loadingD,alignItems:"center",justifyContent:"center",children:S(U,{src:W.spin,width:64,height:64,transformRotateZ:e.spinR,pointerEvents:"none"})})]});await s.mountReact(b)}};var dt=class{#e;#t;#r;#i=null;#s;#o;#n;constructor(e){this.#e=e,this.#t=new e.Scene,this.#r=new e.Group,this.#t.add(this.#r),this.#s=new e.Vector3,this.#o=new e.Vector3,this.#n=new e.Raycaster}get scene(){return this.#t}get anchor(){return this.#r}get bboxMesh(){return this.#i}get hasBBox(){return!!this.#i}rebuildBBox(e,t){let r=this.#e;this.#i&&(this.#r.remove(this.#i),this.#i.geometry.dispose(),this.#i.material.dispose());let s=(e.minX+e.maxX)/2,n=(e.minY+e.maxY)/2,o=(e.minZ+e.maxZ)/2,a=new r.Box3(new r.Vector3(e.minX,e.minY,e.minZ),new r.Vector3(e.maxX,e.maxY,e.maxZ)).applyMatrix4(new r.Matrix4().fromArray(t)),l=a.getSize(new r.Vector3).max(new r.Vector3(.1,.1,.1)),c=a.getCenter(new r.Vector3),h=new r.BoxGeometry(l.x,l.y,l.z);return this.#i=new r.Mesh(h,new r.MeshBasicMaterial({visible:!1,side:r.DoubleSide})),this.#i.position.copy(c),this.#r.add(this.#i),{cx:s,cy:n,cz:o}}applyTransform(e,t){this.#r.position.set(e[0],e[1],e[2]),this.#r.scale.set(t,t,-t),this.#r.quaternion.identity(),this.#r.updateMatrixWorld(!0)}hitTest(e){if(!this.#i)return!1;let t=e.position,r=e.orientation;return this.#s.set(t.x,t.y,t.z),this.#o.set(-2*(r.w*r.y+r.x*r.z),-2*(r.y*r.z-r.w*r.x),2*(r.x*r.x+r.y*r.y)-1),this.#n.set(this.#s,this.#o),this.#n.intersectObject(this.#i,!1).length>0}};var ft=class i{#e;#t;#r;#i;#s;#o;static#n=1.5;static#l=.04;static#a=.15;static#c=4;static#h=20;static#u=.003;static#m=.001;static#p=.7;constructor(e,t){this.#e=e,this.#t=this.#d(),this.#r=this.#d(),this.#i=this.#f(),this.#s=this.#f(),this.#o=new e.Vector3,t.add(this.#t.group,this.#r.group,this.#i,this.#s)}update(e,t,r,s=!0){this.#g(this.#t,this.#i,s?e:null,r?.[0]),this.#g(this.#r,this.#s,s?t:null,r?.[1])}dispose(){for(let e of[this.#t,this.#r])e.mesh.geometry.dispose(),e.mesh.material.dispose();for(let e of[this.#i,this.#s])e.geometry.dispose(),e.material.dispose()}#d(){let e=this.#e,t=i.#c,r=i.#h,s=i.#n,n=i.#l,o=i.#a,a=i.#u,l=i.#m,c=i.#p,h=r+1,u=t+1,p=h*u,f=new Float32Array(p*3),g=new Float32Array(p*4),d=[];for(let v=0;v<h;v++){let _=v/r,w=-n-_*s,P=a+(l-a)*_,T=Math.min(_/o,1),R=1-_,I=c*T*R;for(let z=0;z<=t;z++){let X=z/t*Math.PI*2,E=v*u+z;f[E*3]=Math.cos(X)*P,f[E*3+1]=Math.sin(X)*P,f[E*3+2]=w,g[E*4]=1,g[E*4+1]=1,g[E*4+2]=1,g[E*4+3]=I}}for(let v=0;v<r;v++)for(let _=0;_<t;_++){let w=v*u+_,P=w+1,T=w+u,R=T+1;d.push(w,T,P,P,T,R)}let m=new e.BufferGeometry;m.setAttribute("position",new e.BufferAttribute(f,3)),m.setAttribute("color",new e.BufferAttribute(g,4)),m.setIndex(d);let x=new e.MeshBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),b=new e.Mesh(m,x);b.frustumCulled=!1,b.renderOrder=998;let y=new e.Group;return y.add(b),y.visible=!1,{mesh:b,group:y}}#f(){let e=this.#e,t=new e.RingGeometry(.004,.008,24),r=new e.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),s=new e.Mesh(t,r);return s.frustumCulled=!1,s.renderOrder=999,s.visible=!1,s}#g(e,t,r,s){if(!r?.active||!r.rayTransform||r.isTransientPointer){e.group.visible=!1,t.visible=!1;return}let n=r.rayTransform.position,o=r.rayTransform.orientation;e.group.position.set(n.x,n.y,n.z),e.group.quaternion.set(o.x,o.y,o.z,o.w),e.group.visible=!0,e.group.updateMatrixWorld(!0);let a=r.triggerPressed??!1;if(e.mesh.material.color.setRGB(a?.4:1,a?.75:1,1),s?.visible){let l=this.#o.set(n.x,n.y,n.z).distanceTo(s.position),c=i.#l+i.#n;e.mesh.scale.z=Math.min(1,l/c),t.position.copy(s.position),t.quaternion.set(o.x,o.y,o.z,o.w),t.visible=!0,t.updateMatrixWorld(!0)}else e.mesh.scale.z=1,t.visible=!1}};var mt=Object.keys(Tt),En=i=>!Number.isFinite(i)||i<0?"0:00":`${~~(i/60)}:${String(~~i%60).padStart(2,"0")}`,Ci=i=>i.toUpperCase(),Rn=i=>Math.max(.1,i*.01);var gt=class{#e;#t;#r;#i=null;#s=null;#o=null;#n=null;#l=null;#a=null;#c=0;#h=0;#u=0;#m=mt.indexOf("off");#p=Ci("off");#d=1;#f=!1;#g=!0;#b="off";#y=[];#x=0;#v=!0;#w=null;#M=null;#S=null;#_=null;#L=null;#T=null;#C;#P=null;#A=null;#R=null;constructor(e,{debug:t=!1,uiStyle:r="modern",rays:s=!0}={}){this.#e=e,this.#t=t,this.#r=r,this.#C=s}get uiStyle(){return this.#r}set uiStyle(e){this.#r=e}set manipulator(e){this.#s=e}get manipulator(){return this.#s}get uiActive(){return!this.#v&&(this.#i?.quad.interacting??!1)}get uiDragging(){if(this.#v)return!1;let e=this.#i?.quad;return(e?.dragging||e?.panelDragging)??!1}get quads(){let e=this.#i?.quad;return e?[e]:[]}set sources(e){this.#y=e??[],this.#x=Math.min(this.#x,Math.max(0,this.#y.length-1))}get sources(){return this.#y}set sceneIndex(e){this.#y.length&&(this.#x=Math.max(0,Math.min(this.#y.length-1,e)),this.#v=!0)}get sceneIndex(){return this.#x}set onSceneChange(e){this.#S=e}get onSceneChange(){return this.#S}set onPresetChange(e){this.#M=e}get onPresetChange(){return this.#M}set onLock(e){this.#_=e}get onLock(){return this.#_}set onScaleLock(e){this.#L=e}get onScaleLock(){return this.#L}set bannerText(e){this.#w=e}get bannerText(){return this.#w}set eventLogger(e){this.#T=e}get eventLogger(){return this.#T}setPreset(e,t=this.#d){this.#d=t,this.syncPreset(e),this.#E(this.#o,e,t)}syncPreset(e){let t=mt.indexOf(e);t<0||(this.#m=t,this.#p=Ci(e))}async init(e,t,r,s,n,o=!1){this.#o=e;let a=this.#e,l=this.#t||this.#C;this.#i=this.#r==="modern"?new pt(a):new at(a),this.#k(e,t);let c=l?new dt(a):null;if(this.#R=c,c&&this.#s?.setOverlay(c),this.#f=this.#y[this.#x]?.locked??this.#f,this.#g=this.#y[this.#x]?.scaleLocked??this.#g,this.#s&&(this.#s.locked=this.#f,this.#s.scaleLocked=this.#g),this.#E(e,mt[this.#m],this.#d),c){this.#i.quad.hitMesh&&c.scene.add(this.#i.quad.hitMesh);for(let u of this.#i.quad.hitSpheres)c.scene.add(u);this.#t&&(this.#P=new ct(a,c)),this.#C&&(this.#A=new ft(a,c.scene))}l&&c&&(this.#n=new a.WebGLRenderer({context:n,canvas:n.canvas}),this.#n.autoClear=!1,this.#l=new a.PerspectiveCamera(50,1,.01,1e4),this.#l.matrixAutoUpdate=!1,this.#a=new a.WebGLRenderTarget(1,1),this.#n.setRenderTarget(this.#a),this.#n.setRenderTarget(null));let h=await this.#i.quad.init(t,r,s,n);return this.#c=setTimeout(()=>this.#i?.quad.show(),1e3),h?[h]:[]}frame(e,t,r,s,n,o){this.#G(o),this.#i?.quad.updatePosition(s),this.#i?.quad.handleInput(this.#s?.leftHand,this.#s?.rightHand,s),this.#P?.update(this.#s?.leftHand,this.#s?.rightHand),this.#A?.update(this.#s?.leftHand,this.#s?.rightHand,this.#i?.quad.hitSpheres,!!this.#i?.quad.visible),this.#i?.quad.panelDragging&&this.#s?.reset(),this.#z(e,o),this.#i?.render(e),this.#i?.quad.drawContent(t)}renderEye(e,t,r,s,n,o,a){this.#i?.quad.renderEye(e,r,s,n,o,a),!(!this.#n||!this.#R)&&(this.#l.projectionMatrix.fromArray(r.projectionMatrix),this.#l.projectionMatrixInverse.copy(this.#l.projectionMatrix).invert(),this.#l.matrix.fromArray(r.transform.matrix),this.#l.matrixWorld.copy(this.#l.matrix),this.#l.matrixWorldInverse.fromArray(r.transform.inverse.matrix),this.#n.resetState(),this.#n.setRenderTargetFramebuffer(this.#a,t),this.#n.setRenderTarget(this.#a),this.#n.setViewport(s,n,o,a),this.#n.setScissor(s,n,o,a),this.#n.setScissorTest(!0),this.#n.clearDepth(),this.#n.render(this.#R.scene,this.#l),this.#n.resetState(),e.bindFramebuffer(e.FRAMEBUFFER,t))}onRefReset(){this.#i?.quad.recenter()}render(e,t){}dispose(){clearTimeout(this.#c),this.#b!=="off"&&this.#B(this.#o),this.#P?.dispose(),this.#P=null,this.#A?.dispose(),this.#A=null,this.#R=null,this.#n?.dispose(),this.#n=null,this.#a?.dispose(),this.#a=null,this.#l=null,this.#i?.quad.dispose(),this.#i=null,this.#s?.reset(),this.#s=null,this.#h=0}#k(e,t){let r=this.#i;r.onPlayPause=()=>{(e?.isBuffering??!1)||(e?.isPlaying?e.pause():e.play(),this.#T?.event?.("play_pause",{playing:!e?.isPlaying}))},r.onSeek=s=>{e?.seek?.(s*(e?.duration??0)),this.#T?.event?.("seek",{position:s})},r.onPresetCycle=()=>{let s=mt[(this.#m+1)%mt.length];this.#E(e,s,this.#d),this.#M?.(s),this.#T?.event?.("preset_cycle",{preset:s})},r.onExit=()=>{this.#T?.event?.("exit"),t?.end()},r.onClose=()=>{r.quad.hide()},r.onSceneNav=s=>{if(!this.#y.length)return;let n=Math.max(0,Math.min(this.#y.length-1,this.#x+s));n!==this.#x&&(this.#x=n,this.#v=!0,this.#O(),this.#S?.(this.#y[this.#x],this.#x),this.#T?.event?.("scene_nav",{index:n,label:this.#y[n]?.label,dir:s}))},this.#r==="modern"&&(r.onMuteToggle=()=>{let s=this.#F(e);this.#T?.event?.("mute_toggle",{muted:!s})},r.onReset=()=>{this.#s?.resetToInitial(),this.#T?.event?.("reset")},r.onLockToggle=()=>{this.#f=!this.#f,this.#s&&(this.#s.locked=this.#f),this.#_?.(this.#f),this.#T?.event?.("lock_toggle",{locked:this.#f})},r.onAbLoopToggle=()=>{this.#b==="off"?this.#D(e):this.#B(e),this.#T?.event?.("ab_loop_toggle",{enabled:this.#b!=="off"})},r.onAbLoopSet=(s,n)=>{if(this.#b==="off")return;let o=e.duration;this.#I(e,s*o,n*o),this.#b="active",this.#T?.event?.("ab_loop_set",e.playbackRange)},r.onScaleLockToggle=()=>{this.#g=!this.#g,this.#s&&(this.#s.scaleLocked=this.#g),this.#L?.(this.#g),this.#T?.event?.("scale_lock_toggle",{scaleLocked:this.#g})})}#D(e){let t=e?.duration??0;t<=0||(this.#I(e,e.currentTime,t),this.#b="setB")}#I(e,t,r){let s=e.duration,n=Rn(s),o=M.clamp(t,0,s-n);e.setPlaybackRange(o,M.clamp(r,o+n,s))}#B(e){e?.clearPlaybackRange(),this.#b="off"}#O(){this.#f=this.#y[this.#x]?.locked??this.#f,this.#g=this.#y[this.#x]?.scaleLocked??this.#g}#F(e){let t=!(e?.audioEnabled??!1);return t?e?.enableAudio?.():e?.disableAudio?.(),t}#E(e,t,r=1){let s=mt.indexOf(t);if(s<0)return;this.#m=s,this.#p=Ci(t);let n=Tt[t];n?e?.setEnvLighting(ke(n),r):e?.clearEnvLighting()}#G(e){!this.#v||!e.duration||(this.#v=!1,this.#b="off",this.#f=this.#y[this.#x]?.locked??this.#f,this.#g=this.#y[this.#x]?.scaleLocked??this.#g)}#z(e,t){let r=!(t?.audioEnabled??!1);if(this.#v)this.#i?.update({loading:!0,muted:r,locked:this.#f,scaleLocked:this.#g,sceneText:this.#y.length?`${this.#x+1}/${this.#y.length}`:"1/1",sceneLabel:(this.#y[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#w});else{let s=t?.isBuffering??!1,n=t?.duration??0;n>0&&(this.#u=n);let o=this.#u,a=t?.currentTime??0,l=p=>p/(o||1),c=M.clamp01(l(a)),{start:h,end:u}=t.playbackRange;this.#i?.update({loading:!1,playing:t?.isPlaying??!1,spinning:s,buffering:s,progress:c,timeText:`${En(a)} / ${En(o)}`,presetName:this.#p,muted:r,locked:this.#f,scaleLocked:this.#g,abLoop:{phase:this.#b,start:l(h),end:l(u),gap:l(Rn(o))},sceneText:this.#y.length?`${this.#x+1}/${this.#y.length}`:"1/1",sceneLabel:(this.#y[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#w})}this.#N(e)}#N(e){if(this.#h>0){this.#h-=e;return}let t=this.#s?.leftHand.microSwipe||this.#s?.rightHand.microSwipe;t&&(this.#h=.45,this.#i?.onSceneNav(t))}};import{useState as pl}from"react";import*as dl from"three";function Ei(){let[i]=pl(()=>new rt(dl));return i}import{useEffect as An,useRef as fl,useState as ml}from"react";function Ri(i,e,t){let[r,s]=ml(!1);An(()=>{let a=i.current;if(!a)return;let l=()=>s(!0),c=h=>{h.touches.length>1&&l()};return a.addEventListener("pointerdown",l),a.addEventListener("wheel",l),a.addEventListener("touchmove",c),()=>{a.removeEventListener("pointerdown",l),a.removeEventListener("wheel",l),a.removeEventListener("touchmove",c)}},[i]);let n=fl(e);return An(()=>{n.current!==e&&(n.current=e,s(!1))},[e]),{hasInteracted:r,resetView:()=>{t.reset(),s(!1)}}}import{useEffect as gl,useState as yl}from"react";var xl=500;function Ai(i,e=xl){let[t,r]=yl(!1);return gl(()=>{if(!i){r(!1);return}let s=setTimeout(()=>r(!0),e);return()=>clearTimeout(s)},[i,e]),i&&t}import{useEffect as bl,useRef as vl,useState as wl}from"react";var _l=2e3;function ki({coreError:i,interactionError:e,isSceneReady:t,currentSource:r,open:s,clearError:n}){let[o,a]=wl(null),l=vl(new WeakMap);e?.phase&&l.current.set(e.error,e.phase);let c=i&&e?.error===i?e.phase:i?l.current.get(i):void 0,h=i?{error:i,phase:c}:e,u=h?tn(h.error,t,h.phase):null,p=u?.presentation==="blocking",f=u?.presentation==="toast"&&u.cause!==o?u:null,g=f?.cause??null;return bl(()=>{if(!g)return;let x=setTimeout(()=>{a(g),n()},_l);return()=>clearTimeout(x)},[g,n]),{playerError:u,isBlocking:!!p,toast:f,retry:()=>r?s(r):window.location.reload(),dismiss:()=>{f&&a(f.cause),n()}}}import{useCallback as Sl,useEffect as Ml,useState as Tl}from"react";function Ii(i,e){let[t,r]=Tl(!1),s=Sl(async()=>{let n=i.current;if(!(!n||typeof document>"u"))try{document.fullscreenElement===n?await document.exitFullscreen():await n.requestFullscreen()}catch(o){e(Se(o),{phase:"fullscreen"})}},[e,i]);return Ml(()=>{if(typeof document>"u")return;let n=()=>r(document.fullscreenElement===i.current);return n(),document.addEventListener("fullscreenchange",n),()=>document.removeEventListener("fullscreenchange",n)},[i]),{isFullscreen:t,toggleFullscreen:s}}import{useRef as Pl}from"react";function kn(i){let e=fi(i.name);return{url:`${_r}${i.name}`,label:i.name,file:i,...e?{type:$s}:{}}}async function Ll(i){return fi(i.name)?kn(await i.getFile()):{url:`${_r}${i.name}`,label:i.name,localFile:i}}function Cl(){return typeof window>"u"?null:window.showOpenFilePicker??null}function El(i){return i instanceof DOMException&&i.name==="AbortError"}function Rl(i){let e=i.currentTarget.files?.[0];return i.currentTarget.value="",e?kn(e):null}function Fi({localFiles:i,logger:e,reportError:t,playlist:r,clearError:s}){let n=Pl(null),o=!!i,a=h=>{s();let u=[...r.sources,h];r.setSources(u),r.goTo(u.length-1),e.event?.("local_file_open",{label:de(h)})};return{enabled:o,fileInputProps:{ref:n,accept:js,onChange:h=>{let u=Rl(h);u&&a(u)}},localLabel:Qs,openLocalFile:async()=>{if(!o)return;let h=Cl();if(!h){n.current?.click();return}try{let p=(await h({types:[{description:"Volumetric video",accept:{"application/octet-stream":[...di]}}]}))[0];p&&a(await Ll(p))}catch(u){El(u)||t(Se(u),{phase:"local-file"})}}}}import{useRef as Bi}from"react";function Oi(i){let{containerRef:e,muted:t=!1,moduleFactory:r,overlay:s,boundaryRenderer:n,eventLogger:o,onReady:a,onProgress:l,onModeChange:c,onXRStart:h,onXREnd:u}=i,p=Bi({onReady:a,onProgress:l,onModeChange:c,onXRStart:h,onXREnd:u});p.current={onReady:a,onProgress:l,onModeChange:c,onXRStart:h,onXREnd:u};let f=Bi(null),g=Bi(!1),d=mr({containerRef:e,moduleFactory:r,moduleUrl:r?void 0:Js(),overlay:s,boundaryRenderer:n,eventLogger:o,onReady(){g.current||(g.current=!0,t||f.current?.app?.enableAudio()),p.current.onReady?.()},onProgress:x=>p.current.onProgress?.(x),onModeChange:(x,b)=>p.current.onModeChange?.(x,b),onXRStart:()=>p.current.onXRStart?.(),onXREnd:()=>p.current.onXREnd?.()});f.current=d;let m=gr(d);return{gracia:d,playlist:m}}import{useCallback as Gi,useMemo as In,useState as Al}from"react";function kl(i){switch(i){case"init":case"load":case"xr":case"streaming":case"fullscreen":case"local-file":return i;default:return}}function zi(i,e){let[t,r]=Al(null),s=In(()=>on(i,e),[i,e]),n=Gi((c,h)=>{r({error:c,phase:kl(h?.phase)})},[]),o=In(()=>({event:(c,h)=>s.event?.(c,h),error:(c,h)=>{n(c,h),s.error?.(c,h)}}),[s,n]),a=Gi((c,h)=>{n(c,h),s.error?.(c,h)},[s,n]),l=Gi(()=>r(null),[]);return{interactionError:t,logger:o,reportError:a,clearError:l}}import{useEffect as Hl}from"react";import{useEffect as Il,useRef as Fl}from"react";function Ni({isInitialized:i,sources:e,streaming:t,playlist:r,reportError:s}){let n=Fl(s);n.current=s,Il(()=>{if(!i)return;let o=!1,a=l=>{o||l.length===0||(r.setSources(l),r.goTo(0))};if(t?.length)return et(t,en()).then(a).catch(l=>{o||n.current(Se(l),{phase:"streaming"})}),()=>{o=!0};a(e)},[i,e,t,r.setSources,r.goTo])}import{useEffect as Bl,useRef as Fn}from"react";function Di({currentSource:i,index:e,onSceneChange:t}){let r=Fn(t);r.current=t;let s=Fn(null);Bl(()=>{if(!i||e<0)return;let n=`${e}:${de(i)}`;s.current!==n&&(s.current=n,r.current?.(i,e))},[i,e])}import{useEffect as Ol,useState as Gl}from"react";var zl=500;function Xi(i,e,t){let[r,s]=Gl(!1),n=wr(i.mode)?i.mode:null;Ol(()=>{(!n||!i.xr.isActive)&&s(!1)},[n,i.xr.isActive]);let o=h=>{t(),s(!0),i.xr.setMode(h).catch(u=>{s(!1),e(Se(u),{phase:"xr",target:h})})},a=()=>{s(!1),i.xr.setMode(pe.PW).catch(h=>{e(Se(h),{phase:"xr",target:pe.PW})})},c=Ai(r&&!i.error,zl)&&i.xr.isActive?n:null;return{enter:o,exit:a,activeScreenMode:c}}import{useRef as Nl}from"react";import*as Dl from"three";function Xl(i){if(i===!1)return null;let{uiStyle:e="modern",bannerText:t="EARLY BETA"}=i??{};try{let r=new gt(Dl,{uiStyle:e});return r.bannerText=t,r}catch{return null}}function Hi(i){let e=Nl(void 0);return e.current===void 0&&(e.current=Xl(i)),e.current}function Vi(i,e){let{sources:t=[],streaming:r,muted:s=!1,cameraControls:n=!1,sceneSelector:o,moduleFactory:a,onReady:l,onProgress:c,onModeChange:h,onXRStart:u,onXREnd:p,onSceneChange:f,onError:g,eventLogger:d,localFiles:m,xrOverlay:x}=i,b=Hi(x),y=Ei(),{interactionError:v,logger:_,reportError:w,clearError:P}=zi(d,g);Hl(()=>{Sr()},[]);let{gracia:T,playlist:R}=Oi({containerRef:e.container,muted:s,moduleFactory:a,overlay:b,boundaryRenderer:y,eventLogger:_,onReady:l,onProgress:c,onModeChange:h,onXRStart:u,onXREnd:p});Ni({isInitialized:T.isInitialized,sources:t,streaming:r,playlist:R,reportError:w}),Di({currentSource:R.currentSource,index:R.index,onSceneChange:f});let{fileInputProps:I,enabled:z,localLabel:X,openLocalFile:E}=Fi({localFiles:m,logger:_,reportError:w,playlist:R,clearError:P}),{isFullscreen:ce,toggleFullscreen:Ne}=Ii(e.root,w),qe=T.isContentReady&&!T.isLoading,{playerError:Ki,isBlocking:Ji,toast:to,retry:ro,dismiss:io}=ki({coreError:T.error,interactionError:v,isSceneReady:qe,currentSource:R.currentSource,open:T.open,clearError:P}),so=!Ki&&(!T.isInitialized||!qe),Gr=Xi(T,w,P);return{contextValue:{gracia:T,playlist:R,config:{sceneSelector:o,cameraControls:n},refs:e,presentation:{isBusy:so,isSceneReady:qe,isBlocking:Ji,playerError:Ki,toast:to,retry:ro,dismiss:io},shell:{isFullscreen:ce,toggleFullscreen:Ne,localFilesEnabled:z,fileInputProps:I,openLocalFile:E,localLabel:X},xr:{enter:Gr.enter,exit:Gr.exit,activeScreenMode:Ji?null:Gr.activeScreenMode}},gracia:T,playlist:R,openLocalFile:E,toggleFullscreen:Ne}}import{useEffect as Bn,useRef as On,useState as Vl}from"react";import{jsx as te,jsxs as Bt}from"react/jsx-runtime";var Gn=()=>{let{playlist:i}=N(),e=On(null),t=On(i.index),[r,s]=Vl(!1),n=i.currentSource,o=n?de(n):"Select scene",a=i.total>1;return Bn(()=>{t.current!==i.index&&(t.current=i.index,s(!1))},[i.index]),Bn(()=>{if(!r)return;let l=c=>{e.current&&!e.current.contains(c.target)&&s(!1)};return document.addEventListener("click",l),()=>document.removeEventListener("click",l)},[r]),Bt("div",{ref:e,className:"gr-player__scene",children:[Bt("div",{className:"gr-player__scene-inner",children:[Bt("button",{className:"gr-player__scene-main",type:"button",disabled:!a,onClick:()=>s(!r),"aria-haspopup":"menu","aria-expanded":r,children:[te(Ys,{}),Bt("span",{className:"gr-player__scene-main-copy",children:[te("span",{className:"gr-player__scene-copy",children:te("span",{className:"gr-player__scene-label",children:o})}),a&&te("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:i.sources.map((l,c)=>te("span",{className:J("gr-player__scene-segment",c===i.index&&"is-active")},l.id??l.url??c))})]})]}),te("button",{className:"gr-player__scene-nav",type:"button",disabled:!i.hasPrev,onClick:()=>i.prev(),"aria-label":"Previous scene",children:te(br,{})}),te("button",{className:"gr-player__scene-nav",type:"button",disabled:!i.hasNext,onClick:()=>i.next(),"aria-label":"Next scene",children:te(vr,{})})]}),r&&a&&te("div",{className:"gr-player__scene-menu",children:i.sources.map((l,c)=>Bt("button",{type:"button",className:J("gr-player__scene-item",c===i.index&&"is-active"),onClick:()=>{i.goTo(c),s(!1)},children:[te("span",{children:Fe(l)?te(Ie,{}):c+1}),te("strong",{children:de(l)})]},l.id??l.url??c))})]})};import{jsx as me,jsxs as Ui}from"react/jsx-runtime";var zn=()=>{let{playlist:i}=N(),e=i.currentSource,t=Fe(e);return me("div",{className:"gr-player__scene gr-player__scene--stepper",children:Ui("div",{className:"gr-player__scene-inner",children:[me("button",{className:"gr-player__scene-nav",type:"button",disabled:!i.hasPrev,onClick:()=>i.prev(),"aria-label":"Previous scene",children:me(br,{})}),me("div",{className:"gr-player__scene-main",children:Ui("span",{className:"gr-player__scene-main-copy",children:[t&&e?Ui("span",{className:"gr-player__scene-count gr-player__scene-count--local",children:[me(Ie,{}),me("span",{className:"gr-player__scene-label",children:de(e)})]}):me("span",{className:"gr-player__scene-count",children:i.index>=0?`${i.index+1} of ${i.total}`:`${i.total} scenes`}),me("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:i.sources.map((r,s)=>me("span",{className:J("gr-player__scene-segment",s===i.index&&"is-active",Fe(r)&&"gr-player__scene-segment--local")},r.id??r.url??s))})]})}),me("button",{className:"gr-player__scene-nav",type:"button",disabled:!i.hasNext,onClick:()=>i.next(),"aria-label":"Next scene",children:me(vr,{})})]})})};import{useEffect as Ul,useRef as Wl}from"react";import{jsx as Ot}from"react/jsx-runtime";var Nn=()=>{let{playlist:i}=N(),e=Wl(null),t=i.index;return Ul(()=>{e.current?.querySelector(`.gr-player__scene-tab[data-scene-index="${t}"]`)?.scrollIntoView({block:"nearest",inline:"nearest"})},[t]),Ot("div",{className:"gr-player__scene",children:Ot("div",{className:"gr-player__scene-inner",children:Ot("div",{ref:e,className:"gr-player__scene-tabs-scroll",children:i.sources.map((r,s)=>Ot("button",{type:"button","data-scene-index":s,className:J("gr-player__scene-tab",s===i.index&&"is-active",Fe(r)&&"gr-player__scene-tab--local"),onClick:()=>i.goTo(s),"aria-label":`Open ${de(r)}`,"aria-current":s===i.index?"true":void 0,children:Fe(r)?Ot(Ie,{}):s+1},r.id??r.url??s))})})})};import{jsx as ql}from"react/jsx-runtime";var Yl={tabs:Nn,stepper:zn,menu:Gn},kr=()=>{let{config:i}=N(),{sceneSelector:e=Ks}=i,t=Yl[e];return ql(t,{})};import{useRef as Dn,useState as Zl}from"react";import{jsx as Ir,jsxs as jl}from"react/jsx-runtime";var Wi=({progress:i,duration:e,onSeek:t,disabled:r=!1})=>{let s=Dn(null),n=Dn(!1),[o,a]=Zl(0),l=u=>{if(!s.current)return 0;let p=s.current.getBoundingClientRect();return Math.min(1,Math.max(0,(u.clientX-p.left)/p.width))},c=u=>{e>0&&t(l(u)*e)},h=r?void 0:{onPointerDown(u){n.current=!0,u.currentTarget.setPointerCapture(u.pointerId),c(u)},onPointerMove(u){a(l(u)),n.current&&c(u)},onPointerLeave(){a(0)},onPointerUp(u){n.current=!1,u.currentTarget.releasePointerCapture(u.pointerId)},onPointerCancel(){n.current=!1}};return Ir("div",{className:"gr-player__seek-shell","aria-disabled":r||void 0,children:jl("div",{ref:s,className:"gr-player__seek",role:"slider","aria-valuemin":0,"aria-valuemax":Math.max(e,0),"aria-valuenow":Math.round(i*Math.max(e,0)),"aria-disabled":r||void 0,tabIndex:r?-1:0,...h,children:[Ir("span",{className:"gr-player__seek-fill",style:{width:`${i*100}%`}}),Ir("span",{className:"gr-player__seek-hover",style:{width:`${o*100}%`}}),Ir("span",{className:"gr-player__seek-thumb",style:{left:`${i*100}%`}})]})})};import{jsx as we,jsxs as Xn}from"react/jsx-runtime";function Ql(i,e){return e>0?Math.min(1,Math.max(0,i/e)):0}var Hn=()=>{let{gracia:i,playlist:e,presentation:t,shell:r}=N(),{isSceneReady:s}=t,{isFullscreen:n,toggleFullscreen:o}=r,{playback:a}=i,l=Ql(a.currentTime,a.duration);return Xn("div",{className:"gr-player__controls",children:[we(oe,{className:"gr-player__button--play",onClick:s?()=>a.togglePlay():void 0,"aria-label":a.isPlaying?"Pause":"Play","aria-disabled":!s||void 0,children:a.isPlaying?we(Xs,{}):we(Ds,{})}),we(kr,{}),e.hasAudio&&we(Be,{className:"gr-player__mute",onClick:s?()=>a.toggleMute():void 0,"aria-label":a.isMuted?"Unmute":"Mute","aria-disabled":!s||void 0,children:a.isMuted?we(Hs,{}):we(Vs,{})}),we(Wi,{progress:l,duration:a.duration,onSeek:c=>a.seek(c),disabled:!s}),Xn("div",{className:"gr-player__time",children:[gi(a.currentTime)," / ",gi(a.duration)]}),we(Be,{variant:["icon","secondary"],className:"gr-player__fullscreen",onClick:o,"aria-label":n?"Exit fullscreen":"Enter fullscreen","aria-pressed":n,title:n?"Exit fullscreen":"Enter fullscreen",children:we(qs,{active:n})})]})};import{useEffect as Vn,useRef as $l,useState as Kl}from"react";import{jsx as Gt,jsxs as Yi}from"react/jsx-runtime";var Un=()=>{let{gracia:i,config:e,presentation:t}=N(),{isSceneReady:r,isBlocking:s}=t,[n,o]=Kl(!1),a=$l(null),l=e.cameraControls&&r&&!s&&!wr(i.mode);if(Vn(()=>{l||o(!1)},[l]),Vn(()=>{if(!n)return;let u=f=>{a.current?.contains(f.target)||o(!1)},p=f=>{f.code==="Escape"&&o(!1)};return document.addEventListener("pointerdown",u),document.addEventListener("keydown",p),()=>{document.removeEventListener("pointerdown",u),document.removeEventListener("keydown",p)}},[n]),!l)return null;let{controlsType:c,setControls:h}=i.camera;return Yi("div",{ref:a,className:"gr-player__camera-control",children:[Gt(Be,{className:"gr-player__button--camera",onClick:()=>o(u=>!u),"aria-label":"Camera controls","aria-expanded":n,title:"Camera controls",srLabel:"Camera controls",children:Gt(Us,{})}),n&&Yi("div",{className:"gr-player__camera-panel",role:"menu","aria-label":"Camera controls",children:[Gt("div",{className:"gr-player__camera-title",children:"Camera"}),Zs.map(u=>Yi("button",{className:J("gr-player__camera-option",u.type===c&&"is-active"),type:"button",role:"menuitemradio","aria-checked":u.type===c,onClick:()=>h(u.type),children:[Gt("span",{className:"gr-player__camera-label",children:u.label}),Gt("span",{className:"gr-player__camera-hint",children:u.hint})]},u.type))]})]})};import{jsx as zt,jsxs as ec}from"react/jsx-runtime";var qi=({className:i})=>{let{gracia:e,presentation:t,xr:r}=N(),{isSceneReady:s,isBlocking:n}=t,{enter:o}=r;if(n)return null;let a=e.xr.arSupported?pe.AR:e.xr.vrSupported?pe.VR:null;if(!a)return null;let l=a===pe.AR;return zt("div",{className:["gr-player__xr-actions",i].filter(Boolean).join(" "),children:zt(Jl,{active:e.mode===a,disabled:!s,icon:l?zt(xr,{}):zt(yr,{}),label:l?"View in AR":"Play in VR",mode:a,onEnter:o})})},Jl=({active:i,disabled:e,icon:t,label:r,mode:s,onEnter:n})=>ec(oe,{className:"gr-player__button--xr",onClick:e?void 0:()=>n(s),"aria-disabled":e||void 0,"aria-pressed":i||void 0,title:r,children:[zt("span",{children:r}),t]});import{jsx as yt,jsxs as Zi}from"react/jsx-runtime";var Wn=()=>{let{gracia:i,playlist:e,refs:t,presentation:r,shell:s}=N(),{isBlocking:n}=r,{localFilesEnabled:o,openLocalFile:a,localLabel:l}=s,{hasInteracted:c,resetView:h}=Ri(t.container,e.index,i.camera);return Zi("div",{className:"gr-player__top",children:[Zi("div",{className:"gr-player__top-left",children:[o&&yt(Be,{className:"gr-player__button--local",onClick:a,"aria-label":l,title:l,srLabel:"Open local file",children:yt(Ie,{})}),yt(qi,{className:"gr-player__xr-actions--desktop"})]}),Zi("div",{className:"gr-player__top-right",children:[yt(Un,{}),yt(qi,{className:"gr-player__xr-actions--mobile"}),!n&&c&&yt(oe,{variant:"secondary",className:"gr-player__reset",onClick:h,children:"Reset View"})]})]})};import{jsx as ji,jsxs as Yn}from"react/jsx-runtime";var Fr=()=>{let{presentation:i}=N(),{isBlocking:e,toast:t}=i;return Yn("div",{className:"gr-player__overlay",children:[ji(Wn,{}),!e&&Yn("div",{className:"gr-player__bottom",children:[t&&ji(yi,{message:t.title}),ji(Hn,{})]})]})};import{jsx as Ye}from"react/jsx-runtime";var qn=({onExit:i})=>Ye(oe,{className:"gr-player__xr-exit",onClick:i,children:"Back to 2D"}),Zn=({onExit:i})=>Ye(tt,{icon:Ye(xr,{}),title:"Running in AR",body:"View the scene in AR mode on your device",action:Ye(qn,{onExit:i}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),jn=({onExit:i})=>Ye(tt,{icon:Ye(yr,{}),title:"Running in VR",body:"Put on your VR-headset and explore the scene",action:Ye(qn,{onExit:i}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),Qi={ar:Zn,vr:jn};import{Fragment as tc,jsx as xt,jsxs as rc}from"react/jsx-runtime";var $i=()=>{let{gracia:i,presentation:e,xr:t}=N(),{isBusy:r,isBlocking:s,playerError:n}=e,{retry:o}=e,{activeScreenMode:a,exit:l}=t,c=a?Qi[a]:null;return rc(tc,{children:[r&&xt(bi,{}),s&&n&&xt(xi,{title:n.title,body:n.body,detail:n.cause.message,action:n.recoverable?xt(oe,{className:"gr-player__state-action",onClick:o,children:"Try again"}):void 0}),c&&xt(c,{onExit:l}),!r&&i.isRebuffering&&xt("div",{className:"gr-player__rebuffer-spinner",children:xt("div",{className:"gr-player__spinner"})})]})};import{jsx as Nt,jsxs as oc}from"react/jsx-runtime";var nc=[],Dt=ic(function(e,t){let{controls:r=!0,className:s,style:n,children:o,sources:a=nc,...l}=e,c=Qn(null),h=Qn(null),{contextValue:u,gracia:p,playlist:f,openLocalFile:g,toggleFullscreen:d}=Vi({...l,sources:a},{root:c,container:h}),{presentation:m,shell:x}=u,{isBusy:b}=m,{isFullscreen:y}=x;return sc(t,()=>({gracia:p,playlist:f,get cameraControlsType(){return p.camera.controlsType},play:()=>p.playback.play(),pause:()=>p.playback.pause(),seek:v=>p.playback.seek(v),open:v=>p.open(typeof v=="string"?{url:v,label:"Scene"}:v),close:()=>p.close(),next:()=>f.next(),prev:()=>f.prev(),goTo:v=>f.goTo(v),resetCamera:()=>p.camera.reset(),setCameraControls:v=>p.camera.setControls(v),setMode:v=>p.xr.setMode(v),toggleFullscreen:d,openLocalFile:g}),[p,g,f,d]),Nt(vi,{value:u,children:oc("section",{ref:c,className:J("gr-player",s,{"gr-player--loading":b,"gr-player--ready":p.isContentReady,"gr-player--scenes-single":f.total<=1,"gr-player--scenes-multiple":f.total>1,"gr-player--fullscreen":y,"gr-player--error":m.isBlocking}),style:n,children:[Nt("div",{ref:h,className:"gr-player__canvas"}),Nt("input",{className:"gr-player__file-input",type:"file",...x.fileInputProps}),Nt($i,{}),r&&Nt(Fr,{}),typeof o=="function"?o({gracia:p,playlist:f}):o]})})});import{createRef as ac}from"react";import{flushSync as lc}from"react-dom";import{createRoot as cc}from"react-dom/client";import{jsx as hc}from"react/jsx-runtime";function $n(i,e){let t=ac(),r=cc(i),s=e,n=!0,o=()=>{lc(()=>{r.render(hc(Dt,{...s,ref:t}))})};return o(),{get player(){return t.current},update(a){n&&(s=a,o())},unmount(){n&&(n=!1,t.current?.close(),r.unmount())},async openLocalFile(){await t.current?.openLocalFile()}}}import{Box3 as uc,BufferGeometry as pc,Float32BufferAttribute as dc,Matrix4 as fc,Mesh as mc,MeshBasicMaterial as gc,Sphere as yc,Vector2 as xc,Vector3 as Kn}from"three";var Br=class extends mc{#e;#t=null;#r=new xc;#i=!1;#s=new fc;enableMesh=!1;constructor(e){let t=new pc;t.setAttribute("position",new dc([0,0,0],3)),super(t,new gc({colorWrite:!1,depthWrite:!1,transparent:!0})),this.#e=e,this.frustumCulled=!1,this.castShadow=!0,this.renderOrder=1/0,this.onBeforeRender=this.#n,this.onBeforeShadow=this.#o}get player(){return this.#e}async setAudio(e){await this.#e.loadAudio(e)}setAudioListener(e){this.#t=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}dispose(){this.#e.close(),this.#e.dispose(),this.geometry.dispose(),this.material.dispose()}#o=(e,t,r,s)=>{this.enableMesh&&this.#l(e,s)};#n=(e,t,r)=>{e.getDrawingBufferSize(this.#r);let s=this.#r.x,n=this.#r.y;if(s===0||n===0)return;this.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let o=r.matrixWorld.elements;this.#t||this.#e.setAudioListenerMatrix(o),this.#e.setAudioSourceMatrix(this.matrixWorld.elements),this.#e.renderHybridViewport(s,n,{enableMesh:this.enableMesh}),e.resetState(),!this.#i&&this.#e.isReady&&this.#a()};#l(e,t){let r=e.getContext(),s=r.getParameter(r.VIEWPORT),n=s[2],o=s[3];n===0||o===0||(this.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),this.#s.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.#s.multiply(this.matrixWorld),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.depthMask(!0),this.#e.renderMesh(this.#s.elements,s[0],s[1],n,o),e.resetState())}#a(){let e=this.#e.getBBox();if(!e)return;let t=new uc(new Kn(e.minX,e.minY,e.minZ),new Kn(e.maxX,e.maxY,e.maxZ));this.geometry.boundingBox=t,this.geometry.boundingSphere=new yc,t.getBoundingSphere(this.geometry.boundingSphere),this.frustumCulled=!0,this.#i=!0}};import{ByteType as bc,DepthTexture as vc,Object3D as wc,RenderTarget as _c,RGBAFormat as Sc,UnsignedIntType as Mc,Vector2 as Jn}from"three";var eo=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST,Or=class i{#e;#t;#r;#i=null;root=new wc;static attach(e,t){return e.assertDevice(t.backend?.device),new i(e,t)}constructor(e,t){this.#e=e;let r=t.backend;e.configureSurface(r.context,{usage:eo});let{x:s,y:n}=t.getDrawingBufferSize(new Jn);this.#r=new vc,this.#r.type=Mc;let o=new _c(s,n);o.depthTexture=this.#r,e.isBGRA&&(o.texture.format=Sc,o.texture.type=bc,o.texture.internalFormat="bgra8unorm"),this.#t=o}get player(){return this.#e}setAudioListener(e){this.#i=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}render(e,t,r,s){let n=e.getDrawingBufferSize(new Jn),o=n.x,a=n.y;if(o===0||a===0)return;let l=this.#t;(l.width!==o||l.height!==a)&&(l.setSize(o,a),this.#e.configureSurface(e.backend.context,{usage:eo})),e.setRenderTarget(l),e.render(t,r),e.setRenderTarget(null);let c=e.backend,h=c.data.get(l.texture)?.texture,u=c.data.get(this.#r)?.texture;if(!h||!u||h.width!==o||h.height!==a)return;this.root.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.root.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let p=r.matrixWorld.elements;this.#i||this.#e.setAudioListenerMatrix(p),this.#e.setAudioSourceMatrix(this.root.matrixWorld.elements),this.#e.renderTextures({color:h,depth:u,w:o,h:a}),s&&(e.autoClearColor=!1,e.autoClearDepth=!0,e.autoClearStencil=!0,e.setRenderTarget(l),e.render(s,r),e.setRenderTarget(null),e.autoClearColor=!0);let f=c.context.getCurrentTexture();f.usage&GPUTextureUsage.COPY_DST&&f.width===o&&f.height===a&&this.#e.copyTexture(h,f,[o,a,1])}setStaticModelMatrix(e){this.#e.setStaticModelMatrix(e)}dispose(){this.#t.dispose(),this.#e.close(),this.#e.dispose()}};export{rt as BoundaryRenderer,at as ClassicControls,ct as DebugRenderer,Tt as ENV_PRESETS,mi as GRACIA_PLAYER_DEFAULT_CSS,Je as GraciaApp,Qe as GraciaPlayer,Dt as GraciaReactPlayer,fr as GraciaSplats,xe as Mat4,pt as ModernControls,Ur as POLYGON_MAX_CORNERS,Wr as POLYGON_MAX_LAYERS,it as QuadLayer,ye as Quat,Wt as SECTOR_TILT_MAX,Ke as SceneManipulator,dt as SceneOverlay,Br as SplatsMesh,Or as SplatsRendererW3,Y as Vec3,gt as XROverlay,ft as XRRayRenderer,F as axis,Vt as bbox,Zt as boundsShape,et as buildApiSources,ke as envCoefsFromPreset,Zr as envCoefsFromSH27,hi as fetchStreamingMetadata,Sr as installGraciaPlayerStyles,ii as isValidBounds,jt as loadGraciaModule,V as mat4,$n as mountGraciaPlayer,M as num,ke as presetToLightProbe,K as quat,Yr as sectorApexShift,mr as useGraciaPlayer,gr as useGraciaPlaylist,L as vec3};
