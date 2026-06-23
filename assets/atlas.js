// star-chart engine — Jack Homer
// Data is the single source of truth. Add a project = one PLATES entry.

const SVGNS = 'http://www.w3.org/2000/svg';
const GREEK = ['α','β','γ','δ','ε','ζ','η','θ','ι','κ','λ','μ','ν','ξ','ο','π','ρ','σ','τ','υ','φ','χ','ψ','ω'];
const D = 'https://jackhomer.com';
const GH = 'https://github.com/jhomer192';

// CONSTELLATIONS — the data plate
// id maps to /<id>/ (URL slug); box is the bounding box for camera zoom + filter
// figure is T3(c) hairline figure label (one or two per constellation)
const CONSTELLATIONS = [
  { id:'opera-minora', name:'Opera Minora', sub:'Side Projects', section:'/projects/',
    labelAt:[750, 50], box:[440, 30, 985, 350],
    figure:[{label:"The Builder's Loom", x:735, y:200}],
    stars:[
      {nm:'Songrank',           g:'Beli for songs',       m:1, k:'demo', cx:485, cy:90,  url:D+'/songrank',  src:GH+'/bracketeering', d:'Spotify-powered song ranking with adaptive comparisons and bracket export. Generates top-10 / top-25 playlists tuned by your own listening.'},
      {nm:'WikiGame',           g:'best-path solver',     m:1, k:'demo', cx:680, cy:55, url:D+'/wikipedia-game-solver', src:GH+'/wikipedia-game-solver', d:'A solver for "the Wikipedia Game" — fastest hop from page A to page B via TF-IDF + greedy best-path search. 1,826 cached routes, 100+ templates.'},
      {nm:'Memes',              g:'meme generator',       m:2, k:'demo', cx:885, cy:120, url:D+'/meme-generator', src:GH+'/meme-generator', d:'Classic meme generator. Canvas-rendered captions on common templates.'},
      {nm:'Auto Applier',       g:'overnight queue',      m:2, k:'work', cx:740, cy:160, d:'A background agent that writes code from a queue overnight. Lives at jhomer192/auto-applier.'},
      {nm:'Clocktower',         g:'storyteller tools',    m:2, k:'demo', cx:935, cy:210, url:D+'/clocktower', src:GH+'/clocktower', d:'Storyteller tools for Blood on the Clocktower — character grimoire + night order + voting tracker.'},
      {nm:'Nuzlocke',           g:'graveyard log',        m:3, k:'demo', cx:515, cy:265, url:D+'/nuzlocke-tracker', src:GH+'/nuzlocke-tracker', d:'Tracks a Pokémon Nuzlocke run: caught, fainted, boss progress.'},
      {nm:"Connectronix",       g:'no backend',           m:3, k:'demo', cx:680, cy:280, url:D+'/connections-maker', src:GH+'/connections-maker', d:'A make-your-own NYT Connections puzzle, stored entirely in the URL hash.'},
      {nm:'Game of Life',       g:'cellular automaton',   m:3, k:'demo', cx:585, cy:325, url:D+'/game-of-life', src:GH+'/game-of-life', d:"Conway's Game of Life, rendered cell-by-cell in the browser."},
      {nm:'Birthday Paradox',   g:'prob. visualizer',     m:3, k:'demo', cx:830, cy:340, url:D+'/birthday-paradox', src:GH+'/birthday-paradox', d:'An interactive probability visualizer for the birthday problem.'},
      {nm:'Claude Bot',         g:'built the rest',       m:1, k:'src',  cx:935, cy:295, src:GH+'/claude-bot', d:'A self-hosted, persistent Claude agent over Telegram — the harness that built most of the rest of this sky.'},
    ],
    // The Builder's Loom — outer frame (top beam, posts, bottom beam) + inner warp threads
    edges:[[0,1],[1,2],[2,4],[4,8],[8,7],[7,0],[1,3],[3,6],[6,5],[5,7],[6,8]],
    conj:[[9,1]] },

  { id:'corona-laboris', name:'Corona Laboris', sub:'Day Work', section:'/career/',
    labelAt:[230, 405], box:[40, 380, 410, 700],
    figure:[{label:"The Worked Day", x:215, y:540}],
    stars:[
      {nm:'C3 AI',              g:'Forward Deployed Engineer', m:1, k:'work', cx:340, cy:455, d:'Forward Deployed Engineer at C3 AI (Redwood City) — embedded with customers to ship production AI end to end.',
        hi:[
          'Built tasking, HR, and housing applications for the U.S. Marine Corps; led workstreams across phases and shipped shared packages reused in every new engagement.',
          'Delivered an agent suite across sales, legal, and finance — pre-proposal qualification, proposal generation, expense analysis — now in production.',
          'Stood up a translate–critique–arbitrate pipeline for legal documents, replacing significant outside-services spend with an in-house multi-agent system at the same quality bar.',
          'Drove a platform-stability effort that cut daily crash frequency across the internal developer community ~94%.',
        ]},
      {nm:'Action Network',     g:'SWE intern · 2021',    m:3, k:'work', cx:210, cy:600, d:'Software engineering intern at The Action Network, 2021. Where the deploying started.'},
      {nm:"VT · CS '23",        g:'BS Computer Science',  m:2, k:'work', cx:95,  cy:665, d:'BS Computer Science, Virginia Tech, 2023. The origin point.'},
      {nm:'KidDataViz',         g:'VT capstone · 2023',   m:4, k:'src', cx:110, cy:545, src:GH+'/KidDataViz', d:'Virginia Tech senior capstone — data visualization for kids. The oldest light in this sky.'},
    ],
    // The Worked Day — the career path (VT → Action Network → C3) with the capstone branching off
    edges:[[2,1],[1,0],[2,3]],
    conj:[] },

  { id:'mercatura', name:'Mercatura', sub:'Trade', section:'/business/',
    labelAt:[765, 405], box:[490, 380, 980, 700],
    figure:[{label:"The Merchant's Scale", x:735, y:560}],
    stars:[
      {nm:'Web Presence',       g:'sites for shops',      m:1, k:'service', cx:560, cy:475, url:'/business/', d:'Websites for local businesses — built, hosted, and maintained.'},
      {nm:'Email & Domains',    g:'set up, handed off',   m:2, k:'service', cx:830, cy:655, url:'/business/', d:'Email setup and domain administration for small businesses.'},
      {nm:'Reviews',            g:'reputation',           m:3, k:'service', cx:735, cy:445, url:'/business/', d:'Google review auto-reply, drafted by AI in your voice.'},
      {nm:'grace-style',        g:'a client',             m:2, k:'src',     cx:885, cy:550, src:GH+'/grace-style', d:'A client build. (Source repo — confirm the public URL before linking it live.)'},
      {nm:'contact-relay',      g:'the plumbing',         m:4, k:'src',     cx:570, cy:650, src:GH+'/contact-relay', d:"A Cloudflare Worker relaying this site's contact form to Telegram. The plumbing behind the curtain."},
    ],
    // The Merchant's Scale — fulcrum (Reviews) over a beam, two pans hanging
    edges:[[2,0],[2,3],[0,4],[3,1]],
    conj:[] },
];

