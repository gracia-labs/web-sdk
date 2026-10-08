var Cn=.28209479177387814;function Ii(s,e=.5){let t=1/(Cn*Math.max(s[0],s[1],s[2],.01));for(let r=0;r<3;r++)s[r]*=t;for(let r=3;r<12;r++)s[r]*=t*e}function Mr(s,e=null,t=.5){let r=new Float32Array(12);for(let i=0;i<12;i++)r[i]=s[i];if(e){let i=e[0]??e.x,n=e[1]??e.y,o=e[2]??e.z;if(r[9]*i+r[3]*n+r[6]*o>0)for(let a=3;a<12;a++)r[a]*=-1}return Ii(r,t),r}function Re(s){let e=new Float32Array(12);return e.set(s.ambient,0),e.set(s.topDown,3),s.frontBack&&e.set(s.frontBack,6),s.leftRight&&e.set(s.leftRight,9),e}var ve=Object.freeze,dt=ve([0,0,0]),Ln=ve([1,1,1]),Ft=ve([1,0,0]),ft=ve([0,1,0]),Oi=ve([0,0,1]),Er=ve([0,0,-1]),Rn=.25,A=ve({X:Ft,Y:ft,Z:Oi,FORWARD:Er,FLIP_X:ve([-1,1,1]),FLIP_Z:ve([1,1,-1])}),_={clamp:(s,e,t)=>Math.min(t,Math.max(e,s)),clampInt:(s,e,t)=>_.clamp(s|0,e,t),clamp01:s=>_.clamp(s,0,1),unlerp01:(s,e,t)=>t===e?0:_.clamp01((s-e)/(t-e)),finite:(s,e=0)=>Number.isFinite(s)?s:e,wrapPi(s){return s>Math.PI?s-2*Math.PI:s<-Math.PI?s+2*Math.PI:s},wrap(s,e){return e>0?(s%e+e)%e:0},wrapDelta(s,e){return e>0?s-e*Math.round(s/e):s},signedClamp(s,e,t){return s===0?0:_.clamp(Math.abs(s),e,t)*Math.sign(s)},zoomStep(s,e=.05,t=10){return s>0?_.signedClamp(Math.log2(s),e,t):0},absLogRatio(s,e){return s>0&&e>0?Math.abs(Math.log(s/e)):0},outside(s,e){return Math.abs(s)>e},perspectiveScale(s,e,t){return 2*s*Math.tan(e*Math.PI/360)/Math.max(1,t)},deadzone(s,e){let t=Math.abs(s);return t<e?0:((t-e)/(1-e))**2*Math.sign(s)},deltaSeconds(s,e,t=0,r=Rn){return e?Math.min((s-e)/1e3,r):t}},Ot={center(s,e){return s[0]=(e.minX+e.maxX)*.5,s[1]=(e.minY+e.maxY)*.5,s[2]=(e.minZ+e.maxZ)*.5,s}},Y=class extends Float32Array{constructor(e){super(3),e&&this.from(e)}set(e,t,r){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this)}fromXYZ(e){return this.set(e.x,e.y,e.z)}from(e){return typeof e.x=="number"?this.fromXYZ(e):this.set(e[0],e[1],e[2])}copy(e){return this.set(e[0],e[1],e[2])}add(e){return this[0]+=e[0],this[1]+=e[1],this[2]+=e[2],this}addXYZ(e=0,t=0,r=0){return this[0]+=e,this[1]+=t,this[2]+=r,this}addTo(e,t=dt){return e[0]=t[0]+this[0],e[1]=t[1]+this[1],e[2]=t[2]+this[2],e}addScaled(e,t){return this[0]+=e[0]*t,this[1]+=e[1]*t,this[2]+=e[2]*t,this}addDelta(e,t){return this[0]+=e[0]-t[0],this[1]+=e[1]-t[1],this[2]+=e[2]-t[2],this}sub(e,t){return t?(this[0]=e[0]-t[0],this[1]=e[1]-t[1],this[2]=e[2]-t[2],this):(this[0]-=e[0],this[1]-=e[1],this[2]-=e[2],this)}subXYZ(e,t){return this.set(e.x-t.x,e.y-t.y,e.z-t.z)}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this}multiply(e){return this[0]*=e[0],this[1]*=e[1],this[2]*=e[2],this}multiplyXYZ(e=1,t=1,r=1){return this[0]*=e,this[1]*=t,this[2]*=r,this}divide(e){return this[0]=e[0]?this[0]/e[0]:0,this[1]=e[1]?this[1]/e[1]:0,this[2]=e[2]?this[2]/e[2]:0,this}clampScalar(e,t){return this[0]=_.clamp(this[0],e,t),this[1]=_.clamp(this[1],e,t),this[2]=_.clamp(this[2],e,t),this}normalize(e=dt){let t=Math.hypot(this[0],this[1],this[2]);return Number.isFinite(t)&&t>1e-6?this.scale(1/t):this.copy(e)}setLength(e,t=Ft){return this.normalize(t).scale(e)}cross(e,t){let r=e[0],i=e[1],n=e[2],o=t[0],a=t[1],l=t[2];return this[0]=i*l-n*a,this[1]=n*o-r*l,this[2]=r*a-i*o,this}lerp(e,t){return this[0]+=t*(e[0]-this[0]),this[1]+=t*(e[1]-this[1]),this[2]+=t*(e[2]-this[2]),this}midXYZ(e,t){return this.set((e.x+t.x)*.5,(e.y+t.y)*.5,(e.z+t.z)*.5)}fromMat4Column(e,t){let r=t*4;return this.set(e[r],e[r+1],e[r+2])}transformMat4(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i+e[12],this[1]=e[1]*t+e[5]*r+e[9]*i+e[13],this[2]=e[2]*t+e[6]*r+e[10]*i+e[14],this}transformMat4Direction(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i,this[1]=e[1]*t+e[5]*r+e[9]*i,this[2]=e[2]*t+e[6]*r+e[10]*i,this}transformQuat(e){let t=this[0],r=this[1],i=this[2],n=e[0],o=e[1],a=e[2],l=e[3],h=l*t+o*i-a*r,c=l*r+a*t-n*i,p=l*i+n*r-o*t,u=-n*t-o*r-a*i;return this[0]=h*l+u*-n+c*-a-p*-o,this[1]=c*l+u*-o+p*-n-h*-a,this[2]=p*l+u*-a+h*-o-c*-n,this}fromYawPitch(e,t){let r=Math.cos(t);return this.set(r*Math.sin(e),Math.sin(t),-r*Math.cos(e))}yawPitch(e){return this[0]=Math.atan2(e[0],-e[2]),this[1]=Math.asin(_.clamp(e[1],-1,1)),this[2]=0,this}basisFromForward(e,t,r=ft){return this.cross(t,r).normalize(Ft),e.cross(this,t),this}yawPitchBasis(e,t,r,i,n){return r.fromYawPitch(e,t),i.copy(r).scale(-1),this.set(Math.cos(e),0,Math.sin(e)),n.cross(i,this),this}rollBasis(e,t){let r=Math.cos(t),i=Math.sin(t),n=this[0],o=this[1],a=this[2],l=e[0],h=e[1],c=e[2];return this.set(n*r+l*i,o*r+h*i,a*r+c*i),e.set(l*r-n*i,h*r-o*i,c*r-a*i),this}fromSphereDir(e,t){let r=Math.sin(t);return this.set(r*Math.sin(e),Math.cos(t),r*Math.cos(e))}polarY(e,t,r=1e-6){let i=e[0]-t[0],n=e[1]-t[1],o=e[2]-t[2],a=Math.max(r,Math.hypot(i,n,o));return this[0]=Math.atan2(i,o),this[1]=Math.acos(_.clamp(n/a,-1,1)),this[2]=a,this}equals(e,t=1e-6){return Math.abs(this[0]-e[0])<=t&&Math.abs(this[1]-e[1])<=t&&Math.abs(this[2]-e[2])<=t}toArray(){return[this[0],this[1],this[2]]}toXYZ(){return{x:this[0],y:this[1],z:this[2]}}distanceXYZ(e){return Math.hypot(this[0]-e.x,this[1]-e.y,this[2]-e.z)}dot(e){return this[0]*e[0]+this[1]*e[1]+this[2]*e[2]}get sqrLen(){return this[0]*this[0]+this[1]*this[1]+this[2]*this[2]}get len(){return Math.hypot(this[0],this[1],this[2])}get xzLen(){return Math.hypot(this[0],this[2])}get minComponent(){return Math.min(this[0],this[1],this[2])}get maxAbs(){return Math.max(Math.abs(this[0]),Math.abs(this[1]),Math.abs(this[2]))}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}},ge=class extends Float32Array{constructor(e){super(4),e?this.from(e):this.identity()}set(e,t,r,i){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this[3]=i,this)}fromXYZW(e){return this.set(e.x,e.y,e.z,e.w)}from(e){return typeof e.x=="number"?this.fromXYZW(e):this.set(e[0],e[1],e[2],e[3])}copy(e){return this.set(e[0],e[1],e[2],e[3])}identity(){return this.set(0,0,0,1)}normalize(){let e=Math.hypot(this[0],this[1],this[2],this[3]);return e>1e-6?this.scale(1/e):this.identity()}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this[3]*=e,this}setAxisAngle(e,t){let r=t*.5,i=Math.sin(r);return this.set(e[0]*i,e[1]*i,e[2]*i,Math.cos(r))}rotatePre(e,t){return this.mul(Bt.setAxisAngle(e,t),this)}rotate(e,t){return this.mul(Bt.setAxisAngle(e,t))}mul(e,t){let r=t?e:this,i=t??e,n=r[0],o=r[1],a=r[2],l=r[3],h=i[0],c=i[1],p=i[2],u=i[3];return this[0]=n*u+l*h+o*p-a*c,this[1]=o*u+l*c+a*h-n*p,this[2]=a*u+l*p+n*c-o*h,this[3]=l*u-n*h-o*c-a*p,this}invert(e=this){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return this.set(-e[0]*r,-e[1]*r,-e[2]*r,e[3]*r)}slerp(e,t){let r=e[0],i=e[1],n=e[2],o=e[3],a=this[0]*r+this[1]*i+this[2]*n+this[3]*o;a<0&&(a=-a,r=-r,i=-i,n=-n,o=-o);let l=1-t,h=t;if(1-a>1e-6){let c=Math.acos(a),p=Math.sin(c);l=Math.sin((1-t)*c)/p,h=Math.sin(t*c)/p}return this.set(l*this[0]+h*r,l*this[1]+h*i,l*this[2]+h*n,l*this[3]+h*o)}toXYZW(){return{x:this[0],y:this[1],z:this[2],w:this[3]}}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}get w(){return this[3]}set w(e){this[3]=e}},we=class extends Float32Array{constructor(e){super(16),e?this.copy(e):this.identity()}copy(e){return super.set(e),this}identity(){return this.fill(0),this[0]=this[5]=this[10]=this[15]=1,this}multiply(e,t){return t?Pr(this,e,t):Pr(this,this,e)}preMultiply(e){return Pr(this,e,this)}fromTranslation(e){return this.identity(),this[12]=e[0],this[13]=e[1],this[14]=e[2],this}fromScaling(e){return this.identity(),this[0]=e[0],this[5]=e[1],this[10]=e[2],this}perspective(e,t,r,i){let n=1/Math.tan(e*Math.PI/360);return this.fill(0),this[0]=n/t,this[5]=n,this[10]=(i+r)/(r-i),this[11]=-1,this[14]=2*i*r/(r-i),this}cameraWorld(e,t,r=ft){let i=he.sub(e,t).normalize(Oi),n=Fi.cross(r,i).normalize(Ft),o=kn.cross(i,n);return this.cameraWorldAxes(e,n,o,i)}cameraWorldAxes(e,t,r,i){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=0,this[4]=r[0],this[5]=r[1],this[6]=r[2],this[7]=0,this[8]=i[0],this[9]=i[1],this[10]=i[2],this[11]=0,this[12]=e[0],this[13]=e[1],this[14]=e[2],this[15]=1,this}fromQuat(e){return this.fromRotationTranslationScale(e,dt,Ln)}fromTransform(e){let{rotation:t,translation:r,scale:i}=e;return Bt.fromXYZW(t).normalize(),this.fromRotationTranslationScale(Bt,he.fromXYZ(r),Fi.set(i.x,i.y,i.z))}fromRotationTranslationScale(e,t,r){let i=e[0],n=e[1],o=e[2],a=e[3],l=i+i,h=n+n,c=o+o,p=i*l,u=i*h,d=i*c,f=n*h,m=n*c,g=o*c,M=a*l,S=a*h,b=a*c,y=r[0],v=r[1],w=r[2];return this[0]=(1-(f+g))*y,this[1]=(u+b)*y,this[2]=(d-S)*y,this[3]=0,this[4]=(u-b)*v,this[5]=(1-(p+g))*v,this[6]=(m+M)*v,this[7]=0,this[8]=(d+S)*w,this[9]=(m-M)*w,this[10]=(1-(p+f))*w,this[11]=0,this[12]=t[0],this[13]=t[1],this[14]=t[2],this[15]=1,this}setPosition(e){return this[12]=e[0],this[13]=e[1],this[14]=e[2],this}translate(e){let t=e[0],r=e[1],i=e[2];return this[12]=this[0]*t+this[4]*r+this[8]*i+this[12],this[13]=this[1]*t+this[5]*r+this[9]*i+this[13],this[14]=this[2]*t+this[6]*r+this[10]*i+this[14],this[15]=this[3]*t+this[7]*r+this[11]*i+this[15],this}scale(e){let t=e[0],r=e[1],i=e[2];for(let n=0;n<4;n++)this[n]*=t,this[n+4]*=r,this[n+8]*=i;return this}fromPivot(e,t,r,i,n){return this.fromTranslation(e).scale(r).translate(i),this.multiply(In.fromQuat(t)),this.translate(he.copy(i).scale(-1)),n?this.multiply(n):this}pointTo(e,t=dt,r=1){return zi(e,this,t,r)}poseTo(e){return Gi(e,this)}get determinant3(){return this[0]*(this[5]*this[10]-this[6]*this[9])+this[1]*(this[6]*this[8]-this[4]*this[10])+this[2]*(this[4]*this[9]-this[5]*this[8])}decompose(e,t,r){let i=Math.hypot(this[0],this[1],this[2]),n=Math.hypot(this[4],this[5],this[6]),o=Math.hypot(this[8],this[9],this[10]);this.determinant3<0&&(i=-i),e.set(this[12],this[13],this[14]),r.set(i,n,o);let a=i?1/i:0,l=n?1/n:0,h=o?1/o:0;return me[0]=this[0]*a,me[1]=this[1]*a,me[2]=this[2]*a,me[3]=this[4]*l,me[4]=this[5]*l,me[5]=this[6]*l,me[6]=this[8]*h,me[7]=this[9]*h,me[8]=this[10]*h,An(t,me),this}};function An(s,e){let t=e[0]+e[4]+e[8];if(t>0){let a=Math.sqrt(t+1),l=.5*a;return a=.5/a,s.set((e[5]-e[7])*a,(e[6]-e[2])*a,(e[1]-e[3])*a,l)}let r=0;e[4]>e[0]&&(r=1),e[8]>e[r*3+r]&&(r=2);let i=(r+1)%3,n=(r+2)%3,o=Math.sqrt(e[r*3+r]-e[i*3+i]-e[n*3+n]+1);return s[r]=.5*o,o=.5/o,s[3]=(e[i*3+n]-e[n*3+i])*o,s[i]=(e[i*3+r]+e[r*3+i])*o,s[n]=(e[n*3+r]+e[r*3+n])*o,s}var he=new Y,Fi=new Y,kn=new Y,Bt=new ge,In=new we,me=new Float32Array(9);function Pr(s,e,t){let r=e[0],i=e[1],n=e[2],o=e[3],a=e[4],l=e[5],h=e[6],c=e[7],p=e[8],u=e[9],d=e[10],f=e[11],m=e[12],g=e[13],M=e[14],S=e[15],b=t[0],y=t[1],v=t[2],w=t[3];return s[0]=b*r+y*a+v*p+w*m,s[1]=b*i+y*l+v*u+w*g,s[2]=b*n+y*h+v*d+w*M,s[3]=b*o+y*c+v*f+w*S,b=t[4],y=t[5],v=t[6],w=t[7],s[4]=b*r+y*a+v*p+w*m,s[5]=b*i+y*l+v*u+w*g,s[6]=b*n+y*h+v*d+w*M,s[7]=b*o+y*c+v*f+w*S,b=t[8],y=t[9],v=t[10],w=t[11],s[8]=b*r+y*a+v*p+w*m,s[9]=b*i+y*l+v*u+w*g,s[10]=b*n+y*h+v*d+w*M,s[11]=b*o+y*c+v*f+w*S,b=t[12],y=t[13],v=t[14],w=t[15],s[12]=b*r+y*a+v*p+w*m,s[13]=b*i+y*l+v*u+w*g,s[14]=b*n+y*h+v*d+w*M,s[15]=b*o+y*c+v*f+w*S,s}function zi(s,e,t=dt,r=1){let i=t[0]??0,n=t[1]??0,o=t[2]??0;return s[0]=e[0]*i+e[4]*n+e[8]*o+e[12],s[1]=e[1]*i+e[5]*n+e[9]*o+e[13],s[2]=e[2]*i+e[6]*n+e[10]*o+e[14],r!==1&&(s[0]*=r,s[1]*=r,s[2]*=r),s}function Bi(s,e,t,r){let i=t[0],n=t[1],o=t[2];s[0]=e[0]*i+e[4]*n+e[8]*o,s[1]=e[1]*i+e[5]*n+e[9]*o,s[2]=e[2]*i+e[6]*n+e[10]*o;let a=Math.hypot(s[0],s[1],s[2]);if(Number.isFinite(a)&&a>1e-6){let l=1/a;s[0]*=l,s[1]*=l,s[2]*=l}else s[0]=r[0],s[1]=r[1],s[2]=r[2];return s}function Gi(s,e){return s[0]=e[12],s[1]=e[13],s[2]=e[14],Bi(he,e,Er,Er),s[3]=he[0],s[4]=he[1],s[5]=he[2],Bi(he,e,ft,ft),s[6]=he[0],s[7]=he[1],s[8]=he[2],s}var P={create:()=>new Y},$={create:()=>new ge},D={create:()=>new we,clone:s=>new we(s),pointTo:zi,poseTo:Gi};async function zt(s="@gracia/web-sdk/wasm"){for(let e=0;;e++)try{let t=await import(s);return t.default??t}catch{await new Promise(r=>setTimeout(r,1e3))}}var Gt=class{#e;#r=0;constructor(e,t=512){this.#e=e,this.#r=e._malloc(t)}ptr(e=0){return this.#r+e}get f32(){return this.#e.HEAPF32}writeF32(e,t=0){this.#e.HEAPF32.set(e,this.#r+t>>2)}readF32(e,t=0){let r=this.#r+t;return new Float32Array(this.#e.HEAPF32.buffer,r,e)}free(){this.#r&&(this.#e._free(this.#r),this.#r=0)}};function Cr(s,e,...t){if(!e)return;let r=new TextEncoder,i=[],n=t.map(a=>{if(typeof a!="string")return a;let l=r.encode(a),h=s._malloc(l.length+1);return s.HEAPU8.set(l,h),s.HEAPU8[h+l.length]=0,i.push(h),h}),o=e(...n);for(let a of i)s._free(a);return o}var E=(s,e)=>s[`_Gracia_${e}`];async function Fn(){let s=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!s)throw new Error("WebGPU adapter not available");return await s.requestDevice({requiredLimits:{maxStorageBuffersPerShaderStage:10,maxComputeWorkgroupSizeX:256,maxBufferSize:s.limits.maxBufferSize,maxStorageBufferBindingSize:s.limits.maxStorageBufferBindingSize}})}var Nt=class s{#e;#r;#t=null;#i=0;constructor(e){this.#e=e,this.#r=new Gt(e)}static async boot(e,t,{maxSplatsCount:r=0}={}){let i=typeof e=="function"?await e({canvas:t}):e,n=await Fn();if(typeof e=="function"&&(i.preinitializedWebGPUDevice=n,i.WebGPU?.importJsDevice?.(n)),E(i,"Init")?.(r|0),!E(i,"Initialized")?.())throw new Error("Gracia init failed");return{module:new s(i),device:n}}get heap(){return this.#r}get backend(){return this.#t}get buildUnixTime(){return E(this.#e,"GetBuildTime")?.()??0}shutdownApp(){E(this.#e,"Shutdown")?.()}setCamera(e,t,r,i){let n=!!(r&&i),o=this.#r.ptr(),a=o>>2,l=this.#r.f32;l.set(e,a),n&&l.set(r,a+16),l.set(t,a+32),n&&l.set(i,a+48),E(this.#e,"SetCamera")?.(n,o)}getModelMatrix(){let e=E(this.#e,"GetModelMatrix");if(!e)return null;let t=this.#r.ptr(256);return e(t),this.#r.readF32(16,256)}setModelMatrix(e){let t=E(this.#e,"SetModelMatrix");t&&(this.#r.writeF32(e,256),t(this.#r.ptr(256)))}initPure(e){this.shutdownBackend(),this.#t="pure",E(this.#e,"P_Init")?.(e?1:0)}pureRenderTo(e,t,r,i){let n=this.#e.WebGPU,o=n?.importJsTexture?.(e)??0,a=t?n?.importJsTexture?.(t)??0:0;return E(this.#e,"P_RenderTo")?.(o,a,r,i)!==0}initHybrid(e){this.shutdownBackend(),this.registerGL(e),this.#t="hybrid",E(this.#e,"H_Init")?.()}hybridFrame(e,t,r){E(this.#e,"H_Frame")?.(e,t,r)}hybridPreprocess(e,t){return E(this.#e,"H_Preprocess")?.(e,t)??0}hybridRender(e,t,r,i,n,o){E(this.#e,"H_Render")?.(e,t,r,i,n,o)}hybridRenderMesh(e,t,r,i,n){this.#r.writeF32(e),E(this.#e,"H_RenderMeshMVP")?.(this.#r.ptr(),t,r,i,n)}hybridRenderMotionMV(e,t,r,i){E(this.#e,"H_RenderMotionMV")?.(e,t,r,i)}hybridCanMotion(){return!!E(this.#e,"H_CanMotion")?.()}hybridHasMultiview(){return!!E(this.#e,"H_HasMultiview")?.()}hybridReset(){E(this.#e,"H_Reset")?.()}registerGL(e){this.#i&&this.#e.GL?.deleteContext(this.#i);let t=this.#e.GL;if(!t)throw new Error("WASM GL layer not available");this.#i=t.registerContext(e,{majorVersion:2,minorVersion:0,enableExtensionsByDefault:!0}),t.makeContextCurrent(this.#i)}shutdownBackend(){this.#t==="pure"?E(this.#e,"P_Shutdown")?.():this.#t==="hybrid"&&E(this.#e,"H_Shutdown")?.(),this.#i&&(this.#e.GL?.deleteContext(this.#i),this.#i=0),this.#t=null}dispose(){this.shutdownBackend(),this.#r.free(),this.shutdownApp()}addDynamicScene(){return E(this.#e,"AddScene")?.()??0}addStaticScene(){return E(this.#e,"AddStaticScene")?.()??0}removeScene(e){E(this.#e,"RemoveScene")?.(e)}sceneReady(e){return e?(E(this.#e,"SceneReady")?.(e)??0)!==0:!1}sceneProgress(e){return e?E(this.#e,"SceneProgress")?.(e)??0:0}sceneDuration(e){return e?E(this.#e,"SceneDuration")?.(e)??0:0}sceneIsBuffering(e){return e?(E(this.#e,"SceneIsBuffering")?.(e)??0)!==0:!1}sceneLastFetchStatus(e){return e?E(this.#e,"SceneGetLastFetchStatus")?.(e)??0:0}sceneSetTime(e,t){E(this.#e,"SceneSetTime")?.(e,t)}sceneSetPlaybackRange(e,t,r){E(this.#e,"SceneSetPlaybackRange")?.(e,t,r)}sceneSetVisible(e,t){E(this.#e,"SceneSetVisible")?.(e,t)}sceneGetBBox(e){let t=E(this.#e,"SceneGetBBox");if(!t||!e)return null;let r=this.#r.ptr(256);t(e,r);let i=r>>2,n=this.#r.f32;return n[i]===0&&n[i+1]===0&&n[i+2]===0&&n[i+3]===0&&n[i+4]===0&&n[i+5]===0?null:{minX:n[i],minY:n[i+1],minZ:n[i+2],maxX:n[i+3],maxY:n[i+4],maxZ:n[i+5]}}sceneSetEnvLighting(e,t,r){let i=E(this.#e,"SceneSetEnvPreset");if(!i||!e)return;let n=this.#r.ptr(128),o=n>>2,a=this.#r.f32;for(let l=0;l<4;l++)a[o+l*4]=t[l*3],a[o+l*4+1]=t[l*3+1],a[o+l*4+2]=t[l*3+2],a[o+l*4+3]=0;a[o+3]=r,i(e,n)}sceneClearEnvLighting(e){E(this.#e,"SceneClearEnvPreset")?.(e)}sceneSetModelMatrix(e,t){let r=E(this.#e,"SceneSetModelMatrix");!r||!e||(this.#r.writeF32(t,256),r(e,this.#r.ptr(256)))}sceneOpen(e,t){Cr(this.#e,E(this.#e,"SceneOpen"),e,t)}sceneOpenApi(e,t,r){Cr(this.#e,E(this.#e,"SceneOpenApi"),e,t,r)}registerLocalFile(e){let t=this.#e.graciaRegisterLocalFile;if(!t)throw new Error("WASM local-file bridge unavailable");return t(e)}sceneOpenLocal(e,t){E(this.#e,"SceneOpenLocal")?.(e,t)}sceneOpenStatic(e,t){let r=E(this.#e,"SceneOpenStatic");if(!r)return-1;let i=this.#e._malloc(t.length);this.#e.HEAPU8.set(t,i);try{return r(e,i,t.length)}finally{this.#e._free(i)}}};var Bn={panningModel:"HRTF",distanceModel:"inverse",refDistance:1,maxDistance:100,rolloffFactor:1},On=[0,0,0],zn=[0,0,0,0,0,-1,0,1,0],Gn=.1,Nn=40,Ni=.01,Di=.08,Dn=1.5,Xi=.05,Xn=2e3;function Hi(){typeof navigator<"u"&&navigator.audioSession&&(navigator.audioSession.type="playback")}function Vi(){return typeof performance<"u"?performance.now():Date.now()}function re(s,e,t,r=0){r>0?s.linearRampToValueAtTime(e,t.currentTime+r):s.setValueAtTime(e,t.currentTime)}function Hn(s,e,t){s.setTargetAtTime(e,t.currentTime,.01)}function Dt(s){try{s.disconnect()}catch{}}function ie(s,e){return Math.abs(s-e)<1e-4}function te(s){try{s.automationRate="k-rate"}catch{}}function Lr(s){s.positionX&&(te(s.positionX),te(s.positionY),te(s.positionZ),"orientationX"in s?(te(s.orientationX),te(s.orientationY),te(s.orientationZ)):(te(s.forwardX),te(s.forwardY),te(s.forwardZ),te(s.upX),te(s.upY),te(s.upZ)))}function Ui(s,e,t,r,i,n=0){re(s.positionX,e,i,n),re(s.positionY,t,i,n),re(s.positionZ,r,i,n)}function Vn(s,e,t,r,i,n,o,a,l=0){if("orientationX"in s){re(s.orientationX,e,a,l),re(s.orientationY,t,a,l),re(s.orientationZ,r,a,l);return}re(s.forwardX,e,a,l),re(s.forwardY,t,a,l),re(s.forwardZ,r,a,l),re(s.upX,i,a,l),re(s.upY,n,a,l),re(s.upZ,o,a,l)}var Rr=class{#e=null;#r=null;#t=[0,0,0];#i=[0,0,-1,0,1,0];#s=!1;#o=new Float32Array(9);#n=!1;constructor(){Hi(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&this.#e&&this.#e.state!=="running"&&this.resume()})}get ctx(){return this.#e}get destination(){return this.#r??this.#e?.destination??null}setOutput(e){e?.context&&e.context!==this.#e&&(this.#e=e.context,Lr(this.#e.listener),this.#n=!1),this.#r=e?.destination??null,this.#s=e?.externalListener===!0,this.#a()}prepare(){let e=this.#l();if(!e)throw new Error("Web Audio is not supported in this browser");return{ctx:e,destination:this.destination??e.destination}}resume(){Hi();let e=this.#l();return e?e.state==="running"?Promise.resolve():e.resume().catch(()=>{}):Promise.resolve()}listener(e,t,r,i,n,o,a,l,h,c=0){this.#t=[e,t,r],this.#i=[i,n,o,a,l,h],this.#a(c)}resetListener(){this.listener(...zn)}#l(){if(this.#e)return this.#e;if(typeof AudioContext>"u")return null;try{this.#e=new AudioContext}catch{return null}return Lr(this.#e.listener),this.#n=!1,this.#a(),this.#e}#a(e=0){let t=this.#e?.listener;if(!t||this.#s)return;let[r,i,n]=this.#t,[o,a,l,h,c,p]=this.#i,u=this.#o;this.#n&&ie(r,u[0])&&ie(i,u[1])&&ie(n,u[2])&&ie(o,u[3])&&ie(a,u[4])&&ie(l,u[5])&&ie(h,u[6])&&ie(c,u[7])&&ie(p,u[8])||(u.set([r,i,n,o,a,l,h,c,p]),this.#n=!0,Ui(t,r,i,n,this.#e,e),Vn(t,o,a,l,h,c,p,this.#e,e))}},ye=new Rr,Ar=class{#e;#r;#t;#i;#s;#o;ready;#n=null;#l=[];#a=null;#h=!1;#c=!1;#p=!1;#m=!1;#u=!1;#f=0;#d=0;#g=0;#b=NaN;#y=NaN;#x=NaN;constructor(e,t={}){let{ctx:r,destination:i}=ye.prepare();this.#e=r,this.#o=t.destination??i;let n=new Audio;this.#r=n,n.crossOrigin="anonymous",n.preload="auto",n.loop=!0,n.preservesPitch=!1,this.#i=r.createGain(),this.#s=r.createPanner(),Lr(this.#s),this.pannerAttr({...Bn,...t.pannerAttr}),this.#t=r.createMediaElementSource(n),this.#t.connect(this.#s),this.#s.connect(this.#i),this.#i.connect(this.#o),this.volume(t.volume??1).rate(t.rate??1).pos(...t.pos??On),this.ready=new Promise(o=>{this.#n=o}),this.#T("loadedmetadata",()=>this.#C()),this.#T("canplay",()=>this.#S()),this.#T("loadeddata",()=>this.#S()),this.#T("error",()=>this.#E(`Media error ${n.error?.code??"unknown"}`)),n.src=e,n.load(),this.#S()}get context(){return this.#e}get blocked(){return this.#p}get failed(){return this.#h}get buffering(){return this.#w||this.#v&&this.#g>0}get clockRate(){return!this.#v||Math.abs(this.#d)<Ni?1:1+_.clamp(Dn*this.#d,-Xi,Xi)}get#v(){return!this.#h&&!this.#p&&!this.#c}get#w(){return this.#v&&(!this.#m||this.#u||this.#r.paused||this.#r.readyState<3||this.#r.seeking||this.#a!==null)}#T(e,t){this.#l.push([e,t]),this.#r.addEventListener(e,t)}#S(){this.#r.readyState<3||this.#c||this.#_()}#_(){this.#n?.(),this.#n=null}#E(e){this.#c||this.#h||(this.#h=!0,this.pause(),this.#_())}allowPlayback(){this.#p=!1}play(){if(this.#h||this.#p||this.#c||this.#u||this.#m&&!this.#r.paused)return;let e=++this.#f;this.#u=!0;try{Promise.resolve(this.#r.play()).then(()=>{e!==this.#f||this.#c||(this.#u=!1,this.#m=!0)}).catch(t=>this.#M(e,t))}catch(t){this.#M(e,t)}}#M(e,t){e!==this.#f||this.#c||(this.#u=!1,this.#m=!1,t?.name==="NotAllowedError"?(this.#p=!0,this.#r.pause()):t?.name!=="AbortError"&&this.#E(t))}pause(){this.#f++,this.#u=!1,this.#m=!1,this.#P(),this.#r.paused||this.#r.pause()}unload(){this.pause(),this.#c=!0;for(let[e,t]of this.#l)this.#r.removeEventListener(e,t);this.#l=[],this.#r.removeAttribute("src"),this.#r.load(),this.#_(),Dt(this.#t),Dt(this.#s),Dt(this.#i)}seek(e){return typeof e=="number"&&(this.#P(),this.#a=Number.isFinite(e)?Math.max(0,e):0,this.#C()),this.#a??this.#r.currentTime}#C(){if(this.#a===null||this.#r.readyState<1)return;let e=this.#r.duration,t=Number.isFinite(e)&&e>0?_.wrap(this.#a,e):this.#a;Math.abs(this.#r.currentTime-t)>.005&&(this.#r.currentTime=t),this.#a=null}sync(e){this.#h||this.#p||this.#c||(!this.#m||this.#r.paused)&&!this.#u&&(this.seek(e),this.play())}follow(e){if(this.#w||!this.#v||this.#e.state!=="running"){this.#P();return}let t=this.#r.currentTime-e,r=this.#r.duration;Number.isFinite(r)&&r>0&&(t=_.wrapDelta(t,r));let i=Vi();if(t<-Di?this.#g||=i:t>-Ni&&(this.#g=0),t>Di||this.#g&&i-this.#g>Xn){this.seek(e);return}this.#d=t}#P(){this.#d=0,this.#g=0}volume(e){return Hn(this.#i.gain,_.clamp01(e),this.#e),this}rate(e){return this.#r.playbackRate=_.clamp(_.finite(e,1),.1,4),this}pos(e,t,r,i=0){return ie(e,this.#b)&&ie(t,this.#y)&&ie(r,this.#x)?this:(this.#b=e,this.#y=t,this.#x=r,Ui(this.#s,e,t,r,this.#e,i),this)}destination(e){let t=e??this.#e.destination;return t===this.#o?this:(Dt(this.#i),this.#o=t,this.#i.connect(this.#o),this)}pannerAttr(e){return e?(e.panningModel&&(this.#s.panningModel=e.panningModel),e.distanceModel&&(this.#s.distanceModel=e.distanceModel),typeof e.refDistance=="number"&&(this.#s.refDistance=e.refDistance),typeof e.maxDistance=="number"&&(this.#s.maxDistance=e.maxDistance),typeof e.rolloffFactor=="number"&&(this.#s.rolloffFactor=e.rolloffFactor),this):this}},Xt=class{#e=null;#r=null;#t=[0,0,0];#i=P.create();#s=new Float32Array(9);#o={volume:1,rate:1,pannerAttr:{}};#n=!1;#l=0;#a=0;#h=0;#c=!1;get context(){return ye.ctx}get isLoaded(){return!this.#c||!this.#n||ye.ctx?.state!=="running"||this.#e?.blocked===!0}get isBuffering(){return this.#n&&(this.#e?.buffering??!1)}setOutput(e){if(ye.setOutput(e),!!this.#e){if(this.#e.context!==ye.ctx){let t=this.#r,r=this.#e.seek();this.unload(),t&&(this.load(t),this.#e?.seek(r));return}this.#e.destination(ye.destination)}}async load(e){if(e===this.#r&&this.#e&&!this.#e.failed){await this.#e.ready;return}this.unload(),this.#r=e,this.#c=!0;let t=++this.#l;try{this.#e=new Ar(e,{...this.#o,pos:this.#t}),await this.#e.ready}catch{t===this.#l&&(this.#e?.unload(),this.#e=null,this.#r=null)}finally{t===this.#l&&(this.#c=!1)}}sync(e,t,r){let i=this.#e;return!this.#n||!r?(i?.pause(),!0):(i?.sync(e),i?.follow(e),!this.isBuffering)}get clockRate(){return this.#n?this.#e?.clockRate??1:1}seek(e){this.#e?.seek(e)}volume(e){this.#o.volume=_.clamp01(e),this.#e?.volume(this.#o.volume)}rate(e){this.#o.rate=e,this.#e?.rate(e)}setSpatial(e,t,r){this.#t=[e,t,r];let i=this.#p("spatial");i>=0&&this.#e?.pos(e,t,r,i)}setSourceMatrix(e,t,r=1){let i=e.pointTo?.(this.#i,t,r)??D.pointTo(this.#i,e,t,r);this.setSpatial(i.x,i.y,i.z)}setListenerMatrix(e){let t=this.#p("listener");if(t<0)return;let r=e.poseTo?.(this.#s)??D.poseTo(this.#s,e);ye.listener(...r,t)}setPanner(e){Object.assign(this.#o.pannerAttr,e),this.#e?.pannerAttr(e)}stop(){this.#e?.pause()}get enabled(){return this.#n&&ye.ctx?.state==="running"&&!this.#e?.blocked}enable(){this.#n=!0,ye.resume(),this.#e?.allowPlayback()}disable(){this.#n=!1,this.#e?.pause()}unload(){this.#l++,this.#e?.unload(),this.#e=null,this.#r=null,this.#c=!1,ye.resetListener()}#p(e){let t=Vi(),r=e==="listener"?this.#a:this.#h;return r&&t-r<Nn?-1:(e==="listener"?this.#a=t:this.#h=t,_.deltaSeconds(t,r,0,Gn))}};var mt=class{#e;#r=0;#t=!1;constructor(e){this.#e=e}get id(){return this.#r}get isStatic(){return this.#t}get isReady(){return this.#e.sceneReady(this.#r)}get progress(){return this.#e.sceneProgress(this.#r)}get duration(){return this.#t?0:this.#e.sceneDuration(this.#r)}get isBuffering(){return this.#t?!1:this.#e.sceneIsBuffering(this.#r)}get lastFetchStatus(){return this.#e.sceneLastFetchStatus(this.#r)}setTime(e){this.#r&&!this.#t&&this.#e.sceneSetTime(this.#r,e)}setPlaybackRange(e,t){this.#r&&!this.#t&&this.#e.sceneSetPlaybackRange(this.#r,e,t)}setVisible(e){this.#r&&this.#e.sceneSetVisible(this.#r,e)}getBBox(){return this.#e.sceneGetBBox(this.#r)}setEnvLighting(e,t){this.#r&&this.#e.sceneSetEnvLighting(this.#r,e,t)}clearEnvLighting(){this.#r&&this.#e.sceneClearEnvLighting(this.#r)}setModelMatrix(e){this.#r&&this.#e.sceneSetModelMatrix(this.#r,e)}openDynamic(e){if(this.remove(),this.#r=this.#e.addDynamicScene(),this.#t=!1,e.localFile||e.file){let r=e.localFile||e.file;this.#e.sceneOpenLocal(this.#r,this.#e.registerLocalFile(r));return}let t=e.url;if(e.token){this.#e.sceneOpenApi(this.#r,t,e.token);return}this.#e.sceneOpen(this.#r,t)}async openStatic(e){this.remove();let t=this.#e.addStaticScene();this.#r=t,this.#t=!0;let r=e.file?await e.file.arrayBuffer():await(await fetch(e.url)).arrayBuffer();this.#r===t&&this.#e.sceneOpenStatic(t,new Uint8Array(r))}remove(){this.#r&&(this.#e.removeScene(this.#r),this.#r=0)}};var Wi={alpha:!0,premultipliedAlpha:!0,depth:!0,stencil:!1,antialias:!1,powerPreference:"high-performance",xrCompatible:!0},Ht=Object.freeze({start:0,end:1/0}),Ue=class s{#e;#r;#t=new Xt;#i=0;#s=null;#o=null;#n=null;#l=!1;#a=0;#h=0;#c=1;#p=Ht;#m=!1;#u=null;#f=null;static GL_CANVAS_OPTS=Wi;constructor(e,t){this.#e=e,this.#r=t,typeof document<"u"&&document.addEventListener("visibilitychange",this.#d)}#d=()=>{document.hidden&&this.#t.stop()};static async create(e,{canvas:t,gl:r,backend:i,maxSplatsCount:n}={}){if(!t&&!r)throw new Error("canvas or gl required");let o=i??(r?"hybrid":"pure"),{module:a,device:l}=await Nt.boot(e,t||r.canvas,{maxSplatsCount:n}),h=new s(a,l);return o==="hybrid"?h.#y(r??s.#g(t)):h.#b(t),h}static preferredFormat(){return navigator.gpu.getPreferredCanvasFormat()}static#g(e){let t=e.getContext("webgl2",Wi);if(!t)throw new Error("WebGL2 not available");return t}get device(){return this.#r}get backend(){return this.#e.backend}get buildUnixTime(){return this.#e.buildUnixTime}get gl(){return this.#f}get isBGRA(){return s.preferredFormat()==="bgra8unorm"}assertDevice(e){if(e&&e!==this.#r)throw new Error("WebGPU device must match GraciaPlayer.device")}configureSurface(e,t={}){let{format:r,alphaMode:i="premultiplied",usage:n}=t;e.configure({device:this.#r,format:r??s.preferredFormat(),alphaMode:i,...n!=null?{usage:n}:{}})}bindCanvas(e,t={}){let r=e.getContext("webgpu");if(!r)throw new Error("WebGPU canvas context not available");return this.configureSurface(r,t),this.#u=r,r}setBackend(e,{canvas:t,gl:r}={}){if(this.shutdown(),e==="hybrid"){if(!r&&!t)throw new Error("canvas or gl required for hybrid backend");this.#y(r??s.#g(t))}else this.#b(t)}present(e,t){e===0||t===0||(this.#e.backend==="hybrid"?this.#v(e,t):this.#x())}renderTextures({color:e,depth:t,w:r,h:i}){return this.#E(),this.#e.backend!=="pure"?!1:this.#e.pureRenderTo(e,t,r,i)}copyTexture(e,t,r=null){let i=r??[e.width,e.height,1],n=this.#r.createCommandEncoder();n.copyTextureToTexture({texture:e},{texture:t},i),this.#r.queue.submit([n.finish()])}renderHybridViewport(e,t,{gl:r,drawMode:i,enableMesh:n=!1,x:o=0,y:a=0,eye:l=0}={}){let h=r??this.#f;if(!h)throw new Error("No WebGL context");let c=i??this.#i;this.preprocess(e,t),h.enable(h.DEPTH_TEST),h.depthFunc(h.LEQUAL),h.depthMask(!1),this.render(c,o,a,e,t,l),n&&(h.colorMask(!1,!1,!1,!1),h.depthMask(!0),this.render(1,o,a,e,t,l),h.colorMask(!0,!0,!0,!0)),h.depthMask(!0)}shutdown(){this.#e.shutdownBackend(),this.#f=null,this.#u=null}#b(e){this.#f=null,this.#u=null,this.#r.pushErrorScope("validation"),this.#e.initPure(this.isBGRA),this.#r.popErrorScope().then(t=>{}),e&&this.bindCanvas(e)}#y(e){this.#u=null,this.#f=e,this.#e.initHybrid(e)}#x(){if(!this.#u)throw new Error("bindCanvas() required");let{width:e,height:t}=this.#u.canvas;e===0||t===0||this.renderTextures({color:this.#u.getCurrentTexture(),w:e,h:t})}#v(e,t){let r=this.#f;if(!r)throw new Error("hybrid backend required");r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clearDepth(1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.disable(r.DEPTH_TEST),this.frame(e,t,this.#i)}get drawMode(){return this.#i}set drawMode(e){this.#i=_.clampInt(e,0,3)}get#w(){return this.#s??this.#o}get isReady(){return(this.#w?.isReady??!1)&&this.#t.isLoaded}get progress(){return this.#w?.progress??0}get duration(){return this.#s?.duration??0}get playbackRange(){let{start:e,end:t}=this.#p;return{start:e,end:Math.min(t,this.duration||1/0)}}get ended(){return this.#m}get currentTime(){return this.#a}get isPlaying(){return this.#l}get isBuffering(){return(this.#s?.isBuffering??!1)||this.#l&&this.#t.isBuffering}get lastFetchStatus(){return this.#w?.lastFetchStatus??0}play(){this.#l=!0,this.#_()}pause(){this.#l=!1,this.#h=0,this.#t.stop()}seek(e){let{start:t,end:r}=this.playbackRange;this.#a=_.clamp(e,t,r),this.#h=0,this.#t.seek(this.#a)}setPlaybackRange(e,t){if(!(e>=0&&e<t&&t<=this.duration))throw new RangeError(`Invalid playback range [${e}, ${t}) for ${this.duration}s`);this.#T({start:e,end:t})}clearPlaybackRange(){this.#T(Ht)}#T(e){this.#p=e,this.#s?.setPlaybackRange(e.start,e.end);let{start:t,end:r}=this.playbackRange;(this.#a<t||this.#a>=r)&&this.seek(t)}get speed(){return this.#c}setSpeed(e){this.#c=_.clamp(_.finite(e,1),.1,4),this.#t.rate(this.#c)}close(){this.#s?.remove(),this.#s=null,this.#o?.remove(),this.#o=null,this.#S(),this.#t.unload()}clearVideo(){this.#s?.remove(),this.#s=null,this.#S(),this.#t.unload()}#S(){this.#p=Ht,this.#m=!1,this.#a=0,this.#h=0,this.#l=!1}clearEnvironment(){this.#o?.remove(),this.#o=null}#_(){let e=this.#l&&(this.#s?.isReady??!1)&&!this.#s?.isBuffering;return this.#t.sync(this.#a,this.duration,e)}#E(){if(!this.#s)return;let e=performance.now(),t=this.#_(),r=this.#l&&this.#s.isReady&&!this.#s.isBuffering&&t;r&&this.#h>0&&this.#M(_.deltaSeconds(e,this.#h)*this.#c*this.#t.clockRate),this.#h=r?e:0,this.#s.setTime(this.#a)}#M(e){let{start:t,end:r}=this.playbackRange,i=this.#a+e;if(i<r){this.#a=i;return}this.#a=t+_.wrap(i-t,r-t),this.#p===Ht?this.#m=!0:this.#t.seek(this.#a)}open(e){if(this.#t.unload(),e.audio&&this.#t.load(e.audio),e.type==="static")return this.#C(e);this.#s||(this.#s=new mt(this.#e)),this.#s.openDynamic(e),this.#P(this.#s),this.#S()}async#C(e){this.#o||(this.#o=new mt(this.#e)),await this.#o.openStatic(e),this.#P(this.#o)}get audioContext(){return this.#t.context}get audioEnabled(){return this.#t.enabled}enableAudio(){this.#t.enable(),this.#_()}disableAudio(){this.#t.disable()}setAudioOutput(e){this.#t.setOutput(e)}setVolume(e){this.#t.volume(e)}loadAudio(e){return this.#t.load(e)}setAudioSpatial(e,t,r){this.#t.setSpatial(e,t,r)}setAudioSourceMatrix(e,t,r){this.#t.setSourceMatrix(e,t,r)}setAudioListenerMatrix(e){this.#t.setListenerMatrix(e)}setAudioPanner(e){this.#t.setPanner(e)}setCamera(e,t,r,i){this.#e.setCamera(e,t,r,i)}getBBox(){return this.#w?.getBBox()??null}getModelMatrix(){return this.#e.getModelMatrix()}setModelMatrix(e){this.#e.setModelMatrix(e)}setStaticModelMatrix(e){this.#o?.setModelMatrix(e)}setEnvLighting(e,t=1){this.#n={coefs:Float32Array.from(e),scale:t},this.#s?.setEnvLighting(e,t),this.#o?.setEnvLighting(e,t)}clearEnvLighting(){this.#n=null,this.#s?.clearEnvLighting(),this.#o?.clearEnvLighting()}#P(e){this.#n&&e.setEnvLighting(this.#n.coefs,this.#n.scale)}frame(e,t,r){this.#E(),this.#e.hybridFrame(e,t,r)}preprocess(e,t){return this.#E(),this.#e.hybridPreprocess(e,t)}render(e,t,r,i,n,o){this.#e.hybridRender(e,t,r,i,n,o)}renderMesh(e,t,r,i,n){this.#e.hybridRenderMesh(e,t,r,i,n)}renderMotionMV(e,t,r,i){this.#e.hybridRenderMotionMV(e,t,r,i)}canMotion(){return this.#e.hybridCanMotion()}hasMultiview(){return this.#e.hybridHasMultiview()}resetXR(){this.#e.hybridReset()}dispose(){typeof document<"u"&&document.removeEventListener("visibilitychange",this.#d),this.close(),this.#t.unload(),this.shutdown(),this.#e.dispose()}};var Un=.175,kr=.4,Fr=.15,Wn=.9,Yn=.35,Zn=.04,Yi=3,qn=.5,ji=1e-6,Ir=64,jn=.25,Qn=new Set(["box","sphere","sector"]),$n=new Float32Array(0),gt=s=>typeof s=="number"&&Number.isFinite(s),Br=s=>!!s&&gt(s.x)&&gt(s.y)&&gt(s.z),Kn=s=>Br(s)&&gt(s.w);function Jn(s){return!s||typeof s!="object"||!Qn.has(s.type)||!Br(s.position)||!Kn(s.rotation)||!Br(s.scale)||!(s.scale.x>0)||!(s.scale.y>0)||!(s.scale.z>0)?!1:s.angleDeg==null||gt(s.angleDeg)}var Zi=s=>-s-Un,eo=s=>Wn*Math.min(Math.max(0,-s)/Yn,1),qi=s=>s>kr?0:s<=Fr?1:(kr-s)/(kr-Fr),to=s=>1-_.unlerp01(s,Yi,Yi+qn);function ro(s,e){let t=Math.abs(s[0])-e[0],r=Math.abs(s[2])-e[2];return Math.hypot(Math.max(t,0),Math.max(r,0))+Math.min(Math.max(t,r),0)}function io(s,e){let t=Math.hypot(s[0]/e[0],s[2]/e[2]);if(t===0)return-Math.min(e[0],e[2]);let r=Math.hypot(s[0]/(e[0]*e[0]),s[2]/(e[2]*e[2]));return t*(t-1)/r}function so(s,e,t){let r=Math.min(e[0],e[2]),i=Math.abs(s[0]),n=s[2],o=Math.hypot(i,n)-r;if(t>=Math.PI-ji)return o;let a=Math.sin(t),l=Math.cos(t),h=_.clamp(i*a+n*l,0,r),c=Math.hypot(i-a*h,n-l*h);return Math.max(o,c*Math.sign(l*i-a*n))}function no(s,e,t){let r=Math.abs(e)-t;return Math.min(Math.max(s,r),0)+Math.hypot(Math.max(s,0),Math.max(r,0))}function oo(s,e){let t=Math.hypot(s[0]/e[0],s[1]/e[1],s[2]/e[2]);if(t===0)return-Math.min(e[0],e[1],e[2]);let r=Math.hypot(s[0]/(e[0]*e[0]),s[1]/(e[1]*e[1]),s[2]/(e[2]*e[2]));return t*(t-1)/r}function ao(s,e){if(s==="box")return new Float32Array([-1,-1,1,-1,1,1,-1,1]);let t=s==="sphere"||e>=Math.PI-ji,r=t?0:-e,i=(t?2*Math.PI:2*e)/Ir,n=t?Ir:Ir+1,o=t?[]:[0,0];for(let a=0;a<n;a++){let l=r+a*i;o.push(Math.sin(l),Math.cos(l))}return new Float32Array(o)}var We=(s,e,t,r)=>(s[e]=t[r],s[e+1]=t[r+1],s[e+2]=t[r+2],e+3),Or=class{#e;#r=new Y;#t=new Y;#i=new ge;#s;#o;#n;#l;#a=new Y;#h=new we;#c=new Y;#p=new ge;#m=new ge;#u=new Y;constructor({type:e,position:t,rotation:r,scale:i,angleDeg:n}){this.#e=e,this.#r.fromXYZ(t),this.#t.fromXYZ(i),this.#i.fromXYZW(r).normalize(),this.#s=_.clamp(Math.abs(n??90),1,360)*Math.PI/360,this.#o=ao(e,this.#s),this.#n=new Float32Array(this.#o.length*3),this.#l=new Float32Array(this.#o.length*9),this.setRoomMatrix(null)}setRoomMatrix(e){return this.#h.fromRotationTranslationScale(this.#i,this.#r,this.#t),e&&this.#h.preMultiply(e),this.#h.decompose(this.#c,this.#p,this.#u),this.#m.copy(this.#p).invert(),this.#u.set(Math.abs(this.#u[0])*.5,Math.abs(this.#u[1])*.5,Math.abs(this.#u[2])*.5),this}signedDistance(e){let t=this.#g(e);return this.#e==="sphere"?oo(t,this.#u):no(this.#d(t),t[1],this.#u[1])}wallDistance(e){return this.#d(this.#g(e))}floorRibbon(e){let t=this.#u,r=Math.min(t[0],t[2]),i=this.#e==="sector"?r:t[0],n=this.#e==="sector"?r:t[2],o=e*.5,a=this.#o.length/2;for(let p=0;p<a;p++)this.#f(p,a,i,n,o);let l=this.#n,h=this.#l,c=0;for(let p=0;p<a;p++){let u=p*6,d=(p+1)%a*6;c=We(h,c,l,u),c=We(h,c,l,d),c=We(h,c,l,d+3),c=We(h,c,l,u),c=We(h,c,l,d+3),c=We(h,c,l,u+3)}return h}#f(e,t,r,i,n){let o=this.#o,a=(e+t-1)%t*2,l=(e+1)%t*2,h=o[e*2]*r,c=o[e*2+1]*i,p=h-o[a]*r,u=c-o[a+1]*i,d=o[l]*r-h,f=o[l+1]*i-c,m=Math.hypot(p,u),g=Math.hypot(d,f),M=u/m+f/g,S=-p/m-d/g,b=Math.hypot(M,S),y=n/(b*Math.max(b/2,jn));this.#b(e*6,h+M*y,c+S*y),this.#b(e*6+3,h-M*y,c-S*y)}#d(e){let t=this.#u;return this.#e==="sphere"?io(e,t):this.#e==="sector"?so(e,t,this.#s):ro(e,t)}#g(e){return this.#a.sub(e,this.#c).transformQuat(this.#m)}#b(e,t,r){let i=this.#a.set(t,-this.#u[1],r).transformQuat(this.#p);this.#n.set(i.add(this.#c),e)}},yt=class{#e=null;#r=Number.POSITIVE_INFINITY;#t=Number.POSITIVE_INFINITY;#i=0;#s=!0;#o=null;#n=new Y;get active(){return!!this.#e}get darkness(){return this.#i}get outlineOpacity(){return Math.max(qi(this.#t),this.#l)}get outlineUrgent(){return this.#t<Fr||this.#l>qi(this.#t)}get#l(){return this.#o===null?0:to(this.#o)}setBounds(e){return this.#e=Jn(e)?new Or(e):null,this.reset()}setRoomMatrix(e){return this.#e?.setRoomMatrix(e),this}queueIntro(){return this.#s=!0,this}reset(){return this.#r=Number.POSITIVE_INFINITY,this.#t=Number.POSITIVE_INFINITY,this.#i=0,this.#o=null,this}update(e,t){if(!this.#e)return this.reset();this.#s?(this.#s=!1,this.#o=0):this.#o!==null&&(this.#o+=t),this.#n.from(e),this.#r=Zi(this.#e.signedDistance(this.#n)),this.#t=this.#r<0?this.#r:Zi(this.#e.wallDistance(this.#n));let r=eo(this.#r),i=1-Math.exp(-t/Zn);return this.#i+=(r-this.#i)*i,this}ribbon(e){return this.#e?.floorRibbon(e)??$n}};var xt={daylight:{ambient:[3.62,3.54,3.37],topDown:[.5,.45,.4]},cloudy:{ambient:[3.19,3.26,3.44],topDown:[.05,.05,.07]},sunset:{ambient:[4.08,3.01,1.95],topDown:[.25,.12,.02],frontBack:[.15,.06,0],leftRight:[-.3,-.12,0]},indoor:{ambient:[3.72,3.37,2.84],topDown:[.3,.25,.15]},shade:{ambient:[3.12,3.3,3.72],topDown:[.1,.15,.3]},night:{ambient:[2.48,2.66,3.01],topDown:[.08,.1,.15]},off:null};var lo=2.5,$i=1.6,ho=.0015,co=2,Qi=.5,po=.6,uo=.022,fo=1e-4,Vt=Math.PI/2-.01,Ut=.05,Wt=200,mo=new Set(["w","a","s","d","r","f","q","e","shift"]),bt=class{#e;#r=new Map;#t=null;#i=1;#s;#o;#n;#l=0;#a=0;#h=0;#c=0;#p=0;#m=e=>e.preventDefault();constructor(e,{pan:t=!0,rotate:r=lo,onDown:i}={}){this.#e=e,this.#s=t,this.#o=r,this.#n=i,this.#i=e.clientHeight||1,e.addEventListener("contextmenu",this.#m),e.addEventListener("pointerdown",this.#u),e.addEventListener("wheel",this.#g,{passive:!1})}get height(){return this.#i}consume(e){return e.rotX=this.#l,e.rotY=this.#a,e.panX=this.#h,e.panY=this.#c,e.zoom=this.#p,this.#l=this.#a=this.#h=this.#c=this.#p=0,e}dispose(){this.#e.removeEventListener("contextmenu",this.#m),this.#e.removeEventListener("pointerdown",this.#u),this.#e.removeEventListener("wheel",this.#g),window.removeEventListener("pointermove",this.#f),window.removeEventListener("pointerup",this.#d),window.removeEventListener("pointercancel",this.#d),this.#r.clear(),this.#t=null}#u=e=>{this.#e.setPointerCapture?.(e.pointerId),this.#r.size===0&&(window.addEventListener("pointermove",this.#f),window.addEventListener("pointerup",this.#d),window.addEventListener("pointercancel",this.#d)),this.#r.set(e.pointerId,{x:e.clientX,y:e.clientY,button:e.button,touch:e.pointerType==="touch"}),this.#i=this.#e.clientHeight||this.#i,this.#r.size===2&&this.#b(),this.#n?.()};#f=e=>{let t=this.#r.get(e.pointerId);if(!t)return;let r=e.clientX-t.x,i=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,this.#r.size>=2)return this.#y();!t.touch&&(t.button===2||e.buttons===2)?this.#s&&(this.#h+=r,this.#c+=i):(this.#l+=r/this.#i*this.#o,this.#a+=i/this.#i*this.#o)};#d=e=>{this.#e.releasePointerCapture?.(e.pointerId),this.#r.delete(e.pointerId),this.#t=null,this.#r.size===0&&(window.removeEventListener("pointermove",this.#f),window.removeEventListener("pointerup",this.#d),window.removeEventListener("pointercancel",this.#d))};#g=e=>{e.preventDefault(),this.#p+=-e.deltaY*ho};#b(){let[e,t]=this.#r.values();this.#t={dist:Math.hypot(e.x-t.x,e.y-t.y),cx:(e.x+t.x)/2,cy:(e.y+t.y)/2}}#y(){let[e,t]=this.#r.values(),r=Math.hypot(e.x-t.x,e.y-t.y),i=(e.x+t.x)/2,n=(e.y+t.y)/2,o=this.#t;o&&(o.dist>0&&r>0&&(this.#p+=Math.log(r/o.dist)),this.#s&&(this.#h+=i-o.cx,this.#c+=n-o.cy)),this.#t={dist:r,cx:i,cy:n}}},go=s=>1-Math.exp(-s/uo),se=()=>({rotX:0,rotY:0,panX:0,panY:0,zoom:0}),yo=s=>Math.abs(s.rotX)+Math.abs(s.rotY)+Math.abs(s.panX)+Math.abs(s.panY)+Math.abs(s.zoom)<fo;function Dr(s,e,t,r,i){let n=s.consume(e);if(t.rotX+=n.rotX,t.rotY+=n.rotY,t.panX+=n.panX,t.panY+=n.panY,t.zoom+=n.zoom,yo(t))return!1;let o=go(i);for(let a of["rotX","rotY","panX","panY","zoom"])r[a]=t[a]*o,t[a]-=r[a];return!0}var zr=class{#e;#r;#t=P.create();#i=P.create();#s=P.create();#o=P.create();#n=P.create();#l=P.create();#a=1;#h=0;#c=0;#p=!1;#m=se();#u=se();#f=se();constructor(e,t){this.#e=e,this.#r=new bt(t),this.#x()}get type(){return"orbit"}update(e){this.#g(e)&&this.#x()}frame(e,t){this.#v(e,t)}reset(e,t){this.#v(e,t)}zoom(e){e>0&&(this.#u.zoom+=Math.log(e))}applyConstraints(e){this.#p=e,this.#c=_.clamp(this.#c,-Vt,this.#d),this.#x()}dispose(){this.#r.dispose()}get#d(){return this.#p?0:Vt}#g(e){if(!Dr(this.#r,this.#m,this.#u,this.#f,e))return!1;let t=this.#f;return this.#h+=t.rotX,this.#c=_.clamp(this.#c-t.rotY,-Vt,this.#d),t.zoom&&(this.#a=_.clamp(this.#a*Math.exp(-t.zoom),Ut,Wt)),(t.panX||t.panY)&&this.#y(t.panX,t.panY),!0}#b(){this.#o.yawPitchBasis(this.#h,this.#c,this.#i,this.#s,this.#n)}#y(e,t){this.#b();let r=_.perspectiveScale(this.#a,this.#e.fov,this.#r.height)*$i;this.#t.addScaled(this.#o,-e*r).addScaled(this.#n,t*r)}#x(){this.#b(),this.#e.position.copy(this.#s).scale(this.#a).add(this.#t),this.#e.setAxes(this.#o,this.#n,this.#s)}#v(e,t){this.#t.from(e),this.#s.sub(this.#l.from(t),this.#t),this.#a=_.clamp(this.#s.len,Ut,Wt),this.#i.copy(this.#s).scale(-1).normalize(A.FORWARD),this.#l.yawPitch(this.#i),this.#h=this.#l.x,this.#c=_.clamp(this.#l.y,-Vt,this.#d),this.#u=se(),this.#x()}},Gr=class{#e;#r;#t=new Set;#i=$.create();#s=P.create();#o=P.create();#n=P.create();#l=P.create();#a=P.create();#h=se();#c=se();#p=se();constructor(e,t){this.#e=e,t.hasAttribute("tabindex")||(t.tabIndex=0),this.#r=new bt(t,{pan:!1,onDown:()=>t.focus()}),window.addEventListener("keydown",this.#d),window.addEventListener("keyup",this.#g)}get type(){return"fly"}update(e){let t=this.#m(e);this.#u(e)&&(t=!0),t&&this.#f()}frame(e,t){this.reset(e,t)}reset(e,t){this.#e.position.from(t),this.#s.sub(this.#a.from(e),this.#e.position).normalize(A.FORWARD),this.#a.yawPitch(this.#s),this.#i.identity().rotate(A.Y,-this.#a.x).rotate(A.X,this.#a.y),this.#c=se(),this.#f()}zoom(e){e>0&&(this.#c.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#r.dispose(),window.removeEventListener("keydown",this.#d),window.removeEventListener("keyup",this.#g),this.#t.clear()}#m(e){let t=co*e*(this.#t.has("shift")?4:1),r=this.#e.position,i=!1,n=(a,l)=>{r.addScaled(a,l),i=!0},o=a=>{this.#i.rotate(A.Z,a),i=!0};return this.#t.has("w")&&n(this.#s,t),this.#t.has("s")&&n(this.#s,-t),this.#t.has("d")&&n(this.#n,t),this.#t.has("a")&&n(this.#n,-t),this.#t.has("r")&&n(this.#l,t),this.#t.has("f")&&n(this.#l,-t),this.#t.has("q")&&o(Qi*e),this.#t.has("e")&&o(-Qi*e),i}#u(e){if(!Dr(this.#r,this.#h,this.#c,this.#p,e))return!1;let t=this.#p;return t.rotX&&this.#i.rotate(A.Y,-t.rotX),t.rotY&&this.#i.rotate(A.X,-t.rotY),t.zoom&&this.#e.position.addScaled(this.#s,t.zoom*po),!0}#f(){this.#i.normalize(),this.#n.copy(A.X).transformQuat(this.#i),this.#l.copy(A.Y).transformQuat(this.#i),this.#o.copy(A.Z).transformQuat(this.#i),this.#s.copy(this.#o).scale(-1),this.#e.setAxes(this.#n,this.#l,this.#o)}#d=e=>{let t=e.key.toLowerCase();!mo.has(t)||this.#b()||(this.#t.add(t),e.preventDefault())};#g=e=>{this.#t.delete(e.key.toLowerCase())};#b(){let e=document.activeElement;return e?.tagName==="INPUT"||e?.tagName==="TEXTAREA"||e?.isContentEditable}},Nr=class{#e;#r;#t=P.create();#i=P.create();#s=P.create().copy(A.Y);#o=P.create();#n=P.create();#l=P.create();#a=P.create();#h=P.create();#c=P.create();#p=$.create();#m=se();#u=se();#f=se();constructor(e,t){this.#e=e,this.#r=new bt(t)}get type(){return"trackball"}update(e){if(!Dr(this.#r,this.#m,this.#u,this.#f,e))return;let t=this.#f;(t.rotX||t.rotY)&&this.#g(t.rotX,t.rotY),t.zoom&&this.#b(t.zoom),(t.panX||t.panY)&&this.#y(t.panX,t.panY),this.#x()}frame(e,t){this.#v(e,t)}reset(e,t){this.#v(e,t)}zoom(e){e>0&&(this.#u.zoom+=Math.log(e))}applyConstraints(e){}dispose(){this.#r.dispose()}#d(){this.#o.copy(this.#i).normalize(A.Z),this.#n.cross(this.#s,this.#o).normalize(A.X),this.#l.cross(this.#o,this.#n)}#g(e,t){this.#d(),this.#a.copy(this.#n).scale(e).addScaled(this.#l,-t);let r=this.#a.len;r<1e-6||(this.#h.cross(this.#a,this.#i).normalize(A.Y),this.#p.setAxisAngle(this.#h,r),this.#i.transformQuat(this.#p),this.#s.transformQuat(this.#p).normalize())}#b(e){this.#i.setLength(_.clamp(this.#i.len*Math.exp(-e),Ut,Wt))}#y(e,t){this.#d();let r=_.perspectiveScale(this.#i.len,this.#e.fov,this.#r.height)*$i;this.#t.addScaled(this.#n,-e*r).addScaled(this.#l,t*r)}#x(){this.#e.up.copy(this.#s),this.#e.position.copy(this.#t).add(this.#i),this.#e.lookAt(this.#t)}#v(e,t){this.#t.from(e),this.#i.sub(this.#c.from(t),this.#t),this.#i.setLength(_.clamp(this.#i.len,Ut,Wt)),this.#s.copy(A.Y),this.#d(),this.#s.copy(this.#l),this.#u=se(),this.#x()}};function Xr(s,e,t){switch(s){case"fly":return new Gr(e,t);case"trackball":return new Nr(e,t);default:return new zr(e,t)}}var Hr=class{position=P.create();target=P.create();up=P.create().copy(A.Y);matrixWorld=D.create();projectionMatrix=D.create();fov;aspect;near;far;constructor(e=60,t=1,r=.05,i=1e4){this.fov=e,this.aspect=t,this.near=r,this.far=i,this.updateProjectionMatrix(),this.updateMatrixWorld()}lookAt(e){return this.target.from(e),this.updateMatrixWorld()}updateProjectionMatrix(){this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far)}updateMatrixWorld(){return this.matrixWorld.cameraWorld(this.position,this.target,this.up),this.matrixWorld}setAxes(e,t,r){return this.up.copy(t),this.target.copy(this.position).addScaled(r,-1),this.matrixWorld.cameraWorldAxes(this.position,e,t,r)}},Ki=1.5,Ji=1,xo=[0,.4,0],bo=-.25,Yt=class{#e=D.create();#r=P.create();#t=P.create();#i;#s;#o;#n=!1;#l=!1;#a=null;#h=null;constructor(e,t="orbit"){this.#o=e,this.#i=new Hr,this.#s=Xr(t,this.#i,e),this.#c()}get canPresent(){return this.#n}get controls(){return this.#s}get controlsType(){return this.#s.type}setControls(e){e!==this.#s.type&&(this.#s.dispose(),this.#s=Xr(e,this.#i,this.#o),this.reset(),this.#s.applyConstraints(this.#l))}setSceneTransform(e){e?this.#e.fromTransform(e):this.#e.identity(),this.#l=!!e,this.#s.applyConstraints(this.#l),this.#n=!1}setAudioPosition(e){e?this.#r.fromXYZ(e):this.#r.set(0,0,0)}setBBox(e){if(!e)return;this.#e.pointTo(this.#t,Ot.center(this.#t,e)).addXYZ(0,bo);let t=this.#t.toArray(),r=[0,Ki,Ji];this.#a=t,this.#h=r,this.#s.frame(t,r),this.#n=!0}update(e){this.#s.update(e)}apply(e,t,r){e.setModelMatrix(this.#e),t>0&&r>0&&(this.#i.aspect=t/r,this.#i.updateProjectionMatrix()),e.setCamera(this.#i.matrixWorld,this.#i.projectionMatrix),this.#n&&(e.setAudioSourceMatrix(this.#e,this.#r),e.setAudioListenerMatrix(this.#i.matrixWorld))}zoom(e){this.#s.zoom(e)}reset(){this.#a&&this.#h?(this.#s.frame(this.#a,this.#h),this.#n=!0):this.#c()}dispose(){this.#s.dispose()}#c(){this.#s.reset(xo,{x:0,y:Ki,z:Ji}),this.#n=!1}};var Zt=class{#e;#r;#t;#i;#s;#o;#n;#l;#a=null;#h=!1;#c=!1;#p=!1;#m=null;#u=0;onFrame=null;onBeforeRender=null;onEyeRender=null;onASWRender=null;onRefReset=null;onSessionEnd=null;externalLayers=[];constructor(e,t){this.#e=e,this.#r=t}get session(){return this.#t}get active(){return!!this.#t}get aswAvailable(){return!!this.onASWRender}get aswActive(){return this.#h&&!!this.#t}get layeredActive(){return this.#c&&!!this.#t}get isAR(){return this.#p&&!!this.#t}get defaultDt(){return 1/(this.#h?36:72)}get binding(){return this.#s}get refSpace(){return this.#i}set soundPosition(e){this.#m=e?[e.x,e.y,e.z]:null}async enter(e=!1){if(!navigator.xr||this.#t)return{isQuest:!1,isPico:!1,isAVP:!1};let t=this.#r,r=this.#e;this.#p=e,this.#a=t.getExtension("OCULUS_multiview")||t.getExtension("OVR_multiview2")||null;let i=navigator.userAgent,n=/PicoBrowser/i.test(i),o=/OculusBrowser/i.test(i)&&!n,a=/Version\//.test(i)&&/Safari\//.test(i)&&!o&&!n;if(this.#t=await navigator.xr.requestSession(e?"immersive-ar":"immersive-vr",{optionalFeatures:["local-floor",e&&"local",o&&"layers",o&&"space-warp",(o||n)&&"hand-tracking"].filter(Boolean)}),!this.#t)throw new Error(`Failed to start ${e?"AR":"VR"} session`);let l=new Set(this.#t.enabledFeatures??[]);for(let c of["local-floor","local","viewer"])try{this.#i=await this.#t.requestReferenceSpace(c);break}catch{}this.#i?.addEventListener("reset",()=>this.onRefReset?.()),this.#c=this.#h=!1;let h=n?.75:1;if(l.has("layers"))try{t.getExtension("EXT_color_buffer_half_float"),this.#s=new XRWebGLBinding(this.#t,t),this.#o=this.#s.createProjectionLayer({textureType:"texture-array",depthFormat:t.DEPTH_COMPONENT24,scaleFactor:h,...e&&{clearOnAccess:!1}}),this.#c=!0,this.#h=l.has("space-warp"),!this.#h&&this.#o.fixedFoveation!==void 0&&(this.#o.fixedFoveation=1),await this.#t.updateRenderState({layers:[this.#o]}),this.#n=t.createFramebuffer(),this.#h&&(this.#l=t.createFramebuffer())}catch{this.#c=this.#h=!1,this.#s=this.#o=null}if(!this.#c){let c=new XRWebGLLayer(this.#t,t,{framebufferScaleFactor:h,...e&&{alpha:!0}});c.fixedFoveation!==void 0&&(c.fixedFoveation=1),await this.#t.updateRenderState({baseLayer:c})}return r.resetXR(),this.#t.addEventListener("end",()=>this.#b()),this.#u=0,this.#t.requestAnimationFrame(this.#f),{isQuest:o,isPico:n,isAVP:a}}#f=(e,t)=>{let r=this.#t;if(!r)return;r.requestAnimationFrame(this.#f);let i=_.deltaSeconds(e,this.#u,this.defaultDt,4*this.defaultDt);this.#u=e,this.onFrame?.(i,t)};exit(){this.#t?.end()}renderFrame(e,t,r=1){let i=this.#e,n=this.#r,o=t.getViewerPose(this.#i);if(!o||o.views.length<1)return;let a=this.#y(o);if(!this.#p&&a.length<2){this.#d(i,o,r);return}(a.length>=2||this.#p)&&(this.onBeforeRender?.(e,t,this.#i,o,t.session.inputSources,i),this.#g());let l=a[1]??null;i.setCamera(a[0].transform.matrix,a[0].projectionMatrix,l?.transform.matrix,l?.projectionMatrix),this.#h?this.#S(n,i,a):this.#c?this.#T(n,i,a):this.#w(n,i,a,t),this.#d(i,o,r)}#d(e,t,r){let i=this.#m;if(!i){let o=e.getBBox();o&&(i=[(o.minX+o.maxX)*.5,(o.minY+o.maxY)*.5,(o.minZ+o.maxZ)*.5])}let n=e.getModelMatrix();i&&n&&e.setAudioSourceMatrix(n,i,r),e.setAudioListenerMatrix(t.transform.matrix)}#g(){!this.#t||!this.#c||this.#t.updateRenderState({layers:[this.#o,...this.externalLayers]})}#b=()=>{if(!this.#t)return;let e=this.#r;this.#n&&(e.deleteFramebuffer(this.#n),this.#n=null),this.#l&&(e.deleteFramebuffer(this.#l),this.#l=null),this.#t=this.#i=this.#o=this.#s=null,this.#h=this.#c=this.#p=!1,this.#u=0,this.externalLayers=[],this.onSessionEnd?.()};#y(e){if(e.views.length<2)return[e.views[0]];let t=e.views.find(i=>i.eye==="left")||e.views[0],r=e.views.find(i=>i.eye==="right")||e.views[1];return[t,r]}#x(e,t){e.bindFramebuffer(e.FRAMEBUFFER,t),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.clearColor(0,0,0,this.#p?0:1)}#v(e,t,r,i,n,o,a,l,h,c=e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT){e.viewport(n,o,a,l),e.clear(c),t.render(t.drawMode,n,o,a,l,h),this.onEyeRender?.(e,r,i,n,o,a,l)}#w(e,t,r,i){let n=i.session.renderState.baseLayer,o=r.map(a=>n.getViewport(a));t.preprocess(o[0].width,o[0].height),e.bindFramebuffer(e.FRAMEBUFFER,n.framebuffer),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.clearColor(0,0,0,this.#p?0:1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.disable(e.DEPTH_TEST),e.depthMask(!1);for(let a=0;a<r.length;a++){let l=o[a];t.render(t.drawMode,l.x,l.y,l.width,l.height,a),this.onEyeRender?.(e,n.framebuffer,r[a],l.x,l.y,l.width,l.height)}}#T(e,t,r){let i=r.map(a=>this.#s.getViewSubImage(this.#o,a)),n=i[0].colorTextureWidth,o=i[0].colorTextureHeight;t.preprocess(n,o),this.#x(e,this.#n);for(let a=0;a<r.length;a++){let l=i[a],h=l.imageIndex??a;e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.colorTexture,0,h),l.depthStencilTexture&&e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,h),this.#v(e,t,this.#n,r[a],0,0,n,o,a)}e.bindFramebuffer(e.FRAMEBUFFER,null)}#S(e,t,r){let i=r.map(c=>this.#s.getViewSubImage(this.#o,c)),n=i[0].colorTextureWidth,o=i[0].colorTextureHeight,a=i.map((c,p)=>c.imageIndex??p);this.#o&&(this.#o.deltaPose=null),t.preprocess(n,o),this.#x(e,this.#n);for(let c=0;c<r.length;c++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[c].colorTexture,0,a[c]),this.#v(e,t,this.#n,r[c],0,0,n,o,c,e.COLOR_BUFFER_BIT);let l=i[0];if(l.motionVectorTexture&&l.depthStencilTexture){let c=l.motionVectorTextureWidth,p=l.motionVectorTextureHeight,u=t.canMotion();if(e.bindFramebuffer(e.FRAMEBUFFER,this.#l),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),e.clearColor(0,0,0,0),e.clearDepth(1),this.#a&&a.length>=2&&a[1]===a[0]+1&&t.hasMultiview())this.#a.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.motionVectorTexture,0,a[0],2),this.#a.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,a[0],2),e.viewport(0,0,c,p),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),u&&t.renderMotionMV(0,0,c,p);else for(let f=0;f<r.length;f++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[f].motionVectorTexture,0,a[f]),e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,i[f].depthStencilTexture,0,a[f]),e.viewport(0,0,c,p),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),u&&t.render(3,0,0,c,p,f);let d=(f,m,g)=>({view:f,colorTex:m.colorTexture,colorIdx:g,mvTex:m.motionVectorTexture,mvIdx:g,depthTex:l.depthStencilTexture,w:n,h:o,mvW:c,mvH:p});this.onASWRender?.(e,r.map((f,m)=>d(f,i[m],a[m])))}else this.onASWRender?.(e,r.map((c,p)=>({view:c,colorTex:i[p].colorTexture,colorIdx:a[p],w:n,h:o})));e.bindFramebuffer(e.FRAMEBUFFER,null)}};var ts=D.create().fromScaling(A.FLIP_Z),qt=D.create().copy(ts).multiply(D.create().fromTranslation([0,1,-1])),vo=.04,wo=.5,_o=1,So=Math.PI/6,ce=P.create(),vt=P.create(),es=P.create(),To=$.create(),jt=class{#e=P.create();#r=$.create();#t=1;#i=P.create();#s=D.clone(qt);#o=qt;#n=D.create();#l=D.create();#a="none";#h=P.create();#c={mid:P.create(),dist:0,axX:0,axZ:0};#p="undecided";#m=0;#u=0;#f=!1;#d=!1;#g=!1;get position(){return this.#e}get scale(){return this.#t}get sceneTransform(){return this.#s}get scaleLocked(){return this.#f}set scaleLocked(e){this.#f=!!e}setCenter(e,t,r){this.#i.set(e,t,r)}setSceneTransform(e){this.#o=e?ts:qt,e?this.#s.fromTransform(e).preMultiply(this.#o):this.#s.copy(qt)}resetToInitial(){this.#e.set(0,0,0),this.#t=1,this.#r.identity()}reset(){this.#a="none"}isHeld(e){return this.#a==="dual"||this.#a===e}update(e,t,r,i,n=!0,o=null){for(let u of r)this.#v(u,i,o);let a=e.gripTransform?.position,l=t.gripTransform?.position,h=n&&e.active&&e.gripping&&!!a,c=n&&t.active&&t.gripping&&!!l,p=h&&e.grabRestart||c&&t.grabRestart;h&&c?this.#x(a,l,p):h?this.#y("left",a,p):c?this.#y("right",l,p):this.reset()}buildModelMatrix(){return this.#b(this.#n,this.#s)}buildRoomMatrix(){return this.#b(this.#l,this.#o)}#b(e,t){return ce.copy(this.#i).transformMat4(this.#s),vt.set(this.#t,this.#t,-this.#t),e.fromPivot(this.#e,this.#r,vt,ce,t)}#y(e,t,r){if(r||this.#a!==e){this.#a=e,this.#h.fromXYZ(t);return}if(ce.fromXYZ(t).sub(this.#h),ce.sqrLen>.01){this.#h.fromXYZ(t);return}this.#e.add(ce),this.#h.fromXYZ(t)}#x(e,t,r){ce.midXYZ(e,t);let i=vt.fromXYZ(e).distanceXYZ(t),n=i||1,o=(t.x-e.x)/n,a=(t.z-e.z)/n,l=this.#c;if(r||this.#a!=="dual"){this.#a="dual",l.mid.copy(ce),l.dist=i,l.axX=o,l.axZ=a,this.#p="undecided",this.#m=0,this.#u=0;return}let h=0;l.dist>.03&&i>.03&&(h=_.absLogRatio(i,l.dist));let c=l.axX,p=l.axZ;l.axX=o,l.axZ=a;let u=_.unlerp01(Math.min(Math.hypot(c,p),Math.hypot(o,a)),.08,.33),d=0;if(u>0&&(d=_.wrapPi(Math.atan2(a,o)-Math.atan2(p,c))*u),this.#p==="undecided"){this.#f||(this.#m+=h),this.#u+=Math.abs(d);let f=vo;(this.#m>=f||this.#u>=f)&&(this.#p=this.#m>=this.#u?"scale":"rotate")}if(this.#p==="scale"&&!this.#f&&l.dist>.03&&i>.03){let f=this.#t;this.#t=_.clamp(f*(i/l.dist),.01,100);let m=this.#t-f;vt.copy(this.#i).transformMat4(this.#s),this.#e.add(es.copy(vt).multiplyXYZ(-m,-m,m))}this.#p==="rotate"&&_.outside(d,5e-4)&&this.#r.rotatePre(A.Y,d),this.#e.add(es.sub(ce,l.mid)),l.mid.copy(ce),l.dist=i}#v(e,t,r){let i=e.gamepad;if(!i?.axes||i.axes.length<2)return;let n=i.axes.length>=4?2:0;this.#w(i.axes[n],-i.axes[n+1],t,r);let o=i.buttons?.[3]?.pressed??!1;e.handedness==="left"?(o&&!this.#d&&this.resetToInitial(),this.#d=o):(o&&!this.#g&&this.resetToInitial(),this.#g=o)}#w(e,t,r,i){if(!(Math.hypot(e,t)<=wo)){if(Math.abs(t)<=Math.abs(e)){this.#r.rotatePre(A.Y,-Math.sign(e)*So*r);return}i&&(ce.copy(A.FORWARD).transformQuat(To.fromXYZW(i.orientation)).multiplyXYZ(1,0,1).normalize(A.FORWARD),this.#e.addScaled(ce,-t*_o*r))}}};var Qt=class{on=!1;#e=-1;update(e){this.#e<0?this.#e=e:this.#e=e>this.#e?e:(this.#e+e)*.5,this.on=this.#e<(this.on?.018:.015)}reset(){this.on=!1,this.#e=-1}},$t=class s{static#e=30;static#r=300;static#t=.02;#i=P.create();#s=!1;#o=0;#n=null;tapped=!1;update(e,t){if(this.tapped=!1,e&&!this.#s)this.#o=performance.now(),this.#n=t?{x:t.x,y:t.y,z:t.z}:null;else if(!e&&this.#s){let r=performance.now()-this.#o,i=this.#n,n=i&&t?this.#i.fromXYZ(t).distanceXYZ(i):0;r>=s.#e&&r<=s.#r&&n<s.#t&&(this.tapped=!0)}this.#s=e}reset(){this.#s=!1,this.tapped=!1,this.#n=null}},Kt=class s{static#e=30;static#r=300;#t=!1;#i=0;tapped=!1;update(e){if(this.tapped=!1,e&&!this.#t)this.#i=performance.now(),this.#t=!0;else if(!e&&this.#t){let t=performance.now()-this.#i;t>=s.#e&&t<=s.#r&&(this.tapped=!0),this.#t=!1}}reset(){this.#t=!1,this.tapped=!1}},Jt=class{#e=[!1,!1];update(e){if(!e||e.length<=6)return 0;let t=e[5]?.pressed??!1,r=e[6]?.pressed??!1,i=t&&!this.#e[0]?-1:r&&!this.#e[1]?1:0;return this.#e[0]=t,this.#e[1]=r,i}reset(){this.#e[0]=this.#e[1]=!1}},er=class{#e;left={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};right={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};stickSrcs=[];#r=null;#t=null;#i;#s;#o;#n;#l=new Kt;#a=new Kt;constructor({directGrab:e=!1}={}){this.#n=e,this.#e=$.create().setAxisAngle(A.X,-.8),this.#s=P.create(),this.#o=$.create(),this.#i=new Map([[this.left,{side:"left",pinch:new Qt,tap:new $t,swipe:new Jt,smooth:P.create(),smoothActive:!1,rayPos:P.create(),rayOri:$.create(),rayActive:!1}],[this.right,{side:"right",pinch:new Qt,tap:new $t,swipe:new Jt,smooth:P.create(),smoothActive:!1,rayPos:P.create(),rayOri:$.create(),rayActive:!1}]])}#h(e){e.active=e.gripping=e.isHandProfile=e.grabRestart=e.triggerPressed=e.menuPressed=e.isTransientPointer=!1,e.microSwipe=0,e.rayTransform=e.gripTransform=e.indexTip=e.thumbTip=null}read(e,t,r,i){this.#h(this.left),this.#h(this.right),this.stickSrcs.length=0;let n=null,o=null;for(let a of r||[]){if(a.targetRayMode==="transient-pointer"){let h=e.getPose(a.targetRaySpace,t);if(!h)continue;let p=((a.gripSpace?e.getPose(a.gripSpace,t):null)??h).transform,u=this.#c(a,p.position,n,o);this.#p(u,h.transform,p,a,i),u===this.left?n=a:o=a;continue}a.gripSpace&&!a.hand&&a.gamepad?.axes?.length>=2&&!a.profiles?.some(h=>h.includes("hand"))&&this.stickSrcs.push(a);let l=a.handedness==="left"?this.left:a.handedness==="right"?this.right:null;!l||l.active||(a.hand?this.#m(l,a,e,t,i):a.gripSpace&&this.#u(l,a,e,t,i))}this.#r=n,this.#t=o,(n||o)&&(this.stickSrcs.length=0,n||(this.left.gripping=!1),o||(this.right.gripping=!1)),i.uiActive?(this.#l.reset(),this.#a.reset()):(this.#l.update(!!n),this.#a.update(!!o)),this.#l.tapped&&(this.left.menuPressed=!0),this.#a.tapped&&(this.right.menuPressed=!0);for(let[a,l]of this.#i)a.indexTip||(l.pinch.reset(),l.tap.reset(),l.swipe.reset(),l.smoothActive=!1,l.rayActive=!1)}#c(e,t,r,i){if(e.handedness==="left")return this.left;if(e.handedness==="right")return this.right;if(r&&!i)return this.right;if(i&&!r)return this.left;let n=this.left.gripTransform?.position,o=this.right.gripTransform?.position,a=n?this.#s.fromXYZ(t).distanceXYZ(n):1/0,l=o?this.#s.fromXYZ(t).distanceXYZ(o):1/0;return a<=l?this.left:this.right}#p(e,t,r,i,{isHeld:n,hitTest:o,uiActive:a}){e.rayTransform=t,e.gripTransform=r,e.active=e.triggerPressed=e.isTransientPointer=!0;let{side:l}=this.#i.get(e),h=l==="left"?this.#r:this.#t,c=h!=null&&h!==i,p=h===i;!c&&n(l)?e.gripping=!0:a||(this.#n&&p||!this.#n&&o&&o(t)||n(l==="left"?"right":"left"))&&(e.gripping=!0,c&&(e.grabRestart=!0))}#m(e,t,r,i,{isHeld:n,uiActive:o,viewerPose:a}){let l=t.hand.get("wrist");if(!l)return;let h=r.getJointPose?.(l,i);if(!h)return;e.gripTransform=h.transform;let c=this.#f(t.hand,"index-finger-tip",r,i),p=this.#f(t.hand,"thumb-tip",r,i),u=this.#f(t.hand,"index-finger-phalanx-proximal",r,i);c&&(e.indexTip=c.transform.position),p&&(e.thumbTip=p.transform.position);let d=this.#i.get(e);if(u){this.#o.fromXYZW(h.transform.orientation).mul(this.#e);let m=d.rayPos,g=d.rayOri;d.rayActive?(m.lerp(this.#s.fromXYZ(u.transform.position),.5),g.slerp(this.#o,.5)):(m.fromXYZ(u.transform.position),g.copy(this.#o),d.rayActive=!0),e.rayTransform={position:m.toXYZ(),orientation:g.toXYZW()}}else e.rayTransform=c?.transform??null,d.rayActive=!1;if(c&&p){let m=c.transform.position,g=p.transform.position;d.pinch.update(this.#s.fromXYZ(m).distanceXYZ(g)),e.gripping=e.triggerPressed=d.pinch.on}else{d.pinch.reset();let m=t.gamepad?.buttons?.[0];e.gripping=m?m.pressed||m.value>.5:!1,e.triggerPressed=e.gripping}o?(d.tap.reset(),n(d.side)||(e.gripping=!1)):(d.tap.update(d.pinch.on,h.transform.position),d.tap.tapped&&(e.menuPressed=!0)),e.gripping&&!n(d.side)&&!this.#g(h.transform.position,a)&&(e.gripping=!1),e.active=!0,e.microSwipe=d.swipe.update(t.gamepad?.buttons);let f=d.smooth;d.smoothActive||(f.fromXYZ(h.transform.position),d.smoothActive=!0),f.lerp(this.#s.fromXYZ(h.transform.position),.4),e.gripTransform={position:f.toXYZ(),orientation:h.transform.orientation}}#u(e,t,r,i,{isHeld:n,uiActive:o,viewerPose:a}){let l=r.getPose(t.gripSpace,i);l&&(e.gripTransform=l.transform);let h=r.getPose(t.targetRaySpace,i);if(h&&(e.rayTransform=h.transform),!e.gripTransform&&!e.rayTransform)return;if(e.isHandProfile=t.profiles?.some(u=>u.includes("hand"))??!1,t.targetRayMode==="tracked-pointer"&&t.gamepad?.buttons?.[0]){let u=t.gamepad.buttons[0],d=u.pressed||u.value>.5;e.gripping=e.isHandProfile?d:t.gamepad?.buttons?.[1]?.pressed??!1}else e.gripping=t.gamepad?.buttons?.[1]?.pressed??!1;e.triggerPressed=t.gamepad?.buttons?.[0]?.pressed??!1;let c=t.gamepad?.buttons;e.menuPressed=!!(c?.[4]?.pressed||c?.[5]?.pressed||c?.[12]?.pressed);let{side:p}=this.#i.get(e);e.isHandProfile&&e.gripping&&!n(p)&&(o||!this.#g(e.gripTransform?.position,a))&&(e.gripping=!1),e.gripping&&!e.gripTransform&&(e.gripping=!1),e.active=!0,e.isHandProfile&&e.rayTransform&&(e.rayTransform=this.#d(e.rayTransform.orientation,e.rayTransform.position))}#f(e,t,r,i){let n=e.get(t);return n?r.getJointPose?.(n,i)??null:null}#d(e,t){return this.#o.fromXYZW(e).mul(this.#e),{position:t,orientation:this.#o.toXYZW()}}#g(e,t){if(!t||!e)return!0;let r=t.position;this.#s.subXYZ(e,r).transformQuat(this.#o.fromXYZW(t.orientation).invert());let i=this.#s.xzLen;return i<.05||this.#s.y>-1.19*i}};var Ye=class{#e;#r;#t;#i;#s=!0;#o=!1;#n=!1;#l=!1;#a=!1;constructor(e,t=null,{directGrab:r=!1}={}){this.#e=e,this.#r=t,this.#t=new er({directGrab:r}),this.#i=new jt}setOverlay(e){this.#r=e,this.#s=!0}get#h(){return this.#r?this.#r.hasBBox:this.#o}reset(){this.#i.reset(),this.#l=this.#a=!1}invalidateBBox(){this.#s=!0}setInitialTransform(e){this.#i.setSceneTransform(e),this.#s=!0,this.#c()}get scene(){return this.#r?.scene??null}get scale(){return this.#i.scale}get roomMatrix(){return this.#i.buildRoomMatrix()}get leftHand(){return this.#t.left}get rightHand(){return this.#t.right}get locked(){return this.#n}set locked(e){this.#n=!!e,this.#n&&this.#i.reset()}get scaleLocked(){return this.#i.scaleLocked}set scaleLocked(e){this.#i.scaleLocked=e}resetToInitial(){this.#i.resetToInitial(),this.#i.reset()}update(e,t,r,i,n,o=!1){let a=t.getViewerPose(r);this.#t.read(t,r,i,{isHeld:c=>this.#i.isHeld(c),hitTest:c=>this.#r?.hitTest(c)??!1,uiActive:n,viewerPose:a?.transform??null}),(this.#s||!this.#h)&&this.#p();let l=this.#t.left,h=this.#t.right;if(l.held=h.held=!1,!this.#n){this.#i.update(l,h,this.#t.stickSrcs,e,this.#h&&!o,a?.transform??null);let c=this.#i.isHeld("left"),p=this.#i.isHeld("right");l.held=c&&this.#l,h.held=p&&this.#a,this.#l=c,this.#a=p}this.#c()}#c(){this.#h&&this.#r?.applyTransform(this.#i.position,this.#i.scale),this.#e.setModelMatrix?.(this.#i.buildModelMatrix())}#p(){let e=this.#e.getBBox?.();if(!e)return;let t,r,i;this.#r?{cx:t,cy:r,cz:i}=this.#r.rebuildBBox(e,this.#i.sceneTransform):(t=(e.minX+e.maxX)/2,r=(e.minY+e.maxY)/2,i=(e.minZ+e.maxZ)/2,this.#o=!0),this.#i.setCenter(t,r,i),this.#s=!1}};function rs(){let s=document.createElement("canvas");return s.style.display="block",s.style.width="100%",s.style.height="100%",s.style.touchAction="none",s}var Ze=class s{#e=null;#r;#t=null;#i=null;#s=null;#o=null;#n=0;#l=0;#a=null;#h=null;#c=new yt;#p=!1;#m=!1;#u=0;#f="pw";#d="pw";#g=null;#b=!1;#y={};#x=null;#v=null;#w=null;#T=!1;#S=[];#_=-1;onProgress=null;onReady=null;onError=null;onFrame=null;onBeforeFrame=null;onModeChange=null;onSceneChange=null;onSceneEnd=null;static async create(e,{container:t,overlay:r=null,boundaryRenderer:i=null,mode:n="pw"}={}){if(!t)throw new Error("container element required");if(!navigator.gpu)throw new Error("WebGPU not available");let o=new s;o.#a=r,o.#h=i,r&&(r.onSceneChange=(l,h)=>o.loadScene(h)),navigator.xr&&(o.#y.vr=await navigator.xr.isSessionSupported("immersive-vr").catch(()=>!1),o.#y.ar=await navigator.xr.isSessionSupported("immersive-ar").catch(()=>!1));let a=n==="hw"?"hw":n==="vr"||n==="ar"?n:"pw";return o.#r=rs(),t.appendChild(o.#r),o.#e=await Ue.create(e,{canvas:o.#r,backend:a==="hw"?"hybrid":"pure"}),o.#U(),await o.#C(a),o.#f=a,o}get player(){return this.#e}get camera(){return this.#i}get canvas(){return this.#r}get gl(){return this.#e?.gl??null}get audioContext(){return this.#e?.audioContext??null}get device(){return this.#e?.device??null}get mode(){return this.#f}get fallbackMode(){return this.#d}get xr(){return this.#s}get manipulator(){return this.#o}get drawMode(){return this.#e.drawMode}set drawMode(e){this.#e.drawMode=e}supports(e){return e==="pw"||e==="hw"||!!this.#y[e]}set sources(e){this.#S=e??[],this.#_=Math.min(this.#_,Math.max(0,this.#S.length-1)),this.#a&&(this.#a.sources=this.#S)}get sources(){return this.#S}get sceneIndex(){return this.#_}loadScene(e){let t=this.#S;if(e<0||e>=t.length)return;let r=t[e];this.#_=e,this.#v=null,this.setInitialTransform(r.initialTransform??null),this.setBackground(r.background??"#000"),r.controls&&this.setControls(r.controls),this.setBounds(r.bounds??null),this.#o&&(this.#o.locked=r.locked??this.#o.locked,this.#o.scaleLocked=r.scaleLocked??this.#o.scaleLocked);let i=r.staticTransform??null,n=r.staticUrl??null;this.#X(async o=>{if(n){let a=new File([await(await fetch(n)).arrayBuffer()],"static.sog");if(!o()||(await this.#e.open({file:a,type:"static"}),!o()))return}await this.#e.open(r),o()&&i&&this.#M(i)}),this.setAudioPosition(r.audioPosition??null),this.#a&&(this.#a.sceneIndex=e),this.onSceneChange?.(r,e)}start(){this.#p=!0,this.#F()}stop(){this.#p=!1,this.#L()}open(e){return this.setInitialTransform(e.initialTransform??null),this.setBounds(e.bounds??null),this.setAudioPosition(e.audioPosition??null),this.#X(()=>this.#e.open(e))}close(){++this.#u,this.#I(),this.#e.close(),this.#m=!1,this.#p=!1;let e=this.#f,t=this.#d,r=t!=="pw"?"hybrid":"pure";r!==this.#e.backend&&this.#V(r),this.#P(),this.#f=t,t!==e&&this.onModeChange?.(t,e)}async setMode(e){if(this.#g=e,!this.#b){this.#b=!0;do e=this.#g,this.#g=null,e!==this.#f&&await this.#E(e);while(this.#g!=null);this.#b=!1}}async#E(e){let t=this.#f;await this.#B();try{await this.#O(e)}catch(r){if(e===this.#d)throw r;this.onError?.(r),await this.#O(this.#d)}this.#f!==t&&this.onModeChange?.(this.#f,t)}setAudio(e){this.#e.loadAudio(e)}setVolume(e){this.#e?.setVolume(e)}enableAudio(){this.#e?.enableAudio()}disableAudio(){this.#e?.disableAudio()}get audioEnabled(){return this.#e?.audioEnabled??!1}setAudioPanner(e){this.#e?.setAudioPanner(e)}setBackground(e){this.#r&&(this.#r.style.background=e||"#000")}setInitialTransform(e,t=null){this.#x=e??null,this.#i?.setSceneTransform(this.#x),this.#o&&(this.#o.setInitialTransform(this.#x),!this.#m&&this.#S[this.#_]?.resetPositionOnStart!==!1&&this.#o.resetToInitial()),t?.translation&&t.rotation&&t.scale&&this.#M(t)}#M(e){this.#e?.setStaticModelMatrix(D.create().fromTransform(e))}reset(){this.#i?.reset()}setControls(e){this.#i?.setControls(e)}setBounds(e){this.#c.setBounds(e)}setAudioPosition(e){this.#w=e??null,this.#i?.setAudioPosition(this.#w),this.#s&&(this.#s.soundPosition=this.#w)}dispose(){++this.#u,this.#I(),this.#t?.disconnect(),this.#e?.dispose()}async#C(e){if(e==="vr"||e==="ar"){if(!this.#y[e])throw new Error(`${e.toUpperCase()} not supported`);await this.#A(e==="ar")}else if(e==="pw"||e==="hw")this.#P();else throw new Error(`Unknown mode: ${e}`)}#P(){let e=new Yt(this.#r);this.#i=e,this.#e.backend==="pure"&&(this.#e.drawMode=0),e.setSceneTransform(this.#x),e.setAudioPosition(this.#w),this.#v&&e.setBBox(this.#v)}async#A(e){let t=new Zt(this.#e,this.#e.gl);t.soundPosition=this.#w,t.onSessionEnd=()=>{this.#k(),this.#s===t&&(this.#s=null,this.#o=null,this.setMode(this.#d))};let r=null;try{let i=await t.enter(e),n=this.#S[this.#_];r=new Ye(this.#e,null,{directGrab:i.isAVP}),r.locked=n?.locked??!1,r.scaleLocked=n?.scaleLocked??!0,r.setInitialTransform(this.#x),this.#c.reset().queueIntro(),this.#h?.init(this.#e.gl);let o=this.#a;o&&(o.manipulator=r,await o.init(this.#e,t.session,t.binding,t.refSpace,this.#e.gl,e),t.onASWRender=(l,h)=>o.render(l,h),t.onRefReset=()=>o.onRefReset?.()),t.onEyeRender=(l,h,c,p,u,d,f)=>{this.#h?.renderEye(l,h,c,p,u,d,f),o?.renderEye(l,h,c,p,u,d,f)};let a=r;t.onBeforeRender=(l,h,c,p,u,d)=>{if(a.update(l,h,c,u,o?.uiActive??!1,o?.uiDragging??!1),this.#D(l,p,a),o){o.frame(l,h,c,p,u,d);let f=[];for(let m of o.quads??[])m.layer&&(m.visible||m.placing)&&f.push(m.layer);t.externalLayers=f}},t.onFrame=(l,h)=>{if(!this.#G(l))return;let c=a.scale;t.renderFrame(l,h,c!==1?1/c:1),this.#N()}}catch(i){throw this.#R(t),this.#k(),t.exit(),i}if(!t.session)throw this.#R(t),new Error("XR session ended during entry");this.#o=r,this.#s=t}#R(e){e.onFrame=null,e.onSessionEnd=null,e.onBeforeRender=null,e.onEyeRender=null,e.onASWRender=null,e.onRefReset=null}#k(){this.#a?.dispose(),this.#h?.dispose()}#D(e,t,r){let i=this.#h;i&&(this.#m?this.#c.reset():this.#c.setRoomMatrix(r.roomMatrix).update(t.transform.position,e),i.sync(this.#c))}#I(){this.#L(),this.#i?.dispose(),this.#i=null;let e=this.#s;e&&(this.#s=null,this.#o=null,this.#R(e),this.#k(),e.exit())}async#B(){this.#L(),this.#i?.dispose(),this.#i=null;let e=this.#s;if(e){this.#s=null,this.#o=null,e.onFrame=null;try{await e.session?.end()}catch{}}}async#O(e){let t=e!=="pw"?"hybrid":"pure";t!==this.#e.backend&&this.#V(t),await this.#C(e),(this.#p||this.#m)&&this.#F(),this.#f=e,this.#s||(this.#d=e)}#F(){this.#i&&!this.#n&&(this.#n=requestAnimationFrame(this.#z))}#L(){this.#n&&cancelAnimationFrame(this.#n),this.#n=0,this.#l=0}#z=e=>{this.#n=requestAnimationFrame(this.#z);let t=_.deltaSeconds(e,this.#l,1/60);if(this.#l=e,!this.#G(t))return this.#L();let r=this.#i;if(!r)return this.#L();r.update(t);let{width:i,height:n}=this.#r;r.apply(this.#e,i,n),this.#H(r.canPresent),this.#e.present(i,n),this.#N()};#G(e){return this.#Y(),!this.#p&&!this.#m?!1:(this.onBeforeFrame?.(e),!0)}#N(){this.#m&&this.onProgress?.(Math.round(this.#e.progress*100)),this.#W(),this.onFrame?.()}async#X(e){let t=++this.#u,r=()=>t===this.#u;this.#L(),this.#e.close(),this.#v=null,this.#H(!1),this.#m=!0,this.#T=!1;try{await e(r)}catch(i){if(!r())return;this.#m=!1,this.onError?.(i)}r()&&this.#F()}#W(){if(this.#T||!this.#e.ended)return;this.#T=!0;let e=this.#S[this.#_];this.onSceneEnd?.(e,this.#_),(e?.autoSwitchToNext??!0)&&this.#_<this.#S.length-1&&this.loadScene(this.#_+1)}#Y(){if(!this.#v&&this.#e.isReady){let t=this.#e.getBBox();t&&(this.#v=t,this.#i?.setBBox(t))}let e=this.#i;if(e&&!e.canPresent&&this.#v&&e.setBBox(this.#v),!!this.#m){if(!this.#e.isReady){let t=this.#e.lastFetchStatus;t&&t!==200&&t!==206&&(this.#m=!1,this.onError?.(t));return}this.#m=!1,this.#e.play(),this.#o&&(this.#S[this.#_]?.resetPositionOnStart!==!1&&this.#o.resetToInitial(),this.#o.invalidateBBox()),this.onProgress?.(100),this.onReady?.()}}#H(e){this.#r.style.visibility=e?"visible":"hidden"}#V(e){this.#t?.disconnect();let t=rs();this.#r.replaceWith(t),this.#r=t,this.#e?.setBackend(e,{canvas:t}),this.#U()}#U(){this.#t?.disconnect();let e=this.#r;this.#t=new ResizeObserver(([t])=>{if(!t)return;let r=_.clamp(devicePixelRatio||1,1,2),i=Math.round(t.contentRect.width*r),n=Math.round(t.contentRect.height*r);i>0&&n>0&&(e.width!==i||e.height!==n)&&(e.width=i,e.height=n)}),this.#t.observe(e)}};var tr=class s{#e;#r;#t;#i=null;#s=null;#o=null;#n=null;#l=!1;enableMesh=!1;static attach(e,t,r){let i=new s(e,t,r);return i.#c(),i.#a(),i}constructor(e,t,r){this.#e=e,this.#r=t,this.#t=r}get player(){return this.#e}set camera(e){this.#t=e}get camera(){return this.#t}async setAudio(e){await this.#e.loadAudio(e)}setAudioPanner(e){this.#e.setAudioPanner(e)}set entity(e){if(this.#s?.node?.destroy(),this.#s=null,this.#i=e,!e)return;let t=new this.#r.root.constructor("_SplatShadow",this.#r);t.addComponent("render",{type:"box",castShadows:!0,receiveShadows:!1});let r=t.render.meshInstances[0];r.visible=!1,r.cull=!1,e.addChild(t),this.#s=r}get entity(){return this.#i}dispose(){this.#s?.node?.destroy(),this.#n&&(this.#r.renderer.setMeshInstanceMatrices=this.#n[0],this.#r.graphicsDevice.draw=this.#n[1]),this.#e.close(),this.#e.dispose()}#a(){let{renderer:e,graphicsDevice:t}=this.#r,r=e.setMeshInstanceMatrices,i=t.draw;this.#n=[r,i];let n=this;e.setMeshInstanceMatrices=function(...o){return o[0]===n.#s&&(n.#l=!0),r.apply(this,o)},t.draw=function(...o){let a=n.#l;if(n.#l=!1,a){n.enableMesh&&n.#e.isReady&&n.#h();return}return i.apply(this,o)}}#h(){let e=this.#r.graphicsDevice,t=e.gl,r=t.getParameter(t.VIEWPORT),i=e.scope.resolve("matrix_viewProjection").value;i&&(this.#o||(this.#o=new(this.#i.getWorldTransform()).constructor),this.#o.data.set(i),this.#o.mul(this.#i.getWorldTransform()),this.#e.renderMesh(this.#o.data,r[0],r[1],r[2],r[3]),this.#c())}renderFrame(){let e=this.#r.graphicsDevice,t=e.gl,r=e.width,i=e.height;!r||!i||(this.#i&&this.#e.setModelMatrix(this.#i.getWorldTransform().data),this.#t?.camera&&(this.#e.setCamera(this.#t.getWorldTransform().data,this.#t.camera.projectionMatrix.data),this.#e.setAudioListenerMatrix(this.#t.getWorldTransform().data)),this.#i&&this.#e.setAudioSourceMatrix(this.#i.getWorldTransform().data),this.#e.renderHybridViewport(r,i,{gl:t,enableMesh:this.enableMesh}),this.#c())}#c(){let e=this.#r.graphicsDevice;e.shader=null,e.boundVao=null,e.textureUnit=-1;let t=e.textureUnits;if(t)for(let r=0;r<t.length;r++)t[r][0]=t[r][1]=t[r][2]=null}};async function Vr(s,e,t){let r=`${s.replace(/\/+$/,"")}/${e}`,i=await fetch(r,{headers:{"X-VIEW-TOKEN":t}});if(!i.ok)throw new Error(`Streaming metadata fetch failed: ${i.status} ${i.statusText}`);let n=await i.json();return{metadata:n.metadata??null,audioFileLink:n.audioFileLink??null}}async function qe(s,e){let t=e.replace(/\/+$/,"");return Promise.all(s.map(async(r,i)=>{let{metadata:n,audioFileLink:o}=await Vr(t,r.streamingId,r.token);return{id:r.streamingId,label:r.label??n?.name??r.streamingId,url:`${t}/${r.streamingId}/`,token:r.token,displayName:n?.name??void 0,audio:o&&n?.withAudio!==!1?o:void 0,initialTransform:n?.initialSpawn??null,bounds:n?.bounds??null,locked:!1,scaleLocked:!0,autoSwitchToNext:!0,resetPositionOnStart:r.settings?.resetPositionOnStart}}))}import{useEffect as Eo,useMemo as Ur,useReducer as Co,useRef as Wr}from"react";import{useEffect as Mo,useMemo as Po,useState as is}from"react";function ss(s,e){let[t,r]=is(!1),[i,n]=is(!1);Mo(()=>{let a=navigator.xr;if(!a||!s)return;let l=async()=>{let[h,c]=await Promise.all([a.isSessionSupported("immersive-vr").catch(()=>!1),a.isSessionSupported("immersive-ar").catch(()=>!1)]);r(h),n(c)};return l(),a.addEventListener("devicechange",l),()=>a.removeEventListener("devicechange",l)},[s]);let o=e==="vr"||e==="ar";return Po(()=>({vrSupported:t,arSupported:i,isActive:o,setMode:async a=>{await s?.setMode(a)}}),[s,t,i,o])}var os=new WeakMap;function as(s){return os.get(s)}var ls={app:null,overlay:null,isContentReady:!1,isLoading:!1,progress:0,mode:"pw",error:null,isPlaying:!1,isBuffering:!1,currentTime:0,duration:0,controlsType:"orbit",isMuted:!0,volume:1};function Lo(s,e){switch(e.type){case"init":return{...s,app:e.app,overlay:e.overlay};case"frame":{let{isPlaying:t,isBuffering:r,currentTime:i,duration:n,isMuted:o}=e,a=n>0?n:s.duration;return s.isPlaying===t&&s.isBuffering===r&&s.currentTime===i&&s.duration===a&&s.isMuted===o?s:{...s,isPlaying:t,isBuffering:r,currentTime:i,duration:a,isMuted:o}}case"progress":return s.progress===e.value?s:{...s,progress:e.value};case"ready":return{...s,isContentReady:!0,isLoading:!1,progress:100};case"mode":return s.mode===e.mode?s:{...s,mode:e.mode};case"error":return{...s,error:e.error,isLoading:!1};case"open":return{...s,error:null,isLoading:!0,progress:0};case"close":return{...s,isLoading:!1,progress:0};case"reset":return{...ls,mode:s.mode};case"seek":return{...s,currentTime:e.time};case"camera_controls":return s.controlsType===e.controlsType?s:{...s,controlsType:e.controlsType};case"set_volume":return{...s,volume:e.volume}}}var ns=new Set(["vr","ar"]);function rr(s){let{containerRef:e,mode:t="pw",overlay:r,boundaryRenderer:i,moduleUrl:n,moduleFactory:o,onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:p,eventLogger:u}=s,[d,f]=Co(Lo,{...ls,mode:t}),m=Wr(null),g=Wr(d);g.current=d;let M=Wr({onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:p,eventLogger:u});M.current={onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:p,eventLogger:u},Eo(()=>{let T=e.current;if(!T)return;let F=!1;return(async()=>{try{if(!o&&!n)throw new Error("[gr-react] Either moduleUrl or moduleFactory must be provided");let Q=o?await o():await zt(n);if(F)return;let q=r??null;q&&(q.eventLogger={event:(C,le)=>M.current.eventLogger?.event?.(C,{...le,mode:g.current.mode}),error:(C,le)=>M.current.eventLogger?.error?.(C,{...le,mode:g.current.mode})});let V=await Ze.create(Q,{container:T,overlay:q,boundaryRenderer:i,mode:t});if(F){V.dispose();return}m.current=V,V.onProgress=C=>{f({type:"progress",value:C}),M.current.onProgress?.(C)},V.onReady=()=>{f({type:"ready"}),V.audioEnabled&&V.enableAudio(),M.current.onReady?.()},V.onFrame=()=>{let C=m.current?.player;C&&f({type:"frame",isPlaying:C.isPlaying??!1,isBuffering:C.isBuffering??!1,currentTime:C.currentTime??0,duration:C.duration??0,isMuted:!(C.audioEnabled??!1)})},V.onModeChange=(C,le)=>{f({type:"mode",mode:C}),M.current.onModeChange?.(C,le);let ze=ns.has(le),Ve=ns.has(C);ze&&!Ve&&M.current.onXREnd?.(),!ze&&Ve&&M.current.onXRStart?.()},V.onError=C=>{let[le,ze]=typeof C=="number"?[new Error(`Streaming fetch failed: HTTP ${C}`),"load"]:[C,"xr"];f({type:"error",error:le}),M.current.eventLogger?.error?.(le,{phase:ze,mode:g.current.mode})},V.start(),f({type:"init",app:V,overlay:q}),f({type:"camera_controls",controlsType:V.camera?.controlsType??"orbit"})}catch(Q){let q=Q instanceof Error?Q:new Error(String(Q));f({type:"error",error:q}),M.current.eventLogger?.error?.(q,{phase:"init",mode:g.current.mode})}})(),()=>{F=!0;let Q=m.current;Q&&(Q.stop(),Q.dispose()),m.current=null,f({type:"reset"})}},[e,r,i,t,o,n]);let{app:S}=d,b=ss(S,d.mode),y=Ur(()=>({play:()=>S?.player?.play(),pause:()=>S?.player?.pause(),togglePlay:()=>{let T=S?.player;if(!T)return;let F=!T.isPlaying;F?T.play():T.pause(),M.current.eventLogger?.event?.("play_pause",{playing:F,mode:g.current.mode})},seek:T=>{f({type:"seek",time:T}),S?.player?.seek(T),M.current.eventLogger?.event?.("seek",{position:T,mode:g.current.mode})},setSpeed:T=>S?.player?.setSpeed(T),setVolume:T=>{f({type:"set_volume",volume:T}),S?.setVolume(T)},toggleMute:()=>{let T=!S?.audioEnabled;T?S?.enableAudio():S?.disableAudio(),M.current.eventLogger?.event?.("mute_toggle",{muted:!T,mode:g.current.mode})},setAudio:T=>S?.setAudio(T)}),[S]),v=Ur(()=>({controlsType:d.controlsType,zoom:T=>S?.camera?.zoom(T),reset:()=>{S?.camera?.reset(),M.current.eventLogger?.event?.("reset",{mode:g.current.mode})},setControls:T=>{if(!S)return;S.setControls(T);let F=S.camera?.controlsType??T;f({type:"camera_controls",controlsType:F}),M.current.eventLogger?.event?.("camera_controls",{controls:F,requestedControls:T,mode:g.current.mode})}}),[S,d.controlsType]),w=Ur(()=>({open(T){S&&(f({type:"open"}),S.open(T))},close(){S?.close(),f({type:"close"})},dispose(){S&&(S.stop(),S.dispose())}}),[S]),B={app:S,device:S?.device??null,overlay:d.overlay,isInitialized:S!==null,isLoading:d.isLoading,isContentReady:d.isContentReady,progress:d.progress,mode:d.mode,error:d.error,isRebuffering:d.isContentReady&&(d.isLoading||d.isBuffering),...w,playback:{isPlaying:d.isPlaying,isBuffering:d.isBuffering,currentTime:d.currentTime,duration:d.duration,isMuted:d.isMuted,volume:d.volume,...y},camera:v,xr:b};return os.set(B,{dispatch:f}),B}import{useCallback as wt,useEffect as Ro,useRef as Ao,useState as hs}from"react";function ir(s,e={}){let{app:t}=s,r=as(s)?.dispatch,i=Ao(e.onSceneEnd);i.current=e.onSceneEnd;let[n,o]=hs([]),[a,l]=hs(-1);Ro(()=>{if(t)return t.onSceneChange=(m,g)=>{r?.({type:"open"}),r?.({type:"camera_controls",controlsType:t.camera?.controlsType??"orbit"}),l(g)},t.onSceneEnd=(m,g)=>i.current?.(m,g),()=>{t.onSceneChange=null,t.onSceneEnd=null}},[t,r]);let h=wt(m=>{t&&(t.sources=m),o(m),l(-1)},[t]),c=wt(m=>{t?.loadScene(m)},[t]),p=wt(()=>{t&&t.loadScene(t.sceneIndex+1)},[t]),u=wt(()=>{t&&t.loadScene(t.sceneIndex-1)},[t]),d=wt(async(m,g)=>{let M=await qe(m,g);h(M),M.length>0&&c(0)},[h,c]),f=a>=0&&a<n.length?n[a]:null;return{sources:n,index:a,total:n.length,currentSource:f,hasNext:a>=0&&a<n.length-1,hasPrev:a>0,hasAudio:!!f?.audio,setSources:h,loadFromApi:d,next:p,prev:u,goTo:c}}import{jsx as k,jsxs as ko}from"react/jsx-runtime";function cs(){return k("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:k("path",{d:"M5.74023 18.7266V5.17188C5.74023 4.68359 5.86068 4.32552 6.10156 4.09766C6.34245 3.86328 6.62891 3.74609 6.96094 3.74609C7.25391 3.74609 7.55339 3.83073 7.85938 4L19.2363 10.6504C19.64 10.8848 19.9199 11.0964 20.0762 11.2852C20.2389 11.4674 20.3203 11.6888 20.3203 11.9492C20.3203 12.2031 20.2389 12.4245 20.0762 12.6133C19.9199 12.8021 19.64 13.0137 19.2363 13.248L7.85938 19.8984C7.55339 20.0677 7.25391 20.1523 6.96094 20.1523C6.62891 20.1523 6.34245 20.0352 6.10156 19.8008C5.86068 19.5664 5.74023 19.2083 5.74023 18.7266Z"})})}function ps(){return k("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:k("path",{d:"M7.3418 20.0254C6.91211 20.0254 6.58659 19.9147 6.36523 19.6934C6.15039 19.472 6.04297 19.1465 6.04297 18.7168V5.17188C6.04297 4.74219 6.15039 4.41992 6.36523 4.20508C6.58659 3.98372 6.91211 3.87305 7.3418 3.87305H9.56836C9.99154 3.87305 10.3138 3.97721 10.5352 4.18555C10.7565 4.39388 10.8672 4.72266 10.8672 5.17188V18.7168C10.8672 19.1465 10.7565 19.472 10.5352 19.6934C10.3138 19.9147 9.99154 20.0254 9.56836 20.0254H7.3418ZM14.4414 20.0254C14.0117 20.0254 13.6862 19.9147 13.4648 19.6934C13.2435 19.472 13.1328 19.1465 13.1328 18.7168V5.17188C13.1328 4.74219 13.2435 4.41992 13.4648 4.20508C13.6862 3.98372 14.0117 3.87305 14.4414 3.87305H16.6582C17.0879 3.87305 17.4102 3.97721 17.625 4.18555C17.8464 4.39388 17.957 4.72266 17.957 5.17188V18.7168C17.957 19.1465 17.8464 19.472 17.625 19.6934C17.4102 19.9147 17.0879 20.0254 16.6582 20.0254H14.4414Z"})})}function us(){return k("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:k("path",{d:"M8.03125 15.5391C7.5 15.5391 7.10156 15.4036 6.83594 15.1328C6.57031 14.8568 6.4375 14.4375 6.4375 13.875V10.8828C6.4375 10.362 6.55208 9.97135 6.78125 9.71094L15.6875 18.6094C15.625 18.8333 15.5208 18.9974 15.375 19.1016C15.2292 19.2057 15.0547 19.2578 14.8516 19.2578C14.6745 19.2578 14.5052 19.2188 14.3438 19.1406C14.1823 19.0625 14.0104 18.9375 13.8281 18.7656L10.4531 15.6094C10.401 15.5625 10.3359 15.5391 10.2578 15.5391H8.03125ZM15.7422 14.3984L10.3203 8.99219H10.5547C10.6016 8.99219 10.6458 8.97135 10.6875 8.92969L13.8281 6.01562C14.0312 5.82812 14.2057 5.69271 14.3516 5.60938C14.4974 5.52083 14.6615 5.47656 14.8438 5.47656C15.1094 5.47656 15.3255 5.56771 15.4922 5.75C15.6589 5.92708 15.7422 6.14323 15.7422 6.39844V14.3984ZM18.4453 20.0781L5.05469 6.70312C4.9401 6.58854 4.88281 6.44792 4.88281 6.28125C4.88281 6.10938 4.9401 5.96615 5.05469 5.85156C5.17448 5.73177 5.31771 5.67448 5.48438 5.67969C5.65104 5.67969 5.79427 5.73698 5.91406 5.85156L19.2891 19.2266C19.4089 19.3464 19.4688 19.487 19.4688 19.6484C19.4688 19.8151 19.4089 19.9583 19.2891 20.0781C19.1797 20.1979 19.0391 20.2578 18.8672 20.2578C18.7005 20.2578 18.5599 20.1979 18.4453 20.0781Z"})})}function ds(){return k("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:k("path",{d:"M11.7031 19.2578C11.5208 19.2578 11.349 19.2188 11.1875 19.1406C11.026 19.0625 10.8568 18.9375 10.6797 18.7656L7.35156 15.6094C7.29948 15.5625 7.23438 15.5391 7.15625 15.5391H4.91406C4.38802 15.5391 3.98438 15.3958 3.70312 15.1094C3.42188 14.8229 3.28125 14.3958 3.28125 13.8281V10.9219C3.28125 10.3594 3.42188 9.9349 3.70312 9.64844C3.98438 9.35677 4.38802 9.21094 4.91406 9.21094H7.15625C7.23438 9.21094 7.29948 9.1875 7.35156 9.14062L10.6797 6.01562C10.8828 5.82812 11.0547 5.69271 11.1953 5.60938C11.3411 5.52083 11.5052 5.47656 11.6875 5.47656C11.9531 5.47656 12.1693 5.56771 12.3359 5.75C12.5026 5.92708 12.5859 6.14323 12.5859 6.39844V18.3828C12.5859 18.6328 12.5026 18.8411 12.3359 19.0078C12.1745 19.1745 11.9635 19.2578 11.7031 19.2578ZM15.375 15.6875C15.2188 15.5781 15.1302 15.4375 15.1094 15.2656C15.0885 15.0938 15.138 14.9245 15.2578 14.7578C15.4818 14.4401 15.6562 14.0755 15.7812 13.6641C15.9062 13.2474 15.9688 12.8125 15.9688 12.3594C15.9688 11.9062 15.9062 11.4714 15.7812 11.0547C15.6615 10.638 15.487 10.2734 15.2578 9.96094C15.1328 9.79948 15.0807 9.63281 15.1016 9.46094C15.1276 9.28385 15.2188 9.14062 15.375 9.03125C15.5104 8.9375 15.6589 8.90625 15.8203 8.9375C15.9818 8.96875 16.1146 9.0599 16.2188 9.21094C16.5208 9.60677 16.7552 10.0807 16.9219 10.6328C17.0938 11.1849 17.1797 11.7604 17.1797 12.3594C17.1797 12.9583 17.0938 13.5339 16.9219 14.0859C16.7552 14.638 16.5208 15.112 16.2188 15.5078C16.1146 15.6589 15.9818 15.75 15.8203 15.7812C15.6589 15.8073 15.5104 15.776 15.375 15.6875ZM18.2734 17.7266C18.1328 17.6276 18.0521 17.4974 18.0312 17.3359C18.0104 17.1693 18.0547 17.0052 18.1641 16.8438C18.5859 16.2344 18.9141 15.5443 19.1484 14.7734C19.388 13.9974 19.5078 13.1927 19.5078 12.3594C19.5078 11.526 19.3906 10.7214 19.1562 9.94531C18.9219 9.16927 18.5911 8.47917 18.1641 7.875C18.0495 7.71354 18.0026 7.55208 18.0234 7.39062C18.0495 7.22396 18.1328 7.09115 18.2734 6.99219C18.4193 6.89323 18.5729 6.85938 18.7344 6.89062C18.8958 6.92188 19.0286 7.01302 19.1328 7.16406C19.638 7.84115 20.0286 8.63542 20.3047 9.54688C20.5807 10.4583 20.7188 11.3958 20.7188 12.3594C20.7188 13.3229 20.5781 14.2578 20.2969 15.1641C20.0208 16.0703 19.6328 16.8672 19.1328 17.5547C19.0286 17.7057 18.8958 17.7969 18.7344 17.8281C18.5729 17.8542 18.4193 17.8203 18.2734 17.7266Z"})})}function Ae(){return k("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:k("path",{d:"M5.42188 13.1953V6.4375C5.42188 5.625 5.6224 5.01302 6.02344 4.60156C6.42969 4.1901 7.03646 3.98438 7.84375 3.98438H11.4297V9.71875C11.4297 10.7031 11.9219 11.1953 12.9062 11.1953H18.5625V18.2891C18.5625 19.1016 18.3594 19.7109 17.9531 20.1172C17.5521 20.5286 16.9479 20.7344 16.1406 20.7344H9.78125C10 20.3646 10.1667 19.9688 10.2812 19.5469C10.401 19.125 10.4609 18.6901 10.4609 18.2422C10.4609 17.5495 10.3307 16.8984 10.0703 16.2891C9.8099 15.6797 9.44792 15.1432 8.98438 14.6797C8.52083 14.2161 7.98438 13.8542 7.375 13.5938C6.76562 13.3281 6.11458 13.1953 5.42188 13.1953ZM12.9297 10.125C12.6432 10.125 12.5 9.98438 12.5 9.70312V4.07031C12.6615 4.09635 12.8255 4.16667 12.9922 4.28125C13.1589 4.39062 13.3333 4.53906 13.5156 4.72656L17.8203 9.10938C18.0078 9.30208 18.1562 9.47917 18.2656 9.64062C18.375 9.80208 18.4427 9.96354 18.4688 10.125H12.9297ZM5.42188 22.2109C4.88021 22.2109 4.36979 22.1068 3.89062 21.8984C3.41146 21.6953 2.98958 21.4115 2.625 21.0469C2.26042 20.6823 1.97396 20.2604 1.76562 19.7812C1.55729 19.3021 1.45312 18.7891 1.45312 18.2422C1.45312 17.6953 1.55729 17.1849 1.76562 16.7109C1.97396 16.2318 2.26042 15.8099 2.625 15.4453C2.98958 15.0755 3.41146 14.7891 3.89062 14.5859C4.36979 14.3776 4.88021 14.2734 5.42188 14.2734C5.96875 14.2734 6.48177 14.3776 6.96094 14.5859C7.4401 14.7891 7.86198 15.0729 8.22656 15.4375C8.59115 15.8021 8.875 16.224 9.07812 16.7031C9.28646 17.1823 9.39062 17.6953 9.39062 18.2422C9.39062 18.7839 9.28646 19.2943 9.07812 19.7734C8.86979 20.2526 8.58073 20.6745 8.21094 21.0391C7.84635 21.4036 7.42448 21.6901 6.94531 21.8984C6.46615 22.1068 5.95833 22.2109 5.42188 22.2109ZM5.42188 20.7266C5.56771 20.7266 5.68229 20.6823 5.76562 20.5938C5.85417 20.5052 5.89844 20.3906 5.89844 20.25V18.7188H7.42969C7.57031 18.7188 7.6849 18.6745 7.77344 18.5859C7.86198 18.5026 7.90625 18.388 7.90625 18.2422C7.90625 18.0964 7.86198 17.9818 7.77344 17.8984C7.6849 17.8099 7.57031 17.7656 7.42969 17.7656H5.89844V16.2344C5.89844 16.0938 5.85417 15.9792 5.76562 15.8906C5.68229 15.8021 5.56771 15.7578 5.42188 15.7578C5.27604 15.7578 5.15885 15.8021 5.07031 15.8906C4.98698 15.9792 4.94531 16.0938 4.94531 16.2344V17.7656H3.41406C3.27344 17.7656 3.15885 17.8099 3.07031 17.8984C2.98177 17.9818 2.9375 18.0964 2.9375 18.2422C2.9375 18.388 2.98177 18.5026 3.07031 18.5859C3.15885 18.6745 3.27344 18.7188 3.41406 18.7188H4.94531V20.25C4.94531 20.3906 4.98698 20.5052 5.07031 20.5938C5.15885 20.6823 5.27604 20.7266 5.42188 20.7266Z"})})}function fs(){return k("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:k("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.75 6.5A3.75 3.75 0 0 0 2 10.25v3.5a3.75 3.75 0 0 0 3.75 3.75h7.5A3.75 3.75 0 0 0 17 13.75v-.46l2.9 2.16A1.25 1.25 0 0 0 22 14.45v-4.9a1.25 1.25 0 0 0-2.1-1L17 10.71v-.46a3.75 3.75 0 0 0-3.75-3.75h-7.5ZM6 8h7a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 16H6a2.5 2.5 0 0 1-2.5-2.5v-3A2.5 2.5 0 0 1 6 8Zm11 4.6v-1.2l3.5-2.61v6.42L17 12.6Z"})})}function sr(){return k("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:k("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.25 6.75C3.46 6.75 2 8.21 2 10v4c0 1.79 1.46 3.25 3.25 3.25h3.24c.83 0 1.55-.54 1.8-1.33l.52-1.67h2.38l.52 1.67c.25.79.97 1.33 1.8 1.33h3.24c1.79 0 3.25-1.46 3.25-3.25v-4c0-1.79-1.46-3.25-3.25-3.25H5.25Zm.67 3.42c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52H5.92Zm10.2 0c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52h-1.96Z"})})}function nr(){return ko("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[k("path",{d:"M5.5 3.75c-.97 0-1.75.78-1.75 1.75v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5A3.25 3.25 0 0 1 5.5 2.25h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5ZM16.25 3c0-.41.34-.75.75-.75h1.5a3.25 3.25 0 0 1 3.25 3.25v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5c0-.97-.78-1.75-1.75-1.75H17c-.41 0-.75-.34-.75-.75ZM3 15.5c.41 0 .75.34.75.75v2.25c0 .97.78 1.75 1.75 1.75h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5a3.25 3.25 0 0 1-3.25-3.25v-2.25c0-.41.34-.75.75-.75ZM21 15.5c.41 0 .75.34.75.75v2.25a3.25 3.25 0 0 1-3.25 3.25H17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.5c.97 0 1.75-.78 1.75-1.75v-2.25c0-.41.34-.75.75-.75Z"}),k("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z"})]})}function ms(){return k("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:k("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"})})}function gs(){return k("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:k("path",{d:"m480-236 93-93q12-12 29-12t29 12q12 12 12 29t-12 29L508-148q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L329-271q-12-12-12-29t12-29q12-12 29-12t29 12l93 93Zm0-484-93 93q-12 12-29 12t-29-12q-12-12-12-29t12-29l123-123q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l123 123q12 12 12 29t-12 29q-12 12-29 12t-29-12l-93-93Z"})})}function ys({active:s=!1}){return k("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:s?k("path",{d:"M240-240h-80q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h120q17 0 28.5 11.5T320-280v120q0 17-11.5 28.5T280-120q-17 0-28.5-11.5T240-160v-80Zm480 0v80q0 17-11.5 28.5T680-120q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320h120q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240h-80ZM240-720v-80q0-17 11.5-28.5T280-840q17 0 28.5 11.5T320-800v120q0 17-11.5 28.5T280-640H160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h80Zm480 0h80q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H680q-17 0-28.5-11.5T640-680v-120q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v80Z"}):k("path",{d:"M200-200h80q17 0 28.5 11.5T320-160q0 17-11.5 28.5T280-120H160q-17 0-28.5-11.5T120-160v-120q0-17 11.5-28.5T160-320q17 0 28.5 11.5T200-280v80Zm560 0v-80q0-17 11.5-28.5T800-320q17 0 28.5 11.5T840-280v120q0 17-11.5 28.5T800-120H680q-17 0-28.5-11.5T640-160q0-17 11.5-28.5T680-200h80ZM200-760v80q0 17-11.5 28.5T160-640q-17 0-28.5-11.5T120-680v-120q0-17 11.5-28.5T160-840h120q17 0 28.5 11.5T320-800q0 17-11.5 28.5T280-760h-80Zm560 0h-80q-17 0-28.5-11.5T640-800q0-17 11.5-28.5T680-840h120q17 0 28.5 11.5T840-800v120q0 17-11.5 28.5T800-640q-17 0-28.5-11.5T760-680v-80Z"})})}function or(){return k("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:k("path",{d:"m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"})})}function ar(){return k("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:k("path",{d:"M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"})})}var xs=[{type:"orbit",label:"Orbit",hint:`Left-click drag to rotate / Right-click drag to pan
Scroll to zoom in/out`},{type:"trackball",label:"Trackball",hint:`Left-click drag to rotate freely / Right-click drag to pan
Scroll to zoom in/out`},{type:"fly",label:"Fly",hint:`W/S forward & back / A/D strafe / R/F up & down
Q/E roll / Drag to look around`}];var pe={PW:"pw",HW:"hw",VR:"vr",AR:"ar"},$h=[pe.VR,pe.AR];function lr(s){return s===pe.VR||s===pe.AR}var Yr=[".mint",".sog"],bs=Yr.join(","),vs="Open file",hr="local://",ws="static",Io=".sog";function Zr(s){return s.toLowerCase().endsWith(Io)}function ke(s){return typeof s?.url=="string"&&s.url.startsWith(hr)}var _s="stepper";var Fo="@gracia/web-sdk/wasm",Bo="https://market.gracia.ai/api/v1/streaming/content";function Ss(){return typeof __GRACIA_MODULE_URL__=="string"?__GRACIA_MODULE_URL__:Fo}function Ts(){return typeof __GRACIA_STREAMING_BASE_URL__=="string"?__GRACIA_STREAMING_BASE_URL__:Bo}function Oo(){return typeof navigator>"u"?!1:!!navigator.gpu}var zo={xr:"xr-failed",fullscreen:"fullscreen-failed","local-file":"local-file-failed"};function Go(s){let e=s.match(/http\s+(-?\d+)/i);return e?Number(e[1]):null}function No(s,e){let t=e&&zo[e];if(t)return t;let r=s.message.toLowerCase();if(r.includes("webgpu")||r.includes("not supported")||r.includes("getcontext"))return"unsupported-browser";let i=Go(r);return i!==null?i===401||i===403?"access-denied":i===404?"not-found":i>=500?"server-error":"network":r.includes("failed to fetch dynamically imported module")?"load-failed":r.includes("forbidden")||r.includes("unauthorized")?"access-denied":Oo()?"unknown":"unsupported-browser"}var Do=new Set(["unsupported-browser","not-found","access-denied","xr-failed","fullscreen-failed","local-file-failed"]),Xo=new Set(["xr-failed","fullscreen-failed","local-file-failed"]);function Ho(s,e){let t=!Do.has(s);return s==="unsupported-browser"?{presentation:"blocking",recoverable:t}:Xo.has(s)?{presentation:"toast",recoverable:t}:{presentation:e?"toast":"blocking",recoverable:t}}var Vo={"unsupported-browser":{title:"This browser can\u2019t run the player",body:"The player requires WebGPU. Open it in a supported browser and device."},network:{title:"Connection lost",body:"We couldn\u2019t reach the stream. Check your connection and try again."},"not-found":{title:"Scene not found",body:"This content is no longer available."},"access-denied":{title:"Access denied",body:"You don\u2019t have permission to view this content."},"server-error":{title:"Something went wrong",body:"The server had a problem loading this scene. Please try again."},"load-failed":{title:"Couldn\u2019t load the scene",body:"We couldn\u2019t load this scene. Please try again."},"xr-failed":{title:"Couldn\u2019t enter immersive mode",body:"Immersive mode isn\u2019t available right now."},"fullscreen-failed":{title:"Couldn\u2019t enter fullscreen",body:"Fullscreen isn\u2019t available right now."},"local-file-failed":{title:"Couldn\u2019t open the file",body:"We couldn\u2019t open that file. Try a different one."},unknown:{title:"Something went wrong",body:"We couldn\u2019t load this scene. Please try again."}};function Uo(s){return Vo[s]}function Ms(s,e,t){let r=No(s,t);return{kind:r,cause:s,...Ho(r,e),...Uo(r)}}var Ps="data:font/woff2;base64,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";var Es=`@font-face {
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
`;var Cs="gracia-player-default-styles",qr=Es.replace('url("./assets/GolosText-Regular.woff2")',`url("${Ps}")`);function cr(s){if(typeof document>"u")return;let e=typeof ShadowRoot<"u"&&s instanceof ShadowRoot?s:s?.head??document.head;if(e.querySelector(`#${Cs}`))return;let t=document.createElement("style");t.id=Cs,t.textContent=qr,e.appendChild(t)}function K(...s){let e=[];for(let t of s)if(t){if(typeof t=="string"){e.push(t);continue}for(let[r,i]of Object.entries(t))i&&e.push(r)}return e.join(" ")}function ue(s){return s.label??s.displayName??s.id??s.url??"Untitled"}function jr(s){return!Number.isFinite(s)||s<0?"0:00":`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`}function _e(s){return s instanceof Error?s:new Error(String(s))}function Ls(s,e){return{event:(t,r)=>s?.event?.(t,r),error:(t,r)=>{s?.error?.(t,r),e?.(t,r)}}}import{jsx as Rs,jsxs as Zo}from"react/jsx-runtime";var ne=({variant:s="primary",className:e,type:t="button",children:r,...i})=>{let n=Array.isArray(s)?s:[s];return Rs("button",{type:t,className:K("gr-player__button",...n.map(o=>`gr-player__button--${o}`),e),...i,children:r})},Ie=({variant:s="icon",srLabel:e,children:t,...r})=>Zo(ne,{variant:s,...r,children:[t,e&&Rs("span",{className:"gr-player__sr",children:e})]});import{jsx as _t,jsxs as qo}from"react/jsx-runtime";var je=({icon:s,title:e,body:t,detail:r,action:i,className:n,role:o,ariaLive:a})=>_t("div",{className:n,role:o,"aria-live":a,children:qo("div",{className:"gr-player__state-message",children:[_t("div",{className:"gr-player__state-icon",children:s}),_t("h2",{children:e}),_t("p",{children:t}),r&&_t("span",{className:"gr-player__sr",children:r}),i]})});import{jsx as As}from"react/jsx-runtime";var Qr=({message:s})=>As("div",{className:"gr-player__error",role:"alert",children:As("span",{className:"gr-player__error-text",children:s})});import{jsx as ks}from"react/jsx-runtime";var $r=({title:s,body:e,detail:t,action:r})=>ks(je,{icon:ks(ms,{}),title:s,body:e,detail:t,action:r,className:"gr-player__error-screen",role:"alert",ariaLive:"assertive"});import{jsx as Is}from"react/jsx-runtime";var Kr=()=>Is("div",{className:"gr-player__loader",role:"status","aria-live":"polite",children:Is("div",{className:"gr-player__spinner"})});import{forwardRef as al,useImperativeHandle as ll,useRef as bn}from"react";import{createContext as jo,useContext as Qo}from"react";var Fs=jo(null),Jr=Fs.Provider,z=()=>{let s=Qo(Fs);if(!s)throw new Error("usePlayerContext must be used within a PlayerProvider");return s};var $o=`
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`,Ko=`
uniform float uOpacity;
void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, uOpacity); }`,Qe=class{#e;#r;#t;#i;#s;#o=null;#n=null;#l=!1;constructor(e){this.#e=e,this.#r=new e.Scene,this.#t=new e.PerspectiveCamera,this.#t.matrixAutoUpdate=!1,this.#i=new e.Mesh(new e.PlaneGeometry(2,2),new e.ShaderMaterial({uniforms:{uOpacity:{value:0}},vertexShader:$o,fragmentShader:Ko,transparent:!0,depthTest:!1,depthWrite:!1})),this.#i.frustumCulled=!1,this.#i.renderOrder=10,this.#i.visible=!1;let t=new e.BufferGeometry;t.setAttribute("position",new e.BufferAttribute(new Float32Array(0),3)),this.#s=new e.Mesh(t,new e.MeshBasicMaterial({transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,side:e.DoubleSide})),this.#s.frustumCulled=!1,this.#s.renderOrder=11,this.#s.visible=!1,this.#r.add(this.#i,this.#s)}init(e){this.#o=new this.#e.WebGLRenderer({context:e,canvas:e.canvas}),this.#o.autoClear=!1,this.#n=new this.#e.WebGLRenderTarget(1,1),this.#o.setRenderTarget(this.#n),this.#o.setRenderTarget(null)}sync(e){let t=e.outlineOpacity,r=e.darkness;if(this.#i.visible=r>.002,this.#i.material.uniforms.uOpacity.value=r,this.#s.visible=t>.002,this.#s.visible){this.#s.material.opacity=t;let i=e.outlineUrgent?16726832:16747051;this.#s.material.color.setHex(i,this.#e.LinearSRGBColorSpace),this.#a(e.ribbon(.01))}this.#l=this.#i.visible||this.#s.visible}renderEye(e,t,r,i,n,o,a){let l=this.#o;if(!l||!this.#l)return;let h=this.#t;h.projectionMatrix.fromArray(r.projectionMatrix),h.projectionMatrixInverse.copy(h.projectionMatrix).invert(),h.matrix.fromArray(r.transform.matrix),h.matrixWorld.copy(h.matrix),h.matrixWorldInverse.fromArray(r.transform.inverse.matrix),l.resetState(),l.setRenderTargetFramebuffer(this.#n,t),l.setRenderTarget(this.#n),l.setViewport(i,n,o,a),l.render(this.#r,h),l.resetState(),e.bindFramebuffer(e.FRAMEBUFFER,t)}dispose(){this.#i.geometry.dispose(),this.#i.material.dispose(),this.#s.geometry.dispose(),this.#s.material.dispose(),this.#o?.dispose(),this.#o=null,this.#n?.dispose(),this.#n=null,this.#l=!1}#a(e){let t=this.#s.geometry,r=t.getAttribute("position");r.array.length<e.length?(t.dispose(),t.setAttribute("position",new this.#e.BufferAttribute(e.slice(),3))):(r.array.set(e),r.needsUpdate=!0),t.setDrawRange(0,e.length/3)}};import{signal as Se}from"@preact/signals-core";import{Container as Z,Fullscreen as ia,Svg as Ne,Text as dr}from"@react-three/uikit";import{signal as Ge}from"@preact/signals-core";import{forwardHtmlEvents as Jo}from"@pmndrs/pointer-events";import{createRoot as ea}from"@react-three/fiber";var pr=class{#e;#r;#t;#i;#s;#o;#n=null;#l=null;#a;#h;#c=null;#p=null;#m=null;#u=!1;#f=!1;#d=!1;#g=!1;#b;#y;#x;#v;#w;#T;constructor(e,{pixelWidth:t,pixelHeight:r,worldWidth:i,worldHeight:n,cursorFactory:o,react:a=!1}){this.#s=e,this.#o=o,this.#u=a,this.#e=t*2,this.#r=r*2,this.#t=document.createElement("canvas"),this.#t.width=this.#e,this.#t.height=this.#r,this.#i=new e.WebGLRenderer({canvas:this.#t,alpha:!0,antialias:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.#i.setClearColor(0,0),this.#i.setSize(this.#e,this.#r,!1),this.#a=new e.Scene,this.#h=new e.OrthographicCamera(0,t,r,0,.1,10),this.#h.position.z=5,this.#b=new e.Raycaster,this.#y=new e.Vector3,this.#x=new e.Vector3,this.#v=new e.Quaternion,this.#w=new e.Mesh(new e.PlaneGeometry(i,n),new e.MeshBasicMaterial({visible:!1,side:e.DoubleSide}));let l=new e.SphereGeometry(.008,8,8),h=()=>new e.MeshBasicMaterial({color:65280,depthTest:!1});this.#T=[0,1].map(()=>{let c=new e.Mesh(l,h());return c.renderOrder=1001,c.visible=!1,c})}get canvas(){return this.#t}get scene(){return this.#a}get pixelWidth(){return this.#e/2}get pixelHeight(){return this.#r/2}get internalWidth(){return this.#e}get internalHeight(){return this.#r}get pointer(){return this.#n}get cursor(){return this.#l?.mesh??null}get ptrPressed(){return this.#f}get reactPending(){return this.#u}get hitMesh(){return this.#w}get hitSpheres(){return this.#T}async mountReact(e){this.#c=ea(this.#t),await this.#c.configure({frameloop:"never",orthographic:!0,size:{width:this.#e/2,height:this.#r/2},dpr:2,gl:this.#i,events:()=>({enabled:!1,priority:0,handlers:{}})}),this.#p=this.#c.render(e),this.#a=this.#p.getState().scene,this.#m=Jo(this.#t,()=>this.#p.getState().camera,this.#a,{batchEvents:!1}),this.#u=!1}patchCanvasForXR(){let e=this.pixelWidth,t=this.pixelHeight;this.#t.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,right:e,bottom:t,width:e,height:t,toJSON(){}});let r=new Set;this.#t.setPointerCapture=i=>r.add(i),this.#t.releasePointerCapture=i=>r.delete(i),this.#t.hasPointerCapture=i=>r.has(i)}setPointer(e,t,r,i=!1){if(!this.#n){if(!this.#a)return;this.#n={x:e,y:t,pressed:r};let h=this.#o(this.#s);h.position.z=.06,this.#a.add(h),this.#l={mesh:h,sx:e,sy:this.pixelHeight-t}}let n=this.#n;n.x=e,n.y=t,n.pressed=r;let o=this.#l,a=this.pixelHeight-t,l=o.mesh.visible?.6:1;o.sx+=(e-o.sx)*l,o.sy+=(a-o.sy)*l,o.mesh.visible=!0,this.#p?o.mesh.position.set(o.sx-this.pixelWidth/2,o.sy-this.pixelHeight/2,.06):o.mesh.position.set(o.sx,o.sy,.06),o.mesh.material.opacity=r?1:.7,i&&this.#S(e,t,r)}clearPointer(e=!1){e&&this.#n&&(this.#d?this.#g=!0:this.#_()),this.#n=null,this.#l&&(this.#l.mesh.visible=!1)}renderScene(){this.#u||(this.#m?.update(),this.#p?this.#p.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#a,this.#h))}clampAlpha(e){let t=this.#i.getContext();t.colorMask(!1,!1,!1,!0),t.clearColor(0,0,0,e),t.clear(t.COLOR_BUFFER_BIT),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0)}initFlat(){let e=!1,t=r=>{let i=this.#t.getBoundingClientRect();return{x:(r.clientX-i.left)/i.width*this.pixelWidth,y:(r.clientY-i.top)/i.height*this.pixelHeight}};this.#t.addEventListener("pointerdown",r=>{e=!0,this.#t.setPointerCapture(r.pointerId);let i=t(r);this.setPointer(i.x,i.y,!0)}),this.#t.addEventListener("pointermove",r=>{let i=t(r);this.setPointer(i.x,i.y,e)}),this.#t.addEventListener("pointerup",r=>{e=!1;let i=t(r);this.setPointer(i.x,i.y,!1)}),this.#t.addEventListener("pointerleave",()=>{e=!1,this.clearPointer()})}renderFlat(){this.#u||(this.#m?.update(),this.#p?this.#p.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#a,this.#h))}castRay(e,t){let r=e.rayTransform.position,i=e.rayTransform.orientation;return this.#y.set(r.x,r.y,r.z),this.#x.set(0,0,-1).applyQuaternion(this.#v.set(i.x,i.y,i.z,i.w)),this.rayHitQuad(this.#y,this.#x,t)}rayHitQuad(e,t,r=0){let i=this.pixelWidth,n=this.pixelHeight,o=this.#T[r];this.#b.ray.origin.copy(e),this.#b.ray.direction.copy(t);let a=this.#b.intersectObject(this.#w);if(a.length===0)return o.visible=!1,null;let l=a[0].point,h=a[0].uv;if(!h)return o.visible=!1,null;let c=h.x*i,p=(1-h.y)*n;return c<0||c>i||p<0||p>n?(o.visible=!1,null):(o.position.copy(l),o.visible=!0,o.updateMatrixWorld(!0),{x:c,y:p})}gazeHitsQuad(e,t){if(!e?.transform)return!0;let r=e.transform.position,i=e.transform.orientation,n=-2*(i.w*i.y+i.x*i.z),o=-2*(i.y*i.z-i.w*i.x),a=2*(i.x*i.x+i.y*i.y)-1,l=t||this.#w.position,h=l.x-r.x,c=l.y-r.y,p=l.z-r.z,u=Math.sqrt(h*h+c*c+p*p)||1;return(n*h+o*c+a*p)/u>.6}dispose(){this.#m?.destroy(),this.#m=null,this.#c&&(this.#c.unmount(),this.#c=null,this.#p=null),this.#i?.dispose(),this.#i=null}#S(e,t,r){let i=this.#f;this.#f=r;let n={clientX:e,clientY:t,pointerId:1,pointerType:"mouse",isPrimary:!0};this.#d=!0,r&&!i&&this.#t.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1,bubbles:!0})),this.#t.dispatchEvent(new PointerEvent("pointermove",{...n,buttons:r?1:0,bubbles:!0})),!r&&i&&this.#t.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0,bubbles:!0})),this.#d=!1,this.#g&&(this.#g=!1,this.#_())}#_(){let e={pointerId:1,pointerType:"mouse",isPrimary:!0};this.#f&&this.#t.dispatchEvent(new PointerEvent("pointerup",{...e,button:0,buttons:0,bubbles:!0})),this.#t.dispatchEvent(new PointerEvent("pointerleave",{...e,bubbles:!1})),this.#f=!1}};var ta=`attribute vec2 a_pos;
varying vec2 v_uv;
uniform mat4 u_mvp;
void main() {
    v_uv = a_pos + 0.5;
    gl_Position = u_mvp * vec4(a_pos, 0.0, 1.0);
}`,ra=`precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_alpha;
void main() {
    vec4 c = texture2D(u_tex, v_uv);
    gl_FragColor = vec4(c.rgb, c.a * u_alpha);
}`,ur=class{#e=null;#r=null;#t=null;#i=!1;#s=null;#o=null;#n=null;#l=null;#a=null;#h=null;#c=null;#p=null;#m;#u;#f;#d;#g;#b;#y;#x;#v;#w;#T;constructor(e,{worldWidth:t,worldHeight:r,internalWidth:i,internalHeight:n,canvas:o}){this.#v=t,this.#w=r,this.#y=i,this.#x=n,this.#T=o,this.#m=new e.Matrix4,this.#u=new e.Matrix4,this.#f=new e.Matrix4,this.#d=new e.Vector3,this.#g=new e.Quaternion,this.#b=new e.Vector3(t,r,1)}get projected(){return this.#i}get layer(){return this.#r}get pose(){return this.#s??null}async init(e,t,r,i){if(this.#e=i,t)try{return this.#t=t,this.#r=t.createQuadLayer({space:r,viewPixelWidth:this.#y,viewPixelHeight:this.#x,layout:"mono",isStatic:!1,width:this.#v/2,height:this.#w/2}),this.stash(),this.#r}catch{this.#r=null,this.#t=null}return this.#i=!0,this.#S(i),null}stash(){this.#o=null,this.#r&&(this.#r.transform=new XRRigidTransform({x:0,y:-1e3,z:0},{x:0,y:0,z:0,w:1}))}setTransform(e){this.#s=e,this.#o=e}applyPose(e,t,r,i,n,o,a){let l=new XRRigidTransform({x:e,y:t,z:r},{x:i,y:n,z:o,w:a});this.#s=l,this.#o=l}upload(e){this.#r?(this.#o&&(this.#r.transform=this.#o,this.#o=null),this.#_(e,this.#t.getSubImage(this.#r,e)?.colorTexture)):(this.#_(e,this.#h),this.#o=null)}renderEye(e,t,r,i,n,o,a,l){if(!this.#i||!l||!this.#s)return;let h=this.#s.position,c=this.#s.orientation;this.#d.set(h.x,h.y,h.z),this.#g.set(c.x,c.y,c.z,c.w),this.#m.compose(this.#d,this.#g,this.#b),this.#f.fromArray(t.transform.inverse.matrix),this.#u.multiplyMatrices(this.#f,this.#m),this.#f.fromArray(t.projectionMatrix),this.#u.premultiply(this.#f),e.viewport(r,i,n,o),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(this.#n),e.uniformMatrix4fv(this.#c,!1,this.#u.elements),e.uniform1f(this.#p,a),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.#h),e.bindVertexArray(this.#l),e.drawArrays(e.TRIANGLES,0,6),e.bindVertexArray(null),e.disable(e.BLEND),e.useProgram(null)}dispose(){let e=this.#e;e&&this.#i&&(this.#n&&e.deleteProgram(this.#n),this.#l&&e.deleteVertexArray(this.#l),this.#a&&e.deleteBuffer(this.#a),this.#h&&e.deleteTexture(this.#h)),this.#r=this.#t=this.#e=null,this.#n=this.#l=this.#a=this.#h=null}#S(e){let t=e.createShader(e.VERTEX_SHADER);e.shaderSource(t,ta),e.compileShader(t);let r=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(r,ra),e.compileShader(r),this.#n=e.createProgram(),e.attachShader(this.#n,t),e.attachShader(this.#n,r),e.linkProgram(this.#n),e.deleteShader(t),e.deleteShader(r),this.#c=e.getUniformLocation(this.#n,"u_mvp"),this.#p=e.getUniformLocation(this.#n,"u_alpha"),e.useProgram(this.#n),e.uniform1i(e.getUniformLocation(this.#n,"u_tex"),0),e.uniform1f(this.#p,1);let i=e.getAttribLocation(this.#n,"a_pos");this.#l=e.createVertexArray(),e.bindVertexArray(this.#l),this.#a=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.#a),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-.5,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5]),e.STATIC_DRAW),e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),this.#h=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.#h),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.#y,this.#x,0,e.RGBA,e.UNSIGNED_BYTE,null),e.generateMipmap(e.TEXTURE_2D)}#_(e,t){if(!t)return;let r=this.#e,i=!this.#i;r.bindTexture(r.TEXTURE_2D,t),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,this.#i?r.LINEAR_MIPMAP_LINEAR:r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!0),i&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,this.#T),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),i&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this.#i&&r.generateMipmap(r.TEXTURE_2D)}};function ti(s,e,t){let r=Math.sqrt(s*s+e*e+t*t)||1,i=Math.atan2(s/r,t/r)+Math.PI,n=Math.asin(e/r),o=i/2,a=n/2,l=Math.cos(o),h=Math.sin(o),c=Math.cos(a),p=Math.sin(a);return{qx:l*p,qy:h*c,qz:-h*p,qw:l*c}}var ei=class{#e;#r;#t;#i;#s;#o;#n;constructor(e,t,r){let{qx:i,qy:n,qz:o,qw:a}=ti(0,r,-t);this.#e=new e.Vector3(0,r,-t),this.#r=new e.Quaternion(i,n,o,a),this.#t=this.#e.clone(),this.#i=this.#r.clone(),this.#s=new e.Vector3,this.#o=new e.Quaternion,this.#n=new e.Vector3(0,1,0)}reset(){this.#t.copy(this.#e),this.#i.copy(this.#r)}remember(e,{position:t,orientation:r}){let i=this.#l(e).invert();this.#t.set(t.x,t.y,t.z).sub(this.#s).applyQuaternion(i),this.#i.set(r.x,r.y,r.z,r.w).premultiply(i)}place(e){let t=this.#l(e),r=this.#t.clone().applyQuaternion(t).add(this.#s),i=this.#i.clone().premultiply(t);return{x:r.x,y:r.y,z:r.z,qx:i.x,qy:i.y,qz:i.z,qw:i.w}}#l(e){let t=e.transform.position,r=e.transform.orientation,i=Math.atan2(2*(r.x*r.z+r.w*r.y),1-2*(r.x*r.x+r.y*r.y));return this.#s.set(t.x,t.y,t.z),this.#o.setFromAxisAngle(this.#n,i)}},$e=class{#e;#r;#t=!1;#i=!1;#s;#o=null;#n=null;#l=!1;#a=null;#h=!1;#c=!1;#p=!1;alpha=1;onDragTick=null;onDragEnd=null;constructor(e,t){this.#s=new ei(e,t.quadZ??.5,t.quadY??-.5),this.#e=new pr(e,t),this.#r=new ur(e,{worldWidth:t.worldWidth,worldHeight:t.worldHeight,internalWidth:this.#e.internalWidth,internalHeight:this.#e.internalHeight,canvas:this.#e.canvas})}get canvas(){return this.#e.canvas}get scene(){return this.#e.scene}get pixelWidth(){return this.#e.pixelWidth}get pixelHeight(){return this.#e.pixelHeight}get hitMesh(){return this.#e.hitMesh}get hitSpheres(){return this.#e.hitSpheres}get pointer(){return this.#e.pointer}get cursor(){return this.#e.cursor}async mountReact(e){return this.#e.mountReact(e)}rayHitQuad(e,t,r){return this.#e.rayHitQuad(e,t,r)}gazeHitsQuad(e,t){return this.#e.gazeHitsQuad(e,t)}get projected(){return this.#r.projected}get layer(){return this.#r.layer}get pose(){return this.#r.pose}get visible(){return this.#t}get placing(){return this.#i}get session(){return this.#o}get interacting(){return this.#t&&(this.#c||this.#l||this.#p||!!this.#n)}get dragging(){return this.#l}set dragging(e){this.#l=e}get panelDragging(){return this.#p}set panelDragging(e){this.#p=e,e||this.onDragEnd?.()}setPointer(e,t,r){this.#e.setPointer(e,t,r,!!this.#o)}clearPointer(){this.#e.clearPointer(!!this.#o)}initFlat(){this.#t=!0,this.#e.initFlat()}renderFlat(){this.#t&&this.#e.renderFlat()}async init(e,t,r,i){return this.#o=e,this.#e.patchCanvasForXR(),this.#r.init(e,t,r,i)}show(){this.#i=!0}recenter(){this.#s.reset(),this.#t&&this.show()}hide(){this.#e.clearPointer(!!this.#o),this.#l=!1,this.#a=null,this.#n=null,this.#p=!1,this.onDragEnd?.(),this.#t=this.#i=!1;for(let e of this.#e.hitSpheres)e.visible=!1;this.#r.stash()}setTransform(e){this.#r.setTransform(e)}stash(){this.#r.stash()}applyPose(e,t,r,i,n,o,a){this.#r.applyPose(e,t,r,i,n,o,a);let l=this.#e.hitMesh;l.position.set(e,t,r),l.quaternion.set(i,n,o,a),l.updateMatrixWorld(!0)}updatePosition(e){if(!this.#i||!e)return;this.#i=!1,this.#t=!0;let{x:t,y:r,z:i,qx:n,qy:o,qz:a,qw:l}=this.#s.place(e);this.applyPose(t,r,i,n,o,a,l)}drawContent(e){!this.#t||this.#e.reactPending||(this.#e.renderScene(),this.alpha<1&&!this.#r.projected&&this.#e.clampAlpha(this.alpha),this.#r.upload(e))}renderEye(e,t,r,i,n,o){this.#r.renderEye(e,t,r,i,n,o,this.alpha,this.#t)}handleInput(e,t,r){if(!this.#o)return!1;let i=!1,n=!1,o=null,a=null;for(let h of this.#e.hitSpheres)h.visible=!1;for(let[h,c]of[["left",e],["right",t]]){if(c?.menuPressed&&(i=!0),!c?.active||!this.#t||!c.rayTransform||c.held)continue;let p=h==="left"?0:1,u=this.#e.castRay(c,p);if(u){let d={hand:c,hit:u,side:h,trigger:!!c.triggerPressed};h==="left"?o=d:a=d}}let l=!!(o||a);if(this.#p){if(this.#r.pose&&r?.transform&&this.onDragTick){let h=this.onDragTick(e,t,r,this.#a,this.#r.pose);h?(this.applyPose(h.x,h.y,h.z,h.qx,h.qy,h.qz,h.qw),this.#s.remember(r,this.#r.pose)):(this.#p=!1,this.onDragEnd?.())}}else{let h=null;if(this.#n){let c=this.#n==="left"?o:a,p=this.#n==="left"?e:t,u=!!p?.triggerPressed;h=c||(u?{hand:p,hit:null,side:this.#n,trigger:u}:null),u||(this.#n=null)}if(!h){let c=this.#a;h=c==="left"?o||a:c==="right"?a||o:o||a}if(h){this.#a=h.side??this.#a;let c=this.#a==="left"?1:0;if(this.#e.hitSpheres[c].visible=!1,h.hit){let p=this.#e.ptrPressed;this.setPointer(h.hit.x,h.hit.y,h.trigger),h.trigger&&!p&&!this.#n&&(this.#n=this.#a)}else this.#e.pointer?this.setPointer(this.#e.pointer.x,this.#e.pointer.y,h.trigger):this.clearPointer();h.hand?.isTransientPointer&&(n=!0)}else this.clearPointer(),this.#a=null;this.#c=!!(o||a)}return i&&!this.#h&&(this.#t||this.#i?l||this.hide():this.show()),this.#h=i,n}dispose(){this.#t=!1,this.#o=null,this.#e.dispose(),this.#r.dispose()}};var Ke=class{_quad;_sig=null;onPlayPause=null;onSeek=null;onPresetCycle=null;onExit=null;onClose=null;onSceneNav=null;constructor(e,t){this._quad=new $e(e,{...t,react:!0})}get quad(){return this._quad}_createBaseSignals(){return{loadingD:Ge("none"),contentD:Ge("flex"),playD:Ge("flex"),pauseD:Ge("none"),spinD:Ge("none"),spinR:Ge(0),spinFast:Ge(!1)}}_updatePlayback(e,{loading:t,playing:r,spinning:i,buffering:n,progress:o}){e.loadingD.value=t?"flex":"none",e.contentD.value=t?"none":"flex",e.playD.value=!i&&!r?"flex":"none",e.pauseD.value=!i&&r?"flex":"none",e.spinD.value=i?"flex":"none",e.spinFast.value=i&&!n,this._quad.dragging||this._setProgress(o)}render(e){let t=this._sig;if(!this._quad.visible||!t)return;let r=t.loadingD.value==="flex",i=r?20:t.spinFast.value?14:6;(t.spinD.value==="flex"||r)&&(t.spinR.value-=e*i)}_seekFromEvent(e){this._seekTo(e.point.x+this._quad.pixelWidth/2)}_seekTo(e){}_setProgress(e){}};import{jsx as O,jsxs as mr}from"react/jsx-runtime";var rt=s=>`data:image/svg+xml,${encodeURIComponent(s)}`,sa=rt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#aaaaaa"/></svg>'),na=rt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#aaaaaa"/></svg>'),oa=rt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#666666"/></svg>'),Bs=rt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1 1 2 12L5 12A7 7 0 1 0 12 5Z" fill="#888888"/></svg>'),aa=rt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z" fill="#888888"/></svg>'),la=rt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.6 16.6L10 18l6-6-6-6-1.4 1.4L13.2 12z" fill="#888888"/></svg>'),et=30,Fe=520,Ns=72,fr=Ns+et,Te=et+Ns/2,Os=14,St=40,Tt=26,Je=6,zs=26,gr=14,ri=gr/2,yr=20,ii=yr/2,Mt=50,Gs=32,si={borderOpacity:.65},tt=class extends Ke{#e=0;#r=0;constructor(e){let r=.86*(fr/Fe);super(e,{pixelWidth:Fe,pixelHeight:fr,worldWidth:.86,worldHeight:r,quadY:-.3,cursorFactory:i=>{let n=new i.Mesh(new i.CircleGeometry(4,32),new i.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#t().catch(i=>{})}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:o="0:00 / 0:00",presetName:a=null,sceneText:l=null,sceneLabel:h=null}){let c=this._sig;if(c&&(this._updatePlayback(c,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),c.timeT.value=o,c.presetT&&a!=null&&(c.presetT.value=a),l!=null&&(c.sceneT.value=l),h!=null)){let p=String(h);c.sceneSub.value=p.length>Gs?`${p.slice(0,Gs-2)}...`:p}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-this.#e)/this.#r));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=this.#r*e;t.fillW.value=Math.max(.001,r),t.thumbL.value=this.#e+r-ri,t.thumbGlowL.value=this.#e+r-ii}async#t(){let e=this._quad,t=Os,r=Te-St/2,i=Fe-Os-Tt,n=Te-Tt/2,o=i-10,a=66,l=24,h=o-a,c=Te-l/2;o=h-8;let p=78,u=o-p,d=Te-9,f=this.#e=t+St+12,m=this.#r=u-10-f,g=this._sig={...this._createBaseSignals(),fillW:Se(.001),thumbL:Se(f-ri),thumbGlowL:Se(f-ii),thumbS:Se(1),thumbGlowOp:Se(0),timeT:Se("0:00 / 0:00"),sceneT:Se("1/1"),sceneSub:Se("SCENE"),presetT:Se("Off")},M=()=>{g.thumbGlowOp.value=.5,g.thumbS.value=1.15},S=()=>{e.dragging||(g.thumbGlowOp.value=0,g.thumbS.value=1)},b=T=>{T.target.setPointerCapture(T.pointerId),e.dragging=!0,this._seekFromEvent(T)},y=T=>{e.dragging&&this._seekFromEvent(T)},v=()=>{e.dragging=!1,g.thumbGlowOp.value=0,g.thumbS.value=1},w={backgroundColor:1710618},B=mr(ia,{backgroundColor:657930,backgroundOpacity:.88,children:[mr(Z,{positionType:"absolute",positionLeft:0,positionTop:0,width:Fe,height:fr,display:g.contentD,borderWidth:1,borderColor:3355443,borderOpacity:.3,children:[O(Z,{positionType:"absolute",positionLeft:0,positionTop:0,width:Mt,height:et,hover:w,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(-1),children:O(Ne,{src:aa,width:18,height:18,pointerEvents:"none"})}),mr(Z,{positionType:"absolute",positionLeft:Mt,positionTop:0,width:Fe-Mt*2,height:et,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,overflow:"hidden",children:[O(dr,{fontSize:13,color:11184810,children:g.sceneT}),O(dr,{fontSize:10,color:6710886,children:g.sceneSub})]}),O(Z,{positionType:"absolute",positionLeft:Fe-Mt,positionTop:0,width:Mt,height:et,hover:w,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(1),children:O(Ne,{src:la,width:18,height:18,pointerEvents:"none"})}),O(Z,{positionType:"absolute",positionLeft:0,positionTop:et,width:Fe,height:.5,backgroundColor:3355443,backgroundOpacity:.5,pointerEvents:"none"}),mr(Z,{positionType:"absolute",positionLeft:t,positionTop:r,width:St,height:St,borderRadius:St/2,borderWidth:1,borderColor:4473924,borderOpacity:.5,hover:si,alignItems:"center",justifyContent:"center",onClick:()=>this.onPlayPause?.(),children:[O(Ne,{display:g.playD,src:sa,width:20,height:20,marginLeft:2,pointerEvents:"none"}),O(Ne,{display:g.pauseD,src:na,width:18,height:18,pointerEvents:"none"}),O(Ne,{display:g.spinD,src:Bs,width:24,height:24,transformRotateZ:g.spinR,pointerEvents:"none"})]}),O(Z,{positionType:"absolute",positionLeft:f,positionTop:Te-zs/2,width:m,height:zs,onPointerEnter:M,onPointerLeave:S,onPointerDown:b,onPointerMove:y,onPointerUp:v}),O(Z,{positionType:"absolute",positionLeft:f,positionTop:Te-Je/2,width:m,height:Je,borderRadius:Je/2,backgroundColor:2236962,backgroundOpacity:.8,pointerEvents:"none"}),O(Z,{positionType:"absolute",positionLeft:f,positionTop:Te-Je/2,width:g.fillW,height:Je,borderRadius:Je/2,backgroundColor:7829367,zIndexOffset:1,pointerEvents:"none"}),O(Z,{positionType:"absolute",positionLeft:g.thumbGlowL,positionTop:Te-yr/2,width:yr,height:yr,borderRadius:ii,borderWidth:2,borderColor:10066329,borderOpacity:g.thumbGlowOp,zIndexOffset:2,pointerEvents:"none"}),O(Z,{positionType:"absolute",positionLeft:g.thumbL,positionTop:Te-gr/2,width:gr,height:gr,borderRadius:ri,backgroundColor:11184810,transformScaleX:g.thumbS,transformScaleY:g.thumbS,zIndexOffset:3,pointerEvents:"none"}),O(Z,{positionType:"absolute",positionLeft:u,positionTop:d,width:p,height:18,alignItems:"center",justifyContent:"center",children:O(dr,{fontSize:13,color:16777215,opacity:.35,children:g.timeT})}),O(Z,{positionType:"absolute",positionLeft:i,positionTop:n,width:Tt,height:Tt,borderRadius:Tt/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:si,alignItems:"center",justifyContent:"center",onClick:()=>this.onExit?.(),children:O(Ne,{src:oa,width:11,height:11,pointerEvents:"none"})}),O(Z,{positionType:"absolute",positionLeft:h,positionTop:c,width:a,height:l,borderRadius:l/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:si,alignItems:"center",justifyContent:"center",onClick:()=>this.onPresetCycle?.(),children:O(dr,{fontSize:11,color:10066329,pointerEvents:"none",children:g.presetT})})]}),O(Z,{positionType:"absolute",positionLeft:0,positionTop:0,width:Fe,height:fr,backgroundColor:657930,backgroundOpacity:1,display:g.loadingD,alignItems:"center",justifyContent:"center",children:O(Ne,{src:Bs,width:40,height:40,transformRotateZ:g.spinR,pointerEvents:"none"})})]});await e.mountReact(B)}};var it=class{#e;#r;#t=null;#i=null;#s;#o;#n;#l;constructor(e,t){this.#e=e,this.#r=t;let r=t.scene,i=new e.BufferGeometry().setFromPoints([new e.Vector3(0,0,0),new e.Vector3(0,0,-5)]),n=new e.SphereGeometry(.015,6,6);this.#s=new e.MeshBasicMaterial({color:16711680,depthTest:!1}),this.#o=new e.MeshBasicMaterial({color:65280,depthTest:!1});let o=()=>{let a=new e.Group,l=new e.Group,h=new e.Line(i,new e.LineBasicMaterial({color:5227511,transparent:!0,opacity:.5,depthTest:!1}));h.visible=!1,a.add(h);let c=new e.Mesh(n,this.#s),p=new e.Mesh(n,this.#s);return c.renderOrder=p.renderOrder=999,c.visible=p.visible=!1,r.add(a,l,c,p),{ray:a,grip:l,line:h,idxSphere:c,thmSphere:p}};this.#n=o(),this.#l=o()}update(e,t){this.#a(),this.#h(this.#n,e),this.#h(this.#l,t)}dispose(){this.#t&&(this.#r.anchor.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose());for(let e of[this.#n,this.#l])e.line.material.dispose(),e.idxSphere.geometry.dispose(),e.thmSphere.geometry.dispose();this.#s.dispose(),this.#o.dispose()}#a(){let e=this.#r.bboxMesh;if(e===this.#i)return;this.#i=e;let t=this.#r.anchor;if(this.#t&&(t.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose(),this.#t=null),!e)return;let r=this.#e;this.#t=new r.LineSegments(new r.EdgesGeometry(e.geometry),new r.LineBasicMaterial({color:58879,transparent:!0,opacity:.35,depthTest:!1})),this.#t.position.copy(e.position),t.add(this.#t)}#h(e,t){if(t.rayTransform&&this.#c(e.ray,t.rayTransform),t.gripTransform&&this.#c(e.grip,t.gripTransform),e.line.visible=t.active,e.idxSphere.visible=e.thmSphere.visible=!1,!t.active)return;t.indexTip&&(e.idxSphere.position.set(t.indexTip.x,t.indexTip.y,t.indexTip.z),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0)),t.thumbTip&&(e.thmSphere.position.set(t.thumbTip.x,t.thumbTip.y,t.thumbTip.z),e.thmSphere.visible=!0,e.thmSphere.updateMatrixWorld(!0)),t.indexTip||(e.idxSphere.position.copy(e.grip.position),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0));let r=t.gripping?this.#o:this.#s;e.idxSphere.material=r,t.thumbTip&&(e.thmSphere.material=r)}#c(e,t){let r=t.position,i=t.orientation;e.position.set(r.x,r.y,r.z),e.quaternion.set(i.x,i.y,i.z,i.w),e.updateMatrixWorld(!0)}};import{signal as L}from"@preact/signals-core";import{Container as R,Fullscreen as ha,Image as ca,Svg as X,Text as j}from"@react-three/uikit";import{jsx as x,jsxs as ae}from"react/jsx-runtime";var I=9684710,oe=1122603,pa=661021,ua=2636615,da=4086636,G=680,Xe=248,de=34,Le=48,Ee=de+Le,Zs=Le,Pt=26,De=Xe+Zs,Ds=32,W=88,Ce=60,Be=Xe-Ce,Me=(G-W)/7,xe=Math.round(G/3),qs=12,N=34,J=W+qs,nt=G-W-qs*2,Pe=Ee+50,oi=nt-N,Oe=24,xr=18,js=J+Oe,Qs=oi-Oe*2,Xs={phase:"off",start:0,end:1,gap:0},Et=(s,e)=>e?js+Qs*s:J+oi*s,ni=(s,e)=>_.clamp01((s-(e?js:J))/(e?Qs:oi)),Hs=s=>Et(s,!0)-Oe,Vs=s=>Et(s,!0)+N,U=(s,e="#93c6e6")=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${s}" fill="${e}"/></svg>`),fa="data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${nt*2}" height="${N*2}" viewBox="0 0 ${nt} ${N}"><defs><pattern id="h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1.5" height="6" fill="#93c6e6" fill-opacity="0.2"/></pattern></defs><rect width="100%" height="100%" fill="#0a161d"/><rect width="100%" height="100%" fill="url(#h)"/></svg>`),Us="M8.76 21.6 7.221 20.1177 8.949 18.4235H8.76c-2.106 0-3.8925-.7191-5.3595-2.1573C1.9335 14.8279 1.2 13.0765 1.2 11.0118s.7335-3.81621 2.2005-5.25444C4.8675 4.31912 6.654 3.60001 8.76 3.60001h6.48c2.106 0 3.8925.71911 5.3595 2.15735C22.0665 7.19559 22.8 8.94707 22.8 11.0118s-.7335 3.8161-2.2005 5.2544c-1.467 1.4382-3.2535 2.1573-5.3595 2.1573v-2.1176c1.494 0 2.7675-.5162 3.8205-1.5485 1.053-1.0324 1.5795-2.2809 1.5795-3.7456s-.5265-2.71326-1.5795-3.74562c-1.053-1.03235-2.3265-1.54853-3.8205-1.54853H8.76c-1.494 0-2.7675.51618-3.8205 1.54853C3.8865 8.29854 3.36 9.54707 3.36 11.0118s.5265 2.722 1.5795 3.772c1.053 1.05 2.3265 1.628 3.8205 1.7339h.432l-1.944-1.9059 1.512-1.4824 4.32 4.2353L8.76 21.6Z",H={play:U("M8 5v14l11-7z"),pause:U("M6 4h4v16H6zm8 0h4v16h-4z"),spin:U("M12 2a10 10 0 1 1-10 10h3a7 7 0 1 0 7-7z"),bulb:U("M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"),mute:U("M7 9v6h4l5 5V4l-5 5H7z"),vol:U("M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"),loop:U(Us),loopOn:U(Us,"#11212b"),reset:U("M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"),exit:U("M17 7l-1.4 1.4L18.2 11H8v2h10.2l-2.6 2.6L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"),grip:U("M15.5 15.4V8.6L18.9 12l-3.4 3.4zM8.5 8.6v6.8L5.1 12l3.4-3.4z"),close:U("M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"),scale:U("M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z"),lock:U("M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"),unlk:U("M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"),arrL:U("M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"),arrR:U("M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z")},st={backgroundColor:1849416},Ws=.9,ma=-.55,Ys=.866,ot=class extends Ke{#e;#r=null;#t=Xs;#i=null;#s=null;#o;#n;onMuteToggle=null;onScaleLockToggle=null;onLockToggle=null;onReset=null;onAbLoopToggle=null;onAbLoopSet=null;constructor(e){super(e,{pixelWidth:G,pixelHeight:De,worldWidth:1,worldHeight:De/G,quadZ:Ws,quadY:ma,cursorFactory:t=>{let r=new t.Mesh(new t.CircleGeometry(5,32),new t.MeshBasicMaterial({color:I,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return r.renderOrder=999,r}}),this.#e=e,this.#o=new e.Vector3,this.#n=new e.Quaternion,this._quad.alpha=.9,this._quad.onDragTick=(t,r,i,n,o)=>this.#l(t,r,i,n,o),this._quad.onDragEnd=()=>{this.#r=null,this._quad.alpha=.9},this.#p().catch(t=>{})}#l(e,t,r,i,n){let o=this.#e,a=this.#r,l=a?.side??i??"right",h=l==="left"?e:t;if(!h?.triggerPressed)return this.#r=null,null;let c=h.rayTransform?.orientation;if(!c){let v=n.position,w=n.orientation;return{x:v.x,y:v.y,z:v.z,qx:w.x,qy:w.y,qz:w.z,qw:w.w}}let p=this.#o.set(0,0,-1).applyQuaternion(this.#n.set(c.x,c.y,c.z,c.w));if(!a){let v=r.transform.position,w=new o.Vector3(v.x,v.y,v.z),B=n.position,T=new o.Vector3(B.x,B.y,B.z).sub(w);this.#r={side:l,R:T.length()||Ws,oQ:new o.Quaternion().setFromUnitVectors(p.clone(),T.normalize()),eye:w};let F=n.orientation;return{x:B.x,y:B.y,z:B.z,qx:F.x,qy:F.y,qz:F.z,qw:F.w}}if(p.applyQuaternion(a.oQ),Math.abs(p.y)>Ys){p.y=Math.sign(p.y)*Ys;let v=Math.sqrt(p.x*p.x+p.z*p.z)||1e-6,w=Math.sqrt(1-p.y*p.y)/v;p.x*=w,p.z*=w}let u=a.eye,d=a.R,f=u.x+p.x*d,m=u.y+p.y*d,g=u.z+p.z*d,{qx:M,qy:S,qz:b,qw:y}=ti(p.x,p.y,p.z);return{x:f,y:m,z:g,qx:M,qy:S,qz:b,qw:y}}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:o="0:00 / 0:00",presetName:a=null,muted:l=!1,locked:h=!1,scaleLocked:c=!0,abLoop:p=Xs,sceneText:u=null,sceneLabel:d=null,bannerText:f=null}){let m=this._sig;if(!m)return;p.phase!=="active"&&(this.#s=null),p.phase!=="setB"&&(this.#i=null);let g=this.#s;if(this.#t=g?{...p,start:g.start,end:g.end}:p,this._updatePlayback(m,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),this.#h(m),m.playTextD.value=r?"none":"flex",m.playLbl.value=t?"PAUSE":"PLAY",m.timeT.value=o,a!=null&&(m.presetT.value=a),m.icA.value=l?"none":"flex",m.icB.value=l?"flex":"none",m.muteLbl.value=l?"UNMUTE":"MUTE",m.sclLkLbl.value=c?"UNLOCK SCALE":"LOCK SCALE",m.lockA.value=h?"none":"flex",m.lockB.value=h?"flex":"none",m.lockLbl.value=h?"UNLOCK SCENE":"LOCK SCENE",u!=null&&(m.sceneT.value=u),d!=null){let M=String(d);m.sceneSub.value=M.length>Ds?`${M.slice(0,Ds-2)}...`:M}f!=null&&(m.bannerT.value=f)}#a(){let{phase:e,start:t,end:r,gap:i}=this.#t,n=this.#i==null?null:_.clamp(this.#i,t+i,1);return{a:e==="off"?null:t,b:e==="active"?r:n}}#h(e){let{phase:t,start:r}=this.#t,i=t!=="off",{b:n}=this.#a(),o=Hs(r),a=Vs(n??1);e.abOnD.value=i?"flex":"none",e.abOffD.value=i?"none":"flex",e.abTxtC.value=i?oe:I,e.abLbl.value=t==="setB"?"A/B LOOP (2/2)":"A/B LOOP",e.abAL.value=o,e.abBL.value=a,e.abBD.value=n==null?"none":"flex",e.abMarkerPE.value=t==="active"?"auto":"none",e.abPreW.value=o-J,e.abHoverD.value=this.#i==null?"none":"flex",e.abHoverL.value=o+Oe,e.abHoverW.value=Math.max(0,a-o-Oe)}#c(e){let{a:t,b:r}=this.#a(),i=e+(N-xr)/2,n=o=>i<o+Oe&&o<i+xr;return t!=null&&n(Hs(t))||r!=null&&n(Vs(r))}_seekTo(e){let{phase:t,start:r,end:i}=this.#t,n=_.clamp(ni(e-N/2,t!=="off"),r,i);this._setProgress(n),this.onSeek?.(n)}_setProgress(e){let t=this._sig;if(!t)return;let{phase:r,start:i,end:n}=this.#t,o=r!=="off",a=Et(_.clamp(e,i,n),o),l=Et(i,o);t.thumbL.value=a,t.fillL.value=l,t.fillW.value=Math.max(0,a+N-l),t.thumbIconD.value=this.#c(a)?"none":"flex"}async#p(){let e=this._sig={...this._createBaseSignals(),playTextD:L("flex"),playLbl:L("PAUSE"),fillL:L(J),fillW:L(N),thumbL:L(J),thumbS:L(1),thumbIconD:L("flex"),timeT:L("0:00 / 0:00"),sceneT:L("1/5"),sceneSub:L("SCENE"),icA:L("flex"),icB:L("none"),muteLbl:L("MUTE"),sclLkLbl:L("LOCK SCALE"),lockA:L("flex"),lockB:L("none"),lockLbl:L("LOCK SCENE"),abLbl:L("A/B LOOP"),abOnD:L("none"),abOffD:L("flex"),abTxtC:L(I),abAL:L(J),abBD:L("none"),abBL:L(J),abMarkerPE:L("none"),abPreW:L(0),abHoverD:L("none"),abHoverL:L(J),abHoverW:L(0),presetT:L("OFF"),bannerT:L("")},t=({x:b,y,w:v,h:w})=>x(R,{positionType:"absolute",positionLeft:b,positionTop:y,width:v,height:w,backgroundColor:I,backgroundOpacity:.3}),r=({idx:b,onClick:y,active:v=null,children:w})=>{let B=W+b*Me;return ae(R,{positionType:"absolute",positionLeft:B,positionTop:Be,width:Me,height:Ce,backgroundColor:oe,hover:st,onClick:y,children:[v&&x(R,{positionType:"absolute",positionLeft:0,positionTop:0,width:Me,height:Ce,backgroundColor:I,display:v,pointerEvents:"none"}),x(R,{width:"100%",height:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",children:w})]})},i=this._quad,n=b=>b.point.x+i.pixelWidth/2,o=b=>ni(n(b)-Oe/2-N,!0),a=()=>{e.thumbS.value=1.08},l=()=>{this.#i=null,i.dragging||(e.thumbS.value=1)},h=b=>{if(this.#t.phase==="setB"){this.#i=null,this.onAbLoopSet?.(this.#t.start,o(b));return}b.target.setPointerCapture(b.pointerId),i.dragging=!0,this._seekFromEvent(b)},c=b=>{this.#t.phase==="setB"?this.#i=o(b):i.dragging&&this._seekFromEvent(b)},p=()=>{i.dragging=!1,e.thumbS.value=1},u=b=>y=>{y.target.setPointerCapture(y.pointerId);let{start:v,end:w}=this.#t,B=n(y)-Et(b==="a"?v:w,!0);this.#s={marker:b,grab:B,start:v,end:w}},d=b=>{let y=this.#s;if(!y)return;let v=ni(n(b)-y.grab,!0),w=this.#t.gap;y.marker==="a"?y.start=Math.min(v,y.end-w):y.end=Math.max(v,y.start+w)},f=()=>{let b=this.#s;b&&(this.#s=null,this.onAbLoopSet?.(b.start,b.end))},m=({label:b,left:y,display:v,onPointerDown:w})=>x(R,{positionType:"absolute",positionLeft:y,positionTop:Pe,width:Oe,height:N,backgroundColor:oe,borderWidth:1,borderColor:I,hover:st,alignItems:"center",justifyContent:"center",display:v,pointerEvents:e.abMarkerPE,zIndex:1,zIndexOffset:8,onPointerDown:w,onPointerMove:d,onPointerUp:f,children:x(j,{fontSize:13,fontWeight:"bold",color:I,pointerEvents:"none",children:b})}),g=b=>{b.target.setPointerCapture(b.pointerId),i.panelDragging=!0,i.alpha=.3},M=()=>{i.panelDragging=!1},S=ae(ha,{backgroundColor:oe,children:[ae(R,{positionType:"absolute",positionLeft:0,positionTop:0,width:G,height:De,display:e.contentD,children:[x(R,{positionType:"absolute",positionLeft:0,positionTop:0,width:G,height:de,backgroundColor:I,backgroundOpacity:.85}),x(R,{positionType:"absolute",positionLeft:0,positionTop:0,width:G,height:de,alignItems:"center",justifyContent:"center",children:x(j,{fontSize:13,fontWeight:"bold",color:oe,children:e.bannerT})}),x(R,{positionType:"absolute",positionLeft:0,positionTop:de,width:xe,height:Le,backgroundColor:oe,hover:st,onClick:()=>this.onSceneNav?.(-1)}),x(R,{positionType:"absolute",positionLeft:0,positionTop:de,width:xe,height:Le,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:x(X,{src:H.arrL,width:28,height:28})}),x(t,{x:xe,y:de,w:.5,h:Le}),ae(R,{positionType:"absolute",positionLeft:xe,positionTop:de,width:G-xe*2,height:Le,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,overflow:"hidden",children:[x(j,{fontSize:22,color:I,children:e.sceneT}),x(j,{fontSize:10,color:I,opacity:.45,children:e.sceneSub})]}),x(t,{x:G-xe,y:de,w:.5,h:Le}),x(R,{positionType:"absolute",positionLeft:G-xe,positionTop:de,width:xe,height:Le,backgroundColor:oe,hover:st,onClick:()=>this.onSceneNav?.(1)}),x(R,{positionType:"absolute",positionLeft:G-xe,positionTop:de,width:xe,height:Le,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:x(X,{src:H.arrR,width:28,height:28})}),x(t,{x:0,y:Ee,w:G,h:.5}),x(R,{positionType:"absolute",positionLeft:0,positionTop:Ee,width:W,height:Xe-Ee,backgroundColor:oe,hover:st,onClick:()=>this.onPlayPause?.()}),ae(R,{positionType:"absolute",positionLeft:0,positionTop:Ee,width:W,height:Xe-Ee,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,pointerEvents:"none",children:[x(X,{display:e.playD,src:H.play,width:20,height:24,marginLeft:2}),x(X,{display:e.pauseD,src:H.pause,width:20,height:24}),x(X,{display:e.spinD,src:H.spin,width:28,height:28,transformRotateZ:e.spinR}),x(j,{fontSize:13,fontWeight:"bold",color:I,display:e.playTextD,children:e.playLbl})]}),x(t,{x:W,y:Ee,w:.5,h:Xe-Ee}),x(R,{positionType:"absolute",positionLeft:W+16,positionTop:Ee+14,width:120,height:20,children:x(j,{fontSize:14,color:I,children:e.timeT})}),x(R,{positionType:"absolute",positionLeft:J,positionTop:Pe,width:nt,height:N,backgroundColor:pa,onPointerEnter:a,onPointerLeave:l,onPointerDown:h,onPointerMove:c,onPointerUp:p}),x(ca,{src:fa,positionType:"absolute",positionLeft:J,positionTop:Pe,width:nt,height:N,objectFit:"fill",keepAspectRatio:!1,zIndexOffset:1,pointerEvents:"none"}),x(R,{positionType:"absolute",positionLeft:e.abHoverL,positionTop:Pe,width:e.abHoverW,height:N,backgroundColor:da,display:e.abHoverD,zIndex:1,zIndexOffset:2,pointerEvents:"none"}),x(R,{positionType:"absolute",positionLeft:J,positionTop:Pe,width:e.abPreW,height:N,backgroundColor:ua,display:e.abOnD,zIndex:1,zIndexOffset:3,pointerEvents:"none"}),x(R,{positionType:"absolute",positionLeft:e.fillL,positionTop:Pe,width:e.fillW,height:N,backgroundColor:I,backgroundOpacity:.85,zIndex:1,zIndexOffset:4,pointerEvents:"none"}),x(R,{positionType:"absolute",positionLeft:J,positionTop:Pe,width:nt,height:N,borderWidth:1,borderColor:I,borderOpacity:.6,zIndex:1,zIndexOffset:5,pointerEvents:"none"}),x(R,{positionType:"absolute",positionLeft:e.thumbL,positionTop:Pe,width:N,height:N,backgroundColor:oe,borderWidth:1,borderColor:I,zIndex:1,zIndexOffset:6,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none"}),x(R,{positionType:"absolute",positionLeft:e.thumbL,positionTop:Pe,width:N,height:N,alignItems:"center",justifyContent:"center",zIndex:1,zIndexOffset:7,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none",children:x(X,{display:e.thumbIconD,src:H.grip,width:xr,height:xr})}),x(m,{label:"A",left:e.abAL,display:e.abOnD,onPointerDown:u("a")}),x(m,{label:"B",left:e.abBL,display:e.abBD,onPointerDown:u("b")}),x(t,{x:W,y:Be,w:G-W,h:.5}),ae(r,{idx:0,onClick:()=>this.onPresetCycle?.(),children:[x(X,{src:H.bulb,width:20,height:20}),x(j,{fontSize:10,fontWeight:"bold",color:I,children:e.presetT})]}),x(t,{x:W+Me,y:Be,w:.5,h:Ce}),ae(r,{idx:1,onClick:()=>this.onMuteToggle?.(),children:[x(X,{display:e.icA,src:H.mute,width:20,height:20}),x(X,{display:e.icB,src:H.vol,width:20,height:20}),x(j,{fontSize:10,fontWeight:"bold",color:I,children:e.muteLbl})]}),x(t,{x:W+Me*2,y:Be,w:.5,h:Ce}),ae(r,{idx:2,onClick:()=>this.onScaleLockToggle?.(),children:[x(X,{src:H.scale,width:20,height:20}),x(j,{fontSize:10,fontWeight:"bold",color:I,children:e.sclLkLbl})]}),x(t,{x:W+Me*3,y:Be,w:.5,h:Ce}),ae(r,{idx:3,active:e.abOnD,onClick:()=>this.onAbLoopToggle?.(),children:[x(X,{display:e.abOffD,src:H.loop,width:20,height:20}),x(X,{display:e.abOnD,src:H.loopOn,width:20,height:20}),x(j,{fontSize:10,fontWeight:"bold",color:e.abTxtC,children:e.abLbl})]}),x(t,{x:W+Me*4,y:Be,w:.5,h:Ce}),ae(r,{idx:4,onClick:()=>this.onLockToggle?.(),children:[x(X,{display:e.lockA,src:H.unlk,width:20,height:20}),x(X,{display:e.lockB,src:H.lock,width:20,height:20}),x(j,{fontSize:10,fontWeight:"bold",color:I,children:e.lockLbl})]}),x(t,{x:W+Me*5,y:Be,w:.5,h:Ce}),ae(r,{idx:5,onClick:()=>this.onReset?.(),children:[x(X,{src:H.reset,width:20,height:20}),x(j,{fontSize:10,fontWeight:"bold",color:I,children:"RESET SCENE"})]}),x(t,{x:W+Me*6,y:Be,w:.5,h:Ce}),ae(r,{idx:6,onClick:()=>this.onExit?.(),children:[x(X,{src:H.exit,width:20,height:20}),x(j,{fontSize:10,fontWeight:"bold",color:I,children:"EXIT"})]}),x(t,{x:0,y:Xe,w:G,h:.5}),x(R,{positionType:"absolute",positionLeft:0,positionTop:Xe+1,width:G,height:Zs-1,backgroundColor:oe,hover:st,alignItems:"center",justifyContent:"center",onPointerDown:g,onPointerUp:M,children:x(j,{fontSize:12,color:I,opacity:.45,pointerEvents:"none",children:"DRAG TO MOVE THE MENU"})}),x(R,{positionType:"absolute",positionLeft:G-Pt-4,positionTop:(de-Pt)/2,width:Pt,height:Pt,borderRadius:Pt/2,backgroundColor:oe,backgroundOpacity:.8,borderWidth:1,borderColor:I,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",zIndexOffset:10,onClick:()=>this.onClose?.(),children:x(X,{src:H.close,width:12,height:12,pointerEvents:"none"})}),x(R,{positionType:"absolute",positionLeft:0,positionTop:0,width:G,height:.5,backgroundColor:I,backgroundOpacity:.3,zIndexOffset:10}),x(R,{positionType:"absolute",positionLeft:0,positionTop:De-.5,width:G,height:.5,backgroundColor:I,backgroundOpacity:.3,zIndexOffset:10}),x(R,{positionType:"absolute",positionLeft:0,positionTop:0,width:.5,height:De,backgroundColor:I,backgroundOpacity:.3,zIndexOffset:10}),x(R,{positionType:"absolute",positionLeft:G-.5,positionTop:0,width:.5,height:De,backgroundColor:I,backgroundOpacity:.3,zIndexOffset:10})]}),x(R,{positionType:"absolute",positionLeft:0,positionTop:0,width:G,height:De,backgroundColor:oe,backgroundOpacity:1,display:e.loadingD,alignItems:"center",justifyContent:"center",children:x(X,{src:H.spin,width:64,height:64,transformRotateZ:e.spinR,pointerEvents:"none"})})]});await i.mountReact(S)}};var at=class{#e;#r;#t;#i=null;#s;#o;#n;constructor(e){this.#e=e,this.#r=new e.Scene,this.#t=new e.Group,this.#r.add(this.#t),this.#s=new e.Vector3,this.#o=new e.Vector3,this.#n=new e.Raycaster}get scene(){return this.#r}get anchor(){return this.#t}get bboxMesh(){return this.#i}get hasBBox(){return!!this.#i}rebuildBBox(e,t){let r=this.#e;this.#i&&(this.#t.remove(this.#i),this.#i.geometry.dispose(),this.#i.material.dispose());let i=(e.minX+e.maxX)/2,n=(e.minY+e.maxY)/2,o=(e.minZ+e.maxZ)/2,a=new r.Box3(new r.Vector3(e.minX,e.minY,e.minZ),new r.Vector3(e.maxX,e.maxY,e.maxZ)).applyMatrix4(new r.Matrix4().fromArray(t)),l=a.getSize(new r.Vector3).max(new r.Vector3(.1,.1,.1)),h=a.getCenter(new r.Vector3),c=new r.BoxGeometry(l.x,l.y,l.z);return this.#i=new r.Mesh(c,new r.MeshBasicMaterial({visible:!1,side:r.DoubleSide})),this.#i.position.copy(h),this.#t.add(this.#i),{cx:i,cy:n,cz:o}}applyTransform(e,t){this.#t.position.set(e[0],e[1],e[2]),this.#t.scale.set(t,t,-t),this.#t.quaternion.identity(),this.#t.updateMatrixWorld(!0)}hitTest(e){if(!this.#i)return!1;let t=e.position,r=e.orientation;return this.#s.set(t.x,t.y,t.z),this.#o.set(-2*(r.w*r.y+r.x*r.z),-2*(r.y*r.z-r.w*r.x),2*(r.x*r.x+r.y*r.y)-1),this.#n.set(this.#s,this.#o),this.#n.intersectObject(this.#i,!1).length>0}};var lt=class s{#e;#r;#t;#i;#s;#o;static#n=1.5;static#l=.04;static#a=.15;static#h=4;static#c=20;static#p=.003;static#m=.001;static#u=.7;constructor(e,t){this.#e=e,this.#r=this.#f(),this.#t=this.#f(),this.#i=this.#d(),this.#s=this.#d(),this.#o=new e.Vector3,t.add(this.#r.group,this.#t.group,this.#i,this.#s)}update(e,t,r,i=!0){this.#g(this.#r,this.#i,i?e:null,r?.[0]),this.#g(this.#t,this.#s,i?t:null,r?.[1])}dispose(){for(let e of[this.#r,this.#t])e.mesh.geometry.dispose(),e.mesh.material.dispose();for(let e of[this.#i,this.#s])e.geometry.dispose(),e.material.dispose()}#f(){let e=this.#e,t=s.#h,r=s.#c,i=s.#n,n=s.#l,o=s.#a,a=s.#p,l=s.#m,h=s.#u,c=r+1,p=t+1,u=c*p,d=new Float32Array(u*3),f=new Float32Array(u*4),m=[];for(let y=0;y<c;y++){let v=y/r,w=-n-v*i,B=a+(l-a)*v,T=Math.min(v/o,1),F=1-v,Q=h*T*F;for(let q=0;q<=t;q++){let V=q/t*Math.PI*2,C=y*p+q;d[C*3]=Math.cos(V)*B,d[C*3+1]=Math.sin(V)*B,d[C*3+2]=w,f[C*4]=1,f[C*4+1]=1,f[C*4+2]=1,f[C*4+3]=Q}}for(let y=0;y<r;y++)for(let v=0;v<t;v++){let w=y*p+v,B=w+1,T=w+p,F=T+1;m.push(w,T,B,B,T,F)}let g=new e.BufferGeometry;g.setAttribute("position",new e.BufferAttribute(d,3)),g.setAttribute("color",new e.BufferAttribute(f,4)),g.setIndex(m);let M=new e.MeshBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),S=new e.Mesh(g,M);S.frustumCulled=!1,S.renderOrder=998;let b=new e.Group;return b.add(S),b.visible=!1,{mesh:S,group:b}}#d(){let e=this.#e,t=new e.RingGeometry(.004,.008,24),r=new e.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),i=new e.Mesh(t,r);return i.frustumCulled=!1,i.renderOrder=999,i.visible=!1,i}#g(e,t,r,i){if(!r?.active||!r.rayTransform||r.isTransientPointer){e.group.visible=!1,t.visible=!1;return}let n=r.rayTransform.position,o=r.rayTransform.orientation;e.group.position.set(n.x,n.y,n.z),e.group.quaternion.set(o.x,o.y,o.z,o.w),e.group.visible=!0,e.group.updateMatrixWorld(!0);let a=r.triggerPressed??!1;if(e.mesh.material.color.setRGB(a?.4:1,a?.75:1,1),i?.visible){let l=this.#o.set(n.x,n.y,n.z).distanceTo(i.position),h=s.#l+s.#n;e.mesh.scale.z=Math.min(1,l/h),t.position.copy(i.position),t.quaternion.set(o.x,o.y,o.z,o.w),t.visible=!0,t.updateMatrixWorld(!0)}else e.mesh.scale.z=1,t.visible=!1}};var ht=Object.keys(xt),$s=s=>!Number.isFinite(s)||s<0?"0:00":`${~~(s/60)}:${String(~~s%60).padStart(2,"0")}`,ai=s=>s.toUpperCase(),Ks=s=>Math.max(.1,s*.01);var ct=class{#e;#r;#t;#i=null;#s=null;#o=null;#n=null;#l=null;#a=null;#h=0;#c=0;#p=0;#m=ht.indexOf("off");#u=ai("off");#f=1;#d=!1;#g=!0;#b="off";#y=[];#x=0;#v=!0;#w=null;#T=null;#S=null;#_=null;#E=null;#M=null;#C;#P=null;#A=null;#R=null;constructor(e,{debug:t=!1,uiStyle:r="modern",rays:i=!0}={}){this.#e=e,this.#r=t,this.#t=r,this.#C=i}get uiStyle(){return this.#t}set uiStyle(e){this.#t=e}set manipulator(e){this.#s=e}get manipulator(){return this.#s}get uiActive(){return!this.#v&&(this.#i?.quad.interacting??!1)}get uiDragging(){if(this.#v)return!1;let e=this.#i?.quad;return(e?.dragging||e?.panelDragging)??!1}get quads(){let e=this.#i?.quad;return e?[e]:[]}set sources(e){this.#y=e??[],this.#x=Math.min(this.#x,Math.max(0,this.#y.length-1))}get sources(){return this.#y}set sceneIndex(e){this.#y.length&&(this.#x=Math.max(0,Math.min(this.#y.length-1,e)),this.#v=!0)}get sceneIndex(){return this.#x}set onSceneChange(e){this.#S=e}get onSceneChange(){return this.#S}set onPresetChange(e){this.#T=e}get onPresetChange(){return this.#T}set onLock(e){this.#_=e}get onLock(){return this.#_}set onScaleLock(e){this.#E=e}get onScaleLock(){return this.#E}set bannerText(e){this.#w=e}get bannerText(){return this.#w}set eventLogger(e){this.#M=e}get eventLogger(){return this.#M}setPreset(e,t=this.#f){this.#f=t,this.syncPreset(e),this.#L(this.#o,e,t)}syncPreset(e){let t=ht.indexOf(e);t<0||(this.#m=t,this.#u=ai(e))}async init(e,t,r,i,n,o=!1){this.#o=e;let a=this.#e,l=this.#r||this.#C;this.#i=this.#t==="modern"?new ot(a):new tt(a),this.#k(e,t);let h=l?new at(a):null;if(this.#R=h,h&&this.#s?.setOverlay(h),this.#d=this.#y[this.#x]?.locked??this.#d,this.#g=this.#y[this.#x]?.scaleLocked??this.#g,this.#s&&(this.#s.locked=this.#d,this.#s.scaleLocked=this.#g),this.#L(e,ht[this.#m],this.#f),h){this.#i.quad.hitMesh&&h.scene.add(this.#i.quad.hitMesh);for(let p of this.#i.quad.hitSpheres)h.scene.add(p);this.#r&&(this.#P=new it(a,h)),this.#C&&(this.#A=new lt(a,h.scene))}l&&h&&(this.#n=new a.WebGLRenderer({context:n,canvas:n.canvas}),this.#n.autoClear=!1,this.#l=new a.PerspectiveCamera(50,1,.01,1e4),this.#l.matrixAutoUpdate=!1,this.#a=new a.WebGLRenderTarget(1,1),this.#n.setRenderTarget(this.#a),this.#n.setRenderTarget(null));let c=await this.#i.quad.init(t,r,i,n);return this.#h=setTimeout(()=>this.#i?.quad.show(),1e3),c?[c]:[]}frame(e,t,r,i,n,o){this.#z(o),this.#i?.quad.updatePosition(i),this.#i?.quad.handleInput(this.#s?.leftHand,this.#s?.rightHand,i),this.#P?.update(this.#s?.leftHand,this.#s?.rightHand),this.#A?.update(this.#s?.leftHand,this.#s?.rightHand,this.#i?.quad.hitSpheres,!!this.#i?.quad.visible),this.#i?.quad.panelDragging&&this.#s?.reset(),this.#G(e,o),this.#i?.render(e),this.#i?.quad.drawContent(t)}renderEye(e,t,r,i,n,o,a){this.#i?.quad.renderEye(e,r,i,n,o,a),!(!this.#n||!this.#R)&&(this.#l.projectionMatrix.fromArray(r.projectionMatrix),this.#l.projectionMatrixInverse.copy(this.#l.projectionMatrix).invert(),this.#l.matrix.fromArray(r.transform.matrix),this.#l.matrixWorld.copy(this.#l.matrix),this.#l.matrixWorldInverse.fromArray(r.transform.inverse.matrix),this.#n.resetState(),this.#n.setRenderTargetFramebuffer(this.#a,t),this.#n.setRenderTarget(this.#a),this.#n.setViewport(i,n,o,a),this.#n.setScissor(i,n,o,a),this.#n.setScissorTest(!0),this.#n.clearDepth(),this.#n.render(this.#R.scene,this.#l),this.#n.resetState(),e.bindFramebuffer(e.FRAMEBUFFER,t))}onRefReset(){this.#i?.quad.recenter()}render(e,t){}dispose(){clearTimeout(this.#h),this.#b!=="off"&&this.#B(this.#o),this.#P?.dispose(),this.#P=null,this.#A?.dispose(),this.#A=null,this.#R=null,this.#n?.dispose(),this.#n=null,this.#a?.dispose(),this.#a=null,this.#l=null,this.#i?.quad.dispose(),this.#i=null,this.#s?.reset(),this.#s=null,this.#c=0}#k(e,t){let r=this.#i;r.onPlayPause=()=>{(e?.isBuffering??!1)||(e?.isPlaying?e.pause():e.play(),this.#M?.event?.("play_pause",{playing:!e?.isPlaying}))},r.onSeek=i=>{e?.seek?.(i*(e?.duration??0)),this.#M?.event?.("seek",{position:i})},r.onPresetCycle=()=>{let i=ht[(this.#m+1)%ht.length];this.#L(e,i,this.#f),this.#T?.(i),this.#M?.event?.("preset_cycle",{preset:i})},r.onExit=()=>{this.#M?.event?.("exit"),t?.end()},r.onClose=()=>{r.quad.hide()},r.onSceneNav=i=>{if(!this.#y.length)return;let n=Math.max(0,Math.min(this.#y.length-1,this.#x+i));n!==this.#x&&(this.#x=n,this.#v=!0,this.#O(),this.#S?.(this.#y[this.#x],this.#x),this.#M?.event?.("scene_nav",{index:n,label:this.#y[n]?.label,dir:i}))},this.#t==="modern"&&(r.onMuteToggle=()=>{let i=this.#F(e);this.#M?.event?.("mute_toggle",{muted:!i})},r.onReset=()=>{this.#s?.resetToInitial(),this.#M?.event?.("reset")},r.onLockToggle=()=>{this.#d=!this.#d,this.#s&&(this.#s.locked=this.#d),this.#_?.(this.#d),this.#M?.event?.("lock_toggle",{locked:this.#d})},r.onAbLoopToggle=()=>{this.#b==="off"?this.#D(e):this.#B(e),this.#M?.event?.("ab_loop_toggle",{enabled:this.#b!=="off"})},r.onAbLoopSet=(i,n)=>{if(this.#b==="off")return;let o=e.duration;this.#I(e,i*o,n*o),this.#b="active",this.#M?.event?.("ab_loop_set",e.playbackRange)},r.onScaleLockToggle=()=>{this.#g=!this.#g,this.#s&&(this.#s.scaleLocked=this.#g),this.#E?.(this.#g),this.#M?.event?.("scale_lock_toggle",{scaleLocked:this.#g})})}#D(e){let t=e?.duration??0;t<=0||(this.#I(e,e.currentTime,t),this.#b="setB")}#I(e,t,r){let i=e.duration,n=Ks(i),o=_.clamp(t,0,i-n);e.setPlaybackRange(o,_.clamp(r,o+n,i))}#B(e){e?.clearPlaybackRange(),this.#b="off"}#O(){this.#d=this.#y[this.#x]?.locked??this.#d,this.#g=this.#y[this.#x]?.scaleLocked??this.#g}#F(e){let t=!(e?.audioEnabled??!1);return t?e?.enableAudio?.():e?.disableAudio?.(),t}#L(e,t,r=1){let i=ht.indexOf(t);if(i<0)return;this.#m=i,this.#u=ai(t);let n=xt[t];n?e?.setEnvLighting(Re(n),r):e?.clearEnvLighting()}#z(e){!this.#v||!e.duration||(this.#v=!1,this.#b="off",this.#d=this.#y[this.#x]?.locked??this.#d,this.#g=this.#y[this.#x]?.scaleLocked??this.#g)}#G(e,t){let r=!(t?.audioEnabled??!1);if(this.#v)this.#i?.update({loading:!0,muted:r,locked:this.#d,scaleLocked:this.#g,sceneText:this.#y.length?`${this.#x+1}/${this.#y.length}`:"1/1",sceneLabel:(this.#y[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#w});else{let i=t?.isBuffering??!1,n=t?.duration??0;n>0&&(this.#p=n);let o=this.#p,a=t?.currentTime??0,l=u=>u/(o||1),h=_.clamp01(l(a)),{start:c,end:p}=t.playbackRange;this.#i?.update({loading:!1,playing:t?.isPlaying??!1,spinning:i,buffering:i,progress:h,timeText:`${$s(a)} / ${$s(o)}`,presetName:this.#u,muted:r,locked:this.#d,scaleLocked:this.#g,abLoop:{phase:this.#b,start:l(c),end:l(p),gap:l(Ks(o))},sceneText:this.#y.length?`${this.#x+1}/${this.#y.length}`:"1/1",sceneLabel:(this.#y[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#w})}this.#N(e)}#N(e){if(this.#c>0){this.#c-=e;return}let t=this.#s?.leftHand.microSwipe||this.#s?.rightHand.microSwipe;t&&(this.#c=.45,this.#i?.onSceneNav(t))}};import{useState as ga}from"react";import*as ya from"three";function li(){let[s]=ga(()=>new Qe(ya));return s}import{useEffect as Js,useRef as xa,useState as ba}from"react";function hi(s,e,t){let[r,i]=ba(!1);Js(()=>{let a=s.current;if(!a)return;let l=()=>i(!0),h=c=>{c.touches.length>1&&l()};return a.addEventListener("pointerdown",l),a.addEventListener("wheel",l),a.addEventListener("touchmove",h),()=>{a.removeEventListener("pointerdown",l),a.removeEventListener("wheel",l),a.removeEventListener("touchmove",h)}},[s]);let n=xa(e);return Js(()=>{n.current!==e&&(n.current=e,i(!1))},[e]),{hasInteracted:r,resetView:()=>{t.reset(),i(!1)}}}import{useEffect as va,useState as wa}from"react";var _a=500;function ci(s,e=_a){let[t,r]=wa(!1);return va(()=>{if(!s){r(!1);return}let i=setTimeout(()=>r(!0),e);return()=>clearTimeout(i)},[s,e]),s&&t}import{useEffect as Sa,useRef as Ta,useState as Ma}from"react";var Pa=2e3;function pi({coreError:s,interactionError:e,isSceneReady:t,currentSource:r,open:i,clearError:n}){let[o,a]=Ma(null),l=Ta(new WeakMap);e?.phase&&l.current.set(e.error,e.phase);let h=s&&e?.error===s?e.phase:s?l.current.get(s):void 0,c=s?{error:s,phase:h}:e,p=c?Ms(c.error,t,c.phase):null,u=p?.presentation==="blocking",d=p?.presentation==="toast"&&p.cause!==o?p:null,f=d?.cause??null;return Sa(()=>{if(!f)return;let M=setTimeout(()=>{a(f),n()},Pa);return()=>clearTimeout(M)},[f,n]),{playerError:p,isBlocking:!!u,toast:d,retry:()=>r?i(r):window.location.reload(),dismiss:()=>{d&&a(d.cause),n()}}}import{useCallback as Ea,useEffect as Ca,useState as La}from"react";function ui(s,e){let[t,r]=La(!1),i=Ea(async()=>{let n=s.current;if(!(!n||typeof document>"u"))try{document.fullscreenElement===n?await document.exitFullscreen():await n.requestFullscreen()}catch(o){e(_e(o),{phase:"fullscreen"})}},[e,s]);return Ca(()=>{if(typeof document>"u")return;let n=()=>r(document.fullscreenElement===s.current);return n(),document.addEventListener("fullscreenchange",n),()=>document.removeEventListener("fullscreenchange",n)},[s]),{isFullscreen:t,toggleFullscreen:i}}import{useRef as Ra}from"react";function en(s){let e=Zr(s.name);return{url:`${hr}${s.name}`,label:s.name,file:s,...e?{type:ws}:{}}}async function Aa(s){return Zr(s.name)?en(await s.getFile()):{url:`${hr}${s.name}`,label:s.name,localFile:s}}function ka(){return typeof window>"u"?null:window.showOpenFilePicker??null}function Ia(s){return s instanceof DOMException&&s.name==="AbortError"}function Fa(s){let e=s.currentTarget.files?.[0];return s.currentTarget.value="",e?en(e):null}function di({localFiles:s,logger:e,reportError:t,playlist:r,clearError:i}){let n=Ra(null),o=!!s,a=c=>{i();let p=[...r.sources,c];r.setSources(p),r.goTo(p.length-1),e.event?.("local_file_open",{label:ue(c)})};return{enabled:o,fileInputProps:{ref:n,accept:bs,onChange:c=>{let p=Fa(c);p&&a(p)}},localLabel:vs,openLocalFile:async()=>{if(!o)return;let c=ka();if(!c){n.current?.click();return}try{let u=(await c({types:[{description:"Volumetric video",accept:{"application/octet-stream":[...Yr]}}]}))[0];u&&a(await Aa(u))}catch(p){Ia(p)||t(_e(p),{phase:"local-file"})}}}}import{useRef as fi}from"react";function mi(s){let{containerRef:e,muted:t=!1,moduleFactory:r,overlay:i,boundaryRenderer:n,eventLogger:o,onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:p}=s,u=fi({onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:p});u.current={onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:p};let d=fi(null),f=fi(!1),m=rr({containerRef:e,moduleFactory:r,moduleUrl:r?void 0:Ss(),overlay:i,boundaryRenderer:n,eventLogger:o,onReady(){f.current||(f.current=!0,t||d.current?.app?.enableAudio()),u.current.onReady?.()},onProgress:M=>u.current.onProgress?.(M),onModeChange:(M,S)=>u.current.onModeChange?.(M,S),onXRStart:()=>u.current.onXRStart?.(),onXREnd:()=>u.current.onXREnd?.()});d.current=m;let g=ir(m);return{gracia:m,playlist:g}}import{useCallback as gi,useMemo as tn,useState as Ba}from"react";function Oa(s){switch(s){case"init":case"load":case"xr":case"streaming":case"fullscreen":case"local-file":return s;default:return}}function yi(s,e){let[t,r]=Ba(null),i=tn(()=>Ls(s,e),[s,e]),n=gi((h,c)=>{r({error:h,phase:Oa(c?.phase)})},[]),o=tn(()=>({event:(h,c)=>i.event?.(h,c),error:(h,c)=>{n(h,c),i.error?.(h,c)}}),[i,n]),a=gi((h,c)=>{n(h,c),i.error?.(h,c)},[i,n]),l=gi(()=>r(null),[]);return{interactionError:t,logger:o,reportError:a,clearError:l}}import{useEffect as Ya}from"react";import{useEffect as za,useRef as Ga}from"react";function xi({isInitialized:s,sources:e,streaming:t,playlist:r,reportError:i}){let n=Ga(i);n.current=i,za(()=>{if(!s)return;let o=!1,a=l=>{o||l.length===0||(r.setSources(l),r.goTo(0))};if(t?.length)return qe(t,Ts()).then(a).catch(l=>{o||n.current(_e(l),{phase:"streaming"})}),()=>{o=!0};a(e)},[s,e,t,r.setSources,r.goTo])}import{useEffect as Na,useRef as rn}from"react";function bi({currentSource:s,index:e,onSceneChange:t}){let r=rn(t);r.current=t;let i=rn(null);Na(()=>{if(!s||e<0)return;let n=`${e}:${ue(s)}`;i.current!==n&&(i.current=n,r.current?.(s,e))},[s,e])}import{useEffect as Da,useState as Xa}from"react";var Ha=500;function vi(s,e,t){let[r,i]=Xa(!1),n=lr(s.mode)?s.mode:null;Da(()=>{(!n||!s.xr.isActive)&&i(!1)},[n,s.xr.isActive]);let o=c=>{t(),i(!0),s.xr.setMode(c).catch(p=>{i(!1),e(_e(p),{phase:"xr",target:c})})},a=()=>{i(!1),s.xr.setMode(pe.PW).catch(c=>{e(_e(c),{phase:"xr",target:pe.PW})})},h=ci(r&&!s.error,Ha)&&s.xr.isActive?n:null;return{enter:o,exit:a,activeScreenMode:h}}import{useRef as Va}from"react";import*as Ua from"three";function Wa(s){if(s===!1)return null;let{uiStyle:e="modern",bannerText:t="EARLY BETA"}=s??{};try{let r=new ct(Ua,{uiStyle:e});return r.bannerText=t,r}catch{return null}}function wi(s){let e=Va(void 0);return e.current===void 0&&(e.current=Wa(s)),e.current}function _i(s,e){let{sources:t=[],streaming:r,muted:i=!1,cameraControls:n=!1,sceneSelector:o,moduleFactory:a,onReady:l,onProgress:h,onModeChange:c,onXRStart:p,onXREnd:u,onSceneChange:d,onError:f,eventLogger:m,localFiles:g,xrOverlay:M}=s,S=wi(M),b=li(),{interactionError:y,logger:v,reportError:w,clearError:B}=yi(m,f);Ya(()=>{cr()},[]);let{gracia:T,playlist:F}=mi({containerRef:e.container,muted:i,moduleFactory:a,overlay:S,boundaryRenderer:b,eventLogger:v,onReady:l,onProgress:h,onModeChange:c,onXRStart:p,onXREnd:u});xi({isInitialized:T.isInitialized,sources:t,streaming:r,playlist:F,reportError:w}),bi({currentSource:F.currentSource,index:F.index,onSceneChange:d});let{fileInputProps:Q,enabled:q,localLabel:V,openLocalFile:C}=di({localFiles:g,logger:v,reportError:w,playlist:F,clearError:B}),{isFullscreen:le,toggleFullscreen:ze}=ui(e.root,w),Ve=T.isContentReady&&!T.isLoading,{playerError:Ai,isBlocking:ki,toast:Tn,retry:Mn,dismiss:Pn}=pi({coreError:T.error,interactionError:y,isSceneReady:Ve,currentSource:F.currentSource,open:T.open,clearError:B}),En=!Ai&&(!T.isInitialized||!Ve),Tr=vi(T,w,B);return{contextValue:{gracia:T,playlist:F,config:{sceneSelector:o,cameraControls:n},refs:e,presentation:{isBusy:En,isSceneReady:Ve,isBlocking:ki,playerError:Ai,toast:Tn,retry:Mn,dismiss:Pn},shell:{isFullscreen:le,toggleFullscreen:ze,localFilesEnabled:q,fileInputProps:Q,openLocalFile:C,localLabel:V},xr:{enter:Tr.enter,exit:Tr.exit,activeScreenMode:ki?null:Tr.activeScreenMode}},gracia:T,playlist:F,openLocalFile:C,toggleFullscreen:ze}}import{useEffect as sn,useRef as nn,useState as Za}from"react";import{jsx as ee,jsxs as Ct}from"react/jsx-runtime";var on=()=>{let{playlist:s}=z(),e=nn(null),t=nn(s.index),[r,i]=Za(!1),n=s.currentSource,o=n?ue(n):"Select scene",a=s.total>1;return sn(()=>{t.current!==s.index&&(t.current=s.index,i(!1))},[s.index]),sn(()=>{if(!r)return;let l=h=>{e.current&&!e.current.contains(h.target)&&i(!1)};return document.addEventListener("click",l),()=>document.removeEventListener("click",l)},[r]),Ct("div",{ref:e,className:"gr-player__scene",children:[Ct("div",{className:"gr-player__scene-inner",children:[Ct("button",{className:"gr-player__scene-main",type:"button",disabled:!a,onClick:()=>i(!r),"aria-haspopup":"menu","aria-expanded":r,children:[ee(gs,{}),Ct("span",{className:"gr-player__scene-main-copy",children:[ee("span",{className:"gr-player__scene-copy",children:ee("span",{className:"gr-player__scene-label",children:o})}),a&&ee("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:s.sources.map((l,h)=>ee("span",{className:K("gr-player__scene-segment",h===s.index&&"is-active")},l.id??l.url??h))})]})]}),ee("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasPrev,onClick:()=>s.prev(),"aria-label":"Previous scene",children:ee(or,{})}),ee("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasNext,onClick:()=>s.next(),"aria-label":"Next scene",children:ee(ar,{})})]}),r&&a&&ee("div",{className:"gr-player__scene-menu",children:s.sources.map((l,h)=>Ct("button",{type:"button",className:K("gr-player__scene-item",h===s.index&&"is-active"),onClick:()=>{s.goTo(h),i(!1)},children:[ee("span",{children:ke(l)?ee(Ae,{}):h+1}),ee("strong",{children:ue(l)})]},l.id??l.url??h))})]})};import{jsx as fe,jsxs as Si}from"react/jsx-runtime";var an=()=>{let{playlist:s}=z(),e=s.currentSource,t=ke(e);return fe("div",{className:"gr-player__scene gr-player__scene--stepper",children:Si("div",{className:"gr-player__scene-inner",children:[fe("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasPrev,onClick:()=>s.prev(),"aria-label":"Previous scene",children:fe(or,{})}),fe("div",{className:"gr-player__scene-main",children:Si("span",{className:"gr-player__scene-main-copy",children:[t&&e?Si("span",{className:"gr-player__scene-count gr-player__scene-count--local",children:[fe(Ae,{}),fe("span",{className:"gr-player__scene-label",children:ue(e)})]}):fe("span",{className:"gr-player__scene-count",children:s.index>=0?`${s.index+1} of ${s.total}`:`${s.total} scenes`}),fe("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:s.sources.map((r,i)=>fe("span",{className:K("gr-player__scene-segment",i===s.index&&"is-active",ke(r)&&"gr-player__scene-segment--local")},r.id??r.url??i))})]})}),fe("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasNext,onClick:()=>s.next(),"aria-label":"Next scene",children:fe(ar,{})})]})})};import{useEffect as qa,useRef as ja}from"react";import{jsx as Lt}from"react/jsx-runtime";var ln=()=>{let{playlist:s}=z(),e=ja(null),t=s.index;return qa(()=>{e.current?.querySelector(`.gr-player__scene-tab[data-scene-index="${t}"]`)?.scrollIntoView({block:"nearest",inline:"nearest"})},[t]),Lt("div",{className:"gr-player__scene",children:Lt("div",{className:"gr-player__scene-inner",children:Lt("div",{ref:e,className:"gr-player__scene-tabs-scroll",children:s.sources.map((r,i)=>Lt("button",{type:"button","data-scene-index":i,className:K("gr-player__scene-tab",i===s.index&&"is-active",ke(r)&&"gr-player__scene-tab--local"),onClick:()=>s.goTo(i),"aria-label":`Open ${ue(r)}`,"aria-current":i===s.index?"true":void 0,children:ke(r)?Lt(Ae,{}):i+1},r.id??r.url??i))})})})};import{jsx as $a}from"react/jsx-runtime";var Qa={tabs:ln,stepper:an,menu:on},br=()=>{let{config:s}=z(),{sceneSelector:e=_s}=s,t=Qa[e];return $a(t,{})};import{useRef as hn,useState as Ka}from"react";import{jsx as vr,jsxs as Ja}from"react/jsx-runtime";var Ti=({progress:s,duration:e,onSeek:t,disabled:r=!1})=>{let i=hn(null),n=hn(!1),[o,a]=Ka(0),l=p=>{if(!i.current)return 0;let u=i.current.getBoundingClientRect();return Math.min(1,Math.max(0,(p.clientX-u.left)/u.width))},h=p=>{e>0&&t(l(p)*e)},c=r?void 0:{onPointerDown(p){n.current=!0,p.currentTarget.setPointerCapture(p.pointerId),h(p)},onPointerMove(p){a(l(p)),n.current&&h(p)},onPointerLeave(){a(0)},onPointerUp(p){n.current=!1,p.currentTarget.releasePointerCapture(p.pointerId)},onPointerCancel(){n.current=!1}};return vr("div",{className:"gr-player__seek-shell","aria-disabled":r||void 0,children:Ja("div",{ref:i,className:"gr-player__seek",role:"slider","aria-valuemin":0,"aria-valuemax":Math.max(e,0),"aria-valuenow":Math.round(s*Math.max(e,0)),"aria-disabled":r||void 0,tabIndex:r?-1:0,...c,children:[vr("span",{className:"gr-player__seek-fill",style:{width:`${s*100}%`}}),vr("span",{className:"gr-player__seek-hover",style:{width:`${o*100}%`}}),vr("span",{className:"gr-player__seek-thumb",style:{left:`${s*100}%`}})]})})};import{jsx as be,jsxs as cn}from"react/jsx-runtime";function el(s,e){return e>0?Math.min(1,Math.max(0,s/e)):0}var pn=()=>{let{gracia:s,playlist:e,presentation:t,shell:r}=z(),{isSceneReady:i}=t,{isFullscreen:n,toggleFullscreen:o}=r,{playback:a}=s,l=el(a.currentTime,a.duration);return cn("div",{className:"gr-player__controls",children:[be(ne,{className:"gr-player__button--play",onClick:i?()=>a.togglePlay():void 0,"aria-label":a.isPlaying?"Pause":"Play","aria-disabled":!i||void 0,children:a.isPlaying?be(ps,{}):be(cs,{})}),be(br,{}),e.hasAudio&&be(Ie,{className:"gr-player__mute",onClick:i?()=>a.toggleMute():void 0,"aria-label":a.isMuted?"Unmute":"Mute","aria-disabled":!i||void 0,children:a.isMuted?be(us,{}):be(ds,{})}),be(Ti,{progress:l,duration:a.duration,onSeek:h=>a.seek(h),disabled:!i}),cn("div",{className:"gr-player__time",children:[jr(a.currentTime)," / ",jr(a.duration)]}),be(Ie,{variant:["icon","secondary"],className:"gr-player__fullscreen",onClick:o,"aria-label":n?"Exit fullscreen":"Enter fullscreen","aria-pressed":n,title:n?"Exit fullscreen":"Enter fullscreen",children:be(ys,{active:n})})]})};import{useEffect as un,useRef as tl,useState as rl}from"react";import{jsx as Rt,jsxs as Mi}from"react/jsx-runtime";var dn=()=>{let{gracia:s,config:e,presentation:t}=z(),{isSceneReady:r,isBlocking:i}=t,[n,o]=rl(!1),a=tl(null),l=e.cameraControls&&r&&!i&&!lr(s.mode);if(un(()=>{l||o(!1)},[l]),un(()=>{if(!n)return;let p=d=>{a.current?.contains(d.target)||o(!1)},u=d=>{d.code==="Escape"&&o(!1)};return document.addEventListener("pointerdown",p),document.addEventListener("keydown",u),()=>{document.removeEventListener("pointerdown",p),document.removeEventListener("keydown",u)}},[n]),!l)return null;let{controlsType:h,setControls:c}=s.camera;return Mi("div",{ref:a,className:"gr-player__camera-control",children:[Rt(Ie,{className:"gr-player__button--camera",onClick:()=>o(p=>!p),"aria-label":"Camera controls","aria-expanded":n,title:"Camera controls",srLabel:"Camera controls",children:Rt(fs,{})}),n&&Mi("div",{className:"gr-player__camera-panel",role:"menu","aria-label":"Camera controls",children:[Rt("div",{className:"gr-player__camera-title",children:"Camera"}),xs.map(p=>Mi("button",{className:K("gr-player__camera-option",p.type===h&&"is-active"),type:"button",role:"menuitemradio","aria-checked":p.type===h,onClick:()=>c(p.type),children:[Rt("span",{className:"gr-player__camera-label",children:p.label}),Rt("span",{className:"gr-player__camera-hint",children:p.hint})]},p.type))]})]})};import{jsx as At,jsxs as sl}from"react/jsx-runtime";var Pi=({className:s})=>{let{gracia:e,presentation:t,xr:r}=z(),{isSceneReady:i,isBlocking:n}=t,{enter:o}=r;if(n)return null;let a=e.xr.arSupported?pe.AR:e.xr.vrSupported?pe.VR:null;if(!a)return null;let l=a===pe.AR;return At("div",{className:["gr-player__xr-actions",s].filter(Boolean).join(" "),children:At(il,{active:e.mode===a,disabled:!i,icon:l?At(nr,{}):At(sr,{}),label:l?"View in AR":"Play in VR",mode:a,onEnter:o})})},il=({active:s,disabled:e,icon:t,label:r,mode:i,onEnter:n})=>sl(ne,{className:"gr-player__button--xr",onClick:e?void 0:()=>n(i),"aria-disabled":e||void 0,"aria-pressed":s||void 0,title:r,children:[At("span",{children:r}),t]});import{jsx as pt,jsxs as Ei}from"react/jsx-runtime";var fn=()=>{let{gracia:s,playlist:e,refs:t,presentation:r,shell:i}=z(),{isBlocking:n}=r,{localFilesEnabled:o,openLocalFile:a,localLabel:l}=i,{hasInteracted:h,resetView:c}=hi(t.container,e.index,s.camera);return Ei("div",{className:"gr-player__top",children:[Ei("div",{className:"gr-player__top-left",children:[o&&pt(Ie,{className:"gr-player__button--local",onClick:a,"aria-label":l,title:l,srLabel:"Open local file",children:pt(Ae,{})}),pt(Pi,{className:"gr-player__xr-actions--desktop"})]}),Ei("div",{className:"gr-player__top-right",children:[pt(dn,{}),pt(Pi,{className:"gr-player__xr-actions--mobile"}),!n&&h&&pt(ne,{variant:"secondary",className:"gr-player__reset",onClick:c,children:"Reset View"})]})]})};import{jsx as Ci,jsxs as mn}from"react/jsx-runtime";var wr=()=>{let{presentation:s}=z(),{isBlocking:e,toast:t}=s;return mn("div",{className:"gr-player__overlay",children:[Ci(fn,{}),!e&&mn("div",{className:"gr-player__bottom",children:[t&&Ci(Qr,{message:t.title}),Ci(pn,{})]})]})};import{jsx as He}from"react/jsx-runtime";var gn=({onExit:s})=>He(ne,{className:"gr-player__xr-exit",onClick:s,children:"Back to 2D"}),yn=({onExit:s})=>He(je,{icon:He(nr,{}),title:"Running in AR",body:"View the scene in AR mode on your device",action:He(gn,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),xn=({onExit:s})=>He(je,{icon:He(sr,{}),title:"Running in VR",body:"Put on your VR-headset and explore the scene",action:He(gn,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),Li={ar:yn,vr:xn};import{Fragment as nl,jsx as ut,jsxs as ol}from"react/jsx-runtime";var Ri=()=>{let{gracia:s,presentation:e,xr:t}=z(),{isBusy:r,isBlocking:i,playerError:n}=e,{retry:o}=e,{activeScreenMode:a,exit:l}=t,h=a?Li[a]:null;return ol(nl,{children:[r&&ut(Kr,{}),i&&n&&ut($r,{title:n.title,body:n.body,detail:n.cause.message,action:n.recoverable?ut(ne,{className:"gr-player__state-action",onClick:o,children:"Try again"}):void 0}),h&&ut(h,{onExit:l}),!r&&s.isRebuffering&&ut("div",{className:"gr-player__rebuffer-spinner",children:ut("div",{className:"gr-player__spinner"})})]})};import{jsx as kt,jsxs as cl}from"react/jsx-runtime";var hl=[],It=al(function(e,t){let{controls:r=!0,className:i,style:n,children:o,sources:a=hl,...l}=e,h=bn(null),c=bn(null),{contextValue:p,gracia:u,playlist:d,openLocalFile:f,toggleFullscreen:m}=_i({...l,sources:a},{root:h,container:c}),{presentation:g,shell:M}=p,{isBusy:S}=g,{isFullscreen:b}=M;return ll(t,()=>({gracia:u,playlist:d,get cameraControlsType(){return u.camera.controlsType},play:()=>u.playback.play(),pause:()=>u.playback.pause(),seek:y=>u.playback.seek(y),open:y=>u.open(typeof y=="string"?{url:y,label:"Scene"}:y),close:()=>u.close(),next:()=>d.next(),prev:()=>d.prev(),goTo:y=>d.goTo(y),resetCamera:()=>u.camera.reset(),setCameraControls:y=>u.camera.setControls(y),setMode:y=>u.xr.setMode(y),toggleFullscreen:m,openLocalFile:f}),[u,f,d,m]),kt(Jr,{value:p,children:cl("section",{ref:h,className:K("gr-player",i,{"gr-player--loading":S,"gr-player--ready":u.isContentReady,"gr-player--scenes-single":d.total<=1,"gr-player--scenes-multiple":d.total>1,"gr-player--fullscreen":b,"gr-player--error":g.isBlocking}),style:n,children:[kt("div",{ref:c,className:"gr-player__canvas"}),kt("input",{className:"gr-player__file-input",type:"file",...M.fileInputProps}),kt(Ri,{}),r&&kt(wr,{}),typeof o=="function"?o({gracia:u,playlist:d}):o]})})});import{createRef as pl}from"react";import{flushSync as ul}from"react-dom";import{createRoot as dl}from"react-dom/client";import{jsx as fl}from"react/jsx-runtime";function vn(s,e){let t=pl(),r=dl(s),i=e,n=!0,o=()=>{ul(()=>{r.render(fl(It,{...i,ref:t}))})};return o(),{get player(){return t.current},update(a){n&&(i=a,o())},unmount(){n&&(n=!1,t.current?.close(),r.unmount())},async openLocalFile(){await t.current?.openLocalFile()}}}import{Box3 as ml,BufferGeometry as gl,Float32BufferAttribute as yl,Matrix4 as xl,Mesh as bl,MeshBasicMaterial as vl,Sphere as wl,Vector2 as _l,Vector3 as wn}from"three";var _r=class extends bl{#e;#r=null;#t=new _l;#i=!1;#s=new xl;enableMesh=!1;constructor(e){let t=new gl;t.setAttribute("position",new yl([0,0,0],3)),super(t,new vl({colorWrite:!1,depthWrite:!1,transparent:!0})),this.#e=e,this.frustumCulled=!1,this.castShadow=!0,this.renderOrder=1/0,this.onBeforeRender=this.#n,this.onBeforeShadow=this.#o}get player(){return this.#e}async setAudio(e){await this.#e.loadAudio(e)}setAudioListener(e){this.#r=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}dispose(){this.#e.close(),this.#e.dispose(),this.geometry.dispose(),this.material.dispose()}#o=(e,t,r,i)=>{this.enableMesh&&this.#l(e,i)};#n=(e,t,r)=>{e.getDrawingBufferSize(this.#t);let i=this.#t.x,n=this.#t.y;if(i===0||n===0)return;this.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let o=r.matrixWorld.elements;this.#r||this.#e.setAudioListenerMatrix(o),this.#e.setAudioSourceMatrix(this.matrixWorld.elements),this.#e.renderHybridViewport(i,n,{enableMesh:this.enableMesh}),e.resetState(),!this.#i&&this.#e.isReady&&this.#a()};#l(e,t){let r=e.getContext(),i=r.getParameter(r.VIEWPORT),n=i[2],o=i[3];n===0||o===0||(this.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),this.#s.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.#s.multiply(this.matrixWorld),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.depthMask(!0),this.#e.renderMesh(this.#s.elements,i[0],i[1],n,o),e.resetState())}#a(){let e=this.#e.getBBox();if(!e)return;let t=new ml(new wn(e.minX,e.minY,e.minZ),new wn(e.maxX,e.maxY,e.maxZ));this.geometry.boundingBox=t,this.geometry.boundingSphere=new wl,t.getBoundingSphere(this.geometry.boundingSphere),this.frustumCulled=!0,this.#i=!0}};import{ByteType as Sl,DepthTexture as Tl,Object3D as Ml,RenderTarget as Pl,RGBAFormat as El,UnsignedIntType as Cl,Vector2 as _n}from"three";var Sn=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST,Sr=class s{#e;#r;#t;#i=null;root=new Ml;static attach(e,t){return e.assertDevice(t.backend?.device),new s(e,t)}constructor(e,t){this.#e=e;let r=t.backend;e.configureSurface(r.context,{usage:Sn});let{x:i,y:n}=t.getDrawingBufferSize(new _n);this.#t=new Tl,this.#t.type=Cl;let o=new Pl(i,n);o.depthTexture=this.#t,e.isBGRA&&(o.texture.format=El,o.texture.type=Sl,o.texture.internalFormat="bgra8unorm"),this.#r=o}get player(){return this.#e}setAudioListener(e){this.#i=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}render(e,t,r,i){let n=e.getDrawingBufferSize(new _n),o=n.x,a=n.y;if(o===0||a===0)return;let l=this.#r;(l.width!==o||l.height!==a)&&(l.setSize(o,a),this.#e.configureSurface(e.backend.context,{usage:Sn})),e.setRenderTarget(l),e.render(t,r),e.setRenderTarget(null);let h=e.backend,c=h.data.get(l.texture)?.texture,p=h.data.get(this.#t)?.texture;if(!c||!p||c.width!==o||c.height!==a)return;this.root.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.root.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let u=r.matrixWorld.elements;this.#i||this.#e.setAudioListenerMatrix(u),this.#e.setAudioSourceMatrix(this.root.matrixWorld.elements),this.#e.renderTextures({color:c,depth:p,w:o,h:a}),i&&(e.autoClearColor=!1,e.autoClearDepth=!0,e.autoClearStencil=!0,e.setRenderTarget(l),e.render(i,r),e.setRenderTarget(null),e.autoClearColor=!0);let d=h.context.getCurrentTexture();d.usage&GPUTextureUsage.COPY_DST&&d.width===o&&d.height===a&&this.#e.copyTexture(c,d,[o,a,1])}setStaticModelMatrix(e){this.#e.setStaticModelMatrix(e)}dispose(){this.#r.dispose(),this.#e.close(),this.#e.dispose()}};export{Qe as BoundaryRenderer,tt as ClassicControls,it as DebugRenderer,xt as ENV_PRESETS,qr as GRACIA_PLAYER_DEFAULT_CSS,Ze as GraciaApp,Ue as GraciaPlayer,It as GraciaReactPlayer,tr as GraciaSplats,we as Mat4,ot as ModernControls,$e as QuadLayer,ge as Quat,Ye as SceneManipulator,at as SceneOverlay,_r as SplatsMesh,Sr as SplatsRendererW3,Y as Vec3,ct as XROverlay,lt as XRRayRenderer,A as axis,Ot as bbox,qe as buildApiSources,Re as envCoefsFromPreset,Mr as envCoefsFromSH27,Vr as fetchStreamingMetadata,cr as installGraciaPlayerStyles,zt as loadGraciaModule,D as mat4,vn as mountGraciaPlayer,_ as num,Re as presetToLightProbe,$ as quat,rr as useGraciaPlayer,ir as useGraciaPlaylist,P as vec3};
