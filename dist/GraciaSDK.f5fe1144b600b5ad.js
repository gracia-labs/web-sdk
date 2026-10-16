var _e=Object.freeze,vt=_e([0,0,0]),fo=_e([1,1,1]),Ht=_e([1,0,0]),wt=_e([0,1,0]),as=_e([0,0,1]),Hr=_e([0,0,-1]),mo=.25,k=_e({X:Ht,Y:wt,Z:as,FORWARD:Hr,FLIP_X:_e([-1,1,1]),FLIP_Z:_e([1,1,-1])}),S={clamp:(i,e,t)=>Math.min(t,Math.max(e,i)),clampInt:(i,e,t)=>S.clamp(i|0,e,t),clamp01:i=>S.clamp(i,0,1),unlerp01:(i,e,t)=>t===e?0:S.clamp01((i-e)/(t-e)),finite:(i,e=0)=>Number.isFinite(i)?i:e,wrapPi(i){return i>Math.PI?i-2*Math.PI:i<-Math.PI?i+2*Math.PI:i},wrap(i,e){return e>0?(i%e+e)%e:0},wrapDelta(i,e){return e>0?i-e*Math.round(i/e):i},signedClamp(i,e,t){return i===0?0:S.clamp(Math.abs(i),e,t)*Math.sign(i)},zoomStep(i,e=.05,t=10){return i>0?S.signedClamp(Math.log2(i),e,t):0},absLogRatio(i,e){return i>0&&e>0?Math.abs(Math.log(i/e)):0},outside(i,e){return Math.abs(i)>e},perspectiveScale(i,e,t){return 2*i*Math.tan(e*Math.PI/360)/Math.max(1,t)},deadzone(i,e){let t=Math.abs(i);return t<e?0:((t-e)/(1-e))**2*Math.sign(i)},deltaSeconds(i,e,t=0,r=mo){return e?Math.min((i-e)/1e3,r):t}},Ut={center(i,e){return i[0]=(e.minX+e.maxX)*.5,i[1]=(e.minY+e.maxY)*.5,i[2]=(e.minZ+e.maxZ)*.5,i}},U=class extends Float32Array{constructor(e){super(3),e&&this.from(e)}set(e,t,r){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this)}fromXYZ(e){return this.set(e.x,e.y,e.z)}from(e){return typeof e.x=="number"?this.fromXYZ(e):this.set(e[0],e[1],e[2])}copy(e){return this.set(e[0],e[1],e[2])}add(e){return this[0]+=e[0],this[1]+=e[1],this[2]+=e[2],this}addXYZ(e=0,t=0,r=0){return this[0]+=e,this[1]+=t,this[2]+=r,this}addTo(e,t=vt){return e[0]=t[0]+this[0],e[1]=t[1]+this[1],e[2]=t[2]+this[2],e}addScaled(e,t){return this[0]+=e[0]*t,this[1]+=e[1]*t,this[2]+=e[2]*t,this}addDelta(e,t){return this[0]+=e[0]-t[0],this[1]+=e[1]-t[1],this[2]+=e[2]-t[2],this}sub(e,t){return t?(this[0]=e[0]-t[0],this[1]=e[1]-t[1],this[2]=e[2]-t[2],this):(this[0]-=e[0],this[1]-=e[1],this[2]-=e[2],this)}subXYZ(e,t){return this.set(e.x-t.x,e.y-t.y,e.z-t.z)}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this}multiply(e){return this[0]*=e[0],this[1]*=e[1],this[2]*=e[2],this}multiplyXYZ(e=1,t=1,r=1){return this[0]*=e,this[1]*=t,this[2]*=r,this}divide(e){return this[0]=e[0]?this[0]/e[0]:0,this[1]=e[1]?this[1]/e[1]:0,this[2]=e[2]?this[2]/e[2]:0,this}clampScalar(e,t){return this[0]=S.clamp(this[0],e,t),this[1]=S.clamp(this[1],e,t),this[2]=S.clamp(this[2],e,t),this}normalize(e=vt){let t=Math.hypot(this[0],this[1],this[2]);return Number.isFinite(t)&&t>1e-6?this.scale(1/t):this.copy(e)}setLength(e,t=Ht){return this.normalize(t).scale(e)}cross(e,t){let r=e[0],s=e[1],n=e[2],o=t[0],a=t[1],l=t[2];return this[0]=s*l-n*a,this[1]=n*o-r*l,this[2]=r*a-s*o,this}lerp(e,t){return this[0]+=t*(e[0]-this[0]),this[1]+=t*(e[1]-this[1]),this[2]+=t*(e[2]-this[2]),this}midXYZ(e,t){return this.set((e.x+t.x)*.5,(e.y+t.y)*.5,(e.z+t.z)*.5)}fromMat4Column(e,t){let r=t*4;return this.set(e[r],e[r+1],e[r+2])}transformMat4(e){let t=this[0],r=this[1],s=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*s+e[12],this[1]=e[1]*t+e[5]*r+e[9]*s+e[13],this[2]=e[2]*t+e[6]*r+e[10]*s+e[14],this}transformMat4Direction(e){let t=this[0],r=this[1],s=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*s,this[1]=e[1]*t+e[5]*r+e[9]*s,this[2]=e[2]*t+e[6]*r+e[10]*s,this}transformQuat(e){let t=this[0],r=this[1],s=this[2],n=e[0],o=e[1],a=e[2],l=e[3],h=l*t+o*s-a*r,c=l*r+a*t-n*s,u=l*s+n*r-o*t,p=-n*t-o*r-a*s;return this[0]=h*l+p*-n+c*-a-u*-o,this[1]=c*l+p*-o+u*-n-h*-a,this[2]=u*l+p*-a+h*-o-c*-n,this}fromYawPitch(e,t){let r=Math.cos(t);return this.set(r*Math.sin(e),Math.sin(t),-r*Math.cos(e))}yawPitch(e){return this[0]=Math.atan2(e[0],-e[2]),this[1]=Math.asin(S.clamp(e[1],-1,1)),this[2]=0,this}basisFromForward(e,t,r=wt){return this.cross(t,r).normalize(Ht),e.cross(this,t),this}yawPitchBasis(e,t,r,s,n){return r.fromYawPitch(e,t),s.copy(r).scale(-1),this.set(Math.cos(e),0,Math.sin(e)),n.cross(s,this),this}rollBasis(e,t){let r=Math.cos(t),s=Math.sin(t),n=this[0],o=this[1],a=this[2],l=e[0],h=e[1],c=e[2];return this.set(n*r+l*s,o*r+h*s,a*r+c*s),e.set(l*r-n*s,h*r-o*s,c*r-a*s),this}fromSphereDir(e,t){let r=Math.sin(t);return this.set(r*Math.sin(e),Math.cos(t),r*Math.cos(e))}polarY(e,t,r=1e-6){let s=e[0]-t[0],n=e[1]-t[1],o=e[2]-t[2],a=Math.max(r,Math.hypot(s,n,o));return this[0]=Math.atan2(s,o),this[1]=Math.acos(S.clamp(n/a,-1,1)),this[2]=a,this}equals(e,t=1e-6){return Math.abs(this[0]-e[0])<=t&&Math.abs(this[1]-e[1])<=t&&Math.abs(this[2]-e[2])<=t}toArray(){return[this[0],this[1],this[2]]}toXYZ(){return{x:this[0],y:this[1],z:this[2]}}distanceXYZ(e){return Math.hypot(this[0]-e.x,this[1]-e.y,this[2]-e.z)}dot(e){return this[0]*e[0]+this[1]*e[1]+this[2]*e[2]}get sqrLen(){return this[0]*this[0]+this[1]*this[1]+this[2]*this[2]}get len(){return Math.hypot(this[0],this[1],this[2])}get xzLen(){return Math.hypot(this[0],this[2])}get minComponent(){return Math.min(this[0],this[1],this[2])}get maxAbs(){return Math.max(Math.abs(this[0]),Math.abs(this[1]),Math.abs(this[2]))}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}},ye=class extends Float32Array{constructor(e){super(4),e?this.from(e):this.identity()}set(e,t,r,s){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this[3]=s,this)}fromXYZW(e){return this.set(e.x,e.y,e.z,e.w)}from(e){return typeof e.x=="number"?this.fromXYZW(e):this.set(e[0],e[1],e[2],e[3])}copy(e){return this.set(e[0],e[1],e[2],e[3])}identity(){return this.set(0,0,0,1)}normalize(){let e=Math.hypot(this[0],this[1],this[2],this[3]);return e>1e-6?this.scale(1/e):this.identity()}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this[3]*=e,this}setAxisAngle(e,t){let r=t*.5,s=Math.sin(r);return this.set(e[0]*s,e[1]*s,e[2]*s,Math.cos(r))}rotatePre(e,t){return this.mul(Vt.setAxisAngle(e,t),this)}rotate(e,t){return this.mul(Vt.setAxisAngle(e,t))}mul(e,t){let r=t?e:this,s=t??e,n=r[0],o=r[1],a=r[2],l=r[3],h=s[0],c=s[1],u=s[2],p=s[3];return this[0]=n*p+l*h+o*u-a*c,this[1]=o*p+l*c+a*h-n*u,this[2]=a*p+l*u+n*c-o*h,this[3]=l*p-n*h-o*c-a*u,this}invert(e=this){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return this.set(-e[0]*r,-e[1]*r,-e[2]*r,e[3]*r)}slerp(e,t){let r=e[0],s=e[1],n=e[2],o=e[3],a=this[0]*r+this[1]*s+this[2]*n+this[3]*o;a<0&&(a=-a,r=-r,s=-s,n=-n,o=-o);let l=1-t,h=t;if(1-a>1e-6){let c=Math.acos(a),u=Math.sin(c);l=Math.sin((1-t)*c)/u,h=Math.sin(t*c)/u}return this.set(l*this[0]+h*r,l*this[1]+h*s,l*this[2]+h*n,l*this[3]+h*o)}toXYZW(){return{x:this[0],y:this[1],z:this[2],w:this[3]}}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}get w(){return this[3]}set w(e){this[3]=e}},xe=class extends Float32Array{constructor(e){super(16),e?this.copy(e):this.identity()}copy(e){return super.set(e),this}identity(){return this.fill(0),this[0]=this[5]=this[10]=this[15]=1,this}multiply(e,t){return t?Xr(this,e,t):Xr(this,this,e)}preMultiply(e){return Xr(this,e,this)}fromTranslation(e){return this.identity(),this[12]=e[0],this[13]=e[1],this[14]=e[2],this}fromScaling(e){return this.identity(),this[0]=e[0],this[5]=e[1],this[10]=e[2],this}perspective(e,t,r,s){let n=1/Math.tan(e*Math.PI/360);return this.fill(0),this[0]=n/t,this[5]=n,this[10]=(s+r)/(r-s),this[11]=-1,this[14]=2*s*r/(r-s),this}cameraWorld(e,t,r=wt){let s=ce.sub(e,t).normalize(as),n=ns.cross(r,s).normalize(Ht),o=yo.cross(s,n);return this.cameraWorldAxes(e,n,o,s)}cameraWorldAxes(e,t,r,s){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=0,this[4]=r[0],this[5]=r[1],this[6]=r[2],this[7]=0,this[8]=s[0],this[9]=s[1],this[10]=s[2],this[11]=0,this[12]=e[0],this[13]=e[1],this[14]=e[2],this[15]=1,this}fromQuat(e){return this.fromRotationTranslationScale(e,vt,fo)}fromTransform(e){let{rotation:t,translation:r,scale:s}=e;return Vt.fromXYZW(t).normalize(),this.fromRotationTranslationScale(Vt,ce.fromXYZ(r),ns.set(s.x,s.y,s.z))}fromRotationTranslationScale(e,t,r){let s=e[0],n=e[1],o=e[2],a=e[3],l=s+s,h=n+n,c=o+o,u=s*l,p=s*h,f=s*c,g=n*h,d=n*c,m=o*c,y=a*l,v=a*h,b=a*c,x=r[0],_=r[1],M=r[2];return this[0]=(1-(g+m))*x,this[1]=(p+b)*x,this[2]=(f-v)*x,this[3]=0,this[4]=(p-b)*_,this[5]=(1-(u+m))*_,this[6]=(d+y)*_,this[7]=0,this[8]=(f+v)*M,this[9]=(d-y)*M,this[10]=(1-(u+g))*M,this[11]=0,this[12]=t[0],this[13]=t[1],this[14]=t[2],this[15]=1,this}setPosition(e){return this[12]=e[0],this[13]=e[1],this[14]=e[2],this}translate(e){let t=e[0],r=e[1],s=e[2];return this[12]=this[0]*t+this[4]*r+this[8]*s+this[12],this[13]=this[1]*t+this[5]*r+this[9]*s+this[13],this[14]=this[2]*t+this[6]*r+this[10]*s+this[14],this[15]=this[3]*t+this[7]*r+this[11]*s+this[15],this}scale(e){let t=e[0],r=e[1],s=e[2];for(let n=0;n<4;n++)this[n]*=t,this[n+4]*=r,this[n+8]*=s;return this}fromPivot(e,t,r,s,n){return this.fromTranslation(e).scale(r).translate(s),this.multiply(xo.fromQuat(t)),this.translate(ce.copy(s).scale(-1)),n?this.multiply(n):this}pointTo(e,t=vt,r=1){return ls(e,this,t,r)}poseTo(e){return hs(e,this)}get determinant3(){return this[0]*(this[5]*this[10]-this[6]*this[9])+this[1]*(this[6]*this[8]-this[4]*this[10])+this[2]*(this[4]*this[9]-this[5]*this[8])}decompose(e,t,r){let s=Math.hypot(this[0],this[1],this[2]),n=Math.hypot(this[4],this[5],this[6]),o=Math.hypot(this[8],this[9],this[10]);this.determinant3<0&&(s=-s),e.set(this[12],this[13],this[14]),r.set(s,n,o);let a=s?1/s:0,l=n?1/n:0,h=o?1/o:0;return ge[0]=this[0]*a,ge[1]=this[1]*a,ge[2]=this[2]*a,ge[3]=this[4]*l,ge[4]=this[5]*l,ge[5]=this[6]*l,ge[6]=this[8]*h,ge[7]=this[9]*h,ge[8]=this[10]*h,go(t,ge),this}};function go(i,e){let t=e[0]+e[4]+e[8];if(t>0){let a=Math.sqrt(t+1),l=.5*a;return a=.5/a,i.set((e[5]-e[7])*a,(e[6]-e[2])*a,(e[1]-e[3])*a,l)}let r=0;e[4]>e[0]&&(r=1),e[8]>e[r*3+r]&&(r=2);let s=(r+1)%3,n=(r+2)%3,o=Math.sqrt(e[r*3+r]-e[s*3+s]-e[n*3+n]+1);return i[r]=.5*o,o=.5/o,i[3]=(e[s*3+n]-e[n*3+s])*o,i[s]=(e[s*3+r]+e[r*3+s])*o,i[n]=(e[n*3+r]+e[r*3+n])*o,i}var ce=new U,ns=new U,yo=new U,Vt=new ye,xo=new xe,ge=new Float32Array(9);function Xr(i,e,t){let r=e[0],s=e[1],n=e[2],o=e[3],a=e[4],l=e[5],h=e[6],c=e[7],u=e[8],p=e[9],f=e[10],g=e[11],d=e[12],m=e[13],y=e[14],v=e[15],b=t[0],x=t[1],_=t[2],M=t[3];return i[0]=b*r+x*a+_*u+M*d,i[1]=b*s+x*l+_*p+M*m,i[2]=b*n+x*h+_*f+M*y,i[3]=b*o+x*c+_*g+M*v,b=t[4],x=t[5],_=t[6],M=t[7],i[4]=b*r+x*a+_*u+M*d,i[5]=b*s+x*l+_*p+M*m,i[6]=b*n+x*h+_*f+M*y,i[7]=b*o+x*c+_*g+M*v,b=t[8],x=t[9],_=t[10],M=t[11],i[8]=b*r+x*a+_*u+M*d,i[9]=b*s+x*l+_*p+M*m,i[10]=b*n+x*h+_*f+M*y,i[11]=b*o+x*c+_*g+M*v,b=t[12],x=t[13],_=t[14],M=t[15],i[12]=b*r+x*a+_*u+M*d,i[13]=b*s+x*l+_*p+M*m,i[14]=b*n+x*h+_*f+M*y,i[15]=b*o+x*c+_*g+M*v,i}function ls(i,e,t=vt,r=1){let s=t[0]??0,n=t[1]??0,o=t[2]??0;return i[0]=e[0]*s+e[4]*n+e[8]*o+e[12],i[1]=e[1]*s+e[5]*n+e[9]*o+e[13],i[2]=e[2]*s+e[6]*n+e[10]*o+e[14],r!==1&&(i[0]*=r,i[1]*=r,i[2]*=r),i}function os(i,e,t,r){let s=t[0],n=t[1],o=t[2];i[0]=e[0]*s+e[4]*n+e[8]*o,i[1]=e[1]*s+e[5]*n+e[9]*o,i[2]=e[2]*s+e[6]*n+e[10]*o;let a=Math.hypot(i[0],i[1],i[2]);if(Number.isFinite(a)&&a>1e-6){let l=1/a;i[0]*=l,i[1]*=l,i[2]*=l}else i[0]=r[0],i[1]=r[1],i[2]=r[2];return i}function hs(i,e){return i[0]=e[12],i[1]=e[13],i[2]=e[14],os(ce,e,Hr,Hr),i[3]=ce[0],i[4]=ce[1],i[5]=ce[2],os(ce,e,wt,wt),i[6]=ce[0],i[7]=ce[1],i[8]=ce[2],i}var P={create:()=>new U},$={create:()=>new ye},D={create:()=>new xe,clone:i=>new xe(i),pointTo:ls,poseTo:hs};var Wt=75,Yr=64,qr=8,je=1e-6,te=64,cs=16,us=24,ps=.9,_t=.001,ds=8,bo=new Float64Array(3),St=i=>typeof i=="number"&&Number.isFinite(i),vo=i=>!!i&&St(i.x)&&St(i.y)&&St(i.z),Zr=i=>S.clamp(Math.abs(i??90),1,360)*Math.PI/360,fs=(i,e,t)=>{let r=-e+t/te*2*e;return[Math.sin(r)*i,Math.cos(r)*i]};function jt(i,e){if(Zr(i.angleDeg)>=Math.PI-je)return 0;let t=Math.min(e[0],e[2]),r=S.clamp(i.tiltDeg??0,-Wt,Wt)*Math.PI/180;return S.clamp(2*e[1]*Math.tan(r),-ps*t,ps*t)}function ms(i){switch(i?.type){case"box":case"sphere":return!0;case"sector":return(i.angleDeg==null||St(i.angleDeg))&&(i.tiltDeg==null||St(i.tiltDeg));case"polygon":return!!gs(i);default:return!1}}function Qt(i,e){let t=[e[0],e[1],e[2]];if(i.type==="sphere")return new Wr(t);if(i.type==="sector")return jt(i,t)?Ro(i,t):new qt(Eo(i,t),t);if(i.type==="polygon"){let r=gs(i).map(s=>s.map((n,o)=>n*2*t[o%3]));return new Zt(r,[r[0],r[r.length-1]],ys(r))}return new qt(Lo(t),t)}function wo(i,e){let t=Math.abs(i[0])-e[0],r=Math.abs(i[2])-e[2];return Math.hypot(Math.max(t,0),Math.max(r,0))+Math.min(Math.max(t,r),0)}function _o(i,e){let t=Math.hypot(i[0]/e[0],i[1]/e[1],i[2]/e[2]);if(t===0)return-Math.min(e[0],e[1],e[2]);let r=Math.hypot(i[0]/(e[0]*e[0]),i[1]/(e[1]*e[1]),i[2]/(e[2]*e[2]));return t*(t-1)/r}function So(i,e,t){let r=Math.abs(e)-t;return Math.min(Math.max(i,r),0)+Math.hypot(Math.max(i,0),Math.max(r,0))}function Vr(i){let e=i.length/2,t=0;for(let r=0;r<e;r++){let s=(r+1)%e*2;t+=i[r*2]*i[s+1]-i[s]*i[r*2+1]}return t/2}var Ae=(i,e,t,r,s,n)=>(t-i)*(n-e)-(r-e)*(s-i);function Ze(i,e,t,r,s,n){let o=s-t,a=n-r,l=S.clamp01(((i-t)*o+(e-r)*a)/(o*o+a*a));return Math.hypot(i-t-o*l,e-r-a*l)}function Mo(i,e,t){let r=i.length/2,s=e*2,n=(e+1)%r*2,o=t*2,a=(t+1)%r*2,l=Ae(i[o],i[o+1],i[a],i[a+1],i[s],i[s+1]),h=Ae(i[o],i[o+1],i[a],i[a+1],i[n],i[n+1]),c=Ae(i[s],i[s+1],i[n],i[n+1],i[o],i[o+1]),u=Ae(i[s],i[s+1],i[n],i[n+1],i[a],i[a+1]);return l*h<0&&c*u<0?0:Math.min(Ze(i[s],i[s+1],i[o],i[o+1],i[a],i[a+1]),Ze(i[n],i[n+1],i[o],i[o+1],i[a],i[a+1]),Ze(i[o],i[o+1],i[s],i[s+1],i[n],i[n+1]),Ze(i[a],i[a+1],i[s],i[s+1],i[n],i[n+1]))}function To(i){let e=i.length/2;for(let t=0;t<e;t++){let r=(t+e-1)%e*2,s=t*2,n=(t+1)%e*2;if(Math.hypot(i[n]-i[s],i[n+1]-i[s+1])<_t||Ze(i[n],i[n+1],i[r],i[r+1],i[s],i[s+1])<_t||Ze(i[r],i[r+1],i[s],i[s+1],i[n],i[n+1])<_t)return!1}for(let t=0;t<e;t++)for(let r=t+2;r<e;r++)if(!(t===0&&r===e-1)&&Mo(i,t,r)<_t)return!1;return!0}function Po(i,e,t,r){for(let s=0;s<e.length;s++)i[s]=e[s]+(t[s]-e[s])*r;return i}function gs(i){let{layers:e}=i;if(!Array.isArray(e)||e.length<2||e.length>qr)return null;let t=Array.isArray(e[0])?e[0].length:0;if(t<3||t>Yr||!e.every(a=>Array.isArray(a)&&a.length===t&&a.every(vo)))return null;let r=e.map(a=>Float64Array.from(a.flatMap(l=>[l.x,l.y,l.z])));for(let a=1;a<r.length;a++)for(let l=0;l<t;l++)if(r[a][l*3+1]-r[a-1][l*3+1]<_t)return null;let s=r.map(Yt),n=Math.sign(Vr(s[0])),o=new Float64Array(t*2);for(let a=0;a<s.length-1;a++)for(let l=a?1:0;l<=ds;l++){Po(o,s[a],s[a+1],l/ds);let h=Vr(o);if(Math.abs(h)<je||Math.sign(h)!==n||!To(o))return null}return n>0?r:r.map(Co)}function Yt(i){let e=i.length/3,t=new Float64Array(e*2);for(let r=0;r<e;r++)t[r*2]=i[r*3],t[r*2+1]=i[r*3+2];return t}function Co(i){let e=i.length/3,t=new Float64Array(i.length);for(let r=0;r<e;r++)t.set(i.subarray((e-1-r)*3,(e-r)*3),r*3);return t}function Ur(i){let e=i.length/2,t=Math.sign(Vr(i))||1,r=Array.from({length:e},(l,h)=>h),s=[],n=l=>i[l*2],o=l=>i[l*2+1],a=(l,h,c)=>{if(Ae(n(l),o(l),n(h),o(h),n(c),o(c))*t<=je*je)return!1;for(let u of r){if(u===l||u===h||u===c)continue;let p=Ae(n(l),o(l),n(h),o(h),n(u),o(u))*t,f=Ae(n(h),o(h),n(c),o(c),n(u),o(u))*t,g=Ae(n(c),o(c),n(l),o(l),n(u),o(u))*t;if(p>=0&&f>=0&&g>=0)return!1}return!0};for(;r.length>3;){let l=r.length,h=!1;for(let c=0;c<l;c++){let u=r[(c+l-1)%l],p=r[c],f=r[(c+1)%l];if(a(u,p,f)){s.push(u,p,f),r.splice(c,1),h=!0;break}}if(!h)break}return r.length===3&&s.push(r[0],r[1],r[2]),s}function Lo(i){let e=new Float32Array([-i[0],-i[2],i[0],-i[2],i[0],i[2],-i[0],i[2]]);return{walls:t=>wo(t,i),ringAt:()=>e,wallRingAt:()=>e,levels:[0,1],rulings:[0,1,2,3]}}function Eo(i,e){let t=Math.min(e[0],e[2]),r=Zr(i.angleDeg),s=r>=Math.PI-je,n=Math.sin(r),o=Math.cos(r),a=h=>{let c=Math.hypot(h[0],h[2])-t;if(s)return c;let u=Math.abs(h[0]),p=S.clamp(u*n+h[2]*o,0,t),f=Math.hypot(u-n*p,h[2]-o*p);return Math.max(c,f*Math.sign(o*u-n*h[2]))},l=s?Qr(t,t):Float32Array.from([0,0,...Array.from({length:te+1},(h,c)=>fs(t,r,c)).flat()]);return{walls:a,ringAt:()=>l,wallRingAt:()=>l,levels:[0,1],rulings:s?[]:[0,1,te+1]}}function Ro(i,e){let t=e[1],r=Math.min(e[0],e[2]),s=Zr(i.angleDeg),n=jt(i,e),o=Array.from({length:te+1},(h,c)=>fs(r,s,c)),a=(h,c)=>{let u=-t+2*t*h,p=n*h,f=[0,u,p],g=([d,m],y)=>f.push(d*y,u,p+(m-p)*y);for(let d=1;d<c;d++)g(o[0],d/c);for(let[d,m]of o)f.push(d,u,m);for(let d=c-1;d>0;d--)g(o[te],d/c);return Float64Array.from(f)},l=[a(0,1),a(1,1)];return new Zt([a(0,cs),a(1,cs)],l,ys(l,[0,1,te+1]))}var qt=class{#e;#t;#r=null;#i=null;#s=null;constructor(e,t){this.#e=e,this.#t=t}signedDistance(e){return So(this.#e.walls(e),e[1],this.#t[1])}get outlines(){let e=this.#t[1];return this.#r??=[Xe(this.#e.ringAt(0),-e),Xe(this.#e.ringAt(1),e)],this.#r}get mesh(){return this.#i??=Io(this.#e,this.#t[1]),this.#i}get lines(){return this.#s??=Fo(this.#e,this.#t[1]),this.#s}},Wr=class{#e;#t=null;#r=null;#i=null;constructor(e){this.#e=e}signedDistance(e){return _o(e,this.#e)}get outlines(){return this.#t??=[Xe(Qr(this.#e[0],this.#e[2]),-this.#e[1])],this.#t}get mesh(){return this.#r??=Bo(this.#e),this.#r}get lines(){return this.#i??=Oo(this.#e),this.#i}},Zt=class{#e;#t;#r;#i;#s=null;#n;constructor(e,t,r){this.#e=e,this.#t=t,this.#i=r;let s=e[0].length/3,n=(p,f)=>p.subarray(f*3,f*3+3),o=[],a=(p,f,g)=>o.push(...p,...f,...g);for(let p=0;p<e.length-1;p++)for(let f=0;f<s;f++){let g=(f+1)%s;a(n(e[p],f),n(e[p+1],f),n(e[p+1],g)),a(n(e[p],f),n(e[p+1],g),n(e[p],g))}let[l,h]=t,c=Ur(Yt(h));for(let p=0;p<c.length;p+=3)a(n(h,c[p]),n(h,c[p+2]),n(h,c[p+1]));let u=Ur(Yt(l));for(let p=0;p<u.length;p+=3)a(n(l,u[p]),n(l,u[p+1]),n(l,u[p+2]));this.#r=Float64Array.from(o),this.#n=t.map(p=>Float32Array.from(p))}signedDistance(e){let t=this.#r,r=0,s=Number.POSITIVE_INFINITY;for(let n=0;n<t.length;n+=9)r+=ko(e,t,n),s=Math.min(s,Ao(e,t,n,bo));return Math.abs(r)>2*Math.PI?-s:s}get outlines(){return this.#n}get mesh(){return this.#s??=jr(this.#e,[this.#t[1],this.#t[0]],!0),this.#s}get lines(){return this.#i}};function De(i,e,t,r,s){for(let n=0;n<3;n++)i[n]=e[t+n]+(e[t+3+n]-e[t+n])*r+(e[t+6+n]-e[t+n])*s}function Ao(i,e,t,r){let s=e[t+3]-e[t],n=e[t+4]-e[t+1],o=e[t+5]-e[t+2],a=e[t+6]-e[t],l=e[t+7]-e[t+1],h=e[t+8]-e[t+2],c=s*(i[0]-e[t])+n*(i[1]-e[t+1])+o*(i[2]-e[t+2]),u=a*(i[0]-e[t])+l*(i[1]-e[t+1])+h*(i[2]-e[t+2]),p=s*(i[0]-e[t+3])+n*(i[1]-e[t+4])+o*(i[2]-e[t+5]),f=a*(i[0]-e[t+3])+l*(i[1]-e[t+4])+h*(i[2]-e[t+5]),g=s*(i[0]-e[t+6])+n*(i[1]-e[t+7])+o*(i[2]-e[t+8]),d=a*(i[0]-e[t+6])+l*(i[1]-e[t+7])+h*(i[2]-e[t+8]),m=p*d-g*f,y=g*u-c*d,v=c*f-p*u;if(c<=0&&u<=0)De(r,e,t,0,0);else if(p>=0&&f<=p)De(r,e,t,1,0);else if(v<=0&&c>=0&&p<=0)De(r,e,t,c/(c-p),0);else if(d>=0&&g<=d)De(r,e,t,0,1);else if(y<=0&&u>=0&&d<=0)De(r,e,t,0,u/(u-d));else if(m<=0&&f-p>=0&&g-d>=0){let b=(f-p)/(f-p+(g-d));De(r,e,t,1-b,b)}else{let b=1/(m+y+v);De(r,e,t,y*b,v*b)}return Math.hypot(i[0]-r[0],i[1]-r[1],i[2]-r[2])}function ko(i,e,t){let r=e[t]-i[0],s=e[t+1]-i[1],n=e[t+2]-i[2],o=e[t+3]-i[0],a=e[t+4]-i[1],l=e[t+5]-i[2],h=e[t+6]-i[0],c=e[t+7]-i[1],u=e[t+8]-i[2],p=Math.sqrt(r*r+s*s+n*n),f=Math.sqrt(o*o+a*a+l*l),g=Math.sqrt(h*h+c*c+u*u),d=r*(a*u-l*c)-s*(o*u-l*h)+n*(o*c-a*h),m=r*o+s*a+n*l,y=o*h+a*c+l*u,v=h*r+c*s+u*n;return 2*Math.atan2(d,p*f*g+m*g+y*p+v*f)}function jr(i,e,t){let r=i[0].length/3,s=[],n=[],o=[],a=Number.POSITIVE_INFINITY;for(let d of i)for(let m=1;m<d.length;m+=3)a=Math.min(a,d[m]);let l=(d,m)=>{let y=m*3,v=(m+1)%r*3;return Math.hypot(d[v]-d[y],d[v+1]-d[y+1],d[v+2]-d[y+2])},h=d=>{let m=0;for(let y=0;y<r;y++)m+=l(d,y);return m},c=i.reduce((d,m)=>h(m)>h(d)?m:d),u=new Float64Array(r*2),p=[0];for(let d=0;d<r;d++){let m=d*3,y=(d+1)%r*3,v=0,b=0,x=0;for(let E of i)v+=E[y]-E[m],b+=E[y+2]-E[m+2],x=Math.max(x,l(E,d));let _=Math.hypot(v,b);_>je&&(u[d*2]=v/_,u[d*2+1]=b/_);let M=(c[y]-c[m])*u[d*2]+(c[y+2]-c[m+2])*u[d*2+1];p.push(p[d]+(t?M:x))}let f=(d,m,y,v,b)=>{let x=m%r*3,_=y*3,M=t?p[y]+(d[x]-c[_])*u[y*2]+(d[x+2]-c[_+2])*u[y*2+1]:p[y+v];s.push(d[x],d[x+1],d[x+2]),n.push(M*b,d[x+1]-a,b)};for(let d=0;d<i.length-1;d++)for(let m=0;m<r;m++){let y=s.length/3,v=t?1:l(i[d],m),b=t?1:l(i[d+1],m);f(i[d],m,m,0,v),f(i[d],m+1,m,1,v),f(i[d+1],m+1,m,1,b),f(i[d+1],m,m,0,b),o.push(y,y+1,y+2,y,y+2,y+3)}let g=o.length;for(let d of e){let m=s.length/3;for(let y=0;y<d.length;y+=3)s.push(d[y],d[y+1],d[y+2]),n.push(0,d[y+1]-a,1);for(let y of Ur(Yt(d)))o.push(m+y)}return{positions:new Float32Array(s),grid:new Float32Array(n),indices:new Uint32Array(o),capStart:g}}function Io(i,e){let t=i.levels.map(s=>Xe(i.wallRingAt(s),-e+2*e*s)),r=[Xe(i.ringAt(1),e),Xe(i.ringAt(0),-e)];return jr(t,r,!0)}function Fo(i,e){let t=i.levels.map(a=>i.ringAt(a)),r=i.levels.map(a=>-e+2*e*a),s=t[0].length/2,n=[],o=(a,l,h,c,u,p)=>n.push(a[l*2],h,a[l*2+1],c[u*2],p,c[u*2+1]);for(let a of[0,t.length-1])for(let l=0;l<s;l++)o(t[a],l,r[a],t[a],(l+1)%s,r[a]);for(let a of i.rulings)for(let l=0;l<t.length-1;l++)o(t[l],a,r[l],t[l+1],a,r[l+1]);return new Float32Array(n)}function Xe(i,e){let t=i.length/2,r=new Float32Array(t*3);for(let s=0;s<t;s++)r.set([i[s*2],e,i[s*2+1]],s*3);return r}function ys(i,e=Array.from({length:i[0].length/3},(t,r)=>r)){let t=i[0].length/3,r=[],s=(n,o)=>r.push(n[o*3],n[o*3+1],n[o*3+2]);for(let n of i)for(let o=0;o<t;o++)s(n,o),s(n,(o+1)%t);for(let n=0;n<i.length-1;n++)for(let o of e)s(i[n],o),s(i[n+1],o);return new Float32Array(r)}function Qr(i,e){let t=new Float32Array(te*2);for(let r=0;r<te;r++){let s=r/te*2*Math.PI;t[r*2]=Math.sin(s)*i,t[r*2+1]=Math.cos(s)*e}return t}function Bo(i){let e=[];for(let t=0;t<=us;t++){let r=-Math.PI/2+t/us*Math.PI,s=Math.cos(r);e.push(Xe(Qr(i[0]*s,i[2]*s),i[1]*Math.sin(r)))}return jr(e,[],!1)}function Oo(i){let e=[],t=r=>{for(let s=0;s<te;s++)e.push(...r(s/te*2*Math.PI),...r((s+1)/te*2*Math.PI))};return t(r=>[Math.cos(r)*i[0],Math.sin(r)*i[1],0]),t(r=>[Math.cos(r)*i[0],0,Math.sin(r)*i[2]]),t(r=>[0,Math.cos(r)*i[1],Math.sin(r)*i[2]]),new Float32Array(e)}var Go=.28209479177387814;function xs(i,e=.5){let t=1/(Go*Math.max(i[0],i[1],i[2],.01));for(let r=0;r<3;r++)i[r]*=t;for(let r=3;r<12;r++)i[r]*=t*e}function $r(i,e=null,t=.5){let r=new Float32Array(12);for(let s=0;s<12;s++)r[s]=i[s];if(e){let s=e[0]??e.x,n=e[1]??e.y,o=e[2]??e.z;if(r[9]*s+r[3]*n+r[6]*o>0)for(let a=3;a<12;a++)r[a]*=-1}return xs(r,t),r}function ke(i){let e=new Float32Array(12);return e.set(i.ambient,0),e.set(i.topDown,3),i.frontBack&&e.set(i.frontBack,6),i.leftRight&&e.set(i.leftRight,9),e}async function $t(i="@gracia/web-sdk/wasm"){for(let e=0;;e++)try{let t=await import(i);return t.default??t}catch{await new Promise(r=>setTimeout(r,1e3))}}var Kt=class{#e;#t=0;constructor(e,t=512){this.#e=e,this.#t=e._malloc(t)}ptr(e=0){return this.#t+e}get f32(){return this.#e.HEAPF32}writeF32(e,t=0){this.#e.HEAPF32.set(e,this.#t+t>>2)}readF32(e,t=0){let r=this.#t+t;return new Float32Array(this.#e.HEAPF32.buffer,r,e)}free(){this.#t&&(this.#e._free(this.#t),this.#t=0)}};function Kr(i,e,...t){if(!e)return;let r=new TextEncoder,s=[],n=t.map(a=>{if(typeof a!="string")return a;let l=r.encode(a),h=i._malloc(l.length+1);return i.HEAPU8.set(l,h),i.HEAPU8[h+l.length]=0,s.push(h),h}),o=e(...n);for(let a of s)i._free(a);return o}var C=(i,e)=>i[`_Gracia_${e}`];async function zo(){let i=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!i)throw new Error("WebGPU adapter not available");return await i.requestDevice({requiredLimits:{maxStorageBuffersPerShaderStage:10,maxComputeWorkgroupSizeX:256,maxBufferSize:i.limits.maxBufferSize,maxStorageBufferBindingSize:i.limits.maxStorageBufferBindingSize}})}var Jt=class i{#e;#t;#r=null;#i=0;constructor(e){this.#e=e,this.#t=new Kt(e)}static async boot(e,t,{maxSplatsCount:r=0}={}){let s=typeof e=="function"?await e({canvas:t}):e,n=await zo();if(typeof e=="function"&&(s.preinitializedWebGPUDevice=n,s.WebGPU?.importJsDevice?.(n)),C(s,"Init")?.(r|0),!C(s,"Initialized")?.())throw new Error("Gracia init failed");return{module:new i(s),device:n}}get heap(){return this.#t}get backend(){return this.#r}get buildUnixTime(){return C(this.#e,"GetBuildTime")?.()??0}shutdownApp(){C(this.#e,"Shutdown")?.()}setCamera(e,t,r,s){let n=!!(r&&s),o=this.#t.ptr(),a=o>>2,l=this.#t.f32;l.set(e,a),n&&l.set(r,a+16),l.set(t,a+32),n&&l.set(s,a+48),C(this.#e,"SetCamera")?.(n,o)}getModelMatrix(){let e=C(this.#e,"GetModelMatrix");if(!e)return null;let t=this.#t.ptr(256);return e(t),this.#t.readF32(16,256)}setModelMatrix(e){let t=C(this.#e,"SetModelMatrix");t&&(this.#t.writeF32(e,256),t(this.#t.ptr(256)))}initPure(e){this.shutdownBackend(),this.#r="pure",C(this.#e,"P_Init")?.(e?1:0)}pureRenderTo(e,t,r,s){let n=this.#e.WebGPU,o=n?.importJsTexture?.(e)??0,a=t?n?.importJsTexture?.(t)??0:0;return C(this.#e,"P_RenderTo")?.(o,a,r,s)!==0}initHybrid(e){this.shutdownBackend(),this.registerGL(e),this.#r="hybrid",C(this.#e,"H_Init")?.()}hybridFrame(e,t,r){C(this.#e,"H_Frame")?.(e,t,r)}hybridPreprocess(e,t){return C(this.#e,"H_Preprocess")?.(e,t)??0}hybridRender(e,t,r,s,n,o){C(this.#e,"H_Render")?.(e,t,r,s,n,o)}hybridRenderMesh(e,t,r,s,n){this.#t.writeF32(e),C(this.#e,"H_RenderMeshMVP")?.(this.#t.ptr(),t,r,s,n)}hybridRenderMotionMV(e,t,r,s){C(this.#e,"H_RenderMotionMV")?.(e,t,r,s)}hybridCanMotion(){return!!C(this.#e,"H_CanMotion")?.()}hybridHasMultiview(){return!!C(this.#e,"H_HasMultiview")?.()}hybridReset(){C(this.#e,"H_Reset")?.()}registerGL(e){this.#i&&this.#e.GL?.deleteContext(this.#i);let t=this.#e.GL;if(!t)throw new Error("WASM GL layer not available");this.#i=t.registerContext(e,{majorVersion:2,minorVersion:0,enableExtensionsByDefault:!0}),t.makeContextCurrent(this.#i)}shutdownBackend(){this.#r==="pure"?C(this.#e,"P_Shutdown")?.():this.#r==="hybrid"&&C(this.#e,"H_Shutdown")?.(),this.#i&&(this.#e.GL?.deleteContext(this.#i),this.#i=0),this.#r=null}dispose(){this.shutdownBackend(),this.#t.free(),this.shutdownApp()}addDynamicScene(){return C(this.#e,"AddScene")?.()??0}addStaticScene(){return C(this.#e,"AddStaticScene")?.()??0}removeScene(e){C(this.#e,"RemoveScene")?.(e)}sceneReady(e){return e?(C(this.#e,"SceneReady")?.(e)??0)!==0:!1}sceneProgress(e){return e?C(this.#e,"SceneProgress")?.(e)??0:0}sceneDuration(e){return e?C(this.#e,"SceneDuration")?.(e)??0:0}sceneIsBuffering(e){return e?(C(this.#e,"SceneIsBuffering")?.(e)??0)!==0:!1}sceneLastFetchStatus(e){return e?C(this.#e,"SceneGetLastFetchStatus")?.(e)??0:0}sceneSetTime(e,t){C(this.#e,"SceneSetTime")?.(e,t)}sceneSetPlaybackRange(e,t,r){C(this.#e,"SceneSetPlaybackRange")?.(e,t,r)}sceneSetVisible(e,t){C(this.#e,"SceneSetVisible")?.(e,t)}sceneGetBBox(e){let t=C(this.#e,"SceneGetBBox");if(!t||!e)return null;let r=this.#t.ptr(256);t(e,r);let s=r>>2,n=this.#t.f32;return n[s]===0&&n[s+1]===0&&n[s+2]===0&&n[s+3]===0&&n[s+4]===0&&n[s+5]===0?null:{minX:n[s],minY:n[s+1],minZ:n[s+2],maxX:n[s+3],maxY:n[s+4],maxZ:n[s+5]}}sceneSetEnvLighting(e,t,r){let s=C(this.#e,"SceneSetEnvPreset");if(!s||!e)return;let n=this.#t.ptr(128),o=n>>2,a=this.#t.f32;for(let l=0;l<4;l++)a[o+l*4]=t[l*3],a[o+l*4+1]=t[l*3+1],a[o+l*4+2]=t[l*3+2],a[o+l*4+3]=0;a[o+3]=r,s(e,n)}sceneClearEnvLighting(e){C(this.#e,"SceneClearEnvPreset")?.(e)}sceneSetModelMatrix(e,t){let r=C(this.#e,"SceneSetModelMatrix");!r||!e||(this.#t.writeF32(t,256),r(e,this.#t.ptr(256)))}sceneOpen(e,t){Kr(this.#e,C(this.#e,"SceneOpen"),e,t)}sceneOpenApi(e,t,r){Kr(this.#e,C(this.#e,"SceneOpenApi"),e,t,r)}registerLocalFile(e){let t=this.#e.graciaRegisterLocalFile;if(!t)throw new Error("WASM local-file bridge unavailable");return t(e)}sceneOpenLocal(e,t){C(this.#e,"SceneOpenLocal")?.(e,t)}sceneOpenStatic(e,t){let r=C(this.#e,"SceneOpenStatic");if(!r)return-1;let s=this.#e._malloc(t.length);this.#e.HEAPU8.set(t,s);try{return r(e,s,t.length)}finally{this.#e._free(s)}}};var No={panningModel:"HRTF",distanceModel:"inverse",refDistance:1,maxDistance:100,rolloffFactor:1},Do=[0,0,0],Xo=[0,0,0,0,0,-1,0,1,0],Ho=.1,Vo=40,bs=.01,vs=.08,Uo=1.5,ws=.05,Wo=2e3;function _s(){typeof navigator<"u"&&navigator.audioSession&&(navigator.audioSession.type="playback")}function Ss(){return typeof performance<"u"?performance.now():Date.now()}function ie(i,e,t,r=0){r>0?i.linearRampToValueAtTime(e,t.currentTime+r):i.setValueAtTime(e,t.currentTime)}function Yo(i,e,t){i.setTargetAtTime(e,t.currentTime,.01)}function er(i){try{i.disconnect()}catch{}}function se(i,e){return Math.abs(i-e)<1e-4}function re(i){try{i.automationRate="k-rate"}catch{}}function Jr(i){i.positionX&&(re(i.positionX),re(i.positionY),re(i.positionZ),"orientationX"in i?(re(i.orientationX),re(i.orientationY),re(i.orientationZ)):(re(i.forwardX),re(i.forwardY),re(i.forwardZ),re(i.upX),re(i.upY),re(i.upZ)))}function Ms(i,e,t,r,s,n=0){ie(i.positionX,e,s,n),ie(i.positionY,t,s,n),ie(i.positionZ,r,s,n)}function qo(i,e,t,r,s,n,o,a,l=0){if("orientationX"in i){ie(i.orientationX,e,a,l),ie(i.orientationY,t,a,l),ie(i.orientationZ,r,a,l);return}ie(i.forwardX,e,a,l),ie(i.forwardY,t,a,l),ie(i.forwardZ,r,a,l),ie(i.upX,s,a,l),ie(i.upY,n,a,l),ie(i.upZ,o,a,l)}var ei=class{#e=null;#t=null;#r=[0,0,0];#i=[0,0,-1,0,1,0];#s=!1;#n=new Float32Array(9);#o=!1;constructor(){_s(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&this.#e&&this.#e.state!=="running"&&this.resume()})}get ctx(){return this.#e}get destination(){return this.#t??this.#e?.destination??null}setOutput(e){e?.context&&e.context!==this.#e&&(this.#e=e.context,Jr(this.#e.listener),this.#o=!1),this.#t=e?.destination??null,this.#s=e?.externalListener===!0,this.#a()}prepare(){let e=this.#l();if(!e)throw new Error("Web Audio is not supported in this browser");return{ctx:e,destination:this.destination??e.destination}}resume(){_s();let e=this.#l();return e?e.state==="running"?Promise.resolve():e.resume().catch(()=>{}):Promise.resolve()}listener(e,t,r,s,n,o,a,l,h,c=0){this.#r=[e,t,r],this.#i=[s,n,o,a,l,h],this.#a(c)}resetListener(){this.listener(...Xo)}#l(){if(this.#e)return this.#e;if(typeof AudioContext>"u")return null;try{this.#e=new AudioContext}catch{return null}return Jr(this.#e.listener),this.#o=!1,this.#a(),this.#e}#a(e=0){let t=this.#e?.listener;if(!t||this.#s)return;let[r,s,n]=this.#r,[o,a,l,h,c,u]=this.#i,p=this.#n;this.#o&&se(r,p[0])&&se(s,p[1])&&se(n,p[2])&&se(o,p[3])&&se(a,p[4])&&se(l,p[5])&&se(h,p[6])&&se(c,p[7])&&se(u,p[8])||(p.set([r,s,n,o,a,l,h,c,u]),this.#o=!0,Ms(t,r,s,n,this.#e,e),qo(t,o,a,l,h,c,u,this.#e,e))}},be=new ei,ti=class{#e;#t;#r;#i;#s;#n;ready;#o=null;#l=[];#a=null;#h=!1;#c=!1;#u=!1;#f=!1;#p=!1;#m=0;#d=0;#g=0;#b=NaN;#x=NaN;#y=NaN;constructor(e,t={}){let{ctx:r,destination:s}=be.prepare();this.#e=r,this.#n=t.destination??s;let n=new Audio;this.#t=n,n.crossOrigin="anonymous",n.preload="auto",n.loop=!0,n.preservesPitch=!1,this.#i=r.createGain(),this.#s=r.createPanner(),Jr(this.#s),this.pannerAttr({...No,...t.pannerAttr}),this.#r=r.createMediaElementSource(n),this.#r.connect(this.#s),this.#s.connect(this.#i),this.#i.connect(this.#n),this.volume(t.volume??1).rate(t.rate??1).pos(...t.pos??Do),this.ready=new Promise(o=>{this.#o=o}),this.#S("loadedmetadata",()=>this.#L()),this.#S("canplay",()=>this.#M()),this.#S("loadeddata",()=>this.#M()),this.#S("error",()=>this.#T(`Media error ${n.error?.code??"unknown"}`)),n.src=e,n.load(),this.#M()}get context(){return this.#e}get blocked(){return this.#u}get failed(){return this.#h}get buffering(){return this.#w||this.#v&&this.#g>0}get clockRate(){return!this.#v||Math.abs(this.#d)<bs?1:1+S.clamp(Uo*this.#d,-ws,ws)}get#v(){return!this.#h&&!this.#u&&!this.#c}get#w(){return this.#v&&(!this.#f||this.#p||this.#t.paused||this.#t.readyState<3||this.#t.seeking||this.#a!==null)}#S(e,t){this.#l.push([e,t]),this.#t.addEventListener(e,t)}#M(){this.#t.readyState<3||this.#c||this.#_()}#_(){this.#o?.(),this.#o=null}#T(e){this.#c||this.#h||(this.#h=!0,this.pause(),this.#_())}allowPlayback(){this.#u=!1}play(){if(this.#h||this.#u||this.#c||this.#p||this.#f&&!this.#t.paused)return;let e=++this.#m;this.#p=!0;try{Promise.resolve(this.#t.play()).then(()=>{e!==this.#m||this.#c||(this.#p=!1,this.#f=!0)}).catch(t=>this.#P(e,t))}catch(t){this.#P(e,t)}}#P(e,t){e!==this.#m||this.#c||(this.#p=!1,this.#f=!1,t?.name==="NotAllowedError"?(this.#u=!0,this.#t.pause()):t?.name!=="AbortError"&&this.#T(t))}pause(){this.#m++,this.#p=!1,this.#f=!1,this.#C(),this.#t.paused||this.#t.pause()}unload(){this.pause(),this.#c=!0;for(let[e,t]of this.#l)this.#t.removeEventListener(e,t);this.#l=[],this.#t.removeAttribute("src"),this.#t.load(),this.#_(),er(this.#r),er(this.#s),er(this.#i)}seek(e){return typeof e=="number"&&(this.#C(),this.#a=Number.isFinite(e)?Math.max(0,e):0,this.#L()),this.#a??this.#t.currentTime}#L(){if(this.#a===null||this.#t.readyState<1)return;let e=this.#t.duration,t=Number.isFinite(e)&&e>0?S.wrap(this.#a,e):this.#a;Math.abs(this.#t.currentTime-t)>.005&&(this.#t.currentTime=t),this.#a=null}sync(e){this.#h||this.#u||this.#c||(!this.#f||this.#t.paused)&&!this.#p&&(this.seek(e),this.play())}follow(e){if(this.#w||!this.#v||this.#e.state!=="running"){this.#C();return}let t=this.#t.currentTime-e,r=this.#t.duration;Number.isFinite(r)&&r>0&&(t=S.wrapDelta(t,r));let s=Ss();if(t<-vs?this.#g||=s:t>-bs&&(this.#g=0),t>vs||this.#g&&s-this.#g>Wo){this.seek(e);return}this.#d=t}#C(){this.#d=0,this.#g=0}volume(e){return Yo(this.#i.gain,S.clamp01(e),this.#e),this}rate(e){return this.#t.playbackRate=S.clamp(S.finite(e,1),.1,4),this}pos(e,t,r,s=0){return se(e,this.#b)&&se(t,this.#x)&&se(r,this.#y)?this:(this.#b=e,this.#x=t,this.#y=r,Ms(this.#s,e,t,r,this.#e,s),this)}destination(e){let t=e??this.#e.destination;return t===this.#n?this:(er(this.#i),this.#n=t,this.#i.connect(this.#n),this)}pannerAttr(e){return e?(e.panningModel&&(this.#s.panningModel=e.panningModel),e.distanceModel&&(this.#s.distanceModel=e.distanceModel),typeof e.refDistance=="number"&&(this.#s.refDistance=e.refDistance),typeof e.maxDistance=="number"&&(this.#s.maxDistance=e.maxDistance),typeof e.rolloffFactor=="number"&&(this.#s.rolloffFactor=e.rolloffFactor),this):this}},tr=class{#e=null;#t=null;#r=[0,0,0];#i=P.create();#s=new Float32Array(9);#n={volume:1,rate:1,pannerAttr:{}};#o=!1;#l=0;#a=0;#h=0;#c=!1;get context(){return be.ctx}get isLoaded(){return!this.#c||!this.#o||be.ctx?.state!=="running"||this.#e?.blocked===!0}get isBuffering(){return this.#o&&(this.#e?.buffering??!1)}setOutput(e){if(be.setOutput(e),!!this.#e){if(this.#e.context!==be.ctx){let t=this.#t,r=this.#e.seek();this.unload(),t&&(this.load(t),this.#e?.seek(r));return}this.#e.destination(be.destination)}}async load(e){if(e===this.#t&&this.#e&&!this.#e.failed){await this.#e.ready;return}this.unload(),this.#t=e,this.#c=!0;let t=++this.#l;try{this.#e=new ti(e,{...this.#n,pos:this.#r}),await this.#e.ready}catch{t===this.#l&&(this.#e?.unload(),this.#e=null,this.#t=null)}finally{t===this.#l&&(this.#c=!1)}}sync(e,t,r){let s=this.#e;return!this.#o||!r?(s?.pause(),!0):(s?.sync(e),s?.follow(e),!this.isBuffering)}get clockRate(){return this.#o?this.#e?.clockRate??1:1}seek(e){this.#e?.seek(e)}volume(e){this.#n.volume=S.clamp01(e),this.#e?.volume(this.#n.volume)}rate(e){this.#n.rate=e,this.#e?.rate(e)}setSpatial(e,t,r){this.#r=[e,t,r];let s=this.#u("spatial");s>=0&&this.#e?.pos(e,t,r,s)}setSourceMatrix(e,t,r=1){let s=e.pointTo?.(this.#i,t,r)??D.pointTo(this.#i,e,t,r);this.setSpatial(s.x,s.y,s.z)}setListenerMatrix(e){let t=this.#u("listener");if(t<0)return;let r=e.poseTo?.(this.#s)??D.poseTo(this.#s,e);be.listener(...r,t)}setPanner(e){Object.assign(this.#n.pannerAttr,e),this.#e?.pannerAttr(e)}stop(){this.#e?.pause()}get enabled(){return this.#o&&be.ctx?.state==="running"&&!this.#e?.blocked}enable(){this.#o=!0,be.resume(),this.#e?.allowPlayback()}disable(){this.#o=!1,this.#e?.pause()}unload(){this.#l++,this.#e?.unload(),this.#e=null,this.#t=null,this.#c=!1,be.resetListener()}#u(e){let t=Ss(),r=e==="listener"?this.#a:this.#h;return r&&t-r<Vo?-1:(e==="listener"?this.#a=t:this.#h=t,S.deltaSeconds(t,r,0,Ho))}};var Mt=class{#e;#t=0;#r=!1;constructor(e){this.#e=e}get id(){return this.#t}get isStatic(){return this.#r}get isReady(){return this.#e.sceneReady(this.#t)}get progress(){return this.#e.sceneProgress(this.#t)}get duration(){return this.#r?0:this.#e.sceneDuration(this.#t)}get isBuffering(){return this.#r?!1:this.#e.sceneIsBuffering(this.#t)}get lastFetchStatus(){return this.#e.sceneLastFetchStatus(this.#t)}setTime(e){this.#t&&!this.#r&&this.#e.sceneSetTime(this.#t,e)}setPlaybackRange(e,t){this.#t&&!this.#r&&this.#e.sceneSetPlaybackRange(this.#t,e,t)}setVisible(e){this.#t&&this.#e.sceneSetVisible(this.#t,e)}getBBox(){return this.#e.sceneGetBBox(this.#t)}setEnvLighting(e,t){this.#t&&this.#e.sceneSetEnvLighting(this.#t,e,t)}clearEnvLighting(){this.#t&&this.#e.sceneClearEnvLighting(this.#t)}setModelMatrix(e){this.#t&&this.#e.sceneSetModelMatrix(this.#t,e)}openDynamic(e){if(this.remove(),this.#t=this.#e.addDynamicScene(),this.#r=!1,e.localFile||e.file){let r=e.localFile||e.file;this.#e.sceneOpenLocal(this.#t,this.#e.registerLocalFile(r));return}let t=e.url;if(e.token){this.#e.sceneOpenApi(this.#t,t,e.token);return}this.#e.sceneOpen(this.#t,t)}async openStatic(e){this.remove();let t=this.#e.addStaticScene();this.#t=t,this.#r=!0;let r=e.file?await e.file.arrayBuffer():await(await fetch(e.url)).arrayBuffer();this.#t===t&&this.#e.sceneOpenStatic(t,new Uint8Array(r))}remove(){this.#t&&(this.#e.removeScene(this.#t),this.#t=0)}};var Ts={alpha:!0,premultipliedAlpha:!0,depth:!0,stencil:!1,antialias:!1,powerPreference:"high-performance",xrCompatible:!0},rr=Object.freeze({start:0,end:1/0}),Qe=class i{#e;#t;#r=new tr;#i=0;#s=null;#n=null;#o=null;#l=!1;#a=0;#h=0;#c=1;#u=rr;#f=!1;#p=null;#m=null;static GL_CANVAS_OPTS=Ts;constructor(e,t){this.#e=e,this.#t=t,typeof document<"u"&&document.addEventListener("visibilitychange",this.#d)}#d=()=>{document.hidden&&this.#r.stop()};static async create(e,{canvas:t,gl:r,backend:s,maxSplatsCount:n}={}){if(!t&&!r)throw new Error("canvas or gl required");let o=s??(r?"hybrid":"pure"),{module:a,device:l}=await Jt.boot(e,t||r.canvas,{maxSplatsCount:n}),h=new i(a,l);return o==="hybrid"?h.#x(r??i.#g(t)):h.#b(t),h}static preferredFormat(){return navigator.gpu.getPreferredCanvasFormat()}static#g(e){let t=e.getContext("webgl2",Ts);if(!t)throw new Error("WebGL2 not available");return t}get device(){return this.#t}get backend(){return this.#e.backend}get buildUnixTime(){return this.#e.buildUnixTime}get gl(){return this.#m}get isBGRA(){return i.preferredFormat()==="bgra8unorm"}assertDevice(e){if(e&&e!==this.#t)throw new Error("WebGPU device must match GraciaPlayer.device")}configureSurface(e,t={}){let{format:r,alphaMode:s="premultiplied",usage:n}=t;e.configure({device:this.#t,format:r??i.preferredFormat(),alphaMode:s,...n!=null?{usage:n}:{}})}bindCanvas(e,t={}){let r=e.getContext("webgpu");if(!r)throw new Error("WebGPU canvas context not available");return this.configureSurface(r,t),this.#p=r,r}setBackend(e,{canvas:t,gl:r}={}){if(this.shutdown(),e==="hybrid"){if(!r&&!t)throw new Error("canvas or gl required for hybrid backend");this.#x(r??i.#g(t))}else this.#b(t)}present(e,t){e===0||t===0||(this.#e.backend==="hybrid"?this.#v(e,t):this.#y())}renderTextures({color:e,depth:t,w:r,h:s}){return this.#T(),this.#e.backend!=="pure"?!1:this.#e.pureRenderTo(e,t,r,s)}renderDynamic(e){this.#n?.setVisible(!1);try{return this.renderTextures(e)}finally{this.#n?.setVisible(!0)}}get hasStatic(){return!!this.#n}copyTexture(e,t,r=null){let s=r??[e.width,e.height,1],n=this.#t.createCommandEncoder();n.copyTextureToTexture({texture:e},{texture:t},s),this.#t.queue.submit([n.finish()])}renderHybridViewport(e,t,{gl:r,drawMode:s,enableMesh:n=!1,x:o=0,y:a=0,eye:l=0}={}){let h=r??this.#m;if(!h)throw new Error("No WebGL context");let c=s??this.#i;this.preprocess(e,t),h.enable(h.DEPTH_TEST),h.depthFunc(h.LEQUAL),h.depthMask(!1),this.render(c,o,a,e,t,l),n&&(h.colorMask(!1,!1,!1,!1),h.depthMask(!0),this.render(1,o,a,e,t,l),h.colorMask(!0,!0,!0,!0)),h.depthMask(!0)}shutdown(){this.#e.shutdownBackend(),this.#m=null,this.#p=null}#b(e){this.#m=null,this.#p=null,this.#t.pushErrorScope("validation"),this.#e.initPure(this.isBGRA),this.#t.popErrorScope().then(t=>{}),e&&this.bindCanvas(e)}#x(e){this.#p=null,this.#m=e,this.#e.initHybrid(e)}#y(){if(!this.#p)throw new Error("bindCanvas() required");let{width:e,height:t}=this.#p.canvas;e===0||t===0||this.renderTextures({color:this.#p.getCurrentTexture(),w:e,h:t})}#v(e,t){let r=this.#m;if(!r)throw new Error("hybrid backend required");r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clearDepth(1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.disable(r.DEPTH_TEST),this.frame(e,t,this.#i)}get drawMode(){return this.#i}set drawMode(e){this.#i=S.clampInt(e,0,3)}get#w(){return this.#s??this.#n}get isReady(){return(this.#w?.isReady??!1)&&this.#r.isLoaded}get progress(){return this.#w?.progress??0}get duration(){return this.#s?.duration??0}get playbackRange(){let{start:e,end:t}=this.#u;return{start:e,end:Math.min(t,this.duration||1/0)}}get ended(){return this.#f}get currentTime(){return this.#a}get isPlaying(){return this.#l}get isBuffering(){return(this.#s?.isBuffering??!1)||this.#l&&this.#r.isBuffering}get lastFetchStatus(){return this.#w?.lastFetchStatus??0}play(){this.#l=!0,this.#_()}pause(){this.#l=!1,this.#h=0,this.#r.stop()}seek(e){let{start:t,end:r}=this.playbackRange;this.#a=S.clamp(e,t,r),this.#h=0,this.#r.seek(this.#a)}setPlaybackRange(e,t){if(!(e>=0&&e<t&&t<=this.duration))throw new RangeError(`Invalid playback range [${e}, ${t}) for ${this.duration}s`);this.#S({start:e,end:t})}clearPlaybackRange(){this.#S(rr)}#S(e){this.#u=e,this.#s?.setPlaybackRange(e.start,e.end);let{start:t,end:r}=this.playbackRange;(this.#a<t||this.#a>=r)&&this.seek(t)}get speed(){return this.#c}setSpeed(e){this.#c=S.clamp(S.finite(e,1),.1,4),this.#r.rate(this.#c)}close(){this.#s?.remove(),this.#s=null,this.#n?.remove(),this.#n=null,this.#M(),this.#r.unload()}clearVideo(){this.#s?.remove(),this.#s=null,this.#M(),this.#r.unload()}#M(){this.#u=rr,this.#f=!1,this.#a=0,this.#h=0,this.#l=!1}clearEnvironment(){this.#n?.remove(),this.#n=null}#_(){let e=this.#l&&(this.#s?.isReady??!1)&&!this.#s?.isBuffering;return this.#r.sync(this.#a,this.duration,e)}#T(){if(!this.#s)return;let e=performance.now(),t=this.#_(),r=this.#l&&this.#s.isReady&&!this.#s.isBuffering&&t;r&&this.#h>0&&this.#P(S.deltaSeconds(e,this.#h)*this.#c*this.#r.clockRate),this.#h=r?e:0,this.#s.setTime(this.#a)}#P(e){let{start:t,end:r}=this.playbackRange,s=this.#a+e;if(s<r){this.#a=s;return}this.#a=t+S.wrap(s-t,r-t),this.#u===rr?this.#f=!0:this.#r.seek(this.#a)}open(e){if(this.#r.unload(),e.audio&&this.#r.load(e.audio),e.type==="static")return this.#L(e);this.#s||(this.#s=new Mt(this.#e)),this.#s.openDynamic(e),this.#C(this.#s),this.#M()}async#L(e){this.#n||(this.#n=new Mt(this.#e)),await this.#n.openStatic(e),this.#C(this.#n)}get audioContext(){return this.#r.context}get audioEnabled(){return this.#r.enabled}enableAudio(){this.#r.enable(),this.#_()}disableAudio(){this.#r.disable()}setAudioOutput(e){this.#r.setOutput(e)}setVolume(e){this.#r.volume(e)}loadAudio(e){return this.#r.load(e)}setAudioSpatial(e,t,r){this.#r.setSpatial(e,t,r)}setAudioSourceMatrix(e,t,r){this.#r.setSourceMatrix(e,t,r)}setAudioListenerMatrix(e){this.#r.setListenerMatrix(e)}setAudioPanner(e){this.#r.setPanner(e)}setCamera(e,t,r,s){this.#e.setCamera(e,t,r,s)}getBBox(){return this.#w?.getBBox()??null}getModelMatrix(){return this.#e.getModelMatrix()}setModelMatrix(e){this.#e.setModelMatrix(e)}setStaticModelMatrix(e){this.#n?.setModelMatrix(e)}setEnvLighting(e,t=1){this.#o={coefs:Float32Array.from(e),scale:t},this.#s?.setEnvLighting(e,t),this.#n?.setEnvLighting(e,t)}clearEnvLighting(){this.#o=null,this.#s?.clearEnvLighting(),this.#n?.clearEnvLighting()}#C(e){this.#o&&e.setEnvLighting(this.#o.coefs,this.#o.scale)}frame(e,t,r){this.#T(),this.#e.hybridFrame(e,t,r)}preprocess(e,t){return this.#T(),this.#e.hybridPreprocess(e,t)}render(e,t,r,s,n,o){this.#e.hybridRender(e,t,r,s,n,o)}renderMesh(e,t,r,s,n){this.#e.hybridRenderMesh(e,t,r,s,n)}renderMotionMV(e,t,r,s){this.#e.hybridRenderMotionMV(e,t,r,s)}canMotion(){return this.#e.hybridCanMotion()}hasMultiview(){return this.#e.hybridHasMultiview()}resetXR(){this.#e.hybridReset()}dispose(){typeof document<"u"&&document.removeEventListener("visibilitychange",this.#d),this.close(),this.#r.unload(),this.shutdown(),this.#e.dispose()}};var Ls=.75,Es=.35,Rs=.9,Zo=.1,jo=.15,Ps=3,Qo=.5,ri=[1,.72,.05],sr=Float32Array.of(1,.08,.04,.9),$o=.001,ii=new Float32Array(0),Ko=.25,Jo=1e-5,Ke={ramp:[[Ls,...ri,.12],[0,...sr]],reach:Number.POSITIVE_INFINITY,dark:{from:Es,to:0,max:Rs}},oi={ramp:[[Ls,...ri,.7],[.2,...ri,.9],[-.3,...sr]],reach:4.5,dark:{from:.3,to:-.5,max:Rs}},ir=i=>typeof i=="number"&&Number.isFinite(i),si=i=>!!i&&ir(i.x)&&ir(i.y)&&ir(i.z),ea=i=>si(i)&&ir(i.w);function ai(i){return!i||typeof i!="object"||!ms(i)||!si(i.position)||!ea(i.rotation)||!si(i.scale)?!1:i.scale.x>0&&i.scale.y>0&&i.scale.z>0}var li=(i,e,t)=>{let r=S.unlerp01(t,i,e);return r*r*(3-2*r)};function ta(i,e=Ke.ramp,t=new Float32Array(4)){if(i>=e[0][0])return t.fill(0);let r=1;for(;r<e.length-1&&i<e[r][0];)r++;let s=e[r-1],n=e[r],o=li(s[0],n[0],i);for(let a=0;a<4;a++)t[a]=s[a+1]+(n[a+1]-s[a+1])*o;return t}var ra=i=>li(Es,0,i),ia=(i,{dark:e}=Ke)=>e.max*li(e.from,e.to,i),sa=i=>1-S.unlerp01(i,Ps,Ps+Qo);function na(i,e,t){t.set(i);let r=sr[3]*sa(e);return r>i[3]&&(t.set(sr),t[3]=r),t}function Cs(i,e,t){if(e[3]>0){i[3]===0&&(i.set(e),i[3]=0);for(let r=0;r<4;r++)i[r]+=(e[r]-i[r])*t}else i[3]-=i[3]*t;i[3]<$o&&(i[3]=0)}var $e=(i,e,t,r)=>(i[e]=t[r],i[e+1]=t[r+1],i[e+2]=t[r+2],e+3),ni=class{#e;#t=null;#r=new U;#i=new U;#s=new U;#n=new ye;#o=ii;#l=ii;#a=new U;#h=new xe;#c=new U;#u=new ye;#f=new ye;#p=new U;#m=1;#d=new U;#g=new xe;constructor(e){this.#e=e,this.#i.fromXYZ(e.position),this.#s.fromXYZ(e.scale),this.#n.fromXYZW(e.rotation).normalize(),this.setRoomMatrix(null)}setRoomMatrix(e){return this.#h.fromRotationTranslationScale(this.#n,this.#i,this.#s),e&&this.#h.preMultiply(e),this.#h.decompose(this.#c,this.#u,this.#p),this.#f.copy(this.#u).invert(),this.#m=this.#p[0]<0?-1:1,this.#p.set(Math.abs(this.#p[0])*.5,Math.abs(this.#p[1])*.5,Math.abs(this.#p[2])*.5),this.#d.set(this.#m,1,1),this.#g.fromRotationTranslationScale(this.#u,this.#c,this.#d),(!this.#t||!this.#r.equals(this.#p,Jo))&&this.#b(),this}signedDistance(e){return this.#t.signedDistance(this.#y(e))}get mesh(){return this.#t.mesh}get meshMatrix(){return this.#g}outlineRibbon(e){let t=e*.5,r=this.#o,s=this.#l,n=0,o=0;for(let a of this.#t.outlines){let l=a.length/3;for(let h=0;h<l;h++)this.#x(a,h,l,t,(n+h)*6);for(let h=0;h<l;h++){let c=(n+h)*6,u=(n+(h+1)%l)*6;o=$e(s,o,r,c),o=$e(s,o,r,u),o=$e(s,o,r,u+3),o=$e(s,o,r,c),o=$e(s,o,r,u+3),o=$e(s,o,r,c+3)}n+=l}return s}#b(){this.#r.copy(this.#p),this.#t=Qt(this.#e,this.#p);let e=this.#t.outlines.reduce((t,r)=>t+r.length/3,0);this.#o=new Float32Array(e*6),this.#l=new Float32Array(e*18)}#x(e,t,r,s,n){let o=(t+r-1)%r*3,a=(t+1)%r*3,l=e[t*3],h=e[t*3+1],c=e[t*3+2],u=l-e[o],p=c-e[o+2],f=e[a]-l,g=e[a+2]-c,d=Math.hypot(u,p),m=Math.hypot(f,g),y=p/d+g/m,v=-u/d-f/m,b=Math.hypot(y,v),x=s/(b*Math.max(b/2,Ko));this.#v(n,l+y*x,h,c+v*x),this.#v(n+3,l-y*x,h,c-v*x)}#y(e){let t=this.#a.sub(e,this.#c).transformQuat(this.#f);return t[0]*=this.#m,t}#v(e,t,r,s){let n=this.#a.set(t*this.#m,r,s).transformQuat(this.#u);this.#o.set(n.add(this.#c),e)}},Tt=class{#e=null;#t=Ke;#r=0;#i=new Float32Array(4);#s=new Float32Array(4);#n=0;#o=0;#l=new Float32Array(4);#a=new Float32Array(4);#h=!1;#c=null;#u=new U;get active(){return!!this.#e}get darkness(){return this.#r}get outline(){return this.#i}get surface(){return this.#s}get aboveSplats(){return this.#n}get reach(){return this.#t.reach}get outside(){return this.#o}get mesh(){return this.#e?.mesh??null}get meshMatrix(){return this.#e?.meshMatrix??null}setBounds(e){return this.#e=ai(e)?new ni(e):null,this.#f()}setRoomMatrix(e){return this.#e?.setRoomMatrix(e),this}queueIntro(){return this.#h=!0,this}reset(e=this.#t){return this.#t=e,this.#h=!1,this.#f()}update(e,t){if(!this.#e)return this.#f();this.#h?(this.#h=!1,this.#c=0):this.#c!==null&&(this.#c+=t),this.#u.from(e);let r=-this.#e.signedDistance(this.#u),s=ta(r,this.#t.ramp,this.#l),n=this.#c===null?s:na(s,this.#c,this.#a),o=1-Math.exp(-t/jo);Cs(this.#i,n,o),Cs(this.#s,s,o),this.#n+=(ra(r)-this.#n)*o,this.#o+=((r<0?1:0)-this.#o)*o;let a=ia(r,this.#t);return this.#r+=(a-this.#r)*(1-Math.exp(-t/Zo)),this}ribbon(e){return this.#e?.outlineRibbon(e)??ii}#f(){return this.#r=0,this.#i.fill(0),this.#s.fill(0),this.#n=0,this.#o=0,this.#c=null,this}};var Pt={daylight:{ambient:[3.62,3.54,3.37],topDown:[.5,.45,.4]},cloudy:{ambient:[3.19,3.26,3.44],topDown:[.05,.05,.07]},sunset:{ambient:[4.08,3.01,1.95],topDown:[.25,.12,.02],frontBack:[.15,.06,0],leftRight:[-.3,-.12,0]},indoor:{ambient:[3.72,3.37,2.84],topDown:[.3,.25,.15]},shade:{ambient:[3.12,3.3,3.72],topDown:[.1,.15,.3]},night:{ambient:[2.48,2.66,3.01],topDown:[.08,.1,.15]},off:null};var oa=2.5,ks=1.6,aa=.0015,la=2,As=.5,ha=.6,ca=.022,ua=1e-4,nr=Math.PI/2-.01,or=.05,ar=200,pa=new Set(["w","a","s","d","r","f","q","e","shift"]),Ct=class{#e;#t=new Map;#r=null;#i=1;#s;#n;#o;#l=0;#a=0;#h=0;#c=0;#u=0;#f=e=>e.preventDefault();constructor(e,{pan:t=!0,rotate:r=oa,onDown:s}={}){this.#e=e,this.#s=t,this.#n=r,this.#o=s,this.#i=e.clientHeight||1,e.addEventListener("contextmenu",this.#f),e.addEventListener("pointerdown",this.#p),e.addEventListener("wheel",this.#g,{passive:!1})}get height(){return this.#i}consume(e){return e.rotX=this.#l,e.rotY=this.#a,e.panX=this.#h,e.panY=this.#c,e.zoom=this.#u,this.#l=this.#a=this.#h=this.#c=this.#u=0,e}dispose(){this.#e.removeEventListener("contextmenu",this.#f),this.#e.removeEventListener("pointerdown",this.#p),this.#e.removeEventListener("wheel",this.#g),window.removeEventListener("pointermove",this.#m),window.removeEventListener("pointerup",this.#d),window.removeEventListener("pointercancel",this.#d),this.#t.clear(),this.#r=null}#p=e=>{this.#e.setPointerCapture?.(e.pointerId),this.#t.size===0&&(window.addEventListener("pointermove",this.#m),window.addEventListener("pointerup",this.#d),window.addEventListener("pointercancel",this.#d)),this.#t.set(e.pointerId,{x:e.clientX,y:e.clientY,button:e.button,touch:e.pointerType==="touch"}),this.#i=this.#e.clientHeight||this.#i,this.#t.size===2&&this.#b(),this.#o?.()};#m=e=>{let t=this.#t.get(e.pointerId);if(!t)return;let r=e.clientX-t.x,s=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,this.#t.size>=2)return this.#x();!t.touch&&(t.button===2||e.buttons===2)?this.#s&&(this.#h+=r,this.#c+=s):(this.#l+=r/this.#i*this.#n,this.#a+=s/this.#i*this.#n)};#d=e=>{this.#e.releasePointerCapture?.(e.pointerId),this.#t.delete(e.pointerId),this.#r=null,this.#t.size===0&&(window.removeEventListener("pointermove",this.#m),window.removeEventListener("pointerup",this.#d),window.removeEventListener("pointercancel",this.#d))};#g=e=>{e.preventDefault(),this.#u+=-e.deltaY*aa};#b(){let[e,t]=this.#t.values();this.#r={dist:Math.hypot(e.x-t.x,e.y-t.y),cx:(e.x+t.x)/2,cy:(e.y+t.y)/2}}#x(){let[e,t]=this.#t.values(),r=Math.hypot(e.x-t.x,e.y-t.y),s=(e.x+t.x)/2,n=(e.y+t.y)/2,o=this.#r;o&&(o.dist>0&&r>0&&(this.#u+=Math.log(r/o.dist)),this.#s&&(this.#h+=s-o.cx,this.#c+=n-o.cy)),this.#r={dist:r,cx:s,cy:n}}},da=i=>1-Math.exp(-i/ca),ne=()=>({rotX:0,rotY:0,panX:0,panY:0,zoom:0}),fa=i=>Math.abs(i.rotX)+Math.abs(i.rotY)+Math.abs(i.panX)+Math.abs(i.panY)+Math.abs(i.zoom)<ua;function pi(i,e,t,r,s){let n=i.consume(e);if(t.rotX+=n.rotX,t.rotY+=n.rotY,t.panX+=n.panX,t.panY+=n.panY,t.zoom+=n.zoom,fa(t))return!1;let o=da(s);for(let a of["rotX","rotY","panX","panY","zoom"])r[a]=t[a]*o,t[a]-=r[a];return!0}var hi=class{#e;#t;#r=P.create();#i=P.create();#s=P.create();#n=P.create();#o=P.create();#l=P.create();#a=1;#h=0;#c=0;#u=!1;#f=ne();#p=ne();#m=ne();constructor(e,t){this.#e=e,this.#t=new Ct(t),this.#y()}get type(){return"orbit"}update(e){this.#g(e)&&this.#y()}frame(e,t){this.#v(e,t)}reset(e,t){this.#v(e,t)}zoom(e){e>0&&(this.#p.zoom+=Math.log(e))}applyConstraints(e){this.#u=e,this.#c=S.clamp(this.#c,-nr,this.#d),this.#y()}dispose(){this.#t.dispose()}get#d(){return this.#u?0:nr}#g(e){if(!pi(this.#t,this.#f,this.#p,this.#m,e))return!1;let t=this.#m;return this.#h+=t.rotX,this.#c=S.clamp(this.#c-t.rotY,-nr,this.#d),t.zoom&&(this.#a=S.clamp(this.#a*Math.exp(-t.zoom),or,ar)),(t.panX||t.panY)&&this.#x(t.panX,t.panY),!0}#b(){this.#n.yawPitchBasis(this.#h,this.#c,this.#i,this.#s,this.#o)}#x(e,t){this.#b();let r=S.perspectiveScale(this.#a,this.#e.fov,this.#t.height)*ks;this.#r.addScaled(this.#n,-e*r).addScaled(this.#o,t*r)}#y(){this.#b(),this.#e.position.copy(this.#s).scale(this.#a).add(this.#r),this.#e.setAxes(this.#n,this.#o,this.#s)}#v(e,t){this.#r.from(e),this.#s.sub(this.#l.from(t),this.#r),this.#a=S.clamp(this.#s.len,or,ar),this.#i.copy(this.#s).scale(-1).normalize(k.FORWARD),this.#l.yawPitch(this.#i),this.#h=this.#l.x,this.#c=S.clamp(this.#l.y,-nr,this.#d),this.#p=ne(),this.#y()}},ci=class{#e;#t;#r=new Set;#i=$.create();#s=P.create();#n=P.create();#o=P.create();#l=P.create();#a=P.create();#h=ne();#c=ne();#u=ne();constructor(e,t){this.#e=e,t.hasAttribute("tabindex")||(t.tabIndex=0),this.#t=new Ct(t,{pan:!1,onDown:()=>t.focus()}),window.addEventListener("keydown",this.#d),window.addEventListener("keyup",this.#g)}get type(){return"fly"}update(e){let t=this.#f(e);this.#p(e)&&(t=!0),t&&this.#m()}frame(e,t){this.reset(e,t)}reset(e,t){this.#e.position.from(t),this.#s.sub(this.#a.from(e),this.#e.position).normalize(k.FORWARD),this.#a.yawPitch(this.#s),this.#i.identity().rotate(k.Y,-this.#a.x).rotate(k.X,this.#a.y),this.#c=ne(),this.#m()}zoom(e){e>0&&(this.#c.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#t.dispose(),window.removeEventListener("keydown",this.#d),window.removeEventListener("keyup",this.#g),this.#r.clear()}#f(e){let t=la*e*(this.#r.has("shift")?4:1),r=this.#e.position,s=!1,n=(a,l)=>{r.addScaled(a,l),s=!0},o=a=>{this.#i.rotate(k.Z,a),s=!0};return this.#r.has("w")&&n(this.#s,t),this.#r.has("s")&&n(this.#s,-t),this.#r.has("d")&&n(this.#o,t),this.#r.has("a")&&n(this.#o,-t),this.#r.has("r")&&n(this.#l,t),this.#r.has("f")&&n(this.#l,-t),this.#r.has("q")&&o(As*e),this.#r.has("e")&&o(-As*e),s}#p(e){if(!pi(this.#t,this.#h,this.#c,this.#u,e))return!1;let t=this.#u;return t.rotX&&this.#i.rotate(k.Y,-t.rotX),t.rotY&&this.#i.rotate(k.X,-t.rotY),t.zoom&&this.#e.position.addScaled(this.#s,t.zoom*ha),!0}#m(){this.#i.normalize(),this.#o.copy(k.X).transformQuat(this.#i),this.#l.copy(k.Y).transformQuat(this.#i),this.#n.copy(k.Z).transformQuat(this.#i),this.#s.copy(this.#n).scale(-1),this.#e.setAxes(this.#o,this.#l,this.#n)}#d=e=>{let t=e.key.toLowerCase();!pa.has(t)||this.#b()||(this.#r.add(t),e.preventDefault())};#g=e=>{this.#r.delete(e.key.toLowerCase())};#b(){let e=document.activeElement;return e?.tagName==="INPUT"||e?.tagName==="TEXTAREA"||e?.isContentEditable}},ui=class{#e;#t;#r=P.create();#i=P.create();#s=P.create().copy(k.Y);#n=P.create();#o=P.create();#l=P.create();#a=P.create();#h=P.create();#c=P.create();#u=$.create();#f=ne();#p=ne();#m=ne();constructor(e,t){this.#e=e,this.#t=new Ct(t)}get type(){return"trackball"}update(e){if(!pi(this.#t,this.#f,this.#p,this.#m,e))return;let t=this.#m;(t.rotX||t.rotY)&&this.#g(t.rotX,t.rotY),t.zoom&&this.#b(t.zoom),(t.panX||t.panY)&&this.#x(t.panX,t.panY),this.#y()}frame(e,t){this.#v(e,t)}reset(e,t){this.#v(e,t)}zoom(e){e>0&&(this.#p.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#t.dispose()}#d(){this.#n.copy(this.#i).normalize(k.Z),this.#o.cross(this.#s,this.#n).normalize(k.X),this.#l.cross(this.#n,this.#o)}#g(e,t){this.#d(),this.#a.copy(this.#o).scale(e).addScaled(this.#l,-t);let r=this.#a.len;r<1e-6||(this.#h.cross(this.#a,this.#i).normalize(k.Y),this.#u.setAxisAngle(this.#h,r),this.#i.transformQuat(this.#u),this.#s.transformQuat(this.#u).normalize())}#b(e){this.#i.setLength(S.clamp(this.#i.len*Math.exp(-e),or,ar))}#x(e,t){this.#d();let r=S.perspectiveScale(this.#i.len,this.#e.fov,this.#t.height)*ks;this.#r.addScaled(this.#o,-e*r).addScaled(this.#l,t*r)}#y(){this.#e.up.copy(this.#s),this.#e.position.copy(this.#r).add(this.#i),this.#e.lookAt(this.#r)}#v(e,t){this.#r.from(e),this.#i.sub(this.#c.from(t),this.#r),this.#i.setLength(S.clamp(this.#i.len,or,ar)),this.#s.copy(k.Y),this.#d(),this.#s.copy(this.#l),this.#p=ne(),this.#y()}};function di(i,e,t){switch(i){case"fly":return new ci(e,t);case"trackball":return new ui(e,t);default:return new hi(e,t)}}var fi=class{position=P.create();target=P.create();up=P.create().copy(k.Y);matrixWorld=D.create();projectionMatrix=D.create();fov;aspect;near;far;constructor(e=60,t=1,r=.05,s=1e4){this.fov=e,this.aspect=t,this.near=r,this.far=s,this.updateProjectionMatrix(),this.updateMatrixWorld()}lookAt(e){return this.target.from(e),this.updateMatrixWorld()}updateProjectionMatrix(){this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far)}updateMatrixWorld(){return this.matrixWorld.cameraWorld(this.position,this.target,this.up),this.matrixWorld}setAxes(e,t,r){return this.up.copy(t),this.target.copy(this.position).addScaled(r,-1),this.matrixWorld.cameraWorldAxes(this.position,e,t,r)}},Is=1.5,Fs=1,ma=[0,.4,0],ga=-.25,lr=class{#e=D.create();#t=P.create();#r=P.create();#i;#s;#n;#o=!1;#l=!1;#a=null;#h=null;constructor(e,t="orbit"){this.#n=e,this.#i=new fi,this.#s=di(t,this.#i,e),this.#c()}get canPresent(){return this.#o}get view(){return this.#i}get controls(){return this.#s}get controlsType(){return this.#s.type}setControls(e){e!==this.#s.type&&(this.#s.dispose(),this.#s=di(e,this.#i,this.#n),this.reset(),this.#s.applyConstraints(this.#l))}setSceneTransform(e){e?this.#e.fromTransform(e):this.#e.identity(),this.#l=!!e,this.#s.applyConstraints(this.#l),this.#o=!1}setAudioPosition(e){e?this.#t.fromXYZ(e):this.#t.set(0,0,0)}setBBox(e){if(!e)return;this.#e.pointTo(this.#r,Ut.center(this.#r,e)).addXYZ(0,ga);let t=this.#r.toArray(),r=[0,Is,Fs];this.#a=t,this.#h=r,this.#s.frame(t,r),this.#o=!0}update(e){this.#s.update(e)}apply(e,t,r){e.setModelMatrix(this.#e),t>0&&r>0&&(this.#i.aspect=t/r,this.#i.updateProjectionMatrix()),e.setCamera(this.#i.matrixWorld,this.#i.projectionMatrix),this.#o&&(e.setAudioSourceMatrix(this.#e,this.#t),e.setAudioListenerMatrix(this.#i.matrixWorld))}zoom(e){this.#s.zoom(e)}reset(){this.#a&&this.#h?(this.#s.frame(this.#a,this.#h),this.#o=!0):this.#c()}dispose(){this.#s.dispose()}#c(){this.#s.reset(ma,{x:0,y:Is,z:Fs}),this.#o=!1}};var hr=class{#e;#t;#r;#i;#s;#n;#o;#l;#a=null;#h=!1;#c=!1;#u=!1;#f=null;#p=0;onFrame=null;onBeforeRender=null;onBeforeEyeRender=null;onEyeRender=null;onASWRender=null;onRefReset=null;onSessionEnd=null;externalLayers=[];constructor(e,t){this.#e=e,this.#t=t}get session(){return this.#r}get active(){return!!this.#r}get aswAvailable(){return!!this.onASWRender}get aswActive(){return this.#h&&!!this.#r}get layeredActive(){return this.#c&&!!this.#r}get isAR(){return this.#u&&!!this.#r}get defaultDt(){return 1/(this.#h?36:72)}get binding(){return this.#s}get refSpace(){return this.#i}set soundPosition(e){this.#f=e?[e.x,e.y,e.z]:null}async enter(e=!1){if(!navigator.xr||this.#r)return{isQuest:!1,isPico:!1,isAVP:!1};let t=this.#t,r=this.#e;this.#u=e,this.#a=t.getExtension("OCULUS_multiview")||t.getExtension("OVR_multiview2")||null;let s=navigator.userAgent,n=/PicoBrowser/i.test(s),o=/OculusBrowser/i.test(s)&&!n,a=/Version\//.test(s)&&/Safari\//.test(s)&&!o&&!n;if(this.#r=await navigator.xr.requestSession(e?"immersive-ar":"immersive-vr",{optionalFeatures:["local-floor",e&&"local",o&&"layers",o&&"space-warp",(o||n)&&"hand-tracking"].filter(Boolean)}),!this.#r)throw new Error(`Failed to start ${e?"AR":"VR"} session`);let l=new Set(this.#r.enabledFeatures??[]);for(let c of["local-floor","local","viewer"])try{this.#i=await this.#r.requestReferenceSpace(c);break}catch{}this.#i?.addEventListener("reset",()=>this.onRefReset?.()),this.#c=this.#h=!1;let h=n?.75:1;if(l.has("layers"))try{t.getExtension("EXT_color_buffer_half_float"),this.#s=new XRWebGLBinding(this.#r,t),this.#n=this.#s.createProjectionLayer({textureType:"texture-array",depthFormat:t.DEPTH_COMPONENT24,scaleFactor:h,...e&&{clearOnAccess:!1}}),this.#c=!0,this.#h=l.has("space-warp"),!this.#h&&this.#n.fixedFoveation!==void 0&&(this.#n.fixedFoveation=1),await this.#r.updateRenderState({layers:[this.#n]}),this.#o=t.createFramebuffer(),this.#h&&(this.#l=t.createFramebuffer())}catch{this.#c=this.#h=!1,this.#s=this.#n=null}if(!this.#c){let c=new XRWebGLLayer(this.#r,t,{framebufferScaleFactor:h,...e&&{alpha:!0}});c.fixedFoveation!==void 0&&(c.fixedFoveation=1),await this.#r.updateRenderState({baseLayer:c})}return r.resetXR(),this.#r.addEventListener("end",()=>this.#b()),this.#p=0,this.#r.requestAnimationFrame(this.#m),{isQuest:o,isPico:n,isAVP:a}}#m=(e,t)=>{let r=this.#r;if(!r)return;r.requestAnimationFrame(this.#m);let s=S.deltaSeconds(e,this.#p,this.defaultDt,4*this.defaultDt);this.#p=e,this.onFrame?.(s,t)};exit(){this.#r?.end()}renderFrame(e,t,r=1){let s=this.#e,n=this.#t,o=t.getViewerPose(this.#i);if(!o||o.views.length<1)return;let a=this.#x(o);if(!this.#u&&a.length<2){this.#d(s,o,r);return}(a.length>=2||this.#u)&&(this.onBeforeRender?.(e,t,this.#i,o,t.session.inputSources,s),this.#g());let l=a[1]??null;s.setCamera(a[0].transform.matrix,a[0].projectionMatrix,l?.transform.matrix,l?.projectionMatrix),this.#h?this.#M(n,s,a):this.#c?this.#S(n,s,a):this.#w(n,s,a,t),this.#d(s,o,r)}#d(e,t,r){let s=this.#f;if(!s){let o=e.getBBox();o&&(s=[(o.minX+o.maxX)*.5,(o.minY+o.maxY)*.5,(o.minZ+o.maxZ)*.5])}let n=e.getModelMatrix();s&&n&&e.setAudioSourceMatrix(n,s,r),e.setAudioListenerMatrix(t.transform.matrix)}#g(){!this.#r||!this.#c||this.#r.updateRenderState({layers:[this.#n,...this.externalLayers]})}#b=()=>{if(!this.#r)return;let e=this.#t;this.#o&&(e.deleteFramebuffer(this.#o),this.#o=null),this.#l&&(e.deleteFramebuffer(this.#l),this.#l=null),this.#r=this.#i=this.#n=this.#s=null,this.#h=this.#c=this.#u=!1,this.#p=0,this.externalLayers=[],this.onSessionEnd?.()};#x(e){if(e.views.length<2)return[e.views[0]];let t=e.views.find(s=>s.eye==="left")||e.views[0],r=e.views.find(s=>s.eye==="right")||e.views[1];return[t,r]}#y(e,t){e.bindFramebuffer(e.FRAMEBUFFER,t),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.clearColor(0,0,0,this.#u?0:1)}#v(e,t,r,s,n,o,a,l,h,c=e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT){e.viewport(n,o,a,l),e.clear(c),this.onBeforeEyeRender?.(e,r,s,n,o,a,l),t.render(t.drawMode,n,o,a,l,h),this.onEyeRender?.(e,r,s,n,o,a,l)}#w(e,t,r,s){let n=s.session.renderState.baseLayer,o=r.map(a=>n.getViewport(a));t.preprocess(o[0].width,o[0].height),e.bindFramebuffer(e.FRAMEBUFFER,n.framebuffer),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.clearColor(0,0,0,this.#u?0:1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.disable(e.DEPTH_TEST),e.depthMask(!1);for(let a=0;a<r.length;a++){let l=o[a];this.onBeforeEyeRender?.(e,n.framebuffer,r[a],l.x,l.y,l.width,l.height),t.render(t.drawMode,l.x,l.y,l.width,l.height,a),this.onEyeRender?.(e,n.framebuffer,r[a],l.x,l.y,l.width,l.height)}}#S(e,t,r){let s=r.map(a=>this.#s.getViewSubImage(this.#n,a)),n=s[0].colorTextureWidth,o=s[0].colorTextureHeight;t.preprocess(n,o),this.#y(e,this.#o);for(let a=0;a<r.length;a++){let l=s[a],h=l.imageIndex??a;e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.colorTexture,0,h),l.depthStencilTexture&&e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,h),this.#v(e,t,this.#o,r[a],0,0,n,o,a)}e.bindFramebuffer(e.FRAMEBUFFER,null)}#M(e,t,r){let s=r.map(c=>this.#s.getViewSubImage(this.#n,c)),n=s[0].colorTextureWidth,o=s[0].colorTextureHeight,a=s.map((c,u)=>c.imageIndex??u);this.#n&&(this.#n.deltaPose=null),t.preprocess(n,o),this.#y(e,this.#o);for(let c=0;c<r.length;c++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,s[c].colorTexture,0,a[c]),this.#v(e,t,this.#o,r[c],0,0,n,o,c,e.COLOR_BUFFER_BIT);let l=s[0];if(l.motionVectorTexture&&l.depthStencilTexture){let c=l.motionVectorTextureWidth,u=l.motionVectorTextureHeight,p=t.canMotion();if(e.bindFramebuffer(e.FRAMEBUFFER,this.#l),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),e.clearColor(0,0,0,0),e.clearDepth(1),this.#a&&a.length>=2&&a[1]===a[0]+1&&t.hasMultiview())this.#a.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.motionVectorTexture,0,a[0],2),this.#a.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,a[0],2),e.viewport(0,0,c,u),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),p&&t.renderMotionMV(0,0,c,u);else for(let g=0;g<r.length;g++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,s[g].motionVectorTexture,0,a[g]),e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,s[g].depthStencilTexture,0,a[g]),e.viewport(0,0,c,u),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),p&&t.render(3,0,0,c,u,g);let f=(g,d,m)=>({view:g,colorTex:d.colorTexture,colorIdx:m,mvTex:d.motionVectorTexture,mvIdx:m,depthTex:l.depthStencilTexture,w:n,h:o,mvW:c,mvH:u});this.onASWRender?.(e,r.map((g,d)=>f(g,s[d],a[d])))}else this.onASWRender?.(e,r.map((c,u)=>({view:c,colorTex:s[u].colorTexture,colorIdx:a[u],w:n,h:o})));e.bindFramebuffer(e.FRAMEBUFFER,null)}};var Os=D.create().fromScaling(k.FLIP_Z),cr=D.create().copy(Os).multiply(D.create().fromTranslation([0,1,-1])),ya=.04,xa=.5,ba=1,va=Math.PI/6,ue=P.create(),Lt=P.create(),Bs=P.create(),wa=$.create(),ur=class{#e=P.create();#t=$.create();#r=1;#i=P.create();#s=D.clone(cr);#n=cr;#o=D.create();#l=D.create();#a="none";#h=P.create();#c={mid:P.create(),dist:0,axX:0,axZ:0};#u="undecided";#f=0;#p=0;#m=!1;#d=!1;#g=!1;get position(){return this.#e}get scale(){return this.#r}get sceneTransform(){return this.#s}get scaleLocked(){return this.#m}set scaleLocked(e){this.#m=!!e}setCenter(e,t,r){this.#i.set(e,t,r)}setSceneTransform(e){this.#n=e?Os:cr,e?this.#s.fromTransform(e).preMultiply(this.#n):this.#s.copy(cr)}resetToInitial(){this.#e.set(0,0,0),this.#r=1,this.#t.identity()}reset(){this.#a="none"}isHeld(e){return this.#a==="dual"||this.#a===e}update(e,t,r,s,n=!0,o=null){for(let p of r)this.#v(p,s,o);let a=e.gripTransform?.position,l=t.gripTransform?.position,h=n&&e.active&&e.gripping&&!!a,c=n&&t.active&&t.gripping&&!!l,u=h&&e.grabRestart||c&&t.grabRestart;h&&c?this.#y(a,l,u):h?this.#x("left",a,u):c?this.#x("right",l,u):this.reset()}buildModelMatrix(){return this.#b(this.#o,this.#s)}buildRoomMatrix(){return this.#b(this.#l,this.#n)}#b(e,t){return ue.copy(this.#i).transformMat4(this.#s),Lt.set(this.#r,this.#r,-this.#r),e.fromPivot(this.#e,this.#t,Lt,ue,t)}#x(e,t,r){if(r||this.#a!==e){this.#a=e,this.#h.fromXYZ(t);return}if(ue.fromXYZ(t).sub(this.#h),ue.sqrLen>.01){this.#h.fromXYZ(t);return}this.#e.add(ue),this.#h.fromXYZ(t)}#y(e,t,r){ue.midXYZ(e,t);let s=Lt.fromXYZ(e).distanceXYZ(t),n=s||1,o=(t.x-e.x)/n,a=(t.z-e.z)/n,l=this.#c;if(r||this.#a!=="dual"){this.#a="dual",l.mid.copy(ue),l.dist=s,l.axX=o,l.axZ=a,this.#u="undecided",this.#f=0,this.#p=0;return}let h=0;l.dist>.03&&s>.03&&(h=S.absLogRatio(s,l.dist));let c=l.axX,u=l.axZ;l.axX=o,l.axZ=a;let p=S.unlerp01(Math.min(Math.hypot(c,u),Math.hypot(o,a)),.08,.33),f=0;if(p>0&&(f=S.wrapPi(Math.atan2(a,o)-Math.atan2(u,c))*p),this.#u==="undecided"){this.#m||(this.#f+=h),this.#p+=Math.abs(f);let g=ya;(this.#f>=g||this.#p>=g)&&(this.#u=this.#f>=this.#p?"scale":"rotate")}if(this.#u==="scale"&&!this.#m&&l.dist>.03&&s>.03){let g=this.#r;this.#r=S.clamp(g*(s/l.dist),.01,100);let d=this.#r-g;Lt.copy(this.#i).transformMat4(this.#s),this.#e.add(Bs.copy(Lt).multiplyXYZ(-d,-d,d))}this.#u==="rotate"&&S.outside(f,5e-4)&&this.#t.rotatePre(k.Y,f),this.#e.add(Bs.sub(ue,l.mid)),l.mid.copy(ue),l.dist=s}#v(e,t,r){let s=e.gamepad;if(!s?.axes||s.axes.length<2)return;let n=s.axes.length>=4?2:0;this.#w(s.axes[n],-s.axes[n+1],t,r);let o=s.buttons?.[3]?.pressed??!1;e.handedness==="left"?(o&&!this.#d&&this.resetToInitial(),this.#d=o):(o&&!this.#g&&this.resetToInitial(),this.#g=o)}#w(e,t,r,s){if(!(Math.hypot(e,t)<=xa)){if(Math.abs(t)<=Math.abs(e)){this.#t.rotatePre(k.Y,-Math.sign(e)*va*r);return}s&&(ue.copy(k.FORWARD).transformQuat(wa.fromXYZW(s.orientation)).multiplyXYZ(1,0,1).normalize(k.FORWARD),this.#e.addScaled(ue,-t*ba*r))}}};var pr=class{on=!1;#e=-1;update(e){this.#e<0?this.#e=e:this.#e=e>this.#e?e:(this.#e+e)*.5,this.on=this.#e<(this.on?.018:.015)}reset(){this.on=!1,this.#e=-1}},dr=class i{static#e=30;static#t=300;static#r=.02;#i=P.create();#s=!1;#n=0;#o=null;tapped=!1;update(e,t){if(this.tapped=!1,e&&!this.#s)this.#n=performance.now(),this.#o=t?{x:t.x,y:t.y,z:t.z}:null;else if(!e&&this.#s){let r=performance.now()-this.#n,s=this.#o,n=s&&t?this.#i.fromXYZ(t).distanceXYZ(s):0;r>=i.#e&&r<=i.#t&&n<i.#r&&(this.tapped=!0)}this.#s=e}reset(){this.#s=!1,this.tapped=!1,this.#o=null}},fr=class i{static#e=30;static#t=300;#r=!1;#i=0;tapped=!1;update(e){if(this.tapped=!1,e&&!this.#r)this.#i=performance.now(),this.#r=!0;else if(!e&&this.#r){let t=performance.now()-this.#i;t>=i.#e&&t<=i.#t&&(this.tapped=!0),this.#r=!1}}reset(){this.#r=!1,this.tapped=!1}},mr=class{#e=[!1,!1];update(e){if(!e||e.length<=6)return 0;let t=e[5]?.pressed??!1,r=e[6]?.pressed??!1,s=t&&!this.#e[0]?-1:r&&!this.#e[1]?1:0;return this.#e[0]=t,this.#e[1]=r,s}reset(){this.#e[0]=this.#e[1]=!1}},gr=class{#e;left={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};right={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};stickSrcs=[];#t=null;#r=null;#i;#s;#n;#o;#l=new fr;#a=new fr;constructor({directGrab:e=!1}={}){this.#o=e,this.#e=$.create().setAxisAngle(k.X,-.8),this.#s=P.create(),this.#n=$.create(),this.#i=new Map([[this.left,{side:"left",pinch:new pr,tap:new dr,swipe:new mr,smooth:P.create(),smoothActive:!1,rayPos:P.create(),rayOri:$.create(),rayActive:!1}],[this.right,{side:"right",pinch:new pr,tap:new dr,swipe:new mr,smooth:P.create(),smoothActive:!1,rayPos:P.create(),rayOri:$.create(),rayActive:!1}]])}#h(e){e.active=e.gripping=e.isHandProfile=e.grabRestart=e.triggerPressed=e.menuPressed=e.isTransientPointer=!1,e.microSwipe=0,e.rayTransform=e.gripTransform=e.indexTip=e.thumbTip=null}read(e,t,r,s){this.#h(this.left),this.#h(this.right),this.stickSrcs.length=0;let n=null,o=null;for(let a of r||[]){if(a.targetRayMode==="transient-pointer"){let h=e.getPose(a.targetRaySpace,t);if(!h)continue;let u=((a.gripSpace?e.getPose(a.gripSpace,t):null)??h).transform,p=this.#c(a,u.position,n,o);this.#u(p,h.transform,u,a,s),p===this.left?n=a:o=a;continue}a.gripSpace&&!a.hand&&a.gamepad?.axes?.length>=2&&!a.profiles?.some(h=>h.includes("hand"))&&this.stickSrcs.push(a);let l=a.handedness==="left"?this.left:a.handedness==="right"?this.right:null;!l||l.active||(a.hand?this.#f(l,a,e,t,s):a.gripSpace&&this.#p(l,a,e,t,s))}this.#t=n,this.#r=o,(n||o)&&(this.stickSrcs.length=0,n||(this.left.gripping=!1),o||(this.right.gripping=!1)),s.uiActive?(this.#l.reset(),this.#a.reset()):(this.#l.update(!!n),this.#a.update(!!o)),this.#l.tapped&&(this.left.menuPressed=!0),this.#a.tapped&&(this.right.menuPressed=!0);for(let[a,l]of this.#i)a.indexTip||(l.pinch.reset(),l.tap.reset(),l.swipe.reset(),l.smoothActive=!1,l.rayActive=!1)}#c(e,t,r,s){if(e.handedness==="left")return this.left;if(e.handedness==="right")return this.right;if(r&&!s)return this.right;if(s&&!r)return this.left;let n=this.left.gripTransform?.position,o=this.right.gripTransform?.position,a=n?this.#s.fromXYZ(t).distanceXYZ(n):1/0,l=o?this.#s.fromXYZ(t).distanceXYZ(o):1/0;return a<=l?this.left:this.right}#u(e,t,r,s,{isHeld:n,hitTest:o,uiActive:a}){e.rayTransform=t,e.gripTransform=r,e.active=e.triggerPressed=e.isTransientPointer=!0;let{side:l}=this.#i.get(e),h=l==="left"?this.#t:this.#r,c=h!=null&&h!==s,u=h===s;!c&&n(l)?e.gripping=!0:a||(this.#o&&u||!this.#o&&o&&o(t)||n(l==="left"?"right":"left"))&&(e.gripping=!0,c&&(e.grabRestart=!0))}#f(e,t,r,s,{isHeld:n,uiActive:o,viewerPose:a}){let l=t.hand.get("wrist");if(!l)return;let h=r.getJointPose?.(l,s);if(!h)return;e.gripTransform=h.transform;let c=this.#m(t.hand,"index-finger-tip",r,s),u=this.#m(t.hand,"thumb-tip",r,s),p=this.#m(t.hand,"index-finger-phalanx-proximal",r,s);c&&(e.indexTip=c.transform.position),u&&(e.thumbTip=u.transform.position);let f=this.#i.get(e);if(p){this.#n.fromXYZW(h.transform.orientation).mul(this.#e);let d=f.rayPos,m=f.rayOri;f.rayActive?(d.lerp(this.#s.fromXYZ(p.transform.position),.5),m.slerp(this.#n,.5)):(d.fromXYZ(p.transform.position),m.copy(this.#n),f.rayActive=!0),e.rayTransform={position:d.toXYZ(),orientation:m.toXYZW()}}else e.rayTransform=c?.transform??null,f.rayActive=!1;if(c&&u){let d=c.transform.position,m=u.transform.position;f.pinch.update(this.#s.fromXYZ(d).distanceXYZ(m)),e.gripping=e.triggerPressed=f.pinch.on}else{f.pinch.reset();let d=t.gamepad?.buttons?.[0];e.gripping=d?d.pressed||d.value>.5:!1,e.triggerPressed=e.gripping}o?(f.tap.reset(),n(f.side)||(e.gripping=!1)):(f.tap.update(f.pinch.on,h.transform.position),f.tap.tapped&&(e.menuPressed=!0)),e.gripping&&!n(f.side)&&!this.#g(h.transform.position,a)&&(e.gripping=!1),e.active=!0,e.microSwipe=f.swipe.update(t.gamepad?.buttons);let g=f.smooth;f.smoothActive||(g.fromXYZ(h.transform.position),f.smoothActive=!0),g.lerp(this.#s.fromXYZ(h.transform.position),.4),e.gripTransform={position:g.toXYZ(),orientation:h.transform.orientation}}#p(e,t,r,s,{isHeld:n,uiActive:o,viewerPose:a}){let l=r.getPose(t.gripSpace,s);l&&(e.gripTransform=l.transform);let h=r.getPose(t.targetRaySpace,s);if(h&&(e.rayTransform=h.transform),!e.gripTransform&&!e.rayTransform)return;if(e.isHandProfile=t.profiles?.some(p=>p.includes("hand"))??!1,t.targetRayMode==="tracked-pointer"&&t.gamepad?.buttons?.[0]){let p=t.gamepad.buttons[0],f=p.pressed||p.value>.5;e.gripping=e.isHandProfile?f:t.gamepad?.buttons?.[1]?.pressed??!1}else e.gripping=t.gamepad?.buttons?.[1]?.pressed??!1;e.triggerPressed=t.gamepad?.buttons?.[0]?.pressed??!1;let c=t.gamepad?.buttons;e.menuPressed=!!(c?.[4]?.pressed||c?.[5]?.pressed||c?.[12]?.pressed);let{side:u}=this.#i.get(e);e.isHandProfile&&e.gripping&&!n(u)&&(o||!this.#g(e.gripTransform?.position,a))&&(e.gripping=!1),e.gripping&&!e.gripTransform&&(e.gripping=!1),e.active=!0,e.isHandProfile&&e.rayTransform&&(e.rayTransform=this.#d(e.rayTransform.orientation,e.rayTransform.position))}#m(e,t,r,s){let n=e.get(t);return n?r.getJointPose?.(n,s)??null:null}#d(e,t){return this.#n.fromXYZW(e).mul(this.#e),{position:t,orientation:this.#n.toXYZW()}}#g(e,t){if(!t||!e)return!0;let r=t.position;this.#s.subXYZ(e,r).transformQuat(this.#n.fromXYZW(t.orientation).invert());let s=this.#s.xzLen;return s<.05||this.#s.y>-1.19*s}};var Je=class{#e;#t;#r;#i;#s=!0;#n=!1;#o=!1;#l=!1;#a=!1;constructor(e,t=null,{directGrab:r=!1}={}){this.#e=e,this.#t=t,this.#r=new gr({directGrab:r}),this.#i=new ur}setOverlay(e){this.#t=e,this.#s=!0}get#h(){return this.#t?this.#t.hasBBox:this.#n}reset(){this.#i.reset(),this.#l=this.#a=!1}invalidateBBox(){this.#s=!0}setInitialTransform(e){this.#i.setSceneTransform(e),this.#s=!0,this.#c()}get scene(){return this.#t?.scene??null}get scale(){return this.#i.scale}get roomMatrix(){return this.#i.buildRoomMatrix()}get leftHand(){return this.#r.left}get rightHand(){return this.#r.right}get locked(){return this.#o}set locked(e){this.#o=!!e,this.#o&&this.#i.reset()}get scaleLocked(){return this.#i.scaleLocked}set scaleLocked(e){this.#i.scaleLocked=e}resetToInitial(){this.#i.resetToInitial(),this.#i.reset()}update(e,t,r,s,n,o=!1){let a=t.getViewerPose(r);this.#r.read(t,r,s,{isHeld:c=>this.#i.isHeld(c),hitTest:c=>this.#t?.hitTest(c)??!1,uiActive:n,viewerPose:a?.transform??null}),(this.#s||!this.#h)&&this.#u();let l=this.#r.left,h=this.#r.right;if(l.held=h.held=!1,!this.#o){this.#i.update(l,h,this.#r.stickSrcs,e,this.#h&&!o,a?.transform??null);let c=this.#i.isHeld("left"),u=this.#i.isHeld("right");l.held=c&&this.#l,h.held=u&&this.#a,this.#l=c,this.#a=u}this.#c()}#c(){this.#h&&this.#t?.applyTransform(this.#i.position,this.#i.scale),this.#e.setModelMatrix?.(this.#i.buildModelMatrix())}#u(){let e=this.#e.getBBox?.();if(!e)return;let t,r,s;this.#t?{cx:t,cy:r,cz:s}=this.#t.rebuildBBox(e,this.#i.sceneTransform):(t=(e.minX+e.maxX)/2,r=(e.minY+e.maxY)/2,s=(e.minZ+e.maxZ)/2,this.#n=!0),this.#i.setCenter(t,r,s),this.#s=!1}};function Gs(){let i=document.createElement("canvas");return i.style.display="block",i.style.width="100%",i.style.height="100%",i.style.touchAction="none",i}var zs=i=>i.getContext("webgpu"),et=class i{#e=null;#t;#r=null;#i=null;#s=null;#n=null;#o=0;#l=0;#a=null;#h=null;#c=new Tt;#u=null;#f=!1;#p=!1;#m=0;#d="pw";#g="pw";#b=null;#x=!1;#y={};#v=null;#w=null;#S=null;#M=!1;#_=[];#T=-1;onProgress=null;onReady=null;onError=null;onFrame=null;onBeforeFrame=null;onModeChange=null;onSceneChange=null;onSceneEnd=null;static async create(e,{container:t,overlay:r=null,boundaryRenderer:s=null,mode:n="pw"}={}){if(!t)throw new Error("container element required");if(!navigator.gpu)throw new Error("WebGPU not available");let o=new i;o.#a=r,o.#h=s,r&&(r.onSceneChange=(l,h)=>o.loadScene(h)),navigator.xr&&(o.#y.vr=await navigator.xr.isSessionSupported("immersive-vr").catch(()=>!1),o.#y.ar=await navigator.xr.isSessionSupported("immersive-ar").catch(()=>!1));let a=n==="hw"?"hw":n==="vr"||n==="ar"?n:"pw";return o.#t=Gs(),t.appendChild(o.#t),o.#e=await Qe.create(e,{canvas:o.#t,backend:a==="hw"?"hybrid":"pure"}),o.#Y(),await o.#C(a),o.#d=a,o}get player(){return this.#e}get camera(){return this.#i}get canvas(){return this.#t}get gl(){return this.#e?.gl??null}get audioContext(){return this.#e?.audioContext??null}get device(){return this.#e?.device??null}get mode(){return this.#d}get fallbackMode(){return this.#g}get xr(){return this.#s}get manipulator(){return this.#n}get drawMode(){return this.#e.drawMode}set drawMode(e){this.#e.drawMode=e}supports(e){return e==="pw"||e==="hw"||!!this.#y[e]}set sources(e){this.#_=e??[],this.#T=Math.min(this.#T,Math.max(0,this.#_.length-1)),this.#a&&(this.#a.sources=this.#_)}get sources(){return this.#_}get sceneIndex(){return this.#T}loadScene(e){let t=this.#_;if(e<0||e>=t.length)return;let r=t[e];this.#T=e,this.#w=null,this.setInitialTransform(r.initialTransform??null),this.setBackground(r.background??"#000"),r.controls&&this.setControls(r.controls),this.setBounds(r.bounds??null),this.#n&&(this.#n.locked=r.locked??this.#n.locked,this.#n.scaleLocked=r.scaleLocked??this.#n.scaleLocked);let s=r.staticTransform??null,n=r.staticUrl??null;this.#V(async o=>{if(n){let a=new File([await(await fetch(n)).arrayBuffer()],"static.sog");if(!o()||(await this.#e.open({file:a,type:"static"}),!o()))return}await this.#e.open(r),o()&&s&&this.#L(s)}),this.setAudioPosition(r.audioPosition??null),this.#a&&(this.#a.sceneIndex=e),this.onSceneChange?.(r,e)}start(){this.#f=!0,this.#A()}stop(){this.#f=!1,this.#E()}open(e){return this.setInitialTransform(e.initialTransform??null),this.setBounds(e.bounds??null),this.setAudioPosition(e.audioPosition??null),this.#V(()=>this.#e.open(e))}close(){++this.#m,this.#O(),this.#e.close(),this.#p=!1,this.#f=!1;let e=this.#d,t=this.#g,r=t!=="pw"?"hybrid":"pure";r!==this.#e.backend&&this.#W(r),this.#R(),this.#d=t,t!==e&&this.onModeChange?.(t,e)}async setMode(e){if(this.#b=e,!this.#x){this.#x=!0;do e=this.#b,this.#b=null,e!==this.#d&&await this.#P(e);while(this.#b!=null);this.#x=!1}}async#P(e){let t=this.#d;await this.#N();try{await this.#G(e)}catch(r){if(e===this.#g)throw r;this.onError?.(r),await this.#G(this.#g)}this.#d!==t&&this.onModeChange?.(this.#d,t)}setAudio(e){this.#e.loadAudio(e)}setVolume(e){this.#e?.setVolume(e)}enableAudio(){this.#e?.enableAudio()}disableAudio(){this.#e?.disableAudio()}get audioEnabled(){return this.#e?.audioEnabled??!1}setAudioPanner(e){this.#e?.setAudioPanner(e)}setBackground(e){this.#t&&(this.#t.style.background=e||"#000")}setInitialTransform(e,t=null){this.#v=e??null,this.#i?.setSceneTransform(this.#v),this.#n&&(this.#n.setInitialTransform(this.#v),!this.#p&&this.#_[this.#T]?.resetPositionOnStart!==!1&&this.#n.resetToInitial()),t?.translation&&t.rotation&&t.scale&&this.#L(t)}#L(e){this.#e?.setStaticModelMatrix(D.create().fromTransform(e))}reset(){this.#i?.reset()}setControls(e){this.#i?.setControls(e)}setBounds(e){this.#c.setBounds(e),this.#h?.sync(this.#c)}setAudioPosition(e){this.#S=e??null,this.#i?.setAudioPosition(this.#S),this.#s&&(this.#s.soundPosition=this.#S)}dispose(){++this.#m,this.#O(),this.#r?.disconnect(),this.#e?.dispose()}async#C(e){if(e==="vr"||e==="ar"){if(!this.#y[e])throw new Error(`${e.toUpperCase()} not supported`);await this.#k(e==="ar")}else if(e==="pw"||e==="hw")this.#R();else throw new Error(`Unknown mode: ${e}`)}#R(){let e=new lr(this.#t);this.#i=e,this.#e.backend==="pure"&&(this.#e.drawMode=0),e.setSceneTransform(this.#v),e.setAudioPosition(this.#S),this.#w&&e.setBBox(this.#w),this.#c.reset(oi)}async#k(e){let t=new hr(this.#e,this.#e.gl);t.soundPosition=this.#S,t.onSessionEnd=()=>{this.#F(),this.#s===t&&(this.#s=null,this.#n=null,this.setMode(this.#g))};let r=null;try{let s=await t.enter(e),n=this.#_[this.#T];r=new Je(this.#e,null,{directGrab:s.isAVP}),r.locked=n?.locked??!1,r.scaleLocked=n?.scaleLocked??!0,r.setInitialTransform(this.#v),this.#c.reset(Ke).queueIntro(),this.#h?.init(this.#e.gl);let o=this.#a;o&&(o.manipulator=r,await o.init(this.#e,t.session,t.binding,t.refSpace,this.#e.gl,e),t.onASWRender=(l,h)=>o.render(l,h),t.onRefReset=()=>o.onRefReset?.()),t.onBeforeEyeRender=(l,h,c,u,p,f,g)=>this.#h?.renderUnderlay(l,h,c,u,p,f,g),t.onEyeRender=(l,h,c,u,p,f,g)=>{this.#h?.renderEye(l,h,c,u,p,f,g),o?.renderEye(l,h,c,u,p,f,g)};let a=r;t.onBeforeRender=(l,h,c,u,p,f)=>{if(a.update(l,h,c,p,o?.uiActive??!1,o?.uiDragging??!1),this.#B(l,u.transform.position,a.roomMatrix),o){o.frame(l,h,c,u,p,f);let g=[];for(let d of o.quads??[])d.layer&&(d.visible||d.placing)&&g.push(d.layer);t.externalLayers=g}},t.onFrame=(l,h)=>{if(!this.#X(l))return;let c=a.scale;t.renderFrame(l,h,c!==1?1/c:1),this.#H()}}catch(s){throw this.#I(t),this.#F(),t.exit(),s}if(!t.session)throw this.#I(t),new Error("XR session ended during entry");this.#n=r,this.#s=t}#I(e){e.onFrame=null,e.onSessionEnd=null,e.onBeforeRender=null,e.onBeforeEyeRender=null,e.onEyeRender=null,e.onASWRender=null,e.onRefReset=null}#F(){this.#a?.dispose(),this.#h?.dispose()}#B(e,t,r){let s=this.#h;s&&(this.#p||this.#c.setRoomMatrix(r).update(t,e),s.sync(this.#c))}#O(){this.#E(),this.#i?.dispose(),this.#i=null,this.#h?.dispose();let e=this.#s;e&&(this.#s=null,this.#n=null,this.#I(e),this.#F(),e.exit())}async#N(){this.#E(),this.#i?.dispose(),this.#i=null,this.#h?.dispose();let e=this.#s;if(e){this.#s=null,this.#n=null,e.onFrame=null;try{await e.session?.end()}catch{}}}async#G(e){let t=e!=="pw"?"hybrid":"pure";t!==this.#e.backend&&this.#W(t),await this.#C(e),(this.#f||this.#p)&&this.#A(),this.#d=e,this.#s||(this.#g=e)}#A(){this.#i&&!this.#o&&(this.#o=requestAnimationFrame(this.#z))}#E(){this.#o&&cancelAnimationFrame(this.#o),this.#o=0,this.#l=0}#z=e=>{this.#o=requestAnimationFrame(this.#z);let t=S.deltaSeconds(e,this.#l,1/60);if(this.#l=e,!this.#X(t))return this.#E();let r=this.#i;if(!r)return this.#E();r.update(t);let{width:s,height:n}=this.#t;r.apply(this.#e,s,n),this.#U(r.canPresent),this.#e.present(s,n),this.#B(t,r.view.position,null),this.#h?.renderOver(this.#t,r.view,this.#D),this.#H()};#D=()=>{if(!this.#e.hasStatic)return this.#t;let e=Math.max(1,this.#t.width>>2),t=Math.max(1,this.#t.height>>2);this.#u||(this.#u=new OffscreenCanvas(e,t),this.#e.configureSurface(zs(this.#u)));let r=this.#u;r.width!==e&&(r.width=e),r.height!==t&&(r.height=t);let s=zs(r).getCurrentTexture();return this.#e.renderDynamic({color:s,w:e,h:t})?r:null};#X(e){return this.#Z(),!this.#f&&!this.#p?!1:(this.onBeforeFrame?.(e),!0)}#H(){this.#p&&this.onProgress?.(Math.round(this.#e.progress*100)),this.#q(),this.onFrame?.()}async#V(e){let t=++this.#m,r=()=>t===this.#m;this.#E(),this.#e.close(),this.#w=null,this.#U(!1),this.#p=!0,this.#M=!1;try{await e(r)}catch(s){if(!r())return;this.#p=!1,this.onError?.(s)}r()&&this.#A()}#q(){if(this.#M||!this.#e.ended)return;this.#M=!0;let e=this.#_[this.#T];this.onSceneEnd?.(e,this.#T),(e?.autoSwitchToNext??!0)&&this.#T<this.#_.length-1&&this.loadScene(this.#T+1)}#Z(){if(!this.#w&&this.#e.isReady){let t=this.#e.getBBox();t&&(this.#w=t,this.#i?.setBBox(t))}let e=this.#i;if(e&&!e.canPresent&&this.#w&&e.setBBox(this.#w),!!this.#p){if(!this.#e.isReady){let t=this.#e.lastFetchStatus;t&&t!==200&&t!==206&&(this.#p=!1,this.onError?.(t));return}this.#p=!1,this.#e.play(),this.#n&&(this.#_[this.#T]?.resetPositionOnStart!==!1&&this.#n.resetToInitial(),this.#n.invalidateBBox()),this.onProgress?.(100),this.onReady?.()}}#U(e){this.#t.style.visibility=e?"visible":"hidden"}#W(e){this.#r?.disconnect();let t=Gs();this.#t.replaceWith(t),this.#t=t,this.#e?.setBackend(e,{canvas:t}),this.#Y()}#Y(){this.#r?.disconnect();let e=this.#t;this.#r=new ResizeObserver(([t])=>{if(!t)return;let r=S.clamp(devicePixelRatio||1,1,2),s=Math.round(t.contentRect.width*r),n=Math.round(t.contentRect.height*r);s>0&&n>0&&(e.width!==s||e.height!==n)&&(e.width=s,e.height=n)}),this.#r.observe(e)}};var yr=class i{#e;#t;#r;#i=null;#s=null;#n=null;#o=null;#l=!1;enableMesh=!1;static attach(e,t,r){let s=new i(e,t,r);return s.#c(),s.#a(),s}constructor(e,t,r){this.#e=e,this.#t=t,this.#r=r}get player(){return this.#e}set camera(e){this.#r=e}get camera(){return this.#r}async setAudio(e){await this.#e.loadAudio(e)}setAudioPanner(e){this.#e.setAudioPanner(e)}set entity(e){if(this.#s?.node?.destroy(),this.#s=null,this.#i=e,!e)return;let t=new this.#t.root.constructor("_SplatShadow",this.#t);t.addComponent("render",{type:"box",castShadows:!0,receiveShadows:!1});let r=t.render.meshInstances[0];r.visible=!1,r.cull=!1,e.addChild(t),this.#s=r}get entity(){return this.#i}dispose(){this.#s?.node?.destroy(),this.#o&&(this.#t.renderer.setMeshInstanceMatrices=this.#o[0],this.#t.graphicsDevice.draw=this.#o[1]),this.#e.close(),this.#e.dispose()}#a(){let{renderer:e,graphicsDevice:t}=this.#t,r=e.setMeshInstanceMatrices,s=t.draw;this.#o=[r,s];let n=this;e.setMeshInstanceMatrices=function(...o){return o[0]===n.#s&&(n.#l=!0),r.apply(this,o)},t.draw=function(...o){let a=n.#l;if(n.#l=!1,a){n.enableMesh&&n.#e.isReady&&n.#h();return}return s.apply(this,o)}}#h(){let e=this.#t.graphicsDevice,t=e.gl,r=t.getParameter(t.VIEWPORT),s=e.scope.resolve("matrix_viewProjection").value;s&&(this.#n||(this.#n=new(this.#i.getWorldTransform()).constructor),this.#n.data.set(s),this.#n.mul(this.#i.getWorldTransform()),this.#e.renderMesh(this.#n.data,r[0],r[1],r[2],r[3]),this.#c())}renderFrame(){let e=this.#t.graphicsDevice,t=e.gl,r=e.width,s=e.height;!r||!s||(this.#i&&this.#e.setModelMatrix(this.#i.getWorldTransform().data),this.#r?.camera&&(this.#e.setCamera(this.#r.getWorldTransform().data,this.#r.camera.projectionMatrix.data),this.#e.setAudioListenerMatrix(this.#r.getWorldTransform().data)),this.#i&&this.#e.setAudioSourceMatrix(this.#i.getWorldTransform().data),this.#e.renderHybridViewport(r,s,{gl:t,enableMesh:this.enableMesh}),this.#c())}#c(){let e=this.#t.graphicsDevice;e.shader=null,e.boundVao=null,e.textureUnit=-1;let t=e.textureUnits;if(t)for(let r=0;r<t.length;r++)t[r][0]=t[r][1]=t[r][2]=null}};async function mi(i,e,t){let r=`${i.replace(/\/+$/,"")}/${e}`,s=await fetch(r,{headers:{"X-VIEW-TOKEN":t}});if(!s.ok)throw new Error(`Streaming metadata fetch failed: ${s.status} ${s.statusText}`);let n=await s.json();return{metadata:n.metadata??null,audioFileLink:n.audioFileLink??null}}async function tt(i,e){let t=e.replace(/\/+$/,"");return Promise.all(i.map(async(r,s)=>{let{metadata:n,audioFileLink:o}=await mi(t,r.streamingId,r.token);return{id:r.streamingId,label:r.label??n?.name??r.streamingId,url:`${t}/${r.streamingId}/`,token:r.token,displayName:n?.name??void 0,audio:o&&n?.withAudio!==!1?o:void 0,initialTransform:n?.initialSpawn??null,bounds:n?.bounds??null,locked:!1,scaleLocked:!0,autoSwitchToNext:!0,resetPositionOnStart:r.settings?.resetPositionOnStart}}))}import{useEffect as Ma,useMemo as gi,useReducer as Ta,useRef as yi}from"react";import{useEffect as _a,useMemo as Sa,useState as Ns}from"react";function Ds(i,e){let[t,r]=Ns(!1),[s,n]=Ns(!1);_a(()=>{let a=navigator.xr;if(!a||!i)return;let l=async()=>{let[h,c]=await Promise.all([a.isSessionSupported("immersive-vr").catch(()=>!1),a.isSessionSupported("immersive-ar").catch(()=>!1)]);r(h),n(c)};return l(),a.addEventListener("devicechange",l),()=>a.removeEventListener("devicechange",l)},[i]);let o=e==="vr"||e==="ar";return Sa(()=>({vrSupported:t,arSupported:s,isActive:o,setMode:async a=>{await i?.setMode(a)}}),[i,t,s,o])}var Hs=new WeakMap;function Vs(i){return Hs.get(i)}var Us={app:null,overlay:null,isContentReady:!1,isLoading:!1,progress:0,mode:"pw",error:null,isPlaying:!1,isBuffering:!1,currentTime:0,duration:0,controlsType:"orbit",isMuted:!0,volume:1};function Pa(i,e){switch(e.type){case"init":return{...i,app:e.app,overlay:e.overlay};case"frame":{let{isPlaying:t,isBuffering:r,currentTime:s,duration:n,isMuted:o}=e,a=n>0?n:i.duration;return i.isPlaying===t&&i.isBuffering===r&&i.currentTime===s&&i.duration===a&&i.isMuted===o?i:{...i,isPlaying:t,isBuffering:r,currentTime:s,duration:a,isMuted:o}}case"progress":return i.progress===e.value?i:{...i,progress:e.value};case"ready":return{...i,isContentReady:!0,isLoading:!1,progress:100};case"mode":return i.mode===e.mode?i:{...i,mode:e.mode};case"error":return{...i,error:e.error,isLoading:!1};case"open":return{...i,error:null,isLoading:!0,progress:0};case"close":return{...i,isLoading:!1,progress:0};case"reset":return{...Us,mode:i.mode};case"seek":return{...i,currentTime:e.time};case"camera_controls":return i.controlsType===e.controlsType?i:{...i,controlsType:e.controlsType};case"set_volume":return{...i,volume:e.volume}}}var Xs=new Set(["vr","ar"]);function xr(i){let{containerRef:e,mode:t="pw",overlay:r,boundaryRenderer:s,moduleUrl:n,moduleFactory:o,onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:u,eventLogger:p}=i,[f,g]=Ta(Pa,{...Us,mode:t}),d=yi(null),m=yi(f);m.current=f;let y=yi({onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:u,eventLogger:p});y.current={onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:u,eventLogger:p},Ma(()=>{let T=e.current;if(!T)return;let B=!1;return(async()=>{try{if(!o&&!n)throw new Error("[gr-react] Either moduleUrl or moduleFactory must be provided");let Q=o?await o():await $t(n);if(B)return;let Z=r??null;Z&&(Z.eventLogger={event:(L,he)=>y.current.eventLogger?.event?.(L,{...he,mode:m.current.mode}),error:(L,he)=>y.current.eventLogger?.error?.(L,{...he,mode:m.current.mode})});let V=await et.create(Q,{container:T,overlay:Z,boundaryRenderer:s,mode:t});if(B){V.dispose();return}d.current=V,V.onProgress=L=>{g({type:"progress",value:L}),y.current.onProgress?.(L)},V.onReady=()=>{g({type:"ready"}),V.audioEnabled&&V.enableAudio(),y.current.onReady?.()},V.onFrame=()=>{let L=d.current?.player;L&&g({type:"frame",isPlaying:L.isPlaying??!1,isBuffering:L.isBuffering??!1,currentTime:L.currentTime??0,duration:L.duration??0,isMuted:!(L.audioEnabled??!1)})},V.onModeChange=(L,he)=>{g({type:"mode",mode:L}),y.current.onModeChange?.(L,he);let Ne=Xs.has(he),qe=Xs.has(L);Ne&&!qe&&y.current.onXREnd?.(),!Ne&&qe&&y.current.onXRStart?.()},V.onError=L=>{let[he,Ne]=typeof L=="number"?[new Error(`Streaming fetch failed: HTTP ${L}`),"load"]:[L,"xr"];g({type:"error",error:he}),y.current.eventLogger?.error?.(he,{phase:Ne,mode:m.current.mode})},V.start(),g({type:"init",app:V,overlay:Z}),g({type:"camera_controls",controlsType:V.camera?.controlsType??"orbit"})}catch(Q){let Z=Q instanceof Error?Q:new Error(String(Q));g({type:"error",error:Z}),y.current.eventLogger?.error?.(Z,{phase:"init",mode:m.current.mode})}})(),()=>{B=!0;let Q=d.current;Q&&(Q.stop(),Q.dispose()),d.current=null,g({type:"reset"})}},[e,r,s,t,o,n]);let{app:v}=f,b=Ds(v,f.mode),x=gi(()=>({play:()=>v?.player?.play(),pause:()=>v?.player?.pause(),togglePlay:()=>{let T=v?.player;if(!T)return;let B=!T.isPlaying;B?T.play():T.pause(),y.current.eventLogger?.event?.("play_pause",{playing:B,mode:m.current.mode})},seek:T=>{g({type:"seek",time:T}),v?.player?.seek(T),y.current.eventLogger?.event?.("seek",{position:T,mode:m.current.mode})},setSpeed:T=>v?.player?.setSpeed(T),setVolume:T=>{g({type:"set_volume",volume:T}),v?.setVolume(T)},toggleMute:()=>{let T=!v?.audioEnabled;T?v?.enableAudio():v?.disableAudio(),y.current.eventLogger?.event?.("mute_toggle",{muted:!T,mode:m.current.mode})},setAudio:T=>v?.setAudio(T)}),[v]),_=gi(()=>({controlsType:f.controlsType,zoom:T=>v?.camera?.zoom(T),reset:()=>{v?.camera?.reset(),y.current.eventLogger?.event?.("reset",{mode:m.current.mode})},setControls:T=>{if(!v)return;v.setControls(T);let B=v.camera?.controlsType??T;g({type:"camera_controls",controlsType:B}),y.current.eventLogger?.event?.("camera_controls",{controls:B,requestedControls:T,mode:m.current.mode})}}),[v,f.controlsType]),M=gi(()=>({open(T){v&&(g({type:"open"}),v.open(T))},close(){v?.close(),g({type:"close"})},dispose(){v&&(v.stop(),v.dispose())}}),[v]),E={app:v,device:v?.device??null,overlay:f.overlay,isInitialized:v!==null,isLoading:f.isLoading,isContentReady:f.isContentReady,progress:f.progress,mode:f.mode,error:f.error,isRebuffering:f.isContentReady&&(f.isLoading||f.isBuffering),...M,playback:{isPlaying:f.isPlaying,isBuffering:f.isBuffering,currentTime:f.currentTime,duration:f.duration,isMuted:f.isMuted,volume:f.volume,...x},camera:_,xr:b};return Hs.set(E,{dispatch:g}),E}import{useCallback as Et,useEffect as Ca,useRef as La,useState as Ws}from"react";function br(i,e={}){let{app:t}=i,r=Vs(i)?.dispatch,s=La(e.onSceneEnd);s.current=e.onSceneEnd;let[n,o]=Ws([]),[a,l]=Ws(-1);Ca(()=>{if(t)return t.onSceneChange=(d,m)=>{r?.({type:"open"}),r?.({type:"camera_controls",controlsType:t.camera?.controlsType??"orbit"}),l(m)},t.onSceneEnd=(d,m)=>s.current?.(d,m),()=>{t.onSceneChange=null,t.onSceneEnd=null}},[t,r]);let h=Et(d=>{t&&(t.sources=d),o(d),l(-1)},[t]),c=Et(d=>{t?.loadScene(d)},[t]),u=Et(()=>{t&&t.loadScene(t.sceneIndex+1)},[t]),p=Et(()=>{t&&t.loadScene(t.sceneIndex-1)},[t]),f=Et(async(d,m)=>{let y=await tt(d,m);h(y),y.length>0&&c(0)},[h,c]),g=a>=0&&a<n.length?n[a]:null;return{sources:n,index:a,total:n.length,currentSource:g,hasNext:a>=0&&a<n.length-1,hasPrev:a>0,hasAudio:!!g?.audio,setSources:h,loadFromApi:f,next:u,prev:p,goTo:c}}import{jsx as I,jsxs as Ea}from"react/jsx-runtime";function Ys(){return I("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:I("path",{d:"M5.74023 18.7266V5.17188C5.74023 4.68359 5.86068 4.32552 6.10156 4.09766C6.34245 3.86328 6.62891 3.74609 6.96094 3.74609C7.25391 3.74609 7.55339 3.83073 7.85938 4L19.2363 10.6504C19.64 10.8848 19.9199 11.0964 20.0762 11.2852C20.2389 11.4674 20.3203 11.6888 20.3203 11.9492C20.3203 12.2031 20.2389 12.4245 20.0762 12.6133C19.9199 12.8021 19.64 13.0137 19.2363 13.248L7.85938 19.8984C7.55339 20.0677 7.25391 20.1523 6.96094 20.1523C6.62891 20.1523 6.34245 20.0352 6.10156 19.8008C5.86068 19.5664 5.74023 19.2083 5.74023 18.7266Z"})})}function qs(){return I("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:I("path",{d:"M7.3418 20.0254C6.91211 20.0254 6.58659 19.9147 6.36523 19.6934C6.15039 19.472 6.04297 19.1465 6.04297 18.7168V5.17188C6.04297 4.74219 6.15039 4.41992 6.36523 4.20508C6.58659 3.98372 6.91211 3.87305 7.3418 3.87305H9.56836C9.99154 3.87305 10.3138 3.97721 10.5352 4.18555C10.7565 4.39388 10.8672 4.72266 10.8672 5.17188V18.7168C10.8672 19.1465 10.7565 19.472 10.5352 19.6934C10.3138 19.9147 9.99154 20.0254 9.56836 20.0254H7.3418ZM14.4414 20.0254C14.0117 20.0254 13.6862 19.9147 13.4648 19.6934C13.2435 19.472 13.1328 19.1465 13.1328 18.7168V5.17188C13.1328 4.74219 13.2435 4.41992 13.4648 4.20508C13.6862 3.98372 14.0117 3.87305 14.4414 3.87305H16.6582C17.0879 3.87305 17.4102 3.97721 17.625 4.18555C17.8464 4.39388 17.957 4.72266 17.957 5.17188V18.7168C17.957 19.1465 17.8464 19.472 17.625 19.6934C17.4102 19.9147 17.0879 20.0254 16.6582 20.0254H14.4414Z"})})}function Zs(){return I("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:I("path",{d:"M8.03125 15.5391C7.5 15.5391 7.10156 15.4036 6.83594 15.1328C6.57031 14.8568 6.4375 14.4375 6.4375 13.875V10.8828C6.4375 10.362 6.55208 9.97135 6.78125 9.71094L15.6875 18.6094C15.625 18.8333 15.5208 18.9974 15.375 19.1016C15.2292 19.2057 15.0547 19.2578 14.8516 19.2578C14.6745 19.2578 14.5052 19.2188 14.3438 19.1406C14.1823 19.0625 14.0104 18.9375 13.8281 18.7656L10.4531 15.6094C10.401 15.5625 10.3359 15.5391 10.2578 15.5391H8.03125ZM15.7422 14.3984L10.3203 8.99219H10.5547C10.6016 8.99219 10.6458 8.97135 10.6875 8.92969L13.8281 6.01562C14.0312 5.82812 14.2057 5.69271 14.3516 5.60938C14.4974 5.52083 14.6615 5.47656 14.8438 5.47656C15.1094 5.47656 15.3255 5.56771 15.4922 5.75C15.6589 5.92708 15.7422 6.14323 15.7422 6.39844V14.3984ZM18.4453 20.0781L5.05469 6.70312C4.9401 6.58854 4.88281 6.44792 4.88281 6.28125C4.88281 6.10938 4.9401 5.96615 5.05469 5.85156C5.17448 5.73177 5.31771 5.67448 5.48438 5.67969C5.65104 5.67969 5.79427 5.73698 5.91406 5.85156L19.2891 19.2266C19.4089 19.3464 19.4688 19.487 19.4688 19.6484C19.4688 19.8151 19.4089 19.9583 19.2891 20.0781C19.1797 20.1979 19.0391 20.2578 18.8672 20.2578C18.7005 20.2578 18.5599 20.1979 18.4453 20.0781Z"})})}function js(){return I("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:I("path",{d:"M11.7031 19.2578C11.5208 19.2578 11.349 19.2188 11.1875 19.1406C11.026 19.0625 10.8568 18.9375 10.6797 18.7656L7.35156 15.6094C7.29948 15.5625 7.23438 15.5391 7.15625 15.5391H4.91406C4.38802 15.5391 3.98438 15.3958 3.70312 15.1094C3.42188 14.8229 3.28125 14.3958 3.28125 13.8281V10.9219C3.28125 10.3594 3.42188 9.9349 3.70312 9.64844C3.98438 9.35677 4.38802 9.21094 4.91406 9.21094H7.15625C7.23438 9.21094 7.29948 9.1875 7.35156 9.14062L10.6797 6.01562C10.8828 5.82812 11.0547 5.69271 11.1953 5.60938C11.3411 5.52083 11.5052 5.47656 11.6875 5.47656C11.9531 5.47656 12.1693 5.56771 12.3359 5.75C12.5026 5.92708 12.5859 6.14323 12.5859 6.39844V18.3828C12.5859 18.6328 12.5026 18.8411 12.3359 19.0078C12.1745 19.1745 11.9635 19.2578 11.7031 19.2578ZM15.375 15.6875C15.2188 15.5781 15.1302 15.4375 15.1094 15.2656C15.0885 15.0938 15.138 14.9245 15.2578 14.7578C15.4818 14.4401 15.6562 14.0755 15.7812 13.6641C15.9062 13.2474 15.9688 12.8125 15.9688 12.3594C15.9688 11.9062 15.9062 11.4714 15.7812 11.0547C15.6615 10.638 15.487 10.2734 15.2578 9.96094C15.1328 9.79948 15.0807 9.63281 15.1016 9.46094C15.1276 9.28385 15.2188 9.14062 15.375 9.03125C15.5104 8.9375 15.6589 8.90625 15.8203 8.9375C15.9818 8.96875 16.1146 9.0599 16.2188 9.21094C16.5208 9.60677 16.7552 10.0807 16.9219 10.6328C17.0938 11.1849 17.1797 11.7604 17.1797 12.3594C17.1797 12.9583 17.0938 13.5339 16.9219 14.0859C16.7552 14.638 16.5208 15.112 16.2188 15.5078C16.1146 15.6589 15.9818 15.75 15.8203 15.7812C15.6589 15.8073 15.5104 15.776 15.375 15.6875ZM18.2734 17.7266C18.1328 17.6276 18.0521 17.4974 18.0312 17.3359C18.0104 17.1693 18.0547 17.0052 18.1641 16.8438C18.5859 16.2344 18.9141 15.5443 19.1484 14.7734C19.388 13.9974 19.5078 13.1927 19.5078 12.3594C19.5078 11.526 19.3906 10.7214 19.1562 9.94531C18.9219 9.16927 18.5911 8.47917 18.1641 7.875C18.0495 7.71354 18.0026 7.55208 18.0234 7.39062C18.0495 7.22396 18.1328 7.09115 18.2734 6.99219C18.4193 6.89323 18.5729 6.85938 18.7344 6.89062C18.8958 6.92188 19.0286 7.01302 19.1328 7.16406C19.638 7.84115 20.0286 8.63542 20.3047 9.54688C20.5807 10.4583 20.7188 11.3958 20.7188 12.3594C20.7188 13.3229 20.5781 14.2578 20.2969 15.1641C20.0208 16.0703 19.6328 16.8672 19.1328 17.5547C19.0286 17.7057 18.8958 17.7969 18.7344 17.8281C18.5729 17.8542 18.4193 17.8203 18.2734 17.7266Z"})})}function Ie(){return I("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:I("path",{d:"M5.42188 13.1953V6.4375C5.42188 5.625 5.6224 5.01302 6.02344 4.60156C6.42969 4.1901 7.03646 3.98438 7.84375 3.98438H11.4297V9.71875C11.4297 10.7031 11.9219 11.1953 12.9062 11.1953H18.5625V18.2891C18.5625 19.1016 18.3594 19.7109 17.9531 20.1172C17.5521 20.5286 16.9479 20.7344 16.1406 20.7344H9.78125C10 20.3646 10.1667 19.9688 10.2812 19.5469C10.401 19.125 10.4609 18.6901 10.4609 18.2422C10.4609 17.5495 10.3307 16.8984 10.0703 16.2891C9.8099 15.6797 9.44792 15.1432 8.98438 14.6797C8.52083 14.2161 7.98438 13.8542 7.375 13.5938C6.76562 13.3281 6.11458 13.1953 5.42188 13.1953ZM12.9297 10.125C12.6432 10.125 12.5 9.98438 12.5 9.70312V4.07031C12.6615 4.09635 12.8255 4.16667 12.9922 4.28125C13.1589 4.39062 13.3333 4.53906 13.5156 4.72656L17.8203 9.10938C18.0078 9.30208 18.1562 9.47917 18.2656 9.64062C18.375 9.80208 18.4427 9.96354 18.4688 10.125H12.9297ZM5.42188 22.2109C4.88021 22.2109 4.36979 22.1068 3.89062 21.8984C3.41146 21.6953 2.98958 21.4115 2.625 21.0469C2.26042 20.6823 1.97396 20.2604 1.76562 19.7812C1.55729 19.3021 1.45312 18.7891 1.45312 18.2422C1.45312 17.6953 1.55729 17.1849 1.76562 16.7109C1.97396 16.2318 2.26042 15.8099 2.625 15.4453C2.98958 15.0755 3.41146 14.7891 3.89062 14.5859C4.36979 14.3776 4.88021 14.2734 5.42188 14.2734C5.96875 14.2734 6.48177 14.3776 6.96094 14.5859C7.4401 14.7891 7.86198 15.0729 8.22656 15.4375C8.59115 15.8021 8.875 16.224 9.07812 16.7031C9.28646 17.1823 9.39062 17.6953 9.39062 18.2422C9.39062 18.7839 9.28646 19.2943 9.07812 19.7734C8.86979 20.2526 8.58073 20.6745 8.21094 21.0391C7.84635 21.4036 7.42448 21.6901 6.94531 21.8984C6.46615 22.1068 5.95833 22.2109 5.42188 22.2109ZM5.42188 20.7266C5.56771 20.7266 5.68229 20.6823 5.76562 20.5938C5.85417 20.5052 5.89844 20.3906 5.89844 20.25V18.7188H7.42969C7.57031 18.7188 7.6849 18.6745 7.77344 18.5859C7.86198 18.5026 7.90625 18.388 7.90625 18.2422C7.90625 18.0964 7.86198 17.9818 7.77344 17.8984C7.6849 17.8099 7.57031 17.7656 7.42969 17.7656H5.89844V16.2344C5.89844 16.0938 5.85417 15.9792 5.76562 15.8906C5.68229 15.8021 5.56771 15.7578 5.42188 15.7578C5.27604 15.7578 5.15885 15.8021 5.07031 15.8906C4.98698 15.9792 4.94531 16.0938 4.94531 16.2344V17.7656H3.41406C3.27344 17.7656 3.15885 17.8099 3.07031 17.8984C2.98177 17.9818 2.9375 18.0964 2.9375 18.2422C2.9375 18.388 2.98177 18.5026 3.07031 18.5859C3.15885 18.6745 3.27344 18.7188 3.41406 18.7188H4.94531V20.25C4.94531 20.3906 4.98698 20.5052 5.07031 20.5938C5.15885 20.6823 5.27604 20.7266 5.42188 20.7266Z"})})}function Qs(){return I("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:I("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.75 6.5A3.75 3.75 0 0 0 2 10.25v3.5a3.75 3.75 0 0 0 3.75 3.75h7.5A3.75 3.75 0 0 0 17 13.75v-.46l2.9 2.16A1.25 1.25 0 0 0 22 14.45v-4.9a1.25 1.25 0 0 0-2.1-1L17 10.71v-.46a3.75 3.75 0 0 0-3.75-3.75h-7.5ZM6 8h7a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 16H6a2.5 2.5 0 0 1-2.5-2.5v-3A2.5 2.5 0 0 1 6 8Zm11 4.6v-1.2l3.5-2.61v6.42L17 12.6Z"})})}function vr(){return I("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:I("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.25 6.75C3.46 6.75 2 8.21 2 10v4c0 1.79 1.46 3.25 3.25 3.25h3.24c.83 0 1.55-.54 1.8-1.33l.52-1.67h2.38l.52 1.67c.25.79.97 1.33 1.8 1.33h3.24c1.79 0 3.25-1.46 3.25-3.25v-4c0-1.79-1.46-3.25-3.25-3.25H5.25Zm.67 3.42c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52H5.92Zm10.2 0c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52h-1.96Z"})})}function wr(){return Ea("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[I("path",{d:"M5.5 3.75c-.97 0-1.75.78-1.75 1.75v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5A3.25 3.25 0 0 1 5.5 2.25h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5ZM16.25 3c0-.41.34-.75.75-.75h1.5a3.25 3.25 0 0 1 3.25 3.25v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5c0-.97-.78-1.75-1.75-1.75H17c-.41 0-.75-.34-.75-.75ZM3 15.5c.41 0 .75.34.75.75v2.25c0 .97.78 1.75 1.75 1.75h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5a3.25 3.25 0 0 1-3.25-3.25v-2.25c0-.41.34-.75.75-.75ZM21 15.5c.41 0 .75.34.75.75v2.25a3.25 3.25 0 0 1-3.25 3.25H17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.5c.97 0 1.75-.78 1.75-1.75v-2.25c0-.41.34-.75.75-.75Z"}),I("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z"})]})}function $s(){return I("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:I("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"})})}function Ks(){return I("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:I("path",{d:"m480-236 93-93q12-12 29-12t29 12q12 12 12 29t-12 29L508-148q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L329-271q-12-12-12-29t12-29q12-12 29-12t29 12l93 93Zm0-484-93 93q-12 12-29 12t-29-12q-12-12-12-29t12-29l123-123q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l123 123q12 12 12 29t-12 29q-12 12-29 12t-29-12l-93-93Z"})})}function Js({active:i=!1}){return I("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:i?I("path",{d:"M240-240h-80q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h120q17 0 28.5 11.5T320-280v120q0 17-11.5 28.5T280-120q-17 0-28.5-11.5T240-160v-80Zm480 0v80q0 17-11.5 28.5T680-120q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320h120q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240h-80ZM240-720v-80q0-17 11.5-28.5T280-840q17 0 28.5 11.5T320-800v120q0 17-11.5 28.5T280-640H160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h80Zm480 0h80q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H680q-17 0-28.5-11.5T640-680v-120q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v80Z"}):I("path",{d:"M200-200h80q17 0 28.5 11.5T320-160q0 17-11.5 28.5T280-120H160q-17 0-28.5-11.5T120-160v-120q0-17 11.5-28.5T160-320q17 0 28.5 11.5T200-280v80Zm560 0v-80q0-17 11.5-28.5T800-320q17 0 28.5 11.5T840-280v120q0 17-11.5 28.5T800-120H680q-17 0-28.5-11.5T640-160q0-17 11.5-28.5T680-200h80ZM200-760v80q0 17-11.5 28.5T160-640q-17 0-28.5-11.5T120-680v-120q0-17 11.5-28.5T160-840h120q17 0 28.5 11.5T320-800q0 17-11.5 28.5T280-760h-80Zm560 0h-80q-17 0-28.5-11.5T640-800q0-17 11.5-28.5T680-840h120q17 0 28.5 11.5T840-800v120q0 17-11.5 28.5T800-640q-17 0-28.5-11.5T760-680v-80Z"})})}function _r(){return I("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:I("path",{d:"m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"})})}function Sr(){return I("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:I("path",{d:"M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"})})}var en=[{type:"orbit",label:"Orbit",hint:`Left-click drag to rotate / Right-click drag to pan
Scroll to zoom in/out`},{type:"trackball",label:"Trackball",hint:`Left-click drag to rotate freely / Right-click drag to pan
Scroll to zoom in/out`},{type:"fly",label:"Fly",hint:`W/S forward & back / A/D strafe / R/F up & down
Q/E roll / Drag to look around`}];var pe={PW:"pw",HW:"hw",VR:"vr",AR:"ar"},nu=[pe.VR,pe.AR];function Mr(i){return i===pe.VR||i===pe.AR}var xi=[".mint",".sog"],tn=xi.join(","),rn="Open file",Tr="local://",sn="static",Ra=".sog";function bi(i){return i.toLowerCase().endsWith(Ra)}function Fe(i){return typeof i?.url=="string"&&i.url.startsWith(Tr)}var nn="stepper";var Aa="@gracia/web-sdk/wasm",ka="https://market.gracia.ai/api/v1/streaming/content";function on(){return typeof __GRACIA_MODULE_URL__=="string"?__GRACIA_MODULE_URL__:Aa}function an(){return typeof __GRACIA_STREAMING_BASE_URL__=="string"?__GRACIA_STREAMING_BASE_URL__:ka}function Ia(){return typeof navigator>"u"?!1:!!navigator.gpu}var Fa={xr:"xr-failed",fullscreen:"fullscreen-failed","local-file":"local-file-failed"};function Ba(i){let e=i.match(/http\s+(-?\d+)/i);return e?Number(e[1]):null}function Oa(i,e){let t=e&&Fa[e];if(t)return t;let r=i.message.toLowerCase();if(r.includes("webgpu")||r.includes("not supported")||r.includes("getcontext"))return"unsupported-browser";let s=Ba(r);return s!==null?s===401||s===403?"access-denied":s===404?"not-found":s>=500?"server-error":"network":r.includes("failed to fetch dynamically imported module")?"load-failed":r.includes("forbidden")||r.includes("unauthorized")?"access-denied":Ia()?"unknown":"unsupported-browser"}var Ga=new Set(["unsupported-browser","not-found","access-denied","xr-failed","fullscreen-failed","local-file-failed"]),za=new Set(["xr-failed","fullscreen-failed","local-file-failed"]);function Na(i,e){let t=!Ga.has(i);return i==="unsupported-browser"?{presentation:"blocking",recoverable:t}:za.has(i)?{presentation:"toast",recoverable:t}:{presentation:e?"toast":"blocking",recoverable:t}}var Da={"unsupported-browser":{title:"This browser can\u2019t run the player",body:"The player requires WebGPU. Open it in a supported browser and device."},network:{title:"Connection lost",body:"We couldn\u2019t reach the stream. Check your connection and try again."},"not-found":{title:"Scene not found",body:"This content is no longer available."},"access-denied":{title:"Access denied",body:"You don\u2019t have permission to view this content."},"server-error":{title:"Something went wrong",body:"The server had a problem loading this scene. Please try again."},"load-failed":{title:"Couldn\u2019t load the scene",body:"We couldn\u2019t load this scene. Please try again."},"xr-failed":{title:"Couldn\u2019t enter immersive mode",body:"Immersive mode isn\u2019t available right now."},"fullscreen-failed":{title:"Couldn\u2019t enter fullscreen",body:"Fullscreen isn\u2019t available right now."},"local-file-failed":{title:"Couldn\u2019t open the file",body:"We couldn\u2019t open that file. Try a different one."},unknown:{title:"Something went wrong",body:"We couldn\u2019t load this scene. Please try again."}};function Xa(i){return Da[i]}function ln(i,e,t){let r=Oa(i,t);return{kind:r,cause:i,...Na(r,e),...Xa(r)}}var hn="data:font/woff2;base64,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";var cn=`@font-face {
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
`;var un="gracia-player-default-styles",vi=cn.replace('url("./assets/GolosText-Regular.woff2")',`url("${hn}")`);function Pr(i){if(typeof document>"u")return;let e=typeof ShadowRoot<"u"&&i instanceof ShadowRoot?i:i?.head??document.head;if(e.querySelector(`#${un}`))return;let t=document.createElement("style");t.id=un,t.textContent=vi,e.appendChild(t)}function K(...i){let e=[];for(let t of i)if(t){if(typeof t=="string"){e.push(t);continue}for(let[r,s]of Object.entries(t))s&&e.push(r)}return e.join(" ")}function de(i){return i.label??i.displayName??i.id??i.url??"Untitled"}function wi(i){return!Number.isFinite(i)||i<0?"0:00":`${Math.floor(i/60)}:${String(Math.floor(i%60)).padStart(2,"0")}`}function Se(i){return i instanceof Error?i:new Error(String(i))}function pn(i,e){return{event:(t,r)=>i?.event?.(t,r),error:(t,r)=>{i?.error?.(t,r),e?.(t,r)}}}import{jsx as dn,jsxs as Ua}from"react/jsx-runtime";var oe=({variant:i="primary",className:e,type:t="button",children:r,...s})=>{let n=Array.isArray(i)?i:[i];return dn("button",{type:t,className:K("gr-player__button",...n.map(o=>`gr-player__button--${o}`),e),...s,children:r})},Be=({variant:i="icon",srLabel:e,children:t,...r})=>Ua(oe,{variant:i,...r,children:[t,e&&dn("span",{className:"gr-player__sr",children:e})]});import{jsx as Rt,jsxs as Wa}from"react/jsx-runtime";var rt=({icon:i,title:e,body:t,detail:r,action:s,className:n,role:o,ariaLive:a})=>Rt("div",{className:n,role:o,"aria-live":a,children:Wa("div",{className:"gr-player__state-message",children:[Rt("div",{className:"gr-player__state-icon",children:i}),Rt("h2",{children:e}),Rt("p",{children:t}),r&&Rt("span",{className:"gr-player__sr",children:r}),s]})});import{jsx as fn}from"react/jsx-runtime";var _i=({message:i})=>fn("div",{className:"gr-player__error",role:"alert",children:fn("span",{className:"gr-player__error-text",children:i})});import{jsx as mn}from"react/jsx-runtime";var Si=({title:i,body:e,detail:t,action:r})=>mn(rt,{icon:mn($s,{}),title:i,body:e,detail:t,action:r,className:"gr-player__error-screen",role:"alert",ariaLive:"assertive"});import{jsx as gn}from"react/jsx-runtime";var Mi=()=>gn("div",{className:"gr-player__loader",role:"status","aria-live":"polite",children:gn("div",{className:"gr-player__spinner"})});import{forwardRef as uh,useImperativeHandle as ph,useRef as so}from"react";import{createContext as Ya,useContext as qa}from"react";var yn=Ya(null),Ti=yn.Provider,G=()=>{let i=qa(yn);if(!i)throw new Error("usePlayerContext must be used within a PlayerProvider");return i};var Za="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;background:none!important",ja=`
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`,Qa=`
uniform float uOpacity;
void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, uOpacity); }`,xn=`
varying vec3 vWorld;
vec4 project() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    return projectionMatrix * viewMatrix * world;
}`,$a=`${xn}
attribute vec3 grid;
varying vec3 vGrid;
void main() {
    vGrid = grid;
    gl_Position = project();
}`,Ka=`${xn}
void main() { gl_Position = project(); }`,bn=`
uniform float uReachInv;
uniform sampler2D uSplats;
uniform vec2 uScreen;
uniform float uMask;
varying vec3 vWorld;
float shown() {
    float near = 1.0 - smoothstep(0.5, 1.0, distance(vWorld, cameraPosition) * uReachInv);
    return near * (1.0 - uMask * texture2D(uSplats, gl_FragCoord.xy / uScreen).a);
}`,Ja=`${bn}
uniform vec3 uColor;
uniform float uOpacity;
void main() { gl_FragColor = vec4(uColor, uOpacity * shown()); }`,vn=`${bn}
uniform vec3 uColor;
uniform float uOpacity;
varying vec3 vGrid;
vec4 muted(float alpha) {
    float grey = dot(uColor, vec3(0.2126, 0.7152, 0.0722));
    return vec4(mix(uColor, vec3(grey), ${.3.toFixed(3)}), uOpacity * alpha * ${.8.toFixed(3)} * shown());
}`,el=`${vn}
void main() {
    vec2 cells = vec2(vGrid.x / max(vGrid.z, 1e-5), vGrid.y) / ${.25.toFixed(3)};
    vec2 cellsPerPixel = fwidth(cells);
    vec2 toLine = abs(fract(cells + 0.5) - 0.5);
    float halfLine = ${(.5*.005/.25).toFixed(4)};
    vec2 onLine = 1.0 - smoothstep(vec2(halfLine), halfLine + cellsPerPixel, toLine);
    float moire = 1.0 - smoothstep(0.2, 0.5, max(cellsPerPixel.x, cellsPerPixel.y));
    float lines = max(onLine.x, onLine.y) * moire * ${.7.toFixed(3)};
    gl_FragColor = muted(max(lines, ${.3.toFixed(3)}));
}`,tl=`${vn}
void main() {
    gl_FragColor = muted(${.4.toFixed(3)});
}`,it=class{#e;#t;#r;#i;#s;#n;#o;#l;#a=null;#h=null;#c;#u;#f;#p;#m=[0,0];#d=1;#g=null;#b=!1;constructor(e){this.#e=e,this.#t=new e.Scene,this.#r=new e.PerspectiveCamera,this.#r.matrixAutoUpdate=!1,this.#i=new e.Mesh(new e.PlaneGeometry(2,2),new e.ShaderMaterial({uniforms:{uOpacity:{value:0}},vertexShader:ja,fragmentShader:Qa,transparent:!0,depthTest:!1,depthWrite:!1})),this.#i.frustumCulled=!1,this.#i.renderOrder=10,this.#i.visible=!1,this.#f=new e.Texture,this.#f.generateMipmaps=!1,this.#f.minFilter=this.#f.magFilter=e.LinearFilter,this.#p=new e.DataTexture(new Uint8Array(4),1,1),this.#p.needsUpdate=!0,this.#u={uReachInv:{value:0},uSplats:{value:this.#p},uScreen:{value:new e.Vector2(1,1)},uMask:{value:1}};let t=new e.BufferGeometry;t.setAttribute("position",new e.BufferAttribute(new Float32Array(0),3)),this.#s=new e.Mesh(t,new e.ShaderMaterial({uniforms:{uColor:{value:new e.Color},uOpacity:{value:0},...this.#u},vertexShader:Ka,fragmentShader:Ja,transparent:!0,depthTest:!1,depthWrite:!1,side:e.DoubleSide})),this.#s.frustumCulled=!1,this.#s.visible=!1;let r={value:new e.Color},s=()=>{let n={uOpacity:{value:0},uColor:r,...this.#u},o=l=>new e.ShaderMaterial({uniforms:n,vertexShader:$a,fragmentShader:l,transparent:!0,depthTest:!1,depthWrite:!1,side:e.DoubleSide}),a=new e.Mesh(new e.BufferGeometry,[o(el),o(tl)]);return a.matrixAutoUpdate=!1,a.frustumCulled=!1,a.visible=!1,a};this.#n=s(),this.#n.renderOrder=11,this.#s.renderOrder=12,this.#t.add(this.#i,this.#n,this.#s),this.#l=s(),this.#o=new e.Scene,this.#o.add(this.#l),this.#c=new e.WebGLRenderTarget(1,1)}init(e){this.#h?.getContext()!==e&&(this.#v(),this.#h=new this.#e.WebGLRenderer({context:e,canvas:e.canvas}),this.#h.autoClear=!1,this.#h.outputColorSpace=this.#e.LinearSRGBColorSpace,this.#h.setClearColor(0,0))}sync(e){let t=e.darkness;this.#i.visible=t>.002,this.#i.material.uniforms.uOpacity.value=t,this.#d=1-e.outside,this.#u.uReachInv.value=this.#d/e.reach;let r=e.outline;if(this.#s.visible=r[3]>.002,this.#s.visible){let s=this.#s.material.uniforms;s.uOpacity.value=r[3],this.#_(s.uColor.value,r),this.#T(e.ribbon(.01))}this.#S(e),this.#b=this.#i.visible||this.#s.visible||this.#n.visible||this.#l.visible,this.#b||this.#g?.remove()}renderUnderlay(e,t,r,s,n,o,a){this.#l.visible&&this.#x(this.#o,e,t,r,s,n,o,a)}renderEye(e,t,r,s,n,o,a){this.#b&&this.#x(this.#t,e,t,r,s,n,o,a)}renderOver(e,t,r){if(!this.#b)return;let s=this.#g??=rl(),n=s.getContext("webgl2");if(!n)return;s.previousSibling!==e&&e.after(s),this.init(n);let{width:o,height:a}=e;(s.width!==o||s.height!==a)&&this.#h.setSize(o,a,!1),this.#u.uScreen.value.set(o,a);let l=this.#d>.002?r?.():null,h=l?this.#w(l):null;this.#u.uMask.value=this.#d,this.#h.clear(),this.#y(this.#o,t.projectionMatrix,t.matrixWorld,h),this.#y(this.#t,t.projectionMatrix,t.matrixWorld,h)}dispose(){this.#v(),this.#g?.remove(),this.#b=!1}#x(e,t,r,s,n,o,a,l){let h=this.#h;h&&(h.resetState(),h.setRenderTargetFramebuffer(this.#c,r),h.setRenderTarget(this.#c),h.setViewport(n,o,a,l),this.#y(e,s.projectionMatrix,s.transform.matrix),h.resetState(),t.bindFramebuffer(t.FRAMEBUFFER,r))}#y(e,t,r,s=null){this.#u.uSplats.value=s??this.#p;let n=this.#r;n.projectionMatrix.fromArray(t),n.projectionMatrixInverse.copy(n.projectionMatrix).invert(),n.matrixWorld.fromArray(r),this.#h.render(e,n)}#v(){this.#i.geometry.dispose(),this.#i.material.dispose(),this.#s.geometry.dispose(),this.#s.material.dispose();for(let e of[this.#n,this.#l]){e.geometry.dispose();for(let t of e.material)t.dispose()}this.#f.dispose(),this.#p.dispose(),this.#h?.dispose(),this.#h=null}#w(e){let[t,r]=this.#m;return(e.width!==t||e.height!==r)&&(this.#f.dispose(),this.#m=[e.width,e.height]),this.#f.image=e,this.#f.needsUpdate=!0,this.#f}#S(e){let t=e.surface,r=t[3]>.002?e.mesh:null,s=r?t[3]:0;if(this.#M(this.#n,s*e.aboveSplats),this.#M(this.#l,s*(1-e.aboveSplats)),!!r){if(this.#_(this.#n.material[0].uniforms.uColor.value,t),r!==this.#a){this.#a=r;let n=this.#e,o=new n.BufferGeometry;o.setAttribute("position",new n.BufferAttribute(r.positions,3)),o.setAttribute("grid",new n.BufferAttribute(r.grid,3)),o.setIndex(new n.BufferAttribute(r.indices,1)),o.addGroup(0,r.capStart,0),o.addGroup(r.capStart,r.indices.length-r.capStart,1);for(let a of[this.#n,this.#l])a.geometry.dispose(),a.geometry=o}this.#n.matrix.fromArray(e.meshMatrix),this.#l.matrix.fromArray(e.meshMatrix)}}#M(e,t){e.visible=t>.002,e.material[0].uniforms.uOpacity.value=t}#_(e,t){e.setRGB(t[0],t[1],t[2],this.#e.LinearSRGBColorSpace)}#T(e){let t=this.#s.geometry,r=t.getAttribute("position");r.array.length<e.length?(t.dispose(),t.setAttribute("position",new this.#e.BufferAttribute(e.slice(),3))):(r.array.set(e),r.needsUpdate=!0),t.setDrawRange(0,e.length/3)}};function rl(){let i=document.createElement("canvas");return i.style.cssText=Za,i.getContext("webgl2",{depth:!1}),i}import{signal as Me}from"@preact/signals-core";import{Container as q,Fullscreen as al,Svg as Ve,Text as Er}from"@react-three/uikit";import{signal as He}from"@preact/signals-core";import{forwardHtmlEvents as il}from"@pmndrs/pointer-events";import{createRoot as sl}from"@react-three/fiber";var Cr=class{#e;#t;#r;#i;#s;#n;#o=null;#l=null;#a;#h;#c=null;#u=null;#f=null;#p=!1;#m=!1;#d=!1;#g=!1;#b;#x;#y;#v;#w;#S;constructor(e,{pixelWidth:t,pixelHeight:r,worldWidth:s,worldHeight:n,cursorFactory:o,react:a=!1}){this.#s=e,this.#n=o,this.#p=a,this.#e=t*2,this.#t=r*2,this.#r=document.createElement("canvas"),this.#r.width=this.#e,this.#r.height=this.#t,this.#i=new e.WebGLRenderer({canvas:this.#r,alpha:!0,antialias:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.#i.setClearColor(0,0),this.#i.setSize(this.#e,this.#t,!1),this.#a=new e.Scene,this.#h=new e.OrthographicCamera(0,t,r,0,.1,10),this.#h.position.z=5,this.#b=new e.Raycaster,this.#x=new e.Vector3,this.#y=new e.Vector3,this.#v=new e.Quaternion,this.#w=new e.Mesh(new e.PlaneGeometry(s,n),new e.MeshBasicMaterial({visible:!1,side:e.DoubleSide}));let l=new e.SphereGeometry(.008,8,8),h=()=>new e.MeshBasicMaterial({color:65280,depthTest:!1});this.#S=[0,1].map(()=>{let c=new e.Mesh(l,h());return c.renderOrder=1001,c.visible=!1,c})}get canvas(){return this.#r}get scene(){return this.#a}get pixelWidth(){return this.#e/2}get pixelHeight(){return this.#t/2}get internalWidth(){return this.#e}get internalHeight(){return this.#t}get pointer(){return this.#o}get cursor(){return this.#l?.mesh??null}get ptrPressed(){return this.#m}get reactPending(){return this.#p}get hitMesh(){return this.#w}get hitSpheres(){return this.#S}async mountReact(e){this.#c=sl(this.#r),await this.#c.configure({frameloop:"never",orthographic:!0,size:{width:this.#e/2,height:this.#t/2},dpr:2,gl:this.#i,events:()=>({enabled:!1,priority:0,handlers:{}})}),this.#u=this.#c.render(e),this.#a=this.#u.getState().scene,this.#f=il(this.#r,()=>this.#u.getState().camera,this.#a,{batchEvents:!1}),this.#p=!1}patchCanvasForXR(){let e=this.pixelWidth,t=this.pixelHeight;this.#r.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,right:e,bottom:t,width:e,height:t,toJSON(){}});let r=new Set;this.#r.setPointerCapture=s=>r.add(s),this.#r.releasePointerCapture=s=>r.delete(s),this.#r.hasPointerCapture=s=>r.has(s)}setPointer(e,t,r,s=!1){if(!this.#o){if(!this.#a)return;this.#o={x:e,y:t,pressed:r};let h=this.#n(this.#s);h.position.z=.06,this.#a.add(h),this.#l={mesh:h,sx:e,sy:this.pixelHeight-t}}let n=this.#o;n.x=e,n.y=t,n.pressed=r;let o=this.#l,a=this.pixelHeight-t,l=o.mesh.visible?.6:1;o.sx+=(e-o.sx)*l,o.sy+=(a-o.sy)*l,o.mesh.visible=!0,this.#u?o.mesh.position.set(o.sx-this.pixelWidth/2,o.sy-this.pixelHeight/2,.06):o.mesh.position.set(o.sx,o.sy,.06),o.mesh.material.opacity=r?1:.7,s&&this.#M(e,t,r)}clearPointer(e=!1){e&&this.#o&&(this.#d?this.#g=!0:this.#_()),this.#o=null,this.#l&&(this.#l.mesh.visible=!1)}renderScene(){this.#p||(this.#f?.update(),this.#u?this.#u.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#a,this.#h))}clampAlpha(e){let t=this.#i.getContext();t.colorMask(!1,!1,!1,!0),t.clearColor(0,0,0,e),t.clear(t.COLOR_BUFFER_BIT),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0)}initFlat(){let e=!1,t=r=>{let s=this.#r.getBoundingClientRect();return{x:(r.clientX-s.left)/s.width*this.pixelWidth,y:(r.clientY-s.top)/s.height*this.pixelHeight}};this.#r.addEventListener("pointerdown",r=>{e=!0,this.#r.setPointerCapture(r.pointerId);let s=t(r);this.setPointer(s.x,s.y,!0)}),this.#r.addEventListener("pointermove",r=>{let s=t(r);this.setPointer(s.x,s.y,e)}),this.#r.addEventListener("pointerup",r=>{e=!1;let s=t(r);this.setPointer(s.x,s.y,!1)}),this.#r.addEventListener("pointerleave",()=>{e=!1,this.clearPointer()})}renderFlat(){this.#p||(this.#f?.update(),this.#u?this.#u.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#a,this.#h))}castRay(e,t){let r=e.rayTransform.position,s=e.rayTransform.orientation;return this.#x.set(r.x,r.y,r.z),this.#y.set(0,0,-1).applyQuaternion(this.#v.set(s.x,s.y,s.z,s.w)),this.rayHitQuad(this.#x,this.#y,t)}rayHitQuad(e,t,r=0){let s=this.pixelWidth,n=this.pixelHeight,o=this.#S[r];this.#b.ray.origin.copy(e),this.#b.ray.direction.copy(t);let a=this.#b.intersectObject(this.#w);if(a.length===0)return o.visible=!1,null;let l=a[0].point,h=a[0].uv;if(!h)return o.visible=!1,null;let c=h.x*s,u=(1-h.y)*n;return c<0||c>s||u<0||u>n?(o.visible=!1,null):(o.position.copy(l),o.visible=!0,o.updateMatrixWorld(!0),{x:c,y:u})}gazeHitsQuad(e,t){if(!e?.transform)return!0;let r=e.transform.position,s=e.transform.orientation,n=-2*(s.w*s.y+s.x*s.z),o=-2*(s.y*s.z-s.w*s.x),a=2*(s.x*s.x+s.y*s.y)-1,l=t||this.#w.position,h=l.x-r.x,c=l.y-r.y,u=l.z-r.z,p=Math.sqrt(h*h+c*c+u*u)||1;return(n*h+o*c+a*u)/p>.6}dispose(){this.#f?.destroy(),this.#f=null,this.#c&&(this.#c.unmount(),this.#c=null,this.#u=null),this.#i?.dispose(),this.#i=null}#M(e,t,r){let s=this.#m;this.#m=r;let n={clientX:e,clientY:t,pointerId:1,pointerType:"mouse",isPrimary:!0};this.#d=!0,r&&!s&&this.#r.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1,bubbles:!0})),this.#r.dispatchEvent(new PointerEvent("pointermove",{...n,buttons:r?1:0,bubbles:!0})),!r&&s&&this.#r.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0,bubbles:!0})),this.#d=!1,this.#g&&(this.#g=!1,this.#_())}#_(){let e={pointerId:1,pointerType:"mouse",isPrimary:!0};this.#m&&this.#r.dispatchEvent(new PointerEvent("pointerup",{...e,button:0,buttons:0,bubbles:!0})),this.#r.dispatchEvent(new PointerEvent("pointerleave",{...e,bubbles:!1})),this.#m=!1}};var nl=`attribute vec2 a_pos;
varying vec2 v_uv;
uniform mat4 u_mvp;
void main() {
    v_uv = a_pos + 0.5;
    gl_Position = u_mvp * vec4(a_pos, 0.0, 1.0);
}`,ol=`precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_alpha;
void main() {
    vec4 c = texture2D(u_tex, v_uv);
    gl_FragColor = vec4(c.rgb, c.a * u_alpha);
}`,Lr=class{#e=null;#t=null;#r=null;#i=!1;#s=null;#n=null;#o=null;#l=null;#a=null;#h=null;#c=null;#u=null;#f;#p;#m;#d;#g;#b;#x;#y;#v;#w;#S;constructor(e,{worldWidth:t,worldHeight:r,internalWidth:s,internalHeight:n,canvas:o}){this.#v=t,this.#w=r,this.#x=s,this.#y=n,this.#S=o,this.#f=new e.Matrix4,this.#p=new e.Matrix4,this.#m=new e.Matrix4,this.#d=new e.Vector3,this.#g=new e.Quaternion,this.#b=new e.Vector3(t,r,1)}get projected(){return this.#i}get layer(){return this.#t}get pose(){return this.#s??null}async init(e,t,r,s){if(this.#e=s,t)try{return this.#r=t,this.#t=t.createQuadLayer({space:r,viewPixelWidth:this.#x,viewPixelHeight:this.#y,layout:"mono",isStatic:!1,width:this.#v/2,height:this.#w/2}),this.stash(),this.#t}catch{this.#t=null,this.#r=null}return this.#i=!0,this.#M(s),null}stash(){this.#n=null,this.#t&&(this.#t.transform=new XRRigidTransform({x:0,y:-1e3,z:0},{x:0,y:0,z:0,w:1}))}setTransform(e){this.#s=e,this.#n=e}applyPose(e,t,r,s,n,o,a){let l=new XRRigidTransform({x:e,y:t,z:r},{x:s,y:n,z:o,w:a});this.#s=l,this.#n=l}upload(e){this.#t?(this.#n&&(this.#t.transform=this.#n,this.#n=null),this.#_(e,this.#r.getSubImage(this.#t,e)?.colorTexture)):(this.#_(e,this.#h),this.#n=null)}renderEye(e,t,r,s,n,o,a,l){if(!this.#i||!l||!this.#s)return;let h=this.#s.position,c=this.#s.orientation;this.#d.set(h.x,h.y,h.z),this.#g.set(c.x,c.y,c.z,c.w),this.#f.compose(this.#d,this.#g,this.#b),this.#m.fromArray(t.transform.inverse.matrix),this.#p.multiplyMatrices(this.#m,this.#f),this.#m.fromArray(t.projectionMatrix),this.#p.premultiply(this.#m),e.viewport(r,s,n,o),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(this.#o),e.uniformMatrix4fv(this.#c,!1,this.#p.elements),e.uniform1f(this.#u,a),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.#h),e.bindVertexArray(this.#l),e.drawArrays(e.TRIANGLES,0,6),e.bindVertexArray(null),e.disable(e.BLEND),e.useProgram(null)}dispose(){let e=this.#e;e&&this.#i&&(this.#o&&e.deleteProgram(this.#o),this.#l&&e.deleteVertexArray(this.#l),this.#a&&e.deleteBuffer(this.#a),this.#h&&e.deleteTexture(this.#h)),this.#t=this.#r=this.#e=null,this.#o=this.#l=this.#a=this.#h=null}#M(e){let t=e.createShader(e.VERTEX_SHADER);e.shaderSource(t,nl),e.compileShader(t);let r=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(r,ol),e.compileShader(r),this.#o=e.createProgram(),e.attachShader(this.#o,t),e.attachShader(this.#o,r),e.linkProgram(this.#o),e.deleteShader(t),e.deleteShader(r),this.#c=e.getUniformLocation(this.#o,"u_mvp"),this.#u=e.getUniformLocation(this.#o,"u_alpha"),e.useProgram(this.#o),e.uniform1i(e.getUniformLocation(this.#o,"u_tex"),0),e.uniform1f(this.#u,1);let s=e.getAttribLocation(this.#o,"a_pos");this.#l=e.createVertexArray(),e.bindVertexArray(this.#l),this.#a=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.#a),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-.5,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5]),e.STATIC_DRAW),e.enableVertexAttribArray(s),e.vertexAttribPointer(s,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),this.#h=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.#h),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.#x,this.#y,0,e.RGBA,e.UNSIGNED_BYTE,null),e.generateMipmap(e.TEXTURE_2D)}#_(e,t){if(!t)return;let r=this.#e,s=!this.#i;r.bindTexture(r.TEXTURE_2D,t),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,this.#i?r.LINEAR_MIPMAP_LINEAR:r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!0),s&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,this.#S),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),s&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this.#i&&r.generateMipmap(r.TEXTURE_2D)}};function Ci(i,e,t){let r=Math.sqrt(i*i+e*e+t*t)||1,s=Math.atan2(i/r,t/r)+Math.PI,n=Math.asin(e/r),o=s/2,a=n/2,l=Math.cos(o),h=Math.sin(o),c=Math.cos(a),u=Math.sin(a);return{qx:l*u,qy:h*c,qz:-h*u,qw:l*c}}var Pi=class{#e;#t;#r;#i;#s;#n;#o;constructor(e,t,r){let{qx:s,qy:n,qz:o,qw:a}=Ci(0,r,-t);this.#e=new e.Vector3(0,r,-t),this.#t=new e.Quaternion(s,n,o,a),this.#r=this.#e.clone(),this.#i=this.#t.clone(),this.#s=new e.Vector3,this.#n=new e.Quaternion,this.#o=new e.Vector3(0,1,0)}reset(){this.#r.copy(this.#e),this.#i.copy(this.#t)}remember(e,{position:t,orientation:r}){let s=this.#l(e).invert();this.#r.set(t.x,t.y,t.z).sub(this.#s).applyQuaternion(s),this.#i.set(r.x,r.y,r.z,r.w).premultiply(s)}place(e){let t=this.#l(e),r=this.#r.clone().applyQuaternion(t).add(this.#s),s=this.#i.clone().premultiply(t);return{x:r.x,y:r.y,z:r.z,qx:s.x,qy:s.y,qz:s.z,qw:s.w}}#l(e){let t=e.transform.position,r=e.transform.orientation,s=Math.atan2(2*(r.x*r.z+r.w*r.y),1-2*(r.x*r.x+r.y*r.y));return this.#s.set(t.x,t.y,t.z),this.#n.setFromAxisAngle(this.#o,s)}},st=class{#e;#t;#r=!1;#i=!1;#s;#n=null;#o=null;#l=!1;#a=null;#h=!1;#c=!1;#u=!1;alpha=1;onDragTick=null;onDragEnd=null;constructor(e,t){this.#s=new Pi(e,t.quadZ??.5,t.quadY??-.5),this.#e=new Cr(e,t),this.#t=new Lr(e,{worldWidth:t.worldWidth,worldHeight:t.worldHeight,internalWidth:this.#e.internalWidth,internalHeight:this.#e.internalHeight,canvas:this.#e.canvas})}get canvas(){return this.#e.canvas}get scene(){return this.#e.scene}get pixelWidth(){return this.#e.pixelWidth}get pixelHeight(){return this.#e.pixelHeight}get hitMesh(){return this.#e.hitMesh}get hitSpheres(){return this.#e.hitSpheres}get pointer(){return this.#e.pointer}get cursor(){return this.#e.cursor}async mountReact(e){return this.#e.mountReact(e)}rayHitQuad(e,t,r){return this.#e.rayHitQuad(e,t,r)}gazeHitsQuad(e,t){return this.#e.gazeHitsQuad(e,t)}get projected(){return this.#t.projected}get layer(){return this.#t.layer}get pose(){return this.#t.pose}get visible(){return this.#r}get placing(){return this.#i}get session(){return this.#n}get interacting(){return this.#r&&(this.#c||this.#l||this.#u||!!this.#o)}get dragging(){return this.#l}set dragging(e){this.#l=e}get panelDragging(){return this.#u}set panelDragging(e){this.#u=e,e||this.onDragEnd?.()}setPointer(e,t,r){this.#e.setPointer(e,t,r,!!this.#n)}clearPointer(){this.#e.clearPointer(!!this.#n)}initFlat(){this.#r=!0,this.#e.initFlat()}renderFlat(){this.#r&&this.#e.renderFlat()}async init(e,t,r,s){return this.#n=e,this.#e.patchCanvasForXR(),this.#t.init(e,t,r,s)}show(){this.#i=!0}recenter(){this.#s.reset(),this.#r&&this.show()}hide(){this.#e.clearPointer(!!this.#n),this.#l=!1,this.#a=null,this.#o=null,this.#u=!1,this.onDragEnd?.(),this.#r=this.#i=!1;for(let e of this.#e.hitSpheres)e.visible=!1;this.#t.stash()}setTransform(e){this.#t.setTransform(e)}stash(){this.#t.stash()}applyPose(e,t,r,s,n,o,a){this.#t.applyPose(e,t,r,s,n,o,a);let l=this.#e.hitMesh;l.position.set(e,t,r),l.quaternion.set(s,n,o,a),l.updateMatrixWorld(!0)}updatePosition(e){if(!this.#i||!e)return;this.#i=!1,this.#r=!0;let{x:t,y:r,z:s,qx:n,qy:o,qz:a,qw:l}=this.#s.place(e);this.applyPose(t,r,s,n,o,a,l)}drawContent(e){!this.#r||this.#e.reactPending||(this.#e.renderScene(),this.alpha<1&&!this.#t.projected&&this.#e.clampAlpha(this.alpha),this.#t.upload(e))}renderEye(e,t,r,s,n,o){this.#t.renderEye(e,t,r,s,n,o,this.alpha,this.#r)}handleInput(e,t,r){if(!this.#n)return!1;let s=!1,n=!1,o=null,a=null;for(let h of this.#e.hitSpheres)h.visible=!1;for(let[h,c]of[["left",e],["right",t]]){if(c?.menuPressed&&(s=!0),!c?.active||!this.#r||!c.rayTransform||c.held)continue;let u=h==="left"?0:1,p=this.#e.castRay(c,u);if(p){let f={hand:c,hit:p,side:h,trigger:!!c.triggerPressed};h==="left"?o=f:a=f}}let l=!!(o||a);if(this.#u){if(this.#t.pose&&r?.transform&&this.onDragTick){let h=this.onDragTick(e,t,r,this.#a,this.#t.pose);h?(this.applyPose(h.x,h.y,h.z,h.qx,h.qy,h.qz,h.qw),this.#s.remember(r,this.#t.pose)):(this.#u=!1,this.onDragEnd?.())}}else{let h=null;if(this.#o){let c=this.#o==="left"?o:a,u=this.#o==="left"?e:t,p=!!u?.triggerPressed;h=c||(p?{hand:u,hit:null,side:this.#o,trigger:p}:null),p||(this.#o=null)}if(!h){let c=this.#a;h=c==="left"?o||a:c==="right"?a||o:o||a}if(h){this.#a=h.side??this.#a;let c=this.#a==="left"?1:0;if(this.#e.hitSpheres[c].visible=!1,h.hit){let u=this.#e.ptrPressed;this.setPointer(h.hit.x,h.hit.y,h.trigger),h.trigger&&!u&&!this.#o&&(this.#o=this.#a)}else this.#e.pointer?this.setPointer(this.#e.pointer.x,this.#e.pointer.y,h.trigger):this.clearPointer();h.hand?.isTransientPointer&&(n=!0)}else this.clearPointer(),this.#a=null;this.#c=!!(o||a)}return s&&!this.#h&&(this.#r||this.#i?l||this.hide():this.show()),this.#h=s,n}dispose(){this.#r=!1,this.#n=null,this.#e.dispose(),this.#t.dispose()}};var nt=class{_quad;_sig=null;onPlayPause=null;onSeek=null;onPresetCycle=null;onExit=null;onClose=null;onSceneNav=null;constructor(e,t){this._quad=new st(e,{...t,react:!0})}get quad(){return this._quad}_createBaseSignals(){return{loadingD:He("none"),contentD:He("flex"),playD:He("flex"),pauseD:He("none"),spinD:He("none"),spinR:He(0),spinFast:He(!1)}}_updatePlayback(e,{loading:t,playing:r,spinning:s,buffering:n,progress:o}){e.loadingD.value=t?"flex":"none",e.contentD.value=t?"none":"flex",e.playD.value=!s&&!r?"flex":"none",e.pauseD.value=!s&&r?"flex":"none",e.spinD.value=s?"flex":"none",e.spinFast.value=s&&!n,this._quad.dragging||this._setProgress(o)}render(e){let t=this._sig;if(!this._quad.visible||!t)return;let r=t.loadingD.value==="flex",s=r?20:t.spinFast.value?14:6;(t.spinD.value==="flex"||r)&&(t.spinR.value-=e*s)}_seekFromEvent(e){this._seekTo(e.point.x+this._quad.pixelWidth/2)}_seekTo(e){}_setProgress(e){}};import{jsx as O,jsxs as Ar}from"react/jsx-runtime";var ht=i=>`data:image/svg+xml,${encodeURIComponent(i)}`,ll=ht('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#aaaaaa"/></svg>'),hl=ht('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#aaaaaa"/></svg>'),cl=ht('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#666666"/></svg>'),wn=ht('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1 1 2 12L5 12A7 7 0 1 0 12 5Z" fill="#888888"/></svg>'),ul=ht('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z" fill="#888888"/></svg>'),pl=ht('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.6 16.6L10 18l6-6-6-6-1.4 1.4L13.2 12z" fill="#888888"/></svg>'),at=30,Oe=520,Tn=72,Rr=Tn+at,Te=at+Tn/2,_n=14,At=40,kt=26,ot=6,Sn=26,kr=14,Li=kr/2,Ir=20,Ei=Ir/2,It=50,Mn=32,Ri={borderOpacity:.65},lt=class extends nt{#e=0;#t=0;constructor(e){let r=.86*(Rr/Oe);super(e,{pixelWidth:Oe,pixelHeight:Rr,worldWidth:.86,worldHeight:r,quadY:-.3,cursorFactory:s=>{let n=new s.Mesh(new s.CircleGeometry(4,32),new s.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#r().catch(s=>{})}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:s=!1,progress:n=0,timeText:o="0:00 / 0:00",presetName:a=null,sceneText:l=null,sceneLabel:h=null}){let c=this._sig;if(c&&(this._updatePlayback(c,{loading:e,playing:t,spinning:r,buffering:s,progress:n}),c.timeT.value=o,c.presetT&&a!=null&&(c.presetT.value=a),l!=null&&(c.sceneT.value=l),h!=null)){let u=String(h);c.sceneSub.value=u.length>Mn?`${u.slice(0,Mn-2)}...`:u}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-this.#e)/this.#t));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=this.#t*e;t.fillW.value=Math.max(.001,r),t.thumbL.value=this.#e+r-Li,t.thumbGlowL.value=this.#e+r-Ei}async#r(){let e=this._quad,t=_n,r=Te-At/2,s=Oe-_n-kt,n=Te-kt/2,o=s-10,a=66,l=24,h=o-a,c=Te-l/2;o=h-8;let u=78,p=o-u,f=Te-9,g=this.#e=t+At+12,d=this.#t=p-10-g,m=this._sig={...this._createBaseSignals(),fillW:Me(.001),thumbL:Me(g-Li),thumbGlowL:Me(g-Ei),thumbS:Me(1),thumbGlowOp:Me(0),timeT:Me("0:00 / 0:00"),sceneT:Me("1/1"),sceneSub:Me("SCENE"),presetT:Me("Off")},y=()=>{m.thumbGlowOp.value=.5,m.thumbS.value=1.15},v=()=>{e.dragging||(m.thumbGlowOp.value=0,m.thumbS.value=1)},b=T=>{T.target.setPointerCapture(T.pointerId),e.dragging=!0,this._seekFromEvent(T)},x=T=>{e.dragging&&this._seekFromEvent(T)},_=()=>{e.dragging=!1,m.thumbGlowOp.value=0,m.thumbS.value=1},M={backgroundColor:1710618},E=Ar(al,{backgroundColor:657930,backgroundOpacity:.88,children:[Ar(q,{positionType:"absolute",positionLeft:0,positionTop:0,width:Oe,height:Rr,display:m.contentD,borderWidth:1,borderColor:3355443,borderOpacity:.3,children:[O(q,{positionType:"absolute",positionLeft:0,positionTop:0,width:It,height:at,hover:M,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(-1),children:O(Ve,{src:ul,width:18,height:18,pointerEvents:"none"})}),Ar(q,{positionType:"absolute",positionLeft:It,positionTop:0,width:Oe-It*2,height:at,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,overflow:"hidden",children:[O(Er,{fontSize:13,color:11184810,children:m.sceneT}),O(Er,{fontSize:10,color:6710886,children:m.sceneSub})]}),O(q,{positionType:"absolute",positionLeft:Oe-It,positionTop:0,width:It,height:at,hover:M,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(1),children:O(Ve,{src:pl,width:18,height:18,pointerEvents:"none"})}),O(q,{positionType:"absolute",positionLeft:0,positionTop:at,width:Oe,height:.5,backgroundColor:3355443,backgroundOpacity:.5,pointerEvents:"none"}),Ar(q,{positionType:"absolute",positionLeft:t,positionTop:r,width:At,height:At,borderRadius:At/2,borderWidth:1,borderColor:4473924,borderOpacity:.5,hover:Ri,alignItems:"center",justifyContent:"center",onClick:()=>this.onPlayPause?.(),children:[O(Ve,{display:m.playD,src:ll,width:20,height:20,marginLeft:2,pointerEvents:"none"}),O(Ve,{display:m.pauseD,src:hl,width:18,height:18,pointerEvents:"none"}),O(Ve,{display:m.spinD,src:wn,width:24,height:24,transformRotateZ:m.spinR,pointerEvents:"none"})]}),O(q,{positionType:"absolute",positionLeft:g,positionTop:Te-Sn/2,width:d,height:Sn,onPointerEnter:y,onPointerLeave:v,onPointerDown:b,onPointerMove:x,onPointerUp:_}),O(q,{positionType:"absolute",positionLeft:g,positionTop:Te-ot/2,width:d,height:ot,borderRadius:ot/2,backgroundColor:2236962,backgroundOpacity:.8,pointerEvents:"none"}),O(q,{positionType:"absolute",positionLeft:g,positionTop:Te-ot/2,width:m.fillW,height:ot,borderRadius:ot/2,backgroundColor:7829367,zIndexOffset:1,pointerEvents:"none"}),O(q,{positionType:"absolute",positionLeft:m.thumbGlowL,positionTop:Te-Ir/2,width:Ir,height:Ir,borderRadius:Ei,borderWidth:2,borderColor:10066329,borderOpacity:m.thumbGlowOp,zIndexOffset:2,pointerEvents:"none"}),O(q,{positionType:"absolute",positionLeft:m.thumbL,positionTop:Te-kr/2,width:kr,height:kr,borderRadius:Li,backgroundColor:11184810,transformScaleX:m.thumbS,transformScaleY:m.thumbS,zIndexOffset:3,pointerEvents:"none"}),O(q,{positionType:"absolute",positionLeft:p,positionTop:f,width:u,height:18,alignItems:"center",justifyContent:"center",children:O(Er,{fontSize:13,color:16777215,opacity:.35,children:m.timeT})}),O(q,{positionType:"absolute",positionLeft:s,positionTop:n,width:kt,height:kt,borderRadius:kt/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:Ri,alignItems:"center",justifyContent:"center",onClick:()=>this.onExit?.(),children:O(Ve,{src:cl,width:11,height:11,pointerEvents:"none"})}),O(q,{positionType:"absolute",positionLeft:h,positionTop:c,width:a,height:l,borderRadius:l/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:Ri,alignItems:"center",justifyContent:"center",onClick:()=>this.onPresetCycle?.(),children:O(Er,{fontSize:11,color:10066329,pointerEvents:"none",children:m.presetT})})]}),O(q,{positionType:"absolute",positionLeft:0,positionTop:0,width:Oe,height:Rr,backgroundColor:657930,backgroundOpacity:1,display:m.loadingD,alignItems:"center",justifyContent:"center",children:O(Ve,{src:wn,width:40,height:40,transformRotateZ:m.spinR,pointerEvents:"none"})})]});await e.mountReact(E)}};var ct=class{#e;#t;#r=null;#i=null;#s;#n;#o;#l;constructor(e,t){this.#e=e,this.#t=t;let r=t.scene,s=new e.BufferGeometry().setFromPoints([new e.Vector3(0,0,0),new e.Vector3(0,0,-5)]),n=new e.SphereGeometry(.015,6,6);this.#s=new e.MeshBasicMaterial({color:16711680,depthTest:!1}),this.#n=new e.MeshBasicMaterial({color:65280,depthTest:!1});let o=()=>{let a=new e.Group,l=new e.Group,h=new e.Line(s,new e.LineBasicMaterial({color:5227511,transparent:!0,opacity:.5,depthTest:!1}));h.visible=!1,a.add(h);let c=new e.Mesh(n,this.#s),u=new e.Mesh(n,this.#s);return c.renderOrder=u.renderOrder=999,c.visible=u.visible=!1,r.add(a,l,c,u),{ray:a,grip:l,line:h,idxSphere:c,thmSphere:u}};this.#o=o(),this.#l=o()}update(e,t){this.#a(),this.#h(this.#o,e),this.#h(this.#l,t)}dispose(){this.#r&&(this.#t.anchor.remove(this.#r),this.#r.geometry.dispose(),this.#r.material.dispose());for(let e of[this.#o,this.#l])e.line.material.dispose(),e.idxSphere.geometry.dispose(),e.thmSphere.geometry.dispose();this.#s.dispose(),this.#n.dispose()}#a(){let e=this.#t.bboxMesh;if(e===this.#i)return;this.#i=e;let t=this.#t.anchor;if(this.#r&&(t.remove(this.#r),this.#r.geometry.dispose(),this.#r.material.dispose(),this.#r=null),!e)return;let r=this.#e;this.#r=new r.LineSegments(new r.EdgesGeometry(e.geometry),new r.LineBasicMaterial({color:58879,transparent:!0,opacity:.35,depthTest:!1})),this.#r.position.copy(e.position),t.add(this.#r)}#h(e,t){if(t.rayTransform&&this.#c(e.ray,t.rayTransform),t.gripTransform&&this.#c(e.grip,t.gripTransform),e.line.visible=t.active,e.idxSphere.visible=e.thmSphere.visible=!1,!t.active)return;t.indexTip&&(e.idxSphere.position.set(t.indexTip.x,t.indexTip.y,t.indexTip.z),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0)),t.thumbTip&&(e.thmSphere.position.set(t.thumbTip.x,t.thumbTip.y,t.thumbTip.z),e.thmSphere.visible=!0,e.thmSphere.updateMatrixWorld(!0)),t.indexTip||(e.idxSphere.position.copy(e.grip.position),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0));let r=t.gripping?this.#n:this.#s;e.idxSphere.material=r,t.thumbTip&&(e.thmSphere.material=r)}#c(e,t){let r=t.position,s=t.orientation;e.position.set(r.x,r.y,r.z),e.quaternion.set(s.x,s.y,s.z,s.w),e.updateMatrixWorld(!0)}};import{signal as R}from"@preact/signals-core";import{Container as A,Fullscreen as dl,Image as fl,Svg as X,Text as j}from"@react-three/uikit";import{jsx as w,jsxs as le}from"react/jsx-runtime";var F=9684710,ae=1122603,ml=661021,gl=2636615,yl=4086636,z=680,We=248,fe=34,Re=48,Le=fe+Re,In=Re,Ft=26,Ue=We+In,Pn=32,Y=88,Ee=60,Ge=We-Ee,Pe=(z-Y)/7,ve=Math.round(z/3),Fn=12,N=34,J=Y+Fn,pt=z-Y-Fn*2,Ce=Le+50,ki=pt-N,ze=24,Fr=18,Bn=J+ze,On=ki-ze*2,Cn={phase:"off",start:0,end:1,gap:0},Bt=(i,e)=>e?Bn+On*i:J+ki*i,Ai=(i,e)=>S.clamp01((i-(e?Bn:J))/(e?On:ki)),Ln=i=>Bt(i,!0)-ze,En=i=>Bt(i,!0)+N,W=(i,e="#93c6e6")=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${i}" fill="${e}"/></svg>`),xl="data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${pt*2}" height="${N*2}" viewBox="0 0 ${pt} ${N}"><defs><pattern id="h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1.5" height="6" fill="#93c6e6" fill-opacity="0.2"/></pattern></defs><rect width="100%" height="100%" fill="#0a161d"/><rect width="100%" height="100%" fill="url(#h)"/></svg>`),Rn="M8.76 21.6 7.221 20.1177 8.949 18.4235H8.76c-2.106 0-3.8925-.7191-5.3595-2.1573C1.9335 14.8279 1.2 13.0765 1.2 11.0118s.7335-3.81621 2.2005-5.25444C4.8675 4.31912 6.654 3.60001 8.76 3.60001h6.48c2.106 0 3.8925.71911 5.3595 2.15735C22.0665 7.19559 22.8 8.94707 22.8 11.0118s-.7335 3.8161-2.2005 5.2544c-1.467 1.4382-3.2535 2.1573-5.3595 2.1573v-2.1176c1.494 0 2.7675-.5162 3.8205-1.5485 1.053-1.0324 1.5795-2.2809 1.5795-3.7456s-.5265-2.71326-1.5795-3.74562c-1.053-1.03235-2.3265-1.54853-3.8205-1.54853H8.76c-1.494 0-2.7675.51618-3.8205 1.54853C3.8865 8.29854 3.36 9.54707 3.36 11.0118s.5265 2.722 1.5795 3.772c1.053 1.05 2.3265 1.628 3.8205 1.7339h.432l-1.944-1.9059 1.512-1.4824 4.32 4.2353L8.76 21.6Z",H={play:W("M8 5v14l11-7z"),pause:W("M6 4h4v16H6zm8 0h4v16h-4z"),spin:W("M12 2a10 10 0 1 1-10 10h3a7 7 0 1 0 7-7z"),bulb:W("M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"),mute:W("M7 9v6h4l5 5V4l-5 5H7z"),vol:W("M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"),loop:W(Rn),loopOn:W(Rn,"#11212b"),reset:W("M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"),exit:W("M17 7l-1.4 1.4L18.2 11H8v2h10.2l-2.6 2.6L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"),grip:W("M15.5 15.4V8.6L18.9 12l-3.4 3.4zM8.5 8.6v6.8L5.1 12l3.4-3.4z"),close:W("M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"),scale:W("M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z"),lock:W("M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"),unlk:W("M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"),arrL:W("M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"),arrR:W("M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z")},ut={backgroundColor:1849416},An=.9,bl=-.55,kn=.866,dt=class extends nt{#e;#t=null;#r=Cn;#i=null;#s=null;#n;#o;onMuteToggle=null;onScaleLockToggle=null;onLockToggle=null;onReset=null;onAbLoopToggle=null;onAbLoopSet=null;constructor(e){super(e,{pixelWidth:z,pixelHeight:Ue,worldWidth:1,worldHeight:Ue/z,quadZ:An,quadY:bl,cursorFactory:t=>{let r=new t.Mesh(new t.CircleGeometry(5,32),new t.MeshBasicMaterial({color:F,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return r.renderOrder=999,r}}),this.#e=e,this.#n=new e.Vector3,this.#o=new e.Quaternion,this._quad.alpha=.9,this._quad.onDragTick=(t,r,s,n,o)=>this.#l(t,r,s,n,o),this._quad.onDragEnd=()=>{this.#t=null,this._quad.alpha=.9},this.#u().catch(t=>{})}#l(e,t,r,s,n){let o=this.#e,a=this.#t,l=a?.side??s??"right",h=l==="left"?e:t;if(!h?.triggerPressed)return this.#t=null,null;let c=h.rayTransform?.orientation;if(!c){let _=n.position,M=n.orientation;return{x:_.x,y:_.y,z:_.z,qx:M.x,qy:M.y,qz:M.z,qw:M.w}}let u=this.#n.set(0,0,-1).applyQuaternion(this.#o.set(c.x,c.y,c.z,c.w));if(!a){let _=r.transform.position,M=new o.Vector3(_.x,_.y,_.z),E=n.position,T=new o.Vector3(E.x,E.y,E.z).sub(M);this.#t={side:l,R:T.length()||An,oQ:new o.Quaternion().setFromUnitVectors(u.clone(),T.normalize()),eye:M};let B=n.orientation;return{x:E.x,y:E.y,z:E.z,qx:B.x,qy:B.y,qz:B.z,qw:B.w}}if(u.applyQuaternion(a.oQ),Math.abs(u.y)>kn){u.y=Math.sign(u.y)*kn;let _=Math.sqrt(u.x*u.x+u.z*u.z)||1e-6,M=Math.sqrt(1-u.y*u.y)/_;u.x*=M,u.z*=M}let p=a.eye,f=a.R,g=p.x+u.x*f,d=p.y+u.y*f,m=p.z+u.z*f,{qx:y,qy:v,qz:b,qw:x}=Ci(u.x,u.y,u.z);return{x:g,y:d,z:m,qx:y,qy:v,qz:b,qw:x}}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:s=!1,progress:n=0,timeText:o="0:00 / 0:00",presetName:a=null,muted:l=!1,locked:h=!1,scaleLocked:c=!0,abLoop:u=Cn,sceneText:p=null,sceneLabel:f=null,bannerText:g=null}){let d=this._sig;if(!d)return;u.phase!=="active"&&(this.#s=null),u.phase!=="setB"&&(this.#i=null);let m=this.#s;if(this.#r=m?{...u,start:m.start,end:m.end}:u,this._updatePlayback(d,{loading:e,playing:t,spinning:r,buffering:s,progress:n}),this.#h(d),d.playTextD.value=r?"none":"flex",d.playLbl.value=t?"PAUSE":"PLAY",d.timeT.value=o,a!=null&&(d.presetT.value=a),d.icA.value=l?"none":"flex",d.icB.value=l?"flex":"none",d.muteLbl.value=l?"UNMUTE":"MUTE",d.sclLkLbl.value=c?"UNLOCK SCALE":"LOCK SCALE",d.lockA.value=h?"none":"flex",d.lockB.value=h?"flex":"none",d.lockLbl.value=h?"UNLOCK SCENE":"LOCK SCENE",p!=null&&(d.sceneT.value=p),f!=null){let y=String(f);d.sceneSub.value=y.length>Pn?`${y.slice(0,Pn-2)}...`:y}g!=null&&(d.bannerT.value=g)}#a(){let{phase:e,start:t,end:r,gap:s}=this.#r,n=this.#i==null?null:S.clamp(this.#i,t+s,1);return{a:e==="off"?null:t,b:e==="active"?r:n}}#h(e){let{phase:t,start:r}=this.#r,s=t!=="off",{b:n}=this.#a(),o=Ln(r),a=En(n??1);e.abOnD.value=s?"flex":"none",e.abOffD.value=s?"none":"flex",e.abTxtC.value=s?ae:F,e.abLbl.value=t==="setB"?"A/B LOOP (2/2)":"A/B LOOP",e.abAL.value=o,e.abBL.value=a,e.abBD.value=n==null?"none":"flex",e.abMarkerPE.value=t==="active"?"auto":"none",e.abPreW.value=o-J,e.abHoverD.value=this.#i==null?"none":"flex",e.abHoverL.value=o+ze,e.abHoverW.value=Math.max(0,a-o-ze)}#c(e){let{a:t,b:r}=this.#a(),s=e+(N-Fr)/2,n=o=>s<o+ze&&o<s+Fr;return t!=null&&n(Ln(t))||r!=null&&n(En(r))}_seekTo(e){let{phase:t,start:r,end:s}=this.#r,n=S.clamp(Ai(e-N/2,t!=="off"),r,s);this._setProgress(n),this.onSeek?.(n)}_setProgress(e){let t=this._sig;if(!t)return;let{phase:r,start:s,end:n}=this.#r,o=r!=="off",a=Bt(S.clamp(e,s,n),o),l=Bt(s,o);t.thumbL.value=a,t.fillL.value=l,t.fillW.value=Math.max(0,a+N-l),t.thumbIconD.value=this.#c(a)?"none":"flex"}async#u(){let e=this._sig={...this._createBaseSignals(),playTextD:R("flex"),playLbl:R("PAUSE"),fillL:R(J),fillW:R(N),thumbL:R(J),thumbS:R(1),thumbIconD:R("flex"),timeT:R("0:00 / 0:00"),sceneT:R("1/5"),sceneSub:R("SCENE"),icA:R("flex"),icB:R("none"),muteLbl:R("MUTE"),sclLkLbl:R("LOCK SCALE"),lockA:R("flex"),lockB:R("none"),lockLbl:R("LOCK SCENE"),abLbl:R("A/B LOOP"),abOnD:R("none"),abOffD:R("flex"),abTxtC:R(F),abAL:R(J),abBD:R("none"),abBL:R(J),abMarkerPE:R("none"),abPreW:R(0),abHoverD:R("none"),abHoverL:R(J),abHoverW:R(0),presetT:R("OFF"),bannerT:R("")},t=({x:b,y:x,w:_,h:M})=>w(A,{positionType:"absolute",positionLeft:b,positionTop:x,width:_,height:M,backgroundColor:F,backgroundOpacity:.3}),r=({idx:b,onClick:x,active:_=null,children:M})=>{let E=Y+b*Pe;return le(A,{positionType:"absolute",positionLeft:E,positionTop:Ge,width:Pe,height:Ee,backgroundColor:ae,hover:ut,onClick:x,children:[_&&w(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:Pe,height:Ee,backgroundColor:F,display:_,pointerEvents:"none"}),w(A,{width:"100%",height:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",children:M})]})},s=this._quad,n=b=>b.point.x+s.pixelWidth/2,o=b=>Ai(n(b)-ze/2-N,!0),a=()=>{e.thumbS.value=1.08},l=()=>{this.#i=null,s.dragging||(e.thumbS.value=1)},h=b=>{if(this.#r.phase==="setB"){this.#i=null,this.onAbLoopSet?.(this.#r.start,o(b));return}b.target.setPointerCapture(b.pointerId),s.dragging=!0,this._seekFromEvent(b)},c=b=>{this.#r.phase==="setB"?this.#i=o(b):s.dragging&&this._seekFromEvent(b)},u=()=>{s.dragging=!1,e.thumbS.value=1},p=b=>x=>{x.target.setPointerCapture(x.pointerId);let{start:_,end:M}=this.#r,E=n(x)-Bt(b==="a"?_:M,!0);this.#s={marker:b,grab:E,start:_,end:M}},f=b=>{let x=this.#s;if(!x)return;let _=Ai(n(b)-x.grab,!0),M=this.#r.gap;x.marker==="a"?x.start=Math.min(_,x.end-M):x.end=Math.max(_,x.start+M)},g=()=>{let b=this.#s;b&&(this.#s=null,this.onAbLoopSet?.(b.start,b.end))},d=({label:b,left:x,display:_,onPointerDown:M})=>w(A,{positionType:"absolute",positionLeft:x,positionTop:Ce,width:ze,height:N,backgroundColor:ae,borderWidth:1,borderColor:F,hover:ut,alignItems:"center",justifyContent:"center",display:_,pointerEvents:e.abMarkerPE,zIndex:1,zIndexOffset:8,onPointerDown:M,onPointerMove:f,onPointerUp:g,children:w(j,{fontSize:13,fontWeight:"bold",color:F,pointerEvents:"none",children:b})}),m=b=>{b.target.setPointerCapture(b.pointerId),s.panelDragging=!0,s.alpha=.3},y=()=>{s.panelDragging=!1},v=le(dl,{backgroundColor:ae,children:[le(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:Ue,display:e.contentD,children:[w(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:fe,backgroundColor:F,backgroundOpacity:.85}),w(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:fe,alignItems:"center",justifyContent:"center",children:w(j,{fontSize:13,fontWeight:"bold",color:ae,children:e.bannerT})}),w(A,{positionType:"absolute",positionLeft:0,positionTop:fe,width:ve,height:Re,backgroundColor:ae,hover:ut,onClick:()=>this.onSceneNav?.(-1)}),w(A,{positionType:"absolute",positionLeft:0,positionTop:fe,width:ve,height:Re,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:w(X,{src:H.arrL,width:28,height:28})}),w(t,{x:ve,y:fe,w:.5,h:Re}),le(A,{positionType:"absolute",positionLeft:ve,positionTop:fe,width:z-ve*2,height:Re,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,overflow:"hidden",children:[w(j,{fontSize:22,color:F,children:e.sceneT}),w(j,{fontSize:10,color:F,opacity:.45,children:e.sceneSub})]}),w(t,{x:z-ve,y:fe,w:.5,h:Re}),w(A,{positionType:"absolute",positionLeft:z-ve,positionTop:fe,width:ve,height:Re,backgroundColor:ae,hover:ut,onClick:()=>this.onSceneNav?.(1)}),w(A,{positionType:"absolute",positionLeft:z-ve,positionTop:fe,width:ve,height:Re,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:w(X,{src:H.arrR,width:28,height:28})}),w(t,{x:0,y:Le,w:z,h:.5}),w(A,{positionType:"absolute",positionLeft:0,positionTop:Le,width:Y,height:We-Le,backgroundColor:ae,hover:ut,onClick:()=>this.onPlayPause?.()}),le(A,{positionType:"absolute",positionLeft:0,positionTop:Le,width:Y,height:We-Le,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,pointerEvents:"none",children:[w(X,{display:e.playD,src:H.play,width:20,height:24,marginLeft:2}),w(X,{display:e.pauseD,src:H.pause,width:20,height:24}),w(X,{display:e.spinD,src:H.spin,width:28,height:28,transformRotateZ:e.spinR}),w(j,{fontSize:13,fontWeight:"bold",color:F,display:e.playTextD,children:e.playLbl})]}),w(t,{x:Y,y:Le,w:.5,h:We-Le}),w(A,{positionType:"absolute",positionLeft:Y+16,positionTop:Le+14,width:120,height:20,children:w(j,{fontSize:14,color:F,children:e.timeT})}),w(A,{positionType:"absolute",positionLeft:J,positionTop:Ce,width:pt,height:N,backgroundColor:ml,onPointerEnter:a,onPointerLeave:l,onPointerDown:h,onPointerMove:c,onPointerUp:u}),w(fl,{src:xl,positionType:"absolute",positionLeft:J,positionTop:Ce,width:pt,height:N,objectFit:"fill",keepAspectRatio:!1,zIndexOffset:1,pointerEvents:"none"}),w(A,{positionType:"absolute",positionLeft:e.abHoverL,positionTop:Ce,width:e.abHoverW,height:N,backgroundColor:yl,display:e.abHoverD,zIndex:1,zIndexOffset:2,pointerEvents:"none"}),w(A,{positionType:"absolute",positionLeft:J,positionTop:Ce,width:e.abPreW,height:N,backgroundColor:gl,display:e.abOnD,zIndex:1,zIndexOffset:3,pointerEvents:"none"}),w(A,{positionType:"absolute",positionLeft:e.fillL,positionTop:Ce,width:e.fillW,height:N,backgroundColor:F,backgroundOpacity:.85,zIndex:1,zIndexOffset:4,pointerEvents:"none"}),w(A,{positionType:"absolute",positionLeft:J,positionTop:Ce,width:pt,height:N,borderWidth:1,borderColor:F,borderOpacity:.6,zIndex:1,zIndexOffset:5,pointerEvents:"none"}),w(A,{positionType:"absolute",positionLeft:e.thumbL,positionTop:Ce,width:N,height:N,backgroundColor:ae,borderWidth:1,borderColor:F,zIndex:1,zIndexOffset:6,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none"}),w(A,{positionType:"absolute",positionLeft:e.thumbL,positionTop:Ce,width:N,height:N,alignItems:"center",justifyContent:"center",zIndex:1,zIndexOffset:7,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none",children:w(X,{display:e.thumbIconD,src:H.grip,width:Fr,height:Fr})}),w(d,{label:"A",left:e.abAL,display:e.abOnD,onPointerDown:p("a")}),w(d,{label:"B",left:e.abBL,display:e.abBD,onPointerDown:p("b")}),w(t,{x:Y,y:Ge,w:z-Y,h:.5}),le(r,{idx:0,onClick:()=>this.onPresetCycle?.(),children:[w(X,{src:H.bulb,width:20,height:20}),w(j,{fontSize:10,fontWeight:"bold",color:F,children:e.presetT})]}),w(t,{x:Y+Pe,y:Ge,w:.5,h:Ee}),le(r,{idx:1,onClick:()=>this.onMuteToggle?.(),children:[w(X,{display:e.icA,src:H.mute,width:20,height:20}),w(X,{display:e.icB,src:H.vol,width:20,height:20}),w(j,{fontSize:10,fontWeight:"bold",color:F,children:e.muteLbl})]}),w(t,{x:Y+Pe*2,y:Ge,w:.5,h:Ee}),le(r,{idx:2,onClick:()=>this.onScaleLockToggle?.(),children:[w(X,{src:H.scale,width:20,height:20}),w(j,{fontSize:10,fontWeight:"bold",color:F,children:e.sclLkLbl})]}),w(t,{x:Y+Pe*3,y:Ge,w:.5,h:Ee}),le(r,{idx:3,active:e.abOnD,onClick:()=>this.onAbLoopToggle?.(),children:[w(X,{display:e.abOffD,src:H.loop,width:20,height:20}),w(X,{display:e.abOnD,src:H.loopOn,width:20,height:20}),w(j,{fontSize:10,fontWeight:"bold",color:e.abTxtC,children:e.abLbl})]}),w(t,{x:Y+Pe*4,y:Ge,w:.5,h:Ee}),le(r,{idx:4,onClick:()=>this.onLockToggle?.(),children:[w(X,{display:e.lockA,src:H.unlk,width:20,height:20}),w(X,{display:e.lockB,src:H.lock,width:20,height:20}),w(j,{fontSize:10,fontWeight:"bold",color:F,children:e.lockLbl})]}),w(t,{x:Y+Pe*5,y:Ge,w:.5,h:Ee}),le(r,{idx:5,onClick:()=>this.onReset?.(),children:[w(X,{src:H.reset,width:20,height:20}),w(j,{fontSize:10,fontWeight:"bold",color:F,children:"RESET SCENE"})]}),w(t,{x:Y+Pe*6,y:Ge,w:.5,h:Ee}),le(r,{idx:6,onClick:()=>this.onExit?.(),children:[w(X,{src:H.exit,width:20,height:20}),w(j,{fontSize:10,fontWeight:"bold",color:F,children:"EXIT"})]}),w(t,{x:0,y:We,w:z,h:.5}),w(A,{positionType:"absolute",positionLeft:0,positionTop:We+1,width:z,height:In-1,backgroundColor:ae,hover:ut,alignItems:"center",justifyContent:"center",onPointerDown:m,onPointerUp:y,children:w(j,{fontSize:12,color:F,opacity:.45,pointerEvents:"none",children:"DRAG TO MOVE THE MENU"})}),w(A,{positionType:"absolute",positionLeft:z-Ft-4,positionTop:(fe-Ft)/2,width:Ft,height:Ft,borderRadius:Ft/2,backgroundColor:ae,backgroundOpacity:.8,borderWidth:1,borderColor:F,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",zIndexOffset:10,onClick:()=>this.onClose?.(),children:w(X,{src:H.close,width:12,height:12,pointerEvents:"none"})}),w(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:.5,backgroundColor:F,backgroundOpacity:.3,zIndexOffset:10}),w(A,{positionType:"absolute",positionLeft:0,positionTop:Ue-.5,width:z,height:.5,backgroundColor:F,backgroundOpacity:.3,zIndexOffset:10}),w(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:.5,height:Ue,backgroundColor:F,backgroundOpacity:.3,zIndexOffset:10}),w(A,{positionType:"absolute",positionLeft:z-.5,positionTop:0,width:.5,height:Ue,backgroundColor:F,backgroundOpacity:.3,zIndexOffset:10})]}),w(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:Ue,backgroundColor:ae,backgroundOpacity:1,display:e.loadingD,alignItems:"center",justifyContent:"center",children:w(X,{src:H.spin,width:64,height:64,transformRotateZ:e.spinR,pointerEvents:"none"})})]});await s.mountReact(v)}};var ft=class{#e;#t;#r;#i=null;#s;#n;#o;constructor(e){this.#e=e,this.#t=new e.Scene,this.#r=new e.Group,this.#t.add(this.#r),this.#s=new e.Vector3,this.#n=new e.Vector3,this.#o=new e.Raycaster}get scene(){return this.#t}get anchor(){return this.#r}get bboxMesh(){return this.#i}get hasBBox(){return!!this.#i}rebuildBBox(e,t){let r=this.#e;this.#i&&(this.#r.remove(this.#i),this.#i.geometry.dispose(),this.#i.material.dispose());let s=(e.minX+e.maxX)/2,n=(e.minY+e.maxY)/2,o=(e.minZ+e.maxZ)/2,a=new r.Box3(new r.Vector3(e.minX,e.minY,e.minZ),new r.Vector3(e.maxX,e.maxY,e.maxZ)).applyMatrix4(new r.Matrix4().fromArray(t)),l=a.getSize(new r.Vector3).max(new r.Vector3(.1,.1,.1)),h=a.getCenter(new r.Vector3),c=new r.BoxGeometry(l.x,l.y,l.z);return this.#i=new r.Mesh(c,new r.MeshBasicMaterial({visible:!1,side:r.DoubleSide})),this.#i.position.copy(h),this.#r.add(this.#i),{cx:s,cy:n,cz:o}}applyTransform(e,t){this.#r.position.set(e[0],e[1],e[2]),this.#r.scale.set(t,t,-t),this.#r.quaternion.identity(),this.#r.updateMatrixWorld(!0)}hitTest(e){if(!this.#i)return!1;let t=e.position,r=e.orientation;return this.#s.set(t.x,t.y,t.z),this.#n.set(-2*(r.w*r.y+r.x*r.z),-2*(r.y*r.z-r.w*r.x),2*(r.x*r.x+r.y*r.y)-1),this.#o.set(this.#s,this.#n),this.#o.intersectObject(this.#i,!1).length>0}};var mt=class i{#e;#t;#r;#i;#s;#n;static#o=1.5;static#l=.04;static#a=.15;static#h=4;static#c=20;static#u=.003;static#f=.001;static#p=.7;constructor(e,t){this.#e=e,this.#t=this.#m(),this.#r=this.#m(),this.#i=this.#d(),this.#s=this.#d(),this.#n=new e.Vector3,t.add(this.#t.group,this.#r.group,this.#i,this.#s)}update(e,t,r,s=!0){this.#g(this.#t,this.#i,s?e:null,r?.[0]),this.#g(this.#r,this.#s,s?t:null,r?.[1])}dispose(){for(let e of[this.#t,this.#r])e.mesh.geometry.dispose(),e.mesh.material.dispose();for(let e of[this.#i,this.#s])e.geometry.dispose(),e.material.dispose()}#m(){let e=this.#e,t=i.#h,r=i.#c,s=i.#o,n=i.#l,o=i.#a,a=i.#u,l=i.#f,h=i.#p,c=r+1,u=t+1,p=c*u,f=new Float32Array(p*3),g=new Float32Array(p*4),d=[];for(let x=0;x<c;x++){let _=x/r,M=-n-_*s,E=a+(l-a)*_,T=Math.min(_/o,1),B=1-_,Q=h*T*B;for(let Z=0;Z<=t;Z++){let V=Z/t*Math.PI*2,L=x*u+Z;f[L*3]=Math.cos(V)*E,f[L*3+1]=Math.sin(V)*E,f[L*3+2]=M,g[L*4]=1,g[L*4+1]=1,g[L*4+2]=1,g[L*4+3]=Q}}for(let x=0;x<r;x++)for(let _=0;_<t;_++){let M=x*u+_,E=M+1,T=M+u,B=T+1;d.push(M,T,E,E,T,B)}let m=new e.BufferGeometry;m.setAttribute("position",new e.BufferAttribute(f,3)),m.setAttribute("color",new e.BufferAttribute(g,4)),m.setIndex(d);let y=new e.MeshBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),v=new e.Mesh(m,y);v.frustumCulled=!1,v.renderOrder=998;let b=new e.Group;return b.add(v),b.visible=!1,{mesh:v,group:b}}#d(){let e=this.#e,t=new e.RingGeometry(.004,.008,24),r=new e.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),s=new e.Mesh(t,r);return s.frustumCulled=!1,s.renderOrder=999,s.visible=!1,s}#g(e,t,r,s){if(!r?.active||!r.rayTransform||r.isTransientPointer){e.group.visible=!1,t.visible=!1;return}let n=r.rayTransform.position,o=r.rayTransform.orientation;e.group.position.set(n.x,n.y,n.z),e.group.quaternion.set(o.x,o.y,o.z,o.w),e.group.visible=!0,e.group.updateMatrixWorld(!0);let a=r.triggerPressed??!1;if(e.mesh.material.color.setRGB(a?.4:1,a?.75:1,1),s?.visible){let l=this.#n.set(n.x,n.y,n.z).distanceTo(s.position),h=i.#l+i.#o;e.mesh.scale.z=Math.min(1,l/h),t.position.copy(s.position),t.quaternion.set(o.x,o.y,o.z,o.w),t.visible=!0,t.updateMatrixWorld(!0)}else e.mesh.scale.z=1,t.visible=!1}};var gt=Object.keys(Pt),Gn=i=>!Number.isFinite(i)||i<0?"0:00":`${~~(i/60)}:${String(~~i%60).padStart(2,"0")}`,Ii=i=>i.toUpperCase(),zn=i=>Math.max(.1,i*.01);var yt=class{#e;#t;#r;#i=null;#s=null;#n=null;#o=null;#l=null;#a=null;#h=0;#c=0;#u=0;#f=gt.indexOf("off");#p=Ii("off");#m=1;#d=!1;#g=!0;#b="off";#x=[];#y=0;#v=!0;#w=null;#S=null;#M=null;#_=null;#T=null;#P=null;#L;#C=null;#R=null;#k=null;constructor(e,{debug:t=!1,uiStyle:r="modern",rays:s=!0}={}){this.#e=e,this.#t=t,this.#r=r,this.#L=s}get uiStyle(){return this.#r}set uiStyle(e){this.#r=e}set manipulator(e){this.#s=e}get manipulator(){return this.#s}get uiActive(){return!this.#v&&(this.#i?.quad.interacting??!1)}get uiDragging(){if(this.#v)return!1;let e=this.#i?.quad;return(e?.dragging||e?.panelDragging)??!1}get quads(){let e=this.#i?.quad;return e?[e]:[]}set sources(e){this.#x=e??[],this.#y=Math.min(this.#y,Math.max(0,this.#x.length-1))}get sources(){return this.#x}set sceneIndex(e){this.#x.length&&(this.#y=Math.max(0,Math.min(this.#x.length-1,e)),this.#v=!0)}get sceneIndex(){return this.#y}set onSceneChange(e){this.#M=e}get onSceneChange(){return this.#M}set onPresetChange(e){this.#S=e}get onPresetChange(){return this.#S}set onLock(e){this.#_=e}get onLock(){return this.#_}set onScaleLock(e){this.#T=e}get onScaleLock(){return this.#T}set bannerText(e){this.#w=e}get bannerText(){return this.#w}set eventLogger(e){this.#P=e}get eventLogger(){return this.#P}setPreset(e,t=this.#m){this.#m=t,this.syncPreset(e),this.#A(this.#n,e,t)}syncPreset(e){let t=gt.indexOf(e);t<0||(this.#f=t,this.#p=Ii(e))}async init(e,t,r,s,n,o=!1){this.#n=e;let a=this.#e,l=this.#t||this.#L;this.#i=this.#r==="modern"?new dt(a):new lt(a),this.#I(e,t);let h=l?new ft(a):null;if(this.#k=h,h&&this.#s?.setOverlay(h),this.#d=this.#x[this.#y]?.locked??this.#d,this.#g=this.#x[this.#y]?.scaleLocked??this.#g,this.#s&&(this.#s.locked=this.#d,this.#s.scaleLocked=this.#g),this.#A(e,gt[this.#f],this.#m),h){this.#i.quad.hitMesh&&h.scene.add(this.#i.quad.hitMesh);for(let u of this.#i.quad.hitSpheres)h.scene.add(u);this.#t&&(this.#C=new ct(a,h)),this.#L&&(this.#R=new mt(a,h.scene))}l&&h&&(this.#o=new a.WebGLRenderer({context:n,canvas:n.canvas}),this.#o.autoClear=!1,this.#l=new a.PerspectiveCamera(50,1,.01,1e4),this.#l.matrixAutoUpdate=!1,this.#a=new a.WebGLRenderTarget(1,1),this.#o.setRenderTarget(this.#a),this.#o.setRenderTarget(null));let c=await this.#i.quad.init(t,r,s,n);return this.#h=setTimeout(()=>this.#i?.quad.show(),1e3),c?[c]:[]}frame(e,t,r,s,n,o){this.#E(o),this.#i?.quad.updatePosition(s),this.#i?.quad.handleInput(this.#s?.leftHand,this.#s?.rightHand,s),this.#C?.update(this.#s?.leftHand,this.#s?.rightHand),this.#R?.update(this.#s?.leftHand,this.#s?.rightHand,this.#i?.quad.hitSpheres,!!this.#i?.quad.visible),this.#i?.quad.panelDragging&&this.#s?.reset(),this.#z(e,o),this.#i?.render(e),this.#i?.quad.drawContent(t)}renderEye(e,t,r,s,n,o,a){this.#i?.quad.renderEye(e,r,s,n,o,a),!(!this.#o||!this.#k)&&(this.#l.projectionMatrix.fromArray(r.projectionMatrix),this.#l.projectionMatrixInverse.copy(this.#l.projectionMatrix).invert(),this.#l.matrix.fromArray(r.transform.matrix),this.#l.matrixWorld.copy(this.#l.matrix),this.#l.matrixWorldInverse.fromArray(r.transform.inverse.matrix),this.#o.resetState(),this.#o.setRenderTargetFramebuffer(this.#a,t),this.#o.setRenderTarget(this.#a),this.#o.setViewport(s,n,o,a),this.#o.setScissor(s,n,o,a),this.#o.setScissorTest(!0),this.#o.clearDepth(),this.#o.render(this.#k.scene,this.#l),this.#o.resetState(),e.bindFramebuffer(e.FRAMEBUFFER,t))}onRefReset(){this.#i?.quad.recenter()}render(e,t){}dispose(){clearTimeout(this.#h),this.#b!=="off"&&this.#O(this.#n),this.#C?.dispose(),this.#C=null,this.#R?.dispose(),this.#R=null,this.#k=null,this.#o?.dispose(),this.#o=null,this.#a?.dispose(),this.#a=null,this.#l=null,this.#i?.quad.dispose(),this.#i=null,this.#s?.reset(),this.#s=null,this.#c=0}#I(e,t){let r=this.#i;r.onPlayPause=()=>{(e?.isBuffering??!1)||(e?.isPlaying?e.pause():e.play(),this.#P?.event?.("play_pause",{playing:!e?.isPlaying}))},r.onSeek=s=>{e?.seek?.(s*(e?.duration??0)),this.#P?.event?.("seek",{position:s})},r.onPresetCycle=()=>{let s=gt[(this.#f+1)%gt.length];this.#A(e,s,this.#m),this.#S?.(s),this.#P?.event?.("preset_cycle",{preset:s})},r.onExit=()=>{this.#P?.event?.("exit"),t?.end()},r.onClose=()=>{r.quad.hide()},r.onSceneNav=s=>{if(!this.#x.length)return;let n=Math.max(0,Math.min(this.#x.length-1,this.#y+s));n!==this.#y&&(this.#y=n,this.#v=!0,this.#N(),this.#M?.(this.#x[this.#y],this.#y),this.#P?.event?.("scene_nav",{index:n,label:this.#x[n]?.label,dir:s}))},this.#r==="modern"&&(r.onMuteToggle=()=>{let s=this.#G(e);this.#P?.event?.("mute_toggle",{muted:!s})},r.onReset=()=>{this.#s?.resetToInitial(),this.#P?.event?.("reset")},r.onLockToggle=()=>{this.#d=!this.#d,this.#s&&(this.#s.locked=this.#d),this.#_?.(this.#d),this.#P?.event?.("lock_toggle",{locked:this.#d})},r.onAbLoopToggle=()=>{this.#b==="off"?this.#F(e):this.#O(e),this.#P?.event?.("ab_loop_toggle",{enabled:this.#b!=="off"})},r.onAbLoopSet=(s,n)=>{if(this.#b==="off")return;let o=e.duration;this.#B(e,s*o,n*o),this.#b="active",this.#P?.event?.("ab_loop_set",e.playbackRange)},r.onScaleLockToggle=()=>{this.#g=!this.#g,this.#s&&(this.#s.scaleLocked=this.#g),this.#T?.(this.#g),this.#P?.event?.("scale_lock_toggle",{scaleLocked:this.#g})})}#F(e){let t=e?.duration??0;t<=0||(this.#B(e,e.currentTime,t),this.#b="setB")}#B(e,t,r){let s=e.duration,n=zn(s),o=S.clamp(t,0,s-n);e.setPlaybackRange(o,S.clamp(r,o+n,s))}#O(e){e?.clearPlaybackRange(),this.#b="off"}#N(){this.#d=this.#x[this.#y]?.locked??this.#d,this.#g=this.#x[this.#y]?.scaleLocked??this.#g}#G(e){let t=!(e?.audioEnabled??!1);return t?e?.enableAudio?.():e?.disableAudio?.(),t}#A(e,t,r=1){let s=gt.indexOf(t);if(s<0)return;this.#f=s,this.#p=Ii(t);let n=Pt[t];n?e?.setEnvLighting(ke(n),r):e?.clearEnvLighting()}#E(e){!this.#v||!e.duration||(this.#v=!1,this.#b="off",this.#d=this.#x[this.#y]?.locked??this.#d,this.#g=this.#x[this.#y]?.scaleLocked??this.#g)}#z(e,t){let r=!(t?.audioEnabled??!1);if(this.#v)this.#i?.update({loading:!0,muted:r,locked:this.#d,scaleLocked:this.#g,sceneText:this.#x.length?`${this.#y+1}/${this.#x.length}`:"1/1",sceneLabel:(this.#x[this.#y]?.label??"SCENE").toUpperCase(),bannerText:this.#w});else{let s=t?.isBuffering??!1,n=t?.duration??0;n>0&&(this.#u=n);let o=this.#u,a=t?.currentTime??0,l=p=>p/(o||1),h=S.clamp01(l(a)),{start:c,end:u}=t.playbackRange;this.#i?.update({loading:!1,playing:t?.isPlaying??!1,spinning:s,buffering:s,progress:h,timeText:`${Gn(a)} / ${Gn(o)}`,presetName:this.#p,muted:r,locked:this.#d,scaleLocked:this.#g,abLoop:{phase:this.#b,start:l(c),end:l(u),gap:l(zn(o))},sceneText:this.#x.length?`${this.#y+1}/${this.#x.length}`:"1/1",sceneLabel:(this.#x[this.#y]?.label??"SCENE").toUpperCase(),bannerText:this.#w})}this.#D(e)}#D(e){if(this.#c>0){this.#c-=e;return}let t=this.#s?.leftHand.microSwipe||this.#s?.rightHand.microSwipe;t&&(this.#c=.45,this.#i?.onSceneNav(t))}};import{useState as vl}from"react";import*as wl from"three";function Fi(){let[i]=vl(()=>new it(wl));return i}import{useEffect as Nn,useRef as _l,useState as Sl}from"react";function Bi(i,e,t){let[r,s]=Sl(!1);Nn(()=>{let a=i.current;if(!a)return;let l=()=>s(!0),h=c=>{c.touches.length>1&&l()};return a.addEventListener("pointerdown",l),a.addEventListener("wheel",l),a.addEventListener("touchmove",h),()=>{a.removeEventListener("pointerdown",l),a.removeEventListener("wheel",l),a.removeEventListener("touchmove",h)}},[i]);let n=_l(e);return Nn(()=>{n.current!==e&&(n.current=e,s(!1))},[e]),{hasInteracted:r,resetView:()=>{t.reset(),s(!1)}}}import{useEffect as Ml,useState as Tl}from"react";var Pl=500;function Oi(i,e=Pl){let[t,r]=Tl(!1);return Ml(()=>{if(!i){r(!1);return}let s=setTimeout(()=>r(!0),e);return()=>clearTimeout(s)},[i,e]),i&&t}import{useEffect as Cl,useRef as Ll,useState as El}from"react";var Rl=2e3;function Gi({coreError:i,interactionError:e,isSceneReady:t,currentSource:r,open:s,clearError:n}){let[o,a]=El(null),l=Ll(new WeakMap);e?.phase&&l.current.set(e.error,e.phase);let h=i&&e?.error===i?e.phase:i?l.current.get(i):void 0,c=i?{error:i,phase:h}:e,u=c?ln(c.error,t,c.phase):null,p=u?.presentation==="blocking",f=u?.presentation==="toast"&&u.cause!==o?u:null,g=f?.cause??null;return Cl(()=>{if(!g)return;let y=setTimeout(()=>{a(g),n()},Rl);return()=>clearTimeout(y)},[g,n]),{playerError:u,isBlocking:!!p,toast:f,retry:()=>r?s(r):window.location.reload(),dismiss:()=>{f&&a(f.cause),n()}}}import{useCallback as Al,useEffect as kl,useState as Il}from"react";function zi(i,e){let[t,r]=Il(!1),s=Al(async()=>{let n=i.current;if(!(!n||typeof document>"u"))try{document.fullscreenElement===n?await document.exitFullscreen():await n.requestFullscreen()}catch(o){e(Se(o),{phase:"fullscreen"})}},[e,i]);return kl(()=>{if(typeof document>"u")return;let n=()=>r(document.fullscreenElement===i.current);return n(),document.addEventListener("fullscreenchange",n),()=>document.removeEventListener("fullscreenchange",n)},[i]),{isFullscreen:t,toggleFullscreen:s}}import{useRef as Fl}from"react";function Dn(i){let e=bi(i.name);return{url:`${Tr}${i.name}`,label:i.name,file:i,...e?{type:sn}:{}}}async function Bl(i){return bi(i.name)?Dn(await i.getFile()):{url:`${Tr}${i.name}`,label:i.name,localFile:i}}function Ol(){return typeof window>"u"?null:window.showOpenFilePicker??null}function Gl(i){return i instanceof DOMException&&i.name==="AbortError"}function zl(i){let e=i.currentTarget.files?.[0];return i.currentTarget.value="",e?Dn(e):null}function Ni({localFiles:i,logger:e,reportError:t,playlist:r,clearError:s}){let n=Fl(null),o=!!i,a=c=>{s();let u=[...r.sources,c];r.setSources(u),r.goTo(u.length-1),e.event?.("local_file_open",{label:de(c)})};return{enabled:o,fileInputProps:{ref:n,accept:tn,onChange:c=>{let u=zl(c);u&&a(u)}},localLabel:rn,openLocalFile:async()=>{if(!o)return;let c=Ol();if(!c){n.current?.click();return}try{let p=(await c({types:[{description:"Volumetric video",accept:{"application/octet-stream":[...xi]}}]}))[0];p&&a(await Bl(p))}catch(u){Gl(u)||t(Se(u),{phase:"local-file"})}}}}import{useRef as Di}from"react";function Xi(i){let{containerRef:e,muted:t=!1,moduleFactory:r,overlay:s,boundaryRenderer:n,eventLogger:o,onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:u}=i,p=Di({onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:u});p.current={onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:u};let f=Di(null),g=Di(!1),d=xr({containerRef:e,moduleFactory:r,moduleUrl:r?void 0:on(),overlay:s,boundaryRenderer:n,eventLogger:o,onReady(){g.current||(g.current=!0,t||f.current?.app?.enableAudio()),p.current.onReady?.()},onProgress:y=>p.current.onProgress?.(y),onModeChange:(y,v)=>p.current.onModeChange?.(y,v),onXRStart:()=>p.current.onXRStart?.(),onXREnd:()=>p.current.onXREnd?.()});f.current=d;let m=br(d);return{gracia:d,playlist:m}}import{useCallback as Hi,useMemo as Xn,useState as Nl}from"react";function Dl(i){switch(i){case"init":case"load":case"xr":case"streaming":case"fullscreen":case"local-file":return i;default:return}}function Vi(i,e){let[t,r]=Nl(null),s=Xn(()=>pn(i,e),[i,e]),n=Hi((h,c)=>{r({error:h,phase:Dl(c?.phase)})},[]),o=Xn(()=>({event:(h,c)=>s.event?.(h,c),error:(h,c)=>{n(h,c),s.error?.(h,c)}}),[s,n]),a=Hi((h,c)=>{n(h,c),s.error?.(h,c)},[s,n]),l=Hi(()=>r(null),[]);return{interactionError:t,logger:o,reportError:a,clearError:l}}import{useEffect as Ql}from"react";import{useEffect as Xl,useRef as Hl}from"react";function Ui({isInitialized:i,sources:e,streaming:t,playlist:r,reportError:s}){let n=Hl(s);n.current=s,Xl(()=>{if(!i)return;let o=!1,a=l=>{o||l.length===0||(r.setSources(l),r.goTo(0))};if(t?.length)return tt(t,an()).then(a).catch(l=>{o||n.current(Se(l),{phase:"streaming"})}),()=>{o=!0};a(e)},[i,e,t,r.setSources,r.goTo])}import{useEffect as Vl,useRef as Hn}from"react";function Wi({currentSource:i,index:e,onSceneChange:t}){let r=Hn(t);r.current=t;let s=Hn(null);Vl(()=>{if(!i||e<0)return;let n=`${e}:${de(i)}`;s.current!==n&&(s.current=n,r.current?.(i,e))},[i,e])}import{useEffect as Ul,useState as Wl}from"react";var Yl=500;function Yi(i,e,t){let[r,s]=Wl(!1),n=Mr(i.mode)?i.mode:null;Ul(()=>{(!n||!i.xr.isActive)&&s(!1)},[n,i.xr.isActive]);let o=c=>{t(),s(!0),i.xr.setMode(c).catch(u=>{s(!1),e(Se(u),{phase:"xr",target:c})})},a=()=>{s(!1),i.xr.setMode(pe.PW).catch(c=>{e(Se(c),{phase:"xr",target:pe.PW})})},h=Oi(r&&!i.error,Yl)&&i.xr.isActive?n:null;return{enter:o,exit:a,activeScreenMode:h}}import{useRef as ql}from"react";import*as Zl from"three";function jl(i){if(i===!1)return null;let{uiStyle:e="modern",bannerText:t="EARLY BETA"}=i??{};try{let r=new yt(Zl,{uiStyle:e});return r.bannerText=t,r}catch{return null}}function qi(i){let e=ql(void 0);return e.current===void 0&&(e.current=jl(i)),e.current}function Zi(i,e){let{sources:t=[],streaming:r,muted:s=!1,cameraControls:n=!1,sceneSelector:o,moduleFactory:a,onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p,onSceneChange:f,onError:g,eventLogger:d,localFiles:m,xrOverlay:y}=i,v=qi(y),b=Fi(),{interactionError:x,logger:_,reportError:M,clearError:E}=Vi(d,g);Ql(()=>{Pr()},[]);let{gracia:T,playlist:B}=Xi({containerRef:e.container,muted:s,moduleFactory:a,overlay:v,boundaryRenderer:b,eventLogger:_,onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p});Ui({isInitialized:T.isInitialized,sources:t,streaming:r,playlist:B,reportError:M}),Wi({currentSource:B.currentSource,index:B.index,onSceneChange:f});let{fileInputProps:Q,enabled:Z,localLabel:V,openLocalFile:L}=Ni({localFiles:m,logger:_,reportError:M,playlist:B,clearError:E}),{isFullscreen:he,toggleFullscreen:Ne}=zi(e.root,M),qe=T.isContentReady&&!T.isLoading,{playerError:is,isBlocking:ss,toast:ho,retry:co,dismiss:uo}=Gi({coreError:T.error,interactionError:x,isSceneReady:qe,currentSource:B.currentSource,open:T.open,clearError:E}),po=!is&&(!T.isInitialized||!qe),Dr=Yi(T,M,E);return{contextValue:{gracia:T,playlist:B,config:{sceneSelector:o,cameraControls:n},refs:e,presentation:{isBusy:po,isSceneReady:qe,isBlocking:ss,playerError:is,toast:ho,retry:co,dismiss:uo},shell:{isFullscreen:he,toggleFullscreen:Ne,localFilesEnabled:Z,fileInputProps:Q,openLocalFile:L,localLabel:V},xr:{enter:Dr.enter,exit:Dr.exit,activeScreenMode:ss?null:Dr.activeScreenMode}},gracia:T,playlist:B,openLocalFile:L,toggleFullscreen:Ne}}import{useEffect as Vn,useRef as Un,useState as $l}from"react";import{jsx as ee,jsxs as Ot}from"react/jsx-runtime";var Wn=()=>{let{playlist:i}=G(),e=Un(null),t=Un(i.index),[r,s]=$l(!1),n=i.currentSource,o=n?de(n):"Select scene",a=i.total>1;return Vn(()=>{t.current!==i.index&&(t.current=i.index,s(!1))},[i.index]),Vn(()=>{if(!r)return;let l=h=>{e.current&&!e.current.contains(h.target)&&s(!1)};return document.addEventListener("click",l),()=>document.removeEventListener("click",l)},[r]),Ot("div",{ref:e,className:"gr-player__scene",children:[Ot("div",{className:"gr-player__scene-inner",children:[Ot("button",{className:"gr-player__scene-main",type:"button",disabled:!a,onClick:()=>s(!r),"aria-haspopup":"menu","aria-expanded":r,children:[ee(Ks,{}),Ot("span",{className:"gr-player__scene-main-copy",children:[ee("span",{className:"gr-player__scene-copy",children:ee("span",{className:"gr-player__scene-label",children:o})}),a&&ee("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:i.sources.map((l,h)=>ee("span",{className:K("gr-player__scene-segment",h===i.index&&"is-active")},l.id??l.url??h))})]})]}),ee("button",{className:"gr-player__scene-nav",type:"button",disabled:!i.hasPrev,onClick:()=>i.prev(),"aria-label":"Previous scene",children:ee(_r,{})}),ee("button",{className:"gr-player__scene-nav",type:"button",disabled:!i.hasNext,onClick:()=>i.next(),"aria-label":"Next scene",children:ee(Sr,{})})]}),r&&a&&ee("div",{className:"gr-player__scene-menu",children:i.sources.map((l,h)=>Ot("button",{type:"button",className:K("gr-player__scene-item",h===i.index&&"is-active"),onClick:()=>{i.goTo(h),s(!1)},children:[ee("span",{children:Fe(l)?ee(Ie,{}):h+1}),ee("strong",{children:de(l)})]},l.id??l.url??h))})]})};import{jsx as me,jsxs as ji}from"react/jsx-runtime";var Yn=()=>{let{playlist:i}=G(),e=i.currentSource,t=Fe(e);return me("div",{className:"gr-player__scene gr-player__scene--stepper",children:ji("div",{className:"gr-player__scene-inner",children:[me("button",{className:"gr-player__scene-nav",type:"button",disabled:!i.hasPrev,onClick:()=>i.prev(),"aria-label":"Previous scene",children:me(_r,{})}),me("div",{className:"gr-player__scene-main",children:ji("span",{className:"gr-player__scene-main-copy",children:[t&&e?ji("span",{className:"gr-player__scene-count gr-player__scene-count--local",children:[me(Ie,{}),me("span",{className:"gr-player__scene-label",children:de(e)})]}):me("span",{className:"gr-player__scene-count",children:i.index>=0?`${i.index+1} of ${i.total}`:`${i.total} scenes`}),me("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:i.sources.map((r,s)=>me("span",{className:K("gr-player__scene-segment",s===i.index&&"is-active",Fe(r)&&"gr-player__scene-segment--local")},r.id??r.url??s))})]})}),me("button",{className:"gr-player__scene-nav",type:"button",disabled:!i.hasNext,onClick:()=>i.next(),"aria-label":"Next scene",children:me(Sr,{})})]})})};import{useEffect as Kl,useRef as Jl}from"react";import{jsx as Gt}from"react/jsx-runtime";var qn=()=>{let{playlist:i}=G(),e=Jl(null),t=i.index;return Kl(()=>{e.current?.querySelector(`.gr-player__scene-tab[data-scene-index="${t}"]`)?.scrollIntoView({block:"nearest",inline:"nearest"})},[t]),Gt("div",{className:"gr-player__scene",children:Gt("div",{className:"gr-player__scene-inner",children:Gt("div",{ref:e,className:"gr-player__scene-tabs-scroll",children:i.sources.map((r,s)=>Gt("button",{type:"button","data-scene-index":s,className:K("gr-player__scene-tab",s===i.index&&"is-active",Fe(r)&&"gr-player__scene-tab--local"),onClick:()=>i.goTo(s),"aria-label":`Open ${de(r)}`,"aria-current":s===i.index?"true":void 0,children:Fe(r)?Gt(Ie,{}):s+1},r.id??r.url??s))})})})};import{jsx as th}from"react/jsx-runtime";var eh={tabs:qn,stepper:Yn,menu:Wn},Br=()=>{let{config:i}=G(),{sceneSelector:e=nn}=i,t=eh[e];return th(t,{})};import{useRef as Zn,useState as rh}from"react";import{jsx as Or,jsxs as ih}from"react/jsx-runtime";var Qi=({progress:i,duration:e,onSeek:t,disabled:r=!1})=>{let s=Zn(null),n=Zn(!1),[o,a]=rh(0),l=u=>{if(!s.current)return 0;let p=s.current.getBoundingClientRect();return Math.min(1,Math.max(0,(u.clientX-p.left)/p.width))},h=u=>{e>0&&t(l(u)*e)},c=r?void 0:{onPointerDown(u){n.current=!0,u.currentTarget.setPointerCapture(u.pointerId),h(u)},onPointerMove(u){a(l(u)),n.current&&h(u)},onPointerLeave(){a(0)},onPointerUp(u){n.current=!1,u.currentTarget.releasePointerCapture(u.pointerId)},onPointerCancel(){n.current=!1}};return Or("div",{className:"gr-player__seek-shell","aria-disabled":r||void 0,children:ih("div",{ref:s,className:"gr-player__seek",role:"slider","aria-valuemin":0,"aria-valuemax":Math.max(e,0),"aria-valuenow":Math.round(i*Math.max(e,0)),"aria-disabled":r||void 0,tabIndex:r?-1:0,...c,children:[Or("span",{className:"gr-player__seek-fill",style:{width:`${i*100}%`}}),Or("span",{className:"gr-player__seek-hover",style:{width:`${o*100}%`}}),Or("span",{className:"gr-player__seek-thumb",style:{left:`${i*100}%`}})]})})};import{jsx as we,jsxs as jn}from"react/jsx-runtime";function sh(i,e){return e>0?Math.min(1,Math.max(0,i/e)):0}var Qn=()=>{let{gracia:i,playlist:e,presentation:t,shell:r}=G(),{isSceneReady:s}=t,{isFullscreen:n,toggleFullscreen:o}=r,{playback:a}=i,l=sh(a.currentTime,a.duration);return jn("div",{className:"gr-player__controls",children:[we(oe,{className:"gr-player__button--play",onClick:s?()=>a.togglePlay():void 0,"aria-label":a.isPlaying?"Pause":"Play","aria-disabled":!s||void 0,children:a.isPlaying?we(qs,{}):we(Ys,{})}),we(Br,{}),e.hasAudio&&we(Be,{className:"gr-player__mute",onClick:s?()=>a.toggleMute():void 0,"aria-label":a.isMuted?"Unmute":"Mute","aria-disabled":!s||void 0,children:a.isMuted?we(Zs,{}):we(js,{})}),we(Qi,{progress:l,duration:a.duration,onSeek:h=>a.seek(h),disabled:!s}),jn("div",{className:"gr-player__time",children:[wi(a.currentTime)," / ",wi(a.duration)]}),we(Be,{variant:["icon","secondary"],className:"gr-player__fullscreen",onClick:o,"aria-label":n?"Exit fullscreen":"Enter fullscreen","aria-pressed":n,title:n?"Exit fullscreen":"Enter fullscreen",children:we(Js,{active:n})})]})};import{useEffect as $n,useRef as nh,useState as oh}from"react";import{jsx as zt,jsxs as $i}from"react/jsx-runtime";var Kn=()=>{let{gracia:i,config:e,presentation:t}=G(),{isSceneReady:r,isBlocking:s}=t,[n,o]=oh(!1),a=nh(null),l=e.cameraControls&&r&&!s&&!Mr(i.mode);if($n(()=>{l||o(!1)},[l]),$n(()=>{if(!n)return;let u=f=>{a.current?.contains(f.target)||o(!1)},p=f=>{f.code==="Escape"&&o(!1)};return document.addEventListener("pointerdown",u),document.addEventListener("keydown",p),()=>{document.removeEventListener("pointerdown",u),document.removeEventListener("keydown",p)}},[n]),!l)return null;let{controlsType:h,setControls:c}=i.camera;return $i("div",{ref:a,className:"gr-player__camera-control",children:[zt(Be,{className:"gr-player__button--camera",onClick:()=>o(u=>!u),"aria-label":"Camera controls","aria-expanded":n,title:"Camera controls",srLabel:"Camera controls",children:zt(Qs,{})}),n&&$i("div",{className:"gr-player__camera-panel",role:"menu","aria-label":"Camera controls",children:[zt("div",{className:"gr-player__camera-title",children:"Camera"}),en.map(u=>$i("button",{className:K("gr-player__camera-option",u.type===h&&"is-active"),type:"button",role:"menuitemradio","aria-checked":u.type===h,onClick:()=>c(u.type),children:[zt("span",{className:"gr-player__camera-label",children:u.label}),zt("span",{className:"gr-player__camera-hint",children:u.hint})]},u.type))]})]})};import{jsx as Nt,jsxs as lh}from"react/jsx-runtime";var Ki=({className:i})=>{let{gracia:e,presentation:t,xr:r}=G(),{isSceneReady:s,isBlocking:n}=t,{enter:o}=r;if(n)return null;let a=e.xr.arSupported?pe.AR:e.xr.vrSupported?pe.VR:null;if(!a)return null;let l=a===pe.AR;return Nt("div",{className:["gr-player__xr-actions",i].filter(Boolean).join(" "),children:Nt(ah,{active:e.mode===a,disabled:!s,icon:l?Nt(wr,{}):Nt(vr,{}),label:l?"View in AR":"Play in VR",mode:a,onEnter:o})})},ah=({active:i,disabled:e,icon:t,label:r,mode:s,onEnter:n})=>lh(oe,{className:"gr-player__button--xr",onClick:e?void 0:()=>n(s),"aria-disabled":e||void 0,"aria-pressed":i||void 0,title:r,children:[Nt("span",{children:r}),t]});import{jsx as xt,jsxs as Ji}from"react/jsx-runtime";var Jn=()=>{let{gracia:i,playlist:e,refs:t,presentation:r,shell:s}=G(),{isBlocking:n}=r,{localFilesEnabled:o,openLocalFile:a,localLabel:l}=s,{hasInteracted:h,resetView:c}=Bi(t.container,e.index,i.camera);return Ji("div",{className:"gr-player__top",children:[Ji("div",{className:"gr-player__top-left",children:[o&&xt(Be,{className:"gr-player__button--local",onClick:a,"aria-label":l,title:l,srLabel:"Open local file",children:xt(Ie,{})}),xt(Ki,{className:"gr-player__xr-actions--desktop"})]}),Ji("div",{className:"gr-player__top-right",children:[xt(Kn,{}),xt(Ki,{className:"gr-player__xr-actions--mobile"}),!n&&h&&xt(oe,{variant:"secondary",className:"gr-player__reset",onClick:c,children:"Reset View"})]})]})};import{jsx as es,jsxs as eo}from"react/jsx-runtime";var Gr=()=>{let{presentation:i}=G(),{isBlocking:e,toast:t}=i;return eo("div",{className:"gr-player__overlay",children:[es(Jn,{}),!e&&eo("div",{className:"gr-player__bottom",children:[t&&es(_i,{message:t.title}),es(Qn,{})]})]})};import{jsx as Ye}from"react/jsx-runtime";var to=({onExit:i})=>Ye(oe,{className:"gr-player__xr-exit",onClick:i,children:"Back to 2D"}),ro=({onExit:i})=>Ye(rt,{icon:Ye(wr,{}),title:"Running in AR",body:"View the scene in AR mode on your device",action:Ye(to,{onExit:i}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),io=({onExit:i})=>Ye(rt,{icon:Ye(vr,{}),title:"Running in VR",body:"Put on your VR-headset and explore the scene",action:Ye(to,{onExit:i}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),ts={ar:ro,vr:io};import{Fragment as hh,jsx as bt,jsxs as ch}from"react/jsx-runtime";var rs=()=>{let{gracia:i,presentation:e,xr:t}=G(),{isBusy:r,isBlocking:s,playerError:n}=e,{retry:o}=e,{activeScreenMode:a,exit:l}=t,h=a?ts[a]:null;return ch(hh,{children:[r&&bt(Mi,{}),s&&n&&bt(Si,{title:n.title,body:n.body,detail:n.cause.message,action:n.recoverable?bt(oe,{className:"gr-player__state-action",onClick:o,children:"Try again"}):void 0}),h&&bt(h,{onExit:l}),!r&&i.isRebuffering&&bt("div",{className:"gr-player__rebuffer-spinner",children:bt("div",{className:"gr-player__spinner"})})]})};import{jsx as Dt,jsxs as fh}from"react/jsx-runtime";var dh=[],Xt=uh(function(e,t){let{controls:r=!0,className:s,style:n,children:o,sources:a=dh,...l}=e,h=so(null),c=so(null),{contextValue:u,gracia:p,playlist:f,openLocalFile:g,toggleFullscreen:d}=Zi({...l,sources:a},{root:h,container:c}),{presentation:m,shell:y}=u,{isBusy:v}=m,{isFullscreen:b}=y;return ph(t,()=>({gracia:p,playlist:f,get cameraControlsType(){return p.camera.controlsType},play:()=>p.playback.play(),pause:()=>p.playback.pause(),seek:x=>p.playback.seek(x),open:x=>p.open(typeof x=="string"?{url:x,label:"Scene"}:x),close:()=>p.close(),next:()=>f.next(),prev:()=>f.prev(),goTo:x=>f.goTo(x),resetCamera:()=>p.camera.reset(),setCameraControls:x=>p.camera.setControls(x),setMode:x=>p.xr.setMode(x),toggleFullscreen:d,openLocalFile:g}),[p,g,f,d]),Dt(Ti,{value:u,children:fh("section",{ref:h,className:K("gr-player",s,{"gr-player--loading":v,"gr-player--ready":p.isContentReady,"gr-player--scenes-single":f.total<=1,"gr-player--scenes-multiple":f.total>1,"gr-player--fullscreen":b,"gr-player--error":m.isBlocking}),style:n,children:[Dt("div",{ref:c,className:"gr-player__canvas"}),Dt("input",{className:"gr-player__file-input",type:"file",...y.fileInputProps}),Dt(rs,{}),r&&Dt(Gr,{}),typeof o=="function"?o({gracia:p,playlist:f}):o]})})});import{createRef as mh}from"react";import{flushSync as gh}from"react-dom";import{createRoot as yh}from"react-dom/client";import{jsx as xh}from"react/jsx-runtime";function no(i,e){let t=mh(),r=yh(i),s=e,n=!0,o=()=>{gh(()=>{r.render(xh(Xt,{...s,ref:t}))})};return o(),{get player(){return t.current},update(a){n&&(s=a,o())},unmount(){n&&(n=!1,t.current?.close(),r.unmount())},async openLocalFile(){await t.current?.openLocalFile()}}}import{Box3 as bh,BufferGeometry as vh,Float32BufferAttribute as wh,Matrix4 as _h,Mesh as Sh,MeshBasicMaterial as Mh,Sphere as Th,Vector2 as Ph,Vector3 as oo}from"three";var zr=class extends Sh{#e;#t=null;#r=new Ph;#i=!1;#s=new _h;enableMesh=!1;constructor(e){let t=new vh;t.setAttribute("position",new wh([0,0,0],3)),super(t,new Mh({colorWrite:!1,depthWrite:!1,transparent:!0})),this.#e=e,this.frustumCulled=!1,this.castShadow=!0,this.renderOrder=1/0,this.onBeforeRender=this.#o,this.onBeforeShadow=this.#n}get player(){return this.#e}async setAudio(e){await this.#e.loadAudio(e)}setAudioListener(e){this.#t=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}dispose(){this.#e.close(),this.#e.dispose(),this.geometry.dispose(),this.material.dispose()}#n=(e,t,r,s)=>{this.enableMesh&&this.#l(e,s)};#o=(e,t,r)=>{e.getDrawingBufferSize(this.#r);let s=this.#r.x,n=this.#r.y;if(s===0||n===0)return;this.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let o=r.matrixWorld.elements;this.#t||this.#e.setAudioListenerMatrix(o),this.#e.setAudioSourceMatrix(this.matrixWorld.elements),this.#e.renderHybridViewport(s,n,{enableMesh:this.enableMesh}),e.resetState(),!this.#i&&this.#e.isReady&&this.#a()};#l(e,t){let r=e.getContext(),s=r.getParameter(r.VIEWPORT),n=s[2],o=s[3];n===0||o===0||(this.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),this.#s.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.#s.multiply(this.matrixWorld),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.depthMask(!0),this.#e.renderMesh(this.#s.elements,s[0],s[1],n,o),e.resetState())}#a(){let e=this.#e.getBBox();if(!e)return;let t=new bh(new oo(e.minX,e.minY,e.minZ),new oo(e.maxX,e.maxY,e.maxZ));this.geometry.boundingBox=t,this.geometry.boundingSphere=new Th,t.getBoundingSphere(this.geometry.boundingSphere),this.frustumCulled=!0,this.#i=!0}};import{ByteType as Ch,DepthTexture as Lh,Object3D as Eh,RenderTarget as Rh,RGBAFormat as Ah,UnsignedIntType as kh,Vector2 as ao}from"three";var lo=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST,Nr=class i{#e;#t;#r;#i=null;root=new Eh;static attach(e,t){return e.assertDevice(t.backend?.device),new i(e,t)}constructor(e,t){this.#e=e;let r=t.backend;e.configureSurface(r.context,{usage:lo});let{x:s,y:n}=t.getDrawingBufferSize(new ao);this.#r=new Lh,this.#r.type=kh;let o=new Rh(s,n);o.depthTexture=this.#r,e.isBGRA&&(o.texture.format=Ah,o.texture.type=Ch,o.texture.internalFormat="bgra8unorm"),this.#t=o}get player(){return this.#e}setAudioListener(e){this.#i=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}render(e,t,r,s){let n=e.getDrawingBufferSize(new ao),o=n.x,a=n.y;if(o===0||a===0)return;let l=this.#t;(l.width!==o||l.height!==a)&&(l.setSize(o,a),this.#e.configureSurface(e.backend.context,{usage:lo})),e.setRenderTarget(l),e.render(t,r),e.setRenderTarget(null);let h=e.backend,c=h.data.get(l.texture)?.texture,u=h.data.get(this.#r)?.texture;if(!c||!u||c.width!==o||c.height!==a)return;this.root.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.root.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let p=r.matrixWorld.elements;this.#i||this.#e.setAudioListenerMatrix(p),this.#e.setAudioSourceMatrix(this.root.matrixWorld.elements),this.#e.renderTextures({color:c,depth:u,w:o,h:a}),s&&(e.autoClearColor=!1,e.autoClearDepth=!0,e.autoClearStencil=!0,e.setRenderTarget(l),e.render(s,r),e.setRenderTarget(null),e.autoClearColor=!0);let f=h.context.getCurrentTexture();f.usage&GPUTextureUsage.COPY_DST&&f.width===o&&f.height===a&&this.#e.copyTexture(c,f,[o,a,1])}setStaticModelMatrix(e){this.#e.setStaticModelMatrix(e)}dispose(){this.#t.dispose(),this.#e.close(),this.#e.dispose()}};export{it as BoundaryRenderer,lt as ClassicControls,ct as DebugRenderer,Pt as ENV_PRESETS,vi as GRACIA_PLAYER_DEFAULT_CSS,et as GraciaApp,Qe as GraciaPlayer,Xt as GraciaReactPlayer,yr as GraciaSplats,xe as Mat4,dt as ModernControls,Yr as POLYGON_MAX_CORNERS,qr as POLYGON_MAX_LAYERS,st as QuadLayer,ye as Quat,Wt as SECTOR_TILT_MAX,Je as SceneManipulator,ft as SceneOverlay,zr as SplatsMesh,Nr as SplatsRendererW3,U as Vec3,yt as XROverlay,mt as XRRayRenderer,k as axis,Ut as bbox,Qt as boundsShape,tt as buildApiSources,ke as envCoefsFromPreset,$r as envCoefsFromSH27,mi as fetchStreamingMetadata,Pr as installGraciaPlayerStyles,ai as isValidBounds,$t as loadGraciaModule,D as mat4,no as mountGraciaPlayer,S as num,ke as presetToLightProbe,$ as quat,jt as sectorApexShift,xr as useGraciaPlayer,br as useGraciaPlaylist,P as vec3};
