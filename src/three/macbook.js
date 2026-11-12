import * as THREE from 'three';

// A modeled aluminum laptop: the lid and base remain separate articulated solids.
export function makeMacbook(textures, brandTexture) {
 const root=new THREE.Group(),body=new THREE.Group();root.add(body);body.position.y=-.65;
 const metal=new THREE.MeshPhysicalMaterial({color:0x9299a3,metalness:.96,roughness:.32,clearcoat:.12,clearcoatRoughness:.28});
 const edge=new THREE.MeshStandardMaterial({color:0xbfc5ce,metalness:1,roughness:.19});
 const dark=new THREE.MeshStandardMaterial({color:0x17191d,metalness:.05,roughness:.6});
 const rubber=new THREE.MeshStandardMaterial({color:0x090a0e,roughness:.75});
 function rounded(w,h,d,r=.12){const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);const g=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.025,bevelThickness:.018,curveSegments:10});g.translate(0,0,-d/2);return g;}
 function solid(geo,mat,parent=body){const m=new THREE.Mesh(geo,mat);parent.add(m);return m;}
 const base=solid(rounded(8,5.1,.15,.22),metal);base.rotation.x=-Math.PI/2;base.position.set(0,-1.9,.8);
 const seam=solid(rounded(7.95,5.05,.025,.22),edge);seam.rotation.x=-Math.PI/2;seam.position.set(0,-1.99,.8);
 const keyboardBed=solid(rounded(6.58,2.62,.018,.12),rubber);keyboardBed.rotation.x=-Math.PI/2;keyboardBed.position.set(0,-1.8,-.03);
 // Individually sized keycaps with a proper spacebar and recessed keyboard deck.
 const labels=document.createElement('canvas');labels.width=2048;labels.height=1024;
 const ctx=labels.getContext('2d');ctx.fillStyle='#d9dde2';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='27px Arial';
 const keyRows=[
 [['esc',1.3],...['1','2','3','4','5','6','7','8','9','0','−','+'].map(t=>[t,1]),['⌫',1.3]],
 [['tab',1.5],...['Q','W','E','R','T','Y','U','I','O','P','[',']'].map(t=>[t,1]),['\\',1.1]],
 [['caps',1.75],...['A','S','D','F','G','H','J','K','L',';',"'"].map(t=>[t,1]),['return',1.85]],
 [['shift',2.25],...['Z','X','C','V','B','N','M',',','.','/'].map(t=>[t,1]),['shift',2.35]],
 [['fn',1],['ctrl',1],['option',1.2],['⌘',1.3],['',5],['⌘',1.3],['option',1.2],['←',.85],['↕',.9],['→',.85]]
 ];
 keyRows.forEach((row,r)=>{const total=row.reduce((n,k)=>n+k[1],0),unit=6.38/total;let x=-3.19;row.forEach(([text,units])=>{const w=units*unit-.052,cx=x+units*unit/2,z=-1.06+r*.48;const key=solid(rounded(w,.365,.028,.035),dark);key.rotation.x=-Math.PI/2;key.position.set(cx,-1.768,z);ctx.fillText(text,(cx/6.38+.5)*2048,(r+.5)/5*1024);x+=units*unit;});});
 const labelTexture=new THREE.CanvasTexture(labels);labelTexture.colorSpace=THREE.SRGBColorSpace;labelTexture.anisotropy=8;
 const legends=solid(new THREE.PlaneGeometry(6.38,2.4),new THREE.MeshBasicMaterial({map:labelTexture,transparent:true,depthWrite:false,toneMapped:false}));legends.rotation.x=-Math.PI/2;legends.position.set(0,-1.728,-.1);
 const dummy=new THREE.Object3D();let k=0;
 const trackOutline=solid(rounded(2.65,1.4,.014,.08),dark);trackOutline.rotation.x=-Math.PI/2;trackOutline.position.set(0,-1.805,2.18);
 const track=solid(rounded(2.62,1.37,.015,.07),new THREE.MeshPhysicalMaterial({color:0xa6adba,metalness:.78,roughness:.34}));track.rotation.x=-Math.PI/2;track.position.set(0,-1.79,2.18);
 const speakers=new THREE.InstancedMesh(new THREE.SphereGeometry(.012,5,4),dark,192);body.add(speakers);k=0;for(const side of [-1,1])for(let row=0;row<32;row++)for(let col=0;col<3;col++){dummy.position.set(side*(3.55+col*.075),-1.792,-1.2+row*.085);dummy.rotation.set(0,0,0);dummy.updateMatrix();speakers.setMatrixAt(k++,dummy.matrix);}
 for(const x of [-3.2,3.2]){const hinge=solid(new THREE.CylinderGeometry(.115,.115,1.05,20),dark);hinge.rotation.z=Math.PI/2;hinge.position.set(x,-1.78,-1.65);}
 for(const z of [-.8,.1,.8]){const port=solid(new THREE.BoxGeometry(.025,.065,.29),rubber);port.position.set(-4.035,-1.9,z);}
 const notch=solid(rounded(.9,.055,.03,.025),dark);notch.position.set(0,-1.9,3.37);
 for(const x of [-3.15,3.15])for(const z of [-1.1,2.7]){const foot=solid(new THREE.CylinderGeometry(.19,.19,.035,24),rubber);foot.position.set(x,-2.035,z);}
 const lid=new THREE.Group();lid.position.set(0,-1.76,-1.65);body.add(lid);
 const shell=solid(rounded(7.95,5,.11,.19),metal,lid);shell.position.y=2.5;
 const bezel=solid(rounded(7.78,4.86,.025,.14),rubber,lid);bezel.position.set(0,2.5,.075);
 const screenMaterials=textures.map(map=>new THREE.MeshBasicMaterial({map,transparent:true,opacity:0,toneMapped:false,depthWrite:false}));
 const screenBacking=solid(new THREE.PlaneGeometry(7.48,4.55),new THREE.MeshBasicMaterial({color:0xeef0fc,toneMapped:false}),lid);screenBacking.position.set(0,2.52,.12);
 screenMaterials.forEach((mat,i)=>{const h=Math.min(4.55,7.48/(textures[i].userData.screenAspect||textures[i].image.width/textures[i].image.height));const screen=solid(new THREE.PlaneGeometry(7.48,h),mat,lid);screen.position.set(0,2.52+(4.55-h)/2,.13+i*.001);screen.renderOrder=10+i;});
 const camera=solid(new THREE.CircleGeometry(.025,12),new THREE.MeshBasicMaterial({color:0x31495b}),lid);camera.position.set(0,4.88,.13);
 const label=solid(new THREE.PlaneGeometry(.8,.8),new THREE.MeshBasicMaterial({map:brandTexture,transparent:true,toneMapped:false}),lid);label.rotation.y=Math.PI;label.position.set(0,2.6,-.083);
 const reflection=solid(new THREE.PlaneGeometry(7.48,4.55),new THREE.MeshBasicMaterial({color:0xb9d2ff,transparent:true,opacity:.006,depthWrite:false}),lid);reflection.position.set(0,2.52,.14);reflection.renderOrder=14;
 let currentScreen=0,fromScreen=0,toScreen=0,screenBlend=1;
 function update(progress,hinge,dt=.016){lid.rotation.x=hinge;const target=Math.min(textures.length-1,Math.floor(progress*textures.length));screenBacking.material.color.set(target===2?0x080f22:0xeef0fc);if(target!==toScreen){fromScreen=currentScreen;toScreen=target;screenBlend=0;}screenBlend=Math.min(1,screenBlend+dt/0.32);screenMaterials.forEach((m,i)=>m.opacity=fromScreen===toScreen?(i===toScreen?1:0):i===toScreen?screenBlend:i===fromScreen?1-screenBlend:0);if(screenBlend===1)currentScreen=toScreen;reflection.material.opacity=.006+Math.abs(Math.sin(hinge))*.008;return screenBlend<1;}

 function dispose(){const geometries=new Set(),materials=new Set();root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m))});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());labelTexture.dispose();}
 return {root,update,dispose};
}
