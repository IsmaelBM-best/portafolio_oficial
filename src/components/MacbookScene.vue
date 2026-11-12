<script setup>
import {ref,onMounted,onBeforeUnmount,watch} from 'vue';
import supervision from '../assets/ergasia-supervision-hq.png';
import access from '../assets/ergasia-access-hq.png';
import workday from '../assets/brands/ergasia-workday.jpg';
import logo from '../assets/brands/ergasia.png';
const props=defineProps({pose:Object,reduced:Boolean});
const canvas=ref(null),failed=ref(false),ready=ref(false);let cleanup,kick=()=>{},alive=true;
watch(()=>props.pose,()=>kick());watch(()=>props.reduced,()=>kick());
onMounted(async()=>{
 let renderer,model,environment,textures=[],frame=0,observer;
 const dispose=()=>{cancelAnimationFrame(frame);observer?.disconnect();model?.dispose();textures.forEach(t=>t.dispose());environment?.dispose();renderer?.dispose();};cleanup=dispose;
 try{
 const [THREE,{RoomEnvironment},{makeMacbook}]=await Promise.all([import('three'),import('three/addons/environments/RoomEnvironment.js'),import('../three/macbook.js')]);if(!alive)return;
 renderer=new THREE.WebGLRenderer({canvas:canvas.value,alpha:true,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(Math.max(devicePixelRatio,1.5),2));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(32,innerWidth/innerHeight,.1,100);camera.position.z=18;
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xecf5ff,0x39404e,1.25));const key=new THREE.DirectionalLight(0xffffff,2.6);key.position.set(-5,8,10);scene.add(key);const rim=new THREE.DirectionalLight(0xc2b4e4,1.1);rim.position.set(5,3,-4);scene.add(rim);const fill=new THREE.DirectionalLight(0xc4e4ec,.7);fill.position.set(-6,-2,4);scene.add(fill);
 const loader=new THREE.TextureLoader();const load=async url=>{const t=await loader.loadAsync(url);if(!alive){t.dispose();throw Error('disposed')}t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=renderer.capabilities.getMaxAnisotropy();textures.push(t);return t;};
 const shots=await Promise.all([supervision,access,workday,supervision].map(load)),brand=await load(logo);if(!alive){dispose();return;}
 for(const [i,t] of shots.entries()){
 const target=7.48/4.55;
 if(i===0||i===3){const h=1036/target;t.repeat.set(1036/1400,h/1120);t.offset.set(182/1400,1-(95+h)/1120);t.userData.screenAspect=target;}
 else {const aspect=t.image.width/t.image.height;if(aspect<=target){t.repeat.y=aspect/target;t.offset.y=1-t.repeat.y}}
}
 model=makeMacbook(shots,brand);scene.add(model.root);let width=innerWidth,height=innerHeight,previous=0,current={...props.pose};
 const size=()=>{width=innerWidth;height=innerHeight;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();kick()};
 function render(time){frame=0;if(!alive||document.hidden)return;const dt=Math.min(.05,(time-previous)/1000||.016);previous=time;const blend=1-Math.exp(-dt/0.26);let delta=0;for(const k of ['x','y','scale','angle','tilt','roll','progress','opacity','hinge']){const target=props.pose[k]??0;current[k]=current[k]??target;const difference=target-current[k];current[k]+=difference*blend;delta=Math.max(delta,Math.abs(difference));}
 const unit=2*Math.tan(THREE.MathUtils.degToRad(16))*18/height;model.root.position.set((current.x-width/2)*unit,(height/2-current.y)*unit,0);model.root.rotation.set(THREE.MathUtils.degToRad(current.tilt),THREE.MathUtils.degToRad(current.angle),THREE.MathUtils.degToRad(current.roll));model.root.scale.setScalar(current.scale*680*unit/8);const changing=model.update(current.progress,current.hinge,dt);canvas.value.style.zIndex=props.pose.behind||delta>20?'1':'4';canvas.value.style.opacity=String(current.opacity);renderer.render(scene,camera);ready.value=true;if(delta>.015||changing)frame=requestAnimationFrame(render);}
 kick=()=>{if(!frame&&alive)frame=requestAnimationFrame(render)};const visibility=()=>{if(!document.hidden)kick()};observer=new ResizeObserver(size);observer.observe(document.documentElement);document.addEventListener('visibilitychange',visibility);const baseCleanup=cleanup;cleanup=()=>{document.removeEventListener('visibilitychange',visibility);baseCleanup()};size();kick();
 }catch(error){if(alive){failed.value=true;dispose();console.warn('3D scene unavailable; showing product preview.')}}
});
onBeforeUnmount(()=>{alive=false;cleanup?.()});
</script>
<template><canvas ref="canvas" class="macbook-webgl" :class="{'model-ready':ready}" :style="{zIndex:pose.behind?1:4,visibility:reduced?'hidden':'visible'}" aria-hidden="true"></canvas><div v-if="failed&&!reduced" class="macbook-fallback" :style="{left:pose.x+'px',top:pose.y+'px',transform:`translate(-50%,-50%) scale(${pose.scale}) rotateY(${pose.angle}deg)`}" aria-hidden="true"><img :src="supervision" alt=""></div></template>
