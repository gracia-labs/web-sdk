var Oe=Object.freeze,Gt=Oe([0,0,0]),sl=Oe([1,1,1]),yr=Oe([1,0,0]),Dt=Oe([0,1,0]),xn=Oe([0,0,1]),Ei=Oe([0,0,-1]),nl=.25,D=Oe({X:yr,Y:Dt,Z:xn,FORWARD:Ei,FLIP_X:Oe([-1,1,1]),FLIP_Z:Oe([1,1,-1])}),S={clamp:(s,e,t)=>Math.min(t,Math.max(e,s)),clampInt:(s,e,t)=>S.clamp(s|0,e,t),clamp01:s=>S.clamp(s,0,1),unlerp01:(s,e,t)=>t===e?0:S.clamp01((s-e)/(t-e)),finite:(s,e=0)=>Number.isFinite(s)?s:e,wrapPi(s){return s>Math.PI?s-2*Math.PI:s<-Math.PI?s+2*Math.PI:s},wrap(s,e){return e>0?(s%e+e)%e:0},wrapDelta(s,e){return e>0?s-e*Math.round(s/e):s},signedClamp(s,e,t){return s===0?0:S.clamp(Math.abs(s),e,t)*Math.sign(s)},zoomStep(s,e=.05,t=10){return s>0?S.signedClamp(Math.log2(s),e,t):0},absLogRatio(s,e){return s>0&&e>0?Math.abs(Math.log(s/e)):0},outside(s,e){return Math.abs(s)>e},perspectiveScale(s,e,t){return 2*s*Math.tan(e*Math.PI/360)/Math.max(1,t)},deadzone(s,e){let t=Math.abs(s);return t<e?0:((t-e)/(1-e))**2*Math.sign(s)},deltaSeconds(s,e,t=0,r=nl){return e?Math.min((s-e)/1e3,r):t}},br={center(s,e){return s[0]=(e.minX+e.maxX)*.5,s[1]=(e.minY+e.maxY)*.5,s[2]=(e.minZ+e.maxZ)*.5,s}},J=class extends Float32Array{constructor(e){super(3),e&&this.from(e)}set(e,t,r){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this)}fromXYZ(e){return this.set(e.x,e.y,e.z)}from(e){return typeof e.x=="number"?this.fromXYZ(e):this.set(e[0],e[1],e[2])}copy(e){return this.set(e[0],e[1],e[2])}add(e){return this[0]+=e[0],this[1]+=e[1],this[2]+=e[2],this}addXYZ(e=0,t=0,r=0){return this[0]+=e,this[1]+=t,this[2]+=r,this}addTo(e,t=Gt){return e[0]=t[0]+this[0],e[1]=t[1]+this[1],e[2]=t[2]+this[2],e}addScaled(e,t){return this[0]+=e[0]*t,this[1]+=e[1]*t,this[2]+=e[2]*t,this}addDelta(e,t){return this[0]+=e[0]-t[0],this[1]+=e[1]-t[1],this[2]+=e[2]-t[2],this}sub(e,t){return t?(this[0]=e[0]-t[0],this[1]=e[1]-t[1],this[2]=e[2]-t[2],this):(this[0]-=e[0],this[1]-=e[1],this[2]-=e[2],this)}subXYZ(e,t){return this.set(e.x-t.x,e.y-t.y,e.z-t.z)}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this}multiply(e){return this[0]*=e[0],this[1]*=e[1],this[2]*=e[2],this}multiplyXYZ(e=1,t=1,r=1){return this[0]*=e,this[1]*=t,this[2]*=r,this}divide(e){return this[0]=e[0]?this[0]/e[0]:0,this[1]=e[1]?this[1]/e[1]:0,this[2]=e[2]?this[2]/e[2]:0,this}clampScalar(e,t){return this[0]=S.clamp(this[0],e,t),this[1]=S.clamp(this[1],e,t),this[2]=S.clamp(this[2],e,t),this}normalize(e=Gt){let t=Math.hypot(this[0],this[1],this[2]);return Number.isFinite(t)&&t>1e-6?this.scale(1/t):this.copy(e)}setLength(e,t=yr){return this.normalize(t).scale(e)}cross(e,t){let r=e[0],i=e[1],n=e[2],a=t[0],o=t[1],l=t[2];return this[0]=i*l-n*o,this[1]=n*a-r*l,this[2]=r*o-i*a,this}lerp(e,t){return this[0]+=t*(e[0]-this[0]),this[1]+=t*(e[1]-this[1]),this[2]+=t*(e[2]-this[2]),this}midXYZ(e,t){return this.set((e.x+t.x)*.5,(e.y+t.y)*.5,(e.z+t.z)*.5)}fromMat4Column(e,t){let r=t*4;return this.set(e[r],e[r+1],e[r+2])}transformMat4(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i+e[12],this[1]=e[1]*t+e[5]*r+e[9]*i+e[13],this[2]=e[2]*t+e[6]*r+e[10]*i+e[14],this}transformMat4Direction(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i,this[1]=e[1]*t+e[5]*r+e[9]*i,this[2]=e[2]*t+e[6]*r+e[10]*i,this}transformQuat(e){let t=this[0],r=this[1],i=this[2],n=e[0],a=e[1],o=e[2],l=e[3],h=l*t+a*i-o*r,c=l*r+o*t-n*i,u=l*i+n*r-a*t,p=-n*t-a*r-o*i;return this[0]=h*l+p*-n+c*-o-u*-a,this[1]=c*l+p*-a+u*-n-h*-o,this[2]=u*l+p*-o+h*-a-c*-n,this}fromYawPitch(e,t){let r=Math.cos(t);return this.set(r*Math.sin(e),Math.sin(t),-r*Math.cos(e))}yawPitch(e){return this[0]=Math.atan2(e[0],-e[2]),this[1]=Math.asin(S.clamp(e[1],-1,1)),this[2]=0,this}basisFromForward(e,t,r=Dt){return this.cross(t,r).normalize(yr),e.cross(this,t),this}yawPitchBasis(e,t,r,i,n){return r.fromYawPitch(e,t),i.copy(r).scale(-1),this.set(Math.cos(e),0,Math.sin(e)),n.cross(i,this),this}rollBasis(e,t){let r=Math.cos(t),i=Math.sin(t),n=this[0],a=this[1],o=this[2],l=e[0],h=e[1],c=e[2];return this.set(n*r+l*i,a*r+h*i,o*r+c*i),e.set(l*r-n*i,h*r-a*i,c*r-o*i),this}fromSphereDir(e,t){let r=Math.sin(t);return this.set(r*Math.sin(e),Math.cos(t),r*Math.cos(e))}polarY(e,t,r=1e-6){let i=e[0]-t[0],n=e[1]-t[1],a=e[2]-t[2],o=Math.max(r,Math.hypot(i,n,a));return this[0]=Math.atan2(i,a),this[1]=Math.acos(S.clamp(n/o,-1,1)),this[2]=o,this}equals(e,t=1e-6){return Math.abs(this[0]-e[0])<=t&&Math.abs(this[1]-e[1])<=t&&Math.abs(this[2]-e[2])<=t}toArray(){return[this[0],this[1],this[2]]}toXYZ(){return{x:this[0],y:this[1],z:this[2]}}distanceXYZ(e){return Math.hypot(this[0]-e.x,this[1]-e.y,this[2]-e.z)}dot(e){return this[0]*e[0]+this[1]*e[1]+this[2]*e[2]}get sqrLen(){return this[0]*this[0]+this[1]*this[1]+this[2]*this[2]}get len(){return Math.hypot(this[0],this[1],this[2])}get xzLen(){return Math.hypot(this[0],this[2])}get minComponent(){return Math.min(this[0],this[1],this[2])}get maxAbs(){return Math.max(Math.abs(this[0]),Math.abs(this[1]),Math.abs(this[2]))}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}},Ce=class extends Float32Array{constructor(e){super(4),e?this.from(e):this.identity()}set(e,t,r,i){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this[3]=i,this)}fromXYZW(e){return this.set(e.x,e.y,e.z,e.w)}from(e){return typeof e.x=="number"?this.fromXYZW(e):this.set(e[0],e[1],e[2],e[3])}copy(e){return this.set(e[0],e[1],e[2],e[3])}identity(){return this.set(0,0,0,1)}normalize(){let e=Math.hypot(this[0],this[1],this[2],this[3]);return e>1e-6?this.scale(1/e):this.identity()}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this[3]*=e,this}setAxisAngle(e,t){let r=t*.5,i=Math.sin(r);return this.set(e[0]*i,e[1]*i,e[2]*i,Math.cos(r))}rotatePre(e,t){return this.mul(xr.setAxisAngle(e,t),this)}rotate(e,t){return this.mul(xr.setAxisAngle(e,t))}mul(e,t){let r=t?e:this,i=t??e,n=r[0],a=r[1],o=r[2],l=r[3],h=i[0],c=i[1],u=i[2],p=i[3];return this[0]=n*p+l*h+a*u-o*c,this[1]=a*p+l*c+o*h-n*u,this[2]=o*p+l*u+n*c-a*h,this[3]=l*p-n*h-a*c-o*u,this}invert(e=this){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return this.set(-e[0]*r,-e[1]*r,-e[2]*r,e[3]*r)}slerp(e,t){let r=e[0],i=e[1],n=e[2],a=e[3],o=this[0]*r+this[1]*i+this[2]*n+this[3]*a;o<0&&(o=-o,r=-r,i=-i,n=-n,a=-a);let l=1-t,h=t;if(1-o>1e-6){let c=Math.acos(o),u=Math.sin(c);l=Math.sin((1-t)*c)/u,h=Math.sin(t*c)/u}return this.set(l*this[0]+h*r,l*this[1]+h*i,l*this[2]+h*n,l*this[3]+h*a)}toXYZW(){return{x:this[0],y:this[1],z:this[2],w:this[3]}}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}get w(){return this[3]}set w(e){this[3]=e}},Ee=class extends Float32Array{constructor(e){super(16),e?this.copy(e):this.identity()}copy(e){return super.set(e),this}identity(){return this.fill(0),this[0]=this[5]=this[10]=this[15]=1,this}multiply(e,t){return t?Ci(this,e,t):Ci(this,this,e)}preMultiply(e){return Ci(this,e,this)}fromTranslation(e){return this.identity(),this[12]=e[0],this[13]=e[1],this[14]=e[2],this}fromScaling(e){return this.identity(),this[0]=e[0],this[5]=e[1],this[10]=e[2],this}perspective(e,t,r,i){let n=1/Math.tan(e*Math.PI/360);return this.fill(0),this[0]=n/t,this[5]=n,this[10]=(i+r)/(r-i),this[11]=-1,this[14]=2*i*r/(r-i),this}cameraWorld(e,t,r=Dt){let i=ve.sub(e,t).normalize(xn),n=gn.cross(r,i).normalize(yr),a=al.cross(i,n);return this.cameraWorldAxes(e,n,a,i)}cameraWorldAxes(e,t,r,i){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=0,this[4]=r[0],this[5]=r[1],this[6]=r[2],this[7]=0,this[8]=i[0],this[9]=i[1],this[10]=i[2],this[11]=0,this[12]=e[0],this[13]=e[1],this[14]=e[2],this[15]=1,this}fromQuat(e){return this.fromRotationTranslationScale(e,Gt,sl)}fromTransform(e){let{rotation:t,translation:r,scale:i}=e;return xr.fromXYZW(t).normalize(),this.fromRotationTranslationScale(xr,ve.fromXYZ(r),gn.set(i.x,i.y,i.z))}fromRotationTranslationScale(e,t,r){let i=e[0],n=e[1],a=e[2],o=e[3],l=i+i,h=n+n,c=a+a,u=i*l,p=i*h,f=i*c,m=n*h,d=n*c,g=a*c,y=o*l,_=o*h,x=o*c,v=r[0],T=r[1],M=r[2];return this[0]=(1-(m+g))*v,this[1]=(p+x)*v,this[2]=(f-_)*v,this[3]=0,this[4]=(p-x)*T,this[5]=(1-(u+g))*T,this[6]=(d+y)*T,this[7]=0,this[8]=(f+_)*M,this[9]=(d-y)*M,this[10]=(1-(u+m))*M,this[11]=0,this[12]=t[0],this[13]=t[1],this[14]=t[2],this[15]=1,this}setPosition(e){return this[12]=e[0],this[13]=e[1],this[14]=e[2],this}translate(e){let t=e[0],r=e[1],i=e[2];return this[12]=this[0]*t+this[4]*r+this[8]*i+this[12],this[13]=this[1]*t+this[5]*r+this[9]*i+this[13],this[14]=this[2]*t+this[6]*r+this[10]*i+this[14],this[15]=this[3]*t+this[7]*r+this[11]*i+this[15],this}scale(e){let t=e[0],r=e[1],i=e[2];for(let n=0;n<4;n++)this[n]*=t,this[n+4]*=r,this[n+8]*=i;return this}fromPivot(e,t,r,i,n){return this.fromTranslation(e).scale(r).translate(i),this.multiply(ll.fromQuat(t)),this.translate(ve.copy(i).scale(-1)),n?this.multiply(n):this}pointTo(e,t=Gt,r=1){return bn(e,this,t,r)}poseTo(e){return vn(e,this)}get determinant3(){return this[0]*(this[5]*this[10]-this[6]*this[9])+this[1]*(this[6]*this[8]-this[4]*this[10])+this[2]*(this[4]*this[9]-this[5]*this[8])}decompose(e,t,r){let i=Math.hypot(this[0],this[1],this[2]),n=Math.hypot(this[4],this[5],this[6]),a=Math.hypot(this[8],this[9],this[10]);this.determinant3<0&&(i=-i),e.set(this[12],this[13],this[14]),r.set(i,n,a);let o=i?1/i:0,l=n?1/n:0,h=a?1/a:0;return Re[0]=this[0]*o,Re[1]=this[1]*o,Re[2]=this[2]*o,Re[3]=this[4]*l,Re[4]=this[5]*l,Re[5]=this[6]*l,Re[6]=this[8]*h,Re[7]=this[9]*h,Re[8]=this[10]*h,ol(t,Re),this}};function ol(s,e){let t=e[0]+e[4]+e[8];if(t>0){let o=Math.sqrt(t+1),l=.5*o;return o=.5/o,s.set((e[5]-e[7])*o,(e[6]-e[2])*o,(e[1]-e[3])*o,l)}let r=0;e[4]>e[0]&&(r=1),e[8]>e[r*3+r]&&(r=2);let i=(r+1)%3,n=(r+2)%3,a=Math.sqrt(e[r*3+r]-e[i*3+i]-e[n*3+n]+1);return s[r]=.5*a,a=.5/a,s[3]=(e[i*3+n]-e[n*3+i])*a,s[i]=(e[i*3+r]+e[r*3+i])*a,s[n]=(e[n*3+r]+e[r*3+n])*a,s}var ve=new J,gn=new J,al=new J,xr=new Ce,ll=new Ee,Re=new Float32Array(9);function Ci(s,e,t){let r=e[0],i=e[1],n=e[2],a=e[3],o=e[4],l=e[5],h=e[6],c=e[7],u=e[8],p=e[9],f=e[10],m=e[11],d=e[12],g=e[13],y=e[14],_=e[15],x=t[0],v=t[1],T=t[2],M=t[3];return s[0]=x*r+v*o+T*u+M*d,s[1]=x*i+v*l+T*p+M*g,s[2]=x*n+v*h+T*f+M*y,s[3]=x*a+v*c+T*m+M*_,x=t[4],v=t[5],T=t[6],M=t[7],s[4]=x*r+v*o+T*u+M*d,s[5]=x*i+v*l+T*p+M*g,s[6]=x*n+v*h+T*f+M*y,s[7]=x*a+v*c+T*m+M*_,x=t[8],v=t[9],T=t[10],M=t[11],s[8]=x*r+v*o+T*u+M*d,s[9]=x*i+v*l+T*p+M*g,s[10]=x*n+v*h+T*f+M*y,s[11]=x*a+v*c+T*m+M*_,x=t[12],v=t[13],T=t[14],M=t[15],s[12]=x*r+v*o+T*u+M*d,s[13]=x*i+v*l+T*p+M*g,s[14]=x*n+v*h+T*f+M*y,s[15]=x*a+v*c+T*m+M*_,s}function bn(s,e,t=Gt,r=1){let i=t[0]??0,n=t[1]??0,a=t[2]??0;return s[0]=e[0]*i+e[4]*n+e[8]*a+e[12],s[1]=e[1]*i+e[5]*n+e[9]*a+e[13],s[2]=e[2]*i+e[6]*n+e[10]*a+e[14],r!==1&&(s[0]*=r,s[1]*=r,s[2]*=r),s}function yn(s,e,t,r){let i=t[0],n=t[1],a=t[2];s[0]=e[0]*i+e[4]*n+e[8]*a,s[1]=e[1]*i+e[5]*n+e[9]*a,s[2]=e[2]*i+e[6]*n+e[10]*a;let o=Math.hypot(s[0],s[1],s[2]);if(Number.isFinite(o)&&o>1e-6){let l=1/o;s[0]*=l,s[1]*=l,s[2]*=l}else s[0]=r[0],s[1]=r[1],s[2]=r[2];return s}function vn(s,e){return s[0]=e[12],s[1]=e[13],s[2]=e[14],yn(ve,e,Ei,Ei),s[3]=ve[0],s[4]=ve[1],s[5]=ve[2],yn(ve,e,Dt,Dt),s[6]=ve[0],s[7]=ve[1],s[8]=ve[2],s}var E={create:()=>new J},ue={create:()=>new Ce},Y={create:()=>new Ee,clone:s=>new Ee(s),pointTo:bn,poseTo:vn};var vr=75,Ai=64,Ii=8,Xt=1e-6,we=64,wn=16,_n=24,Sn=.9,Nt=.001,Tn=8,cl=new Float64Array(3),zt=s=>typeof s=="number"&&Number.isFinite(s),hl=s=>!!s&&zt(s.x)&&zt(s.y)&&zt(s.z),Fi=s=>S.clamp(Math.abs(s??90),1,360)*Math.PI/360,Mn=s=>s>=Math.PI-Xt,Pn=(s,e)=>Array.from({length:we+1},(t,r)=>{let i=-e+r/we*2*e;return[Math.sin(i)*s,Math.cos(i)*s]});function Sr(s,e){if(Mn(Fi(s.angleDeg)))return 0;let t=Math.min(e[0],e[2]),r=S.clamp(s.tiltDeg??0,-vr,vr)*Math.PI/180;return S.clamp(2*e[1]*Math.tan(r),-Sn*t,Sn*t)}function Rn(s){switch(s?.type){case"box":case"sphere":return!0;case"sector":return(s.angleDeg==null||zt(s.angleDeg))&&(s.tiltDeg==null||zt(s.tiltDeg));case"polygon":return!!Cn(s);default:return!1}}function Tr(s,e){let t=[e[0],e[1],e[2]];switch(s.type){case"sphere":return _l(t);case"sector":return Sr(s,t)?vl(s,t):bl(s,t);case"polygon":return wl(s,t);default:return xl(t)}}function ul(s,e){let t=Math.abs(s[0])-e[0],r=Math.abs(s[2])-e[2];return Math.hypot(Math.max(t,0),Math.max(r,0))+Math.min(Math.max(t,r),0)}function pl(s,e){let t=Math.hypot(s[0]/e[0],s[1]/e[1],s[2]/e[2]);if(t===0)return-Math.min(e[0],e[1],e[2]);let r=Math.hypot(s[0]/(e[0]*e[0]),s[1]/(e[1]*e[1]),s[2]/(e[2]*e[2]));return t*(t-1)/r}function dl(s,e,t){let r=Math.abs(e)-t;return Math.min(Math.max(s,r),0)+Math.hypot(Math.max(s,0),Math.max(r,0))}function Li(s){let e=s.length/2,t=0;for(let r=0;r<e;r++){let i=(r+1)%e*2;t+=s[r*2]*s[i+1]-s[i]*s[r*2+1]}return t/2}var Ve=(s,e,t,r,i,n)=>(t-s)*(n-e)-(r-e)*(i-s);function at(s,e,t,r,i,n){let a=i-t,o=n-r,l=S.clamp01(((s-t)*a+(e-r)*o)/(a*a+o*o));return Math.hypot(s-t-a*l,e-r-o*l)}function fl(s,e,t){let r=s.length/2,i=e*2,n=(e+1)%r*2,a=t*2,o=(t+1)%r*2,l=Ve(s[a],s[a+1],s[o],s[o+1],s[i],s[i+1]),h=Ve(s[a],s[a+1],s[o],s[o+1],s[n],s[n+1]),c=Ve(s[i],s[i+1],s[n],s[n+1],s[a],s[a+1]),u=Ve(s[i],s[i+1],s[n],s[n+1],s[o],s[o+1]);return l*h<0&&c*u<0?0:Math.min(at(s[i],s[i+1],s[a],s[a+1],s[o],s[o+1]),at(s[n],s[n+1],s[a],s[a+1],s[o],s[o+1]),at(s[a],s[a+1],s[i],s[i+1],s[n],s[n+1]),at(s[o],s[o+1],s[i],s[i+1],s[n],s[n+1]))}function ml(s){let e=s.length/2;for(let t=0;t<e;t++){let r=(t+e-1)%e*2,i=t*2,n=(t+1)%e*2;if(Math.hypot(s[n]-s[i],s[n+1]-s[i+1])<Nt||at(s[n],s[n+1],s[r],s[r+1],s[i],s[i+1])<Nt||at(s[r],s[r+1],s[i],s[i+1],s[n],s[n+1])<Nt)return!1}for(let t=0;t<e;t++)for(let r=t+2;r<e;r++)if(!(t===0&&r===e-1)&&fl(s,t,r)<Nt)return!1;return!0}function gl(s,e,t,r){for(let i=0;i<e.length;i++)s[i]=e[i]+(t[i]-e[i])*r;return s}function Cn(s){let{layers:e}=s;if(!Array.isArray(e)||e.length<2||e.length>Ii)return null;let t=Array.isArray(e[0])?e[0].length:0;if(t<3||t>Ai||!e.every(o=>Array.isArray(o)&&o.length===t&&o.every(hl)))return null;let r=e.map(o=>Float64Array.from(o.flatMap(l=>[l.x,l.y,l.z])));for(let o=1;o<r.length;o++)for(let l=0;l<t;l++)if(r[o][l*3+1]-r[o-1][l*3+1]<Nt)return null;let i=r.map(wr),n=Math.sign(Li(i[0])),a=new Float64Array(t*2);for(let o=0;o<i.length-1;o++)for(let l=o?1:0;l<=Tn;l++){gl(a,i[o],i[o+1],l/Tn);let h=Li(a);if(Math.abs(h)<Xt||Math.sign(h)!==n||!ml(a))return null}return n>0?r:r.map(yl)}function wr(s){let e=s.length/3,t=new Float64Array(e*2);for(let r=0;r<e;r++)t[r*2]=s[r*3],t[r*2+1]=s[r*3+2];return t}function yl(s){let e=s.length/3,t=new Float64Array(s.length);for(let r=0;r<e;r++)t.set(s.subarray((e-1-r)*3,(e-r)*3),r*3);return t}function ki(s){let e=s.length/2,t=Math.sign(Li(s))||1,r=Array.from({length:e},(l,h)=>h),i=[],n=l=>s[l*2],a=l=>s[l*2+1],o=(l,h,c)=>{if(Ve(n(l),a(l),n(h),a(h),n(c),a(c))*t<=Xt*Xt)return!1;for(let u of r){if(u===l||u===h||u===c)continue;let p=Ve(n(l),a(l),n(h),a(h),n(u),a(u))*t,f=Ve(n(h),a(h),n(c),a(c),n(u),a(u))*t,m=Ve(n(c),a(c),n(l),a(l),n(u),a(u))*t;if(p>=0&&f>=0&&m>=0)return!1}return!0};for(;r.length>3;){let l=r.length,h=!1;for(let c=0;c<l;c++){let u=r[(c+l-1)%l],p=r[c],f=r[(c+1)%l];if(o(u,p,f)){i.push(u,p,f),r.splice(c,1),h=!0;break}}if(!h)break}return r.length===3&&i.push(r[0],r[1],r[2]),i}function xl(s){let e=new Float32Array([-s[0],-s[2],s[0],-s[2],s[0],s[2],-s[0],s[2]]);return En(t=>ul(t,s),e,[0,1,2,3],s[1])}function bl(s,e){let t=Math.min(e[0],e[2]),r=Fi(s.angleDeg),i=Mn(r),n=Math.sin(r),a=Math.cos(r),o=h=>{let c=Math.hypot(h[0],h[2])-t;if(i)return c;let u=Math.abs(h[0]),p=S.clamp(u*n+h[2]*a,0,t),f=Math.hypot(u-n*p,h[2]-a*p);return Math.max(c,f*Math.sign(a*u-n*h[2]))},l=i?Di(t,t):Float32Array.from([0,0,...Pn(t,r).flat()]);return En(o,l,i?[]:[0,1,we+1],e[1])}function vl(s,e){let t=e[1],r=Math.min(e[0],e[2]),i=Fi(s.angleDeg),n=Sr(s,e),a=Pn(r,i),o=(h,c)=>{let u=-t+2*t*h,p=n*h,f=[0,u,p],m=([d,g],y)=>f.push(d*y,u,p+(g-p)*y);for(let d=1;d<c;d++)m(a[0],d/c);for(let[d,g]of a)f.push(d,u,g);for(let d=c-1;d>0;d--)m(a[we],d/c);return Float64Array.from(f)},l=[o(0,1),o(1,1)];return Ln([o(0,wn),o(1,wn)],l,()=>Gi(l,[0,1,we+1]))}function wl(s,e){let t=Cn(s).map(r=>r.map((i,n)=>i*2*e[n%3]));return Ln(t,[t[0],t[t.length-1]],()=>Gi(t))}function En(s,e,t,r){let i=[_r(e,-r),_r(e,r)];return Oi(n=>dl(s(n),n[1],r),i,()=>Bi(i,i,!0),()=>Gi(i,t))}function Ln(s,e,t){let r=Sl(s,e);return Oi(i=>Tl(i,r),e.map(i=>Float32Array.from(i)),()=>Bi(s,e,!0),t)}function _l(s){return Oi(e=>pl(e,s),[_r(Di(s[0],s[2]),-s[1])],()=>Rl(s),()=>Cl(s))}function Oi(s,e,t,r){let i=null,n=null;return{signedDistance:s,outlines:e,get mesh(){return i??=t()},get lines(){return n??=r()}}}function Sl(s,[e,t]){let r=s[0].length/3,i=(h,c)=>h.subarray(c*3,c*3+3),n=[],a=(h,c,u)=>n.push(...h,...c,...u);for(let h=0;h<s.length-1;h++)for(let c=0;c<r;c++){let u=(c+1)%r;a(i(s[h],c),i(s[h+1],c),i(s[h+1],u)),a(i(s[h],c),i(s[h+1],u),i(s[h],u))}let o=ki(wr(t));for(let h=0;h<o.length;h+=3)a(i(t,o[h]),i(t,o[h+2]),i(t,o[h+1]));let l=ki(wr(e));for(let h=0;h<l.length;h+=3)a(i(e,l[h]),i(e,l[h+1]),i(e,l[h+2]));return Float64Array.from(n)}function Tl(s,e){let t=0,r=Number.POSITIVE_INFINITY;for(let i=0;i<e.length;i+=9)t+=Pl(s,e,i),r=Math.min(r,Ml(s,e,i,cl));return Math.abs(t)>2*Math.PI?-r:r}function Ke(s,e,t,r,i){for(let n=0;n<3;n++)s[n]=e[t+n]+(e[t+3+n]-e[t+n])*r+(e[t+6+n]-e[t+n])*i}function Ml(s,e,t,r){let i=e[t+3]-e[t],n=e[t+4]-e[t+1],a=e[t+5]-e[t+2],o=e[t+6]-e[t],l=e[t+7]-e[t+1],h=e[t+8]-e[t+2],c=i*(s[0]-e[t])+n*(s[1]-e[t+1])+a*(s[2]-e[t+2]),u=o*(s[0]-e[t])+l*(s[1]-e[t+1])+h*(s[2]-e[t+2]),p=i*(s[0]-e[t+3])+n*(s[1]-e[t+4])+a*(s[2]-e[t+5]),f=o*(s[0]-e[t+3])+l*(s[1]-e[t+4])+h*(s[2]-e[t+5]),m=i*(s[0]-e[t+6])+n*(s[1]-e[t+7])+a*(s[2]-e[t+8]),d=o*(s[0]-e[t+6])+l*(s[1]-e[t+7])+h*(s[2]-e[t+8]),g=p*d-m*f,y=m*u-c*d,_=c*f-p*u;if(c<=0&&u<=0)Ke(r,e,t,0,0);else if(p>=0&&f<=p)Ke(r,e,t,1,0);else if(_<=0&&c>=0&&p<=0)Ke(r,e,t,c/(c-p),0);else if(d>=0&&m<=d)Ke(r,e,t,0,1);else if(y<=0&&u>=0&&d<=0)Ke(r,e,t,0,u/(u-d));else if(g<=0&&f-p>=0&&m-d>=0){let x=(f-p)/(f-p+(m-d));Ke(r,e,t,1-x,x)}else{let x=1/(g+y+_);Ke(r,e,t,y*x,_*x)}return Math.hypot(s[0]-r[0],s[1]-r[1],s[2]-r[2])}function Pl(s,e,t){let r=e[t]-s[0],i=e[t+1]-s[1],n=e[t+2]-s[2],a=e[t+3]-s[0],o=e[t+4]-s[1],l=e[t+5]-s[2],h=e[t+6]-s[0],c=e[t+7]-s[1],u=e[t+8]-s[2],p=Math.sqrt(r*r+i*i+n*n),f=Math.sqrt(a*a+o*o+l*l),m=Math.sqrt(h*h+c*c+u*u),d=r*(o*u-l*c)-i*(a*u-l*h)+n*(a*c-o*h),g=r*a+i*o+n*l,y=a*h+o*c+l*u,_=h*r+c*i+u*n;return 2*Math.atan2(d,p*f*m+g*m+y*p+_*f)}function Bi(s,e,t){let r=s[0].length/3,i=[],n=[],a=[],o=Number.POSITIVE_INFINITY;for(let d of s)for(let g=1;g<d.length;g+=3)o=Math.min(o,d[g]);let l=(d,g)=>{let y=g*3,_=(g+1)%r*3;return Math.hypot(d[_]-d[y],d[_+1]-d[y+1],d[_+2]-d[y+2])},h=d=>{let g=0;for(let y=0;y<r;y++)g+=l(d,y);return g},c=s.reduce((d,g)=>h(g)>h(d)?g:d),u=new Float64Array(r*2),p=[0];for(let d=0;d<r;d++){let g=d*3,y=(d+1)%r*3,_=0,x=0,v=0;for(let B of s)_+=B[y]-B[g],x+=B[y+2]-B[g+2],v=Math.max(v,l(B,d));let T=Math.hypot(_,x);T>Xt&&(u[d*2]=_/T,u[d*2+1]=x/T);let M=(c[y]-c[g])*u[d*2]+(c[y+2]-c[g+2])*u[d*2+1];p.push(p[d]+(t?M:v))}let f=(d,g,y,_,x)=>{let v=g%r*3,T=y*3,M=t?p[y]+(d[v]-c[T])*u[y*2]+(d[v+2]-c[T+2])*u[y*2+1]:p[y+_];i.push(d[v],d[v+1],d[v+2]),n.push(M*x,d[v+1]-o,x)};for(let d=0;d<s.length-1;d++)for(let g=0;g<r;g++){let y=i.length/3,_=t?1:l(s[d],g),x=t?1:l(s[d+1],g);f(s[d],g,g,0,_),f(s[d],g+1,g,1,_),f(s[d+1],g+1,g,1,x),f(s[d+1],g,g,0,x),a.push(y,y+1,y+2,y,y+2,y+3)}let m=a.length;for(let d of[...e].reverse()){let g=i.length/3;for(let y=0;y<d.length;y+=3)i.push(d[y],d[y+1],d[y+2]),n.push(0,d[y+1]-o,1);for(let y of ki(wr(d)))a.push(g+y)}return{positions:new Float32Array(i),grid:new Float32Array(n),indices:new Uint32Array(a),capStart:m}}function _r(s,e){let t=s.length/2,r=new Float32Array(t*3);for(let i=0;i<t;i++)r.set([s[i*2],e,s[i*2+1]],i*3);return r}function Gi(s,e=Array.from({length:s[0].length/3},(t,r)=>r)){let t=s[0].length/3,r=[],i=(n,a)=>r.push(n[a*3],n[a*3+1],n[a*3+2]);for(let n of s)for(let a=0;a<t;a++)i(n,a),i(n,(a+1)%t);for(let n=0;n<s.length-1;n++)for(let a of e)i(s[n],a),i(s[n+1],a);return new Float32Array(r)}function Di(s,e){let t=new Float32Array(we*2);for(let r=0;r<we;r++){let i=r/we*2*Math.PI;t[r*2]=Math.sin(i)*s,t[r*2+1]=Math.cos(i)*e}return t}function Rl(s){let e=[];for(let t=0;t<=_n;t++){let r=-Math.PI/2+t/_n*Math.PI,i=Math.cos(r);e.push(_r(Di(s[0]*i,s[2]*i),s[1]*Math.sin(r)))}return Bi(e,[],!1)}function Cl(s){let e=[],t=r=>{for(let i=0;i<we;i++)e.push(...r(i/we*2*Math.PI),...r((i+1)/we*2*Math.PI))};return t(r=>[Math.cos(r)*s[0],Math.sin(r)*s[1],0]),t(r=>[Math.cos(r)*s[0],0,Math.sin(r)*s[2]]),t(r=>[0,Math.cos(r)*s[1],Math.sin(r)*s[2]]),new Float32Array(e)}var El=.28209479177387814;function kn(s,e=.5){let t=1/(El*Math.max(s[0],s[1],s[2],.01));for(let r=0;r<3;r++)s[r]*=t;for(let r=3;r<12;r++)s[r]*=t*e}function Ni(s,e=null,t=.5){let r=new Float32Array(12);for(let i=0;i<12;i++)r[i]=s[i];if(e){let i=e[0]??e.x,n=e[1]??e.y,a=e[2]??e.z;if(r[9]*i+r[3]*n+r[6]*a>0)for(let o=3;o<12;o++)r[o]*=-1}return kn(r,t),r}function We(s){let e=new Float32Array(12);return e.set(s.ambient,0),e.set(s.topDown,3),s.frontBack&&e.set(s.frontBack,6),s.leftRight&&e.set(s.leftRight,9),e}async function Mr(s="@gracia/web-sdk/wasm"){for(let e=0;;e++)try{let t=await import(s);return t.default??t}catch{await new Promise(r=>setTimeout(r,1e3))}}var Pr=class{#e;#r=0;constructor(e,t=512){this.#e=e,this.#r=e._malloc(t)}ptr(e=0){return this.#r+e}get f32(){return this.#e.HEAPF32}writeF32(e,t=0){this.#e.HEAPF32.set(e,this.#r+t>>2)}readF32(e,t=0){let r=this.#r+t;return new Float32Array(this.#e.HEAPF32.buffer,r,e)}free(){this.#r&&(this.#e._free(this.#r),this.#r=0)}};function zi(s,e,...t){if(!e)return;let r=new TextEncoder,i=[],n=t.map(o=>{if(typeof o!="string")return o;let l=r.encode(o),h=s._malloc(l.length+1);return s.HEAPU8.set(l,h),s.HEAPU8[h+l.length]=0,i.push(h),h}),a=e(...n);for(let o of i)s._free(o);return a}var A=(s,e)=>s[`_Gracia_${e}`];async function Ll(s){let e=await navigator.gpu.requestAdapter({powerPreference:"high-performance",xrCompatible:s});if(!e)throw new Error("WebGPU adapter not available");return await e.requestDevice({requiredLimits:{maxStorageBuffersPerShaderStage:10,maxComputeWorkgroupSizeX:256,maxBufferSize:e.limits.maxBufferSize,maxStorageBufferBindingSize:e.limits.maxStorageBufferBindingSize}})}var Rr=class s{#e;#r;#t=null;#i=0;constructor(e){this.#e=e,this.#r=new Pr(e)}static async boot(e,t,{maxSplatsCount:r=0,xrCompatible:i=!1}={}){let n=typeof e=="function"?await e({canvas:t}):e,a=await Ll(i);if(typeof e=="function"&&(n.preinitializedWebGPUDevice=a,n.WebGPU?.importJsDevice?.(a)),A(n,"Init")?.(r|0),!A(n,"Initialized")?.())throw new Error("Gracia init failed");return{module:new s(n),device:a}}get heap(){return this.#r}get backend(){return this.#t}get buildUnixTime(){return A(this.#e,"GetBuildTime")?.()??0}shutdownApp(){A(this.#e,"Shutdown")?.()}setCamera(e,t,r,i){let n=!!(r&&i),a=this.#r.ptr(),o=a>>2,l=this.#r.f32;l.set(e,o),n&&l.set(r,o+16),l.set(t,o+32),n&&l.set(i,o+48),A(this.#e,"SetCamera")?.(n,a)}getModelMatrix(){let e=A(this.#e,"GetModelMatrix");if(!e)return null;let t=this.#r.ptr(256);return e(t),this.#r.readF32(16,256)}setModelMatrix(e){let t=A(this.#e,"SetModelMatrix");t&&(this.#r.writeF32(e,256),t(this.#r.ptr(256)))}initPure(e){this.shutdownBackend(),this.#t="pure",A(this.#e,"P_Init")?.(e?1:0)}pureRenderTo(e,t,r,i){return A(this.#e,"P_RenderTo")?.(this.#s(e),this.#s(t),r,i)!==0}pureRenderXR(e,t,r){let i=e[0].sub,n=r?i.motionVectorTexture:null,a=r?i.depthStencilTexture:null;return this.#r.writeF32(e.flatMap(({sub:o})=>{let l=o.viewport;return[o.getViewDescriptor().baseArrayLayer,l.x,l.y,l.width,l.height]})),A(this.#e,"P_RenderXR")?.(this.#s(i.colorTexture),this.#s(n),this.#s(a),this.#r.ptr(),e.length,t)===1}#s(e){return e?this.#e.WebGPU.importJsTexture(e):0}initHybrid(e){this.shutdownBackend(),this.registerGL(e),this.#t="hybrid",A(this.#e,"H_Init")?.()}hybridFrame(e,t,r){A(this.#e,"H_Frame")?.(e,t,r)}hybridPreprocess(e,t){return A(this.#e,"H_Preprocess")?.(e,t)??0}hybridRender(e,t,r,i,n,a){A(this.#e,"H_Render")?.(e,t,r,i,n,a)}hybridRenderMesh(e,t,r,i,n){this.#r.writeF32(e),A(this.#e,"H_RenderMeshMVP")?.(this.#r.ptr(),t,r,i,n)}hybridRenderMotionMV(e,t,r,i){A(this.#e,"H_RenderMotionMV")?.(e,t,r,i)}hybridCanMotion(){return!!A(this.#e,"H_CanMotion")?.()}hybridHasMultiview(){return!!A(this.#e,"H_HasMultiview")?.()}hybridReset(){A(this.#e,"H_Reset")?.()}registerGL(e){this.#i&&this.#e.GL?.deleteContext(this.#i);let t=this.#e.GL;if(!t)throw new Error("WASM GL layer not available");this.#i=t.registerContext(e,{majorVersion:2,minorVersion:0,enableExtensionsByDefault:!0}),t.makeContextCurrent(this.#i)}shutdownBackend(){this.#t==="pure"?A(this.#e,"P_Shutdown")?.():this.#t==="hybrid"&&A(this.#e,"H_Shutdown")?.(),this.#i&&(this.#e.GL?.deleteContext(this.#i),this.#i=0),this.#t=null}dispose(){this.shutdownBackend(),this.#r.free(),this.shutdownApp()}addDynamicScene(){return A(this.#e,"AddScene")?.()??0}addStaticScene(){return A(this.#e,"AddStaticScene")?.()??0}removeScene(e){A(this.#e,"RemoveScene")?.(e)}sceneReady(e){return e?(A(this.#e,"SceneReady")?.(e)??0)!==0:!1}sceneProgress(e){return e?A(this.#e,"SceneProgress")?.(e)??0:0}sceneDuration(e){return e?A(this.#e,"SceneDuration")?.(e)??0:0}sceneIsBuffering(e){return e?(A(this.#e,"SceneIsBuffering")?.(e)??0)!==0:!1}sceneLastFetchStatus(e){return e?A(this.#e,"SceneGetLastFetchStatus")?.(e)??0:0}sceneSetTime(e,t){A(this.#e,"SceneSetTime")?.(e,t)}sceneSetPlaybackRange(e,t,r){A(this.#e,"SceneSetPlaybackRange")?.(e,t,r)}sceneSetVisible(e,t){A(this.#e,"SceneSetVisible")?.(e,t)}sceneGetBBox(e){let t=A(this.#e,"SceneGetBBox");if(!t||!e)return null;let r=this.#r.ptr(256);t(e,r);let i=r>>2,n=this.#r.f32;return n[i]===0&&n[i+1]===0&&n[i+2]===0&&n[i+3]===0&&n[i+4]===0&&n[i+5]===0?null:{minX:n[i],minY:n[i+1],minZ:n[i+2],maxX:n[i+3],maxY:n[i+4],maxZ:n[i+5]}}sceneSetEnvLighting(e,t,r){let i=A(this.#e,"SceneSetEnvPreset");if(!i||!e)return;let n=this.#r.ptr(128),a=n>>2,o=this.#r.f32;for(let l=0;l<4;l++)o[a+l*4]=t[l*3],o[a+l*4+1]=t[l*3+1],o[a+l*4+2]=t[l*3+2],o[a+l*4+3]=0;o[a+3]=r,i(e,n)}sceneClearEnvLighting(e){A(this.#e,"SceneClearEnvPreset")?.(e)}sceneSetModelMatrix(e,t){let r=A(this.#e,"SceneSetModelMatrix");!r||!e||(this.#r.writeF32(t,256),r(e,this.#r.ptr(256)))}sceneOpen(e,t){zi(this.#e,A(this.#e,"SceneOpen"),e,t)}sceneOpenApi(e,t,r){zi(this.#e,A(this.#e,"SceneOpenApi"),e,t,r)}registerLocalFile(e){let t=this.#e.graciaRegisterLocalFile;if(!t)throw new Error("WASM local-file bridge unavailable");return t(e)}sceneOpenLocal(e,t){A(this.#e,"SceneOpenLocal")?.(e,t)}sceneOpenStatic(e,t){let r=A(this.#e,"SceneOpenStatic");if(!r)return-1;let i=this.#e._malloc(t.length);this.#e.HEAPU8.set(t,i);try{return r(e,i,t.length)}finally{this.#e._free(i)}}};var kl={panningModel:"HRTF",distanceModel:"inverse",refDistance:1,maxDistance:100,rolloffFactor:1},Al=[0,0,0],Il=[0,0,0,0,0,-1,0,1,0],Fl=.1,Ol=40,An=.01,In=.08,Bl=1.5,Fn=.05,Gl=2e3;function On(){typeof navigator<"u"&&navigator.audioSession&&(navigator.audioSession.type="playback")}function Bn(){return typeof performance<"u"?performance.now():Date.now()}function me(s,e,t,r=0){r>0?s.linearRampToValueAtTime(e,t.currentTime+r):s.setValueAtTime(e,t.currentTime)}function Dl(s,e,t){s.setTargetAtTime(e,t.currentTime,.01)}function Cr(s){try{s.disconnect()}catch{}}function ge(s,e){return Math.abs(s-e)<1e-4}function fe(s){try{s.automationRate="k-rate"}catch{}}function Xi(s){s.positionX&&(fe(s.positionX),fe(s.positionY),fe(s.positionZ),"orientationX"in s?(fe(s.orientationX),fe(s.orientationY),fe(s.orientationZ)):(fe(s.forwardX),fe(s.forwardY),fe(s.forwardZ),fe(s.upX),fe(s.upY),fe(s.upZ)))}function Gn(s,e,t,r,i,n=0){me(s.positionX,e,i,n),me(s.positionY,t,i,n),me(s.positionZ,r,i,n)}function Nl(s,e,t,r,i,n,a,o,l=0){if("orientationX"in s){me(s.orientationX,e,o,l),me(s.orientationY,t,o,l),me(s.orientationZ,r,o,l);return}me(s.forwardX,e,o,l),me(s.forwardY,t,o,l),me(s.forwardZ,r,o,l),me(s.upX,i,o,l),me(s.upY,n,o,l),me(s.upZ,a,o,l)}var Ui=class{#e=null;#r=null;#t=[0,0,0];#i=[0,0,-1,0,1,0];#s=!1;#n=new Float32Array(9);#o=!1;constructor(){On(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&this.#e&&this.#e.state!=="running"&&this.resume()})}get ctx(){return this.#e}get destination(){return this.#r??this.#e?.destination??null}setOutput(e){e?.context&&e.context!==this.#e&&(this.#e=e.context,Xi(this.#e.listener),this.#o=!1),this.#r=e?.destination??null,this.#s=e?.externalListener===!0,this.#a()}prepare(){let e=this.#c();if(!e)throw new Error("Web Audio is not supported in this browser");return{ctx:e,destination:this.destination??e.destination}}resume(){On();let e=this.#c();return e?e.state==="running"?Promise.resolve():e.resume().catch(()=>{}):Promise.resolve()}listener(e,t,r,i,n,a,o,l,h,c=0){this.#t=[e,t,r],this.#i=[i,n,a,o,l,h],this.#a(c)}resetListener(){this.listener(...Il)}#c(){if(this.#e)return this.#e;if(typeof AudioContext>"u")return null;try{this.#e=new AudioContext}catch{return null}return Xi(this.#e.listener),this.#o=!1,this.#a(),this.#e}#a(e=0){let t=this.#e?.listener;if(!t||this.#s)return;let[r,i,n]=this.#t,[a,o,l,h,c,u]=this.#i,p=this.#n;this.#o&&ge(r,p[0])&&ge(i,p[1])&&ge(n,p[2])&&ge(a,p[3])&&ge(o,p[4])&&ge(l,p[5])&&ge(h,p[6])&&ge(c,p[7])&&ge(u,p[8])||(p.set([r,i,n,a,o,l,h,c,u]),this.#o=!0,Gn(t,r,i,n,this.#e,e),Nl(t,a,o,l,h,c,u,this.#e,e))}},Le=new Ui,Vi=class{#e;#r;#t;#i;#s;#n;ready;#o=null;#c=[];#a=null;#l=!1;#u=!1;#h=!1;#d=!1;#p=!1;#f=0;#m=0;#g=0;#y=NaN;#T=NaN;#w=NaN;constructor(e,t={}){let{ctx:r,destination:i}=Le.prepare();this.#e=r,this.#n=t.destination??i;let n=new Audio;this.#r=n,n.crossOrigin="anonymous",n.preload="auto",n.loop=!0,n.preservesPitch=!1,this.#i=r.createGain(),this.#s=r.createPanner(),Xi(this.#s),this.pannerAttr({...kl,...t.pannerAttr}),this.#t=r.createMediaElementSource(n),this.#t.connect(this.#s),this.#s.connect(this.#i),this.#i.connect(this.#n),this.volume(t.volume??1).rate(t.rate??1).pos(...t.pos??Al),this.ready=new Promise(a=>{this.#o=a}),this.#x("loadedmetadata",()=>this.#R()),this.#x("canplay",()=>this.#b()),this.#x("loadeddata",()=>this.#b()),this.#x("error",()=>this.#v(`Media error ${n.error?.code??"unknown"}`)),n.src=e,n.load(),this.#b()}get context(){return this.#e}get blocked(){return this.#h}get failed(){return this.#l}get buffering(){return this.#P||this.#_&&this.#g>0}get clockRate(){return!this.#_||Math.abs(this.#m)<An?1:1+S.clamp(Bl*this.#m,-Fn,Fn)}get#_(){return!this.#l&&!this.#h&&!this.#u}get#P(){return this.#_&&(!this.#d||this.#p||this.#r.paused||this.#r.readyState<3||this.#r.seeking||this.#a!==null)}#x(e,t){this.#c.push([e,t]),this.#r.addEventListener(e,t)}#b(){this.#r.readyState<3||this.#u||this.#M()}#M(){this.#o?.(),this.#o=null}#v(e){this.#u||this.#l||(this.#l=!0,this.pause(),this.#M())}allowPlayback(){this.#h=!1}play(){if(this.#l||this.#h||this.#u||this.#p||this.#d&&!this.#r.paused)return;let e=++this.#f;this.#p=!0;try{Promise.resolve(this.#r.play()).then(()=>{e!==this.#f||this.#u||(this.#p=!1,this.#d=!0)}).catch(t=>this.#S(e,t))}catch(t){this.#S(e,t)}}#S(e,t){e!==this.#f||this.#u||(this.#p=!1,this.#d=!1,t?.name==="NotAllowedError"?(this.#h=!0,this.#r.pause()):t?.name!=="AbortError"&&this.#v(t))}pause(){this.#f++,this.#p=!1,this.#d=!1,this.#E(),this.#r.paused||this.#r.pause()}unload(){this.pause(),this.#u=!0;for(let[e,t]of this.#c)this.#r.removeEventListener(e,t);this.#c=[],this.#r.removeAttribute("src"),this.#r.load(),this.#M(),Cr(this.#t),Cr(this.#s),Cr(this.#i)}seek(e){return typeof e=="number"&&(this.#E(),this.#a=Number.isFinite(e)?Math.max(0,e):0,this.#R()),this.#a??this.#r.currentTime}#R(){if(this.#a===null||this.#r.readyState<1)return;let e=this.#r.duration,t=Number.isFinite(e)&&e>0?S.wrap(this.#a,e):this.#a;Math.abs(this.#r.currentTime-t)>.005&&(this.#r.currentTime=t),this.#a=null}sync(e){this.#l||this.#h||this.#u||(!this.#d||this.#r.paused)&&!this.#p&&(this.seek(e),this.play())}follow(e){if(this.#P||!this.#_||this.#e.state!=="running"){this.#E();return}let t=this.#r.currentTime-e,r=this.#r.duration;Number.isFinite(r)&&r>0&&(t=S.wrapDelta(t,r));let i=Bn();if(t<-In?this.#g||=i:t>-An&&(this.#g=0),t>In||this.#g&&i-this.#g>Gl){this.seek(e);return}this.#m=t}#E(){this.#m=0,this.#g=0}volume(e){return Dl(this.#i.gain,S.clamp01(e),this.#e),this}rate(e){return this.#r.playbackRate=S.clamp(S.finite(e,1),.1,4),this}pos(e,t,r,i=0){return ge(e,this.#y)&&ge(t,this.#T)&&ge(r,this.#w)?this:(this.#y=e,this.#T=t,this.#w=r,Gn(this.#s,e,t,r,this.#e,i),this)}destination(e){let t=e??this.#e.destination;return t===this.#n?this:(Cr(this.#i),this.#n=t,this.#i.connect(this.#n),this)}pannerAttr(e){return e?(e.panningModel&&(this.#s.panningModel=e.panningModel),e.distanceModel&&(this.#s.distanceModel=e.distanceModel),typeof e.refDistance=="number"&&(this.#s.refDistance=e.refDistance),typeof e.maxDistance=="number"&&(this.#s.maxDistance=e.maxDistance),typeof e.rolloffFactor=="number"&&(this.#s.rolloffFactor=e.rolloffFactor),this):this}},Er=class{#e=null;#r=null;#t=[0,0,0];#i=E.create();#s=new Float32Array(9);#n={volume:1,rate:1,pannerAttr:{}};#o=!1;#c=0;#a=0;#l=0;#u=!1;get context(){return Le.ctx}get isLoaded(){return!this.#u||!this.#o||Le.ctx?.state!=="running"||this.#e?.blocked===!0}get isBuffering(){return this.#o&&(this.#e?.buffering??!1)}setOutput(e){if(Le.setOutput(e),!!this.#e){if(this.#e.context!==Le.ctx){let t=this.#r,r=this.#e.seek();this.unload(),t&&(this.load(t),this.#e?.seek(r));return}this.#e.destination(Le.destination)}}async load(e){if(e===this.#r&&this.#e&&!this.#e.failed){await this.#e.ready;return}this.unload(),this.#r=e,this.#u=!0;let t=++this.#c;try{this.#e=new Vi(e,{...this.#n,pos:this.#t}),await this.#e.ready}catch{t===this.#c&&(this.#e?.unload(),this.#e=null,this.#r=null)}finally{t===this.#c&&(this.#u=!1)}}sync(e,t,r){let i=this.#e;return!this.#o||!r?(i?.pause(),!0):(i?.sync(e),i?.follow(e),!this.isBuffering)}get clockRate(){return this.#o?this.#e?.clockRate??1:1}seek(e){this.#e?.seek(e)}volume(e){this.#n.volume=S.clamp01(e),this.#e?.volume(this.#n.volume)}rate(e){this.#n.rate=e,this.#e?.rate(e)}setSpatial(e,t,r){this.#t=[e,t,r];let i=this.#h("spatial");i>=0&&this.#e?.pos(e,t,r,i)}setSourceMatrix(e,t,r=1){let i=e.pointTo?.(this.#i,t,r)??Y.pointTo(this.#i,e,t,r);this.setSpatial(i.x,i.y,i.z)}setListenerMatrix(e){let t=this.#h("listener");if(t<0)return;let r=e.poseTo?.(this.#s)??Y.poseTo(this.#s,e);Le.listener(...r,t)}setPanner(e){Object.assign(this.#n.pannerAttr,e),this.#e?.pannerAttr(e)}stop(){this.#e?.pause()}get enabled(){return this.#o&&Le.ctx?.state==="running"&&!this.#e?.blocked}enable(){this.#o=!0,Le.resume(),this.#e?.allowPlayback()}disable(){this.#o=!1,this.#e?.pause()}unload(){this.#c++,this.#e?.unload(),this.#e=null,this.#r=null,this.#u=!1,Le.resetListener()}#h(e){let t=Bn(),r=e==="listener"?this.#a:this.#l;return r&&t-r<Ol?-1:(e==="listener"?this.#a=t:this.#l=t,S.deltaSeconds(t,r,0,Fl))}};var Ut=class{#e;#r=0;#t=!1;constructor(e){this.#e=e}get id(){return this.#r}get isStatic(){return this.#t}get isReady(){return this.#e.sceneReady(this.#r)}get progress(){return this.#e.sceneProgress(this.#r)}get duration(){return this.#t?0:this.#e.sceneDuration(this.#r)}get isBuffering(){return this.#t?!1:this.#e.sceneIsBuffering(this.#r)}get lastFetchStatus(){return this.#e.sceneLastFetchStatus(this.#r)}setTime(e){this.#r&&!this.#t&&this.#e.sceneSetTime(this.#r,e)}setPlaybackRange(e,t){this.#r&&!this.#t&&this.#e.sceneSetPlaybackRange(this.#r,e,t)}setVisible(e){this.#r&&this.#e.sceneSetVisible(this.#r,e)}getBBox(){return this.#e.sceneGetBBox(this.#r)}setEnvLighting(e,t){this.#r&&this.#e.sceneSetEnvLighting(this.#r,e,t)}clearEnvLighting(){this.#r&&this.#e.sceneClearEnvLighting(this.#r)}setModelMatrix(e){this.#r&&this.#e.sceneSetModelMatrix(this.#r,e)}openDynamic(e){if(this.remove(),this.#r=this.#e.addDynamicScene(),this.#t=!1,e.localFile||e.file){let r=e.localFile||e.file;this.#e.sceneOpenLocal(this.#r,this.#e.registerLocalFile(r));return}let t=e.url;if(e.token){this.#e.sceneOpenApi(this.#r,t,e.token);return}this.#e.sceneOpen(this.#r,t)}async openStatic(e){this.remove();let t=this.#e.addStaticScene();this.#r=t,this.#t=!0;let r=e.file?await e.file.arrayBuffer():await(await fetch(e.url)).arrayBuffer();this.#r===t&&this.#e.sceneOpenStatic(t,new Uint8Array(r))}remove(){this.#r&&(this.#e.removeScene(this.#r),this.#r=0)}};var Dn="gr-wt",Nn=()=>globalThis.crypto?.randomUUID?.();function zl(){try{let s=sessionStorage.getItem(Dn);return s||sessionStorage.setItem(Dn,s=crypto.randomUUID()),s}catch{return Nn()}}function Xl(s){let e=[];for(let t of[...s].sort((r,i)=>r-i)){let r=e.at(-1);r?.end===t?r.end=t+1:e.push({start:t,end:t+1})}return e}var Wi=class{#e=Nn();#r;#t=new Map;#i=0;constructor(){typeof document<"u"&&document.addEventListener("visibilitychange",()=>{document.hidden&&this.#s()})}track(e){if(!this.#e||!e.url||!e.token)return null;this.#r??=zl();let t=`${e.url}`.replace(/\/*$/,"/watch-time"),r=this.#t.get(t)??{token:"",seconds:0,watched:new Set,reported:0};return r.token=e.token,this.#t.set(t,r),(i,n)=>{r.seconds+=i,r.watched.add(Math.floor(n)),this.#i+=i,this.#i>=5&&this.#s()}}#s(){this.#i=0;for(let[e,t]of this.#t){let r=Math.round(t.seconds);r!==t.reported&&(t.reported=r,fetch(e,{method:"POST",headers:{"Content-Type":"application/json","X-VIEW-TOKEN":t.token},body:JSON.stringify({sessionId:this.#r,viewId:this.#e,seconds:r,ranges:Xl(t.watched)}),keepalive:!0,credentials:"omit",referrerPolicy:"no-referrer"}).catch(()=>{}))}}},zn=new Wi;var Xn={alpha:!0,premultipliedAlpha:!0,depth:!0,stencil:!1,antialias:!1,powerPreference:"high-performance",xrCompatible:!0},Lr=Object.freeze({start:0,end:1/0}),lt=class s{#e;#r;#t=new Er;#i=0;#s=null;#n=null;#o=null;#c=!1;#a=0;#l=0;#u=1;#h=Lr;#d=!1;#p=null;#f=null;#m=null;static GL_CANVAS_OPTS=Xn;static reportWatchTime=!0;constructor(e,t){this.#e=e,this.#r=t,typeof document<"u"&&document.addEventListener("visibilitychange",this.#g)}#g=()=>{document.hidden&&this.#t.stop()};static async create(e,{canvas:t,gl:r,backend:i,maxSplatsCount:n,xrCompatible:a}={}){if(!t&&!r)throw new Error("canvas or gl required");let o=i??(r?"hybrid":"pure"),{module:l,device:h}=await Rr.boot(e,t||r.canvas,{maxSplatsCount:n,xrCompatible:a}),c=new s(l,h);return o==="hybrid"?c.#w(r??s.#y(t)):c.#T(t),c}static preferredFormat(){return navigator.gpu.getPreferredCanvasFormat()}static#y(e){let t=e.getContext("webgl2",Xn);if(!t)throw new Error("WebGL2 not available");return t}get device(){return this.#r}get backend(){return this.#e.backend}get buildUnixTime(){return this.#e.buildUnixTime}get gl(){return this.#m}get isBGRA(){return s.preferredFormat()==="bgra8unorm"}assertDevice(e){if(e&&e!==this.#r)throw new Error("WebGPU device must match GraciaPlayer.device")}configureSurface(e,t={}){let{format:r,alphaMode:i="premultiplied",usage:n}=t;e.configure({device:this.#r,format:r??s.preferredFormat(),alphaMode:i,...n!=null?{usage:n}:{}})}bindCanvas(e,t={}){let r=e.getContext("webgpu");if(!r)throw new Error("WebGPU canvas context not available");return this.configureSurface(r,t),this.#f=r,r}setBackend(e,{canvas:t,gl:r}={}){if(this.shutdown(),e==="hybrid"){if(!r&&!t)throw new Error("canvas or gl required for hybrid backend");this.#w(r??s.#y(t))}else this.#T(t)}present(e,t){e===0||t===0||(this.#e.backend==="hybrid"?this.#P(e,t):this.#_())}renderTextures({color:e,depth:t,w:r,h:i}){return this.#S(),this.#e.backend!=="pure"?!1:this.#e.pureRenderTo(e,t,r,i)}renderDynamic(e){this.#n?.setVisible(!1);try{return this.renderTextures(e)}finally{this.#n?.setVisible(!0)}}get hasStatic(){return!!this.#n}renderXR(e,t=1,r=!1){let[i,n]=e;return this.setCamera(i.view.transform.matrix,i.projection,n?.view.transform.matrix,n?.projection),this.#S(),this.#e.pureRenderXR(e,t,r)}copyTexture(e,t,r=null){let i=r??[e.width,e.height,1],n=this.#r.createCommandEncoder();n.copyTextureToTexture({texture:e},{texture:t},i),this.#r.queue.submit([n.finish()])}renderHybridViewport(e,t,{gl:r,drawMode:i,enableMesh:n=!1,x:a=0,y:o=0,eye:l=0}={}){let h=r??this.#m;if(!h)throw new Error("No WebGL context");let c=i??this.#i;this.preprocess(e,t),h.enable(h.DEPTH_TEST),h.depthFunc(h.LEQUAL),h.depthMask(!1),this.render(c,a,o,e,t,l),n&&(h.colorMask(!1,!1,!1,!1),h.depthMask(!0),this.render(1,a,o,e,t,l),h.colorMask(!0,!0,!0,!0)),h.depthMask(!0)}shutdown(){this.#e.shutdownBackend(),this.#m=null,this.#f=null}#T(e){this.#m=null,this.#f=null,this.#r.pushErrorScope("validation"),this.#e.initPure(this.isBGRA),this.#r.popErrorScope().then(t=>{}),e&&this.bindCanvas(e)}#w(e){this.#f=null,this.#m=e,this.#e.initHybrid(e)}#_(){if(!this.#f)throw new Error("bindCanvas() required");let{width:e,height:t}=this.#f.canvas;e===0||t===0||this.renderTextures({color:this.#f.getCurrentTexture(),w:e,h:t})}#P(e,t){let r=this.#m;if(!r)throw new Error("hybrid backend required");r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clearDepth(1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.disable(r.DEPTH_TEST),this.frame(e,t,this.#i)}get drawMode(){return this.#i}set drawMode(e){this.#i=S.clampInt(e,0,3)}get#x(){return this.#s??this.#n}get isReady(){return(this.#x?.isReady??!1)&&this.#t.isLoaded}get progress(){return this.#x?.progress??0}get duration(){return this.#s?.duration??0}get playbackRange(){let{start:e,end:t}=this.#h;return{start:e,end:Math.min(t,this.duration||1/0)}}get ended(){return this.#d}get currentTime(){return this.#a}get isPlaying(){return this.#c}get isBuffering(){return(this.#s?.isBuffering??!1)||this.#c&&this.#t.isBuffering}get lastFetchStatus(){return this.#x?.lastFetchStatus??0}play(){this.#c=!0,this.#v()}pause(){this.#c=!1,this.#l=0,this.#t.stop()}seek(e){let{start:t,end:r}=this.playbackRange;this.#a=S.clamp(e,t,r),this.#l=0,this.#t.seek(this.#a)}setPlaybackRange(e,t){if(!(e>=0&&e<t&&t<=this.duration))throw new RangeError(`Invalid playback range [${e}, ${t}) for ${this.duration}s`);this.#b({start:e,end:t})}clearPlaybackRange(){this.#b(Lr)}#b(e){this.#h=e,this.#s?.setPlaybackRange(e.start,e.end);let{start:t,end:r}=this.playbackRange;(this.#a<t||this.#a>=r)&&this.seek(t)}get speed(){return this.#u}setSpeed(e){this.#u=S.clamp(S.finite(e,1),.1,4),this.#t.rate(this.#u)}close(){this.#s?.remove(),this.#s=null,this.#n?.remove(),this.#n=null,this.#M(),this.#t.unload()}clearVideo(){this.#s?.remove(),this.#s=null,this.#M(),this.#t.unload()}#M(){this.#h=Lr,this.#d=!1,this.#a=0,this.#l=0,this.#c=!1}clearEnvironment(){this.#n?.remove(),this.#n=null}#v(){let e=this.#c&&(this.#s?.isReady??!1)&&!this.#s?.isBuffering;return this.#t.sync(this.#a,this.duration,e)}#S(){if(!this.#s)return;let e=performance.now(),t=this.#v(),r=this.#c&&this.#s.isReady&&!this.#s.isBuffering&&t;if(r&&this.#l>0){let i=S.deltaSeconds(e,this.#l);this.#R(i*this.#u*this.#t.clockRate),this.#p?.(i,this.#a)}this.#l=r?e:0,this.#s.setTime(this.#a)}#R(e){let{start:t,end:r}=this.playbackRange,i=this.#a+e;if(i<r){this.#a=i;return}this.#a=t+S.wrap(i-t,r-t),this.#h===Lr?this.#d=!0:this.#t.seek(this.#a)}open(e){if(this.#t.unload(),e.audio&&this.#t.load(e.audio),e.type==="static")return this.#E(e);this.#s||(this.#s=new Ut(this.#e)),this.#s.openDynamic(e),this.#C(this.#s),this.#M(),this.#p=s.reportWatchTime?zn.track(e):null}async#E(e){this.#n||(this.#n=new Ut(this.#e)),await this.#n.openStatic(e),this.#C(this.#n)}get audioContext(){return this.#t.context}get audioEnabled(){return this.#t.enabled}enableAudio(){this.#t.enable(),this.#v()}disableAudio(){this.#t.disable()}setAudioOutput(e){this.#t.setOutput(e)}setVolume(e){this.#t.volume(e)}loadAudio(e){return this.#t.load(e)}setAudioSpatial(e,t,r){this.#t.setSpatial(e,t,r)}setAudioSourceMatrix(e,t,r){this.#t.setSourceMatrix(e,t,r)}setAudioListenerMatrix(e){this.#t.setListenerMatrix(e)}setAudioPanner(e){this.#t.setPanner(e)}setCamera(e,t,r,i){this.#e.setCamera(e,t,r,i)}getBBox(){return this.#x?.getBBox()??null}getModelMatrix(){return this.#e.getModelMatrix()}setModelMatrix(e){this.#e.setModelMatrix(e)}setStaticModelMatrix(e){this.#n?.setModelMatrix(e)}setEnvLighting(e,t=1){this.#o={coefs:Float32Array.from(e),scale:t},this.#s?.setEnvLighting(e,t),this.#n?.setEnvLighting(e,t)}clearEnvLighting(){this.#o=null,this.#s?.clearEnvLighting(),this.#n?.clearEnvLighting()}#C(e){this.#o&&e.setEnvLighting(this.#o.coefs,this.#o.scale)}frame(e,t,r){this.#S(),this.#e.hybridFrame(e,t,r)}preprocess(e,t){return this.#S(),this.#e.hybridPreprocess(e,t)}render(e,t,r,i,n,a){this.#e.hybridRender(e,t,r,i,n,a)}renderMesh(e,t,r,i,n){this.#e.hybridRenderMesh(e,t,r,i,n)}renderMotionMV(e,t,r,i){this.#e.hybridRenderMotionMV(e,t,r,i)}canMotion(){return this.#e.hybridCanMotion()}hasMultiview(){return this.#e.hybridHasMultiview()}resetXR(){this.#e.hybridReset()}dispose(){typeof document<"u"&&document.removeEventListener("visibilitychange",this.#g),this.close(),this.#t.unload(),this.shutdown(),this.#e.dispose()}};var Wn=.75,Hn=.35,Yn=.9,Ul=.1,Vl=.15,Un=3,Wl=.5,Hi=[1,.72,.05],Ar=Float32Array.of(1,.08,.04,.9),Hl=.001,Yi=new Float32Array(0),Yl=.25,ql=1e-5,ht={ramp:[[Wn,...Hi,.12],[0,...Ar]],reach:Number.POSITIVE_INFINITY,dark:{from:Hn,to:0,max:Yn}},$i={ramp:[[Wn,...Hi,.7],[.2,...Hi,.9],[-.3,...Ar]],reach:4.5,dark:{from:.3,to:-.5,max:Yn}},kr=s=>typeof s=="number"&&Number.isFinite(s),qi=s=>!!s&&kr(s.x)&&kr(s.y)&&kr(s.z),Zl=s=>qi(s)&&kr(s.w);function ji(s){return!s||typeof s!="object"||!Rn(s)||!qi(s.position)||!Zl(s.rotation)||!qi(s.scale)?!1:s.scale.x>0&&s.scale.y>0&&s.scale.z>0}var Qi=(s,e,t)=>{let r=S.unlerp01(t,s,e);return r*r*(3-2*r)};function $l(s,e=ht.ramp,t=new Float32Array(4)){if(s>=e[0][0])return t.fill(0);let r=1;for(;r<e.length-1&&s<e[r][0];)r++;let i=e[r-1],n=e[r],a=Qi(i[0],n[0],s);for(let o=0;o<4;o++)t[o]=i[o+1]+(n[o+1]-i[o+1])*a;return t}var jl=s=>Qi(Hn,0,s),Ql=(s,{dark:e}=ht)=>e.max*Qi(e.from,e.to,s),Kl=s=>1-S.unlerp01(s,Un,Un+Wl);function Jl(s,e,t){t.set(s);let r=Ar[3]*Kl(e);return r>s[3]&&(t.set(Ar),t[3]=r),t}function Vn(s,e,t){if(e[3]>0){s[3]===0&&(s.set(e),s[3]=0);for(let r=0;r<4;r++)s[r]+=(e[r]-s[r])*t}else s[3]-=s[3]*t;s[3]<Hl&&(s[3]=0)}var ct=(s,e,t,r)=>(s[e]=t[r],s[e+1]=t[r+1],s[e+2]=t[r+2],e+3),Zi=class{#e;#r=null;#t=new J;#i=new J;#s=new J;#n=new Ce;#o=Yi;#c=Yi;#a=new J;#l=new Ee;#u=new J;#h=new Ce;#d=new Ce;#p=new J;#f=1;#m=new J;#g=new Ee;constructor(e){this.#e=e,this.#i.fromXYZ(e.position),this.#s.fromXYZ(e.scale),this.#n.fromXYZW(e.rotation).normalize(),this.setRoomMatrix(null)}setRoomMatrix(e){return this.#l.fromRotationTranslationScale(this.#n,this.#i,this.#s),e&&this.#l.preMultiply(e),this.#l.decompose(this.#u,this.#h,this.#p),this.#d.copy(this.#h).invert(),this.#f=this.#p[0]<0?-1:1,this.#p.set(Math.abs(this.#p[0])*.5,Math.abs(this.#p[1])*.5,Math.abs(this.#p[2])*.5),this.#m.set(this.#f,1,1),this.#g.fromRotationTranslationScale(this.#h,this.#u,this.#m),(!this.#r||!this.#t.equals(this.#p,ql))&&this.#y(),this}signedDistance(e){return this.#r.signedDistance(this.#w(e))}get mesh(){return this.#r.mesh}get meshMatrix(){return this.#g}outlineRibbon(e,t=!1){let r=e*.5,i=this.#o,n=this.#c,a=0,o=0;for(let l of this.#r.outlines){let h=l.length/3;for(let c=0;c<h;c++)this.#T(l,c,h,r,(a+c)*6);for(let c=0;c<h;c++){let u=(a+c)*6,p=(a+(c+1)%h)*6;o=ct(n,o,i,u),o=ct(n,o,i,p),o=ct(n,o,i,p+3),o=ct(n,o,i,u),o=ct(n,o,i,p+3),o=ct(n,o,i,u+3)}if(a+=h,t)break}return n.subarray(0,o)}#y(){this.#t.copy(this.#p),this.#r=Tr(this.#e,this.#p);let e=this.#r.outlines.reduce((t,r)=>t+r.length/3,0);this.#o=new Float32Array(e*6),this.#c=new Float32Array(e*18)}#T(e,t,r,i,n){let a=(t+r-1)%r*3,o=(t+1)%r*3,l=e[t*3],h=e[t*3+1],c=e[t*3+2],u=l-e[a],p=c-e[a+2],f=e[o]-l,m=e[o+2]-c,d=Math.hypot(u,p),g=Math.hypot(f,m),y=p/d+m/g,_=-u/d-f/g,x=Math.hypot(y,_),v=i/(x*Math.max(x/2,Yl));this.#_(n,l+y*v,h,c+_*v),this.#_(n+3,l-y*v,h,c-_*v)}#w(e){let t=this.#a.sub(e,this.#u).transformQuat(this.#d);return t[0]*=this.#f,t}#_(e,t,r,i){let n=this.#a.set(t*this.#f,r,i).transformQuat(this.#h);this.#o.set(n.add(this.#u),e)}},Vt=class{#e=null;#r=ht;#t=0;#i=new Float32Array(4);#s=new Float32Array(4);#n=0;#o=0;#c=new Float32Array(4);#a=new Float32Array(4);#l=!1;#u=null;#h=!1;#d=new J;get active(){return!!this.#e}get darkness(){return this.#t}get outline(){return this.#i}get surface(){return this.#s}get aboveSplats(){return this.#n}get reach(){return this.#r.reach}get outside(){return this.#o}get mesh(){return this.#e?.mesh??null}get meshMatrix(){return this.#e?.meshMatrix??null}setBounds(e){return this.#e=ji(e)?new Zi(e):null,this.#p()}setRoomMatrix(e){return this.#e?.setRoomMatrix(e),this}setHidden(e){return this.#h=e,this.#p()}queueIntro(){return this.#l=!0,this}reset(e=this.#r){return this.#r=e,this.#l=!1,this.#p()}update(e,t){if(!this.#e||this.#h)return this.#p();this.#l?(this.#l=!1,this.#u=0):this.#u!==null&&(this.#u+=t),this.#d.from(e);let r=-this.#e.signedDistance(this.#d),i=$l(r,this.#r.ramp,this.#c),n=this.#u===null?i:Jl(i,this.#u,this.#a),a=1-Math.exp(-t/Vl);Vn(this.#i,n,a),Vn(this.#s,i,a),this.#n+=(jl(r)-this.#n)*a,this.#o+=((r<0?1:0)-this.#o)*a;let o=Ql(r,this.#r);return this.#t+=(o-this.#t)*(1-Math.exp(-t/Ul)),this}ribbon(e){let t=this.#s[3]===0;return this.#e?.outlineRibbon(e,t)??Yi}#p(){return this.#t=0,this.#i.fill(0),this.#s.fill(0),this.#n=0,this.#o=0,this.#u=null,this}};var ec=2.5,Zn=1.6,tc=.0015,rc=2,qn=.5,ic=.6,sc=.022,nc=1e-4,Ir=Math.PI/2-.01,Fr=.05,Or=200,oc=new Set(["w","a","s","d","r","f","q","e","shift"]),Wt=class{#e;#r=new Map;#t=null;#i=1;#s;#n;#o;#c=0;#a=0;#l=0;#u=0;#h=0;#d=e=>e.preventDefault();constructor(e,{pan:t=!0,rotate:r=ec,onDown:i}={}){this.#e=e,this.#s=t,this.#n=r,this.#o=i,this.#i=e.clientHeight||1,e.addEventListener("contextmenu",this.#d),e.addEventListener("pointerdown",this.#p),e.addEventListener("wheel",this.#g,{passive:!1})}get height(){return this.#i}consume(e){return e.rotX=this.#c,e.rotY=this.#a,e.panX=this.#l,e.panY=this.#u,e.zoom=this.#h,this.#c=this.#a=this.#l=this.#u=this.#h=0,e}dispose(){this.#e.removeEventListener("contextmenu",this.#d),this.#e.removeEventListener("pointerdown",this.#p),this.#e.removeEventListener("wheel",this.#g),window.removeEventListener("pointermove",this.#f),window.removeEventListener("pointerup",this.#m),window.removeEventListener("pointercancel",this.#m),this.#r.clear(),this.#t=null}#p=e=>{this.#e.setPointerCapture?.(e.pointerId),this.#r.size===0&&(window.addEventListener("pointermove",this.#f),window.addEventListener("pointerup",this.#m),window.addEventListener("pointercancel",this.#m)),this.#r.set(e.pointerId,{x:e.clientX,y:e.clientY,button:e.button,touch:e.pointerType==="touch"}),this.#i=this.#e.clientHeight||this.#i,this.#r.size===2&&this.#y(),this.#o?.()};#f=e=>{let t=this.#r.get(e.pointerId);if(!t)return;let r=e.clientX-t.x,i=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,this.#r.size>=2)return this.#T();!t.touch&&(t.button===2||e.buttons===2)?this.#s&&(this.#l+=r,this.#u+=i):(this.#c+=r/this.#i*this.#n,this.#a+=i/this.#i*this.#n)};#m=e=>{this.#e.releasePointerCapture?.(e.pointerId),this.#r.delete(e.pointerId),this.#t=null,this.#r.size===0&&(window.removeEventListener("pointermove",this.#f),window.removeEventListener("pointerup",this.#m),window.removeEventListener("pointercancel",this.#m))};#g=e=>{e.preventDefault(),this.#h+=-e.deltaY*tc};#y(){let[e,t]=this.#r.values();this.#t={dist:Math.hypot(e.x-t.x,e.y-t.y),cx:(e.x+t.x)/2,cy:(e.y+t.y)/2}}#T(){let[e,t]=this.#r.values(),r=Math.hypot(e.x-t.x,e.y-t.y),i=(e.x+t.x)/2,n=(e.y+t.y)/2,a=this.#t;a&&(a.dist>0&&r>0&&(this.#h+=Math.log(r/a.dist)),this.#s&&(this.#l+=i-a.cx,this.#u+=n-a.cy)),this.#t={dist:r,cx:i,cy:n}}},ac=s=>1-Math.exp(-s/sc),ye=()=>({rotX:0,rotY:0,panX:0,panY:0,zoom:0}),lc=s=>Math.abs(s.rotX)+Math.abs(s.rotY)+Math.abs(s.panX)+Math.abs(s.panY)+Math.abs(s.zoom)<nc;function ts(s,e,t,r,i){let n=s.consume(e);if(t.rotX+=n.rotX,t.rotY+=n.rotY,t.panX+=n.panX,t.panY+=n.panY,t.zoom+=n.zoom,lc(t))return!1;let a=ac(i);for(let o of["rotX","rotY","panX","panY","zoom"])r[o]=t[o]*a,t[o]-=r[o];return!0}var Ki=class{#e;#r;#t=E.create();#i=E.create();#s=E.create();#n=E.create();#o=E.create();#c=E.create();#a=1;#l=0;#u=0;#h=!1;#d=ye();#p=ye();#f=ye();constructor(e,t){this.#e=e,this.#r=new Wt(t),this.#w()}get type(){return"orbit"}update(e){this.#g(e)&&this.#w()}frame(e,t){this.#_(e,t)}reset(e,t){this.#_(e,t)}zoom(e){e>0&&(this.#p.zoom+=Math.log(e))}applyConstraints(e){this.#h=e,this.#u=S.clamp(this.#u,-Ir,this.#m),this.#w()}dispose(){this.#r.dispose()}get#m(){return this.#h?0:Ir}#g(e){if(!ts(this.#r,this.#d,this.#p,this.#f,e))return!1;let t=this.#f;return this.#l+=t.rotX,this.#u=S.clamp(this.#u-t.rotY,-Ir,this.#m),t.zoom&&(this.#a=S.clamp(this.#a*Math.exp(-t.zoom),Fr,Or)),(t.panX||t.panY)&&this.#T(t.panX,t.panY),!0}#y(){this.#n.yawPitchBasis(this.#l,this.#u,this.#i,this.#s,this.#o)}#T(e,t){this.#y();let r=S.perspectiveScale(this.#a,this.#e.fov,this.#r.height)*Zn;this.#t.addScaled(this.#n,-e*r).addScaled(this.#o,t*r)}#w(){this.#y(),this.#e.position.copy(this.#s).scale(this.#a).add(this.#t),this.#e.setAxes(this.#n,this.#o,this.#s)}#_(e,t){this.#t.from(e),this.#s.sub(this.#c.from(t),this.#t),this.#a=S.clamp(this.#s.len,Fr,Or),this.#i.copy(this.#s).scale(-1).normalize(D.FORWARD),this.#c.yawPitch(this.#i),this.#l=this.#c.x,this.#u=S.clamp(this.#c.y,-Ir,this.#m),this.#p=ye(),this.#w()}},Ji=class{#e;#r;#t=new Set;#i=ue.create();#s=E.create();#n=E.create();#o=E.create();#c=E.create();#a=E.create();#l=ye();#u=ye();#h=ye();constructor(e,t){this.#e=e,t.hasAttribute("tabindex")||(t.tabIndex=0),this.#r=new Wt(t,{pan:!1,onDown:()=>t.focus()}),window.addEventListener("keydown",this.#m),window.addEventListener("keyup",this.#g)}get type(){return"fly"}update(e){let t=this.#d(e);this.#p(e)&&(t=!0),t&&this.#f()}frame(e,t){this.reset(e,t)}reset(e,t){this.#e.position.from(t),this.#s.sub(this.#a.from(e),this.#e.position).normalize(D.FORWARD),this.#a.yawPitch(this.#s),this.#i.identity().rotate(D.Y,-this.#a.x).rotate(D.X,this.#a.y),this.#u=ye(),this.#f()}zoom(e){e>0&&(this.#u.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#r.dispose(),window.removeEventListener("keydown",this.#m),window.removeEventListener("keyup",this.#g),this.#t.clear()}#d(e){let t=rc*e*(this.#t.has("shift")?4:1),r=this.#e.position,i=!1,n=(o,l)=>{r.addScaled(o,l),i=!0},a=o=>{this.#i.rotate(D.Z,o),i=!0};return this.#t.has("w")&&n(this.#s,t),this.#t.has("s")&&n(this.#s,-t),this.#t.has("d")&&n(this.#o,t),this.#t.has("a")&&n(this.#o,-t),this.#t.has("r")&&n(this.#c,t),this.#t.has("f")&&n(this.#c,-t),this.#t.has("q")&&a(qn*e),this.#t.has("e")&&a(-qn*e),i}#p(e){if(!ts(this.#r,this.#l,this.#u,this.#h,e))return!1;let t=this.#h;return t.rotX&&this.#i.rotate(D.Y,-t.rotX),t.rotY&&this.#i.rotate(D.X,-t.rotY),t.zoom&&this.#e.position.addScaled(this.#s,t.zoom*ic),!0}#f(){this.#i.normalize(),this.#o.copy(D.X).transformQuat(this.#i),this.#c.copy(D.Y).transformQuat(this.#i),this.#n.copy(D.Z).transformQuat(this.#i),this.#s.copy(this.#n).scale(-1),this.#e.setAxes(this.#o,this.#c,this.#n)}#m=e=>{let t=e.key.toLowerCase();!oc.has(t)||this.#y()||(this.#t.add(t),e.preventDefault())};#g=e=>{this.#t.delete(e.key.toLowerCase())};#y(){let e=document.activeElement;return e?.tagName==="INPUT"||e?.tagName==="TEXTAREA"||e?.isContentEditable}},es=class{#e;#r;#t=E.create();#i=E.create();#s=E.create().copy(D.Y);#n=E.create();#o=E.create();#c=E.create();#a=E.create();#l=E.create();#u=E.create();#h=ue.create();#d=ye();#p=ye();#f=ye();constructor(e,t){this.#e=e,this.#r=new Wt(t)}get type(){return"trackball"}update(e){if(!ts(this.#r,this.#d,this.#p,this.#f,e))return;let t=this.#f;(t.rotX||t.rotY)&&this.#g(t.rotX,t.rotY),t.zoom&&this.#y(t.zoom),(t.panX||t.panY)&&this.#T(t.panX,t.panY),this.#w()}frame(e,t){this.#_(e,t)}reset(e,t){this.#_(e,t)}zoom(e){e>0&&(this.#p.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#r.dispose()}#m(){this.#n.copy(this.#i).normalize(D.Z),this.#o.cross(this.#s,this.#n).normalize(D.X),this.#c.cross(this.#n,this.#o)}#g(e,t){this.#m(),this.#a.copy(this.#o).scale(e).addScaled(this.#c,-t);let r=this.#a.len;r<1e-6||(this.#l.cross(this.#a,this.#i).normalize(D.Y),this.#h.setAxisAngle(this.#l,r),this.#i.transformQuat(this.#h),this.#s.transformQuat(this.#h).normalize())}#y(e){this.#i.setLength(S.clamp(this.#i.len*Math.exp(-e),Fr,Or))}#T(e,t){this.#m();let r=S.perspectiveScale(this.#i.len,this.#e.fov,this.#r.height)*Zn;this.#t.addScaled(this.#o,-e*r).addScaled(this.#c,t*r)}#w(){this.#e.up.copy(this.#s),this.#e.position.copy(this.#t).add(this.#i),this.#e.lookAt(this.#t)}#_(e,t){this.#t.from(e),this.#i.sub(this.#u.from(t),this.#t),this.#i.setLength(S.clamp(this.#i.len,Fr,Or)),this.#s.copy(D.Y),this.#m(),this.#s.copy(this.#c),this.#p=ye(),this.#w()}};function rs(s,e,t){switch(s){case"fly":return new Ji(e,t);case"trackball":return new es(e,t);default:return new Ki(e,t)}}var is=class{position=E.create();target=E.create();up=E.create().copy(D.Y);matrixWorld=Y.create();projectionMatrix=Y.create();fov;aspect;near;far;constructor(e=60,t=1,r=.05,i=1e4){this.fov=e,this.aspect=t,this.near=r,this.far=i,this.updateProjectionMatrix(),this.updateMatrixWorld()}lookAt(e){return this.target.from(e),this.updateMatrixWorld()}updateProjectionMatrix(){this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far)}updateMatrixWorld(){return this.matrixWorld.cameraWorld(this.position,this.target,this.up),this.matrixWorld}setAxes(e,t,r){return this.up.copy(t),this.target.copy(this.position).addScaled(r,-1),this.matrixWorld.cameraWorldAxes(this.position,e,t,r)}},cc=1.5,jn=1,$n=.5,hc=[0,.4,0];function ss(s,e="floor"){if(e==="eyes")return{eye:[0,0,0],target:[s[0],0,Math.min(s[2],-$n)]};let t=E.create().set(s[0],0,s[2]);t.len>$n?t.normalize():t.copy(D.FORWARD);let r=t.dot(s)+jn;return{eye:[s[0]-t[0]*r,s[1],s[2]-t[2]*r],target:[s[0],s[1],s[2]]}}var Br=class{#e=Y.create();#r=E.create();#t=E.create();#i;#s;#n;#o=!1;#c=!1;#a=!1;#l=null;#u=null;constructor(e,t="orbit"){this.#n=e,this.#i=new is,this.#s=rs(t,this.#i,e),this.#h()}get canPresent(){return this.#o}get view(){return this.#i}get controls(){return this.#s}get controlsType(){return this.#s.type}setControls(e){e!==this.#s.type&&(this.#s.dispose(),this.#s=rs(e,this.#i,this.#n),this.reset(),this.#s.applyConstraints(this.#c))}setSceneTransform(e,t="floor"){e?this.#e.fromTransform(e):this.#e.identity(),this.#c=!!e,this.#a=!!e&&t==="eyes",this.#s.applyConstraints(this.#c),this.#o=!1}setAudioPosition(e){e?this.#r.fromXYZ(e):this.#r.set(0,0,0)}setBBox(e){if(!e)return;let t=this.#e.pointTo(this.#t,br.center(this.#t,e)),{eye:r,target:i}=ss(t,this.#a?"eyes":"floor");this.#l=i,this.#u=r,this.#s.frame(i,r),this.#o=!0}update(e){this.#s.update(e)}apply(e,t,r){e.setModelMatrix(this.#e),t>0&&r>0&&(this.#i.aspect=t/r,this.#i.updateProjectionMatrix()),e.setCamera(this.#i.matrixWorld,this.#i.projectionMatrix),this.#o&&(e.setAudioSourceMatrix(this.#e,this.#r),e.setAudioListenerMatrix(this.#i.matrixWorld))}zoom(e){this.#s.zoom(e)}reset(){this.#l&&this.#u?(this.#s.frame(this.#l,this.#u),this.#o=!0):this.#h()}dispose(){this.#s.dispose()}#h(){this.#s.reset(hc,{x:0,y:cc,z:jn}),this.#o=!1}};var Ht={daylight:{ambient:[3.62,3.54,3.37],topDown:[.5,.45,.4]},cloudy:{ambient:[3.19,3.26,3.44],topDown:[.05,.05,.07]},sunset:{ambient:[4.08,3.01,1.95],topDown:[.25,.12,.02],frontBack:[.15,.06,0],leftRight:[-.3,-.12,0]},indoor:{ambient:[3.72,3.37,2.84],topDown:[.3,.25,.15]},shade:{ambient:[3.12,3.3,3.72],topDown:[.1,.15,.3]},night:{ambient:[2.48,2.66,3.01],topDown:[.08,.1,.15]},off:null};function uc(s,e){if(s[14]/e-s[10]>-.5)return s;let t=Float32Array.from(s);for(let r of[2,6,10,14])t[r]=(s[r]+s[r+1])/2;return t}var Gr=class{#e;#r;#t;#i;#s;#n=null;#o;#c;#a;#l;#u;#h=null;#d=!1;#p=!1;#f=!1;#m=null;#g=0;onFrame=null;onBeforeRender=null;onBeforeEyeRender=null;onEyeRender=null;onASWRender=null;onViewsRender=null;onRefReset=null;onSessionEnd=null;externalLayers=[];constructor(e,t,{backend:r="webgl",ensureGL:i=null}={}){this.#e=e,this.#r=t,this.#o=r,this.#c=i}get session(){return this.#t}get active(){return!!this.#t}get aswAvailable(){return!!this.onASWRender}get aswActive(){return this.#d&&!!this.#t}get layeredActive(){return this.#p&&!!this.#t}get isAR(){return this.#f&&!!this.#t}get defaultDt(){return 1/(this.#d?36:72)}get binding(){return this.#s??this.#n}get api(){return this.#t?this.#n?"webgpu":"webgl":null}get gpu(){let e=this.#n;return e?{device:this.#e.device,format:e.getPreferredColorFormat()}:null}get refSpace(){return this.#i}set soundPosition(e){this.#m=e?[e.x,e.y,e.z]:null}async enter(e=!1){if(!navigator.xr||this.#t)return{isQuest:!1,isPico:!1,isAVP:!1};this.#f=e;let t=navigator.userAgent,r=/PicoBrowser/i.test(t),i=/OculusBrowser/i.test(t)&&!r,n=/Version\//.test(t)&&/Safari\//.test(t)&&!i&&!r;if(this.#t=await navigator.xr.requestSession(e?"immersive-ar":"immersive-vr",{...this.#o==="webgpu"&&{requiredFeatures:["webgpu"]},optionalFeatures:[this.#o==="auto"&&"webgpu","local-floor",e&&"local",i&&"layers",i&&"space-warp",(i||r)&&"hand-tracking"].filter(Boolean)}),!this.#t)throw new Error(`Failed to start ${e?"AR":"VR"} session`);let a=new Set(this.#t.enabledFeatures??[]);for(let c of["local-floor","local","viewer"])try{this.#i=await this.#t.requestReferenceSpace(c);break}catch{}this.#i?.addEventListener("reset",()=>this.onRefReset?.()),this.#p=this.#d=!1;let o=r?.75:1,l={isQuest:i,isPico:r,isAVP:n};if(a.has("webgpu"))return this.#y(a,o,l);let h=this.#r??=this.#c?.()??null;if(!h)throw new Error("WebGL context required for this XR session");if(this.#h=h.getExtension("OCULUS_multiview")||h.getExtension("OVR_multiview2")||null,a.has("layers"))try{h.getExtension("EXT_color_buffer_half_float"),this.#s=new XRWebGLBinding(this.#t,h),this.#a=this.#s.createProjectionLayer({textureType:"texture-array",depthFormat:h.DEPTH_COMPONENT24,scaleFactor:o,clearOnAccess:!1}),this.#p=!0,this.#d=a.has("space-warp"),!this.#d&&this.#a.fixedFoveation!==void 0&&(this.#a.fixedFoveation=1),await this.#t.updateRenderState({layers:[this.#a]}),this.#l=h.createFramebuffer(),this.#d&&(this.#u=h.createFramebuffer())}catch{this.#p=this.#d=!1,this.#s=this.#a=null}if(!this.#p){let c=new XRWebGLLayer(this.#t,h,{framebufferScaleFactor:o,...e&&{alpha:!0}});c.fixedFoveation!==void 0&&(c.fixedFoveation=1),await this.#t.updateRenderState({baseLayer:c})}return this.#T(),l}async#y(e,t,r){return this.#n=new XRGPUBinding(this.#t,this.#e.device),this.#d=e.has("space-warp"),this.#a=this.#n.createProjectionLayer({colorFormat:this.#n.getPreferredColorFormat(),...this.#d&&{depthStencilFormat:"depth24plus"},scaleFactor:t}),!this.#d&&this.#a.fixedFoveation!==void 0&&(this.#a.fixedFoveation=1),this.#p=!0,await this.#t.updateRenderState({layers:[this.#a]}),this.#T(),r}#T(){this.#e.resetXR(),this.#t.addEventListener("end",()=>this.#x()),this.#g=0,this.#t.requestAnimationFrame(this.#w)}#w=(e,t)=>{let r=this.#t;if(!r)return;r.requestAnimationFrame(this.#w);let i=S.deltaSeconds(e,this.#g,this.defaultDt,4*this.defaultDt);this.#g=e,this.onFrame?.(i,t)};exit(){this.#t?.end()}renderFrame(e,t,r=1){let i=this.#e,n=this.#r,a=t.getViewerPose(this.#i);if(!a||a.views.length<1)return;let o=this.#b(a);if(!this.#f&&o.length<2){this.#_(i,a,r);return}if((o.length>=2||this.#f)&&(this.onBeforeRender?.(e,t,this.#i,a,t.session.inputSources,i),this.#P()),this.#n){this.#M(i,o,t),this.#_(i,a,r);return}let l=o[1]??null;i.setCamera(o[0].transform.matrix,o[0].projectionMatrix,l?.transform.matrix,l?.projectionMatrix),this.#d?this.#C(n,i,o):this.#p?this.#E(n,i,o):this.#R(n,i,o,t),this.#_(i,a,r)}#_(e,t,r){let i=this.#m;if(!i){let a=e.getBBox();a&&(i=[(a.minX+a.maxX)*.5,(a.minY+a.maxY)*.5,(a.minZ+a.maxZ)*.5])}let n=e.getModelMatrix();i&&n&&e.setAudioSourceMatrix(n,i,r),e.setAudioListenerMatrix(t.transform.matrix)}#P(){!this.#t||!this.#p||this.#t.updateRenderState({layers:[this.#a,...this.externalLayers]})}#x=()=>{if(!this.#t)return;let e=this.#r;this.#n=null,this.#l&&(e.deleteFramebuffer(this.#l),this.#l=null),this.#u&&(e.deleteFramebuffer(this.#u),this.#u=null),this.#t=this.#i=this.#a=this.#s=null,this.#d=this.#p=this.#f=!1,this.#g=0,this.externalLayers=[],this.onSessionEnd?.()};#b(e){if(e.views.length<2)return[e.views[0]];let t=e.views.find(i=>i.eye==="left")||e.views[0],r=e.views.find(i=>i.eye==="right")||e.views[1];return[t,r]}#M(e,t,r){this.#d&&(this.#a.deltaPose=null);let i=this.#t.renderState.depthNear,n=t.map(a=>({view:a,projection:uc(a.projectionMatrix,i),sub:this.#n.getViewSubImage(this.#a,a)}));e.renderXR(n,this.#f?0:1,this.#d),this.onViewsRender?.(n,r)}#v(e,t){e.bindFramebuffer(e.FRAMEBUFFER,t),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.clearColor(0,0,0,this.#f?0:1)}#S(e,t,r,i,n,a,o,l,h,c=e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT){e.viewport(n,a,o,l),e.clear(c),this.onBeforeEyeRender?.(e,r,i,n,a,o,l),t.render(t.drawMode,n,a,o,l,h),this.onEyeRender?.(e,r,i,n,a,o,l)}#R(e,t,r,i){let n=i.session.renderState.baseLayer,a=r.map(o=>n.getViewport(o));t.preprocess(a[0].width,a[0].height),e.bindFramebuffer(e.FRAMEBUFFER,n.framebuffer),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.clearColor(0,0,0,this.#f?0:1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.disable(e.DEPTH_TEST),e.depthMask(!1);for(let o=0;o<r.length;o++){let l=a[o];this.onBeforeEyeRender?.(e,n.framebuffer,r[o],l.x,l.y,l.width,l.height),t.render(t.drawMode,l.x,l.y,l.width,l.height,o),this.onEyeRender?.(e,n.framebuffer,r[o],l.x,l.y,l.width,l.height)}}#E(e,t,r){let i=r.map(o=>this.#s.getViewSubImage(this.#a,o)),n=i[0].colorTextureWidth,a=i[0].colorTextureHeight;t.preprocess(n,a),this.#v(e,this.#l);for(let o=0;o<r.length;o++){let l=i[o],h=l.imageIndex??o;e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.colorTexture,0,h),l.depthStencilTexture&&e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,h),this.#S(e,t,this.#l,r[o],0,0,n,a,o)}e.bindFramebuffer(e.FRAMEBUFFER,null)}#C(e,t,r){let i=r.map(c=>this.#s.getViewSubImage(this.#a,c)),n=i[0].colorTextureWidth,a=i[0].colorTextureHeight,o=i.map((c,u)=>c.imageIndex??u);this.#a&&(this.#a.deltaPose=null),t.preprocess(n,a),this.#v(e,this.#l);for(let c=0;c<r.length;c++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[c].colorTexture,0,o[c]),this.#S(e,t,this.#l,r[c],0,0,n,a,c,e.COLOR_BUFFER_BIT);let l=i[0];if(l.motionVectorTexture&&l.depthStencilTexture){let c=l.motionVectorTextureWidth,u=l.motionVectorTextureHeight,p=t.canMotion();if(e.bindFramebuffer(e.FRAMEBUFFER,this.#u),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),e.clearColor(0,0,0,0),e.clearDepth(1),this.#h&&o.length>=2&&o[1]===o[0]+1&&t.hasMultiview())this.#h.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.motionVectorTexture,0,o[0],2),this.#h.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,o[0],2),e.viewport(0,0,c,u),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),p&&t.renderMotionMV(0,0,c,u);else for(let m=0;m<r.length;m++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[m].motionVectorTexture,0,o[m]),e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,i[m].depthStencilTexture,0,o[m]),e.viewport(0,0,c,u),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),p&&t.render(3,0,0,c,u,m);let f=(m,d,g)=>({view:m,colorTex:d.colorTexture,colorIdx:g,mvTex:d.motionVectorTexture,mvIdx:g,depthTex:l.depthStencilTexture,w:n,h:a,mvW:c,mvH:u});this.onASWRender?.(e,r.map((m,d)=>f(m,i[d],o[d])))}else this.onASWRender?.(e,r.map((c,u)=>({view:c,colorTex:i[u].colorTexture,colorIdx:o[u],w:n,h:a})));e.bindFramebuffer(e.FRAMEBUFFER,null)}};var os=Y.create().fromScaling(D.FLIP_Z),ns=Y.create().copy(os).multiply(Y.create().fromTranslation([0,1,-1])),pc=.04,dc=.5,fc=1,mc=Math.PI/6,re=E.create(),Yt=E.create(),Qn=E.create(),Dr=ue.create(),Kn=Y.create(),Nr=class{#e=E.create();#r=ue.create();#t=1;#i=E.create();#s=Y.clone(ns);#n=Y.clone(ns);#o=null;#c=!1;#a=!1;#l=Y.create();#u=Y.create();#h="none";#d=E.create();#p={mid:E.create(),dist:0,axX:0,axZ:0};#f="undecided";#m=0;#g=0;#y=!1;#T=!1;#w=!1;get position(){return this.#e}get scale(){return this.#t}get sceneTransform(){return this.#s}get scaleLocked(){return this.#y}set scaleLocked(e){this.#y=!!e}setCenter(e,t,r){this.#i.set(e,t,r)}setSceneTransform(e,t="floor"){this.#o=e,this.#c=!!e&&t==="eyes",this.#a=this.#c,this.#_(e?os:ns)}resetToInitial(){this.#e.set(0,0,0),this.#t=1,this.#r.identity(),this.reanchor()}reanchor(){this.#a=this.#c}anchor(e){return!this.#a||!e?!1:(this.#a=!1,re.copy(D.FORWARD).transformQuat(Dr.fromXYZW(e.orientation)),Dr.setAxisAngle(D.Y,Math.atan2(-re[0],-re[2])),Kn.fromQuat(Dr).setPosition(re.fromXYZ(e.position)).preMultiply(os),this.#_(Kn),!0)}#_(e){this.#n.copy(e),this.#o?this.#s.fromTransform(this.#o).preMultiply(e):this.#s.copy(e)}reset(){this.#h="none"}isHeld(e){return this.#h==="dual"||this.#h===e}update(e,t,r,i,n=!0,a=null){for(let p of r)this.#M(p,i,a);let o=e.gripTransform?.position,l=t.gripTransform?.position,h=n&&e.active&&e.gripping&&!!o,c=n&&t.active&&t.gripping&&!!l,u=h&&e.grabRestart||c&&t.grabRestart;h&&c?this.#b(o,l,u):h?this.#x("left",o,u):c?this.#x("right",l,u):this.reset()}buildModelMatrix(){return this.#P(this.#l,this.#s)}buildRoomMatrix(){return this.#P(this.#u,this.#n)}#P(e,t){return re.copy(this.#i).transformMat4(this.#s),Yt.set(this.#t,this.#t,-this.#t),e.fromPivot(this.#e,this.#r,Yt,re,t)}#x(e,t,r){if(r||this.#h!==e){this.#h=e,this.#d.fromXYZ(t);return}if(re.fromXYZ(t).sub(this.#d),re.sqrLen>.01){this.#d.fromXYZ(t);return}this.#e.add(re),this.#d.fromXYZ(t)}#b(e,t,r){re.midXYZ(e,t);let i=Yt.fromXYZ(e).distanceXYZ(t),n=i||1,a=(t.x-e.x)/n,o=(t.z-e.z)/n,l=this.#p;if(r||this.#h!=="dual"){this.#h="dual",l.mid.copy(re),l.dist=i,l.axX=a,l.axZ=o,this.#f="undecided",this.#m=0,this.#g=0;return}let h=0;l.dist>.03&&i>.03&&(h=S.absLogRatio(i,l.dist));let c=l.axX,u=l.axZ;l.axX=a,l.axZ=o;let p=S.unlerp01(Math.min(Math.hypot(c,u),Math.hypot(a,o)),.08,.33),f=0;if(p>0&&(f=S.wrapPi(Math.atan2(o,a)-Math.atan2(u,c))*p),this.#f==="undecided"){this.#y||(this.#m+=h),this.#g+=Math.abs(f);let m=pc;(this.#m>=m||this.#g>=m)&&(this.#f=this.#m>=this.#g?"scale":"rotate")}if(this.#f==="scale"&&!this.#y&&l.dist>.03&&i>.03){let m=this.#t;this.#t=S.clamp(m*(i/l.dist),.01,100);let d=this.#t-m;Yt.copy(this.#i).transformMat4(this.#s),this.#e.add(Qn.copy(Yt).multiplyXYZ(-d,-d,d))}this.#f==="rotate"&&S.outside(f,5e-4)&&this.#r.rotatePre(D.Y,f),this.#e.add(Qn.sub(re,l.mid)),l.mid.copy(re),l.dist=i}#M(e,t,r){let i=e.gamepad;if(!i?.axes||i.axes.length<2)return;let n=i.axes.length>=4?2:0;this.#v(i.axes[n],-i.axes[n+1],t,r);let a=i.buttons?.[3]?.pressed??!1;e.handedness==="left"?(a&&!this.#T&&this.resetToInitial(),this.#T=a):(a&&!this.#w&&this.resetToInitial(),this.#w=a)}#v(e,t,r,i){if(!(Math.hypot(e,t)<=dc)){if(Math.abs(t)<=Math.abs(e)){this.#r.rotatePre(D.Y,-Math.sign(e)*mc*r);return}i&&(re.copy(D.FORWARD).transformQuat(Dr.fromXYZW(i.orientation)).multiplyXYZ(1,0,1).normalize(D.FORWARD),this.#e.addScaled(re,-t*fc*r))}}};var zr=class{on=!1;#e=-1;update(e){this.#e<0?this.#e=e:this.#e=e>this.#e?e:(this.#e+e)*.5,this.on=this.#e<(this.on?.018:.015)}reset(){this.on=!1,this.#e=-1}},Xr=class s{static#e=30;static#r=300;static#t=.02;#i=E.create();#s=!1;#n=0;#o=null;tapped=!1;update(e,t){if(this.tapped=!1,e&&!this.#s)this.#n=performance.now(),this.#o=t?{x:t.x,y:t.y,z:t.z}:null;else if(!e&&this.#s){let r=performance.now()-this.#n,i=this.#o,n=i&&t?this.#i.fromXYZ(t).distanceXYZ(i):0;r>=s.#e&&r<=s.#r&&n<s.#t&&(this.tapped=!0)}this.#s=e}reset(){this.#s=!1,this.tapped=!1,this.#o=null}},Ur=class s{static#e=30;static#r=300;#t=!1;#i=0;tapped=!1;update(e){if(this.tapped=!1,e&&!this.#t)this.#i=performance.now(),this.#t=!0;else if(!e&&this.#t){let t=performance.now()-this.#i;t>=s.#e&&t<=s.#r&&(this.tapped=!0),this.#t=!1}}reset(){this.#t=!1,this.tapped=!1}},Vr=class{#e=[!1,!1];update(e){if(!e||e.length<=6)return 0;let t=e[5]?.pressed??!1,r=e[6]?.pressed??!1,i=t&&!this.#e[0]?-1:r&&!this.#e[1]?1:0;return this.#e[0]=t,this.#e[1]=r,i}reset(){this.#e[0]=this.#e[1]=!1}},Wr=class{#e;left={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};right={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};stickSrcs=[];#r=null;#t=null;#i;#s;#n;#o;#c=new Ur;#a=new Ur;constructor({directGrab:e=!1}={}){this.#o=e,this.#e=ue.create().setAxisAngle(D.X,-.8),this.#s=E.create(),this.#n=ue.create(),this.#i=new Map([[this.left,{side:"left",pinch:new zr,tap:new Xr,swipe:new Vr,smooth:E.create(),smoothActive:!1,rayPos:E.create(),rayOri:ue.create(),rayActive:!1}],[this.right,{side:"right",pinch:new zr,tap:new Xr,swipe:new Vr,smooth:E.create(),smoothActive:!1,rayPos:E.create(),rayOri:ue.create(),rayActive:!1}]])}#l(e){e.active=e.gripping=e.isHandProfile=e.grabRestart=e.triggerPressed=e.menuPressed=e.isTransientPointer=!1,e.microSwipe=0,e.rayTransform=e.gripTransform=e.indexTip=e.thumbTip=null}read(e,t,r,i){this.#l(this.left),this.#l(this.right),this.stickSrcs.length=0;let n=null,a=null;for(let o of r||[]){if(o.targetRayMode==="transient-pointer"){let h=e.getPose(o.targetRaySpace,t);if(!h)continue;let u=((o.gripSpace?e.getPose(o.gripSpace,t):null)??h).transform,p=this.#u(o,u.position,n,a);this.#h(p,h.transform,u,o,i),p===this.left?n=o:a=o;continue}o.gripSpace&&!o.hand&&o.gamepad?.axes?.length>=2&&!o.profiles?.some(h=>h.includes("hand"))&&this.stickSrcs.push(o);let l=o.handedness==="left"?this.left:o.handedness==="right"?this.right:null;!l||l.active||(o.hand?this.#d(l,o,e,t,i):o.gripSpace&&this.#p(l,o,e,t,i))}this.#r=n,this.#t=a,(n||a)&&(this.stickSrcs.length=0,n||(this.left.gripping=!1),a||(this.right.gripping=!1)),i.uiActive?(this.#c.reset(),this.#a.reset()):(this.#c.update(!!n),this.#a.update(!!a)),this.#c.tapped&&(this.left.menuPressed=!0),this.#a.tapped&&(this.right.menuPressed=!0);for(let[o,l]of this.#i)o.indexTip||(l.pinch.reset(),l.tap.reset(),l.swipe.reset(),l.smoothActive=!1,l.rayActive=!1)}#u(e,t,r,i){if(e.handedness==="left")return this.left;if(e.handedness==="right")return this.right;if(r&&!i)return this.right;if(i&&!r)return this.left;let n=this.left.gripTransform?.position,a=this.right.gripTransform?.position,o=n?this.#s.fromXYZ(t).distanceXYZ(n):1/0,l=a?this.#s.fromXYZ(t).distanceXYZ(a):1/0;return o<=l?this.left:this.right}#h(e,t,r,i,{isHeld:n,hitTest:a,uiActive:o}){e.rayTransform=t,e.gripTransform=r,e.active=e.triggerPressed=e.isTransientPointer=!0;let{side:l}=this.#i.get(e),h=l==="left"?this.#r:this.#t,c=h!=null&&h!==i,u=h===i;!c&&n(l)?e.gripping=!0:o||(this.#o&&u||!this.#o&&a&&a(t)||n(l==="left"?"right":"left"))&&(e.gripping=!0,c&&(e.grabRestart=!0))}#d(e,t,r,i,{isHeld:n,uiActive:a,viewerPose:o}){let l=t.hand.get("wrist");if(!l)return;let h=r.getJointPose?.(l,i);if(!h)return;e.gripTransform=h.transform;let c=this.#f(t.hand,"index-finger-tip",r,i),u=this.#f(t.hand,"thumb-tip",r,i),p=this.#f(t.hand,"index-finger-phalanx-proximal",r,i);c&&(e.indexTip=c.transform.position),u&&(e.thumbTip=u.transform.position);let f=this.#i.get(e);if(p){this.#n.fromXYZW(h.transform.orientation).mul(this.#e);let d=f.rayPos,g=f.rayOri;f.rayActive?(d.lerp(this.#s.fromXYZ(p.transform.position),.5),g.slerp(this.#n,.5)):(d.fromXYZ(p.transform.position),g.copy(this.#n),f.rayActive=!0),e.rayTransform={position:d.toXYZ(),orientation:g.toXYZW()}}else e.rayTransform=c?.transform??null,f.rayActive=!1;if(c&&u){let d=c.transform.position,g=u.transform.position;f.pinch.update(this.#s.fromXYZ(d).distanceXYZ(g)),e.gripping=e.triggerPressed=f.pinch.on}else{f.pinch.reset();let d=t.gamepad?.buttons?.[0];e.gripping=d?d.pressed||d.value>.5:!1,e.triggerPressed=e.gripping}a?(f.tap.reset(),n(f.side)||(e.gripping=!1)):(f.tap.update(f.pinch.on,h.transform.position),f.tap.tapped&&(e.menuPressed=!0)),e.gripping&&!n(f.side)&&!this.#g(h.transform.position,o)&&(e.gripping=!1),e.active=!0,e.microSwipe=f.swipe.update(t.gamepad?.buttons);let m=f.smooth;f.smoothActive||(m.fromXYZ(h.transform.position),f.smoothActive=!0),m.lerp(this.#s.fromXYZ(h.transform.position),.4),e.gripTransform={position:m.toXYZ(),orientation:h.transform.orientation}}#p(e,t,r,i,{isHeld:n,uiActive:a,viewerPose:o}){let l=r.getPose(t.gripSpace,i);l&&(e.gripTransform=l.transform);let h=r.getPose(t.targetRaySpace,i);if(h&&(e.rayTransform=h.transform),!e.gripTransform&&!e.rayTransform)return;if(e.isHandProfile=t.profiles?.some(p=>p.includes("hand"))??!1,t.targetRayMode==="tracked-pointer"&&t.gamepad?.buttons?.[0]){let p=t.gamepad.buttons[0],f=p.pressed||p.value>.5;e.gripping=e.isHandProfile?f:t.gamepad?.buttons?.[1]?.pressed??!1}else e.gripping=t.gamepad?.buttons?.[1]?.pressed??!1;e.triggerPressed=t.gamepad?.buttons?.[0]?.pressed??!1;let c=t.gamepad?.buttons;e.menuPressed=!!(c?.[4]?.pressed||c?.[5]?.pressed||c?.[12]?.pressed);let{side:u}=this.#i.get(e);e.isHandProfile&&e.gripping&&!n(u)&&(a||!this.#g(e.gripTransform?.position,o))&&(e.gripping=!1),e.gripping&&!e.gripTransform&&(e.gripping=!1),e.active=!0,e.isHandProfile&&e.rayTransform&&(e.rayTransform=this.#m(e.rayTransform.orientation,e.rayTransform.position))}#f(e,t,r,i){let n=e.get(t);return n?r.getJointPose?.(n,i)??null:null}#m(e,t){return this.#n.fromXYZW(e).mul(this.#e),{position:t,orientation:this.#n.toXYZW()}}#g(e,t){if(!t||!e)return!0;let r=t.position;this.#s.subXYZ(e,r).transformQuat(this.#n.fromXYZW(t.orientation).invert());let i=this.#s.xzLen;return i<.05||this.#s.y>-1.19*i}};var ut=class{#e;#r;#t;#i;#s=!0;#n=!1;#o=!1;#c=!1;#a=!1;constructor(e,t=null,{directGrab:r=!1}={}){this.#e=e,this.#r=t,this.#t=new Wr({directGrab:r}),this.#i=new Nr}setOverlay(e){this.#r=e,this.#s=!0}get#l(){return this.#r?this.#r.hasBBox:this.#n}reset(){this.#i.reset(),this.#c=this.#a=!1}invalidateBBox(){this.#s=!0}setInitialTransform(e,t){this.#i.setSceneTransform(e,t),this.#s=!0,this.#u()}reanchor(){this.#i.reanchor()}get scene(){return this.#r?.scene??null}get scale(){return this.#i.scale}get roomMatrix(){return this.#i.buildRoomMatrix()}get leftHand(){return this.#t.left}get rightHand(){return this.#t.right}get locked(){return this.#o}set locked(e){this.#o=!!e,this.#o&&this.#i.reset()}get scaleLocked(){return this.#i.scaleLocked}set scaleLocked(e){this.#i.scaleLocked=e}resetToInitial(){this.#i.resetToInitial(),this.#i.reset()}update(e,t,r,i,n,a=!1){let o=t.getViewerPose(r);this.#i.anchor(o?.transform??null)&&(this.#s=!0),this.#t.read(t,r,i,{isHeld:c=>this.#i.isHeld(c),hitTest:c=>this.#r?.hitTest(c)??!1,uiActive:n,viewerPose:o?.transform??null}),(this.#s||!this.#l)&&this.#h();let l=this.#t.left,h=this.#t.right;if(l.held=h.held=!1,!this.#o){this.#i.update(l,h,this.#t.stickSrcs,e,this.#l&&!a,o?.transform??null);let c=this.#i.isHeld("left"),u=this.#i.isHeld("right");l.held=c&&this.#c,h.held=u&&this.#a,this.#c=c,this.#a=u}this.#u()}#u(){this.#l&&this.#r?.applyTransform(this.#i.position,this.#i.scale),this.#e.setModelMatrix?.(this.#i.buildModelMatrix())}#h(){let e=this.#e.getBBox?.();if(!e)return;let t,r,i;this.#r?{cx:t,cy:r,cz:i}=this.#r.rebuildBBox(e,this.#i.sceneTransform):(t=(e.minX+e.maxX)/2,r=(e.minY+e.maxY)/2,i=(e.minZ+e.maxZ)/2,this.#n=!0),this.#i.setCenter(t,r,i),this.#s=!1}};function Jn(){let s=document.createElement("canvas");return s.style.display="block",s.style.width="100%",s.style.height="100%",s.style.touchAction="none",s}var eo=s=>s.getContext("webgpu"),pt=class s{#e=null;#r;#t=null;#i=null;#s=null;#n=null;#o=0;#c=0;#a=null;#l=null;#u=new Vt;#h=null;#d=!1;#p=!1;#f=0;#m="pw";#g="pw";#y=null;#T=!1;#w={};#_="auto";#P=!1;#x=null;#b=null;#M=null;#v=!1;#S=[];#R=-1;#E=null;#C="orbit";onProgress=null;onReady=null;onError=null;onFrame=null;onBeforeFrame=null;onModeChange=null;onSceneChange=null;onSceneEnd=null;static async create(e,{container:t,overlay:r=null,boundaryRenderer:i=null,mode:n="pw",xrBackend:a="auto"}={}){if(!t)throw new Error("container element required");if(!navigator.gpu)throw new Error("WebGPU not available");let o=new s;o.#a=r,o.#l=i,r&&(r.onSceneChange=(h,c)=>o.loadScene(c)),navigator.xr&&(o.#w.vr=await navigator.xr.isSessionSupported("immersive-vr").catch(()=>!1),o.#w.ar=await navigator.xr.isSessionSupported("immersive-ar").catch(()=>!1)),o.#_=a,o.#P=a!=="webgl"&&"XRGPUBinding"in globalThis;let l=n==="hw"?"hw":n==="vr"||n==="ar"?n:"pw";return o.#r=Jn(),t.appendChild(o.#r),o.#e=await lt.create(e,{canvas:o.#r,backend:o.#Q(l),xrCompatible:o.#P}),o.#K(),await o.#z(l),o.#m=l,o}get player(){return this.#e}get camera(){return this.#i}get canvas(){return this.#r}get gl(){return this.#e?.gl??null}get audioContext(){return this.#e?.audioContext??null}get device(){return this.#e?.device??null}get mode(){return this.#m}get fallbackMode(){return this.#g}get xr(){return this.#s}get manipulator(){return this.#n}get drawMode(){return this.#e.drawMode}set drawMode(e){this.#e.drawMode=e}get xrBackend(){return this.#s?.api??(this.#P?"webgpu":"webgl")}supports(e){return e==="pw"||e==="hw"?!0:!!this.#w[e]&&(this.#_!=="webgpu"||this.#P)}set sources(e){this.#S=e??[],this.#R=Math.min(this.#R,Math.max(0,this.#S.length-1)),this.#a&&(this.#a.sources=this.#S)}get sources(){return this.#S}get sceneIndex(){return this.#R}loadScene(e){let t=this.#S;if(e<0||e>=t.length)return;let r=t[e];this.#R=e,this.#b=null,this.#A(r);let i=r.staticTransform??null,n=r.staticUrl??null;this.#j(async a=>{if(n){let o=new File([await(await fetch(n)).arrayBuffer()],"static.sog");if(!a()||(await this.#e.open({file:o,type:"static"}),!a()))return}await this.#e.open(r),a()&&i&&this.#N(i)}),this.#a&&(this.#a.sceneIndex=e),this.onSceneChange?.(r,e)}start(){this.#d=!0,this.#X()}stop(){this.#d=!1,this.#k()}open(e){return this.#A(e),this.#j(()=>this.#e.open(e))}#A(e){this.#E=e,this.setInitialTransform(e.initialTransform??null),this.setBackground(e.background??"#000"),e.controls&&this.setControls(e.controls),this.setBounds(e.bounds??null),this.setAudioPosition(e.audioPosition??null),this.#n&&(this.#n.locked=e.locked??this.#n.locked,this.#n.scaleLocked=e.scaleLocked??this.#n.scaleLocked)}close(){++this.#f,this.#B(),this.#e.close(),this.#p=!1,this.#d=!1;let e=this.#m,t=this.#g,r=t!=="pw"?"hybrid":"pure";r!==this.#e.backend&&this.#U(r),this.#L(),this.#m=t,t!==e&&this.onModeChange?.(t,e)}async setMode(e){if(this.#y=e,!this.#T){this.#T=!0;do e=this.#y,this.#y=null,e!==this.#m&&await this.#V(e);while(this.#y!=null);this.#T=!1}}async#V(e){let t=this.#m;await this.#G();try{await this.#F(e)}catch(r){if(e===this.#g)throw r;this.onError?.(r),await this.#F(this.#g)}this.#m!==t&&this.onModeChange?.(this.#m,t)}setAudio(e){this.#e.loadAudio(e)}setVolume(e){this.#e?.setVolume(e)}enableAudio(){this.#e?.enableAudio()}disableAudio(){this.#e?.disableAudio()}get audioEnabled(){return this.#e?.audioEnabled??!1}setAudioPanner(e){this.#e?.setAudioPanner(e)}setBackground(e){this.#r&&(this.#r.style.background=e||"#000")}setInitialTransform(e,t=null){this.#x=e??null,this.#i?.setSceneTransform(this.#x,this.#E?.origin),this.#n&&(this.#n.setInitialTransform(this.#x,this.#E?.origin),!this.#p&&this.#E?.resetPositionOnStart!==!1&&this.#n.resetToInitial()),t?.translation&&t.rotation&&t.scale&&this.#N(t)}#N(e){this.#e?.setStaticModelMatrix(Y.create().fromTransform(e))}reset(){this.#i?.reset()}setControls(e){this.#C=e,this.#i?.setControls(e)}setBounds(e){this.#u.setBounds(e),this.#l?.sync(this.#u)}setBoundaryVisible(e){this.#u.setHidden(!e),this.#l?.sync(this.#u)}setAudioPosition(e){this.#M=e??null,this.#i?.setAudioPosition(this.#M),this.#s&&(this.#s.soundPosition=this.#M)}dispose(){++this.#f,this.#B(),this.#t?.disconnect(),this.#e?.dispose()}async#z(e){if(e==="vr"||e==="ar"){if(!this.supports(e))throw new Error(`${e.toUpperCase()} not supported`);await this.#W(e==="ar")}else if(e==="pw"||e==="hw")this.#L();else throw new Error(`Unknown mode: ${e}`)}#L(){let e=new Br(this.#r,this.#C);this.#i=e,this.#e.backend==="pure"&&(this.#e.drawMode=0),e.setSceneTransform(this.#x,this.#E?.origin),e.setAudioPosition(this.#M),this.#b&&e.setBBox(this.#b),this.#u.reset($i)}async#W(e){let t=new Gr(this.#e,this.#e.gl,{backend:this.#P?this.#_:"webgl",ensureGL:()=>(this.#e.backend!=="hybrid"&&this.#U("hybrid"),this.#e.gl)});t.soundPosition=this.#M,t.onSessionEnd=()=>{this.#O(),this.#s===t&&(this.#s=null,this.#n=null,this.setMode(this.#g))};let r=null;try{let i=await t.enter(e),n=this.#E;r=new ut(this.#e,null,{directGrab:i.isAVP}),r.locked=n?.locked??!1,r.scaleLocked=n?.scaleLocked??!0,r.setInitialTransform(this.#x,n?.origin),this.#u.reset(ht).queueIntro(),this.#l?.init(this.#e.gl,t.gpu);let a=this.#a;a&&(a.manipulator=r,await a.init(this.#e,t.session,t.binding,t.refSpace,this.#e.gl,e,t.gpu),t.onASWRender=(l,h)=>a.render(l,h)),t.onRefReset=()=>{r.reanchor(),a?.onRefReset?.()},t.onBeforeEyeRender=(l,h,c,u,p,f,m)=>this.#l?.renderUnderlay(l,h,c,u,p,f,m),t.onEyeRender=(l,h,c,u,p,f,m)=>{this.#l?.renderEye(l,h,c,u,p,f,m),a?.renderEye(l,h,c,u,p,f,m)},t.onViewsRender=(l,h)=>{this.#l?.renderViews?.(l),a?.renderViews?.(l,h)};let o=r;t.onBeforeRender=(l,h,c,u,p,f)=>{if(o.update(l,h,c,p,a?.uiActive??!1,a?.uiDragging??!1),this.#H(l,u.transform.position,o.roomMatrix),a){a.frame(l,h,c,u,p,f);let m=[];for(let d of a.quads??[])d.layer&&(d.visible||d.placing)&&m.push(d.layer);t.externalLayers=m}},t.onFrame=(l,h)=>{if(!this.#Y(l))return;let c=o.scale;t.renderFrame(l,h,c!==1?1/c:1),this.#q()}}catch(i){throw this.#I(t),this.#O(),t.exit(),i}if(!t.session)throw this.#I(t),new Error("XR session ended during entry");this.#n=r,this.#s=t}#I(e){e.onFrame=null,e.onSessionEnd=null,e.onBeforeRender=null,e.onBeforeEyeRender=null,e.onEyeRender=null,e.onASWRender=null,e.onViewsRender=null,e.onRefReset=null}#O(){this.#a?.dispose(),this.#l?.dispose()}#H(e,t,r){let i=this.#l;i&&(this.#p||this.#u.setRoomMatrix(r).update(t,e),i.sync(this.#u))}#B(){this.#k(),this.#i?.dispose(),this.#i=null,this.#l?.dispose();let e=this.#s;e&&(this.#s=null,this.#n=null,this.#I(e),this.#O(),e.exit())}async#G(){this.#k(),this.#i?.dispose(),this.#i=null,this.#l?.dispose();let e=this.#s;if(e){this.#s=null,this.#n=null,e.onFrame=null;try{await e.session?.end()}catch{}}}async#F(e){let t=this.#Q(e);t!==this.#e.backend&&this.#U(t),await this.#z(e),(this.#d||this.#p)&&this.#X(),this.#m=e,this.#s||(this.#g=e)}#X(){this.#i&&!this.#o&&(this.#o=requestAnimationFrame(this.#D))}#k(){this.#o&&cancelAnimationFrame(this.#o),this.#o=0,this.#c=0}#D=e=>{this.#o=requestAnimationFrame(this.#D);let t=S.deltaSeconds(e,this.#c,1/60);if(this.#c=e,!this.#Y(t))return this.#k();let r=this.#i;if(!r)return this.#k();r.update(t);let{width:i,height:n}=this.#r;r.apply(this.#e,i,n),this.#Z(r.canPresent),this.#e.present(i,n),this.#H(t,r.view.position,null),this.#l?.renderOver(this.#r,r.view,this.#$),this.#q()};#$=()=>{if(!this.#e.hasStatic)return this.#r;let e=Math.max(1,this.#r.width>>2),t=Math.max(1,this.#r.height>>2);this.#h||(this.#h=new OffscreenCanvas(e,t),this.#e.configureSurface(eo(this.#h)));let r=this.#h;r.width!==e&&(r.width=e),r.height!==t&&(r.height=t);let i=eo(r).getCurrentTexture();return this.#e.renderDynamic({color:i,w:e,h:t})?r:null};#Y(e){return this.#ee(),!this.#d&&!this.#p?!1:(this.onBeforeFrame?.(e),!0)}#q(){this.#p&&this.onProgress?.(Math.round(this.#e.progress*100)),this.#J(),this.onFrame?.()}async#j(e){let t=++this.#f,r=()=>t===this.#f;this.#k(),this.#e.close(),this.#b=null,this.#Z(!1),this.#p=!0,this.#v=!1;try{await e(r)}catch(i){if(!r())return;this.#p=!1,this.onError?.(i)}r()&&this.#X()}#J(){if(this.#v||!this.#e.ended)return;this.#v=!0;let e=this.#S[this.#R];this.onSceneEnd?.(e,this.#R),(e?.autoSwitchToNext??!0)&&this.#R<this.#S.length-1&&this.loadScene(this.#R+1)}#ee(){if(!this.#b&&this.#e.isReady){let t=this.#e.getBBox();t&&(this.#b=t,this.#i?.setBBox(t))}let e=this.#i;if(e&&!e.canPresent&&this.#b&&e.setBBox(this.#b),!!this.#p){if(!this.#e.isReady){let t=this.#e.lastFetchStatus;t&&t!==200&&t!==206&&(this.#p=!1,this.onError?.(t));return}this.#p=!1,this.#e.play(),this.#n&&(this.#E?.resetPositionOnStart!==!1&&this.#n.resetToInitial(),this.#n.invalidateBBox()),this.onProgress?.(100),this.onReady?.()}}#Q(e){return e==="hw"?"hybrid":e==="vr"||e==="ar"?this.#P?"pure":"hybrid":"pure"}#Z(e){this.#r.style.visibility=e?"visible":"hidden"}#U(e){this.#t?.disconnect();let t=Jn();this.#r.replaceWith(t),this.#r=t,this.#e?.setBackend(e,{canvas:t}),this.#K()}#K(){this.#t?.disconnect();let e=this.#r;this.#t=new ResizeObserver(([t])=>{if(!t)return;let r=S.clamp(devicePixelRatio||1,1,2),i=Math.round(t.contentRect.width*r),n=Math.round(t.contentRect.height*r);i>0&&n>0&&(e.width!==i||e.height!==n)&&(e.width=i,e.height=n)}),this.#t.observe(e)}};var Hr=class s{#e;#r;#t;#i=null;#s=null;#n=null;#o=null;#c=!1;enableMesh=!1;static attach(e,t,r){let i=new s(e,t,r);return i.#u(),i.#a(),i}constructor(e,t,r){this.#e=e,this.#r=t,this.#t=r}get player(){return this.#e}set camera(e){this.#t=e}get camera(){return this.#t}async setAudio(e){await this.#e.loadAudio(e)}setAudioPanner(e){this.#e.setAudioPanner(e)}set entity(e){if(this.#s?.node?.destroy(),this.#s=null,this.#i=e,!e)return;let t=new this.#r.root.constructor("_SplatShadow",this.#r);t.addComponent("render",{type:"box",castShadows:!0,receiveShadows:!1});let r=t.render.meshInstances[0];r.visible=!1,r.cull=!1,e.addChild(t),this.#s=r}get entity(){return this.#i}dispose(){this.#s?.node?.destroy(),this.#o&&(this.#r.renderer.setMeshInstanceMatrices=this.#o[0],this.#r.graphicsDevice.draw=this.#o[1]),this.#e.close(),this.#e.dispose()}#a(){let{renderer:e,graphicsDevice:t}=this.#r,r=e.setMeshInstanceMatrices,i=t.draw;this.#o=[r,i];let n=this;e.setMeshInstanceMatrices=function(...a){return a[0]===n.#s&&(n.#c=!0),r.apply(this,a)},t.draw=function(...a){let o=n.#c;if(n.#c=!1,o){n.enableMesh&&n.#e.isReady&&n.#l();return}return i.apply(this,a)}}#l(){let e=this.#r.graphicsDevice,t=e.gl,r=t.getParameter(t.VIEWPORT),i=e.scope.resolve("matrix_viewProjection").value;i&&(this.#n||(this.#n=new(this.#i.getWorldTransform()).constructor),this.#n.data.set(i),this.#n.mul(this.#i.getWorldTransform()),this.#e.renderMesh(this.#n.data,r[0],r[1],r[2],r[3]),this.#u())}renderFrame(){let e=this.#r.graphicsDevice,t=e.gl,r=e.width,i=e.height;!r||!i||(this.#i&&this.#e.setModelMatrix(this.#i.getWorldTransform().data),this.#t?.camera&&(this.#e.setCamera(this.#t.getWorldTransform().data,this.#t.camera.projectionMatrix.data),this.#e.setAudioListenerMatrix(this.#t.getWorldTransform().data)),this.#i&&this.#e.setAudioSourceMatrix(this.#i.getWorldTransform().data),this.#e.renderHybridViewport(r,i,{gl:t,enableMesh:this.enableMesh}),this.#u())}#u(){let e=this.#r.graphicsDevice;e.shader=null,e.boundVao=null,e.textureUnit=-1;let t=e.textureUnits;if(t)for(let r=0;r<t.length;r++)t[r][0]=t[r][1]=t[r][2]=null}};async function as(s,e,t){let r=`${s.replace(/\/+$/,"")}/${e}`,i=await fetch(r,{headers:{"X-VIEW-TOKEN":t}});if(!i.ok)throw new Error(`Streaming metadata fetch failed: ${i.status} ${i.statusText}`);let n=await i.json();return{metadata:n.metadata??null,audioFileLink:n.audioFileLink??null}}async function dt(s,e){let t=e.replace(/\/+$/,"");return Promise.all(s.map(async(r,i)=>{let{metadata:n,audioFileLink:a}=await as(t,r.streamingId,r.token);return{id:r.streamingId,label:r.label??n?.name??r.streamingId,url:`${t}/${r.streamingId}/`,token:r.token,displayName:n?.name??void 0,audio:a&&n?.withAudio!==!1?a:void 0,initialTransform:n?.initialSpawn??null,bounds:n?.bounds??null,origin:n?.isPOV?"eyes":"floor",locked:!1,scaleLocked:!0,autoSwitchToNext:!0,resetPositionOnStart:r.settings?.resetPositionOnStart,...r.rawMetadata}}))}import{useEffect as xc,useMemo as ls,useReducer as bc,useRef as cs}from"react";import{useEffect as gc,useMemo as yc,useState as to}from"react";function ro(s,e){let[t,r]=to(!1),[i,n]=to(!1);gc(()=>{let l=navigator.xr;if(!l||!s)return;let h=async()=>{let[c,u]=await Promise.all([l.isSessionSupported("immersive-vr").catch(()=>!1),l.isSessionSupported("immersive-ar").catch(()=>!1)]);r(c),n(u)};return h(),l.addEventListener("devicechange",h),()=>l.removeEventListener("devicechange",h)},[s]);let a=e==="vr"||e==="ar",o=s?.xrBackend??"webgl";return yc(()=>({vrSupported:t,arSupported:i,isActive:a,backend:o,setMode:async l=>{await s?.setMode(l)}}),[s,t,i,a,o])}var so=new WeakMap;function no(s){return so.get(s)}var oo={app:null,overlay:null,isContentReady:!1,isLoading:!1,progress:0,mode:"pw",error:null,isPlaying:!1,isBuffering:!1,currentTime:0,duration:0,controlsType:"orbit",isMuted:!0,volume:1};function vc(s,e){switch(e.type){case"init":return{...s,app:e.app,overlay:e.overlay};case"frame":{let{isPlaying:t,isBuffering:r,currentTime:i,duration:n,isMuted:a}=e,o=n>0?n:s.duration;return s.isPlaying===t&&s.isBuffering===r&&s.currentTime===i&&s.duration===o&&s.isMuted===a?s:{...s,isPlaying:t,isBuffering:r,currentTime:i,duration:o,isMuted:a}}case"progress":return s.progress===e.value?s:{...s,progress:e.value};case"ready":return{...s,isContentReady:!0,isLoading:!1,progress:100};case"mode":return s.mode===e.mode?s:{...s,mode:e.mode};case"error":return{...s,error:e.error,isLoading:!1};case"open":return{...s,error:null,isLoading:!0,progress:0};case"close":return{...s,isLoading:!1,progress:0};case"reset":return{...oo,mode:s.mode};case"seek":return{...s,currentTime:e.time};case"camera_controls":return s.controlsType===e.controlsType?s:{...s,controlsType:e.controlsType};case"set_volume":return{...s,volume:e.volume}}}var io=new Set(["vr","ar"]);function Yr(s){let{containerRef:e,mode:t="pw",xrBackend:r="auto",overlay:i,boundaryRenderer:n,moduleUrl:a,moduleFactory:o,onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p,eventLogger:f}=s,[m,d]=bc(vc,{...oo,mode:t}),g=cs(null),y=cs(m);y.current=m;let _=cs({onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p,eventLogger:f});_.current={onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p,eventLogger:f},xc(()=>{let L=e.current;if(!L)return;let w=!1;return(async()=>{try{if(!o&&!a)throw new Error("[gr-react] Either moduleUrl or moduleFactory must be provided");let P=o?await o():await Mr(a);if(w)return;let I=i??null;I&&(I.eventLogger={event:(F,K)=>_.current.eventLogger?.event?.(F,{...K,mode:y.current.mode}),error:(F,K)=>_.current.eventLogger?.error?.(F,{...K,mode:y.current.mode})});let k=await pt.create(P,{container:L,overlay:I,boundaryRenderer:n,mode:t,xrBackend:r});if(w){k.dispose();return}g.current=k,k.onProgress=F=>{d({type:"progress",value:F}),_.current.onProgress?.(F)},k.onReady=()=>{d({type:"ready"}),k.audioEnabled&&k.enableAudio(),_.current.onReady?.()},k.onFrame=()=>{let F=g.current?.player;F&&d({type:"frame",isPlaying:F.isPlaying??!1,isBuffering:F.isBuffering??!1,currentTime:F.currentTime??0,duration:F.duration??0,isMuted:!(F.audioEnabled??!1)})},k.onModeChange=(F,K)=>{d({type:"mode",mode:F}),_.current.onModeChange?.(F,K);let be=io.has(K),nt=io.has(F);be&&!nt&&_.current.onXREnd?.(),!be&&nt&&_.current.onXRStart?.()},k.onError=F=>{let[K,be]=typeof F=="number"?[new Error(`Streaming fetch failed: HTTP ${F}`),"load"]:[F,"xr"];d({type:"error",error:K}),_.current.eventLogger?.error?.(K,{phase:be,mode:y.current.mode})},k.start(),d({type:"init",app:k,overlay:I}),d({type:"camera_controls",controlsType:k.camera?.controlsType??"orbit"})}catch(P){let I=P instanceof Error?P:new Error(String(P));d({type:"error",error:I}),_.current.eventLogger?.error?.(I,{phase:"init",mode:y.current.mode})}})(),()=>{w=!0;let P=g.current;P&&(P.stop(),P.dispose()),g.current=null,d({type:"reset"})}},[e,i,n,t,r,o,a]);let{app:x}=m,v=ro(x,m.mode),T=ls(()=>({play:()=>x?.player?.play(),pause:()=>x?.player?.pause(),togglePlay:()=>{let L=x?.player;if(!L)return;let w=!L.isPlaying;w?L.play():L.pause(),_.current.eventLogger?.event?.("play_pause",{playing:w,mode:y.current.mode})},seek:L=>{d({type:"seek",time:L}),x?.player?.seek(L),_.current.eventLogger?.event?.("seek",{position:L,mode:y.current.mode})},setSpeed:L=>x?.player?.setSpeed(L),setVolume:L=>{d({type:"set_volume",volume:L}),x?.setVolume(L)},toggleMute:()=>{let L=!x?.audioEnabled;L?x?.enableAudio():x?.disableAudio(),_.current.eventLogger?.event?.("mute_toggle",{muted:!L,mode:y.current.mode})},setAudio:L=>x?.setAudio(L)}),[x]),M=ls(()=>({controlsType:m.controlsType,zoom:L=>x?.camera?.zoom(L),reset:()=>{x?.camera?.reset(),_.current.eventLogger?.event?.("reset",{mode:y.current.mode})},setControls:L=>{if(!x)return;x.setControls(L);let w=x.camera?.controlsType??L;d({type:"camera_controls",controlsType:w}),_.current.eventLogger?.event?.("camera_controls",{controls:w,requestedControls:L,mode:y.current.mode})}}),[x,m.controlsType]),B=ls(()=>({open(L){x&&(d({type:"open"}),x.open(L))},close(){x?.close(),d({type:"close"})},dispose(){x&&(x.stop(),x.dispose())}}),[x]),G={app:x,device:x?.device??null,overlay:m.overlay,isInitialized:x!==null,isLoading:m.isLoading,isContentReady:m.isContentReady,progress:m.progress,mode:m.mode,error:m.error,isRebuffering:m.isContentReady&&(m.isLoading||m.isBuffering),...B,playback:{isPlaying:m.isPlaying,isBuffering:m.isBuffering,currentTime:m.currentTime,duration:m.duration,isMuted:m.isMuted,volume:m.volume,...T},camera:M,xr:v};return so.set(G,{dispatch:d}),G}import{useCallback as qt,useEffect as wc,useRef as _c,useState as ao}from"react";function qr(s,e={}){let{app:t}=s,r=no(s)?.dispatch,i=_c(e.onSceneEnd);i.current=e.onSceneEnd;let[n,a]=ao([]),[o,l]=ao(-1);wc(()=>{if(t)return t.onSceneChange=(d,g)=>{r?.({type:"open"}),r?.({type:"camera_controls",controlsType:t.camera?.controlsType??"orbit"}),l(g)},t.onSceneEnd=(d,g)=>i.current?.(d,g),()=>{t.onSceneChange=null,t.onSceneEnd=null}},[t,r]);let h=qt(d=>{t&&(t.sources=d),a(d),l(-1)},[t]),c=qt(d=>{t?.loadScene(d)},[t]),u=qt(()=>{t&&t.loadScene(t.sceneIndex+1)},[t]),p=qt(()=>{t&&t.loadScene(t.sceneIndex-1)},[t]),f=qt(async(d,g)=>{let y=await dt(d,g);h(y),y.length>0&&c(0)},[h,c]),m=o>=0&&o<n.length?n[o]:null;return{sources:n,index:o,total:n.length,currentSource:m,hasNext:o>=0&&o<n.length-1,hasPrev:o>0,hasAudio:!!m?.audio,setSources:h,loadFromApi:f,next:u,prev:p,goTo:c}}import{jsx as z,jsxs as Sc}from"react/jsx-runtime";function lo(){return z("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:z("path",{d:"M5.74023 18.7266V5.17188C5.74023 4.68359 5.86068 4.32552 6.10156 4.09766C6.34245 3.86328 6.62891 3.74609 6.96094 3.74609C7.25391 3.74609 7.55339 3.83073 7.85938 4L19.2363 10.6504C19.64 10.8848 19.9199 11.0964 20.0762 11.2852C20.2389 11.4674 20.3203 11.6888 20.3203 11.9492C20.3203 12.2031 20.2389 12.4245 20.0762 12.6133C19.9199 12.8021 19.64 13.0137 19.2363 13.248L7.85938 19.8984C7.55339 20.0677 7.25391 20.1523 6.96094 20.1523C6.62891 20.1523 6.34245 20.0352 6.10156 19.8008C5.86068 19.5664 5.74023 19.2083 5.74023 18.7266Z"})})}function co(){return z("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:z("path",{d:"M7.3418 20.0254C6.91211 20.0254 6.58659 19.9147 6.36523 19.6934C6.15039 19.472 6.04297 19.1465 6.04297 18.7168V5.17188C6.04297 4.74219 6.15039 4.41992 6.36523 4.20508C6.58659 3.98372 6.91211 3.87305 7.3418 3.87305H9.56836C9.99154 3.87305 10.3138 3.97721 10.5352 4.18555C10.7565 4.39388 10.8672 4.72266 10.8672 5.17188V18.7168C10.8672 19.1465 10.7565 19.472 10.5352 19.6934C10.3138 19.9147 9.99154 20.0254 9.56836 20.0254H7.3418ZM14.4414 20.0254C14.0117 20.0254 13.6862 19.9147 13.4648 19.6934C13.2435 19.472 13.1328 19.1465 13.1328 18.7168V5.17188C13.1328 4.74219 13.2435 4.41992 13.4648 4.20508C13.6862 3.98372 14.0117 3.87305 14.4414 3.87305H16.6582C17.0879 3.87305 17.4102 3.97721 17.625 4.18555C17.8464 4.39388 17.957 4.72266 17.957 5.17188V18.7168C17.957 19.1465 17.8464 19.472 17.625 19.6934C17.4102 19.9147 17.0879 20.0254 16.6582 20.0254H14.4414Z"})})}function ho(){return z("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:z("path",{d:"M8.03125 15.5391C7.5 15.5391 7.10156 15.4036 6.83594 15.1328C6.57031 14.8568 6.4375 14.4375 6.4375 13.875V10.8828C6.4375 10.362 6.55208 9.97135 6.78125 9.71094L15.6875 18.6094C15.625 18.8333 15.5208 18.9974 15.375 19.1016C15.2292 19.2057 15.0547 19.2578 14.8516 19.2578C14.6745 19.2578 14.5052 19.2188 14.3438 19.1406C14.1823 19.0625 14.0104 18.9375 13.8281 18.7656L10.4531 15.6094C10.401 15.5625 10.3359 15.5391 10.2578 15.5391H8.03125ZM15.7422 14.3984L10.3203 8.99219H10.5547C10.6016 8.99219 10.6458 8.97135 10.6875 8.92969L13.8281 6.01562C14.0312 5.82812 14.2057 5.69271 14.3516 5.60938C14.4974 5.52083 14.6615 5.47656 14.8438 5.47656C15.1094 5.47656 15.3255 5.56771 15.4922 5.75C15.6589 5.92708 15.7422 6.14323 15.7422 6.39844V14.3984ZM18.4453 20.0781L5.05469 6.70312C4.9401 6.58854 4.88281 6.44792 4.88281 6.28125C4.88281 6.10938 4.9401 5.96615 5.05469 5.85156C5.17448 5.73177 5.31771 5.67448 5.48438 5.67969C5.65104 5.67969 5.79427 5.73698 5.91406 5.85156L19.2891 19.2266C19.4089 19.3464 19.4688 19.487 19.4688 19.6484C19.4688 19.8151 19.4089 19.9583 19.2891 20.0781C19.1797 20.1979 19.0391 20.2578 18.8672 20.2578C18.7005 20.2578 18.5599 20.1979 18.4453 20.0781Z"})})}function uo(){return z("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:z("path",{d:"M11.7031 19.2578C11.5208 19.2578 11.349 19.2188 11.1875 19.1406C11.026 19.0625 10.8568 18.9375 10.6797 18.7656L7.35156 15.6094C7.29948 15.5625 7.23438 15.5391 7.15625 15.5391H4.91406C4.38802 15.5391 3.98438 15.3958 3.70312 15.1094C3.42188 14.8229 3.28125 14.3958 3.28125 13.8281V10.9219C3.28125 10.3594 3.42188 9.9349 3.70312 9.64844C3.98438 9.35677 4.38802 9.21094 4.91406 9.21094H7.15625C7.23438 9.21094 7.29948 9.1875 7.35156 9.14062L10.6797 6.01562C10.8828 5.82812 11.0547 5.69271 11.1953 5.60938C11.3411 5.52083 11.5052 5.47656 11.6875 5.47656C11.9531 5.47656 12.1693 5.56771 12.3359 5.75C12.5026 5.92708 12.5859 6.14323 12.5859 6.39844V18.3828C12.5859 18.6328 12.5026 18.8411 12.3359 19.0078C12.1745 19.1745 11.9635 19.2578 11.7031 19.2578ZM15.375 15.6875C15.2188 15.5781 15.1302 15.4375 15.1094 15.2656C15.0885 15.0938 15.138 14.9245 15.2578 14.7578C15.4818 14.4401 15.6562 14.0755 15.7812 13.6641C15.9062 13.2474 15.9688 12.8125 15.9688 12.3594C15.9688 11.9062 15.9062 11.4714 15.7812 11.0547C15.6615 10.638 15.487 10.2734 15.2578 9.96094C15.1328 9.79948 15.0807 9.63281 15.1016 9.46094C15.1276 9.28385 15.2188 9.14062 15.375 9.03125C15.5104 8.9375 15.6589 8.90625 15.8203 8.9375C15.9818 8.96875 16.1146 9.0599 16.2188 9.21094C16.5208 9.60677 16.7552 10.0807 16.9219 10.6328C17.0938 11.1849 17.1797 11.7604 17.1797 12.3594C17.1797 12.9583 17.0938 13.5339 16.9219 14.0859C16.7552 14.638 16.5208 15.112 16.2188 15.5078C16.1146 15.6589 15.9818 15.75 15.8203 15.7812C15.6589 15.8073 15.5104 15.776 15.375 15.6875ZM18.2734 17.7266C18.1328 17.6276 18.0521 17.4974 18.0312 17.3359C18.0104 17.1693 18.0547 17.0052 18.1641 16.8438C18.5859 16.2344 18.9141 15.5443 19.1484 14.7734C19.388 13.9974 19.5078 13.1927 19.5078 12.3594C19.5078 11.526 19.3906 10.7214 19.1562 9.94531C18.9219 9.16927 18.5911 8.47917 18.1641 7.875C18.0495 7.71354 18.0026 7.55208 18.0234 7.39062C18.0495 7.22396 18.1328 7.09115 18.2734 6.99219C18.4193 6.89323 18.5729 6.85938 18.7344 6.89062C18.8958 6.92188 19.0286 7.01302 19.1328 7.16406C19.638 7.84115 20.0286 8.63542 20.3047 9.54688C20.5807 10.4583 20.7188 11.3958 20.7188 12.3594C20.7188 13.3229 20.5781 14.2578 20.2969 15.1641C20.0208 16.0703 19.6328 16.8672 19.1328 17.5547C19.0286 17.7057 18.8958 17.7969 18.7344 17.8281C18.5729 17.8542 18.4193 17.8203 18.2734 17.7266Z"})})}function He(){return z("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:z("path",{d:"M5.42188 13.1953V6.4375C5.42188 5.625 5.6224 5.01302 6.02344 4.60156C6.42969 4.1901 7.03646 3.98438 7.84375 3.98438H11.4297V9.71875C11.4297 10.7031 11.9219 11.1953 12.9062 11.1953H18.5625V18.2891C18.5625 19.1016 18.3594 19.7109 17.9531 20.1172C17.5521 20.5286 16.9479 20.7344 16.1406 20.7344H9.78125C10 20.3646 10.1667 19.9688 10.2812 19.5469C10.401 19.125 10.4609 18.6901 10.4609 18.2422C10.4609 17.5495 10.3307 16.8984 10.0703 16.2891C9.8099 15.6797 9.44792 15.1432 8.98438 14.6797C8.52083 14.2161 7.98438 13.8542 7.375 13.5938C6.76562 13.3281 6.11458 13.1953 5.42188 13.1953ZM12.9297 10.125C12.6432 10.125 12.5 9.98438 12.5 9.70312V4.07031C12.6615 4.09635 12.8255 4.16667 12.9922 4.28125C13.1589 4.39062 13.3333 4.53906 13.5156 4.72656L17.8203 9.10938C18.0078 9.30208 18.1562 9.47917 18.2656 9.64062C18.375 9.80208 18.4427 9.96354 18.4688 10.125H12.9297ZM5.42188 22.2109C4.88021 22.2109 4.36979 22.1068 3.89062 21.8984C3.41146 21.6953 2.98958 21.4115 2.625 21.0469C2.26042 20.6823 1.97396 20.2604 1.76562 19.7812C1.55729 19.3021 1.45312 18.7891 1.45312 18.2422C1.45312 17.6953 1.55729 17.1849 1.76562 16.7109C1.97396 16.2318 2.26042 15.8099 2.625 15.4453C2.98958 15.0755 3.41146 14.7891 3.89062 14.5859C4.36979 14.3776 4.88021 14.2734 5.42188 14.2734C5.96875 14.2734 6.48177 14.3776 6.96094 14.5859C7.4401 14.7891 7.86198 15.0729 8.22656 15.4375C8.59115 15.8021 8.875 16.224 9.07812 16.7031C9.28646 17.1823 9.39062 17.6953 9.39062 18.2422C9.39062 18.7839 9.28646 19.2943 9.07812 19.7734C8.86979 20.2526 8.58073 20.6745 8.21094 21.0391C7.84635 21.4036 7.42448 21.6901 6.94531 21.8984C6.46615 22.1068 5.95833 22.2109 5.42188 22.2109ZM5.42188 20.7266C5.56771 20.7266 5.68229 20.6823 5.76562 20.5938C5.85417 20.5052 5.89844 20.3906 5.89844 20.25V18.7188H7.42969C7.57031 18.7188 7.6849 18.6745 7.77344 18.5859C7.86198 18.5026 7.90625 18.388 7.90625 18.2422C7.90625 18.0964 7.86198 17.9818 7.77344 17.8984C7.6849 17.8099 7.57031 17.7656 7.42969 17.7656H5.89844V16.2344C5.89844 16.0938 5.85417 15.9792 5.76562 15.8906C5.68229 15.8021 5.56771 15.7578 5.42188 15.7578C5.27604 15.7578 5.15885 15.8021 5.07031 15.8906C4.98698 15.9792 4.94531 16.0938 4.94531 16.2344V17.7656H3.41406C3.27344 17.7656 3.15885 17.8099 3.07031 17.8984C2.98177 17.9818 2.9375 18.0964 2.9375 18.2422C2.9375 18.388 2.98177 18.5026 3.07031 18.5859C3.15885 18.6745 3.27344 18.7188 3.41406 18.7188H4.94531V20.25C4.94531 20.3906 4.98698 20.5052 5.07031 20.5938C5.15885 20.6823 5.27604 20.7266 5.42188 20.7266Z"})})}function po(){return z("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:z("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.75 6.5A3.75 3.75 0 0 0 2 10.25v3.5a3.75 3.75 0 0 0 3.75 3.75h7.5A3.75 3.75 0 0 0 17 13.75v-.46l2.9 2.16A1.25 1.25 0 0 0 22 14.45v-4.9a1.25 1.25 0 0 0-2.1-1L17 10.71v-.46a3.75 3.75 0 0 0-3.75-3.75h-7.5ZM6 8h7a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 16H6a2.5 2.5 0 0 1-2.5-2.5v-3A2.5 2.5 0 0 1 6 8Zm11 4.6v-1.2l3.5-2.61v6.42L17 12.6Z"})})}function Zr(){return z("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:z("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.25 6.75C3.46 6.75 2 8.21 2 10v4c0 1.79 1.46 3.25 3.25 3.25h3.24c.83 0 1.55-.54 1.8-1.33l.52-1.67h2.38l.52 1.67c.25.79.97 1.33 1.8 1.33h3.24c1.79 0 3.25-1.46 3.25-3.25v-4c0-1.79-1.46-3.25-3.25-3.25H5.25Zm.67 3.42c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52H5.92Zm10.2 0c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52h-1.96Z"})})}function $r(){return Sc("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[z("path",{d:"M5.5 3.75c-.97 0-1.75.78-1.75 1.75v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5A3.25 3.25 0 0 1 5.5 2.25h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5ZM16.25 3c0-.41.34-.75.75-.75h1.5a3.25 3.25 0 0 1 3.25 3.25v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5c0-.97-.78-1.75-1.75-1.75H17c-.41 0-.75-.34-.75-.75ZM3 15.5c.41 0 .75.34.75.75v2.25c0 .97.78 1.75 1.75 1.75h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5a3.25 3.25 0 0 1-3.25-3.25v-2.25c0-.41.34-.75.75-.75ZM21 15.5c.41 0 .75.34.75.75v2.25a3.25 3.25 0 0 1-3.25 3.25H17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.5c.97 0 1.75-.78 1.75-1.75v-2.25c0-.41.34-.75.75-.75Z"}),z("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z"})]})}function fo(){return z("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:z("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"})})}function mo(){return z("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:z("path",{d:"m480-236 93-93q12-12 29-12t29 12q12 12 12 29t-12 29L508-148q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L329-271q-12-12-12-29t12-29q12-12 29-12t29 12l93 93Zm0-484-93 93q-12 12-29 12t-29-12q-12-12-12-29t12-29l123-123q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l123 123q12 12 12 29t-12 29q-12 12-29 12t-29-12l-93-93Z"})})}function go({active:s=!1}){return z("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:s?z("path",{d:"M240-240h-80q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h120q17 0 28.5 11.5T320-280v120q0 17-11.5 28.5T280-120q-17 0-28.5-11.5T240-160v-80Zm480 0v80q0 17-11.5 28.5T680-120q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320h120q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240h-80ZM240-720v-80q0-17 11.5-28.5T280-840q17 0 28.5 11.5T320-800v120q0 17-11.5 28.5T280-640H160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h80Zm480 0h80q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H680q-17 0-28.5-11.5T640-680v-120q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v80Z"}):z("path",{d:"M200-200h80q17 0 28.5 11.5T320-160q0 17-11.5 28.5T280-120H160q-17 0-28.5-11.5T120-160v-120q0-17 11.5-28.5T160-320q17 0 28.5 11.5T200-280v80Zm560 0v-80q0-17 11.5-28.5T800-320q17 0 28.5 11.5T840-280v120q0 17-11.5 28.5T800-120H680q-17 0-28.5-11.5T640-160q0-17 11.5-28.5T680-200h80ZM200-760v80q0 17-11.5 28.5T160-640q-17 0-28.5-11.5T120-680v-120q0-17 11.5-28.5T160-840h120q17 0 28.5 11.5T320-800q0 17-11.5 28.5T280-760h-80Zm560 0h-80q-17 0-28.5-11.5T640-800q0-17 11.5-28.5T680-840h120q17 0 28.5 11.5T840-800v120q0 17-11.5 28.5T800-640q-17 0-28.5-11.5T760-680v-80Z"})})}function jr(){return z("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:z("path",{d:"m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"})})}function Qr(){return z("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:z("path",{d:"M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"})})}function yo(){return z("svg",{className:"gr-player__icon",viewBox:"0 0 20 20","aria-hidden":"true",children:z("path",{d:"M3.33333 10.8333V9.16667H9.66667L13.8333 5H11.6667V3.33333H16.6667V8.33333H15V6.16667L10.3333 10.8333H3.33333ZM11.6667 16.6667V15H13.8333L11.1667 12.375L12.375 11.1667L15 13.8333V11.6667H16.6667V16.6667H11.6667Z"})})}var xo=[{type:"orbit",label:"Orbit",hint:`Left-click drag to rotate / Right-click drag to pan
Scroll to zoom in/out`},{type:"trackball",label:"Trackball",hint:`Left-click drag to rotate freely / Right-click drag to pan
Scroll to zoom in/out`},{type:"fly",label:"Fly",hint:`W/S forward & back / A/D strafe / R/F up & down
Q/E roll / Drag to look around`}];var _e={PW:"pw",HW:"hw",VR:"vr",AR:"ar"},Nd=[_e.VR,_e.AR];function ft(s){return s===_e.VR||s===_e.AR}var hs=[".mint",".sog"],bo=hs.join(","),vo="Open file",Kr="local://",wo="static",Tc=".sog";function us(s){return s.toLowerCase().endsWith(Tc)}function Ye(s){return typeof s?.url=="string"&&s.url.startsWith(Kr)}var _o="stepper";var Mc="@gracia/web-sdk/wasm",Pc="https://market.gracia.ai/api/v1/streaming/content";function So(){return typeof __GRACIA_MODULE_URL__=="string"?__GRACIA_MODULE_URL__:Mc}function To(){return typeof __GRACIA_STREAMING_BASE_URL__=="string"?__GRACIA_STREAMING_BASE_URL__:Pc}function Rc(){return typeof navigator>"u"?!1:!!navigator.gpu}var Cc={xr:"xr-failed",scenario:"invalid-scenario",fullscreen:"fullscreen-failed","local-file":"local-file-failed"};function Ec(s){let e=s.match(/http\s+(-?\d+)/i);return e?Number(e[1]):null}function Lc(s,e){let t=e&&Cc[e];if(t)return t;let r=s.message.toLowerCase();if(r.includes("webgpu")||r.includes("not supported")||r.includes("getcontext"))return"unsupported-browser";let i=Ec(r);return i!==null?i===401||i===403?"access-denied":i===404?"not-found":i>=500?"server-error":"network":r.includes("failed to fetch dynamically imported module")?"load-failed":r.includes("forbidden")||r.includes("unauthorized")?"access-denied":Rc()?"unknown":"unsupported-browser"}var kc=new Set(["unsupported-browser","not-found","access-denied","xr-failed","fullscreen-failed","local-file-failed","invalid-scenario"]),Ac=new Set(["xr-failed","fullscreen-failed","local-file-failed"]);function Ic(s,e){let t=!kc.has(s);return s==="unsupported-browser"?{presentation:"blocking",recoverable:t}:Ac.has(s)?{presentation:"toast",recoverable:t}:{presentation:e?"toast":"blocking",recoverable:t}}var Fc={"unsupported-browser":{title:"This browser can\u2019t run the player",body:"The player requires WebGPU. Open it in a supported browser and device."},network:{title:"Connection lost",body:"We couldn\u2019t reach the stream. Check your connection and try again."},"not-found":{title:"Scene not found",body:"This content is no longer available."},"access-denied":{title:"Access denied",body:"You don\u2019t have permission to view this content."},"server-error":{title:"Something went wrong",body:"The server had a problem loading this scene. Please try again."},"load-failed":{title:"Couldn\u2019t load the scene",body:"We couldn\u2019t load this scene. Please try again."},"xr-failed":{title:"Couldn\u2019t enter immersive mode",body:"Immersive mode isn\u2019t available right now."},"fullscreen-failed":{title:"Couldn\u2019t enter fullscreen",body:"Fullscreen isn\u2019t available right now."},"local-file-failed":{title:"Couldn\u2019t open the file",body:"We couldn\u2019t open that file. Try a different one."},"invalid-scenario":{title:"Couldn\u2019t play this story",body:"Its scenes are linked incorrectly, so it can\u2019t be played through."},unknown:{title:"Something went wrong",body:"We couldn\u2019t load this scene. Please try again."}};function Oc(s){return Fc[s]}function Mo(s,e,t){let r=Lc(s,t);return{kind:r,cause:s,...Ic(r,e),...Oc(r)}}var Po=s=>({sceneOrder:s?.sceneOrder,scenarioName:s?.scenarioName,nextSceneOrders:s?.nextSceneOrders,modalTitle:s?.modalTitle}),Ro=(s,e)=>s.map((t,r)=>({...t,...Po(e[r])})),Co=s=>s.map((e,t)=>e.sceneOrder??t),Se=(s,e)=>e===-1?s.root:s.byOrder.get(e),Zt=(s,e)=>Se(s,e)?.next??[],Eo=(s,e)=>{let t=s?.roots?.length?s.roots:e.slice(0,1),{defaultRoot:r}=s??{};return r===void 0?t:[r,...t.filter(i=>i!==r)]},Bc=s=>{let e=(t,r)=>{if(r.has(t))return 0;r.add(t);let i=Zt(s,t).reduce((n,a)=>Math.max(n,e(a,r)),0);return r.delete(t),i+1};return e(-1,new Set)-1},$t=(s,e)=>{if(!s.length)return null;let t=s.map(o=>Po(o)),r=Co(t),i=new Map(t.map((o,l)=>[r[l],{order:r[l],scenarioName:o.scenarioName,modalTitle:o.modalTitle,next:o.nextSceneOrders??r.slice(l+1,l+2)}])),n=Eo(e,r),a={byOrder:i,order:r,root:{order:-1,modalTitle:e?.modalTitle,next:n},depth:0,isBranching:t.some(o=>o.nextSceneOrders)||n.length>1};return{...a,depth:Bc(a)}},Lo=s=>[...s.order.filter((e,t)=>s.order.indexOf(e)!==t).map(e=>`sceneOrder ${e} is used by more than one scene`),...[s.root,...s.byOrder.values()].flatMap(e=>e.next.filter(t=>!s.byOrder.has(t)).map(t=>e.order===-1?`root ${t} is not a scene of the pack`:`scene ${e.order} links to ${t}, which is not a scene of the pack`))],ps=(s,e,t)=>{let r=[[e]],i=new Set([e]);for(let n of r){let a=n[n.length-1];if(a===t)return n;for(let o of Zt(s,a))i.has(o)||(i.add(o),r.push([...n,o]))}return null},Je=(s,e,t)=>{let r=e.indexOf(t),i=r>=0?e[r+1]:void 0;return i!==void 0&&Zt(s,t).includes(i)?i:void 0},jt=(s,e)=>{let t=[],r=new Set,i=-1,n=null;for(;i!==void 0&&Se(s,i)&&!r.has(i);){r.add(i),i!==-1&&t.push(i);let a=Zt(s,i);if(a.length===0)break;if(a.length===1){i=a[0];continue}let o=Je(s,e,i);if(o===void 0){n=i;break}i=o}return{scenes:t,openFork:n}},ko=(s,e,t)=>Zt(s,e).map(r=>({order:r,label:t(r)})),Ao=(s,e)=>$t(s,e)?.isBranching?s.map(t=>({...t,autoSwitchToNext:!1})):s,Io=(s,e)=>{let t=Co(s),r=Eo(e,t);return r.length===1?t.indexOf(r[0]):null};var Fo=(s,e,t,r)=>{let i=[],n=new Set,a=-1;for(;a!==void 0&&!n.has(a);){n.add(a),a!==-1&&i.push({order:a,label:String(i.filter(c=>c.order!==void 0).length+1),isActive:a===t});let l=Se(s,a)?.next??[];if(l.length===0)break;if(l.length===1){a=l[0];continue}let h=Je(s,e,a);i.push({isFork:!0,forkFrom:a,...a===r&&{isOpen:!0},...h!==void 0&&{taken:h,branchNumber:l.indexOf(h)+1}}),a=h}let o=s.depth+i.filter(l=>l.isFork).length;for(;i.length<o;)i.push({});return i};var Oo="data:font/woff2;base64,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";var Bo=`@font-face {\r
    font-family: "Golos Text";\r
    src: url("./assets/GolosText-Regular.woff2") format("woff2");\r
    font-style: normal;\r
    font-weight: 400;\r
    font-display: swap;\r
}\r
\r
.gr-player,\r
.gr-player *,\r
.gr-player *::before,\r
.gr-player *::after {\r
    box-sizing: border-box;\r
}\r
\r
.gr-player {\r
    --gr-player-font-family:\r
        "Golos Text", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;\r
    --gr-player-bg: #0d1115;\r
    --gr-player-surface: #26282b;\r
    --gr-player-surface-strong: rgba(38, 40, 43, 0.8);\r
    --gr-player-surface-light: radial-gradient(\r
        ellipse 69% 100% at 50% 0%,\r
        #e3e3e3 0%,\r
        #d3dae3 100%\r
    );\r
    --gr-player-border: rgba(255, 255, 255, 0.06);\r
    --gr-player-text: rgba(233, 242, 255, 0.82);\r
    --gr-player-muted: rgba(233, 242, 255, 0.46);\r
    --gr-player-accent: #e9f2ff;\r
    --gr-player-accent-ink: #212833;\r
    --gr-player-radius: 5px;\r
    --gr-player-radius-small: 5px;\r
    --gr-player-radius-compact: 8px;\r
    --gr-player-radius-tiny: 2px;\r
    --gr-player-radius-superellipse: 14px;\r
    --gr-player-control-size: 48px;\r
    --gr-player-ui-font-size: 16px;\r
    --gr-player-time-display: none;\r
    --gr-player-mobile-top: calc(env(safe-area-inset-top, 0px) + 20px);\r
    --gr-player-mobile-bottom: calc(env(safe-area-inset-bottom, 0px) + 20px);\r
    --gr-player-mobile-edge: 20px;\r
    --gr-player-mobile-left: max(var(--gr-player-mobile-edge), env(safe-area-inset-left, 0px));\r
    --gr-player-mobile-right: max(var(--gr-player-mobile-edge), env(safe-area-inset-right, 0px));\r
    --gr-player-shadow: 0 4px 32px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.12);\r
    --gr-player-inner-shadow: inset 1px 1px 1px rgba(255, 255, 255, 0.07);\r
    position: relative;\r
    display: block;\r
    width: 100%;\r
    height: 100%;\r
    min-width: 0;\r
    min-height: 0;\r
    overflow: hidden;\r
    border-radius: var(--gr-player-radius);\r
    background: var(--gr-player-bg);\r
    color: var(--gr-player-text);\r
    font-family: var(--gr-player-font-family);\r
    container-type: size;\r
    isolation: isolate;\r
    touch-action: manipulation;\r
    overscroll-behavior-x: none;\r
}\r
\r
.gr-player button {\r
    font: inherit;\r
}\r
\r
.gr-player button:focus-visible,\r
.gr-player [tabindex]:focus-visible {\r
    outline: 2px solid rgba(233, 242, 255, 0.9);\r
    outline-offset: 2px;\r
}\r
\r
@supports (corner-shape: superellipse(2)) {\r
    .gr-player {\r
        --gr-player-radius: var(--gr-player-radius-superellipse);\r
        --gr-player-radius-small: var(--gr-player-radius-superellipse);\r
        --gr-player-radius-compact: var(--gr-player-radius-superellipse);\r
        --gr-player-radius-tiny: var(--gr-player-radius-superellipse);\r
    }\r
\r
    .gr-player,\r
    .gr-player__loader,\r
    .gr-player__button,\r
    .gr-player__seek-shell,\r
    .gr-player__seek,\r
    .gr-player__seek::before,\r
    .gr-player__seek-hover,\r
    .gr-player__seek-thumb,\r
    .gr-player__scene-inner,\r
    .gr-player__scene-segment,\r
    .gr-player__scene-menu,\r
    .gr-player__camera-panel,\r
    .gr-player__camera-option,\r
    .gr-player__error-screen,\r
    .gr-player__xr-active,\r
    .gr-player__prompt-panel,\r
    .gr-player__error {\r
        corner-shape: superellipse(2);\r
    }\r
}\r
\r
.gr-player__sr {\r
    position: absolute;\r
    width: 1px;\r
    height: 1px;\r
    padding: 0;\r
    margin: -1px;\r
    overflow: hidden;\r
    clip: rect(0, 0, 0, 0);\r
    white-space: nowrap;\r
    border: 0;\r
}\r
\r
.gr-player__canvas {\r
    position: absolute;\r
    inset: 0;\r
    overflow: hidden;\r
    background: #000;\r
}\r
\r
.gr-player__canvas canvas {\r
    display: block;\r
    width: 100%;\r
    height: 100%;\r
    background: #000;\r
    cursor: grab;\r
}\r
\r
.gr-player__canvas canvas:active {\r
    cursor: grabbing;\r
}\r
\r
.gr-player__file-input {\r
    display: none;\r
}\r
\r
.gr-player:fullscreen {\r
    width: 100%;\r
    height: 100%;\r
    min-height: 100%;\r
    border-radius: 0;\r
}\r
\r
.gr-player__loader {\r
    position: absolute;\r
    inset: 0;\r
    z-index: 5;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    background: rgba(13, 17, 21, 0.76);\r
    transition: opacity 0.25s ease;\r
    pointer-events: none;\r
}\r
\r
/* One spinner for every loading state (initial load, scene switch, rebuffering). */\r
.gr-player__spinner {\r
    width: 44px;\r
    height: 44px;\r
    border-radius: 999px;\r
    border: 3px solid rgba(233, 242, 255, 0.18);\r
    border-top-color: var(--gr-player-accent);\r
    animation: gr-player-spin 0.8s linear infinite;\r
}\r
\r
.gr-player__rebuffer-spinner {\r
    position: absolute;\r
    inset: 0;\r
    z-index: 5;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    pointer-events: none;\r
}\r
\r
.gr-player__error-screen,\r
.gr-player__xr-active {\r
    position: absolute;\r
    inset: 0;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    padding: 72px 20px;\r
    background: #111316;\r
}\r
\r
.gr-player__error-screen {\r
    z-index: 6;\r
    pointer-events: none;\r
}\r
\r
.gr-player__xr-active {\r
    z-index: 7;\r
    pointer-events: auto;\r
}\r
\r
.gr-player__state-message {\r
    display: flex;\r
    flex-direction: column;\r
    align-items: center;\r
    gap: 8px;\r
    max-width: min(420px, 100%);\r
    color: var(--gr-player-accent);\r
    text-align: center;\r
}\r
\r
.gr-player__state-icon {\r
    width: 64px;\r
    height: 64px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    color: rgba(233, 242, 255, 0.86);\r
}\r
\r
.gr-player__state-message h2,\r
.gr-player__state-message p {\r
    margin: 0;\r
    font-weight: 400;\r
}\r
\r
.gr-player__state-message h2 {\r
    color: var(--gr-player-accent);\r
    font-size: 24px;\r
    line-height: 1.2;\r
}\r
\r
.gr-player__xr-exit {\r
    margin-top: 16px;\r
    min-width: 160px;\r
}\r
\r
.gr-player__state-message p {\r
    max-width: 290px;\r
    color: rgba(233, 242, 255, 0.7);\r
    font-size: 14px;\r
    line-height: 1.25;\r
}\r
\r
/* The error screen itself is pointer-events: none; re-enable the reload button. */\r
.gr-player__state-action {\r
    margin-top: 12px;\r
    padding: 8px 18px;\r
    pointer-events: auto;\r
}\r
\r
.gr-player__overlay {\r
    position: absolute;\r
    inset: 0;\r
    z-index: 10;\r
    display: flex;\r
    flex-direction: column;\r
    justify-content: space-between;\r
    padding: 16px;\r
    opacity: 1;\r
    transition: opacity 0.25s ease;\r
    pointer-events: none;\r
}\r
\r
.gr-player__overlay::before {\r
    content: "";\r
    position: absolute;\r
    left: 0;\r
    right: 0;\r
    bottom: 0;\r
    z-index: -1;\r
    height: 30vh;\r
    min-height: 180px;\r
    background: linear-gradient(\r
        to bottom,\r
        rgba(0, 0, 0, 0),\r
        rgba(0, 0, 0, 0.24) 42%,\r
        rgba(0, 0, 0, 0.2)\r
    );\r
    pointer-events: none;\r
}\r
\r
.gr-player__top,\r
.gr-player__bottom {\r
    position: relative;\r
    z-index: 1;\r
    pointer-events: auto;\r
}\r
\r
.gr-player__top {\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    gap: 8px;\r
}\r
\r
.gr-player__top-left,\r
.gr-player__top-right {\r
    display: flex;\r
    align-items: center;\r
    gap: 8px;\r
    min-width: 0;\r
}\r
\r
.gr-player__xr-actions {\r
    display: flex;\r
    align-items: center;\r
    justify-content: flex-end;\r
    gap: 8px;\r
    min-width: 0;\r
}\r
\r
.gr-player__xr-actions--mobile {\r
    display: none;\r
}\r
\r
.gr-player__camera-control {\r
    position: relative;\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: flex-end;\r
    min-width: 0;\r
}\r
\r
.gr-player__button--camera[aria-expanded="true"] {\r
    color: #fff;\r
    border-color: rgba(255, 255, 255, 0.15);\r
    background: rgba(48, 52, 57, 0.96);\r
}\r
\r
.gr-player__camera-panel {\r
    position: absolute;\r
    top: calc(100% + 8px);\r
    right: 0;\r
    z-index: 40;\r
    width: min(310px, calc(100vw - 32px));\r
    padding: 6px;\r
    overflow: hidden;\r
    display: flex;\r
    flex-direction: column;\r
    gap: 4px;\r
    border: 0.5px solid var(--gr-player-border);\r
    border-radius: var(--gr-player-radius-small);\r
    background: var(--gr-player-surface-strong);\r
    box-shadow: var(--gr-player-inner-shadow), var(--gr-player-shadow);\r
    backdrop-filter: blur(12px);\r
    -webkit-backdrop-filter: blur(12px);\r
    animation: gr-player-menu-enter 0.16s cubic-bezier(0.2, 0.8, 0.2, 1) both;\r
    will-change: opacity, transform;\r
}\r
\r
.gr-player__camera-title {\r
    padding: 7px 12px 3px;\r
    color: rgba(233, 242, 255, 0.42);\r
    font-size: calc(var(--gr-player-ui-font-size) - 6px);\r
    font-weight: 600;\r
    letter-spacing: 0;\r
    text-transform: uppercase;\r
}\r
\r
.gr-player__camera-option {\r
    position: relative;\r
    width: 100%;\r
    min-height: 74px;\r
    padding: 10px 12px;\r
    border: 0.5px solid transparent;\r
    border-radius: var(--gr-player-radius-compact);\r
    background: transparent;\r
    box-shadow: none;\r
    color: var(--gr-player-muted);\r
    text-align: left;\r
    display: flex;\r
    flex-direction: column;\r
    align-items: flex-start;\r
    gap: 5px;\r
    cursor: pointer;\r
}\r
\r
.gr-player__camera-option:hover {\r
    background: rgba(233, 242, 255, 0.08);\r
    color: var(--gr-player-text);\r
}\r
\r
.gr-player__camera-option.is-active {\r
    border-color: rgba(255, 255, 255, 0.16);\r
    background: rgba(255, 255, 255, 0.07);\r
    color: #fff;\r
}\r
\r
.gr-player__camera-label {\r
    font-size: calc(var(--gr-player-ui-font-size) - 3px);\r
    line-height: 1.2;\r
}\r
\r
.gr-player__camera-hint {\r
    color: rgba(233, 242, 255, 0.38);\r
    font-size: calc(var(--gr-player-ui-font-size) - 6px);\r
    line-height: 1.45;\r
    white-space: pre-line;\r
}\r
\r
.gr-player__camera-option.is-active .gr-player__camera-hint {\r
    color: rgba(233, 242, 255, 0.58);\r
}\r
\r
.gr-player__bottom {\r
    width: 100%;\r
}\r
\r
.gr-player__controls {\r
    display: flex;\r
    align-items: stretch;\r
    gap: 8px;\r
    width: 100%;\r
}\r
\r
.gr-player__button,\r
.gr-player__scene-nav,\r
.gr-player__scene-main,\r
.gr-player__scene-item {\r
    min-height: var(--gr-player-control-size);\r
    border: 0.5px solid var(--gr-player-border);\r
    border-radius: var(--gr-player-radius-small);\r
    background: var(--gr-player-surface);\r
    box-shadow: var(--gr-player-inner-shadow);\r
    color: var(--gr-player-text);\r
    transition:\r
        background 0.15s,\r
        color 0.15s,\r
        border-color 0.15s,\r
        opacity 0.15s,\r
        box-shadow 0.15s,\r
        filter 0.15s;\r
}\r
\r
.gr-player__button {\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    gap: 7px;\r
    padding: 0 14px;\r
    font-size: var(--gr-player-ui-font-size);\r
    white-space: nowrap;\r
    cursor: pointer;\r
}\r
\r
.gr-player__button:hover,\r
.gr-player__scene-nav:hover:not(:disabled),\r
.gr-player__scene-main:hover:not(:disabled),\r
.gr-player__scene-item:hover:not(:disabled) {\r
    background: rgba(48, 52, 57, 0.96);\r
    color: #fff;\r
    border-color: rgba(255, 255, 255, 0.15);\r
}\r
\r
.gr-player__button--secondary:active,\r
.gr-player__button--icon:active {\r
    background: rgba(0, 0, 0, 0.1);\r
}\r
\r
.gr-player__button[aria-disabled="true"] {\r
    opacity: 0.42;\r
    cursor: not-allowed;\r
    pointer-events: none;\r
}\r
\r
.gr-player__seek-shell[aria-disabled="true"] {\r
    opacity: 0.42;\r
    pointer-events: none;\r
}\r
\r
.gr-player__scene[aria-disabled="true"] {\r
    opacity: 0.42;\r
    pointer-events: none;\r
}\r
\r
.gr-player__button--icon {\r
    width: var(--gr-player-control-size);\r
    min-width: var(--gr-player-control-size);\r
    padding: 0;\r
}\r
\r
.gr-player__button--primary {\r
    position: relative;\r
    overflow: hidden;\r
    background: var(--gr-player-surface-light);\r
    color: var(--gr-player-accent-ink);\r
    border-color: rgba(255, 255, 255, 0.66);\r
    box-shadow: var(--gr-player-inner-shadow), var(--gr-player-shadow);\r
}\r
\r
.gr-player__button--primary::before {\r
    content: "";\r
    position: absolute;\r
    inset: 0;\r
    border-radius: inherit;\r
    background: radial-gradient(ellipse 69% 100% at 50% 0%, #f8fbff 0%, #edf3fa 100%);\r
    opacity: 0;\r
    pointer-events: none;\r
    transition: opacity 0.15s;\r
}\r
\r
.gr-player__button--primary:hover {\r
    background: var(--gr-player-surface-light);\r
    color: #111820;\r
}\r
\r
.gr-player__button--primary:hover::before {\r
    opacity: 1;\r
}\r
\r
.gr-player__button--primary:active {\r
    filter: brightness(0.9);\r
}\r
\r
.gr-player__button--primary > * {\r
    position: relative;\r
    z-index: 1;\r
}\r
\r
.gr-player__button--play {\r
    width: 72px;\r
    min-width: 72px;\r
    border-radius: var(--gr-player-radius-compact);\r
    border-color: rgba(255, 255, 255, 0.5);\r
    box-shadow:\r
        inset 1px 1px 1px #fff,\r
        0 2px 8px rgba(30, 47, 72, 0.06);\r
}\r
\r
.gr-player__button--xr {\r
    height: var(--gr-player-control-size);\r
    min-width: 0;\r
    padding: 0 16px;\r
    gap: 8px;\r
    border-radius: var(--gr-player-radius-compact);\r
}\r
\r
.gr-player__icon {\r
    display: block;\r
    width: 24px;\r
    height: 24px;\r
    fill: currentColor;\r
    pointer-events: none;\r
}\r
\r
.gr-player__state-icon .gr-player__icon {\r
    width: 64px;\r
    height: 64px;\r
}\r
\r
.gr-player__seek-shell {\r
    flex: 1;\r
    min-width: 80px;\r
    min-height: var(--gr-player-control-size);\r
    display: flex;\r
    align-items: center;\r
    overflow: hidden;\r
    border: 0.5px solid var(--gr-player-border);\r
    border-radius: var(--gr-player-radius-small);\r
    background: rgba(0, 0, 0, 0.3);\r
    box-shadow: var(--gr-player-inner-shadow);\r
    backdrop-filter: blur(12px);\r
    -webkit-backdrop-filter: blur(12px);\r
}\r
\r
.gr-player__seek {\r
    position: relative;\r
    width: 100%;\r
    height: 100%;\r
    overflow: hidden;\r
    border-radius: inherit;\r
    cursor: pointer;\r
    touch-action: none;\r
    isolation: isolate;\r
}\r
\r
.gr-player__seek::before {\r
    content: "";\r
    position: absolute;\r
    inset: 0;\r
    border-radius: inherit;\r
    background: rgba(233, 242, 255, 0.08);\r
    pointer-events: none;\r
}\r
\r
.gr-player__seek-fill {\r
    position: absolute;\r
    inset: 0 auto 0 0;\r
    z-index: 1;\r
    width: 0;\r
    background: rgba(233, 242, 255, 0.28);\r
    pointer-events: none;\r
}\r
\r
.gr-player__seek-hover {\r
    position: absolute;\r
    top: 0;\r
    bottom: 0;\r
    left: 0;\r
    z-index: 2;\r
    width: 0;\r
    opacity: 0;\r
    background: rgba(233, 242, 255, 0.16);\r
    border-right: 1px solid rgba(233, 242, 255, 0.32);\r
    pointer-events: none;\r
    transition: opacity 0.12s ease;\r
}\r
\r
.gr-player__seek:hover .gr-player__seek-hover,\r
.gr-player__seek:focus-visible .gr-player__seek-hover {\r
    opacity: 1;\r
}\r
\r
.gr-player__seek-thumb {\r
    position: absolute;\r
    top: 0;\r
    bottom: 0;\r
    z-index: 3;\r
    width: 8px;\r
    left: 0;\r
    transform: translateX(-50%);\r
    border-radius: var(--gr-player-radius-small);\r
    background: var(--gr-player-accent);\r
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);\r
    pointer-events: none;\r
}\r
\r
.gr-player__time {\r
    display: var(--gr-player-time-display);\r
    align-items: center;\r
    min-height: var(--gr-player-control-size);\r
    color: var(--gr-player-muted);\r
    font-size: calc(var(--gr-player-ui-font-size) - 3px);\r
    font-variant-numeric: tabular-nums;\r
    white-space: nowrap;\r
}\r
\r
.gr-player__scene {\r
    position: relative;\r
    flex: 0 1 280px;\r
    min-width: 190px;\r
    height: var(--gr-player-control-size);\r
    --gr-player-scene-divider: rgba(0, 0, 0, 0.1);\r
}\r
\r
.gr-player--scenes-single .gr-player__scene {\r
    display: none;\r
}\r
\r
.gr-player__scene--stepper .gr-player__scene-main {\r
    justify-content: center;\r
    cursor: default;\r
}\r
\r
.gr-player__scene--stepper .gr-player__scene-main:hover {\r
    background: transparent;\r
}\r
\r
.gr-player__scene-inner {\r
    height: 100%;\r
    min-width: 0;\r
    display: flex;\r
    align-items: stretch;\r
    overflow: hidden;\r
    border: 0.5px solid var(--gr-player-border);\r
    border-radius: var(--gr-player-radius-small);\r
    background: var(--gr-player-surface);\r
    box-shadow: var(--gr-player-inner-shadow);\r
}\r
\r
.gr-player__scene-nav,\r
.gr-player__scene-main,\r
.gr-player__scene-item {\r
    position: relative;\r
    overflow: hidden;\r
}\r
\r
.gr-player__scene-nav::after,\r
.gr-player__scene-main::after,\r
.gr-player__scene-item::after {\r
    content: "";\r
    position: absolute;\r
    inset: 0;\r
    z-index: 1;\r
    background: rgba(0, 0, 0, 0.1);\r
    opacity: 0;\r
    pointer-events: none;\r
    transition: opacity 0.12s ease;\r
}\r
\r
.gr-player__scene-nav:active:not(:disabled)::after,\r
.gr-player__scene-main:active:not(:disabled)::after,\r
.gr-player__scene-item:active:not(:disabled)::after {\r
    opacity: 1;\r
    transition-duration: 0.06s;\r
}\r
\r
.gr-player__scene-nav,\r
.gr-player__scene-main {\r
    border: 0;\r
    border-radius: 0;\r
    box-shadow: none;\r
    background: transparent;\r
    cursor: pointer;\r
}\r
\r
.gr-player__scene-nav {\r
    width: var(--gr-player-control-size);\r
    min-width: var(--gr-player-control-size);\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
    color: var(--gr-player-accent);\r
}\r
\r
.gr-player__scene-nav:disabled {\r
    color: rgba(233, 242, 255, 0.1);\r
    cursor: not-allowed;\r
}\r
\r
.gr-player__scene-nav:disabled:hover,\r
.gr-player__scene-main:disabled:hover {\r
    background: transparent;\r
}\r
\r
.gr-player__scene-main {\r
    flex: 1;\r
    min-width: 0;\r
    padding: 0 12px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    gap: 4px;\r
    text-align: left;\r
}\r
\r
.gr-player__scene-main:disabled {\r
    cursor: default;\r
}\r
\r
.gr-player__scene-inner > .gr-player__scene-nav:not(:first-child)::before,\r
.gr-player__scene-main:not(:first-child)::before {\r
    content: "";\r
    position: absolute;\r
    left: 0;\r
    top: 0;\r
    bottom: 0;\r
    z-index: 2;\r
    width: 1px;\r
    background: var(--gr-player-scene-divider);\r
    pointer-events: none;\r
}\r
\r
.gr-player__scene-main > .gr-player__icon {\r
    flex: 0 0 24px;\r
    width: 24px;\r
    color: rgba(233, 242, 255, 0.7);\r
}\r
\r
.gr-player__scene-main-copy {\r
    min-width: 0;\r
    flex: 1;\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
}\r
\r
.gr-player__scene-copy {\r
    min-width: 0;\r
    display: flex;\r
    align-items: center;\r
    justify-content: space-between;\r
    gap: 10px;\r
}\r
\r
.gr-player__scene-label {\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
    color: var(--gr-player-text);\r
    font-size: var(--gr-player-ui-font-size);\r
    line-height: 17px;\r
}\r
\r
.gr-player__scene-count {\r
    color: var(--gr-player-muted);\r
    font-size: var(--gr-player-ui-font-size);\r
    white-space: nowrap;\r
}\r
\r
.gr-player__scene-segments {\r
    display: flex;\r
    gap: 3px;\r
    width: 100%;\r
    height: 3px;\r
}\r
\r
.gr-player__scene-segment {\r
    flex: 1;\r
    min-width: 3px;\r
    border-radius: var(--gr-player-radius-tiny);\r
    background: rgba(233, 242, 255, 0.16);\r
}\r
\r
.gr-player__scene-segment.is-active {\r
    background: rgba(233, 242, 255, 0.8);\r
}\r
\r
/* Local file surfaced as a scene: filename + file glyph in the stepper. */\r
.gr-player__scene-count--local {\r
    display: flex;\r
    align-items: center;\r
    gap: 6px;\r
    min-width: 0;\r
    color: var(--gr-player-text);\r
}\r
\r
.gr-player__scene-count--local .gr-player__icon {\r
    width: 16px;\r
    height: 16px;\r
    flex: none;\r
    fill: var(--gr-player-accent);\r
}\r
\r
.gr-player__scene-count--local .gr-player__scene-label {\r
    min-width: 0;\r
}\r
\r
/* A scene the branching route has not reached yet. */\r
.gr-player__scene-segment--blank {\r
    background: rgba(233, 242, 255, 0.07);\r
}\r
\r
.gr-player__scene-segment--local:not(.is-active) {\r
    background: rgba(233, 242, 255, 0.42);\r
}\r
\r
.gr-player__scene-menu {\r
    position: absolute;\r
    left: 0;\r
    bottom: calc(100% + 8px);\r
    z-index: 30;\r
    width: calc(100% - 4px);\r
    max-height: calc(100cqh - 120px);\r
    overflow: hidden auto;\r
    scrollbar-width: thin;\r
    scrollbar-color: rgba(233, 242, 255, 0.24) transparent;\r
    display: flex;\r
    flex-direction: column;\r
    border: 0.5px solid var(--gr-player-border);\r
    border-radius: var(--gr-player-radius-small);\r
    background: var(--gr-player-surface-strong);\r
    box-shadow: var(--gr-player-inner-shadow), var(--gr-player-shadow);\r
    backdrop-filter: blur(12px);\r
    -webkit-backdrop-filter: blur(12px);\r
    animation: gr-player-menu-enter 0.16s cubic-bezier(0.2, 0.8, 0.2, 1) both;\r
    will-change: opacity, transform;\r
}\r
\r
.gr-player__scene-item {\r
    width: 100%;\r
    height: 43px;\r
    min-height: 43px;\r
    padding: 0 12px;\r
    border: 0;\r
    border-radius: 0;\r
    background: transparent;\r
    box-shadow: none;\r
    color: var(--gr-player-muted);\r
    text-align: left;\r
    display: flex;\r
    align-items: center;\r
    gap: 12px;\r
    cursor: pointer;\r
}\r
\r
.gr-player__scene-item:hover:not(:disabled) {\r
    background: rgba(233, 242, 255, 0.1);\r
}\r
\r
.gr-player__scene-item:disabled {\r
    cursor: default;\r
}\r
\r
.gr-player__scene-item + .gr-player__scene-item::before {\r
    content: "";\r
    position: absolute;\r
    left: 0;\r
    right: 0;\r
    top: 0;\r
    z-index: 2;\r
    height: 1px;\r
    background: linear-gradient(\r
        to bottom,\r
        rgba(0, 0, 0, 0.8) 0 50%,\r
        rgba(233, 242, 255, 0.16) 50% 100%\r
    );\r
    pointer-events: none;\r
}\r
\r
.gr-player__scene-item span {\r
    min-width: 12px;\r
    color: rgba(233, 242, 255, 0.24);\r
}\r
\r
.gr-player__scene-item span .gr-player__icon {\r
    display: block;\r
    width: 15px;\r
    height: 15px;\r
    fill: var(--gr-player-accent);\r
}\r
\r
.gr-player__scene-item strong {\r
    flex: 1;\r
    min-width: 0;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
    color: rgba(233, 242, 255, 0.7);\r
    font-weight: 400;\r
}\r
\r
.gr-player__scene-item:disabled span,\r
.gr-player__scene-item:disabled strong {\r
    color: rgba(233, 242, 255, 0.3);\r
}\r
\r
/* A fork's answer, beside its question. */\r
.gr-player__scene-item small {\r
    flex: none;\r
    max-width: 45%;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
    color: rgba(233, 242, 255, 0.6);\r
    font-size: calc(var(--gr-player-ui-font-size) - 2px);\r
}\r
\r
.gr-player__scene-item.is-active span,\r
.gr-player__scene-item.is-active strong,\r
.gr-player__scene-item:hover:not(:disabled) span,\r
.gr-player__scene-item:hover:not(:disabled) strong {\r
    color: var(--gr-player-accent);\r
}\r
\r
/* --- Scene selector: tabs mode --- */\r
\r
.gr-player__scene-tabs-scroll {\r
    display: flex;\r
    width: 100%;\r
    overflow-x: auto;\r
    scrollbar-width: none;\r
}\r
\r
.gr-player__scene-tabs-scroll::-webkit-scrollbar {\r
    display: none;\r
}\r
\r
.gr-player__scene-tab {\r
    position: relative;\r
    overflow: hidden;\r
    flex: 1 0 64px;\r
    min-width: 64px;\r
    min-height: var(--gr-player-control-size);\r
    border: 0;\r
    border-radius: 0;\r
    box-shadow: none;\r
    background: transparent;\r
    color: var(--gr-player-muted);\r
    cursor: pointer;\r
    font: inherit;\r
    font-size: var(--gr-player-ui-font-size);\r
}\r
\r
.gr-player__scene-tab + .gr-player__scene-tab::before {\r
    content: "";\r
    position: absolute;\r
    left: 0;\r
    top: 0;\r
    bottom: 0;\r
    z-index: 2;\r
    width: 1px;\r
    background: var(--gr-player-scene-divider);\r
    pointer-events: none;\r
}\r
\r
.gr-player__scene-tab::after {\r
    content: "";\r
    position: absolute;\r
    inset: 0;\r
    z-index: 1;\r
    background: rgba(0, 0, 0, 0.1);\r
    opacity: 0;\r
    pointer-events: none;\r
    transition: opacity 0.12s ease;\r
}\r
\r
.gr-player__scene-tab:active::after {\r
    opacity: 1;\r
    transition-duration: 0.06s;\r
}\r
\r
.gr-player__scene-tab:hover {\r
    background: rgba(48, 52, 57, 0.96);\r
}\r
\r
.gr-player__scene-tab.is-active {\r
    color: #fff;\r
    background: rgba(255, 255, 255, 0.06);\r
}\r
\r
.gr-player__scene-tab--local {\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
}\r
\r
.gr-player__scene-tab--local .gr-player__icon {\r
    width: 16px;\r
    height: 16px;\r
}\r
\r
/* --- Scenario prompt --- */\r
\r
.gr-player__prompt {\r
    position: absolute;\r
    inset: 0;\r
    z-index: 20;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    padding: 20px;\r
    background: rgba(13, 17, 21, 0.56);\r
    backdrop-filter: blur(4px);\r
    -webkit-backdrop-filter: blur(4px);\r
    animation: gr-player-fade-in 0.2s ease both;\r
}\r
\r
.gr-player__prompt-panel {\r
    position: relative;\r
    width: min(432px, 100%);\r
    max-height: 100%;\r
    overflow: hidden auto;\r
    display: flex;\r
    flex-direction: column;\r
    gap: 8px;\r
    border: 0.5px solid var(--gr-player-border);\r
    border-radius: var(--gr-player-radius-compact);\r
    background: var(--gr-player-surface);\r
    box-shadow: var(--gr-player-inner-shadow);\r
    animation: gr-player-menu-enter 0.16s cubic-bezier(0.2, 0.8, 0.2, 1) both;\r
}\r
\r
.gr-player__prompt-head {\r
    display: flex;\r
    align-items: flex-start;\r
    justify-content: space-between;\r
    gap: 16px;\r
    padding: 12px 16px;\r
}\r
\r
.gr-player__prompt-title {\r
    min-width: 0;\r
    margin: 0;\r
    color: var(--gr-player-accent);\r
    font-size: 18px;\r
    font-weight: 400;\r
    line-height: normal;\r
    overflow-wrap: anywhere;\r
}\r
\r
/* The icon is 24px; the padding grows the hit area without moving it. */\r
.gr-player__prompt-close {\r
    flex: none;\r
    margin: -10px;\r
    padding: 10px;\r
    border: 0;\r
    border-radius: var(--gr-player-radius-compact);\r
    background: transparent;\r
    cursor: pointer;\r
}\r
\r
.gr-player__prompt-close:hover {\r
    background: rgba(233, 242, 255, 0.08);\r
}\r
\r
.gr-player__prompt-close img {\r
    display: block;\r
}\r
\r
.gr-player__prompt-options {\r
    position: relative;\r
    display: flex;\r
    flex-direction: column;\r
}\r
\r
/* Rides the top edge of the first option. */\r
.gr-player__prompt-countdown {\r
    position: absolute;\r
    top: -0.5px;\r
    left: -0.5px;\r
    z-index: 1;\r
    height: 4px;\r
    background: rgba(233, 242, 255, 0.3);\r
    transition: width 1s linear;\r
}\r
\r
.gr-player__prompt-option {\r
    width: 100%;\r
    min-height: 52px;\r
    padding: 12px 16px;\r
    border: 0;\r
    border-top: 0.5px solid rgba(233, 242, 255, 0.1);\r
    border-bottom: 0.5px solid transparent;\r
    background: transparent;\r
    color: rgba(233, 242, 255, 0.8);\r
    font-size: 16px;\r
    line-height: normal;\r
    text-align: center;\r
    overflow-wrap: anywhere;\r
    cursor: pointer;\r
    transition:\r
        background 0.15s,\r
        border-color 0.15s;\r
}\r
\r
.gr-player__prompt-option:hover,\r
.gr-player__prompt-option.is-selected {\r
    border-color: rgba(233, 242, 255, 0.1);\r
    background: rgba(233, 242, 255, 0.1);\r
}\r
\r
.gr-player__error {\r
    display: flex;\r
    align-items: center;\r
    gap: 10px;\r
    width: fit-content;\r
    max-width: min(420px, 100%);\r
    margin: 0 auto 10px;\r
    padding: 10px 14px;\r
    border-radius: var(--gr-player-radius-small);\r
    border: 1px solid rgba(248, 113, 113, 0.25);\r
    background: rgba(127, 29, 29, 0.82);\r
    color: rgba(255, 255, 255, 0.9);\r
    font-size: 12px;\r
    line-height: 1.5;\r
    box-shadow: var(--gr-player-shadow);\r
}\r
\r
.gr-player__error-text {\r
    color: rgba(255, 255, 255, 0.72);\r
}\r
\r
@container (width < 720px) {\r
    .gr-player__overlay {\r
        --gr-player-control-size: 44px;\r
        --gr-player-ui-font-size: 14px;\r
        padding: 12px;\r
    }\r
\r
    .gr-player__controls {\r
        gap: 7px;\r
    }\r
\r
    .gr-player__error {\r
        width: 100%;\r
        max-width: 100%;\r
        box-sizing: border-box;\r
    }\r
\r
    .gr-player__button--play {\r
        width: 56px;\r
        min-width: 56px;\r
    }\r
\r
    .gr-player__scene {\r
        flex-basis: 210px;\r
        min-width: 150px;\r
    }\r
}\r
\r
@container (height < 480px) {\r
    .gr-player__overlay {\r
        --gr-player-control-size: 44px;\r
        --gr-player-ui-font-size: 14px;\r
        padding: 12px;\r
    }\r
\r
    .gr-player__controls {\r
        gap: 7px;\r
    }\r
\r
    .gr-player__button--play {\r
        width: 56px;\r
        min-width: 56px;\r
    }\r
\r
    .gr-player__scene {\r
        flex-basis: 210px;\r
        min-width: 150px;\r
    }\r
}\r
\r
@container (width <= 640px) and (aspect-ratio < 1 / 1) {\r
    .gr-player__overlay {\r
        --gr-player-control-size: 48px;\r
        --gr-player-ui-font-size: 14px;\r
        --gr-player-mobile-controls-height: calc(var(--gr-player-control-size) * 2 + 8px);\r
        display: flex;\r
        flex-direction: column;\r
        justify-content: space-between;\r
        padding: var(--gr-player-mobile-top) var(--gr-player-mobile-right)\r
            var(--gr-player-mobile-bottom) var(--gr-player-mobile-left);\r
    }\r
\r
    .gr-player__overlay::before {\r
        height: 42vh;\r
        min-height: 260px;\r
        background: linear-gradient(\r
            to bottom,\r
            rgba(0, 0, 0, 0),\r
            rgba(0, 0, 0, 0.34) 40%,\r
            rgba(0, 0, 0, 0.56)\r
        );\r
    }\r
\r
    .gr-player__top {\r
        position: static;\r
        inset: auto;\r
        flex: 0 0 auto;\r
        width: 100%;\r
        height: auto;\r
        padding: 0;\r
        display: flex;\r
        flex-direction: row;\r
        align-items: flex-start;\r
        justify-content: space-between;\r
        gap: 8px;\r
        pointer-events: none;\r
    }\r
\r
    .gr-player__top-left {\r
        flex: 0 0 auto;\r
        width: auto;\r
        justify-content: flex-start;\r
    }\r
\r
    .gr-player__top-right {\r
        flex: 1 1 auto;\r
        width: auto;\r
        min-width: 0;\r
        flex-direction: row;\r
        align-items: stretch;\r
        justify-content: flex-end;\r
        gap: 8px;\r
    }\r
\r
    .gr-player__top button {\r
        pointer-events: auto;\r
    }\r
\r
    .gr-player__camera-control {\r
        flex: 0 0 auto;\r
        width: auto;\r
    }\r
\r
    .gr-player__button--camera {\r
        margin-left: auto;\r
    }\r
\r
    .gr-player__camera-panel {\r
        width: min(\r
            320px,\r
            calc(100vw - var(--gr-player-mobile-left) - var(--gr-player-mobile-right))\r
        );\r
    }\r
\r
    .gr-player__xr-actions--desktop {\r
        display: none;\r
    }\r
\r
    .gr-player__xr-actions--mobile {\r
        display: flex;\r
    }\r
\r
    .gr-player__xr-actions {\r
        flex: 1 1 auto;\r
        width: 100%;\r
        min-width: 0;\r
        max-width: 100%;\r
    }\r
\r
    .gr-player__button--xr {\r
        flex: 1;\r
        width: 100%;\r
        padding: 0 14px;\r
    }\r
\r
    /* No stepper: line 2 collapses, so reset sits above the single control row. */\r
    .gr-player--scenes-single .gr-player__overlay {\r
        --gr-player-mobile-controls-height: var(--gr-player-control-size);\r
    }\r
\r
    .gr-player__reset {\r
        position: absolute;\r
        right: var(--gr-player-mobile-right);\r
        bottom: calc(\r
            var(--gr-player-mobile-bottom) +\r
            var(--gr-player-mobile-controls-height) +\r
            8px\r
        );\r
        margin: 0;\r
        pointer-events: auto;\r
    }\r
\r
    .gr-player__fullscreen {\r
        display: none;\r
    }\r
\r
    .gr-player__bottom {\r
        position: relative;\r
        inset: auto;\r
        flex: 0 0 auto;\r
        width: 100%;\r
        min-width: 0;\r
        padding: 0;\r
        margin-top: auto;\r
    }\r
\r
    .gr-player__controls {\r
        flex-wrap: wrap;\r
        gap: 8px;\r
        width: 100%;\r
        min-width: 0;\r
        max-width: 100%;\r
        overflow: visible;\r
    }\r
\r
    .gr-player__controls .gr-player__button {\r
        height: 48px;\r
        min-height: 48px;\r
    }\r
\r
    /* Line 2: stepper on its own full-width row. */\r
    .gr-player__scene {\r
        order: 1;\r
        flex: 1 1 100%;\r
        width: 100%;\r
        min-width: 0;\r
        max-width: none;\r
        overflow: visible;\r
    }\r
\r
    /* Line 3: play, seek bar, mute share one row. */\r
    .gr-player__button--play {\r
        order: 2;\r
        flex: 0 0 72px;\r
    }\r
\r
    .gr-player__seek-shell {\r
        order: 3;\r
        flex: 1 1 0;\r
        width: auto;\r
        min-width: 0;\r
        max-width: none;\r
    }\r
\r
    .gr-player__mute {\r
        order: 4;\r
        flex: 0 0 var(--gr-player-control-size);\r
    }\r
\r
    .gr-player__seek-thumb {\r
        width: 4px;\r
    }\r
\r
    .gr-player__time {\r
        display: none;\r
    }\r
\r
    .gr-player__scene-inner,\r
    .gr-player__scene-main,\r
    .gr-player__scene-main-copy {\r
        min-width: 0;\r
        max-width: 100%;\r
    }\r
\r
    .gr-player__scene-nav {\r
        width: 40px;\r
        min-width: 40px;\r
    }\r
\r
    .gr-player__scene-menu {\r
        width: calc(100% - 4px);\r
    }\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
    .gr-player__spinner,\r
    .gr-player__scene-menu,\r
    .gr-player__prompt,\r
    .gr-player__prompt-panel {\r
        animation: none;\r
    }\r
\r
    .gr-player__prompt-countdown,\r
    .gr-player__prompt-option {\r
        transition: none;\r
    }\r
\r
    .gr-player__button,\r
    .gr-player__scene-nav,\r
    .gr-player__scene-main,\r
    .gr-player__scene-item,\r
    .gr-player__scene-tab,\r
    .gr-player__scene-nav::after,\r
    .gr-player__scene-main::after,\r
    .gr-player__scene-item::after,\r
    .gr-player__scene-tab::after {\r
        transition: none;\r
    }\r
}\r
\r
@keyframes gr-player-spin {\r
    to {\r
        transform: rotate(360deg);\r
    }\r
}\r
\r
@keyframes gr-player-fade-in {\r
    from {\r
        opacity: 0;\r
    }\r
}\r
\r
@keyframes gr-player-menu-enter {\r
    from {\r
        opacity: 0;\r
        transform: translateY(4px);\r
    }\r
    to {\r
        opacity: 1;\r
        transform: translateY(0);\r
    }\r
}\r
`;var Go="gracia-player-default-styles",ds=Bo.replace('url("./assets/GolosText-Regular.woff2")',`url("${Oo}")`);function Jr(s){if(typeof document>"u")return;let e=typeof ShadowRoot<"u"&&s instanceof ShadowRoot?s:s?.head??document.head;if(e.querySelector(`#${Go}`))return;let t=document.createElement("style");t.id=Go,t.textContent=ds,e.appendChild(t)}function ie(...s){let e=[];for(let t of s)if(t){if(typeof t=="string"){e.push(t);continue}for(let[r,i]of Object.entries(t))i&&e.push(r)}return e.join(" ")}function ce(s){return s.label??s.displayName??s.id??s.url??"Untitled"}function fs(s){return!Number.isFinite(s)||s<0?"0:00":`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`}function Be(s){return s instanceof Error?s:new Error(String(s))}function Do(s,e){return{event:(t,r)=>s?.event?.(t,r),error:(t,r)=>{s?.error?.(t,r),e?.(t,r)}}}import{jsx as No,jsxs as Nc}from"react/jsx-runtime";var xe=({variant:s="primary",className:e,type:t="button",children:r,...i})=>{let n=Array.isArray(s)?s:[s];return No("button",{type:t,className:ie("gr-player__button",...n.map(a=>`gr-player__button--${a}`),e),...i,children:r})},qe=({variant:s="icon",srLabel:e,children:t,...r})=>Nc(xe,{variant:s,...r,children:[t,e&&No("span",{className:"gr-player__sr",children:e})]});import{jsx as Qt,jsxs as zc}from"react/jsx-runtime";var mt=({icon:s,title:e,body:t,detail:r,action:i,className:n,role:a,ariaLive:o})=>Qt("div",{className:n,role:a,"aria-live":o,children:zc("div",{className:"gr-player__state-message",children:[Qt("div",{className:"gr-player__state-icon",children:s}),Qt("h2",{children:e}),Qt("p",{children:t}),r&&Qt("span",{className:"gr-player__sr",children:r}),i]})});import{jsx as zo}from"react/jsx-runtime";var ms=({message:s})=>zo("div",{className:"gr-player__error",role:"alert",children:zo("span",{className:"gr-player__error-text",children:s})});import{jsx as Xo}from"react/jsx-runtime";var gs=({title:s,body:e,detail:t,action:r})=>Xo(mt,{icon:Xo(fo,{}),title:s,body:e,detail:t,action:r,className:"gr-player__error-screen",role:"alert",ariaLive:"assertive"});import{jsx as Uo}from"react/jsx-runtime";var ys=()=>Uo("div",{className:"gr-player__loader",role:"status","aria-live":"polite",children:Uo("div",{className:"gr-player__spinner"})});import{forwardRef as Uu,useImperativeHandle as Vu,useRef as ja}from"react";import{createContext as Xc,useContext as Uc}from"react";var Vo=Xc(null),xs=Vo.Provider,V=()=>{let s=Uc(Vo);if(!s)throw new Error("usePlayerContext must be used within a PlayerProvider");return s};var Vc=`
struct Draw { mvp: mat4x4f, color: vec4f }
@group(0) @binding(0) var<uniform> draw: Draw;
struct Out { @builtin(position) pos: vec4f, @location(0) color: vec4f }

@vertex fn vs_plain(@location(0) p: vec3f) -> Out {
    return Out(draw.mvp * vec4f(p, 1.0), draw.color);
}
@vertex fn vs_color(@location(0) p: vec3f, @location(1) c: vec4f) -> Out {
    return Out(draw.mvp * vec4f(p, 1.0), draw.color * c);
}
@fragment fn fs(in: Out) -> @location(0) vec4f { return in.color; }`,Wc={color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}},Kt=256,Wo=20,Hc=s=>s.isMesh?"triangle-list":s.isLineSegments?"line-list":s.isLine?"line-strip":null,gt=class{#e;#r;#t;#i;#s=new Map;#n=new WeakMap;#o=null;#c=null;#a=0;#l;#u;constructor(e,t,r){this.#e=t,this.#r=r,this.#l=new e.Matrix4,this.#u=new e.Matrix4,this.#t=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{hasDynamicOffset:!0,minBindingSize:Wo*4}}]}),this.#i=t.createShaderModule({code:Vc})}render(e,t){let r=this.#h(t);if(!r.length)return;this.#m(r.length*e.length);let i=new Float32Array(Kt/4*r.length*e.length),n=this.#e.createCommandEncoder({label:"XROverlay"});e.forEach(({view:a,projection:o,sub:l},h)=>{this.#l.fromArray(o),this.#l.multiply(this.#u.fromArray(a.transform.inverse.matrix));let c=n.beginRenderPass({colorAttachments:[{view:l.colorTexture.createView(l.getViewDescriptor()),loadOp:"load",storeOp:"store"}]}),u=l.viewport;c.setViewport(u.x,u.y,u.width,u.height,0,1),r.forEach((p,f)=>{let m=h*r.length+f;i.set(this.#u.multiplyMatrices(this.#l,p.object.matrixWorld).elements,m*(Kt/4)),i.set(p.color,m*(Kt/4)+16),c.setPipeline(p.pipeline),c.setBindGroup(0,this.#c,[m*Kt]),c.setVertexBuffer(0,p.geo.position),p.geo.color&&c.setVertexBuffer(1,p.geo.color),p.geo.index?(c.setIndexBuffer(p.geo.index,p.geo.indexFormat),c.drawIndexed(p.geo.count)):c.draw(p.geo.count)}),c.end()}),this.#e.queue.writeBuffer(this.#o,0,i),this.#e.queue.submit([n.finish()])}dispose(){this.#o?.destroy(),this.#o=this.#c=null,this.#s.clear()}#h(e){e.updateMatrixWorld();let t=[];return e.traverseVisible(r=>{let i=r.material,n=Hc(r);if(!n||!i||Array.isArray(i)||i.visible===!1)return;let a=this.#d(r.geometry,!!i.vertexColors);if(!a)return;let o=i.color??{r:1,g:1,b:1};t.push({object:r,geo:a,pipeline:this.#f(n,a),transparent:!!i.transparent,order:r.renderOrder??0,color:[o.r,o.g,o.b,i.transparent?i.opacity:1]})}),t.sort((r,i)=>Number(r.transparent)-Number(i.transparent)||r.order-i.order)}#d(e,t){let r=e?.attributes?.position;if(!r||r.isInterleavedBufferAttribute)return null;let i=t?e.attributes.color:null,n=this.#n.get(e),a=`${r.version}/${i?.version??-1}/${e.index?.version??-1}`;return n&&n.version===a||(n?.destroy(),n={version:a,position:this.#p(r.array,GPUBufferUsage.VERTEX),color:i?this.#p(i.array,GPUBufferUsage.VERTEX):null,colorFormat:i?i.itemSize===4?"float32x4":"float32x3":null,index:e.index?this.#p(e.index.array,GPUBufferUsage.INDEX):null,indexFormat:e.index?.array instanceof Uint32Array?"uint32":"uint16",count:Math.min(e.index?e.index.count:r.count,e.drawRange?.count??1/0),destroy(){this.position.destroy(),this.color?.destroy(),this.index?.destroy()}},this.#n.set(e,n)),n}#p(e,t){let r=Math.ceil(e.byteLength/4)*4,i=this.#e.createBuffer({size:r,usage:t,mappedAtCreation:!0});return new Uint8Array(i.getMappedRange()).set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),i.unmap(),i}#f(e,t){let r=e==="line-strip"&&t.index?t.indexFormat:void 0,i=`${e}/${t.colorFormat}/${r}`,n=this.#s.get(i);if(n)return n;let a=[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]}];return t.colorFormat&&a.push({arrayStride:t.colorFormat==="float32x4"?16:12,attributes:[{shaderLocation:1,offset:0,format:t.colorFormat}]}),n=this.#e.createRenderPipeline({layout:this.#e.createPipelineLayout({bindGroupLayouts:[this.#t]}),vertex:{module:this.#i,entryPoint:t.colorFormat?"vs_color":"vs_plain",buffers:a},fragment:{module:this.#i,entryPoint:"fs",targets:[{format:this.#r,blend:Wc}]},primitive:{topology:e,cullMode:"none",stripIndexFormat:r}}),this.#s.set(i,n),n}#m(e){e<=this.#a||(this.#a=Math.max(e,this.#a*2,32),this.#o?.destroy(),this.#o=this.#e.createBuffer({size:this.#a*Kt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.#c=this.#e.createBindGroup({layout:this.#t,entries:[{binding:0,resource:{buffer:this.#o,size:Wo*4}}]}))}};var Yc=.01,bs=.002,Ho=.25,qc=.005,Zc=.3,$c=.4,jc=.7,Qc=.3,Kc=.8,vs=2,Jc="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;background:none!important",eh=`
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`,th=`
uniform float uOpacity;
void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, uOpacity); }`,qo=`
varying vec3 vWorld;
vec4 project() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    return projectionMatrix * viewMatrix * world;
}`,Yo=`${qo}
attribute vec3 grid;
varying vec3 vGrid;
void main() {
    vGrid = grid;
    gl_Position = project();
}`,rh=`${qo}
void main() { gl_Position = project(); }`,Zo=`
uniform float uReachInv;
uniform sampler2D uSplats;
uniform vec2 uScreen;
uniform float uMask;
varying vec3 vWorld;
float shown() {
    float near = 1.0 - smoothstep(0.5, 1.0, distance(vWorld, cameraPosition) * uReachInv);
    return near * (1.0 - uMask * texture2D(uSplats, gl_FragCoord.xy / uScreen).a);
}`,ih=`${Zo}
uniform vec3 uColor;
uniform float uOpacity;
void main() { gl_FragColor = vec4(uColor, uOpacity * shown()); }`,$o=`${Zo}
uniform vec3 uColor;
uniform float uOpacity;
varying vec3 vGrid;
vec4 muted(float alpha) {
    float grey = dot(uColor, vec3(0.2126, 0.7152, 0.0722));
    return vec4(mix(uColor, vec3(grey), ${Qc.toFixed(3)}), uOpacity * alpha * ${Kc.toFixed(3)} * shown());
}`,sh=`${$o}
void main() {
    vec2 cells = vec2(vGrid.x / max(vGrid.z, 1e-5), vGrid.y) / ${Ho.toFixed(3)};
    vec2 cellsPerPixel = fwidth(cells);
    vec2 toLine = abs(fract(cells + 0.5) - 0.5);
    float halfLine = ${(.5*qc/Ho).toFixed(4)};
    vec2 onLine = 1.0 - smoothstep(vec2(halfLine), halfLine + cellsPerPixel, toLine);
    float moire = 1.0 - smoothstep(0.2, 0.5, max(cellsPerPixel.x, cellsPerPixel.y));
    float lines = max(onLine.x, onLine.y) * moire * ${jc.toFixed(3)};
    gl_FragColor = muted(max(lines, ${Zc.toFixed(3)}));
}`,nh=`${$o}
void main() {
    gl_FragColor = muted(${$c.toFixed(3)});
}`,yt=class{#e;#r;#t;#i;#s;#n;#o;#c;#a=null;#l=null;#u;#h;#d;#p;#f=[0,0];#m=1;#g=null;#y;#T;#w;#_=null;#P=!1;constructor(e){this.#e=e,this.#t=new e.PerspectiveCamera,this.#t.matrixAutoUpdate=!1,this.#u=new e.WebGLRenderTarget(1,1),this.#d=new e.Texture,this.#d.generateMipmaps=!1,this.#d.minFilter=this.#d.magFilter=e.LinearFilter,this.#p=new e.DataTexture(new Uint8Array(4),1,1),this.#p.needsUpdate=!0,this.#h={uReachInv:{value:0},uSplats:{value:this.#p},uScreen:{value:new e.Vector2(1,1)},uMask:{value:1}};let t=(l,h,c,u=e.DoubleSide)=>new e.ShaderMaterial({uniforms:l,vertexShader:h,fragmentShader:c,transparent:!0,depthTest:!1,depthWrite:!1,side:u}),r=(l,h,c)=>{let u=new e.Mesh(l,h);return u.frustumCulled=!1,u.visible=!1,u.renderOrder=c,u},i={value:new e.Color},n=l=>{let h={uOpacity:{value:0},uColor:i,...this.#h},c=r(new e.BufferGeometry,[t(h,Yo,sh),t(h,Yo,nh)],l);return c.matrixAutoUpdate=!1,c},a=new e.BufferGeometry;a.setAttribute("position",new e.BufferAttribute(new Float32Array(0),3)),this.#i=r(new e.PlaneGeometry(2,2),t({uOpacity:{value:0}},eh,th,e.FrontSide),10),this.#n=n(11),this.#s=r(a,t({uColor:{value:new e.Color},uOpacity:{value:0},...this.#h},rh,ih),12),this.#c=n(0),this.#r=new e.Scene().add(this.#i,this.#n,this.#s),this.#o=new e.Scene().add(this.#c);let o=l=>new e.MeshBasicMaterial({color:0,transparent:!0,depthTest:!1,depthWrite:!1,side:l});this.#T=r(new e.BoxGeometry(vs,vs,vs),o(e.BackSide),10),this.#w=r(a,o(e.DoubleSide),12),this.#y=new e.Scene().add(this.#T,this.#w)}init(e,t=null){if(t){this.#_=new gt(this.#e,t.device,t.format);return}this.#l?.getContext()!==e&&(this.#M(),this.#l=new this.#e.WebGLRenderer({context:e,canvas:e.canvas}),this.#l.autoClear=!1,this.#l.outputColorSpace=this.#e.LinearSRGBColorSpace,this.#l.setClearColor(0,0))}sync(e){this.#R(this.#i,e.darkness),this.#m=1-e.outside,this.#h.uReachInv.value=this.#m/e.reach;let t=e.outline;this.#R(this.#s,t[3]),this.#s.visible&&(this.#C(this.#s,t),this.#A(e.ribbon(Yc))),this.#S(e),this.#E(this.#T,this.#i),this.#E(this.#w,this.#s),this.#P=this.#i.visible||this.#s.visible||this.#n.visible||this.#c.visible,this.#P||this.#g?.remove()}renderUnderlay(e,t,r,i,n,a,o){this.#c.visible&&this.#x(this.#o,e,t,r,i,n,a,o)}renderEye(e,t,r,i,n,a,o){this.#P&&this.#x(this.#r,e,t,r,i,n,a,o)}renderViews(e){!this.#_||!this.#P||(this.#T.position.copy(e[0].view.transform.position),this.#_.render(e,this.#y))}renderOver(e,t,r){if(!this.#P)return;let i=this.#g??=ah(),n=i.getContext("webgl2");if(!n)return;i.previousSibling!==e&&e.after(i),this.init(n);let{width:a,height:o}=e;(i.width!==a||i.height!==o)&&this.#l.setSize(a,o,!1),this.#h.uScreen.value.set(a,o);let l=this.#m>bs?r?.():null,h=l?this.#v(l):null;this.#h.uMask.value=this.#m,this.#l.clear(),this.#b(this.#o,t.projectionMatrix,t.matrixWorld,h),this.#b(this.#r,t.projectionMatrix,t.matrixWorld,h)}dispose(){this.#M(),this.#_?.dispose(),this.#_=null,this.#g?.remove(),this.#P=!1}#x(e,t,r,i,n,a,o,l){let h=this.#l;h&&(h.resetState(),h.setRenderTargetFramebuffer(this.#u,r),h.setRenderTarget(this.#u),h.setViewport(n,a,o,l),this.#b(e,i.projectionMatrix,i.transform.matrix),h.resetState(),t.bindFramebuffer(t.FRAMEBUFFER,r))}#b(e,t,r,i=null){this.#h.uSplats.value=i??this.#p;let n=this.#t;n.projectionMatrix.fromArray(t),n.projectionMatrixInverse.copy(n.projectionMatrix).invert(),n.matrixWorld.fromArray(r),this.#l.render(e,n)}#M(){for(let e of[this.#i,this.#s,this.#n,this.#c]){e.geometry.dispose();for(let t of[e.material].flat())t.dispose()}this.#d.dispose(),this.#p.dispose(),this.#l?.dispose(),this.#l=null}#v(e){let[t,r]=this.#f;return(e.width!==t||e.height!==r)&&(this.#d.dispose(),this.#f=[e.width,e.height]),this.#d.image=e,this.#d.needsUpdate=!0,this.#d}#S(e){let t=e.surface,r=t[3]>bs?e.mesh:null,i=r?t[3]:0;if(this.#R(this.#n,i*e.aboveSplats),this.#R(this.#c,i*(1-e.aboveSplats)),!!r){if(this.#C(this.#n,t),r!==this.#a){this.#a=r;let n=oh(this.#e,r);for(let a of[this.#n,this.#c])a.geometry.dispose(),a.geometry=n}this.#n.matrix.fromArray(e.meshMatrix),this.#c.matrix.fromArray(e.meshMatrix)}}#R(e,t){e.visible=t>bs,ws(e).uOpacity.value=t}#E(e,t){let{uOpacity:r,uColor:i}=ws(t);e.visible=t.visible,e.material.opacity=r.value,i&&e.material.color.copy(i.value)}#C(e,[t,r,i]){ws(e).uColor.value.setRGB(t,r,i,this.#e.LinearSRGBColorSpace)}#A(e){let t=this.#s.geometry,r=t.getAttribute("position");r.array.length<e.length?(t.dispose(),t.setAttribute("position",new this.#e.BufferAttribute(e.slice(),3))):(r.array.set(e),r.needsUpdate=!0),t.setDrawRange(0,e.length/3)}};function ws(s){return[s.material].flat()[0].uniforms}function oh(s,e){let t=new s.BufferGeometry;return t.setAttribute("position",new s.BufferAttribute(e.positions,3)),t.setAttribute("grid",new s.BufferAttribute(e.grid,3)),t.setIndex(new s.BufferAttribute(e.indices,1)),t.addGroup(0,e.capStart,0),t.addGroup(e.capStart,e.indices.length-e.capStart,1),t}function ah(){let s=document.createElement("canvas");return s.style.cssText=Jc,s.getContext("webgl2",{depth:!1}),s}import{signal as Ge}from"@preact/signals-core";import{Container as se,Fullscreen as mh,Svg as tt,Text as ni}from"@react-three/uikit";import{signal as et}from"@preact/signals-core";import{forwardHtmlEvents as lh}from"@pmndrs/pointer-events";import{createRoot as ch}from"@react-three/fiber";var ei=class{#e;#r;#t;#i;#s;#n;#o=null;#c=null;#a;#l;#u=null;#h=null;#d=null;#p=!1;#f=!1;#m=!1;#g=!1;#y=!1;#T;#w;#_;#P;#x;#b;constructor(e,{pixelWidth:t,pixelHeight:r,worldWidth:i,worldHeight:n,cursorFactory:a,react:o=!1}){this.#s=e,this.#n=a,this.#p=o,this.#e=t*2,this.#r=r*2,this.#t=document.createElement("canvas"),this.#t.width=this.#e,this.#t.height=this.#r,this.#i=new e.WebGLRenderer({canvas:this.#t,alpha:!0,antialias:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.#i.setClearColor(0,0),this.#i.setSize(this.#e,this.#r,!1),this.#a=new e.Scene,this.#l=new e.OrthographicCamera(0,t,r,0,.1,10),this.#l.position.z=5,this.#T=new e.Raycaster,this.#w=new e.Vector3,this.#_=new e.Vector3,this.#P=new e.Quaternion,this.#x=new e.Mesh(new e.PlaneGeometry(i,n),new e.MeshBasicMaterial({visible:!1,side:e.DoubleSide}));let l=new e.SphereGeometry(.008,8,8),h=()=>new e.MeshBasicMaterial({color:65280,depthTest:!1});this.#b=[0,1].map(()=>{let c=new e.Mesh(l,h());return c.renderOrder=1001,c.visible=!1,c})}get canvas(){return this.#t}get scene(){return this.#a}get pixelWidth(){return this.#e/2}get pixelHeight(){return this.#r/2}get internalWidth(){return this.#e}get internalHeight(){return this.#r}get pointer(){return this.#o}get cursor(){return this.#c?.mesh??null}get ptrPressed(){return this.#m}get reactPending(){return this.#p}get hitMesh(){return this.#x}get hitSpheres(){return this.#b}set linear(e){this.#f=e,this.#i.outputColorSpace=e?this.#s.LinearSRGBColorSpace:this.#s.SRGBColorSpace}async mountReact(e){this.#u=ch(this.#t),await this.#u.configure({frameloop:"never",orthographic:!0,size:{width:this.#e/2,height:this.#r/2},dpr:2,gl:this.#i,linear:this.#f,events:()=>({enabled:!1,priority:0,handlers:{}})}),this.#h=this.#u.render(e),this.#a=this.#h.getState().scene,this.#d=lh(this.#t,()=>this.#h.getState().camera,this.#a,{batchEvents:!1}),this.#p=!1}patchCanvasForXR(){let e=this.pixelWidth,t=this.pixelHeight;this.#t.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,right:e,bottom:t,width:e,height:t,toJSON(){}});let r=new Set;this.#t.setPointerCapture=i=>r.add(i),this.#t.releasePointerCapture=i=>r.delete(i),this.#t.hasPointerCapture=i=>r.has(i)}setPointer(e,t,r,i=!1){if(!this.#o){if(!this.#a)return;this.#o={x:e,y:t,pressed:r};let h=this.#n(this.#s);h.position.z=.06,this.#a.add(h),this.#c={mesh:h,sx:e,sy:this.pixelHeight-t}}let n=this.#o;n.x=e,n.y=t,n.pressed=r;let a=this.#c,o=this.pixelHeight-t,l=a.mesh.visible?.6:1;a.sx+=(e-a.sx)*l,a.sy+=(o-a.sy)*l,a.mesh.visible=!0,this.#h?a.mesh.position.set(a.sx-this.pixelWidth/2,a.sy-this.pixelHeight/2,.06):a.mesh.position.set(a.sx,a.sy,.06),a.mesh.material.opacity=r?1:.7,i&&this.#M(e,t,r)}clearPointer(e=!1){e&&this.#o&&(this.#g?this.#y=!0:this.#v()),this.#o=null,this.#c&&(this.#c.mesh.visible=!1)}renderScene(){this.#p||(this.#d?.update(),this.#h?this.#h.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#a,this.#l))}clampAlpha(e){let t=this.#i.getContext();t.colorMask(!1,!1,!1,!0),t.clearColor(0,0,0,e),t.clear(t.COLOR_BUFFER_BIT),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0)}initFlat(){let e=!1,t=r=>{let i=this.#t.getBoundingClientRect();return{x:(r.clientX-i.left)/i.width*this.pixelWidth,y:(r.clientY-i.top)/i.height*this.pixelHeight}};this.#t.addEventListener("pointerdown",r=>{e=!0,this.#t.setPointerCapture(r.pointerId);let i=t(r);this.setPointer(i.x,i.y,!0)}),this.#t.addEventListener("pointermove",r=>{let i=t(r);this.setPointer(i.x,i.y,e)}),this.#t.addEventListener("pointerup",r=>{e=!1;let i=t(r);this.setPointer(i.x,i.y,!1)}),this.#t.addEventListener("pointerleave",()=>{e=!1,this.clearPointer()})}renderFlat(){this.#p||(this.#d?.update(),this.#h?this.#h.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#a,this.#l))}castRay(e,t){let r=e.rayTransform.position,i=e.rayTransform.orientation;return this.#w.set(r.x,r.y,r.z),this.#_.set(0,0,-1).applyQuaternion(this.#P.set(i.x,i.y,i.z,i.w)),this.rayHitQuad(this.#w,this.#_,t)}rayHitQuad(e,t,r=0){let i=this.pixelWidth,n=this.pixelHeight,a=this.#b[r];this.#T.ray.origin.copy(e),this.#T.ray.direction.copy(t);let o=this.#T.intersectObject(this.#x);if(o.length===0)return a.visible=!1,null;let l=o[0].point,h=o[0].uv;if(!h)return a.visible=!1,null;let c=h.x*i,u=(1-h.y)*n;return c<0||c>i||u<0||u>n?(a.visible=!1,null):(a.position.copy(l),a.visible=!0,a.updateMatrixWorld(!0),{x:c,y:u})}gazeHitsQuad(e,t){if(!e?.transform)return!0;let r=e.transform.position,i=e.transform.orientation,n=-2*(i.w*i.y+i.x*i.z),a=-2*(i.y*i.z-i.w*i.x),o=2*(i.x*i.x+i.y*i.y)-1,l=t||this.#x.position,h=l.x-r.x,c=l.y-r.y,u=l.z-r.z,p=Math.sqrt(h*h+c*c+u*u)||1;return(n*h+a*c+o*u)/p>.6}dispose(){this.#d?.destroy(),this.#d=null,this.#u&&(this.#u.unmount(),this.#u=null,this.#h=null),this.#i?.dispose(),this.#i=null}#M(e,t,r){let i=this.#m;this.#m=r;let n={clientX:e,clientY:t,pointerId:1,pointerType:"mouse",isPrimary:!0};this.#g=!0,r&&!i&&this.#t.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1,bubbles:!0})),this.#t.dispatchEvent(new PointerEvent("pointermove",{...n,buttons:r?1:0,bubbles:!0})),!r&&i&&this.#t.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0,bubbles:!0})),this.#g=!1,this.#y&&(this.#y=!1,this.#v())}#v(){let e={pointerId:1,pointerType:"mouse",isPrimary:!0};this.#m&&this.#t.dispatchEvent(new PointerEvent("pointerup",{...e,button:0,buttons:0,bubbles:!0})),this.#t.dispatchEvent(new PointerEvent("pointerleave",{...e,bubbles:!1})),this.#m=!1}};var hh=`attribute vec2 a_pos;
varying vec2 v_uv;
uniform mat4 u_mvp;
void main() {
    v_uv = a_pos + 0.5;
    gl_Position = u_mvp * vec4(a_pos, 0.0, 1.0);
}`,uh=`precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_alpha;
void main() {
    vec4 c = texture2D(u_tex, v_uv);
    gl_FragColor = vec4(c.rgb, c.a * u_alpha);
}`,ti=class{#e;#r;#t;#i;#s;#n;#o;constructor(e,t,r){this.#e=e;let i=e.createShader(e.VERTEX_SHADER);e.shaderSource(i,hh),e.compileShader(i);let n=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(n,uh),e.compileShader(n),this.#r=e.createProgram(),e.attachShader(this.#r,i),e.attachShader(this.#r,n),e.linkProgram(this.#r),e.deleteShader(i),e.deleteShader(n),this.#n=e.getUniformLocation(this.#r,"u_mvp"),this.#o=e.getUniformLocation(this.#r,"u_alpha"),e.useProgram(this.#r),e.uniform1i(e.getUniformLocation(this.#r,"u_tex"),0),e.uniform1f(this.#o,1);let a=e.getAttribLocation(this.#r,"a_pos");this.#t=e.createVertexArray(),e.bindVertexArray(this.#t),this.#i=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.#i),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-.5,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5]),e.STATIC_DRAW),e.enableVertexAttribArray(a),e.vertexAttribPointer(a,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),this.#s=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.#s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,r,0,e.RGBA,e.UNSIGNED_BYTE,null),e.generateMipmap(e.TEXTURE_2D)}upload(e){let t=this.#e;t.bindTexture(t.TEXTURE_2D,this.#s),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.texSubImage2D(t.TEXTURE_2D,0,0,0,t.RGBA,t.UNSIGNED_BYTE,e),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.generateMipmap(t.TEXTURE_2D)}renderEye(e,t,r,i,n,a){let o=this.#e;o.viewport(t,r,i,n),o.enable(o.BLEND),o.blendFunc(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA),o.useProgram(this.#r),o.uniformMatrix4fv(this.#n,!1,e),o.uniform1f(this.#o,a),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,this.#s),o.bindVertexArray(this.#t),o.drawArrays(o.TRIANGLES,0,6),o.bindVertexArray(null),o.disable(o.BLEND),o.useProgram(null)}dispose(){let e=this.#e;e.deleteProgram(this.#r),e.deleteVertexArray(this.#t),e.deleteBuffer(this.#i),e.deleteTexture(this.#s)}};var ph=`
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
}`,dh={color:{srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}},Jt=256,fh=80,_s=2,ri=class{#e;#r;#t;#i;#s;#n;#o;constructor(e,t,r,i){this.#e=e,this.#n=r,this.#o=i,this.#r=e.createTexture({size:[r,i],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),this.#t=e.createBuffer({size:Jt*_s,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let n=e.createShaderModule({code:ph});this.#i=e.createRenderPipeline({layout:"auto",vertex:{module:n,entryPoint:"vs"},fragment:{module:n,entryPoint:"fs",targets:[{format:t,blend:dh}]},primitive:{topology:"triangle-strip",cullMode:"none"}});let a=this.#r.createView(),o=e.createSampler({magFilter:"linear",minFilter:"linear"});this.#s=Array.from({length:_s},(l,h)=>e.createBindGroup({layout:this.#i.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.#t,offset:h*Jt,size:fh}},{binding:1,resource:a},{binding:2,resource:o}]}))}upload(e){this.#e.queue.copyExternalImageToTexture({source:e},{texture:this.#r,premultipliedAlpha:!0},[this.#n,this.#o])}render(e,t,r){let i=new Float32Array(Jt/4*_s);e.forEach((a,o)=>{i.set(t(a),o*Jt/4),i[o*Jt/4+16]=r}),this.#e.queue.writeBuffer(this.#t,0,i);let n=this.#e.createCommandEncoder({label:"XRPanel"});e.forEach(({sub:a},o)=>{let l=n.beginRenderPass({colorAttachments:[{view:a.colorTexture.createView(a.getViewDescriptor()),loadOp:"load",storeOp:"store"}]}),h=a.viewport;l.setViewport(h.x,h.y,h.width,h.height,0,1),l.setPipeline(this.#i),l.setBindGroup(0,this.#s[o]),l.draw(4),l.end()}),this.#e.queue.submit([n.finish()])}dispose(){this.#r.destroy(),this.#t.destroy()}};var ii=class{#e=null;#r=null;#t=null;#i=null;#s=null;#n=null;#o=null;#c;#a;#l;#u;#h;#d;#p;#f;#m;#g;#y;constructor(e,{worldWidth:t,worldHeight:r,internalWidth:i,internalHeight:n,canvas:a}){this.#m=t,this.#g=r,this.#p=i,this.#f=n,this.#y=a,this.#c=new e.Matrix4,this.#a=new e.Matrix4,this.#l=new e.Matrix4,this.#u=new e.Vector3,this.#h=new e.Quaternion,this.#d=new e.Vector3(t,r,1)}get projected(){return!!this.#s}get layer(){return this.#t}get pose(){return this.#n??null}async init(e,t,r,i,n=null){if(this.#e=i,this.#r=n?.device??null,t)try{return this.#i=t,this.#t=t.createQuadLayer({space:r,viewPixelWidth:this.#p,viewPixelHeight:this.#f,layout:"mono",isStatic:!1,width:this.#m/2,height:this.#g/2,...n&&{colorFormat:n.format,textureUsage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST}}),this.stash(),this.#t}catch{this.#t=null,this.#i=null}return this.#s=n?new ri(n.device,n.format,this.#p,this.#f):new ti(i,this.#p,this.#f),null}stash(){this.#o=null,this.#t&&(this.#t.transform=new XRRigidTransform({x:0,y:-1e3,z:0},{x:0,y:0,z:0,w:1}))}setTransform(e){this.#n=e,this.#o=e}applyPose(e,t,r,i,n,a,o){let l=new XRRigidTransform({x:e,y:t,z:r},{x:i,y:n,z:a,w:o});this.#n=l,this.#o=l}upload(e){if(this.#t){this.#o&&(this.#t.transform=this.#o,this.#o=null);let t=this.#i.getSubImage(this.#t,e)?.colorTexture;this.#r?this.#r.queue.copyExternalImageToTexture({source:this.#y},{texture:t,premultipliedAlpha:!0},[this.#p,this.#f]):this.#w(t)}else this.#s?.upload(this.#y),this.#o=null}renderEye(e,t,r,i,n,a,o,l){!this.#s||!l||!this.#n||this.#s.renderEye(this.#T(t,t.projectionMatrix),r,i,n,a,o)}renderViews(e,t,r){!this.#s||!r||!this.#n||this.#s.render(e,i=>this.#T(i.view,i.projection),t)}dispose(){this.#s?.dispose(),this.#s=this.#t=this.#i=this.#e=null}#T(e,t){let r=this.#n.position,i=this.#n.orientation;return this.#u.set(r.x,r.y,r.z),this.#h.set(i.x,i.y,i.z,i.w),this.#c.compose(this.#u,this.#h,this.#d),this.#l.fromArray(e.transform.inverse.matrix),this.#a.multiplyMatrices(this.#l,this.#c),this.#l.fromArray(t),this.#a.premultiply(this.#l).elements}#w(e){if(!e)return;let t=this.#e;t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),t.texSubImage2D(t.TEXTURE_2D,0,0,0,t.RGBA,t.UNSIGNED_BYTE,this.#y),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1)}};function si(s,e,t){let r=Math.sqrt(s*s+e*e+t*t)||1,i=Math.atan2(s/r,t/r)+Math.PI,n=Math.asin(e/r),a=i/2,o=n/2,l=Math.cos(a),h=Math.sin(a),c=Math.cos(o),u=Math.sin(o);return{qx:l*u,qy:h*c,qz:-h*u,qw:l*c}}function Ts(s,e,t,r){let i=e.transform.position,n=e.transform.orientation,a=Math.atan2(2*(n.w*n.y+n.x*n.z),1-2*(n.y*n.y+n.z*n.z)),o=i.x-Math.sin(a)*t,l=i.y+r,h=i.z-Math.cos(a)*t,{qx:c,qy:u,qz:p,qw:f}=si(o-i.x,l-i.y,h-i.z);s.applyPose(o,l,h,c,u,p,f)}var Ss=class{#e;#r;#t;#i;#s;#n;#o;constructor(e,t,r){let{qx:i,qy:n,qz:a,qw:o}=si(0,r,-t);this.#e=new e.Vector3(0,r,-t),this.#r=new e.Quaternion(i,n,a,o),this.#t=this.#e.clone(),this.#i=this.#r.clone(),this.#s=new e.Vector3,this.#n=new e.Quaternion,this.#o=new e.Vector3(0,1,0)}reset(){this.#t.copy(this.#e),this.#i.copy(this.#r)}remember(e,{position:t,orientation:r}){let i=this.#c(e).invert();this.#t.set(t.x,t.y,t.z).sub(this.#s).applyQuaternion(i),this.#i.set(r.x,r.y,r.z,r.w).premultiply(i)}place(e){let t=this.#c(e),r=this.#t.clone().applyQuaternion(t).add(this.#s),i=this.#i.clone().premultiply(t);return{x:r.x,y:r.y,z:r.z,qx:i.x,qy:i.y,qz:i.z,qw:i.w}}#c(e){let t=e.transform.position,r=e.transform.orientation,i=Math.atan2(2*(r.x*r.z+r.w*r.y),1-2*(r.x*r.x+r.y*r.y));return this.#s.set(t.x,t.y,t.z),this.#n.setFromAxisAngle(this.#o,i)}},ke=class{#e;#r;#t=!1;#i=!1;#s;#n=null;#o=null;#c=!1;#a=null;#l=!1;#u=!1;#h=!1;alpha=1;onDragTick=null;onDragEnd=null;constructor(e,t){this.#s=new Ss(e,t.quadZ??.5,t.quadY??-.5),this.#e=new ei(e,t),this.#r=new ii(e,{worldWidth:t.worldWidth,worldHeight:t.worldHeight,internalWidth:this.#e.internalWidth,internalHeight:this.#e.internalHeight,canvas:this.#e.canvas})}get canvas(){return this.#e.canvas}get scene(){return this.#e.scene}get pixelWidth(){return this.#e.pixelWidth}get pixelHeight(){return this.#e.pixelHeight}get hitMesh(){return this.#e.hitMesh}get hitSpheres(){return this.#e.hitSpheres}get pointer(){return this.#e.pointer}get cursor(){return this.#e.cursor}async mountReact(e){return this.#e.mountReact(e)}rayHitQuad(e,t,r){return this.#e.rayHitQuad(e,t,r)}gazeHitsQuad(e,t){return this.#e.gazeHitsQuad(e,t)}get projected(){return this.#r.projected}get layer(){return this.#r.layer}get pose(){return this.#r.pose}get visible(){return this.#t}get placing(){return this.#i}get session(){return this.#n}get interacting(){return this.#t&&(this.#u||this.#c||this.#h||!!this.#o)}get dragging(){return this.#c}set dragging(e){this.#c=e}get panelDragging(){return this.#h}set panelDragging(e){this.#h=e,e||this.onDragEnd?.()}setPointer(e,t,r){this.#e.setPointer(e,t,r,!!this.#n)}clearPointer(){this.#e.clearPointer(!!this.#n)}initFlat(){this.#t=!0,this.#e.initFlat()}renderFlat(){this.#t&&this.#e.renderFlat()}async init(e,t,r,i,n=null){return this.#n=e,this.#e.patchCanvasForXR(),this.#e.linear=!!n,this.#r.init(e,t,r,i,n)}show(){this.#i=!0}recenter(){this.#s.reset(),this.#t&&this.show()}hide(){this.#e.clearPointer(!!this.#n),this.#c=!1,this.#a=null,this.#o=null,this.#h=!1,this.onDragEnd?.(),this.#t=this.#i=!1;for(let e of this.#e.hitSpheres)e.visible=!1;this.#r.stash()}setTransform(e){this.#r.setTransform(e)}stash(){this.#r.stash()}applyPose(e,t,r,i,n,a,o){this.#r.applyPose(e,t,r,i,n,a,o);let l=this.#e.hitMesh;l.position.set(e,t,r),l.quaternion.set(i,n,a,o),l.updateMatrixWorld(!0)}updatePosition(e){if(!this.#i||!e)return;this.#i=!1,this.#t=!0;let{x:t,y:r,z:i,qx:n,qy:a,qz:o,qw:l}=this.#s.place(e);this.applyPose(t,r,i,n,a,o,l)}drawContent(e){!this.#t||this.#e.reactPending||(this.#e.renderScene(),this.alpha<1&&!this.#r.projected&&this.#e.clampAlpha(this.alpha),this.#r.upload(e))}renderEye(e,t,r,i,n,a){this.#r.renderEye(e,t,r,i,n,a,this.alpha,this.#t)}renderViews(e){this.#r.renderViews(e,this.alpha,this.#t)}handleInput(e,t,r){if(!this.#n)return!1;let i=!1,n=!1,a=null,o=null;for(let h of this.#e.hitSpheres)h.visible=!1;for(let[h,c]of[["left",e],["right",t]]){if(c?.menuPressed&&(i=!0),!c?.active||!this.#t||!c.rayTransform||c.held)continue;let u=h==="left"?0:1,p=this.#e.castRay(c,u);if(p){let f={hand:c,hit:p,side:h,trigger:!!c.triggerPressed};h==="left"?a=f:o=f}}let l=!!(a||o);if(this.#h){if(this.#r.pose&&r?.transform&&this.onDragTick){let h=this.onDragTick(e,t,r,this.#a,this.#r.pose);h?(this.applyPose(h.x,h.y,h.z,h.qx,h.qy,h.qz,h.qw),this.#s.remember(r,this.#r.pose)):(this.#h=!1,this.onDragEnd?.())}}else{let h=null;if(this.#o){let c=this.#o==="left"?a:o,u=this.#o==="left"?e:t,p=!!u?.triggerPressed;h=c||(p?{hand:u,hit:null,side:this.#o,trigger:p}:null),p||(this.#o=null)}if(!h){let c=this.#a;h=c==="left"?a||o:c==="right"?o||a:a||o}if(h){this.#a=h.side??this.#a;let c=this.#a==="left"?1:0;if(this.#e.hitSpheres[c].visible=!1,h.hit){let u=this.#e.ptrPressed;this.setPointer(h.hit.x,h.hit.y,h.trigger),h.trigger&&!u&&!this.#o&&(this.#o=this.#a)}else this.#e.pointer?this.setPointer(this.#e.pointer.x,this.#e.pointer.y,h.trigger):this.clearPointer();h.hand?.isTransientPointer&&(n=!0)}else this.clearPointer(),this.#a=null;this.#u=!!(a||o)}return i&&!this.#l&&(this.#t||this.#i?l||this.hide():this.show()),this.#l=i,n}dispose(){this.#t=!1,this.#n=null,this.#e.dispose(),this.#r.dispose()}};var xt=class{_quad;_sig=null;onPlayPause=null;onSeek=null;onPresetCycle=null;onExit=null;onClose=null;onSceneNav=null;onSceneSelect=null;onSceneAction=null;constructor(e,t){this._quad=new ke(e,{...t,react:!0})}get quad(){return this._quad}_createBaseSignals(){return{loadingD:et("none"),contentD:et("flex"),playD:et("flex"),pauseD:et("none"),spinD:et("none"),spinR:et(0),spinFast:et(!1)}}_updatePlayback(e,{loading:t,playing:r,spinning:i,buffering:n,progress:a}){e.loadingD.value=t?"flex":"none",e.contentD.value=t?"none":"flex",e.playD.value=!i&&!r?"flex":"none",e.pauseD.value=!i&&r?"flex":"none",e.spinD.value=i?"flex":"none",e.spinFast.value=i&&!n,this._quad.dragging||this._setProgress(a)}render(e){let t=this._sig;if(!this._quad.visible||!t)return;let r=t.loadingD.value==="flex",i=r?20:t.spinFast.value?14:6;(t.spinD.value==="flex"||r)&&(t.spinR.value-=e*i)}_seekFromEvent(e){this._seekTo(e.point.x+this._quad.pixelWidth/2)}_seekTo(e){}_setProgress(e){}};import{jsx as W,jsxs as ai}from"react/jsx-runtime";var _t=s=>`data:image/svg+xml,${encodeURIComponent(s)}`,gh=_t('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#aaaaaa"/></svg>'),yh=_t('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#aaaaaa"/></svg>'),xh=_t('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#666666"/></svg>'),jo=_t('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1 1 2 12L5 12A7 7 0 1 0 12 5Z" fill="#888888"/></svg>'),bh=_t('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z" fill="#888888"/></svg>'),vh=_t('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.6 16.6L10 18l6-6-6-6-1.4 1.4L13.2 12z" fill="#888888"/></svg>'),vt=30,Ze=520,ea=72,oi=ea+vt,De=vt+ea/2,Qo=14,er=40,tr=26,bt=6,Ko=26,li=14,Ms=li/2,ci=20,Ps=ci/2,rr=50,Jo=32,Rs={borderOpacity:.65},wt=class extends xt{#e=0;#r=0;constructor(e){let r=.86*(oi/Ze);super(e,{pixelWidth:Ze,pixelHeight:oi,worldWidth:.86,worldHeight:r,quadY:-.3,cursorFactory:i=>{let n=new i.Mesh(new i.CircleGeometry(4,32),new i.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#t().catch(i=>{})}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:a="0:00 / 0:00",presetName:o=null,sceneText:l=null,sceneLabel:h=null}){let c=this._sig;if(c&&(this._updatePlayback(c,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),c.timeT.value=a,c.presetT&&o!=null&&(c.presetT.value=o),l!=null&&(c.sceneT.value=l),h!=null)){let u=String(h);c.sceneSub.value=u.length>Jo?`${u.slice(0,Jo-2)}...`:u}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-this.#e)/this.#r));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=this.#r*e;t.fillW.value=Math.max(.001,r),t.thumbL.value=this.#e+r-Ms,t.thumbGlowL.value=this.#e+r-Ps}async#t(){let e=this._quad,t=Qo,r=De-er/2,i=Ze-Qo-tr,n=De-tr/2,a=i-10,o=66,l=24,h=a-o,c=De-l/2;a=h-8;let u=78,p=a-u,f=De-9,m=this.#e=t+er+12,d=this.#r=p-10-m,g=this._sig={...this._createBaseSignals(),fillW:Ge(.001),thumbL:Ge(m-Ms),thumbGlowL:Ge(m-Ps),thumbS:Ge(1),thumbGlowOp:Ge(0),timeT:Ge("0:00 / 0:00"),sceneT:Ge("1/1"),sceneSub:Ge("SCENE"),presetT:Ge("Off")},y=()=>{g.thumbGlowOp.value=.5,g.thumbS.value=1.15},_=()=>{e.dragging||(g.thumbGlowOp.value=0,g.thumbS.value=1)},x=G=>{G.target.setPointerCapture(G.pointerId),e.dragging=!0,this._seekFromEvent(G)},v=G=>{e.dragging&&this._seekFromEvent(G)},T=()=>{e.dragging=!1,g.thumbGlowOp.value=0,g.thumbS.value=1},M={backgroundColor:1710618},B=ai(mh,{backgroundColor:657930,backgroundOpacity:.88,children:[ai(se,{positionType:"absolute",positionLeft:0,positionTop:0,width:Ze,height:oi,display:g.contentD,borderWidth:1,borderColor:3355443,borderOpacity:.3,children:[W(se,{positionType:"absolute",positionLeft:0,positionTop:0,width:rr,height:vt,hover:M,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(-1),children:W(tt,{src:bh,width:18,height:18,pointerEvents:"none"})}),ai(se,{positionType:"absolute",positionLeft:rr,positionTop:0,width:Ze-rr*2,height:vt,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,overflow:"hidden",children:[W(ni,{fontSize:13,color:11184810,children:g.sceneT}),W(ni,{fontSize:10,color:6710886,children:g.sceneSub})]}),W(se,{positionType:"absolute",positionLeft:Ze-rr,positionTop:0,width:rr,height:vt,hover:M,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(1),children:W(tt,{src:vh,width:18,height:18,pointerEvents:"none"})}),W(se,{positionType:"absolute",positionLeft:0,positionTop:vt,width:Ze,height:.5,backgroundColor:3355443,backgroundOpacity:.5,pointerEvents:"none"}),ai(se,{positionType:"absolute",positionLeft:t,positionTop:r,width:er,height:er,borderRadius:er/2,borderWidth:1,borderColor:4473924,borderOpacity:.5,hover:Rs,alignItems:"center",justifyContent:"center",onClick:()=>this.onPlayPause?.(),children:[W(tt,{display:g.playD,src:gh,width:20,height:20,marginLeft:2,pointerEvents:"none"}),W(tt,{display:g.pauseD,src:yh,width:18,height:18,pointerEvents:"none"}),W(tt,{display:g.spinD,src:jo,width:24,height:24,transformRotateZ:g.spinR,pointerEvents:"none"})]}),W(se,{positionType:"absolute",positionLeft:m,positionTop:De-Ko/2,width:d,height:Ko,onPointerEnter:y,onPointerLeave:_,onPointerDown:x,onPointerMove:v,onPointerUp:T}),W(se,{positionType:"absolute",positionLeft:m,positionTop:De-bt/2,width:d,height:bt,borderRadius:bt/2,backgroundColor:2236962,backgroundOpacity:.8,pointerEvents:"none"}),W(se,{positionType:"absolute",positionLeft:m,positionTop:De-bt/2,width:g.fillW,height:bt,borderRadius:bt/2,backgroundColor:7829367,zIndexOffset:1,pointerEvents:"none"}),W(se,{positionType:"absolute",positionLeft:g.thumbGlowL,positionTop:De-ci/2,width:ci,height:ci,borderRadius:Ps,borderWidth:2,borderColor:10066329,borderOpacity:g.thumbGlowOp,zIndexOffset:2,pointerEvents:"none"}),W(se,{positionType:"absolute",positionLeft:g.thumbL,positionTop:De-li/2,width:li,height:li,borderRadius:Ms,backgroundColor:11184810,transformScaleX:g.thumbS,transformScaleY:g.thumbS,zIndexOffset:3,pointerEvents:"none"}),W(se,{positionType:"absolute",positionLeft:p,positionTop:f,width:u,height:18,alignItems:"center",justifyContent:"center",children:W(ni,{fontSize:13,color:16777215,opacity:.35,children:g.timeT})}),W(se,{positionType:"absolute",positionLeft:i,positionTop:n,width:tr,height:tr,borderRadius:tr/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:Rs,alignItems:"center",justifyContent:"center",onClick:()=>this.onExit?.(),children:W(tt,{src:xh,width:11,height:11,pointerEvents:"none"})}),W(se,{positionType:"absolute",positionLeft:h,positionTop:c,width:o,height:l,borderRadius:l/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:Rs,alignItems:"center",justifyContent:"center",onClick:()=>this.onPresetCycle?.(),children:W(ni,{fontSize:11,color:10066329,pointerEvents:"none",children:g.presetT})})]}),W(se,{positionType:"absolute",positionLeft:0,positionTop:0,width:Ze,height:oi,backgroundColor:657930,backgroundOpacity:1,display:g.loadingD,alignItems:"center",justifyContent:"center",children:W(tt,{src:jo,width:40,height:40,transformRotateZ:g.spinR,pointerEvents:"none"})})]});await e.mountReact(B)}};var St=class{#e;#r;#t=null;#i=null;#s;#n;#o;#c;constructor(e,t){this.#e=e,this.#r=t;let r=t.scene,i=new e.BufferGeometry().setFromPoints([new e.Vector3(0,0,0),new e.Vector3(0,0,-5)]),n=new e.SphereGeometry(.015,6,6);this.#s=new e.MeshBasicMaterial({color:16711680,depthTest:!1}),this.#n=new e.MeshBasicMaterial({color:65280,depthTest:!1});let a=()=>{let o=new e.Group,l=new e.Group,h=new e.Line(i,new e.LineBasicMaterial({color:5227511,transparent:!0,opacity:.5,depthTest:!1}));h.visible=!1,o.add(h);let c=new e.Mesh(n,this.#s),u=new e.Mesh(n,this.#s);return c.renderOrder=u.renderOrder=999,c.visible=u.visible=!1,r.add(o,l,c,u),{ray:o,grip:l,line:h,idxSphere:c,thmSphere:u}};this.#o=a(),this.#c=a()}update(e,t){this.#a(),this.#l(this.#o,e),this.#l(this.#c,t)}dispose(){this.#t&&(this.#r.anchor.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose());for(let e of[this.#o,this.#c])e.line.material.dispose(),e.idxSphere.geometry.dispose(),e.thmSphere.geometry.dispose();this.#s.dispose(),this.#n.dispose()}#a(){let e=this.#r.bboxMesh;if(e===this.#i)return;this.#i=e;let t=this.#r.anchor;if(this.#t&&(t.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose(),this.#t=null),!e)return;let r=this.#e;this.#t=new r.LineSegments(new r.EdgesGeometry(e.geometry),new r.LineBasicMaterial({color:58879,transparent:!0,opacity:.35,depthTest:!1})),this.#t.position.copy(e.position),t.add(this.#t)}#l(e,t){if(t.rayTransform&&this.#u(e.ray,t.rayTransform),t.gripTransform&&this.#u(e.grip,t.gripTransform),e.line.visible=t.active,e.idxSphere.visible=e.thmSphere.visible=!1,!t.active)return;t.indexTip&&(e.idxSphere.position.set(t.indexTip.x,t.indexTip.y,t.indexTip.z),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0)),t.thumbTip&&(e.thmSphere.position.set(t.thumbTip.x,t.thumbTip.y,t.thumbTip.z),e.thmSphere.visible=!0,e.thmSphere.updateMatrixWorld(!0)),t.indexTip||(e.idxSphere.position.copy(e.grip.position),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0));let r=t.gripping?this.#n:this.#s;e.idxSphere.material=r,t.thumbTip&&(e.thmSphere.material=r)}#u(e,t){let r=t.position,i=t.orientation;e.position.set(r.x,r.y,r.z),e.quaternion.set(i.x,i.y,i.z,i.w),e.updateMatrixWorld(!0)}};import{signal as C}from"@preact/signals-core";import{Container as O,Fullscreen as wh,Image as _h,Svg as $,Text as ee}from"@react-three/uikit";import{Fragment as ya,jsx as b,jsxs as ne}from"react/jsx-runtime";var N=9684710,he=1122603,Sh=661021,Th=2636615,Mh=4086636,U=680,Ls=248,Te=34,Xe=48,sr=Te+Xe,xa=Xe,ir=26,Ph=Ls+xa,ta=32,te=88,ze=60,Rh=Ls-ze,Ne=(U-te)/7,Ae=Math.round(U/3),ba=12,q=34,de=te+ba,Mt=U-te-ba*2,Ch=sr+50,ks=Mt-q,$e=24,hi=18,va=de+$e,wa=ks-$e*2,ra={phase:"off",start:0,end:1,gap:0},Tt=48,ia=s=>{let e=s?Tt:0;return{strip:s,mainY:sr+e,trkY:Ch+e,btnY:Rh+e,bodyH:Ls+e,panelH:Ph+e}},rt=24,pi=U/7,Cs="-",sa=18,na=4,oa=3,aa=.85,la=20,ca=20,ha=12,ua=.55,Eh=s=>Math.min(1,s/pi),ui=(s,e,t)=>Math.max(t,Math.round(s*e)),nr=(s,e)=>e?va+wa*s:de+ks*s,Es=(s,e)=>S.clamp01((s-(e?va:de))/(e?wa:ks)),pa=s=>nr(s,!0)-$e,da=s=>nr(s,!0)+q,Q=(s,e="#93c6e6")=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${s}" fill="${e}"/></svg>`),Lh="data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${Mt*2}" height="${q*2}" viewBox="0 0 ${Mt} ${q}"><defs><pattern id="h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1.5" height="6" fill="#93c6e6" fill-opacity="0.2"/></pattern></defs><rect width="100%" height="100%" fill="#0a161d"/><rect width="100%" height="100%" fill="url(#h)"/></svg>`),fa="M8.76 21.6 7.221 20.1177 8.949 18.4235H8.76c-2.106 0-3.8925-.7191-5.3595-2.1573C1.9335 14.8279 1.2 13.0765 1.2 11.0118s.7335-3.81621 2.2005-5.25444C4.8675 4.31912 6.654 3.60001 8.76 3.60001h6.48c2.106 0 3.8925.71911 5.3595 2.15735C22.0665 7.19559 22.8 8.94707 22.8 11.0118s-.7335 3.8161-2.2005 5.2544c-1.467 1.4382-3.2535 2.1573-5.3595 2.1573v-2.1176c1.494 0 2.7675-.5162 3.8205-1.5485 1.053-1.0324 1.5795-2.2809 1.5795-3.7456s-.5265-2.71326-1.5795-3.74562c-1.053-1.03235-2.3265-1.54853-3.8205-1.54853H8.76c-1.494 0-2.7675.51618-3.8205 1.54853C3.8865 8.29854 3.36 9.54707 3.36 11.0118s.5265 2.722 1.5795 3.772c1.053 1.05 2.3265 1.628 3.8205 1.7339h.432l-1.944-1.9059 1.512-1.4824 4.32 4.2353L8.76 21.6Z",j={play:Q("M8 5v14l11-7z"),pause:Q("M6 4h4v16H6zm8 0h4v16h-4z"),spin:Q("M12 2a10 10 0 1 1-10 10h3a7 7 0 1 0 7-7z"),bulb:Q("M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"),mute:Q("M7 9v6h4l5 5V4l-5 5H7z"),vol:Q("M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"),loop:Q(fa),loopOn:Q(fa,"#11212b"),reset:Q("M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"),exit:Q("M17 7l-1.4 1.4L18.2 11H8v2h10.2l-2.6 2.6L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"),grip:Q("M15.5 15.4V8.6L18.9 12l-3.4 3.4zM8.5 8.6v6.8L5.1 12l3.4-3.4z"),close:Q("M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"),scale:Q("M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z"),lock:Q("M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"),unlk:Q("M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"),fork:Q("M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4h-6zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3L10 4z"),arrL:Q("M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"),arrR:Q("M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z")},it={backgroundColor:1849416},ma=.9,kh=-.55,ga=.866,Pt=class extends xt{#e;#r=null;#t=ra;#i=null;#s=null;#n;#o;#c;#a=new Array(rt).fill(null);onMuteToggle=null;onScaleLockToggle=null;onLockToggle=null;onReset=null;onAbLoopToggle=null;onAbLoopSet=null;constructor(e,{strip:t=!1}={}){let{panelH:r}=ia(t);super(e,{pixelWidth:U,pixelHeight:r,worldWidth:1,worldHeight:r/U,quadZ:ma,quadY:kh,cursorFactory:i=>{let n=new i.Mesh(new i.CircleGeometry(5,32),new i.MeshBasicMaterial({color:N,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#e=e,this.#c=ia(t),this.#n=new e.Vector3,this.#o=new e.Quaternion,this._quad.alpha=.9,this._quad.onDragTick=(i,n,a,o,l)=>this.#l(i,n,a,o,l),this._quad.onDragEnd=()=>{this.#r=null,this._quad.alpha=.9},this.#f().catch(i=>{})}#l(e,t,r,i,n){let a=this.#e,o=this.#r,l=o?.side??i??"right",h=l==="left"?e:t;if(!h?.triggerPressed)return this.#r=null,null;let c=h.rayTransform?.orientation;if(!c){let T=n.position,M=n.orientation;return{x:T.x,y:T.y,z:T.z,qx:M.x,qy:M.y,qz:M.z,qw:M.w}}let u=this.#n.set(0,0,-1).applyQuaternion(this.#o.set(c.x,c.y,c.z,c.w));if(!o){let T=r.transform.position,M=new a.Vector3(T.x,T.y,T.z),B=n.position,G=new a.Vector3(B.x,B.y,B.z).sub(M);this.#r={side:l,R:G.length()||ma,oQ:new a.Quaternion().setFromUnitVectors(u.clone(),G.normalize()),eye:M};let L=n.orientation;return{x:B.x,y:B.y,z:B.z,qx:L.x,qy:L.y,qz:L.z,qw:L.w}}if(u.applyQuaternion(o.oQ),Math.abs(u.y)>ga){u.y=Math.sign(u.y)*ga;let T=Math.sqrt(u.x*u.x+u.z*u.z)||1e-6,M=Math.sqrt(1-u.y*u.y)/T;u.x*=M,u.z*=M}let p=o.eye,f=o.R,m=p.x+u.x*f,d=p.y+u.y*f,g=p.z+u.z*f,{qx:y,qy:_,qz:x,qw:v}=si(u.x,u.y,u.z);return{x:m,y:d,z:g,qx:y,qy:_,qz:x,qw:v}}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:a="0:00 / 0:00",presetName:o=null,muted:l=!1,locked:h=!1,scaleLocked:c=!0,abLoop:u=ra,sceneText:p=null,sceneLabel:f=null,bannerText:m=null,scenario:d=null}){let g=this._sig;if(!g)return;u.phase!=="active"&&(this.#s=null),u.phase!=="setB"&&(this.#i=null);let y=this.#s;if(this.#t=y?{...u,start:y.start,end:y.end}:u,this._updatePlayback(g,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),this.#d(g),g.playTextD.value=r?"none":"flex",g.playLbl.value=t?"PAUSE":"PLAY",g.timeT.value=a,o!=null&&(g.presetT.value=o),g.icA.value=l?"none":"flex",g.icB.value=l?"flex":"none",g.muteLbl.value=l?"UNMUTE":"MUTE",g.sclLkLbl.value=c?"UNLOCK SCALE":"LOCK SCALE",g.lockA.value=h?"none":"flex",g.lockB.value=h?"flex":"none",g.lockLbl.value=h?"UNLOCK SCENE":"LOCK SCENE",f!=null){let _=String(f);g.sceneSub.value=_.length>ta?`${_.slice(0,ta-2)}...`:_}m!=null&&(g.bannerT.value=m),this.#u(d,p,e?0:n)}#u(e,t,r){let i=this._sig,n=e?.chips??[],a=n.filter(f=>!f.isFork);if(a.length){let f=Math.max(1,a.findIndex(m=>m.isActive)+1);i.sceneT.value=`${f}/${a.length}`}else t!=null&&(i.sceneT.value=t);if(!i.slots)return;let o=Math.max(0,n.findIndex(f=>f.isActive)),l=Math.min(n.length,rt),h=l?U/l:pi,c=n.length<=rt?0:Math.min(Math.max(0,o-(rt>>1)),n.length-rt),u=Eh(h),p=ui(sa,u,10);for(let f=0;f<rt;f++){let m=n[c+f]??null,d=i.slots[f],g=!!m&&(m.order!==void 0||m.forkFrom!==void 0);d.d.value=f<l?"flex":"none",d.sepD.value=f>0&&f<l?"flex":"none",d.x.value=f*h,d.w.value=h,d.lbl.value=m?.isFork?Cs:m?.label??Cs,d.lblD.value=m?.isFork?"none":"flex",d.lblFs.value=ui(la,u,10),d.icD.value=m?.isFork?"flex":"none",d.icS.value=ui(ca,u,10),d.badge.value=m?.branchNumber?String(m.branchNumber):"",d.badgeD.value=m?.branchNumber?"flex":"none",d.badgeS.value=p,d.badgeFs.value=ui(ha,u,8),d.badgeX.value=(f+1)*h-p-na;let y=!m?.isFork&&!!m?.isActive;d.progD.value=y?"flex":"none",d.progW.value=y?h*r:0,d.lblOpa.value=g&&!m?.isActive?ua:1,d.lblFw.value=m?.isActive?"bold":"normal",d.opa.value=g?1:.35,this.#a[f]=m}}#h(){let{phase:e,start:t,end:r,gap:i}=this.#t,n=this.#i==null?null:S.clamp(this.#i,t+i,1);return{a:e==="off"?null:t,b:e==="active"?r:n}}#d(e){let{phase:t,start:r}=this.#t,i=t!=="off",{b:n}=this.#h(),a=pa(r),o=da(n??1);e.abOnD.value=i?"flex":"none",e.abOffD.value=i?"none":"flex",e.abTxtC.value=i?he:N,e.abLbl.value=t==="setB"?"A/B LOOP (2/2)":"A/B LOOP",e.abAL.value=a,e.abBL.value=o,e.abBD.value=n==null?"none":"flex",e.abMarkerPE.value=t==="active"?"auto":"none",e.abPreW.value=a-de,e.abHoverD.value=this.#i==null?"none":"flex",e.abHoverL.value=a+$e,e.abHoverW.value=Math.max(0,o-a-$e)}#p(e){let{a:t,b:r}=this.#h(),i=e+(q-hi)/2,n=a=>i<a+$e&&a<i+hi;return t!=null&&n(pa(t))||r!=null&&n(da(r))}_seekTo(e){let{phase:t,start:r,end:i}=this.#t,n=S.clamp(Es(e-q/2,t!=="off"),r,i);this._setProgress(n),this.onSeek?.(n)}_setProgress(e){let t=this._sig;if(!t)return;let{phase:r,start:i,end:n}=this.#t,a=r!=="off",o=nr(S.clamp(e,i,n),a),l=nr(i,a);t.thumbL.value=o,t.fillL.value=l,t.fillW.value=Math.max(0,o+q-l),t.thumbIconD.value=this.#p(o)?"none":"flex"}async#f(){let{strip:e,mainY:t,trkY:r,btnY:i,bodyH:n,panelH:a}=this.#c,o=this._sig={...this._createBaseSignals(),playTextD:C("flex"),playLbl:C("PAUSE"),fillL:C(de),fillW:C(q),thumbL:C(de),thumbS:C(1),thumbIconD:C("flex"),timeT:C("0:00 / 0:00"),sceneT:C("1/5"),sceneSub:C("SCENE"),icA:C("flex"),icB:C("none"),muteLbl:C("MUTE"),sclLkLbl:C("LOCK SCALE"),lockA:C("flex"),lockB:C("none"),lockLbl:C("LOCK SCENE"),abLbl:C("A/B LOOP"),abOnD:C("none"),abOffD:C("flex"),abTxtC:C(N),abAL:C(de),abBD:C("none"),abBL:C(de),abMarkerPE:C("none"),abPreW:C(0),abHoverD:C("none"),abHoverL:C(de),abHoverW:C(0),presetT:C("OFF"),bannerT:C(""),...e&&{slots:Array.from({length:rt},(w,P)=>({d:C("none"),sepD:C("none"),x:C(P*pi),w:C(pi),lbl:C(Cs),lblD:C("flex"),lblFs:C(la),lblFw:C("normal"),lblOpa:C(ua),icD:C("none"),icS:C(ca),badge:C(""),badgeD:C("none"),badgeS:C(sa),badgeFs:C(ha),badgeX:C(0),progD:C("none"),progW:C(0),opa:C(.35)}))}},l=({x:w,y:P,w:I,h:k,z:F=0})=>b(O,{positionType:"absolute",positionLeft:w,positionTop:P,width:I,height:k,backgroundColor:N,backgroundOpacity:.3,zIndexOffset:F,pointerEvents:"none"}),h=({slot:w,index:P})=>ne(ya,{children:[b(O,{positionType:"absolute",positionLeft:w.x,positionTop:0,width:w.w,height:Tt,backgroundColor:he,hover:it,display:w.d,onClick:()=>{let I=this.#a[P];I?.forkFrom!==void 0?this.onSceneAction?.(I.forkFrom):I?.order!==void 0&&this.onSceneSelect?.(I.order)}}),ne(O,{positionType:"absolute",positionLeft:w.x,positionTop:0,width:w.w,height:Tt,alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",display:w.d,opacity:w.opa,zIndexOffset:2,children:[b(ee,{fontSize:w.lblFs,fontWeight:w.lblFw,color:N,opacity:w.lblOpa,display:w.lblD,children:w.lbl}),b($,{src:j.fork,width:w.icS,height:w.icS,display:w.icD,transformRotateZ:-90})]}),b(O,{positionType:"absolute",positionLeft:w.badgeX,positionTop:na,width:w.badgeS,height:w.badgeS,borderRadius:3,backgroundColor:N,backgroundOpacity:aa,alignItems:"center",justifyContent:"center",display:w.badgeD,zIndexOffset:2,pointerEvents:"none",children:b(ee,{fontSize:w.badgeFs,fontWeight:"bold",color:he,zIndexOffset:3,children:w.badge})}),b(O,{positionType:"absolute",positionLeft:w.x,positionTop:Tt-oa,width:w.progW,height:oa,backgroundColor:N,backgroundOpacity:aa,display:w.progD,zIndexOffset:2,pointerEvents:"none"}),b(O,{positionType:"absolute",positionLeft:w.x,positionTop:0,width:.5,height:Tt,backgroundColor:N,backgroundOpacity:.3,display:w.sepD,zIndexOffset:3,pointerEvents:"none"})]}),c=({idx:w,onClick:P,active:I=null,children:k})=>{let F=te+w*Ne;return ne(O,{positionType:"absolute",positionLeft:F,positionTop:i,width:Ne,height:ze,backgroundColor:he,hover:it,onClick:P,children:[I&&b(O,{positionType:"absolute",positionLeft:0,positionTop:0,width:Ne,height:ze,backgroundColor:N,display:I,pointerEvents:"none"}),b(O,{width:"100%",height:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",children:k})]})},u=this._quad,p=w=>w.point.x+u.pixelWidth/2,f=w=>Es(p(w)-$e/2-q,!0),m=()=>{o.thumbS.value=1.08},d=()=>{this.#i=null,u.dragging||(o.thumbS.value=1)},g=w=>{if(this.#t.phase==="setB"){this.#i=null,this.onAbLoopSet?.(this.#t.start,f(w));return}w.target.setPointerCapture(w.pointerId),u.dragging=!0,this._seekFromEvent(w)},y=w=>{this.#t.phase==="setB"?this.#i=f(w):u.dragging&&this._seekFromEvent(w)},_=()=>{u.dragging=!1,o.thumbS.value=1},x=w=>P=>{P.target.setPointerCapture(P.pointerId);let{start:I,end:k}=this.#t,F=p(P)-nr(w==="a"?I:k,!0);this.#s={marker:w,grab:F,start:I,end:k}},v=w=>{let P=this.#s;if(!P)return;let I=Es(p(w)-P.grab,!0),k=this.#t.gap;P.marker==="a"?P.start=Math.min(I,P.end-k):P.end=Math.max(I,P.start+k)},T=()=>{let w=this.#s;w&&(this.#s=null,this.onAbLoopSet?.(w.start,w.end))},M=({label:w,left:P,display:I,onPointerDown:k})=>b(O,{positionType:"absolute",positionLeft:P,positionTop:r,width:$e,height:q,backgroundColor:he,borderWidth:1,borderColor:N,hover:it,alignItems:"center",justifyContent:"center",display:I,pointerEvents:o.abMarkerPE,zIndex:1,zIndexOffset:8,onPointerDown:k,onPointerMove:v,onPointerUp:T,children:b(ee,{fontSize:13,fontWeight:"bold",color:N,pointerEvents:"none",children:w})}),B=w=>{w.target.setPointerCapture(w.pointerId),u.panelDragging=!0,u.alpha=.3},G=()=>{u.panelDragging=!1},L=ne(wh,{backgroundColor:he,children:[ne(O,{positionType:"absolute",positionLeft:0,positionTop:0,width:U,height:a,display:o.contentD,children:[b(O,{positionType:"absolute",positionLeft:0,positionTop:0,width:U,height:Te,backgroundColor:N,backgroundOpacity:.85}),b(O,{positionType:"absolute",positionLeft:0,positionTop:0,width:U,height:Te,alignItems:"center",justifyContent:"center",children:b(ee,{fontSize:13,fontWeight:"bold",color:he,children:o.bannerT})}),b(O,{positionType:"absolute",positionLeft:0,positionTop:Te,width:Ae,height:Xe,backgroundColor:he,hover:it,onClick:()=>this.onSceneNav?.(-1)}),b(O,{positionType:"absolute",positionLeft:0,positionTop:Te,width:Ae,height:Xe,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:b($,{src:j.arrL,width:28,height:28})}),b(l,{x:Ae,y:Te,w:.5,h:Xe}),ne(O,{positionType:"absolute",positionLeft:Ae,positionTop:Te,width:U-Ae*2,height:Xe,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,overflow:"hidden",children:[b(ee,{fontSize:22,color:N,children:o.sceneT}),b(ee,{fontSize:10,color:N,opacity:.45,children:o.sceneSub})]}),b(l,{x:U-Ae,y:Te,w:.5,h:Xe}),b(O,{positionType:"absolute",positionLeft:U-Ae,positionTop:Te,width:Ae,height:Xe,backgroundColor:he,hover:it,onClick:()=>this.onSceneNav?.(1)}),b(O,{positionType:"absolute",positionLeft:U-Ae,positionTop:Te,width:Ae,height:Xe,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:b($,{src:j.arrR,width:28,height:28})}),b(l,{x:0,y:sr,w:U,h:.5}),e&&ne(ya,{children:[b(O,{positionType:"absolute",positionLeft:0,positionTop:sr,width:U,height:Tt,children:o.slots.map((w,P)=>b(h,{slot:w,index:P},P))}),b(l,{x:0,y:sr,w:U,h:.5,z:10}),b(l,{x:0,y:t,w:U,h:.5,z:10})]}),b(O,{positionType:"absolute",positionLeft:0,positionTop:t,width:te,height:n-t,backgroundColor:he,hover:it,onClick:()=>this.onPlayPause?.()}),ne(O,{positionType:"absolute",positionLeft:0,positionTop:t,width:te,height:n-t,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,pointerEvents:"none",children:[b($,{display:o.playD,src:j.play,width:20,height:24,marginLeft:2}),b($,{display:o.pauseD,src:j.pause,width:20,height:24}),b($,{display:o.spinD,src:j.spin,width:28,height:28,transformRotateZ:o.spinR}),b(ee,{fontSize:13,fontWeight:"bold",color:N,display:o.playTextD,children:o.playLbl})]}),b(l,{x:te,y:t,w:.5,h:n-t}),b(O,{positionType:"absolute",positionLeft:te+16,positionTop:t+14,width:120,height:20,children:b(ee,{fontSize:14,color:N,children:o.timeT})}),b(O,{positionType:"absolute",positionLeft:de,positionTop:r,width:Mt,height:q,backgroundColor:Sh,onPointerEnter:m,onPointerLeave:d,onPointerDown:g,onPointerMove:y,onPointerUp:_}),b(_h,{src:Lh,positionType:"absolute",positionLeft:de,positionTop:r,width:Mt,height:q,objectFit:"fill",keepAspectRatio:!1,zIndexOffset:1,pointerEvents:"none"}),b(O,{positionType:"absolute",positionLeft:o.abHoverL,positionTop:r,width:o.abHoverW,height:q,backgroundColor:Mh,display:o.abHoverD,zIndex:1,zIndexOffset:2,pointerEvents:"none"}),b(O,{positionType:"absolute",positionLeft:de,positionTop:r,width:o.abPreW,height:q,backgroundColor:Th,display:o.abOnD,zIndex:1,zIndexOffset:3,pointerEvents:"none"}),b(O,{positionType:"absolute",positionLeft:o.fillL,positionTop:r,width:o.fillW,height:q,backgroundColor:N,backgroundOpacity:.85,zIndex:1,zIndexOffset:4,pointerEvents:"none"}),b(O,{positionType:"absolute",positionLeft:de,positionTop:r,width:Mt,height:q,borderWidth:1,borderColor:N,borderOpacity:.6,zIndex:1,zIndexOffset:5,pointerEvents:"none"}),b(O,{positionType:"absolute",positionLeft:o.thumbL,positionTop:r,width:q,height:q,backgroundColor:he,borderWidth:1,borderColor:N,zIndex:1,zIndexOffset:6,transformScaleX:o.thumbS,transformScaleY:o.thumbS,pointerEvents:"none"}),b(O,{positionType:"absolute",positionLeft:o.thumbL,positionTop:r,width:q,height:q,alignItems:"center",justifyContent:"center",zIndex:1,zIndexOffset:7,transformScaleX:o.thumbS,transformScaleY:o.thumbS,pointerEvents:"none",children:b($,{display:o.thumbIconD,src:j.grip,width:hi,height:hi})}),b(M,{label:"A",left:o.abAL,display:o.abOnD,onPointerDown:x("a")}),b(M,{label:"B",left:o.abBL,display:o.abBD,onPointerDown:x("b")}),b(l,{x:te,y:i,w:U-te,h:.5}),ne(c,{idx:0,onClick:()=>this.onPresetCycle?.(),children:[b($,{src:j.bulb,width:20,height:20}),b(ee,{fontSize:10,fontWeight:"bold",color:N,children:o.presetT})]}),b(l,{x:te+Ne,y:i,w:.5,h:ze}),ne(c,{idx:1,onClick:()=>this.onMuteToggle?.(),children:[b($,{display:o.icA,src:j.mute,width:20,height:20}),b($,{display:o.icB,src:j.vol,width:20,height:20}),b(ee,{fontSize:10,fontWeight:"bold",color:N,children:o.muteLbl})]}),b(l,{x:te+Ne*2,y:i,w:.5,h:ze}),ne(c,{idx:2,onClick:()=>this.onScaleLockToggle?.(),children:[b($,{src:j.scale,width:20,height:20}),b(ee,{fontSize:10,fontWeight:"bold",color:N,children:o.sclLkLbl})]}),b(l,{x:te+Ne*3,y:i,w:.5,h:ze}),ne(c,{idx:3,active:o.abOnD,onClick:()=>this.onAbLoopToggle?.(),children:[b($,{display:o.abOffD,src:j.loop,width:20,height:20}),b($,{display:o.abOnD,src:j.loopOn,width:20,height:20}),b(ee,{fontSize:10,fontWeight:"bold",color:o.abTxtC,children:o.abLbl})]}),b(l,{x:te+Ne*4,y:i,w:.5,h:ze}),ne(c,{idx:4,onClick:()=>this.onLockToggle?.(),children:[b($,{display:o.lockA,src:j.unlk,width:20,height:20}),b($,{display:o.lockB,src:j.lock,width:20,height:20}),b(ee,{fontSize:10,fontWeight:"bold",color:N,children:o.lockLbl})]}),b(l,{x:te+Ne*5,y:i,w:.5,h:ze}),ne(c,{idx:5,onClick:()=>this.onReset?.(),children:[b($,{src:j.reset,width:20,height:20}),b(ee,{fontSize:10,fontWeight:"bold",color:N,children:"RESET SCENE"})]}),b(l,{x:te+Ne*6,y:i,w:.5,h:ze}),ne(c,{idx:6,onClick:()=>this.onExit?.(),children:[b($,{src:j.exit,width:20,height:20}),b(ee,{fontSize:10,fontWeight:"bold",color:N,children:"EXIT"})]}),b(l,{x:0,y:n,w:U,h:.5}),b(O,{positionType:"absolute",positionLeft:0,positionTop:n+1,width:U,height:xa-1,backgroundColor:he,hover:it,alignItems:"center",justifyContent:"center",onPointerDown:B,onPointerUp:G,children:b(ee,{fontSize:12,color:N,opacity:.45,pointerEvents:"none",children:"DRAG TO MOVE THE MENU"})}),b(O,{positionType:"absolute",positionLeft:U-ir-4,positionTop:(Te-ir)/2,width:ir,height:ir,borderRadius:ir/2,backgroundColor:he,backgroundOpacity:.8,borderWidth:1,borderColor:N,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",zIndexOffset:10,onClick:()=>this.onClose?.(),children:b($,{src:j.close,width:12,height:12,pointerEvents:"none"})}),b(O,{positionType:"absolute",positionLeft:0,positionTop:0,width:U,height:.5,backgroundColor:N,backgroundOpacity:.3,zIndexOffset:10}),b(O,{positionType:"absolute",positionLeft:0,positionTop:a-.5,width:U,height:.5,backgroundColor:N,backgroundOpacity:.3,zIndexOffset:10}),b(O,{positionType:"absolute",positionLeft:0,positionTop:0,width:.5,height:a,backgroundColor:N,backgroundOpacity:.3,zIndexOffset:10}),b(O,{positionType:"absolute",positionLeft:U-.5,positionTop:0,width:.5,height:a,backgroundColor:N,backgroundOpacity:.3,zIndexOffset:10})]}),b(O,{positionType:"absolute",positionLeft:0,positionTop:0,width:U,height:a,backgroundColor:he,backgroundOpacity:1,display:o.loadingD,alignItems:"center",justifyContent:"center",children:b($,{src:j.spin,width:64,height:64,transformRotateZ:o.spinR,pointerEvents:"none"})})]});await u.mountReact(L)}};var Rt=class{#e;#r;#t;#i=null;#s;#n;#o;constructor(e){this.#e=e,this.#r=new e.Scene,this.#t=new e.Group,this.#r.add(this.#t),this.#s=new e.Vector3,this.#n=new e.Vector3,this.#o=new e.Raycaster}get scene(){return this.#r}get anchor(){return this.#t}get bboxMesh(){return this.#i}get hasBBox(){return!!this.#i}rebuildBBox(e,t){let r=this.#e;this.#i&&(this.#t.remove(this.#i),this.#i.geometry.dispose(),this.#i.material.dispose());let i=(e.minX+e.maxX)/2,n=(e.minY+e.maxY)/2,a=(e.minZ+e.maxZ)/2,o=new r.Box3(new r.Vector3(e.minX,e.minY,e.minZ),new r.Vector3(e.maxX,e.maxY,e.maxZ)).applyMatrix4(new r.Matrix4().fromArray(t)),l=o.getSize(new r.Vector3).max(new r.Vector3(.1,.1,.1)),h=o.getCenter(new r.Vector3),c=new r.BoxGeometry(l.x,l.y,l.z);return this.#i=new r.Mesh(c,new r.MeshBasicMaterial({visible:!1,side:r.DoubleSide})),this.#i.position.copy(h),this.#t.add(this.#i),{cx:i,cy:n,cz:a}}applyTransform(e,t){this.#t.position.set(e[0],e[1],e[2]),this.#t.scale.set(t,t,-t),this.#t.quaternion.identity(),this.#t.updateMatrixWorld(!0)}hitTest(e){if(!this.#i)return!1;let t=e.position,r=e.orientation;return this.#s.set(t.x,t.y,t.z),this.#n.set(-2*(r.w*r.y+r.x*r.z),-2*(r.y*r.z-r.w*r.x),2*(r.x*r.x+r.y*r.y)-1),this.#o.set(this.#s,this.#n),this.#o.intersectObject(this.#i,!1).length>0}};import{computed as _a,signal as Me}from"@preact/signals-core";import{Container as Ue,Fullscreen as Ah,Svg as Ih,Text as di}from"@react-three/uikit";import{Fragment as Nh,jsx as Z,jsxs as Is}from"react/jsx-runtime";var je=9684710,fi=1122603,ar=4,oe=680,Qe=72,Et=56,Sa=Qe+Et*ar,Ct=24,As=80,or=26,Fh=3,Oh=40,Bh=48,Ta=.85,Gh={backgroundColor:1849416},Ma=.8,Fs=.9,Os=-.1,Dh="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#93c6e6"/></svg>'),Pa=(s,e)=>{let t=String(s).toUpperCase();return t.length>e?`${t.slice(0,e-2)}...`:t},Ra="CHOOSE WHAT HAPPENS NEXT",mi=class{#e;#r=null;#t=new Array(ar).fill(null);onSelect=null;onDismiss=null;constructor(e){this.#e=new ke(e,{pixelWidth:oe,pixelHeight:Sa,worldWidth:Ma,worldHeight:Ma*Sa/oe,quadZ:Fs,quadY:Os,react:!0,cursorFactory:t=>{let r=new t.Mesh(new t.CircleGeometry(5,32),new t.MeshBasicMaterial({color:je,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return r.renderOrder=999,r}}),this.#e.alpha=1,this.#i().catch(t=>{})}get quad(){return this.#e}update({prompt:e,secondsLeft:t,timeoutSec:r}){let i=this.#r;if(!i)return;let n=e?.options??[];i.title.value=Pa(e?.title||Ra,Oh),i.rows.value=Math.min(n.length,ar);let a=n.length>0&&t!==null;i.secondsD.value=a?"flex":"none",i.seconds.value=a?`${t} S`:"",i.progressW.value=a?oe*Math.min(1,Math.max(0,1-t/r)):0,i.closeD.value=e?.isReopened?"flex":"none";for(let o=0;o<ar;o++){let l=n[o],h=i.options[o],c=!!l&&l.order===e?.selected;h.d.value=l?"flex":"none",l&&(h.lbl.value=Pa(l.label,Bh)),h.fillD.value=c?"flex":"none",h.lblD.value=l&&!c?"flex":"none",h.lblActD.value=c?"flex":"none",this.#t[o]=l?.order??null}}dispose(){this.#e.dispose()}async#i(){let e=Me(0),t=this.#r={title:Me(Ra),rows:e,seconds:Me(""),secondsD:Me("none"),progressW:Me(0),closeD:Me("none"),options:Array.from({length:ar},()=>({d:Me("none"),fillD:Me("none"),lbl:Me(""),lblD:Me("flex"),lblActD:Me("none")}))},r=_a(()=>Qe+Et*e.value),i=_a(()=>r.value-.5),n=({x:l,y:h,w:c,h:u,display:p})=>Z(Ue,{positionType:"absolute",positionLeft:l,positionTop:h,width:c,height:u,backgroundColor:je,backgroundOpacity:.3,display:p,zIndexOffset:3,pointerEvents:"none"}),a=({row:l,index:h})=>{let c=Qe+h*Et;return Is(Nh,{children:[Z(Ue,{positionType:"absolute",positionLeft:0,positionTop:c,width:oe,height:Et,backgroundColor:fi,hover:Gh,display:l.d,onClick:()=>{let u=this.#t[h];u!=null&&this.onSelect?.(u)}}),Z(Ue,{positionType:"absolute",positionLeft:0,positionTop:c,width:oe,height:Et,backgroundColor:je,backgroundOpacity:Ta,display:l.fillD,zIndexOffset:1,pointerEvents:"none"}),Is(Ue,{positionType:"absolute",positionLeft:Ct,positionTop:c,width:oe-Ct*2,height:Et,alignItems:"center",justifyContent:"center",wordBreak:"keep-all",display:l.d,zIndexOffset:2,pointerEvents:"none",children:[Z(di,{fontSize:15,fontWeight:"bold",color:je,display:l.lblD,children:l.lbl}),Z(di,{fontSize:15,fontWeight:"bold",color:fi,display:l.lblActD,children:l.lbl})]}),h>0&&Z(n,{x:0,y:c,w:oe,h:.5,display:l.d})]})},o=Is(Ah,{backgroundOpacity:0,children:[Z(Ue,{positionType:"absolute",positionLeft:0,positionTop:0,width:oe,height:r,backgroundColor:fi}),Z(Ue,{positionType:"absolute",positionLeft:Ct,positionTop:0,width:oe-Ct*2-As,height:Qe,alignItems:"center",pointerEvents:"none",children:Z(di,{fontSize:20,fontWeight:"bold",color:je,children:t.title})}),Z(Ue,{positionType:"absolute",positionLeft:oe-Ct-As,positionTop:0,width:As,height:Qe,alignItems:"center",justifyContent:"flex-end",display:t.secondsD,pointerEvents:"none",children:Z(di,{fontSize:20,fontWeight:"bold",color:je,children:t.seconds})}),Z(Ue,{positionType:"absolute",positionLeft:oe-Ct-or,positionTop:(Qe-or)/2,width:or,height:or,borderRadius:or/2,backgroundColor:fi,backgroundOpacity:.8,borderWidth:1,borderColor:je,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",display:t.closeD,zIndexOffset:10,onClick:()=>this.onDismiss?.(),children:Z(Ih,{src:Dh,width:12,height:12,pointerEvents:"none"})}),Z(n,{x:0,y:Qe,w:oe,h:.5}),Z(Ue,{positionType:"absolute",positionLeft:0,positionTop:Qe,width:t.progressW,height:Fh,backgroundColor:je,backgroundOpacity:Ta,display:t.secondsD,zIndexOffset:4,pointerEvents:"none"}),t.options.map((l,h)=>Z(a,{row:l,index:h},h)),Z(n,{x:0,y:0,w:oe,h:.5}),Z(n,{x:0,y:i,w:oe,h:.5}),Z(n,{x:0,y:0,w:.5,h:r}),Z(n,{x:oe-.5,y:0,w:.5,h:r})]});await this.#e.mountReact(o)}};var Lt=class s{#e;#r;#t;#i;#s;#n;static#o=1.5;static#c=.04;static#a=.15;static#l=4;static#u=20;static#h=.003;static#d=.001;static#p=.7;constructor(e,t){this.#e=e,this.#r=this.#f(),this.#t=this.#f(),this.#i=this.#m(),this.#s=this.#m(),this.#n=new e.Vector3,t.add(this.#r.group,this.#t.group,this.#i,this.#s)}update(e,t,r,i=!0){this.#g(this.#r,this.#i,i?e:null,r?.[0]),this.#g(this.#t,this.#s,i?t:null,r?.[1])}dispose(){for(let e of[this.#r,this.#t])e.mesh.geometry.dispose(),e.mesh.material.dispose();for(let e of[this.#i,this.#s])e.geometry.dispose(),e.material.dispose()}#f(){let e=this.#e,t=s.#l,r=s.#u,i=s.#o,n=s.#c,a=s.#a,o=s.#h,l=s.#d,h=s.#p,c=r+1,u=t+1,p=c*u,f=new Float32Array(p*3),m=new Float32Array(p*4),d=[];for(let v=0;v<c;v++){let T=v/r,M=-n-T*i,B=o+(l-o)*T,G=Math.min(T/a,1),L=1-T,w=h*G*L;for(let P=0;P<=t;P++){let I=P/t*Math.PI*2,k=v*u+P;f[k*3]=Math.cos(I)*B,f[k*3+1]=Math.sin(I)*B,f[k*3+2]=M,m[k*4]=1,m[k*4+1]=1,m[k*4+2]=1,m[k*4+3]=w}}for(let v=0;v<r;v++)for(let T=0;T<t;T++){let M=v*u+T,B=M+1,G=M+u,L=G+1;d.push(M,G,B,B,G,L)}let g=new e.BufferGeometry;g.setAttribute("position",new e.BufferAttribute(f,3)),g.setAttribute("color",new e.BufferAttribute(m,4)),g.setIndex(d);let y=new e.MeshBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),_=new e.Mesh(g,y);_.frustumCulled=!1,_.renderOrder=998;let x=new e.Group;return x.add(_),x.visible=!1,{mesh:_,group:x}}#m(){let e=this.#e,t=new e.RingGeometry(.004,.008,24),r=new e.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),i=new e.Mesh(t,r);return i.frustumCulled=!1,i.renderOrder=999,i.visible=!1,i}#g(e,t,r,i){if(!r?.active||!r.rayTransform||r.isTransientPointer){e.group.visible=!1,t.visible=!1;return}let n=r.rayTransform.position,a=r.rayTransform.orientation;e.group.position.set(n.x,n.y,n.z),e.group.quaternion.set(a.x,a.y,a.z,a.w),e.group.visible=!0,e.group.updateMatrixWorld(!0);let o=r.triggerPressed??!1;if(e.mesh.material.color.setRGB(o?.4:1,o?.75:1,1),i?.visible){let l=this.#n.set(n.x,n.y,n.z).distanceTo(i.position),h=s.#c+s.#o;e.mesh.scale.z=Math.min(1,l/h),t.position.copy(i.position),t.quaternion.set(a.x,a.y,a.z,a.w),t.visible=!0,t.updateMatrixWorld(!0)}else e.mesh.scale.z=1,t.visible=!1}};import{Fullscreen as zh}from"@react-three/uikit";import{jsx as Hh}from"react/jsx-runtime";var Xh=0,Uh=.55,Vh=4,Wh=3,Bs=.7,Gs=0,gi=class{#e;constructor(e){this.#e=new ke(e,{pixelWidth:64,pixelHeight:48,worldWidth:Vh,worldHeight:Wh,quadZ:Bs,quadY:Gs,react:!0}),this.#e.alpha=Uh,this.#e.mountReact(Hh(zh,{backgroundColor:Xh})).catch(t=>{})}get quad(){return this.#e}dispose(){this.#e.dispose()}};var yi=(s,e)=>e||!s?s:{...s,rayTransform:null},Ds=s=>s?.menuPressed?{...s,menuPressed:!1}:s,kt=Object.keys(Ht),Ca=s=>!Number.isFinite(s)||s<0?"0:00":`${~~(s/60)}:${String(~~s%60).padStart(2,"0")}`,Ns=s=>s.toUpperCase(),Ea=s=>Math.max(.1,s*.01);var At=class{#e;#r;#t;#i=null;#s=null;#n=null;#o=!1;#c=null;#a=!1;#l=null;#u=null;#h=null;#d=null;#p=null;#f=null;#m=!1;#g=0;#y=0;#T=0;#w=kt.indexOf("off");#_=Ns("off");#P=1;#x=!1;#b=!0;#M="off";#v=[];#S=0;#R=!0;#E=null;#C=null;#A=null;#V=null;#N=null;#z=null;#L=null;#W;#I=null;#O=null;#H=null;#B=null;#G=null;#F=null;constructor(e,{debug:t=!1,uiStyle:r="modern",rays:i=!0}={}){this.#e=e,this.#r=t,this.#t=r,this.#W=i}get uiStyle(){return this.#t}set uiStyle(e){this.#t=e}set manipulator(e){this.#l=e}get manipulator(){return this.#l}get uiActive(){return this.#D?!0:!this.#R&&(this.#i?.quad.interacting??!1)}get uiDragging(){if(this.#R)return!1;let e=this.#i?.quad;return(e?.dragging||e?.panelDragging)??!1}get quads(){return[this.#i?.quad,this.#n?.quad,this.#s?.quad].filter(Boolean)}get#X(){return[this.#i?.quad,this.#s?.quad].filter(Boolean)}get#k(){return[this.#i?.quad,this.#n?.quad,this.#s?.quad].filter(Boolean)}set sources(e){this.#v=e??[],this.#S=Math.min(this.#S,Math.max(0,this.#v.length-1))}get sources(){return this.#v}set sceneIndex(e){this.#v.length&&(this.#S=Math.max(0,Math.min(this.#v.length-1,e)),this.#R=!0)}get sceneIndex(){return this.#S}set onSceneChange(e){this.#V=e}get onSceneChange(){return this.#V}set onPresetChange(e){this.#A=e}get onPresetChange(){return this.#A}set onLock(e){this.#N=e}get onLock(){return this.#N}set onScaleLock(e){this.#z=e}get onScaleLock(){return this.#z}set scenario(e){let t=!!e?.prompt&&!this.#C?.prompt,r=!e?.prompt&&!!this.#C?.prompt;this.#C=e,t?this.#$():r&&(this.#s?.quad.hide(),this.#n?.quad.hide(),this.#Y(!1)),this.#q()}get scenario(){return this.#C}set bannerText(e){this.#E=e}get bannerText(){return this.#E}set eventLogger(e){this.#L=e}get eventLogger(){return this.#L}setPreset(e,t=this.#P){this.#P=t,this.syncPreset(e),this.#te(this.#u,e,t)}syncPreset(e){let t=kt.indexOf(e);t<0||(this.#w=t,this.#_=Ns(e))}async init(e,t,r,i,n,a=!1,o=null){this.#u=e,this.#m=!!o;let l=this.#e,h=this.#r||this.#W,c=!!this.#C;this.#i=this.#t==="modern"?new Pt(l,{strip:c}):new wt(l),c&&(this.#s=new mi(l),this.#n=new gi(l),this.#I=new l.Vector3,this.#O=new l.Vector3,this.#H=new l.Quaternion),this.#ee(e,t);let u=h?new Rt(l):null;if(this.#F=u,u&&this.#l?.setOverlay(u),this.#x=this.#v[this.#S]?.locked??this.#x,this.#b=this.#v[this.#S]?.scaleLocked??this.#b,this.#l&&(this.#l.locked=this.#x,this.#l.scaleLocked=this.#b),this.#te(e,kt[this.#w],this.#P),u){for(let d of this.#X){d.hitMesh&&u.scene.add(d.hitMesh);for(let g of d.hitSpheres)u.scene.add(g)}this.#r&&(this.#B=new St(l,u)),this.#W&&(this.#G=new Lt(l,u.scene))}o&&u?this.#f=new gt(l,o.device,o.format):h&&u&&(this.#h=new l.WebGLRenderer({context:n,canvas:n.canvas}),this.#h.autoClear=!1,this.#d=new l.PerspectiveCamera(50,1,.01,1e4),this.#d.matrixAutoUpdate=!1,this.#p=new l.WebGLRenderTarget(1,1),this.#h.setRenderTarget(this.#p),this.#h.setRenderTarget(null));let p=await this.#i.quad.init(t,r,i,n,o),f=await this.#n?.quad.init(t,r,i,n,o),m=await this.#s?.quad.init(t,r,i,n,o);return this.#C?.prompt&&this.#$(),this.#g=setTimeout(()=>{this.#a=!0,this.#q()},1e3),[p,f,m].filter(Boolean)}frame(e,t,r,i,n,a){this.#ie(a);let o=this.#i?.quad,l=this.#l?.leftHand,h=this.#l?.rightHand;if(o?.updatePosition(i),this.#s?this.#j(i,l,h):(o?.handleInput(l,h,i),this.#G?.update(l,h,o?.hitSpheres,!!o?.visible)),this.#B?.update(l,h),o?.panelDragging&&this.#l?.reset(),this.#se(e,a),this.#i?.render(e),!this.#m)for(let c of this.#k)c.drawContent(t)}renderEye(e,t,r,i,n,a,o){for(let l of this.#k)l.renderEye(e,r,i,n,a,o);!this.#h||!this.#F||(this.#d.projectionMatrix.fromArray(r.projectionMatrix),this.#d.projectionMatrixInverse.copy(this.#d.projectionMatrix).invert(),this.#d.matrix.fromArray(r.transform.matrix),this.#d.matrixWorld.copy(this.#d.matrix),this.#d.matrixWorldInverse.fromArray(r.transform.inverse.matrix),this.#h.resetState(),this.#h.setRenderTargetFramebuffer(this.#p,t),this.#h.setRenderTarget(this.#p),this.#h.setViewport(i,n,a,o),this.#h.setScissor(i,n,a,o),this.#h.setScissorTest(!0),this.#h.clearDepth(),this.#h.render(this.#F.scene,this.#d),this.#h.resetState(),e.bindFramebuffer(e.FRAMEBUFFER,t))}renderViews(e,t){for(let r of this.#k)r.drawContent(t),r.renderViews(e);this.#f?.render(e,this.#F.scene)}onRefReset(){this.#i?.quad.recenter(),this.#n?.quad.visible&&this.#n.quad.show(),this.#s?.quad.visible&&(this.#o=!0,this.#s.quad.show())}render(e,t){}dispose(){clearTimeout(this.#g),this.#a=!1,this.#M!=="off"&&this.#U(this.#u),this.#B?.dispose(),this.#B=null,this.#G?.dispose(),this.#G=null,this.#F=null,this.#h?.dispose(),this.#h=null,this.#p?.dispose(),this.#p=null,this.#d=null,this.#i?.quad.dispose(),this.#i=null,this.#s?.dispose(),this.#s=null,this.#n?.dispose(),this.#n=null,this.#o=!1,this.#c=null,this.#f?.dispose(),this.#f=null,this.#l?.reset(),this.#l=null,this.#y=0}get#D(){return!!this.#s?.quad.visible}#$(){this.#o=!0,this.#s?.quad.show(),this.#n?.quad.show(),this.#Y(!0)}#Y(e){let t=this.#l;t&&(e?(this.#c===null&&(this.#c=t.locked),t.locked=!0):this.#c!==null&&(t.locked=this.#c,this.#c=null))}#q(){!this.#a||this.#C?.prompt?.isStart||(this.#a=!1,this.#i?.quad.show())}#j(e,t,r){let i=this.#i?.quad,n=this.#s.quad,a=this.#n?.quad,o=this.#D;a&&e&&(a.updatePosition(e),a.visible&&Ts(a,e,Bs,Gs));let l=n.placing;n.updatePosition(e),l&&this.#o&&e&&(this.#o=!1,Ts(n,e,Fs,Os));let h=this.#J(t,r),c=(u,p)=>o?Ds(yi(u,!1)):yi(u,p);i?.handleInput(c(t,h.left===i),c(r,h.right===i),e),n.handleInput(Ds(yi(t,h.left===n)),Ds(yi(r,h.right===n)),e),this.#G?.update(t,r,[h.left?.hitSpheres[0]??null,h.right?.hitSpheres[1]??null],!!(i?.visible||n.visible))}#J(e,t){let r={left:null,right:null},i=this.#D?[this.#s.quad]:this.#X.filter(a=>a.visible);if(!i.length)return r;let n=i.find(a=>a.panelDragging||a.dragging);if(n)return{left:n,right:n};for(let[a,o]of[["left",e],["right",t]]){if(!o?.active||!o.rayTransform||o.held)continue;let l=o.rayTransform.position,h=o.rayTransform.orientation;this.#I.set(l.x,l.y,l.z),this.#O.set(0,0,-1).applyQuaternion(this.#H.set(h.x,h.y,h.z,h.w));let c=a==="left"?0:1,u=null,p=1/0;for(let f of i){if(!f.rayHitQuad(this.#I,this.#O,c))continue;let m=this.#I.distanceTo(f.hitSpheres[c].position);m<p&&(p=m,u=f)}r[a]=u}return r}#ee(e,t){let r=this.#i;r.onPlayPause=()=>{(e?.isBuffering??!1)||(e?.isPlaying?e.pause():e.play(),this.#L?.event?.("play_pause",{playing:!e?.isPlaying}))},r.onSeek=n=>{e?.seek?.(n*(e?.duration??0)),this.#L?.event?.("seek",{position:n})},r.onPresetCycle=()=>{let n=kt[(this.#w+1)%kt.length];this.#te(e,n,this.#P),this.#A?.(n),this.#L?.event?.("preset_cycle",{preset:n})},r.onExit=()=>{this.#L?.event?.("exit"),t?.end()},r.onClose=()=>{r.quad.hide()},r.onSceneNav=n=>{let a=this.#C;if(a){this.#L?.event?.("scene_nav",{dir:n}),n>0?a.stepForward():a.stepBack();return}if(!this.#v.length)return;let o=Math.max(0,Math.min(this.#v.length-1,this.#S+n));o!==this.#S&&(this.#S=o,this.#R=!0,this.#K(),this.#V?.(this.#v[this.#S],this.#S),this.#L?.event?.("scene_nav",{index:o,label:this.#v[o]?.label,dir:n}))},r.onSceneSelect=n=>{this.#L?.event?.("scene_select",{order:n}),this.#C?.goTo(n)},r.onSceneAction=n=>{this.#L?.event?.("scene_action",{order:n}),this.#C?.reopenFork(n)};let i=this.#s;i&&(i.onSelect=n=>{this.#L?.event?.("prompt_select",{order:n}),this.#C?.choose(n)},i.onDismiss=()=>{this.#L?.event?.("prompt_dismiss"),this.#C?.dismissPrompt()}),this.#t==="modern"&&(r.onMuteToggle=()=>{let n=this.#re(e);this.#L?.event?.("mute_toggle",{muted:!n})},r.onReset=()=>{this.#l?.resetToInitial(),this.#L?.event?.("reset")},r.onLockToggle=()=>{this.#x=!this.#x,this.#l&&(this.#l.locked=this.#x),this.#N?.(this.#x),this.#L?.event?.("lock_toggle",{locked:this.#x})},r.onAbLoopToggle=()=>{this.#M==="off"?this.#Q(e):this.#U(e),this.#L?.event?.("ab_loop_toggle",{enabled:this.#M!=="off"})},r.onAbLoopSet=(n,a)=>{if(this.#M==="off")return;let o=e.duration;this.#Z(e,n*o,a*o),this.#M="active",this.#L?.event?.("ab_loop_set",e.playbackRange)},r.onScaleLockToggle=()=>{this.#b=!this.#b,this.#l&&(this.#l.scaleLocked=this.#b),this.#z?.(this.#b),this.#L?.event?.("scale_lock_toggle",{scaleLocked:this.#b})})}#Q(e){let t=e?.duration??0;t<=0||(this.#Z(e,e.currentTime,t),this.#M="setB")}#Z(e,t,r){let i=e.duration,n=Ea(i),a=S.clamp(t,0,i-n);e.setPlaybackRange(a,S.clamp(r,a+n,i))}#U(e){e?.clearPlaybackRange(),this.#M="off"}#K(){this.#x=this.#v[this.#S]?.locked??this.#x,this.#b=this.#v[this.#S]?.scaleLocked??this.#b}#re(e){let t=!(e?.audioEnabled??!1);return t?e?.enableAudio?.():e?.disableAudio?.(),t}#te(e,t,r=1){let i=kt.indexOf(t);if(i<0)return;this.#w=i,this.#_=Ns(t);let n=Ht[t];n?e?.setEnvLighting(We(n),r):e?.clearEnvLighting()}#ie(e){!this.#R||!e.duration||(this.#R=!1,this.#M="off",this.#x=this.#v[this.#S]?.locked??this.#x,this.#b=this.#v[this.#S]?.scaleLocked??this.#b)}#se(e,t){let r=!(t?.audioEnabled??!1);if(this.#R)this.#i?.update({loading:!0,muted:r,locked:this.#x,scaleLocked:this.#b,sceneText:this.#v.length?`${this.#S+1}/${this.#v.length}`:"1/1",sceneLabel:(this.#v[this.#S]?.label??"SCENE").toUpperCase(),bannerText:this.#E,scenario:this.#C});else{let i=t?.isBuffering??!1,n=t?.duration??0;n>0&&(this.#T=n);let a=this.#T,o=t?.currentTime??0,l=p=>p/(a||1),h=S.clamp01(l(o)),{start:c,end:u}=t.playbackRange;this.#i?.update({loading:!1,playing:t?.isPlaying??!1,spinning:i,buffering:i,progress:h,timeText:`${Ca(o)} / ${Ca(a)}`,presetName:this.#_,muted:r,locked:this.#x,scaleLocked:this.#b,abLoop:{phase:this.#M,start:l(c),end:l(u),gap:l(Ea(a))},sceneText:this.#v.length?`${this.#S+1}/${this.#v.length}`:"1/1",sceneLabel:(this.#v[this.#S]?.label??"SCENE").toUpperCase(),bannerText:this.#E,scenario:this.#C})}this.#s?.update({prompt:this.#C?.prompt??null,secondsLeft:this.#C?.secondsLeft??null,timeoutSec:this.#C?.choiceTimeoutSec??1}),this.#ne(e)}#ne(e){if(this.#D)return;if(this.#y>0){this.#y-=e;return}let t=this.#l?.leftHand.microSwipe||this.#l?.rightHand.microSwipe;t&&(this.#y=.45,this.#i?.onSceneNav(t))}};import{useState as Yh}from"react";import*as qh from"three";function zs(){let[s]=Yh(()=>new yt(qh));return s}import{useEffect as La,useRef as Zh,useState as $h}from"react";function Xs(s,e,t){let[r,i]=$h(!1);La(()=>{let o=s.current;if(!o)return;let l=()=>i(!0),h=c=>{c.touches.length>1&&l()};return o.addEventListener("pointerdown",l),o.addEventListener("wheel",l),o.addEventListener("touchmove",h),()=>{o.removeEventListener("pointerdown",l),o.removeEventListener("wheel",l),o.removeEventListener("touchmove",h)}},[s]);let n=Zh(e);return La(()=>{n.current!==e&&(n.current=e,i(!1))},[e]),{hasInteracted:r,resetView:()=>{t.reset(),i(!1)}}}import{useEffect as jh,useState as Qh}from"react";var Kh=500;function Us(s,e=Kh){let[t,r]=Qh(!1);return jh(()=>{if(!s){r(!1);return}let i=setTimeout(()=>r(!0),e);return()=>clearTimeout(i)},[s,e]),s&&t}import{useEffect as Jh,useRef as eu,useState as tu}from"react";var ru=2e3;function Vs({coreError:s,interactionError:e,isSceneReady:t,currentSource:r,open:i,clearError:n}){let[a,o]=tu(null),l=eu(new WeakMap);e?.phase&&l.current.set(e.error,e.phase);let h=s&&e?.error===s?e.phase:s?l.current.get(s):void 0,c=s?{error:s,phase:h}:e,u=c?Mo(c.error,t,c.phase):null,p=u?.presentation==="blocking",f=u?.presentation==="toast"&&u.cause!==a?u:null,m=f?.cause??null;return Jh(()=>{if(!m)return;let y=setTimeout(()=>{o(m),n()},ru);return()=>clearTimeout(y)},[m,n]),{playerError:u,isBlocking:!!p,toast:f,retry:()=>r?i(r):window.location.reload(),dismiss:()=>{f&&o(f.cause),n()}}}import{useCallback as iu,useEffect as su,useState as nu}from"react";function Ws(s,e){let[t,r]=nu(!1),i=iu(async()=>{let n=s.current;if(!(!n||typeof document>"u"))try{document.fullscreenElement===n?await document.exitFullscreen():await n.requestFullscreen()}catch(a){e(Be(a),{phase:"fullscreen"})}},[e,s]);return su(()=>{if(typeof document>"u")return;let n=()=>r(document.fullscreenElement===s.current);return n(),document.addEventListener("fullscreenchange",n),()=>document.removeEventListener("fullscreenchange",n)},[s]),{isFullscreen:t,toggleFullscreen:i}}import{useRef as ou}from"react";function ka(s){let e=us(s.name);return{url:`${Kr}${s.name}`,label:s.name,file:s,...e?{type:wo}:{}}}async function au(s){return us(s.name)?ka(await s.getFile()):{url:`${Kr}${s.name}`,label:s.name,localFile:s}}function lu(){return typeof window>"u"?null:window.showOpenFilePicker??null}function cu(s){return s instanceof DOMException&&s.name==="AbortError"}function hu(s){let e=s.currentTarget.files?.[0];return s.currentTarget.value="",e?ka(e):null}function Hs({localFiles:s,logger:e,reportError:t,playlist:r,clearError:i}){let n=ou(null),a=!!s,o=c=>{i();let u=[...r.sources,c];r.setSources(u),r.goTo(u.length-1),e.event?.("local_file_open",{label:ce(c)})};return{enabled:a,fileInputProps:{ref:n,accept:bo,onChange:c=>{let u=hu(c);u&&o(u)}},localLabel:vo,openLocalFile:async()=>{if(!a)return;let c=lu();if(!c){n.current?.click();return}try{let p=(await c({types:[{description:"Volumetric video",accept:{"application/octet-stream":[...hs]}}]}))[0];p&&o(await au(p))}catch(u){cu(u)||t(Be(u),{phase:"local-file"})}}}}import{useRef as Ys}from"react";function qs(s){let{containerRef:e,muted:t=!1,moduleFactory:r,overlay:i,boundaryRenderer:n,xrBackend:a,eventLogger:o,onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p,onSceneEnd:f}=s,m=Ys({onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p});m.current={onReady:l,onProgress:h,onModeChange:c,onXRStart:u,onXREnd:p};let d=Ys(null),g=Ys(!1),y=Yr({containerRef:e,moduleFactory:r,moduleUrl:r?void 0:So(),overlay:i,boundaryRenderer:n,xrBackend:a,eventLogger:o,onReady(){g.current||(g.current=!0,t||d.current?.app?.enableAudio()),m.current.onReady?.()},onProgress:x=>m.current.onProgress?.(x),onModeChange:(x,v)=>m.current.onModeChange?.(x,v),onXRStart:()=>m.current.onXRStart?.(),onXREnd:()=>m.current.onXREnd?.()});d.current=y;let _=qr(y,{onSceneEnd:f});return{gracia:y,playlist:_}}import{useCallback as Zs,useMemo as Aa,useState as uu}from"react";function pu(s){switch(s){case"init":case"load":case"xr":case"streaming":case"scenario":case"fullscreen":case"local-file":return s;default:return}}function $s(s,e){let[t,r]=uu(null),i=Aa(()=>Do(s,e),[s,e]),n=Zs((h,c)=>{r({error:h,phase:pu(c?.phase)})},[]),a=Aa(()=>({event:(h,c)=>i.event?.(h,c),error:(h,c)=>{n(h,c),i.error?.(h,c)}}),[i,n]),o=Zs((h,c)=>{n(h,c),i.error?.(h,c)},[i,n]),l=Zs(()=>r(null),[]);return{interactionError:t,logger:a,reportError:o,clearError:l}}import{useEffect as Fa,useRef as Su}from"react";import{useEffect as du,useRef as fu}from"react";function js({isInitialized:s,sources:e,streaming:t,scenario:r,playlist:i,reportError:n}){let a=fu(n);a.current=n,du(()=>{if(!s)return;let o=!1,l=h=>{if(o||h.length===0)return;let c=$t(h,r),u=c.isBranching?Lo(c):[];if(u.length){a.current(new Error(`Invalid scenario: ${u.join("; ")}`),{phase:"scenario"});return}let p=Ao(h,r);i.setSources(p);let f=Io(p,r);f!==null&&i.goTo(f)};if(t?.length)return dt(t,To()).then(h=>l(Ro(h,t))).catch(h=>{o||a.current(Be(h),{phase:"streaming"})}),()=>{o=!0};l(e)},[s,e,t,r,i.setSources,i.goTo])}import{useCallback as Ie,useEffect as lr,useMemo as xi,useRef as bi,useState as Qs}from"react";var Ks=15,mu=.3;function Js({playlist:s,pack:e,timeLeft:t,onFork:r,onHold:i,onChoose:n,onDismiss:a}){let{sources:o,index:l,goTo:h}=s,c=xi(()=>$t(o,e),[o,e]),u=c?.order??[],p=l>=0?u[l]??l:-1,f=Ie(R=>h(u.indexOf(R)),[h,u]),[m,d]=Qs([-1]),[g,y]=Qs(null),[_,x]=Qs(null);lr(()=>{d([-1]),y(null)},[o]);let v=bi(g);v.current=g;let T=bi(a);T.current=a;let M=bi(i);M.current=i,lr(()=>{l<0||!c||(d(R=>{let{scenes:H,openFork:X}=jt(c,R);return H.includes(p)?R:X!==null&&Se(c,X).next.includes(p)?R.includes(X)?[...R,p]:[...R,X,p]:ps(c,-1,p)??[-1,p]}),v.current&&(y(null),T.current?.()))},[l,p,c]);let B=Ie(R=>{let H=o[u.indexOf(R)];return(c?Se(c,R)?.scenarioName:void 0)||(H?ce(H):`Scene ${R+1}`)},[c,o,u]),G=Ie((R,H=!1)=>{let X=c?Se(c,R):void 0;if(!c||!X||X.next.length<2)return;let le=Je(c,m,R);y({from:R,...X.modalTitle&&{title:X.modalTitle},options:ko(c,R,B),...le!==void 0&&{selected:le},...H&&{isReopened:!0}}),r?.(R,H)},[c,m,B,r]),L=Ie(R=>G(R,!0),[G]),w=Ie(()=>{y(null),a?.()},[a]),P=Ie(R=>{let H=c?Se(c,R)?.next:void 0;if(!c||!H?.length)return;if(H.length===1){f(H[0]);return}let X=Je(c,m,R);if(X!==void 0){f(X);return}M.current?.(),v.current?.from!==R&&G(R)},[c,m,f,G]),I=Ie(R=>{c?.isBranching&&P(c.order[R]??R)},[c,P]),k=Ie((R,H=!1)=>{let X=g?.from;X!==void 0&&(H||n?.(X,R,c?Se(c,R)?.scenarioName:void 0),d(le=>{let mr=le.indexOf(X);if(mr>=0)return[...le.slice(0,mr+1),R];if(!c)return[...le,X,R];let{scenes:Pi}=jt(c,le);return Pi.includes(X)?le[le.length-1]===X?[...le,R]:[...le,X,R]:[...ps(c,-1,X)??[-1,X],R]})),y(null),f(R)},[g,c,f,n]);lr(()=>{!c||l<0||v.current||t===void 0||t>mu||Je(c,m,p)===void 0&&G(p)},[c,l,p,m,t,G]),lr(()=>{!c||l>=0||v.current||jt(c,m).openFork===-1&&G(-1)},[c,l,m,G]);let F=bi(k);F.current=k,lr(()=>{if(!g||g.isReopened){x(null);return}x(Ks);let R=setInterval(()=>x(X=>X===null?null:Math.max(0,X-1)),1e3),H=setTimeout(()=>F.current(g.options[0].order,!0),Ks*1e3);return()=>{clearInterval(R),clearTimeout(H)}},[g]);let K=xi(()=>c?Fo(c,m,p,g?.from).map(R=>{if(R.isFork)return{...R,question:Se(c,R.forkFrom)?.modalTitle,answer:R.taken===void 0?void 0:B(R.taken)};let H=o[c.order.indexOf(R.order)];return R.order===void 0||!H?R:{...R,title:ce(H)}}):[],[c,m,p,g?.from,B,o]),be=xi(()=>c?jt(c,m):null,[c,m]),nt=xi(()=>g&&{...g,isStart:g.from===-1},[g]),Mi=Ie(()=>{let R=be?.scenes.indexOf(p)??-1;be&&R>0&&f(be.scenes[R-1])},[be,p,f]),fr=Ie(()=>{v.current||P(p)},[P,p]);return{isInteractive:!!c?.isBranching,chips:K,prompt:nt,secondsLeft:_,choiceTimeoutSec:Ks,stepBack:Mi,stepForward:fr,choose:k,reopenFork:L,dismissPrompt:w,goTo:f,handleSceneEnd:I}}import{useEffect as gu,useRef as Ia}from"react";function en({currentSource:s,index:e,onSceneChange:t}){let r=Ia(t);r.current=t;let i=Ia(null);gu(()=>{if(!s||e<0)return;let n=`${e}:${ce(s)}`;i.current!==n&&(i.current=n,r.current?.(s,e))},[s,e])}import{useEffect as yu,useState as xu}from"react";var bu=500;function tn(s,e,t){let[r,i]=xu(!1),n=ft(s.mode)?s.mode:null;yu(()=>{(!n||!s.xr.isActive)&&i(!1)},[n,s.xr.isActive]);let a=c=>{t(),i(!0),s.xr.setMode(c).catch(u=>{i(!1),e(Be(u),{phase:"xr",target:c})})},o=()=>{i(!1),s.xr.setMode(_e.PW).catch(c=>{e(Be(c),{phase:"xr",target:_e.PW})})},h=Us(r&&!s.error,bu)&&s.xr.isActive?n:null;return{enter:a,exit:o,activeScreenMode:h}}import{useRef as vu}from"react";import*as wu from"three";function _u(s){if(s===!1)return null;let{uiStyle:e="modern",bannerText:t="EARLY BETA"}=s??{};try{let r=new At(wu,{uiStyle:e});return r.bannerText=t,r}catch{return null}}function rn(s){let e=vu(void 0);return e.current===void 0&&(e.current=_u(s)),e.current}function sn(s,e){let{sources:t=[],streaming:r,scenario:i,muted:n=!1,cameraControls:a=!1,sceneSelector:o,moduleFactory:l,onReady:h,onProgress:c,onModeChange:u,onXRStart:p,onXREnd:f,onSceneChange:m,onError:d,eventLogger:g,localFiles:y,xrOverlay:_,xrBackend:x}=s,v=rn(_),T=zs(),{interactionError:M,logger:B,reportError:G,clearError:L}=$s(g,d);Fa(()=>{Jr()},[]);let w=Su(()=>{}),{gracia:P,playlist:I}=qs({containerRef:e.container,muted:n,moduleFactory:l,overlay:v,boundaryRenderer:T,xrBackend:x,eventLogger:B,onReady:h,onProgress:c,onModeChange:u,onXRStart:p,onXREnd:f,onSceneEnd:(gr,ot)=>w.current(ot)});js({isInitialized:P.isInitialized,sources:t,streaming:r,scenario:i,playlist:I,reportError:G});let k=P.isContentReady&&!P.isLoading,{playback:F}=P,K=Js({playlist:I,pack:i,timeLeft:k&&F.duration>0?F.duration-F.currentTime:void 0,onFork:(gr,ot)=>{ot&&F.pause(),B.event?.("scenario_prompt",{from:gr,reopened:ot})},onHold:()=>{F.pause(),P.app?.player?.seek(F.duration)},onChoose:(gr,ot,il)=>B.event?.("scenario_choose",{from:gr,to:ot,scenarioName:il}),onDismiss:()=>F.play()});w.current=K.handleSceneEnd,Fa(()=>{v&&(v.scenario=K.isInteractive?K:null)}),en({currentSource:I.currentSource,index:I.index,onSceneChange:m});let{fileInputProps:be,enabled:nt,localLabel:Mi,openLocalFile:fr}=Hs({localFiles:y,logger:B,reportError:G,playlist:I,clearError:L}),{isFullscreen:R,toggleFullscreen:H}=Ws(e.root,G),{playerError:X,isBlocking:le,toast:mr,retry:Pi,dismiss:tl}=Vs({coreError:P.error,interactionError:M,isSceneReady:k,currentSource:I.currentSource,open:P.open,clearError:L}),rl=!X&&!K.prompt&&(!P.isInitialized||!k),Ri=tn(P,G,L);return{contextValue:{gracia:P,playlist:I,scenario:K,config:{sceneSelector:o,cameraControls:a},refs:e,presentation:{isBusy:rl,isSceneReady:k,isBlocking:le,playerError:X,toast:mr,retry:Pi,dismiss:tl},shell:{isFullscreen:R,toggleFullscreen:H,localFilesEnabled:nt,fileInputProps:be,openLocalFile:fr,localLabel:Mi},xr:{enter:Ri.enter,exit:Ri.exit,activeScreenMode:le?null:Ri.activeScreenMode}},gracia:P,playlist:I,openLocalFile:fr,toggleFullscreen:H}}import{useEffect as Oa,useRef as Ba,useState as Tu}from"react";import{jsx as ae,jsxs as cr}from"react/jsx-runtime";var Mu=s=>{let e=t=>{let r=s.sources[t];return String(r.id??r.url??t)};return{segments:s.sources.map((t,r)=>({key:e(r),isActive:r===s.index})),rows:s.sources.map((t,r)=>({key:e(r),marker:Ye(t)?ae(He,{}):r+1,title:ce(t),isActive:r===s.index,select:()=>s.goTo(r)})),hasPrev:s.hasPrev,hasNext:s.hasNext,prev:s.prev,next:s.next}},Pu=s=>{let e=s.chips.filter(o=>o.order!==void 0||o.isFork),t=e.findIndex(o=>o.isActive),i=e.some(o=>o.isFork&&o.taken===void 0)?s.chips:e,n=0,a=i.map((o,l)=>o.isFork?{key:`fork-${o.forkFrom}`,marker:ae(yo,{}),title:o.question||"Choose what happens next",detail:o.branchNumber===void 0?"Not chosen":String(o.branchNumber),hint:o.answer,isActive:!!o.isOpen,select:()=>s.reopenFork(o.forkFrom)}:(n+=1,o.order===void 0?{key:`blank-${l}`,marker:n,title:"\u2013",isActive:!1,isBlank:!0,select:()=>{}}:{key:String(o.order),marker:o.label,title:o.title??`Scene ${o.label}`,isActive:!!o.isActive,select:()=>s.goTo(o.order)}));return{segments:i.map((o,l)=>({key:o.order===void 0?`blank-${l}`:String(o.order),isActive:!!o.isActive,isBlank:o.order===void 0,isFork:o.isFork})).filter(o=>!o.isFork),rows:a,hasPrev:t>0&&e.slice(0,t).some(o=>o.order!==void 0),hasNext:t>=0&&t<e.length-1,prev:s.stepBack,next:s.stepForward}},nn=()=>{let{playlist:s,scenario:e}=V(),t=Ba(null),r=Ba(s.index),[i,n]=Tu(!1),a=s.currentSource,o=a?ce(a):"Select scene",l=s.total>1,h=e.isInteractive?Pu(e):Mu(s);return Oa(()=>{r.current!==s.index&&(r.current=s.index,n(!1))},[s.index]),Oa(()=>{if(!i)return;let c=u=>{t.current&&!t.current.contains(u.target)&&n(!1)};return document.addEventListener("click",c),()=>document.removeEventListener("click",c)},[i]),cr("div",{ref:t,className:"gr-player__scene",children:[cr("div",{className:"gr-player__scene-inner",children:[cr("button",{className:"gr-player__scene-main",type:"button",disabled:!l,onClick:()=>n(!i),"aria-haspopup":"menu","aria-expanded":i,children:[ae(mo,{}),cr("span",{className:"gr-player__scene-main-copy",children:[ae("span",{className:"gr-player__scene-copy",children:ae("span",{className:"gr-player__scene-label",children:o})}),l&&ae("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:h.segments.map(c=>ae("span",{className:ie("gr-player__scene-segment",c.isActive&&"is-active",c.isBlank&&"gr-player__scene-segment--blank")},c.key))})]})]}),ae("button",{className:"gr-player__scene-nav",type:"button",disabled:!h.hasPrev,onClick:()=>h.prev(),"aria-label":"Previous scene",children:ae(jr,{})}),ae("button",{className:"gr-player__scene-nav",type:"button",disabled:!h.hasNext,onClick:()=>h.next(),"aria-label":"Next scene",children:ae(Qr,{})})]}),i&&l&&ae("div",{className:"gr-player__scene-menu",children:h.rows.map(c=>cr("button",{type:"button",className:ie("gr-player__scene-item",c.isActive&&"is-active"),disabled:c.isBlank,title:c.hint,"aria-label":c.isBlank?`Scene ${c.marker}, not reached yet`:void 0,onClick:()=>{c.select(),n(!1)},children:[ae("span",{children:c.marker}),ae("strong",{children:c.title}),c.detail&&ae("small",{children:c.detail})]},c.key))})]})};import{jsx as Pe,jsxs as on}from"react/jsx-runtime";var Ga=()=>{let{playlist:s}=V(),e=s.currentSource,t=Ye(e);return Pe("div",{className:"gr-player__scene gr-player__scene--stepper",children:on("div",{className:"gr-player__scene-inner",children:[Pe("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasPrev,onClick:()=>s.prev(),"aria-label":"Previous scene",children:Pe(jr,{})}),Pe("div",{className:"gr-player__scene-main",children:on("span",{className:"gr-player__scene-main-copy",children:[t&&e?on("span",{className:"gr-player__scene-count gr-player__scene-count--local",children:[Pe(He,{}),Pe("span",{className:"gr-player__scene-label",children:ce(e)})]}):Pe("span",{className:"gr-player__scene-count",children:s.index>=0?`${s.index+1} of ${s.total}`:`${s.total} scenes`}),Pe("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:s.sources.map((r,i)=>Pe("span",{className:ie("gr-player__scene-segment",i===s.index&&"is-active",Ye(r)&&"gr-player__scene-segment--local")},r.id??r.url??i))})]})}),Pe("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasNext,onClick:()=>s.next(),"aria-label":"Next scene",children:Pe(Qr,{})})]})})};import{useEffect as Ru,useRef as Cu}from"react";import{jsx as hr}from"react/jsx-runtime";var Da=()=>{let{playlist:s}=V(),e=Cu(null),t=s.index;return Ru(()=>{e.current?.querySelector(`.gr-player__scene-tab[data-scene-index="${t}"]`)?.scrollIntoView({block:"nearest",inline:"nearest"})},[t]),hr("div",{className:"gr-player__scene",children:hr("div",{className:"gr-player__scene-inner",children:hr("div",{ref:e,className:"gr-player__scene-tabs-scroll",children:s.sources.map((r,i)=>hr("button",{type:"button","data-scene-index":i,className:ie("gr-player__scene-tab",i===s.index&&"is-active",Ye(r)&&"gr-player__scene-tab--local"),onClick:()=>s.goTo(i),"aria-label":`Open ${ce(r)}`,"aria-current":i===s.index?"true":void 0,children:Ye(r)?hr(He,{}):i+1},r.id??r.url??i))})})})};import{jsx as Lu}from"react/jsx-runtime";var Eu={tabs:Da,stepper:Ga,menu:nn},vi=()=>{let{config:s,scenario:e}=V(),{sceneSelector:t=_o}=s,r=e.isInteractive?nn:Eu[t];return Lu(r,{})};import{useRef as Na,useState as ku}from"react";import{jsx as wi,jsxs as Au}from"react/jsx-runtime";var an=({progress:s,duration:e,onSeek:t,disabled:r=!1})=>{let i=Na(null),n=Na(!1),[a,o]=ku(0),l=u=>{if(!i.current)return 0;let p=i.current.getBoundingClientRect();return Math.min(1,Math.max(0,(u.clientX-p.left)/p.width))},h=u=>{e>0&&t(l(u)*e)},c=r?void 0:{onPointerDown(u){n.current=!0,u.currentTarget.setPointerCapture(u.pointerId),h(u)},onPointerMove(u){o(l(u)),n.current&&h(u)},onPointerLeave(){o(0)},onPointerUp(u){n.current=!1,u.currentTarget.releasePointerCapture(u.pointerId)},onPointerCancel(){n.current=!1}};return wi("div",{className:"gr-player__seek-shell","aria-disabled":r||void 0,children:Au("div",{ref:i,className:"gr-player__seek",role:"slider","aria-valuemin":0,"aria-valuemax":Math.max(e,0),"aria-valuenow":Math.round(s*Math.max(e,0)),"aria-disabled":r||void 0,tabIndex:r?-1:0,...c,children:[wi("span",{className:"gr-player__seek-fill",style:{width:`${s*100}%`}}),wi("span",{className:"gr-player__seek-hover",style:{width:`${a*100}%`}}),wi("span",{className:"gr-player__seek-thumb",style:{left:`${s*100}%`}})]})})};import{jsx as Fe,jsxs as za}from"react/jsx-runtime";function Iu(s,e){return e>0?Math.min(1,Math.max(0,s/e)):0}var Xa=()=>{let{gracia:s,playlist:e,presentation:t,shell:r}=V(),{isSceneReady:i}=t,{isFullscreen:n,toggleFullscreen:a}=r,{playback:o}=s,l=Iu(o.currentTime,o.duration);return za("div",{className:"gr-player__controls",children:[Fe(xe,{className:"gr-player__button--play",onClick:i?()=>o.togglePlay():void 0,"aria-label":o.isPlaying?"Pause":"Play","aria-disabled":!i||void 0,children:o.isPlaying?Fe(co,{}):Fe(lo,{})}),Fe(vi,{}),e.hasAudio&&Fe(qe,{className:"gr-player__mute",onClick:i?()=>o.toggleMute():void 0,"aria-label":o.isMuted?"Unmute":"Mute","aria-disabled":!i||void 0,children:o.isMuted?Fe(ho,{}):Fe(uo,{})}),Fe(an,{progress:l,duration:o.duration,onSeek:h=>o.seek(h),disabled:!i}),za("div",{className:"gr-player__time",children:[fs(o.currentTime)," / ",fs(o.duration)]}),Fe(qe,{variant:["icon","secondary"],className:"gr-player__fullscreen",onClick:a,"aria-label":n?"Exit fullscreen":"Enter fullscreen","aria-pressed":n,title:n?"Exit fullscreen":"Enter fullscreen",children:Fe(go,{active:n})})]})};import{useEffect as Ua,useRef as Fu,useState as Ou}from"react";import{jsx as ur,jsxs as ln}from"react/jsx-runtime";var Va=()=>{let{gracia:s,config:e,presentation:t}=V(),{isSceneReady:r,isBlocking:i}=t,[n,a]=Ou(!1),o=Fu(null),l=e.cameraControls&&r&&!i&&!ft(s.mode);if(Ua(()=>{l||a(!1)},[l]),Ua(()=>{if(!n)return;let u=f=>{o.current?.contains(f.target)||a(!1)},p=f=>{f.code==="Escape"&&a(!1)};return document.addEventListener("pointerdown",u),document.addEventListener("keydown",p),()=>{document.removeEventListener("pointerdown",u),document.removeEventListener("keydown",p)}},[n]),!l)return null;let{controlsType:h,setControls:c}=s.camera;return ln("div",{ref:o,className:"gr-player__camera-control",children:[ur(qe,{className:"gr-player__button--camera",onClick:()=>a(u=>!u),"aria-label":"Camera controls","aria-expanded":n,title:"Camera controls",srLabel:"Camera controls",children:ur(po,{})}),n&&ln("div",{className:"gr-player__camera-panel",role:"menu","aria-label":"Camera controls",children:[ur("div",{className:"gr-player__camera-title",children:"Camera"}),xo.map(u=>ln("button",{className:ie("gr-player__camera-option",u.type===h&&"is-active"),type:"button",role:"menuitemradio","aria-checked":u.type===h,onClick:()=>c(u.type),children:[ur("span",{className:"gr-player__camera-label",children:u.label}),ur("span",{className:"gr-player__camera-hint",children:u.hint})]},u.type))]})]})};import{jsx as pr,jsxs as Gu}from"react/jsx-runtime";var cn=({className:s})=>{let{gracia:e,presentation:t,xr:r}=V(),{isSceneReady:i,isBlocking:n}=t,{enter:a}=r;if(n)return null;let o=e.xr.arSupported?_e.AR:e.xr.vrSupported?_e.VR:null;if(!o)return null;let l=o===_e.AR;return pr("div",{className:["gr-player__xr-actions",s].filter(Boolean).join(" "),children:pr(Bu,{active:e.mode===o,disabled:!i,icon:l?pr($r,{}):pr(Zr,{}),label:l?"View in AR":"Play in VR",mode:o,onEnter:a})})},Bu=({active:s,disabled:e,icon:t,label:r,mode:i,onEnter:n})=>Gu(xe,{className:"gr-player__button--xr",onClick:e?void 0:()=>n(i),"aria-disabled":e||void 0,"aria-pressed":s||void 0,title:r,children:[pr("span",{children:r}),t]});import{jsx as It,jsxs as hn}from"react/jsx-runtime";var Wa=()=>{let{gracia:s,playlist:e,refs:t,presentation:r,shell:i}=V(),{isBlocking:n}=r,{localFilesEnabled:a,openLocalFile:o,localLabel:l}=i,{hasInteracted:h,resetView:c}=Xs(t.container,e.index,s.camera);return hn("div",{className:"gr-player__top",children:[hn("div",{className:"gr-player__top-left",children:[a&&It(qe,{className:"gr-player__button--local",onClick:o,"aria-label":l,title:l,srLabel:"Open local file",children:It(He,{})}),It(cn,{className:"gr-player__xr-actions--desktop"})]}),hn("div",{className:"gr-player__top-right",children:[It(Va,{}),It(cn,{className:"gr-player__xr-actions--mobile"}),!n&&h&&It(xe,{variant:"secondary",className:"gr-player__reset",onClick:c,children:"Reset View"})]})]})};import{jsx as un,jsxs as Ha}from"react/jsx-runtime";var _i=()=>{let{presentation:s}=V(),{isBlocking:e,toast:t}=s;return Ha("div",{className:"gr-player__overlay",children:[un(Wa,{}),!e&&Ha("div",{className:"gr-player__bottom",children:[t&&un(ms,{message:t.title}),un(Xa,{})]})]})};import{jsx as st}from"react/jsx-runtime";var Ya=({onExit:s})=>st(xe,{className:"gr-player__xr-exit",onClick:s,children:"Back to 2D"}),qa=({onExit:s})=>st(mt,{icon:st($r,{}),title:"Running in AR",body:"View the scene in AR mode on your device",action:st(Ya,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),Za=({onExit:s})=>st(mt,{icon:st(Zr,{}),title:"Running in VR",body:"Put on your VR-headset and explore the scene",action:st(Ya,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),pn={ar:qa,vr:Za};import{Fragment as Du,jsx as Ft,jsxs as Nu}from"react/jsx-runtime";var dn=()=>{let{gracia:s,presentation:e,xr:t}=V(),{isBusy:r,isBlocking:i,playerError:n}=e,{retry:a}=e,{activeScreenMode:o,exit:l}=t,h=o?pn[o]:null;return Nu(Du,{children:[r&&Ft(ys,{}),i&&n&&Ft(gs,{title:n.title,body:n.body,detail:n.cause.message,action:n.recoverable?Ft(xe,{className:"gr-player__state-action",onClick:a,children:"Try again"}):void 0}),h&&Ft(h,{onExit:l}),!r&&s.isRebuffering&&Ft("div",{className:"gr-player__rebuffer-spinner",children:Ft("div",{className:"gr-player__spinner"})})]})};import{useId as Xu}from"react";var $a='data:image/svg+xml,<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0D%0A<g id="Frame 2087329768">%0D%0A<path id="Vector" d="M3.58369 22L2 20.4163L10.4163 12L2 3.58369L3.58369 2L12 10.4163L20.4163 2L22 3.58369L13.5837 12L22 20.4163L20.4163 22L12 13.5837L3.58369 22Z" fill="%23E9F2FF" fill-opacity="0.3" style="fill:%23E9F2FF;fill:color(display-p3 0.9137 0.9490 1.0000);fill-opacity:0.3;"/>%0D%0A</g>%0D%0A</svg>%0D%0A';import{jsx as Ot,jsxs as fn}from"react/jsx-runtime";var mn=()=>{let{gracia:s,scenario:e}=V(),{prompt:t,secondsLeft:r,choiceTimeoutSec:i,choose:n,dismissPrompt:a}=e,o=Xu();return!t||ft(s.mode)?null:Ot("div",{className:"gr-player__prompt",children:fn("div",{className:"gr-player__prompt-panel",role:"dialog","aria-modal":"true","aria-labelledby":o,children:[fn("div",{className:"gr-player__prompt-head",children:[Ot("h2",{id:o,className:"gr-player__prompt-title",children:t.title||"Choose what happens next"}),t.isReopened&&Ot("button",{type:"button",className:"gr-player__prompt-close",onClick:a,"aria-label":"Close",children:Ot("img",{src:$a,width:"24",height:"24",alt:""})})]}),fn("div",{className:"gr-player__prompt-options",children:[r!==null&&Ot("div",{className:"gr-player__prompt-countdown",style:{width:`${r/i*100}%`},"aria-hidden":"true"}),t.options.map(l=>Ot("button",{type:"button",className:ie("gr-player__prompt-option",l.order===t.selected&&"is-selected"),onClick:()=>n(l.order),children:l.label},l.order))]})]})})};import{jsx as Bt,jsxs as Hu}from"react/jsx-runtime";var Wu=[],dr=Uu(function(e,t){let{controls:r=!0,className:i,style:n,children:a,sources:o=Wu,...l}=e,h=ja(null),c=ja(null),{contextValue:u,gracia:p,playlist:f,openLocalFile:m,toggleFullscreen:d}=sn({...l,sources:o},{root:h,container:c}),{presentation:g,shell:y}=u,{isBusy:_}=g,{isFullscreen:x}=y;return Vu(t,()=>({gracia:p,playlist:f,get cameraControlsType(){return p.camera.controlsType},play:()=>p.playback.play(),pause:()=>p.playback.pause(),seek:v=>p.playback.seek(v),open:v=>p.open(typeof v=="string"?{url:v,label:"Scene"}:v),close:()=>p.close(),next:()=>f.next(),prev:()=>f.prev(),goTo:v=>f.goTo(v),resetCamera:()=>p.camera.reset(),setCameraControls:v=>p.camera.setControls(v),setMode:v=>p.xr.setMode(v),toggleFullscreen:d,openLocalFile:m}),[p,m,f,d]),Bt(xs,{value:u,children:Hu("section",{ref:h,className:ie("gr-player",i,{"gr-player--loading":_,"gr-player--ready":p.isContentReady,"gr-player--scenes-single":f.total<=1,"gr-player--scenes-multiple":f.total>1,"gr-player--fullscreen":x,"gr-player--error":g.isBlocking}),style:n,children:[Bt("div",{ref:c,className:"gr-player__canvas"}),Bt("input",{className:"gr-player__file-input",type:"file",...y.fileInputProps}),Bt(dn,{}),r&&Bt(_i,{}),Bt(mn,{}),typeof a=="function"?a({gracia:p,playlist:f}):a]})})});import{createRef as Yu}from"react";import{flushSync as qu}from"react-dom";import{createRoot as Zu}from"react-dom/client";import{jsx as $u}from"react/jsx-runtime";function Qa(s,e){let t=Yu(),r=Zu(s),i=e,n=!0,a=()=>{qu(()=>{r.render($u(dr,{...i,ref:t}))})};return a(),{get player(){return t.current},update(o){n&&(i=o,a())},unmount(){n&&(n=!1,t.current?.close(),r.unmount())},async openLocalFile(){await t.current?.openLocalFile()}}}import{Box3 as ju,BufferGeometry as Qu,Float32BufferAttribute as Ku,Matrix4 as Ju,Mesh as ep,MeshBasicMaterial as tp,Sphere as rp,Vector2 as ip,Vector3 as Ka}from"three";var Si=class extends ep{#e;#r=null;#t=new ip;#i=!1;#s=new Ju;enableMesh=!1;constructor(e){let t=new Qu;t.setAttribute("position",new Ku([0,0,0],3)),super(t,new tp({colorWrite:!1,depthWrite:!1,transparent:!0})),this.#e=e,this.frustumCulled=!1,this.castShadow=!0,this.renderOrder=1/0,this.onBeforeRender=this.#o,this.onBeforeShadow=this.#n}get player(){return this.#e}async setAudio(e){await this.#e.loadAudio(e)}setAudioListener(e){this.#r=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}dispose(){this.#e.close(),this.#e.dispose(),this.geometry.dispose(),this.material.dispose()}#n=(e,t,r,i)=>{this.enableMesh&&this.#c(e,i)};#o=(e,t,r)=>{e.getDrawingBufferSize(this.#t);let i=this.#t.x,n=this.#t.y;if(i===0||n===0)return;this.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let a=r.matrixWorld.elements;this.#r||this.#e.setAudioListenerMatrix(a),this.#e.setAudioSourceMatrix(this.matrixWorld.elements),this.#e.renderHybridViewport(i,n,{enableMesh:this.enableMesh}),e.resetState(),!this.#i&&this.#e.isReady&&this.#a()};#c(e,t){let r=e.getContext(),i=r.getParameter(r.VIEWPORT),n=i[2],a=i[3];n===0||a===0||(this.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),this.#s.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.#s.multiply(this.matrixWorld),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.depthMask(!0),this.#e.renderMesh(this.#s.elements,i[0],i[1],n,a),e.resetState())}#a(){let e=this.#e.getBBox();if(!e)return;let t=new ju(new Ka(e.minX,e.minY,e.minZ),new Ka(e.maxX,e.maxY,e.maxZ));this.geometry.boundingBox=t,this.geometry.boundingSphere=new rp,t.getBoundingSphere(this.geometry.boundingSphere),this.frustumCulled=!0,this.#i=!0}};import{ByteType as sp,DepthTexture as np,Object3D as op,RenderTarget as ap,RGBAFormat as lp,UnsignedIntType as cp,Vector2 as Ja}from"three";var el=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST,Ti=class s{#e;#r;#t;#i=null;root=new op;static attach(e,t){return e.assertDevice(t.backend?.device),new s(e,t)}constructor(e,t){this.#e=e;let r=t.backend;e.configureSurface(r.context,{usage:el});let{x:i,y:n}=t.getDrawingBufferSize(new Ja);this.#t=new np,this.#t.type=cp;let a=new ap(i,n);a.depthTexture=this.#t,e.isBGRA&&(a.texture.format=lp,a.texture.type=sp,a.texture.internalFormat="bgra8unorm"),this.#r=a}get player(){return this.#e}setAudioListener(e){this.#i=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}render(e,t,r,i){let n=e.getDrawingBufferSize(new Ja),a=n.x,o=n.y;if(a===0||o===0)return;let l=this.#r;(l.width!==a||l.height!==o)&&(l.setSize(a,o),this.#e.configureSurface(e.backend.context,{usage:el})),e.setRenderTarget(l),e.render(t,r),e.setRenderTarget(null);let h=e.backend,c=h.data.get(l.texture)?.texture,u=h.data.get(this.#t)?.texture;if(!c||!u||c.width!==a||c.height!==o)return;this.root.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.root.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let p=r.matrixWorld.elements;this.#i||this.#e.setAudioListenerMatrix(p),this.#e.setAudioSourceMatrix(this.root.matrixWorld.elements),this.#e.renderTextures({color:c,depth:u,w:a,h:o}),i&&(e.autoClearColor=!1,e.autoClearDepth=!0,e.autoClearStencil=!0,e.setRenderTarget(l),e.render(i,r),e.setRenderTarget(null),e.autoClearColor=!0);let f=h.context.getCurrentTexture();f.usage&GPUTextureUsage.COPY_DST&&f.width===a&&f.height===o&&this.#e.copyTexture(c,f,[a,o,1])}setStaticModelMatrix(e){this.#e.setStaticModelMatrix(e)}dispose(){this.#r.dispose(),this.#e.close(),this.#e.dispose()}};export{yt as BoundaryRenderer,wt as ClassicControls,St as DebugRenderer,Ht as ENV_PRESETS,ds as GRACIA_PLAYER_DEFAULT_CSS,pt as GraciaApp,lt as GraciaPlayer,dr as GraciaReactPlayer,Hr as GraciaSplats,Ee as Mat4,Pt as ModernControls,Ai as POLYGON_MAX_CORNERS,Ii as POLYGON_MAX_LAYERS,ke as QuadLayer,Ce as Quat,vr as SECTOR_TILT_MAX,ut as SceneManipulator,Rt as SceneOverlay,Si as SplatsMesh,Ti as SplatsRendererW3,J as Vec3,At as XROverlay,Lt as XRRayRenderer,D as axis,br as bbox,Tr as boundsShape,dt as buildApiSources,We as envCoefsFromPreset,Ni as envCoefsFromSH27,as as fetchStreamingMetadata,Jr as installGraciaPlayerStyles,ji as isValidBounds,Mr as loadGraciaModule,Y as mat4,Qa as mountGraciaPlayer,S as num,We as presetToLightProbe,ue as quat,ss as screenView,Sr as sectorApexShift,Yr as useGraciaPlayer,qr as useGraciaPlaylist,E as vec3};