const KIND_LABEL = {
  demo:    'Live · open to the public',
  src:     'Source only · no public demo',
  work:    'Day job · no public link',
  service: 'Service offering',
};

// ---------- helpers ----------
function radiusFor(m){return m===1?5.5:m===2?4.2:m===3?3:2}
function centroid(pts){const n=pts.length;return pts.reduce((a,p)=>[a[0]+p.cx/n,a[1]+p.cy/n],[0,0])}
function convexHull(pts){
  const p=pts.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  if(p.length<3)return p;
  const cross=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
  const lower=[];for(const x of p){while(lower.length>=2&&cross(lower[lower.length-2],lower[lower.length-1],x)<=0)lower.pop();lower.push(x);}
  const upper=[];for(let i=p.length-1;i>=0;i--){const x=p[i];while(upper.length>=2&&cross(upper[upper.length-2],upper[upper.length-1],x)<=0)upper.pop();upper.push(x);}
  upper.pop();lower.pop();return lower.concat(upper);
}
function expandPt(p,c,d){
  const dx=p[0]-c[0],dy=p[1]-c[1],l=Math.hypot(dx,dy)||1;
  return [p[0]+dx/l*d,p[1]+dy/l*d];
}

// ---------- render ----------
const SKY_W = 1000, SKY_H = 720;

