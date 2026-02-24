import { useRef, useLayoutEffect, useState, useCallback, useEffect } from 'react';

const ASSETS_BASE = 'https://vaibhavsadgir50.github.io/portfolio2026';
const SPEED_DRAG = -0.12;
const DRAG_THRESHOLD = 8;

function getZindex(length: number, activeIndex: number): number[] {
  return Array.from({ length }, (_, i) =>
    i === activeIndex ? length : length - Math.abs(i - activeIndex)
  );
}

const EDUCATION_ITEMS = [
  {
    id: 'siem',
    name: 'SIEM, Nashik, India',
    logo: `${ASSETS_BASE}/images/siem2.png`,
    subtitle: 'Bachelors in Computer Engineering',
    dateRange: 'Aug 2019 - May 2023',
    description: "Built strong foundations in computer science and system design. Focused on algorithms, data structures, and computational fundamentals.",
    descriptionExtras: {
      school: "Graduated with Honors in AI/ML",
      year: 'Class of 2023',
    },
  },
  {
    id: 'nyu',
    name: 'New York University',
    subtitle: 'Masters in computer engineering',
    dateRange: 'Aug 2024 - May 2026',
    logo: `${ASSETS_BASE}/images/nyu_plain.png`,
    description:
      'AI • Blockchain and Defi • Distributed Systems • High-Performance Computing • Machine learning',
    descriptionExtras: {
      school: 'from NYU Tandon & NYU Stern',
      year: 'Class of 2026',
    },
  },
];

const FLIP_DURATION_MS = 380;

