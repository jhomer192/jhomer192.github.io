// star-chart engine: Jack Homer
// Data is the single source of truth. Add a project = one PLATES entry.

const SVGNS = 'http://www.w3.org/2000/svg';
const GREEK = ['α','β','γ','δ','ε','ζ','η','θ','ι','κ','λ','μ','ν','ξ','ο','π','ρ','σ','τ','υ','φ','χ','ψ','ω'];
const D = 'https://jackhomer.com';
const GH = 'https://github.com/jhomer192';

// CONSTELLATIONS: the data plate
// id maps to /<id>/ (URL slug); box is the bounding box for camera zoom + filter
// figure is T3(c) hairline figure label (one or two per constellation)
const CONSTELLATIONS = [
  { id:'opera-minora', name:'Opera Minora', sub:'Side Projects', section:'/projects/',
    labelAt:[750, 50], box:[440, 30, 985, 350],
    figure:[{label:"The Builder's Loom", x:735, y:200}],
    stars:[
      {nm:'Songrank',           g:'spotify song ranker',  m:1, k:'demo', cx:485, cy:90,  url:D+'/songrank',  src:GH+'/songrank', img:'/screenshots/songrank.webp', page:'/projects/songrank/',
        d:'Rank your Spotify tracks, recent and all-time, by playing a long game of "this or that," then export the result as a real playlist.',
        hi:[
          'Binary-insertion engine: ~370 head-to-head taps sort 128 tracks (64 recent, 64 all-time) into a true ranked order.',
          'Playlist export: writes your top 10 / 25 back to Spotify with auto-generated mosaic cover art.',
          'Friends mode: someone guesses your top 10 and gets scored on how close they got.',
        ],
        st:'Next.js · TypeScript · Tailwind · Spotify PKCE OAuth (bring your own dev app, no shared rate cap).'},
      {nm:'Wikipedia Game Solver', g:'wiki path solver',  m:1, k:'demo', cx:680, cy:55, url:D+'/wikipedia-game-solver', src:GH+'/wikipedia-game-solver', img:'/screenshots/wikipedia-game-solver.webp', page:'/projects/wikipedia-game-solver/',
        d:'Give it any two Wikipedia articles and watch it find a path between them, hopping link to link.',
        hi:[
          'Greedy TF-IDF walker: at each page it scores outbound links by similarity to the target and takes the best one, up to 30 hops.',
          'Public API only: runs straight against the live MediaWiki API, no key or backend.',
          'Shortest-path mode: a bidirectional breadth-first search runs out from both articles until the frontiers meet, returning the shortest path within the depth cap.',
        ],
        st:'Vite · React · TypeScript · MediaWiki API.'},
      {nm:'Meme Maker',         g:'browser meme editor',  m:2, k:'demo', cx:885, cy:120, url:D+'/meme-generator', src:GH+'/meme-generator', img:'/screenshots/meme-generator.webp', page:'/projects/meme-maker/',
        d:'Build a meme in the browser: pick a template or drop in your own image, caption it, and download a clean PNG.',
        hi:[
          'Canvas renderer: top/bottom captions with font size, color, stroke and shadow controls.',
          'Your image or a template: start from the built-in library or upload anything.',
          'No backend: everything renders client-side; no uploads, no watermark.',
        ],
        st:'React · TypeScript · Vite · HTML Canvas.'},
      {nm:'Auto Applier',       g:'job-apply agent',      m:2, k:'src',  cx:740, cy:160, src:GH+'/auto-applier', page:'/projects/auto-applier/',
        d:'Text a job link to a Telegram bot and an agent reads the posting, fills out the application, and submits it.',
        hi:[
          'Claude Code + Playwright: parses the posting, completes the form, and auto-submits clear fits.',
          'Human in the loop: borderline matches come back to you for a quick yes / no.',
          'Profile-driven: one profile.yaml supplies the answers; runs on a $6/mo droplet.',
        ],
        st:'Claude Code · Playwright · Telegram · DigitalOcean. Built on Claude Bot.'},
      {nm:'Clocktower ST',      g:'BotC storyteller tool',m:2, k:'demo', cx:935, cy:210, url:D+'/clocktower', src:GH+'/clocktower', img:'/screenshots/clocktower.webp', page:'/projects/clocktower/',
        d:"A Storyteller's control panel for Blood on the Clocktower: it runs setup, night order, and voting so you can focus on the table.",
        hi:[
          'Full game loop: role assignment, script selection, night reminders, nominations, votes and executions.',
          'Player board: alive / dead, ghost votes, and private notes at a glance.',
          'Event log + undo: timestamped history with 20 steps of undo.',
        ],
        st:'React · TypeScript · Vite · Zustand. Trouble Brewing, Sects & Violets, Bad Moon Rising + custom scripts.'},
      {nm:'Nuzlocke',           g:'Pokémon run tracker',  m:3, k:'demo', cx:515, cy:265, url:D+'/nuzlocke-tracker', src:GH+'/nuzlocke-tracker', img:'/screenshots/nuzlocke-tracker.webp', page:'/projects/nuzlocke/',
        d:'Track a Pokémon Nuzlocke run end to end: every encounter, your living team, and the graveyard.',
        hi:[
          'Encounters & team: log each route\'s catch, manage your active six, move the fallen to the graveyard.',
          'Progress: badge bar, boss prep, and a shiny log.',
          'Built-in dex: Pokémon search, move autocomplete, and type badges.',
        ],
        st:'React · TypeScript · Vite.'},
      {nm:'Connections Maker',  g:'word-puzzle builder',  m:3, k:'demo', cx:680, cy:280, url:D+'/connections-maker', src:GH+'/connections-maker', img:'/screenshots/connections-maker.webp', page:'/projects/connections-maker/',
        d:'Build your own NYT Connections-style puzzle and share it with a single link.',
        hi:[
          'Four groups of four: set the words, category labels, and difficulty colors.',
          'Link is the database: the whole puzzle lives in the URL hash; no account, no backend.',
          'Auto-shortened: built-in TinyURL with a fallback.',
        ],
        st:'React · TypeScript · Vite.'},
      {nm:'Game of Life',       g:'cellular automaton',   m:3, k:'demo', cx:585, cy:325, url:D+'/game-of-life', src:GH+'/game-of-life', img:'/screenshots/game-of-life.webp', page:'/projects/game-of-life/',
        d:"Conway's Game of Life, running at up to 60 generations a second on a wrap-around canvas.",
        hi:[
          'Paint & play: drag to draw cells; play, pause, step, randomize, clear.',
          'Pattern library: drop in a Glider, Gosper gun, Pulsar and more.',
          'Fast: Uint8Array grid with a scratch buffer; live FPS, generation, and cell counts.',
        ],
        st:'Vite · React · TypeScript · Tailwind · Canvas.'},
      {nm:'Birthday Paradox',   g:'probability visualizer',m:3,k:'demo', cx:830, cy:340, url:D+'/birthday-paradox', src:GH+'/birthday-paradox', img:'/screenshots/birthday-paradox.webp', page:'/projects/birthday-paradox/',
        d:'See why 23 people is enough to share a birthday: the theory and a live simulation, side by side.',
        hi:[
          'Theory curve: plots P(shared) for groups of 1–100, with the 50% crossover at 23 marked.',
          'Monte Carlo: runs up to 100,000 trials, chunked so the UI never stalls, and converges on the math.',
          'Calendar view: a random sample with collision days lit up.',
        ],
        st:'Vite · React · TypeScript · Tailwind · Recharts.'},
      {nm:'Claude Bot',         g:'Telegram → Claude',    m:1, k:'priv', cx:935, cy:295, page:'/projects/claude-bot/',
        d:'A self-hosted relay that turns Telegram into a remote terminal for Claude Code, the harness that built most of this sky.',
        hi:[
          'Phone to agent: a message spawns Claude Code in a chosen workspace and streams the replies back.',
          'Workspace-agnostic: any project directory; Auto Applier is just one tenant.',
          'Self-hosted: deploys over SSH to a private server.',
        ],
        st:'Node · Telegram Bot API · Claude Code.'},
      {nm:'Color Analysis',     g:'seasonal palette from a portrait',   m:2, k:'src',  cx:620, cy:185, src:GH+'/grace-style', page:'/projects/color-analysis/',
        d:'Upload a portrait and get a personalized 12-season color analysis (palette, hair, and makeup direction) from Claude vision.',
        hi:[
          'Vision analysis: shells out to the Claude CLI to read a portrait and place it in a 12-season system.',
          'Private by default: results live in your browser\'s localStorage; nothing is stored server-side.',
        ],
        st:'React · Vite · TypeScript · Tailwind · Express (Claude CLI).'},
      {nm:'Backpressure',       g:'system-design trainer',m:2, k:'src',  cx:455, cy:225, lp:'R', src:GH+'/backpressure', page:'/projects/backpressure/',
        d:'Practice system-design interviews solo: diagram an architecture on a canvas, get grilled by an AI interviewer, and receive a scored "would you pass?" verdict.',
        hi:[
          'Canvas, no preset blocks: draw and name any architecture; an AI interviewer probes the design and a second model returns a scored, property-based verdict.',
          'Bring your own Claude: runs on your own Claude Code login, so there is no API key, no account, and nothing to pay.',
          '~50 problems: Slack, YouTube, Uber, an LLM inference service and more, each graded against its own rubric.',
        ],
        st:'Next.js · TypeScript · Tailwind · @xyflow/react canvas · Claude (Agent SDK / Messages API). Free and open source, clone and run it yourself.'},
      {nm:'Pokémon Agent',      g:'local models play FireRed and Emerald', m:2, k:'priv', cx:795, cy:245, img:'/screenshots/pokemon-agent.webp', page:'/projects/pokemon-agent/',
        d:'Local models running on the desk play Pokémon FireRed and Emerald unassisted, one button press at a time. Several agents share the work: one reads the screen, one decides, and specialists supply what a screenshot cannot show. Nothing leaves the machine, so the only running cost is electricity.',
        hi:[
          'One press, always: the only primitive the deciding model is given is a single button; there is no macro for walking, battling, or working a menu, so every action in a run is its own. A press-origin audit puts ~99% of them on the model.',
          'A multi-agent system, not one model guessing: a vision model turns the raw frame into a structured observation (screen, dialogue, menu cursor, HP, move PP), a decision model turns that into one button, and specialist agents read the console’s own memory for what pixels cannot say — route planning, level caps derived from the game’s own trainer data, catch and party scoring, shiny detection. They inform; the deciding model still presses.',
          'Two games, three runs, supervised: FireRed and Emerald play in parallel and relaunch themselves when they wedge. Every sentence either game prints is logged, so a stall is diagnosed from the artifacts rather than by watching for it.',
          'Beaten so far: Brock end to end, and Elite Four Lorelei with all six of the party still standing.',
          'Watch it play: a browser panel streams the live frame, the button, the reason for it, and the party; every decision is written to a trace log with the state before and after.',
        ],
        st:'Python · mGBA · Ollama (qwen2.5vl:7b perceiving, qwen2.5:14b or qwen3.6:27b deciding). Runs entirely on one machine, on my own GPU — no API keys, no per-token cost, nothing hosted. The only running cost is electricity.'},
      {nm:'WikiGame',           g:'daily wikipedia race', m:2, k:'demo', cx:782, cy:87, url:D+'/wikigame', src:GH+'/wikigame', img:'/screenshots/wikigame.webp', page:'/projects/wikigame/',
        d:'A Wikipedia race with a fixed pair every day: same start, same target for everyone, and only the blue links inside the articles to get there.',
        hi:[
          'One puzzle a day: 1,822 hand-written start/end pairs, each tagged easy, medium or hard, dealt out one per day since 19 April 2026.',
          'A bot sets your par: a TF-IDF walker solves the day\'s pair while you read the two titles, then hands you its hop count to beat.',
          'Wikipedia without the shortcuts: articles render inside the app with every link rewritten, so there is no search box and no way to jump straight to the target.',
          'Spoiler-free sharing: results copy out as a hop count, a time and a row of squares, with the article names left out.',
        ],
        st:'React · TypeScript · Vite · Tailwind, calling the MediaWiki Action and REST APIs from the browser. No backend, no key.'},
    ],
    // The Builder's Loom: outer frame (top beam, posts, bottom beam) + inner warp threads.
    // WikiGame (13) sits on the top beam between 1 and 2, so the beam still reads straight.
    edges:[[0,1],[1,13],[13,2],[2,4],[4,8],[8,7],[7,0],[1,3],[3,6],[6,5],[5,7],[6,8],[3,10],[0,11],[8,12],[13,12]],
    conj:[[9,1]] },

  { id:'corona-laboris', name:'Corona Laboris', sub:'Day Work', section:'/career/',
    labelAt:[230, 405], box:[40, 380, 410, 700],
    figure:[{label:"The Worked Day", x:215, y:540}],
    stars:[
      {nm:'C3 AI',              g:'Forward Deployed Engineer · 2024–present', m:1, k:'work', cx:340, cy:455, d:'Forward Deployed Engineer at C3 AI (Redwood City), embedded with customers to ship production AI end to end.',
        hi:[
          'U.S. Marine Corps (2024–present): technical lead across a multi-program portfolio, running three concurrent teams. Workforce planning and logistics; took one program from a 108-page spec to production.',
          'Property appraisal (2024): led C3\'s assessor application across a run of Connecticut towns, with data ingestion, parcel data modeling, IAAO dashboards, mass appraisal, and automated valuation.',
          'USDA (2026): took an AI correspondence-management system to go-live — mail intake, PII detection, topic classification, LLM drafting, and multi-step approval routing.',
          'NATO (2026): contested-logistics planning with a rerouting optimizer for an alliance logistics program, including on-site support in London.',
          'Delivered five production agents across sales, finance, and legal: proposal generation, hypothesis qualification, sales coaching, and expense analysis.',
          'Stood up a translate–critique–arbitrate pipeline that replaced outside-vendor legal-translation spend with an in-house multi-agent system — 1,081 documents, 2.2M words, at the same quality bar.',
          'Drove a platform-stability effort that cut daily developer-impacting crashes ~94%.',
        ]},
      {nm:'Action Network',     g:'SWE intern · 2021',    m:3, k:'work', cx:210, cy:600, d:'Software engineering intern at The Action Network, 2021. Where the deploying started.'},
      {nm:"VT · CS '23",        g:'BS Computer Science',  m:2, k:'work', cx:95,  cy:665, d:'BS Computer Science, Virginia Tech, 2023. The origin point.'},
      {nm:'KidDataViz',         g:'VT capstone · 2023',   m:4, k:'src', cx:110, cy:545, src:GH+'/KidDataViz', d:'Virginia Tech senior capstone: data visualization for kids. The oldest light in this sky.'},
    ],
    // The Worked Day: the career path (VT → Action Network → C3) with the capstone branching off
    edges:[[2,1],[1,0],[2,3]],
    conj:[] },

  { id:'mercatura', name:'Mercatura', sub:'Trade', section:'/business/',
    labelAt:[765, 405], box:[490, 380, 980, 700],
    figure:[{label:"The Merchant's Scale", x:735, y:560}],
    stars:[
      {nm:'Web Presence',       g:'local business sites', m:1, k:'service', cx:560, cy:475, url:'/business/',
        d:'Websites for local businesses, designed, built, hosted, and kept up to date.'},
      {nm:'Email & Domains',    g:'set up, handed off',   m:2, k:'service', cx:830, cy:655, url:'/business/',
        d:'Domain registration, DNS, and professional email set up and handed off, so a shop owns its own name.'},
      {nm:'Review Replies',     g:'AI review replies',    m:3, k:'service', cx:735, cy:445, url:'/business/',
        d:'AI-drafted responses to Google reviews, written in the business\'s own voice to keep the reply rate up.'},
    ],
    // The Merchant's Scale: fulcrum (Review Replies) over a beam balancing two pans
    edges:[[2,0],[2,1]],
    conj:[] },
];