function renderTicks(svg){
  // RA ticks (top), Dec ticks (left)
  const g = document.createElementNS(SVGNS,'g'); g.setAttribute('class','ticks');
  for(let h=0;h<=24;h+=4){
    const x = (h/24)*SKY_W;
    const t = document.createElementNS(SVGNS,'text');
    t.setAttribute('x',x+4); t.setAttribute('y',16); t.textContent = String(h).padStart(2,'0')+'ʰ';
    g.appendChild(t);
    const ln = document.createElementNS(SVGNS,'line');
    ln.setAttribute('x1',x);ln.setAttribute('x2',x);ln.setAttribute('y1',0);ln.setAttribute('y2',6);
    g.appendChild(ln);
  }
  for(let d=-30;d<=30;d+=30){
    const y = SKY_H/2 - (d/60)*SKY_H;
    const t = document.createElementNS(SVGNS,'text');
    t.setAttribute('x',8); t.setAttribute('y',y+3); t.textContent = (d>=0?'+':'')+d+'°';
    g.appendChild(t);
  }
  svg.appendChild(g);
}

// deterministic hash → [0,1) so the background star-field is stable across renders
function rnd(n){ n = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b); n ^= n >>> 13; n = Math.imul(n, 0xc2b2ae35); n ^= n >>> 16; return (n>>>0)/4294967296; }

// graticule + faint background star-field, rendered INSIDE cam so it pans/zooms
// with the chart (fixes the "frozen background on zoom" issue). Drawn first → behind.
function renderGrid(cam){
  const g = document.createElementNS(SVGNS,'g'); g.setAttribute('class','graticule');
  const mk=(x1,y1,x2,y2,cls)=>{
    const l=document.createElementNS(SVGNS,'line');
    l.setAttribute('x1',x1);l.setAttribute('y1',y1);l.setAttribute('x2',x2);l.setAttribute('y2',y2);
    l.setAttribute('class',cls); g.appendChild(l);
  };
  for(let x=0;x<=SKY_W;x+=10) mk(x,0,x,SKY_H, x%50===0?'grid-major':'grid-minor');
  for(let y=0;y<=SKY_H;y+=10) mk(0,y,SKY_W,y, y%50===0?'grid-major':'grid-minor');
  const field=document.createElementNS(SVGNS,'g'); field.setAttribute('class','starfield');
  for(let i=0;i<130;i++){
    const x=rnd(i*2+1)*SKY_W, y=rnd(i*2+2)*SKY_H, r=0.3+rnd(i*7+3)*0.8;
    const d=document.createElementNS(SVGNS,'circle');
    d.setAttribute('cx',x.toFixed(1));d.setAttribute('cy',y.toFixed(1));d.setAttribute('r',r.toFixed(2));
    // only ~1 in 3 stars actually twinkle — keeps the continuous animation cost low
    if(i%3===0){
      d.setAttribute('class','bgstar tw');
      d.style.setProperty('--tw', (2.4+rnd(i*11+5)*3).toFixed(2)+'s');
      d.style.setProperty('--td', (rnd(i*13+7)*3).toFixed(2)+'s');
    } else {
      d.setAttribute('class','bgstar');
    }
    field.appendChild(d);
  }
  g.appendChild(field);
  cam.appendChild(g);
}

