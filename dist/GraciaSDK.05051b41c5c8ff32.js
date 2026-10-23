var Fe=Object.freeze,Ot=Fe([0,0,0]),za=Fe([1,1,1]),dr=Fe([1,0,0]),Bt=Fe([0,1,0]),nn=Fe([0,0,1]),Ti=Fe([0,0,-1]),Da=.25,z=Fe({X:dr,Y:Bt,Z:nn,FORWARD:Ti,FLIP_X:Fe([-1,1,1]),FLIP_Z:Fe([1,1,-1])}),_={clamp:(i,e,t)=>Math.min(t,Math.max(e,i)),clampInt:(i,e,t)=>_.clamp(i|0,e,t),clamp01:i=>_.clamp(i,0,1),unlerp01:(i,e,t)=>t===e?0:_.clamp01((i-e)/(t-e)),finite:(i,e=0)=>Number.isFinite(i)?i:e,wrapPi(i){return i>Math.PI?i-2*Math.PI:i<-Math.PI?i+2*Math.PI:i},wrap(i,e){return e>0?(i%e+e)%e:0},wrapDelta(i,e){return e>0?i-e*Math.round(i/e):i},signedClamp(i,e,t){return i===0?0:_.clamp(Math.abs(i),e,t)*Math.sign(i)},zoomStep(i,e=.05,t=10){return i>0?_.signedClamp(Math.log2(i),e,t):0},absLogRatio(i,e){return i>0&&e>0?Math.abs(Math.log(i/e)):0},outside(i,e){return Math.abs(i)>e},perspectiveScale(i,e,t){return 2*i*Math.tan(e*Math.PI/360)/Math.max(1,t)},deadzone(i,e){let t=Math.abs(i);return t<e?0:((t-e)/(1-e))**2*Math.sign(i)},deltaSeconds(i,e,t=0,r=Da){return e?Math.min((i-e)/1e3,r):t}},mr={center(i,e){return i[0]=(e.minX+e.maxX)*.5,i[1]=(e.minY+e.maxY)*.5,i[2]=(e.minZ+e.maxZ)*.5,i}},K=class extends Float32Array{constructor(e){super(3),e&&this.from(e)}set(e,t,r){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this)}fromXYZ(e){return this.set(e.x,e.y,e.z)}from(e){return typeof e.x=="number"?this.fromXYZ(e):this.set(e[0],e[1],e[2])}copy(e){return this.set(e[0],e[1],e[2])}add(e){return this[0]+=e[0],this[1]+=e[1],this[2]+=e[2],this}addXYZ(e=0,t=0,r=0){return this[0]+=e,this[1]+=t,this[2]+=r,this}addTo(e,t=Ot){return e[0]=t[0]+this[0],e[1]=t[1]+this[1],e[2]=t[2]+this[2],e}addScaled(e,t){return this[0]+=e[0]*t,this[1]+=e[1]*t,this[2]+=e[2]*t,this}addDelta(e,t){return this[0]+=e[0]-t[0],this[1]+=e[1]-t[1],this[2]+=e[2]-t[2],this}sub(e,t){return t?(this[0]=e[0]-t[0],this[1]=e[1]-t[1],this[2]=e[2]-t[2],this):(this[0]-=e[0],this[1]-=e[1],this[2]-=e[2],this)}subXYZ(e,t){return this.set(e.x-t.x,e.y-t.y,e.z-t.z)}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this}multiply(e){return this[0]*=e[0],this[1]*=e[1],this[2]*=e[2],this}multiplyXYZ(e=1,t=1,r=1){return this[0]*=e,this[1]*=t,this[2]*=r,this}divide(e){return this[0]=e[0]?this[0]/e[0]:0,this[1]=e[1]?this[1]/e[1]:0,this[2]=e[2]?this[2]/e[2]:0,this}clampScalar(e,t){return this[0]=_.clamp(this[0],e,t),this[1]=_.clamp(this[1],e,t),this[2]=_.clamp(this[2],e,t),this}normalize(e=Ot){let t=Math.hypot(this[0],this[1],this[2]);return Number.isFinite(t)&&t>1e-6?this.scale(1/t):this.copy(e)}setLength(e,t=dr){return this.normalize(t).scale(e)}cross(e,t){let r=e[0],s=e[1],n=e[2],a=t[0],o=t[1],l=t[2];return this[0]=s*l-n*o,this[1]=n*a-r*l,this[2]=r*o-s*a,this}lerp(e,t){return this[0]+=t*(e[0]-this[0]),this[1]+=t*(e[1]-this[1]),this[2]+=t*(e[2]-this[2]),this}midXYZ(e,t){return this.set((e.x+t.x)*.5,(e.y+t.y)*.5,(e.z+t.z)*.5)}fromMat4Column(e,t){let r=t*4;return this.set(e[r],e[r+1],e[r+2])}transformMat4(e){let t=this[0],r=this[1],s=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*s+e[12],this[1]=e[1]*t+e[5]*r+e[9]*s+e[13],this[2]=e[2]*t+e[6]*r+e[10]*s+e[14],this}transformMat4Direction(e){let t=this[0],r=this[1],s=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*s,this[1]=e[1]*t+e[5]*r+e[9]*s,this[2]=e[2]*t+e[6]*r+e[10]*s,this}transformQuat(e){let t=this[0],r=this[1],s=this[2],n=e[0],a=e[1],o=e[2],l=e[3],h=l*t+a*s-o*r,c=l*r+o*t-n*s,u=l*s+n*r-a*t,p=-n*t-a*r-o*s;return this[0]=h*l+p*-n+c*-o-u*-a,this[1]=c*l+p*-a+u*-n-h*-o,this[2]=u*l+p*-o+h*-a-c*-n,this}fromYawPitch(e,t){let r=Math.cos(t);return this.set(r*Math.sin(e),Math.sin(t),-r*Math.cos(e))}yawPitch(e){return this[0]=Math.atan2(e[0],-e[2]),this[1]=Math.asin(_.clamp(e[1],-1,1)),this[2]=0,this}basisFromForward(e,t,r=Bt){return this.cross(t,r).normalize(dr),e.cross(this,t),this}yawPitchBasis(e,t,r,s,n){return r.fromYawPitch(e,t),s.copy(r).scale(-1),this.set(Math.cos(e),0,Math.sin(e)),n.cross(s,this),this}rollBasis(e,t){let r=Math.cos(t),s=Math.sin(t),n=this[0],a=this[1],o=this[2],l=e[0],h=e[1],c=e[2];return this.set(n*r+l*s,a*r+h*s,o*r+c*s),e.set(l*r-n*s,h*r-a*s,c*r-o*s),this}fromSphereDir(e,t){let r=Math.sin(t);return this.set(r*Math.sin(e),Math.cos(t),r*Math.cos(e))}polarY(e,t,r=1e-6){let s=e[0]-t[0],n=e[1]-t[1],a=e[2]-t[2],o=Math.max(r,Math.hypot(s,n,a));return this[0]=Math.atan2(s,a),this[1]=Math.acos(_.clamp(n/o,-1,1)),this[2]=o,this}equals(e,t=1e-6){return Math.abs(this[0]-e[0])<=t&&Math.abs(this[1]-e[1])<=t&&Math.abs(this[2]-e[2])<=t}toArray(){return[this[0],this[1],this[2]]}toXYZ(){return{x:this[0],y:this[1],z:this[2]}}distanceXYZ(e){return Math.hypot(this[0]-e.x,this[1]-e.y,this[2]-e.z)}dot(e){return this[0]*e[0]+this[1]*e[1]+this[2]*e[2]}get sqrLen(){return this[0]*this[0]+this[1]*this[1]+this[2]*this[2]}get len(){return Math.hypot(this[0],this[1],this[2])}get xzLen(){return Math.hypot(this[0],this[2])}get minComponent(){return Math.min(this[0],this[1],this[2])}get maxAbs(){return Math.max(Math.abs(this[0]),Math.abs(this[1]),Math.abs(this[2]))}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}},Pe=class extends Float32Array{constructor(e){super(4),e?this.from(e):this.identity()}set(e,t,r,s){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this[3]=s,this)}fromXYZW(e){return this.set(e.x,e.y,e.z,e.w)}from(e){return typeof e.x=="number"?this.fromXYZW(e):this.set(e[0],e[1],e[2],e[3])}copy(e){return this.set(e[0],e[1],e[2],e[3])}identity(){return this.set(0,0,0,1)}normalize(){let e=Math.hypot(this[0],this[1],this[2],this[3]);return e>1e-6?this.scale(1/e):this.identity()}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this[3]*=e,this}setAxisAngle(e,t){let r=t*.5,s=Math.sin(r);return this.set(e[0]*s,e[1]*s,e[2]*s,Math.cos(r))}rotatePre(e,t){return this.mul(fr.setAxisAngle(e,t),this)}rotate(e,t){return this.mul(fr.setAxisAngle(e,t))}mul(e,t){let r=t?e:this,s=t??e,n=r[0],a=r[1],o=r[2],l=r[3],h=s[0],c=s[1],u=s[2],p=s[3];return this[0]=n*p+l*h+a*u-o*c,this[1]=a*p+l*c+o*h-n*u,this[2]=o*p+l*u+n*c-a*h,this[3]=l*p-n*h-a*c-o*u,this}invert(e=this){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return this.set(-e[0]*r,-e[1]*r,-e[2]*r,e[3]*r)}slerp(e,t){let r=e[0],s=e[1],n=e[2],a=e[3],o=this[0]*r+this[1]*s+this[2]*n+this[3]*a;o<0&&(o=-o,r=-r,s=-s,n=-n,a=-a);let l=1-t,h=t;if(1-o>1e-6){let c=Math.acos(o),u=Math.sin(c);l=Math.sin((1-t)*c)/u,h=Math.sin(t*c)/u}return this.set(l*this[0]+h*r,l*this[1]+h*s,l*this[2]+h*n,l*this[3]+h*a)}toXYZW(){return{x:this[0],y:this[1],z:this[2],w:this[3]}}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}get w(){return this[3]}set w(e){this[3]=e}},Le=class extends Float32Array{constructor(e){super(16),e?this.copy(e):this.identity()}copy(e){return super.set(e),this}identity(){return this.fill(0),this[0]=this[5]=this[10]=this[15]=1,this}multiply(e,t){return t?Si(this,e,t):Si(this,this,e)}preMultiply(e){return Si(this,e,this)}fromTranslation(e){return this.identity(),this[12]=e[0],this[13]=e[1],this[14]=e[2],this}fromScaling(e){return this.identity(),this[0]=e[0],this[5]=e[1],this[10]=e[2],this}perspective(e,t,r,s){let n=1/Math.tan(e*Math.PI/360);return this.fill(0),this[0]=n/t,this[5]=n,this[10]=(s+r)/(r-s),this[11]=-1,this[14]=2*s*r/(r-s),this}cameraWorld(e,t,r=Bt){let s=ye.sub(e,t).normalize(nn),n=rn.cross(r,s).normalize(dr),a=Ha.cross(s,n);return this.cameraWorldAxes(e,n,a,s)}cameraWorldAxes(e,t,r,s){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=0,this[4]=r[0],this[5]=r[1],this[6]=r[2],this[7]=0,this[8]=s[0],this[9]=s[1],this[10]=s[2],this[11]=0,this[12]=e[0],this[13]=e[1],this[14]=e[2],this[15]=1,this}fromQuat(e){return this.fromRotationTranslationScale(e,Ot,za)}fromTransform(e){let{rotation:t,translation:r,scale:s}=e;return fr.fromXYZW(t).normalize(),this.fromRotationTranslationScale(fr,ye.fromXYZ(r),rn.set(s.x,s.y,s.z))}fromRotationTranslationScale(e,t,r){let s=e[0],n=e[1],a=e[2],o=e[3],l=s+s,h=n+n,c=a+a,u=s*l,p=s*h,d=s*c,g=n*h,f=n*c,m=a*c,y=o*l,b=o*h,S=o*c,w=r[0],T=r[1],M=r[2];return this[0]=(1-(g+m))*w,this[1]=(p+S)*w,this[2]=(d-b)*w,this[3]=0,this[4]=(p-S)*T,this[5]=(1-(u+m))*T,this[6]=(f+y)*T,this[7]=0,this[8]=(d+b)*M,this[9]=(f-y)*M,this[10]=(1-(u+g))*M,this[11]=0,this[12]=t[0],this[13]=t[1],this[14]=t[2],this[15]=1,this}setPosition(e){return this[12]=e[0],this[13]=e[1],this[14]=e[2],this}translate(e){let t=e[0],r=e[1],s=e[2];return this[12]=this[0]*t+this[4]*r+this[8]*s+this[12],this[13]=this[1]*t+this[5]*r+this[9]*s+this[13],this[14]=this[2]*t+this[6]*r+this[10]*s+this[14],this[15]=this[3]*t+this[7]*r+this[11]*s+this[15],this}scale(e){let t=e[0],r=e[1],s=e[2];for(let n=0;n<4;n++)this[n]*=t,this[n+4]*=r,this[n+8]*=s;return this}fromPivot(e,t,r,s,n){return this.fromTranslation(e).scale(r).translate(s),this.multiply(Va.fromQuat(t)),this.translate(ye.copy(s).scale(-1)),n?this.multiply(n):this}pointTo(e,t=Ot,r=1){return on(e,this,t,r)}poseTo(e){return an(e,this)}get determinant3(){return this[0]*(this[5]*this[10]-this[6]*this[9])+this[1]*(this[6]*this[8]-this[4]*this[10])+this[2]*(this[4]*this[9]-this[5]*this[8])}decompose(e,t,r){let s=Math.hypot(this[0],this[1],this[2]),n=Math.hypot(this[4],this[5],this[6]),a=Math.hypot(this[8],this[9],this[10]);this.determinant3<0&&(s=-s),e.set(this[12],this[13],this[14]),r.set(s,n,a);let o=s?1/s:0,l=n?1/n:0,h=a?1/a:0;return Me[0]=this[0]*o,Me[1]=this[1]*o,Me[2]=this[2]*o,Me[3]=this[4]*l,Me[4]=this[5]*l,Me[5]=this[6]*l,Me[6]=this[8]*h,Me[7]=this[9]*h,Me[8]=this[10]*h,Xa(t,Me),this}};function Xa(i,e){let t=e[0]+e[4]+e[8];if(t>0){let o=Math.sqrt(t+1),l=.5*o;return o=.5/o,i.set((e[5]-e[7])*o,(e[6]-e[2])*o,(e[1]-e[3])*o,l)}let r=0;e[4]>e[0]&&(r=1),e[8]>e[r*3+r]&&(r=2);let s=(r+1)%3,n=(r+2)%3,a=Math.sqrt(e[r*3+r]-e[s*3+s]-e[n*3+n]+1);return i[r]=.5*a,a=.5/a,i[3]=(e[s*3+n]-e[n*3+s])*a,i[s]=(e[s*3+r]+e[r*3+s])*a,i[n]=(e[n*3+r]+e[r*3+n])*a,i}var ye=new K,rn=new K,Ha=new K,fr=new Pe,Va=new Le,Me=new Float32Array(9);function Si(i,e,t){let r=e[0],s=e[1],n=e[2],a=e[3],o=e[4],l=e[5],h=e[6],c=e[7],u=e[8],p=e[9],d=e[10],g=e[11],f=e[12],m=e[13],y=e[14],b=e[15],S=t[0],w=t[1],T=t[2],M=t[3];return i[0]=S*r+w*o+T*u+M*f,i[1]=S*s+w*l+T*p+M*m,i[2]=S*n+w*h+T*d+M*y,i[3]=S*a+w*c+T*g+M*b,S=t[4],w=t[5],T=t[6],M=t[7],i[4]=S*r+w*o+T*u+M*f,i[5]=S*s+w*l+T*p+M*m,i[6]=S*n+w*h+T*d+M*y,i[7]=S*a+w*c+T*g+M*b,S=t[8],w=t[9],T=t[10],M=t[11],i[8]=S*r+w*o+T*u+M*f,i[9]=S*s+w*l+T*p+M*m,i[10]=S*n+w*h+T*d+M*y,i[11]=S*a+w*c+T*g+M*b,S=t[12],w=t[13],T=t[14],M=t[15],i[12]=S*r+w*o+T*u+M*f,i[13]=S*s+w*l+T*p+M*m,i[14]=S*n+w*h+T*d+M*y,i[15]=S*a+w*c+T*g+M*b,i}function on(i,e,t=Ot,r=1){let s=t[0]??0,n=t[1]??0,a=t[2]??0;return i[0]=e[0]*s+e[4]*n+e[8]*a+e[12],i[1]=e[1]*s+e[5]*n+e[9]*a+e[13],i[2]=e[2]*s+e[6]*n+e[10]*a+e[14],r!==1&&(i[0]*=r,i[1]*=r,i[2]*=r),i}function sn(i,e,t,r){let s=t[0],n=t[1],a=t[2];i[0]=e[0]*s+e[4]*n+e[8]*a,i[1]=e[1]*s+e[5]*n+e[9]*a,i[2]=e[2]*s+e[6]*n+e[10]*a;let o=Math.hypot(i[0],i[1],i[2]);if(Number.isFinite(o)&&o>1e-6){let l=1/o;i[0]*=l,i[1]*=l,i[2]*=l}else i[0]=r[0],i[1]=r[1],i[2]=r[2];return i}function an(i,e){return i[0]=e[12],i[1]=e[13],i[2]=e[14],sn(ye,e,Ti,Ti),i[3]=ye[0],i[4]=ye[1],i[5]=ye[2],sn(ye,e,Bt,Bt),i[6]=ye[0],i[7]=ye[1],i[8]=ye[2],i}var k={create:()=>new K},ce={create:()=>new Pe},Q={create:()=>new Le,clone:i=>new Le(i),pointTo:on,poseTo:an};var gr=75,Li=64,Ci=8,zt=1e-6,xe=64,ln=16,cn=24,hn=.9,Gt=.001,un=8,Wa=new Float64Array(3),Nt=i=>typeof i=="number"&&Number.isFinite(i),Ua=i=>!!i&&Nt(i.x)&&Nt(i.y)&&Nt(i.z),Ei=i=>_.clamp(Math.abs(i??90),1,360)*Math.PI/360,pn=i=>i>=Math.PI-zt,dn=(i,e)=>Array.from({length:xe+1},(t,r)=>{let s=-e+r/xe*2*e;return[Math.sin(s)*i,Math.cos(s)*i]});function br(i,e){if(pn(Ei(i.angleDeg)))return 0;let t=Math.min(e[0],e[2]),r=_.clamp(i.tiltDeg??0,-gr,gr)*Math.PI/180;return _.clamp(2*e[1]*Math.tan(r),-hn*t,hn*t)}function fn(i){switch(i?.type){case"box":case"sphere":return!0;case"sector":return(i.angleDeg==null||Nt(i.angleDeg))&&(i.tiltDeg==null||Nt(i.tiltDeg));case"polygon":return!!mn(i);default:return!1}}function vr(i,e){let t=[e[0],e[1],e[2]];switch(i.type){case"sphere":return il(t);case"sector":return br(i,t)?tl(i,t):el(i,t);case"polygon":return rl(i,t);default:return Ja(t)}}function Ya(i,e){let t=Math.abs(i[0])-e[0],r=Math.abs(i[2])-e[2];return Math.hypot(Math.max(t,0),Math.max(r,0))+Math.min(Math.max(t,r),0)}function qa(i,e){let t=Math.hypot(i[0]/e[0],i[1]/e[1],i[2]/e[2]);if(t===0)return-Math.min(e[0],e[1],e[2]);let r=Math.hypot(i[0]/(e[0]*e[0]),i[1]/(e[1]*e[1]),i[2]/(e[2]*e[2]));return t*(t-1)/r}function Za(i,e,t){let r=Math.abs(e)-t;return Math.min(Math.max(i,r),0)+Math.hypot(Math.max(i,0),Math.max(r,0))}function Mi(i){let e=i.length/2,t=0;for(let r=0;r<e;r++){let s=(r+1)%e*2;t+=i[r*2]*i[s+1]-i[s]*i[r*2+1]}return t/2}var Ve=(i,e,t,r,s,n)=>(t-i)*(n-e)-(r-e)*(s-i);function ot(i,e,t,r,s,n){let a=s-t,o=n-r,l=_.clamp01(((i-t)*a+(e-r)*o)/(a*a+o*o));return Math.hypot(i-t-a*l,e-r-o*l)}function ja(i,e,t){let r=i.length/2,s=e*2,n=(e+1)%r*2,a=t*2,o=(t+1)%r*2,l=Ve(i[a],i[a+1],i[o],i[o+1],i[s],i[s+1]),h=Ve(i[a],i[a+1],i[o],i[o+1],i[n],i[n+1]),c=Ve(i[s],i[s+1],i[n],i[n+1],i[a],i[a+1]),u=Ve(i[s],i[s+1],i[n],i[n+1],i[o],i[o+1]);return l*h<0&&c*u<0?0:Math.min(ot(i[s],i[s+1],i[a],i[a+1],i[o],i[o+1]),ot(i[n],i[n+1],i[a],i[a+1],i[o],i[o+1]),ot(i[a],i[a+1],i[s],i[s+1],i[n],i[n+1]),ot(i[o],i[o+1],i[s],i[s+1],i[n],i[n+1]))}function Qa(i){let e=i.length/2;for(let t=0;t<e;t++){let r=(t+e-1)%e*2,s=t*2,n=(t+1)%e*2;if(Math.hypot(i[n]-i[s],i[n+1]-i[s+1])<Gt||ot(i[n],i[n+1],i[r],i[r+1],i[s],i[s+1])<Gt||ot(i[r],i[r+1],i[s],i[s+1],i[n],i[n+1])<Gt)return!1}for(let t=0;t<e;t++)for(let r=t+2;r<e;r++)if(!(t===0&&r===e-1)&&ja(i,t,r)<Gt)return!1;return!0}function $a(i,e,t,r){for(let s=0;s<e.length;s++)i[s]=e[s]+(t[s]-e[s])*r;return i}function mn(i){let{layers:e}=i;if(!Array.isArray(e)||e.length<2||e.length>Ci)return null;let t=Array.isArray(e[0])?e[0].length:0;if(t<3||t>Li||!e.every(o=>Array.isArray(o)&&o.length===t&&o.every(Ua)))return null;let r=e.map(o=>Float64Array.from(o.flatMap(l=>[l.x,l.y,l.z])));for(let o=1;o<r.length;o++)for(let l=0;l<t;l++)if(r[o][l*3+1]-r[o-1][l*3+1]<Gt)return null;let s=r.map(yr),n=Math.sign(Mi(s[0])),a=new Float64Array(t*2);for(let o=0;o<s.length-1;o++)for(let l=o?1:0;l<=un;l++){$a(a,s[o],s[o+1],l/un);let h=Mi(a);if(Math.abs(h)<zt||Math.sign(h)!==n||!Qa(a))return null}return n>0?r:r.map(Ka)}function yr(i){let e=i.length/3,t=new Float64Array(e*2);for(let r=0;r<e;r++)t[r*2]=i[r*3],t[r*2+1]=i[r*3+2];return t}function Ka(i){let e=i.length/3,t=new Float64Array(i.length);for(let r=0;r<e;r++)t.set(i.subarray((e-1-r)*3,(e-r)*3),r*3);return t}function Pi(i){let e=i.length/2,t=Math.sign(Mi(i))||1,r=Array.from({length:e},(l,h)=>h),s=[],n=l=>i[l*2],a=l=>i[l*2+1],o=(l,h,c)=>{if(Ve(n(l),a(l),n(h),a(h),n(c),a(c))*t<=zt*zt)return!1;for(let u of r){if(u===l||u===h||u===c)continue;let p=Ve(n(l),a(l),n(h),a(h),n(u),a(u))*t,d=Ve(n(h),a(h),n(c),a(c),n(u),a(u))*t,g=Ve(n(c),a(c),n(l),a(l),n(u),a(u))*t;if(p>=0&&d>=0&&g>=0)return!1}return!0};for(;r.length>3;){let l=r.length,h=!1;for(let c=0;c<l;c++){let u=r[(c+l-1)%l],p=r[c],d=r[(c+1)%l];if(o(u,p,d)){s.push(u,p,d),r.splice(c,1),h=!0;break}}if(!h)break}return r.length===3&&s.push(r[0],r[1],r[2]),s}function Ja(i){let e=new Float32Array([-i[0],-i[2],i[0],-i[2],i[0],i[2],-i[0],i[2]]);return gn(t=>Ya(t,i),e,[0,1,2,3],i[1])}function el(i,e){let t=Math.min(e[0],e[2]),r=Ei(i.angleDeg),s=pn(r),n=Math.sin(r),a=Math.cos(r),o=h=>{let c=Math.hypot(h[0],h[2])-t;if(s)return c;let u=Math.abs(h[0]),p=_.clamp(u*n+h[2]*a,0,t),d=Math.hypot(u-n*p,h[2]-a*p);return Math.max(c,d*Math.sign(a*u-n*h[2]))},l=s?Ii(t,t):Float32Array.from([0,0,...dn(t,r).flat()]);return gn(o,l,s?[]:[0,1,xe+1],e[1])}function tl(i,e){let t=e[1],r=Math.min(e[0],e[2]),s=Ei(i.angleDeg),n=br(i,e),a=dn(r,s),o=(h,c)=>{let u=-t+2*t*h,p=n*h,d=[0,u,p],g=([f,m],y)=>d.push(f*y,u,p+(m-p)*y);for(let f=1;f<c;f++)g(a[0],f/c);for(let[f,m]of a)d.push(f,u,m);for(let f=c-1;f>0;f--)g(a[xe],f/c);return Float64Array.from(d)},l=[o(0,1),o(1,1)];return yn([o(0,ln),o(1,ln)],l,()=>Ai(l,[0,1,xe+1]))}function rl(i,e){let t=mn(i).map(r=>r.map((s,n)=>s*2*e[n%3]));return yn(t,[t[0],t[t.length-1]],()=>Ai(t))}function gn(i,e,t,r){let s=[xr(e,-r),xr(e,r)];return Ri(n=>Za(i(n),n[1],r),s,()=>ki(s,s,!0),()=>Ai(s,t))}function yn(i,e,t){let r=sl(i,e);return Ri(s=>nl(s,r),e.map(s=>Float32Array.from(s)),()=>ki(i,e,!0),t)}function il(i){return Ri(e=>qa(e,i),[xr(Ii(i[0],i[2]),-i[1])],()=>ll(i),()=>cl(i))}function Ri(i,e,t,r){let s=null,n=null;return{signedDistance:i,outlines:e,get mesh(){return s??=t()},get lines(){return n??=r()}}}function sl(i,[e,t]){let r=i[0].length/3,s=(h,c)=>h.subarray(c*3,c*3+3),n=[],a=(h,c,u)=>n.push(...h,...c,...u);for(let h=0;h<i.length-1;h++)for(let c=0;c<r;c++){let u=(c+1)%r;a(s(i[h],c),s(i[h+1],c),s(i[h+1],u)),a(s(i[h],c),s(i[h+1],u),s(i[h],u))}let o=Pi(yr(t));for(let h=0;h<o.length;h+=3)a(s(t,o[h]),s(t,o[h+2]),s(t,o[h+1]));let l=Pi(yr(e));for(let h=0;h<l.length;h+=3)a(s(e,l[h]),s(e,l[h+1]),s(e,l[h+2]));return Float64Array.from(n)}function nl(i,e){let t=0,r=Number.POSITIVE_INFINITY;for(let s=0;s<e.length;s+=9)t+=al(i,e,s),r=Math.min(r,ol(i,e,s,Wa));return Math.abs(t)>2*Math.PI?-r:r}function Ke(i,e,t,r,s){for(let n=0;n<3;n++)i[n]=e[t+n]+(e[t+3+n]-e[t+n])*r+(e[t+6+n]-e[t+n])*s}function ol(i,e,t,r){let s=e[t+3]-e[t],n=e[t+4]-e[t+1],a=e[t+5]-e[t+2],o=e[t+6]-e[t],l=e[t+7]-e[t+1],h=e[t+8]-e[t+2],c=s*(i[0]-e[t])+n*(i[1]-e[t+1])+a*(i[2]-e[t+2]),u=o*(i[0]-e[t])+l*(i[1]-e[t+1])+h*(i[2]-e[t+2]),p=s*(i[0]-e[t+3])+n*(i[1]-e[t+4])+a*(i[2]-e[t+5]),d=o*(i[0]-e[t+3])+l*(i[1]-e[t+4])+h*(i[2]-e[t+5]),g=s*(i[0]-e[t+6])+n*(i[1]-e[t+7])+a*(i[2]-e[t+8]),f=o*(i[0]-e[t+6])+l*(i[1]-e[t+7])+h*(i[2]-e[t+8]),m=p*f-g*d,y=g*u-c*f,b=c*d-p*u;if(c<=0&&u<=0)Ke(r,e,t,0,0);else if(p>=0&&d<=p)Ke(r,e,t,1,0);else if(b<=0&&c>=0&&p<=0)Ke(r,e,t,c/(c-p),0);else if(f>=0&&g<=f)Ke(r,e,t,0,1);else if(y<=0&&u>=0&&f<=0)Ke(r,e,t,0,u/(u-f));else if(m<=0&&d-p>=0&&g-f>=0){let S=(d-p)/(d-p+(g-f));Ke(r,e,t,1-S,S)}else{let S=1/(m+y+b);Ke(r,e,t,y*S,b*S)}return Math.hypot(i[0]-r[0],i[1]-r[1],i[2]-r[2])}function al(i,e,t){let r=e[t]-i[0],s=e[t+1]-i[1],n=e[t+2]-i[2],a=e[t+3]-i[0],o=e[t+4]-i[1],l=e[t+5]-i[2],h=e[t+6]-i[0],c=e[t+7]-i[1],u=e[t+8]-i[2],p=Math.sqrt(r*r+s*s+n*n),d=Math.sqrt(a*a+o*o+l*l),g=Math.sqrt(h*h+c*c+u*u),f=r*(o*u-l*c)-s*(a*u-l*h)+n*(a*c-o*h),m=r*a+s*o+n*l,y=a*h+o*c+l*u,b=h*r+c*s+u*n;return 2*Math.atan2(f,p*d*g+m*g+y*p+b*d)}function ki(i,e,t){let r=i[0].length/3,s=[],n=[],a=[],o=Number.POSITIVE_INFINITY;for(let f of i)for(let m=1;m<f.length;m+=3)o=Math.min(o,f[m]);let l=(f,m)=>{let y=m*3,b=(m+1)%r*3;return Math.hypot(f[b]-f[y],f[b+1]-f[y+1],f[b+2]-f[y+2])},h=f=>{let m=0;for(let y=0;y<r;y++)m+=l(f,y);return m},c=i.reduce((f,m)=>h(m)>h(f)?m:f),u=new Float64Array(r*2),p=[0];for(let f=0;f<r;f++){let m=f*3,y=(f+1)%r*3,b=0,S=0,w=0;for(let O of i)b+=O[y]-O[m],S+=O[y+2]-O[m+2],w=Math.max(w,l(O,f));let T=Math.hypot(b,S);T>zt&&(u[f*2]=b/T,u[f*2+1]=S/T);let M=(c[y]-c[m])*u[f*2]+(c[y+2]-c[m+2])*u[f*2+1];p.push(p[f]+(t?M:w))}let d=(f,m,y,b,S)=>{let w=m%r*3,T=y*3,M=t?p[y]+(f[w]-c[T])*u[y*2]+(f[w+2]-c[T+2])*u[y*2+1]:p[y+b];s.push(f[w],f[w+1],f[w+2]),n.push(M*S,f[w+1]-o,S)};for(let f=0;f<i.length-1;f++)for(let m=0;m<r;m++){let y=s.length/3,b=t?1:l(i[f],m),S=t?1:l(i[f+1],m);d(i[f],m,m,0,b),d(i[f],m+1,m,1,b),d(i[f+1],m+1,m,1,S),d(i[f+1],m,m,0,S),a.push(y,y+1,y+2,y,y+2,y+3)}let g=a.length;for(let f of[...e].reverse()){let m=s.length/3;for(let y=0;y<f.length;y+=3)s.push(f[y],f[y+1],f[y+2]),n.push(0,f[y+1]-o,1);for(let y of Pi(yr(f)))a.push(m+y)}return{positions:new Float32Array(s),grid:new Float32Array(n),indices:new Uint32Array(a),capStart:g}}function xr(i,e){let t=i.length/2,r=new Float32Array(t*3);for(let s=0;s<t;s++)r.set([i[s*2],e,i[s*2+1]],s*3);return r}function Ai(i,e=Array.from({length:i[0].length/3},(t,r)=>r)){let t=i[0].length/3,r=[],s=(n,a)=>r.push(n[a*3],n[a*3+1],n[a*3+2]);for(let n of i)for(let a=0;a<t;a++)s(n,a),s(n,(a+1)%t);for(let n=0;n<i.length-1;n++)for(let a of e)s(i[n],a),s(i[n+1],a);return new Float32Array(r)}function Ii(i,e){let t=new Float32Array(xe*2);for(let r=0;r<xe;r++){let s=r/xe*2*Math.PI;t[r*2]=Math.sin(s)*i,t[r*2+1]=Math.cos(s)*e}return t}function ll(i){let e=[];for(let t=0;t<=cn;t++){let r=-Math.PI/2+t/cn*Math.PI,s=Math.cos(r);e.push(xr(Ii(i[0]*s,i[2]*s),i[1]*Math.sin(r)))}return ki(e,[],!1)}function cl(i){let e=[],t=r=>{for(let s=0;s<xe;s++)e.push(...r(s/xe*2*Math.PI),...r((s+1)/xe*2*Math.PI))};return t(r=>[Math.cos(r)*i[0],Math.sin(r)*i[1],0]),t(r=>[Math.cos(r)*i[0],0,Math.sin(r)*i[2]]),t(r=>[0,Math.cos(r)*i[1],Math.sin(r)*i[2]]),new Float32Array(e)}var hl=.28209479177387814;function xn(i,e=.5){let t=1/(hl*Math.max(i[0],i[1],i[2],.01));for(let r=0;r<3;r++)i[r]*=t;for(let r=3;r<12;r++)i[r]*=t*e}function Fi(i,e=null,t=.5){let r=new Float32Array(12);for(let s=0;s<12;s++)r[s]=i[s];if(e){let s=e[0]??e.x,n=e[1]??e.y,a=e[2]??e.z;if(r[9]*s+r[3]*n+r[6]*a>0)for(let o=3;o<12;o++)r[o]*=-1}return xn(r,t),r}function We(i){let e=new Float32Array(12);return e.set(i.ambient,0),e.set(i.topDown,3),i.frontBack&&e.set(i.frontBack,6),i.leftRight&&e.set(i.leftRight,9),e}async function wr(i="@gracia/web-sdk/wasm"){for(let e=0;;e++)try{let t=await import(i);return t.default??t}catch{await new Promise(r=>setTimeout(r,1e3))}}var _r=class{#e;#t=0;constructor(e,t=512){this.#e=e,this.#t=e._malloc(t)}ptr(e=0){return this.#t+e}get f32(){return this.#e.HEAPF32}writeF32(e,t=0){this.#e.HEAPF32.set(e,this.#t+t>>2)}readF32(e,t=0){let r=this.#t+t;return new Float32Array(this.#e.HEAPF32.buffer,r,e)}free(){this.#t&&(this.#e._free(this.#t),this.#t=0)}};function Oi(i,e,...t){if(!e)return;let r=new TextEncoder,s=[],n=t.map(o=>{if(typeof o!="string")return o;let l=r.encode(o),h=i._malloc(l.length+1);return i.HEAPU8.set(l,h),i.HEAPU8[h+l.length]=0,s.push(h),h}),a=e(...n);for(let o of s)i._free(o);return a}var I=(i,e)=>i[`_Gracia_${e}`];async function ul(){let i=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!i)throw new Error("WebGPU adapter not available");return await i.requestDevice({requiredLimits:{maxStorageBuffersPerShaderStage:10,maxComputeWorkgroupSizeX:256,maxBufferSize:i.limits.maxBufferSize,maxStorageBufferBindingSize:i.limits.maxStorageBufferBindingSize}})}var Sr=class i{#e;#t;#r=null;#i=0;constructor(e){this.#e=e,this.#t=new _r(e)}static async boot(e,t,{maxSplatsCount:r=0}={}){let s=typeof e=="function"?await e({canvas:t}):e,n=await ul();if(typeof e=="function"&&(s.preinitializedWebGPUDevice=n,s.WebGPU?.importJsDevice?.(n)),I(s,"Init")?.(r|0),!I(s,"Initialized")?.())throw new Error("Gracia init failed");return{module:new i(s),device:n}}get heap(){return this.#t}get backend(){return this.#r}get buildUnixTime(){return I(this.#e,"GetBuildTime")?.()??0}shutdownApp(){I(this.#e,"Shutdown")?.()}setCamera(e,t,r,s){let n=!!(r&&s),a=this.#t.ptr(),o=a>>2,l=this.#t.f32;l.set(e,o),n&&l.set(r,o+16),l.set(t,o+32),n&&l.set(s,o+48),I(this.#e,"SetCamera")?.(n,a)}getModelMatrix(){let e=I(this.#e,"GetModelMatrix");if(!e)return null;let t=this.#t.ptr(256);return e(t),this.#t.readF32(16,256)}setModelMatrix(e){let t=I(this.#e,"SetModelMatrix");t&&(this.#t.writeF32(e,256),t(this.#t.ptr(256)))}initPure(e){this.shutdownBackend(),this.#r="pure",I(this.#e,"P_Init")?.(e?1:0)}pureRenderTo(e,t,r,s){let n=this.#e.WebGPU,a=n?.importJsTexture?.(e)??0,o=t?n?.importJsTexture?.(t)??0:0;return I(this.#e,"P_RenderTo")?.(a,o,r,s)!==0}initHybrid(e){this.shutdownBackend(),this.registerGL(e),this.#r="hybrid",I(this.#e,"H_Init")?.()}hybridFrame(e,t,r){I(this.#e,"H_Frame")?.(e,t,r)}hybridPreprocess(e,t){return I(this.#e,"H_Preprocess")?.(e,t)??0}hybridRender(e,t,r,s,n,a){I(this.#e,"H_Render")?.(e,t,r,s,n,a)}hybridRenderMesh(e,t,r,s,n){this.#t.writeF32(e),I(this.#e,"H_RenderMeshMVP")?.(this.#t.ptr(),t,r,s,n)}hybridRenderMotionMV(e,t,r,s){I(this.#e,"H_RenderMotionMV")?.(e,t,r,s)}hybridCanMotion(){return!!I(this.#e,"H_CanMotion")?.()}hybridHasMultiview(){return!!I(this.#e,"H_HasMultiview")?.()}hybridReset(){I(this.#e,"H_Reset")?.()}registerGL(e){this.#i&&this.#e.GL?.deleteContext(this.#i);let t=this.#e.GL;if(!t)throw new Error("WASM GL layer not available");this.#i=t.registerContext(e,{majorVersion:2,minorVersion:0,enableExtensionsByDefault:!0}),t.makeContextCurrent(this.#i)}shutdownBackend(){this.#r==="pure"?I(this.#e,"P_Shutdown")?.():this.#r==="hybrid"&&I(this.#e,"H_Shutdown")?.(),this.#i&&(this.#e.GL?.deleteContext(this.#i),this.#i=0),this.#r=null}dispose(){this.shutdownBackend(),this.#t.free(),this.shutdownApp()}addDynamicScene(){return I(this.#e,"AddScene")?.()??0}addStaticScene(){return I(this.#e,"AddStaticScene")?.()??0}removeScene(e){I(this.#e,"RemoveScene")?.(e)}sceneReady(e){return e?(I(this.#e,"SceneReady")?.(e)??0)!==0:!1}sceneProgress(e){return e?I(this.#e,"SceneProgress")?.(e)??0:0}sceneDuration(e){return e?I(this.#e,"SceneDuration")?.(e)??0:0}sceneIsBuffering(e){return e?(I(this.#e,"SceneIsBuffering")?.(e)??0)!==0:!1}sceneLastFetchStatus(e){return e?I(this.#e,"SceneGetLastFetchStatus")?.(e)??0:0}sceneSetTime(e,t){I(this.#e,"SceneSetTime")?.(e,t)}sceneSetPlaybackRange(e,t,r){I(this.#e,"SceneSetPlaybackRange")?.(e,t,r)}sceneSetVisible(e,t){I(this.#e,"SceneSetVisible")?.(e,t)}sceneGetBBox(e){let t=I(this.#e,"SceneGetBBox");if(!t||!e)return null;let r=this.#t.ptr(256);t(e,r);let s=r>>2,n=this.#t.f32;return n[s]===0&&n[s+1]===0&&n[s+2]===0&&n[s+3]===0&&n[s+4]===0&&n[s+5]===0?null:{minX:n[s],minY:n[s+1],minZ:n[s+2],maxX:n[s+3],maxY:n[s+4],maxZ:n[s+5]}}sceneSetEnvLighting(e,t,r){let s=I(this.#e,"SceneSetEnvPreset");if(!s||!e)return;let n=this.#t.ptr(128),a=n>>2,o=this.#t.f32;for(let l=0;l<4;l++)o[a+l*4]=t[l*3],o[a+l*4+1]=t[l*3+1],o[a+l*4+2]=t[l*3+2],o[a+l*4+3]=0;o[a+3]=r,s(e,n)}sceneClearEnvLighting(e){I(this.#e,"SceneClearEnvPreset")?.(e)}sceneSetModelMatrix(e,t){let r=I(this.#e,"SceneSetModelMatrix");!r||!e||(this.#t.writeF32(t,256),r(e,this.#t.ptr(256)))}sceneOpen(e,t){Oi(this.#e,I(this.#e,"SceneOpen"),e,t)}sceneOpenApi(e,t,r){Oi(this.#e,I(this.#e,"SceneOpenApi"),e,t,r)}registerLocalFile(e){let t=this.#e.graciaRegisterLocalFile;if(!t)throw new Error("WASM local-file bridge unavailable");return t(e)}sceneOpenLocal(e,t){I(this.#e,"SceneOpenLocal")?.(e,t)}sceneOpenStatic(e,t){let r=I(this.#e,"SceneOpenStatic");if(!r)return-1;let s=this.#e._malloc(t.length);this.#e.HEAPU8.set(t,s);try{return r(e,s,t.length)}finally{this.#e._free(s)}}};var pl={panningModel:"HRTF",distanceModel:"inverse",refDistance:1,maxDistance:100,rolloffFactor:1},dl=[0,0,0],fl=[0,0,0,0,0,-1,0,1,0],ml=.1,gl=40,bn=.01,vn=.08,yl=1.5,wn=.05,xl=2e3;function _n(){typeof navigator<"u"&&navigator.audioSession&&(navigator.audioSession.type="playback")}function Sn(){return typeof performance<"u"?performance.now():Date.now()}function de(i,e,t,r=0){r>0?i.linearRampToValueAtTime(e,t.currentTime+r):i.setValueAtTime(e,t.currentTime)}function bl(i,e,t){i.setTargetAtTime(e,t.currentTime,.01)}function Tr(i){try{i.disconnect()}catch{}}function fe(i,e){return Math.abs(i-e)<1e-4}function pe(i){try{i.automationRate="k-rate"}catch{}}function Bi(i){i.positionX&&(pe(i.positionX),pe(i.positionY),pe(i.positionZ),"orientationX"in i?(pe(i.orientationX),pe(i.orientationY),pe(i.orientationZ)):(pe(i.forwardX),pe(i.forwardY),pe(i.forwardZ),pe(i.upX),pe(i.upY),pe(i.upZ)))}function Tn(i,e,t,r,s,n=0){de(i.positionX,e,s,n),de(i.positionY,t,s,n),de(i.positionZ,r,s,n)}function vl(i,e,t,r,s,n,a,o,l=0){if("orientationX"in i){de(i.orientationX,e,o,l),de(i.orientationY,t,o,l),de(i.orientationZ,r,o,l);return}de(i.forwardX,e,o,l),de(i.forwardY,t,o,l),de(i.forwardZ,r,o,l),de(i.upX,s,o,l),de(i.upY,n,o,l),de(i.upZ,a,o,l)}var Gi=class{#e=null;#t=null;#r=[0,0,0];#i=[0,0,-1,0,1,0];#s=!1;#n=new Float32Array(9);#o=!1;constructor(){_n(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&this.#e&&this.#e.state!=="running"&&this.resume()})}get ctx(){return this.#e}get destination(){return this.#t??this.#e?.destination??null}setOutput(e){e?.context&&e.context!==this.#e&&(this.#e=e.context,Bi(this.#e.listener),this.#o=!1),this.#t=e?.destination??null,this.#s=e?.externalListener===!0,this.#l()}prepare(){let e=this.#c();if(!e)throw new Error("Web Audio is not supported in this browser");return{ctx:e,destination:this.destination??e.destination}}resume(){_n();let e=this.#c();return e?e.state==="running"?Promise.resolve():e.resume().catch(()=>{}):Promise.resolve()}listener(e,t,r,s,n,a,o,l,h,c=0){this.#r=[e,t,r],this.#i=[s,n,a,o,l,h],this.#l(c)}resetListener(){this.listener(...fl)}#c(){if(this.#e)return this.#e;if(typeof AudioContext>"u")return null;try{this.#e=new AudioContext}catch{return null}return Bi(this.#e.listener),this.#o=!1,this.#l(),this.#e}#l(e=0){let t=this.#e?.listener;if(!t||this.#s)return;let[r,s,n]=this.#r,[a,o,l,h,c,u]=this.#i,p=this.#n;this.#o&&fe(r,p[0])&&fe(s,p[1])&&fe(n,p[2])&&fe(a,p[3])&&fe(o,p[4])&&fe(l,p[5])&&fe(h,p[6])&&fe(c,p[7])&&fe(u,p[8])||(p.set([r,s,n,a,o,l,h,c,u]),this.#o=!0,Tn(t,r,s,n,this.#e,e),vl(t,a,o,l,h,c,u,this.#e,e))}},Ce=new Gi,Ni=class{#e;#t;#r;#i;#s;#n;ready;#o=null;#c=[];#l=null;#a=!1;#u=!1;#h=!1;#d=!1;#p=!1;#f=0;#m=0;#g=0;#b=NaN;#S=NaN;#_=NaN;constructor(e,t={}){let{ctx:r,destination:s}=Ce.prepare();this.#e=r,this.#n=t.destination??s;let n=new Audio;this.#t=n,n.crossOrigin="anonymous",n.preload="auto",n.loop=!0,n.preservesPitch=!1,this.#i=r.createGain(),this.#s=r.createPanner(),Bi(this.#s),this.pannerAttr({...pl,...t.pannerAttr}),this.#r=r.createMediaElementSource(n),this.#r.connect(this.#s),this.#s.connect(this.#i),this.#i.connect(this.#n),this.volume(t.volume??1).rate(t.rate??1).pos(...t.pos??dl),this.ready=new Promise(a=>{this.#o=a}),this.#T("loadedmetadata",()=>this.#P()),this.#T("canplay",()=>this.#w()),this.#T("loadeddata",()=>this.#w()),this.#T("error",()=>this.#M(`Media error ${n.error?.code??"unknown"}`)),n.src=e,n.load(),this.#w()}get context(){return this.#e}get blocked(){return this.#h}get failed(){return this.#a}get buffering(){return this.#v||this.#y&&this.#g>0}get clockRate(){return!this.#y||Math.abs(this.#m)<bn?1:1+_.clamp(yl*this.#m,-wn,wn)}get#y(){return!this.#a&&!this.#h&&!this.#u}get#v(){return this.#y&&(!this.#d||this.#p||this.#t.paused||this.#t.readyState<3||this.#t.seeking||this.#l!==null)}#T(e,t){this.#c.push([e,t]),this.#t.addEventListener(e,t)}#w(){this.#t.readyState<3||this.#u||this.#x()}#x(){this.#o?.(),this.#o=null}#M(e){this.#u||this.#a||(this.#a=!0,this.pause(),this.#x())}allowPlayback(){this.#h=!1}play(){if(this.#a||this.#h||this.#u||this.#p||this.#d&&!this.#t.paused)return;let e=++this.#f;this.#p=!0;try{Promise.resolve(this.#t.play()).then(()=>{e!==this.#f||this.#u||(this.#p=!1,this.#d=!0)}).catch(t=>this.#R(e,t))}catch(t){this.#R(e,t)}}#R(e,t){e!==this.#f||this.#u||(this.#p=!1,this.#d=!1,t?.name==="NotAllowedError"?(this.#h=!0,this.#t.pause()):t?.name!=="AbortError"&&this.#M(t))}pause(){this.#f++,this.#p=!1,this.#d=!1,this.#C(),this.#t.paused||this.#t.pause()}unload(){this.pause(),this.#u=!0;for(let[e,t]of this.#c)this.#t.removeEventListener(e,t);this.#c=[],this.#t.removeAttribute("src"),this.#t.load(),this.#x(),Tr(this.#r),Tr(this.#s),Tr(this.#i)}seek(e){return typeof e=="number"&&(this.#C(),this.#l=Number.isFinite(e)?Math.max(0,e):0,this.#P()),this.#l??this.#t.currentTime}#P(){if(this.#l===null||this.#t.readyState<1)return;let e=this.#t.duration,t=Number.isFinite(e)&&e>0?_.wrap(this.#l,e):this.#l;Math.abs(this.#t.currentTime-t)>.005&&(this.#t.currentTime=t),this.#l=null}sync(e){this.#a||this.#h||this.#u||(!this.#d||this.#t.paused)&&!this.#p&&(this.seek(e),this.play())}follow(e){if(this.#v||!this.#y||this.#e.state!=="running"){this.#C();return}let t=this.#t.currentTime-e,r=this.#t.duration;Number.isFinite(r)&&r>0&&(t=_.wrapDelta(t,r));let s=Sn();if(t<-vn?this.#g||=s:t>-bn&&(this.#g=0),t>vn||this.#g&&s-this.#g>xl){this.seek(e);return}this.#m=t}#C(){this.#m=0,this.#g=0}volume(e){return bl(this.#i.gain,_.clamp01(e),this.#e),this}rate(e){return this.#t.playbackRate=_.clamp(_.finite(e,1),.1,4),this}pos(e,t,r,s=0){return fe(e,this.#b)&&fe(t,this.#S)&&fe(r,this.#_)?this:(this.#b=e,this.#S=t,this.#_=r,Tn(this.#s,e,t,r,this.#e,s),this)}destination(e){let t=e??this.#e.destination;return t===this.#n?this:(Tr(this.#i),this.#n=t,this.#i.connect(this.#n),this)}pannerAttr(e){return e?(e.panningModel&&(this.#s.panningModel=e.panningModel),e.distanceModel&&(this.#s.distanceModel=e.distanceModel),typeof e.refDistance=="number"&&(this.#s.refDistance=e.refDistance),typeof e.maxDistance=="number"&&(this.#s.maxDistance=e.maxDistance),typeof e.rolloffFactor=="number"&&(this.#s.rolloffFactor=e.rolloffFactor),this):this}},Mr=class{#e=null;#t=null;#r=[0,0,0];#i=k.create();#s=new Float32Array(9);#n={volume:1,rate:1,pannerAttr:{}};#o=!1;#c=0;#l=0;#a=0;#u=!1;get context(){return Ce.ctx}get isLoaded(){return!this.#u||!this.#o||Ce.ctx?.state!=="running"||this.#e?.blocked===!0}get isBuffering(){return this.#o&&(this.#e?.buffering??!1)}setOutput(e){if(Ce.setOutput(e),!!this.#e){if(this.#e.context!==Ce.ctx){let t=this.#t,r=this.#e.seek();this.unload(),t&&(this.load(t),this.#e?.seek(r));return}this.#e.destination(Ce.destination)}}async load(e){if(e===this.#t&&this.#e&&!this.#e.failed){await this.#e.ready;return}this.unload(),this.#t=e,this.#u=!0;let t=++this.#c;try{this.#e=new Ni(e,{...this.#n,pos:this.#r}),await this.#e.ready}catch{t===this.#c&&(this.#e?.unload(),this.#e=null,this.#t=null)}finally{t===this.#c&&(this.#u=!1)}}sync(e,t,r){let s=this.#e;return!this.#o||!r?(s?.pause(),!0):(s?.sync(e),s?.follow(e),!this.isBuffering)}get clockRate(){return this.#o?this.#e?.clockRate??1:1}seek(e){this.#e?.seek(e)}volume(e){this.#n.volume=_.clamp01(e),this.#e?.volume(this.#n.volume)}rate(e){this.#n.rate=e,this.#e?.rate(e)}setSpatial(e,t,r){this.#r=[e,t,r];let s=this.#h("spatial");s>=0&&this.#e?.pos(e,t,r,s)}setSourceMatrix(e,t,r=1){let s=e.pointTo?.(this.#i,t,r)??Q.pointTo(this.#i,e,t,r);this.setSpatial(s.x,s.y,s.z)}setListenerMatrix(e){let t=this.#h("listener");if(t<0)return;let r=e.poseTo?.(this.#s)??Q.poseTo(this.#s,e);Ce.listener(...r,t)}setPanner(e){Object.assign(this.#n.pannerAttr,e),this.#e?.pannerAttr(e)}stop(){this.#e?.pause()}get enabled(){return this.#o&&Ce.ctx?.state==="running"&&!this.#e?.blocked}enable(){this.#o=!0,Ce.resume(),this.#e?.allowPlayback()}disable(){this.#o=!1,this.#e?.pause()}unload(){this.#c++,this.#e?.unload(),this.#e=null,this.#t=null,this.#u=!1,Ce.resetListener()}#h(e){let t=Sn(),r=e==="listener"?this.#l:this.#a;return r&&t-r<gl?-1:(e==="listener"?this.#l=t:this.#a=t,_.deltaSeconds(t,r,0,ml))}};var Dt=class{#e;#t=0;#r=!1;constructor(e){this.#e=e}get id(){return this.#t}get isStatic(){return this.#r}get isReady(){return this.#e.sceneReady(this.#t)}get progress(){return this.#e.sceneProgress(this.#t)}get duration(){return this.#r?0:this.#e.sceneDuration(this.#t)}get isBuffering(){return this.#r?!1:this.#e.sceneIsBuffering(this.#t)}get lastFetchStatus(){return this.#e.sceneLastFetchStatus(this.#t)}setTime(e){this.#t&&!this.#r&&this.#e.sceneSetTime(this.#t,e)}setPlaybackRange(e,t){this.#t&&!this.#r&&this.#e.sceneSetPlaybackRange(this.#t,e,t)}setVisible(e){this.#t&&this.#e.sceneSetVisible(this.#t,e)}getBBox(){return this.#e.sceneGetBBox(this.#t)}setEnvLighting(e,t){this.#t&&this.#e.sceneSetEnvLighting(this.#t,e,t)}clearEnvLighting(){this.#t&&this.#e.sceneClearEnvLighting(this.#t)}setModelMatrix(e){this.#t&&this.#e.sceneSetModelMatrix(this.#t,e)}openDynamic(e){if(this.remove(),this.#t=this.#e.addDynamicScene(),this.#r=!1,e.localFile||e.file){let r=e.localFile||e.file;this.#e.sceneOpenLocal(this.#t,this.#e.registerLocalFile(r));return}let t=e.url;if(e.token){this.#e.sceneOpenApi(this.#t,t,e.token);return}this.#e.sceneOpen(this.#t,t)}async openStatic(e){this.remove();let t=this.#e.addStaticScene();this.#t=t,this.#r=!0;let r=e.file?await e.file.arrayBuffer():await(await fetch(e.url)).arrayBuffer();this.#t===t&&this.#e.sceneOpenStatic(t,new Uint8Array(r))}remove(){this.#t&&(this.#e.removeScene(this.#t),this.#t=0)}};var Mn={alpha:!0,premultipliedAlpha:!0,depth:!0,stencil:!1,antialias:!1,powerPreference:"high-performance",xrCompatible:!0},Pr=Object.freeze({start:0,end:1/0}),at=class i{#e;#t;#r=new Mr;#i=0;#s=null;#n=null;#o=null;#c=!1;#l=0;#a=0;#u=1;#h=Pr;#d=!1;#p=null;#f=null;static GL_CANVAS_OPTS=Mn;constructor(e,t){this.#e=e,this.#t=t,typeof document<"u"&&document.addEventListener("visibilitychange",this.#m)}#m=()=>{document.hidden&&this.#r.stop()};static async create(e,{canvas:t,gl:r,backend:s,maxSplatsCount:n}={}){if(!t&&!r)throw new Error("canvas or gl required");let a=s??(r?"hybrid":"pure"),{module:o,device:l}=await Sr.boot(e,t||r.canvas,{maxSplatsCount:n}),h=new i(o,l);return a==="hybrid"?h.#S(r??i.#g(t)):h.#b(t),h}static preferredFormat(){return navigator.gpu.getPreferredCanvasFormat()}static#g(e){let t=e.getContext("webgl2",Mn);if(!t)throw new Error("WebGL2 not available");return t}get device(){return this.#t}get backend(){return this.#e.backend}get buildUnixTime(){return this.#e.buildUnixTime}get gl(){return this.#f}get isBGRA(){return i.preferredFormat()==="bgra8unorm"}assertDevice(e){if(e&&e!==this.#t)throw new Error("WebGPU device must match GraciaPlayer.device")}configureSurface(e,t={}){let{format:r,alphaMode:s="premultiplied",usage:n}=t;e.configure({device:this.#t,format:r??i.preferredFormat(),alphaMode:s,...n!=null?{usage:n}:{}})}bindCanvas(e,t={}){let r=e.getContext("webgpu");if(!r)throw new Error("WebGPU canvas context not available");return this.configureSurface(r,t),this.#p=r,r}setBackend(e,{canvas:t,gl:r}={}){if(this.shutdown(),e==="hybrid"){if(!r&&!t)throw new Error("canvas or gl required for hybrid backend");this.#S(r??i.#g(t))}else this.#b(t)}present(e,t){e===0||t===0||(this.#e.backend==="hybrid"?this.#y(e,t):this.#_())}renderTextures({color:e,depth:t,w:r,h:s}){return this.#M(),this.#e.backend!=="pure"?!1:this.#e.pureRenderTo(e,t,r,s)}renderDynamic(e){this.#n?.setVisible(!1);try{return this.renderTextures(e)}finally{this.#n?.setVisible(!0)}}get hasStatic(){return!!this.#n}copyTexture(e,t,r=null){let s=r??[e.width,e.height,1],n=this.#t.createCommandEncoder();n.copyTextureToTexture({texture:e},{texture:t},s),this.#t.queue.submit([n.finish()])}renderHybridViewport(e,t,{gl:r,drawMode:s,enableMesh:n=!1,x:a=0,y:o=0,eye:l=0}={}){let h=r??this.#f;if(!h)throw new Error("No WebGL context");let c=s??this.#i;this.preprocess(e,t),h.enable(h.DEPTH_TEST),h.depthFunc(h.LEQUAL),h.depthMask(!1),this.render(c,a,o,e,t,l),n&&(h.colorMask(!1,!1,!1,!1),h.depthMask(!0),this.render(1,a,o,e,t,l),h.colorMask(!0,!0,!0,!0)),h.depthMask(!0)}shutdown(){this.#e.shutdownBackend(),this.#f=null,this.#p=null}#b(e){this.#f=null,this.#p=null,this.#t.pushErrorScope("validation"),this.#e.initPure(this.isBGRA),this.#t.popErrorScope().then(t=>{}),e&&this.bindCanvas(e)}#S(e){this.#p=null,this.#f=e,this.#e.initHybrid(e)}#_(){if(!this.#p)throw new Error("bindCanvas() required");let{width:e,height:t}=this.#p.canvas;e===0||t===0||this.renderTextures({color:this.#p.getCurrentTexture(),w:e,h:t})}#y(e,t){let r=this.#f;if(!r)throw new Error("hybrid backend required");r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clearDepth(1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.disable(r.DEPTH_TEST),this.frame(e,t,this.#i)}get drawMode(){return this.#i}set drawMode(e){this.#i=_.clampInt(e,0,3)}get#v(){return this.#s??this.#n}get isReady(){return(this.#v?.isReady??!1)&&this.#r.isLoaded}get progress(){return this.#v?.progress??0}get duration(){return this.#s?.duration??0}get playbackRange(){let{start:e,end:t}=this.#h;return{start:e,end:Math.min(t,this.duration||1/0)}}get ended(){return this.#d}get currentTime(){return this.#l}get isPlaying(){return this.#c}get isBuffering(){return(this.#s?.isBuffering??!1)||this.#c&&this.#r.isBuffering}get lastFetchStatus(){return this.#v?.lastFetchStatus??0}play(){this.#c=!0,this.#x()}pause(){this.#c=!1,this.#a=0,this.#r.stop()}seek(e){let{start:t,end:r}=this.playbackRange;this.#l=_.clamp(e,t,r),this.#a=0,this.#r.seek(this.#l)}setPlaybackRange(e,t){if(!(e>=0&&e<t&&t<=this.duration))throw new RangeError(`Invalid playback range [${e}, ${t}) for ${this.duration}s`);this.#T({start:e,end:t})}clearPlaybackRange(){this.#T(Pr)}#T(e){this.#h=e,this.#s?.setPlaybackRange(e.start,e.end);let{start:t,end:r}=this.playbackRange;(this.#l<t||this.#l>=r)&&this.seek(t)}get speed(){return this.#u}setSpeed(e){this.#u=_.clamp(_.finite(e,1),.1,4),this.#r.rate(this.#u)}close(){this.#s?.remove(),this.#s=null,this.#n?.remove(),this.#n=null,this.#w(),this.#r.unload()}clearVideo(){this.#s?.remove(),this.#s=null,this.#w(),this.#r.unload()}#w(){this.#h=Pr,this.#d=!1,this.#l=0,this.#a=0,this.#c=!1}clearEnvironment(){this.#n?.remove(),this.#n=null}#x(){let e=this.#c&&(this.#s?.isReady??!1)&&!this.#s?.isBuffering;return this.#r.sync(this.#l,this.duration,e)}#M(){if(!this.#s)return;let e=performance.now(),t=this.#x(),r=this.#c&&this.#s.isReady&&!this.#s.isBuffering&&t;r&&this.#a>0&&this.#R(_.deltaSeconds(e,this.#a)*this.#u*this.#r.clockRate),this.#a=r?e:0,this.#s.setTime(this.#l)}#R(e){let{start:t,end:r}=this.playbackRange,s=this.#l+e;if(s<r){this.#l=s;return}this.#l=t+_.wrap(s-t,r-t),this.#h===Pr?this.#d=!0:this.#r.seek(this.#l)}open(e){if(this.#r.unload(),e.audio&&this.#r.load(e.audio),e.type==="static")return this.#P(e);this.#s||(this.#s=new Dt(this.#e)),this.#s.openDynamic(e),this.#C(this.#s),this.#w()}async#P(e){this.#n||(this.#n=new Dt(this.#e)),await this.#n.openStatic(e),this.#C(this.#n)}get audioContext(){return this.#r.context}get audioEnabled(){return this.#r.enabled}enableAudio(){this.#r.enable(),this.#x()}disableAudio(){this.#r.disable()}setAudioOutput(e){this.#r.setOutput(e)}setVolume(e){this.#r.volume(e)}loadAudio(e){return this.#r.load(e)}setAudioSpatial(e,t,r){this.#r.setSpatial(e,t,r)}setAudioSourceMatrix(e,t,r){this.#r.setSourceMatrix(e,t,r)}setAudioListenerMatrix(e){this.#r.setListenerMatrix(e)}setAudioPanner(e){this.#r.setPanner(e)}setCamera(e,t,r,s){this.#e.setCamera(e,t,r,s)}getBBox(){return this.#v?.getBBox()??null}getModelMatrix(){return this.#e.getModelMatrix()}setModelMatrix(e){this.#e.setModelMatrix(e)}setStaticModelMatrix(e){this.#n?.setModelMatrix(e)}setEnvLighting(e,t=1){this.#o={coefs:Float32Array.from(e),scale:t},this.#s?.setEnvLighting(e,t),this.#n?.setEnvLighting(e,t)}clearEnvLighting(){this.#o=null,this.#s?.clearEnvLighting(),this.#n?.clearEnvLighting()}#C(e){this.#o&&e.setEnvLighting(this.#o.coefs,this.#o.scale)}frame(e,t,r){this.#M(),this.#e.hybridFrame(e,t,r)}preprocess(e,t){return this.#M(),this.#e.hybridPreprocess(e,t)}render(e,t,r,s,n,a){this.#e.hybridRender(e,t,r,s,n,a)}renderMesh(e,t,r,s,n){this.#e.hybridRenderMesh(e,t,r,s,n)}renderMotionMV(e,t,r,s){this.#e.hybridRenderMotionMV(e,t,r,s)}canMotion(){return this.#e.hybridCanMotion()}hasMultiview(){return this.#e.hybridHasMultiview()}resetXR(){this.#e.hybridReset()}dispose(){typeof document<"u"&&document.removeEventListener("visibilitychange",this.#m),this.close(),this.#r.unload(),this.shutdown(),this.#e.dispose()}};var Cn=.75,En=.35,Rn=.9,wl=.1,_l=.15,Pn=3,Sl=.5,zi=[1,.72,.05],Cr=Float32Array.of(1,.08,.04,.9),Tl=.001,Di=new Float32Array(0),Ml=.25,Pl=1e-5,ct={ramp:[[Cn,...zi,.12],[0,...Cr]],reach:Number.POSITIVE_INFINITY,dark:{from:En,to:0,max:Rn}},Vi={ramp:[[Cn,...zi,.7],[.2,...zi,.9],[-.3,...Cr]],reach:4.5,dark:{from:.3,to:-.5,max:Rn}},Lr=i=>typeof i=="number"&&Number.isFinite(i),Xi=i=>!!i&&Lr(i.x)&&Lr(i.y)&&Lr(i.z),Ll=i=>Xi(i)&&Lr(i.w);function Wi(i){return!i||typeof i!="object"||!fn(i)||!Xi(i.position)||!Ll(i.rotation)||!Xi(i.scale)?!1:i.scale.x>0&&i.scale.y>0&&i.scale.z>0}var Ui=(i,e,t)=>{let r=_.unlerp01(t,i,e);return r*r*(3-2*r)};function Cl(i,e=ct.ramp,t=new Float32Array(4)){if(i>=e[0][0])return t.fill(0);let r=1;for(;r<e.length-1&&i<e[r][0];)r++;let s=e[r-1],n=e[r],a=Ui(s[0],n[0],i);for(let o=0;o<4;o++)t[o]=s[o+1]+(n[o+1]-s[o+1])*a;return t}var El=i=>Ui(En,0,i),Rl=(i,{dark:e}=ct)=>e.max*Ui(e.from,e.to,i),kl=i=>1-_.unlerp01(i,Pn,Pn+Sl);function Al(i,e,t){t.set(i);let r=Cr[3]*kl(e);return r>i[3]&&(t.set(Cr),t[3]=r),t}function Ln(i,e,t){if(e[3]>0){i[3]===0&&(i.set(e),i[3]=0);for(let r=0;r<4;r++)i[r]+=(e[r]-i[r])*t}else i[3]-=i[3]*t;i[3]<Tl&&(i[3]=0)}var lt=(i,e,t,r)=>(i[e]=t[r],i[e+1]=t[r+1],i[e+2]=t[r+2],e+3),Hi=class{#e;#t=null;#r=new K;#i=new K;#s=new K;#n=new Pe;#o=Di;#c=Di;#l=new K;#a=new Le;#u=new K;#h=new Pe;#d=new Pe;#p=new K;#f=1;#m=new K;#g=new Le;constructor(e){this.#e=e,this.#i.fromXYZ(e.position),this.#s.fromXYZ(e.scale),this.#n.fromXYZW(e.rotation).normalize(),this.setRoomMatrix(null)}setRoomMatrix(e){return this.#a.fromRotationTranslationScale(this.#n,this.#i,this.#s),e&&this.#a.preMultiply(e),this.#a.decompose(this.#u,this.#h,this.#p),this.#d.copy(this.#h).invert(),this.#f=this.#p[0]<0?-1:1,this.#p.set(Math.abs(this.#p[0])*.5,Math.abs(this.#p[1])*.5,Math.abs(this.#p[2])*.5),this.#m.set(this.#f,1,1),this.#g.fromRotationTranslationScale(this.#h,this.#u,this.#m),(!this.#t||!this.#r.equals(this.#p,Pl))&&this.#b(),this}signedDistance(e){return this.#t.signedDistance(this.#_(e))}get mesh(){return this.#t.mesh}get meshMatrix(){return this.#g}outlineRibbon(e,t=!1){let r=e*.5,s=this.#o,n=this.#c,a=0,o=0;for(let l of this.#t.outlines){let h=l.length/3;for(let c=0;c<h;c++)this.#S(l,c,h,r,(a+c)*6);for(let c=0;c<h;c++){let u=(a+c)*6,p=(a+(c+1)%h)*6;o=lt(n,o,s,u),o=lt(n,o,s,p),o=lt(n,o,s,p+3),o=lt(n,o,s,u),o=lt(n,o,s,p+3),o=lt(n,o,s,u+3)}if(a+=h,t)break}return n.subarray(0,o)}#b(){this.#r.copy(this.#p),this.#t=vr(this.#e,this.#p);let e=this.#t.outlines.reduce((t,r)=>t+r.length/3,0);this.#o=new Float32Array(e*6),this.#c=new Float32Array(e*18)}#S(e,t,r,s,n){let a=(t+r-1)%r*3,o=(t+1)%r*3,l=e[t*3],h=e[t*3+1],c=e[t*3+2],u=l-e[a],p=c-e[a+2],d=e[o]-l,g=e[o+2]-c,f=Math.hypot(u,p),m=Math.hypot(d,g),y=p/f+g/m,b=-u/f-d/m,S=Math.hypot(y,b),w=s/(S*Math.max(S/2,Ml));this.#y(n,l+y*w,h,c+b*w),this.#y(n+3,l-y*w,h,c-b*w)}#_(e){let t=this.#l.sub(e,this.#u).transformQuat(this.#d);return t[0]*=this.#f,t}#y(e,t,r,s){let n=this.#l.set(t*this.#f,r,s).transformQuat(this.#h);this.#o.set(n.add(this.#u),e)}},Xt=class{#e=null;#t=ct;#r=0;#i=new Float32Array(4);#s=new Float32Array(4);#n=0;#o=0;#c=new Float32Array(4);#l=new Float32Array(4);#a=!1;#u=null;#h=new K;get active(){return!!this.#e}get darkness(){return this.#r}get outline(){return this.#i}get surface(){return this.#s}get aboveSplats(){return this.#n}get reach(){return this.#t.reach}get outside(){return this.#o}get mesh(){return this.#e?.mesh??null}get meshMatrix(){return this.#e?.meshMatrix??null}setBounds(e){return this.#e=Wi(e)?new Hi(e):null,this.#d()}setRoomMatrix(e){return this.#e?.setRoomMatrix(e),this}queueIntro(){return this.#a=!0,this}reset(e=this.#t){return this.#t=e,this.#a=!1,this.#d()}update(e,t){if(!this.#e)return this.#d();this.#a?(this.#a=!1,this.#u=0):this.#u!==null&&(this.#u+=t),this.#h.from(e);let r=-this.#e.signedDistance(this.#h),s=Cl(r,this.#t.ramp,this.#c),n=this.#u===null?s:Al(s,this.#u,this.#l),a=1-Math.exp(-t/_l);Ln(this.#i,n,a),Ln(this.#s,s,a),this.#n+=(El(r)-this.#n)*a,this.#o+=((r<0?1:0)-this.#o)*a;let o=Rl(r,this.#t);return this.#r+=(o-this.#r)*(1-Math.exp(-t/wl)),this}ribbon(e){let t=this.#s[3]===0;return this.#e?.outlineRibbon(e,t)??Di}#d(){return this.#r=0,this.#i.fill(0),this.#s.fill(0),this.#n=0,this.#o=0,this.#u=null,this}};var Ht={daylight:{ambient:[3.62,3.54,3.37],topDown:[.5,.45,.4]},cloudy:{ambient:[3.19,3.26,3.44],topDown:[.05,.05,.07]},sunset:{ambient:[4.08,3.01,1.95],topDown:[.25,.12,.02],frontBack:[.15,.06,0],leftRight:[-.3,-.12,0]},indoor:{ambient:[3.72,3.37,2.84],topDown:[.3,.25,.15]},shade:{ambient:[3.12,3.3,3.72],topDown:[.1,.15,.3]},night:{ambient:[2.48,2.66,3.01],topDown:[.08,.1,.15]},off:null};var Il=2.5,An=1.6,Fl=.0015,Ol=2,kn=.5,Bl=.6,Gl=.022,Nl=1e-4,Er=Math.PI/2-.01,Rr=.05,kr=200,zl=new Set(["w","a","s","d","r","f","q","e","shift"]),Vt=class{#e;#t=new Map;#r=null;#i=1;#s;#n;#o;#c=0;#l=0;#a=0;#u=0;#h=0;#d=e=>e.preventDefault();constructor(e,{pan:t=!0,rotate:r=Il,onDown:s}={}){this.#e=e,this.#s=t,this.#n=r,this.#o=s,this.#i=e.clientHeight||1,e.addEventListener("contextmenu",this.#d),e.addEventListener("pointerdown",this.#p),e.addEventListener("wheel",this.#g,{passive:!1})}get height(){return this.#i}consume(e){return e.rotX=this.#c,e.rotY=this.#l,e.panX=this.#a,e.panY=this.#u,e.zoom=this.#h,this.#c=this.#l=this.#a=this.#u=this.#h=0,e}dispose(){this.#e.removeEventListener("contextmenu",this.#d),this.#e.removeEventListener("pointerdown",this.#p),this.#e.removeEventListener("wheel",this.#g),window.removeEventListener("pointermove",this.#f),window.removeEventListener("pointerup",this.#m),window.removeEventListener("pointercancel",this.#m),this.#t.clear(),this.#r=null}#p=e=>{this.#e.setPointerCapture?.(e.pointerId),this.#t.size===0&&(window.addEventListener("pointermove",this.#f),window.addEventListener("pointerup",this.#m),window.addEventListener("pointercancel",this.#m)),this.#t.set(e.pointerId,{x:e.clientX,y:e.clientY,button:e.button,touch:e.pointerType==="touch"}),this.#i=this.#e.clientHeight||this.#i,this.#t.size===2&&this.#b(),this.#o?.()};#f=e=>{let t=this.#t.get(e.pointerId);if(!t)return;let r=e.clientX-t.x,s=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,this.#t.size>=2)return this.#S();!t.touch&&(t.button===2||e.buttons===2)?this.#s&&(this.#a+=r,this.#u+=s):(this.#c+=r/this.#i*this.#n,this.#l+=s/this.#i*this.#n)};#m=e=>{this.#e.releasePointerCapture?.(e.pointerId),this.#t.delete(e.pointerId),this.#r=null,this.#t.size===0&&(window.removeEventListener("pointermove",this.#f),window.removeEventListener("pointerup",this.#m),window.removeEventListener("pointercancel",this.#m))};#g=e=>{e.preventDefault(),this.#h+=-e.deltaY*Fl};#b(){let[e,t]=this.#t.values();this.#r={dist:Math.hypot(e.x-t.x,e.y-t.y),cx:(e.x+t.x)/2,cy:(e.y+t.y)/2}}#S(){let[e,t]=this.#t.values(),r=Math.hypot(e.x-t.x,e.y-t.y),s=(e.x+t.x)/2,n=(e.y+t.y)/2,a=this.#r;a&&(a.dist>0&&r>0&&(this.#h+=Math.log(r/a.dist)),this.#s&&(this.#a+=s-a.cx,this.#u+=n-a.cy)),this.#r={dist:r,cx:s,cy:n}}},Dl=i=>1-Math.exp(-i/Gl),me=()=>({rotX:0,rotY:0,panX:0,panY:0,zoom:0}),Xl=i=>Math.abs(i.rotX)+Math.abs(i.rotY)+Math.abs(i.panX)+Math.abs(i.panY)+Math.abs(i.zoom)<Nl;function ji(i,e,t,r,s){let n=i.consume(e);if(t.rotX+=n.rotX,t.rotY+=n.rotY,t.panX+=n.panX,t.panY+=n.panY,t.zoom+=n.zoom,Xl(t))return!1;let a=Dl(s);for(let o of["rotX","rotY","panX","panY","zoom"])r[o]=t[o]*a,t[o]-=r[o];return!0}var Yi=class{#e;#t;#r=k.create();#i=k.create();#s=k.create();#n=k.create();#o=k.create();#c=k.create();#l=1;#a=0;#u=0;#h=!1;#d=me();#p=me();#f=me();constructor(e,t){this.#e=e,this.#t=new Vt(t),this.#_()}get type(){return"orbit"}update(e){this.#g(e)&&this.#_()}frame(e,t){this.#y(e,t)}reset(e,t){this.#y(e,t)}zoom(e){e>0&&(this.#p.zoom+=Math.log(e))}applyConstraints(e){this.#h=e,this.#u=_.clamp(this.#u,-Er,this.#m),this.#_()}dispose(){this.#t.dispose()}get#m(){return this.#h?0:Er}#g(e){if(!ji(this.#t,this.#d,this.#p,this.#f,e))return!1;let t=this.#f;return this.#a+=t.rotX,this.#u=_.clamp(this.#u-t.rotY,-Er,this.#m),t.zoom&&(this.#l=_.clamp(this.#l*Math.exp(-t.zoom),Rr,kr)),(t.panX||t.panY)&&this.#S(t.panX,t.panY),!0}#b(){this.#n.yawPitchBasis(this.#a,this.#u,this.#i,this.#s,this.#o)}#S(e,t){this.#b();let r=_.perspectiveScale(this.#l,this.#e.fov,this.#t.height)*An;this.#r.addScaled(this.#n,-e*r).addScaled(this.#o,t*r)}#_(){this.#b(),this.#e.position.copy(this.#s).scale(this.#l).add(this.#r),this.#e.setAxes(this.#n,this.#o,this.#s)}#y(e,t){this.#r.from(e),this.#s.sub(this.#c.from(t),this.#r),this.#l=_.clamp(this.#s.len,Rr,kr),this.#i.copy(this.#s).scale(-1).normalize(z.FORWARD),this.#c.yawPitch(this.#i),this.#a=this.#c.x,this.#u=_.clamp(this.#c.y,-Er,this.#m),this.#p=me(),this.#_()}},qi=class{#e;#t;#r=new Set;#i=ce.create();#s=k.create();#n=k.create();#o=k.create();#c=k.create();#l=k.create();#a=me();#u=me();#h=me();constructor(e,t){this.#e=e,t.hasAttribute("tabindex")||(t.tabIndex=0),this.#t=new Vt(t,{pan:!1,onDown:()=>t.focus()}),window.addEventListener("keydown",this.#m),window.addEventListener("keyup",this.#g)}get type(){return"fly"}update(e){let t=this.#d(e);this.#p(e)&&(t=!0),t&&this.#f()}frame(e,t){this.reset(e,t)}reset(e,t){this.#e.position.from(t),this.#s.sub(this.#l.from(e),this.#e.position).normalize(z.FORWARD),this.#l.yawPitch(this.#s),this.#i.identity().rotate(z.Y,-this.#l.x).rotate(z.X,this.#l.y),this.#u=me(),this.#f()}zoom(e){e>0&&(this.#u.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#t.dispose(),window.removeEventListener("keydown",this.#m),window.removeEventListener("keyup",this.#g),this.#r.clear()}#d(e){let t=Ol*e*(this.#r.has("shift")?4:1),r=this.#e.position,s=!1,n=(o,l)=>{r.addScaled(o,l),s=!0},a=o=>{this.#i.rotate(z.Z,o),s=!0};return this.#r.has("w")&&n(this.#s,t),this.#r.has("s")&&n(this.#s,-t),this.#r.has("d")&&n(this.#o,t),this.#r.has("a")&&n(this.#o,-t),this.#r.has("r")&&n(this.#c,t),this.#r.has("f")&&n(this.#c,-t),this.#r.has("q")&&a(kn*e),this.#r.has("e")&&a(-kn*e),s}#p(e){if(!ji(this.#t,this.#a,this.#u,this.#h,e))return!1;let t=this.#h;return t.rotX&&this.#i.rotate(z.Y,-t.rotX),t.rotY&&this.#i.rotate(z.X,-t.rotY),t.zoom&&this.#e.position.addScaled(this.#s,t.zoom*Bl),!0}#f(){this.#i.normalize(),this.#o.copy(z.X).transformQuat(this.#i),this.#c.copy(z.Y).transformQuat(this.#i),this.#n.copy(z.Z).transformQuat(this.#i),this.#s.copy(this.#n).scale(-1),this.#e.setAxes(this.#o,this.#c,this.#n)}#m=e=>{let t=e.key.toLowerCase();!zl.has(t)||this.#b()||(this.#r.add(t),e.preventDefault())};#g=e=>{this.#r.delete(e.key.toLowerCase())};#b(){let e=document.activeElement;return e?.tagName==="INPUT"||e?.tagName==="TEXTAREA"||e?.isContentEditable}},Zi=class{#e;#t;#r=k.create();#i=k.create();#s=k.create().copy(z.Y);#n=k.create();#o=k.create();#c=k.create();#l=k.create();#a=k.create();#u=k.create();#h=ce.create();#d=me();#p=me();#f=me();constructor(e,t){this.#e=e,this.#t=new Vt(t)}get type(){return"trackball"}update(e){if(!ji(this.#t,this.#d,this.#p,this.#f,e))return;let t=this.#f;(t.rotX||t.rotY)&&this.#g(t.rotX,t.rotY),t.zoom&&this.#b(t.zoom),(t.panX||t.panY)&&this.#S(t.panX,t.panY),this.#_()}frame(e,t){this.#y(e,t)}reset(e,t){this.#y(e,t)}zoom(e){e>0&&(this.#p.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#t.dispose()}#m(){this.#n.copy(this.#i).normalize(z.Z),this.#o.cross(this.#s,this.#n).normalize(z.X),this.#c.cross(this.#n,this.#o)}#g(e,t){this.#m(),this.#l.copy(this.#o).scale(e).addScaled(this.#c,-t);let r=this.#l.len;r<1e-6||(this.#a.cross(this.#l,this.#i).normalize(z.Y),this.#h.setAxisAngle(this.#a,r),this.#i.transformQuat(this.#h),this.#s.transformQuat(this.#h).normalize())}#b(e){this.#i.setLength(_.clamp(this.#i.len*Math.exp(-e),Rr,kr))}#S(e,t){this.#m();let r=_.perspectiveScale(this.#i.len,this.#e.fov,this.#t.height)*An;this.#r.addScaled(this.#o,-e*r).addScaled(this.#c,t*r)}#_(){this.#e.up.copy(this.#s),this.#e.position.copy(this.#r).add(this.#i),this.#e.lookAt(this.#r)}#y(e,t){this.#r.from(e),this.#i.sub(this.#u.from(t),this.#r),this.#i.setLength(_.clamp(this.#i.len,Rr,kr)),this.#s.copy(z.Y),this.#m(),this.#s.copy(this.#c),this.#p=me(),this.#_()}};function Qi(i,e,t){switch(i){case"fly":return new qi(e,t);case"trackball":return new Zi(e,t);default:return new Yi(e,t)}}var $i=class{position=k.create();target=k.create();up=k.create().copy(z.Y);matrixWorld=Q.create();projectionMatrix=Q.create();fov;aspect;near;far;constructor(e=60,t=1,r=.05,s=1e4){this.fov=e,this.aspect=t,this.near=r,this.far=s,this.updateProjectionMatrix(),this.updateMatrixWorld()}lookAt(e){return this.target.from(e),this.updateMatrixWorld()}updateProjectionMatrix(){this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far)}updateMatrixWorld(){return this.matrixWorld.cameraWorld(this.position,this.target,this.up),this.matrixWorld}setAxes(e,t,r){return this.up.copy(t),this.target.copy(this.position).addScaled(r,-1),this.matrixWorld.cameraWorldAxes(this.position,e,t,r)}},In=[0,1.5,1],Hl=[0,1.7,0],Vl=[0,.4,0],Wl=-.25,Ar=class{#e=Q.create();#t=k.create();#r=k.create();#i;#s;#n;#o=!1;#c=!1;#l=null;#a=null;constructor(e,t="orbit"){this.#n=e,this.#i=new $i,this.#s=Qi(t,this.#i,e),this.#u()}get canPresent(){return this.#o}get view(){return this.#i}get controls(){return this.#s}get controlsType(){return this.#s.type}setControls(e){e!==this.#s.type&&(this.#s.dispose(),this.#s=Qi(e,this.#i,this.#n),this.reset(),this.#s.applyConstraints(this.#c))}setSceneTransform(e){e?this.#e.fromTransform(e):this.#e.identity(),this.#c=!!e,this.#s.applyConstraints(this.#c),this.#o=!1}setAudioPosition(e){e?this.#t.fromXYZ(e):this.#t.set(0,0,0)}setBBox(e){if(!e)return;this.#e.pointTo(this.#r,mr.center(this.#r,e)),this.#c||this.#r.addXYZ(0,Wl);let t=this.#r.toArray(),r=this.#c?Hl:In;this.#l=t,this.#a=r,this.#s.frame(t,r),this.#o=!0}update(e){this.#s.update(e)}apply(e,t,r){e.setModelMatrix(this.#e),t>0&&r>0&&(this.#i.aspect=t/r,this.#i.updateProjectionMatrix()),e.setCamera(this.#i.matrixWorld,this.#i.projectionMatrix),this.#o&&(e.setAudioSourceMatrix(this.#e,this.#t),e.setAudioListenerMatrix(this.#i.matrixWorld))}zoom(e){this.#s.zoom(e)}reset(){this.#l&&this.#a?(this.#s.frame(this.#l,this.#a),this.#o=!0):this.#u()}dispose(){this.#s.dispose()}#u(){this.#s.reset(Vl,In),this.#o=!1}};var Ir=class{#e;#t;#r;#i;#s;#n;#o;#c;#l=null;#a=!1;#u=!1;#h=!1;#d=null;#p=0;onFrame=null;onBeforeRender=null;onBeforeEyeRender=null;onEyeRender=null;onASWRender=null;onRefReset=null;onSessionEnd=null;externalLayers=[];constructor(e,t){this.#e=e,this.#t=t}get session(){return this.#r}get active(){return!!this.#r}get aswAvailable(){return!!this.onASWRender}get aswActive(){return this.#a&&!!this.#r}get layeredActive(){return this.#u&&!!this.#r}get isAR(){return this.#h&&!!this.#r}get defaultDt(){return 1/(this.#a?36:72)}get binding(){return this.#s}get refSpace(){return this.#i}set soundPosition(e){this.#d=e?[e.x,e.y,e.z]:null}async enter(e=!1){if(!navigator.xr||this.#r)return{isQuest:!1,isPico:!1,isAVP:!1};let t=this.#t,r=this.#e;this.#h=e,this.#l=t.getExtension("OCULUS_multiview")||t.getExtension("OVR_multiview2")||null;let s=navigator.userAgent,n=/PicoBrowser/i.test(s),a=/OculusBrowser/i.test(s)&&!n,o=/Version\//.test(s)&&/Safari\//.test(s)&&!a&&!n;if(this.#r=await navigator.xr.requestSession(e?"immersive-ar":"immersive-vr",{optionalFeatures:["local-floor",e&&"local",a&&"layers",a&&"space-warp",(a||n)&&"hand-tracking"].filter(Boolean)}),!this.#r)throw new Error(`Failed to start ${e?"AR":"VR"} session`);let l=new Set(this.#r.enabledFeatures??[]);for(let c of["local-floor","local","viewer"])try{this.#i=await this.#r.requestReferenceSpace(c);break}catch{}this.#i?.addEventListener("reset",()=>this.onRefReset?.()),this.#u=this.#a=!1;let h=n?.75:1;if(l.has("layers"))try{t.getExtension("EXT_color_buffer_half_float"),this.#s=new XRWebGLBinding(this.#r,t),this.#n=this.#s.createProjectionLayer({textureType:"texture-array",depthFormat:t.DEPTH_COMPONENT24,scaleFactor:h,...e&&{clearOnAccess:!1}}),this.#u=!0,this.#a=l.has("space-warp"),!this.#a&&this.#n.fixedFoveation!==void 0&&(this.#n.fixedFoveation=1),await this.#r.updateRenderState({layers:[this.#n]}),this.#o=t.createFramebuffer(),this.#a&&(this.#c=t.createFramebuffer())}catch{this.#u=this.#a=!1,this.#s=this.#n=null}if(!this.#u){let c=new XRWebGLLayer(this.#r,t,{framebufferScaleFactor:h,...e&&{alpha:!0}});c.fixedFoveation!==void 0&&(c.fixedFoveation=1),await this.#r.updateRenderState({baseLayer:c})}return r.resetXR(),this.#r.addEventListener("end",()=>this.#b()),this.#p=0,this.#r.requestAnimationFrame(this.#f),{isQuest:a,isPico:n,isAVP:o}}#f=(e,t)=>{let r=this.#r;if(!r)return;r.requestAnimationFrame(this.#f);let s=_.deltaSeconds(e,this.#p,this.defaultDt,4*this.defaultDt);this.#p=e,this.onFrame?.(s,t)};exit(){this.#r?.end()}renderFrame(e,t,r=1){let s=this.#e,n=this.#t,a=t.getViewerPose(this.#i);if(!a||a.views.length<1)return;let o=this.#S(a);if(!this.#h&&o.length<2){this.#m(s,a,r);return}(o.length>=2||this.#h)&&(this.onBeforeRender?.(e,t,this.#i,a,t.session.inputSources,s),this.#g());let l=o[1]??null;s.setCamera(o[0].transform.matrix,o[0].projectionMatrix,l?.transform.matrix,l?.projectionMatrix),this.#a?this.#w(n,s,o):this.#u?this.#T(n,s,o):this.#v(n,s,o,t),this.#m(s,a,r)}#m(e,t,r){let s=this.#d;if(!s){let a=e.getBBox();a&&(s=[(a.minX+a.maxX)*.5,(a.minY+a.maxY)*.5,(a.minZ+a.maxZ)*.5])}let n=e.getModelMatrix();s&&n&&e.setAudioSourceMatrix(n,s,r),e.setAudioListenerMatrix(t.transform.matrix)}#g(){!this.#r||!this.#u||this.#r.updateRenderState({layers:[this.#n,...this.externalLayers]})}#b=()=>{if(!this.#r)return;let e=this.#t;this.#o&&(e.deleteFramebuffer(this.#o),this.#o=null),this.#c&&(e.deleteFramebuffer(this.#c),this.#c=null),this.#r=this.#i=this.#n=this.#s=null,this.#a=this.#u=this.#h=!1,this.#p=0,this.externalLayers=[],this.onSessionEnd?.()};#S(e){if(e.views.length<2)return[e.views[0]];let t=e.views.find(s=>s.eye==="left")||e.views[0],r=e.views.find(s=>s.eye==="right")||e.views[1];return[t,r]}#_(e,t){e.bindFramebuffer(e.FRAMEBUFFER,t),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.clearColor(0,0,0,this.#h?0:1)}#y(e,t,r,s,n,a,o,l,h,c=e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT){e.viewport(n,a,o,l),e.clear(c),this.onBeforeEyeRender?.(e,r,s,n,a,o,l),t.render(t.drawMode,n,a,o,l,h),this.onEyeRender?.(e,r,s,n,a,o,l)}#v(e,t,r,s){let n=s.session.renderState.baseLayer,a=r.map(o=>n.getViewport(o));t.preprocess(a[0].width,a[0].height),e.bindFramebuffer(e.FRAMEBUFFER,n.framebuffer),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.clearColor(0,0,0,this.#h?0:1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.disable(e.DEPTH_TEST),e.depthMask(!1);for(let o=0;o<r.length;o++){let l=a[o];this.onBeforeEyeRender?.(e,n.framebuffer,r[o],l.x,l.y,l.width,l.height),t.render(t.drawMode,l.x,l.y,l.width,l.height,o),this.onEyeRender?.(e,n.framebuffer,r[o],l.x,l.y,l.width,l.height)}}#T(e,t,r){let s=r.map(o=>this.#s.getViewSubImage(this.#n,o)),n=s[0].colorTextureWidth,a=s[0].colorTextureHeight;t.preprocess(n,a),this.#_(e,this.#o);for(let o=0;o<r.length;o++){let l=s[o],h=l.imageIndex??o;e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.colorTexture,0,h),l.depthStencilTexture&&e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,h),this.#y(e,t,this.#o,r[o],0,0,n,a,o)}e.bindFramebuffer(e.FRAMEBUFFER,null)}#w(e,t,r){let s=r.map(c=>this.#s.getViewSubImage(this.#n,c)),n=s[0].colorTextureWidth,a=s[0].colorTextureHeight,o=s.map((c,u)=>c.imageIndex??u);this.#n&&(this.#n.deltaPose=null),t.preprocess(n,a),this.#_(e,this.#o);for(let c=0;c<r.length;c++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,s[c].colorTexture,0,o[c]),this.#y(e,t,this.#o,r[c],0,0,n,a,c,e.COLOR_BUFFER_BIT);let l=s[0];if(l.motionVectorTexture&&l.depthStencilTexture){let c=l.motionVectorTextureWidth,u=l.motionVectorTextureHeight,p=t.canMotion();if(e.bindFramebuffer(e.FRAMEBUFFER,this.#c),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),e.clearColor(0,0,0,0),e.clearDepth(1),this.#l&&o.length>=2&&o[1]===o[0]+1&&t.hasMultiview())this.#l.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.motionVectorTexture,0,o[0],2),this.#l.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,o[0],2),e.viewport(0,0,c,u),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),p&&t.renderMotionMV(0,0,c,u);else for(let g=0;g<r.length;g++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,s[g].motionVectorTexture,0,o[g]),e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,s[g].depthStencilTexture,0,o[g]),e.viewport(0,0,c,u),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),p&&t.render(3,0,0,c,u,g);let d=(g,f,m)=>({view:g,colorTex:f.colorTexture,colorIdx:m,mvTex:f.motionVectorTexture,mvIdx:m,depthTex:l.depthStencilTexture,w:n,h:a,mvW:c,mvH:u});this.onASWRender?.(e,r.map((g,f)=>d(g,s[f],o[f])))}else this.onASWRender?.(e,r.map((c,u)=>({view:c,colorTex:s[u].colorTexture,colorIdx:o[u],w:n,h:a})));e.bindFramebuffer(e.FRAMEBUFFER,null)}};var On=Q.create().fromScaling(z.FLIP_Z),Fr=Q.create().copy(On).multiply(Q.create().fromTranslation([0,1,-1])),Ul=.04,Yl=.5,ql=1,Zl=Math.PI/6,be=k.create(),Wt=k.create(),Fn=k.create(),jl=ce.create(),Or=class{#e=k.create();#t=ce.create();#r=1;#i=k.create();#s=Q.clone(Fr);#n=Fr;#o=Q.create();#c=Q.create();#l="none";#a=k.create();#u={mid:k.create(),dist:0,axX:0,axZ:0};#h="undecided";#d=0;#p=0;#f=!1;#m=!1;#g=!1;get position(){return this.#e}get scale(){return this.#r}get sceneTransform(){return this.#s}get scaleLocked(){return this.#f}set scaleLocked(e){this.#f=!!e}setCenter(e,t,r){this.#i.set(e,t,r)}setSceneTransform(e){this.#n=e?On:Fr,e?this.#s.fromTransform(e).preMultiply(this.#n):this.#s.copy(Fr)}resetToInitial(){this.#e.set(0,0,0),this.#r=1,this.#t.identity()}reset(){this.#l="none"}isHeld(e){return this.#l==="dual"||this.#l===e}update(e,t,r,s,n=!0,a=null){for(let p of r)this.#y(p,s,a);let o=e.gripTransform?.position,l=t.gripTransform?.position,h=n&&e.active&&e.gripping&&!!o,c=n&&t.active&&t.gripping&&!!l,u=h&&e.grabRestart||c&&t.grabRestart;h&&c?this.#_(o,l,u):h?this.#S("left",o,u):c?this.#S("right",l,u):this.reset()}buildModelMatrix(){return this.#b(this.#o,this.#s)}buildRoomMatrix(){return this.#b(this.#c,this.#n)}#b(e,t){return be.copy(this.#i).transformMat4(this.#s),Wt.set(this.#r,this.#r,-this.#r),e.fromPivot(this.#e,this.#t,Wt,be,t)}#S(e,t,r){if(r||this.#l!==e){this.#l=e,this.#a.fromXYZ(t);return}if(be.fromXYZ(t).sub(this.#a),be.sqrLen>.01){this.#a.fromXYZ(t);return}this.#e.add(be),this.#a.fromXYZ(t)}#_(e,t,r){be.midXYZ(e,t);let s=Wt.fromXYZ(e).distanceXYZ(t),n=s||1,a=(t.x-e.x)/n,o=(t.z-e.z)/n,l=this.#u;if(r||this.#l!=="dual"){this.#l="dual",l.mid.copy(be),l.dist=s,l.axX=a,l.axZ=o,this.#h="undecided",this.#d=0,this.#p=0;return}let h=0;l.dist>.03&&s>.03&&(h=_.absLogRatio(s,l.dist));let c=l.axX,u=l.axZ;l.axX=a,l.axZ=o;let p=_.unlerp01(Math.min(Math.hypot(c,u),Math.hypot(a,o)),.08,.33),d=0;if(p>0&&(d=_.wrapPi(Math.atan2(o,a)-Math.atan2(u,c))*p),this.#h==="undecided"){this.#f||(this.#d+=h),this.#p+=Math.abs(d);let g=Ul;(this.#d>=g||this.#p>=g)&&(this.#h=this.#d>=this.#p?"scale":"rotate")}if(this.#h==="scale"&&!this.#f&&l.dist>.03&&s>.03){let g=this.#r;this.#r=_.clamp(g*(s/l.dist),.01,100);let f=this.#r-g;Wt.copy(this.#i).transformMat4(this.#s),this.#e.add(Fn.copy(Wt).multiplyXYZ(-f,-f,f))}this.#h==="rotate"&&_.outside(d,5e-4)&&this.#t.rotatePre(z.Y,d),this.#e.add(Fn.sub(be,l.mid)),l.mid.copy(be),l.dist=s}#y(e,t,r){let s=e.gamepad;if(!s?.axes||s.axes.length<2)return;let n=s.axes.length>=4?2:0;this.#v(s.axes[n],-s.axes[n+1],t,r);let a=s.buttons?.[3]?.pressed??!1;e.handedness==="left"?(a&&!this.#m&&this.resetToInitial(),this.#m=a):(a&&!this.#g&&this.resetToInitial(),this.#g=a)}#v(e,t,r,s){if(!(Math.hypot(e,t)<=Yl)){if(Math.abs(t)<=Math.abs(e)){this.#t.rotatePre(z.Y,-Math.sign(e)*Zl*r);return}s&&(be.copy(z.FORWARD).transformQuat(jl.fromXYZW(s.orientation)).multiplyXYZ(1,0,1).normalize(z.FORWARD),this.#e.addScaled(be,-t*ql*r))}}};var Br=class{on=!1;#e=-1;update(e){this.#e<0?this.#e=e:this.#e=e>this.#e?e:(this.#e+e)*.5,this.on=this.#e<(this.on?.018:.015)}reset(){this.on=!1,this.#e=-1}},Gr=class i{static#e=30;static#t=300;static#r=.02;#i=k.create();#s=!1;#n=0;#o=null;tapped=!1;update(e,t){if(this.tapped=!1,e&&!this.#s)this.#n=performance.now(),this.#o=t?{x:t.x,y:t.y,z:t.z}:null;else if(!e&&this.#s){let r=performance.now()-this.#n,s=this.#o,n=s&&t?this.#i.fromXYZ(t).distanceXYZ(s):0;r>=i.#e&&r<=i.#t&&n<i.#r&&(this.tapped=!0)}this.#s=e}reset(){this.#s=!1,this.tapped=!1,this.#o=null}},Nr=class i{static#e=30;static#t=300;#r=!1;#i=0;tapped=!1;update(e){if(this.tapped=!1,e&&!this.#r)this.#i=performance.now(),this.#r=!0;else if(!e&&this.#r){let t=performance.now()-this.#i;t>=i.#e&&t<=i.#t&&(this.tapped=!0),this.#r=!1}}reset(){this.#r=!1,this.tapped=!1}},zr=class{#e=[!1,!1];update(e){if(!e||e.length<=6)return 0;let t=e[5]?.pressed??!1,r=e[6]?.pressed??!1,s=t&&!this.#e[0]?-1:r&&!this.#e[1]?1:0;return this.#e[0]=t,this.#e[1]=r,s}reset(){this.#e[0]=this.#e[1]=!1}},Dr=class{#e;left={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};right={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};stickSrcs=[];#t=null;#r=null;#i;#s;#n;#o;#c=new Nr;#l=new Nr;constructor({directGrab:e=!1}={}){this.#o=e,this.#e=ce.create().setAxisAngle(z.X,-.8),this.#s=k.create(),this.#n=ce.create(),this.#i=new Map([[this.left,{side:"left",pinch:new Br,tap:new Gr,swipe:new zr,smooth:k.create(),smoothActive:!1,rayPos:k.create(),rayOri:ce.create(),rayActive:!1}],[this.right,{side:"right",pinch:new Br,tap:new Gr,swipe:new zr,smooth:k.create(),smoothActive:!1,rayPos:k.create(),rayOri:ce.create(),rayActive:!1}]])}#a(e){e.active=e.gripping=e.isHandProfile=e.grabRestart=e.triggerPressed=e.menuPressed=e.isTransientPointer=!1,e.microSwipe=0,e.rayTransform=e.gripTransform=e.indexTip=e.thumbTip=null}read(e,t,r,s){this.#a(this.left),this.#a(this.right),this.stickSrcs.length=0;let n=null,a=null;for(let o of r||[]){if(o.targetRayMode==="transient-pointer"){let h=e.getPose(o.targetRaySpace,t);if(!h)continue;let u=((o.gripSpace?e.getPose(o.gripSpace,t):null)??h).transform,p=this.#u(o,u.position,n,a);this.#h(p,h.transform,u,o,s),p===this.left?n=o:a=o;continue}o.gripSpace&&!o.hand&&o.gamepad?.axes?.length>=2&&!o.profiles?.some(h=>h.includes("hand"))&&this.stickSrcs.push(o);let l=o.handedness==="left"?this.left:o.handedness==="right"?this.right:null;!l||l.active||(o.hand?this.#d(l,o,e,t,s):o.gripSpace&&this.#p(l,o,e,t,s))}this.#t=n,this.#r=a,(n||a)&&(this.stickSrcs.length=0,n||(this.left.gripping=!1),a||(this.right.gripping=!1)),s.uiActive?(this.#c.reset(),this.#l.reset()):(this.#c.update(!!n),this.#l.update(!!a)),this.#c.tapped&&(this.left.menuPressed=!0),this.#l.tapped&&(this.right.menuPressed=!0);for(let[o,l]of this.#i)o.indexTip||(l.pinch.reset(),l.tap.reset(),l.swipe.reset(),l.smoothActive=!1,l.rayActive=!1)}#u(e,t,r,s){if(e.handedness==="left")return this.left;if(e.handedness==="right")return this.right;if(r&&!s)return this.right;if(s&&!r)return this.left;let n=this.left.gripTransform?.position,a=this.right.gripTransform?.position,o=n?this.#s.fromXYZ(t).distanceXYZ(n):1/0,l=a?this.#s.fromXYZ(t).distanceXYZ(a):1/0;return o<=l?this.left:this.right}#h(e,t,r,s,{isHeld:n,hitTest:a,uiActive:o}){e.rayTransform=t,e.gripTransform=r,e.active=e.triggerPressed=e.isTransientPointer=!0;let{side:l}=this.#i.get(e),h=l==="left"?this.#t:this.#r,c=h!=null&&h!==s,u=h===s;!c&&n(l)?e.gripping=!0:o||(this.#o&&u||!this.#o&&a&&a(t)||n(l==="left"?"right":"left"))&&(e.gripping=!0,c&&(e.grabRestart=!0))}#d(e,t,r,s,{isHeld:n,uiActive:a,viewerPose:o}){let l=t.hand.get("wrist");if(!l)return;let h=r.getJointPose?.(l,s);if(!h)return;e.gripTransform=h.transform;let c=this.#f(t.hand,"index-finger-tip",r,s),u=this.#f(t.hand,"thumb-tip",r,s),p=this.#f(t.hand,"index-finger-phalanx-proximal",r,s);c&&(e.indexTip=c.transform.position),u&&(e.thumbTip=u.transform.position);let d=this.#i.get(e);if(p){this.#n.fromXYZW(h.transform.orientation).mul(this.#e);let f=d.rayPos,m=d.rayOri;d.rayActive?(f.lerp(this.#s.fromXYZ(p.transform.position),.5),m.slerp(this.#n,.5)):(f.fromXYZ(p.transform.position),m.copy(this.#n),d.rayActive=!0),e.rayTransform={position:f.toXYZ(),orientation:m.toXYZW()}}else e.rayTransform=c?.transform??null,d.rayActive=!1;if(c&&u){let f=c.transform.position,m=u.transform.position;d.pinch.update(this.#s.fromXYZ(f).distanceXYZ(m)),e.gripping=e.triggerPressed=d.pinch.on}else{d.pinch.reset();let f=t.gamepad?.buttons?.[0];e.gripping=f?f.pressed||f.value>.5:!1,e.triggerPressed=e.gripping}a?(d.tap.reset(),n(d.side)||(e.gripping=!1)):(d.tap.update(d.pinch.on,h.transform.position),d.tap.tapped&&(e.menuPressed=!0)),e.gripping&&!n(d.side)&&!this.#g(h.transform.position,o)&&(e.gripping=!1),e.active=!0,e.microSwipe=d.swipe.update(t.gamepad?.buttons);let g=d.smooth;d.smoothActive||(g.fromXYZ(h.transform.position),d.smoothActive=!0),g.lerp(this.#s.fromXYZ(h.transform.position),.4),e.gripTransform={position:g.toXYZ(),orientation:h.transform.orientation}}#p(e,t,r,s,{isHeld:n,uiActive:a,viewerPose:o}){let l=r.getPose(t.gripSpace,s);l&&(e.gripTransform=l.transform);let h=r.getPose(t.targetRaySpace,s);if(h&&(e.rayTransform=h.transform),!e.gripTransform&&!e.rayTransform)return;if(e.isHandProfile=t.profiles?.some(p=>p.includes("hand"))??!1,t.targetRayMode==="tracked-pointer"&&t.gamepad?.buttons?.[0]){let p=t.gamepad.buttons[0],d=p.pressed||p.value>.5;e.gripping=e.isHandProfile?d:t.gamepad?.buttons?.[1]?.pressed??!1}else e.gripping=t.gamepad?.buttons?.[1]?.pressed??!1;e.triggerPressed=t.gamepad?.buttons?.[0]?.pressed??!1;let c=t.gamepad?.buttons;e.menuPressed=!!(c?.[4]?.pressed||c?.[5]?.pressed||c?.[12]?.pressed);let{side:u}=this.#i.get(e);e.isHandProfile&&e.gripping&&!n(u)&&(a||!this.#g(e.gripTransform?.position,o))&&(e.gripping=!1),e.gripping&&!e.gripTransform&&(e.gripping=!1),e.active=!0,e.isHandProfile&&e.rayTransform&&(e.rayTransform=this.#m(e.rayTransform.orientation,e.rayTransform.position))}#f(e,t,r,s){let n=e.get(t);return n?r.getJointPose?.(n,s)??null:null}#m(e,t){return this.#n.fromXYZW(e).mul(this.#e),{position:t,orientation:this.#n.toXYZW()}}#g(e,t){if(!t||!e)return!0;let r=t.position;this.#s.subXYZ(e,r).transformQuat(this.#n.fromXYZW(t.orientation).invert());let s=this.#s.xzLen;return s<.05||this.#s.y>-1.19*s}};var ht=class{#e;#t;#r;#i;#s=!0;#n=!1;#o=!1;#c=!1;#l=!1;constructor(e,t=null,{directGrab:r=!1}={}){this.#e=e,this.#t=t,this.#r=new Dr({directGrab:r}),this.#i=new Or}setOverlay(e){this.#t=e,this.#s=!0}get#a(){return this.#t?this.#t.hasBBox:this.#n}reset(){this.#i.reset(),this.#c=this.#l=!1}invalidateBBox(){this.#s=!0}setInitialTransform(e){this.#i.setSceneTransform(e),this.#s=!0,this.#u()}get scene(){return this.#t?.scene??null}get scale(){return this.#i.scale}get roomMatrix(){return this.#i.buildRoomMatrix()}get leftHand(){return this.#r.left}get rightHand(){return this.#r.right}get locked(){return this.#o}set locked(e){this.#o=!!e,this.#o&&this.#i.reset()}get scaleLocked(){return this.#i.scaleLocked}set scaleLocked(e){this.#i.scaleLocked=e}resetToInitial(){this.#i.resetToInitial(),this.#i.reset()}update(e,t,r,s,n,a=!1){let o=t.getViewerPose(r);this.#r.read(t,r,s,{isHeld:c=>this.#i.isHeld(c),hitTest:c=>this.#t?.hitTest(c)??!1,uiActive:n,viewerPose:o?.transform??null}),(this.#s||!this.#a)&&this.#h();let l=this.#r.left,h=this.#r.right;if(l.held=h.held=!1,!this.#o){this.#i.update(l,h,this.#r.stickSrcs,e,this.#a&&!a,o?.transform??null);let c=this.#i.isHeld("left"),u=this.#i.isHeld("right");l.held=c&&this.#c,h.held=u&&this.#l,this.#c=c,this.#l=u}this.#u()}#u(){this.#a&&this.#t?.applyTransform(this.#i.position,this.#i.scale),this.#e.setModelMatrix?.(this.#i.buildModelMatrix())}#h(){let e=this.#e.getBBox?.();if(!e)return;let t,r,s;this.#t?{cx:t,cy:r,cz:s}=this.#t.rebuildBBox(e,this.#i.sceneTransform):(t=(e.minX+e.maxX)/2,r=(e.minY+e.maxY)/2,s=(e.minZ+e.maxZ)/2,this.#n=!0),this.#i.setCenter(t,r,s),this.#s=!1}};function Bn(){let i=document.createElement("canvas");return i.style.display="block",i.style.width="100%",i.style.height="100%",i.style.touchAction="none",i}var Gn=i=>i.getContext("webgpu"),ut=class i{#e=null;#t;#r=null;#i=null;#s=null;#n=null;#o=0;#c=0;#l=null;#a=null;#u=new Xt;#h=null;#d=!1;#p=!1;#f=0;#m="pw";#g="pw";#b=null;#S=!1;#_={};#y=null;#v=null;#T=null;#w=!1;#x=[];#M=-1;onProgress=null;onReady=null;onError=null;onFrame=null;onBeforeFrame=null;onModeChange=null;onSceneChange=null;onSceneEnd=null;static async create(e,{container:t,overlay:r=null,boundaryRenderer:s=null,mode:n="pw"}={}){if(!t)throw new Error("container element required");if(!navigator.gpu)throw new Error("WebGPU not available");let a=new i;a.#l=r,a.#a=s,r&&(r.onSceneChange=(l,h)=>a.loadScene(h)),navigator.xr&&(a.#_.vr=await navigator.xr.isSessionSupported("immersive-vr").catch(()=>!1),a.#_.ar=await navigator.xr.isSessionSupported("immersive-ar").catch(()=>!1));let o=n==="hw"?"hw":n==="vr"||n==="ar"?n:"pw";return a.#t=Bn(),t.appendChild(a.#t),a.#e=await at.create(e,{canvas:a.#t,backend:o==="hw"?"hybrid":"pure"}),a.#q(),await a.#C(o),a.#m=o,a}get player(){return this.#e}get camera(){return this.#i}get canvas(){return this.#t}get gl(){return this.#e?.gl??null}get audioContext(){return this.#e?.audioContext??null}get device(){return this.#e?.device??null}get mode(){return this.#m}get fallbackMode(){return this.#g}get xr(){return this.#s}get manipulator(){return this.#n}get drawMode(){return this.#e.drawMode}set drawMode(e){this.#e.drawMode=e}supports(e){return e==="pw"||e==="hw"||!!this.#_[e]}set sources(e){this.#x=e??[],this.#M=Math.min(this.#M,Math.max(0,this.#x.length-1)),this.#l&&(this.#l.sources=this.#x)}get sources(){return this.#x}get sceneIndex(){return this.#M}loadScene(e){let t=this.#x;if(e<0||e>=t.length)return;let r=t[e];this.#M=e,this.#v=null,this.setInitialTransform(r.initialTransform??null),this.setBackground(r.background??"#000"),r.controls&&this.setControls(r.controls),this.setBounds(r.bounds??null),this.#n&&(this.#n.locked=r.locked??this.#n.locked,this.#n.scaleLocked=r.scaleLocked??this.#n.scaleLocked);let s=r.staticTransform??null,n=r.staticUrl??null;this.#H(async a=>{if(n){let o=new File([await(await fetch(n)).arrayBuffer()],"static.sog");if(!a()||(await this.#e.open({file:o,type:"static"}),!a()))return}await this.#e.open(r),a()&&s&&this.#P(s)}),this.setAudioPosition(r.audioPosition??null),this.#l&&(this.#l.sceneIndex=e),this.onSceneChange?.(r,e)}start(){this.#d=!0,this.#k()}stop(){this.#d=!1,this.#E()}open(e){return this.setInitialTransform(e.initialTransform??null),this.setBounds(e.bounds??null),this.setAudioPosition(e.audioPosition??null),this.#H(()=>this.#e.open(e))}close(){++this.#f,this.#I(),this.#e.close(),this.#p=!1,this.#d=!1;let e=this.#m,t=this.#g,r=t!=="pw"?"hybrid":"pure";r!==this.#e.backend&&this.#Y(r),this.#B(),this.#m=t,t!==e&&this.onModeChange?.(t,e)}async setMode(e){if(this.#b=e,!this.#S){this.#S=!0;do e=this.#b,this.#b=null,e!==this.#m&&await this.#R(e);while(this.#b!=null);this.#S=!1}}async#R(e){let t=this.#m;await this.#z();try{await this.#D(e)}catch(r){if(e===this.#g)throw r;this.onError?.(r),await this.#D(this.#g)}this.#m!==t&&this.onModeChange?.(this.#m,t)}setAudio(e){this.#e.loadAudio(e)}setVolume(e){this.#e?.setVolume(e)}enableAudio(){this.#e?.enableAudio()}disableAudio(){this.#e?.disableAudio()}get audioEnabled(){return this.#e?.audioEnabled??!1}setAudioPanner(e){this.#e?.setAudioPanner(e)}setBackground(e){this.#t&&(this.#t.style.background=e||"#000")}setInitialTransform(e,t=null){this.#y=e??null,this.#i?.setSceneTransform(this.#y),this.#n&&(this.#n.setInitialTransform(this.#y),!this.#p&&this.#x[this.#M]?.resetPositionOnStart!==!1&&this.#n.resetToInitial()),t?.translation&&t.rotation&&t.scale&&this.#P(t)}#P(e){this.#e?.setStaticModelMatrix(Q.create().fromTransform(e))}reset(){this.#i?.reset()}setControls(e){this.#i?.setControls(e)}setBounds(e){this.#u.setBounds(e),this.#a?.sync(this.#u)}setAudioPosition(e){this.#T=e??null,this.#i?.setAudioPosition(this.#T),this.#s&&(this.#s.soundPosition=this.#T)}dispose(){++this.#f,this.#I(),this.#r?.disconnect(),this.#e?.dispose()}async#C(e){if(e==="vr"||e==="ar"){if(!this.#_[e])throw new Error(`${e.toUpperCase()} not supported`);await this.#N(e==="ar")}else if(e==="pw"||e==="hw")this.#B();else throw new Error(`Unknown mode: ${e}`)}#B(){let e=new Ar(this.#t);this.#i=e,this.#e.backend==="pure"&&(this.#e.drawMode=0),e.setSceneTransform(this.#y),e.setAudioPosition(this.#T),this.#v&&e.setBBox(this.#v),this.#u.reset(Vi)}async#N(e){let t=new Ir(this.#e,this.#e.gl);t.soundPosition=this.#T,t.onSessionEnd=()=>{this.#L(),this.#s===t&&(this.#s=null,this.#n=null,this.setMode(this.#g))};let r=null;try{let s=await t.enter(e),n=this.#x[this.#M];r=new ht(this.#e,null,{directGrab:s.isAVP}),r.locked=n?.locked??!1,r.scaleLocked=n?.scaleLocked??!0,r.setInitialTransform(this.#y),this.#u.reset(ct).queueIntro(),this.#a?.init(this.#e.gl);let a=this.#l;a&&(a.manipulator=r,await a.init(this.#e,t.session,t.binding,t.refSpace,this.#e.gl,e),t.onASWRender=(l,h)=>a.render(l,h),t.onRefReset=()=>a.onRefReset?.()),t.onBeforeEyeRender=(l,h,c,u,p,d,g)=>this.#a?.renderUnderlay(l,h,c,u,p,d,g),t.onEyeRender=(l,h,c,u,p,d,g)=>{this.#a?.renderEye(l,h,c,u,p,d,g),a?.renderEye(l,h,c,u,p,d,g)};let o=r;t.onBeforeRender=(l,h,c,u,p,d)=>{if(o.update(l,h,c,p,a?.uiActive??!1,a?.uiDragging??!1),this.#G(l,u.transform.position,o.roomMatrix),a){a.frame(l,h,c,u,p,d);let g=[];for(let f of a.quads??[])f.layer&&(f.visible||f.placing)&&g.push(f.layer);t.externalLayers=g}},t.onFrame=(l,h)=>{if(!this.#O(l))return;let c=o.scale;t.renderFrame(l,h,c!==1?1/c:1),this.#X()}}catch(s){throw this.#A(t),this.#L(),t.exit(),s}if(!t.session)throw this.#A(t),new Error("XR session ended during entry");this.#n=r,this.#s=t}#A(e){e.onFrame=null,e.onSessionEnd=null,e.onBeforeRender=null,e.onBeforeEyeRender=null,e.onEyeRender=null,e.onASWRender=null,e.onRefReset=null}#L(){this.#l?.dispose(),this.#a?.dispose()}#G(e,t,r){let s=this.#a;s&&(this.#p||this.#u.setRoomMatrix(r).update(t,e),s.sync(this.#u))}#I(){this.#E(),this.#i?.dispose(),this.#i=null,this.#a?.dispose();let e=this.#s;e&&(this.#s=null,this.#n=null,this.#A(e),this.#L(),e.exit())}async#z(){this.#E(),this.#i?.dispose(),this.#i=null,this.#a?.dispose();let e=this.#s;if(e){this.#s=null,this.#n=null,e.onFrame=null;try{await e.session?.end()}catch{}}}async#D(e){let t=e!=="pw"?"hybrid":"pure";t!==this.#e.backend&&this.#Y(t),await this.#C(e),(this.#d||this.#p)&&this.#k(),this.#m=e,this.#s||(this.#g=e)}#k(){this.#i&&!this.#o&&(this.#o=requestAnimationFrame(this.#F))}#E(){this.#o&&cancelAnimationFrame(this.#o),this.#o=0,this.#c=0}#F=e=>{this.#o=requestAnimationFrame(this.#F);let t=_.deltaSeconds(e,this.#c,1/60);if(this.#c=e,!this.#O(t))return this.#E();let r=this.#i;if(!r)return this.#E();r.update(t);let{width:s,height:n}=this.#t;r.apply(this.#e,s,n),this.#U(r.canPresent),this.#e.present(s,n),this.#G(t,r.view.position,null),this.#a?.renderOver(this.#t,r.view,this.#V),this.#X()};#V=()=>{if(!this.#e.hasStatic)return this.#t;let e=Math.max(1,this.#t.width>>2),t=Math.max(1,this.#t.height>>2);this.#h||(this.#h=new OffscreenCanvas(e,t),this.#e.configureSurface(Gn(this.#h)));let r=this.#h;r.width!==e&&(r.width=e),r.height!==t&&(r.height=t);let s=Gn(r).getCurrentTexture();return this.#e.renderDynamic({color:s,w:e,h:t})?r:null};#O(e){return this.#Z(),!this.#d&&!this.#p?!1:(this.onBeforeFrame?.(e),!0)}#X(){this.#p&&this.onProgress?.(Math.round(this.#e.progress*100)),this.#W(),this.onFrame?.()}async#H(e){let t=++this.#f,r=()=>t===this.#f;this.#E(),this.#e.close(),this.#v=null,this.#U(!1),this.#p=!0,this.#w=!1;try{await e(r)}catch(s){if(!r())return;this.#p=!1,this.onError?.(s)}r()&&this.#k()}#W(){if(this.#w||!this.#e.ended)return;this.#w=!0;let e=this.#x[this.#M];this.onSceneEnd?.(e,this.#M),(e?.autoSwitchToNext??!0)&&this.#M<this.#x.length-1&&this.loadScene(this.#M+1)}#Z(){if(!this.#v&&this.#e.isReady){let t=this.#e.getBBox();t&&(this.#v=t,this.#i?.setBBox(t))}let e=this.#i;if(e&&!e.canPresent&&this.#v&&e.setBBox(this.#v),!!this.#p){if(!this.#e.isReady){let t=this.#e.lastFetchStatus;t&&t!==200&&t!==206&&(this.#p=!1,this.onError?.(t));return}this.#p=!1,this.#e.play(),this.#n&&(this.#x[this.#M]?.resetPositionOnStart!==!1&&this.#n.resetToInitial(),this.#n.invalidateBBox()),this.onProgress?.(100),this.onReady?.()}}#U(e){this.#t.style.visibility=e?"visible":"hidden"}#Y(e){this.#r?.disconnect();let t=Bn();this.#t.replaceWith(t),this.#t=t,this.#e?.setBackend(e,{canvas:t}),this.#q()}#q(){this.#r?.disconnect();let e=this.#t;this.#r=new ResizeObserver(([t])=>{if(!t)return;let r=_.clamp(devicePixelRatio||1,1,2),s=Math.round(t.contentRect.width*r),n=Math.round(t.contentRect.height*r);s>0&&n>0&&(e.width!==s||e.height!==n)&&(e.width=s,e.height=n)}),this.#r.observe(e)}};var Xr=class i{#e;#t;#r;#i=null;#s=null;#n=null;#o=null;#c=!1;enableMesh=!1;static attach(e,t,r){let s=new i(e,t,r);return s.#u(),s.#l(),s}constructor(e,t,r){this.#e=e,this.#t=t,this.#r=r}get player(){return this.#e}set camera(e){this.#r=e}get camera(){return this.#r}async setAudio(e){await this.#e.loadAudio(e)}setAudioPanner(e){this.#e.setAudioPanner(e)}set entity(e){if(this.#s?.node?.destroy(),this.#s=null,this.#i=e,!e)return;let t=new this.#t.root.constructor("_SplatShadow",this.#t);t.addComponent("render",{type:"box",castShadows:!0,receiveShadows:!1});let r=t.render.meshInstances[0];r.visible=!1,r.cull=!1,e.addChild(t),this.#s=r}get entity(){return this.#i}dispose(){this.#s?.node?.destroy(),this.#o&&(this.#t.renderer.setMeshInstanceMatrices=this.#o[0],this.#t.graphicsDevice.draw=this.#o[1]),this.#e.close(),this.#e.dispose()}#l(){let{renderer:e,graphicsDevice:t}=this.#t,r=e.setMeshInstanceMatrices,s=t.draw;this.#o=[r,s];let n=this;e.setMeshInstanceMatrices=function(...a){return a[0]===n.#s&&(n.#c=!0),r.apply(this,a)},t.draw=function(...a){let o=n.#c;if(n.#c=!1,o){n.enableMesh&&n.#e.isReady&&n.#a();return}return s.apply(this,a)}}#a(){let e=this.#t.graphicsDevice,t=e.gl,r=t.getParameter(t.VIEWPORT),s=e.scope.resolve("matrix_viewProjection").value;s&&(this.#n||(this.#n=new(this.#i.getWorldTransform()).constructor),this.#n.data.set(s),this.#n.mul(this.#i.getWorldTransform()),this.#e.renderMesh(this.#n.data,r[0],r[1],r[2],r[3]),this.#u())}renderFrame(){let e=this.#t.graphicsDevice,t=e.gl,r=e.width,s=e.height;!r||!s||(this.#i&&this.#e.setModelMatrix(this.#i.getWorldTransform().data),this.#r?.camera&&(this.#e.setCamera(this.#r.getWorldTransform().data,this.#r.camera.projectionMatrix.data),this.#e.setAudioListenerMatrix(this.#r.getWorldTransform().data)),this.#i&&this.#e.setAudioSourceMatrix(this.#i.getWorldTransform().data),this.#e.renderHybridViewport(r,s,{gl:t,enableMesh:this.enableMesh}),this.#u())}#u(){let e=this.#t.graphicsDevice;e.shader=null,e.boundVao=null,e.textureUnit=-1;let t=e.textureUnits;if(t)for(let r=0;r<t.length;r++)t[r][0]=t[r][1]=t[r][2]=null}};async function Ki(i,e,t){let r=`${i.replace(/\/+$/,"")}/${e}`,s=await fetch(r,{headers:{"X-VIEW-TOKEN":t}});if(!s.ok)throw new Error(`Streaming metadata fetch failed: ${s.status} ${s.statusText}`);let n=await s.json();return{metadata:n.metadata??null,audioFileLink:n.audioFileLink??null}}async function pt(i,e){let t=e.replace(/\/+$/,"");return Promise.all(i.map(async(r,s)=>{let{metadata:n,audioFileLink:a}=await Ki(t,r.streamingId,r.token);return{id:r.streamingId,label:r.label??n?.name??r.streamingId,url:`${t}/${r.streamingId}/`,token:r.token,displayName:n?.name??void 0,audio:a&&n?.withAudio!==!1?a:void 0,initialTransform:n?.initialSpawn??null,bounds:n?.bounds??null,locked:!1,scaleLocked:!0,autoSwitchToNext:!0,resetPositionOnStart:r.settings?.resetPositionOnStart,...r.rawMetadata}}))}import{useEffect as Kl,useMemo as Ji,useReducer as Jl,useRef as es}from"react";import{useEffect as Ql,useMemo as $l,useState as Nn}from"react";function zn(i,e){let[t,r]=Nn(!1),[s,n]=Nn(!1);Ql(()=>{let o=navigator.xr;if(!o||!i)return;let l=async()=>{let[h,c]=await Promise.all([o.isSessionSupported("immersive-vr").catch(()=>!1),o.isSessionSupported("immersive-ar").catch(()=>!1)]);r(h),n(c)};return l(),o.addEventListener("devicechange",l),()=>o.removeEventListener("devicechange",l)},[i]);let a=e==="vr"||e==="ar";return $l(()=>({vrSupported:t,arSupported:s,isActive:a,setMode:async o=>{await i?.setMode(o)}}),[i,t,s,a])}var Xn=new WeakMap;function Hn(i){return Xn.get(i)}var Vn={app:null,overlay:null,isContentReady:!1,isLoading:!1,progress:0,mode:"pw",error:null,isPlaying:!1,isBuffering:!1,currentTime:0,duration:0,controlsType:"orbit",isMuted:!0,volume:1};function ec(i,e){switch(e.type){case"init":return{...i,app:e.app,overlay:e.overlay};case"frame":{let{isPlaying:t,isBuffering:r,currentTime:s,duration:n,isMuted:a}=e,o=n>0?n:i.duration;return i.isPlaying===t&&i.isBuffering===r&&i.currentTime===s&&i.duration===o&&i.isMuted===a?i:{...i,isPlaying:t,isBuffering:r,currentTime:s,duration:o,isMuted:a}}case"progress":return i.progress===e.value?i:{...i,progress:e.value};case"ready":return{...i,isContentReady:!0,isLoading:!1,progress:100};case"mode":return i.mode===e.mode?i:{...i,mode:e.mode};case"error":return{...i,error:e.error,isLoading:!1};case"open":return{...i,error:null,isLoading:!0,progress:0};case"close":return{...i,isLoading:!1,progress:0};case"reset":return{...Vn,mode:i.mode};case"seek":return{...i,currentTime:e.time};case"camera_controls":return i.controlsType===e.controlsType?i:{...i,controlsType:e.controlsType};case"set_volume":return{...i,volume:e.volume}}}var Dn=new Set(["vr","ar"]);function Hr(i){let{containerRef:e,mode:t="pw",overlay:r,boundaryRenderer:s,moduleUrl:n,moduleFactory:a,onReady:o,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:u,eventLogger:p}=i,[d,g]=Jl(ec,{...Vn,mode:t}),f=es(null),m=es(d);m.current=d;let y=es({onReady:o,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:u,eventLogger:p});y.current={onReady:o,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:u,eventLogger:p},Kl(()=>{let P=e.current;if(!P)return;let X=!1;return(async()=>{try{if(!a&&!n)throw new Error("[gr-react] Either moduleUrl or moduleFactory must be provided");let x=a?await a():await wr(n);if(X)return;let E=r??null;E&&(E.eventLogger={event:(C,H)=>y.current.eventLogger?.event?.(C,{...H,mode:m.current.mode}),error:(C,H)=>y.current.eventLogger?.error?.(C,{...H,mode:m.current.mode})});let A=await ut.create(x,{container:P,overlay:E,boundaryRenderer:s,mode:t});if(X){A.dispose();return}f.current=A,A.onProgress=C=>{g({type:"progress",value:C}),y.current.onProgress?.(C)},A.onReady=()=>{g({type:"ready"}),A.audioEnabled&&A.enableAudio(),y.current.onReady?.()},A.onFrame=()=>{let C=f.current?.player;C&&g({type:"frame",isPlaying:C.isPlaying??!1,isBuffering:C.isBuffering??!1,currentTime:C.currentTime??0,duration:C.duration??0,isMuted:!(C.audioEnabled??!1)})},A.onModeChange=(C,H)=>{g({type:"mode",mode:C}),y.current.onModeChange?.(C,H);let He=Dn.has(H),Ie=Dn.has(C);He&&!Ie&&y.current.onXREnd?.(),!He&&Ie&&y.current.onXRStart?.()},A.onError=C=>{let[H,He]=typeof C=="number"?[new Error(`Streaming fetch failed: HTTP ${C}`),"load"]:[C,"xr"];g({type:"error",error:H}),y.current.eventLogger?.error?.(H,{phase:He,mode:m.current.mode})},A.start(),g({type:"init",app:A,overlay:E}),g({type:"camera_controls",controlsType:A.camera?.controlsType??"orbit"})}catch(x){let E=x instanceof Error?x:new Error(String(x));g({type:"error",error:E}),y.current.eventLogger?.error?.(E,{phase:"init",mode:m.current.mode})}})(),()=>{X=!0;let x=f.current;x&&(x.stop(),x.dispose()),f.current=null,g({type:"reset"})}},[e,r,s,t,a,n]);let{app:b}=d,S=zn(b,d.mode),w=Ji(()=>({play:()=>b?.player?.play(),pause:()=>b?.player?.pause(),togglePlay:()=>{let P=b?.player;if(!P)return;let X=!P.isPlaying;X?P.play():P.pause(),y.current.eventLogger?.event?.("play_pause",{playing:X,mode:m.current.mode})},seek:P=>{g({type:"seek",time:P}),b?.player?.seek(P),y.current.eventLogger?.event?.("seek",{position:P,mode:m.current.mode})},setSpeed:P=>b?.player?.setSpeed(P),setVolume:P=>{g({type:"set_volume",volume:P}),b?.setVolume(P)},toggleMute:()=>{let P=!b?.audioEnabled;P?b?.enableAudio():b?.disableAudio(),y.current.eventLogger?.event?.("mute_toggle",{muted:!P,mode:m.current.mode})},setAudio:P=>b?.setAudio(P)}),[b]),T=Ji(()=>({controlsType:d.controlsType,zoom:P=>b?.camera?.zoom(P),reset:()=>{b?.camera?.reset(),y.current.eventLogger?.event?.("reset",{mode:m.current.mode})},setControls:P=>{if(!b)return;b.setControls(P);let X=b.camera?.controlsType??P;g({type:"camera_controls",controlsType:X}),y.current.eventLogger?.event?.("camera_controls",{controls:X,requestedControls:P,mode:m.current.mode})}}),[b,d.controlsType]),M=Ji(()=>({open(P){b&&(g({type:"open"}),b.open(P))},close(){b?.close(),g({type:"close"})},dispose(){b&&(b.stop(),b.dispose())}}),[b]),O={app:b,device:b?.device??null,overlay:d.overlay,isInitialized:b!==null,isLoading:d.isLoading,isContentReady:d.isContentReady,progress:d.progress,mode:d.mode,error:d.error,isRebuffering:d.isContentReady&&(d.isLoading||d.isBuffering),...M,playback:{isPlaying:d.isPlaying,isBuffering:d.isBuffering,currentTime:d.currentTime,duration:d.duration,isMuted:d.isMuted,volume:d.volume,...w},camera:T,xr:S};return Xn.set(O,{dispatch:g}),O}import{useCallback as Ut,useEffect as tc,useRef as rc,useState as Wn}from"react";function Vr(i,e={}){let{app:t}=i,r=Hn(i)?.dispatch,s=rc(e.onSceneEnd);s.current=e.onSceneEnd;let[n,a]=Wn([]),[o,l]=Wn(-1);tc(()=>{if(t)return t.onSceneChange=(f,m)=>{r?.({type:"open"}),r?.({type:"camera_controls",controlsType:t.camera?.controlsType??"orbit"}),l(m)},t.onSceneEnd=(f,m)=>s.current?.(f,m),()=>{t.onSceneChange=null,t.onSceneEnd=null}},[t,r]);let h=Ut(f=>{t&&(t.sources=f),a(f),l(-1)},[t]),c=Ut(f=>{t?.loadScene(f)},[t]),u=Ut(()=>{t&&t.loadScene(t.sceneIndex+1)},[t]),p=Ut(()=>{t&&t.loadScene(t.sceneIndex-1)},[t]),d=Ut(async(f,m)=>{let y=await pt(f,m);h(y),y.length>0&&c(0)},[h,c]),g=o>=0&&o<n.length?n[o]:null;return{sources:n,index:o,total:n.length,currentSource:g,hasNext:o>=0&&o<n.length-1,hasPrev:o>0,hasAudio:!!g?.audio,setSources:h,loadFromApi:d,next:u,prev:p,goTo:c}}import{jsx as G,jsxs as ic}from"react/jsx-runtime";function Un(){return G("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:G("path",{d:"M5.74023 18.7266V5.17188C5.74023 4.68359 5.86068 4.32552 6.10156 4.09766C6.34245 3.86328 6.62891 3.74609 6.96094 3.74609C7.25391 3.74609 7.55339 3.83073 7.85938 4L19.2363 10.6504C19.64 10.8848 19.9199 11.0964 20.0762 11.2852C20.2389 11.4674 20.3203 11.6888 20.3203 11.9492C20.3203 12.2031 20.2389 12.4245 20.0762 12.6133C19.9199 12.8021 19.64 13.0137 19.2363 13.248L7.85938 19.8984C7.55339 20.0677 7.25391 20.1523 6.96094 20.1523C6.62891 20.1523 6.34245 20.0352 6.10156 19.8008C5.86068 19.5664 5.74023 19.2083 5.74023 18.7266Z"})})}function Yn(){return G("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:G("path",{d:"M7.3418 20.0254C6.91211 20.0254 6.58659 19.9147 6.36523 19.6934C6.15039 19.472 6.04297 19.1465 6.04297 18.7168V5.17188C6.04297 4.74219 6.15039 4.41992 6.36523 4.20508C6.58659 3.98372 6.91211 3.87305 7.3418 3.87305H9.56836C9.99154 3.87305 10.3138 3.97721 10.5352 4.18555C10.7565 4.39388 10.8672 4.72266 10.8672 5.17188V18.7168C10.8672 19.1465 10.7565 19.472 10.5352 19.6934C10.3138 19.9147 9.99154 20.0254 9.56836 20.0254H7.3418ZM14.4414 20.0254C14.0117 20.0254 13.6862 19.9147 13.4648 19.6934C13.2435 19.472 13.1328 19.1465 13.1328 18.7168V5.17188C13.1328 4.74219 13.2435 4.41992 13.4648 4.20508C13.6862 3.98372 14.0117 3.87305 14.4414 3.87305H16.6582C17.0879 3.87305 17.4102 3.97721 17.625 4.18555C17.8464 4.39388 17.957 4.72266 17.957 5.17188V18.7168C17.957 19.1465 17.8464 19.472 17.625 19.6934C17.4102 19.9147 17.0879 20.0254 16.6582 20.0254H14.4414Z"})})}function qn(){return G("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:G("path",{d:"M8.03125 15.5391C7.5 15.5391 7.10156 15.4036 6.83594 15.1328C6.57031 14.8568 6.4375 14.4375 6.4375 13.875V10.8828C6.4375 10.362 6.55208 9.97135 6.78125 9.71094L15.6875 18.6094C15.625 18.8333 15.5208 18.9974 15.375 19.1016C15.2292 19.2057 15.0547 19.2578 14.8516 19.2578C14.6745 19.2578 14.5052 19.2188 14.3438 19.1406C14.1823 19.0625 14.0104 18.9375 13.8281 18.7656L10.4531 15.6094C10.401 15.5625 10.3359 15.5391 10.2578 15.5391H8.03125ZM15.7422 14.3984L10.3203 8.99219H10.5547C10.6016 8.99219 10.6458 8.97135 10.6875 8.92969L13.8281 6.01562C14.0312 5.82812 14.2057 5.69271 14.3516 5.60938C14.4974 5.52083 14.6615 5.47656 14.8438 5.47656C15.1094 5.47656 15.3255 5.56771 15.4922 5.75C15.6589 5.92708 15.7422 6.14323 15.7422 6.39844V14.3984ZM18.4453 20.0781L5.05469 6.70312C4.9401 6.58854 4.88281 6.44792 4.88281 6.28125C4.88281 6.10938 4.9401 5.96615 5.05469 5.85156C5.17448 5.73177 5.31771 5.67448 5.48438 5.67969C5.65104 5.67969 5.79427 5.73698 5.91406 5.85156L19.2891 19.2266C19.4089 19.3464 19.4688 19.487 19.4688 19.6484C19.4688 19.8151 19.4089 19.9583 19.2891 20.0781C19.1797 20.1979 19.0391 20.2578 18.8672 20.2578C18.7005 20.2578 18.5599 20.1979 18.4453 20.0781Z"})})}function Zn(){return G("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:G("path",{d:"M11.7031 19.2578C11.5208 19.2578 11.349 19.2188 11.1875 19.1406C11.026 19.0625 10.8568 18.9375 10.6797 18.7656L7.35156 15.6094C7.29948 15.5625 7.23438 15.5391 7.15625 15.5391H4.91406C4.38802 15.5391 3.98438 15.3958 3.70312 15.1094C3.42188 14.8229 3.28125 14.3958 3.28125 13.8281V10.9219C3.28125 10.3594 3.42188 9.9349 3.70312 9.64844C3.98438 9.35677 4.38802 9.21094 4.91406 9.21094H7.15625C7.23438 9.21094 7.29948 9.1875 7.35156 9.14062L10.6797 6.01562C10.8828 5.82812 11.0547 5.69271 11.1953 5.60938C11.3411 5.52083 11.5052 5.47656 11.6875 5.47656C11.9531 5.47656 12.1693 5.56771 12.3359 5.75C12.5026 5.92708 12.5859 6.14323 12.5859 6.39844V18.3828C12.5859 18.6328 12.5026 18.8411 12.3359 19.0078C12.1745 19.1745 11.9635 19.2578 11.7031 19.2578ZM15.375 15.6875C15.2188 15.5781 15.1302 15.4375 15.1094 15.2656C15.0885 15.0938 15.138 14.9245 15.2578 14.7578C15.4818 14.4401 15.6562 14.0755 15.7812 13.6641C15.9062 13.2474 15.9688 12.8125 15.9688 12.3594C15.9688 11.9062 15.9062 11.4714 15.7812 11.0547C15.6615 10.638 15.487 10.2734 15.2578 9.96094C15.1328 9.79948 15.0807 9.63281 15.1016 9.46094C15.1276 9.28385 15.2188 9.14062 15.375 9.03125C15.5104 8.9375 15.6589 8.90625 15.8203 8.9375C15.9818 8.96875 16.1146 9.0599 16.2188 9.21094C16.5208 9.60677 16.7552 10.0807 16.9219 10.6328C17.0938 11.1849 17.1797 11.7604 17.1797 12.3594C17.1797 12.9583 17.0938 13.5339 16.9219 14.0859C16.7552 14.638 16.5208 15.112 16.2188 15.5078C16.1146 15.6589 15.9818 15.75 15.8203 15.7812C15.6589 15.8073 15.5104 15.776 15.375 15.6875ZM18.2734 17.7266C18.1328 17.6276 18.0521 17.4974 18.0312 17.3359C18.0104 17.1693 18.0547 17.0052 18.1641 16.8438C18.5859 16.2344 18.9141 15.5443 19.1484 14.7734C19.388 13.9974 19.5078 13.1927 19.5078 12.3594C19.5078 11.526 19.3906 10.7214 19.1562 9.94531C18.9219 9.16927 18.5911 8.47917 18.1641 7.875C18.0495 7.71354 18.0026 7.55208 18.0234 7.39062C18.0495 7.22396 18.1328 7.09115 18.2734 6.99219C18.4193 6.89323 18.5729 6.85938 18.7344 6.89062C18.8958 6.92188 19.0286 7.01302 19.1328 7.16406C19.638 7.84115 20.0286 8.63542 20.3047 9.54688C20.5807 10.4583 20.7188 11.3958 20.7188 12.3594C20.7188 13.3229 20.5781 14.2578 20.2969 15.1641C20.0208 16.0703 19.6328 16.8672 19.1328 17.5547C19.0286 17.7057 18.8958 17.7969 18.7344 17.8281C18.5729 17.8542 18.4193 17.8203 18.2734 17.7266Z"})})}function Ue(){return G("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:G("path",{d:"M5.42188 13.1953V6.4375C5.42188 5.625 5.6224 5.01302 6.02344 4.60156C6.42969 4.1901 7.03646 3.98438 7.84375 3.98438H11.4297V9.71875C11.4297 10.7031 11.9219 11.1953 12.9062 11.1953H18.5625V18.2891C18.5625 19.1016 18.3594 19.7109 17.9531 20.1172C17.5521 20.5286 16.9479 20.7344 16.1406 20.7344H9.78125C10 20.3646 10.1667 19.9688 10.2812 19.5469C10.401 19.125 10.4609 18.6901 10.4609 18.2422C10.4609 17.5495 10.3307 16.8984 10.0703 16.2891C9.8099 15.6797 9.44792 15.1432 8.98438 14.6797C8.52083 14.2161 7.98438 13.8542 7.375 13.5938C6.76562 13.3281 6.11458 13.1953 5.42188 13.1953ZM12.9297 10.125C12.6432 10.125 12.5 9.98438 12.5 9.70312V4.07031C12.6615 4.09635 12.8255 4.16667 12.9922 4.28125C13.1589 4.39062 13.3333 4.53906 13.5156 4.72656L17.8203 9.10938C18.0078 9.30208 18.1562 9.47917 18.2656 9.64062C18.375 9.80208 18.4427 9.96354 18.4688 10.125H12.9297ZM5.42188 22.2109C4.88021 22.2109 4.36979 22.1068 3.89062 21.8984C3.41146 21.6953 2.98958 21.4115 2.625 21.0469C2.26042 20.6823 1.97396 20.2604 1.76562 19.7812C1.55729 19.3021 1.45312 18.7891 1.45312 18.2422C1.45312 17.6953 1.55729 17.1849 1.76562 16.7109C1.97396 16.2318 2.26042 15.8099 2.625 15.4453C2.98958 15.0755 3.41146 14.7891 3.89062 14.5859C4.36979 14.3776 4.88021 14.2734 5.42188 14.2734C5.96875 14.2734 6.48177 14.3776 6.96094 14.5859C7.4401 14.7891 7.86198 15.0729 8.22656 15.4375C8.59115 15.8021 8.875 16.224 9.07812 16.7031C9.28646 17.1823 9.39062 17.6953 9.39062 18.2422C9.39062 18.7839 9.28646 19.2943 9.07812 19.7734C8.86979 20.2526 8.58073 20.6745 8.21094 21.0391C7.84635 21.4036 7.42448 21.6901 6.94531 21.8984C6.46615 22.1068 5.95833 22.2109 5.42188 22.2109ZM5.42188 20.7266C5.56771 20.7266 5.68229 20.6823 5.76562 20.5938C5.85417 20.5052 5.89844 20.3906 5.89844 20.25V18.7188H7.42969C7.57031 18.7188 7.6849 18.6745 7.77344 18.5859C7.86198 18.5026 7.90625 18.388 7.90625 18.2422C7.90625 18.0964 7.86198 17.9818 7.77344 17.8984C7.6849 17.8099 7.57031 17.7656 7.42969 17.7656H5.89844V16.2344C5.89844 16.0938 5.85417 15.9792 5.76562 15.8906C5.68229 15.8021 5.56771 15.7578 5.42188 15.7578C5.27604 15.7578 5.15885 15.8021 5.07031 15.8906C4.98698 15.9792 4.94531 16.0938 4.94531 16.2344V17.7656H3.41406C3.27344 17.7656 3.15885 17.8099 3.07031 17.8984C2.98177 17.9818 2.9375 18.0964 2.9375 18.2422C2.9375 18.388 2.98177 18.5026 3.07031 18.5859C3.15885 18.6745 3.27344 18.7188 3.41406 18.7188H4.94531V20.25C4.94531 20.3906 4.98698 20.5052 5.07031 20.5938C5.15885 20.6823 5.27604 20.7266 5.42188 20.7266Z"})})}function jn(){return G("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:G("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.75 6.5A3.75 3.75 0 0 0 2 10.25v3.5a3.75 3.75 0 0 0 3.75 3.75h7.5A3.75 3.75 0 0 0 17 13.75v-.46l2.9 2.16A1.25 1.25 0 0 0 22 14.45v-4.9a1.25 1.25 0 0 0-2.1-1L17 10.71v-.46a3.75 3.75 0 0 0-3.75-3.75h-7.5ZM6 8h7a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 16H6a2.5 2.5 0 0 1-2.5-2.5v-3A2.5 2.5 0 0 1 6 8Zm11 4.6v-1.2l3.5-2.61v6.42L17 12.6Z"})})}function Wr(){return G("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:G("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.25 6.75C3.46 6.75 2 8.21 2 10v4c0 1.79 1.46 3.25 3.25 3.25h3.24c.83 0 1.55-.54 1.8-1.33l.52-1.67h2.38l.52 1.67c.25.79.97 1.33 1.8 1.33h3.24c1.79 0 3.25-1.46 3.25-3.25v-4c0-1.79-1.46-3.25-3.25-3.25H5.25Zm.67 3.42c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52H5.92Zm10.2 0c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52h-1.96Z"})})}function Ur(){return ic("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[G("path",{d:"M5.5 3.75c-.97 0-1.75.78-1.75 1.75v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5A3.25 3.25 0 0 1 5.5 2.25h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5ZM16.25 3c0-.41.34-.75.75-.75h1.5a3.25 3.25 0 0 1 3.25 3.25v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5c0-.97-.78-1.75-1.75-1.75H17c-.41 0-.75-.34-.75-.75ZM3 15.5c.41 0 .75.34.75.75v2.25c0 .97.78 1.75 1.75 1.75h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5a3.25 3.25 0 0 1-3.25-3.25v-2.25c0-.41.34-.75.75-.75ZM21 15.5c.41 0 .75.34.75.75v2.25a3.25 3.25 0 0 1-3.25 3.25H17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.5c.97 0 1.75-.78 1.75-1.75v-2.25c0-.41.34-.75.75-.75Z"}),G("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z"})]})}function Qn(){return G("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:G("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"})})}function $n(){return G("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:G("path",{d:"m480-236 93-93q12-12 29-12t29 12q12 12 12 29t-12 29L508-148q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L329-271q-12-12-12-29t12-29q12-12 29-12t29 12l93 93Zm0-484-93 93q-12 12-29 12t-29-12q-12-12-12-29t12-29l123-123q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l123 123q12 12 12 29t-12 29q-12 12-29 12t-29-12l-93-93Z"})})}function Kn({active:i=!1}){return G("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:i?G("path",{d:"M240-240h-80q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h120q17 0 28.5 11.5T320-280v120q0 17-11.5 28.5T280-120q-17 0-28.5-11.5T240-160v-80Zm480 0v80q0 17-11.5 28.5T680-120q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320h120q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240h-80ZM240-720v-80q0-17 11.5-28.5T280-840q17 0 28.5 11.5T320-800v120q0 17-11.5 28.5T280-640H160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h80Zm480 0h80q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H680q-17 0-28.5-11.5T640-680v-120q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v80Z"}):G("path",{d:"M200-200h80q17 0 28.5 11.5T320-160q0 17-11.5 28.5T280-120H160q-17 0-28.5-11.5T120-160v-120q0-17 11.5-28.5T160-320q17 0 28.5 11.5T200-280v80Zm560 0v-80q0-17 11.5-28.5T800-320q17 0 28.5 11.5T840-280v120q0 17-11.5 28.5T800-120H680q-17 0-28.5-11.5T640-160q0-17 11.5-28.5T680-200h80ZM200-760v80q0 17-11.5 28.5T160-640q-17 0-28.5-11.5T120-680v-120q0-17 11.5-28.5T160-840h120q17 0 28.5 11.5T320-800q0 17-11.5 28.5T280-760h-80Zm560 0h-80q-17 0-28.5-11.5T640-800q0-17 11.5-28.5T680-840h120q17 0 28.5 11.5T840-800v120q0 17-11.5 28.5T800-640q-17 0-28.5-11.5T760-680v-80Z"})})}function Yr(){return G("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:G("path",{d:"m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"})})}function qr(){return G("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:G("path",{d:"M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"})})}function Jn(){return G("svg",{className:"gr-player__icon",viewBox:"0 0 20 20","aria-hidden":"true",children:G("path",{d:"M3.33333 10.8333V9.16667H9.66667L13.8333 5H11.6667V3.33333H16.6667V8.33333H15V6.16667L10.3333 10.8333H3.33333ZM11.6667 16.6667V15H13.8333L11.1667 12.375L12.375 11.1667L15 13.8333V11.6667H16.6667V16.6667H11.6667Z"})})}var eo=[{type:"orbit",label:"Orbit",hint:`Left-click drag to rotate / Right-click drag to pan
Scroll to zoom in/out`},{type:"trackball",label:"Trackball",hint:`Left-click drag to rotate freely / Right-click drag to pan
Scroll to zoom in/out`},{type:"fly",label:"Fly",hint:`W/S forward & back / A/D strafe / R/F up & down
Q/E roll / Drag to look around`}];var ve={PW:"pw",HW:"hw",VR:"vr",AR:"ar"},id=[ve.VR,ve.AR];function dt(i){return i===ve.VR||i===ve.AR}var ts=[".mint",".sog"],to=ts.join(","),ro="Open file",Zr="local://",io="static",sc=".sog";function rs(i){return i.toLowerCase().endsWith(sc)}function Ye(i){return typeof i?.url=="string"&&i.url.startsWith(Zr)}var so="stepper";var nc="@gracia/web-sdk/wasm",oc="https://market.gracia.ai/api/v1/streaming/content";function no(){return typeof __GRACIA_MODULE_URL__=="string"?__GRACIA_MODULE_URL__:nc}function oo(){return typeof __GRACIA_STREAMING_BASE_URL__=="string"?__GRACIA_STREAMING_BASE_URL__:oc}function ac(){return typeof navigator>"u"?!1:!!navigator.gpu}var lc={xr:"xr-failed",scenario:"invalid-scenario",fullscreen:"fullscreen-failed","local-file":"local-file-failed"};function cc(i){let e=i.match(/http\s+(-?\d+)/i);return e?Number(e[1]):null}function hc(i,e){let t=e&&lc[e];if(t)return t;let r=i.message.toLowerCase();if(r.includes("webgpu")||r.includes("not supported")||r.includes("getcontext"))return"unsupported-browser";let s=cc(r);return s!==null?s===401||s===403?"access-denied":s===404?"not-found":s>=500?"server-error":"network":r.includes("failed to fetch dynamically imported module")?"load-failed":r.includes("forbidden")||r.includes("unauthorized")?"access-denied":ac()?"unknown":"unsupported-browser"}var uc=new Set(["unsupported-browser","not-found","access-denied","xr-failed","fullscreen-failed","local-file-failed","invalid-scenario"]),pc=new Set(["xr-failed","fullscreen-failed","local-file-failed"]);function dc(i,e){let t=!uc.has(i);return i==="unsupported-browser"?{presentation:"blocking",recoverable:t}:pc.has(i)?{presentation:"toast",recoverable:t}:{presentation:e?"toast":"blocking",recoverable:t}}var fc={"unsupported-browser":{title:"This browser can\u2019t run the player",body:"The player requires WebGPU. Open it in a supported browser and device."},network:{title:"Connection lost",body:"We couldn\u2019t reach the stream. Check your connection and try again."},"not-found":{title:"Scene not found",body:"This content is no longer available."},"access-denied":{title:"Access denied",body:"You don\u2019t have permission to view this content."},"server-error":{title:"Something went wrong",body:"The server had a problem loading this scene. Please try again."},"load-failed":{title:"Couldn\u2019t load the scene",body:"We couldn\u2019t load this scene. Please try again."},"xr-failed":{title:"Couldn\u2019t enter immersive mode",body:"Immersive mode isn\u2019t available right now."},"fullscreen-failed":{title:"Couldn\u2019t enter fullscreen",body:"Fullscreen isn\u2019t available right now."},"local-file-failed":{title:"Couldn\u2019t open the file",body:"We couldn\u2019t open that file. Try a different one."},"invalid-scenario":{title:"Couldn\u2019t play this story",body:"Its scenes are linked incorrectly, so it can\u2019t be played through."},unknown:{title:"Something went wrong",body:"We couldn\u2019t load this scene. Please try again."}};function mc(i){return fc[i]}function ao(i,e,t){let r=hc(i,t);return{kind:r,cause:i,...dc(r,e),...mc(r)}}var lo=i=>({sceneOrder:i?.sceneOrder,scenarioName:i?.scenarioName,nextSceneOrders:i?.nextSceneOrders,modalTitle:i?.modalTitle}),co=(i,e)=>i.map((t,r)=>({...t,...lo(e[r])})),ho=i=>i.map((e,t)=>e.sceneOrder??t),we=(i,e)=>e===-1?i.root:i.byOrder.get(e),Yt=(i,e)=>we(i,e)?.next??[],uo=(i,e)=>{let t=i?.roots?.length?i.roots:e.slice(0,1),{defaultRoot:r}=i??{};return r===void 0?t:[r,...t.filter(s=>s!==r)]},gc=i=>{let e=(t,r)=>{if(r.has(t))return 0;r.add(t);let s=Yt(i,t).reduce((n,a)=>Math.max(n,e(a,r)),0);return r.delete(t),s+1};return e(-1,new Set)-1},qt=(i,e)=>{if(!i.length)return null;let t=i.map(o=>lo(o)),r=ho(t),s=new Map(t.map((o,l)=>[r[l],{order:r[l],scenarioName:o.scenarioName,modalTitle:o.modalTitle,next:o.nextSceneOrders??r.slice(l+1,l+2)}])),n=uo(e,r),a={byOrder:s,order:r,root:{order:-1,modalTitle:e?.modalTitle,next:n},depth:0,isBranching:t.some(o=>o.nextSceneOrders)||n.length>1};return{...a,depth:gc(a)}},po=i=>[...i.order.filter((e,t)=>i.order.indexOf(e)!==t).map(e=>`sceneOrder ${e} is used by more than one scene`),...[i.root,...i.byOrder.values()].flatMap(e=>e.next.filter(t=>!i.byOrder.has(t)).map(t=>e.order===-1?`root ${t} is not a scene of the pack`:`scene ${e.order} links to ${t}, which is not a scene of the pack`))],is=(i,e,t)=>{let r=[[e]],s=new Set([e]);for(let n of r){let a=n[n.length-1];if(a===t)return n;for(let o of Yt(i,a))s.has(o)||(s.add(o),r.push([...n,o]))}return null},Je=(i,e,t)=>{let r=e.indexOf(t),s=r>=0?e[r+1]:void 0;return s!==void 0&&Yt(i,t).includes(s)?s:void 0},Zt=(i,e)=>{let t=[],r=new Set,s=-1,n=null;for(;s!==void 0&&we(i,s)&&!r.has(s);){r.add(s),s!==-1&&t.push(s);let a=Yt(i,s);if(a.length===0)break;if(a.length===1){s=a[0];continue}let o=Je(i,e,s);if(o===void 0){n=s;break}s=o}return{scenes:t,openFork:n}},fo=(i,e,t)=>Yt(i,e).map(r=>({order:r,label:t(r)})),mo=(i,e)=>qt(i,e)?.isBranching?i.map(t=>({...t,autoSwitchToNext:!1})):i,go=(i,e)=>{let t=ho(i),r=uo(e,t);return r.length===1?t.indexOf(r[0]):null};var yo=(i,e,t,r)=>{let s=[],n=new Set,a=-1;for(;a!==void 0&&!n.has(a);){n.add(a),a!==-1&&s.push({order:a,label:String(s.filter(c=>c.order!==void 0).length+1),isActive:a===t});let l=we(i,a)?.next??[];if(l.length===0)break;if(l.length===1){a=l[0];continue}let h=Je(i,e,a);s.push({isFork:!0,forkFrom:a,...a===r&&{isOpen:!0},...h!==void 0&&{taken:h,branchNumber:l.indexOf(h)+1}}),a=h}let o=i.depth+s.filter(l=>l.isFork).length;for(;s.length<o;)s.push({});return s};var xo="data:font/woff2;base64,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";var bo=`@font-face {
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
`;var vo="gracia-player-default-styles",ss=bo.replace('url("./assets/GolosText-Regular.woff2")',`url("${xo}")`);function jr(i){if(typeof document>"u")return;let e=typeof ShadowRoot<"u"&&i instanceof ShadowRoot?i:i?.head??document.head;if(e.querySelector(`#${vo}`))return;let t=document.createElement("style");t.id=vo,t.textContent=ss,e.appendChild(t)}function te(...i){let e=[];for(let t of i)if(t){if(typeof t=="string"){e.push(t);continue}for(let[r,s]of Object.entries(t))s&&e.push(r)}return e.join(" ")}function oe(i){return i.label??i.displayName??i.id??i.url??"Untitled"}function ns(i){return!Number.isFinite(i)||i<0?"0:00":`${Math.floor(i/60)}:${String(Math.floor(i%60)).padStart(2,"0")}`}function Oe(i){return i instanceof Error?i:new Error(String(i))}function wo(i,e){return{event:(t,r)=>i?.event?.(t,r),error:(t,r)=>{i?.error?.(t,r),e?.(t,r)}}}import{jsx as _o,jsxs as bc}from"react/jsx-runtime";var ge=({variant:i="primary",className:e,type:t="button",children:r,...s})=>{let n=Array.isArray(i)?i:[i];return _o("button",{type:t,className:te("gr-player__button",...n.map(a=>`gr-player__button--${a}`),e),...s,children:r})},qe=({variant:i="icon",srLabel:e,children:t,...r})=>bc(ge,{variant:i,...r,children:[t,e&&_o("span",{className:"gr-player__sr",children:e})]});import{jsx as jt,jsxs as vc}from"react/jsx-runtime";var ft=({icon:i,title:e,body:t,detail:r,action:s,className:n,role:a,ariaLive:o})=>jt("div",{className:n,role:a,"aria-live":o,children:vc("div",{className:"gr-player__state-message",children:[jt("div",{className:"gr-player__state-icon",children:i}),jt("h2",{children:e}),jt("p",{children:t}),r&&jt("span",{className:"gr-player__sr",children:r}),s]})});import{jsx as So}from"react/jsx-runtime";var os=({message:i})=>So("div",{className:"gr-player__error",role:"alert",children:So("span",{className:"gr-player__error-text",children:i})});import{jsx as To}from"react/jsx-runtime";var as=({title:i,body:e,detail:t,action:r})=>To(ft,{icon:To(Qn,{}),title:i,body:e,detail:t,action:r,className:"gr-player__error-screen",role:"alert",ariaLive:"assertive"});import{jsx as Mo}from"react/jsx-runtime";var ls=()=>Mo("div",{className:"gr-player__loader",role:"status","aria-live":"polite",children:Mo("div",{className:"gr-player__spinner"})});import{forwardRef as cu,useImperativeHandle as hu,useRef as Aa}from"react";import{createContext as wc,useContext as _c}from"react";var Po=wc(null),cs=Po.Provider,V=()=>{let i=_c(Po);if(!i)throw new Error("usePlayerContext must be used within a PlayerProvider");return i};var Sc="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;background:none!important",Tc=`
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`,Mc=`
uniform float uOpacity;
void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, uOpacity); }`,Eo=`
varying vec3 vWorld;
vec4 project() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    return projectionMatrix * viewMatrix * world;
}`,Lo=`${Eo}
attribute vec3 grid;
varying vec3 vGrid;
void main() {
    vGrid = grid;
    gl_Position = project();
}`,Pc=`${Eo}
void main() { gl_Position = project(); }`,Ro=`
uniform float uReachInv;
uniform sampler2D uSplats;
uniform vec2 uScreen;
uniform float uMask;
varying vec3 vWorld;
float shown() {
    float near = 1.0 - smoothstep(0.5, 1.0, distance(vWorld, cameraPosition) * uReachInv);
    return near * (1.0 - uMask * texture2D(uSplats, gl_FragCoord.xy / uScreen).a);
}`,Lc=`${Ro}
uniform vec3 uColor;
uniform float uOpacity;
void main() { gl_FragColor = vec4(uColor, uOpacity * shown()); }`,ko=`${Ro}
uniform vec3 uColor;
uniform float uOpacity;
varying vec3 vGrid;
vec4 muted(float alpha) {
    float grey = dot(uColor, vec3(0.2126, 0.7152, 0.0722));
    return vec4(mix(uColor, vec3(grey), ${.3.toFixed(3)}), uOpacity * alpha * ${.8.toFixed(3)} * shown());
}`,Cc=`${ko}
void main() {
    vec2 cells = vec2(vGrid.x / max(vGrid.z, 1e-5), vGrid.y) / ${.25.toFixed(3)};
    vec2 cellsPerPixel = fwidth(cells);
    vec2 toLine = abs(fract(cells + 0.5) - 0.5);
    float halfLine = ${(.5*.005/.25).toFixed(4)};
    vec2 onLine = 1.0 - smoothstep(vec2(halfLine), halfLine + cellsPerPixel, toLine);
    float moire = 1.0 - smoothstep(0.2, 0.5, max(cellsPerPixel.x, cellsPerPixel.y));
    float lines = max(onLine.x, onLine.y) * moire * ${.7.toFixed(3)};
    gl_FragColor = muted(max(lines, ${.3.toFixed(3)}));
}`,Ec=`${ko}
void main() {
    gl_FragColor = muted(${.4.toFixed(3)});
}`,mt=class{#e;#t;#r;#i;#s;#n;#o;#c;#l=null;#a=null;#u;#h;#d;#p;#f=[0,0];#m=1;#g=null;#b=!1;constructor(e){this.#e=e,this.#r=new e.PerspectiveCamera,this.#r.matrixAutoUpdate=!1,this.#u=new e.WebGLRenderTarget(1,1),this.#d=new e.Texture,this.#d.generateMipmaps=!1,this.#d.minFilter=this.#d.magFilter=e.LinearFilter,this.#p=new e.DataTexture(new Uint8Array(4),1,1),this.#p.needsUpdate=!0,this.#h={uReachInv:{value:0},uSplats:{value:this.#p},uScreen:{value:new e.Vector2(1,1)},uMask:{value:1}};let t=(o,l,h,c=e.DoubleSide)=>new e.ShaderMaterial({uniforms:o,vertexShader:l,fragmentShader:h,transparent:!0,depthTest:!1,depthWrite:!1,side:c}),r=(o,l,h)=>{let c=new e.Mesh(o,l);return c.frustumCulled=!1,c.visible=!1,c.renderOrder=h,c},s={value:new e.Color},n=o=>{let l={uOpacity:{value:0},uColor:s,...this.#h},h=r(new e.BufferGeometry,[t(l,Lo,Cc),t(l,Lo,Ec)],o);return h.matrixAutoUpdate=!1,h},a=new e.BufferGeometry;a.setAttribute("position",new e.BufferAttribute(new Float32Array(0),3)),this.#i=r(new e.PlaneGeometry(2,2),t({uOpacity:{value:0}},Tc,Mc,e.FrontSide),10),this.#n=n(11),this.#s=r(a,t({uColor:{value:new e.Color},uOpacity:{value:0},...this.#h},Pc,Lc),12),this.#c=n(0),this.#t=new e.Scene().add(this.#i,this.#n,this.#s),this.#o=new e.Scene().add(this.#c)}init(e){this.#a?.getContext()!==e&&(this.#y(),this.#a=new this.#e.WebGLRenderer({context:e,canvas:e.canvas}),this.#a.autoClear=!1,this.#a.outputColorSpace=this.#e.LinearSRGBColorSpace,this.#a.setClearColor(0,0))}sync(e){this.#w(this.#i,e.darkness),this.#m=1-e.outside,this.#h.uReachInv.value=this.#m/e.reach;let t=e.outline;this.#w(this.#s,t[3]),this.#s.visible&&(this.#x(this.#s,t),this.#M(e.ribbon(.01))),this.#T(e),this.#b=this.#i.visible||this.#s.visible||this.#n.visible||this.#c.visible,this.#b||this.#g?.remove()}renderUnderlay(e,t,r,s,n,a,o){this.#c.visible&&this.#S(this.#o,e,t,r,s,n,a,o)}renderEye(e,t,r,s,n,a,o){this.#b&&this.#S(this.#t,e,t,r,s,n,a,o)}renderOver(e,t,r){if(!this.#b)return;let s=this.#g??=kc(),n=s.getContext("webgl2");if(!n)return;s.previousSibling!==e&&e.after(s),this.init(n);let{width:a,height:o}=e;(s.width!==a||s.height!==o)&&this.#a.setSize(a,o,!1),this.#h.uScreen.value.set(a,o);let l=this.#m>.002?r?.():null,h=l?this.#v(l):null;this.#h.uMask.value=this.#m,this.#a.clear(),this.#_(this.#o,t.projectionMatrix,t.matrixWorld,h),this.#_(this.#t,t.projectionMatrix,t.matrixWorld,h)}dispose(){this.#y(),this.#g?.remove(),this.#b=!1}#S(e,t,r,s,n,a,o,l){let h=this.#a;h&&(h.resetState(),h.setRenderTargetFramebuffer(this.#u,r),h.setRenderTarget(this.#u),h.setViewport(n,a,o,l),this.#_(e,s.projectionMatrix,s.transform.matrix),h.resetState(),t.bindFramebuffer(t.FRAMEBUFFER,r))}#_(e,t,r,s=null){this.#h.uSplats.value=s??this.#p;let n=this.#r;n.projectionMatrix.fromArray(t),n.projectionMatrixInverse.copy(n.projectionMatrix).invert(),n.matrixWorld.fromArray(r),this.#a.render(e,n)}#y(){for(let e of[this.#i,this.#s,this.#n,this.#c]){e.geometry.dispose();for(let t of[e.material].flat())t.dispose()}this.#d.dispose(),this.#p.dispose(),this.#a?.dispose(),this.#a=null}#v(e){let[t,r]=this.#f;return(e.width!==t||e.height!==r)&&(this.#d.dispose(),this.#f=[e.width,e.height]),this.#d.image=e,this.#d.needsUpdate=!0,this.#d}#T(e){let t=e.surface,r=t[3]>.002?e.mesh:null,s=r?t[3]:0;if(this.#w(this.#n,s*e.aboveSplats),this.#w(this.#c,s*(1-e.aboveSplats)),!!r){if(this.#x(this.#n,t),r!==this.#l){this.#l=r;let n=Rc(this.#e,r);for(let a of[this.#n,this.#c])a.geometry.dispose(),a.geometry=n}this.#n.matrix.fromArray(e.meshMatrix),this.#c.matrix.fromArray(e.meshMatrix)}}#w(e,t){e.visible=t>.002,Co(e).uOpacity.value=t}#x(e,[t,r,s]){Co(e).uColor.value.setRGB(t,r,s,this.#e.LinearSRGBColorSpace)}#M(e){let t=this.#s.geometry,r=t.getAttribute("position");r.array.length<e.length?(t.dispose(),t.setAttribute("position",new this.#e.BufferAttribute(e.slice(),3))):(r.array.set(e),r.needsUpdate=!0),t.setDrawRange(0,e.length/3)}};function Co(i){return[i.material].flat()[0].uniforms}function Rc(i,e){let t=new i.BufferGeometry;return t.setAttribute("position",new i.BufferAttribute(e.positions,3)),t.setAttribute("grid",new i.BufferAttribute(e.grid,3)),t.setIndex(new i.BufferAttribute(e.indices,1)),t.addGroup(0,e.capStart,0),t.addGroup(e.capStart,e.indices.length-e.capStart,1),t}function kc(){let i=document.createElement("canvas");return i.style.cssText=Sc,i.getContext("webgl2",{depth:!1}),i}import{signal as Be}from"@preact/signals-core";import{Container as re,Fullscreen as Bc,Svg as tt,Text as Jr}from"@react-three/uikit";import{signal as et}from"@preact/signals-core";import{forwardHtmlEvents as Ac}from"@pmndrs/pointer-events";import{createRoot as Ic}from"@react-three/fiber";var Qr=class{#e;#t;#r;#i;#s;#n;#o=null;#c=null;#l;#a;#u=null;#h=null;#d=null;#p=!1;#f=!1;#m=!1;#g=!1;#b;#S;#_;#y;#v;#T;constructor(e,{pixelWidth:t,pixelHeight:r,worldWidth:s,worldHeight:n,cursorFactory:a,react:o=!1}){this.#s=e,this.#n=a,this.#p=o,this.#e=t*2,this.#t=r*2,this.#r=document.createElement("canvas"),this.#r.width=this.#e,this.#r.height=this.#t,this.#i=new e.WebGLRenderer({canvas:this.#r,alpha:!0,antialias:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.#i.setClearColor(0,0),this.#i.setSize(this.#e,this.#t,!1),this.#l=new e.Scene,this.#a=new e.OrthographicCamera(0,t,r,0,.1,10),this.#a.position.z=5,this.#b=new e.Raycaster,this.#S=new e.Vector3,this.#_=new e.Vector3,this.#y=new e.Quaternion,this.#v=new e.Mesh(new e.PlaneGeometry(s,n),new e.MeshBasicMaterial({visible:!1,side:e.DoubleSide}));let l=new e.SphereGeometry(.008,8,8),h=()=>new e.MeshBasicMaterial({color:65280,depthTest:!1});this.#T=[0,1].map(()=>{let c=new e.Mesh(l,h());return c.renderOrder=1001,c.visible=!1,c})}get canvas(){return this.#r}get scene(){return this.#l}get pixelWidth(){return this.#e/2}get pixelHeight(){return this.#t/2}get internalWidth(){return this.#e}get internalHeight(){return this.#t}get pointer(){return this.#o}get cursor(){return this.#c?.mesh??null}get ptrPressed(){return this.#f}get reactPending(){return this.#p}get hitMesh(){return this.#v}get hitSpheres(){return this.#T}async mountReact(e){this.#u=Ic(this.#r),await this.#u.configure({frameloop:"never",orthographic:!0,size:{width:this.#e/2,height:this.#t/2},dpr:2,gl:this.#i,events:()=>({enabled:!1,priority:0,handlers:{}})}),this.#h=this.#u.render(e),this.#l=this.#h.getState().scene,this.#d=Ac(this.#r,()=>this.#h.getState().camera,this.#l,{batchEvents:!1}),this.#p=!1}patchCanvasForXR(){let e=this.pixelWidth,t=this.pixelHeight;this.#r.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,right:e,bottom:t,width:e,height:t,toJSON(){}});let r=new Set;this.#r.setPointerCapture=s=>r.add(s),this.#r.releasePointerCapture=s=>r.delete(s),this.#r.hasPointerCapture=s=>r.has(s)}setPointer(e,t,r,s=!1){if(!this.#o){if(!this.#l)return;this.#o={x:e,y:t,pressed:r};let h=this.#n(this.#s);h.position.z=.06,this.#l.add(h),this.#c={mesh:h,sx:e,sy:this.pixelHeight-t}}let n=this.#o;n.x=e,n.y=t,n.pressed=r;let a=this.#c,o=this.pixelHeight-t,l=a.mesh.visible?.6:1;a.sx+=(e-a.sx)*l,a.sy+=(o-a.sy)*l,a.mesh.visible=!0,this.#h?a.mesh.position.set(a.sx-this.pixelWidth/2,a.sy-this.pixelHeight/2,.06):a.mesh.position.set(a.sx,a.sy,.06),a.mesh.material.opacity=r?1:.7,s&&this.#w(e,t,r)}clearPointer(e=!1){e&&this.#o&&(this.#m?this.#g=!0:this.#x()),this.#o=null,this.#c&&(this.#c.mesh.visible=!1)}renderScene(){this.#p||(this.#d?.update(),this.#h?this.#h.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#l,this.#a))}clampAlpha(e){let t=this.#i.getContext();t.colorMask(!1,!1,!1,!0),t.clearColor(0,0,0,e),t.clear(t.COLOR_BUFFER_BIT),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0)}initFlat(){let e=!1,t=r=>{let s=this.#r.getBoundingClientRect();return{x:(r.clientX-s.left)/s.width*this.pixelWidth,y:(r.clientY-s.top)/s.height*this.pixelHeight}};this.#r.addEventListener("pointerdown",r=>{e=!0,this.#r.setPointerCapture(r.pointerId);let s=t(r);this.setPointer(s.x,s.y,!0)}),this.#r.addEventListener("pointermove",r=>{let s=t(r);this.setPointer(s.x,s.y,e)}),this.#r.addEventListener("pointerup",r=>{e=!1;let s=t(r);this.setPointer(s.x,s.y,!1)}),this.#r.addEventListener("pointerleave",()=>{e=!1,this.clearPointer()})}renderFlat(){this.#p||(this.#d?.update(),this.#h?this.#h.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#l,this.#a))}castRay(e,t){let r=e.rayTransform.position,s=e.rayTransform.orientation;return this.#S.set(r.x,r.y,r.z),this.#_.set(0,0,-1).applyQuaternion(this.#y.set(s.x,s.y,s.z,s.w)),this.rayHitQuad(this.#S,this.#_,t)}rayHitQuad(e,t,r=0){let s=this.pixelWidth,n=this.pixelHeight,a=this.#T[r];this.#b.ray.origin.copy(e),this.#b.ray.direction.copy(t);let o=this.#b.intersectObject(this.#v);if(o.length===0)return a.visible=!1,null;let l=o[0].point,h=o[0].uv;if(!h)return a.visible=!1,null;let c=h.x*s,u=(1-h.y)*n;return c<0||c>s||u<0||u>n?(a.visible=!1,null):(a.position.copy(l),a.visible=!0,a.updateMatrixWorld(!0),{x:c,y:u})}gazeHitsQuad(e,t){if(!e?.transform)return!0;let r=e.transform.position,s=e.transform.orientation,n=-2*(s.w*s.y+s.x*s.z),a=-2*(s.y*s.z-s.w*s.x),o=2*(s.x*s.x+s.y*s.y)-1,l=t||this.#v.position,h=l.x-r.x,c=l.y-r.y,u=l.z-r.z,p=Math.sqrt(h*h+c*c+u*u)||1;return(n*h+a*c+o*u)/p>.6}dispose(){this.#d?.destroy(),this.#d=null,this.#u&&(this.#u.unmount(),this.#u=null,this.#h=null),this.#i?.dispose(),this.#i=null}#w(e,t,r){let s=this.#f;this.#f=r;let n={clientX:e,clientY:t,pointerId:1,pointerType:"mouse",isPrimary:!0};this.#m=!0,r&&!s&&this.#r.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1,bubbles:!0})),this.#r.dispatchEvent(new PointerEvent("pointermove",{...n,buttons:r?1:0,bubbles:!0})),!r&&s&&this.#r.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0,bubbles:!0})),this.#m=!1,this.#g&&(this.#g=!1,this.#x())}#x(){let e={pointerId:1,pointerType:"mouse",isPrimary:!0};this.#f&&this.#r.dispatchEvent(new PointerEvent("pointerup",{...e,button:0,buttons:0,bubbles:!0})),this.#r.dispatchEvent(new PointerEvent("pointerleave",{...e,bubbles:!1})),this.#f=!1}};var Fc=`attribute vec2 a_pos;
varying vec2 v_uv;
uniform mat4 u_mvp;
void main() {
    v_uv = a_pos + 0.5;
    gl_Position = u_mvp * vec4(a_pos, 0.0, 1.0);
}`,Oc=`precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_alpha;
void main() {
    vec4 c = texture2D(u_tex, v_uv);
    gl_FragColor = vec4(c.rgb, c.a * u_alpha);
}`,$r=class{#e=null;#t=null;#r=null;#i=!1;#s=null;#n=null;#o=null;#c=null;#l=null;#a=null;#u=null;#h=null;#d;#p;#f;#m;#g;#b;#S;#_;#y;#v;#T;constructor(e,{worldWidth:t,worldHeight:r,internalWidth:s,internalHeight:n,canvas:a}){this.#y=t,this.#v=r,this.#S=s,this.#_=n,this.#T=a,this.#d=new e.Matrix4,this.#p=new e.Matrix4,this.#f=new e.Matrix4,this.#m=new e.Vector3,this.#g=new e.Quaternion,this.#b=new e.Vector3(t,r,1)}get projected(){return this.#i}get layer(){return this.#t}get pose(){return this.#s??null}async init(e,t,r,s){if(this.#e=s,t)try{return this.#r=t,this.#t=t.createQuadLayer({space:r,viewPixelWidth:this.#S,viewPixelHeight:this.#_,layout:"mono",isStatic:!1,width:this.#y/2,height:this.#v/2}),this.stash(),this.#t}catch{this.#t=null,this.#r=null}return this.#i=!0,this.#w(s),null}stash(){this.#n=null,this.#t&&(this.#t.transform=new XRRigidTransform({x:0,y:-1e3,z:0},{x:0,y:0,z:0,w:1}))}setTransform(e){this.#s=e,this.#n=e}applyPose(e,t,r,s,n,a,o){let l=new XRRigidTransform({x:e,y:t,z:r},{x:s,y:n,z:a,w:o});this.#s=l,this.#n=l}upload(e){this.#t?(this.#n&&(this.#t.transform=this.#n,this.#n=null),this.#x(e,this.#r.getSubImage(this.#t,e)?.colorTexture)):(this.#x(e,this.#a),this.#n=null)}renderEye(e,t,r,s,n,a,o,l){if(!this.#i||!l||!this.#s)return;let h=this.#s.position,c=this.#s.orientation;this.#m.set(h.x,h.y,h.z),this.#g.set(c.x,c.y,c.z,c.w),this.#d.compose(this.#m,this.#g,this.#b),this.#f.fromArray(t.transform.inverse.matrix),this.#p.multiplyMatrices(this.#f,this.#d),this.#f.fromArray(t.projectionMatrix),this.#p.premultiply(this.#f),e.viewport(r,s,n,a),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(this.#o),e.uniformMatrix4fv(this.#u,!1,this.#p.elements),e.uniform1f(this.#h,o),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.#a),e.bindVertexArray(this.#c),e.drawArrays(e.TRIANGLES,0,6),e.bindVertexArray(null),e.disable(e.BLEND),e.useProgram(null)}dispose(){let e=this.#e;e&&this.#i&&(this.#o&&e.deleteProgram(this.#o),this.#c&&e.deleteVertexArray(this.#c),this.#l&&e.deleteBuffer(this.#l),this.#a&&e.deleteTexture(this.#a)),this.#t=this.#r=this.#e=null,this.#o=this.#c=this.#l=this.#a=null}#w(e){let t=e.createShader(e.VERTEX_SHADER);e.shaderSource(t,Fc),e.compileShader(t);let r=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(r,Oc),e.compileShader(r),this.#o=e.createProgram(),e.attachShader(this.#o,t),e.attachShader(this.#o,r),e.linkProgram(this.#o),e.deleteShader(t),e.deleteShader(r),this.#u=e.getUniformLocation(this.#o,"u_mvp"),this.#h=e.getUniformLocation(this.#o,"u_alpha"),e.useProgram(this.#o),e.uniform1i(e.getUniformLocation(this.#o,"u_tex"),0),e.uniform1f(this.#h,1);let s=e.getAttribLocation(this.#o,"a_pos");this.#c=e.createVertexArray(),e.bindVertexArray(this.#c),this.#l=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.#l),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-.5,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5]),e.STATIC_DRAW),e.enableVertexAttribArray(s),e.vertexAttribPointer(s,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),this.#a=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.#a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.#S,this.#_,0,e.RGBA,e.UNSIGNED_BYTE,null),e.generateMipmap(e.TEXTURE_2D)}#x(e,t){if(!t)return;let r=this.#e,s=!this.#i;r.bindTexture(r.TEXTURE_2D,t),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,this.#i?r.LINEAR_MIPMAP_LINEAR:r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!0),s&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,this.#T),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),s&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this.#i&&r.generateMipmap(r.TEXTURE_2D)}};function Kr(i,e,t){let r=Math.sqrt(i*i+e*e+t*t)||1,s=Math.atan2(i/r,t/r)+Math.PI,n=Math.asin(e/r),a=s/2,o=n/2,l=Math.cos(a),h=Math.sin(a),c=Math.cos(o),u=Math.sin(o);return{qx:l*u,qy:h*c,qz:-h*u,qw:l*c}}function us(i,e,t,r){let s=e.transform.position,n=e.transform.orientation,a=Math.atan2(2*(n.w*n.y+n.x*n.z),1-2*(n.y*n.y+n.z*n.z)),o=s.x-Math.sin(a)*t,l=s.y+r,h=s.z-Math.cos(a)*t,{qx:c,qy:u,qz:p,qw:d}=Kr(o-s.x,l-s.y,h-s.z);i.applyPose(o,l,h,c,u,p,d)}var hs=class{#e;#t;#r;#i;#s;#n;#o;constructor(e,t,r){let{qx:s,qy:n,qz:a,qw:o}=Kr(0,r,-t);this.#e=new e.Vector3(0,r,-t),this.#t=new e.Quaternion(s,n,a,o),this.#r=this.#e.clone(),this.#i=this.#t.clone(),this.#s=new e.Vector3,this.#n=new e.Quaternion,this.#o=new e.Vector3(0,1,0)}reset(){this.#r.copy(this.#e),this.#i.copy(this.#t)}remember(e,{position:t,orientation:r}){let s=this.#c(e).invert();this.#r.set(t.x,t.y,t.z).sub(this.#s).applyQuaternion(s),this.#i.set(r.x,r.y,r.z,r.w).premultiply(s)}place(e){let t=this.#c(e),r=this.#r.clone().applyQuaternion(t).add(this.#s),s=this.#i.clone().premultiply(t);return{x:r.x,y:r.y,z:r.z,qx:s.x,qy:s.y,qz:s.z,qw:s.w}}#c(e){let t=e.transform.position,r=e.transform.orientation,s=Math.atan2(2*(r.x*r.z+r.w*r.y),1-2*(r.x*r.x+r.y*r.y));return this.#s.set(t.x,t.y,t.z),this.#n.setFromAxisAngle(this.#o,s)}},Ee=class{#e;#t;#r=!1;#i=!1;#s;#n=null;#o=null;#c=!1;#l=null;#a=!1;#u=!1;#h=!1;alpha=1;onDragTick=null;onDragEnd=null;constructor(e,t){this.#s=new hs(e,t.quadZ??.5,t.quadY??-.5),this.#e=new Qr(e,t),this.#t=new $r(e,{worldWidth:t.worldWidth,worldHeight:t.worldHeight,internalWidth:this.#e.internalWidth,internalHeight:this.#e.internalHeight,canvas:this.#e.canvas})}get canvas(){return this.#e.canvas}get scene(){return this.#e.scene}get pixelWidth(){return this.#e.pixelWidth}get pixelHeight(){return this.#e.pixelHeight}get hitMesh(){return this.#e.hitMesh}get hitSpheres(){return this.#e.hitSpheres}get pointer(){return this.#e.pointer}get cursor(){return this.#e.cursor}async mountReact(e){return this.#e.mountReact(e)}rayHitQuad(e,t,r){return this.#e.rayHitQuad(e,t,r)}gazeHitsQuad(e,t){return this.#e.gazeHitsQuad(e,t)}get projected(){return this.#t.projected}get layer(){return this.#t.layer}get pose(){return this.#t.pose}get visible(){return this.#r}get placing(){return this.#i}get session(){return this.#n}get interacting(){return this.#r&&(this.#u||this.#c||this.#h||!!this.#o)}get dragging(){return this.#c}set dragging(e){this.#c=e}get panelDragging(){return this.#h}set panelDragging(e){this.#h=e,e||this.onDragEnd?.()}setPointer(e,t,r){this.#e.setPointer(e,t,r,!!this.#n)}clearPointer(){this.#e.clearPointer(!!this.#n)}initFlat(){this.#r=!0,this.#e.initFlat()}renderFlat(){this.#r&&this.#e.renderFlat()}async init(e,t,r,s){return this.#n=e,this.#e.patchCanvasForXR(),this.#t.init(e,t,r,s)}show(){this.#i=!0}recenter(){this.#s.reset(),this.#r&&this.show()}hide(){this.#e.clearPointer(!!this.#n),this.#c=!1,this.#l=null,this.#o=null,this.#h=!1,this.onDragEnd?.(),this.#r=this.#i=!1;for(let e of this.#e.hitSpheres)e.visible=!1;this.#t.stash()}setTransform(e){this.#t.setTransform(e)}stash(){this.#t.stash()}applyPose(e,t,r,s,n,a,o){this.#t.applyPose(e,t,r,s,n,a,o);let l=this.#e.hitMesh;l.position.set(e,t,r),l.quaternion.set(s,n,a,o),l.updateMatrixWorld(!0)}updatePosition(e){if(!this.#i||!e)return;this.#i=!1,this.#r=!0;let{x:t,y:r,z:s,qx:n,qy:a,qz:o,qw:l}=this.#s.place(e);this.applyPose(t,r,s,n,a,o,l)}drawContent(e){!this.#r||this.#e.reactPending||(this.#e.renderScene(),this.alpha<1&&!this.#t.projected&&this.#e.clampAlpha(this.alpha),this.#t.upload(e))}renderEye(e,t,r,s,n,a){this.#t.renderEye(e,t,r,s,n,a,this.alpha,this.#r)}handleInput(e,t,r){if(!this.#n)return!1;let s=!1,n=!1,a=null,o=null;for(let h of this.#e.hitSpheres)h.visible=!1;for(let[h,c]of[["left",e],["right",t]]){if(c?.menuPressed&&(s=!0),!c?.active||!this.#r||!c.rayTransform||c.held)continue;let u=h==="left"?0:1,p=this.#e.castRay(c,u);if(p){let d={hand:c,hit:p,side:h,trigger:!!c.triggerPressed};h==="left"?a=d:o=d}}let l=!!(a||o);if(this.#h){if(this.#t.pose&&r?.transform&&this.onDragTick){let h=this.onDragTick(e,t,r,this.#l,this.#t.pose);h?(this.applyPose(h.x,h.y,h.z,h.qx,h.qy,h.qz,h.qw),this.#s.remember(r,this.#t.pose)):(this.#h=!1,this.onDragEnd?.())}}else{let h=null;if(this.#o){let c=this.#o==="left"?a:o,u=this.#o==="left"?e:t,p=!!u?.triggerPressed;h=c||(p?{hand:u,hit:null,side:this.#o,trigger:p}:null),p||(this.#o=null)}if(!h){let c=this.#l;h=c==="left"?a||o:c==="right"?o||a:a||o}if(h){this.#l=h.side??this.#l;let c=this.#l==="left"?1:0;if(this.#e.hitSpheres[c].visible=!1,h.hit){let u=this.#e.ptrPressed;this.setPointer(h.hit.x,h.hit.y,h.trigger),h.trigger&&!u&&!this.#o&&(this.#o=this.#l)}else this.#e.pointer?this.setPointer(this.#e.pointer.x,this.#e.pointer.y,h.trigger):this.clearPointer();h.hand?.isTransientPointer&&(n=!0)}else this.clearPointer(),this.#l=null;this.#u=!!(a||o)}return s&&!this.#a&&(this.#r||this.#i?l||this.hide():this.show()),this.#a=s,n}dispose(){this.#r=!1,this.#n=null,this.#e.dispose(),this.#t.dispose()}};var gt=class{_quad;_sig=null;onPlayPause=null;onSeek=null;onPresetCycle=null;onExit=null;onClose=null;onSceneNav=null;onSceneSelect=null;onSceneAction=null;constructor(e,t){this._quad=new Ee(e,{...t,react:!0})}get quad(){return this._quad}_createBaseSignals(){return{loadingD:et("none"),contentD:et("flex"),playD:et("flex"),pauseD:et("none"),spinD:et("none"),spinR:et(0),spinFast:et(!1)}}_updatePlayback(e,{loading:t,playing:r,spinning:s,buffering:n,progress:a}){e.loadingD.value=t?"flex":"none",e.contentD.value=t?"none":"flex",e.playD.value=!s&&!r?"flex":"none",e.pauseD.value=!s&&r?"flex":"none",e.spinD.value=s?"flex":"none",e.spinFast.value=s&&!n,this._quad.dragging||this._setProgress(a)}render(e){let t=this._sig;if(!this._quad.visible||!t)return;let r=t.loadingD.value==="flex",s=r?20:t.spinFast.value?14:6;(t.spinD.value==="flex"||r)&&(t.spinR.value-=e*s)}_seekFromEvent(e){this._seekTo(e.point.x+this._quad.pixelWidth/2)}_seekTo(e){}_setProgress(e){}};import{jsx as W,jsxs as ti}from"react/jsx-runtime";var vt=i=>`data:image/svg+xml,${encodeURIComponent(i)}`,Gc=vt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#aaaaaa"/></svg>'),Nc=vt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#aaaaaa"/></svg>'),zc=vt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#666666"/></svg>'),Ao=vt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1 1 2 12L5 12A7 7 0 1 0 12 5Z" fill="#888888"/></svg>'),Dc=vt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z" fill="#888888"/></svg>'),Xc=vt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.6 16.6L10 18l6-6-6-6-1.4 1.4L13.2 12z" fill="#888888"/></svg>'),xt=30,Ze=520,Bo=72,ei=Bo+xt,Ge=xt+Bo/2,Io=14,Qt=40,$t=26,yt=6,Fo=26,ri=14,ps=ri/2,ii=20,ds=ii/2,Kt=50,Oo=32,fs={borderOpacity:.65},bt=class extends gt{#e=0;#t=0;constructor(e){let r=.86*(ei/Ze);super(e,{pixelWidth:Ze,pixelHeight:ei,worldWidth:.86,worldHeight:r,quadY:-.3,cursorFactory:s=>{let n=new s.Mesh(new s.CircleGeometry(4,32),new s.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#r().catch(s=>{})}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:s=!1,progress:n=0,timeText:a="0:00 / 0:00",presetName:o=null,sceneText:l=null,sceneLabel:h=null}){let c=this._sig;if(c&&(this._updatePlayback(c,{loading:e,playing:t,spinning:r,buffering:s,progress:n}),c.timeT.value=a,c.presetT&&o!=null&&(c.presetT.value=o),l!=null&&(c.sceneT.value=l),h!=null)){let u=String(h);c.sceneSub.value=u.length>Oo?`${u.slice(0,Oo-2)}...`:u}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-this.#e)/this.#t));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=this.#t*e;t.fillW.value=Math.max(.001,r),t.thumbL.value=this.#e+r-ps,t.thumbGlowL.value=this.#e+r-ds}async#r(){let e=this._quad,t=Io,r=Ge-Qt/2,s=Ze-Io-$t,n=Ge-$t/2,a=s-10,o=66,l=24,h=a-o,c=Ge-l/2;a=h-8;let u=78,p=a-u,d=Ge-9,g=this.#e=t+Qt+12,f=this.#t=p-10-g,m=this._sig={...this._createBaseSignals(),fillW:Be(.001),thumbL:Be(g-ps),thumbGlowL:Be(g-ds),thumbS:Be(1),thumbGlowOp:Be(0),timeT:Be("0:00 / 0:00"),sceneT:Be("1/1"),sceneSub:Be("SCENE"),presetT:Be("Off")},y=()=>{m.thumbGlowOp.value=.5,m.thumbS.value=1.15},b=()=>{e.dragging||(m.thumbGlowOp.value=0,m.thumbS.value=1)},S=P=>{P.target.setPointerCapture(P.pointerId),e.dragging=!0,this._seekFromEvent(P)},w=P=>{e.dragging&&this._seekFromEvent(P)},T=()=>{e.dragging=!1,m.thumbGlowOp.value=0,m.thumbS.value=1},M={backgroundColor:1710618},O=ti(Bc,{backgroundColor:657930,backgroundOpacity:.88,children:[ti(re,{positionType:"absolute",positionLeft:0,positionTop:0,width:Ze,height:ei,display:m.contentD,borderWidth:1,borderColor:3355443,borderOpacity:.3,children:[W(re,{positionType:"absolute",positionLeft:0,positionTop:0,width:Kt,height:xt,hover:M,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(-1),children:W(tt,{src:Dc,width:18,height:18,pointerEvents:"none"})}),ti(re,{positionType:"absolute",positionLeft:Kt,positionTop:0,width:Ze-Kt*2,height:xt,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,overflow:"hidden",children:[W(Jr,{fontSize:13,color:11184810,children:m.sceneT}),W(Jr,{fontSize:10,color:6710886,children:m.sceneSub})]}),W(re,{positionType:"absolute",positionLeft:Ze-Kt,positionTop:0,width:Kt,height:xt,hover:M,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(1),children:W(tt,{src:Xc,width:18,height:18,pointerEvents:"none"})}),W(re,{positionType:"absolute",positionLeft:0,positionTop:xt,width:Ze,height:.5,backgroundColor:3355443,backgroundOpacity:.5,pointerEvents:"none"}),ti(re,{positionType:"absolute",positionLeft:t,positionTop:r,width:Qt,height:Qt,borderRadius:Qt/2,borderWidth:1,borderColor:4473924,borderOpacity:.5,hover:fs,alignItems:"center",justifyContent:"center",onClick:()=>this.onPlayPause?.(),children:[W(tt,{display:m.playD,src:Gc,width:20,height:20,marginLeft:2,pointerEvents:"none"}),W(tt,{display:m.pauseD,src:Nc,width:18,height:18,pointerEvents:"none"}),W(tt,{display:m.spinD,src:Ao,width:24,height:24,transformRotateZ:m.spinR,pointerEvents:"none"})]}),W(re,{positionType:"absolute",positionLeft:g,positionTop:Ge-Fo/2,width:f,height:Fo,onPointerEnter:y,onPointerLeave:b,onPointerDown:S,onPointerMove:w,onPointerUp:T}),W(re,{positionType:"absolute",positionLeft:g,positionTop:Ge-yt/2,width:f,height:yt,borderRadius:yt/2,backgroundColor:2236962,backgroundOpacity:.8,pointerEvents:"none"}),W(re,{positionType:"absolute",positionLeft:g,positionTop:Ge-yt/2,width:m.fillW,height:yt,borderRadius:yt/2,backgroundColor:7829367,zIndexOffset:1,pointerEvents:"none"}),W(re,{positionType:"absolute",positionLeft:m.thumbGlowL,positionTop:Ge-ii/2,width:ii,height:ii,borderRadius:ds,borderWidth:2,borderColor:10066329,borderOpacity:m.thumbGlowOp,zIndexOffset:2,pointerEvents:"none"}),W(re,{positionType:"absolute",positionLeft:m.thumbL,positionTop:Ge-ri/2,width:ri,height:ri,borderRadius:ps,backgroundColor:11184810,transformScaleX:m.thumbS,transformScaleY:m.thumbS,zIndexOffset:3,pointerEvents:"none"}),W(re,{positionType:"absolute",positionLeft:p,positionTop:d,width:u,height:18,alignItems:"center",justifyContent:"center",children:W(Jr,{fontSize:13,color:16777215,opacity:.35,children:m.timeT})}),W(re,{positionType:"absolute",positionLeft:s,positionTop:n,width:$t,height:$t,borderRadius:$t/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:fs,alignItems:"center",justifyContent:"center",onClick:()=>this.onExit?.(),children:W(tt,{src:zc,width:11,height:11,pointerEvents:"none"})}),W(re,{positionType:"absolute",positionLeft:h,positionTop:c,width:o,height:l,borderRadius:l/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:fs,alignItems:"center",justifyContent:"center",onClick:()=>this.onPresetCycle?.(),children:W(Jr,{fontSize:11,color:10066329,pointerEvents:"none",children:m.presetT})})]}),W(re,{positionType:"absolute",positionLeft:0,positionTop:0,width:Ze,height:ei,backgroundColor:657930,backgroundOpacity:1,display:m.loadingD,alignItems:"center",justifyContent:"center",children:W(tt,{src:Ao,width:40,height:40,transformRotateZ:m.spinR,pointerEvents:"none"})})]});await e.mountReact(O)}};var wt=class{#e;#t;#r=null;#i=null;#s;#n;#o;#c;constructor(e,t){this.#e=e,this.#t=t;let r=t.scene,s=new e.BufferGeometry().setFromPoints([new e.Vector3(0,0,0),new e.Vector3(0,0,-5)]),n=new e.SphereGeometry(.015,6,6);this.#s=new e.MeshBasicMaterial({color:16711680,depthTest:!1}),this.#n=new e.MeshBasicMaterial({color:65280,depthTest:!1});let a=()=>{let o=new e.Group,l=new e.Group,h=new e.Line(s,new e.LineBasicMaterial({color:5227511,transparent:!0,opacity:.5,depthTest:!1}));h.visible=!1,o.add(h);let c=new e.Mesh(n,this.#s),u=new e.Mesh(n,this.#s);return c.renderOrder=u.renderOrder=999,c.visible=u.visible=!1,r.add(o,l,c,u),{ray:o,grip:l,line:h,idxSphere:c,thmSphere:u}};this.#o=a(),this.#c=a()}update(e,t){this.#l(),this.#a(this.#o,e),this.#a(this.#c,t)}dispose(){this.#r&&(this.#t.anchor.remove(this.#r),this.#r.geometry.dispose(),this.#r.material.dispose());for(let e of[this.#o,this.#c])e.line.material.dispose(),e.idxSphere.geometry.dispose(),e.thmSphere.geometry.dispose();this.#s.dispose(),this.#n.dispose()}#l(){let e=this.#t.bboxMesh;if(e===this.#i)return;this.#i=e;let t=this.#t.anchor;if(this.#r&&(t.remove(this.#r),this.#r.geometry.dispose(),this.#r.material.dispose(),this.#r=null),!e)return;let r=this.#e;this.#r=new r.LineSegments(new r.EdgesGeometry(e.geometry),new r.LineBasicMaterial({color:58879,transparent:!0,opacity:.35,depthTest:!1})),this.#r.position.copy(e.position),t.add(this.#r)}#a(e,t){if(t.rayTransform&&this.#u(e.ray,t.rayTransform),t.gripTransform&&this.#u(e.grip,t.gripTransform),e.line.visible=t.active,e.idxSphere.visible=e.thmSphere.visible=!1,!t.active)return;t.indexTip&&(e.idxSphere.position.set(t.indexTip.x,t.indexTip.y,t.indexTip.z),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0)),t.thumbTip&&(e.thmSphere.position.set(t.thumbTip.x,t.thumbTip.y,t.thumbTip.z),e.thmSphere.visible=!0,e.thmSphere.updateMatrixWorld(!0)),t.indexTip||(e.idxSphere.position.copy(e.grip.position),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0));let r=t.gripping?this.#n:this.#s;e.idxSphere.material=r,t.thumbTip&&(e.thmSphere.material=r)}#u(e,t){let r=t.position,s=t.orientation;e.position.set(r.x,r.y,r.z),e.quaternion.set(s.x,s.y,s.z,s.w),e.updateMatrixWorld(!0)}};import{signal as R}from"@preact/signals-core";import{Container as F,Fullscreen as Hc,Image as Vc,Svg as Z,Text as J}from"@react-three/uikit";import{Fragment as Jo,jsx as v,jsxs as ie}from"react/jsx-runtime";var B=9684710,ae=1122603,Wc=661021,Uc=2636615,Yc=4086636,D=680,ys=248,_e=34,De=48,er=_e+De,ea=De,Jt=26,qc=ys+ea,Go=32,ee=88,ze=60,Zc=ys-ze,Ne=(D-ee)/7,Re=Math.round(D/3),ta=12,Y=34,ue=ee+ta,St=D-ee-ta*2,jc=er+50,xs=St-Y,je=24,si=18,ra=ue+je,ia=xs-je*2,No={phase:"off",start:0,end:1,gap:0},_t=48,zo=i=>{let e=i?_t:0;return{strip:i,mainY:er+e,trkY:jc+e,btnY:Zc+e,bodyH:ys+e,panelH:qc+e}},rt=24,oi=D/7,ms="-",Do=18,Xo=4,Ho=3,Vo=.85,Wo=20,Uo=20,Yo=12,qo=.55,Qc=i=>Math.min(1,i/oi),ni=(i,e,t)=>Math.max(t,Math.round(i*e)),tr=(i,e)=>e?ra+ia*i:ue+xs*i,gs=(i,e)=>_.clamp01((i-(e?ra:ue))/(e?ia:xs)),Zo=i=>tr(i,!0)-je,jo=i=>tr(i,!0)+Y,$=(i,e="#93c6e6")=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${i}" fill="${e}"/></svg>`),$c="data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${St*2}" height="${Y*2}" viewBox="0 0 ${St} ${Y}"><defs><pattern id="h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1.5" height="6" fill="#93c6e6" fill-opacity="0.2"/></pattern></defs><rect width="100%" height="100%" fill="#0a161d"/><rect width="100%" height="100%" fill="url(#h)"/></svg>`),Qo="M8.76 21.6 7.221 20.1177 8.949 18.4235H8.76c-2.106 0-3.8925-.7191-5.3595-2.1573C1.9335 14.8279 1.2 13.0765 1.2 11.0118s.7335-3.81621 2.2005-5.25444C4.8675 4.31912 6.654 3.60001 8.76 3.60001h6.48c2.106 0 3.8925.71911 5.3595 2.15735C22.0665 7.19559 22.8 8.94707 22.8 11.0118s-.7335 3.8161-2.2005 5.2544c-1.467 1.4382-3.2535 2.1573-5.3595 2.1573v-2.1176c1.494 0 2.7675-.5162 3.8205-1.5485 1.053-1.0324 1.5795-2.2809 1.5795-3.7456s-.5265-2.71326-1.5795-3.74562c-1.053-1.03235-2.3265-1.54853-3.8205-1.54853H8.76c-1.494 0-2.7675.51618-3.8205 1.54853C3.8865 8.29854 3.36 9.54707 3.36 11.0118s.5265 2.722 1.5795 3.772c1.053 1.05 2.3265 1.628 3.8205 1.7339h.432l-1.944-1.9059 1.512-1.4824 4.32 4.2353L8.76 21.6Z",j={play:$("M8 5v14l11-7z"),pause:$("M6 4h4v16H6zm8 0h4v16h-4z"),spin:$("M12 2a10 10 0 1 1-10 10h3a7 7 0 1 0 7-7z"),bulb:$("M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"),mute:$("M7 9v6h4l5 5V4l-5 5H7z"),vol:$("M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"),loop:$(Qo),loopOn:$(Qo,"#11212b"),reset:$("M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"),exit:$("M17 7l-1.4 1.4L18.2 11H8v2h10.2l-2.6 2.6L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"),grip:$("M15.5 15.4V8.6L18.9 12l-3.4 3.4zM8.5 8.6v6.8L5.1 12l3.4-3.4z"),close:$("M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"),scale:$("M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z"),lock:$("M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"),unlk:$("M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"),fork:$("M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4h-6zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3L10 4z"),arrL:$("M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"),arrR:$("M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z")},it={backgroundColor:1849416},$o=.9,Kc=-.55,Ko=.866,Tt=class extends gt{#e;#t=null;#r=No;#i=null;#s=null;#n;#o;#c;#l=new Array(rt).fill(null);onMuteToggle=null;onScaleLockToggle=null;onLockToggle=null;onReset=null;onAbLoopToggle=null;onAbLoopSet=null;constructor(e,{strip:t=!1}={}){let{panelH:r}=zo(t);super(e,{pixelWidth:D,pixelHeight:r,worldWidth:1,worldHeight:r/D,quadZ:$o,quadY:Kc,cursorFactory:s=>{let n=new s.Mesh(new s.CircleGeometry(5,32),new s.MeshBasicMaterial({color:B,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#e=e,this.#c=zo(t),this.#n=new e.Vector3,this.#o=new e.Quaternion,this._quad.alpha=.9,this._quad.onDragTick=(s,n,a,o,l)=>this.#a(s,n,a,o,l),this._quad.onDragEnd=()=>{this.#t=null,this._quad.alpha=.9},this.#f().catch(s=>{})}#a(e,t,r,s,n){let a=this.#e,o=this.#t,l=o?.side??s??"right",h=l==="left"?e:t;if(!h?.triggerPressed)return this.#t=null,null;let c=h.rayTransform?.orientation;if(!c){let T=n.position,M=n.orientation;return{x:T.x,y:T.y,z:T.z,qx:M.x,qy:M.y,qz:M.z,qw:M.w}}let u=this.#n.set(0,0,-1).applyQuaternion(this.#o.set(c.x,c.y,c.z,c.w));if(!o){let T=r.transform.position,M=new a.Vector3(T.x,T.y,T.z),O=n.position,P=new a.Vector3(O.x,O.y,O.z).sub(M);this.#t={side:l,R:P.length()||$o,oQ:new a.Quaternion().setFromUnitVectors(u.clone(),P.normalize()),eye:M};let X=n.orientation;return{x:O.x,y:O.y,z:O.z,qx:X.x,qy:X.y,qz:X.z,qw:X.w}}if(u.applyQuaternion(o.oQ),Math.abs(u.y)>Ko){u.y=Math.sign(u.y)*Ko;let T=Math.sqrt(u.x*u.x+u.z*u.z)||1e-6,M=Math.sqrt(1-u.y*u.y)/T;u.x*=M,u.z*=M}let p=o.eye,d=o.R,g=p.x+u.x*d,f=p.y+u.y*d,m=p.z+u.z*d,{qx:y,qy:b,qz:S,qw:w}=Kr(u.x,u.y,u.z);return{x:g,y:f,z:m,qx:y,qy:b,qz:S,qw:w}}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:s=!1,progress:n=0,timeText:a="0:00 / 0:00",presetName:o=null,muted:l=!1,locked:h=!1,scaleLocked:c=!0,abLoop:u=No,sceneText:p=null,sceneLabel:d=null,bannerText:g=null,scenario:f=null}){let m=this._sig;if(!m)return;u.phase!=="active"&&(this.#s=null),u.phase!=="setB"&&(this.#i=null);let y=this.#s;if(this.#r=y?{...u,start:y.start,end:y.end}:u,this._updatePlayback(m,{loading:e,playing:t,spinning:r,buffering:s,progress:n}),this.#d(m),m.playTextD.value=r?"none":"flex",m.playLbl.value=t?"PAUSE":"PLAY",m.timeT.value=a,o!=null&&(m.presetT.value=o),m.icA.value=l?"none":"flex",m.icB.value=l?"flex":"none",m.muteLbl.value=l?"UNMUTE":"MUTE",m.sclLkLbl.value=c?"UNLOCK SCALE":"LOCK SCALE",m.lockA.value=h?"none":"flex",m.lockB.value=h?"flex":"none",m.lockLbl.value=h?"UNLOCK SCENE":"LOCK SCENE",d!=null){let b=String(d);m.sceneSub.value=b.length>Go?`${b.slice(0,Go-2)}...`:b}g!=null&&(m.bannerT.value=g),this.#u(f,p,e?0:n)}#u(e,t,r){let s=this._sig,n=e?.chips??[],a=n.filter(d=>!d.isFork);if(a.length){let d=Math.max(1,a.findIndex(g=>g.isActive)+1);s.sceneT.value=`${d}/${a.length}`}else t!=null&&(s.sceneT.value=t);if(!s.slots)return;let o=Math.max(0,n.findIndex(d=>d.isActive)),l=Math.min(n.length,rt),h=l?D/l:oi,c=n.length<=rt?0:Math.min(Math.max(0,o-(rt>>1)),n.length-rt),u=Qc(h),p=ni(Do,u,10);for(let d=0;d<rt;d++){let g=n[c+d]??null,f=s.slots[d],m=!!g&&(g.order!==void 0||g.forkFrom!==void 0);f.d.value=d<l?"flex":"none",f.sepD.value=d>0&&d<l?"flex":"none",f.x.value=d*h,f.w.value=h,f.lbl.value=g?.isFork?ms:g?.label??ms,f.lblD.value=g?.isFork?"none":"flex",f.lblFs.value=ni(Wo,u,10),f.icD.value=g?.isFork?"flex":"none",f.icS.value=ni(Uo,u,10),f.badge.value=g?.branchNumber?String(g.branchNumber):"",f.badgeD.value=g?.branchNumber?"flex":"none",f.badgeS.value=p,f.badgeFs.value=ni(Yo,u,8),f.badgeX.value=(d+1)*h-p-Xo;let y=!g?.isFork&&!!g?.isActive;f.progD.value=y?"flex":"none",f.progW.value=y?h*r:0,f.lblOpa.value=m&&!g?.isActive?qo:1,f.lblFw.value=g?.isActive?"bold":"normal",f.opa.value=m?1:.35,this.#l[d]=g}}#h(){let{phase:e,start:t,end:r,gap:s}=this.#r,n=this.#i==null?null:_.clamp(this.#i,t+s,1);return{a:e==="off"?null:t,b:e==="active"?r:n}}#d(e){let{phase:t,start:r}=this.#r,s=t!=="off",{b:n}=this.#h(),a=Zo(r),o=jo(n??1);e.abOnD.value=s?"flex":"none",e.abOffD.value=s?"none":"flex",e.abTxtC.value=s?ae:B,e.abLbl.value=t==="setB"?"A/B LOOP (2/2)":"A/B LOOP",e.abAL.value=a,e.abBL.value=o,e.abBD.value=n==null?"none":"flex",e.abMarkerPE.value=t==="active"?"auto":"none",e.abPreW.value=a-ue,e.abHoverD.value=this.#i==null?"none":"flex",e.abHoverL.value=a+je,e.abHoverW.value=Math.max(0,o-a-je)}#p(e){let{a:t,b:r}=this.#h(),s=e+(Y-si)/2,n=a=>s<a+je&&a<s+si;return t!=null&&n(Zo(t))||r!=null&&n(jo(r))}_seekTo(e){let{phase:t,start:r,end:s}=this.#r,n=_.clamp(gs(e-Y/2,t!=="off"),r,s);this._setProgress(n),this.onSeek?.(n)}_setProgress(e){let t=this._sig;if(!t)return;let{phase:r,start:s,end:n}=this.#r,a=r!=="off",o=tr(_.clamp(e,s,n),a),l=tr(s,a);t.thumbL.value=o,t.fillL.value=l,t.fillW.value=Math.max(0,o+Y-l),t.thumbIconD.value=this.#p(o)?"none":"flex"}async#f(){let{strip:e,mainY:t,trkY:r,btnY:s,bodyH:n,panelH:a}=this.#c,o=this._sig={...this._createBaseSignals(),playTextD:R("flex"),playLbl:R("PAUSE"),fillL:R(ue),fillW:R(Y),thumbL:R(ue),thumbS:R(1),thumbIconD:R("flex"),timeT:R("0:00 / 0:00"),sceneT:R("1/5"),sceneSub:R("SCENE"),icA:R("flex"),icB:R("none"),muteLbl:R("MUTE"),sclLkLbl:R("LOCK SCALE"),lockA:R("flex"),lockB:R("none"),lockLbl:R("LOCK SCENE"),abLbl:R("A/B LOOP"),abOnD:R("none"),abOffD:R("flex"),abTxtC:R(B),abAL:R(ue),abBD:R("none"),abBL:R(ue),abMarkerPE:R("none"),abPreW:R(0),abHoverD:R("none"),abHoverL:R(ue),abHoverW:R(0),presetT:R("OFF"),bannerT:R(""),...e&&{slots:Array.from({length:rt},(x,E)=>({d:R("none"),sepD:R("none"),x:R(E*oi),w:R(oi),lbl:R(ms),lblD:R("flex"),lblFs:R(Wo),lblFw:R("normal"),lblOpa:R(qo),icD:R("none"),icS:R(Uo),badge:R(""),badgeD:R("none"),badgeS:R(Do),badgeFs:R(Yo),badgeX:R(0),progD:R("none"),progW:R(0),opa:R(.35)}))}},l=({x,y:E,w:A,h:C,z:H=0})=>v(F,{positionType:"absolute",positionLeft:x,positionTop:E,width:A,height:C,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:H,pointerEvents:"none"}),h=({slot:x,index:E})=>ie(Jo,{children:[v(F,{positionType:"absolute",positionLeft:x.x,positionTop:0,width:x.w,height:_t,backgroundColor:ae,hover:it,display:x.d,onClick:()=>{let A=this.#l[E];A?.forkFrom!==void 0?this.onSceneAction?.(A.forkFrom):A?.order!==void 0&&this.onSceneSelect?.(A.order)}}),ie(F,{positionType:"absolute",positionLeft:x.x,positionTop:0,width:x.w,height:_t,alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",display:x.d,opacity:x.opa,zIndexOffset:2,children:[v(J,{fontSize:x.lblFs,fontWeight:x.lblFw,color:B,opacity:x.lblOpa,display:x.lblD,children:x.lbl}),v(Z,{src:j.fork,width:x.icS,height:x.icS,display:x.icD,transformRotateZ:-90})]}),v(F,{positionType:"absolute",positionLeft:x.badgeX,positionTop:Xo,width:x.badgeS,height:x.badgeS,borderRadius:3,backgroundColor:B,backgroundOpacity:Vo,alignItems:"center",justifyContent:"center",display:x.badgeD,zIndexOffset:2,pointerEvents:"none",children:v(J,{fontSize:x.badgeFs,fontWeight:"bold",color:ae,zIndexOffset:3,children:x.badge})}),v(F,{positionType:"absolute",positionLeft:x.x,positionTop:_t-Ho,width:x.progW,height:Ho,backgroundColor:B,backgroundOpacity:Vo,display:x.progD,zIndexOffset:2,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:x.x,positionTop:0,width:.5,height:_t,backgroundColor:B,backgroundOpacity:.3,display:x.sepD,zIndexOffset:3,pointerEvents:"none"})]}),c=({idx:x,onClick:E,active:A=null,children:C})=>{let H=ee+x*Ne;return ie(F,{positionType:"absolute",positionLeft:H,positionTop:s,width:Ne,height:ze,backgroundColor:ae,hover:it,onClick:E,children:[A&&v(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:Ne,height:ze,backgroundColor:B,display:A,pointerEvents:"none"}),v(F,{width:"100%",height:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",children:C})]})},u=this._quad,p=x=>x.point.x+u.pixelWidth/2,d=x=>gs(p(x)-je/2-Y,!0),g=()=>{o.thumbS.value=1.08},f=()=>{this.#i=null,u.dragging||(o.thumbS.value=1)},m=x=>{if(this.#r.phase==="setB"){this.#i=null,this.onAbLoopSet?.(this.#r.start,d(x));return}x.target.setPointerCapture(x.pointerId),u.dragging=!0,this._seekFromEvent(x)},y=x=>{this.#r.phase==="setB"?this.#i=d(x):u.dragging&&this._seekFromEvent(x)},b=()=>{u.dragging=!1,o.thumbS.value=1},S=x=>E=>{E.target.setPointerCapture(E.pointerId);let{start:A,end:C}=this.#r,H=p(E)-tr(x==="a"?A:C,!0);this.#s={marker:x,grab:H,start:A,end:C}},w=x=>{let E=this.#s;if(!E)return;let A=gs(p(x)-E.grab,!0),C=this.#r.gap;E.marker==="a"?E.start=Math.min(A,E.end-C):E.end=Math.max(A,E.start+C)},T=()=>{let x=this.#s;x&&(this.#s=null,this.onAbLoopSet?.(x.start,x.end))},M=({label:x,left:E,display:A,onPointerDown:C})=>v(F,{positionType:"absolute",positionLeft:E,positionTop:r,width:je,height:Y,backgroundColor:ae,borderWidth:1,borderColor:B,hover:it,alignItems:"center",justifyContent:"center",display:A,pointerEvents:o.abMarkerPE,zIndex:1,zIndexOffset:8,onPointerDown:C,onPointerMove:w,onPointerUp:T,children:v(J,{fontSize:13,fontWeight:"bold",color:B,pointerEvents:"none",children:x})}),O=x=>{x.target.setPointerCapture(x.pointerId),u.panelDragging=!0,u.alpha=.3},P=()=>{u.panelDragging=!1},X=ie(Hc,{backgroundColor:ae,children:[ie(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:D,height:a,display:o.contentD,children:[v(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:D,height:_e,backgroundColor:B,backgroundOpacity:.85}),v(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:D,height:_e,alignItems:"center",justifyContent:"center",children:v(J,{fontSize:13,fontWeight:"bold",color:ae,children:o.bannerT})}),v(F,{positionType:"absolute",positionLeft:0,positionTop:_e,width:Re,height:De,backgroundColor:ae,hover:it,onClick:()=>this.onSceneNav?.(-1)}),v(F,{positionType:"absolute",positionLeft:0,positionTop:_e,width:Re,height:De,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:v(Z,{src:j.arrL,width:28,height:28})}),v(l,{x:Re,y:_e,w:.5,h:De}),ie(F,{positionType:"absolute",positionLeft:Re,positionTop:_e,width:D-Re*2,height:De,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,overflow:"hidden",children:[v(J,{fontSize:22,color:B,children:o.sceneT}),v(J,{fontSize:10,color:B,opacity:.45,children:o.sceneSub})]}),v(l,{x:D-Re,y:_e,w:.5,h:De}),v(F,{positionType:"absolute",positionLeft:D-Re,positionTop:_e,width:Re,height:De,backgroundColor:ae,hover:it,onClick:()=>this.onSceneNav?.(1)}),v(F,{positionType:"absolute",positionLeft:D-Re,positionTop:_e,width:Re,height:De,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:v(Z,{src:j.arrR,width:28,height:28})}),v(l,{x:0,y:er,w:D,h:.5}),e&&ie(Jo,{children:[v(F,{positionType:"absolute",positionLeft:0,positionTop:er,width:D,height:_t,children:o.slots.map((x,E)=>v(h,{slot:x,index:E},E))}),v(l,{x:0,y:er,w:D,h:.5,z:10}),v(l,{x:0,y:t,w:D,h:.5,z:10})]}),v(F,{positionType:"absolute",positionLeft:0,positionTop:t,width:ee,height:n-t,backgroundColor:ae,hover:it,onClick:()=>this.onPlayPause?.()}),ie(F,{positionType:"absolute",positionLeft:0,positionTop:t,width:ee,height:n-t,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,pointerEvents:"none",children:[v(Z,{display:o.playD,src:j.play,width:20,height:24,marginLeft:2}),v(Z,{display:o.pauseD,src:j.pause,width:20,height:24}),v(Z,{display:o.spinD,src:j.spin,width:28,height:28,transformRotateZ:o.spinR}),v(J,{fontSize:13,fontWeight:"bold",color:B,display:o.playTextD,children:o.playLbl})]}),v(l,{x:ee,y:t,w:.5,h:n-t}),v(F,{positionType:"absolute",positionLeft:ee+16,positionTop:t+14,width:120,height:20,children:v(J,{fontSize:14,color:B,children:o.timeT})}),v(F,{positionType:"absolute",positionLeft:ue,positionTop:r,width:St,height:Y,backgroundColor:Wc,onPointerEnter:g,onPointerLeave:f,onPointerDown:m,onPointerMove:y,onPointerUp:b}),v(Vc,{src:$c,positionType:"absolute",positionLeft:ue,positionTop:r,width:St,height:Y,objectFit:"fill",keepAspectRatio:!1,zIndexOffset:1,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:o.abHoverL,positionTop:r,width:o.abHoverW,height:Y,backgroundColor:Yc,display:o.abHoverD,zIndex:1,zIndexOffset:2,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:ue,positionTop:r,width:o.abPreW,height:Y,backgroundColor:Uc,display:o.abOnD,zIndex:1,zIndexOffset:3,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:o.fillL,positionTop:r,width:o.fillW,height:Y,backgroundColor:B,backgroundOpacity:.85,zIndex:1,zIndexOffset:4,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:ue,positionTop:r,width:St,height:Y,borderWidth:1,borderColor:B,borderOpacity:.6,zIndex:1,zIndexOffset:5,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:o.thumbL,positionTop:r,width:Y,height:Y,backgroundColor:ae,borderWidth:1,borderColor:B,zIndex:1,zIndexOffset:6,transformScaleX:o.thumbS,transformScaleY:o.thumbS,pointerEvents:"none"}),v(F,{positionType:"absolute",positionLeft:o.thumbL,positionTop:r,width:Y,height:Y,alignItems:"center",justifyContent:"center",zIndex:1,zIndexOffset:7,transformScaleX:o.thumbS,transformScaleY:o.thumbS,pointerEvents:"none",children:v(Z,{display:o.thumbIconD,src:j.grip,width:si,height:si})}),v(M,{label:"A",left:o.abAL,display:o.abOnD,onPointerDown:S("a")}),v(M,{label:"B",left:o.abBL,display:o.abBD,onPointerDown:S("b")}),v(l,{x:ee,y:s,w:D-ee,h:.5}),ie(c,{idx:0,onClick:()=>this.onPresetCycle?.(),children:[v(Z,{src:j.bulb,width:20,height:20}),v(J,{fontSize:10,fontWeight:"bold",color:B,children:o.presetT})]}),v(l,{x:ee+Ne,y:s,w:.5,h:ze}),ie(c,{idx:1,onClick:()=>this.onMuteToggle?.(),children:[v(Z,{display:o.icA,src:j.mute,width:20,height:20}),v(Z,{display:o.icB,src:j.vol,width:20,height:20}),v(J,{fontSize:10,fontWeight:"bold",color:B,children:o.muteLbl})]}),v(l,{x:ee+Ne*2,y:s,w:.5,h:ze}),ie(c,{idx:2,onClick:()=>this.onScaleLockToggle?.(),children:[v(Z,{src:j.scale,width:20,height:20}),v(J,{fontSize:10,fontWeight:"bold",color:B,children:o.sclLkLbl})]}),v(l,{x:ee+Ne*3,y:s,w:.5,h:ze}),ie(c,{idx:3,active:o.abOnD,onClick:()=>this.onAbLoopToggle?.(),children:[v(Z,{display:o.abOffD,src:j.loop,width:20,height:20}),v(Z,{display:o.abOnD,src:j.loopOn,width:20,height:20}),v(J,{fontSize:10,fontWeight:"bold",color:o.abTxtC,children:o.abLbl})]}),v(l,{x:ee+Ne*4,y:s,w:.5,h:ze}),ie(c,{idx:4,onClick:()=>this.onLockToggle?.(),children:[v(Z,{display:o.lockA,src:j.unlk,width:20,height:20}),v(Z,{display:o.lockB,src:j.lock,width:20,height:20}),v(J,{fontSize:10,fontWeight:"bold",color:B,children:o.lockLbl})]}),v(l,{x:ee+Ne*5,y:s,w:.5,h:ze}),ie(c,{idx:5,onClick:()=>this.onReset?.(),children:[v(Z,{src:j.reset,width:20,height:20}),v(J,{fontSize:10,fontWeight:"bold",color:B,children:"RESET SCENE"})]}),v(l,{x:ee+Ne*6,y:s,w:.5,h:ze}),ie(c,{idx:6,onClick:()=>this.onExit?.(),children:[v(Z,{src:j.exit,width:20,height:20}),v(J,{fontSize:10,fontWeight:"bold",color:B,children:"EXIT"})]}),v(l,{x:0,y:n,w:D,h:.5}),v(F,{positionType:"absolute",positionLeft:0,positionTop:n+1,width:D,height:ea-1,backgroundColor:ae,hover:it,alignItems:"center",justifyContent:"center",onPointerDown:O,onPointerUp:P,children:v(J,{fontSize:12,color:B,opacity:.45,pointerEvents:"none",children:"DRAG TO MOVE THE MENU"})}),v(F,{positionType:"absolute",positionLeft:D-Jt-4,positionTop:(_e-Jt)/2,width:Jt,height:Jt,borderRadius:Jt/2,backgroundColor:ae,backgroundOpacity:.8,borderWidth:1,borderColor:B,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",zIndexOffset:10,onClick:()=>this.onClose?.(),children:v(Z,{src:j.close,width:12,height:12,pointerEvents:"none"})}),v(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:D,height:.5,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10}),v(F,{positionType:"absolute",positionLeft:0,positionTop:a-.5,width:D,height:.5,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10}),v(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:.5,height:a,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10}),v(F,{positionType:"absolute",positionLeft:D-.5,positionTop:0,width:.5,height:a,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10})]}),v(F,{positionType:"absolute",positionLeft:0,positionTop:0,width:D,height:a,backgroundColor:ae,backgroundOpacity:1,display:o.loadingD,alignItems:"center",justifyContent:"center",children:v(Z,{src:j.spin,width:64,height:64,transformRotateZ:o.spinR,pointerEvents:"none"})})]});await u.mountReact(X)}};var Mt=class{#e;#t;#r;#i=null;#s;#n;#o;constructor(e){this.#e=e,this.#t=new e.Scene,this.#r=new e.Group,this.#t.add(this.#r),this.#s=new e.Vector3,this.#n=new e.Vector3,this.#o=new e.Raycaster}get scene(){return this.#t}get anchor(){return this.#r}get bboxMesh(){return this.#i}get hasBBox(){return!!this.#i}rebuildBBox(e,t){let r=this.#e;this.#i&&(this.#r.remove(this.#i),this.#i.geometry.dispose(),this.#i.material.dispose());let s=(e.minX+e.maxX)/2,n=(e.minY+e.maxY)/2,a=(e.minZ+e.maxZ)/2,o=new r.Box3(new r.Vector3(e.minX,e.minY,e.minZ),new r.Vector3(e.maxX,e.maxY,e.maxZ)).applyMatrix4(new r.Matrix4().fromArray(t)),l=o.getSize(new r.Vector3).max(new r.Vector3(.1,.1,.1)),h=o.getCenter(new r.Vector3),c=new r.BoxGeometry(l.x,l.y,l.z);return this.#i=new r.Mesh(c,new r.MeshBasicMaterial({visible:!1,side:r.DoubleSide})),this.#i.position.copy(h),this.#r.add(this.#i),{cx:s,cy:n,cz:a}}applyTransform(e,t){this.#r.position.set(e[0],e[1],e[2]),this.#r.scale.set(t,t,-t),this.#r.quaternion.identity(),this.#r.updateMatrixWorld(!0)}hitTest(e){if(!this.#i)return!1;let t=e.position,r=e.orientation;return this.#s.set(t.x,t.y,t.z),this.#n.set(-2*(r.w*r.y+r.x*r.z),-2*(r.y*r.z-r.w*r.x),2*(r.x*r.x+r.y*r.y)-1),this.#o.set(this.#s,this.#n),this.#o.intersectObject(this.#i,!1).length>0}};import{computed as sa,signal as Se}from"@preact/signals-core";import{Container as Xe,Fullscreen as Jc,Svg as eh,Text as ai}from"@react-three/uikit";import{Fragment as oh,jsx as q,jsxs as vs}from"react/jsx-runtime";var Qe=9684710,li=1122603,ir=4,se=680,$e=72,Lt=56,na=$e+Lt*ir,Pt=24,bs=80,rr=26,th=3,rh=40,ih=48,oa=.85,sh={backgroundColor:1849416},aa=.8,ws=.9,_s=-.1,nh="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#93c6e6"/></svg>'),la=(i,e)=>{let t=String(i).toUpperCase();return t.length>e?`${t.slice(0,e-2)}...`:t},ca="CHOOSE WHAT HAPPENS NEXT",ci=class{#e;#t=null;#r=new Array(ir).fill(null);onSelect=null;onDismiss=null;constructor(e){this.#e=new Ee(e,{pixelWidth:se,pixelHeight:na,worldWidth:aa,worldHeight:aa*na/se,quadZ:ws,quadY:_s,react:!0,cursorFactory:t=>{let r=new t.Mesh(new t.CircleGeometry(5,32),new t.MeshBasicMaterial({color:Qe,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return r.renderOrder=999,r}}),this.#e.alpha=1,this.#i().catch(t=>{})}get quad(){return this.#e}update({prompt:e,secondsLeft:t,timeoutSec:r}){let s=this.#t;if(!s)return;let n=e?.options??[];s.title.value=la(e?.title||ca,rh),s.rows.value=Math.min(n.length,ir);let a=n.length>0&&t!==null;s.secondsD.value=a?"flex":"none",s.seconds.value=a?`${t} S`:"",s.progressW.value=a?se*Math.min(1,Math.max(0,1-t/r)):0,s.closeD.value=e?.isReopened?"flex":"none";for(let o=0;o<ir;o++){let l=n[o],h=s.options[o],c=!!l&&l.order===e?.selected;h.d.value=l?"flex":"none",l&&(h.lbl.value=la(l.label,ih)),h.fillD.value=c?"flex":"none",h.lblD.value=l&&!c?"flex":"none",h.lblActD.value=c?"flex":"none",this.#r[o]=l?.order??null}}dispose(){this.#e.dispose()}async#i(){let e=Se(0),t=this.#t={title:Se(ca),rows:e,seconds:Se(""),secondsD:Se("none"),progressW:Se(0),closeD:Se("none"),options:Array.from({length:ir},()=>({d:Se("none"),fillD:Se("none"),lbl:Se(""),lblD:Se("flex"),lblActD:Se("none")}))},r=sa(()=>$e+Lt*e.value),s=sa(()=>r.value-.5),n=({x:l,y:h,w:c,h:u,display:p})=>q(Xe,{positionType:"absolute",positionLeft:l,positionTop:h,width:c,height:u,backgroundColor:Qe,backgroundOpacity:.3,display:p,zIndexOffset:3,pointerEvents:"none"}),a=({row:l,index:h})=>{let c=$e+h*Lt;return vs(oh,{children:[q(Xe,{positionType:"absolute",positionLeft:0,positionTop:c,width:se,height:Lt,backgroundColor:li,hover:sh,display:l.d,onClick:()=>{let u=this.#r[h];u!=null&&this.onSelect?.(u)}}),q(Xe,{positionType:"absolute",positionLeft:0,positionTop:c,width:se,height:Lt,backgroundColor:Qe,backgroundOpacity:oa,display:l.fillD,zIndexOffset:1,pointerEvents:"none"}),vs(Xe,{positionType:"absolute",positionLeft:Pt,positionTop:c,width:se-Pt*2,height:Lt,alignItems:"center",justifyContent:"center",wordBreak:"keep-all",display:l.d,zIndexOffset:2,pointerEvents:"none",children:[q(ai,{fontSize:15,fontWeight:"bold",color:Qe,display:l.lblD,children:l.lbl}),q(ai,{fontSize:15,fontWeight:"bold",color:li,display:l.lblActD,children:l.lbl})]}),h>0&&q(n,{x:0,y:c,w:se,h:.5,display:l.d})]})},o=vs(Jc,{backgroundOpacity:0,children:[q(Xe,{positionType:"absolute",positionLeft:0,positionTop:0,width:se,height:r,backgroundColor:li}),q(Xe,{positionType:"absolute",positionLeft:Pt,positionTop:0,width:se-Pt*2-bs,height:$e,alignItems:"center",pointerEvents:"none",children:q(ai,{fontSize:20,fontWeight:"bold",color:Qe,children:t.title})}),q(Xe,{positionType:"absolute",positionLeft:se-Pt-bs,positionTop:0,width:bs,height:$e,alignItems:"center",justifyContent:"flex-end",display:t.secondsD,pointerEvents:"none",children:q(ai,{fontSize:20,fontWeight:"bold",color:Qe,children:t.seconds})}),q(Xe,{positionType:"absolute",positionLeft:se-Pt-rr,positionTop:($e-rr)/2,width:rr,height:rr,borderRadius:rr/2,backgroundColor:li,backgroundOpacity:.8,borderWidth:1,borderColor:Qe,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",display:t.closeD,zIndexOffset:10,onClick:()=>this.onDismiss?.(),children:q(eh,{src:nh,width:12,height:12,pointerEvents:"none"})}),q(n,{x:0,y:$e,w:se,h:.5}),q(Xe,{positionType:"absolute",positionLeft:0,positionTop:$e,width:t.progressW,height:th,backgroundColor:Qe,backgroundOpacity:oa,display:t.secondsD,zIndexOffset:4,pointerEvents:"none"}),t.options.map((l,h)=>q(a,{row:l,index:h},h)),q(n,{x:0,y:0,w:se,h:.5}),q(n,{x:0,y:s,w:se,h:.5}),q(n,{x:0,y:0,w:.5,h:r}),q(n,{x:se-.5,y:0,w:.5,h:r})]});await this.#e.mountReact(o)}};var Ct=class i{#e;#t;#r;#i;#s;#n;static#o=1.5;static#c=.04;static#l=.15;static#a=4;static#u=20;static#h=.003;static#d=.001;static#p=.7;constructor(e,t){this.#e=e,this.#t=this.#f(),this.#r=this.#f(),this.#i=this.#m(),this.#s=this.#m(),this.#n=new e.Vector3,t.add(this.#t.group,this.#r.group,this.#i,this.#s)}update(e,t,r,s=!0){this.#g(this.#t,this.#i,s?e:null,r?.[0]),this.#g(this.#r,this.#s,s?t:null,r?.[1])}dispose(){for(let e of[this.#t,this.#r])e.mesh.geometry.dispose(),e.mesh.material.dispose();for(let e of[this.#i,this.#s])e.geometry.dispose(),e.material.dispose()}#f(){let e=this.#e,t=i.#a,r=i.#u,s=i.#o,n=i.#c,a=i.#l,o=i.#h,l=i.#d,h=i.#p,c=r+1,u=t+1,p=c*u,d=new Float32Array(p*3),g=new Float32Array(p*4),f=[];for(let w=0;w<c;w++){let T=w/r,M=-n-T*s,O=o+(l-o)*T,P=Math.min(T/a,1),X=1-T,x=h*P*X;for(let E=0;E<=t;E++){let A=E/t*Math.PI*2,C=w*u+E;d[C*3]=Math.cos(A)*O,d[C*3+1]=Math.sin(A)*O,d[C*3+2]=M,g[C*4]=1,g[C*4+1]=1,g[C*4+2]=1,g[C*4+3]=x}}for(let w=0;w<r;w++)for(let T=0;T<t;T++){let M=w*u+T,O=M+1,P=M+u,X=P+1;f.push(M,P,O,O,P,X)}let m=new e.BufferGeometry;m.setAttribute("position",new e.BufferAttribute(d,3)),m.setAttribute("color",new e.BufferAttribute(g,4)),m.setIndex(f);let y=new e.MeshBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),b=new e.Mesh(m,y);b.frustumCulled=!1,b.renderOrder=998;let S=new e.Group;return S.add(b),S.visible=!1,{mesh:b,group:S}}#m(){let e=this.#e,t=new e.RingGeometry(.004,.008,24),r=new e.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),s=new e.Mesh(t,r);return s.frustumCulled=!1,s.renderOrder=999,s.visible=!1,s}#g(e,t,r,s){if(!r?.active||!r.rayTransform||r.isTransientPointer){e.group.visible=!1,t.visible=!1;return}let n=r.rayTransform.position,a=r.rayTransform.orientation;e.group.position.set(n.x,n.y,n.z),e.group.quaternion.set(a.x,a.y,a.z,a.w),e.group.visible=!0,e.group.updateMatrixWorld(!0);let o=r.triggerPressed??!1;if(e.mesh.material.color.setRGB(o?.4:1,o?.75:1,1),s?.visible){let l=this.#n.set(n.x,n.y,n.z).distanceTo(s.position),h=i.#c+i.#o;e.mesh.scale.z=Math.min(1,l/h),t.position.copy(s.position),t.quaternion.set(a.x,a.y,a.z,a.w),t.visible=!0,t.updateMatrixWorld(!0)}else e.mesh.scale.z=1,t.visible=!1}};import{Fullscreen as ah}from"@react-three/uikit";import{jsx as ph}from"react/jsx-runtime";var lh=0,ch=.55,hh=4,uh=3,Ss=.7,Ts=0,hi=class{#e;constructor(e){this.#e=new Ee(e,{pixelWidth:64,pixelHeight:48,worldWidth:hh,worldHeight:uh,quadZ:Ss,quadY:Ts,react:!0}),this.#e.alpha=ch,this.#e.mountReact(ph(ah,{backgroundColor:lh})).catch(t=>{})}get quad(){return this.#e}dispose(){this.#e.dispose()}};var ui=(i,e)=>e||!i?i:{...i,rayTransform:null},Ms=i=>i?.menuPressed?{...i,menuPressed:!1}:i,Et=Object.keys(Ht),ha=i=>!Number.isFinite(i)||i<0?"0:00":`${~~(i/60)}:${String(~~i%60).padStart(2,"0")}`,Ps=i=>i.toUpperCase(),ua=i=>Math.max(.1,i*.01);var Rt=class{#e;#t;#r;#i=null;#s=null;#n=null;#o=!1;#c=null;#l=!1;#a=null;#u=null;#h=null;#d=null;#p=null;#f=0;#m=0;#g=0;#b=Et.indexOf("off");#S=Ps("off");#_=1;#y=!1;#v=!0;#T="off";#w=[];#x=0;#M=!0;#R=null;#P=null;#C=null;#B=null;#N=null;#A=null;#L=null;#G;#I=null;#z=null;#D=null;#k=null;#E=null;#F=null;constructor(e,{debug:t=!1,uiStyle:r="modern",rays:s=!0}={}){this.#e=e,this.#t=t,this.#r=r,this.#G=s}get uiStyle(){return this.#r}set uiStyle(e){this.#r=e}set manipulator(e){this.#a=e}get manipulator(){return this.#a}get uiActive(){return this.#O?!0:!this.#M&&(this.#i?.quad.interacting??!1)}get uiDragging(){if(this.#M)return!1;let e=this.#i?.quad;return(e?.dragging||e?.panelDragging)??!1}get quads(){return[this.#i?.quad,this.#n?.quad,this.#s?.quad].filter(Boolean)}get#V(){return[this.#i?.quad,this.#s?.quad].filter(Boolean)}set sources(e){this.#w=e??[],this.#x=Math.min(this.#x,Math.max(0,this.#w.length-1))}get sources(){return this.#w}set sceneIndex(e){this.#w.length&&(this.#x=Math.max(0,Math.min(this.#w.length-1,e)),this.#M=!0)}get sceneIndex(){return this.#x}set onSceneChange(e){this.#B=e}get onSceneChange(){return this.#B}set onPresetChange(e){this.#C=e}get onPresetChange(){return this.#C}set onLock(e){this.#N=e}get onLock(){return this.#N}set onScaleLock(e){this.#A=e}get onScaleLock(){return this.#A}set scenario(e){let t=!!e?.prompt&&!this.#P?.prompt,r=!e?.prompt&&!!this.#P?.prompt;this.#P=e,t?this.#X():r&&(this.#s?.quad.hide(),this.#n?.quad.hide(),this.#H(!1)),this.#W()}get scenario(){return this.#P}set bannerText(e){this.#R=e}get bannerText(){return this.#R}set eventLogger(e){this.#L=e}get eventLogger(){return this.#L}setPreset(e,t=this.#_){this.#_=t,this.syncPreset(e),this.#j(this.#u,e,t)}syncPreset(e){let t=Et.indexOf(e);t<0||(this.#b=t,this.#S=Ps(e))}async init(e,t,r,s,n,a=!1){this.#u=e;let o=this.#e,l=this.#t||this.#G,h=!!this.#P;this.#i=this.#r==="modern"?new Tt(o,{strip:h}):new bt(o),h&&(this.#s=new ci(o),this.#n=new hi(o),this.#I=new o.Vector3,this.#z=new o.Vector3,this.#D=new o.Quaternion),this.#Y(e,t);let c=l?new Mt(o):null;if(this.#F=c,c&&this.#a?.setOverlay(c),this.#y=this.#w[this.#x]?.locked??this.#y,this.#v=this.#w[this.#x]?.scaleLocked??this.#v,this.#a&&(this.#a.locked=this.#y,this.#a.scaleLocked=this.#v),this.#j(e,Et[this.#b],this.#_),c){for(let g of this.#V){g.hitMesh&&c.scene.add(g.hitMesh);for(let f of g.hitSpheres)c.scene.add(f)}this.#t&&(this.#k=new wt(o,c)),this.#G&&(this.#E=new Ct(o,c.scene))}l&&c&&(this.#h=new o.WebGLRenderer({context:n,canvas:n.canvas}),this.#h.autoClear=!1,this.#d=new o.PerspectiveCamera(50,1,.01,1e4),this.#d.matrixAutoUpdate=!1,this.#p=new o.WebGLRenderTarget(1,1),this.#h.setRenderTarget(this.#p),this.#h.setRenderTarget(null));let u=await this.#i.quad.init(t,r,s,n),p=await this.#n?.quad.init(t,r,s,n),d=await this.#s?.quad.init(t,r,s,n);return this.#P?.prompt&&this.#X(),this.#f=setTimeout(()=>{this.#l=!0,this.#W()},1e3),[u,p,d].filter(Boolean)}frame(e,t,r,s,n,a){this.#ee(a);let o=this.#i?.quad,l=this.#a?.leftHand,h=this.#a?.rightHand;o?.updatePosition(s),this.#s?this.#Z(s,l,h):(o?.handleInput(l,h,s),this.#E?.update(l,h,o?.hitSpheres,!!o?.visible)),this.#k?.update(l,h),o?.panelDragging&&this.#a?.reset(),this.#te(e,a),this.#i?.render(e),o?.drawContent(t),this.#n?.quad.drawContent(t),this.#s?.quad.drawContent(t)}renderEye(e,t,r,s,n,a,o){this.#i?.quad.renderEye(e,r,s,n,a,o),this.#n?.quad.renderEye(e,r,s,n,a,o),this.#s?.quad.renderEye(e,r,s,n,a,o),!(!this.#h||!this.#F)&&(this.#d.projectionMatrix.fromArray(r.projectionMatrix),this.#d.projectionMatrixInverse.copy(this.#d.projectionMatrix).invert(),this.#d.matrix.fromArray(r.transform.matrix),this.#d.matrixWorld.copy(this.#d.matrix),this.#d.matrixWorldInverse.fromArray(r.transform.inverse.matrix),this.#h.resetState(),this.#h.setRenderTargetFramebuffer(this.#p,t),this.#h.setRenderTarget(this.#p),this.#h.setViewport(s,n,a,o),this.#h.setScissor(s,n,a,o),this.#h.setScissorTest(!0),this.#h.clearDepth(),this.#h.render(this.#F.scene,this.#d),this.#h.resetState(),e.bindFramebuffer(e.FRAMEBUFFER,t))}onRefReset(){this.#i?.quad.recenter(),this.#n?.quad.visible&&this.#n.quad.show(),this.#s?.quad.visible&&(this.#o=!0,this.#s.quad.show())}render(e,t){}dispose(){clearTimeout(this.#f),this.#l=!1,this.#T!=="off"&&this.#$(this.#u),this.#k?.dispose(),this.#k=null,this.#E?.dispose(),this.#E=null,this.#F=null,this.#h?.dispose(),this.#h=null,this.#p?.dispose(),this.#p=null,this.#d=null,this.#i?.quad.dispose(),this.#i=null,this.#s?.dispose(),this.#s=null,this.#n?.dispose(),this.#n=null,this.#o=!1,this.#c=null,this.#a?.reset(),this.#a=null,this.#m=0}get#O(){return!!this.#s?.quad.visible}#X(){this.#o=!0,this.#s?.quad.show(),this.#n?.quad.show(),this.#H(!0)}#H(e){let t=this.#a;t&&(e?(this.#c===null&&(this.#c=t.locked),t.locked=!0):this.#c!==null&&(t.locked=this.#c,this.#c=null))}#W(){!this.#l||this.#P?.prompt?.isStart||(this.#l=!1,this.#i?.quad.show())}#Z(e,t,r){let s=this.#i?.quad,n=this.#s.quad,a=this.#n?.quad,o=this.#O;a&&e&&(a.updatePosition(e),a.visible&&us(a,e,Ss,Ts));let l=n.placing;n.updatePosition(e),l&&this.#o&&e&&(this.#o=!1,us(n,e,ws,_s));let h=this.#U(t,r),c=(u,p)=>o?Ms(ui(u,!1)):ui(u,p);s?.handleInput(c(t,h.left===s),c(r,h.right===s),e),n.handleInput(Ms(ui(t,h.left===n)),Ms(ui(r,h.right===n)),e),this.#E?.update(t,r,[h.left?.hitSpheres[0]??null,h.right?.hitSpheres[1]??null],!!(s?.visible||n.visible))}#U(e,t){let r={left:null,right:null},s=this.#O?[this.#s.quad]:this.#V.filter(a=>a.visible);if(!s.length)return r;let n=s.find(a=>a.panelDragging||a.dragging);if(n)return{left:n,right:n};for(let[a,o]of[["left",e],["right",t]]){if(!o?.active||!o.rayTransform||o.held)continue;let l=o.rayTransform.position,h=o.rayTransform.orientation;this.#I.set(l.x,l.y,l.z),this.#z.set(0,0,-1).applyQuaternion(this.#D.set(h.x,h.y,h.z,h.w));let c=a==="left"?0:1,u=null,p=1/0;for(let d of s){if(!d.rayHitQuad(this.#I,this.#z,c))continue;let g=this.#I.distanceTo(d.hitSpheres[c].position);g<p&&(p=g,u=d)}r[a]=u}return r}#Y(e,t){let r=this.#i;r.onPlayPause=()=>{(e?.isBuffering??!1)||(e?.isPlaying?e.pause():e.play(),this.#L?.event?.("play_pause",{playing:!e?.isPlaying}))},r.onSeek=n=>{e?.seek?.(n*(e?.duration??0)),this.#L?.event?.("seek",{position:n})},r.onPresetCycle=()=>{let n=Et[(this.#b+1)%Et.length];this.#j(e,n,this.#_),this.#C?.(n),this.#L?.event?.("preset_cycle",{preset:n})},r.onExit=()=>{this.#L?.event?.("exit"),t?.end()},r.onClose=()=>{r.quad.hide()},r.onSceneNav=n=>{let a=this.#P;if(a){this.#L?.event?.("scene_nav",{dir:n}),n>0?a.stepForward():a.stepBack();return}if(!this.#w.length)return;let o=Math.max(0,Math.min(this.#w.length-1,this.#x+n));o!==this.#x&&(this.#x=o,this.#M=!0,this.#K(),this.#B?.(this.#w[this.#x],this.#x),this.#L?.event?.("scene_nav",{index:o,label:this.#w[o]?.label,dir:n}))},r.onSceneSelect=n=>{this.#L?.event?.("scene_select",{order:n}),this.#P?.goTo(n)},r.onSceneAction=n=>{this.#L?.event?.("scene_action",{order:n}),this.#P?.reopenFork(n)};let s=this.#s;s&&(s.onSelect=n=>{this.#L?.event?.("prompt_select",{order:n}),this.#P?.choose(n)},s.onDismiss=()=>{this.#L?.event?.("prompt_dismiss"),this.#P?.dismissPrompt()}),this.#r==="modern"&&(r.onMuteToggle=()=>{let n=this.#J(e);this.#L?.event?.("mute_toggle",{muted:!n})},r.onReset=()=>{this.#a?.resetToInitial(),this.#L?.event?.("reset")},r.onLockToggle=()=>{this.#y=!this.#y,this.#a&&(this.#a.locked=this.#y),this.#N?.(this.#y),this.#L?.event?.("lock_toggle",{locked:this.#y})},r.onAbLoopToggle=()=>{this.#T==="off"?this.#q(e):this.#$(e),this.#L?.event?.("ab_loop_toggle",{enabled:this.#T!=="off"})},r.onAbLoopSet=(n,a)=>{if(this.#T==="off")return;let o=e.duration;this.#Q(e,n*o,a*o),this.#T="active",this.#L?.event?.("ab_loop_set",e.playbackRange)},r.onScaleLockToggle=()=>{this.#v=!this.#v,this.#a&&(this.#a.scaleLocked=this.#v),this.#A?.(this.#v),this.#L?.event?.("scale_lock_toggle",{scaleLocked:this.#v})})}#q(e){let t=e?.duration??0;t<=0||(this.#Q(e,e.currentTime,t),this.#T="setB")}#Q(e,t,r){let s=e.duration,n=ua(s),a=_.clamp(t,0,s-n);e.setPlaybackRange(a,_.clamp(r,a+n,s))}#$(e){e?.clearPlaybackRange(),this.#T="off"}#K(){this.#y=this.#w[this.#x]?.locked??this.#y,this.#v=this.#w[this.#x]?.scaleLocked??this.#v}#J(e){let t=!(e?.audioEnabled??!1);return t?e?.enableAudio?.():e?.disableAudio?.(),t}#j(e,t,r=1){let s=Et.indexOf(t);if(s<0)return;this.#b=s,this.#S=Ps(t);let n=Ht[t];n?e?.setEnvLighting(We(n),r):e?.clearEnvLighting()}#ee(e){!this.#M||!e.duration||(this.#M=!1,this.#T="off",this.#y=this.#w[this.#x]?.locked??this.#y,this.#v=this.#w[this.#x]?.scaleLocked??this.#v)}#te(e,t){let r=!(t?.audioEnabled??!1);if(this.#M)this.#i?.update({loading:!0,muted:r,locked:this.#y,scaleLocked:this.#v,sceneText:this.#w.length?`${this.#x+1}/${this.#w.length}`:"1/1",sceneLabel:(this.#w[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#R,scenario:this.#P});else{let s=t?.isBuffering??!1,n=t?.duration??0;n>0&&(this.#g=n);let a=this.#g,o=t?.currentTime??0,l=p=>p/(a||1),h=_.clamp01(l(o)),{start:c,end:u}=t.playbackRange;this.#i?.update({loading:!1,playing:t?.isPlaying??!1,spinning:s,buffering:s,progress:h,timeText:`${ha(o)} / ${ha(a)}`,presetName:this.#S,muted:r,locked:this.#y,scaleLocked:this.#v,abLoop:{phase:this.#T,start:l(c),end:l(u),gap:l(ua(a))},sceneText:this.#w.length?`${this.#x+1}/${this.#w.length}`:"1/1",sceneLabel:(this.#w[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#R,scenario:this.#P})}this.#s?.update({prompt:this.#P?.prompt??null,secondsLeft:this.#P?.secondsLeft??null,timeoutSec:this.#P?.choiceTimeoutSec??1}),this.#re(e)}#re(e){if(this.#O)return;if(this.#m>0){this.#m-=e;return}let t=this.#a?.leftHand.microSwipe||this.#a?.rightHand.microSwipe;t&&(this.#m=.45,this.#i?.onSceneNav(t))}};import{useState as dh}from"react";import*as fh from"three";function Ls(){let[i]=dh(()=>new mt(fh));return i}import{useEffect as pa,useRef as mh,useState as gh}from"react";function Cs(i,e,t){let[r,s]=gh(!1);pa(()=>{let o=i.current;if(!o)return;let l=()=>s(!0),h=c=>{c.touches.length>1&&l()};return o.addEventListener("pointerdown",l),o.addEventListener("wheel",l),o.addEventListener("touchmove",h),()=>{o.removeEventListener("pointerdown",l),o.removeEventListener("wheel",l),o.removeEventListener("touchmove",h)}},[i]);let n=mh(e);return pa(()=>{n.current!==e&&(n.current=e,s(!1))},[e]),{hasInteracted:r,resetView:()=>{t.reset(),s(!1)}}}import{useEffect as yh,useState as xh}from"react";var bh=500;function Es(i,e=bh){let[t,r]=xh(!1);return yh(()=>{if(!i){r(!1);return}let s=setTimeout(()=>r(!0),e);return()=>clearTimeout(s)},[i,e]),i&&t}import{useEffect as vh,useRef as wh,useState as _h}from"react";var Sh=2e3;function Rs({coreError:i,interactionError:e,isSceneReady:t,currentSource:r,open:s,clearError:n}){let[a,o]=_h(null),l=wh(new WeakMap);e?.phase&&l.current.set(e.error,e.phase);let h=i&&e?.error===i?e.phase:i?l.current.get(i):void 0,c=i?{error:i,phase:h}:e,u=c?ao(c.error,t,c.phase):null,p=u?.presentation==="blocking",d=u?.presentation==="toast"&&u.cause!==a?u:null,g=d?.cause??null;return vh(()=>{if(!g)return;let y=setTimeout(()=>{o(g),n()},Sh);return()=>clearTimeout(y)},[g,n]),{playerError:u,isBlocking:!!p,toast:d,retry:()=>r?s(r):window.location.reload(),dismiss:()=>{d&&o(d.cause),n()}}}import{useCallback as Th,useEffect as Mh,useState as Ph}from"react";function ks(i,e){let[t,r]=Ph(!1),s=Th(async()=>{let n=i.current;if(!(!n||typeof document>"u"))try{document.fullscreenElement===n?await document.exitFullscreen():await n.requestFullscreen()}catch(a){e(Oe(a),{phase:"fullscreen"})}},[e,i]);return Mh(()=>{if(typeof document>"u")return;let n=()=>r(document.fullscreenElement===i.current);return n(),document.addEventListener("fullscreenchange",n),()=>document.removeEventListener("fullscreenchange",n)},[i]),{isFullscreen:t,toggleFullscreen:s}}import{useRef as Lh}from"react";function da(i){let e=rs(i.name);return{url:`${Zr}${i.name}`,label:i.name,file:i,...e?{type:io}:{}}}async function Ch(i){return rs(i.name)?da(await i.getFile()):{url:`${Zr}${i.name}`,label:i.name,localFile:i}}function Eh(){return typeof window>"u"?null:window.showOpenFilePicker??null}function Rh(i){return i instanceof DOMException&&i.name==="AbortError"}function kh(i){let e=i.currentTarget.files?.[0];return i.currentTarget.value="",e?da(e):null}function As({localFiles:i,logger:e,reportError:t,playlist:r,clearError:s}){let n=Lh(null),a=!!i,o=c=>{s();let u=[...r.sources,c];r.setSources(u),r.goTo(u.length-1),e.event?.("local_file_open",{label:oe(c)})};return{enabled:a,fileInputProps:{ref:n,accept:to,onChange:c=>{let u=kh(c);u&&o(u)}},localLabel:ro,openLocalFile:async()=>{if(!a)return;let c=Eh();if(!c){n.current?.click();return}try{let p=(await c({types:[{description:"Volumetric video",accept:{"application/octet-stream":[...ts]}}]}))[0];p&&o(await Ch(p))}catch(u){Rh(u)||t(Oe(u),{phase:"local-file"})}}}}import{useRef as Is}from"react";function Fs(i){let{containerRef:e,muted:t=!1,moduleFactory:r,overlay:s,boundaryRenderer:n,eventLogger:a,onReady:o,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:u,onSceneEnd:p}=i,d=Is({onReady:o,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:u});d.current={onReady:o,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:u};let g=Is(null),f=Is(!1),m=Hr({containerRef:e,moduleFactory:r,moduleUrl:r?void 0:no(),overlay:s,boundaryRenderer:n,eventLogger:a,onReady(){f.current||(f.current=!0,t||g.current?.app?.enableAudio()),d.current.onReady?.()},onProgress:b=>d.current.onProgress?.(b),onModeChange:(b,S)=>d.current.onModeChange?.(b,S),onXRStart:()=>d.current.onXRStart?.(),onXREnd:()=>d.current.onXREnd?.()});g.current=m;let y=Vr(m,{onSceneEnd:p});return{gracia:m,playlist:y}}import{useCallback as Os,useMemo as fa,useState as Ah}from"react";function Ih(i){switch(i){case"init":case"load":case"xr":case"streaming":case"scenario":case"fullscreen":case"local-file":return i;default:return}}function Bs(i,e){let[t,r]=Ah(null),s=fa(()=>wo(i,e),[i,e]),n=Os((h,c)=>{r({error:h,phase:Ih(c?.phase)})},[]),a=fa(()=>({event:(h,c)=>s.event?.(h,c),error:(h,c)=>{n(h,c),s.error?.(h,c)}}),[s,n]),o=Os((h,c)=>{n(h,c),s.error?.(h,c)},[s,n]),l=Os(()=>r(null),[]);return{interactionError:t,logger:a,reportError:o,clearError:l}}import{useEffect as ga,useRef as Wh}from"react";import{useEffect as Fh,useRef as Oh}from"react";function Gs({isInitialized:i,sources:e,streaming:t,scenario:r,playlist:s,reportError:n}){let a=Oh(n);a.current=n,Fh(()=>{if(!i)return;let o=!1,l=h=>{if(o||h.length===0)return;let c=qt(h,r),u=c.isBranching?po(c):[];if(u.length){a.current(new Error(`Invalid scenario: ${u.join("; ")}`),{phase:"scenario"});return}let p=mo(h,r);s.setSources(p);let d=go(p,r);d!==null&&s.goTo(d)};if(t?.length)return pt(t,oo()).then(h=>l(co(h,t))).catch(h=>{o||a.current(Oe(h),{phase:"streaming"})}),()=>{o=!0};l(e)},[i,e,t,r,s.setSources,s.goTo])}import{useCallback as ke,useEffect as sr,useMemo as pi,useRef as di,useState as Ns}from"react";var zs=15,Bh=.3;function Ds({playlist:i,pack:e,timeLeft:t,onFork:r,onHold:s,onChoose:n,onDismiss:a}){let{sources:o,index:l,goTo:h}=i,c=pi(()=>qt(o,e),[o,e]),u=c?.order??[],p=l>=0?u[l]??l:-1,d=ke(L=>h(u.indexOf(L)),[h,u]),[g,f]=Ns([-1]),[m,y]=Ns(null),[b,S]=Ns(null);sr(()=>{f([-1]),y(null)},[o]);let w=di(m);w.current=m;let T=di(a);T.current=a;let M=di(s);M.current=s,sr(()=>{l<0||!c||(f(L=>{let{scenes:U,openFork:N}=Zt(c,L);return U.includes(p)?L:N!==null&&we(c,N).next.includes(p)?L.includes(N)?[...L,p]:[...L,N,p]:is(c,-1,p)??[-1,p]}),w.current&&(y(null),T.current?.()))},[l,p,c]);let O=ke(L=>{let U=o[u.indexOf(L)];return(c?we(c,L)?.scenarioName:void 0)||(U?oe(U):`Scene ${L+1}`)},[c,o,u]),P=ke((L,U=!1)=>{let N=c?we(c,L):void 0;if(!c||!N||N.next.length<2)return;let le=Je(c,g,L);y({from:L,...N.modalTitle&&{title:N.modalTitle},options:fo(c,L,O),...le!==void 0&&{selected:le},...U&&{isReopened:!0}}),r?.(L,U)},[c,g,O,r]),X=ke(L=>P(L,!0),[P]),x=ke(()=>{y(null),a?.()},[a]),E=ke(L=>{let U=c?we(c,L)?.next:void 0;if(!c||!U?.length)return;if(U.length===1){d(U[0]);return}let N=Je(c,g,L);if(N!==void 0){d(N);return}M.current?.(),w.current?.from!==L&&P(L)},[c,g,d,P]),A=ke(L=>{c?.isBranching&&E(c.order[L]??L)},[c,E]),C=ke((L,U=!1)=>{let N=m?.from;N!==void 0&&(U||n?.(N,L,c?we(c,L)?.scenarioName:void 0),f(le=>{let ur=le.indexOf(N);if(ur>=0)return[...le.slice(0,ur+1),L];if(!c)return[...le,N,L];let{scenes:wi}=Zt(c,le);return wi.includes(N)?le[le.length-1]===N?[...le,L]:[...le,N,L]:[...is(c,-1,N)??[-1,N],L]})),y(null),d(L)},[m,c,d,n]);sr(()=>{!c||l<0||w.current||t===void 0||t>Bh||Je(c,g,p)===void 0&&P(p)},[c,l,p,g,t,P]),sr(()=>{!c||l>=0||w.current||Zt(c,g).openFork===-1&&P(-1)},[c,l,g,P]);let H=di(C);H.current=C,sr(()=>{if(!m||m.isReopened){S(null);return}S(zs);let L=setInterval(()=>S(N=>N===null?null:Math.max(0,N-1)),1e3),U=setTimeout(()=>H.current(m.options[0].order,!0),zs*1e3);return()=>{clearInterval(L),clearTimeout(U)}},[m]);let He=pi(()=>c?yo(c,g,p,m?.from).map(L=>{if(L.isFork)return{...L,question:we(c,L.forkFrom)?.modalTitle,answer:L.taken===void 0?void 0:O(L.taken)};let U=o[c.order.indexOf(L.order)];return L.order===void 0||!U?L:{...L,title:oe(U)}}):[],[c,g,p,m?.from,O,o]),Ie=pi(()=>c?Zt(c,g):null,[c,g]),bi=pi(()=>m&&{...m,isStart:m.from===-1},[m]),hr=ke(()=>{let L=Ie?.scenes.indexOf(p)??-1;Ie&&L>0&&d(Ie.scenes[L-1])},[Ie,p,d]),vi=ke(()=>{w.current||E(p)},[E,p]);return{isInteractive:!!c?.isBranching,chips:He,prompt:bi,secondsLeft:b,choiceTimeoutSec:zs,stepBack:hr,stepForward:vi,choose:C,reopenFork:X,dismissPrompt:x,goTo:d,handleSceneEnd:A}}import{useEffect as Gh,useRef as ma}from"react";function Xs({currentSource:i,index:e,onSceneChange:t}){let r=ma(t);r.current=t;let s=ma(null);Gh(()=>{if(!i||e<0)return;let n=`${e}:${oe(i)}`;s.current!==n&&(s.current=n,r.current?.(i,e))},[i,e])}import{useEffect as Nh,useState as zh}from"react";var Dh=500;function Hs(i,e,t){let[r,s]=zh(!1),n=dt(i.mode)?i.mode:null;Nh(()=>{(!n||!i.xr.isActive)&&s(!1)},[n,i.xr.isActive]);let a=c=>{t(),s(!0),i.xr.setMode(c).catch(u=>{s(!1),e(Oe(u),{phase:"xr",target:c})})},o=()=>{s(!1),i.xr.setMode(ve.PW).catch(c=>{e(Oe(c),{phase:"xr",target:ve.PW})})},h=Es(r&&!i.error,Dh)&&i.xr.isActive?n:null;return{enter:a,exit:o,activeScreenMode:h}}import{useRef as Xh}from"react";import*as Hh from"three";function Vh(i){if(i===!1)return null;let{uiStyle:e="modern",bannerText:t="EARLY BETA"}=i??{};try{let r=new Rt(Hh,{uiStyle:e});return r.bannerText=t,r}catch{return null}}function Vs(i){let e=Xh(void 0);return e.current===void 0&&(e.current=Vh(i)),e.current}function Ws(i,e){let{sources:t=[],streaming:r,scenario:s,muted:n=!1,cameraControls:a=!1,sceneSelector:o,moduleFactory:l,onReady:h,onProgress:c,onModeChange:u,onXRStart:p,onXREnd:d,onSceneChange:g,onError:f,eventLogger:m,localFiles:y,xrOverlay:b}=i,S=Vs(b),w=Ls(),{interactionError:T,logger:M,reportError:O,clearError:P}=Bs(m,f);ga(()=>{jr()},[]);let X=Wh(()=>{}),{gracia:x,playlist:E}=Fs({containerRef:e.container,muted:n,moduleFactory:l,overlay:S,boundaryRenderer:w,eventLogger:M,onReady:h,onProgress:c,onModeChange:u,onXRStart:p,onXREnd:d,onSceneEnd:(pr,nt)=>X.current(nt)});Gs({isInitialized:x.isInitialized,sources:t,streaming:r,scenario:s,playlist:E,reportError:O});let A=x.isContentReady&&!x.isLoading,{playback:C}=x,H=Ds({playlist:E,pack:s,timeLeft:A&&C.duration>0?C.duration-C.currentTime:void 0,onFork:(pr,nt)=>{nt&&C.pause(),M.event?.("scenario_prompt",{from:pr,reopened:nt})},onHold:()=>{C.pause(),x.app?.player?.seek(C.duration)},onChoose:(pr,nt,Na)=>M.event?.("scenario_choose",{from:pr,to:nt,scenarioName:Na}),onDismiss:()=>C.play()});X.current=H.handleSceneEnd,ga(()=>{S&&(S.scenario=H.isInteractive?H:null)}),Xs({currentSource:E.currentSource,index:E.index,onSceneChange:g});let{fileInputProps:He,enabled:Ie,localLabel:bi,openLocalFile:hr}=As({localFiles:y,logger:M,reportError:O,playlist:E,clearError:P}),{isFullscreen:vi,toggleFullscreen:L}=ks(e.root,O),{playerError:U,isBlocking:N,toast:le,retry:ur,dismiss:wi}=Rs({coreError:x.error,interactionError:T,isSceneReady:A,currentSource:E.currentSource,open:x.open,clearError:P}),Ga=!U&&!H.prompt&&(!x.isInitialized||!A),_i=Hs(x,O,P);return{contextValue:{gracia:x,playlist:E,scenario:H,config:{sceneSelector:o,cameraControls:a},refs:e,presentation:{isBusy:Ga,isSceneReady:A,isBlocking:N,playerError:U,toast:le,retry:ur,dismiss:wi},shell:{isFullscreen:vi,toggleFullscreen:L,localFilesEnabled:Ie,fileInputProps:He,openLocalFile:hr,localLabel:bi},xr:{enter:_i.enter,exit:_i.exit,activeScreenMode:N?null:_i.activeScreenMode}},gracia:x,playlist:E,openLocalFile:hr,toggleFullscreen:L}}import{useEffect as ya,useRef as xa,useState as Uh}from"react";import{jsx as ne,jsxs as nr}from"react/jsx-runtime";var Yh=i=>{let e=t=>{let r=i.sources[t];return String(r.id??r.url??t)};return{segments:i.sources.map((t,r)=>({key:e(r),isActive:r===i.index})),rows:i.sources.map((t,r)=>({key:e(r),marker:Ye(t)?ne(Ue,{}):r+1,title:oe(t),isActive:r===i.index,select:()=>i.goTo(r)})),hasPrev:i.hasPrev,hasNext:i.hasNext,prev:i.prev,next:i.next}},qh=i=>{let e=i.chips.filter(o=>o.order!==void 0||o.isFork),t=e.findIndex(o=>o.isActive),s=e.some(o=>o.isFork&&o.taken===void 0)?i.chips:e,n=0,a=s.map((o,l)=>o.isFork?{key:`fork-${o.forkFrom}`,marker:ne(Jn,{}),title:o.question||"Choose what happens next",detail:o.branchNumber===void 0?"Not chosen":String(o.branchNumber),hint:o.answer,isActive:!!o.isOpen,select:()=>i.reopenFork(o.forkFrom)}:(n+=1,o.order===void 0?{key:`blank-${l}`,marker:n,title:"\u2013",isActive:!1,isBlank:!0,select:()=>{}}:{key:String(o.order),marker:o.label,title:o.title??`Scene ${o.label}`,isActive:!!o.isActive,select:()=>i.goTo(o.order)}));return{segments:s.map((o,l)=>({key:o.order===void 0?`blank-${l}`:String(o.order),isActive:!!o.isActive,isBlank:o.order===void 0,isFork:o.isFork})).filter(o=>!o.isFork),rows:a,hasPrev:t>0&&e.slice(0,t).some(o=>o.order!==void 0),hasNext:t>=0&&t<e.length-1,prev:i.stepBack,next:i.stepForward}},Us=()=>{let{playlist:i,scenario:e}=V(),t=xa(null),r=xa(i.index),[s,n]=Uh(!1),a=i.currentSource,o=a?oe(a):"Select scene",l=i.total>1,h=e.isInteractive?qh(e):Yh(i);return ya(()=>{r.current!==i.index&&(r.current=i.index,n(!1))},[i.index]),ya(()=>{if(!s)return;let c=u=>{t.current&&!t.current.contains(u.target)&&n(!1)};return document.addEventListener("click",c),()=>document.removeEventListener("click",c)},[s]),nr("div",{ref:t,className:"gr-player__scene",children:[nr("div",{className:"gr-player__scene-inner",children:[nr("button",{className:"gr-player__scene-main",type:"button",disabled:!l,onClick:()=>n(!s),"aria-haspopup":"menu","aria-expanded":s,children:[ne($n,{}),nr("span",{className:"gr-player__scene-main-copy",children:[ne("span",{className:"gr-player__scene-copy",children:ne("span",{className:"gr-player__scene-label",children:o})}),l&&ne("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:h.segments.map(c=>ne("span",{className:te("gr-player__scene-segment",c.isActive&&"is-active",c.isBlank&&"gr-player__scene-segment--blank")},c.key))})]})]}),ne("button",{className:"gr-player__scene-nav",type:"button",disabled:!h.hasPrev,onClick:()=>h.prev(),"aria-label":"Previous scene",children:ne(Yr,{})}),ne("button",{className:"gr-player__scene-nav",type:"button",disabled:!h.hasNext,onClick:()=>h.next(),"aria-label":"Next scene",children:ne(qr,{})})]}),s&&l&&ne("div",{className:"gr-player__scene-menu",children:h.rows.map(c=>nr("button",{type:"button",className:te("gr-player__scene-item",c.isActive&&"is-active"),disabled:c.isBlank,title:c.hint,"aria-label":c.isBlank?`Scene ${c.marker}, not reached yet`:void 0,onClick:()=>{c.select(),n(!1)},children:[ne("span",{children:c.marker}),ne("strong",{children:c.title}),c.detail&&ne("small",{children:c.detail})]},c.key))})]})};import{jsx as Te,jsxs as Ys}from"react/jsx-runtime";var ba=()=>{let{playlist:i}=V(),e=i.currentSource,t=Ye(e);return Te("div",{className:"gr-player__scene gr-player__scene--stepper",children:Ys("div",{className:"gr-player__scene-inner",children:[Te("button",{className:"gr-player__scene-nav",type:"button",disabled:!i.hasPrev,onClick:()=>i.prev(),"aria-label":"Previous scene",children:Te(Yr,{})}),Te("div",{className:"gr-player__scene-main",children:Ys("span",{className:"gr-player__scene-main-copy",children:[t&&e?Ys("span",{className:"gr-player__scene-count gr-player__scene-count--local",children:[Te(Ue,{}),Te("span",{className:"gr-player__scene-label",children:oe(e)})]}):Te("span",{className:"gr-player__scene-count",children:i.index>=0?`${i.index+1} of ${i.total}`:`${i.total} scenes`}),Te("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:i.sources.map((r,s)=>Te("span",{className:te("gr-player__scene-segment",s===i.index&&"is-active",Ye(r)&&"gr-player__scene-segment--local")},r.id??r.url??s))})]})}),Te("button",{className:"gr-player__scene-nav",type:"button",disabled:!i.hasNext,onClick:()=>i.next(),"aria-label":"Next scene",children:Te(qr,{})})]})})};import{useEffect as Zh,useRef as jh}from"react";import{jsx as or}from"react/jsx-runtime";var va=()=>{let{playlist:i}=V(),e=jh(null),t=i.index;return Zh(()=>{e.current?.querySelector(`.gr-player__scene-tab[data-scene-index="${t}"]`)?.scrollIntoView({block:"nearest",inline:"nearest"})},[t]),or("div",{className:"gr-player__scene",children:or("div",{className:"gr-player__scene-inner",children:or("div",{ref:e,className:"gr-player__scene-tabs-scroll",children:i.sources.map((r,s)=>or("button",{type:"button","data-scene-index":s,className:te("gr-player__scene-tab",s===i.index&&"is-active",Ye(r)&&"gr-player__scene-tab--local"),onClick:()=>i.goTo(s),"aria-label":`Open ${oe(r)}`,"aria-current":s===i.index?"true":void 0,children:Ye(r)?or(Ue,{}):s+1},r.id??r.url??s))})})})};import{jsx as $h}from"react/jsx-runtime";var Qh={tabs:va,stepper:ba,menu:Us},fi=()=>{let{config:i,scenario:e}=V(),{sceneSelector:t=so}=i,r=e.isInteractive?Us:Qh[t];return $h(r,{})};import{useRef as wa,useState as Kh}from"react";import{jsx as mi,jsxs as Jh}from"react/jsx-runtime";var qs=({progress:i,duration:e,onSeek:t,disabled:r=!1})=>{let s=wa(null),n=wa(!1),[a,o]=Kh(0),l=u=>{if(!s.current)return 0;let p=s.current.getBoundingClientRect();return Math.min(1,Math.max(0,(u.clientX-p.left)/p.width))},h=u=>{e>0&&t(l(u)*e)},c=r?void 0:{onPointerDown(u){n.current=!0,u.currentTarget.setPointerCapture(u.pointerId),h(u)},onPointerMove(u){o(l(u)),n.current&&h(u)},onPointerLeave(){o(0)},onPointerUp(u){n.current=!1,u.currentTarget.releasePointerCapture(u.pointerId)},onPointerCancel(){n.current=!1}};return mi("div",{className:"gr-player__seek-shell","aria-disabled":r||void 0,children:Jh("div",{ref:s,className:"gr-player__seek",role:"slider","aria-valuemin":0,"aria-valuemax":Math.max(e,0),"aria-valuenow":Math.round(i*Math.max(e,0)),"aria-disabled":r||void 0,tabIndex:r?-1:0,...c,children:[mi("span",{className:"gr-player__seek-fill",style:{width:`${i*100}%`}}),mi("span",{className:"gr-player__seek-hover",style:{width:`${a*100}%`}}),mi("span",{className:"gr-player__seek-thumb",style:{left:`${i*100}%`}})]})})};import{jsx as Ae,jsxs as _a}from"react/jsx-runtime";function eu(i,e){return e>0?Math.min(1,Math.max(0,i/e)):0}var Sa=()=>{let{gracia:i,playlist:e,presentation:t,shell:r}=V(),{isSceneReady:s}=t,{isFullscreen:n,toggleFullscreen:a}=r,{playback:o}=i,l=eu(o.currentTime,o.duration);return _a("div",{className:"gr-player__controls",children:[Ae(ge,{className:"gr-player__button--play",onClick:s?()=>o.togglePlay():void 0,"aria-label":o.isPlaying?"Pause":"Play","aria-disabled":!s||void 0,children:o.isPlaying?Ae(Yn,{}):Ae(Un,{})}),Ae(fi,{}),e.hasAudio&&Ae(qe,{className:"gr-player__mute",onClick:s?()=>o.toggleMute():void 0,"aria-label":o.isMuted?"Unmute":"Mute","aria-disabled":!s||void 0,children:o.isMuted?Ae(qn,{}):Ae(Zn,{})}),Ae(qs,{progress:l,duration:o.duration,onSeek:h=>o.seek(h),disabled:!s}),_a("div",{className:"gr-player__time",children:[ns(o.currentTime)," / ",ns(o.duration)]}),Ae(qe,{variant:["icon","secondary"],className:"gr-player__fullscreen",onClick:a,"aria-label":n?"Exit fullscreen":"Enter fullscreen","aria-pressed":n,title:n?"Exit fullscreen":"Enter fullscreen",children:Ae(Kn,{active:n})})]})};import{useEffect as Ta,useRef as tu,useState as ru}from"react";import{jsx as ar,jsxs as Zs}from"react/jsx-runtime";var Ma=()=>{let{gracia:i,config:e,presentation:t}=V(),{isSceneReady:r,isBlocking:s}=t,[n,a]=ru(!1),o=tu(null),l=e.cameraControls&&r&&!s&&!dt(i.mode);if(Ta(()=>{l||a(!1)},[l]),Ta(()=>{if(!n)return;let u=d=>{o.current?.contains(d.target)||a(!1)},p=d=>{d.code==="Escape"&&a(!1)};return document.addEventListener("pointerdown",u),document.addEventListener("keydown",p),()=>{document.removeEventListener("pointerdown",u),document.removeEventListener("keydown",p)}},[n]),!l)return null;let{controlsType:h,setControls:c}=i.camera;return Zs("div",{ref:o,className:"gr-player__camera-control",children:[ar(qe,{className:"gr-player__button--camera",onClick:()=>a(u=>!u),"aria-label":"Camera controls","aria-expanded":n,title:"Camera controls",srLabel:"Camera controls",children:ar(jn,{})}),n&&Zs("div",{className:"gr-player__camera-panel",role:"menu","aria-label":"Camera controls",children:[ar("div",{className:"gr-player__camera-title",children:"Camera"}),eo.map(u=>Zs("button",{className:te("gr-player__camera-option",u.type===h&&"is-active"),type:"button",role:"menuitemradio","aria-checked":u.type===h,onClick:()=>c(u.type),children:[ar("span",{className:"gr-player__camera-label",children:u.label}),ar("span",{className:"gr-player__camera-hint",children:u.hint})]},u.type))]})]})};import{jsx as lr,jsxs as su}from"react/jsx-runtime";var js=({className:i})=>{let{gracia:e,presentation:t,xr:r}=V(),{isSceneReady:s,isBlocking:n}=t,{enter:a}=r;if(n)return null;let o=e.xr.arSupported?ve.AR:e.xr.vrSupported?ve.VR:null;if(!o)return null;let l=o===ve.AR;return lr("div",{className:["gr-player__xr-actions",i].filter(Boolean).join(" "),children:lr(iu,{active:e.mode===o,disabled:!s,icon:l?lr(Ur,{}):lr(Wr,{}),label:l?"View in AR":"Play in VR",mode:o,onEnter:a})})},iu=({active:i,disabled:e,icon:t,label:r,mode:s,onEnter:n})=>su(ge,{className:"gr-player__button--xr",onClick:e?void 0:()=>n(s),"aria-disabled":e||void 0,"aria-pressed":i||void 0,title:r,children:[lr("span",{children:r}),t]});import{jsx as kt,jsxs as Qs}from"react/jsx-runtime";var Pa=()=>{let{gracia:i,playlist:e,refs:t,presentation:r,shell:s}=V(),{isBlocking:n}=r,{localFilesEnabled:a,openLocalFile:o,localLabel:l}=s,{hasInteracted:h,resetView:c}=Cs(t.container,e.index,i.camera);return Qs("div",{className:"gr-player__top",children:[Qs("div",{className:"gr-player__top-left",children:[a&&kt(qe,{className:"gr-player__button--local",onClick:o,"aria-label":l,title:l,srLabel:"Open local file",children:kt(Ue,{})}),kt(js,{className:"gr-player__xr-actions--desktop"})]}),Qs("div",{className:"gr-player__top-right",children:[kt(Ma,{}),kt(js,{className:"gr-player__xr-actions--mobile"}),!n&&h&&kt(ge,{variant:"secondary",className:"gr-player__reset",onClick:c,children:"Reset View"})]})]})};import{jsx as $s,jsxs as La}from"react/jsx-runtime";var gi=()=>{let{presentation:i}=V(),{isBlocking:e,toast:t}=i;return La("div",{className:"gr-player__overlay",children:[$s(Pa,{}),!e&&La("div",{className:"gr-player__bottom",children:[t&&$s(os,{message:t.title}),$s(Sa,{})]})]})};import{jsx as st}from"react/jsx-runtime";var Ca=({onExit:i})=>st(ge,{className:"gr-player__xr-exit",onClick:i,children:"Back to 2D"}),Ea=({onExit:i})=>st(ft,{icon:st(Ur,{}),title:"Running in AR",body:"View the scene in AR mode on your device",action:st(Ca,{onExit:i}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),Ra=({onExit:i})=>st(ft,{icon:st(Wr,{}),title:"Running in VR",body:"Put on your VR-headset and explore the scene",action:st(Ca,{onExit:i}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),Ks={ar:Ea,vr:Ra};import{Fragment as nu,jsx as At,jsxs as ou}from"react/jsx-runtime";var Js=()=>{let{gracia:i,presentation:e,xr:t}=V(),{isBusy:r,isBlocking:s,playerError:n}=e,{retry:a}=e,{activeScreenMode:o,exit:l}=t,h=o?Ks[o]:null;return ou(nu,{children:[r&&At(ls,{}),s&&n&&At(as,{title:n.title,body:n.body,detail:n.cause.message,action:n.recoverable?At(ge,{className:"gr-player__state-action",onClick:a,children:"Try again"}):void 0}),h&&At(h,{onExit:l}),!r&&i.isRebuffering&&At("div",{className:"gr-player__rebuffer-spinner",children:At("div",{className:"gr-player__spinner"})})]})};import{useId as lu}from"react";var ka='data:image/svg+xml,<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<g id="Frame 2087329768">%0A<path id="Vector" d="M3.58369 22L2 20.4163L10.4163 12L2 3.58369L3.58369 2L12 10.4163L20.4163 2L22 3.58369L13.5837 12L22 20.4163L20.4163 22L12 13.5837L3.58369 22Z" fill="%23E9F2FF" fill-opacity="0.3" style="fill:%23E9F2FF;fill:color(display-p3 0.9137 0.9490 1.0000);fill-opacity:0.3;"/>%0A</g>%0A</svg>%0A';import{jsx as It,jsxs as en}from"react/jsx-runtime";var tn=()=>{let{gracia:i,scenario:e}=V(),{prompt:t,secondsLeft:r,choiceTimeoutSec:s,choose:n,dismissPrompt:a}=e,o=lu();return!t||dt(i.mode)?null:It("div",{className:"gr-player__prompt",children:en("div",{className:"gr-player__prompt-panel",role:"dialog","aria-modal":"true","aria-labelledby":o,children:[en("div",{className:"gr-player__prompt-head",children:[It("h2",{id:o,className:"gr-player__prompt-title",children:t.title||"Choose what happens next"}),t.isReopened&&It("button",{type:"button",className:"gr-player__prompt-close",onClick:a,"aria-label":"Close",children:It("img",{src:ka,width:"24",height:"24",alt:""})})]}),en("div",{className:"gr-player__prompt-options",children:[r!==null&&It("div",{className:"gr-player__prompt-countdown",style:{width:`${r/s*100}%`},"aria-hidden":"true"}),t.options.map(l=>It("button",{type:"button",className:te("gr-player__prompt-option",l.order===t.selected&&"is-selected"),onClick:()=>n(l.order),children:l.label},l.order))]})]})})};import{jsx as Ft,jsxs as pu}from"react/jsx-runtime";var uu=[],cr=cu(function(e,t){let{controls:r=!0,className:s,style:n,children:a,sources:o=uu,...l}=e,h=Aa(null),c=Aa(null),{contextValue:u,gracia:p,playlist:d,openLocalFile:g,toggleFullscreen:f}=Ws({...l,sources:o},{root:h,container:c}),{presentation:m,shell:y}=u,{isBusy:b}=m,{isFullscreen:S}=y;return hu(t,()=>({gracia:p,playlist:d,get cameraControlsType(){return p.camera.controlsType},play:()=>p.playback.play(),pause:()=>p.playback.pause(),seek:w=>p.playback.seek(w),open:w=>p.open(typeof w=="string"?{url:w,label:"Scene"}:w),close:()=>p.close(),next:()=>d.next(),prev:()=>d.prev(),goTo:w=>d.goTo(w),resetCamera:()=>p.camera.reset(),setCameraControls:w=>p.camera.setControls(w),setMode:w=>p.xr.setMode(w),toggleFullscreen:f,openLocalFile:g}),[p,g,d,f]),Ft(cs,{value:u,children:pu("section",{ref:h,className:te("gr-player",s,{"gr-player--loading":b,"gr-player--ready":p.isContentReady,"gr-player--scenes-single":d.total<=1,"gr-player--scenes-multiple":d.total>1,"gr-player--fullscreen":S,"gr-player--error":m.isBlocking}),style:n,children:[Ft("div",{ref:c,className:"gr-player__canvas"}),Ft("input",{className:"gr-player__file-input",type:"file",...y.fileInputProps}),Ft(Js,{}),r&&Ft(gi,{}),Ft(tn,{}),typeof a=="function"?a({gracia:p,playlist:d}):a]})})});import{createRef as du}from"react";import{flushSync as fu}from"react-dom";import{createRoot as mu}from"react-dom/client";import{jsx as gu}from"react/jsx-runtime";function Ia(i,e){let t=du(),r=mu(i),s=e,n=!0,a=()=>{fu(()=>{r.render(gu(cr,{...s,ref:t}))})};return a(),{get player(){return t.current},update(o){n&&(s=o,a())},unmount(){n&&(n=!1,t.current?.close(),r.unmount())},async openLocalFile(){await t.current?.openLocalFile()}}}import{Box3 as yu,BufferGeometry as xu,Float32BufferAttribute as bu,Matrix4 as vu,Mesh as wu,MeshBasicMaterial as _u,Sphere as Su,Vector2 as Tu,Vector3 as Fa}from"three";var yi=class extends wu{#e;#t=null;#r=new Tu;#i=!1;#s=new vu;enableMesh=!1;constructor(e){let t=new xu;t.setAttribute("position",new bu([0,0,0],3)),super(t,new _u({colorWrite:!1,depthWrite:!1,transparent:!0})),this.#e=e,this.frustumCulled=!1,this.castShadow=!0,this.renderOrder=1/0,this.onBeforeRender=this.#o,this.onBeforeShadow=this.#n}get player(){return this.#e}async setAudio(e){await this.#e.loadAudio(e)}setAudioListener(e){this.#t=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}dispose(){this.#e.close(),this.#e.dispose(),this.geometry.dispose(),this.material.dispose()}#n=(e,t,r,s)=>{this.enableMesh&&this.#c(e,s)};#o=(e,t,r)=>{e.getDrawingBufferSize(this.#r);let s=this.#r.x,n=this.#r.y;if(s===0||n===0)return;this.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let a=r.matrixWorld.elements;this.#t||this.#e.setAudioListenerMatrix(a),this.#e.setAudioSourceMatrix(this.matrixWorld.elements),this.#e.renderHybridViewport(s,n,{enableMesh:this.enableMesh}),e.resetState(),!this.#i&&this.#e.isReady&&this.#l()};#c(e,t){let r=e.getContext(),s=r.getParameter(r.VIEWPORT),n=s[2],a=s[3];n===0||a===0||(this.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),this.#s.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.#s.multiply(this.matrixWorld),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.depthMask(!0),this.#e.renderMesh(this.#s.elements,s[0],s[1],n,a),e.resetState())}#l(){let e=this.#e.getBBox();if(!e)return;let t=new yu(new Fa(e.minX,e.minY,e.minZ),new Fa(e.maxX,e.maxY,e.maxZ));this.geometry.boundingBox=t,this.geometry.boundingSphere=new Su,t.getBoundingSphere(this.geometry.boundingSphere),this.frustumCulled=!0,this.#i=!0}};import{ByteType as Mu,DepthTexture as Pu,Object3D as Lu,RenderTarget as Cu,RGBAFormat as Eu,UnsignedIntType as Ru,Vector2 as Oa}from"three";var Ba=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST,xi=class i{#e;#t;#r;#i=null;root=new Lu;static attach(e,t){return e.assertDevice(t.backend?.device),new i(e,t)}constructor(e,t){this.#e=e;let r=t.backend;e.configureSurface(r.context,{usage:Ba});let{x:s,y:n}=t.getDrawingBufferSize(new Oa);this.#r=new Pu,this.#r.type=Ru;let a=new Cu(s,n);a.depthTexture=this.#r,e.isBGRA&&(a.texture.format=Eu,a.texture.type=Mu,a.texture.internalFormat="bgra8unorm"),this.#t=a}get player(){return this.#e}setAudioListener(e){this.#i=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}render(e,t,r,s){let n=e.getDrawingBufferSize(new Oa),a=n.x,o=n.y;if(a===0||o===0)return;let l=this.#t;(l.width!==a||l.height!==o)&&(l.setSize(a,o),this.#e.configureSurface(e.backend.context,{usage:Ba})),e.setRenderTarget(l),e.render(t,r),e.setRenderTarget(null);let h=e.backend,c=h.data.get(l.texture)?.texture,u=h.data.get(this.#r)?.texture;if(!c||!u||c.width!==a||c.height!==o)return;this.root.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.root.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let p=r.matrixWorld.elements;this.#i||this.#e.setAudioListenerMatrix(p),this.#e.setAudioSourceMatrix(this.root.matrixWorld.elements),this.#e.renderTextures({color:c,depth:u,w:a,h:o}),s&&(e.autoClearColor=!1,e.autoClearDepth=!0,e.autoClearStencil=!0,e.setRenderTarget(l),e.render(s,r),e.setRenderTarget(null),e.autoClearColor=!0);let d=h.context.getCurrentTexture();d.usage&GPUTextureUsage.COPY_DST&&d.width===a&&d.height===o&&this.#e.copyTexture(c,d,[a,o,1])}setStaticModelMatrix(e){this.#e.setStaticModelMatrix(e)}dispose(){this.#t.dispose(),this.#e.close(),this.#e.dispose()}};export{mt as BoundaryRenderer,bt as ClassicControls,wt as DebugRenderer,Ht as ENV_PRESETS,ss as GRACIA_PLAYER_DEFAULT_CSS,ut as GraciaApp,at as GraciaPlayer,cr as GraciaReactPlayer,Xr as GraciaSplats,Le as Mat4,Tt as ModernControls,Li as POLYGON_MAX_CORNERS,Ci as POLYGON_MAX_LAYERS,Ee as QuadLayer,Pe as Quat,gr as SECTOR_TILT_MAX,ht as SceneManipulator,Mt as SceneOverlay,yi as SplatsMesh,xi as SplatsRendererW3,K as Vec3,Rt as XROverlay,Ct as XRRayRenderer,z as axis,mr as bbox,vr as boundsShape,pt as buildApiSources,We as envCoefsFromPreset,Fi as envCoefsFromSH27,Ki as fetchStreamingMetadata,jr as installGraciaPlayerStyles,Wi as isValidBounds,wr as loadGraciaModule,Q as mat4,Ia as mountGraciaPlayer,_ as num,We as presetToLightProbe,ce as quat,br as sectorApexShift,Hr as useGraciaPlayer,Vr as useGraciaPlaylist,k as vec3};
