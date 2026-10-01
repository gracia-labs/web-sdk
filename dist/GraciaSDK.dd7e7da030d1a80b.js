var ln=.28209479177387814;function yi(s,e=.5){let t=1/(ln*Math.max(s[0],s[1],s[2],.01));for(let r=0;r<3;r++)s[r]*=t;for(let r=3;r<12;r++)s[r]*=t*e}function yr(s,e=null,t=.5){let r=new Float32Array(12);for(let i=0;i<12;i++)r[i]=s[i];if(e){let i=e[0]??e.x,n=e[1]??e.y,o=e[2]??e.z;if(r[9]*i+r[3]*n+r[6]*o>0)for(let a=3;a<12;a++)r[a]*=-1}return yi(r,t),r}function Se(s){let e=new Float32Array(12);return e.set(s.ambient,0),e.set(s.topDown,3),s.frontBack&&e.set(s.frontBack,6),s.leftRight&&e.set(s.leftRight,9),e}var ge=Object.freeze,ot=ge([0,0,0]),hn=ge([1,1,1]),Et=ge([1,0,0]),at=ge([0,1,0]),vi=ge([0,0,1]),br=ge([0,0,-1]),cn=.25,L=ge({X:Et,Y:at,Z:vi,FORWARD:br,FLIP_X:ge([-1,1,1]),FLIP_Z:ge([1,1,-1])}),_={clamp:(s,e,t)=>Math.min(t,Math.max(e,s)),clampInt:(s,e,t)=>_.clamp(s|0,e,t),clamp01:s=>_.clamp(s,0,1),unlerp01:(s,e,t)=>t===e?0:_.clamp01((s-e)/(t-e)),finite:(s,e=0)=>Number.isFinite(s)?s:e,wrapPi(s){return s>Math.PI?s-2*Math.PI:s<-Math.PI?s+2*Math.PI:s},wrap(s,e){return e>0?(s%e+e)%e:0},wrapDelta(s,e){return e>0?s-e*Math.round(s/e):s},signedClamp(s,e,t){return s===0?0:_.clamp(Math.abs(s),e,t)*Math.sign(s)},zoomStep(s,e=.05,t=10){return s>0?_.signedClamp(Math.log2(s),e,t):0},absLogRatio(s,e){return s>0&&e>0?Math.abs(Math.log(s/e)):0},outside(s,e){return Math.abs(s)>e},perspectiveScale(s,e,t){return 2*s*Math.tan(e*Math.PI/360)/Math.max(1,t)},deadzone(s,e){let t=Math.abs(s);return t<e?0:((t-e)/(1-e))**2*Math.sign(s)},deltaSeconds(s,e,t=0,r=cn){return e?Math.min((s-e)/1e3,r):t}},Lt={center(s,e){return s[0]=(e.minX+e.maxX)*.5,s[1]=(e.minY+e.maxY)*.5,s[2]=(e.minZ+e.maxZ)*.5,s}},Q=class extends Float32Array{constructor(e){super(3),e&&this.from(e)}set(e,t,r){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this)}fromXYZ(e){return this.set(e.x,e.y,e.z)}from(e){return typeof e.x=="number"?this.fromXYZ(e):this.set(e[0],e[1],e[2])}copy(e){return this.set(e[0],e[1],e[2])}add(e){return this[0]+=e[0],this[1]+=e[1],this[2]+=e[2],this}addXYZ(e=0,t=0,r=0){return this[0]+=e,this[1]+=t,this[2]+=r,this}addTo(e,t=ot){return e[0]=t[0]+this[0],e[1]=t[1]+this[1],e[2]=t[2]+this[2],e}addScaled(e,t){return this[0]+=e[0]*t,this[1]+=e[1]*t,this[2]+=e[2]*t,this}addDelta(e,t){return this[0]+=e[0]-t[0],this[1]+=e[1]-t[1],this[2]+=e[2]-t[2],this}sub(e,t){return t?(this[0]=e[0]-t[0],this[1]=e[1]-t[1],this[2]=e[2]-t[2],this):(this[0]-=e[0],this[1]-=e[1],this[2]-=e[2],this)}subXYZ(e,t){return this.set(e.x-t.x,e.y-t.y,e.z-t.z)}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this}multiply(e){return this[0]*=e[0],this[1]*=e[1],this[2]*=e[2],this}multiplyXYZ(e=1,t=1,r=1){return this[0]*=e,this[1]*=t,this[2]*=r,this}divide(e){return this[0]=e[0]?this[0]/e[0]:0,this[1]=e[1]?this[1]/e[1]:0,this[2]=e[2]?this[2]/e[2]:0,this}clampScalar(e,t){return this[0]=_.clamp(this[0],e,t),this[1]=_.clamp(this[1],e,t),this[2]=_.clamp(this[2],e,t),this}normalize(e=ot){let t=Math.hypot(this[0],this[1],this[2]);return Number.isFinite(t)&&t>1e-6?this.scale(1/t):this.copy(e)}setLength(e,t=Et){return this.normalize(t).scale(e)}cross(e,t){let r=e[0],i=e[1],n=e[2],o=t[0],a=t[1],l=t[2];return this[0]=i*l-n*a,this[1]=n*o-r*l,this[2]=r*a-i*o,this}lerp(e,t){return this[0]+=t*(e[0]-this[0]),this[1]+=t*(e[1]-this[1]),this[2]+=t*(e[2]-this[2]),this}midXYZ(e,t){return this.set((e.x+t.x)*.5,(e.y+t.y)*.5,(e.z+t.z)*.5)}fromMat4Column(e,t){let r=t*4;return this.set(e[r],e[r+1],e[r+2])}transformMat4(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i+e[12],this[1]=e[1]*t+e[5]*r+e[9]*i+e[13],this[2]=e[2]*t+e[6]*r+e[10]*i+e[14],this}transformMat4Direction(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i,this[1]=e[1]*t+e[5]*r+e[9]*i,this[2]=e[2]*t+e[6]*r+e[10]*i,this}transformQuat(e){let t=this[0],r=this[1],i=this[2],n=e[0],o=e[1],a=e[2],l=e[3],h=l*t+o*i-a*r,c=l*r+a*t-n*i,p=l*i+n*r-o*t,u=-n*t-o*r-a*i;return this[0]=h*l+u*-n+c*-a-p*-o,this[1]=c*l+u*-o+p*-n-h*-a,this[2]=p*l+u*-a+h*-o-c*-n,this}fromYawPitch(e,t){let r=Math.cos(t);return this.set(r*Math.sin(e),Math.sin(t),-r*Math.cos(e))}yawPitch(e){return this[0]=Math.atan2(e[0],-e[2]),this[1]=Math.asin(_.clamp(e[1],-1,1)),this[2]=0,this}basisFromForward(e,t,r=at){return this.cross(t,r).normalize(Et),e.cross(this,t),this}yawPitchBasis(e,t,r,i,n){return r.fromYawPitch(e,t),i.copy(r).scale(-1),this.set(Math.cos(e),0,Math.sin(e)),n.cross(i,this),this}rollBasis(e,t){let r=Math.cos(t),i=Math.sin(t),n=this[0],o=this[1],a=this[2],l=e[0],h=e[1],c=e[2];return this.set(n*r+l*i,o*r+h*i,a*r+c*i),e.set(l*r-n*i,h*r-o*i,c*r-a*i),this}fromSphereDir(e,t){let r=Math.sin(t);return this.set(r*Math.sin(e),Math.cos(t),r*Math.cos(e))}polarY(e,t,r=1e-6){let i=e[0]-t[0],n=e[1]-t[1],o=e[2]-t[2],a=Math.max(r,Math.hypot(i,n,o));return this[0]=Math.atan2(i,o),this[1]=Math.acos(_.clamp(n/a,-1,1)),this[2]=a,this}equals(e,t=1e-6){return Math.abs(this[0]-e[0])<=t&&Math.abs(this[1]-e[1])<=t&&Math.abs(this[2]-e[2])<=t}toArray(){return[this[0],this[1],this[2]]}toXYZ(){return{x:this[0],y:this[1],z:this[2]}}distanceXYZ(e){return Math.hypot(this[0]-e.x,this[1]-e.y,this[2]-e.z)}dot(e){return this[0]*e[0]+this[1]*e[1]+this[2]*e[2]}get sqrLen(){return this[0]*this[0]+this[1]*this[1]+this[2]*this[2]}get len(){return Math.hypot(this[0],this[1],this[2])}get xzLen(){return Math.hypot(this[0],this[2])}get minComponent(){return Math.min(this[0],this[1],this[2])}get maxAbs(){return Math.max(Math.abs(this[0]),Math.abs(this[1]),Math.abs(this[2]))}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}},Te=class extends Float32Array{constructor(e){super(4),e?this.from(e):this.identity()}set(e,t,r,i){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this[3]=i,this)}fromXYZW(e){return this.set(e.x,e.y,e.z,e.w)}from(e){return typeof e.x=="number"?this.fromXYZW(e):this.set(e[0],e[1],e[2],e[3])}copy(e){return this.set(e[0],e[1],e[2],e[3])}identity(){return this.set(0,0,0,1)}normalize(){let e=Math.hypot(this[0],this[1],this[2],this[3]);return e>1e-6?this.scale(1/e):this.identity()}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this[3]*=e,this}setAxisAngle(e,t){let r=t*.5,i=Math.sin(r);return this.set(e[0]*i,e[1]*i,e[2]*i,Math.cos(r))}rotatePre(e,t){return this.mul(Ct.setAxisAngle(e,t),this)}rotate(e,t){return this.mul(Ct.setAxisAngle(e,t))}mul(e,t){let r=t?e:this,i=t??e,n=r[0],o=r[1],a=r[2],l=r[3],h=i[0],c=i[1],p=i[2],u=i[3];return this[0]=n*u+l*h+o*p-a*c,this[1]=o*u+l*c+a*h-n*p,this[2]=a*u+l*p+n*c-o*h,this[3]=l*u-n*h-o*c-a*p,this}invert(e=this){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return this.set(-e[0]*r,-e[1]*r,-e[2]*r,e[3]*r)}slerp(e,t){let r=e[0],i=e[1],n=e[2],o=e[3],a=this[0]*r+this[1]*i+this[2]*n+this[3]*o;a<0&&(a=-a,r=-r,i=-i,n=-n,o=-o);let l=1-t,h=t;if(1-a>1e-6){let c=Math.acos(a),p=Math.sin(c);l=Math.sin((1-t)*c)/p,h=Math.sin(t*c)/p}return this.set(l*this[0]+h*r,l*this[1]+h*i,l*this[2]+h*n,l*this[3]+h*o)}toXYZW(){return{x:this[0],y:this[1],z:this[2],w:this[3]}}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}get w(){return this[3]}set w(e){this[3]=e}},ke=class extends Float32Array{constructor(e){super(16),e?this.copy(e):this.identity()}copy(e){return super.set(e),this}identity(){return this.fill(0),this[0]=this[5]=this[10]=this[15]=1,this}multiply(e,t){return t?xr(this,e,t):xr(this,this,e)}preMultiply(e){return xr(this,e,this)}fromTranslation(e){return this.identity(),this[12]=e[0],this[13]=e[1],this[14]=e[2],this}fromScaling(e){return this.identity(),this[0]=e[0],this[5]=e[1],this[10]=e[2],this}perspective(e,t,r,i){let n=1/Math.tan(e*Math.PI/360);return this.fill(0),this[0]=n/t,this[5]=n,this[10]=(i+r)/(r-i),this[11]=-1,this[14]=2*i*r/(r-i),this}cameraWorld(e,t,r=at){let i=ne.sub(e,t).normalize(vi),n=xi.cross(r,i).normalize(Et),o=pn.cross(i,n);return this.cameraWorldAxes(e,n,o,i)}cameraWorldAxes(e,t,r,i){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=0,this[4]=r[0],this[5]=r[1],this[6]=r[2],this[7]=0,this[8]=i[0],this[9]=i[1],this[10]=i[2],this[11]=0,this[12]=e[0],this[13]=e[1],this[14]=e[2],this[15]=1,this}fromQuat(e){return this.fromRotationTranslationScale(e,ot,hn)}fromTransform(e){let{rotation:t,translation:r,scale:i}=e;return Ct.fromXYZW(t).normalize(),this.fromRotationTranslationScale(Ct,ne.fromXYZ(r),xi.set(i.x,i.y,i.z))}fromRotationTranslationScale(e,t,r){let i=e[0],n=e[1],o=e[2],a=e[3],l=i+i,h=n+n,c=o+o,p=i*l,u=i*h,d=i*c,f=n*h,m=n*c,g=o*c,x=a*l,b=a*h,E=a*c,w=r[0],T=r[1],S=r[2];return this[0]=(1-(f+g))*w,this[1]=(u+E)*w,this[2]=(d-b)*w,this[3]=0,this[4]=(u-E)*T,this[5]=(1-(p+g))*T,this[6]=(m+x)*T,this[7]=0,this[8]=(d+b)*S,this[9]=(m-x)*S,this[10]=(1-(p+f))*S,this[11]=0,this[12]=t[0],this[13]=t[1],this[14]=t[2],this[15]=1,this}setPosition(e){return this[12]=e[0],this[13]=e[1],this[14]=e[2],this}translate(e){let t=e[0],r=e[1],i=e[2];return this[12]=this[0]*t+this[4]*r+this[8]*i+this[12],this[13]=this[1]*t+this[5]*r+this[9]*i+this[13],this[14]=this[2]*t+this[6]*r+this[10]*i+this[14],this[15]=this[3]*t+this[7]*r+this[11]*i+this[15],this}scale(e){let t=e[0],r=e[1],i=e[2];for(let n=0;n<4;n++)this[n]*=t,this[n+4]*=r,this[n+8]*=i;return this}fromPivot(e,t,r,i,n){return this.fromTranslation(e).scale(r).translate(i),this.multiply(un.fromQuat(t)),this.translate(ne.copy(i).scale(-1)),n?this.multiply(n):this}pointTo(e,t=ot,r=1){return wi(e,this,t,r)}poseTo(e){return _i(e,this)}},ne=new Q,xi=new Q,pn=new Q,Ct=new Te,un=new ke;function xr(s,e,t){let r=e[0],i=e[1],n=e[2],o=e[3],a=e[4],l=e[5],h=e[6],c=e[7],p=e[8],u=e[9],d=e[10],f=e[11],m=e[12],g=e[13],x=e[14],b=e[15],E=t[0],w=t[1],T=t[2],S=t[3];return s[0]=E*r+w*a+T*p+S*m,s[1]=E*i+w*l+T*u+S*g,s[2]=E*n+w*h+T*d+S*x,s[3]=E*o+w*c+T*f+S*b,E=t[4],w=t[5],T=t[6],S=t[7],s[4]=E*r+w*a+T*p+S*m,s[5]=E*i+w*l+T*u+S*g,s[6]=E*n+w*h+T*d+S*x,s[7]=E*o+w*c+T*f+S*b,E=t[8],w=t[9],T=t[10],S=t[11],s[8]=E*r+w*a+T*p+S*m,s[9]=E*i+w*l+T*u+S*g,s[10]=E*n+w*h+T*d+S*x,s[11]=E*o+w*c+T*f+S*b,E=t[12],w=t[13],T=t[14],S=t[15],s[12]=E*r+w*a+T*p+S*m,s[13]=E*i+w*l+T*u+S*g,s[14]=E*n+w*h+T*d+S*x,s[15]=E*o+w*c+T*f+S*b,s}function wi(s,e,t=ot,r=1){let i=t[0]??0,n=t[1]??0,o=t[2]??0;return s[0]=e[0]*i+e[4]*n+e[8]*o+e[12],s[1]=e[1]*i+e[5]*n+e[9]*o+e[13],s[2]=e[2]*i+e[6]*n+e[10]*o+e[14],r!==1&&(s[0]*=r,s[1]*=r,s[2]*=r),s}function bi(s,e,t,r){let i=t[0],n=t[1],o=t[2];s[0]=e[0]*i+e[4]*n+e[8]*o,s[1]=e[1]*i+e[5]*n+e[9]*o,s[2]=e[2]*i+e[6]*n+e[10]*o;let a=Math.hypot(s[0],s[1],s[2]);if(Number.isFinite(a)&&a>1e-6){let l=1/a;s[0]*=l,s[1]*=l,s[2]*=l}else s[0]=r[0],s[1]=r[1],s[2]=r[2];return s}function _i(s,e){return s[0]=e[12],s[1]=e[13],s[2]=e[14],bi(ne,e,br,br),s[3]=ne[0],s[4]=ne[1],s[5]=ne[2],bi(ne,e,at,at),s[6]=ne[0],s[7]=ne[1],s[8]=ne[2],s}function dn(s,e,t){return e>1e-6?Math.min(t,(.5-s)/e):e<-1e-6?Math.min(t,(-.5-s)/e):t}var lt=class{#e;#t=new Q;#r=new Q;#i=new Te;#s=new Te;#o=new Q;#n=new Q;constructor({type:e,position:t,rotation:r,scale:i}){this.#e=e,this.#t.fromXYZ(t),this.#r.fromXYZ(i),this.#i.fromXYZW(r).normalize(),this.#s.copy(this.#i).invert()}clampPoint(e){if(this.#e==="sphere"){let r=this.#r.minComponent*.5,i=this.#o.sub(e,this.#t).len;i>r&&this.#o.scale(r/i).addTo(e,this.#t);return}let t=this.#a(e);t.maxAbs<=.5||t.clampScalar(-.5,.5).multiply(this.#r).transformQuat(this.#i).addTo(e,this.#t)}rayLimit(e,t,r){if(this.#e==="sphere"){let a=this.#r.minComponent*.5,l=this.#o.sub(e,this.#t),h=l.dot(t),c=h*h-(l.sqrLen-a*a);return c<=0?0:_.clamp(Math.sqrt(c)-h,0,r)}let i=this.#a(e),n=this.#n.copy(t).transformQuat(this.#s).divide(this.#r),o=r;for(let a=0;a<3;a++)o=dn(i[a],n[a],o);return Math.max(0,o)}#a(e){return this.#o.sub(e,this.#t).transformQuat(this.#s).divide(this.#r)}},P={create:()=>new Q},$={create:()=>new Te},O={create:()=>new ke,clone:s=>new ke(s),pointTo:wi,poseTo:_i};async function Rt(s="@gracia/web-sdk/wasm"){for(let e=0;;e++)try{let t=await import(s);return t.default??t}catch{await new Promise(r=>setTimeout(r,1e3))}}var kt=class{#e;#t=0;constructor(e,t=512){this.#e=e,this.#t=e._malloc(t)}ptr(e=0){return this.#t+e}get f32(){return this.#e.HEAPF32}writeF32(e,t=0){this.#e.HEAPF32.set(e,this.#t+t>>2)}readF32(e,t=0){let r=this.#t+t;return new Float32Array(this.#e.HEAPF32.buffer,r,e)}free(){this.#t&&(this.#e._free(this.#t),this.#t=0)}};function vr(s,e,...t){if(!e)return;let r=new TextEncoder,i=[],n=t.map(a=>{if(typeof a!="string")return a;let l=r.encode(a),h=s._malloc(l.length+1);return s.HEAPU8.set(l,h),s.HEAPU8[h+l.length]=0,i.push(h),h}),o=e(...n);for(let a of i)s._free(a);return o}var M=(s,e)=>s[`_Gracia_${e}`];async function fn(s){let e=await navigator.gpu.requestAdapter({powerPreference:"high-performance",xrCompatible:s});if(!e)throw new Error("WebGPU adapter not available");return await e.requestDevice({requiredLimits:{maxStorageBuffersPerShaderStage:10,maxComputeWorkgroupSizeX:256,maxBufferSize:e.limits.maxBufferSize,maxStorageBufferBindingSize:e.limits.maxStorageBufferBindingSize}})}var At=class s{#e;#t;#r=null;#i=0;constructor(e){this.#e=e,this.#t=new kt(e)}static async boot(e,t,{maxSplatsCount:r=0,xrCompatible:i=!1}={}){let n=typeof e=="function"?await e({canvas:t}):e,o=await fn(i);if(typeof e=="function"&&(n.preinitializedWebGPUDevice=o,n.WebGPU?.importJsDevice?.(o)),M(n,"Init")?.(r|0),!M(n,"Initialized")?.())throw new Error("Gracia init failed");return{module:new s(n),device:o}}get heap(){return this.#t}get backend(){return this.#r}get buildUnixTime(){return M(this.#e,"GetBuildTime")?.()??0}shutdownApp(){M(this.#e,"Shutdown")?.()}setCamera(e,t,r,i){let n=!!(r&&i),o=this.#t.ptr(),a=o>>2,l=this.#t.f32;l.set(e,a),n&&l.set(r,a+16),l.set(t,a+32),n&&l.set(i,a+48),M(this.#e,"SetCamera")?.(n,o)}getModelMatrix(){let e=M(this.#e,"GetModelMatrix");if(!e)return null;let t=this.#t.ptr(256);return e(t),this.#t.readF32(16,256)}setModelMatrix(e){let t=M(this.#e,"SetModelMatrix");t&&(this.#t.writeF32(e,256),t(this.#t.ptr(256)))}initPure(e){this.shutdownBackend(),this.#r="pure",M(this.#e,"P_Init")?.(e?1:0)}pureRenderTo(e,t,r,i){let n=this.#e.WebGPU,o=n?.importJsTexture?.(e)??0,a=t?n?.importJsTexture?.(t)??0:0;return M(this.#e,"P_RenderTo")?.(o,a,r,i)!==0}purePrepare(e,t){return M(this.#e,"P_Prepare")?.(e,t)===1}#s(e){return e?this.#e.WebGPU?.importJsTexture?.(e)??0:0}pureDraw(e,t,r,i,n,o,a){M(this.#e,"P_Draw")?.(e,this.#s(t),r,this.#s(i),n,o.x,o.y,o.width,o.height,a?1:0,a?.[0]??0,a?.[1]??0,a?.[2]??0,a?.[3]??0)}pureDrawMV(e,t,r,i,n,o){M(this.#e,"P_DrawMV")?.(e,this.#s(t),r,this.#s(i),n,o.x,o.y,o.width,o.height)}pureSubmit(){M(this.#e,"P_Submit")?.()}initHybrid(e){this.shutdownBackend(),this.registerGL(e),this.#r="hybrid",M(this.#e,"H_Init")?.()}hybridFrame(e,t,r){M(this.#e,"H_Frame")?.(e,t,r)}hybridPreprocess(e,t){return M(this.#e,"H_Preprocess")?.(e,t)??0}hybridRender(e,t,r,i,n,o){M(this.#e,"H_Render")?.(e,t,r,i,n,o)}hybridRenderMesh(e,t,r,i,n){this.#t.writeF32(e),M(this.#e,"H_RenderMeshMVP")?.(this.#t.ptr(),t,r,i,n)}hybridRenderMotionMV(e,t,r,i){M(this.#e,"H_RenderMotionMV")?.(e,t,r,i)}hybridCanMotion(){return!!M(this.#e,"H_CanMotion")?.()}hybridHasMultiview(){return!!M(this.#e,"H_HasMultiview")?.()}hybridReset(){M(this.#e,"H_Reset")?.()}registerGL(e){this.#i&&this.#e.GL?.deleteContext(this.#i);let t=this.#e.GL;if(!t)throw new Error("WASM GL layer not available");this.#i=t.registerContext(e,{majorVersion:2,minorVersion:0,enableExtensionsByDefault:!0}),t.makeContextCurrent(this.#i)}shutdownBackend(){this.#r==="pure"?M(this.#e,"P_Shutdown")?.():this.#r==="hybrid"&&M(this.#e,"H_Shutdown")?.(),this.#i&&(this.#e.GL?.deleteContext(this.#i),this.#i=0),this.#r=null}dispose(){this.shutdownBackend(),this.#t.free(),this.shutdownApp()}addDynamicScene(){return M(this.#e,"AddScene")?.()??0}addStaticScene(){return M(this.#e,"AddStaticScene")?.()??0}removeScene(e){M(this.#e,"RemoveScene")?.(e)}sceneReady(e){return e?(M(this.#e,"SceneReady")?.(e)??0)!==0:!1}sceneProgress(e){return e?M(this.#e,"SceneProgress")?.(e)??0:0}sceneDuration(e){return e?M(this.#e,"SceneDuration")?.(e)??0:0}sceneIsBuffering(e){return e?(M(this.#e,"SceneIsBuffering")?.(e)??0)!==0:!1}sceneLastFetchStatus(e){return e?M(this.#e,"SceneGetLastFetchStatus")?.(e)??0:0}sceneSetTime(e,t){M(this.#e,"SceneSetTime")?.(e,t)}sceneSetVisible(e,t){M(this.#e,"SceneSetVisible")?.(e,t)}sceneGetBBox(e){let t=M(this.#e,"SceneGetBBox");if(!t||!e)return null;let r=this.#t.ptr(256);t(e,r);let i=r>>2,n=this.#t.f32;return n[i]===0&&n[i+1]===0&&n[i+2]===0&&n[i+3]===0&&n[i+4]===0&&n[i+5]===0?null:{minX:n[i],minY:n[i+1],minZ:n[i+2],maxX:n[i+3],maxY:n[i+4],maxZ:n[i+5]}}sceneSetEnvLighting(e,t,r){let i=M(this.#e,"SceneSetEnvPreset");if(!i||!e)return;let n=this.#t.ptr(128),o=n>>2,a=this.#t.f32;for(let l=0;l<4;l++)a[o+l*4]=t[l*3],a[o+l*4+1]=t[l*3+1],a[o+l*4+2]=t[l*3+2],a[o+l*4+3]=0;a[o+3]=r,i(e,n)}sceneClearEnvLighting(e){M(this.#e,"SceneClearEnvPreset")?.(e)}sceneSetModelMatrix(e,t){let r=M(this.#e,"SceneSetModelMatrix");!r||!e||(this.#t.writeF32(t,256),r(e,this.#t.ptr(256)))}sceneOpen(e,t){vr(this.#e,M(this.#e,"SceneOpen"),e,t)}sceneOpenApi(e,t,r){vr(this.#e,M(this.#e,"SceneOpenApi"),e,t,r)}registerLocalFile(e){let t=this.#e.graciaRegisterLocalFile;if(!t)throw new Error("WASM local-file bridge unavailable");return t(e)}sceneOpenLocal(e,t){M(this.#e,"SceneOpenLocal")?.(e,t)}sceneOpenStatic(e,t){let r=M(this.#e,"SceneOpenStatic");if(!r)return-1;let i=this.#e._malloc(t.length);this.#e.HEAPU8.set(t,i);try{return r(e,i,t.length)}finally{this.#e._free(i)}}};var mn={panningModel:"HRTF",distanceModel:"inverse",refDistance:1,maxDistance:100,rolloffFactor:1},gn=[0,0,0],yn=[0,0,0,0,0,-1,0,1,0],xn=.1,bn=40,Si=.01,Ti=.08,vn=1.5,Pi=.05,wn=2e3;function Mi(){typeof navigator<"u"&&navigator.audioSession&&(navigator.audioSession.type="playback")}function Ei(){return typeof performance<"u"?performance.now():Date.now()}function J(s,e,t,r=0){r>0?s.linearRampToValueAtTime(e,t.currentTime+r):s.setValueAtTime(e,t.currentTime)}function _n(s,e,t){s.setTargetAtTime(e,t.currentTime,.01)}function Ft(s){try{s.disconnect()}catch{}}function ee(s,e){return Math.abs(s-e)<1e-4}function K(s){try{s.automationRate="k-rate"}catch{}}function wr(s){s.positionX&&(K(s.positionX),K(s.positionY),K(s.positionZ),"orientationX"in s?(K(s.orientationX),K(s.orientationY),K(s.orientationZ)):(K(s.forwardX),K(s.forwardY),K(s.forwardZ),K(s.upX),K(s.upY),K(s.upZ)))}function Ci(s,e,t,r,i,n=0){J(s.positionX,e,i,n),J(s.positionY,t,i,n),J(s.positionZ,r,i,n)}function Sn(s,e,t,r,i,n,o,a,l=0){if("orientationX"in s){J(s.orientationX,e,a,l),J(s.orientationY,t,a,l),J(s.orientationZ,r,a,l);return}J(s.forwardX,e,a,l),J(s.forwardY,t,a,l),J(s.forwardZ,r,a,l),J(s.upX,i,a,l),J(s.upY,n,a,l),J(s.upZ,o,a,l)}var _r=class{#e=null;#t=null;#r=[0,0,0];#i=[0,0,-1,0,1,0];#s=!1;#o=new Float32Array(9);#n=!1;constructor(){Mi(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&this.#e&&this.#e.state!=="running"&&this.resume()})}get ctx(){return this.#e}get destination(){return this.#t??this.#e?.destination??null}setOutput(e){e?.context&&e.context!==this.#e&&(this.#e=e.context,wr(this.#e.listener),this.#n=!1),this.#t=e?.destination??null,this.#s=e?.externalListener===!0,this.#h()}prepare(){let e=this.#a();if(!e)throw new Error("Web Audio is not supported in this browser");return{ctx:e,destination:this.destination??e.destination}}resume(){Mi();let e=this.#a();return e?e.state==="running"?Promise.resolve():e.resume().catch(()=>{}):Promise.resolve()}listener(e,t,r,i,n,o,a,l,h,c=0){this.#r=[e,t,r],this.#i=[i,n,o,a,l,h],this.#h(c)}resetListener(){this.listener(...yn)}#a(){if(this.#e)return this.#e;if(typeof AudioContext>"u")return null;try{this.#e=new AudioContext}catch{return null}return wr(this.#e.listener),this.#n=!1,this.#h(),this.#e}#h(e=0){let t=this.#e?.listener;if(!t||this.#s)return;let[r,i,n]=this.#r,[o,a,l,h,c,p]=this.#i,u=this.#o;this.#n&&ee(r,u[0])&&ee(i,u[1])&&ee(n,u[2])&&ee(o,u[3])&&ee(a,u[4])&&ee(l,u[5])&&ee(h,u[6])&&ee(c,u[7])&&ee(p,u[8])||(u.set([r,i,n,o,a,l,h,c,p]),this.#n=!0,Ci(t,r,i,n,this.#e,e),Sn(t,o,a,l,h,c,p,this.#e,e))}},pe=new _r,Sr=class{#e;#t;#r;#i;#s;#o;ready;#n=null;#a=[];#h=null;#l=!1;#c=!1;#p=!1;#u=!1;#d=!1;#f=0;#m=0;#g=0;#b=NaN;#y=NaN;#x=NaN;constructor(e,t={}){let{ctx:r,destination:i}=pe.prepare();this.#e=r,this.#o=t.destination??i;let n=new Audio;this.#t=n,n.crossOrigin="anonymous",n.preload="auto",n.loop=!0,n.preservesPitch=!1,this.#i=r.createGain(),this.#s=r.createPanner(),wr(this.#s),this.pannerAttr({...mn,...t.pannerAttr}),this.#r=r.createMediaElementSource(n),this.#r.connect(this.#s),this.#s.connect(this.#i),this.#i.connect(this.#o),this.volume(t.volume??1).rate(t.rate??1).pos(...t.pos??gn),this.ready=new Promise(o=>{this.#n=o}),this.#T("loadedmetadata",()=>this.#M()),this.#T("canplay",()=>this.#S()),this.#T("loadeddata",()=>this.#S()),this.#T("error",()=>this.#E(`Media error ${n.error?.code??"unknown"}`)),n.src=e,n.load(),this.#S()}get context(){return this.#e}get blocked(){return this.#p}get failed(){return this.#l}get buffering(){return this.#w||this.#v&&this.#g>0}get clockRate(){return!this.#v||Math.abs(this.#m)<Si?1:1+_.clamp(vn*this.#m,-Pi,Pi)}get#v(){return!this.#l&&!this.#p&&!this.#c}get#w(){return this.#v&&(!this.#u||this.#d||this.#t.paused||this.#t.readyState<3||this.#t.seeking||this.#h!==null)}#T(e,t){this.#a.push([e,t]),this.#t.addEventListener(e,t)}#S(){this.#t.readyState<3||this.#c||this.#P()}#P(){this.#n?.(),this.#n=null}#E(e){this.#c||this.#l||(this.#l=!0,this.pause(),this.#P())}allowPlayback(){this.#p=!1}play(){if(this.#l||this.#p||this.#c||this.#d||this.#u&&!this.#t.paused)return;let e=++this.#f;this.#d=!0;try{Promise.resolve(this.#t.play()).then(()=>{e!==this.#f||this.#c||(this.#d=!1,this.#u=!0)}).catch(t=>this.#_(e,t))}catch(t){this.#_(e,t)}}#_(e,t){e!==this.#f||this.#c||(this.#d=!1,this.#u=!1,t?.name==="NotAllowedError"?(this.#p=!0,this.#t.pause()):t?.name!=="AbortError"&&this.#E(t))}pause(){this.#f++,this.#d=!1,this.#u=!1,this.#C(),this.#t.paused||this.#t.pause()}unload(){this.pause(),this.#c=!0;for(let[e,t]of this.#a)this.#t.removeEventListener(e,t);this.#a=[],this.#t.removeAttribute("src"),this.#t.load(),this.#P(),Ft(this.#r),Ft(this.#s),Ft(this.#i)}seek(e){return typeof e=="number"&&(this.#C(),this.#h=Number.isFinite(e)?Math.max(0,e):0,this.#M()),this.#h??this.#t.currentTime}#M(){if(this.#h===null||this.#t.readyState<1)return;let e=this.#t.duration,t=Number.isFinite(e)&&e>0?_.wrap(this.#h,e):this.#h;Math.abs(this.#t.currentTime-t)>.005&&(this.#t.currentTime=t),this.#h=null}sync(e){this.#l||this.#p||this.#c||(!this.#u||this.#t.paused)&&!this.#d&&(this.seek(e),this.play())}follow(e){if(this.#w||!this.#v||this.#e.state!=="running"){this.#C();return}let t=this.#t.currentTime-e,r=this.#t.duration;Number.isFinite(r)&&r>0&&(t=_.wrapDelta(t,r));let i=Ei();if(t<-Ti?this.#g||=i:t>-Si&&(this.#g=0),t>Ti||this.#g&&i-this.#g>wn){this.seek(e);return}this.#m=t}#C(){this.#m=0,this.#g=0}volume(e){return _n(this.#i.gain,_.clamp01(e),this.#e),this}rate(e){return this.#t.playbackRate=_.clamp(_.finite(e,1),.1,4),this}pos(e,t,r,i=0){return ee(e,this.#b)&&ee(t,this.#y)&&ee(r,this.#x)?this:(this.#b=e,this.#y=t,this.#x=r,Ci(this.#s,e,t,r,this.#e,i),this)}destination(e){let t=e??this.#e.destination;return t===this.#o?this:(Ft(this.#i),this.#o=t,this.#i.connect(this.#o),this)}pannerAttr(e){return e?(e.panningModel&&(this.#s.panningModel=e.panningModel),e.distanceModel&&(this.#s.distanceModel=e.distanceModel),typeof e.refDistance=="number"&&(this.#s.refDistance=e.refDistance),typeof e.maxDistance=="number"&&(this.#s.maxDistance=e.maxDistance),typeof e.rolloffFactor=="number"&&(this.#s.rolloffFactor=e.rolloffFactor),this):this}},Bt=class{#e=null;#t=null;#r=[0,0,0];#i=P.create();#s=new Float32Array(9);#o={volume:1,rate:1,pannerAttr:{}};#n=!1;#a=0;#h=0;#l=0;#c=!1;get context(){return pe.ctx}get isLoaded(){return!this.#c||!this.#n||pe.ctx?.state!=="running"||this.#e?.blocked===!0}get isBuffering(){return this.#n&&(this.#e?.buffering??!1)}setOutput(e){if(pe.setOutput(e),!!this.#e){if(this.#e.context!==pe.ctx){let t=this.#t,r=this.#e.seek();this.unload(),t&&(this.load(t),this.#e?.seek(r));return}this.#e.destination(pe.destination)}}async load(e){if(e===this.#t&&this.#e&&!this.#e.failed){await this.#e.ready;return}this.unload(),this.#t=e,this.#c=!0;let t=++this.#a;try{this.#e=new Sr(e,{...this.#o,pos:this.#r}),await this.#e.ready}catch{t===this.#a&&(this.#e?.unload(),this.#e=null,this.#t=null)}finally{t===this.#a&&(this.#c=!1)}}sync(e,t,r){let i=this.#e;return!this.#n||!r?(i?.pause(),!0):(i?.sync(e),i?.follow(e),!this.isBuffering)}get clockRate(){return this.#n?this.#e?.clockRate??1:1}seek(e){this.#e?.seek(e)}volume(e){this.#o.volume=_.clamp01(e),this.#e?.volume(this.#o.volume)}rate(e){this.#o.rate=e,this.#e?.rate(e)}setSpatial(e,t,r){this.#r=[e,t,r];let i=this.#p("spatial");i>=0&&this.#e?.pos(e,t,r,i)}setSourceMatrix(e,t,r=1){let i=e.pointTo?.(this.#i,t,r)??O.pointTo(this.#i,e,t,r);this.setSpatial(i.x,i.y,i.z)}setListenerMatrix(e){let t=this.#p("listener");if(t<0)return;let r=e.poseTo?.(this.#s)??O.poseTo(this.#s,e);pe.listener(...r,t)}setPanner(e){Object.assign(this.#o.pannerAttr,e),this.#e?.pannerAttr(e)}stop(){this.#e?.pause()}get enabled(){return this.#n&&pe.ctx?.state==="running"&&!this.#e?.blocked}enable(){this.#n=!0,pe.resume(),this.#e?.allowPlayback()}disable(){this.#n=!1,this.#e?.pause()}unload(){this.#a++,this.#e?.unload(),this.#e=null,this.#t=null,this.#c=!1,pe.resetListener()}#p(e){let t=Ei(),r=e==="listener"?this.#h:this.#l;return r&&t-r<bn?-1:(e==="listener"?this.#h=t:this.#l=t,_.deltaSeconds(t,r,0,xn))}};var ht=class{#e;#t=0;#r=!1;constructor(e){this.#e=e}get id(){return this.#t}get isStatic(){return this.#r}get isReady(){return this.#e.sceneReady(this.#t)}get progress(){return this.#e.sceneProgress(this.#t)}get duration(){return this.#r?0:this.#e.sceneDuration(this.#t)}get isBuffering(){return this.#r?!1:this.#e.sceneIsBuffering(this.#t)}get lastFetchStatus(){return this.#e.sceneLastFetchStatus(this.#t)}setTime(e){this.#t&&!this.#r&&this.#e.sceneSetTime(this.#t,e)}setVisible(e){this.#t&&this.#e.sceneSetVisible(this.#t,e)}getBBox(){return this.#e.sceneGetBBox(this.#t)}setEnvLighting(e,t){this.#t&&this.#e.sceneSetEnvLighting(this.#t,e,t)}clearEnvLighting(){this.#t&&this.#e.sceneClearEnvLighting(this.#t)}setModelMatrix(e){this.#t&&this.#e.sceneSetModelMatrix(this.#t,e)}openDynamic(e){if(this.remove(),this.#t=this.#e.addDynamicScene(),this.#r=!1,e.localFile||e.file){let r=e.localFile||e.file;this.#e.sceneOpenLocal(this.#t,this.#e.registerLocalFile(r));return}let t=e.url;if(e.token){this.#e.sceneOpenApi(this.#t,t,e.token);return}this.#e.sceneOpen(this.#t,t)}async openStatic(e){this.remove();let t=this.#e.addStaticScene();this.#t=t,this.#r=!0;let r=e.file?await e.file.arrayBuffer():await(await fetch(e.url)).arrayBuffer();this.#t===t&&this.#e.sceneOpenStatic(t,new Uint8Array(r))}remove(){this.#t&&(this.#e.removeScene(this.#t),this.#t=0)}};var Li={alpha:!0,premultipliedAlpha:!0,depth:!0,stencil:!1,antialias:!1,powerPreference:"high-performance",xrCompatible:!0},Xe=class s{#e;#t;#r=new Bt;#i=0;#s=null;#o=null;#n=null;#a=!1;#h=0;#l=0;#c=1;#p=null;#u=null;static GL_CANVAS_OPTS=Li;constructor(e,t){this.#e=e,this.#t=t,typeof document<"u"&&document.addEventListener("visibilitychange",this.#d)}#d=()=>{document.hidden&&this.#r.stop()};static async create(e,{canvas:t,gl:r,backend:i,maxSplatsCount:n,xrCompatible:o}={}){if(!t&&!r)throw new Error("canvas or gl required");let a=i??(r?"hybrid":"pure"),{module:l,device:h}=await At.boot(e,t||r.canvas,{maxSplatsCount:n,xrCompatible:o}),c=new s(l,h);return a==="hybrid"?c.#g(r??s.#f(t)):c.#m(t),c}static preferredFormat(){return navigator.gpu.getPreferredCanvasFormat()}static#f(e){let t=e.getContext("webgl2",Li);if(!t)throw new Error("WebGL2 not available");return t}get device(){return this.#t}get backend(){return this.#e.backend}get buildUnixTime(){return this.#e.buildUnixTime}get gl(){return this.#u}get isBGRA(){return s.preferredFormat()==="bgra8unorm"}assertDevice(e){if(e&&e!==this.#t)throw new Error("WebGPU device must match GraciaPlayer.device")}configureSurface(e,t={}){let{format:r,alphaMode:i="premultiplied",usage:n}=t;e.configure({device:this.#t,format:r??s.preferredFormat(),alphaMode:i,...n!=null?{usage:n}:{}})}bindCanvas(e,t={}){let r=e.getContext("webgpu");if(!r)throw new Error("WebGPU canvas context not available");return this.configureSurface(r,t),this.#p=r,r}setBackend(e,{canvas:t,gl:r}={}){if(this.shutdown(),e==="hybrid"){if(!r&&!t)throw new Error("canvas or gl required for hybrid backend");this.#g(r??s.#f(t))}else this.#m(t)}present(e,t){e===0||t===0||(this.#e.backend==="hybrid"?this.#y(e,t):this.#b())}renderTextures({color:e,depth:t,w:r,h:i}){return this.#w(),this.#e.backend!=="pure"?!1:this.#e.pureRenderTo(e,t,r,i)}renderXR({views:e,clear:t=[0,0,0,1]}){let[r,i]=e;if(!r||this.#e.backend!=="pure")return!1;this.setCamera(r.pose,r.projection,i?.pose,i?.projection),this.#w();let n=this.#e.purePrepare(r.viewport.width,r.viewport.height);return e.forEach((o,a)=>{this.#e.pureDraw(a,o.color,o.colorLayer??0,o.depth,o.depthLayer??0,o.viewport,t);let l=o.motion;l&&this.#e.pureDrawMV(a,l.texture,l.layer??0,l.depth,l.depthLayer??0,l.viewport)}),this.#e.pureSubmit(),n}copyTexture(e,t,r=null){let i=r??[e.width,e.height,1],n=this.#t.createCommandEncoder();n.copyTextureToTexture({texture:e},{texture:t},i),this.#t.queue.submit([n.finish()])}renderHybridViewport(e,t,{gl:r,drawMode:i,enableMesh:n=!1,x:o=0,y:a=0,eye:l=0}={}){let h=r??this.#u;if(!h)throw new Error("No WebGL context");let c=i??this.#i;this.preprocess(e,t),h.enable(h.DEPTH_TEST),h.depthFunc(h.LEQUAL),h.depthMask(!1),this.render(c,o,a,e,t,l),n&&(h.colorMask(!1,!1,!1,!1),h.depthMask(!0),this.render(1,o,a,e,t,l),h.colorMask(!0,!0,!0,!0)),h.depthMask(!0)}shutdown(){this.#e.shutdownBackend(),this.#u=null,this.#p=null}#m(e){this.#u=null,this.#p=null,this.#t.pushErrorScope("validation"),this.#e.initPure(this.isBGRA),this.#t.popErrorScope().then(t=>{}),e&&this.bindCanvas(e)}#g(e){this.#p=null,this.#u=e,this.#e.initHybrid(e)}#b(){if(!this.#p)throw new Error("bindCanvas() required");let{width:e,height:t}=this.#p.canvas;e===0||t===0||this.renderTextures({color:this.#p.getCurrentTexture(),w:e,h:t})}#y(e,t){let r=this.#u;if(!r)throw new Error("hybrid backend required");r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clearDepth(1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.disable(r.DEPTH_TEST),this.frame(e,t,this.#i)}get drawMode(){return this.#i}set drawMode(e){this.#i=_.clampInt(e,0,3)}get#x(){return this.#s??this.#o}get isReady(){return(this.#x?.isReady??!1)&&this.#r.isLoaded}get progress(){return this.#x?.progress??0}get duration(){return this.#s?.duration??0}get currentTime(){return this.#h}get isPlaying(){return this.#a}get isBuffering(){return(this.#s?.isBuffering??!1)||this.#a&&this.#r.isBuffering}get lastFetchStatus(){return this.#x?.lastFetchStatus??0}play(){this.#a=!0,this.#v()}pause(){this.#a=!1,this.#l=0,this.#r.stop()}seek(e){this.#h=e,this.#l=0,this.#r.seek(e)}get speed(){return this.#c}setSpeed(e){this.#c=_.clamp(_.finite(e,1),.1,4),this.#r.rate(this.#c)}close(){this.#s?.remove(),this.#s=null,this.#o?.remove(),this.#o=null,this.#h=0,this.#l=0,this.#a=!1,this.#r.unload()}clearVideo(){this.#s?.remove(),this.#s=null,this.#h=0,this.#l=0,this.#a=!1,this.#r.unload()}clearEnvironment(){this.#o?.remove(),this.#o=null}#v(){let e=this.#a&&(this.#s?.isReady??!1)&&!this.#s?.isBuffering;return this.#r.sync(this.#h,this.duration,e)}#w(){if(!this.#s)return;let e=performance.now(),t=this.#v(),r=this.#a&&this.#s.isReady&&!this.#s.isBuffering&&t;if(r&&this.#l>0){this.#h+=_.deltaSeconds(e,this.#l)*this.#c*this.#r.clockRate;let i=this.duration;i>0&&(this.#h=_.wrap(this.#h,i))}this.#l=r?e:0,this.#s.setTime(this.#h)}open(e){if(this.#r.unload(),e.audio&&this.#r.load(e.audio),e.type==="static")return this.#T(e);this.#s||(this.#s=new ht(this.#e)),this.#s.openDynamic(e),this.#S(this.#s),this.#h=0,this.#l=0,this.#a=!1}async#T(e){this.#o||(this.#o=new ht(this.#e)),await this.#o.openStatic(e),this.#S(this.#o)}get audioContext(){return this.#r.context}get audioEnabled(){return this.#r.enabled}enableAudio(){this.#r.enable(),this.#v()}disableAudio(){this.#r.disable()}setAudioOutput(e){this.#r.setOutput(e)}setVolume(e){this.#r.volume(e)}loadAudio(e){return this.#r.load(e)}setAudioSpatial(e,t,r){this.#r.setSpatial(e,t,r)}setAudioSourceMatrix(e,t,r){this.#r.setSourceMatrix(e,t,r)}setAudioListenerMatrix(e){this.#r.setListenerMatrix(e)}setAudioPanner(e){this.#r.setPanner(e)}setCamera(e,t,r,i){this.#e.setCamera(e,t,r,i)}getBBox(){return this.#x?.getBBox()??null}getModelMatrix(){return this.#e.getModelMatrix()}setModelMatrix(e){this.#e.setModelMatrix(e)}setStaticModelMatrix(e){this.#o?.setModelMatrix(e)}setEnvLighting(e,t=1){this.#n={coefs:Float32Array.from(e),scale:t},this.#s?.setEnvLighting(e,t),this.#o?.setEnvLighting(e,t)}clearEnvLighting(){this.#n=null,this.#s?.clearEnvLighting(),this.#o?.clearEnvLighting()}#S(e){this.#n&&e.setEnvLighting(this.#n.coefs,this.#n.scale)}frame(e,t,r){this.#w(),this.#e.hybridFrame(e,t,r)}preprocess(e,t){return this.#w(),this.#e.hybridPreprocess(e,t)}render(e,t,r,i,n,o){this.#e.hybridRender(e,t,r,i,n,o)}renderMesh(e,t,r,i,n){this.#e.hybridRenderMesh(e,t,r,i,n)}renderMotionMV(e,t,r,i){this.#e.hybridRenderMotionMV(e,t,r,i)}canMotion(){return this.#e.hybridCanMotion()}hasMultiview(){return this.#e.hybridHasMultiview()}resetXR(){this.#e.hybridReset()}dispose(){typeof document<"u"&&document.removeEventListener("visibilitychange",this.#d),this.close(),this.#r.unload(),this.shutdown(),this.#e.dispose()}};var ct={daylight:{ambient:[3.62,3.54,3.37],topDown:[.5,.45,.4]},cloudy:{ambient:[3.19,3.26,3.44],topDown:[.05,.05,.07]},sunset:{ambient:[4.08,3.01,1.95],topDown:[.25,.12,.02],frontBack:[.15,.06,0],leftRight:[-.3,-.12,0]},indoor:{ambient:[3.72,3.37,2.84],topDown:[.3,.25,.15]},shade:{ambient:[3.12,3.3,3.72],topDown:[.1,.15,.3]},night:{ambient:[2.48,2.66,3.01],topDown:[.08,.1,.15]},off:null};var Tn=2.5,ki=1.6,Pn=.0015,Mn=2,Ri=.5,En=.6,Cn=.022,Ln=1e-4,It=Math.PI/2-.01,Gt=.05,zt=200,Rn=new Set(["w","a","s","d","r","f","q","e","shift"]),pt=class{#e;#t=new Map;#r=null;#i=1;#s;#o;#n;#a=0;#h=0;#l=0;#c=0;#p=0;#u=e=>e.preventDefault();constructor(e,{pan:t=!0,rotate:r=Tn,onDown:i}={}){this.#e=e,this.#s=t,this.#o=r,this.#n=i,this.#i=e.clientHeight||1,e.addEventListener("contextmenu",this.#u),e.addEventListener("pointerdown",this.#d),e.addEventListener("wheel",this.#g,{passive:!1})}get height(){return this.#i}consume(e){return e.rotX=this.#a,e.rotY=this.#h,e.panX=this.#l,e.panY=this.#c,e.zoom=this.#p,this.#a=this.#h=this.#l=this.#c=this.#p=0,e}dispose(){this.#e.removeEventListener("contextmenu",this.#u),this.#e.removeEventListener("pointerdown",this.#d),this.#e.removeEventListener("wheel",this.#g),window.removeEventListener("pointermove",this.#f),window.removeEventListener("pointerup",this.#m),window.removeEventListener("pointercancel",this.#m),this.#t.clear(),this.#r=null}#d=e=>{this.#e.setPointerCapture?.(e.pointerId),this.#t.size===0&&(window.addEventListener("pointermove",this.#f),window.addEventListener("pointerup",this.#m),window.addEventListener("pointercancel",this.#m)),this.#t.set(e.pointerId,{x:e.clientX,y:e.clientY,button:e.button,touch:e.pointerType==="touch"}),this.#i=this.#e.clientHeight||this.#i,this.#t.size===2&&this.#b(),this.#n?.()};#f=e=>{let t=this.#t.get(e.pointerId);if(!t)return;let r=e.clientX-t.x,i=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,this.#t.size>=2)return this.#y();!t.touch&&(t.button===2||e.buttons===2)?this.#s&&(this.#l+=r,this.#c+=i):(this.#a+=r/this.#i*this.#o,this.#h+=i/this.#i*this.#o)};#m=e=>{this.#e.releasePointerCapture?.(e.pointerId),this.#t.delete(e.pointerId),this.#r=null,this.#t.size===0&&(window.removeEventListener("pointermove",this.#f),window.removeEventListener("pointerup",this.#m),window.removeEventListener("pointercancel",this.#m))};#g=e=>{e.preventDefault(),this.#p+=-e.deltaY*Pn};#b(){let[e,t]=this.#t.values();this.#r={dist:Math.hypot(e.x-t.x,e.y-t.y),cx:(e.x+t.x)/2,cy:(e.y+t.y)/2}}#y(){let[e,t]=this.#t.values(),r=Math.hypot(e.x-t.x,e.y-t.y),i=(e.x+t.x)/2,n=(e.y+t.y)/2,o=this.#r;o&&(o.dist>0&&r>0&&(this.#p+=Math.log(r/o.dist)),this.#s&&(this.#l+=i-o.cx,this.#c+=n-o.cy)),this.#r={dist:r,cx:i,cy:n}}},kn=s=>1-Math.exp(-s/Cn),te=()=>({rotX:0,rotY:0,panX:0,panY:0,zoom:0}),An=s=>Math.abs(s.rotX)+Math.abs(s.rotY)+Math.abs(s.panX)+Math.abs(s.panY)+Math.abs(s.zoom)<Ln;function Er(s,e,t,r,i){let n=s.consume(e);if(t.rotX+=n.rotX,t.rotY+=n.rotY,t.panX+=n.panX,t.panY+=n.panY,t.zoom+=n.zoom,An(t))return!1;let o=kn(i);for(let a of["rotX","rotY","panX","panY","zoom"])r[a]=t[a]*o,t[a]-=r[a];return!0}var Tr=class{#e;#t;#r=P.create();#i=P.create();#s=P.create();#o=P.create();#n=P.create();#a=P.create();#h=1;#l=0;#c=0;#p=!1;#u=null;#d=te();#f=te();#m=te();constructor(e,t){this.#e=e,this.#t=new pt(t),this.#v()}get type(){return"orbit"}update(e){this.#b(e)&&this.#v()}frame(e,t){this.#w(e,t)}reset(e,t){this.#w(e,t)}zoom(e){e>0&&(this.#f.zoom+=Math.log(e))}setBounds(e){this.#u=e,this.#v()}applyConstraints(e){this.#p=e,this.#c=_.clamp(this.#c,-It,this.#g),this.#v()}dispose(){this.#t.dispose()}get#g(){return this.#p?0:It}#b(e){if(!Er(this.#t,this.#d,this.#f,this.#m,e))return!1;let t=this.#m;return this.#l+=t.rotX,this.#c=_.clamp(this.#c-t.rotY,-It,this.#g),t.zoom&&(this.#h=_.clamp(this.#h*Math.exp(-t.zoom),Gt,zt)),(t.panX||t.panY)&&this.#x(t.panX,t.panY),!0}#y(){this.#o.yawPitchBasis(this.#l,this.#c,this.#i,this.#s,this.#n)}#x(e,t){this.#y();let r=_.perspectiveScale(this.#h,this.#e.fov,this.#t.height)*ki;this.#r.addScaled(this.#o,-e*r).addScaled(this.#n,t*r)}#v(){this.#y();let e=this.#h;this.#u&&(this.#u.clampPoint(this.#r),e=Math.min(e,this.#u.rayLimit(this.#r,this.#s,e))),this.#e.position.copy(this.#s).scale(e).add(this.#r),this.#e.setAxes(this.#o,this.#n,this.#s)}#w(e,t){this.#r.from(e),this.#s.sub(this.#a.from(t),this.#r),this.#h=_.clamp(this.#s.len,Gt,zt),this.#i.copy(this.#s).scale(-1).normalize(L.FORWARD),this.#a.yawPitch(this.#i),this.#l=this.#a.x,this.#c=_.clamp(this.#a.y,-It,this.#g),this.#f=te(),this.#v()}},Pr=class{#e;#t;#r=new Set;#i=$.create();#s=P.create();#o=P.create();#n=P.create();#a=P.create();#h=P.create();#l=null;#c=te();#p=te();#u=te();constructor(e,t){this.#e=e,t.hasAttribute("tabindex")||(t.tabIndex=0),this.#t=new pt(t,{pan:!1,onDown:()=>t.focus()}),window.addEventListener("keydown",this.#g),window.addEventListener("keyup",this.#b)}get type(){return"fly"}update(e){let t=this.#d(e);this.#f(e)&&(t=!0),t&&this.#m()}frame(e,t){this.reset(e,t)}reset(e,t){this.#e.position.from(t),this.#s.sub(this.#h.from(e),this.#e.position).normalize(L.FORWARD),this.#h.yawPitch(this.#s),this.#i.identity().rotate(L.Y,-this.#h.x).rotate(L.X,this.#h.y),this.#p=te(),this.#m()}zoom(e){e>0&&(this.#p.zoom+=Math.log(e))}setBounds(e){this.#l=e,this.#m()}applyConstraints(e){}dispose(){this.#t.dispose(),window.removeEventListener("keydown",this.#g),window.removeEventListener("keyup",this.#b),this.#r.clear()}#d(e){let t=Mn*e*(this.#r.has("shift")?4:1),r=this.#e.position,i=!1,n=(a,l)=>{r.addScaled(a,l),i=!0},o=a=>{this.#i.rotate(L.Z,a),i=!0};return this.#r.has("w")&&n(this.#s,t),this.#r.has("s")&&n(this.#s,-t),this.#r.has("d")&&n(this.#n,t),this.#r.has("a")&&n(this.#n,-t),this.#r.has("r")&&n(this.#a,t),this.#r.has("f")&&n(this.#a,-t),this.#r.has("q")&&o(Ri*e),this.#r.has("e")&&o(-Ri*e),i}#f(e){if(!Er(this.#t,this.#c,this.#p,this.#u,e))return!1;let t=this.#u;return t.rotX&&this.#i.rotate(L.Y,-t.rotX),t.rotY&&this.#i.rotate(L.X,-t.rotY),t.zoom&&this.#e.position.addScaled(this.#s,t.zoom*En),!0}#m(){this.#l?.clampPoint(this.#e.position),this.#i.normalize(),this.#n.copy(L.X).transformQuat(this.#i),this.#a.copy(L.Y).transformQuat(this.#i),this.#o.copy(L.Z).transformQuat(this.#i),this.#s.copy(this.#o).scale(-1),this.#e.setAxes(this.#n,this.#a,this.#o)}#g=e=>{let t=e.key.toLowerCase();!Rn.has(t)||this.#y()||(this.#r.add(t),e.preventDefault())};#b=e=>{this.#r.delete(e.key.toLowerCase())};#y(){let e=document.activeElement;return e?.tagName==="INPUT"||e?.tagName==="TEXTAREA"||e?.isContentEditable}},Mr=class{#e;#t;#r=P.create();#i=P.create();#s=P.create().copy(L.Y);#o=P.create();#n=P.create();#a=P.create();#h=P.create();#l=P.create();#c=P.create();#p=$.create();#u=null;#d=te();#f=te();#m=te();constructor(e,t){this.#e=e,this.#t=new pt(t)}get type(){return"trackball"}update(e){if(!Er(this.#t,this.#d,this.#f,this.#m,e))return;let t=this.#m;(t.rotX||t.rotY)&&this.#b(t.rotX,t.rotY),t.zoom&&this.#y(t.zoom),(t.panX||t.panY)&&this.#x(t.panX,t.panY),this.#v()}frame(e,t){this.#w(e,t)}reset(e,t){this.#w(e,t)}zoom(e){e>0&&(this.#f.zoom+=Math.log(e))}setBounds(e){this.#u=e,this.#v()}applyConstraints(e){}dispose(){this.#t.dispose()}#g(){this.#o.copy(this.#i).normalize(L.Z),this.#n.cross(this.#s,this.#o).normalize(L.X),this.#a.cross(this.#o,this.#n)}#b(e,t){this.#g(),this.#h.copy(this.#n).scale(e).addScaled(this.#a,-t);let r=this.#h.len;r<1e-6||(this.#l.cross(this.#h,this.#i).normalize(L.Y),this.#p.setAxisAngle(this.#l,r),this.#i.transformQuat(this.#p),this.#s.transformQuat(this.#p).normalize())}#y(e){this.#i.setLength(_.clamp(this.#i.len*Math.exp(-e),Gt,zt))}#x(e,t){this.#g();let r=_.perspectiveScale(this.#i.len,this.#e.fov,this.#t.height)*ki;this.#r.addScaled(this.#n,-e*r).addScaled(this.#a,t*r)}#v(){if(this.#u){this.#u.clampPoint(this.#r);let e=this.#i.len,t=this.#u.rayLimit(this.#r,this.#o.copy(this.#i).normalize(L.Z),e);t<e&&this.#i.scale(t/e)}this.#e.up.copy(this.#s),this.#e.position.copy(this.#r).add(this.#i),this.#e.lookAt(this.#r)}#w(e,t){this.#r.from(e),this.#i.sub(this.#c.from(t),this.#r),this.#i.setLength(_.clamp(this.#i.len,Gt,zt)),this.#s.copy(L.Y),this.#g(),this.#s.copy(this.#a),this.#f=te(),this.#v()}};function Cr(s,e,t){switch(s){case"fly":return new Pr(e,t);case"trackball":return new Mr(e,t);default:return new Tr(e,t)}}var Lr=class{position=P.create();target=P.create();up=P.create().copy(L.Y);matrixWorld=O.create();projectionMatrix=O.create();fov;aspect;near;far;constructor(e=60,t=1,r=.05,i=1e4){this.fov=e,this.aspect=t,this.near=r,this.far=i,this.updateProjectionMatrix(),this.updateMatrixWorld()}lookAt(e){return this.target.from(e),this.updateMatrixWorld()}updateProjectionMatrix(){this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far)}updateMatrixWorld(){return this.matrixWorld.cameraWorld(this.position,this.target,this.up),this.matrixWorld}setAxes(e,t,r){return this.up.copy(t),this.target.copy(this.position).addScaled(r,-1),this.matrixWorld.cameraWorldAxes(this.position,e,t,r)}},Ai=1.5,Fi=1,Fn=[0,.4,0],Bn=-.25,Ot=class{#e=O.create();#t=P.create();#r=P.create();#i;#s;#o;#n=!1;#a=!1;#h=1;#l=null;#c=null;#p=null;constructor(e,t="orbit"){this.#o=e,this.#i=new Lr,this.#s=Cr(t,this.#i,e),this.#u()}get canPresent(){return this.#n}get controls(){return this.#s}get controlsType(){return this.#s.type}setControls(e){e!==this.#s.type&&(this.#s.dispose(),this.#s=Cr(e,this.#i,this.#o),this.reset(),this.#s.setBounds(this.#l),this.#s.applyConstraints(this.#a))}setSceneTransform(e){e?this.#e.fromTransform(e):this.#e.identity(),this.#a=!!e,this.#s.applyConstraints(this.#a),this.#n=!1}setAudioPosition(e){e?this.#t.fromXYZ(e):this.#t.set(0,0,0)}setViewZSign(e){this.#h=e<0?-1:1,this.#n=!1}setBBox(e){if(!e)return;this.#e.pointTo(this.#r,Lt.center(this.#r,e)).addXYZ(0,Bn);let t=this.#r.toArray(),r=[0,Ai,Fi*this.#h];this.#c=t,this.#p=r,this.#s.frame(t,r),this.#n=!0}setCameraBounds(e){this.#l=e?new lt(e):null,this.#s.setBounds(this.#l)}update(e){this.#s.update(e)}apply(e,t,r){e.setModelMatrix(this.#e),t>0&&r>0&&(this.#i.aspect=t/r,this.#i.updateProjectionMatrix()),e.setCamera(this.#i.matrixWorld,this.#i.projectionMatrix),this.#n&&(e.setAudioSourceMatrix(this.#e,this.#t),e.setAudioListenerMatrix(this.#i.matrixWorld))}zoom(e){this.#s.zoom(e)}reset(){this.#c&&this.#p?(this.#s.frame(this.#c,this.#p),this.#n=!0):this.#u()}dispose(){this.#s.dispose()}#u(){this.#s.reset(Fn,{x:0,y:Ai,z:Fi}),this.#n=!1}};var Nt=class{#e;#t;#r;#i;#s;#o=null;#n=null;#a;#h;#l;#c;#p;#u=null;#d=!1;#f=!1;#m=!1;#g=null;#b=0;onFrame=null;onBeforeRender=null;onEyeRender=null;onASWRender=null;onViewsRender=null;onRefReset=null;onSessionEnd=null;externalLayers=[];constructor(e,t,{backend:r="webgl",ensureGL:i=null}={}){this.#e=e,this.#t=t,this.#a="XRGPUBinding"in globalThis?r:"webgl",this.#h=i}get session(){return this.#r}get active(){return!!this.#r}get aswAvailable(){return!!this.onASWRender}get aswActive(){return this.#d&&!!this.#r}get layeredActive(){return this.#f&&!!this.#r}get isAR(){return this.#m&&!!this.#r}get defaultDt(){return 1/(this.#d?36:72)}get binding(){return this.#s}get api(){return this.#r?this.#o?"webgpu":"webgl":null}get gpu(){return this.#o?{device:this.#e.device,format:this.#n}:null}get refSpace(){return this.#i}set soundPosition(e){this.#g=e?[e.x,e.y,e.z]:null}async enter(e=!1){if(!navigator.xr||this.#r)return{isQuest:!1,isPico:!1,isAVP:!1};let t=this.#e;this.#m=e;let r=navigator.userAgent,i=/PicoBrowser/i.test(r),n=/OculusBrowser/i.test(r)&&!i,o=/Version\//.test(r)&&/Safari\//.test(r)&&!n&&!i;if(this.#r=await navigator.xr.requestSession(e?"immersive-ar":"immersive-vr",{...this.#a==="webgpu"&&{requiredFeatures:["webgpu"]},optionalFeatures:[this.#a==="auto"&&"webgpu","local-floor",e&&"local",n&&"layers",n&&"space-warp",(n||i)&&"hand-tracking"].filter(Boolean)}),!this.#r)throw new Error(`Failed to start ${e?"AR":"VR"} session`);let a=new Set(this.#r.enabledFeatures??[]);for(let p of["local-floor","local","viewer"])try{this.#i=await this.#r.requestReferenceSpace(p);break}catch{}this.#i?.addEventListener("reset",()=>this.onRefReset?.()),this.#f=this.#d=!1;let l=i?.75:1,h={isQuest:n,isPico:i,isAVP:o};if(a.has("webgpu"))return this.#y(a,l,h);let c=this.#t??=this.#h?.()??null;if(!c)throw new Error("WebGL context required for this XR session");if(this.#u=c.getExtension("OCULUS_multiview")||c.getExtension("OVR_multiview2")||null,a.has("layers"))try{c.getExtension("EXT_color_buffer_half_float"),this.#s=new XRWebGLBinding(this.#r,c),this.#l=this.#s.createProjectionLayer({textureType:"texture-array",depthFormat:c.DEPTH_COMPONENT24,scaleFactor:l,clearOnAccess:!1}),this.#f=!0,this.#d=a.has("space-warp"),!this.#d&&this.#l.fixedFoveation!==void 0&&(this.#l.fixedFoveation=1),await this.#r.updateRenderState({layers:[this.#l]}),this.#c=c.createFramebuffer(),this.#d&&(this.#p=c.createFramebuffer())}catch{this.#f=this.#d=!1,this.#s=this.#l=null}if(!this.#f){let p=new XRWebGLLayer(this.#r,c,{framebufferScaleFactor:l,...e&&{alpha:!0}});p.fixedFoveation!==void 0&&(p.fixedFoveation=1),await this.#r.updateRenderState({baseLayer:p})}return t.resetXR(),this.#x(),h}async#y(e,t,r){return this.#o=new XRGPUBinding(this.#r,this.#e.device),this.#n=this.#o.getPreferredColorFormat(),this.#d=e.has("space-warp"),this.#l=this.#o.createProjectionLayer({colorFormat:this.#n,...this.#d&&{depthStencilFormat:"depth24plus"},scaleFactor:t}),!this.#d&&this.#l.fixedFoveation!==void 0&&(this.#l.fixedFoveation=1),this.#f=!0,await this.#r.updateRenderState({layers:[this.#l]}),this.#x(),r}#x(){this.#r.addEventListener("end",()=>this.#S()),this.#b=0,this.#r.requestAnimationFrame(this.#v)}#v=(e,t)=>{let r=this.#r;if(!r)return;r.requestAnimationFrame(this.#v);let i=_.deltaSeconds(e,this.#b,this.defaultDt,4*this.defaultDt);this.#b=e,this.onFrame?.(i,t)};exit(){this.#r?.end()}renderFrame(e,t,r=1){let i=this.#e,n=this.#t,o=t.getViewerPose(this.#i);if(!o||o.views.length<1)return;let a=this.#P(o);if(!this.#m&&a.length<2){this.#w(i,o,r);return}if((a.length>=2||this.#m)&&(this.onBeforeRender?.(e,t,this.#i,o,t.session.inputSources,i),this.#T()),this.#o){this.#E(i,a),this.#w(i,o,r);return}let l=a[1]??null;i.setCamera(a[0].transform.matrix,a[0].projectionMatrix,l?.transform.matrix,l?.projectionMatrix),this.#d?this.#k(n,i,a):this.#f?this.#L(n,i,a):this.#R(n,i,a,t),this.#w(i,o,r)}#w(e,t,r){let i=this.#g;if(!i){let o=e.getBBox();o&&(i=[(o.minX+o.maxX)*.5,(o.minY+o.maxY)*.5,(o.minZ+o.maxZ)*.5])}let n=e.getModelMatrix();i&&n&&e.setAudioSourceMatrix(n,i,r),e.setAudioListenerMatrix(t.transform.matrix)}#T(){!this.#r||!this.#f||this.#r.updateRenderState({layers:[this.#l,...this.externalLayers]})}#S=()=>{if(!this.#r)return;let e=this.#t;this.#o=null,this.#c&&(e.deleteFramebuffer(this.#c),this.#c=null),this.#p&&(e.deleteFramebuffer(this.#p),this.#p=null),this.#r=this.#i=this.#l=this.#s=null,this.#d=this.#f=this.#m=!1,this.#b=0,this.externalLayers=[],this.onSessionEnd?.()};#P(e){if(e.views.length<2)return[e.views[0]];let t=e.views.find(i=>i.eye==="left")||e.views[0],r=e.views.find(i=>i.eye==="right")||e.views[1];return[t,r]}#E(e,t){this.#d&&(this.#l.deltaPose=null);let r=t.map(i=>{let n=this.#o.getViewSubImage(this.#l,i),o=n.getViewDescriptor().baseArrayLayer??0,a=this.#_(n,o);return{view:i,texture:n.colorTexture,layer:o,viewport:n.viewport,motion:a}});e.renderXR({views:r.map(({view:i,texture:n,layer:o,viewport:a,motion:l})=>({pose:i.transform.matrix,projection:i.projectionMatrix,color:n,colorLayer:o,viewport:a,motion:l})),clear:[0,0,0,this.#m?0:1]}),this.onViewsRender?.(r)}#_(e,t){let r=e.motionVectorTexture;if(!r)return;let i=r.width/e.colorTexture.width,{x:n,y:o,width:a,height:l}=e.viewport;return{texture:r,layer:t,depth:e.depthStencilTexture,depthLayer:t,viewport:{x:n*i,y:o*i,width:a*i,height:l*i}}}#M(e,t){e.bindFramebuffer(e.FRAMEBUFFER,t),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.clearColor(0,0,0,this.#m?0:1)}#C(e,t,r,i,n,o,a,l,h,c=e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT){e.viewport(n,o,a,l),e.clear(c),t.render(t.drawMode,n,o,a,l,h),this.onEyeRender?.(e,r,i,n,o,a,l)}#R(e,t,r,i){let n=i.session.renderState.baseLayer,o=r.map(a=>n.getViewport(a));t.preprocess(o[0].width,o[0].height),e.bindFramebuffer(e.FRAMEBUFFER,n.framebuffer),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.clearColor(0,0,0,this.#m?0:1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.disable(e.DEPTH_TEST),e.depthMask(!1);for(let a=0;a<r.length;a++){let l=o[a];t.render(t.drawMode,l.x,l.y,l.width,l.height,a),this.onEyeRender?.(e,n.framebuffer,r[a],l.x,l.y,l.width,l.height)}}#L(e,t,r){let i=r.map(a=>this.#s.getViewSubImage(this.#l,a)),n=i[0].colorTextureWidth,o=i[0].colorTextureHeight;t.preprocess(n,o),this.#M(e,this.#c);for(let a=0;a<r.length;a++){let l=i[a],h=l.imageIndex??a;e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.colorTexture,0,h),l.depthStencilTexture&&e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,h),this.#C(e,t,this.#c,r[a],0,0,n,o,a)}e.bindFramebuffer(e.FRAMEBUFFER,null)}#k(e,t,r){let i=r.map(c=>this.#s.getViewSubImage(this.#l,c)),n=i[0].colorTextureWidth,o=i[0].colorTextureHeight,a=i.map((c,p)=>c.imageIndex??p);this.#l&&(this.#l.deltaPose=null),t.preprocess(n,o),this.#M(e,this.#c);for(let c=0;c<r.length;c++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[c].colorTexture,0,a[c]),this.#C(e,t,this.#c,r[c],0,0,n,o,c,e.COLOR_BUFFER_BIT);let l=i[0];if(l.motionVectorTexture&&l.depthStencilTexture){let c=l.motionVectorTextureWidth,p=l.motionVectorTextureHeight,u=t.canMotion();if(e.bindFramebuffer(e.FRAMEBUFFER,this.#p),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),e.clearColor(0,0,0,0),e.clearDepth(1),this.#u&&a.length>=2&&a[1]===a[0]+1&&t.hasMultiview())this.#u.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.motionVectorTexture,0,a[0],2),this.#u.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,a[0],2),e.viewport(0,0,c,p),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),u&&t.renderMotionMV(0,0,c,p);else for(let f=0;f<r.length;f++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[f].motionVectorTexture,0,a[f]),e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,i[f].depthStencilTexture,0,a[f]),e.viewport(0,0,c,p),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),u&&t.render(3,0,0,c,p,f);let d=(f,m,g)=>({view:f,colorTex:m.colorTexture,colorIdx:g,mvTex:m.motionVectorTexture,mvIdx:g,depthTex:l.depthStencilTexture,w:n,h:o,mvW:c,mvH:p});this.onASWRender?.(e,r.map((f,m)=>d(f,i[m],a[m])))}else this.onASWRender?.(e,r.map((c,p)=>({view:c,colorTex:i[p].colorTexture,colorIdx:a[p],w:n,h:o})));e.bindFramebuffer(e.FRAMEBUFFER,null)}};var Gi=O.create().fromScaling(L.FLIP_Z),In=O.create().fromScaling(L.FLIP_X),Gn=s=>s<0?In:Gi,Bi=O.create().copy(Gi).multiply(O.create().fromTranslation([0,1,-1])),zn=.04,ye=P.create(),ut=P.create(),Ii=P.create(),Xt=class{#e=P.create();#t=$.create();#r=1;#i=P.create();#s=O.clone(Bi);#o=O.create();#n="none";#a=P.create();#h={mid:P.create(),dist:0,axX:0,axZ:0};#l="undecided";#c=0;#p=0;#u=!1;#d=!1;#f=!1;get position(){return this.#e}get scale(){return this.#r}get sceneTransform(){return this.#s}get scaleLocked(){return this.#u}set scaleLocked(e){this.#u=!!e}setCenter(e,t,r){this.#i.set(e,t,r)}setSceneTransform(e,t=1){e?this.#s.fromTransform(e).preMultiply(Gn(t)):this.#s.copy(Bi)}resetToInitial(){this.#e.set(0,0,0),this.#r=1,this.#t.identity()}reset(){this.#n="none"}isHeld(e){return this.#n==="dual"||this.#n===e}update(e,t,r,i,n=!0){for(let p of r)this.#b(p,i);let o=e.gripTransform?.position,a=t.gripTransform?.position,l=n&&e.active&&e.gripping&&!!o,h=n&&t.active&&t.gripping&&!!a,c=l&&e.grabRestart||h&&t.grabRestart;l&&h?this.#g(o,a,c):l?this.#m("left",o,c):h?this.#m("right",a,c):this.reset()}buildModelMatrix(){return ye.copy(this.#i).transformMat4(this.#s),ut.set(this.#r,this.#r,-this.#r),this.#o.fromPivot(this.#e,this.#t,ut,ye,this.#s)}#m(e,t,r){if(r||this.#n!==e){this.#n=e,this.#a.fromXYZ(t);return}if(ye.fromXYZ(t).sub(this.#a),ye.sqrLen>.01){this.#a.fromXYZ(t);return}this.#e.add(ye),this.#a.fromXYZ(t)}#g(e,t,r){ye.midXYZ(e,t);let i=ut.fromXYZ(e).distanceXYZ(t),n=i||1,o=(t.x-e.x)/n,a=(t.z-e.z)/n,l=this.#h;if(r||this.#n!=="dual"){this.#n="dual",l.mid.copy(ye),l.dist=i,l.axX=o,l.axZ=a,this.#l="undecided",this.#c=0,this.#p=0;return}let h=0;l.dist>.03&&i>.03&&(h=_.absLogRatio(i,l.dist));let c=l.axX,p=l.axZ;l.axX=o,l.axZ=a;let u=_.unlerp01(Math.min(Math.hypot(c,p),Math.hypot(o,a)),.08,.33),d=0;if(u>0&&(d=_.wrapPi(Math.atan2(a,o)-Math.atan2(p,c))*u),this.#l==="undecided"){this.#c+=h,this.#p+=Math.abs(d);let f=zn;(this.#c>=f||this.#p>=f)&&(this.#l=this.#c>=this.#p?"scale":"rotate")}if(this.#l==="scale"&&!this.#u&&l.dist>.03&&i>.03){let f=this.#r;this.#r=_.clamp(f*(i/l.dist),.01,100);let m=this.#r-f;ut.copy(this.#i).transformMat4(this.#s),this.#e.add(Ii.copy(ut).multiplyXYZ(-m,-m,m))}this.#l==="rotate"&&_.outside(d,5e-4)&&this.#t.rotatePre(L.Y,d),this.#e.add(Ii.sub(ye,l.mid)),l.mid.copy(ye),l.dist=i}#b(e,t){let r=e.gamepad;if(!r?.axes||r.axes.length<2)return;if(e.handedness==="right"){let o=3.5*t,a=r.axes.length>=4?2:0,l=_.deadzone(r.axes[a],.15),h=_.deadzone(r.axes[a+1],.15);l&&this.#t.rotatePre(L.Z,-l*o),h&&this.#t.rotatePre(L.X,h*o)}let i=r.buttons?.[3]?.pressed??!1;e.handedness==="left"?(i&&!this.#d&&this.resetToInitial(),this.#d=i):(i&&!this.#f&&this.resetToInitial(),this.#f=i)}};var Dt=class{on=!1;#e=-1;update(e){this.#e<0?this.#e=e:this.#e=e>this.#e?e:(this.#e+e)*.5,this.on=this.#e<(this.on?.018:.015)}reset(){this.on=!1,this.#e=-1}},Ut=class s{static#e=30;static#t=300;static#r=.02;#i=P.create();#s=!1;#o=0;#n=null;tapped=!1;update(e,t){if(this.tapped=!1,e&&!this.#s)this.#o=performance.now(),this.#n=t?{x:t.x,y:t.y,z:t.z}:null;else if(!e&&this.#s){let r=performance.now()-this.#o,i=this.#n,n=i&&t?this.#i.fromXYZ(t).distanceXYZ(i):0;r>=s.#e&&r<=s.#t&&n<s.#r&&(this.tapped=!0)}this.#s=e}reset(){this.#s=!1,this.tapped=!1,this.#n=null}},Vt=class s{static#e=30;static#t=300;#r=!1;#i=0;tapped=!1;update(e){if(this.tapped=!1,e&&!this.#r)this.#i=performance.now(),this.#r=!0;else if(!e&&this.#r){let t=performance.now()-this.#i;t>=s.#e&&t<=s.#t&&(this.tapped=!0),this.#r=!1}}reset(){this.#r=!1,this.tapped=!1}},Ht=class{#e=[!1,!1];update(e){if(!e||e.length<=6)return 0;let t=e[5]?.pressed??!1,r=e[6]?.pressed??!1,i=t&&!this.#e[0]?-1:r&&!this.#e[1]?1:0;return this.#e[0]=t,this.#e[1]=r,i}reset(){this.#e[0]=this.#e[1]=!1}},Wt=class{#e;left={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};right={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};stickSrcs=[];#t=null;#r=null;#i;#s;#o;#n;#a=new Vt;#h=new Vt;constructor({directGrab:e=!1}={}){this.#n=e,this.#e=$.create().setAxisAngle(L.X,-.8),this.#s=P.create(),this.#o=$.create(),this.#i=new Map([[this.left,{side:"left",pinch:new Dt,tap:new Ut,swipe:new Ht,smooth:P.create(),smoothActive:!1,rayPos:P.create(),rayOri:$.create(),rayActive:!1}],[this.right,{side:"right",pinch:new Dt,tap:new Ut,swipe:new Ht,smooth:P.create(),smoothActive:!1,rayPos:P.create(),rayOri:$.create(),rayActive:!1}]])}#l(e){e.active=e.gripping=e.isHandProfile=e.grabRestart=e.triggerPressed=e.menuPressed=e.isTransientPointer=!1,e.microSwipe=0,e.rayTransform=e.gripTransform=e.indexTip=e.thumbTip=null}read(e,t,r,i){this.#l(this.left),this.#l(this.right),this.stickSrcs.length=0;let n=null,o=null;for(let a of r||[]){if(a.targetRayMode==="transient-pointer"){let h=e.getPose(a.targetRaySpace,t);if(!h)continue;let p=((a.gripSpace?e.getPose(a.gripSpace,t):null)??h).transform,u=this.#c(a,p.position,n,o);this.#p(u,h.transform,p,a,i),u===this.left?n=a:o=a;continue}a.gripSpace&&!a.hand&&a.gamepad?.axes?.length>=2&&!a.profiles?.some(h=>h.includes("hand"))&&this.stickSrcs.push(a);let l=a.handedness==="left"?this.left:a.handedness==="right"?this.right:null;!l||l.active||(a.hand?this.#u(l,a,e,t,i):a.gripSpace&&this.#d(l,a,e,t,i))}this.#t=n,this.#r=o,(n||o)&&(this.stickSrcs.length=0,n||(this.left.gripping=!1),o||(this.right.gripping=!1)),i.uiActive?(this.#a.reset(),this.#h.reset()):(this.#a.update(!!n),this.#h.update(!!o)),this.#a.tapped&&(this.left.menuPressed=!0),this.#h.tapped&&(this.right.menuPressed=!0);for(let[a,l]of this.#i)a.indexTip||(l.pinch.reset(),l.tap.reset(),l.swipe.reset(),l.smoothActive=!1,l.rayActive=!1)}#c(e,t,r,i){if(e.handedness==="left")return this.left;if(e.handedness==="right")return this.right;if(r&&!i)return this.right;if(i&&!r)return this.left;let n=this.left.gripTransform?.position,o=this.right.gripTransform?.position,a=n?this.#s.fromXYZ(t).distanceXYZ(n):1/0,l=o?this.#s.fromXYZ(t).distanceXYZ(o):1/0;return a<=l?this.left:this.right}#p(e,t,r,i,{isHeld:n,hitTest:o,uiActive:a}){e.rayTransform=t,e.gripTransform=r,e.active=e.triggerPressed=e.isTransientPointer=!0;let{side:l}=this.#i.get(e),h=l==="left"?this.#t:this.#r,c=h!=null&&h!==i,p=h===i;!c&&n(l)?e.gripping=!0:a||(this.#n&&p||!this.#n&&o&&o(t)||n(l==="left"?"right":"left"))&&(e.gripping=!0,c&&(e.grabRestart=!0))}#u(e,t,r,i,{isHeld:n,uiActive:o,viewerPose:a}){let l=t.hand.get("wrist");if(!l)return;let h=r.getJointPose?.(l,i);if(!h)return;e.gripTransform=h.transform;let c=this.#f(t.hand,"index-finger-tip",r,i),p=this.#f(t.hand,"thumb-tip",r,i),u=this.#f(t.hand,"index-finger-phalanx-proximal",r,i);c&&(e.indexTip=c.transform.position),p&&(e.thumbTip=p.transform.position);let d=this.#i.get(e);if(u){this.#o.fromXYZW(h.transform.orientation).mul(this.#e);let m=d.rayPos,g=d.rayOri;d.rayActive?(m.lerp(this.#s.fromXYZ(u.transform.position),.5),g.slerp(this.#o,.5)):(m.fromXYZ(u.transform.position),g.copy(this.#o),d.rayActive=!0),e.rayTransform={position:m.toXYZ(),orientation:g.toXYZW()}}else e.rayTransform=c?.transform??null,d.rayActive=!1;if(c&&p){let m=c.transform.position,g=p.transform.position;d.pinch.update(this.#s.fromXYZ(m).distanceXYZ(g)),e.gripping=e.triggerPressed=d.pinch.on}else{d.pinch.reset();let m=t.gamepad?.buttons?.[0];e.gripping=m?m.pressed||m.value>.5:!1,e.triggerPressed=e.gripping}o?(d.tap.reset(),n(d.side)||(e.gripping=!1)):(d.tap.update(d.pinch.on,h.transform.position),d.tap.tapped&&(e.menuPressed=!0)),e.gripping&&!n(d.side)&&!this.#g(h.transform.position,a)&&(e.gripping=!1),e.active=!0,e.microSwipe=d.swipe.update(t.gamepad?.buttons);let f=d.smooth;d.smoothActive||(f.fromXYZ(h.transform.position),d.smoothActive=!0),f.lerp(this.#s.fromXYZ(h.transform.position),.4),e.gripTransform={position:f.toXYZ(),orientation:h.transform.orientation}}#d(e,t,r,i,{isHeld:n,uiActive:o,viewerPose:a}){let l=r.getPose(t.gripSpace,i);l&&(e.gripTransform=l.transform);let h=r.getPose(t.targetRaySpace,i);if(h&&(e.rayTransform=h.transform),!e.gripTransform&&!e.rayTransform)return;if(e.isHandProfile=t.profiles?.some(u=>u.includes("hand"))??!1,t.targetRayMode==="tracked-pointer"&&t.gamepad?.buttons?.[0]){let u=t.gamepad.buttons[0],d=u.pressed||u.value>.5;e.gripping=e.isHandProfile?d:t.gamepad?.buttons?.[1]?.pressed??!1}else e.gripping=t.gamepad?.buttons?.[1]?.pressed??!1;e.triggerPressed=t.gamepad?.buttons?.[0]?.pressed??!1;let c=t.gamepad?.buttons;e.menuPressed=!!(c?.[4]?.pressed||c?.[5]?.pressed);let{side:p}=this.#i.get(e);e.isHandProfile&&e.gripping&&!n(p)&&(o||!this.#g(e.gripTransform?.position,a))&&(e.gripping=!1),e.gripping&&!e.gripTransform&&(e.gripping=!1),e.active=!0,e.isHandProfile&&e.rayTransform&&(e.rayTransform=this.#m(e.rayTransform.orientation,e.rayTransform.position))}#f(e,t,r,i){let n=e.get(t);return n?r.getJointPose?.(n,i)??null:null}#m(e,t){return this.#o.fromXYZW(e).mul(this.#e),{position:t,orientation:this.#o.toXYZW()}}#g(e,t){if(!t||!e)return!0;let r=t.position;this.#s.subXYZ(e,r).transformQuat(this.#o.fromXYZW(t.orientation).invert());let i=this.#s.xzLen;return i<.05||this.#s.y>-1.19*i}};var De=class{#e;#t;#r;#i;#s=!0;#o=!1;#n=!1;#a=!1;#h=!1;constructor(e,t=null,{directGrab:r=!1}={}){this.#e=e,this.#t=t,this.#r=new Wt({directGrab:r}),this.#i=new Xt}setOverlay(e){this.#t=e,this.#s=!0}get#l(){return this.#t?this.#t.hasBBox:this.#o}reset(){this.#i.reset(),this.#a=this.#h=!1}invalidateBBox(){this.#s=!0}setInitialTransform(e,t=1){this.#i.setSceneTransform(e,t),this.#s=!0,this.#c()}get scene(){return this.#t?.scene??null}get scale(){return this.#i.scale}get leftHand(){return this.#r.left}get rightHand(){return this.#r.right}get locked(){return this.#n}set locked(e){this.#n=!!e,this.#n&&this.#i.reset()}get scaleLocked(){return this.#i.scaleLocked}set scaleLocked(e){this.#i.scaleLocked=e}resetToInitial(){this.#i.resetToInitial(),this.#i.reset()}update(e,t,r,i,n,o=!1){let a=t.getViewerPose(r);this.#r.read(t,r,i,{isHeld:c=>this.#i.isHeld(c),hitTest:c=>this.#t?.hitTest(c)??!1,uiActive:n,viewerPose:a?.transform??null}),(this.#s||!this.#l)&&this.#p();let l=this.#r.left,h=this.#r.right;if(l.held=h.held=!1,!this.#n){this.#i.update(l,h,this.#r.stickSrcs,e,this.#l&&!o);let c=this.#i.isHeld("left"),p=this.#i.isHeld("right");l.held=c&&this.#a,h.held=p&&this.#h,this.#a=c,this.#h=p}this.#c()}#c(){this.#l&&this.#t?.applyTransform(this.#i.position,this.#i.scale),this.#e.setModelMatrix?.(this.#i.buildModelMatrix())}#p(){let e=this.#e.getBBox?.();if(!e)return;let t,r,i;this.#t?{cx:t,cy:r,cz:i}=this.#t.rebuildBBox(e,this.#i.sceneTransform):(t=(e.minX+e.maxX)/2,r=(e.minY+e.maxY)/2,i=(e.minZ+e.maxZ)/2,this.#o=!0),this.#i.setCenter(t,r,i),this.#s=!1}};var zi=s=>s?.staticUrl||s?.staticTransform?-1:1;function Oi(){let s=document.createElement("canvas");return s.style.display="block",s.style.width="100%",s.style.height="100%",s.style.touchAction="none",s}var Ue=class s{#e=null;#t;#r=null;#i=null;#s=null;#o=null;#n=0;#a=0;#h=null;#l=!1;#c=!1;#p=0;#u="pw";#d="pw";#f=null;#m=!1;#g={};#b="auto";#y=!1;#x=null;#v=1;#w=null;#T=null;#S=null;#P=0;#E=!1;#_=[];#M=-1;onProgress=null;onReady=null;onError=null;onFrame=null;onBeforeFrame=null;onModeChange=null;onSceneChange=null;onSceneEnd=null;static async create(e,{container:t,overlay:r=null,mode:i="pw",xrBackend:n="auto"}={}){if(!t)throw new Error("container element required");if(!navigator.gpu)throw new Error("WebGPU not available");let o=new s;o.#h=r,r&&(r.onSceneChange=(h,c)=>o.loadScene(c));let a=await s.probeXR();o.#g={vr:a.vr,ar:a.ar},o.#y=n!=="webgl"&&a.webgpu,o.setXRBackend(n);let l=i==="hw"?"hw":i==="vr"||i==="ar"?i:"pw";return o.#t=Oi(),t.appendChild(o.#t),o.#e=await Xe.create(e,{canvas:o.#t,backend:o.#W(l),xrCompatible:o.#y}),o.#q(),await o.#L(l),o.#u=l,o}static async probeXR(){let e=t=>navigator.xr?.isSessionSupported(t).then(Boolean,()=>!1)??!1;return{vr:await e("immersive-vr"),ar:await e("immersive-ar"),webgpu:!!navigator.gpu&&"XRGPUBinding"in globalThis}}get player(){return this.#e}get camera(){return this.#i}get canvas(){return this.#t}get gl(){return this.#e?.gl??null}get audioContext(){return this.#e?.audioContext??null}get device(){return this.#e?.device??null}get mode(){return this.#u}get fallbackMode(){return this.#d}get xr(){return this.#s}get manipulator(){return this.#o}get drawMode(){return this.#e.drawMode}set drawMode(e){this.#e.drawMode=e}get xrBackend(){return this.#s?.api??(this.#N?"webgpu":"webgl")}setXRBackend(e){if(!["auto","webgl","webgpu"].includes(e))throw new Error(`Unknown xrBackend: ${e}`);this.#b=e}supports(e){return e==="pw"||e==="hw"?!0:!!this.#g[e]&&(this.#b!=="webgpu"||this.#y)}set sources(e){this.#_=e??[],this.#M=Math.min(this.#M,Math.max(0,this.#_.length-1)),this.#h&&(this.#h.sources=this.#_)}get sources(){return this.#_}get sceneIndex(){return this.#M}loadScene(e){let t=this.#_;if(e<0||e>=t.length)return;let r=t[e];this.#M=e,this.#w=null,this.#v=zi(r),this.setInitialTransform(r.initialTransform??null),this.setBackground(r.background??"#000"),r.controls&&this.setControls(r.controls),this.setCameraBounds(r.cameraBounds??null),this.#o&&(this.#o.locked=r.locked??this.#o.locked,this.#o.scaleLocked=r.scaleLocked??this.#o.scaleLocked);let i=r.staticTransform??null,n=r.staticUrl??null;this.#H(async o=>{if(n){let a=new File([await(await fetch(n)).arrayBuffer()],"static.sog");if(!o()||(await this.#e.open({file:a,type:"static"}),!o()))return}await this.#e.open(r),o()&&i&&this.#R(i)}),this.setAudioPosition(r.audioPosition??null),this.#h&&(this.#h.sceneIndex=e),this.onSceneChange?.(r,e)}start(){this.#l=!0,this.#I()}stop(){this.#l=!1,this.#F()}open(e){return this.#v=zi(e),this.setInitialTransform(e.initialTransform??null),this.setAudioPosition(e.audioPosition??null),this.#H(()=>this.#e.open(e))}close(){++this.#p,this.#A(),this.#e.close(),this.#c=!1,this.#l=!1;let e=this.#u,t=this.#d,r=t!=="pw"?"hybrid":"pure";r!==this.#e.backend&&this.#X(r),this.#k(),this.#u=t,t!==e&&this.onModeChange?.(t,e)}async setMode(e){if(this.#f=e,!this.#m){this.#m=!0;do e=this.#f,this.#f=null,e!==this.#u&&await this.#C(e);while(this.#f!=null);this.#m=!1}}async#C(e){let t=this.#u;await this.#O();try{await this.#G(e)}catch(r){if(e===this.#d)throw r;this.onError?.(r),await this.#G(this.#d)}this.#u!==t&&this.onModeChange?.(this.#u,t)}setAudio(e){this.#e.loadAudio(e)}setVolume(e){this.#e?.setVolume(e)}enableAudio(){this.#e?.enableAudio()}disableAudio(){this.#e?.disableAudio()}get audioEnabled(){return this.#e?.audioEnabled??!1}setAudioPanner(e){this.#e?.setAudioPanner(e)}setBackground(e){this.#t&&(this.#t.style.background=e||"#000")}setInitialTransform(e,t=null){this.#x=e??null,this.#i?.setSceneTransform(this.#x),this.#i?.setViewZSign(this.#v),this.#o&&(this.#o.setInitialTransform(this.#x,this.#v),!this.#c&&this.#_[this.#M]?.resetPositionOnStart!==!1&&this.#o.resetToInitial()),t?.translation&&t.rotation&&t.scale&&this.#R(t)}#R(e){this.#e?.setStaticModelMatrix(O.create().fromTransform(e))}reset(){this.#i?.reset()}setControls(e){this.#i?.setControls(e)}setCameraBounds(e){this.#T=e??null,this.#i?.setCameraBounds(this.#T)}setAudioPosition(e){this.#S=e??null,this.#i?.setAudioPosition(this.#S),this.#s&&(this.#s.soundPosition=this.#S)}dispose(){++this.#p,this.#A(),this.#r?.disconnect(),this.#e?.dispose()}async#L(e){if(e==="vr"||e==="ar"){if(!this.supports(e))throw new Error(`${e.toUpperCase()} not supported`);await this.#z(e==="ar")}else if(e==="pw"||e==="hw")this.#k();else throw new Error(`Unknown mode: ${e}`)}#k(){let e=new Ot(this.#t);this.#i=e,this.#e.backend==="pure"&&(this.#e.drawMode=0),e.setSceneTransform(this.#x),e.setViewZSign(this.#v),e.setAudioPosition(this.#S),e.setCameraBounds(this.#T),this.#w&&e.setBBox(this.#w)}async#z(e){let t=new Nt(this.#e,this.#e.gl,{backend:this.#N?this.#b:"webgl",ensureGL:()=>(this.#e.backend!=="hybrid"&&this.#X("hybrid"),this.#e.gl)});t.soundPosition=this.#S,t.onSessionEnd=()=>{this.#h?.dispose(),this.#s===t&&(this.#s=null,this.#o=null,this.setMode(this.#d))};let r=null;try{let i=await t.enter(e),n=this.#_[this.#M];r=new De(this.#e,null,{directGrab:i.isAVP}),r.locked=n?.locked??!1,r.scaleLocked=n?.scaleLocked??!0,r.setInitialTransform(this.#x,this.#v);let o=this.#h;o&&(o.manipulator=r,await o.init(this.#e,t.session,t.binding,t.refSpace,this.#e.gl,e,t.gpu),t.onEyeRender=(l,h,c,p,u,d,f)=>o.renderEye(l,h,c,p,u,d,f),t.onASWRender=(l,h)=>o.render(l,h),t.onViewsRender=l=>o.renderViews?.(l),t.onRefReset=()=>o.onRefReset?.());let a=r;t.onBeforeRender=(l,h,c,p,u,d)=>{if(a.update(l,h,c,u,o?.uiActive??!1,o?.uiDragging??!1),o){o.frame(l,h,c,p,u,d);let f=[];for(let m of o.quads??[])m.layer&&(m.visible||m.placing)&&f.push(m.layer);t.externalLayers=f}},t.onFrame=(l,h)=>{if(!this.#U(l))return;let c=a.scale;t.renderFrame(l,h,c!==1?1/c:1),this.#V()}}catch(i){throw this.#B(t),this.#h?.dispose(),t.exit(),i}if(!t.session)throw this.#B(t),new Error("XR session ended during entry");this.#o=r,this.#s=t}#B(e){e.onFrame=null,e.onSessionEnd=null,e.onBeforeRender=null,e.onEyeRender=null,e.onASWRender=null,e.onViewsRender=null,e.onRefReset=null}#A(){this.#F(),this.#i?.dispose(),this.#i=null;let e=this.#s;e&&(this.#s=null,this.#o=null,this.#B(e),this.#h?.dispose(),e.exit())}async#O(){this.#F(),this.#i?.dispose(),this.#i=null;let e=this.#s;if(e){this.#s=null,this.#o=null,e.onFrame=null;try{await e.session?.end()}catch{}}}async#G(e){let t=this.#W(e);t!==this.#e.backend&&this.#X(t),await this.#L(e),(this.#l||this.#c)&&this.#I(),this.#u=e,this.#s||(this.#d=e)}#I(){this.#i&&!this.#n&&(this.#n=requestAnimationFrame(this.#D))}#F(){this.#n&&cancelAnimationFrame(this.#n),this.#n=0,this.#a=0}#D=e=>{this.#n=requestAnimationFrame(this.#D);let t=_.deltaSeconds(e,this.#a,1/60);if(this.#a=e,!this.#U(t))return this.#F();let r=this.#i;if(!r)return this.#F();r.update(t);let{width:i,height:n}=this.#t;r.apply(this.#e,i,n),this.#Y(r.canPresent),this.#e.present(i,n),this.#V()};#U(e){return this.#j(),!this.#l&&!this.#c?!1:(this.onBeforeFrame?.(e),!0)}#V(){this.#c&&this.onProgress?.(Math.round(this.#e.progress*100)),this.#Z(),this.onFrame?.()}async#H(e){let t=++this.#p,r=()=>t===this.#p;this.#F(),this.#e.close(),this.#w=null,this.#Y(!1),this.#c=!0,this.#P=0,this.#E=!1;try{await e(r)}catch(i){if(!r())return;this.#c=!1,this.onError?.(i)}r()&&this.#I()}#Z(){let e=this.#e;if(!e?.isReady)return;let t=e.duration;if(!t||t<=0)return;let r=_.clamp01(e.currentTime/t),i=this.#P;if(this.#P=r,!this.#E&&!e.isBuffering&&i>.95&&r<i){this.#E=!0;let n=this.#_[this.#M];this.onSceneEnd?.(n,this.#M),(n?.autoSwitchToNext??!0)&&this.#M<this.#_.length-1&&this.loadScene(this.#M+1)}}#j(){if(!this.#w&&this.#e.isReady){let t=this.#e.getBBox();t&&(this.#w=t,this.#i?.setBBox(t))}let e=this.#i;if(e&&!e.canPresent&&this.#w&&e.setBBox(this.#w),!!this.#c){if(!this.#e.isReady){let t=this.#e.lastFetchStatus;t&&t!==200&&t!==206&&(this.#c=!1,this.onError?.(t));return}this.#c=!1,this.#e.play(),this.#o&&(this.#_[this.#M]?.resetPositionOnStart!==!1&&this.#o.resetToInitial(),this.#o.invalidateBBox()),this.onProgress?.(100),this.onReady?.()}}get#N(){return this.#y&&this.#b!=="webgl"}#W(e){return e==="hw"?"hybrid":e==="vr"||e==="ar"?this.#N?"pure":"hybrid":"pure"}#Y(e){this.#t.style.visibility=e?"visible":"hidden"}#X(e){this.#r?.disconnect();let t=Oi();this.#t.replaceWith(t),this.#t=t,this.#e?.setBackend(e,{canvas:t}),this.#q()}#q(){this.#r?.disconnect();let e=this.#t;this.#r=new ResizeObserver(([t])=>{if(!t)return;let r=_.clamp(devicePixelRatio||1,1,2),i=Math.round(t.contentRect.width*r),n=Math.round(t.contentRect.height*r);i>0&&n>0&&(e.width!==i||e.height!==n)&&(e.width=i,e.height=n)}),this.#r.observe(e)}};var Yt=class s{#e;#t;#r;#i=null;#s=null;#o=null;#n=null;#a=!1;enableMesh=!1;static attach(e,t,r){let i=new s(e,t,r);return i.#c(),i.#h(),i}constructor(e,t,r){this.#e=e,this.#t=t,this.#r=r}get player(){return this.#e}set camera(e){this.#r=e}get camera(){return this.#r}async setAudio(e){await this.#e.loadAudio(e)}setAudioPanner(e){this.#e.setAudioPanner(e)}set entity(e){if(this.#s?.node?.destroy(),this.#s=null,this.#i=e,!e)return;let t=new this.#t.root.constructor("_SplatShadow",this.#t);t.addComponent("render",{type:"box",castShadows:!0,receiveShadows:!1});let r=t.render.meshInstances[0];r.visible=!1,r.cull=!1,e.addChild(t),this.#s=r}get entity(){return this.#i}dispose(){this.#s?.node?.destroy(),this.#n&&(this.#t.renderer.setMeshInstanceMatrices=this.#n[0],this.#t.graphicsDevice.draw=this.#n[1]),this.#e.close(),this.#e.dispose()}#h(){let{renderer:e,graphicsDevice:t}=this.#t,r=e.setMeshInstanceMatrices,i=t.draw;this.#n=[r,i];let n=this;e.setMeshInstanceMatrices=function(...o){return o[0]===n.#s&&(n.#a=!0),r.apply(this,o)},t.draw=function(...o){let a=n.#a;if(n.#a=!1,a){n.enableMesh&&n.#e.isReady&&n.#l();return}return i.apply(this,o)}}#l(){let e=this.#t.graphicsDevice,t=e.gl,r=t.getParameter(t.VIEWPORT),i=e.scope.resolve("matrix_viewProjection").value;i&&(this.#o||(this.#o=new(this.#i.getWorldTransform()).constructor),this.#o.data.set(i),this.#o.mul(this.#i.getWorldTransform()),this.#e.renderMesh(this.#o.data,r[0],r[1],r[2],r[3]),this.#c())}renderFrame(){let e=this.#t.graphicsDevice,t=e.gl,r=e.width,i=e.height;!r||!i||(this.#i&&this.#e.setModelMatrix(this.#i.getWorldTransform().data),this.#r?.camera&&(this.#e.setCamera(this.#r.getWorldTransform().data,this.#r.camera.projectionMatrix.data),this.#e.setAudioListenerMatrix(this.#r.getWorldTransform().data)),this.#i&&this.#e.setAudioSourceMatrix(this.#i.getWorldTransform().data),this.#e.renderHybridViewport(r,i,{gl:t,enableMesh:this.enableMesh}),this.#c())}#c(){let e=this.#t.graphicsDevice;e.shader=null,e.boundVao=null,e.textureUnit=-1;let t=e.textureUnits;if(t)for(let r=0;r<t.length;r++)t[r][0]=t[r][1]=t[r][2]=null}};async function Rr(s,e,t){let r=`${s.replace(/\/+$/,"")}/${e}`,i=await fetch(r,{headers:{"X-VIEW-TOKEN":t}});if(!i.ok)throw new Error(`Streaming metadata fetch failed: ${i.status} ${i.statusText}`);let n=await i.json();return{metadata:n.metadata??null,audioFileLink:n.audioFileLink??null}}async function Ve(s,e){let t=e.replace(/\/+$/,"");return Promise.all(s.map(async(r,i)=>{let{metadata:n,audioFileLink:o}=await Rr(t,r.streamingId,r.token);return{id:r.streamingId,label:r.label??n?.name??r.streamingId,url:`${t}/${r.streamingId}/`,token:r.token,displayName:n?.name??void 0,audio:o&&n?.withAudio!==!1?o:void 0,initialTransform:n?.initialSpawn??null,locked:!1,scaleLocked:!0,autoSwitchToNext:!0,resetPositionOnStart:r.settings?.resetPositionOnStart}}))}import{useEffect as Xn,useMemo as kr,useReducer as Dn,useRef as Ar}from"react";import{useEffect as On,useMemo as Nn,useState as Ni}from"react";function Xi(s,e){let[t,r]=Ni(!1),[i,n]=Ni(!1);On(()=>{let l=navigator.xr;if(!l||!s)return;let h=async()=>{let[c,p]=await Promise.all([l.isSessionSupported("immersive-vr").catch(()=>!1),l.isSessionSupported("immersive-ar").catch(()=>!1)]);r(c),n(p)};return h(),l.addEventListener("devicechange",h),()=>l.removeEventListener("devicechange",h)},[s]);let o=e==="vr"||e==="ar",a=s?.xrBackend??"webgl";return Nn(()=>({vrSupported:t,arSupported:i,isActive:o,backend:a,setMode:async l=>{await s?.setMode(l)}}),[s,t,i,o,a])}var Ui=new WeakMap;function Vi(s){return Ui.get(s)}var Hi={app:null,overlay:null,isContentReady:!1,isLoading:!1,progress:0,mode:"pw",error:null,isPlaying:!1,isBuffering:!1,currentTime:0,duration:0,controlsType:"orbit",isMuted:!0,volume:1};function Un(s,e){switch(e.type){case"init":return{...s,app:e.app,overlay:e.overlay};case"frame":{let{isPlaying:t,isBuffering:r,currentTime:i,duration:n,isMuted:o}=e,a=n>0?n:s.duration;return s.isPlaying===t&&s.isBuffering===r&&s.currentTime===i&&s.duration===a&&s.isMuted===o?s:{...s,isPlaying:t,isBuffering:r,currentTime:i,duration:a,isMuted:o}}case"progress":return s.progress===e.value?s:{...s,progress:e.value};case"ready":return{...s,isContentReady:!0,isLoading:!1,progress:100};case"mode":return s.mode===e.mode?s:{...s,mode:e.mode};case"error":return{...s,error:e.error,isLoading:!1};case"open":return{...s,error:null,isLoading:!0,progress:0};case"close":return{...s,isLoading:!1,progress:0};case"reset":return{...Hi,mode:s.mode};case"seek":return{...s,currentTime:e.time};case"camera_controls":return s.controlsType===e.controlsType?s:{...s,controlsType:e.controlsType};case"set_volume":return{...s,volume:e.volume}}}var Di=new Set(["vr","ar"]);function qt(s){let{containerRef:e,mode:t="pw",xrBackend:r="auto",overlay:i,moduleUrl:n,moduleFactory:o,onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:p,eventLogger:u}=s,[d,f]=Dn(Un,{...Hi,mode:t}),m=Ar(null),g=Ar(d);g.current=d;let x=Ar({onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:p,eventLogger:u});x.current={onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:p,eventLogger:u},Xn(()=>{let v=e.current;if(!v)return;let k=!1;return(async()=>{try{if(!o&&!n)throw new Error("[gr-react] Either moduleUrl or moduleFactory must be provided");let q=o?await o():await Rt(n);if(k)return;let Y=i??null;Y&&(Y.eventLogger={event:(C,se)=>x.current.eventLogger?.event?.(C,{...se,mode:g.current.mode}),error:(C,se)=>x.current.eventLogger?.error?.(C,{...se,mode:g.current.mode})});let N=await Ue.create(q,{container:v,overlay:Y,mode:t,xrBackend:r});if(k){N.dispose();return}m.current=N,N.onProgress=C=>{f({type:"progress",value:C}),x.current.onProgress?.(C)},N.onReady=()=>{f({type:"ready"}),N.audioEnabled&&N.enableAudio(),x.current.onReady?.()},N.onFrame=()=>{let C=m.current?.player;C&&f({type:"frame",isPlaying:C.isPlaying??!1,isBuffering:C.isBuffering??!1,currentTime:C.currentTime??0,duration:C.duration??0,isMuted:!(C.audioEnabled??!1)})},N.onModeChange=(C,se)=>{f({type:"mode",mode:C}),x.current.onModeChange?.(C,se);let Re=Di.has(se),Ne=Di.has(C);Re&&!Ne&&x.current.onXREnd?.(),!Re&&Ne&&x.current.onXRStart?.()},N.onError=C=>{let[se,Re]=typeof C=="number"?[new Error(`Streaming fetch failed: HTTP ${C}`),"load"]:[C,"xr"];f({type:"error",error:se}),x.current.eventLogger?.error?.(se,{phase:Re,mode:g.current.mode})},N.start(),f({type:"init",app:N,overlay:Y}),f({type:"camera_controls",controlsType:N.camera?.controlsType??"orbit"})}catch(q){let Y=q instanceof Error?q:new Error(String(q));f({type:"error",error:Y}),x.current.eventLogger?.error?.(Y,{phase:"init",mode:g.current.mode})}})(),()=>{k=!0;let q=m.current;q&&(q.stop(),q.dispose()),m.current=null,f({type:"reset"})}},[e,i,t,r,o,n]);let{app:b}=d,E=Xi(b,d.mode),w=kr(()=>({play:()=>b?.player?.play(),pause:()=>b?.player?.pause(),togglePlay:()=>{let v=b?.player;if(!v)return;let k=!v.isPlaying;k?v.play():v.pause(),x.current.eventLogger?.event?.("play_pause",{playing:k,mode:g.current.mode})},seek:v=>{f({type:"seek",time:v}),b?.player?.seek(v),x.current.eventLogger?.event?.("seek",{position:v,mode:g.current.mode})},setSpeed:v=>b?.player?.setSpeed(v),setVolume:v=>{f({type:"set_volume",volume:v}),b?.setVolume(v)},toggleMute:()=>{let v=!b?.audioEnabled;v?b?.enableAudio():b?.disableAudio(),x.current.eventLogger?.event?.("mute_toggle",{muted:!v,mode:g.current.mode})},setAudio:v=>b?.setAudio(v)}),[b]),T=kr(()=>({controlsType:d.controlsType,zoom:v=>b?.camera?.zoom(v),reset:()=>{b?.camera?.reset(),x.current.eventLogger?.event?.("reset",{mode:g.current.mode})},setControls:v=>{if(!b)return;b.setControls(v);let k=b.camera?.controlsType??v;f({type:"camera_controls",controlsType:k}),x.current.eventLogger?.event?.("camera_controls",{controls:k,requestedControls:v,mode:g.current.mode})}}),[b,d.controlsType]),S=kr(()=>({open(v){b&&(f({type:"open"}),b.open(v))},close(){b?.close(),f({type:"close"})},dispose(){b&&(b.stop(),b.dispose())}}),[b]),B={app:b,device:b?.device??null,overlay:d.overlay,isInitialized:b!==null,isLoading:d.isLoading,isContentReady:d.isContentReady,progress:d.progress,mode:d.mode,error:d.error,isRebuffering:d.isContentReady&&(d.isLoading||d.isBuffering),...S,playback:{isPlaying:d.isPlaying,isBuffering:d.isBuffering,currentTime:d.currentTime,duration:d.duration,isMuted:d.isMuted,volume:d.volume,...w},camera:T,xr:E};return Ui.set(B,{dispatch:f}),B}import{useCallback as dt,useEffect as Vn,useRef as Hn,useState as Wi}from"react";function Zt(s,e={}){let{app:t}=s,r=Vi(s)?.dispatch,i=Hn(e.onSceneEnd);i.current=e.onSceneEnd;let[n,o]=Wi([]),[a,l]=Wi(-1);Vn(()=>{if(t)return t.onSceneChange=(m,g)=>{r?.({type:"open"}),r?.({type:"camera_controls",controlsType:t.camera?.controlsType??"orbit"}),l(g)},t.onSceneEnd=(m,g)=>i.current?.(m,g),()=>{t.onSceneChange=null,t.onSceneEnd=null}},[t,r]);let h=dt(m=>{t&&(t.sources=m),o(m),l(-1)},[t]),c=dt(m=>{t?.loadScene(m)},[t]),p=dt(()=>{t&&t.loadScene(t.sceneIndex+1)},[t]),u=dt(()=>{t&&t.loadScene(t.sceneIndex-1)},[t]),d=dt(async(m,g)=>{let x=await Ve(m,g);h(x),x.length>0&&c(0)},[h,c]),f=a>=0&&a<n.length?n[a]:null;return{sources:n,index:a,total:n.length,currentSource:f,hasNext:a>=0&&a<n.length-1,hasPrev:a>0,hasAudio:!!f?.audio,setSources:h,loadFromApi:d,next:p,prev:u,goTo:c}}import{jsx as R,jsxs as Wn}from"react/jsx-runtime";function Yi(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M5.74023 18.7266V5.17188C5.74023 4.68359 5.86068 4.32552 6.10156 4.09766C6.34245 3.86328 6.62891 3.74609 6.96094 3.74609C7.25391 3.74609 7.55339 3.83073 7.85938 4L19.2363 10.6504C19.64 10.8848 19.9199 11.0964 20.0762 11.2852C20.2389 11.4674 20.3203 11.6888 20.3203 11.9492C20.3203 12.2031 20.2389 12.4245 20.0762 12.6133C19.9199 12.8021 19.64 13.0137 19.2363 13.248L7.85938 19.8984C7.55339 20.0677 7.25391 20.1523 6.96094 20.1523C6.62891 20.1523 6.34245 20.0352 6.10156 19.8008C5.86068 19.5664 5.74023 19.2083 5.74023 18.7266Z"})})}function qi(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M7.3418 20.0254C6.91211 20.0254 6.58659 19.9147 6.36523 19.6934C6.15039 19.472 6.04297 19.1465 6.04297 18.7168V5.17188C6.04297 4.74219 6.15039 4.41992 6.36523 4.20508C6.58659 3.98372 6.91211 3.87305 7.3418 3.87305H9.56836C9.99154 3.87305 10.3138 3.97721 10.5352 4.18555C10.7565 4.39388 10.8672 4.72266 10.8672 5.17188V18.7168C10.8672 19.1465 10.7565 19.472 10.5352 19.6934C10.3138 19.9147 9.99154 20.0254 9.56836 20.0254H7.3418ZM14.4414 20.0254C14.0117 20.0254 13.6862 19.9147 13.4648 19.6934C13.2435 19.472 13.1328 19.1465 13.1328 18.7168V5.17188C13.1328 4.74219 13.2435 4.41992 13.4648 4.20508C13.6862 3.98372 14.0117 3.87305 14.4414 3.87305H16.6582C17.0879 3.87305 17.4102 3.97721 17.625 4.18555C17.8464 4.39388 17.957 4.72266 17.957 5.17188V18.7168C17.957 19.1465 17.8464 19.472 17.625 19.6934C17.4102 19.9147 17.0879 20.0254 16.6582 20.0254H14.4414Z"})})}function Zi(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M8.03125 15.5391C7.5 15.5391 7.10156 15.4036 6.83594 15.1328C6.57031 14.8568 6.4375 14.4375 6.4375 13.875V10.8828C6.4375 10.362 6.55208 9.97135 6.78125 9.71094L15.6875 18.6094C15.625 18.8333 15.5208 18.9974 15.375 19.1016C15.2292 19.2057 15.0547 19.2578 14.8516 19.2578C14.6745 19.2578 14.5052 19.2188 14.3438 19.1406C14.1823 19.0625 14.0104 18.9375 13.8281 18.7656L10.4531 15.6094C10.401 15.5625 10.3359 15.5391 10.2578 15.5391H8.03125ZM15.7422 14.3984L10.3203 8.99219H10.5547C10.6016 8.99219 10.6458 8.97135 10.6875 8.92969L13.8281 6.01562C14.0312 5.82812 14.2057 5.69271 14.3516 5.60938C14.4974 5.52083 14.6615 5.47656 14.8438 5.47656C15.1094 5.47656 15.3255 5.56771 15.4922 5.75C15.6589 5.92708 15.7422 6.14323 15.7422 6.39844V14.3984ZM18.4453 20.0781L5.05469 6.70312C4.9401 6.58854 4.88281 6.44792 4.88281 6.28125C4.88281 6.10938 4.9401 5.96615 5.05469 5.85156C5.17448 5.73177 5.31771 5.67448 5.48438 5.67969C5.65104 5.67969 5.79427 5.73698 5.91406 5.85156L19.2891 19.2266C19.4089 19.3464 19.4688 19.487 19.4688 19.6484C19.4688 19.8151 19.4089 19.9583 19.2891 20.0781C19.1797 20.1979 19.0391 20.2578 18.8672 20.2578C18.7005 20.2578 18.5599 20.1979 18.4453 20.0781Z"})})}function ji(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M11.7031 19.2578C11.5208 19.2578 11.349 19.2188 11.1875 19.1406C11.026 19.0625 10.8568 18.9375 10.6797 18.7656L7.35156 15.6094C7.29948 15.5625 7.23438 15.5391 7.15625 15.5391H4.91406C4.38802 15.5391 3.98438 15.3958 3.70312 15.1094C3.42188 14.8229 3.28125 14.3958 3.28125 13.8281V10.9219C3.28125 10.3594 3.42188 9.9349 3.70312 9.64844C3.98438 9.35677 4.38802 9.21094 4.91406 9.21094H7.15625C7.23438 9.21094 7.29948 9.1875 7.35156 9.14062L10.6797 6.01562C10.8828 5.82812 11.0547 5.69271 11.1953 5.60938C11.3411 5.52083 11.5052 5.47656 11.6875 5.47656C11.9531 5.47656 12.1693 5.56771 12.3359 5.75C12.5026 5.92708 12.5859 6.14323 12.5859 6.39844V18.3828C12.5859 18.6328 12.5026 18.8411 12.3359 19.0078C12.1745 19.1745 11.9635 19.2578 11.7031 19.2578ZM15.375 15.6875C15.2188 15.5781 15.1302 15.4375 15.1094 15.2656C15.0885 15.0938 15.138 14.9245 15.2578 14.7578C15.4818 14.4401 15.6562 14.0755 15.7812 13.6641C15.9062 13.2474 15.9688 12.8125 15.9688 12.3594C15.9688 11.9062 15.9062 11.4714 15.7812 11.0547C15.6615 10.638 15.487 10.2734 15.2578 9.96094C15.1328 9.79948 15.0807 9.63281 15.1016 9.46094C15.1276 9.28385 15.2188 9.14062 15.375 9.03125C15.5104 8.9375 15.6589 8.90625 15.8203 8.9375C15.9818 8.96875 16.1146 9.0599 16.2188 9.21094C16.5208 9.60677 16.7552 10.0807 16.9219 10.6328C17.0938 11.1849 17.1797 11.7604 17.1797 12.3594C17.1797 12.9583 17.0938 13.5339 16.9219 14.0859C16.7552 14.638 16.5208 15.112 16.2188 15.5078C16.1146 15.6589 15.9818 15.75 15.8203 15.7812C15.6589 15.8073 15.5104 15.776 15.375 15.6875ZM18.2734 17.7266C18.1328 17.6276 18.0521 17.4974 18.0312 17.3359C18.0104 17.1693 18.0547 17.0052 18.1641 16.8438C18.5859 16.2344 18.9141 15.5443 19.1484 14.7734C19.388 13.9974 19.5078 13.1927 19.5078 12.3594C19.5078 11.526 19.3906 10.7214 19.1562 9.94531C18.9219 9.16927 18.5911 8.47917 18.1641 7.875C18.0495 7.71354 18.0026 7.55208 18.0234 7.39062C18.0495 7.22396 18.1328 7.09115 18.2734 6.99219C18.4193 6.89323 18.5729 6.85938 18.7344 6.89062C18.8958 6.92188 19.0286 7.01302 19.1328 7.16406C19.638 7.84115 20.0286 8.63542 20.3047 9.54688C20.5807 10.4583 20.7188 11.3958 20.7188 12.3594C20.7188 13.3229 20.5781 14.2578 20.2969 15.1641C20.0208 16.0703 19.6328 16.8672 19.1328 17.5547C19.0286 17.7057 18.8958 17.7969 18.7344 17.8281C18.5729 17.8542 18.4193 17.8203 18.2734 17.7266Z"})})}function Pe(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M5.42188 13.1953V6.4375C5.42188 5.625 5.6224 5.01302 6.02344 4.60156C6.42969 4.1901 7.03646 3.98438 7.84375 3.98438H11.4297V9.71875C11.4297 10.7031 11.9219 11.1953 12.9062 11.1953H18.5625V18.2891C18.5625 19.1016 18.3594 19.7109 17.9531 20.1172C17.5521 20.5286 16.9479 20.7344 16.1406 20.7344H9.78125C10 20.3646 10.1667 19.9688 10.2812 19.5469C10.401 19.125 10.4609 18.6901 10.4609 18.2422C10.4609 17.5495 10.3307 16.8984 10.0703 16.2891C9.8099 15.6797 9.44792 15.1432 8.98438 14.6797C8.52083 14.2161 7.98438 13.8542 7.375 13.5938C6.76562 13.3281 6.11458 13.1953 5.42188 13.1953ZM12.9297 10.125C12.6432 10.125 12.5 9.98438 12.5 9.70312V4.07031C12.6615 4.09635 12.8255 4.16667 12.9922 4.28125C13.1589 4.39062 13.3333 4.53906 13.5156 4.72656L17.8203 9.10938C18.0078 9.30208 18.1562 9.47917 18.2656 9.64062C18.375 9.80208 18.4427 9.96354 18.4688 10.125H12.9297ZM5.42188 22.2109C4.88021 22.2109 4.36979 22.1068 3.89062 21.8984C3.41146 21.6953 2.98958 21.4115 2.625 21.0469C2.26042 20.6823 1.97396 20.2604 1.76562 19.7812C1.55729 19.3021 1.45312 18.7891 1.45312 18.2422C1.45312 17.6953 1.55729 17.1849 1.76562 16.7109C1.97396 16.2318 2.26042 15.8099 2.625 15.4453C2.98958 15.0755 3.41146 14.7891 3.89062 14.5859C4.36979 14.3776 4.88021 14.2734 5.42188 14.2734C5.96875 14.2734 6.48177 14.3776 6.96094 14.5859C7.4401 14.7891 7.86198 15.0729 8.22656 15.4375C8.59115 15.8021 8.875 16.224 9.07812 16.7031C9.28646 17.1823 9.39062 17.6953 9.39062 18.2422C9.39062 18.7839 9.28646 19.2943 9.07812 19.7734C8.86979 20.2526 8.58073 20.6745 8.21094 21.0391C7.84635 21.4036 7.42448 21.6901 6.94531 21.8984C6.46615 22.1068 5.95833 22.2109 5.42188 22.2109ZM5.42188 20.7266C5.56771 20.7266 5.68229 20.6823 5.76562 20.5938C5.85417 20.5052 5.89844 20.3906 5.89844 20.25V18.7188H7.42969C7.57031 18.7188 7.6849 18.6745 7.77344 18.5859C7.86198 18.5026 7.90625 18.388 7.90625 18.2422C7.90625 18.0964 7.86198 17.9818 7.77344 17.8984C7.6849 17.8099 7.57031 17.7656 7.42969 17.7656H5.89844V16.2344C5.89844 16.0938 5.85417 15.9792 5.76562 15.8906C5.68229 15.8021 5.56771 15.7578 5.42188 15.7578C5.27604 15.7578 5.15885 15.8021 5.07031 15.8906C4.98698 15.9792 4.94531 16.0938 4.94531 16.2344V17.7656H3.41406C3.27344 17.7656 3.15885 17.8099 3.07031 17.8984C2.98177 17.9818 2.9375 18.0964 2.9375 18.2422C2.9375 18.388 2.98177 18.5026 3.07031 18.5859C3.15885 18.6745 3.27344 18.7188 3.41406 18.7188H4.94531V20.25C4.94531 20.3906 4.98698 20.5052 5.07031 20.5938C5.15885 20.6823 5.27604 20.7266 5.42188 20.7266Z"})})}function Qi(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.75 6.5A3.75 3.75 0 0 0 2 10.25v3.5a3.75 3.75 0 0 0 3.75 3.75h7.5A3.75 3.75 0 0 0 17 13.75v-.46l2.9 2.16A1.25 1.25 0 0 0 22 14.45v-4.9a1.25 1.25 0 0 0-2.1-1L17 10.71v-.46a3.75 3.75 0 0 0-3.75-3.75h-7.5ZM6 8h7a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 16H6a2.5 2.5 0 0 1-2.5-2.5v-3A2.5 2.5 0 0 1 6 8Zm11 4.6v-1.2l3.5-2.61v6.42L17 12.6Z"})})}function jt(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.25 6.75C3.46 6.75 2 8.21 2 10v4c0 1.79 1.46 3.25 3.25 3.25h3.24c.83 0 1.55-.54 1.8-1.33l.52-1.67h2.38l.52 1.67c.25.79.97 1.33 1.8 1.33h3.24c1.79 0 3.25-1.46 3.25-3.25v-4c0-1.79-1.46-3.25-3.25-3.25H5.25Zm.67 3.42c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52H5.92Zm10.2 0c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52h-1.96Z"})})}function Qt(){return Wn("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[R("path",{d:"M5.5 3.75c-.97 0-1.75.78-1.75 1.75v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5A3.25 3.25 0 0 1 5.5 2.25h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5ZM16.25 3c0-.41.34-.75.75-.75h1.5a3.25 3.25 0 0 1 3.25 3.25v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5c0-.97-.78-1.75-1.75-1.75H17c-.41 0-.75-.34-.75-.75ZM3 15.5c.41 0 .75.34.75.75v2.25c0 .97.78 1.75 1.75 1.75h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5a3.25 3.25 0 0 1-3.25-3.25v-2.25c0-.41.34-.75.75-.75ZM21 15.5c.41 0 .75.34.75.75v2.25a3.25 3.25 0 0 1-3.25 3.25H17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.5c.97 0 1.75-.78 1.75-1.75v-2.25c0-.41.34-.75.75-.75Z"}),R("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z"})]})}function $i(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"})})}function Ki(){return R("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:R("path",{d:"m480-236 93-93q12-12 29-12t29 12q12 12 12 29t-12 29L508-148q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L329-271q-12-12-12-29t12-29q12-12 29-12t29 12l93 93Zm0-484-93 93q-12 12-29 12t-29-12q-12-12-12-29t12-29l123-123q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l123 123q12 12 12 29t-12 29q-12 12-29 12t-29-12l-93-93Z"})})}function Ji({active:s=!1}){return R("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:s?R("path",{d:"M240-240h-80q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h120q17 0 28.5 11.5T320-280v120q0 17-11.5 28.5T280-120q-17 0-28.5-11.5T240-160v-80Zm480 0v80q0 17-11.5 28.5T680-120q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320h120q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240h-80ZM240-720v-80q0-17 11.5-28.5T280-840q17 0 28.5 11.5T320-800v120q0 17-11.5 28.5T280-640H160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h80Zm480 0h80q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H680q-17 0-28.5-11.5T640-680v-120q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v80Z"}):R("path",{d:"M200-200h80q17 0 28.5 11.5T320-160q0 17-11.5 28.5T280-120H160q-17 0-28.5-11.5T120-160v-120q0-17 11.5-28.5T160-320q17 0 28.5 11.5T200-280v80Zm560 0v-80q0-17 11.5-28.5T800-320q17 0 28.5 11.5T840-280v120q0 17-11.5 28.5T800-120H680q-17 0-28.5-11.5T640-160q0-17 11.5-28.5T680-200h80ZM200-760v80q0 17-11.5 28.5T160-640q-17 0-28.5-11.5T120-680v-120q0-17 11.5-28.5T160-840h120q17 0 28.5 11.5T320-800q0 17-11.5 28.5T280-760h-80Zm560 0h-80q-17 0-28.5-11.5T640-800q0-17 11.5-28.5T680-840h120q17 0 28.5 11.5T840-800v120q0 17-11.5 28.5T800-640q-17 0-28.5-11.5T760-680v-80Z"})})}function $t(){return R("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:R("path",{d:"m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"})})}function Kt(){return R("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:R("path",{d:"M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"})})}var es=[{type:"orbit",label:"Orbit",hint:`Left-click drag to rotate / Right-click drag to pan
Scroll to zoom in/out`},{type:"trackball",label:"Trackball",hint:`Left-click drag to rotate freely / Right-click drag to pan
Scroll to zoom in/out`},{type:"fly",label:"Fly",hint:`W/S forward & back / A/D strafe / R/F up & down
Q/E roll / Drag to look around`}];var oe={PW:"pw",HW:"hw",VR:"vr",AR:"ar"},ih=[oe.VR,oe.AR];function Jt(s){return s===oe.VR||s===oe.AR}var Fr=[".mint",".sog"],ts=Fr.join(","),rs="Open file",er="local://",is="static",Yn=".sog";function Br(s){return s.toLowerCase().endsWith(Yn)}function Me(s){return typeof s?.url=="string"&&s.url.startsWith(er)}var ss="stepper";var qn="@gracia/web-sdk/wasm",Zn="https://market.gracia.ai/api/v1/streaming/content";function ns(){return typeof __GRACIA_MODULE_URL__=="string"?__GRACIA_MODULE_URL__:qn}function os(){return typeof __GRACIA_STREAMING_BASE_URL__=="string"?__GRACIA_STREAMING_BASE_URL__:Zn}function jn(){return typeof navigator>"u"?!1:!!navigator.gpu}var Qn={xr:"xr-failed",fullscreen:"fullscreen-failed","local-file":"local-file-failed"};function $n(s){let e=s.match(/http\s+(-?\d+)/i);return e?Number(e[1]):null}function Kn(s,e){let t=e&&Qn[e];if(t)return t;let r=s.message.toLowerCase();if(r.includes("webgpu")||r.includes("not supported")||r.includes("getcontext"))return"unsupported-browser";let i=$n(r);return i!==null?i===401||i===403?"access-denied":i===404?"not-found":i>=500?"server-error":"network":r.includes("failed to fetch dynamically imported module")?"load-failed":r.includes("forbidden")||r.includes("unauthorized")?"access-denied":jn()?"unknown":"unsupported-browser"}var Jn=new Set(["unsupported-browser","not-found","access-denied","xr-failed","fullscreen-failed","local-file-failed"]),eo=new Set(["xr-failed","fullscreen-failed","local-file-failed"]);function to(s,e){let t=!Jn.has(s);return s==="unsupported-browser"?{presentation:"blocking",recoverable:t}:eo.has(s)?{presentation:"toast",recoverable:t}:{presentation:e?"toast":"blocking",recoverable:t}}var ro={"unsupported-browser":{title:"This browser can\u2019t run the player",body:"The player requires WebGPU. Open it in a supported browser and device."},network:{title:"Connection lost",body:"We couldn\u2019t reach the stream. Check your connection and try again."},"not-found":{title:"Scene not found",body:"This content is no longer available."},"access-denied":{title:"Access denied",body:"You don\u2019t have permission to view this content."},"server-error":{title:"Something went wrong",body:"The server had a problem loading this scene. Please try again."},"load-failed":{title:"Couldn\u2019t load the scene",body:"We couldn\u2019t load this scene. Please try again."},"xr-failed":{title:"Couldn\u2019t enter immersive mode",body:"Immersive mode isn\u2019t available right now."},"fullscreen-failed":{title:"Couldn\u2019t enter fullscreen",body:"Fullscreen isn\u2019t available right now."},"local-file-failed":{title:"Couldn\u2019t open the file",body:"We couldn\u2019t open that file. Try a different one."},unknown:{title:"Something went wrong",body:"We couldn\u2019t load this scene. Please try again."}};function io(s){return ro[s]}function as(s,e,t){let r=Kn(s,t);return{kind:r,cause:s,...to(r,e),...io(r)}}var ls="data:font/woff2;base64,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";var hs=`@font-face {\r
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
.gr-player__scene-item:hover {\r
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
.gr-player__scene-item:active::after {\r
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
    overflow: hidden;\r
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
.gr-player__scene-item:hover {\r
    background: rgba(233, 242, 255, 0.1);\r
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
    min-width: 0;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
    white-space: nowrap;\r
    color: rgba(233, 242, 255, 0.7);\r
    font-weight: 400;\r
}\r
\r
.gr-player__scene-item.is-active span,\r
.gr-player__scene-item.is-active strong,\r
.gr-player__scene-item:hover span,\r
.gr-player__scene-item:hover strong {\r
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
    .gr-player__scene-menu {\r
        animation: none;\r
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
`;var cs="gracia-player-default-styles",Ir=hs.replace('url("./assets/GolosText-Regular.woff2")',`url("${ls}")`);function tr(s){if(typeof document>"u")return;let e=typeof ShadowRoot<"u"&&s instanceof ShadowRoot?s:s?.head??document.head;if(e.querySelector(`#${cs}`))return;let t=document.createElement("style");t.id=cs,t.textContent=Ir,e.appendChild(t)}function Z(...s){let e=[];for(let t of s)if(t){if(typeof t=="string"){e.push(t);continue}for(let[r,i]of Object.entries(t))i&&e.push(r)}return e.join(" ")}function ae(s){return s.label??s.displayName??s.id??s.url??"Untitled"}function Gr(s){return!Number.isFinite(s)||s<0?"0:00":`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`}function xe(s){return s instanceof Error?s:new Error(String(s))}function ps(s,e){return{event:(t,r)=>s?.event?.(t,r),error:(t,r)=>{s?.error?.(t,r),e?.(t,r)}}}import{jsx as us,jsxs as oo}from"react/jsx-runtime";var re=({variant:s="primary",className:e,type:t="button",children:r,...i})=>{let n=Array.isArray(s)?s:[s];return us("button",{type:t,className:Z("gr-player__button",...n.map(o=>`gr-player__button--${o}`),e),...i,children:r})},Ee=({variant:s="icon",srLabel:e,children:t,...r})=>oo(re,{variant:s,...r,children:[t,e&&us("span",{className:"gr-player__sr",children:e})]});import{jsx as ft,jsxs as ao}from"react/jsx-runtime";var He=({icon:s,title:e,body:t,detail:r,action:i,className:n,role:o,ariaLive:a})=>ft("div",{className:n,role:o,"aria-live":a,children:ao("div",{className:"gr-player__state-message",children:[ft("div",{className:"gr-player__state-icon",children:s}),ft("h2",{children:e}),ft("p",{children:t}),r&&ft("span",{className:"gr-player__sr",children:r}),i]})});import{jsx as ds}from"react/jsx-runtime";var zr=({message:s})=>ds("div",{className:"gr-player__error",role:"alert",children:ds("span",{className:"gr-player__error-text",children:s})});import{jsx as fs}from"react/jsx-runtime";var Or=({title:s,body:e,detail:t,action:r})=>fs(He,{icon:fs($i,{}),title:s,body:e,detail:t,action:r,className:"gr-player__error-screen",role:"alert",ariaLive:"assertive"});import{jsx as ms}from"react/jsx-runtime";var Nr=()=>ms("div",{className:"gr-player__loader",role:"status","aria-live":"polite",children:ms("div",{className:"gr-player__spinner"})});import{forwardRef as ga,useImperativeHandle as ya,useRef as Ks}from"react";import{createContext as lo,useContext as ho}from"react";var gs=lo(null),Xr=gs.Provider,I=()=>{let s=ho(gs);if(!s)throw new Error("usePlayerContext must be used within a PlayerProvider");return s};import{useEffect as ys,useRef as co,useState as po}from"react";function Dr(s,e,t){let[r,i]=po(!1);ys(()=>{let a=s.current;if(!a)return;let l=()=>i(!0),h=c=>{c.touches.length>1&&l()};return a.addEventListener("pointerdown",l),a.addEventListener("wheel",l),a.addEventListener("touchmove",h),()=>{a.removeEventListener("pointerdown",l),a.removeEventListener("wheel",l),a.removeEventListener("touchmove",h)}},[s]);let n=co(e);return ys(()=>{n.current!==e&&(n.current=e,i(!1))},[e]),{hasInteracted:r,resetView:()=>{t.reset(),i(!1)}}}import{useEffect as uo,useState as fo}from"react";var mo=500;function Ur(s,e=mo){let[t,r]=fo(!1);return uo(()=>{if(!s){r(!1);return}let i=setTimeout(()=>r(!0),e);return()=>clearTimeout(i)},[s,e]),s&&t}import{useEffect as go,useRef as yo,useState as xo}from"react";var bo=2e3;function Vr({coreError:s,interactionError:e,isSceneReady:t,currentSource:r,open:i,clearError:n}){let[o,a]=xo(null),l=yo(new WeakMap);e?.phase&&l.current.set(e.error,e.phase);let h=s&&e?.error===s?e.phase:s?l.current.get(s):void 0,c=s?{error:s,phase:h}:e,p=c?as(c.error,t,c.phase):null,u=p?.presentation==="blocking",d=p?.presentation==="toast"&&p.cause!==o?p:null,f=d?.cause??null;return go(()=>{if(!f)return;let x=setTimeout(()=>{a(f),n()},bo);return()=>clearTimeout(x)},[f,n]),{playerError:p,isBlocking:!!u,toast:d,retry:()=>r?i(r):window.location.reload(),dismiss:()=>{d&&a(d.cause),n()}}}import{useCallback as vo,useEffect as wo,useState as _o}from"react";function Hr(s,e){let[t,r]=_o(!1),i=vo(async()=>{let n=s.current;if(!(!n||typeof document>"u"))try{document.fullscreenElement===n?await document.exitFullscreen():await n.requestFullscreen()}catch(o){e(xe(o),{phase:"fullscreen"})}},[e,s]);return wo(()=>{if(typeof document>"u")return;let n=()=>r(document.fullscreenElement===s.current);return n(),document.addEventListener("fullscreenchange",n),()=>document.removeEventListener("fullscreenchange",n)},[s]),{isFullscreen:t,toggleFullscreen:i}}import{useRef as So}from"react";function xs(s){let e=Br(s.name);return{url:`${er}${s.name}`,label:s.name,file:s,...e?{type:is}:{}}}async function To(s){return Br(s.name)?xs(await s.getFile()):{url:`${er}${s.name}`,label:s.name,localFile:s}}function Po(){return typeof window>"u"?null:window.showOpenFilePicker??null}function Mo(s){return s instanceof DOMException&&s.name==="AbortError"}function Eo(s){let e=s.currentTarget.files?.[0];return s.currentTarget.value="",e?xs(e):null}function Wr({localFiles:s,logger:e,reportError:t,playlist:r,clearError:i}){let n=So(null),o=!!s,a=c=>{i();let p=[...r.sources,c];r.setSources(p),r.goTo(p.length-1),e.event?.("local_file_open",{label:ae(c)})};return{enabled:o,fileInputProps:{ref:n,accept:ts,onChange:c=>{let p=Eo(c);p&&a(p)}},localLabel:rs,openLocalFile:async()=>{if(!o)return;let c=Po();if(!c){n.current?.click();return}try{let u=(await c({types:[{description:"Volumetric video",accept:{"application/octet-stream":[...Fr]}}]}))[0];u&&a(await To(u))}catch(p){Mo(p)||t(xe(p),{phase:"local-file"})}}}}import{useRef as Yr}from"react";function qr(s){let{containerRef:e,muted:t=!1,moduleFactory:r,overlay:i,xrBackend:n,eventLogger:o,onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:p}=s,u=Yr({onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:p});u.current={onReady:a,onProgress:l,onModeChange:h,onXRStart:c,onXREnd:p};let d=Yr(null),f=Yr(!1),m=qt({containerRef:e,moduleFactory:r,moduleUrl:r?void 0:ns(),overlay:i,xrBackend:n,eventLogger:o,onReady(){f.current||(f.current=!0,t||d.current?.app?.enableAudio()),u.current.onReady?.()},onProgress:x=>u.current.onProgress?.(x),onModeChange:(x,b)=>u.current.onModeChange?.(x,b),onXRStart:()=>u.current.onXRStart?.(),onXREnd:()=>u.current.onXREnd?.()});d.current=m;let g=Zt(m);return{gracia:m,playlist:g}}import{useCallback as Zr,useMemo as bs,useState as Co}from"react";function Lo(s){switch(s){case"init":case"load":case"xr":case"streaming":case"fullscreen":case"local-file":return s;default:return}}function jr(s,e){let[t,r]=Co(null),i=bs(()=>ps(s,e),[s,e]),n=Zr((h,c)=>{r({error:h,phase:Lo(c?.phase)})},[]),o=bs(()=>({event:(h,c)=>i.event?.(h,c),error:(h,c)=>{n(h,c),i.error?.(h,c)}}),[i,n]),a=Zr((h,c)=>{n(h,c),i.error?.(h,c)},[i,n]),l=Zr(()=>r(null),[]);return{interactionError:t,logger:o,reportError:a,clearError:l}}import{useEffect as ta}from"react";import{useEffect as Ro,useRef as ko}from"react";function Qr({isInitialized:s,sources:e,streaming:t,playlist:r,reportError:i}){let n=ko(i);n.current=i,Ro(()=>{if(!s)return;let o=!1,a=l=>{o||l.length===0||(r.setSources(l),r.goTo(0))};if(t?.length)return Ve(t,os()).then(a).catch(l=>{o||n.current(xe(l),{phase:"streaming"})}),()=>{o=!0};a(e)},[s,e,t,r.setSources,r.goTo])}import{useEffect as Ao,useRef as vs}from"react";function $r({currentSource:s,index:e,onSceneChange:t}){let r=vs(t);r.current=t;let i=vs(null);Ao(()=>{if(!s||e<0)return;let n=`${e}:${ae(s)}`;i.current!==n&&(i.current=n,r.current?.(s,e))},[s,e])}import{useEffect as Fo,useState as Bo}from"react";var Io=500;function Kr(s,e,t){let[r,i]=Bo(!1),n=Jt(s.mode)?s.mode:null;Fo(()=>{(!n||!s.xr.isActive)&&i(!1)},[n,s.xr.isActive]);let o=c=>{t(),i(!0),s.xr.setMode(c).catch(p=>{i(!1),e(xe(p),{phase:"xr",target:c})})},a=()=>{i(!1),s.xr.setMode(oe.PW).catch(c=>{e(xe(c),{phase:"xr",target:oe.PW})})},h=Ur(r&&!s.error,Io)&&s.xr.isActive?n:null;return{enter:o,exit:a,activeScreenMode:h}}import{signal as be}from"@preact/signals-core";import{Container as V,Fullscreen as Xo,Svg as Ae,Text as sr}from"@react-three/uikit";import{signal as Ce}from"@preact/signals-core";import{forwardHtmlEvents as Go}from"@pmndrs/pointer-events";import{createRoot as zo}from"@react-three/fiber";var rr=class{#e;#t;#r;#i;#s;#o;#n=null;#a=null;#h;#l;#c=null;#p=null;#u=null;#d=!1;#f=!1;#m;#g;#b;#y;#x;#v;constructor(e,{pixelWidth:t,pixelHeight:r,worldWidth:i,worldHeight:n,cursorFactory:o,react:a=!1}){this.#s=e,this.#o=o,this.#d=a,this.#e=t*2,this.#t=r*2,this.#r=document.createElement("canvas"),this.#r.width=this.#e,this.#r.height=this.#t,this.#i=new e.WebGLRenderer({canvas:this.#r,alpha:!0,antialias:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.#i.setClearColor(0,0),this.#i.setSize(this.#e,this.#t,!1),this.#h=new e.Scene,this.#l=new e.OrthographicCamera(0,t,r,0,.1,10),this.#l.position.z=5,this.#m=new e.Raycaster,this.#g=new e.Vector3,this.#b=new e.Vector3,this.#y=new e.Quaternion,this.#x=new e.Mesh(new e.PlaneGeometry(i,n),new e.MeshBasicMaterial({visible:!1,side:e.DoubleSide}));let l=new e.SphereGeometry(.008,8,8),h=()=>new e.MeshBasicMaterial({color:65280,depthTest:!1});this.#v=[0,1].map(()=>{let c=new e.Mesh(l,h());return c.renderOrder=1001,c.visible=!1,c})}get canvas(){return this.#r}get scene(){return this.#h}get pixelWidth(){return this.#e/2}get pixelHeight(){return this.#t/2}get internalWidth(){return this.#e}get internalHeight(){return this.#t}get pointer(){return this.#n}get cursor(){return this.#a?.mesh??null}get ptrPressed(){return this.#f}get reactPending(){return this.#d}get hitMesh(){return this.#x}get hitSpheres(){return this.#v}async mountReact(e){this.#c=zo(this.#r),await this.#c.configure({frameloop:"never",orthographic:!0,size:{width:this.#e/2,height:this.#t/2},dpr:2,gl:this.#i,events:()=>({enabled:!1,priority:0,handlers:{}})}),this.#p=this.#c.render(e),this.#h=this.#p.getState().scene,this.#u=Go(this.#r,()=>this.#p.getState().camera,this.#h,{batchEvents:!1}),this.#d=!1}patchCanvasForXR(){let e=this.pixelWidth,t=this.pixelHeight;this.#r.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,right:e,bottom:t,width:e,height:t,toJSON(){}});let r=new Set;this.#r.setPointerCapture=i=>r.add(i),this.#r.releasePointerCapture=i=>r.delete(i),this.#r.hasPointerCapture=i=>r.has(i)}setPointer(e,t,r,i=!1){if(!this.#n){if(!this.#h)return;this.#n={x:e,y:t,pressed:r};let h=this.#o(this.#s);h.position.z=.06,this.#h.add(h),this.#a={mesh:h,sx:e,sy:this.pixelHeight-t}}let n=this.#n;n.x=e,n.y=t,n.pressed=r;let o=this.#a,a=this.pixelHeight-t,l=o.mesh.visible?.6:1;o.sx+=(e-o.sx)*l,o.sy+=(a-o.sy)*l,o.mesh.visible=!0,this.#p?o.mesh.position.set(o.sx-this.pixelWidth/2,o.sy-this.pixelHeight/2,.06):o.mesh.position.set(o.sx,o.sy,.06),o.mesh.material.opacity=r?1:.7,i&&this.#w(e,t,r)}clearPointer(e=!1){e&&this.#n&&this.#T(),this.#n=null,this.#a&&(this.#a.mesh.visible=!1)}renderScene(){this.#d||(this.#u?.update(),this.#p?this.#p.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#h,this.#l))}clampAlpha(e){let t=this.#i.getContext();t.colorMask(!1,!1,!1,!0),t.clearColor(0,0,0,e),t.clear(t.COLOR_BUFFER_BIT),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0)}initFlat(){let e=!1,t=r=>{let i=this.#r.getBoundingClientRect();return{x:(r.clientX-i.left)/i.width*this.pixelWidth,y:(r.clientY-i.top)/i.height*this.pixelHeight}};this.#r.addEventListener("pointerdown",r=>{e=!0,this.#r.setPointerCapture(r.pointerId);let i=t(r);this.setPointer(i.x,i.y,!0)}),this.#r.addEventListener("pointermove",r=>{let i=t(r);this.setPointer(i.x,i.y,e)}),this.#r.addEventListener("pointerup",r=>{e=!1;let i=t(r);this.setPointer(i.x,i.y,!1)}),this.#r.addEventListener("pointerleave",()=>{e=!1,this.clearPointer()})}renderFlat(){this.#d||(this.#u?.update(),this.#p?this.#p.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#h,this.#l))}castRay(e,t){let r=e.rayTransform.position,i=e.rayTransform.orientation;return this.#g.set(r.x,r.y,r.z),this.#b.set(0,0,-1).applyQuaternion(this.#y.set(i.x,i.y,i.z,i.w)),this.rayHitQuad(this.#g,this.#b,t)}rayHitQuad(e,t,r=0){let i=this.pixelWidth,n=this.pixelHeight,o=this.#v[r];this.#m.ray.origin.copy(e),this.#m.ray.direction.copy(t);let a=this.#m.intersectObject(this.#x);if(a.length===0)return o.visible=!1,null;let l=a[0].point,h=a[0].uv;if(!h)return o.visible=!1,null;let c=h.x*i,p=(1-h.y)*n;return c<0||c>i||p<0||p>n?(o.visible=!1,null):(o.position.copy(l),o.visible=!0,o.updateMatrixWorld(!0),{x:c,y:p})}gazeHitsQuad(e,t){if(!e?.transform)return!0;let r=e.transform.position,i=e.transform.orientation,n=-2*(i.w*i.y+i.x*i.z),o=-2*(i.y*i.z-i.w*i.x),a=2*(i.x*i.x+i.y*i.y)-1,l=t||this.#x.position,h=l.x-r.x,c=l.y-r.y,p=l.z-r.z,u=Math.sqrt(h*h+c*c+p*p)||1;return(n*h+o*c+a*p)/u>.6}dispose(){this.#u?.destroy(),this.#u=null,this.#c&&(this.#c.unmount(),this.#c=null,this.#p=null),this.#i?.dispose(),this.#i=null}#w(e,t,r){let i=this.#f;this.#f=r;let n={clientX:e,clientY:t,pointerId:1,pointerType:"mouse",isPrimary:!0};r&&!i&&this.#r.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1,bubbles:!0})),this.#r.dispatchEvent(new PointerEvent("pointermove",{...n,buttons:r?1:0,bubbles:!0})),!r&&i&&this.#r.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0,bubbles:!0}))}#T(){let e={pointerId:1,pointerType:"mouse",isPrimary:!0};this.#f&&this.#r.dispatchEvent(new PointerEvent("pointerup",{...e,button:0,buttons:0,bubbles:!0})),this.#r.dispatchEvent(new PointerEvent("pointerleave",{...e,bubbles:!1})),this.#f=!1}};var Oo=`attribute vec2 a_pos;
varying vec2 v_uv;
uniform mat4 u_mvp;
void main() {
    v_uv = a_pos + 0.5;
    gl_Position = u_mvp * vec4(a_pos, 0.0, 1.0);
}`,No=`precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_alpha;
void main() {
    vec4 c = texture2D(u_tex, v_uv);
    gl_FragColor = vec4(c.rgb, c.a * u_alpha);
}`,ir=class{#e=null;#t=null;#r=null;#i=!1;#s=null;#o=null;#n=null;#a=null;#h=null;#l=null;#c=null;#p=null;#u;#d;#f;#m;#g;#b;#y;#x;#v;#w;#T;#S=null;#P=null;constructor(e,{worldWidth:t,worldHeight:r,internalWidth:i,internalHeight:n,canvas:o}){this.#v=t,this.#w=r,this.#y=i,this.#x=n,this.#T=o,this.#u=new e.Matrix4,this.#d=new e.Matrix4,this.#f=new e.Matrix4,this.#m=new e.Vector3,this.#g=new e.Quaternion,this.#b=new e.Vector3(t,r,1)}get projected(){return this.#i}get layer(){return this.#t}get pose(){return this.#s??null}async init(e,t,r,i,n=null){if(this.#e=i,n)return this.#S=n,this.#P=n.createPanelTexture(this.#y,this.#x),this.#i=!0,null;if(t)try{return this.#r=t,this.#t=t.createQuadLayer({space:r,viewPixelWidth:this.#y,viewPixelHeight:this.#x,layout:"mono",isStatic:!1,width:this.#v/2,height:this.#w/2}),this.stash(),this.#t}catch{this.#t=null,this.#r=null}return this.#i=!0,this.#_(i),null}stash(){this.#o=null,this.#t&&(this.#t.transform=new XRRigidTransform({x:0,y:-1e3,z:0},{x:0,y:0,z:0,w:1}))}setTransform(e){this.#s=e,this.#o=e}applyPose(e,t,r,i,n,o,a){let l=new XRRigidTransform({x:e,y:t,z:r},{x:i,y:n,z:o,w:a});this.#s=l,this.#o=l}upload(e){this.#t?(this.#o&&(this.#t.transform=this.#o,this.#o=null),this.#M(e,this.#r.getSubImage(this.#t,e)?.colorTexture)):this.#P?(this.#S.uploadPanel(this.#P,this.#T),this.#o=null):(this.#M(e,this.#l),this.#o=null)}renderEye(e,t,r,i,n,o,a,l){!this.#i||this.#P||!l||!this.#s||(this.#E(),this.#f.fromArray(t.transform.inverse.matrix),this.#d.multiplyMatrices(this.#f,this.#u),this.#f.fromArray(t.projectionMatrix),this.#d.premultiply(this.#f),e.viewport(r,i,n,o),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(this.#n),e.uniformMatrix4fv(this.#c,!1,this.#d.elements),e.uniform1f(this.#p,a),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.#l),e.bindVertexArray(this.#a),e.drawArrays(e.TRIANGLES,0,6),e.bindVertexArray(null),e.disable(e.BLEND),e.useProgram(null))}panelDraw(e,t){return!this.#P||!t||!this.#s?null:{...this.#P,model:this.#E(),alpha:e}}dispose(){this.#P?.texture.destroy(),this.#P=this.#S=null;let e=this.#e;e&&this.#i&&(this.#n&&e.deleteProgram(this.#n),this.#a&&e.deleteVertexArray(this.#a),this.#h&&e.deleteBuffer(this.#h),this.#l&&e.deleteTexture(this.#l)),this.#t=this.#r=this.#e=null,this.#n=this.#a=this.#h=this.#l=null}#E(){let e=this.#s.position,t=this.#s.orientation;return this.#m.set(e.x,e.y,e.z),this.#g.set(t.x,t.y,t.z,t.w),this.#u.compose(this.#m,this.#g,this.#b)}#_(e){let t=e.createShader(e.VERTEX_SHADER);e.shaderSource(t,Oo),e.compileShader(t);let r=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(r,No),e.compileShader(r),this.#n=e.createProgram(),e.attachShader(this.#n,t),e.attachShader(this.#n,r),e.linkProgram(this.#n),e.deleteShader(t),e.deleteShader(r),this.#c=e.getUniformLocation(this.#n,"u_mvp"),this.#p=e.getUniformLocation(this.#n,"u_alpha"),e.useProgram(this.#n),e.uniform1i(e.getUniformLocation(this.#n,"u_tex"),0),e.uniform1f(this.#p,1);let i=e.getAttribLocation(this.#n,"a_pos");this.#a=e.createVertexArray(),e.bindVertexArray(this.#a),this.#h=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.#h),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-.5,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5]),e.STATIC_DRAW),e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),this.#l=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.#l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.#y,this.#x,0,e.RGBA,e.UNSIGNED_BYTE,null),e.generateMipmap(e.TEXTURE_2D)}#M(e,t){if(!t)return;let r=this.#e,i=!this.#i;r.bindTexture(r.TEXTURE_2D,t),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,this.#i?r.LINEAR_MIPMAP_LINEAR:r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!0),i&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,this.#T),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),i&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this.#i&&r.generateMipmap(r.TEXTURE_2D)}};function Jr(s,e,t){let r=Math.sqrt(s*s+e*e+t*t)||1,i=Math.atan2(s/r,t/r)+Math.PI,n=Math.asin(e/r),o=i/2,a=n/2,l=Math.cos(o),h=Math.sin(o),c=Math.cos(a),p=Math.sin(a);return{qx:l*p,qy:h*c,qz:-h*p,qw:l*c}}var We=class{#e;#t;#r=!1;#i=!1;#s;#o;#n=null;#a=null;#h=!1;#l=null;#c=!1;#p=!1;#u=!1;#d=null;alpha=1;onDragTick=null;onDragEnd=null;constructor(e,t){this.#s=t.quadZ??.5,this.#o=t.quadY??-.5,this.#e=new rr(e,t),this.#t=new ir(e,{worldWidth:t.worldWidth,worldHeight:t.worldHeight,internalWidth:this.#e.internalWidth,internalHeight:this.#e.internalHeight,canvas:this.#e.canvas})}get canvas(){return this.#e.canvas}get scene(){return this.#e.scene}get pixelWidth(){return this.#e.pixelWidth}get pixelHeight(){return this.#e.pixelHeight}get hitMesh(){return this.#e.hitMesh}get hitSpheres(){return this.#e.hitSpheres}get pointer(){return this.#e.pointer}get cursor(){return this.#e.cursor}async mountReact(e){return this.#e.mountReact(e)}rayHitQuad(e,t,r){return this.#e.rayHitQuad(e,t,r)}gazeHitsQuad(e,t){return this.#e.gazeHitsQuad(e,t)}get projected(){return this.#t.projected}get layer(){return this.#t.layer}get pose(){return this.#t.pose}get visible(){return this.#r}get placing(){return this.#i}get session(){return this.#n}get interacting(){return this.#r&&(this.#p||this.#h||this.#u||!!this.#a)}get dragging(){return this.#h}set dragging(e){this.#h=e}get panelDragging(){return this.#u}set panelDragging(e){this.#u=e,e||this.onDragEnd?.()}setPointer(e,t,r){this.#e.setPointer(e,t,r,!!this.#n)}clearPointer(){this.#e.clearPointer(!!this.#n)}initFlat(){this.#r=!0,this.#e.initFlat()}renderFlat(){this.#r&&this.#e.renderFlat()}async init(e,t,r,i,n=null){return this.#n=e,this.#e.patchCanvasForXR(),this.#t.init(e,t,r,i,n)}show(){this.#i=!0}hide(){if(this.#e.clearPointer(!!this.#n),this.#h=!1,this.#l=null,this.#a=null,this.#u=!1,this.onDragEnd?.(),this.#r&&this.#t.pose){let e=this.#t.pose.position,t=this.#t.pose.orientation;this.#d={x:e.x,y:e.y,z:e.z,qx:t.x,qy:t.y,qz:t.z,qw:t.w}}this.#r=this.#i=!1;for(let e of this.#e.hitSpheres)e.visible=!1;this.#t.stash()}setTransform(e){this.#t.setTransform(e)}stash(){this.#t.stash()}applyPose(e,t,r,i,n,o,a){this.#t.applyPose(e,t,r,i,n,o,a);let l=this.#e.hitMesh;l.position.set(e,t,r),l.quaternion.set(i,n,o,a),l.updateMatrixWorld(!0)}updatePosition(e){if(!this.#i||!e)return;if(this.#i=!1,this.#r=!0,this.#d){let f=this.#d;this.#d=null,this.applyPose(f.x,f.y,f.z,f.qx,f.qy,f.qz,f.qw);return}let t=e.transform.position,r=e.transform.orientation,i=Math.atan2(2*(r.w*r.y+r.x*r.z),1-2*(r.y*r.y+r.z*r.z)),n=-Math.sin(i),o=-Math.cos(i),a=t.x+n*this.#s,l=t.y+this.#o,h=t.z+o*this.#s,{qx:c,qy:p,qz:u,qw:d}=Jr(a-t.x,l-t.y,h-t.z);this.applyPose(a,l,h,c,p,u,d)}drawContent(e){!this.#r||this.#e.reactPending||(this.#e.renderScene(),this.alpha<1&&!this.#t.projected&&this.#e.clampAlpha(this.alpha),this.#t.upload(e))}renderEye(e,t,r,i,n,o){this.#t.renderEye(e,t,r,i,n,o,this.alpha,this.#r)}panelDraw(){return this.#t.panelDraw(this.alpha,this.#r)}handleInput(e,t,r){if(!this.#n)return!1;let i=!1,n=!1,o=null,a=null;for(let h of this.#e.hitSpheres)h.visible=!1;for(let[h,c]of[["left",e],["right",t]]){if(c?.menuPressed&&(i=!0),!c?.active||!this.#r||!c.rayTransform||c.held)continue;let p=h==="left"?0:1,u=this.#e.castRay(c,p);if(u){let d={hand:c,hit:u,side:h,trigger:!!c.triggerPressed};h==="left"?o=d:a=d}}let l=!!(o||a);if(this.#u){if(this.#t.pose&&r?.transform&&this.onDragTick){let h=this.onDragTick(e,t,r,this.#l,this.#t.pose);h?this.applyPose(h.x,h.y,h.z,h.qx,h.qy,h.qz,h.qw):(this.#u=!1,this.onDragEnd?.())}}else{let h=null;if(this.#a){let c=this.#a==="left"?o:a,p=this.#a==="left"?e:t,u=!!p?.triggerPressed;h=c||(u?{hand:p,hit:null,side:this.#a,trigger:u}:null),u||(this.#a=null)}if(!h){let c=this.#l;h=c==="left"?o||a:c==="right"?a||o:o||a}if(h){this.#l=h.side??this.#l;let c=this.#l==="left"?1:0;if(this.#e.hitSpheres[c].visible=!1,h.hit){let p=this.#e.ptrPressed;this.setPointer(h.hit.x,h.hit.y,h.trigger),h.trigger&&!p&&!this.#a&&(this.#a=this.#l)}else this.#e.pointer?this.setPointer(this.#e.pointer.x,this.#e.pointer.y,h.trigger):this.clearPointer();h.hand?.isTransientPointer&&(n=!0)}else this.clearPointer(),this.#l=null;this.#p=!!(o||a)}return i&&!this.#c&&(this.#r||this.#i?l||this.hide():this.show()),this.#c=i,n}dispose(){this.#r=!1,this.#n=null,this.#e.dispose(),this.#t.dispose()}};var Ye=class{_quad;_sig=null;onPlayPause=null;onSeek=null;onPresetCycle=null;onExit=null;onClose=null;onSceneNav=null;constructor(e,t){this._quad=new We(e,{...t,react:!0})}get quad(){return this._quad}_createBaseSignals(){return{loadingD:Ce("none"),contentD:Ce("flex"),playD:Ce("flex"),pauseD:Ce("none"),spinD:Ce("none"),spinR:Ce(0),fillD:Ce("flex"),spinFast:Ce(!1)}}_updatePlayback(e,{loading:t,playing:r,spinning:i,buffering:n,progress:o}){e.loadingD.value=t?"flex":"none",e.contentD.value=t?"none":"flex",e.playD.value=!i&&!r?"flex":"none",e.pauseD.value=!i&&r?"flex":"none",e.spinD.value=i?"flex":"none",e.fillD.value=n?"none":"flex",e.spinFast.value=i&&!n,this._quad.dragging||this._setProgress(o)}render(e){let t=this._sig;if(!this._quad.visible||!t)return;let r=t.loadingD.value==="flex",i=r?20:t.spinFast.value?14:6;(t.spinD.value==="flex"||r)&&(t.spinR.value-=e*i)}_seekFromEvent(e){this._seekTo(e.point.x+this._quad.pixelWidth/2)}_seekTo(e){}_setProgress(e){}};import{jsx as F,jsxs as or}from"react/jsx-runtime";var Qe=s=>`data:image/svg+xml,${encodeURIComponent(s)}`,Do=Qe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#aaaaaa"/></svg>'),Uo=Qe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#aaaaaa"/></svg>'),Vo=Qe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#666666"/></svg>'),ws=Qe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1 1 2 12L5 12A7 7 0 1 0 12 5Z" fill="#888888"/></svg>'),Ho=Qe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z" fill="#888888"/></svg>'),Wo=Qe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.6 16.6L10 18l6-6-6-6-1.4 1.4L13.2 12z" fill="#888888"/></svg>'),Ze=30,Le=520,Ps=72,nr=Ps+Ze,ve=Ze+Ps/2,_s=14,mt=40,gt=26,qe=6,Ss=26,ar=14,ei=ar/2,lr=20,ti=lr/2,yt=50,Ts=32,ri={borderOpacity:.65},je=class extends Ye{#e=0;#t=0;constructor(e){let r=.86*(nr/Le);super(e,{pixelWidth:Le,pixelHeight:nr,worldWidth:.86,worldHeight:r,quadY:-.3,cursorFactory:i=>{let n=new i.Mesh(new i.CircleGeometry(4,32),new i.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#r().catch(i=>{})}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:o="0:00 / 0:00",presetName:a=null,sceneText:l=null,sceneLabel:h=null}){let c=this._sig;if(c&&(this._updatePlayback(c,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),c.timeT.value=o,c.presetT&&a!=null&&(c.presetT.value=a),l!=null&&(c.sceneT.value=l),h!=null)){let p=String(h);c.sceneSub.value=p.length>Ts?`${p.slice(0,Ts-2)}...`:p}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-this.#e)/this.#t));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=this.#t*e;t.fillW.value=Math.max(.001,r),t.thumbL.value=this.#e+r-ei,t.thumbGlowL.value=this.#e+r-ti}async#r(){let e=this._quad,t=_s,r=ve-mt/2,i=Le-_s-gt,n=ve-gt/2,o=i-10,a=66,l=24,h=o-a,c=ve-l/2;o=h-8;let p=78,u=o-p,d=ve-9,f=this.#e=t+mt+12,m=this.#t=u-10-f,g=this._sig={...this._createBaseSignals(),fillW:be(.001),thumbL:be(f-ei),thumbGlowL:be(f-ti),thumbS:be(1),thumbGlowOp:be(0),timeT:be("0:00 / 0:00"),sceneT:be("1/1"),sceneSub:be("SCENE"),presetT:be("Off")},x=()=>{g.thumbGlowOp.value=.5,g.thumbS.value=1.15},b=()=>{e.dragging||(g.thumbGlowOp.value=0,g.thumbS.value=1)},E=v=>{v.target.setPointerCapture(v.pointerId),e.dragging=!0,this._seekFromEvent(v)},w=v=>{e.dragging&&this._seekFromEvent(v)},T=()=>{e.dragging=!1,g.thumbGlowOp.value=0,g.thumbS.value=1},S={backgroundColor:1710618},B=or(Xo,{backgroundColor:657930,backgroundOpacity:.88,children:[or(V,{positionType:"absolute",positionLeft:0,positionTop:0,width:Le,height:nr,display:g.contentD,borderWidth:1,borderColor:3355443,borderOpacity:.3,children:[F(V,{positionType:"absolute",positionLeft:0,positionTop:0,width:yt,height:Ze,hover:S,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(-1),children:F(Ae,{src:Ho,width:18,height:18,pointerEvents:"none"})}),or(V,{positionType:"absolute",positionLeft:yt,positionTop:0,width:Le-yt*2,height:Ze,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,overflow:"hidden",children:[F(sr,{fontSize:13,color:11184810,children:g.sceneT}),F(sr,{fontSize:10,color:6710886,children:g.sceneSub})]}),F(V,{positionType:"absolute",positionLeft:Le-yt,positionTop:0,width:yt,height:Ze,hover:S,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(1),children:F(Ae,{src:Wo,width:18,height:18,pointerEvents:"none"})}),F(V,{positionType:"absolute",positionLeft:0,positionTop:Ze,width:Le,height:.5,backgroundColor:3355443,backgroundOpacity:.5,pointerEvents:"none"}),or(V,{positionType:"absolute",positionLeft:t,positionTop:r,width:mt,height:mt,borderRadius:mt/2,borderWidth:1,borderColor:4473924,borderOpacity:.5,hover:ri,alignItems:"center",justifyContent:"center",onClick:()=>this.onPlayPause?.(),children:[F(Ae,{display:g.playD,src:Do,width:20,height:20,marginLeft:2,pointerEvents:"none"}),F(Ae,{display:g.pauseD,src:Uo,width:18,height:18,pointerEvents:"none"}),F(Ae,{display:g.spinD,src:ws,width:24,height:24,transformRotateZ:g.spinR,pointerEvents:"none"})]}),F(V,{positionType:"absolute",positionLeft:f,positionTop:ve-Ss/2,width:m,height:Ss,onPointerEnter:x,onPointerLeave:b,onPointerDown:E,onPointerMove:w,onPointerUp:T}),F(V,{positionType:"absolute",positionLeft:f,positionTop:ve-qe/2,width:m,height:qe,borderRadius:qe/2,backgroundColor:2236962,backgroundOpacity:.8,pointerEvents:"none"}),F(V,{positionType:"absolute",positionLeft:f,positionTop:ve-qe/2,width:g.fillW,height:qe,borderRadius:qe/2,backgroundColor:7829367,display:g.fillD,zIndexOffset:1,pointerEvents:"none"}),F(V,{positionType:"absolute",positionLeft:g.thumbGlowL,positionTop:ve-lr/2,width:lr,height:lr,borderRadius:ti,borderWidth:2,borderColor:10066329,borderOpacity:g.thumbGlowOp,zIndexOffset:2,pointerEvents:"none"}),F(V,{positionType:"absolute",positionLeft:g.thumbL,positionTop:ve-ar/2,width:ar,height:ar,borderRadius:ei,backgroundColor:11184810,transformScaleX:g.thumbS,transformScaleY:g.thumbS,zIndexOffset:3,pointerEvents:"none"}),F(V,{positionType:"absolute",positionLeft:u,positionTop:d,width:p,height:18,alignItems:"center",justifyContent:"center",children:F(sr,{fontSize:13,color:16777215,opacity:.35,children:g.timeT})}),F(V,{positionType:"absolute",positionLeft:i,positionTop:n,width:gt,height:gt,borderRadius:gt/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:ri,alignItems:"center",justifyContent:"center",onClick:()=>this.onExit?.(),children:F(Ae,{src:Vo,width:11,height:11,pointerEvents:"none"})}),F(V,{positionType:"absolute",positionLeft:h,positionTop:c,width:a,height:l,borderRadius:l/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:ri,alignItems:"center",justifyContent:"center",onClick:()=>this.onPresetCycle?.(),children:F(sr,{fontSize:11,color:10066329,pointerEvents:"none",children:g.presetT})})]}),F(V,{positionType:"absolute",positionLeft:0,positionTop:0,width:Le,height:nr,backgroundColor:657930,backgroundOpacity:1,display:g.loadingD,alignItems:"center",justifyContent:"center",children:F(Ae,{src:ws,width:40,height:40,transformRotateZ:g.spinR,pointerEvents:"none"})})]});await e.mountReact(B)}};var $e=class{#e;#t;#r=null;#i=null;#s;#o;#n;#a;constructor(e,t){this.#e=e,this.#t=t;let r=t.scene,i=new e.BufferGeometry().setFromPoints([new e.Vector3(0,0,0),new e.Vector3(0,0,-5)]),n=new e.SphereGeometry(.015,6,6);this.#s=new e.MeshBasicMaterial({color:16711680,depthTest:!1}),this.#o=new e.MeshBasicMaterial({color:65280,depthTest:!1});let o=()=>{let a=new e.Group,l=new e.Group,h=new e.Line(i,new e.LineBasicMaterial({color:5227511,transparent:!0,opacity:.5,depthTest:!1}));h.visible=!1,a.add(h);let c=new e.Mesh(n,this.#s),p=new e.Mesh(n,this.#s);return c.renderOrder=p.renderOrder=999,c.visible=p.visible=!1,r.add(a,l,c,p),{ray:a,grip:l,line:h,idxSphere:c,thmSphere:p}};this.#n=o(),this.#a=o()}update(e,t){this.#h(),this.#l(this.#n,e),this.#l(this.#a,t)}dispose(){this.#r&&(this.#t.anchor.remove(this.#r),this.#r.geometry.dispose(),this.#r.material.dispose());for(let e of[this.#n,this.#a])e.line.material.dispose(),e.idxSphere.geometry.dispose(),e.thmSphere.geometry.dispose();this.#s.dispose(),this.#o.dispose()}#h(){let e=this.#t.bboxMesh;if(e===this.#i)return;this.#i=e;let t=this.#t.anchor;if(this.#r&&(t.remove(this.#r),this.#r.geometry.dispose(),this.#r.material.dispose(),this.#r=null),!e)return;let r=this.#e;this.#r=new r.LineSegments(new r.EdgesGeometry(e.geometry),new r.LineBasicMaterial({color:58879,transparent:!0,opacity:.35,depthTest:!1})),this.#r.position.copy(e.position),t.add(this.#r)}#l(e,t){if(t.rayTransform&&this.#c(e.ray,t.rayTransform),t.gripTransform&&this.#c(e.grip,t.gripTransform),e.line.visible=t.active,e.idxSphere.visible=e.thmSphere.visible=!1,!t.active)return;t.indexTip&&(e.idxSphere.position.set(t.indexTip.x,t.indexTip.y,t.indexTip.z),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0)),t.thumbTip&&(e.thmSphere.position.set(t.thumbTip.x,t.thumbTip.y,t.thumbTip.z),e.thmSphere.visible=!0,e.thmSphere.updateMatrixWorld(!0)),t.indexTip||(e.idxSphere.position.copy(e.grip.position),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0));let r=t.gripping?this.#o:this.#s;e.idxSphere.material=r,t.thumbTip&&(e.thmSphere.material=r)}#c(e,t){let r=t.position,i=t.orientation;e.position.set(r.x,r.y,r.z),e.quaternion.set(i.x,i.y,i.z,i.w),e.updateMatrixWorld(!0)}};import{signal as X}from"@preact/signals-core";import{Container as A,Fullscreen as Yo,Svg as D,Text as ie}from"@react-three/uikit";import{jsx as y,jsxs as fe}from"react/jsx-runtime";var G=9684710,ue=1122603,qo=661021,z=680,ze=248,le=34,_e=48,we=le+_e,Rs=_e,xt=26,Fe=ze+Rs,Ms=32,W=88,Ge=60,Be=ze-Ge,Ie=(z-W)/6,de=Math.round(z/3),ks=12,he=34,bt=W+ks,As=z-W-ks*2,hr=we+50,Es=As-he,H=s=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${s}" fill="#93c6e6"/></svg>`),U={play:H("M8 5v14l11-7z"),pause:H("M6 4h4v16H6zm8 0h4v16h-4z"),spin:H("M12 2a10 10 0 1 1-10 10h3a7 7 0 1 0 7-7z"),bulb:H("M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"),mute:H("M7 9v6h4l5 5V4l-5 5H7z"),vol:H("M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"),reset:H("M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"),exit:H("M17 7l-1.4 1.4L18.2 11H8v2h10.2l-2.6 2.6L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"),grip:H("M15.5 15.4V8.6L18.9 12l-3.4 3.4zM8.5 8.6v6.8L5.1 12l3.4-3.4z"),close:H("M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"),scale:H("M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z"),lock:H("M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"),unlk:H("M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"),arrL:H("M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"),arrR:H("M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z")},vt={backgroundColor:1849416},Cs=.9,Zo=-.55,Ls=.866,Ke=class extends Ye{#e;#t=null;#r;#i;onMuteToggle=null;onScaleLockToggle=null;onLockToggle=null;onReset=null;constructor(e){super(e,{pixelWidth:z,pixelHeight:Fe,worldWidth:1,worldHeight:Fe/z,quadZ:Cs,quadY:Zo,cursorFactory:t=>{let r=new t.Mesh(new t.CircleGeometry(5,32),new t.MeshBasicMaterial({color:G,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return r.renderOrder=999,r}}),this.#e=e,this.#r=new e.Vector3,this.#i=new e.Quaternion,this._quad.alpha=.9,this._quad.onDragTick=(t,r,i,n,o)=>this.#s(t,r,i,n,o),this._quad.onDragEnd=()=>{this.#t=null,this._quad.alpha=.9},this.#o().catch(t=>{})}#s(e,t,r,i,n){let o=this.#e,a=this.#t,l=a?.side??i??"right",h=l==="left"?e:t;if(!h?.triggerPressed)return this.#t=null,null;let c=h.rayTransform?.orientation;if(!c){let T=n.position,S=n.orientation;return{x:T.x,y:T.y,z:T.z,qx:S.x,qy:S.y,qz:S.z,qw:S.w}}let p=this.#r.set(0,0,-1).applyQuaternion(this.#i.set(c.x,c.y,c.z,c.w));if(!a){let T=r.transform.position,S=new o.Vector3(T.x,T.y,T.z),B=n.position,v=new o.Vector3(B.x,B.y,B.z).sub(S);this.#t={side:l,R:v.length()||Cs,oQ:new o.Quaternion().setFromUnitVectors(p.clone(),v.normalize()),eye:S};let k=n.orientation;return{x:B.x,y:B.y,z:B.z,qx:k.x,qy:k.y,qz:k.z,qw:k.w}}if(p.applyQuaternion(a.oQ),Math.abs(p.y)>Ls){p.y=Math.sign(p.y)*Ls;let T=Math.sqrt(p.x*p.x+p.z*p.z)||1e-6,S=Math.sqrt(1-p.y*p.y)/T;p.x*=S,p.z*=S}let u=a.eye,d=a.R,f=u.x+p.x*d,m=u.y+p.y*d,g=u.z+p.z*d,{qx:x,qy:b,qz:E,qw:w}=Jr(p.x,p.y,p.z);return{x:f,y:m,z:g,qx:x,qy:b,qz:E,qw:w}}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:o="0:00 / 0:00",presetName:a=null,muted:l=!1,locked:h=!1,scaleLocked:c=!0,sceneText:p=null,sceneLabel:u=null,bannerText:d=null}){let f=this._sig;if(f){if(this._updatePlayback(f,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),f.playTextD.value=r?"none":"flex",f.playLbl.value=t?"PAUSE":"PLAY",f.timeT.value=o,a!=null&&(f.presetT.value=a),f.icA.value=l?"none":"flex",f.icB.value=l?"flex":"none",f.muteLbl.value=l?"UNMUTE":"MUTE",f.sclLkLbl.value=c?"UNLOCK SCALE":"LOCK SCALE",f.lockA.value=h?"none":"flex",f.lockB.value=h?"flex":"none",f.lockLbl.value=h?"UNLOCK SCENE":"LOCK SCENE",p!=null&&(f.sceneT.value=p),u!=null){let m=String(u);f.sceneSub.value=m.length>Ms?`${m.slice(0,Ms-2)}...`:m}d!=null&&(f.bannerT.value=d)}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-bt-he/2)/Es));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=Es*e;t.thumbL.value=bt+r-2,t.fillW.value=Math.max(he,he+r)}async#o(){let e=this._sig={...this._createBaseSignals(),playTextD:X("flex"),playLbl:X("PAUSE"),fillW:X(he),thumbL:X(bt-2),thumbS:X(1),timeT:X("0:00 / 0:00"),sceneT:X("1/5"),sceneSub:X("SCENE"),icA:X("flex"),icB:X("none"),muteLbl:X("MUTE"),sclLkLbl:X("LOCK SCALE"),lockA:X("flex"),lockB:X("none"),lockLbl:X("LOCK SCENE"),presetT:X("OFF"),bannerT:X("")},t=({x:d,y:f,w:m,h:g})=>y(A,{positionType:"absolute",positionLeft:d,positionTop:f,width:m,height:g,backgroundColor:G,backgroundOpacity:.3}),r=({idx:d,onClick:f,children:m})=>{let g=W+d*Ie;return y(A,{positionType:"absolute",positionLeft:g,positionTop:Be,width:Ie,height:Ge,backgroundColor:ue,hover:vt,onClick:f,children:y(A,{width:"100%",height:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",children:m})})},i=this._quad,n=()=>{e.thumbS.value=1.08},o=()=>{i.dragging||(e.thumbS.value=1)},a=d=>{d.target.setPointerCapture(d.pointerId),i.dragging=!0,this._seekFromEvent(d)},l=d=>{i.dragging&&this._seekFromEvent(d)},h=()=>{i.dragging=!1,e.thumbS.value=1},c=d=>{d.target.setPointerCapture(d.pointerId),i.panelDragging=!0,i.alpha=.3},p=()=>{i.panelDragging=!1},u=fe(Yo,{backgroundColor:ue,children:[fe(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:Fe,display:e.contentD,children:[y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:le,backgroundColor:G,backgroundOpacity:.85}),y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:le,alignItems:"center",justifyContent:"center",children:y(ie,{fontSize:13,fontWeight:"bold",color:ue,children:e.bannerT})}),y(A,{positionType:"absolute",positionLeft:0,positionTop:le,width:de,height:_e,backgroundColor:ue,hover:vt,onClick:()=>this.onSceneNav?.(-1)}),y(A,{positionType:"absolute",positionLeft:0,positionTop:le,width:de,height:_e,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:y(D,{src:U.arrL,width:28,height:28})}),y(t,{x:de,y:le,w:.5,h:_e}),fe(A,{positionType:"absolute",positionLeft:de,positionTop:le,width:z-de*2,height:_e,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,overflow:"hidden",children:[y(ie,{fontSize:22,color:G,children:e.sceneT}),y(ie,{fontSize:10,color:G,opacity:.45,children:e.sceneSub})]}),y(t,{x:z-de,y:le,w:.5,h:_e}),y(A,{positionType:"absolute",positionLeft:z-de,positionTop:le,width:de,height:_e,backgroundColor:ue,hover:vt,onClick:()=>this.onSceneNav?.(1)}),y(A,{positionType:"absolute",positionLeft:z-de,positionTop:le,width:de,height:_e,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:y(D,{src:U.arrR,width:28,height:28})}),y(t,{x:0,y:we,w:z,h:.5}),y(A,{positionType:"absolute",positionLeft:0,positionTop:we,width:W,height:ze-we,backgroundColor:ue,hover:vt,onClick:()=>this.onPlayPause?.()}),fe(A,{positionType:"absolute",positionLeft:0,positionTop:we,width:W,height:ze-we,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,pointerEvents:"none",children:[y(D,{display:e.playD,src:U.play,width:20,height:24,marginLeft:2}),y(D,{display:e.pauseD,src:U.pause,width:20,height:24}),y(D,{display:e.spinD,src:U.spin,width:28,height:28,transformRotateZ:e.spinR}),y(ie,{fontSize:13,fontWeight:"bold",color:G,display:e.playTextD,children:e.playLbl})]}),y(t,{x:W,y:we,w:.5,h:ze-we}),y(A,{positionType:"absolute",positionLeft:W+16,positionTop:we+14,width:120,height:20,children:y(ie,{fontSize:14,color:G,children:e.timeT})}),y(A,{positionType:"absolute",positionLeft:bt,positionTop:hr,width:As,height:he,backgroundColor:qo,onPointerEnter:n,onPointerLeave:o,onPointerDown:a,onPointerMove:l,onPointerUp:h}),y(A,{positionType:"absolute",positionLeft:bt,positionTop:hr,width:e.fillW,height:he,backgroundColor:G,backgroundOpacity:.85,display:e.fillD,zIndexOffset:1,pointerEvents:"none"}),y(A,{positionType:"absolute",positionLeft:e.thumbL,positionTop:hr-2,width:he+4,height:he+4,backgroundColor:ue,borderWidth:2,borderColor:G,borderOpacity:.5,zIndexOffset:3,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none"}),y(A,{positionType:"absolute",positionLeft:e.thumbL,positionTop:hr-2,width:he+4,height:he+4,alignItems:"center",justifyContent:"center",zIndexOffset:4,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none",children:y(D,{src:U.grip,width:18,height:18})}),y(t,{x:W,y:Be,w:z-W,h:.5}),fe(r,{idx:0,onClick:()=>this.onPresetCycle?.(),children:[y(D,{src:U.bulb,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:G,children:e.presetT})]}),y(t,{x:W+Ie,y:Be,w:.5,h:Ge}),fe(r,{idx:1,onClick:()=>this.onMuteToggle?.(),children:[y(D,{display:e.icA,src:U.mute,width:20,height:20}),y(D,{display:e.icB,src:U.vol,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:G,children:e.muteLbl})]}),y(t,{x:W+Ie*2,y:Be,w:.5,h:Ge}),fe(r,{idx:2,onClick:()=>this.onScaleLockToggle?.(),children:[y(D,{src:U.scale,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:G,children:e.sclLkLbl})]}),y(t,{x:W+Ie*3,y:Be,w:.5,h:Ge}),fe(r,{idx:3,onClick:()=>this.onLockToggle?.(),children:[y(D,{display:e.lockA,src:U.unlk,width:20,height:20}),y(D,{display:e.lockB,src:U.lock,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:G,children:e.lockLbl})]}),y(t,{x:W+Ie*4,y:Be,w:.5,h:Ge}),fe(r,{idx:4,onClick:()=>this.onReset?.(),children:[y(D,{src:U.reset,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:G,children:"RESET SCENE"})]}),y(t,{x:W+Ie*5,y:Be,w:.5,h:Ge}),fe(r,{idx:5,onClick:()=>this.onExit?.(),children:[y(D,{src:U.exit,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:G,children:"EXIT"})]}),y(t,{x:0,y:ze,w:z,h:.5}),y(A,{positionType:"absolute",positionLeft:0,positionTop:ze+1,width:z,height:Rs-1,backgroundColor:ue,hover:vt,alignItems:"center",justifyContent:"center",onPointerDown:c,onPointerUp:p,children:y(ie,{fontSize:12,color:G,opacity:.45,pointerEvents:"none",children:"DRAG TO MOVE THE MENU"})}),y(A,{positionType:"absolute",positionLeft:z-xt-4,positionTop:(le-xt)/2,width:xt,height:xt,borderRadius:xt/2,backgroundColor:ue,backgroundOpacity:.8,borderWidth:1,borderColor:G,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",zIndexOffset:10,onClick:()=>this.onClose?.(),children:y(D,{src:U.close,width:12,height:12,pointerEvents:"none"})}),y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:.5,backgroundColor:G,backgroundOpacity:.3,zIndexOffset:10}),y(A,{positionType:"absolute",positionLeft:0,positionTop:Fe-.5,width:z,height:.5,backgroundColor:G,backgroundOpacity:.3,zIndexOffset:10}),y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:.5,height:Fe,backgroundColor:G,backgroundOpacity:.3,zIndexOffset:10}),y(A,{positionType:"absolute",positionLeft:z-.5,positionTop:0,width:.5,height:Fe,backgroundColor:G,backgroundOpacity:.3,zIndexOffset:10})]}),y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:Fe,backgroundColor:ue,backgroundOpacity:1,display:e.loadingD,alignItems:"center",justifyContent:"center",children:y(D,{src:U.spin,width:64,height:64,transformRotateZ:e.spinR,pointerEvents:"none"})})]});await i.mountReact(u)}};var Je=class{#e;#t;#r;#i=null;#s;#o;#n;constructor(e){this.#e=e,this.#t=new e.Scene,this.#r=new e.Group,this.#t.add(this.#r),this.#s=new e.Vector3,this.#o=new e.Vector3,this.#n=new e.Raycaster}get scene(){return this.#t}get anchor(){return this.#r}get bboxMesh(){return this.#i}get hasBBox(){return!!this.#i}rebuildBBox(e,t){let r=this.#e;this.#i&&(this.#r.remove(this.#i),this.#i.geometry.dispose(),this.#i.material.dispose());let i=(e.minX+e.maxX)/2,n=(e.minY+e.maxY)/2,o=(e.minZ+e.maxZ)/2,a=new r.Box3(new r.Vector3(e.minX,e.minY,e.minZ),new r.Vector3(e.maxX,e.maxY,e.maxZ)).applyMatrix4(new r.Matrix4().fromArray(t)),l=a.getSize(new r.Vector3).max(new r.Vector3(.1,.1,.1)),h=a.getCenter(new r.Vector3),c=new r.BoxGeometry(l.x,l.y,l.z);return this.#i=new r.Mesh(c,new r.MeshBasicMaterial({visible:!1,side:r.DoubleSide})),this.#i.position.copy(h),this.#r.add(this.#i),{cx:i,cy:n,cz:o}}applyTransform(e,t){this.#r.position.set(e[0],e[1],e[2]),this.#r.scale.set(t,t,-t),this.#r.quaternion.identity(),this.#r.updateMatrixWorld(!0)}hitTest(e){if(!this.#i)return!1;let t=e.position,r=e.orientation;return this.#s.set(t.x,t.y,t.z),this.#o.set(-2*(r.w*r.y+r.x*r.z),-2*(r.y*r.z-r.w*r.x),2*(r.x*r.x+r.y*r.y)-1),this.#n.set(this.#s,this.#o),this.#n.intersectObject(this.#i,!1).length>0}};var Is=`
struct Draw { mvp: mat4x4f, prevMvp: mat4x4f, color: vec4f }
@group(0) @binding(0) var<uniform> draw: Draw;`,jo=`${Is}
@group(1) @binding(0) var panelTex: texture_2d<f32>;
@group(1) @binding(1) var panelSampler: sampler;

const QUAD = array(vec2f(-0.5, -0.5), vec2f(0.5, -0.5), vec2f(0.5, 0.5),
                   vec2f(-0.5, -0.5), vec2f(0.5, 0.5), vec2f(-0.5, 0.5));
fn panelUV(p: vec2f) -> vec2f { return vec2f(p.x + 0.5, 0.5 - p.y); } // canvas rows run top-down

struct PanelOut { @builtin(position) pos: vec4f, @location(0) uv: vec2f }

@vertex fn vs(@builtin(vertex_index) i: u32) -> PanelOut {
    let p = QUAD[i];
    return PanelOut(draw.mvp * vec4f(p, 0.0, 1.0), panelUV(p));
}

@fragment fn fs(in: PanelOut) -> @location(0) vec4f {
    let c = textureSample(panelTex, panelSampler, in.uv);
    return vec4f(c.rgb, c.a * draw.color.a);
}

// Space-warp: NDC motion since last frame (this frame's minus last frame's view,
// projection and pose, like the splats) plus depth, where the panel is opaque
// enough to be what the eye sees.
struct MotionOut {
    @builtin(position) pos: vec4f,
    @location(0) uv: vec2f,
    @location(1) clipNew: vec4f,
    @location(2) clipOld: vec4f,
}

@vertex fn vs_motion(@builtin(vertex_index) i: u32) -> MotionOut {
    let p = QUAD[i];
    let clipNew = draw.mvp * vec4f(p, 0.0, 1.0);
    return MotionOut(clipNew, panelUV(p), clipNew, draw.prevMvp * vec4f(p, 0.0, 1.0));
}

@fragment fn fs_motion(in: MotionOut) -> @location(0) vec4f {
    if (textureSample(panelTex, panelSampler, in.uv).a * draw.color.a < 0.25) { discard; }
    return vec4f(in.clipNew.xy / in.clipNew.w - in.clipOld.xy / in.clipOld.w, 0.0, 1.0);
}`,Qo=`${Is}
struct MeshOut { @builtin(position) pos: vec4f, @location(0) color: vec4f }

@vertex fn vs_plain(@location(0) p: vec3f) -> MeshOut {
    return MeshOut(draw.mvp * vec4f(p, 1.0), draw.color);
}
@vertex fn vs_color(@location(0) p: vec3f, @location(1) c: vec4f) -> MeshOut {
    return MeshOut(draw.mvp * vec4f(p, 1.0), draw.color * c);
}
@fragment fn fs(in: MeshOut) -> @location(0) vec4f { return in.color; }`,Fs={color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}},et=256,Bs=36,ii=(s,e)=>s.createView({dimension:"2d",baseArrayLayer:e,arrayLayerCount:1}),$o=s=>s.isMesh?"triangle-list":s.isLineSegments?"line-list":s.isLine?"line-strip":null,cr=class{#e;#t;#r;#i;#s;#o;#n=new Map;#a;#h=new Map;#l;#c=null;#p=null;#u=0;#d=new WeakMap;#f;#m;#g=[];#b=null;constructor(e,t,r){this.#e=t,this.#t=r,this.#f=new e.Matrix4,this.#m=new e.Matrix4,this.#r=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{hasDynamicOffset:!0,minBindingSize:Bs*4}}]}),this.#i=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]}),this.#l=t.createSampler({magFilter:"linear",minFilter:"linear"});let i=this.#s=t.createShaderModule({code:jo});this.#o=t.createRenderPipeline({layout:this.#v(),vertex:{module:i,entryPoint:"vs"},fragment:{module:i,entryPoint:"fs",targets:[{format:r,blend:Fs}]},primitive:{topology:"triangle-list",cullMode:"none"}}),this.#a=t.createShaderModule({code:Qo})}createPanelTexture(e,t){let r=this.#e.createTexture({size:[e,t],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),i=this.#e.createBindGroup({layout:this.#i,entries:[{binding:0,resource:r.createView()},{binding:1,resource:this.#l}]});return{texture:r,bind:i}}uploadPanel(e,t){let r=Math.min(t.width,e.texture.width),i=Math.min(t.height,e.texture.height);this.#e.queue.copyExternalImageToTexture({source:t},{texture:e.texture,premultipliedAlpha:!1},[r,i])}render(e,{panel:t=null,scene:r=null}){let i=r?this.#w(r):[],n=t?e.filter(u=>u.motion).length:0,o=(i.length+(t?1:0))*e.length+n;o&&this.#E(o);let a=new Float32Array(et/4*o),l=0,h=(u,[d,f,m,g],x=null,b=null)=>{let E=l*(et/4);return a.set(this.#m.multiplyMatrices(this.#f,u).elements,E),x&&a.set(this.#m.multiplyMatrices(x,b).elements,E+16),a.set([d,f,m,g],E+32),l++},c=e.map((u,d)=>{let f=u.view;this.#f.fromArray(f.projectionMatrix),this.#f.multiply(this.#m.fromArray(f.transform.inverse.matrix));let m=this.#g[d]??=this.#f.clone(),g=[1,1,1,t?.alpha??1],x={eye:u,panelSlot:t?h(t.model,g):-1,slots:i.map(b=>h(b.object.matrixWorld,b.color)),motionSlot:t&&u.motion?h(t.model,g,m,this.#b??t.model):-1};return m.copy(this.#f),x});if(this.#b=t?(this.#b??t.model.clone()).copy(t.model):null,!o)return;this.#e.queue.writeBuffer(this.#c,0,a);let p=this.#e.createCommandEncoder({label:"XROverlay"});for(let{eye:u,panelSlot:d,slots:f}of c){let m=p.beginRenderPass({colorAttachments:[{view:ii(u.texture,u.layer),loadOp:"load",storeOp:"store"}]}),g=u.viewport;m.setViewport(g.x,g.y,g.width,g.height,0,1),t&&(m.setPipeline(this.#o),m.setBindGroup(0,this.#p,[d*et]),m.setBindGroup(1,t.bind),m.draw(6)),i.forEach((x,b)=>{m.setPipeline(x.pipeline),m.setBindGroup(0,this.#p,[f[b]*et]),m.setVertexBuffer(0,x.geo.position),x.geo.color&&m.setVertexBuffer(1,x.geo.color),x.geo.index?(m.setIndexBuffer(x.geo.index,x.geo.indexFormat),m.drawIndexed(x.geo.count)):m.draw(x.geo.count)}),m.end()}for(let{eye:u,motionSlot:d}of c)d>=0&&this.#y(p,u.motion,t,d);this.#e.queue.submit([p.finish()])}#y(e,t,r,i){let n=t.depth,o=e.beginRenderPass({colorAttachments:[{view:ii(t.texture,t.layer),loadOp:"load",storeOp:"store"}],...n&&{depthStencilAttachment:{view:ii(n,t.depthLayer??t.layer),depthLoadOp:"load",depthStoreOp:"store"}}}),a=t.viewport;o.setViewport(a.x,a.y,a.width,a.height,0,1),o.setPipeline(this.#x(t.texture.format,n?.format)),o.setBindGroup(0,this.#p,[i*et]),o.setBindGroup(1,r.bind),o.draw(6),o.end()}#x(e,t){let r=`${e}/${t}`,i=this.#n.get(r);return i||(i=this.#e.createRenderPipeline({layout:this.#v(),vertex:{module:this.#s,entryPoint:"vs_motion"},fragment:{module:this.#s,entryPoint:"fs_motion",targets:[{format:e}]},primitive:{topology:"triangle-list",cullMode:"none"},...t&&{depthStencil:{format:t,depthWriteEnabled:!0,depthCompare:"always"}}}),this.#n.set(r,i),i)}#v(){return this.#e.createPipelineLayout({bindGroupLayouts:[this.#r,this.#i]})}dispose(){this.#c?.destroy(),this.#c=this.#p=null,this.#h.clear(),this.#n.clear()}#w(e){e.updateMatrixWorld();let t=[];return e.traverseVisible(r=>{let i=r.material,n=$o(r);if(!n||!i||Array.isArray(i)||i.visible===!1)return;let o=this.#T(r.geometry,!!i.vertexColors);if(!o)return;let a=i.color??{r:1,g:1,b:1};t.push({object:r,geo:o,pipeline:this.#P(n,o),transparent:!!i.transparent,order:r.renderOrder??0,color:[a.r,a.g,a.b,i.transparent?i.opacity:1]})}),t.sort((r,i)=>Number(r.transparent)-Number(i.transparent)||r.order-i.order)}#T(e,t){let r=e?.attributes?.position;if(!r||r.isInterleavedBufferAttribute)return null;let i=t?e.attributes.color:null,n=this.#d.get(e),o=`${r.version}/${i?.version??-1}/${e.index?.version??-1}`;return n&&n.version===o||(n?.destroy(),n={version:o,position:this.#S(r.array,GPUBufferUsage.VERTEX),color:i?this.#S(i.array,GPUBufferUsage.VERTEX):null,colorFormat:i?i.itemSize===4?"float32x4":"float32x3":null,index:e.index?this.#S(e.index.array,GPUBufferUsage.INDEX):null,indexFormat:e.index?.array instanceof Uint32Array?"uint32":"uint16",count:Math.min(e.index?e.index.count:r.count,e.drawRange?.count??1/0),destroy(){this.position.destroy(),this.color?.destroy(),this.index?.destroy()}},this.#d.set(e,n)),n}#S(e,t){let r=Math.ceil(e.byteLength/4)*4,i=this.#e.createBuffer({size:r,usage:t,mappedAtCreation:!0});return new Uint8Array(i.getMappedRange()).set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),i.unmap(),i}#P(e,t){let r=e==="line-strip"&&t.index?t.indexFormat:void 0,i=`${e}/${t.colorFormat}/${r}`,n=this.#h.get(i);if(n)return n;let o=[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]}];return t.colorFormat&&o.push({arrayStride:t.colorFormat==="float32x4"?16:12,attributes:[{shaderLocation:1,offset:0,format:t.colorFormat}]}),n=this.#e.createRenderPipeline({layout:this.#e.createPipelineLayout({bindGroupLayouts:[this.#r]}),vertex:{module:this.#a,entryPoint:t.colorFormat?"vs_color":"vs_plain",buffers:o},fragment:{module:this.#a,entryPoint:"fs",targets:[{format:this.#t,blend:Fs}]},primitive:{topology:e,cullMode:"none",stripIndexFormat:r}}),this.#h.set(i,n),n}#E(e){e<=this.#u||(this.#u=Math.max(e,this.#u*2,32),this.#c?.destroy(),this.#c=this.#e.createBuffer({size:this.#u*et,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.#p=this.#e.createBindGroup({layout:this.#r,entries:[{binding:0,resource:{buffer:this.#c,size:Bs*4}}]}))}};var tt=class s{#e;#t;#r;#i;#s;#o;static#n=1.5;static#a=.04;static#h=.15;static#l=4;static#c=20;static#p=.003;static#u=.001;static#d=.7;constructor(e,t){this.#e=e,this.#t=this.#f(),this.#r=this.#f(),this.#i=this.#m(),this.#s=this.#m(),this.#o=new e.Vector3,t.add(this.#t.group,this.#r.group,this.#i,this.#s)}update(e,t,r,i=!0){this.#g(this.#t,this.#i,i?e:null,r?.[0]),this.#g(this.#r,this.#s,i?t:null,r?.[1])}dispose(){for(let e of[this.#t,this.#r])e.mesh.geometry.dispose(),e.mesh.material.dispose();for(let e of[this.#i,this.#s])e.geometry.dispose(),e.material.dispose()}#f(){let e=this.#e,t=s.#l,r=s.#c,i=s.#n,n=s.#a,o=s.#h,a=s.#p,l=s.#u,h=s.#d,c=r+1,p=t+1,u=c*p,d=new Float32Array(u*3),f=new Float32Array(u*4),m=[];for(let w=0;w<c;w++){let T=w/r,S=-n-T*i,B=a+(l-a)*T,v=Math.min(T/o,1),k=1-T,q=h*v*k;for(let Y=0;Y<=t;Y++){let N=Y/t*Math.PI*2,C=w*p+Y;d[C*3]=Math.cos(N)*B,d[C*3+1]=Math.sin(N)*B,d[C*3+2]=S,f[C*4]=1,f[C*4+1]=1,f[C*4+2]=1,f[C*4+3]=q}}for(let w=0;w<r;w++)for(let T=0;T<t;T++){let S=w*p+T,B=S+1,v=S+p,k=v+1;m.push(S,v,B,B,v,k)}let g=new e.BufferGeometry;g.setAttribute("position",new e.BufferAttribute(d,3)),g.setAttribute("color",new e.BufferAttribute(f,4)),g.setIndex(m);let x=new e.MeshBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),b=new e.Mesh(g,x);b.frustumCulled=!1,b.renderOrder=998;let E=new e.Group;return E.add(b),E.visible=!1,{mesh:b,group:E}}#m(){let e=this.#e,t=new e.RingGeometry(.004,.008,24),r=new e.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),i=new e.Mesh(t,r);return i.frustumCulled=!1,i.renderOrder=999,i.visible=!1,i}#g(e,t,r,i){if(!r?.active||!r.rayTransform||r.isTransientPointer){e.group.visible=!1,t.visible=!1;return}let n=r.rayTransform.position,o=r.rayTransform.orientation;e.group.position.set(n.x,n.y,n.z),e.group.quaternion.set(o.x,o.y,o.z,o.w),e.group.visible=!0,e.group.updateMatrixWorld(!0);let a=r.triggerPressed??!1;if(e.mesh.material.color.setRGB(a?.4:1,a?.75:1,1),i?.visible){let l=this.#o.set(n.x,n.y,n.z).distanceTo(i.position),h=s.#a+s.#n;e.mesh.scale.z=Math.min(1,l/h),t.position.copy(i.position),t.quaternion.set(o.x,o.y,o.z,o.w),t.visible=!0,t.updateMatrixWorld(!0)}else e.mesh.scale.z=1,t.visible=!1}};var rt=Object.keys(ct),Gs=s=>!Number.isFinite(s)||s<0?"0:00":`${~~(s/60)}:${String(~~s%60).padStart(2,"0")}`,si=s=>s.toUpperCase();var it=class{#e;#t;#r;#i=null;#s=null;#o=null;#n=null;#a=null;#h=null;#l=null;#c=0;#p=0;#u=0;#d=rt.indexOf("off");#f=si("off");#m=1;#g=!1;#b=!0;#y=[];#x=0;#v=!0;#w=null;#T=null;#S=null;#P=null;#E=null;#_=null;#M;#C=null;#R=null;#L=null;constructor(e,{debug:t=!1,uiStyle:r="modern",rays:i=!0}={}){this.#e=e,this.#t=t,this.#r=r,this.#M=i}get uiStyle(){return this.#r}set uiStyle(e){this.#r=e}set manipulator(e){this.#s=e}get manipulator(){return this.#s}get uiActive(){return!this.#v&&(this.#i?.quad.interacting??!1)}get uiDragging(){if(this.#v)return!1;let e=this.#i?.quad;return(e?.dragging||e?.panelDragging)??!1}get quads(){let e=this.#i?.quad;return e?[e]:[]}set sources(e){this.#y=e??[],this.#x=Math.min(this.#x,Math.max(0,this.#y.length-1))}get sources(){return this.#y}set sceneIndex(e){this.#y.length&&(this.#x=Math.max(0,Math.min(this.#y.length-1,e)),this.#v=!0)}get sceneIndex(){return this.#x}set onSceneChange(e){this.#S=e}get onSceneChange(){return this.#S}set onPresetChange(e){this.#T=e}get onPresetChange(){return this.#T}set onLock(e){this.#P=e}get onLock(){return this.#P}set onScaleLock(e){this.#E=e}get onScaleLock(){return this.#E}set bannerText(e){this.#w=e}get bannerText(){return this.#w}set eventLogger(e){this.#_=e}get eventLogger(){return this.#_}setPreset(e,t=this.#m){this.#m=t,this.syncPreset(e),this.#A(this.#o,e,t)}syncPreset(e){let t=rt.indexOf(e);t<0||(this.#d=t,this.#f=si(e))}async init(e,t,r,i,n,o=!1,a=null){this.#o=e;let l=this.#e,h=this.#t||this.#M;this.#i=this.#r==="modern"?new Ke(l):new je(l),this.#k(e,t);let c=h?new Je(l):null;if(this.#L=c,c&&this.#s?.setOverlay(c),this.#g=this.#y[this.#x]?.locked??this.#g,this.#b=this.#y[this.#x]?.scaleLocked??this.#b,this.#s&&(this.#s.locked=this.#g,this.#s.scaleLocked=this.#b),this.#A(e,rt[this.#d],this.#m),c){this.#i.quad.hitMesh&&c.scene.add(this.#i.quad.hitMesh);for(let u of this.#i.quad.hitSpheres)c.scene.add(u);this.#t&&(this.#C=new $e(l,c)),this.#M&&(this.#R=new tt(l,c.scene))}a?this.#l=new cr(l,a.device,a.format):h&&c&&(this.#n=new l.WebGLRenderer({context:n,canvas:n.canvas}),this.#n.autoClear=!1,this.#a=new l.PerspectiveCamera(50,1,.01,1e4),this.#a.matrixAutoUpdate=!1,this.#h=new l.WebGLRenderTarget(1,1),this.#n.setRenderTarget(this.#h),this.#n.setRenderTarget(null));let p=await this.#i.quad.init(t,r,i,n,this.#l);return this.#c=setTimeout(()=>this.#i?.quad.show(),1e3),p?[p]:[]}frame(e,t,r,i,n,o){this.#O(o),this.#i?.quad.updatePosition(i),this.#i?.quad.handleInput(this.#s?.leftHand,this.#s?.rightHand,i),this.#C?.update(this.#s?.leftHand,this.#s?.rightHand),this.#R?.update(this.#s?.leftHand,this.#s?.rightHand,this.#i?.quad.hitSpheres,!!this.#i?.quad.visible),this.#i?.quad.panelDragging&&this.#s?.reset(),this.#G(e,o),this.#i?.render(e),this.#i?.quad.drawContent(t)}renderEye(e,t,r,i,n,o,a){this.#i?.quad.renderEye(e,r,i,n,o,a),!(!this.#n||!this.#L)&&(this.#a.projectionMatrix.fromArray(r.projectionMatrix),this.#a.projectionMatrixInverse.copy(this.#a.projectionMatrix).invert(),this.#a.matrix.fromArray(r.transform.matrix),this.#a.matrixWorld.copy(this.#a.matrix),this.#a.matrixWorldInverse.fromArray(r.transform.inverse.matrix),this.#n.resetState(),this.#n.setRenderTargetFramebuffer(this.#h,t),this.#n.setRenderTarget(this.#h),this.#n.setViewport(i,n,o,a),this.#n.setScissor(i,n,o,a),this.#n.setScissorTest(!0),this.#n.clearDepth(),this.#n.render(this.#L.scene,this.#a),this.#n.resetState(),e.bindFramebuffer(e.FRAMEBUFFER,t))}renderViews(e){this.#l?.render(e,{panel:this.#i?.quad.panelDraw(),scene:this.#L?.scene})}onRefReset(){this.#i?.quad.visible&&this.#i.quad.show()}render(e,t){}dispose(){clearTimeout(this.#c),this.#C?.dispose(),this.#C=null,this.#R?.dispose(),this.#R=null,this.#L=null,this.#n?.dispose(),this.#n=null,this.#h?.dispose(),this.#h=null,this.#a=null,this.#i?.quad.dispose(),this.#i=null,this.#l?.dispose(),this.#l=null,this.#s?.reset(),this.#s=null,this.#p=0}#k(e,t){let r=this.#i;r.onPlayPause=()=>{(e?.isBuffering??!1)||(e?.isPlaying?e.pause():e.play(),this.#_?.event?.("play_pause",{playing:!e?.isPlaying}))},r.onSeek=i=>{e?.seek?.(i*(e?.duration??0)),this.#_?.event?.("seek",{position:i})},r.onPresetCycle=()=>{let i=rt[(this.#d+1)%rt.length];this.#A(e,i,this.#m),this.#T?.(i),this.#_?.event?.("preset_cycle",{preset:i})},r.onExit=()=>{this.#_?.event?.("exit"),t?.end()},r.onClose=()=>{r.quad.hide()},r.onSceneNav=i=>{if(!this.#y.length)return;let n=Math.max(0,Math.min(this.#y.length-1,this.#x+i));n!==this.#x&&(this.#x=n,this.#v=!0,this.#z(),this.#S?.(this.#y[this.#x],this.#x),this.#_?.event?.("scene_nav",{index:n,label:this.#y[n]?.label,dir:i}))},this.#r==="modern"&&(r.onMuteToggle=()=>{let i=this.#B(e);this.#_?.event?.("mute_toggle",{muted:!i})},r.onReset=()=>{this.#s?.resetToInitial(),this.#_?.event?.("reset")},r.onLockToggle=()=>{this.#g=!this.#g,this.#s&&(this.#s.locked=this.#g),this.#P?.(this.#g),this.#_?.event?.("lock_toggle",{locked:this.#g})},r.onScaleLockToggle=()=>{this.#b=!this.#b,this.#s&&(this.#s.scaleLocked=this.#b),this.#E?.(this.#b),this.#_?.event?.("scale_lock_toggle",{scaleLocked:this.#b})})}#z(){this.#g=this.#y[this.#x]?.locked??this.#g,this.#b=this.#y[this.#x]?.scaleLocked??this.#b}#B(e){let t=!(e?.audioEnabled??!1);return t?e?.enableAudio?.():e?.disableAudio?.(),t}#A(e,t,r=1){let i=rt.indexOf(t);if(i<0)return;this.#d=i,this.#f=si(t);let n=ct[t];n?e?.setEnvLighting(Se(n),r):e?.clearEnvLighting()}#O(e){!this.#v||!e.duration||(this.#v=!1,this.#g=this.#y[this.#x]?.locked??this.#g,this.#b=this.#y[this.#x]?.scaleLocked??this.#b)}#G(e,t){let r=!(t?.audioEnabled??!1);if(this.#v)this.#i?.update({loading:!0,muted:r,locked:this.#g,scaleLocked:this.#b,sceneText:this.#y.length?`${this.#x+1}/${this.#y.length}`:"1/1",sceneLabel:(this.#y[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#w});else{let i=t?.isBuffering??!1,n=t?.duration??0;n>0&&(this.#u=n);let o=this.#u,a=t?.currentTime??0,l=Math.max(0,Math.min(1,a/(o||1)));this.#i?.update({loading:!1,playing:t?.isPlaying??!1,spinning:i,buffering:i,progress:l,timeText:`${Gs(a)} / ${Gs(o)}`,presetName:this.#f,muted:r,locked:this.#g,scaleLocked:this.#b,sceneText:this.#y.length?`${this.#x+1}/${this.#y.length}`:"1/1",sceneLabel:(this.#y[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#w})}this.#I(e)}#I(e){if(this.#p>0){this.#p-=e;return}let t=this.#s?.leftHand.microSwipe||this.#s?.rightHand.microSwipe;t&&(this.#p=.45,this.#i?.onSceneNav(t))}};import{useRef as Ko}from"react";import*as Jo from"three";function ea(s){if(s===!1)return null;let{uiStyle:e="modern",bannerText:t="EARLY BETA"}=s??{};try{let r=new it(Jo,{uiStyle:e});return r.bannerText=t,r}catch{return null}}function ni(s){let e=Ko(void 0);return e.current===void 0&&(e.current=ea(s)),e.current}function oi(s,e){let{sources:t=[],streaming:r,muted:i=!1,cameraControls:n=!1,sceneSelector:o,moduleFactory:a,onReady:l,onProgress:h,onModeChange:c,onXRStart:p,onXREnd:u,onSceneChange:d,onError:f,eventLogger:m,localFiles:g,xrOverlay:x,xrBackend:b}=s,E=ni(x),{interactionError:w,logger:T,reportError:S,clearError:B}=jr(m,f);ta(()=>{tr()},[]);let{gracia:v,playlist:k}=qr({containerRef:e.container,muted:i,moduleFactory:a,overlay:E,xrBackend:b,eventLogger:T,onReady:l,onProgress:h,onModeChange:c,onXRStart:p,onXREnd:u});Qr({isInitialized:v.isInitialized,sources:t,streaming:r,playlist:k,reportError:S}),$r({currentSource:k.currentSource,index:k.index,onSceneChange:d});let{fileInputProps:q,enabled:Y,localLabel:N,openLocalFile:C}=Wr({localFiles:g,logger:T,reportError:S,playlist:k,clearError:B}),{isFullscreen:se,toggleFullscreen:Re}=Hr(e.root,S),Ne=v.isContentReady&&!v.isLoading,{playerError:mi,isBlocking:gi,toast:sn,retry:nn,dismiss:on}=Vr({coreError:v.error,interactionError:w,isSceneReady:Ne,currentSource:k.currentSource,open:v.open,clearError:B}),an=!mi&&(!v.isInitialized||!Ne),gr=Kr(v,S,B);return{contextValue:{gracia:v,playlist:k,config:{sceneSelector:o,cameraControls:n},refs:e,presentation:{isBusy:an,isSceneReady:Ne,isBlocking:gi,playerError:mi,toast:sn,retry:nn,dismiss:on},shell:{isFullscreen:se,toggleFullscreen:Re,localFilesEnabled:Y,fileInputProps:q,openLocalFile:C,localLabel:N},xr:{enter:gr.enter,exit:gr.exit,activeScreenMode:gi?null:gr.activeScreenMode}},gracia:v,playlist:k,openLocalFile:C,toggleFullscreen:Re}}import{useEffect as zs,useRef as Os,useState as ra}from"react";import{jsx as j,jsxs as wt}from"react/jsx-runtime";var Ns=()=>{let{playlist:s}=I(),e=Os(null),t=Os(s.index),[r,i]=ra(!1),n=s.currentSource,o=n?ae(n):"Select scene",a=s.total>1;return zs(()=>{t.current!==s.index&&(t.current=s.index,i(!1))},[s.index]),zs(()=>{if(!r)return;let l=h=>{e.current&&!e.current.contains(h.target)&&i(!1)};return document.addEventListener("click",l),()=>document.removeEventListener("click",l)},[r]),wt("div",{ref:e,className:"gr-player__scene",children:[wt("div",{className:"gr-player__scene-inner",children:[wt("button",{className:"gr-player__scene-main",type:"button",disabled:!a,onClick:()=>i(!r),"aria-haspopup":"menu","aria-expanded":r,children:[j(Ki,{}),wt("span",{className:"gr-player__scene-main-copy",children:[j("span",{className:"gr-player__scene-copy",children:j("span",{className:"gr-player__scene-label",children:o})}),a&&j("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:s.sources.map((l,h)=>j("span",{className:Z("gr-player__scene-segment",h===s.index&&"is-active")},l.id??l.url??h))})]})]}),j("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasPrev,onClick:()=>s.prev(),"aria-label":"Previous scene",children:j($t,{})}),j("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasNext,onClick:()=>s.next(),"aria-label":"Next scene",children:j(Kt,{})})]}),r&&a&&j("div",{className:"gr-player__scene-menu",children:s.sources.map((l,h)=>wt("button",{type:"button",className:Z("gr-player__scene-item",h===s.index&&"is-active"),onClick:()=>{s.goTo(h),i(!1)},children:[j("span",{children:Me(l)?j(Pe,{}):h+1}),j("strong",{children:ae(l)})]},l.id??l.url??h))})]})};import{jsx as ce,jsxs as ai}from"react/jsx-runtime";var Xs=()=>{let{playlist:s}=I(),e=s.currentSource,t=Me(e);return ce("div",{className:"gr-player__scene gr-player__scene--stepper",children:ai("div",{className:"gr-player__scene-inner",children:[ce("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasPrev,onClick:()=>s.prev(),"aria-label":"Previous scene",children:ce($t,{})}),ce("div",{className:"gr-player__scene-main",children:ai("span",{className:"gr-player__scene-main-copy",children:[t&&e?ai("span",{className:"gr-player__scene-count gr-player__scene-count--local",children:[ce(Pe,{}),ce("span",{className:"gr-player__scene-label",children:ae(e)})]}):ce("span",{className:"gr-player__scene-count",children:s.index>=0?`${s.index+1} of ${s.total}`:`${s.total} scenes`}),ce("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:s.sources.map((r,i)=>ce("span",{className:Z("gr-player__scene-segment",i===s.index&&"is-active",Me(r)&&"gr-player__scene-segment--local")},r.id??r.url??i))})]})}),ce("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasNext,onClick:()=>s.next(),"aria-label":"Next scene",children:ce(Kt,{})})]})})};import{useEffect as ia,useRef as sa}from"react";import{jsx as _t}from"react/jsx-runtime";var Ds=()=>{let{playlist:s}=I(),e=sa(null),t=s.index;return ia(()=>{e.current?.querySelector(`.gr-player__scene-tab[data-scene-index="${t}"]`)?.scrollIntoView({block:"nearest",inline:"nearest"})},[t]),_t("div",{className:"gr-player__scene",children:_t("div",{className:"gr-player__scene-inner",children:_t("div",{ref:e,className:"gr-player__scene-tabs-scroll",children:s.sources.map((r,i)=>_t("button",{type:"button","data-scene-index":i,className:Z("gr-player__scene-tab",i===s.index&&"is-active",Me(r)&&"gr-player__scene-tab--local"),onClick:()=>s.goTo(i),"aria-label":`Open ${ae(r)}`,"aria-current":i===s.index?"true":void 0,children:Me(r)?_t(Pe,{}):i+1},r.id??r.url??i))})})})};import{jsx as oa}from"react/jsx-runtime";var na={tabs:Ds,stepper:Xs,menu:Ns},pr=()=>{let{config:s}=I(),{sceneSelector:e=ss}=s,t=na[e];return oa(t,{})};import{useRef as Us,useState as aa}from"react";import{jsx as ur,jsxs as la}from"react/jsx-runtime";var li=({progress:s,duration:e,onSeek:t,disabled:r=!1})=>{let i=Us(null),n=Us(!1),[o,a]=aa(0),l=p=>{if(!i.current)return 0;let u=i.current.getBoundingClientRect();return Math.min(1,Math.max(0,(p.clientX-u.left)/u.width))},h=p=>{e>0&&t(l(p)*e)},c=r?void 0:{onPointerDown(p){n.current=!0,p.currentTarget.setPointerCapture(p.pointerId),h(p)},onPointerMove(p){a(l(p)),n.current&&h(p)},onPointerLeave(){a(0)},onPointerUp(p){n.current=!1,p.currentTarget.releasePointerCapture(p.pointerId)},onPointerCancel(){n.current=!1}};return ur("div",{className:"gr-player__seek-shell","aria-disabled":r||void 0,children:la("div",{ref:i,className:"gr-player__seek",role:"slider","aria-valuemin":0,"aria-valuemax":Math.max(e,0),"aria-valuenow":Math.round(s*Math.max(e,0)),"aria-disabled":r||void 0,tabIndex:r?-1:0,...c,children:[ur("span",{className:"gr-player__seek-fill",style:{width:`${s*100}%`}}),ur("span",{className:"gr-player__seek-hover",style:{width:`${o*100}%`}}),ur("span",{className:"gr-player__seek-thumb",style:{left:`${s*100}%`}})]})})};import{jsx as me,jsxs as Vs}from"react/jsx-runtime";function ha(s,e){return e>0?Math.min(1,Math.max(0,s/e)):0}var Hs=()=>{let{gracia:s,playlist:e,presentation:t,shell:r}=I(),{isSceneReady:i}=t,{isFullscreen:n,toggleFullscreen:o}=r,{playback:a}=s,l=ha(a.currentTime,a.duration);return Vs("div",{className:"gr-player__controls",children:[me(re,{className:"gr-player__button--play",onClick:i?()=>a.togglePlay():void 0,"aria-label":a.isPlaying?"Pause":"Play","aria-disabled":!i||void 0,children:a.isPlaying?me(qi,{}):me(Yi,{})}),me(pr,{}),e.hasAudio&&me(Ee,{className:"gr-player__mute",onClick:i?()=>a.toggleMute():void 0,"aria-label":a.isMuted?"Unmute":"Mute","aria-disabled":!i||void 0,children:a.isMuted?me(Zi,{}):me(ji,{})}),me(li,{progress:l,duration:a.duration,onSeek:h=>a.seek(h),disabled:!i}),Vs("div",{className:"gr-player__time",children:[Gr(a.currentTime)," / ",Gr(a.duration)]}),me(Ee,{variant:["icon","secondary"],className:"gr-player__fullscreen",onClick:o,"aria-label":n?"Exit fullscreen":"Enter fullscreen","aria-pressed":n,title:n?"Exit fullscreen":"Enter fullscreen",children:me(Ji,{active:n})})]})};import{useEffect as Ws,useRef as ca,useState as pa}from"react";import{jsx as St,jsxs as hi}from"react/jsx-runtime";var Ys=()=>{let{gracia:s,config:e,presentation:t}=I(),{isSceneReady:r,isBlocking:i}=t,[n,o]=pa(!1),a=ca(null),l=e.cameraControls&&r&&!i&&!Jt(s.mode);if(Ws(()=>{l||o(!1)},[l]),Ws(()=>{if(!n)return;let p=d=>{a.current?.contains(d.target)||o(!1)},u=d=>{d.code==="Escape"&&o(!1)};return document.addEventListener("pointerdown",p),document.addEventListener("keydown",u),()=>{document.removeEventListener("pointerdown",p),document.removeEventListener("keydown",u)}},[n]),!l)return null;let{controlsType:h,setControls:c}=s.camera;return hi("div",{ref:a,className:"gr-player__camera-control",children:[St(Ee,{className:"gr-player__button--camera",onClick:()=>o(p=>!p),"aria-label":"Camera controls","aria-expanded":n,title:"Camera controls",srLabel:"Camera controls",children:St(Qi,{})}),n&&hi("div",{className:"gr-player__camera-panel",role:"menu","aria-label":"Camera controls",children:[St("div",{className:"gr-player__camera-title",children:"Camera"}),es.map(p=>hi("button",{className:Z("gr-player__camera-option",p.type===h&&"is-active"),type:"button",role:"menuitemradio","aria-checked":p.type===h,onClick:()=>c(p.type),children:[St("span",{className:"gr-player__camera-label",children:p.label}),St("span",{className:"gr-player__camera-hint",children:p.hint})]},p.type))]})]})};import{jsx as Tt,jsxs as da}from"react/jsx-runtime";var ci=({className:s})=>{let{gracia:e,presentation:t,xr:r}=I(),{isSceneReady:i,isBlocking:n}=t,{enter:o}=r;if(n)return null;let a=e.xr.arSupported?oe.AR:e.xr.vrSupported?oe.VR:null;if(!a)return null;let l=a===oe.AR;return Tt("div",{className:["gr-player__xr-actions",s].filter(Boolean).join(" "),children:Tt(ua,{active:e.mode===a,disabled:!i,icon:l?Tt(Qt,{}):Tt(jt,{}),label:l?"View in AR":"Play in VR",mode:a,onEnter:o})})},ua=({active:s,disabled:e,icon:t,label:r,mode:i,onEnter:n})=>da(re,{className:"gr-player__button--xr",onClick:e?void 0:()=>n(i),"aria-disabled":e||void 0,"aria-pressed":s||void 0,title:r,children:[Tt("span",{children:r}),t]});import{jsx as st,jsxs as pi}from"react/jsx-runtime";var qs=()=>{let{gracia:s,playlist:e,refs:t,presentation:r,shell:i}=I(),{isBlocking:n}=r,{localFilesEnabled:o,openLocalFile:a,localLabel:l}=i,{hasInteracted:h,resetView:c}=Dr(t.container,e.index,s.camera);return pi("div",{className:"gr-player__top",children:[pi("div",{className:"gr-player__top-left",children:[o&&st(Ee,{className:"gr-player__button--local",onClick:a,"aria-label":l,title:l,srLabel:"Open local file",children:st(Pe,{})}),st(ci,{className:"gr-player__xr-actions--desktop"})]}),pi("div",{className:"gr-player__top-right",children:[st(Ys,{}),st(ci,{className:"gr-player__xr-actions--mobile"}),!n&&h&&st(re,{variant:"secondary",className:"gr-player__reset",onClick:c,children:"Reset View"})]})]})};import{jsx as ui,jsxs as Zs}from"react/jsx-runtime";var dr=()=>{let{presentation:s}=I(),{isBlocking:e,toast:t}=s;return Zs("div",{className:"gr-player__overlay",children:[ui(qs,{}),!e&&Zs("div",{className:"gr-player__bottom",children:[t&&ui(zr,{message:t.title}),ui(Hs,{})]})]})};import{jsx as Oe}from"react/jsx-runtime";var js=({onExit:s})=>Oe(re,{className:"gr-player__xr-exit",onClick:s,children:"Back to 2D"}),Qs=({onExit:s})=>Oe(He,{icon:Oe(Qt,{}),title:"Running in AR",body:"View the scene in AR mode on your device",action:Oe(js,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),$s=({onExit:s})=>Oe(He,{icon:Oe(jt,{}),title:"Running in VR",body:"Put on your VR-headset and explore the scene",action:Oe(js,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),di={ar:Qs,vr:$s};import{Fragment as fa,jsx as nt,jsxs as ma}from"react/jsx-runtime";var fi=()=>{let{gracia:s,presentation:e,xr:t}=I(),{isBusy:r,isBlocking:i,playerError:n}=e,{retry:o}=e,{activeScreenMode:a,exit:l}=t,h=a?di[a]:null;return ma(fa,{children:[r&&nt(Nr,{}),i&&n&&nt(Or,{title:n.title,body:n.body,detail:n.cause.message,action:n.recoverable?nt(re,{className:"gr-player__state-action",onClick:o,children:"Try again"}):void 0}),h&&nt(h,{onExit:l}),!r&&s.isRebuffering&&nt("div",{className:"gr-player__rebuffer-spinner",children:nt("div",{className:"gr-player__spinner"})})]})};import{jsx as Pt,jsxs as ba}from"react/jsx-runtime";var xa=[],Mt=ga(function(e,t){let{controls:r=!0,className:i,style:n,children:o,sources:a=xa,...l}=e,h=Ks(null),c=Ks(null),{contextValue:p,gracia:u,playlist:d,openLocalFile:f,toggleFullscreen:m}=oi({...l,sources:a},{root:h,container:c}),{presentation:g,shell:x}=p,{isBusy:b}=g,{isFullscreen:E}=x;return ya(t,()=>({gracia:u,playlist:d,get cameraControlsType(){return u.camera.controlsType},play:()=>u.playback.play(),pause:()=>u.playback.pause(),seek:w=>u.playback.seek(w),open:w=>u.open(typeof w=="string"?{url:w,label:"Scene"}:w),close:()=>u.close(),next:()=>d.next(),prev:()=>d.prev(),goTo:w=>d.goTo(w),resetCamera:()=>u.camera.reset(),setCameraControls:w=>u.camera.setControls(w),setMode:w=>u.xr.setMode(w),toggleFullscreen:m,openLocalFile:f}),[u,f,d,m]),Pt(Xr,{value:p,children:ba("section",{ref:h,className:Z("gr-player",i,{"gr-player--loading":b,"gr-player--ready":u.isContentReady,"gr-player--scenes-single":d.total<=1,"gr-player--scenes-multiple":d.total>1,"gr-player--fullscreen":E,"gr-player--error":g.isBlocking}),style:n,children:[Pt("div",{ref:c,className:"gr-player__canvas"}),Pt("input",{className:"gr-player__file-input",type:"file",...x.fileInputProps}),Pt(fi,{}),r&&Pt(dr,{}),typeof o=="function"?o({gracia:u,playlist:d}):o]})})});import{createRef as va}from"react";import{flushSync as wa}from"react-dom";import{createRoot as _a}from"react-dom/client";import{jsx as Sa}from"react/jsx-runtime";function Js(s,e){let t=va(),r=_a(s),i=e,n=!0,o=()=>{wa(()=>{r.render(Sa(Mt,{...i,ref:t}))})};return o(),{get player(){return t.current},update(a){n&&(i=a,o())},unmount(){n&&(n=!1,t.current?.close(),r.unmount())},async openLocalFile(){await t.current?.openLocalFile()}}}import{Box3 as Ta,BufferGeometry as Pa,Float32BufferAttribute as Ma,Matrix4 as Ea,Mesh as Ca,MeshBasicMaterial as La,Sphere as Ra,Vector2 as ka,Vector3 as en}from"three";var fr=class extends Ca{#e;#t=null;#r=new ka;#i=!1;#s=new Ea;enableMesh=!1;constructor(e){let t=new Pa;t.setAttribute("position",new Ma([0,0,0],3)),super(t,new La({colorWrite:!1,depthWrite:!1,transparent:!0})),this.#e=e,this.frustumCulled=!1,this.castShadow=!0,this.renderOrder=1/0,this.onBeforeRender=this.#n,this.onBeforeShadow=this.#o}get player(){return this.#e}async setAudio(e){await this.#e.loadAudio(e)}setAudioListener(e){this.#t=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}dispose(){this.#e.close(),this.#e.dispose(),this.geometry.dispose(),this.material.dispose()}#o=(e,t,r,i)=>{this.enableMesh&&this.#a(e,i)};#n=(e,t,r)=>{e.getDrawingBufferSize(this.#r);let i=this.#r.x,n=this.#r.y;if(i===0||n===0)return;this.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let o=r.matrixWorld.elements;this.#t||this.#e.setAudioListenerMatrix(o),this.#e.setAudioSourceMatrix(this.matrixWorld.elements),this.#e.renderHybridViewport(i,n,{enableMesh:this.enableMesh}),e.resetState(),!this.#i&&this.#e.isReady&&this.#h()};#a(e,t){let r=e.getContext(),i=r.getParameter(r.VIEWPORT),n=i[2],o=i[3];n===0||o===0||(this.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),this.#s.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.#s.multiply(this.matrixWorld),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.depthMask(!0),this.#e.renderMesh(this.#s.elements,i[0],i[1],n,o),e.resetState())}#h(){let e=this.#e.getBBox();if(!e)return;let t=new Ta(new en(e.minX,e.minY,e.minZ),new en(e.maxX,e.maxY,e.maxZ));this.geometry.boundingBox=t,this.geometry.boundingSphere=new Ra,t.getBoundingSphere(this.geometry.boundingSphere),this.frustumCulled=!0,this.#i=!0}};import{ByteType as Aa,DepthTexture as Fa,Object3D as Ba,RenderTarget as Ia,RGBAFormat as Ga,UnsignedIntType as za,Vector2 as tn}from"three";var rn=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST,mr=class s{#e;#t;#r;#i=null;root=new Ba;static attach(e,t){return e.assertDevice(t.backend?.device),new s(e,t)}constructor(e,t){this.#e=e;let r=t.backend;e.configureSurface(r.context,{usage:rn});let{x:i,y:n}=t.getDrawingBufferSize(new tn);this.#r=new Fa,this.#r.type=za;let o=new Ia(i,n);o.depthTexture=this.#r,e.isBGRA&&(o.texture.format=Ga,o.texture.type=Aa,o.texture.internalFormat="bgra8unorm"),this.#t=o}get player(){return this.#e}setAudioListener(e){this.#i=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}render(e,t,r,i){let n=e.getDrawingBufferSize(new tn),o=n.x,a=n.y;if(o===0||a===0)return;let l=this.#t;(l.width!==o||l.height!==a)&&(l.setSize(o,a),this.#e.configureSurface(e.backend.context,{usage:rn})),e.setRenderTarget(l),e.render(t,r),e.setRenderTarget(null);let h=e.backend,c=h.data.get(l.texture)?.texture,p=h.data.get(this.#r)?.texture;if(!c||!p||c.width!==o||c.height!==a)return;this.root.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.root.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let u=r.matrixWorld.elements;this.#i||this.#e.setAudioListenerMatrix(u),this.#e.setAudioSourceMatrix(this.root.matrixWorld.elements),this.#e.renderTextures({color:c,depth:p,w:o,h:a}),i&&(e.autoClearColor=!1,e.autoClearDepth=!0,e.autoClearStencil=!0,e.setRenderTarget(l),e.render(i,r),e.setRenderTarget(null),e.autoClearColor=!0);let d=h.context.getCurrentTexture();d.usage&GPUTextureUsage.COPY_DST&&d.width===o&&d.height===a&&this.#e.copyTexture(c,d,[o,a,1])}setStaticModelMatrix(e){this.#e.setStaticModelMatrix(e)}dispose(){this.#t.dispose(),this.#e.close(),this.#e.dispose()}};export{je as ClassicControls,$e as DebugRenderer,ct as ENV_PRESETS,Ir as GRACIA_PLAYER_DEFAULT_CSS,Ue as GraciaApp,Xe as GraciaPlayer,Mt as GraciaReactPlayer,Yt as GraciaSplats,ke as Mat4,Ke as ModernControls,We as QuadLayer,Te as Quat,De as SceneManipulator,Je as SceneOverlay,fr as SplatsMesh,mr as SplatsRendererW3,Q as Vec3,it as XROverlay,tt as XRRayRenderer,L as axis,Lt as bbox,Ve as buildApiSources,Se as envCoefsFromPreset,yr as envCoefsFromSH27,Rr as fetchStreamingMetadata,tr as installGraciaPlayerStyles,Rt as loadGraciaModule,O as mat4,Js as mountGraciaPlayer,_ as num,Se as presetToLightProbe,$ as quat,qt as useGraciaPlayer,Zt as useGraciaPlaylist,P as vec3};
