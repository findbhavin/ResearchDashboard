/* ============================================================
   VIT RESEARCH DASHBOARD  —  nav.js
   ============================================================ */
(function(){
'use strict';

/* ── LANGUAGE ──────────────────────────────────────────── */
var lang = localStorage.getItem('vit_lang') || 'en';

window.setLang = function(l) {
  lang = l;
  localStorage.setItem('vit_lang', l);
  document.querySelectorAll('.en').forEach(function(e){ e.classList.toggle('hidden', l !== 'en'); });
  document.querySelectorAll('.hi').forEach(function(e){ e.classList.toggle('hidden', l !== 'hi'); });
  var be = document.getElementById('btnEN');
  var bh = document.getElementById('btnHI');
  if(be){ be.classList.toggle('on', l === 'en'); }
  if(bh){ bh.classList.toggle('on', l === 'hi'); }
  document.documentElement.lang = (l === 'hi') ? 'hi' : 'en';
};

/* ── PAGE TRANSITION ───────────────────────────────────── */
window.goTo = function(url) {
  var v = document.getElementById('pg-veil');
  if(v){
    v.classList.add('visible');
    setTimeout(function(){ window.location.href = url; }, 320);
  } else {
    window.location.href = url;
  }
};

function bindNavLinks(){
  document.querySelectorAll('a[data-nav]').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = a.getAttribute('href');
      if(!href || href === '#') return;
      e.preventDefault();
      goTo(a.href);
    });
  });
}

/* ── FADE IN ON LOAD ───────────────────────────────────── */
function fadeInPage(){
  var v = document.getElementById('pg-veil');
  if(!v) return;
  /* ensure veil starts visible then fades out */
  v.classList.remove('fadeout');
  v.classList.add('visible');
  /* next frame: fade out */
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      v.classList.remove('visible');
      v.classList.add('fadeout');
    });
  });
}

/* ── NAVBAR ────────────────────────────────────────────── */
function bindNavbar(){
  var nb = document.getElementById('main-nav');
  if(!nb) return;
  window.addEventListener('scroll', function(){
    nb.classList.toggle('scrolled', window.scrollY > 40);
  }, {passive:true});
}

/* ── SCROLL TOP ────────────────────────────────────────── */
function bindScrollTop(){
  var btn = document.getElementById('stt');
  if(!btn) return;
  window.addEventListener('scroll', function(){
    btn.classList.toggle('show', window.scrollY > 460);
  }, {passive:true});
  btn.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
  });
}

/* ── BURGER ────────────────────────────────────────────── */
function bindBurger(){
  var burger = document.getElementById('nav-burger');
  var drawer = document.getElementById('nav-drawer');
  if(!burger || !drawer) return;
  burger.addEventListener('click', function(){
    var open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
  });
  drawer.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      drawer.classList.remove('open');
      burger.classList.remove('open');
    });
  });
}

/* ── ACTIVE NAV LINK ───────────────────────────────────── */
function markActive(){
  var cur = window.location.pathname.split('/').pop() || 'index.html';
  if(cur === '') cur = 'index.html';
  document.querySelectorAll('.nav__a').forEach(function(a){
    var href = (a.getAttribute('href') || '').split('/').pop().split('?')[0];
    if(href === cur){
      a.classList.add('active');
    }
  });
}

/* ── REVEAL OBSERVER ───────────────────────────────────── */
function bindReveal(){
  if(!window.IntersectionObserver) {
    document.querySelectorAll('.rev').forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      en.target.classList.add('in');
      runCountersIn(en.target);
      runBarsIn(en.target);
      io.unobserve(en.target);
    });
  }, {threshold:0.1, rootMargin:'0px 0px -30px 0px'});

  document.querySelectorAll('.rev').forEach(function(el){ io.observe(el); });

  /* standalone counters/bars outside .rev */
  var io2 = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      if(en.target.dataset.count !== undefined) runCount(en.target);
      if(en.target.dataset.w) en.target.style.width = en.target.dataset.w;
      io2.unobserve(en.target);
    });
  }, {threshold:0.2});

  document.querySelectorAll('[data-count]').forEach(function(el){
    if(!el.closest('.rev')) io2.observe(el);
  });
  document.querySelectorAll('[data-w]').forEach(function(el){
    if(!el.closest('.rev')) io2.observe(el);
  });
}

