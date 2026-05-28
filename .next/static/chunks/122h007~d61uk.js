(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,15413,e=>{"use strict";let t,i,n;var r,s=e.i(73852),o=e.i(5850);let a=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],l=new Set(a),d=(e,t,i)=>i>t?t:i<e?e:i,c={test:e=>"number"==typeof e,parse:parseFloat,transform:e=>e},u={...c,transform:e=>d(0,1,e)},p={...c,default:1},h=e=>Math.round(1e5*e)/1e5,m=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu,f=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,g=(e,t)=>i=>!!("string"==typeof i&&f.test(i)&&i.startsWith(e)||t&&null!=i&&Object.prototype.hasOwnProperty.call(i,t)),x=(e,t,i)=>n=>{if("string"!=typeof n)return n;let[r,s,o,a]=n.match(m);return{[e]:parseFloat(r),[t]:parseFloat(s),[i]:parseFloat(o),alpha:void 0!==a?parseFloat(a):1}},y={...c,transform:e=>Math.round(d(0,255,e))},v={test:g("rgb","red"),parse:x("red","green","blue"),transform:({red:e,green:t,blue:i,alpha:n=1})=>"rgba("+y.transform(e)+", "+y.transform(t)+", "+y.transform(i)+", "+h(u.transform(n))+")"},b={test:g("#"),parse:function(e){let t="",i="",n="",r="";return e.length>5?(t=e.substring(1,3),i=e.substring(3,5),n=e.substring(5,7),r=e.substring(7,9)):(t=e.substring(1,2),i=e.substring(2,3),n=e.substring(3,4),r=e.substring(4,5),t+=t,i+=i,n+=n,r+=r),{red:parseInt(t,16),green:parseInt(i,16),blue:parseInt(n,16),alpha:r?parseInt(r,16)/255:1}},transform:v.transform},w=e=>({test:t=>"string"==typeof t&&t.endsWith(e)&&1===t.split(" ").length,parse:parseFloat,transform:t=>`${t}${e}`}),S=w("deg"),T=w("%"),E=w("px"),F=w("vh"),C=w("vw"),k={...T,parse:e=>T.parse(e)/100,transform:e=>T.transform(100*e)},A={test:g("hsl","hue"),parse:x("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:i,alpha:n=1})=>"hsla("+Math.round(e)+", "+T.transform(h(t))+", "+T.transform(h(i))+", "+h(u.transform(n))+")"},M={test:e=>v.test(e)||b.test(e)||A.test(e),parse:e=>v.test(e)?v.parse(e):A.test(e)?A.parse(e):b.parse(e),transform:e=>"string"==typeof e?e:e.hasOwnProperty("red")?v.transform(e):A.transform(e),getAnimatableNone:e=>{let t=M.parse(e);return t.alpha=0,M.transform(t)}},j=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,P="number",B="color",D=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function R(e){let t=e.toString(),i=[],n={color:[],number:[],var:[]},r=[],s=0,o=t.replace(D,e=>(M.test(e)?(n.color.push(s),r.push(B),i.push(M.parse(e))):e.startsWith("var(")?(n.var.push(s),r.push("var"),i.push(e)):(n.number.push(s),r.push(P),i.push(parseFloat(e))),++s,"${}")).split("${}");return{values:i,split:o,indexes:n,types:r}}function L({split:e,types:t}){let i=e.length;return n=>{let r="";for(let s=0;s<i;s++)if(r+=e[s],void 0!==n[s]){let e=t[s];e===P?r+=h(n[s]):e===B?r+=M.transform(n[s]):r+=n[s]}return r}}let z={test:function(e){return isNaN(e)&&"string"==typeof e&&(e.match(m)?.length||0)+(e.match(j)?.length||0)>0},parse:function(e){return R(e).values},createTransformer:function(e){return L(R(e))},getAnimatableNone:function(e){let t=R(e);return L(t)(t.values.map((e,i)=>((e,t)=>"number"==typeof e?t?.trim().endsWith("/")?e:0:"number"==typeof e?0:M.test(e)?M.getAnimatableNone(e):e)(e,t.split[i])))}},I=new Set(["brightness","contrast","saturate","opacity"]);function V(e){let[t,i]=e.slice(0,-1).split("(");if("drop-shadow"===t)return e;let[n]=i.match(m)||[];if(!n)return e;let r=i.replace(n,""),s=+!!I.has(t);return n!==i&&(s*=100),t+"("+s+r+")"}let W=/\b([a-z-]*)\(.*?\)/gu,O={...z,getAnimatableNone:e=>{let t=e.match(W);return t?t.map(V).join(" "):e}},$={...z,getAnimatableNone:e=>{let t=z.parse(e);return z.createTransformer(e)(t.map(e=>"number"==typeof e?0:"object"==typeof e?{...e,alpha:1}:e))}},N={...c,transform:Math.round},U={borderWidth:E,borderTopWidth:E,borderRightWidth:E,borderBottomWidth:E,borderLeftWidth:E,borderRadius:E,borderTopLeftRadius:E,borderTopRightRadius:E,borderBottomRightRadius:E,borderBottomLeftRadius:E,width:E,maxWidth:E,height:E,maxHeight:E,top:E,right:E,bottom:E,left:E,inset:E,insetBlock:E,insetBlockStart:E,insetBlockEnd:E,insetInline:E,insetInlineStart:E,insetInlineEnd:E,padding:E,paddingTop:E,paddingRight:E,paddingBottom:E,paddingLeft:E,paddingBlock:E,paddingBlockStart:E,paddingBlockEnd:E,paddingInline:E,paddingInlineStart:E,paddingInlineEnd:E,margin:E,marginTop:E,marginRight:E,marginBottom:E,marginLeft:E,marginBlock:E,marginBlockStart:E,marginBlockEnd:E,marginInline:E,marginInlineStart:E,marginInlineEnd:E,fontSize:E,backgroundPositionX:E,backgroundPositionY:E,rotate:S,rotateX:S,rotateY:S,rotateZ:S,scale:p,scaleX:p,scaleY:p,scaleZ:p,skew:S,skewX:S,skewY:S,distance:E,translateX:E,translateY:E,translateZ:E,x:E,y:E,z:E,perspective:E,transformPerspective:E,opacity:u,originX:k,originY:k,originZ:E,zIndex:N,fillOpacity:u,strokeOpacity:u,numOctaves:N},H={...U,color:M,backgroundColor:M,outlineColor:M,fill:M,stroke:M,borderColor:M,borderTopColor:M,borderRightColor:M,borderBottomColor:M,borderLeftColor:M,filter:O,WebkitFilter:O,mask:$,WebkitMask:$},q=e=>H[e],Y=()=>({translate:0,scale:1,origin:0,originPoint:0}),X=()=>({x:Y(),y:Y()}),G=()=>({min:0,max:0}),_=()=>({x:G(),y:G()}),K=e=>!!(e&&e.getVelocity),Z=new Set(["width","height","top","left","right","bottom",...a]),J=e=>t=>t.test(e),Q=[c,E,T,S,C,F,{test:e=>"auto"===e,parse:e=>e}],ee=e=>Q.find(J(e));var et=e.i(93873);let ei=()=>{},en=()=>{};et.default;let er=e=>t=>"string"==typeof t&&t.startsWith(e),es=er("--"),eo=er("var(--"),ea=e=>!!eo(e)&&el.test(e.split("/*")[0].trim()),el=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function ed(e){return"string"==typeof e&&e.split("/*")[0].includes("var(--")}let ec=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u,eu=e=>180*e/Math.PI,ep=e=>em(eu(Math.atan2(e[1],e[0]))),eh={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:e=>(Math.abs(e[0])+Math.abs(e[3]))/2,rotate:ep,rotateZ:ep,skewX:e=>eu(Math.atan(e[1])),skewY:e=>eu(Math.atan(e[2])),skew:e=>(Math.abs(e[1])+Math.abs(e[2]))/2},em=e=>((e%=360)<0&&(e+=360),e),ef=e=>Math.sqrt(e[0]*e[0]+e[1]*e[1]),eg=e=>Math.sqrt(e[4]*e[4]+e[5]*e[5]),ex={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:ef,scaleY:eg,scale:e=>(ef(e)+eg(e))/2,rotateX:e=>em(eu(Math.atan2(e[6],e[5]))),rotateY:e=>em(eu(Math.atan2(-e[2],e[0]))),rotateZ:ep,rotate:ep,skewX:e=>eu(Math.atan(e[4])),skewY:e=>eu(Math.atan(e[1])),skew:e=>(Math.abs(e[1])+Math.abs(e[4]))/2};function ey(e){return+!!e.includes("scale")}function ev(e,t){let i,n;if(!e||"none"===e)return ey(t);let r=e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);if(r)i=ex,n=r;else{let t=e.match(/^matrix\(([-\d.e\s,]+)\)$/u);i=eh,n=t}if(!n)return ey(t);let s=i[t],o=n[1].split(",").map(eb);return"function"==typeof s?s(o):o[s]}function eb(e){return parseFloat(e.trim())}let ew=e=>e===c||e===E,eS=new Set(["x","y","z"]),eT=a.filter(e=>!eS.has(e)),eE={width:({x:e},{paddingLeft:t="0",paddingRight:i="0",boxSizing:n})=>{let r=e.max-e.min;return"border-box"===n?r:r-parseFloat(t)-parseFloat(i)},height:({y:e},{paddingTop:t="0",paddingBottom:i="0",boxSizing:n})=>{let r=e.max-e.min;return"border-box"===n?r:r-parseFloat(t)-parseFloat(i)},top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:(e,{transform:t})=>ev(t,"x"),y:(e,{transform:t})=>ev(t,"y")};eE.translateX=eE.x,eE.translateY=eE.y;let eF=e=>e,eC={},ek=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function eA(e,t){let i=!1,n=!0,r={delta:0,timestamp:0,isProcessing:!1},s=()=>i=!0,o=ek.reduce((e,i)=>(e[i]=function(e,t){let i=new Set,n=new Set,r=!1,s=!1,o=new WeakSet,a={delta:0,timestamp:0,isProcessing:!1},l=0;function d(t){o.has(t)&&(c.schedule(t),e()),l++,t(a)}let c={schedule:(e,t=!1,s=!1)=>{let a=s&&r?i:n;return t&&o.add(e),a.add(e),e},cancel:e=>{n.delete(e),o.delete(e)},process:e=>{if(a=e,r){s=!0;return}r=!0;let o=i;i=n,n=o,i.forEach(d),t,l=0,i.clear(),r=!1,s&&(s=!1,c.process(e))}};return c}(s,t?i:void 0),e),{}),{setup:a,read:l,resolveKeyframes:d,preUpdate:c,update:u,preRender:p,render:h,postRender:m}=o,f=()=>{let s=eC.useManualTiming,o=s?r.timestamp:performance.now();i=!1,s||(r.delta=n?1e3/60:Math.max(Math.min(o-r.timestamp,40),1)),r.timestamp=o,r.isProcessing=!0,a.process(r),l.process(r),d.process(r),c.process(r),u.process(r),p.process(r),h.process(r),m.process(r),r.isProcessing=!1,i&&t&&(n=!1,e(f))};return{schedule:ek.reduce((t,s)=>{let a=o[s];return t[s]=(t,s=!1,o=!1)=>(!i&&(i=!0,n=!0,r.isProcessing||e(f)),a.schedule(t,s,o)),t},{}),cancel:e=>{for(let t=0;t<ek.length;t++)o[ek[t]].cancel(e)},state:r,steps:o}}let{schedule:eM,cancel:ej,state:eP,steps:eB}=eA("u">typeof requestAnimationFrame?requestAnimationFrame:eF,!0),eD=new Set,eR=!1,eL=!1,ez=!1;function eI(){if(eL){let e=Array.from(eD).filter(e=>e.needsMeasurement),t=new Set(e.map(e=>e.element)),i=new Map;t.forEach(e=>{let t,n=(t=[],eT.forEach(i=>{let n=e.getValue(i);void 0!==n&&(t.push([i,n.get()]),n.set(+!!i.startsWith("scale")))}),t);n.length&&(i.set(e,n),e.render())}),e.forEach(e=>e.measureInitialState()),t.forEach(e=>{e.render();let t=i.get(e);t&&t.forEach(([t,i])=>{e.getValue(t)?.set(i)})}),e.forEach(e=>e.measureEndState()),e.forEach(e=>{void 0!==e.suspendedScrollY&&window.scrollTo(0,e.suspendedScrollY)})}eL=!1,eR=!1,eD.forEach(e=>e.complete(ez)),eD.clear()}function eV(){eD.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(eL=!0)})}class eW{constructor(e,t,i,n,r,s=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...e],this.onComplete=t,this.name=i,this.motionValue=n,this.element=r,this.isAsync=s}scheduleResolve(){this.state="scheduled",this.isAsync?(eD.add(this),eR||(eR=!0,eM.read(eV),eM.resolveKeyframes(eI))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:e,name:t,element:i,motionValue:n}=this;if(null===e[0]){let r=n?.get(),s=e[e.length-1];if(void 0!==r)e[0]=r;else if(i&&t){let n=i.readValue(t,s);null!=n&&(e[0]=n)}void 0===e[0]&&(e[0]=s),n&&void 0===r&&n.set(e[0])}for(let t=1;t<e.length;t++)e[t]??(e[t]=e[t-1])}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(e=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,e),eD.delete(this)}cancel(){"scheduled"===this.state&&(eD.delete(this),this.state="pending")}resume(){"pending"===this.state&&this.scheduleResolve()}}let eO=new Set([O,$]);function e$(e,t){let i=q(e);return eO.has(i)||(i=z),i.getAnimatableNone?i.getAnimatableNone(t):void 0}let eN=new Set(["auto","none","0"]);class eU extends eW{constructor(e,t,i,n,r){super(e,t,i,n,r,!0)}readKeyframes(){let{unresolvedKeyframes:e,element:t,name:i}=this;if(!t||!t.current)return;super.readKeyframes();for(let i=0;i<e.length;i++){let n=e[i];if("string"==typeof n&&ea(n=n.trim())){let r=function e(t,i,n=1){en(n<=4,`Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`,"max-css-var-depth");let[r,s]=function(e){let t=ec.exec(e);if(!t)return[,];let[,i,n,r]=t;return[`--${i??n}`,r]}(t);if(!r)return;let o=window.getComputedStyle(i).getPropertyValue(r);if(o){let e=o.trim();return/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e)?parseFloat(e):e}return ea(s)?e(s,i,n+1):s}(n,t.current);void 0!==r&&(e[i]=r),i===e.length-1&&(this.finalKeyframe=n)}}if(this.resolveNoneKeyframes(),!Z.has(i)||2!==e.length)return;let[n,r]=e,s=ee(n),o=ee(r);if(ed(n)!==ed(r)&&eE[i]){this.needsMeasurement=!0;return}if(s!==o)if(ew(s)&&ew(o))for(let t=0;t<e.length;t++){let i=e[t];"string"==typeof i&&(e[t]=parseFloat(i))}else eE[i]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){let{unresolvedKeyframes:e,name:t}=this,i=[];for(let t=0;t<e.length;t++)(null===e[t]||function(e){if("number"==typeof e)return 0===e;if(null===e)return!0;return"none"===e||"0"===e||/^0[^.\s]+$/u.test(e)}(e[t]))&&i.push(t);i.length&&function(e,t,i){let n,r=0;for(;r<e.length&&!n;){let t=e[r];"string"==typeof t&&!eN.has(t)&&R(t).values.length&&(n=e[r]),r++}if(n&&i)for(let r of t)e[r]=e$(i,n)}(e,i,t)}measureInitialState(){let{element:e,unresolvedKeyframes:t,name:i}=this;if(!e||!e.current)return;"height"===i&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=eE[i](e.measureViewportBox(),window.getComputedStyle(e.current)),t[0]=this.measuredOrigin;let n=t[t.length-1];void 0!==n&&e.getValue(i,n).jump(n,!1)}measureEndState(){let{element:e,name:t,unresolvedKeyframes:i}=this;if(!e||!e.current)return;let n=e.getValue(t);n&&n.jump(this.measuredOrigin,!1);let r=i.length-1,s=i[r];i[r]=eE[t](e.measureViewportBox(),window.getComputedStyle(e.current)),null!==s&&void 0===this.finalKeyframe&&(this.finalKeyframe=s),this.removedTransforms?.length&&this.removedTransforms.forEach(([t,i])=>{e.getValue(t).set(i)}),this.resolveNoneKeyframes()}}let eH=e=>1e3*e;function eq(e,t){-1===e.indexOf(t)&&e.push(t)}function eY(e,t){let i=e.indexOf(t);i>-1&&e.splice(i,1)}class eX{constructor(){this.subscriptions=[]}add(e){return eq(this.subscriptions,e),()=>eY(this.subscriptions,e)}notify(e,t,i){let n=this.subscriptions.length;if(n)if(1===n)this.subscriptions[0](e,t,i);else for(let r=0;r<n;r++){let n=this.subscriptions[r];n&&n(e,t,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}function eG(e,t,i){t.startsWith("--")?e.style.setProperty(t,i):e.style[t]=i}function e_(e){let t;return()=>(void 0===t&&(t=e()),t)}let eK={};function eZ(e,t){let i=e_(e);return()=>eK[t]??i()}let eJ=eZ(()=>void 0!==window.ScrollTimeline,"scrollTimeline"),eQ=eZ(()=>void 0!==window.ViewTimeline,"viewTimeline"),e0=e=>null!==e;function e1(e,{repeat:t,repeatType:i="loop"},n,r=1){let s=e.filter(e0),o=r<0||t&&"loop"!==i&&t%2==1?0:s.length-1;return o&&void 0!==n?n:s[o]}class e2{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(e=>{this.resolve=e})}notifyFinished(){this.resolve()}then(e,t){return this.finished.then(e,t)}}let e5={layout:0,mainThread:0,waapi:0},e3=e=>Array.isArray(e)&&"number"==typeof e[0],e4=eZ(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch(e){return!1}return!0},"linearEasing"),e8=(e,t,i=10)=>{let n="",r=Math.max(Math.round(t/i),2);for(let t=0;t<r;t++)n+=Math.round(1e4*e(t/(r-1)))/1e4+", ";return`linear(${n.substring(0,n.length-2)})`},e6=([e,t,i,n])=>`cubic-bezier(${e}, ${t}, ${i}, ${n})`,e9={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:e6([0,.65,.55,1]),circOut:e6([.55,0,1,.45]),backIn:e6([.31,.01,.66,-.59]),backOut:e6([.33,1.53,.69,.99])};function e7(e){return"function"==typeof e&&"applyToOptions"in e}class te extends e2{constructor(e){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!e)return;const{element:t,name:i,keyframes:n,pseudoElement:r,allowFlatten:s=!1,finalKeyframe:o,onComplete:a}=e;this.isPseudoElement=!!r,this.allowFlatten=s,this.options=e,en("string"!=typeof e.type,'Mini animate() doesn\'t support "type" as a string.',"mini-spring");const l=function({type:e,...t}){return e7(e)&&e4()?e.applyToOptions(t):(t.duration??(t.duration=300),t.ease??(t.ease="easeOut"),t)}(e);this.animation=function(e,t,i,{delay:n=0,duration:r=300,repeat:s=0,repeatType:o="loop",ease:a="easeOut",times:l}={},d){let c={[t]:i};l&&(c.offset=l);let u=function e(t,i){if(t)return"function"==typeof t?e4()?e8(t,i):"ease-out":e3(t)?e6(t):Array.isArray(t)?t.map(t=>e(t,i)||e9.easeOut):e9[t]}(a,r);Array.isArray(u)&&(c.easing=u);let p={delay:n,duration:r,easing:Array.isArray(u)?"linear":u,fill:"both",iterations:s+1,direction:"reverse"===o?"alternate":"normal"};d&&(p.pseudoElement=d);let h=e.animate(c,p);return h}(t,i,n,l,r),!1===l.autoplay&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!r){let e=e1(n,this.options,o,this.speed);this.updateMotionValue&&this.updateMotionValue(e),eG(t,i,e),this.animation.cancel()}a?.(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),"finished"===this.state&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch(e){}}stop(){if(this.isStopped)return;this.isStopped=!0;let{state:e}=this;"idle"!==e&&"finished"!==e&&(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){let e=this.options?.element;!this.isPseudoElement&&e?.isConnected&&this.animation.commitStyles?.()}get duration(){return Number(this.animation.effect?.getComputedTiming?.().duration||0)/1e3}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+e/1e3}get time(){return(Number(this.animation.currentTime)||0)/1e3}set time(e){let t=null!==this.finishedTime;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=eH(e),t&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(e){e<0&&(this.finishedTime=null),this.animation.playbackRate=e}get state(){return null!==this.finishedTime?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(e){this.manualStartTime=this.animation.startTime=e}attachTimeline({timeline:e,rangeStart:t,rangeEnd:i,observe:n}){return(this.allowFlatten&&this.animation.effect?.updateTiming({easing:"linear"}),this.animation.onfinish=null,e&&eJ())?(this.animation.timeline=e,t&&(this.animation.rangeStart=t),i&&(this.animation.rangeEnd=i),eF):n(this)}}let tt=new Set(["opacity","clipPath","filter","transform"]),{schedule:ti}=eA(queueMicrotask,!1);function tn(){t=void 0}let tr={now:()=>(void 0===t&&tr.set(eP.isProcessing||eC.useManualTiming?eP.timestamp:performance.now()),t),set:e=>{t=e,queueMicrotask(tn)}};function ts(e,t){return t?1e3/t*e:0}let to={current:void 0};class ta{constructor(e,t={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=e=>{let t=tr.now();if(this.updatedAt!==t&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(e),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(let e of this.dependents)e.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=t.owner}setCurrent(e){this.current=e,this.updatedAt=tr.now(),null===this.canTrackVelocity&&void 0!==e&&(this.canTrackVelocity=!isNaN(parseFloat(this.current)))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on("change",e)}on(e,t){this.events[e]||(this.events[e]=new eX);let i=this.events[e].add(t);return"change"===e?()=>{i(),eM.read(()=>{this.events.change.getSize()||this.stop()})}:i}clearListeners(){for(let e in this.events)this.events[e].clear()}attach(e,t){this.passiveEffect=e,this.stopPassiveEffect=t}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,t,i){this.set(t),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-i}jump(e,t=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,t&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(e){this.dependents||(this.dependents=new Set),this.dependents.add(e)}removeDependent(e){this.dependents&&this.dependents.delete(e)}get(){return to.current&&to.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let e=tr.now();if(!this.canTrackVelocity||void 0===this.prevFrameValue||e-this.updatedAt>30)return 0;let t=Math.min(this.updatedAt-this.prevUpdatedAt,30);return ts(parseFloat(this.current)-parseFloat(this.prevFrameValue),t)}start(e){return this.stop(),new Promise(t=>{this.hasAnimated=!0,this.animation=e(t),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function tl(e,t){return new ta(e,t)}let td=[...Q,M,z],tc=new WeakMap;function tu(e){return null!==e&&"object"==typeof e&&"function"==typeof e.start}function tp(e){return"string"==typeof e||Array.isArray(e)}let th=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],tm=["initial",...th];function tf(e){return tu(e.animate)||tm.some(t=>tp(e[t]))}function tg(e){return!!(tf(e)||e.variants)}let tx={current:null},ty={current:!1},tv="u">typeof window;function tb(e){let t=[{},{}];return e?.values.forEach((e,i)=>{t[0][i]=e.get(),t[1][i]=e.getVelocity()}),t}function tw(e,t,i,n){if("function"==typeof t){let[r,s]=tb(n);t=t(void 0!==i?i:e.custom,r,s)}if("string"==typeof t&&(t=e.variants&&e.variants[t]),"function"==typeof t){let[r,s]=tb(n);t=t(void 0!==i?i:e.custom,r,s)}return t}let tS=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],tT={};class tE{scrapeMotionValuesFromProps(e,t,i){return{}}constructor({parent:e,props:t,presenceContext:i,reducedMotionConfig:n,skipAnimations:r,blockInitialAnimation:s,visualState:o},a={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=eW,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let e=tr.now();this.renderScheduledAt<e&&(this.renderScheduledAt=e,eM.render(this.render,!1,!0))};const{latestValues:l,renderState:d}=o;this.latestValues=l,this.baseTarget={...l},this.initialValues=t.initial?{...l}:{},this.renderState=d,this.parent=e,this.props=t,this.presenceContext=i,this.depth=e?e.depth+1:0,this.reducedMotionConfig=n,this.skipAnimationsConfig=r,this.options=a,this.blockInitialAnimation=!!s,this.isControllingVariants=tf(t),this.isVariantNode=tg(t),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);const{willChange:c,...u}=this.scrapeMotionValuesFromProps(t,{},this);for(const e in u){const t=u[e];void 0!==l[e]&&K(t)&&t.set(l[e])}}mount(e){if(this.hasBeenMounted)for(let e in this.initialValues)this.values.get(e)?.jump(this.initialValues[e]),this.latestValues[e]=this.initialValues[e];this.current=e,tc.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((e,t)=>this.bindToMotionValue(t,e)),"never"===this.reducedMotionConfig?this.shouldReduceMotion=!1:"always"===this.reducedMotionConfig?this.shouldReduceMotion=!0:(ty.current||function(){if(ty.current=!0,tv)if(window.matchMedia){let e=window.matchMedia("(prefers-reduced-motion)"),t=()=>tx.current=e.matches;e.addEventListener("change",t),t()}else tx.current=!1}(),this.shouldReduceMotion=tx.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,this.parent?.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){for(let e in this.projection&&this.projection.unmount(),ej(this.notifyUpdate),ej(this.render),this.valueSubscriptions.forEach(e=>e()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent?.removeChild(this),this.events)this.events[e].clear();for(let e in this.features){let t=this.features[e];t&&(t.unmount(),t.isMounted=!1)}this.current=null}addChild(e){this.children.add(e),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(e)}removeChild(e){this.children.delete(e),this.enteringChildren&&this.enteringChildren.delete(e)}bindToMotionValue(e,t){let i;if(this.valueSubscriptions.has(e)&&this.valueSubscriptions.get(e)(),t.accelerate&&tt.has(e)&&this.current instanceof HTMLElement){let{factory:i,keyframes:n,times:r,ease:s,duration:o}=t.accelerate,a=new te({element:this.current,name:e,keyframes:n,times:r,ease:s,duration:eH(o)}),l=i(a);this.valueSubscriptions.set(e,()=>{l(),a.cancel()});return}let n=l.has(e);n&&this.onBindTransform&&this.onBindTransform();let r=t.on("change",t=>{this.latestValues[e]=t,this.props.onUpdate&&eM.preRender(this.notifyUpdate),n&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});"u">typeof window&&window.MotionCheckAppearSync&&(i=window.MotionCheckAppearSync(this,e,t)),this.valueSubscriptions.set(e,()=>{r(),i&&i(),t.owner&&t.stop()})}sortNodePosition(e){return this.current&&this.sortInstanceNodePosition&&this.type===e.type?this.sortInstanceNodePosition(this.current,e.current):0}updateFeatures(){let e="animation";for(e in tT){let t=tT[e];if(!t)continue;let{isEnabled:i,Feature:n}=t;if(!this.features[e]&&n&&i(this.props)&&(this.features[e]=new n(this)),this.features[e]){let t=this.features[e];t.isMounted?t.update():(t.mount(),t.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):_()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,t){this.latestValues[e]=t}update(e,t){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=t;for(let t=0;t<tS.length;t++){let i=tS[t];this.propEventSubscriptions[i]&&(this.propEventSubscriptions[i](),delete this.propEventSubscriptions[i]);let n=e["on"+i];n&&(this.propEventSubscriptions[i]=this.on(i,n))}this.prevMotionValues=function(e,t,i){for(let n in t){let r=t[n],s=i[n];if(K(r))e.addValue(n,r);else if(K(s))e.addValue(n,tl(r,{owner:e}));else if(s!==r)if(e.hasValue(n)){let t=e.getValue(n);!0===t.liveStyle?t.jump(r):t.hasAnimated||t.set(r)}else{let t=e.getStaticValue(n);e.addValue(n,tl(void 0!==t?t:r,{owner:e}))}}for(let n in i)void 0===t[n]&&e.removeValue(n);return t}(this,this.scrapeMotionValuesFromProps(e,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(e){let t=this.getClosestVariantNode();if(t)return t.variantChildren&&t.variantChildren.add(e),()=>t.variantChildren.delete(e)}addValue(e,t){let i=this.values.get(e);t!==i&&(i&&this.removeValue(e),this.bindToMotionValue(e,t),this.values.set(e,t),this.latestValues[e]=t.get())}removeValue(e){this.values.delete(e);let t=this.valueSubscriptions.get(e);t&&(t(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,t){if(this.props.values&&this.props.values[e])return this.props.values[e];let i=this.values.get(e);return void 0===i&&void 0!==t&&(i=tl(null===t?void 0:t,{owner:this}),this.addValue(e,i)),i}readValue(e,t){let i=void 0===this.latestValues[e]&&this.current?this.getBaseTargetFromProps(this.props,e)??this.readValueFromInstance(this.current,e,this.options):this.latestValues[e];if(null!=i){let n,r;if("string"==typeof i&&(n=i,/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n)||(r=i,/^0[^.\s]+$/u.test(r))))i=parseFloat(i);else{let n;n=i,!td.find(J(n))&&z.test(t)&&(i=e$(e,t))}this.setBaseTarget(e,K(i)?i.get():i)}return K(i)?i.get():i}setBaseTarget(e,t){this.baseTarget[e]=t}getBaseTarget(e){let t,{initial:i}=this.props;if("string"==typeof i||"object"==typeof i){let n=tw(this.props,i,this.presenceContext?.custom);n&&(t=n[e])}if(i&&void 0!==t)return t;let n=this.getBaseTargetFromProps(this.props,e);return void 0===n||K(n)?void 0!==this.initialValues[e]&&void 0===t?void 0:this.baseTarget[e]:n}on(e,t){return this.events[e]||(this.events[e]=new eX),this.events[e].add(t)}notify(e,...t){this.events[e]&&this.events[e].notify(...t)}scheduleRenderMicrotask(){ti.render(this.render)}}class tF extends tE{constructor(){super(...arguments),this.KeyframeResolver=eU}sortInstanceNodePosition(e,t){return 2&e.compareDocumentPosition(t)?1:-1}getBaseTargetFromProps(e,t){let i=e.style;return i?i[t]:void 0}removeValueFromRenderState(e,{vars:t,style:i}){delete t[e],delete i[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:e}=this.props;K(e)&&(this.childSubscription=e.on("change",e=>{this.current&&(this.current.textContent=`${e}`)}))}}function tC(e){return e.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`)}let tk=(e,t)=>t&&"number"==typeof e?t.transform(e):e,tA={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},tM=a.length;function tj(e,t,i){let{style:n,vars:r,transformOrigin:s}=e,o=!1,d=!1;for(let e in t){let i=t[e];if(l.has(e)){o=!0;continue}if(es(e)){r[e]=i;continue}{let t=tk(i,U[e]);e.startsWith("origin")?(d=!0,s[e]=t):n[e]=t}}if(!t.transform&&(o||i?n.transform=function(e,t,i){let n="",r=!0;for(let s=0;s<tM;s++){let o=a[s],l=e[o];if(void 0===l)continue;let d=!0;if("number"==typeof l)d=l===+!!o.startsWith("scale");else{let e=parseFloat(l);d=o.startsWith("scale")?1===e:0===e}if(!d||i){let e=tk(l,U[o]);if(!d){r=!1;let t=tA[o]||o;n+=`${t}(${e}) `}i&&(t[o]=e)}}return n=n.trim(),i?n=i(t,r?"":n):r&&(n="none"),n}(t,e.transform,i):n.transform&&(n.transform="none")),d){let{originX:e="50%",originY:t="50%",originZ:i=0}=s;n.transformOrigin=`${e} ${t} ${i}`}}let tP={offset:"stroke-dashoffset",array:"stroke-dasharray"},tB={offset:"strokeDashoffset",array:"strokeDasharray"},tD=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function tR(e,{attrX:t,attrY:i,attrScale:n,pathLength:r,pathSpacing:s=1,pathOffset:o=0,...a},l,d,c){if(tj(e,a,d),l){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};let{attrs:u,style:p}=e;for(let e of(u.transform&&(p.transform=u.transform,delete u.transform),(p.transform||u.transformOrigin)&&(p.transformOrigin=u.transformOrigin??"50% 50%",delete u.transformOrigin),p.transform&&(p.transformBox=c?.transformBox??"fill-box",delete u.transformBox),tD))void 0!==u[e]&&(p[e]=u[e],delete u[e]);void 0!==t&&(u.x=t),void 0!==i&&(u.y=i),void 0!==n&&(u.scale=n),void 0!==r&&function(e,t,i=1,n=0,r=!0){e.pathLength=1;let s=r?tP:tB;e[s.offset]=`${-n}`,e[s.array]=`${t} ${i}`}(u,r,s,o,!1)}let tL=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),tz=e=>"string"==typeof e&&"svg"===e.toLowerCase();function tI(e,{style:t,vars:i},n,r){let s,o=e.style;for(s in t)o[s]=t[s];for(s in r?.applyProjectionStyles(o,n),i)o.setProperty(s,i[s])}function tV(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}let tW={correct:(e,t)=>{if(!t.target)return e;if("string"==typeof e)if(!E.test(e))return e;else e=parseFloat(e);let i=tV(e,t.target.x),n=tV(e,t.target.y);return`${i}% ${n}%`}},tO=(e,t,i)=>e+(t-e)*i,t$={borderRadius:{...tW,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:tW,borderTopRightRadius:tW,borderBottomLeftRadius:tW,borderBottomRightRadius:tW,boxShadow:{correct:(e,{treeScale:t,projectionDelta:i})=>{let n=z.parse(e);if(n.length>5)return e;let r=z.createTransformer(e),s=+("number"!=typeof n[0]),o=i.x.scale*t.x,a=i.y.scale*t.y;n[0+s]/=o,n[1+s]/=a;let l=tO(o,a,.5);return"number"==typeof n[2+s]&&(n[2+s]/=l),"number"==typeof n[3+s]&&(n[3+s]/=l),r(n)}}};function tN(e,{layout:t,layoutId:i}){return l.has(e)||e.startsWith("origin")||(t||void 0!==i)&&(!!t$[e]||"opacity"===e)}function tU(e,t,i){let n=e.style,r=t?.style,s={};if(!n)return s;for(let t in n)(K(n[t])||r&&K(r[t])||tN(t,e)||i?.getValue(t)?.liveStyle!==void 0)&&(s[t]=n[t]);return s}function tH(e,t,i){let n=tU(e,t,i);for(let i in e)(K(e[i])||K(t[i]))&&(n[-1!==a.indexOf(i)?"attr"+i.charAt(0).toUpperCase()+i.substring(1):i]=e[i]);return n}class tq extends tF{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=_}getBaseTargetFromProps(e,t){return e[t]}readValueFromInstance(e,t){if(l.has(t)){let e=q(t);return e&&e.default||0}return t=tL.has(t)?t:tC(t),e.getAttribute(t)}scrapeMotionValuesFromProps(e,t,i){return tH(e,t,i)}build(e,t,i){tR(e,t,this.isSVGTag,i.transformTemplate,i.style)}renderInstance(e,t,i,n){for(let i in tI(e,t,void 0,n),t.attrs)e.setAttribute(tL.has(i)?i:tC(i),t.attrs[i])}mount(e){this.isSVGTag=tz(e.tagName),super.mount(e)}}function tY({top:e,left:t,right:i,bottom:n}){return{x:{min:t,max:i},y:{min:e,max:n}}}function tX(e){return void 0===e||1===e}function tG({scale:e,scaleX:t,scaleY:i}){return!tX(e)||!tX(t)||!tX(i)}function t_(e){return tG(e)||tK(e)||e.z||e.rotate||e.rotateX||e.rotateY||e.skewX||e.skewY}function tK(e){var t,i;return(t=e.x)&&"0%"!==t||(i=e.y)&&"0%"!==i}function tZ(e,t,i,n,r){return void 0!==r&&(e=n+r*(e-n)),n+i*(e-n)+t}function tJ(e,t=0,i=1,n,r){e.min=tZ(e.min,t,i,n,r),e.max=tZ(e.max,t,i,n,r)}function tQ(e,{x:t,y:i}){tJ(e.x,t.translate,t.scale,t.originPoint),tJ(e.y,i.translate,i.scale,i.originPoint)}function t0(e,t){e.min+=t,e.max+=t}function t1(e,t,i,n,r=.5){let s=tO(e.min,e.max,r);tJ(e,t,i,s,n)}function t2(e,t){return"string"==typeof e?parseFloat(e)/100*(t.max-t.min):e}function t5(e,t,i){let n=i??e;t1(e.x,t2(t.x,n.x),t.scaleX,t.scale,t.originX),t1(e.y,t2(t.y,n.y),t.scaleY,t.scale,t.originY)}function t3(e,t){return tY(function(e,t){if(!t)return e;let i=t({x:e.left,y:e.top}),n=t({x:e.right,y:e.bottom});return{top:i.y,left:i.x,bottom:n.y,right:n.x}}(e.getBoundingClientRect(),t))}class t4 extends tF{constructor(){super(...arguments),this.type="html",this.renderInstance=tI}readValueFromInstance(e,t){if(l.has(t))return this.projection?.isProjecting?ey(t):((e,t)=>{let{transform:i="none"}=getComputedStyle(e);return ev(i,t)})(e,t);{let i=window.getComputedStyle(e),n=(es(t)?i.getPropertyValue(t):i[t])||0;return"string"==typeof n?n.trim():n}}measureInstanceViewportBox(e,{transformPagePoint:t}){return t3(e,t)}build(e,t,i){tj(e,t,i.transformTemplate)}scrapeMotionValuesFromProps(e,t,i){return tU(e,t,i)}}let t8=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function t6(e){if("string"!=typeof e||e.includes("-"));else if(t8.indexOf(e)>-1||/[A-Z]/u.test(e))return!0;return!1}let t9=(0,o.createContext)({}),t7=(0,o.createContext)({strict:!1}),ie=(0,o.createContext)({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"}),it=(0,o.createContext)({});function ii(e){return Array.isArray(e)?e.join(" "):e}let ir=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function is(e,t,i){for(let n in t)K(t[n])||tN(n,i)||(e[n]=t[n])}let io=()=>({...ir(),attrs:{}}),ia=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function il(e){return e.startsWith("while")||e.startsWith("drag")&&"draggable"!==e||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||ia.has(e)}let id=e=>!il(e);try{r=(()=>{let e=Error("Cannot find module '@emotion/is-prop-valid'");throw e.code="MODULE_NOT_FOUND",e})().default,"function"==typeof r&&(id=e=>e.startsWith("on")?!il(e):r(e))}catch{}function ic(e){return K(e)?e.get():e}let iu=(0,o.createContext)(null);function ip(e){let t=(0,o.useRef)(null);return null===t.current&&(t.current=e()),t.current}let ih=e=>(t,i)=>{let n=(0,o.useContext)(it),r=(0,o.useContext)(iu),s=()=>(function({scrapeMotionValuesFromProps:e,createRenderState:t},i,n,r){return{latestValues:function(e,t,i,n){let r={},s=n(e,{});for(let e in s)r[e]=ic(s[e]);let{initial:o,animate:a}=e,l=tf(e),d=tg(e);t&&d&&!l&&!1!==e.inherit&&(void 0===o&&(o=t.initial),void 0===a&&(a=t.animate));let c=!!i&&!1===i.initial,u=(c=c||!1===o)?a:o;if(u&&"boolean"!=typeof u&&!tu(u)){let t=Array.isArray(u)?u:[u];for(let i=0;i<t.length;i++){let n=tw(e,t[i]);if(n){let{transitionEnd:e,transition:t,...i}=n;for(let e in i){let t=i[e];if(Array.isArray(t)){let e=c?t.length-1:0;t=t[e]}null!==t&&(r[e]=t)}for(let t in e)r[t]=e[t]}}}return r}(i,n,r,e),renderState:t()}})(e,t,n,r);return i?s():ip(s)},im=ih({scrapeMotionValuesFromProps:tU,createRenderState:ir}),ig=ih({scrapeMotionValuesFromProps:tH,createRenderState:io}),ix={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},iy=!1;function iv(){return!function(){if(iy)return;let e={};for(let t in ix)e[t]={isEnabled:e=>ix[t].some(t=>!!e[t])};tT=e,iy=!0}(),tT}let ib=Symbol.for("motionComponentSymbol"),iw="data-"+tC("framerAppearId"),iS=(0,o.createContext)({});function iT(e){return e&&"object"==typeof e&&Object.prototype.hasOwnProperty.call(e,"current")}let iE="u">typeof window?o.useLayoutEffect:o.useEffect;function iF(e,{forwardMotionProps:t=!1,type:i}={},n,r){n&&function(e){let t=iv();for(let i in e)t[i]={...t[i],...e[i]};tT=t}(n);let a=i?"svg"===i:t6(e),l=a?ig:im;function d(i,n){var d;let c,u,p,h={...(0,o.useContext)(ie),...i,layoutId:function({layoutId:e}){let t=(0,o.useContext)(t9).id;return t&&void 0!==e?t+"-"+e:e}(i)},{isStatic:m}=h,f=function(e){let{initial:t,animate:i}=function(e,t){if(tf(e)){let{initial:t,animate:i}=e;return{initial:!1===t||tp(t)?t:void 0,animate:tp(i)?i:void 0}}return!1!==e.inherit?t:{}}(e,(0,o.useContext)(it));return(0,o.useMemo)(()=>({initial:t,animate:i}),[ii(t),ii(i)])}(i),g=l(i,m);if(!m&&"u">typeof window){(0,o.useContext)(t7).strict;let t=function(e){let{drag:t,layout:i}=iv();if(!t&&!i)return{};let n={...t,...i};return{MeasureLayout:t?.isEnabled(e)||i?.isEnabled(e)?n.MeasureLayout:void 0,ProjectionNode:n.ProjectionNode}}(h);c=t.MeasureLayout,f.visualElement=function(e,t,i,n,r,s){let{visualElement:a}=(0,o.useContext)(it),l=(0,o.useContext)(t7),d=(0,o.useContext)(iu),c=(0,o.useContext)(ie),u=c.reducedMotion,p=c.skipAnimations,h=(0,o.useRef)(null),m=(0,o.useRef)(!1);n=n||l.renderer,!h.current&&n&&(h.current=n(e,{visualState:t,parent:a,props:i,presenceContext:d,blockInitialAnimation:!!d&&!1===d.initial,reducedMotionConfig:u,skipAnimations:p,isSVG:s}),m.current&&h.current&&(h.current.manuallyAnimateOnMount=!0));let f=h.current,g=(0,o.useContext)(iS);f&&!f.projection&&r&&("html"===f.type||"svg"===f.type)&&function(e,t,i,n){let{layoutId:r,layout:s,drag:o,dragConstraints:a,layoutScroll:l,layoutRoot:d,layoutAnchor:c,layoutCrossfade:u}=t;e.projection=new i(e.latestValues,t["data-framer-portal-id"]?void 0:function e(t){if(t)return!1!==t.options.allowProjection?t.projection:e(t.parent)}(e.parent)),e.projection.setOptions({layoutId:r,layout:s,alwaysMeasureLayout:!!o||a&&iT(a),visualElement:e,animationType:"string"==typeof s?s:"both",initialPromotionConfig:n,crossfade:u,layoutScroll:l,layoutRoot:d,layoutAnchor:c})}(h.current,i,r,g);let x=(0,o.useRef)(!1);(0,o.useInsertionEffect)(()=>{f&&x.current&&f.update(i,d)});let y=i[iw],v=(0,o.useRef)(!!y&&"u">typeof window&&!window.MotionHandoffIsComplete?.(y)&&window.MotionHasOptimisedAnimation?.(y));return iE(()=>{m.current=!0,f&&(x.current=!0,window.MotionIsMounted=!0,f.updateFeatures(),f.scheduleRenderMicrotask(),v.current&&f.animationState&&f.animationState.animateChanges())}),(0,o.useEffect)(()=>{f&&(!v.current&&f.animationState&&f.animationState.animateChanges(),v.current&&(queueMicrotask(()=>{window.MotionHandoffMarkAsComplete?.(y)}),v.current=!1),f.enteringChildren=void 0)}),f}(e,g,h,r,t.ProjectionNode,a)}return(0,s.jsxs)(it.Provider,{value:f,children:[c&&f.visualElement?(0,s.jsx)(c,{visualElement:f.visualElement,...h}):null,function(e,t,i,{latestValues:n},r,s=!1,a){let l=(a??t6(e)?function(e,t,i,n){let r=(0,o.useMemo)(()=>{let i=io();return tR(i,t,tz(n),e.transformTemplate,e.style),{...i.attrs,style:{...i.style}}},[t]);if(e.style){let t={};is(t,e.style,e),r.style={...t,...r.style}}return r}:function(e,t){let i,n,r={},s=(i=e.style||{},is(n={},i,e),Object.assign(n,function({transformTemplate:e},t){return(0,o.useMemo)(()=>{let i=ir();return tj(i,t,e),Object.assign({},i.vars,i.style)},[t])}(e,t)),n);return e.drag&&!1!==e.dragListener&&(r.draggable=!1,s.userSelect=s.WebkitUserSelect=s.WebkitTouchCallout="none",s.touchAction=!0===e.drag?"none":`pan-${"x"===e.drag?"y":"x"}`),void 0===e.tabIndex&&(e.onTap||e.onTapStart||e.whileTap)&&(r.tabIndex=0),r.style=s,r})(t,n,r,e),d=function(e,t,i){let n={};for(let r in e)("values"!==r||"object"!=typeof e.values)&&!K(e[r])&&(id(r)||!0===i&&il(r)||!t&&!il(r)||e.draggable&&r.startsWith("onDrag"))&&(n[r]=e[r]);return n}(t,"string"==typeof e,s),c=e!==o.Fragment?{...d,...l,ref:i}:{},{children:u}=t,p=(0,o.useMemo)(()=>K(u)?u.get():u,[u]);return(0,o.createElement)(e,{...c,children:p})}(e,i,(d=f.visualElement,u=(0,o.useRef)(n),(0,o.useInsertionEffect)(()=>{u.current=n}),p=(0,o.useRef)(null),(0,o.useCallback)(e=>{e&&g.onMount?.(e);let t=u.current;if("function"==typeof t)if(e){let i=t(e);"function"==typeof i&&(p.current=i)}else p.current?(p.current(),p.current=null):t(e);else t&&(t.current=e);d&&(e?d.mount(e):d.unmount())},[d])),g,m,t,a)]})}d.displayName=`motion.${"string"==typeof e?e:`create(${e.displayName??e.name??""})`}`;let c=(0,o.forwardRef)(d);return c[ib]=e,c}class iC{constructor(e){this.isMounted=!1,this.node=e}update(){}}function ik(e,t,i){let n=e.getProps();return tw(n,t,void 0!==i?i:n.custom,e)}function iA(e,t){if(e?.inherit&&t){let{inherit:i,...n}=e;return{...t,...n}}return e}function iM(e,t){let i=e?.[t]??e?.default??e;return i!==e?iA(i,e):i}let ij=e=>Array.isArray(e);function iP(e,t){let i=e.getValue("willChange");if(K(i)&&i.add)return i.add(t);if(!i&&eC.WillChange){let i=new eC.WillChange("auto");e.addValue("willChange",i),i.add(t)}}let iB=(e,t)=>i=>t(e(i)),iD=(...e)=>e.reduce(iB);function iR(e,t,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?e+(t-e)*6*i:i<.5?t:i<2/3?e+(t-e)*(2/3-i)*6:e}function iL(e,t){return i=>i>0?t:e}let iz=(e,t,i)=>{let n=e*e,r=i*(t*t-n)+n;return r<0?0:Math.sqrt(r)},iI=[b,v,A];function iV(e){let t=iI.find(t=>t.test(e));if(ei(!!t,`'${e}' is not an animatable color. Use the equivalent color code instead.`,"color-not-animatable"),!t)return!1;let i=t.parse(e);return t===A&&(i=function({hue:e,saturation:t,lightness:i,alpha:n}){e/=360,i/=100;let r=0,s=0,o=0;if(t/=100){let n=i<.5?i*(1+t):i+t-i*t,a=2*i-n;r=iR(a,n,e+1/3),s=iR(a,n,e),o=iR(a,n,e-1/3)}else r=s=o=i;return{red:Math.round(255*r),green:Math.round(255*s),blue:Math.round(255*o),alpha:n}}(i)),i}let iW=(e,t)=>{let i=iV(e),n=iV(t);if(!i||!n)return iL(e,t);let r={...i};return e=>(r.red=iz(i.red,n.red,e),r.green=iz(i.green,n.green,e),r.blue=iz(i.blue,n.blue,e),r.alpha=tO(i.alpha,n.alpha,e),v.transform(r))},iO=new Set(["none","hidden"]);function i$(e,t){return i=>tO(e,t,i)}function iN(e){return"number"==typeof e?i$:"string"==typeof e?ea(e)?iL:M.test(e)?iW:iq:Array.isArray(e)?iU:"object"==typeof e?M.test(e)?iW:iH:iL}function iU(e,t){let i=[...e],n=i.length,r=e.map((e,i)=>iN(e)(e,t[i]));return e=>{for(let t=0;t<n;t++)i[t]=r[t](e);return i}}function iH(e,t){let i={...e,...t},n={};for(let r in i)void 0!==e[r]&&void 0!==t[r]&&(n[r]=iN(e[r])(e[r],t[r]));return e=>{for(let t in n)i[t]=n[t](e);return i}}let iq=(e,t)=>{let i=z.createTransformer(t),n=R(e),r=R(t);if(!(n.indexes.var.length===r.indexes.var.length&&n.indexes.color.length===r.indexes.color.length&&n.indexes.number.length>=r.indexes.number.length))return ei(!0,`Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,"complex-values-different"),iL(e,t);if(iO.has(e)&&!r.values.length||iO.has(t)&&!n.values.length)return iO.has(e)?i=>i<=0?e:t:i=>i>=1?t:e;return iD(iU(function(e,t){let i=[],n={color:0,var:0,number:0};for(let r=0;r<t.values.length;r++){let s=t.types[r],o=e.indexes[s][n[s]],a=e.values[o]??0;i[r]=a,n[s]++}return i}(n,r),r.values),i)};function iY(e,t,i){return"number"==typeof e&&"number"==typeof t&&"number"==typeof i?tO(e,t,i):iN(e)(e,t)}let iX=e=>{let t=({timestamp:t})=>e(t);return{start:(e=!0)=>eM.update(t,e),stop:()=>ej(t),now:()=>eP.isProcessing?eP.timestamp:tr.now()}};function iG(e){let t=0,i=e.next(t);for(;!i.done&&t<2e4;)t+=50,i=e.next(t);return t>=2e4?1/0:t}let i_=.01,iK=2,iZ=.005,iJ=.5;function iQ(e,t){return e*Math.sqrt(1-t*t)}let i0=["duration","bounce"],i1=["stiffness","damping","mass"];function i2(e,t){return t.some(t=>void 0!==e[t])}function i5(e=.3,t=.3){let i,n,r,s,o,a,l="object"!=typeof e?{visualDuration:e,keyframes:[0,1],bounce:t}:e,{restSpeed:c,restDelta:u}=l,p=l.keyframes[0],h=l.keyframes[l.keyframes.length-1],m={done:!1,value:p},{stiffness:f,damping:g,mass:x,duration:y,velocity:v,isResolvedFromDuration:b}=function(e){let t={velocity:0,stiffness:100,damping:10,mass:1,isResolvedFromDuration:!1,...e};if(!i2(e,i1)&&i2(e,i0))if(t.velocity=0,e.visualDuration){let i=2*Math.PI/(1.2*e.visualDuration),n=i*i,r=2*d(.05,1,1-(e.bounce||0))*Math.sqrt(n);t={...t,mass:1,stiffness:n,damping:r}}else{let i=function({duration:e=800,bounce:t=.3,velocity:i=0,mass:n=1}){let r,s;ei(e<=eH(10),"Spring duration must be 10 seconds or less","spring-duration-limit");let o=1-t;o=d(.05,1,o),e=d(.01,10,e/1e3),o<1?(r=t=>{let n=t*o,r=n*e;return .001-(n-i)/iQ(t,o)*Math.exp(-r)},s=t=>{let n=t*o*e,s=Math.pow(o,2)*Math.pow(t,2)*e,a=Math.exp(-n),l=iQ(Math.pow(t,2),o);return(n*i+i-s)*a*(-r(t)+.001>0?-1:1)/l}):(r=t=>-.001+Math.exp(-t*e)*((t-i)*e+1),s=t=>e*e*(i-t)*Math.exp(-t*e));let a=function(e,t,i){let n=i;for(let i=1;i<12;i++)n-=e(n)/t(n);return n}(r,s,5/e);if(e=eH(e),isNaN(a))return{stiffness:100,damping:10,duration:e};{let t=Math.pow(a,2)*n;return{stiffness:t,damping:2*o*Math.sqrt(n*t),duration:e}}}({...e,velocity:0});(t={...t,...i,mass:1}).isResolvedFromDuration=!0}return t}({...l,velocity:-((l.velocity||0)/1e3)}),w=v||0,S=g/(2*Math.sqrt(f*x)),T=h-p,E=Math.sqrt(f/x)/1e3,F=5>Math.abs(T);if(c||(c=F?i_:iK),u||(u=F?iZ:iJ),S<1)r=iQ(E,S),s=(w+S*E*T)/r,i=e=>h-Math.exp(-S*E*e)*(s*Math.sin(r*e)+T*Math.cos(r*e)),o=S*E*s+T*r,a=S*E*T-s*r,n=e=>Math.exp(-S*E*e)*(o*Math.sin(r*e)+a*Math.cos(r*e));else if(1===S){i=e=>h-Math.exp(-E*e)*(T+(w+E*T)*e);let e=w+E*T;n=t=>Math.exp(-E*t)*(E*e*t-w)}else{let e=E*Math.sqrt(S*S-1);i=t=>{let i=Math.exp(-S*E*t),n=Math.min(e*t,300);return h-i*((w+S*E*T)*Math.sinh(n)+e*T*Math.cosh(n))/e};let t=(w+S*E*T)/e,r=S*E*t-T*e,s=S*E*T-t*e;n=t=>{let i=Math.exp(-S*E*t),n=Math.min(e*t,300);return i*(r*Math.sinh(n)+s*Math.cosh(n))}}let C={calculatedDuration:b&&y||null,velocity:e=>eH(n(e)),next:e=>{if(!b&&S<1){let t=Math.exp(-S*E*e),i=Math.sin(r*e),n=Math.cos(r*e),l=h-t*(s*i+T*n);return m.done=Math.abs(eH(t*(o*i+a*n)))<=c&&Math.abs(h-l)<=u,m.value=m.done?h:l,m}let t=i(e);return b?m.done=e>=y:m.done=Math.abs(eH(n(e)))<=c&&Math.abs(h-t)<=u,m.value=m.done?h:t,m},toString:()=>{let e=Math.min(iG(C),2e4),t=e8(t=>C.next(e*t).value,e,30);return e+"ms "+t},toTransition:()=>{}};return C}function i3(e,t,i){let n=Math.max(t-5,0);return ts(i-e(n),t-n)}function i4({keyframes:e,velocity:t=0,power:i=.8,timeConstant:n=325,bounceDamping:r=10,bounceStiffness:s=500,modifyTarget:o,min:a,max:l,restDelta:d=.5,restSpeed:c}){let u,p,h=e[0],m={done:!1,value:h},f=i*t,g=h+f,x=void 0===o?g:o(g);x!==g&&(f=x-h);let y=e=>-f*Math.exp(-e/n),v=e=>x+y(e),b=e=>{let t=y(e),i=v(e);m.done=Math.abs(t)<=d,m.value=m.done?x:i},w=e=>{let t;if(t=m.value,void 0!==a&&t<a||void 0!==l&&t>l){var i;u=e,p=i5({keyframes:[m.value,(i=m.value,void 0===a?l:void 0===l||Math.abs(a-i)<Math.abs(l-i)?a:l)],velocity:i3(v,e,m.value),damping:r,stiffness:s,restDelta:d,restSpeed:c})}};return w(0),{calculatedDuration:null,next:e=>{let t=!1;return(p||void 0!==u||(t=!0,b(e),w(e)),void 0!==u&&e>=u)?p.next(e-u):(t||b(e),m)}}}i5.applyToOptions=e=>{let t=function(e,t=100,i){let n=i({...e,keyframes:[0,t]}),r=Math.min(iG(n),2e4);return{type:"keyframes",ease:e=>n.next(r*e).value/t,duration:r/1e3}}(e,100,i5);return e.ease=t.ease,e.duration=eH(t.duration),e.type="keyframes",e};let i8=(e,t,i)=>(((1-3*i+3*t)*e+(3*i-6*t))*e+3*t)*e;function i6(e,t,i,n){return e===t&&i===n?eF:r=>0===r||1===r?r:i8(function(e,t,i,n,r){let s,o,a=0;do(s=i8(o=t+(i-t)/2,n,r)-e)>0?i=o:t=o;while(Math.abs(s)>1e-7&&++a<12)return o}(r,0,1,e,i),t,n)}let i9=i6(.42,0,1,1),i7=i6(0,0,.58,1),ne=i6(.42,0,.58,1),nt=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,ni=e=>t=>1-e(1-t),nn=i6(.33,1.53,.69,.99),nr=ni(nn),ns=nt(nr),no=e=>e>=1?1:(e*=2)<1?.5*nr(e):.5*(2-Math.pow(2,-10*(e-1))),na=e=>1-Math.sin(Math.acos(e)),nl=ni(na),nd=nt(na),nc={linear:eF,easeIn:i9,easeInOut:ne,easeOut:i7,circIn:na,circInOut:nd,circOut:nl,backIn:nr,backInOut:ns,backOut:nn,anticipate:no},nu=e=>{if(e3(e)){en(4===e.length,"Cubic bezier arrays must contain four numerical values.","cubic-bezier-length");let[t,i,n,r]=e;return i6(t,i,n,r)}return"string"==typeof e?(en(void 0!==nc[e],`Invalid easing type '${e}'`,"invalid-easing-type"),nc[e]):e},np=(e,t,i)=>{let n=t-e;return 0===n?1:(i-e)/n};function nh(e,t,{clamp:i=!0,ease:n,mixer:r}={}){let s=e.length;if(en(s===t.length,"Both input and output ranges must be the same length","range-length"),1===s)return()=>t[0];if(2===s&&t[0]===t[1])return()=>t[1];let o=e[0]===e[1];e[0]>e[s-1]&&(e=[...e].reverse(),t=[...t].reverse());let a=function(e,t,i){let n=[],r=i||eC.mix||iY,s=e.length-1;for(let i=0;i<s;i++){let s=r(e[i],e[i+1]);t&&(s=iD(Array.isArray(t)?t[i]||eF:t,s)),n.push(s)}return n}(t,n,r),l=a.length,c=i=>{if(o&&i<e[0])return t[0];let n=0;if(l>1)for(;n<e.length-2&&!(i<e[n+1]);n++);let r=np(e[n],e[n+1],i);return a[n](r)};return i?t=>c(d(e[0],e[s-1],t)):c}function nm(e){let t=[0];return!function(e,t){let i=e[e.length-1];for(let n=1;n<=t;n++){let r=np(0,t,n);e.push(tO(i,1,r))}}(t,e.length-1),t}function nf({duration:e=300,keyframes:t,times:i,ease:n="easeInOut"}){var r;let s=Array.isArray(n)&&"number"!=typeof n[0]?n.map(nu):nu(n),o={done:!1,value:t[0]},a=nh((r=i&&i.length===t.length?i:nm(t),r.map(t=>t*e)),t,{ease:Array.isArray(s)?s:t.map(()=>s||ne).splice(0,t.length-1)});return{calculatedDuration:e,next:t=>(o.value=a(t),o.done=t>=e,o)}}let ng={decay:i4,inertia:i4,tween:nf,keyframes:nf,spring:i5};function nx(e){"string"==typeof e.type&&(e.type=ng[e.type])}let ny=e=>e/100;class nv extends e2{constructor(e){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{let{motionValue:e}=this.options;e&&e.updatedAt!==tr.now()&&this.tick(tr.now()),this.isStopped=!0,"idle"!==this.state&&(this.teardown(),this.options.onStop?.())},e5.mainThread++,this.options=e,this.initAnimation(),this.play(),!1===e.autoplay&&this.pause()}initAnimation(){let{options:e}=this;nx(e);let{type:t=nf,repeat:i=0,repeatDelay:n=0,repeatType:r,velocity:s=0}=e,{keyframes:o}=e,a=t||nf;a!==nf&&"number"!=typeof o[0]&&(this.mixKeyframes=iD(ny,iY(o[0],o[1])),o=[0,100]);let l=a({...e,keyframes:o});"mirror"===r&&(this.mirroredGenerator=a({...e,keyframes:[...o].reverse(),velocity:-s})),null===l.calculatedDuration&&(l.calculatedDuration=iG(l));let{calculatedDuration:d}=l;this.calculatedDuration=d,this.resolvedDuration=d+n,this.totalDuration=this.resolvedDuration*(i+1)-n,this.generator=l}updateTime(e){let t=Math.round(e-this.startTime)*this.playbackSpeed;null!==this.holdTime?this.currentTime=this.holdTime:this.currentTime=t}tick(e,t=!1){let i,{generator:n,totalDuration:r,mixKeyframes:s,mirroredGenerator:o,resolvedDuration:a,calculatedDuration:l}=this;if(null===this.startTime)return n.next(0);let{delay:c=0,keyframes:u,repeat:p,repeatType:h,repeatDelay:m,type:f,onUpdate:g,finalKeyframe:x}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-r/this.speed,this.startTime)),t?this.currentTime=e:this.updateTime(e);let y=this.currentTime-c*(this.playbackSpeed>=0?1:-1),v=this.playbackSpeed>=0?y<0:y>r;this.currentTime=Math.max(y,0),"finished"===this.state&&null===this.holdTime&&(this.currentTime=r);let b=this.currentTime,w=n;if(p){let e=Math.min(this.currentTime,r)/a,t=Math.floor(e),i=e%1;!i&&e>=1&&(i=1),1===i&&t--,(t=Math.min(t,p+1))%2&&("reverse"===h?(i=1-i,m&&(i-=m/a)):"mirror"===h&&(w=o)),b=d(0,1,i)*a}v?(this.delayState.value=u[0],i=this.delayState):i=w.next(b),s&&!v&&(i.value=s(i.value));let{done:S}=i;v||null===l||(S=this.playbackSpeed>=0?this.currentTime>=r:this.currentTime<=0);let T=null===this.holdTime&&("finished"===this.state||"running"===this.state&&S);return T&&f!==i4&&(i.value=e1(u,this.options,x,this.speed)),g&&g(i.value),T&&this.finish(),i}then(e,t){return this.finished.then(e,t)}get duration(){return this.calculatedDuration/1e3}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+e/1e3}get time(){return this.currentTime/1e3}set time(e){e=eH(e),this.currentTime=e,null===this.startTime||null!==this.holdTime||0===this.playbackSpeed?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=e,this.tick(e))}getGeneratorVelocity(){let e=this.currentTime;if(e<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(e);let t=this.generator.next(e).value;return i3(e=>this.generator.next(e).value,e,t)}get speed(){return this.playbackSpeed}set speed(e){let t=this.playbackSpeed!==e;t&&this.driver&&this.updateTime(tr.now()),this.playbackSpeed=e,t&&this.driver&&(this.time=this.currentTime/1e3)}play(){if(this.isStopped)return;let{driver:e=iX,startTime:t}=this.options;this.driver||(this.driver=e(e=>this.tick(e))),this.options.onPlay?.();let i=this.driver.now();"finished"===this.state?(this.updateFinished(),this.startTime=i):null!==this.holdTime?this.startTime=i-this.holdTime:this.startTime||(this.startTime=t??i),"finished"===this.state&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(tr.now()),this.holdTime=this.currentTime}complete(){"running"!==this.state&&this.play(),this.state="finished",this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state="finished",this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null,e5.mainThread--}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}attachTimeline(e){return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),this.driver?.stop(),e.observe(this)}}let nb={anticipate:no,backInOut:ns,circInOut:nd};class nw extends te{constructor(e){!function(e){"string"==typeof e.ease&&e.ease in nb&&(e.ease=nb[e.ease])}(e),nx(e),super(e),void 0!==e.startTime&&!1!==e.autoplay&&(this.startTime=e.startTime),this.options=e}updateMotionValue(e){let{motionValue:t,onUpdate:i,onComplete:n,element:r,...s}=this.options;if(!t)return;if(void 0!==e)return void t.set(e);let o=new nv({...s,autoplay:!1}),a=Math.max(10,tr.now()-this.startTime),l=d(0,10,a-10),c=o.sample(a).value,{name:u}=this.options;r&&u&&eG(r,u,c),t.setWithVelocity(o.sample(Math.max(0,a-l)).value,c,l),o.stop()}}let nS=(e,t)=>"zIndex"!==t&&!!("number"==typeof e||Array.isArray(e)||"string"==typeof e&&(z.test(e)||"0"===e)&&!e.startsWith("url("));function nT(e){e.duration=0,e.type="keyframes"}let nE=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/,nF=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),nC=e_(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));class nk extends e2{constructor({autoplay:e=!0,delay:t=0,type:i="keyframes",repeat:n=0,repeatDelay:r=0,repeatType:s="loop",keyframes:o,name:a,motionValue:l,element:d,...c}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=tr.now();const u={autoplay:e,delay:t,type:i,repeat:n,repeatDelay:r,repeatType:s,name:a,motionValue:l,element:d,...c},p=d?.KeyframeResolver||eW;this.keyframeResolver=new p(o,(e,t,i)=>this.onKeyframesResolved(e,t,u,!i),a,l,d),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(e,t,i,n){let r;this.keyframeResolver=void 0;let{name:s,type:o,velocity:a,delay:l,isHandoff:d,onUpdate:c}=i;this.resolvedAt=tr.now();let u=!0;!function(e,t,i,n){let r=e[0];if(null===r)return!1;if("display"===t||"visibility"===t)return!0;let s=e[e.length-1],o=nS(r,t),a=nS(s,t);return ei(o===a,`You are trying to animate ${t} from "${r}" to "${s}". "${o?s:r}" is not an animatable value.`,"value-not-animatable"),!!o&&!!a&&(function(e){let t=e[0];if(1===e.length)return!0;for(let i=0;i<e.length;i++)if(e[i]!==t)return!0}(e)||("spring"===i||e7(i))&&n)}(e,s,o,a)&&(u=!1,(eC.instantAnimations||!l)&&c?.(e1(e,i,t)),e[0]=e[e.length-1],nT(i),i.repeat=0);let p={startTime:n?this.resolvedAt&&this.resolvedAt-this.createdAt>40?this.resolvedAt:this.createdAt:void 0,finalKeyframe:t,...i,keyframes:e},h=u&&!d&&function(e){let{motionValue:t,name:i,repeatDelay:n,repeatType:r,damping:s,type:o,keyframes:a}=e;if(!(t?.owner?.current instanceof HTMLElement))return!1;let{onUpdate:l,transformTemplate:d}=t.owner.getProps();return nC()&&i&&(tt.has(i)||nF.has(i)&&function(e){for(let t=0;t<e.length;t++)if("string"==typeof e[t]&&nE.test(e[t]))return!0;return!1}(a))&&("transform"!==i||!d)&&!l&&!n&&"mirror"!==r&&0!==s&&"inertia"!==o}(p),m=p.motionValue?.owner?.current;if(h)try{r=new nw({...p,element:m})}catch{r=new nv(p)}else r=new nv(p);r.finished.then(()=>{this.notifyFinished()}).catch(eF),this.pendingTimeline&&(this.stopTimeline=r.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=r}get finished(){return this._animation?this.animation.finished:this._finished}then(e,t){return this.finished.finally(e).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),ez=!0,eV(),eI(),ez=!1),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(e){this.animation.time=e}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(e){this.animation.speed=e}get startTime(){return this.animation.startTime}attachTimeline(e){return this._animation?this.stopTimeline=this.animation.attachTimeline(e):this.pendingTimeline=e,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}}let nA={type:"spring",stiffness:500,damping:25,restSpeed:10},nM={type:"keyframes",duration:.8},nj={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},nP=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]),nB=(e,t,i,n={},r,s)=>o=>{let a=iM(n,e)||{},d=a.delay||n.delay||0,{elapsed:c=0}=n;c-=eH(d);let u={keyframes:Array.isArray(i)?i:[null,i],ease:"easeOut",velocity:t.getVelocity(),...a,delay:-c,onUpdate:e=>{t.set(e),a.onUpdate&&a.onUpdate(e)},onComplete:()=>{o(),a.onComplete&&a.onComplete()},name:e,motionValue:t,element:s?void 0:r};!function(e){for(let t in e)if(!nP.has(t))return!0;return!1}(a)&&Object.assign(u,((e,{keyframes:t})=>t.length>2?nM:l.has(e)?e.startsWith("scale")?{type:"spring",stiffness:550,damping:0===t[1]?2*Math.sqrt(550):30,restSpeed:10}:nA:nj)(e,u)),u.duration&&(u.duration=eH(u.duration)),u.repeatDelay&&(u.repeatDelay=eH(u.repeatDelay)),void 0!==u.from&&(u.keyframes[0]=u.from);let p=!1;if(!1!==u.type&&(0!==u.duration||u.repeatDelay)||(nT(u),0===u.delay&&(p=!0)),(eC.instantAnimations||eC.skipAnimations||r?.shouldSkipAnimations)&&(p=!0,nT(u),u.delay=0),u.allowFlatten=!a.type&&!a.ease,p&&!s&&void 0!==t.get()){let e=e1(u.keyframes,a);if(void 0!==e)return void eM.update(()=>{u.onUpdate(e),u.onComplete()})}return a.isSync?new nv(u):new nk(u)};function nD(e,t,{delay:i=0,transitionOverride:n,type:r}={}){let{transition:s,transitionEnd:o,...a}=t,l=e.getDefaultTransition();s=s?iA(s,l):l;let d=s?.reduceMotion;n&&(s=n);let c=[],u=r&&e.animationState&&e.animationState.getState()[r];for(let t in a){let n=e.getValue(t,e.latestValues[t]??null),r=a[t];if(void 0===r||u&&function({protectedKeys:e,needsAnimating:t},i){let n=e.hasOwnProperty(i)&&!0!==t[i];return t[i]=!1,n}(u,t))continue;let o={delay:i,...iM(s||{},t)},l=n.get();if(void 0!==l&&!n.isAnimating()&&!Array.isArray(r)&&r===l&&!o.velocity){eM.update(()=>n.set(r));continue}let p=!1;if(window.MotionHandoffAnimation){let i=e.props[iw];if(i){let e=window.MotionHandoffAnimation(i,t,eM);null!==e&&(o.startTime=e,p=!0)}}iP(e,t);let h=d??e.shouldReduceMotion;n.start(nB(t,n,r,h&&Z.has(t)?{type:!1}:o,e,p));let m=n.animation;m&&c.push(m)}if(o){let t=()=>eM.update(()=>{o&&function(e,t){let{transitionEnd:i={},transition:n={},...r}=ik(e,t)||{};for(let t in r={...r,...i}){var s;let i=ij(s=r[t])?s[s.length-1]||0:s;e.hasValue(t)?e.getValue(t).set(i):e.addValue(t,tl(i))}}(e,o)});c.length?Promise.all(c).then(t):t()}return c}function nR(e,t,i,n=0,r=1){let s=Array.from(e).sort((e,t)=>e.sortNodePosition(t)).indexOf(t),o=e.size,a=(o-1)*n;return"function"==typeof i?i(s,o):1===r?s*n:a-s*n}function nL(e,t,i={}){let n=ik(e,t,"exit"===i.type?e.presenceContext?.custom:void 0),{transition:r=e.getDefaultTransition()||{}}=n||{};i.transitionOverride&&(r=i.transitionOverride);let s=n?()=>Promise.all(nD(e,n,i)):()=>Promise.resolve(),o=e.variantChildren&&e.variantChildren.size?(n=0)=>{let{delayChildren:s=0,staggerChildren:o,staggerDirection:a}=r;return function(e,t,i=0,n=0,r=0,s=1,o){let a=[];for(let l of e.variantChildren)l.notify("AnimationStart",t),a.push(nL(l,t,{...o,delay:i+("function"==typeof n?0:n)+nR(e.variantChildren,l,n,r,s)}).then(()=>l.notify("AnimationComplete",t)));return Promise.all(a)}(e,t,n,s,o,a,i)}:()=>Promise.resolve(),{when:a}=r;if(!a)return Promise.all([s(),o(i.delay)]);{let[e,t]="beforeChildren"===a?[s,o]:[o,s];return e().then(()=>t())}}let nz=tm.length;function nI(e,t){if(!Array.isArray(t))return!1;let i=t.length;if(i!==e.length)return!1;for(let n=0;n<i;n++)if(t[n]!==e[n])return!1;return!0}let nV=[...th].reverse(),nW=th.length;function nO(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function n$(){return{animate:nO(!0),whileInView:nO(),whileHover:nO(),whileTap:nO(),whileDrag:nO(),whileFocus:nO(),exit:nO()}}let nN=0;function nU(e){return[e("x"),e("y")]}function nH(e,t,i,n={passive:!0}){return e.addEventListener(t,i,n),()=>e.removeEventListener(t,i)}let nq={x:!1,y:!1};function nY(e){return e.max-e.min}function nX(e,t,i,n=.5){e.origin=n,e.originPoint=tO(t.min,t.max,e.origin),e.scale=nY(i)/nY(t),e.translate=tO(i.min,i.max,e.origin)-e.originPoint,(e.scale>=.9999&&e.scale<=1.0001||isNaN(e.scale))&&(e.scale=1),(e.translate>=-.01&&e.translate<=.01||isNaN(e.translate))&&(e.translate=0)}function nG(e,t,i,n){nX(e.x,t.x,i.x,n?n.originX:void 0),nX(e.y,t.y,i.y,n?n.originY:void 0)}function n_(e,t,i,n=0){e.min=(n?tO(i.min,i.max,n):i.min)+t.min,e.max=e.min+nY(t)}function nK(e,t,i,n=0){let r=n?tO(i.min,i.max,n):i.min;e.min=t.min-r,e.max=e.min+nY(t)}function nZ(e,t,i,n){nK(e.x,t.x,i.x,n?.x),nK(e.y,t.y,i.y,n?.y)}function nJ(e){return"object"==typeof e&&null!==e}function nQ(e){return nJ(e)&&"ownerSVGElement"in e}function n0(e,t,i){if(null==e)return[];if(e instanceof EventTarget)return[e];if("string"==typeof e){let n=document;t&&(n=t.current);let r=i?.[e]??n.querySelectorAll(e);return r?Array.from(r):[]}return Array.from(e).filter(e=>null!=e)}let n1=new WeakMap,n2=(e,t,i)=>(n,r)=>r&&r[0]?r[0][e+"Size"]:nQ(n)&&"getBBox"in n?n.getBBox()[t]:n[i],n5=n2("inline","width","offsetWidth"),n3=n2("block","height","offsetHeight");function n4({target:e,borderBoxSize:t}){n1.get(e)?.forEach(i=>{i(e,{get width(){return n5(e,t)},get height(){return n3(e,t)}})})}function n8(e){e.forEach(n4)}let n6=new Set;function n9(e,t){let r;return"function"==typeof e?(n6.add(e),n||(n=()=>{let e={get width(){return window.innerWidth},get height(){return window.innerHeight}};n6.forEach(t=>t(e))},window.addEventListener("resize",n)),()=>{n6.delete(e),n6.size||"function"!=typeof n||(window.removeEventListener("resize",n),n=void 0)}):(!i&&"u">typeof ResizeObserver&&(i=new ResizeObserver(n8)),(r=n0(e)).forEach(e=>{let n=n1.get(e);n||(n=new Set,n1.set(e,n)),n.add(t),i?.observe(e)}),()=>{r.forEach(e=>{let n=n1.get(e);n?.delete(t),n?.size||i?.unobserve(e)})})}let n7=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]),re=new Set(["INPUT","SELECT","TEXTAREA"]),rt=e=>"mouse"===e.pointerType?"number"!=typeof e.button||e.button<=0:!1!==e.isPrimary;function ri(e){return{point:{x:e.pageX,y:e.pageY}}}function rn(e,t,i,n){return nH(e,t,e=>rt(e)&&i(e,ri(e)),n)}let rr=({current:e})=>e?e.ownerDocument.defaultView:null,rs=(e,t)=>Math.abs(e-t),ro=new Set(["auto","scroll"]);class ra{constructor(e,t,{transformPagePoint:i,contextWindow:n=window,dragSnapToOrigin:r=!1,distanceThreshold:s=3,element:o}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=e=>{this.handleScroll(e.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{var e,t;if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=rl(this.lastRawMoveEventInfo,this.transformPagePoint));let i=rc(this.lastMoveEventInfo,this.history),n=null!==this.startEvent,r=(e=i.offset,t={x:0,y:0},Math.sqrt(rs(e.x,t.x)**2+rs(e.y,t.y)**2)>=this.distanceThreshold);if(!n&&!r)return;let{point:s}=i,{timestamp:o}=eP;this.history.push({...s,timestamp:o});let{onStart:a,onMove:l}=this.handlers;n||(a&&a(this.lastMoveEvent,i),this.startEvent=this.lastMoveEvent),l&&l(this.lastMoveEvent,i)},this.handlePointerMove=(e,t)=>{this.lastMoveEvent=e,this.lastRawMoveEventInfo=t,this.lastMoveEventInfo=rl(t,this.transformPagePoint),eM.update(this.updatePoint,!0)},this.handlePointerUp=(e,t)=>{this.end();let{onEnd:i,onSessionEnd:n,resumeAnimation:r}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&r&&r(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;let s=rc("pointercancel"===e.type?this.lastMoveEventInfo:rl(t,this.transformPagePoint),this.history);this.startEvent&&i&&i(e,s),n&&n(e,s)},!rt(e))return;this.dragSnapToOrigin=r,this.handlers=t,this.transformPagePoint=i,this.distanceThreshold=s,this.contextWindow=n||window;const a=rl(ri(e),this.transformPagePoint),{point:l}=a,{timestamp:d}=eP;this.history=[{...l,timestamp:d}];const{onSessionStart:c}=t;c&&c(e,rc(a,this.history)),this.removeListeners=iD(rn(this.contextWindow,"pointermove",this.handlePointerMove),rn(this.contextWindow,"pointerup",this.handlePointerUp),rn(this.contextWindow,"pointercancel",this.handlePointerUp)),o&&this.startScrollTracking(o)}startScrollTracking(e){let t=e.parentElement;for(;t;){let e=getComputedStyle(t);(ro.has(e.overflowX)||ro.has(e.overflowY))&&this.scrollPositions.set(t,{x:t.scrollLeft,y:t.scrollTop}),t=t.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(e){let t=this.scrollPositions.get(e);if(!t)return;let i=e===window,n=i?{x:window.scrollX,y:window.scrollY}:{x:e.scrollLeft,y:e.scrollTop},r={x:n.x-t.x,y:n.y-t.y};(0!==r.x||0!==r.y)&&(i?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=r.x,this.lastMoveEventInfo.point.y+=r.y):this.history.length>0&&(this.history[0].x-=r.x,this.history[0].y-=r.y),this.scrollPositions.set(e,n),eM.update(this.updatePoint,!0))}updateHandlers(e){this.handlers=e}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),ej(this.updatePoint)}}function rl(e,t){return t?{point:t(e.point)}:e}function rd(e,t){return{x:e.x-t.x,y:e.y-t.y}}function rc({point:e},t){return{point:e,delta:rd(e,ru(t)),offset:rd(e,t[0]),velocity:function(e){if(e.length<2)return{x:0,y:0};let t=e.length-1,i=null,n=ru(e);for(;t>=0&&(i=e[t],!(n.timestamp-i.timestamp>eH(.1)));)t--;if(!i)return{x:0,y:0};i===e[0]&&e.length>2&&n.timestamp-i.timestamp>2*eH(.1)&&(i=e[1]);let r=(n.timestamp-i.timestamp)/1e3;if(0===r)return{x:0,y:0};let s={x:(n.x-i.x)/r,y:(n.y-i.y)/r};return s.x===1/0&&(s.x=0),s.y===1/0&&(s.y=0),s}(t)}}function ru(e){return e[e.length-1]}function rp(e,t,i){return{min:void 0!==t?e.min+t:void 0,max:void 0!==i?e.max+i-(e.max-e.min):void 0}}function rh(e,t){let i=t.min-e.min,n=t.max-e.max;return t.max-t.min<e.max-e.min&&([i,n]=[n,i]),{min:i,max:n}}function rm(e,t,i){return{min:rf(e,t),max:rf(e,i)}}function rf(e,t){return"number"==typeof e?e:e[t]||0}let rg=new WeakMap;class rx{constructor(e){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=_(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=e}start(e,{snapToCursor:t=!1,distanceThreshold:i}={}){let{presenceContext:n}=this.visualElement;if(n&&!1===n.isPresent)return;let r=e=>{t&&this.snapToCursor(ri(e).point),this.stopAnimation()},s=(e,t)=>{let{drag:i,dragPropagation:n,onDragStart:r}=this.getProps();if(i&&!n&&(this.openDragLock&&this.openDragLock(),this.openDragLock=function(e){if("x"===e||"y"===e)if(nq[e])return null;else return nq[e]=!0,()=>{nq[e]=!1};return nq.x||nq.y?null:(nq.x=nq.y=!0,()=>{nq.x=nq.y=!1})}(i),!this.openDragLock))return;this.latestPointerEvent=e,this.latestPanInfo=t,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),nU(e=>{let t=this.getAxisMotionValue(e).get()||0;if(T.test(t)){let{projection:i}=this.visualElement;if(i&&i.layout){let n=i.layout.layoutBox[e];n&&(t=nY(n)*(parseFloat(t)/100))}}this.originPoint[e]=t}),r&&eM.update(()=>r(e,t),!1,!0),iP(this.visualElement,"transform");let{animationState:s}=this.visualElement;s&&s.setActive("whileDrag",!0)},o=(e,t)=>{this.latestPointerEvent=e,this.latestPanInfo=t;let{dragPropagation:i,dragDirectionLock:n,onDirectionLock:r,onDrag:s}=this.getProps();if(!i&&!this.openDragLock)return;let{offset:o}=t;if(n&&null===this.currentDirection){this.currentDirection=function(e,t=10){let i=null;return Math.abs(e.y)>t?i="y":Math.abs(e.x)>t&&(i="x"),i}(o),null!==this.currentDirection&&r&&r(this.currentDirection);return}this.updateAxis("x",t.point,o),this.updateAxis("y",t.point,o),this.visualElement.render(),s&&eM.update(()=>s(e,t),!1,!0)},a=(e,t)=>{this.latestPointerEvent=e,this.latestPanInfo=t,this.stop(e,t),this.latestPointerEvent=null,this.latestPanInfo=null},l=()=>{let{dragSnapToOrigin:e}=this.getProps();(e||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:d}=this.getProps();this.panSession=new ra(e,{onSessionStart:r,onStart:s,onMove:o,onSessionEnd:a,resumeAnimation:l},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:d,distanceThreshold:i,contextWindow:rr(this.visualElement),element:this.visualElement.current})}stop(e,t){let i=e||this.latestPointerEvent,n=t||this.latestPanInfo,r=this.isDragging;if(this.cancel(),!r||!n||!i)return;let{velocity:s}=n;this.startAnimation(s);let{onDragEnd:o}=this.getProps();o&&eM.postRender(()=>o(i,n))}cancel(){this.isDragging=!1;let{projection:e,animationState:t}=this.visualElement;e&&(e.isAnimationBlocked=!1),this.endPanSession();let{dragPropagation:i}=this.getProps();!i&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),t&&t.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(e,t,i){let{drag:n}=this.getProps();if(!i||!rv(e,n,this.currentDirection))return;let r=this.getAxisMotionValue(e),s=this.originPoint[e]+i[e];this.constraints&&this.constraints[e]&&(s=function(e,{min:t,max:i},n){return void 0!==t&&e<t?e=n?tO(t,e,n.min):Math.max(e,t):void 0!==i&&e>i&&(e=n?tO(i,e,n.max):Math.min(e,i)),e}(s,this.constraints[e],this.elastic[e])),r.set(s)}resolveConstraints(){let{dragConstraints:e,dragElastic:t}=this.getProps(),i=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):this.visualElement.projection?.layout,n=this.constraints;e&&iT(e)?this.constraints||(this.constraints=this.resolveRefConstraints()):e&&i?this.constraints=function(e,{top:t,left:i,bottom:n,right:r}){return{x:rp(e.x,i,r),y:rp(e.y,t,n)}}(i.layoutBox,e):this.constraints=!1,this.elastic=function(e=.35){return!1===e?e=0:!0===e&&(e=.35),{x:rm(e,"left","right"),y:rm(e,"top","bottom")}}(t),n!==this.constraints&&!iT(e)&&i&&this.constraints&&!this.hasMutatedConstraints&&nU(e=>{var t,n;let r;!1!==this.constraints&&this.getAxisMotionValue(e)&&(this.constraints[e]=(t=i.layoutBox[e],n=this.constraints[e],r={},void 0!==n.min&&(r.min=n.min-t.min),void 0!==n.max&&(r.max=n.max-t.min),r))})}resolveRefConstraints(){var e;let{dragConstraints:t,onMeasureDragConstraints:i}=this.getProps();if(!t||!iT(t))return!1;let n=t.current;en(null!==n,"If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.","drag-constraints-ref");let{projection:r}=this.visualElement;if(!r||!r.layout)return!1;let s=function(e,t,i){let n=t3(e,i),{scroll:r}=t;return r&&(t0(n.x,r.offset.x),t0(n.y,r.offset.y)),n}(n,r.root,this.visualElement.getTransformPagePoint()),o=(e=r.layout.layoutBox,{x:rh(e.x,s.x),y:rh(e.y,s.y)});if(i){let e=i(function({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}(o));this.hasMutatedConstraints=!!e,e&&(o=tY(e))}return o}startAnimation(e){let{drag:t,dragMomentum:i,dragElastic:n,dragTransition:r,dragSnapToOrigin:s,onDragTransitionEnd:o}=this.getProps(),a=this.constraints||{};return Promise.all(nU(o=>{if(!rv(o,t,this.currentDirection))return;let l=a&&a[o]||{};(!0===s||s===o)&&(l={min:0,max:0});let d={type:"inertia",velocity:i?e[o]:0,bounceStiffness:n?200:1e6,bounceDamping:n?40:1e7,timeConstant:750,restDelta:1,restSpeed:10,...r,...l};return this.startAxisValueAnimation(o,d)})).then(o)}startAxisValueAnimation(e,t){let i=this.getAxisMotionValue(e);return iP(this.visualElement,e),i.start(nB(e,i,0,t,this.visualElement,!1))}stopAnimation(){nU(e=>this.getAxisMotionValue(e).stop())}getAxisMotionValue(e){let t=`_drag${e.toUpperCase()}`,i=this.visualElement.getProps();return i[t]||this.visualElement.getValue(e,(i.initial?i.initial[e]:void 0)||0)}snapToCursor(e){nU(t=>{let{drag:i}=this.getProps();if(!rv(t,i,this.currentDirection))return;let{projection:n}=this.visualElement,r=this.getAxisMotionValue(t);if(n&&n.layout){let{min:i,max:s}=n.layout.layoutBox[t],o=r.get()||0;r.set(e[t]-tO(i,s,.5)+o)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;let{drag:e,dragConstraints:t}=this.getProps(),{projection:i}=this.visualElement;if(!iT(t)||!i||!this.constraints)return;this.stopAnimation();let n={x:0,y:0};nU(e=>{let t=this.getAxisMotionValue(e);if(t&&!1!==this.constraints){var i,r;let s,o,a,l=t.get();n[e]=(i={min:l,max:l},r=this.constraints[e],s=.5,o=nY(i),(a=nY(r))>o?s=np(r.min,r.max-o,i.min):o>a&&(s=np(i.min,i.max-a,r.min)),d(0,1,s))}});let{transformTemplate:r}=this.visualElement.getProps();this.visualElement.current.style.transform=r?r({},""):"none",i.root&&i.root.updateScroll(),i.updateLayout(),this.constraints=!1,this.resolveConstraints(),nU(t=>{if(!rv(t,e,null))return;let i=this.getAxisMotionValue(t),{min:r,max:s}=this.constraints[t];i.set(tO(r,s,n[t]))}),this.visualElement.render()}addListeners(){let e;if(!this.visualElement.current)return;rg.set(this.visualElement,this);let t=this.visualElement.current,i=rn(t,"pointerdown",e=>{let{drag:i,dragListener:n=!0}=this.getProps(),r=e.target,s=r!==t&&(re.has(r.tagName)||!0===r.isContentEditable);i&&n&&!s&&this.start(e)}),n=()=>{var i,n,r;let s,o,{dragConstraints:a}=this.getProps();iT(a)&&a.current&&(this.constraints=this.resolveRefConstraints(),e||(i=t,n=a.current,s=n9(i,ry(r=()=>this.scalePositionWithinConstraints())),o=n9(n,ry(r)),e=()=>{s(),o()}))},{projection:r}=this.visualElement,s=r.addEventListener("measure",n);r&&!r.layout&&(r.root&&r.root.updateScroll(),r.updateLayout()),eM.read(n);let o=nH(window,"resize",()=>this.scalePositionWithinConstraints()),a=r.addEventListener("didUpdate",({delta:e,hasLayoutChanged:t})=>{this.isDragging&&t&&(nU(t=>{let i=this.getAxisMotionValue(t);i&&(this.originPoint[t]+=e[t].translate,i.set(i.get()+e[t].translate))}),this.visualElement.render())});return()=>{o(),i(),s(),a&&a(),e&&e()}}getProps(){let e=this.visualElement.getProps(),{drag:t=!1,dragDirectionLock:i=!1,dragPropagation:n=!1,dragConstraints:r=!1,dragElastic:s=.35,dragMomentum:o=!0}=e;return{...e,drag:t,dragDirectionLock:i,dragPropagation:n,dragConstraints:r,dragElastic:s,dragMomentum:o}}}function ry(e){let t=!0;return()=>{if(t){t=!1;return}e()}}function rv(e,t,i){return(!0===t||t===e)&&(null===i||i===e)}let rb=e=>(t,i)=>{e&&eM.update(()=>e(t,i),!1,!0)},rw={hasAnimatedSinceResize:!0,hasEverUpdated:!1};var rS=o;function rT(e=!0){let t=(0,o.useContext)(iu);if(null===t)return[!0,null];let{isPresent:i,onExitComplete:n,register:r}=t,s=(0,o.useId)();(0,o.useEffect)(()=>{if(e)return r(s)},[e]);let a=(0,o.useCallback)(()=>e&&n&&n(s),[s,n,e]);return!i&&n?[!1,a]:[!0]}let rE=!1;class rF extends rS.Component{componentDidMount(){let{visualElement:e,layoutGroup:t,switchLayoutGroup:i,layoutId:n}=this.props,{projection:r}=e;r&&(t.group&&t.group.add(r),i&&i.register&&n&&i.register(r),rE&&r.root.didUpdate(),r.addEventListener("animationComplete",()=>{this.safeToRemove()}),r.setOptions({...r.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),rw.hasEverUpdated=!0}getSnapshotBeforeUpdate(e){let{layoutDependency:t,visualElement:i,drag:n,isPresent:r}=this.props,{projection:s}=i;return s&&(s.isPresent=r,e.layoutDependency!==t&&s.setOptions({...s.options,layoutDependency:t}),rE=!0,n||e.layoutDependency!==t||void 0===t||e.isPresent!==r?s.willUpdate():this.safeToRemove(),e.isPresent!==r&&(r?s.promote():s.relegate()||eM.postRender(()=>{let e=s.getStack();e&&e.members.length||this.safeToRemove()}))),null}componentDidUpdate(){let{visualElement:e,layoutAnchor:t}=this.props,{projection:i}=e;i&&(i.options.layoutAnchor=t,i.root.didUpdate(),ti.postRender(()=>{!i.currentAnimation&&i.isLead()&&this.safeToRemove()}))}componentWillUnmount(){let{visualElement:e,layoutGroup:t,switchLayoutGroup:i}=this.props,{projection:n}=e;rE=!0,n&&(n.scheduleCheckAfterUnmount(),t&&t.group&&t.group.remove(n),i&&i.deregister&&i.deregister(n))}safeToRemove(){let{safeToRemove:e}=this.props;e&&e()}render(){return null}}function rC(e){let[t,i]=rT(),n=(0,rS.useContext)(t9);return(0,s.jsx)(rF,{...e,layoutGroup:n,switchLayoutGroup:(0,rS.useContext)(iS),isPresent:t,safeToRemove:i})}let rk=["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"],rA=rk.length,rM=e=>"string"==typeof e?parseFloat(e):e,rj=e=>"number"==typeof e||E.test(e);function rP(e,t){return void 0!==e[t]?e[t]:e.borderRadius}let rB=rR(0,.5,nl),rD=rR(.5,.95,eF);function rR(e,t,i){return n=>n<e?0:n>t?1:i(np(e,t,n))}function rL(e,t){e.min=t.min,e.max=t.max}function rz(e,t){rL(e.x,t.x),rL(e.y,t.y)}function rI(e,t){e.translate=t.translate,e.scale=t.scale,e.originPoint=t.originPoint,e.origin=t.origin}function rV(e,t,i,n,r){return e-=t,e=n+1/i*(e-n),void 0!==r&&(e=n+1/r*(e-n)),e}function rW(e,t,[i,n,r],s,o){!function(e,t=0,i=1,n=.5,r,s=e,o=e){if(T.test(t)&&(t=parseFloat(t),t=tO(o.min,o.max,t/100)-o.min),"number"!=typeof t)return;let a=tO(s.min,s.max,n);e===s&&(a-=t),e.min=rV(e.min,t,i,a,r),e.max=rV(e.max,t,i,a,r)}(e,t[i],t[n],t[r],t.scale,s,o)}let rO=["x","scaleX","originX"],r$=["y","scaleY","originY"];function rN(e,t,i,n){rW(e.x,t,rO,i?i.x:void 0,n?n.x:void 0),rW(e.y,t,r$,i?i.y:void 0,n?n.y:void 0)}function rU(e){return 0===e.translate&&1===e.scale}function rH(e){return rU(e.x)&&rU(e.y)}function rq(e,t){return e.min===t.min&&e.max===t.max}function rY(e,t){return Math.round(e.min)===Math.round(t.min)&&Math.round(e.max)===Math.round(t.max)}function rX(e,t){return rY(e.x,t.x)&&rY(e.y,t.y)}function rG(e){return nY(e.x)/nY(e.y)}function r_(e,t){return e.translate===t.translate&&e.scale===t.scale&&e.originPoint===t.originPoint}class rK{constructor(){this.members=[]}add(e){eq(this.members,e);for(let t=this.members.length-1;t>=0;t--){let i=this.members[t];if(i===e||i===this.lead||i===this.prevLead)continue;let n=i.instance;n&&!1!==n.isConnected||i.snapshot||(eY(this.members,i),i.unmount())}e.scheduleRender()}remove(e){if(eY(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){let e=this.members[this.members.length-1];e&&this.promote(e)}}relegate(e){for(let t=this.members.indexOf(e)-1;t>=0;t--){let e=this.members[t];if(!1!==e.isPresent&&e.instance?.isConnected!==!1)return this.promote(e),!0}return!1}promote(e,t){let i=this.lead;if(e!==i&&(this.prevLead=i,this.lead=e,e.show(),i)){i.updateSnapshot(),e.scheduleRender();let{layoutDependency:n}=i.options,{layoutDependency:r}=e.options;(void 0===n||n!==r)&&(e.resumeFrom=i,t&&(i.preserveOpacity=!0),i.snapshot&&(e.snapshot=i.snapshot,e.snapshot.latestValues=i.animationValues||i.latestValues),e.root?.isUpdating&&(e.isLayoutDirty=!0)),!1===e.options.crossfade&&i.hide()}}exitAnimationComplete(){this.members.forEach(e=>{e.options.onExitComplete?.(),e.resumingFrom?.options.onExitComplete?.()})}scheduleRender(){this.members.forEach(e=>e.instance&&e.scheduleRender(!1))}removeLeadSnapshot(){this.lead?.snapshot&&(this.lead.snapshot=void 0)}}let rZ=(e,t)=>e.depth-t.depth;class rJ{constructor(){this.children=[],this.isDirty=!1}add(e){eq(this.children,e),this.isDirty=!0}remove(e){eY(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(rZ),this.isDirty=!1,this.children.forEach(e)}}let rQ=["","X","Y","Z"],r0=0;function r1(e,t,i,n){let{latestValues:r}=t;r[e]&&(i[e]=r[e],t.setStaticValue(e,0),n&&(n[e]=0))}function r2({attachResizeListener:e,defaultParent:t,measureScroll:i,checkIsScrollRoot:n,resetTransform:r}){return class{constructor(e={},i=t?.()){this.id=r0++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(r4),this.nodes.forEach(sr),this.nodes.forEach(ss),this.nodes.forEach(r8)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=e,this.root=i?i.root||i:this,this.path=i?[...i.path,i]:[],this.parent=i,this.depth=i?i.depth+1:0;for(let e=0;e<this.path.length;e++)this.path[e].shouldResetTransform=!0;this.root===this&&(this.nodes=new rJ)}addEventListener(e,t){return this.eventHandlers.has(e)||this.eventHandlers.set(e,new eX),this.eventHandlers.get(e).add(t)}notifyListeners(e,...t){let i=this.eventHandlers.get(e);i&&i.notify(...t)}hasListeners(e){return this.eventHandlers.has(e)}mount(t){if(this.instance)return;this.isSVG=nQ(t)&&!(nQ(t)&&"svg"===t.tagName),this.instance=t;let{layoutId:i,layout:n,visualElement:r}=this.options;if(r&&!r.current&&r.mount(t),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(n||i)&&(this.isLayoutDirty=!0),e){let i,n=0,r=()=>this.root.updateBlockedByResize=!1;eM.read(()=>{n=window.innerWidth}),e(t,()=>{let e=window.innerWidth;if(e!==n){let t,s;n=e,this.root.updateBlockedByResize=!0,i&&i(),t=tr.now(),s=({timestamp:e})=>{let i=e-t;i>=250&&(ej(s),r(i-250))},eM.setup(s,!0),i=()=>ej(s),rw.hasAnimatedSinceResize&&(rw.hasAnimatedSinceResize=!1,this.nodes.forEach(sn))}})}i&&this.root.registerSharedNode(i,this),!1!==this.options.animate&&r&&(i||n)&&this.addEventListener("didUpdate",({delta:e,hasLayoutChanged:t,hasRelativeLayoutChanged:i,layout:n})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}let s=this.options.transition||r.getDefaultTransition()||su,{onLayoutAnimationStart:o,onLayoutAnimationComplete:a}=r.getProps(),l=!this.targetLayout||!rX(this.targetLayout,n),d=!t&&i;if(this.options.layoutRoot||this.resumeFrom||d||t&&(l||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);let t={...iM(s,"layout"),onPlay:o,onComplete:a};(r.shouldReduceMotion||this.options.layoutRoot)&&(t.delay=0,t.type=!1),this.startAnimation(t),this.setAnimationOrigin(e,d)}else t||sn(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=n})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);let e=this.getStack();e&&e.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),ej(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){!this.isUpdateBlocked()&&(this.isUpdating=!0,this.nodes&&this.nodes.forEach(so),this.animationId++)}getTransformTemplate(){let{visualElement:e}=this.options;return e&&e.getProps().transformTemplate}willUpdate(e=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&function e(t){if(t.hasCheckedOptimisedAppear=!0,t.root===t)return;let{visualElement:i}=t.options;if(!i)return;let n=i.props[iw];if(window.MotionHasOptimisedAnimation(n,"transform")){let{layout:e,layoutId:i}=t.options;window.MotionCancelOptimisedAnimation(n,"transform",eM,!(e||i))}let{parent:r}=t;r&&!r.hasCheckedOptimisedAppear&&e(r)}(this),this.root.isUpdating||this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let e=0;e<this.path.length;e++){let t=this.path[e];t.shouldResetTransform=!0,("string"==typeof t.latestValues.x||"string"==typeof t.latestValues.y)&&(t.isLayoutDirty=!0),t.updateScroll("snapshot"),t.options.layoutRoot&&t.willUpdate(!1)}let{layoutId:t,layout:i}=this.options;if(void 0===t&&!i)return;let n=this.getTransformTemplate();this.prevTransformTemplateValue=n?n(this.latestValues,""):void 0,this.updateSnapshot(),e&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){let e=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),e&&this.nodes.forEach(r7),this.nodes.forEach(r9);return}if(this.animationId<=this.animationCommitId)return void this.nodes.forEach(se);this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(st),this.nodes.forEach(si),this.nodes.forEach(r5),this.nodes.forEach(r3)):this.nodes.forEach(se),this.clearAllSnapshots();let e=tr.now();eP.delta=d(0,1e3/60,e-eP.timestamp),eP.timestamp=e,eP.isProcessing=!0,eB.update.process(eP),eB.preRender.process(eP),eB.render.process(eP),eP.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,ti.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(r6),this.sharedNodes.forEach(sa)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,eM.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){eM.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){!this.snapshot&&this.instance&&(this.snapshot=this.measure(),!this.snapshot||nY(this.snapshot.measuredBox.x)||nY(this.snapshot.measuredBox.y)||(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let e=0;e<this.path.length;e++)this.path[e].updateScroll();let e=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=_()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);let{visualElement:t}=this.options;t&&t.notify("LayoutMeasure",this.layout.layoutBox,e?e.layoutBox:void 0)}updateScroll(e="measure"){let t=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===e&&(t=!1),t&&this.instance){let t=n(this.instance);this.scroll={animationId:this.root.animationId,phase:e,isRoot:t,offset:i(this.instance),wasRoot:this.scroll?this.scroll.isRoot:t}}}resetTransform(){if(!r)return;let e=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,t=this.projectionDelta&&!rH(this.projectionDelta),i=this.getTransformTemplate(),n=i?i(this.latestValues,""):void 0,s=n!==this.prevTransformTemplateValue;e&&this.instance&&(t||t_(this.latestValues)||s)&&(r(this.instance,n),this.shouldResetTransform=!1,this.scheduleRender())}measure(e=!0){var t;let i=this.measurePageBox(),n=this.removeElementScroll(i);return e&&(n=this.removeTransform(n)),sm((t=n).x),sm(t.y),{animationId:this.root.animationId,measuredBox:i,layoutBox:n,latestValues:{},source:this.id}}measurePageBox(){let{visualElement:e}=this.options;if(!e)return _();let t=e.measureViewportBox();if(!(this.scroll?.wasRoot||this.path.some(sg))){let{scroll:e}=this.root;e&&(t0(t.x,e.offset.x),t0(t.y,e.offset.y))}return t}removeElementScroll(e){let t=_();if(rz(t,e),this.scroll?.wasRoot)return t;for(let i=0;i<this.path.length;i++){let n=this.path[i],{scroll:r,options:s}=n;n!==this.root&&r&&s.layoutScroll&&(r.wasRoot&&rz(t,e),t0(t.x,r.offset.x),t0(t.y,r.offset.y))}return t}applyTransform(e,t=!1,i){let n=i||_();rz(n,e);for(let e=0;e<this.path.length;e++){let i=this.path[e];!t&&i.options.layoutScroll&&i.scroll&&i!==i.root&&(t0(n.x,-i.scroll.offset.x),t0(n.y,-i.scroll.offset.y)),t_(i.latestValues)&&t5(n,i.latestValues,i.layout?.layoutBox)}return t_(this.latestValues)&&t5(n,this.latestValues,this.layout?.layoutBox),n}removeTransform(e){let t=_();rz(t,e);for(let e=0;e<this.path.length;e++){let i,n=this.path[e];t_(n.latestValues)&&(n.instance&&(tG(n.latestValues)&&n.updateSnapshot(),rz(i=_(),n.measurePageBox())),rN(t,n.latestValues,n.snapshot?.layoutBox,i))}return t_(this.latestValues)&&rN(t,this.latestValues),t}setTargetDelta(e){this.targetDelta=e,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(e){this.options={...this.options,...e,crossfade:void 0===e.crossfade||e.crossfade}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==eP.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(e=!1){let t=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=t.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=t.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=t.isSharedProjectionDirty);let i=!!this.resumingFrom||this!==t;if(!(e||i&&this.isSharedProjectionDirty||this.isProjectionDirty||this.parent?.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;let{layout:n,layoutId:r}=this.options;if(!this.layout||!(n||r))return;this.resolvedRelativeTargetAt=eP.timestamp;let s=this.getClosestProjectingParent();if(s&&this.linkedParentVersion!==s.layoutVersion&&!s.options.layoutRoot&&this.removeRelativeTarget(),this.targetDelta||this.relativeTarget||(!1!==this.options.layoutAnchor&&s&&s.layout?this.createRelativeTarget(s,this.layout.layoutBox,s.layout.layoutBox):this.removeRelativeTarget()),this.relativeTarget||this.targetDelta){if(this.target||(this.target=_(),this.targetWithTransforms=_()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target){var o,a,l,d;this.forceRelativeParentToResolveTarget(),o=this.target,a=this.relativeTarget,l=this.relativeParent.target,d=this.options.layoutAnchor||void 0,n_(o.x,a.x,l.x,d?.x),n_(o.y,a.y,l.y,d?.y)}else this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):rz(this.target,this.layout.layoutBox),tQ(this.target,this.targetDelta)):rz(this.target,this.layout.layoutBox);this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,!1!==this.options.layoutAnchor&&s&&!!s.resumingFrom==!!this.resumingFrom&&!s.options.layoutScroll&&s.target&&1!==this.animationProgress?this.createRelativeTarget(s,this.target,s.target):this.relativeParent=this.relativeTarget=void 0)}}getClosestProjectingParent(){if(!(!this.parent||tG(this.parent.latestValues)||tK(this.parent.latestValues)))if(this.parent.isProjecting())return this.parent;else return this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(e,t,i){this.relativeParent=e,this.linkedParentVersion=e.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=_(),this.relativeTargetOrigin=_(),nZ(this.relativeTargetOrigin,t,i,this.options.layoutAnchor||void 0),rz(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){let e=this.getLead(),t=!!this.resumingFrom||this!==e,i=!0;if((this.isProjectionDirty||this.parent?.isProjectionDirty)&&(i=!1),t&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(i=!1),this.resolvedRelativeTargetAt===eP.timestamp&&(i=!1),i)return;let{layout:n,layoutId:r}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(n||r))return;rz(this.layoutCorrected,this.layout.layoutBox);let s=this.treeScale.x,o=this.treeScale.y;!function(e,t,i,n=!1){let r,s,o=i.length;if(o){t.x=t.y=1;for(let a=0;a<o;a++){s=(r=i[a]).projectionDelta;let{visualElement:o}=r.options;(!o||!o.props.style||"contents"!==o.props.style.display)&&(n&&r.options.layoutScroll&&r.scroll&&r!==r.root&&(t0(e.x,-r.scroll.offset.x),t0(e.y,-r.scroll.offset.y)),s&&(t.x*=s.x.scale,t.y*=s.y.scale,tQ(e,s)),n&&t_(r.latestValues)&&t5(e,r.latestValues,r.layout?.layoutBox))}t.x<1.0000000000001&&t.x>.999999999999&&(t.x=1),t.y<1.0000000000001&&t.y>.999999999999&&(t.y=1)}}(this.layoutCorrected,this.treeScale,this.path,t),e.layout&&!e.target&&(1!==this.treeScale.x||1!==this.treeScale.y)&&(e.target=e.layout.layoutBox,e.targetWithTransforms=_());let{target:a}=e;if(!a){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}this.projectionDelta&&this.prevProjectionDelta?(rI(this.prevProjectionDelta.x,this.projectionDelta.x),rI(this.prevProjectionDelta.y,this.projectionDelta.y)):this.createProjectionDeltas(),nG(this.projectionDelta,this.layoutCorrected,a,this.latestValues),this.treeScale.x===s&&this.treeScale.y===o&&r_(this.projectionDelta.x,this.prevProjectionDelta.x)&&r_(this.projectionDelta.y,this.prevProjectionDelta.y)||(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",a))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(e=!0){if(this.options.visualElement?.scheduleRender(),e){let e=this.getStack();e&&e.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=X(),this.projectionDelta=X(),this.projectionDeltaWithTransform=X()}setAnimationOrigin(e,t=!1){let i,n=this.snapshot,r=n?n.latestValues:{},s={...this.latestValues},o=X();this.relativeParent&&this.relativeParent.options.layoutRoot||(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!t;let a=_(),l=(n?n.source:void 0)!==(this.layout?this.layout.source:void 0),d=this.getStack(),c=!d||d.members.length<=1,u=!!(l&&!c&&!0===this.options.crossfade&&!this.path.some(sc));this.animationProgress=0,this.mixTargetDelta=t=>{let n=t/1e3;if(sl(o.x,e.x,n),sl(o.y,e.y,n),this.setTargetDelta(o),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout){var d,p,h,m,f,g;nZ(a,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),h=this.relativeTarget,m=this.relativeTargetOrigin,f=a,g=n,sd(h.x,m.x,f.x,g),sd(h.y,m.y,f.y,g),i&&(d=this.relativeTarget,p=i,rq(d.x,p.x)&&rq(d.y,p.y))&&(this.isProjectionDirty=!1),i||(i=_()),rz(i,this.relativeTarget)}l&&(this.animationValues=s,function(e,t,i,n,r,s){r?(e.opacity=tO(0,i.opacity??1,rB(n)),e.opacityExit=tO(t.opacity??1,0,rD(n))):s&&(e.opacity=tO(t.opacity??1,i.opacity??1,n));for(let r=0;r<rA;r++){let s=rk[r],o=rP(t,s),a=rP(i,s);(void 0!==o||void 0!==a)&&(o||(o=0),a||(a=0),0===o||0===a||rj(o)===rj(a)?(e[s]=Math.max(tO(rM(o),rM(a),n),0),(T.test(a)||T.test(o))&&(e[s]+="%")):e[s]=a)}(t.rotate||i.rotate)&&(e.rotate=tO(t.rotate||0,i.rotate||0,n))}(s,r,this.latestValues,n,u,c)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=n},this.mixTargetDelta(1e3*!!this.options.layoutRoot)}startAnimation(e){this.notifyListeners("animationStart"),this.currentAnimation?.stop(),this.resumingFrom?.currentAnimation?.stop(),this.pendingAnimation&&(ej(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=eM.update(()=>{var t,i,n;let r;rw.hasAnimatedSinceResize=!0,e5.layout++,this.motionValue||(this.motionValue=tl(0)),this.motionValue.jump(0,!1),this.currentAnimation=(t=this.motionValue,i=[0,1e3],n={...e,velocity:0,isSync:!0,onUpdate:t=>{this.mixTargetDelta(t),e.onUpdate&&e.onUpdate(t)},onStop:()=>{e5.layout--},onComplete:()=>{e5.layout--,e.onComplete&&e.onComplete(),this.completeAnimation()}},(r=K(t)?t:tl(t)).start(nB("",r,i,n)),r.animation),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);let e=this.getStack();e&&e.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(1e3),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){let e=this.getLead(),{targetWithTransforms:t,target:i,layout:n,latestValues:r}=e;if(t&&i&&n){if(this!==e&&this.layout&&n&&sf(this.options.animationType,this.layout.layoutBox,n.layoutBox)){i=this.target||_();let t=nY(this.layout.layoutBox.x);i.x.min=e.target.x.min,i.x.max=i.x.min+t;let n=nY(this.layout.layoutBox.y);i.y.min=e.target.y.min,i.y.max=i.y.min+n}rz(t,i),t5(t,r),nG(this.projectionDeltaWithTransform,this.layoutCorrected,t,r)}}registerSharedNode(e,t){this.sharedNodes.has(e)||this.sharedNodes.set(e,new rK),this.sharedNodes.get(e).add(t);let i=t.options.initialPromotionConfig;t.promote({transition:i?i.transition:void 0,preserveFollowOpacity:i&&i.shouldPreserveFollowOpacity?i.shouldPreserveFollowOpacity(t):void 0})}isLead(){let e=this.getStack();return!e||e.lead===this}getLead(){let{layoutId:e}=this.options;return e&&this.getStack()?.lead||this}getPrevLead(){let{layoutId:e}=this.options;return e?this.getStack()?.prevLead:void 0}getStack(){let{layoutId:e}=this.options;if(e)return this.root.sharedNodes.get(e)}promote({needsReset:e,transition:t,preserveFollowOpacity:i}={}){let n=this.getStack();n&&n.promote(this,i),e&&(this.projectionDelta=void 0,this.needsReset=!0),t&&this.setOptions({transition:t})}relegate(){let e=this.getStack();return!!e&&e.relegate(this)}resetSkewAndRotation(){let{visualElement:e}=this.options;if(!e)return;let t=!1,{latestValues:i}=e;if((i.z||i.rotate||i.rotateX||i.rotateY||i.rotateZ||i.skewX||i.skewY)&&(t=!0),!t)return;let n={};i.z&&r1("z",e,n,this.animationValues);for(let t=0;t<rQ.length;t++)r1(`rotate${rQ[t]}`,e,n,this.animationValues),r1(`skew${rQ[t]}`,e,n,this.animationValues);for(let t in e.render(),n)e.setStaticValue(t,n[t]),this.animationValues&&(this.animationValues[t]=n[t]);e.scheduleRender()}applyProjectionStyles(e,t){if(!this.instance||this.isSVG)return;if(!this.isVisible){e.visibility="hidden";return}let i=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,e.visibility="",e.opacity="",e.pointerEvents=ic(t?.pointerEvents)||"",e.transform=i?i(this.latestValues,""):"none";return}let n=this.getLead();if(!this.projectionDelta||!this.layout||!n.target){this.options.layoutId&&(e.opacity=void 0!==this.latestValues.opacity?this.latestValues.opacity:1,e.pointerEvents=ic(t?.pointerEvents)||""),this.hasProjected&&!t_(this.latestValues)&&(e.transform=i?i({},""):"none",this.hasProjected=!1);return}e.visibility="";let r=n.animationValues||n.latestValues;this.applyTransformsToTarget();let s=function(e,t,i){let n="",r=e.x.translate/t.x,s=e.y.translate/t.y,o=i?.z||0;if((r||s||o)&&(n=`translate3d(${r}px, ${s}px, ${o}px) `),(1!==t.x||1!==t.y)&&(n+=`scale(${1/t.x}, ${1/t.y}) `),i){let{transformPerspective:e,rotate:t,rotateX:r,rotateY:s,skewX:o,skewY:a}=i;e&&(n=`perspective(${e}px) ${n}`),t&&(n+=`rotate(${t}deg) `),r&&(n+=`rotateX(${r}deg) `),s&&(n+=`rotateY(${s}deg) `),o&&(n+=`skewX(${o}deg) `),a&&(n+=`skewY(${a}deg) `)}let a=e.x.scale*t.x,l=e.y.scale*t.y;return(1!==a||1!==l)&&(n+=`scale(${a}, ${l})`),n||"none"}(this.projectionDeltaWithTransform,this.treeScale,r);i&&(s=i(r,s)),e.transform=s;let{x:o,y:a}=this.projectionDelta;for(let t in e.transformOrigin=`${100*o.origin}% ${100*a.origin}% 0`,n.animationValues?e.opacity=n===this?r.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:r.opacityExit:e.opacity=n===this?void 0!==r.opacity?r.opacity:"":void 0!==r.opacityExit?r.opacityExit:0,t$){if(void 0===r[t])continue;let{correct:i,applyTo:o,isCSSVariable:a}=t$[t],l="none"===s?r[t]:i(r[t],n);if(o){let t=o.length;for(let i=0;i<t;i++)e[o[i]]=l}else a?this.options.visualElement.renderState.vars[t]=l:e[t]=l}this.options.layoutId&&(e.pointerEvents=n===this?ic(t?.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(e=>e.currentAnimation?.stop()),this.root.nodes.forEach(r9),this.root.sharedNodes.clear()}}}function r5(e){e.updateLayout()}function r3(e){let t=e.resumeFrom?.snapshot||e.snapshot;if(e.isLead()&&e.layout&&t&&e.hasListeners("didUpdate")){let{layoutBox:i,measuredBox:n}=e.layout,{animationType:r}=e.options,s=t.source!==e.layout.source;if("size"===r)nU(e=>{let n=s?t.measuredBox[e]:t.layoutBox[e],r=nY(n);n.min=i[e].min,n.max=n.min+r});else if("x"===r||"y"===r){let e="x"===r?"y":"x";rL(s?t.measuredBox[e]:t.layoutBox[e],i[e])}else sf(r,t.layoutBox,i)&&nU(n=>{let r=s?t.measuredBox[n]:t.layoutBox[n],o=nY(i[n]);r.max=r.min+o,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[n].max=e.relativeTarget[n].min+o)});let o=X();nG(o,i,t.layoutBox);let a=X();s?nG(a,e.applyTransform(n,!0),t.measuredBox):nG(a,i,t.layoutBox);let l=!rH(o),d=!1;if(!e.resumeFrom){let n=e.getClosestProjectingParent();if(n&&!n.resumeFrom){let{snapshot:r,layout:s}=n;if(r&&s){let o=e.options.layoutAnchor||void 0,a=_();nZ(a,t.layoutBox,r.layoutBox,o);let l=_();nZ(l,i,s.layoutBox,o),rX(a,l)||(d=!0),n.options.layoutRoot&&(e.relativeTarget=l,e.relativeTargetOrigin=a,e.relativeParent=n)}}}e.notifyListeners("didUpdate",{layout:i,snapshot:t,delta:a,layoutDelta:o,hasLayoutChanged:l,hasRelativeLayoutChanged:d})}else if(e.isLead()){let{onExitComplete:t}=e.options;t&&t()}e.options.transition=void 0}function r4(e){e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function r8(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function r6(e){e.clearSnapshot()}function r9(e){e.clearMeasurements()}function r7(e){e.isLayoutDirty=!0,e.updateLayout()}function se(e){e.isLayoutDirty=!1}function st(e){e.isAnimationBlocked&&e.layout&&!e.isLayoutDirty&&(e.snapshot=e.layout,e.isLayoutDirty=!0)}function si(e){let{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify("BeforeLayoutMeasure"),e.resetTransform()}function sn(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function sr(e){e.resolveTargetDelta()}function ss(e){e.calcProjection()}function so(e){e.resetSkewAndRotation()}function sa(e){e.removeLeadSnapshot()}function sl(e,t,i){e.translate=tO(t.translate,0,i),e.scale=tO(t.scale,1,i),e.origin=t.origin,e.originPoint=t.originPoint}function sd(e,t,i,n){e.min=tO(t.min,i.min,n),e.max=tO(t.max,i.max,n)}function sc(e){return e.animationValues&&void 0!==e.animationValues.opacityExit}let su={duration:.45,ease:[.4,0,.1,1]},sp=e=>"u">typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(e),sh=sp("applewebkit/")&&!sp("chrome/")?Math.round:eF;function sm(e){e.min=sh(e.min),e.max=sh(e.max)}function sf(e,t,i){return"position"===e||"preserve-aspect"===e&&!(.2>=Math.abs(rG(t)-rG(i)))}function sg(e){return e!==e.root&&e.scroll?.wasRoot}let sx=r2({attachResizeListener:(e,t)=>nH(e,"resize",t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body?.scrollLeft||0,y:document.documentElement.scrollTop||document.body?.scrollTop||0}),checkIsScrollRoot:()=>!0}),sy={current:void 0},sv=r2({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!sy.current){let e=new sx({});e.mount(window),e.setOptions({layoutScroll:!0}),sy.current=e}return sy.current},resetTransform:(e,t)=>{e.style.transform=void 0!==t?t:"none"},checkIsScrollRoot:e=>"fixed"===window.getComputedStyle(e).position});function sb(e,t){let i=n0(e),n=new AbortController;return[i,{passive:!0,...t,signal:n.signal},()=>n.abort()]}function sw(e,t,i){let{props:n}=e;e.animationState&&n.whileHover&&e.animationState.setActive("whileHover","Start"===i);let r=n["onHover"+i];r&&eM.postRender(()=>r(t,ri(t)))}function sS(e){return nJ(e)&&"offsetHeight"in e&&!("ownerSVGElement"in e)}let sT=(e,t)=>!!t&&(e===t||sT(e,t.parentElement)),sE=new WeakSet;function sF(e){return t=>{"Enter"===t.key&&e(t)}}function sC(e,t){e.dispatchEvent(new PointerEvent("pointer"+t,{isPrimary:!0,bubbles:!0}))}function sk(e){return rt(e)&&!(nq.x||nq.y)}let sA=new WeakSet;function sM(e,t,i){let{props:n}=e;if(e.current instanceof HTMLButtonElement&&e.current.disabled)return;e.animationState&&n.whileTap&&e.animationState.setActive("whileTap","Start"===i);let r=n["onTap"+("End"===i?"":i)];r&&eM.postRender(()=>r(t,ri(t)))}let sj=new WeakMap,sP=new WeakMap,sB=e=>{let t=sj.get(e.target);t&&t(e)},sD=e=>{e.forEach(sB)},sR={some:0,all:1},sL=function(e,t){if("u"<typeof Proxy)return iF;let i=new Map,n=(i,n)=>iF(i,n,e,t);return new Proxy((e,t)=>n(e,t),{get:(r,s)=>"create"===s?n:(i.has(s)||i.set(s,iF(s,void 0,e,t)),i.get(s))})}({animation:{Feature:class extends iC{constructor(e){super(e),e.animationState||(e.animationState=function(e){let t=t=>Promise.all(t.map(({animation:t,options:i})=>(function(e,t,i={}){let n;if(e.notify("AnimationStart",t),Array.isArray(t))n=Promise.all(t.map(t=>nL(e,t,i)));else if("string"==typeof t)n=nL(e,t,i);else{let r="function"==typeof t?ik(e,t,i.custom):t;n=Promise.all(nD(e,r,i))}return n.then(()=>{e.notify("AnimationComplete",t)})})(e,t,i))),i=n$(),n=!0,r=!1,s=t=>(i,n)=>{let r=ik(e,n,"exit"===t?e.presenceContext?.custom:void 0);if(r){let{transition:e,transitionEnd:t,...n}=r;i={...i,...n,...t}}return i};function o(o){let{props:a}=e,l=function e(t){if(!t)return;if(!t.isControllingVariants){let i=t.parent&&e(t.parent)||{};return void 0!==t.props.initial&&(i.initial=t.props.initial),i}let i={};for(let e=0;e<nz;e++){let n=tm[e],r=t.props[n];(tp(r)||!1===r)&&(i[n]=r)}return i}(e.parent)||{},d=[],c=new Set,u={},p=1/0;for(let t=0;t<nW;t++){var h,m;let f=nV[t],g=i[f],x=void 0!==a[f]?a[f]:l[f],y=tp(x),v=f===o?g.isActive:null;!1===v&&(p=t);let b=x===l[f]&&x!==a[f]&&y;if(b&&(n||r)&&e.manuallyAnimateOnMount&&(b=!1),g.protectedKeys={...u},!g.isActive&&null===v||!x&&!g.prevProp||tu(x)||"boolean"==typeof x)continue;if("exit"===f&&g.isActive&&!0!==v){g.prevResolvedValues&&(u={...u,...g.prevResolvedValues});continue}let w=(h=g.prevProp,"string"==typeof(m=x)?m!==h:!!Array.isArray(m)&&!nI(m,h)),S=w||f===o&&g.isActive&&!b&&y||t>p&&y,T=!1,E=Array.isArray(x)?x:[x],F=E.reduce(s(f),{});!1===v&&(F={});let{prevResolvedValues:C={}}=g,k={...C,...F},A=t=>{S=!0,c.has(t)&&(T=!0,c.delete(t)),g.needsAnimating[t]=!0;let i=e.getValue(t);i&&(i.liveStyle=!1)};for(let e in k){let t=F[e],i=C[e];if(!u.hasOwnProperty(e))(ij(t)&&ij(i)?nI(t,i):t===i)?void 0!==t&&c.has(e)?A(e):g.protectedKeys[e]=!0:null!=t?A(e):c.add(e)}g.prevProp=x,g.prevResolvedValues=F,g.isActive&&(u={...u,...F}),(n||r)&&e.blockInitialAnimation&&(S=!1);let M=b&&w,j=!M||T;S&&j&&d.push(...E.map(t=>{let i={type:f};if("string"==typeof t&&(n||r)&&!M&&e.manuallyAnimateOnMount&&e.parent){let{parent:n}=e,r=ik(n,t);if(n.enteringChildren&&r){let{delayChildren:t}=r.transition||{};i.delay=nR(n.enteringChildren,e,t)}}return{animation:t,options:i}}))}if(c.size){let t={};if("boolean"!=typeof a.initial){let i=ik(e,Array.isArray(a.initial)?a.initial[0]:a.initial);i&&i.transition&&(t.transition=i.transition)}c.forEach(i=>{let n=e.getBaseTarget(i),r=e.getValue(i);r&&(r.liveStyle=!0),t[i]=n??null}),d.push({animation:t})}let f=!!d.length;return n&&(!1===a.initial||a.initial===a.animate)&&!e.manuallyAnimateOnMount&&(f=!1),n=!1,r=!1,f?t(d):Promise.resolve()}return{animateChanges:o,setActive:function(t,n){if(i[t].isActive===n)return Promise.resolve();e.variantChildren?.forEach(e=>e.animationState?.setActive(t,n)),i[t].isActive=n;let r=o(t);for(let e in i)i[e].protectedKeys={};return r},setAnimateFunction:function(i){t=i(e)},getState:()=>i,reset:()=>{i=n$(),r=!0}}}(e))}updateAnimationControlsSubscription(){let{animate:e}=this.node.getProps();tu(e)&&(this.unmountControls=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){let{animate:e}=this.node.getProps(),{animate:t}=this.node.prevProps||{};e!==t&&this.updateAnimationControlsSubscription()}unmount(){this.node.animationState.reset(),this.unmountControls?.()}}},exit:{Feature:class extends iC{constructor(){super(...arguments),this.id=nN++,this.isExitComplete=!1}update(){if(!this.node.presenceContext)return;let{isPresent:e,onExitComplete:t}=this.node.presenceContext,{isPresent:i}=this.node.prevPresenceContext||{};if(!this.node.animationState||e===i)return;if(e&&!1===i){if(this.isExitComplete){let{initial:e,custom:t}=this.node.getProps();if("string"==typeof e){let i=ik(this.node,e,t);if(i){let{transition:e,transitionEnd:t,...n}=i;for(let e in n)this.node.getValue(e)?.jump(n[e])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}let n=this.node.animationState.setActive("exit",!e);t&&!e&&n.then(()=>{this.isExitComplete=!0,t(this.id)})}mount(){let{register:e,onExitComplete:t}=this.node.presenceContext||{};t&&t(this.id),e&&(this.unmount=e(this.id))}unmount(){}}},inView:{Feature:class extends iC{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var e;let t;this.stopObserver?.();let{viewport:i={}}=this.node.getProps(),{root:n,margin:r,amount:s="some",once:o}=i,a={root:n?n.current:void 0,rootMargin:r,threshold:"number"==typeof s?s:sR[s]},l=e=>{let{isIntersecting:t}=e;if(this.isInView===t||(this.isInView=t,o&&!t&&this.hasEnteredView))return;t&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",t);let{onViewportEnter:i,onViewportLeave:n}=this.node.getProps(),r=t?i:n;r&&r(e)};this.stopObserver=(e=this.node.current,t=function({root:e,...t}){let i=e||document;sP.has(i)||sP.set(i,{});let n=sP.get(i),r=JSON.stringify(t);return n[r]||(n[r]=new IntersectionObserver(sD,{root:e,...t})),n[r]}(a),sj.set(e,l),t.observe(e),()=>{sj.delete(e),t.unobserve(e)})}mount(){this.startObserver()}update(){if("u"<typeof IntersectionObserver)return;let{props:e,prevProps:t}=this.node;["amount","margin","root"].some(function({viewport:e={}},{viewport:t={}}={}){return i=>e[i]!==t[i]}(e,t))&&this.startObserver()}unmount(){this.stopObserver?.(),this.hasEnteredView=!1,this.isInView=!1}}},tap:{Feature:class extends iC{mount(){let{current:e}=this.node;if(!e)return;let{globalTapTarget:t,propagate:i}=this.node.props;this.unmount=function(e,t,i={}){let[n,r,s]=sb(e,i),o=e=>{let n=e.currentTarget;if(!sk(e)||sA.has(e))return;sE.add(n),i.stopPropagation&&sA.add(e);let s=t(n,e),o=(e,t)=>{window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",l),sE.has(n)&&sE.delete(n),sk(e)&&"function"==typeof s&&s(e,{success:t})},a=e=>{o(e,n===window||n===document||i.useGlobalTarget||sT(n,e.target))},l=e=>{o(e,!1)};window.addEventListener("pointerup",a,r),window.addEventListener("pointercancel",l,r)};return n.forEach(e=>{((i.useGlobalTarget?window:e).addEventListener("pointerdown",o,r),sS(e))&&(e.addEventListener("focus",e=>((e,t)=>{let i=e.currentTarget;if(!i)return;let n=sF(()=>{if(sE.has(i))return;sC(i,"down");let e=sF(()=>{sC(i,"up")});i.addEventListener("keyup",e,t),i.addEventListener("blur",()=>sC(i,"cancel"),t)});i.addEventListener("keydown",n,t),i.addEventListener("blur",()=>i.removeEventListener("keydown",n),t)})(e,r)),n7.has(e.tagName)||!0===e.isContentEditable||e.hasAttribute("tabindex")||(e.tabIndex=0))}),s}(e,(e,t)=>(sM(this.node,t,"Start"),(e,{success:t})=>sM(this.node,e,t?"End":"Cancel")),{useGlobalTarget:t,stopPropagation:i?.tap===!1})}unmount(){}}},focus:{Feature:class extends iC{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(":focus-visible")}catch(t){e=!0}e&&this.node.animationState&&(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){this.isActive&&this.node.animationState&&(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=iD(nH(this.node.current,"focus",()=>this.onFocus()),nH(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}},hover:{Feature:class extends iC{mount(){let{current:e}=this.node;e&&(this.unmount=function(e,t,i={}){let[n,r,s]=sb(e,i);return n.forEach(e=>{let i,n=!1,s=!1,o=t=>{i&&(i(t),i=void 0),e.removeEventListener("pointerleave",l)},a=e=>{n=!1,window.removeEventListener("pointerup",a),window.removeEventListener("pointercancel",a),s&&(s=!1,o(e))},l=e=>{if("touch"!==e.pointerType){if(n){s=!0;return}o(e)}};e.addEventListener("pointerenter",n=>{if("touch"===n.pointerType||nq.x||nq.y)return;s=!1;let o=t(e,n);"function"==typeof o&&(i=o,e.addEventListener("pointerleave",l,r))},r),e.addEventListener("pointerdown",()=>{n=!0,window.addEventListener("pointerup",a,r),window.addEventListener("pointercancel",a,r)},r)}),s}(e,(e,t)=>(sw(this.node,t,"Start"),e=>sw(this.node,e,"End"))))}unmount(){}}},pan:{Feature:class extends iC{constructor(){super(...arguments),this.removePointerDownListener=eF}onPointerDown(e){this.session=new ra(e,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:rr(this.node)})}createPanHandlers(){let{onPanSessionStart:e,onPanStart:t,onPan:i,onPanEnd:n}=this.node.getProps();return{onSessionStart:rb(e),onStart:rb(t),onMove:rb(i),onEnd:(e,t)=>{delete this.session,n&&eM.postRender(()=>n(e,t))}}}mount(){this.removePointerDownListener=rn(this.node.current,"pointerdown",e=>this.onPointerDown(e))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}},drag:{Feature:class extends iC{constructor(e){super(e),this.removeGroupControls=eF,this.removeListeners=eF,this.controls=new rx(e)}mount(){let{dragControls:e}=this.node.getProps();e&&(this.removeGroupControls=e.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||eF}update(){let{dragControls:e}=this.node.getProps(),{dragControls:t}=this.node.prevProps||{};e!==t&&(this.removeGroupControls(),e&&(this.removeGroupControls=e.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}},ProjectionNode:sv,MeasureLayout:rC},layout:{ProjectionNode:sv,MeasureLayout:rC}},(e,t)=>t.isSVG??t6(e)?new tq(t):new t4(t,{allowProjection:e!==o.Fragment})),sz="#1E3A8A",sI="#3B82F6",sV="#FFFFFF";function sW({children:e,className:t=""}){let i=(0,o.useRef)(null),[n,r]=(0,o.useState)(!1);return(0,o.useEffect)(()=>{let e=i.current;if(!e)return;let t=new IntersectionObserver(([i])=>{i.isIntersecting&&(r(!0),t.unobserve(e))},{threshold:.15});return t.observe(e),()=>t.disconnect()},[]),(0,s.jsx)(sL.div,{ref:i,initial:{opacity:0,y:20},animate:n?{opacity:1,y:0}:{},transition:{duration:.5,ease:"easeOut"},className:t,children:e})}function sO({m:e}){let{count:t,ref:i}=function(e,t=1500){let[i,n]=(0,o.useState)(0),[r,s]=(0,o.useState)(!1),a=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let e=a.current;if(!e)return;let t=new IntersectionObserver(([i])=>{i.isIntersecting&&(s(!0),t.unobserve(e))},{threshold:.3});return t.observe(e),()=>t.disconnect()},[]),(0,o.useEffect)(()=>{let i;if(!r)return;let s=Math.abs(e),o=s%1!=0,a=performance.now(),l=e=>{let r=Math.min((e-a)/t,1),d=(1-Math.pow(1-r,3))*s;n(o?parseFloat(d.toFixed(2)):Math.round(d)),r<1&&(i=requestAnimationFrame(l))};return i=requestAnimationFrame(l),()=>cancelAnimationFrame(i)},[r,e,t]),{count:e<0?-i:i,ref:a}}(e.target);return(0,s.jsx)("div",{ref:i,children:(0,s.jsx)("p",{style:{fontFamily:"var(--font-cormorant)",fontWeight:600,fontSize:"clamp(2rem,4vw,2.8rem)",color:sI,lineHeight:1.1,marginBottom:"0.4rem"},children:"M"===e.suffix?e.prefix+t.toFixed(1)+e.suffix:"%"===e.suffix||" meses"===e.suffix?e.prefix+t+e.suffix:"+"===e.suffix?e.prefix+t.toLocaleString("es-MX")+e.suffix:"$"===e.prefix?e.prefix+(t%1==0?t.toFixed(0):t.toFixed(2)):e.prefix+t+e.suffix})})}function s$(){return(0,s.jsx)("section",{style:{background:"#0B2A5A",padding:"6rem 2rem"},children:(0,s.jsxs)("div",{style:{maxWidth:1e3,margin:"0 auto"},children:[(0,s.jsxs)(sW,{children:[(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.7rem",letterSpacing:"0.25em",textTransform:"uppercase",color:sI,marginBottom:"0.75rem"},children:"Resultados reales"}),(0,s.jsx)("h2",{style:{fontFamily:"var(--font-cormorant)",fontWeight:400,fontSize:"clamp(1.8rem,4vw,2.8rem)",color:sV,lineHeight:1.15,marginBottom:"0.75rem"},children:"Resultados reales. Números que no mienten."}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.85rem",letterSpacing:"0.1em",textTransform:"uppercase",color:"#C0C5CE",marginBottom:"1.5rem"},children:"Retail de muebles · 15 meses de gestión"}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"1.05rem",color:"rgba(255,255,255,0.7)",lineHeight:1.75,maxWidth:700,marginBottom:"3rem"},children:"Negocio físico con presupuesto limitado (~$4,200 MXN/mes), sin historial en Meta Ads y con un objetivo claro: generar conversaciones reales con compradores locales, no métricas de vanidad."})]}),(0,s.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"1.5rem"},className:"caso-grid",children:[{value:"-52%",target:-52,suffix:"%",prefix:"",label:"Reducción de CPA",detail:"de $10.55 a $5.05 MXN"},{value:"8,000+",target:8e3,suffix:"+",prefix:"",label:"Conversaciones generadas",detail:"a WhatsApp"},{value:"+91%",target:91,suffix:"%",prefix:"+",label:"Mejora en CTR",detail:"de 1.10% a 2.10%"},{value:"1.2M",target:1.2,suffix:"M",prefix:"",label:"Reproducciones de video",detail:""},{value:"$5.05",target:5.05,suffix:"",prefix:"$",label:"CPA mínimo alcanzado",detail:""},{value:"15 meses",target:15,suffix:" meses",prefix:"",label:"Gestión continua",detail:"documentada"}].map((e,t)=>(0,s.jsx)(sW,{children:(0,s.jsxs)("div",{style:{background:"#111827",border:"1px solid "+sz,borderRadius:16,padding:"2rem 1.5rem",textAlign:"center",transition:"transform 0.3s, border-color 0.3s"},onMouseEnter:e=>{e.currentTarget.style.transform="translateY(-4px)",e.currentTarget.style.borderColor=sI,e.currentTarget.style.boxShadow="0 8px 30px rgba(59,130,246,0.12)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)",e.currentTarget.style.borderColor=sz,e.currentTarget.style.boxShadow="none"},children:[(0,s.jsx)(sO,{m:e}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:500,fontSize:"0.9rem",color:sV,marginBottom:"0.25rem"},children:e.label}),e.detail&&(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"0.8rem",color:"rgba(255,255,255,0.45)"},children:e.detail})]})},t))}),(0,s.jsxs)(sW,{children:[(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"1.05rem",color:"rgba(255,255,255,0.7)",lineHeight:1.75,maxWidth:700,marginTop:"3rem"},children:"Presupuesto pequeño no significa resultados pequeños. Significa que cada peso tiene que justificarse. Eso es exactamente lo que hago."}),(0,s.jsx)("div",{style:{marginTop:"2rem"},children:(0,s.jsx)("a",{href:"#sistema-filtro",style:{display:"inline-block",fontFamily:"'DM Sans', sans-serif",fontWeight:500,fontSize:"0.9rem",color:sV,background:sI,padding:"0.85rem 2.2rem",borderRadius:100,textDecoration:"none",letterSpacing:"0.06em",transition:"all 0.25s"},onMouseEnter:e=>{e.currentTarget.style.transform="translateY(-2px)",e.currentTarget.style.background=sz,e.currentTarget.style.boxShadow="0 8px 30px rgba(59,130,246,0.25)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)",e.currentTarget.style.background=sI,e.currentTarget.style.boxShadow="none"},children:"Ver cómo funciona el Método P.U.L.S.O."})})]})]})})}var sN=o;function sU(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}class sH extends sN.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(sS(t)&&e.isPresent&&!this.props.isPresent&&!1!==this.props.pop){let e=t.offsetParent,i=sS(e)&&e.offsetWidth||0,n=sS(e)&&e.offsetHeight||0,r=getComputedStyle(t),s=this.props.sizeRef.current;s.height=parseFloat(r.height),s.width=parseFloat(r.width),s.top=t.offsetTop,s.left=t.offsetLeft,s.right=i-s.width-s.left,s.bottom=n-s.height-s.top}return null}componentDidUpdate(){}render(){return this.props.children}}function sq({children:e,isPresent:t,anchorX:i,anchorY:n,root:r,pop:a}){let l=(0,sN.useId)(),d=(0,sN.useRef)(null),c=(0,sN.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:u}=(0,sN.useContext)(ie),p=function(...e){return o.useCallback(function(...e){return t=>{let i=!1,n=e.map(e=>{let n=sU(e,t);return i||"function"!=typeof n||(i=!0),n});if(i)return()=>{for(let t=0;t<n.length;t++){let i=n[t];"function"==typeof i?i():sU(e[t],null)}}}}(...e),e)}(d,e.props?.ref??e?.ref);return(0,sN.useInsertionEffect)(()=>{let{width:e,height:s,top:o,left:p,right:h,bottom:m}=c.current;if(t||!1===a||!d.current||!e||!s)return;let f="left"===i?`left: ${p}`:`right: ${h}`,g="bottom"===n?`bottom: ${m}`:`top: ${o}`;d.current.dataset.motionPopId=l;let x=document.createElement("style");u&&(x.nonce=u);let y=r??document.head;return y.appendChild(x),x.sheet&&x.sheet.insertRule(`
          [data-motion-pop-id="${l}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${s}px !important;
            ${f}px !important;
            ${g}px !important;
          }
        `),()=>{d.current?.removeAttribute("data-motion-pop-id"),y.contains(x)&&y.removeChild(x)}},[t]),(0,s.jsx)(sH,{isPresent:t,childRef:d,sizeRef:c,pop:a,children:!1===a?e:sN.cloneElement(e,{ref:p})})}let sY=({children:e,initial:t,isPresent:i,onExitComplete:n,custom:r,presenceAffectsLayout:a,mode:l,anchorX:d,anchorY:c,root:u})=>{let p=ip(sX),h=(0,o.useId)(),m=!0,f=(0,o.useMemo)(()=>(m=!1,{id:h,initial:t,isPresent:i,custom:r,onExitComplete:e=>{for(let t of(p.set(e,!0),p.values()))if(!t)return;n&&n()},register:e=>(p.set(e,!1),()=>p.delete(e))}),[i,p,n]);return a&&m&&(f={...f}),(0,o.useMemo)(()=>{p.forEach((e,t)=>p.set(t,!1))},[i]),o.useEffect(()=>{i||p.size||!n||n()},[i]),e=(0,s.jsx)(sq,{pop:"popLayout"===l,isPresent:i,anchorX:d,anchorY:c,root:u,children:e}),(0,s.jsx)(iu.Provider,{value:f,children:e})};function sX(){return new Map}let sG=e=>e.key||"";function s_(e){let t=[];return o.Children.forEach(e,e=>{(0,o.isValidElement)(e)&&t.push(e)}),t}let sK=({children:e,custom:t,initial:i=!0,onExitComplete:n,presenceAffectsLayout:r=!0,mode:a="sync",propagate:l=!1,anchorX:d="left",anchorY:c="top",root:u})=>{let[p,h]=rT(l),m=(0,o.useMemo)(()=>s_(e),[e]),f=l&&!p?[]:m.map(sG),g=(0,o.useRef)(!0),x=(0,o.useRef)(m),y=ip(()=>new Map),v=(0,o.useRef)(new Set),[b,w]=(0,o.useState)(m),[S,T]=(0,o.useState)(m);iE(()=>{g.current=!1,x.current=m;for(let e=0;e<S.length;e++){let t=sG(S[e]);f.includes(t)?(y.delete(t),v.current.delete(t)):!0!==y.get(t)&&y.set(t,!1)}},[S,f.length,f.join("-")]);let E=[];if(m!==b){let e=[...m];for(let t=0;t<S.length;t++){let i=S[t],n=sG(i);f.includes(n)||(e.splice(t,0,i),E.push(i))}return"wait"===a&&E.length&&(e=E),T(s_(e)),w(m),null}let{forceRender:F}=(0,o.useContext)(t9);return(0,s.jsx)(s.Fragment,{children:S.map(e=>{let o=sG(e),b=(!l||!!p)&&(m===S||f.includes(o));return(0,s.jsx)(sY,{isPresent:b,initial:(!g.current||!!i)&&void 0,custom:t,presenceAffectsLayout:r,mode:a,root:u,onExitComplete:b?void 0:()=>{if(v.current.has(o)||!y.has(o))return;v.current.add(o),y.set(o,!0);let e=!0;y.forEach(t=>{t||(e=!1)}),e&&(F?.(),T(x.current),l&&h?.(),n&&n())},anchorX:d,anchorY:c,children:e},o)})})},sZ="#3B82F6",sJ="#FFFFFF";function sQ({children:e,className:t=""}){let i=(0,o.useRef)(null),[n,r]=(0,o.useState)(!1);return(0,o.useEffect)(()=>{let e=i.current;if(!e)return;let t=new IntersectionObserver(([i])=>{i.isIntersecting&&(r(!0),t.unobserve(e))},{threshold:.15});return t.observe(e),()=>t.disconnect()},[]),(0,s.jsx)(sL.div,{ref:i,initial:{opacity:0,y:20},animate:n?{opacity:1,y:0}:{},transition:{duration:.5,ease:"easeOut"},className:t,children:e})}let s0=[{id:"calculadora",emoji:"🧊",label:"No se si mis ads funcionan",title:"Calculadora de desperdicio",desc:"Calcula en 30 segundos cuánto dinero se va sin generar ventas reales.",html:`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\xbfCu\xe1nto est\xe1s desperdiciando en Meta Ads? \xb7 CJB</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #000000;
    color: #EEF0FF;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    min-height: 100vh;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 620px;
    margin: 0 auto;
    padding: 60px 24px 80px;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;
  }

  .badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 4px;
    color: #3B82F6;
    text-transform: uppercase;
    border: 1px solid rgba(59,130,246,0.30);
    background: transparent;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 24px;
  }

  .header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 6vw, 48px);
    font-weight: 300;
    line-height: 1.15;
    margin-bottom: 16px;
    color: #EEF0FF;
  }

  .header h1 span { color: #3B82F6; }

  .header p {
    font-size: 15px;
    color: #9CA3AF;
    line-height: 1.6;
    max-width: 440px;
    margin: 0 auto;
  }

  .card {
    background: #111827;
    border: 1px solid rgba(59,130,246,0.18);
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  .input-group { margin-bottom: 28px; }

  .input-label {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }

  .input-label span {
    font-size: 13px;
    font-weight: 400;
    color: #EEF0FF;
  }

  .input-label .hint {
    font-size: 11px;
    color: #9CA3AF;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-prefix {
    position: absolute;
    left: 16px;
    font-size: 14px;
    color: #9CA3AF;
    pointer-events: none;
  }

  input[type="number"] {
    width: 100%;
    background: #1F2937;
    border: 1px solid rgba(59,130,246,0.20);
    border-radius: 8px;
    padding: 14px 16px 14px 36px;
    color: #EEF0FF;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    -moz-appearance: textfield;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; }

  input:focus {
    border-color: #3B82F6;
    background: rgba(59,130,246,0.08);
  }

  input::placeholder { color: rgba(156,163,175,0.5); }

  .helper {
    font-size: 11px;
    color: #9CA3AF;
    margin-top: 6px;
    line-height: 1.5;
  }

  .btn-primary {
    width: 100%;
    background: #3B82F6;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-top: 8px;
  }

  .btn-primary:hover {
    background: #2563EB;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37,99,235,0.25);
  }

  #results { display: none; }

  .waste-number {
    text-align: center;
    padding: 32px 0;
    border-bottom: 1px solid rgba(59,130,246,0.15);
    margin-bottom: 32px;
  }

  .waste-label {
    font-size: 11px;
    letter-spacing: 4px;
    color: #9CA3AF;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .waste-amount {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(48px, 10vw, 72px);
    font-weight: 300;
    color: #3B82F6;
    line-height: 1;
    margin-bottom: 8px;
  }

  .waste-sublabel {
    font-size: 13px;
    color: #9CA3AF;
  }

  .metrics-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 28px;
  }

  .metric-box {
    background: #1F2937;
    border: 1px solid rgba(59,130,246,0.15);
    border-radius: 8px;
    padding: 16px 20px;
  }

  .metric-box .m-label {
    font-size: 10px;
    letter-spacing: 2px;
    color: #9CA3AF;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .metric-box .m-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    color: #EEF0FF;
    line-height: 1;
  }

  .metric-box .m-sub {
    font-size: 11px;
    color: #9CA3AF;
    margin-top: 4px;
  }

  .metric-box.highlight {
    background: rgba(59,130,246,0.10);
    border-color: rgba(59,130,246,0.30);
  }

  .metric-box.highlight .m-value { color: #3B82F6; }

  .semaforo {
    border-radius: 16px;
    padding: 20px 24px;
    margin-bottom: 28px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .semaforo.red { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); }
  .semaforo.yellow { background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.2); }
  .semaforo.green { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2); }

  .semaforo-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: 3px;
    flex-shrink: 0;
  }

  .red .semaforo-dot { background: #EF4444; }
  .yellow .semaforo-dot { background: #F59E0B; }
  .green .semaforo-dot { background: #22C55E; }

  .semaforo-text .s-title {
    font-size: 13px;
    font-weight: 500;
    color: #EEF0FF;
    margin-bottom: 4px;
  }

  .semaforo-text .s-desc {
    font-size: 13px;
    color: #9CA3AF;
    line-height: 1.6;
  }

  .cta-box {
    text-align: center;
    padding: 28px 0 0;
    border-top: 1px solid rgba(59,130,246,0.15);
  }

  .cta-box h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 300;
    color: #EEF0FF;
    margin-bottom: 10px;
    line-height: 1.3;
  }

  .cta-box h3 span { color: #3B82F6; }

  .cta-box p {
    font-size: 13px;
    color: #9CA3AF;
    margin-bottom: 24px;
    line-height: 1.6;
  }

  .btn-whatsapp {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #25D366;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.5px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    width: 100%;
    margin-bottom: 12px;
  }

  .btn-whatsapp:hover {
    background: #1fba57;
    transform: translateY(-1px);
    box-shadow: 0 8px 32px rgba(37,211,102,0.2);
  }

  .btn-restart {
    background: transparent;
    border: 1px solid rgba(59,130,246,0.20);
    color: #9CA3AF;
    border-radius: 12px;
    padding: 12px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .btn-restart:hover { border-color: #3B82F6; color: #3B82F6; }

  .footer {
    text-align: center;
    margin-top: 40px;
    font-size: 11px;
    color: rgba(156,163,175,0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-in { animation: fadeUp 0.5s ease forwards; }

  @media (max-width: 480px) {
    .card { padding: 28px 20px; }
    .score-display { font-size: 42px; }
    .container { padding: 40px 16px 60px; }
    .metrics-row { grid-template-columns: 1fr; }
  }
  </style>
</head>
<body>
<div class="container">

  <div class="header animate-in">
    <div class="badge">CJB \xb7 Herramienta Gratuita</div>
    <h1>\xbfCu\xe1nto est\xe1<br><span>desperdiciando</span><br>tu negocio en Meta Ads?</h1>
    <p>Calcula en 30 segundos cu\xe1nto dinero se est\xe1 yendo sin generar ventas reales.</p>
  </div>

  <!-- FORM -->
  <div class="card animate-in" id="formCard">
    <div class="input-group">
      <div class="input-label">
        <span>\xbfCu\xe1nto inviertes al mes en Meta Ads?</span>
        <span class="hint">MXN</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">$</span>
        <input type="number" id="inversion" placeholder="5000" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>\xbfCu\xe1ntas ventas genera ese presupuesto al mes?</span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="ventas" placeholder="12" min="0" step="1" autocomplete="off" 
style="padding-left:16px;" onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
      <p class="helper">Si no tienes el dato exacto, pon tu mejor estimado.</p>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>\xbfCu\xe1l es tu ticket promedio de venta?</span>
        <span class="hint">MXN</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">$</span>
        <input type="number" id="ticket" placeholder="800" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>\xbfCu\xe1ntas ventas necesitas al mes para ser rentable?</span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="meta" placeholder="25" min="0" step="1" autocomplete="off" 
style="padding-left:16px;" onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
      <p class="helper">Tu objetivo de ventas mensual m\xednimo.</p>
    </div>

    <button class="btn-primary" onclick="calcular()">Calcular mi desperdicio →</button>
  </div>

  <!-- RESULTS -->
  <div class="card animate-in" id="results">

    <div class="waste-number">
      <div class="waste-label">Est\xe1s desperdiciando cada mes</div>
      <div class="waste-amount" id="wasteAmount">$0</div>
      <div class="waste-sublabel" id="wasteSubLabel">en presupuesto que no se convierte en ventas</div>
    </div>

    <div class="metrics-row">
      <div class="metric-box">
        <div class="m-label">Inversi\xf3n mensual</div>
        <div class="m-value" id="resInversion">—</div>
        <div class="m-sub">presupuesto total</div>
      </div>
      <div class="metric-box">
        <div class="m-label">Ingresos generados</div>
        <div class="m-value" id="resIngresos">—</div>
        <div class="m-sub">ventas x ticket</div>
      </div>
      <div class="metric-box highlight">
        <div class="m-label">ROAS real</div>
        <div class="m-value" id="resRoas">—</div>
        <div class="m-sub">por cada peso invertido</div>
      </div>
      <div class="metric-box">
        <div class="m-label">Costo por venta</div>
        <div class="m-value" id="resCpv">—</div>
        <div class="m-sub">lo que cuesta cada cliente</div>
      </div>
    </div>

    <div class="semaforo" id="semaforo">
      <div class="semaforo-dot"></div>
      <div class="semaforo-text">
        <div class="s-title" id="semaforoTitle">—</div>
        <div class="s-desc" id="semaforoDesc">—</div>
      </div>
    </div>

    <div class="cta-box">
      <h3>Hay <span id="ctaWaste">$X</span> recuperables<br>en tu cuenta este mes</h3>
      <p id="ctaDesc">Eso no es dinero perdido para siempre. Es dinero mal dirigido que se puede redirigir con la estrategia correcta.</p>
      <a id="btnWA" class="btn-whatsapp" href="#" target="_blank">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Quiero recuperar ese dinero
      </a>
      <button class="btn-restart" onclick="restart()">Recalcular</button>
    </div>

  </div>

  <div class="footer">CJB by Carolina Betancourt \xb7 Performance Marketing & Paid Media Strategy</div>

</div>

<script>
  function fmt(n) {
    return '$' + Math.round(n).toLocaleString('es-MX');
  }

  function calcular() {
    const inv  = parseFloat(document.getElementById('inversion').value);
    const vts  = parseFloat(document.getElementById('ventas').value);
    const tick = parseFloat(document.getElementById('ticket').value);
    const meta = parseFloat(document.getElementById('meta').value);

    if (isNaN(inv) || isNaN(vts) || isNaN(tick) || isNaN(meta)) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const ingresos = vts * tick;
    const roas = ingresos / inv;
    const cpv = vts > 0 ? inv / vts : inv;
    const ventasFaltantes = Math.max(0, meta - vts);
    const desperdicio = Math.max(0, inv - ingresos);
    const porcentajeDesperdicio = Math.min(100, (desperdicio / inv) * 100);

    // Sem\xe1foro
    let semClass, semTitle, semDesc;
    if (roas < 1) {
      semClass = 'red';
      semTitle = '🔴 Situaci\xf3n cr\xedtica — est\xe1s perdiendo dinero';
      semDesc = \`Por cada peso que inviertes en Meta, recuperas \${roas.toFixed(2)} pesos. Tu campa\xf1a est\xe1 destruyendo capital. Esto tiene soluci\xf3n, pero requiere acci\xf3n inmediata.\`;
    } else if (roas < 2.5) {
      semClass = 'yellow';
      semTitle = '🟡 Rendimiento bajo — hay fugas importantes';
      semDesc = \`Tu ROAS de \${roas.toFixed(1)}x est\xe1 por debajo del m\xednimo saludable (2.5x). Est\xe1s generando algo, pero la mayor\xeda del presupuesto no est\xe1 convirtiendo. Con los ajustes correctos esto puede cambiar r\xe1pido.\`;
    } else {
      semClass = 'green';
      semTitle = '🟢 Base s\xf3lida — hay margen de escalamiento';
      semDesc = \`Tu ROAS de \${roas.toFixed(1)}x est\xe1 bien. El siguiente paso es escalar sin perder eficiencia — ah\xed es donde la mayor\xeda de negocios tropieza.\`;
    }

    // Render
    document.getElementById('formCard').style.display = 'none';
    const res = document.getElementById('results');
    res.style.display = 'block';

    document.getElementById('wasteAmount').textContent = fmt(desperdicio);
    document.getElementById('wasteSubLabel').textContent =
      porcentajeDesperdicio > 50
        ? \`El \${Math.round(porcentajeDesperdicio)}% de tu inversi\xf3n no regresa como ventas\`
        : \`Hay oportunidad de optimizar el \${Math.round(100 - (roas/3.5)*100 > 0 ? 100 - (roas/3.5)*100 : 10)}% de tu inversi\xf3n\`;

    document.getElementById('resInversion').textContent = fmt(inv);
    document.getElementById('resIngresos').textContent = fmt(ingresos);
    document.getElementById('resRoas').textContent = roas.toFixed(1) + 'x';
    document.getElementById('resCpv').textContent = fmt(cpv);

    const sem = document.getElementById('semaforo');
    sem.className = 'semaforo ' + semClass;
    document.getElementById('semaforoTitle').textContent = semTitle;
    document.getElementById('semaforoDesc').textContent = semDesc;

    document.getElementById('ctaWaste').textContent = fmt(desperdicio);

    if (roas < 1) {
      document.getElementById('ctaDesc').textContent = 'Tu cuenta necesita intervenci\xf3n urgente. Hablemos hoy — te digo exactamente qu\xe9 est\xe1 fallando y c\xf3mo pararlo.';
    } else if (roas < 2.5) {
      document.getElementById('ctaDesc').textContent = 'Eso no es dinero perdido para siempre. Es dinero mal dirigido que se puede redirigir con la estrategia correcta. Hablemos 15 minutos.';
    } else {
      document.getElementById('ctaDesc').textContent = 'Tienes una base s\xf3lida. El siguiente paso es escalar sin romper lo que funciona — eso requiere una estrategia espec\xedfica.';
    }

    const msg = encodeURIComponent(
      \`Hola Carolina, acabo de calcular que estoy desperdiciando \${fmt(desperdicio)} MXN al mes en Meta Ads con un ROAS de \${roas.toFixed(1)}x. Quiero saber c\xf3mo mejorar esto.\`
    );
    document.getElementById('btnWA').href = \`https://wa.me/522292924043?text=\${msg}\`;
  }

  function restart() {
    document.getElementById('results').style.display = 'none';
    document.getElementById('formCard').style.display = 'block';
  }
</script>
</body>
</html>
`},{id:"scorecard",emoji:"🌡️",label:"Invierto pero quiero escalar",title:"Scorecard de madurez",desc:"6 preguntas para saber exactamente qué está frenando el crecimiento de tus campañas.",html:`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\xbfQu\xe9 tan lista est\xe1 tu cuenta Meta para escalar? \xb7 CJB</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #000000;
    color: #EEF0FF;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    min-height: 100vh;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 620px;
    margin: 0 auto;
    padding: 60px 24px 80px;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
  }

  .badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 4px;
    color: #3B82F6;
    text-transform: uppercase;
    border: 1px solid rgba(59,130,246,0.30);
    background: transparent;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 24px;
  }

  .header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(30px, 5vw, 44px);
    font-weight: 300;
    line-height: 1.15;
    margin-bottom: 16px;
    color: #EEF0FF;
  }

  .header h1 span { color: #3B82F6; }

  .header p {
    font-size: 14px;
    color: #9CA3AF;
    line-height: 1.6;
    max-width: 440px;
    margin: 0 auto;
  }

  .progress-wrap {
    margin-bottom: 36px;
  }

  .progress-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .progress-top span {
    font-size: 11px;
    letter-spacing: 2px;
    color: #9CA3AF;
    text-transform: uppercase;
  }

  .progress-bar {
    height: 4px;
    background: #1F2937;
    border-radius: 100px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #3B82F6;
    border-radius: 100px;
    transition: width 0.4s ease;
    width: 0%;
  }

  .card {
    background: #111827;
    border: 1px solid rgba(59,130,246,0.18);
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  .question-number {
    font-size: 10px;
    letter-spacing: 4px;
    color: #3B82F6;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .question-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 400;
    color: #EEF0FF;
    line-height: 1.3;
    margin-bottom: 12px;
  }

  .question-hint {
    font-size: 13px;
    color: #9CA3AF;
    margin-bottom: 32px;
    line-height: 1.5;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    border: 1.5px solid rgba(59,130,246,0.15);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #111827;
    color: #EEF0FF;
  }

  .option:hover {
    border-color: #3B82F6;
    background: rgba(59,130,246,0.08);
  }

  .option.selected {
    border-color: #3B82F6;
    background: rgba(59,130,246,0.08);
  }

  .option-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgba(59,130,246,0.3);
    flex-shrink: 0;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .option.selected .option-dot {
    border-color: #3B82F6;
    background: #3B82F6;
  }

  .option.selected .option-dot::after {
    content: '';
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
  }

  .option-text {
    font-size: 14px;
    color: #EEF0FF;
    font-weight: 400;
    line-height: 1.4;
  }

  .option-score {
    margin-left: auto;
    font-size: 11px;
    color: #9CA3AF;
    flex-shrink: 0;
  }

  .option.selected .option-score { color: #3B82F6; }

  .nav-buttons {
    display: flex;
    gap: 12px;
    margin-top: 28px;
  }

  .btn-back {
    background: transparent;
    border: 1px solid rgba(59,130,246,0.20);
    color: #9CA3AF;
    border-radius: 12px;
    padding: 14px 24px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .btn-back:hover { border-color: #3B82F6; color: #3B82F6; }

  .btn-next {
    flex: 1;
    background: #3B82F6;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 14px 24px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-next:hover {
    background: #2563EB;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37,99,235,0.25);
  }

  .btn-next:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  #resultsCard { display: none; }

  .score-hero {
    text-align: center;
    padding: 32px 0 28px;
    border-bottom: 1px solid rgba(59,130,246,0.15);
    margin-bottom: 28px;
  }

  .score-tag {
    font-size: 10px;
    letter-spacing: 4px;
    color: #9CA3AF;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .score-display {
    font-family: 'Cormorant Garamond', serif;
    font-size: 72px;
    font-weight: 300;
    line-height: 1;
    margin-bottom: 4px;
  }

  .score-out {
    font-size: 13px;
    color: #9CA3AF;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }

  .score-nivel {
    display: inline-block;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 6px 20px;
    border-radius: 100px;
  }

  .breakdown {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 24px;
  }

  .breakdown-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    background: #1F2937;
    border-radius: 12px;
    border: 1px solid rgba(59,130,246,0.15);
  }

  .b-icon { font-size: 18px; flex-shrink: 0; }

  .b-info { flex: 1; }

  .b-name {
    font-size: 12px;
    font-weight: 400;
    color: #EEF0FF;
    margin-bottom: 2px;
  }

  .b-bar-wrap {
    height: 4px;
    background: #1F2937;
    border-radius: 100px;
    overflow: hidden;
    width: 100%;
  }

  .b-bar {
    height: 100%;
    border-radius: 100px;
    transition: width 0.8s ease;
  }

  .b-score {
    font-size: 12px;
    font-weight: 500;
    flex-shrink: 0;
  }

  .criticos {
    background: rgba(239,68,68,0.06);
    border: 1px solid rgba(239,68,68,0.2);
    border-radius: 16px;
    padding: 20px 24px;
    margin-bottom: 24px;
  }

  .criticos-title {
    font-size: 10px;
    letter-spacing: 3px;
    color: #EF4444;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .critico-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;
  }

  .critico-item:last-child { margin-bottom: 0; }

  .critico-dot {
    width: 6px;
    height: 6px;
    background: #EF4444;
    border-radius: 50%;
    margin-top: 6px;
    flex-shrink: 0;
  }

  .critico-text {
    font-size: 13px;
    color: #EEF0FF;
    line-height: 1.5;
  }

  .cta-box {
    text-align: center;
    padding: 28px 0 0;
    border-top: 1px solid rgba(59,130,246,0.15);
  }

  .cta-box h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 300;
    color: #EEF0FF;
    margin-bottom: 10px;
    line-height: 1.3;
  }

  .cta-box h3 span { color: #3B82F6; }

  .cta-box p {
    font-size: 13px;
    color: #9CA3AF;
    margin-bottom: 24px;
    line-height: 1.6;
  }

  .btn-whatsapp {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #25D366;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    width: 100%;
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }

  .btn-whatsapp:hover {
    background: #1fba57;
    transform: translateY(-1px);
    box-shadow: 0 8px 32px rgba(37,211,102,0.2);
  }

  .btn-restart {
    background: transparent;
    border: 1px solid rgba(59,130,246,0.20);
    color: #9CA3AF;
    border-radius: 12px;
    padding: 12px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .btn-restart:hover { border-color: #3B82F6; color: #3B82F6; }

  .footer {
    text-align: center;
    margin-top: 40px;
    font-size: 11px;
    color: rgba(156,163,175,0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-in { animation: fadeUp 0.5s ease forwards; }

  @media (max-width: 480px) {
    .card { padding: 28px 20px; }
    .score-number .num { font-size: 32px; }
    .container { padding: 40px 16px 60px; }
  }
  </style>
</head>
<body>
<div class="container">

  <div class="header animate-in">
    <div class="badge">CJB \xb7 Herramienta Gratuita</div>
    <h1>\xbfCu\xe1nto est\xe1<br><span>desperdiciando</span><br>tu negocio en Meta Ads?</h1>
    <p>Calcula en 30 segundos cu\xe1nto dinero se est\xe1 yendo sin generar ventas reales.</p>
  </div>

  <!-- FORM -->
  <div class="card animate-in" id="formCard">
    <div class="input-group">
      <div class="input-label">
        <span>\xbfCu\xe1nto inviertes al mes en Meta Ads?</span>
        <span class="hint">MXN</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">$</span>
        <input type="number" id="inversion" placeholder="5000" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>\xbfCu\xe1ntas ventas genera ese presupuesto al mes?</span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="ventas" placeholder="12" min="0" step="1" autocomplete="off" 
style="padding-left:16px;" onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
      <p class="helper">Si no tienes el dato exacto, pon tu mejor estimado.</p>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>\xbfCu\xe1l es tu ticket promedio de venta?</span>
        <span class="hint">MXN</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">$</span>
        <input type="number" id="ticket" placeholder="800" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>\xbfCu\xe1ntas ventas necesitas al mes para ser rentable?</span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="meta" placeholder="25" min="0" step="1" autocomplete="off" 
style="padding-left:16px;" onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
      <p class="helper">Tu objetivo de ventas mensual m\xednimo.</p>
    </div>

    <button class="btn-primary" onclick="calcular()">Calcular mi desperdicio →</button>
  </div>

  <!-- RESULTS -->
  <div class="card animate-in" id="results">

    <div class="waste-number">
      <div class="waste-label">Est\xe1s desperdiciando cada mes</div>
      <div class="waste-amount" id="wasteAmount">$0</div>
      <div class="waste-sublabel" id="wasteSubLabel">en presupuesto que no se convierte en ventas</div>
    </div>

    <div class="metrics-row">
      <div class="metric-box">
        <div class="m-label">Inversi\xf3n mensual</div>
        <div class="m-value" id="resInversion">—</div>
        <div class="m-sub">presupuesto total</div>
      </div>
      <div class="metric-box">
        <div class="m-label">Ingresos generados</div>
        <div class="m-value" id="resIngresos">—</div>
        <div class="m-sub">ventas x ticket</div>
      </div>
      <div class="metric-box highlight">
        <div class="m-label">ROAS real</div>
        <div class="m-value" id="resRoas">—</div>
        <div class="m-sub">por cada peso invertido</div>
      </div>
      <div class="metric-box">
        <div class="m-label">Costo por venta</div>
        <div class="m-value" id="resCpv">—</div>
        <div class="m-sub">lo que cuesta cada cliente</div>
      </div>
    </div>

    <div class="semaforo" id="semaforo">
      <div class="semaforo-dot"></div>
      <div class="semaforo-text">
        <div class="s-title" id="semaforoTitle">—</div>
        <div class="s-desc" id="semaforoDesc">—</div>
      </div>
    </div>

    <div class="cta-box">
      <h3>Hay <span id="ctaWaste">$X</span> recuperables<br>en tu cuenta este mes</h3>
      <p id="ctaDesc">Eso no es dinero perdido para siempre. Es dinero mal dirigido que se puede redirigir con la estrategia correcta.</p>
      <a id="btnWA" class="btn-whatsapp" href="#" target="_blank">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Quiero recuperar ese dinero
      </a>
      <button class="btn-restart" onclick="restart()">Recalcular</button>
    </div>

  </div>

  <div class="footer">CJB by Carolina Betancourt \xb7 Performance Marketing & Paid Media Strategy</div>

</div>

<script>
  function fmt(n) {
    return '$' + Math.round(n).toLocaleString('es-MX');
  }

  function calcular() {
    const inv  = parseFloat(document.getElementById('inversion').value);
    const vts  = parseFloat(document.getElementById('ventas').value);
    const tick = parseFloat(document.getElementById('ticket').value);
    const meta = parseFloat(document.getElementById('meta').value);

    if (isNaN(inv) || isNaN(vts) || isNaN(tick) || isNaN(meta)) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const ingresos = vts * tick;
    const roas = ingresos / inv;
    const cpv = vts > 0 ? inv / vts : inv;
    const ventasFaltantes = Math.max(0, meta - vts);
    const desperdicio = Math.max(0, inv - ingresos);
    const porcentajeDesperdicio = Math.min(100, (desperdicio / inv) * 100);

    // Sem\xe1foro
    let semClass, semTitle, semDesc;
    if (roas < 1) {
      semClass = 'red';
      semTitle = '🔴 Situaci\xf3n cr\xedtica — est\xe1s perdiendo dinero';
      semDesc = \`Por cada peso que inviertes en Meta, recuperas \${roas.toFixed(2)} pesos. Tu campa\xf1a est\xe1 destruyendo capital. Esto tiene soluci\xf3n, pero requiere acci\xf3n inmediata.\`;
    } else if (roas < 2.5) {
      semClass = 'yellow';
      semTitle = '🟡 Rendimiento bajo — hay fugas importantes';
      semDesc = \`Tu ROAS de \${roas.toFixed(1)}x est\xe1 por debajo del m\xednimo saludable (2.5x). Est\xe1s generando algo, pero la mayor\xeda del presupuesto no est\xe1 convirtiendo. Con los ajustes correctos esto puede cambiar r\xe1pido.\`;
    } else {
      semClass = 'green';
      semTitle = '🟢 Base s\xf3lida — hay margen de escalamiento';
      semDesc = \`Tu ROAS de \${roas.toFixed(1)}x est\xe1 bien. El siguiente paso es escalar sin perder eficiencia — ah\xed es donde la mayor\xeda de negocios tropieza.\`;
    }

    // Render
    document.getElementById('formCard').style.display = 'none';
    const res = document.getElementById('results');
    res.style.display = 'block';

    document.getElementById('wasteAmount').textContent = fmt(desperdicio);
    document.getElementById('wasteSubLabel').textContent =
      porcentajeDesperdicio > 50
        ? \`El \${Math.round(porcentajeDesperdicio)}% de tu inversi\xf3n no regresa como ventas\`
        : \`Hay oportunidad de optimizar el \${Math.round(100 - (roas/3.5)*100 > 0 ? 100 - (roas/3.5)*100 : 10)}% de tu inversi\xf3n\`;

    document.getElementById('resInversion').textContent = fmt(inv);
    document.getElementById('resIngresos').textContent = fmt(ingresos);
    document.getElementById('resRoas').textContent = roas.toFixed(1) + 'x';
    document.getElementById('resCpv').textContent = fmt(cpv);

    const sem = document.getElementById('semaforo');
    sem.className = 'semaforo ' + semClass;
    document.getElementById('semaforoTitle').textContent = semTitle;
    document.getElementById('semaforoDesc').textContent = semDesc;

    document.getElementById('ctaWaste').textContent = fmt(desperdicio);

    if (roas < 1) {
      document.getElementById('ctaDesc').textContent = 'Tu cuenta necesita intervenci\xf3n urgente. Hablemos hoy — te digo exactamente qu\xe9 est\xe1 fallando y c\xf3mo pararlo.';
    } else if (roas < 2.5) {
      document.getElementById('ctaDesc').textContent = 'Eso no es dinero perdido para siempre. Es dinero mal dirigido que se puede redirigir con la estrategia correcta. Hablemos 15 minutos.';
    } else {
      document.getElementById('ctaDesc').textContent = 'Tienes una base s\xf3lida. El siguiente paso es escalar sin romper lo que funciona — eso requiere una estrategia espec\xedfica.';
    }

    const msg = encodeURIComponent(
      \`Hola Carolina, acabo de calcular que estoy desperdiciando \${fmt(desperdicio)} MXN al mes en Meta Ads con un ROAS de \${roas.toFixed(1)}x. Quiero saber c\xf3mo mejorar esto.\`
    );
    document.getElementById('btnWA').href = \`https://wa.me/522292924043?text=\${msg}\`;
  }

  function restart() {
    document.getElementById('results').style.display = 'none';
    document.getElementById('formCard').style.display = 'block';
  }
</script>
</body>
</html>
`},{id:"benchmark",emoji:"🔥",label:"Ya invierto fuerte y quiero comparar",title:"Benchmark de performance",desc:"Compara tus métricas con el promedio de tu industria y detecta las fugas.",html:`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Benchmark de Performance \xb7 CJB</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --navy: #EEF0FF;
    --blue: #3B82F6;
    --blue-dim: rgba(59,130,246,0.10);
    --white: #FFFFFF;
    --gray: #9CA3AF;
    --light: #1F2937;
    --success: #22C55E;
    --warning: #F59E0B;
    --danger: #EF4444;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #000000;
    color: #EEF0FF;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    min-height: 100vh;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 680px;
    margin: 0 auto;
    padding: 60px 24px 80px;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    margin-bottom: 56px;
  }

  .badge {
    display: inline-block;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 4px;
    color: #3B82F6;
    text-transform: uppercase;
    border: 1px solid rgba(59,130,246,0.30);
    background: transparent;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 24px;
  }

  .header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 6vw, 52px);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 16px;
    letter-spacing: -0.5px;
    color: #EEF0FF;
  }

  .header h1 span { color: #3B82F6; }

  .header p {
    font-size: 15px;
    color: #9CA3AF;
    line-height: 1.6;
    max-width: 480px;
    margin: 0 auto;
  }

  .steps {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 48px;
  }

  .step-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(59,130,246,0.2);
    transition: all 0.3s ease;
  }

  .step-dot.active {
    background: #3B82F6;
    width: 24px;
    border-radius: 4px;
  }

  .step-dot.done {
    background: rgba(59,130,246,0.5);
  }

  .card {
    background: #111827;
    border: 1px solid rgba(59,130,246,0.18);
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  .section-label {
    font-size: 10px;
    letter-spacing: 4px;
    color: #3B82F6;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 32px;
    color: #EEF0FF;
  }

  .input-group {
    margin-bottom: 28px;
  }

  .input-label {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }

  .input-label span {
    font-size: 13px;
    font-weight: 400;
    color: #EEF0FF;
    letter-spacing: 0.3px;
  }

  .input-label .hint {
    font-size: 11px;
    color: #9CA3AF;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-prefix {
    position: absolute;
    left: 16px;
    font-size: 14px;
    color: #9CA3AF;
    font-weight: 400;
    pointer-events: none;
  }

  .input-suffix {
    position: absolute;
    right: 16px;
    font-size: 14px;
    color: #9CA3AF;
    pointer-events: none;
  }

  input[type="number"],
  select {
    width: 100%;
    background: #1F2937;
    border: 1px solid rgba(59,130,246,0.20);
    border-radius: 8px;
    padding: 14px 44px 14px 40px;
    color: #EEF0FF;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    -moz-appearance: textfield;
  }

  select {
    padding: 14px 16px;
    cursor: pointer;
    appearance: none;
    color: #EEF0FF;
  }

  select option {
    background: #111827;
    color: #EEF0FF;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; }

  input:focus, select:focus {
    border-color: #3B82F6;
    background: rgba(59,130,246,0.08);
  }

  input::placeholder { color: rgba(156,163,175,0.5); }

  .divider {
    height: 1px;
    background: rgba(59,130,246,0.15);
    margin: 32px 0;
  }

  .btn-primary {
    width: 100%;
    background: #3B82F6;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-top: 8px;
  }

  .btn-primary:hover {
    background: #2563EB;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37,99,235,0.25);
  }

  .btn-primary:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  .results { display: none; }

  .score-container {
    text-align: center;
    padding: 40px 0 32px;
  }

  .score-ring {
    position: relative;
    width: 160px;
    height: 160px;
    margin: 0 auto 24px;
  }

  .score-ring svg {
    transform: rotate(-90deg);
    width: 160px;
    height: 160px;
  }

  .score-ring .track {
    fill: none;
    stroke: #1F2937;
    stroke-width: 8;
  }

  .score-ring .progress {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    stroke-dasharray: 408;
    stroke-dashoffset: 408;
  }

  .score-number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .score-number .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 300;
    line-height: 1;
    display: block;
    color: #EEF0FF;
  }

  .score-number .out-of {
    font-size: 12px;
    color: #9CA3AF;
    letter-spacing: 2px;
  }

  .score-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 8px;
    color: #EEF0FF;
  }

  .score-sublabel {
    font-size: 13px;
    color: #9CA3AF;
  }

  .metrics-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 32px 0;
  }

  .metric-row {
    display: flex;
    align-items: center;
    gap: 16px;
    background: #1F2937;
    border: 1px solid rgba(59,130,246,0.15);
    border-radius: 8px;
    padding: 16px 20px;
  }

  .metric-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .metric-info { flex: 1; }

  .metric-name {
    font-size: 12px;
    color: #9CA3AF;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  .metric-values {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .metric-your {
    font-size: 18px;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
  }

  .metric-vs {
    font-size: 11px;
    color: #9CA3AF;
  }

  .metric-benchmark {
    font-size: 13px;
    color: #9CA3AF;
  }

  .metric-status {
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 1px;
    padding: 4px 10px;
    border-radius: 100px;
    text-transform: uppercase;
  }

  .status-good { background: rgba(34,197,94,0.15); color: #22C55E; }
  .status-ok { background: rgba(245,158,11,0.15); color: #F59E0B; }
  .status-bad { background: rgba(239,68,68,0.15); color: #EF4444; }

  .insight-box {
    background: rgba(59,130,246,0.10);
    border: 1px solid rgba(59,130,246,0.25);
    border-radius: 16px;
    padding: 24px 28px;
    margin: 24px 0;
  }

  .insight-box .insight-title {
    font-size: 11px;
    letter-spacing: 3px;
    color: #3B82F6;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .insight-box p {
    font-size: 14px;
    line-height: 1.7;
    color: #EEF0FF;
  }

  .cta-section {
    text-align: center;
    padding: 32px 0 0;
    border-top: 1px solid rgba(59,130,246,0.15);
  }

  .cta-section h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 300;
    margin-bottom: 12px;
    line-height: 1.3;
    color: #EEF0FF;
  }

  .cta-section h3 span { color: #3B82F6; }

  .cta-section p {
    font-size: 13px;
    color: #9CA3AF;
    margin-bottom: 28px;
    line-height: 1.6;
  }

  .btn-whatsapp {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #25D366;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.5px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    margin-bottom: 16px;
    width: 100%;
    justify-content: center;
  }

  .btn-whatsapp:hover {
    background: #1fba57;
    transform: translateY(-1px);
    box-shadow: 0 8px 32px rgba(37,211,102,0.25);
  }

  .btn-restart {
    background: transparent;
    border: 1px solid rgba(59,130,246,0.20);
    color: #9CA3AF;
    border-radius: 12px;
    padding: 12px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .btn-restart:hover {
    border-color: #3B82F6;
    color: #3B82F6;
  }

  .footer {
    text-align: center;
    margin-top: 40px;
    font-size: 12px;
    color: rgba(156,163,175,0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-in { animation: fadeUp 0.4s ease forwards; }
  .form-section { transition: opacity 0.3s ease; }

  @media (max-width: 480px) {
    .card { padding: 28px 20px; }
    .score-number .num { font-size: 32px; }
    .container { padding: 40px 16px 60px; }
  }
  </style>
</head>
<body>

<div class="container">

  <div class="header animate-in">
    <div class="badge">CJB \xb7 Herramienta Gratuita</div>
    <h1>Benchmark de<br><span>Performance Meta Ads</span></h1>
    <p>Descubre si tus m\xe9tricas est\xe1n por encima o por debajo del promedio de tu industria — y qu\xe9 est\xe1 frenando tu escalamiento.</p>
  </div>

  <div class="steps" id="stepsIndicator">
    <div class="step-dot active" id="dot0"></div>
    <div class="step-dot" id="dot1"></div>
    <div class="step-dot" id="dot2"></div>
  </div>

  <!-- STEP 1: Industria y presupuesto -->
  <div class="card animate-in" id="step1">
    <div class="section-label">Paso 1 de 3</div>
    <div class="section-title">Tu negocio</div>

    <div class="input-group">
      <div class="input-label">
        <span>Industria</span>
      </div>
      <div class="input-wrapper">
        <select id="industria">
          <option value="" disabled selected>Selecciona tu industria</option>
          <option value="ecommerce">E-commerce / Tienda online</option>
          <option value="servicios">Servicios profesionales</option>
          <option value="restaurantes">Restaurantes / Food</option>
          <option value="salud">Salud y bienestar</option>
          <option value="educacion">Educaci\xf3n / Cursos</option>
          <option value="inmobiliario">Inmobiliario</option>
          <option value="moda">Moda y belleza</option>
          <option value="otro">Otro</option>
        </select>
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>Presupuesto mensual en Meta Ads</span>
        <span class="hint">MXN</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">$</span>
        <input type="number" id="presupuesto" placeholder="5,000" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>Ticket promedio de venta</span>
        <span class="hint">MXN</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">$</span>
        <input type="number" id="ticket" placeholder="800" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <button class="btn-primary" onclick="goStep2()">Continuar →</button>
  </div>

  <!-- STEP 2: M\xe9tricas -->
  <div class="card animate-in" id="step2" style="display:none;">
    <div class="section-label">Paso 2 de 3</div>
    <div class="section-title">Tus m\xe9tricas actuales</div>

    <div class="input-group">
      <div class="input-label">
        <span>ROAS actual</span>
        <span class="hint">Ingreso / Inversi\xf3n</span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="roas" placeholder="2.5" min="0" step="0.1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()" style="padding-left:16px;">
        <span class="input-suffix">x</span>
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>CTR promedio</span>
        <span class="hint">Clicks / Impresiones</span>
      </div>
      <div class="input-wrapper">
        <input type="number" id="ctr" placeholder="1.8" min="0" step="0.01" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()" style="padding-left:16px;">
        <span class="input-suffix">%</span>
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>CPM promedio</span>
        <span class="hint">Costo por mil impresiones</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">$</span>
        <input type="number" id="cpm" placeholder="120" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div class="input-group">
      <div class="input-label">
        <span>CPL / CPA actual</span>
        <span class="hint">Costo por lead o conversi\xf3n</span>
      </div>
      <div class="input-wrapper">
        <span class="input-prefix">$</span>
        <input type="number" id="cpl" placeholder="350" min="0" step="1" autocomplete="off" 
onwheel="this.blur()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown')event.preventDefault()">
      </div>
    </div>

    <div style="display:flex; gap:12px; margin-top:8px;">
      <button class="btn-restart" onclick="goStep1()" style="width:auto; padding:12px 24px;">← Atr\xe1s</button>
      <button class="btn-primary" onclick="calcular()" style="margin-top:0;">Ver mi benchmark →</button>
    </div>
  </div>

  <!-- RESULTS -->
  <div class="card results animate-in" id="resultsCard">
    <div class="score-container">
      <div class="score-ring">
        <svg viewBox="0 0 160 160">
          <circle class="track" cx="80" cy="80" r="65"/>
          <circle class="progress" id="scoreCircle" cx="80" cy="80" r="65"/>
        </svg>
        <div class="score-number">
          <span class="num" id="scoreNum">0</span>
          <span class="out-of">/ 100</span>
        </div>
      </div>
      <div class="score-label" id="scoreLabel">—</div>
      <div class="score-sublabel" id="scoreSubLabel">—</div>
    </div>

    <div class="divider"></div>

    <div class="metrics-grid" id="metricsGrid"></div>

    <div class="insight-box" id="insightBox"></div>

    <div class="cta-section">
      <h3>Tu score tiene<br><span id="ctaHighlight">oportunidades concretas</span></h3>
      <p id="ctaText">Encontr\xe9 los puntos cr\xedticos en tu cuenta. Hablemos 15 minutos y te explico exactamente qu\xe9 cambiar\xeda.</p>
      <a id="btnWhatsapp" class="btn-whatsapp" href="#" target="_blank">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Hablar con Carolina ahora
      </a>
      <button class="btn-restart" onclick="restart()">Hacer otro benchmark</button>
    </div>
  </div>

  <div class="footer">CJB by Carolina Betancourt \xb7 Performance Marketing & Paid Media Strategy</div>

</div>

<script>
  // Benchmarks por industria
  const benchmarks = {
    ecommerce:    { roas: 3.5, ctr: 2.0, cpm: 100, cpl: 200 },
    servicios:    { roas: 4.0, ctr: 1.5, cpm: 80,  cpl: 300 },
    restaurantes: { roas: 2.5, ctr: 1.8, cpm: 90,  cpl: 150 },
    salud:        { roas: 3.0, ctr: 1.6, cpm: 110, cpl: 280 },
    educacion:    { roas: 4.5, ctr: 2.2, cpm: 95,  cpl: 250 },
    inmobiliario: { roas: 5.0, ctr: 1.2, cpm: 150, cpl: 600 },
    moda:         { roas: 3.0, ctr: 2.5, cpm: 85,  cpl: 180 },
    otro:         { roas: 3.0, ctr: 1.8, cpm: 100, cpl: 300 },
  };

  function updateDots(active) {
    for (let i = 0; i < 3; i++) {
      const d = document.getElementById('dot' + i);
      d.className = 'step-dot';
      if (i < active) d.classList.add('done');
      if (i === active) d.classList.add('active');
    }
  }

  function goStep2() {
    const ind = document.getElementById('industria').value;
    const pres = document.getElementById('presupuesto').value;
    const tick = document.getElementById('ticket').value;
    if (!ind || !pres || !tick) {
      alert('Por favor completa todos los campos.');
      return;
    }
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    updateDots(1);
  }

  function goStep1() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    updateDots(0);
  }

  function calcular() {
    const industria = document.getElementById('industria').value;
    const roas = parseFloat(document.getElementById('roas').value);
    const ctr  = parseFloat(document.getElementById('ctr').value);
    const cpm  = parseFloat(document.getElementById('cpm').value);
    const cpl  = parseFloat(document.getElementById('cpl').value);

    if (isNaN(roas) || isNaN(ctr) || isNaN(cpm) || isNaN(cpl)) {
      alert('Por favor completa todas las m\xe9tricas.');
      return;
    }

    const bench = benchmarks[industria];
    const presupuesto = parseFloat(document.getElementById('presupuesto').value);
    const ticket = parseFloat(document.getElementById('ticket').value);

    // Score por m\xe9trica (0-25 cada una)
    const scoreRoas = Math.min(25, (roas / bench.roas) * 25);
    const scoreCtr  = Math.min(25, (ctr  / bench.ctr)  * 25);
    const scoreCpm  = Math.min(25, (bench.cpm / cpm)   * 25); // menor es mejor
    const scoreCpl  = Math.min(25, (bench.cpl / cpl)   * 25); // menor es mejor

    const totalScore = Math.round(scoreRoas + scoreCtr + scoreCpm + scoreCpl);

    // Score label
    let scoreLabel, scoreSub, scoreColor;
    if (totalScore >= 80) {
      scoreLabel = 'Rendimiento Alto'; scoreSub = 'Tus campa\xf1as est\xe1n por encima del promedio.'; scoreColor = '#22C55E';
    } else if (totalScore >= 55) {
      scoreLabel = 'Rendimiento Medio'; scoreSub = 'Hay oportunidades claras de mejora.'; scoreColor = '#F59E0B';
    } else {
      scoreLabel = 'Rendimiento Bajo'; scoreSub = 'Tu inversi\xf3n no est\xe1 rindiendo lo que deber\xeda.'; scoreColor = '#EF4444';
    }

    // Render results
    document.getElementById('step2').style.display = 'none';
    const rc = document.getElementById('resultsCard');
    rc.style.display = 'block';
    updateDots(2);

    // Score ring animation
    document.getElementById('scoreNum').textContent = totalScore;
    document.getElementById('scoreLabel').textContent = scoreLabel;
    document.getElementById('scoreLabel').style.color = scoreColor;
    document.getElementById('scoreSubLabel').textContent = scoreSub;

    const circle = document.getElementById('scoreCircle');
    circle.style.stroke = scoreColor;
    setTimeout(() => {
      const offset = 408 - (totalScore / 100) * 408;
      circle.style.strokeDashoffset = offset;
    }, 100);

    // Metrics grid
    const metricData = [
      { name: 'ROAS', your: roas + 'x', bench: bench.roas + 'x', score: scoreRoas, icon: '📈', fmt: (v) => v + 'x' },
      { name: 'CTR',  your: ctr + '%',  bench: bench.ctr + '%',  score: scoreCtr,  icon: '👆', fmt: (v) => v + '%' },
      { name: 'CPM',  your: '$' + cpm,  bench: '$' + bench.cpm,  score: scoreCpm,  icon: '👁', fmt: (v) => '$' + v },
      { name: 'CPL / CPA', your: '$' + cpl, bench: '$' + bench.cpl, score: scoreCpl, icon: '🎯', fmt: (v) => '$' + v },
    ];

    const grid = document.getElementById('metricsGrid');
    grid.innerHTML = '';
    metricData.forEach(m => {
      const pct = (m.score / 25) * 100;
      const status = pct >= 80 ? 'good' : pct >= 50 ? 'ok' : 'bad';
      const statusLabel = pct >= 80 ? 'Bien' : pct >= 50 ? 'Mejorable' : 'Cr\xedtico';
      const bgColor = pct >= 80 ? 'rgba(34,197,94,0.1)' : pct >= 50 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)';
      grid.innerHTML += \`
        <div class="metric-row">
          <div class="metric-icon" style="background:\${bgColor}">\${m.icon}</div>
          <div class="metric-info">
            <div class="metric-name">\${m.name}</div>
            <div class="metric-values">
              <span class="metric-your" style="color:\${pct>=80?'#22C55E':pct>=50?'#F59E0B':'#EF4444'}">\${m.your}</span>
              <span class="metric-vs">vs</span>
              <span class="metric-benchmark">promedio \${m.bench}</span>
            </div>
          </div>
          <span class="metric-status status-\${status}">\${statusLabel}</span>
        </div>\`;
    });

    // Insight
    const weakMetrics = metricData.filter(m => (m.score / 25) * 100 < 50).map(m => m.name);
    let insightText = '';
    if (weakMetrics.length === 0) {
      insightText = 'Tus m\xe9tricas est\xe1n s\xf3lidas. El siguiente paso es escalar de forma inteligente sin romper el aprendizaje de tus campa\xf1as.';
    } else if (weakMetrics.includes('ROAS')) {
      insightText = \`Tu ROAS de \${roas}x est\xe1 por debajo del promedio de la industria (\${bench.roas}x). Esto generalmente indica problemas en la estructura de campa\xf1as, audiencias fr\xedas sin calificar, o creativos que no conectan con el dolor real del cliente.\`;
    } else if (weakMetrics.includes('CPL / CPA')) {
      insightText = \`Tu costo por conversi\xf3n de $\${cpl} est\xe1 \${Math.round(((cpl - bench.cpl) / bench.cpl) * 100)}% por encima del promedio. Cada venta te est\xe1 costando m\xe1s de lo que deber\xeda — hay fugas en tu funnel que se pueden identificar y cerrar.\`;
    } else {
      insightText = \`Las m\xe9tricas m\xe1s d\xe9biles son: \${weakMetrics.join(', ')}. Estos son puntos de fuga concretos donde tu presupuesto se est\xe1 desperdiciando sin generar el retorno que deber\xeda.\`;
    }

    document.getElementById('insightBox').innerHTML = \`
      <div class="insight-title">Diagn\xf3stico</div>
      <p>\${insightText}</p>\`;

    // CTA personalizado
    const perdida = presupuesto && ticket ? Math.round(presupuesto * (1 - totalScore / 100)) : null;

    if (totalScore < 55) {
      document.getElementById('ctaHighlight').textContent = \`~$\${perdida ? perdida.toLocaleString() : '?'} MXN que podr\xedas recuperar\`;
      document.getElementById('ctaText').textContent = 'Encontr\xe9 los puntos cr\xedticos de tu cuenta. Hablemos 15 minutos y te explico exactamente qu\xe9 cambiar\xeda para mejorar este score.';
    } else if (totalScore < 80) {
      document.getElementById('ctaHighlight').textContent = 'margen de escalamiento real';
      document.getElementById('ctaText').textContent = 'Tus bases est\xe1n bien pero hay optimizaciones concretas que pueden mover tus n\xfameros. Te explico cu\xe1les en 15 minutos.';
    } else {
      document.getElementById('ctaHighlight').textContent = 'potencial de escalamiento';
      document.getElementById('ctaText').textContent = 'Tienes m\xe9tricas s\xf3lidas. El siguiente nivel es escalar sin perder eficiencia — eso requiere una estrategia espec\xedfica.';
    }

    // WhatsApp message
    const msg = encodeURIComponent(\`Hola Carolina, acabo de hacer el Benchmark de Performance Meta Ads y obtuve un score de \${totalScore}/100. Me interesa saber c\xf3mo mejorar mis m\xe9tricas.\`);
    document.getElementById('btnWhatsapp').href = \`https://wa.me/522292924043?text=\${msg}\`;
  }

  function restart() {
    document.getElementById('resultsCard').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    updateDots(0);
    document.getElementById('scoreCircle').style.strokeDashoffset = 408;
  }
</script>
</body>
</html>
`}];function s1({html:e,onHeight:t}){let i=(0,o.useRef)(null),n=(0,o.useCallback)(()=>{try{let e=i.current?.contentDocument;e?.body&&t(e.body.scrollHeight)}catch{t(900)}},[t]);return(0,o.useEffect)(()=>{let e=e=>{e.data?.type==="resize"&&"number"==typeof e.data.height&&t(e.data.height)};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[t]),(0,s.jsx)("iframe",{ref:i,srcDoc:e,onLoad:n,style:{width:"100%",border:"none",display:"block",minHeight:500,borderRadius:12},sandbox:"allow-scripts allow-popups allow-popups-to-escape-sandbox"})}function s2(){let[e,t]=(0,o.useState)(null),i=(0,o.useRef)(null);(0,o.useEffect)(()=>{e&&i.current&&setTimeout(()=>i.current?.scrollIntoView({behavior:"smooth",block:"center"}),550)},[e]);let[n,r]=(0,o.useState)({}),a=(0,o.useCallback)((e,t)=>{r(i=>({...i,[e]:t}))},[]);return(0,s.jsx)("section",{style:{background:"#000000",padding:"6rem 2rem"},children:(0,s.jsxs)("div",{style:{maxWidth:1100,margin:"0 auto"},children:[(0,s.jsxs)(sQ,{children:[(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.7rem",letterSpacing:"0.25em",textTransform:"uppercase",color:sZ,marginBottom:"0.75rem",borderLeft:"3px solid "+sZ,paddingLeft:"0.75rem"},children:"Herramientas gratuitas"}),(0,s.jsx)("h2",{style:{fontFamily:"var(--font-cormorant)",fontWeight:400,fontSize:"clamp(1.8rem,4vw,2.8rem)",color:sJ,lineHeight:1.15,marginBottom:"0.5rem"},children:"Empieza aquí. Gratis."}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"1.05rem",color:"rgba(255,255,255,0.7)",lineHeight:1.7,maxWidth:600,marginBottom:"3rem"},children:"Tres herramientas para saber exactamente dónde está tu problema — antes de hablar con alguien."})]}),(0,s.jsx)("div",{className:"herramientas-grid",style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1.5rem"},children:s0.map(i=>{let n=e===i.id;return(0,s.jsx)(sQ,{children:(0,s.jsxs)("div",{style:{background:n?"rgba(46,95,138,0.06)":"#0B2A5A",border:n?"2px solid rgba(46,95,138,0.4)":"1px solid rgba(46,95,138,0.15)",borderRadius:16,padding:"2rem 1.5rem",display:"flex",flexDirection:"column",height:"100%",transition:"all 0.3s ease",cursor:"pointer"},onClick:()=>t(n?null:i.id),children:[(0,s.jsx)("span",{style:{fontSize:"1.8rem",marginBottom:"0.75rem"},children:i.emoji}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.75rem",letterSpacing:"0.1em",textTransform:"uppercase",color:sZ,marginBottom:"0.5rem"},children:i.label}),(0,s.jsx)("h3",{style:{fontFamily:"var(--font-cormorant)",fontWeight:500,fontSize:"1.25rem",color:sJ,marginBottom:"0.5rem",lineHeight:1.2},children:i.title}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"0.85rem",color:n?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.6)",lineHeight:1.6,flex:1},children:i.desc}),(0,s.jsxs)("button",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:500,fontSize:"0.8rem",color:sJ,background:sZ,border:"none",borderRadius:100,padding:"0.65rem 1.2rem",marginTop:"1.2rem",cursor:"pointer",letterSpacing:"0.06em"},onClick:e=>{e.stopPropagation(),t(n?null:i.id)},children:[n?"Cerrar":"Usar herramienta"," →"]})]})},i.id)})}),(0,s.jsx)(sK,{children:e&&(0,s.jsx)(sL.div,{ref:i,initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.4,ease:"easeInOut"},style:{overflow:"hidden",marginTop:"2rem"},children:(0,s.jsxs)("div",{style:{background:"#F5F6FA",border:"1px solid rgba(46,95,138,0.2)",borderRadius:16,padding:"1.5rem",maxWidth:720,margin:"0 auto"},children:[(0,s.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"},children:[(0,s.jsxs)("h3",{style:{fontFamily:"var(--font-cormorant)",fontWeight:500,fontSize:"1.3rem",color:"#0B2A5A"},children:[s0.find(t=>t.id===e)?.emoji," ",s0.find(t=>t.id===e)?.title]}),(0,s.jsx)("button",{onClick:()=>t(null),style:{background:"transparent",border:"1px solid #D0D5E8",borderRadius:8,padding:"0.4rem 1rem",fontFamily:"'DM Sans', sans-serif",fontSize:"0.75rem",color:"#8A8FA8",cursor:"pointer",letterSpacing:"0.06em",textTransform:"uppercase"},children:"Cerrar ✕"})]}),(0,s.jsx)(s1,{html:s0.find(t=>t.id===e).html,onHeight:t=>a(e,t)},e)]})})})]})})}function s5(e,t){let i,n=()=>{let{currentTime:n}=t,r=(null===n?0:n.value)/100;i!==r&&e(r),i=r};return eM.preUpdate(n,!0),()=>ej(n)}function s3(e){return!("u"<typeof window)&&(e?eQ():eJ())}let s4=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),s8={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function s6(e,t,i,n){let r=i[t],{length:s,position:o}=s8[t],a=r.current,l=i.time;r.current=Math.abs(e[`scroll${o}`]),r.scrollLength=e[`scroll${s}`]-e[`client${s}`],r.offset.length=0,r.offset[0]=0,r.offset[1]=r.scrollLength,r.progress=np(0,r.scrollLength,r.current);let d=n-l;r.velocity=d>50?0:ts(r.current-a,d)}let s9={start:0,center:.5,end:1};function s7(e,t,i=0){let n=0;if(e in s9&&(e=s9[e]),"string"==typeof e){let t=parseFloat(e);e.endsWith("px")?n=t:e.endsWith("%")?e=t/100:e.endsWith("vw")?n=t/100*document.documentElement.clientWidth:e.endsWith("vh")?n=t/100*document.documentElement.clientHeight:e=t}return"number"==typeof e&&(n=t*e),i+n}let oe=[0,0],ot=[[0,0],[1,1]],oi={x:0,y:0},on=new WeakMap,or=new WeakMap,os=new WeakMap,oo=new WeakMap,oa=new WeakMap,ol=e=>e===document.scrollingElement?window:e;function od(e,{container:t=document.scrollingElement,trackContentSize:i=!1,...n}={}){if(!t)return eF;let r=os.get(t);r||(r=new Set,os.set(t,r));let s=function(e,t,i,n={}){return{measure:t=>{!function(e,t=e,i){if(i.x.targetOffset=0,i.y.targetOffset=0,t!==e){let n=t;for(;n&&n!==e;)i.x.targetOffset+=n.offsetLeft,i.y.targetOffset+=n.offsetTop,n=n.offsetParent}i.x.targetLength=t===e?t.scrollWidth:t.clientWidth,i.y.targetLength=t===e?t.scrollHeight:t.clientHeight,i.x.containerLength=e.clientWidth,i.y.containerLength=e.clientHeight}(e,n.target,i),s6(e,"x",i,t),s6(e,"y",i,t),i.time=t,(n.offset||n.target)&&function(e,t,i){let{offset:n=ot}=i,{target:r=e,axis:s="y"}=i,o="y"===s?"height":"width",a=r!==e?function(e,t){let i={x:0,y:0},n=e;for(;n&&n!==t;)if(sS(n))i.x+=n.offsetLeft,i.y+=n.offsetTop,n=n.offsetParent;else if("svg"===n.tagName){let e=n.getBoundingClientRect(),t=(n=n.parentElement).getBoundingClientRect();i.x+=e.left-t.left,i.y+=e.top-t.top}else if(n instanceof SVGGraphicsElement){let{x:e,y:t}=n.getBBox();i.x+=e,i.y+=t;let r=null,s=n.parentNode;for(;!r;)"svg"===s.tagName&&(r=s),s=n.parentNode;n=r}else break;return i}(r,e):oi,l=r===e?{width:e.scrollWidth,height:e.scrollHeight}:"getBBox"in r&&"svg"!==r.tagName?r.getBBox():{width:r.clientWidth,height:r.clientHeight},c={width:e.clientWidth,height:e.clientHeight};t[s].offset.length=0;let u=!t[s].interpolate,p=n.length;for(let e=0;e<p;e++){let i=function(e,t,i,n){let r=Array.isArray(e)?e:oe,s=0;return"number"==typeof e?r=[e,e]:"string"==typeof e&&(r=(e=e.trim()).includes(" ")?e.split(" "):[e,s9[e]?e:"0"]),(s=s7(r[0],i,n))-s7(r[1],t)}(n[e],c[o],l[o],a[s]);u||i===t[s].interpolatorOffsets[e]||(u=!0),t[s].offset[e]=i}u&&(t[s].interpolate=nh(t[s].offset,nm(n),{clamp:!1}),t[s].interpolatorOffsets=[...t[s].offset]),t[s].progress=d(0,1,t[s].interpolate(t[s].current))}(e,i,n)},notify:()=>t(i)}}(t,e,{time:0,x:s4(),y:s4()},n);if(r.add(s),!on.has(t)){let e=()=>{for(let e of r)e.measure(eP.timestamp);eM.preUpdate(i)},i=()=>{for(let e of r)e.notify()},n=()=>eM.read(e);on.set(t,n);let s=ol(t);window.addEventListener("resize",n),t!==document.documentElement&&or.set(t,n9(t,n)),s.addEventListener("scroll",n),n()}if(i&&!oa.has(t)){let e=on.get(t),i={width:t.scrollWidth,height:t.scrollHeight};oo.set(t,i);let n=eM.read(()=>{let n=t.scrollWidth,r=t.scrollHeight;(i.width!==n||i.height!==r)&&(e(),i.width=n,i.height=r)},!0);oa.set(t,n)}let o=on.get(t);return eM.read(o,!1,!0),()=>{ej(o);let e=os.get(t);if(!e||(e.delete(s),e.size))return;let i=on.get(t);on.delete(t),i&&(ol(t).removeEventListener("scroll",i),or.get(t)?.(),window.removeEventListener("resize",i));let n=oa.get(t);n&&(ej(n),oa.delete(t)),oo.delete(t)}}let oc=[[[[0,1],[1,1]],"entry"],[[[0,0],[1,0]],"exit"],[[[1,0],[0,1]],"cover"],[ot,"contain"]],ou={start:0,end:1};function op(e){if(!e)return{rangeStart:"contain 0%",rangeEnd:"contain 100%"};for(let[t,i]of oc)if(function(e,t){let i=function(e){if(2!==e.length)return;let t=[];for(let i of e)if(Array.isArray(i))t.push(i);else{if("string"!=typeof i)return;let e=function(e){let t=e.trim().split(/\s+/);if(2!==t.length)return;let i=ou[t[0]],n=ou[t[1]];if(void 0!==i&&void 0!==n)return[i,n]}(i);if(!e)return;t.push(e)}return t}(e);if(!i)return!1;for(let e=0;e<2;e++){let n=i[e],r=t[e];if(n[0]!==r[0]||n[1]!==r[1])return!1}return!0}(e,t))return{rangeStart:`${i} 0%`,rangeEnd:`${i} 100%`}}let oh=new Map;function om(e){let t={value:0},i=od(i=>{t.value=100*i[e.axis].progress},e);return{currentTime:t,cancel:i}}function of({source:e,container:t,...i}){let{axis:n}=i;e&&(t=e);let r=oh.get(t);r||(r=new Map,oh.set(t,r));let s=i.target??"self",o=r.get(s);o||(o={},r.set(s,o));let a=n+(i.offset??[]).join(",");return o[a]||(i.target&&s3(i.target)?op(i.offset)?o[a]=new ViewTimeline({subject:i.target,axis:n}):o[a]=om({container:t,...i}):s3()?o[a]=new ScrollTimeline({source:t,axis:n}):o[a]=om({container:t,...i})),o[a]}function og(e,{axis:t="y",container:i=document.scrollingElement,...n}={}){var r,s;let o,a,l;if(!i)return eF;let d={axis:t,container:i,...n};return"function"==typeof e?(r=e,s=d,2===r.length?od(e=>{r(e[s.axis].progress,e)},s):s5(r,of(s))):(o=of(d),a=d.target?op(d.offset):void 0,l=d.target?s3(d.target)&&!!a:s3(),e.attachTimeline({timeline:l?o:void 0,...a&&l&&{rangeStart:a.rangeStart,rangeEnd:a.rangeEnd},observe:e=>(e.pause(),s5(t=>{e.time=e.iterationDuration*t},o))}))}let ox=()=>({scrollX:tl(0),scrollY:tl(0),scrollXProgress:tl(0),scrollYProgress:tl(0)}),oy=e=>!!e&&!e.current;function ov(e,t,i,n){return{factory:r=>og(r,{...t,axis:e,container:i?.current||void 0,target:n?.current||void 0}),times:[0,1],keyframes:[0,1],ease:e=>e,duration:1}}function ob(e,t){let i=function(e){let t=ip(()=>tl(e)),{isStatic:i}=(0,o.useContext)(ie);if(i){let[,i]=(0,o.useState)(e);(0,o.useEffect)(()=>t.on("change",i),[])}return t}(t()),n=()=>i.set(t());return n(),iE(()=>{let t=()=>eM.preRender(n,!1,!0),i=e.map(e=>e.on("change",t));return()=>{i.forEach(e=>e()),ej(n)}}),i}function ow(e,t){let i=ip(()=>[]);return ob(e,()=>{i.length=0;let n=e.length;for(let t=0;t<n;t++)i[t]=e[t].get();return t(i)})}function oS(){let[e,t]=(0,o.useState)(!1);(0,o.useEffect)(()=>{t(window.innerWidth<768);let e=()=>t(window.innerWidth<768);return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]);let i=[{i:"🎨",t:"Branding & Identidad",x:"Naming, logo, paleta, tipografía y manual de marca. Una marca que no se ve profesional no se compra."},{i:"💻",t:"Diseño Web",x:"Landing pages y sitios web orientados a conversión. No solo bonitos — diseñados para vender."},{i:"📷",t:"Fotografía",x:"De producto y marca personal. El contenido visual es el 70% del resultado de un anuncio."},{i:"📊",t:"Estrategia Digital",x:"Auditoría de marca, análisis de competencia y plan de marketing basado en datos reales."},{i:"🧾",t:"Contabilidad",x:"Para negocios en crecimiento que necesitan orden fiscal. En alianza con especialista certificada."}];return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("section",{id:"servicios",style:{background:"#F5F6FA",padding:e?"60px 24px":"100px 0"},children:(0,s.jsxs)("div",{style:{maxWidth:960,margin:"0 auto",textAlign:"center"},children:[(0,s.jsx)("p",{style:{fontFamily:"var(--font-jost)",fontSize:10,letterSpacing:4,textTransform:"uppercase",color:"#4A7CF7",marginBottom:16},children:"LO QUE HAGO"}),(0,s.jsxs)("h2",{style:{fontFamily:"var(--font-cormorant)",fontWeight:300,fontSize:e?32:42,lineHeight:1.1,color:"#0A0F1E",marginBottom:18},children:["Un servicio principal.",(0,s.jsx)("br",{}),"Todo lo que necesitas alrededor."]}),(0,s.jsx)("p",{style:{fontFamily:"var(--font-jost)",fontWeight:300,fontSize:16,color:"rgba(10,15,30,0.7)",maxWidth:520,margin:"0 auto",lineHeight:1.85},children:"Mi especialidad es Meta Ads — ahí es donde están mis mejores resultados. El resto de servicios existe para que la estrategia funcione de forma completa."})]})}),(0,s.jsx)("section",{style:{background:"#4A7CF7",padding:e?"60px 24px":"100px 0"},children:(0,s.jsxs)("div",{style:{maxWidth:960,margin:"0 auto"},children:[(0,s.jsx)("p",{style:{fontFamily:"var(--font-jost)",fontSize:10,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.7)",marginBottom:16},children:"CORE SERVICE"}),(0,s.jsx)("h2",{style:{fontFamily:"var(--font-cormorant)",fontWeight:300,fontSize:e?32:42,lineHeight:1.1,color:"#FFFFFF",marginBottom:18},children:"Paid Media & Meta Ads"}),(0,s.jsx)("p",{style:{fontFamily:"var(--font-jost)",fontWeight:300,fontSize:16,color:"rgba(255,255,255,0.75)",maxWidth:520,lineHeight:1.85,marginBottom:40},children:"Diseño y gestiono sistemas de inversión publicitaria en Meta que escalan marcas con rentabilidad documentada. No se trata de prender anuncios — se trata de construir un sistema que aprende y mejora cada ciclo."}),(0,s.jsx)("div",{style:{display:"grid",gridTemplateColumns:e?"1fr":"1fr 1fr",gap:16,marginBottom:32},children:[{t:"Gestión completa de Meta Ads",s:"Retainer mensual"},{t:"Auditoría Meta Business Suite",s:"Entregable en 48h"},{t:"Setup de cuenta desde cero",s:"Servicio único"},{t:"Estrategia de Paid Media",s:"Consultoría"}].map((e,t)=>(0,s.jsxs)("div",{style:{background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"20px 24px"},children:[(0,s.jsx)("div",{style:{fontFamily:"var(--font-jost)",fontWeight:500,fontSize:15,color:"#FFFFFF",marginBottom:4},children:e.t}),(0,s.jsx)("div",{style:{fontFamily:"var(--font-jost)",fontSize:13,color:"rgba(255,255,255,0.6)"},children:e.s})]},t))}),(0,s.jsx)("a",{href:"https://wa.me/522292924043?text=Hola%20Carolina%2C%20invierto%20en%20Meta%20Ads%20pero%20siento%20que%20algo%20no%20est%C3%A1%20funcionando%20bien.%20Me%20gustar%C3%ADa%20saber%20qu%C3%A9%20est%C3%A1%20frenando%20mis%20resultados.",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-block",background:"#FFFFFF",color:"#4A7CF7",fontFamily:"var(--font-jost)",fontWeight:500,fontSize:13,letterSpacing:1.5,textTransform:"uppercase",padding:"14px 28px",borderRadius:3,textDecoration:"none",transition:"all 0.3s"},onMouseEnter:function(e){e.currentTarget.style.transform="translateY(-2px)",e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.15)"},onMouseLeave:function(e){e.currentTarget.style.transform="none",e.currentTarget.style.boxShadow="none"},children:"Quiero saber qué está fallando en mi cuenta"})]})}),(0,s.jsx)("section",{style:{background:"#F5F6FA",padding:e?"60px 24px":"100px 0"},children:(0,s.jsxs)("div",{style:{maxWidth:960,margin:"0 auto"},children:[(0,s.jsx)("h3",{style:{fontFamily:"var(--font-cormorant)",fontWeight:300,fontSize:e?24:30,color:"#0A0F1E",marginBottom:12},children:"Servicios complementarios"}),(0,s.jsx)("p",{style:{fontFamily:"var(--font-jost)",fontWeight:300,fontSize:16,color:"rgba(10,15,30,0.5)",marginBottom:40},children:"Para que la estrategia tenga todo lo que necesita para funcionar."}),(0,s.jsx)("div",{style:{display:"grid",gridTemplateColumns:e?"1fr":"repeat(3, 1fr)",gap:20},children:i.slice(0,3).map((e,t)=>(0,s.jsxs)("div",{style:{background:"#FFFFFF",border:"1px solid #E2E6F0",borderRadius:16,padding:28,transition:"all 0.3s",cursor:"default"},onMouseEnter:function(e){e.currentTarget.style.transform="translateY(-4px)",e.currentTarget.style.boxShadow="0 8px 24px rgba(74,124,247,0.1)"},onMouseLeave:function(e){e.currentTarget.style.transform="none",e.currentTarget.style.boxShadow="none"},children:[(0,s.jsx)("div",{style:{fontSize:28,marginBottom:12},children:e.i}),(0,s.jsx)("div",{style:{fontFamily:"var(--font-jost)",fontWeight:500,fontSize:16,color:"#0A0F1E",marginBottom:8},children:e.t}),(0,s.jsx)("div",{style:{fontFamily:"var(--font-jost)",fontWeight:300,fontSize:14,color:"rgba(10,15,30,0.6)",lineHeight:1.7},children:e.x})]},t))}),(0,s.jsx)("div",{style:{display:"grid",gridTemplateColumns:e?"1fr":"repeat(2, 1fr)",gap:20,maxWidth:e?"100%":"66.666%",margin:"20px auto 0",justifyContent:"center"},children:i.slice(3).map((e,t)=>(0,s.jsxs)("div",{style:{background:"#FFFFFF",border:"1px solid #E2E6F0",borderRadius:16,padding:28,transition:"all 0.3s",cursor:"default"},onMouseEnter:function(e){e.currentTarget.style.transform="translateY(-4px)",e.currentTarget.style.boxShadow="0 8px 24px rgba(74,124,247,0.1)"},onMouseLeave:function(e){e.currentTarget.style.transform="none",e.currentTarget.style.boxShadow="none"},children:[(0,s.jsx)("div",{style:{fontSize:28,marginBottom:12},children:e.i}),(0,s.jsx)("div",{style:{fontFamily:"var(--font-jost)",fontWeight:500,fontSize:16,color:"#0A0F1E",marginBottom:8},children:e.t}),(0,s.jsx)("div",{style:{fontFamily:"var(--font-jost)",fontWeight:300,fontSize:14,color:"rgba(10,15,30,0.6)",lineHeight:1.7},children:e.x})]},t+3))})]})}),(0,s.jsx)("section",{style:{background:"#0A0F1E",padding:e?"60px 24px":"100px 0"},children:(0,s.jsxs)("div",{style:{maxWidth:960,margin:"0 auto",textAlign:"center"},children:[(0,s.jsx)("p",{style:{fontFamily:"var(--font-jost)",fontSize:10,letterSpacing:4,textTransform:"uppercase",color:"#4A7CF7",marginBottom:16},children:"PAQUETES"}),(0,s.jsxs)("h2",{style:{fontFamily:"var(--font-cormorant)",fontWeight:300,fontSize:e?32:42,lineHeight:1.1,color:"#FFFFFF",marginBottom:18},children:["Todo junto,",(0,s.jsx)("br",{}),"con coherencia estratégica."]}),(0,s.jsx)("p",{style:{fontFamily:"var(--font-jost)",fontWeight:300,fontSize:16,color:"rgba(255,255,255,0.5)",maxWidth:520,margin:"0 auto 60px",lineHeight:1.85},children:"Para cuando necesitas más de un servicio funcionando como sistema."}),(0,s.jsx)("div",{style:{display:"grid",gridTemplateColumns:e?"1fr":"1fr 1fr 1fr",gap:24,textAlign:"left"},children:[{n:"ARRANQUE",d:"Para negocios que empiezan y quieren hacerlo bien desde el día uno.",items:["Identidad visual completa","Landing page de conversión","Setup de Meta Ads","Primera campaña activada","Sesión de estrategia"],f:!1,b:null},{n:"ESCALA",d:"Para negocios que ya invierten en Meta Ads pero no están viendo los resultados que deberían.",items:["Auditoría completa Meta Business","Rediseño de estructura de campañas","Gestión mensual Meta Ads","Reporte con proyección de escalamiento"],f:!0,b:"MÁS SOLICITADO"},{n:"PRESENCIA TOTAL",d:"Marca, web y publicidad funcionando como un sistema coherente y medible.",items:["Identidad visual completa","Sitio web completo","Fotografía de producto o marca","Estrategia de Paid Media","Gestión mensual Meta Ads incluida"],f:!1,b:null}].map((e,t)=>(0,s.jsxs)("div",{style:{background:e.f?"rgba(74,124,247,0.08)":"rgba(255,255,255,0.05)",border:e.f?"1px solid #4A7CF7":"1px solid rgba(255,255,255,0.1)",borderRadius:16,padding:"32px 28px"},children:[e.b&&(0,s.jsx)("div",{style:{fontFamily:"var(--font-jost)",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#4A7CF7",marginBottom:12,background:"rgba(74,124,247,0.15)",display:"inline-block",padding:"4px 12px",borderRadius:100},children:e.b}),(0,s.jsx)("h4",{style:{fontFamily:"var(--font-jost)",fontWeight:600,fontSize:20,color:"#FFFFFF",marginBottom:12,letterSpacing:2},children:e.n}),(0,s.jsx)("p",{style:{fontFamily:"var(--font-jost)",fontWeight:300,fontSize:14,color:"rgba(255,255,255,0.6)",lineHeight:1.7,marginBottom:24},children:e.d}),e.items.map(e=>(0,s.jsxs)("div",{style:{fontFamily:"var(--font-jost)",fontSize:14,color:"rgba(255,255,255,0.7)",marginBottom:8},children:[(0,s.jsx)("span",{style:{color:"#4A7CF7",marginRight:8},children:"→"}),e]},e))]},t))}),(0,s.jsxs)("div",{style:{marginTop:48},children:[(0,s.jsx)("p",{style:{fontFamily:"var(--font-jost)",fontWeight:300,fontSize:16,color:"rgba(255,255,255,0.5)",marginBottom:20},children:"¿No sabes cuál necesitas? Hablemos."}),(0,s.jsx)("a",{href:"https://wa.me/522292924043?text=Hola%20Carolina%2C%20invierto%20en%20Meta%20Ads%20pero%20siento%20que%20algo%20no%20est%C3%A1%20funcionando%20bien.%20Me%20gustar%C3%ADa%20saber%20qu%C3%A9%20est%C3%A1%20frenando%20mis%20resultados.",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-block",background:"#3B82F6",color:"#FFFFFF",fontFamily:"var(--font-jost)",fontWeight:500,fontSize:11,letterSpacing:1.5,textTransform:"uppercase",padding:"14px 28px",borderRadius:3,textDecoration:"none",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},onMouseEnter:function(e){e.currentTarget.style.background="#2563EB",e.currentTarget.style.transform="translateY(-2px)",e.currentTarget.style.boxShadow="0 8px 24px rgba(37,99,235,0.25)"},onMouseLeave:function(e){e.currentTarget.style.background="#3B82F6",e.currentTarget.style.transform="none",e.currentTarget.style.boxShadow="none"},children:"Agendar diagnóstico gratuito"})]})]})})]})}let oT="#000000",oE="#0B2A5A",oF="#1E3A8A",oC="#3B82F6",ok="#C0C5CE",oA="#111827",oM="#FFFFFF";function oj({children:e,className:t=""}){let i=(0,o.useRef)(null),[n,r]=(0,o.useState)(!1);return(0,o.useEffect)(()=>{let e=i.current;if(!e)return;let t=new IntersectionObserver(([i])=>{i.isIntersecting&&(r(!0),t.unobserve(e))},{threshold:.15});return t.observe(e),()=>t.disconnect()},[]),(0,s.jsx)(sL.div,{ref:i,initial:{opacity:0,y:20},animate:n?{opacity:1,y:0}:{},transition:{duration:.5,ease:"easeOut"},className:t,children:e})}function oP(){let e=["Meta Ads","Performance Marketing","ROAS Real","Estrategia de Inversión","Escalamiento","Optimización Continua","Paid Media Strategy","Meta Ads","Performance Marketing","ROAS Real"];return(0,s.jsx)("div",{style:{background:oT,overflow:"hidden",borderTop:"1px solid rgba(59,130,246,0.15)"},children:(0,s.jsx)(sL.div,{animate:{x:["0%","-50%"]},transition:{duration:28,repeat:1/0,ease:"linear"},style:{display:"flex",whiteSpace:"nowrap",padding:"14px 0"},children:[...e,...e].map((e,t)=>(0,s.jsx)("span",{style:{color:oC,fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.95rem",letterSpacing:"0.12em",textTransform:"uppercase",margin:"0 2.5rem",opacity:.9},children:e},t))})})}function oB(){let[e,t]=(0,o.useState)(!1),[i,n]=(0,o.useState)(!1),[r,a]=(0,o.useState)(!1);(0,o.useEffect)(()=>{let e=()=>a(window.innerWidth<768);return e(),window.addEventListener("resize",e,{passive:!0}),()=>window.removeEventListener("resize",e)},[]),(0,o.useEffect)(()=>{let e=()=>t(window.scrollY>40);return window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[]);let l=[{label:"Método P.U.L.S.O.",href:"#sistema-filtro"},{label:"Capacidades",href:"#capacidades"},{label:"Proceso",href:"#proceso"},{label:"Contacto",href:"#contacto"}];return(0,s.jsxs)("nav",{style:{position:"fixed",top:0,left:0,right:0,zIndex:50,backdropFilter:e?"blur(14px)":"none",background:e?"rgba(0,0,0,0.92)":"transparent",borderBottom:e?"1px solid rgba(59,130,246,0.1)":"none",transition:"all 0.35s ease"},children:[(0,s.jsxs)("div",{style:{maxWidth:1200,margin:"0 auto",padding:"12px 48px",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,s.jsx)("a",{href:"#",style:{display:"flex",alignItems:"center",gap:"0.5rem",textDecoration:"none"},children:(0,s.jsx)("img",{src:"/logo-cb.png",alt:"Carolina Betancourt",style:{height:50,width:"auto",objectFit:"contain"}})}),(0,s.jsxs)("div",{style:{display:r?"none":"flex",gap:"2rem",alignItems:"center"},children:[l.map(e=>(0,s.jsx)("a",{href:e.href,style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"10px",color:"rgba(255,255,255,0.85)",letterSpacing:"0.08em",textTransform:"uppercase",textDecoration:"none",transition:"color 0.25s"},onMouseEnter:e=>e.currentTarget.style.color=oC,onMouseLeave:e=>e.currentTarget.style.color="rgba(255,255,255,0.85)",children:e.label},e.href)),(0,s.jsx)("a",{href:"https://calendly.com/carolina-mkt",target:"_blank",rel:"noopener noreferrer",style:{fontFamily:"'DM Sans', sans-serif",fontWeight:500,fontSize:"0.85rem",color:oM,background:"rgba(59,130,246,0.85)",padding:"9px 18px",borderRadius:100,textDecoration:"none",letterSpacing:"1.5px",textTransform:"uppercase",transition:"background 0.25s"},onMouseEnter:e=>e.currentTarget.style.background="#3B82F6",onMouseLeave:e=>e.currentTarget.style.background="rgba(59,130,246,0.85)",children:"Agendar llamada"})]}),(0,s.jsx)("button",{onClick:()=>n(!i),style:{display:r?"block":"none",background:"none",border:"none",cursor:"pointer"},children:(0,s.jsx)("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:oM,strokeWidth:"2",children:i?(0,s.jsx)("path",{d:"M6 6l12 12M6 18L18 6"}):(0,s.jsx)("path",{d:"M3 6h18M3 12h18M3 18h18"})})})]}),(0,s.jsx)(sK,{children:r&&i&&(0,s.jsxs)(sL.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},style:{background:"rgba(0,0,0,0.96)",padding:"1rem 2rem"},children:[l.map(e=>(0,s.jsx)("a",{href:e.href,onClick:()=>n(!1),style:{display:"block",fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.9rem",color:"rgba(255,255,255,0.85)",padding:"0.65rem 0",textDecoration:"none",letterSpacing:"0.06em"},children:e.label},e.href)),(0,s.jsx)("a",{href:"https://calendly.com/carolina-mkt",target:"_blank",rel:"noopener noreferrer",target:"_blank",rel:"noopener noreferrer",onClick:()=>n(!1),style:{display:"inline-block",fontFamily:"'DM Sans', sans-serif",fontWeight:500,fontSize:"0.85rem",color:oM,background:oC,padding:"0.5rem 1.4rem",borderRadius:100,textDecoration:"none",marginTop:"0.5rem",marginBottom:"32px"},children:"Agendar llamada"})]})})]})}function oD(){let{scrollYProgress:e}=function({container:e,target:t,...i}={}){var n;let r=ip(ox);n=i.offset,!("u"<typeof window)&&(t?eQ()&&!!op(n):eJ())&&(r.scrollXProgress.accelerate=ov("x",i,e,t),r.scrollYProgress.accelerate=ov("y",i,e,t));let s=(0,o.useRef)(null),a=(0,o.useRef)(!1),l=(0,o.useCallback)(()=>(s.current=og((e,{x:t,y:i})=>{r.scrollX.set(t.current),r.scrollXProgress.set(t.progress),r.scrollY.set(i.current),r.scrollYProgress.set(i.progress)},{...i,container:e?.current||void 0,target:t?.current||void 0}),()=>{s.current?.()}),[e,t,JSON.stringify(i.offset)]);return iE(()=>{if(a.current=!1,!(oy(e)||oy(t)))return l();a.current=!0},[l]),(0,o.useEffect)(()=>a.current?(en(!oy(e),"Container ref is defined but not hydrated","use-scroll-ref"),en(!oy(t),"Target ref is defined but not hydrated","use-scroll-ref"),l()):void 0,[l]),r}(),t=function e(t,i,n,r){if("function"==typeof t){let e;return to.current=[],t(),e=ob(to.current,t),to.current=void 0,e}if(void 0!==n&&!Array.isArray(n)&&"function"!=typeof i){var s=t,o=i,a=n,l=r;let d=ip(()=>Object.keys(a)),c=ip(()=>({}));for(let t of d)c[t]=e(s,o,a[t],l);return c}let d="function"==typeof i?i:function(...e){let t=!Array.isArray(e[0]),i=t?0:-1,n=e[0+i],r=nh(e[1+i],e[2+i],e[3+i]);return t?r(n):r}(i,n,r),c=Array.isArray(t)?ow(t,d):ow([t],([e])=>d(e)),u=Array.isArray(t)?void 0:t.accelerate;return u&&!u.isTransformed&&"function"!=typeof i&&Array.isArray(n)&&r?.clamp!==!1&&(c.accelerate={...u,times:i,keyframes:n,isTransformed:!0,...r?.ease?{ease:r.ease}:{}}),c}(e,[0,.15],[1,.4]),[i,n]=(0,o.useState)(!1);(0,o.useEffect)(()=>{n(window.innerWidth<768);let e=()=>n(window.innerWidth<768);return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]);let r=[.4,0,.2,1];return(0,s.jsxs)("section",{style:{position:"relative",background:"#0A0F1E",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",overflow:"hidden",paddingTop:"88px",paddingBottom:"80px"},children:[(0,s.jsx)("div",{style:{position:"absolute",inset:0,opacity:.35}}),(0,s.jsx)("style",{children:"@media(max-width:767px){.hero-mockup{display:none!important}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}"}),(0,s.jsxs)("div",{style:{display:"block",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%) rotate(-6deg)",width:"140%",opacity:.35,borderRadius:16,overflow:"hidden",pointerEvents:"none",zIndex:0},children:[(0,s.jsx)("img",{src:"/meta-ads.jpeg",alt:"Meta Ads Manager",style:{width:"100%",height:"auto",display:"block"}}),(0,s.jsx)("div",{style:{position:"absolute",inset:0,background:"linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0) 100%)",pointerEvents:"none"}}),(0,s.jsx)("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:"linear-gradient(to top, rgba(10,15,30,1) 0%, rgba(10,15,30,0) 100%)",pointerEvents:"none"}}),(0,s.jsx)("div",{style:{position:"absolute",top:0,left:0,right:0,height:"40%",background:"linear-gradient(to bottom, rgba(10,15,30,1) 0%, rgba(10,15,30,0) 100%)",pointerEvents:"none"}})]}),(0,s.jsxs)(sL.div,{style:{position:"relative",zIndex:1,maxWidth:640,margin:i?"0 auto":"0",padding:i?"6rem 1.5rem 2rem":"6rem 2rem 2rem",textAlign:i?"center":"left",opacity:t},children:[(0,s.jsx)(sL.p,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.6,delay:0,ease:r},style:{fontFamily:"var(--font-jost)",fontSize:11,letterSpacing:"4px",textTransform:"uppercase",color:"#4A7CF7",marginBottom:12},children:"— Carolina Betancourt"}),(0,s.jsxs)(sL.h1,{initial:{opacity:0,y:18},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1,ease:r},style:{fontFamily:"var(--font-cormorant)",fontWeight:300,fontSize:i?34:52,lineHeight:1.05,color:"#FFFFFF",marginBottom:28},children:["La mayoría de agencias optimiza anuncios.",(0,s.jsx)("br",{}),"Yo optimizo lo que te cuesta ",(0,s.jsx)("span",{style:{color:"#4A7CF7"},children:"cada venta"}),".",(0,s.jsx)("span",{style:{display:"inline-block",color:"#3B82F6",fontWeight:300,marginLeft:2,animation:"blink 1.1s step-end infinite"},children:"|"})]}),(0,s.jsxs)(sL.p,{initial:{opacity:0,y:18},animate:{opacity:1,y:0},transition:{duration:.6,delay:.25,ease:r},style:{fontFamily:"var(--font-jost)",fontWeight:300,fontSize:14,marginTop:"24px",color:"rgba(156,163,175,0.90)",maxWidth:420,lineHeight:1.85,marginBottom:36,marginLeft:i?"auto":void 0,marginRight:i?"auto":void 0},children:["Trabajo con negocios que ya invierten en Meta Ads y saben que algo no esta funcionando — aunque todavía no logran identificar exactamente qué está frenando el rendimiento.",(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),"Ahí es donde entro yo."]}),(0,s.jsxs)(sL.div,{initial:{opacity:0,y:18},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4,ease:r},style:{display:"flex",flexDirection:i?"column":"row",gap:14,marginBottom:20,justifyContent:i?"center":"flex-start"},children:[(0,s.jsx)("a",{href:"https://wa.me/522292924043?text=Hola%20Carolina%2C%20invierto%20en%20Meta%20Ads%20pero%20siento%20que%20algo%20no%20est%C3%A1%20funcionando%20bien.%20Me%20gustar%C3%ADa%20saber%20qu%C3%A9%20est%C3%A1%20frenando%20mis%20resultados.",style:{display:"inline-block",background:"#4A7CF7",color:"#FFFFFF",fontFamily:"var(--font-jost)",fontWeight:500,fontSize:"0.85rem",padding:"14px 28px",borderRadius:3,textDecoration:"none",letterSpacing:"1.5px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",textAlign:"center"},onMouseEnter:function(e){e.currentTarget.style.background="#2563EB",e.currentTarget.style.transform="translateY(-2px)",e.currentTarget.style.boxShadow="0 8px 24px rgba(37,99,235,0.25)",e.currentTarget.style.letterSpacing="2px"},onMouseLeave:function(e){e.currentTarget.style.background="#3B82F6",e.currentTarget.style.transform="none",e.currentTarget.style.boxShadow="none",e.currentTarget.style.letterSpacing="1.5px"},children:"Quiero saber qué está fallando"}),(0,s.jsx)("a",{href:"#sistema-filtro",style:{display:"inline-block",background:"transparent",border:"1px solid rgba(255,255,255,0.3)",color:"#FFFFFF",fontFamily:"var(--font-jost)",fontWeight:500,fontSize:"0.85rem",padding:"14px 28px",borderRadius:10,textDecoration:"none",letterSpacing:"0.04em",transition:"all 0.25s",textAlign:"center"},onMouseEnter:function(e){e.currentTarget.style.borderColor="rgba(255,255,255,0.6)"},onMouseLeave:function(e){e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"},children:"Ver el Método P.U.L.S.O."})]}),(0,s.jsx)(sL.p,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.6,delay:.55,ease:r},style:{fontFamily:"var(--font-jost)",fontSize:11,letterSpacing:"2px",textTransform:"uppercase",marginTop:"32px",color:"rgba(255,255,255,0.38)"},children:"Sin contratos forzosos · Optimización basada en datos reales · CPA documentado: -52% en 5 ciclos"})]})]})}function oR(){return(0,s.jsx)("section",{style:{background:oT,padding:"6rem 2rem"},children:(0,s.jsxs)("div",{style:{maxWidth:900,margin:"0 auto"},children:[(0,s.jsxs)(oj,{children:[(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.7rem",letterSpacing:"0.25em",textTransform:"uppercase",color:oC,marginBottom:"0.75rem"},children:"El problema real"}),(0,s.jsx)("h2",{style:{fontFamily:"var(--font-cormorant)",fontWeight:400,fontSize:"clamp(1.8rem,4vw,2.8rem)",color:oM,lineHeight:1.15,marginBottom:"2.5rem"},children:"Tu inversión en Meta Ads no está generando el retorno que deberías"})]}),(0,s.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))",gap:"2rem"},children:[{icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>',title:"Gasto sin estrategia",text:"La mayoría de las marcas lanzan campañas sin un sistema claro de inversión, desperdiciando presupuesto en audiences y formatos que no convierten."},{title:"Métricas de vanidad",text:"Alcanzos e impresiones no pagan facturas. Sin un marco de ROAS real, es imposible saber si tus campañas son realmente rentables."},{title:"Agencias genéricas",text:"Muchas agencias aplican la misma plantilla a todos los clientes. Tu marca merece una estrategia diseñada específicamente para tus objetivos."}].map((e,t)=>(0,s.jsx)(oj,{children:(0,s.jsxs)("div",{style:{padding:"2rem",borderLeft:"3px solid "+oC,background:oA,borderRadius:"0 8px 8px 0",border:"1px solid "+oF,borderLeftWidth:"3px",borderLeftColor:oC,transition:"all 0.3s ease"},onMouseEnter:e=>{e.currentTarget.style.borderColor=oC,e.currentTarget.style.borderLeftColor=oC,e.currentTarget.style.transform="translateY(-4px)",e.currentTarget.style.boxShadow="0 8px 30px rgba(59,130,246,0.12)"},onMouseLeave:e=>{e.currentTarget.style.borderColor=oF,e.currentTarget.style.borderLeftColor=oC,e.currentTarget.style.transform="translateY(0)",e.currentTarget.style.borderColor=oF,e.currentTarget.style.boxShadow="none"},children:[(0,s.jsx)("div",{style:{marginBottom:"0.75rem"},dangerouslySetInnerHTML:{__html:e.icon}}),(0,s.jsx)("h3",{style:{fontFamily:"var(--font-cormorant)",fontWeight:500,fontSize:"1.35rem",color:oM,marginBottom:"0.6rem"},children:e.title}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"0.95rem",color:"rgba(255,255,255,0.7)",lineHeight:1.7},children:e.text})]})},t))})]})})}function oL(){return(0,s.jsxs)("section",{id:"sistema-filtro",style:{background:oE,padding:"6rem 2rem",position:"relative"},children:[(0,s.jsx)("div",{style:{position:"absolute",top:"15%",left:"50%",transform:"translateX(-50%)",width:"70%",height:"50%",background:"radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)",pointerEvents:"none"}}),(0,s.jsxs)("div",{style:{maxWidth:1e3,margin:"0 auto"},children:[(0,s.jsxs)(oj,{children:[(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.7rem",letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)",marginBottom:"0.75rem"},children:"Mi metodología"}),(0,s.jsx)("h2",{style:{fontFamily:"var(--font-cormorant)",fontWeight:500,fontSize:"clamp(1.8rem,4vw,2.8rem)",color:oM,lineHeight:1.15,marginBottom:"1rem"},children:"El Método P.U.L.S.O."}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"1rem",color:"rgba(255,255,255,0.75)",lineHeight:1.7,maxWidth:720,marginBottom:"3.5rem"},children:"15 meses de ejecución real terminaron convirtiéndose en un sistema. Uno que ahora implemento con cada cliente."})]}),(0,s.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[{letra:"P",palabra:"PROBAR",desc:"Antes de escalar, el sistema necesita datos reales. La mayoría de presupuestos se desperdicia aquí."},{letra:"U",palabra:"UBICAR",desc:"No todas las audiencias convierten igual. Esta fase encuentra a las que sí — con precisión quirúrgica."},{letra:"L",palabra:"LANZAR",desc:"Cuando el sistema identifica lo que funciona, se escala en el momento exacto. Ni antes ni después."},{letra:"S",palabra:"SOSTENER",desc:"Un CPA bajo no se mantiene solo. Esta fase es la que la mayoría de agencias omite."},{letra:"O",palabra:"OPTIMIZAR",desc:"Cada ciclo termina con aprendizajes documentados. El siguiente ciclo comienza mejor calibrado."}].map((e,t)=>(0,s.jsx)(oj,{children:(0,s.jsxs)("div",{style:{display:"flex",gap:"1.5rem",alignItems:"flex-start",background:oA,border:"1px solid "+oF,borderRadius:20,padding:"1.75rem 2rem",transition:"all 0.3s ease"},onMouseEnter:e=>{e.currentTarget.style.borderColor=oC,e.currentTarget.style.transform="translateY(-4px)",e.currentTarget.style.boxShadow="0 8px 30px rgba(59,130,246,0.12)"},onMouseLeave:e=>{e.currentTarget.style.borderColor=oF,e.currentTarget.style.transform="translateY(0)",e.currentTarget.style.boxShadow="none"},children:[(0,s.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",minWidth:"4.5rem"},children:[(0,s.jsx)("span",{style:{fontFamily:"var(--font-cormorant)",fontWeight:700,fontSize:"3.2rem",color:"#3B82F6",lineHeight:1,textShadow:"0 0 30px rgba(59,130,246,0.3), 0 0 60px rgba(59,130,246,0.1)"},children:e.letra}),(0,s.jsx)("span",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:500,fontSize:"0.6rem",letterSpacing:"0.2em",textTransform:"uppercase",color:ok,marginTop:"0.35rem"},children:e.palabra})]}),(0,s.jsxs)("div",{style:{flex:1,paddingTop:"0.35rem"},children:[(0,s.jsx)("h3",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:600,fontSize:"1.05rem",letterSpacing:"0.08em",textTransform:"uppercase",color:oM,marginBottom:"0.5rem"},children:e.palabra}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"0.95rem",color:"rgba(255,255,255,0.8)",lineHeight:1.75},children:e.desc})]})]})},t))}),(0,s.jsx)(oj,{children:(0,s.jsx)("p",{style:{fontFamily:"var(--font-cormorant)",fontWeight:400,fontSize:"clamp(1.15rem,2.5vw,1.45rem)",color:oM,lineHeight:1.6,textAlign:"center",maxWidth:700,margin:"3.5rem auto 0",fontStyle:"italic"},children:"Cada ciclo reduce el costo. Cada peso invertido rinde más que el anterior. Eso es lo que hace un sistema — no campañas sueltas."})}),(0,s.jsx)(oj,{children:(0,s.jsx)("div",{style:{textAlign:"center",marginTop:"2rem",padding:"1rem 2rem",background:"rgba(59,130,246,0.06)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:100,display:"inline-block",margin:"2rem auto 0"},children:(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.75rem",letterSpacing:"0.06em",color:"rgba(255,255,255,0.65)",margin:0},children:"Resultado documentado: CPA reducido 52% en 5 ciclos consecutivos · 8,400+ conversiones · $63K MXN gestionados"})})})]})]})}function oz(){return(0,s.jsx)("section",{id:"capacidades",style:{background:oT,padding:"6rem 2rem"},children:(0,s.jsxs)("div",{style:{maxWidth:1e3,margin:"0 auto"},children:[(0,s.jsxs)(oj,{children:[(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.7rem",letterSpacing:"0.25em",textTransform:"uppercase",color:oC,marginBottom:"0.75rem"},children:"En lo que me especializo"}),(0,s.jsx)("h2",{style:{fontFamily:"var(--font-cormorant)",fontWeight:400,fontSize:"clamp(1.8rem,4vw,2.8rem)",color:oM,lineHeight:1.15,marginBottom:"3rem"},children:"Capacidades"})]}),(0,s.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(230px,1fr))",gap:"1.5rem"},children:[{title:"Estrategia de Inversión en Meta",text:"Diseño la arquitectura completa de tu inversión: presupuesto por fase del embudo, distribución entre campañas, y modelo de escalamiento basado en datos reales."},{title:"Optimización de ROAS",text:"Monitoreo diario con ajustes basados en rendimiento real. Pauso lo que no funciona, escale lo que sí. Tu ROAS mejora semana tras semana, no en reportes mensuales."},{title:"Tracking y Medición Precisa",text:"Implementación correcta del píxel de Meta, eventos de conversión, UTM parameters y dashboards que te muestran exactamente qué genera cada peso invertido."},{icon:'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',title:"Creatividades que Convierten",text:"Dirección de briefs creativos basados en datos, no en suposiciones. Cada concepto probado con A/B testing antes de escalar inversión."}].map((e,t)=>(0,s.jsx)(oj,{children:(0,s.jsxs)("div",{style:{background:oA,border:"1px solid "+oF,borderRadius:20,padding:"2rem",transition:"transform 0.3s, box-shadow 0.3s"},onMouseEnter:e=>{e.currentTarget.style.transform="translateY(-4px)",e.currentTarget.style.borderColor=oC,e.currentTarget.style.boxShadow="0 8px 30px rgba(59,130,246,0.12)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)",e.currentTarget.style.boxShadow="none"},children:[(0,s.jsx)("div",{style:{marginBottom:"1rem"},dangerouslySetInnerHTML:{__html:e.icon}}),(0,s.jsx)("h3",{style:{fontFamily:"var(--font-cormorant)",fontWeight:500,fontSize:"1.25rem",color:oM,marginBottom:"0.6rem"},children:e.title}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"0.9rem",color:"rgba(255,255,255,0.7)",lineHeight:1.7},children:e.text})]})},t))})]})})}function oI(){return(0,s.jsx)("section",{id:"proceso",style:{background:oE,padding:"6rem 2rem"},children:(0,s.jsxs)("div",{style:{maxWidth:900,margin:"0 auto"},children:[(0,s.jsxs)(oj,{children:[(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.7rem",letterSpacing:"0.25em",textTransform:"uppercase",color:oC,marginBottom:"0.75rem"},children:"Cómo empezamos"}),(0,s.jsx)("h2",{style:{fontFamily:"var(--font-cormorant)",fontWeight:400,fontSize:"clamp(1.8rem,4vw,2.8rem)",color:oM,lineHeight:1.15,marginBottom:"3.5rem"},children:"El proceso"})]}),(0,s.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[{step:"1",title:"Llamada de diagnóstico",text:"Entiendo tu negocio, objetivos y situación actual en Meta Ads en 30 minutos."},{step:"2",title:"Propuesta a medida",text:"Recibes un plan de acción concreto con estrategia de inversión, estructura de campañas y proyección de ROAS."},{step:"3",title:"Activación",text:"Implemento el sistema completo: campañas, tracking, creatividades y optimización diaria desde el día uno."}].map((e,t)=>(0,s.jsx)(oj,{children:(0,s.jsxs)("div",{style:{display:"flex",gap:"1.5rem",alignItems:"flex-start",padding:"1.5rem",background:oA,borderRadius:14,border:"1px solid "+oF,transition:"all 0.3s ease"},onMouseEnter:e=>{e.currentTarget.style.borderColor=oC,e.currentTarget.style.transform="translateY(-4px)",e.currentTarget.style.boxShadow="0 8px 30px rgba(59,130,246,0.12)"},onMouseLeave:e=>{e.currentTarget.style.borderColor=oF,e.currentTarget.style.transform="translateY(0)",e.currentTarget.style.boxShadow="none"},children:[(0,s.jsx)("span",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:600,fontSize:"1.5rem",color:oC,minWidth:"2rem"},children:e.step}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{style:{fontFamily:"var(--font-cormorant)",fontWeight:500,fontSize:"1.3rem",color:oM,marginBottom:"0.4rem"},children:e.title}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"0.95rem",color:"rgba(255,255,255,0.7)",lineHeight:1.7},children:e.text})]})]})},t))})]})})}function oV(){return(0,s.jsx)("section",{id:"contacto",style:{background:oT,padding:"6rem 2rem"},children:(0,s.jsx)("div",{style:{maxWidth:700,margin:"0 auto",textAlign:"center"},children:(0,s.jsxs)(oj,{children:[(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.7rem",letterSpacing:"0.25em",textTransform:"uppercase",color:oC,marginBottom:"0.75rem"},children:"Agenda tu llamada"}),(0,s.jsx)("h2",{style:{fontFamily:"var(--font-cormorant)",fontWeight:400,fontSize:"clamp(1.8rem,4vw,2.8rem)",color:oM,lineHeight:1.15,marginBottom:"1.5rem"},children:"¿Listo para que tu inversión en Meta Ads realmente funcione?"}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"1.05rem",color:"rgba(255,255,255,0.7)",lineHeight:1.7,marginBottom:"2.5rem"},children:"Agenda una llamada de 30 minutos donde analizo tu situación actual y te doy un plan de acción concreto. Sin compromiso, sin venta forzada."}),(0,s.jsxs)("div",{style:{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"},children:[(0,s.jsx)("a",{href:"https://calendly.com/carolina-mkt",target:"_blank",rel:"noopener noreferrer",target:"_blank",rel:"noopener noreferrer",style:{fontFamily:"'DM Sans', sans-serif",fontWeight:500,fontSize:"0.9rem",color:oM,background:oC,padding:"0.9rem 2.4rem",borderRadius:100,textDecoration:"none",letterSpacing:"0.04em",transition:"background 0.25s"},onMouseEnter:e=>e.currentTarget.style.background=oF,onMouseLeave:e=>e.currentTarget.style.background=oC,children:"Agendar llamada estratégica"}),(0,s.jsx)("a",{href:"https://wa.me/522292924043?text=Hola%20Carolina%2C%20me%20interesa%20agendar%20una%20llamada%20estrat%C3%A9gica%20para%20hablar%20sobre%20mis%20campa%C3%B1as%20de%20Meta%20Ads.",target:"_blank",rel:"noopener noreferrer",style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.9rem",color:oM,border:"1px solid "+oC,padding:"0.9rem 2.2rem",borderRadius:100,transition:"all 0.25s",textDecoration:"none",letterSpacing:"0.04em"},onMouseEnter:e=>{e.currentTarget.style.background="rgba(59,130,246,0.10)"},onMouseLeave:e=>{e.currentTarget.style.background="transparent"},children:"WhatsApp directo"})]})]})})})}function oW(){return(0,s.jsx)("footer",{style:{background:oE,padding:"3rem 2rem 2rem",borderTop:"1px solid rgba(59,130,246,0.08)"},children:(0,s.jsxs)("div",{style:{maxWidth:900,margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:"1rem"},children:[(0,s.jsx)("img",{src:"/logo-cb.png",alt:"Carolina Betancourt",style:{height:52,width:"auto",objectFit:"contain",borderRadius:"8px"}}),(0,s.jsx)("p",{style:{fontFamily:"var(--font-cormorant)",fontWeight:600,fontSize:"1rem",color:oM,letterSpacing:"0.15em",textTransform:"uppercase",marginTop:"0.25rem"},children:"Carolina Betancourt"}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"0.85rem",color:"rgba(255,255,255,0.5)",letterSpacing:"0.1em"},children:"Performance Marketing & Paid Media Strategy"}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.55rem",color:ok,letterSpacing:"0.3em",textTransform:"uppercase",marginTop:"-0.25rem"}}),(0,s.jsxs)("div",{style:{display:"flex",gap:"2rem",marginTop:"0.5rem"},children:[(0,s.jsx)("a",{href:"https://wa.me/522292924043?text=Hola%20Carolina%2C%20vi%20tu%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20saber%20c%C3%B3mo%20puedes%20ayudarme%20con%20mis%20Meta%20Ads.",target:"_blank",rel:"noopener noreferrer",style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.8rem",color:"rgba(255,255,255,0.6)",textDecoration:"none",letterSpacing:"0.06em",transition:"color 0.25s"},onMouseEnter:e=>e.currentTarget.style.color=oC,onMouseLeave:e=>e.currentTarget.style.color="rgba(255,255,255,0.6)",children:"WhatsApp"}),(0,s.jsx)("a",{href:"mailto:carolinajuarezbetancourt@gmail.com",style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.8rem",color:"rgba(255,255,255,0.6)",textDecoration:"none",letterSpacing:"0.06em",transition:"color 0.25s"},onMouseEnter:e=>e.currentTarget.style.color=oC,onMouseLeave:e=>e.currentTarget.style.color="rgba(255,255,255,0.6)",children:"Email"}),(0,s.jsx)("a",{href:"https://calendly.com/carolina-mkt",target:"_blank",rel:"noopener noreferrer",target:"_blank",rel:"noopener noreferrer",style:{fontFamily:"'DM Sans', sans-serif",fontWeight:400,fontSize:"0.8rem",color:"rgba(255,255,255,0.6)",textDecoration:"none",letterSpacing:"0.06em",transition:"color 0.25s"},onMouseEnter:e=>e.currentTarget.style.color=oC,onMouseLeave:e=>e.currentTarget.style.color="rgba(255,255,255,0.6)",children:"Calendly"})]}),(0,s.jsx)("p",{style:{fontFamily:"'DM Sans', sans-serif",fontWeight:300,fontSize:"0.75rem",color:"rgba(255,255,255,0.35)",marginTop:"1.5rem"},children:"© 2026 Carolina Betancourt"})]})})}e.s(["default",0,function(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("style",{children:String.raw`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
      `}),(0,s.jsxs)("main",{style:{overflowX:"hidden"},children:[(0,s.jsx)(oB,{}),(0,s.jsx)(oD,{}),(0,s.jsx)(oP,{}),(0,s.jsx)(oR,{}),(0,s.jsx)(s$,{}),(0,s.jsx)(s2,{}),(0,s.jsx)(oL,{}),(0,s.jsx)(oz,{}),(0,s.jsx)(oS,{}),(0,s.jsx)(oI,{}),(0,s.jsx)(oV,{}),(0,s.jsx)(oW,{})]})]})}],15413)}]);