import { useEffect, useRef } from 'react';

/**
 * Tubes cursor background — Three.js tubes effect (WebGL/WebGPU).
 * Original: https://codepen.io/soju22/pen/qEbdVjK
 * License: CC BY-NC-SA 4.0 (Attribution, Non-Commercial)
 * On mobile: no touch interaction; tubes follow a smooth random path instead.
 */

const TUBES_SCRIPT_URL =
  'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';

const MOBILE_MAX_WIDTH = 767;

function setCanvasSize(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
}

function isMobile() {
  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
}

export default function TubesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setCanvasSize(canvas);
    const resize = () => setCanvasSize(canvas);
    window.addEventListener('resize', resize);

    let app: { tubes?: { setColors?: (c: string[]) => void; setLightsColors?: (c: string[]) => void }; destroy?: () => void } | null = null;
    let forwardCleanup: (() => void) | null = null;

    void import(/* @vite-ignore */ TUBES_SCRIPT_URL)
      .then((module) => {
        const TubesCursor = module.default as (el: HTMLCanvasElement, opts: object) => typeof app;
        app = TubesCursor(canvas, {
          tubes: {
            colors: ['#f967fb', '#53bc28', '#6958d5'],
            lights: {
              intensity: 200,
              colors: ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5'],
            },
          },
        });

        const mobile = isMobile();

        if (mobile) {
          // Mobile: no touch/cursor. Drive tubes with a smooth random path.
          let x = window.innerWidth * 0.5;
          let y = window.innerHeight * 0.5;
          let targetX = x;
          let targetY = y;
          let rafId = 0;

          const pickNewTarget = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            targetX = 0.2 * w + Math.random() * 0.6 * w;
            targetY = 0.2 * h + Math.random() * 0.6 * h;
          };

          const tick = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            x += (targetX - x) * 0.012;
            y += (targetY - y) * 0.012;
            if (Math.abs(targetX - x) < 2 && Math.abs(targetY - y) < 2) pickNewTarget();
            x = Math.max(0, Math.min(w, x));
            y = Math.max(0, Math.min(h, y));
            canvas.dispatchEvent(
              new MouseEvent('mousemove', { clientX: x, clientY: y, bubbles: true })
            );
            rafId = requestAnimationFrame(tick);
          };

          pickNewTarget();
          rafId = requestAnimationFrame(tick);

          forwardCleanup = () => cancelAnimationFrame(rafId);
        } else {
          // Desktop: forward mousemove/touch once per frame.
          let rafId = 0;
          let lastX = 0;
          let lastY = 0;
          let pending = false;

          const dispatchToCanvas = () => {
            pending = false;
            canvas.dispatchEvent(
              new MouseEvent('mousemove', {
                clientX: lastX,
                clientY: lastY,
                bubbles: true,
              })
            );
          };

          const onMouseMove = (e: MouseEvent) => {
            lastX = e.clientX;
            lastY = e.clientY;
            if (!pending) {
              pending = true;
              rafId = requestAnimationFrame(dispatchToCanvas);
            }
          };

          const onTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
              lastX = e.touches[0].clientX;
              lastY = e.touches[0].clientY;
              if (!pending) {
                pending = true;
                rafId = requestAnimationFrame(dispatchToCanvas);
              }
            }
          };

          window.addEventListener('mousemove', onMouseMove, { passive: true });
          window.addEventListener('touchmove', onTouchMove, { passive: true });

          forwardCleanup = () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
          };
        }
      })
      .catch((err) => console.error('TubesBackground: failed to load', err));

    return () => {
      window.removeEventListener('resize', resize);
      forwardCleanup?.();
      if (app && typeof (app as { destroy?: () => void }).destroy === 'function') {
        (app as { destroy: () => void }).destroy();
      }
    };
  }, []);

  return (
    <div className="tubes-background" aria-hidden="true">
      <canvas ref={canvasRef} id="tubes-canvas" />
    </div>
  );
}
