import { useEffect, useRef, useCallback, useState } from 'react';
import Matter from 'matter-js';

const { Engine, World, Bodies, Body, Mouse, MouseConstraint, Events, Runner } = Matter;

interface LetterBody {
  body: Matter.Body;
  char: string;
  homeX: number;
  homeY: number;
  width: number;
}

/**
 * Full-bleed canvas hero that renders "Jack Homer" as individual physics-simulated letters.
 * Letters react to mouse/touch and spring back to their home positions.
 * Falls back to static rendering on reduced-motion or non-pointer-fine devices.
 */
export default function ShatterHero() {
  const [resizeKey, setResizeKey] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setResizeKey(k => k + 1), 250);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <ShatterHeroCanvas key={resizeKey} />;
}

function ShatterHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const lettersRef = useRef<LetterBody[]>([]);
  const rafRef = useRef<number>(0);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);

  // Read theme accent colors from CSS variables
  const getAccentColors = useCallback(() => {
    const style = getComputedStyle(document.documentElement);
    return {
      accent: style.getPropertyValue('--accent').trim() || '#73daca',
      accent2: style.getPropertyValue('--accent-2').trim() || '#7aa2f7',
      accent3: style.getPropertyValue('--accent-3').trim() || '#bb9af7',
    };
  }, []);

  // Check if we should animate
  const shouldAnimate = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return false;
    // Only animate on pointer-fine devices (desktop, large tablets)
    const pointerFine = window.matchMedia('(pointer: fine)').matches;
    return pointerFine;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const TEXT = 'Jack Homer';
    const animate = shouldAnimate();

    // Measure and set canvas size
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      return { w: rect.width, h: rect.height, dpr };
    };

    const { w, h } = resize();

    // Compute font size to fit the container width nicely
    const fontSize = Math.min(w * 0.11, 72);
    const font = `bold ${fontSize}px ui-sans-serif, system-ui, -apple-system, sans-serif`;
    ctx.font = font;

    // Measure each letter
    const letterMetrics: { char: string; width: number }[] = [];
    for (const char of TEXT) {
      const m = ctx.measureText(char);
      letterMetrics.push({ char, width: m.width });
    }
    const totalWidth = letterMetrics.reduce((s, l) => s + l.width, 0);

    // Compute home positions (centered horizontally, vertically centered in hero)
    const startX = (w - totalWidth) / 2;
    const centerY = h * 0.45; // slightly above center looks better
    let cursorX = startX;
    const homes: { char: string; x: number; y: number; width: number }[] = [];
    for (const lm of letterMetrics) {
      homes.push({
        char: lm.char,
        x: cursorX + lm.width / 2,
        y: centerY,
        width: lm.width,
      });
      cursorX += lm.width;
    }

    // Build the accent gradient for drawing
    const colors = getAccentColors();

    const drawStaticLetters = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.font = font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Create gradient across the full text width
      const grad = ctx.createLinearGradient(startX, 0, startX + totalWidth, 0);
      grad.addColorStop(0, colors.accent);
      grad.addColorStop(0.5, colors.accent2);
      grad.addColorStop(1, colors.accent3);
      ctx.fillStyle = grad;

      for (const home of homes) {
        ctx.fillText(home.char, home.x, home.y);
      }
    };

    if (!animate) {
      // Static: just draw once and done
      drawStaticLetters();
      return;
    }

    // --- Physics setup ---
    const engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0.001 }, // no gravity
    });
    engineRef.current = engine;

    const letterHeight = fontSize * 0.85;

    // Create letter bodies
    const letterBodies: LetterBody[] = homes.map((home) => {
      const body = Bodies.rectangle(home.x, home.y, home.width, letterHeight, {
        restitution: 0.4,
        friction: 0.1,
        frictionAir: 0.04,
        density: 0.002,
        label: home.char,
      });
      // Space characters: make them static/invisible
      if (home.char === ' ') {
        Body.setStatic(body, true);
      }
      World.add(engine.world, body);
      return { body, char: home.char, homeX: home.x, homeY: home.y, width: home.width };
    });
    lettersRef.current = letterBodies;

    // Walls (keep letters in bounds)
    const wallThickness = 60;
    const walls = [
      Bodies.rectangle(w / 2, -wallThickness / 2, w + 200, wallThickness, { isStatic: true }), // top
      Bodies.rectangle(w / 2, h + wallThickness / 2, w + 200, wallThickness, { isStatic: true }), // bottom
      Bodies.rectangle(-wallThickness / 2, h / 2, wallThickness, h + 200, { isStatic: true }), // left
      Bodies.rectangle(w + wallThickness / 2, h / 2, wallThickness, h + 200, { isStatic: true }), // right
    ];
    World.add(engine.world, walls);

    // Mouse interaction
    const mouse = Mouse.create(canvas);
    // Fix for high-DPI: matter-js reads canvas dimensions, need pixel ratio adjustment
    (mouse as any).pixelRatio = window.devicePixelRatio || 1;

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);
    mouseConstraintRef.current = mouseConstraint;

    // Spring force: pull letters back toward home
    const SPRING_STIFFNESS = 0.0008;
    const DAMPING = 0.02;

    Events.on(engine, 'beforeUpdate', () => {
      for (const lb of letterBodies) {
        if (lb.char === ' ') continue;
        const dx = lb.homeX - lb.body.position.x;
        const dy = lb.homeY - lb.body.position.y;
        // Spring force toward home
        Body.applyForce(lb.body, lb.body.position, {
          x: dx * SPRING_STIFFNESS,
          y: dy * SPRING_STIFFNESS,
        });
        // Angular spring to upright
        const angleDiff = -lb.body.angle;
        Body.setAngularVelocity(lb.body, lb.body.angularVelocity + angleDiff * 0.05);
        // Damping
        Body.setVelocity(lb.body, {
          x: lb.body.velocity.x * (1 - DAMPING),
          y: lb.body.velocity.y * (1 - DAMPING),
        });
      }
    });

    // Render loop
    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.font = font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Gradient across the original text span
      const grad = ctx.createLinearGradient(startX, 0, startX + totalWidth, 0);
      grad.addColorStop(0, colors.accent);
      grad.addColorStop(0.5, colors.accent2);
      grad.addColorStop(1, colors.accent3);
      ctx.fillStyle = grad;

      for (const lb of letterBodies) {
        if (lb.char === ' ') continue;
        const { x, y } = lb.body.position;
        const angle = lb.body.angle;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillText(lb.char, 0, 0);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    // Start simulation
    const runner = Runner.create();
    Runner.run(runner, engine);
    runnerRef.current = runner;
    rafRef.current = requestAnimationFrame(render);

    // Pause when tab hidden
    const handleVisibility = () => {
      if (document.hidden) {
        Runner.stop(runner);
        cancelAnimationFrame(rafRef.current);
      } else {
        Runner.run(runner, engine);
        rafRef.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Resize is handled by the parent wrapper (remounts this component via key)

    // Theme change: update colors on next frame
    const observer = new MutationObserver(() => {
      // Colors will be re-read on next render frame automatically via getAccentColors
      // but we need to update the gradient. The render loop reads from `colors` which
      // is captured. Let's update it.
      const newColors = getAccentColors();
      colors.accent = newColors.accent;
      colors.accent2 = newColors.accent2;
      colors.accent3 = newColors.accent3;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (engineRef.current) {
        World.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, [shouldAnimate, getAccentColors]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '200px' }}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-[1]"
        style={{ touchAction: 'pan-y' }}
      />
      {/* Semantic h1 for accessibility and no-JS fallback */}
      <h1
        className="absolute inset-0 flex items-center justify-center text-5xl font-bold bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] bg-clip-text text-transparent z-0 pointer-events-none"
        style={{ opacity: 0 }}
        aria-hidden="false"
      >
        Jack Homer
      </h1>
      {/* No-JS / reduced-motion fallback shown via CSS */}
      <noscript>
        <h1 className="absolute inset-0 flex items-center justify-center text-5xl font-bold bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] bg-clip-text text-transparent">
          Jack Homer
        </h1>
      </noscript>
    </div>
  );
}
