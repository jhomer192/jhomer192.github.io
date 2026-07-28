// common.js, tiny shared script loaded on every page.
// The full star-chart engine (atlas.js) only loads where the chart renders.

// Mark the current nav link.
// Time-of-day parchment: tint the palette to the visitor's local hour.
// Runs immediately (script is at end of body) to minimize any flash.
// A ?band=dawn|day|dusk|night query param forces a band (for previewing / sharing).
(function setSkyBand(){
  const q = new URLSearchParams(location.search).get('band');
  const valid = ['dawn','day','dusk','night'];
  let band = valid.includes(q) ? q : (()=>{ const h = new Date().getHours();
    return h < 5 ? 'night' : h < 8 ? 'dawn' : h < 17 ? 'day' : h < 20 ? 'dusk' : 'night'; })();
  document.documentElement.setAttribute('data-band', band);
})();

function markCurrentNav(){
  const path = location.pathname.replace(/\/$/,'') || '/';
  document.querySelectorAll('.nav a[href]').forEach(a=>{
    const href = a.getAttribute('href').replace(/\/$/,'') || '/';
    if(href===path) a.setAttribute('aria-current','page');
  });
}

// On a project detail page, if a recorded demo clip exists at the figure's
// data-video path, swap the poster screenshot for the <video>. Lets a clip be
// dropped in at /projects/media/<slug>.mp4 with no markup change.
function swapProjectMedia(){
  document.querySelectorAll('figure.media[data-video]').forEach(fig=>{
    const url = fig.getAttribute('data-video');
    const img = fig.querySelector('img');
    if(!url || !img) return;
    fetch(url, {method:'HEAD'}).then(r=>{
      if(!r.ok) return;
      const v = document.createElement('video');
      v.controls = true; v.playsInline = true; v.preload = 'metadata';
      const poster = img.getAttribute('src'); if(poster) v.poster = poster;
      const src = document.createElement('source'); src.src = url; src.type = 'video/mp4';
      v.appendChild(src); img.replaceWith(v);
    }).catch(()=>{});
  });
}

// Assemble contact addresses at runtime. The address used to sit in plain
// mailto: markup on all 19 pages, which is exactly what address harvesters
// scrape; almost none of them execute JavaScript. Without JS the link still
// works — it just points at the contact form instead of the mailbox.
function revealMail(){
  document.querySelectorAll('a[data-user][data-domain]').forEach(a=>{
    const addr = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.setAttribute('href', 'mailto:' + addr);
    if(a.hasAttribute('data-show-address')) a.textContent = addr;
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  markCurrentNav();
  swapProjectMedia();
  revealMail();
});
