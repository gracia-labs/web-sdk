var Ge=Object.freeze,Yt=Ge([0,0,0]),Wl=Ge([1,1,1]),Rr=Ge([1,0,0]),qt=Ge([0,1,0]),Wn=Ge([0,0,1]),qi=Ge([0,0,-1]),Hl=.25,z=Ge({X:Rr,Y:qt,Z:Wn,FORWARD:qi,FLIP_X:Ge([-1,1,1]),FLIP_Z:Ge([1,1,-1])}),S={clamp:(s,e,t)=>Math.min(t,Math.max(e,s)),clampInt:(s,e,t)=>S.clamp(s|0,e,t),clamp01:s=>S.clamp(s,0,1),unlerp01:(s,e,t)=>t===e?0:S.clamp01((s-e)/(t-e)),finite:(s,e=0)=>Number.isFinite(s)?s:e,wrapPi(s){return s>Math.PI?s-2*Math.PI:s<-Math.PI?s+2*Math.PI:s},wrap(s,e){return e>0?(s%e+e)%e:0},wrapDelta(s,e){return e>0?s-e*Math.round(s/e):s},signedClamp(s,e,t){return s===0?0:S.clamp(Math.abs(s),e,t)*Math.sign(s)},zoomStep(s,e=.05,t=10){return s>0?S.signedClamp(Math.log2(s),e,t):0},absLogRatio(s,e){return s>0&&e>0?Math.abs(Math.log(s/e)):0},outside(s,e){return Math.abs(s)>e},perspectiveScale(s,e,t){return 2*s*Math.tan(e*Math.PI/360)/Math.max(1,t)},deadzone(s,e){let t=Math.abs(s);return t<e?0:((t-e)/(1-e))**2*Math.sign(s)},deltaSeconds(s,e,t=0,r=Hl){return e?Math.min((s-e)/1e3,r):t}},Ar={center(s,e){return s[0]=(e.minX+e.maxX)*.5,s[1]=(e.minY+e.maxY)*.5,s[2]=(e.minZ+e.maxZ)*.5,s}},te=class extends Float32Array{constructor(e){super(3),e&&this.from(e)}set(e,t,r){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this)}fromXYZ(e){return this.set(e.x,e.y,e.z)}from(e){return typeof e.x=="number"?this.fromXYZ(e):this.set(e[0],e[1],e[2])}copy(e){return this.set(e[0],e[1],e[2])}add(e){return this[0]+=e[0],this[1]+=e[1],this[2]+=e[2],this}addXYZ(e=0,t=0,r=0){return this[0]+=e,this[1]+=t,this[2]+=r,this}addTo(e,t=Yt){return e[0]=t[0]+this[0],e[1]=t[1]+this[1],e[2]=t[2]+this[2],e}addScaled(e,t){return this[0]+=e[0]*t,this[1]+=e[1]*t,this[2]+=e[2]*t,this}addDelta(e,t){return this[0]+=e[0]-t[0],this[1]+=e[1]-t[1],this[2]+=e[2]-t[2],this}sub(e,t){return t?(this[0]=e[0]-t[0],this[1]=e[1]-t[1],this[2]=e[2]-t[2],this):(this[0]-=e[0],this[1]-=e[1],this[2]-=e[2],this)}subXYZ(e,t){return this.set(e.x-t.x,e.y-t.y,e.z-t.z)}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this}multiply(e){return this[0]*=e[0],this[1]*=e[1],this[2]*=e[2],this}multiplyXYZ(e=1,t=1,r=1){return this[0]*=e,this[1]*=t,this[2]*=r,this}divide(e){return this[0]=e[0]?this[0]/e[0]:0,this[1]=e[1]?this[1]/e[1]:0,this[2]=e[2]?this[2]/e[2]:0,this}clampScalar(e,t){return this[0]=S.clamp(this[0],e,t),this[1]=S.clamp(this[1],e,t),this[2]=S.clamp(this[2],e,t),this}normalize(e=Yt){let t=Math.hypot(this[0],this[1],this[2]);return Number.isFinite(t)&&t>1e-6?this.scale(1/t):this.copy(e)}setLength(e,t=Rr){return this.normalize(t).scale(e)}cross(e,t){let r=e[0],i=e[1],n=e[2],a=t[0],o=t[1],l=t[2];return this[0]=i*l-n*o,this[1]=n*a-r*l,this[2]=r*o-i*a,this}lerp(e,t){return this[0]+=t*(e[0]-this[0]),this[1]+=t*(e[1]-this[1]),this[2]+=t*(e[2]-this[2]),this}midXYZ(e,t){return this.set((e.x+t.x)*.5,(e.y+t.y)*.5,(e.z+t.z)*.5)}fromMat4Column(e,t){let r=t*4;return this.set(e[r],e[r+1],e[r+2])}transformMat4(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i+e[12],this[1]=e[1]*t+e[5]*r+e[9]*i+e[13],this[2]=e[2]*t+e[6]*r+e[10]*i+e[14],this}transformMat4Direction(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i,this[1]=e[1]*t+e[5]*r+e[9]*i,this[2]=e[2]*t+e[6]*r+e[10]*i,this}transformQuat(e){let t=this[0],r=this[1],i=this[2],n=e[0],a=e[1],o=e[2],l=e[3],h=l*t+a*i-o*r,c=l*r+o*t-n*i,u=l*i+n*r-a*t,p=-n*t-a*r-o*i;return this[0]=h*l+p*-n+c*-o-u*-a,this[1]=c*l+p*-a+u*-n-h*-o,this[2]=u*l+p*-o+h*-a-c*-n,this}fromYawPitch(e,t){let r=Math.cos(t);return this.set(r*Math.sin(e),Math.sin(t),-r*Math.cos(e))}yawPitch(e){return this[0]=Math.atan2(e[0],-e[2]),this[1]=Math.asin(S.clamp(e[1],-1,1)),this[2]=0,this}basisFromForward(e,t,r=qt){return this.cross(t,r).normalize(Rr),e.cross(this,t),this}yawPitchBasis(e,t,r,i,n){return r.fromYawPitch(e,t),i.copy(r).scale(-1),this.set(Math.cos(e),0,Math.sin(e)),n.cross(i,this),this}rollBasis(e,t){let r=Math.cos(t),i=Math.sin(t),n=this[0],a=this[1],o=this[2],l=e[0],h=e[1],c=e[2];return this.set(n*r+l*i,a*r+h*i,o*r+c*i),e.set(l*r-n*i,h*r-a*i,c*r-o*i),this}fromSphereDir(e,t){let r=Math.sin(t);return this.set(r*Math.sin(e),Math.cos(t),r*Math.cos(e))}polarY(e,t,r=1e-6){let i=e[0]-t[0],n=e[1]-t[1],a=e[2]-t[2],o=Math.max(r,Math.hypot(i,n,a));return this[0]=Math.atan2(i,a),this[1]=Math.acos(S.clamp(n/o,-1,1)),this[2]=o,this}equals(e,t=1e-6){return Math.abs(this[0]-e[0])<=t&&Math.abs(this[1]-e[1])<=t&&Math.abs(this[2]-e[2])<=t}toArray(){return[this[0],this[1],this[2]]}toXYZ(){return{x:this[0],y:this[1],z:this[2]}}distanceXYZ(e){return Math.hypot(this[0]-e.x,this[1]-e.y,this[2]-e.z)}dot(e){return this[0]*e[0]+this[1]*e[1]+this[2]*e[2]}get sqrLen(){return this[0]*this[0]+this[1]*this[1]+this[2]*this[2]}get len(){return Math.hypot(this[0],this[1],this[2])}get xzLen(){return Math.hypot(this[0],this[2])}get minComponent(){return Math.min(this[0],this[1],this[2])}get maxAbs(){return Math.max(Math.abs(this[0]),Math.abs(this[1]),Math.abs(this[2]))}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}},Ie=class extends Float32Array{constructor(e){super(4),e?this.from(e):this.identity()}set(e,t,r,i){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this[3]=i,this)}fromXYZW(e){return this.set(e.x,e.y,e.z,e.w)}from(e){return typeof e.x=="number"?this.fromXYZW(e):this.set(e[0],e[1],e[2],e[3])}copy(e){return this.set(e[0],e[1],e[2],e[3])}identity(){return this.set(0,0,0,1)}normalize(){let e=Math.hypot(this[0],this[1],this[2],this[3]);return e>1e-6?this.scale(1/e):this.identity()}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this[3]*=e,this}setAxisAngle(e,t){let r=t*.5,i=Math.sin(r);return this.set(e[0]*i,e[1]*i,e[2]*i,Math.cos(r))}rotatePre(e,t){return this.mul(kr.setAxisAngle(e,t),this)}rotate(e,t){return this.mul(kr.setAxisAngle(e,t))}mul(e,t){let r=t?e:this,i=t??e,n=r[0],a=r[1],o=r[2],l=r[3],h=i[0],c=i[1],u=i[2],p=i[3];return this[0]=n*p+l*h+a*u-o*c,this[1]=a*p+l*c+o*h-n*u,this[2]=o*p+l*u+n*c-a*h,this[3]=l*p-n*h-a*c-o*u,this}invert(e=this){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return this.set(-e[0]*r,-e[1]*r,-e[2]*r,e[3]*r)}slerp(e,t){let r=e[0],i=e[1],n=e[2],a=e[3],o=this[0]*r+this[1]*i+this[2]*n+this[3]*a;o<0&&(o=-o,r=-r,i=-i,n=-n,a=-a);let l=1-t,h=t;if(1-o>1e-6){let c=Math.acos(o),u=Math.sin(c);l=Math.sin((1-t)*c)/u,h=Math.sin(t*c)/u}return this.set(l*this[0]+h*r,l*this[1]+h*i,l*this[2]+h*n,l*this[3]+h*a)}toXYZW(){return{x:this[0],y:this[1],z:this[2],w:this[3]}}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}get w(){return this[3]}set w(e){this[3]=e}},Oe=class extends Float32Array{constructor(e){super(16),e?this.copy(e):this.identity()}copy(e){return super.set(e),this}identity(){return this.fill(0),this[0]=this[5]=this[10]=this[15]=1,this}multiply(e,t){return t?Yi(this,e,t):Yi(this,this,e)}preMultiply(e){return Yi(this,e,this)}fromTranslation(e){return this.identity(),this[12]=e[0],this[13]=e[1],this[14]=e[2],this}fromScaling(e){return this.identity(),this[0]=e[0],this[5]=e[1],this[10]=e[2],this}perspective(e,t,r,i){let n=1/Math.tan(e*Math.PI/360);return this.fill(0),this[0]=n/t,this[5]=n,this[10]=(i+r)/(r-i),this[11]=-1,this[14]=2*i*r/(r-i),this}cameraWorld(e,t,r=qt){let i=Te.sub(e,t).normalize(Wn),n=Vn.cross(r,i).normalize(Rr),a=ql.cross(i,n);return this.cameraWorldAxes(e,n,a,i)}cameraWorldAxes(e,t,r,i){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=0,this[4]=r[0],this[5]=r[1],this[6]=r[2],this[7]=0,this[8]=i[0],this[9]=i[1],this[10]=i[2],this[11]=0,this[12]=e[0],this[13]=e[1],this[14]=e[2],this[15]=1,this}fromQuat(e){return this.fromRotationTranslationScale(e,Yt,Wl)}fromTransform(e){let{rotation:t,translation:r,scale:i}=e;return kr.fromXYZW(t).normalize(),this.fromRotationTranslationScale(kr,Te.fromXYZ(r),Vn.set(i.x,i.y,i.z))}fromRotationTranslationScale(e,t,r){let i=e[0],n=e[1],a=e[2],o=e[3],l=i+i,h=n+n,c=a+a,u=i*l,p=i*h,f=i*c,m=n*h,d=n*c,g=a*c,y=o*l,x=o*h,b=o*c,w=r[0],T=r[1],M=r[2];return this[0]=(1-(m+g))*w,this[1]=(p+b)*w,this[2]=(f-x)*w,this[3]=0,this[4]=(p-b)*T,this[5]=(1-(u+g))*T,this[6]=(d+y)*T,this[7]=0,this[8]=(f+x)*M,this[9]=(d-y)*M,this[10]=(1-(u+m))*M,this[11]=0,this[12]=t[0],this[13]=t[1],this[14]=t[2],this[15]=1,this}setPosition(e){return this[12]=e[0],this[13]=e[1],this[14]=e[2],this}translate(e){let t=e[0],r=e[1],i=e[2];return this[12]=this[0]*t+this[4]*r+this[8]*i+this[12],this[13]=this[1]*t+this[5]*r+this[9]*i+this[13],this[14]=this[2]*t+this[6]*r+this[10]*i+this[14],this[15]=this[3]*t+this[7]*r+this[11]*i+this[15],this}scale(e){let t=e[0],r=e[1],i=e[2];for(let n=0;n<4;n++)this[n]*=t,this[n+4]*=r,this[n+8]*=i;return this}fromPivot(e,t,r,i,n){return this.fromTranslation(e).scale(r).translate(i),this.multiply(Zl.fromQuat(t)),this.translate(Te.copy(i).scale(-1)),n?this.multiply(n):this}pointTo(e,t=Yt,r=1){return Hn(e,this,t,r)}poseTo(e){return Yn(e,this)}get determinant3(){return this[0]*(this[5]*this[10]-this[6]*this[9])+this[1]*(this[6]*this[8]-this[4]*this[10])+this[2]*(this[4]*this[9]-this[5]*this[8])}decompose(e,t,r){let i=Math.hypot(this[0],this[1],this[2]),n=Math.hypot(this[4],this[5],this[6]),a=Math.hypot(this[8],this[9],this[10]);this.determinant3<0&&(i=-i),e.set(this[12],this[13],this[14]),r.set(i,n,a);let o=i?1/i:0,l=n?1/n:0,h=a?1/a:0;return Ae[0]=this[0]*o,Ae[1]=this[1]*o,Ae[2]=this[2]*o,Ae[3]=this[4]*l,Ae[4]=this[5]*l,Ae[5]=this[6]*l,Ae[6]=this[8]*h,Ae[7]=this[9]*h,Ae[8]=this[10]*h,Yl(t,Ae),this}};function Yl(s,e){let t=e[0]+e[4]+e[8];if(t>0){let o=Math.sqrt(t+1),l=.5*o;return o=.5/o,s.set((e[5]-e[7])*o,(e[6]-e[2])*o,(e[1]-e[3])*o,l)}let r=0;e[4]>e[0]&&(r=1),e[8]>e[r*3+r]&&(r=2);let i=(r+1)%3,n=(r+2)%3,a=Math.sqrt(e[r*3+r]-e[i*3+i]-e[n*3+n]+1);return s[r]=.5*a,a=.5/a,s[3]=(e[i*3+n]-e[n*3+i])*a,s[i]=(e[i*3+r]+e[r*3+i])*a,s[n]=(e[n*3+r]+e[r*3+n])*a,s}var Te=new te,Vn=new te,ql=new te,kr=new Ie,Zl=new Oe,Ae=new Float32Array(9);function Yi(s,e,t){let r=e[0],i=e[1],n=e[2],a=e[3],o=e[4],l=e[5],h=e[6],c=e[7],u=e[8],p=e[9],f=e[10],m=e[11],d=e[12],g=e[13],y=e[14],x=e[15],b=t[0],w=t[1],T=t[2],M=t[3];return s[0]=b*r+w*o+T*u+M*d,s[1]=b*i+w*l+T*p+M*g,s[2]=b*n+w*h+T*f+M*y,s[3]=b*a+w*c+T*m+M*x,b=t[4],w=t[5],T=t[6],M=t[7],s[4]=b*r+w*o+T*u+M*d,s[5]=b*i+w*l+T*p+M*g,s[6]=b*n+w*h+T*f+M*y,s[7]=b*a+w*c+T*m+M*x,b=t[8],w=t[9],T=t[10],M=t[11],s[8]=b*r+w*o+T*u+M*d,s[9]=b*i+w*l+T*p+M*g,s[10]=b*n+w*h+T*f+M*y,s[11]=b*a+w*c+T*m+M*x,b=t[12],w=t[13],T=t[14],M=t[15],s[12]=b*r+w*o+T*u+M*d,s[13]=b*i+w*l+T*p+M*g,s[14]=b*n+w*h+T*f+M*y,s[15]=b*a+w*c+T*m+M*x,s}function Hn(s,e,t=Yt,r=1){let i=t[0]??0,n=t[1]??0,a=t[2]??0;return s[0]=e[0]*i+e[4]*n+e[8]*a+e[12],s[1]=e[1]*i+e[5]*n+e[9]*a+e[13],s[2]=e[2]*i+e[6]*n+e[10]*a+e[14],r!==1&&(s[0]*=r,s[1]*=r,s[2]*=r),s}function Un(s,e,t,r){let i=t[0],n=t[1],a=t[2];s[0]=e[0]*i+e[4]*n+e[8]*a,s[1]=e[1]*i+e[5]*n+e[9]*a,s[2]=e[2]*i+e[6]*n+e[10]*a;let o=Math.hypot(s[0],s[1],s[2]);if(Number.isFinite(o)&&o>1e-6){let l=1/o;s[0]*=l,s[1]*=l,s[2]*=l}else s[0]=r[0],s[1]=r[1],s[2]=r[2];return s}function Yn(s,e){return s[0]=e[12],s[1]=e[13],s[2]=e[14],Un(Te,e,qi,qi),s[3]=Te[0],s[4]=Te[1],s[5]=Te[2],Un(Te,e,qt,qt),s[6]=Te[0],s[7]=Te[1],s[8]=Te[2],s}var L={create:()=>new te},de={create:()=>new Ie},Z={create:()=>new Oe,clone:s=>new Oe(s),pointTo:Hn,poseTo:Yn};var Ir=75,Qi=64,ji=8,Qt=1e-6,Me=64,qn=16,Zn=24,$n=.9,Zt=.001,Qn=8,$l=new Float64Array(3),$t=s=>typeof s=="number"&&Number.isFinite(s),Ql=s=>!!s&&$t(s.x)&&$t(s.y)&&$t(s.z),Ki=s=>S.clamp(Math.abs(s??90),1,360)*Math.PI/360,jn=s=>s>=Math.PI-Qt,Kn=(s,e)=>Array.from({length:Me+1},(t,r)=>{let i=-e+r/Me*2*e;return[Math.sin(i)*s,Math.cos(i)*s]});function Br(s,e){if(jn(Ki(s.angleDeg)))return 0;let t=Math.min(e[0],e[2]),r=S.clamp(s.tiltDeg??0,-Ir,Ir)*Math.PI/180;return S.clamp(2*e[1]*Math.tan(r),-$n*t,$n*t)}function Jn(s){switch(s?.type){case"box":case"sphere":return!0;case"sector":return(s.angleDeg==null||$t(s.angleDeg))&&(s.tiltDeg==null||$t(s.tiltDeg));case"polygon":return!!eo(s);default:return!1}}function Dr(s,e){let t=[e[0],e[1],e[2]];switch(s.type){case"sphere":return lc(t);case"sector":return Br(s,t)?oc(s,t):nc(s,t);case"polygon":return ac(s,t);default:return sc(t)}}function jl(s,e){let t=Math.abs(s[0])-e[0],r=Math.abs(s[2])-e[2];return Math.hypot(Math.max(t,0),Math.max(r,0))+Math.min(Math.max(t,r),0)}function Kl(s,e){let t=Math.hypot(s[0]/e[0],s[1]/e[1],s[2]/e[2]);if(t===0)return-Math.min(e[0],e[1],e[2]);let r=Math.hypot(s[0]/(e[0]*e[0]),s[1]/(e[1]*e[1]),s[2]/(e[2]*e[2]));return t*(t-1)/r}function Jl(s,e,t){let r=Math.abs(e)-t;return Math.min(Math.max(s,r),0)+Math.hypot(Math.max(s,0),Math.max(r,0))}function Zi(s){let e=s.length/2,t=0;for(let r=0;r<e;r++){let i=(r+1)%e*2;t+=s[r*2]*s[i+1]-s[i]*s[r*2+1]}return t/2}var Ye=(s,e,t,r,i,n)=>(t-s)*(n-e)-(r-e)*(i-s);function pt(s,e,t,r,i,n){let a=i-t,o=n-r,l=S.clamp01(((s-t)*a+(e-r)*o)/(a*a+o*o));return Math.hypot(s-t-a*l,e-r-o*l)}function ec(s,e,t){let r=s.length/2,i=e*2,n=(e+1)%r*2,a=t*2,o=(t+1)%r*2,l=Ye(s[a],s[a+1],s[o],s[o+1],s[i],s[i+1]),h=Ye(s[a],s[a+1],s[o],s[o+1],s[n],s[n+1]),c=Ye(s[i],s[i+1],s[n],s[n+1],s[a],s[a+1]),u=Ye(s[i],s[i+1],s[n],s[n+1],s[o],s[o+1]);return l*h<0&&c*u<0?0:Math.min(pt(s[i],s[i+1],s[a],s[a+1],s[o],s[o+1]),pt(s[n],s[n+1],s[a],s[a+1],s[o],s[o+1]),pt(s[a],s[a+1],s[i],s[i+1],s[n],s[n+1]),pt(s[o],s[o+1],s[i],s[i+1],s[n],s[n+1]))}function tc(s){let e=s.length/2;for(let t=0;t<e;t++){let r=(t+e-1)%e*2,i=t*2,n=(t+1)%e*2;if(Math.hypot(s[n]-s[i],s[n+1]-s[i+1])<Zt||pt(s[n],s[n+1],s[r],s[r+1],s[i],s[i+1])<Zt||pt(s[r],s[r+1],s[i],s[i+1],s[n],s[n+1])<Zt)return!1}for(let t=0;t<e;t++)for(let r=t+2;r<e;r++)if(!(t===0&&r===e-1)&&ec(s,t,r)<Zt)return!1;return!0}function rc(s,e,t,r){for(let i=0;i<e.length;i++)s[i]=e[i]+(t[i]-e[i])*r;return s}function eo(s){let{layers:e}=s;if(!Array.isArray(e)||e.length<2||e.length>ji)return null;let t=Array.isArray(e[0])?e[0].length:0;if(t<3||t>Qi||!e.every(o=>Array.isArray(o)&&o.length===t&&o.every(Ql)))return null;let r=e.map(o=>Float64Array.from(o.flatMap(l=>[l.x,l.y,l.z])));for(let o=1;o<r.length;o++)for(let l=0;l<t;l++)if(r[o][l*3+1]-r[o-1][l*3+1]<Zt)return null;let i=r.map(Or),n=Math.sign(Zi(i[0])),a=new Float64Array(t*2);for(let o=0;o<i.length-1;o++)for(let l=o?1:0;l<=Qn;l++){rc(a,i[o],i[o+1],l/Qn);let h=Zi(a);if(Math.abs(h)<Qt||Math.sign(h)!==n||!tc(a))return null}return n>0?r:r.map(ic)}function Or(s){let e=s.length/3,t=new Float64Array(e*2);for(let r=0;r<e;r++)t[r*2]=s[r*3],t[r*2+1]=s[r*3+2];return t}function ic(s){let e=s.length/3,t=new Float64Array(s.length);for(let r=0;r<e;r++)t.set(s.subarray((e-1-r)*3,(e-r)*3),r*3);return t}function $i(s){let e=s.length/2,t=Math.sign(Zi(s))||1,r=Array.from({length:e},(l,h)=>h),i=[],n=l=>s[l*2],a=l=>s[l*2+1],o=(l,h,c)=>{if(Ye(n(l),a(l),n(h),a(h),n(c),a(c))*t<=Qt*Qt)return!1;for(let u of r){if(u===l||u===h||u===c)continue;let p=Ye(n(l),a(l),n(h),a(h),n(u),a(u))*t,f=Ye(n(h),a(h),n(c),a(c),n(u),a(u))*t,m=Ye(n(c),a(c),n(l),a(l),n(u),a(u))*t;if(p>=0&&f>=0&&m>=0)return!1}return!0};for(;r.length>3;){let l=r.length,h=!1;for(let c=0;c<l;c++){let u=r[(c+l-1)%l],p=r[c],f=r[(c+1)%l];if(o(u,p,f)){i.push(u,p,f),r.splice(c,1),h=!0;break}}if(!h)break}return r.length===3&&i.push(r[0],r[1],r[2]),i}function sc(s){let e=new Float32Array([-s[0],-s[2],s[0],-s[2],s[0],s[2],-s[0],s[2]]);return to(t=>jl(t,s),e,[0,1,2,3],s[1])}function nc(s,e){let t=Math.min(e[0],e[2]),r=Ki(s.angleDeg),i=jn(r),n=Math.sin(r),a=Math.cos(r),o=h=>{let c=Math.hypot(h[0],h[2])-t;if(i)return c;let u=Math.abs(h[0]),p=S.clamp(u*n+h[2]*a,0,t),f=Math.hypot(u-n*p,h[2]-a*p);return Math.max(c,f*Math.sign(a*u-n*h[2]))},l=i?rs(t,t):Float32Array.from([0,0,...Kn(t,r).flat()]);return to(o,l,i?[]:[0,1,Me+1],e[1])}function oc(s,e){let t=e[1],r=Math.min(e[0],e[2]),i=Ki(s.angleDeg),n=Br(s,e),a=Kn(r,i),o=(h,c)=>{let u=-t+2*t*h,p=n*h,f=[0,u,p],m=([d,g],y)=>f.push(d*y,u,p+(g-p)*y);for(let d=1;d<c;d++)m(a[0],d/c);for(let[d,g]of a)f.push(d,u,g);for(let d=c-1;d>0;d--)m(a[Me],d/c);return Float64Array.from(f)},l=[o(0,1),o(1,1)];return ro([o(0,qn),o(1,qn)],l,()=>ts(l,[0,1,Me+1]))}function ac(s,e){let t=eo(s).map(r=>r.map((i,n)=>i*2*e[n%3]));return ro(t,[t[0],t[t.length-1]],()=>ts(t))}function to(s,e,t,r){let i=[Fr(e,-r),Fr(e,r)];return Ji(n=>Jl(s(n),n[1],r),i,()=>es(i,i,!0),()=>ts(i,t))}function ro(s,e,t){let r=cc(s,e);return Ji(i=>hc(i,r),e.map(i=>Float32Array.from(i)),()=>es(s,e,!0),t)}function lc(s){return Ji(e=>Kl(e,s),[Fr(rs(s[0],s[2]),-s[1])],()=>dc(s),()=>fc(s))}function Ji(s,e,t,r){let i=null,n=null;return{signedDistance:s,outlines:e,get mesh(){return i??=t()},get lines(){return n??=r()}}}function cc(s,[e,t]){let r=s[0].length/3,i=(h,c)=>h.subarray(c*3,c*3+3),n=[],a=(h,c,u)=>n.push(...h,...c,...u);for(let h=0;h<s.length-1;h++)for(let c=0;c<r;c++){let u=(c+1)%r;a(i(s[h],c),i(s[h+1],c),i(s[h+1],u)),a(i(s[h],c),i(s[h+1],u),i(s[h],u))}let o=$i(Or(t));for(let h=0;h<o.length;h+=3)a(i(t,o[h]),i(t,o[h+2]),i(t,o[h+1]));let l=$i(Or(e));for(let h=0;h<l.length;h+=3)a(i(e,l[h]),i(e,l[h+1]),i(e,l[h+2]));return Float64Array.from(n)}function hc(s,e){let t=0,r=Number.POSITIVE_INFINITY;for(let i=0;i<e.length;i+=9)t+=pc(s,e,i),r=Math.min(r,uc(s,e,i,$l));return Math.abs(t)>2*Math.PI?-r:r}function rt(s,e,t,r,i){for(let n=0;n<3;n++)s[n]=e[t+n]+(e[t+3+n]-e[t+n])*r+(e[t+6+n]-e[t+n])*i}function uc(s,e,t,r){let i=e[t+3]-e[t],n=e[t+4]-e[t+1],a=e[t+5]-e[t+2],o=e[t+6]-e[t],l=e[t+7]-e[t+1],h=e[t+8]-e[t+2],c=i*(s[0]-e[t])+n*(s[1]-e[t+1])+a*(s[2]-e[t+2]),u=o*(s[0]-e[t])+l*(s[1]-e[t+1])+h*(s[2]-e[t+2]),p=i*(s[0]-e[t+3])+n*(s[1]-e[t+4])+a*(s[2]-e[t+5]),f=o*(s[0]-e[t+3])+l*(s[1]-e[t+4])+h*(s[2]-e[t+5]),m=i*(s[0]-e[t+6])+n*(s[1]-e[t+7])+a*(s[2]-e[t+8]),d=o*(s[0]-e[t+6])+l*(s[1]-e[t+7])+h*(s[2]-e[t+8]),g=p*d-m*f,y=m*u-c*d,x=c*f-p*u;if(c<=0&&u<=0)rt(r,e,t,0,0);else if(p>=0&&f<=p)rt(r,e,t,1,0);else if(x<=0&&c>=0&&p<=0)rt(r,e,t,c/(c-p),0);else if(d>=0&&m<=d)rt(r,e,t,0,1);else if(y<=0&&u>=0&&d<=0)rt(r,e,t,0,u/(u-d));else if(g<=0&&f-p>=0&&m-d>=0){let b=(f-p)/(f-p+(m-d));rt(r,e,t,1-b,b)}else{let b=1/(g+y+x);rt(r,e,t,y*b,x*b)}return Math.hypot(s[0]-r[0],s[1]-r[1],s[2]-r[2])}function pc(s,e,t){let r=e[t]-s[0],i=e[t+1]-s[1],n=e[t+2]-s[2],a=e[t+3]-s[0],o=e[t+4]-s[1],l=e[t+5]-s[2],h=e[t+6]-s[0],c=e[t+7]-s[1],u=e[t+8]-s[2],p=Math.sqrt(r*r+i*i+n*n),f=Math.sqrt(a*a+o*o+l*l),m=Math.sqrt(h*h+c*c+u*u),d=r*(o*u-l*c)-i*(a*u-l*h)+n*(a*c-o*h),g=r*a+i*o+n*l,y=a*h+o*c+l*u,x=h*r+c*i+u*n;return 2*Math.atan2(d,p*f*m+g*m+y*p+x*f)}function es(s,e,t){let r=s[0].length/3,i=[],n=[],a=[],o=Number.POSITIVE_INFINITY;for(let d of s)for(let g=1;g<d.length;g+=3)o=Math.min(o,d[g]);let l=(d,g)=>{let y=g*3,x=(g+1)%r*3;return Math.hypot(d[x]-d[y],d[x+1]-d[y+1],d[x+2]-d[y+2])},h=d=>{let g=0;for(let y=0;y<r;y++)g+=l(d,y);return g},c=s.reduce((d,g)=>h(g)>h(d)?g:d),u=new Float64Array(r*2),p=[0];for(let d=0;d<r;d++){let g=d*3,y=(d+1)%r*3,x=0,b=0,w=0;for(let D of s)x+=D[y]-D[g],b+=D[y+2]-D[g+2],w=Math.max(w,l(D,d));let T=Math.hypot(x,b);T>Qt&&(u[d*2]=x/T,u[d*2+1]=b/T);let M=(c[y]-c[g])*u[d*2]+(c[y+2]-c[g+2])*u[d*2+1];p.push(p[d]+(t?M:w))}let f=(d,g,y,x,b)=>{let w=g%r*3,T=y*3,M=t?p[y]+(d[w]-c[T])*u[y*2]+(d[w+2]-c[T+2])*u[y*2+1]:p[y+x];i.push(d[w],d[w+1],d[w+2]),n.push(M*b,d[w+1]-o,b)};for(let d=0;d<s.length-1;d++)for(let g=0;g<r;g++){let y=i.length/3,x=t?1:l(s[d],g),b=t?1:l(s[d+1],g);f(s[d],g,g,0,x),f(s[d],g+1,g,1,x),f(s[d+1],g+1,g,1,b),f(s[d+1],g,g,0,b),a.push(y,y+1,y+2,y,y+2,y+3)}let m=a.length;for(let d of[...e].reverse()){let g=i.length/3;for(let y=0;y<d.length;y+=3)i.push(d[y],d[y+1],d[y+2]),n.push(0,d[y+1]-o,1);for(let y of $i(Or(d)))a.push(g+y)}return{positions:new Float32Array(i),grid:new Float32Array(n),indices:new Uint32Array(a),capStart:m}}function Fr(s,e){let t=s.length/2,r=new Float32Array(t*3);for(let i=0;i<t;i++)r.set([s[i*2],e,s[i*2+1]],i*3);return r}function ts(s,e=Array.from({length:s[0].length/3},(t,r)=>r)){let t=s[0].length/3,r=[],i=(n,a)=>r.push(n[a*3],n[a*3+1],n[a*3+2]);for(let n of s)for(let a=0;a<t;a++)i(n,a),i(n,(a+1)%t);for(let n=0;n<s.length-1;n++)for(let a of e)i(s[n],a),i(s[n+1],a);return new Float32Array(r)}function rs(s,e){let t=new Float32Array(Me*2);for(let r=0;r<Me;r++){let i=r/Me*2*Math.PI;t[r*2]=Math.sin(i)*s,t[r*2+1]=Math.cos(i)*e}return t}function dc(s){let e=[];for(let t=0;t<=Zn;t++){let r=-Math.PI/2+t/Zn*Math.PI,i=Math.cos(r);e.push(Fr(rs(s[0]*i,s[2]*i),s[1]*Math.sin(r)))}return es(e,[],!1)}function fc(s){let e=[],t=r=>{for(let i=0;i<Me;i++)e.push(...r(i/Me*2*Math.PI),...r((i+1)/Me*2*Math.PI))};return t(r=>[Math.cos(r)*s[0],Math.sin(r)*s[1],0]),t(r=>[Math.cos(r)*s[0],0,Math.sin(r)*s[2]]),t(r=>[0,Math.cos(r)*s[1],Math.sin(r)*s[2]]),new Float32Array(e)}var mc=.28209479177387814;function io(s,e=.5){let t=1/(mc*Math.max(s[0],s[1],s[2],.01));for(let r=0;r<3;r++)s[r]*=t;for(let r=3;r<12;r++)s[r]*=t*e}function is(s,e=null,t=.5){let r=new Float32Array(12);for(let i=0;i<12;i++)r[i]=s[i];if(e){let i=e[0]??e.x,n=e[1]??e.y,a=e[2]??e.z;if(r[9]*i+r[3]*n+r[6]*a>0)for(let o=3;o<12;o++)r[o]*=-1}return io(r,t),r}function qe(s){let e=new Float32Array(12);return e.set(s.ambient,0),e.set(s.topDown,3),s.frontBack&&e.set(s.frontBack,6),s.leftRight&&e.set(s.leftRight,9),e}async function Gr(s="@gracia/web-sdk/wasm"){for(let e=0;;e++)try{let t=await import(s);return t.default??t}catch{await new Promise(r=>setTimeout(r,1e3))}}var zr=class{#e;#r=0;constructor(e,t=512){this.#e=e,this.#r=e._malloc(t)}ptr(e=0){return this.#r+e}get f32(){return this.#e.HEAPF32}writeF32(e,t=0){this.#e.HEAPF32.set(e,this.#r+t>>2)}readF32(e,t=0){let r=this.#r+t;return new Float32Array(this.#e.HEAPF32.buffer,r,e)}free(){this.#r&&(this.#e._free(this.#r),this.#r=0)}};function ss(s,e,...t){if(!e)return;let r=new TextEncoder,i=[],n=t.map(o=>{if(typeof o!="string")return o;let l=r.encode(o),h=s._malloc(l.length+1);return s.HEAPU8.set(l,h),s.HEAPU8[h+l.length]=0,i.push(h),h}),a=e(...n);for(let o of i)s._free(o);return a}var I=(s,e)=>s[`_Gracia_${e}`];async function gc(s){let e=await navigator.gpu.requestAdapter({powerPreference:"high-performance",xrCompatible:s});if(!e)throw new Error("WebGPU adapter not available");return await e.requestDevice({requiredLimits:{maxStorageBuffersPerShaderStage:10,maxComputeWorkgroupSizeX:256,maxBufferSize:e.limits.maxBufferSize,maxStorageBufferBindingSize:e.limits.maxStorageBufferBindingSize}})}var Nr=class s{#e;#r;#t=null;#i=0;constructor(e){this.#e=e,this.#r=new zr(e)}static async boot(e,t,{maxSplatsCount:r=0,xrCompatible:i=!1}={}){let n=typeof e=="function"?await e({canvas:t}):e,a=await gc(i);if(typeof e=="function"&&(n.preinitializedWebGPUDevice=a,n.WebGPU?.importJsDevice?.(a)),I(n,"Init")?.(r|0),!I(n,"Initialized")?.())throw new Error("Gracia init failed");return{module:new s(n),device:a}}get heap(){return this.#r}get backend(){return this.#t}get buildUnixTime(){return I(this.#e,"GetBuildTime")?.()??0}shutdownApp(){I(this.#e,"Shutdown")?.()}setCamera(e,t,r,i){let n=!!(r&&i),a=this.#r.ptr(),o=a>>2,l=this.#r.f32;l.set(e,o),n&&l.set(r,o+16),l.set(t,o+32),n&&l.set(i,o+48),I(this.#e,"SetCamera")?.(n,a)}getModelMatrix(){let e=I(this.#e,"GetModelMatrix");if(!e)return null;let t=this.#r.ptr(256);return e(t),this.#r.readF32(16,256)}setModelMatrix(e){let t=I(this.#e,"SetModelMatrix");t&&(this.#r.writeF32(e,256),t(this.#r.ptr(256)))}initPure(e){this.shutdownBackend(),this.#t="pure",I(this.#e,"P_Init")?.(e?1:0)}pureRenderTo(e,t,r,i){return I(this.#e,"P_RenderTo")?.(this.#s(e),this.#s(t),r,i)!==0}pureRenderXR(e,t,r){let i=e[0].sub,n=r?i.motionVectorTexture:null,a=r?i.depthStencilTexture:null;return this.#r.writeF32(e.flatMap(({sub:o})=>{let l=o.viewport;return[o.getViewDescriptor().baseArrayLayer,l.x,l.y,l.width,l.height]})),I(this.#e,"P_RenderXR")?.(this.#s(i.colorTexture),this.#s(n),this.#s(a),this.#r.ptr(),e.length,t)===1}#s(e){return e?this.#e.WebGPU.importJsTexture(e):0}initHybrid(e){this.shutdownBackend(),this.registerGL(e),this.#t="hybrid",I(this.#e,"H_Init")?.()}hybridFrame(e,t,r){I(this.#e,"H_Frame")?.(e,t,r)}hybridPreprocess(e,t){return I(this.#e,"H_Preprocess")?.(e,t)??0}hybridRender(e,t,r,i,n,a){I(this.#e,"H_Render")?.(e,t,r,i,n,a)}hybridRenderMesh(e,t,r,i,n){this.#r.writeF32(e),I(this.#e,"H_RenderMeshMVP")?.(this.#r.ptr(),t,r,i,n)}hybridRenderMotionMV(e,t,r,i){I(this.#e,"H_RenderMotionMV")?.(e,t,r,i)}hybridCanMotion(){return!!I(this.#e,"H_CanMotion")?.()}hybridHasMultiview(){return!!I(this.#e,"H_HasMultiview")?.()}hybridReset(){I(this.#e,"H_Reset")?.()}registerGL(e){this.#i&&this.#e.GL?.deleteContext(this.#i);let t=this.#e.GL;if(!t)throw new Error("WASM GL layer not available");this.#i=t.registerContext(e,{majorVersion:2,minorVersion:0,enableExtensionsByDefault:!0}),t.makeContextCurrent(this.#i)}shutdownBackend(){this.#t==="pure"?I(this.#e,"P_Shutdown")?.():this.#t==="hybrid"&&I(this.#e,"H_Shutdown")?.(),this.#i&&(this.#e.GL?.deleteContext(this.#i),this.#i=0),this.#t=null}dispose(){this.shutdownBackend(),this.#r.free(),this.shutdownApp()}addDynamicScene(){return I(this.#e,"AddScene")?.()??0}addStaticScene(){return I(this.#e,"AddStaticScene")?.()??0}removeScene(e){I(this.#e,"RemoveScene")?.(e)}sceneReady(e){return e?(I(this.#e,"SceneReady")?.(e)??0)!==0:!1}sceneProgress(e){return e?I(this.#e,"SceneProgress")?.(e)??0:0}sceneDuration(e){return e?I(this.#e,"SceneDuration")?.(e)??0:0}sceneIsBuffering(e){return e?(I(this.#e,"SceneIsBuffering")?.(e)??0)!==0:!1}sceneLastFetchStatus(e){return e?I(this.#e,"SceneGetLastFetchStatus")?.(e)??0:0}sceneSetTime(e,t){I(this.#e,"SceneSetTime")?.(e,t)}sceneSetPlaybackRange(e,t,r){I(this.#e,"SceneSetPlaybackRange")?.(e,t,r)}sceneSetVisible(e,t){I(this.#e,"SceneSetVisible")?.(e,t)}sceneGetBBox(e){let t=I(this.#e,"SceneGetBBox");if(!t||!e)return null;let r=this.#r.ptr(256);t(e,r);let i=r>>2,n=this.#r.f32;return n[i]===0&&n[i+1]===0&&n[i+2]===0&&n[i+3]===0&&n[i+4]===0&&n[i+5]===0?null:{minX:n[i],minY:n[i+1],minZ:n[i+2],maxX:n[i+3],maxY:n[i+4],maxZ:n[i+5]}}sceneSetEnvLighting(e,t,r){let i=I(this.#e,"SceneSetEnvPreset");if(!i||!e)return;let n=this.#r.ptr(128),a=n>>2,o=this.#r.f32;for(let l=0;l<4;l++)o[a+l*4]=t[l*3],o[a+l*4+1]=t[l*3+1],o[a+l*4+2]=t[l*3+2],o[a+l*4+3]=0;o[a+3]=r,i(e,n)}sceneClearEnvLighting(e){I(this.#e,"SceneClearEnvPreset")?.(e)}sceneSetModelMatrix(e,t){let r=I(this.#e,"SceneSetModelMatrix");!r||!e||(this.#r.writeF32(t,256),r(e,this.#r.ptr(256)))}sceneOpen(e,t){ss(this.#e,I(this.#e,"SceneOpen"),e,t)}sceneOpenApi(e,t,r){ss(this.#e,I(this.#e,"SceneOpenApi"),e,t,r)}registerLocalFile(e){let t=this.#e.graciaRegisterLocalFile;if(!t)throw new Error("WASM local-file bridge unavailable");return t(e)}sceneOpenLocal(e,t){I(this.#e,"SceneOpenLocal")?.(e,t)}sceneOpenStatic(e,t){let r=I(this.#e,"SceneOpenStatic");if(!r)return-1;let i=this.#e._malloc(t.length);this.#e.HEAPU8.set(t,i);try{return r(e,i,t.length)}finally{this.#e._free(i)}}};var yc={panningModel:"HRTF",distanceModel:"inverse",refDistance:1,maxDistance:100,rolloffFactor:1},bc=[0,0,0],xc=[0,0,0,0,0,-1,0,1,0],vc=.1,wc=40,so=.01,no=.08,_c=1.5,oo=.05,Sc=2e3;function ao(){typeof navigator<"u"&&navigator.audioSession&&(navigator.audioSession.type="playback")}function lo(){return typeof performance<"u"?performance.now():Date.now()}function xe(s,e,t,r=0){r>0?s.linearRampToValueAtTime(e,t.currentTime+r):s.setValueAtTime(e,t.currentTime)}function Tc(s,e,t){s.setTargetAtTime(e,t.currentTime,.01)}function Xr(s){try{s.disconnect()}catch{}}function ve(s,e){return Math.abs(s-e)<1e-4}function be(s){try{s.automationRate="k-rate"}catch{}}function ns(s){s.positionX&&(be(s.positionX),be(s.positionY),be(s.positionZ),"orientationX"in s?(be(s.orientationX),be(s.orientationY),be(s.orientationZ)):(be(s.forwardX),be(s.forwardY),be(s.forwardZ),be(s.upX),be(s.upY),be(s.upZ)))}function co(s,e,t,r,i,n=0){xe(s.positionX,e,i,n),xe(s.positionY,t,i,n),xe(s.positionZ,r,i,n)}function Mc(s,e,t,r,i,n,a,o,l=0){if("orientationX"in s){xe(s.orientationX,e,o,l),xe(s.orientationY,t,o,l),xe(s.orientationZ,r,o,l);return}xe(s.forwardX,e,o,l),xe(s.forwardY,t,o,l),xe(s.forwardZ,r,o,l),xe(s.upX,i,o,l),xe(s.upY,n,o,l),xe(s.upZ,a,o,l)}var os=class{#e=null;#r=null;#t=[0,0,0];#i=[0,0,-1,0,1,0];#s=!1;#n=new Float32Array(9);#o=!1;constructor(){ao(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&this.#e&&this.#e.state!=="running"&&this.resume()})}get ctx(){return this.#e}get destination(){return this.#r??this.#e?.destination??null}setOutput(e){e?.context&&e.context!==this.#e&&(this.#e=e.context,ns(this.#e.listener),this.#o=!1),this.#r=e?.destination??null,this.#s=e?.externalListener===!0,this.#a()}prepare(){let e=this.#c();if(!e)throw new Error("Web Audio is not supported in this browser");return{ctx:e,destination:this.destination??e.destination}}resume(){ao();let e=this.#c();return e?e.state==="running"?Promise.resolve():e.resume().catch(()=>{}):Promise.resolve()}listener(e,t,r,i,n,a,o,l,h,c=0){this.#t=[e,t,r],this.#i=[i,n,a,o,l,h],this.#a(c)}resetListener(){this.listener(...xc)}#c(){if(this.#e)return this.#e;if(typeof AudioContext>"u")return null;try{this.#e=new AudioContext}catch{return null}return ns(this.#e.listener),this.#o=!1,this.#a(),this.#e}#a(e=0){let t=this.#e?.listener;if(!t||this.#s)return;let[r,i,n]=this.#t,[a,o,l,h,c,u]=this.#i,p=this.#n;this.#o&&ve(r,p[0])&&ve(i,p[1])&&ve(n,p[2])&&ve(a,p[3])&&ve(o,p[4])&&ve(l,p[5])&&ve(h,p[6])&&ve(c,p[7])&&ve(u,p[8])||(p.set([r,i,n,a,o,l,h,c,u]),this.#o=!0,co(t,r,i,n,this.#e,e),Mc(t,a,o,l,h,c,u,this.#e,e))}},Fe=new os,as=class{#e;#r;#t;#i;#s;#n;ready;#o=null;#c=[];#a=null;#h=!1;#l=!1;#p=!1;#d=!1;#u=!1;#f=0;#m=0;#g=0;#y=NaN;#v=NaN;#_=NaN;constructor(e,t={}){let{ctx:r,destination:i}=Fe.prepare();this.#e=r,this.#n=t.destination??i;let n=new Audio;this.#r=n,n.crossOrigin="anonymous",n.preload="auto",n.loop=!0,n.preservesPitch=!1,this.#i=r.createGain(),this.#s=r.createPanner(),ns(this.#s),this.pannerAttr({...yc,...t.pannerAttr}),this.#t=r.createMediaElementSource(n),this.#t.connect(this.#s),this.#s.connect(this.#i),this.#i.connect(this.#n),this.volume(t.volume??1).rate(t.rate??1).pos(...t.pos??bc),this.ready=new Promise(a=>{this.#o=a}),this.#M("loadedmetadata",()=>this.#C()),this.#M("canplay",()=>this.#b()),this.#M("loadeddata",()=>this.#b()),this.#M("error",()=>this.#E(`Media error ${n.error?.code??"unknown"}`)),n.src=e,n.load(),this.#b()}get context(){return this.#e}get blocked(){return this.#p}get failed(){return this.#h}get buffering(){return this.#P||this.#w&&this.#g>0}get clockRate(){return!this.#w||Math.abs(this.#m)<so?1:1+S.clamp(_c*this.#m,-oo,oo)}get#w(){return!this.#h&&!this.#p&&!this.#l}get#P(){return this.#w&&(!this.#d||this.#u||this.#r.paused||this.#r.readyState<3||this.#r.seeking||this.#a!==null)}#M(e,t){this.#c.push([e,t]),this.#r.addEventListener(e,t)}#b(){this.#r.readyState<3||this.#l||this.#S()}#S(){this.#o?.(),this.#o=null}#E(e){this.#l||this.#h||(this.#h=!0,this.pause(),this.#S())}allowPlayback(){this.#p=!1}play(){if(this.#h||this.#p||this.#l||this.#u||this.#d&&!this.#r.paused)return;let e=++this.#f;this.#u=!0;try{Promise.resolve(this.#r.play()).then(()=>{e!==this.#f||this.#l||(this.#u=!1,this.#d=!0)}).catch(t=>this.#R(e,t))}catch(t){this.#R(e,t)}}#R(e,t){e!==this.#f||this.#l||(this.#u=!1,this.#d=!1,t?.name==="NotAllowedError"?(this.#p=!0,this.#r.pause()):t?.name!=="AbortError"&&this.#E(t))}pause(){this.#f++,this.#u=!1,this.#d=!1,this.#x(),this.#r.paused||this.#r.pause()}unload(){this.pause(),this.#l=!0;for(let[e,t]of this.#c)this.#r.removeEventListener(e,t);this.#c=[],this.#r.removeAttribute("src"),this.#r.load(),this.#S(),Xr(this.#t),Xr(this.#s),Xr(this.#i)}seek(e){return typeof e=="number"&&(this.#x(),this.#a=Number.isFinite(e)?Math.max(0,e):0,this.#C()),this.#a??this.#r.currentTime}#C(){if(this.#a===null||this.#r.readyState<1)return;let e=this.#r.duration,t=Number.isFinite(e)&&e>0?S.wrap(this.#a,e):this.#a;Math.abs(this.#r.currentTime-t)>.005&&(this.#r.currentTime=t),this.#a=null}sync(e){this.#h||this.#p||this.#l||(!this.#d||this.#r.paused)&&!this.#u&&(this.seek(e),this.play())}follow(e){if(this.#P||!this.#w||this.#e.state!=="running"){this.#x();return}let t=this.#r.currentTime-e,r=this.#r.duration;Number.isFinite(r)&&r>0&&(t=S.wrapDelta(t,r));let i=lo();if(t<-no?this.#g||=i:t>-so&&(this.#g=0),t>no||this.#g&&i-this.#g>Sc){this.seek(e);return}this.#m=t}#x(){this.#m=0,this.#g=0}volume(e){return Tc(this.#i.gain,S.clamp01(e),this.#e),this}rate(e){return this.#r.playbackRate=S.clamp(S.finite(e,1),.1,4),this}pos(e,t,r,i=0){return ve(e,this.#y)&&ve(t,this.#v)&&ve(r,this.#_)?this:(this.#y=e,this.#v=t,this.#_=r,co(this.#s,e,t,r,this.#e,i),this)}destination(e){let t=e??this.#e.destination;return t===this.#n?this:(Xr(this.#i),this.#n=t,this.#i.connect(this.#n),this)}pannerAttr(e){return e?(e.panningModel&&(this.#s.panningModel=e.panningModel),e.distanceModel&&(this.#s.distanceModel=e.distanceModel),typeof e.refDistance=="number"&&(this.#s.refDistance=e.refDistance),typeof e.maxDistance=="number"&&(this.#s.maxDistance=e.maxDistance),typeof e.rolloffFactor=="number"&&(this.#s.rolloffFactor=e.rolloffFactor),this):this}},Vr=class{#e=null;#r=null;#t=[0,0,0];#i=L.create();#s=new Float32Array(9);#n={volume:1,rate:1,pannerAttr:{}};#o=!1;#c=0;#a=0;#h=0;#l=!1;get context(){return Fe.ctx}get isLoaded(){return!this.#l||!this.#o||Fe.ctx?.state!=="running"||this.#e?.blocked===!0}get isBuffering(){return this.#o&&(this.#e?.buffering??!1)}setOutput(e){if(Fe.setOutput(e),!!this.#e){if(this.#e.context!==Fe.ctx){let t=this.#r,r=this.#e.seek();this.unload(),t&&(this.load(t),this.#e?.seek(r));return}this.#e.destination(Fe.destination)}}async load(e){if(e===this.#r&&this.#e&&!this.#e.failed){await this.#e.ready;return}this.unload(),this.#r=e,this.#l=!0;let t=++this.#c;try{this.#e=new as(e,{...this.#n,pos:this.#t}),await this.#e.ready}catch{t===this.#c&&(this.#e?.unload(),this.#e=null,this.#r=null)}finally{t===this.#c&&(this.#l=!1)}}sync(e,t,r){let i=this.#e;return!this.#o||!r?(i?.pause(),!0):(i?.sync(e),i?.follow(e),!this.isBuffering)}get clockRate(){return this.#o?this.#e?.clockRate??1:1}seek(e){this.#e?.seek(e)}volume(e){this.#n.volume=S.clamp01(e),this.#e?.volume(this.#n.volume)}rate(e){this.#n.rate=e,this.#e?.rate(e)}setSpatial(e,t,r){this.#t=[e,t,r];let i=this.#p("spatial");i>=0&&this.#e?.pos(e,t,r,i)}setSourceMatrix(e,t,r=1){let i=e.pointTo?.(this.#i,t,r)??Z.pointTo(this.#i,e,t,r);this.setSpatial(i.x,i.y,i.z)}setListenerMatrix(e){let t=this.#p("listener");if(t<0)return;let r=e.poseTo?.(this.#s)??Z.poseTo(this.#s,e);Fe.listener(...r,t)}setPanner(e){Object.assign(this.#n.pannerAttr,e),this.#e?.pannerAttr(e)}stop(){this.#e?.pause()}get enabled(){return this.#o&&Fe.ctx?.state==="running"&&!this.#e?.blocked}enable(){this.#o=!0,Fe.resume(),this.#e?.allowPlayback()}disable(){this.#o=!1,this.#e?.pause()}unload(){this.#c++,this.#e?.unload(),this.#e=null,this.#r=null,this.#l=!1,Fe.resetListener()}#p(e){let t=lo(),r=e==="listener"?this.#a:this.#h;return r&&t-r<wc?-1:(e==="listener"?this.#a=t:this.#h=t,S.deltaSeconds(t,r,0,vc))}};var ho="gr-outbox";var cs=new Set,ls=new Set;function uo(){try{let s=JSON.parse(localStorage.getItem(ho)??"[]");return Array.isArray(s)?s:[]}catch{return[]}}function po(s){try{let e=Date.now(),t=s(uo()).filter(i=>e-i.at<6048e5),r=JSON.stringify(t);for(;r.length>204800;)r=JSON.stringify(t=t.slice(1));localStorage.setItem(ho,r)}catch{}}async function fo(s,e){ls.add(e);try{let{status:t}=await fetch(s,{method:"POST",body:e,keepalive:!0,credentials:"omit",referrerPolicy:"no-referrer"});(t===404||t===410)&&cs.add(s),t!==429&&t<500&&po(r=>r.filter(i=>i.body!==e))}catch{}finally{ls.delete(e)}}function mo(s,e){cs.has(s)||(po(t=>[...t,{url:s,body:e,at:Date.now()}]),fo(s,e))}async function go(){for(let{url:s,body:e}of uo())!cs.has(s)&&!ls.has(e)&&await fo(s,e)}var yo="/api/v1/streaming/playback",Pc="https://market.gracia.ai",bo="gr-viewer",xo=60,Cc=200,Ec=32*1024,Lc=new Set(["pause","end","hide","close","tick"]),Rc=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,kc="771bb0ebe53dfe66",hs=s=>Math.round(s*1e3)/1e3;function Ac(s){if(s.file||s.localFile||!s.url)return null;try{let e=new URL(s.url,globalThis.location?.href);if(s.token){let t=e.pathname.split("/").filter(Boolean).at(-1)??"";return{endpoint:e.origin+yo,id:{token:s.token,streamingId:t}}}return e.search="",e.hash="",{endpoint:Pc+yo,id:{fileUrl:e.href}}}catch{return null}}function Ic(){try{let s=localStorage.getItem(bo);if(s&&Rc.test(s))return s;let e=crypto.randomUUID();return localStorage.setItem(bo,e),e}catch{return}}var Ur=class{#e;#r="2d";#t=null;#i=null;#s=!1;#n=0;#o=!1;constructor(e){this.#e=e,globalThis.document?.addEventListener("visibilitychange",this.#c),globalThis.addEventListener?.("pagehide",this.#a),go()}dispose(){globalThis.document?.removeEventListener("visibilitychange",this.#c),globalThis.removeEventListener?.("pagehide",this.#a)}open(e){this.unload();let t=Ac(e);t&&(this.#t??={id:crypto.randomUUID(),start:performance.now(),seq:0},this.#i={...t,events:[],played:!1})}unload(){this.#h(),this.#i=null,this.#s=!1,this.#n=0}close(){this.record("close"),this.unload(),this.#t=null}setMode(e){e!==this.#r&&(this.#r=e,this.record("mode"))}frame(e,t){e!==this.#s&&this.record(e?"play":"wait"),e&&(this.#n+=t,!(this.#n<xo)&&(this.#n-=xo,this.record("tick")))}record(e,{pos:t,from:r}={}){let i=this.#i,n=this.#t;if(!i||!n)return;e==="play"&&(this.#s=!0),(e==="pause"||e==="wait"||e==="hide")&&(this.#s=!1);let a=this.#e(),o={seq:n.seq++,type:e,t:Math.round(performance.now()-n.start),pos:hs(t??a.pos),rate:a.rate,mode:this.#r,...r===void 0?{}:{from:hs(r)}};i.events.push(o);let l=e==="play"&&!i.played;e==="play"&&(i.played=!0),(l||Lc.has(e)||i.events.length>=Cc)&&this.#h()}#c=()=>{globalThis.document?.visibilityState==="hidden"?this.#a():this.#o=!1};#a=()=>{this.#o||(this.#o=!0,this.record("hide"))};#h(){let e=this.#i;if(!e?.events.length)return;let t={...e.id,duration:hs(this.#e().duration),viewId:this.#t?.id,viewerId:Ic(),sdk:kc,webdriver:globalThis.navigator?.webdriver===!0};this.#l(e.endpoint,t,e.events.splice(0))}#l(e,t,r){let i=JSON.stringify({...t,events:r});if(i.length<=Ec)return mo(e,i);if(r.length<2)return;let n=r.length>>1;this.#l(e,t,r.slice(0,n)),this.#l(e,t,r.slice(n))}};var jt=class{#e;#r=0;#t=!1;constructor(e){this.#e=e}get id(){return this.#r}get isStatic(){return this.#t}get isReady(){return this.#e.sceneReady(this.#r)}get progress(){return this.#e.sceneProgress(this.#r)}get duration(){return this.#t?0:this.#e.sceneDuration(this.#r)}get isBuffering(){return this.#t?!1:this.#e.sceneIsBuffering(this.#r)}get lastFetchStatus(){return this.#e.sceneLastFetchStatus(this.#r)}setTime(e){this.#r&&!this.#t&&this.#e.sceneSetTime(this.#r,e)}setPlaybackRange(e,t){this.#r&&!this.#t&&this.#e.sceneSetPlaybackRange(this.#r,e,t)}setVisible(e){this.#r&&this.#e.sceneSetVisible(this.#r,e)}getBBox(){return this.#e.sceneGetBBox(this.#r)}setEnvLighting(e,t){this.#r&&this.#e.sceneSetEnvLighting(this.#r,e,t)}clearEnvLighting(){this.#r&&this.#e.sceneClearEnvLighting(this.#r)}setModelMatrix(e){this.#r&&this.#e.sceneSetModelMatrix(this.#r,e)}openDynamic(e){if(this.remove(),this.#r=this.#e.addDynamicScene(),this.#t=!1,e.localFile||e.file){let r=e.localFile||e.file;this.#e.sceneOpenLocal(this.#r,this.#e.registerLocalFile(r));return}let t=e.url;if(e.token){this.#e.sceneOpenApi(this.#r,t,e.token);return}this.#e.sceneOpen(this.#r,t)}async openStatic(e){this.remove();let t=this.#e.addStaticScene();this.#r=t,this.#t=!0;let r=e.file?await e.file.arrayBuffer():await(await fetch(e.url)).arrayBuffer();this.#r===t&&this.#e.sceneOpenStatic(t,new Uint8Array(r))}remove(){this.#r&&(this.#e.removeScene(this.#r),this.#r=0)}};var vo={alpha:!0,premultipliedAlpha:!0,depth:!0,stencil:!1,antialias:!1,powerPreference:"high-performance",xrCompatible:!0},Wr=Object.freeze({start:0,end:1/0}),dt=class s{#e;#r;#t=new Vr;#i=0;#s=null;#n=null;#o=null;#c=!1;#a=0;#h=0;#l=1;#p=Wr;#d=!1;#u=new Ur(()=>({pos:this.#a,rate:this.#l,duration:this.duration}));#f=null;#m=null;static GL_CANVAS_OPTS=vo;constructor(e,t){this.#e=e,this.#r=t,typeof document<"u"&&document.addEventListener("visibilitychange",this.#g)}#g=()=>{document.hidden&&this.#t.stop()};static async create(e,{canvas:t,gl:r,backend:i,maxSplatsCount:n,xrCompatible:a}={}){if(!t&&!r)throw new Error("canvas or gl required");let o=i??(r?"hybrid":"pure"),{module:l,device:h}=await Nr.boot(e,t||r.canvas,{maxSplatsCount:n,xrCompatible:a}),c=new s(l,h);return o==="hybrid"?c.#_(r??s.#y(t)):c.#v(t),c}static preferredFormat(){return navigator.gpu.getPreferredCanvasFormat()}static#y(e){let t=e.getContext("webgl2",vo);if(!t)throw new Error("WebGL2 not available");return t}get device(){return this.#r}get backend(){return this.#e.backend}get buildUnixTime(){return this.#e.buildUnixTime}get gl(){return this.#m}get isBGRA(){return s.preferredFormat()==="bgra8unorm"}assertDevice(e){if(e&&e!==this.#r)throw new Error("WebGPU device must match GraciaPlayer.device")}configureSurface(e,t={}){let{format:r,alphaMode:i="premultiplied",usage:n}=t;e.configure({device:this.#r,format:r??s.preferredFormat(),alphaMode:i,...n!=null?{usage:n}:{}})}bindCanvas(e,t={}){let r=e.getContext("webgpu");if(!r)throw new Error("WebGPU canvas context not available");return this.configureSurface(r,t),this.#f=r,r}setBackend(e,{canvas:t,gl:r}={}){if(this.shutdown(),e==="hybrid"){if(!r&&!t)throw new Error("canvas or gl required for hybrid backend");this.#_(r??s.#y(t))}else this.#v(t)}present(e,t){e===0||t===0||(this.#e.backend==="hybrid"?this.#P(e,t):this.#w())}renderTextures({color:e,depth:t,w:r,h:i}){return this.#R(),this.#e.backend!=="pure"?!1:this.#e.pureRenderTo(e,t,r,i)}renderDynamic(e){this.#n?.setVisible(!1);try{return this.renderTextures(e)}finally{this.#n?.setVisible(!0)}}get hasStatic(){return!!this.#n}renderXR(e,t=1,r=!1){let[i,n]=e;return this.setCamera(i.view.transform.matrix,i.projection,n?.view.transform.matrix,n?.projection),this.#R(),this.#e.pureRenderXR(e,t,r)}copyTexture(e,t,r=null){let i=r??[e.width,e.height,1],n=this.#r.createCommandEncoder();n.copyTextureToTexture({texture:e},{texture:t},i),this.#r.queue.submit([n.finish()])}renderHybridViewport(e,t,{gl:r,drawMode:i,enableMesh:n=!1,x:a=0,y:o=0,eye:l=0}={}){let h=r??this.#m;if(!h)throw new Error("No WebGL context");let c=i??this.#i;this.preprocess(e,t),h.enable(h.DEPTH_TEST),h.depthFunc(h.LEQUAL),h.depthMask(!1),this.render(c,a,o,e,t,l),n&&(h.colorMask(!1,!1,!1,!1),h.depthMask(!0),this.render(1,a,o,e,t,l),h.colorMask(!0,!0,!0,!0)),h.depthMask(!0)}shutdown(){this.#e.shutdownBackend(),this.#m=null,this.#f=null}#v(e){this.#m=null,this.#f=null,this.#r.pushErrorScope("validation"),this.#e.initPure(this.isBGRA),this.#r.popErrorScope().then(t=>{}),e&&this.bindCanvas(e)}#_(e){this.#f=null,this.#m=e,this.#e.initHybrid(e)}#w(){if(!this.#f)throw new Error("bindCanvas() required");let{width:e,height:t}=this.#f.canvas;e===0||t===0||this.renderTextures({color:this.#f.getCurrentTexture(),w:e,h:t})}#P(e,t){let r=this.#m;if(!r)throw new Error("hybrid backend required");r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clearDepth(1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.disable(r.DEPTH_TEST),this.frame(e,t,this.#i)}get drawMode(){return this.#i}set drawMode(e){this.#i=S.clampInt(e,0,3)}get#M(){return this.#s??this.#n}get isReady(){return(this.#M?.isReady??!1)&&this.#t.isLoaded}get progress(){return this.#M?.progress??0}get duration(){return this.#s?.duration??0}get playbackRange(){let{start:e,end:t}=this.#p;return{start:e,end:Math.min(t,this.duration||1/0)}}get ended(){return this.#d}get currentTime(){return this.#a}get isPlaying(){return this.#c}get isBuffering(){return(this.#s?.isBuffering??!1)||this.#c&&this.#t.isBuffering}get lastFetchStatus(){return this.#M?.lastFetchStatus??0}play(){this.#c=!0,this.#E()}pause(){this.#c&&this.#u.record("pause"),this.#c=!1,this.#h=0,this.#t.stop()}seek(e){let t=this.#a,{start:r,end:i}=this.playbackRange;this.#a=S.clamp(e,r,i),this.#h=0,this.#t.seek(this.#a),this.#u.record("seek",{from:t})}setPlaybackRange(e,t){if(!(e>=0&&e<t&&t<=this.duration))throw new RangeError(`Invalid playback range [${e}, ${t}) for ${this.duration}s`);this.#b({start:e,end:t})}clearPlaybackRange(){this.#b(Wr)}#b(e){this.#p=e,this.#s?.setPlaybackRange(e.start,e.end);let{start:t,end:r}=this.playbackRange;(this.#a<t||this.#a>=r)&&this.seek(t)}get speed(){return this.#l}setSpeed(e){this.#l=S.clamp(S.finite(e,1),.1,4),this.#t.rate(this.#l)}close(){this.#u.close(),this.#s?.remove(),this.#s=null,this.#n?.remove(),this.#n=null,this.#S(),this.#t.unload()}clearVideo(){this.#u.unload(),this.#s?.remove(),this.#s=null,this.#S(),this.#t.unload()}#S(){this.#p=Wr,this.#d=!1,this.#a=0,this.#h=0,this.#c=!1}clearEnvironment(){this.#n?.remove(),this.#n=null}#E(){let e=this.#c&&(this.#s?.isReady??!1)&&!this.#s?.isBuffering;return this.#t.sync(this.#a,this.duration,e)}#R(){if(!this.#s)return;let e=performance.now(),t=this.#E(),r=this.#c&&this.#s.isReady&&!this.#s.isBuffering&&t,i=0;r&&this.#h>0&&(i=S.deltaSeconds(e,this.#h),this.#C(i*this.#l*this.#t.clockRate)),this.#u.frame(r,i),this.#h=r?e:0,this.#s.setTime(this.#a)}#C(e){let{start:t,end:r}=this.playbackRange,i=this.#a+e;if(i<r){this.#a=i;return}this.#a=t+S.wrap(i-t,r-t),this.#p===Wr?(this.#d=!0,this.#u.record("end",{pos:r})):this.#t.seek(this.#a)}open(e){if(this.#t.unload(),e.audio&&this.#t.load(e.audio),e.type==="static")return this.#x(e);this.#u.open(e),this.#s||(this.#s=new jt(this.#e)),this.#s.openDynamic(e),this.#T(this.#s),this.#S()}async#x(e){this.#n||(this.#n=new jt(this.#e)),await this.#n.openStatic(e),this.#T(this.#n)}get audioContext(){return this.#t.context}get audioEnabled(){return this.#t.enabled}enableAudio(){this.#t.enable(),this.#E()}disableAudio(){this.#t.disable()}setAudioOutput(e){this.#t.setOutput(e)}setVolume(e){this.#t.volume(e)}loadAudio(e){return this.#t.load(e)}setAudioSpatial(e,t,r){this.#t.setSpatial(e,t,r)}setAudioSourceMatrix(e,t,r){this.#t.setSourceMatrix(e,t,r)}setAudioListenerMatrix(e){this.#t.setListenerMatrix(e)}setAudioPanner(e){this.#t.setPanner(e)}setViewMode(e){this.#u.setMode(e)}setCamera(e,t,r,i){this.#e.setCamera(e,t,r,i)}getBBox(){return this.#M?.getBBox()??null}getModelMatrix(){return this.#e.getModelMatrix()}setModelMatrix(e){this.#e.setModelMatrix(e)}setStaticModelMatrix(e){this.#n?.setModelMatrix(e)}setEnvLighting(e,t=1){this.#o={coefs:Float32Array.from(e),scale:t},this.#s?.setEnvLighting(e,t),this.#n?.setEnvLighting(e,t)}clearEnvLighting(){this.#o=null,this.#s?.clearEnvLighting(),this.#n?.clearEnvLighting()}#T(e){this.#o&&e.setEnvLighting(this.#o.coefs,this.#o.scale)}frame(e,t,r){this.#R(),this.#e.hybridFrame(e,t,r)}preprocess(e,t){return this.#R(),this.#e.hybridPreprocess(e,t)}render(e,t,r,i,n,a){this.#e.hybridRender(e,t,r,i,n,a)}renderMesh(e,t,r,i,n){this.#e.hybridRenderMesh(e,t,r,i,n)}renderMotionMV(e,t,r,i){this.#e.hybridRenderMotionMV(e,t,r,i)}canMotion(){return this.#e.hybridCanMotion()}hasMultiview(){return this.#e.hybridHasMultiview()}resetXR(){this.#e.hybridReset()}dispose(){typeof document<"u"&&document.removeEventListener("visibilitychange",this.#g),this.close(),this.#u.dispose(),this.#t.unload(),this.shutdown(),this.#e.dispose()}};var So=.75,To=.35,Mo=.9,Oc=.1,Fc=.15,wo=3,Bc=.5,us=[1,.72,.05],Yr=Float32Array.of(1,.08,.04,.9),Dc=.001,ps=new Float32Array(0),Gc=.25,zc=1e-5,mt={ramp:[[So,...us,.12],[0,...Yr]],reach:Number.POSITIVE_INFINITY,dark:{from:To,to:0,max:Mo}},ms={ramp:[[So,...us,.7],[.2,...us,.9],[-.3,...Yr]],reach:4.5,dark:{from:.3,to:-.5,max:Mo}},Hr=s=>typeof s=="number"&&Number.isFinite(s),ds=s=>!!s&&Hr(s.x)&&Hr(s.y)&&Hr(s.z),Nc=s=>ds(s)&&Hr(s.w);function gs(s){return!s||typeof s!="object"||!Jn(s)||!ds(s.position)||!Nc(s.rotation)||!ds(s.scale)?!1:s.scale.x>0&&s.scale.y>0&&s.scale.z>0}var ys=(s,e,t)=>{let r=S.unlerp01(t,s,e);return r*r*(3-2*r)};function Xc(s,e=mt.ramp,t=new Float32Array(4)){if(s>=e[0][0])return t.fill(0);let r=1;for(;r<e.length-1&&s<e[r][0];)r++;let i=e[r-1],n=e[r],a=ys(i[0],n[0],s);for(let o=0;o<4;o++)t[o]=i[o+1]+(n[o+1]-i[o+1])*a;return t}var Vc=s=>ys(To,0,s),Uc=(s,{dark:e}=mt)=>e.max*ys(e.from,e.to,s),Wc=s=>1-S.unlerp01(s,wo,wo+Bc);function Hc(s,e,t){t.set(s);let r=Yr[3]*Wc(e);return r>s[3]&&(t.set(Yr),t[3]=r),t}function _o(s,e,t){if(e[3]>0){s[3]===0&&(s.set(e),s[3]=0);for(let r=0;r<4;r++)s[r]+=(e[r]-s[r])*t}else s[3]-=s[3]*t;s[3]<Dc&&(s[3]=0)}var ft=(s,e,t,r)=>(s[e]=t[r],s[e+1]=t[r+1],s[e+2]=t[r+2],e+3),fs=class{#e;#r=null;#t=new te;#i=new te;#s=new te;#n=new Ie;#o=ps;#c=ps;#a=new te;#h=new Oe;#l=new te;#p=new Ie;#d=new Ie;#u=new te;#f=1;#m=new te;#g=new Oe;constructor(e){this.#e=e,this.#i.fromXYZ(e.position),this.#s.fromXYZ(e.scale),this.#n.fromXYZW(e.rotation).normalize(),this.setRoomMatrix(null)}setRoomMatrix(e){return this.#h.fromRotationTranslationScale(this.#n,this.#i,this.#s),e&&this.#h.preMultiply(e),this.#h.decompose(this.#l,this.#p,this.#u),this.#d.copy(this.#p).invert(),this.#f=this.#u[0]<0?-1:1,this.#u.set(Math.abs(this.#u[0])*.5,Math.abs(this.#u[1])*.5,Math.abs(this.#u[2])*.5),this.#m.set(this.#f,1,1),this.#g.fromRotationTranslationScale(this.#p,this.#l,this.#m),(!this.#r||!this.#t.equals(this.#u,zc))&&this.#y(),this}signedDistance(e){return this.#r.signedDistance(this.#_(e))}get mesh(){return this.#r.mesh}get meshMatrix(){return this.#g}outlineRibbon(e,t=!1){let r=e*.5,i=this.#o,n=this.#c,a=0,o=0;for(let l of this.#r.outlines){let h=l.length/3;for(let c=0;c<h;c++)this.#v(l,c,h,r,(a+c)*6);for(let c=0;c<h;c++){let u=(a+c)*6,p=(a+(c+1)%h)*6;o=ft(n,o,i,u),o=ft(n,o,i,p),o=ft(n,o,i,p+3),o=ft(n,o,i,u),o=ft(n,o,i,p+3),o=ft(n,o,i,u+3)}if(a+=h,t)break}return n.subarray(0,o)}#y(){this.#t.copy(this.#u),this.#r=Dr(this.#e,this.#u);let e=this.#r.outlines.reduce((t,r)=>t+r.length/3,0);this.#o=new Float32Array(e*6),this.#c=new Float32Array(e*18)}#v(e,t,r,i,n){let a=(t+r-1)%r*3,o=(t+1)%r*3,l=e[t*3],h=e[t*3+1],c=e[t*3+2],u=l-e[a],p=c-e[a+2],f=e[o]-l,m=e[o+2]-c,d=Math.hypot(u,p),g=Math.hypot(f,m),y=p/d+m/g,x=-u/d-f/g,b=Math.hypot(y,x),w=i/(b*Math.max(b/2,Gc));this.#w(n,l+y*w,h,c+x*w),this.#w(n+3,l-y*w,h,c-x*w)}#_(e){let t=this.#a.sub(e,this.#l).transformQuat(this.#d);return t[0]*=this.#f,t}#w(e,t,r,i){let n=this.#a.set(t*this.#f,r,i).transformQuat(this.#p);this.#o.set(n.add(this.#l),e)}},Kt=class{#e=null;#r=mt;#t=0;#i=new Float32Array(4);#s=new Float32Array(4);#n=0;#o=0;#c=new Float32Array(4);#a=new Float32Array(4);#h=!1;#l=null;#p=!1;#d=new te;get active(){return!!this.#e}get darkness(){return this.#t}get outline(){return this.#i}get surface(){return this.#s}get aboveSplats(){return this.#n}get reach(){return this.#r.reach}get outside(){return this.#o}get mesh(){return this.#e?.mesh??null}get meshMatrix(){return this.#e?.meshMatrix??null}setBounds(e){return this.#e=gs(e)?new fs(e):null,this.#u()}setRoomMatrix(e){return this.#e?.setRoomMatrix(e),this}setHidden(e){return this.#p=e,this.#u()}queueIntro(){return this.#h=!0,this}reset(e=this.#r){return this.#r=e,this.#h=!1,this.#u()}update(e,t){if(!this.#e||this.#p)return this.#u();this.#h?(this.#h=!1,this.#l=0):this.#l!==null&&(this.#l+=t),this.#d.from(e);let r=-this.#e.signedDistance(this.#d),i=Xc(r,this.#r.ramp,this.#c),n=this.#l===null?i:Hc(i,this.#l,this.#a),a=1-Math.exp(-t/Fc);_o(this.#i,n,a),_o(this.#s,i,a),this.#n+=(Vc(r)-this.#n)*a,this.#o+=((r<0?1:0)-this.#o)*a;let o=Uc(r,this.#r);return this.#t+=(o-this.#t)*(1-Math.exp(-t/Oc)),this}ribbon(e){let t=this.#s[3]===0;return this.#e?.outlineRibbon(e,t)??ps}#u(){return this.#t=0,this.#i.fill(0),this.#s.fill(0),this.#n=0,this.#o=0,this.#l=null,this}};var Yc=2.5,Co=1.6,qc=.0015,Zc=2,Po=.5,$c=.6,Qc=.022,jc=1e-4,qr=Math.PI/2-.01,Zr=.05,$r=200,Kc=new Set(["w","a","s","d","r","f","q","e","shift"]),Jt=class{#e;#r=new Map;#t=null;#i=1;#s;#n;#o;#c=0;#a=0;#h=0;#l=0;#p=0;#d=e=>e.preventDefault();constructor(e,{pan:t=!0,rotate:r=Yc,onDown:i}={}){this.#e=e,this.#s=t,this.#n=r,this.#o=i,this.#i=e.clientHeight||1,e.addEventListener("contextmenu",this.#d),e.addEventListener("pointerdown",this.#u),e.addEventListener("wheel",this.#g,{passive:!1})}get height(){return this.#i}consume(e){return e.rotX=this.#c,e.rotY=this.#a,e.panX=this.#h,e.panY=this.#l,e.zoom=this.#p,this.#c=this.#a=this.#h=this.#l=this.#p=0,e}dispose(){this.#e.removeEventListener("contextmenu",this.#d),this.#e.removeEventListener("pointerdown",this.#u),this.#e.removeEventListener("wheel",this.#g),window.removeEventListener("pointermove",this.#f),window.removeEventListener("pointerup",this.#m),window.removeEventListener("pointercancel",this.#m),this.#r.clear(),this.#t=null}#u=e=>{this.#e.setPointerCapture?.(e.pointerId),this.#r.size===0&&(window.addEventListener("pointermove",this.#f),window.addEventListener("pointerup",this.#m),window.addEventListener("pointercancel",this.#m)),this.#r.set(e.pointerId,{x:e.clientX,y:e.clientY,button:e.button,touch:e.pointerType==="touch"}),this.#i=this.#e.clientHeight||this.#i,this.#r.size===2&&this.#y(),this.#o?.()};#f=e=>{let t=this.#r.get(e.pointerId);if(!t)return;let r=e.clientX-t.x,i=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,this.#r.size>=2)return this.#v();!t.touch&&(t.button===2||e.buttons===2)?this.#s&&(this.#h+=r,this.#l+=i):(this.#c+=r/this.#i*this.#n,this.#a+=i/this.#i*this.#n)};#m=e=>{this.#e.releasePointerCapture?.(e.pointerId),this.#r.delete(e.pointerId),this.#t=null,this.#r.size===0&&(window.removeEventListener("pointermove",this.#f),window.removeEventListener("pointerup",this.#m),window.removeEventListener("pointercancel",this.#m))};#g=e=>{e.preventDefault(),this.#p+=-e.deltaY*qc};#y(){let[e,t]=this.#r.values();this.#t={dist:Math.hypot(e.x-t.x,e.y-t.y),cx:(e.x+t.x)/2,cy:(e.y+t.y)/2}}#v(){let[e,t]=this.#r.values(),r=Math.hypot(e.x-t.x,e.y-t.y),i=(e.x+t.x)/2,n=(e.y+t.y)/2,a=this.#t;a&&(a.dist>0&&r>0&&(this.#p+=Math.log(r/a.dist)),this.#s&&(this.#h+=i-a.cx,this.#l+=n-a.cy)),this.#t={dist:r,cx:i,cy:n}}},Jc=s=>1-Math.exp(-s/Qc),we=()=>({rotX:0,rotY:0,panX:0,panY:0,zoom:0}),eh=s=>Math.abs(s.rotX)+Math.abs(s.rotY)+Math.abs(s.panX)+Math.abs(s.panY)+Math.abs(s.zoom)<jc;function ws(s,e,t,r,i){let n=s.consume(e);if(t.rotX+=n.rotX,t.rotY+=n.rotY,t.panX+=n.panX,t.panY+=n.panY,t.zoom+=n.zoom,eh(t))return!1;let a=Jc(i);for(let o of["rotX","rotY","panX","panY","zoom"])r[o]=t[o]*a,t[o]-=r[o];return!0}var bs=class{#e;#r;#t=L.create();#i=L.create();#s=L.create();#n=L.create();#o=L.create();#c=L.create();#a=1;#h=0;#l=0;#p=!1;#d=we();#u=we();#f=we();constructor(e,t){this.#e=e,this.#r=new Jt(t),this.#_()}get type(){return"orbit"}update(e){this.#g(e)&&this.#_()}frame(e,t){this.#w(e,t)}reset(e,t){this.#w(e,t)}zoom(e){e>0&&(this.#u.zoom+=Math.log(e))}applyConstraints(e){this.#p=e,this.#l=S.clamp(this.#l,-qr,this.#m),this.#_()}dispose(){this.#r.dispose()}get#m(){return this.#p?0:qr}#g(e){if(!ws(this.#r,this.#d,this.#u,this.#f,e))return!1;let t=this.#f;return this.#h+=t.rotX,this.#l=S.clamp(this.#l-t.rotY,-qr,this.#m),t.zoom&&(this.#a=S.clamp(this.#a*Math.exp(-t.zoom),Zr,$r)),(t.panX||t.panY)&&this.#v(t.panX,t.panY),!0}#y(){this.#n.yawPitchBasis(this.#h,this.#l,this.#i,this.#s,this.#o)}#v(e,t){this.#y();let r=S.perspectiveScale(this.#a,this.#e.fov,this.#r.height)*Co;this.#t.addScaled(this.#n,-e*r).addScaled(this.#o,t*r)}#_(){this.#y(),this.#e.position.copy(this.#s).scale(this.#a).add(this.#t),this.#e.setAxes(this.#n,this.#o,this.#s)}#w(e,t){this.#t.from(e),this.#s.sub(this.#c.from(t),this.#t),this.#a=S.clamp(this.#s.len,Zr,$r),this.#i.copy(this.#s).scale(-1).normalize(z.FORWARD),this.#c.yawPitch(this.#i),this.#h=this.#c.x,this.#l=S.clamp(this.#c.y,-qr,this.#m),this.#u=we(),this.#_()}},xs=class{#e;#r;#t=new Set;#i=de.create();#s=L.create();#n=L.create();#o=L.create();#c=L.create();#a=L.create();#h=we();#l=we();#p=we();constructor(e,t){this.#e=e,t.hasAttribute("tabindex")||(t.tabIndex=0),this.#r=new Jt(t,{pan:!1,onDown:()=>t.focus()}),window.addEventListener("keydown",this.#m),window.addEventListener("keyup",this.#g)}get type(){return"fly"}update(e){let t=this.#d(e);this.#u(e)&&(t=!0),t&&this.#f()}frame(e,t){this.reset(e,t)}reset(e,t){this.#e.position.from(t),this.#s.sub(this.#a.from(e),this.#e.position).normalize(z.FORWARD),this.#a.yawPitch(this.#s),this.#i.identity().rotate(z.Y,-this.#a.x).rotate(z.X,this.#a.y),this.#l=we(),this.#f()}zoom(e){e>0&&(this.#l.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#r.dispose(),window.removeEventListener("keydown",this.#m),window.removeEventListener("keyup",this.#g),this.#t.clear()}#d(e){let t=Zc*e*(this.#t.has("shift")?4:1),r=this.#e.position,i=!1,n=(o,l)=>{r.addScaled(o,l),i=!0},a=o=>{this.#i.rotate(z.Z,o),i=!0};return this.#t.has("w")&&n(this.#s,t),this.#t.has("s")&&n(this.#s,-t),this.#t.has("d")&&n(this.#o,t),this.#t.has("a")&&n(this.#o,-t),this.#t.has("r")&&n(this.#c,t),this.#t.has("f")&&n(this.#c,-t),this.#t.has("q")&&a(Po*e),this.#t.has("e")&&a(-Po*e),i}#u(e){if(!ws(this.#r,this.#h,this.#l,this.#p,e))return!1;let t=this.#p;return t.rotX&&this.#i.rotate(z.Y,-t.rotX),t.rotY&&this.#i.rotate(z.X,-t.rotY),t.zoom&&this.#e.position.addScaled(this.#s,t.zoom*$c),!0}#f(){this.#i.normalize(),this.#o.copy(z.X).transformQuat(this.#i),this.#c.copy(z.Y).transformQuat(this.#i),this.#n.copy(z.Z).transformQuat(this.#i),this.#s.copy(this.#n).scale(-1),this.#e.setAxes(this.#o,this.#c,this.#n)}#m=e=>{let t=e.key.toLowerCase();!Kc.has(t)||this.#y()||(this.#t.add(t),e.preventDefault())};#g=e=>{this.#t.delete(e.key.toLowerCase())};#y(){let e=document.activeElement;return e?.tagName==="INPUT"||e?.tagName==="TEXTAREA"||e?.isContentEditable}},vs=class{#e;#r;#t=L.create();#i=L.create();#s=L.create().copy(z.Y);#n=L.create();#o=L.create();#c=L.create();#a=L.create();#h=L.create();#l=L.create();#p=de.create();#d=we();#u=we();#f=we();constructor(e,t){this.#e=e,this.#r=new Jt(t)}get type(){return"trackball"}update(e){if(!ws(this.#r,this.#d,this.#u,this.#f,e))return;let t=this.#f;(t.rotX||t.rotY)&&this.#g(t.rotX,t.rotY),t.zoom&&this.#y(t.zoom),(t.panX||t.panY)&&this.#v(t.panX,t.panY),this.#_()}frame(e,t){this.#w(e,t)}reset(e,t){this.#w(e,t)}zoom(e){e>0&&(this.#u.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#r.dispose()}#m(){this.#n.copy(this.#i).normalize(z.Z),this.#o.cross(this.#s,this.#n).normalize(z.X),this.#c.cross(this.#n,this.#o)}#g(e,t){this.#m(),this.#a.copy(this.#o).scale(e).addScaled(this.#c,-t);let r=this.#a.len;r<1e-6||(this.#h.cross(this.#a,this.#i).normalize(z.Y),this.#p.setAxisAngle(this.#h,r),this.#i.transformQuat(this.#p),this.#s.transformQuat(this.#p).normalize())}#y(e){this.#i.setLength(S.clamp(this.#i.len*Math.exp(-e),Zr,$r))}#v(e,t){this.#m();let r=S.perspectiveScale(this.#i.len,this.#e.fov,this.#r.height)*Co;this.#t.addScaled(this.#o,-e*r).addScaled(this.#c,t*r)}#_(){this.#e.up.copy(this.#s),this.#e.position.copy(this.#t).add(this.#i),this.#e.lookAt(this.#t)}#w(e,t){this.#t.from(e),this.#i.sub(this.#l.from(t),this.#t),this.#i.setLength(S.clamp(this.#i.len,Zr,$r)),this.#s.copy(z.Y),this.#m(),this.#s.copy(this.#c),this.#u=we(),this.#_()}};function _s(s,e,t){switch(s){case"fly":return new xs(e,t);case"trackball":return new vs(e,t);default:return new bs(e,t)}}var Ss=class{position=L.create();target=L.create();up=L.create().copy(z.Y);matrixWorld=Z.create();projectionMatrix=Z.create();fov;aspect;near;far;constructor(e=60,t=1,r=.05,i=1e4){this.fov=e,this.aspect=t,this.near=r,this.far=i,this.updateProjectionMatrix(),this.updateMatrixWorld()}lookAt(e){return this.target.from(e),this.updateMatrixWorld()}updateProjectionMatrix(){this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far)}updateMatrixWorld(){return this.matrixWorld.cameraWorld(this.position,this.target,this.up),this.matrixWorld}setAxes(e,t,r){return this.up.copy(t),this.target.copy(this.position).addScaled(r,-1),this.matrixWorld.cameraWorldAxes(this.position,e,t,r)}},th=1.5,Lo=1,Eo=.5,rh=[0,.4,0];function Ts(s,e="floor"){if(e==="eyes")return{eye:[0,0,0],target:[s[0],0,Math.min(s[2],-Eo)]};let t=L.create().set(s[0],0,s[2]);t.len>Eo?t.normalize():t.copy(z.FORWARD);let r=t.dot(s)+Lo;return{eye:[s[0]-t[0]*r,s[1],s[2]-t[2]*r],target:[s[0],s[1],s[2]]}}var Qr=class{#e=Z.create();#r=L.create();#t=L.create();#i=null;#s;#n;#o;#c=!1;#a=!1;#h=!1;#l=null;#p=null;constructor(e,t="orbit"){this.#o=e,this.#s=new Ss,this.#n=_s(t,this.#s,e),this.#d()}get canPresent(){return this.#c}get view(){return this.#s}get controls(){return this.#n}get controlsType(){return this.#n.type}setControls(e){e!==this.#n.type&&(this.#n.dispose(),this.#n=_s(e,this.#s,this.#o),this.reset(),this.#n.applyConstraints(this.#a))}setSceneTransform(e,t="floor"){e?this.#e.fromTransform(e):this.#e.identity(),this.#a=!!e,this.#h=!!e&&t==="eyes",this.#n.applyConstraints(this.#a),this.#c=!1}setAudioPosition(e){e?this.#r.fromXYZ(e):this.#r.set(0,0,0)}setSceneCenter(e){this.#i=e?L.create().fromXYZ(e):null,this.#c=!1}setBBox(e){if(!e)return;let t=this.#i??Ar.center(this.#t,e),r=this.#e.pointTo(this.#t,t),{eye:i,target:n}=Ts(r,this.#h?"eyes":"floor");this.#l=n,this.#p=i,this.#n.frame(n,i),this.#c=!0}update(e){this.#n.update(e)}apply(e,t,r){e.setModelMatrix(this.#e),t>0&&r>0&&(this.#s.aspect=t/r,this.#s.updateProjectionMatrix()),e.setCamera(this.#s.matrixWorld,this.#s.projectionMatrix),this.#c&&(e.setAudioSourceMatrix(this.#e,this.#r),e.setAudioListenerMatrix(this.#s.matrixWorld))}zoom(e){this.#n.zoom(e)}reset(){this.#l&&this.#p?(this.#n.frame(this.#l,this.#p),this.#c=!0):this.#d()}dispose(){this.#n.dispose()}#d(){this.#n.reset(rh,{x:0,y:th,z:Lo}),this.#c=!1}};var er={daylight:{ambient:[3.62,3.54,3.37],topDown:[.5,.45,.4]},cloudy:{ambient:[3.19,3.26,3.44],topDown:[.05,.05,.07]},sunset:{ambient:[4.08,3.01,1.95],topDown:[.25,.12,.02],frontBack:[.15,.06,0],leftRight:[-.3,-.12,0]},indoor:{ambient:[3.72,3.37,2.84],topDown:[.3,.25,.15]},shade:{ambient:[3.12,3.3,3.72],topDown:[.1,.15,.3]},night:{ambient:[2.48,2.66,3.01],topDown:[.08,.1,.15]},off:null};function ih(s,e){if(s[14]/e-s[10]>-.5)return s;let t=Float32Array.from(s);for(let r of[2,6,10,14])t[r]=(s[r]+s[r+1])/2;return t}var jr=class{#e;#r;#t;#i;#s;#n=null;#o;#c;#a;#h;#l;#p=null;#d=!1;#u=!1;#f=!1;#m=null;#g=0;onFrame=null;onBeforeRender=null;onBeforeEyeRender=null;onEyeRender=null;onASWRender=null;onViewsRender=null;onRefReset=null;onSessionEnd=null;externalLayers=[];constructor(e,t,{backend:r="webgl",ensureGL:i=null}={}){this.#e=e,this.#r=t,this.#o=r,this.#c=i}get session(){return this.#t}get active(){return!!this.#t}get aswAvailable(){return!!this.onASWRender}get aswActive(){return this.#d&&!!this.#t}get layeredActive(){return this.#u&&!!this.#t}get isAR(){return this.#f&&!!this.#t}get defaultDt(){return 1/(this.#d?36:72)}get binding(){return this.#s??this.#n}get api(){return this.#t?this.#n?"webgpu":"webgl":null}get gpu(){let e=this.#n;return e?{device:this.#e.device,format:e.getPreferredColorFormat()}:null}get refSpace(){return this.#i}set soundPosition(e){this.#m=e?[e.x,e.y,e.z]:null}async enter(e=!1){if(!navigator.xr||this.#t)return{isQuest:!1,isPico:!1,isAVP:!1};this.#f=e;let t=navigator.userAgent,r=/PicoBrowser/i.test(t),i=/OculusBrowser/i.test(t)&&!r,n=/Version\//.test(t)&&/Safari\//.test(t)&&!i&&!r;if(this.#t=await navigator.xr.requestSession(e?"immersive-ar":"immersive-vr",{...this.#o==="webgpu"&&{requiredFeatures:["webgpu"]},optionalFeatures:[this.#o==="auto"&&"webgpu","local-floor",e&&"local",i&&"layers",i&&"space-warp",(i||r)&&"hand-tracking"].filter(Boolean)}),!this.#t)throw new Error(`Failed to start ${e?"AR":"VR"} session`);let a=new Set(this.#t.enabledFeatures??[]);for(let c of["local-floor","local","viewer"])try{this.#i=await this.#t.requestReferenceSpace(c);break}catch{}this.#i?.addEventListener("reset",()=>this.onRefReset?.()),this.#u=this.#d=!1;let o=r?.75:1,l={isQuest:i,isPico:r,isAVP:n};if(a.has("webgpu"))return this.#y(a,o,l);let h=this.#r??=this.#c?.()??null;if(!h)throw new Error("WebGL context required for this XR session");if(this.#p=h.getExtension("OCULUS_multiview")||h.getExtension("OVR_multiview2")||null,a.has("layers"))try{h.getExtension("EXT_color_buffer_half_float"),this.#s=new XRWebGLBinding(this.#t,h),this.#a=this.#s.createProjectionLayer({textureType:"texture-array",depthFormat:h.DEPTH_COMPONENT24,scaleFactor:o,clearOnAccess:!1}),this.#u=!0,this.#d=a.has("space-warp"),!this.#d&&this.#a.fixedFoveation!==void 0&&(this.#a.fixedFoveation=1),await this.#t.updateRenderState({layers:[this.#a]}),this.#h=h.createFramebuffer(),this.#d&&(this.#l=h.createFramebuffer())}catch{this.#u=this.#d=!1,this.#s=this.#a=null}if(!this.#u){let c=new XRWebGLLayer(this.#t,h,{framebufferScaleFactor:o,...e&&{alpha:!0}});c.fixedFoveation!==void 0&&(c.fixedFoveation=1),await this.#t.updateRenderState({baseLayer:c})}return this.#v(),l}async#y(e,t,r){return this.#n=new XRGPUBinding(this.#t,this.#e.device),this.#d=e.has("space-warp"),this.#a=this.#n.createProjectionLayer({colorFormat:this.#n.getPreferredColorFormat(),...this.#d&&{depthStencilFormat:"depth24plus"},scaleFactor:t}),!this.#d&&this.#a.fixedFoveation!==void 0&&(this.#a.fixedFoveation=1),this.#u=!0,await this.#t.updateRenderState({layers:[this.#a]}),this.#v(),r}#v(){this.#e.resetXR(),this.#t.addEventListener("end",()=>this.#M()),this.#g=0,this.#t.requestAnimationFrame(this.#_)}#_=(e,t)=>{let r=this.#t;if(!r)return;r.requestAnimationFrame(this.#_);let i=S.deltaSeconds(e,this.#g,this.defaultDt,4*this.defaultDt);this.#g=e,this.onFrame?.(i,t)};exit(){this.#t?.end()}renderFrame(e,t,r=1){let i=this.#e,n=this.#r,a=t.getViewerPose(this.#i);if(!a||a.views.length<1)return;let o=this.#b(a);if(!this.#f&&o.length<2){this.#w(i,a,r);return}if((o.length>=2||this.#f)&&(this.onBeforeRender?.(e,t,this.#i,a,t.session.inputSources,i),this.#P()),this.#n){this.#S(i,o,t),this.#w(i,a,r);return}let l=o[1]??null;i.setCamera(o[0].transform.matrix,o[0].projectionMatrix,l?.transform.matrix,l?.projectionMatrix),this.#d?this.#T(n,i,o):this.#u?this.#x(n,i,o):this.#C(n,i,o,t),this.#w(i,a,r)}#w(e,t,r){let i=this.#m;if(!i){let a=e.getBBox();a&&(i=[(a.minX+a.maxX)*.5,(a.minY+a.maxY)*.5,(a.minZ+a.maxZ)*.5])}let n=e.getModelMatrix();i&&n&&e.setAudioSourceMatrix(n,i,r),e.setAudioListenerMatrix(t.transform.matrix)}#P(){!this.#t||!this.#u||this.#t.updateRenderState({layers:[this.#a,...this.externalLayers]})}#M=()=>{if(!this.#t)return;let e=this.#r;this.#n=null,this.#h&&(e.deleteFramebuffer(this.#h),this.#h=null),this.#l&&(e.deleteFramebuffer(this.#l),this.#l=null),this.#t=this.#i=this.#a=this.#s=null,this.#d=this.#u=this.#f=!1,this.#g=0,this.externalLayers=[],this.onSessionEnd?.()};#b(e){if(e.views.length<2)return[e.views[0]];let t=e.views.find(i=>i.eye==="left")||e.views[0],r=e.views.find(i=>i.eye==="right")||e.views[1];return[t,r]}#S(e,t,r){this.#d&&(this.#a.deltaPose=null);let i=this.#t.renderState.depthNear,n=t.map(a=>({view:a,projection:ih(a.projectionMatrix,i),sub:this.#n.getViewSubImage(this.#a,a)}));e.renderXR(n,this.#f?0:1,this.#d),this.onViewsRender?.(n,r)}#E(e,t){e.bindFramebuffer(e.FRAMEBUFFER,t),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.clearColor(0,0,0,this.#f?0:1)}#R(e,t,r,i,n,a,o,l,h,c=e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT){e.viewport(n,a,o,l),e.clear(c),this.onBeforeEyeRender?.(e,r,i,n,a,o,l),t.render(t.drawMode,n,a,o,l,h),this.onEyeRender?.(e,r,i,n,a,o,l)}#C(e,t,r,i){let n=i.session.renderState.baseLayer,a=r.map(o=>n.getViewport(o));t.preprocess(a[0].width,a[0].height),e.bindFramebuffer(e.FRAMEBUFFER,n.framebuffer),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.clearColor(0,0,0,this.#f?0:1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.disable(e.DEPTH_TEST),e.depthMask(!1);for(let o=0;o<r.length;o++){let l=a[o];this.onBeforeEyeRender?.(e,n.framebuffer,r[o],l.x,l.y,l.width,l.height),t.render(t.drawMode,l.x,l.y,l.width,l.height,o),this.onEyeRender?.(e,n.framebuffer,r[o],l.x,l.y,l.width,l.height)}}#x(e,t,r){let i=r.map(o=>this.#s.getViewSubImage(this.#a,o)),n=i[0].colorTextureWidth,a=i[0].colorTextureHeight;t.preprocess(n,a),this.#E(e,this.#h);for(let o=0;o<r.length;o++){let l=i[o],h=l.imageIndex??o;e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.colorTexture,0,h),l.depthStencilTexture&&e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,h),this.#R(e,t,this.#h,r[o],0,0,n,a,o)}e.bindFramebuffer(e.FRAMEBUFFER,null)}#T(e,t,r){let i=r.map(c=>this.#s.getViewSubImage(this.#a,c)),n=i[0].colorTextureWidth,a=i[0].colorTextureHeight,o=i.map((c,u)=>c.imageIndex??u);this.#a&&(this.#a.deltaPose=null),t.preprocess(n,a),this.#E(e,this.#h);for(let c=0;c<r.length;c++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[c].colorTexture,0,o[c]),this.#R(e,t,this.#h,r[c],0,0,n,a,c,e.COLOR_BUFFER_BIT);let l=i[0];if(l.motionVectorTexture&&l.depthStencilTexture){let c=l.motionVectorTextureWidth,u=l.motionVectorTextureHeight,p=t.canMotion();if(e.bindFramebuffer(e.FRAMEBUFFER,this.#l),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),e.clearColor(0,0,0,0),e.clearDepth(1),this.#p&&o.length>=2&&o[1]===o[0]+1&&t.hasMultiview())this.#p.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.motionVectorTexture,0,o[0],2),this.#p.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,o[0],2),e.viewport(0,0,c,u),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),p&&t.renderMotionMV(0,0,c,u);else for(let m=0;m<r.length;m++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[m].motionVectorTexture,0,o[m]),e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,i[m].depthStencilTexture,0,o[m]),e.viewport(0,0,c,u),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),p&&t.render(3,0,0,c,u,m);let f=(m,d,g)=>({view:m,colorTex:d.colorTexture,colorIdx:g,mvTex:d.motionVectorTexture,mvIdx:g,depthTex:l.depthStencilTexture,w:n,h:a,mvW:c,mvH:u});this.onASWRender?.(e,r.map((m,d)=>f(m,i[d],o[d])))}else this.onASWRender?.(e,r.map((c,u)=>({view:c,colorTex:i[u].colorTexture,colorIdx:o[u],w:n,h:a})));e.bindFramebuffer(e.FRAMEBUFFER,null)}};var Ps=Z.create().fromScaling(z.FLIP_Z),Ms=Z.create().copy(Ps).multiply(Z.create().fromTranslation([0,1,-1])),sh=.04,nh=.5,oh=1,ah=Math.PI/6,se=L.create(),tr=L.create(),Ro=L.create(),Kr=de.create(),ko=Z.create(),Jr=class{#e=L.create();#r=de.create();#t=1;#i=L.create();#s=Z.clone(Ms);#n=Z.clone(Ms);#o=null;#c=!1;#a=!1;#h=Z.create();#l=Z.create();#p="none";#d=L.create();#u={mid:L.create(),dist:0,axX:0,axZ:0};#f="undecided";#m=0;#g=0;#y=!1;#v=!1;#_=!1;get position(){return this.#e}get scale(){return this.#t}get sceneTransform(){return this.#s}get scaleLocked(){return this.#y}set scaleLocked(e){this.#y=!!e}setCenter(e,t,r){this.#i.set(e,t,r)}setSceneTransform(e,t="floor"){this.#o=e,this.#c=!!e&&t==="eyes",this.#a=this.#c,this.#w(e?Ps:Ms)}resetToInitial(){this.#e.set(0,0,0),this.#t=1,this.#r.identity(),this.reanchor()}reanchor(){this.#a=this.#c}anchor(e){return!this.#a||!e?!1:(this.#a=!1,se.copy(z.FORWARD).transformQuat(Kr.fromXYZW(e.orientation)),Kr.setAxisAngle(z.Y,Math.atan2(-se[0],-se[2])),ko.fromQuat(Kr).setPosition(se.fromXYZ(e.position)).preMultiply(Ps),this.#w(ko),!0)}#w(e){this.#n.copy(e),this.#o?this.#s.fromTransform(this.#o).preMultiply(e):this.#s.copy(e)}reset(){this.#p="none"}isHeld(e){return this.#p==="dual"||this.#p===e}update(e,t,r,i,n=!0,a=null){for(let p of r)this.#S(p,i,a);let o=e.gripTransform?.position,l=t.gripTransform?.position,h=n&&e.active&&e.gripping&&!!o,c=n&&t.active&&t.gripping&&!!l,u=h&&e.grabRestart||c&&t.grabRestart;h&&c?this.#b(o,l,u):h?this.#M("left",o,u):c?this.#M("right",l,u):this.reset()}buildModelMatrix(){return this.#P(this.#h,this.#s)}buildRoomMatrix(){return this.#P(this.#l,this.#n)}#P(e,t){return se.copy(this.#i).transformMat4(this.#s),tr.set(this.#t,this.#t,-this.#t),e.fromPivot(this.#e,this.#r,tr,se,t)}#M(e,t,r){if(r||this.#p!==e){this.#p=e,this.#d.fromXYZ(t);return}if(se.fromXYZ(t).sub(this.#d),se.sqrLen>.01){this.#d.fromXYZ(t);return}this.#e.add(se),this.#d.fromXYZ(t)}#b(e,t,r){se.midXYZ(e,t);let i=tr.fromXYZ(e).distanceXYZ(t),n=i||1,a=(t.x-e.x)/n,o=(t.z-e.z)/n,l=this.#u;if(r||this.#p!=="dual"){this.#p="dual",l.mid.copy(se),l.dist=i,l.axX=a,l.axZ=o,this.#f="undecided",this.#m=0,this.#g=0;return}let h=0;l.dist>.03&&i>.03&&(h=S.absLogRatio(i,l.dist));let c=l.axX,u=l.axZ;l.axX=a,l.axZ=o;let p=S.unlerp01(Math.min(Math.hypot(c,u),Math.hypot(a,o)),.08,.33),f=0;if(p>0&&(f=S.wrapPi(Math.atan2(o,a)-Math.atan2(u,c))*p),this.#f==="undecided"){this.#y||(this.#m+=h),this.#g+=Math.abs(f);let m=sh;(this.#m>=m||this.#g>=m)&&(this.#f=this.#m>=this.#g?"scale":"rotate")}if(this.#f==="scale"&&!this.#y&&l.dist>.03&&i>.03){let m=this.#t;this.#t=S.clamp(m*(i/l.dist),.01,100);let d=this.#t-m;tr.copy(this.#i).transformMat4(this.#s),this.#e.add(Ro.copy(tr).multiplyXYZ(-d,-d,d))}this.#f==="rotate"&&S.outside(f,5e-4)&&this.#r.rotatePre(z.Y,f),this.#e.add(Ro.sub(se,l.mid)),l.mid.copy(se),l.dist=i}#S(e,t,r){let i=e.gamepad;if(!i?.axes||i.axes.length<2)return;let n=i.axes.length>=4?2:0;this.#E(i.axes[n],-i.axes[n+1],t,r);let a=i.buttons?.[3]?.pressed??!1;e.handedness==="left"?(a&&!this.#v&&this.resetToInitial(),this.#v=a):(a&&!this.#_&&this.resetToInitial(),this.#_=a)}#E(e,t,r,i){if(!(Math.hypot(e,t)<=nh)){if(Math.abs(t)<=Math.abs(e)){this.#r.rotatePre(z.Y,-Math.sign(e)*ah*r);return}i&&(se.copy(z.FORWARD).transformQuat(Kr.fromXYZW(i.orientation)).multiplyXYZ(1,0,1).normalize(z.FORWARD),this.#e.addScaled(se,-t*oh*r))}}};var ei=class{on=!1;#e=-1;update(e){this.#e<0?this.#e=e:this.#e=e>this.#e?e:(this.#e+e)*.5,this.on=this.#e<(this.on?.018:.015)}reset(){this.on=!1,this.#e=-1}},ti=class s{static#e=30;static#r=300;static#t=.02;#i=L.create();#s=!1;#n=0;#o=null;tapped=!1;update(e,t){if(this.tapped=!1,e&&!this.#s)this.#n=performance.now(),this.#o=t?{x:t.x,y:t.y,z:t.z}:null;else if(!e&&this.#s){let r=performance.now()-this.#n,i=this.#o,n=i&&t?this.#i.fromXYZ(t).distanceXYZ(i):0;r>=s.#e&&r<=s.#r&&n<s.#t&&(this.tapped=!0)}this.#s=e}reset(){this.#s=!1,this.tapped=!1,this.#o=null}},ri=class s{static#e=30;static#r=300;#t=!1;#i=0;tapped=!1;update(e){if(this.tapped=!1,e&&!this.#t)this.#i=performance.now(),this.#t=!0;else if(!e&&this.#t){let t=performance.now()-this.#i;t>=s.#e&&t<=s.#r&&(this.tapped=!0),this.#t=!1}}reset(){this.#t=!1,this.tapped=!1}},ii=class{#e=[!1,!1];update(e){if(!e||e.length<=6)return 0;let t=e[5]?.pressed??!1,r=e[6]?.pressed??!1,i=t&&!this.#e[0]?-1:r&&!this.#e[1]?1:0;return this.#e[0]=t,this.#e[1]=r,i}reset(){this.#e[0]=this.#e[1]=!1}},si=class{#e;left={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};right={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};stickSrcs=[];#r=null;#t=null;#i;#s;#n;#o;#c=new ri;#a=new ri;constructor({directGrab:e=!1}={}){this.#o=e,this.#e=de.create().setAxisAngle(z.X,-.8),this.#s=L.create(),this.#n=de.create(),this.#i=new Map([[this.left,{side:"left",pinch:new ei,tap:new ti,swipe:new ii,smooth:L.create(),smoothActive:!1,rayPos:L.create(),rayOri:de.create(),rayActive:!1}],[this.right,{side:"right",pinch:new ei,tap:new ti,swipe:new ii,smooth:L.create(),smoothActive:!1,rayPos:L.create(),rayOri:de.create(),rayActive:!1}]])}#h(e){e.active=e.gripping=e.isHandProfile=e.grabRestart=e.triggerPressed=e.menuPressed=e.isTransientPointer=!1,e.microSwipe=0,e.rayTransform=e.gripTransform=e.indexTip=e.thumbTip=null}read(e,t,r,i){this.#h(this.left),this.#h(this.right),this.stickSrcs.length=0;let n=null,a=null;for(let o of r||[]){if(o.targetRayMode==="transient-pointer"){let h=e.getPose(o.targetRaySpace,t);if(!h)continue;let u=((o.gripSpace?e.getPose(o.gripSpace,t):null)??h).transform,p=this.#l(o,u.position,n,a);this.#p(p,h.transform,u,o,i),p===this.left?n=o:a=o;continue}o.gripSpace&&!o.hand&&o.gamepad?.axes?.length>=2&&!o.profiles?.some(h=>h.includes("hand"))&&this.stickSrcs.push(o);let l=o.handedness==="left"?this.left:o.handedness==="right"?this.right:null;!l||l.active||(o.hand?this.#d(l,o,e,t,i):o.gripSpace&&this.#u(l,o,e,t,i))}this.#r=n,this.#t=a,(n||a)&&(this.stickSrcs.length=0,n||(this.left.gripping=!1),a||(this.right.gripping=!1)),i.uiActive?(this.#c.reset(),this.#a.reset()):(this.#c.update(!!n),this.#a.update(!!a)),this.#c.tapped&&(this.left.menuPressed=!0),this.#a.tapped&&(this.right.menuPressed=!0);for(let[o,l]of this.#i)o.indexTip||(l.pinch.reset(),l.tap.reset(),l.swipe.reset(),l.smoothActive=!1,l.rayActive=!1)}#l(e,t,r,i){if(e.handedness==="left")return this.left;if(e.handedness==="right")return this.right;if(r&&!i)return this.right;if(i&&!r)return this.left;let n=this.left.gripTransform?.position,a=this.right.gripTransform?.position,o=n?this.#s.fromXYZ(t).distanceXYZ(n):1/0,l=a?this.#s.fromXYZ(t).distanceXYZ(a):1/0;return o<=l?this.left:this.right}#p(e,t,r,i,{isHeld:n,hitTest:a,uiActive:o}){e.rayTransform=t,e.gripTransform=r,e.active=e.triggerPressed=e.isTransientPointer=!0;let{side:l}=this.#i.get(e),h=l==="left"?this.#r:this.#t,c=h!=null&&h!==i,u=h===i;!c&&n(l)?e.gripping=!0:o||(this.#o&&u||!this.#o&&a&&a(t)||n(l==="left"?"right":"left"))&&(e.gripping=!0,c&&(e.grabRestart=!0))}#d(e,t,r,i,{isHeld:n,uiActive:a,viewerPose:o}){let l=t.hand.get("wrist");if(!l)return;let h=r.getJointPose?.(l,i);if(!h)return;e.gripTransform=h.transform;let c=this.#f(t.hand,"index-finger-tip",r,i),u=this.#f(t.hand,"thumb-tip",r,i),p=this.#f(t.hand,"index-finger-phalanx-proximal",r,i);c&&(e.indexTip=c.transform.position),u&&(e.thumbTip=u.transform.position);let f=this.#i.get(e);if(p){this.#n.fromXYZW(h.transform.orientation).mul(this.#e);let d=f.rayPos,g=f.rayOri;f.rayActive?(d.lerp(this.#s.fromXYZ(p.transform.position),.5),g.slerp(this.#n,.5)):(d.fromXYZ(p.transform.position),g.copy(this.#n),f.rayActive=!0),e.rayTransform={position:d.toXYZ(),orientation:g.toXYZW()}}else e.rayTransform=c?.transform??null,f.rayActive=!1;if(c&&u){let d=c.transform.position,g=u.transform.position;f.pinch.update(this.#s.fromXYZ(d).distanceXYZ(g)),e.gripping=e.triggerPressed=f.pinch.on}else{f.pinch.reset();let d=t.gamepad?.buttons?.[0];e.gripping=d?d.pressed||d.value>.5:!1,e.triggerPressed=e.gripping}a?(f.tap.reset(),n(f.side)||(e.gripping=!1)):(f.tap.update(f.pinch.on,h.transform.position),f.tap.tapped&&(e.menuPressed=!0)),e.gripping&&!n(f.side)&&!this.#g(h.transform.position,o)&&(e.gripping=!1),e.active=!0,e.microSwipe=f.swipe.update(t.gamepad?.buttons);let m=f.smooth;f.smoothActive||(m.fromXYZ(h.transform.position),f.smoothActive=!0),m.lerp(this.#s.fromXYZ(h.transform.position),.4),e.gripTransform={position:m.toXYZ(),orientation:h.transform.orientation}}#u(e,t,r,i,{isHeld:n,uiActive:a,viewerPose:o}){let l=r.getPose(t.gripSpace,i);l&&(e.gripTransform=l.transform);let h=r.getPose(t.targetRaySpace,i);if(h&&(e.rayTransform=h.transform),!e.gripTransform&&!e.rayTransform)return;if(e.isHandProfile=t.profiles?.some(p=>p.includes("hand"))??!1,t.targetRayMode==="tracked-pointer"&&t.gamepad?.buttons?.[0]){let p=t.gamepad.buttons[0],f=p.pressed||p.value>.5;e.gripping=e.isHandProfile?f:t.gamepad?.buttons?.[1]?.pressed??!1}else e.gripping=t.gamepad?.buttons?.[1]?.pressed??!1;e.triggerPressed=t.gamepad?.buttons?.[0]?.pressed??!1;let c=t.gamepad?.buttons;e.menuPressed=!!(c?.[4]?.pressed||c?.[5]?.pressed||c?.[12]?.pressed);let{side:u}=this.#i.get(e);e.isHandProfile&&e.gripping&&!n(u)&&(a||!this.#g(e.gripTransform?.position,o))&&(e.gripping=!1),e.gripping&&!e.gripTransform&&(e.gripping=!1),e.active=!0,e.isHandProfile&&e.rayTransform&&(e.rayTransform=this.#m(e.rayTransform.orientation,e.rayTransform.position))}#f(e,t,r,i){let n=e.get(t);return n?r.getJointPose?.(n,i)??null:null}#m(e,t){return this.#n.fromXYZW(e).mul(this.#e),{position:t,orientation:this.#n.toXYZW()}}#g(e,t){if(!t||!e)return!0;let r=t.position;this.#s.subXYZ(e,r).transformQuat(this.#n.fromXYZW(t.orientation).invert());let i=this.#s.xzLen;return i<.05||this.#s.y>-1.19*i}};var gt=class{#e;#r;#t;#i;#s=!0;#n=!1;#o=!1;#c=!1;#a=!1;constructor(e,t=null,{directGrab:r=!1}={}){this.#e=e,this.#r=t,this.#t=new si({directGrab:r}),this.#i=new Jr}setOverlay(e){this.#r=e,this.#s=!0}get#h(){return this.#r?this.#r.hasBBox:this.#n}reset(){this.#i.reset(),this.#c=this.#a=!1}invalidateBBox(){this.#s=!0}setInitialTransform(e,t){this.#i.setSceneTransform(e,t),this.#s=!0,this.#l()}reanchor(){this.#i.reanchor()}get scene(){return this.#r?.scene??null}get scale(){return this.#i.scale}get roomMatrix(){return this.#i.buildRoomMatrix()}get leftHand(){return this.#t.left}get rightHand(){return this.#t.right}get locked(){return this.#o}set locked(e){this.#o=!!e,this.#o&&this.#i.reset()}get scaleLocked(){return this.#i.scaleLocked}set scaleLocked(e){this.#i.scaleLocked=e}resetToInitial(){this.#i.resetToInitial(),this.#i.reset()}update(e,t,r,i,n,a=!1){let o=t.getViewerPose(r);this.#i.anchor(o?.transform??null)&&(this.#s=!0),this.#t.read(t,r,i,{isHeld:c=>this.#i.isHeld(c),hitTest:c=>this.#r?.hitTest(c)??!1,uiActive:n,viewerPose:o?.transform??null}),(this.#s||!this.#h)&&this.#p();let l=this.#t.left,h=this.#t.right;if(l.held=h.held=!1,!this.#o){this.#i.update(l,h,this.#t.stickSrcs,e,this.#h&&!a,o?.transform??null);let c=this.#i.isHeld("left"),u=this.#i.isHeld("right");l.held=c&&this.#c,h.held=u&&this.#a,this.#c=c,this.#a=u}this.#l()}#l(){this.#h&&this.#r?.applyTransform(this.#i.position,this.#i.scale),this.#e.setModelMatrix?.(this.#i.buildModelMatrix())}#p(){let e=this.#e.getBBox?.();if(!e)return;let t,r,i;this.#r?{cx:t,cy:r,cz:i}=this.#r.rebuildBBox(e,this.#i.sceneTransform):(t=(e.minX+e.maxX)/2,r=(e.minY+e.maxY)/2,i=(e.minZ+e.maxZ)/2,this.#n=!0),this.#i.setCenter(t,r,i),this.#s=!1}};function Ao(){let s=document.createElement("canvas");return s.style.display="block",s.style.width="100%",s.style.height="100%",s.style.touchAction="none",s}var Io=s=>s.getContext("webgpu"),yt=class s{#e=null;#r;#t=null;#i=null;#s=null;#n=null;#o=0;#c=0;#a=null;#h=null;#l=new Kt;#p=null;#d=!1;#u=!1;#f=0;#m="pw";#g="pw";#y=null;#v=!1;#_={};#w="auto";#P=!1;#M=null;#b=null;#S=null;#E=null;#R=!1;#C=[];#x=-1;#T=null;#A="orbit";onProgress=null;onReady=null;onError=null;onFrame=null;onBeforeFrame=null;onModeChange=null;onSceneChange=null;onSceneEnd=null;static async create(e,{container:t,overlay:r=null,boundaryRenderer:i=null,mode:n="pw",xrBackend:a="auto"}={}){if(!t)throw new Error("container element required");if(!navigator.gpu)throw new Error("WebGPU not available");let o=new s;o.#a=r,o.#h=i,r&&(r.onSceneChange=(h,c)=>o.loadScene(c),i&&(r.onBoundaryToggle=h=>o.setBoundaryVisible(h))),navigator.xr&&(o.#_.vr=await navigator.xr.isSessionSupported("immersive-vr").catch(()=>!1),o.#_.ar=await navigator.xr.isSessionSupported("immersive-ar").catch(()=>!1)),o.#w=a,o.#P=a!=="webgl"&&"XRGPUBinding"in globalThis;let l=n==="hw"?"hw":n==="vr"||n==="ar"?n:"pw";return o.#r=Ao(),t.appendChild(o.#r),o.#e=await dt.create(e,{canvas:o.#r,backend:o.#J(l),xrCompatible:o.#P}),o.#te(),await o.#V(l),o.#F(l),o}get player(){return this.#e}get camera(){return this.#i}get canvas(){return this.#r}get gl(){return this.#e?.gl??null}get audioContext(){return this.#e?.audioContext??null}get device(){return this.#e?.device??null}get mode(){return this.#m}get fallbackMode(){return this.#g}get xr(){return this.#s}get manipulator(){return this.#n}get drawMode(){return this.#e.drawMode}set drawMode(e){this.#e.drawMode=e}get xrBackend(){return this.#s?.api??(this.#P?"webgpu":"webgl")}supports(e){return e==="pw"||e==="hw"?!0:!!this.#_[e]&&(this.#w!=="webgpu"||this.#P)}set sources(e){this.#C=e??[],this.#x=Math.min(this.#x,Math.max(0,this.#C.length-1)),this.#a&&(this.#a.sources=this.#C)}get sources(){return this.#C}get sceneIndex(){return this.#x}loadScene(e){let t=this.#C;if(e<0||e>=t.length)return;let r=t[e];this.#x=e,this.#b=null,this.#D(r);let i=r.staticTransform??null,n=r.staticUrl??null;this.#Q(async a=>{if(n){let o=new File([await(await fetch(n)).arrayBuffer()],"static.sog");if(!a()||(await this.#e.open({file:o,type:"static"}),!a()))return}await this.#e.open(r),a()&&i&&this.#X(i)}),this.#a&&(this.#a.sceneIndex=e),this.onSceneChange?.(r,e)}start(){this.#d=!0,this.#B()}stop(){this.#d=!1,this.#I()}open(e){return this.#D(e),this.#Q(()=>this.#e.open(e))}#D(e){this.#T=e,this.setInitialTransform(e.initialTransform??null),this.setBackground(e.background??"#000"),e.controls&&this.setControls(e.controls),this.setBounds(e.bounds??null),this.setAudioPosition(e.audioPosition??null),this.setSceneCenter(e.sceneCenter??null),e.slowMo||this.#e.setSpeed(1),this.#n&&(this.#n.locked=e.locked??this.#n.locked,this.#n.scaleLocked=e.scaleLocked??this.#n.scaleLocked)}close(){++this.#f,this.#z(),this.#e.close(),this.#u=!1,this.#d=!1;let e=this.#m,t=this.#g,r=t!=="pw"?"hybrid":"pure";r!==this.#e.backend&&this.#j(r),this.#U(),this.#F(t),t!==e&&this.onModeChange?.(t,e)}async setMode(e){if(this.#y=e,!this.#v){this.#v=!0;do e=this.#y,this.#y=null,e!==this.#m&&await this.#k(e);while(this.#y!=null);this.#v=!1}}async#k(e){let t=this.#m;await this.#Y();try{await this.#q(e)}catch(r){if(e===this.#g)throw r;this.onError?.(r),await this.#q(this.#g)}this.#m!==t&&this.onModeChange?.(this.#m,t)}setAudio(e){this.#e.loadAudio(e)}setVolume(e){this.#e?.setVolume(e)}enableAudio(){this.#e?.enableAudio()}disableAudio(){this.#e?.disableAudio()}get audioEnabled(){return this.#e?.audioEnabled??!1}setAudioPanner(e){this.#e?.setAudioPanner(e)}setBackground(e){this.#r&&(this.#r.style.background=e||"#000")}setInitialTransform(e,t=null){this.#M=e??null,this.#i?.setSceneTransform(this.#M,this.#T?.origin),this.#n&&(this.#n.setInitialTransform(this.#M,this.#T?.origin),!this.#u&&this.#T?.resetPositionOnStart!==!1&&this.#n.resetToInitial()),t?.translation&&t.rotation&&t.scale&&this.#X(t)}#X(e){this.#e?.setStaticModelMatrix(Z.create().fromTransform(e))}reset(){this.#i?.reset()}setControls(e){this.#A=e,this.#i?.setControls(e)}setBounds(e){this.#l.setBounds(e),this.#h?.sync(this.#l)}setBoundaryVisible(e){this.#l.setHidden(!e),this.#h?.sync(this.#l),this.#a&&(this.#a.boundaryVisible=e)}setAudioPosition(e){this.#S=e??null,this.#i?.setAudioPosition(this.#S),this.#s&&(this.#s.soundPosition=this.#S)}setSceneCenter(e){this.#E=e??null,this.#i?.setSceneCenter(this.#E)}dispose(){++this.#f,this.#z(),this.#t?.disconnect(),this.#e?.dispose()}async#V(e){if(e==="vr"||e==="ar"){if(!this.supports(e))throw new Error(`${e.toUpperCase()} not supported`);await this.#H(e==="ar")}else if(e==="pw"||e==="hw")this.#U();else throw new Error(`Unknown mode: ${e}`)}#U(){let e=new Qr(this.#r,this.#A);this.#i=e,this.#e.backend==="pure"&&(this.#e.drawMode=0),e.setSceneTransform(this.#M,this.#T?.origin),e.setAudioPosition(this.#S),e.setSceneCenter(this.#E),this.#b&&e.setBBox(this.#b),this.#l.reset(ms)}async#H(e){let t=new jr(this.#e,this.#e.gl,{backend:this.#P?this.#w:"webgl",ensureGL:()=>(this.#e.backend!=="hybrid"&&this.#j("hybrid"),this.#e.gl)});t.soundPosition=this.#S,t.onSessionEnd=()=>{this.#L(),this.#s===t&&(this.#s=null,this.#n=null,this.setMode(this.#g))};let r=null;try{let i=await t.enter(e),n=this.#T;r=new gt(this.#e,null,{directGrab:i.isAVP}),r.locked=n?.locked??!1,r.scaleLocked=n?.scaleLocked??!0,r.setInitialTransform(this.#M,n?.origin),this.#l.reset(mt).queueIntro(),this.#h?.init(this.#e.gl,t.gpu);let a=this.#a;a&&(a.manipulator=r,await a.init(this.#e,t.session,t.binding,t.refSpace,this.#e.gl,e,t.gpu),t.onASWRender=(l,h)=>a.render(l,h)),t.onRefReset=()=>{r.reanchor(),a?.onRefReset?.()},t.onBeforeEyeRender=(l,h,c,u,p,f,m)=>this.#h?.renderUnderlay(l,h,c,u,p,f,m),t.onEyeRender=(l,h,c,u,p,f,m)=>{this.#h?.renderEye(l,h,c,u,p,f,m),a?.renderEye(l,h,c,u,p,f,m)},t.onViewsRender=(l,h)=>{this.#h?.renderViews?.(l),a?.renderViews?.(l,h)};let o=r;t.onBeforeRender=(l,h,c,u,p,f)=>{if(o.update(l,h,c,p,a?.uiActive??!1,a?.uiDragging??!1),this.#G(l,u.transform.position,o.roomMatrix),a){a.frame(l,h,c,u,p,f);let m=[];for(let d of a.quads??[])d.layer&&(d.visible||d.placing)&&m.push(d.layer);t.externalLayers=m}},t.onFrame=(l,h)=>{if(!this.#N(l))return;let c=o.scale;t.renderFrame(l,h,c!==1?1/c:1),this.#$()}}catch(i){throw this.#O(t),this.#L(),t.exit(),i}if(!t.session)throw this.#O(t),new Error("XR session ended during entry");this.#n=r,this.#s=t}#O(e){e.onFrame=null,e.onSessionEnd=null,e.onBeforeRender=null,e.onBeforeEyeRender=null,e.onEyeRender=null,e.onASWRender=null,e.onViewsRender=null,e.onRefReset=null}#L(){this.#a?.dispose(),this.#h?.dispose()}#G(e,t,r){let i=this.#h;i&&(this.#u||this.#l.setRoomMatrix(r).update(t,e),i.sync(this.#l))}#z(){this.#I(),this.#i?.dispose(),this.#i=null,this.#h?.dispose();let e=this.#s;e&&(this.#s=null,this.#n=null,this.#O(e),this.#L(),e.exit())}async#Y(){this.#I(),this.#i?.dispose(),this.#i=null,this.#h?.dispose();let e=this.#s;if(e){this.#s=null,this.#n=null,e.onFrame=null;try{await e.session?.end()}catch{}}}async#q(e){let t=this.#J(e);t!==this.#e.backend&&this.#j(t),await this.#V(e),(this.#d||this.#u)&&this.#B(),this.#F(e),this.#s||(this.#g=e)}#F(e){this.#m=e,this.#e.setViewMode(e==="vr"||e==="ar"?e:"2d")}#B(){this.#i&&!this.#o&&(this.#o=requestAnimationFrame(this.#Z))}#I(){this.#o&&cancelAnimationFrame(this.#o),this.#o=0,this.#c=0}#Z=e=>{this.#o=requestAnimationFrame(this.#Z);let t=S.deltaSeconds(e,this.#c,1/60);if(this.#c=e,!this.#N(t))return this.#I();let r=this.#i;if(!r)return this.#I();r.update(t);let{width:i,height:n}=this.#r;r.apply(this.#e,i,n),this.#ee(r.canPresent),this.#e.present(i,n),this.#G(t,r.view.position,null),this.#h?.renderOver(this.#r,r.view,this.#W),this.#$()};#W=()=>{if(!this.#e.hasStatic)return this.#r;let e=Math.max(1,this.#r.width>>2),t=Math.max(1,this.#r.height>>2);this.#p||(this.#p=new OffscreenCanvas(e,t),this.#e.configureSurface(Io(this.#p)));let r=this.#p;r.width!==e&&(r.width=e),r.height!==t&&(r.height=t);let i=Io(r).getCurrentTexture();return this.#e.renderDynamic({color:i,w:e,h:t})?r:null};#N(e){return this.#re(),!this.#d&&!this.#u?!1:(this.onBeforeFrame?.(e),!0)}#$(){this.#u&&this.onProgress?.(Math.round(this.#e.progress*100)),this.#K(),this.onFrame?.()}async#Q(e){let t=++this.#f,r=()=>t===this.#f;this.#I(),this.#e.clearVideo(),this.#e.clearEnvironment(),this.#b=null,this.#ee(!1),this.#u=!0,this.#R=!1;try{await e(r)}catch(i){if(!r())return;this.#u=!1,this.onError?.(i)}r()&&this.#B()}#K(){if(this.#R||!this.#e.ended)return;this.#R=!0;let e=this.#C[this.#x];this.onSceneEnd?.(e,this.#x),(e?.autoSwitchToNext??!0)&&this.#x<this.#C.length-1&&this.loadScene(this.#x+1)}#re(){if(!this.#b&&this.#e.isReady){let t=this.#e.getBBox();t&&(this.#b=t,this.#i?.setBBox(t))}let e=this.#i;if(e&&!e.canPresent&&this.#b&&e.setBBox(this.#b),!!this.#u){if(!this.#e.isReady){let t=this.#e.lastFetchStatus;t&&t!==200&&t!==206&&(this.#u=!1,this.onError?.(t));return}this.#u=!1,this.#e.play(),this.#n&&(this.#T?.resetPositionOnStart!==!1&&this.#n.resetToInitial(),this.#n.invalidateBBox()),this.onProgress?.(100),this.onReady?.()}}#J(e){return e==="hw"?"hybrid":e==="vr"||e==="ar"?this.#P?"pure":"hybrid":"pure"}#ee(e){this.#r.style.visibility=e?"visible":"hidden"}#j(e){this.#t?.disconnect();let t=Ao();this.#r.replaceWith(t),this.#r=t,this.#e?.setBackend(e,{canvas:t}),this.#te()}#te(){this.#t?.disconnect();let e=this.#r;this.#t=new ResizeObserver(([t])=>{if(!t)return;let r=S.clamp(devicePixelRatio||1,1,2),i=Math.round(t.contentRect.width*r),n=Math.round(t.contentRect.height*r);i>0&&n>0&&(e.width!==i||e.height!==n)&&(e.width=i,e.height=n)}),this.#t.observe(e)}};var ze=Object.freeze([1,.75,.5,.25]);var ni=class s{#e;#r;#t;#i=null;#s=null;#n=null;#o=null;#c=!1;enableMesh=!1;static attach(e,t,r){let i=new s(e,t,r);return i.#l(),i.#a(),i}constructor(e,t,r){this.#e=e,this.#r=t,this.#t=r}get player(){return this.#e}set camera(e){this.#t=e}get camera(){return this.#t}async setAudio(e){await this.#e.loadAudio(e)}setAudioPanner(e){this.#e.setAudioPanner(e)}set entity(e){if(this.#s?.node?.destroy(),this.#s=null,this.#i=e,!e)return;let t=new this.#r.root.constructor("_SplatShadow",this.#r);t.addComponent("render",{type:"box",castShadows:!0,receiveShadows:!1});let r=t.render.meshInstances[0];r.visible=!1,r.cull=!1,e.addChild(t),this.#s=r}get entity(){return this.#i}dispose(){this.#s?.node?.destroy(),this.#o&&(this.#r.renderer.setMeshInstanceMatrices=this.#o[0],this.#r.graphicsDevice.draw=this.#o[1]),this.#e.close(),this.#e.dispose()}#a(){let{renderer:e,graphicsDevice:t}=this.#r,r=e.setMeshInstanceMatrices,i=t.draw;this.#o=[r,i];let n=this;e.setMeshInstanceMatrices=function(...a){return a[0]===n.#s&&(n.#c=!0),r.apply(this,a)},t.draw=function(...a){let o=n.#c;if(n.#c=!1,o){n.enableMesh&&n.#e.isReady&&n.#h();return}return i.apply(this,a)}}#h(){let e=this.#r.graphicsDevice,t=e.gl,r=t.getParameter(t.VIEWPORT),i=e.scope.resolve("matrix_viewProjection").value;i&&(this.#n||(this.#n=new(this.#i.getWorldTransform()).constructor),this.#n.data.set(i),this.#n.mul(this.#i.getWorldTransform()),this.#e.renderMesh(this.#n.data,r[0],r[1],r[2],r[3]),this.#l())}renderFrame(){let e=this.#r.graphicsDevice,t=e.gl,r=e.width,i=e.height;!r||!i||(this.#i&&this.#e.setModelMatrix(this.#i.getWorldTransform().data),this.#t?.camera&&(this.#e.setCamera(this.#t.getWorldTransform().data,this.#t.camera.projectionMatrix.data),this.#e.setAudioListenerMatrix(this.#t.getWorldTransform().data)),this.#i&&this.#e.setAudioSourceMatrix(this.#i.getWorldTransform().data),this.#e.renderHybridViewport(r,i,{gl:t,enableMesh:this.enableMesh}),this.#l())}#l(){let e=this.#r.graphicsDevice;e.shader=null,e.boundVao=null,e.textureUnit=-1;let t=e.textureUnits;if(t)for(let r=0;r<t.length;r++)t[r][0]=t[r][1]=t[r][2]=null}};async function Cs(s,e,t){let r=`${s.replace(/\/+$/,"")}/${e}`,i=await fetch(r,{headers:{"X-VIEW-TOKEN":t}});if(!i.ok)throw new Error(`Streaming metadata fetch failed: ${i.status} ${i.statusText}`);let n=await i.json();return{metadata:n.metadata??null,audioFileLink:n.audioFileLink??null}}async function bt(s,e){let t=e.replace(/\/+$/,"");return Promise.all(s.map(async(r,i)=>{let{metadata:n,audioFileLink:a}=await Cs(t,r.streamingId,r.token);return{id:r.streamingId,label:r.label??n?.name??r.streamingId,url:`${t}/${r.streamingId}/`,token:r.token,displayName:n?.name??void 0,audio:a&&n?.withAudio!==!1?a:void 0,initialTransform:n?.initialSpawn??null,bounds:n?.bounds??null,sceneCenter:n?.sceneCenter??null,origin:n?.isPOV?"eyes":"floor",slowMo:n?.slowMoAllowed??!1,locked:!1,scaleLocked:!0,autoSwitchToNext:!0,resetPositionOnStart:r.settings?.resetPositionOnStart,...r.rawMetadata}}))}import{useEffect as hh,useMemo as Es,useReducer as uh,useRef as Ls}from"react";import{useEffect as lh,useMemo as ch,useState as Oo}from"react";function Fo(s,e){let[t,r]=Oo(!1),[i,n]=Oo(!1);lh(()=>{let l=navigator.xr;if(!l||!s)return;let h=async()=>{let[c,u]=await Promise.all([l.isSessionSupported("immersive-vr").catch(()=>!1),l.isSessionSupported("immersive-ar").catch(()=>!1)]);r(c),n(u)};return h(),l.addEventListener("devicechange",h),()=>l.removeEventListener("devicechange",h)},[s]);let a=e==="vr"||e==="ar",o=s?.xrBackend??"webgl";return ch(()=>({vrSupported:t,arSupported:i,isActive:a,backend:o,setMode:async l=>{await s?.setMode(l)}}),[s,t,i,a,o])}var Do=new WeakMap;function Go(s){return Do.get(s)}var zo={app:null,overlay:null,isContentReady:!1,isLoading:!1,progress:0,mode:"pw",error:null,isPlaying:!1,isBuffering:!1,currentTime:0,duration:0,controlsType:"orbit",isMuted:!0,volume:1,speed:1};function ph(s,e){switch(e.type){case"init":return{...s,app:e.app,overlay:e.overlay};case"frame":{let{isPlaying:t,isBuffering:r,currentTime:i,duration:n,isMuted:a,speed:o}=e,l=n>0?n:s.duration;return s.isPlaying===t&&s.isBuffering===r&&s.currentTime===i&&s.duration===l&&s.isMuted===a&&s.speed===o?s:{...s,isPlaying:t,isBuffering:r,currentTime:i,duration:l,isMuted:a,speed:o}}case"progress":return s.progress===e.value?s:{...s,progress:e.value};case"ready":return{...s,isContentReady:!0,isLoading:!1,progress:100};case"mode":return s.mode===e.mode?s:{...s,mode:e.mode};case"error":return{...s,error:e.error,isLoading:!1};case"open":return{...s,error:null,isLoading:!0,progress:0};case"close":return{...s,isLoading:!1,progress:0};case"reset":return{...zo,mode:s.mode};case"seek":return{...s,currentTime:e.time};case"camera_controls":return s.controlsType===e.controlsType?s:{...s,controlsType:e.controlsType};case"set_volume":return{...s,volume:e.volume}}}var Bo=new Set(["vr","ar"]);function oi(s){let{containerRef:e,mode:t="pw",xrBackend:r="auto",overlay:i,boundaryRenderer:n,moduleUrl:a,moduleFactory:o,onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p,eventLogger:f}=s,[m,d]=uh(ph,{...zo,mode:t}),g=Ls(null),y=Ls(m);y.current=m;let x=Ls({onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p,eventLogger:f});x.current={onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p,eventLogger:f},hh(()=>{let R=e.current;if(!R)return;let _=!1;return(async()=>{try{if(!o&&!a)throw new Error("[gr-react] Either moduleUrl or moduleFactory must be provided");let P=o?await o():await Gr(a);if(_)return;let O=i??null;O&&(O.eventLogger={event:(A,K)=>x.current.eventLogger?.event?.(A,{...K,mode:y.current.mode}),error:(A,K)=>x.current.eventLogger?.error?.(A,{...K,mode:y.current.mode})});let k=await yt.create(P,{container:R,overlay:O,boundaryRenderer:n,mode:t,xrBackend:r});if(_){k.dispose();return}g.current=k,k.onProgress=A=>{d({type:"progress",value:A}),x.current.onProgress?.(A)},k.onReady=()=>{d({type:"ready"}),k.audioEnabled&&k.enableAudio(),x.current.onReady?.()},k.onFrame=()=>{let A=g.current?.player;A&&d({type:"frame",isPlaying:A.isPlaying??!1,isBuffering:A.isBuffering??!1,currentTime:A.currentTime??0,duration:A.duration??0,isMuted:!(A.audioEnabled??!1),speed:A.speed??1})},k.onModeChange=(A,K)=>{d({type:"mode",mode:A}),x.current.onModeChange?.(A,K);let Se=Bo.has(K),ht=Bo.has(A);Se&&!ht&&x.current.onXREnd?.(),!Se&&ht&&x.current.onXRStart?.()},k.onError=A=>{let[K,Se]=typeof A=="number"?[new Error(`Streaming fetch failed: HTTP ${A}`),"load"]:[A,"xr"];d({type:"error",error:K}),x.current.eventLogger?.error?.(K,{phase:Se,mode:y.current.mode})},k.start(),d({type:"init",app:k,overlay:O}),d({type:"camera_controls",controlsType:k.camera?.controlsType??"orbit"})}catch(P){let O=P instanceof Error?P:new Error(String(P));d({type:"error",error:O}),x.current.eventLogger?.error?.(O,{phase:"init",mode:y.current.mode})}})(),()=>{_=!0;let P=g.current;P&&(P.stop(),P.dispose()),g.current=null,d({type:"reset"})}},[e,i,n,t,r,o,a]);let{app:b}=m,w=Fo(b,m.mode),T=Es(()=>({play:()=>b?.player?.play(),pause:()=>b?.player?.pause(),togglePlay:()=>{let R=b?.player;if(!R)return;let _=!R.isPlaying;_?R.play():R.pause(),x.current.eventLogger?.event?.("play_pause",{playing:_,mode:y.current.mode})},seek:R=>{d({type:"seek",time:R}),b?.player?.seek(R),x.current.eventLogger?.event?.("seek",{position:R,mode:y.current.mode})},setSpeed:R=>{b?.player?.setSpeed(R),x.current.eventLogger?.event?.("speed",{speed:R,mode:y.current.mode})},setVolume:R=>{d({type:"set_volume",volume:R}),b?.setVolume(R)},toggleMute:()=>{let R=!b?.audioEnabled;R?b?.enableAudio():b?.disableAudio(),x.current.eventLogger?.event?.("mute_toggle",{muted:!R,mode:y.current.mode})},setAudio:R=>b?.setAudio(R)}),[b]),M=Es(()=>({controlsType:m.controlsType,zoom:R=>b?.camera?.zoom(R),reset:()=>{b?.camera?.reset(),x.current.eventLogger?.event?.("reset",{mode:y.current.mode})},setControls:R=>{if(!b)return;b.setControls(R);let _=b.camera?.controlsType??R;d({type:"camera_controls",controlsType:_}),x.current.eventLogger?.event?.("camera_controls",{controls:_,requestedControls:R,mode:y.current.mode})}}),[b,m.controlsType]),D=Es(()=>({open(R){b&&(d({type:"open"}),b.open(R))},close(){b?.close(),d({type:"close"})},dispose(){b&&(b.stop(),b.dispose())}}),[b]),G={app:b,device:b?.device??null,overlay:m.overlay,isInitialized:b!==null,isLoading:m.isLoading,isContentReady:m.isContentReady,progress:m.progress,mode:m.mode,error:m.error,isRebuffering:m.isContentReady&&(m.isLoading||m.isBuffering),...D,playback:{isPlaying:m.isPlaying,isBuffering:m.isBuffering,currentTime:m.currentTime,duration:m.duration,isMuted:m.isMuted,volume:m.volume,speed:m.speed,...T},camera:M,xr:w};return Do.set(G,{dispatch:d}),G}import{useCallback as rr,useEffect as dh,useRef as fh,useState as No}from"react";function ai(s,e={}){let{app:t}=s,r=Go(s)?.dispatch,i=fh(e.onSceneEnd);i.current=e.onSceneEnd;let[n,a]=No([]),[o,l]=No(-1);dh(()=>{if(t)return t.onSceneChange=(d,g)=>{r?.({type:"open"}),r?.({type:"camera_controls",controlsType:t.camera?.controlsType??"orbit"}),l(g)},t.onSceneEnd=(d,g)=>i.current?.(d,g),()=>{t.onSceneChange=null,t.onSceneEnd=null}},[t,r]);let h=rr(d=>{t&&(t.sources=d),a(d),l(-1)},[t]),c=rr(d=>{t?.loadScene(d)},[t]),u=rr(()=>{t&&t.loadScene(t.sceneIndex+1)},[t]),p=rr(()=>{t&&t.loadScene(t.sceneIndex-1)},[t]),f=rr(async(d,g)=>{let y=await bt(d,g);h(y),y.length>0&&c(0)},[h,c]),m=o>=0&&o<n.length?n[o]:null;return{sources:n,index:o,total:n.length,currentSource:m,hasNext:o>=0&&o<n.length-1,hasPrev:o>0,hasAudio:!!m?.audio,setSources:h,loadFromApi:f,next:u,prev:p,goTo:c}}import{jsx as N,jsxs as mh}from"react/jsx-runtime";function Xo(){return N("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:N("path",{d:"M5.74023 18.7266V5.17188C5.74023 4.68359 5.86068 4.32552 6.10156 4.09766C6.34245 3.86328 6.62891 3.74609 6.96094 3.74609C7.25391 3.74609 7.55339 3.83073 7.85938 4L19.2363 10.6504C19.64 10.8848 19.9199 11.0964 20.0762 11.2852C20.2389 11.4674 20.3203 11.6888 20.3203 11.9492C20.3203 12.2031 20.2389 12.4245 20.0762 12.6133C19.9199 12.8021 19.64 13.0137 19.2363 13.248L7.85938 19.8984C7.55339 20.0677 7.25391 20.1523 6.96094 20.1523C6.62891 20.1523 6.34245 20.0352 6.10156 19.8008C5.86068 19.5664 5.74023 19.2083 5.74023 18.7266Z"})})}function Vo(){return N("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:N("path",{d:"M7.3418 20.0254C6.91211 20.0254 6.58659 19.9147 6.36523 19.6934C6.15039 19.472 6.04297 19.1465 6.04297 18.7168V5.17188C6.04297 4.74219 6.15039 4.41992 6.36523 4.20508C6.58659 3.98372 6.91211 3.87305 7.3418 3.87305H9.56836C9.99154 3.87305 10.3138 3.97721 10.5352 4.18555C10.7565 4.39388 10.8672 4.72266 10.8672 5.17188V18.7168C10.8672 19.1465 10.7565 19.472 10.5352 19.6934C10.3138 19.9147 9.99154 20.0254 9.56836 20.0254H7.3418ZM14.4414 20.0254C14.0117 20.0254 13.6862 19.9147 13.4648 19.6934C13.2435 19.472 13.1328 19.1465 13.1328 18.7168V5.17188C13.1328 4.74219 13.2435 4.41992 13.4648 4.20508C13.6862 3.98372 14.0117 3.87305 14.4414 3.87305H16.6582C17.0879 3.87305 17.4102 3.97721 17.625 4.18555C17.8464 4.39388 17.957 4.72266 17.957 5.17188V18.7168C17.957 19.1465 17.8464 19.472 17.625 19.6934C17.4102 19.9147 17.0879 20.0254 16.6582 20.0254H14.4414Z"})})}function Uo(){return N("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:N("path",{d:"M8.03125 15.5391C7.5 15.5391 7.10156 15.4036 6.83594 15.1328C6.57031 14.8568 6.4375 14.4375 6.4375 13.875V10.8828C6.4375 10.362 6.55208 9.97135 6.78125 9.71094L15.6875 18.6094C15.625 18.8333 15.5208 18.9974 15.375 19.1016C15.2292 19.2057 15.0547 19.2578 14.8516 19.2578C14.6745 19.2578 14.5052 19.2188 14.3438 19.1406C14.1823 19.0625 14.0104 18.9375 13.8281 18.7656L10.4531 15.6094C10.401 15.5625 10.3359 15.5391 10.2578 15.5391H8.03125ZM15.7422 14.3984L10.3203 8.99219H10.5547C10.6016 8.99219 10.6458 8.97135 10.6875 8.92969L13.8281 6.01562C14.0312 5.82812 14.2057 5.69271 14.3516 5.60938C14.4974 5.52083 14.6615 5.47656 14.8438 5.47656C15.1094 5.47656 15.3255 5.56771 15.4922 5.75C15.6589 5.92708 15.7422 6.14323 15.7422 6.39844V14.3984ZM18.4453 20.0781L5.05469 6.70312C4.9401 6.58854 4.88281 6.44792 4.88281 6.28125C4.88281 6.10938 4.9401 5.96615 5.05469 5.85156C5.17448 5.73177 5.31771 5.67448 5.48438 5.67969C5.65104 5.67969 5.79427 5.73698 5.91406 5.85156L19.2891 19.2266C19.4089 19.3464 19.4688 19.487 19.4688 19.6484C19.4688 19.8151 19.4089 19.9583 19.2891 20.0781C19.1797 20.1979 19.0391 20.2578 18.8672 20.2578C18.7005 20.2578 18.5599 20.1979 18.4453 20.0781Z"})})}function Wo(){return N("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:N("path",{d:"M11.7031 19.2578C11.5208 19.2578 11.349 19.2188 11.1875 19.1406C11.026 19.0625 10.8568 18.9375 10.6797 18.7656L7.35156 15.6094C7.29948 15.5625 7.23438 15.5391 7.15625 15.5391H4.91406C4.38802 15.5391 3.98438 15.3958 3.70312 15.1094C3.42188 14.8229 3.28125 14.3958 3.28125 13.8281V10.9219C3.28125 10.3594 3.42188 9.9349 3.70312 9.64844C3.98438 9.35677 4.38802 9.21094 4.91406 9.21094H7.15625C7.23438 9.21094 7.29948 9.1875 7.35156 9.14062L10.6797 6.01562C10.8828 5.82812 11.0547 5.69271 11.1953 5.60938C11.3411 5.52083 11.5052 5.47656 11.6875 5.47656C11.9531 5.47656 12.1693 5.56771 12.3359 5.75C12.5026 5.92708 12.5859 6.14323 12.5859 6.39844V18.3828C12.5859 18.6328 12.5026 18.8411 12.3359 19.0078C12.1745 19.1745 11.9635 19.2578 11.7031 19.2578ZM15.375 15.6875C15.2188 15.5781 15.1302 15.4375 15.1094 15.2656C15.0885 15.0938 15.138 14.9245 15.2578 14.7578C15.4818 14.4401 15.6562 14.0755 15.7812 13.6641C15.9062 13.2474 15.9688 12.8125 15.9688 12.3594C15.9688 11.9062 15.9062 11.4714 15.7812 11.0547C15.6615 10.638 15.487 10.2734 15.2578 9.96094C15.1328 9.79948 15.0807 9.63281 15.1016 9.46094C15.1276 9.28385 15.2188 9.14062 15.375 9.03125C15.5104 8.9375 15.6589 8.90625 15.8203 8.9375C15.9818 8.96875 16.1146 9.0599 16.2188 9.21094C16.5208 9.60677 16.7552 10.0807 16.9219 10.6328C17.0938 11.1849 17.1797 11.7604 17.1797 12.3594C17.1797 12.9583 17.0938 13.5339 16.9219 14.0859C16.7552 14.638 16.5208 15.112 16.2188 15.5078C16.1146 15.6589 15.9818 15.75 15.8203 15.7812C15.6589 15.8073 15.5104 15.776 15.375 15.6875ZM18.2734 17.7266C18.1328 17.6276 18.0521 17.4974 18.0312 17.3359C18.0104 17.1693 18.0547 17.0052 18.1641 16.8438C18.5859 16.2344 18.9141 15.5443 19.1484 14.7734C19.388 13.9974 19.5078 13.1927 19.5078 12.3594C19.5078 11.526 19.3906 10.7214 19.1562 9.94531C18.9219 9.16927 18.5911 8.47917 18.1641 7.875C18.0495 7.71354 18.0026 7.55208 18.0234 7.39062C18.0495 7.22396 18.1328 7.09115 18.2734 6.99219C18.4193 6.89323 18.5729 6.85938 18.7344 6.89062C18.8958 6.92188 19.0286 7.01302 19.1328 7.16406C19.638 7.84115 20.0286 8.63542 20.3047 9.54688C20.5807 10.4583 20.7188 11.3958 20.7188 12.3594C20.7188 13.3229 20.5781 14.2578 20.2969 15.1641C20.0208 16.0703 19.6328 16.8672 19.1328 17.5547C19.0286 17.7057 18.8958 17.7969 18.7344 17.8281C18.5729 17.8542 18.4193 17.8203 18.2734 17.7266Z"})})}function Ze(){return N("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:N("path",{d:"M5.42188 13.1953V6.4375C5.42188 5.625 5.6224 5.01302 6.02344 4.60156C6.42969 4.1901 7.03646 3.98438 7.84375 3.98438H11.4297V9.71875C11.4297 10.7031 11.9219 11.1953 12.9062 11.1953H18.5625V18.2891C18.5625 19.1016 18.3594 19.7109 17.9531 20.1172C17.5521 20.5286 16.9479 20.7344 16.1406 20.7344H9.78125C10 20.3646 10.1667 19.9688 10.2812 19.5469C10.401 19.125 10.4609 18.6901 10.4609 18.2422C10.4609 17.5495 10.3307 16.8984 10.0703 16.2891C9.8099 15.6797 9.44792 15.1432 8.98438 14.6797C8.52083 14.2161 7.98438 13.8542 7.375 13.5938C6.76562 13.3281 6.11458 13.1953 5.42188 13.1953ZM12.9297 10.125C12.6432 10.125 12.5 9.98438 12.5 9.70312V4.07031C12.6615 4.09635 12.8255 4.16667 12.9922 4.28125C13.1589 4.39062 13.3333 4.53906 13.5156 4.72656L17.8203 9.10938C18.0078 9.30208 18.1562 9.47917 18.2656 9.64062C18.375 9.80208 18.4427 9.96354 18.4688 10.125H12.9297ZM5.42188 22.2109C4.88021 22.2109 4.36979 22.1068 3.89062 21.8984C3.41146 21.6953 2.98958 21.4115 2.625 21.0469C2.26042 20.6823 1.97396 20.2604 1.76562 19.7812C1.55729 19.3021 1.45312 18.7891 1.45312 18.2422C1.45312 17.6953 1.55729 17.1849 1.76562 16.7109C1.97396 16.2318 2.26042 15.8099 2.625 15.4453C2.98958 15.0755 3.41146 14.7891 3.89062 14.5859C4.36979 14.3776 4.88021 14.2734 5.42188 14.2734C5.96875 14.2734 6.48177 14.3776 6.96094 14.5859C7.4401 14.7891 7.86198 15.0729 8.22656 15.4375C8.59115 15.8021 8.875 16.224 9.07812 16.7031C9.28646 17.1823 9.39062 17.6953 9.39062 18.2422C9.39062 18.7839 9.28646 19.2943 9.07812 19.7734C8.86979 20.2526 8.58073 20.6745 8.21094 21.0391C7.84635 21.4036 7.42448 21.6901 6.94531 21.8984C6.46615 22.1068 5.95833 22.2109 5.42188 22.2109ZM5.42188 20.7266C5.56771 20.7266 5.68229 20.6823 5.76562 20.5938C5.85417 20.5052 5.89844 20.3906 5.89844 20.25V18.7188H7.42969C7.57031 18.7188 7.6849 18.6745 7.77344 18.5859C7.86198 18.5026 7.90625 18.388 7.90625 18.2422C7.90625 18.0964 7.86198 17.9818 7.77344 17.8984C7.6849 17.8099 7.57031 17.7656 7.42969 17.7656H5.89844V16.2344C5.89844 16.0938 5.85417 15.9792 5.76562 15.8906C5.68229 15.8021 5.56771 15.7578 5.42188 15.7578C5.27604 15.7578 5.15885 15.8021 5.07031 15.8906C4.98698 15.9792 4.94531 16.0938 4.94531 16.2344V17.7656H3.41406C3.27344 17.7656 3.15885 17.8099 3.07031 17.8984C2.98177 17.9818 2.9375 18.0964 2.9375 18.2422C2.9375 18.388 2.98177 18.5026 3.07031 18.5859C3.15885 18.6745 3.27344 18.7188 3.41406 18.7188H4.94531V20.25C4.94531 20.3906 4.98698 20.5052 5.07031 20.5938C5.15885 20.6823 5.27604 20.7266 5.42188 20.7266Z"})})}function Ho(){return N("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:N("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.75 6.5A3.75 3.75 0 0 0 2 10.25v3.5a3.75 3.75 0 0 0 3.75 3.75h7.5A3.75 3.75 0 0 0 17 13.75v-.46l2.9 2.16A1.25 1.25 0 0 0 22 14.45v-4.9a1.25 1.25 0 0 0-2.1-1L17 10.71v-.46a3.75 3.75 0 0 0-3.75-3.75h-7.5ZM6 8h7a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 16H6a2.5 2.5 0 0 1-2.5-2.5v-3A2.5 2.5 0 0 1 6 8Zm11 4.6v-1.2l3.5-2.61v6.42L17 12.6Z"})})}function li(){return N("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:N("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.25 6.75C3.46 6.75 2 8.21 2 10v4c0 1.79 1.46 3.25 3.25 3.25h3.24c.83 0 1.55-.54 1.8-1.33l.52-1.67h2.38l.52 1.67c.25.79.97 1.33 1.8 1.33h3.24c1.79 0 3.25-1.46 3.25-3.25v-4c0-1.79-1.46-3.25-3.25-3.25H5.25Zm.67 3.42c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52H5.92Zm10.2 0c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52h-1.96Z"})})}function ci(){return mh("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[N("path",{d:"M5.5 3.75c-.97 0-1.75.78-1.75 1.75v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5A3.25 3.25 0 0 1 5.5 2.25h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5ZM16.25 3c0-.41.34-.75.75-.75h1.5a3.25 3.25 0 0 1 3.25 3.25v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5c0-.97-.78-1.75-1.75-1.75H17c-.41 0-.75-.34-.75-.75ZM3 15.5c.41 0 .75.34.75.75v2.25c0 .97.78 1.75 1.75 1.75h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5a3.25 3.25 0 0 1-3.25-3.25v-2.25c0-.41.34-.75.75-.75ZM21 15.5c.41 0 .75.34.75.75v2.25a3.25 3.25 0 0 1-3.25 3.25H17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.5c.97 0 1.75-.78 1.75-1.75v-2.25c0-.41.34-.75.75-.75Z"}),N("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z"})]})}function Yo(){return N("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:N("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"})})}function qo(){return N("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:N("path",{d:"m480-236 93-93q12-12 29-12t29 12q12 12 12 29t-12 29L508-148q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L329-271q-12-12-12-29t12-29q12-12 29-12t29 12l93 93Zm0-484-93 93q-12 12-29 12t-29-12q-12-12-12-29t12-29l123-123q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l123 123q12 12 12 29t-12 29q-12 12-29 12t-29-12l-93-93Z"})})}function Zo({active:s=!1}){return N("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:s?N("path",{d:"M240-240h-80q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h120q17 0 28.5 11.5T320-280v120q0 17-11.5 28.5T280-120q-17 0-28.5-11.5T240-160v-80Zm480 0v80q0 17-11.5 28.5T680-120q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320h120q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240h-80ZM240-720v-80q0-17 11.5-28.5T280-840q17 0 28.5 11.5T320-800v120q0 17-11.5 28.5T280-640H160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h80Zm480 0h80q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H680q-17 0-28.5-11.5T640-680v-120q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v80Z"}):N("path",{d:"M200-200h80q17 0 28.5 11.5T320-160q0 17-11.5 28.5T280-120H160q-17 0-28.5-11.5T120-160v-120q0-17 11.5-28.5T160-320q17 0 28.5 11.5T200-280v80Zm560 0v-80q0-17 11.5-28.5T800-320q17 0 28.5 11.5T840-280v120q0 17-11.5 28.5T800-120H680q-17 0-28.5-11.5T640-160q0-17 11.5-28.5T680-200h80ZM200-760v80q0 17-11.5 28.5T160-640q-17 0-28.5-11.5T120-680v-120q0-17 11.5-28.5T160-840h120q17 0 28.5 11.5T320-800q0 17-11.5 28.5T280-760h-80Zm560 0h-80q-17 0-28.5-11.5T640-800q0-17 11.5-28.5T680-840h120q17 0 28.5 11.5T840-800v120q0 17-11.5 28.5T800-640q-17 0-28.5-11.5T760-680v-80Z"})})}function hi(){return N("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:N("path",{d:"m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"})})}function ui(){return N("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:N("path",{d:"M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"})})}function $o(){return N("svg",{className:"gr-player__icon",viewBox:"0 0 20 20","aria-hidden":"true",children:N("path",{d:"M3.33333 10.8333V9.16667H9.66667L13.8333 5H11.6667V3.33333H16.6667V8.33333H15V6.16667L10.3333 10.8333H3.33333ZM11.6667 16.6667V15H13.8333L11.1667 12.375L12.375 11.1667L15 13.8333V11.6667H16.6667V16.6667H11.6667Z"})})}var Qo=[{type:"orbit",label:"Orbit",hint:`Left-click drag to rotate / Right-click drag to pan
Scroll to zoom in/out`},{type:"trackball",label:"Trackball",hint:`Left-click drag to rotate freely / Right-click drag to pan
Scroll to zoom in/out`},{type:"fly",label:"Fly",hint:`W/S forward & back / A/D strafe / R/F up & down
Q/E roll / Drag to look around`}];var Pe={PW:"pw",HW:"hw",VR:"vr",AR:"ar"},$f=[Pe.VR,Pe.AR];function xt(s){return s===Pe.VR||s===Pe.AR}var Rs=[".mint",".sog"],jo=Rs.join(","),Ko="Open file",pi="local://",Jo="static",gh=".sog";function ks(s){return s.toLowerCase().endsWith(gh)}function $e(s){return typeof s?.url=="string"&&s.url.startsWith(pi)}var di=s=>`${s}x`,ea=ze.map(s=>({speed:s,label:s===1?"Normal":di(s)}));var ta="stepper";var yh="@gracia/web-sdk/wasm",bh="https://market.gracia.ai/api/v1/streaming/content";function ra(){return typeof __GRACIA_MODULE_URL__=="string"?__GRACIA_MODULE_URL__:yh}function ia(){return typeof __GRACIA_STREAMING_BASE_URL__=="string"?__GRACIA_STREAMING_BASE_URL__:bh}function xh(){return typeof navigator>"u"?!1:!!navigator.gpu}var vh={xr:"xr-failed",scenario:"invalid-scenario",fullscreen:"fullscreen-failed","local-file":"local-file-failed"};function wh(s){let e=s.match(/http\s+(-?\d+)/i);return e?Number(e[1]):null}function _h(s,e){let t=e&&vh[e];if(t)return t;let r=s.message.toLowerCase();if(r.includes("webgpu")||r.includes("not supported")||r.includes("getcontext"))return"unsupported-browser";let i=wh(r);return i!==null?i===401||i===403?"access-denied":i===404?"not-found":i>=500?"server-error":"network":r.includes("failed to fetch dynamically imported module")?"load-failed":r.includes("forbidden")||r.includes("unauthorized")?"access-denied":xh()?"unknown":"unsupported-browser"}var Sh=new Set(["unsupported-browser","not-found","access-denied","xr-failed","fullscreen-failed","local-file-failed","invalid-scenario"]),Th=new Set(["xr-failed","fullscreen-failed","local-file-failed"]);function Mh(s,e){let t=!Sh.has(s);return s==="unsupported-browser"?{presentation:"blocking",recoverable:t}:Th.has(s)?{presentation:"toast",recoverable:t}:{presentation:e?"toast":"blocking",recoverable:t}}var Ph={"unsupported-browser":{title:"This browser can\u2019t run the player",body:"The player requires WebGPU. Open it in a supported browser and device."},network:{title:"Connection lost",body:"We couldn\u2019t reach the stream. Check your connection and try again."},"not-found":{title:"Scene not found",body:"This content is no longer available."},"access-denied":{title:"Access denied",body:"You don\u2019t have permission to view this content."},"server-error":{title:"Something went wrong",body:"The server had a problem loading this scene. Please try again."},"load-failed":{title:"Couldn\u2019t load the scene",body:"We couldn\u2019t load this scene. Please try again."},"xr-failed":{title:"Couldn\u2019t enter immersive mode",body:"Immersive mode isn\u2019t available right now."},"fullscreen-failed":{title:"Couldn\u2019t enter fullscreen",body:"Fullscreen isn\u2019t available right now."},"local-file-failed":{title:"Couldn\u2019t open the file",body:"We couldn\u2019t open that file. Try a different one."},"invalid-scenario":{title:"Couldn\u2019t play this story",body:"Its scenes are linked incorrectly, so it can\u2019t be played through."},unknown:{title:"Something went wrong",body:"We couldn\u2019t load this scene. Please try again."}};function Ch(s){return Ph[s]}function sa(s,e,t){let r=_h(s,t);return{kind:r,cause:s,...Mh(r,e),...Ch(r)}}var na=s=>({sceneOrder:s?.sceneOrder,scenarioName:s?.scenarioName,nextSceneOrders:s?.nextSceneOrders,modalTitle:s?.modalTitle}),oa=(s,e)=>s.map((t,r)=>({...t,...na(e[r])})),aa=s=>s.map((e,t)=>e.sceneOrder??t),Ce=(s,e)=>e===-1?s.root:s.byOrder.get(e),ir=(s,e)=>Ce(s,e)?.next??[],la=(s,e)=>{let t=s?.roots?.length?s.roots:e.slice(0,1),{defaultRoot:r}=s??{};return r===void 0?t:[r,...t.filter(i=>i!==r)]},Eh=s=>{let e=(t,r)=>{if(r.has(t))return 0;r.add(t);let i=ir(s,t).reduce((n,a)=>Math.max(n,e(a,r)),0);return r.delete(t),i+1};return e(-1,new Set)-1},sr=(s,e)=>{if(!s.length)return null;let t=s.map(o=>na(o)),r=aa(t),i=new Map(t.map((o,l)=>[r[l],{order:r[l],scenarioName:o.scenarioName,modalTitle:o.modalTitle,next:o.nextSceneOrders??r.slice(l+1,l+2)}])),n=la(e,r),a={byOrder:i,order:r,root:{order:-1,modalTitle:e?.modalTitle,next:n},depth:0,isBranching:t.some(o=>o.nextSceneOrders)||n.length>1};return{...a,depth:Eh(a)}},ca=s=>[...s.order.filter((e,t)=>s.order.indexOf(e)!==t).map(e=>`sceneOrder ${e} is used by more than one scene`),...[s.root,...s.byOrder.values()].flatMap(e=>e.next.filter(t=>!s.byOrder.has(t)).map(t=>e.order===-1?`root ${t} is not a scene of the pack`:`scene ${e.order} links to ${t}, which is not a scene of the pack`))],As=(s,e,t)=>{let r=[[e]],i=new Set([e]);for(let n of r){let a=n[n.length-1];if(a===t)return n;for(let o of ir(s,a))i.has(o)||(i.add(o),r.push([...n,o]))}return null},it=(s,e,t)=>{let r=e.indexOf(t),i=r>=0?e[r+1]:void 0;return i!==void 0&&ir(s,t).includes(i)?i:void 0},nr=(s,e)=>{let t=[],r=new Set,i=-1,n=null;for(;i!==void 0&&Ce(s,i)&&!r.has(i);){r.add(i),i!==-1&&t.push(i);let a=ir(s,i);if(a.length===0)break;if(a.length===1){i=a[0];continue}let o=it(s,e,i);if(o===void 0){n=i;break}i=o}return{scenes:t,openFork:n}},ha=(s,e,t)=>ir(s,e).map(r=>({order:r,label:t(r)})),ua=(s,e)=>sr(s,e)?.isBranching?s.map(t=>({...t,autoSwitchToNext:!1})):s,pa=(s,e)=>{let t=aa(s),r=la(e,t);return r.length===1?t.indexOf(r[0]):null};var da=(s,e,t,r)=>{let i=[],n=new Set,a=-1;for(;a!==void 0&&!n.has(a);){n.add(a),a!==-1&&i.push({order:a,label:String(i.filter(c=>c.order!==void 0).length+1),isActive:a===t});let l=Ce(s,a)?.next??[];if(l.length===0)break;if(l.length===1){a=l[0];continue}let h=it(s,e,a);i.push({isFork:!0,forkFrom:a,...a===r&&{isOpen:!0},...h!==void 0&&{taken:h,branchNumber:l.indexOf(h)+1}}),a=h}let o=s.depth+i.filter(l=>l.isFork).length;for(;i.length<o;)i.push({});return i};var fa="data:font/woff2;base64,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";var ma=`@font-face {
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
    .gr-player__speed-panel,
    .gr-player__speed-option,
    .gr-player__error-screen,
    .gr-player__xr-active,
    .gr-player__prompt-panel,
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

.gr-player__button--camera[aria-expanded="true"],
.gr-player__button--speed[aria-expanded="true"] {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.15);
    background: rgba(48, 52, 57, 0.96);
}

.gr-player__camera-panel,
.gr-player__speed-panel {
    position: absolute;
    z-index: 40;
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

.gr-player__camera-panel {
    top: calc(100% + 8px);
    right: 0;
    width: min(310px, calc(100vw - 32px));
}

.gr-player__camera-title,
.gr-player__speed-title {
    padding: 7px 12px 3px;
    color: rgba(233, 242, 255, 0.42);
    font-size: calc(var(--gr-player-ui-font-size) - 6px);
    font-weight: 600;
    letter-spacing: 0;
    text-transform: uppercase;
}

.gr-player__camera-option,
.gr-player__speed-option {
    position: relative;
    width: 100%;
    padding: 10px 12px;
    border: 0.5px solid transparent;
    border-radius: var(--gr-player-radius-compact);
    background: transparent;
    box-shadow: none;
    color: var(--gr-player-muted);
    text-align: left;
    display: flex;
    cursor: pointer;
}

.gr-player__camera-option {
    min-height: 74px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
}

.gr-player__camera-option:hover,
.gr-player__speed-option:hover {
    background: rgba(233, 242, 255, 0.08);
    color: var(--gr-player-text);
}

.gr-player__camera-option.is-active,
.gr-player__speed-option.is-active {
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

.gr-player__speed {
    position: relative;
    display: flex;
    flex: none;
}

.gr-player__button--speed {
    min-width: 64px;
    padding: 0 12px;
    font-size: calc(var(--gr-player-ui-font-size) - 2px);
    font-variant-numeric: tabular-nums;
}

.gr-player__speed-panel {
    bottom: calc(100% + 8px);
    right: 0;
    width: 148px;
}

.gr-player__speed-option {
    min-height: 40px;
    align-items: center;
    font-size: calc(var(--gr-player-ui-font-size) - 3px);
    font-variant-numeric: tabular-nums;
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
.gr-player__scene-item:hover:not(:disabled) {
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
.gr-player__scene-item:active:not(:disabled)::after {
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

/* A scene the branching route has not reached yet. */
.gr-player__scene-segment--blank {
    background: rgba(233, 242, 255, 0.07);
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
    max-height: calc(100cqh - 120px);
    overflow: hidden auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(233, 242, 255, 0.24) transparent;
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

.gr-player__scene-item:hover:not(:disabled) {
    background: rgba(233, 242, 255, 0.1);
}

.gr-player__scene-item:disabled {
    cursor: default;
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
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(233, 242, 255, 0.7);
    font-weight: 400;
}

.gr-player__scene-item:disabled span,
.gr-player__scene-item:disabled strong {
    color: rgba(233, 242, 255, 0.3);
}

/* A fork's answer, beside its question. */
.gr-player__scene-item small {
    flex: none;
    max-width: 45%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(233, 242, 255, 0.6);
    font-size: calc(var(--gr-player-ui-font-size) - 2px);
}

.gr-player__scene-item.is-active span,
.gr-player__scene-item.is-active strong,
.gr-player__scene-item:hover:not(:disabled) span,
.gr-player__scene-item:hover:not(:disabled) strong {
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

/* --- Scenario prompt --- */

.gr-player__prompt {
    position: absolute;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(13, 17, 21, 0.56);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    animation: gr-player-fade-in 0.2s ease both;
}

.gr-player__prompt-panel {
    position: relative;
    width: min(432px, 100%);
    max-height: 100%;
    overflow: hidden auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 0.5px solid var(--gr-player-border);
    border-radius: var(--gr-player-radius-compact);
    background: var(--gr-player-surface);
    box-shadow: var(--gr-player-inner-shadow);
    animation: gr-player-menu-enter 0.16s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.gr-player__prompt-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 16px;
}

.gr-player__prompt-title {
    min-width: 0;
    margin: 0;
    color: var(--gr-player-accent);
    font-size: 18px;
    font-weight: 400;
    line-height: normal;
    overflow-wrap: anywhere;
}

/* The icon is 24px; the padding grows the hit area without moving it. */
.gr-player__prompt-close {
    flex: none;
    margin: -10px;
    padding: 10px;
    border: 0;
    border-radius: var(--gr-player-radius-compact);
    background: transparent;
    cursor: pointer;
}

.gr-player__prompt-close:hover {
    background: rgba(233, 242, 255, 0.08);
}

.gr-player__prompt-close img {
    display: block;
}

.gr-player__prompt-options {
    position: relative;
    display: flex;
    flex-direction: column;
}

/* Rides the top edge of the first option. */
.gr-player__prompt-countdown {
    position: absolute;
    top: -0.5px;
    left: -0.5px;
    z-index: 1;
    height: 4px;
    background: rgba(233, 242, 255, 0.3);
    transition: width 1s linear;
}

.gr-player__prompt-option {
    width: 100%;
    min-height: 52px;
    padding: 12px 16px;
    border: 0;
    border-top: 0.5px solid rgba(233, 242, 255, 0.1);
    border-bottom: 0.5px solid transparent;
    background: transparent;
    color: rgba(233, 242, 255, 0.8);
    font-size: 16px;
    line-height: normal;
    text-align: center;
    overflow-wrap: anywhere;
    cursor: pointer;
    transition:
        background 0.15s,
        border-color 0.15s;
}

.gr-player__prompt-option:hover,
.gr-player__prompt-option.is-selected {
    border-color: rgba(233, 242, 255, 0.1);
    background: rgba(233, 242, 255, 0.1);
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

    .gr-player__speed {
        order: 5;
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
    .gr-player__scene-menu,
    .gr-player__prompt,
    .gr-player__prompt-panel {
        animation: none;
    }

    .gr-player__prompt-countdown,
    .gr-player__prompt-option {
        transition: none;
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

@keyframes gr-player-fade-in {
    from {
        opacity: 0;
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
`;var ga="gracia-player-default-styles",Is=ma.replace('url("./assets/GolosText-Regular.woff2")',`url("${fa}")`);function fi(s){if(typeof document>"u")return;let e=typeof ShadowRoot<"u"&&s instanceof ShadowRoot?s:s?.head??document.head;if(e.querySelector(`#${ga}`))return;let t=document.createElement("style");t.id=ga,t.textContent=Is,e.appendChild(t)}function re(...s){let e=[];for(let t of s)if(t){if(typeof t=="string"){e.push(t);continue}for(let[r,i]of Object.entries(t))i&&e.push(r)}return e.join(" ")}function ue(s){return s.label??s.displayName??s.id??s.url??"Untitled"}function Os(s){return!Number.isFinite(s)||s<0?"0:00":`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`}function Ne(s){return s instanceof Error?s:new Error(String(s))}function ya(s,e){return{event:(t,r)=>s?.event?.(t,r),error:(t,r)=>{s?.error?.(t,r),e?.(t,r)}}}import{jsx as ba,jsxs as kh}from"react/jsx-runtime";var pe=({variant:s="primary",className:e,type:t="button",children:r,...i})=>{let n=Array.isArray(s)?s:[s];return ba("button",{type:t,className:re("gr-player__button",...n.map(a=>`gr-player__button--${a}`),e),...i,children:r})},Qe=({variant:s="icon",srLabel:e,children:t,...r})=>kh(pe,{variant:s,...r,children:[t,e&&ba("span",{className:"gr-player__sr",children:e})]});import{jsx as or,jsxs as Ah}from"react/jsx-runtime";var vt=({icon:s,title:e,body:t,detail:r,action:i,className:n,role:a,ariaLive:o})=>or("div",{className:n,role:a,"aria-live":o,children:Ah("div",{className:"gr-player__state-message",children:[or("div",{className:"gr-player__state-icon",children:s}),or("h2",{children:e}),or("p",{children:t}),r&&or("span",{className:"gr-player__sr",children:r}),i]})});import{jsx as xa}from"react/jsx-runtime";var Fs=({message:s})=>xa("div",{className:"gr-player__error",role:"alert",children:xa("span",{className:"gr-player__error-text",children:s})});import{jsx as va}from"react/jsx-runtime";var Bs=({title:s,body:e,detail:t,action:r})=>va(vt,{icon:va(Yo,{}),title:s,body:e,detail:t,action:r,className:"gr-player__error-screen",role:"alert",ariaLive:"assertive"});import{jsx as wa}from"react/jsx-runtime";var Ds=()=>wa("div",{className:"gr-player__loader",role:"status","aria-live":"polite",children:wa("div",{className:"gr-player__spinner"})});import{forwardRef as Yp,useImperativeHandle as qp,useRef as Bl}from"react";import{createContext as Ih,useContext as Oh}from"react";var _a=Ih(null),Gs=_a.Provider,U=()=>{let s=Oh(_a);if(!s)throw new Error("usePlayerContext must be used within a PlayerProvider");return s};var Fh=`
struct Draw { mvp: mat4x4f, color: vec4f }
@group(0) @binding(0) var<uniform> draw: Draw;
struct Out { @builtin(position) pos: vec4f, @location(0) color: vec4f }

@vertex fn vs_plain(@location(0) p: vec3f) -> Out {
    return Out(draw.mvp * vec4f(p, 1.0), draw.color);
}
@vertex fn vs_color(@location(0) p: vec3f, @location(1) c: vec4f) -> Out {
    return Out(draw.mvp * vec4f(p, 1.0), draw.color * c);
}
@fragment fn fs(in: Out) -> @location(0) vec4f { return in.color; }`,Bh={color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}},ar=256,Sa=20,Dh=s=>s.isMesh?"triangle-list":s.isLineSegments?"line-list":s.isLine?"line-strip":null,wt=class{#e;#r;#t;#i;#s=new Map;#n=new WeakMap;#o=null;#c=null;#a=0;#h;#l;constructor(e,t,r){this.#e=t,this.#r=r,this.#h=new e.Matrix4,this.#l=new e.Matrix4,this.#t=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{hasDynamicOffset:!0,minBindingSize:Sa*4}}]}),this.#i=t.createShaderModule({code:Fh})}render(e,t){let r=this.#p(t);if(!r.length)return;this.#m(r.length*e.length);let i=new Float32Array(ar/4*r.length*e.length),n=this.#e.createCommandEncoder({label:"XROverlay"});e.forEach(({view:a,projection:o,sub:l},h)=>{this.#h.fromArray(o),this.#h.multiply(this.#l.fromArray(a.transform.inverse.matrix));let c=n.beginRenderPass({colorAttachments:[{view:l.colorTexture.createView(l.getViewDescriptor()),loadOp:"load",storeOp:"store"}]}),u=l.viewport;c.setViewport(u.x,u.y,u.width,u.height,0,1),r.forEach((p,f)=>{let m=h*r.length+f;i.set(this.#l.multiplyMatrices(this.#h,p.object.matrixWorld).elements,m*(ar/4)),i.set(p.color,m*(ar/4)+16),c.setPipeline(p.pipeline),c.setBindGroup(0,this.#c,[m*ar]),c.setVertexBuffer(0,p.geo.position),p.geo.color&&c.setVertexBuffer(1,p.geo.color),p.geo.index?(c.setIndexBuffer(p.geo.index,p.geo.indexFormat),c.drawIndexed(p.geo.count)):c.draw(p.geo.count)}),c.end()}),this.#e.queue.writeBuffer(this.#o,0,i),this.#e.queue.submit([n.finish()])}dispose(){this.#o?.destroy(),this.#o=this.#c=null,this.#s.clear()}#p(e){e.updateMatrixWorld();let t=[];return e.traverseVisible(r=>{let i=r.material,n=Dh(r);if(!n||!i||Array.isArray(i)||i.visible===!1)return;let a=this.#d(r.geometry,!!i.vertexColors);if(!a)return;let o=i.color??{r:1,g:1,b:1};t.push({object:r,geo:a,pipeline:this.#f(n,a),transparent:!!i.transparent,order:r.renderOrder??0,color:[o.r,o.g,o.b,i.transparent?i.opacity:1]})}),t.sort((r,i)=>Number(r.transparent)-Number(i.transparent)||r.order-i.order)}#d(e,t){let r=e?.attributes?.position;if(!r||r.isInterleavedBufferAttribute)return null;let i=t?e.attributes.color:null,n=this.#n.get(e),a=`${r.version}/${i?.version??-1}/${e.index?.version??-1}`;return n&&n.version===a||(n?.destroy(),n={version:a,position:this.#u(r.array,GPUBufferUsage.VERTEX),color:i?this.#u(i.array,GPUBufferUsage.VERTEX):null,colorFormat:i?i.itemSize===4?"float32x4":"float32x3":null,index:e.index?this.#u(e.index.array,GPUBufferUsage.INDEX):null,indexFormat:e.index?.array instanceof Uint32Array?"uint32":"uint16",count:Math.min(e.index?e.index.count:r.count,e.drawRange?.count??1/0),destroy(){this.position.destroy(),this.color?.destroy(),this.index?.destroy()}},this.#n.set(e,n)),n}#u(e,t){let r=Math.ceil(e.byteLength/4)*4,i=this.#e.createBuffer({size:r,usage:t,mappedAtCreation:!0});return new Uint8Array(i.getMappedRange()).set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),i.unmap(),i}#f(e,t){let r=e==="line-strip"&&t.index?t.indexFormat:void 0,i=`${e}/${t.colorFormat}/${r}`,n=this.#s.get(i);if(n)return n;let a=[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]}];return t.colorFormat&&a.push({arrayStride:t.colorFormat==="float32x4"?16:12,attributes:[{shaderLocation:1,offset:0,format:t.colorFormat}]}),n=this.#e.createRenderPipeline({layout:this.#e.createPipelineLayout({bindGroupLayouts:[this.#t]}),vertex:{module:this.#i,entryPoint:t.colorFormat?"vs_color":"vs_plain",buffers:a},fragment:{module:this.#i,entryPoint:"fs",targets:[{format:this.#r,blend:Bh}]},primitive:{topology:e,cullMode:"none",stripIndexFormat:r}}),this.#s.set(i,n),n}#m(e){e<=this.#a||(this.#a=Math.max(e,this.#a*2,32),this.#o?.destroy(),this.#o=this.#e.createBuffer({size:this.#a*ar,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.#c=this.#e.createBindGroup({layout:this.#t,entries:[{binding:0,resource:{buffer:this.#o,size:Sa*4}}]}))}};var Gh=.01,zs=.002,Ta=.25,zh=.005,Nh=.3,Xh=.4,Vh=.7,Uh=.3,Wh=.8,Ns=2,Hh="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;background:none!important",Yh=`
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`,qh=`
uniform float uOpacity;
void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, uOpacity); }`,Pa=`
varying vec3 vWorld;
vec4 project() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    return projectionMatrix * viewMatrix * world;
}`,Ma=`${Pa}
attribute vec3 grid;
varying vec3 vGrid;
void main() {
    vGrid = grid;
    gl_Position = project();
}`,Zh=`${Pa}
void main() { gl_Position = project(); }`,Ca=`
uniform float uReachInv;
uniform sampler2D uSplats;
uniform vec2 uScreen;
uniform float uMask;
varying vec3 vWorld;
float shown() {
    float near = 1.0 - smoothstep(0.5, 1.0, distance(vWorld, cameraPosition) * uReachInv);
    return near * (1.0 - uMask * texture2D(uSplats, gl_FragCoord.xy / uScreen).a);
}`,$h=`${Ca}
uniform vec3 uColor;
uniform float uOpacity;
void main() { gl_FragColor = vec4(uColor, uOpacity * shown()); }`,Ea=`${Ca}
uniform vec3 uColor;
uniform float uOpacity;
varying vec3 vGrid;
vec4 muted(float alpha) {
    float grey = dot(uColor, vec3(0.2126, 0.7152, 0.0722));
    return vec4(mix(uColor, vec3(grey), ${Uh.toFixed(3)}), uOpacity * alpha * ${Wh.toFixed(3)} * shown());
}`,Qh=`${Ea}
void main() {
    vec2 cells = vec2(vGrid.x / max(vGrid.z, 1e-5), vGrid.y) / ${Ta.toFixed(3)};
    vec2 cellsPerPixel = fwidth(cells);
    vec2 toLine = abs(fract(cells + 0.5) - 0.5);
    float halfLine = ${(.5*zh/Ta).toFixed(4)};
    vec2 onLine = 1.0 - smoothstep(vec2(halfLine), halfLine + cellsPerPixel, toLine);
    float moire = 1.0 - smoothstep(0.2, 0.5, max(cellsPerPixel.x, cellsPerPixel.y));
    float lines = max(onLine.x, onLine.y) * moire * ${Vh.toFixed(3)};
    gl_FragColor = muted(max(lines, ${Nh.toFixed(3)}));
}`,jh=`${Ea}
void main() {
    gl_FragColor = muted(${Xh.toFixed(3)});
}`,_t=class{#e;#r;#t;#i;#s;#n;#o;#c;#a=null;#h=null;#l;#p;#d;#u;#f=[0,0];#m=1;#g=null;#y;#v;#_;#w=null;#P=!1;constructor(e){this.#e=e,this.#t=new e.PerspectiveCamera,this.#t.matrixAutoUpdate=!1,this.#l=new e.WebGLRenderTarget(1,1),this.#d=new e.Texture,this.#d.generateMipmaps=!1,this.#d.minFilter=this.#d.magFilter=e.LinearFilter,this.#u=new e.DataTexture(new Uint8Array(4),1,1),this.#u.needsUpdate=!0,this.#p={uReachInv:{value:0},uSplats:{value:this.#u},uScreen:{value:new e.Vector2(1,1)},uMask:{value:1}};let t=(l,h,c,u=e.DoubleSide)=>new e.ShaderMaterial({uniforms:l,vertexShader:h,fragmentShader:c,transparent:!0,depthTest:!1,depthWrite:!1,side:u}),r=(l,h,c)=>{let u=new e.Mesh(l,h);return u.frustumCulled=!1,u.visible=!1,u.renderOrder=c,u},i={value:new e.Color},n=l=>{let h={uOpacity:{value:0},uColor:i,...this.#p},c=r(new e.BufferGeometry,[t(h,Ma,Qh),t(h,Ma,jh)],l);return c.matrixAutoUpdate=!1,c},a=new e.BufferGeometry;a.setAttribute("position",new e.BufferAttribute(new Float32Array(0),3)),this.#i=r(new e.PlaneGeometry(2,2),t({uOpacity:{value:0}},Yh,qh,e.FrontSide),10),this.#n=n(11),this.#s=r(a,t({uColor:{value:new e.Color},uOpacity:{value:0},...this.#p},Zh,$h),12),this.#c=n(0),this.#r=new e.Scene().add(this.#i,this.#n,this.#s),this.#o=new e.Scene().add(this.#c);let o=l=>new e.MeshBasicMaterial({color:0,transparent:!0,depthTest:!1,depthWrite:!1,side:l});this.#v=r(new e.BoxGeometry(Ns,Ns,Ns),o(e.BackSide),10),this.#_=r(a,o(e.DoubleSide),12),this.#y=new e.Scene().add(this.#v,this.#_)}init(e,t=null){if(t){this.#w=new wt(this.#e,t.device,t.format);return}this.#h?.getContext()!==e&&(this.#S(),this.#h=new this.#e.WebGLRenderer({context:e,canvas:e.canvas}),this.#h.autoClear=!1,this.#h.outputColorSpace=this.#e.LinearSRGBColorSpace,this.#h.setClearColor(0,0))}sync(e){this.#C(this.#i,e.darkness),this.#m=1-e.outside,this.#p.uReachInv.value=this.#m/e.reach;let t=e.outline;this.#C(this.#s,t[3]),this.#s.visible&&(this.#T(this.#s,t),this.#A(e.ribbon(Gh))),this.#R(e),this.#x(this.#v,this.#i),this.#x(this.#_,this.#s),this.#P=this.#i.visible||this.#s.visible||this.#n.visible||this.#c.visible,this.#P||this.#g?.remove()}renderUnderlay(e,t,r,i,n,a,o){this.#c.visible&&this.#M(this.#o,e,t,r,i,n,a,o)}renderEye(e,t,r,i,n,a,o){this.#P&&this.#M(this.#r,e,t,r,i,n,a,o)}renderViews(e){!this.#w||!this.#P||(this.#v.position.copy(e[0].view.transform.position),this.#w.render(e,this.#y))}renderOver(e,t,r){if(!this.#P)return;let i=this.#g??=Jh(),n=i.getContext("webgl2");if(!n)return;i.previousSibling!==e&&e.after(i),this.init(n);let{width:a,height:o}=e;(i.width!==a||i.height!==o)&&this.#h.setSize(a,o,!1),this.#p.uScreen.value.set(a,o);let l=this.#m>zs?r?.():null,h=l?this.#E(l):null;this.#p.uMask.value=this.#m,this.#h.clear(),this.#b(this.#o,t.projectionMatrix,t.matrixWorld,h),this.#b(this.#r,t.projectionMatrix,t.matrixWorld,h)}dispose(){this.#S(),this.#w?.dispose(),this.#w=null,this.#g?.remove(),this.#P=!1}#M(e,t,r,i,n,a,o,l){let h=this.#h;h&&(h.resetState(),h.setRenderTargetFramebuffer(this.#l,r),h.setRenderTarget(this.#l),h.setViewport(n,a,o,l),this.#b(e,i.projectionMatrix,i.transform.matrix),h.resetState(),t.bindFramebuffer(t.FRAMEBUFFER,r))}#b(e,t,r,i=null){this.#p.uSplats.value=i??this.#u;let n=this.#t;n.projectionMatrix.fromArray(t),n.projectionMatrixInverse.copy(n.projectionMatrix).invert(),n.matrixWorld.fromArray(r),this.#h.render(e,n)}#S(){for(let e of[this.#i,this.#s,this.#n,this.#c]){e.geometry.dispose();for(let t of[e.material].flat())t.dispose()}this.#d.dispose(),this.#u.dispose(),this.#h?.dispose(),this.#h=null}#E(e){let[t,r]=this.#f;return(e.width!==t||e.height!==r)&&(this.#d.dispose(),this.#f=[e.width,e.height]),this.#d.image=e,this.#d.needsUpdate=!0,this.#d}#R(e){let t=e.surface,r=t[3]>zs?e.mesh:null,i=r?t[3]:0;if(this.#C(this.#n,i*e.aboveSplats),this.#C(this.#c,i*(1-e.aboveSplats)),!!r){if(this.#T(this.#n,t),r!==this.#a){this.#a=r;let n=Kh(this.#e,r);for(let a of[this.#n,this.#c])a.geometry.dispose(),a.geometry=n}this.#n.matrix.fromArray(e.meshMatrix),this.#c.matrix.fromArray(e.meshMatrix)}}#C(e,t){e.visible=t>zs,Xs(e).uOpacity.value=t}#x(e,t){let{uOpacity:r,uColor:i}=Xs(t);e.visible=t.visible,e.material.opacity=r.value,i&&e.material.color.copy(i.value)}#T(e,[t,r,i]){Xs(e).uColor.value.setRGB(t,r,i,this.#e.LinearSRGBColorSpace)}#A(e){let t=this.#s.geometry,r=t.getAttribute("position");r.array.length<e.length?(t.dispose(),t.setAttribute("position",new this.#e.BufferAttribute(e.slice(),3))):(r.array.set(e),r.needsUpdate=!0),t.setDrawRange(0,e.length/3)}};function Xs(s){return[s.material].flat()[0].uniforms}function Kh(s,e){let t=new s.BufferGeometry;return t.setAttribute("position",new s.BufferAttribute(e.positions,3)),t.setAttribute("grid",new s.BufferAttribute(e.grid,3)),t.setIndex(new s.BufferAttribute(e.indices,1)),t.addGroup(0,e.capStart,0),t.addGroup(e.capStart,e.indices.length-e.capStart,1),t}function Jh(){let s=document.createElement("canvas");return s.style.cssText=Hh,s.getContext("webgl2",{depth:!1}),s}import{signal as Xe}from"@preact/signals-core";import{Container as ne,Fullscreen as au,Svg as nt,Text as vi}from"@react-three/uikit";import{signal as st}from"@preact/signals-core";import{forwardHtmlEvents as eu}from"@pmndrs/pointer-events";import{createRoot as tu}from"@react-three/fiber";var mi=class{#e;#r;#t;#i;#s;#n;#o=null;#c=null;#a;#h;#l=null;#p=null;#d=null;#u=!1;#f=!1;#m=!1;#g=!1;#y=!1;#v;#_;#w;#P;#M;#b;constructor(e,{pixelWidth:t,pixelHeight:r,worldWidth:i,worldHeight:n,cursorFactory:a,react:o=!1}){this.#s=e,this.#n=a,this.#u=o,this.#e=t*2,this.#r=r*2,this.#t=document.createElement("canvas"),this.#t.width=this.#e,this.#t.height=this.#r,this.#i=new e.WebGLRenderer({canvas:this.#t,alpha:!0,antialias:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.#i.setClearColor(0,0),this.#i.setSize(this.#e,this.#r,!1),this.#a=new e.Scene,this.#h=new e.OrthographicCamera(0,t,r,0,.1,10),this.#h.position.z=5,this.#v=new e.Raycaster,this.#_=new e.Vector3,this.#w=new e.Vector3,this.#P=new e.Quaternion,this.#M=new e.Mesh(new e.PlaneGeometry(i,n),new e.MeshBasicMaterial({visible:!1,side:e.DoubleSide}));let l=new e.SphereGeometry(.008,8,8),h=()=>new e.MeshBasicMaterial({color:65280,depthTest:!1});this.#b=[0,1].map(()=>{let c=new e.Mesh(l,h());return c.renderOrder=1001,c.visible=!1,c})}get canvas(){return this.#t}get scene(){return this.#a}get pixelWidth(){return this.#e/2}get pixelHeight(){return this.#r/2}get internalWidth(){return this.#e}get internalHeight(){return this.#r}get pointer(){return this.#o}get cursor(){return this.#c?.mesh??null}get ptrPressed(){return this.#m}get reactPending(){return this.#u}get hitMesh(){return this.#M}get hitSpheres(){return this.#b}set linear(e){this.#f=e,this.#i.outputColorSpace=e?this.#s.LinearSRGBColorSpace:this.#s.SRGBColorSpace}async mountReact(e){this.#l=tu(this.#t),await this.#l.configure({frameloop:"never",orthographic:!0,size:{width:this.#e/2,height:this.#r/2},dpr:2,gl:this.#i,linear:this.#f,events:()=>({enabled:!1,priority:0,handlers:{}})}),this.#p=this.#l.render(e),this.#a=this.#p.getState().scene,this.#d=eu(this.#t,()=>this.#p.getState().camera,this.#a,{batchEvents:!1}),this.#u=!1}patchCanvasForXR(){let e=this.pixelWidth,t=this.pixelHeight;this.#t.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,right:e,bottom:t,width:e,height:t,toJSON(){}});let r=new Set;this.#t.setPointerCapture=i=>r.add(i),this.#t.releasePointerCapture=i=>r.delete(i),this.#t.hasPointerCapture=i=>r.has(i)}setPointer(e,t,r,i=!1){if(!this.#o){if(!this.#a)return;this.#o={x:e,y:t,pressed:r};let h=this.#n(this.#s);h.position.z=.06,this.#a.add(h),this.#c={mesh:h,sx:e,sy:this.pixelHeight-t}}let n=this.#o;n.x=e,n.y=t,n.pressed=r;let a=this.#c,o=this.pixelHeight-t,l=a.mesh.visible?.6:1;a.sx+=(e-a.sx)*l,a.sy+=(o-a.sy)*l,a.mesh.visible=!0,this.#p?a.mesh.position.set(a.sx-this.pixelWidth/2,a.sy-this.pixelHeight/2,.06):a.mesh.position.set(a.sx,a.sy,.06),a.mesh.material.opacity=r?1:.7,i&&this.#S(e,t,r)}clearPointer(e=!1){e&&this.#o&&(this.#g?this.#y=!0:this.#E()),this.#o=null,this.#c&&(this.#c.mesh.visible=!1)}renderScene(){this.#u||(this.#d?.update(),this.#p?this.#p.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#a,this.#h))}clampAlpha(e){let t=this.#i.getContext();t.colorMask(!1,!1,!1,!0),t.clearColor(0,0,0,e),t.clear(t.COLOR_BUFFER_BIT),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0)}initFlat(){let e=!1,t=r=>{let i=this.#t.getBoundingClientRect();return{x:(r.clientX-i.left)/i.width*this.pixelWidth,y:(r.clientY-i.top)/i.height*this.pixelHeight}};this.#t.addEventListener("pointerdown",r=>{e=!0,this.#t.setPointerCapture(r.pointerId);let i=t(r);this.setPointer(i.x,i.y,!0)}),this.#t.addEventListener("pointermove",r=>{let i=t(r);this.setPointer(i.x,i.y,e)}),this.#t.addEventListener("pointerup",r=>{e=!1;let i=t(r);this.setPointer(i.x,i.y,!1)}),this.#t.addEventListener("pointerleave",()=>{e=!1,this.clearPointer()})}renderFlat(){this.#u||(this.#d?.update(),this.#p?this.#p.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#a,this.#h))}castRay(e,t){let r=e.rayTransform.position,i=e.rayTransform.orientation;return this.#_.set(r.x,r.y,r.z),this.#w.set(0,0,-1).applyQuaternion(this.#P.set(i.x,i.y,i.z,i.w)),this.rayHitQuad(this.#_,this.#w,t)}rayHitQuad(e,t,r=0){let i=this.pixelWidth,n=this.pixelHeight,a=this.#b[r];this.#v.ray.origin.copy(e),this.#v.ray.direction.copy(t);let o=this.#v.intersectObject(this.#M);if(o.length===0)return a.visible=!1,null;let l=o[0].point,h=o[0].uv;if(!h)return a.visible=!1,null;let c=h.x*i,u=(1-h.y)*n;return c<0||c>i||u<0||u>n?(a.visible=!1,null):(a.position.copy(l),a.visible=!0,a.updateMatrixWorld(!0),{x:c,y:u})}gazeHitsQuad(e,t){if(!e?.transform)return!0;let r=e.transform.position,i=e.transform.orientation,n=-2*(i.w*i.y+i.x*i.z),a=-2*(i.y*i.z-i.w*i.x),o=2*(i.x*i.x+i.y*i.y)-1,l=t||this.#M.position,h=l.x-r.x,c=l.y-r.y,u=l.z-r.z,p=Math.sqrt(h*h+c*c+u*u)||1;return(n*h+a*c+o*u)/p>.6}dispose(){this.#d?.destroy(),this.#d=null,this.#l&&(this.#l.unmount(),this.#l=null,this.#p=null),this.#i?.dispose(),this.#i=null}#S(e,t,r){let i=this.#m;this.#m=r;let n={clientX:e,clientY:t,pointerId:1,pointerType:"mouse",isPrimary:!0};this.#g=!0,r&&!i&&this.#t.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1,bubbles:!0})),this.#t.dispatchEvent(new PointerEvent("pointermove",{...n,buttons:r?1:0,bubbles:!0})),!r&&i&&this.#t.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0,bubbles:!0})),this.#g=!1,this.#y&&(this.#y=!1,this.#E())}#E(){let e={pointerId:1,pointerType:"mouse",isPrimary:!0};this.#m&&this.#t.dispatchEvent(new PointerEvent("pointerup",{...e,button:0,buttons:0,bubbles:!0})),this.#t.dispatchEvent(new PointerEvent("pointerleave",{...e,bubbles:!1})),this.#m=!1}};var ru=`attribute vec2 a_pos;
varying vec2 v_uv;
uniform mat4 u_mvp;
void main() {
    v_uv = a_pos + 0.5;
    gl_Position = u_mvp * vec4(a_pos, 0.0, 1.0);
}`,iu=`precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_alpha;
void main() {
    vec4 c = texture2D(u_tex, v_uv);
    gl_FragColor = vec4(c.rgb, c.a * u_alpha);
}`,gi=class{#e;#r;#t;#i;#s;#n;#o;constructor(e,t,r){this.#e=e;let i=e.createShader(e.VERTEX_SHADER);e.shaderSource(i,ru),e.compileShader(i);let n=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(n,iu),e.compileShader(n),this.#r=e.createProgram(),e.attachShader(this.#r,i),e.attachShader(this.#r,n),e.linkProgram(this.#r),e.deleteShader(i),e.deleteShader(n),this.#n=e.getUniformLocation(this.#r,"u_mvp"),this.#o=e.getUniformLocation(this.#r,"u_alpha"),e.useProgram(this.#r),e.uniform1i(e.getUniformLocation(this.#r,"u_tex"),0),e.uniform1f(this.#o,1);let a=e.getAttribLocation(this.#r,"a_pos");this.#t=e.createVertexArray(),e.bindVertexArray(this.#t),this.#i=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.#i),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-.5,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5]),e.STATIC_DRAW),e.enableVertexAttribArray(a),e.vertexAttribPointer(a,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),this.#s=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.#s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,r,0,e.RGBA,e.UNSIGNED_BYTE,null),e.generateMipmap(e.TEXTURE_2D)}upload(e){let t=this.#e;t.bindTexture(t.TEXTURE_2D,this.#s),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.texSubImage2D(t.TEXTURE_2D,0,0,0,t.RGBA,t.UNSIGNED_BYTE,e),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.generateMipmap(t.TEXTURE_2D)}renderEye(e,t,r,i,n,a){let o=this.#e;o.viewport(t,r,i,n),o.enable(o.BLEND),o.blendFunc(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA),o.useProgram(this.#r),o.uniformMatrix4fv(this.#n,!1,e),o.uniform1f(this.#o,a),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,this.#s),o.bindVertexArray(this.#t),o.drawArrays(o.TRIANGLES,0,6),o.bindVertexArray(null),o.disable(o.BLEND),o.useProgram(null)}dispose(){let e=this.#e;e.deleteProgram(this.#r),e.deleteVertexArray(this.#t),e.deleteBuffer(this.#i),e.deleteTexture(this.#s)}};var su=`
struct Draw { mvp: mat4x4f, alpha: f32 }
@group(0) @binding(0) var<uniform> draw: Draw;
@group(0) @binding(1) var panel: texture_2d<f32>;
@group(0) @binding(2) var linearSampler: sampler;
struct Out { @builtin(position) pos: vec4f, @location(0) uv: vec2f }

@vertex fn vs(@builtin(vertex_index) i: u32) -> Out {
    let p = vec2f(f32(i & 1u), f32(i >> 1u)) - 0.5;
    return Out(draw.mvp * vec4f(p, 0.0, 1.0), vec2f(p.x + 0.5, 0.5 - p.y));
}
@fragment fn fs(in: Out) -> @location(0) vec4f {
    return textureSample(panel, linearSampler, in.uv) * draw.alpha;
}`,nu={color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}},lr=256,ou=80,Vs=2,yi=class{#e;#r;#t;#i;#s;#n;#o;constructor(e,t,r,i){this.#e=e,this.#n=r,this.#o=i,this.#r=e.createTexture({size:[r,i],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),this.#t=e.createBuffer({size:lr*Vs,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let n=e.createShaderModule({code:su});this.#i=e.createRenderPipeline({layout:"auto",vertex:{module:n,entryPoint:"vs"},fragment:{module:n,entryPoint:"fs",targets:[{format:t,blend:nu}]},primitive:{topology:"triangle-strip",cullMode:"none"}});let a=this.#r.createView(),o=e.createSampler({magFilter:"linear",minFilter:"linear"});this.#s=Array.from({length:Vs},(l,h)=>e.createBindGroup({layout:this.#i.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#t,offset:h*lr,size:ou}},{binding:1,resource:a},{binding:2,resource:o}]}))}upload(e){this.#e.queue.copyExternalImageToTexture({source:e},{texture:this.#r,premultipliedAlpha:!0},[this.#n,this.#o])}render(e,t,r){let i=new Float32Array(lr/4*Vs);e.forEach((a,o)=>{i.set(t(a),o*lr/4),i[o*lr/4+16]=r}),this.#e.queue.writeBuffer(this.#t,0,i);let n=this.#e.createCommandEncoder({label:"XRPanel"});e.forEach(({sub:a},o)=>{let l=n.beginRenderPass({colorAttachments:[{view:a.colorTexture.createView(a.getViewDescriptor()),loadOp:"load",storeOp:"store"}]}),h=a.viewport;l.setViewport(h.x,h.y,h.width,h.height,0,1),l.setPipeline(this.#i),l.setBindGroup(0,this.#s[o]),l.draw(4),l.end()}),this.#e.queue.submit([n.finish()])}dispose(){this.#r.destroy(),this.#t.destroy()}};var bi=class{#e=null;#r=null;#t=null;#i=null;#s=null;#n=null;#o=null;#c;#a;#h;#l;#p;#d;#u;#f;#m;#g;#y;constructor(e,{worldWidth:t,worldHeight:r,internalWidth:i,internalHeight:n,canvas:a}){this.#m=t,this.#g=r,this.#u=i,this.#f=n,this.#y=a,this.#c=new e.Matrix4,this.#a=new e.Matrix4,this.#h=new e.Matrix4,this.#l=new e.Vector3,this.#p=new e.Quaternion,this.#d=new e.Vector3(t,r,1)}get projected(){return!!this.#s}get layer(){return this.#t}get pose(){return this.#n??null}async init(e,t,r,i,n=null){if(this.#e=i,this.#r=n?.device??null,t)try{return this.#i=t,this.#t=t.createQuadLayer({space:r,viewPixelWidth:this.#u,viewPixelHeight:this.#f,layout:"mono",isStatic:!1,width:this.#m/2,height:this.#g/2,...n&&{colorFormat:n.format,textureUsage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST}}),this.stash(),this.#t}catch{this.#t=null,this.#i=null}return this.#s=n?new yi(n.device,n.format,this.#u,this.#f):new gi(i,this.#u,this.#f),null}stash(){this.#o=null,this.#t&&(this.#t.transform=new XRRigidTransform({x:0,y:-1e3,z:0},{x:0,y:0,z:0,w:1}))}setTransform(e){this.#n=e,this.#o=e}applyPose(e,t,r,i,n,a,o){let l=new XRRigidTransform({x:e,y:t,z:r},{x:i,y:n,z:a,w:o});this.#n=l,this.#o=l}upload(e){if(this.#t){this.#o&&(this.#t.transform=this.#o,this.#o=null);let t=this.#i.getSubImage(this.#t,e)?.colorTexture;this.#r?this.#r.queue.copyExternalImageToTexture({source:this.#y},{texture:t,premultipliedAlpha:!0},[this.#u,this.#f]):this.#_(t)}else this.#s?.upload(this.#y),this.#o=null}renderEye(e,t,r,i,n,a,o,l){!this.#s||!l||!this.#n||this.#s.renderEye(this.#v(t,t.projectionMatrix),r,i,n,a,o)}renderViews(e,t,r){!this.#s||!r||!this.#n||this.#s.render(e,i=>this.#v(i.view,i.projection),t)}dispose(){this.#s?.dispose(),this.#s=this.#t=this.#i=this.#e=null}#v(e,t){let r=this.#n.position,i=this.#n.orientation;return this.#l.set(r.x,r.y,r.z),this.#p.set(i.x,i.y,i.z,i.w),this.#c.compose(this.#l,this.#p,this.#d),this.#h.fromArray(e.transform.inverse.matrix),this.#a.multiplyMatrices(this.#h,this.#c),this.#h.fromArray(t),this.#a.premultiply(this.#h).elements}#_(e){if(!e)return;let t=this.#e;t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),t.texSubImage2D(t.TEXTURE_2D,0,0,0,t.RGBA,t.UNSIGNED_BYTE,this.#y),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1)}};function xi(s,e,t){let r=Math.sqrt(s*s+e*e+t*t)||1,i=Math.atan2(s/r,t/r)+Math.PI,n=Math.asin(e/r),a=i/2,o=n/2,l=Math.cos(a),h=Math.sin(a),c=Math.cos(o),u=Math.sin(o);return{qx:l*u,qy:h*c,qz:-h*u,qw:l*c}}function Ws(s,e,t,r){let i=e.transform.position,n=e.transform.orientation,a=Math.atan2(2*(n.w*n.y+n.x*n.z),1-2*(n.y*n.y+n.z*n.z)),o=i.x-Math.sin(a)*t,l=i.y+r,h=i.z-Math.cos(a)*t,{qx:c,qy:u,qz:p,qw:f}=xi(o-i.x,l-i.y,h-i.z);s.applyPose(o,l,h,c,u,p,f)}var Us=class{#e;#r;#t;#i;#s;#n;#o;constructor(e,t,r){let{qx:i,qy:n,qz:a,qw:o}=xi(0,r,-t);this.#e=new e.Vector3(0,r,-t),this.#r=new e.Quaternion(i,n,a,o),this.#t=this.#e.clone(),this.#i=this.#r.clone(),this.#s=new e.Vector3,this.#n=new e.Quaternion,this.#o=new e.Vector3(0,1,0)}reset(){this.#t.copy(this.#e),this.#i.copy(this.#r)}remember(e,{position:t,orientation:r}){let i=this.#c(e).invert();this.#t.set(t.x,t.y,t.z).sub(this.#s).applyQuaternion(i),this.#i.set(r.x,r.y,r.z,r.w).premultiply(i)}place(e){let t=this.#c(e),r=this.#t.clone().applyQuaternion(t).add(this.#s),i=this.#i.clone().premultiply(t);return{x:r.x,y:r.y,z:r.z,qx:i.x,qy:i.y,qz:i.z,qw:i.w}}#c(e){let t=e.transform.position,r=e.transform.orientation,i=Math.atan2(2*(r.x*r.z+r.w*r.y),1-2*(r.x*r.x+r.y*r.y));return this.#s.set(t.x,t.y,t.z),this.#n.setFromAxisAngle(this.#o,i)}},_e=class{#e;#r;#t=!1;#i=!1;#s;#n=null;#o=null;#c=!1;#a=null;#h=!1;#l=!1;#p=!1;alpha=1;onDragTick=null;onDragEnd=null;constructor(e,t){this.#s=new Us(e,t.quadZ??.5,t.quadY??-.5),this.#e=new mi(e,t),this.#r=new bi(e,{worldWidth:t.worldWidth,worldHeight:t.worldHeight,internalWidth:this.#e.internalWidth,internalHeight:this.#e.internalHeight,canvas:this.#e.canvas})}get canvas(){return this.#e.canvas}get scene(){return this.#e.scene}get pixelWidth(){return this.#e.pixelWidth}get pixelHeight(){return this.#e.pixelHeight}get hitMesh(){return this.#e.hitMesh}get hitSpheres(){return this.#e.hitSpheres}get pointer(){return this.#e.pointer}get cursor(){return this.#e.cursor}async mountReact(e){return this.#e.mountReact(e)}rayHitQuad(e,t,r){return this.#e.rayHitQuad(e,t,r)}gazeHitsQuad(e,t){return this.#e.gazeHitsQuad(e,t)}get projected(){return this.#r.projected}get layer(){return this.#r.layer}get pose(){return this.#r.pose}get visible(){return this.#t}get placing(){return this.#i}get session(){return this.#n}get interacting(){return this.#t&&(this.#l||this.#c||this.#p||!!this.#o)}get dragging(){return this.#c}set dragging(e){this.#c=e}get panelDragging(){return this.#p}set panelDragging(e){this.#p=e,e||this.onDragEnd?.()}setPointer(e,t,r){this.#e.setPointer(e,t,r,!!this.#n)}clearPointer(){this.#e.clearPointer(!!this.#n)}initFlat(){this.#t=!0,this.#e.initFlat()}renderFlat(){this.#t&&this.#e.renderFlat()}async init(e,t,r,i,n=null){return this.#n=e,this.#e.patchCanvasForXR(),this.#e.linear=!!n,this.#r.init(e,t,r,i,n)}show(){this.#i=!0}recenter(){this.#s.reset(),this.#t&&this.show()}hide(){this.#e.clearPointer(!!this.#n),this.#c=!1,this.#a=null,this.#o=null,this.#p=!1,this.onDragEnd?.(),this.#t=this.#i=!1;for(let e of this.#e.hitSpheres)e.visible=!1;this.#r.stash()}setTransform(e){this.#r.setTransform(e)}stash(){this.#r.stash()}applyPose(e,t,r,i,n,a,o){this.#r.applyPose(e,t,r,i,n,a,o);let l=this.#e.hitMesh;l.position.set(e,t,r),l.quaternion.set(i,n,a,o),l.updateMatrixWorld(!0)}updatePosition(e){if(!this.#i||!e)return;this.#i=!1,this.#t=!0;let{x:t,y:r,z:i,qx:n,qy:a,qz:o,qw:l}=this.#s.place(e);this.applyPose(t,r,i,n,a,o,l)}drawContent(e){!this.#t||this.#e.reactPending||(this.#e.renderScene(),this.alpha<1&&!this.#r.projected&&this.#e.clampAlpha(this.alpha),this.#r.upload(e))}renderEye(e,t,r,i,n,a){this.#r.renderEye(e,t,r,i,n,a,this.alpha,this.#t)}renderViews(e){this.#r.renderViews(e,this.alpha,this.#t)}handleInput(e,t,r){if(!this.#n)return!1;let i=!1,n=!1,a=null,o=null;for(let h of this.#e.hitSpheres)h.visible=!1;for(let[h,c]of[["left",e],["right",t]]){if(c?.menuPressed&&(i=!0),!c?.active||!this.#t||!c.rayTransform||c.held)continue;let u=h==="left"?0:1,p=this.#e.castRay(c,u);if(p){let f={hand:c,hit:p,side:h,trigger:!!c.triggerPressed};h==="left"?a=f:o=f}}let l=!!(a||o);if(this.#p){if(this.#r.pose&&r?.transform&&this.onDragTick){let h=this.onDragTick(e,t,r,this.#a,this.#r.pose);h?(this.applyPose(h.x,h.y,h.z,h.qx,h.qy,h.qz,h.qw),this.#s.remember(r,this.#r.pose)):(this.#p=!1,this.onDragEnd?.())}}else{let h=null;if(this.#o){let c=this.#o==="left"?a:o,u=this.#o==="left"?e:t,p=!!u?.triggerPressed;h=c||(p?{hand:u,hit:null,side:this.#o,trigger:p}:null),p||(this.#o=null)}if(!h){let c=this.#a;h=c==="left"?a||o:c==="right"?o||a:a||o}if(h){this.#a=h.side??this.#a;let c=this.#a==="left"?1:0;if(this.#e.hitSpheres[c].visible=!1,h.hit){let u=this.#e.ptrPressed;this.setPointer(h.hit.x,h.hit.y,h.trigger),h.trigger&&!u&&!this.#o&&(this.#o=this.#a)}else this.#e.pointer?this.setPointer(this.#e.pointer.x,this.#e.pointer.y,h.trigger):this.clearPointer();h.hand?.isTransientPointer&&(n=!0)}else this.clearPointer(),this.#a=null;this.#l=!!(a||o)}return i&&!this.#h&&(this.#t||this.#i?l||this.hide():this.show()),this.#h=i,n}dispose(){this.#t=!1,this.#n=null,this.#e.dispose(),this.#r.dispose()}};var St=class{_quad;_sig=null;onPlayPause=null;onSeek=null;onPresetCycle=null;onExit=null;onClose=null;onSceneNav=null;onSceneSelect=null;onSceneAction=null;constructor(e,t){this._quad=new _e(e,{...t,react:!0})}get quad(){return this._quad}_createBaseSignals(){return{loadingD:st("none"),contentD:st("flex"),playD:st("flex"),pauseD:st("none"),spinD:st("none"),spinR:st(0),spinFast:st(!1)}}_updatePlayback(e,{loading:t,playing:r,spinning:i,buffering:n,progress:a}){e.loadingD.value=t?"flex":"none",e.contentD.value=t?"none":"flex",e.playD.value=!i&&!r?"flex":"none",e.pauseD.value=!i&&r?"flex":"none",e.spinD.value=i?"flex":"none",e.spinFast.value=i&&!n,this._quad.dragging||this._setProgress(a)}render(e){let t=this._sig;if(!this._quad.visible||!t)return;let r=t.loadingD.value==="flex",i=r?20:t.spinFast.value?14:6;(t.spinD.value==="flex"||r)&&(t.spinR.value-=e*i)}_seekFromEvent(e){this._seekTo(e.point.x+this._quad.pixelWidth/2)}_seekTo(e){}_setProgress(e){}};import{jsx as W,jsxs as _i}from"react/jsx-runtime";var Ct=s=>`data:image/svg+xml,${encodeURIComponent(s)}`,lu=Ct('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#aaaaaa"/></svg>'),cu=Ct('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#aaaaaa"/></svg>'),hu=Ct('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#666666"/></svg>'),La=Ct('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1 1 2 12L5 12A7 7 0 1 0 12 5Z" fill="#888888"/></svg>'),uu=Ct('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z" fill="#888888"/></svg>'),pu=Ct('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.6 16.6L10 18l6-6-6-6-1.4 1.4L13.2 12z" fill="#888888"/></svg>'),Mt=30,je=520,Ia=72,wi=Ia+Mt,Ve=Mt+Ia/2,Ra=14,cr=40,hr=26,Tt=6,ka=26,Si=14,Hs=Si/2,Ti=20,Ys=Ti/2,ur=50,Aa=32,qs={borderOpacity:.65},Pt=class extends St{#e=0;#r=0;constructor(e){let r=.86*(wi/je);super(e,{pixelWidth:je,pixelHeight:wi,worldWidth:.86,worldHeight:r,quadY:-.3,cursorFactory:i=>{let n=new i.Mesh(new i.CircleGeometry(4,32),new i.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#t().catch(i=>{})}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:a="0:00 / 0:00",presetName:o=null,sceneText:l=null,sceneLabel:h=null}){let c=this._sig;if(c&&(this._updatePlayback(c,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),c.timeT.value=a,c.presetT&&o!=null&&(c.presetT.value=o),l!=null&&(c.sceneT.value=l),h!=null)){let u=String(h);c.sceneSub.value=u.length>Aa?`${u.slice(0,Aa-2)}...`:u}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-this.#e)/this.#r));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=this.#r*e;t.fillW.value=Math.max(.001,r),t.thumbL.value=this.#e+r-Hs,t.thumbGlowL.value=this.#e+r-Ys}async#t(){let e=this._quad,t=Ra,r=Ve-cr/2,i=je-Ra-hr,n=Ve-hr/2,a=i-10,o=66,l=24,h=a-o,c=Ve-l/2;a=h-8;let u=78,p=a-u,f=Ve-9,m=this.#e=t+cr+12,d=this.#r=p-10-m,g=this._sig={...this._createBaseSignals(),fillW:Xe(.001),thumbL:Xe(m-Hs),thumbGlowL:Xe(m-Ys),thumbS:Xe(1),thumbGlowOp:Xe(0),timeT:Xe("0:00 / 0:00"),sceneT:Xe("1/1"),sceneSub:Xe("SCENE"),presetT:Xe("Off")},y=()=>{g.thumbGlowOp.value=.5,g.thumbS.value=1.15},x=()=>{e.dragging||(g.thumbGlowOp.value=0,g.thumbS.value=1)},b=G=>{G.target.setPointerCapture(G.pointerId),e.dragging=!0,this._seekFromEvent(G)},w=G=>{e.dragging&&this._seekFromEvent(G)},T=()=>{e.dragging=!1,g.thumbGlowOp.value=0,g.thumbS.value=1},M={backgroundColor:1710618},D=_i(au,{backgroundColor:657930,backgroundOpacity:.88,children:[_i(ne,{positionType:"absolute",positionLeft:0,positionTop:0,width:je,height:wi,display:g.contentD,borderWidth:1,borderColor:3355443,borderOpacity:.3,children:[W(ne,{positionType:"absolute",positionLeft:0,positionTop:0,width:ur,height:Mt,hover:M,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(-1),children:W(nt,{src:uu,width:18,height:18,pointerEvents:"none"})}),_i(ne,{positionType:"absolute",positionLeft:ur,positionTop:0,width:je-ur*2,height:Mt,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,overflow:"hidden",children:[W(vi,{fontSize:13,color:11184810,children:g.sceneT}),W(vi,{fontSize:10,color:6710886,children:g.sceneSub})]}),W(ne,{positionType:"absolute",positionLeft:je-ur,positionTop:0,width:ur,height:Mt,hover:M,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(1),children:W(nt,{src:pu,width:18,height:18,pointerEvents:"none"})}),W(ne,{positionType:"absolute",positionLeft:0,positionTop:Mt,width:je,height:.5,backgroundColor:3355443,backgroundOpacity:.5,pointerEvents:"none"}),_i(ne,{positionType:"absolute",positionLeft:t,positionTop:r,width:cr,height:cr,borderRadius:cr/2,borderWidth:1,borderColor:4473924,borderOpacity:.5,hover:qs,alignItems:"center",justifyContent:"center",onClick:()=>this.onPlayPause?.(),children:[W(nt,{display:g.playD,src:lu,width:20,height:20,marginLeft:2,pointerEvents:"none"}),W(nt,{display:g.pauseD,src:cu,width:18,height:18,pointerEvents:"none"}),W(nt,{display:g.spinD,src:La,width:24,height:24,transformRotateZ:g.spinR,pointerEvents:"none"})]}),W(ne,{positionType:"absolute",positionLeft:m,positionTop:Ve-ka/2,width:d,height:ka,onPointerEnter:y,onPointerLeave:x,onPointerDown:b,onPointerMove:w,onPointerUp:T}),W(ne,{positionType:"absolute",positionLeft:m,positionTop:Ve-Tt/2,width:d,height:Tt,borderRadius:Tt/2,backgroundColor:2236962,backgroundOpacity:.8,pointerEvents:"none"}),W(ne,{positionType:"absolute",positionLeft:m,positionTop:Ve-Tt/2,width:g.fillW,height:Tt,borderRadius:Tt/2,backgroundColor:7829367,zIndexOffset:1,pointerEvents:"none"}),W(ne,{positionType:"absolute",positionLeft:g.thumbGlowL,positionTop:Ve-Ti/2,width:Ti,height:Ti,borderRadius:Ys,borderWidth:2,borderColor:10066329,borderOpacity:g.thumbGlowOp,zIndexOffset:2,pointerEvents:"none"}),W(ne,{positionType:"absolute",positionLeft:g.thumbL,positionTop:Ve-Si/2,width:Si,height:Si,borderRadius:Hs,backgroundColor:11184810,transformScaleX:g.thumbS,transformScaleY:g.thumbS,zIndexOffset:3,pointerEvents:"none"}),W(ne,{positionType:"absolute",positionLeft:p,positionTop:f,width:u,height:18,alignItems:"center",justifyContent:"center",children:W(vi,{fontSize:13,color:16777215,opacity:.35,children:g.timeT})}),W(ne,{positionType:"absolute",positionLeft:i,positionTop:n,width:hr,height:hr,borderRadius:hr/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:qs,alignItems:"center",justifyContent:"center",onClick:()=>this.onExit?.(),children:W(nt,{src:hu,width:11,height:11,pointerEvents:"none"})}),W(ne,{positionType:"absolute",positionLeft:h,positionTop:c,width:o,height:l,borderRadius:l/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:qs,alignItems:"center",justifyContent:"center",onClick:()=>this.onPresetCycle?.(),children:W(vi,{fontSize:11,color:10066329,pointerEvents:"none",children:g.presetT})})]}),W(ne,{positionType:"absolute",positionLeft:0,positionTop:0,width:je,height:wi,backgroundColor:657930,backgroundOpacity:1,display:g.loadingD,alignItems:"center",justifyContent:"center",children:W(nt,{src:La,width:40,height:40,transformRotateZ:g.spinR,pointerEvents:"none"})})]});await e.mountReact(D)}};var Et=class{#e;#r;#t=null;#i=null;#s;#n;#o;#c;constructor(e,t){this.#e=e,this.#r=t;let r=t.scene,i=new e.BufferGeometry().setFromPoints([new e.Vector3(0,0,0),new e.Vector3(0,0,-5)]),n=new e.SphereGeometry(.015,6,6);this.#s=new e.MeshBasicMaterial({color:16711680,depthTest:!1}),this.#n=new e.MeshBasicMaterial({color:65280,depthTest:!1});let a=()=>{let o=new e.Group,l=new e.Group,h=new e.Line(i,new e.LineBasicMaterial({color:5227511,transparent:!0,opacity:.5,depthTest:!1}));h.visible=!1,o.add(h);let c=new e.Mesh(n,this.#s),u=new e.Mesh(n,this.#s);return c.renderOrder=u.renderOrder=999,c.visible=u.visible=!1,r.add(o,l,c,u),{ray:o,grip:l,line:h,idxSphere:c,thmSphere:u}};this.#o=a(),this.#c=a()}update(e,t){this.#a(),this.#h(this.#o,e),this.#h(this.#c,t)}dispose(){this.#t&&(this.#r.anchor.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose());for(let e of[this.#o,this.#c])e.line.material.dispose(),e.idxSphere.geometry.dispose(),e.thmSphere.geometry.dispose();this.#s.dispose(),this.#n.dispose()}#a(){let e=this.#r.bboxMesh;if(e===this.#i)return;this.#i=e;let t=this.#r.anchor;if(this.#t&&(t.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose(),this.#t=null),!e)return;let r=this.#e;this.#t=new r.LineSegments(new r.EdgesGeometry(e.geometry),new r.LineBasicMaterial({color:58879,transparent:!0,opacity:.35,depthTest:!1})),this.#t.position.copy(e.position),t.add(this.#t)}#h(e,t){if(t.rayTransform&&this.#l(e.ray,t.rayTransform),t.gripTransform&&this.#l(e.grip,t.gripTransform),e.line.visible=t.active,e.idxSphere.visible=e.thmSphere.visible=!1,!t.active)return;t.indexTip&&(e.idxSphere.position.set(t.indexTip.x,t.indexTip.y,t.indexTip.z),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0)),t.thumbTip&&(e.thmSphere.position.set(t.thumbTip.x,t.thumbTip.y,t.thumbTip.z),e.thmSphere.visible=!0,e.thmSphere.updateMatrixWorld(!0)),t.indexTip||(e.idxSphere.position.copy(e.grip.position),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0));let r=t.gripping?this.#n:this.#s;e.idxSphere.material=r,t.thumbTip&&(e.thmSphere.material=r)}#l(e,t){let r=t.position,i=t.orientation;e.position.set(r.x,r.y,r.z),e.quaternion.set(i.x,i.y,i.z,i.w),e.updateMatrixWorld(!0)}};import{signal as C}from"@preact/signals-core";import{Container as F,Fullscreen as vu,Image as wu,Svg as Y,Text as ee}from"@react-three/uikit";import{signal as Lt}from"@preact/signals-core";import{Container as me,Fullscreen as du,Svg as Oa,Text as Zs}from"@react-three/uikit";import{Fragment as xu,jsx as J,jsxs as kt}from"react/jsx-runtime";var ge=9684710,ot=1122603,fu=2636615,Fa={backgroundColor:1849416},pr=680,At=320,$s=26,Ba=52,Ks=14,dr=26,Qs=40,js=22,Rt=16,Ga=28,Da=42+Ga+14,mu=(At-Ks*2)/ze.length,gu=.02,yu=30,Mi=(...s)=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${s.map(e=>`<path d="${e}" fill="#93c6e6"/>`).join("")}</svg>`),Pi={bounds:Mi("M3 3h18v18H3zm2 2v14h14V5zm7 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4zm-3.5 10c0-2 1.6-4 3.5-4s3.5 2 3.5 4z"),rays:Mi("M0 11h24v2H0z","M17 6h2v12h-2z","M13.545 8.959 21.041 16.455 22.455 15.041 14.959 7.545z","M14.959 16.455 22.455 8.959 21.041 7.545 13.545 15.041z"),speed:Mi("M10 7.5v9l6-4.5z","M11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69c1.11-.86 2.44-1.44 3.9-1.62zM5.69 7.1 4.26 5.68C3.05 7.16 2.25 8.99 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM4.07 13H2.05c.2 2.01 1 3.84 2.21 5.32l1.43-1.43c-.86-1.1-1.44-2.43-1.62-3.89zm1.61 6.74C7.16 20.95 9 21.75 11 21.95v-2.02c-1.46-.18-2.79-.76-3.9-1.62l-1.42 1.43zM22 12c0 5.16-3.92 9.42-8.95 9.95v-2.02C16.97 19.41 20 16.05 20 12s-3.03-7.41-6.95-7.93V2.05C18.08 2.58 22 6.84 22 12z"),close:Mi("M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z")},bu=[{key:"boundary",label:"SHOW BOUNDARIES",icon:Pi.bounds,toggle:"onBoundaryToggle"},{key:"rays",label:"SHOW POINTER RAYS",icon:Pi.rays,toggle:"onRaysToggle"}],Js=s=>s===1?"NORMAL":`${s.toFixed(2)}X`,Ci=class{#e;#r=null;#t;#i;#s;#n;#o;#c;#a;onSpeedSelect=null;onBoundaryToggle=null;onRaysToggle=null;onClose=null;constructor(e,t={}){this.#t=bu.filter(r=>t[r.key]),this.#i=$s+Ba*this.#t.length+Da,this.#e=new _e(e,{pixelWidth:At,pixelHeight:this.#i,worldWidth:At/pr,worldHeight:this.#i/pr,react:!0,cursorFactory:r=>{let i=new r.Mesh(new r.CircleGeometry(5,32),new r.MeshBasicMaterial({color:ge,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return i.renderOrder=999,i}}),this.#e.alpha=.9,this.#s=new e.Quaternion().setFromAxisAngle(new e.Vector3(0,1,0),e.MathUtils.degToRad(-yu)),this.#n=new e.Quaternion,this.#o=new e.Quaternion,this.#c=new e.Vector3,this.#a=new e.Vector3,this.#h().catch(r=>{})}get quad(){return this.#e}placeBeside(e){let t=e.pose;if(!t)return;let{position:r,orientation:i}=t,n=this.#n.set(i.x,i.y,i.z,i.w),a=this.#o.copy(n).multiply(this.#s),o=this.#c.set(e.pixelWidth/pr/2+gu,(e.pixelHeight-this.#i)/pr/2,0).applyQuaternion(n),l=this.#a.set(At/pr/2,0,0).applyQuaternion(a).add(o);this.#e.applyPose(r.x+l.x,r.y+l.y,r.z+l.z,a.x,a.y,a.z,a.w)}update(e){let t=this.#r;t&&(this.#t.forEach((r,i)=>{let n=!!e[r.key];t.switches[i].knobL.value=n?Qs-Rt-3:3,t.switches[i].trackC.value=n?ge:fu,t.switches[i].knobC.value=n?ot:ge}),t.speedD.value=e.slowMo?"flex":"none",ze.forEach((r,i)=>{let n=r===e.speed;t.speeds[i].onD.value=n?"flex":"none",t.speeds[i].c.value=n?ot:ge}))}dispose(){this.#e.dispose()}async#h(){let e=this.#r={switches:this.#t.map(()=>({knobL:Lt(Qs-Rt-3),trackC:Lt(ge),knobC:Lt(ot)})),speedD:Lt("flex"),speeds:ze.map(n=>({onD:Lt(n===1?"flex":"none"),c:Lt(n===1?ot:ge)}))},t=()=>J(me,{positionType:"absolute",positionLeft:0,positionTop:0,width:At,height:.5,backgroundColor:ge,backgroundOpacity:.3,pointerEvents:"none"}),r=({icon:n,children:a})=>kt(xu,{children:[J(Oa,{src:n,width:20,height:20,pointerEvents:"none"}),J(Zs,{fontSize:12,fontWeight:"bold",color:ge,flexGrow:1,marginLeft:12,pointerEvents:"none",children:a})]}),i=kt(du,{flexDirection:"column",children:[kt(me,{flexDirection:"column",backgroundColor:ot,children:[J(me,{height:$s,flexShrink:0,paddingLeft:12,alignItems:"center",backgroundColor:ge,backgroundOpacity:.85,children:J(Zs,{fontSize:11,fontWeight:"bold",color:ot,children:"SETTINGS"})}),this.#t.map((n,a)=>kt(me,{height:Ba,flexShrink:0,paddingX:Ks,flexDirection:"row",alignItems:"center",hover:Fa,onClick:()=>this[n.toggle]?.(),children:[a>0&&J(t,{}),J(r,{icon:n.icon,children:n.label}),J(me,{width:Qs,height:js,borderRadius:js/2,backgroundColor:e.switches[a].trackC,pointerEvents:"none",children:J(me,{positionType:"absolute",positionLeft:e.switches[a].knobL,positionTop:(js-Rt)/2,width:Rt,height:Rt,borderRadius:Rt/2,backgroundColor:e.switches[a].knobC})})]},n.key)),kt(me,{height:Da,flexShrink:0,paddingX:Ks,paddingTop:12,flexDirection:"column",gap:10,display:e.speedD,children:[this.#t.length>0&&J(t,{}),J(me,{height:20,flexDirection:"row",alignItems:"center",children:J(r,{icon:Pi.speed,children:"PLAYBACK SPEED"})}),J(me,{height:Ga,flexDirection:"row",borderWidth:1,borderColor:ge,borderOpacity:.6,children:ze.map((n,a)=>kt(me,{width:mu,height:"100%",alignItems:"center",justifyContent:"center",hover:Fa,onClick:()=>this.onSpeedSelect?.(n),children:[J(me,{positionType:"absolute",positionLeft:0,positionTop:0,width:"100%",height:"100%",backgroundColor:ge,backgroundOpacity:.85,display:e.speeds[a].onD,pointerEvents:"none"}),a>0&&J(me,{positionType:"absolute",positionLeft:0,positionTop:0,width:.5,height:"100%",backgroundColor:ge,backgroundOpacity:.3,pointerEvents:"none"}),J(Zs,{fontSize:11,fontWeight:"bold",color:e.speeds[a].c,pointerEvents:"none",children:Js(n)})]},n))})]})]}),J(me,{positionType:"absolute",positionLeft:At-dr-4,positionTop:($s-dr)/2,width:dr,height:dr,borderRadius:dr/2,backgroundColor:ot,backgroundOpacity:.8,borderWidth:1,borderColor:ge,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",zIndexOffset:10,onClick:()=>this.onClose?.(),children:J(Oa,{src:Pi.close,width:12,height:12,pointerEvents:"none"})})]});await this.#e.mountReact(i)}};import{Fragment as rl,jsx as v,jsxs as ie}from"react/jsx-runtime";var B=9684710,oe=1122603,_u=661021,Su=2636615,Tu=4086636,V=680,rn=248,Ee=34,We=48,mr=Ee+We,il=We,fr=26,Mu=rn+il,za=32,ae=88,Ue=60,Pu=rn-Ue,Ke=(V-ae)/7,Be=Math.round(V/3),sl=12,Q=34,ye=ae+sl,Ot=V-ae-sl*2,Cu=mr+50,sn=Ot-Q,Je=24,Ei=18,nl=ye+Je,ol=sn-Je*2,Na={phase:"off",start:0,end:1,gap:0},It=48,Xa=s=>{let e=s?It:0;return{strip:s,mainY:mr+e,trkY:Cu+e,btnY:Pu+e,bodyH:rn+e,panelH:Mu+e}},at=24,Ri=V/7,en="-",Va=18,Ua=4,Wa=3,Ha=.85,Ya=20,qa=20,Za=12,$a=.55,Eu=s=>Math.min(1,s/Ri),Li=(s,e,t)=>Math.max(t,Math.round(s*e)),gr=(s,e)=>e?nl+ol*s:ye+sn*s,tn=(s,e)=>S.clamp01((s-(e?nl:ye))/(e?ol:sn)),Qa=s=>gr(s,!0)-Je,ja=s=>gr(s,!0)+Q,$=(s,e="#93c6e6")=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${s}" fill="${e}"/></svg>`),Lu="data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${Ot*2}" height="${Q*2}" viewBox="0 0 ${Ot} ${Q}"><defs><pattern id="h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1.5" height="6" fill="#93c6e6" fill-opacity="0.2"/></pattern></defs><rect width="100%" height="100%" fill="#0a161d"/><rect width="100%" height="100%" fill="url(#h)"/></svg>`),Ka="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z",Ja="M8.76 21.6 7.221 20.1177 8.949 18.4235H8.76c-2.106 0-3.8925-.7191-5.3595-2.1573C1.9335 14.8279 1.2 13.0765 1.2 11.0118s.7335-3.81621 2.2005-5.25444C4.8675 4.31912 6.654 3.60001 8.76 3.60001h6.48c2.106 0 3.8925.71911 5.3595 2.15735C22.0665 7.19559 22.8 8.94707 22.8 11.0118s-.7335 3.8161-2.2005 5.2544c-1.467 1.4382-3.2535 2.1573-5.3595 2.1573v-2.1176c1.494 0 2.7675-.5162 3.8205-1.5485 1.053-1.0324 1.5795-2.2809 1.5795-3.7456s-.5265-2.71326-1.5795-3.74562c-1.053-1.03235-2.3265-1.54853-3.8205-1.54853H8.76c-1.494 0-2.7675.51618-3.8205 1.54853C3.8865 8.29854 3.36 9.54707 3.36 11.0118s.5265 2.722 1.5795 3.772c1.053 1.05 2.3265 1.628 3.8205 1.7339h.432l-1.944-1.9059 1.512-1.4824 4.32 4.2353L8.76 21.6Z",q={play:$("M8 5v14l11-7z"),pause:$("M6 4h4v16H6zm8 0h4v16h-4z"),spin:$("M12 2a10 10 0 1 1-10 10h3a7 7 0 1 0 7-7z"),bulb:$("M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"),mute:$("M7 9v6h4l5 5V4l-5 5H7z"),vol:$("M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"),loop:$(Ja),loopOn:$(Ja,"#11212b"),settings:$(Ka),settingsOn:$(Ka,"#11212b"),reset:$("M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"),exit:$("M17 7l-1.4 1.4L18.2 11H8v2h10.2l-2.6 2.6L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"),grip:$("M15.5 15.4V8.6L18.9 12l-3.4 3.4zM8.5 8.6v6.8L5.1 12l3.4-3.4z"),close:$("M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"),scale:$("M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z"),lock:$("M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"),unlk:$("M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"),fork:$("M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4h-6zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3L10 4z"),arrL:$("M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"),arrR:$("M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z")},lt={backgroundColor:1849416},el=.9,Ru=-.55,tl=.866,Ft=class extends St{#e;#r=null;#t=Na;#i=null;#s=null;#n;#o;#c;#a=new Array(at).fill(null);onMuteToggle=null;onScaleLockToggle=null;onLockToggle=null;onReset=null;onAbLoopToggle=null;onAbLoopSet=null;onSettingsToggle=null;constructor(e,{strip:t=!1}={}){let{panelH:r}=Xa(t);super(e,{pixelWidth:V,pixelHeight:r,worldWidth:1,worldHeight:r/V,quadZ:el,quadY:Ru,cursorFactory:i=>{let n=new i.Mesh(new i.CircleGeometry(5,32),new i.MeshBasicMaterial({color:B,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#e=e,this.#c=Xa(t),this.#n=new e.Vector3,this.#o=new e.Quaternion,this._quad.alpha=.9,this._quad.onDragTick=(i,n,a,o,l)=>this.#h(i,n,a,o,l),this._quad.onDragEnd=()=>{this.#r=null,this._quad.alpha=.9},this.#f().catch(i=>{})}#h(e,t,r,i,n){let a=this.#e,o=this.#r,l=o?.side??i??"right",h=l==="left"?e:t;if(!h?.triggerPressed)return this.#r=null,null;let c=h.rayTransform?.orientation;if(!c){let T=n.position,M=n.orientation;return{x:T.x,y:T.y,z:T.z,qx:M.x,qy:M.y,qz:M.z,qw:M.w}}let u=this.#n.set(0,0,-1).applyQuaternion(this.#o.set(c.x,c.y,c.z,c.w));if(!o){let T=r.transform.position,M=new a.Vector3(T.x,T.y,T.z),D=n.position,G=new a.Vector3(D.x,D.y,D.z).sub(M);this.#r={side:l,R:G.length()||el,oQ:new a.Quaternion().setFromUnitVectors(u.clone(),G.normalize()),eye:M};let R=n.orientation;return{x:D.x,y:D.y,z:D.z,qx:R.x,qy:R.y,qz:R.z,qw:R.w}}if(u.applyQuaternion(o.oQ),Math.abs(u.y)>tl){u.y=Math.sign(u.y)*tl;let T=Math.sqrt(u.x*u.x+u.z*u.z)||1e-6,M=Math.sqrt(1-u.y*u.y)/T;u.x*=M,u.z*=M}let p=o.eye,f=o.R,m=p.x+u.x*f,d=p.y+u.y*f,g=p.z+u.z*f,{qx:y,qy:x,qz:b,qw:w}=xi(u.x,u.y,u.z);return{x:m,y:d,z:g,qx:y,qy:x,qz:b,qw:w}}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:a="0:00 / 0:00",presetName:o=null,muted:l=!1,locked:h=!1,scaleLocked:c=!0,abLoop:u=Na,speed:p=1,settingsOpen:f=!1,sceneText:m=null,sceneLabel:d=null,bannerText:g=null,scenario:y=null}){let x=this._sig;if(!x)return;u.phase!=="active"&&(this.#s=null),u.phase!=="setB"&&(this.#i=null);let b=this.#s;if(this.#t=b?{...u,start:b.start,end:b.end}:u,this._updatePlayback(x,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),this.#d(x),x.playTextD.value=r?"none":"flex",x.playLbl.value=t?"PAUSE":"PLAY",x.timeT.value=a,o!=null&&(x.presetT.value=o),x.icA.value=l?"none":"flex",x.icB.value=l?"flex":"none",x.muteLbl.value=l?"UNMUTE":"MUTE",x.sclLkLbl.value=c?"UNLOCK SCALE":"LOCK SCALE",x.lockA.value=h?"none":"flex",x.lockB.value=h?"flex":"none",x.lockLbl.value=h?"UNLOCK SCENE":"LOCK SCENE",x.spdTagD.value=p===1?"none":"flex",x.spdTagT.value=Js(p),x.settingsOnD.value=f?"flex":"none",x.settingsOffD.value=f?"none":"flex",x.settingsTxtC.value=f?oe:B,d!=null){let w=String(d);x.sceneSub.value=w.length>za?`${w.slice(0,za-2)}...`:w}g!=null&&(x.bannerT.value=g),this.#l(y,m,e?0:n)}#l(e,t,r){let i=this._sig,n=e?.chips??[],a=n.filter(f=>!f.isFork);if(a.length){let f=Math.max(1,a.findIndex(m=>m.isActive)+1);i.sceneT.value=`${f}/${a.length}`}else t!=null&&(i.sceneT.value=t);if(!i.slots)return;let o=Math.max(0,n.findIndex(f=>f.isActive)),l=Math.min(n.length,at),h=l?V/l:Ri,c=n.length<=at?0:Math.min(Math.max(0,o-(at>>1)),n.length-at),u=Eu(h),p=Li(Va,u,10);for(let f=0;f<at;f++){let m=n[c+f]??null,d=i.slots[f],g=!!m&&(m.order!==void 0||m.forkFrom!==void 0);d.d.value=f<l?"flex":"none",d.sepD.value=f>0&&f<l?"flex":"none",d.x.value=f*h,d.w.value=h,d.lbl.value=m?.isFork?en:m?.label??en,d.lblD.value=m?.isFork?"none":"flex",d.lblFs.value=Li(Ya,u,10),d.icD.value=m?.isFork?"flex":"none",d.icS.value=Li(qa,u,10),d.badge.value=m?.branchNumber?String(m.branchNumber):"",d.badgeD.value=m?.branchNumber?"flex":"none",d.badgeS.value=p,d.badgeFs.value=Li(Za,u,8),d.badgeX.value=(f+1)*h-p-Ua;let y=!m?.isFork&&!!m?.isActive;d.progD.value=y?"flex":"none",d.progW.value=y?h*r:0,d.lblOpa.value=g&&!m?.isActive?$a:1,d.lblFw.value=m?.isActive?"bold":"normal",d.opa.value=g?1:.35,this.#a[f]=m}}#p(){let{phase:e,start:t,end:r,gap:i}=this.#t,n=this.#i==null?null:S.clamp(this.#i,t+i,1);return{a:e==="off"?null:t,b:e==="active"?r:n}}#d(e){let{phase:t,start:r}=this.#t,i=t!=="off",{b:n}=this.#p(),a=Qa(r),o=ja(n??1);e.abOnD.value=i?"flex":"none",e.abOffD.value=i?"none":"flex",e.abTxtC.value=i?oe:B,e.abLbl.value=t==="setB"?"A/B LOOP (2/2)":"A/B LOOP",e.abAL.value=a,e.abBL.value=o,e.abBD.value=n==null?"none":"flex",e.abMarkerPE.value=t==="active"?"auto":"none",e.abPreW.value=a-ye,e.abHoverD.value=this.#i==null?"none":"flex",e.abHoverL.value=a+Je,e.abHoverW.value=Math.max(0,o-a-Je)}#u(e){let{a:t,b:r}=this.#p(),i=e+(Q-Ei)/2,n=a=>i<a+Je&&a<i+Ei;return t!=null&&n(Qa(t))||r!=null&&n(ja(r))}_seekTo(e){let{phase:t,start:r,end:i}=this.#t,n=S.clamp(tn(e-Q/2,t!=="off"),r,i);this._setProgress(n),this.onSeek?.(n)}_setProgress(e){let t=this._sig;if(!t)return;let{phase:r,start:i,end:n}=this.#t,a=r!=="off",o=gr(S.clamp(e,i,n),a),l=gr(i,a);t.thumbL.value=o,t.fillL.value=l,t.fillW.value=Math.max(0,o+Q-l),t.thumbIconD.value=this.#u(o)?"none":"flex"}async#f(){let{strip:e,mainY:t,trkY:r,btnY:i,bodyH:n,panelH:a}=this.#c,o=this._sig={...this._createBaseSignals(),playTextD:C("flex"),playLbl:C("PAUSE"),fillL:C(ye),fillW:C(Q),thumbL:C(ye),thumbS:C(1),thumbIconD:C("flex"),timeT:C("0:00 / 0:00"),sceneT:C("1/5"),sceneSub:C("SCENE"),icA:C("flex"),icB:C("none"),muteLbl:C("MUTE"),sclLkLbl:C("LOCK SCALE"),lockA:C("flex"),lockB:C("none"),lockLbl:C("LOCK SCENE"),abLbl:C("A/B LOOP"),abOnD:C("none"),abOffD:C("flex"),abTxtC:C(B),abAL:C(ye),abBD:C("none"),abBL:C(ye),abMarkerPE:C("none"),abPreW:C(0),abHoverD:C("none"),abHoverL:C(ye),abHoverW:C(0),presetT:C("OFF"),bannerT:C(""),spdTagD:C("none"),spdTagT:C(""),settingsOnD:C("none"),settingsOffD:C("flex"),settingsTxtC:C(B),...e&&{slots:Array.from({length:at},(_,P)=>({d:C("none"),sepD:C("none"),x:C(P*Ri),w:C(Ri),lbl:C(en),lblD:C("flex"),lblFs:C(Ya),lblFw:C("normal"),lblOpa:C($a),icD:C("none"),icS:C(qa),badge:C(""),badgeD:C("none"),badgeS:C(Va),badgeFs:C(Za),badgeX:C(0),progD:C("none"),progW:C(0),opa:C(.35)}))}},l=({x:_,y:P,w:O,h:k,z:A=0})=>v(F,{positionType:"absolute",positionLeft:_,positionTop:P,width:O,height:k,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:A,pointerEvents:"none"}),h=({slot:_,index:P})=>ie(rl,{children:[v(F,{positionType:"absolute",positionLeft:_.x,positionTop:0,width:_.w,height:It,backgroundColor:oe,hover:lt,display:_.d,onClick:()=>{let O=this.#a[P];O?.forkFrom!==void 0?this.onSceneAction?.(O.forkFrom):O?.order!==void 0&&this.onSceneSelect?.(O.order)}}),ie(F,{positionType:"absolute",positionLeft:_.x,positionTop:0,width:_.w,height:It,alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",display:_.d,opacity:_.opa,zIndexOffset:2,children:[v(ee,{fontSize:_.lblFs,fontWeight:_.lblFw,color:B,opacity:_.lblOpa,display:_.lblD,children:_.lbl}),v(Y,{src:q.fork,width:_.icS,height:_.icS,display:_.icD,transformRotateZ:-90})]}),v(F,{positionType:"absolute",positionLeft:_.badgeX,positionTop:Ua,width:_.badgeS,height:_.badgeS,borderRadius:3,backgroundColor:B,backgroundOpacity:Ha,alignItems:"center",justifyContent:"center",display:_.badgeD,zIndexOffset:2,pointerEvents:"none",children:v(ee,{fontSize:_.badgeFs,fontWeight:"bold",color:oe,zIndexOffset:3,children:_.badge})}),v(F,{positionType:"absolute",positionLeft:_.x,positionTop:It-Wa,width:_.progW,height:Wa,backgroundColor:B,backgroundOpacity:Ha,display:_.progD,zIndexOffset:2,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:_.x,positionTop:0,width:.5,height:It,backgroundColor:B,backgroundOpacity:.3,display:_.sepD,zIndexOffset:3,pointerEvents:"none"})]}),c=({idx:_,left:P=ae+_*Ke,width:O=Ke,onClick:k,active:A=null,children:K})=>ie(F,{positionType:"absolute",positionLeft:P,positionTop:i,width:O,height:Ue,backgroundColor:oe,hover:lt,onClick:k,children:[A&&v(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:O,height:Ue,backgroundColor:B,display:A,pointerEvents:"none"}),v(F,{width:"100%",height:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",children:K})]}),u=this._quad,p=_=>_.point.x+u.pixelWidth/2,f=_=>tn(p(_)-Je/2-Q,!0),m=()=>{o.thumbS.value=1.08},d=()=>{this.#i=null,u.dragging||(o.thumbS.value=1)},g=_=>{if(this.#t.phase==="setB"){this.#i=null,this.onAbLoopSet?.(this.#t.start,f(_));return}_.target.setPointerCapture(_.pointerId),u.dragging=!0,this._seekFromEvent(_)},y=_=>{this.#t.phase==="setB"?this.#i=f(_):u.dragging&&this._seekFromEvent(_)},x=()=>{u.dragging=!1,o.thumbS.value=1},b=_=>P=>{P.target.setPointerCapture(P.pointerId);let{start:O,end:k}=this.#t,A=p(P)-gr(_==="a"?O:k,!0);this.#s={marker:_,grab:A,start:O,end:k}},w=_=>{let P=this.#s;if(!P)return;let O=tn(p(_)-P.grab,!0),k=this.#t.gap;P.marker==="a"?P.start=Math.min(O,P.end-k):P.end=Math.max(O,P.start+k)},T=()=>{let _=this.#s;_&&(this.#s=null,this.onAbLoopSet?.(_.start,_.end))},M=({label:_,left:P,display:O,onPointerDown:k})=>v(F,{positionType:"absolute",positionLeft:P,positionTop:r,width:Je,height:Q,backgroundColor:oe,borderWidth:1,borderColor:B,hover:lt,alignItems:"center",justifyContent:"center",display:O,pointerEvents:o.abMarkerPE,zIndex:1,zIndexOffset:8,onPointerDown:k,onPointerMove:w,onPointerUp:T,children:v(ee,{fontSize:13,fontWeight:"bold",color:B,pointerEvents:"none",children:_})}),D=_=>{_.target.setPointerCapture(_.pointerId),u.panelDragging=!0,u.alpha=.3},G=()=>{u.panelDragging=!1},R=ie(vu,{backgroundColor:oe,children:[ie(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:V,height:a,display:o.contentD,children:[v(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:V,height:Ee,backgroundColor:B,backgroundOpacity:.85}),v(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:V,height:Ee,alignItems:"center",justifyContent:"center",children:v(ee,{fontSize:13,fontWeight:"bold",color:oe,children:o.bannerT})}),v(F,{positionType:"absolute",positionLeft:0,positionTop:Ee,width:Be,height:We,backgroundColor:oe,hover:lt,onClick:()=>this.onSceneNav?.(-1)}),v(F,{positionType:"absolute",positionLeft:0,positionTop:Ee,width:Be,height:We,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:v(Y,{src:q.arrL,width:28,height:28})}),v(l,{x:Be,y:Ee,w:.5,h:We}),ie(F,{positionType:"absolute",positionLeft:Be,positionTop:Ee,width:V-Be*2,height:We,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,overflow:"hidden",children:[v(ee,{fontSize:22,color:B,children:o.sceneT}),v(ee,{fontSize:10,color:B,opacity:.45,children:o.sceneSub})]}),v(l,{x:V-Be,y:Ee,w:.5,h:We}),v(F,{positionType:"absolute",positionLeft:V-Be,positionTop:Ee,width:Be,height:We,backgroundColor:oe,hover:lt,onClick:()=>this.onSceneNav?.(1)}),v(F,{positionType:"absolute",positionLeft:V-Be,positionTop:Ee,width:Be,height:We,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:v(Y,{src:q.arrR,width:28,height:28})}),v(l,{x:0,y:mr,w:V,h:.5}),e&&ie(rl,{children:[v(F,{positionType:"absolute",positionLeft:0,positionTop:mr,width:V,height:It,children:o.slots.map((_,P)=>v(h,{slot:_,index:P},P))}),v(l,{x:0,y:mr,w:V,h:.5,z:10}),v(l,{x:0,y:t,w:V,h:.5,z:10})]}),v(F,{positionType:"absolute",positionLeft:0,positionTop:t,width:ae,height:i-t,backgroundColor:oe,hover:lt,onClick:()=>this.onPlayPause?.()}),ie(F,{positionType:"absolute",positionLeft:0,positionTop:t,width:ae,height:i-t,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,pointerEvents:"none",children:[v(Y,{display:o.playD,src:q.play,width:20,height:24,marginLeft:2}),v(Y,{display:o.pauseD,src:q.pause,width:20,height:24}),v(Y,{display:o.spinD,src:q.spin,width:28,height:28,transformRotateZ:o.spinR}),v(ee,{fontSize:13,fontWeight:"bold",color:B,display:o.playTextD,children:o.playLbl})]}),v(l,{x:ae,y:t,w:.5,h:n-t}),ie(F,{positionType:"absolute",positionLeft:ae+16,positionTop:t+14,width:240,height:20,flexDirection:"row",alignItems:"center",gap:10,children:[v(ee,{fontSize:14,color:B,children:o.timeT}),v(F,{height:18,paddingX:6,alignItems:"center",borderWidth:1,borderColor:B,borderOpacity:.6,display:o.spdTagD,children:v(ee,{fontSize:10,fontWeight:"bold",color:B,children:o.spdTagT})})]}),v(F,{positionType:"absolute",positionLeft:ye,positionTop:r,width:Ot,height:Q,backgroundColor:_u,onPointerEnter:m,onPointerLeave:d,onPointerDown:g,onPointerMove:y,onPointerUp:x}),v(wu,{src:Lu,positionType:"absolute",positionLeft:ye,positionTop:r,width:Ot,height:Q,objectFit:"fill",keepAspectRatio:!1,zIndexOffset:1,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:o.abHoverL,positionTop:r,width:o.abHoverW,height:Q,backgroundColor:Tu,display:o.abHoverD,zIndex:1,zIndexOffset:2,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:ye,positionTop:r,width:o.abPreW,height:Q,backgroundColor:Su,display:o.abOnD,zIndex:1,zIndexOffset:3,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:o.fillL,positionTop:r,width:o.fillW,height:Q,backgroundColor:B,backgroundOpacity:.85,zIndex:1,zIndexOffset:4,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:ye,positionTop:r,width:Ot,height:Q,borderWidth:1,borderColor:B,borderOpacity:.6,zIndex:1,zIndexOffset:5,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:o.thumbL,positionTop:r,width:Q,height:Q,backgroundColor:oe,borderWidth:1,borderColor:B,zIndex:1,zIndexOffset:6,transformScaleX:o.thumbS,transformScaleY:o.thumbS,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:o.thumbL,positionTop:r,width:Q,height:Q,alignItems:"center",justifyContent:"center",zIndex:1,zIndexOffset:7,transformScaleX:o.thumbS,transformScaleY:o.thumbS,pointerEvents:"none",children:v(Y,{display:o.thumbIconD,src:q.grip,width:Ei,height:Ei})}),v(M,{label:"A",left:o.abAL,display:o.abOnD,onPointerDown:b("a")}),v(M,{label:"B",left:o.abBL,display:o.abBD,onPointerDown:b("b")}),v(l,{x:0,y:i,w:V,h:.5}),ie(c,{left:0,width:ae,active:o.settingsOnD,onClick:()=>this.onSettingsToggle?.(),children:[v(Y,{display:o.settingsOffD,src:q.settings,width:20,height:20}),v(Y,{display:o.settingsOnD,src:q.settingsOn,width:20,height:20}),v(ee,{fontSize:10,fontWeight:"bold",color:o.settingsTxtC,children:"SETTINGS"})]}),ie(c,{idx:0,onClick:()=>this.onPresetCycle?.(),children:[v(Y,{src:q.bulb,width:20,height:20}),v(ee,{fontSize:10,fontWeight:"bold",color:B,children:o.presetT})]}),v(l,{x:ae+Ke,y:i,w:.5,h:Ue}),ie(c,{idx:1,onClick:()=>this.onMuteToggle?.(),children:[v(Y,{display:o.icA,src:q.mute,width:20,height:20}),v(Y,{display:o.icB,src:q.vol,width:20,height:20}),v(ee,{fontSize:10,fontWeight:"bold",color:B,children:o.muteLbl})]}),v(l,{x:ae+Ke*2,y:i,w:.5,h:Ue}),ie(c,{idx:2,onClick:()=>this.onScaleLockToggle?.(),children:[v(Y,{src:q.scale,width:20,height:20}),v(ee,{fontSize:10,fontWeight:"bold",color:B,children:o.sclLkLbl})]}),v(l,{x:ae+Ke*3,y:i,w:.5,h:Ue}),ie(c,{idx:3,active:o.abOnD,onClick:()=>this.onAbLoopToggle?.(),children:[v(Y,{display:o.abOffD,src:q.loop,width:20,height:20}),v(Y,{display:o.abOnD,src:q.loopOn,width:20,height:20}),v(ee,{fontSize:10,fontWeight:"bold",color:o.abTxtC,children:o.abLbl})]}),v(l,{x:ae+Ke*4,y:i,w:.5,h:Ue}),ie(c,{idx:4,onClick:()=>this.onLockToggle?.(),children:[v(Y,{display:o.lockA,src:q.unlk,width:20,height:20}),v(Y,{display:o.lockB,src:q.lock,width:20,height:20}),v(ee,{fontSize:10,fontWeight:"bold",color:B,children:o.lockLbl})]}),v(l,{x:ae+Ke*5,y:i,w:.5,h:Ue}),ie(c,{idx:5,onClick:()=>this.onReset?.(),children:[v(Y,{src:q.reset,width:20,height:20}),v(ee,{fontSize:10,fontWeight:"bold",color:B,children:"RESET SCENE"})]}),v(l,{x:ae+Ke*6,y:i,w:.5,h:Ue}),ie(c,{idx:6,onClick:()=>this.onExit?.(),children:[v(Y,{src:q.exit,width:20,height:20}),v(ee,{fontSize:10,fontWeight:"bold",color:B,children:"EXIT"})]}),v(l,{x:0,y:n,w:V,h:.5}),v(F,{positionType:"absolute",positionLeft:0,positionTop:n+1,width:V,height:il-1,backgroundColor:oe,hover:lt,alignItems:"center",justifyContent:"center",onPointerDown:D,onPointerUp:G,children:v(ee,{fontSize:12,color:B,opacity:.45,pointerEvents:"none",children:"DRAG TO MOVE THE MENU"})}),v(F,{positionType:"absolute",positionLeft:V-fr-4,positionTop:(Ee-fr)/2,width:fr,height:fr,borderRadius:fr/2,backgroundColor:oe,backgroundOpacity:.8,borderWidth:1,borderColor:B,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",zIndexOffset:10,onClick:()=>this.onClose?.(),children:v(Y,{src:q.close,width:12,height:12,pointerEvents:"none"})}),v(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:V,height:.5,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10}),v(F,{positionType:"absolute",positionLeft:0,positionTop:a-.5,width:V,height:.5,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10}),v(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:.5,height:a,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10}),v(F,{positionType:"absolute",positionLeft:V-.5,positionTop:0,width:.5,height:a,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10})]}),v(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:V,height:a,backgroundColor:oe,backgroundOpacity:1,display:o.loadingD,alignItems:"center",justifyContent:"center",children:v(Y,{src:q.spin,width:64,height:64,transformRotateZ:o.spinR,pointerEvents:"none"})})]});await u.mountReact(R)}};var Bt=class{#e;#r;#t;#i=null;#s;#n;#o;constructor(e){this.#e=e,this.#r=new e.Scene,this.#t=new e.Group,this.#r.add(this.#t),this.#s=new e.Vector3,this.#n=new e.Vector3,this.#o=new e.Raycaster}get scene(){return this.#r}get anchor(){return this.#t}get bboxMesh(){return this.#i}get hasBBox(){return!!this.#i}rebuildBBox(e,t){let r=this.#e;this.#i&&(this.#t.remove(this.#i),this.#i.geometry.dispose(),this.#i.material.dispose());let i=(e.minX+e.maxX)/2,n=(e.minY+e.maxY)/2,a=(e.minZ+e.maxZ)/2,o=new r.Box3(new r.Vector3(e.minX,e.minY,e.minZ),new r.Vector3(e.maxX,e.maxY,e.maxZ)).applyMatrix4(new r.Matrix4().fromArray(t)),l=o.getSize(new r.Vector3).max(new r.Vector3(.1,.1,.1)),h=o.getCenter(new r.Vector3),c=new r.BoxGeometry(l.x,l.y,l.z);return this.#i=new r.Mesh(c,new r.MeshBasicMaterial({visible:!1,side:r.DoubleSide})),this.#i.position.copy(h),this.#t.add(this.#i),{cx:i,cy:n,cz:a}}applyTransform(e,t){this.#t.position.set(e[0],e[1],e[2]),this.#t.scale.set(t,t,-t),this.#t.quaternion.identity(),this.#t.updateMatrixWorld(!0)}hitTest(e){if(!this.#i)return!1;let t=e.position,r=e.orientation;return this.#s.set(t.x,t.y,t.z),this.#n.set(-2*(r.w*r.y+r.x*r.z),-2*(r.y*r.z-r.w*r.x),2*(r.x*r.x+r.y*r.y)-1),this.#o.set(this.#s,this.#n),this.#o.intersectObject(this.#i,!1).length>0}};import{computed as al,signal as Le}from"@preact/signals-core";import{Container as He,Fullscreen as ku,Svg as Au,Text as ki}from"@react-three/uikit";import{Fragment as Gu,jsx as j,jsxs as on}from"react/jsx-runtime";var et=9684710,Ai=1122603,br=4,le=680,tt=72,Gt=56,ll=tt+Gt*br,Dt=24,nn=80,yr=26,Iu=3,Ou=40,Fu=48,cl=.85,Bu={backgroundColor:1849416},hl=.8,an=.9,ln=-.1,Du="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#93c6e6"/></svg>'),ul=(s,e)=>{let t=String(s).toUpperCase();return t.length>e?`${t.slice(0,e-2)}...`:t},pl="CHOOSE WHAT HAPPENS NEXT",Ii=class{#e;#r=null;#t=new Array(br).fill(null);onSelect=null;onDismiss=null;constructor(e){this.#e=new _e(e,{pixelWidth:le,pixelHeight:ll,worldWidth:hl,worldHeight:hl*ll/le,quadZ:an,quadY:ln,react:!0,cursorFactory:t=>{let r=new t.Mesh(new t.CircleGeometry(5,32),new t.MeshBasicMaterial({color:et,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return r.renderOrder=999,r}}),this.#e.alpha=1,this.#i().catch(t=>{})}get quad(){return this.#e}update({prompt:e,secondsLeft:t,timeoutSec:r}){let i=this.#r;if(!i)return;let n=e?.options??[];i.title.value=ul(e?.title||pl,Ou),i.rows.value=Math.min(n.length,br);let a=n.length>0&&t!==null;i.secondsD.value=a?"flex":"none",i.seconds.value=a?`${t} S`:"",i.progressW.value=a?le*Math.min(1,Math.max(0,1-t/r)):0,i.closeD.value=e?.isReopened?"flex":"none";for(let o=0;o<br;o++){let l=n[o],h=i.options[o],c=!!l&&l.order===e?.selected;h.d.value=l?"flex":"none",l&&(h.lbl.value=ul(l.label,Fu)),h.fillD.value=c?"flex":"none",h.lblD.value=l&&!c?"flex":"none",h.lblActD.value=c?"flex":"none",this.#t[o]=l?.order??null}}dispose(){this.#e.dispose()}async#i(){let e=Le(0),t=this.#r={title:Le(pl),rows:e,seconds:Le(""),secondsD:Le("none"),progressW:Le(0),closeD:Le("none"),options:Array.from({length:br},()=>({d:Le("none"),fillD:Le("none"),lbl:Le(""),lblD:Le("flex"),lblActD:Le("none")}))},r=al(()=>tt+Gt*e.value),i=al(()=>r.value-.5),n=({x:l,y:h,w:c,h:u,display:p})=>j(He,{positionType:"absolute",positionLeft:l,positionTop:h,width:c,height:u,backgroundColor:et,backgroundOpacity:.3,display:p,zIndexOffset:3,pointerEvents:"none"}),a=({row:l,index:h})=>{let c=tt+h*Gt;return on(Gu,{children:[j(He,{positionType:"absolute",positionLeft:0,positionTop:c,width:le,height:Gt,backgroundColor:Ai,hover:Bu,display:l.d,onClick:()=>{let u=this.#t[h];u!=null&&this.onSelect?.(u)}}),j(He,{positionType:"absolute",positionLeft:0,positionTop:c,width:le,height:Gt,backgroundColor:et,backgroundOpacity:cl,display:l.fillD,zIndexOffset:1,pointerEvents:"none"}),on(He,{positionType:"absolute",positionLeft:Dt,positionTop:c,width:le-Dt*2,height:Gt,alignItems:"center",justifyContent:"center",wordBreak:"keep-all",display:l.d,zIndexOffset:2,pointerEvents:"none",children:[j(ki,{fontSize:15,fontWeight:"bold",color:et,display:l.lblD,children:l.lbl}),j(ki,{fontSize:15,fontWeight:"bold",color:Ai,display:l.lblActD,children:l.lbl})]}),h>0&&j(n,{x:0,y:c,w:le,h:.5,display:l.d})]})},o=on(ku,{backgroundOpacity:0,children:[j(He,{positionType:"absolute",positionLeft:0,positionTop:0,width:le,height:r,backgroundColor:Ai}),j(He,{positionType:"absolute",positionLeft:Dt,positionTop:0,width:le-Dt*2-nn,height:tt,alignItems:"center",pointerEvents:"none",children:j(ki,{fontSize:20,fontWeight:"bold",color:et,children:t.title})}),j(He,{positionType:"absolute",positionLeft:le-Dt-nn,positionTop:0,width:nn,height:tt,alignItems:"center",justifyContent:"flex-end",display:t.secondsD,pointerEvents:"none",children:j(ki,{fontSize:20,fontWeight:"bold",color:et,children:t.seconds})}),j(He,{positionType:"absolute",positionLeft:le-Dt-yr,positionTop:(tt-yr)/2,width:yr,height:yr,borderRadius:yr/2,backgroundColor:Ai,backgroundOpacity:.8,borderWidth:1,borderColor:et,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",display:t.closeD,zIndexOffset:10,onClick:()=>this.onDismiss?.(),children:j(Au,{src:Du,width:12,height:12,pointerEvents:"none"})}),j(n,{x:0,y:tt,w:le,h:.5}),j(He,{positionType:"absolute",positionLeft:0,positionTop:tt,width:t.progressW,height:Iu,backgroundColor:et,backgroundOpacity:cl,display:t.secondsD,zIndexOffset:4,pointerEvents:"none"}),t.options.map((l,h)=>j(a,{row:l,index:h},h)),j(n,{x:0,y:0,w:le,h:.5}),j(n,{x:0,y:i,w:le,h:.5}),j(n,{x:0,y:0,w:.5,h:r}),j(n,{x:le-.5,y:0,w:.5,h:r})]});await this.#e.mountReact(o)}};var zt=class s{#e;#r;#t;#i;#s;#n;static#o=1.5;static#c=.04;static#a=.15;static#h=4;static#l=20;static#p=.003;static#d=.001;static#u=.7;constructor(e,t){this.#e=e,this.#r=this.#f(),this.#t=this.#f(),this.#i=this.#m(),this.#s=this.#m(),this.#n=new e.Vector3,t.add(this.#r.group,this.#t.group,this.#i,this.#s)}update(e,t,r,i=!0){this.#g(this.#r,this.#i,i?e:null,r?.[0]),this.#g(this.#t,this.#s,i?t:null,r?.[1])}dispose(){for(let e of[this.#r,this.#t])e.mesh.geometry.dispose(),e.mesh.material.dispose();for(let e of[this.#i,this.#s])e.geometry.dispose(),e.material.dispose()}#f(){let e=this.#e,t=s.#h,r=s.#l,i=s.#o,n=s.#c,a=s.#a,o=s.#p,l=s.#d,h=s.#u,c=r+1,u=t+1,p=c*u,f=new Float32Array(p*3),m=new Float32Array(p*4),d=[];for(let w=0;w<c;w++){let T=w/r,M=-n-T*i,D=o+(l-o)*T,G=Math.min(T/a,1),R=1-T,_=h*G*R;for(let P=0;P<=t;P++){let O=P/t*Math.PI*2,k=w*u+P;f[k*3]=Math.cos(O)*D,f[k*3+1]=Math.sin(O)*D,f[k*3+2]=M,m[k*4]=1,m[k*4+1]=1,m[k*4+2]=1,m[k*4+3]=_}}for(let w=0;w<r;w++)for(let T=0;T<t;T++){let M=w*u+T,D=M+1,G=M+u,R=G+1;d.push(M,G,D,D,G,R)}let g=new e.BufferGeometry;g.setAttribute("position",new e.BufferAttribute(f,3)),g.setAttribute("color",new e.BufferAttribute(m,4)),g.setIndex(d);let y=new e.MeshBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),x=new e.Mesh(g,y);x.frustumCulled=!1,x.renderOrder=998;let b=new e.Group;return b.add(x),b.visible=!1,{mesh:x,group:b}}#m(){let e=this.#e,t=new e.RingGeometry(.004,.008,24),r=new e.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),i=new e.Mesh(t,r);return i.frustumCulled=!1,i.renderOrder=999,i.visible=!1,i}#g(e,t,r,i){if(!r?.active||!r.rayTransform||r.isTransientPointer){e.group.visible=!1,t.visible=!1;return}let n=r.rayTransform.position,a=r.rayTransform.orientation;e.group.position.set(n.x,n.y,n.z),e.group.quaternion.set(a.x,a.y,a.z,a.w),e.group.visible=!0,e.group.updateMatrixWorld(!0);let o=r.triggerPressed??!1;if(e.mesh.material.color.setRGB(o?.4:1,o?.75:1,1),i?.visible){let l=this.#n.set(n.x,n.y,n.z).distanceTo(i.position),h=s.#c+s.#o;e.mesh.scale.z=Math.min(1,l/h),t.position.copy(i.position),t.quaternion.set(a.x,a.y,a.z,a.w),t.visible=!0,t.updateMatrixWorld(!0)}else e.mesh.scale.z=1,t.visible=!1}};import{Fullscreen as zu}from"@react-three/uikit";import{jsx as Wu}from"react/jsx-runtime";var Nu=0,Xu=.55,Vu=4,Uu=3,cn=.7,hn=0,Oi=class{#e;constructor(e){this.#e=new _e(e,{pixelWidth:64,pixelHeight:48,worldWidth:Vu,worldHeight:Uu,quadZ:cn,quadY:hn,react:!0}),this.#e.alpha=Xu,this.#e.mountReact(Wu(zu,{backgroundColor:Nu})).catch(t=>{})}get quad(){return this.#e}dispose(){this.#e.dispose()}};var Fi=(s,e)=>e||!s?s:{...s,rayTransform:null},xr=s=>s?.menuPressed?{...s,menuPressed:!1}:s,Nt=Object.keys(er),dl=s=>!Number.isFinite(s)||s<0?"0:00":`${~~(s/60)}:${String(~~s%60).padStart(2,"0")}`,un=s=>s.toUpperCase(),fl=s=>Math.max(.1,s*.01);var Xt=class{#e;#r;#t;#i=null;#s=null;#n=null;#o=null;#c=!1;#a=null;#h=!1;#l=null;#p=null;#d=null;#u=null;#f=null;#m=null;#g=!1;#y=0;#v=0;#_=0;#w=Nt.indexOf("off");#P=un("off");#M=1;#b=!1;#S=!0;#E=!0;#R=!0;#C="off";#x=[];#T=0;#A=!0;#D=null;#k=null;#X=null;#V=null;#U=null;#H=null;#O=null;#L=null;#G;#z=null;#Y=null;#q=null;#F=null;#B=null;#I=null;constructor(e,{debug:t=!1,uiStyle:r="modern",rays:i=!0}={}){this.#e=e,this.#r=t,this.#t=r,this.#G=i}get uiStyle(){return this.#t}set uiStyle(e){this.#t=e}set manipulator(e){this.#l=e}get manipulator(){return this.#l}get uiActive(){return this.#N?!0:!this.#A&&!!(this.#i?.quad.interacting||this.#s?.quad.interacting)}get uiDragging(){if(this.#A)return!1;let e=this.#i?.quad;return(e?.dragging||e?.panelDragging)??!1}get quads(){return this.#W}get#Z(){return[this.#i?.quad,this.#s?.quad,this.#n?.quad].filter(Boolean)}get#W(){return[this.#i?.quad,this.#s?.quad,this.#o?.quad,this.#n?.quad].filter(Boolean)}set sources(e){this.#x=e??[],this.#T=Math.min(this.#T,Math.max(0,this.#x.length-1))}get sources(){return this.#x}set sceneIndex(e){this.#x.length&&(this.#T=Math.max(0,Math.min(this.#x.length-1,e)),this.#A=!0)}get sceneIndex(){return this.#T}set onSceneChange(e){this.#V=e}get onSceneChange(){return this.#V}set onPresetChange(e){this.#X=e}get onPresetChange(){return this.#X}set onLock(e){this.#U=e}get onLock(){return this.#U}set onScaleLock(e){this.#H=e}get onScaleLock(){return this.#H}set boundaryVisible(e){this.#E=e}get boundaryVisible(){return this.#E}set onBoundaryToggle(e){this.#O=e}get onBoundaryToggle(){return this.#O}set raysVisible(e){this.#R=e}get raysVisible(){return this.#R}set scenario(e){let t=!!e?.prompt&&!this.#k?.prompt,r=!e?.prompt&&!!this.#k?.prompt;this.#k=e,t?this.#$():r&&(this.#n?.quad.hide(),this.#o?.quad.hide(),this.#Q(!1)),this.#K()}get scenario(){return this.#k}set bannerText(e){this.#D=e}get bannerText(){return this.#D}set eventLogger(e){this.#L=e}get eventLogger(){return this.#L}setPreset(e,t=this.#M){this.#M=t,this.syncPreset(e),this.#ie(this.#p,e,t)}syncPreset(e){let t=Nt.indexOf(e);t<0||(this.#w=t,this.#P=un(e))}async init(e,t,r,i,n,a=!1,o=null){this.#p=e,this.#g=!!o;let l=this.#e,h=this.#r||this.#G,c=!!this.#k,u=this.#t==="modern";this.#i=u?new Ft(l,{strip:c}):new Pt(l),u&&(this.#s=new Ci(l,{boundary:!!this.#O,rays:this.#G})),c&&(this.#n=new Ii(l),this.#o=new Oi(l)),this.#z=new l.Vector3,this.#Y=new l.Vector3,this.#q=new l.Quaternion,this.#te(e,t);let p=h?new Bt(l):null;if(this.#I=p,p&&this.#l?.setOverlay(p),this.#b=this.#x[this.#T]?.locked??this.#b,this.#S=this.#x[this.#T]?.scaleLocked??this.#S,this.#l&&(this.#l.locked=this.#b,this.#l.scaleLocked=this.#S),this.#ie(e,Nt[this.#w],this.#M),p){for(let y of this.#Z){y.hitMesh&&p.scene.add(y.hitMesh);for(let x of y.hitSpheres)p.scene.add(x)}this.#r&&(this.#F=new Et(l,p)),this.#G&&(this.#B=new zt(l,p.scene))}o&&p?this.#m=new wt(l,o.device,o.format):h&&p&&(this.#d=new l.WebGLRenderer({context:n,canvas:n.canvas}),this.#d.autoClear=!1,this.#u=new l.PerspectiveCamera(50,1,.01,1e4),this.#u.matrixAutoUpdate=!1,this.#f=new l.WebGLRenderTarget(1,1),this.#d.setRenderTarget(this.#f),this.#d.setRenderTarget(null));let f=await this.#i.quad.init(t,r,i,n,o),m=await this.#s?.quad.init(t,r,i,n,o),d=await this.#o?.quad.init(t,r,i,n,o),g=await this.#n?.quad.init(t,r,i,n,o);return this.#k?.prompt&&this.#$(),this.#y=setTimeout(()=>{this.#h=!0,this.#K()},1e3),[f,m,d,g].filter(Boolean)}frame(e,t,r,i,n,a){this.#ce(a);let o=this.#i?.quad,l=this.#l?.leftHand,h=this.#l?.rightHand;if(o?.updatePosition(i),this.#s&&this.#re(o,i),this.#n&&this.#J(i),this.#ee(i,l,h),this.#F?.update(l,h),o?.panelDragging&&this.#l?.reset(),this.#he(e,a),this.#i?.render(e),!this.#g)for(let c of this.#W)c.drawContent(t)}renderEye(e,t,r,i,n,a,o){for(let l of this.#W)l.renderEye(e,r,i,n,a,o);!this.#d||!this.#I||(this.#u.projectionMatrix.fromArray(r.projectionMatrix),this.#u.projectionMatrixInverse.copy(this.#u.projectionMatrix).invert(),this.#u.matrix.fromArray(r.transform.matrix),this.#u.matrixWorld.copy(this.#u.matrix),this.#u.matrixWorldInverse.fromArray(r.transform.inverse.matrix),this.#d.resetState(),this.#d.setRenderTargetFramebuffer(this.#f,t),this.#d.setRenderTarget(this.#f),this.#d.setViewport(i,n,a,o),this.#d.setScissor(i,n,a,o),this.#d.setScissorTest(!0),this.#d.clearDepth(),this.#d.render(this.#I.scene,this.#u),this.#d.resetState(),e.bindFramebuffer(e.FRAMEBUFFER,t))}renderViews(e,t){for(let r of this.#W)r.drawContent(t),r.renderViews(e);this.#m?.render(e,this.#I.scene)}onRefReset(){this.#i?.quad.recenter(),this.#o?.quad.visible&&this.#o.quad.show(),this.#n?.quad.visible&&(this.#c=!0,this.#n.quad.show())}render(e,t){}dispose(){clearTimeout(this.#y),this.#h=!1,this.#C!=="off"&&this.#ne(this.#p),this.#F?.dispose(),this.#F=null,this.#B?.dispose(),this.#B=null,this.#I=null,this.#d?.dispose(),this.#d=null,this.#f?.dispose(),this.#f=null,this.#u=null,this.#i?.quad.dispose(),this.#i=null,this.#s?.dispose(),this.#s=null,this.#n?.dispose(),this.#n=null,this.#o?.dispose(),this.#o=null,this.#c=!1,this.#a=null,this.#m?.dispose(),this.#m=null,this.#l?.reset(),this.#l=null,this.#v=0}get#N(){return!!this.#n?.quad.visible}#$(){this.#c=!0,this.#n?.quad.show(),this.#o?.quad.show(),this.#Q(!0)}#Q(e){let t=this.#l;t&&(e?(this.#a===null&&(this.#a=t.locked),t.locked=!0):this.#a!==null&&(t.locked=this.#a,this.#a=null))}#K(){!this.#h||this.#k?.prompt?.isStart||(this.#h=!1,this.#i?.quad.show())}#re(e,t){let r=this.#s.quad;r.visible&&!e?.visible&&r.hide(),r.updatePosition(t),r.visible&&e&&this.#s.placeBeside(e)}#J(e){let t=this.#n.quad,r=this.#o?.quad;r&&e&&(r.updatePosition(e),r.visible&&Ws(r,e,cn,hn));let i=t.placing;t.updatePosition(e),i&&this.#c&&e&&(this.#c=!1,Ws(t,e,an,ln))}#ee(e,t,r){let i=this.#i?.quad,n=this.#s?.quad,a=this.#n?.quad,o=this.#N,l=this.#j(t,r),h=(c,u)=>o?xr(Fi(c,!1)):Fi(c,u);i?.handleInput(h(t,l.left===i),h(r,l.right===i),e),n?.handleInput(xr(h(t,l.left===n)),xr(h(r,l.right===n)),e),a?.handleInput(xr(Fi(t,l.left===a)),xr(Fi(r,l.right===a)),e),this.#B?.update(t,r,[l.left?.hitSpheres[0]??null,l.right?.hitSpheres[1]??null],this.#R&&!!(i?.visible||a?.visible))}#j(e,t){let r={left:null,right:null},i=this.#N?[this.#n.quad]:this.#Z.filter(a=>a.visible);if(!i.length)return r;let n=i.find(a=>a.panelDragging||a.dragging);if(n)return{left:n,right:n};for(let[a,o]of[["left",e],["right",t]]){if(!o?.active||!o.rayTransform||o.held)continue;let l=o.rayTransform.position,h=o.rayTransform.orientation;this.#z.set(l.x,l.y,l.z),this.#Y.set(0,0,-1).applyQuaternion(this.#q.set(h.x,h.y,h.z,h.w));let c=a==="left"?0:1,u=null,p=1/0;for(let f of i){if(!f.rayHitQuad(this.#z,this.#Y,c))continue;let m=this.#z.distanceTo(f.hitSpheres[c].position);m<p&&(p=m,u=f)}r[a]=u}return r}#te(e,t){let r=this.#i;r.onPlayPause=()=>{(e?.isBuffering??!1)||(e?.isPlaying?e.pause():e.play(),this.#L?.event?.("play_pause",{playing:!e?.isPlaying}))},r.onSeek=n=>{e?.seek?.(n*(e?.duration??0)),this.#L?.event?.("seek",{position:n})},r.onPresetCycle=()=>{let n=Nt[(this.#w+1)%Nt.length];this.#ie(e,n,this.#M),this.#X?.(n),this.#L?.event?.("preset_cycle",{preset:n})},r.onExit=()=>{this.#L?.event?.("exit"),t?.end()},r.onClose=()=>{r.quad.hide()},r.onSceneNav=n=>{let a=this.#k;if(a){this.#L?.event?.("scene_nav",{dir:n}),n>0?a.stepForward():a.stepBack();return}if(!this.#x.length)return;let o=Math.max(0,Math.min(this.#x.length-1,this.#T+n));o!==this.#T&&(this.#T=o,this.#A=!0,this.#ae(),this.#V?.(this.#x[this.#T],this.#T),this.#L?.event?.("scene_nav",{index:o,label:this.#x[o]?.label,dir:n}))},r.onSceneSelect=n=>{this.#L?.event?.("scene_select",{order:n}),this.#k?.goTo(n)},r.onSceneAction=n=>{this.#L?.event?.("scene_action",{order:n}),this.#k?.reopenFork(n)};let i=this.#n;if(i&&(i.onSelect=n=>{this.#L?.event?.("prompt_select",{order:n}),this.#k?.choose(n)},i.onDismiss=()=>{this.#L?.event?.("prompt_dismiss"),this.#k?.dismissPrompt()}),this.#t==="modern"){let n=this.#s;r.onSettingsToggle=()=>{n.quad.visible?n.quad.hide():n.quad.show()},n.onClose=()=>n.quad.hide(),n.onSpeedSelect=a=>{e?.setSpeed(a),this.#L?.event?.("speed",{speed:a})},n.onBoundaryToggle=()=>{let a=!this.#E;this.#O?.(a),this.#L?.event?.("boundaries_toggle",{shown:a})},n.onRaysToggle=()=>{this.#R=!this.#R,this.#L?.event?.("rays_toggle",{shown:this.#R})},r.onMuteToggle=()=>{let a=this.#le(e);this.#L?.event?.("mute_toggle",{muted:!a})},r.onReset=()=>{this.#l?.resetToInitial(),this.#L?.event?.("reset")},r.onLockToggle=()=>{this.#b=!this.#b,this.#l&&(this.#l.locked=this.#b),this.#U?.(this.#b),this.#L?.event?.("lock_toggle",{locked:this.#b})},r.onAbLoopToggle=()=>{this.#C==="off"?this.#oe(e):this.#ne(e),this.#L?.event?.("ab_loop_toggle",{enabled:this.#C!=="off"})},r.onAbLoopSet=(a,o)=>{if(this.#C==="off")return;let l=e.duration;this.#se(e,a*l,o*l),this.#C="active",this.#L?.event?.("ab_loop_set",e.playbackRange)},r.onScaleLockToggle=()=>{this.#S=!this.#S,this.#l&&(this.#l.scaleLocked=this.#S),this.#H?.(this.#S),this.#L?.event?.("scale_lock_toggle",{scaleLocked:this.#S})}}}#oe(e){let t=e?.duration??0;t<=0||(this.#se(e,e.currentTime,t),this.#C="setB")}#se(e,t,r){let i=e.duration,n=fl(i),a=S.clamp(t,0,i-n);e.setPlaybackRange(a,S.clamp(r,a+n,i))}#ne(e){e?.clearPlaybackRange(),this.#C="off"}#ae(){this.#b=this.#x[this.#T]?.locked??this.#b,this.#S=this.#x[this.#T]?.scaleLocked??this.#S}#le(e){let t=!(e?.audioEnabled??!1);return t?e?.enableAudio?.():e?.disableAudio?.(),t}#ie(e,t,r=1){let i=Nt.indexOf(t);if(i<0)return;this.#w=i,this.#P=un(t);let n=er[t];n?e?.setEnvLighting(qe(n),r):e?.clearEnvLighting()}#ce(e){!this.#A||!e.duration||(this.#A=!1,this.#C="off",this.#b=this.#x[this.#T]?.locked??this.#b,this.#S=this.#x[this.#T]?.scaleLocked??this.#S)}#he(e,t){let r=!(t?.audioEnabled??!1),i=t?.speed??1;if(this.#A)this.#i?.update({loading:!0,muted:r,locked:this.#b,scaleLocked:this.#S,sceneText:this.#x.length?`${this.#T+1}/${this.#x.length}`:"1/1",sceneLabel:(this.#x[this.#T]?.label??"SCENE").toUpperCase(),bannerText:this.#D,scenario:this.#k});else{let n=t?.isBuffering??!1,a=t?.duration??0;a>0&&(this.#_=a);let o=this.#_,l=t?.currentTime??0,h=f=>f/(o||1),c=S.clamp01(h(l)),{start:u,end:p}=t.playbackRange;this.#i?.update({loading:!1,playing:t?.isPlaying??!1,spinning:n,buffering:n,progress:c,timeText:`${dl(l)} / ${dl(o)}`,presetName:this.#P,muted:r,locked:this.#b,scaleLocked:this.#S,speed:i,settingsOpen:!!this.#s?.quad.visible,abLoop:{phase:this.#C,start:h(u),end:h(p),gap:h(fl(o))},sceneText:this.#x.length?`${this.#T+1}/${this.#x.length}`:"1/1",sceneLabel:(this.#x[this.#T]?.label??"SCENE").toUpperCase(),bannerText:this.#D,scenario:this.#k})}this.#s?.update({speed:i,slowMo:this.#x[this.#T]?.slowMo,boundary:this.#E,rays:this.#R}),this.#n?.update({prompt:this.#k?.prompt??null,secondsLeft:this.#k?.secondsLeft??null,timeoutSec:this.#k?.choiceTimeoutSec??1}),this.#ue(e)}#ue(e){if(this.#N)return;if(this.#v>0){this.#v-=e;return}let t=this.#l?.leftHand.microSwipe||this.#l?.rightHand.microSwipe;t&&(this.#v=.45,this.#i?.onSceneNav(t))}};import{useState as Hu}from"react";import*as Yu from"three";function pn(){let[s]=Hu(()=>new _t(Yu));return s}import{useEffect as ml,useRef as qu,useState as Zu}from"react";function dn(s,e,t){let[r,i]=Zu(!1);ml(()=>{let o=s.current;if(!o)return;let l=()=>i(!0),h=c=>{c.touches.length>1&&l()};return o.addEventListener("pointerdown",l),o.addEventListener("wheel",l),o.addEventListener("touchmove",h),()=>{o.removeEventListener("pointerdown",l),o.removeEventListener("wheel",l),o.removeEventListener("touchmove",h)}},[s]);let n=qu(e);return ml(()=>{n.current!==e&&(n.current=e,i(!1))},[e]),{hasInteracted:r,resetView:()=>{t.reset(),i(!1)}}}import{useEffect as $u,useState as Qu}from"react";var ju=500;function fn(s,e=ju){let[t,r]=Qu(!1);return $u(()=>{if(!s){r(!1);return}let i=setTimeout(()=>r(!0),e);return()=>clearTimeout(i)},[s,e]),s&&t}import{useEffect as Ku,useRef as Ju}from"react";var vr=(s,e,t)=>{let r=Ju(t);r.current=t,Ku(()=>{if(!e)return;let i=a=>{s.current?.contains(a.target)||r.current()},n=a=>{a.code==="Escape"&&r.current()};return document.addEventListener("pointerdown",i),document.addEventListener("keydown",n),()=>{document.removeEventListener("pointerdown",i),document.removeEventListener("keydown",n)}},[s,e])};import{useEffect as ep,useRef as tp,useState as rp}from"react";var ip=2e3;function mn({coreError:s,interactionError:e,isSceneReady:t,currentSource:r,open:i,clearError:n}){let[a,o]=rp(null),l=tp(new WeakMap);e?.phase&&l.current.set(e.error,e.phase);let h=s&&e?.error===s?e.phase:s?l.current.get(s):void 0,c=s?{error:s,phase:h}:e,u=c?sa(c.error,t,c.phase):null,p=u?.presentation==="blocking",f=u?.presentation==="toast"&&u.cause!==a?u:null,m=f?.cause??null;return ep(()=>{if(!m)return;let y=setTimeout(()=>{o(m),n()},ip);return()=>clearTimeout(y)},[m,n]),{playerError:u,isBlocking:!!p,toast:f,retry:()=>r?i(r):window.location.reload(),dismiss:()=>{f&&o(f.cause),n()}}}import{useCallback as sp,useEffect as np,useState as op}from"react";function gn(s,e){let[t,r]=op(!1),i=sp(async()=>{let n=s.current;if(!(!n||typeof document>"u"))try{document.fullscreenElement===n?await document.exitFullscreen():await n.requestFullscreen()}catch(a){e(Ne(a),{phase:"fullscreen"})}},[e,s]);return np(()=>{if(typeof document>"u")return;let n=()=>r(document.fullscreenElement===s.current);return n(),document.addEventListener("fullscreenchange",n),()=>document.removeEventListener("fullscreenchange",n)},[s]),{isFullscreen:t,toggleFullscreen:i}}import{useRef as ap}from"react";function gl(s){let e=ks(s.name);return{url:`${pi}${s.name}`,label:s.name,file:s,...e?{type:Jo}:{}}}async function lp(s){return ks(s.name)?gl(await s.getFile()):{url:`${pi}${s.name}`,label:s.name,localFile:s}}function cp(){return typeof window>"u"?null:window.showOpenFilePicker??null}function hp(s){return s instanceof DOMException&&s.name==="AbortError"}function up(s){let e=s.currentTarget.files?.[0];return s.currentTarget.value="",e?gl(e):null}function yn({localFiles:s,logger:e,reportError:t,playlist:r,clearError:i}){let n=ap(null),a=!!s,o=c=>{i();let u=[...r.sources,c];r.setSources(u),r.goTo(u.length-1),e.event?.("local_file_open",{label:ue(c)})};return{enabled:a,fileInputProps:{ref:n,accept:jo,onChange:c=>{let u=up(c);u&&o(u)}},localLabel:Ko,openLocalFile:async()=>{if(!a)return;let c=cp();if(!c){n.current?.click();return}try{let p=(await c({types:[{description:"Volumetric video",accept:{"application/octet-stream":[...Rs]}}]}))[0];p&&o(await lp(p))}catch(u){hp(u)||t(Ne(u),{phase:"local-file"})}}}}import{useRef as bn}from"react";function xn(s){let{containerRef:e,muted:t=!1,moduleFactory:r,overlay:i,boundaryRenderer:n,xrBackend:a,eventLogger:o,onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p,onSceneEnd:f}=s,m=bn({onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p});m.current={onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p};let d=bn(null),g=bn(!1),y=oi({containerRef:e,moduleFactory:r,moduleUrl:r?void 0:ra(),overlay:i,boundaryRenderer:n,xrBackend:a,eventLogger:o,onReady(){g.current||(g.current=!0,t||d.current?.app?.enableAudio()),m.current.onReady?.()},onProgress:b=>m.current.onProgress?.(b),onModeChange:(b,w)=>m.current.onModeChange?.(b,w),onXRStart:()=>m.current.onXRStart?.(),onXREnd:()=>m.current.onXREnd?.()});d.current=y;let x=ai(y,{onSceneEnd:f});return{gracia:y,playlist:x}}import{useCallback as vn,useMemo as yl,useState as pp}from"react";function dp(s){switch(s){case"init":case"load":case"xr":case"streaming":case"scenario":case"fullscreen":case"local-file":return s;default:return}}function wn(s,e){let[t,r]=pp(null),i=yl(()=>ya(s,e),[s,e]),n=vn((h,c)=>{r({error:h,phase:dp(c?.phase)})},[]),a=yl(()=>({event:(h,c)=>i.event?.(h,c),error:(h,c)=>{n(h,c),i.error?.(h,c)}}),[i,n]),o=vn((h,c)=>{n(h,c),i.error?.(h,c)},[i,n]),l=vn(()=>r(null),[]);return{interactionError:t,logger:a,reportError:o,clearError:l}}import{useEffect as xl,useRef as Tp}from"react";import{useEffect as fp,useRef as mp}from"react";function _n({isInitialized:s,sources:e,streaming:t,scenario:r,playlist:i,reportError:n}){let a=mp(n);a.current=n,fp(()=>{if(!s)return;let o=!1,l=h=>{if(o||h.length===0)return;let c=sr(h,r),u=c.isBranching?ca(c):[];if(u.length){a.current(new Error(`Invalid scenario: ${u.join("; ")}`),{phase:"scenario"});return}let p=ua(h,r);i.setSources(p);let f=pa(p,r);f!==null&&i.goTo(f)};if(t?.length)return bt(t,ia()).then(h=>l(oa(h,t))).catch(h=>{o||a.current(Ne(h),{phase:"streaming"})}),()=>{o=!0};l(e)},[s,e,t,r,i.setSources,i.goTo])}import{useCallback as De,useEffect as wr,useMemo as Bi,useRef as Di,useState as Sn}from"react";var Tn=15,gp=.3;function Mn({playlist:s,pack:e,timeLeft:t,onFork:r,onHold:i,onChoose:n,onDismiss:a}){let{sources:o,index:l,goTo:h}=s,c=Bi(()=>sr(o,e),[o,e]),u=c?.order??[],p=l>=0?u[l]??l:-1,f=De(E=>h(u.indexOf(E)),[h,u]),[m,d]=Sn([-1]),[g,y]=Sn(null),[x,b]=Sn(null);wr(()=>{d([-1]),y(null)},[o]);let w=Di(g);w.current=g;let T=Di(a);T.current=a;let M=Di(i);M.current=i,wr(()=>{l<0||!c||(d(E=>{let{scenes:H,openFork:X}=nr(c,E);return H.includes(p)?E:X!==null&&Ce(c,X).next.includes(p)?E.includes(X)?[...E,p]:[...E,X,p]:As(c,-1,p)??[-1,p]}),w.current&&(y(null),T.current?.()))},[l,p,c]);let D=De(E=>{let H=o[u.indexOf(E)];return(c?Ce(c,E)?.scenarioName:void 0)||(H?ue(H):`Scene ${E+1}`)},[c,o,u]),G=De((E,H=!1)=>{let X=c?Ce(c,E):void 0;if(!c||!X||X.next.length<2)return;let he=it(c,m,E);y({from:E,...X.modalTitle&&{title:X.modalTitle},options:ha(c,E,D),...he!==void 0&&{selected:he},...H&&{isReopened:!0}}),r?.(E,H)},[c,m,D,r]),R=De(E=>G(E,!0),[G]),_=De(()=>{y(null),a?.()},[a]),P=De(E=>{let H=c?Ce(c,E)?.next:void 0;if(!c||!H?.length)return;if(H.length===1){f(H[0]);return}let X=it(c,m,E);if(X!==void 0){f(X);return}M.current?.(),w.current?.from!==E&&G(E)},[c,m,f,G]),O=De(E=>{c?.isBranching&&P(c.order[E]??E)},[c,P]),k=De((E,H=!1)=>{let X=g?.from;X!==void 0&&(H||n?.(X,E,c?Ce(c,E)?.scenarioName:void 0),d(he=>{let Er=he.indexOf(X);if(Er>=0)return[...he.slice(0,Er+1),E];if(!c)return[...he,X,E];let{scenes:Wi}=nr(c,he);return Wi.includes(X)?he[he.length-1]===X?[...he,E]:[...he,X,E]:[...As(c,-1,X)??[-1,X],E]})),y(null),f(E)},[g,c,f,n]);wr(()=>{!c||l<0||w.current||t===void 0||t>gp||it(c,m,p)===void 0&&G(p)},[c,l,p,m,t,G]),wr(()=>{!c||l>=0||w.current||nr(c,m).openFork===-1&&G(-1)},[c,l,m,G]);let A=Di(k);A.current=k,wr(()=>{if(!g||g.isReopened){b(null);return}b(Tn);let E=setInterval(()=>b(X=>X===null?null:Math.max(0,X-1)),1e3),H=setTimeout(()=>A.current(g.options[0].order,!0),Tn*1e3);return()=>{clearInterval(E),clearTimeout(H)}},[g]);let K=Bi(()=>c?da(c,m,p,g?.from).map(E=>{if(E.isFork)return{...E,question:Ce(c,E.forkFrom)?.modalTitle,answer:E.taken===void 0?void 0:D(E.taken)};let H=o[c.order.indexOf(E.order)];return E.order===void 0||!H?E:{...E,title:ue(H)}}):[],[c,m,p,g?.from,D,o]),Se=Bi(()=>c?nr(c,m):null,[c,m]),ht=Bi(()=>g&&{...g,isStart:g.from===-1},[g]),Ui=De(()=>{let E=Se?.scenes.indexOf(p)??-1;Se&&E>0&&f(Se.scenes[E-1])},[Se,p,f]),Cr=De(()=>{w.current||P(p)},[P,p]);return{isInteractive:!!c?.isBranching,chips:K,prompt:ht,secondsLeft:x,choiceTimeoutSec:Tn,stepBack:Ui,stepForward:Cr,choose:k,reopenFork:R,dismissPrompt:_,goTo:f,handleSceneEnd:O}}import{useEffect as yp,useRef as bl}from"react";function Pn({currentSource:s,index:e,onSceneChange:t}){let r=bl(t);r.current=t;let i=bl(null);yp(()=>{if(!s||e<0)return;let n=`${e}:${ue(s)}`;i.current!==n&&(i.current=n,r.current?.(s,e))},[s,e])}import{useEffect as bp,useState as xp}from"react";var vp=500;function Cn(s,e,t){let[r,i]=xp(!1),n=xt(s.mode)?s.mode:null;bp(()=>{(!n||!s.xr.isActive)&&i(!1)},[n,s.xr.isActive]);let a=c=>{t(),i(!0),s.xr.setMode(c).catch(u=>{i(!1),e(Ne(u),{phase:"xr",target:c})})},o=()=>{i(!1),s.xr.setMode(Pe.PW).catch(c=>{e(Ne(c),{phase:"xr",target:Pe.PW})})},h=fn(r&&!s.error,vp)&&s.xr.isActive?n:null;return{enter:a,exit:o,activeScreenMode:h}}import{useRef as wp}from"react";import*as _p from"three";function Sp(s){if(s===!1)return null;let{uiStyle:e="modern",bannerText:t="EARLY BETA"}=s??{};try{let r=new Xt(_p,{uiStyle:e});return r.bannerText=t,r}catch{return null}}function En(s){let e=wp(void 0);return e.current===void 0&&(e.current=Sp(s)),e.current}function Ln(s,e){let{sources:t=[],streaming:r,scenario:i,muted:n=!1,cameraControls:a=!1,sceneSelector:o,moduleFactory:l,onReady:h,onProgress:c,onModeChange:u,onXRStart:p,onXREnd:f,onSceneChange:m,onError:d,eventLogger:g,localFiles:y,xrOverlay:x,xrBackend:b}=s,w=En(x),T=pn(),{interactionError:M,logger:D,reportError:G,clearError:R}=wn(g,d);xl(()=>{fi()},[]);let _=Tp(()=>{}),{gracia:P,playlist:O}=xn({containerRef:e.container,muted:n,moduleFactory:l,overlay:w,boundaryRenderer:T,xrBackend:b,eventLogger:D,onReady:h,onProgress:c,onModeChange:u,onXRStart:p,onXREnd:f,onSceneEnd:(Lr,ut)=>_.current(ut)});_n({isInitialized:P.isInitialized,sources:t,streaming:r,scenario:i,playlist:O,reportError:G});let k=P.isContentReady&&!P.isLoading,{playback:A}=P,K=Mn({playlist:O,pack:i,timeLeft:k&&A.duration>0?A.duration-A.currentTime:void 0,onFork:(Lr,ut)=>{ut&&A.pause(),D.event?.("scenario_prompt",{from:Lr,reopened:ut})},onHold:()=>{A.pause(),P.app?.player?.seek(A.duration)},onChoose:(Lr,ut,Ul)=>D.event?.("scenario_choose",{from:Lr,to:ut,scenarioName:Ul}),onDismiss:()=>A.play()});_.current=K.handleSceneEnd,xl(()=>{w&&(w.scenario=K.isInteractive?K:null)}),Pn({currentSource:O.currentSource,index:O.index,onSceneChange:m});let{fileInputProps:Se,enabled:ht,localLabel:Ui,openLocalFile:Cr}=yn({localFiles:y,logger:D,reportError:G,playlist:O,clearError:R}),{isFullscreen:E,toggleFullscreen:H}=gn(e.root,G),{playerError:X,isBlocking:he,toast:Er,retry:Wi,dismiss:Xl}=mn({coreError:P.error,interactionError:M,isSceneReady:k,currentSource:O.currentSource,open:P.open,clearError:R}),Vl=!X&&!K.prompt&&(!P.isInitialized||!k),Hi=Cn(P,G,R);return{contextValue:{gracia:P,playlist:O,scenario:K,config:{sceneSelector:o,cameraControls:a},refs:e,presentation:{isBusy:Vl,isSceneReady:k,isBlocking:he,playerError:X,toast:Er,retry:Wi,dismiss:Xl},shell:{isFullscreen:E,toggleFullscreen:H,localFilesEnabled:ht,fileInputProps:Se,openLocalFile:Cr,localLabel:Ui},xr:{enter:Hi.enter,exit:Hi.exit,activeScreenMode:he?null:Hi.activeScreenMode}},gracia:P,playlist:O,openLocalFile:Cr,toggleFullscreen:H}}import{useEffect as vl,useRef as wl,useState as Mp}from"react";import{jsx as ce,jsxs as _r}from"react/jsx-runtime";var Pp=s=>{let e=t=>{let r=s.sources[t];return String(r.id??r.url??t)};return{segments:s.sources.map((t,r)=>({key:e(r),isActive:r===s.index})),rows:s.sources.map((t,r)=>({key:e(r),marker:$e(t)?ce(Ze,{}):r+1,title:ue(t),isActive:r===s.index,select:()=>s.goTo(r)})),hasPrev:s.hasPrev,hasNext:s.hasNext,prev:s.prev,next:s.next}},Cp=s=>{let e=s.chips.filter(o=>o.order!==void 0||o.isFork),t=e.findIndex(o=>o.isActive),i=e.some(o=>o.isFork&&o.taken===void 0)?s.chips:e,n=0,a=i.map((o,l)=>o.isFork?{key:`fork-${o.forkFrom}`,marker:ce($o,{}),title:o.question||"Choose what happens next",detail:o.branchNumber===void 0?"Not chosen":String(o.branchNumber),hint:o.answer,isActive:!!o.isOpen,select:()=>s.reopenFork(o.forkFrom)}:(n+=1,o.order===void 0?{key:`blank-${l}`,marker:n,title:"\u2013",isActive:!1,isBlank:!0,select:()=>{}}:{key:String(o.order),marker:o.label,title:o.title??`Scene ${o.label}`,isActive:!!o.isActive,select:()=>s.goTo(o.order)}));return{segments:i.map((o,l)=>({key:o.order===void 0?`blank-${l}`:String(o.order),isActive:!!o.isActive,isBlank:o.order===void 0,isFork:o.isFork})).filter(o=>!o.isFork),rows:a,hasPrev:t>0&&e.slice(0,t).some(o=>o.order!==void 0),hasNext:t>=0&&t<e.length-1,prev:s.stepBack,next:s.stepForward}},Rn=()=>{let{playlist:s,scenario:e}=U(),t=wl(null),r=wl(s.index),[i,n]=Mp(!1),a=s.currentSource,o=a?ue(a):"Select scene",l=s.total>1,h=e.isInteractive?Cp(e):Pp(s);return vl(()=>{r.current!==s.index&&(r.current=s.index,n(!1))},[s.index]),vl(()=>{if(!i)return;let c=u=>{t.current&&!t.current.contains(u.target)&&n(!1)};return document.addEventListener("click",c),()=>document.removeEventListener("click",c)},[i]),_r("div",{ref:t,className:"gr-player__scene",children:[_r("div",{className:"gr-player__scene-inner",children:[_r("button",{className:"gr-player__scene-main",type:"button",disabled:!l,onClick:()=>n(!i),"aria-haspopup":"menu","aria-expanded":i,children:[ce(qo,{}),_r("span",{className:"gr-player__scene-main-copy",children:[ce("span",{className:"gr-player__scene-copy",children:ce("span",{className:"gr-player__scene-label",children:o})}),l&&ce("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:h.segments.map(c=>ce("span",{className:re("gr-player__scene-segment",c.isActive&&"is-active",c.isBlank&&"gr-player__scene-segment--blank")},c.key))})]})]}),ce("button",{className:"gr-player__scene-nav",type:"button",disabled:!h.hasPrev,onClick:()=>h.prev(),"aria-label":"Previous scene",children:ce(hi,{})}),ce("button",{className:"gr-player__scene-nav",type:"button",disabled:!h.hasNext,onClick:()=>h.next(),"aria-label":"Next scene",children:ce(ui,{})})]}),i&&l&&ce("div",{className:"gr-player__scene-menu",children:h.rows.map(c=>_r("button",{type:"button",className:re("gr-player__scene-item",c.isActive&&"is-active"),disabled:c.isBlank,title:c.hint,"aria-label":c.isBlank?`Scene ${c.marker}, not reached yet`:void 0,onClick:()=>{c.select(),n(!1)},children:[ce("span",{children:c.marker}),ce("strong",{children:c.title}),c.detail&&ce("small",{children:c.detail})]},c.key))})]})};import{jsx as Re,jsxs as kn}from"react/jsx-runtime";var _l=()=>{let{playlist:s}=U(),e=s.currentSource,t=$e(e);return Re("div",{className:"gr-player__scene gr-player__scene--stepper",children:kn("div",{className:"gr-player__scene-inner",children:[Re("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasPrev,onClick:()=>s.prev(),"aria-label":"Previous scene",children:Re(hi,{})}),Re("div",{className:"gr-player__scene-main",children:kn("span",{className:"gr-player__scene-main-copy",children:[t&&e?kn("span",{className:"gr-player__scene-count gr-player__scene-count--local",children:[Re(Ze,{}),Re("span",{className:"gr-player__scene-label",children:ue(e)})]}):Re("span",{className:"gr-player__scene-count",children:s.index>=0?`${s.index+1} of ${s.total}`:`${s.total} scenes`}),Re("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:s.sources.map((r,i)=>Re("span",{className:re("gr-player__scene-segment",i===s.index&&"is-active",$e(r)&&"gr-player__scene-segment--local")},r.id??r.url??i))})]})}),Re("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasNext,onClick:()=>s.next(),"aria-label":"Next scene",children:Re(ui,{})})]})})};import{useEffect as Ep,useRef as Lp}from"react";import{jsx as Sr}from"react/jsx-runtime";var Sl=()=>{let{playlist:s}=U(),e=Lp(null),t=s.index;return Ep(()=>{e.current?.querySelector(`.gr-player__scene-tab[data-scene-index="${t}"]`)?.scrollIntoView({block:"nearest",inline:"nearest"})},[t]),Sr("div",{className:"gr-player__scene",children:Sr("div",{className:"gr-player__scene-inner",children:Sr("div",{ref:e,className:"gr-player__scene-tabs-scroll",children:s.sources.map((r,i)=>Sr("button",{type:"button","data-scene-index":i,className:re("gr-player__scene-tab",i===s.index&&"is-active",$e(r)&&"gr-player__scene-tab--local"),onClick:()=>s.goTo(i),"aria-label":`Open ${ue(r)}`,"aria-current":i===s.index?"true":void 0,children:$e(r)?Sr(Ze,{}):i+1},r.id??r.url??i))})})})};import{jsx as kp}from"react/jsx-runtime";var Rp={tabs:Sl,stepper:_l,menu:Rn},Gi=()=>{let{config:s,scenario:e}=U(),{sceneSelector:t=ta}=s,r=e.isInteractive?Rn:Rp[t];return kp(r,{})};import{useRef as Tl,useState as Ap}from"react";import{jsx as zi,jsxs as Ip}from"react/jsx-runtime";var An=({progress:s,duration:e,onSeek:t,disabled:r=!1})=>{let i=Tl(null),n=Tl(!1),[a,o]=Ap(0),l=u=>{if(!i.current)return 0;let p=i.current.getBoundingClientRect();return Math.min(1,Math.max(0,(u.clientX-p.left)/p.width))},h=u=>{e>0&&t(l(u)*e)},c=r?void 0:{onPointerDown(u){n.current=!0,u.currentTarget.setPointerCapture(u.pointerId),h(u)},onPointerMove(u){o(l(u)),n.current&&h(u)},onPointerLeave(){o(0)},onPointerUp(u){n.current=!1,u.currentTarget.releasePointerCapture(u.pointerId)},onPointerCancel(){n.current=!1}};return zi("div",{className:"gr-player__seek-shell","aria-disabled":r||void 0,children:Ip("div",{ref:i,className:"gr-player__seek",role:"slider","aria-valuemin":0,"aria-valuemax":Math.max(e,0),"aria-valuenow":Math.round(s*Math.max(e,0)),"aria-disabled":r||void 0,tabIndex:r?-1:0,...c,children:[zi("span",{className:"gr-player__seek-fill",style:{width:`${s*100}%`}}),zi("span",{className:"gr-player__seek-hover",style:{width:`${a*100}%`}}),zi("span",{className:"gr-player__seek-thumb",style:{left:`${s*100}%`}})]})})};import{useRef as Op,useState as Fp}from"react";import{jsx as In,jsxs as Ml}from"react/jsx-runtime";var Pl=()=>{let{gracia:s,presentation:e}=U(),{isSceneReady:t}=e,{speed:r,setSpeed:i}=s.playback,[n,a]=Fp(!1),o=Op(null);return vr(o,n,()=>a(!1)),Ml("div",{ref:o,className:"gr-player__speed",children:[In(pe,{variant:"secondary",className:"gr-player__button--speed",onClick:t?()=>a(l=>!l):void 0,"aria-label":`Playback speed ${di(r)}`,"aria-haspopup":"menu","aria-expanded":n,"aria-disabled":!t||void 0,title:"Playback speed",children:di(r)}),n&&Ml("div",{className:"gr-player__speed-panel",role:"menu","aria-label":"Playback speed",children:[In("div",{className:"gr-player__speed-title",children:"Speed"}),ea.map(l=>In("button",{className:re("gr-player__speed-option",l.speed===r&&"is-active"),type:"button",role:"menuitemradio","aria-checked":l.speed===r,onClick:()=>{i(l.speed),a(!1)},children:l.label},l.speed))]})]})};import{jsx as ke,jsxs as Cl}from"react/jsx-runtime";function Bp(s,e){return e>0?Math.min(1,Math.max(0,s/e)):0}var El=()=>{let{gracia:s,playlist:e,presentation:t,shell:r}=U(),{isSceneReady:i}=t,{isFullscreen:n,toggleFullscreen:a}=r,{playback:o}=s,l=Bp(o.currentTime,o.duration);return Cl("div",{className:"gr-player__controls",children:[ke(pe,{className:"gr-player__button--play",onClick:i?()=>o.togglePlay():void 0,"aria-label":o.isPlaying?"Pause":"Play","aria-disabled":!i||void 0,children:o.isPlaying?ke(Vo,{}):ke(Xo,{})}),ke(Gi,{}),e.hasAudio&&ke(Qe,{className:"gr-player__mute",onClick:i?()=>o.toggleMute():void 0,"aria-label":o.isMuted?"Unmute":"Mute","aria-disabled":!i||void 0,children:o.isMuted?ke(Uo,{}):ke(Wo,{})}),ke(An,{progress:l,duration:o.duration,onSeek:h=>o.seek(h),disabled:!i}),Cl("div",{className:"gr-player__time",children:[Os(o.currentTime)," / ",Os(o.duration)]}),e.currentSource?.slowMo&&ke(Pl,{}),ke(Qe,{variant:["icon","secondary"],className:"gr-player__fullscreen",onClick:a,"aria-label":n?"Exit fullscreen":"Enter fullscreen","aria-pressed":n,title:n?"Exit fullscreen":"Enter fullscreen",children:ke(Zo,{active:n})})]})};import{useEffect as Dp,useRef as Gp,useState as zp}from"react";import{jsx as Tr,jsxs as On}from"react/jsx-runtime";var Ll=()=>{let{gracia:s,config:e,presentation:t}=U(),{isSceneReady:r,isBlocking:i}=t,[n,a]=zp(!1),o=Gp(null),l=e.cameraControls&&r&&!i&&!xt(s.mode);if(Dp(()=>{l||a(!1)},[l]),vr(o,n,()=>a(!1)),!l)return null;let{controlsType:h,setControls:c}=s.camera;return On("div",{ref:o,className:"gr-player__camera-control",children:[Tr(Qe,{className:"gr-player__button--camera",onClick:()=>a(u=>!u),"aria-label":"Camera controls","aria-expanded":n,title:"Camera controls",srLabel:"Camera controls",children:Tr(Ho,{})}),n&&On("div",{className:"gr-player__camera-panel",role:"menu","aria-label":"Camera controls",children:[Tr("div",{className:"gr-player__camera-title",children:"Camera"}),Qo.map(u=>On("button",{className:re("gr-player__camera-option",u.type===h&&"is-active"),type:"button",role:"menuitemradio","aria-checked":u.type===h,onClick:()=>c(u.type),children:[Tr("span",{className:"gr-player__camera-label",children:u.label}),Tr("span",{className:"gr-player__camera-hint",children:u.hint})]},u.type))]})]})};import{jsx as Mr,jsxs as Xp}from"react/jsx-runtime";var Fn=({className:s})=>{let{gracia:e,presentation:t,xr:r}=U(),{isSceneReady:i,isBlocking:n}=t,{enter:a}=r;if(n)return null;let o=e.xr.arSupported?Pe.AR:e.xr.vrSupported?Pe.VR:null;if(!o)return null;let l=o===Pe.AR;return Mr("div",{className:["gr-player__xr-actions",s].filter(Boolean).join(" "),children:Mr(Np,{active:e.mode===o,disabled:!i,icon:l?Mr(ci,{}):Mr(li,{}),label:l?"View in AR":"Play in VR",mode:o,onEnter:a})})},Np=({active:s,disabled:e,icon:t,label:r,mode:i,onEnter:n})=>Xp(pe,{className:"gr-player__button--xr",onClick:e?void 0:()=>n(i),"aria-disabled":e||void 0,"aria-pressed":s||void 0,title:r,children:[Mr("span",{children:r}),t]});import{jsx as Vt,jsxs as Bn}from"react/jsx-runtime";var Rl=()=>{let{gracia:s,playlist:e,refs:t,presentation:r,shell:i}=U(),{isBlocking:n}=r,{localFilesEnabled:a,openLocalFile:o,localLabel:l}=i,{hasInteracted:h,resetView:c}=dn(t.container,e.index,s.camera);return Bn("div",{className:"gr-player__top",children:[Bn("div",{className:"gr-player__top-left",children:[a&&Vt(Qe,{className:"gr-player__button--local",onClick:o,"aria-label":l,title:l,srLabel:"Open local file",children:Vt(Ze,{})}),Vt(Fn,{className:"gr-player__xr-actions--desktop"})]}),Bn("div",{className:"gr-player__top-right",children:[Vt(Ll,{}),Vt(Fn,{className:"gr-player__xr-actions--mobile"}),!n&&h&&Vt(pe,{variant:"secondary",className:"gr-player__reset",onClick:c,children:"Reset View"})]})]})};import{jsx as Dn,jsxs as kl}from"react/jsx-runtime";var Ni=()=>{let{presentation:s}=U(),{isBlocking:e,toast:t}=s;return kl("div",{className:"gr-player__overlay",children:[Dn(Rl,{}),!e&&kl("div",{className:"gr-player__bottom",children:[t&&Dn(Fs,{message:t.title}),Dn(El,{})]})]})};import{jsx as ct}from"react/jsx-runtime";var Al=({onExit:s})=>ct(pe,{className:"gr-player__xr-exit",onClick:s,children:"Back to 2D"}),Il=({onExit:s})=>ct(vt,{icon:ct(ci,{}),title:"Running in AR",body:"View the scene in AR mode on your device",action:ct(Al,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),Ol=({onExit:s})=>ct(vt,{icon:ct(li,{}),title:"Running in VR",body:"Put on your VR-headset and explore the scene",action:ct(Al,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),Gn={ar:Il,vr:Ol};import{Fragment as Vp,jsx as Ut,jsxs as Up}from"react/jsx-runtime";var zn=()=>{let{gracia:s,presentation:e,xr:t}=U(),{isBusy:r,isBlocking:i,playerError:n}=e,{retry:a}=e,{activeScreenMode:o,exit:l}=t,h=o?Gn[o]:null;return Up(Vp,{children:[r&&Ut(Ds,{}),i&&n&&Ut(Bs,{title:n.title,body:n.body,detail:n.cause.message,action:n.recoverable?Ut(pe,{className:"gr-player__state-action",onClick:a,children:"Try again"}):void 0}),h&&Ut(h,{onExit:l}),!r&&s.isRebuffering&&Ut("div",{className:"gr-player__rebuffer-spinner",children:Ut("div",{className:"gr-player__spinner"})})]})};import{useId as Hp}from"react";var Fl='data:image/svg+xml,<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<g id="Frame 2087329768">%0A<path id="Vector" d="M3.58369 22L2 20.4163L10.4163 12L2 3.58369L3.58369 2L12 10.4163L20.4163 2L22 3.58369L13.5837 12L22 20.4163L20.4163 22L12 13.5837L3.58369 22Z" fill="%23E9F2FF" fill-opacity="0.3" style="fill:%23E9F2FF;fill:color(display-p3 0.9137 0.9490 1.0000);fill-opacity:0.3;"/>%0A</g>%0A</svg>%0A';import{jsx as Wt,jsxs as Nn}from"react/jsx-runtime";var Xn=()=>{let{gracia:s,scenario:e}=U(),{prompt:t,secondsLeft:r,choiceTimeoutSec:i,choose:n,dismissPrompt:a}=e,o=Hp();return!t||xt(s.mode)?null:Wt("div",{className:"gr-player__prompt",children:Nn("div",{className:"gr-player__prompt-panel",role:"dialog","aria-modal":"true","aria-labelledby":o,children:[Nn("div",{className:"gr-player__prompt-head",children:[Wt("h2",{id:o,className:"gr-player__prompt-title",children:t.title||"Choose what happens next"}),t.isReopened&&Wt("button",{type:"button",className:"gr-player__prompt-close",onClick:a,"aria-label":"Close",children:Wt("img",{src:Fl,width:"24",height:"24",alt:""})})]}),Nn("div",{className:"gr-player__prompt-options",children:[r!==null&&Wt("div",{className:"gr-player__prompt-countdown",style:{width:`${r/i*100}%`},"aria-hidden":"true"}),t.options.map(l=>Wt("button",{type:"button",className:re("gr-player__prompt-option",l.order===t.selected&&"is-selected"),onClick:()=>n(l.order),children:l.label},l.order))]})]})})};import{jsx as Ht,jsxs as $p}from"react/jsx-runtime";var Zp=[],Pr=Yp(function(e,t){let{controls:r=!0,className:i,style:n,children:a,sources:o=Zp,...l}=e,h=Bl(null),c=Bl(null),{contextValue:u,gracia:p,playlist:f,openLocalFile:m,toggleFullscreen:d}=Ln({...l,sources:o},{root:h,container:c}),{presentation:g,shell:y}=u,{isBusy:x}=g,{isFullscreen:b}=y;return qp(t,()=>({gracia:p,playlist:f,get cameraControlsType(){return p.camera.controlsType},play:()=>p.playback.play(),pause:()=>p.playback.pause(),seek:w=>p.playback.seek(w),open:w=>p.open(typeof w=="string"?{url:w,label:"Scene"}:w),close:()=>p.close(),next:()=>f.next(),prev:()=>f.prev(),goTo:w=>f.goTo(w),resetCamera:()=>p.camera.reset(),setCameraControls:w=>p.camera.setControls(w),setMode:w=>p.xr.setMode(w),toggleFullscreen:d,openLocalFile:m}),[p,m,f,d]),Ht(Gs,{value:u,children:$p("section",{ref:h,className:re("gr-player",i,{"gr-player--loading":x,"gr-player--ready":p.isContentReady,"gr-player--scenes-single":f.total<=1,"gr-player--scenes-multiple":f.total>1,"gr-player--fullscreen":b,"gr-player--error":g.isBlocking}),style:n,children:[Ht("div",{ref:c,className:"gr-player__canvas"}),Ht("input",{className:"gr-player__file-input",type:"file",...y.fileInputProps}),Ht(zn,{}),r&&Ht(Ni,{}),Ht(Xn,{}),typeof a=="function"?a({gracia:p,playlist:f}):a]})})});import{createRef as Qp}from"react";import{flushSync as jp}from"react-dom";import{createRoot as Kp}from"react-dom/client";import{jsx as Jp}from"react/jsx-runtime";function Dl(s,e){let t=Qp(),r=Kp(s),i=e,n=!0,a=()=>{jp(()=>{r.render(Jp(Pr,{...i,ref:t}))})};return a(),{get player(){return t.current},update(o){n&&(i=o,a())},unmount(){n&&(n=!1,t.current?.close(),r.unmount())},async openLocalFile(){await t.current?.openLocalFile()}}}import{Box3 as ed,BufferGeometry as td,Float32BufferAttribute as rd,Matrix4 as id,Mesh as sd,MeshBasicMaterial as nd,Sphere as od,Vector2 as ad,Vector3 as Gl}from"three";var Xi=class extends sd{#e;#r=null;#t=new ad;#i=!1;#s=new id;enableMesh=!1;constructor(e){let t=new td;t.setAttribute("position",new rd([0,0,0],3)),super(t,new nd({colorWrite:!1,depthWrite:!1,transparent:!0})),this.#e=e,this.frustumCulled=!1,this.castShadow=!0,this.renderOrder=1/0,this.onBeforeRender=this.#o,this.onBeforeShadow=this.#n}get player(){return this.#e}async setAudio(e){await this.#e.loadAudio(e)}setAudioListener(e){this.#r=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}dispose(){this.#e.close(),this.#e.dispose(),this.geometry.dispose(),this.material.dispose()}#n=(e,t,r,i)=>{this.enableMesh&&this.#c(e,i)};#o=(e,t,r)=>{e.getDrawingBufferSize(this.#t);let i=this.#t.x,n=this.#t.y;if(i===0||n===0)return;this.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let a=r.matrixWorld.elements;this.#r||this.#e.setAudioListenerMatrix(a),this.#e.setAudioSourceMatrix(this.matrixWorld.elements),this.#e.renderHybridViewport(i,n,{enableMesh:this.enableMesh}),e.resetState(),!this.#i&&this.#e.isReady&&this.#a()};#c(e,t){let r=e.getContext(),i=r.getParameter(r.VIEWPORT),n=i[2],a=i[3];n===0||a===0||(this.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),this.#s.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.#s.multiply(this.matrixWorld),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.depthMask(!0),this.#e.renderMesh(this.#s.elements,i[0],i[1],n,a),e.resetState())}#a(){let e=this.#e.getBBox();if(!e)return;let t=new ed(new Gl(e.minX,e.minY,e.minZ),new Gl(e.maxX,e.maxY,e.maxZ));this.geometry.boundingBox=t,this.geometry.boundingSphere=new od,t.getBoundingSphere(this.geometry.boundingSphere),this.frustumCulled=!0,this.#i=!0}};import{ByteType as ld,DepthTexture as cd,Object3D as hd,RenderTarget as ud,RGBAFormat as pd,UnsignedIntType as dd,Vector2 as zl}from"three";var Nl=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST,Vi=class s{#e;#r;#t;#i=null;root=new hd;static attach(e,t){return e.assertDevice(t.backend?.device),new s(e,t)}constructor(e,t){this.#e=e;let r=t.backend;e.configureSurface(r.context,{usage:Nl});let{x:i,y:n}=t.getDrawingBufferSize(new zl);this.#t=new cd,this.#t.type=dd;let a=new ud(i,n);a.depthTexture=this.#t,e.isBGRA&&(a.texture.format=pd,a.texture.type=ld,a.texture.internalFormat="bgra8unorm"),this.#r=a}get player(){return this.#e}setAudioListener(e){this.#i=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}render(e,t,r,i){let n=e.getDrawingBufferSize(new zl),a=n.x,o=n.y;if(a===0||o===0)return;let l=this.#r;(l.width!==a||l.height!==o)&&(l.setSize(a,o),this.#e.configureSurface(e.backend.context,{usage:Nl})),e.setRenderTarget(l),e.render(t,r),e.setRenderTarget(null);let h=e.backend,c=h.data.get(l.texture)?.texture,u=h.data.get(this.#t)?.texture;if(!c||!u||c.width!==a||c.height!==o)return;this.root.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.root.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let p=r.matrixWorld.elements;this.#i||this.#e.setAudioListenerMatrix(p),this.#e.setAudioSourceMatrix(this.root.matrixWorld.elements),this.#e.renderTextures({color:c,depth:u,w:a,h:o}),i&&(e.autoClearColor=!1,e.autoClearDepth=!0,e.autoClearStencil=!0,e.setRenderTarget(l),e.render(i,r),e.setRenderTarget(null),e.autoClearColor=!0);let f=h.context.getCurrentTexture();f.usage&GPUTextureUsage.COPY_DST&&f.width===a&&f.height===o&&this.#e.copyTexture(c,f,[a,o,1])}setStaticModelMatrix(e){this.#e.setStaticModelMatrix(e)}dispose(){this.#r.dispose(),this.#e.close(),this.#e.dispose()}};export{_t as BoundaryRenderer,Pt as ClassicControls,Et as DebugRenderer,er as ENV_PRESETS,Is as GRACIA_PLAYER_DEFAULT_CSS,yt as GraciaApp,dt as GraciaPlayer,Pr as GraciaReactPlayer,ni as GraciaSplats,Oe as Mat4,Ft as ModernControls,Qi as POLYGON_MAX_CORNERS,ji as POLYGON_MAX_LAYERS,_e as QuadLayer,Ie as Quat,Ir as SECTOR_TILT_MAX,gt as SceneManipulator,Bt as SceneOverlay,Xi as SplatsMesh,Vi as SplatsRendererW3,te as Vec3,Xt as XROverlay,zt as XRRayRenderer,z as axis,Ar as bbox,Dr as boundsShape,bt as buildApiSources,qe as envCoefsFromPreset,is as envCoefsFromSH27,Cs as fetchStreamingMetadata,fi as installGraciaPlayerStyles,gs as isValidBounds,Gr as loadGraciaModule,Z as mat4,Dl as mountGraciaPlayer,S as num,qe as presetToLightProbe,de as quat,Ts as screenView,Br as sectorApexShift,oi as useGraciaPlayer,ai as useGraciaPlaylist,L as vec3};
