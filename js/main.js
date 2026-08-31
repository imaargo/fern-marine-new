// Fern Marine NZ - main interactions
document.addEventListener('DOMContentLoaded',()=>{
  lucide.createIcons();

  // mobile nav toggle
  const btn=document.getElementById('menuBtn');
  const panel=document.getElementById('mobilePanel');
  if(btn&&panel){
    btn.addEventListener('click',()=>{
      const open=panel.classList.contains('hidden');
      panel.classList.toggle('hidden',!open);
      btn.setAttribute('aria-expanded',String(open));
    });
    panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>panel.classList.add('hidden')));
  }

  // active nav - adapts to theme
  const path=location.pathname.split('/').pop()||'index.html';
  const isLightNav = document.body.classList.contains('bg-cream') || document.documentElement.innerHTML.includes('bg-cream');
  document.querySelectorAll('[data-nav]').forEach(a=>{
    const href=a.getAttribute('href');
    if(href===path || (path===''&&href==='index.html') || href.includes(path)) a.classList.add(isLightNav ? 'text-ink' : 'text-[#F57C00]');
  });

  // header shrink on scroll - supports both dark (glass-strong) and light pill
  const header=document.getElementById('siteHeader');
  if(header){
    const inner=header.querySelector('div');
    const isLight = inner && inner.classList.contains('rounded-full');
    const onScroll=()=>{
      if(window.scrollY>18){ 
        if(isLight){ inner.classList.add('shadow-[0_12px_40px_rgba(30,35,40,0.12)]'); }
        else header.classList.add('!py-2','shadow-[0_12px_40px_rgba(0,0,0,0.45)]','bg-[#0A192F]/80');
      } else {
        if(isLight){ inner.classList.remove('shadow-[0_12px_40px_rgba(30,35,40,0.12)]'); }
        else header.classList.remove('!py-2','shadow-[0_12px_40px_rgba(0,0,0,0.45)]','bg-[#0A192F]/80');
      }
    };
    window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  }

  // contact form spinner
  const form=document.getElementById('inquiryForm');
  if(form){
    form.addEventListener('submit',async(e)=>{
      e.preventDefault();
      if(!form.checkValidity()){ form.reportValidity(); return; }
      const btn=form.querySelector('[type="submit"]');
      const original=btn.innerHTML;
      btn.disabled=true; btn.innerHTML=`<svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.25"/><path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg> Sending…`;
      await new Promise(r=>setTimeout(r,1600));
      btn.innerHTML=`<i data-lucide="check" class="w-4 h-4"></i> Inquiry Sent`;
      lucide.createIcons();
      const toast=document.getElementById('toast');
      if(toast){ toast.classList.remove('translate-y-6','opacity-0'); setTimeout(()=>toast.classList.add('translate-y-6','opacity-0'),3200); }
      form.reset();
      setTimeout(()=>{ btn.disabled=false; btn.innerHTML=original; lucide.createIcons(); },2200);
    });
  }

  // current year
  const y=document.getElementById('yearNow'); if(y) y.textContent=new Date().getFullYear();
});
