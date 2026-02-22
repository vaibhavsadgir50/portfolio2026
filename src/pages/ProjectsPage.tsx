import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';

type ProjectItem = {
  id: number;
  title: string;
  num: string;
  image: string | null;
  type: string;
  period: string;
  description: string;
  highlights?: string[];
};

const PROJECT_ITEMS: ProjectItem[] = [
  { id: 1, title: 'Project One', num: '01', image: null, type: 'Web App', period: '2024', description: 'Brief project description and impact.', highlights: ['Key outcome one', 'Key outcome two', 'Key outcome three'] },
  { id: 2, title: 'Project Two', num: '02', image: null, type: 'API / Backend', period: '2023', description: 'Brief project description and impact.', highlights: ['Key outcome one', 'Key outcome two'] },
  { id: 3, title: 'Project Three', num: '03', image: null, type: 'Mobile', period: '2023', description: 'Brief project description and impact.', highlights: ['Key outcome one', 'Key outcome two', 'Key outcome three'] },
  { id: 4, title: 'Project Four', num: '04', image: null, type: 'Tooling', period: '2022', description: 'Brief project description and impact.', highlights: ['Key outcome one', 'Key outcome two'] },
  { id: 5, title: 'Project Five', num: '05', image: null, type: 'Research', period: '2022', description: 'Brief project description and impact.', highlights: ['Key outcome one', 'Key outcome two', 'Key outcome three'] },
];

/** Drag up = next card (cards start from down, go up) */
const SPEED_DRAG = 0.1;

function getZindex(length: number, activeIndex: number): number[] {
  return Array.from({ length }, (_, i) =>
    i === activeIndex ? length : length - Math.abs(i - activeIndex)
  );
}

const DRAG_THRESHOLD = 8;

function ProjectsPage() {
  const [progress, setProgress] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
  const startY = useRef(0);
  const hasDragged = useRef(false);

  const itemCount = PROJECT_ITEMS.length;
  const activeIndex = Math.min(
    Math.floor((progress / 100) * (itemCount - 1)),
    itemCount - 1
  );
  const zIndexes = getZindex(itemCount, activeIndex);

  const getClientY = (e: React.MouseEvent | React.TouchEvent | globalThis.MouseEvent | TouchEvent) =>
    'clientY' in e ? e.clientY : (e as TouchEvent).touches?.[0]?.clientY ?? 0;

  const handlePointerDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setIsDown(true);
      hasDragged.current = false;
      startY.current = getClientY(e);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.MouseEvent | globalThis.MouseEvent | TouchEvent) => {
      if (!isDown) return;
      const y = getClientY(e);
      if (Math.abs(y - startY.current) > DRAG_THRESHOLD) hasDragged.current = true;
      /* Drag up (y decreases) = increase progress = next card comes up */
      setProgress((p) =>
        Math.max(0, Math.min(p + (startY.current - y) * SPEED_DRAG, 100))
      );
      startY.current = y;
    },
    [isDown]
  );

  const handleMouseUp = useCallback(() => {
    setIsDown(false);
  }, []);

  useEffect(() => {
    if (!isDown) return;
    const onMove = (e: globalThis.MouseEvent | TouchEvent) =>
      handlePointerMove(e);
    const onUp = () => handleMouseUp();
    window.addEventListener('mousemove', onMove as (e: Event) => void);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove as (e: Event) => void, {
      passive: false,
    });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove as (e: Event) => void);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove as (e: Event) => void);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDown, handlePointerMove, handleMouseUp]);

  const handleCardClick = useCallback((index: number, itemId: number) => {
    if (hasDragged.current) return;
    setProgress((index / (itemCount - 1)) * 100);
    if (index === activeIndex) setSelectedDetailId(itemId);
  }, [itemCount, activeIndex]);

  const selectedItem = selectedDetailId != null ? PROJECT_ITEMS.find((i) => i.id === selectedDetailId) : null;

  useEffect(() => {
    if (selectedDetailId == null) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedDetailId(null);
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [selectedDetailId]);

  /* Holo: pointer tracking (event delegation so it works as soon as items exist) */
  const carouselRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const findCard = (el: EventTarget | null): HTMLElement | null => {
      const node = el as HTMLElement;
      return node?.closest?.('.projects-section .carousel-item') ?? null;
    };

    const onPointerMove = (e: PointerEvent) => {
      const card = findCard(e.target);
      if (!card) return;
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
      carousel.querySelectorAll<HTMLElement>('.carousel-item').forEach((card) => {
        card.style.removeProperty('--ratio-x');
        card.style.removeProperty('--ratio-y');
        card.style.setProperty('--correction', '100%');
      });
    };

    carousel.addEventListener('pointermove', onPointerMove, { passive: true });
    carousel.addEventListener('pointerleave', onPointerLeave);
    return () => {
      carousel.removeEventListener('pointermove', onPointerMove);
      carousel.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <section className="projects-section">
      <div className="projects-section__header">
        <h1 className="projects-section__title">Projects</h1>
        <p className="projects-section__subtitle">
          Selected projects.
        </p>
      </div>
      <div
        ref={carouselRef}
        className="projects-section__carousel carousel"
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
      >
        {PROJECT_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className="carousel-item"
            style={
              {
                '--items': itemCount,
                '--zIndex': zIndexes[index],
                /* Reversed: cards on left have negative --active, move to right */
                '--active': -(index - activeIndex) / itemCount,
              } as React.CSSProperties
            }
            onClick={() => handleCardClick(index, item.id)}
          >
            <div className="carousel-box">
              <div className="carousel-box__holo-bg" aria-hidden="true" />
              <div className="carousel-box__holo-lines" aria-hidden="true" />
              <div className="carousel-box__holo-circles" aria-hidden="true" />
              <div className="carousel-item__title">{item.title}</div>
              <div className="carousel-item__num">{item.num}</div>
              {item.image ? (
                <img src={item.image} alt="" />
              ) : (
                <div className="carousel-item__placeholder" />
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedItem != null && (
        <div
          className="project-detail-overlay"
          onClick={() => setSelectedDetailId(null)}
          role="button"
          tabIndex={0}
          aria-label="Close details"
        >
          <div
            className="project-detail-modal glass-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
          >
            <h2 id="project-detail-title" className="project-detail-modal__title">{selectedItem.title}</h2>
            <p className="project-detail-modal__type">{selectedItem.type}</p>
            <p className="project-detail-modal__period">{selectedItem.period}</p>
            <p className="project-detail-modal__description">{selectedItem.description}</p>
            {selectedItem.highlights && selectedItem.highlights.length > 0 && (
              <ul className="project-detail-modal__highlights">
                {selectedItem.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectsPage;