function runCountersIn(parent){
  parent.querySelectorAll('[data-count]').forEach(function(el){ runCount(el); });
  if(parent.dataset && parent.dataset.count !== undefined) runCount(parent);
}
function runBarsIn(parent){
  parent.querySelectorAll('[data-w]').forEach(function(el){ el.style.width = el.dataset.w; });
  if(parent.dataset && parent.dataset.w) parent.style.width = parent.dataset.w;
}

/* ── COUNTER ───────────────────────────────────────────── */
function runCount(el){
  if(el._counted) return;
  el._counted = true;
  var raw    = String(el.dataset.count || '0');
  var pre    = el.dataset.pre  || '';
  var suf    = el.dataset.suf  || '';
  var target = parseFloat(raw.replace(/,/g,''));
  var dec    = (raw.indexOf('.') >= 0) ? raw.split('.')[1].length : 0;
  var dur = 2000;
  var t0  = performance.now();
  function tick(now){
    var p    = Math.min((now - t0) / dur, 1);
    var ease = 1 - Math.pow(1 - p, 3);
    var v    = ease * target;
    var str  = dec ? v.toFixed(dec) : Math.floor(v).toLocaleString();
    el.textContent = pre + str + suf;
    if(p < 1) requestAnimationFrame(tick);
    else el.textContent = pre + (dec ? target.toFixed(dec) : target.toLocaleString()) + suf;
  }
  requestAnimationFrame(tick);
}

/* ── SPARKLINES ────────────────────────────────────────── */
function bindSparklines(){
  document.querySelectorAll('.spk').forEach(function(path){
    var len = (path.getTotalLength && path.getTotalLength()) || 800;
    path.style.strokeDasharray  = len;
    path.style.strokeDashoffset = len;
    var io = new IntersectionObserver(function(ens){
      ens.forEach(function(en){
        if(!en.isIntersecting) return;
        path.style.transition = 'stroke-dashoffset 2s cubic-bezier(.4,0,.2,1)';
        path.style.strokeDashoffset = '0';
        io.unobserve(path);
      });
    }, {threshold:0.3});
    io.observe(path);
  });
}

/* ── TICKER ────────────────────────────────────────────── */
function dupTicker(){
  var t = document.querySelector('.ticker__track');
  if(t) t.innerHTML += t.innerHTML;
}

/* ── RIPPLE ────────────────────────────────────────────── */
function bindRipple(){
  var st = document.createElement('style');
  st.textContent = '@keyframes _rpl{to{transform:scale(200);opacity:0}}';
  document.head.appendChild(st);
  document.querySelectorAll('.rpl').forEach(function(el){
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', function(e){
      var r = this.getBoundingClientRect();
      var s = document.createElement('span');
      s.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'background:rgba(0,229,187,.18)',
        'width:4px','height:4px',
        'pointer-events:none',
        'top:'+(e.clientY - r.top)+'px',
        'left:'+(e.clientX - r.left)+'px',
        'transform:scale(0)',
        'animation:_rpl .6s ease-out forwards'
      ].join(';');
      this.appendChild(s);
      setTimeout(function(){ if(s.parentNode) s.parentNode.removeChild(s); }, 620);
    });
  });
}

/* ── INIT ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function(){
  fadeInPage();
  setLang(lang);
  markActive();
  bindNavLinks();
  bindNavbar();
  bindBurger();
  bindScrollTop();
  bindReveal();
  bindSparklines();
  dupTicker();
  bindRipple();
});

})();

/* ── DROPDOWN "MORE ▾" ─────────────────────────────────── */
window.toggleDropdown = function(e){
  e.preventDefault();
  e.stopPropagation();
  var btn = document.getElementById('nav-more-btn');
  var dd  = document.getElementById('nav-dropdown');
  if(!btn||!dd) return;
  var open = dd.classList.toggle('open');
  btn.classList.toggle('open', open);
};

/* Close dropdown when clicking outside */
document.addEventListener('click', function(e){
  var dd  = document.getElementById('nav-dropdown');
  var btn = document.getElementById('nav-more-btn');
  if(!dd||!btn) return;
  if(!dd.contains(e.target) && !btn.contains(e.target)){
    dd.classList.remove('open');
    btn.classList.remove('open');
  }
});

/* Mark dropdown items active */
(function markDropdownActive(){
  var cur = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__drop-item').forEach(function(a){
    var href = (a.getAttribute('href')||'').split('/').pop();
    if(href === cur) a.classList.add('active');
  });
})();
