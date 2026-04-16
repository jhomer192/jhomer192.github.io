import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

interface ShatterHeroProps {
  text?: string;
  className?: string;
}

interface LetterBody {
  body: Matter.Body;
  char: string;
  homeX: number;
  homeY: number;
  width: number;
  height: number;
}

const FONT_SIZE_BASE = 64; // px at 1280 wide
const FONT_FAMILY = 'system-ui, -apple-system, sans-serif';
const SPRING_STIFFNESS = 0.0015;
const DAMPING = 0.85;
const POINTER_RADIUS = 40;
const REBUILD_DEBOUNCE = 150;

function getFontSize(containerWidth: number): number {
  // Scale font from 36px (375) to 72px (1280+)
  const min = 36;
  const max = 72;
  const t = Math.min(1, (containerWidth - 375) / (1280 - 375));
  return Math.round(min + t * (max - min));
}

function measureGlyphs(
  text: string,
  fontSize: number,
  containerWidth: number
): { chars: string[]; xs: number[]; ys: number[]; widths: number[]; height: number } {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`;

  const chars: string[] = text.split('');
  const widths: number[] = chars.map((c) => ctx.measureText(c).width);
  const totalWidth = widths.reduce((s, w) => s + w, 0);
  let startX = (containerWidth - totalWidth) / 2;

  const xs: number[] = [];
  for (const w of widths) {
    xs.push(startX + w / 2);
    startX += w;
  }

  return { chars, xs, ys: chars.map(() => fontSize * 0.6), widths, height: fontSize };
}

export default function ShatterHero({ text = 'Jack Homer', className = '' }: ShatterHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const letterBodiesRef = useRef<LetterBody[]>([]);
  const pointerBodyRef = useRef<Matter.Body | null>(null);
  const rafRef = useRef<number>(0);
  const runningRef = useRef(false);
  const rebuildTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPhysics, setIsPhysics] = useState(false);

  // Check capabilities once on mount
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsPhysics(fine && !reduced);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d')!;

    function drawGradientText(
      ctx: CanvasRenderingContext2D,
      chars: string[],
      xs: number[],
      y: number,
      fontSize: number,
      angles: number[] = []
    ) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`;
      ctx.textBaseline = 'middle';

      const grad = ctx.createLinearGradient(0, 0, canvas!.width, 0);
      grad.addColorStop(0, '#38bdf8');   // sky-400
      grad.addColorStop(0.5, '#22d3ee'); // cyan-400
      grad.addColorStop(1, '#a78bfa');   // violet-400
      ctx.fillStyle = grad;

      chars.forEach((char, i) => {
        ctx.save();
        ctx.translate(xs[i], y);
        ctx.rotate(angles[i] ?? 0);
        ctx.fillText(char, 0, 0);
        ctx.restore();
      });
    }

    function buildEngine(containerWidth: number, containerHeight: number) {
      // Destroy existing engine
      if (engineRef.current) {
        Matter.Runner.stop(Matter.Runner.create());
        Matter.Engine.clear(engineRef.current);
        engineRef.current = null;
      }
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;

      const fontSize = getFontSize(containerWidth);
      const { chars, xs, ys, widths, height } = measureGlyphs(text, fontSize, containerWidth);

      canvas!.width = containerWidth;
      canvas!.height = containerHeight;

      if (!isPhysics) {
        // Static frame
        drawGradientText(ctx, chars, xs, ys[0], fontSize);
        return;
      }

      const engine = Matter.Engine.create({ gravity: { x: 0, y: 0 } });
      engineRef.current = engine;

      const bodies: LetterBody[] = chars.map((char, i) => {
        const bw = Math.max(widths[i], 10);
        const bh = height * 1.1;
        const body = Matter.Bodies.rectangle(xs[i], ys[i], bw, bh, {
          restitution: 0.8,
          friction: 0.05,
          density: 0.001,
          label: char,
        });
        return { body, char, homeX: xs[i], homeY: ys[i], width: bw, height: bh };
      });

      letterBodiesRef.current = bodies;
      Matter.World.add(engine.world, bodies.map((l) => l.body));

      // Walls
      const wallOpts = { isStatic: true, restitution: 0.5, friction: 0 };
      const thick = 50;
      Matter.World.add(engine.world, [
        Matter.Bodies.rectangle(containerWidth / 2, -thick / 2, containerWidth, thick, wallOpts),
        Matter.Bodies.rectangle(containerWidth / 2, containerHeight + thick / 2, containerWidth, thick, wallOpts),
        Matter.Bodies.rectangle(-thick / 2, containerHeight / 2, thick, containerHeight, wallOpts),
        Matter.Bodies.rectangle(containerWidth + thick / 2, containerHeight / 2, thick, containerHeight, wallOpts),
      ]);

      // Pointer body (parked offscreen)
      const pb = Matter.Bodies.circle(-500, -500, POINTER_RADIUS, {
        isStatic: true,
        restitution: 1,
        friction: 0,
        label: 'pointer',
      });
      pointerBodyRef.current = pb;
      Matter.World.add(engine.world, pb);

      runningRef.current = true;

      function loop() {
        if (!runningRef.current) return;
        Matter.Engine.update(engine, 1000 / 60);

        // Spring each letter toward home
        for (const lb of letterBodiesRef.current) {
          const dx = lb.homeX - lb.body.position.x;
          const dy = lb.homeY - lb.body.position.y;
          Matter.Body.applyForce(lb.body, lb.body.position, {
            x: dx * SPRING_STIFFNESS,
            y: dy * SPRING_STIFFNESS,
          });
          // Dampen rotation
          Matter.Body.setAngularVelocity(lb.body, lb.body.angularVelocity * DAMPING);
        }

        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`;
        ctx.textBaseline = 'middle';

        const grad = ctx.createLinearGradient(0, 0, canvas!.width, 0);
        grad.addColorStop(0, '#38bdf8');
        grad.addColorStop(0.5, '#22d3ee');
        grad.addColorStop(1, '#a78bfa');
        ctx.fillStyle = grad;

        for (const lb of letterBodiesRef.current) {
          ctx.save();
          ctx.translate(lb.body.position.x, lb.body.position.y);
          ctx.rotate(lb.body.angle);
          ctx.fillText(lb.char, 0, 0);
          ctx.restore();
        }

        rafRef.current = requestAnimationFrame(loop);
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    function init() {
      const w = container.offsetWidth;
      const h = Math.max(container.offsetHeight, 100);
      buildEngine(w, h);
    }

    init();

    // Pointer tracking
    function onMouseMove(e: MouseEvent) {
      if (!pointerBodyRef.current) return;
      const rect = canvas!.getBoundingClientRect();
      Matter.Body.setPosition(pointerBodyRef.current, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    function onMouseLeave() {
      if (pointerBodyRef.current) {
        Matter.Body.setPosition(pointerBodyRef.current, { x: -500, y: -500 });
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (!pointerBodyRef.current || !e.touches[0]) return;
      const rect = canvas!.getBoundingClientRect();
      Matter.Body.setPosition(pointerBodyRef.current, {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      });
    }

    function onTouchEnd() {
      if (pointerBodyRef.current) {
        Matter.Body.setPosition(pointerBodyRef.current, { x: -500, y: -500 });
      }
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // Pause on hidden tab
    function onVisibilityChange() {
      if (document.hidden) {
        runningRef.current = false;
        cancelAnimationFrame(rafRef.current);
      } else if (engineRef.current) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(function loop() {
          if (!runningRef.current) return;
          // just restart loop — this is a simplified resume
          init();
        });
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange);

    // ResizeObserver
    const ro = new ResizeObserver(() => {
      if (rebuildTimerRef.current) clearTimeout(rebuildTimerRef.current);
      rebuildTimerRef.current = setTimeout(init, REBUILD_DEBOUNCE);
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        engineRef.current = null;
      }
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      ro.disconnect();
    };
  }, [text, isPhysics]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`} style={{ minHeight: 100 }}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
      <h1 className="absolute opacity-0 pointer-events-none top-0 left-0" aria-label={text}>
        {text}
      </h1>
    </div>
  );
}
