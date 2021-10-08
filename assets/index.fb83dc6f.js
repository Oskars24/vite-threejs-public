import{H as e,D as t,E as o,R as a,S as n,B as s,M as i,G as r,m as c,a as d,b as l,c as p,d as u,L as y,V as w,A as m,e as h,T as f,f as g,g as x,n as v,h as b,i as S,W as M,P,O as A,j as D,C as K,F as W,k as z,l as R,o as E,p as k}from"./vendor.5030e2c2.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const F=new b,L=new S,V=new M({antialias:!0}),O=new P,j=[],T=new A(O,V.domElement),C={scaleFactor:1};let I=window.innerWidth,B=window.innerHeight;const G=new E;let H=0;const N=new w(10,0,-10),q=new w(2.5,15,25),J=()=>{I=window.innerWidth,B=window.innerHeight,U(),O.aspect=I/B,O.updateProjectionMatrix(),V.setSize(I,B),V.setPixelRatio(Math.min(window.devicePixelRatio,2)*C.scaleFactor)},U=()=>{(I>1920||B>1080)&&(C.scaleFactor=Math.min(1920/I,1080/B))};U(),O.fov=60,O.aspect=I/B,O.near=1,O.far=300,O.position.set(N.x+q.x,N.y+q.y,N.z+q.z),O.updateProjectionMatrix(),V.setSize(I,B),V.setPixelRatio(Math.min(window.devicePixelRatio,2)*C.scaleFactor),V.shadowMap.enabled=!0,V.shadowMap.type=D,document.body.appendChild(V.domElement),L.background=new K(4502015),L.fog=new W(4502015,60,300),window.addEventListener("resize",J);const Q=new z;Q.showPanel(0),document.body.appendChild(Q.dom),T.enableDamping=!0,T.dampingFactor=.05,T.screenSpacePanning=!1,T.minDistance=30,T.maxDistance=30,T.maxPolarAngle=75*Math.PI/180,T.enablePan=!1,T.enableZoom=!1,T.target=N;const Z=new k,{loading:_}=function(e){const t={loaded:0,total:0,progress:0};return e.onProgress=(e,o,a)=>{t.loaded=o,t.total=a,t.progress=Math.round(o/a*1e4)/100},{loading:t}}(Z);!function(o){const a=new e(16777215,2236962,.5),n=new t(16777215,.7);n.position.set(1,1.5,1).multiplyScalar(100),n.shadow.mapSize.setScalar(3072),n.shadow.bias=-.001,n.shadow.normalBias=.05,n.castShadow=!0;const s=n.shadow.camera;s.bottom=s.left=-300,s.top=300,s.right=300,o.add(a,n)}(L),function(e,t,s){const i=new o(s),r=new a(e,t);i.addPass(r);const c=new n(window.innerWidth*s.getPixelRatio(),window.innerHeight*s.getPixelRatio());i.addPass(c)}(L,O,V);const X=new R(Z),Y={};var $,ee,te;$=L,ee=Y,te="islands/islands.gltf",X.load(te,(e=>{const t=e.scene,o=new s;o.setFromObject(t),o.getCenter(t.position).negate(),t.updateMatrixWorld(!0);const a={};t.traverse((e=>{if(e instanceof i){const t=e.material.color.getHex();a[t]=a[t]||[],a[t].push(e),e.castShadow=!0,e.receiveShadow=!0,e.material.shadowSide=2}}));const n=new r;for(const s in a){const e=a[s],t=[];if(e.forEach((e=>{if(0!==e.material.emissive.r)n.attach(e);else{const o=e.geometry.clone();o.applyMatrix4(e.matrixWorld),t.push(o)}})),t.length){const e=c(t),o=new i(e,new d({color:16777215,opacity:0,transparent:!0,depthWrite:!1}));o.castShadow=!0,o.receiveShadow=!0,o.material.shadowSide=2,n.add(o)}}const u=[];n.updateMatrixWorld(!0),n.traverse((e=>{if(e instanceof i){const t=e.geometry.clone();t.applyMatrix4(e.matrixWorld);for(const e in t.attributes)"position"!==e&&t.deleteAttribute(e);u.push(t)}}));const y=c(u,!1);y.boundsTree=new l(y,{lazyGeneration:!1});const w=new i(y);w.material.wireframe=!0,w.material.opacity=.5,w.material.transparent=!0,w.userData.name="collider",ee[w.userData.name]=w,new p(w,1e3).visible=!0,$.add(t)}),void 0,(function(e){console.error(e)}));const oe={},ae={};!function(e,t){window.addEventListener("keydown",(t=>{e[t.code]=!0})),window.addEventListener("keyup",(t=>{e[t.code]=!1}));const o=v.create({zone:document.querySelector(".joystick"),mode:"static",restJoystick:!0,position:{left:"70px",bottom:"70px"},color:"white"}).on("move",((e,o)=>{for(const a in o)t[a]=o[a]})).on("end",(()=>{t.force=0,t.pressure=0,t.distance=0,t.vector.x=0,t.vector.y=0}));t.size=o.options.size}(oe,ae);const{checkKeysState:ne}=function(e,t,o,a,n,r,c){const d=new s,l=new u,p=new y,v=new w,b=new w,S=new w(0,1,0);let M=null,P=null,A={},D=null,K=!1,W=!1;e.load("/character/character.gltf",(e=>{const n=e.scene;n.traverse((e=>{e instanceof i&&(e.castShadow=!0,e.receiveShadow=!0,e.material.shadowSide=1)})),n.userData.name="Robot",n.userData.isOnGround=!1,n.userData.velocity=new w(0,0,0),n.userData.speed=7,n.userData.gravity=-150,n.position.set(o.x,o.y,o.z),t.add(n),a[n.userData.name]=n,D=new m(n),D.addEventListener("finished",(function(e){e.action.loop===h&&(K=!1)})),e.animations.forEach((e=>{A[e.name]=e}))}),void 0,(function(e){console.error(e)}));const z=(e,t=1,o=x)=>{if(P&&P.setEffectiveTimeScale(t),M==e||K)return;const a=A[e];if(void 0!==a){const t=D.clipAction(a);t.reset(),M=e,o===h&&(K=!0,t.setLoop(h,1)),t.play(),P&&P.crossFadeTo(t,.25),P=t}};return{checkKeysState:e=>{if(e=e<.1?e:.016,D&&D.update(e),!a.Robot|!a.collider)return;const t=a.collider,o=a.Robot;let{speed:s,gravity:i,velocity:u,isOnGround:m}=o.userData,x=o.position.clone(),M=v.clone(),A=b.clone(),K=u.clone(),R=1;u.y+=m?0:e*i,o.position.addScaledVector(u,e);const E=c.getAzimuthalAngle(),k=180*E/Math.PI;let F=180*o.rotation.y/Math.PI;if(n.ShiftLeft?(s*=2.7,W=!0):W=!1,n.KeyW&&(v.set(0,0,-1).applyAxisAngle(S,E),o.position.addScaledVector(v,s*e),F=180+k),n.KeyA&&(v.set(-1,0,0).applyAxisAngle(S,E),o.position.addScaledVector(v,s*e),F=-90+k),n.KeyS&&(v.set(0,0,1).applyAxisAngle(S,E),o.position.addScaledVector(v,s*e),F=0+k),n.KeyD&&(v.set(1,0,0).applyAxisAngle(S,E),o.position.addScaledVector(v,s*e),F=90+k),n.KeyW&&n.KeyA&&(F=-135+k),n.KeyW&&n.KeyD&&(F=135+k),n.KeyS&&n.KeyA&&(F=-45+k),n.KeyS&&n.KeyD&&(F=45+k),r.vector){const t=r.distance/(.5*r.size);t>0&&(R=t>.5?t:.5,F=r.angle.degree-270+k,t>.85?(s*=2.7,W=!0):W=!1,v.set(r.vector.x,0,-r.vector.y).applyAxisAngle(S,E),o.position.addScaledVector(v,s*e))}n.KeyW||n.KeyA||n.KeyS||n.KeyD||r.vector&&(0!=r.vector.x||0!=r.vector.y)?z(W?"Run":"Walk",R):z("Idle"),o.rotation.y=F*(Math.PI/180),o.updateMatrixWorld();const L=new y(new w(0,0,0),new w(0,0,0));d.makeEmpty(),l.copy(t.matrixWorld).invert(),p.copy(L),p.start.applyMatrix4(o.matrixWorld).applyMatrix4(l),p.end.applyMatrix4(o.matrixWorld).applyMatrix4(l),d.expandByPoint(p.start),d.expandByPoint(p.end),d.min.sub(new w(1.175,3.375,1.175)),d.max.sub(new w(-1.175,-3.375,-1.175));let V=[],O=0,j=0;if(t.geometry.boundsTree.shapecast(t,{intersectsBounds:e=>e.intersectsBox(d),intersectsTriangle:e=>{const t=e.closestPointToSegment(p,v,b);if(t<3.375){const o=new f(e.a.clone(),e.b.clone(),e.c.clone());o.closest=v.clone(),V.push(o);let a=3.375-t;const n=b.sub(v).normalize();p.start.addScaledVector(n,a),p.end.addScaledVector(n,a)}}}),V.length>1&&V.forEach((e=>{const t=e.getNormal(new w).angleTo(new w(0,1,0))*(180/Math.PI);t>60&&(O=t,j=Math.abs(Math.abs(e.closest.y)-Math.abs(d.min.y)))})),O>60&&j>1.5)o.position.copy(x),v.copy(M),b.copy(A),u.copy(K);else{const a=v;a.copy(p.start).applyMatrix4(t.matrixWorld);const n=b;n.subVectors(a,o.position),o.position.copy(a),m=n.y>Math.abs(e*u.y*.25),m?u.set(0,0,0):(n.normalize(),u.addScaledVector(n,-n.dot(u)))}n.Space&&(z("Jump",1,h),0===u.y&&g({targets:u,easing:"easeOutQuint",duration:P._clip.duration,y:40})),o.position.y<-40&&(a.Robot.userData.velocity.set(0,0,0),a.Robot.position.set(0,0,0),c.update()),Object.assign(o.userData,{velocity:u,isOnGround:m}),g({targets:c.target,easing:"easeOutCirc",duration:2e3,complete:()=>{},x:a.Robot.position.x,y:a.Robot.position.y,z:a.Robot.position.z})}}}(X,L,N,Y,oe,ae,T),se=F.addFolder("Optymalizacja");se.open(),se.add(C,"scaleFactor",.05,1,.05).name("Scale Factor").onChange(J),se.add(V.shadowMap,"autoUpdate").name("Update shadows"),se.add(O,"far",60,500,10).name("Draw distance").setValue(300).onChange((()=>{L.fog.far=O.far,L.fog.near=O.far/3,O.updateProjectionMatrix()})),document.addEventListener("visibilitychange",(()=>{"hidden"==document.visibilityState?G.stop():G.start()}));const ie=()=>{Q.begin(),100!=_.progress||(H=G.getDelta()),requestAnimationFrame(ie);const e=Math.round(H/(1/60));for(let t=0;t<e;t++)j.forEach((e=>{e()})),ne(H),T.update();V.render(L,O),Q.end()};ie();