function buildConstellation(c, cam, onStarClick){
  // Bayer letters by magnitude (brightest = α)
  const order = c.stars.map((s,i)=>i).sort((a,b)=>c.stars[a].m - c.stars[b].m);
  const greekOf = {}; order.forEach((idx,rank)=>greekOf[idx] = GREEK[rank]);

  const g = document.createElementNS(SVGNS,'g');
  g.setAttribute('class','cons'); g.setAttribute('data-id', c.id);
  g.setAttribute('role','button'); g.setAttribute('tabindex','0');
  g.setAttribute('aria-label', c.name+' — '+c.sub);

  // hull
  const hullPts = convexHull(c.stars.map(s=>[s.cx,s.cy])).map(p=>expandPt(p, centroid(c.stars), 28));
  const hull = document.createElementNS(SVGNS,'polygon');
  hull.setAttribute('class','hull');
  hull.setAttribute('points', hullPts.map(p=>p.join(',')).join(' '));
  g.appendChild(hull);

  // T3(c) figure label cluster
  (c.figure||[]).forEach(f=>{
    const t = document.createElementNS(SVGNS,'text');
    t.setAttribute('class','figure-label');
    t.setAttribute('x', f.x); t.setAttribute('y', f.y);
    t.textContent = f.label;
    g.appendChild(t);
  });

  // edges — pathLength=1 + a staggered draw-on delay so the figure inks itself in
  const edgeNodes=[];
  let edgeSeq=0;
  const addEdge=(a,b,cls)=>{
    if(!c.stars[a]||!c.stars[b]){ console.warn('atlas: edge skipped, bad index', c.id, a, b); return; }
    const l = document.createElementNS(SVGNS,'line'); l.setAttribute('class',cls);
    l.setAttribute('x1',c.stars[a].cx); l.setAttribute('y1',c.stars[a].cy);
    l.setAttribute('x2',c.stars[b].cx); l.setAttribute('y2',c.stars[b].cy);
    l.setAttribute('pathLength','1');
    l.style.setProperty('--ed', (edgeSeq++ * 0.09).toFixed(2)+'s');
    l.dataset.a=a; l.dataset.b=b;
    g.appendChild(l); edgeNodes.push(l);
  };
  c.edges.forEach(([a,b])=>addEdge(a,b,'edge'));
  (c.conj||[]).forEach(([a,b])=>addEdge(a,b,'edge conj'));

  // stars
  const starNodes=[];
  // Label placement: put each label on the OUTWARD side (away from the figure's
  // centre) so they radiate out, then nudge same-side labels apart vertically so
  // the names/glosses stop overwriting each other.
  const cen = centroid(c.stars);
  const labelLeft = c.stars.map(s => s.cx < cen[0]);   // label sits left of its star
  const ldy = new Array(c.stars.length).fill(0);
  const LABEL_GAP = 22;
  [true,false].forEach(want=>{
    const idxs = c.stars.map((s,i)=>i).filter(i=>labelLeft[i]===want)
                        .sort((a,b)=>c.stars[a].cy - c.stars[b].cy);
    for(let k=1;k<idxs.length;k++){
      const prev=idxs[k-1], cur=idxs[k];
      const gap = (c.stars[cur].cy + ldy[cur]) - (c.stars[prev].cy + ldy[prev]);
      if(gap < LABEL_GAP) ldy[cur] += (LABEL_GAP - gap);
    }
  });
  c.stars.forEach((s,i)=>{
    const left = labelLeft[i];
    const sg = document.createElementNS(SVGNS,'g');
    sg.setAttribute('class','star m'+s.m+(s.k==='src'?' src':'')+(left?' right':' left'));
    sg.setAttribute('role','link'); sg.setAttribute('tabindex','0');
    sg.setAttribute('aria-label', s.nm+' — '+s.g);
    sg.dataset.i=i;

    // generous invisible hit target — the dots are tiny, esp. on mobile
    const hit = document.createElementNS(SVGNS,'circle');
    hit.setAttribute('class','hit'); hit.setAttribute('cx',s.cx); hit.setAttribute('cy',s.cy); hit.setAttribute('r','18');
    sg.appendChild(hit);

    if(s.k==='src'){
      const r = document.createElementNS(SVGNS,'circle');
      r.setAttribute('class','ring'); r.setAttribute('cx',s.cx); r.setAttribute('cy',s.cy);
      r.setAttribute('r', radiusFor(s.m));
      sg.appendChild(r);
    } else {
      const d = document.createElementNS(SVGNS,'circle');
      d.setAttribute('class','dot'); d.setAttribute('cx',s.cx); d.setAttribute('cy',s.cy);
      d.setAttribute('r', radiusFor(s.m));
      sg.appendChild(d);
    }

    const r = radiusFor(s.m), off = r + 5;
    const tx = left ? s.cx - off : s.cx + off;
    const ly = s.cy + ldy[i];

    // when a label was nudged away from its star, draw a faint leader so the
    // association still reads
    if(Math.abs(ldy[i]) > 6){
      const lead = document.createElementNS(SVGNS,'line'); lead.setAttribute('class','leader');
      lead.setAttribute('x1', tx); lead.setAttribute('y1', ly + 4);
      lead.setAttribute('x2', s.cx); lead.setAttribute('y2', s.cy);
      sg.appendChild(lead);
    }

    const gl = document.createElementNS(SVGNS,'text'); gl.setAttribute('class','glabel');
    gl.setAttribute('x', tx); gl.setAttribute('y', ly - 5);
    gl.textContent = greekOf[i]; sg.appendChild(gl);

    const nl = document.createElementNS(SVGNS,'text'); nl.setAttribute('class','nlabel');
    nl.setAttribute('x', tx); nl.setAttribute('y', ly + 9);
    nl.textContent = s.nm; sg.appendChild(nl);

    sg.addEventListener('click', e=>{e.stopPropagation(); onStarClick(s, greekOf[i], c);});
    sg.addEventListener('keydown', e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault(); onStarClick(s, greekOf[i], c); return;}
      if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault(); const n=starNodes[(i+1)%starNodes.length]; n&&n.focus();}
      if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault(); const n=starNodes[(i-1+starNodes.length)%starNodes.length]; n&&n.focus();}
    });
    sg.addEventListener('mouseenter', ()=>{
      sg.classList.add('lit');
      edgeNodes.forEach(l=>{if(+l.dataset.a===i||+l.dataset.b===i)l.classList.add('lit');});
    });
    sg.addEventListener('mouseleave', ()=>{
      sg.classList.remove('lit');
      edgeNodes.forEach(l=>l.classList.remove('lit'));
    });

    g.appendChild(sg); starNodes.push(sg);
  });

  // constellation label
  const cl = document.createElementNS(SVGNS,'text');
  cl.setAttribute('class','clabel');
  cl.setAttribute('x', c.labelAt[0]); cl.setAttribute('y', c.labelAt[1]);
  cl.textContent = c.name; g.appendChild(cl);

  const cs = document.createElementNS(SVGNS,'text');
  cs.setAttribute('class','csub');
  cs.setAttribute('x', c.labelAt[0]); cs.setAttribute('y', c.labelAt[1]+14);
  cs.textContent = c.sub.toUpperCase(); g.appendChild(cs);

  // when hovered or focused, edges fade in
  g.addEventListener('mouseenter', ()=>{g.classList.add('lit'); edgeNodes.forEach(l=>l.classList.add('lit'));});
  g.addEventListener('mouseleave', ()=>{g.classList.remove('lit'); edgeNodes.forEach(l=>l.classList.remove('lit'));});

  cam.appendChild(g);
  return {node:g, edges:edgeNodes, stars:starNodes, greek:greekOf};
}

