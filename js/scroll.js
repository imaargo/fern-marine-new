// scroll reveals + parallax + counters - modern enhanced
document.addEventListener('DOMContentLoaded',()=>{
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('in');
    });
  },{threshold:0.16, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // hero parallax - more subtle for rounded showcase
  const heroBg=document.getElementById('heroBg');
  if(heroBg){
    let ticking=false;
    window.addEventListener('scroll',()=>{
      if(ticking) return;
      ticking=true;
      requestAnimationFrame(()=>{
        const y=window.scrollY;
        if(y<900){
          const img=heroBg.querySelector('img');
          if(img) img.style.transform=`translateY(${y*0.18}px) scale(${1 + y*0.00008})`;
        }
        ticking=false;
      });
    },{passive:true});
    // mouse parallax for desktop (GFS 3D feel)
    const showcase=heroBg.parentElement;
    if(showcase && window.matchMedia('(hover:hover)').matches){
      showcase.addEventListener('mousemove',(e)=>{
        const rect=showcase.getBoundingClientRect();
        const x=(e.clientX - rect.left)/rect.width - 0.5;
        const y=(e.clientY - rect.top)/rect.height - 0.5;
        heroBg.style.transform=`translate(${x*10}px, ${y*8}px)`;
      });
      showcase.addEventListener('mouseleave',()=> heroBg.style.transform='translate(0,0)');
    }
  }

  // counter for 20+ years with easing
  const counter=document.getElementById('counterYears');
  if(counter){
    let done=false;
    const io=new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting && !done){
        done=true; let n=0;
        const id=setInterval(()=>{
          n+=1; counter.textContent=n;
          if(n>=20){ clearInterval(id); counter.textContent='20'; }
        },38);
      }
    },{threshold:0.6});
    io.observe(counter);
  }

  // map draw triggers
  const mapPath=document.getElementById('pacificArc');
  if(mapPath){
    const len=mapPath.getTotalLength? mapPath.getTotalLength(): 600;
    mapPath.style.strokeDasharray=len; mapPath.style.strokeDashoffset=len;
    const io2=new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting){
        mapPath.style.transition='stroke-dashoffset 1.9s cubic-bezier(.22,1,.36,1) .25s';
        mapPath.style.strokeDashoffset=0;
      }
    },{threshold:0.4});
    io2.observe(mapPath);
  }

  // stagger float cards entrance
  document.querySelectorAll('.float, .float-delayed, .float-slow').forEach((el,i)=>{
    el.style.opacity='0'; el.style.transform='translateY(14px)';
    setTimeout(()=>{ el.style.transition='opacity 700ms ease, transform 700ms cubic-bezier(.22,1,.36,1)'; el.style.opacity='1'; el.style.transform='translateY(0)'; }, 600 + i*140);
  });
});
