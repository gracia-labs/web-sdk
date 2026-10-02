var xn=.28209479177387814;function Ci(s,e=.5){let t=1/(xn*Math.max(s[0],s[1],s[2],.01));for(let r=0;r<3;r++)s[r]*=t;for(let r=3;r<12;r++)s[r]*=t*e}function Sr(s,e=null,t=.5){let r=new Float32Array(12);for(let i=0;i<12;i++)r[i]=s[i];if(e){let i=e[0]??e.x,n=e[1]??e.y,o=e[2]??e.z;if(r[9]*i+r[3]*n+r[6]*o>0)for(let a=3;a<12;a++)r[a]*=-1}return Ci(r,t),r}function Ce(s){let e=new Float32Array(12);return e.set(s.ambient,0),e.set(s.topDown,3),s.frontBack&&e.set(s.frontBack,6),s.leftRight&&e.set(s.leftRight,9),e}var ge=Object.freeze,pt=ge([0,0,0]),vn=ge([1,1,1]),Lt=ge([1,0,0]),ut=ge([0,1,0]),ki=ge([0,0,1]),Pr=ge([0,0,-1]),_n=.25,A=ge({X:Lt,Y:ut,Z:ki,FORWARD:Pr,FLIP_X:ge([-1,1,1]),FLIP_Z:ge([1,1,-1])}),w={clamp:(s,e,t)=>Math.min(t,Math.max(e,s)),clampInt:(s,e,t)=>w.clamp(s|0,e,t),clamp01:s=>w.clamp(s,0,1),unlerp01:(s,e,t)=>t===e?0:w.clamp01((s-e)/(t-e)),finite:(s,e=0)=>Number.isFinite(s)?s:e,wrapPi(s){return s>Math.PI?s-2*Math.PI:s<-Math.PI?s+2*Math.PI:s},wrap(s,e){return e>0?(s%e+e)%e:0},wrapDelta(s,e){return e>0?s-e*Math.round(s/e):s},signedClamp(s,e,t){return s===0?0:w.clamp(Math.abs(s),e,t)*Math.sign(s)},zoomStep(s,e=.05,t=10){return s>0?w.signedClamp(Math.log2(s),e,t):0},absLogRatio(s,e){return s>0&&e>0?Math.abs(Math.log(s/e)):0},outside(s,e){return Math.abs(s)>e},perspectiveScale(s,e,t){return 2*s*Math.tan(e*Math.PI/360)/Math.max(1,t)},deadzone(s,e){let t=Math.abs(s);return t<e?0:((t-e)/(1-e))**2*Math.sign(s)},deltaSeconds(s,e,t=0,r=_n){return e?Math.min((s-e)/1e3,r):t}},At={center(s,e){return s[0]=(e.minX+e.maxX)*.5,s[1]=(e.minY+e.maxY)*.5,s[2]=(e.minZ+e.maxZ)*.5,s}},K=class extends Float32Array{constructor(e){super(3),e&&this.from(e)}set(e,t,r){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this)}fromXYZ(e){return this.set(e.x,e.y,e.z)}from(e){return typeof e.x=="number"?this.fromXYZ(e):this.set(e[0],e[1],e[2])}copy(e){return this.set(e[0],e[1],e[2])}add(e){return this[0]+=e[0],this[1]+=e[1],this[2]+=e[2],this}addXYZ(e=0,t=0,r=0){return this[0]+=e,this[1]+=t,this[2]+=r,this}addTo(e,t=pt){return e[0]=t[0]+this[0],e[1]=t[1]+this[1],e[2]=t[2]+this[2],e}addScaled(e,t){return this[0]+=e[0]*t,this[1]+=e[1]*t,this[2]+=e[2]*t,this}addDelta(e,t){return this[0]+=e[0]-t[0],this[1]+=e[1]-t[1],this[2]+=e[2]-t[2],this}sub(e,t){return t?(this[0]=e[0]-t[0],this[1]=e[1]-t[1],this[2]=e[2]-t[2],this):(this[0]-=e[0],this[1]-=e[1],this[2]-=e[2],this)}subXYZ(e,t){return this.set(e.x-t.x,e.y-t.y,e.z-t.z)}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this}multiply(e){return this[0]*=e[0],this[1]*=e[1],this[2]*=e[2],this}multiplyXYZ(e=1,t=1,r=1){return this[0]*=e,this[1]*=t,this[2]*=r,this}divide(e){return this[0]=e[0]?this[0]/e[0]:0,this[1]=e[1]?this[1]/e[1]:0,this[2]=e[2]?this[2]/e[2]:0,this}clampScalar(e,t){return this[0]=w.clamp(this[0],e,t),this[1]=w.clamp(this[1],e,t),this[2]=w.clamp(this[2],e,t),this}normalize(e=pt){let t=Math.hypot(this[0],this[1],this[2]);return Number.isFinite(t)&&t>1e-6?this.scale(1/t):this.copy(e)}setLength(e,t=Lt){return this.normalize(t).scale(e)}cross(e,t){let r=e[0],i=e[1],n=e[2],o=t[0],a=t[1],l=t[2];return this[0]=i*l-n*a,this[1]=n*o-r*l,this[2]=r*a-i*o,this}lerp(e,t){return this[0]+=t*(e[0]-this[0]),this[1]+=t*(e[1]-this[1]),this[2]+=t*(e[2]-this[2]),this}midXYZ(e,t){return this.set((e.x+t.x)*.5,(e.y+t.y)*.5,(e.z+t.z)*.5)}fromMat4Column(e,t){let r=t*4;return this.set(e[r],e[r+1],e[r+2])}transformMat4(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i+e[12],this[1]=e[1]*t+e[5]*r+e[9]*i+e[13],this[2]=e[2]*t+e[6]*r+e[10]*i+e[14],this}transformMat4Direction(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i,this[1]=e[1]*t+e[5]*r+e[9]*i,this[2]=e[2]*t+e[6]*r+e[10]*i,this}transformQuat(e){let t=this[0],r=this[1],i=this[2],n=e[0],o=e[1],a=e[2],l=e[3],c=l*t+o*i-a*r,h=l*r+a*t-n*i,p=l*i+n*r-o*t,u=-n*t-o*r-a*i;return this[0]=c*l+u*-n+h*-a-p*-o,this[1]=h*l+u*-o+p*-n-c*-a,this[2]=p*l+u*-a+c*-o-h*-n,this}fromYawPitch(e,t){let r=Math.cos(t);return this.set(r*Math.sin(e),Math.sin(t),-r*Math.cos(e))}yawPitch(e){return this[0]=Math.atan2(e[0],-e[2]),this[1]=Math.asin(w.clamp(e[1],-1,1)),this[2]=0,this}basisFromForward(e,t,r=ut){return this.cross(t,r).normalize(Lt),e.cross(this,t),this}yawPitchBasis(e,t,r,i,n){return r.fromYawPitch(e,t),i.copy(r).scale(-1),this.set(Math.cos(e),0,Math.sin(e)),n.cross(i,this),this}rollBasis(e,t){let r=Math.cos(t),i=Math.sin(t),n=this[0],o=this[1],a=this[2],l=e[0],c=e[1],h=e[2];return this.set(n*r+l*i,o*r+c*i,a*r+h*i),e.set(l*r-n*i,c*r-o*i,h*r-a*i),this}fromSphereDir(e,t){let r=Math.sin(t);return this.set(r*Math.sin(e),Math.cos(t),r*Math.cos(e))}polarY(e,t,r=1e-6){let i=e[0]-t[0],n=e[1]-t[1],o=e[2]-t[2],a=Math.max(r,Math.hypot(i,n,o));return this[0]=Math.atan2(i,o),this[1]=Math.acos(w.clamp(n/a,-1,1)),this[2]=a,this}equals(e,t=1e-6){return Math.abs(this[0]-e[0])<=t&&Math.abs(this[1]-e[1])<=t&&Math.abs(this[2]-e[2])<=t}toArray(){return[this[0],this[1],this[2]]}toXYZ(){return{x:this[0],y:this[1],z:this[2]}}distanceXYZ(e){return Math.hypot(this[0]-e.x,this[1]-e.y,this[2]-e.z)}dot(e){return this[0]*e[0]+this[1]*e[1]+this[2]*e[2]}get sqrLen(){return this[0]*this[0]+this[1]*this[1]+this[2]*this[2]}get len(){return Math.hypot(this[0],this[1],this[2])}get xzLen(){return Math.hypot(this[0],this[2])}get minComponent(){return Math.min(this[0],this[1],this[2])}get maxAbs(){return Math.max(Math.abs(this[0]),Math.abs(this[1]),Math.abs(this[2]))}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}},Re=class extends Float32Array{constructor(e){super(4),e?this.from(e):this.identity()}set(e,t,r,i){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this[3]=i,this)}fromXYZW(e){return this.set(e.x,e.y,e.z,e.w)}from(e){return typeof e.x=="number"?this.fromXYZW(e):this.set(e[0],e[1],e[2],e[3])}copy(e){return this.set(e[0],e[1],e[2],e[3])}identity(){return this.set(0,0,0,1)}normalize(){let e=Math.hypot(this[0],this[1],this[2],this[3]);return e>1e-6?this.scale(1/e):this.identity()}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this[3]*=e,this}setAxisAngle(e,t){let r=t*.5,i=Math.sin(r);return this.set(e[0]*i,e[1]*i,e[2]*i,Math.cos(r))}rotatePre(e,t){return this.mul(kt.setAxisAngle(e,t),this)}rotate(e,t){return this.mul(kt.setAxisAngle(e,t))}mul(e,t){let r=t?e:this,i=t??e,n=r[0],o=r[1],a=r[2],l=r[3],c=i[0],h=i[1],p=i[2],u=i[3];return this[0]=n*u+l*c+o*p-a*h,this[1]=o*u+l*h+a*c-n*p,this[2]=a*u+l*p+n*h-o*c,this[3]=l*u-n*c-o*h-a*p,this}invert(e=this){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return this.set(-e[0]*r,-e[1]*r,-e[2]*r,e[3]*r)}slerp(e,t){let r=e[0],i=e[1],n=e[2],o=e[3],a=this[0]*r+this[1]*i+this[2]*n+this[3]*o;a<0&&(a=-a,r=-r,i=-i,n=-n,o=-o);let l=1-t,c=t;if(1-a>1e-6){let h=Math.acos(a),p=Math.sin(h);l=Math.sin((1-t)*h)/p,c=Math.sin(t*h)/p}return this.set(l*this[0]+c*r,l*this[1]+c*i,l*this[2]+c*n,l*this[3]+c*o)}toXYZW(){return{x:this[0],y:this[1],z:this[2],w:this[3]}}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}get w(){return this[3]}set w(e){this[3]=e}},Be=class extends Float32Array{constructor(e){super(16),e?this.copy(e):this.identity()}copy(e){return super.set(e),this}identity(){return this.fill(0),this[0]=this[5]=this[10]=this[15]=1,this}multiply(e,t){return t?Tr(this,e,t):Tr(this,this,e)}preMultiply(e){return Tr(this,e,this)}fromTranslation(e){return this.identity(),this[12]=e[0],this[13]=e[1],this[14]=e[2],this}fromScaling(e){return this.identity(),this[0]=e[0],this[5]=e[1],this[10]=e[2],this}perspective(e,t,r,i){let n=1/Math.tan(e*Math.PI/360);return this.fill(0),this[0]=n/t,this[5]=n,this[10]=(i+r)/(r-i),this[11]=-1,this[14]=2*i*r/(r-i),this}cameraWorld(e,t,r=ut){let i=le.sub(e,t).normalize(ki),n=Ri.cross(r,i).normalize(Lt),o=wn.cross(i,n);return this.cameraWorldAxes(e,n,o,i)}cameraWorldAxes(e,t,r,i){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=0,this[4]=r[0],this[5]=r[1],this[6]=r[2],this[7]=0,this[8]=i[0],this[9]=i[1],this[10]=i[2],this[11]=0,this[12]=e[0],this[13]=e[1],this[14]=e[2],this[15]=1,this}fromQuat(e){return this.fromRotationTranslationScale(e,pt,vn)}fromTransform(e){let{rotation:t,translation:r,scale:i}=e;return kt.fromXYZW(t).normalize(),this.fromRotationTranslationScale(kt,le.fromXYZ(r),Ri.set(i.x,i.y,i.z))}fromRotationTranslationScale(e,t,r){let i=e[0],n=e[1],o=e[2],a=e[3],l=i+i,c=n+n,h=o+o,p=i*l,u=i*c,d=i*h,m=n*c,g=n*h,f=o*h,_=a*l,x=a*c,S=a*h,b=r[0],v=r[1],T=r[2];return this[0]=(1-(m+f))*b,this[1]=(u+S)*b,this[2]=(d-x)*b,this[3]=0,this[4]=(u-S)*v,this[5]=(1-(p+f))*v,this[6]=(g+_)*v,this[7]=0,this[8]=(d+x)*T,this[9]=(g-_)*T,this[10]=(1-(p+m))*T,this[11]=0,this[12]=t[0],this[13]=t[1],this[14]=t[2],this[15]=1,this}setPosition(e){return this[12]=e[0],this[13]=e[1],this[14]=e[2],this}translate(e){let t=e[0],r=e[1],i=e[2];return this[12]=this[0]*t+this[4]*r+this[8]*i+this[12],this[13]=this[1]*t+this[5]*r+this[9]*i+this[13],this[14]=this[2]*t+this[6]*r+this[10]*i+this[14],this[15]=this[3]*t+this[7]*r+this[11]*i+this[15],this}scale(e){let t=e[0],r=e[1],i=e[2];for(let n=0;n<4;n++)this[n]*=t,this[n+4]*=r,this[n+8]*=i;return this}fromPivot(e,t,r,i,n){return this.fromTranslation(e).scale(r).translate(i),this.multiply(Sn.fromQuat(t)),this.translate(le.copy(i).scale(-1)),n?this.multiply(n):this}pointTo(e,t=pt,r=1){return Ai(e,this,t,r)}poseTo(e){return Ii(e,this)}},le=new K,Ri=new K,wn=new K,kt=new Re,Sn=new Be;function Tr(s,e,t){let r=e[0],i=e[1],n=e[2],o=e[3],a=e[4],l=e[5],c=e[6],h=e[7],p=e[8],u=e[9],d=e[10],m=e[11],g=e[12],f=e[13],_=e[14],x=e[15],S=t[0],b=t[1],v=t[2],T=t[3];return s[0]=S*r+b*a+v*p+T*g,s[1]=S*i+b*l+v*u+T*f,s[2]=S*n+b*c+v*d+T*_,s[3]=S*o+b*h+v*m+T*x,S=t[4],b=t[5],v=t[6],T=t[7],s[4]=S*r+b*a+v*p+T*g,s[5]=S*i+b*l+v*u+T*f,s[6]=S*n+b*c+v*d+T*_,s[7]=S*o+b*h+v*m+T*x,S=t[8],b=t[9],v=t[10],T=t[11],s[8]=S*r+b*a+v*p+T*g,s[9]=S*i+b*l+v*u+T*f,s[10]=S*n+b*c+v*d+T*_,s[11]=S*o+b*h+v*m+T*x,S=t[12],b=t[13],v=t[14],T=t[15],s[12]=S*r+b*a+v*p+T*g,s[13]=S*i+b*l+v*u+T*f,s[14]=S*n+b*c+v*d+T*_,s[15]=S*o+b*h+v*m+T*x,s}function Ai(s,e,t=pt,r=1){let i=t[0]??0,n=t[1]??0,o=t[2]??0;return s[0]=e[0]*i+e[4]*n+e[8]*o+e[12],s[1]=e[1]*i+e[5]*n+e[9]*o+e[13],s[2]=e[2]*i+e[6]*n+e[10]*o+e[14],r!==1&&(s[0]*=r,s[1]*=r,s[2]*=r),s}function Li(s,e,t,r){let i=t[0],n=t[1],o=t[2];s[0]=e[0]*i+e[4]*n+e[8]*o,s[1]=e[1]*i+e[5]*n+e[9]*o,s[2]=e[2]*i+e[6]*n+e[10]*o;let a=Math.hypot(s[0],s[1],s[2]);if(Number.isFinite(a)&&a>1e-6){let l=1/a;s[0]*=l,s[1]*=l,s[2]*=l}else s[0]=r[0],s[1]=r[1],s[2]=r[2];return s}function Ii(s,e){return s[0]=e[12],s[1]=e[13],s[2]=e[14],Li(le,e,Pr,Pr),s[3]=le[0],s[4]=le[1],s[5]=le[2],Li(le,e,ut,ut),s[6]=le[0],s[7]=le[1],s[8]=le[2],s}function Tn(s,e,t){return e>1e-6?Math.min(t,(.5-s)/e):e<-1e-6?Math.min(t,(-.5-s)/e):t}var dt=class{#e;#r=new K;#t=new K;#i=new Re;#s=new Re;#o=new K;#n=new K;constructor({type:e,position:t,rotation:r,scale:i}){this.#e=e,this.#r.fromXYZ(t),this.#t.fromXYZ(i),this.#i.fromXYZW(r).normalize(),this.#s.copy(this.#i).invert()}clampPoint(e){if(this.#e==="sphere"){let r=this.#t.minComponent*.5,i=this.#o.sub(e,this.#r).len;i>r&&this.#o.scale(r/i).addTo(e,this.#r);return}let t=this.#a(e);t.maxAbs<=.5||t.clampScalar(-.5,.5).multiply(this.#t).transformQuat(this.#i).addTo(e,this.#r)}rayLimit(e,t,r){if(this.#e==="sphere"){let a=this.#t.minComponent*.5,l=this.#o.sub(e,this.#r),c=l.dot(t),h=c*c-(l.sqrLen-a*a);return h<=0?0:w.clamp(Math.sqrt(h)-c,0,r)}let i=this.#a(e),n=this.#n.copy(t).transformQuat(this.#s).divide(this.#t),o=r;for(let a=0;a<3;a++)o=Tn(i[a],n[a],o);return Math.max(0,o)}#a(e){return this.#o.sub(e,this.#r).transformQuat(this.#s).divide(this.#t)}},M={create:()=>new K},J={create:()=>new Re},H={create:()=>new Be,clone:s=>new Be(s),pointTo:Ai,poseTo:Ii};async function It(s="@gracia/web-sdk/wasm"){for(let e=0;;e++)try{let t=await import(s);return t.default??t}catch{await new Promise(r=>setTimeout(r,1e3))}}var Ft=class{#e;#r=0;constructor(e,t=512){this.#e=e,this.#r=e._malloc(t)}ptr(e=0){return this.#r+e}get f32(){return this.#e.HEAPF32}writeF32(e,t=0){this.#e.HEAPF32.set(e,this.#r+t>>2)}readF32(e,t=0){let r=this.#r+t;return new Float32Array(this.#e.HEAPF32.buffer,r,e)}free(){this.#r&&(this.#e._free(this.#r),this.#r=0)}};function Mr(s,e,...t){if(!e)return;let r=new TextEncoder,i=[],n=t.map(a=>{if(typeof a!="string")return a;let l=r.encode(a),c=s._malloc(l.length+1);return s.HEAPU8.set(l,c),s.HEAPU8[c+l.length]=0,i.push(c),c}),o=e(...n);for(let a of i)s._free(a);return o}var E=(s,e)=>s[`_Gracia_${e}`];async function Pn(){let s=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!s)throw new Error("WebGPU adapter not available");return await s.requestDevice({requiredLimits:{maxStorageBuffersPerShaderStage:10,maxComputeWorkgroupSizeX:256,maxBufferSize:s.limits.maxBufferSize,maxStorageBufferBindingSize:s.limits.maxStorageBufferBindingSize}})}var Bt=class s{#e;#r;#t=null;#i=0;constructor(e){this.#e=e,this.#r=new Ft(e)}static async boot(e,t,{maxSplatsCount:r=0}={}){let i=typeof e=="function"?await e({canvas:t}):e,n=await Pn();if(typeof e=="function"&&(i.preinitializedWebGPUDevice=n,i.WebGPU?.importJsDevice?.(n)),E(i,"Init")?.(r|0),!E(i,"Initialized")?.())throw new Error("Gracia init failed");return{module:new s(i),device:n}}get heap(){return this.#r}get backend(){return this.#t}get buildUnixTime(){return E(this.#e,"GetBuildTime")?.()??0}shutdownApp(){E(this.#e,"Shutdown")?.()}setCamera(e,t,r,i){let n=!!(r&&i),o=this.#r.ptr(),a=o>>2,l=this.#r.f32;l.set(e,a),n&&l.set(r,a+16),l.set(t,a+32),n&&l.set(i,a+48),E(this.#e,"SetCamera")?.(n,o)}getModelMatrix(){let e=E(this.#e,"GetModelMatrix");if(!e)return null;let t=this.#r.ptr(256);return e(t),this.#r.readF32(16,256)}setModelMatrix(e){let t=E(this.#e,"SetModelMatrix");t&&(this.#r.writeF32(e,256),t(this.#r.ptr(256)))}initPure(e){this.shutdownBackend(),this.#t="pure",E(this.#e,"P_Init")?.(e?1:0)}pureRenderTo(e,t,r,i){let n=this.#e.WebGPU,o=n?.importJsTexture?.(e)??0,a=t?n?.importJsTexture?.(t)??0:0;return E(this.#e,"P_RenderTo")?.(o,a,r,i)!==0}initHybrid(e){this.shutdownBackend(),this.registerGL(e),this.#t="hybrid",E(this.#e,"H_Init")?.()}hybridFrame(e,t,r){E(this.#e,"H_Frame")?.(e,t,r)}hybridPreprocess(e,t){return E(this.#e,"H_Preprocess")?.(e,t)??0}hybridRender(e,t,r,i,n,o){E(this.#e,"H_Render")?.(e,t,r,i,n,o)}hybridRenderMesh(e,t,r,i,n){this.#r.writeF32(e),E(this.#e,"H_RenderMeshMVP")?.(this.#r.ptr(),t,r,i,n)}hybridRenderMotionMV(e,t,r,i){E(this.#e,"H_RenderMotionMV")?.(e,t,r,i)}hybridCanMotion(){return!!E(this.#e,"H_CanMotion")?.()}hybridHasMultiview(){return!!E(this.#e,"H_HasMultiview")?.()}hybridReset(){E(this.#e,"H_Reset")?.()}registerGL(e){this.#i&&this.#e.GL?.deleteContext(this.#i);let t=this.#e.GL;if(!t)throw new Error("WASM GL layer not available");this.#i=t.registerContext(e,{majorVersion:2,minorVersion:0,enableExtensionsByDefault:!0}),t.makeContextCurrent(this.#i)}shutdownBackend(){this.#t==="pure"?E(this.#e,"P_Shutdown")?.():this.#t==="hybrid"&&E(this.#e,"H_Shutdown")?.(),this.#i&&(this.#e.GL?.deleteContext(this.#i),this.#i=0),this.#t=null}dispose(){this.shutdownBackend(),this.#r.free(),this.shutdownApp()}addDynamicScene(){return E(this.#e,"AddScene")?.()??0}addStaticScene(){return E(this.#e,"AddStaticScene")?.()??0}removeScene(e){E(this.#e,"RemoveScene")?.(e)}sceneReady(e){return e?(E(this.#e,"SceneReady")?.(e)??0)!==0:!1}sceneProgress(e){return e?E(this.#e,"SceneProgress")?.(e)??0:0}sceneDuration(e){return e?E(this.#e,"SceneDuration")?.(e)??0:0}sceneIsBuffering(e){return e?(E(this.#e,"SceneIsBuffering")?.(e)??0)!==0:!1}sceneLastFetchStatus(e){return e?E(this.#e,"SceneGetLastFetchStatus")?.(e)??0:0}sceneSetTime(e,t){E(this.#e,"SceneSetTime")?.(e,t)}sceneSetPlaybackRange(e,t,r){let i=E(this.#e,"SceneSetPlaybackRange");if(!i){if(t===0&&r===1/0)return;throw new Error("WASM playback range support unavailable. Use the matching GraciaWebCore build.")}i(e,t,r)}sceneSetVisible(e,t){E(this.#e,"SceneSetVisible")?.(e,t)}sceneGetBBox(e){let t=E(this.#e,"SceneGetBBox");if(!t||!e)return null;let r=this.#r.ptr(256);t(e,r);let i=r>>2,n=this.#r.f32;return n[i]===0&&n[i+1]===0&&n[i+2]===0&&n[i+3]===0&&n[i+4]===0&&n[i+5]===0?null:{minX:n[i],minY:n[i+1],minZ:n[i+2],maxX:n[i+3],maxY:n[i+4],maxZ:n[i+5]}}sceneSetEnvLighting(e,t,r){let i=E(this.#e,"SceneSetEnvPreset");if(!i||!e)return;let n=this.#r.ptr(128),o=n>>2,a=this.#r.f32;for(let l=0;l<4;l++)a[o+l*4]=t[l*3],a[o+l*4+1]=t[l*3+1],a[o+l*4+2]=t[l*3+2],a[o+l*4+3]=0;a[o+3]=r,i(e,n)}sceneClearEnvLighting(e){E(this.#e,"SceneClearEnvPreset")?.(e)}sceneSetModelMatrix(e,t){let r=E(this.#e,"SceneSetModelMatrix");!r||!e||(this.#r.writeF32(t,256),r(e,this.#r.ptr(256)))}sceneOpen(e,t){Mr(this.#e,E(this.#e,"SceneOpen"),e,t)}sceneOpenApi(e,t,r){Mr(this.#e,E(this.#e,"SceneOpenApi"),e,t,r)}registerLocalFile(e){let t=this.#e.graciaRegisterLocalFile;if(!t)throw new Error("WASM local-file bridge unavailable");return t(e)}sceneOpenLocal(e,t){E(this.#e,"SceneOpenLocal")?.(e,t)}sceneOpenStatic(e,t){let r=E(this.#e,"SceneOpenStatic");if(!r)return-1;let i=this.#e._malloc(t.length);this.#e.HEAPU8.set(t,i);try{return r(e,i,t.length)}finally{this.#e._free(i)}}};var Mn={panningModel:"HRTF",distanceModel:"inverse",refDistance:1,maxDistance:100,rolloffFactor:1},En=[0,0,0],Cn=[0,0,0,0,0,-1,0,1,0],Rn=.1,Ln=40,Fi=.01,Bi=.08,kn=1.5,zi=.05,An=2e3;function Oi(){typeof navigator<"u"&&navigator.audioSession&&(navigator.audioSession.type="playback")}function Ni(){return typeof performance<"u"?performance.now():Date.now()}function te(s,e,t,r=0){r>0?s.linearRampToValueAtTime(e,t.currentTime+r):s.setValueAtTime(e,t.currentTime)}function In(s,e,t){s.setTargetAtTime(e,t.currentTime,.01)}function zt(s){try{s.disconnect()}catch{}}function re(s,e){return Math.abs(s-e)<1e-4}function ee(s){try{s.automationRate="k-rate"}catch{}}function Er(s){s.positionX&&(ee(s.positionX),ee(s.positionY),ee(s.positionZ),"orientationX"in s?(ee(s.orientationX),ee(s.orientationY),ee(s.orientationZ)):(ee(s.forwardX),ee(s.forwardY),ee(s.forwardZ),ee(s.upX),ee(s.upY),ee(s.upZ)))}function Gi(s,e,t,r,i,n=0){te(s.positionX,e,i,n),te(s.positionY,t,i,n),te(s.positionZ,r,i,n)}function Fn(s,e,t,r,i,n,o,a,l=0){if("orientationX"in s){te(s.orientationX,e,a,l),te(s.orientationY,t,a,l),te(s.orientationZ,r,a,l);return}te(s.forwardX,e,a,l),te(s.forwardY,t,a,l),te(s.forwardZ,r,a,l),te(s.upX,i,a,l),te(s.upY,n,a,l),te(s.upZ,o,a,l)}var Cr=class{#e=null;#r=null;#t=[0,0,0];#i=[0,0,-1,0,1,0];#s=!1;#o=new Float32Array(9);#n=!1;constructor(){Oi(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&this.#e&&this.#e.state!=="running"&&this.resume()})}get ctx(){return this.#e}get destination(){return this.#r??this.#e?.destination??null}setOutput(e){e?.context&&e.context!==this.#e&&(this.#e=e.context,Er(this.#e.listener),this.#n=!1),this.#r=e?.destination??null,this.#s=e?.externalListener===!0,this.#l()}prepare(){let e=this.#a();if(!e)throw new Error("Web Audio is not supported in this browser");return{ctx:e,destination:this.destination??e.destination}}resume(){Oi();let e=this.#a();return e?e.state==="running"?Promise.resolve():e.resume().catch(()=>{}):Promise.resolve()}listener(e,t,r,i,n,o,a,l,c,h=0){this.#t=[e,t,r],this.#i=[i,n,o,a,l,c],this.#l(h)}resetListener(){this.listener(...Cn)}#a(){if(this.#e)return this.#e;if(typeof AudioContext>"u")return null;try{this.#e=new AudioContext}catch{return null}return Er(this.#e.listener),this.#n=!1,this.#l(),this.#e}#l(e=0){let t=this.#e?.listener;if(!t||this.#s)return;let[r,i,n]=this.#t,[o,a,l,c,h,p]=this.#i,u=this.#o;this.#n&&re(r,u[0])&&re(i,u[1])&&re(n,u[2])&&re(o,u[3])&&re(a,u[4])&&re(l,u[5])&&re(c,u[6])&&re(h,u[7])&&re(p,u[8])||(u.set([r,i,n,o,a,l,c,h,p]),this.#n=!0,Gi(t,r,i,n,this.#e,e),Fn(t,o,a,l,c,h,p,this.#e,e))}},de=new Cr,Rr=class{#e;#r;#t;#i;#s;#o;ready;#n=null;#a=[];#l=null;#c=!1;#h=!1;#p=!1;#u=!1;#f=!1;#m=0;#d=0;#g=0;#b=NaN;#v=NaN;#w=NaN;constructor(e,t={}){let{ctx:r,destination:i}=de.prepare();this.#e=r,this.#o=t.destination??i;let n=new Audio;this.#r=n,n.crossOrigin="anonymous",n.preload="auto",n.loop=!0,n.preservesPitch=!1,this.#i=r.createGain(),this.#s=r.createPanner(),Er(this.#s),this.pannerAttr({...Mn,...t.pannerAttr}),this.#t=r.createMediaElementSource(n),this.#t.connect(this.#s),this.#s.connect(this.#i),this.#i.connect(this.#o),this.volume(t.volume??1).rate(t.rate??1).pos(...t.pos??En),this.ready=new Promise(o=>{this.#n=o}),this.#x("loadedmetadata",()=>this.#C()),this.#x("canplay",()=>this.#S()),this.#x("loadeddata",()=>this.#S()),this.#x("error",()=>this.#P(`Media error ${n.error?.code??"unknown"}`)),n.src=e,n.load(),this.#S()}get context(){return this.#e}get blocked(){return this.#p}get failed(){return this.#c}get buffering(){return this.#y||this.#_&&this.#g>0}get clockRate(){return!this.#_||Math.abs(this.#d)<Fi?1:1+w.clamp(kn*this.#d,-zi,zi)}get#_(){return!this.#c&&!this.#p&&!this.#h}get#y(){return this.#_&&(!this.#u||this.#f||this.#r.paused||this.#r.readyState<3||this.#r.seeking||this.#l!==null)}#x(e,t){this.#a.push([e,t]),this.#r.addEventListener(e,t)}#S(){this.#r.readyState<3||this.#h||this.#T()}#T(){this.#n?.(),this.#n=null}#P(e){this.#h||this.#c||(this.#c=!0,this.pause(),this.#T())}allowPlayback(){this.#p=!1}play(){if(this.#c||this.#p||this.#h||this.#f||this.#u&&!this.#r.paused)return;let e=++this.#m;this.#f=!0;try{Promise.resolve(this.#r.play()).then(()=>{e!==this.#m||this.#h||(this.#f=!1,this.#u=!0)}).catch(t=>this.#M(e,t))}catch(t){this.#M(e,t)}}#M(e,t){e!==this.#m||this.#h||(this.#f=!1,this.#u=!1,t?.name==="NotAllowedError"?(this.#p=!0,this.#r.pause()):t?.name!=="AbortError"&&this.#P(t))}pause(){this.#m++,this.#f=!1,this.#u=!1,this.#R(),this.#r.paused||this.#r.pause()}unload(){this.pause(),this.#h=!0;for(let[e,t]of this.#a)this.#r.removeEventListener(e,t);this.#a=[],this.#r.removeAttribute("src"),this.#r.load(),this.#T(),zt(this.#t),zt(this.#s),zt(this.#i)}seek(e){return typeof e=="number"&&(this.#R(),this.#l=Number.isFinite(e)?Math.max(0,e):0,this.#C()),this.#l??this.#r.currentTime}#C(){if(this.#l===null||this.#r.readyState<1)return;let e=this.#r.duration,t=Number.isFinite(e)&&e>0?w.wrap(this.#l,e):this.#l;Math.abs(this.#r.currentTime-t)>.005&&(this.#r.currentTime=t),this.#l=null}sync(e){this.#c||this.#p||this.#h||(!this.#u||this.#r.paused)&&!this.#f&&(this.seek(e),this.play())}follow(e){if(this.#y||!this.#_||this.#e.state!=="running"){this.#R();return}let t=this.#r.currentTime-e,r=this.#r.duration;Number.isFinite(r)&&r>0&&(t=w.wrapDelta(t,r));let i=Ni();if(t<-Bi?this.#g||=i:t>-Fi&&(this.#g=0),t>Bi||this.#g&&i-this.#g>An){this.seek(e);return}this.#d=t}#R(){this.#d=0,this.#g=0}volume(e){return In(this.#i.gain,w.clamp01(e),this.#e),this}rate(e){return this.#r.playbackRate=w.clamp(w.finite(e,1),.1,4),this}pos(e,t,r,i=0){return re(e,this.#b)&&re(t,this.#v)&&re(r,this.#w)?this:(this.#b=e,this.#v=t,this.#w=r,Gi(this.#s,e,t,r,this.#e,i),this)}destination(e){let t=e??this.#e.destination;return t===this.#o?this:(zt(this.#i),this.#o=t,this.#i.connect(this.#o),this)}pannerAttr(e){return e?(e.panningModel&&(this.#s.panningModel=e.panningModel),e.distanceModel&&(this.#s.distanceModel=e.distanceModel),typeof e.refDistance=="number"&&(this.#s.refDistance=e.refDistance),typeof e.maxDistance=="number"&&(this.#s.maxDistance=e.maxDistance),typeof e.rolloffFactor=="number"&&(this.#s.rolloffFactor=e.rolloffFactor),this):this}},Ot=class{#e=null;#r=null;#t=[0,0,0];#i=M.create();#s=new Float32Array(9);#o={volume:1,rate:1,pannerAttr:{}};#n=!1;#a=0;#l=0;#c=0;#h=!1;get context(){return de.ctx}get isLoaded(){return!this.#h||!this.#n||de.ctx?.state!=="running"||this.#e?.blocked===!0}get isBuffering(){return this.#n&&(this.#e?.buffering??!1)}setOutput(e){if(de.setOutput(e),!!this.#e){if(this.#e.context!==de.ctx){let t=this.#r,r=this.#e.seek();this.unload(),t&&(this.load(t),this.#e?.seek(r));return}this.#e.destination(de.destination)}}async load(e){if(e===this.#r&&this.#e&&!this.#e.failed){await this.#e.ready;return}this.unload(),this.#r=e,this.#h=!0;let t=++this.#a;try{this.#e=new Rr(e,{...this.#o,pos:this.#t}),await this.#e.ready}catch{t===this.#a&&(this.#e?.unload(),this.#e=null,this.#r=null)}finally{t===this.#a&&(this.#h=!1)}}sync(e,t,r){let i=this.#e;return!this.#n||!r?(i?.pause(),!0):(i?.sync(e),i?.follow(e),!this.isBuffering)}get clockRate(){return this.#n?this.#e?.clockRate??1:1}seek(e){this.#e?.seek(e)}volume(e){this.#o.volume=w.clamp01(e),this.#e?.volume(this.#o.volume)}rate(e){this.#o.rate=e,this.#e?.rate(e)}setSpatial(e,t,r){this.#t=[e,t,r];let i=this.#p("spatial");i>=0&&this.#e?.pos(e,t,r,i)}setSourceMatrix(e,t,r=1){let i=e.pointTo?.(this.#i,t,r)??H.pointTo(this.#i,e,t,r);this.setSpatial(i.x,i.y,i.z)}setListenerMatrix(e){let t=this.#p("listener");if(t<0)return;let r=e.poseTo?.(this.#s)??H.poseTo(this.#s,e);de.listener(...r,t)}setPanner(e){Object.assign(this.#o.pannerAttr,e),this.#e?.pannerAttr(e)}stop(){this.#e?.pause()}get enabled(){return this.#n&&de.ctx?.state==="running"&&!this.#e?.blocked}enable(){this.#n=!0,de.resume(),this.#e?.allowPlayback()}disable(){this.#n=!1,this.#e?.pause()}unload(){this.#a++,this.#e?.unload(),this.#e=null,this.#r=null,this.#h=!1,de.resetListener()}#p(e){let t=Ni(),r=e==="listener"?this.#l:this.#c;return r&&t-r<Ln?-1:(e==="listener"?this.#l=t:this.#c=t,w.deltaSeconds(t,r,0,Rn))}};function Lr(s,e,t=0){if(!Number.isFinite(s)||!Number.isFinite(e)||s<0||e<=s)throw new RangeError("Playback range requires finite seconds with 0 <= start < end.");if(t>0&&s>=t)throw new RangeError("Playback range starts after the end of the video.");return{start:s,end:e}}function kr(s,e){return Math.max(e,s-Math.max(Number.MIN_VALUE,Math.abs(s)*Number.EPSILON))}var ft=class{#e;#r=0;#t=!1;constructor(e){this.#e=e}get id(){return this.#r}get isStatic(){return this.#t}get isReady(){return this.#e.sceneReady(this.#r)}get progress(){return this.#e.sceneProgress(this.#r)}get duration(){return this.#t?0:this.#e.sceneDuration(this.#r)}get isBuffering(){return this.#t?!1:this.#e.sceneIsBuffering(this.#r)}get lastFetchStatus(){return this.#e.sceneLastFetchStatus(this.#r)}setTime(e){this.#r&&!this.#t&&this.#e.sceneSetTime(this.#r,e)}setPlaybackRange(e){this.#r&&!this.#t&&this.#e.sceneSetPlaybackRange(this.#r,e?.start??0,e?.end??1/0)}setVisible(e){this.#r&&this.#e.sceneSetVisible(this.#r,e)}getBBox(){return this.#e.sceneGetBBox(this.#r)}setEnvLighting(e,t){this.#r&&this.#e.sceneSetEnvLighting(this.#r,e,t)}clearEnvLighting(){this.#r&&this.#e.sceneClearEnvLighting(this.#r)}setModelMatrix(e){this.#r&&this.#e.sceneSetModelMatrix(this.#r,e)}openDynamic(e){this.remove(),this.#r=this.#e.addDynamicScene(),this.#t=!1;try{this.setPlaybackRange(e.playbackRange??null)}catch(r){throw this.remove(),r}if(e.localFile||e.file){let r=e.localFile||e.file;this.#e.sceneOpenLocal(this.#r,this.#e.registerLocalFile(r));return}let t=e.url;if(e.token){this.#e.sceneOpenApi(this.#r,t,e.token);return}this.#e.sceneOpen(this.#r,t)}async openStatic(e){this.remove();let t=this.#e.addStaticScene();this.#r=t,this.#t=!0;let r=e.file?await e.file.arrayBuffer():await(await fetch(e.url)).arrayBuffer();this.#r===t&&this.#e.sceneOpenStatic(t,new Uint8Array(r))}remove(){this.#r&&(this.#e.removeScene(this.#r),this.#r=0)}};var Di={alpha:!0,premultipliedAlpha:!0,depth:!0,stencil:!1,antialias:!1,powerPreference:"high-performance",xrCompatible:!0},Ve=class s{#e;#r;#t=new Ot;#i=0;#s=null;#o=null;#n=null;#a=!1;#l=0;#c=0;#h=1;#p=null;#u=null;#f=0;#m=null;#d=null;static GL_CANVAS_OPTS=Di;constructor(e,t){this.#e=e,this.#r=t,typeof document<"u"&&document.addEventListener("visibilitychange",this.#g)}#g=()=>{document.hidden&&this.#t.stop()};static async create(e,{canvas:t,gl:r,backend:i,maxSplatsCount:n}={}){if(!t&&!r)throw new Error("canvas or gl required");let o=i??(r?"hybrid":"pure"),{module:a,device:l}=await Bt.boot(e,t||r.canvas,{maxSplatsCount:n}),c=new s(a,l);return o==="hybrid"?c.#w(r??s.#b(t)):c.#v(t),c}static preferredFormat(){return navigator.gpu.getPreferredCanvasFormat()}static#b(e){let t=e.getContext("webgl2",Di);if(!t)throw new Error("WebGL2 not available");return t}get device(){return this.#r}get backend(){return this.#e.backend}get buildUnixTime(){return this.#e.buildUnixTime}get gl(){return this.#d}get isBGRA(){return s.preferredFormat()==="bgra8unorm"}assertDevice(e){if(e&&e!==this.#r)throw new Error("WebGPU device must match GraciaPlayer.device")}configureSurface(e,t={}){let{format:r,alphaMode:i="premultiplied",usage:n}=t;e.configure({device:this.#r,format:r??s.preferredFormat(),alphaMode:i,...n!=null?{usage:n}:{}})}bindCanvas(e,t={}){let r=e.getContext("webgpu");if(!r)throw new Error("WebGPU canvas context not available");return this.configureSurface(r,t),this.#m=r,r}setBackend(e,{canvas:t,gl:r}={}){if(this.shutdown(),e==="hybrid"){if(!r&&!t)throw new Error("canvas or gl required for hybrid backend");this.#w(r??s.#b(t))}else this.#v(t)}present(e,t){e===0||t===0||(this.#e.backend==="hybrid"?this.#y(e,t):this.#_())}renderTextures({color:e,depth:t,w:r,h:i}){return this.#P(),this.#e.backend!=="pure"?!1:this.#e.pureRenderTo(e,t,r,i)}copyTexture(e,t,r=null){let i=r??[e.width,e.height,1],n=this.#r.createCommandEncoder();n.copyTextureToTexture({texture:e},{texture:t},i),this.#r.queue.submit([n.finish()])}renderHybridViewport(e,t,{gl:r,drawMode:i,enableMesh:n=!1,x:o=0,y:a=0,eye:l=0}={}){let c=r??this.#d;if(!c)throw new Error("No WebGL context");let h=i??this.#i;this.preprocess(e,t),c.enable(c.DEPTH_TEST),c.depthFunc(c.LEQUAL),c.depthMask(!1),this.render(h,o,a,e,t,l),n&&(c.colorMask(!1,!1,!1,!1),c.depthMask(!0),this.render(1,o,a,e,t,l),c.colorMask(!0,!0,!0,!0)),c.depthMask(!0)}shutdown(){this.#e.shutdownBackend(),this.#d=null,this.#m=null}#v(e){this.#d=null,this.#m=null,this.#r.pushErrorScope("validation"),this.#e.initPure(this.isBGRA),this.#r.popErrorScope().then(t=>{}),e&&this.bindCanvas(e)}#w(e){this.#m=null,this.#d=e,this.#e.initHybrid(e)}#_(){if(!this.#m)throw new Error("bindCanvas() required");let{width:e,height:t}=this.#m.canvas;e===0||t===0||this.renderTextures({color:this.#m.getCurrentTexture(),w:e,h:t})}#y(e,t){let r=this.#d;if(!r)throw new Error("hybrid backend required");r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clearDepth(1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.disable(r.DEPTH_TEST),this.frame(e,t,this.#i)}get drawMode(){return this.#i}set drawMode(e){this.#i=w.clampInt(e,0,3)}get#x(){return this.#s??this.#o}get isReady(){return!this.#u&&(this.#x?.isReady??!1)&&this.#t.isLoaded}get progress(){return this.#x?.progress??0}get duration(){return this.#s?.duration??0}get playbackRange(){return this.#p?{start:this.#p.start,end:this.playbackEnd}:null}get playbackStart(){return this.#p?.start??0}get playbackEnd(){let e=this.duration;return this.#p?e>0?Math.min(this.#p.end,e):this.#p.end:e}get rangeDuration(){return Math.max(0,this.playbackEnd-this.playbackStart)}get rangeTime(){return w.clamp(this.#l-this.playbackStart,0,this.rangeDuration)}get loopCount(){return this.#f}get error(){return this.#u}get currentTime(){return this.#l}get isPlaying(){return this.#a}get isBuffering(){return(this.#s?.isBuffering??!1)||this.#a&&this.#t.isBuffering}get lastFetchStatus(){return this.#x?.lastFetchStatus??0}play(){this.#a=!0,this.#T()}pause(){this.#a=!1,this.#c=0,this.#t.stop()}seek(e){if(!Number.isFinite(e))throw new RangeError("Seek time must be finite.");let t=this.playbackStart,r=this.playbackEnd;this.#S(r>t?w.clamp(e,t,kr(r,t)):Math.max(t,e))}setPlaybackRange(e,t){let r=Lr(e,t,this.duration);if(!this.#s)throw new Error("Open a video before setting its playback range.");this.#s.setPlaybackRange(r),this.#p=r,this.#u=null,this.#s.setVisible(!0),(this.#l<e||this.#l>=this.playbackEnd)&&this.#S(e),this.#s.setTime(this.#l)}clearPlaybackRange(){this.#s?.setPlaybackRange(null),this.#p=null,this.#u=null,this.#s?.setVisible(!0)}get speed(){return this.#h}setSpeed(e){this.#h=w.clamp(w.finite(e,1),.1,4),this.#t.rate(this.#h)}close(){this.#p=null,this.#u=null,this.#f=0,this.#s?.remove(),this.#s=null,this.#o?.remove(),this.#o=null,this.#l=0,this.#c=0,this.#a=!1,this.#t.unload()}clearVideo(){this.#p=null,this.#u=null,this.#f=0,this.#s?.remove(),this.#s=null,this.#l=0,this.#c=0,this.#a=!1,this.#t.unload()}clearEnvironment(){this.#o?.remove(),this.#o=null}#S(e){this.#l=e,this.#c=0,this.#t.seek(e)}#T(){let e=this.#a&&(this.#s?.isReady??!1)&&!this.#s?.isBuffering;return this.#t.sync(this.#l,this.duration,e)}#P(){if(!this.#s||this.#u)return;let e=this.playbackStart,t=this.playbackEnd;if(this.#p&&this.duration>0&&e>=t){this.#u=new RangeError("Playback range starts after the end of the video."),this.pause(),this.#s.setVisible(!1);return}let r=t-e;r>0&&(this.#l<e||this.#l>=t)&&this.#S(e);let i=performance.now(),n=this.#T(),o=this.#a&&this.#s.isReady&&!this.#s.isBuffering&&n;if(o&&this.#c>0){let a=this.#l+w.deltaSeconds(i,this.#c)*this.#h*this.#t.clockRate;if(r>0&&a>=t){this.#f+=Math.floor((a-e)/r);let l=e+w.wrap(a-e,r);this.#l=Math.min(l,kr(t,e)),this.#p&&this.#t.seek(this.#l)}else this.#l=a}this.#c=o?i:0,this.#s.setTime(this.#l)}open(e){if(e.type==="static")return this.#M(e);let t=e.playbackRange==null?null:Lr(e.playbackRange.start,e.playbackRange.end);this.#t.unload(),this.#s||(this.#s=new ft(this.#e)),this.#s.openDynamic({...e,playbackRange:t}),this.#C(this.#s),this.#p=t,this.#u=null,this.#f=0,this.#l=t?.start??0,this.#c=0,this.#a=!1,e.audio&&this.#t.load(e.audio)}async#M(e){this.#o||(this.#o=new ft(this.#e)),await this.#o.openStatic(e),this.#C(this.#o)}get audioContext(){return this.#t.context}get audioEnabled(){return this.#t.enabled}enableAudio(){this.#t.enable(),this.#T()}disableAudio(){this.#t.disable()}setAudioOutput(e){this.#t.setOutput(e)}setVolume(e){this.#t.volume(e)}loadAudio(e){return this.#t.load(e)}setAudioSpatial(e,t,r){this.#t.setSpatial(e,t,r)}setAudioSourceMatrix(e,t,r){this.#t.setSourceMatrix(e,t,r)}setAudioListenerMatrix(e){this.#t.setListenerMatrix(e)}setAudioPanner(e){this.#t.setPanner(e)}setCamera(e,t,r,i){this.#e.setCamera(e,t,r,i)}getBBox(){return this.#x?.getBBox()??null}getModelMatrix(){return this.#e.getModelMatrix()}setModelMatrix(e){this.#e.setModelMatrix(e)}setStaticModelMatrix(e){this.#o?.setModelMatrix(e)}setEnvLighting(e,t=1){this.#n={coefs:Float32Array.from(e),scale:t},this.#s?.setEnvLighting(e,t),this.#o?.setEnvLighting(e,t)}clearEnvLighting(){this.#n=null,this.#s?.clearEnvLighting(),this.#o?.clearEnvLighting()}#C(e){this.#n&&e.setEnvLighting(this.#n.coefs,this.#n.scale)}frame(e,t,r){this.#P(),this.#e.hybridFrame(e,t,r)}preprocess(e,t){return this.#P(),this.#e.hybridPreprocess(e,t)}render(e,t,r,i,n,o){this.#e.hybridRender(e,t,r,i,n,o)}renderMesh(e,t,r,i,n){this.#e.hybridRenderMesh(e,t,r,i,n)}renderMotionMV(e,t,r,i){this.#e.hybridRenderMotionMV(e,t,r,i)}canMotion(){return this.#e.hybridCanMotion()}hasMultiview(){return this.#e.hybridHasMultiview()}resetXR(){this.#e.hybridReset()}dispose(){typeof document<"u"&&document.removeEventListener("visibilitychange",this.#g),this.close(),this.#t.unload(),this.shutdown(),this.#e.dispose()}};var mt={daylight:{ambient:[3.62,3.54,3.37],topDown:[.5,.45,.4]},cloudy:{ambient:[3.19,3.26,3.44],topDown:[.05,.05,.07]},sunset:{ambient:[4.08,3.01,1.95],topDown:[.25,.12,.02],frontBack:[.15,.06,0],leftRight:[-.3,-.12,0]},indoor:{ambient:[3.72,3.37,2.84],topDown:[.3,.25,.15]},shade:{ambient:[3.12,3.3,3.72],topDown:[.1,.15,.3]},night:{ambient:[2.48,2.66,3.01],topDown:[.08,.1,.15]},off:null};var Bn=2.5,Hi=1.6,zn=.0015,On=2,Xi=.5,Nn=.6,Gn=.022,Dn=1e-4,Nt=Math.PI/2-.01,Gt=.05,Dt=200,Xn=new Set(["w","a","s","d","r","f","q","e","shift"]),gt=class{#e;#r=new Map;#t=null;#i=1;#s;#o;#n;#a=0;#l=0;#c=0;#h=0;#p=0;#u=e=>e.preventDefault();constructor(e,{pan:t=!0,rotate:r=Bn,onDown:i}={}){this.#e=e,this.#s=t,this.#o=r,this.#n=i,this.#i=e.clientHeight||1,e.addEventListener("contextmenu",this.#u),e.addEventListener("pointerdown",this.#f),e.addEventListener("wheel",this.#g,{passive:!1})}get height(){return this.#i}consume(e){return e.rotX=this.#a,e.rotY=this.#l,e.panX=this.#c,e.panY=this.#h,e.zoom=this.#p,this.#a=this.#l=this.#c=this.#h=this.#p=0,e}dispose(){this.#e.removeEventListener("contextmenu",this.#u),this.#e.removeEventListener("pointerdown",this.#f),this.#e.removeEventListener("wheel",this.#g),window.removeEventListener("pointermove",this.#m),window.removeEventListener("pointerup",this.#d),window.removeEventListener("pointercancel",this.#d),this.#r.clear(),this.#t=null}#f=e=>{this.#e.setPointerCapture?.(e.pointerId),this.#r.size===0&&(window.addEventListener("pointermove",this.#m),window.addEventListener("pointerup",this.#d),window.addEventListener("pointercancel",this.#d)),this.#r.set(e.pointerId,{x:e.clientX,y:e.clientY,button:e.button,touch:e.pointerType==="touch"}),this.#i=this.#e.clientHeight||this.#i,this.#r.size===2&&this.#b(),this.#n?.()};#m=e=>{let t=this.#r.get(e.pointerId);if(!t)return;let r=e.clientX-t.x,i=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,this.#r.size>=2)return this.#v();!t.touch&&(t.button===2||e.buttons===2)?this.#s&&(this.#c+=r,this.#h+=i):(this.#a+=r/this.#i*this.#o,this.#l+=i/this.#i*this.#o)};#d=e=>{this.#e.releasePointerCapture?.(e.pointerId),this.#r.delete(e.pointerId),this.#t=null,this.#r.size===0&&(window.removeEventListener("pointermove",this.#m),window.removeEventListener("pointerup",this.#d),window.removeEventListener("pointercancel",this.#d))};#g=e=>{e.preventDefault(),this.#p+=-e.deltaY*zn};#b(){let[e,t]=this.#r.values();this.#t={dist:Math.hypot(e.x-t.x,e.y-t.y),cx:(e.x+t.x)/2,cy:(e.y+t.y)/2}}#v(){let[e,t]=this.#r.values(),r=Math.hypot(e.x-t.x,e.y-t.y),i=(e.x+t.x)/2,n=(e.y+t.y)/2,o=this.#t;o&&(o.dist>0&&r>0&&(this.#p+=Math.log(r/o.dist)),this.#s&&(this.#c+=i-o.cx,this.#h+=n-o.cy)),this.#t={dist:r,cx:i,cy:n}}},Hn=s=>1-Math.exp(-s/Gn),ie=()=>({rotX:0,rotY:0,panX:0,panY:0,zoom:0}),Vn=s=>Math.abs(s.rotX)+Math.abs(s.rotY)+Math.abs(s.panX)+Math.abs(s.panY)+Math.abs(s.zoom)<Dn;function Br(s,e,t,r,i){let n=s.consume(e);if(t.rotX+=n.rotX,t.rotY+=n.rotY,t.panX+=n.panX,t.panY+=n.panY,t.zoom+=n.zoom,Vn(t))return!1;let o=Hn(i);for(let a of["rotX","rotY","panX","panY","zoom"])r[a]=t[a]*o,t[a]-=r[a];return!0}var Ar=class{#e;#r;#t=M.create();#i=M.create();#s=M.create();#o=M.create();#n=M.create();#a=M.create();#l=1;#c=0;#h=0;#p=!1;#u=null;#f=ie();#m=ie();#d=ie();constructor(e,t){this.#e=e,this.#r=new gt(t),this.#_()}get type(){return"orbit"}update(e){this.#b(e)&&this.#_()}frame(e,t){this.#y(e,t)}reset(e,t){this.#y(e,t)}zoom(e){e>0&&(this.#m.zoom+=Math.log(e))}setBounds(e){this.#u=e,this.#_()}applyConstraints(e){this.#p=e,this.#h=w.clamp(this.#h,-Nt,this.#g),this.#_()}dispose(){this.#r.dispose()}get#g(){return this.#p?0:Nt}#b(e){if(!Br(this.#r,this.#f,this.#m,this.#d,e))return!1;let t=this.#d;return this.#c+=t.rotX,this.#h=w.clamp(this.#h-t.rotY,-Nt,this.#g),t.zoom&&(this.#l=w.clamp(this.#l*Math.exp(-t.zoom),Gt,Dt)),(t.panX||t.panY)&&this.#w(t.panX,t.panY),!0}#v(){this.#o.yawPitchBasis(this.#c,this.#h,this.#i,this.#s,this.#n)}#w(e,t){this.#v();let r=w.perspectiveScale(this.#l,this.#e.fov,this.#r.height)*Hi;this.#t.addScaled(this.#o,-e*r).addScaled(this.#n,t*r)}#_(){this.#v();let e=this.#l;this.#u&&(this.#u.clampPoint(this.#t),e=Math.min(e,this.#u.rayLimit(this.#t,this.#s,e))),this.#e.position.copy(this.#s).scale(e).add(this.#t),this.#e.setAxes(this.#o,this.#n,this.#s)}#y(e,t){this.#t.from(e),this.#s.sub(this.#a.from(t),this.#t),this.#l=w.clamp(this.#s.len,Gt,Dt),this.#i.copy(this.#s).scale(-1).normalize(A.FORWARD),this.#a.yawPitch(this.#i),this.#c=this.#a.x,this.#h=w.clamp(this.#a.y,-Nt,this.#g),this.#m=ie(),this.#_()}},Ir=class{#e;#r;#t=new Set;#i=J.create();#s=M.create();#o=M.create();#n=M.create();#a=M.create();#l=M.create();#c=null;#h=ie();#p=ie();#u=ie();constructor(e,t){this.#e=e,t.hasAttribute("tabindex")||(t.tabIndex=0),this.#r=new gt(t,{pan:!1,onDown:()=>t.focus()}),window.addEventListener("keydown",this.#g),window.addEventListener("keyup",this.#b)}get type(){return"fly"}update(e){let t=this.#f(e);this.#m(e)&&(t=!0),t&&this.#d()}frame(e,t){this.reset(e,t)}reset(e,t){this.#e.position.from(t),this.#s.sub(this.#l.from(e),this.#e.position).normalize(A.FORWARD),this.#l.yawPitch(this.#s),this.#i.identity().rotate(A.Y,-this.#l.x).rotate(A.X,this.#l.y),this.#p=ie(),this.#d()}zoom(e){e>0&&(this.#p.zoom+=Math.log(e))}setBounds(e){this.#c=e,this.#d()}applyConstraints(e){}dispose(){this.#r.dispose(),window.removeEventListener("keydown",this.#g),window.removeEventListener("keyup",this.#b),this.#t.clear()}#f(e){let t=On*e*(this.#t.has("shift")?4:1),r=this.#e.position,i=!1,n=(a,l)=>{r.addScaled(a,l),i=!0},o=a=>{this.#i.rotate(A.Z,a),i=!0};return this.#t.has("w")&&n(this.#s,t),this.#t.has("s")&&n(this.#s,-t),this.#t.has("d")&&n(this.#n,t),this.#t.has("a")&&n(this.#n,-t),this.#t.has("r")&&n(this.#a,t),this.#t.has("f")&&n(this.#a,-t),this.#t.has("q")&&o(Xi*e),this.#t.has("e")&&o(-Xi*e),i}#m(e){if(!Br(this.#r,this.#h,this.#p,this.#u,e))return!1;let t=this.#u;return t.rotX&&this.#i.rotate(A.Y,-t.rotX),t.rotY&&this.#i.rotate(A.X,-t.rotY),t.zoom&&this.#e.position.addScaled(this.#s,t.zoom*Nn),!0}#d(){this.#c?.clampPoint(this.#e.position),this.#i.normalize(),this.#n.copy(A.X).transformQuat(this.#i),this.#a.copy(A.Y).transformQuat(this.#i),this.#o.copy(A.Z).transformQuat(this.#i),this.#s.copy(this.#o).scale(-1),this.#e.setAxes(this.#n,this.#a,this.#o)}#g=e=>{let t=e.key.toLowerCase();!Xn.has(t)||this.#v()||(this.#t.add(t),e.preventDefault())};#b=e=>{this.#t.delete(e.key.toLowerCase())};#v(){let e=document.activeElement;return e?.tagName==="INPUT"||e?.tagName==="TEXTAREA"||e?.isContentEditable}},Fr=class{#e;#r;#t=M.create();#i=M.create();#s=M.create().copy(A.Y);#o=M.create();#n=M.create();#a=M.create();#l=M.create();#c=M.create();#h=M.create();#p=J.create();#u=null;#f=ie();#m=ie();#d=ie();constructor(e,t){this.#e=e,this.#r=new gt(t)}get type(){return"trackball"}update(e){if(!Br(this.#r,this.#f,this.#m,this.#d,e))return;let t=this.#d;(t.rotX||t.rotY)&&this.#b(t.rotX,t.rotY),t.zoom&&this.#v(t.zoom),(t.panX||t.panY)&&this.#w(t.panX,t.panY),this.#_()}frame(e,t){this.#y(e,t)}reset(e,t){this.#y(e,t)}zoom(e){e>0&&(this.#m.zoom+=Math.log(e))}setBounds(e){this.#u=e,this.#_()}applyConstraints(e){}dispose(){this.#r.dispose()}#g(){this.#o.copy(this.#i).normalize(A.Z),this.#n.cross(this.#s,this.#o).normalize(A.X),this.#a.cross(this.#o,this.#n)}#b(e,t){this.#g(),this.#l.copy(this.#n).scale(e).addScaled(this.#a,-t);let r=this.#l.len;r<1e-6||(this.#c.cross(this.#l,this.#i).normalize(A.Y),this.#p.setAxisAngle(this.#c,r),this.#i.transformQuat(this.#p),this.#s.transformQuat(this.#p).normalize())}#v(e){this.#i.setLength(w.clamp(this.#i.len*Math.exp(-e),Gt,Dt))}#w(e,t){this.#g();let r=w.perspectiveScale(this.#i.len,this.#e.fov,this.#r.height)*Hi;this.#t.addScaled(this.#n,-e*r).addScaled(this.#a,t*r)}#_(){if(this.#u){this.#u.clampPoint(this.#t);let e=this.#i.len,t=this.#u.rayLimit(this.#t,this.#o.copy(this.#i).normalize(A.Z),e);t<e&&this.#i.scale(t/e)}this.#e.up.copy(this.#s),this.#e.position.copy(this.#t).add(this.#i),this.#e.lookAt(this.#t)}#y(e,t){this.#t.from(e),this.#i.sub(this.#h.from(t),this.#t),this.#i.setLength(w.clamp(this.#i.len,Gt,Dt)),this.#s.copy(A.Y),this.#g(),this.#s.copy(this.#a),this.#m=ie(),this.#_()}};function zr(s,e,t){switch(s){case"fly":return new Ir(e,t);case"trackball":return new Fr(e,t);default:return new Ar(e,t)}}var Or=class{position=M.create();target=M.create();up=M.create().copy(A.Y);matrixWorld=H.create();projectionMatrix=H.create();fov;aspect;near;far;constructor(e=60,t=1,r=.05,i=1e4){this.fov=e,this.aspect=t,this.near=r,this.far=i,this.updateProjectionMatrix(),this.updateMatrixWorld()}lookAt(e){return this.target.from(e),this.updateMatrixWorld()}updateProjectionMatrix(){this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far)}updateMatrixWorld(){return this.matrixWorld.cameraWorld(this.position,this.target,this.up),this.matrixWorld}setAxes(e,t,r){return this.up.copy(t),this.target.copy(this.position).addScaled(r,-1),this.matrixWorld.cameraWorldAxes(this.position,e,t,r)}},Vi=1.5,Ui=1,Un=[0,.4,0],Wn=-.25,Xt=class{#e=H.create();#r=M.create();#t=M.create();#i;#s;#o;#n=!1;#a=!1;#l=1;#c=null;#h=null;#p=null;constructor(e,t="orbit"){this.#o=e,this.#i=new Or,this.#s=zr(t,this.#i,e),this.#u()}get canPresent(){return this.#n}get controls(){return this.#s}get controlsType(){return this.#s.type}setControls(e){e!==this.#s.type&&(this.#s.dispose(),this.#s=zr(e,this.#i,this.#o),this.reset(),this.#s.setBounds(this.#c),this.#s.applyConstraints(this.#a))}setSceneTransform(e){e?this.#e.fromTransform(e):this.#e.identity(),this.#a=!!e,this.#s.applyConstraints(this.#a),this.#n=!1}setAudioPosition(e){e?this.#r.fromXYZ(e):this.#r.set(0,0,0)}setViewZSign(e){this.#l=e<0?-1:1,this.#n=!1}setBBox(e){if(!e)return;this.#e.pointTo(this.#t,At.center(this.#t,e)).addXYZ(0,Wn);let t=this.#t.toArray(),r=[0,Vi,Ui*this.#l];this.#h=t,this.#p=r,this.#s.frame(t,r),this.#n=!0}setCameraBounds(e){this.#c=e?new dt(e):null,this.#s.setBounds(this.#c)}update(e){this.#s.update(e)}apply(e,t,r){e.setModelMatrix(this.#e),t>0&&r>0&&(this.#i.aspect=t/r,this.#i.updateProjectionMatrix()),e.setCamera(this.#i.matrixWorld,this.#i.projectionMatrix),this.#n&&(e.setAudioSourceMatrix(this.#e,this.#r),e.setAudioListenerMatrix(this.#i.matrixWorld))}zoom(e){this.#s.zoom(e)}reset(){this.#h&&this.#p?(this.#s.frame(this.#h,this.#p),this.#n=!0):this.#u()}dispose(){this.#s.dispose()}#u(){this.#s.reset(Un,{x:0,y:Vi,z:Ui}),this.#n=!1}};var Ht=class{#e;#r;#t;#i;#s;#o;#n;#a;#l=null;#c=!1;#h=!1;#p=!1;#u=null;#f=0;onFrame=null;onBeforeRender=null;onEyeRender=null;onASWRender=null;onRefReset=null;onSessionEnd=null;externalLayers=[];constructor(e,t){this.#e=e,this.#r=t}get session(){return this.#t}get active(){return!!this.#t}get aswAvailable(){return!!this.onASWRender}get aswActive(){return this.#c&&!!this.#t}get layeredActive(){return this.#h&&!!this.#t}get isAR(){return this.#p&&!!this.#t}get defaultDt(){return 1/(this.#c?36:72)}get binding(){return this.#s}get refSpace(){return this.#i}set soundPosition(e){this.#u=e?[e.x,e.y,e.z]:null}async enter(e=!1){if(!navigator.xr||this.#t)return{isQuest:!1,isPico:!1,isAVP:!1};let t=this.#r,r=this.#e;this.#p=e,this.#l=t.getExtension("OCULUS_multiview")||t.getExtension("OVR_multiview2")||null;let i=navigator.userAgent,n=/PicoBrowser/i.test(i),o=/OculusBrowser/i.test(i)&&!n,a=/Version\//.test(i)&&/Safari\//.test(i)&&!o&&!n;if(this.#t=await navigator.xr.requestSession(e?"immersive-ar":"immersive-vr",{optionalFeatures:["local-floor",e&&"local",o&&"layers",o&&"space-warp",(o||n)&&"hand-tracking"].filter(Boolean)}),!this.#t)throw new Error(`Failed to start ${e?"AR":"VR"} session`);let l=new Set(this.#t.enabledFeatures??[]);for(let h of["local-floor","local","viewer"])try{this.#i=await this.#t.requestReferenceSpace(h);break}catch{}this.#i?.addEventListener("reset",()=>this.onRefReset?.()),this.#h=this.#c=!1;let c=n?.75:1;if(l.has("layers"))try{t.getExtension("EXT_color_buffer_half_float"),this.#s=new XRWebGLBinding(this.#t,t),this.#o=this.#s.createProjectionLayer({textureType:"texture-array",depthFormat:t.DEPTH_COMPONENT24,scaleFactor:c,...e&&{clearOnAccess:!1}}),this.#h=!0,this.#c=l.has("space-warp"),!this.#c&&this.#o.fixedFoveation!==void 0&&(this.#o.fixedFoveation=1),await this.#t.updateRenderState({layers:[this.#o]}),this.#n=t.createFramebuffer(),this.#c&&(this.#a=t.createFramebuffer())}catch{this.#h=this.#c=!1,this.#s=this.#o=null}if(!this.#h){let h=new XRWebGLLayer(this.#t,t,{framebufferScaleFactor:c,...e&&{alpha:!0}});h.fixedFoveation!==void 0&&(h.fixedFoveation=1),await this.#t.updateRenderState({baseLayer:h})}return r.resetXR(),this.#t.addEventListener("end",()=>this.#b()),this.#f=0,this.#t.requestAnimationFrame(this.#m),{isQuest:o,isPico:n,isAVP:a}}#m=(e,t)=>{let r=this.#t;if(!r)return;r.requestAnimationFrame(this.#m);let i=w.deltaSeconds(e,this.#f,this.defaultDt,4*this.defaultDt);this.#f=e,this.onFrame?.(i,t)};exit(){this.#t?.end()}renderFrame(e,t,r=1){let i=this.#e,n=this.#r,o=t.getViewerPose(this.#i);if(!o||o.views.length<1)return;let a=this.#v(o);if(!this.#p&&a.length<2){this.#d(i,o,r);return}(a.length>=2||this.#p)&&(this.onBeforeRender?.(e,t,this.#i,o,t.session.inputSources,i),this.#g());let l=a[1]??null;i.setCamera(a[0].transform.matrix,a[0].projectionMatrix,l?.transform.matrix,l?.projectionMatrix),this.#c?this.#S(n,i,a):this.#h?this.#x(n,i,a):this.#y(n,i,a,t),this.#d(i,o,r)}#d(e,t,r){let i=this.#u;if(!i){let o=e.getBBox();o&&(i=[(o.minX+o.maxX)*.5,(o.minY+o.maxY)*.5,(o.minZ+o.maxZ)*.5])}let n=e.getModelMatrix();i&&n&&e.setAudioSourceMatrix(n,i,r),e.setAudioListenerMatrix(t.transform.matrix)}#g(){!this.#t||!this.#h||this.#t.updateRenderState({layers:[this.#o,...this.externalLayers]})}#b=()=>{if(!this.#t)return;let e=this.#r;this.#n&&(e.deleteFramebuffer(this.#n),this.#n=null),this.#a&&(e.deleteFramebuffer(this.#a),this.#a=null),this.#t=this.#i=this.#o=this.#s=null,this.#c=this.#h=this.#p=!1,this.#f=0,this.externalLayers=[],this.onSessionEnd?.()};#v(e){if(e.views.length<2)return[e.views[0]];let t=e.views.find(i=>i.eye==="left")||e.views[0],r=e.views.find(i=>i.eye==="right")||e.views[1];return[t,r]}#w(e,t){e.bindFramebuffer(e.FRAMEBUFFER,t),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.clearColor(0,0,0,this.#p?0:1)}#_(e,t,r,i,n,o,a,l,c,h=e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT){e.viewport(n,o,a,l),e.clear(h),t.render(t.drawMode,n,o,a,l,c),this.onEyeRender?.(e,r,i,n,o,a,l)}#y(e,t,r,i){let n=i.session.renderState.baseLayer,o=r.map(a=>n.getViewport(a));t.preprocess(o[0].width,o[0].height),e.bindFramebuffer(e.FRAMEBUFFER,n.framebuffer),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.clearColor(0,0,0,this.#p?0:1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.disable(e.DEPTH_TEST),e.depthMask(!1);for(let a=0;a<r.length;a++){let l=o[a];t.render(t.drawMode,l.x,l.y,l.width,l.height,a),this.onEyeRender?.(e,n.framebuffer,r[a],l.x,l.y,l.width,l.height)}}#x(e,t,r){let i=r.map(a=>this.#s.getViewSubImage(this.#o,a)),n=i[0].colorTextureWidth,o=i[0].colorTextureHeight;t.preprocess(n,o),this.#w(e,this.#n);for(let a=0;a<r.length;a++){let l=i[a],c=l.imageIndex??a;e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.colorTexture,0,c),l.depthStencilTexture&&e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,c),this.#_(e,t,this.#n,r[a],0,0,n,o,a)}e.bindFramebuffer(e.FRAMEBUFFER,null)}#S(e,t,r){let i=r.map(h=>this.#s.getViewSubImage(this.#o,h)),n=i[0].colorTextureWidth,o=i[0].colorTextureHeight,a=i.map((h,p)=>h.imageIndex??p);this.#o&&(this.#o.deltaPose=null),t.preprocess(n,o),this.#w(e,this.#n);for(let h=0;h<r.length;h++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[h].colorTexture,0,a[h]),this.#_(e,t,this.#n,r[h],0,0,n,o,h,e.COLOR_BUFFER_BIT);let l=i[0];if(l.motionVectorTexture&&l.depthStencilTexture){let h=l.motionVectorTextureWidth,p=l.motionVectorTextureHeight,u=t.canMotion();if(e.bindFramebuffer(e.FRAMEBUFFER,this.#a),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),e.clearColor(0,0,0,0),e.clearDepth(1),this.#l&&a.length>=2&&a[1]===a[0]+1&&t.hasMultiview())this.#l.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.motionVectorTexture,0,a[0],2),this.#l.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,a[0],2),e.viewport(0,0,h,p),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),u&&t.renderMotionMV(0,0,h,p);else for(let m=0;m<r.length;m++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[m].motionVectorTexture,0,a[m]),e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,i[m].depthStencilTexture,0,a[m]),e.viewport(0,0,h,p),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),u&&t.render(3,0,0,h,p,m);let d=(m,g,f)=>({view:m,colorTex:g.colorTexture,colorIdx:f,mvTex:g.motionVectorTexture,mvIdx:f,depthTex:l.depthStencilTexture,w:n,h:o,mvW:h,mvH:p});this.onASWRender?.(e,r.map((m,g)=>d(m,i[g],a[g])))}else this.onASWRender?.(e,r.map((h,p)=>({view:h,colorTex:i[p].colorTexture,colorIdx:a[p],w:n,h:o})));e.bindFramebuffer(e.FRAMEBUFFER,null)}};var Zi=H.create().fromScaling(A.FLIP_Z),Yn=H.create().fromScaling(A.FLIP_X),Zn=s=>s<0?Yn:Zi,Wi=H.create().copy(Zi).multiply(H.create().fromTranslation([0,1,-1])),qn=.04,ye=M.create(),yt=M.create(),Yi=M.create(),Vt=class{#e=M.create();#r=J.create();#t=1;#i=M.create();#s=H.clone(Wi);#o=H.create();#n="none";#a=M.create();#l={mid:M.create(),dist:0,axX:0,axZ:0};#c="undecided";#h=0;#p=0;#u=!1;#f=!1;#m=!1;get position(){return this.#e}get scale(){return this.#t}get sceneTransform(){return this.#s}get scaleLocked(){return this.#u}set scaleLocked(e){this.#u=!!e}setCenter(e,t,r){this.#i.set(e,t,r)}setSceneTransform(e,t=1){e?this.#s.fromTransform(e).preMultiply(Zn(t)):this.#s.copy(Wi)}resetToInitial(){this.#e.set(0,0,0),this.#t=1,this.#r.identity()}reset(){this.#n="none"}isHeld(e){return this.#n==="dual"||this.#n===e}update(e,t,r,i,n=!0){for(let p of r)this.#b(p,i);let o=e.gripTransform?.position,a=t.gripTransform?.position,l=n&&e.active&&e.gripping&&!!o,c=n&&t.active&&t.gripping&&!!a,h=l&&e.grabRestart||c&&t.grabRestart;l&&c?this.#g(o,a,h):l?this.#d("left",o,h):c?this.#d("right",a,h):this.reset()}buildModelMatrix(){return ye.copy(this.#i).transformMat4(this.#s),yt.set(this.#t,this.#t,-this.#t),this.#o.fromPivot(this.#e,this.#r,yt,ye,this.#s)}#d(e,t,r){if(r||this.#n!==e){this.#n=e,this.#a.fromXYZ(t);return}if(ye.fromXYZ(t).sub(this.#a),ye.sqrLen>.01){this.#a.fromXYZ(t);return}this.#e.add(ye),this.#a.fromXYZ(t)}#g(e,t,r){ye.midXYZ(e,t);let i=yt.fromXYZ(e).distanceXYZ(t),n=i||1,o=(t.x-e.x)/n,a=(t.z-e.z)/n,l=this.#l;if(r||this.#n!=="dual"){this.#n="dual",l.mid.copy(ye),l.dist=i,l.axX=o,l.axZ=a,this.#c="undecided",this.#h=0,this.#p=0;return}let c=0;l.dist>.03&&i>.03&&(c=w.absLogRatio(i,l.dist));let h=l.axX,p=l.axZ;l.axX=o,l.axZ=a;let u=w.unlerp01(Math.min(Math.hypot(h,p),Math.hypot(o,a)),.08,.33),d=0;if(u>0&&(d=w.wrapPi(Math.atan2(a,o)-Math.atan2(p,h))*u),this.#c==="undecided"){this.#h+=c,this.#p+=Math.abs(d);let m=qn;(this.#h>=m||this.#p>=m)&&(this.#c=this.#h>=this.#p?"scale":"rotate")}if(this.#c==="scale"&&!this.#u&&l.dist>.03&&i>.03){let m=this.#t;this.#t=w.clamp(m*(i/l.dist),.01,100);let g=this.#t-m;yt.copy(this.#i).transformMat4(this.#s),this.#e.add(Yi.copy(yt).multiplyXYZ(-g,-g,g))}this.#c==="rotate"&&w.outside(d,5e-4)&&this.#r.rotatePre(A.Y,d),this.#e.add(Yi.sub(ye,l.mid)),l.mid.copy(ye),l.dist=i}#b(e,t){let r=e.gamepad;if(!r?.axes||r.axes.length<2)return;if(e.handedness==="right"){let o=3.5*t,a=r.axes.length>=4?2:0,l=w.deadzone(r.axes[a],.15),c=w.deadzone(r.axes[a+1],.15);l&&this.#r.rotatePre(A.Z,-l*o),c&&this.#r.rotatePre(A.X,c*o)}let i=r.buttons?.[3]?.pressed??!1;e.handedness==="left"?(i&&!this.#f&&this.resetToInitial(),this.#f=i):(i&&!this.#m&&this.resetToInitial(),this.#m=i)}};var Ut=class{on=!1;#e=-1;update(e){this.#e<0?this.#e=e:this.#e=e>this.#e?e:(this.#e+e)*.5,this.on=this.#e<(this.on?.018:.015)}reset(){this.on=!1,this.#e=-1}},Wt=class s{static#e=30;static#r=300;static#t=.02;#i=M.create();#s=!1;#o=0;#n=null;tapped=!1;update(e,t){if(this.tapped=!1,e&&!this.#s)this.#o=performance.now(),this.#n=t?{x:t.x,y:t.y,z:t.z}:null;else if(!e&&this.#s){let r=performance.now()-this.#o,i=this.#n,n=i&&t?this.#i.fromXYZ(t).distanceXYZ(i):0;r>=s.#e&&r<=s.#r&&n<s.#t&&(this.tapped=!0)}this.#s=e}reset(){this.#s=!1,this.tapped=!1,this.#n=null}},Yt=class s{static#e=30;static#r=300;#t=!1;#i=0;tapped=!1;update(e){if(this.tapped=!1,e&&!this.#t)this.#i=performance.now(),this.#t=!0;else if(!e&&this.#t){let t=performance.now()-this.#i;t>=s.#e&&t<=s.#r&&(this.tapped=!0),this.#t=!1}}reset(){this.#t=!1,this.tapped=!1}},Zt=class{#e=[!1,!1];update(e){if(!e||e.length<=6)return 0;let t=e[5]?.pressed??!1,r=e[6]?.pressed??!1,i=t&&!this.#e[0]?-1:r&&!this.#e[1]?1:0;return this.#e[0]=t,this.#e[1]=r,i}reset(){this.#e[0]=this.#e[1]=!1}},qt=class{#e;left={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};right={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};stickSrcs=[];#r=null;#t=null;#i;#s;#o;#n;#a=new Yt;#l=new Yt;constructor({directGrab:e=!1}={}){this.#n=e,this.#e=J.create().setAxisAngle(A.X,-.8),this.#s=M.create(),this.#o=J.create(),this.#i=new Map([[this.left,{side:"left",pinch:new Ut,tap:new Wt,swipe:new Zt,smooth:M.create(),smoothActive:!1,rayPos:M.create(),rayOri:J.create(),rayActive:!1}],[this.right,{side:"right",pinch:new Ut,tap:new Wt,swipe:new Zt,smooth:M.create(),smoothActive:!1,rayPos:M.create(),rayOri:J.create(),rayActive:!1}]])}#c(e){e.active=e.gripping=e.isHandProfile=e.grabRestart=e.triggerPressed=e.menuPressed=e.isTransientPointer=!1,e.microSwipe=0,e.rayTransform=e.gripTransform=e.indexTip=e.thumbTip=null}read(e,t,r,i){this.#c(this.left),this.#c(this.right),this.stickSrcs.length=0;let n=null,o=null;for(let a of r||[]){if(a.targetRayMode==="transient-pointer"){let c=e.getPose(a.targetRaySpace,t);if(!c)continue;let p=((a.gripSpace?e.getPose(a.gripSpace,t):null)??c).transform,u=this.#h(a,p.position,n,o);this.#p(u,c.transform,p,a,i),u===this.left?n=a:o=a;continue}a.gripSpace&&!a.hand&&a.gamepad?.axes?.length>=2&&!a.profiles?.some(c=>c.includes("hand"))&&this.stickSrcs.push(a);let l=a.handedness==="left"?this.left:a.handedness==="right"?this.right:null;!l||l.active||(a.hand?this.#u(l,a,e,t,i):a.gripSpace&&this.#f(l,a,e,t,i))}this.#r=n,this.#t=o,(n||o)&&(this.stickSrcs.length=0,n||(this.left.gripping=!1),o||(this.right.gripping=!1)),i.uiActive?(this.#a.reset(),this.#l.reset()):(this.#a.update(!!n),this.#l.update(!!o)),this.#a.tapped&&(this.left.menuPressed=!0),this.#l.tapped&&(this.right.menuPressed=!0);for(let[a,l]of this.#i)a.indexTip||(l.pinch.reset(),l.tap.reset(),l.swipe.reset(),l.smoothActive=!1,l.rayActive=!1)}#h(e,t,r,i){if(e.handedness==="left")return this.left;if(e.handedness==="right")return this.right;if(r&&!i)return this.right;if(i&&!r)return this.left;let n=this.left.gripTransform?.position,o=this.right.gripTransform?.position,a=n?this.#s.fromXYZ(t).distanceXYZ(n):1/0,l=o?this.#s.fromXYZ(t).distanceXYZ(o):1/0;return a<=l?this.left:this.right}#p(e,t,r,i,{isHeld:n,hitTest:o,uiActive:a}){e.rayTransform=t,e.gripTransform=r,e.active=e.triggerPressed=e.isTransientPointer=!0;let{side:l}=this.#i.get(e),c=l==="left"?this.#r:this.#t,h=c!=null&&c!==i,p=c===i;!h&&n(l)?e.gripping=!0:a||(this.#n&&p||!this.#n&&o&&o(t)||n(l==="left"?"right":"left"))&&(e.gripping=!0,h&&(e.grabRestart=!0))}#u(e,t,r,i,{isHeld:n,uiActive:o,viewerPose:a}){let l=t.hand.get("wrist");if(!l)return;let c=r.getJointPose?.(l,i);if(!c)return;e.gripTransform=c.transform;let h=this.#m(t.hand,"index-finger-tip",r,i),p=this.#m(t.hand,"thumb-tip",r,i),u=this.#m(t.hand,"index-finger-phalanx-proximal",r,i);h&&(e.indexTip=h.transform.position),p&&(e.thumbTip=p.transform.position);let d=this.#i.get(e);if(u){this.#o.fromXYZW(c.transform.orientation).mul(this.#e);let g=d.rayPos,f=d.rayOri;d.rayActive?(g.lerp(this.#s.fromXYZ(u.transform.position),.5),f.slerp(this.#o,.5)):(g.fromXYZ(u.transform.position),f.copy(this.#o),d.rayActive=!0),e.rayTransform={position:g.toXYZ(),orientation:f.toXYZW()}}else e.rayTransform=h?.transform??null,d.rayActive=!1;if(h&&p){let g=h.transform.position,f=p.transform.position;d.pinch.update(this.#s.fromXYZ(g).distanceXYZ(f)),e.gripping=e.triggerPressed=d.pinch.on}else{d.pinch.reset();let g=t.gamepad?.buttons?.[0];e.gripping=g?g.pressed||g.value>.5:!1,e.triggerPressed=e.gripping}o?(d.tap.reset(),n(d.side)||(e.gripping=!1)):(d.tap.update(d.pinch.on,c.transform.position),d.tap.tapped&&(e.menuPressed=!0)),e.gripping&&!n(d.side)&&!this.#g(c.transform.position,a)&&(e.gripping=!1),e.active=!0,e.microSwipe=d.swipe.update(t.gamepad?.buttons);let m=d.smooth;d.smoothActive||(m.fromXYZ(c.transform.position),d.smoothActive=!0),m.lerp(this.#s.fromXYZ(c.transform.position),.4),e.gripTransform={position:m.toXYZ(),orientation:c.transform.orientation}}#f(e,t,r,i,{isHeld:n,uiActive:o,viewerPose:a}){let l=r.getPose(t.gripSpace,i);l&&(e.gripTransform=l.transform);let c=r.getPose(t.targetRaySpace,i);if(c&&(e.rayTransform=c.transform),!e.gripTransform&&!e.rayTransform)return;if(e.isHandProfile=t.profiles?.some(u=>u.includes("hand"))??!1,t.targetRayMode==="tracked-pointer"&&t.gamepad?.buttons?.[0]){let u=t.gamepad.buttons[0],d=u.pressed||u.value>.5;e.gripping=e.isHandProfile?d:t.gamepad?.buttons?.[1]?.pressed??!1}else e.gripping=t.gamepad?.buttons?.[1]?.pressed??!1;e.triggerPressed=t.gamepad?.buttons?.[0]?.pressed??!1;let h=t.gamepad?.buttons;e.menuPressed=!!(h?.[4]?.pressed||h?.[5]?.pressed);let{side:p}=this.#i.get(e);e.isHandProfile&&e.gripping&&!n(p)&&(o||!this.#g(e.gripTransform?.position,a))&&(e.gripping=!1),e.gripping&&!e.gripTransform&&(e.gripping=!1),e.active=!0,e.isHandProfile&&e.rayTransform&&(e.rayTransform=this.#d(e.rayTransform.orientation,e.rayTransform.position))}#m(e,t,r,i){let n=e.get(t);return n?r.getJointPose?.(n,i)??null:null}#d(e,t){return this.#o.fromXYZW(e).mul(this.#e),{position:t,orientation:this.#o.toXYZW()}}#g(e,t){if(!t||!e)return!0;let r=t.position;this.#s.subXYZ(e,r).transformQuat(this.#o.fromXYZW(t.orientation).invert());let i=this.#s.xzLen;return i<.05||this.#s.y>-1.19*i}};var Ue=class{#e;#r;#t;#i;#s=!0;#o=!1;#n=!1;#a=!1;#l=!1;constructor(e,t=null,{directGrab:r=!1}={}){this.#e=e,this.#r=t,this.#t=new qt({directGrab:r}),this.#i=new Vt}setOverlay(e){this.#r=e,this.#s=!0}get#c(){return this.#r?this.#r.hasBBox:this.#o}reset(){this.#i.reset(),this.#a=this.#l=!1}invalidateBBox(){this.#s=!0}setInitialTransform(e,t=1){this.#i.setSceneTransform(e,t),this.#s=!0,this.#h()}get scene(){return this.#r?.scene??null}get scale(){return this.#i.scale}get leftHand(){return this.#t.left}get rightHand(){return this.#t.right}get locked(){return this.#n}set locked(e){this.#n=!!e,this.#n&&this.#i.reset()}get scaleLocked(){return this.#i.scaleLocked}set scaleLocked(e){this.#i.scaleLocked=e}resetToInitial(){this.#i.resetToInitial(),this.#i.reset()}update(e,t,r,i,n,o=!1){let a=t.getViewerPose(r);this.#t.read(t,r,i,{isHeld:h=>this.#i.isHeld(h),hitTest:h=>this.#r?.hitTest(h)??!1,uiActive:n,viewerPose:a?.transform??null}),(this.#s||!this.#c)&&this.#p();let l=this.#t.left,c=this.#t.right;if(l.held=c.held=!1,!this.#n){this.#i.update(l,c,this.#t.stickSrcs,e,this.#c&&!o);let h=this.#i.isHeld("left"),p=this.#i.isHeld("right");l.held=h&&this.#a,c.held=p&&this.#l,this.#a=h,this.#l=p}this.#h()}#h(){this.#c&&this.#r?.applyTransform(this.#i.position,this.#i.scale),this.#e.setModelMatrix?.(this.#i.buildModelMatrix())}#p(){let e=this.#e.getBBox?.();if(!e)return;let t,r,i;this.#r?{cx:t,cy:r,cz:i}=this.#r.rebuildBBox(e,this.#i.sceneTransform):(t=(e.minX+e.maxX)/2,r=(e.minY+e.maxY)/2,i=(e.minZ+e.maxZ)/2,this.#o=!0),this.#i.setCenter(t,r,i),this.#s=!1}};var qi=s=>s?.staticUrl||s?.staticTransform?-1:1;function ji(){let s=document.createElement("canvas");return s.style.display="block",s.style.width="100%",s.style.height="100%",s.style.touchAction="none",s}var We=class s{#e=null;#r;#t=null;#i=null;#s=null;#o=null;#n=0;#a=0;#l=null;#c=!1;#h=!1;#p=0;#u="pw";#f="pw";#m=null;#d=!1;#g={};#b=null;#v=1;#w=null;#_=null;#y=null;#x=null;#S=0;#T=!1;#P=[];#M=-1;onProgress=null;onReady=null;onError=null;onFrame=null;onBeforeFrame=null;onModeChange=null;onSceneChange=null;onSceneEnd=null;static async create(e,{container:t,overlay:r=null,mode:i="pw"}={}){if(!t)throw new Error("container element required");if(!navigator.gpu)throw new Error("WebGPU not available");let n=new s;n.#l=r,r&&(r.onSceneChange=(a,l)=>n.loadScene(l)),navigator.xr&&(n.#g.vr=await navigator.xr.isSessionSupported("immersive-vr").catch(()=>!1),n.#g.ar=await navigator.xr.isSessionSupported("immersive-ar").catch(()=>!1));let o=i==="hw"?"hw":i==="vr"||i==="ar"?i:"pw";return n.#r=ji(),t.appendChild(n.#r),n.#e=await Ve.create(e,{canvas:n.#r,backend:o==="hw"?"hybrid":"pure"}),n.#Y(),await n.#E(o),n.#u=o,n}get player(){return this.#e}get camera(){return this.#i}get canvas(){return this.#r}get gl(){return this.#e?.gl??null}get audioContext(){return this.#e?.audioContext??null}get device(){return this.#e?.device??null}get mode(){return this.#u}get fallbackMode(){return this.#f}get xr(){return this.#s}get manipulator(){return this.#o}get drawMode(){return this.#e.drawMode}set drawMode(e){this.#e.drawMode=e}supports(e){return e==="pw"||e==="hw"||!!this.#g[e]}set sources(e){this.#P=e??[],this.#M=Math.min(this.#M,Math.max(0,this.#P.length-1)),this.#l&&(this.#l.sources=this.#P)}get sources(){return this.#P}get sceneIndex(){return this.#M}loadScene(e){let t=this.#P;if(e<0||e>=t.length)return;let r=t[e];this.#M=e,this.#w=null,this.#v=qi(r),this.setInitialTransform(r.initialTransform??null),this.setBackground(r.background??"#000"),r.controls&&this.setControls(r.controls),this.setCameraBounds(r.cameraBounds??null),this.#o&&(this.#o.locked=r.locked??this.#o.locked,this.#o.scaleLocked=r.scaleLocked??this.#o.scaleLocked);let i=r.staticTransform??null,n=r.staticUrl??null;this.#O(async o=>{if(n){let a=new File([await(await fetch(n)).arrayBuffer()],"static.sog");if(!o()||(await this.#e.open({file:a,type:"static"}),!o()))return}await this.#e.open(r),o()&&i&&this.#R(i)}),this.setAudioPosition(r.audioPosition??null),this.#l&&(this.#l.sceneIndex=e),this.onSceneChange?.(r,e)}start(){this.#c=!0,this.#N()}stop(){this.#c=!1,this.#k()}open(e){return this.#v=qi(e),this.setInitialTransform(e.initialTransform??null),this.setAudioPosition(e.audioPosition??null),this.#O(()=>this.#e.open(e))}close(){++this.#p,this.#I(),this.#e.close(),this.#h=!1,this.#c=!1;let e=this.#u,t=this.#f,r=t!=="pw"?"hybrid":"pure";r!==this.#e.backend&&this.#W(r),this.#F(),this.#u=t,t!==e&&this.onModeChange?.(t,e)}async setMode(e){if(this.#m=e,!this.#d){this.#d=!0;do e=this.#m,this.#m=null,e!==this.#u&&await this.#C(e);while(this.#m!=null);this.#d=!1}}async#C(e){let t=this.#u;await this.#H();try{await this.#L(e)}catch(r){if(e===this.#f)throw r;this.onError?.(r),await this.#L(this.#f)}this.#u!==t&&this.onModeChange?.(this.#u,t)}setAudio(e){this.#e.loadAudio(e)}setVolume(e){this.#e?.setVolume(e)}enableAudio(){this.#e?.enableAudio()}disableAudio(){this.#e?.disableAudio()}get audioEnabled(){return this.#e?.audioEnabled??!1}setAudioPanner(e){this.#e?.setAudioPanner(e)}setBackground(e){this.#r&&(this.#r.style.background=e||"#000")}setInitialTransform(e,t=null){this.#b=e??null,this.#i?.setSceneTransform(this.#b),this.#i?.setViewZSign(this.#v),this.#o&&(this.#o.setInitialTransform(this.#b,this.#v),!this.#h&&this.#P[this.#M]?.resetPositionOnStart!==!1&&this.#o.resetToInitial()),t?.translation&&t.rotation&&t.scale&&this.#R(t)}#R(e){this.#e?.setStaticModelMatrix(H.create().fromTransform(e))}reset(){this.#i?.reset()}setControls(e){this.#i?.setControls(e)}setCameraBounds(e){this.#_=e??null,this.#i?.setCameraBounds(this.#_)}setAudioPosition(e){this.#y=e??null,this.#i?.setAudioPosition(this.#y),this.#s&&(this.#s.soundPosition=this.#y)}dispose(){++this.#p,this.#I(),this.#t?.disconnect(),this.#e?.dispose()}async#E(e){if(e==="vr"||e==="ar"){if(!this.#g[e])throw new Error(`${e.toUpperCase()} not supported`);await this.#B(e==="ar")}else if(e==="pw"||e==="hw")this.#F();else throw new Error(`Unknown mode: ${e}`)}#F(){let e=new Xt(this.#r);this.#i=e,this.#e.backend==="pure"&&(this.#e.drawMode=0),e.setSceneTransform(this.#b),e.setViewZSign(this.#v),e.setAudioPosition(this.#y),e.setCameraBounds(this.#_),this.#w&&e.setBBox(this.#w)}async#B(e){let t=new Ht(this.#e,this.#e.gl);t.soundPosition=this.#y,t.onSessionEnd=()=>{this.#l?.dispose(),this.#s===t&&(this.#s=null,this.#o=null,this.setMode(this.#f))};let r=null;try{let i=await t.enter(e),n=this.#P[this.#M];r=new Ue(this.#e,null,{directGrab:i.isAVP}),r.locked=n?.locked??!1,r.scaleLocked=n?.scaleLocked??!0,r.setInitialTransform(this.#b,this.#v);let o=this.#l;o&&(o.manipulator=r,await o.init(this.#e,t.session,t.binding,t.refSpace,this.#e.gl,e),t.onEyeRender=(l,c,h,p,u,d,m)=>o.renderEye(l,c,h,p,u,d,m),t.onASWRender=(l,c)=>o.render(l,c),t.onRefReset=()=>o.onRefReset?.());let a=r;t.onBeforeRender=(l,c,h,p,u,d)=>{if(a.update(l,c,h,u,o?.uiActive??!1,o?.uiDragging??!1),o){o.frame(l,c,h,p,u,d);let m=[];for(let g of o.quads??[])g.layer&&(g.visible||g.placing)&&m.push(g.layer);t.externalLayers=m}},t.onFrame=(l,c)=>{if(!this.#G(l))return;let h=a.scale;t.renderFrame(l,c,h!==1?1/h:1),this.#D()}}catch(i){throw this.#A(t),this.#l?.dispose(),t.exit(),i}if(!t.session)throw this.#A(t),new Error("XR session ended during entry");this.#o=r,this.#s=t}#A(e){e.onFrame=null,e.onSessionEnd=null,e.onBeforeRender=null,e.onEyeRender=null,e.onASWRender=null,e.onRefReset=null}#I(){this.#k(),this.#i?.dispose(),this.#i=null;let e=this.#s;e&&(this.#s=null,this.#o=null,this.#A(e),this.#l?.dispose(),e.exit())}async#H(){this.#k(),this.#i?.dispose(),this.#i=null;let e=this.#s;if(e){this.#s=null,this.#o=null,e.onFrame=null;try{await e.session?.end()}catch{}}}async#L(e){let t=e!=="pw"?"hybrid":"pure";t!==this.#e.backend&&this.#W(t),await this.#E(e),(this.#c||this.#h)&&this.#N(),this.#u=e,this.#s||(this.#f=e)}#N(){this.#i&&!this.#n&&(this.#n=requestAnimationFrame(this.#z))}#k(){this.#n&&cancelAnimationFrame(this.#n),this.#n=0,this.#a=0}#z=e=>{this.#n=requestAnimationFrame(this.#z);let t=w.deltaSeconds(e,this.#a,1/60);if(this.#a=e,!this.#G(t))return this.#k();let r=this.#i;if(!r)return this.#k();r.update(t);let{width:i,height:n}=this.#r;r.apply(this.#e,i,n),this.#X(r.canPresent),this.#e.present(i,n),this.#D()};#G(e){return this.#U(),!this.#c&&!this.#h?!1:(this.onBeforeFrame?.(e),!0)}#D(){this.#h&&this.onProgress?.(Math.round(this.#e.progress*100)),this.#V(),this.onFrame?.()}async#O(e){let t=++this.#p,r=()=>t===this.#p;this.#k(),this.#e.close(),this.#w=null,this.#X(!1),this.#h=!0,this.#x=null,this.#S=0,this.#T=!1;try{await e(r)}catch(i){if(!r())return;this.#h=!1,this.onError?.(i)}r()&&this.#N()}#V(){let e=this.#e;if(!e)return;if(e.playbackRange){this.#S=e.loopCount;return}if(!e.isReady||e.isBuffering||e.loopCount<=this.#S||(this.#S=e.loopCount,this.#T))return;this.#T=!0;let t=this.#P[this.#M];this.onSceneEnd?.(t,this.#M),(t?.autoSwitchToNext??!0)&&this.#M<this.#P.length-1&&this.loadScene(this.#M+1)}#U(){let e=this.#e.error;if(e&&e!==this.#x){this.#x=e,this.#h=!1,this.onError?.(e);return}if(!this.#w&&this.#e.isReady){let r=this.#e.getBBox();r&&(this.#w=r,this.#i?.setBBox(r))}let t=this.#i;if(t&&!t.canPresent&&this.#w&&t.setBBox(this.#w),!!this.#h){if(!this.#e.isReady){let r=this.#e.lastFetchStatus;r&&r!==200&&r!==206&&(this.#h=!1,this.onError?.(r));return}this.#h=!1,this.#e.play(),this.#o&&(this.#P[this.#M]?.resetPositionOnStart!==!1&&this.#o.resetToInitial(),this.#o.invalidateBBox()),this.onProgress?.(100),this.onReady?.()}}#X(e){this.#r.style.visibility=e?"visible":"hidden"}#W(e){this.#t?.disconnect();let t=ji();this.#r.replaceWith(t),this.#r=t,this.#e?.setBackend(e,{canvas:t}),this.#Y()}#Y(){this.#t?.disconnect();let e=this.#r;this.#t=new ResizeObserver(([t])=>{if(!t)return;let r=w.clamp(devicePixelRatio||1,1,2),i=Math.round(t.contentRect.width*r),n=Math.round(t.contentRect.height*r);i>0&&n>0&&(e.width!==i||e.height!==n)&&(e.width=i,e.height=n)}),this.#t.observe(e)}};var jt=class s{#e;#r;#t;#i=null;#s=null;#o=null;#n=null;#a=!1;enableMesh=!1;static attach(e,t,r){let i=new s(e,t,r);return i.#h(),i.#l(),i}constructor(e,t,r){this.#e=e,this.#r=t,this.#t=r}get player(){return this.#e}set camera(e){this.#t=e}get camera(){return this.#t}async setAudio(e){await this.#e.loadAudio(e)}setAudioPanner(e){this.#e.setAudioPanner(e)}set entity(e){if(this.#s?.node?.destroy(),this.#s=null,this.#i=e,!e)return;let t=new this.#r.root.constructor("_SplatShadow",this.#r);t.addComponent("render",{type:"box",castShadows:!0,receiveShadows:!1});let r=t.render.meshInstances[0];r.visible=!1,r.cull=!1,e.addChild(t),this.#s=r}get entity(){return this.#i}dispose(){this.#s?.node?.destroy(),this.#n&&(this.#r.renderer.setMeshInstanceMatrices=this.#n[0],this.#r.graphicsDevice.draw=this.#n[1]),this.#e.close(),this.#e.dispose()}#l(){let{renderer:e,graphicsDevice:t}=this.#r,r=e.setMeshInstanceMatrices,i=t.draw;this.#n=[r,i];let n=this;e.setMeshInstanceMatrices=function(...o){return o[0]===n.#s&&(n.#a=!0),r.apply(this,o)},t.draw=function(...o){let a=n.#a;if(n.#a=!1,a){n.enableMesh&&n.#e.isReady&&n.#c();return}return i.apply(this,o)}}#c(){let e=this.#r.graphicsDevice,t=e.gl,r=t.getParameter(t.VIEWPORT),i=e.scope.resolve("matrix_viewProjection").value;i&&(this.#o||(this.#o=new(this.#i.getWorldTransform()).constructor),this.#o.data.set(i),this.#o.mul(this.#i.getWorldTransform()),this.#e.renderMesh(this.#o.data,r[0],r[1],r[2],r[3]),this.#h())}renderFrame(){let e=this.#r.graphicsDevice,t=e.gl,r=e.width,i=e.height;!r||!i||(this.#i&&this.#e.setModelMatrix(this.#i.getWorldTransform().data),this.#t?.camera&&(this.#e.setCamera(this.#t.getWorldTransform().data,this.#t.camera.projectionMatrix.data),this.#e.setAudioListenerMatrix(this.#t.getWorldTransform().data)),this.#i&&this.#e.setAudioSourceMatrix(this.#i.getWorldTransform().data),this.#e.renderHybridViewport(r,i,{gl:t,enableMesh:this.enableMesh}),this.#h())}#h(){let e=this.#r.graphicsDevice;e.shader=null,e.boundVao=null,e.textureUnit=-1;let t=e.textureUnits;if(t)for(let r=0;r<t.length;r++)t[r][0]=t[r][1]=t[r][2]=null}};async function Nr(s,e,t){let r=`${s.replace(/\/+$/,"")}/${e}`,i=await fetch(r,{headers:{"X-VIEW-TOKEN":t}});if(!i.ok)throw new Error(`Streaming metadata fetch failed: ${i.status} ${i.statusText}`);let n=await i.json();return{metadata:n.metadata??null,audioFileLink:n.audioFileLink??null}}async function Ye(s,e){let t=e.replace(/\/+$/,"");return Promise.all(s.map(async(r,i)=>{let{metadata:n,audioFileLink:o}=await Nr(t,r.streamingId,r.token);return{id:r.streamingId,label:r.label??n?.name??r.streamingId,url:`${t}/${r.streamingId}/`,token:r.token,displayName:n?.name??void 0,audio:o&&n?.withAudio!==!1?o:void 0,initialTransform:n?.initialSpawn??null,locked:!1,scaleLocked:!0,autoSwitchToNext:!0,resetPositionOnStart:r.settings?.resetPositionOnStart,playbackRange:r.settings?.playbackRange}}))}import{useEffect as $n,useMemo as Gr,useReducer as Kn,useRef as Dr}from"react";import{useEffect as jn,useMemo as Qn,useState as Qi}from"react";function $i(s,e){let[t,r]=Qi(!1),[i,n]=Qi(!1);jn(()=>{let a=navigator.xr;if(!a||!s)return;let l=async()=>{let[c,h]=await Promise.all([a.isSessionSupported("immersive-vr").catch(()=>!1),a.isSessionSupported("immersive-ar").catch(()=>!1)]);r(c),n(h)};return l(),a.addEventListener("devicechange",l),()=>a.removeEventListener("devicechange",l)},[s]);let o=e==="vr"||e==="ar";return Qn(()=>({vrSupported:t,arSupported:i,isActive:o,setMode:async a=>{await s?.setMode(a)}}),[s,t,i,o])}var Ji=new WeakMap;function es(s){return Ji.get(s)}var ts={app:null,overlay:null,isContentReady:!1,isLoading:!1,progress:0,mode:"pw",error:null,isPlaying:!1,isBuffering:!1,currentTime:0,duration:0,playbackRange:null,controlsType:"orbit",isMuted:!0,volume:1};function Jn(s,e){switch(e.type){case"init":return{...s,app:e.app,overlay:e.overlay};case"frame":{let{isPlaying:t,isBuffering:r,currentTime:i,duration:n,playbackRange:o,isMuted:a}=e,l=n>0?n:s.duration;return s.isPlaying===t&&s.isBuffering===r&&s.currentTime===i&&s.duration===l&&s.playbackRange?.start===o?.start&&s.playbackRange?.end===o?.end&&s.isMuted===a?s:{...s,isPlaying:t,isBuffering:r,currentTime:i,duration:l,playbackRange:o,isMuted:a}}case"progress":return s.progress===e.value?s:{...s,progress:e.value};case"ready":return{...s,isContentReady:!0,isLoading:!1,progress:100};case"mode":return s.mode===e.mode?s:{...s,mode:e.mode};case"error":return{...s,error:e.error,isLoading:!1};case"open":return{...s,error:null,isLoading:!0,progress:0};case"close":return{...s,isLoading:!1,progress:0};case"reset":return{...ts,mode:s.mode};case"range":return{...s,playbackRange:e.playbackRange,currentTime:e.currentTime,error:null};case"seek":return{...s,currentTime:e.time};case"camera_controls":return s.controlsType===e.controlsType?s:{...s,controlsType:e.controlsType};case"set_volume":return{...s,volume:e.volume}}}var Ki=new Set(["vr","ar"]);function Qt(s){let{containerRef:e,mode:t="pw",overlay:r,moduleUrl:i,moduleFactory:n,onReady:o,onProgress:a,onModeChange:l,onXRStart:c,onXREnd:h,eventLogger:p}=s,[u,d]=Kn(Jn,{...ts,mode:t}),m=Dr(null),g=Dr(u);g.current=u;let f=Dr({onReady:o,onProgress:a,onModeChange:l,onXRStart:c,onXREnd:h,eventLogger:p});f.current={onReady:o,onProgress:a,onModeChange:l,onXRStart:c,onXREnd:h,eventLogger:p},$n(()=>{let P=e.current;if(!P)return;let C=!1;return(async()=>{try{if(!n&&!i)throw new Error("[gr-react] Either moduleUrl or moduleFactory must be provided");let L=n?await n():await It(i);if(C)return;let ae=r??null;ae&&(ae.eventLogger={event:(I,D)=>f.current.eventLogger?.event?.(I,{...D,mode:g.current.mode}),error:(I,D)=>f.current.eventLogger?.error?.(I,{...D,mode:g.current.mode})});let G=await We.create(L,{container:P,overlay:ae,mode:t});if(C){G.dispose();return}m.current=G,G.onProgress=I=>{d({type:"progress",value:I}),f.current.onProgress?.(I)},G.onReady=()=>{d({type:"ready"}),G.audioEnabled&&G.enableAudio(),f.current.onReady?.()},G.onFrame=()=>{let I=m.current?.player;I&&d({type:"frame",isPlaying:I.isPlaying??!1,isBuffering:I.isBuffering??!1,currentTime:I.currentTime??0,duration:I.duration??0,playbackRange:I.playbackRange,isMuted:!(I.audioEnabled??!1)})},G.onModeChange=(I,D)=>{d({type:"mode",mode:I}),f.current.onModeChange?.(I,D);let He=Ki.has(D),ht=Ki.has(I);He&&!ht&&f.current.onXREnd?.(),!He&&ht&&f.current.onXRStart?.()},G.onError=I=>{let[D,He]=typeof I=="number"?[new Error(`Streaming fetch failed: HTTP ${I}`),"load"]:[I,G.player?.error===I?"load":"xr"];d({type:"error",error:D}),f.current.eventLogger?.error?.(D,{phase:He,mode:g.current.mode})},G.start(),d({type:"init",app:G,overlay:ae}),d({type:"camera_controls",controlsType:G.camera?.controlsType??"orbit"})}catch(L){let ae=L instanceof Error?L:new Error(String(L));d({type:"error",error:ae}),f.current.eventLogger?.error?.(ae,{phase:"init",mode:g.current.mode})}})(),()=>{C=!0;let L=m.current;L&&(L.stop(),L.dispose()),m.current=null,d({type:"reset"})}},[e,r,t,n,i]);let{app:_}=u,x=$i(_,u.mode),S=Gr(()=>({play:()=>_?.player?.play(),pause:()=>_?.player?.pause(),togglePlay:()=>{let P=_?.player;if(!P)return;let C=!P.isPlaying;C?P.play():P.pause(),f.current.eventLogger?.event?.("play_pause",{playing:C,mode:g.current.mode})},seek:P=>{_?.player?.seek(P),d({type:"seek",time:_?.player?.currentTime??P}),f.current.eventLogger?.event?.("seek",{position:P,mode:g.current.mode})},setPlaybackRange:(P,C)=>{let L=_?.player;L&&(L.setPlaybackRange(P,C),d({type:"range",playbackRange:L.playbackRange,currentTime:L.currentTime}),f.current.eventLogger?.event?.("playback_range",{start:P,end:C,mode:g.current.mode}))},clearPlaybackRange:()=>{let P=_?.player;P&&(P.clearPlaybackRange(),d({type:"range",playbackRange:null,currentTime:P.currentTime}))},setSpeed:P=>_?.player?.setSpeed(P),setVolume:P=>{d({type:"set_volume",volume:P}),_?.setVolume(P)},toggleMute:()=>{let P=!_?.audioEnabled;P?_?.enableAudio():_?.disableAudio(),f.current.eventLogger?.event?.("mute_toggle",{muted:!P,mode:g.current.mode})},setAudio:P=>_?.setAudio(P)}),[_]),b=Gr(()=>({controlsType:u.controlsType,zoom:P=>_?.camera?.zoom(P),reset:()=>{_?.camera?.reset(),f.current.eventLogger?.event?.("reset",{mode:g.current.mode})},setControls:P=>{if(!_)return;_.setControls(P);let C=_.camera?.controlsType??P;d({type:"camera_controls",controlsType:C}),f.current.eventLogger?.event?.("camera_controls",{controls:C,requestedControls:P,mode:g.current.mode})}}),[_,u.controlsType]),v=Gr(()=>({open(P){_&&(d({type:"open"}),_.open(P))},close(){_?.close(),d({type:"close"})},dispose(){_&&(_.stop(),_.dispose())}}),[_]),T={app:_,device:_?.device??null,overlay:u.overlay,isInitialized:_!==null,isLoading:u.isLoading,isContentReady:u.isContentReady,progress:u.progress,mode:u.mode,error:u.error,isRebuffering:u.isContentReady&&(u.isLoading||u.isBuffering),...v,playback:{isPlaying:u.isPlaying,isBuffering:u.isBuffering,currentTime:u.currentTime,duration:u.duration,playbackRange:u.playbackRange,playbackStart:u.playbackRange?.start??0,playbackEnd:u.playbackRange?.end??u.duration,rangeDuration:Math.max(0,(u.playbackRange?.end??u.duration)-(u.playbackRange?.start??0)),rangeTime:Math.max(0,Math.min(u.currentTime,u.playbackRange?.end??u.duration)-(u.playbackRange?.start??0)),isMuted:u.isMuted,volume:u.volume,...S},camera:b,xr:x};return Ji.set(T,{dispatch:d}),T}import{useCallback as bt,useEffect as eo,useRef as to,useState as rs}from"react";function $t(s,e={}){let{app:t}=s,r=es(s)?.dispatch,i=to(e.onSceneEnd);i.current=e.onSceneEnd;let[n,o]=rs([]),[a,l]=rs(-1);eo(()=>{if(t)return t.onSceneChange=(g,f)=>{r?.({type:"open"}),r?.({type:"camera_controls",controlsType:t.camera?.controlsType??"orbit"}),l(f)},t.onSceneEnd=(g,f)=>i.current?.(g,f),()=>{t.onSceneChange=null,t.onSceneEnd=null}},[t,r]);let c=bt(g=>{t&&(t.sources=g),o(g),l(-1)},[t]),h=bt(g=>{t?.loadScene(g)},[t]),p=bt(()=>{t&&t.loadScene(t.sceneIndex+1)},[t]),u=bt(()=>{t&&t.loadScene(t.sceneIndex-1)},[t]),d=bt(async(g,f)=>{let _=await Ye(g,f);c(_),_.length>0&&h(0)},[c,h]),m=a>=0&&a<n.length?n[a]:null;return{sources:n,index:a,total:n.length,currentSource:m,hasNext:a>=0&&a<n.length-1,hasPrev:a>0,hasAudio:!!m?.audio,setSources:c,loadFromApi:d,next:p,prev:u,goTo:h}}import{jsx as F,jsxs as ro}from"react/jsx-runtime";function is(){return F("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:F("path",{d:"M5.74023 18.7266V5.17188C5.74023 4.68359 5.86068 4.32552 6.10156 4.09766C6.34245 3.86328 6.62891 3.74609 6.96094 3.74609C7.25391 3.74609 7.55339 3.83073 7.85938 4L19.2363 10.6504C19.64 10.8848 19.9199 11.0964 20.0762 11.2852C20.2389 11.4674 20.3203 11.6888 20.3203 11.9492C20.3203 12.2031 20.2389 12.4245 20.0762 12.6133C19.9199 12.8021 19.64 13.0137 19.2363 13.248L7.85938 19.8984C7.55339 20.0677 7.25391 20.1523 6.96094 20.1523C6.62891 20.1523 6.34245 20.0352 6.10156 19.8008C5.86068 19.5664 5.74023 19.2083 5.74023 18.7266Z"})})}function ss(){return F("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:F("path",{d:"M7.3418 20.0254C6.91211 20.0254 6.58659 19.9147 6.36523 19.6934C6.15039 19.472 6.04297 19.1465 6.04297 18.7168V5.17188C6.04297 4.74219 6.15039 4.41992 6.36523 4.20508C6.58659 3.98372 6.91211 3.87305 7.3418 3.87305H9.56836C9.99154 3.87305 10.3138 3.97721 10.5352 4.18555C10.7565 4.39388 10.8672 4.72266 10.8672 5.17188V18.7168C10.8672 19.1465 10.7565 19.472 10.5352 19.6934C10.3138 19.9147 9.99154 20.0254 9.56836 20.0254H7.3418ZM14.4414 20.0254C14.0117 20.0254 13.6862 19.9147 13.4648 19.6934C13.2435 19.472 13.1328 19.1465 13.1328 18.7168V5.17188C13.1328 4.74219 13.2435 4.41992 13.4648 4.20508C13.6862 3.98372 14.0117 3.87305 14.4414 3.87305H16.6582C17.0879 3.87305 17.4102 3.97721 17.625 4.18555C17.8464 4.39388 17.957 4.72266 17.957 5.17188V18.7168C17.957 19.1465 17.8464 19.472 17.625 19.6934C17.4102 19.9147 17.0879 20.0254 16.6582 20.0254H14.4414Z"})})}function ns(){return F("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:F("path",{d:"M8.03125 15.5391C7.5 15.5391 7.10156 15.4036 6.83594 15.1328C6.57031 14.8568 6.4375 14.4375 6.4375 13.875V10.8828C6.4375 10.362 6.55208 9.97135 6.78125 9.71094L15.6875 18.6094C15.625 18.8333 15.5208 18.9974 15.375 19.1016C15.2292 19.2057 15.0547 19.2578 14.8516 19.2578C14.6745 19.2578 14.5052 19.2188 14.3438 19.1406C14.1823 19.0625 14.0104 18.9375 13.8281 18.7656L10.4531 15.6094C10.401 15.5625 10.3359 15.5391 10.2578 15.5391H8.03125ZM15.7422 14.3984L10.3203 8.99219H10.5547C10.6016 8.99219 10.6458 8.97135 10.6875 8.92969L13.8281 6.01562C14.0312 5.82812 14.2057 5.69271 14.3516 5.60938C14.4974 5.52083 14.6615 5.47656 14.8438 5.47656C15.1094 5.47656 15.3255 5.56771 15.4922 5.75C15.6589 5.92708 15.7422 6.14323 15.7422 6.39844V14.3984ZM18.4453 20.0781L5.05469 6.70312C4.9401 6.58854 4.88281 6.44792 4.88281 6.28125C4.88281 6.10938 4.9401 5.96615 5.05469 5.85156C5.17448 5.73177 5.31771 5.67448 5.48438 5.67969C5.65104 5.67969 5.79427 5.73698 5.91406 5.85156L19.2891 19.2266C19.4089 19.3464 19.4688 19.487 19.4688 19.6484C19.4688 19.8151 19.4089 19.9583 19.2891 20.0781C19.1797 20.1979 19.0391 20.2578 18.8672 20.2578C18.7005 20.2578 18.5599 20.1979 18.4453 20.0781Z"})})}function os(){return F("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:F("path",{d:"M11.7031 19.2578C11.5208 19.2578 11.349 19.2188 11.1875 19.1406C11.026 19.0625 10.8568 18.9375 10.6797 18.7656L7.35156 15.6094C7.29948 15.5625 7.23438 15.5391 7.15625 15.5391H4.91406C4.38802 15.5391 3.98438 15.3958 3.70312 15.1094C3.42188 14.8229 3.28125 14.3958 3.28125 13.8281V10.9219C3.28125 10.3594 3.42188 9.9349 3.70312 9.64844C3.98438 9.35677 4.38802 9.21094 4.91406 9.21094H7.15625C7.23438 9.21094 7.29948 9.1875 7.35156 9.14062L10.6797 6.01562C10.8828 5.82812 11.0547 5.69271 11.1953 5.60938C11.3411 5.52083 11.5052 5.47656 11.6875 5.47656C11.9531 5.47656 12.1693 5.56771 12.3359 5.75C12.5026 5.92708 12.5859 6.14323 12.5859 6.39844V18.3828C12.5859 18.6328 12.5026 18.8411 12.3359 19.0078C12.1745 19.1745 11.9635 19.2578 11.7031 19.2578ZM15.375 15.6875C15.2188 15.5781 15.1302 15.4375 15.1094 15.2656C15.0885 15.0938 15.138 14.9245 15.2578 14.7578C15.4818 14.4401 15.6562 14.0755 15.7812 13.6641C15.9062 13.2474 15.9688 12.8125 15.9688 12.3594C15.9688 11.9062 15.9062 11.4714 15.7812 11.0547C15.6615 10.638 15.487 10.2734 15.2578 9.96094C15.1328 9.79948 15.0807 9.63281 15.1016 9.46094C15.1276 9.28385 15.2188 9.14062 15.375 9.03125C15.5104 8.9375 15.6589 8.90625 15.8203 8.9375C15.9818 8.96875 16.1146 9.0599 16.2188 9.21094C16.5208 9.60677 16.7552 10.0807 16.9219 10.6328C17.0938 11.1849 17.1797 11.7604 17.1797 12.3594C17.1797 12.9583 17.0938 13.5339 16.9219 14.0859C16.7552 14.638 16.5208 15.112 16.2188 15.5078C16.1146 15.6589 15.9818 15.75 15.8203 15.7812C15.6589 15.8073 15.5104 15.776 15.375 15.6875ZM18.2734 17.7266C18.1328 17.6276 18.0521 17.4974 18.0312 17.3359C18.0104 17.1693 18.0547 17.0052 18.1641 16.8438C18.5859 16.2344 18.9141 15.5443 19.1484 14.7734C19.388 13.9974 19.5078 13.1927 19.5078 12.3594C19.5078 11.526 19.3906 10.7214 19.1562 9.94531C18.9219 9.16927 18.5911 8.47917 18.1641 7.875C18.0495 7.71354 18.0026 7.55208 18.0234 7.39062C18.0495 7.22396 18.1328 7.09115 18.2734 6.99219C18.4193 6.89323 18.5729 6.85938 18.7344 6.89062C18.8958 6.92188 19.0286 7.01302 19.1328 7.16406C19.638 7.84115 20.0286 8.63542 20.3047 9.54688C20.5807 10.4583 20.7188 11.3958 20.7188 12.3594C20.7188 13.3229 20.5781 14.2578 20.2969 15.1641C20.0208 16.0703 19.6328 16.8672 19.1328 17.5547C19.0286 17.7057 18.8958 17.7969 18.7344 17.8281C18.5729 17.8542 18.4193 17.8203 18.2734 17.7266Z"})})}function Le(){return F("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:F("path",{d:"M5.42188 13.1953V6.4375C5.42188 5.625 5.6224 5.01302 6.02344 4.60156C6.42969 4.1901 7.03646 3.98438 7.84375 3.98438H11.4297V9.71875C11.4297 10.7031 11.9219 11.1953 12.9062 11.1953H18.5625V18.2891C18.5625 19.1016 18.3594 19.7109 17.9531 20.1172C17.5521 20.5286 16.9479 20.7344 16.1406 20.7344H9.78125C10 20.3646 10.1667 19.9688 10.2812 19.5469C10.401 19.125 10.4609 18.6901 10.4609 18.2422C10.4609 17.5495 10.3307 16.8984 10.0703 16.2891C9.8099 15.6797 9.44792 15.1432 8.98438 14.6797C8.52083 14.2161 7.98438 13.8542 7.375 13.5938C6.76562 13.3281 6.11458 13.1953 5.42188 13.1953ZM12.9297 10.125C12.6432 10.125 12.5 9.98438 12.5 9.70312V4.07031C12.6615 4.09635 12.8255 4.16667 12.9922 4.28125C13.1589 4.39062 13.3333 4.53906 13.5156 4.72656L17.8203 9.10938C18.0078 9.30208 18.1562 9.47917 18.2656 9.64062C18.375 9.80208 18.4427 9.96354 18.4688 10.125H12.9297ZM5.42188 22.2109C4.88021 22.2109 4.36979 22.1068 3.89062 21.8984C3.41146 21.6953 2.98958 21.4115 2.625 21.0469C2.26042 20.6823 1.97396 20.2604 1.76562 19.7812C1.55729 19.3021 1.45312 18.7891 1.45312 18.2422C1.45312 17.6953 1.55729 17.1849 1.76562 16.7109C1.97396 16.2318 2.26042 15.8099 2.625 15.4453C2.98958 15.0755 3.41146 14.7891 3.89062 14.5859C4.36979 14.3776 4.88021 14.2734 5.42188 14.2734C5.96875 14.2734 6.48177 14.3776 6.96094 14.5859C7.4401 14.7891 7.86198 15.0729 8.22656 15.4375C8.59115 15.8021 8.875 16.224 9.07812 16.7031C9.28646 17.1823 9.39062 17.6953 9.39062 18.2422C9.39062 18.7839 9.28646 19.2943 9.07812 19.7734C8.86979 20.2526 8.58073 20.6745 8.21094 21.0391C7.84635 21.4036 7.42448 21.6901 6.94531 21.8984C6.46615 22.1068 5.95833 22.2109 5.42188 22.2109ZM5.42188 20.7266C5.56771 20.7266 5.68229 20.6823 5.76562 20.5938C5.85417 20.5052 5.89844 20.3906 5.89844 20.25V18.7188H7.42969C7.57031 18.7188 7.6849 18.6745 7.77344 18.5859C7.86198 18.5026 7.90625 18.388 7.90625 18.2422C7.90625 18.0964 7.86198 17.9818 7.77344 17.8984C7.6849 17.8099 7.57031 17.7656 7.42969 17.7656H5.89844V16.2344C5.89844 16.0938 5.85417 15.9792 5.76562 15.8906C5.68229 15.8021 5.56771 15.7578 5.42188 15.7578C5.27604 15.7578 5.15885 15.8021 5.07031 15.8906C4.98698 15.9792 4.94531 16.0938 4.94531 16.2344V17.7656H3.41406C3.27344 17.7656 3.15885 17.8099 3.07031 17.8984C2.98177 17.9818 2.9375 18.0964 2.9375 18.2422C2.9375 18.388 2.98177 18.5026 3.07031 18.5859C3.15885 18.6745 3.27344 18.7188 3.41406 18.7188H4.94531V20.25C4.94531 20.3906 4.98698 20.5052 5.07031 20.5938C5.15885 20.6823 5.27604 20.7266 5.42188 20.7266Z"})})}function as(){return F("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:F("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.75 6.5A3.75 3.75 0 0 0 2 10.25v3.5a3.75 3.75 0 0 0 3.75 3.75h7.5A3.75 3.75 0 0 0 17 13.75v-.46l2.9 2.16A1.25 1.25 0 0 0 22 14.45v-4.9a1.25 1.25 0 0 0-2.1-1L17 10.71v-.46a3.75 3.75 0 0 0-3.75-3.75h-7.5ZM6 8h7a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 16H6a2.5 2.5 0 0 1-2.5-2.5v-3A2.5 2.5 0 0 1 6 8Zm11 4.6v-1.2l3.5-2.61v6.42L17 12.6Z"})})}function Kt(){return F("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:F("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.25 6.75C3.46 6.75 2 8.21 2 10v4c0 1.79 1.46 3.25 3.25 3.25h3.24c.83 0 1.55-.54 1.8-1.33l.52-1.67h2.38l.52 1.67c.25.79.97 1.33 1.8 1.33h3.24c1.79 0 3.25-1.46 3.25-3.25v-4c0-1.79-1.46-3.25-3.25-3.25H5.25Zm.67 3.42c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52H5.92Zm10.2 0c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52h-1.96Z"})})}function Jt(){return ro("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[F("path",{d:"M5.5 3.75c-.97 0-1.75.78-1.75 1.75v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5A3.25 3.25 0 0 1 5.5 2.25h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5ZM16.25 3c0-.41.34-.75.75-.75h1.5a3.25 3.25 0 0 1 3.25 3.25v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5c0-.97-.78-1.75-1.75-1.75H17c-.41 0-.75-.34-.75-.75ZM3 15.5c.41 0 .75.34.75.75v2.25c0 .97.78 1.75 1.75 1.75h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5a3.25 3.25 0 0 1-3.25-3.25v-2.25c0-.41.34-.75.75-.75ZM21 15.5c.41 0 .75.34.75.75v2.25a3.25 3.25 0 0 1-3.25 3.25H17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.5c.97 0 1.75-.78 1.75-1.75v-2.25c0-.41.34-.75.75-.75Z"}),F("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z"})]})}function ls(){return F("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:F("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"})})}function cs(){return F("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:F("path",{d:"m480-236 93-93q12-12 29-12t29 12q12 12 12 29t-12 29L508-148q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L329-271q-12-12-12-29t12-29q12-12 29-12t29 12l93 93Zm0-484-93 93q-12 12-29 12t-29-12q-12-12-12-29t12-29l123-123q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l123 123q12 12 12 29t-12 29q-12 12-29 12t-29-12l-93-93Z"})})}function hs({active:s=!1}){return F("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:s?F("path",{d:"M240-240h-80q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h120q17 0 28.5 11.5T320-280v120q0 17-11.5 28.5T280-120q-17 0-28.5-11.5T240-160v-80Zm480 0v80q0 17-11.5 28.5T680-120q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320h120q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240h-80ZM240-720v-80q0-17 11.5-28.5T280-840q17 0 28.5 11.5T320-800v120q0 17-11.5 28.5T280-640H160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h80Zm480 0h80q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H680q-17 0-28.5-11.5T640-680v-120q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v80Z"}):F("path",{d:"M200-200h80q17 0 28.5 11.5T320-160q0 17-11.5 28.5T280-120H160q-17 0-28.5-11.5T120-160v-120q0-17 11.5-28.5T160-320q17 0 28.5 11.5T200-280v80Zm560 0v-80q0-17 11.5-28.5T800-320q17 0 28.5 11.5T840-280v120q0 17-11.5 28.5T800-120H680q-17 0-28.5-11.5T640-160q0-17 11.5-28.5T680-200h80ZM200-760v80q0 17-11.5 28.5T160-640q-17 0-28.5-11.5T120-680v-120q0-17 11.5-28.5T160-840h120q17 0 28.5 11.5T320-800q0 17-11.5 28.5T280-760h-80Zm560 0h-80q-17 0-28.5-11.5T640-800q0-17 11.5-28.5T680-840h120q17 0 28.5 11.5T840-800v120q0 17-11.5 28.5T800-640q-17 0-28.5-11.5T760-680v-80Z"})})}function er(){return F("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:F("path",{d:"m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"})})}function tr(){return F("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:F("path",{d:"M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"})})}var ps=[{type:"orbit",label:"Orbit",hint:`Left-click drag to rotate / Right-click drag to pan
Scroll to zoom in/out`},{type:"trackball",label:"Trackball",hint:`Left-click drag to rotate freely / Right-click drag to pan
Scroll to zoom in/out`},{type:"fly",label:"Fly",hint:`W/S forward & back / A/D strafe / R/F up & down
Q/E roll / Drag to look around`}];var ce={PW:"pw",HW:"hw",VR:"vr",AR:"ar"},vc=[ce.VR,ce.AR];function rr(s){return s===ce.VR||s===ce.AR}var Xr=[".mint",".sog"],us=Xr.join(","),ds="Open file",ir="local://",fs="static",io=".sog";function Hr(s){return s.toLowerCase().endsWith(io)}function ke(s){return typeof s?.url=="string"&&s.url.startsWith(ir)}var ms="stepper";var so="@gracia/web-sdk/wasm",no="https://market.gracia.ai/api/v1/streaming/content";function gs(){return typeof __GRACIA_MODULE_URL__=="string"?__GRACIA_MODULE_URL__:so}function ys(){return typeof __GRACIA_STREAMING_BASE_URL__=="string"?__GRACIA_STREAMING_BASE_URL__:no}function oo(){return typeof navigator>"u"?!1:!!navigator.gpu}var ao={xr:"xr-failed",fullscreen:"fullscreen-failed","local-file":"local-file-failed"};function lo(s){let e=s.match(/http\s+(-?\d+)/i);return e?Number(e[1]):null}function co(s,e){let t=e&&ao[e];if(t)return t;let r=s.message.toLowerCase();if(r.includes("webgpu")||r.includes("not supported")||r.includes("getcontext"))return"unsupported-browser";let i=lo(r);return i!==null?i===401||i===403?"access-denied":i===404?"not-found":i>=500?"server-error":"network":r.includes("failed to fetch dynamically imported module")?"load-failed":r.includes("forbidden")||r.includes("unauthorized")?"access-denied":oo()?"unknown":"unsupported-browser"}var ho=new Set(["unsupported-browser","not-found","access-denied","xr-failed","fullscreen-failed","local-file-failed"]),po=new Set(["xr-failed","fullscreen-failed","local-file-failed"]);function uo(s,e){let t=!ho.has(s);return s==="unsupported-browser"?{presentation:"blocking",recoverable:t}:po.has(s)?{presentation:"toast",recoverable:t}:{presentation:e?"toast":"blocking",recoverable:t}}var fo={"unsupported-browser":{title:"This browser can\u2019t run the player",body:"The player requires WebGPU. Open it in a supported browser and device."},network:{title:"Connection lost",body:"We couldn\u2019t reach the stream. Check your connection and try again."},"not-found":{title:"Scene not found",body:"This content is no longer available."},"access-denied":{title:"Access denied",body:"You don\u2019t have permission to view this content."},"server-error":{title:"Something went wrong",body:"The server had a problem loading this scene. Please try again."},"load-failed":{title:"Couldn\u2019t load the scene",body:"We couldn\u2019t load this scene. Please try again."},"xr-failed":{title:"Couldn\u2019t enter immersive mode",body:"Immersive mode isn\u2019t available right now."},"fullscreen-failed":{title:"Couldn\u2019t enter fullscreen",body:"Fullscreen isn\u2019t available right now."},"local-file-failed":{title:"Couldn\u2019t open the file",body:"We couldn\u2019t open that file. Try a different one."},unknown:{title:"Something went wrong",body:"We couldn\u2019t load this scene. Please try again."}};function mo(s){return fo[s]}function bs(s,e,t){let r=co(s,t);return{kind:r,cause:s,...uo(r,e),...mo(r)}}var xs="data:font/woff2;base64,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";var vs=`@font-face {
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

.gr-player__range {
    color: #fff;
    width: 100%;
    max-width: 640px;
    align-self: center;
    font-size: 13px;
    pointer-events: auto;
}
.gr-player__range summary {
    cursor: pointer;
    width: fit-content;
    margin-left: auto;
    padding: 8px 12px;
    border-radius: 8px;
    background: rgba(20, 24, 28, 0.9);
}
.gr-player__range-panel {
    margin-top: 6px;
    padding: 14px;
    border-radius: 10px;
    background: rgba(20, 24, 28, 0.96);
}
.gr-player__range-track {
    position: relative;
    height: 30px;
    margin: 0 8px 12px;
}
.gr-player__range-track::before,
.gr-player__range-selection {
    content: "";
    position: absolute;
    top: 12px;
    height: 6px;
    border-radius: 3px;
}
.gr-player__range-track::before {
    left: 0;
    right: 0;
    background: #59616c;
}
.gr-player__range-selection {
    background: #b6ed86;
}
.gr-player__range-track input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 30px;
    margin: 0;
    background: transparent;
    appearance: none;
    pointer-events: none;
}
.gr-player__range-track input::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 24px;
    border: 2px solid #fff;
    border-radius: 4px;
    background: #233a1e;
    cursor: ew-resize;
    pointer-events: auto;
}
.gr-player__range-track input::-moz-range-thumb {
    width: 14px;
    height: 22px;
    border: 2px solid #fff;
    border-radius: 4px;
    background: #233a1e;
    cursor: ew-resize;
    pointer-events: auto;
}
.gr-player__range-track input:focus-visible::-webkit-slider-thumb {
    outline: 2px solid #b6ed86;
    outline-offset: 3px;
}
.gr-player__range-track input:focus-visible::-moz-range-thumb {
    outline: 2px solid #b6ed86;
    outline-offset: 3px;
}
.gr-player__range-fields {
    display: flex;
    align-items: end;
    flex-wrap: wrap;
    gap: 10px;
}
.gr-player__range-fields label {
    display: flex;
    flex: 1 1 100px;
    flex-direction: column;
    gap: 4px;
}
.gr-player__range-fields input {
    width: 100%;
    min-width: 0;
}
.gr-player__range-fields input,
.gr-player__range-fields button {
    color: #fff;
    border: 1px solid #626a73;
    background: #262b31;
    border-radius: 6px;
    padding: 8px;
    font: inherit;
}
.gr-player__range-fields button {
    cursor: pointer;
    min-height: 36px;
}
.gr-player__range-fields button:disabled {
    opacity: 0.45;
    cursor: default;
}
.gr-player__range-panel p {
    margin: 10px 0 0;
}
`;var _s="gracia-player-default-styles",Vr=vs.replace('url("./assets/GolosText-Regular.woff2")',`url("${xs}")`);function sr(s){if(typeof document>"u")return;let e=typeof ShadowRoot<"u"&&s instanceof ShadowRoot?s:s?.head??document.head;if(e.querySelector(`#${_s}`))return;let t=document.createElement("style");t.id=_s,t.textContent=Vr,e.appendChild(t)}function Q(...s){let e=[];for(let t of s)if(t){if(typeof t=="string"){e.push(t);continue}for(let[r,i]of Object.entries(t))i&&e.push(r)}return e.join(" ")}function he(s){return s.label??s.displayName??s.id??s.url??"Untitled"}function Ur(s){return!Number.isFinite(s)||s<0?"0:00":`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`}function be(s){return s instanceof Error?s:new Error(String(s))}function ws(s,e){return{event:(t,r)=>s?.event?.(t,r),error:(t,r)=>{s?.error?.(t,r),e?.(t,r)}}}import{jsx as Ss,jsxs as bo}from"react/jsx-runtime";var se=({variant:s="primary",className:e,type:t="button",children:r,...i})=>{let n=Array.isArray(s)?s:[s];return Ss("button",{type:t,className:Q("gr-player__button",...n.map(o=>`gr-player__button--${o}`),e),...i,children:r})},Ae=({variant:s="icon",srLabel:e,children:t,...r})=>bo(se,{variant:s,...r,children:[t,e&&Ss("span",{className:"gr-player__sr",children:e})]});import{jsx as xt,jsxs as xo}from"react/jsx-runtime";var Ze=({icon:s,title:e,body:t,detail:r,action:i,className:n,role:o,ariaLive:a})=>xt("div",{className:n,role:o,"aria-live":a,children:xo("div",{className:"gr-player__state-message",children:[xt("div",{className:"gr-player__state-icon",children:s}),xt("h2",{children:e}),xt("p",{children:t}),r&&xt("span",{className:"gr-player__sr",children:r}),i]})});import{jsx as Ts}from"react/jsx-runtime";var Wr=({message:s})=>Ts("div",{className:"gr-player__error",role:"alert",children:Ts("span",{className:"gr-player__error-text",children:s})});import{jsx as Ps}from"react/jsx-runtime";var Yr=({title:s,body:e,detail:t,action:r})=>Ps(Ze,{icon:Ps(ls,{}),title:s,body:e,detail:t,action:r,className:"gr-player__error-screen",role:"alert",ariaLive:"assertive"});import{jsx as Ms}from"react/jsx-runtime";var Zr=()=>Ms("div",{className:"gr-player__loader",role:"status","aria-live":"polite",children:Ms("div",{className:"gr-player__spinner"})});import{forwardRef as ka,useImperativeHandle as Aa,useRef as hn}from"react";import{createContext as vo,useContext as _o}from"react";var Es=vo(null),qr=Es.Provider,z=()=>{let s=_o(Es);if(!s)throw new Error("usePlayerContext must be used within a PlayerProvider");return s};import{useEffect as Cs,useRef as wo,useState as So}from"react";function jr(s,e,t){let[r,i]=So(!1);Cs(()=>{let a=s.current;if(!a)return;let l=()=>i(!0),c=h=>{h.touches.length>1&&l()};return a.addEventListener("pointerdown",l),a.addEventListener("wheel",l),a.addEventListener("touchmove",c),()=>{a.removeEventListener("pointerdown",l),a.removeEventListener("wheel",l),a.removeEventListener("touchmove",c)}},[s]);let n=wo(e);return Cs(()=>{n.current!==e&&(n.current=e,i(!1))},[e]),{hasInteracted:r,resetView:()=>{t.reset(),i(!1)}}}import{useEffect as To,useState as Po}from"react";var Mo=500;function Qr(s,e=Mo){let[t,r]=Po(!1);return To(()=>{if(!s){r(!1);return}let i=setTimeout(()=>r(!0),e);return()=>clearTimeout(i)},[s,e]),s&&t}import{useEffect as Eo,useRef as Co,useState as Ro}from"react";var Lo=2e3;function $r({coreError:s,interactionError:e,isSceneReady:t,currentSource:r,open:i,clearError:n}){let[o,a]=Ro(null),l=Co(new WeakMap);e?.phase&&l.current.set(e.error,e.phase);let c=s&&e?.error===s?e.phase:s?l.current.get(s):void 0,h=s?{error:s,phase:c}:e,p=h?bs(h.error,t,h.phase):null,u=p?.presentation==="blocking",d=p?.presentation==="toast"&&p.cause!==o?p:null,m=d?.cause??null;return Eo(()=>{if(!m)return;let _=setTimeout(()=>{a(m),n()},Lo);return()=>clearTimeout(_)},[m,n]),{playerError:p,isBlocking:!!u,toast:d,retry:()=>r?i(r):window.location.reload(),dismiss:()=>{d&&a(d.cause),n()}}}import{useCallback as ko,useEffect as Ao,useState as Io}from"react";function Kr(s,e){let[t,r]=Io(!1),i=ko(async()=>{let n=s.current;if(!(!n||typeof document>"u"))try{document.fullscreenElement===n?await document.exitFullscreen():await n.requestFullscreen()}catch(o){e(be(o),{phase:"fullscreen"})}},[e,s]);return Ao(()=>{if(typeof document>"u")return;let n=()=>r(document.fullscreenElement===s.current);return n(),document.addEventListener("fullscreenchange",n),()=>document.removeEventListener("fullscreenchange",n)},[s]),{isFullscreen:t,toggleFullscreen:i}}import{useRef as Fo}from"react";function Rs(s){let e=Hr(s.name);return{url:`${ir}${s.name}`,label:s.name,file:s,...e?{type:fs}:{}}}async function Bo(s){return Hr(s.name)?Rs(await s.getFile()):{url:`${ir}${s.name}`,label:s.name,localFile:s}}function zo(){return typeof window>"u"?null:window.showOpenFilePicker??null}function Oo(s){return s instanceof DOMException&&s.name==="AbortError"}function No(s){let e=s.currentTarget.files?.[0];return s.currentTarget.value="",e?Rs(e):null}function Jr({localFiles:s,logger:e,reportError:t,playlist:r,clearError:i}){let n=Fo(null),o=!!s,a=h=>{i();let p=[...r.sources,h];r.setSources(p),r.goTo(p.length-1),e.event?.("local_file_open",{label:he(h)})};return{enabled:o,fileInputProps:{ref:n,accept:us,onChange:h=>{let p=No(h);p&&a(p)}},localLabel:ds,openLocalFile:async()=>{if(!o)return;let h=zo();if(!h){n.current?.click();return}try{let u=(await h({types:[{description:"Volumetric video",accept:{"application/octet-stream":[...Xr]}}]}))[0];u&&a(await Bo(u))}catch(p){Oo(p)||t(be(p),{phase:"local-file"})}}}}import{useRef as ei}from"react";function ti(s){let{containerRef:e,muted:t=!1,moduleFactory:r,overlay:i,eventLogger:n,onReady:o,onProgress:a,onModeChange:l,onXRStart:c,onXREnd:h}=s,p=ei({onReady:o,onProgress:a,onModeChange:l,onXRStart:c,onXREnd:h});p.current={onReady:o,onProgress:a,onModeChange:l,onXRStart:c,onXREnd:h};let u=ei(null),d=ei(!1),m=Qt({containerRef:e,moduleFactory:r,moduleUrl:r?void 0:gs(),overlay:i,eventLogger:n,onReady(){d.current||(d.current=!0,t||u.current?.app?.enableAudio()),p.current.onReady?.()},onProgress:f=>p.current.onProgress?.(f),onModeChange:(f,_)=>p.current.onModeChange?.(f,_),onXRStart:()=>p.current.onXRStart?.(),onXREnd:()=>p.current.onXREnd?.()});u.current=m;let g=$t(m);return{gracia:m,playlist:g}}import{useCallback as ri,useMemo as Ls,useState as Go}from"react";function Do(s){switch(s){case"init":case"load":case"xr":case"streaming":case"fullscreen":case"local-file":return s;default:return}}function ii(s,e){let[t,r]=Go(null),i=Ls(()=>ws(s,e),[s,e]),n=ri((c,h)=>{r({error:c,phase:Do(h?.phase)})},[]),o=Ls(()=>({event:(c,h)=>i.event?.(c,h),error:(c,h)=>{n(c,h),i.error?.(c,h)}}),[i,n]),a=ri((c,h)=>{n(c,h),i.error?.(c,h)},[i,n]),l=ri(()=>r(null),[]);return{interactionError:t,logger:o,reportError:a,clearError:l}}import{useEffect as ma}from"react";import{useEffect as Xo,useRef as Ho}from"react";function si({isInitialized:s,sources:e,streaming:t,playlist:r,reportError:i}){let n=Ho(i);n.current=i,Xo(()=>{if(!s)return;let o=!1,a=l=>{o||l.length===0||(r.setSources(l),r.goTo(0))};if(t?.length)return Ye(t,ys()).then(a).catch(l=>{o||n.current(be(l),{phase:"streaming"})}),()=>{o=!0};a(e)},[s,e,t,r.setSources,r.goTo])}import{useEffect as Vo,useRef as ks}from"react";function ni({currentSource:s,index:e,onSceneChange:t}){let r=ks(t);r.current=t;let i=ks(null);Vo(()=>{if(!s||e<0)return;let n=`${e}:${he(s)}`;i.current!==n&&(i.current=n,r.current?.(s,e))},[s,e])}import{useEffect as Uo,useState as Wo}from"react";var Yo=500;function oi(s,e,t){let[r,i]=Wo(!1),n=rr(s.mode)?s.mode:null;Uo(()=>{(!n||!s.xr.isActive)&&i(!1)},[n,s.xr.isActive]);let o=h=>{t(),i(!0),s.xr.setMode(h).catch(p=>{i(!1),e(be(p),{phase:"xr",target:h})})},a=()=>{i(!1),s.xr.setMode(ce.PW).catch(h=>{e(be(h),{phase:"xr",target:ce.PW})})},c=Qr(r&&!s.error,Yo)&&s.xr.isActive?n:null;return{enter:o,exit:a,activeScreenMode:c}}import{signal as xe}from"@preact/signals-core";import{Container as Z,Fullscreen as $o,Svg as Oe,Text as ar}from"@react-three/uikit";import{signal as ze}from"@preact/signals-core";import{forwardHtmlEvents as Zo}from"@pmndrs/pointer-events";import{createRoot as qo}from"@react-three/fiber";var nr=class{#e;#r;#t;#i;#s;#o;#n=null;#a=null;#l;#c;#h=null;#p=null;#u=null;#f=!1;#m=!1;#d=!1;#g=!1;#b;#v;#w;#_;#y;#x;constructor(e,{pixelWidth:t,pixelHeight:r,worldWidth:i,worldHeight:n,cursorFactory:o,react:a=!1}){this.#s=e,this.#o=o,this.#f=a,this.#e=t*2,this.#r=r*2,this.#t=document.createElement("canvas"),this.#t.width=this.#e,this.#t.height=this.#r,this.#i=new e.WebGLRenderer({canvas:this.#t,alpha:!0,antialias:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.#i.setClearColor(0,0),this.#i.setSize(this.#e,this.#r,!1),this.#l=new e.Scene,this.#c=new e.OrthographicCamera(0,t,r,0,.1,10),this.#c.position.z=5,this.#b=new e.Raycaster,this.#v=new e.Vector3,this.#w=new e.Vector3,this.#_=new e.Quaternion,this.#y=new e.Mesh(new e.PlaneGeometry(i,n),new e.MeshBasicMaterial({visible:!1,side:e.DoubleSide}));let l=new e.SphereGeometry(.008,8,8),c=()=>new e.MeshBasicMaterial({color:65280,depthTest:!1});this.#x=[0,1].map(()=>{let h=new e.Mesh(l,c());return h.renderOrder=1001,h.visible=!1,h})}get canvas(){return this.#t}get scene(){return this.#l}get pixelWidth(){return this.#e/2}get pixelHeight(){return this.#r/2}get internalWidth(){return this.#e}get internalHeight(){return this.#r}get pointer(){return this.#n}get cursor(){return this.#a?.mesh??null}get ptrPressed(){return this.#m}get reactPending(){return this.#f}get hitMesh(){return this.#y}get hitSpheres(){return this.#x}async mountReact(e){this.#h=qo(this.#t),await this.#h.configure({frameloop:"never",orthographic:!0,size:{width:this.#e/2,height:this.#r/2},dpr:2,gl:this.#i,events:()=>({enabled:!1,priority:0,handlers:{}})}),this.#p=this.#h.render(e),this.#l=this.#p.getState().scene,this.#u=Zo(this.#t,()=>this.#p.getState().camera,this.#l,{batchEvents:!1}),this.#f=!1}patchCanvasForXR(){let e=this.pixelWidth,t=this.pixelHeight;this.#t.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,right:e,bottom:t,width:e,height:t,toJSON(){}});let r=new Set;this.#t.setPointerCapture=i=>r.add(i),this.#t.releasePointerCapture=i=>r.delete(i),this.#t.hasPointerCapture=i=>r.has(i)}setPointer(e,t,r,i=!1){if(!this.#n){if(!this.#l)return;this.#n={x:e,y:t,pressed:r};let c=this.#o(this.#s);c.position.z=.06,this.#l.add(c),this.#a={mesh:c,sx:e,sy:this.pixelHeight-t}}let n=this.#n;n.x=e,n.y=t,n.pressed=r;let o=this.#a,a=this.pixelHeight-t,l=o.mesh.visible?.6:1;o.sx+=(e-o.sx)*l,o.sy+=(a-o.sy)*l,o.mesh.visible=!0,this.#p?o.mesh.position.set(o.sx-this.pixelWidth/2,o.sy-this.pixelHeight/2,.06):o.mesh.position.set(o.sx,o.sy,.06),o.mesh.material.opacity=r?1:.7,i&&this.#S(e,t,r)}clearPointer(e=!1){e&&this.#n&&(this.#d?this.#g=!0:this.#T()),this.#n=null,this.#a&&(this.#a.mesh.visible=!1)}renderScene(){this.#f||(this.#u?.update(),this.#p?this.#p.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#l,this.#c))}clampAlpha(e){let t=this.#i.getContext();t.colorMask(!1,!1,!1,!0),t.clearColor(0,0,0,e),t.clear(t.COLOR_BUFFER_BIT),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0)}initFlat(){let e=!1,t=r=>{let i=this.#t.getBoundingClientRect();return{x:(r.clientX-i.left)/i.width*this.pixelWidth,y:(r.clientY-i.top)/i.height*this.pixelHeight}};this.#t.addEventListener("pointerdown",r=>{e=!0,this.#t.setPointerCapture(r.pointerId);let i=t(r);this.setPointer(i.x,i.y,!0)}),this.#t.addEventListener("pointermove",r=>{let i=t(r);this.setPointer(i.x,i.y,e)}),this.#t.addEventListener("pointerup",r=>{e=!1;let i=t(r);this.setPointer(i.x,i.y,!1)}),this.#t.addEventListener("pointerleave",()=>{e=!1,this.clearPointer()})}renderFlat(){this.#f||(this.#u?.update(),this.#p?this.#p.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#l,this.#c))}castRay(e,t){let r=e.rayTransform.position,i=e.rayTransform.orientation;return this.#v.set(r.x,r.y,r.z),this.#w.set(0,0,-1).applyQuaternion(this.#_.set(i.x,i.y,i.z,i.w)),this.rayHitQuad(this.#v,this.#w,t)}rayHitQuad(e,t,r=0){let i=this.pixelWidth,n=this.pixelHeight,o=this.#x[r];this.#b.ray.origin.copy(e),this.#b.ray.direction.copy(t);let a=this.#b.intersectObject(this.#y);if(a.length===0)return o.visible=!1,null;let l=a[0].point,c=a[0].uv;if(!c)return o.visible=!1,null;let h=c.x*i,p=(1-c.y)*n;return h<0||h>i||p<0||p>n?(o.visible=!1,null):(o.position.copy(l),o.visible=!0,o.updateMatrixWorld(!0),{x:h,y:p})}gazeHitsQuad(e,t){if(!e?.transform)return!0;let r=e.transform.position,i=e.transform.orientation,n=-2*(i.w*i.y+i.x*i.z),o=-2*(i.y*i.z-i.w*i.x),a=2*(i.x*i.x+i.y*i.y)-1,l=t||this.#y.position,c=l.x-r.x,h=l.y-r.y,p=l.z-r.z,u=Math.sqrt(c*c+h*h+p*p)||1;return(n*c+o*h+a*p)/u>.6}dispose(){this.#u?.destroy(),this.#u=null,this.#h&&(this.#h.unmount(),this.#h=null,this.#p=null),this.#i?.dispose(),this.#i=null}#S(e,t,r){let i=this.#m;this.#m=r;let n={clientX:e,clientY:t,pointerId:1,pointerType:"mouse",isPrimary:!0};this.#d=!0;try{r&&!i&&this.#t.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1,bubbles:!0})),this.#t.dispatchEvent(new PointerEvent("pointermove",{...n,buttons:r?1:0,bubbles:!0})),!r&&i&&this.#t.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0,bubbles:!0}))}finally{this.#d=!1}this.#g&&(this.#g=!1,this.#T())}#T(){let e={pointerId:1,pointerType:"mouse",isPrimary:!0};this.#m&&this.#t.dispatchEvent(new PointerEvent("pointerup",{...e,button:0,buttons:0,bubbles:!0})),this.#t.dispatchEvent(new PointerEvent("pointerleave",{...e,bubbles:!1})),this.#m=!1}};var jo=`attribute vec2 a_pos;
varying vec2 v_uv;
uniform mat4 u_mvp;
void main() {
    v_uv = a_pos + 0.5;
    gl_Position = u_mvp * vec4(a_pos, 0.0, 1.0);
}`,Qo=`precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_alpha;
void main() {
    vec4 c = texture2D(u_tex, v_uv);
    gl_FragColor = vec4(c.rgb, c.a * u_alpha);
}`,or=class{#e=null;#r=null;#t=null;#i=!1;#s=null;#o=null;#n=null;#a=null;#l=null;#c=null;#h=null;#p=null;#u;#f;#m;#d;#g;#b;#v;#w;#_;#y;#x;constructor(e,{worldWidth:t,worldHeight:r,internalWidth:i,internalHeight:n,canvas:o}){this.#_=t,this.#y=r,this.#v=i,this.#w=n,this.#x=o,this.#u=new e.Matrix4,this.#f=new e.Matrix4,this.#m=new e.Matrix4,this.#d=new e.Vector3,this.#g=new e.Quaternion,this.#b=new e.Vector3(t,r,1)}get projected(){return this.#i}get layer(){return this.#r}get pose(){return this.#s??null}async init(e,t,r,i){if(this.#e=i,t)try{return this.#t=t,this.#r=t.createQuadLayer({space:r,viewPixelWidth:this.#v,viewPixelHeight:this.#w,layout:"mono",isStatic:!1,width:this.#_/2,height:this.#y/2}),this.stash(),this.#r}catch{this.#r=null,this.#t=null}return this.#i=!0,this.#S(i),null}stash(){this.#o=null,this.#r&&(this.#r.transform=new XRRigidTransform({x:0,y:-1e3,z:0},{x:0,y:0,z:0,w:1}))}setTransform(e){this.#s=e,this.#o=e}applyPose(e,t,r,i,n,o,a){let l=new XRRigidTransform({x:e,y:t,z:r},{x:i,y:n,z:o,w:a});this.#s=l,this.#o=l}upload(e){this.#r?(this.#o&&(this.#r.transform=this.#o,this.#o=null),this.#T(e,this.#t.getSubImage(this.#r,e)?.colorTexture)):(this.#T(e,this.#c),this.#o=null)}renderEye(e,t,r,i,n,o,a,l){if(!this.#i||!l||!this.#s)return;let c=this.#s.position,h=this.#s.orientation;this.#d.set(c.x,c.y,c.z),this.#g.set(h.x,h.y,h.z,h.w),this.#u.compose(this.#d,this.#g,this.#b),this.#m.fromArray(t.transform.inverse.matrix),this.#f.multiplyMatrices(this.#m,this.#u),this.#m.fromArray(t.projectionMatrix),this.#f.premultiply(this.#m),e.viewport(r,i,n,o),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(this.#n),e.uniformMatrix4fv(this.#h,!1,this.#f.elements),e.uniform1f(this.#p,a),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.#c),e.bindVertexArray(this.#a),e.drawArrays(e.TRIANGLES,0,6),e.bindVertexArray(null),e.disable(e.BLEND),e.useProgram(null)}dispose(){let e=this.#e;e&&this.#i&&(this.#n&&e.deleteProgram(this.#n),this.#a&&e.deleteVertexArray(this.#a),this.#l&&e.deleteBuffer(this.#l),this.#c&&e.deleteTexture(this.#c)),this.#r=this.#t=this.#e=null,this.#n=this.#a=this.#l=this.#c=null}#S(e){let t=e.createShader(e.VERTEX_SHADER);e.shaderSource(t,jo),e.compileShader(t);let r=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(r,Qo),e.compileShader(r),this.#n=e.createProgram(),e.attachShader(this.#n,t),e.attachShader(this.#n,r),e.linkProgram(this.#n),e.deleteShader(t),e.deleteShader(r),this.#h=e.getUniformLocation(this.#n,"u_mvp"),this.#p=e.getUniformLocation(this.#n,"u_alpha"),e.useProgram(this.#n),e.uniform1i(e.getUniformLocation(this.#n,"u_tex"),0),e.uniform1f(this.#p,1);let i=e.getAttribLocation(this.#n,"a_pos");this.#a=e.createVertexArray(),e.bindVertexArray(this.#a),this.#l=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.#l),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-.5,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5]),e.STATIC_DRAW),e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),this.#c=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.#c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.#v,this.#w,0,e.RGBA,e.UNSIGNED_BYTE,null),e.generateMipmap(e.TEXTURE_2D)}#T(e,t){if(!t)return;let r=this.#e,i=!this.#i;r.bindTexture(r.TEXTURE_2D,t),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,this.#i?r.LINEAR_MIPMAP_LINEAR:r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!0),i&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,this.#x),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),i&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this.#i&&r.generateMipmap(r.TEXTURE_2D)}};function ai(s,e,t){let r=Math.sqrt(s*s+e*e+t*t)||1,i=Math.atan2(s/r,t/r)+Math.PI,n=Math.asin(e/r),o=i/2,a=n/2,l=Math.cos(o),c=Math.sin(o),h=Math.cos(a),p=Math.sin(a);return{qx:l*p,qy:c*h,qz:-c*p,qw:l*h}}var qe=class{#e;#r;#t=!1;#i=!1;#s;#o;#n=null;#a=null;#l=!1;#c=null;#h=!1;#p=!1;#u=!1;#f=null;alpha=1;onDragTick=null;onDragEnd=null;constructor(e,t){this.#s=t.quadZ??.5,this.#o=t.quadY??-.5,this.#e=new nr(e,t),this.#r=new or(e,{worldWidth:t.worldWidth,worldHeight:t.worldHeight,internalWidth:this.#e.internalWidth,internalHeight:this.#e.internalHeight,canvas:this.#e.canvas})}get canvas(){return this.#e.canvas}get scene(){return this.#e.scene}get pixelWidth(){return this.#e.pixelWidth}get pixelHeight(){return this.#e.pixelHeight}get hitMesh(){return this.#e.hitMesh}get hitSpheres(){return this.#e.hitSpheres}get pointer(){return this.#e.pointer}get cursor(){return this.#e.cursor}async mountReact(e){return this.#e.mountReact(e)}rayHitQuad(e,t,r){return this.#e.rayHitQuad(e,t,r)}gazeHitsQuad(e,t){return this.#e.gazeHitsQuad(e,t)}get projected(){return this.#r.projected}get layer(){return this.#r.layer}get pose(){return this.#r.pose}get visible(){return this.#t}get placing(){return this.#i}get session(){return this.#n}get interacting(){return this.#t&&(this.#p||this.#l||this.#u||!!this.#a)}get dragging(){return this.#l}set dragging(e){this.#l=e}get panelDragging(){return this.#u}set panelDragging(e){this.#u=e,e||this.onDragEnd?.()}setPointer(e,t,r){this.#e.setPointer(e,t,r,!!this.#n)}clearPointer(){this.#e.clearPointer(!!this.#n)}initFlat(){this.#t=!0,this.#e.initFlat()}renderFlat(){this.#t&&this.#e.renderFlat()}async init(e,t,r,i){return this.#n=e,this.#e.patchCanvasForXR(),this.#r.init(e,t,r,i)}show(){this.#i=!0}hide(){if(this.#e.clearPointer(!!this.#n),this.#l=!1,this.#c=null,this.#a=null,this.#u=!1,this.onDragEnd?.(),this.#t&&this.#r.pose){let e=this.#r.pose.position,t=this.#r.pose.orientation;this.#f={x:e.x,y:e.y,z:e.z,qx:t.x,qy:t.y,qz:t.z,qw:t.w}}this.#t=this.#i=!1;for(let e of this.#e.hitSpheres)e.visible=!1;this.#r.stash()}setTransform(e){this.#r.setTransform(e)}stash(){this.#r.stash()}applyPose(e,t,r,i,n,o,a){this.#r.applyPose(e,t,r,i,n,o,a);let l=this.#e.hitMesh;l.position.set(e,t,r),l.quaternion.set(i,n,o,a),l.updateMatrixWorld(!0)}updatePosition(e){if(!this.#i||!e)return;if(this.#i=!1,this.#t=!0,this.#f){let m=this.#f;this.#f=null,this.applyPose(m.x,m.y,m.z,m.qx,m.qy,m.qz,m.qw);return}let t=e.transform.position,r=e.transform.orientation,i=Math.atan2(2*(r.w*r.y+r.x*r.z),1-2*(r.y*r.y+r.z*r.z)),n=-Math.sin(i),o=-Math.cos(i),a=t.x+n*this.#s,l=t.y+this.#o,c=t.z+o*this.#s,{qx:h,qy:p,qz:u,qw:d}=ai(a-t.x,l-t.y,c-t.z);this.applyPose(a,l,c,h,p,u,d)}drawContent(e){!this.#t||this.#e.reactPending||(this.#e.renderScene(),this.alpha<1&&!this.#r.projected&&this.#e.clampAlpha(this.alpha),this.#r.upload(e))}renderEye(e,t,r,i,n,o){this.#r.renderEye(e,t,r,i,n,o,this.alpha,this.#t)}handleInput(e,t,r){if(!this.#n)return!1;let i=!1,n=!1,o=null,a=null;for(let c of this.#e.hitSpheres)c.visible=!1;for(let[c,h]of[["left",e],["right",t]]){if(h?.menuPressed&&(i=!0),!h?.active||!this.#t||!h.rayTransform||h.held)continue;let p=c==="left"?0:1,u=this.#e.castRay(h,p);if(u){let d={hand:h,hit:u,side:c,trigger:!!h.triggerPressed};c==="left"?o=d:a=d}}let l=!!(o||a);if(this.#u){if(this.#r.pose&&r?.transform&&this.onDragTick){let c=this.onDragTick(e,t,r,this.#c,this.#r.pose);c?this.applyPose(c.x,c.y,c.z,c.qx,c.qy,c.qz,c.qw):(this.#u=!1,this.onDragEnd?.())}}else{let c=null;if(this.#a){let h=this.#a==="left"?o:a,p=this.#a==="left"?e:t,u=!!p?.triggerPressed;c=h||(u?{hand:p,hit:null,side:this.#a,trigger:u}:null),u||(this.#a=null)}if(!c){let h=this.#c;c=h==="left"?o||a:h==="right"?a||o:o||a}if(c){this.#c=c.side??this.#c;let h=this.#c==="left"?1:0;if(this.#e.hitSpheres[h].visible=!1,c.hit){let p=this.#e.ptrPressed;this.setPointer(c.hit.x,c.hit.y,c.trigger),c.trigger&&!p&&!this.#a&&(this.#a=this.#c)}else this.#e.pointer?this.setPointer(this.#e.pointer.x,this.#e.pointer.y,c.trigger):this.clearPointer();c.hand?.isTransientPointer&&(n=!0)}else this.clearPointer(),this.#c=null;this.#p=!!(o||a)}return i&&!this.#h&&(this.#t||this.#i?l||this.hide():this.show()),this.#h=i,n}dispose(){this.#t=!1,this.#n=null,this.#e.dispose(),this.#r.dispose()}};var je=class{_quad;_sig=null;onPlayPause=null;onSeek=null;onPresetCycle=null;onExit=null;onClose=null;onSceneNav=null;constructor(e,t){this._quad=new qe(e,{...t,react:!0})}get quad(){return this._quad}_createBaseSignals(){return{loadingD:ze("none"),contentD:ze("flex"),playD:ze("flex"),pauseD:ze("none"),spinD:ze("none"),spinR:ze(0),spinFast:ze(!1)}}_updatePlayback(e,{loading:t,playing:r,spinning:i,buffering:n,progress:o}){e.loadingD.value=t?"flex":"none",e.contentD.value=t?"none":"flex",e.playD.value=!i&&!r?"flex":"none",e.pauseD.value=!i&&r?"flex":"none",e.spinD.value=i?"flex":"none",e.spinFast.value=i&&!n,this._quad.dragging||this._setProgress(o)}render(e){let t=this._sig;if(!this._quad.visible||!t)return;let r=t.loadingD.value==="flex",i=r?20:t.spinFast.value?14:6;(t.spinD.value==="flex"||r)&&(t.spinR.value-=e*i)}_seekFromEvent(e){this._seekTo(e.point.x+this._quad.pixelWidth/2)}_seekTo(e){}_setProgress(e){}};import{jsx as O,jsxs as cr}from"react/jsx-runtime";var Je=s=>`data:image/svg+xml,${encodeURIComponent(s)}`,Ko=Je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#aaaaaa"/></svg>'),Jo=Je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#aaaaaa"/></svg>'),ea=Je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#666666"/></svg>'),As=Je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1 1 2 12L5 12A7 7 0 1 0 12 5Z" fill="#888888"/></svg>'),ta=Je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z" fill="#888888"/></svg>'),ra=Je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.6 16.6L10 18l6-6-6-6-1.4 1.4L13.2 12z" fill="#888888"/></svg>'),$e=30,Ie=520,zs=72,lr=zs+$e,ve=$e+zs/2,Is=14,vt=40,_t=26,Qe=6,Fs=26,hr=14,li=hr/2,pr=20,ci=pr/2,wt=50,Bs=32,hi={borderOpacity:.65},Ke=class extends je{#e=0;#r=0;constructor(e){let r=.86*(lr/Ie);super(e,{pixelWidth:Ie,pixelHeight:lr,worldWidth:.86,worldHeight:r,quadY:-.3,cursorFactory:i=>{let n=new i.Mesh(new i.CircleGeometry(4,32),new i.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#t().catch(i=>{})}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:o="0:00 / 0:00",presetName:a=null,sceneText:l=null,sceneLabel:c=null}){let h=this._sig;if(h&&(this._updatePlayback(h,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),h.timeT.value=o,h.presetT&&a!=null&&(h.presetT.value=a),l!=null&&(h.sceneT.value=l),c!=null)){let p=String(c);h.sceneSub.value=p.length>Bs?`${p.slice(0,Bs-2)}...`:p}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-this.#e)/this.#r));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=this.#r*e;t.fillW.value=Math.max(.001,r),t.thumbL.value=this.#e+r-li,t.thumbGlowL.value=this.#e+r-ci}async#t(){let e=this._quad,t=Is,r=ve-vt/2,i=Ie-Is-_t,n=ve-_t/2,o=i-10,a=66,l=24,c=o-a,h=ve-l/2;o=c-8;let p=78,u=o-p,d=ve-9,m=this.#e=t+vt+12,g=this.#r=u-10-m,f=this._sig={...this._createBaseSignals(),fillW:xe(.001),thumbL:xe(m-li),thumbGlowL:xe(m-ci),thumbS:xe(1),thumbGlowOp:xe(0),timeT:xe("0:00 / 0:00"),sceneT:xe("1/1"),sceneSub:xe("SCENE"),presetT:xe("Off")},_=()=>{f.thumbGlowOp.value=.5,f.thumbS.value=1.15},x=()=>{e.dragging||(f.thumbGlowOp.value=0,f.thumbS.value=1)},S=C=>{C.target.setPointerCapture(C.pointerId),e.dragging=!0,this._seekFromEvent(C)},b=C=>{e.dragging&&this._seekFromEvent(C)},v=()=>{e.dragging=!1,f.thumbGlowOp.value=0,f.thumbS.value=1},T={backgroundColor:1710618},P=cr($o,{backgroundColor:657930,backgroundOpacity:.88,children:[cr(Z,{positionType:"absolute",positionLeft:0,positionTop:0,width:Ie,height:lr,display:f.contentD,borderWidth:1,borderColor:3355443,borderOpacity:.3,children:[O(Z,{positionType:"absolute",positionLeft:0,positionTop:0,width:wt,height:$e,hover:T,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(-1),children:O(Oe,{src:ta,width:18,height:18,pointerEvents:"none"})}),cr(Z,{positionType:"absolute",positionLeft:wt,positionTop:0,width:Ie-wt*2,height:$e,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,overflow:"hidden",children:[O(ar,{fontSize:13,color:11184810,children:f.sceneT}),O(ar,{fontSize:10,color:6710886,children:f.sceneSub})]}),O(Z,{positionType:"absolute",positionLeft:Ie-wt,positionTop:0,width:wt,height:$e,hover:T,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(1),children:O(Oe,{src:ra,width:18,height:18,pointerEvents:"none"})}),O(Z,{positionType:"absolute",positionLeft:0,positionTop:$e,width:Ie,height:.5,backgroundColor:3355443,backgroundOpacity:.5,pointerEvents:"none"}),cr(Z,{positionType:"absolute",positionLeft:t,positionTop:r,width:vt,height:vt,borderRadius:vt/2,borderWidth:1,borderColor:4473924,borderOpacity:.5,hover:hi,alignItems:"center",justifyContent:"center",onClick:()=>this.onPlayPause?.(),children:[O(Oe,{display:f.playD,src:Ko,width:20,height:20,marginLeft:2,pointerEvents:"none"}),O(Oe,{display:f.pauseD,src:Jo,width:18,height:18,pointerEvents:"none"}),O(Oe,{display:f.spinD,src:As,width:24,height:24,transformRotateZ:f.spinR,pointerEvents:"none"})]}),O(Z,{positionType:"absolute",positionLeft:m,positionTop:ve-Fs/2,width:g,height:Fs,onPointerEnter:_,onPointerLeave:x,onPointerDown:S,onPointerMove:b,onPointerUp:v}),O(Z,{positionType:"absolute",positionLeft:m,positionTop:ve-Qe/2,width:g,height:Qe,borderRadius:Qe/2,backgroundColor:2236962,backgroundOpacity:.8,pointerEvents:"none"}),O(Z,{positionType:"absolute",positionLeft:m,positionTop:ve-Qe/2,width:f.fillW,height:Qe,borderRadius:Qe/2,backgroundColor:7829367,zIndexOffset:1,pointerEvents:"none"}),O(Z,{positionType:"absolute",positionLeft:f.thumbGlowL,positionTop:ve-pr/2,width:pr,height:pr,borderRadius:ci,borderWidth:2,borderColor:10066329,borderOpacity:f.thumbGlowOp,zIndexOffset:2,pointerEvents:"none"}),O(Z,{positionType:"absolute",positionLeft:f.thumbL,positionTop:ve-hr/2,width:hr,height:hr,borderRadius:li,backgroundColor:11184810,transformScaleX:f.thumbS,transformScaleY:f.thumbS,zIndexOffset:3,pointerEvents:"none"}),O(Z,{positionType:"absolute",positionLeft:u,positionTop:d,width:p,height:18,alignItems:"center",justifyContent:"center",children:O(ar,{fontSize:13,color:16777215,opacity:.35,children:f.timeT})}),O(Z,{positionType:"absolute",positionLeft:i,positionTop:n,width:_t,height:_t,borderRadius:_t/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:hi,alignItems:"center",justifyContent:"center",onClick:()=>this.onExit?.(),children:O(Oe,{src:ea,width:11,height:11,pointerEvents:"none"})}),O(Z,{positionType:"absolute",positionLeft:c,positionTop:h,width:a,height:l,borderRadius:l/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:hi,alignItems:"center",justifyContent:"center",onClick:()=>this.onPresetCycle?.(),children:O(ar,{fontSize:11,color:10066329,pointerEvents:"none",children:f.presetT})})]}),O(Z,{positionType:"absolute",positionLeft:0,positionTop:0,width:Ie,height:lr,backgroundColor:657930,backgroundOpacity:1,display:f.loadingD,alignItems:"center",justifyContent:"center",children:O(Oe,{src:As,width:40,height:40,transformRotateZ:f.spinR,pointerEvents:"none"})})]});await e.mountReact(P)}};var et=class{#e;#r;#t=null;#i=null;#s;#o;#n;#a;constructor(e,t){this.#e=e,this.#r=t;let r=t.scene,i=new e.BufferGeometry().setFromPoints([new e.Vector3(0,0,0),new e.Vector3(0,0,-5)]),n=new e.SphereGeometry(.015,6,6);this.#s=new e.MeshBasicMaterial({color:16711680,depthTest:!1}),this.#o=new e.MeshBasicMaterial({color:65280,depthTest:!1});let o=()=>{let a=new e.Group,l=new e.Group,c=new e.Line(i,new e.LineBasicMaterial({color:5227511,transparent:!0,opacity:.5,depthTest:!1}));c.visible=!1,a.add(c);let h=new e.Mesh(n,this.#s),p=new e.Mesh(n,this.#s);return h.renderOrder=p.renderOrder=999,h.visible=p.visible=!1,r.add(a,l,h,p),{ray:a,grip:l,line:c,idxSphere:h,thmSphere:p}};this.#n=o(),this.#a=o()}update(e,t){this.#l(),this.#c(this.#n,e),this.#c(this.#a,t)}dispose(){this.#t&&(this.#r.anchor.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose());for(let e of[this.#n,this.#a])e.line.material.dispose(),e.idxSphere.geometry.dispose(),e.thmSphere.geometry.dispose();this.#s.dispose(),this.#o.dispose()}#l(){let e=this.#r.bboxMesh;if(e===this.#i)return;this.#i=e;let t=this.#r.anchor;if(this.#t&&(t.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose(),this.#t=null),!e)return;let r=this.#e;this.#t=new r.LineSegments(new r.EdgesGeometry(e.geometry),new r.LineBasicMaterial({color:58879,transparent:!0,opacity:.35,depthTest:!1})),this.#t.position.copy(e.position),t.add(this.#t)}#c(e,t){if(t.rayTransform&&this.#h(e.ray,t.rayTransform),t.gripTransform&&this.#h(e.grip,t.gripTransform),e.line.visible=t.active,e.idxSphere.visible=e.thmSphere.visible=!1,!t.active)return;t.indexTip&&(e.idxSphere.position.set(t.indexTip.x,t.indexTip.y,t.indexTip.z),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0)),t.thumbTip&&(e.thmSphere.position.set(t.thumbTip.x,t.thumbTip.y,t.thumbTip.z),e.thmSphere.visible=!0,e.thmSphere.updateMatrixWorld(!0)),t.indexTip||(e.idxSphere.position.copy(e.grip.position),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0));let r=t.gripping?this.#o:this.#s;e.idxSphere.material=r,t.thumbTip&&(e.thmSphere.material=r)}#h(e,t){let r=t.position,i=t.orientation;e.position.set(r.x,r.y,r.z),e.quaternion.set(i.x,i.y,i.z,i.w),e.updateMatrixWorld(!0)}};import{signal as R}from"@preact/signals-core";import{Container as k,Fullscreen as ia,Image as sa,Svg as V,Text as q}from"@react-three/uikit";import{jsx as y,jsxs as oe}from"react/jsx-runtime";var B=9684710,ne=1122603,na=661021,oa=2636615,aa=4086636,N=680,Ge=248,pe=34,Pe=48,Se=pe+Pe,Xs=Pe,St=26,Ne=Ge+Xs,Os=32,Y=88,Te=60,Fe=Ge-Te,_e=(N-Y)/7,fe=Math.round(N/3),Hs=12,X=34,j=Y+Hs,rt=N-Y-Hs*2,we=Se+50,ui=rt-X,Me=24,ur=18,di=j+Me,fi=ui-Me*2,Vs=s=>Math.max(0,Math.min(1,s)),la=s=>Math.min(1,Math.max(.01,s>0?.1/s:.01)),pi=(s,e)=>e?di+fi*s:j+ui*s,ca=(s,e)=>Vs((s-X/2-(e?di:j))/(e?fi:ui)),Us=s=>s==="a"?-Me:X,dr=(s,e)=>pi(s,!0)+Us(e),fr=(s,e)=>Vs((s-Us(e)-di)/fi),W=(s,e="#93c6e6")=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${s}" fill="${e}"/></svg>`),ha="data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${rt*2}" height="${X*2}" viewBox="0 0 ${rt} ${X}"><defs><pattern id="h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1.5" height="6" fill="#93c6e6" fill-opacity="0.2"/></pattern></defs><rect width="100%" height="100%" fill="#0a161d"/><rect width="100%" height="100%" fill="url(#h)"/></svg>`),Ns="M8.76 21.6 7.221 20.1177 8.949 18.4235H8.76c-2.106 0-3.8925-.7191-5.3595-2.1573C1.9335 14.8279 1.2 13.0765 1.2 11.0118s.7335-3.81621 2.2005-5.25444C4.8675 4.31912 6.654 3.60001 8.76 3.60001h6.48c2.106 0 3.8925.71911 5.3595 2.15735C22.0665 7.19559 22.8 8.94707 22.8 11.0118s-.7335 3.8161-2.2005 5.2544c-1.467 1.4382-3.2535 2.1573-5.3595 2.1573v-2.1176c1.494 0 2.7675-.5162 3.8205-1.5485 1.053-1.0324 1.5795-2.2809 1.5795-3.7456s-.5265-2.71326-1.5795-3.74562c-1.053-1.03235-2.3265-1.54853-3.8205-1.54853H8.76c-1.494 0-2.7675.51618-3.8205 1.54853C3.8865 8.29854 3.36 9.54707 3.36 11.0118s.5265 2.722 1.5795 3.772c1.053 1.05 2.3265 1.628 3.8205 1.7339h.432l-1.944-1.9059 1.512-1.4824 4.32 4.2353L8.76 21.6Z",U={play:W("M8 5v14l11-7z"),pause:W("M6 4h4v16H6zm8 0h4v16h-4z"),spin:W("M12 2a10 10 0 1 1-10 10h3a7 7 0 1 0 7-7z"),bulb:W("M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"),mute:W("M7 9v6h4l5 5V4l-5 5H7z"),vol:W("M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"),loop:W(Ns),loopOn:W(Ns,"#11212b"),reset:W("M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"),exit:W("M17 7l-1.4 1.4L18.2 11H8v2h10.2l-2.6 2.6L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"),grip:W("M15.5 15.4V8.6L18.9 12l-3.4 3.4zM8.5 8.6v6.8L5.1 12l3.4-3.4z"),close:W("M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"),scale:W("M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z"),lock:W("M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"),unlk:W("M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"),arrL:W("M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"),arrR:W("M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z")},tt={backgroundColor:1849416},Gs=.9,pa=-.55,Ds=.866,it=class extends je{#e;#r=null;#t={phase:"off",start:0,end:1,gap:.01};#i=null;#s=null;#o;#n;onMuteToggle=null;onScaleLockToggle=null;onLockToggle=null;onReset=null;onAbLoopToggle=null;onAbLoopSelect=null;onAbLoopChange=null;constructor(e){super(e,{pixelWidth:N,pixelHeight:Ne,worldWidth:1,worldHeight:Ne/N,quadZ:Gs,quadY:pa,cursorFactory:t=>{let r=new t.Mesh(new t.CircleGeometry(5,32),new t.MeshBasicMaterial({color:B,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return r.renderOrder=999,r}}),this.#e=e,this.#o=new e.Vector3,this.#n=new e.Quaternion,this._quad.alpha=.9,this._quad.onDragTick=(t,r,i,n,o)=>this.#a(t,r,i,n,o),this._quad.onDragEnd=()=>{this.#r=null,this._quad.alpha=.9},this.#p().catch(t=>{})}#a(e,t,r,i,n){let o=this.#e,a=this.#r,l=a?.side??i??"right",c=l==="left"?e:t;if(!c?.triggerPressed)return this.#r=null,null;let h=c.rayTransform?.orientation;if(!h){let v=n.position,T=n.orientation;return{x:v.x,y:v.y,z:v.z,qx:T.x,qy:T.y,qz:T.z,qw:T.w}}let p=this.#o.set(0,0,-1).applyQuaternion(this.#n.set(h.x,h.y,h.z,h.w));if(!a){let v=r.transform.position,T=new o.Vector3(v.x,v.y,v.z),P=n.position,C=new o.Vector3(P.x,P.y,P.z).sub(T);this.#r={side:l,R:C.length()||Gs,oQ:new o.Quaternion().setFromUnitVectors(p.clone(),C.normalize()),eye:T};let L=n.orientation;return{x:P.x,y:P.y,z:P.z,qx:L.x,qy:L.y,qz:L.z,qw:L.w}}if(p.applyQuaternion(a.oQ),Math.abs(p.y)>Ds){p.y=Math.sign(p.y)*Ds;let v=Math.sqrt(p.x*p.x+p.z*p.z)||1e-6,T=Math.sqrt(1-p.y*p.y)/v;p.x*=T,p.z*=T}let u=a.eye,d=a.R,m=u.x+p.x*d,g=u.y+p.y*d,f=u.z+p.z*d,{qx:_,qy:x,qz:S,qw:b}=ai(p.x,p.y,p.z);return{x:m,y:g,z:f,qx:_,qy:x,qz:S,qw:b}}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:o="0:00 / 0:00",presetName:a=null,muted:l=!1,locked:c=!1,scaleLocked:h=!0,abLoopPhase:p="off",abLoopStart:u=0,abLoopEnd:d=1,duration:m=0,sceneText:g=null,sceneLabel:f=null,bannerText:_=null}){let x=this._sig;if(!x)return;p!=="active"&&(this.#s=null),p!=="setB"&&(this.#i=null);let S=this.#s;if(this.#t={phase:p,start:S?.start??u,end:S?.end??d,gap:la(m)},this._updatePlayback(x,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),this.#c(x),x.playTextD.value=r?"none":"flex",x.playLbl.value=t?"PAUSE":"PLAY",x.timeT.value=o,a!=null&&(x.presetT.value=a),x.icA.value=l?"none":"flex",x.icB.value=l?"flex":"none",x.muteLbl.value=l?"UNMUTE":"MUTE",x.sclLkLbl.value=h?"UNLOCK SCALE":"LOCK SCALE",x.lockA.value=c?"none":"flex",x.lockB.value=c?"flex":"none",x.lockLbl.value=c?"UNLOCK SCENE":"LOCK SCENE",g!=null&&(x.sceneT.value=g),f!=null){let b=String(f);x.sceneSub.value=b.length>Os?`${b.slice(0,Os-2)}...`:b}_!=null&&(x.bannerT.value=_)}#l(){let{phase:e,start:t,end:r,gap:i}=this.#t,n=this.#i==null?null:Math.min(1,Math.max(t+i,this.#i));return{a:e==="off"?null:t,b:e==="active"?r:n,hover:n!=null}}#c(e){let{phase:t,start:r}=this.#t,i=t!=="off",{b:n,hover:o}=this.#l(),a=dr(r,"a"),l=dr(n??1,"b");e.abAD.value=i?"flex":"none",e.abAL.value=a,e.abBD.value=n!=null?"flex":"none",e.abBL.value=l,e.abMarkerPE.value=t==="active"?"auto":"none",e.abPreD.value=i?"flex":"none",e.abPreW.value=a-j,e.abHoverD.value=o?"flex":"none",e.abHoverL.value=a+Me,e.abHoverW.value=Math.max(0,l-a-Me),e.abLbl.value=t==="setB"?"A/B LOOP (2/2)":"A/B LOOP",e.abOnD.value=i?"flex":"none",e.abOffD.value=i?"none":"flex",e.abTxtC.value=i?ne:B}#h(e){let{a:t,b:r}=this.#l(),i=e+(X-ur)/2,n=(o,a)=>{let l=o==null?null:dr(o,a);return l!=null&&i<l+Me&&l<i+ur};return n(t,"a")||n(r,"b")}_seekTo(e){let{phase:t,start:r,end:i}=this.#t,n=ca(e,t!=="off");t==="active"&&(n=Math.max(r,Math.min(i,n))),this._setProgress(n),this.onSeek?.(n)}_setProgress(e){let t=this._sig;if(!t)return;let{phase:r,start:i,end:n}=this.#t;r!=="off"&&(e=Math.max(i,e)),r==="active"&&(e=Math.min(n,e));let o=pi(e,r!=="off"),a=r==="off"?j:pi(i,!0);t.thumbL.value=o,t.fillL.value=a,t.fillW.value=Math.max(0,o+X-a),t.thumbIconD.value=this.#h(o)?"none":"flex"}async#p(){let e=this._sig={...this._createBaseSignals(),playTextD:R("flex"),playLbl:R("PAUSE"),fillL:R(j),fillW:R(X),thumbL:R(j),thumbS:R(1),thumbIconD:R("flex"),timeT:R("0:00 / 0:00"),sceneT:R("1/5"),sceneSub:R("SCENE"),icA:R("flex"),icB:R("none"),muteLbl:R("MUTE"),sclLkLbl:R("LOCK SCALE"),lockA:R("flex"),lockB:R("none"),lockLbl:R("LOCK SCENE"),abLbl:R("A/B LOOP"),abOnD:R("none"),abOffD:R("flex"),abTxtC:R(B),abAD:R("none"),abAL:R(j),abBD:R("none"),abBL:R(j),abMarkerPE:R("none"),abPreD:R("none"),abPreW:R(0),abHoverD:R("none"),abHoverL:R(j),abHoverW:R(0),presetT:R("OFF"),bannerT:R("")},t=({x,y:S,w:b,h:v})=>y(k,{positionType:"absolute",positionLeft:x,positionTop:S,width:b,height:v,backgroundColor:B,backgroundOpacity:.3}),r=({idx:x,onClick:S,active:b=null,children:v})=>{let T=Y+x*_e;return oe(k,{positionType:"absolute",positionLeft:T,positionTop:Fe,width:_e,height:Te,backgroundColor:ne,hover:tt,onClick:S,children:[b&&y(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:_e,height:Te,backgroundColor:B,display:b,pointerEvents:"none"}),y(k,{width:"100%",height:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",children:v})]})},i=({label:x,left:S,display:b,onPointerDown:v})=>y(k,{positionType:"absolute",positionLeft:S,positionTop:we,width:Me,height:X,backgroundColor:ne,borderWidth:1,borderColor:B,hover:tt,alignItems:"center",justifyContent:"center",display:b,pointerEvents:e.abMarkerPE,zIndex:1,zIndexOffset:8,onPointerDown:v,onPointerMove:d,onPointerUp:m,children:y(q,{fontSize:13,fontWeight:"bold",color:B,pointerEvents:"none",children:x})}),n=this._quad,o=x=>x.point.x+n.pixelWidth/2,a=()=>{e.thumbS.value=1.08},l=()=>{this.#i=null,n.dragging||(e.thumbS.value=1)},c=x=>{if(this.#t.phase==="setB"){this.#i=null,this.onAbLoopSelect?.(fr(o(x)-Me/2,"b"));return}x.target.setPointerCapture(x.pointerId),n.dragging=!0,this._seekFromEvent(x)},h=x=>{this.#t.phase==="setB"?this.#i=fr(o(x)-Me/2,"b"):n.dragging&&this._seekFromEvent(x)},p=()=>{n.dragging=!1,e.thumbS.value=1},u=x=>S=>{S.target.setPointerCapture(S.pointerId);let{start:b,end:v}=this.#t,T=dr(x==="a"?b:v,x);this.#s={marker:x,offset:o(S)-T,start:b,end:v}},d=x=>{let S=this.#s;if(!S)return;let b=o(x)-S.offset,v=this.#t.gap;S.marker==="a"?S.start=Math.min(fr(b,"a"),S.end-v):S.end=Math.max(fr(b,"b"),S.start+v)},m=()=>{let x=this.#s;x&&(this.#s=null,this.onAbLoopChange?.(x.start,x.end))},g=x=>{x.target.setPointerCapture(x.pointerId),n.panelDragging=!0,n.alpha=.3},f=()=>{n.panelDragging=!1},_=oe(ia,{backgroundColor:ne,children:[oe(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:N,height:Ne,display:e.contentD,children:[y(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:N,height:pe,backgroundColor:B,backgroundOpacity:.85}),y(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:N,height:pe,alignItems:"center",justifyContent:"center",children:y(q,{fontSize:13,fontWeight:"bold",color:ne,children:e.bannerT})}),y(k,{positionType:"absolute",positionLeft:0,positionTop:pe,width:fe,height:Pe,backgroundColor:ne,hover:tt,onClick:()=>this.onSceneNav?.(-1)}),y(k,{positionType:"absolute",positionLeft:0,positionTop:pe,width:fe,height:Pe,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:y(V,{src:U.arrL,width:28,height:28})}),y(t,{x:fe,y:pe,w:.5,h:Pe}),oe(k,{positionType:"absolute",positionLeft:fe,positionTop:pe,width:N-fe*2,height:Pe,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,overflow:"hidden",children:[y(q,{fontSize:22,color:B,children:e.sceneT}),y(q,{fontSize:10,color:B,opacity:.45,children:e.sceneSub})]}),y(t,{x:N-fe,y:pe,w:.5,h:Pe}),y(k,{positionType:"absolute",positionLeft:N-fe,positionTop:pe,width:fe,height:Pe,backgroundColor:ne,hover:tt,onClick:()=>this.onSceneNav?.(1)}),y(k,{positionType:"absolute",positionLeft:N-fe,positionTop:pe,width:fe,height:Pe,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:y(V,{src:U.arrR,width:28,height:28})}),y(t,{x:0,y:Se,w:N,h:.5}),y(k,{positionType:"absolute",positionLeft:0,positionTop:Se,width:Y,height:Ge-Se,backgroundColor:ne,hover:tt,onClick:()=>this.onPlayPause?.()}),oe(k,{positionType:"absolute",positionLeft:0,positionTop:Se,width:Y,height:Ge-Se,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,pointerEvents:"none",children:[y(V,{display:e.playD,src:U.play,width:20,height:24,marginLeft:2}),y(V,{display:e.pauseD,src:U.pause,width:20,height:24}),y(V,{display:e.spinD,src:U.spin,width:28,height:28,transformRotateZ:e.spinR}),y(q,{fontSize:13,fontWeight:"bold",color:B,display:e.playTextD,children:e.playLbl})]}),y(t,{x:Y,y:Se,w:.5,h:Ge-Se}),y(k,{positionType:"absolute",positionLeft:Y+16,positionTop:Se+14,width:120,height:20,children:y(q,{fontSize:14,color:B,children:e.timeT})}),y(k,{positionType:"absolute",positionLeft:j,positionTop:we,width:rt,height:X,backgroundColor:na,onPointerEnter:a,onPointerLeave:l,onPointerDown:c,onPointerMove:h,onPointerUp:p}),y(sa,{src:ha,positionType:"absolute",positionLeft:j,positionTop:we,width:rt,height:X,objectFit:"fill",keepAspectRatio:!1,zIndexOffset:1,pointerEvents:"none"}),y(k,{positionType:"absolute",positionLeft:e.abHoverL,positionTop:we,width:e.abHoverW,height:X,backgroundColor:aa,display:e.abHoverD,zIndex:1,zIndexOffset:2,pointerEvents:"none"}),y(k,{positionType:"absolute",positionLeft:j,positionTop:we,width:e.abPreW,height:X,backgroundColor:oa,display:e.abPreD,zIndex:1,zIndexOffset:3,pointerEvents:"none"}),y(k,{positionType:"absolute",positionLeft:e.fillL,positionTop:we,width:e.fillW,height:X,backgroundColor:B,backgroundOpacity:.85,zIndex:1,zIndexOffset:4,pointerEvents:"none"}),y(k,{positionType:"absolute",positionLeft:j,positionTop:we,width:rt,height:X,borderWidth:1,borderColor:B,borderOpacity:.6,zIndex:1,zIndexOffset:5,pointerEvents:"none"}),y(k,{positionType:"absolute",positionLeft:e.thumbL,positionTop:we,width:X,height:X,backgroundColor:ne,borderWidth:1,borderColor:B,zIndex:1,zIndexOffset:6,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none"}),y(k,{positionType:"absolute",positionLeft:e.thumbL,positionTop:we,width:X,height:X,alignItems:"center",justifyContent:"center",zIndex:1,zIndexOffset:7,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none",children:y(V,{display:e.thumbIconD,src:U.grip,width:ur,height:ur})}),y(i,{label:"A",left:e.abAL,display:e.abAD,onPointerDown:u("a")}),y(i,{label:"B",left:e.abBL,display:e.abBD,onPointerDown:u("b")}),y(t,{x:Y,y:Fe,w:N-Y,h:.5}),oe(r,{idx:0,onClick:()=>this.onPresetCycle?.(),children:[y(V,{src:U.bulb,width:20,height:20}),y(q,{fontSize:10,fontWeight:"bold",color:B,children:e.presetT})]}),y(t,{x:Y+_e,y:Fe,w:.5,h:Te}),oe(r,{idx:1,onClick:()=>this.onMuteToggle?.(),children:[y(V,{display:e.icA,src:U.mute,width:20,height:20}),y(V,{display:e.icB,src:U.vol,width:20,height:20}),y(q,{fontSize:10,fontWeight:"bold",color:B,children:e.muteLbl})]}),y(t,{x:Y+_e*2,y:Fe,w:.5,h:Te}),oe(r,{idx:2,onClick:()=>this.onScaleLockToggle?.(),children:[y(V,{src:U.scale,width:20,height:20}),y(q,{fontSize:10,fontWeight:"bold",color:B,children:e.sclLkLbl})]}),y(t,{x:Y+_e*3,y:Fe,w:.5,h:Te}),oe(r,{idx:3,active:e.abOnD,onClick:()=>this.onAbLoopToggle?.(),children:[y(V,{display:e.abOffD,src:U.loop,width:20,height:20}),y(V,{display:e.abOnD,src:U.loopOn,width:20,height:20}),y(q,{fontSize:10,fontWeight:"bold",color:e.abTxtC,children:e.abLbl})]}),y(t,{x:Y+_e*4,y:Fe,w:.5,h:Te}),oe(r,{idx:4,onClick:()=>this.onLockToggle?.(),children:[y(V,{display:e.lockA,src:U.unlk,width:20,height:20}),y(V,{display:e.lockB,src:U.lock,width:20,height:20}),y(q,{fontSize:10,fontWeight:"bold",color:B,children:e.lockLbl})]}),y(t,{x:Y+_e*5,y:Fe,w:.5,h:Te}),oe(r,{idx:5,onClick:()=>this.onReset?.(),children:[y(V,{src:U.reset,width:20,height:20}),y(q,{fontSize:10,fontWeight:"bold",color:B,children:"RESET SCENE"})]}),y(t,{x:Y+_e*6,y:Fe,w:.5,h:Te}),oe(r,{idx:6,onClick:()=>this.onExit?.(),children:[y(V,{src:U.exit,width:20,height:20}),y(q,{fontSize:10,fontWeight:"bold",color:B,children:"EXIT"})]}),y(t,{x:0,y:Ge,w:N,h:.5}),y(k,{positionType:"absolute",positionLeft:0,positionTop:Ge+1,width:N,height:Xs-1,backgroundColor:ne,hover:tt,alignItems:"center",justifyContent:"center",onPointerDown:g,onPointerUp:f,children:y(q,{fontSize:12,color:B,opacity:.45,pointerEvents:"none",children:"DRAG TO MOVE THE MENU"})}),y(k,{positionType:"absolute",positionLeft:N-St-4,positionTop:(pe-St)/2,width:St,height:St,borderRadius:St/2,backgroundColor:ne,backgroundOpacity:.8,borderWidth:1,borderColor:B,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",zIndexOffset:10,onClick:()=>this.onClose?.(),children:y(V,{src:U.close,width:12,height:12,pointerEvents:"none"})}),y(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:N,height:.5,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10}),y(k,{positionType:"absolute",positionLeft:0,positionTop:Ne-.5,width:N,height:.5,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10}),y(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:.5,height:Ne,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10}),y(k,{positionType:"absolute",positionLeft:N-.5,positionTop:0,width:.5,height:Ne,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10})]}),y(k,{positionType:"absolute",positionLeft:0,positionTop:0,width:N,height:Ne,backgroundColor:ne,backgroundOpacity:1,display:e.loadingD,alignItems:"center",justifyContent:"center",children:y(V,{src:U.spin,width:64,height:64,transformRotateZ:e.spinR,pointerEvents:"none"})})]});await n.mountReact(_)}};var st=class{#e;#r;#t;#i=null;#s;#o;#n;constructor(e){this.#e=e,this.#r=new e.Scene,this.#t=new e.Group,this.#r.add(this.#t),this.#s=new e.Vector3,this.#o=new e.Vector3,this.#n=new e.Raycaster}get scene(){return this.#r}get anchor(){return this.#t}get bboxMesh(){return this.#i}get hasBBox(){return!!this.#i}rebuildBBox(e,t){let r=this.#e;this.#i&&(this.#t.remove(this.#i),this.#i.geometry.dispose(),this.#i.material.dispose());let i=(e.minX+e.maxX)/2,n=(e.minY+e.maxY)/2,o=(e.minZ+e.maxZ)/2,a=new r.Box3(new r.Vector3(e.minX,e.minY,e.minZ),new r.Vector3(e.maxX,e.maxY,e.maxZ)).applyMatrix4(new r.Matrix4().fromArray(t)),l=a.getSize(new r.Vector3).max(new r.Vector3(.1,.1,.1)),c=a.getCenter(new r.Vector3),h=new r.BoxGeometry(l.x,l.y,l.z);return this.#i=new r.Mesh(h,new r.MeshBasicMaterial({visible:!1,side:r.DoubleSide})),this.#i.position.copy(c),this.#t.add(this.#i),{cx:i,cy:n,cz:o}}applyTransform(e,t){this.#t.position.set(e[0],e[1],e[2]),this.#t.scale.set(t,t,-t),this.#t.quaternion.identity(),this.#t.updateMatrixWorld(!0)}hitTest(e){if(!this.#i)return!1;let t=e.position,r=e.orientation;return this.#s.set(t.x,t.y,t.z),this.#o.set(-2*(r.w*r.y+r.x*r.z),-2*(r.y*r.z-r.w*r.x),2*(r.x*r.x+r.y*r.y)-1),this.#n.set(this.#s,this.#o),this.#n.intersectObject(this.#i,!1).length>0}};var nt=class s{#e;#r;#t;#i;#s;#o;static#n=1.5;static#a=.04;static#l=.15;static#c=4;static#h=20;static#p=.003;static#u=.001;static#f=.7;constructor(e,t){this.#e=e,this.#r=this.#m(),this.#t=this.#m(),this.#i=this.#d(),this.#s=this.#d(),this.#o=new e.Vector3,t.add(this.#r.group,this.#t.group,this.#i,this.#s)}update(e,t,r,i=!0){this.#g(this.#r,this.#i,i?e:null,r?.[0]),this.#g(this.#t,this.#s,i?t:null,r?.[1])}dispose(){for(let e of[this.#r,this.#t])e.mesh.geometry.dispose(),e.mesh.material.dispose();for(let e of[this.#i,this.#s])e.geometry.dispose(),e.material.dispose()}#m(){let e=this.#e,t=s.#c,r=s.#h,i=s.#n,n=s.#a,o=s.#l,a=s.#p,l=s.#u,c=s.#f,h=r+1,p=t+1,u=h*p,d=new Float32Array(u*3),m=new Float32Array(u*4),g=[];for(let b=0;b<h;b++){let v=b/r,T=-n-v*i,P=a+(l-a)*v,C=Math.min(v/o,1),L=1-v,ae=c*C*L;for(let G=0;G<=t;G++){let I=G/t*Math.PI*2,D=b*p+G;d[D*3]=Math.cos(I)*P,d[D*3+1]=Math.sin(I)*P,d[D*3+2]=T,m[D*4]=1,m[D*4+1]=1,m[D*4+2]=1,m[D*4+3]=ae}}for(let b=0;b<r;b++)for(let v=0;v<t;v++){let T=b*p+v,P=T+1,C=T+p,L=C+1;g.push(T,C,P,P,C,L)}let f=new e.BufferGeometry;f.setAttribute("position",new e.BufferAttribute(d,3)),f.setAttribute("color",new e.BufferAttribute(m,4)),f.setIndex(g);let _=new e.MeshBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),x=new e.Mesh(f,_);x.frustumCulled=!1,x.renderOrder=998;let S=new e.Group;return S.add(x),S.visible=!1,{mesh:x,group:S}}#d(){let e=this.#e,t=new e.RingGeometry(.004,.008,24),r=new e.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),i=new e.Mesh(t,r);return i.frustumCulled=!1,i.renderOrder=999,i.visible=!1,i}#g(e,t,r,i){if(!r?.active||!r.rayTransform||r.isTransientPointer){e.group.visible=!1,t.visible=!1;return}let n=r.rayTransform.position,o=r.rayTransform.orientation;e.group.position.set(n.x,n.y,n.z),e.group.quaternion.set(o.x,o.y,o.z,o.w),e.group.visible=!0,e.group.updateMatrixWorld(!0);let a=r.triggerPressed??!1;if(e.mesh.material.color.setRGB(a?.4:1,a?.75:1,1),i?.visible){let l=this.#o.set(n.x,n.y,n.z).distanceTo(i.position),c=s.#a+s.#n;e.mesh.scale.z=Math.min(1,l/c),t.position.copy(i.position),t.quaternion.set(o.x,o.y,o.z,o.w),t.visible=!0,t.updateMatrixWorld(!0)}else e.mesh.scale.z=1,t.visible=!1}};var ot=Object.keys(mt),Ws=s=>!Number.isFinite(s)||s<0?"0:00":`${~~(s/60)}:${String(~~s%60).padStart(2,"0")}`,mi=s=>s.toUpperCase(),Ys=s=>Math.max(.1,s*.01);var at=class{#e;#r;#t;#i=null;#s=null;#o=null;#n=null;#a=null;#l=null;#c=0;#h=0;#p=0;#u=ot.indexOf("off");#f=mi("off");#m=1;#d=!1;#g=!0;#b="off";#v=0;#w=0;#_=null;#y=[];#x=0;#S=!0;#T=null;#P=null;#M=null;#C=null;#R=null;#E=null;#F;#B=null;#A=null;#I=null;constructor(e,{debug:t=!1,uiStyle:r="modern",rays:i=!0}={}){this.#e=e,this.#r=t,this.#t=r,this.#F=i}get uiStyle(){return this.#t}set uiStyle(e){this.#t=e}set manipulator(e){this.#s=e}get manipulator(){return this.#s}get uiActive(){return!this.#S&&(this.#i?.quad.interacting??!1)}get uiDragging(){if(this.#S)return!1;let e=this.#i?.quad;return(e?.dragging||e?.panelDragging)??!1}get quads(){let e=this.#i?.quad;return e?[e]:[]}set sources(e){this.#y=e??[],this.#x=Math.min(this.#x,Math.max(0,this.#y.length-1))}get sources(){return this.#y}set sceneIndex(e){this.#y.length&&(this.#x=Math.max(0,Math.min(this.#y.length-1,e)),this.#S=!0)}get sceneIndex(){return this.#x}set onSceneChange(e){this.#M=e}get onSceneChange(){return this.#M}set onPresetChange(e){this.#P=e}get onPresetChange(){return this.#P}set onLock(e){this.#C=e}get onLock(){return this.#C}set onScaleLock(e){this.#R=e}get onScaleLock(){return this.#R}set bannerText(e){this.#T=e}get bannerText(){return this.#T}set eventLogger(e){this.#E=e}get eventLogger(){return this.#E}setPreset(e,t=this.#m){this.#m=t,this.syncPreset(e),this.#O(this.#o,e,t)}syncPreset(e){let t=ot.indexOf(e);t<0||(this.#u=t,this.#f=mi(e))}async init(e,t,r,i,n,o=!1){this.#o=e;let a=this.#e,l=this.#r||this.#F;this.#i=this.#t==="modern"?new it(a):new Ke(a),this.#H(e,t);let c=l?new st(a):null;if(this.#I=c,c&&this.#s?.setOverlay(c),this.#d=this.#y[this.#x]?.locked??this.#d,this.#g=this.#y[this.#x]?.scaleLocked??this.#g,this.#s&&(this.#s.locked=this.#d,this.#s.scaleLocked=this.#g),this.#O(e,ot[this.#u],this.#m),c){this.#i.quad.hitMesh&&c.scene.add(this.#i.quad.hitMesh);for(let p of this.#i.quad.hitSpheres)c.scene.add(p);this.#r&&(this.#B=new et(a,c)),this.#F&&(this.#A=new nt(a,c.scene))}l&&c&&(this.#n=new a.WebGLRenderer({context:n,canvas:n.canvas}),this.#n.autoClear=!1,this.#a=new a.PerspectiveCamera(50,1,.01,1e4),this.#a.matrixAutoUpdate=!1,this.#l=new a.WebGLRenderTarget(1,1),this.#n.setRenderTarget(this.#l),this.#n.setRenderTarget(null));let h=await this.#i.quad.init(t,r,i,n);return this.#c=setTimeout(()=>this.#i?.quad.show(),1e3),h?[h]:[]}frame(e,t,r,i,n,o){this.#V(o),this.#i?.quad.updatePosition(i),this.#i?.quad.handleInput(this.#s?.leftHand,this.#s?.rightHand,i),this.#B?.update(this.#s?.leftHand,this.#s?.rightHand),this.#A?.update(this.#s?.leftHand,this.#s?.rightHand,this.#i?.quad.hitSpheres,!!this.#i?.quad.visible),this.#i?.quad.panelDragging&&this.#s?.reset(),this.#U(e,o),this.#i?.render(e),this.#i?.quad.drawContent(t)}renderEye(e,t,r,i,n,o,a){this.#i?.quad.renderEye(e,r,i,n,o,a),!(!this.#n||!this.#I)&&(this.#a.projectionMatrix.fromArray(r.projectionMatrix),this.#a.projectionMatrixInverse.copy(this.#a.projectionMatrix).invert(),this.#a.matrix.fromArray(r.transform.matrix),this.#a.matrixWorld.copy(this.#a.matrix),this.#a.matrixWorldInverse.fromArray(r.transform.inverse.matrix),this.#n.resetState(),this.#n.setRenderTargetFramebuffer(this.#l,t),this.#n.setRenderTarget(this.#l),this.#n.setViewport(i,n,o,a),this.#n.setScissor(i,n,o,a),this.#n.setScissorTest(!0),this.#n.clearDepth(),this.#n.render(this.#I.scene,this.#a),this.#n.resetState(),e.bindFramebuffer(e.FRAMEBUFFER,t))}onRefReset(){this.#i?.quad.visible&&this.#i.quad.show()}render(e,t){}dispose(){clearTimeout(this.#c),this.#z(this.#o),this.#B?.dispose(),this.#B=null,this.#A?.dispose(),this.#A=null,this.#I=null,this.#n?.dispose(),this.#n=null,this.#l?.dispose(),this.#l=null,this.#a=null,this.#i?.quad.dispose(),this.#i=null,this.#s?.reset(),this.#s=null,this.#h=0}#H(e,t){let r=this.#i;r.onPlayPause=()=>{(e?.isBuffering??!1)||(e?.isPlaying?e.pause():e.play(),this.#E?.event?.("play_pause",{playing:!e?.isPlaying}))},r.onSeek=i=>{let{start:n,span:o}=this.#L(e);e?.seek?.(n+i*o),this.#E?.event?.("seek",{position:i})},r.onPresetCycle=()=>{let i=ot[(this.#u+1)%ot.length];this.#O(e,i,this.#m),this.#P?.(i),this.#E?.event?.("preset_cycle",{preset:i})},r.onExit=()=>{this.#E?.event?.("exit"),t?.end()},r.onClose=()=>{r.quad.hide()},r.onSceneNav=i=>{if(!this.#y.length)return;let n=Math.max(0,Math.min(this.#y.length-1,this.#x+i));n!==this.#x&&(this.#x=n,this.#S=!0,this.#G(),this.#M?.(this.#y[this.#x],this.#x),this.#E?.event?.("scene_nav",{index:n,label:this.#y[n]?.label,dir:i}))},this.#t==="modern"&&(r.onMuteToggle=()=>{let i=this.#D(e);this.#E?.event?.("mute_toggle",{muted:!i})},r.onReset=()=>{this.#s?.resetToInitial(),this.#E?.event?.("reset")},r.onLockToggle=()=>{this.#d=!this.#d,this.#s&&(this.#s.locked=this.#d),this.#C?.(this.#d),this.#E?.event?.("lock_toggle",{locked:this.#d})},r.onAbLoopToggle=()=>{this.#b==="off"?this.#N(e):this.#z(e),this.#E?.event?.("ab_loop_toggle",{enabled:this.#b!=="off"})},r.onAbLoopSelect=i=>{if(this.#b!=="setB")return;let{start:n,span:o}=this.#L(e);this.#k(e,this.#v,n+i*o)},r.onAbLoopChange=(i,n)=>{if(this.#b!=="active")return;let{start:o,span:a}=this.#L(e);this.#k(e,o+i*a,o+n*a)},r.onScaleLockToggle=()=>{this.#g=!this.#g,this.#s&&(this.#s.scaleLocked=this.#g),this.#R?.(this.#g),this.#E?.event?.("scale_lock_toggle",{scaleLocked:this.#g})})}#L(e){let t=this.#b==="off"?e?.playbackRange:this.#_,r=t?.start??0;return{start:r,span:Math.max(0,(t?.end??e?.duration??0)-r)}}#N(e){let{start:t,span:r}=this.#L(e);!e||r<=0||(this.#_=e.playbackRange,this.#v=w.clamp(e.currentTime,t,t+r-Ys(r)),this.#w=t+r,this.#b="setB")}#k(e,t,r){let{start:i,span:n}=this.#L(e),o=Ys(n),a=i+n,l=w.clamp(t,i,a-o),c=w.clamp(r,l+o,a);try{e.setPlaybackRange(l,c)}catch{this.#z(e);return}this.#v=l,this.#w=c,this.#b="active",this.#E?.event?.("ab_loop_set",{start:l,end:c})}#z(e){let t=this.#_;this.#b==="active"&&(t?e?.setPlaybackRange?.(t.start,t.end):e?.clearPlaybackRange?.()),this.#b="off",this.#_=null}#G(){this.#d=this.#y[this.#x]?.locked??this.#d,this.#g=this.#y[this.#x]?.scaleLocked??this.#g}#D(e){let t=!(e?.audioEnabled??!1);return t?e?.enableAudio?.():e?.disableAudio?.(),t}#O(e,t,r=1){let i=ot.indexOf(t);if(i<0)return;this.#u=i,this.#f=mi(t);let n=mt[t];n?e?.setEnvLighting(Ce(n),r):e?.clearEnvLighting()}#V(e){!this.#S||!e.duration||(this.#S=!1,this.#b="off",this.#_=null,this.#d=this.#y[this.#x]?.locked??this.#d,this.#g=this.#y[this.#x]?.scaleLocked??this.#g)}#U(e,t){let r=!(t?.audioEnabled??!1);if(this.#S)this.#i?.update({loading:!0,muted:r,locked:this.#d,scaleLocked:this.#g,sceneText:this.#y.length?`${this.#x+1}/${this.#y.length}`:"1/1",sceneLabel:(this.#y[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#T});else{let i=t?.isBuffering??!1,{start:n,span:o}=this.#L(t);o>0&&(this.#p=o);let a=this.#p,l=p=>w.clamp01((p-n)/(a||1)),c=l(t?.currentTime??0),h=c*a;this.#i?.update({loading:!1,playing:t?.isPlaying??!1,spinning:i,buffering:i,progress:c,timeText:`${Ws(h)} / ${Ws(a)}`,presetName:this.#f,muted:r,locked:this.#d,scaleLocked:this.#g,abLoopPhase:this.#b,abLoopStart:l(this.#v),abLoopEnd:l(this.#w),duration:a,sceneText:this.#y.length?`${this.#x+1}/${this.#y.length}`:"1/1",sceneLabel:(this.#y[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#T})}this.#X(e)}#X(e){if(this.#h>0){this.#h-=e;return}let t=this.#s?.leftHand.microSwipe||this.#s?.rightHand.microSwipe;t&&(this.#h=.45,this.#i?.onSceneNav(t))}};import{useRef as ua}from"react";import*as da from"three";function fa(s){if(s===!1)return null;let{uiStyle:e="modern",bannerText:t="EARLY BETA"}=s??{};try{let r=new at(da,{uiStyle:e});return r.bannerText=t,r}catch{return null}}function gi(s){let e=ua(void 0);return e.current===void 0&&(e.current=fa(s)),e.current}function yi(s,e){let{sources:t=[],streaming:r,muted:i=!1,cameraControls:n=!1,rangeSelector:o=!0,sceneSelector:a,moduleFactory:l,onReady:c,onProgress:h,onModeChange:p,onXRStart:u,onXREnd:d,onSceneChange:m,onError:g,eventLogger:f,localFiles:_,xrOverlay:x}=s,S=gi(x),{interactionError:b,logger:v,reportError:T,clearError:P}=ii(f,g);ma(()=>{sr()},[]);let{gracia:C,playlist:L}=ti({containerRef:e.container,muted:i,moduleFactory:l,overlay:S,eventLogger:v,onReady:c,onProgress:h,onModeChange:p,onXRStart:u,onXREnd:d});si({isInitialized:C.isInitialized,sources:t,streaming:r,playlist:L,reportError:T}),ni({currentSource:L.currentSource,index:L.index,onSceneChange:m});let{fileInputProps:ae,enabled:G,localLabel:I,openLocalFile:D}=Jr({localFiles:_,logger:v,reportError:T,playlist:L,clearError:P}),{isFullscreen:He,toggleFullscreen:ht}=Kr(e.root,T),_r=C.isContentReady&&!C.isLoading,{playerError:Mi,isBlocking:Ei,toast:mn,retry:gn,dismiss:yn}=$r({coreError:C.error,interactionError:b,isSceneReady:_r,currentSource:L.currentSource,open:C.open,clearError:P}),bn=!Mi&&(!C.isInitialized||!_r),wr=oi(C,T,P);return{contextValue:{gracia:C,playlist:L,config:{sceneSelector:a,cameraControls:n,rangeSelector:o},refs:e,presentation:{isBusy:bn,isSceneReady:_r,isBlocking:Ei,playerError:Mi,toast:mn,retry:gn,dismiss:yn},shell:{isFullscreen:He,toggleFullscreen:ht,localFilesEnabled:G,fileInputProps:ae,openLocalFile:D,localLabel:I},xr:{enter:wr.enter,exit:wr.exit,activeScreenMode:Ei?null:wr.activeScreenMode}},gracia:C,playlist:L,openLocalFile:D,toggleFullscreen:ht}}import{useEffect as ga,useState as bi}from"react";import{jsx as Ee,jsxs as De}from"react/jsx-runtime";var Zs=()=>{let{gracia:s,playlist:e,config:t}=z(),{playback:r}=s,{playbackRange:i}=r,n=s.app?.player?.duration??r.duration,[o,a]=bi(0),[l,c]=bi(0),[h,p]=bi(""),u=e.currentSource;if(ga(()=>{a(i?.start??0),c(i?.end??n),p("")},[n,i?.start,i?.end,u]),!t.rangeSelector||!Number.isFinite(n)||n<=0)return null;let d=Number.isFinite(o)&&Number.isFinite(l)&&o>=0&&o<l&&l<=n,m=Math.min(.001,n),g=()=>{if(d)try{r.setPlaybackRange(o,l),p("")}catch(f){p(f instanceof Error?f.message:String(f))}};return De("details",{className:"gr-player__range",children:[De("summary",{children:["Playback range",i?` \xB7 ${i.start.toFixed(2)}\u2013${i.end.toFixed(2)} s`:" \xB7 Full video"]}),De("div",{className:"gr-player__range-panel",children:[De("div",{className:"gr-player__range-track",children:[Ee("span",{className:"gr-player__range-selection",style:{left:`${Number.isFinite(o)?Math.min(100,Math.max(0,o/n*100)):0}%`,width:`${Number.isFinite(o)&&Number.isFinite(l)?Math.min(100,Math.max(0,(l-o)/n*100)):0}%`}}),Ee("input",{type:"range","aria-label":"Range start",min:0,max:n,step:"any",value:Number.isFinite(o)?o:0,onChange:f=>a(Math.max(0,Math.min(Number(f.target.value),l-m)))}),Ee("input",{type:"range","aria-label":"Range end",min:0,max:n,step:"any",value:Number.isFinite(l)?l:n,onChange:f=>c(Math.min(n,Math.max(Number(f.target.value),o+m)))})]}),De("div",{className:"gr-player__range-fields",children:[De("label",{children:["Start (s)",Ee("input",{"aria-label":"Range start in seconds",type:"number",min:0,max:n,step:"any",value:Number.isFinite(o)?Number(o.toFixed(6)):"",onChange:f=>a(f.target.valueAsNumber)})]}),De("label",{children:["End (s)",Ee("input",{"aria-label":"Range end in seconds",type:"number",min:0,max:n,step:"any",value:Number.isFinite(l)?Number(l.toFixed(6)):"",onChange:f=>c(f.target.valueAsNumber)})]}),Ee("button",{type:"button",disabled:!d,onClick:g,children:"Apply range"}),Ee("button",{type:"button",onClick:()=>{r.clearPlaybackRange(),a(0),c(n),p("")},children:"Full video"})]}),!d&&Ee("p",{role:"status",children:"Choose a start before the end, within the video."}),h&&Ee("p",{role:"alert",children:h})]})]})};import{useEffect as qs,useRef as js,useState as ya}from"react";import{jsx as $,jsxs as Tt}from"react/jsx-runtime";var Qs=()=>{let{playlist:s}=z(),e=js(null),t=js(s.index),[r,i]=ya(!1),n=s.currentSource,o=n?he(n):"Select scene",a=s.total>1;return qs(()=>{t.current!==s.index&&(t.current=s.index,i(!1))},[s.index]),qs(()=>{if(!r)return;let l=c=>{e.current&&!e.current.contains(c.target)&&i(!1)};return document.addEventListener("click",l),()=>document.removeEventListener("click",l)},[r]),Tt("div",{ref:e,className:"gr-player__scene",children:[Tt("div",{className:"gr-player__scene-inner",children:[Tt("button",{className:"gr-player__scene-main",type:"button",disabled:!a,onClick:()=>i(!r),"aria-haspopup":"menu","aria-expanded":r,children:[$(cs,{}),Tt("span",{className:"gr-player__scene-main-copy",children:[$("span",{className:"gr-player__scene-copy",children:$("span",{className:"gr-player__scene-label",children:o})}),a&&$("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:s.sources.map((l,c)=>$("span",{className:Q("gr-player__scene-segment",c===s.index&&"is-active")},l.id??l.url??c))})]})]}),$("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasPrev,onClick:()=>s.prev(),"aria-label":"Previous scene",children:$(er,{})}),$("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasNext,onClick:()=>s.next(),"aria-label":"Next scene",children:$(tr,{})})]}),r&&a&&$("div",{className:"gr-player__scene-menu",children:s.sources.map((l,c)=>Tt("button",{type:"button",className:Q("gr-player__scene-item",c===s.index&&"is-active"),onClick:()=>{s.goTo(c),i(!1)},children:[$("span",{children:ke(l)?$(Le,{}):c+1}),$("strong",{children:he(l)})]},l.id??l.url??c))})]})};import{jsx as ue,jsxs as xi}from"react/jsx-runtime";var $s=()=>{let{playlist:s}=z(),e=s.currentSource,t=ke(e);return ue("div",{className:"gr-player__scene gr-player__scene--stepper",children:xi("div",{className:"gr-player__scene-inner",children:[ue("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasPrev,onClick:()=>s.prev(),"aria-label":"Previous scene",children:ue(er,{})}),ue("div",{className:"gr-player__scene-main",children:xi("span",{className:"gr-player__scene-main-copy",children:[t&&e?xi("span",{className:"gr-player__scene-count gr-player__scene-count--local",children:[ue(Le,{}),ue("span",{className:"gr-player__scene-label",children:he(e)})]}):ue("span",{className:"gr-player__scene-count",children:s.index>=0?`${s.index+1} of ${s.total}`:`${s.total} scenes`}),ue("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:s.sources.map((r,i)=>ue("span",{className:Q("gr-player__scene-segment",i===s.index&&"is-active",ke(r)&&"gr-player__scene-segment--local")},r.id??r.url??i))})]})}),ue("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasNext,onClick:()=>s.next(),"aria-label":"Next scene",children:ue(tr,{})})]})})};import{useEffect as ba,useRef as xa}from"react";import{jsx as Pt}from"react/jsx-runtime";var Ks=()=>{let{playlist:s}=z(),e=xa(null),t=s.index;return ba(()=>{e.current?.querySelector(`.gr-player__scene-tab[data-scene-index="${t}"]`)?.scrollIntoView({block:"nearest",inline:"nearest"})},[t]),Pt("div",{className:"gr-player__scene",children:Pt("div",{className:"gr-player__scene-inner",children:Pt("div",{ref:e,className:"gr-player__scene-tabs-scroll",children:s.sources.map((r,i)=>Pt("button",{type:"button","data-scene-index":i,className:Q("gr-player__scene-tab",i===s.index&&"is-active",ke(r)&&"gr-player__scene-tab--local"),onClick:()=>s.goTo(i),"aria-label":`Open ${he(r)}`,"aria-current":i===s.index?"true":void 0,children:ke(r)?Pt(Le,{}):i+1},r.id??r.url??i))})})})};import{jsx as _a}from"react/jsx-runtime";var va={tabs:Ks,stepper:$s,menu:Qs},mr=()=>{let{config:s}=z(),{sceneSelector:e=ms}=s,t=va[e];return _a(t,{})};import{useRef as Js,useState as wa}from"react";import{jsx as gr,jsxs as Sa}from"react/jsx-runtime";var vi=({progress:s,duration:e,onSeek:t,disabled:r=!1})=>{let i=Js(null),n=Js(!1),[o,a]=wa(0),l=p=>{if(!i.current)return 0;let u=i.current.getBoundingClientRect();return Math.min(1,Math.max(0,(p.clientX-u.left)/u.width))},c=p=>{e>0&&t(l(p)*e)},h=r?void 0:{onPointerDown(p){n.current=!0,p.currentTarget.setPointerCapture(p.pointerId),c(p)},onPointerMove(p){a(l(p)),n.current&&c(p)},onPointerLeave(){a(0)},onPointerUp(p){n.current=!1,p.currentTarget.releasePointerCapture(p.pointerId)},onPointerCancel(){n.current=!1}};return gr("div",{className:"gr-player__seek-shell","aria-disabled":r||void 0,children:Sa("div",{ref:i,className:"gr-player__seek",role:"slider","aria-label":"Playback position","aria-valuemin":0,"aria-valuemax":Math.max(e,0),"aria-valuenow":Math.round(s*Math.max(e,0)),"aria-disabled":r||void 0,tabIndex:r?-1:0,onKeyDown:p=>{if(r||e<=0)return;let u=s*e,d=Math.min(5,e/20),m=p.key==="Home"?0:p.key==="End"?e:p.key==="ArrowLeft"?u-d:p.key==="ArrowRight"?u+d:null;m!==null&&(p.preventDefault(),t(Math.max(0,Math.min(e,m))))},...h,children:[gr("span",{className:"gr-player__seek-fill",style:{width:`${s*100}%`}}),gr("span",{className:"gr-player__seek-hover",style:{width:`${o*100}%`}}),gr("span",{className:"gr-player__seek-thumb",style:{left:`${s*100}%`}})]})})};import{jsx as me,jsxs as en}from"react/jsx-runtime";function Ta(s,e){return e>0?Math.min(1,Math.max(0,s/e)):0}var tn=()=>{let{gracia:s,playlist:e,presentation:t,shell:r}=z(),{isSceneReady:i}=t,{isFullscreen:n,toggleFullscreen:o}=r,{playback:a}=s,l=Ta(a.rangeTime,a.rangeDuration);return en("div",{className:"gr-player__controls",children:[me(se,{className:"gr-player__button--play",onClick:i?()=>a.togglePlay():void 0,"aria-label":a.isPlaying?"Pause":"Play","aria-disabled":!i||void 0,children:a.isPlaying?me(ss,{}):me(is,{})}),me(mr,{}),e.hasAudio&&me(Ae,{className:"gr-player__mute",onClick:i?()=>a.toggleMute():void 0,"aria-label":a.isMuted?"Unmute":"Mute","aria-disabled":!i||void 0,children:a.isMuted?me(ns,{}):me(os,{})}),me(vi,{progress:l,duration:a.rangeDuration,onSeek:c=>a.seek(a.playbackStart+c),disabled:!i}),en("div",{className:"gr-player__time",children:[Ur(a.rangeTime)," / ",Ur(a.rangeDuration)]}),me(Ae,{variant:["icon","secondary"],className:"gr-player__fullscreen",onClick:o,"aria-label":n?"Exit fullscreen":"Enter fullscreen","aria-pressed":n,title:n?"Exit fullscreen":"Enter fullscreen",children:me(hs,{active:n})})]})};import{useEffect as rn,useRef as Pa,useState as Ma}from"react";import{jsx as Mt,jsxs as _i}from"react/jsx-runtime";var sn=()=>{let{gracia:s,config:e,presentation:t}=z(),{isSceneReady:r,isBlocking:i}=t,[n,o]=Ma(!1),a=Pa(null),l=e.cameraControls&&r&&!i&&!rr(s.mode);if(rn(()=>{l||o(!1)},[l]),rn(()=>{if(!n)return;let p=d=>{a.current?.contains(d.target)||o(!1)},u=d=>{d.code==="Escape"&&o(!1)};return document.addEventListener("pointerdown",p),document.addEventListener("keydown",u),()=>{document.removeEventListener("pointerdown",p),document.removeEventListener("keydown",u)}},[n]),!l)return null;let{controlsType:c,setControls:h}=s.camera;return _i("div",{ref:a,className:"gr-player__camera-control",children:[Mt(Ae,{className:"gr-player__button--camera",onClick:()=>o(p=>!p),"aria-label":"Camera controls","aria-expanded":n,title:"Camera controls",srLabel:"Camera controls",children:Mt(as,{})}),n&&_i("div",{className:"gr-player__camera-panel",role:"menu","aria-label":"Camera controls",children:[Mt("div",{className:"gr-player__camera-title",children:"Camera"}),ps.map(p=>_i("button",{className:Q("gr-player__camera-option",p.type===c&&"is-active"),type:"button",role:"menuitemradio","aria-checked":p.type===c,onClick:()=>h(p.type),children:[Mt("span",{className:"gr-player__camera-label",children:p.label}),Mt("span",{className:"gr-player__camera-hint",children:p.hint})]},p.type))]})]})};import{jsx as Et,jsxs as Ca}from"react/jsx-runtime";var wi=({className:s})=>{let{gracia:e,presentation:t,xr:r}=z(),{isSceneReady:i,isBlocking:n}=t,{enter:o}=r;if(n)return null;let a=e.xr.arSupported?ce.AR:e.xr.vrSupported?ce.VR:null;if(!a)return null;let l=a===ce.AR;return Et("div",{className:["gr-player__xr-actions",s].filter(Boolean).join(" "),children:Et(Ea,{active:e.mode===a,disabled:!i,icon:l?Et(Jt,{}):Et(Kt,{}),label:l?"View in AR":"Play in VR",mode:a,onEnter:o})})},Ea=({active:s,disabled:e,icon:t,label:r,mode:i,onEnter:n})=>Ca(se,{className:"gr-player__button--xr",onClick:e?void 0:()=>n(i),"aria-disabled":e||void 0,"aria-pressed":s||void 0,title:r,children:[Et("span",{children:r}),t]});import{jsx as lt,jsxs as Si}from"react/jsx-runtime";var nn=()=>{let{gracia:s,playlist:e,refs:t,presentation:r,shell:i}=z(),{isBlocking:n}=r,{localFilesEnabled:o,openLocalFile:a,localLabel:l}=i,{hasInteracted:c,resetView:h}=jr(t.container,e.index,s.camera);return Si("div",{className:"gr-player__top",children:[Si("div",{className:"gr-player__top-left",children:[o&&lt(Ae,{className:"gr-player__button--local",onClick:a,"aria-label":l,title:l,srLabel:"Open local file",children:lt(Le,{})}),lt(wi,{className:"gr-player__xr-actions--desktop"})]}),Si("div",{className:"gr-player__top-right",children:[lt(sn,{}),lt(wi,{className:"gr-player__xr-actions--mobile"}),!n&&c&&lt(se,{variant:"secondary",className:"gr-player__reset",onClick:h,children:"Reset View"})]})]})};import{jsx as yr,jsxs as on}from"react/jsx-runtime";var br=()=>{let{presentation:s}=z(),{isBlocking:e,toast:t}=s;return on("div",{className:"gr-player__overlay",children:[yr(nn,{}),!e&&on("div",{className:"gr-player__bottom",children:[t&&yr(Wr,{message:t.title}),yr(Zs,{}),yr(tn,{})]})]})};import{jsx as Xe}from"react/jsx-runtime";var an=({onExit:s})=>Xe(se,{className:"gr-player__xr-exit",onClick:s,children:"Back to 2D"}),ln=({onExit:s})=>Xe(Ze,{icon:Xe(Jt,{}),title:"Running in AR",body:"View the scene in AR mode on your device",action:Xe(an,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),cn=({onExit:s})=>Xe(Ze,{icon:Xe(Kt,{}),title:"Running in VR",body:"Put on your VR-headset and explore the scene",action:Xe(an,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),Ti={ar:ln,vr:cn};import{Fragment as Ra,jsx as ct,jsxs as La}from"react/jsx-runtime";var Pi=()=>{let{gracia:s,presentation:e,xr:t}=z(),{isBusy:r,isBlocking:i,playerError:n}=e,{retry:o}=e,{activeScreenMode:a,exit:l}=t,c=a?Ti[a]:null;return La(Ra,{children:[r&&ct(Zr,{}),i&&n&&ct(Yr,{title:n.title,body:n.body,detail:n.cause.message,action:n.recoverable?ct(se,{className:"gr-player__state-action",onClick:o,children:"Try again"}):void 0}),c&&ct(c,{onExit:l}),!r&&s.isRebuffering&&ct("div",{className:"gr-player__rebuffer-spinner",children:ct("div",{className:"gr-player__spinner"})})]})};import{jsx as Ct,jsxs as Fa}from"react/jsx-runtime";var Ia=[],Rt=ka(function(e,t){let{controls:r=!0,className:i,style:n,children:o,sources:a=Ia,...l}=e,c=hn(null),h=hn(null),{contextValue:p,gracia:u,playlist:d,openLocalFile:m,toggleFullscreen:g}=yi({...l,sources:a},{root:c,container:h}),{presentation:f,shell:_}=p,{isBusy:x}=f,{isFullscreen:S}=_;return Aa(t,()=>({gracia:u,playlist:d,get cameraControlsType(){return u.camera.controlsType},play:()=>u.playback.play(),pause:()=>u.playback.pause(),seek:b=>u.playback.seek(b),setPlaybackRange:(b,v)=>u.playback.setPlaybackRange(b,v),clearPlaybackRange:()=>u.playback.clearPlaybackRange(),open:b=>u.open(typeof b=="string"?{url:b,label:"Scene"}:b),close:()=>u.close(),next:()=>d.next(),prev:()=>d.prev(),goTo:b=>d.goTo(b),resetCamera:()=>u.camera.reset(),setCameraControls:b=>u.camera.setControls(b),setMode:b=>u.xr.setMode(b),toggleFullscreen:g,openLocalFile:m}),[u,m,d,g]),Ct(qr,{value:p,children:Fa("section",{ref:c,className:Q("gr-player",i,{"gr-player--loading":x,"gr-player--ready":u.isContentReady,"gr-player--scenes-single":d.total<=1,"gr-player--scenes-multiple":d.total>1,"gr-player--fullscreen":S,"gr-player--error":f.isBlocking}),style:n,children:[Ct("div",{ref:h,className:"gr-player__canvas"}),Ct("input",{className:"gr-player__file-input",type:"file",..._.fileInputProps}),Ct(Pi,{}),r&&Ct(br,{}),typeof o=="function"?o({gracia:u,playlist:d}):o]})})});import{createRef as Ba}from"react";import{flushSync as za}from"react-dom";import{createRoot as Oa}from"react-dom/client";import{jsx as Na}from"react/jsx-runtime";function pn(s,e){let t=Ba(),r=Oa(s),i=e,n=!0,o=()=>{za(()=>{r.render(Na(Rt,{...i,ref:t}))})};return o(),{get player(){return t.current},update(a){n&&(i=a,o())},unmount(){n&&(n=!1,t.current?.close(),r.unmount())},async openLocalFile(){await t.current?.openLocalFile()}}}import{Box3 as Ga,BufferGeometry as Da,Float32BufferAttribute as Xa,Matrix4 as Ha,Mesh as Va,MeshBasicMaterial as Ua,Sphere as Wa,Vector2 as Ya,Vector3 as un}from"three";var xr=class extends Va{#e;#r=null;#t=new Ya;#i=!1;#s=new Ha;enableMesh=!1;constructor(e){let t=new Da;t.setAttribute("position",new Xa([0,0,0],3)),super(t,new Ua({colorWrite:!1,depthWrite:!1,transparent:!0})),this.#e=e,this.frustumCulled=!1,this.castShadow=!0,this.renderOrder=1/0,this.onBeforeRender=this.#n,this.onBeforeShadow=this.#o}get player(){return this.#e}async setAudio(e){await this.#e.loadAudio(e)}setAudioListener(e){this.#r=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}dispose(){this.#e.close(),this.#e.dispose(),this.geometry.dispose(),this.material.dispose()}#o=(e,t,r,i)=>{this.enableMesh&&this.#a(e,i)};#n=(e,t,r)=>{e.getDrawingBufferSize(this.#t);let i=this.#t.x,n=this.#t.y;if(i===0||n===0)return;this.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let o=r.matrixWorld.elements;this.#r||this.#e.setAudioListenerMatrix(o),this.#e.setAudioSourceMatrix(this.matrixWorld.elements),this.#e.renderHybridViewport(i,n,{enableMesh:this.enableMesh}),e.resetState(),!this.#i&&this.#e.isReady&&this.#l()};#a(e,t){let r=e.getContext(),i=r.getParameter(r.VIEWPORT),n=i[2],o=i[3];n===0||o===0||(this.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),this.#s.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.#s.multiply(this.matrixWorld),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.depthMask(!0),this.#e.renderMesh(this.#s.elements,i[0],i[1],n,o),e.resetState())}#l(){let e=this.#e.getBBox();if(!e)return;let t=new Ga(new un(e.minX,e.minY,e.minZ),new un(e.maxX,e.maxY,e.maxZ));this.geometry.boundingBox=t,this.geometry.boundingSphere=new Wa,t.getBoundingSphere(this.geometry.boundingSphere),this.frustumCulled=!0,this.#i=!0}};import{ByteType as Za,DepthTexture as qa,Object3D as ja,RenderTarget as Qa,RGBAFormat as $a,UnsignedIntType as Ka,Vector2 as dn}from"three";var fn=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST,vr=class s{#e;#r;#t;#i=null;root=new ja;static attach(e,t){return e.assertDevice(t.backend?.device),new s(e,t)}constructor(e,t){this.#e=e;let r=t.backend;e.configureSurface(r.context,{usage:fn});let{x:i,y:n}=t.getDrawingBufferSize(new dn);this.#t=new qa,this.#t.type=Ka;let o=new Qa(i,n);o.depthTexture=this.#t,e.isBGRA&&(o.texture.format=$a,o.texture.type=Za,o.texture.internalFormat="bgra8unorm"),this.#r=o}get player(){return this.#e}setAudioListener(e){this.#i=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}render(e,t,r,i){let n=e.getDrawingBufferSize(new dn),o=n.x,a=n.y;if(o===0||a===0)return;let l=this.#r;(l.width!==o||l.height!==a)&&(l.setSize(o,a),this.#e.configureSurface(e.backend.context,{usage:fn})),e.setRenderTarget(l),e.render(t,r),e.setRenderTarget(null);let c=e.backend,h=c.data.get(l.texture)?.texture,p=c.data.get(this.#t)?.texture;if(!h||!p||h.width!==o||h.height!==a)return;this.root.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.root.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let u=r.matrixWorld.elements;this.#i||this.#e.setAudioListenerMatrix(u),this.#e.setAudioSourceMatrix(this.root.matrixWorld.elements),this.#e.renderTextures({color:h,depth:p,w:o,h:a}),i&&(e.autoClearColor=!1,e.autoClearDepth=!0,e.autoClearStencil=!0,e.setRenderTarget(l),e.render(i,r),e.setRenderTarget(null),e.autoClearColor=!0);let d=c.context.getCurrentTexture();d.usage&GPUTextureUsage.COPY_DST&&d.width===o&&d.height===a&&this.#e.copyTexture(h,d,[o,a,1])}setStaticModelMatrix(e){this.#e.setStaticModelMatrix(e)}dispose(){this.#r.dispose(),this.#e.close(),this.#e.dispose()}};export{Ke as ClassicControls,et as DebugRenderer,mt as ENV_PRESETS,Vr as GRACIA_PLAYER_DEFAULT_CSS,We as GraciaApp,Ve as GraciaPlayer,Rt as GraciaReactPlayer,jt as GraciaSplats,Be as Mat4,it as ModernControls,qe as QuadLayer,Re as Quat,Ue as SceneManipulator,st as SceneOverlay,xr as SplatsMesh,vr as SplatsRendererW3,K as Vec3,at as XROverlay,nt as XRRayRenderer,A as axis,At as bbox,Ye as buildApiSources,Ce as envCoefsFromPreset,Sr as envCoefsFromSH27,Nr as fetchStreamingMetadata,sr as installGraciaPlayerStyles,It as loadGraciaModule,H as mat4,pn as mountGraciaPlayer,w as num,Ce as presetToLightProbe,J as quat,Qt as useGraciaPlayer,$t as useGraciaPlaylist,M as vec3};
