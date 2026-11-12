<script setup>
import {clearanceOpacity} from '../three/layout-safety.js';
import {computed,ref,onMounted,onBeforeUnmount,watch} from 'vue';
import supervision from '../assets/ergasia-supervision-hq.png';
import access from '../assets/ergasia-access-hq.png';
import workday from '../assets/brands/ergasia-workday.jpg';
import logo from '../assets/brands/ergasia.png';
const props=defineProps({pose:Object,reduced:Boolean});
const documentLanguage=document.documentElement.lang==='en'?'Loading 3D experience…':'Cargando experiencia 3D…';
const canvas=ref(null),failed=ref(false),ready=ref(false),hit=ref(null);let cleanup,kick=()=>{},alive=true;
const fallbackSafe=computed(()=>clearanceOpacity({left:props.pose.x-340*props.pose.scale,right:props.pose.x+340*props.pose.scale,top:props.pose.y-250*props.pose.scale,bottom:props.pose.y+250*props.pose.scale},props.pose.forbidden??[])>.99);
watch(()=>props.pose,()=>kick());watch(()=>props.reduced,()=>kick());
onMounted(async()=>{
 let renderer,model,environment,textures=[],frame=0,observer;
 const dispose=()=>{cancelAnimationFrame(frame);observer?.disconnect();model?.dispose();textures.forEach(t=>t.dispose());environment?.dispose();renderer?.dispose();};cleanup=dispose;
 try{
 const [THREE,{RoomEnvironment},{makeMacbook}]=await Promise.all([import('three'),import('three/addons/environments/RoomEnvironment.js'),import('../three/macbook.js')]);if(!alive)return;
 renderer=new THREE.WebGLRenderer({canvas:canvas.value,alpha:true,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1.25:1.5));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(32,innerWidth/innerHeight,.1,100);camera.position.z=18;
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xecf5ff,0x39404e,1.25));const key=new THREE.DirectionalLight(0xffffff,2.6);key.position.set(-5,8,10);scene.add(key);const rim=new THREE.DirectionalLight(0xc2b4e4,1.1);rim.position.set(5,3,-4);scene.add(rim);const fill=new THREE.DirectionalLight(0xc4e4ec,.7);fill.position.set(-6,-2,4);scene.add(fill);
 const loader=new THREE.TextureLoader();const load=async url=>{const t=await loader.loadAsync(url);if(!alive){t.dispose();throw Error('disposed')}t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=renderer.capabilities.getMaxAnisotropy();textures.push(t);return t;};
 const [shotA,shotB,shotC,brand]=await Promise.all([supervision,access,workday,logo].map(load));const shots=[shotA,shotB,shotC,shotA];if(!alive){dispose();return;}
 for(const [i,t] of shots.entries()){
 if(i===3)continue;const target=7.48/4.55;
 if(i===0||i===3){const h=1036/target;t.repeat.set(1036/1400,h/1120);t.offset.set(182/1400,1-(95+h)/1120);t.userData.screenAspect=target;}
 else {const aspect=t.image.width/t.image.height;if(aspect<=target){t.repeat.y=aspect/target;t.offset.y=1-t.repeat.y}}
}
 model=makeMacbook(shots,brand);scene.add(model.root);let width=innerWidth,height=innerHeight,previous=0,current={...props.pose},safeOpacity=0;const bounds=new THREE.Box3(),corner=new THREE.Vector3();
 const size=()=>{width=innerWidth;height=innerHeight;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();kick()};
 function render(time){frame=0;if(!alive||document.hidden)return;if(props.reduced||props.pose.projectsVisible){canvas.value.style.opacity="0";hit.value=null;return;}const dt=Math.min(.05,(time-previous)/1000||.016);previous=time;const blend=1-Math.exp(-dt/0.26);let delta=0;for(const k of ['x','y','scale','angle','tilt','roll','progress','opacity','hinge']){const target=props.pose[k]??0;current[k]=current[k]??target;const difference=target-current[k];current[k]+=difference*blend;delta=Math.max(delta,Math.abs(difference));}
 const unit=2*Math.tan(THREE.MathUtils.degToRad(16))*18/height;model.root.position.set((current.x-width/2)*unit,(height/2-current.y)*unit,0);model.root.rotation.set(THREE.MathUtils.degToRad(current.tilt),THREE.MathUtils.degToRad(current.angle),THREE.MathUtils.degToRad(current.roll));model.root.scale.setScalar(current.scale*680*unit/8);const changing=model.update(current.progress,current.hinge,dt);model.root.updateMatrixWorld(true);camera.updateMatrixWorld(true);bounds.setFromObject(model.root);const rect={left:Infinity,right:-Infinity,top:Infinity,bottom:-Infinity};for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){corner.set(x,y,z).project(camera);const px=(corner.x+1)*width/2,py=(1-corner.y)*height/2;rect.left=Math.min(rect.left,px);rect.right=Math.max(rect.right,px);rect.top=Math.min(rect.top,py);rect.bottom=Math.max(rect.bottom,py);}
 const clear=props.pose.projectsVisible?0:clearanceOpacity(rect,props.pose.forbidden??[]);
 const targetOpacity=clear*current.opacity;safeOpacity=targetOpacity<safeOpacity?targetOpacity:safeOpacity+(targetOpacity-safeOpacity)*blend;
 hit.value={left:rect.left,top:rect.top,width:rect.right-rect.left,height:rect.bottom-rect.top,visible:safeOpacity>.65};canvas.value.style.zIndex='4';canvas.value.style.opacity=String(safeOpacity);canvas.value.dataset.layoutClear=String(clear>0);renderer.render(scene,camera);ready.value=true;if(delta>.015||changing||Math.abs(safeOpacity-targetOpacity)>.005)frame=requestAnimationFrame(render);}
 kick=()=>{if(!frame&&alive)frame=requestAnimationFrame(render)};const visibility=()=>{if(!document.hidden)kick()};observer=new ResizeObserver(size);observer.observe(document.documentElement);document.addEventListener('visibilitychange',visibility);const baseCleanup=cleanup;cleanup=()=>{document.removeEventListener('visibilitychange',visibility);baseCleanup()};size();kick();
 }catch(error){if(alive){failed.value=true;dispose();console.warn('3D scene unavailable; showing product preview.')}}
});
onBeforeUnmount(()=>{alive=false;cleanup?.()});
</script>
<template><div v-if="!ready&&!failed&&!reduced&&pose.opacity>0" class="model-loading" role="status" :style="{left:pose.x+'px',top:pose.y+'px'}"><i></i><span>{{documentLanguage}}</span></div><a v-if="hit?.visible&&!reduced" class="laptop-product-link" href="https://ergasia.pages.dev/" target="_blank" rel="noopener noreferrer" aria-label="Conocer Ergasia" :style="{left:hit.left+'px',top:hit.top+'px',width:hit.width+'px',height:hit.height+'px'}"><i class="laptop-click-indicator" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M7 4 26 19 17 20 13 28Z"/></svg></i></a><canvas ref="canvas" class="macbook-webgl" :class="{'model-ready':ready}" :style="{zIndex:pose.behind?1:4,visibility:reduced?'hidden':'visible'}" aria-hidden="true"></canvas><div v-if="failed&&!reduced&&!pose.projectsVisible&&pose.opacity>0&&fallbackSafe" class="macbook-fallback" :style="{left:pose.x+'px',top:pose.y+'px',transform:`translate(-50%,-50%) scale(${pose.scale}) rotateY(${pose.angle}deg)`}" aria-hidden="true"><img :src="supervision" alt=""></div></template>
