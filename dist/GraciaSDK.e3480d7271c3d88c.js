var Js=.28209479177387814;function di(s,e=.5){let t=1/(Js*Math.max(s[0],s[1],s[2],.01));for(let r=0;r<3;r++)s[r]*=t;for(let r=3;r<12;r++)s[r]*=t*e}function fr(s,e=null,t=.5){let r=new Float32Array(12);for(let i=0;i<12;i++)r[i]=s[i];if(e){let i=e[0]??e.x,n=e[1]??e.y,a=e[2]??e.z;if(r[9]*i+r[3]*n+r[6]*a>0)for(let o=3;o<12;o++)r[o]*=-1}return di(r,t),r}function we(s){let e=new Float32Array(12);return e.set(s.ambient,0),e.set(s.topDown,3),s.frontBack&&e.set(s.frontBack,6),s.leftRight&&e.set(s.leftRight,9),e}var me=Object.freeze,it=me([0,0,0]),en=me([1,1,1]),Pt=me([1,0,0]),st=me([0,1,0]),gi=me([0,0,1]),gr=me([0,0,-1]),tn=.25,E=me({X:Pt,Y:st,Z:gi,FORWARD:gr,FLIP_X:me([-1,1,1]),FLIP_Z:me([1,1,-1])}),b={clamp:(s,e,t)=>Math.min(t,Math.max(e,s)),clampInt:(s,e,t)=>b.clamp(s|0,e,t),clamp01:s=>b.clamp(s,0,1),unlerp01:(s,e,t)=>t===e?0:b.clamp01((s-e)/(t-e)),finite:(s,e=0)=>Number.isFinite(s)?s:e,wrapPi(s){return s>Math.PI?s-2*Math.PI:s<-Math.PI?s+2*Math.PI:s},wrap(s,e){return e>0?(s%e+e)%e:0},wrapDelta(s,e){return e>0?s-e*Math.round(s/e):s},signedClamp(s,e,t){return s===0?0:b.clamp(Math.abs(s),e,t)*Math.sign(s)},zoomStep(s,e=.05,t=10){return s>0?b.signedClamp(Math.log2(s),e,t):0},absLogRatio(s,e){return s>0&&e>0?Math.abs(Math.log(s/e)):0},outside(s,e){return Math.abs(s)>e},perspectiveScale(s,e,t){return 2*s*Math.tan(e*Math.PI/360)/Math.max(1,t)},deadzone(s,e){let t=Math.abs(s);return t<e?0:((t-e)/(1-e))**2*Math.sign(s)},deltaSeconds(s,e,t=0,r=tn){return e?Math.min((s-e)/1e3,r):t}},Ct={center(s,e){return s[0]=(e.minX+e.maxX)*.5,s[1]=(e.minY+e.maxY)*.5,s[2]=(e.minZ+e.maxZ)*.5,s}},$=class extends Float32Array{constructor(e){super(3),e&&this.from(e)}set(e,t,r){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this)}fromXYZ(e){return this.set(e.x,e.y,e.z)}from(e){return typeof e.x=="number"?this.fromXYZ(e):this.set(e[0],e[1],e[2])}copy(e){return this.set(e[0],e[1],e[2])}add(e){return this[0]+=e[0],this[1]+=e[1],this[2]+=e[2],this}addXYZ(e=0,t=0,r=0){return this[0]+=e,this[1]+=t,this[2]+=r,this}addTo(e,t=it){return e[0]=t[0]+this[0],e[1]=t[1]+this[1],e[2]=t[2]+this[2],e}addScaled(e,t){return this[0]+=e[0]*t,this[1]+=e[1]*t,this[2]+=e[2]*t,this}addDelta(e,t){return this[0]+=e[0]-t[0],this[1]+=e[1]-t[1],this[2]+=e[2]-t[2],this}sub(e,t){return t?(this[0]=e[0]-t[0],this[1]=e[1]-t[1],this[2]=e[2]-t[2],this):(this[0]-=e[0],this[1]-=e[1],this[2]-=e[2],this)}subXYZ(e,t){return this.set(e.x-t.x,e.y-t.y,e.z-t.z)}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this}multiply(e){return this[0]*=e[0],this[1]*=e[1],this[2]*=e[2],this}multiplyXYZ(e=1,t=1,r=1){return this[0]*=e,this[1]*=t,this[2]*=r,this}divide(e){return this[0]=e[0]?this[0]/e[0]:0,this[1]=e[1]?this[1]/e[1]:0,this[2]=e[2]?this[2]/e[2]:0,this}clampScalar(e,t){return this[0]=b.clamp(this[0],e,t),this[1]=b.clamp(this[1],e,t),this[2]=b.clamp(this[2],e,t),this}normalize(e=it){let t=Math.hypot(this[0],this[1],this[2]);return Number.isFinite(t)&&t>1e-6?this.scale(1/t):this.copy(e)}setLength(e,t=Pt){return this.normalize(t).scale(e)}cross(e,t){let r=e[0],i=e[1],n=e[2],a=t[0],o=t[1],l=t[2];return this[0]=i*l-n*o,this[1]=n*a-r*l,this[2]=r*o-i*a,this}lerp(e,t){return this[0]+=t*(e[0]-this[0]),this[1]+=t*(e[1]-this[1]),this[2]+=t*(e[2]-this[2]),this}midXYZ(e,t){return this.set((e.x+t.x)*.5,(e.y+t.y)*.5,(e.z+t.z)*.5)}fromMat4Column(e,t){let r=t*4;return this.set(e[r],e[r+1],e[r+2])}transformMat4(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i+e[12],this[1]=e[1]*t+e[5]*r+e[9]*i+e[13],this[2]=e[2]*t+e[6]*r+e[10]*i+e[14],this}transformMat4Direction(e){let t=this[0],r=this[1],i=this[2];return this[0]=e[0]*t+e[4]*r+e[8]*i,this[1]=e[1]*t+e[5]*r+e[9]*i,this[2]=e[2]*t+e[6]*r+e[10]*i,this}transformQuat(e){let t=this[0],r=this[1],i=this[2],n=e[0],a=e[1],o=e[2],l=e[3],c=l*t+a*i-o*r,h=l*r+o*t-n*i,p=l*i+n*r-a*t,u=-n*t-a*r-o*i;return this[0]=c*l+u*-n+h*-o-p*-a,this[1]=h*l+u*-a+p*-n-c*-o,this[2]=p*l+u*-o+c*-a-h*-n,this}fromYawPitch(e,t){let r=Math.cos(t);return this.set(r*Math.sin(e),Math.sin(t),-r*Math.cos(e))}yawPitch(e){return this[0]=Math.atan2(e[0],-e[2]),this[1]=Math.asin(b.clamp(e[1],-1,1)),this[2]=0,this}basisFromForward(e,t,r=st){return this.cross(t,r).normalize(Pt),e.cross(this,t),this}yawPitchBasis(e,t,r,i,n){return r.fromYawPitch(e,t),i.copy(r).scale(-1),this.set(Math.cos(e),0,Math.sin(e)),n.cross(i,this),this}rollBasis(e,t){let r=Math.cos(t),i=Math.sin(t),n=this[0],a=this[1],o=this[2],l=e[0],c=e[1],h=e[2];return this.set(n*r+l*i,a*r+c*i,o*r+h*i),e.set(l*r-n*i,c*r-a*i,h*r-o*i),this}fromSphereDir(e,t){let r=Math.sin(t);return this.set(r*Math.sin(e),Math.cos(t),r*Math.cos(e))}polarY(e,t,r=1e-6){let i=e[0]-t[0],n=e[1]-t[1],a=e[2]-t[2],o=Math.max(r,Math.hypot(i,n,a));return this[0]=Math.atan2(i,a),this[1]=Math.acos(b.clamp(n/o,-1,1)),this[2]=o,this}equals(e,t=1e-6){return Math.abs(this[0]-e[0])<=t&&Math.abs(this[1]-e[1])<=t&&Math.abs(this[2]-e[2])<=t}toArray(){return[this[0],this[1],this[2]]}toXYZ(){return{x:this[0],y:this[1],z:this[2]}}distanceXYZ(e){return Math.hypot(this[0]-e.x,this[1]-e.y,this[2]-e.z)}dot(e){return this[0]*e[0]+this[1]*e[1]+this[2]*e[2]}get sqrLen(){return this[0]*this[0]+this[1]*this[1]+this[2]*this[2]}get len(){return Math.hypot(this[0],this[1],this[2])}get xzLen(){return Math.hypot(this[0],this[2])}get minComponent(){return Math.min(this[0],this[1],this[2])}get maxAbs(){return Math.max(Math.abs(this[0]),Math.abs(this[1]),Math.abs(this[2]))}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}},Se=class extends Float32Array{constructor(e){super(4),e?this.from(e):this.identity()}set(e,t,r,i){return typeof e!="number"?this.from(e):(this[0]=e,this[1]=t,this[2]=r,this[3]=i,this)}fromXYZW(e){return this.set(e.x,e.y,e.z,e.w)}from(e){return typeof e.x=="number"?this.fromXYZW(e):this.set(e[0],e[1],e[2],e[3])}copy(e){return this.set(e[0],e[1],e[2],e[3])}identity(){return this.set(0,0,0,1)}normalize(){let e=Math.hypot(this[0],this[1],this[2],this[3]);return e>1e-6?this.scale(1/e):this.identity()}scale(e){return this[0]*=e,this[1]*=e,this[2]*=e,this[3]*=e,this}setAxisAngle(e,t){let r=t*.5,i=Math.sin(r);return this.set(e[0]*i,e[1]*i,e[2]*i,Math.cos(r))}rotatePre(e,t){return this.mul(Mt.setAxisAngle(e,t),this)}rotate(e,t){return this.mul(Mt.setAxisAngle(e,t))}mul(e,t){let r=t?e:this,i=t??e,n=r[0],a=r[1],o=r[2],l=r[3],c=i[0],h=i[1],p=i[2],u=i[3];return this[0]=n*u+l*c+a*p-o*h,this[1]=a*u+l*h+o*c-n*p,this[2]=o*u+l*p+n*h-a*c,this[3]=l*u-n*c-a*h-o*p,this}invert(e=this){let t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+e[3]*e[3],r=t?1/t:0;return this.set(-e[0]*r,-e[1]*r,-e[2]*r,e[3]*r)}slerp(e,t){let r=e[0],i=e[1],n=e[2],a=e[3],o=this[0]*r+this[1]*i+this[2]*n+this[3]*a;o<0&&(o=-o,r=-r,i=-i,n=-n,a=-a);let l=1-t,c=t;if(1-o>1e-6){let h=Math.acos(o),p=Math.sin(h);l=Math.sin((1-t)*h)/p,c=Math.sin(t*h)/p}return this.set(l*this[0]+c*r,l*this[1]+c*i,l*this[2]+c*n,l*this[3]+c*a)}toXYZW(){return{x:this[0],y:this[1],z:this[2],w:this[3]}}get x(){return this[0]}set x(e){this[0]=e}get y(){return this[1]}set y(e){this[1]=e}get z(){return this[2]}set z(e){this[2]=e}get w(){return this[3]}set w(e){this[3]=e}},Re=class extends Float32Array{constructor(e){super(16),e?this.copy(e):this.identity()}copy(e){return super.set(e),this}identity(){return this.fill(0),this[0]=this[5]=this[10]=this[15]=1,this}multiply(e,t){return t?mr(this,e,t):mr(this,this,e)}preMultiply(e){return mr(this,e,this)}fromTranslation(e){return this.identity(),this[12]=e[0],this[13]=e[1],this[14]=e[2],this}fromScaling(e){return this.identity(),this[0]=e[0],this[5]=e[1],this[10]=e[2],this}perspective(e,t,r,i){let n=1/Math.tan(e*Math.PI/360);return this.fill(0),this[0]=n/t,this[5]=n,this[10]=(i+r)/(r-i),this[11]=-1,this[14]=2*i*r/(r-i),this}cameraWorld(e,t,r=st){let i=ne.sub(e,t).normalize(gi),n=fi.cross(r,i).normalize(Pt),a=rn.cross(i,n);return this.cameraWorldAxes(e,n,a,i)}cameraWorldAxes(e,t,r,i){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=0,this[4]=r[0],this[5]=r[1],this[6]=r[2],this[7]=0,this[8]=i[0],this[9]=i[1],this[10]=i[2],this[11]=0,this[12]=e[0],this[13]=e[1],this[14]=e[2],this[15]=1,this}fromQuat(e){return this.fromRotationTranslationScale(e,it,en)}fromTransform(e){let{rotation:t,translation:r,scale:i}=e;return Mt.fromXYZW(t).normalize(),this.fromRotationTranslationScale(Mt,ne.fromXYZ(r),fi.set(i.x,i.y,i.z))}fromRotationTranslationScale(e,t,r){let i=e[0],n=e[1],a=e[2],o=e[3],l=i+i,c=n+n,h=a+a,p=i*l,u=i*c,d=i*h,f=n*c,g=n*h,m=a*h,_=o*l,I=o*c,M=o*h,v=r[0],w=r[1],S=r[2];return this[0]=(1-(f+m))*v,this[1]=(u+M)*v,this[2]=(d-I)*v,this[3]=0,this[4]=(u-M)*w,this[5]=(1-(p+m))*w,this[6]=(g+_)*w,this[7]=0,this[8]=(d+I)*S,this[9]=(g-_)*S,this[10]=(1-(p+f))*S,this[11]=0,this[12]=t[0],this[13]=t[1],this[14]=t[2],this[15]=1,this}setPosition(e){return this[12]=e[0],this[13]=e[1],this[14]=e[2],this}translate(e){let t=e[0],r=e[1],i=e[2];return this[12]=this[0]*t+this[4]*r+this[8]*i+this[12],this[13]=this[1]*t+this[5]*r+this[9]*i+this[13],this[14]=this[2]*t+this[6]*r+this[10]*i+this[14],this[15]=this[3]*t+this[7]*r+this[11]*i+this[15],this}scale(e){let t=e[0],r=e[1],i=e[2];for(let n=0;n<4;n++)this[n]*=t,this[n+4]*=r,this[n+8]*=i;return this}fromPivot(e,t,r,i,n){return this.fromTranslation(e).scale(r).translate(i),this.multiply(sn.fromQuat(t)),this.translate(ne.copy(i).scale(-1)),n?this.multiply(n):this}pointTo(e,t=it,r=1){return yi(e,this,t,r)}poseTo(e){return xi(e,this)}},ne=new $,fi=new $,rn=new $,Mt=new Se,sn=new Re;function mr(s,e,t){let r=e[0],i=e[1],n=e[2],a=e[3],o=e[4],l=e[5],c=e[6],h=e[7],p=e[8],u=e[9],d=e[10],f=e[11],g=e[12],m=e[13],_=e[14],I=e[15],M=t[0],v=t[1],w=t[2],S=t[3];return s[0]=M*r+v*o+w*p+S*g,s[1]=M*i+v*l+w*u+S*m,s[2]=M*n+v*c+w*d+S*_,s[3]=M*a+v*h+w*f+S*I,M=t[4],v=t[5],w=t[6],S=t[7],s[4]=M*r+v*o+w*p+S*g,s[5]=M*i+v*l+w*u+S*m,s[6]=M*n+v*c+w*d+S*_,s[7]=M*a+v*h+w*f+S*I,M=t[8],v=t[9],w=t[10],S=t[11],s[8]=M*r+v*o+w*p+S*g,s[9]=M*i+v*l+w*u+S*m,s[10]=M*n+v*c+w*d+S*_,s[11]=M*a+v*h+w*f+S*I,M=t[12],v=t[13],w=t[14],S=t[15],s[12]=M*r+v*o+w*p+S*g,s[13]=M*i+v*l+w*u+S*m,s[14]=M*n+v*c+w*d+S*_,s[15]=M*a+v*h+w*f+S*I,s}function yi(s,e,t=it,r=1){let i=t[0]??0,n=t[1]??0,a=t[2]??0;return s[0]=e[0]*i+e[4]*n+e[8]*a+e[12],s[1]=e[1]*i+e[5]*n+e[9]*a+e[13],s[2]=e[2]*i+e[6]*n+e[10]*a+e[14],r!==1&&(s[0]*=r,s[1]*=r,s[2]*=r),s}function mi(s,e,t,r){let i=t[0],n=t[1],a=t[2];s[0]=e[0]*i+e[4]*n+e[8]*a,s[1]=e[1]*i+e[5]*n+e[9]*a,s[2]=e[2]*i+e[6]*n+e[10]*a;let o=Math.hypot(s[0],s[1],s[2]);if(Number.isFinite(o)&&o>1e-6){let l=1/o;s[0]*=l,s[1]*=l,s[2]*=l}else s[0]=r[0],s[1]=r[1],s[2]=r[2];return s}function xi(s,e){return s[0]=e[12],s[1]=e[13],s[2]=e[14],mi(ne,e,gr,gr),s[3]=ne[0],s[4]=ne[1],s[5]=ne[2],mi(ne,e,st,st),s[6]=ne[0],s[7]=ne[1],s[8]=ne[2],s}function nn(s,e,t){return e>1e-6?Math.min(t,(.5-s)/e):e<-1e-6?Math.min(t,(-.5-s)/e):t}var nt=class{#e;#r=new $;#t=new $;#i=new Se;#s=new Se;#o=new $;#n=new $;constructor({type:e,position:t,rotation:r,scale:i}){this.#e=e,this.#r.fromXYZ(t),this.#t.fromXYZ(i),this.#i.fromXYZW(r).normalize(),this.#s.copy(this.#i).invert()}clampPoint(e){if(this.#e==="sphere"){let r=this.#t.minComponent*.5,i=this.#o.sub(e,this.#r).len;i>r&&this.#o.scale(r/i).addTo(e,this.#r);return}let t=this.#a(e);t.maxAbs<=.5||t.clampScalar(-.5,.5).multiply(this.#t).transformQuat(this.#i).addTo(e,this.#r)}rayLimit(e,t,r){if(this.#e==="sphere"){let o=this.#t.minComponent*.5,l=this.#o.sub(e,this.#r),c=l.dot(t),h=c*c-(l.sqrLen-o*o);return h<=0?0:b.clamp(Math.sqrt(h)-c,0,r)}let i=this.#a(e),n=this.#n.copy(t).transformQuat(this.#s).divide(this.#t),a=r;for(let o=0;o<3;o++)a=nn(i[o],n[o],a);return Math.max(0,a)}#a(e){return this.#o.sub(e,this.#r).transformQuat(this.#s).divide(this.#t)}},T={create:()=>new $},K={create:()=>new Se},X={create:()=>new Re,clone:s=>new Re(s),pointTo:yi,poseTo:xi};async function Et(s="@gracia/web-sdk/wasm"){for(let e=0;;e++)try{let t=await import(s);return t.default??t}catch{await new Promise(r=>setTimeout(r,1e3))}}var Lt=class{#e;#r=0;constructor(e,t=512){this.#e=e,this.#r=e._malloc(t)}ptr(e=0){return this.#r+e}get f32(){return this.#e.HEAPF32}writeF32(e,t=0){this.#e.HEAPF32.set(e,this.#r+t>>2)}readF32(e,t=0){let r=this.#r+t;return new Float32Array(this.#e.HEAPF32.buffer,r,e)}free(){this.#r&&(this.#e._free(this.#r),this.#r=0)}};function yr(s,e,...t){if(!e)return;let r=new TextEncoder,i=[],n=t.map(o=>{if(typeof o!="string")return o;let l=r.encode(o),c=s._malloc(l.length+1);return s.HEAPU8.set(l,c),s.HEAPU8[c+l.length]=0,i.push(c),c}),a=e(...n);for(let o of i)s._free(o);return a}var P=(s,e)=>s[`_Gracia_${e}`];async function on(){let s=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!s)throw new Error("WebGPU adapter not available");return await s.requestDevice({requiredLimits:{maxStorageBuffersPerShaderStage:10,maxComputeWorkgroupSizeX:256,maxBufferSize:s.limits.maxBufferSize,maxStorageBufferBindingSize:s.limits.maxStorageBufferBindingSize}})}var Rt=class s{#e;#r;#t=null;#i=0;constructor(e){this.#e=e,this.#r=new Lt(e)}static async boot(e,t,{maxSplatsCount:r=0}={}){let i=typeof e=="function"?await e({canvas:t}):e,n=await on();if(typeof e=="function"&&(i.preinitializedWebGPUDevice=n,i.WebGPU?.importJsDevice?.(n)),P(i,"Init")?.(r|0),!P(i,"Initialized")?.())throw new Error("Gracia init failed");return{module:new s(i),device:n}}get heap(){return this.#r}get backend(){return this.#t}get buildUnixTime(){return P(this.#e,"GetBuildTime")?.()??0}shutdownApp(){P(this.#e,"Shutdown")?.()}setCamera(e,t,r,i){let n=!!(r&&i),a=this.#r.ptr(),o=a>>2,l=this.#r.f32;l.set(e,o),n&&l.set(r,o+16),l.set(t,o+32),n&&l.set(i,o+48),P(this.#e,"SetCamera")?.(n,a)}getModelMatrix(){let e=P(this.#e,"GetModelMatrix");if(!e)return null;let t=this.#r.ptr(256);return e(t),this.#r.readF32(16,256)}setModelMatrix(e){let t=P(this.#e,"SetModelMatrix");t&&(this.#r.writeF32(e,256),t(this.#r.ptr(256)))}initPure(e){this.shutdownBackend(),this.#t="pure",P(this.#e,"P_Init")?.(e?1:0)}pureRenderTo(e,t,r,i){let n=this.#e.WebGPU,a=n?.importJsTexture?.(e)??0,o=t?n?.importJsTexture?.(t)??0:0;return P(this.#e,"P_RenderTo")?.(a,o,r,i)!==0}initHybrid(e){this.shutdownBackend(),this.registerGL(e),this.#t="hybrid",P(this.#e,"H_Init")?.()}hybridFrame(e,t,r){P(this.#e,"H_Frame")?.(e,t,r)}hybridPreprocess(e,t){return P(this.#e,"H_Preprocess")?.(e,t)??0}hybridRender(e,t,r,i,n,a){P(this.#e,"H_Render")?.(e,t,r,i,n,a)}hybridRenderMesh(e,t,r,i,n){this.#r.writeF32(e),P(this.#e,"H_RenderMeshMVP")?.(this.#r.ptr(),t,r,i,n)}hybridRenderMotionMV(e,t,r,i){P(this.#e,"H_RenderMotionMV")?.(e,t,r,i)}hybridCanMotion(){return!!P(this.#e,"H_CanMotion")?.()}hybridHasMultiview(){return!!P(this.#e,"H_HasMultiview")?.()}hybridReset(){P(this.#e,"H_Reset")?.()}registerGL(e){this.#i&&this.#e.GL?.deleteContext(this.#i);let t=this.#e.GL;if(!t)throw new Error("WASM GL layer not available");this.#i=t.registerContext(e,{majorVersion:2,minorVersion:0,enableExtensionsByDefault:!0}),t.makeContextCurrent(this.#i)}shutdownBackend(){this.#t==="pure"?P(this.#e,"P_Shutdown")?.():this.#t==="hybrid"&&P(this.#e,"H_Shutdown")?.(),this.#i&&(this.#e.GL?.deleteContext(this.#i),this.#i=0),this.#t=null}dispose(){this.shutdownBackend(),this.#r.free(),this.shutdownApp()}addDynamicScene(){return P(this.#e,"AddScene")?.()??0}addStaticScene(){return P(this.#e,"AddStaticScene")?.()??0}removeScene(e){P(this.#e,"RemoveScene")?.(e)}sceneReady(e){return e?(P(this.#e,"SceneReady")?.(e)??0)!==0:!1}sceneProgress(e){return e?P(this.#e,"SceneProgress")?.(e)??0:0}sceneDuration(e){return e?P(this.#e,"SceneDuration")?.(e)??0:0}sceneIsBuffering(e){return e?(P(this.#e,"SceneIsBuffering")?.(e)??0)!==0:!1}sceneLastFetchStatus(e){return e?P(this.#e,"SceneGetLastFetchStatus")?.(e)??0:0}sceneSetTime(e,t){P(this.#e,"SceneSetTime")?.(e,t)}sceneSetVisible(e,t){P(this.#e,"SceneSetVisible")?.(e,t)}sceneGetBBox(e){let t=P(this.#e,"SceneGetBBox");if(!t||!e)return null;let r=this.#r.ptr(256);t(e,r);let i=r>>2,n=this.#r.f32;return n[i]===0&&n[i+1]===0&&n[i+2]===0&&n[i+3]===0&&n[i+4]===0&&n[i+5]===0?null:{minX:n[i],minY:n[i+1],minZ:n[i+2],maxX:n[i+3],maxY:n[i+4],maxZ:n[i+5]}}sceneSetEnvLighting(e,t,r){let i=P(this.#e,"SceneSetEnvPreset");if(!i||!e)return;let n=this.#r.ptr(128),a=n>>2,o=this.#r.f32;for(let l=0;l<4;l++)o[a+l*4]=t[l*3],o[a+l*4+1]=t[l*3+1],o[a+l*4+2]=t[l*3+2],o[a+l*4+3]=0;o[a+3]=r,i(e,n)}sceneClearEnvLighting(e){P(this.#e,"SceneClearEnvPreset")?.(e)}sceneSetModelMatrix(e,t){let r=P(this.#e,"SceneSetModelMatrix");!r||!e||(this.#r.writeF32(t,256),r(e,this.#r.ptr(256)))}sceneOpen(e,t){yr(this.#e,P(this.#e,"SceneOpen"),e,t)}sceneOpenApi(e,t,r){yr(this.#e,P(this.#e,"SceneOpenApi"),e,t,r)}registerLocalFile(e){let t=this.#e.graciaRegisterLocalFile;if(!t)throw new Error("WASM local-file bridge unavailable");return t(e)}sceneOpenLocal(e,t){P(this.#e,"SceneOpenLocal")?.(e,t)}sceneOpenStatic(e,t){let r=P(this.#e,"SceneOpenStatic");if(!r)return-1;let i=this.#e._malloc(t.length);this.#e.HEAPU8.set(t,i);try{return r(e,i,t.length)}finally{this.#e._free(i)}}};var an={panningModel:"HRTF",distanceModel:"inverse",refDistance:1,maxDistance:100,rolloffFactor:1},ln=[0,0,0],cn=[0,0,0,0,0,-1,0,1,0],hn=.1,pn=40,un=60,dn=.01,fn=.08,mn=1.5,bi=.02;function vi(){typeof navigator<"u"&&navigator.audioSession&&(navigator.audioSession.type="playback")}function _i(){return typeof performance<"u"?performance.now():Date.now()}function Z(s,e,t,r=0){r>0?s.linearRampToValueAtTime(e,t.currentTime+r):s.setValueAtTime(e,t.currentTime)}function wi(s,e,t){s.setTargetAtTime(e,t.currentTime,.01)}function At(s){try{s.disconnect()}catch{}}function q(s,e){return Math.abs(s-e)<1e-4}function J(s){try{s.automationRate="k-rate"}catch{}}function xr(s){s.positionX&&(J(s.positionX),J(s.positionY),J(s.positionZ),"orientationX"in s?(J(s.orientationX),J(s.orientationY),J(s.orientationZ)):(J(s.forwardX),J(s.forwardY),J(s.forwardZ),J(s.upX),J(s.upY),J(s.upZ)))}function Si(s,e,t,r,i,n=0){Z(s.positionX,e,i,n),Z(s.positionY,t,i,n),Z(s.positionZ,r,i,n)}function gn(s,e,t,r,i,n,a,o,l=0){if("orientationX"in s){Z(s.orientationX,e,o,l),Z(s.orientationY,t,o,l),Z(s.orientationZ,r,o,l);return}Z(s.forwardX,e,o,l),Z(s.forwardY,t,o,l),Z(s.forwardZ,r,o,l),Z(s.upX,i,o,l),Z(s.upY,n,o,l),Z(s.upZ,a,o,l)}var br=class{#e=null;#r=null;#t=[0,0,0];#i=[0,0,-1,0,1,0];#s=!1;#o=new Float32Array(9);#n=!1;constructor(){vi(),typeof document<"u"&&document.addEventListener("visibilitychange",()=>{!document.hidden&&this.#e&&this.#e.state!=="running"&&this.resume()})}get ctx(){return this.#e}get destination(){return this.#r??this.#e?.destination??null}setOutput(e){e?.context&&e.context!==this.#e&&(this.#e=e.context,xr(this.#e.listener),this.#n=!1),this.#r=e?.destination??null,this.#s=e?.externalListener===!0,this.#c()}decode(e){let t=this.#a();if(!t)throw new Error("Web Audio is not supported in this browser");return t.decodeAudioData(e).then(r=>({ctx:t,buffer:r,destination:this.destination??t.destination}))}resume(){vi();let e=this.#a();return e?e.state==="running"?Promise.resolve():e.resume().catch(()=>{}):Promise.resolve()}listener(e,t,r,i,n,a,o,l,c,h=0){this.#t=[e,t,r],this.#i=[i,n,a,o,l,c],this.#c(h)}resetListener(){this.listener(...cn)}#a(){if(this.#e)return this.#e;if(typeof AudioContext>"u")return null;try{this.#e=new AudioContext}catch{return null}return xr(this.#e.listener),this.#n=!1,this.#c(),this.#e}#c(e=0){let t=this.#e?.listener;if(!t||this.#s)return;let[r,i,n]=this.#t,[a,o,l,c,h,p]=this.#i,u=this.#o;this.#n&&q(r,u[0])&&q(i,u[1])&&q(n,u[2])&&q(a,u[3])&&q(o,u[4])&&q(l,u[5])&&q(c,u[6])&&q(h,u[7])&&q(p,u[8])||(u.set([r,i,n,a,o,l,c,h,p]),this.#n=!0,Si(t,r,i,n,this.#e,e),gn(t,a,o,l,c,h,p,this.#e,e))}},ee=new br,vr=class s{#e;#r;#t;#i;#s;#o=null;#n=!1;#a=!1;#c=1;#h=1;#l=0;#p=0;#u=0;#g=NaN;#f=NaN;#d=NaN;constructor(e,t,r={}){this.#e=e,this.#r=t,this.#n=r.loop??!0,this.#s=r.destination??e.destination,this.#t=e.createGain(),this.#i=e.createPanner(),xr(this.#i),this.pannerAttr({...an,...r.pannerAttr}),this.#i.connect(this.#t),this.#t.connect(this.#s),this.volume(r.volume??1).rate(r.rate??1).pos(...r.pos??ln)}get context(){return this.#e}static async fromArrayBuffer(e,t={}){let{ctx:r,buffer:i,destination:n}=await ee.decode(e);return new s(r,i,{destination:n,...t})}play(){return!this.#r||this.#a?this:(this.#y(this.#l),this)}pause(){return this.#a?(this.#l=this.#b(),this.#x(),this.#a=!1,this):this}stop(){return this.#l=0,this.#a&&(this.#x(),this.#a=!1),this}unload(){return this.stop(),this.#r=null,At(this.#i),At(this.#t),this}playing(){return this.#a}seek(e){return typeof e!="number"?this.#b():(this.#l=this.#v(e),this.#a&&(this.#x(),this.#y(this.#l)),this)}volume(e){return wi(this.#t.gain,b.clamp01(e),this.#e),this}rate(e){return this.#c=b.clamp(b.finite(e,1),.001,1/0),this.#m(this.#c),this}#m(e){this.#a&&(this.#l=this.#b(),this.#p=this.#l,this.#u=this.#e.currentTime),this.#h=e,this.#o&&wi(this.#o.playbackRate,e,this.#e)}follow(e){if(!this.#a||!this.#r)return;let t=this.#b()-e;if(this.#n&&(t=b.wrapDelta(t,this.#r.duration)),Math.abs(t)>fn){this.seek(e);return}let r=this.#c,i=Math.abs(t)<dn?r:b.clamp(r-mn*t,r*(1-bi),r*(1+bi));q(i,this.#h)||this.#m(i)}pos(e,t,r,i=0){return q(e,this.#g)&&q(t,this.#f)&&q(r,this.#d)?this:(this.#g=e,this.#f=t,this.#d=r,Si(this.#i,e,t,r,this.#e,i),this)}destination(e){let t=e??this.#e.destination;return t===this.#s?this:(At(this.#t),this.#s=t,this.#t.connect(this.#s),this)}pannerAttr(e){return e?(e.panningModel&&(this.#i.panningModel=e.panningModel),e.distanceModel&&(this.#i.distanceModel=e.distanceModel),typeof e.refDistance=="number"&&(this.#i.refDistance=e.refDistance),typeof e.maxDistance=="number"&&(this.#i.maxDistance=e.maxDistance),typeof e.rolloffFactor=="number"&&(this.#i.rolloffFactor=e.rolloffFactor),this):this}#y(e){let t=this.#r;if(!t)return;let r=this.#e.createBufferSource(),i=this.#v(e);r.buffer=t,r.loop=this.#n,this.#h=this.#c,Z(r.playbackRate,this.#h,this.#e),r.connect(this.#i),r.onended=()=>{this.#o===r&&(this.#o=null,this.#a=!1,this.#l=0)},this.#o=r,this.#a=!0,this.#l=i,this.#p=i,this.#u=this.#e.currentTime,r.start(0,i)}#x(){let e=this.#o;if(this.#o=null,!!e){e.onended=null;try{e.stop(0)}catch{}At(e)}}#b(){return this.#a?this.#v(this.#p+(this.#e.currentTime-this.#u)*this.#h):this.#l}#v(e){let t=this.#r?.duration??0;return!Number.isFinite(e)||e<=0||t<=0?0:this.#n?b.wrap(e,t):b.clamp(e,0,b.clamp(t-.001,0,1/0))}},kt=class{#e=null;#r=null;#t=null;#i=null;#s=null;#o=[0,0,0];#n=T.create();#a=new Float32Array(9);#c={volume:1,rate:1,pannerAttr:{}};#h=!1;#l=0;#p=0;#u=0;#g=0;#f=!1;get context(){return ee.ctx}get isLoaded(){return!this.#f}setOutput(e){let t=ee.ctx;ee.setOutput(e),this.#e&&(t&&ee.ctx&&this.#e.context!==ee.ctx||this.#e.destination(ee.destination))}async load(e){if(e===this.#r&&(this.#f||this.#e||this.#i||this.#s))return;this.unload(),this.#r=e,this.#f=!0;let t=++this.#l;this.#t=new AbortController;try{let r=await fetch(e,{signal:this.#t.signal});if(!r.ok)throw new Error(`Audio fetch failed: ${r.status}`);if(t!==this.#l)return;let i=await r.arrayBuffer();if(t!==this.#l)return;this.#i=i}catch(r){r?.name!=="AbortError"&&t===this.#l&&this.#d()}finally{t===this.#l&&(this.#f=!1)}}sync(e,t,r){if(!this.#h||!r){this.#e?.pause();return}let i=this.#e;if(!i){this.#i&&this.#y();return}if(ee.ctx?.state!=="running")return;if(!i.playing()){i.seek(e).play();return}let n=_i();n-this.#g<un||(this.#g=n,i.follow(e))}volume(e){this.#c.volume=b.clamp01(e),this.#e?.volume(this.#c.volume)}rate(e){this.#c.rate=e,this.#e?.rate(e)}setSpatial(e,t,r){this.#o=[e,t,r];let i=this.#m("spatial");i>=0&&this.#e?.pos(e,t,r,i)}setSourceMatrix(e,t,r=1){let i=e.pointTo?.(this.#n,t,r)??X.pointTo(this.#n,e,t,r);this.setSpatial(i.x,i.y,i.z)}setListenerMatrix(e){let t=this.#m("listener");if(t<0)return;let r=e.poseTo?.(this.#a)??X.poseTo(this.#a,e);ee.listener(...r,t)}setPanner(e){Object.assign(this.#c.pannerAttr,e),this.#e?.pannerAttr(e)}stop(){this.#e?.pause()}get enabled(){return this.#h&&ee.ctx?.state==="running"}enable(){this.#h=!0,ee.resume(),this.#i&&this.#y()}disable(){this.#h=!1,this.#e?.pause()}unload(){this.#l++,this.#t?.abort(),this.#t=null,this.#e?.stop().unload(),this.#d(),ee.resetListener()}#d(){this.#e=null,this.#r=null,this.#i=null,this.#s=null,this.#f=!1}#m(e){let t=_i(),r=e==="listener"?this.#p:this.#u;return r&&t-r<pn?-1:(e==="listener"?this.#p=t:this.#u=t,b.deltaSeconds(t,r,0,hn))}#y(){if(this.#e)return Promise.resolve(this.#e);if(this.#s)return this.#s;if(!this.#i)return Promise.resolve(null);let e=this.#l;return this.#s=vr.fromArrayBuffer(this.#i,{...this.#c,pos:this.#o}).then(t=>e!==this.#l?(t.unload(),null):(this.#i=null,this.#e=t,t)).catch(t=>(e===this.#l&&this.#d(),null)).finally(()=>{e===this.#l&&(this.#s=null)}),this.#s}};var ot=class{#e;#r=0;#t=!1;constructor(e){this.#e=e}get id(){return this.#r}get isStatic(){return this.#t}get isReady(){return this.#e.sceneReady(this.#r)}get progress(){return this.#e.sceneProgress(this.#r)}get duration(){return this.#t?0:this.#e.sceneDuration(this.#r)}get isBuffering(){return this.#t?!1:this.#e.sceneIsBuffering(this.#r)}get lastFetchStatus(){return this.#e.sceneLastFetchStatus(this.#r)}setTime(e){this.#r&&!this.#t&&this.#e.sceneSetTime(this.#r,e)}setVisible(e){this.#r&&this.#e.sceneSetVisible(this.#r,e)}getBBox(){return this.#e.sceneGetBBox(this.#r)}setEnvLighting(e,t){this.#r&&this.#e.sceneSetEnvLighting(this.#r,e,t)}clearEnvLighting(){this.#r&&this.#e.sceneClearEnvLighting(this.#r)}setModelMatrix(e){this.#r&&this.#e.sceneSetModelMatrix(this.#r,e)}openDynamic(e){if(this.remove(),this.#r=this.#e.addDynamicScene(),this.#t=!1,e.localFile||e.file){let r=e.localFile||e.file;this.#e.sceneOpenLocal(this.#r,this.#e.registerLocalFile(r));return}let t=e.url;if(e.token){this.#e.sceneOpenApi(this.#r,t,e.token);return}this.#e.sceneOpen(this.#r,t)}async openStatic(e){this.remove();let t=this.#e.addStaticScene();this.#r=t,this.#t=!0;let r=e.file?await e.file.arrayBuffer():await(await fetch(e.url)).arrayBuffer();this.#r===t&&this.#e.sceneOpenStatic(t,new Uint8Array(r))}remove(){this.#r&&(this.#e.removeScene(this.#r),this.#r=0)}};var Ti={alpha:!0,premultipliedAlpha:!0,depth:!0,stencil:!1,antialias:!1,powerPreference:"high-performance",xrCompatible:!0},Ne=class s{#e;#r;#t=new kt;#i=0;#s=null;#o=null;#n=!1;#a=0;#c=0;#h=1;#l=null;#p=null;static GL_CANVAS_OPTS=Ti;constructor(e,t){this.#e=e,this.#r=t,typeof document<"u"&&document.addEventListener("visibilitychange",this.#u)}#u=()=>{document.hidden&&this.#t.stop()};static async create(e,{canvas:t,gl:r,backend:i,maxSplatsCount:n}={}){if(!t&&!r)throw new Error("canvas or gl required");let a=i??(r?"hybrid":"pure"),{module:o,device:l}=await Rt.boot(e,t||r.canvas,{maxSplatsCount:n}),c=new s(o,l);return a==="hybrid"?c.#d(r??s.#g(t)):c.#f(t),c}static preferredFormat(){return navigator.gpu.getPreferredCanvasFormat()}static#g(e){let t=e.getContext("webgl2",Ti);if(!t)throw new Error("WebGL2 not available");return t}get device(){return this.#r}get backend(){return this.#e.backend}get buildUnixTime(){return this.#e.buildUnixTime}get gl(){return this.#p}get isBGRA(){return s.preferredFormat()==="bgra8unorm"}assertDevice(e){if(e&&e!==this.#r)throw new Error("WebGPU device must match GraciaPlayer.device")}configureSurface(e,t={}){let{format:r,alphaMode:i="premultiplied",usage:n}=t;e.configure({device:this.#r,format:r??s.preferredFormat(),alphaMode:i,...n!=null?{usage:n}:{}})}bindCanvas(e,t={}){let r=e.getContext("webgpu");if(!r)throw new Error("WebGPU canvas context not available");return this.configureSurface(r,t),this.#l=r,r}setBackend(e,{canvas:t,gl:r}={}){if(this.shutdown(),e==="hybrid"){if(!r&&!t)throw new Error("canvas or gl required for hybrid backend");this.#d(r??s.#g(t))}else this.#f(t)}present(e,t){e===0||t===0||(this.#e.backend==="hybrid"?this.#y(e,t):this.#m())}renderTextures({color:e,depth:t,w:r,h:i}){return this.#b(),this.#e.backend!=="pure"?!1:this.#e.pureRenderTo(e,t,r,i)}copyTexture(e,t,r=null){let i=r??[e.width,e.height,1],n=this.#r.createCommandEncoder();n.copyTextureToTexture({texture:e},{texture:t},i),this.#r.queue.submit([n.finish()])}renderHybridViewport(e,t,{gl:r,drawMode:i,enableMesh:n=!1,x:a=0,y:o=0,eye:l=0}={}){let c=r??this.#p;if(!c)throw new Error("No WebGL context");let h=i??this.#i;this.preprocess(e,t),c.enable(c.DEPTH_TEST),c.depthFunc(c.LEQUAL),c.depthMask(!1),this.render(h,a,o,e,t,l),n&&(c.colorMask(!1,!1,!1,!1),c.depthMask(!0),this.render(1,a,o,e,t,l),c.colorMask(!0,!0,!0,!0)),c.depthMask(!0)}shutdown(){this.#e.shutdownBackend(),this.#p=null,this.#l=null}#f(e){this.#p=null,this.#l=null,this.#r.pushErrorScope("validation"),this.#e.initPure(this.isBGRA),this.#r.popErrorScope().then(t=>{}),e&&this.bindCanvas(e)}#d(e){this.#l=null,this.#p=e,this.#e.initHybrid(e)}#m(){if(!this.#l)throw new Error("bindCanvas() required");let{width:e,height:t}=this.#l.canvas;e===0||t===0||this.renderTextures({color:this.#l.getCurrentTexture(),w:e,h:t})}#y(e,t){let r=this.#p;if(!r)throw new Error("hybrid backend required");r.bindFramebuffer(r.FRAMEBUFFER,null),r.clearColor(0,0,0,0),r.clearDepth(1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.disable(r.DEPTH_TEST),this.frame(e,t,this.#i)}get drawMode(){return this.#i}set drawMode(e){this.#i=b.clampInt(e,0,3)}get#x(){return this.#s??this.#o}get isReady(){return(this.#x?.isReady??!1)&&this.#t.isLoaded}get progress(){return this.#x?.progress??0}get duration(){return this.#s?.duration??0}get currentTime(){return this.#a}get isPlaying(){return this.#n}get isBuffering(){return this.#s?.isBuffering??!1}get lastFetchStatus(){return this.#x?.lastFetchStatus??0}play(){this.#n=!0}pause(){this.#n=!1,this.#c=0,this.#t.stop()}seek(e){this.#a=e,this.#c=0}get speed(){return this.#h}setSpeed(e){this.#h=b.clamp(b.finite(e,1),.1,4),this.#t.rate(this.#h)}close(){this.#s?.remove(),this.#s=null,this.#o?.remove(),this.#o=null,this.#a=0,this.#n=!1,this.#t.unload()}clearVideo(){this.#s?.remove(),this.#s=null,this.#a=0,this.#n=!1,this.#c=0,this.#t.unload()}clearEnvironment(){this.#o?.remove(),this.#o=null}#b(){if(!this.#s)return;let e=performance.now(),t=this.#n&&!this.isBuffering&&this.#c>0;if(t){this.#a+=b.deltaSeconds(e,this.#c)*this.#h;let r=this.duration;r>0&&(this.#a=b.wrap(this.#a,r))}this.#c=this.#n&&!this.isBuffering?e:0,this.#s.setTime(this.#a),this.#t.sync(this.#a,this.duration,this.isReady&&t)}open(e){if(this.#t.unload(),e.audio&&this.#t.load(e.audio),e.type==="static")return this.#v(e);this.#s||(this.#s=new ot(this.#e)),this.#s.openDynamic(e),this.#a=0,this.#n=!1}async#v(e){this.#o||(this.#o=new ot(this.#e)),await this.#o.openStatic(e)}get audioContext(){return this.#t.context}get audioEnabled(){return this.#t.enabled}enableAudio(){this.#t.enable()}disableAudio(){this.#t.disable()}setAudioOutput(e){this.#t.setOutput(e)}setVolume(e){this.#t.volume(e)}loadAudio(e){return this.#t.load(e)}setAudioSpatial(e,t,r){this.#t.setSpatial(e,t,r)}setAudioSourceMatrix(e,t,r){this.#t.setSourceMatrix(e,t,r)}setAudioListenerMatrix(e){this.#t.setListenerMatrix(e)}setAudioPanner(e){this.#t.setPanner(e)}setCamera(e,t,r,i){this.#e.setCamera(e,t,r,i)}getBBox(){return this.#x?.getBBox()??null}getModelMatrix(){return this.#e.getModelMatrix()}setModelMatrix(e){this.#e.setModelMatrix(e)}setStaticModelMatrix(e){this.#o?.setModelMatrix(e)}setEnvLighting(e,t=1){this.#s?.setEnvLighting(e,t),this.#o?.setEnvLighting(e,t)}clearEnvLighting(){this.#s?.clearEnvLighting(),this.#o?.clearEnvLighting()}frame(e,t,r){this.#b(),this.#e.hybridFrame(e,t,r)}preprocess(e,t){return this.#b(),this.#e.hybridPreprocess(e,t)}render(e,t,r,i,n,a){this.#e.hybridRender(e,t,r,i,n,a)}renderMesh(e,t,r,i,n){this.#e.hybridRenderMesh(e,t,r,i,n)}renderMotionMV(e,t,r,i){this.#e.hybridRenderMotionMV(e,t,r,i)}canMotion(){return this.#e.hybridCanMotion()}hasMultiview(){return this.#e.hybridHasMultiview()}resetXR(){this.#e.hybridReset()}dispose(){typeof document<"u"&&document.removeEventListener("visibilitychange",this.#u),this.close(),this.#t.unload(),this.shutdown(),this.#e.dispose()}};var at={daylight:{ambient:[3.62,3.54,3.37],topDown:[.5,.45,.4]},cloudy:{ambient:[3.19,3.26,3.44],topDown:[.05,.05,.07]},sunset:{ambient:[4.08,3.01,1.95],topDown:[.25,.12,.02],frontBack:[.15,.06,0],leftRight:[-.3,-.12,0]},indoor:{ambient:[3.72,3.37,2.84],topDown:[.3,.25,.15]},shade:{ambient:[3.12,3.3,3.72],topDown:[.1,.15,.3]},night:{ambient:[2.48,2.66,3.01],topDown:[.08,.1,.15]},off:null};var yn=2.5,Mi=1.6,xn=.0015,bn=2,Pi=.5,vn=.6,_n=.022,wn=1e-4,It=Math.PI/2-.01,Ft=.05,Bt=200,Sn=new Set(["w","a","s","d","r","f","q","e","shift"]),lt=class{#e;#r=new Map;#t=null;#i=1;#s;#o;#n;#a=0;#c=0;#h=0;#l=0;#p=0;#u=e=>e.preventDefault();constructor(e,{pan:t=!0,rotate:r=yn,onDown:i}={}){this.#e=e,this.#s=t,this.#o=r,this.#n=i,this.#i=e.clientHeight||1,e.addEventListener("contextmenu",this.#u),e.addEventListener("pointerdown",this.#g),e.addEventListener("wheel",this.#m,{passive:!1})}get height(){return this.#i}consume(e){return e.rotX=this.#a,e.rotY=this.#c,e.panX=this.#h,e.panY=this.#l,e.zoom=this.#p,this.#a=this.#c=this.#h=this.#l=this.#p=0,e}dispose(){this.#e.removeEventListener("contextmenu",this.#u),this.#e.removeEventListener("pointerdown",this.#g),this.#e.removeEventListener("wheel",this.#m),window.removeEventListener("pointermove",this.#f),window.removeEventListener("pointerup",this.#d),window.removeEventListener("pointercancel",this.#d),this.#r.clear(),this.#t=null}#g=e=>{this.#e.setPointerCapture?.(e.pointerId),this.#r.size===0&&(window.addEventListener("pointermove",this.#f),window.addEventListener("pointerup",this.#d),window.addEventListener("pointercancel",this.#d)),this.#r.set(e.pointerId,{x:e.clientX,y:e.clientY,button:e.button,touch:e.pointerType==="touch"}),this.#i=this.#e.clientHeight||this.#i,this.#r.size===2&&this.#y(),this.#n?.()};#f=e=>{let t=this.#r.get(e.pointerId);if(!t)return;let r=e.clientX-t.x,i=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,this.#r.size>=2)return this.#x();!t.touch&&(t.button===2||e.buttons===2)?this.#s&&(this.#h+=r,this.#l+=i):(this.#a+=r/this.#i*this.#o,this.#c+=i/this.#i*this.#o)};#d=e=>{this.#e.releasePointerCapture?.(e.pointerId),this.#r.delete(e.pointerId),this.#t=null,this.#r.size===0&&(window.removeEventListener("pointermove",this.#f),window.removeEventListener("pointerup",this.#d),window.removeEventListener("pointercancel",this.#d))};#m=e=>{e.preventDefault(),this.#p+=-e.deltaY*xn};#y(){let[e,t]=this.#r.values();this.#t={dist:Math.hypot(e.x-t.x,e.y-t.y),cx:(e.x+t.x)/2,cy:(e.y+t.y)/2}}#x(){let[e,t]=this.#r.values(),r=Math.hypot(e.x-t.x,e.y-t.y),i=(e.x+t.x)/2,n=(e.y+t.y)/2,a=this.#t;a&&(a.dist>0&&r>0&&(this.#p+=Math.log(r/a.dist)),this.#s&&(this.#h+=i-a.cx,this.#l+=n-a.cy)),this.#t={dist:r,cx:i,cy:n}}},Tn=s=>1-Math.exp(-s/_n),te=()=>({rotX:0,rotY:0,panX:0,panY:0,zoom:0}),Pn=s=>Math.abs(s.rotX)+Math.abs(s.rotY)+Math.abs(s.panX)+Math.abs(s.panY)+Math.abs(s.zoom)<wn;function Tr(s,e,t,r,i){let n=s.consume(e);if(t.rotX+=n.rotX,t.rotY+=n.rotY,t.panX+=n.panX,t.panY+=n.panY,t.zoom+=n.zoom,Pn(t))return!1;let a=Tn(i);for(let o of["rotX","rotY","panX","panY","zoom"])r[o]=t[o]*a,t[o]-=r[o];return!0}var _r=class{#e;#r;#t=T.create();#i=T.create();#s=T.create();#o=T.create();#n=T.create();#a=T.create();#c=1;#h=0;#l=0;#p=!1;#u=null;#g=te();#f=te();#d=te();constructor(e,t){this.#e=e,this.#r=new lt(t),this.#v()}get type(){return"orbit"}update(e){this.#y(e)&&this.#v()}frame(e,t){this.#_(e,t)}reset(e,t){this.#_(e,t)}zoom(e){e>0&&(this.#f.zoom+=Math.log(e))}setBounds(e){this.#u=e,this.#v()}applyConstraints(e){this.#p=e,this.#l=b.clamp(this.#l,-It,this.#m),this.#v()}dispose(){this.#r.dispose()}get#m(){return this.#p?0:It}#y(e){if(!Tr(this.#r,this.#g,this.#f,this.#d,e))return!1;let t=this.#d;return this.#h+=t.rotX,this.#l=b.clamp(this.#l-t.rotY,-It,this.#m),t.zoom&&(this.#c=b.clamp(this.#c*Math.exp(-t.zoom),Ft,Bt)),(t.panX||t.panY)&&this.#b(t.panX,t.panY),!0}#x(){this.#o.yawPitchBasis(this.#h,this.#l,this.#i,this.#s,this.#n)}#b(e,t){this.#x();let r=b.perspectiveScale(this.#c,this.#e.fov,this.#r.height)*Mi;this.#t.addScaled(this.#o,-e*r).addScaled(this.#n,t*r)}#v(){this.#x();let e=this.#c;this.#u&&(this.#u.clampPoint(this.#t),e=Math.min(e,this.#u.rayLimit(this.#t,this.#s,e))),this.#e.position.copy(this.#s).scale(e).add(this.#t),this.#e.setAxes(this.#o,this.#n,this.#s)}#_(e,t){this.#t.from(e),this.#s.sub(this.#a.from(t),this.#t),this.#c=b.clamp(this.#s.len,Ft,Bt),this.#i.copy(this.#s).scale(-1).normalize(E.FORWARD),this.#a.yawPitch(this.#i),this.#h=this.#a.x,this.#l=b.clamp(this.#a.y,-It,this.#m),this.#f=te(),this.#v()}},wr=class{#e;#r;#t=new Set;#i=K.create();#s=T.create();#o=T.create();#n=T.create();#a=T.create();#c=T.create();#h=null;#l=te();#p=te();#u=te();constructor(e,t){this.#e=e,t.hasAttribute("tabindex")||(t.tabIndex=0),this.#r=new lt(t,{pan:!1,onDown:()=>t.focus()}),window.addEventListener("keydown",this.#m),window.addEventListener("keyup",this.#y)}get type(){return"fly"}update(e){let t=this.#g(e);this.#f(e)&&(t=!0),t&&this.#d()}frame(e,t){this.reset(e,t)}reset(e,t){this.#e.position.from(t),this.#s.sub(this.#c.from(e),this.#e.position).normalize(E.FORWARD),this.#c.yawPitch(this.#s),this.#i.identity().rotate(E.Y,-this.#c.x).rotate(E.X,this.#c.y),this.#p=te(),this.#d()}zoom(e){e>0&&(this.#p.zoom+=Math.log(e))}setBounds(e){this.#h=e,this.#d()}applyConstraints(e){}dispose(){this.#r.dispose(),window.removeEventListener("keydown",this.#m),window.removeEventListener("keyup",this.#y),this.#t.clear()}#g(e){let t=bn*e*(this.#t.has("shift")?4:1),r=this.#e.position,i=!1,n=(o,l)=>{r.addScaled(o,l),i=!0},a=o=>{this.#i.rotate(E.Z,o),i=!0};return this.#t.has("w")&&n(this.#s,t),this.#t.has("s")&&n(this.#s,-t),this.#t.has("d")&&n(this.#n,t),this.#t.has("a")&&n(this.#n,-t),this.#t.has("r")&&n(this.#a,t),this.#t.has("f")&&n(this.#a,-t),this.#t.has("q")&&a(Pi*e),this.#t.has("e")&&a(-Pi*e),i}#f(e){if(!Tr(this.#r,this.#l,this.#p,this.#u,e))return!1;let t=this.#u;return t.rotX&&this.#i.rotate(E.Y,-t.rotX),t.rotY&&this.#i.rotate(E.X,-t.rotY),t.zoom&&this.#e.position.addScaled(this.#s,t.zoom*vn),!0}#d(){this.#h?.clampPoint(this.#e.position),this.#i.normalize(),this.#n.copy(E.X).transformQuat(this.#i),this.#a.copy(E.Y).transformQuat(this.#i),this.#o.copy(E.Z).transformQuat(this.#i),this.#s.copy(this.#o).scale(-1),this.#e.setAxes(this.#n,this.#a,this.#o)}#m=e=>{let t=e.key.toLowerCase();!Sn.has(t)||this.#x()||(this.#t.add(t),e.preventDefault())};#y=e=>{this.#t.delete(e.key.toLowerCase())};#x(){let e=document.activeElement;return e?.tagName==="INPUT"||e?.tagName==="TEXTAREA"||e?.isContentEditable}},Sr=class{#e;#r;#t=T.create();#i=T.create();#s=T.create().copy(E.Y);#o=T.create();#n=T.create();#a=T.create();#c=T.create();#h=T.create();#l=T.create();#p=K.create();#u=null;#g=te();#f=te();#d=te();constructor(e,t){this.#e=e,this.#r=new lt(t)}get type(){return"trackball"}update(e){if(!Tr(this.#r,this.#g,this.#f,this.#d,e))return;let t=this.#d;(t.rotX||t.rotY)&&this.#y(t.rotX,t.rotY),t.zoom&&this.#x(t.zoom),(t.panX||t.panY)&&this.#b(t.panX,t.panY),this.#v()}frame(e,t){this.#_(e,t)}reset(e,t){this.#_(e,t)}zoom(e){e>0&&(this.#f.zoom+=Math.log(e))}setBounds(e){this.#u=e,this.#v()}applyConstraints(e){}dispose(){this.#r.dispose()}#m(){this.#o.copy(this.#i).normalize(E.Z),this.#n.cross(this.#s,this.#o).normalize(E.X),this.#a.cross(this.#o,this.#n)}#y(e,t){this.#m(),this.#c.copy(this.#n).scale(e).addScaled(this.#a,-t);let r=this.#c.len;r<1e-6||(this.#h.cross(this.#c,this.#i).normalize(E.Y),this.#p.setAxisAngle(this.#h,r),this.#i.transformQuat(this.#p),this.#s.transformQuat(this.#p).normalize())}#x(e){this.#i.setLength(b.clamp(this.#i.len*Math.exp(-e),Ft,Bt))}#b(e,t){this.#m();let r=b.perspectiveScale(this.#i.len,this.#e.fov,this.#r.height)*Mi;this.#t.addScaled(this.#n,-e*r).addScaled(this.#a,t*r)}#v(){if(this.#u){this.#u.clampPoint(this.#t);let e=this.#i.len,t=this.#u.rayLimit(this.#t,this.#o.copy(this.#i).normalize(E.Z),e);t<e&&this.#i.scale(t/e)}this.#e.up.copy(this.#s),this.#e.position.copy(this.#t).add(this.#i),this.#e.lookAt(this.#t)}#_(e,t){this.#t.from(e),this.#i.sub(this.#l.from(t),this.#t),this.#i.setLength(b.clamp(this.#i.len,Ft,Bt)),this.#s.copy(E.Y),this.#m(),this.#s.copy(this.#a),this.#f=te(),this.#v()}};function Pr(s,e,t){switch(s){case"fly":return new wr(e,t);case"trackball":return new Sr(e,t);default:return new _r(e,t)}}var Mr=class{position=T.create();target=T.create();up=T.create().copy(E.Y);matrixWorld=X.create();projectionMatrix=X.create();fov;aspect;near;far;constructor(e=60,t=1,r=.05,i=1e4){this.fov=e,this.aspect=t,this.near=r,this.far=i,this.updateProjectionMatrix(),this.updateMatrixWorld()}lookAt(e){return this.target.from(e),this.updateMatrixWorld()}updateProjectionMatrix(){this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far)}updateMatrixWorld(){return this.matrixWorld.cameraWorld(this.position,this.target,this.up),this.matrixWorld}setAxes(e,t,r){return this.up.copy(t),this.target.copy(this.position).addScaled(r,-1),this.matrixWorld.cameraWorldAxes(this.position,e,t,r)}},Ci=1.5,Ei=1,Mn=[0,.4,0],Cn=-.25,zt=class{#e=X.create();#r=T.create();#t=T.create();#i;#s;#o;#n=!1;#a=!1;#c=1;#h=null;#l=null;#p=null;constructor(e,t="orbit"){this.#o=e,this.#i=new Mr,this.#s=Pr(t,this.#i,e),this.#u()}get canPresent(){return this.#n}get controls(){return this.#s}get controlsType(){return this.#s.type}setControls(e){e!==this.#s.type&&(this.#s.dispose(),this.#s=Pr(e,this.#i,this.#o),this.reset(),this.#s.setBounds(this.#h),this.#s.applyConstraints(this.#a))}setSceneTransform(e){e?this.#e.fromTransform(e):this.#e.identity(),this.#a=!!e,this.#s.applyConstraints(this.#a),this.#n=!1}setAudioPosition(e){e?this.#r.fromXYZ(e):this.#r.set(0,0,0)}setViewZSign(e){this.#c=e<0?-1:1,this.#n=!1}setBBox(e){if(!e)return;this.#e.pointTo(this.#t,Ct.center(this.#t,e)).addXYZ(0,Cn);let t=this.#t.toArray(),r=[0,Ci,Ei*this.#c];this.#l=t,this.#p=r,this.#s.frame(t,r),this.#n=!0}setCameraBounds(e){this.#h=e?new nt(e):null,this.#s.setBounds(this.#h)}update(e){this.#s.update(e)}apply(e,t,r){e.setModelMatrix(this.#e),t>0&&r>0&&(this.#i.aspect=t/r,this.#i.updateProjectionMatrix()),e.setCamera(this.#i.matrixWorld,this.#i.projectionMatrix),this.#n&&(e.setAudioSourceMatrix(this.#e,this.#r),e.setAudioListenerMatrix(this.#i.matrixWorld))}zoom(e){this.#s.zoom(e)}reset(){this.#l&&this.#p?(this.#s.frame(this.#l,this.#p),this.#n=!0):this.#u()}dispose(){this.#s.dispose()}#u(){this.#s.reset(Mn,{x:0,y:Ci,z:Ei}),this.#n=!1}};var Gt=class{#e;#r;#t;#i;#s;#o;#n;#a;#c=null;#h=!1;#l=!1;#p=!1;#u=null;#g=0;onFrame=null;onBeforeRender=null;onEyeRender=null;onASWRender=null;onRefReset=null;onSessionEnd=null;externalLayers=[];constructor(e,t){this.#e=e,this.#r=t}get session(){return this.#t}get active(){return!!this.#t}get aswAvailable(){return!!this.onASWRender}get aswActive(){return this.#h&&!!this.#t}get layeredActive(){return this.#l&&!!this.#t}get isAR(){return this.#p&&!!this.#t}get defaultDt(){return 1/(this.#h?36:72)}get binding(){return this.#s}get refSpace(){return this.#i}set soundPosition(e){this.#u=e?[e.x,e.y,e.z]:null}async enter(e=!1){if(!navigator.xr||this.#t)return{isQuest:!1,isPico:!1,isAVP:!1};let t=this.#r,r=this.#e;this.#p=e,this.#c=t.getExtension("OCULUS_multiview")||t.getExtension("OVR_multiview2")||null;let i=navigator.userAgent,n=/PicoBrowser/i.test(i),a=/OculusBrowser/i.test(i)&&!n,o=/Version\//.test(i)&&/Safari\//.test(i)&&!a&&!n;if(this.#t=await navigator.xr.requestSession(e?"immersive-ar":"immersive-vr",{optionalFeatures:["local-floor",e&&"local",a&&"layers",a&&"space-warp",(a||n)&&"hand-tracking"].filter(Boolean)}),!this.#t)throw new Error(`Failed to start ${e?"AR":"VR"} session`);let l=new Set(this.#t.enabledFeatures??[]);for(let h of["local-floor","local","viewer"])try{this.#i=await this.#t.requestReferenceSpace(h);break}catch{}this.#i?.addEventListener("reset",()=>this.onRefReset?.()),this.#l=this.#h=!1;let c=n?.75:1;if(l.has("layers"))try{t.getExtension("EXT_color_buffer_half_float"),this.#s=new XRWebGLBinding(this.#t,t),this.#o=this.#s.createProjectionLayer({textureType:"texture-array",depthFormat:t.DEPTH_COMPONENT24,scaleFactor:c,...e&&{clearOnAccess:!1}}),this.#l=!0,this.#h=l.has("space-warp"),!this.#h&&this.#o.fixedFoveation!==void 0&&(this.#o.fixedFoveation=1),await this.#t.updateRenderState({layers:[this.#o]}),this.#n=t.createFramebuffer(),this.#h&&(this.#a=t.createFramebuffer())}catch{this.#l=this.#h=!1,this.#s=this.#o=null}if(!this.#l){let h=new XRWebGLLayer(this.#t,t,{framebufferScaleFactor:c,...e&&{alpha:!0}});h.fixedFoveation!==void 0&&(h.fixedFoveation=1),await this.#t.updateRenderState({baseLayer:h})}return r.resetXR(),this.#t.addEventListener("end",()=>this.#y()),this.#g=0,this.#t.requestAnimationFrame(this.#f),{isQuest:a,isPico:n,isAVP:o}}#f=(e,t)=>{let r=this.#t;if(!r)return;r.requestAnimationFrame(this.#f);let i=b.deltaSeconds(e,this.#g,this.defaultDt,4*this.defaultDt);this.#g=e,this.onFrame?.(i,t)};exit(){this.#t?.end()}renderFrame(e,t,r=1){let i=this.#e,n=this.#r,a=t.getViewerPose(this.#i);if(!a||a.views.length<1)return;let o=this.#x(a);if(!this.#p&&o.length<2){this.#d(i,a,r);return}(o.length>=2||this.#p)&&(this.onBeforeRender?.(e,t,this.#i,a,t.session.inputSources,i),this.#m());let l=o[1]??null;i.setCamera(o[0].transform.matrix,o[0].projectionMatrix,l?.transform.matrix,l?.projectionMatrix),this.#h?this.#P(n,i,o):this.#l?this.#T(n,i,o):this.#_(n,i,o,t),this.#d(i,a,r)}#d(e,t,r){let i=this.#u;if(!i){let a=e.getBBox();a&&(i=[(a.minX+a.maxX)*.5,(a.minY+a.maxY)*.5,(a.minZ+a.maxZ)*.5])}let n=e.getModelMatrix();i&&n&&e.setAudioSourceMatrix(n,i,r),e.setAudioListenerMatrix(t.transform.matrix)}#m(){!this.#t||!this.#l||this.#t.updateRenderState({layers:[this.#o,...this.externalLayers]})}#y=()=>{if(!this.#t)return;let e=this.#r;this.#n&&(e.deleteFramebuffer(this.#n),this.#n=null),this.#a&&(e.deleteFramebuffer(this.#a),this.#a=null),this.#t=this.#i=this.#o=this.#s=null,this.#h=this.#l=this.#p=!1,this.#g=0,this.externalLayers=[],this.onSessionEnd?.()};#x(e){if(e.views.length<2)return[e.views[0]];let t=e.views.find(i=>i.eye==="left")||e.views[0],r=e.views.find(i=>i.eye==="right")||e.views[1];return[t,r]}#b(e,t){e.bindFramebuffer(e.FRAMEBUFFER,t),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.clearColor(0,0,0,this.#p?0:1)}#v(e,t,r,i,n,a,o,l,c,h=e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT){e.viewport(n,a,o,l),e.clear(h),t.render(t.drawMode,n,a,o,l,c),this.onEyeRender?.(e,r,i,n,a,o,l)}#_(e,t,r,i){let n=i.session.renderState.baseLayer,a=r.map(o=>n.getViewport(o));t.preprocess(a[0].width,a[0].height),e.bindFramebuffer(e.FRAMEBUFFER,n.framebuffer),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.clearColor(0,0,0,this.#p?0:1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.disable(e.DEPTH_TEST),e.depthMask(!1);for(let o=0;o<r.length;o++){let l=a[o];t.render(t.drawMode,l.x,l.y,l.width,l.height,o),this.onEyeRender?.(e,n.framebuffer,r[o],l.x,l.y,l.width,l.height)}}#T(e,t,r){let i=r.map(o=>this.#s.getViewSubImage(this.#o,o)),n=i[0].colorTextureWidth,a=i[0].colorTextureHeight;t.preprocess(n,a),this.#b(e,this.#n);for(let o=0;o<r.length;o++){let l=i[o],c=l.imageIndex??o;e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.colorTexture,0,c),l.depthStencilTexture&&e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,c),this.#v(e,t,this.#n,r[o],0,0,n,a,o)}e.bindFramebuffer(e.FRAMEBUFFER,null)}#P(e,t,r){let i=r.map(h=>this.#s.getViewSubImage(this.#o,h)),n=i[0].colorTextureWidth,a=i[0].colorTextureHeight,o=i.map((h,p)=>h.imageIndex??p);this.#o&&(this.#o.deltaPose=null),t.preprocess(n,a),this.#b(e,this.#n);for(let h=0;h<r.length;h++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[h].colorTexture,0,o[h]),this.#v(e,t,this.#n,r[h],0,0,n,a,h,e.COLOR_BUFFER_BIT);let l=i[0];if(l.motionVectorTexture&&l.depthStencilTexture){let h=l.motionVectorTextureWidth,p=l.motionVectorTextureHeight,u=t.canMotion();if(e.bindFramebuffer(e.FRAMEBUFFER,this.#a),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.depthMask(!0),e.clearColor(0,0,0,0),e.clearDepth(1),this.#c&&o.length>=2&&o[1]===o[0]+1&&t.hasMultiview())this.#c.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,l.motionVectorTexture,0,o[0],2),this.#c.framebufferTextureMultiviewOVR(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,l.depthStencilTexture,0,o[0],2),e.viewport(0,0,h,p),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),u&&t.renderMotionMV(0,0,h,p);else for(let f=0;f<r.length;f++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i[f].motionVectorTexture,0,o[f]),e.framebufferTextureLayer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,i[f].depthStencilTexture,0,o[f]),e.viewport(0,0,h,p),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),u&&t.render(3,0,0,h,p,f);let d=(f,g,m)=>({view:f,colorTex:g.colorTexture,colorIdx:m,mvTex:g.motionVectorTexture,mvIdx:m,depthTex:l.depthStencilTexture,w:n,h:a,mvW:h,mvH:p});this.onASWRender?.(e,r.map((f,g)=>d(f,i[g],o[g])))}else this.onASWRender?.(e,r.map((h,p)=>({view:h,colorTex:i[p].colorTexture,colorIdx:o[p],w:n,h:a})));e.bindFramebuffer(e.FRAMEBUFFER,null)}};var Ai=X.create().fromScaling(E.FLIP_Z),En=X.create().fromScaling(E.FLIP_X),Ln=s=>s<0?En:Ai,Li=X.create().copy(Ai).multiply(X.create().fromTranslation([0,1,-1])),Rn=.04,ge=T.create(),ct=T.create(),Ri=T.create(),Ot=class{#e=T.create();#r=K.create();#t=1;#i=T.create();#s=X.clone(Li);#o=X.create();#n="none";#a=T.create();#c={mid:T.create(),dist:0,axX:0,axZ:0};#h="undecided";#l=0;#p=0;#u=!1;#g=!1;#f=!1;get position(){return this.#e}get scale(){return this.#t}get sceneTransform(){return this.#s}get scaleLocked(){return this.#u}set scaleLocked(e){this.#u=!!e}setCenter(e,t,r){this.#i.set(e,t,r)}setSceneTransform(e,t=1){e?this.#s.fromTransform(e).preMultiply(Ln(t)):this.#s.copy(Li)}resetToInitial(){this.#e.set(0,0,0),this.#t=1,this.#r.identity()}reset(){this.#n="none"}isHeld(e){return this.#n==="dual"||this.#n===e}update(e,t,r,i,n=!0){for(let p of r)this.#y(p,i);let a=e.gripTransform?.position,o=t.gripTransform?.position,l=n&&e.active&&e.gripping&&!!a,c=n&&t.active&&t.gripping&&!!o,h=l&&e.grabRestart||c&&t.grabRestart;l&&c?this.#m(a,o,h):l?this.#d("left",a,h):c?this.#d("right",o,h):this.reset()}buildModelMatrix(){return ge.copy(this.#i).transformMat4(this.#s),ct.set(this.#t,this.#t,-this.#t),this.#o.fromPivot(this.#e,this.#r,ct,ge,this.#s)}#d(e,t,r){if(r||this.#n!==e){this.#n=e,this.#a.fromXYZ(t);return}if(ge.fromXYZ(t).sub(this.#a),ge.sqrLen>.01){this.#a.fromXYZ(t);return}this.#e.add(ge),this.#a.fromXYZ(t)}#m(e,t,r){ge.midXYZ(e,t);let i=ct.fromXYZ(e).distanceXYZ(t),n=i||1,a=(t.x-e.x)/n,o=(t.z-e.z)/n,l=this.#c;if(r||this.#n!=="dual"){this.#n="dual",l.mid.copy(ge),l.dist=i,l.axX=a,l.axZ=o,this.#h="undecided",this.#l=0,this.#p=0;return}let c=0;l.dist>.03&&i>.03&&(c=b.absLogRatio(i,l.dist));let h=l.axX,p=l.axZ;l.axX=a,l.axZ=o;let u=b.unlerp01(Math.min(Math.hypot(h,p),Math.hypot(a,o)),.08,.33),d=0;if(u>0&&(d=b.wrapPi(Math.atan2(o,a)-Math.atan2(p,h))*u),this.#h==="undecided"){this.#l+=c,this.#p+=Math.abs(d);let f=Rn;(this.#l>=f||this.#p>=f)&&(this.#h=this.#l>=this.#p?"scale":"rotate")}if(this.#h==="scale"&&!this.#u&&l.dist>.03&&i>.03){let f=this.#t;this.#t=b.clamp(f*(i/l.dist),.01,100);let g=this.#t-f;ct.copy(this.#i).transformMat4(this.#s),this.#e.add(Ri.copy(ct).multiplyXYZ(-g,-g,g))}this.#h==="rotate"&&b.outside(d,5e-4)&&this.#r.rotatePre(E.Y,d),this.#e.add(Ri.sub(ge,l.mid)),l.mid.copy(ge),l.dist=i}#y(e,t){let r=e.gamepad;if(!r?.axes||r.axes.length<2)return;if(e.handedness==="right"){let a=3.5*t,o=r.axes.length>=4?2:0,l=b.deadzone(r.axes[o],.15),c=b.deadzone(r.axes[o+1],.15);l&&this.#r.rotatePre(E.Z,-l*a),c&&this.#r.rotatePre(E.X,c*a)}let i=r.buttons?.[3]?.pressed??!1;e.handedness==="left"?(i&&!this.#g&&this.resetToInitial(),this.#g=i):(i&&!this.#f&&this.resetToInitial(),this.#f=i)}};var Nt=class{on=!1;#e=-1;update(e){this.#e<0?this.#e=e:this.#e=e>this.#e?e:(this.#e+e)*.5,this.on=this.#e<(this.on?.018:.015)}reset(){this.on=!1,this.#e=-1}},Xt=class s{static#e=30;static#r=300;static#t=.02;#i=T.create();#s=!1;#o=0;#n=null;tapped=!1;update(e,t){if(this.tapped=!1,e&&!this.#s)this.#o=performance.now(),this.#n=t?{x:t.x,y:t.y,z:t.z}:null;else if(!e&&this.#s){let r=performance.now()-this.#o,i=this.#n,n=i&&t?this.#i.fromXYZ(t).distanceXYZ(i):0;r>=s.#e&&r<=s.#r&&n<s.#t&&(this.tapped=!0)}this.#s=e}reset(){this.#s=!1,this.tapped=!1,this.#n=null}},Dt=class s{static#e=30;static#r=300;#t=!1;#i=0;tapped=!1;update(e){if(this.tapped=!1,e&&!this.#t)this.#i=performance.now(),this.#t=!0;else if(!e&&this.#t){let t=performance.now()-this.#i;t>=s.#e&&t<=s.#r&&(this.tapped=!0),this.#t=!1}}reset(){this.#t=!1,this.tapped=!1}},Ht=class{#e=[!1,!1];update(e){if(!e||e.length<=6)return 0;let t=e[5]?.pressed??!1,r=e[6]?.pressed??!1,i=t&&!this.#e[0]?-1:r&&!this.#e[1]?1:0;return this.#e[0]=t,this.#e[1]=r,i}reset(){this.#e[0]=this.#e[1]=!1}},Vt=class{#e;left={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};right={active:!1,gripping:!1,grabRestart:!1,triggerPressed:!1,menuPressed:!1,microSwipe:0,isTransientPointer:!1,rayTransform:null,gripTransform:null,indexTip:null,thumbTip:null,isHandProfile:!1};stickSrcs=[];#r=null;#t=null;#i;#s;#o;#n;#a=new Dt;#c=new Dt;constructor({directGrab:e=!1}={}){this.#n=e,this.#e=K.create().setAxisAngle(E.X,-.8),this.#s=T.create(),this.#o=K.create(),this.#i=new Map([[this.left,{side:"left",pinch:new Nt,tap:new Xt,swipe:new Ht,smooth:T.create(),smoothActive:!1,rayPos:T.create(),rayOri:K.create(),rayActive:!1}],[this.right,{side:"right",pinch:new Nt,tap:new Xt,swipe:new Ht,smooth:T.create(),smoothActive:!1,rayPos:T.create(),rayOri:K.create(),rayActive:!1}]])}#h(e){e.active=e.gripping=e.isHandProfile=e.grabRestart=e.triggerPressed=e.menuPressed=e.isTransientPointer=!1,e.microSwipe=0,e.rayTransform=e.gripTransform=e.indexTip=e.thumbTip=null}read(e,t,r,i){this.#h(this.left),this.#h(this.right),this.stickSrcs.length=0;let n=null,a=null;for(let o of r||[]){if(o.targetRayMode==="transient-pointer"){let c=e.getPose(o.targetRaySpace,t);if(!c)continue;let p=((o.gripSpace?e.getPose(o.gripSpace,t):null)??c).transform,u=this.#l(o,p.position,n,a);this.#p(u,c.transform,p,o,i),u===this.left?n=o:a=o;continue}o.gripSpace&&!o.hand&&o.gamepad?.axes?.length>=2&&!o.profiles?.some(c=>c.includes("hand"))&&this.stickSrcs.push(o);let l=o.handedness==="left"?this.left:o.handedness==="right"?this.right:null;!l||l.active||(o.hand?this.#u(l,o,e,t,i):o.gripSpace&&this.#g(l,o,e,t,i))}this.#r=n,this.#t=a,(n||a)&&(this.stickSrcs.length=0,n||(this.left.gripping=!1),a||(this.right.gripping=!1)),i.uiActive?(this.#a.reset(),this.#c.reset()):(this.#a.update(!!n),this.#c.update(!!a)),this.#a.tapped&&(this.left.menuPressed=!0),this.#c.tapped&&(this.right.menuPressed=!0);for(let[o,l]of this.#i)o.indexTip||(l.pinch.reset(),l.tap.reset(),l.swipe.reset(),l.smoothActive=!1,l.rayActive=!1)}#l(e,t,r,i){if(e.handedness==="left")return this.left;if(e.handedness==="right")return this.right;if(r&&!i)return this.right;if(i&&!r)return this.left;let n=this.left.gripTransform?.position,a=this.right.gripTransform?.position,o=n?this.#s.fromXYZ(t).distanceXYZ(n):1/0,l=a?this.#s.fromXYZ(t).distanceXYZ(a):1/0;return o<=l?this.left:this.right}#p(e,t,r,i,{isHeld:n,hitTest:a,uiActive:o}){e.rayTransform=t,e.gripTransform=r,e.active=e.triggerPressed=e.isTransientPointer=!0;let{side:l}=this.#i.get(e),c=l==="left"?this.#r:this.#t,h=c!=null&&c!==i,p=c===i;!h&&n(l)?e.gripping=!0:o||(this.#n&&p||!this.#n&&a&&a(t)||n(l==="left"?"right":"left"))&&(e.gripping=!0,h&&(e.grabRestart=!0))}#u(e,t,r,i,{isHeld:n,uiActive:a,viewerPose:o}){let l=t.hand.get("wrist");if(!l)return;let c=r.getJointPose?.(l,i);if(!c)return;e.gripTransform=c.transform;let h=this.#f(t.hand,"index-finger-tip",r,i),p=this.#f(t.hand,"thumb-tip",r,i),u=this.#f(t.hand,"index-finger-phalanx-proximal",r,i);h&&(e.indexTip=h.transform.position),p&&(e.thumbTip=p.transform.position);let d=this.#i.get(e);if(u){this.#o.fromXYZW(c.transform.orientation).mul(this.#e);let g=d.rayPos,m=d.rayOri;d.rayActive?(g.lerp(this.#s.fromXYZ(u.transform.position),.5),m.slerp(this.#o,.5)):(g.fromXYZ(u.transform.position),m.copy(this.#o),d.rayActive=!0),e.rayTransform={position:g.toXYZ(),orientation:m.toXYZW()}}else e.rayTransform=h?.transform??null,d.rayActive=!1;if(h&&p){let g=h.transform.position,m=p.transform.position;d.pinch.update(this.#s.fromXYZ(g).distanceXYZ(m)),e.gripping=e.triggerPressed=d.pinch.on}else{d.pinch.reset();let g=t.gamepad?.buttons?.[0];e.gripping=g?g.pressed||g.value>.5:!1,e.triggerPressed=e.gripping}a?(d.tap.reset(),n(d.side)||(e.gripping=!1)):(d.tap.update(d.pinch.on,c.transform.position),d.tap.tapped&&(e.menuPressed=!0)),e.gripping&&!n(d.side)&&!this.#m(c.transform.position,o)&&(e.gripping=!1),e.active=!0,e.microSwipe=d.swipe.update(t.gamepad?.buttons);let f=d.smooth;d.smoothActive||(f.fromXYZ(c.transform.position),d.smoothActive=!0),f.lerp(this.#s.fromXYZ(c.transform.position),.4),e.gripTransform={position:f.toXYZ(),orientation:c.transform.orientation}}#g(e,t,r,i,{isHeld:n,uiActive:a,viewerPose:o}){let l=r.getPose(t.gripSpace,i);l&&(e.gripTransform=l.transform);let c=r.getPose(t.targetRaySpace,i);if(c&&(e.rayTransform=c.transform),!e.gripTransform&&!e.rayTransform)return;if(e.isHandProfile=t.profiles?.some(u=>u.includes("hand"))??!1,t.targetRayMode==="tracked-pointer"&&t.gamepad?.buttons?.[0]){let u=t.gamepad.buttons[0],d=u.pressed||u.value>.5;e.gripping=e.isHandProfile?d:t.gamepad?.buttons?.[1]?.pressed??!1}else e.gripping=t.gamepad?.buttons?.[1]?.pressed??!1;e.triggerPressed=t.gamepad?.buttons?.[0]?.pressed??!1;let h=t.gamepad?.buttons;e.menuPressed=!!(h?.[4]?.pressed||h?.[5]?.pressed);let{side:p}=this.#i.get(e);e.isHandProfile&&e.gripping&&!n(p)&&(a||!this.#m(e.gripTransform?.position,o))&&(e.gripping=!1),e.gripping&&!e.gripTransform&&(e.gripping=!1),e.active=!0,e.isHandProfile&&e.rayTransform&&(e.rayTransform=this.#d(e.rayTransform.orientation,e.rayTransform.position))}#f(e,t,r,i){let n=e.get(t);return n?r.getJointPose?.(n,i)??null:null}#d(e,t){return this.#o.fromXYZW(e).mul(this.#e),{position:t,orientation:this.#o.toXYZW()}}#m(e,t){if(!t||!e)return!0;let r=t.position;this.#s.subXYZ(e,r).transformQuat(this.#o.fromXYZW(t.orientation).invert());let i=this.#s.xzLen;return i<.05||this.#s.y>-1.19*i}};var Xe=class{#e;#r;#t;#i;#s=!0;#o=!1;#n=!1;#a=!1;#c=!1;constructor(e,t=null,{directGrab:r=!1}={}){this.#e=e,this.#r=t,this.#t=new Vt({directGrab:r}),this.#i=new Ot}setOverlay(e){this.#r=e,this.#s=!0}get#h(){return this.#r?this.#r.hasBBox:this.#o}reset(){this.#i.reset(),this.#a=this.#c=!1}invalidateBBox(){this.#s=!0}setInitialTransform(e,t=1){this.#i.setSceneTransform(e,t),this.#s=!0,this.#l()}get scene(){return this.#r?.scene??null}get scale(){return this.#i.scale}get leftHand(){return this.#t.left}get rightHand(){return this.#t.right}get locked(){return this.#n}set locked(e){this.#n=!!e,this.#n&&this.#i.reset()}get scaleLocked(){return this.#i.scaleLocked}set scaleLocked(e){this.#i.scaleLocked=e}resetToInitial(){this.#i.resetToInitial(),this.#i.reset()}update(e,t,r,i,n,a=!1){let o=t.getViewerPose(r);this.#t.read(t,r,i,{isHeld:h=>this.#i.isHeld(h),hitTest:h=>this.#r?.hitTest(h)??!1,uiActive:n,viewerPose:o?.transform??null}),(this.#s||!this.#h)&&this.#p();let l=this.#t.left,c=this.#t.right;if(l.held=c.held=!1,!this.#n){this.#i.update(l,c,this.#t.stickSrcs,e,this.#h&&!a);let h=this.#i.isHeld("left"),p=this.#i.isHeld("right");l.held=h&&this.#a,c.held=p&&this.#c,this.#a=h,this.#c=p}this.#l()}#l(){this.#h&&this.#r?.applyTransform(this.#i.position,this.#i.scale),this.#e.setModelMatrix?.(this.#i.buildModelMatrix())}#p(){let e=this.#e.getBBox?.();if(!e)return;let t,r,i;this.#r?{cx:t,cy:r,cz:i}=this.#r.rebuildBBox(e,this.#i.sceneTransform):(t=(e.minX+e.maxX)/2,r=(e.minY+e.maxY)/2,i=(e.minZ+e.maxZ)/2,this.#o=!0),this.#i.setCenter(t,r,i),this.#s=!1}};var ki=s=>s?.staticUrl||s?.staticTransform?-1:1;function Ii(){let s=document.createElement("canvas");return s.style.display="block",s.style.width="100%",s.style.height="100%",s.style.touchAction="none",s}var De=class s{#e=null;#r;#t=null;#i=null;#s=null;#o=null;#n=0;#a=0;#c=null;#h=!1;#l=!1;#p=0;#u="pw";#g="pw";#f=null;#d=!1;#m={};#y=null;#x=1;#b=null;#v=null;#_=null;#T=0;#P=!1;#S=[];#w=-1;onProgress=null;onReady=null;onError=null;onFrame=null;onBeforeFrame=null;onModeChange=null;onSceneChange=null;static async create(e,{container:t,overlay:r=null,mode:i="pw"}={}){if(!t)throw new Error("container element required");if(!navigator.gpu)throw new Error("WebGPU not available");let n=new s;n.#c=r,r&&(r.onSceneChange=(o,l)=>n.loadScene(l)),navigator.xr&&(n.#m.vr=await navigator.xr.isSessionSupported("immersive-vr").catch(()=>!1),n.#m.ar=await navigator.xr.isSessionSupported("immersive-ar").catch(()=>!1));let a=i==="hw"?"hw":i==="vr"||i==="ar"?i:"pw";return n.#r=Ii(),t.appendChild(n.#r),n.#e=await Ne.create(e,{canvas:n.#r,backend:a==="hw"?"hybrid":"pure"}),n.#V(),await n.#E(a),n.#u=a,n}get player(){return this.#e}get camera(){return this.#i}get canvas(){return this.#r}get gl(){return this.#e?.gl??null}get audioContext(){return this.#e?.audioContext??null}get device(){return this.#e?.device??null}get mode(){return this.#u}get fallbackMode(){return this.#g}get xr(){return this.#s}get manipulator(){return this.#o}get drawMode(){return this.#e.drawMode}set drawMode(e){this.#e.drawMode=e}supports(e){return e==="pw"||e==="hw"||!!this.#m[e]}set sources(e){this.#S=e??[],this.#w=Math.min(this.#w,Math.max(0,this.#S.length-1)),this.#c&&(this.#c.sources=this.#S)}get sources(){return this.#S}get sceneIndex(){return this.#w}loadScene(e){let t=this.#S;if(e<0||e>=t.length)return;let r=t[e];this.#w=e,this.#b=null,this.#x=ki(r),this.setInitialTransform(r.initialTransform??null),this.setBackground(r.background??"#000"),r.controls&&this.setControls(r.controls),this.setCameraBounds(r.cameraBounds??null),this.#o&&(this.#o.locked=r.locked??this.#o.locked,this.#o.scaleLocked=r.scaleLocked??this.#o.scaleLocked);let i=r.staticTransform??null,n=r.staticUrl??null;this.#X(async a=>{if(n){let o=new File([await(await fetch(n)).arrayBuffer()],"static.sog");if(!a()||(await this.#e.open({file:o,type:"static"}),!a()))return}await this.#e.open(r),a()&&i&&this.#C(i)}),this.setAudioPosition(r.audioPosition??null),this.#c&&(this.#c.sceneIndex=e),this.onSceneChange?.(r,e)}start(){this.#h=!0,this.#k()}stop(){this.#h=!1,this.#M()}open(e){return this.#x=ki(e),this.setInitialTransform(e.initialTransform??null),this.setAudioPosition(e.audioPosition??null),this.#X(()=>this.#e.open(e))}close(){++this.#p,this.#I(),this.#e.close(),this.#l=!1,this.#h=!1;let e=this.#u,t=this.#g,r=t!=="pw"?"hybrid":"pure";r!==this.#e.backend&&this.#H(r),this.#L(),this.#u=t,t!==e&&this.onModeChange?.(t,e)}async setMode(e){if(this.#f=e,!this.#d){this.#d=!0;do e=this.#f,this.#f=null,e!==this.#u&&await this.#R(e);while(this.#f!=null);this.#d=!1}}async#R(e){let t=this.#u;await this.#F();try{await this.#B(e)}catch(r){if(e===this.#g)throw r;this.onError?.(r),await this.#B(this.#g)}this.#u!==t&&this.onModeChange?.(this.#u,t)}setAudio(e){this.#e.loadAudio(e)}setVolume(e){this.#e?.setVolume(e)}enableAudio(){this.#e?.enableAudio()}disableAudio(){this.#e?.disableAudio()}get audioEnabled(){return this.#e?.audioEnabled??!1}setAudioPanner(e){this.#e?.setAudioPanner(e)}setBackground(e){this.#r&&(this.#r.style.background=e||"#000")}setInitialTransform(e,t=null){this.#y=e??null,this.#i?.setSceneTransform(this.#y),this.#i?.setViewZSign(this.#x),this.#o&&(this.#o.setInitialTransform(this.#y,this.#x),!this.#l&&this.#S[this.#w]?.resetPositionOnStart!==!1&&this.#o.resetToInitial()),t?.translation&&t.rotation&&t.scale&&this.#C(t)}#C(e){this.#e?.setStaticModelMatrix(X.create().fromTransform(e))}reset(){this.#i?.reset()}setControls(e){this.#i?.setControls(e)}setCameraBounds(e){this.#v=e??null,this.#i?.setCameraBounds(this.#v)}setAudioPosition(e){this.#_=e??null,this.#i?.setAudioPosition(this.#_),this.#s&&(this.#s.soundPosition=this.#_)}dispose(){++this.#p,this.#I(),this.#t?.disconnect(),this.#e?.dispose()}async#E(e){if(e==="vr"||e==="ar"){if(!this.#m[e])throw new Error(`${e.toUpperCase()} not supported`);await this.#z(e==="ar")}else if(e==="pw"||e==="hw")this.#L();else throw new Error(`Unknown mode: ${e}`)}#L(){let e=new zt(this.#r);this.#i=e,this.#e.backend==="pure"&&(this.#e.drawMode=0),e.setSceneTransform(this.#y),e.setViewZSign(this.#x),e.setAudioPosition(this.#_),e.setCameraBounds(this.#v),this.#b&&e.setBBox(this.#b)}async#z(e){let t=new Gt(this.#e,this.#e.gl);t.soundPosition=this.#_,t.onSessionEnd=()=>{this.#c?.dispose(),this.#s===t&&(this.#s=null,this.#o=null,this.setMode(this.#g))};let r=null;try{let i=await t.enter(e),n=this.#S[this.#w];r=new Xe(this.#e,null,{directGrab:i.isAVP}),r.locked=n?.locked??!1,r.scaleLocked=n?.scaleLocked??!0,r.setInitialTransform(this.#y,this.#x);let a=this.#c;a&&(a.manipulator=r,await a.init(this.#e,t.session,t.binding,t.refSpace,this.#e.gl,e),t.onEyeRender=(l,c,h,p,u,d,f)=>a.renderEye(l,c,h,p,u,d,f),t.onASWRender=(l,c)=>a.render(l,c),t.onRefReset=()=>a.onRefReset?.());let o=r;t.onBeforeRender=(l,c,h,p,u,d)=>{if(o.update(l,c,h,u,a?.uiActive??!1,a?.uiDragging??!1),a){a.frame(l,c,h,p,u,d);let f=[];for(let g of a.quads??[])g.layer&&(g.visible||g.placing)&&f.push(g.layer);t.externalLayers=f}},t.onFrame=(l,c)=>{if(!this.#O(l))return;let h=o.scale;t.renderFrame(l,c,h!==1?1/h:1),this.#N()}}catch(i){throw this.#A(t),this.#c?.dispose(),t.exit(),i}if(!t.session)throw this.#A(t),new Error("XR session ended during entry");this.#o=r,this.#s=t}#A(e){e.onFrame=null,e.onSessionEnd=null,e.onBeforeRender=null,e.onEyeRender=null,e.onASWRender=null,e.onRefReset=null}#I(){this.#M(),this.#i?.dispose(),this.#i=null;let e=this.#s;e&&(this.#s=null,this.#o=null,this.#A(e),this.#c?.dispose(),e.exit())}async#F(){this.#M(),this.#i?.dispose(),this.#i=null;let e=this.#s;if(e){this.#s=null,this.#o=null,e.onFrame=null;try{await e.session?.end()}catch{}}}async#B(e){let t=e!=="pw"?"hybrid":"pure";t!==this.#e.backend&&this.#H(t),await this.#E(e),(this.#h||this.#l)&&this.#k(),this.#u=e,this.#s||(this.#g=e)}#k(){this.#i&&!this.#n&&(this.#n=requestAnimationFrame(this.#G))}#M(){this.#n&&cancelAnimationFrame(this.#n),this.#n=0,this.#a=0}#G=e=>{this.#n=requestAnimationFrame(this.#G);let t=b.deltaSeconds(e,this.#a,1/60);if(this.#a=e,!this.#O(t))return this.#M();let r=this.#i;if(!r)return this.#M();r.update(t);let{width:i,height:n}=this.#r;r.apply(this.#e,i,n),this.#D(r.canPresent),this.#e.present(i,n),this.#N()};#O(e){return this.#W(),!this.#h&&!this.#l?!1:(this.onBeforeFrame?.(e),!0)}#N(){this.#l&&this.onProgress?.(Math.round(this.#e.progress*100)),this.#U(),this.onFrame?.()}async#X(e){let t=++this.#p,r=()=>t===this.#p;this.#M(),this.#e.close(),this.#b=null,this.#D(!1),this.#l=!0,this.#T=0,this.#P=!1;try{await e(r)}catch(i){if(!r())return;this.#l=!1,this.onError?.(i)}r()&&this.#k()}#U(){let e=this.#e;if(!e?.isReady)return;let t=e.duration;if(!t||t<=0)return;let r=b.clamp01(e.currentTime/t),i=this.#T;this.#T=r,!this.#P&&(e.isBuffering||i>.95&&r<i&&(this.#P=!0,(this.#S[this.#w]?.autoSwitchToNext??!0)&&this.#w<this.#S.length-1&&this.loadScene(this.#w+1)))}#W(){if(!this.#b&&this.#e.isReady){let t=this.#e.getBBox();t&&(this.#b=t,this.#i?.setBBox(t))}let e=this.#i;if(e&&!e.canPresent&&this.#b&&e.setBBox(this.#b),!!this.#l){if(!this.#e.isReady){let t=this.#e.lastFetchStatus;t&&t!==200&&t!==206&&(this.#l=!1,this.onError?.(t));return}this.#l=!1,this.#e.play(),this.#o&&(this.#S[this.#w]?.resetPositionOnStart!==!1&&this.#o.resetToInitial(),this.#o.invalidateBBox()),this.onProgress?.(100),this.onReady?.()}}#D(e){this.#r.style.visibility=e?"visible":"hidden"}#H(e){this.#t?.disconnect();let t=Ii();this.#r.replaceWith(t),this.#r=t,this.#e?.setBackend(e,{canvas:t}),this.#V()}#V(){this.#t?.disconnect();let e=this.#r;this.#t=new ResizeObserver(([t])=>{if(!t)return;let r=b.clamp(devicePixelRatio||1,1,2),i=Math.round(t.contentRect.width*r),n=Math.round(t.contentRect.height*r);i>0&&n>0&&(e.width!==i||e.height!==n)&&(e.width=i,e.height=n)}),this.#t.observe(e)}};var Ut=class s{#e;#r;#t;#i=null;#s=null;#o=null;#n=null;#a=!1;enableMesh=!1;static attach(e,t,r){let i=new s(e,t,r);return i.#l(),i.#c(),i}constructor(e,t,r){this.#e=e,this.#r=t,this.#t=r}get player(){return this.#e}set camera(e){this.#t=e}get camera(){return this.#t}async setAudio(e){await this.#e.loadAudio(e)}setAudioPanner(e){this.#e.setAudioPanner(e)}set entity(e){if(this.#s?.node?.destroy(),this.#s=null,this.#i=e,!e)return;let t=new this.#r.root.constructor("_SplatShadow",this.#r);t.addComponent("render",{type:"box",castShadows:!0,receiveShadows:!1});let r=t.render.meshInstances[0];r.visible=!1,r.cull=!1,e.addChild(t),this.#s=r}get entity(){return this.#i}dispose(){this.#s?.node?.destroy(),this.#n&&(this.#r.renderer.setMeshInstanceMatrices=this.#n[0],this.#r.graphicsDevice.draw=this.#n[1]),this.#e.close(),this.#e.dispose()}#c(){let{renderer:e,graphicsDevice:t}=this.#r,r=e.setMeshInstanceMatrices,i=t.draw;this.#n=[r,i];let n=this;e.setMeshInstanceMatrices=function(...a){return a[0]===n.#s&&(n.#a=!0),r.apply(this,a)},t.draw=function(...a){let o=n.#a;if(n.#a=!1,o){n.enableMesh&&n.#e.isReady&&n.#h();return}return i.apply(this,a)}}#h(){let e=this.#r.graphicsDevice,t=e.gl,r=t.getParameter(t.VIEWPORT),i=e.scope.resolve("matrix_viewProjection").value;i&&(this.#o||(this.#o=new(this.#i.getWorldTransform()).constructor),this.#o.data.set(i),this.#o.mul(this.#i.getWorldTransform()),this.#e.renderMesh(this.#o.data,r[0],r[1],r[2],r[3]),this.#l())}renderFrame(){let e=this.#r.graphicsDevice,t=e.gl,r=e.width,i=e.height;!r||!i||(this.#i&&this.#e.setModelMatrix(this.#i.getWorldTransform().data),this.#t?.camera&&(this.#e.setCamera(this.#t.getWorldTransform().data,this.#t.camera.projectionMatrix.data),this.#e.setAudioListenerMatrix(this.#t.getWorldTransform().data)),this.#i&&this.#e.setAudioSourceMatrix(this.#i.getWorldTransform().data),this.#e.renderHybridViewport(r,i,{gl:t,enableMesh:this.enableMesh}),this.#l())}#l(){let e=this.#r.graphicsDevice;e.shader=null,e.boundVao=null,e.textureUnit=-1;let t=e.textureUnits;if(t)for(let r=0;r<t.length;r++)t[r][0]=t[r][1]=t[r][2]=null}};async function Cr(s,e,t){let r=`${s.replace(/\/+$/,"")}/${e}`,i=await fetch(r,{headers:{"X-VIEW-TOKEN":t}});if(!i.ok)throw new Error(`Streaming metadata fetch failed: ${i.status} ${i.statusText}`);let n=await i.json();return{metadata:n.metadata??null,audioFileLink:n.audioFileLink??null}}async function He(s,e){let t=e.replace(/\/+$/,"");return Promise.all(s.map(async(r,i)=>{let{metadata:n,audioFileLink:a}=await Cr(t,r.streamingId,r.token);return{id:r.streamingId,label:r.label??n?.name??r.streamingId,url:`${t}/${r.streamingId}/`,token:r.token,displayName:n?.name??void 0,audio:a&&n?.withAudio!==!1?a:void 0,initialTransform:n?.initialSpawn??null,locked:!1,scaleLocked:!0,autoSwitchToNext:!0,resetPositionOnStart:r.settings?.resetPositionOnStart}}))}import{useEffect as In,useMemo as Er,useReducer as Fn,useRef as Lr}from"react";import{useEffect as An,useMemo as kn,useState as Fi}from"react";function Bi(s,e){let[t,r]=Fi(!1),[i,n]=Fi(!1);An(()=>{let o=navigator.xr;if(!o||!s)return;let l=async()=>{let[c,h]=await Promise.all([o.isSessionSupported("immersive-vr").catch(()=>!1),o.isSessionSupported("immersive-ar").catch(()=>!1)]);r(c),n(h)};return l(),o.addEventListener("devicechange",l),()=>o.removeEventListener("devicechange",l)},[s]);let a=e==="vr"||e==="ar";return kn(()=>({vrSupported:t,arSupported:i,isActive:a,setMode:async o=>{await s?.setMode(o)}}),[s,t,i,a])}var Gi=new WeakMap;function Oi(s){return Gi.get(s)}var Ni={app:null,overlay:null,isContentReady:!1,isLoading:!1,progress:0,mode:"pw",error:null,isPlaying:!1,isBuffering:!1,currentTime:0,duration:0,controlsType:"orbit",isMuted:!0,volume:1};function Bn(s,e){switch(e.type){case"init":return{...s,app:e.app,overlay:e.overlay};case"frame":{let{isPlaying:t,isBuffering:r,currentTime:i,duration:n,isMuted:a}=e,o=n>0?n:s.duration;return s.isPlaying===t&&s.isBuffering===r&&s.currentTime===i&&s.duration===o&&s.isMuted===a?s:{...s,isPlaying:t,isBuffering:r,currentTime:i,duration:o,isMuted:a}}case"progress":return s.progress===e.value?s:{...s,progress:e.value};case"ready":return{...s,isContentReady:!0,isLoading:!1,progress:100};case"mode":return s.mode===e.mode?s:{...s,mode:e.mode};case"error":return{...s,error:e.error,isLoading:!1};case"open":return{...s,error:null,isLoading:!0,progress:0};case"close":return{...s,isLoading:!1,progress:0};case"reset":return{...Ni,mode:s.mode};case"seek":return{...s,currentTime:e.time};case"camera_controls":return s.controlsType===e.controlsType?s:{...s,controlsType:e.controlsType};case"set_volume":return{...s,volume:e.volume}}}var zi=new Set(["vr","ar"]);function Wt(s){let{containerRef:e,mode:t="pw",overlay:r,moduleUrl:i,moduleFactory:n,onReady:a,onProgress:o,onModeChange:l,onXRStart:c,onXREnd:h,eventLogger:p}=s,[u,d]=Fn(Bn,{...Ni,mode:t}),f=Lr(null),g=Lr(u);g.current=u;let m=Lr({onReady:a,onProgress:o,onModeChange:l,onXRStart:c,onXREnd:h,eventLogger:p});m.current={onReady:a,onProgress:o,onModeChange:l,onXRStart:c,onXREnd:h,eventLogger:p},In(()=>{let x=e.current;if(!x)return;let C=!1;return(async()=>{try{if(!n&&!i)throw new Error("[gr-react] Either moduleUrl or moduleFactory must be provided");let G=n?await n():await Et(i);if(C)return;let se=r??null;se&&(se.eventLogger={event:(L,N)=>m.current.eventLogger?.event?.(L,{...N,mode:g.current.mode}),error:(L,N)=>m.current.eventLogger?.error?.(L,{...N,mode:g.current.mode})});let O=await De.create(G,{container:x,overlay:se,mode:t});if(C){O.dispose();return}f.current=O,O.onProgress=L=>{d({type:"progress",value:L}),m.current.onProgress?.(L)},O.onReady=()=>{d({type:"ready"}),O.audioEnabled&&O.enableAudio(),m.current.onReady?.()},O.onFrame=()=>{let L=f.current?.player;L&&d({type:"frame",isPlaying:L.isPlaying??!1,isBuffering:L.isBuffering??!1,currentTime:L.currentTime??0,duration:L.duration??0,isMuted:!(L.audioEnabled??!1)})},O.onModeChange=(L,N)=>{d({type:"mode",mode:L}),m.current.onModeChange?.(L,N);let Le=zi.has(N),Oe=zi.has(L);Le&&!Oe&&m.current.onXREnd?.(),!Le&&Oe&&m.current.onXRStart?.()},O.onError=L=>{let[N,Le]=typeof L=="number"?[new Error(`Streaming fetch failed: HTTP ${L}`),"load"]:[L,"xr"];d({type:"error",error:N}),m.current.eventLogger?.error?.(N,{phase:Le,mode:g.current.mode})},O.start(),d({type:"init",app:O,overlay:se}),d({type:"camera_controls",controlsType:O.camera?.controlsType??"orbit"})}catch(G){let se=G instanceof Error?G:new Error(String(G));d({type:"error",error:se}),m.current.eventLogger?.error?.(se,{phase:"init",mode:g.current.mode})}})(),()=>{C=!0;let G=f.current;G&&(G.stop(),G.dispose()),f.current=null,d({type:"reset"})}},[e,r,t,n,i]);let{app:_}=u,I=Bi(_,u.mode),M=Er(()=>({play:()=>_?.player?.play(),pause:()=>_?.player?.pause(),togglePlay:()=>{let x=_?.player;if(!x)return;let C=!x.isPlaying;C?x.play():x.pause(),m.current.eventLogger?.event?.("play_pause",{playing:C,mode:g.current.mode})},seek:x=>{d({type:"seek",time:x}),_?.player?.seek(x),m.current.eventLogger?.event?.("seek",{position:x,mode:g.current.mode})},setSpeed:x=>_?.player?.setSpeed(x),setVolume:x=>{d({type:"set_volume",volume:x}),_?.setVolume(x)},toggleMute:()=>{let x=!_?.audioEnabled;x?_?.enableAudio():_?.disableAudio(),m.current.eventLogger?.event?.("mute_toggle",{muted:!x,mode:g.current.mode})},setAudio:x=>_?.setAudio(x)}),[_]),v=Er(()=>({controlsType:u.controlsType,zoom:x=>_?.camera?.zoom(x),reset:()=>{_?.camera?.reset(),m.current.eventLogger?.event?.("reset",{mode:g.current.mode})},setControls:x=>{if(!_)return;_.setControls(x);let C=_.camera?.controlsType??x;d({type:"camera_controls",controlsType:C}),m.current.eventLogger?.event?.("camera_controls",{controls:C,requestedControls:x,mode:g.current.mode})}}),[_,u.controlsType]),w=Er(()=>({open(x){_&&(d({type:"open"}),_.open(x))},close(){_?.close(),d({type:"close"})},dispose(){_&&(_.stop(),_.dispose())}}),[_]),S={app:_,device:_?.device??null,overlay:u.overlay,isInitialized:_!==null,isLoading:u.isLoading,isContentReady:u.isContentReady,progress:u.progress,mode:u.mode,error:u.error,isRebuffering:u.isContentReady&&(u.isLoading||u.isBuffering),...w,playback:{isPlaying:u.isPlaying,isBuffering:u.isBuffering,currentTime:u.currentTime,duration:u.duration,isMuted:u.isMuted,volume:u.volume,...M},camera:v,xr:I};return Gi.set(S,{dispatch:d}),S}import{useCallback as ht,useEffect as zn,useState as Xi}from"react";function Yt(s){let{app:e}=s,t=Oi(s)?.dispatch,[r,i]=Xi([]),[n,a]=Xi(-1);zn(()=>{if(e)return e.onSceneChange=(d,f)=>{t?.({type:"open"}),t?.({type:"camera_controls",controlsType:e.camera?.controlsType??"orbit"}),a(f)},()=>{e.onSceneChange=null}},[e,t]);let o=ht(d=>{e&&(e.sources=d),i(d),a(-1)},[e]),l=ht(d=>{e?.loadScene(d)},[e]),c=ht(()=>{e&&e.loadScene(e.sceneIndex+1)},[e]),h=ht(()=>{e&&e.loadScene(e.sceneIndex-1)},[e]),p=ht(async(d,f)=>{let g=await He(d,f);o(g),g.length>0&&l(0)},[o,l]),u=n>=0&&n<r.length?r[n]:null;return{sources:r,index:n,total:r.length,currentSource:u,hasNext:n>=0&&n<r.length-1,hasPrev:n>0,hasAudio:!!u?.audio,setSources:o,loadFromApi:p,next:c,prev:h,goTo:l}}import{jsx as R,jsxs as Gn}from"react/jsx-runtime";function Di(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M5.74023 18.7266V5.17188C5.74023 4.68359 5.86068 4.32552 6.10156 4.09766C6.34245 3.86328 6.62891 3.74609 6.96094 3.74609C7.25391 3.74609 7.55339 3.83073 7.85938 4L19.2363 10.6504C19.64 10.8848 19.9199 11.0964 20.0762 11.2852C20.2389 11.4674 20.3203 11.6888 20.3203 11.9492C20.3203 12.2031 20.2389 12.4245 20.0762 12.6133C19.9199 12.8021 19.64 13.0137 19.2363 13.248L7.85938 19.8984C7.55339 20.0677 7.25391 20.1523 6.96094 20.1523C6.62891 20.1523 6.34245 20.0352 6.10156 19.8008C5.86068 19.5664 5.74023 19.2083 5.74023 18.7266Z"})})}function Hi(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M7.3418 20.0254C6.91211 20.0254 6.58659 19.9147 6.36523 19.6934C6.15039 19.472 6.04297 19.1465 6.04297 18.7168V5.17188C6.04297 4.74219 6.15039 4.41992 6.36523 4.20508C6.58659 3.98372 6.91211 3.87305 7.3418 3.87305H9.56836C9.99154 3.87305 10.3138 3.97721 10.5352 4.18555C10.7565 4.39388 10.8672 4.72266 10.8672 5.17188V18.7168C10.8672 19.1465 10.7565 19.472 10.5352 19.6934C10.3138 19.9147 9.99154 20.0254 9.56836 20.0254H7.3418ZM14.4414 20.0254C14.0117 20.0254 13.6862 19.9147 13.4648 19.6934C13.2435 19.472 13.1328 19.1465 13.1328 18.7168V5.17188C13.1328 4.74219 13.2435 4.41992 13.4648 4.20508C13.6862 3.98372 14.0117 3.87305 14.4414 3.87305H16.6582C17.0879 3.87305 17.4102 3.97721 17.625 4.18555C17.8464 4.39388 17.957 4.72266 17.957 5.17188V18.7168C17.957 19.1465 17.8464 19.472 17.625 19.6934C17.4102 19.9147 17.0879 20.0254 16.6582 20.0254H14.4414Z"})})}function Vi(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M8.03125 15.5391C7.5 15.5391 7.10156 15.4036 6.83594 15.1328C6.57031 14.8568 6.4375 14.4375 6.4375 13.875V10.8828C6.4375 10.362 6.55208 9.97135 6.78125 9.71094L15.6875 18.6094C15.625 18.8333 15.5208 18.9974 15.375 19.1016C15.2292 19.2057 15.0547 19.2578 14.8516 19.2578C14.6745 19.2578 14.5052 19.2188 14.3438 19.1406C14.1823 19.0625 14.0104 18.9375 13.8281 18.7656L10.4531 15.6094C10.401 15.5625 10.3359 15.5391 10.2578 15.5391H8.03125ZM15.7422 14.3984L10.3203 8.99219H10.5547C10.6016 8.99219 10.6458 8.97135 10.6875 8.92969L13.8281 6.01562C14.0312 5.82812 14.2057 5.69271 14.3516 5.60938C14.4974 5.52083 14.6615 5.47656 14.8438 5.47656C15.1094 5.47656 15.3255 5.56771 15.4922 5.75C15.6589 5.92708 15.7422 6.14323 15.7422 6.39844V14.3984ZM18.4453 20.0781L5.05469 6.70312C4.9401 6.58854 4.88281 6.44792 4.88281 6.28125C4.88281 6.10938 4.9401 5.96615 5.05469 5.85156C5.17448 5.73177 5.31771 5.67448 5.48438 5.67969C5.65104 5.67969 5.79427 5.73698 5.91406 5.85156L19.2891 19.2266C19.4089 19.3464 19.4688 19.487 19.4688 19.6484C19.4688 19.8151 19.4089 19.9583 19.2891 20.0781C19.1797 20.1979 19.0391 20.2578 18.8672 20.2578C18.7005 20.2578 18.5599 20.1979 18.4453 20.0781Z"})})}function Ui(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M11.7031 19.2578C11.5208 19.2578 11.349 19.2188 11.1875 19.1406C11.026 19.0625 10.8568 18.9375 10.6797 18.7656L7.35156 15.6094C7.29948 15.5625 7.23438 15.5391 7.15625 15.5391H4.91406C4.38802 15.5391 3.98438 15.3958 3.70312 15.1094C3.42188 14.8229 3.28125 14.3958 3.28125 13.8281V10.9219C3.28125 10.3594 3.42188 9.9349 3.70312 9.64844C3.98438 9.35677 4.38802 9.21094 4.91406 9.21094H7.15625C7.23438 9.21094 7.29948 9.1875 7.35156 9.14062L10.6797 6.01562C10.8828 5.82812 11.0547 5.69271 11.1953 5.60938C11.3411 5.52083 11.5052 5.47656 11.6875 5.47656C11.9531 5.47656 12.1693 5.56771 12.3359 5.75C12.5026 5.92708 12.5859 6.14323 12.5859 6.39844V18.3828C12.5859 18.6328 12.5026 18.8411 12.3359 19.0078C12.1745 19.1745 11.9635 19.2578 11.7031 19.2578ZM15.375 15.6875C15.2188 15.5781 15.1302 15.4375 15.1094 15.2656C15.0885 15.0938 15.138 14.9245 15.2578 14.7578C15.4818 14.4401 15.6562 14.0755 15.7812 13.6641C15.9062 13.2474 15.9688 12.8125 15.9688 12.3594C15.9688 11.9062 15.9062 11.4714 15.7812 11.0547C15.6615 10.638 15.487 10.2734 15.2578 9.96094C15.1328 9.79948 15.0807 9.63281 15.1016 9.46094C15.1276 9.28385 15.2188 9.14062 15.375 9.03125C15.5104 8.9375 15.6589 8.90625 15.8203 8.9375C15.9818 8.96875 16.1146 9.0599 16.2188 9.21094C16.5208 9.60677 16.7552 10.0807 16.9219 10.6328C17.0938 11.1849 17.1797 11.7604 17.1797 12.3594C17.1797 12.9583 17.0938 13.5339 16.9219 14.0859C16.7552 14.638 16.5208 15.112 16.2188 15.5078C16.1146 15.6589 15.9818 15.75 15.8203 15.7812C15.6589 15.8073 15.5104 15.776 15.375 15.6875ZM18.2734 17.7266C18.1328 17.6276 18.0521 17.4974 18.0312 17.3359C18.0104 17.1693 18.0547 17.0052 18.1641 16.8438C18.5859 16.2344 18.9141 15.5443 19.1484 14.7734C19.388 13.9974 19.5078 13.1927 19.5078 12.3594C19.5078 11.526 19.3906 10.7214 19.1562 9.94531C18.9219 9.16927 18.5911 8.47917 18.1641 7.875C18.0495 7.71354 18.0026 7.55208 18.0234 7.39062C18.0495 7.22396 18.1328 7.09115 18.2734 6.99219C18.4193 6.89323 18.5729 6.85938 18.7344 6.89062C18.8958 6.92188 19.0286 7.01302 19.1328 7.16406C19.638 7.84115 20.0286 8.63542 20.3047 9.54688C20.5807 10.4583 20.7188 11.3958 20.7188 12.3594C20.7188 13.3229 20.5781 14.2578 20.2969 15.1641C20.0208 16.0703 19.6328 16.8672 19.1328 17.5547C19.0286 17.7057 18.8958 17.7969 18.7344 17.8281C18.5729 17.8542 18.4193 17.8203 18.2734 17.7266Z"})})}function Te(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{d:"M5.42188 13.1953V6.4375C5.42188 5.625 5.6224 5.01302 6.02344 4.60156C6.42969 4.1901 7.03646 3.98438 7.84375 3.98438H11.4297V9.71875C11.4297 10.7031 11.9219 11.1953 12.9062 11.1953H18.5625V18.2891C18.5625 19.1016 18.3594 19.7109 17.9531 20.1172C17.5521 20.5286 16.9479 20.7344 16.1406 20.7344H9.78125C10 20.3646 10.1667 19.9688 10.2812 19.5469C10.401 19.125 10.4609 18.6901 10.4609 18.2422C10.4609 17.5495 10.3307 16.8984 10.0703 16.2891C9.8099 15.6797 9.44792 15.1432 8.98438 14.6797C8.52083 14.2161 7.98438 13.8542 7.375 13.5938C6.76562 13.3281 6.11458 13.1953 5.42188 13.1953ZM12.9297 10.125C12.6432 10.125 12.5 9.98438 12.5 9.70312V4.07031C12.6615 4.09635 12.8255 4.16667 12.9922 4.28125C13.1589 4.39062 13.3333 4.53906 13.5156 4.72656L17.8203 9.10938C18.0078 9.30208 18.1562 9.47917 18.2656 9.64062C18.375 9.80208 18.4427 9.96354 18.4688 10.125H12.9297ZM5.42188 22.2109C4.88021 22.2109 4.36979 22.1068 3.89062 21.8984C3.41146 21.6953 2.98958 21.4115 2.625 21.0469C2.26042 20.6823 1.97396 20.2604 1.76562 19.7812C1.55729 19.3021 1.45312 18.7891 1.45312 18.2422C1.45312 17.6953 1.55729 17.1849 1.76562 16.7109C1.97396 16.2318 2.26042 15.8099 2.625 15.4453C2.98958 15.0755 3.41146 14.7891 3.89062 14.5859C4.36979 14.3776 4.88021 14.2734 5.42188 14.2734C5.96875 14.2734 6.48177 14.3776 6.96094 14.5859C7.4401 14.7891 7.86198 15.0729 8.22656 15.4375C8.59115 15.8021 8.875 16.224 9.07812 16.7031C9.28646 17.1823 9.39062 17.6953 9.39062 18.2422C9.39062 18.7839 9.28646 19.2943 9.07812 19.7734C8.86979 20.2526 8.58073 20.6745 8.21094 21.0391C7.84635 21.4036 7.42448 21.6901 6.94531 21.8984C6.46615 22.1068 5.95833 22.2109 5.42188 22.2109ZM5.42188 20.7266C5.56771 20.7266 5.68229 20.6823 5.76562 20.5938C5.85417 20.5052 5.89844 20.3906 5.89844 20.25V18.7188H7.42969C7.57031 18.7188 7.6849 18.6745 7.77344 18.5859C7.86198 18.5026 7.90625 18.388 7.90625 18.2422C7.90625 18.0964 7.86198 17.9818 7.77344 17.8984C7.6849 17.8099 7.57031 17.7656 7.42969 17.7656H5.89844V16.2344C5.89844 16.0938 5.85417 15.9792 5.76562 15.8906C5.68229 15.8021 5.56771 15.7578 5.42188 15.7578C5.27604 15.7578 5.15885 15.8021 5.07031 15.8906C4.98698 15.9792 4.94531 16.0938 4.94531 16.2344V17.7656H3.41406C3.27344 17.7656 3.15885 17.8099 3.07031 17.8984C2.98177 17.9818 2.9375 18.0964 2.9375 18.2422C2.9375 18.388 2.98177 18.5026 3.07031 18.5859C3.15885 18.6745 3.27344 18.7188 3.41406 18.7188H4.94531V20.25C4.94531 20.3906 4.98698 20.5052 5.07031 20.5938C5.15885 20.6823 5.27604 20.7266 5.42188 20.7266Z"})})}function Wi(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.75 6.5A3.75 3.75 0 0 0 2 10.25v3.5a3.75 3.75 0 0 0 3.75 3.75h7.5A3.75 3.75 0 0 0 17 13.75v-.46l2.9 2.16A1.25 1.25 0 0 0 22 14.45v-4.9a1.25 1.25 0 0 0-2.1-1L17 10.71v-.46a3.75 3.75 0 0 0-3.75-3.75h-7.5ZM6 8h7a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 13 16H6a2.5 2.5 0 0 1-2.5-2.5v-3A2.5 2.5 0 0 1 6 8Zm11 4.6v-1.2l3.5-2.61v6.42L17 12.6Z"})})}function Zt(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.25 6.75C3.46 6.75 2 8.21 2 10v4c0 1.79 1.46 3.25 3.25 3.25h3.24c.83 0 1.55-.54 1.8-1.33l.52-1.67h2.38l.52 1.67c.25.79.97 1.33 1.8 1.33h3.24c1.79 0 3.25-1.46 3.25-3.25v-4c0-1.79-1.46-3.25-3.25-3.25H5.25Zm.67 3.42c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52H5.92Zm10.2 0c-.84 0-1.52.68-1.52 1.52v.62c0 .84.68 1.52 1.52 1.52h1.96c.84 0 1.52-.68 1.52-1.52v-.62c0-.84-.68-1.52-1.52-1.52h-1.96Z"})})}function qt(){return Gn("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[R("path",{d:"M5.5 3.75c-.97 0-1.75.78-1.75 1.75v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5A3.25 3.25 0 0 1 5.5 2.25h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5ZM16.25 3c0-.41.34-.75.75-.75h1.5a3.25 3.25 0 0 1 3.25 3.25v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V5.5c0-.97-.78-1.75-1.75-1.75H17c-.41 0-.75-.34-.75-.75ZM3 15.5c.41 0 .75.34.75.75v2.25c0 .97.78 1.75 1.75 1.75h2.25c.41 0 .75.34.75.75s-.34.75-.75.75H5.5a3.25 3.25 0 0 1-3.25-3.25v-2.25c0-.41.34-.75.75-.75ZM21 15.5c.41 0 .75.34.75.75v2.25a3.25 3.25 0 0 1-3.25 3.25H17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.5c.97 0 1.75-.78 1.75-1.75v-2.25c0-.41.34-.75.75-.75Z"}),R("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z"})]})}function Yi(){return R("svg",{className:"gr-player__icon",viewBox:"0 0 24 24","aria-hidden":"true",children:R("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"})})}function Zi(){return R("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:R("path",{d:"m480-236 93-93q12-12 29-12t29 12q12 12 12 29t-12 29L508-148q-6 6-13 8.5t-15 2.5q-8 0-15-2.5t-13-8.5L329-271q-12-12-12-29t12-29q12-12 29-12t29 12l93 93Zm0-484-93 93q-12 12-29 12t-29-12q-12-12-12-29t12-29l123-123q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l123 123q12 12 12 29t-12 29q-12 12-29 12t-29-12l-93-93Z"})})}function qi({active:s=!1}){return R("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:s?R("path",{d:"M240-240h-80q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h120q17 0 28.5 11.5T320-280v120q0 17-11.5 28.5T280-120q-17 0-28.5-11.5T240-160v-80Zm480 0v80q0 17-11.5 28.5T680-120q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320h120q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240h-80ZM240-720v-80q0-17 11.5-28.5T280-840q17 0 28.5 11.5T320-800v120q0 17-11.5 28.5T280-640H160q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h80Zm480 0h80q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H680q-17 0-28.5-11.5T640-680v-120q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v80Z"}):R("path",{d:"M200-200h80q17 0 28.5 11.5T320-160q0 17-11.5 28.5T280-120H160q-17 0-28.5-11.5T120-160v-120q0-17 11.5-28.5T160-320q17 0 28.5 11.5T200-280v80Zm560 0v-80q0-17 11.5-28.5T800-320q17 0 28.5 11.5T840-280v120q0 17-11.5 28.5T800-120H680q-17 0-28.5-11.5T640-160q0-17 11.5-28.5T680-200h80ZM200-760v80q0 17-11.5 28.5T160-640q-17 0-28.5-11.5T120-680v-120q0-17 11.5-28.5T160-840h120q17 0 28.5 11.5T320-800q0 17-11.5 28.5T280-760h-80Zm560 0h-80q-17 0-28.5-11.5T640-800q0-17 11.5-28.5T680-840h120q17 0 28.5 11.5T840-800v120q0 17-11.5 28.5T800-640q-17 0-28.5-11.5T760-680v-80Z"})})}function jt(){return R("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:R("path",{d:"m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z"})})}function Qt(){return R("svg",{className:"gr-player__icon",viewBox:"0 -960 960 960","aria-hidden":"true",children:R("path",{d:"M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"})})}var ji=[{type:"orbit",label:"Orbit",hint:`Left-click drag to rotate / Right-click drag to pan
Scroll to zoom in/out`},{type:"trackball",label:"Trackball",hint:`Left-click drag to rotate freely / Right-click drag to pan
Scroll to zoom in/out`},{type:"fly",label:"Fly",hint:`W/S forward & back / A/D strafe / R/F up & down
Q/E roll / Drag to look around`}];var oe={PW:"pw",HW:"hw",VR:"vr",AR:"ar"},Yl=[oe.VR,oe.AR];function $t(s){return s===oe.VR||s===oe.AR}var Rr=[".mint",".sog"],Qi=Rr.join(","),$i="Open file",Kt="local://",Ki="static",On=".sog";function Ar(s){return s.toLowerCase().endsWith(On)}function Pe(s){return typeof s?.url=="string"&&s.url.startsWith(Kt)}var Ji="stepper";var Nn="@gracia/web-sdk/wasm",Xn="https://market.gracia.ai/api/v1/streaming/content";function es(){return typeof __GRACIA_MODULE_URL__=="string"?__GRACIA_MODULE_URL__:Nn}function ts(){return typeof __GRACIA_STREAMING_BASE_URL__=="string"?__GRACIA_STREAMING_BASE_URL__:Xn}function Dn(){return typeof navigator>"u"?!1:!!navigator.gpu}var Hn={xr:"xr-failed",fullscreen:"fullscreen-failed","local-file":"local-file-failed"};function Vn(s){let e=s.match(/http\s+(-?\d+)/i);return e?Number(e[1]):null}function Un(s,e){let t=e&&Hn[e];if(t)return t;let r=s.message.toLowerCase();if(r.includes("webgpu")||r.includes("not supported")||r.includes("getcontext"))return"unsupported-browser";let i=Vn(r);return i!==null?i===401||i===403?"access-denied":i===404?"not-found":i>=500?"server-error":"network":r.includes("failed to fetch dynamically imported module")?"load-failed":r.includes("forbidden")||r.includes("unauthorized")?"access-denied":Dn()?"unknown":"unsupported-browser"}var Wn=new Set(["unsupported-browser","not-found","access-denied","xr-failed","fullscreen-failed","local-file-failed"]),Yn=new Set(["xr-failed","fullscreen-failed","local-file-failed"]);function Zn(s,e){let t=!Wn.has(s);return s==="unsupported-browser"?{presentation:"blocking",recoverable:t}:Yn.has(s)?{presentation:"toast",recoverable:t}:{presentation:e?"toast":"blocking",recoverable:t}}var qn={"unsupported-browser":{title:"This browser can\u2019t run the player",body:"The player requires WebGPU. Open it in a supported browser and device."},network:{title:"Connection lost",body:"We couldn\u2019t reach the stream. Check your connection and try again."},"not-found":{title:"Scene not found",body:"This content is no longer available."},"access-denied":{title:"Access denied",body:"You don\u2019t have permission to view this content."},"server-error":{title:"Something went wrong",body:"The server had a problem loading this scene. Please try again."},"load-failed":{title:"Couldn\u2019t load the scene",body:"We couldn\u2019t load this scene. Please try again."},"xr-failed":{title:"Couldn\u2019t enter immersive mode",body:"Immersive mode isn\u2019t available right now."},"fullscreen-failed":{title:"Couldn\u2019t enter fullscreen",body:"Fullscreen isn\u2019t available right now."},"local-file-failed":{title:"Couldn\u2019t open the file",body:"We couldn\u2019t open that file. Try a different one."},unknown:{title:"Something went wrong",body:"We couldn\u2019t load this scene. Please try again."}};function jn(s){return qn[s]}function rs(s,e,t){let r=Un(s,t);return{kind:r,cause:s,...Zn(r,e),...jn(r)}}var is="data:font/woff2;base64,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";var ss=`@font-face {\r
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
`;var ns="gracia-player-default-styles",kr=ss.replace('url("./assets/GolosText-Regular.woff2")',`url("${is}")`);function Jt(s){if(typeof document>"u")return;let e=typeof ShadowRoot<"u"&&s instanceof ShadowRoot?s:s?.head??document.head;if(e.querySelector(`#${ns}`))return;let t=document.createElement("style");t.id=ns,t.textContent=kr,e.appendChild(t)}function j(...s){let e=[];for(let t of s)if(t){if(typeof t=="string"){e.push(t);continue}for(let[r,i]of Object.entries(t))i&&e.push(r)}return e.join(" ")}function ae(s){return s.label??s.displayName??s.id??s.url??"Untitled"}function Ir(s){return!Number.isFinite(s)||s<0?"0:00":`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`}function ye(s){return s instanceof Error?s:new Error(String(s))}function os(s,e){return{event:(t,r)=>s?.event?.(t,r),error:(t,r)=>{s?.error?.(t,r),e?.(t,r)}}}import{jsx as as,jsxs as Kn}from"react/jsx-runtime";var re=({variant:s="primary",className:e,type:t="button",children:r,...i})=>{let n=Array.isArray(s)?s:[s];return as("button",{type:t,className:j("gr-player__button",...n.map(a=>`gr-player__button--${a}`),e),...i,children:r})},Me=({variant:s="icon",srLabel:e,children:t,...r})=>Kn(re,{variant:s,...r,children:[t,e&&as("span",{className:"gr-player__sr",children:e})]});import{jsx as pt,jsxs as Jn}from"react/jsx-runtime";var Ve=({icon:s,title:e,body:t,detail:r,action:i,className:n,role:a,ariaLive:o})=>pt("div",{className:n,role:a,"aria-live":o,children:Jn("div",{className:"gr-player__state-message",children:[pt("div",{className:"gr-player__state-icon",children:s}),pt("h2",{children:e}),pt("p",{children:t}),r&&pt("span",{className:"gr-player__sr",children:r}),i]})});import{jsx as ls}from"react/jsx-runtime";var Fr=({message:s})=>ls("div",{className:"gr-player__error",role:"alert",children:ls("span",{className:"gr-player__error-text",children:s})});import{jsx as cs}from"react/jsx-runtime";var Br=({title:s,body:e,detail:t,action:r})=>cs(Ve,{icon:cs(Yi,{}),title:s,body:e,detail:t,action:r,className:"gr-player__error-screen",role:"alert",ariaLive:"assertive"});import{jsx as hs}from"react/jsx-runtime";var zr=()=>hs("div",{className:"gr-player__loader",role:"status","aria-live":"polite",children:hs("div",{className:"gr-player__spinner"})});import{forwardRef as na,useImperativeHandle as oa,useRef as Us}from"react";import{createContext as eo,useContext as to}from"react";var ps=eo(null),Gr=ps.Provider,F=()=>{let s=to(ps);if(!s)throw new Error("usePlayerContext must be used within a PlayerProvider");return s};import{useEffect as us,useRef as ro,useState as io}from"react";function Or(s,e,t){let[r,i]=io(!1);us(()=>{let o=s.current;if(!o)return;let l=()=>i(!0),c=h=>{h.touches.length>1&&l()};return o.addEventListener("pointerdown",l),o.addEventListener("wheel",l),o.addEventListener("touchmove",c),()=>{o.removeEventListener("pointerdown",l),o.removeEventListener("wheel",l),o.removeEventListener("touchmove",c)}},[s]);let n=ro(e);return us(()=>{n.current!==e&&(n.current=e,i(!1))},[e]),{hasInteracted:r,resetView:()=>{t.reset(),i(!1)}}}import{useEffect as so,useState as no}from"react";var oo=500;function Nr(s,e=oo){let[t,r]=no(!1);return so(()=>{if(!s){r(!1);return}let i=setTimeout(()=>r(!0),e);return()=>clearTimeout(i)},[s,e]),s&&t}import{useEffect as ao,useRef as lo,useState as co}from"react";var ho=2e3;function Xr({coreError:s,interactionError:e,isSceneReady:t,currentSource:r,open:i,clearError:n}){let[a,o]=co(null),l=lo(new WeakMap);e?.phase&&l.current.set(e.error,e.phase);let c=s&&e?.error===s?e.phase:s?l.current.get(s):void 0,h=s?{error:s,phase:c}:e,p=h?rs(h.error,t,h.phase):null,u=p?.presentation==="blocking",d=p?.presentation==="toast"&&p.cause!==a?p:null,f=d?.cause??null;return ao(()=>{if(!f)return;let _=setTimeout(()=>{o(f),n()},ho);return()=>clearTimeout(_)},[f,n]),{playerError:p,isBlocking:!!u,toast:d,retry:()=>r?i(r):window.location.reload(),dismiss:()=>{d&&o(d.cause),n()}}}import{useCallback as po,useEffect as uo,useState as fo}from"react";function Dr(s,e){let[t,r]=fo(!1),i=po(async()=>{let n=s.current;if(!(!n||typeof document>"u"))try{document.fullscreenElement===n?await document.exitFullscreen():await n.requestFullscreen()}catch(a){e(ye(a),{phase:"fullscreen"})}},[e,s]);return uo(()=>{if(typeof document>"u")return;let n=()=>r(document.fullscreenElement===s.current);return n(),document.addEventListener("fullscreenchange",n),()=>document.removeEventListener("fullscreenchange",n)},[s]),{isFullscreen:t,toggleFullscreen:i}}import{useRef as mo}from"react";function ds(s){let e=Ar(s.name);return{url:`${Kt}${s.name}`,label:s.name,file:s,...e?{type:Ki}:{}}}async function go(s){return Ar(s.name)?ds(await s.getFile()):{url:`${Kt}${s.name}`,label:s.name,localFile:s}}function yo(){return typeof window>"u"?null:window.showOpenFilePicker??null}function xo(s){return s instanceof DOMException&&s.name==="AbortError"}function bo(s){let e=s.currentTarget.files?.[0];return s.currentTarget.value="",e?ds(e):null}function Hr({localFiles:s,logger:e,reportError:t,playlist:r,clearError:i}){let n=mo(null),a=!!s,o=h=>{i();let p=[...r.sources,h];r.setSources(p),r.goTo(p.length-1),e.event?.("local_file_open",{label:ae(h)})};return{enabled:a,fileInputProps:{ref:n,accept:Qi,onChange:h=>{let p=bo(h);p&&o(p)}},localLabel:$i,openLocalFile:async()=>{if(!a)return;let h=yo();if(!h){n.current?.click();return}try{let u=(await h({types:[{description:"Volumetric video",accept:{"application/octet-stream":[...Rr]}}]}))[0];u&&o(await go(u))}catch(p){xo(p)||t(ye(p),{phase:"local-file"})}}}}import{useRef as Vr}from"react";function Ur(s){let{containerRef:e,muted:t=!1,moduleFactory:r,overlay:i,eventLogger:n,onReady:a,onProgress:o,onModeChange:l,onXRStart:c,onXREnd:h}=s,p=Vr({onReady:a,onProgress:o,onModeChange:l,onXRStart:c,onXREnd:h});p.current={onReady:a,onProgress:o,onModeChange:l,onXRStart:c,onXREnd:h};let u=Vr(null),d=Vr(!1),f=Wt({containerRef:e,moduleFactory:r,moduleUrl:r?void 0:es(),overlay:i,eventLogger:n,onReady(){d.current||(d.current=!0,t||u.current?.app?.enableAudio()),p.current.onReady?.()},onProgress:m=>p.current.onProgress?.(m),onModeChange:(m,_)=>p.current.onModeChange?.(m,_),onXRStart:()=>p.current.onXRStart?.(),onXREnd:()=>p.current.onXREnd?.()});u.current=f;let g=Yt(f);return{gracia:f,playlist:g}}import{useCallback as Wr,useMemo as fs,useState as vo}from"react";function _o(s){switch(s){case"init":case"load":case"xr":case"streaming":case"fullscreen":case"local-file":return s;default:return}}function Yr(s,e){let[t,r]=vo(null),i=fs(()=>os(s,e),[s,e]),n=Wr((c,h)=>{r({error:c,phase:_o(h?.phase)})},[]),a=fs(()=>({event:(c,h)=>i.event?.(c,h),error:(c,h)=>{n(c,h),i.error?.(c,h)}}),[i,n]),o=Wr((c,h)=>{n(c,h),i.error?.(c,h)},[i,n]),l=Wr(()=>r(null),[]);return{interactionError:t,logger:a,reportError:o,clearError:l}}import{useEffect as Uo}from"react";import{useEffect as wo,useRef as So}from"react";function Zr({isInitialized:s,sources:e,streaming:t,playlist:r,reportError:i}){let n=So(i);n.current=i,wo(()=>{if(!s)return;let a=!1,o=l=>{a||l.length===0||(r.setSources(l),r.goTo(0))};if(t?.length)return He(t,ts()).then(o).catch(l=>{a||n.current(ye(l),{phase:"streaming"})}),()=>{a=!0};o(e)},[s,e,t,r.setSources,r.goTo])}import{useEffect as To,useRef as ms}from"react";function qr({currentSource:s,index:e,onSceneChange:t}){let r=ms(t);r.current=t;let i=ms(null);To(()=>{if(!s||e<0)return;let n=`${e}:${ae(s)}`;i.current!==n&&(i.current=n,r.current?.(s,e))},[s,e])}import{useEffect as Po,useState as Mo}from"react";var Co=500;function jr(s,e,t){let[r,i]=Mo(!1),n=$t(s.mode)?s.mode:null;Po(()=>{(!n||!s.xr.isActive)&&i(!1)},[n,s.xr.isActive]);let a=h=>{t(),i(!0),s.xr.setMode(h).catch(p=>{i(!1),e(ye(p),{phase:"xr",target:h})})},o=()=>{i(!1),s.xr.setMode(oe.PW).catch(h=>{e(ye(h),{phase:"xr",target:oe.PW})})},c=Nr(r&&!s.error,Co)&&s.xr.isActive?n:null;return{enter:a,exit:o,activeScreenMode:c}}import{signal as xe}from"@preact/signals-core";import{Container as U,Fullscreen as ko,Svg as Ae,Text as rr}from"@react-three/uikit";import{signal as Ce}from"@preact/signals-core";import{forwardHtmlEvents as Eo}from"@pmndrs/pointer-events";import{createRoot as Lo}from"@react-three/fiber";var er=class{#e;#r;#t;#i;#s;#o;#n=null;#a=null;#c;#h;#l=null;#p=null;#u=null;#g=!1;#f=!1;#d;#m;#y;#x;#b;#v;constructor(e,{pixelWidth:t,pixelHeight:r,worldWidth:i,worldHeight:n,cursorFactory:a,react:o=!1}){this.#s=e,this.#o=a,this.#g=o,this.#e=t*2,this.#r=r*2,this.#t=document.createElement("canvas"),this.#t.width=this.#e,this.#t.height=this.#r,this.#i=new e.WebGLRenderer({canvas:this.#t,alpha:!0,antialias:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.#i.setClearColor(0,0),this.#i.setSize(this.#e,this.#r,!1),this.#c=new e.Scene,this.#h=new e.OrthographicCamera(0,t,r,0,.1,10),this.#h.position.z=5,this.#d=new e.Raycaster,this.#m=new e.Vector3,this.#y=new e.Vector3,this.#x=new e.Quaternion,this.#b=new e.Mesh(new e.PlaneGeometry(i,n),new e.MeshBasicMaterial({visible:!1,side:e.DoubleSide}));let l=new e.SphereGeometry(.008,8,8),c=()=>new e.MeshBasicMaterial({color:65280,depthTest:!1});this.#v=[0,1].map(()=>{let h=new e.Mesh(l,c());return h.renderOrder=1001,h.visible=!1,h})}get canvas(){return this.#t}get scene(){return this.#c}get pixelWidth(){return this.#e/2}get pixelHeight(){return this.#r/2}get internalWidth(){return this.#e}get internalHeight(){return this.#r}get pointer(){return this.#n}get cursor(){return this.#a?.mesh??null}get ptrPressed(){return this.#f}get reactPending(){return this.#g}get hitMesh(){return this.#b}get hitSpheres(){return this.#v}async mountReact(e){this.#l=Lo(this.#t),await this.#l.configure({frameloop:"never",orthographic:!0,size:{width:this.#e/2,height:this.#r/2},dpr:2,gl:this.#i,events:()=>({enabled:!1,priority:0,handlers:{}})}),this.#p=this.#l.render(e),this.#c=this.#p.getState().scene,this.#u=Eo(this.#t,()=>this.#p.getState().camera,this.#c,{batchEvents:!1}),this.#g=!1}patchCanvasForXR(){let e=this.pixelWidth,t=this.pixelHeight;this.#t.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,right:e,bottom:t,width:e,height:t,toJSON(){}});let r=new Set;this.#t.setPointerCapture=i=>r.add(i),this.#t.releasePointerCapture=i=>r.delete(i),this.#t.hasPointerCapture=i=>r.has(i)}setPointer(e,t,r,i=!1){if(!this.#n){if(!this.#c)return;this.#n={x:e,y:t,pressed:r};let c=this.#o(this.#s);c.position.z=.06,this.#c.add(c),this.#a={mesh:c,sx:e,sy:this.pixelHeight-t}}let n=this.#n;n.x=e,n.y=t,n.pressed=r;let a=this.#a,o=this.pixelHeight-t,l=a.mesh.visible?.6:1;a.sx+=(e-a.sx)*l,a.sy+=(o-a.sy)*l,a.mesh.visible=!0,this.#p?a.mesh.position.set(a.sx-this.pixelWidth/2,a.sy-this.pixelHeight/2,.06):a.mesh.position.set(a.sx,a.sy,.06),a.mesh.material.opacity=r?1:.7,i&&this.#_(e,t,r)}clearPointer(e=!1){e&&this.#n&&this.#T(),this.#n=null,this.#a&&(this.#a.mesh.visible=!1)}renderScene(){this.#g||(this.#u?.update(),this.#p?this.#p.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#c,this.#h))}clampAlpha(e){let t=this.#i.getContext();t.colorMask(!1,!1,!1,!0),t.clearColor(0,0,0,e),t.clear(t.COLOR_BUFFER_BIT),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0)}initFlat(){let e=!1,t=r=>{let i=this.#t.getBoundingClientRect();return{x:(r.clientX-i.left)/i.width*this.pixelWidth,y:(r.clientY-i.top)/i.height*this.pixelHeight}};this.#t.addEventListener("pointerdown",r=>{e=!0,this.#t.setPointerCapture(r.pointerId);let i=t(r);this.setPointer(i.x,i.y,!0)}),this.#t.addEventListener("pointermove",r=>{let i=t(r);this.setPointer(i.x,i.y,e)}),this.#t.addEventListener("pointerup",r=>{e=!1;let i=t(r);this.setPointer(i.x,i.y,!1)}),this.#t.addEventListener("pointerleave",()=>{e=!1,this.clearPointer()})}renderFlat(){this.#g||(this.#u?.update(),this.#p?this.#p.getState().advance(performance.now(),!0):this.#i&&this.#i.render(this.#c,this.#h))}castRay(e,t){let r=e.rayTransform.position,i=e.rayTransform.orientation;return this.#m.set(r.x,r.y,r.z),this.#y.set(0,0,-1).applyQuaternion(this.#x.set(i.x,i.y,i.z,i.w)),this.rayHitQuad(this.#m,this.#y,t)}rayHitQuad(e,t,r=0){let i=this.pixelWidth,n=this.pixelHeight,a=this.#v[r];this.#d.ray.origin.copy(e),this.#d.ray.direction.copy(t);let o=this.#d.intersectObject(this.#b);if(o.length===0)return a.visible=!1,null;let l=o[0].point,c=o[0].uv;if(!c)return a.visible=!1,null;let h=c.x*i,p=(1-c.y)*n;return h<0||h>i||p<0||p>n?(a.visible=!1,null):(a.position.copy(l),a.visible=!0,a.updateMatrixWorld(!0),{x:h,y:p})}gazeHitsQuad(e,t){if(!e?.transform)return!0;let r=e.transform.position,i=e.transform.orientation,n=-2*(i.w*i.y+i.x*i.z),a=-2*(i.y*i.z-i.w*i.x),o=2*(i.x*i.x+i.y*i.y)-1,l=t||this.#b.position,c=l.x-r.x,h=l.y-r.y,p=l.z-r.z,u=Math.sqrt(c*c+h*h+p*p)||1;return(n*c+a*h+o*p)/u>.6}dispose(){this.#u?.destroy(),this.#u=null,this.#l&&(this.#l.unmount(),this.#l=null,this.#p=null),this.#i?.dispose(),this.#i=null}#_(e,t,r){let i=this.#f;this.#f=r;let n={clientX:e,clientY:t,pointerId:1,pointerType:"mouse",isPrimary:!0};r&&!i&&this.#t.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1,bubbles:!0})),this.#t.dispatchEvent(new PointerEvent("pointermove",{...n,buttons:r?1:0,bubbles:!0})),!r&&i&&this.#t.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0,bubbles:!0}))}#T(){let e={pointerId:1,pointerType:"mouse",isPrimary:!0};this.#f&&this.#t.dispatchEvent(new PointerEvent("pointerup",{...e,button:0,buttons:0,bubbles:!0})),this.#t.dispatchEvent(new PointerEvent("pointerleave",{...e,bubbles:!1})),this.#f=!1}};var Ro=`attribute vec2 a_pos;
varying vec2 v_uv;
uniform mat4 u_mvp;
void main() {
    v_uv = a_pos + 0.5;
    gl_Position = u_mvp * vec4(a_pos, 0.0, 1.0);
}`,Ao=`precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_alpha;
void main() {
    vec4 c = texture2D(u_tex, v_uv);
    gl_FragColor = vec4(c.rgb, c.a * u_alpha);
}`,tr=class{#e=null;#r=null;#t=null;#i=!1;#s=null;#o=null;#n=null;#a=null;#c=null;#h=null;#l=null;#p=null;#u;#g;#f;#d;#m;#y;#x;#b;#v;#_;#T;constructor(e,{worldWidth:t,worldHeight:r,internalWidth:i,internalHeight:n,canvas:a}){this.#v=t,this.#_=r,this.#x=i,this.#b=n,this.#T=a,this.#u=new e.Matrix4,this.#g=new e.Matrix4,this.#f=new e.Matrix4,this.#d=new e.Vector3,this.#m=new e.Quaternion,this.#y=new e.Vector3(t,r,1)}get projected(){return this.#i}get layer(){return this.#r}get pose(){return this.#s??null}async init(e,t,r,i){if(this.#e=i,t)try{return this.#t=t,this.#r=t.createQuadLayer({space:r,viewPixelWidth:this.#x,viewPixelHeight:this.#b,layout:"mono",isStatic:!1,width:this.#v/2,height:this.#_/2}),this.stash(),this.#r}catch{this.#r=null,this.#t=null}return this.#i=!0,this.#P(i),null}stash(){this.#o=null,this.#r&&(this.#r.transform=new XRRigidTransform({x:0,y:-1e3,z:0},{x:0,y:0,z:0,w:1}))}setTransform(e){this.#s=e,this.#o=e}applyPose(e,t,r,i,n,a,o){let l=new XRRigidTransform({x:e,y:t,z:r},{x:i,y:n,z:a,w:o});this.#s=l,this.#o=l}upload(e){this.#r?(this.#o&&(this.#r.transform=this.#o,this.#o=null),this.#S(e,this.#t.getSubImage(this.#r,e)?.colorTexture)):(this.#S(e,this.#h),this.#o=null)}renderEye(e,t,r,i,n,a,o,l){if(!this.#i||!l||!this.#s)return;let c=this.#s.position,h=this.#s.orientation;this.#d.set(c.x,c.y,c.z),this.#m.set(h.x,h.y,h.z,h.w),this.#u.compose(this.#d,this.#m,this.#y),this.#f.fromArray(t.transform.inverse.matrix),this.#g.multiplyMatrices(this.#f,this.#u),this.#f.fromArray(t.projectionMatrix),this.#g.premultiply(this.#f),e.viewport(r,i,n,a),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.useProgram(this.#n),e.uniformMatrix4fv(this.#l,!1,this.#g.elements),e.uniform1f(this.#p,o),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.#h),e.bindVertexArray(this.#a),e.drawArrays(e.TRIANGLES,0,6),e.bindVertexArray(null),e.disable(e.BLEND),e.useProgram(null)}dispose(){let e=this.#e;e&&this.#i&&(this.#n&&e.deleteProgram(this.#n),this.#a&&e.deleteVertexArray(this.#a),this.#c&&e.deleteBuffer(this.#c),this.#h&&e.deleteTexture(this.#h)),this.#r=this.#t=this.#e=null,this.#n=this.#a=this.#c=this.#h=null}#P(e){let t=e.createShader(e.VERTEX_SHADER);e.shaderSource(t,Ro),e.compileShader(t);let r=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(r,Ao),e.compileShader(r),this.#n=e.createProgram(),e.attachShader(this.#n,t),e.attachShader(this.#n,r),e.linkProgram(this.#n),e.deleteShader(t),e.deleteShader(r),this.#l=e.getUniformLocation(this.#n,"u_mvp"),this.#p=e.getUniformLocation(this.#n,"u_alpha"),e.useProgram(this.#n),e.uniform1i(e.getUniformLocation(this.#n,"u_tex"),0),e.uniform1f(this.#p,1);let i=e.getAttribLocation(this.#n,"a_pos");this.#a=e.createVertexArray(),e.bindVertexArray(this.#a),this.#c=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.#c),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-.5,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,-.5,.5]),e.STATIC_DRAW),e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),this.#h=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.#h),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.#x,this.#b,0,e.RGBA,e.UNSIGNED_BYTE,null),e.generateMipmap(e.TEXTURE_2D)}#S(e,t){if(!t)return;let r=this.#e,i=!this.#i;r.bindTexture(r.TEXTURE_2D,t),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,this.#i?r.LINEAR_MIPMAP_LINEAR:r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!0),i&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,this.#T),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),i&&r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this.#i&&r.generateMipmap(r.TEXTURE_2D)}};function Qr(s,e,t){let r=Math.sqrt(s*s+e*e+t*t)||1,i=Math.atan2(s/r,t/r)+Math.PI,n=Math.asin(e/r),a=i/2,o=n/2,l=Math.cos(a),c=Math.sin(a),h=Math.cos(o),p=Math.sin(o);return{qx:l*p,qy:c*h,qz:-c*p,qw:l*h}}var Ue=class{#e;#r;#t=!1;#i=!1;#s;#o;#n=null;#a=null;#c=!1;#h=null;#l=!1;#p=!1;#u=!1;#g=null;alpha=1;onDragTick=null;onDragEnd=null;constructor(e,t){this.#s=t.quadZ??.5,this.#o=t.quadY??-.5,this.#e=new er(e,t),this.#r=new tr(e,{worldWidth:t.worldWidth,worldHeight:t.worldHeight,internalWidth:this.#e.internalWidth,internalHeight:this.#e.internalHeight,canvas:this.#e.canvas})}get canvas(){return this.#e.canvas}get scene(){return this.#e.scene}get pixelWidth(){return this.#e.pixelWidth}get pixelHeight(){return this.#e.pixelHeight}get hitMesh(){return this.#e.hitMesh}get hitSpheres(){return this.#e.hitSpheres}get pointer(){return this.#e.pointer}get cursor(){return this.#e.cursor}async mountReact(e){return this.#e.mountReact(e)}rayHitQuad(e,t,r){return this.#e.rayHitQuad(e,t,r)}gazeHitsQuad(e,t){return this.#e.gazeHitsQuad(e,t)}get projected(){return this.#r.projected}get layer(){return this.#r.layer}get pose(){return this.#r.pose}get visible(){return this.#t}get placing(){return this.#i}get session(){return this.#n}get interacting(){return this.#t&&(this.#p||this.#c||this.#u||!!this.#a)}get dragging(){return this.#c}set dragging(e){this.#c=e}get panelDragging(){return this.#u}set panelDragging(e){this.#u=e,e||this.onDragEnd?.()}setPointer(e,t,r){this.#e.setPointer(e,t,r,!!this.#n)}clearPointer(){this.#e.clearPointer(!!this.#n)}initFlat(){this.#t=!0,this.#e.initFlat()}renderFlat(){this.#t&&this.#e.renderFlat()}async init(e,t,r,i){return this.#n=e,this.#e.patchCanvasForXR(),this.#r.init(e,t,r,i)}show(){this.#i=!0}hide(){if(this.#e.clearPointer(!!this.#n),this.#c=!1,this.#h=null,this.#a=null,this.#u=!1,this.onDragEnd?.(),this.#t&&this.#r.pose){let e=this.#r.pose.position,t=this.#r.pose.orientation;this.#g={x:e.x,y:e.y,z:e.z,qx:t.x,qy:t.y,qz:t.z,qw:t.w}}this.#t=this.#i=!1;for(let e of this.#e.hitSpheres)e.visible=!1;this.#r.stash()}setTransform(e){this.#r.setTransform(e)}stash(){this.#r.stash()}applyPose(e,t,r,i,n,a,o){this.#r.applyPose(e,t,r,i,n,a,o);let l=this.#e.hitMesh;l.position.set(e,t,r),l.quaternion.set(i,n,a,o),l.updateMatrixWorld(!0)}updatePosition(e){if(!this.#i||!e)return;if(this.#i=!1,this.#t=!0,this.#g){let f=this.#g;this.#g=null,this.applyPose(f.x,f.y,f.z,f.qx,f.qy,f.qz,f.qw);return}let t=e.transform.position,r=e.transform.orientation,i=Math.atan2(2*(r.w*r.y+r.x*r.z),1-2*(r.y*r.y+r.z*r.z)),n=-Math.sin(i),a=-Math.cos(i),o=t.x+n*this.#s,l=t.y+this.#o,c=t.z+a*this.#s,{qx:h,qy:p,qz:u,qw:d}=Qr(o-t.x,l-t.y,c-t.z);this.applyPose(o,l,c,h,p,u,d)}drawContent(e){!this.#t||this.#e.reactPending||(this.#e.renderScene(),this.alpha<1&&!this.#r.projected&&this.#e.clampAlpha(this.alpha),this.#r.upload(e))}renderEye(e,t,r,i,n,a){this.#r.renderEye(e,t,r,i,n,a,this.alpha,this.#t)}handleInput(e,t,r){if(!this.#n)return!1;let i=!1,n=!1,a=null,o=null;for(let c of this.#e.hitSpheres)c.visible=!1;for(let[c,h]of[["left",e],["right",t]]){if(h?.menuPressed&&(i=!0),!h?.active||!this.#t||!h.rayTransform||h.held)continue;let p=c==="left"?0:1,u=this.#e.castRay(h,p);if(u){let d={hand:h,hit:u,side:c,trigger:!!h.triggerPressed};c==="left"?a=d:o=d}}let l=!!(a||o);if(this.#u){if(this.#r.pose&&r?.transform&&this.onDragTick){let c=this.onDragTick(e,t,r,this.#h,this.#r.pose);c?this.applyPose(c.x,c.y,c.z,c.qx,c.qy,c.qz,c.qw):(this.#u=!1,this.onDragEnd?.())}}else{let c=null;if(this.#a){let h=this.#a==="left"?a:o,p=this.#a==="left"?e:t,u=!!p?.triggerPressed;c=h||(u?{hand:p,hit:null,side:this.#a,trigger:u}:null),u||(this.#a=null)}if(!c){let h=this.#h;c=h==="left"?a||o:h==="right"?o||a:a||o}if(c){this.#h=c.side??this.#h;let h=this.#h==="left"?1:0;if(this.#e.hitSpheres[h].visible=!1,c.hit){let p=this.#e.ptrPressed;this.setPointer(c.hit.x,c.hit.y,c.trigger),c.trigger&&!p&&!this.#a&&(this.#a=this.#h)}else this.#e.pointer?this.setPointer(this.#e.pointer.x,this.#e.pointer.y,c.trigger):this.clearPointer();c.hand?.isTransientPointer&&(n=!0)}else this.clearPointer(),this.#h=null;this.#p=!!(a||o)}return i&&!this.#l&&(this.#t||this.#i?l||this.hide():this.show()),this.#l=i,n}dispose(){this.#t=!1,this.#n=null,this.#e.dispose(),this.#r.dispose()}};var We=class{_quad;_sig=null;onPlayPause=null;onSeek=null;onPresetCycle=null;onExit=null;onClose=null;onSceneNav=null;constructor(e,t){this._quad=new Ue(e,{...t,react:!0})}get quad(){return this._quad}_createBaseSignals(){return{loadingD:Ce("none"),contentD:Ce("flex"),playD:Ce("flex"),pauseD:Ce("none"),spinD:Ce("none"),spinR:Ce(0),fillD:Ce("flex"),spinFast:Ce(!1)}}_updatePlayback(e,{loading:t,playing:r,spinning:i,buffering:n,progress:a}){e.loadingD.value=t?"flex":"none",e.contentD.value=t?"none":"flex",e.playD.value=!i&&!r?"flex":"none",e.pauseD.value=!i&&r?"flex":"none",e.spinD.value=i?"flex":"none",e.fillD.value=n?"none":"flex",e.spinFast.value=i&&!n,this._quad.dragging||this._setProgress(a)}render(e){let t=this._sig;if(!this._quad.visible||!t)return;let r=t.loadingD.value==="flex",i=r?20:t.spinFast.value?14:6;(t.spinD.value==="flex"||r)&&(t.spinR.value-=e*i)}_seekFromEvent(e){this._seekTo(e.point.x+this._quad.pixelWidth/2)}_seekTo(e){}_setProgress(e){}};import{jsx as k,jsxs as sr}from"react/jsx-runtime";var je=s=>`data:image/svg+xml,${encodeURIComponent(s)}`,Io=je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#aaaaaa"/></svg>'),Fo=je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#aaaaaa"/></svg>'),Bo=je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="#666666"/></svg>'),gs=je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1 1 2 12L5 12A7 7 0 1 0 12 5Z" fill="#888888"/></svg>'),zo=je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z" fill="#888888"/></svg>'),Go=je('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.6 16.6L10 18l6-6-6-6-1.4 1.4L13.2 12z" fill="#888888"/></svg>'),Ze=30,Ee=520,vs=72,ir=vs+Ze,be=Ze+vs/2,ys=14,ut=40,dt=26,Ye=6,xs=26,nr=14,$r=nr/2,or=20,Kr=or/2,ft=50,bs=32,Jr={borderOpacity:.65},qe=class extends We{#e=0;#r=0;constructor(e){let r=.86*(ir/Ee);super(e,{pixelWidth:Ee,pixelHeight:ir,worldWidth:.86,worldHeight:r,quadY:-.3,cursorFactory:i=>{let n=new i.Mesh(new i.CircleGeometry(4,32),new i.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return n.renderOrder=999,n}}),this.#t().catch(i=>{})}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:a="0:00 / 0:00",presetName:o=null,sceneText:l=null,sceneLabel:c=null}){let h=this._sig;if(h&&(this._updatePlayback(h,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),h.timeT.value=a,h.presetT&&o!=null&&(h.presetT.value=o),l!=null&&(h.sceneT.value=l),c!=null)){let p=String(c);h.sceneSub.value=p.length>bs?`${p.slice(0,bs-2)}...`:p}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-this.#e)/this.#r));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=this.#r*e;t.fillW.value=Math.max(.001,r),t.thumbL.value=this.#e+r-$r,t.thumbGlowL.value=this.#e+r-Kr}async#t(){let e=this._quad,t=ys,r=be-ut/2,i=Ee-ys-dt,n=be-dt/2,a=i-10,o=66,l=24,c=a-o,h=be-l/2;a=c-8;let p=78,u=a-p,d=be-9,f=this.#e=t+ut+12,g=this.#r=u-10-f,m=this._sig={...this._createBaseSignals(),fillW:xe(.001),thumbL:xe(f-$r),thumbGlowL:xe(f-Kr),thumbS:xe(1),thumbGlowOp:xe(0),timeT:xe("0:00 / 0:00"),sceneT:xe("1/1"),sceneSub:xe("SCENE"),presetT:xe("Off")},_=()=>{m.thumbGlowOp.value=.5,m.thumbS.value=1.15},I=()=>{e.dragging||(m.thumbGlowOp.value=0,m.thumbS.value=1)},M=C=>{C.target.setPointerCapture(C.pointerId),e.dragging=!0,this._seekFromEvent(C)},v=C=>{e.dragging&&this._seekFromEvent(C)},w=()=>{e.dragging=!1,m.thumbGlowOp.value=0,m.thumbS.value=1},S={backgroundColor:1710618},x=sr(ko,{backgroundColor:657930,backgroundOpacity:.88,children:[sr(U,{positionType:"absolute",positionLeft:0,positionTop:0,width:Ee,height:ir,display:m.contentD,borderWidth:1,borderColor:3355443,borderOpacity:.3,children:[k(U,{positionType:"absolute",positionLeft:0,positionTop:0,width:ft,height:Ze,hover:S,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(-1),children:k(Ae,{src:zo,width:18,height:18,pointerEvents:"none"})}),sr(U,{positionType:"absolute",positionLeft:ft,positionTop:0,width:Ee-ft*2,height:Ze,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:6,overflow:"hidden",children:[k(rr,{fontSize:13,color:11184810,children:m.sceneT}),k(rr,{fontSize:10,color:6710886,children:m.sceneSub})]}),k(U,{positionType:"absolute",positionLeft:Ee-ft,positionTop:0,width:ft,height:Ze,hover:S,alignItems:"center",justifyContent:"center",onClick:()=>this.onSceneNav?.(1),children:k(Ae,{src:Go,width:18,height:18,pointerEvents:"none"})}),k(U,{positionType:"absolute",positionLeft:0,positionTop:Ze,width:Ee,height:.5,backgroundColor:3355443,backgroundOpacity:.5,pointerEvents:"none"}),sr(U,{positionType:"absolute",positionLeft:t,positionTop:r,width:ut,height:ut,borderRadius:ut/2,borderWidth:1,borderColor:4473924,borderOpacity:.5,hover:Jr,alignItems:"center",justifyContent:"center",onClick:()=>this.onPlayPause?.(),children:[k(Ae,{display:m.playD,src:Io,width:20,height:20,marginLeft:2,pointerEvents:"none"}),k(Ae,{display:m.pauseD,src:Fo,width:18,height:18,pointerEvents:"none"}),k(Ae,{display:m.spinD,src:gs,width:24,height:24,transformRotateZ:m.spinR,pointerEvents:"none"})]}),k(U,{positionType:"absolute",positionLeft:f,positionTop:be-xs/2,width:g,height:xs,onPointerEnter:_,onPointerLeave:I,onPointerDown:M,onPointerMove:v,onPointerUp:w}),k(U,{positionType:"absolute",positionLeft:f,positionTop:be-Ye/2,width:g,height:Ye,borderRadius:Ye/2,backgroundColor:2236962,backgroundOpacity:.8,pointerEvents:"none"}),k(U,{positionType:"absolute",positionLeft:f,positionTop:be-Ye/2,width:m.fillW,height:Ye,borderRadius:Ye/2,backgroundColor:7829367,display:m.fillD,zIndexOffset:1,pointerEvents:"none"}),k(U,{positionType:"absolute",positionLeft:m.thumbGlowL,positionTop:be-or/2,width:or,height:or,borderRadius:Kr,borderWidth:2,borderColor:10066329,borderOpacity:m.thumbGlowOp,zIndexOffset:2,pointerEvents:"none"}),k(U,{positionType:"absolute",positionLeft:m.thumbL,positionTop:be-nr/2,width:nr,height:nr,borderRadius:$r,backgroundColor:11184810,transformScaleX:m.thumbS,transformScaleY:m.thumbS,zIndexOffset:3,pointerEvents:"none"}),k(U,{positionType:"absolute",positionLeft:u,positionTop:d,width:p,height:18,alignItems:"center",justifyContent:"center",children:k(rr,{fontSize:13,color:16777215,opacity:.35,children:m.timeT})}),k(U,{positionType:"absolute",positionLeft:i,positionTop:n,width:dt,height:dt,borderRadius:dt/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:Jr,alignItems:"center",justifyContent:"center",onClick:()=>this.onExit?.(),children:k(Ae,{src:Bo,width:11,height:11,pointerEvents:"none"})}),k(U,{positionType:"absolute",positionLeft:c,positionTop:h,width:o,height:l,borderRadius:l/2,borderWidth:1,borderColor:4473924,borderOpacity:.4,hover:Jr,alignItems:"center",justifyContent:"center",onClick:()=>this.onPresetCycle?.(),children:k(rr,{fontSize:11,color:10066329,pointerEvents:"none",children:m.presetT})})]}),k(U,{positionType:"absolute",positionLeft:0,positionTop:0,width:Ee,height:ir,backgroundColor:657930,backgroundOpacity:1,display:m.loadingD,alignItems:"center",justifyContent:"center",children:k(Ae,{src:gs,width:40,height:40,transformRotateZ:m.spinR,pointerEvents:"none"})})]});await e.mountReact(x)}};var Qe=class{#e;#r;#t=null;#i=null;#s;#o;#n;#a;constructor(e,t){this.#e=e,this.#r=t;let r=t.scene,i=new e.BufferGeometry().setFromPoints([new e.Vector3(0,0,0),new e.Vector3(0,0,-5)]),n=new e.SphereGeometry(.015,6,6);this.#s=new e.MeshBasicMaterial({color:16711680,depthTest:!1}),this.#o=new e.MeshBasicMaterial({color:65280,depthTest:!1});let a=()=>{let o=new e.Group,l=new e.Group,c=new e.Line(i,new e.LineBasicMaterial({color:5227511,transparent:!0,opacity:.5,depthTest:!1}));c.visible=!1,o.add(c);let h=new e.Mesh(n,this.#s),p=new e.Mesh(n,this.#s);return h.renderOrder=p.renderOrder=999,h.visible=p.visible=!1,r.add(o,l,h,p),{ray:o,grip:l,line:c,idxSphere:h,thmSphere:p}};this.#n=a(),this.#a=a()}update(e,t){this.#c(),this.#h(this.#n,e),this.#h(this.#a,t)}dispose(){this.#t&&(this.#r.anchor.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose());for(let e of[this.#n,this.#a])e.line.material.dispose(),e.idxSphere.geometry.dispose(),e.thmSphere.geometry.dispose();this.#s.dispose(),this.#o.dispose()}#c(){let e=this.#r.bboxMesh;if(e===this.#i)return;this.#i=e;let t=this.#r.anchor;if(this.#t&&(t.remove(this.#t),this.#t.geometry.dispose(),this.#t.material.dispose(),this.#t=null),!e)return;let r=this.#e;this.#t=new r.LineSegments(new r.EdgesGeometry(e.geometry),new r.LineBasicMaterial({color:58879,transparent:!0,opacity:.35,depthTest:!1})),this.#t.position.copy(e.position),t.add(this.#t)}#h(e,t){if(t.rayTransform&&this.#l(e.ray,t.rayTransform),t.gripTransform&&this.#l(e.grip,t.gripTransform),e.line.visible=t.active,e.idxSphere.visible=e.thmSphere.visible=!1,!t.active)return;t.indexTip&&(e.idxSphere.position.set(t.indexTip.x,t.indexTip.y,t.indexTip.z),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0)),t.thumbTip&&(e.thmSphere.position.set(t.thumbTip.x,t.thumbTip.y,t.thumbTip.z),e.thmSphere.visible=!0,e.thmSphere.updateMatrixWorld(!0)),t.indexTip||(e.idxSphere.position.copy(e.grip.position),e.idxSphere.visible=!0,e.idxSphere.updateMatrixWorld(!0));let r=t.gripping?this.#o:this.#s;e.idxSphere.material=r,t.thumbTip&&(e.thmSphere.material=r)}#l(e,t){let r=t.position,i=t.orientation;e.position.set(r.x,r.y,r.z),e.quaternion.set(i.x,i.y,i.z,i.w),e.updateMatrixWorld(!0)}};import{signal as D}from"@preact/signals-core";import{Container as A,Fullscreen as Oo,Svg as H,Text as ie}from"@react-three/uikit";import{jsx as y,jsxs as de}from"react/jsx-runtime";var B=9684710,pe=1122603,No=661021,z=680,ze=248,le=34,_e=48,ve=le+_e,Ps=_e,mt=26,ke=ze+Ps,_s=32,Y=88,Be=60,Ie=ze-Be,Fe=(z-Y)/6,ue=Math.round(z/3),Ms=12,ce=34,gt=Y+Ms,Cs=z-Y-Ms*2,ar=ve+50,ws=Cs-ce,W=s=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${s}" fill="#93c6e6"/></svg>`),V={play:W("M8 5v14l11-7z"),pause:W("M6 4h4v16H6zm8 0h4v16h-4z"),spin:W("M12 2a10 10 0 1 1-10 10h3a7 7 0 1 0 7-7z"),bulb:W("M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"),mute:W("M7 9v6h4l5 5V4l-5 5H7z"),vol:W("M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"),reset:W("M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"),exit:W("M17 7l-1.4 1.4L18.2 11H8v2h10.2l-2.6 2.6L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"),grip:W("M15.5 15.4V8.6L18.9 12l-3.4 3.4zM8.5 8.6v6.8L5.1 12l3.4-3.4z"),close:W("M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"),scale:W("M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z"),lock:W("M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"),unlk:W("M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"),arrL:W("M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"),arrR:W("M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z")},yt={backgroundColor:1849416},Ss=.9,Xo=-.55,Ts=.866,$e=class extends We{#e;#r=null;#t;#i;onMuteToggle=null;onScaleLockToggle=null;onLockToggle=null;onReset=null;constructor(e){super(e,{pixelWidth:z,pixelHeight:ke,worldWidth:1,worldHeight:ke/z,quadZ:Ss,quadY:Xo,cursorFactory:t=>{let r=new t.Mesh(new t.CircleGeometry(5,32),new t.MeshBasicMaterial({color:B,transparent:!0,opacity:.8,depthTest:!1,depthWrite:!1}));return r.renderOrder=999,r}}),this.#e=e,this.#t=new e.Vector3,this.#i=new e.Quaternion,this._quad.alpha=.9,this._quad.onDragTick=(t,r,i,n,a)=>this.#s(t,r,i,n,a),this._quad.onDragEnd=()=>{this.#r=null,this._quad.alpha=.9},this.#o().catch(t=>{})}#s(e,t,r,i,n){let a=this.#e,o=this.#r,l=o?.side??i??"right",c=l==="left"?e:t;if(!c?.triggerPressed)return this.#r=null,null;let h=c.rayTransform?.orientation;if(!h){let w=n.position,S=n.orientation;return{x:w.x,y:w.y,z:w.z,qx:S.x,qy:S.y,qz:S.z,qw:S.w}}let p=this.#t.set(0,0,-1).applyQuaternion(this.#i.set(h.x,h.y,h.z,h.w));if(!o){let w=r.transform.position,S=new a.Vector3(w.x,w.y,w.z),x=n.position,C=new a.Vector3(x.x,x.y,x.z).sub(S);this.#r={side:l,R:C.length()||Ss,oQ:new a.Quaternion().setFromUnitVectors(p.clone(),C.normalize()),eye:S};let G=n.orientation;return{x:x.x,y:x.y,z:x.z,qx:G.x,qy:G.y,qz:G.z,qw:G.w}}if(p.applyQuaternion(o.oQ),Math.abs(p.y)>Ts){p.y=Math.sign(p.y)*Ts;let w=Math.sqrt(p.x*p.x+p.z*p.z)||1e-6,S=Math.sqrt(1-p.y*p.y)/w;p.x*=S,p.z*=S}let u=o.eye,d=o.R,f=u.x+p.x*d,g=u.y+p.y*d,m=u.z+p.z*d,{qx:_,qy:I,qz:M,qw:v}=Qr(p.x,p.y,p.z);return{x:f,y:g,z:m,qx:_,qy:I,qz:M,qw:v}}update({loading:e=!1,playing:t=!1,spinning:r=!1,buffering:i=!1,progress:n=0,timeText:a="0:00 / 0:00",presetName:o=null,muted:l=!1,locked:c=!1,scaleLocked:h=!0,sceneText:p=null,sceneLabel:u=null,bannerText:d=null}){let f=this._sig;if(f){if(this._updatePlayback(f,{loading:e,playing:t,spinning:r,buffering:i,progress:n}),f.playTextD.value=r?"none":"flex",f.playLbl.value=t?"PAUSE":"PLAY",f.timeT.value=a,o!=null&&(f.presetT.value=o),f.icA.value=l?"none":"flex",f.icB.value=l?"flex":"none",f.muteLbl.value=l?"UNMUTE":"MUTE",f.sclLkLbl.value=h?"UNLOCK SCALE":"LOCK SCALE",f.lockA.value=c?"none":"flex",f.lockB.value=c?"flex":"none",f.lockLbl.value=c?"UNLOCK SCENE":"LOCK SCENE",p!=null&&(f.sceneT.value=p),u!=null){let g=String(u);f.sceneSub.value=g.length>_s?`${g.slice(0,_s-2)}...`:g}d!=null&&(f.bannerT.value=d)}}_seekTo(e){let t=Math.max(0,Math.min(1,(e-gt-ce/2)/ws));this._setProgress(t),this.onSeek?.(t)}_setProgress(e){let t=this._sig;if(!t)return;let r=ws*e;t.thumbL.value=gt+r-2,t.fillW.value=Math.max(ce,ce+r)}async#o(){let e=this._sig={...this._createBaseSignals(),playTextD:D("flex"),playLbl:D("PAUSE"),fillW:D(ce),thumbL:D(gt-2),thumbS:D(1),timeT:D("0:00 / 0:00"),sceneT:D("1/5"),sceneSub:D("SCENE"),icA:D("flex"),icB:D("none"),muteLbl:D("MUTE"),sclLkLbl:D("LOCK SCALE"),lockA:D("flex"),lockB:D("none"),lockLbl:D("LOCK SCENE"),presetT:D("OFF"),bannerT:D("")},t=({x:d,y:f,w:g,h:m})=>y(A,{positionType:"absolute",positionLeft:d,positionTop:f,width:g,height:m,backgroundColor:B,backgroundOpacity:.3}),r=({idx:d,onClick:f,children:g})=>{let m=Y+d*Fe;return y(A,{positionType:"absolute",positionLeft:m,positionTop:Ie,width:Fe,height:Be,backgroundColor:pe,hover:yt,onClick:f,children:y(A,{width:"100%",height:"100%",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,pointerEvents:"none",children:g})})},i=this._quad,n=()=>{e.thumbS.value=1.08},a=()=>{i.dragging||(e.thumbS.value=1)},o=d=>{d.target.setPointerCapture(d.pointerId),i.dragging=!0,this._seekFromEvent(d)},l=d=>{i.dragging&&this._seekFromEvent(d)},c=()=>{i.dragging=!1,e.thumbS.value=1},h=d=>{d.target.setPointerCapture(d.pointerId),i.panelDragging=!0,i.alpha=.3},p=()=>{i.panelDragging=!1},u=de(Oo,{backgroundColor:pe,children:[de(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:ke,display:e.contentD,children:[y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:le,backgroundColor:B,backgroundOpacity:.85}),y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:le,alignItems:"center",justifyContent:"center",children:y(ie,{fontSize:13,fontWeight:"bold",color:pe,children:e.bannerT})}),y(A,{positionType:"absolute",positionLeft:0,positionTop:le,width:ue,height:_e,backgroundColor:pe,hover:yt,onClick:()=>this.onSceneNav?.(-1)}),y(A,{positionType:"absolute",positionLeft:0,positionTop:le,width:ue,height:_e,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:y(H,{src:V.arrL,width:28,height:28})}),y(t,{x:ue,y:le,w:.5,h:_e}),de(A,{positionType:"absolute",positionLeft:ue,positionTop:le,width:z-ue*2,height:_e,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,overflow:"hidden",children:[y(ie,{fontSize:22,color:B,children:e.sceneT}),y(ie,{fontSize:10,color:B,opacity:.45,children:e.sceneSub})]}),y(t,{x:z-ue,y:le,w:.5,h:_e}),y(A,{positionType:"absolute",positionLeft:z-ue,positionTop:le,width:ue,height:_e,backgroundColor:pe,hover:yt,onClick:()=>this.onSceneNav?.(1)}),y(A,{positionType:"absolute",positionLeft:z-ue,positionTop:le,width:ue,height:_e,alignItems:"center",justifyContent:"center",pointerEvents:"none",children:y(H,{src:V.arrR,width:28,height:28})}),y(t,{x:0,y:ve,w:z,h:.5}),y(A,{positionType:"absolute",positionLeft:0,positionTop:ve,width:Y,height:ze-ve,backgroundColor:pe,hover:yt,onClick:()=>this.onPlayPause?.()}),de(A,{positionType:"absolute",positionLeft:0,positionTop:ve,width:Y,height:ze-ve,flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,pointerEvents:"none",children:[y(H,{display:e.playD,src:V.play,width:20,height:24,marginLeft:2}),y(H,{display:e.pauseD,src:V.pause,width:20,height:24}),y(H,{display:e.spinD,src:V.spin,width:28,height:28,transformRotateZ:e.spinR}),y(ie,{fontSize:13,fontWeight:"bold",color:B,display:e.playTextD,children:e.playLbl})]}),y(t,{x:Y,y:ve,w:.5,h:ze-ve}),y(A,{positionType:"absolute",positionLeft:Y+16,positionTop:ve+14,width:120,height:20,children:y(ie,{fontSize:14,color:B,children:e.timeT})}),y(A,{positionType:"absolute",positionLeft:gt,positionTop:ar,width:Cs,height:ce,backgroundColor:No,onPointerEnter:n,onPointerLeave:a,onPointerDown:o,onPointerMove:l,onPointerUp:c}),y(A,{positionType:"absolute",positionLeft:gt,positionTop:ar,width:e.fillW,height:ce,backgroundColor:B,backgroundOpacity:.85,display:e.fillD,zIndexOffset:1,pointerEvents:"none"}),y(A,{positionType:"absolute",positionLeft:e.thumbL,positionTop:ar-2,width:ce+4,height:ce+4,backgroundColor:pe,borderWidth:2,borderColor:B,borderOpacity:.5,zIndexOffset:3,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none"}),y(A,{positionType:"absolute",positionLeft:e.thumbL,positionTop:ar-2,width:ce+4,height:ce+4,alignItems:"center",justifyContent:"center",zIndexOffset:4,transformScaleX:e.thumbS,transformScaleY:e.thumbS,pointerEvents:"none",children:y(H,{src:V.grip,width:18,height:18})}),y(t,{x:Y,y:Ie,w:z-Y,h:.5}),de(r,{idx:0,onClick:()=>this.onPresetCycle?.(),children:[y(H,{src:V.bulb,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:B,children:e.presetT})]}),y(t,{x:Y+Fe,y:Ie,w:.5,h:Be}),de(r,{idx:1,onClick:()=>this.onMuteToggle?.(),children:[y(H,{display:e.icA,src:V.mute,width:20,height:20}),y(H,{display:e.icB,src:V.vol,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:B,children:e.muteLbl})]}),y(t,{x:Y+Fe*2,y:Ie,w:.5,h:Be}),de(r,{idx:2,onClick:()=>this.onScaleLockToggle?.(),children:[y(H,{src:V.scale,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:B,children:e.sclLkLbl})]}),y(t,{x:Y+Fe*3,y:Ie,w:.5,h:Be}),de(r,{idx:3,onClick:()=>this.onLockToggle?.(),children:[y(H,{display:e.lockA,src:V.unlk,width:20,height:20}),y(H,{display:e.lockB,src:V.lock,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:B,children:e.lockLbl})]}),y(t,{x:Y+Fe*4,y:Ie,w:.5,h:Be}),de(r,{idx:4,onClick:()=>this.onReset?.(),children:[y(H,{src:V.reset,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:B,children:"RESET SCENE"})]}),y(t,{x:Y+Fe*5,y:Ie,w:.5,h:Be}),de(r,{idx:5,onClick:()=>this.onExit?.(),children:[y(H,{src:V.exit,width:20,height:20}),y(ie,{fontSize:11,fontWeight:"bold",color:B,children:"EXIT"})]}),y(t,{x:0,y:ze,w:z,h:.5}),y(A,{positionType:"absolute",positionLeft:0,positionTop:ze+1,width:z,height:Ps-1,backgroundColor:pe,hover:yt,alignItems:"center",justifyContent:"center",onPointerDown:h,onPointerUp:p,children:y(ie,{fontSize:12,color:B,opacity:.45,pointerEvents:"none",children:"DRAG TO MOVE THE MENU"})}),y(A,{positionType:"absolute",positionLeft:z-mt-4,positionTop:(le-mt)/2,width:mt,height:mt,borderRadius:mt/2,backgroundColor:pe,backgroundOpacity:.8,borderWidth:1,borderColor:B,borderOpacity:.3,hover:{borderOpacity:.7},alignItems:"center",justifyContent:"center",zIndexOffset:10,onClick:()=>this.onClose?.(),children:y(H,{src:V.close,width:12,height:12,pointerEvents:"none"})}),y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:.5,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10}),y(A,{positionType:"absolute",positionLeft:0,positionTop:ke-.5,width:z,height:.5,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10}),y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:.5,height:ke,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10}),y(A,{positionType:"absolute",positionLeft:z-.5,positionTop:0,width:.5,height:ke,backgroundColor:B,backgroundOpacity:.3,zIndexOffset:10})]}),y(A,{positionType:"absolute",positionLeft:0,positionTop:0,width:z,height:ke,backgroundColor:pe,backgroundOpacity:1,display:e.loadingD,alignItems:"center",justifyContent:"center",children:y(H,{src:V.spin,width:64,height:64,transformRotateZ:e.spinR,pointerEvents:"none"})})]});await i.mountReact(u)}};var Ke=class{#e;#r;#t;#i=null;#s;#o;#n;constructor(e){this.#e=e,this.#r=new e.Scene,this.#t=new e.Group,this.#r.add(this.#t),this.#s=new e.Vector3,this.#o=new e.Vector3,this.#n=new e.Raycaster}get scene(){return this.#r}get anchor(){return this.#t}get bboxMesh(){return this.#i}get hasBBox(){return!!this.#i}rebuildBBox(e,t){let r=this.#e;this.#i&&(this.#t.remove(this.#i),this.#i.geometry.dispose(),this.#i.material.dispose());let i=(e.minX+e.maxX)/2,n=(e.minY+e.maxY)/2,a=(e.minZ+e.maxZ)/2,o=new r.Box3(new r.Vector3(e.minX,e.minY,e.minZ),new r.Vector3(e.maxX,e.maxY,e.maxZ)).applyMatrix4(new r.Matrix4().fromArray(t)),l=o.getSize(new r.Vector3).max(new r.Vector3(.1,.1,.1)),c=o.getCenter(new r.Vector3),h=new r.BoxGeometry(l.x,l.y,l.z);return this.#i=new r.Mesh(h,new r.MeshBasicMaterial({visible:!1,side:r.DoubleSide})),this.#i.position.copy(c),this.#t.add(this.#i),{cx:i,cy:n,cz:a}}applyTransform(e,t){this.#t.position.set(e[0],e[1],e[2]),this.#t.scale.set(t,t,-t),this.#t.quaternion.identity(),this.#t.updateMatrixWorld(!0)}hitTest(e){if(!this.#i)return!1;let t=e.position,r=e.orientation;return this.#s.set(t.x,t.y,t.z),this.#o.set(-2*(r.w*r.y+r.x*r.z),-2*(r.y*r.z-r.w*r.x),2*(r.x*r.x+r.y*r.y)-1),this.#n.set(this.#s,this.#o),this.#n.intersectObject(this.#i,!1).length>0}};var Je=class s{#e;#r;#t;#i;#s;#o;static#n=1.5;static#a=.04;static#c=.15;static#h=4;static#l=20;static#p=.003;static#u=.001;static#g=.7;constructor(e,t){this.#e=e,this.#r=this.#f(),this.#t=this.#f(),this.#i=this.#d(),this.#s=this.#d(),this.#o=new e.Vector3,t.add(this.#r.group,this.#t.group,this.#i,this.#s)}update(e,t,r,i=!0){this.#m(this.#r,this.#i,i?e:null,r?.[0]),this.#m(this.#t,this.#s,i?t:null,r?.[1])}dispose(){for(let e of[this.#r,this.#t])e.mesh.geometry.dispose(),e.mesh.material.dispose();for(let e of[this.#i,this.#s])e.geometry.dispose(),e.material.dispose()}#f(){let e=this.#e,t=s.#h,r=s.#l,i=s.#n,n=s.#a,a=s.#c,o=s.#p,l=s.#u,c=s.#g,h=r+1,p=t+1,u=h*p,d=new Float32Array(u*3),f=new Float32Array(u*4),g=[];for(let v=0;v<h;v++){let w=v/r,S=-n-w*i,x=o+(l-o)*w,C=Math.min(w/a,1),G=1-w,se=c*C*G;for(let O=0;O<=t;O++){let L=O/t*Math.PI*2,N=v*p+O;d[N*3]=Math.cos(L)*x,d[N*3+1]=Math.sin(L)*x,d[N*3+2]=S,f[N*4]=1,f[N*4+1]=1,f[N*4+2]=1,f[N*4+3]=se}}for(let v=0;v<r;v++)for(let w=0;w<t;w++){let S=v*p+w,x=S+1,C=S+p,G=C+1;g.push(S,C,x,x,C,G)}let m=new e.BufferGeometry;m.setAttribute("position",new e.BufferAttribute(d,3)),m.setAttribute("color",new e.BufferAttribute(f,4)),m.setIndex(g);let _=new e.MeshBasicMaterial({vertexColors:!0,transparent:!0,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),I=new e.Mesh(m,_);I.frustumCulled=!1,I.renderOrder=998;let M=new e.Group;return M.add(I),M.visible=!1,{mesh:I,group:M}}#d(){let e=this.#e,t=new e.RingGeometry(.004,.008,24),r=new e.MeshBasicMaterial({color:16777215,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1,side:e.DoubleSide}),i=new e.Mesh(t,r);return i.frustumCulled=!1,i.renderOrder=999,i.visible=!1,i}#m(e,t,r,i){if(!r?.active||!r.rayTransform||r.isTransientPointer){e.group.visible=!1,t.visible=!1;return}let n=r.rayTransform.position,a=r.rayTransform.orientation;e.group.position.set(n.x,n.y,n.z),e.group.quaternion.set(a.x,a.y,a.z,a.w),e.group.visible=!0,e.group.updateMatrixWorld(!0);let o=r.triggerPressed??!1;if(e.mesh.material.color.setRGB(o?.4:1,o?.75:1,1),i?.visible){let l=this.#o.set(n.x,n.y,n.z).distanceTo(i.position),c=s.#a+s.#n;e.mesh.scale.z=Math.min(1,l/c),t.position.copy(i.position),t.quaternion.set(a.x,a.y,a.z,a.w),t.visible=!0,t.updateMatrixWorld(!0)}else e.mesh.scale.z=1,t.visible=!1}};var xt=Object.keys(at),Es=s=>!Number.isFinite(s)||s<0?"0:00":`${~~(s/60)}:${String(~~s%60).padStart(2,"0")}`,ei=s=>s.toUpperCase();var et=class{#e;#r;#t;#i=null;#s=null;#o=null;#n=null;#a=null;#c=null;#h=0;#l=0;#p=0;#u=xt.indexOf("off");#g=ei("off");#f=1;#d=!1;#m=!0;#y=[];#x=0;#b=!0;#v=null;#_=null;#T=null;#P=null;#S=null;#w=null;#R;#C=null;#E=null;#L=null;constructor(e,{debug:t=!1,uiStyle:r="modern",rays:i=!0}={}){this.#e=e,this.#r=t,this.#t=r,this.#R=i}get uiStyle(){return this.#t}set uiStyle(e){this.#t=e}set manipulator(e){this.#s=e}get manipulator(){return this.#s}get uiActive(){return!this.#b&&(this.#i?.quad.interacting??!1)}get uiDragging(){if(this.#b)return!1;let e=this.#i?.quad;return(e?.dragging||e?.panelDragging)??!1}get quads(){let e=this.#i?.quad;return e?[e]:[]}set sources(e){this.#y=e??[],this.#x=Math.min(this.#x,Math.max(0,this.#y.length-1))}get sources(){return this.#y}set sceneIndex(e){this.#y.length&&(this.#x=Math.max(0,Math.min(this.#y.length-1,e)),this.#b=!0)}get sceneIndex(){return this.#x}set onSceneChange(e){this.#T=e}get onSceneChange(){return this.#T}set onPresetChange(e){this.#_=e}get onPresetChange(){return this.#_}set onLock(e){this.#P=e}get onLock(){return this.#P}set onScaleLock(e){this.#S=e}get onScaleLock(){return this.#S}set bannerText(e){this.#v=e}get bannerText(){return this.#v}set eventLogger(e){this.#w=e}get eventLogger(){return this.#w}setPreset(e,t=this.#f){this.#f=t,this.syncPreset(e),this.#F(this.#o,e,t)}syncPreset(e){let t=xt.indexOf(e);t<0||(this.#u=t,this.#g=ei(e))}async init(e,t,r,i,n,a=!1){this.#o=e;let o=this.#e,l=this.#r||this.#R;this.#i=this.#t==="modern"?new $e(o):new qe(o),this.#z(e,t);let c=l?new Ke(o):null;if(this.#L=c,c&&this.#s?.setOverlay(c),this.#d=this.#y[this.#x]?.locked??this.#d,this.#m=this.#y[this.#x]?.scaleLocked??this.#m,this.#s&&(this.#s.locked=this.#d,this.#s.scaleLocked=this.#m),c){this.#i.quad.hitMesh&&c.scene.add(this.#i.quad.hitMesh);for(let p of this.#i.quad.hitSpheres)c.scene.add(p);this.#r&&(this.#C=new Qe(o,c)),this.#R&&(this.#E=new Je(o,c.scene))}l&&c&&(this.#n=new o.WebGLRenderer({context:n,canvas:n.canvas}),this.#n.autoClear=!1,this.#a=new o.PerspectiveCamera(50,1,.01,1e4),this.#a.matrixAutoUpdate=!1,this.#c=new o.WebGLRenderTarget(1,1),this.#n.setRenderTarget(this.#c),this.#n.setRenderTarget(null));let h=await this.#i.quad.init(t,r,i,n);return this.#h=setTimeout(()=>this.#i?.quad.show(),1e3),h?[h]:[]}frame(e,t,r,i,n,a){this.#B(a),this.#i?.quad.updatePosition(i),this.#i?.quad.handleInput(this.#s?.leftHand,this.#s?.rightHand,i),this.#C?.update(this.#s?.leftHand,this.#s?.rightHand),this.#E?.update(this.#s?.leftHand,this.#s?.rightHand,this.#i?.quad.hitSpheres,!!this.#i?.quad.visible),this.#i?.quad.panelDragging&&this.#s?.reset(),this.#k(e,a),this.#i?.render(e),this.#i?.quad.drawContent(t)}renderEye(e,t,r,i,n,a,o){this.#i?.quad.renderEye(e,r,i,n,a,o),!(!this.#n||!this.#L)&&(this.#a.projectionMatrix.fromArray(r.projectionMatrix),this.#a.projectionMatrixInverse.copy(this.#a.projectionMatrix).invert(),this.#a.matrix.fromArray(r.transform.matrix),this.#a.matrixWorld.copy(this.#a.matrix),this.#a.matrixWorldInverse.fromArray(r.transform.inverse.matrix),this.#n.resetState(),this.#n.setRenderTargetFramebuffer(this.#c,t),this.#n.setRenderTarget(this.#c),this.#n.setViewport(i,n,a,o),this.#n.setScissor(i,n,a,o),this.#n.setScissorTest(!0),this.#n.clearDepth(),this.#n.render(this.#L.scene,this.#a),this.#n.resetState(),e.bindFramebuffer(e.FRAMEBUFFER,t))}onRefReset(){this.#i?.quad.visible&&this.#i.quad.show()}render(e,t){}dispose(){clearTimeout(this.#h),this.#C?.dispose(),this.#C=null,this.#E?.dispose(),this.#E=null,this.#L=null,this.#n?.dispose(),this.#n=null,this.#c?.dispose(),this.#c=null,this.#a=null,this.#i?.quad.dispose(),this.#i=null,this.#s?.reset(),this.#s=null,this.#l=0}#z(e,t){let r=this.#i;r.onPlayPause=()=>{(e?.isBuffering??!1)||(e?.isPlaying?e.pause():e.play(),this.#w?.event?.("play_pause",{playing:!e?.isPlaying}))},r.onSeek=i=>{e?.seek?.(i*(e?.duration??0)),this.#w?.event?.("seek",{position:i})},r.onPresetCycle=()=>{let i=xt[(this.#u+1)%xt.length];this.#F(e,i,this.#f),this.#_?.(i),this.#w?.event?.("preset_cycle",{preset:i})},r.onExit=()=>{this.#w?.event?.("exit"),t?.end()},r.onClose=()=>{r.quad.hide()},r.onSceneNav=i=>{if(!this.#y.length)return;let n=Math.max(0,Math.min(this.#y.length-1,this.#x+i));n!==this.#x&&(this.#x=n,this.#b=!0,this.#A(),this.#T?.(this.#y[this.#x],this.#x),this.#w?.event?.("scene_nav",{index:n,label:this.#y[n]?.label,dir:i}))},this.#t==="modern"&&(r.onMuteToggle=()=>{let i=this.#I(e);this.#w?.event?.("mute_toggle",{muted:!i})},r.onReset=()=>{this.#s?.resetToInitial(),this.#w?.event?.("reset")},r.onLockToggle=()=>{this.#d=!this.#d,this.#s&&(this.#s.locked=this.#d),this.#P?.(this.#d),this.#w?.event?.("lock_toggle",{locked:this.#d})},r.onScaleLockToggle=()=>{this.#m=!this.#m,this.#s&&(this.#s.scaleLocked=this.#m),this.#S?.(this.#m),this.#w?.event?.("scale_lock_toggle",{scaleLocked:this.#m})})}#A(){this.#d=this.#y[this.#x]?.locked??this.#d,this.#m=this.#y[this.#x]?.scaleLocked??this.#m}#I(e){let t=!(e?.audioEnabled??!1);return t?e?.enableAudio?.():e?.disableAudio?.(),t}#F(e,t,r=1){let i=xt.indexOf(t);if(i<0)return;this.#u=i,this.#g=ei(t);let n=at[t];n?e?.setEnvLighting(we(n),r):e?.clearEnvLighting()}#B(e){!this.#b||!e.duration||(this.#b=!1,this.#d=this.#y[this.#x]?.locked??this.#d,this.#m=this.#y[this.#x]?.scaleLocked??this.#m)}#k(e,t){let r=!(t?.audioEnabled??!1);if(this.#b)this.#i?.update({loading:!0,muted:r,locked:this.#d,scaleLocked:this.#m,sceneText:this.#y.length?`${this.#x+1}/${this.#y.length}`:"1/1",sceneLabel:(this.#y[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#v});else{let i=t?.isBuffering??!1,n=t?.duration??0;n>0&&(this.#p=n);let a=this.#p,o=t?.currentTime??0,l=Math.max(0,Math.min(1,o/(a||1)));this.#i?.update({loading:!1,playing:t?.isPlaying??!1,spinning:i,buffering:i,progress:l,timeText:`${Es(o)} / ${Es(a)}`,presetName:this.#g,muted:r,locked:this.#d,scaleLocked:this.#m,sceneText:this.#y.length?`${this.#x+1}/${this.#y.length}`:"1/1",sceneLabel:(this.#y[this.#x]?.label??"SCENE").toUpperCase(),bannerText:this.#v})}this.#M(e)}#M(e){if(this.#l>0){this.#l-=e;return}let t=this.#s?.leftHand.microSwipe||this.#s?.rightHand.microSwipe;t&&(this.#l=.45,this.#i?.onSceneNav(t))}};import{useRef as Do}from"react";import*as Ho from"three";function Vo(s){if(s===!1)return null;let{uiStyle:e="modern",bannerText:t="EARLY BETA"}=s??{};try{let r=new et(Ho,{uiStyle:e});return r.bannerText=t,r}catch{return null}}function ti(s){let e=Do(void 0);return e.current===void 0&&(e.current=Vo(s)),e.current}function ri(s,e){let{sources:t=[],streaming:r,muted:i=!1,cameraControls:n=!1,sceneSelector:a,moduleFactory:o,onReady:l,onProgress:c,onModeChange:h,onXRStart:p,onXREnd:u,onSceneChange:d,onError:f,eventLogger:g,localFiles:m,xrOverlay:_}=s,I=ti(_),{interactionError:M,logger:v,reportError:w,clearError:S}=Yr(g,f);Uo(()=>{Jt()},[]);let{gracia:x,playlist:C}=Ur({containerRef:e.container,muted:i,moduleFactory:o,overlay:I,eventLogger:v,onReady:l,onProgress:c,onModeChange:h,onXRStart:p,onXREnd:u});Zr({isInitialized:x.isInitialized,sources:t,streaming:r,playlist:C,reportError:w}),qr({currentSource:C.currentSource,index:C.index,onSceneChange:d});let{fileInputProps:G,enabled:se,localLabel:O,openLocalFile:L}=Hr({localFiles:m,logger:v,reportError:w,playlist:C,clearError:S}),{isFullscreen:N,toggleFullscreen:Le}=Dr(e.root,w),Oe=x.isContentReady&&!x.isLoading,{playerError:pi,isBlocking:ui,toast:js,retry:Qs,dismiss:$s}=Xr({coreError:x.error,interactionError:M,isSceneReady:Oe,currentSource:C.currentSource,open:x.open,clearError:S}),Ks=!pi&&(!x.isInitialized||!Oe),dr=jr(x,w,S);return{contextValue:{gracia:x,playlist:C,config:{sceneSelector:a,cameraControls:n},refs:e,presentation:{isBusy:Ks,isSceneReady:Oe,isBlocking:ui,playerError:pi,toast:js,retry:Qs,dismiss:$s},shell:{isFullscreen:N,toggleFullscreen:Le,localFilesEnabled:se,fileInputProps:G,openLocalFile:L,localLabel:O},xr:{enter:dr.enter,exit:dr.exit,activeScreenMode:ui?null:dr.activeScreenMode}},gracia:x,playlist:C,openLocalFile:L,toggleFullscreen:Le}}import{useEffect as Ls,useRef as Rs,useState as Wo}from"react";import{jsx as Q,jsxs as bt}from"react/jsx-runtime";var As=()=>{let{playlist:s}=F(),e=Rs(null),t=Rs(s.index),[r,i]=Wo(!1),n=s.currentSource,a=n?ae(n):"Select scene",o=s.total>1;return Ls(()=>{t.current!==s.index&&(t.current=s.index,i(!1))},[s.index]),Ls(()=>{if(!r)return;let l=c=>{e.current&&!e.current.contains(c.target)&&i(!1)};return document.addEventListener("click",l),()=>document.removeEventListener("click",l)},[r]),bt("div",{ref:e,className:"gr-player__scene",children:[bt("div",{className:"gr-player__scene-inner",children:[bt("button",{className:"gr-player__scene-main",type:"button",disabled:!o,onClick:()=>i(!r),"aria-haspopup":"menu","aria-expanded":r,children:[Q(Zi,{}),bt("span",{className:"gr-player__scene-main-copy",children:[Q("span",{className:"gr-player__scene-copy",children:Q("span",{className:"gr-player__scene-label",children:a})}),o&&Q("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:s.sources.map((l,c)=>Q("span",{className:j("gr-player__scene-segment",c===s.index&&"is-active")},l.id??l.url??c))})]})]}),Q("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasPrev,onClick:()=>s.prev(),"aria-label":"Previous scene",children:Q(jt,{})}),Q("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasNext,onClick:()=>s.next(),"aria-label":"Next scene",children:Q(Qt,{})})]}),r&&o&&Q("div",{className:"gr-player__scene-menu",children:s.sources.map((l,c)=>bt("button",{type:"button",className:j("gr-player__scene-item",c===s.index&&"is-active"),onClick:()=>{s.goTo(c),i(!1)},children:[Q("span",{children:Pe(l)?Q(Te,{}):c+1}),Q("strong",{children:ae(l)})]},l.id??l.url??c))})]})};import{jsx as he,jsxs as ii}from"react/jsx-runtime";var ks=()=>{let{playlist:s}=F(),e=s.currentSource,t=Pe(e);return he("div",{className:"gr-player__scene gr-player__scene--stepper",children:ii("div",{className:"gr-player__scene-inner",children:[he("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasPrev,onClick:()=>s.prev(),"aria-label":"Previous scene",children:he(jt,{})}),he("div",{className:"gr-player__scene-main",children:ii("span",{className:"gr-player__scene-main-copy",children:[t&&e?ii("span",{className:"gr-player__scene-count gr-player__scene-count--local",children:[he(Te,{}),he("span",{className:"gr-player__scene-label",children:ae(e)})]}):he("span",{className:"gr-player__scene-count",children:s.index>=0?`${s.index+1} of ${s.total}`:`${s.total} scenes`}),he("span",{className:"gr-player__scene-segments","aria-hidden":"true",children:s.sources.map((r,i)=>he("span",{className:j("gr-player__scene-segment",i===s.index&&"is-active",Pe(r)&&"gr-player__scene-segment--local")},r.id??r.url??i))})]})}),he("button",{className:"gr-player__scene-nav",type:"button",disabled:!s.hasNext,onClick:()=>s.next(),"aria-label":"Next scene",children:he(Qt,{})})]})})};import{useEffect as Yo,useRef as Zo}from"react";import{jsx as vt}from"react/jsx-runtime";var Is=()=>{let{playlist:s}=F(),e=Zo(null),t=s.index;return Yo(()=>{e.current?.querySelector(`.gr-player__scene-tab[data-scene-index="${t}"]`)?.scrollIntoView({block:"nearest",inline:"nearest"})},[t]),vt("div",{className:"gr-player__scene",children:vt("div",{className:"gr-player__scene-inner",children:vt("div",{ref:e,className:"gr-player__scene-tabs-scroll",children:s.sources.map((r,i)=>vt("button",{type:"button","data-scene-index":i,className:j("gr-player__scene-tab",i===s.index&&"is-active",Pe(r)&&"gr-player__scene-tab--local"),onClick:()=>s.goTo(i),"aria-label":`Open ${ae(r)}`,"aria-current":i===s.index?"true":void 0,children:Pe(r)?vt(Te,{}):i+1},r.id??r.url??i))})})})};import{jsx as jo}from"react/jsx-runtime";var qo={tabs:Is,stepper:ks,menu:As},lr=()=>{let{config:s}=F(),{sceneSelector:e=Ji}=s,t=qo[e];return jo(t,{})};import{useRef as Fs,useState as Qo}from"react";import{jsx as cr,jsxs as $o}from"react/jsx-runtime";var si=({progress:s,duration:e,onSeek:t,disabled:r=!1})=>{let i=Fs(null),n=Fs(!1),[a,o]=Qo(0),l=p=>{if(!i.current)return 0;let u=i.current.getBoundingClientRect();return Math.min(1,Math.max(0,(p.clientX-u.left)/u.width))},c=p=>{e>0&&t(l(p)*e)},h=r?void 0:{onPointerDown(p){n.current=!0,p.currentTarget.setPointerCapture(p.pointerId),c(p)},onPointerMove(p){o(l(p)),n.current&&c(p)},onPointerLeave(){o(0)},onPointerUp(p){n.current=!1,p.currentTarget.releasePointerCapture(p.pointerId)},onPointerCancel(){n.current=!1}};return cr("div",{className:"gr-player__seek-shell","aria-disabled":r||void 0,children:$o("div",{ref:i,className:"gr-player__seek",role:"slider","aria-valuemin":0,"aria-valuemax":Math.max(e,0),"aria-valuenow":Math.round(s*Math.max(e,0)),"aria-disabled":r||void 0,tabIndex:r?-1:0,...h,children:[cr("span",{className:"gr-player__seek-fill",style:{width:`${s*100}%`}}),cr("span",{className:"gr-player__seek-hover",style:{width:`${a*100}%`}}),cr("span",{className:"gr-player__seek-thumb",style:{left:`${s*100}%`}})]})})};import{jsx as fe,jsxs as Bs}from"react/jsx-runtime";function Ko(s,e){return e>0?Math.min(1,Math.max(0,s/e)):0}var zs=()=>{let{gracia:s,playlist:e,presentation:t,shell:r}=F(),{isSceneReady:i}=t,{isFullscreen:n,toggleFullscreen:a}=r,{playback:o}=s,l=Ko(o.currentTime,o.duration);return Bs("div",{className:"gr-player__controls",children:[fe(re,{className:"gr-player__button--play",onClick:i?()=>o.togglePlay():void 0,"aria-label":o.isPlaying?"Pause":"Play","aria-disabled":!i||void 0,children:o.isPlaying?fe(Hi,{}):fe(Di,{})}),fe(lr,{}),e.hasAudio&&fe(Me,{className:"gr-player__mute",onClick:i?()=>o.toggleMute():void 0,"aria-label":o.isMuted?"Unmute":"Mute","aria-disabled":!i||void 0,children:o.isMuted?fe(Vi,{}):fe(Ui,{})}),fe(si,{progress:l,duration:o.duration,onSeek:c=>o.seek(c),disabled:!i}),Bs("div",{className:"gr-player__time",children:[Ir(o.currentTime)," / ",Ir(o.duration)]}),fe(Me,{variant:["icon","secondary"],className:"gr-player__fullscreen",onClick:a,"aria-label":n?"Exit fullscreen":"Enter fullscreen","aria-pressed":n,title:n?"Exit fullscreen":"Enter fullscreen",children:fe(qi,{active:n})})]})};import{useEffect as Gs,useRef as Jo,useState as ea}from"react";import{jsx as _t,jsxs as ni}from"react/jsx-runtime";var Os=()=>{let{gracia:s,config:e,presentation:t}=F(),{isSceneReady:r,isBlocking:i}=t,[n,a]=ea(!1),o=Jo(null),l=e.cameraControls&&r&&!i&&!$t(s.mode);if(Gs(()=>{l||a(!1)},[l]),Gs(()=>{if(!n)return;let p=d=>{o.current?.contains(d.target)||a(!1)},u=d=>{d.code==="Escape"&&a(!1)};return document.addEventListener("pointerdown",p),document.addEventListener("keydown",u),()=>{document.removeEventListener("pointerdown",p),document.removeEventListener("keydown",u)}},[n]),!l)return null;let{controlsType:c,setControls:h}=s.camera;return ni("div",{ref:o,className:"gr-player__camera-control",children:[_t(Me,{className:"gr-player__button--camera",onClick:()=>a(p=>!p),"aria-label":"Camera controls","aria-expanded":n,title:"Camera controls",srLabel:"Camera controls",children:_t(Wi,{})}),n&&ni("div",{className:"gr-player__camera-panel",role:"menu","aria-label":"Camera controls",children:[_t("div",{className:"gr-player__camera-title",children:"Camera"}),ji.map(p=>ni("button",{className:j("gr-player__camera-option",p.type===c&&"is-active"),type:"button",role:"menuitemradio","aria-checked":p.type===c,onClick:()=>h(p.type),children:[_t("span",{className:"gr-player__camera-label",children:p.label}),_t("span",{className:"gr-player__camera-hint",children:p.hint})]},p.type))]})]})};import{jsx as wt,jsxs as ra}from"react/jsx-runtime";var oi=({className:s})=>{let{gracia:e,presentation:t,xr:r}=F(),{isSceneReady:i,isBlocking:n}=t,{enter:a}=r;if(n)return null;let o=e.xr.arSupported?oe.AR:e.xr.vrSupported?oe.VR:null;if(!o)return null;let l=o===oe.AR;return wt("div",{className:["gr-player__xr-actions",s].filter(Boolean).join(" "),children:wt(ta,{active:e.mode===o,disabled:!i,icon:l?wt(qt,{}):wt(Zt,{}),label:l?"View in AR":"Play in VR",mode:o,onEnter:a})})},ta=({active:s,disabled:e,icon:t,label:r,mode:i,onEnter:n})=>ra(re,{className:"gr-player__button--xr",onClick:e?void 0:()=>n(i),"aria-disabled":e||void 0,"aria-pressed":s||void 0,title:r,children:[wt("span",{children:r}),t]});import{jsx as tt,jsxs as ai}from"react/jsx-runtime";var Ns=()=>{let{gracia:s,playlist:e,refs:t,presentation:r,shell:i}=F(),{isBlocking:n}=r,{localFilesEnabled:a,openLocalFile:o,localLabel:l}=i,{hasInteracted:c,resetView:h}=Or(t.container,e.index,s.camera);return ai("div",{className:"gr-player__top",children:[ai("div",{className:"gr-player__top-left",children:[a&&tt(Me,{className:"gr-player__button--local",onClick:o,"aria-label":l,title:l,srLabel:"Open local file",children:tt(Te,{})}),tt(oi,{className:"gr-player__xr-actions--desktop"})]}),ai("div",{className:"gr-player__top-right",children:[tt(Os,{}),tt(oi,{className:"gr-player__xr-actions--mobile"}),!n&&c&&tt(re,{variant:"secondary",className:"gr-player__reset",onClick:h,children:"Reset View"})]})]})};import{jsx as li,jsxs as Xs}from"react/jsx-runtime";var hr=()=>{let{presentation:s}=F(),{isBlocking:e,toast:t}=s;return Xs("div",{className:"gr-player__overlay",children:[li(Ns,{}),!e&&Xs("div",{className:"gr-player__bottom",children:[t&&li(Fr,{message:t.title}),li(zs,{})]})]})};import{jsx as Ge}from"react/jsx-runtime";var Ds=({onExit:s})=>Ge(re,{className:"gr-player__xr-exit",onClick:s,children:"Back to 2D"}),Hs=({onExit:s})=>Ge(Ve,{icon:Ge(qt,{}),title:"Running in AR",body:"View the scene in AR mode on your device",action:Ge(Ds,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),Vs=({onExit:s})=>Ge(Ve,{icon:Ge(Zt,{}),title:"Running in VR",body:"Put on your VR-headset and explore the scene",action:Ge(Ds,{onExit:s}),className:"gr-player__xr-active",role:"status",ariaLive:"polite"}),ci={ar:Hs,vr:Vs};import{Fragment as ia,jsx as rt,jsxs as sa}from"react/jsx-runtime";var hi=()=>{let{gracia:s,presentation:e,xr:t}=F(),{isBusy:r,isBlocking:i,playerError:n}=e,{retry:a}=e,{activeScreenMode:o,exit:l}=t,c=o?ci[o]:null;return sa(ia,{children:[r&&rt(zr,{}),i&&n&&rt(Br,{title:n.title,body:n.body,detail:n.cause.message,action:n.recoverable?rt(re,{className:"gr-player__state-action",onClick:a,children:"Try again"}):void 0}),c&&rt(c,{onExit:l}),!r&&s.isRebuffering&&rt("div",{className:"gr-player__rebuffer-spinner",children:rt("div",{className:"gr-player__spinner"})})]})};import{jsx as St,jsxs as la}from"react/jsx-runtime";var aa=[],Tt=na(function(e,t){let{controls:r=!0,className:i,style:n,children:a,sources:o=aa,...l}=e,c=Us(null),h=Us(null),{contextValue:p,gracia:u,playlist:d,openLocalFile:f,toggleFullscreen:g}=ri({...l,sources:o},{root:c,container:h}),{presentation:m,shell:_}=p,{isBusy:I}=m,{isFullscreen:M}=_;return oa(t,()=>({gracia:u,playlist:d,get cameraControlsType(){return u.camera.controlsType},play:()=>u.playback.play(),pause:()=>u.playback.pause(),seek:v=>u.playback.seek(v),open:v=>u.open(typeof v=="string"?{url:v,label:"Scene"}:v),close:()=>u.close(),next:()=>d.next(),prev:()=>d.prev(),goTo:v=>d.goTo(v),resetCamera:()=>u.camera.reset(),setCameraControls:v=>u.camera.setControls(v),setMode:v=>u.xr.setMode(v),toggleFullscreen:g,openLocalFile:f}),[u,f,d,g]),St(Gr,{value:p,children:la("section",{ref:c,className:j("gr-player",i,{"gr-player--loading":I,"gr-player--ready":u.isContentReady,"gr-player--scenes-single":d.total<=1,"gr-player--scenes-multiple":d.total>1,"gr-player--fullscreen":M,"gr-player--error":m.isBlocking}),style:n,children:[St("div",{ref:h,className:"gr-player__canvas"}),St("input",{className:"gr-player__file-input",type:"file",..._.fileInputProps}),St(hi,{}),r&&St(hr,{}),typeof a=="function"?a({gracia:u,playlist:d}):a]})})});import{createRef as ca}from"react";import{flushSync as ha}from"react-dom";import{createRoot as pa}from"react-dom/client";import{jsx as ua}from"react/jsx-runtime";function Ws(s,e){let t=ca(),r=pa(s),i=e,n=!0,a=()=>{ha(()=>{r.render(ua(Tt,{...i,ref:t}))})};return a(),{get player(){return t.current},update(o){n&&(i=o,a())},unmount(){n&&(n=!1,t.current?.close(),r.unmount())},async openLocalFile(){await t.current?.openLocalFile()}}}import{Box3 as da,BufferGeometry as fa,Float32BufferAttribute as ma,Matrix4 as ga,Mesh as ya,MeshBasicMaterial as xa,Sphere as ba,Vector2 as va,Vector3 as Ys}from"three";var pr=class extends ya{#e;#r=null;#t=new va;#i=!1;#s=new ga;enableMesh=!1;constructor(e){let t=new fa;t.setAttribute("position",new ma([0,0,0],3)),super(t,new xa({colorWrite:!1,depthWrite:!1,transparent:!0})),this.#e=e,this.frustumCulled=!1,this.castShadow=!0,this.renderOrder=1/0,this.onBeforeRender=this.#n,this.onBeforeShadow=this.#o}get player(){return this.#e}async setAudio(e){await this.#e.loadAudio(e)}setAudioListener(e){this.#r=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}dispose(){this.#e.close(),this.#e.dispose(),this.geometry.dispose(),this.material.dispose()}#o=(e,t,r,i)=>{this.enableMesh&&this.#a(e,i)};#n=(e,t,r)=>{e.getDrawingBufferSize(this.#t);let i=this.#t.x,n=this.#t.y;if(i===0||n===0)return;this.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let a=r.matrixWorld.elements;this.#r||this.#e.setAudioListenerMatrix(a),this.#e.setAudioSourceMatrix(this.matrixWorld.elements),this.#e.renderHybridViewport(i,n,{enableMesh:this.enableMesh}),e.resetState(),!this.#i&&this.#e.isReady&&this.#c()};#a(e,t){let r=e.getContext(),i=r.getParameter(r.VIEWPORT),n=i[2],a=i[3];n===0||a===0||(this.updateWorldMatrix(!0,!1),t.updateMatrixWorld(),this.#s.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.#s.multiply(this.matrixWorld),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.depthMask(!0),this.#e.renderMesh(this.#s.elements,i[0],i[1],n,a),e.resetState())}#c(){let e=this.#e.getBBox();if(!e)return;let t=new da(new Ys(e.minX,e.minY,e.minZ),new Ys(e.maxX,e.maxY,e.maxZ));this.geometry.boundingBox=t,this.geometry.boundingSphere=new ba,t.getBoundingSphere(this.geometry.boundingSphere),this.frustumCulled=!0,this.#i=!0}};import{ByteType as _a,DepthTexture as wa,Object3D as Sa,RenderTarget as Ta,RGBAFormat as Pa,UnsignedIntType as Ma,Vector2 as Zs}from"three";var qs=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST,ur=class s{#e;#r;#t;#i=null;root=new Sa;static attach(e,t){return e.assertDevice(t.backend?.device),new s(e,t)}constructor(e,t){this.#e=e;let r=t.backend;e.configureSurface(r.context,{usage:qs});let{x:i,y:n}=t.getDrawingBufferSize(new Zs);this.#t=new wa,this.#t.type=Ma;let a=new Ta(i,n);a.depthTexture=this.#t,e.isBGRA&&(a.texture.format=Pa,a.texture.type=_a,a.texture.internalFormat="bgra8unorm"),this.#r=a}get player(){return this.#e}setAudioListener(e){this.#i=e??null,this.#e.setAudioOutput(e?{context:e.context,destination:e.getInput(),externalListener:!0}:null)}setAudioPanner(e){this.#e.setAudioPanner(e)}render(e,t,r,i){let n=e.getDrawingBufferSize(new Zs),a=n.x,o=n.y;if(a===0||o===0)return;let l=this.#r;(l.width!==a||l.height!==o)&&(l.setSize(a,o),this.#e.configureSurface(e.backend.context,{usage:qs})),e.setRenderTarget(l),e.render(t,r),e.setRenderTarget(null);let c=e.backend,h=c.data.get(l.texture)?.texture,p=c.data.get(this.#t)?.texture;if(!h||!p||h.width!==a||h.height!==o)return;this.root.updateWorldMatrix(!0,!1),this.#e.setModelMatrix(this.root.matrixWorld.elements),r.updateMatrixWorld(),this.#e.setCamera(r.matrixWorld.elements,r.projectionMatrix.elements);let u=r.matrixWorld.elements;this.#i||this.#e.setAudioListenerMatrix(u),this.#e.setAudioSourceMatrix(this.root.matrixWorld.elements),this.#e.renderTextures({color:h,depth:p,w:a,h:o}),i&&(e.autoClearColor=!1,e.autoClearDepth=!0,e.autoClearStencil=!0,e.setRenderTarget(l),e.render(i,r),e.setRenderTarget(null),e.autoClearColor=!0);let d=c.context.getCurrentTexture();d.usage&GPUTextureUsage.COPY_DST&&d.width===a&&d.height===o&&this.#e.copyTexture(h,d,[a,o,1])}setStaticModelMatrix(e){this.#e.setStaticModelMatrix(e)}dispose(){this.#r.dispose(),this.#e.close(),this.#e.dispose()}};export{qe as ClassicControls,Qe as DebugRenderer,at as ENV_PRESETS,kr as GRACIA_PLAYER_DEFAULT_CSS,De as GraciaApp,Ne as GraciaPlayer,Tt as GraciaReactPlayer,Ut as GraciaSplats,Re as Mat4,$e as ModernControls,Ue as QuadLayer,Se as Quat,Xe as SceneManipulator,Ke as SceneOverlay,pr as SplatsMesh,ur as SplatsRendererW3,$ as Vec3,et as XROverlay,Je as XRRayRenderer,E as axis,Ct as bbox,He as buildApiSources,we as envCoefsFromPreset,fr as envCoefsFromSH27,Cr as fetchStreamingMetadata,Jt as installGraciaPlayerStyles,Et as loadGraciaModule,X as mat4,Ws as mountGraciaPlayer,b as num,we as presetToLightProbe,K as quat,Wt as useGraciaPlayer,Yt as useGraciaPlaylist,T as vec3};
