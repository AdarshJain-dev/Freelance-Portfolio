// ══ PARTICLE CANVAS ══
(function(){
  const cv=document.getElementById('bg-canvas');
  const ctx=cv.getContext('2d');
  let W,H,pts=[];
  function resize(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight}
  resize();
  window.addEventListener('resize',resize);
  const N=90;
  for(let i=0;i<N;i++){
    pts.push({
      x:Math.random()*2000,y:Math.random()*2000,
      vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,
      r:Math.random()*1.5+.3,
      o:Math.random()*.6+.1
    })
  }
  let mx=W/2,my=H/2;
  window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(let p of pts){
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      if(p.y<0)p.y=H;if(p.y>H)p.y=0;
    }
    const LINK=140;
    for(let i=0;i<N;i++){
      for(let j=i+1;j<N;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<LINK){
          ctx.beginPath();
          ctx.moveTo(pts[i].x,pts[i].y);
          ctx.lineTo(pts[j].x,pts[j].y);
          const a=(1-d/LINK)*.12;
          ctx.strokeStyle=`rgba(0,255,163,${a})`;
          ctx.lineWidth=.5;
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.arc(pts[i].x,pts[i].y,pts[i].r,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,255,163,${pts[i].o})`;
      ctx.fill();
    }
    // mouse proximity glow
    for(let p of pts){
      const dx=p.x-mx,dy=p.y-my;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r+1.5,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,200,255,${.6*(1-d/120)})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ══ CUSTOM CURSOR ══
(function(){
  const dot=document.getElementById('c-dot');
  const ring=document.getElementById('c-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.left=mx+'px';dot.style.top=my+'px';
  });
  function tick(){
    rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(tick);
  }
  tick();
})();

// ══ 3D CARD TILT ══
document.querySelectorAll('.exp-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const cx=r.left+r.width/2,cy=r.top+r.height/2;
    const dx=(e.clientX-cx)/r.width*2,dy=(e.clientY-cy)/r.height*2;
    card.style.transform=`perspective(800px) rotateY(${dx*6}deg) rotateX(${-dy*6}deg) translateZ(8px)`;
    const px=((e.clientX-r.left)/r.width*100).toFixed(1);
    const py=((e.clientY-r.top)/r.height*100).toFixed(1);
    card.style.setProperty('--mx',px+'%');
    card.style.setProperty('--my',py+'%');
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  });
});

// ══ SCROLL REVEAL ══
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')});
},{threshold:.08});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));

// ══ SKILL BAR ANIMATION ══
const barObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.ec-bar-fill').forEach(bar=>{
        bar.style.width=bar.dataset.width+'%';
      });
    }
  });
},{threshold:.3});
document.querySelectorAll('.exp-card').forEach(c=>barObs.observe(c));

// ══ NAV ACTIVE STATE ══
const secs=document.querySelectorAll('section[id]');
const nls=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-150)cur=s.id});
  nls.forEach(a=>{
    const active=a.getAttribute('href')==='#'+cur;
    a.style.color=active?'var(--g1)':'';
  });
},{passive:true});

// ══ MAGNETIC BUTTONS ══
document.querySelectorAll('.btn-main,.btn-out,.uw-btn,.cl-btn').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const cx=r.left+r.width/2,cy=r.top+r.height/2;
    const dx=(e.clientX-cx)*.2,dy=(e.clientY-cy)*.2;
    btn.style.transform=`translate(${dx}px,${dy}px)`;
  });
  btn.addEventListener('mouseleave',()=>{
    btn.style.transform='';
  });
});

// ══ TYPING EFFECT (hero role) ══
(function(){
  const el=document.querySelector('.hero-role');
  if(!el)return;
  const orig=el.innerHTML;
  let shown=false;
  setTimeout(()=>{
    if(!shown){shown=true;el.innerHTML=orig;}
  },200);
})();