function EducationPage() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [flippingCardId, setFlippingCardId] = useState<string | null>(null);
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [progress, setProgress] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const startX = useRef(0);
  const hasDragged = useRef(false);
  const rafId = useRef<number | null>(null);
  const pendingProgress = useRef<number | null>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const itemCount = EDUCATION_ITEMS.length;
  const activeIndex = Math.min(
    Math.floor((progress / 100) * Math.max(itemCount - 1, 1)),
    Math.max(itemCount - 1, 0)
  );
  const zIndexes = getZindex(itemCount, activeIndex);

  const getClientX = (e: React.MouseEvent | React.TouchEvent | globalThis.MouseEvent | TouchEvent) =>
    'clientX' in e ? e.clientX : (e as TouchEvent).touches?.[0]?.clientX ?? 0;

  const handlePointerDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setIsDown(true);
      hasDragged.current = false;
      startX.current = getClientX(e);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.MouseEvent | globalThis.MouseEvent | TouchEvent) => {
      if (!isDown) return;
      const x = getClientX(e);
      if (Math.abs(x - startX.current) > DRAG_THRESHOLD) hasDragged.current = true;
      const delta = (x - startX.current) * SPEED_DRAG;
      startX.current = x;
      const next = Math.max(0, Math.min(100, progressRef.current + delta));
      pendingProgress.current = next;
      progressRef.current = next;
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null;
          if (pendingProgress.current !== null) {
            setProgress(pendingProgress.current);
            pendingProgress.current = null;
          }
        });
      }
    },
    [isDown]
  );

  const handlePointerUp = useCallback(() => {
    if (isDown) {
      const snap = progressRef.current < 50 ? 0 : 100;
      progressRef.current = snap;
      setProgress(snap);
    }
    setIsDown(false);
  }, [isDown]);

  useEffect(() => {
    if (!isDown) return;
    const onMove = (e: globalThis.MouseEvent | TouchEvent) => handlePointerMove(e);
    const onUp = () => handlePointerUp();
    window.addEventListener('mousemove', onMove as (e: Event) => void);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove as (e: Event) => void, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove as (e: Event) => void);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove as (e: Event) => void);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDown, handlePointerMove, handlePointerUp]);

  /* On mobile: when active index changes, flip back any card that is no longer active */
  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches || expandedId == null) return;
    const activeId = EDUCATION_ITEMS[activeIndex]?.id;
    if (activeId !== expandedId) setExpandedId(null);
  }, [activeIndex, expandedId]);

  const handleCardClick = useCallback(
    (index: number, itemId: string) => {
      if (flippingCardId !== null) return;
      if (hasDragged.current) return;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      setProgress((index / Math.max(itemCount - 1, 1)) * 100);
      if (isMobile && index !== activeIndex) {
        return;
      }
      const goingToBack = expandedId !== itemId;
      setExpandedId(goingToBack ? itemId : null);
      setFlippingCardId(itemId);
      flipTimeoutRef.current = setTimeout(() => {
        setFlippingCardId(null);
        flipTimeoutRef.current = null;
      }, FLIP_DURATION_MS);
    },
    [expandedId, flippingCardId, itemCount, activeIndex]
  );

  useLayoutEffect(() => {
    return () => {
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    };
  }, []);

  useLayoutEffect(() => {
    const container = cardsRef.current;
    if (!container) return;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) return;

    const findCard = (el: EventTarget | null): HTMLElement | null =>
      (el as HTMLElement)?.closest?.('.education-section .card') ?? null;

    const onPointerMove = (e: PointerEvent) => {
      const card = findCard(e.target);
      if (!card) return;
      card.classList.remove('rotate');
      const rect = card.getBoundingClientRect();
      const hw = rect.width / 2;
      const hh = rect.height / 2;
      const ratioX = (e.clientX - (rect.x + hw)) / hw;
      const ratioY = (e.clientY - (rect.y + hh)) / hh;
      card.style.setProperty('--ratio-x', String(ratioX));
      card.style.setProperty('--ratio-y', String(ratioY));
      card.style.setProperty('--correction', '0%');
    };

    const onPointerLeave = () => {
      container.querySelectorAll<HTMLElement>('.card').forEach((card) => {
        card.style.setProperty('--ratio-x', '0');
        card.style.setProperty('--ratio-y', '0');
        card.style.setProperty('--correction', '30%');
        card.classList.add('rotate');
      });
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave);
    return () => {
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <section className="education-section">
      <div className="education-section__header">
        <h1 className="education-section__title">Education</h1>
        <p className="education-section__subtitle">Academic background.</p>
      </div>

      <div
        ref={cardsRef}
        className={`education-section__cards${isDown ? ' education-section__cards--dragging' : ''}`}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
      >
        {EDUCATION_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="card rotate"
              data-education-id={item.id}
              style={
                {
                  '--active': (index - activeIndex) / itemCount,
                  '--zIndex': zIndexes[index],
                  '--items': itemCount,
                } as React.CSSProperties
              }
              onClick={() => handleCardClick(index, item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(index, item.id);
                }
              }}
              aria-expanded={expandedId === item.id}
              aria-label={`${item.name}, click to ${expandedId === item.id ? 'flip back' : 'view'} description`}
            >
              <div
                className="card-inner"
                style={{
                  transform: `rotateY(${expandedId === item.id ? 180 : 0}deg)`,
                }}
              >
                <div className="card-face card-face--front">
                  <div className="circles" />
                  <div className="holo-bg" />
                  <div className="holo-lines" />
                  <div className="card-content">
                    <div className="card-logo">
                      <img src={item.logo} alt="" />
                    </div>
                    {(item.subtitle != null || item.dateRange != null) && (
                      <div className="card-caption">
                        <div className="card-caption__name">{item.name}</div>
                        {item.subtitle != null && (
                          <div className="card-caption__subtitle">{item.subtitle}</div>
                        )}
                        {item.dateRange != null && (
                          <div className="card-caption__date">{item.dateRange}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-face card-face--back">
                  <div className="card-back">
                    <p className="card-back__text">
                      <span className="card-back__line--main">
                        {item.description ?? 'No description available.'}
                      </span>
                      {'descriptionExtras' in item && item.descriptionExtras && (
                        <>
                          <span className="card-back__line--school">
                            {item.descriptionExtras.school}
                          </span>
                          <span className="card-back__line--year">
                            {item.descriptionExtras.year}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
    </section>
  );
}

export default EducationPage;
