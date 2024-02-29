(function(){"use strict";var e={2873:function(e,t){t.Z="#define GLSLIFY 1\n#ifdef USE_ALPHAMAP \n  float threshold = 0.1;\n  vec4 transitionTexel = texture2D( alphaMap, vAlphaMapUv * vec2(1.0) ) + (1.0 - texture2D( map, vMapUv ));\n  transitionTexel *= 0.5;\n  float r = transition * (1.0 + threshold * 2.0) - threshold;\n\n\tfloat mixf = clamp((transitionTexel.g - r)*(1.0/threshold), 0.0, 1.0);\n  if (mixf < 0.001) {\n    discard;\n  }\n  diffuseColor.a *= mixf;\n#endif"},602:function(e,t,i){var a=i(7327),n=i(1114),o=i(2236);class r{constructor(){(0,a.Z)(this,"manager",new n.lLk),(0,a.Z)(this,"textureLoader",new n.dpR(this.manager)),(0,a.Z)(this,"rgbeLoader",new o.x(this.manager))}init(){const{textureLoader:e,rgbeLoader:t}=this;this.worldMap=e.load("/assets/map.png"),this.alphaMap=e.load("/assets/transition4.png"),this.map=e.load("/assets/Love.png"),this.textureCube=t.setPath("/assets/").load("potsdamer_platz_1k_11zon.hdr",(e=>{e.mapping=n.dSO}))}}t["default"]=new r},2214:function(e,t,i){i.a(e,(async function(e,a){try{var n=i(7327),o=i(4314),r=i(1114),s=i(4241),h=e([o]);o=(h.then?(await h)():h)[0];class c{constructor(){(0,n.Z)(this,"scene",new r.xsS),(0,n.Z)(this,"handle",document.body.querySelector("#graphics")),this.scene.background=new r.Ilk(199710),this.camera=new r.cPb(50,o["default"].viewport.width/o["default"].viewport.height,.01,100),this.camera.position.z=10}init(){this.renderer=new r.CP7({alpha:!1,stencil:!1,depth:!0,powerPreference:"high-performance",antialias:!1}),this.handle.appendChild(this.renderer.domElement),this.renderer.autoClear=!1,this.renderer.physicallyCorrectLights=!0,this.renderer.toneMapping=r.LY2,this.renderer.setPixelRatio(o["default"].pixelRatio)}render(){this.renderer.render(this.scene,this.camera)}dispose(){this.handle.removeChild(this.renderer.domElement),this.renderer.dispose()}resize(){o["default"].viewport.width=this.renderer.domElement.parentElement.offsetWidth,o["default"].viewport.height=this.renderer.domElement.parentElement.offsetHeight,this.camera.aspect=o["default"].viewport.width/o["default"].viewport.height,this.camera.updateProjectionMatrix(),o["default"].fov.height=(0,s.Vw)(this.camera,10),o["default"].fov.width=o["default"].fov.height*this.camera.aspect,this.renderer.setSize(o["default"].viewport.width,o["default"].viewport.height)}}t.Z=new c,a()}catch(c){a(c)}}))},599:function(e,t,i){i.a(e,(async function(e,a){try{var n=i(4314),o=i(1114),r=e([n]);n=(r.then?(await r)():r)[0];class s{constructor(){this.mouseMoved=!1,this.coords=new o.FM8,this.coords_old=new o.FM8,this.diff=new o.FM8,this.timer=null,this.count=0,this.velocity=0,this.offset=new o.FM8(0,0)}init(){document.body.addEventListener("mousemove",this.onDocumentMouseMove.bind(this),!1),document.body.addEventListener("touchstart",this.onDocumentTouchStart.bind(this),!1),document.body.addEventListener("touchmove",this.onDocumentTouchMove.bind(this),!1)}setCoords(e,t){this.timer&&clearTimeout(this.timer),this.coords.set(e/n["default"].viewport.width*2-1,-t/n["default"].viewport.height*2+1),this.mouseMoved=!0,this.timer=setTimeout((()=>{this.mouseMoved=!1}),100)}onDocumentMouseMove(e){this.setCoords(e.clientX,e.clientY)}onDocumentTouchStart(e){1===e.touches.length&&this.setCoords(e.touches[0].pageX,e.touches[0].pageY)}onDocumentTouchMove(e){1===e.touches.length&&this.setCoords(e.touches[0].pageX,e.touches[0].pageY)}render(){this.diff.subVectors(this.coords,this.coords_old),this.coords_old.copy(this.coords),0===this.coords_old.x&&0===this.coords_old.y&&this.diff.set(0,0)}dispose(){}resize(){}}t.Z=new s,a()}catch(s){a(s)}}))},8347:function(e,t,i){i.a(e,(async function(e,a){try{i.d(t,{Z:function(){return x}});var n=i(7327),o=i(1114),r=i(2214),s=i(602),h=i(4314),c=i(7239),d=i(6466),f=i(4510),l=i(4012),u=i(5349),p=e([r,h,c,d,f]);[r,h,c,d,f]=p.then?(await p)():p;class x{constructor(){(0,n.Z)(this,"components",{}),(0,n.Z)(this,"postProcess",!1),this.init()}init(){this.components.atlas=new c.Z,this.components.circle=new l.Z({diameter:7,scale:1,circle:.0075,opacity:0}),this.components.ambiance=new d.Z,this.page=new o.ZAu,this.page.matrixAutoUpdate=!1,this.page.add(this.components.atlas),this.components.atlas.add(this.components.circle),this.page.add(this.components.ambiance),s["default"].manager.onLoad=()=>{this.components.atlas.init(),this.components.atlas.enter()},s["default"].manager.onStart=()=>{const e={x:0};u.ZP.to(e,{x:.5,duration:.628,delay:.2,ease:"sine.inOut",onUpdate:()=>{this.components.circle.material.uniforms.opacity.value=e.x}})},s["default"].manager.onProgress=(e,t,i)=>{const a={x:this.components.circle.material.uniforms.arc.value.x,y:.0075,z:.5},n=t/i;this.tl&&this.tl.kill(),this.tl=u.ZP.timeline({overwrite:!0}),this.tl.to(a,{x:n,duration:1.5,delay:.2,ease:"sine.inOut",onUpdate:()=>{this.components.circle.material.uniforms.arc.value.x=a.x,this.components.circle.material.uniforms.arc.value.y=-a.x}},"a"),1===n&&(this.tl.to(a,{y:0,z:.1,duration:.5,ease:"sine.out",onUpdate:()=>{this.components.circle.material.uniforms.opacity.value=a.z,this.components.circle.material.uniforms.circle.value=a.y}},"b"),this.components.ambiance.enter())},s["default"].init(),r.Z.scene.add(this.page)}addBackground({el:e}){this.components.background=new f.Z({el:e}),this.page.add(this.components.background),this.components.background.resize()}updateY(e){const t=e.end/h["default"].viewport.height,i=t*h["default"].fov.height;this.page.position.y=e.progress*i,this.page.updateMatrix()}render(e,t){Object.keys(this.components).forEach((i=>{this.components[i].render(e,t)})),r.Z.renderer.setRenderTarget(null),r.Z.render()}disposeComponent(e){this.page.remove(this.components[e]),this.components[e].dispose(),delete this.components[e]}dispose(){Object.keys(this.components).forEach((e=>{this.disposeComponent(e)})),r.Z.scene.remove(this.page),this.page=null}resize(){Object.keys(this.components).forEach((e=>{this.components[e].resize()}))}}a()}catch(x){a(x)}}))},6466:function(e,t,i){i.a(e,(async function(e,a){try{i.d(t,{Z:function(){return c}});var n=i(1114),o=i(5349),r=i(4314),s=i(4012),h=e([r]);r=(h.then?(await h)():h)[0];class c extends n.ZAu{constructor(){super(),this.matrixAutoUpdate=!1,this.circle=new s.Z({diameter:10,scale:1,circle:0,opacity:.1}),this.add(this.circle)}enter(){const e={x:this.circle.material.uniforms.arc.value.x,y:this.circle.material.uniforms.arc.value.y};this.tl=new o.ZP.timeline,this.tl.to(e,{x:1,y:1,duration:5,ease:"sine.inOut",onUpdate:()=>{this.circle.material.uniforms.arc.value.x=e.x}},"a")}render(){}dispose(){this.circle.dispose()}resize(){this.circle.diameter=r["default"].fov.width,this.position.y=.5*-r["default"].fov.height,this.circle.resize(),this.updateMatrix()}}a()}catch(c){a(c)}}))},7239:function(e,t,i){i.a(e,(async function(e,a){try{i.d(t,{Z:function(){return v}});var n=i(7327),o=i(1114),r=i(4059),s=i(5349),h=i(8291),c=i(4314),d=i(599),f=i(2214),l=i(602),u=i(8964),p=i(2873),x=i(3964),m=i(7875),g=e([c,d,f]);[c,d,f]=g.then?(await g)():g;class v extends o.ZAu{constructor(){super(),(0,n.Z)(this,"variables",{rotationY:1.75}),this.target=new o.dd2(c["default"].viewport.width*c["default"].pixelRatio,c["default"].viewport.height*c["default"].pixelRatio,{minFilter:o.wem,magFilter:o.wem,type:o.cLu})}init(){this.geometry=new o.cJO(1,64);const{worldMap:e,alphaMap:t,map:i}=l["default"];this.material=new o.Wid({color:new o.Ilk(14329120),metalness:1,roughness:.15,roughnessMap:e,normalMap:null,normalScale:new o.FM8(.1,.1),envMap:l["default"].textureCube,map:e,alphaMap:t,transparent:!0,userData:{transition:{value:1}}}),this.material.normalMap=new o.ROQ(new u.G,o.xfE,o.rpg,o.rpg),this.material.normalMap.repeat.set(40,40),this.material.onBeforeCompile=e=>{e.uniforms.transition=this.material.userData.transition,e.fragmentShader="uniform float transition;\n"+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace("#include <alphamap_fragment>",p.Z)},this.sphere=new o.Kj0(this.geometry,this.material),this.sphere.matrixAutoUpdate=!1,this.sphere.rotation.y=this.variables.rotationY,this.sphere.rotation.x=.875,this.sphere.scale.set(2.7,2.7,2.7),this.sphere.updateMatrix(),this.add(this.sphere);const a={progress:!0,shaderChunks:{position_pars_vertex:"\n          // https://github.com/glslify/glsl-easings/\n          float quadraticOut(float t) {\n            return -t * (t - 2.0);\n          }\n          float cubicOut(float t) {\n            float f = t - 1.0;\n            return f * f * f + 1.0;\n          }\n          uniform mat4 modelMatrix;\n          uniform mat3 normalMatrix;\n          uniform vec3 cameraPosition;\n\n          in vec3 normal;\n\n          out vec3 worldNormal;\n          out vec3 eyeVector;\n        ",transformed_vertex:"\n          vec4 worldPos = modelMatrix * vec4(position.xyz, 1.0);\n\n          transformed.x += 260.0 * 0.5 * (1.0 - quadraticOut(vProgress));\n          transformed.z += 260.0 * (1.0 - cubicOut(vProgress));\n\n          vec3 transformedNormal = normalMatrix * normal;\n          worldNormal = normalize(transformedNormal);\n\n          eyeVector = normalize(worldPos.xyz - cameraPosition);\n        ",color_pars_fragment:"\n          uniform vec3 color;\n          uniform vec2 resolution;\n          uniform vec3 cameraPosition;\n          uniform sampler2D uTexture;\n\n          uniform vec3 uLight;\n          uniform float uShininess;\n          uniform float uDiffuseness;\n\n          uniform float uIorR;\n          uniform float uIorY;\n          uniform float uIorG;\n          uniform float uIorC;\n          uniform float uIorB;\n          uniform float uIorP;\n\n          uniform float uRefractPower;\n          uniform float uChromaticAberration;\n          uniform float uSaturation;\n\n\n          in vec3 worldNormal;\n          in vec3 eyeVector;\n          \n          // https://github.com/mrdoob/three.js/blob/205e345b4f48f8b560b3b35391fd914cba1997a0/src/renderers/shaders/ShaderChunk/encodings_pars_fragment.glsl.js#L20-L22\n          vec4 LinearTosRGB( in vec4 value ) {\n            return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n          }\n\n          vec3 sat(vec3 rgb, float adjustment) {\n            const vec3 W = vec3(0.2125, 0.7154, 0.0721);\n            vec3 intensity = vec3(dot(rgb, W));\n            return mix(intensity, rgb, adjustment);\n          }\n\n          float specular(vec3 light, float shininess, float diffuseness) {\n            vec3 normal = worldNormal;\n            vec3 lightVector = normalize(-light);\n            vec3 halfVector = normalize(eyeVector + lightVector);\n\n            float NdotL = dot(normal, lightVector);\n            float NdotH =  dot(normal, halfVector);\n            float kDiffuse = max(0.0, NdotL);\n            float NdotH2 = NdotH * NdotH;\n\n            float kSpecular = pow(NdotH2, shininess);\n            return  kSpecular + kDiffuse * diffuseness;\n          }\n          const int LOOP = 16;\n        ",color_fragment:"\n          float iorRatio = 1.0/1.31;\n          vec2 uv = gl_FragCoord.xy / resolution.xy;\n          vec3 normal = worldNormal;\n\n          vec3 color = vec3(0.0);\n\n          for ( int i = 0; i < LOOP; i ++ ) {\n            float slide = float(i) / float(LOOP) * 0.1;\n        \n            vec3 refractVecR = refract(eyeVector, normal,(1.0/uIorR));\n            vec3 refractVecY = refract(eyeVector, normal, (1.0/uIorY));\n            vec3 refractVecG = refract(eyeVector, normal, (1.0/uIorG));\n            vec3 refractVecC = refract(eyeVector, normal, (1.0/uIorC));\n            vec3 refractVecB = refract(eyeVector, normal, (1.0/uIorB));\n            vec3 refractVecP = refract(eyeVector, normal, (1.0/uIorP));\n        \n            float r = texture(uTexture, uv + refractVecR.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 0.5;\n        \n            float y = (texture(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 +\n                        texture(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y * 2.0 -\n                        texture(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z) / 6.0;\n        \n            float g = texture(uTexture, uv + refractVecG.xy * (uRefractPower + slide * 2.0) * uChromaticAberration).y * 0.5;\n        \n            float c = (texture(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).y * 2.0 +\n                        texture(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).z * 2.0 -\n                        texture(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).x) / 6.0;\n                  \n            float b = texture(uTexture, uv + refractVecB.xy * (uRefractPower + slide * 3.0) * uChromaticAberration).z * 0.5;\n        \n            float p = (texture(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z * 2.0 +\n                        texture(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 -\n                        texture(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y) / 6.0;\n        \n            float R = r + (2.0*p + 2.0*y - c)/3.0;\n            float G = g + (2.0*y + 2.0*c - p)/3.0;\n            float B = b + (2.0*c + 2.0*p - y)/3.0;\n        \n            color.r += R;\n            color.g += G;\n            color.b += B;\n        \n            // color = sat(color, uSaturation);\n          }\n\n\n          // vec3 refractVec = refract(eyeVector, normal, iorRatio);\n          // diffuseColor = texture(uTexture, uv).rgb;\n          // diffuseColor = vec3(0.5, 0.5, 1.0) - texture(uTexture, uv + refractVec.xy).rgb;\n          // diffuseColor = LinearTosRGB(texture(uTexture, uv + refractVec.xy)).rgb;\n          // diffuseColor = LinearTosRGB(vec4(color, 1.0)).rgb;\n          diffuseColor = color;\n\n          float specularLight = specular(uLight, uShininess, uDiffuseness);\n          diffuseColor += specularLight;\n        ",alpha_fragment:"alpha *= vProgress * opacity;"}};this.glyph=new r.rZ({text:"RÉMI TRAN",font:x,map:i,color:new o.Ilk(199710),letterSpacing:10,addons:a}),this.glyph.matrixAutoUpdate=!1,this.glyph.mesh.matrixAutoUpdate=!1,this.glyph.scale.set(.0075,.0075,.0075),this.glyph.center(),this.glyph.children[0].geometry.computeVertexNormals(),this.glyph.position.z=2.75,this.glyph.material.uniforms.progress.value=0,this.glyph.material.uniforms.uTexture={value:null},this.glyph.material.uniforms.resolution={value:new o.FM8(c["default"].viewport.width*c["default"].pixelRatio,c["default"].viewport.height*c["default"].pixelRatio)},this.glyph.material.uniforms.uLight={value:new o.Pa4(-.5,4,10)},this.glyph.material.uniforms.uDiffuseness={value:.2},this.glyph.material.uniforms.uShininess={value:40},this.glyph.material.uniforms.uIorR={value:1.15},this.glyph.material.uniforms.uIorY={value:1.16},this.glyph.material.uniforms.uIorG={value:1.18},this.glyph.material.uniforms.uIorC={value:1.22},this.glyph.material.uniforms.uIorB={value:1.22},this.glyph.material.uniforms.uIorP={value:1.22},this.glyph.material.uniforms.uSaturation={value:1.14},this.glyph.material.uniforms.uChromaticAberration={value:.5},this.glyph.material.uniforms.uRefractPower={value:.25},this.glyph.updateMatrix(),this.glyph.mesh.updateMatrix(),this.add(this.glyph),this.glyph2=new r.rZ({text:"CODER",font:m,map:i,color:new o.Ilk(16777215),letterSpacing:20,addons:a}),this.glyph2.matrixAutoUpdate=!1,this.glyph2.mesh.matrixAutoUpdate=!1,this.glyph2.scale.set(.0075,.0075,.0075),this.glyph2.position.z=2.8,this.glyph2.position.y=-1.025,this.glyph2.center(),this.glyph2.children[0].geometry.computeVertexNormals(),this.glyph2.updateMatrix(),this.glyph2.mesh.updateMatrix(),this.add(this.glyph2)}enter(){const e={x:0,y:0,z:1},t=new s.ZP.timeline;t.to(e,{z:0,duration:2.5,yoyo:!0,ease:"linear",onUpdate:()=>{this.material.userData.transition.value=e.z}},"a"),t.to(e,{x:1,duration:1.5,ease:"linear",onUpdate:()=>{this.glyph.material.uniforms.progress.value=e.x}},"a+=1.5"),t.to(e,{y:1,duration:1,ease:"linear",onUpdate:()=>{this.glyph2.material.uniforms.progress.value=e.y}},"a+=2")}render(e,t){h.Ui.damp3(this.position,[this.position.x,this.position.y,2.25*(1-Math.cos(d.Z.coords.x))],.2,t/1e3),h.Ui.damp3(this.rotation,[3.14*d.Z.coords.y*.0314*.9,3.14*d.Z.coords.x*.0314*1.4,0],.2,t/1e3),this.glyph&&(this.glyph.visible=!1,this.glyph2.visible=!1,f.Z.renderer.setRenderTarget(this.target),f.Z.render(),this.target.texture.colorSpace=o.GUF,this.glyph.children[0].material.uniforms.uTexture.value=this.target.texture,this.glyph2.children[0].material.uniforms.uTexture.value=this.target.texture,this.glyph.visible=!0,this.glyph2.visible=!0)}dispose(){this.remove(this.sphere),this.remove(this.glyph),this.remove(this.glyph2),this.sphere.geometry.dispose(),this.sphere.material.dispose(),this.glyph.geometry.dispose(),this.glyph.material.dispose(),this.glyph2.geometry.dispose(),this.glyph2.material.dispose(),this.target.dispose()}resize(){this.glyph&&this.glyph.material.uniforms.resolution.value.set(c["default"].viewport.width*c["default"].pixelRatio,c["default"].viewport.height*c["default"].pixelRatio),this.glyph2&&this.glyph2.material.uniforms.resolution.value.set(c["default"].viewport.width*c["default"].pixelRatio,c["default"].viewport.height*c["default"].pixelRatio),this.target.setSize(c["default"].viewport.width*c["default"].pixelRatio,c["default"].viewport.height*c["default"].pixelRatio)}}a()}catch(v){a(v)}}))},4510:function(e,t,i){i.a(e,(async function(e,a){try{i.d(t,{Z:function(){return h}});var n=i(1114),o=i(4314),r=i(599),s=e([o,r]);[o,r]=s.then?(await s)():s;class h extends n.Kj0{constructor(e={}){const t=new n.vBJ({color:e.color||16777215,userData:{velocity:{value:0}}});super(new n._12(1,1,100),t),t.onBeforeCompile=e=>{e.uniforms.velocity=t.userData.velocity,e.vertexShader="uniform float velocity;\n"+e.vertexShader,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>","\n            vec3 transformed = vec3( position );\n            transformed.y += cos(position.x * 3.14) * velocity * 0.025;\n          ")},this.el=e.el,this.matrixAutoUpdate=!1}render(){this.material.userData.velocity.value=r.Z.velocity}dispose(){}resize(){const{viewport:e,fov:t}=o["default"],i=(this.el.offsetTop-.5*e.height+.5*this.el.offsetHeight)/e.height,a=this.el.offsetHeight/e.height;this.position.y=-i*t.height,this.scale.x=t.width,this.scale.y=a*t.height,this.updateMatrix()}}a()}catch(h){a(h)}}))},4012:function(e,t,i){i.d(t,{Z:function(){return r}});var a=i(1114),n="#define GLSLIFY 1\nin vec2 uv;\nin vec4 position;\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nout float vAlpha;\nout vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  vec4 pos =  projectionMatrix * modelViewMatrix * position;\n  vAlpha = 1.0 - smoothstep(60.0, 100.0, pos.z);\n  gl_Position = pos;\n}",o="\n#define TAU 6.28318530718\nprecision highp float;\n#define GLSLIFY 1\n\nuniform float opacity;\nuniform float visibility;\nuniform float circle;\nuniform float scale;\nuniform vec2 arc;\nuniform vec3 color;\n\nin float vAlpha;\nin vec2 vUv;\n\nout vec4 myOutputColor;\n\nvoid main() {\n  float size = 0.5 - (1.0 - visibility) * scale * 0.5;\n\n  float tetha = distance(vUv, vec2(0.5) );\n  float delta = fwidth(tetha);\n    \n  float alpha = smoothstep(size - delta, size, tetha);\n    \n  float size2 = size * (1.0 - circle) - delta * 2.0;\n  float alpha2 = smoothstep(size2 - delta, size2, tetha);\n  \n  vec2 center = vUv - vec2(0.5);\n  float angle = mod(atan(center.x, center.y) + TAU * arc.y, TAU) ;\n  angle = smoothstep(0.0, TAU, angle);\n\n  // gl_FragColor = vec4(color, (alpha2 - alpha) * step(angle, arc.x) * opacity * vAlpha);\n  \n  myOutputColor = vec4(color, (alpha2 * (1.0 -alpha)) * opacity * vAlpha * step(angle, arc.x));\n  if (myOutputColor.a < 0.0001) discard;\n}";class r extends a.Kj0{constructor({scene:e,diameter:t=160,circle:i=0,opacity:r=.5,visibility:s=1,scale:h=.0625,renderOrder:c=2,color:d=16777215}){const f=new a.FIo({glslVersion:a.LSk,transparent:!0,uniforms:{opacity:{type:"f",value:r},visibility:{type:"f",value:s},circle:{type:"f",value:i},scale:{type:"f",value:h},color:{type:"c",value:new a.Ilk(d)},resolution:{type:"v2",value:new a.FM8(0,0)},arc:{type:"v2",value:new a.FM8(0,.5)}},vertexShader:n,fragmentShader:o,depthTest:!c}),l=new a._12(1,1,1);super(l,f),this.scene=e,this.diameter=t,this.opacity=r,this.matrixAutoUpdate=!1,this.interpolate={x:0,y:0,arc2:0,circle:i}}render(){}resize(){this.scale.x=this.diameter,this.scale.y=this.diameter,this.updateMatrix()}dispose(){this.geometry.dispose(),this.material.dispose()}}},8717:function(e,t,i){i.a(e,(async function(e,a){try{var n=i(599),o=i(2214),r=i(8347),s=i(5349),h=e([n,o,r]);[n,o,r]=h.then?(await h)():h,Math.TAU=2*Math.PI,t.Z=class{constructor(){n.Z.init(),o.Z.init(),this.output=new r.Z,this.init()}init(){this.resize(),this.x=this.resize.bind(this),window.addEventListener("resize",this.x,!1),this.boundRender=this.render.bind(this),s.ZP.ticker.add(this.boundRender)}render(e,t){n.Z.render(e,t),this.output.render(e,t)}resize(){n.Z.resize(),o.Z.resize(),this.output.resize()}dispose(){window.removeEventListener("resize",this.x),s.ZP.ticker.remove(this.boundRender),n.Z.dispose(),o.Z.dispose(),this.output.dispose()}},a()}catch(c){a(c)}}))},866:function(e,t,i){i.a(e,(async function(e,t){try{var a=i(5349),n=i(8797),o=i(750),r=i(9933),s=i(8717),h=i(9242),c=i(2207),d=e([s]);s=(d.then?(await d)():d)[0],a.ZP.registerPlugin(n.Z,o.ZP,r.Z);const f=(0,h.ri)(c.Z);f.provide("graphics",new s.Z),f.mount("#app"),t()}catch(f){t(f)}}))},4314:function(e,t,i){i.a(e,(async function(e,a){try{var n=i(6703),o=e([n]);n=(o.then?(await o)():o)[0],t["default"]={WebGPU:{isAvailable:n.Z.isAvailable()},viewport:{width:window.innerWidth,height:window.innerHeight},fov:{width:1,height:1},pixelRatio:Math.min(window.devicePixelRatio,2)},a()}catch(r){a(r)}}))},2207:function(e,t,i){i.d(t,{Z:function(){return v}});var a=i(3396);function n(e,t,i,n,o,r){const s=(0,a.up)("HomeView");return(0,a.wg)(),(0,a.j4)(s)}const o={class:"mast-head",ref:"hero"},r=(0,a.uE)('<div class="label" data-v-091165ee>coming soon..</div><a href="https://github.com/trinketmage/" target="_BLANK" data-v-091165ee>github</a><a href="https://stackoverflow.com/users/3382951/nephelococcygia" target="_BLANK" data-v-091165ee>stackoverflow</a><a href="https://www.shadertoy.com/user/trinketMage" target="_BLANK" data-v-091165ee>shadertoy</a><a href="https://codepen.io/trinketmage" target="_BLANK" data-v-091165ee>codepen</a><a href="https://twitter.com/remuemeninge" target="_BLANK" data-v-091165ee>x</a><a href="mailto:tranremi@live.fr" target="_BLANK" data-v-091165ee>tranremi@live.fr</a>',7),s=[r];function h(e,t,i,n,r,h){return(0,a.wg)(),(0,a.iD)("div",o,s,512)}var c=i(4870),d=i(5349),f=i(8797),l={setup(){let e=(0,a.f3)("graphics");const t=(0,c.iH)(null),i=(0,c.iH)(null),{rotationY:n}=e.output.components.atlas.variables,o={rotationY:n,velocity:0},r=document.createElement("div");let s=null,h=0;const l=d.ZP.utils.wrap(0,1),u=3e3,p=d.ZP.fromTo(o,{rotationY:Math.TAU},{paused:!0,rotationY:0,duration:20,ease:"none",repeat:-1});return(0,a.bv)((()=>{p.progress((Math.TAU-n)/Math.TAU);const t=()=>{let t=h+(s[0].startX-s[0].x)/u;p.progress(l(t)),e.output.components.atlas.sphere&&(e.output.components.atlas.sphere.rotation.y=o.rotationY,e.output.components.atlas.sphere.updateMatrix())};s=f.Z.create(r,{trigger:i.value,type:"x",inertia:!0,allowNativeTouchScrolling:!0,onPress(){d.ZP.killTweensOf(p),p.timeScale(0),h=p.progress()},onDrag:t,onThrowUpdate:t})})),(0,a.Ah)((()=>{s[0].kill()})),{corps:t,hero:i}}},u=i(89);const p=(0,u.Z)(l,[["render",h],["__scopeId","data-v-091165ee"]]);var x=p,m={components:{HomeView:x}};const g=(0,u.Z)(m,[["render",n]]);var v=g},3964:function(e){e.exports=JSON.parse('{"pages":["Love.png"],"chars":[{"id":201,"index":134,"char":"É","width":69,"height":215,"xoffset":11,"yoffset":12,"xadvance":87,"chnl":15,"x":0,"y":0,"page":0},{"id":84,"index":56,"char":"T","width":74,"height":184,"xoffset":9,"yoffset":43,"xadvance":93,"chnl":15,"x":0,"y":220,"page":0},{"id":82,"index":54,"char":"R","width":132,"height":184,"xoffset":11,"yoffset":43,"xadvance":153,"chnl":15,"x":74,"y":0,"page":0},{"id":65,"index":37,"char":"A","width":77,"height":184,"xoffset":7,"yoffset":43,"xadvance":92,"chnl":15,"x":79,"y":189,"page":0},{"id":78,"index":50,"char":"N","width":73,"height":184,"xoffset":11,"yoffset":43,"xadvance":95,"chnl":15,"x":161,"y":189,"page":0},{"id":77,"index":49,"char":"M","width":103,"height":184,"xoffset":8,"yoffset":43,"xadvance":119,"chnl":15,"x":211,"y":0,"page":0},{"id":73,"index":45,"char":"I","width":27,"height":184,"xoffset":11,"yoffset":43,"xadvance":48,"chnl":15,"x":239,"y":189,"page":0},{"id":32,"index":4,"char":" ","width":0,"height":0,"xoffset":-1,"yoffset":225,"xadvance":58,"chnl":15,"x":74,"y":189,"page":0}],"info":{"face":"Love","size":260,"bold":0,"italic":0,"charset":["T","R","A","N","É","M","I"," "],"unicode":1,"stretchH":100,"smooth":1,"aa":1,"padding":[1,1,1,1],"spacing":[0,0],"outline":0},"common":{"lineHeight":274,"base":225,"scaleW":512,"scaleH":512,"pages":1,"packed":0,"alphaChnl":0,"redChnl":0,"greenChnl":0,"blueChnl":0},"distanceField":{"fieldType":"msdf","distanceRange":3},"kernings":[{"first":84,"second":65,"amount":-16},{"first":84,"second":77,"amount":-9},{"first":82,"second":84,"amount":-3},{"first":82,"second":65,"amount":-4},{"first":82,"second":201,"amount":3},{"first":65,"second":84,"amount":-13},{"first":65,"second":82,"amount":-1},{"first":65,"second":65,"amount":-6},{"first":65,"second":78,"amount":-3},{"first":65,"second":201,"amount":-4},{"first":65,"second":77,"amount":-1},{"first":65,"second":73,"amount":-3},{"first":78,"second":65,"amount":-3},{"first":78,"second":77,"amount":1},{"first":201,"second":84,"amount":3},{"first":201,"second":82,"amount":3},{"first":201,"second":65,"amount":8},{"first":77,"second":84,"amount":-9},{"first":77,"second":65,"amount":-3},{"first":77,"second":78,"amount":1},{"first":73,"second":82,"amount":3},{"first":73,"second":65,"amount":-4}]}')},7875:function(e){e.exports=JSON.parse('{"pages":["Love.png"],"chars":[{"id":201,"index":27,"char":"É","width":10,"height":17,"xoffset":0,"yoffset":1,"xadvance":10,"chnl":15,"x":0,"y":409,"page":0},{"id":106,"index":192,"char":"j","width":5,"height":16,"xoffset":-1,"yoffset":5,"xadvance":3,"chnl":15,"x":0,"y":431,"page":0},{"id":87,"index":109,"char":"W","width":16,"height":13,"xoffset":-1,"yoffset":5,"xadvance":15,"chnl":15,"x":0,"y":452,"page":0},{"id":98,"index":154,"char":"b","width":10,"height":14,"xoffset":0,"yoffset":5,"xadvance":9,"chnl":15,"x":10,"y":431,"page":0},{"id":100,"index":161,"char":"d","width":10,"height":14,"xoffset":-1,"yoffset":5,"xadvance":9,"chnl":15,"x":15,"y":409,"page":0},{"id":102,"index":174,"char":"f","width":6,"height":14,"xoffset":-1,"yoffset":4,"xadvance":5,"chnl":15,"x":0,"y":470,"page":0},{"id":119,"index":251,"char":"w","width":14,"height":10,"xoffset":-1,"yoffset":8,"xadvance":12,"chnl":15,"x":0,"y":489,"page":0},{"id":67,"index":16,"char":"C","width":12,"height":14,"xoffset":0,"yoffset":4,"xadvance":11,"chnl":15,"x":11,"y":470,"page":0},{"id":71,"index":36,"char":"G","width":12,"height":14,"xoffset":0,"yoffset":4,"xadvance":12,"chnl":15,"x":21,"y":450,"page":0},{"id":74,"index":53,"char":"J","width":9,"height":14,"xoffset":-1,"yoffset":5,"xadvance":8,"chnl":15,"x":25,"y":428,"page":0},{"id":79,"index":69,"char":"O","width":13,"height":14,"xoffset":0,"yoffset":4,"xadvance":12,"chnl":15,"x":30,"y":409,"page":0},{"id":81,"index":81,"char":"Q","width":13,"height":14,"xoffset":0,"yoffset":4,"xadvance":12,"chnl":15,"x":19,"y":489,"page":0},{"id":83,"index":86,"char":"S","width":11,"height":14,"xoffset":-1,"yoffset":4,"xadvance":10,"chnl":15,"x":28,"y":469,"page":0},{"id":85,"index":97,"char":"U","width":11,"height":14,"xoffset":0,"yoffset":5,"xadvance":11,"chnl":15,"x":38,"y":447,"page":0},{"id":48,"index":440,"char":"0","width":11,"height":14,"xoffset":0,"yoffset":5,"xadvance":10,"chnl":15,"x":39,"y":428,"page":0},{"id":51,"index":443,"char":"3","width":10,"height":14,"xoffset":0,"yoffset":5,"xadvance":10,"chnl":15,"x":48,"y":409,"page":0},{"id":54,"index":446,"char":"6","width":10,"height":14,"xoffset":0,"yoffset":5,"xadvance":10,"chnl":15,"x":37,"y":488,"page":0},{"id":56,"index":448,"char":"8","width":10,"height":14,"xoffset":0,"yoffset":5,"xadvance":10,"chnl":15,"x":44,"y":466,"page":0},{"id":57,"index":449,"char":"9","width":10,"height":14,"xoffset":0,"yoffset":5,"xadvance":10,"chnl":15,"x":54,"y":447,"page":0},{"id":233,"index":166,"char":"é","width":10,"height":14,"xoffset":-1,"yoffset":4,"xadvance":9,"chnl":15,"x":55,"y":428,"page":0},{"id":103,"index":175,"char":"g","width":10,"height":13,"xoffset":-1,"yoffset":8,"xadvance":9,"chnl":15,"x":63,"y":409,"page":0},{"id":104,"index":180,"char":"h","width":9,"height":13,"xoffset":0,"yoffset":5,"xadvance":9,"chnl":15,"x":52,"y":485,"page":0},{"id":105,"index":183,"char":"i","width":4,"height":13,"xoffset":0,"yoffset":5,"xadvance":3,"chnl":15,"x":59,"y":466,"page":0},{"id":107,"index":195,"char":"k","width":9,"height":13,"xoffset":0,"yoffset":5,"xadvance":8,"chnl":15,"x":66,"y":484,"page":0},{"id":108,"index":198,"char":"l","width":4,"height":13,"xoffset":0,"yoffset":5,"xadvance":3,"chnl":15,"x":68,"y":466,"page":0},{"id":109,"index":203,"char":"m","width":13,"height":10,"xoffset":0,"yoffset":8,"xadvance":13,"chnl":15,"x":66,"y":502,"page":0},{"id":112,"index":220,"char":"p","width":10,"height":13,"xoffset":0,"yoffset":8,"xadvance":9,"chnl":15,"x":69,"y":447,"page":0},{"id":113,"index":222,"char":"q","width":10,"height":13,"xoffset":-1,"yoffset":8,"xadvance":9,"chnl":15,"x":77,"y":465,"page":0},{"id":116,"index":234,"char":"t","width":6,"height":13,"xoffset":-1,"yoffset":5,"xadvance":5,"chnl":15,"x":80,"y":483,"page":0},{"id":121,"index":257,"char":"y","width":10,"height":13,"xoffset":-1,"yoffset":8,"xadvance":8,"chnl":15,"x":70,"y":427,"page":0},{"id":65,"index":4,"char":"A","width":12,"height":13,"xoffset":-1,"yoffset":5,"xadvance":11,"chnl":15,"x":78,"y":409,"page":0},{"id":66,"index":15,"char":"B","width":11,"height":13,"xoffset":0,"yoffset":5,"xadvance":11,"chnl":15,"x":84,"y":445,"page":0},{"id":68,"index":22,"char":"D","width":11,"height":13,"xoffset":0,"yoffset":5,"xadvance":11,"chnl":15,"x":85,"y":427,"page":0},{"id":69,"index":26,"char":"E","width":10,"height":13,"xoffset":0,"yoffset":5,"xadvance":10,"chnl":15,"x":79,"y":378,"page":0},{"id":70,"index":35,"char":"F","width":10,"height":13,"xoffset":0,"yoffset":5,"xadvance":9,"chnl":15,"x":94,"y":378,"page":0},{"id":72,"index":41,"char":"H","width":11,"height":13,"xoffset":0,"yoffset":5,"xadvance":11,"chnl":15,"x":95,"y":396,"page":0},{"id":73,"index":44,"char":"I","width":4,"height":13,"xoffset":0,"yoffset":5,"xadvance":4,"chnl":15,"x":109,"y":378,"page":0},{"id":75,"index":55,"char":"K","width":12,"height":13,"xoffset":0,"yoffset":5,"xadvance":10,"chnl":15,"x":91,"y":483,"page":0},{"id":76,"index":57,"char":"L","width":10,"height":13,"xoffset":0,"yoffset":5,"xadvance":9,"chnl":15,"x":92,"y":463,"page":0},{"id":77,"index":62,"char":"M","width":13,"height":13,"xoffset":0,"yoffset":5,"xadvance":14,"chnl":15,"x":100,"y":445,"page":0},{"id":78,"index":63,"char":"N","width":11,"height":13,"xoffset":0,"yoffset":5,"xadvance":11,"chnl":15,"x":107,"y":463,"page":0},{"id":80,"index":79,"char":"P","width":11,"height":13,"xoffset":0,"yoffset":5,"xadvance":10,"chnl":15,"x":101,"y":414,"page":0},{"id":82,"index":82,"char":"R","width":11,"height":13,"xoffset":0,"yoffset":5,"xadvance":10,"chnl":15,"x":111,"y":396,"page":0},{"id":84,"index":92,"char":"T","width":11,"height":13,"xoffset":-1,"yoffset":5,"xadvance":10,"chnl":15,"x":118,"y":378,"page":0},{"id":86,"index":108,"char":"V","width":12,"height":13,"xoffset":-1,"yoffset":5,"xadvance":10,"chnl":15,"x":117,"y":414,"page":0},{"id":88,"index":114,"char":"X","width":12,"height":13,"xoffset":-1,"yoffset":5,"xadvance":10,"chnl":15,"x":127,"y":396,"page":0},{"id":89,"index":115,"char":"Y","width":12,"height":13,"xoffset":-1,"yoffset":5,"xadvance":10,"chnl":15,"x":134,"y":378,"page":0},{"id":90,"index":120,"char":"Z","width":11,"height":13,"xoffset":-1,"yoffset":5,"xadvance":10,"chnl":15,"x":118,"y":432,"page":0},{"id":49,"index":441,"char":"1","width":6,"height":13,"xoffset":-1,"yoffset":5,"xadvance":5,"chnl":15,"x":108,"y":481,"page":0},{"id":50,"index":442,"char":"2","width":10,"height":13,"xoffset":-1,"yoffset":5,"xadvance":9,"chnl":15,"x":108,"y":499,"page":0},{"id":52,"index":444,"char":"4","width":11,"height":13,"xoffset":-1,"yoffset":5,"xadvance":9,"chnl":15,"x":119,"y":481,"page":0},{"id":53,"index":445,"char":"5","width":10,"height":13,"xoffset":0,"yoffset":5,"xadvance":9,"chnl":15,"x":123,"y":499,"page":0},{"id":55,"index":447,"char":"7","width":10,"height":13,"xoffset":-1,"yoffset":5,"xadvance":8,"chnl":15,"x":123,"y":450,"page":0},{"id":97,"index":143,"char":"a","width":10,"height":11,"xoffset":-1,"yoffset":8,"xadvance":8,"chnl":15,"x":84,"y":501,"page":0},{"id":99,"index":155,"char":"c","width":10,"height":11,"xoffset":-1,"yoffset":8,"xadvance":8,"chnl":15,"x":135,"y":468,"page":0},{"id":101,"index":165,"char":"e","width":10,"height":11,"xoffset":-1,"yoffset":8,"xadvance":9,"chnl":15,"x":138,"y":484,"page":0},{"id":111,"index":210,"char":"o","width":10,"height":11,"xoffset":-1,"yoffset":8,"xadvance":9,"chnl":15,"x":138,"y":500,"page":0},{"id":115,"index":227,"char":"s","width":9,"height":11,"xoffset":-1,"yoffset":8,"xadvance":8,"chnl":15,"x":134,"y":414,"page":0},{"id":110,"index":204,"char":"n","width":9,"height":10,"xoffset":0,"yoffset":8,"xadvance":9,"chnl":15,"x":144,"y":396,"page":0},{"id":114,"index":223,"char":"r","width":7,"height":10,"xoffset":0,"yoffset":8,"xadvance":6,"chnl":15,"x":151,"y":378,"page":0},{"id":117,"index":239,"char":"u","width":9,"height":10,"xoffset":0,"yoffset":8,"xadvance":9,"chnl":15,"x":134,"y":430,"page":0},{"id":118,"index":250,"char":"v","width":10,"height":10,"xoffset":-1,"yoffset":8,"xadvance":8,"chnl":15,"x":138,"y":445,"page":0},{"id":120,"index":256,"char":"x","width":10,"height":10,"xoffset":-1,"yoffset":8,"xadvance":8,"chnl":15,"x":150,"y":460,"page":0},{"id":122,"index":262,"char":"z","width":9,"height":10,"xoffset":-1,"yoffset":8,"xadvance":7,"chnl":15,"x":148,"y":411,"page":0},{"id":45,"index":567,"char":"-","width":6,"height":3,"xoffset":0,"yoffset":11,"xadvance":6,"chnl":15,"x":138,"y":460,"page":0},{"id":39,"index":599,"char":"\'","width":3,"height":6,"xoffset":0,"yoffset":5,"xadvance":3,"chnl":15,"x":99,"y":501,"page":0},{"id":46,"index":537,"char":".","width":4,"height":4,"xoffset":0,"yoffset":14,"xadvance":3,"chnl":15,"x":0,"y":508,"page":0},{"id":32,"index":3,"char":" ","width":0,"height":0,"xoffset":-1,"yoffset":16,"xadvance":3,"chnl":15,"x":74,"y":194,"page":0}],"info":{"face":"PPNeueMontreal-Medium","size":16,"bold":0,"italic":0,"charset":["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","é","É","-",".","\'"," "],"unicode":1,"stretchH":100,"smooth":1,"aa":1,"padding":[1,1,1,1],"spacing":[0,0],"outline":0},"common":{"lineHeight":19,"base":16,"scaleW":512,"scaleH":512,"pages":1,"packed":0,"alphaChnl":0,"redChnl":0,"greenChnl":0,"blueChnl":0},"distanceField":{"fieldType":"msdf","distanceRange":3},"kernings":[]}')}},t={};function i(a){var n=t[a];if(void 0!==n)return n.exports;var o=t[a]={exports:{}};return e[a].call(o.exports,o,o.exports,i),o.exports}i.m=e,function(){var e="function"===typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"===typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",a="function"===typeof Symbol?Symbol("webpack error"):"__webpack_error__",n=function(e){e&&e.d<1&&(e.d=1,e.forEach((function(e){e.r--})),e.forEach((function(e){e.r--?e.r++:e()})))},o=function(i){return i.map((function(i){if(null!==i&&"object"===typeof i){if(i[e])return i;if(i.then){var o=[];o.d=0,i.then((function(e){r[t]=e,n(o)}),(function(e){r[a]=e,n(o)}));var r={};return r[e]=function(e){e(o)},r}}var s={};return s[e]=function(){},s[t]=i,s}))};i.a=function(i,r,s){var h;s&&((h=[]).d=-1);var c,d,f,l=new Set,u=i.exports,p=new Promise((function(e,t){f=t,d=e}));p[t]=u,p[e]=function(e){h&&e(h),l.forEach(e),p["catch"]((function(){}))},i.exports=p,r((function(i){var n;c=o(i);var r=function(){return c.map((function(e){if(e[a])throw e[a];return e[t]}))},s=new Promise((function(t){n=function(){t(r)},n.r=0;var i=function(e){e!==h&&!l.has(e)&&(l.add(e),e&&!e.d&&(n.r++,e.push(n)))};c.map((function(t){t[e](i)}))}));return n.r?s:r()}),(function(e){e?f(p[a]=e):d(u),n(h)})),h&&h.d<0&&(h.d=0)}}(),function(){var e=[];i.O=function(t,a,n,o){if(!a){var r=1/0;for(d=0;d<e.length;d++){a=e[d][0],n=e[d][1],o=e[d][2];for(var s=!0,h=0;h<a.length;h++)(!1&o||r>=o)&&Object.keys(i.O).every((function(e){return i.O[e](a[h])}))?a.splice(h--,1):(s=!1,o<r&&(r=o));if(s){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[a,n,o]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var a in t)i.o(t,a)&&!i.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};i.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,o,r=a[0],s=a[1],h=a[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(n in s)i.o(s,n)&&(i.m[n]=s[n]);if(h)var d=h(i)}for(t&&t(a);c<r.length;c++)o=r[c],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(d)},a=self["webpackChunkvue_three_boilerplate"]=self["webpackChunkvue_three_boilerplate"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=i.O(void 0,[998],(function(){return i(866)}));a=i.O(a)})();
//# sourceMappingURL=app.25aec7c1.js.map