// ---------- card (star detail modal) ----------
let cardOverlay = null, lastFocused = null;
function ensureCard(){
  if(cardOverlay) return cardOverlay;
  cardOverlay = document.createElement('div');
  cardOverlay.className = 'card-overlay';
  cardOverlay.innerHTML = `<div class="card" role="dialog" aria-modal="true">
    <button class="close" aria-label="close">esc · close</button>
    <span class="greek"></span>
    <h2></h2>
    <div class="sub"></div>
    <p class="desc"></p>
    <ul class="hi"></ul>
    <div class="links"></div>
    <div class="kind"></div>
  </div>`;
  document.body.appendChild(cardOverlay);
  cardOverlay.addEventListener('click', e=>{if(e.target===cardOverlay)closeCard();});
  cardOverlay.querySelector('.close').addEventListener('click', closeCard);
  document.addEventListener('keydown', e=>{if(e.key==='Escape'&&cardOverlay.classList.contains('open'))closeCard();});
  // focus trap: keep Tab within the open dialog
  cardOverlay.addEventListener('keydown', e=>{
    if(e.key!=='Tab') return;
    const f = [...cardOverlay.querySelectorAll('button, a[href]')].filter(el=>el.offsetParent!==null);
    if(!f.length) return;
    const first=f[0], last=f[f.length-1];
    if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
  });
  return cardOverlay;
}
function openCard(s, greek){
  const o = ensureCard();
  lastFocused = document.activeElement;
  o.querySelector('.greek').textContent = greek;
  o.querySelector('h2').textContent = s.nm;
  o.querySelector('.sub').textContent = s.g;
  o.querySelector('.desc').textContent = s.d || '';
  const hi = o.querySelector('.hi'); hi.innerHTML = '';
  if(s.hi && s.hi.length){ hi.style.display=''; s.hi.forEach(x=>{const li=document.createElement('li'); li.textContent=x; hi.appendChild(li);}); }
  else hi.style.display='none';
  const links = o.querySelector('.links'); links.innerHTML = '';
  if(s.url){links.innerHTML += `<a href="${s.url}" target="_blank" rel="noopener" data-umami-event="card-link" data-umami-event-target="${s.nm}-demo">visit ↗</a>`;}
  if(s.src){links.innerHTML += `<a href="${s.src}" target="_blank" rel="noopener" data-umami-event="card-link" data-umami-event-target="${s.nm}-src">source ↗</a>`;}
  o.querySelector('.kind').textContent = KIND_LABEL[s.k] || '';
  o.classList.add('open');
  document.body.style.overflow = 'hidden';
  o.querySelector('.close').focus();
}
function closeCard(){
  if(cardOverlay) cardOverlay.classList.remove('open');
  document.body.style.overflow = '';
  if(lastFocused && lastFocused.focus){ lastFocused.focus(); lastFocused = null; }
}

