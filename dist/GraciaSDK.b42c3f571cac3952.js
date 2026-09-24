var hn=.28209479177387814;function Si(s,e=.5){let t=1/(hn*Math.max(s[0],s[1],s[2],.01));for(let r=0;r<3;r++)s[r]*=t;for(let r=3;r<12;r++)s[r]*=t*e}function _r(s,e=null,t=.5){let r=new Float32Array(12);for(let i=0;i<12;i++)r[i]=s[i];if(e){let i=e[0]??e.x,n=e[1]??e.y,o=e[2]??e.z;if(r[9]*i+r[3]*n+r[6]*o>0)for(let a=3;a<12;a++)r[a]*=-1}return Si(r,t),r}function Me(s){let e=new Float32Array(12);return e.set(s.ambient,0),e.set(s.topDown,3),s.frontBack&&e.set(s.frontBack,6),s.leftRight&&e.set(s.leftRight,9),e}var ge=Object.freeze,lt=ge([0,0,0]),cn=ge([1,1,1]),At=ge([1,0,0]),ht=ge([0,1,0]),Pi=ge([0,0,1]),Tr=ge([0,0,-1]),pn=.25,E=ge({X:At,Y:ht,Z:Pi,FORWARD:Tr,FLIP_X:ge([-1,1,1]),FLIP_Z:ge([1,1,-1])}),x={clamp:(s,e,t)=>Math.min(t,Math.max(e,s)),clampInt:(s,e,t)=>x.clamp(s|0,e,t),clamp01:s=>x.clamp(s,0,1),unlerp01:(s,e,t)=>t===e?0:x.clamp01((s-e)/(t-e)),finite:(s,e=0)=>Number.isFinite(s)?s:e,wrapPi(s){return s>Math.PI?s-2*Math.PI:s<-Math.PI?s+2*Math.PI:s},wrap(s,e){return e>0?(s%e+e)%e:0},wrapDelta(s,e){return e>0?s-e*Math.round(s/e):s},signedClamp(s,e,t){return s===0?0:x.clamp(Math.abs(s),e,t)*Math.sign(s)},zoomStep(s,e=.05,t=10){return s>0?x.signedClamp(Math.log2(s),e,t):0},absLogRatio(s,e){return s>0&&e>0?Math.abs(Math.log(s/e)):0},outside(s,e){return Math.abs(s)>e},perspectiveScale(s,e,t){return 2*s*Math.tan(e*Math.PI/360)/Math.max(1,t)},deadzone(s,e){let t=Math.abs(s);return t<e?0:((t-e)/(1-e))**2*Math.sign(s)},deltaSeconds(s,e,t=0,r=pn){return e?Math.min((s-e)/1e3,r):t}},It={center(s,e){return s[0]=(e.minX+e.maxX)*.5,s[1]=(e.minY+e.maxY)*.5,s[2]=(e.minZ+e.maxZ)*.5,s}},F=class extends Float32Array{constructor(e){super(3),e&&this.from(e)}set(e,t,r){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this)}fromXYZ(e){return this.set(e.x,e.y,e.z)}from(e){return typeof e.x=="number"?this.fromXYZ(e):this.set(e[0],e[1],e[2])}copy(e){return this.set(e[0],e[1],e[2])}add(e){return this[0]+=e[0],this[1]+=e[1],this[2]+=e[2],this}addXYZ(e=0,t=0,r=0){return this[0]+=e,this[1]+=t,this[2]+=r,this}addTo(e,t=lt){return e[0]=t[0]+this[0],e[1]=t[1]+this[1],e[2]=t[2]+this[2],e}addScaled(e,t){return this[0]+=e[0]*t,this[1]+=e[1]*t,this[2]+=e[2]*t,this}addDelta(e,t){return this[0]+=e[0]-t[0],this[1]+=e[1]-t[1],this[2]+=e[2]-t[2],this}sub(e,t){return t?(this[0]=e[0]-t[0],this[1]=e[1]-t[1],this[2]=e[2]-t[2],this):(this[0]-=e[0],this[1]-=e[1],this[2]-=e[2],this)}subXYZ(e,t){return this.set(e.x-t.x,e.y-t.y,e.z-t.z)}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this}multiply(e){return this[0]*=e[0],this[1]*=e[1],this[2]*=e[2],this}multiplyXYZ(e=1,t=1,r=1){return this[0]*=e,this[1]*=t,this[2]*=r,this}divide(e){return this[0]=e[0]?this[0]/e[0]:0,this[1]=e[1]?this[1]/e[1]:0,this[2]=e[2]?this[2]/e[2]:0,this}clampScalar(e,t){return this[0]=x.clamp(this[0],e,t),this[1]=x.clamp(this[1],e,t),this[2]=x.clamp(this[2],e,t),this}normalize(e=lt){let t=Math.hypot(this[0],this[1],this[2]);return Number.isFinite(t)&&t>1e-6?this.scale(1/t):this.copy(e)}setLength(e,t=At){return this.normalize(t).scale(e)}cross(e,t){let r=e[0],i=e[1],n=e[2],o=t[0],a=t[1],l=t[2];return this[0]=i*l-n*a,this[1]=n*o-r*l,this[2]=r*a-i*o,this}lerp(e,t){return this[0]+=t*(e[0]-this[0]),this[1]+=t*(e[1]-this[1]),this[2]+=t*(e[2]-this[2]),this}midXYZ(e,t){return this.set((e.x+t.x)*.5,(e.y+t.y)*.5,(e.z+t.z)*.5)}fromMat4Column(e,t){let r=t*4;return this.set(e[r],e[r+1],e[r+2])}transformMat4(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i+e[12],this[1]=e[1]*t+e[5]*r+e[9]*i+e[13],this[2]=e[2]*t+e[6]*r+e[10]*i+e[14],this}transformMat4Direction(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i,this[1]=e[1]*t+e[5]*r+e[9]*i,this[2]=e[2]*t+e[6]*r+e[10]*i,this}transformQuat(e){let t=this[0],r=this[1],i=this[2],n=e[0],o=e[1],a=e[2],l=e[3],h=l*t+o*i-a*r,c=l*r+a*t-n*i,p=l*i+n*r-o*t,u=-n*t-o*r-a*i;return this[0]=h*l+u*-n+c*-a-p*-o,this[1]=c*l+u*-o+p*-n-h*-a,this[2]=p*l+u*-a+h*-o-c*-n,this}fromYawPitch(e,t){let r=Math.cos(t);return this.set(r*Math.sin(e),Math.sin(t),-r*Math.cos(e))}yawPitch(e){return this[0]=Math.atan2(e[0],-e[2]),this[1]=Math.asin(x.clamp(e[1],-1,1)),this[2]=0,this}basisFromForward(e,t,r=ht){return this.cross(t,r).normalize(At),e.cross(this,t),this}yawPitchBasis(e,t,r,i,n){return r.fromYawPitch(e,t),i.copy(r).scale(-1),this.set(Math.cos(e),0,Math.sin(e)),n.cross(i,this),this}rollBasis(e,t){let r=Math.cos(t),i=Math.sin(t),n=this[0],o=this[1],a=this[2],l=e[0],h=e[1],c=e[2];return this.set(n*r+l*i,o*r+h*i,a*r+c*i),e.set(l*r-n*i,h*r-o*i,c*r-a*i),this}fromSphereDir(e,t){let r=Math.sin(t);return this.set(r*Math.sin(e),Math.cos(t),r*Math.cos(e))}polarY(e,t,r=1e-6){let i=e[0]-t[0],n=e[1]-t[1],o=e[2]-t[2],a=Math.max(r,Math.hypot(i,n,o));return this[0]=Math.atan2(i,o),this[1]=Math.acos(x.clamp(n/a,-1,1)),this[2]=a,this}equals(e,t=1e-6){return Math.abs(this[0]-e[0])<=t&&Math.abs(this[1]-e[1])<=t&&Math.abs(this[2]-e[2])<=t}toArray(){return[this[0],this[1],this[2]]}toXYZ(){return{x:this[0],y:this[1],z:this[2]}}distanceXYZ(e){return Math.hypot(this[0]-e.x,this[1]-e.y,this[2]-e.z)}dot(e){return this[0]*e[0]+this[1]*e[1]+this[2]*e[2]}get sqrLen(){return this[0]*this[0]+this[1]*this[1]+this[2]*this[2]}get len(){return Math.hypot(this[0],this[1],this[2])}get xzLen(){return Math.hypot(this[0],this[2])}get minComponent(){return Math.min(this[0],this[1],this[2])}get maxAbs(){return Math.max(Math.abs(this[0]),Math.abs(this[1]),Math.abs(this[2]))}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}},ye=class extends Float32Array{constructor(e){super(4),e?this.from(e):this.identity()}set(e,t,r,i){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this[3]=i,this)}fromXYZW(e){return this.set(e.x,e.y,e.z,e.w)}from(e){return typeof e.x=="number"?this.fromXYZW(e):this.set(e[0],e[1],e[2],e[3])}copy(e){return this.set(e[0],e[1],e[2],e[3])}identity(){return this.set(0,0,0,1)}normalize(){let e=Math.hypot(this[0],this[1],this[2],this[3]);return e>1e-6?this.scale(1/e):this.identity()}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this[3]*=e,this}setAxisAngle(e,t){let r=t*.5,i=Math.sin(r);return this.set(e[0]*i,e[1]*i,e[2]*i,Math.cos(r))}rotatePre(e,t){return this.mul(kt.setAxisAngle(e,t),this)}rotate(e,t){return this.mul(kt.setAxisAngle(e,t))}mul(e,t){let r=t?e:this,i=t??e,n=r[0],o=r[1],a=r[2],l=r[3],h=i[0],c=i[1],p=i[2],u=i[3];return this[0]=n*u+l*h+o*p-a*c,this[1]=o*u+l*c+a*h-n*p,this[2]=a*u+l*p+n*c-o*h,this[3]=l*u-n*h-o*c-a*p,this}invert(e=this){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return this.set(-e[0]*r,-e[1]*r,-e[2]*r,e[3]*r)}slerp(e,t){let r=e[0],i=e[1],n=e[2],o=e[3],a=this[0]*r+this[1]*i+this[2]*n+this[3]*o;a<0&&(a=-a,r=-r,i=-i,n=-n,o=-o);let l=1-t,h=t;if(1-a>1e-6){let c=Math.acos(a),p=Math.sin(c);l=Math.sin((1-t)*c)/p,h=Math.sin(t*c)/p}return this.set(l*this[0]+h*r,l*this[1]+h*i,l*this[2]+h*n,l*this[3]+h*o)}toXYZW(){return{x:this[0],y:this[1],z:this[2],w:this[3]}}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}get w(){return this[3]}set w(e){this[3]=e}},Pe=class extends Float32Array{constructor(e){super(16),e?this.copy(e):this.identity()}copy(e){return super.set(e),this}identity(){return this.fill(0),this[0]=this[5]=this[10]=this[15]=1,this}multiply(e,t){return t?Sr(this,e,t):Sr(this,this,e)}preMultiply(e){return Sr(this,e,this)}fromTranslation(e){return this.identity(),this[12]=e[0],this[13]=e[1],this[14]=e[2],this}fromScaling(e){return this.identity(),this[0]=e[0],this[5]=e[1],this[10]=e[2],this}perspective(e,t,r,i){let n=1/Math.tan(e*Math.PI/360);return this.fill(0),this[0]=n/t,this[5]=n,this[10]=(i+r)/(r-i),this[11]=-1,this[14]=2*i*r/(r-i),this}cameraWorld(e,t,r=ht){let i=ne.sub(e,t).normalize(Pi),n=Ti.cross(r,i).normalize(At),o=dn.cross(i,n);return this.cameraWorldAxes(e,n,o,i)}cameraWorldAxes(e,t,r,i){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=0,this[4]=r[0],this[5]=r[1],this[6]=r[2],this[7]=0,this[8]=i[0],this[9]=i[1],this[10]=i[2],this[11]=0,this[12]=e[0],this[13]=e[1],this[14]=e[2],this[15]=1,this}fromQuat(e){return this.fromRotationTranslationScale(e,lt,cn)}fromTransform(e){let{rotation:t,translation:r,scale:i}=e;return kt.fromXYZW(t).normalize(),this.fromRotationTranslationScale(kt,ne.fromXYZ(r),Ti.set(i.x,i.y,i.z))}fromRotationTranslationScale(e,t,r){let i=e[0],n=e[1],o=e[2],a=e[3],l=i+i,h=n+n,c=o+o,p=i*l,u=i*h,d=i*c,f=n*h,g=n*c,m=o*c,w=a*l,I=a*h,P=a*c,v=r[0],_=r[1],S=r[2];return this[0]=(1-(f+m))*v,this[1]=(u+P)*v,this[2]=(d-I)*v,this[3]=0,this[4]=(u-P)*_,this[5]=(1-(p+m))*_,this[6]=(g+w)*_,this[7]=0,this[8]=(d+I)*S,this[9]=(g-w)*S,this[10]=(1-(p+f))*S,this[11]=0,this[12]=t[0],this[13]=t[1],this[14]=t[2],this[15]=1,this}setPosition(e){return this[12]=e[0],this[13]=e[1],this[14]=e[2],this}translate(e){let t=e[0],r=e[1],i=e[2];return this[12]=this[0]*t+this[4]*r+this[8]*i+this[12],this[13]=this[1]*t+this[5]*r+this[9]*i+this[13],this[14]=this[2]*t+this[6]*r+this[10]*i+this[14],this[15]=this[3]*t+this[7]*r+this[11]*i+this[15],this}scale(e){let t=e[0],r=e[1],i=e[2];for(let n=0;n<4;n++)this[n]*=t,this[n+4]*=r,this[n+8]*=i;return this}fromPivot(e,t,r,i,n){return this.fromTranslation(e).scale(r).translate(i),this.multiply(fn.fromQuat(t)),this.translate(ne.copy(i).scale(-1)),n?this.multiply(n):this}pointTo(e,t=lt,r=1){return Ci(e,this,t,r)}poseTo(e){return Ei(e,this)}get determinant3(){return this[0]*(this[5]*this[10]-this[6]*this[9])+this[1]*(this[6]*this[8]-this[4]*this[10])+this[2]*(this[4]*this[9]-this[5]*this[8])}decompose(e,t,r){let i=Math.hypot(this[0],this[1],this[2]),n=Math.hypot(this[4],this[5],this[6]),o=Math.hypot(this[8],this[9],this[10]);this.determinant3<0&&(i=-i),e.set(this[12],this[13],this[14]),r.set(i,n,o);let a=i?1/i:0,l=n?1/n:0,h=o?1/o:0;return pe[0]=this[0]*a,pe[1]=this[1]*a,pe[2]=this[2]*a,pe[3]=this[4]*l,pe[4]=this[5]*l,pe[5]=this[6]*l,pe[6]=this[8]*h,pe[7]=this[9]*h,pe[8]=this[10]*h,un(t,pe),this}};function un(s,e){let t=e[0]+e[4]+e[8];if(t>0){let a=Math.sqrt(t+1),l=.5*a;return a=.5/a,s.set((e[5]-e[7])*a,(e[6]-e[2])*a,(e[1]-e[3])*a,l)}let r=0;e[4]>e[0]&&(r=1),e[8]>e[r*3+r]&&(r=2);let i=(r+1)%3,n=(r+2)%3,o=Math.sqrt(e[r*3+r]-e[i*3+i]-e[n*3+n]+1);return s[r]=.5*o,o=.5/o,s[3]=(e[i*3+n]-e[n*3+i])*o,s[i]=(e[i*3+r]+e[r*3+i])*o,s[n]=(e[n*3+r]+e[r*3+n])*o,s}var ne=new F,Ti=new F,dn=new F,kt=new ye,fn=new Pe,pe=new Float32Array(9);function Sr(s,e,t){let r=e[0],i=e[1],n=e[2],o=e[3],a=e[4],l=e[5],h=e[6],c=e[7],p=e[8],u=e[9],d=e[10],f=e[11],g=e[12],m=e[13],w=e[14],I=e[15],P=t[0],v=t[1],_=t[2],S=t[3];return s[0]=P*r+v*a+_*p+S*g,s[1]=P*i+v*l+_*u+S*m,s[2]=P*n+v*h+_*d+S*w,s[3]=P*o+v*c+_*f+S*I,P=t[4],v=t[5],_=t[6],S=t[7],s[4]=P*r+v*a+_*p+S*g,s[5]=P*i+v*l+_*u+S*m,s[6]=P*n+v*h+_*d+S*w,s[7]=P*o+v*c+_*f+S*I,P=t[8],v=t[9],_=t[10],S=t[11],s[8]=P*r+v*a+_*p+S*g,s[9]=P*i+v*l+_*u+S*m,s[10]=P*n+v*h+_*d+S*w,s[11]=P*o+v*c+_*f+S*I,P=t[12],v=t[13],_=t[14],S=t[15],s[12]=P*r+v*a+_*p+S*g,s[13]=P*i+v*l+_*u+S*m,s[14]=P*n+v*h+_*d+S*w,s[15]=P*o+v*c+_*f+S*I,s}function Ci(s,e,t=lt,r=1){let i=t[0]??0,n=t[1]??0,o=t[2]??0;return s[0]=e[0]*i+e[4]*n+e[8]*o+e[12],s[1]=e[1]*i+e[5]*n+e[9]*o+e[13],s[2]=e[2]*i+e[6]*n+e[10]*o+e[14],r!==1&&(s[0]*=r,s[1]*=r,s[2]*=r),s}function Mi(s,e,t,r){let i=t[0],n=t[1],o=t[2];s[0]=e[0]*i+e[4]*n+e[8]*o,s[1]=e[1]*i+e[5]*n+e[9]*o,s[2]=e[2]*i+e[6]*n+e[10]*o;let a=Math.hypot(s[0],s[1],s[2]);if(Number.isFinite(a)&&a>1e-6){let l=1/a;s[0]*=l,s[1]*=l,s[2]*=l}else s[0]=r[0],s[1]=r[1],s[2]=r[2];return s}function Ei(s,e){return s[0]=e[12],s[1]=e[13],s[2]=e[14],Mi(ne,e,Tr,Tr),s[3]=ne[0],s[4]=ne[1],s[5]=ne[2],Mi(ne,e,ht,ht),s[6]=ne[0],s[7]=ne[1],s[8]=ne[2],s}function mn(s,e){let t=Math.abs(s[0])-e[0],r=Math.abs(s[1])-e[1],i=Math.abs(s[2])-e[2];return Math.hypot(Math.max(t,0),Math.max(r,0),Math.max(i,0))+Math.min(Math.max(t,Math.max(r,i)),0)}function gn(s,e){let t=Math.hypot(s[0]/e[0],s[1]/e[1],s[2]/e[2]);if(t===0)return-Math.min(e[0],e[1],e[2]);let r=Math.hypot(s[0]/(e[0]*e[0]),s[1]/(e[1]*e[1]),s[2]/(e[2]*e[2]));return t*(t-1)/r}function yn(s,e,t){let r=Math.min(e[0],e[2]),i=Math.abs(s[0]),n=s[2],o=Math.hypot(i,n)-r;if(t<Math.PI-1e-6){let l=Math.sin(t),h=Math.cos(t),c=x.clamp(i*l+n*h,0,r),p=Math.hypot(i-l*c,n-h*c);o=Math.max(o,p*Math.sign(h*i-l*n))}let a=Math.abs(s[1])-e[1];return Math.min(Math.max(o,a),0)+Math.hypot(Math.max(o,0),Math.max(a,0))}var ct=class{#e;#i=new F;#t=new F;#r=new ye;#s;#o=new F;#n=new Pe;#a=new F;#l=new ye;#c=new ye;#h=new F;constructor({type:e,position:t,rotation:r,scale:i,angleDeg:n=90}){this.#e=e,this.#i.fromXYZ(t),this.#t.fromXYZ(i),this.#r.fromXYZW(r).normalize(),this.#s=x.clamp(Math.abs(n),1,360)*Math.PI/360,this.setSceneMatrix(null)}get type(){return this.#e}get sectorHalfAngle(){return this.#s}get worldPosition(){return this.#a}get worldRotation(){return this.#l}get worldHalf(){return this.#h}setSceneMatrix(e){return this.#n.fromRotationTranslationScale(this.#r,this.#i,this.#t),e&&this.#n.preMultiply(e),this.#n.decompose(this.#a,this.#l,this.#h),this.#c.copy(this.#l).invert(),this.#h.set(Math.abs(this.#h[0])*.5,Math.abs(this.#h[1])*.5,Math.abs(this.#h[2])*.5),this}signedDistance(e){let t=this.#o.sub(e,this.#a).transformQuat(this.#c),r=this.#h;return this.#e==="sphere"?gn(t,r):this.#e==="sector"?yn(t,r,this.#s):mn(t,r)}},T={create:()=>new F},K={create:()=>new ye},D={create:()=>new Pe,clone:s=>new Pe(s),pointTo:Ci,poseTo:Ei};async function Ft(s="@gracia/web-sdk/wasm"){for(let e=0;;e++)try{let t=await import(s);return t.default??t}catch{await new Promise(r=>setTimeout(r,1e3))}}var Bt=class{#e;#i=0;constructor(e,t=512){this.#e=e,this.#i=e._malloc(t)}ptr(e=0){return this.#i+e}get f32(){return this.#e.HEAPF32}writeF32(e,t=0){this.#e.HEAPF32.set(e,this.#i+t>>2)}readF32(e,t=0){let r=this.#i+t;return new Float32Array(this.#e.HEAPF32.buffer,r,e)}free(){this.#i&&(this.#e._free(this.#i),this.#i=0)}};function Mr(s,e,...t){if(!e)return;let r=new TextEncoder,i=[],n=t.map(a=>{if(typeof a!="string")return a;let l=r.encode(a),h=s._malloc(l.length+1);return s.HEAPU8.set(l,h),s.HEAPU8[h+l.length]=0,i.push(h),h}),o=e(...n);for(let a of i)s._free(a);return o}var M=(s,e)=>s[`_Gracia_${e}`];async function xn(){let s=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!s)throw new Error("WebGPU adapter not available");return await s.requestDevice({requiredLimits:{maxStorageBuffersPerShaderStage:10,maxComputeWorkgroupSizeX:256,maxBufferSize:s.limits.maxBufferSize,maxStorageBufferBindingSize:s.limits.maxStorageBufferBindingSize}})}var zt=class s{#e;#i;#t=null;#r=0;constructor(e){this.#e=e,this.#i=new Bt(e)}static async boot(e,t,{maxSplatsCount:r=0}={}){let i=typeof e=="function"?await e({canvas:t}):e,n=await xn();if(typeof e=="function"&&(i.preinitializedWebGPUDevice=n,i.WebGPU?.importJsDevice?.(n)),M(i,"Init")?.(r|0),!M(i,"Initialized")?.())throw new Error("Gracia init failed");return{module:new s(i),device:n}}get heap(){return this.#i}get backend(){return this.#t}get buildUnixTime(){return M(this.#e,"GetBuildTime")?.()??0}shutdownApp(){M(this.#e,"Shutdown")?.()}setCamera(e,t,r,i){let n=!!(r&&i),o=this.#i.ptr(),a=o>>2,l=this.#i.f32;l.set(e,a),n&&l.set(r,a+16),l.set(t,a+32),n&&l.set(i,a+48),M(this.#e,"SetCamera")?.(n,o)}getModelMatrix(){let e=M(this.#e,"GetModelMatrix");if(!e)return null;let t=this.#i.ptr(256);return e(t),this.#i.readF32(16,256)}setModelMatrix(e){let t=M(this.#e,"SetModelMatrix");t&&(this.#i.writeF32(e,256),t(this.#i.ptr(256)))}initPure(e){this.shutdownBackend(),this.#t="pure",M(this.#e,"P_Init")?.(e?1:0)}pureRenderTo(e,t,r,i){let n=this.#e.WebGPU,o=n?.importJsTexture?.(e)??0,a=t?n?.importJsTexture?.(t)??0:0;return M(this.#e,"P_RenderTo")?.(o,a,r,i)!==0}initHybrid(e){this.shutdownBackend(),this.registerGL(e),this.#t="hybrid",M(this.#e,"H_Init")?.()}hybridFrame(e,t,r){M(this.#e,"H_Frame")?.(e,t,r)}hybridPreprocess(e,t){return M(this.#e,"H_Preprocess")?.(e,t)??0}hybridRender(e,t,r,i,n,o){M(this.#e,"H_Render")?.(e,t,r,i,n,o)}hybridRenderMesh(e,t,r,i,n){this.#i.writeF32(e),M(this.#e,"H_RenderMeshMVP")?.(this.#i.ptr(),t,r,i,n)}hybridRenderMotionMV(e,t,r,i){M(this.#e,"H_RenderMotionMV")?.(e,t,r,i)}hybridCanMotion(){return!!M(this.#e,"H_CanMotion")?.()}hybridHasMultiview(){return!!M(this.#e,"H_HasMultiview")?.()}hybridReset(){M(this.#e,"H_Reset")?.()}registerGL(e){this.#r&&this.#e.GL?.deleteContext(this.#r);let t=this.#e.GL;if(!t)throw new Error("WASM GL layer not available");this.#r=t.registerContext(e,{majorVersion:2,minorVersion:0,enableExtensionsByDefault:!0}),t.makeContextCurrent(this.#r)}shutdownBackend(){this.#t==="pure"?M(this.#e,"P_Shutdown")?.():this.#t==="hybrid"&&M(this.#e,"H_Shutdown")?.(),this.#r&&(this.#e.GL?.deleteContext(this.#r),this.#r=0),this.#t=null}dispose(){this.shutdownBackend(),this.#i.free(),this.shutdownApp()}addDynamicScene(){return M(this.#e,"AddScene")?.()??0}addStaticScene(){return M(this.#e,"AddStaticScene")?.()??0}removeScene(e){M(this.#e,"RemoveScene")?.(e)}sceneReady(e){return e?(M(this.#e,"SceneReady")?.(e)??0)!==0:!1}sceneProgress(e){return e?M(this.#e,"SceneProgress")?.(e)??0:0}sceneDuration(e){return e?M(this.#e,"SceneDuration")?.(e)??0:0}sceneIsBuffering(e){return e?(M(this.#e,"SceneIsBuffering")?.(e)??0)!==0:!1}sceneLastFetchStatus(e){return e?M(this.#e,"SceneGetLastFetchStatus")?.(e)??0:0}sceneSetTime(e,t){M(this.#e,"SceneSetTime")?.(e,t)}sceneSetVisible(e,t){M(this.#e,"SceneSetVisible")?.(e,t)}sceneGetBBox(e){let t=M(this.#e,"SceneGetBBox");if(!t||!e)return null;let r=this.#i.ptr(256);t(e,r);let i=r>>2,n=this.#i.f32;return n[i]===0&&n[i+1]===0&&n[i+2]===0&&n[i+3]===0&&n[i+4]===0&&n[i+5]===0?null:{minX:n[i],minY:n[i+1],minZ:n[i+2],maxX:n[i+3],maxY:n[i+4],maxZ:n[i+5]}}sceneSetEnvLighting(e,t,r){let i=M(this.#e,"SceneSetEnvPreset");if(!i||!e)return;let n=this.#i.ptr(128),o=n>>2,a=this.#i.f32;for(let l=0;l<4;l++)a[o+l*4]=t[l*3],a[o+l*4+1]=t[l*3+1],a[o+l*4+2]=t[l*3+2],a[o+l*4+3]=0;a[o+3]=r,i(e,n)}sceneClearEnvLighting(e){M(this.#e,"SceneClearEnvPreset")?.(e)}sceneSetModelMatrix(e,t){let r=M(this.#e,"SceneSetModelMatrix");!r||!e||(this.#i.writeF32(t,256),r(e,this.#i.ptr(256)))}sceneOpen(e,t){Mr(this.#e,M(this.#e,"SceneOpen"),e,t)}sceneOpenApi(e,t,r){Mr(this.#e,M(this.#e,"SceneOpenApi"),e,t,r)}registerLocalFile(e){let t=this.#e.graciaRegisterLocalFile;if(!t)throw new Error("WASM local-file bridge unavailable");return t(e)}sceneOpenLocal(e,t){M(this.#e,"SceneOpenLocal")?.(e,t)}sceneOpenStatic(e,t){let r=M(this.#e,"SceneOpenStatic");if(!r)return-1;let i=this.#e._malloc(t.length);this.#e.HEAPU8.set(t,i);try{return r(e,i,t.length)}finally{this.#e._free(i)}}};var bn={panningModel:"HRTF",distanceModel:"inverse",refDistance:1,maxDistance:100,rolloffFactor:1},vn=[0,0,0],wn=[0,0,0,0,0,-1,0,1,0],_n=.1,Sn=40,Tn=60,Mn=.01,Pn=.08,Cn=1.5,Li=.02;function Ri(){typeof navigator<"u"&&navigator.audioSession&&(navigator.audioSession.type="playback")}function Ai(){return typeof performance<"u"?performance.now():Date.now()}function q(s,e,t,r=0){r>0?s.linearRampToValueAtTime(e,t.currentTime+r):s.setValueAtTime(e,t.currentTime)}function ki(s,e,t){s.setTargetAtTime(e,t.currentTime,.01)}function Gt(s){try{s.disconnect()}catch{}}function j(s,e){return Math.abs(s-e)<1e-4}function J(s){try{s.automationRate="k-rate"}catch{}}function Pr(s){s.positionX&&(J(s.positionX),J(s.positionY),J(s.positionZ),"orientationX"in s?(J(s.orientationX),J(s.orientationY),J(s.orientationZ)):(J(s.forwardX),J(s.forwardY),J(s.forwardZ),J(s.upX),J(s.upY),J(s.upZ)))}function Ii(s,e,t,r,i,n=0){q(s.positionX,e,i,n),q(s.positionY,t,i,n),q(s.positionZ,r,i,n)}function En(s,e,t,r,i,n,o,a,l=0){if("orientationX"in s){q(s.orientationX,e,a,l),q(s.orientationY,t,a,l),q(s.orientationZ,r,a,l);return}q(s.forwardX,e,a,l),q(s.forwardY,t,a,l),q(s.forwardZ,r,a,l),q(s.upX,i,a,l),q(s.upY,n,a,l),q(s.upZ,o,a,l)}var Cr=class{#e=null;#i=null;#t=[0,0,0];#r=[0,0,-1,0,1,0];#s=!1;#o=new Float32Array(9);#n=!1;constructor(){Ri(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&this.#e&&this.#e.state!=="running"&&this.resume()})}get ctx(){return this.#e}get destination(){return this.#i??this.#e?.destination??null}setOutput(e){e?.context&&e.context!==this.#e&&(this.#e=e.context,Pr(this.#e.listener),this.#n=!1),this.#i=e?.destination??null,this.#s=e?.externalListener===!0,this.#l()}decode(e){let t=this.#a();if(!t)throw new Error("Web Audio is not supported in this browser");return t.decodeAudioData(e).then(r=>({ctx:t,buffer:r,destination:this.destination??t.destination}))}resume(){Ri();let e=this.#a();return e?e.state==="running"?Promise.resolve():e.resume().catch(()=>{}):Promise.resolve()}listener(e,t,r,i,n,o,a,l,h,c=0){this.#t=[e,t,r],this.#r=[i,n,o,a,l,h],this.#l(c)}resetListener(){this.listener(...wn)}#a(){if(this.#e)return this.#e;if(typeof AudioContext>"u")return null;try{this.#e=new AudioContext}catch{return null}return Pr(this.#e.listener),this.#n=!1,this.#l(),this.#e}#l(e=0){let t=this.#e?.listener;if(!t||this.#s)return;let[r,i,n]=this.#t,[o,a,l,h,c,p]=this.#r,u=this.#o;this.#n&&j(r,u[0])&&j(i,u[1])&&j(n,u[2])&&j(o,u[3])&&j(a,u[4])&&j(l,u[5])&&j(h,u[6])&&j(c,u[7])&&j(p,u[8])||(u.set([r,i,n,o,a,l,h,c,p]),this.#n=!0,Ii(t,r,i,n,this.#e,e),En(t,o,a,l,h,c,p,this.#e,e))}},ee=new Cr,Er=class s{#e;#i;#t;#r;#s;#o=null;#n=!1;#a=!1;#l=1;#c=1;#h=0;#p=0;#u=0;#f=NaN;#m=NaN;#d=NaN;constructor(e,t,r={}){this.#e=e,this.#i=t,this.#n=r.loop??!0,this.#s=r.destination??e.destination,this.#t=e.createGain(),this.#r=e.createPanner(),Pr(this.#r),this.pannerAttr({...bn,...r.pannerAttr}),this.#r.connect(this.#t),this.#t.connect(this.#s),this.volume(r.volume??1).rate(r.rate??1).pos(...r.pos??vn)}get context(){return this.#e}static async fromArrayBuffer(e,t={}){let{ctx:r,buffer:i,destination:n}=await ee.decode(e);return new s(r,i,{destination:n,...t})}play(){return!this.#i||this.#a?this:(this.#y(this.#h),this)}pause(){return this.#a?(this.#h=this.#b(),this.#x(),this.#a=!1,this):this}stop(){return this.#h=0,this.#a&&(this.#x(),this.#a=!1),this}unload(){return this.stop(),this.#i=null,Gt(this.#r),Gt(this.#t),this}playing(){return this.#a}seek(e){return typeof e!="number"?this.#b():(this.#h=this.#v(e),this.#a&&(this.#x(),this.#y(this.#h)),this)}volume(e){return ki(this.#t.gain,x.clamp01(e),this.#e),this}rate(e){return this.#l=x.clamp(x.finite(e,1),.001,1/0),this.#g(this.#l),this}#g(e){this.#a&&(this.#h=this.#b(),this.#p=this.#h,this.#u=this.#e.currentTime),this.#c=e,this.#o&&ki(this.#o.playbackRate,e,this.#e)}follow(e){if(!this.#a||!this.#i)return;let t=this.#b()-e;if(this.#n&&(t=x.wrapDelta(t,this.#i.duration)),Math.abs(t)>Pn){this.seek(e);return}let r=this.#l,i=Math.abs(t)<Mn?r:x.clamp(r-Cn*t,r*(1-Li),r*(1+Li));j(i,this.#c)||this.#g(i)}pos(e,t,r,i=0){return j(e,this.#f)&&j(t,this.#m)&&j(r,this.#d)?this:(this.#f=e,this.#m=t,this.#d=r,Ii(this.#r,e,t,r,this.#e,i),this)}destination(e){let t=e??this.#e.destination;return t===this.#s?this:(Gt(this.#t),this.#s=t,this.#t.connect(this.#s),this)}pannerAttr(e){return e?(e.panningModel&&(this.#r.panningModel=e.panningModel),e.distanceModel&&(this.#r.distanceModel=e.distanceModel),typeof e.refDistance=="number"&&(this.#r.refDistance=e.refDistance),typeof e.maxDistance=="number"&&(this.#r.maxDistance=e.maxDistance),typeof e.rolloffFactor=="number"&&(this.#r.rolloffFactor=e.rolloffFactor),this):this}#y(e){let t=this.#i;if(!t)return;let r=this.#e.createBufferSource(),i=this.#v(e);r.buffer=t,r.loop=this.#n,this.#c=this.#l,q(r.playbackRate,this.#c,this.#e),r.connect(this.#r),r.onended=()=>{this.#o===r&&(this.#o=null,this.#a=!1,this.#h=0)},this.#o=r,this.#a=!0,this.#h=i,this.#p=i,this.#u=this.#e.currentTime,r.start(0,i)}#x(){let e=this.#o;if(this.#o=null,!!e){e.onended=null;try{e.stop(0)}catch{}Gt(e)}}#b(){return this.#a?this.#v(this.#p+(this.#e.currentTime-this.#u)*this.#c):this.#h}#v(e){let t=this.#i?.duration??0;return!Number.isFinite(e)||e<=0||t<=0?0:this.#n?x.wrap(e,t):x.clamp(e,0,x.clamp(t-.001,0,1/0))}},Nt=class{#e=null;#i=null;#t=null;#r=null;#s=null;#o=[0,0,0];#n=T.create();#a=new Float32Array(9);#l={volume:1,rate:1,pannerAttr:{}};#c=!1;#h=0;#p=0;#u=0;#f=0;#m=!1;get context(){return ee.ctx}get isLoaded(){return!this.#m}setOutput(e){let t=ee.ctx;ee.setOutput(e),this.#e&&(t&&ee.ctx&&this.#e.context!==ee.ctx||this.#e.destination(ee.destination))}async load(e){if(e===this.#i&&(this.#m||this.#e||this.#r||this.#s))return;this.unload(),this.#i=e,this.#m=!0;let t=++this.#h;this.#t=new AbortController;try{let r=await fetch(e,{signal:this.#t.signal});if(!r.ok)throw new Error(`Audio fetch failed: ${r.status}`);if(t!==this.#h)return;let i=await r.arrayBuffer();if(t!==this.#h)return;this.#r=i}catch(r){r?.name!=="AbortError"&&t===this.#h&&this.#d()}finally{t===this.#h&&(this.#m=!1)}}sync(e,t,r){if(!this.#c||!r){this.#e?.pause();return}let i=this.#e;if(!i){this.#r&&this.#y();return}if(ee.ctx?.state!=="running")return;if(!i.playing()){i.seek(e).play();return}let n=Ai();n-this.#f<Tn||(this.#f=n,i.follow(e))}volume(e){this.#l.volume=x.clamp01(e),this.#e?.volume(this.#l.volume)}rate(e){this.#l.rate=e,this.#e?.rate(e)}setSpatial(e,t,r){this.#o=[e,t,r];let i=this.#g("spatial");i>=0&&this.#e?.pos(e,t,r,i)}setSourceMatrix(e,t,r=1){let i=e.pointTo?.(this.#n,t,r)??D.pointTo(this.#n,e,t,r);this.setSpatial(i.x,i.y,i.z)}setListenerMatrix(e){let t=this.#g("listener");if(t<0)return;let r=e.poseTo?.(this.#a)??D.poseTo(this.#a,e);ee.listener(...r,t)}setPanner(e){Object.assign(this.#l.pannerAttr,e),this.#e?.pannerAttr(e)}stop(){this.#e?.pause()}get enabled(){return this.#c&&ee.ctx?.state==="running"}enable(){this.#c=!0,ee.resume(),this.#r&&this.#y()}disable(){this.#c=!1,this.#e?.pause()}unload(){this.#h++,this.#t?.abort(),this.#t=null,this.#e?.stop().unload(),this.#d(),ee.resetListener()}#d(){this.#e=null,this.#i=null,this.#r=null,this.#s=null,this.#m=!1}#g(e){let t=Ai(),r=e==="listener"?this.#p:this.#u;return r&&t-r<Sn?-1:(e==="listener"?this.#p=t:this.#u=t,x.deltaSeconds(t,r,0,_n))}#y(){if(this.#e)return Promise.resolve(this.#e);if(this.#s)return this.#s;if(!this.#r)return Promise.resolve(null);let e=this.#h;return this.#s=Er.fromArrayBuffer(this.#r,{...this.#l,pos:this.#o}).then(t=>e!==this.#h?(t.unload(),null):(this.#r=null,this.#e=t,t)).catch(t=>(e===this.#h&&this.#d(),null)).finally(()=>{e===this.#h&&(this.#s=null)}),this.#s}};var pt=class{#e;#i=0;#t=!1;constructor(e){this.#e=e}get id(){return this.#i}get isStatic(){return this.#t}get isReady(){return this.#e.sceneReady(this.#i)}get progress(){return this.#e.sceneProgress(this.#i)}get duration(){return this.#t?0:this.#e.sceneDuration(this.#i)}get isBuffering(){return this.#t?!1:this.#e.sceneIsBuffering(this.#i)}get lastFetchStatus(){return this.#e.sceneLastFetchStatus(this.#i)}setTime(e){this.#i&&!this.#t&&this.#e.sceneSetTime(this.#i,e)}setVisible(e){this.#i&&this.#e.sceneSetVisible(this.#i,e)}getBBox(){return this.#e.sceneGetBBox(this.#i)}setEnvLighting(e,t){this.#i&&this.#e.sceneSetEnvLighting(this.#i,e,t)}clearEnvLighting(){this.#i&&this.#e.sceneClearEnvLighting(this.#i)}setModelMatrix(e){this.#i&&this.#e.sceneSetModelMatrix(this.#i,e)}openDynamic(e){if(this.remove(),this.#i=this.#e.addDynamicScene(),this.#t=!1,e.localFile||e.file){let r=e.localFile||e.file;this.#e.sceneOpenLocal(this.#i,this.#e.registerLocalFile(r));return}let t=e.url;if(e.token){this.#e.sceneOpenApi(this.#i,t,e.token);return}this.#e.sceneOpen(this.#i,t)}async openStatic(e){this.remove();let t=this.#e.addStaticScene();this.#i=t,this.#t=!0;let r=e.file?await e.file.arrayBuffer():await(await fetch(e.url)).arrayBuffer();this.#i===t&&this.#e.sceneOpenStatic(t,new Uint8Array(r))}remove(){this.#i&&(this.#e.removeScene(this.#i),this.#i=0)}};var Fi={alpha:!0,premultipliedAlpha:!0,depth:!0,stencil:!1,antialias:!1,powerPreference:"high-performance",xrCompatible:!0},De=class s{#e;#i;#t=new Nt;#r=0;#s=null;#o=null;#n=null;#a=!1;#l=0;#c=0;#h=1;#p=null;#u=null;static GL_CANVAS_OPTS=Fi;constructor(e,t){this.#e=e,this.#i=t,typeof document<"u"&&document.addEventListener("visibilitychange",this.#f)}#f=()=>{document.hidden&&this.#t.stop()};static async create(e,{canvas:t,gl:r,backend:i,maxSplatsCount:n}={}){if(!t&&!r)throw new Error("canvas or gl required");let o=i??(r?"hybrid":"pure"),{module:a,device:l}=await zt.boot(e,t||r.canvas,{maxSplatsCount:n}),h=new s(a,l);return o==="hybrid"?h.#g(r??s.#m(t)):h.#d(t),h}static preferredFormat(){return navigator.gpu.getPreferredCanvasFormat()}static#m(e){let t=e.getContext("webgl2",Fi);if(!t)throw new Error("WebGL2 not available");return t}get device(){return this.#i}get backend(){return this.#e.backend}get buildUnixTime(){return this.#e.buildUnixTime}get gl(){return this.#u}get isBGRA(){return s.preferredFormat()==="bgra8unorm"}assertDevice(e){if(e&&e!==this.#i)throw new Error("WebGPU device must match GraciaPlayer.device")}configureSurface(e,t={}){let{format:r,alphaMode:i="premultiplied",usage:n}=t;e.configure({device:this.#i,format:r??s.preferredFormat(),alphaMode:i,...n!=null?{usage:n}:{}})}bindCanvas(e,t={}){let r=e.getContext("webgpu");if(!r)throw new Error("WebGPU canvas context not available");return this.configureSurface(r,t),this.#p=r,r}setBackend(e,{canvas:t,gl:r}={}){if(this.shutdown(),e==="hybrid"){if(!r&&!t)throw new Error("canvas or gl required for hybrid backend");this.#g(r??s.#m(t))}else this.#d(t)}present(e,t){e===0||t===0||(this.#e.backend==="hybrid"?this.#x(e,t):this.#y())}renderTextures({color:e,depth:t,w:r,h:i}){return this.#v(),this.#e.backend!=="pure"?!1:this.#e.pureRenderTo(e,t,r,i)}copyTexture(e,t,r=null){let i=r??[e.width,e.height,1],n=this.#i.createCommandEncoder();n.copyTextureToTexture({texture:e},{texture:t},i),this.#i.queue.submit([n.finish()])}renderHybridViewport(e,t,{gl:r,drawMode:i,enableMesh:n=!1,x:o=0,y:a=0,eye:l=0}={}){let h=r??this.#u;if(!h)throw new Error("No WebGL context");let c=i??this.#r;this.preprocess(e,t),h.enable(h.DEPTH_TEST),h.depthFunc(h.LEQUAL),h.depthMask(!1),this.render(c,o,a,e,t,l),n&&(h.colorMask(!1,!1,!1,!1),h.depthMask(!0),this.render(1,o,a,e,t,l),h.colorMask(!0,!0,!0,!0)),h.depthMask(!0)}shutdown(){this.#e.shutdownBackend(),this.#u=null,this.#p=null}#d(e){this.#u=null,this.#p=null,this.#i.pushErrorScope("validation"),this.#e.initPure(this.isBGRA),this.#i.popErrorScope().then(t=>{}),e&&this.bindCanvas(e)}#g(e){this.#p=null,this.#u=e,this.#e.initHybrid(e)}#y(){if(!this.#p)throw new Error("bindCanvas() required");let{width:e,height:t}=this.#p.canvas;e===0||t===0||this.renderTextures({color:this.#p.getCurrentTexture(),w:e,h:t})}#x(e,t){let r=this.#u;if(!r)throw new Error("hybrid backend required");r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clearDepth(1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.disable(r.DEPTH_TEST),this.frame(e,t,this.#r)}get drawMode(){return this.#r}set drawMode(e){this.#r=x.clampInt(e,0,3)}get#b(){return this.#s??this.#o}get isReady(){return(this.#b?.isReady??!1)&&this.#t.isLoaded}get progress(){return this.#b?.progress??0}get duration(){return this.#s?.duration??0}get currentTime(){return this.#l}get isPlaying(){return this.#a}get isBuffering(){return this.#s?.isBuffering??!1}get lastFetchStatus(){return this.#b?.lastFetchStatus??0}play(){this.#a=!0}pause(){this.#a=!1,this.#c=0,this.#t.stop()}seek(e){this.#l=e,this.#c=0}get speed(){return this.#h}setSpeed(e){this.#h=x.clamp(x.finite(e,1),.1,4),this.#t.rate(this.#h)}close(){this.#s?.remove(),this.#s=null,this.#o?.remove(),this.#o=null,this.#l=0,this.#a=!1,this.#t.unload()}clearVideo(){this.#s?.remove(),this.#s=null,this.#l=0,this.#a=!1,this.#c=0,this.#t.unload()}clearEnvironment(){this.#o?.remove(),this.#o=null}#v(){if(!this.#s)return;let e=performance.now(),t=this.#a&&!this.isBuffering&&this.#c>0;if(t){this.#l+=x.deltaSeconds(e,this.#c)*this.#h;let r=this.duration;r>0&&(this.#l=x.wrap(this.#l,r))}this.#c=this.#a&&!this.isBuffering?e:0,this.#s.setTime(this.#l),this.#t.sync(this.#l,this.duration,this.isReady&&t)}open(e){if(this.#t.unload(),e.audio&&this.#t.load(e.audio),e.type==="static")return this.#T(e);this.#s||(this.#s=new pt(this.#e)),this.#s.openDynamic(e),this.#_(this.#s),this.#l=0,this.#a=!1}async#T(e){this.#o||(this.#o=new pt(this.#e)),await this.#o.openStatic(e),this.#_(this.#o)}get audioContext(){return this.#t.context}get audioEnabled(){return this.#t.enabled}enableAudio(){this.#t.enable()}disableAudio(){this.#t.disable()}setAudioOutput(e){this.#t.setOutput(e)}setVolume(e){this.#t.volume(e)}loadAudio(e){return this.#t.load(e)}setAudioSpatial(e,t,r){this.#t.setSpatial(e,t,r)}setAudioSourceMatrix(e,t,r){this.#t.setSourceMatrix(e,t,r)}setAudioListenerMatrix(e){this.#t.setListenerMatrix(e)}setAudioPanner(e){this.#t.setPanner(e)}setCamera(e,t,r,i){this.#e.setCamera(e,t,r,i)}getBBox(){return this.#b?.getBBox()??null}getModelMatrix(){return this.#e.getModelMatrix()}setModelMatrix(e){this.#e.setModelMatrix(e)}setStaticModelMatrix(e){this.#o?.setModelMatrix(e)}setEnvLighting(e,t=1){this.#n={coefs:Float32Array.from(e),scale:t},this.#s?.setEnvLighting(e,t),this.#o?.setEnvLighting(e,t)}clearEnvLighting(){this.#n=null,this.#s?.clearEnvLighting(),this.#o?.clearEnvLighting()}#_(e){this.#n&&e.setEnvLighting(this.#n.coefs,this.#n.scale)}frame(e,t,r){this.#v(),this.#e.hybridFrame(e,t,r)}preprocess(e,t){return this.#v(),this.#e.hybridPreprocess(e,t)}render(e,t,r,i,n,o){this.#e.hybridRender(e,t,r,i,n,o)}renderMesh(e,t,r,i,n){this.#e.hybridRenderMesh(e,t,r,i,n)}renderMotionMV(e,t,r,i){this.#e.hybridRenderMotionMV(e,t,r,i)}canMotion(){return this.#e.hybridCanMotion()}hasMultiview(){return this.#e.hybridHasMultiview()}resetXR(){this.#e.hybridReset()}dispose(){typeof document<"u"&&document.removeEventListener("visibilitychange",this.#f),this.close(),this.#t.unload(),this.shutdown(),this.#e.dispose()}};var Ln=.175,Ot=.4,Lr=.15,Rn=.9,An=.35,kn=.04,xe=64,In=new Set(["box","sphere","sector"]),ut=new Float32Array(0),dt=s=>typeof s=="number"&&Number.isFinite(s),Rr=s=>!!s&&dt(s.x)&&dt(s.y)&&dt(s.z),Fn=s=>Rr(s)&&dt(s.w);function Bn(s){return!s||typeof s!="object"||!In.has(s.type)||!Rr(s.position)||!Fn(s.rotation)||!Rr(s.scale)||!(s.scale.x>0)||!(s.scale.y>0)||!(s.scale.z>0)?!1:s.angleDeg==null||dt(s.angleDeg)}var zn=s=>-s-Ln,Gn=s=>Rn*Math.min(Math.max(0,-s)/An,1),Nn=s=>s>Ot?0:s<=Lr?1:(Ot-s)/(Ot-Lr);function On(s,e){let t=s.worldHalf;if(s.type==="box"){e(-t[0],-t[2]),e(t[0],-t[2]),e(t[0],t[2]),e(-t[0],t[2]);return}if(s.type==="sphere"){for(let n=0;n<xe;n++){let o=n/xe*Math.PI*2;e(Math.cos(o)*t[0],Math.sin(o)*t[2])}return}let r=Math.min(t[0],t[2]),i=s.sectorHalfAngle;if(i>=Math.PI-1e-6){for(let n=0;n<xe;n++){let o=n/xe*Math.PI*2;e(Math.sin(o)*r,Math.cos(o)*r)}return}e(0,0);for(let n=0;n<=xe;n++){let o=-i+n/xe*i*2;e(Math.sin(o)*r,Math.cos(o)*r)}}function Xn(s){return s.type==="box"?4:s.type==="sphere"||s.sectorHalfAngle>=Math.PI-1e-6?xe:xe+2}var He=class{#e=null;#i=Number.POSITIVE_INFINITY;#t=0;#r=ut;#s=ut;#o=new F;#n=new F;#a=new F;#l=new F;#c=new F;#h=new F;#p=new F;get active(){return!!this.#e}get darkness(){return this.#t}get outlineVisible(){return this.#e!==null&&this.#i<=Ot}get outlineOpacity(){return Nn(this.#i)}get outlineUrgent(){return this.#i<Lr}setBounds(e){return this.#e=Bn(e)?new ct(e):null,this.#r=ut,this.#s=ut,this.reset()}setSceneMatrix(e){return this.#e?.setSceneMatrix(e),this}reset(){return this.#i=Number.POSITIVE_INFINITY,this.#t=0,this}update(e,t){if(!this.#e)return this.reset();this.#o.from(e),this.#i=zn(this.#e.signedDistance(this.#o));let r=Gn(this.#i),i=t>0?1-Math.exp(-t/kn):1;return this.#t+=(r-this.#t)*i,this.outlineVisible&&this.#f(),this}ribbon(e){let t=this.#r,r=t.length/3;if(!this.#e||r<2)return ut;let i=r*18;this.#s.length!==i&&(this.#s=new Float32Array(i));let n=this.#s,o=e*.5;this.#h.copy(E.Y).transformQuat(this.#e.worldRotation);let a=0;for(let l=0;l<r;l++){let h=(l+1)%r;this.#a.set(t[l*3],t[l*3+1],t[l*3+2]),this.#l.set(t[h*3],t[h*3+1],t[h*3+2]),this.#c.sub(this.#l,this.#a).normalize(),this.#p.cross(this.#h,this.#c).normalize().scale(o),a=this.#u(n,a,this.#a,1),a=this.#u(n,a,this.#l,1),a=this.#u(n,a,this.#l,-1),a=this.#u(n,a,this.#a,1),a=this.#u(n,a,this.#l,-1),a=this.#u(n,a,this.#a,-1)}return n}#u(e,t,r,i){return e[t]=r[0]+this.#p[0]*i,e[t+1]=r[1]+this.#p[1]*i,e[t+2]=r[2]+this.#p[2]*i,t+3}#f(){let e=this.#e,t=Xn(e);this.#r.length!==t*3&&(this.#r=new Float32Array(t*3));let r=this.#r,i=-e.worldHalf[1],n=e.worldPosition,o=0;On(e,(a,l)=>{this.#n.set(a,i,l).transformQuat(e.worldRotation),r[o]=this.#n[0]+n[0],r[o+1]=this.#n[1]+n[1],r[o+2]=this.#n[2]+n[2],o+=3})}};var ft={daylight:{ambient:[3.62,3.54,3.37],topDown:[.5,.45,.4]},cloudy:{ambient:[3.19,3.26,3.44],topDown:[.05,.05,.07]},sunset:{ambient:[4.08,3.01,1.95],topDown:[.25,.12,.02],frontBack:[.15,.06,0],leftRight:[-.3,-.12,0]},indoor:{ambient:[3.72,3.37,2.84],topDown:[.3,.25,.15]},shade:{ambient:[3.12,3.3,3.72],topDown:[.1,.15,.3]},night:{ambient:[2.48,2.66,3.01],topDown:[.08,.1,.15]},off:null};var Dn=2.5,zi=1.6,Hn=.0015,Vn=2,Bi=.5,Un=.6,Wn=.022,Yn=1e-4,Xt=Math.PI/2-.01,Dt=.05,Ht=200,Zn=new Set(["w","a","s","d","r","f","q","e","shift"]),mt=class{#e;#i=new Map;#t=null;#r=1;#s;#o;#n;#a=0;#l=0;#c=0;#h=0;#p=0;#u=e=>e.preventDefault();constructor(e,{pan:t=!0,rotate:r=Dn,onDown:i}={}){this.#e=e,this.#s=t,this.#o=r,this.#n=i,this.#r=e.clientHeight||1,e.addEventListener("contextmenu",this.#u),e.addEventListener("pointerdown",this.#f),e.addEventListener("wheel",this.#g,{passive:!1})}get height(){return this.#r}consume(e){return e.rotX=this.#a,e.rotY=this.#l,e.panX=this.#c,e.panY=this.#h,e.zoom=this.#p,this.#a=this.#l=this.#c=this.#h=this.#p=0,e}dispose(){this.#e.removeEventListener("contextmenu",this.#u),this.#e.removeEventListener("pointerdown",this.#f),this.#e.removeEventListener("wheel",this.#g),window.removeEventListener("pointermove",this.#m),window.removeEventListener("pointerup",this.#d),window.removeEventListener("pointercancel",this.#d),this.#i.clear(),this.#t=null}#f=e=>{this.#e.setPointerCapture?.(e.pointerId),this.#i.size===0&&(window.addEventListener("pointermove",this.#m),window.addEventListener("pointerup",this.#d),window.addEventListener("pointercancel",this.#d)),this.#i.set(e.pointerId,{x:e.clientX,y:e.clientY,button:e.button,touch:e.pointerType==="touch"}),this.#r=this.#e.clientHeight||this.#r,this.#i.size===2&&this.#y(),this.#n?.()};#m=e=>{let t=this.#i.get(e.pointerId);if(!t)return;let r=e.clientX-t.x,i=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,this.#i.size>=2)return this.#x();!t.touch&&(t.button===2||e.buttons===2)?this.#s&&(this.#c+=r,this.#h+=i):(this.#a+=r/this.#r*this.#o,this.#l+=i/this.#r*this.#o)};#d=e=>{this.#e.releasePointerCapture?.(e.pointerId),this.#i.delete(e.pointerId),this.#t=null,this.#i.size===0&&(window.removeEventListener("pointermove",this.#m),window.removeEventListener("pointerup",this.#d),window.removeEventListener("pointercancel",this.#d))};#g=e=>{e.preventDefault(),this.#p+=-e.deltaY*Hn};#y(){let[e,t]=this.#i.values();this.#t={dist:Math.hypot(e.x-t.x,e.y-t.y),cx:(e.x+t.x)/2,cy:(e.y+t.y)/2}}#x(){let[e,t]=this.#i.values(),r=Math.hypot(e.x-t.x,e.y-t.y),i=(e.x+t.x)/2,n=(e.y+t.y)/2,o=this.#t;o&&(o.dist>0&&r>0&&(this.#p+=Math.log(r/o.dist)),this.#s&&(this.#c+=i-o.cx,this.#h+=n-o.cy)),this.#t={dist:r,cx:i,cy:n}}},qn=s=>1-Math.exp(-s/Wn),te=()=>({rotX:0,rotY:0,panX:0,panY:0,zoom:0}),jn=s=>Math.abs(s.rotX)+Math.abs(s.rotY)+Math.abs(s.panX)+Math.abs(s.panY)+Math.abs(s.zoom)<Yn;function Fr(s,e,t,r,i){let n=s.consume(e);if(t.rotX+=n.rotX,t.rotY+=n.rotY,t.panX+=n.panX,t.panY+=n.panY,t.zoom+=n.zoom,jn(t))return!1;let o=qn(i);for(let a of["rotX","rotY","panX","panY","zoom"])r[a]=t[a]*o,t[a]-=r[a];return!0}var Ar=class{#e;#i;#t=T.create();#r=T.create();#s=T.create();#o=T.create();#n=T.create();#a=T.create();#l=1;#c=0;#h=0;#p=!1;#u=te();#f=te();#m=te();constructor(e,t){this.#e=e,this.#i=new mt(t),this.#b()}get type(){return"orbit"}update(e){this.#g(e)&&this.#b()}frame(e,t){this.#v(e,t)}reset(e,t){this.#v(e,t)}zoom(e){e>0&&(this.#f.zoom+=Math.log(e))}applyConstraints(e){this.#p=e,this.#h=x.clamp(this.#h,-Xt,this.#d),this.#b()}dispose(){this.#i.dispose()}get#d(){return this.#p?0:Xt}#g(e){if(!Fr(this.#i,this.#u,this.#f,this.#m,e))return!1;let t=this.#m;return this.#c+=t.rotX,this.#h=x.clamp(this.#h-t.rotY,-Xt,this.#d),t.zoom&&(this.#l=x.clamp(this.#l*Math.exp(-t.zoom),Dt,Ht)),(t.panX||t.panY)&&this.#x(t.panX,t.panY),!0}#y(){this.#o.yawPitchBasis(this.#c,this.#h,this.#r,this.#s,this.#n)}#x(e,t){this.#y();let r=x.perspectiveScale(this.#l,this.#e.fov,this.#i.height)*zi;this.#t.addScaled(this.#o,-e*r).addScaled(this.#n,t*r)}#b(){this.#y(),this.#e.position.copy(this.#s).scale(this.#l).add(this.#t),this.#e.setAxes(this.#o,this.#n,this.#s)}#v(e,t){this.#t.from(e),this.#s.sub(this.#a.from(t),this.#t),this.#l=x.clamp(this.#s.len,Dt,Ht),this.#r.copy(this.#s).scale(-1).normalize(E.FORWARD),this.#a.yawPitch(this.#r),this.#c=this.#a.x,this.#h=x.clamp(this.#a.y,-Xt,this.#d),this.#f=te(),this.#b()}},kr=class{#e;#i;#t=new Set;#r=K.create();#s=T.create();#o=T.create();#n=T.create();#a=T.create();#l=T.create();#c=te();#h=te();#p=te();constructor(e,t){this.#e=e,t.hasAttribute("tabindex")||(t.tabIndex=0),this.#i=new mt(t,{pan:!1,onDown:()=>t.focus()}),window.addEventListener("keydown",this.#d),window.addEventListener("keyup",this.#g)}get type(){return"fly"}update(e){let t=this.#u(e);this.#f(e)&&(t=!0),t&&this.#m()}frame(e,t){this.reset(e,t)}reset(e,t){this.#e.position.from(t),this.#s.sub(this.#l.from(e),this.#e.position).normalize(E.FORWARD),this.#l.yawPitch(this.#s),this.#r.identity().rotate(E.Y,-this.#l.x).rotate(E.X,this.#l.y),this.#h=te(),this.#m()}zoom(e){e>0&&(this.#h.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#i.dispose(),window.removeEventListener("keydown",this.#d),window.removeEventListener("keyup",this.#g),this.#t.clear()}#u(e){let t=Vn*e*(this.#t.has("shift")?4:1),r=this.#e.position,i=!1,n=(a,l)=>{r.addScaled(a,l),i=!0},o=a=>{this.#r.rotate(E.Z,a),i=!0};return this.#t.has("w")&&n(this.#s,t),this.#t.has("s")&&n(this.#s,-t),this.#t.has("d")&&n(this.#n,t),this.#t.has("a")&&n(this.#n,-t),this.#t.has("r")&&n(this.#a,t),this.#t.has("f")&&n(this.#a,-t),this.#t.has("q")&&o(Bi*e),this.#t.has("e")&&o(-Bi*e),i}#f(e){if(!Fr(this.#i,this.#c,this.#h,this.#p,e))return!1;let t=this.#p;return t.rotX&&this.#r.rotate(E.Y,-t.rotX),t.rotY&&this.#r.rotate(E.X,-t.rotY),t.zoom&&this.#e.position.addScaled(this.#s,t.zoom*Un),!0}#m(){this.#r.normalize(),this.#n.copy(E.X).transformQuat(this.#r),this.#a.copy(E.Y).transformQuat(this.#r),this.#o.copy(E.Z).transformQuat(this.#r),this.#s.copy(this.#o).scale(-1),this.#e.setAxes(this.#n,this.#a,this.#o)}#d=e=>{let t=e.key.toLowerCase();!Zn.has(t)||this.#y()||(this.#t.add(t),e.preventDefault())};#g=e=>{this.#t.delete(e.key.toLowerCase())};#y(){let e=document.activeElement;return e?.tagName==="INPUT"||e?.tagName==="TEXTAREA"||e?.isContentEditable}},Ir=class{#e;#i;#t=T.create();#r=T.create();#s=T.create().copy(E.Y);#o=T.create();#n=T.create();#a=T.create();#l=T.create();#c=T.create();#h=T.create();#p=K.create();#u=te();#f=te();#m=te();constructor(e,t){this.#e=e,this.#i=new mt(t)}get type(){return"trackball"}update(e){if(!Fr(this.#i,this.#u,this.#f,this.#m,e))return;let t=this.#m;(t.rotX||t.rotY)&&this.#g(t.rotX,t.rotY),t.zoom&&this.#y(t.zoom),(t.panX||t.panY)&&this.#x(t.panX,t.panY),this.#b()}frame(e,t){this.#v(e,t)}reset(e,t){this.#v(e,t)}zoom(e){e>0&&(this.#f.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#i.dispose()}#d(){this.#o.copy(this.#r).normalize(E.Z),this.#n.cross(this.#s,this.#o).normalize(E.X),this.#a.cross(this.#o,this.#n)}#g(e,t){this.#d(),this.#l.copy(this.#n).scale(e).addScaled(this.#a,-t);let r=this.#l.len;r<1e-6||(this.#c.cross(this.#l,this.#r).normalize(E.Y),this.#p.setAxisAngle(this.#c,r),this.#r.transformQuat(this.#p),this.#s.transformQuat(this.#p).normalize())}#y(e){this.#r.setLength(x.clamp(this.#r.len*Math.exp(-e),Dt,Ht))}#x(e,t){this.#d();let r=x.perspectiveScale(this.#r.len,this.#e.fov,this.#i.height)*zi;this.#t.addScaled(this.#n,-e*r).addScaled(this.#a,t*r)}#b(){this.#e.up.copy(this.#s),this.#e.position.copy(this.#t).add(this.#r),this.#e.lookAt(this.#t)}#v(e,t){this.#t.from(e),this.#r.sub(this.#h.from(t),this.#t),this.#r.setLength(x.clamp(this.#r.len,Dt,Ht)),this.#s.copy(E.Y),this.#d(),this.#s.copy(this.#a),this.#f=te(),this.#b()}};function Br(s,e,t){switch(s){case"fly":return new kr(e,t);case"trackball":return new Ir(e,t);default:return new Ar(e,t)}}var zr=class{position=T.create();target=T.create();up=T.create().copy(E.Y);matrixWorld=D.create();projectionMatrix=D.create();fov;aspect;near;far;constructor(e=60,t=1,r=.05,i=1e4){this.fov=e,this.aspect=t,this.near=r,this.far=i,this.updateProjectionMatrix(),this.updateMatrixWorld()}lookAt(e){return this.target.from(e),this.updateMatrixWorld()}updateProjectionMatrix(){this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far)}updateMatrixWorld(){return this.matrixWorld.cameraWorld(this.position,this.target,this.up),this.matrixWorld}setAxes(e,t,r){return this.up.copy(t),this.target.copy(this.position).addScaled(r,-1),this.matrixWorld.cameraWorldAxes(this.position,e,t,r)}},Gi=1.5,Ni=1,Qn=[0,.4,0],$n=-.25,Vt=class{#e=D.create();#i=T.create();#t=T.create();#r;#s;#o;#n=!1;#a=!1;#l=1;#c=null;#h=null;constructor(e,t="orbit"){this.#o=e,this.#r=new zr,this.#s=Br(t,this.#r,e),this.#p()}get canPresent(){return this.#n}get controls(){return this.#s}get controlsType(){return this.#s.type}setControls(e){e!==this.#s.type&&(this.#s.dispose(),this.#s=Br(e,this.#r,this.#o),this.reset(),this.#s.applyConstraints(this.#a))}setSceneTransform(e){e?this.#e.fromTransform(e):this.#e.identity(),this.#a=!!e,this.#s.applyConstraints(this.#a),this.#n=!1}setAudioPosition(e){e?this.#i.fromXYZ(e):this.#i.set(0,0,0)}setViewZSign(e){this.#l=e<0?-1:1,this.#n=!1}setBBox(e){if(!e)return;this.#e.pointTo(this.#t,It.center(this.#t,e)).addXYZ(0,$n);let t=this.#t.toArray(),r=[0,Gi,Ni*this.#l];this.#c=t,this.#h=r,this.#s.frame(t,r),this.#n=!0}update(e){this.#s.update(e)}apply(e,t,r){e.setModelMatrix(this.#e),t>0&&r>0&&(this.#r.aspect=t/r,this.#r.updateProjectionMatrix()),e.setCamera(this.#r.matrixWorld,this.#r.projectionMatrix),this.#n&&(e.setAudioSourceMatrix(this.#e,this.#i),e.setAudioListenerMatrix(this.#r.matrixWorld))}zoom(e){this.#s.zoom(e)}reset(){this.#c&&this.#h?(this.#s.frame(this.#c,this.#h),this.#n=!0):this.#p()}dispose(){this.#s.dispose()}#p(){this.#s.reset(Qn,{x:0,y:Gi,z:Ni}),this.#n=!1}};var Ut=class{#e;#i;#t;#r;#s;#o;#n;#a;#l=null;#c=!1;#h=!1;#p=!1;#u=null;#f=0;onFrame=null;onBeforeRender=null;onEyeRender=null;onASWRender=null;onRefReset=null;onSessionEnd=null;externalLayers=[];constructor(e,t){this.#e=e,this.#i=t}get session(){return this.#t}get active(){return!!this.#t}get aswAvailable(){return!!this.onASWRender}get aswActive(){return this.#c&&!!this.#t}get layeredActive(){return this.#h&&!!this.#t}get isAR(){return this.#p&&!!this.#t}get defaultDt(){return 1/(this.#c?36:72)}get binding(){return this.#s}get refSpace(){return this.#r}set soundPosition(e){this.#u=e?[e.x,e.y,e.z]:null}async enter(e=!1){if(!navigator.xr||this.#t)return{isQuest:!1,isPico:!1,isAVP:!1};let t=this.#i,r=this.#e;this.#p=e,this.#l=t.getExtension("OCULUS_multiview")||t.getExtension("OVR_multiview2")||null;let i=navigator.userAgent,n=/PicoBrowser/i.test(i),o=/OculusBrowser/i.test(i)&&!n,a=/Version\//.test(i)&&/Safari\//.test(i)&&!o&&!n;if(this.#t=await navigator.xr.requestSession(e?"immersive-ar":"immersive-vr",{optionalFeatures:["local-floor",e&&"local",o&&"layers",o&&"space-warp",(o||n)&&"hand-tracking"].filter(Boolean)}),!this.#t)throw new Error(`Failed to start ${e?"AR":"VR"} session`);let l=new Set(this.#t.enabledFeatures??[]);for(let c of["local-floor","local","viewer"])try{this.#r=await this.#t.requestReferenceSpace(c);break}catch{}this.#r?.addEventListener("reset",()=>this.onRefReset?.()),this.#h=this.#c=!1;let h=n?.75:1;if(l.has("layers"))try{t.getExtension("EXT_color_buffer_half_float"),this.#s=new XRWebGLBinding(this.#t,t),this.#o=this.#s.createProjectionLayer({textureType:"texture-array",depthFormat:t.DEPTH_COMPONENT24,scaleFactor:h,...e&&{clearOnAccess:!1}}),this.#h=!0,this.#c=l.has("space-warp"),!this.#c&&this.#o.fixedFoveation!==void 0&&(this.#o.fixedFoveation=1),await this.#t.updateRenderState({layers:[this.#o]}),this.#n=t.createFramebuffer(),this.#c&&(this.#a=t.createFramebuffer())}catch{this.#h=this.#c=!1,this.#s=this.#o=null}if(!this.#h){let c=new XRWebGLLayer(this.#t,t,{framebufferScaleFactor:h,...e&&{alpha:!0}});c.fixedFoveation!==void 0&&(c.fixedFoveation=1),await this.#t.updateRenderState({baseLayer:c})}return r.resetXR(),this.#t.addEventListener("end",()=>this.#y()),this.#f=0,this.#t.requestAnimationFrame(this.#m),{isQuest:o,isPico:n,isAVP:a}}#m=(e,t)=>{let r=this.#t;if(!r)return;r.requestAnimationFrame(this.#m);let i=x.deltaSeconds(e,this.#f,this.defaultDt,4*this.defaultDt);this.#f=e,this.onFrame?.(i,t)};exit(){this.#t?.end()}renderFrame(e,t,r=1){let i=this.#e,n=this.#i,o=t.getViewerPose(this.#r);if(!o||o.views.length<1)return;let a=this.#x(o);if(!this.#p&&a.length<2){this.#d(i,o,r);return}(a.length>=2||this.#p)&&(this.onBeforeRender?.(e,t,this.#r,o,t.session.inputSources,i),this.#g());let l=a[1]??null;i.setCamera(a[0].transform.matrix,a[0].projectionMatrix,l?.transform.matrix,l?.projectionMatrix),this.#c?this.#w(n,i,a):this.#h?this.#_(n,i,a):this.#T(n,i,a,t),this.#d(i,o,r)}#d(e,t,r){let i=this.#u;if(!i){let o=e.getBBox();o&&(i=[(o.minX+o.maxX)*.5,(o.minY+o.maxY)*.5,(o.minZ+o.maxZ)*.5])}let n=e.getModelMatrix();i&&n&&e.setAudioSourceMatrix(n,i,r),e.setAudioListenerMatrix(t.transform.matrix)}#g(){!this.#t||!this.#h||this.#t.updateRenderState({layers:[this.#o,...this.externalLayers]})}#y=()=>{if(!this.#t)return;let e=this.#i;this.#n&&(e.deleteFramebuffer(this.#n),this.#n=null),this.#a&&(e.deleteFramebuffer(this.#a),this.#a=null),this.#t=this.#r=this.#o=this.#s=null,this.#c=this.#h=this.#p=!1,this.#f=0,this.externalLayers=[],this.onSessionEnd?.()};#x(e){if(e.views.length<2)return[e.views[0]];let t=e.views.find(i=>i.eye==="left")||e.views[0],r=e.views.find(i=>i.eye==="right")||e.views[1];return[t,r]}#b(e,t){e.bindFramebuffer(e.FRAMEBUFFER,t),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.clearColor(0,0,0,this.#p?0:1)}#v(e,t,r,i,n,o,a,l,h,c=e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT){e.viewport(n,o,a,l),e.clear(c),t.render(t.drawMode,n,o,a,l,h),this.onEyeRender?.(e,r,i,n,o,a,l)}#T(e,t,r,i){let n=i.session.renderState.baseLayer,o=r.map(a=>n.getViewport(a));t.preprocess(o[0].width,o[0].height),e.bindFramebuffer(e.FRAMEBUFFER,n.framebuffer),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.clearColor(0,0,0,this.#p?0:1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.disable(e.DEPTH_TEST),e.depthMask(!1);for(let a=0;a<r.length;a++){let l=o[a];t.render(t.drawMode,l.x,l.y,l.width,l.height,a),this.onEyeRender?.(e,n.framebuffer,r[a],l.x,l.y,l.width,l.height)}}#_(e,t,r){let i=r.map(a=>this.#s.getViewSubImage(this.#o,a)),n=i[0].colorTextureWidth,o=i[0].colorTextureHeight;t.preprocess(n,o),this.#b(e,this.#n);for(let a=0;a<r.length;a++){let l=i[a],h=l.imageIndex??a;e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.colorTexture,0,h),l.depthStencilTexture&&e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,h),this.#v(e,t,this.#n,r[a],0,0,n,o,a)}e.bindFramebuffer(e.FRAMEBUFFER,null)}#w(e,t,r){let i=r.map(c=>this.#s.getViewSubImage(this.#o,c)),n=i[0].colorTextureWidth,o=i[0].colorTextureHeight,a=i.map((c,p)=>c.imageIndex??p);this.#o&&(this.#o.deltaPose=null),t.preprocess(n,o),this.#b(e,this.#n);for(let c=0;c<r.length;c++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[c].colorTexture,0,a[c]),this.#v(e,t,this.#n,r[c],0,0,n,o,c,e.COLOR_BUFFER_BIT);let l=i[0];if(l.motionVectorTexture&&l.depthStencilTexture){let c=l.motionVectorTextureWidth,p=l.motionVectorTextureHeight,u=t.canMotion();if(e.bindFramebuffer(e.FRAMEBUFFER,this.#a),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),e.clearColor(0,0,0,0),e.clearDepth(1),this.#l&&a.length>=2&&a[1]===a[0]+1&&t.hasMultiview())this.#l.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.motionVectorTexture,0,a[0],2),this.#l.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,a[0],2),e.viewport(0,0,c,p),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),u&&t.renderMotionMV(0,0,c,p);else for(let f=0;f<r.length;f++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[f].motionVectorTexture,0,a[f]),e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,i[f].depthStencilTexture,0,a[f]),e.viewport(0,0,c,p),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),u&&t.render(3,0,0,c,p,f);let d=(f,g,m)=>({view:f,colorTex:g.colorTexture,colorIdx:m,mvTex:g.motionVectorTexture,mvIdx:m,depthTex:l.depthStencilTexture,w:n,h:o,mvW:c,mvH:p});this.onASWRender?.(e,r.map((f,g)=>d(f,i[g],a[g])))}else this.onASWRender?.(e,r.map((c,p)=>({view:c,colorTex:i[p].colorTexture,colorIdx:a[p],w:n,h:o})));e.bindFramebuffer(e.FRAMEBUFFER,null)}};var Xi=D.create().fromScaling(E.FLIP_Z),Kn=D.create().fromScaling(E.FLIP_X),Jn=s=>s<0?Kn:Xi,Wt=D.create().copy(Xi).multiply(D.create().fromTranslation([0,1,-1])),eo=.04,be=T.create(),gt=T.create(),Oi=T.create(),Yt=class{#e=T.create();#i=K.create();#t=1;#r=T.create();#s=D.clone(Wt);#o=Wt;#n=D.create();#a=D.create();#l="none";#c=T.create();#h={mid:T.create(),dist:0,axX:0,axZ:0};#p="undecided";#u=0;#f=0;#m=!1;#d=!1;#g=!1;get position(){return this.#e}get scale(){return this.#t}get sceneTransform(){return this.#s}get scaleLocked(){return this.#m}set scaleLocked(e){this.#m=!!e}setCenter(e,t,r){this.#r.set(e,t,r)}setSceneTransform(e,t=1){this.#o=e?Jn(t):Wt,e?this.#s.fromTransform(e).preMultiply(this.#o):this.#s.copy(Wt)}resetToInitial(){this.#e.set(0,0,0),this.#t=1,this.#i.identity()}reset(){this.#l="none"}isHeld(e){return this.#l==="dual"||this.#l===e}update(e,t,r,i,n=!0){for(let p of r)this.#v(p,i);let o=e.gripTransform?.position,a=t.gripTransform?.position,l=n&&e.active&&e.gripping&&!!o,h=n&&t.active&&t.gripping&&!!a,c=l&&e.grabRestart||h&&t.grabRestart;l&&h?this.#b(o,a,c):l?this.#x("left",o,c):h?this.#x("right",a,c):this.reset()}buildModelMatrix(){return this.#y(this.#n,this.#s)}buildSceneMatrix(){return this.#y(this.#a,this.#o)}#y(e,t){return be.copy(this.#r).transformMat4(this.#s),gt.set(this.#t,this.#t,-this.#t),e.fromPivot(this.#e,this.#i,gt,be,t)}#x(e,t,r){if(r||this.#l!==e){this.#l=e,this.#c.fromXYZ(t);return}if(be.fromXYZ(t).sub(this.#c),be.sqrLen>.01){this.#c.fromXYZ(t);return}this.#e.add(be),this.#c.fromXYZ(t)}#b(e,t,r){be.midXYZ(e,t);let i=gt.fromXYZ(e).distanceXYZ(t),n=i||1,o=(t.x-e.x)/n,a=(t.z-e.z)/n,l=this.#h;if(r||this.#l!=="dual"){this.#l="dual",l.mid.copy(be),l.dist=i,l.axX=o,l.axZ=a,this.#p="undecided",this.#u=0,this.#f=0;return}let h=0;l.dist>.03&&i>.03&&(h=x.absLogRatio(i,l.dist));let c=l.axX,p=l.axZ;l.axX=o,l.axZ=a;let u=x.unlerp01(Math.min(Math.hypot(c,p),Math.hypot(o,a)),.08,.33),d=0;if(u>0&&(d=x.wrapPi(Math.atan2(a,o)-Math.atan2(p,c))*u),this.#p==="undecided"){this.#u+=h,this.#f+=Math.abs(d);let f=eo;(this.#u>=f||this.#f>=f)&&(this.#p=this.#u>=this.#f?"scale":"rotate")}if(this.#p==="scale"&&!this.#m&&l.dist>.03&&i>.03){let f=this.#t;this.#t=x.clamp(f*(i/l.dist),.01,100);let g=this.#t-f;gt.copy(this.#r).transformMat4(this.#s),this.#e.add(Oi.copy(gt).multiplyXYZ(-g,-g,g))}this.#p==="rotate"&&x.outside(d,5e-4)&&this.#i.rotatePre(E.Y,d),this.#e.add(Oi.sub(be,l.mid)),l.mid.copy(be),l.dist=i}#v(e,t){let r=e.gamepad;if(!r?.axes||r.axes.length<2)return;if(e.handedness==="right"){let o=3.5*t,a=r.axes.length>=4?2:0,l=x.deadzone(r.axes[a],.15),h=x.deadzone(r.axes[a+1],.15);l&&this.#i.rotatePre(E.Z,-l*o),h&&this.#i.rotatePre(E.X,h*o)}let i=r.buttons?.[3]?.pressed??!1;e.handedness==="left"?(i&&!this.#d&&this.resetToInitial(),this.#d=i):(i&&!this.#g&&this.resetToInitial(),this.#g=i)}};var Zt=class{on=!1;#e=-1;update(e){this.#e<0?this.#e=e:this.#e=e>this.#e?e:(this.#e+e)*.5,this.on=this.#e<(this.on?.018:.015)}reset(){this.on=!1,this.#e=-1}},qt=class s{static#e=30;static#i=300;static#t=.02;#r=T.create();#s=!1;#o=0;#n=null;tapped=!1;update(e,t){if(this.tapped=!1,e&&!this.#s)this.#o=performance.now(),this.#n=t?{x:t.x,y:t.y,z:t.z}:null;else if(!e&&this.#s){let r=performance.now()-this.#o,i=this.#n,n=i&&t?this.#r.fromXYZ(t).distanceXYZ(i):0;r>=s.#e&&r<=s.#i&&n<s.#t&&(this.tapped=!0)}this.#s=e}reset(){this.#s=!1,this.tapped=!1,this.#n=null}},jt=class s{static#e=30;static#i=300;#t=!1;#r=0;tapped=!1;update(e){if(this.tapped=!1,e&&!this.#t)this.#r=performance.now(),this.#t=!0;else if(!e&&this.#t){let t=performance.now()-this.#r;t>=s.#e&&t<=s.#i&&(this.tapped=!0),this.#t=!1}}reset(){this.#t=!1,this.tapped=!1}},Qt=class{#e=[!1,!1];update(e){if(!e||e.length<=6)return 0;let t=e[5]?.pressed??!1,r=e[6]?.pressed??!1,i=t&&!this.#e[0]?-1:r&&!this.#e[1]?1:0;return this.#e[0]=t,this.#e[1]=r,i}reset(){this.#e[0]=this.#e[1]=!1}},$t=class{#e;left={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};right={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};stickSrcs=[];#i=null;#t=null;#r;#s;#o;#n;#a=new jt;#l=new jt;constructor({directGrab:e=!1}={}){this.#n=e,this.#e=K.create().setAxisAngle(E.X,-.8),this.#s=T.create(),this.#o=K.create(),this.#r=new Map([[this.left,{side:"left",pinch:new Zt,tap:new qt,swipe:new Qt,smooth:T.create(),smoothActive:!1,rayPos:T.create(),rayOri:K.create(),rayActive:!1}],[this.right,{side:"right",pinch:new Zt,tap:new qt,swipe:new Qt,smooth:T.create(),smoothActive:!1,rayPos:T.create(),rayOri:K.create(),rayActive:!1}]])}#c(e){e.active=e.gripping=e.isHandProfile=e.grabRestart=e.triggerPressed=e.menuPressed=e.isTransientPointer=!1,e.microSwipe=0,e.rayTransform=e.gripTransform=e.indexTip=e.thumbTip=null}read(e,t,r,i){this.#c(this.left),this.#c(this.right),this.stickSrcs.length=0;let n=null,o=null;for(let a of r||[]){if(a.targetRayMode==="transient-pointer"){let h=e.getPose(a.targetRaySpace,t);if(!h)continue;let p=((a.gripSpace?e.getPose(a.gripSpace,t):null)??h).transform,u=this.#h(a,p.position,n,o);this.#p(u,h.transform,p,a,i),u===this.left?n=a:o=a;continue}a.gripSpace&&!a.hand&&a.gamepad?.axes?.length>=2&&!a.profiles?.some(h=>h.includes("hand"))&&this.stickSrcs.push(a);let l=a.handedness==="left"?this.left:a.handedness==="right"?this.right:null;!l||l.active||(a.hand?this.#u(l,a,e,t,i):a.gripSpace&&this.#f(l,a,e,t,i))}this.#i=n,this.#t=o,(n||o)&&(this.stickSrcs.length=0,n||(this.left.gripping=!1),o||(this.right.gripping=!1)),i.uiActive?(this.#a.reset(),this.#l.reset()):(this.#a.update(!!n),this.#l.update(!!o)),this.#a.tapped&&(this.left.menuPressed=!0),this.#l.tapped&&(this.right.menuPressed=!0);for(let[a,l]of this.#r)a.indexTip||(l.pinch.reset(),l.tap.reset(),l.swipe.reset(),l.smoothActive=!1,l.rayActive=!1)}#h(e,t,r,i){if(e.handedness==="left")return this.left;if(e.handedness==="right")return this.right;if(r&&!i)return this.right;if(i&&!r)return this.left;let n=this.left.gripTransform?.position,o=this.right.gripTransform?.position,a=n?this.#s.fromXYZ(t).distanceXYZ(n):1/0,l=o?this.#s.fromXYZ(t).distanceXYZ(o):1/0;return a<=l?this.left:this.right}#p(e,t,r,i,{isHeld:n,hitTest:o,uiActive:a}){e.rayTransform=t,e.gripTransform=r,e.active=e.triggerPressed=e.isTransientPointer=!0;let{side:l}=this.#r.get(e),h=l==="left"?this.#i:this.#t,c=h!=null&&h!==i,p=h===i;!c&&n(l)?e.gripping=!0:a||(this.#n&&p||!this.#n&&o&&o(t)||n(l==="left"?"right":"left"))&&(e.gripping=!0,c&&(e.grabRestart=!0))}#u(e,t,r,i,{isHeld:n,uiActive:o,viewerPose:a}){let l=t.hand.get("wrist");if(!l)return;let h=r.getJointPose?.(l,i);if(!h)return;e.gripTransform=h.transform;let c=this.#m(t.hand,"index-finger-tip",r,i),p=this.#m(t.hand,"thumb-tip",r,i),u=this.#m(t.hand,"index-finger-phalanx-proximal",r,i);c&&(e.indexTip=c.transform.position),p&&(e.thumbTip=p.transform.position);let d=this.#r.get(e);if(u){this.#o.fromXYZW(h.transform.orientation).mul(this.#e);let g=d.rayPos,m=d.rayOri;d.rayActive?(g.lerp(this.#s.fromXYZ(u.transform.position),.5),m.slerp(this.#o,.5)):(g.fromXYZ(u.transform.position),m.copy(this.#o),d.rayActive=!0),e.rayTransform={position:g.toXYZ(),orientation:m.toXYZW()}}else e.rayTransform=c?.transform??null,d.rayActive=!1;if(c&&p){let g=c.transform.position,m=p.transform.position;d.pinch.update(this.#s.fromXYZ(g).distanceXYZ(m)),e.gripping=e.triggerPressed=d.pinch.on}else{d.pinch.reset();let g=t.gamepad?.buttons?.[0];e.gripping=g?g.pressed||g.value>.5:!1,e.triggerPressed=e.gripping}o?(d.tap.reset(),n(d.side)||(e.gripping=!1)):(d.tap.update(d.pinch.on,h.transform.position),d.tap.tapped&&(e.menuPressed=!0)),e.gripping&&!n(d.side)&&!this.#g(h.transform.position,a)&&(e.gripping=!1),e.active=!0,e.microSwipe=d.swipe.update(t.gamepad?.buttons);let f=d.smooth;d.smoothActive||(f.fromXYZ(h.transform.position),d.smoothActive=!0),f.lerp(this.#s.fromXYZ(h.transform.position),.4),e.gripTransform={position:f.toXYZ(),orientation:h.transform.orientation}}#f(e,t,r,i,{isHeld:n,uiActive:o,viewerPose:a}){let l=r.getPose(t.gripSpace,i);l&&(e.gripTransform=l.transform);let h=r.getPose(t.targetRaySpace,i);if(h&&(e.rayTransform=h.transform),!e.gripTransform&&!e.rayTransform)return;if(e.isHandProfile=t.profiles?.some(u=>u.includes("hand"))??!1,t.targetRayMode==="tracked-pointer"&&t.gamepad?.buttons?.[0]){let u=t.gamepad.buttons[0],d=u.pressed||u.value>.5;e.gripping=e.isHandProfile?d:t.gamepad?.buttons?.[1]?.pressed??!1}else e.gripping=t.gamepad?.buttons?.[1]?.pressed??!1;e.triggerPressed=t.gamepad?.buttons?.[0]?.pressed??!1;let c=t.gamepad?.buttons;e.menuPressed=!!(c?.[4]?.pressed||c?.[5]?.pressed);let{side:p}=this.#r.get(e);e.isHandProfile&&e.gripping&&!n(p)&&(o||!this.#g(e.gripTransform?.position,a))&&(e.gripping=!1),e.gripping&&!e.gripTransform&&(e.gripping=!1),e.active=!0,e.isHandProfile&&e.rayTransform&&(e.rayTransform=this.#d(e.rayTransform.orientation,e.rayTransform.position))}#m(e,t,r,i){let n=e.get(t);return n?r.getJointPose?.(n,i)??null:null}#d(e,t){return this.#o.fromXYZW(e).mul(this.#e),{position:t,orientation:this.#o.toXYZW()}}#g(e,t){if(!t||!e)return!0;let r=t.position;this.#s.subXYZ(e,r).transformQuat(this.#o.fromXYZW(t.orientation).invert());let i=this.#s.xzLen;return i<.05||this.#s.y>-1.19*i}};var Ve=class{#e;#i;#t;#r;#s=!0;#o=!1;#n=!1;#a=!1;#l=!1;constructor(e,t=null,{directGrab:r=!1}={}){this.#e=e,this.#i=t,this.#t=new $t({directGrab:r}),this.#r=new Yt}setOverlay(e){this.#i=e,this.#s=!0}get#c(){return this.#i?this.#i.hasBBox:this.#o}reset(){this.#r.reset(),this.#a=this.#l=!1}invalidateBBox(){this.#s=!0}setInitialTransform(e,t=1){this.#r.setSceneTransform(e,t),this.#s=!0,this.#h()}get scene(){return this.#i?.scene??null}get scale(){return this.#r.scale}get sceneMatrix(){return this.#r.buildSceneMatrix()}get leftHand(){return this.#t.left}get rightHand(){return this.#t.right}get locked(){return this.#n}set locked(e){this.#n=!!e,this.#n&&this.#r.reset()}get scaleLocked(){return this.#r.scaleLocked}set scaleLocked(e){this.#r.scaleLocked=e}resetToInitial(){this.#r.resetToInitial(),this.#r.reset()}update(e,t,r,i,n,o=!1){let a=t.getViewerPose(r);this.#t.read(t,r,i,{isHeld:c=>this.#r.isHeld(c),hitTest:c=>this.#i?.hitTest(c)??!1,uiActive:n,viewerPose:a?.transform??null}),(this.#s||!this.#c)&&this.#p();let l=this.#t.left,h=this.#t.right;if(l.held=h.held=!1,!this.#n){this.#r.update(l,h,this.#t.stickSrcs,e,this.#c&&!o);let c=this.#r.isHeld("left"),p=this.#r.isHeld("right");l.held=c&&this.#a,h.held=p&&this.#l,this.#a=c,this.#l=p}this.#h()}#h(){this.#c&&this.#i?.applyTransform(this.#r.position,this.#r.scale),this.#e.setModelMatrix?.(this.#r.buildModelMatrix())}#p(){let e=this.#e.getBBox?.();if(!e)return;let t,r,i;this.#i?{cx:t,cy:r,cz:i}=this.#i.rebuildBBox(e,this.#r.sceneTransform):(t=(e.minX+e.maxX)/2,r=(e.minY+e.maxY)/2,i=(e.minZ+e.maxZ)/2,this.#o=!0),this.#r.setCenter(t,r,i),this.#s=!1}};var Di=s=>s?.staticUrl||s?.staticTransform?-1:1;function Hi(){let s=document.createElement("canvas");return s.style.display="block",s.style.width="100%",s.style.height="100%",s.style.touchAction="none",s}var Ue=class s{#e=null;#i;#t=null;#r=null;#s=null;#o=null;#n=0;#a=0;#l=null;#c=!1;#h=!1;#p=0;#u="pw";#f="pw";#m=null;#d=!1;#g={};#y=null;#x=1;#b=null;#v=null;#T=0;#_=!1;#w=[];#S=-1;onProgress=null;onReady=null;onError=null;onFrame=null;onBeforeFrame=null;onModeChange=null;onSceneChange=null;static async create(e,{container:t,overlay:r=null,mode:i="pw"}={}){if(!t)throw new Error("container element required");if(!navigator.gpu)throw new Error("WebGPU not available");let n=new s;n.#l=r,r&&(r.onSceneChange=(a,l)=>n.loadScene(l)),navigator.xr&&(n.#g.vr=await navigator.xr.isSessionSupported("immersive-vr").catch(()=>!1),n.#g.ar=await navigator.xr.isSessionSupported("immersive-ar").catch(()=>!1));let o=i==="hw"?"hw":i==="vr"||i==="ar"?i:"pw";return n.#i=Hi(),t.appendChild(n.#i),n.#e=await De.create(e,{canvas:n.#i,backend:o==="hw"?"hybrid":"pure"}),n.#V(),await n.#L(o),n.#u=o,n}get player(){return this.#e}get camera(){return this.#r}get canvas(){return this.#i}get gl(){return this.#e?.gl??null}get audioContext(){return this.#e?.audioContext??null}get device(){return this.#e?.device??null}get mode(){return this.#u}get fallbackMode(){return this.#f}get xr(){return this.#s}get manipulator(){return this.#o}get drawMode(){return this.#e.drawMode}set drawMode(e){this.#e.drawMode=e}supports(e){return e==="pw"||e==="hw"||!!this.#g[e]}set sources(e){this.#w=e??[],this.#S=Math.min(this.#S,Math.max(0,this.#w.length-1)),this.#l&&(this.#l.sources=this.#w)}get sources(){return this.#w}get sceneIndex(){return this.#S}loadScene(e){let t=this.#w;if(e<0||e>=t.length)return;let r=t[e];this.#S=e,this.#b=null,this.#x=Di(r),this.setInitialTransform(r.initialTransform??null),this.setBackground(r.background??"#000"),r.controls&&this.setControls(r.controls),this.setBounds(r.bounds??null),this.#o&&(this.#o.locked=r.locked??this.#o.locked,this.#o.scaleLocked=r.scaleLocked??this.#o.scaleLocked);let i=r.staticTransform??null,n=r.staticUrl??null;this.#O(async o=>{if(n){let a=new File([await(await fetch(n)).arrayBuffer()],"static.sog");if(!o()||(await this.#e.open({file:a,type:"static"}),!o()))return}await this.#e.open(r),o()&&i&&this.#A(i)}),this.setAudioPosition(r.audioPosition??null),this.#l&&(this.#l.sceneIndex=e),this.onSceneChange?.(r,e)}start(){this.#c=!0,this.#F()}stop(){this.#c=!1,this.#E()}open(e){return this.#x=Di(e),this.setInitialTransform(e.initialTransform??null),this.setBounds(e.bounds??null),this.setAudioPosition(e.audioPosition??null),this.#O(()=>this.#e.open(e))}close(){++this.#p,this.#C(),this.#e.close(),this.#h=!1,this.#c=!1;let e=this.#u,t=this.#f,r=t!=="pw"?"hybrid":"pure";r!==this.#e.backend&&this.#H(r),this.#R(),this.#u=t,t!==e&&this.onModeChange?.(t,e)}async setMode(e){if(this.#m=e,!this.#d){this.#d=!0;do e=this.#m,this.#m=null,e!==this.#u&&await this.#M(e);while(this.#m!=null);this.#d=!1}}async#M(e){let t=this.#u;await this.#B();try{await this.#z(e)}catch(r){if(e===this.#f)throw r;this.onError?.(r),await this.#z(this.#f)}this.#u!==t&&this.onModeChange?.(this.#u,t)}setAudio(e){this.#e.loadAudio(e)}setVolume(e){this.#e?.setVolume(e)}enableAudio(){this.#e?.enableAudio()}disableAudio(){this.#e?.disableAudio()}get audioEnabled(){return this.#e?.audioEnabled??!1}setAudioPanner(e){this.#e?.setAudioPanner(e)}setBackground(e){this.#i&&(this.#i.style.background=e||"#000")}setInitialTransform(e,t=null){this.#y=e??null,this.#r?.setSceneTransform(this.#y),this.#r?.setViewZSign(this.#x),this.#o&&(this.#o.setInitialTransform(this.#y,this.#x),!this.#h&&this.#w[this.#S]?.resetPositionOnStart!==!1&&this.#o.resetToInitial()),t?.translation&&t.rotation&&t.scale&&this.#A(t)}#A(e){this.#e?.setStaticModelMatrix(D.create().fromTransform(e))}reset(){this.#r?.reset()}setControls(e){this.#r?.setControls(e)}setBounds(e){this.#l&&(this.#l.bounds=e??null)}setAudioPosition(e){this.#v=e??null,this.#r?.setAudioPosition(this.#v),this.#s&&(this.#s.soundPosition=this.#v)}dispose(){++this.#p,this.#C(),this.#t?.disconnect(),this.#e?.dispose()}async#L(e){if(e==="vr"||e==="ar"){if(!this.#g[e])throw new Error(`${e.toUpperCase()} not supported`);await this.#k(e==="ar")}else if(e==="pw"||e==="hw")this.#R();else throw new Error(`Unknown mode: ${e}`)}#R(){let e=new Vt(this.#i);this.#r=e,this.#e.backend==="pure"&&(this.#e.drawMode=0),e.setSceneTransform(this.#y),e.setViewZSign(this.#x),e.setAudioPosition(this.#v),this.#b&&e.setBBox(this.#b)}async#k(e){let t=new Ut(this.#e,this.#e.gl);t.soundPosition=this.#v,t.onSessionEnd=()=>{this.#l?.dispose(),this.#s===t&&(this.#s=null,this.#o=null,this.setMode(this.#f))};let r=null;try{let i=await t.enter(e),n=this.#w[this.#S];r=new Ve(this.#e,null,{directGrab:i.isAVP}),r.locked=n?.locked??!1,r.scaleLocked=n?.scaleLocked??!0,r.setInitialTransform(this.#y,this.#x);let o=this.#l;o&&(o.manipulator=r,await o.init(this.#e,t.session,t.binding,t.refSpace,this.#e.gl,e),t.onEyeRender=(l,h,c,p,u,d,f)=>o.renderEye(l,h,c,p,u,d,f),t.onASWRender=(l,h)=>o.render(l,h),t.onRefReset=()=>o.onRefReset?.());let a=r;t.onBeforeRender=(l,h,c,p,u,d)=>{if(a.update(l,h,c,u,o?.uiActive??!1,o?.uiDragging??!1),o){o.frame(l,h,c,p,u,d);let f=[];for(let g of o.quads??[])g.layer&&(g.visible||g.placing)&&f.push(g.layer);t.externalLayers=f}},t.onFrame=(l,h)=>{if(!this.#G(l))return;let c=a.scale;t.renderFrame(l,h,c!==1?1/c:1),this.#N()}}catch(i){throw this.#P(t),this.#l?.dispose(),t.exit(),i}if(!t.session)throw this.#P(t),new Error("XR session ended during entry");this.#o=r,this.#s=t}#P(e){e.onFrame=null,e.onSessionEnd=null,e.onBeforeRender=null,e.onEyeRender=null,e.onASWRender=null,e.onRefReset=null}#C(){this.#E(),this.#r?.dispose(),this.#r=null;let e=this.#s;e&&(this.#s=null,this.#o=null,this.#P(e),this.#l?.dispose(),e.exit())}async#B(){this.#E(),this.#r?.dispose(),this.#r=null;let e=this.#s;if(e){this.#s=null,this.#o=null,e.onFrame=null;try{await e.session?.end()}catch{}}}async#z(e){let t=e!=="pw"?"hybrid":"pure";t!==this.#e.backend&&this.#H(t),await this.#L(e),(this.#c||this.#h)&&this.#F(),this.#u=e,this.#s||(this.#f=e)}#F(){this.#r&&!this.#n&&(this.#n=requestAnimationFrame(this.#I))}#E(){this.#n&&cancelAnimationFrame(this.#n),this.#n=0,this.#a=0}#I=e=>{this.#n=requestAnimationFrame(this.#I);let t=x.deltaSeconds(e,this.#a,1/60);if(this.#a=e,!this.#G(t))return this.#E();let r=this.#r;if(!r)return this.#E();r.update(t);let{width:i,height:n}=this.#i;r.apply(this.#e,i,n),this.#D(r.canPresent),this.#e.present(i,n),this.#N()};#G(e){return this.#U(),!this.#c&&!this.#h?!1:(this.onBeforeFrame?.(e),!0)}#N(){this.#h&&this.onProgress?.(Math.round(this.#e.progress*100)),this.#X(),this.onFrame?.()}async#O(e){let t=++this.#p,r=()=>t===this.#p;this.#E(),this.#e.close(),this.#b=null,this.#D(!1),this.#h=!0,this.#T=0,this.#_=!1;try{await e(r)}catch(i){if(!r())return;this.#h=!1,this.onError?.(i)}r()&&this.#F()}#X(){let e=this.#e;if(!e?.isReady)return;let t=e.duration;if(!t||t<=0)return;let r=x.clamp01(e.currentTime/t),i=this.#T;this.#T=r,!this.#_&&(e.isBuffering||i>.95&&r<i&&(this.#_=!0,(this.#w[this.#S]?.autoSwitchToNext??!0)&&this.#S<this.#w.length-1&&this.loadScene(this.#S+1)))}#U(){if(!this.#b&&this.#e.isReady){let t=this.#e.getBBox();t&&(this.#b=t,this.#r?.setBBox(t))}let e=this.#r;if(e&&!e.canPresent&&this.#b&&e.setBBox(this.#b),!!this.#h){if(!this.#e.isReady){let t=this.#e.lastFetchStatus;t&&t!==200&&t!==206&&(this.#h=!1,this.onError?.(t));return}this.#h=!1,this.#e.play(),this.#o&&(this.#w[this.#S]?.resetPositionOnStart!==!1&&this.#o.resetToInitial(),this.#o.invalidateBBox()),this.onProgress?.(100),this.onReady?.()}}#D(e){this.#i.style.visibility=e?"visible":"hidden"}#H(e){this.#t?.disconnect();let t=Hi();this.#i.replaceWith(t),this.#i=t,this.#e?.setBackend(e,{canvas:t}),this.#V()}#V(){this.#t?.disconnect();let e=this.#i;this.#t=new ResizeObserver(([t])=>{if(!t)return;let r=x.clamp(devicePixelRatio||1,1,2),i=Math.round(t.contentRect.width*r),n=Math.round(t.contentRect.height*r);i>0&&n>0&&(e.width!==i||e.height!==n)&&(e.width=i,e.height=n)}),this.#t.observe(e)}};var Kt=class s{#e;#i;#t;#r=null;#s=null;#o=null;#n=null;#a=!1;enableMesh=!1;static attach(e,t,r){let i=new s(e,t,r);return i.#h(),i.#l(),i}constructor(e,t,r){this.#e=e,this.#i=t,this.#t=r}get player(){return this.#e}set camera(e){this.#t=e}get camera(){return this.#t}async setAudio(e){await this.#e.loadAudio(e)}setAudioPanner(e){this.#e.setAudioPanner(e)}set entity(e){if(this.#s?.node?.destroy(),this.#s=null,this.#r=e,!e)return;let t=new this.#i.root.constructor("_SplatShadow",this.#i);t.addComponent("render",{type:"box",castShadows:!0,receiveShadows:!1});let r=t.render.meshInstances[0];r.visible=!1,r.cull=!1,e.addChild(t),this.#s=r}get entity(){return this.#r}dispose(){this.#s?.node?.destroy(),this.#n&&(this.#i.renderer.setMeshInstanceMatrices=this.#n[0],this.#i.graphicsDevice.draw=this.#n[1]),this.#e.close(),this.#e.dispose()}#l(){let{renderer:e,graphicsDevice:t}=this.#i,r=e.setMeshInstanceMatrices,i=t.draw;this.#n=[r,i];let n=this;e.setMeshInstanceMatrices=function(...o){return o[0]===n.#s&&(n.#a=!0),r.apply(this,o)},t.draw=function(...o){let a=n.#a;if(n.#a=!1,a){n.enableMesh&&n.#e.isReady&&n.#c();return}return i.apply(this,o)}}#c(){let e=this.#i.graphicsDevice,t=e.gl,r=t.getParameter(t.VIEWPORT),i=e.scope.resolve("matrix_viewProjection").value;i&&(this.#o||(this.#o=new(this.#r.getWorldTransform()).constructor),this.#o.data.set(i),this.#o.mul(this.#r.getWorldTransform()),this.#e.renderMesh(this.#o.data,r[0],r[1],r[2],r[3]),this.#h())}renderFrame(){let e=this.#i.graphicsDevice,t=e.gl,r=e.width,i=e.height;!r||!i||(this.#r&&this.#e.setModelMatrix(this.#r.getWorldTransform().data),this.#t?.camera&&(this.#e.setCamera(this.#t.getWorldTransform().data,this.#t.camera.projectionMatrix.data),this.#e.setAudioListenerMatrix(this.#t.getWorldTransform().data)),this.#r&&this.#e.setAudioSourceMatrix(this.#r.getWorldTransform().data),this.#e.renderHybridViewport(r,i,{gl:t,enableMesh:this.enableMesh}),this.#h())}#h(){let e=this.#i.graphicsDevice;e.shader=null,e.boundVao=null,e.textureUnit=-1;let t=e.textureUnits;if(t)for(let r=0;r<t.length;r++)t[r][0]=t[r][1]=t[r][2]=null}};async function Gr(s,e,t){let r=`${s.replace(/\/+$/,"")}/${e}`,i=await fetch(r,{headers:{"X-VIEW-TOKEN":t}});if(!i.ok)throw new Error(`Streaming metadata fetch failed: ${i.status} ${i.statusText}`);let n=await i.json();return{metadata:n.metadata??null,audioFileLink:n.audioFileLink??null}}async function We(s,e){let t=e.replace(/\/+$/,"");return Promise.all(s.map(async(r,i)=>{let{metadata:n,audioFileLink:o}=await Gr(t,r.streamingId,r.token);return{id:r.streamingId,label:r.label??n?.name??r.streamingId,url:`${t}/${r.streamingId}/`,token:r.token,displayName:n?.name??void 0,audio:o&&n?.withAudio!==!1?o:void 0,initialTransform:n?.initialSpawn??null,bounds:n?.bounds??null,locked:!1,scaleLocked:!0,autoSwitchToNext:!0,resetPositionOnStart:r.settings?.resetPositionOnStart}}))}import{useEffect as io,useMemo as Nr,useReducer as so,useRef as Or}from"react";import{useEffect as to,useMemo as ro,useState as Vi}from"react";function Ui(s,e){let[t,r]=Vi(!1),[i,n]=Vi(!1);to(()=>{let a=navigator.xr;if(!a||!s)return;let l=async()=>{let[h,c]=await Promise.all([a.isSessionSupported("immersive-vr").catch(()=>!1),a.isSessionSupported("immersive-ar").catch(()=>!1)]);r(h),n(c)};return l(),a.addEventListener("devicechange",l),()=>a.removeEventListener("devicechange",l)},[s]);let o=e==="vr"||e==="ar";return ro(()=>({vrSupported:t,arSupported:i,isActive:o,setMode:async a=>{await s?.setMode(a)}}),[s,t,i,o])}var Yi=new WeakMap;function Zi(s){return Yi.get(s)}var qi={app:null,overlay:null,isContentReady:!1,isLoading:!1,progress:0,mode:"pw",error:null,isPlaying:!1,isBuffering:!1,currentTime:0,duration:0,controlsType:"orbit",isMuted:!0,volume:1};function no(s,e){switch(e.type){case"init":return{...s,app:e.app,overlay:e.overlay};case"frame":{let{isPlaying:t,isBuffering:r,currentTime:i,duration:n,isMuted:o}=e,a=n>0?n:s.duration;return s.isPlaying===t&&s.isBuffering===r&&s.currentTime===i&&s.duration===a&&s.isMuted===o?s:{...s,isPlaying:t,isBuffering:r,currentTime:i,duration:a,isMuted:o}}case"progress":return s.progress===e.value?s:{...s,progress:e.value};case"ready":return{...s,isContentReady:!0,isLoading:!1,progress:100};case"mode":return s.mode===e.mode?s:{...s,mode:e.mode};case"error":return{...s,error:e.error,isLoading:!1};case"open":return{...s,error:null,isLoading:!0,progress:0};case"close":return{...s,isLoading:!1,progress:0};case"reset":return{...qi,mode:s.mode};case"seek":return{...s,currentTime:e.time};case"camera_controls":return s.controlsType===e.controlsType?s:{...s,controlsType:e.controlsType};case"set_volume":return{...s,volume:e.volume}}}var Wi=new Set(["vr","ar"]);function Jt(s){let{containerRef:e,mode:t="pw",overlay:r,moduleUrl:i,moduleFactory:n,onReady:o,onProgress:a,onModeChange:l,onXRStart:h,onXREnd:c,eventLogger:p}=s,[u,d]=so(no,{...qi,mode:t}),f=Or(null),g=Or(u);g.current=u;let m=Or({onReady:o,onProgress:a,onModeChange:l,onXRStart:h,onXREnd:c,eventLogger:p});m.current={onReady:o,onProgress:a,onModeChange:l,onXRStart:h,onXREnd:c,eventLogger:p},io(()=>{let b=e.current;if(!b)return;let C=!1;return(async()=>{try{if(!n&&!i)throw new Error("[gr-react] Either moduleUrl or moduleFactory must be provided");let N=n?await n():await Ft(i);if(C)return;let se=r??null;se&&(se.eventLogger={event:(L,X)=>m.current.eventLogger?.event?.(L,{...X,mode:g.current.mode}),error:(L,X)=>m.current.eventLogger?.error?.(L,{...X,mode:g.current.mode})});let O=await Ue.create(N,{container:b,overlay:se,mode:t});if(C){O.dispose();return}f.current=O,O.onProgress=L=>{d({type:"progress",value:L}),m.current.onProgress?.(L)},O.onReady=()=>{d({type:"ready"}),O.audioEnabled&&O.enableAudio(),m.current.onReady?.()},O.onFrame=()=>{let L=f.current?.player;L&&d({type:"frame",isPlaying:L.isPlaying??!1,isBuffering:L.isBuffering??!1,currentTime:L.currentTime??0,duration:L.duration??0,isMuted:!(L.audioEnabled??!1)})},O.onModeChange=(L,X)=>{d({type:"mode",mode:L}),m.current.onModeChange?.(L,X);let ke=Wi.has(X),Xe=Wi.has(L);ke&&!Xe&&m.current.onXREnd?.(),!ke&&Xe&&m.current.onXRStart?.()},O.onError=L=>{let[X,ke]=typeof L=="number"?[new Error(`Streaming fetch failed: HTTP ${L}`),"load"]:[L,"xr"];d({type:"error",error:X}),m.current.eventLogger?.error?.(X,{phase:ke,mode:g.current.mode})},O.start(),d({type:"init",app:O,overlay:se}),d({type:"camera_controls",controlsType:O.camera?.controlsType??"orbit"})}catch(N){let se=N instanceof Error?N:new Error(String(N));d({type:"error",error:se}),m.current.eventLogger?.error?.(se,{phase:"init",mode:g.current.mode})}})(),()=>{C=!0;let N=f.current;N&&(N.stop(),N.dispose()),f.current=null,d({type:"reset"})}},[e,r,t,n,i]);let{app:w}=u,I=Ui(w,u.mode),P=Nr(()=>({play:()=>w?.player?.play(),pause:()=>w?.player?.pause(),togglePlay:()=>{let b=w?.player;if(!b)return;let C=!b.isPlaying;C?b.play():b.pause(),m.current.eventLogger?.event?.("play_pause",{playing:C,mode:g.current.mode})},seek:b=>{d({type:"seek",time:b}),w?.player?.seek(b),m.current.eventLogger?.event?.("seek",{position:b,mode:g.current.mode})},setSpeed:b=>w?.player?.setSpeed(b),setVolume:b=>{d({type:"set_volume",volume:b}),w?.setVolume(b)},toggleMute:()=>{let b=!w?.audioEnabled;b?w?.enableAudio():w?.disableAudio(),m.current.eventLogger?.event?.("mute_toggle",{muted:!b,mode:g.current.mode})},setAudio:b=>w?.setAudio(b)}),[w]),v=Nr(()=>({controlsType:u.controlsType,zoom:b=>w?.camera?.zoom(b),reset:()=>{w?.camera?.reset(),m.current.eventLogger?.event?.("reset",{mode:g.current.mode})},setControls:b=>{if(!w)return;w.setControls(b);let C=w.camera?.controlsType??b;d({type:"camera_controls",controlsType:C}),m.current.eventLogger?.event?.("camera_controls",{controls:C,requestedControls:b,mode:g.current.mode})}}),[w,u.controlsType]),_=Nr(()=>({open(b){w&&(d({type:"open"}),w.open(b))},close(){w?.close(),d({type:"close"})},dispose(){w&&(w.stop(),w.dispose())}}),[w]),S={app:w,device:w?.device??null,overlay:u.overlay,isInitialized:w!==null,isLoading:u.isLoading,isContentReady:u.isContentReady,progress:u.progress,mode:u.mode,error:u.error,isRebuffering:u.isContentReady&&(u.isLoading||u.isBuffering),..._,playback:{isPlaying:u.isPlaying,isBuffering:u.isBuffering,currentTime:u.currentTime,duration:u.duration,isMuted:u.isMuted,volume:u.volume,...P},camera:v,xr:I};return Yi.set(S,{dispatch:d}),S}import{useCallback as yt,useEffect as oo,useState as ji}from"react";function er(s){let{app:e}=s,t=Zi(s)?.dispatch,[r,i]=ji([]),[n,o]=ji(-1);oo(()=>{if(e)return e.onSceneChange=(d,f)=>{t?.({type:"open"}),t?.({type:"camera_controls",controlsType:e.camera?.controlsType??"orbit"}),o(f)},()=>{e.onSceneChange=null}},[e,t]);let a=yt(d=>{e&&(e.sources=d),i(d),o(-1)},[e]),l=yt(d=>{e?.loadScene(d)},[e]),h=yt(()=>{e&&e.loadScene(e.sceneIndex+1)},[e]),c=yt(()=>{e&&e.loadScene(e.sceneIndex-1)},[e]),p=yt(async(d,f)=>{let g=await We(d,f);a(g),g.length>0&&l(0)},[a,l]),u=n>=0&&n<r.length?r[n]:null;return{sources:r,index:n,total:r.length,currentSource:u,hasNext:n>=0&&n<r.length-1,hasPrev:n>0,hasAudio:!!u?.audio,setSources:a,loadFromApi:p,next:h,prev:c,goTo:l}}import{jsx as R,jsxs as ao}from"react/jsx-runtime";function Qi(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M5.74023 18.7266V5.17188C5.74023 4.68359 5.86068 4.32552 6.10156 4.09766C6.34245 3.86328 6.62891 3.74609 6.96094 3.74609C7.25391 3.74609 7.55339 3.83073 7.85938 4L19.2363 10.6504C19.64 10.8848 19.9199 11.0964 20.0762 11.2852C20.2389 11.4674 20.3203 11.6888 20.3203 11.9492C20.3203 12.2031 20.2389 12.4245 20.0762 12.6133C19.9199 12.8021 19.64 13.0137 19.2363 13.248L7.85938 19.8984C7.55339 20.0677 7.25391 20.1523 6.96094 20.1523C6.62891 20.1523 6.34245 20.0352 6.10156 19.8008C5.86068 19.5664 5.74023 19.2083 5.74023 18.7266Z"})})}function $i(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M7.3418 20.0254C6.91211 20.0254 6.58659 19.9147 6.36523 19.6934C6.15039 19.472 6.04297 19.1465 6.04297 18.7168V5.17188C6.04297 4.74219 6.15039 4.41992 6.36523 4.20508C6.58659 3.98372 6.91211 3.87305 7.3418 3.87305H9.56836C9.99154 3.87305 10.3138 3.97721 10.5352 4.18555C10.7565 4.39388 10.8672 4.72266 10.8672 5.17188V18.7168C10.8672 19.1465 10.7565 19.472 10.5352 19.6934C10.3138 19.9147 9.99154 20.0254 9.56836 20.0254H7.3418ZM14.4414 20.0254C14.0117 20.0254 13.6862 19.9147 13.4648 19.6934C13.2435 19.472 13.1328 19.1465 13.1328 18.7168V5.17188C13.1328 4.74219 13.2435 4.41992 13.4648 4.20508C13.6862 3.98372 14.0117 3.87305 14.4414 3.87305H16.6582C17.0879 3.87305 17.4102 3.97721 17.625 4.18555C17.8464 4.39388 17.957 4.72266 17.957 5.17188V18.7168C17.957 19.1465 17.8464 19.472 17.625 19.6934C17.4102 19.9147 17.0879 20.0254 16.6582 20.0254H14.4414Z"})})}function Ki(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M8.03125 15.5391C7.5 15.5391 7.10156 15.4036 6.83594 15.1328C6.57031 14.8568 6.4375 14.4375 6.4375 13.875V10.8828C6.4375 10.362 6.55208 9.97135 6.78125 9.71094L15.6875 18.6094C15.625 18.8333 15.5208 18.9974 15.375 19.1016C15.2292 19.2057 15.0547 19.2578 14.8516 19.2578C14.6745 19.2578 14.5052 19.2188 14.3438 19.1406C14.1823 19.0625 14.0104 18.9375 13.8281 18.7656L10.4531 15.6094C10.401 15.5625 10.3359 15.5391 10.2578 15.5391H8.03125ZM15.7422 14.3984L10.3203 8.99219H10.5547C10.6016 8.99219 10.6458 8.97135 10.6875 8.92969L13.8281 6.01562C14.0312 5.82812 14.2057 5.69271 14.3516 5.60938C14.4974 5.52083 14.6615 5.47656 14.8438 5.47656C15.1094 5.47656 15.3255 5.56771 15.4922 5.75C15.6589 5.92708 15.7422 6.14323 15.7422 6.39844V14.3984ZM18.4453 20.0781L5.05469 6.70312C4.9401 6.58854 4.88281 6.44792 4.88281 6.28125C4.88281 6.10938 4.9401 5.96615 5.05469 5.85156C5.17448 5.73177 5.31771 5.67448 5.48438 5.67969C5.65104 5.67969 5.79427 5.73698 5.91406 5.85156L19.2891 19.2266C19.4089 19.3464 19.4688 19.487 19.4688 19.6484C19.4688 19.8151 19.4089 19.9583 19.2891 20.0781C19.1797 20.1979 19.0391 20.2578 18.8672 20.2578C18.7005 20.2578 18.5599 20.1979 18.4453 20.0781Z"})})}function Ji(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M11.7031 19.2578C11.5208 19.2578 11.349 19.2188 11.1875 19.1406C11.026 19.0625 10.8568 18.9375 10.6797 18.7656L7.35156 15.6094C7.29948 15.5625 7.23438 15.5391 7.15625 15.5391H4.91406C4.38802 15.5391 3.98438 15.3958 3.70312 15.1094C3.42188 14.8229 3.28125 14.3958 3.28125 13.8281V10.9219C3.28125 10.3594 3.42188 9.9349 3.70312 9.64844C3.98438 9.35677 4.38802 9.21094 4.91406 9.21094H7.15625C7.23438 9.21094 7.29948 9.1875 7.35156 9.14062L10.6797 6.01562C10.8828 5.82812 11.0547 5.69271 11.1953 5.60938C11.3411 5.52083 11.5052 5.47656 11.6875 5.47656C11.9531 5.47656 12.1693 5.56771 12.3359 5.75C12.5026 5.92708 12.5859 6.14323 12.5859 6.39844V18.3828C12.5859 18.6328 12.5026 18.8411 12.3359 19.0078C12.1745 19.1745 11.9635 19.2578 11.7031 19.2578ZM15.375 15.6875C15.2188 15.5781 15.1302 15.4375 15.1094 15.2656C15.0885 15.0938 15.138 14.9245 15.2578 14.7578C15.4818 14.4401 15.6562 14.0755 15.7812 13.6641C15.9062 13.2474 15.9688 12.8125 15.9688 12.3594C15.9688 11.9062 15.9062 11.4714 15.7812 11.0547C15.6615 10.638 15.487 10.2734 15.2578 9.96094C15.1328 9.79948 15.0807 9.63281 15.1016 9.46094C15.1276 9.28385 15.2188 9.14062 15.375 9.03125C15.5104 8.9375 15.6589 8.90625 15.8203 8.9375C15.9818 8.96875 16.1146 9.0599 16.2188 9.21094C16.5208 9.60677 16.7552 10.0807 16.9219 10.6328C17.0938 11.1849 17.1797 11.7604 17.1797 12.3594C17.1797 12.9583 17.0938 13.5339 16.9219 14.0859C16.7552 14.638 16.5208 15.112 16.2188 15.5078C16.1146 15.6589 15.9818 15.75 15.8203 15.7812C15.6589 15.8073 15.5104 15.776 15.375 15.6875ZM18.2734 17.7266C18.1328 17.6276 18.0521 17.4974 18.0312 17.3359C18.0104 17.1693 18.0547 17.0052 18.1641 16.8438C18.5859 16.2344 18.9141 15.5443 19.1484 14.7734C19.388 13.9974 19.5078 13.1927 19.5078 12.3594C19.5078 11.526 19.3906 10.7214 19.1562 9.94531C18.9219 9.16927 18.5911 8.47917 18.1641 7.875C18.0495 7.71354 18.0026 7.55208 18.0234 7.39062C18.0495 7.22396 18.1328 7.09115 18.2734 6.99219C18.4193 6.89323 18.5729 6.85938 18.7344 6.89062C18.8958 6.92188 19.0286 7.01302 19.1328 7.16406C19.638 7.84115 20.0286 8.63542 20.3047 9.54688C20.5807 10.4583 20.7188 11.3958 20.7188 12.3594C20.7188 13.3229 20.5781 14.2578 20.2969 15.1641C20.0208 16.0703 19.6328 16.8672 19.1328 17.5547C19.0286 17.7057 18.8958 17.7969 18.7344 17.8281C18.5729 17.8542 18.4193 17.8203 18.2734 17.7266Z"})})}function Ce(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M5.42188 13.1953V6.4375C5.42188 5.625 5.6224 5.01302 6.02344 4.60156C6.42969 4.1901 7.03646 3.98438 7.84375 3.98438H11.4297V9.71875C11.4297 10.7031 11.9219 11.1953 12.9062 11.1953H18.5625V18.2891C18.5625 19.1016 18.3594 19.7109 17.9531 20.1172C17.5521 20.5286 16.9479 20.7344 16.1406 20.7344H9.78125C10 20.3646 10.1667 19.9688 10.2812 19.5469C10.401 19.125 10.4609 18.6901 10.4609 18.2422C10.4609 17.5495 10.3307 16.8984 10.0703 16.2891C9.8099 15.6797 9.44792 15.1432 8.98438 14.6797C8.52083 14.2161 7.98438 13.8542 7.375 13.5938C6.76562 13.3281 6.11458 13.1953 5.42188 13.1953ZM12.9297 10.125C12.6432 10.125 12.5 9.98438 12.5 9.70312V4.07031C12.6615 4.09635 12.8255 4.16667 12.9922 4.28125C13.1589 4.39062 13.3333 4.53906 13.5156 4.72656L17.8203 9.10938C18.0078 9.30208 18.1562 9.47917 18.2656 9.64062C18.375 9.80208 18.4427 9.96354 18.4688 10.125H12.9297ZM5.42188 22.2109C4.88021 22.2109 4.36979 22.1068 3.89062 21.8984C3.41146 21.6953 2.98958 21.4115 2.625 21.0469C2.26042 20.6823 1.97396 20.2604 1.76562 19.7812C1.55729 19.3021 1.45312 18.7891 1.45312 18.2422C1.45312 17.6953 1.55729 17.1849 1.76562 16.7109C1.97396 16.2318 2.26042 15.8099 2.625 15.4453C2.98958 15.0755 3.41146 14.7891 3.89062 14.5859C4.36979 14.3776 4.88021 14.2734 5.42188 14.2734C5.96875 14.2734 6.48177 14.3776 6.96094 14.5859C7.4401 14.7891 7.86198 15.0729 8.22656 15.4375C8.59115 15.8021 8.875 16.224 9.07812 16.7031C9.28646 17.1823 9.39062 17.6953 9.39062 18.2422C9.39062 18.7839 9.28646 19.2943 9.07812 19.7734C8.86979 20.2526 8.58073 20.6745 8.21094 21.0391C7.84635 21.4036 7.42448 21.6901 6.94531 21.8984C6.46615 22.1068 5.95833 22.2109 5.42188 22.2109ZM5.42188 20.7266C5.56771 20.7266 5.68229 20.6823 5.76562 20.5938C5.85417 20.5052 5.89844 20.3906 5.89844 20.25V18.7188H7.42969C7.57031 18.7188 7.6849 18.6745 7.77344 18.5859C7.86198 18.5026 7.90625 18.388 7.90625 18.2422C7.90625 18.0964 7.86198 17.9818 7.77344 17.8984C7.6849 17.8099 7.57031 17.7656 7.42969 17.7656H5.89844V16.2344C5.89844 16.0938 5.85417 15.9792 5.76562 15.8906C5.68229 15.8021 5.56771 15.7578 5.42188 15.7578C5.27604 15.7578 5.15885 15.8021 5.07031 15.8906C4.98698 15.9792 4.94531 16.0938 4.94531 16.2344V17.7656H3.41406C3.27344 17.7656 3.15885 17.8099 3.07031 17.8984C2.98177 17.9818 2.9375 18.0964 2.9375 18.2422C2.9375 18.388 2.98177 18.5026 3.07031 18.5859C3.15885 18.6745 3.27344 18.7188 3.41406 18.7188H4.94531V20.25C4.94531 20.3906 4.98698 20.5052 5.07031 20.5938C5.15885 20.6823 5.27604 20.7266 5.42188 20.7266Z"})})}function es(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.75 6.5A3.75 3.75 0 0 0 2 10.25v3.5a3.75 3.75 0 0 0 3.75 3.75h7.5A3.75 3.75 0 0 0 17 13.75v-.46l2.9 2.16A1.25 1.25 0 0 0 22 14.45v-4.9a1.25 1.25 0 0 0-2.1-1L17 10.71v-.46a3.75 3.75 0 0 0-3.75-3.75h-7.5ZM6 8h7a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 16H6a2.5 2.5 0 0 1-2.5-2.5v-3A2.5 2.5 0 0 1 6 8Zm11 4.6v-1.2l3.5-2.61v6.42L17 12.6Z"})})}function tr(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.25 6.75C3.46 6.75 2 8.21 2 10v4c0 1.79 1.46 3.25 3.25 3.25h3.24c.83 0 1.55-.54 1.8-1.33l.52-1.67h2.38l.52 1.67c.25.79.97 1.33 1.8 1.33h3.24c1.79 0 3.25-1.46 3.25-3.25v-4c0-1.79-1.46-3.25-3.25-3.25H5.25Zm.67 3.42c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52H5.92Zm10.2 0c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52h-1.96Z"})})}function rr(){return ao("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[R("path",{d:"M5.5 3.75c-.97 0-1.75.78-1.75 1.75v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5A3.25 3.25 0 0 1 5.5 2.25h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5ZM16.25 3c0-.41.34-.75.75-.75h1.5a3.25 3.25 0 0 1 3.25 3.25v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5c0-.97-.78-1.75-1.75-1.75H17c-.41 0-.75-.34-.75-.75ZM3 15.5c.41 0 .75.34.75.75v2.25c0 .97.78 1.75 1.75 1.75h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5a3.25 3.25 0 0 1-3.25-3.25v-2.25c0-.41.34-.75.75-.75ZM21 15.5c.41 0 .75.34.75.75v2.25a3.25 3.25 0 0 1-3.25 3.25H17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.5c.97 0 1.75-.78 1.75-1.75v-2.25c0-.41.34-.75.75-.75Z"}),R("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z"})]})}function ts(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"})})}function rs(){return R("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:R("path",{d:"m480-236 93-93q12-12 29-12t29 12q12 12 12 29t-12 29L508-148q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L329-271q-12-12-12-29t12-29q12-12 29-12t29 12l93 93Zm0-484-93 93q-12 12-29 12t-29-12q-12-12-12-29t12-29l123-123q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l123 123q12 12 12 29t-12 29q-12 12-29 12t-29-12l-93-93Z"})})}function is({active:s=!1}){return R("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:s?R("path",{d:"M240-240h-80q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h120q17 0 28.5 11.5T320-280v120q0 17-11.5 28.5T280-120q-17 0-28.5-11.5T240-160v-80Zm480 0v80q0 17-11.5 28.5T680-120q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320h120q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240h-80ZM240-720v-80q0-17 11.5-28.5T280-840q17 0 28.5 11.5T320-800v120q0 17-11.5 28.5T280-640H160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h80Zm480 0h80q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H680q-17 0-28.5-11.5T640-680v-120q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v80Z"}):R("path",{d:"M200-200h80q17 0 28.5 11.5T320-160q0 17-11.5 28.5T280-120H160q-17 0-28.5-11.5T120-160v-120q0-17 11.5-28.5T160-320q17 0 28.5 11.5T200-280v80Zm560 0v-80q0-17 11.5-28.5T800-320q17 0 28.5 11.5T840-280v120q0 17-11.5 28.5T800-120H680q-17 0-28.5-11.5T640-160q0-17 11.5-28.5T680-200h80ZM200-760v80q0 17-11.5 28.5T160-640q-17 0-28.5-11.5T120-680v-120q0-17 11.5-28.5T160-840h120q17 0 28.5 11.5T320-800q0 17-11.5 28.5T280-760h-80Zm560 0h-80q-17 0-28.5-11.5T640-800q0-17 11.5-28.5T680-840h120q17 0 28.5 11.5T840-800v120q0 17-11.5 28.5T800-640q-17 0-28.5-11.5T760-680v-80Z"})})}function ir(){return R("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:R("path",{d:"m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"})})}function sr(){return R("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:R("path",{d:"M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"})})}var ss=[{type:"orbit",label:"Orbit",hint:`Left-click drag to rotate / Right-click drag to pan
Scroll to zoom in/out`},{type:"trackball",label:"Trackball",hint:`Left-click drag to rotate freely / Right-click drag to pan
Scroll to zoom in/out`},{type:"fly",label:"Fly",hint:`W/S forward & back / A/D strafe / R/F up & down
Q/E roll / Drag to look around`}];var oe={PW:"pw",HW:"hw",VR:"vr",AR:"ar"},wh=[oe.VR,oe.AR];function nr(s){return s===oe.VR||s===oe.AR}var Xr=[".mint",".sog"],ns=Xr.join(","),os="Open file",or="local://",as="static",lo=".sog";function Dr(s){return s.toLowerCase().endsWith(lo)}function Ee(s){return typeof s?.url=="string"&&s.url.startsWith(or)}var ls="stepper";var ho="@gracia/web-sdk/wasm",co="https://market.gracia.ai/api/v1/streaming/content";function hs(){return typeof __GRACIA_MODULE_URL__=="string"?__GRACIA_MODULE_URL__:ho}function cs(){return typeof __GRACIA_STREAMING_BASE_URL__=="string"?__GRACIA_STREAMING_BASE_URL__:co}function po(){return typeof navigator>"u"?!1:!!navigator.gpu}var uo={xr:"xr-failed",fullscreen:"fullscreen-failed","local-file":"local-file-failed"};function fo(s){let e=s.match(/http\s+(-?\d+)/i);return e?Number(e[1]):null}function mo(s,e){let t=e&&uo[e];if(t)return t;let r=s.message.toLowerCase();if(r.includes("webgpu")||r.includes("not supported")||r.includes("getcontext"))return"unsupported-browser";let i=fo(r);return i!==null?i===401||i===403?"access-denied":i===404?"not-found":i>=500?"server-error":"network":r.includes("failed to fetch dynamically imported module")?"load-failed":r.includes("forbidden")||r.includes("unauthorized")?"access-denied":po()?"unknown":"unsupported-browser"}var go=new Set(["unsupported-browser","not-found","access-denied","xr-failed","fullscreen-failed","local-file-failed"]),yo=new Set(["xr-failed","fullscreen-failed","local-file-failed"]);function xo(s,e){let t=!go.has(s);return s==="unsupported-browser"?{presentation:"blocking",recoverable:t}:yo.has(s)?{presentation:"toast",recoverable:t}:{presentation:e?"toast":"blocking",recoverable:t}}var bo={"unsupported-browser":{title:"This browser can\u2019t run the player",body:"The player requires WebGPU. Open it in a supported browser and device."},network:{title:"Connection lost",body:"We couldn\u2019t reach the stream. Check your connection and try again."},"not-found":{title:"Scene not found",body:"This content is no longer available."},"access-denied":{title:"Access denied",body:"You don\u2019t have permission to view this content."},"server-error":{title:"Something went wrong",body:"The server had a problem loading this scene. Please try again."},"load-failed":{title:"Couldn\u2019t load the scene",body:"We couldn\u2019t load this scene. Please try again."},"xr-failed":{title:"Couldn\u2019t enter immersive mode",body:"Immersive mode isn\u2019t available right now."},"fullscreen-failed":{title:"Couldn\u2019t enter fullscreen",body:"Fullscreen isn\u2019t available right now."},"local-file-failed":{title:"Couldn\u2019t open the file",body:"We couldn\u2019t open that file. Try a different one."},unknown:{title:"Something went wrong",body:"We couldn\u2019t load this scene. Please try again."}};function vo(s){return bo[s]}function ps(s,e,t){let r=mo(s,t);return{kind:r,cause:s,...xo(r,e),...vo(r)}}var us="data:font/woff2;base64,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";var ds=`@font-face {
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
`;var fs="gracia-player-default-styles",Hr=ds.replace('url("./assets/GolosText-Regular.woff2")',`url("${us}")`);function ar(s){if(typeof document>"u")return;let e=typeof ShadowRoot<"u"&&s instanceof ShadowRoot?s:s?.head??document.head;if(e.querySelector(`#${fs}`))return;let t=document.createElement("style");t.id=fs,t.textContent=Hr,e.appendChild(t)}function Q(...s){let e=[];for(let t of s)if(t){if(typeof t=="string"){e.push(t);continue}for(let[r,i]of Object.entries(t))i&&e.push(r)}return e.join(" ")}function ae(s){return s.label??s.displayName??s.id??s.url??"Untitled"}function Vr(s){return!Number.isFinite(s)||s<0?"0:00":`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`}function ve(s){return s instanceof Error?s:new Error(String(s))}function ms(s,e){return{event:(t,r)=>s?.event?.(t,r),error:(t,r)=>{s?.error?.(t,r),e?.(t,r)}}}import{jsx as gs,jsxs as So}from"react/jsx-runtime";var re=({variant:s="primary",className:e,type:t="button",children:r,...i})=>{let n=Array.isArray(s)?s:[s];return gs("button",{type:t,className:Q("gr-player__button",...n.map(o=>`gr-player__button--${o}`),e),...i,children:r})},Le=({variant:s="icon",srLabel:e,children:t,...r})=>So(re,{variant:s,...r,children:[t,e&&gs("span",{className:"gr-player__sr",children:e})]});import{jsx as xt,jsxs as To}from"react/jsx-runtime";var Ye=({icon:s,title:e,body:t,detail:r,action:i,className:n,role:o,ariaLive:a})=>xt("div",{className:n,role:o,"aria-live":a,children:To("div",{className:"gr-player__state-message",children:[xt("div",{className:"gr-player__state-icon",children:s}),xt("h2",{children:e}),xt("p",{children:t}),r&&xt("span",{className:"gr-player__sr",children:r}),i]})});import{jsx as ys}from"react/jsx-runtime";var Ur=({message:s})=>ys("div",{className:"gr-player__error",role:"alert",children:ys("span",{className:"gr-player__error-text",children:s})});import{jsx as xs}from"react/jsx-runtime";var Wr=({title:s,body:e,detail:t,action:r})=>xs(Ye,{icon:xs(ts,{}),title:s,body:e,detail:t,action:r,className:"gr-player__error-screen",role:"alert",ariaLive:"assertive"});import{jsx as bs}from"react/jsx-runtime";var Yr=()=>bs("div",{className:"gr-player__loader",role:"status","aria-live":"polite",children:bs("div",{className:"gr-player__spinner"})});import{forwardRef as Aa,useImperativeHandle as ka,useRef as Js}from"react";import{createContext as Mo,useContext as Po}from"react";var vs=Mo(null),Zr=vs.Provider,B=()=>{let s=Po(vs);if(!s)throw new Error("usePlayerContext must be used within a PlayerProvider");return s};import{useEffect as ws,useRef as Co,useState as Eo}from"react";function qr(s,e,t){let[r,i]=Eo(!1);ws(()=>{let a=s.current;if(!a)return;let l=()=>i(!0),h=c=>{c.touches.length>1&&l()};return a.addEventListener("pointerdown",l),a.addEventListener("wheel",l),a.addEventListener("touchmove",h),()=>{a.removeEventListener("pointerdown",l),a.removeEventListener("wheel",l),a.removeEventListener("touchmove",h)}},[s]);let n=Co(e);return ws(()=>{n.current!==e&&(n.current=e,i(!1))},[e]),{hasInteracted:r,resetView:()=>{t.reset(),i(!1)}}}import{useEffect as Lo,useState as Ro}from"react";var Ao=500;function jr(s,e=Ao){let[t,r]=Ro(!1);return Lo(()=>{if(!s){r(!1);return}let i=setTimeout(()=>r(!0),e);return()=>clearTimeout(i)},[s,e]),s&&t}import{useEffect as ko,useRef as Io,useState as Fo}from"react";var Bo=2e3;function Qr({coreError:s,interactionError:e,isSceneReady:t,currentSource:r,open:i,clearError:n}){let[o,a]=Fo(null),l=Io(new WeakMap);e?.phase&&l.current.set(e.error,e.phase);let h=s&&e?.error===s?e.phase:s?l.current.get(s):void 0,c=s?{error:s,phase:h}:e,p=c?ps(c.error,t,c.phase):null,u=p?.presentation==="blocking",d=p?.presentation==="toast"&&p.cause!==o?p:null,f=d?.cause??null;return ko(()=>{if(!f)return;let w=setTimeout(()=>{a(f),n()},Bo);return()=>clearTimeout(w)},[f,n]),{playerError:p,isBlocking:!!u,toast:d,retry:()=>r?i(r):window.location.reload(),dismiss:()=>{d&&a(d.cause),n()}}}import{useCallback as zo,useEffect as Go,useState as No}from"react";function $r(s,e){let[t,r]=No(!1),i=zo(async()=>{let n=s.current;if(!(!n||typeof document>"u"))try{document.fullscreenElement===n?await document.exitFullscreen():await n.requestFullscreen()}catch(o){e(ve(o),{phase:"fullscreen"})}},[e,s]);return Go(()=>{if(typeof document>"u")return;let n=()=>r(document.fullscreenElement===s.current);return n(),document.addEventListener("fullscreenchange",n),()=>document.removeEventListener("fullscreenchange",n)},[s]),{isFullscreen:t,toggleFullscreen:i}}import{useRef as Oo}from"react";function _s(s){let e=Dr(s.name);return{url:`${or}${s.name}`,label:s.name,file:s,...e?{type:as}:{}}}async function Xo(s){return Dr(s.name)?_s(await s.getFile()):{url:`${or}${s.name}`,label:s.name,localFile:s}}function Do(){return typeof window>"u"?null:window.showOpenFilePicker??null}function Ho(s){return s instanceof DOMException&&s.name==="AbortError"}function Vo(s){let e=s.currentTarget.files?.[0];return s.currentTarget.value="",e?_s(e):null}function Kr({localFiles:s,logger:e,reportError:t,playlist:r,clearError:i}){let n=Oo(null),o=!!s,a=c=>{i();let p=[...r.sources,c];r.setSources(p),r.goTo(p.length-1),e.event?.("local_file_open",{label:ae(c)})};return{enabled:o,fileInputProps:{ref:n,accept:ns,onChange:c=>{let p=Vo(c);p&&a(p)}},localLabel:os,openLocalFile:async()=>{if(!o)return;let c=Do();if(!c){n.current?.click();return}try{let u=(await c({types:[{description:"Volumetric video",accept:{"application/octet-stream":[...Xr]}}]}))[0];u&&a(await Xo(u))}catch(p){Ho(p)||t(ve(p),{phase:"local-file"})}}}}import{useRef as Jr}from"react";function ei(s){let{containerRef:e,muted:t=!1,moduleFactory:r,overlay:i,eventLogger:n,onReady:o,onProgress:a,onModeChange:l,onXRStart:h,onXREnd:c}=s,p=Jr({onReady:o,onProgress:a,onModeChange:l,onXRStart:h,onXREnd:c});p.current={onReady:o,onProgress:a,onModeChange:l,onXRStart:h,onXREnd:c};let u=Jr(null),d=Jr(!1),f=Jt({containerRef:e,moduleFactory:r,moduleUrl:r?void 0:hs(),overlay:i,eventLogger:n,onReady(){d.current||(d.current=!0,t||u.current?.app?.enableAudio()),p.current.onReady?.()},onProgress:m=>p.current.onProgress?.(m),onModeChange:(m,w)=>p.current.onModeChange?.(m,w),onXRStart:()=>p.current.onXRStart?.(),onXREnd:()=>p.current.onXREnd?.()});u.current=f;let g=er(f);return{gracia:f,playlist:g}}import{useCallback as ti,useMemo as Ss,useState as Uo}from"react";function Wo(s){switch(s){case"init":case"load":case"xr":case"streaming":case"fullscreen":case"local-file":return s;default:return}}function ri(s,e){let[t,r]=Uo(null),i=Ss(()=>ms(s,e),[s,e]),n=ti((h,c)=>{r({error:h,phase:Wo(c?.phase)})},[]),o=Ss(()=>({event:(h,c)=>i.event?.(h,c),error:(h,c)=>{n(h,c),i.error?.(h,c)}}),[i,n]),a=ti((h,c)=>{n(h,c),i.error?.(h,c)},[i,n]),l=ti(()=>r(null),[]);return{interactionError:t,logger:o,reportError:a,clearError:l}}import{useEffect as ga}from"react";import{useEffect as Yo,useRef as Zo}from"react";function ii({isInitialized:s,sources:e,streaming:t,playlist:r,reportError:i}){let n=Zo(i);n.current=i,Yo(()=>{if(!s)return;let o=!1,a=l=>{o||l.length===0||(r.setSources(l),r.goTo(0))};if(t?.length)return We(t,cs()).then(a).catch(l=>{o||n.current(ve(l),{phase:"streaming"})}),()=>{o=!0};a(e)},[s,e,t,r.setSources,r.goTo])}import{useEffect as qo,useRef as Ts}from"react";function si({currentSource:s,index:e,onSceneChange:t}){let r=Ts(t);r.current=t;let i=Ts(null);qo(()=>{if(!s||e<0)return;let n=`${e}:${ae(s)}`;i.current!==n&&(i.current=n,r.current?.(s,e))},[s,e])}import{useEffect as jo,useState as Qo}from"react";var $o=500;function ni(s,e,t){let[r,i]=Qo(!1),n=nr(s.mode)?s.mode:null;jo(()=>{(!n||!s.xr.isActive)&&i(!1)},[n,s.xr.isActive]);let o=c=>{t(),i(!0),s.xr.setMode(c).catch(p=>{i(!1),e(ve(p),{phase:"xr",target:c})})},a=()=>{i(!1),s.xr.setMode(oe.PW).catch(c=>{e(ve(c),{phase:"xr",target:oe.PW})})},h=jr(r&&!s.error,$o)&&s.xr.isActive?n:null;return{enter:o,exit:a,activeScreenMode:h}}var Ko=`
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`,Jo=`
uniform float uOpacity;
void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, uOpacity); }`,Ze=class{#e;#i;#t;#r;#s=!1;constructor(e){this.#e=e,this.#i=new e.Scene,this.#t=new e.Mesh(new e.PlaneGeometry(2,2),new e.ShaderMaterial({uniforms:{uOpacity:{value:0}},vertexShader:Ko,fragmentShader:Jo,transparent:!0,depthTest:!1,depthWrite:!1})),this.#t.frustumCulled=!1,this.#t.renderOrder=10,this.#t.visible=!1;let t=new e.BufferGeometry;t.setAttribute("position",new e.BufferAttribute(new Float32Array(0),3)),this.#r=new e.Mesh(t,new e.MeshBasicMaterial({transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,side:e.DoubleSide})),this.#r.frustumCulled=!1,this.#r.renderOrder=11,this.#r.visible=!1,this.#i.add(this.#t,this.#r)}get scene(){return this.#i}get visible(){return this.#s}sync(e){let t=e.outlineVisible?e.outlineOpacity:0,r=e.darkness;if(this.#t.visible=r>.002,this.#t.material.uniforms.uOpacity.value=r,this.#r.visible=t>.002,this.#r.visible){this.#r.material.opacity=t;let i=e.outlineUrgent?16726832:16747051;this.#r.material.color.setHex(i,this.#e.LinearSRGBColorSpace),this.#o(e.ribbon(.01))}this.#s=this.#t.visible||this.#r.visible}hide(){this.#t.visible=!1,this.#r.visible=!1,this.#s=!1}dispose(){this.#t.geometry.dispose(),this.#t.material.dispose(),this.#r.geometry.dispose(),this.#r.material.dispose(),this.#i.clear(),this.#s=!1}#o(e){let t=this.#r.geometry.getAttribute("position");if(t.array.length!==e.length){this.#r.geometry.setAttribute("position",new this.#e.BufferAttribute(e.slice(),3));return}t.array.set(e),t.needsUpdate=!0}};import{signal as we}from"@preact/signals-core";import{Container as W,Fullscreen as sa,Svg as Ie,Text as cr}from"@react-three/uikit";import{signal as Re}from"@preact/signals-core";import{forwardHtmlEvents as ea}from"@pmndrs/pointer-events";import{createRoot as ta}from"@react-three/fiber";var lr=class{#e;#i;#t;#r;#s;#o;#n=null;#a=null;#l;#c;#h=null;#p=null;#u=null;#f=!1;#m=!1;#d;#g;#y;#x;#b;#v;constructor(e,{pixelWidth:t,pixelHeight:r,worldWidth:i,worldHeight:n,cursorFactory:o,react:a=!1}){this.#s=e,this.#o=o,this.#f=a,this.#e=t*2,this.#i=r*2,this.#t=document.createElement("canvas"),this.#t.width=this.#e,this.#t.height=this.#i,this.#r=new e.WebGLRenderer({canvas:this.#t,alpha:!0,antialias:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.#r.setClearColor(0,0),this.#r.setSize(this.#e,this.#i,!1),this.#l=new e.Scene,this.#c=new e.OrthographicCamera(0,t,r,0,.1,10),this.#c.position.z=5,this.#d=new e.Raycaster,this.#g=new e.Vector3,this.#y=new e.Vector3,this.#x=new e.Quaternion,this.#b=new e.Mesh(new e.PlaneGeometry(i,n),new e.MeshBasicMaterial({visible:!1,side:e.DoubleSide}));let l=new e.SphereGeometry(.008,8,8),h=()=>new e.MeshBasicMaterial({color:65280,depthTest:!1});this.#v=[0,1].map(()=>{let c=new e.Mesh(l,h());return c.renderOrder=1001,c.visible=!1,c})}get canvas(){return this.#t}get scene(){return this.#l}get pixelWidth(){return this.#e/2}get pixelHeight(){return this.#i/2}get internalWidth(){return this.#e}get internalHeight(){return this.#i}get pointer(){return this.#n}get cursor(){return this.#a?.mesh??null}get ptrPressed(){return this.#m}get reactPending(){return this.#f}get hitMesh(){return this.#b}get hitSpheres(){return this.#v}async mountReact(e){this.#h=ta(this.#t),await this.#h.configure({frameloop:"never",orthographic:!0,size:{width:this.#e/2,height:this.#i/2},dpr:2,gl:this.#r,events:()=>({enabled:!1,priority:0,handlers:{}})}),this.#p=this.#h.render(e),this.#l=this.#p.getState().scene,this.#u=ea(this.#t,()=>this.#p.getState().camera,this.#l,{batchEvents:!1}),this.#f=!1}patchCanvasForXR(){let e=this.pixelWidth,t=this.pixelHeight;this.#t.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,right:e,bottom:t,width:e,height:t,toJSON(){}});let r=new Set;this.#t.setPointerCapture=i=>r.add(i),this.#t.releasePointerCapture=i=>r.delete(i),this.#t.hasPointerCapture=i=>r.has(i)}setPointer(e,t,r,i=!1){if(!this.#n){if(!this.#l)return;this.#n={x:e,y:t,pressed:r};let h=this.#o(this.#s);h.position.z=.06,this.#l.add(h),this.#a={mesh:h,sx:e,sy:this.pixelHeight-t}}let n=this.#n;n.x=e,n.y=t,n.pressed=r;let o=this.#a,a=this.pixelHeight-t,l=o.mesh.visible?.6:1;o.sx+=(e-o.sx)*l,o.sy+=(a-o.sy)*l,o.mesh.visible=!0,this.#p?o.mesh.position.set(o.sx-this.pixelWidth/2,o.sy-this.pixelHeight/2,.06):o.mesh.position.set(o.sx,o.sy,.06),o.mesh.material.opacity=r?1:.7,i&&this.#T(e,t,r)}clearPointer(e=!1){e&&this.#n&&this.#_(),this.#n=null,this.#a&&(this.#a.mesh.visible=!1)}renderScene(){this.#f||(this.#u?.update(),this.#p?this.#p.getState().advance(performance.now(),!0):this.#r&&this.#r.render(this.#l,this.#c))}clampAlpha(e){let t=this.#r.getContext();t.colorMask(!1,!1,!1,!0),t.clearColor(0,0,0,e),t.clear(t.COLOR_BUFFER_BIT),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0)}initFlat(){let e=!1,t=r=>{let i=this.#t.getBoundingClientRect();return{x:(r.clientX-i.left)/i.width*this.pixelWidth,y:(r.clientY-i.top)/i.height*this.pixelHeight}};this.#t.addEventListener("pointerdown",r=>{e=!0,this.#t.setPointerCapture(r.pointerId);let i=t(r);this.setPointer(i.x,i.y,!0)}),this.#t.addEventListener("pointermove",r=>{let i=t(r);this.setPointer(i.x,i.y,e)}),this.#t.addEventListener("pointerup",r=>{e=!1;let i=t(r);this.setPointer(i.x,i.y,!1)}),this.#t.addEventListener("pointerleave",()=>{e=!1,this.clearPointer()})}renderFlat(){this.#f||(this.#u?.update(),this.#p?this.#p.getState().advance(performance.now(),!0):this.#r&&this.#r.render(this.#l,this.#c))}castRay(e,t){let r=e.rayTransform.position,i=e.rayTransform.orientation;return this.#g.set(r.x,r.y,r.z),this.#y.set(0,0,-1).applyQuaternion(this.#x.set(i.x,i.y,i.z,i.w)),this.rayHitQuad(this.#g,this.#y,t)}rayHitQuad(e,t,r=0){let i=this.pixelWidth,n=this.pixelHeight,o=this.#v[r];this.#d.ray.origin.copy(e),this.#d.ray.direction.copy(t);let a=this.#d.intersectObject(this.#b);if(a.length===0)return o.visible=!1,null;let l=a[0].point,h=a[0].uv;if(!h)return o.visible=!1,null;let c=h.x*i,p=(1-h.y)*n;return c<0||c>i||p<0||p>n?(o.visible=!1,null):(o.position.copy(l),o.visible=!0,o.updateMatrixWorld(!0),{x:c,y:p})}gazeHitsQuad(e,t){if(!e?.transform)return!0;let r=e.transform.position,i=e.transform.orientation,n=-2*(i.w*i.y+i.x*i.z),o=-2*(i.y*i.z-i.w*i.x),a=2*(i.x*i.x+i.y*i.y)-1,l=t||this.#b.position,h=l.x-r.x,c=l.y-r.y,p=l.z-r.z,u=Math.sqrt(h*h+c*c+p*p)||1;return(n*h+o*c+a*p)/u>.6}dispose(){this.#u?.destroy(),this.#u=null,this.#h&&(this.#h.unmount(),this.#h=null,this.#p=null),this.#r?.dispose(),this.#r=null}#T(e,t,r){let i=this.#m;this.#m=r;let n={clientX:e,clientY:t,pointerId:1,pointerType:"mouse",isPrimary:!0};r&&!i&&this.#t.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1,bubbles:!0})),this.#t.dispatchEvent(new PointerEvent("pointermove",{...n,buttons:r?1:0,bubbles:!0})),!r&&i&&this.#t.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0,bubbles:!0}))}#_(){let e={pointerId:1,pointerType:"mouse",isPrimary:!0};this.#m&&this.#t.dispatchEvent(new PointerEvent("pointerup",{...e,button:0,buttons:0,bubbles:!0})),this.#t.dispatchEvent(new PointerEvent("pointerleave",{...e,bubbles:!1})),this.#m=!1}};var ra=`attribute vec2 a_pos;
varying vec2 v_uv;
uniform mat4 u_mvp;
void main() {
    v_uv = a_pos + 0.5;
    gl_Position = u_mvp * vec4(a_pos, 0.0, 1.0);
}`,ia=`precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_alpha;
void main() {
    vec4 c = texture2D(u_tex, v_uv);
    gl_FragColor = vec4(c.rgb, c.a * u_alpha);
}`,hr=class{#e=null;#i=null;#t=null;#r=!1;#s=null;#o=null;#n=null;#a=null;#l=null;#c=null;#h=null;#p=null;#u;#f;#m;#d;#g;#y;#x;#b;#v;#T;#_;constructor(e,{worldWidth:t,worldHeight:r,internalWidth:i,internalHeight:n,canvas:o}){this.#v=t,this.#T=r,this.#x=i,this.#b=n,this.#_=o,this.#u=new e.Matrix4,this.#f=new e.Matrix4,this.#m=new e.Matrix4,this.#d=new e.Vector3,this.#g=new e.Quaternion,this.#y=new e.Vector3(t,r,1)}get projected(){return this.#r}get layer(){return this.#i}get pose(){return this.#s??null}async init(e,t,r,i){if(this.#e=i,t)try{return this.#t=t,this.#i=t.createQuadLayer({space:r,viewPixelWidth:this.#x,viewPixelHeight:this.#b,layout:"mono",isStatic:!1,width:this.#v/2,height:this.#T/2}),this.stash(),this.#i}catch{this.#i=null,this.#t=null}return this.#r=!0,this.#w(i),null}stash(){this.#o=null,this.#i&&(this.#i.transform=new XRRigidTransform({x:0,y:-1e3,z:0},{x:0,y:0,z:0,w:1}))}setTransform(e){this.#s=e,this.#o=e}applyPose(e,t,r,i,n,o,a){let l=new XRRigidTransform({x:e,y:t,z:r},{x:i,y:n,z:o,w:a});this.#s=l,this.#o=l}upload(e){this.#i?(this.#o&&(this.#i.transform=this.#o,this.#o=null),this.#S(e,this.#t.getSubImage(this.#i,e)?.colorTexture)):(this.#S(e,this.#c),this.#o=null)}renderEye(e,t,r,i,n,o,a,l){if(!this.#r||!l||!this.#s)return;let h=this.#s.position,c=this.#s.orientation;this.#d.set(h.x,h.y,h.z),this.#g.set(c.x,c.y,c.z,c.w),this.#u.compose(this.#d,this.#g,this.#y),this.#m.fromArray(t.transform.inverse.matrix),this.#f.multiplyMatrices(this.#m,this.#u),this.#m.fromArray(t.projectionMatrix),this.#f.premultiply(this.#m),e.viewport(r,i,n,o),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(this.#n),e.uniformMatrix4fv(this.#h,!1,this.#f.elements),e.uniform1f(this.#p,a),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.#c),e.bindVertexArray(this.#a),e.drawArrays(e.TRIANGLES,0,6),e.bindVertexArray(null),e.disable(e.BLEND),e.useProgram(null)}dispose(){let e=this.#e;e&&this.#r&&(this.#n&&e.deleteProgram(this.#n),this.#a&&e.deleteVertexArray(this.#a),this.#l&&e.deleteBuffer(this.#l),this.#c&&e.deleteTexture(this.#c)),this.#i=this.#t=this.#e=null,this.#n=this.#a=this.#l=this.#c=null}#w(e){let t=e.createShader(e.VERTEX_SHADER);e.shaderSource(t,ra),e.compileShader(t);let r=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(r,ia),e.compileShader(r),this.#n=e.createProgram(),e.attachShader(this.#n,t),e.attachShader(this.#n,r),e.linkProgram(this.#n),e.deleteShader(t),e.deleteShader(r),this.#h=e.getUniformLocation(this.#n,"u_mvp"),this.#p=e.getUniformLocation(this.#n,"u_alpha"),e.useProgram(this.#n),e.uniform1i(e.getUniformLocation(this.#n,"u_tex"),0),e.uniform1f(this.#p,1);let i=e.getAttribLocation(this.#n,"a_pos");this.#a=e.createVertexArray(),e.bindVertexArray(this.#a),this.#l=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.#l),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-.5,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5]),e.STATIC_DRAW),e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),this.#c=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.#c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.#x,this.#b,0,e.RGBA,e.UNSIGNED_BYTE,null),e.generateMipmap(e.TEXTURE_2D)}#S(e,t){if(!t)return;let r=this.#e,i=!this.#r;r.bindTexture(r.TEXTURE_2D,t),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,this.#r?r.LINEAR_MIPMAP_LINEAR:r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!0),i&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,this.#_),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),i&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this.#r&&r.generateMipmap(r.TEXTURE_2D)}};function oi(s,e,t){let r=Math.sqrt(s*s+e*e+t*t)||1,i=Math.atan2(s/r,t/r)+Math.PI,n=Math.asin(e/r),o=i/2,a=n/2,l=Math.cos(o),h=Math.sin(o),c=Math.cos(a),p=Math.sin(a);return{qx:l*p,qy:h*c,qz:-h*p,qw:l*c}}var qe=class{#e;#i;#t=!1;#r=!1;#s;#o;#n=null;#a=null;#l=!1;#c=null;#h=!1;#p=!1;#u=!1;#f=null;alpha=1;onDragTick=null;onDragEnd=null;constructor(e,t){this.#s=t.quadZ??.5,this.#o=t.quadY??-.5,this.#e=new lr(e,t),this.#i=new hr(e,{worldWidth:t.worldWidth,worldHeight:t.worldHeight,internalWidth:this.#e.internalWidth,internalHeight:this.#e.internalHeight,canvas:this.#e.canvas})}get canvas(){return this.#e.canvas}get scene(){return this.#e.scene}get pixelWidth(){return this.#e.pixelWidth}get pixelHeight(){return this.#e.pixelHeight}get hitMesh(){return this.#e.hitMesh}get hitSpheres(){return this.#e.hitSpheres}get pointer(){return this.#e.pointer}get cursor(){return this.#e.cursor}async mountReact(e){return this.#e.mountReact(e)}rayHitQuad(e,t,r){return this.#e.rayHitQuad(e,t,r)}gazeHitsQuad(e,t){return this.#e.gazeHitsQuad(e,t)}get projected(){return this.#i.projected}get layer(){return this.#i.layer}get pose(){return this.#i.pose}get visible(){return this.#t}get placing(){return this.#r}get session(){return this.#n}get interacting(){return this.#t&&(this.#p||this.#l||this.#u||!!this.#a)}get dragging(){return this.#l}set dragging(e){this.#l=e}get panelDragging(){return this.#u}set panelDragging(e){this.#u=e,e||this.onDragEnd?.()}setPointer(e,t,r){this.#e.setPointer(e,t,r,!!this.#n)}clearPointer(){this.#e.clearPointer(!!this.#n)}initFlat(){this.#t=!0,this.#e.initFlat()}renderFlat(){this.#t&&this.#e.renderFlat()}async init(e,t,r,i){return this.#n=e,this.#e.patchCanvasForXR(),this.#i.init(e,t,r,i)}show(){this.#r=!0}hide(){if(this.#e.clearPointer(!!this.#n),this.#l=!1,this.#c=null,this.#a=null,this.#u=!1,this.onDragEnd?.(),this.#t&&this.#i.pose){let e=this.#i.pose.position,t=this.#i.pose.orientation;this.#f={x:e.x,y:e.y,z:e.z,qx:t.x,qy:t.y,qz:t.z,qw:t.w}}this.#t=this.#r=!1;for(let e of this.#e.hitSpheres)e.visible=!1;this.#i.stash()}setTransform(e){this.#i.setTransform(e)}stash(){this.#i.stash()}applyPose(e,t,r,i,n,o,a){this.#i.applyPose(e,t,r,i,n,o,a);let l=this.#e.hitMesh;l.position.set(e,t,r),l.quaternion.set(i,n,o,a),l.updateMatrixWorld(!0)}updatePosition(e){if(!this.#r||!e)return;if(this.#r=!1,this.#t=!0,this.#f){let f=this.#f;this.#f=null,this.applyPose(f.x,f.y,f.z,f.qx,f.qy,f.qz,f.qw);return}let t=e.transform.position,r=e.transform.orientation,i=Math.atan2(2*(r.w*r.y+r.x*r.z),1-2*(r.y*r.y+r.z*r.z)),n=-Math.sin(i),o=-Math.cos(i),a=t.x+n*this.#s,l=t.y+this.#o,h=t.z+o*this.#s,{qx:c,qy:p,qz:u,qw:d}=oi(a-t.x,l-t.y,h-t.z);this.applyPose(a,l,h,c,p,u,d)}drawContent(e){!this.#t||this.#e.reactPending||(this.#e.renderScene(),this.alpha<1&&!this.#i.projected&&this.#e.clampAlpha(this.alpha),this.#i.upload(e))}renderEye(e,t,r,i,n,o){this.#i.renderEye(e,t,r,i,n,o,this.alpha,this.#t)}handleInput(e,t,r){if(!this.#n)return!1;let i=!1,n=!1,o=null,a=null;for(let h of this.#e.hitSpheres)h.visible=!1;for(let[h,c]of[["left",e],["right",t]]){if(c?.menuPressed&&(i=!0),!c?.active||!this.#t||!c.rayTransform||c.held)continue;let p=h==="left"?0:1,u=this.#e.castRay(c,p);if(u){let d={hand:c,hit:u,side:h,trigger:!!c.triggerPressed};h==="left"?o=d:a=d}}let l=!!(o||a);if(this.#u){if(this.#i.pose&&r?.transform&&this.onDragTick){let h=this.onDragTick(e,t,r,this.#c,this.#i.pose);h?this.applyPose(h.x,h.y,h.z,h.qx,h.qy,h.qz,h.qw):(this.#u=!1,this.onDragEnd?.())}}else{let h=null;if(this.#a){let c=this.#a==="left"?o:a,p=this.#a==="left"?e:t,u=!!p?.triggerPressed;h=c||(u?{hand:p,hit:null,side:this.#a,trigger:u}:null),u||(this.#a=null)}if(!h){let c=this.#c;h=c==="left"?o||a:c==="right"?a||o:o||a}if(h){this.#c=h.side??this.#c;let c=this.#c==="left"?1:0;if(this.#e.hitSpheres[c].visible=!1,h.hit){let p=this.#e.ptrPressed;this.setPointer(h.hit.x,h.hit.y,h.trigger),h.trigger&&!p&&!this.#a&&(this.#a=this.#c)}else this.#e.pointer?this.setPointer(this.#e.pointer.x,this.#e.pointer.y,h.trigger):this.clearPointer();h.hand?.isTransientPointer&&(n=!0)}else this.clearPointer(),this.#c=null;this.#p=!!(o||a)}return i&&!this.#h&&(this.#t||this.#r?l||this.hide():this.show()),this.#h=i,n}dispose(){this.#t=!1,this.#n=null,this.#e.dispose(),this.#i.dispose()}};var je=class{_quad;_sig=null;onPlayPause=null;onSeek=null;onPresetCycle=null;onExit=null;onClose=null;onSceneNav=null;constructor(e,t){this._quad=new qe(e,{...t,react:!0})}get quad(){return this._quad}_createBaseSignals(){return{loadingD:Re("none"),contentD:Re("flex"),playD:Re("flex"),pauseD:Re("none"),spinD:Re("none"),spinR:Re(0),fillD:Re("flex"),spinFast:Re(!1)}}_updatePlayback(e,{loading:t,playing:r,spinning:i,buffering:n,progress:o}){e.loadingD.value=t?"flex":"none",e.contentD.value=t?"none":"flex",e.playD.value=!i&&!r?"flex":"none",e.pauseD.value=!i&&r?"flex":"none",e.spinD.value=i?"flex":"none",e.fillD.value=n?"none":"flex",e.spinFast.value=i&&!n,this._quad.dragging||this._setProgress(o)}render(e){let t=this._sig;if(!this._quad.visible||!t)return;let r=t.loadingD.value==="flex",i=r?20:t.spinFast.value?14:6;(t.spinD.value==="flex"||r)&&(t.spinR.value-=e*i)}_seekFromEvent(e){this._seekTo(e.point.x+this._quad.pixelWidth/2)}_seekTo(e){}_setProgress(e){}};import{jsx as k,jsxs as ur}from"react/jsx-runtime";var Je=s=>`data:image/svg+xml,${encodeURIComponent(s)}`,na=Je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#aaaaaa"/></svg>'),oa=Je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#aaaaaa"/></svg>'),aa=Je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#666666"/></svg>'),Ms=Je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1 1 2 12L5 12A7 7 0 1 0 12 5Z" fill="#888888"/></svg>'),la=Je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z" fill="#888888"/></svg>'),ha=Je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.6 16.6L10 18l6-6-6-6-1.4 1.4L13.2 12z" fill="#888888"/></svg>'),$e=30,Ae=520,Ls=72,pr=Ls+$e,_e=$e+Ls/2,Ps=14,bt=40,vt=26,Qe=6,Cs=26,dr=14,ai=dr/2,fr=20,li=fr/2,wt=50,Es=32,hi={borderOpacity:.65},Ke=class extends je{#e=0;#i=0;constructor(e){let r=.86*(pr/Ae);super(e,{pixelWidth:Ae,pixelHeight:pr,worldWidth:.86,worldHeight:r,quadY:-.3,cursorFactory:i=>{let n=new i.Mesh(new i.CircleGeometry(4,32),new i.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#t().catch(i=>{})}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:o="0:00 / 0:00",presetName:a=null,sceneText:l=null,sceneLabel:h=null}){let c=this._sig;if(c&&(this._updatePlayback(c,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),c.timeT.value=o,c.presetT&&a!=null&&(c.presetT.value=a),l!=null&&(c.sceneT.value=l),h!=null)){let p=String(h);c.sceneSub.value=p.length>Es?`${p.slice(0,Es-2)}...`:p}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-this.#e)/this.#i));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=this.#i*e;t.fillW.value=Math.max(.001,r),t.thumbL.value=this.#e+r-ai,t.thumbGlowL.value=this.#e+r-li}async#t(){let e=this._quad,t=Ps,r=_e-bt/2,i=Ae-Ps-vt,n=_e-vt/2,o=i-10,a=66,l=24,h=o-a,c=_e-l/2;o=h-8;let p=78,u=o-p,d=_e-9,f=this.#e=t+bt+12,g=this.#i=u-10-f,m=this._sig={...this._createBaseSignals(),fillW:we(.001),thumbL:we(f-ai),thumbGlowL:we(f-li),thumbS:we(1),thumbGlowOp:we(0),timeT:we("0:00 / 0:00"),sceneT:we("1/1"),sceneSub:we("SCENE"),presetT:we("Off")},w=()=>{m.thumbGlowOp.value=.5,m.thumbS.value=1.15},I=()=>{e.dragging||(m.thumbGlowOp.value=0,m.thumbS.value=1)},P=C=>{C.target.setPointerCapture(C.pointerId),e.dragging=!0,this._seekFromEvent(C)},v=C=>{e.dragging&&this._seekFromEvent(C)},_=()=>{e.dragging=!1,m.thumbGlowOp.value=0,m.thumbS.value=1},S={backgroundColor:1710618},b=ur(sa,{backgroundColor:657930,backgroundOpacity:.88,children:[ur(W,{positionType:"absolute",positionLeft:0,positionTop:0,width:Ae,height:pr,display:m.contentD,borderWidth:1,borderColor:3355443,borderOpacity:.3,children:[k(W,{positionType:"absolute",positionLeft:0,positionTop:0,width:wt,height:$e,hover:S,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(-1),children:k(Ie,{src:la,width:18,height:18,pointerEvents:"none"})}),ur(W,{positionType:"absolute",positionLeft:wt,positionTop:0,width:Ae-wt*2,height:$e,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,overflow:"hidden",children:[k(cr,{fontSize:13,color:11184810,children:m.sceneT}),k(cr,{fontSize:10,color:6710886,children:m.sceneSub})]}),k(W,{positionType:"absolute",positionLeft:Ae-wt,positionTop:0,width:wt,height:$e,hover:S,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(1),children:k(Ie,{src:ha,width:18,height:18,pointerEvents:"none"})}),k(W,{positionType:"absolute",positionLeft:0,positionTop:$e,width:Ae,height:.5,backgroundColor:3355443,backgroundOpacity:.5,pointerEvents:"none"}),ur(W,{positionType:"absolute",positionLeft:t,positionTop:r,width:bt,height:bt,borderRadius:bt/2,borderWidth:1,borderColor:4473924,borderOpacity:.5,hover:hi,alignItems:"center",justifyContent:"center",onClick:()=>this.onPlayPause?.(),children:[k(Ie,{display:m.playD,src:na,width:20,height:20,marginLeft:2,pointerEvents:"none"}),k(Ie,{display:m.pauseD,src:oa,width:18,height:18,pointerEvents:"none"}),k(Ie,{display:m.spinD,src:Ms,width:24,height:24,transformRotateZ:m.spinR,pointerEvents:"none"})]}),k(W,{positionType:"absolute",positionLeft:f,positionTop:_e-Cs/2,width:g,height:Cs,onPointerEnter:w,onPointerLeave:I,onPointerDown:P,onPointerMove:v,onPointerUp:_}),k(W,{positionType:"absolute",positionLeft:f,positionTop:_e-Qe/2,width:g,height:Qe,borderRadius:Qe/2,backgroundColor:2236962,backgroundOpacity:.8,pointerEvents:"none"}),k(W,{positionType:"absolute",positionLeft:f,positionTop:_e-Qe/2,width:m.fillW,height:Qe,borderRadius:Qe/2,backgroundColor:7829367,display:m.fillD,zIndexOffset:1,pointerEvents:"none"}),k(W,{positionType:"absolute",positionLeft:m.thumbGlowL,positionTop:_e-fr/2,width:fr,height:fr,borderRadius:li,borderWidth:2,borderColor:10066329,borderOpacity:m.thumbGlowOp,zIndexOffset:2,pointerEvents:"none"}),k(W,{positionType:"absolute",positionLeft:m.thumbL,positionTop:_e-dr/2,width:dr,height:dr,borderRadius:ai,backgroundColor:11184810,transformScaleX:m.thumbS,transformScaleY:m.thumbS,zIndexOffset:3,pointerEvents:"none"}),k(W,{positionType:"absolute",positionLeft:u,positionTop:d,width:p,height:18,alignItems:"center",justifyContent:"center",children:k(cr,{fontSize:13,color:16777215,opacity:.35,children:m.timeT})}),k(W,{positionType:"absolute",positionLeft:i,positionTop:n,width:vt,height:vt,borderRadius:vt/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:hi,alignItems:"center",justifyContent:"center",onClick:()=>this.onExit?.(),children:k(Ie,{src:aa,width:11,height:11,pointerEvents:"none"})}),k(W,{positionType:"absolute",positionLeft:h,positionTop:c,width:a,height:l,borderRadius:l/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:hi,alignItems:"center",justifyContent:"center",onClick:()=>this.onPresetCycle?.(),children:k(cr,{fontSize:11,color:10066329,pointerEvents:"none",children:m.presetT})})]}),k(W,{positionType:"absolute",positionLeft:0,positionTop:0,width:Ae,height:pr,backgroundColor:657930,backgroundOpacity:1,display:m.loadingD,alignItems:"center",justifyContent:"center",children:k(Ie,{src:Ms,width:40,height:40,transformRotateZ:m.spinR,pointerEvents:"none"})})]});await e.mountReact(b)}};var et=class{#e;#i;#t=null;#r=null;#s;#o;#n;#a;constructor(e,t){this.#e=e,this.#i=t;let r=t.scene,i=new e.BufferGeometry().setFromPoints([new e.Vector3(0,0,0),new e.Vector3(0,0,-5)]),n=new e.SphereGeometry(.015,6,6);this.#s=new e.MeshBasicMaterial({color:16711680,depthTest:!1}),this.#o=new e.MeshBasicMaterial({color:65280,depthTest:!1});let o=()=>{let a=new e.Group,l=new e.Group,h=new e.Line(i,new e.LineBasicMaterial({color:5227511,transparent:!0,opacity:.5,depthTest:!1}));h.visible=!1,a.add(h);let c=new e.Mesh(n,this.#s),p=new e.Mesh(n,this.#s);return c.renderOrder=p.renderOrder=999,c.visible=p.visible=!1,r.add(a,l,c,p),{ray:a,grip:l,line:h,idxSphere:c,thmSphere:p}};this.#n=o(),this.#a=o()}update(e,t){this.#l(),this.#c(this.#n,e),this.#c(this.#a,t)}dispose(){this.#t&&(this.#i.anchor.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose());for(let e of[this.#n,this.#a])e.line.material.dispose(),e.idxSphere.geometry.dispose(),e.thmSphere.geometry.dispose();this.#s.dispose(),this.#o.dispose()}#l(){let e=this.#i.bboxMesh;if(e===this.#r)return;this.#r=e;let t=this.#i.anchor;if(this.#t&&(t.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose(),this.#t=null),!e)return;let r=this.#e;this.#t=new r.LineSegments(new r.EdgesGeometry(e.geometry),new r.LineBasicMaterial({color:58879,transparent:!0,opacity:.35,depthTest:!1})),this.#t.position.copy(e.position),t.add(this.#t)}#c(e,t){if(t.rayTransform&&this.#h(e.ray,t.rayTransform),t.gripTransform&&this.#h(e.grip,t.gripTransform),e.line.visible=t.active,e.idxSphere.visible=e.thmSphere.visible=!1,!t.active)return;t.indexTip&&(e.idxSphere.position.set(t.indexTip.x,t.indexTip.y,t.indexTip.z),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0)),t.thumbTip&&(e.thmSphere.position.set(t.thumbTip.x,t.thumbTip.y,t.thumbTip.z),e.thmSphere.visible=!0,e.thmSphere.updateMatrixWorld(!0)),t.indexTip||(e.idxSphere.position.copy(e.grip.position),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0));let r=t.gripping?this.#o:this.#s;e.idxSphere.material=r,t.thumbTip&&(e.thmSphere.material=r)}#h(e,t){let r=t.position,i=t.orientation;e.position.set(r.x,r.y,r.z),e.quaternion.set(i.x,i.y,i.z,i.w),e.updateMatrixWorld(!0)}};import{signal as H}from"@preact/signals-core";import{Container as A,Fullscreen as ca,Svg as V,Text as ie}from"@react-three/uikit";import{jsx as y,jsxs as fe}from"react/jsx-runtime";var z=9684710,ue=1122603,pa=661021,G=680,Ne=248,le=34,Te=48,Se=le+Te,Fs=Te,_t=26,Fe=Ne+Fs,Rs=32,Z=88,Ge=60,Be=Ne-Ge,ze=(G-Z)/6,de=Math.round(G/3),Bs=12,he=34,St=Z+Bs,zs=G-Z-Bs*2,mr=Se+50,As=zs-he,Y=s=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${s}" fill="#93c6e6"/></svg>`),U={play:Y("M8 5v14l11-7z"),pause:Y("M6 4h4v16H6zm8 0h4v16h-4z"),spin:Y("M12 2a10 10 0 1 1-10 10h3a7 7 0 1 0 7-7z"),bulb:Y("M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"),mute:Y("M7 9v6h4l5 5V4l-5 5H7z"),vol:Y("M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"),reset:Y("M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"),exit:Y("M17 7l-1.4 1.4L18.2 11H8v2h10.2l-2.6 2.6L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"),grip:Y("M15.5 15.4V8.6L18.9 12l-3.4 3.4zM8.5 8.6v6.8L5.1 12l3.4-3.4z"),close:Y("M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"),scale:Y("M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z"),lock:Y("M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"),unlk:Y("M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"),arrL:Y("M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"),arrR:Y("M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z")},Tt={backgroundColor:1849416},ks=.9,ua=-.55,Is=.866,tt=class extends je{#e;#i=null;#t;#r;onMuteToggle=null;onScaleLockToggle=null;onLockToggle=null;onReset=null;constructor(e){super(e,{pixelWidth:G,pixelHeight:Fe,worldWidth:1,worldHeight:Fe/G,quadZ:ks,quadY:ua,cursorFactory:t=>{let r=new t.Mesh(new t.CircleGeometry(5,32),new t.MeshBasicMaterial({color:z,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return r.renderOrder=999,r}}),this.#e=e,this.#t=new e.Vector3,this.#r=new e.Quaternion,this._quad.alpha=.9,this._quad.onDragTick=(t,r,i,n,o)=>this.#s(t,r,i,n,o),this._quad.onDragEnd=()=>{this.#i=null,this._quad.alpha=.9},this.#o().catch(t=>{})}#s(e,t,r,i,n){let o=this.#e,a=this.#i,l=a?.side??i??"right",h=l==="left"?e:t;if(!h?.triggerPressed)return this.#i=null,null;let c=h.rayTransform?.orientation;if(!c){let _=n.position,S=n.orientation;return{x:_.x,y:_.y,z:_.z,qx:S.x,qy:S.y,qz:S.z,qw:S.w}}let p=this.#t.set(0,0,-1).applyQuaternion(this.#r.set(c.x,c.y,c.z,c.w));if(!a){let _=r.transform.position,S=new o.Vector3(_.x,_.y,_.z),b=n.position,C=new o.Vector3(b.x,b.y,b.z).sub(S);this.#i={side:l,R:C.length()||ks,oQ:new o.Quaternion().setFromUnitVectors(p.clone(),C.normalize()),eye:S};let N=n.orientation;return{x:b.x,y:b.y,z:b.z,qx:N.x,qy:N.y,qz:N.z,qw:N.w}}if(p.applyQuaternion(a.oQ),Math.abs(p.y)>Is){p.y=Math.sign(p.y)*Is;let _=Math.sqrt(p.x*p.x+p.z*p.z)||1e-6,S=Math.sqrt(1-p.y*p.y)/_;p.x*=S,p.z*=S}let u=a.eye,d=a.R,f=u.x+p.x*d,g=u.y+p.y*d,m=u.z+p.z*d,{qx:w,qy:I,qz:P,qw:v}=oi(p.x,p.y,p.z);return{x:f,y:g,z:m,qx:w,qy:I,qz:P,qw:v}}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:o="0:00 / 0:00",presetName:a=null,muted:l=!1,locked:h=!1,scaleLocked:c=!0,sceneText:p=null,sceneLabel:u=null,bannerText:d=null}){let f=this._sig;if(f){if(this._updatePlayback(f,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),f.playTextD.value=r?"none":"flex",f.playLbl.value=t?"PAUSE":"PLAY",f.timeT.value=o,a!=null&&(f.presetT.value=a),f.icA.value=l?"none":"flex",f.icB.value=l?"flex":"none",f.muteLbl.value=l?"UNMUTE":"MUTE",f.sclLkLbl.value=c?"UNLOCK SCALE":"LOCK SCALE",f.lockA.value=h?"none":"flex",f.lockB.value=h?"flex":"none",f.lockLbl.value=h?"UNLOCK SCENE":"LOCK SCENE",p!=null&&(f.sceneT.value=p),u!=null){let g=String(u);f.sceneSub.value=g.length>Rs?`${g.slice(0,Rs-2)}...`:g}d!=null&&(f.bannerT.value=d)}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-St-he/2)/As));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=As*e;t.thumbL.value=St+r-2,t.fillW.value=Math.max(he,he+r)}async#o(){let e=this._sig={...this._createBaseSignals(),playTextD:H("flex"),playLbl:H("PAUSE"),fillW:H(he),thumbL:H(St-2),thumbS:H(1),timeT:H("0:00 / 0:00"),sceneT:H("1/5"),sceneSub:H("SCENE"),icA:H("flex"),icB:H("none"),muteLbl:H("MUTE"),sclLkLbl:H("LOCK SCALE"),lockA:H("flex"),lockB:H("none"),lockLbl:H("LOCK SCENE"),presetT:H("OFF"),bannerT:H("")},t=({x:d,y:f,w:g,h:m})=>y(A,{positionType:"absolute",positionLeft:d,positionTop:f,width:g,height:m,backgroundColor:z,backgroundOpacity:.3}),r=({idx:d,onClick:f,children:g})=>{let m=Z+d*ze;return y(A,{positionType:"absolute",positionLeft:m,positionTop:Be,width:ze,height:Ge,backgroundColor:ue,hover:Tt,onClick:f,children:y(A,{width:"100%",height:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",children:g})})},i=this._quad,n=()=>{e.thumbS.value=1.08},o=()=>{i.dragging||(e.thumbS.value=1)},a=d=>{d.target.setPointerCapture(d.pointerId),i.dragging=!0,this._seekFromEvent(d)},l=d=>{i.dragging&&this._seekFromEvent(d)},h=()=>{i.dragging=!1,e.thumbS.value=1},c=d=>{d.target.setPointerCapture(d.pointerId),i.panelDragging=!0,i.alpha=.3},p=()=>{i.panelDragging=!1},u=fe(ca,{backgroundColor:ue,children:[fe(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:G,height:Fe,display:e.contentD,children:[y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:G,height:le,backgroundColor:z,backgroundOpacity:.85}),y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:G,height:le,alignItems:"center",justifyContent:"center",children:y(ie,{fontSize:13,fontWeight:"bold",color:ue,children:e.bannerT})}),y(A,{positionType:"absolute",positionLeft:0,positionTop:le,width:de,height:Te,backgroundColor:ue,hover:Tt,onClick:()=>this.onSceneNav?.(-1)}),y(A,{positionType:"absolute",positionLeft:0,positionTop:le,width:de,height:Te,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:y(V,{src:U.arrL,width:28,height:28})}),y(t,{x:de,y:le,w:.5,h:Te}),fe(A,{positionType:"absolute",positionLeft:de,positionTop:le,width:G-de*2,height:Te,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,overflow:"hidden",children:[y(ie,{fontSize:22,color:z,children:e.sceneT}),y(ie,{fontSize:10,color:z,opacity:.45,children:e.sceneSub})]}),y(t,{x:G-de,y:le,w:.5,h:Te}),y(A,{positionType:"absolute",positionLeft:G-de,positionTop:le,width:de,height:Te,backgroundColor:ue,hover:Tt,onClick:()=>this.onSceneNav?.(1)}),y(A,{positionType:"absolute",positionLeft:G-de,positionTop:le,width:de,height:Te,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:y(V,{src:U.arrR,width:28,height:28})}),y(t,{x:0,y:Se,w:G,h:.5}),y(A,{positionType:"absolute",positionLeft:0,positionTop:Se,width:Z,height:Ne-Se,backgroundColor:ue,hover:Tt,onClick:()=>this.onPlayPause?.()}),fe(A,{positionType:"absolute",positionLeft:0,positionTop:Se,width:Z,height:Ne-Se,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,pointerEvents:"none",children:[y(V,{display:e.playD,src:U.play,width:20,height:24,marginLeft:2}),y(V,{display:e.pauseD,src:U.pause,width:20,height:24}),y(V,{display:e.spinD,src:U.spin,width:28,height:28,transformRotateZ:e.spinR}),y(ie,{fontSize:13,fontWeight:"bold",color:z,display:e.playTextD,children:e.playLbl})]}),y(t,{x:Z,y:Se,w:.5,h:Ne-Se}),y(A,{positionType:"absolute",positionLeft:Z+16,positionTop:Se+14,width:120,height:20,children:y(ie,{fontSize:14,color:z,children:e.timeT})}),y(A,{positionType:"absolute",positionLeft:St,positionTop:mr,width:zs,height:he,backgroundColor:pa,onPointerEnter:n,onPointerLeave:o,onPointerDown:a,onPointerMove:l,onPointerUp:h}),y(A,{positionType:"absolute",positionLeft:St,positionTop:mr,width:e.fillW,height:he,backgroundColor:z,backgroundOpacity:.85,display:e.fillD,zIndexOffset:1,pointerEvents:"none"}),y(A,{positionType:"absolute",positionLeft:e.thumbL,positionTop:mr-2,width:he+4,height:he+4,backgroundColor:ue,borderWidth:2,borderColor:z,borderOpacity:.5,zIndexOffset:3,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none"}),y(A,{positionType:"absolute",positionLeft:e.thumbL,positionTop:mr-2,width:he+4,height:he+4,alignItems:"center",justifyContent:"center",zIndexOffset:4,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none",children:y(V,{src:U.grip,width:18,height:18})}),y(t,{x:Z,y:Be,w:G-Z,h:.5}),fe(r,{idx:0,onClick:()=>this.onPresetCycle?.(),children:[y(V,{src:U.bulb,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:z,children:e.presetT})]}),y(t,{x:Z+ze,y:Be,w:.5,h:Ge}),fe(r,{idx:1,onClick:()=>this.onMuteToggle?.(),children:[y(V,{display:e.icA,src:U.mute,width:20,height:20}),y(V,{display:e.icB,src:U.vol,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:z,children:e.muteLbl})]}),y(t,{x:Z+ze*2,y:Be,w:.5,h:Ge}),fe(r,{idx:2,onClick:()=>this.onScaleLockToggle?.(),children:[y(V,{src:U.scale,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:z,children:e.sclLkLbl})]}),y(t,{x:Z+ze*3,y:Be,w:.5,h:Ge}),fe(r,{idx:3,onClick:()=>this.onLockToggle?.(),children:[y(V,{display:e.lockA,src:U.unlk,width:20,height:20}),y(V,{display:e.lockB,src:U.lock,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:z,children:e.lockLbl})]}),y(t,{x:Z+ze*4,y:Be,w:.5,h:Ge}),fe(r,{idx:4,onClick:()=>this.onReset?.(),children:[y(V,{src:U.reset,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:z,children:"RESET SCENE"})]}),y(t,{x:Z+ze*5,y:Be,w:.5,h:Ge}),fe(r,{idx:5,onClick:()=>this.onExit?.(),children:[y(V,{src:U.exit,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:z,children:"EXIT"})]}),y(t,{x:0,y:Ne,w:G,h:.5}),y(A,{positionType:"absolute",positionLeft:0,positionTop:Ne+1,width:G,height:Fs-1,backgroundColor:ue,hover:Tt,alignItems:"center",justifyContent:"center",onPointerDown:c,onPointerUp:p,children:y(ie,{fontSize:12,color:z,opacity:.45,pointerEvents:"none",children:"DRAG TO MOVE THE MENU"})}),y(A,{positionType:"absolute",positionLeft:G-_t-4,positionTop:(le-_t)/2,width:_t,height:_t,borderRadius:_t/2,backgroundColor:ue,backgroundOpacity:.8,borderWidth:1,borderColor:z,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",zIndexOffset:10,onClick:()=>this.onClose?.(),children:y(V,{src:U.close,width:12,height:12,pointerEvents:"none"})}),y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:G,height:.5,backgroundColor:z,backgroundOpacity:.3,zIndexOffset:10}),y(A,{positionType:"absolute",positionLeft:0,positionTop:Fe-.5,width:G,height:.5,backgroundColor:z,backgroundOpacity:.3,zIndexOffset:10}),y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:.5,height:Fe,backgroundColor:z,backgroundOpacity:.3,zIndexOffset:10}),y(A,{positionType:"absolute",positionLeft:G-.5,positionTop:0,width:.5,height:Fe,backgroundColor:z,backgroundOpacity:.3,zIndexOffset:10})]}),y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:G,height:Fe,backgroundColor:ue,backgroundOpacity:1,display:e.loadingD,alignItems:"center",justifyContent:"center",children:y(V,{src:U.spin,width:64,height:64,transformRotateZ:e.spinR,pointerEvents:"none"})})]});await i.mountReact(u)}};var rt=class{#e;#i;#t;#r=null;#s;#o;#n;constructor(e){this.#e=e,this.#i=new e.Scene,this.#t=new e.Group,this.#i.add(this.#t),this.#s=new e.Vector3,this.#o=new e.Vector3,this.#n=new e.Raycaster}get scene(){return this.#i}get anchor(){return this.#t}get bboxMesh(){return this.#r}get hasBBox(){return!!this.#r}rebuildBBox(e,t){let r=this.#e;this.#r&&(this.#t.remove(this.#r),this.#r.geometry.dispose(),this.#r.material.dispose());let i=(e.minX+e.maxX)/2,n=(e.minY+e.maxY)/2,o=(e.minZ+e.maxZ)/2,a=new r.Box3(new r.Vector3(e.minX,e.minY,e.minZ),new r.Vector3(e.maxX,e.maxY,e.maxZ)).applyMatrix4(new r.Matrix4().fromArray(t)),l=a.getSize(new r.Vector3).max(new r.Vector3(.1,.1,.1)),h=a.getCenter(new r.Vector3),c=new r.BoxGeometry(l.x,l.y,l.z);return this.#r=new r.Mesh(c,new r.MeshBasicMaterial({visible:!1,side:r.DoubleSide})),this.#r.position.copy(h),this.#t.add(this.#r),{cx:i,cy:n,cz:o}}applyTransform(e,t){this.#t.position.set(e[0],e[1],e[2]),this.#t.scale.set(t,t,-t),this.#t.quaternion.identity(),this.#t.updateMatrixWorld(!0)}hitTest(e){if(!this.#r)return!1;let t=e.position,r=e.orientation;return this.#s.set(t.x,t.y,t.z),this.#o.set(-2*(r.w*r.y+r.x*r.z),-2*(r.y*r.z-r.w*r.x),2*(r.x*r.x+r.y*r.y)-1),this.#n.set(this.#s,this.#o),this.#n.intersectObject(this.#r,!1).length>0}};var it=class s{#e;#i;#t;#r;#s;#o;static#n=1.5;static#a=.04;static#l=.15;static#c=4;static#h=20;static#p=.003;static#u=.001;static#f=.7;constructor(e,t){this.#e=e,this.#i=this.#m(),this.#t=this.#m(),this.#r=this.#d(),this.#s=this.#d(),this.#o=new e.Vector3,t.add(this.#i.group,this.#t.group,this.#r,this.#s)}update(e,t,r,i=!0){this.#g(this.#i,this.#r,i?e:null,r?.[0]),this.#g(this.#t,this.#s,i?t:null,r?.[1])}dispose(){for(let e of[this.#i,this.#t])e.mesh.geometry.dispose(),e.mesh.material.dispose();for(let e of[this.#r,this.#s])e.geometry.dispose(),e.material.dispose()}#m(){let e=this.#e,t=s.#c,r=s.#h,i=s.#n,n=s.#a,o=s.#l,a=s.#p,l=s.#u,h=s.#f,c=r+1,p=t+1,u=c*p,d=new Float32Array(u*3),f=new Float32Array(u*4),g=[];for(let v=0;v<c;v++){let _=v/r,S=-n-_*i,b=a+(l-a)*_,C=Math.min(_/o,1),N=1-_,se=h*C*N;for(let O=0;O<=t;O++){let L=O/t*Math.PI*2,X=v*p+O;d[X*3]=Math.cos(L)*b,d[X*3+1]=Math.sin(L)*b,d[X*3+2]=S,f[X*4]=1,f[X*4+1]=1,f[X*4+2]=1,f[X*4+3]=se}}for(let v=0;v<r;v++)for(let _=0;_<t;_++){let S=v*p+_,b=S+1,C=S+p,N=C+1;g.push(S,C,b,b,C,N)}let m=new e.BufferGeometry;m.setAttribute("position",new e.BufferAttribute(d,3)),m.setAttribute("color",new e.BufferAttribute(f,4)),m.setIndex(g);let w=new e.MeshBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),I=new e.Mesh(m,w);I.frustumCulled=!1,I.renderOrder=998;let P=new e.Group;return P.add(I),P.visible=!1,{mesh:I,group:P}}#d(){let e=this.#e,t=new e.RingGeometry(.004,.008,24),r=new e.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),i=new e.Mesh(t,r);return i.frustumCulled=!1,i.renderOrder=999,i.visible=!1,i}#g(e,t,r,i){if(!r?.active||!r.rayTransform||r.isTransientPointer){e.group.visible=!1,t.visible=!1;return}let n=r.rayTransform.position,o=r.rayTransform.orientation;e.group.position.set(n.x,n.y,n.z),e.group.quaternion.set(o.x,o.y,o.z,o.w),e.group.visible=!0,e.group.updateMatrixWorld(!0);let a=r.triggerPressed??!1;if(e.mesh.material.color.setRGB(a?.4:1,a?.75:1,1),i?.visible){let l=this.#o.set(n.x,n.y,n.z).distanceTo(i.position),h=s.#a+s.#n;e.mesh.scale.z=Math.min(1,l/h),t.position.copy(i.position),t.quaternion.set(o.x,o.y,o.z,o.w),t.visible=!0,t.updateMatrixWorld(!0)}else e.mesh.scale.z=1,t.visible=!1}};var st=Object.keys(ft),Gs=s=>!Number.isFinite(s)||s<0?"0:00":`${~~(s/60)}:${String(~~s%60).padStart(2,"0")}`,ci=s=>s.toUpperCase();var nt=class{#e;#i;#t;#r=null;#s=null;#o=null;#n=null;#a=null;#l=null;#c=0;#h=0;#p=0;#u=st.indexOf("off");#f=ci("off");#m=1;#d=!1;#g=!0;#y=[];#x=0;#b=!0;#v=null;#T=null;#_=null;#w=null;#S=null;#M=null;#A;#L=null;#R=null;#k=null;#P=new He;#C=null;constructor(e,{debug:t=!1,uiStyle:r="modern",rays:i=!0}={}){this.#e=e,this.#i=t,this.#t=r,this.#A=i}get uiStyle(){return this.#t}set uiStyle(e){this.#t=e}set manipulator(e){this.#s=e}get manipulator(){return this.#s}get uiActive(){return!this.#b&&(this.#r?.quad.interacting??!1)}get uiDragging(){if(this.#b)return!1;let e=this.#r?.quad;return(e?.dragging||e?.panelDragging)??!1}get quads(){let e=this.#r?.quad;return e?[e]:[]}set sources(e){this.#y=e??[],this.#x=Math.min(this.#x,Math.max(0,this.#y.length-1))}get sources(){return this.#y}set sceneIndex(e){this.#y.length&&(this.#x=Math.max(0,Math.min(this.#y.length-1,e)),this.#b=!0,this.#P.reset())}get sceneIndex(){return this.#x}set onSceneChange(e){this.#_=e}get onSceneChange(){return this.#_}set onPresetChange(e){this.#T=e}get onPresetChange(){return this.#T}set onLock(e){this.#w=e}get onLock(){return this.#w}set onScaleLock(e){this.#S=e}get onScaleLock(){return this.#S}set bounds(e){this.#P.setBounds(e??null),this.#C?.hide()}set bannerText(e){this.#v=e}get bannerText(){return this.#v}set eventLogger(e){this.#M=e}get eventLogger(){return this.#M}setPreset(e,t=this.#m){this.#m=t,this.syncPreset(e),this.#I(this.#o,e,t)}syncPreset(e){let t=st.indexOf(e);t<0||(this.#u=t,this.#f=ci(e))}async init(e,t,r,i,n,o=!1){this.#o=e;let a=this.#e,l=this.#i||this.#A;this.#r=this.#t==="modern"?new tt(a):new Ke(a),this.#z(e,t);let h=l?new rt(a):null;if(this.#k=h,h&&this.#s?.setOverlay(h),this.#d=this.#y[this.#x]?.locked??this.#d,this.#g=this.#y[this.#x]?.scaleLocked??this.#g,this.#s&&(this.#s.locked=this.#d,this.#s.scaleLocked=this.#g),this.#I(e,st[this.#u],this.#m),h){this.#r.quad.hitMesh&&h.scene.add(this.#r.quad.hitMesh);for(let p of this.#r.quad.hitSpheres)h.scene.add(p);this.#i&&(this.#L=new et(a,h)),this.#A&&(this.#R=new it(a,h.scene))}this.#n=new a.WebGLRenderer({context:n,canvas:n.canvas}),this.#n.autoClear=!1,this.#a=new a.PerspectiveCamera(50,1,.01,1e4),this.#a.matrixAutoUpdate=!1,this.#l=new a.WebGLRenderTarget(1,1),this.#n.setRenderTarget(this.#l),this.#n.setRenderTarget(null),this.#C=new Ze(a);let c=await this.#r.quad.init(t,r,i,n);return this.#c=setTimeout(()=>this.#r?.quad.show(),1e3),c?[c]:[]}frame(e,t,r,i,n,o){this.#N(o),this.#G(e,i),this.#r?.quad.updatePosition(i),this.#r?.quad.handleInput(this.#s?.leftHand,this.#s?.rightHand,i),this.#L?.update(this.#s?.leftHand,this.#s?.rightHand),this.#R?.update(this.#s?.leftHand,this.#s?.rightHand,this.#r?.quad.hitSpheres,!!this.#r?.quad.visible),this.#r?.quad.panelDragging&&this.#s?.reset(),this.#O(e,o),this.#r?.render(e),this.#r?.quad.drawContent(t)}renderEye(e,t,r,i,n,o,a){this.#C?.visible&&this.#B(e,this.#C.scene,t,r,i,n,o,a),this.#r?.quad.renderEye(e,r,i,n,o,a),this.#k&&this.#B(e,this.#k.scene,t,r,i,n,o,a)}#B(e,t,r,i,n,o,a,l){this.#n&&(this.#a.projectionMatrix.fromArray(i.projectionMatrix),this.#a.projectionMatrixInverse.copy(this.#a.projectionMatrix).invert(),this.#a.matrix.fromArray(i.transform.matrix),this.#a.matrixWorld.copy(this.#a.matrix),this.#a.matrixWorldInverse.fromArray(i.transform.inverse.matrix),this.#n.resetState(),this.#n.setRenderTargetFramebuffer(this.#l,r),this.#n.setRenderTarget(this.#l),this.#n.setViewport(n,o,a,l),this.#n.setScissor(n,o,a,l),this.#n.setScissorTest(!0),this.#n.clearDepth(),this.#n.render(t,this.#a),this.#n.resetState(),e.bindFramebuffer(e.FRAMEBUFFER,r))}onRefReset(){this.#r?.quad.visible&&this.#r.quad.show()}render(e,t){}dispose(){clearTimeout(this.#c),this.#C?.dispose(),this.#C=null,this.#P.reset(),this.#L?.dispose(),this.#L=null,this.#R?.dispose(),this.#R=null,this.#k=null,this.#n?.dispose(),this.#n=null,this.#l?.dispose(),this.#l=null,this.#a=null,this.#r?.quad.dispose(),this.#r=null,this.#s?.reset(),this.#s=null,this.#h=0}#z(e,t){let r=this.#r;r.onPlayPause=()=>{(e?.isBuffering??!1)||(e?.isPlaying?e.pause():e.play(),this.#M?.event?.("play_pause",{playing:!e?.isPlaying}))},r.onSeek=i=>{e?.seek?.(i*(e?.duration??0)),this.#M?.event?.("seek",{position:i})},r.onPresetCycle=()=>{let i=st[(this.#u+1)%st.length];this.#I(e,i,this.#m),this.#T?.(i),this.#M?.event?.("preset_cycle",{preset:i})},r.onExit=()=>{this.#M?.event?.("exit"),t?.end()},r.onClose=()=>{r.quad.hide()},r.onSceneNav=i=>{if(!this.#y.length)return;let n=Math.max(0,Math.min(this.#y.length-1,this.#x+i));n!==this.#x&&(this.#x=n,this.#b=!0,this.#P.reset(),this.#F(),this.#_?.(this.#y[this.#x],this.#x),this.#M?.event?.("scene_nav",{index:n,label:this.#y[n]?.label,dir:i}))},this.#t==="modern"&&(r.onMuteToggle=()=>{let i=this.#E(e);this.#M?.event?.("mute_toggle",{muted:!i})},r.onReset=()=>{this.#s?.resetToInitial(),this.#M?.event?.("reset")},r.onLockToggle=()=>{this.#d=!this.#d,this.#s&&(this.#s.locked=this.#d),this.#w?.(this.#d),this.#M?.event?.("lock_toggle",{locked:this.#d})},r.onScaleLockToggle=()=>{this.#g=!this.#g,this.#s&&(this.#s.scaleLocked=this.#g),this.#S?.(this.#g),this.#M?.event?.("scale_lock_toggle",{scaleLocked:this.#g})})}#F(){this.#d=this.#y[this.#x]?.locked??this.#d,this.#g=this.#y[this.#x]?.scaleLocked??this.#g}#E(e){let t=!(e?.audioEnabled??!1);return t?e?.enableAudio?.():e?.disableAudio?.(),t}#I(e,t,r=1){let i=st.indexOf(t);if(i<0)return;this.#u=i,this.#f=ci(t);let n=ft[t];n?e?.setEnvLighting(Me(n),r):e?.clearEnvLighting()}#G(e,t){let r=this.#C;if(!r)return;let i=t?.transform?.position;if(this.#b||!i||!this.#P.active){this.#P.reset(),r.hide();return}this.#P.setSceneMatrix(this.#s?.sceneMatrix??null).update(i,e),r.sync(this.#P)}#N(e){!this.#b||!e.duration||(this.#b=!1,this.#d=this.#y[this.#x]?.locked??this.#d,this.#g=this.#y[this.#x]?.scaleLocked??this.#g)}#O(e,t){let r=!(t?.audioEnabled??!1);if(this.#b)this.#r?.update({loading:!0,muted:r,locked:this.#d,scaleLocked:this.#g,sceneText:this.#y.length?`${this.#x+1}/${this.#y.length}`:"1/1",sceneLabel:(this.#y[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#v});else{let i=t?.isBuffering??!1,n=t?.duration??0;n>0&&(this.#p=n);let o=this.#p,a=t?.currentTime??0,l=Math.max(0,Math.min(1,a/(o||1)));this.#r?.update({loading:!1,playing:t?.isPlaying??!1,spinning:i,buffering:i,progress:l,timeText:`${Gs(a)} / ${Gs(o)}`,presetName:this.#f,muted:r,locked:this.#d,scaleLocked:this.#g,sceneText:this.#y.length?`${this.#x+1}/${this.#y.length}`:"1/1",sceneLabel:(this.#y[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#v})}this.#X(e)}#X(e){if(this.#h>0){this.#h-=e;return}let t=this.#s?.leftHand.microSwipe||this.#s?.rightHand.microSwipe;t&&(this.#h=.45,this.#r?.onSceneNav(t))}};import{useRef as da}from"react";import*as fa from"three";function ma(s){if(s===!1)return null;let{uiStyle:e="modern",bannerText:t="EARLY BETA"}=s??{};try{let r=new nt(fa,{uiStyle:e});return r.bannerText=t,r}catch{return null}}function pi(s){let e=da(void 0);return e.current===void 0&&(e.current=ma(s)),e.current}function ui(s,e){let{sources:t=[],streaming:r,muted:i=!1,cameraControls:n=!1,sceneSelector:o,moduleFactory:a,onReady:l,onProgress:h,onModeChange:c,onXRStart:p,onXREnd:u,onSceneChange:d,onError:f,eventLogger:g,localFiles:m,xrOverlay:w}=s,I=pi(w),{interactionError:P,logger:v,reportError:_,clearError:S}=ri(g,f);ga(()=>{ar()},[]);let{gracia:b,playlist:C}=ei({containerRef:e.container,muted:i,moduleFactory:a,overlay:I,eventLogger:v,onReady:l,onProgress:h,onModeChange:c,onXRStart:p,onXREnd:u});ii({isInitialized:b.isInitialized,sources:t,streaming:r,playlist:C,reportError:_}),si({currentSource:C.currentSource,index:C.index,onSceneChange:d});let{fileInputProps:N,enabled:se,localLabel:O,openLocalFile:L}=Kr({localFiles:m,logger:v,reportError:_,playlist:C,clearError:S}),{isFullscreen:X,toggleFullscreen:ke}=$r(e.root,_),Xe=b.isContentReady&&!b.isLoading,{playerError:wi,isBlocking:_i,toast:nn,retry:on,dismiss:an}=Qr({coreError:b.error,interactionError:P,isSceneReady:Xe,currentSource:C.currentSource,open:b.open,clearError:S}),ln=!wi&&(!b.isInitialized||!Xe),wr=ni(b,_,S);return{contextValue:{gracia:b,playlist:C,config:{sceneSelector:o,cameraControls:n},refs:e,presentation:{isBusy:ln,isSceneReady:Xe,isBlocking:_i,playerError:wi,toast:nn,retry:on,dismiss:an},shell:{isFullscreen:X,toggleFullscreen:ke,localFilesEnabled:se,fileInputProps:N,openLocalFile:L,localLabel:O},xr:{enter:wr.enter,exit:wr.exit,activeScreenMode:_i?null:wr.activeScreenMode}},gracia:b,playlist:C,openLocalFile:L,toggleFullscreen:ke}}import{useEffect as Ns,useRef as Os,useState as ya}from"react";import{jsx as $,jsxs as Mt}from"react/jsx-runtime";var Xs=()=>{let{playlist:s}=B(),e=Os(null),t=Os(s.index),[r,i]=ya(!1),n=s.currentSource,o=n?ae(n):"Select scene",a=s.total>1;return Ns(()=>{t.current!==s.index&&(t.current=s.index,i(!1))},[s.index]),Ns(()=>{if(!r)return;let l=h=>{e.current&&!e.current.contains(h.target)&&i(!1)};return document.addEventListener("click",l),()=>document.removeEventListener("click",l)},[r]),Mt("div",{ref:e,className:"gr-player__scene",children:[Mt("div",{className:"gr-player__scene-inner",children:[Mt("button",{className:"gr-player__scene-main",type:"button",disabled:!a,onClick:()=>i(!r),"aria-haspopup":"menu","aria-expanded":r,children:[$(rs,{}),Mt("span",{className:"gr-player__scene-main-copy",children:[$("span",{className:"gr-player__scene-copy",children:$("span",{className:"gr-player__scene-label",children:o})}),a&&$("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:s.sources.map((l,h)=>$("span",{className:Q("gr-player__scene-segment",h===s.index&&"is-active")},l.id??l.url??h))})]})]}),$("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasPrev,onClick:()=>s.prev(),"aria-label":"Previous scene",children:$(ir,{})}),$("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasNext,onClick:()=>s.next(),"aria-label":"Next scene",children:$(sr,{})})]}),r&&a&&$("div",{className:"gr-player__scene-menu",children:s.sources.map((l,h)=>Mt("button",{type:"button",className:Q("gr-player__scene-item",h===s.index&&"is-active"),onClick:()=>{s.goTo(h),i(!1)},children:[$("span",{children:Ee(l)?$(Ce,{}):h+1}),$("strong",{children:ae(l)})]},l.id??l.url??h))})]})};import{jsx as ce,jsxs as di}from"react/jsx-runtime";var Ds=()=>{let{playlist:s}=B(),e=s.currentSource,t=Ee(e);return ce("div",{className:"gr-player__scene gr-player__scene--stepper",children:di("div",{className:"gr-player__scene-inner",children:[ce("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasPrev,onClick:()=>s.prev(),"aria-label":"Previous scene",children:ce(ir,{})}),ce("div",{className:"gr-player__scene-main",children:di("span",{className:"gr-player__scene-main-copy",children:[t&&e?di("span",{className:"gr-player__scene-count gr-player__scene-count--local",children:[ce(Ce,{}),ce("span",{className:"gr-player__scene-label",children:ae(e)})]}):ce("span",{className:"gr-player__scene-count",children:s.index>=0?`${s.index+1} of ${s.total}`:`${s.total} scenes`}),ce("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:s.sources.map((r,i)=>ce("span",{className:Q("gr-player__scene-segment",i===s.index&&"is-active",Ee(r)&&"gr-player__scene-segment--local")},r.id??r.url??i))})]})}),ce("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasNext,onClick:()=>s.next(),"aria-label":"Next scene",children:ce(sr,{})})]})})};import{useEffect as xa,useRef as ba}from"react";import{jsx as Pt}from"react/jsx-runtime";var Hs=()=>{let{playlist:s}=B(),e=ba(null),t=s.index;return xa(()=>{e.current?.querySelector(`.gr-player__scene-tab[data-scene-index="${t}"]`)?.scrollIntoView({block:"nearest",inline:"nearest"})},[t]),Pt("div",{className:"gr-player__scene",children:Pt("div",{className:"gr-player__scene-inner",children:Pt("div",{ref:e,className:"gr-player__scene-tabs-scroll",children:s.sources.map((r,i)=>Pt("button",{type:"button","data-scene-index":i,className:Q("gr-player__scene-tab",i===s.index&&"is-active",Ee(r)&&"gr-player__scene-tab--local"),onClick:()=>s.goTo(i),"aria-label":`Open ${ae(r)}`,"aria-current":i===s.index?"true":void 0,children:Ee(r)?Pt(Ce,{}):i+1},r.id??r.url??i))})})})};import{jsx as wa}from"react/jsx-runtime";var va={tabs:Hs,stepper:Ds,menu:Xs},gr=()=>{let{config:s}=B(),{sceneSelector:e=ls}=s,t=va[e];return wa(t,{})};import{useRef as Vs,useState as _a}from"react";import{jsx as yr,jsxs as Sa}from"react/jsx-runtime";var fi=({progress:s,duration:e,onSeek:t,disabled:r=!1})=>{let i=Vs(null),n=Vs(!1),[o,a]=_a(0),l=p=>{if(!i.current)return 0;let u=i.current.getBoundingClientRect();return Math.min(1,Math.max(0,(p.clientX-u.left)/u.width))},h=p=>{e>0&&t(l(p)*e)},c=r?void 0:{onPointerDown(p){n.current=!0,p.currentTarget.setPointerCapture(p.pointerId),h(p)},onPointerMove(p){a(l(p)),n.current&&h(p)},onPointerLeave(){a(0)},onPointerUp(p){n.current=!1,p.currentTarget.releasePointerCapture(p.pointerId)},onPointerCancel(){n.current=!1}};return yr("div",{className:"gr-player__seek-shell","aria-disabled":r||void 0,children:Sa("div",{ref:i,className:"gr-player__seek",role:"slider","aria-valuemin":0,"aria-valuemax":Math.max(e,0),"aria-valuenow":Math.round(s*Math.max(e,0)),"aria-disabled":r||void 0,tabIndex:r?-1:0,...c,children:[yr("span",{className:"gr-player__seek-fill",style:{width:`${s*100}%`}}),yr("span",{className:"gr-player__seek-hover",style:{width:`${o*100}%`}}),yr("span",{className:"gr-player__seek-thumb",style:{left:`${s*100}%`}})]})})};import{jsx as me,jsxs as Us}from"react/jsx-runtime";function Ta(s,e){return e>0?Math.min(1,Math.max(0,s/e)):0}var Ws=()=>{let{gracia:s,playlist:e,presentation:t,shell:r}=B(),{isSceneReady:i}=t,{isFullscreen:n,toggleFullscreen:o}=r,{playback:a}=s,l=Ta(a.currentTime,a.duration);return Us("div",{className:"gr-player__controls",children:[me(re,{className:"gr-player__button--play",onClick:i?()=>a.togglePlay():void 0,"aria-label":a.isPlaying?"Pause":"Play","aria-disabled":!i||void 0,children:a.isPlaying?me($i,{}):me(Qi,{})}),me(gr,{}),e.hasAudio&&me(Le,{className:"gr-player__mute",onClick:i?()=>a.toggleMute():void 0,"aria-label":a.isMuted?"Unmute":"Mute","aria-disabled":!i||void 0,children:a.isMuted?me(Ki,{}):me(Ji,{})}),me(fi,{progress:l,duration:a.duration,onSeek:h=>a.seek(h),disabled:!i}),Us("div",{className:"gr-player__time",children:[Vr(a.currentTime)," / ",Vr(a.duration)]}),me(Le,{variant:["icon","secondary"],className:"gr-player__fullscreen",onClick:o,"aria-label":n?"Exit fullscreen":"Enter fullscreen","aria-pressed":n,title:n?"Exit fullscreen":"Enter fullscreen",children:me(is,{active:n})})]})};import{useEffect as Ys,useRef as Ma,useState as Pa}from"react";import{jsx as Ct,jsxs as mi}from"react/jsx-runtime";var Zs=()=>{let{gracia:s,config:e,presentation:t}=B(),{isSceneReady:r,isBlocking:i}=t,[n,o]=Pa(!1),a=Ma(null),l=e.cameraControls&&r&&!i&&!nr(s.mode);if(Ys(()=>{l||o(!1)},[l]),Ys(()=>{if(!n)return;let p=d=>{a.current?.contains(d.target)||o(!1)},u=d=>{d.code==="Escape"&&o(!1)};return document.addEventListener("pointerdown",p),document.addEventListener("keydown",u),()=>{document.removeEventListener("pointerdown",p),document.removeEventListener("keydown",u)}},[n]),!l)return null;let{controlsType:h,setControls:c}=s.camera;return mi("div",{ref:a,className:"gr-player__camera-control",children:[Ct(Le,{className:"gr-player__button--camera",onClick:()=>o(p=>!p),"aria-label":"Camera controls","aria-expanded":n,title:"Camera controls",srLabel:"Camera controls",children:Ct(es,{})}),n&&mi("div",{className:"gr-player__camera-panel",role:"menu","aria-label":"Camera controls",children:[Ct("div",{className:"gr-player__camera-title",children:"Camera"}),ss.map(p=>mi("button",{className:Q("gr-player__camera-option",p.type===h&&"is-active"),type:"button",role:"menuitemradio","aria-checked":p.type===h,onClick:()=>c(p.type),children:[Ct("span",{className:"gr-player__camera-label",children:p.label}),Ct("span",{className:"gr-player__camera-hint",children:p.hint})]},p.type))]})]})};import{jsx as Et,jsxs as Ea}from"react/jsx-runtime";var gi=({className:s})=>{let{gracia:e,presentation:t,xr:r}=B(),{isSceneReady:i,isBlocking:n}=t,{enter:o}=r;if(n)return null;let a=e.xr.arSupported?oe.AR:e.xr.vrSupported?oe.VR:null;if(!a)return null;let l=a===oe.AR;return Et("div",{className:["gr-player__xr-actions",s].filter(Boolean).join(" "),children:Et(Ca,{active:e.mode===a,disabled:!i,icon:l?Et(rr,{}):Et(tr,{}),label:l?"View in AR":"Play in VR",mode:a,onEnter:o})})},Ca=({active:s,disabled:e,icon:t,label:r,mode:i,onEnter:n})=>Ea(re,{className:"gr-player__button--xr",onClick:e?void 0:()=>n(i),"aria-disabled":e||void 0,"aria-pressed":s||void 0,title:r,children:[Et("span",{children:r}),t]});import{jsx as ot,jsxs as yi}from"react/jsx-runtime";var qs=()=>{let{gracia:s,playlist:e,refs:t,presentation:r,shell:i}=B(),{isBlocking:n}=r,{localFilesEnabled:o,openLocalFile:a,localLabel:l}=i,{hasInteracted:h,resetView:c}=qr(t.container,e.index,s.camera);return yi("div",{className:"gr-player__top",children:[yi("div",{className:"gr-player__top-left",children:[o&&ot(Le,{className:"gr-player__button--local",onClick:a,"aria-label":l,title:l,srLabel:"Open local file",children:ot(Ce,{})}),ot(gi,{className:"gr-player__xr-actions--desktop"})]}),yi("div",{className:"gr-player__top-right",children:[ot(Zs,{}),ot(gi,{className:"gr-player__xr-actions--mobile"}),!n&&h&&ot(re,{variant:"secondary",className:"gr-player__reset",onClick:c,children:"Reset View"})]})]})};import{jsx as xi,jsxs as js}from"react/jsx-runtime";var xr=()=>{let{presentation:s}=B(),{isBlocking:e,toast:t}=s;return js("div",{className:"gr-player__overlay",children:[xi(qs,{}),!e&&js("div",{className:"gr-player__bottom",children:[t&&xi(Ur,{message:t.title}),xi(Ws,{})]})]})};import{jsx as Oe}from"react/jsx-runtime";var Qs=({onExit:s})=>Oe(re,{className:"gr-player__xr-exit",onClick:s,children:"Back to 2D"}),$s=({onExit:s})=>Oe(Ye,{icon:Oe(rr,{}),title:"Running in AR",body:"View the scene in AR mode on your device",action:Oe(Qs,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),Ks=({onExit:s})=>Oe(Ye,{icon:Oe(tr,{}),title:"Running in VR",body:"Put on your VR-headset and explore the scene",action:Oe(Qs,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),bi={ar:$s,vr:Ks};import{Fragment as La,jsx as at,jsxs as Ra}from"react/jsx-runtime";var vi=()=>{let{gracia:s,presentation:e,xr:t}=B(),{isBusy:r,isBlocking:i,playerError:n}=e,{retry:o}=e,{activeScreenMode:a,exit:l}=t,h=a?bi[a]:null;return Ra(La,{children:[r&&at(Yr,{}),i&&n&&at(Wr,{title:n.title,body:n.body,detail:n.cause.message,action:n.recoverable?at(re,{className:"gr-player__state-action",onClick:o,children:"Try again"}):void 0}),h&&at(h,{onExit:l}),!r&&s.isRebuffering&&at("div",{className:"gr-player__rebuffer-spinner",children:at("div",{className:"gr-player__spinner"})})]})};import{jsx as Lt,jsxs as Fa}from"react/jsx-runtime";var Ia=[],Rt=Aa(function(e,t){let{controls:r=!0,className:i,style:n,children:o,sources:a=Ia,...l}=e,h=Js(null),c=Js(null),{contextValue:p,gracia:u,playlist:d,openLocalFile:f,toggleFullscreen:g}=ui({...l,sources:a},{root:h,container:c}),{presentation:m,shell:w}=p,{isBusy:I}=m,{isFullscreen:P}=w;return ka(t,()=>({gracia:u,playlist:d,get cameraControlsType(){return u.camera.controlsType},play:()=>u.playback.play(),pause:()=>u.playback.pause(),seek:v=>u.playback.seek(v),open:v=>u.open(typeof v=="string"?{url:v,label:"Scene"}:v),close:()=>u.close(),next:()=>d.next(),prev:()=>d.prev(),goTo:v=>d.goTo(v),resetCamera:()=>u.camera.reset(),setCameraControls:v=>u.camera.setControls(v),setMode:v=>u.xr.setMode(v),toggleFullscreen:g,openLocalFile:f}),[u,f,d,g]),Lt(Zr,{value:p,children:Fa("section",{ref:h,className:Q("gr-player",i,{"gr-player--loading":I,"gr-player--ready":u.isContentReady,"gr-player--scenes-single":d.total<=1,"gr-player--scenes-multiple":d.total>1,"gr-player--fullscreen":P,"gr-player--error":m.isBlocking}),style:n,children:[Lt("div",{ref:c,className:"gr-player__canvas"}),Lt("input",{className:"gr-player__file-input",type:"file",...w.fileInputProps}),Lt(vi,{}),r&&Lt(xr,{}),typeof o=="function"?o({gracia:u,playlist:d}):o]})})});import{createRef as Ba}from"react";import{flushSync as za}from"react-dom";import{createRoot as Ga}from"react-dom/client";import{jsx as Na}from"react/jsx-runtime";function en(s,e){let t=Ba(),r=Ga(s),i=e,n=!0,o=()=>{za(()=>{r.render(Na(Rt,{...i,ref:t}))})};return o(),{get player(){return t.current},update(a){n&&(i=a,o())},unmount(){n&&(n=!1,t.current?.close(),r.unmount())},async openLocalFile(){await t.current?.openLocalFile()}}}import{Box3 as Oa,BufferGeometry as Xa,Float32BufferAttribute as Da,Matrix4 as Ha,Mesh as Va,MeshBasicMaterial as Ua,Sphere as Wa,Vector2 as Ya,Vector3 as tn}from"three";var br=class extends Va{#e;#i=null;#t=new Ya;#r=!1;#s=new Ha;enableMesh=!1;constructor(e){let t=new Xa;t.setAttribute("position",new Da([0,0,0],3)),super(t,new Ua({colorWrite:!1,depthWrite:!1,transparent:!0})),this.#e=e,this.frustumCulled=!1,this.castShadow=!0,this.renderOrder=1/0,this.onBeforeRender=this.#n,this.onBeforeShadow=this.#o}get player(){return this.#e}async setAudio(e){await this.#e.loadAudio(e)}setAudioListener(e){this.#i=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}dispose(){this.#e.close(),this.#e.dispose(),this.geometry.dispose(),this.material.dispose()}#o=(e,t,r,i)=>{this.enableMesh&&this.#a(e,i)};#n=(e,t,r)=>{e.getDrawingBufferSize(this.#t);let i=this.#t.x,n=this.#t.y;if(i===0||n===0)return;this.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let o=r.matrixWorld.elements;this.#i||this.#e.setAudioListenerMatrix(o),this.#e.setAudioSourceMatrix(this.matrixWorld.elements),this.#e.renderHybridViewport(i,n,{enableMesh:this.enableMesh}),e.resetState(),!this.#r&&this.#e.isReady&&this.#l()};#a(e,t){let r=e.getContext(),i=r.getParameter(r.VIEWPORT),n=i[2],o=i[3];n===0||o===0||(this.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),this.#s.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.#s.multiply(this.matrixWorld),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.depthMask(!0),this.#e.renderMesh(this.#s.elements,i[0],i[1],n,o),e.resetState())}#l(){let e=this.#e.getBBox();if(!e)return;let t=new Oa(new tn(e.minX,e.minY,e.minZ),new tn(e.maxX,e.maxY,e.maxZ));this.geometry.boundingBox=t,this.geometry.boundingSphere=new Wa,t.getBoundingSphere(this.geometry.boundingSphere),this.frustumCulled=!0,this.#r=!0}};import{ByteType as Za,DepthTexture as qa,Object3D as ja,RenderTarget as Qa,RGBAFormat as $a,UnsignedIntType as Ka,Vector2 as rn}from"three";var sn=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST,vr=class s{#e;#i;#t;#r=null;root=new ja;static attach(e,t){return e.assertDevice(t.backend?.device),new s(e,t)}constructor(e,t){this.#e=e;let r=t.backend;e.configureSurface(r.context,{usage:sn});let{x:i,y:n}=t.getDrawingBufferSize(new rn);this.#t=new qa,this.#t.type=Ka;let o=new Qa(i,n);o.depthTexture=this.#t,e.isBGRA&&(o.texture.format=$a,o.texture.type=Za,o.texture.internalFormat="bgra8unorm"),this.#i=o}get player(){return this.#e}setAudioListener(e){this.#r=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}render(e,t,r,i){let n=e.getDrawingBufferSize(new rn),o=n.x,a=n.y;if(o===0||a===0)return;let l=this.#i;(l.width!==o||l.height!==a)&&(l.setSize(o,a),this.#e.configureSurface(e.backend.context,{usage:sn})),e.setRenderTarget(l),e.render(t,r),e.setRenderTarget(null);let h=e.backend,c=h.data.get(l.texture)?.texture,p=h.data.get(this.#t)?.texture;if(!c||!p||c.width!==o||c.height!==a)return;this.root.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.root.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let u=r.matrixWorld.elements;this.#r||this.#e.setAudioListenerMatrix(u),this.#e.setAudioSourceMatrix(this.root.matrixWorld.elements),this.#e.renderTextures({color:c,depth:p,w:o,h:a}),i&&(e.autoClearColor=!1,e.autoClearDepth=!0,e.autoClearStencil=!0,e.setRenderTarget(l),e.render(i,r),e.setRenderTarget(null),e.autoClearColor=!0);let d=h.context.getCurrentTexture();d.usage&GPUTextureUsage.COPY_DST&&d.width===o&&d.height===a&&this.#e.copyTexture(c,d,[o,a,1])}setStaticModelMatrix(e){this.#e.setStaticModelMatrix(e)}dispose(){this.#i.dispose(),this.#e.close(),this.#e.dispose()}};export{Ze as BoundaryRenderer,Ke as ClassicControls,et as DebugRenderer,ft as ENV_PRESETS,Hr as GRACIA_PLAYER_DEFAULT_CSS,Ue as GraciaApp,De as GraciaPlayer,Rt as GraciaReactPlayer,Kt as GraciaSplats,Pe as Mat4,tt as ModernControls,qe as QuadLayer,ye as Quat,He as SceneBoundary,Ve as SceneManipulator,rt as SceneOverlay,br as SplatsMesh,vr as SplatsRendererW3,F as Vec3,nt as XROverlay,it as XRRayRenderer,E as axis,It as bbox,We as buildApiSources,Me as envCoefsFromPreset,_r as envCoefsFromSH27,Gr as fetchStreamingMetadata,ar as installGraciaPlayerStyles,Ft as loadGraciaModule,D as mat4,en as mountGraciaPlayer,x as num,Me as presetToLightProbe,K as quat,Jt as useGraciaPlayer,er as useGraciaPlaylist,T as vec3};