const KIND_LABEL = {
  demo:    'Live · open to the public',
  src:     'Source only · no public demo',
  priv:    'Private · self-hosted, no public repo',
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
    // only ~1 in 3 stars actually twinkle: keeps the continuous animation cost low
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
  g.setAttribute('aria-label', c.name+': '+c.sub);

  // hull
  const hullPts = convexHull(c.stars.map(s=>[s.cx,s.cy])).map(p=>expandPt(p, centroid(c.stars), 28));
  const hull = document.createElementNS(SVGNS,'polygon');
  hull.setAttribute('class','hull');
  hull.setAttribute('points', hullPts.map(p=>p.join(',')).join(' '));
  g.appendChild(hull);

  // T3(c) figure label cluster
  (c.figure||[]).forEach(f=>{
    const t = document.createElementNS(SVGNS,'text');
    t.setAttribute('class','figure-label'); t.setAttribute('aria-hidden','true');
    t.setAttribute('x', f.x); t.setAttribute('y', f.y);
    t.textContent = f.label;
    g.appendChild(t);
  });

  // edges: pathLength=1 + a staggered draw-on delay so the figure inks itself in
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
  // Label on the OUTWARD side by default, but force it inward for stars near a
  // viewBox edge so the text doesn't run off and clip (e.g. "Clocktower ST").
  const labelLeft = c.stars.map(s => {
    if (s.lp) return s.lp === 'L';          // explicit per-star override ('L'/'R')
    if (s.cx > SKY_W - 120) return true;    // near right edge → label left
    if (s.cx < 120) return false;           // near left edge → label right
    return s.cx < cen[0];
  });
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
    const hollow = (s.k==='src'||s.k==='priv');
    sg.setAttribute('class','star m'+s.m+(hollow?' src':'')+(left?' right':' left'));
    // role=button, not link: activating a star opens an in-place card (or, on the
    // overview, zooms its constellation) — it never navigates to a URL.
    sg.setAttribute('role','button'); sg.setAttribute('tabindex','0');
    sg.setAttribute('aria-label', s.nm+': '+s.g);
    sg.dataset.i=i;

    // generous invisible hit target: the dots are tiny, esp. on mobile
    const hit = document.createElementNS(SVGNS,'circle');
    hit.setAttribute('class','hit'); hit.setAttribute('cx',s.cx); hit.setAttribute('cy',s.cy); hit.setAttribute('r','18');
    sg.appendChild(hit);

    if(hollow){
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

    const gl = document.createElementNS(SVGNS,'text'); gl.setAttribute('class','glabel'); gl.setAttribute('aria-hidden','true');
    gl.setAttribute('x', tx); gl.setAttribute('y', ly - 5);
    gl.textContent = greekOf[i]; sg.appendChild(gl);

    const nl = document.createElementNS(SVGNS,'text'); nl.setAttribute('class','nlabel'); nl.setAttribute('aria-hidden','true');
    nl.setAttribute('x', tx); nl.setAttribute('y', ly + 9);
    nl.textContent = s.nm; sg.appendChild(nl);

    sg.addEventListener('click', e=>{e.stopPropagation(); onStarClick(s, greekOf[i], c);});
    sg.addEventListener('keydown', e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault(); e.stopPropagation(); onStarClick(s, greekOf[i], c); return;}
      if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault(); e.stopPropagation(); const n=starNodes[(i+1)%starNodes.length]; n&&n.focus();}
      if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault(); e.stopPropagation(); const n=starNodes[(i-1+starNodes.length)%starNodes.length]; n&&n.focus();}
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
  cl.setAttribute('class','clabel'); cl.setAttribute('aria-hidden','true');
  cl.setAttribute('x', c.labelAt[0]); cl.setAttribute('y', c.labelAt[1]);
  cl.textContent = c.name; g.appendChild(cl);

  const cs = document.createElementNS(SVGNS,'text');
  cs.setAttribute('class','csub'); cs.setAttribute('aria-hidden','true');
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
  cardOverlay.innerHTML = `<div class="card" role="dialog" aria-modal="true" aria-labelledby="card-title">
    <button class="close" aria-label="close">esc · close</button>
    <span class="greek" aria-hidden="true"></span>
    <h2 id="card-title"></h2>
    <div class="sub"></div>
    <p class="desc"></p>
    <img class="shot" alt="" loading="lazy">
    <ul class="hi"></ul>
    <div class="stack"></div>
    <div class="links"></div>
    <div class="kind"></div>
  </div>`;
  document.body.appendChild(cardOverlay);
  cardOverlay.addEventListener('click', e=>{if(e.target===cardOverlay)closeCard();});
  cardOverlay.querySelector('.close').addEventListener('click', closeCard);
  // Escape closes the card; stop here so the same keypress doesn't also exit the
  // constellation zoom (that handler is registered later on document) — one
  // Escape closes the card, a second Escape leaves the zoom.
  document.addEventListener('keydown', e=>{if(e.key==='Escape'&&cardOverlay.classList.contains('open')){e.stopImmediatePropagation(); closeCard();}});
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
// Analytics. Guarded because the umami script is deferred, and blocked outright
// for a fair share of visitors — a missing tracker must never break the chart.
function track(event, data){
  try{ if(window.umami && typeof umami.track === 'function') umami.track(event, data); }
  catch(_){ /* analytics is never load-bearing */ }
}

