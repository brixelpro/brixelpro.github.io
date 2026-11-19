
addEventListener('DOMContentLoaded',()=>{
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intro=document.getElementById('intro');const hasIntro=!!intro;
  const seen=(()=>{try{return sessionStorage.getItem('bx_intro')}catch(e){return null}})();
  const endIntro=()=>{intro.classList.add('go');setTimeout(()=>{intro.classList.add('out');document.body.classList.add('introdone');window.__burst&&window.__burst();setTimeout(()=>intro.remove(),800)},380);try{sessionStorage.setItem('bx_intro','1')}catch(e){}};
  if(!hasIntro||RM||seen){intro&&intro.remove();document.body.classList.add('introdone')}
  else{setTimeout(endIntro,2100);intro.addEventListener('click',endIntro,{once:true})}

  // ---- fond 3D : briques flottantes ----
  const c=document.getElementById('bg');
  if(!window.THREE){return}
  const mobile=innerWidth<700;
  const R=new THREE.WebGLRenderer({canvas:c,antialias:!mobile,alpha:true,powerPreference:'low-power'});
  R.setPixelRatio(mobile?1:Math.min(devicePixelRatio,2));
  const S=new THREE.Scene();S.fog=new THREE.Fog(0x060b22,14,34);
  const cam=new THREE.PerspectiveCamera(50,1,.1,80);cam.position.set(0,0,18);
  S.add(new THREE.HemisphereLight(0xbfd0ff,0x0b1640,.7));
  const key=new THREE.DirectionalLight(0xffffff,1.1);key.position.set(6,10,8);S.add(key);
  const rim=new THREE.PointLight(0xffc72c,1.4,40);rim.position.set(-8,-4,6);S.add(rim);
  const rim2=new THREE.PointLight(0x4e7bff,1.6,40);rim2.position.set(9,6,-4);S.add(rim2);
  const geo=new THREE.BoxGeometry(1.6,.8,.8);
  const mats=[
    new THREE.MeshStandardMaterial({color:0xffc72c,metalness:.35,roughness:.28}),
    new THREE.MeshStandardMaterial({color:0x2f56d6,metalness:.55,roughness:.22}),
    new THREE.MeshStandardMaterial({color:0xeef1ff,metalness:.2,roughness:.18}),
    new THREE.MeshStandardMaterial({color:0x1a2c6e,metalness:.7,roughness:.35})
  ];
  const edgeMat=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.18});
  const edges=new THREE.EdgesGeometry(geo);
  const N=mobile?22:60,bricks=[];
  for(let i=0;i<N;i++){
    const m=new THREE.Mesh(geo,mats[i%7===0?0:i%5===0?2:i%3===0?0:(i%2?1:3)]);
    m.add(new THREE.LineSegments(edges,edgeMat));
    const home=new THREE.Vector3((Math.random()-.5)*(mobile?16:30),(Math.random()-.5)*44,-Math.random()*16+2);
    // départ : regroupés au centre (le logo)
    const gx=(i%3)-1,gy=Math.floor(i/3)%3-1;
    m.position.set(gx*.9,gy*.9-1,6);m.scale.setScalar(.001);
    m.userData={home,spin:new THREE.Vector3((Math.random()-.5)*.4,(Math.random()-.5)*.5,(Math.random()-.5)*.3),ph:Math.random()*6.28,s:.6+Math.random()*.9};
    m.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6);
    S.add(m);bricks.push(m)}
  let t0=null,burstAt=(!hasIntro||RM||seen)?-10:null;
  window.__burst=()=>{burstAt=performance.now()/1000};
  let lw=0;const size=()=>{const w=innerWidth,h=Math.max(innerHeight,screen.height||0);if(mobile&&w===lw)return;lw=w;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};size();addEventListener('resize',size);
  let px=0,py=0,tx=0,ty=0;
  addEventListener('pointermove',e=>{tx=(e.clientX/innerWidth-.5);ty=(e.clientY/innerHeight-.5)},{passive:true});
  addEventListener('deviceorientation',e=>{if(e.gamma==null)return;tx=Math.max(-.5,Math.min(.5,e.gamma/60));ty=Math.max(-.5,Math.min(.5,(e.beta-45)/60))},{passive:true});
  const ease=k=>1-Math.pow(1-Math.min(1,Math.max(0,k)),3);
  let vis=true;document.addEventListener('visibilitychange',()=>{vis=!document.hidden;if(vis)requestAnimationFrame(loop)});
  // sur cellulaire : on arrête la 3D quand une section opaque couvre l'écran (plus fluide)
  let hidden3d=false,scrolling=false,st=0;
  if(mobile){const on=()=>{scrolling=true;clearTimeout(st);st=setTimeout(()=>{scrolling=false},180)};
    addEventListener('scroll',on,{passive:true});addEventListener('touchmove',on,{passive:true})}
  if(mobile&&'IntersectionObserver' in window){const cover=new Set();
    const io=new IntersectionObserver(es=>{es.forEach(e=>{e.isIntersecting&&e.intersectionRect.height>innerHeight*.9?cover.add(e.target):cover.delete(e.target)});
      const h=cover.size>0;if(h!==hidden3d){hidden3d=h;c.style.visibility=h?'hidden':'visible'}},{threshold:Array.from({length:21},(_,i)=>i/20)});
    document.querySelectorAll('.how,.contact').forEach(el=>io.observe(el))}
  function loop(now){
    if(!vis)return;if(hidden3d||scrolling){if(!RM)requestAnimationFrame(loop);return}now/=1000;t0??=now;const t=now-t0;
    px+=(tx-px)*.05;py+=(ty-py)*.05;
    const pr=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight),cy=6-pr*30;
    cam.position.x=px*2.2;cam.position.y=cy-py*1.6;cam.lookAt(px*.6,cy,0);
    const b=burstAt==null?0:ease((now-burstAt)/1.6);
    bricks.forEach((m,i)=>{const u=m.userData;
      const fy=Math.sin(t*.6+u.ph)*.35;
      const hx=u.home.x,hy=u.home.y+fy,hz=u.home.z;
      if(b<1){const sx=((i%3)-1)*.95,sy=(Math.floor(i/3)%3-1)*.95+6;m.position.set(sx+(hx-sx)*b,sy+(hy-sy)*b,6+(hz-6)*b);m.scale.setScalar(Math.max(.001,b*u.s))}
      else{m.position.set(hx,hy,hz);m.scale.setScalar(u.s)}
      m.rotation.x+=u.spin.x*.01*(1+3*(1-b));m.rotation.y+=u.spin.y*.01*(1+3*(1-b));m.rotation.z+=u.spin.z*.01;
    });
    rim.position.x=-8+Math.sin(t*.3)*4;
    R.render(S,cam);
    if(!RM)requestAnimationFrame(loop)}
  requestAnimationFrame(loop);
});