// ---------- ambience, instruments & almanac (overview only) ----------
function moonPhase(date){
  const SYN=29.530588853, ref=Date.UTC(2000,0,6,18,14)/86400000, now=date.getTime()/86400000;
  let p=((now-ref)%SYN)/SYN; if(p<0)p+=1; return p;
}
function buildMoon(date){
  const p=moonPhase(date), illum=(1-Math.cos(2*Math.PI*p))/2, r=10, off=(illum*2*r)*(p<0.5?1:-1);
  const names=['New moon','Waxing crescent','First quarter','Waxing gibbous','Full moon','Waning gibbous','Last quarter','Waning crescent'];
  const el=document.createElement('div'); el.className='moonphase'; el.title='Tonight: '+names[Math.round(p*8)%8];
  el.innerHTML=`<svg viewBox="-13 -13 26 26" aria-hidden="true"><circle r="${r}" class="moon-lit"/>`
    +`<circle r="${r}" cx="${off.toFixed(1)}" class="moon-shadow"/><circle r="${r}" class="moon-ring"/></svg>`;
  return el;
}
function renderSeasonal(cam, date){
  const m=date.getMonth();
  const season=(m===11||m<=1)?'Hiems':(m<=4)?'Ver':(m<=7)?'Aestas':'Autumnus';
  const sets={Hiems:[[150,150],[225,120],[300,165],[250,205]],Ver:[[150,160],[235,130],[305,175]],Aestas:[[150,165],[225,125],[305,150],[260,205]],Autumnus:[[155,140],[245,165],[315,145]]};
  const pts=sets[season];
  const g=document.createElementNS(SVGNS,'g'); g.setAttribute('class','seasonal');
  for(let i=0;i<pts.length-1;i++){const l=document.createElementNS(SVGNS,'line');l.setAttribute('x1',pts[i][0]);l.setAttribute('y1',pts[i][1]);l.setAttribute('x2',pts[i+1][0]);l.setAttribute('y2',pts[i+1][1]);g.appendChild(l);}
  pts.forEach(pp=>{const d=document.createElementNS(SVGNS,'circle');d.setAttribute('cx',pp[0]);d.setAttribute('cy',pp[1]);d.setAttribute('r',1.5);d.setAttribute('class','sstar');g.appendChild(d);});
  const t=document.createElementNS(SVGNS,'text');t.setAttribute('x',pts[0][0]-4);t.setAttribute('y',pts[0][1]+20);t.setAttribute('class','slabel');t.textContent=season+' · in season';g.appendChild(t);
  cam.appendChild(g);
}
function decorate(wrap, svg, cam){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compass=wrap.querySelector('.compass'), needle=compass&&compass.querySelector('.needle');
  // compass needle tracks the cursor — rAF-throttled with a cached rect so we
  // never read layout or repaint more than once per frame (the old per-move
  // getBoundingClientRect + 150-star parallax was the source of the lag)
  if(needle && !reduce){
    let cRect=null, queued=false, mx=0, my=0;
    const cache=()=>{ cRect=compass.getBoundingClientRect(); };
    cache(); window.addEventListener('resize', cache, {passive:true}); window.addEventListener('scroll', cache, {passive:true});
    wrap.addEventListener('pointermove', e=>{
      if(e.pointerType==='touch') return;
      mx=e.clientX; my=e.clientY;
      if(queued) return; queued=true;
      requestAnimationFrame(()=>{ queued=false; if(!cRect) return;
        const ang=Math.atan2(my-(cRect.top+cRect.height/2), mx-(cRect.left+cRect.width/2))*180/Math.PI+90;
        needle.style.transform=`rotate(${ang.toFixed(1)}deg)`; });
    });
  }
  // rare shooting star
  if(!reduce){
    let seed=1;
    const fly=()=>{
      if(!document.hidden){  // don't animate in a backgrounded tab
        const s=document.createElement('div'); s.className='shooting';
        s.style.top=(8+rnd(seed++)*44).toFixed(0)+'%'; s.style.left=(48+rnd(seed++)*44).toFixed(0)+'%';
        wrap.appendChild(s); setTimeout(()=>s.remove(),1500);
      }
      setTimeout(fly, 12000+rnd(seed++)*15000);};
    setTimeout(fly, 6000);
  }
  // comet → colophon
  const comet=document.createElement('button'); comet.className='comet'; comet.type='button'; comet.setAttribute('aria-label','Colophon');
  comet.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="21" x2="15" y2="9"/><circle cx="17" cy="7" r="3"/></svg>`;
  comet.addEventListener('click',()=>openCard({nm:'About this site', g:'colophon', d:'My work laid out as a star chart — side projects, the day job, and a small web studio. Built by hand; a lot of it through a Claude agent I run over Telegram. Type set in Cormorant Garamond and IBM Plex Mono.', k:null},'·'));
  wrap.appendChild(comet);
}

// ---------- public API ----------
// renderSky({mode, focus, onConstellationClick})
// mode: 'overview' shows all three with click-to-zoom; 'single' shows just one constellation, centered.
// focus: constellation id (for single mode, or initial zoom in overview mode)
window.renderSky = function(opts){
  opts = opts || {};
  const mode = opts.mode || 'overview';
  const focus = opts.focus || null;

  const wrap = document.getElementById('sky-wrap');
  if(!wrap) return;
  wrap.innerHTML = '';

  const svg = document.createElementNS(SVGNS,'svg');
  // single-mode pages already declare the constellation name in <h1>, so
  // suppress the in-chart .clabel/.csub via this class to avoid label collisions.
  svg.setAttribute('class', mode === 'single' ? 'sky-svg single-mode' : 'sky-svg');
  svg.setAttribute('id','sky');
  svg.setAttribute('viewBox', `0 0 ${SKY_W} ${SKY_H}`);
  svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  svg.setAttribute('role','img');
  svg.setAttribute('focusable','false');
  if(mode==='single' && focus){
    const fc = CONSTELLATIONS.find(c=>c.id===focus);
    svg.setAttribute('aria-label', fc
      ? 'Star chart of '+fc.name+' — '+fc.sub.toLowerCase()+' by Jack Homer'
      : 'Star chart by Jack Homer');
  } else {
    svg.setAttribute('aria-label','Star chart of Jack Homer\'s side projects, career, and business');
  }
  wrap.appendChild(svg);

  renderTicks(svg);

  const cam = document.createElementNS(SVGNS,'g');
  cam.setAttribute('id','cam'); cam.setAttribute('class','cam');
  svg.appendChild(cam);

  // grid + background star-field live inside cam so they zoom with the chart
  renderGrid(cam);

  const list = mode==='single' && focus
    ? CONSTELLATIONS.filter(c=>c.id===focus)
    : CONSTELLATIONS;

  const nodes = {};
  list.forEach(c=>{
    nodes[c.id] = buildConstellation(c, cam, (s, greek, cons)=>openCard(s, greek));
  });

  // breadcrumb (created once)
  let bc = wrap.querySelector('.breadcrumb');
  if(!bc){
    bc = document.createElement('div');
    bc.className = 'breadcrumb';
    bc.style.display = 'none';
    wrap.appendChild(bc);
  }

  // compass (only on overview mode)
  if(mode==='overview'){
    const compass = document.createElement('div');
    compass.className = 'compass';
    compass.innerHTML = `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="22"/><line x1="30" y1="8" x2="30" y2="52"/><line x1="8" y1="30" x2="52" y2="30"/><polygon class="needle" points="30,10 33,30 30,28 27,30"/><text x="30" y="7">N</text><text x="30" y="58">S</text><text x="5" y="33">W</text><text x="56" y="33">E</text></svg>`;
    wrap.appendChild(compass);
    renderSeasonal(cam, new Date());
    wrap.appendChild(buildMoon(new Date()));
    decorate(wrap, svg, cam);
  }

  // ---- zoom logic (overview mode only) ----
  let currentZoom = null, live = null;
  function enter(id){
    const c = CONSTELLATIONS.find(x=>x.id===id);
    if(!c) return;
    const [x0,y0,x1,y1] = c.box;
    // generous padding so outward star labels, the breadcrumb (top) and the
    // compass don't clip the figure once zoomed in
    const padX = 72, padTop = 96, padBot = 64;
    const bx = x0-padX, by = y0-padTop, bw = (x1-x0)+padX*2, bh = (y1-y0)+padTop+padBot;
    const s = Math.min(SKY_W/bw, SKY_H/bh);
    const cxv = (SKY_W - bw*s)/2, cyv = (SKY_H - bh*s)/2;
    cam.style.transform = `translate(${cxv - bx*s}px, ${cyv - by*s}px) scale(${s})`;
    const cmp = wrap.querySelector('.compass'); if(cmp) cmp.style.display='none';
    // dim other constellations
    CONSTELLATIONS.forEach(o=>{
      const n = nodes[o.id]; if(!n) return;
      if(o.id===id) n.node.classList.add('lit','entered');
      else { n.node.style.opacity = .12; }
    });
    bc.style.display = 'flex';
    bc.innerHTML = `<span>Sky</span><span>›</span><span class="step">${c.name}</span>` +
      (c.section ? `<span>›</span><a class="plate-link" href="${c.section}" data-umami-event="plate-link" data-umami-event-target="${c.id}">Open plate ↗</a>` : '') +
      `<button class="zoom-out" aria-label="zoom out">ESC</button>`;
    bc.querySelector('.zoom-out').addEventListener('click', exit);
    history.replaceState(null,'','#/'+id);
    document.body.classList.add('zoomed');
    if(live) live.textContent = 'Entered '+c.name+'. Press Escape to return.';
    currentZoom = id;
  }
  function exit(){
    cam.style.transform = '';
    const cmp = wrap.querySelector('.compass'); if(cmp) cmp.style.display='';
    CONSTELLATIONS.forEach(o=>{
      const n = nodes[o.id]; if(!n) return;
      n.node.classList.remove('lit','entered');
      n.node.style.opacity = '';
    });
    bc.style.display = 'none';
    history.replaceState(null,'','#/');
    document.body.classList.remove('zoomed');
    if(live) live.textContent = 'Back to the full sky.';
    currentZoom = null;
  }

  if(mode==='overview'){
    Object.values(nodes).forEach(n=>{
      n.node.addEventListener('click', e=>{
        if(e.target.closest('.star')) return; // star clicks open cards
        const id = n.node.getAttribute('data-id');
        if(currentZoom===id) exit(); else enter(id);
      });
      n.node.addEventListener('keydown', e=>{
        if(e.key==='Enter'||e.key===' '){
          e.preventDefault();
          const id = n.node.getAttribute('data-id');
          if(currentZoom===id) exit(); else enter(id);
        }
      });
    });
    svg.addEventListener('click', e=>{
      if(e.target===svg) exit();
    });
    document.addEventListener('keydown', e=>{
      if(e.key==='Escape' && currentZoom){exit();}
    });
    // honor hash on load
    const m = (location.hash||'').match(/^#\/([a-z-]+)/);
    if(m) enter(m[1]);

    // list-view toggle (Sky / List)
    const vt = document.getElementById('viewtoggle');
    if(vt) vt.addEventListener('click', ()=>{
      const on = document.body.classList.toggle('listmode');
      vt.setAttribute('aria-pressed', on?'true':'false');
      vt.textContent = on ? '★ Back to the sky' : 'View as list →';
    });
    // screen-reader announcements for enter/exit
    live = document.createElement('div'); live.className = 'sr-only';
    live.setAttribute('aria-live','polite'); wrap.appendChild(live);
    // sticky "back to the sky" button (shown on mobile while zoomed in)
    const skyback = document.createElement('button');
    skyback.type = 'button'; skyback.className = 'skyback'; skyback.textContent = '★ Back to the sky';
    skyback.addEventListener('click', exit); wrap.appendChild(skyback);
    // pause ambient animation when the tab is hidden or the chart is off-screen
    const pause = on => document.body.classList.toggle('anim-paused', on);
    document.addEventListener('visibilitychange', ()=> pause(document.hidden));
    if('IntersectionObserver' in window){
      new IntersectionObserver(es=> pause(!es[0].isIntersecting), {threshold:0}).observe(wrap);
    }
  } else if(mode==='single' && focus){
    // single-plate mode: zoom into the focused constellation immediately, no breadcrumb
    requestAnimationFrame(()=>{
      const c = CONSTELLATIONS.find(x=>x.id===focus);
      if(!c) return;
      const [x0,y0,x1,y1] = c.box;
      const pad = 30;
      const bx = x0-pad, by = y0-pad, bw = (x1-x0)+pad*2, bh = (y1-y0)+pad*2;
      const s = Math.min(SKY_W/bw, SKY_H/bh);
      const cxv = (SKY_W - bw*s)/2, cyv = (SKY_H - bh*s)/2;
      cam.style.transition = 'none';
      cam.style.transform = `translate(${cxv - bx*s}px, ${cyv - by*s}px) scale(${s})`;
      // light the figure label by default in single mode
      nodes[focus].node.classList.add('lit','entered');
    });
  }
};

// Mark current nav link
document.addEventListener('DOMContentLoaded', ()=>{
  const path = location.pathname.replace(/\/$/,'') || '/';
  document.querySelectorAll('.nav a[href]').forEach(a=>{
    const href = a.getAttribute('href').replace(/\/$/,'') || '/';
    if(href===path) a.setAttribute('aria-current','page');
  });
});
