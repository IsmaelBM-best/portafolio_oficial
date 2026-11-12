import * as THREE from 'three';

// A modeled aluminum laptop: the lid and base remain separate articulated solids.
export function makeMacbook(textures, brandTexture) {
 const root=new THREE.Group(),body=new THREE.Group();root.add(body);body.position.y=-.65;
 const metal=new THREE.MeshPhysicalMaterial({color:0xaeb6c4,metalness:.93,roughness:.24,clearcoat:.35,clearcoatRoughness:.2});
 const edge=new THREE.MeshStandardMaterial({color:0xced3dc,metalness:.9,roughness:.25});
 const dark=new THREE.MeshStandardMaterial({color:0x101217,metalness:.3,roughness:.48});
 const rubber=new THREE.MeshStandardMaterial({color:0x090a0e,roughness:.75});
 function rounded(w,h,d,r=.12){const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);const g=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.025,bevelThickness:.018,curveSegments:10});g.translate(0,0,-d/2);return g;}
 function solid(geo,mat,parent=body){const m=new THREE.Mesh(geo,mat);parent.add(m);return m;}
 const base=solid(rounded(8,5.1,.15,.22),metal);base.rotation.x=-Math.PI/2;base.position.set(0,-1.9,.8);
 const seam=solid(rounded(7.95,5.05,.025,.22),edge);seam.rotation.x=-Math.PI/2;seam.position.set(0,-1.99,.8);
 const keyboardBed=solid(rounded(6.58,2.62,.018,.12),rubber);keyboardBed.rotation.x=-Math.PI/2;keyboardBed.position.set(0,-1.8,-.03);
 const keyGeometry=rounded(.395,.33,.035,.035),keys=new THREE.InstancedMesh(keyGeometry,dark,70),dummy=new THREE.Object3D();body.add(keys);
 let k=0;for(let row=0;row<5;row++)for(let col=0;col<14;col++){dummy.position.set((col-6.5)*.456,-1.765,-1.06+row*.48);dummy.rotation.set(-Math.PI/2,0,0);dummy.updateMatrix();keys.setMatrixAt(k++,dummy.matrix);}
 const labels=document.createElement('canvas');labels.width=1400;labels.height=500;const ctx=labels.getContext('2d');ctx.clearRect(0,0,1400,500);ctx.fillStyle='#c8cdd8';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='23px Arial';const rows=['esc 1 2 3 4 5 6 7 8 9 0 − +','tab Q W E R T Y U I O P [ ] ↵','⇧ A S D F G H J K L ; ⇧ ↑ ←','fn Z X C V B N M , . / ← ↓ →','ctrl alt ⌘ · · · · · · · ⌘ alt ◀ ▶'];rows.forEach((row,r)=>row.split(' ').forEach((letter,c)=>ctx.fillText(letter,c*100+50,r*100+50)));
 const labelTexture=new THREE.CanvasTexture(labels);labelTexture.colorSpace=THREE.SRGBColorSpace;
 const legends=solid(new THREE.PlaneGeometry(6.38,2.4),new THREE.MeshBasicMaterial({map:labelTexture,transparent:true,depthWrite:false}));legends.rotation.x=-Math.PI/2;legends.position.set(0,-1.715,-.1);
 const trackOutline=solid(rounded(2.65,1.4,.014,.08),dark);trackOutline.rotation.x=-Math.PI/2;trackOutline.position.set(0,-1.805,2.18);
 const track=solid(rounded(2.62,1.37,.015,.07),new THREE.MeshPhysicalMaterial({color:0xa6adba,metalness:.78,roughness:.34}));track.rotation.x=-Math.PI/2;track.position.set(0,-1.79,2.18);
 const speakers=new THREE.InstancedMesh(new THREE.SphereGeometry(.012,5,4),dark,192);body.add(speakers);k=0;for(const side of [-1,1])for(let row=0;row<32;row++)for(let col=0;col<3;col++){dummy.position.set(side*(3.55+col*.075),-1.792,-1.2+row*.085);dummy.rotation.set(0,0,0);dummy.updateMatrix();speakers.setMatrixAt(k++,dummy.matrix);}
 for(const x of [-3.2,3.2]){const hinge=solid(new THREE.CylinderGeometry(.115,.115,1.05,20),dark);hinge.rotation.z=Math.PI/2;hinge.position.set(x,-1.78,-1.65);}
 for(const z of [-.8,.1,.8]){const port=solid(new THREE.BoxGeometry(.025,.065,.29),rubber);port.position.set(-4.035,-1.9,z);}
 const notch=solid(rounded(.9,.055,.03,.025),dark);notch.position.set(0,-1.9,3.37);
 const lid=new THREE.Group();lid.position.set(0,-1.76,-1.65);body.add(lid);
 const shell=solid(rounded(7.95,5,.11,.19),metal,lid);shell.position.y=2.5;
 const bezel=solid(rounded(7.78,4.86,.025,.14),rubber,lid);bezel.position.set(0,2.5,.075);
 const screenMaterials=textures.map(map=>new THREE.MeshBasicMaterial({map,transparent:true,opacity:0,toneMapped:false,depthWrite:false}));
 const screenBacking=solid(new THREE.PlaneGeometry(7.48,4.55),new THREE.MeshBasicMaterial({color:0xeef0fc,toneMapped:false}),lid);screenBacking.position.set(0,2.52,.12);
 screenMaterials.forEach((mat,i)=>{const h=Math.min(4.55,7.48/(textures[i].image.width/textures[i].image.height));const screen=solid(new THREE.PlaneGeometry(7.48,h),mat,lid);screen.position.set(0,2.52+(4.55-h)/2,.13+i*.001);screen.renderOrder=10+i;});
 const camera=solid(new THREE.CircleGeometry(.025,12),new THREE.MeshBasicMaterial({color:0x31495b}),lid);camera.position.set(0,4.88,.13);
 const label=solid(new THREE.PlaneGeometry(.8,.8),new THREE.MeshBasicMaterial({map:brandTexture,transparent:true,toneMapped:false}),lid);label.rotation.y=Math.PI;label.position.set(0,2.6,-.083);
 const reflection=solid(new THREE.PlaneGeometry(7.48,4.55),new THREE.MeshBasicMaterial({color:0xb9d2ff,transparent:true,opacity:.025,depthWrite:false}),lid);reflection.position.set(0,2.52,.14);reflection.renderOrder=14;
 let currentScreen=0,fromScreen=0,toScreen=0,screenBlend=1;
 function update(progress,hinge,dt=.016){lid.rotation.x=hinge;const target=Math.min(textures.length-1,Math.floor(progress*textures.length));if(target!==toScreen){fromScreen=currentScreen;toScreen=target;screenBlend=0;}screenBlend=Math.min(1,screenBlend+dt/0.32);screenMaterials.forEach((m,i)=>m.opacity=fromScreen===toScreen?(i===toScreen?1:0):i===toScreen?screenBlend:i===fromScreen?1-screenBlend:0);if(screenBlend===1)currentScreen=toScreen;reflection.material.opacity=.025+Math.abs(Math.sin(hinge))*.025;return screenBlend<1;}

 function dispose(){const geometries=new Set(),materials=new Set();root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m))});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());labelTexture.dispose();}
 return {root,update,dispose};
}
