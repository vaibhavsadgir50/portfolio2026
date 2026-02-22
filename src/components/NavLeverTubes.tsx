import { useEffect, useRef } from 'react';

const TUBES_SCRIPT_URL =
  'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';

function setCanvasSize(canvas: HTMLCanvasElement, container: HTMLElement) {
  const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
  const w = container.offsetWidth;
  const h = container.offsetHeight;
  canvas.width = Math.max(1, Math.floor(w * dpr));
  canvas.height = Math.max(1, Math.floor(h * dpr));
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
}

/**
 * Tubes effect inside the navbar lever (no cursor interaction).
 * Clipped to the lever SVG so it does not overflow.
 */
export default function NavLeverTubes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      if (container && canvas) setCanvasSize(canvas, container);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let app: { destroy?: () => void } | null = null;

    void import(/* @vite-ignore */ TUBES_SCRIPT_URL)
      .then((module) => {
        const TubesCursor = module.default as (
          el: HTMLCanvasElement,
          opts: object
        ) => typeof app;
        app = TubesCursor(canvas, {
          tubes: {
            colors: ['#f967fb', '#53bc28', '#6958d5'],
            lights: {
              intensity: 200,
              colors: ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5'],
            },
          },
        });
      })
      .catch((err) => console.error('NavLeverTubes: failed to load', err));

    return () => {
      ro.disconnect();
      if (app && typeof (app as { destroy?: () => void }).destroy === 'function') {
        (app as { destroy: () => void }).destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="nav-lever__tubes"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="nav-lever__tubes-canvas" />
    </div>
  );
}