function openCard(s, greek){
  const o = ensureCard();
  track('card-open', {project: s.nm, kind: s.k || 'unknown'});
  lastFocused = document.activeElement;
  o.querySelector('.greek').textContent = greek;
  o.querySelector('h2').textContent = s.nm;
  o.querySelector('.sub').textContent = s.g;
  o.querySelector('.desc').textContent = s.d || '';
  // lead with the artifact: a screenshot when we have one
  const shot = o.querySelector('.shot');
  if(s.img){ shot.src = s.img; shot.alt = s.nm + ' screenshot'; shot.style.display=''; }
  else { shot.removeAttribute('src'); shot.style.display='none'; }
  // "how it works": bullets whose label (before the em dash) reads bold
  const hi = o.querySelector('.hi'); hi.innerHTML = '';
  if(s.hi && s.hi.length){
    hi.style.display='';
    s.hi.forEach(x=>{
      const li=document.createElement('li');
      const i = x.indexOf(': ');
      if(i>0){ const b=document.createElement('strong'); b.textContent=x.slice(0,i); li.appendChild(b); li.appendChild(document.createTextNode(x.slice(i))); }
      else li.textContent=x;
      hi.appendChild(li);
    });
  } else hi.style.display='none';
  const stack = o.querySelector('.stack');
  if(s.st){ stack.textContent = s.st; stack.style.display=''; } else stack.style.display='none';
  const links = o.querySelector('.links'); links.innerHTML = '';
  if(s.page){links.innerHTML += `<a href="${s.page}" data-umami-event="card-link" data-umami-event-target="${s.nm}-page">full write-up →</a>`;}
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

// ---------- keyboard / navigation help (toggled with ?) ----------
let helpOverlay = null, helpLastFocused = null;
function ensureHelp(){
  if(helpOverlay) return helpOverlay;
  helpOverlay = document.createElement('div');
  helpOverlay.className = 'card-overlay help-overlay';
  helpOverlay.innerHTML = `<div class="card help" role="dialog" aria-modal="true" aria-labelledby="help-title">
    <button class="close" aria-label="close">esc · close</button>
    <h2 id="help-title">Finding your way</h2>
    <dl class="shortcuts">
      <dt>Click a constellation</dt><dd>zoom into it</dd>
      <dt>Click a star</dt><dd>open its write-up</dd>
      <dt><kbd>&larr;</kbd><kbd>&rarr;</kbd><kbd>&uarr;</kbd><kbd>&darr;</kbd></dt><dd>move between stars</dd>
      <dt><kbd>Enter</kbd> / <kbd>Space</kbd></dt><dd>open the focused star or constellation</dd>
      <dt><kbd>Esc</kbd></dt><dd>close a card, or zoom back out</dd>
      <dt><kbd>?</kbd></dt><dd>show this help</dd>
    </dl>
  </div>`;
  document.body.appendChild(helpOverlay);
  helpOverlay.addEventListener('click', e=>{ if(e.target===helpOverlay) closeHelp(); });
  helpOverlay.querySelector('.close').addEventListener('click', closeHelp);
  // Escape closes help from anywhere (document-level, like the card) so it works
  // even if focus has left the dialog; stopImmediatePropagation keeps the same
  // keypress from also exiting a constellation zoom underneath.
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && helpOverlay && helpOverlay.classList.contains('open')){ e.stopImmediatePropagation(); closeHelp(); } });
  // trap Tab inside the dialog so focus can't leak to the page behind it
  helpOverlay.addEventListener('keydown', e=>{
    if(e.key!=='Tab') return;
    const f = [...helpOverlay.querySelectorAll('button, a[href]')].filter(el=>el.offsetParent!==null);
    if(!f.length) return;
    const first=f[0], last=f[f.length-1];
    if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
  });
  return helpOverlay;
}
function openHelp(){
  const o = ensureHelp();
  helpLastFocused = document.activeElement;
  o.classList.add('open');
  document.body.style.overflow = 'hidden';
  o.querySelector('.close').focus();
}
function closeHelp(){
  if(helpOverlay) helpOverlay.classList.remove('open');
  document.body.style.overflow = '';
  if(helpLastFocused && helpLastFocused.focus){ helpLastFocused.focus(); helpLastFocused = null; }
}
function toggleHelp(){ (helpOverlay && helpOverlay.classList.contains('open')) ? closeHelp() : openHelp(); }

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
  const g=document.createElementNS(SVGNS,'g'); g.setAttribute('class','seasonal'); g.setAttribute('aria-hidden','true');
  for(let i=0;i<pts.length-1;i++){const l=document.createElementNS(SVGNS,'line');l.setAttribute('x1',pts[i][0]);l.setAttribute('y1',pts[i][1]);l.setAttribute('x2',pts[i+1][0]);l.setAttribute('y2',pts[i+1][1]);g.appendChild(l);}
  pts.forEach(pp=>{const d=document.createElementNS(SVGNS,'circle');d.setAttribute('cx',pp[0]);d.setAttribute('cy',pp[1]);d.setAttribute('r',1.5);d.setAttribute('class','sstar');g.appendChild(d);});
  const t=document.createElementNS(SVGNS,'text');t.setAttribute('x',pts[0][0]-4);t.setAttribute('y',pts[0][1]+20);t.setAttribute('class','slabel');t.textContent=season+' · in season';g.appendChild(t);
  cam.appendChild(g);
}
function decorate(wrap, svg, cam){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compass=wrap.querySelector('.compass'), needle=compass&&compass.querySelector('.needle');
  // compass needle tracks the cursor: rAF-throttled with a cached rect so we
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
      timer = setTimeout(fly, 12000+rnd(seed++)*15000);};
    // Stop the chain entirely while hidden rather than just skipping the
    // element: the old guard left a timer rescheduling itself for the life of
    // a backgrounded tab. Restart on return.
    let timer = setTimeout(fly, 6000);
    document.addEventListener('visibilitychange', ()=>{
      clearTimeout(timer);
      if(!document.hidden) timer = setTimeout(fly, 4000);
    });
  }
  // comet → colophon
  const comet=document.createElement('button'); comet.className='comet'; comet.type='button'; comet.setAttribute('aria-label','Colophon');
  comet.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="3" y1="21" x2="15" y2="9"/><circle cx="17" cy="7" r="3"/></svg>`;
  comet.addEventListener('click',()=>openCard({nm:'About this site', g:'colophon', d:'My work laid out as a star chart: side projects, the day job, and Tableside, a small web studio. Built by hand; a lot of it through a Claude agent I run over Telegram. Type set in Cormorant Garamond and IBM Plex Mono.', k:null},'·'));
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
  // role=group (not img): img is "children-presentational", which makes
  // browse-mode screen readers prune the focusable constellation/star buttons
  // from the reading order. group keeps the labelled container while exposing
  // the interactive descendants. (The list-view text index mirrors it anyway.)
  svg.setAttribute('role','group');
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
    nodes[c.id] = buildConstellation(c, cam, (s, greek, cons)=>{
      // On the zoomed-out overview, a star tap should ZOOM its constellation,
      // not open a star card. This matches the stated model ("tap a
      // constellation, then a star") and fixes the touch bug where the enlarged
      // mobile hit-circles blanket the figure interior, so a tap meant for the
      // constellation landed on a star and opened the wrong card ~45% of taps.
      // Once entered (currentZoom===this id), star taps open cards as before.
      // This callback only runs on user interaction, so the later-declared
      // `currentZoom` / `enter` (below) are initialized by the time it fires.
      if(mode==='overview' && currentZoom!==cons.id){ enter(cons.id, false); return; }
      openCard(s, greek);
    });
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
    compass.setAttribute('aria-hidden', 'true'); // decorative instrument, not a real nav control
    compass.innerHTML = `<svg viewBox="0 0 60 60" focusable="false">` +
      `<circle class="rose" cx="30" cy="30" r="22"/>` +
      `<circle class="tick-ring" cx="30" cy="30" r="18.5"/>` +
      `<line x1="30" y1="8" x2="30" y2="52"/><line x1="8" y1="30" x2="52" y2="30"/>` +
      `<line class="ord" x1="14.4" y1="14.4" x2="19.4" y2="19.4"/>` +
      `<line class="ord" x1="45.6" y1="14.4" x2="40.6" y2="19.4"/>` +
      `<line class="ord" x1="14.4" y1="45.6" x2="19.4" y2="40.6"/>` +
      `<line class="ord" x1="45.6" y1="45.6" x2="40.6" y2="40.6"/>` +
      `<g class="needle-pivot"><g class="needle">` +
      `<polygon class="tip" points="30,9 32.4,30 30,26.5 27.6,30"/>` +
      `<polygon class="tail" points="30,51 32.4,30 30,33.5 27.6,30"/>` +
      `</g></g><circle class="pivot" cx="30" cy="30" r="1.4"/>` +
      `<text x="30" y="7">N</text><text x="30" y="58">S</text><text x="5" y="33">W</text><text x="56" y="33">E</text></svg>`;
    wrap.appendChild(compass);
    renderSeasonal(cam, new Date());
    wrap.appendChild(buildMoon(new Date()));
    decorate(wrap, svg, cam);
  }

  // ---- zoom logic (overview mode only) ----
  let currentZoom = null, live = null;
  function enter(id, moveFocus){
    const c = CONSTELLATIONS.find(x=>x.id===id);
    if(!c) return;
    track('constellation-enter', {id, via: moveFocus ? 'keyboard' : 'pointer'});
    const [x0,y0,x1,y1] = c.box;
    // generous padding so outward star labels, the breadcrumb (top) and the
    // compass don't clip the figure once zoomed in. On phones the breadcrumb is
    // a fixed-pixel overlay that eats a bigger fraction of the smaller screen, so
    // give portrait phones extra top clearance (else the breadcrumb covers the
    // top stars); landscape phones trade some of that back to fit vertically.
    const narrow = window.innerWidth <= 720;
    const portrait = window.innerHeight >= window.innerWidth;
    const padX = 72;
    const padTop = narrow ? (portrait ? 150 : 110) : 96;
    const padBot = (narrow && !portrait) ? 40 : 64;
    const bx = x0-padX, by = y0-padTop, bw = (x1-x0)+padX*2, bh = (y1-y0)+padTop+padBot;
    const s = Math.min(SKY_W/bw, SKY_H/bh);
    const cxv = (SKY_W - bw*s)/2, cyv = (SKY_H - bh*s)/2;
    cam.style.transform = `translate(${cxv - bx*s}px, ${cyv - by*s}px) scale(${s})`;
    const cmp = wrap.querySelector('.compass'); if(cmp) cmp.style.display='none';
    // dim other constellations and take them out of the Tab order while zoomed,
    // so a keyboard user can't Tab into the near-invisible off-screen figures.
    // NB: `inert` is an HTMLElement-only property and is a no-op on SVG <g>, so
    // we gate focus directly with tabindex on the group and each of its stars.
    CONSTELLATIONS.forEach(o=>{
      const n = nodes[o.id]; if(!n) return;
      const dim = o.id!==id;
      // set state symmetrically for BOTH branches so chaining enter()->enter()
      // (zooming straight from one constellation to another, no exit between)
      // can't leave the new target dimmed or the old one still 'entered' with
      // ghost labels — previously only exit() reset this.
      n.node.style.opacity = dim ? '.12' : '';
      n.node.classList.toggle('lit', !dim);
      n.node.classList.toggle('entered', !dim);
      n.node.setAttribute('tabindex', dim ? '-1' : '0');
      // also pull dimmed figures out of the AT tree so screen-reader browse/rotor
      // users don't wade through the 8% opacity, visually-gone constellations.
      // aria-hidden cascades to the descendant stars, so the group is enough.
      if(dim) n.node.setAttribute('aria-hidden','true'); else n.node.removeAttribute('aria-hidden');
      n.stars.forEach(st=> st.setAttribute('tabindex', dim ? '-1' : '0'));
    });
    // the visitor has found the way in; the first-look cue has done its job
    Object.values(nodes).forEach(n=>n.node.classList.remove('attract'));
    bc.style.display = 'flex';
    bc.innerHTML = `<span>Sky</span><span>›</span><span class="step">${c.name}</span>` +
      (c.section ? `<span>›</span><a class="plate-link" href="${c.section}" data-umami-event="plate-link" data-umami-event-target="${c.id}">Open plate ↗</a>` : '') +
      `<button class="zoom-out" aria-label="zoom out">Back</button>`;
    bc.querySelector('.zoom-out').addEventListener('click', exit);
    history.replaceState(null,'','#/'+id);
    document.body.classList.add('zoomed');
    if(live) live.textContent = 'Entered '+c.name+'. Press Escape to return.';
    currentZoom = id;
    // The sky canvas can be taller than the viewport (esp. desktop and short
    // landscape), so a zoomed constellation may spill below the fold with its
    // lower stars unclickable. Pull the chart into view so the whole figure is
    // reachable without manual scrolling. block:'center' keeps a ~768px chart
    // fully visible on an ~800px viewport; harmless when it already fits.
    // Honor reduced-motion: smooth scroll can be vestibular-triggering.
    if(wrap.scrollIntoView){
      const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      wrap.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'center'});
    }
    // for keyboard zoom, move focus into the constellation so arrow-cycling works
    if(moveFocus){ const st = nodes[id] && nodes[id].stars; (st && st[0] ? st[0] : nodes[id].node).focus(); }
  }
  function exit(moveFocus){
    const prev = currentZoom;
    cam.style.transform = '';
    const cmp = wrap.querySelector('.compass'); if(cmp) cmp.style.display='';
    CONSTELLATIONS.forEach(o=>{
      const n = nodes[o.id]; if(!n) return;
      n.node.classList.remove('lit','entered');
      n.node.style.opacity = '';
      // restore Tab order and AT visibility for the constellations dimmed by enter()
      n.node.setAttribute('tabindex','0');
      n.node.removeAttribute('aria-hidden');
      n.stars.forEach(st=> st.setAttribute('tabindex','0'));
    });
    bc.style.display = 'none';
    history.replaceState(null,'','#/');
    document.body.classList.remove('zoomed');
    if(live) live.textContent = 'Back to the full sky.';
    currentZoom = null;
    // for keyboard exit, return focus to the constellation hub we came from
    if(moveFocus && prev && nodes[prev]) nodes[prev].node.focus();
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
          if(currentZoom===id) exit(true); else enter(id, true);
        }
      });
    });
    svg.addEventListener('click', e=>{
      if(e.target===svg) exit();
    });
    document.addEventListener('keydown', e=>{
      // don't exit the zoom while a star card OR the help dialog is open — let
      // that Escape close the overlay first (this handler is registered before
      // the lazily-created overlays' own Escape handlers, so it must guard here)
      const overlayOpen = (cardOverlay && cardOverlay.classList.contains('open')) || (helpOverlay && helpOverlay.classList.contains('open'));
      if(e.key==='Escape' && currentZoom && !overlayOpen){exit(true);}
    });
    // screen-reader announcements for enter/exit. Created BEFORE the hash-load
    // below so a deep-linked zoom (e.g. /#/opera-minora) is announced too.
    live = document.createElement('div'); live.className = 'sr-only';
    live.setAttribute('aria-live','polite'); wrap.appendChild(live);
    // Honor the hash on load AND keep the zoom synced with later hash navigation
    // (address-bar edits, in-page anchors, browser back/forward) — before, deep
    // links only worked on a fresh document load. enter()/exit() use
    // replaceState, which does not fire hashchange, so this can't loop.
    // Gate on a REAL constellation id: a pattern-matching typo (e.g.
    // #/opera-minorz) must fall through to exit, not leave a stale zoom — enter()
    // returns early on an unknown id, which would otherwise strand the prior
    // state and make the same URL render differently on reload.
    const syncHash = ()=>{ const m=(location.hash||'').match(/^#\/([a-z-]+)/); if(m && CONSTELLATIONS.some(c=>c.id===m[1])) enter(m[1]); else if(currentZoom) exit(); };
    syncHash();
    window.addEventListener('hashchange', syncHash);

    // First-look cue. The sky is the only way into the work, and a still
    // picture gives no sign that it answers back — so once the plate has
    // developed, the projects constellation lights itself twice (see
    // .cons.attract). Skipped for reduced-motion and for a deep-linked zoom;
    // cancelled the moment the visitor does anything at all.
    const attract = nodes['opera-minora'] && nodes['opera-minora'].node;
    if(attract && !matchMedia('(prefers-reduced-motion: reduce)').matches && !currentZoom){
      const t = setTimeout(()=>{ if(!currentZoom) attract.classList.add('attract'); }, 1500);
      const stopAttract = ()=>{ clearTimeout(t); attract.classList.remove('attract'); };
      ['pointerdown','keydown','touchstart'].forEach(ev=>
        window.addEventListener(ev, stopAttract, {once:true, passive:true}));
      attract.addEventListener('animationend', stopAttract, {once:true});
    }

    // Did the visitor touch the sky at all? Bounce rate cannot tell "left
    // immediately" apart from "played with the chart for forty seconds and
    // then left", and those call for opposite fixes. Fires at most once per
    // pageview, and only for interaction inside the chart itself.
    let touched = false;
    const firstTouch = (e)=>{
      if(touched) return;
      touched = true;
      track('sky-first-interaction', {via: e.type});
    };
    ['pointerdown','keydown','touchstart'].forEach(ev=>
      wrap.addEventListener(ev, firstTouch, {once:true, passive:true}));

    // list-view toggle (Sky / List)
    const vt = document.getElementById('viewtoggle');
    if(vt) vt.addEventListener('click', ()=>{
      const on = document.body.classList.toggle('listmode');
      vt.setAttribute('aria-pressed', on?'true':'false');
      vt.textContent = on ? '★ Back to the sky' : 'View as list →';
    });
    // sticky "back to the sky" button (shown on mobile while zoomed in).
    // Appended to <body>, NOT the chart: the intro animation leaves main.chart
    // with an identity transform, which would make it the containing block for
    // this position:fixed pill — pinning/sizing it to the chart box instead of
    // the viewport (text wraps, and it scrolls with the chart). Body escapes that.
    const skyback = document.createElement('button');
    skyback.type = 'button'; skyback.className = 'skyback'; skyback.textContent = '★ Back to the sky';
    skyback.addEventListener('click', exit); document.body.appendChild(skyback);
    // pointer-reachable help trigger: the shortcuts overlay was bound only to the
    // `?` key, so touch users (no keyboard) could never open it. Small glyph in
    // the chart corner, 44px touch target on mobile, mirrors the `?` shortcut.
    const helpBtn = document.createElement('button');
    helpBtn.type = 'button'; helpBtn.className = 'helpbtn';
    helpBtn.setAttribute('aria-label', 'Help and keyboard shortcuts');
    helpBtn.textContent = '?';
    // focus the button before opening: a click doesn't focus a <button> in
    // Safari/iOS, so without this the dialog's "restore focus on close" lands
    // on <body> instead of the trigger.
    helpBtn.addEventListener('click', ()=>{ helpBtn.focus(); openHelp(); });
    wrap.appendChild(helpBtn);
    // On touch / small screens the chart fills its own corners, so a button
    // floating over the sky steals star taps (sky-wrap has overflow:hidden, so
    // it can't simply be nudged out). Move it into the band above the chart
    // there; keep the desktop corner placement (where padding leaves it clear).
    const placeHelp = ()=>{
      const chart = wrap.closest('main.chart'); if(!chart) return;
      const small = matchMedia('(max-width:720px), (max-height:560px), (hover:none) and (pointer:coarse)').matches;
      if(small){ if(helpBtn.parentElement!==chart){ chart.insertBefore(helpBtn, wrap); helpBtn.classList.add('helpbtn-bar'); } }
      else if(helpBtn.parentElement!==wrap){ wrap.appendChild(helpBtn); helpBtn.classList.remove('helpbtn-bar'); }
    };
    placeHelp();
    // Coalesce resize bursts into one layout read per frame: placeHelp
    // does a closest() + matchMedia() and can move a node, and a phone
    // collapsing its URL bar fires this dozens of times a second.
    let placeQueued = false;
    window.addEventListener('resize', ()=>{
      if(placeQueued) return;
      placeQueued = true;
      requestAnimationFrame(()=>{ placeQueued = false; placeHelp(); });
    }, {passive:true});
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

  // '?' toggles the keyboard/navigation help on any chart page (ignore while typing)
  document.addEventListener('keydown', e=>{
    if(e.key !== '?') return;
    const t = document.activeElement;
    if(t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    // don't stack help over an open star card (shared scroll-lock + ambiguous
    // Escape order); let the card be dealt with first
    if(cardOverlay && cardOverlay.classList.contains('open')) return;
    e.preventDefault();
    toggleHelp();
  });
};
