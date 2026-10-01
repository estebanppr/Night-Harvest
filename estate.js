import * as T from './three.module.js';
export function buildEstate({scene,M,mesh,box,cyl,sphere,pipe,group,roots,beds,fermentGroup,stillGroup,sellGroup}){
 // One continuous footprint, one floor level, and machine positions shared by navigation and map.
 const retained=new Set(roots);for(const o of [...scene.children])if(!retained.has(o)&&!o.isLight)scene.remove(o);
 for(const l of [...scene.children])if(l.isPointLight)scene.remove(l);
 const colliders=[],occluders=[],upper=new T.Group();scene.add(upper);const zones=[{name:'SERRE',x:-5,z:0,color:'#89cda9'},{name:'FERMENTATION',x:4.5,z:-2,color:'#8bc8df'},{name:'DISTILLATION',x:13.3,z:-2,color:'#e7b97a'},{name:'EXPÉDITION',x:5,z:4,color:'#cbb69b'}];
 const machinePositions={ferment:[[2,-3.5],[5.15,-3.5],[8.25,-3.5]],still:[[11.6,-3.5],[14.7,-3.5],[14.7,.2]]};
 for(const root of roots){const {type,index=0}=root.userData;if(machinePositions[type]){let [x,z]=machinePositions[type][index];root.position.set(x,0,z);colliders.push({x,z,w:type==='still'?2.65:2.7,d:2.2})}}
 for(const b of beds)colliders.push({x:b.g.position.x,z:b.g.position.z,w:2.15,d:2.13});colliders.push({x:5.15,z:3.1,w:3.15,d:1.6});
 const concrete=new T.MeshStandardMaterial({color:'#46595a',roughness:.85}),brick=new T.MeshStandardMaterial({color:'#536261',roughness:.9}),cream=new T.MeshStandardMaterial({color:'#cec7ad',roughness:.8}),glass=new T.MeshStandardMaterial({color:'#74b4a9',transparent:true,opacity:.17,roughness:.2,depthWrite:false,side:T.DoubleSide});
 box(25.5,.45,12.2,M.edge,4.25,-.38,0);box(25.1,.13,11.8,concrete,4.25,-.1,0);
 function wall(x,z,w,d,h=4.4){const o=box(w,h,d,brick,x,h/2-.025,z);occluders.push(o);colliders.push({x,z,w,d});return o}
 wall(4.25,-5.9,25.5,.2);const sideL=wall(-8.4,0,.2,12),sideR=wall(16.9,0,.2,12);const front=[];front.push(wall(-3.7,5.9,9.4,.2),wall(10.25,5.9,13.3,.2));const lintel=box(4,1.4,.2,brick,1.75,3.7,5.9);upper.add(lintel);box(3.95,3.05,.08,M.dark,1.75,1.5,5.91);
 for(let x=-8;x<=16;x+=2)box(.025,.008,11.7,M.metal,x,-.025,0);for(let z=-4;z<6;z+=2)box(25,.008,.025,M.metal,4.25,-.025,z);
 // Glass greenhouse partition with a 2.6-metre doorway facing the main aisle.
 for(const [z,len]of [[-2.45,6.7],[4.8,2.0]]){occluders.push(box(.1,2.6,len,glass,-1.45,1.3,z));for(const zz of [z-len/2,z+len/2])box(.09,3,.09,M.dark,-1.45,1.5,zz);box(.08,.07,len,M.metal,-1.45,2.6,z);colliders.push({x:-1.45,z,w:.12,d:len});}
 box(.12,.18,2.6,M.dark,-1.45,2.95,2.15);
 // Industrial dividing wall: wide opening from the main aisle into distillation.
 for(let [z,len]of [[-2,7.6],[5.45,.7]]){wall(9.9,z,.16,len,2.9)}box(.18,.18,3,M.dark,9.9,3,3.65);
 // Walkways remain clear in front of every station.
 for(let x=-.8;x<16;x+=.6)box(.28,.01,.035,M.gold,x,-.017,4.55);for(let x of [0,9.9])box(.04,.01,8.4,M.gold,x,-.017,-.7);
 function sign(text,x,y,z,w,color='#e1cb9d',rot=0){let c=document.createElement('canvas');c.width=1024;c.height=160;let ctx=c.getContext('2d');ctx.fillStyle='#132b31';ctx.fillRect(0,0,1024,160);ctx.fillStyle=color;ctx.font='bold 68px sans-serif';ctx.textAlign='center';ctx.fillText(text,512,107);let tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;let plate=mesh(new T.PlaneGeometry(w,w*160/1024),new T.MeshBasicMaterial({map:tx}),x,y,z);plate.rotation.y=rot;plate.castShadow=false;return plate}
 sign('01 / SERRE',-4.8,3.35,-5.76,4,'#9fe4bb');sign('02 / FERMENTATION',4.5,3.6,-5.76,6,'#a3dbe7');sign('03 / DISTILLATION',13.4,3.65,-5.76,5.5);sign('NIGHT HARVEST',4.2,4,-5.75,4.3);
 // Repeating beams, suspended fixtures, and a roof which lifts in overview.
 const roofMat=new T.MeshStandardMaterial({color:'#263c43',roughness:.8,side:T.DoubleSide});box(25.2,.12,11.8,roofMat,4.25,4.55,0,upper);
 for(let x of [-7,-3,1,5,9,13,16]){box(.12,.25,11.8,M.dark,x,4.35,0,upper);for(let z of [-3,2.5]){cyl(.015,.015,.6,M.dark,x,4,z,upper);box(1.3,.1,.24,M.dark,x,3.7,z,upper);box(1.15,.018,.18,new T.MeshStandardMaterial({color:'#e7dfc4',emissive:'#e7d1a1',emissiveIntensity:2}),x,3.64,z,upper)}}
 for(let [x,z,color]of [[-5,0,'#c6eacf'],[4,-1,'#c5e6ec'],[13,-1,'#ffdaa1'],[5,3,'#d3e6dd']]){let light=new T.PointLight(color,45,15,2);light.position.set(x,3.45,z);scene.add(light)}
 for(let x of [-6.5,-3.5,2,5.2,8.3,12,15]){box(1.6,1.4,.07,M.dark,x,2.3,-5.77);box(1.42,1.22,.08,new T.MeshStandardMaterial({color:'#355467',emissive:'#193544',emissiveIntensity:.2}),x,2.3,-5.72);box(.045,1.25,.09,M.metal,x,2.3,-5.66)}
 function interactive(g,type){g.userData={type};g.traverse(o=>o.userData={type});roots.push(g)}
 const cellar=group(2,.0,.2);box(2.25,.14,1.2,M.dark,0,.15,0,cellar);for(let x of [-.62,.62]){let b=cyl(.46,.46,.85,M.wood,x,.75,0,cellar);b.rotation.x=Math.PI/2;for(let z of [-.34,.34]){let band=cyl(.48,.48,.045,M.metal,x,.75,z,cellar);band.rotation.x=Math.PI/2}pipe([[x,.53,.44],[x,.53,.59]],.032,M.copper,cellar)}interactive(cellar,'age');colliders.push({x:2,z:.2,w:2.3,d:1.35});sign('CHAI / VIEILLISSEMENT',2,2.05,-.35,2.5);
 const board=group(6.5,0,.05);for(let x of [-.65,.65])box(.08,1.8,.08,M.dark,x,.9,0,board);box(1.65,1,.1,M.wood,0,1.5,0,board);box(1.4,.75,.012,cream,0,1.5,.062,board);for(let x of [-.35,.35])for(let y of [1.3,1.6])box(.4,.16,.016,M.gold,x,y,.075,board);interactive(board,'contracts');colliders.push({x:6.5,z:.05,w:1.8,d:.4});sign('COMMANDES',6.5,2.3,.06,2.1);
 const control=group(-1.9,0,4.7);box(.1,1.2,.1,M.dark,0,.6,0,control);box(.6,.5,.13,M.metal,0,1.25,0,control);box(.45,.28,.02,new T.MeshStandardMaterial({color:'#78cbb4',emissive:'#43866c'}),0,1.26,.085,control);interactive(control,'farm');colliders.push({x:-1.9,z:4.7,w:.65,d:.25});
 const irrigation=[];for(const b of beds){const g=new T.Group();b.g.add(g);for(let z of [-.65,.65]){pipe([[-.95,.57,z],[.95,.57,z]],.018,M.dark,g);for(let x of [-.6,0,.6])cyl(.035,.035,.07,M.metal,x,.6,z,g)}irrigation.push(g)}
 const machineLights=[];for(const [i,[x,z]]of machinePositions.still.entries()){const l=new T.PointLight('#ffb256',0,4,2);l.position.set(x,.7,z);scene.add(l);machineLights.push(l)}
 // Solid partitions also block targeting: never interact with a machine through a wall.
 return {colliders,occluders,machinePositions,zones,update(mode,farm,prod,time=0){machineLights.forEach((l,i)=>{const u=prod?.units.still[i];l.intensity=u?.job&&!prod.progress(u).ready?3+Math.sin(time*9+i)*.5:0});upper.visible=mode==='walk';front.forEach(o=>o.visible=mode==='walk');sideL.visible=sideR.visible=mode==='walk';irrigation.forEach(g=>g.visible=!!farm.irrigation)}};
}
