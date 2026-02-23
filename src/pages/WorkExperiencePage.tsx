import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';

const IMAGES_BASE = `${import.meta.env.BASE_URL}images`;

type WorkItem = {
  id: number;
  title: string;
  num: string;
  image: string | null;
  company: string;
  location?: string;
  period: string;
  description: string;
  highlights?: string[];
};

const WORK_ITEMS: WorkItem[] = [
  {
    id: 1,
    title: 'Research Developer Intern',
    num: '01',
    image: `${IMAGES_BASE}/Scrypted-logo.png`,
    company: 'Scrypted Inc',
    location: 'Remote',
    period: 'Jun 2025 – Dec 2025',
    description:
      'Tech: TypeScript, Node.js, Express, React, Next.js, Tailwind CSS, AWS, Docker, REST APIs, AI Model Integration, Video Processing Pipelines.',
    highlights: [
      'Architected and deployed an AI-powered video generation platform processing 1,000+ jobs/day by building an asynchronous orchestration service (Node.js, Express, TypeScript) to coordinate model execution and post-processing pipelines.',
      'Integrated multiple multimodal models (Veo, Flux, Kling) into a unified inference workflow, implementing prompt validation, retry logic, and batching to reduce failed jobs by 40% and cut P95 render time by 50%.',
      'Designed configurable AI workflow tooling that allowed non-engineers to compose model chains (text → image → video → edit), accelerating experimentation and reducing feature launch cycles from days to hours.',
      'Built a browser-based video editor using React, Next.js, and Tailwind with support for AI-generated assets, timeline composition, and reusable templates that reduced manual editing time by 60%.',
      'Contributed to CRPC decentralized coordination protocol, implementing commit-reveal-validation flows and backend services supporting multi-agent execution across Web2/Web3 infrastructure.',
    ],
  },
  {
    id: 2,
    title: 'Software Engineering Intern (Technology Integration)',
    num: '02',
    image: `${IMAGES_BASE}/Bankbazaar-logo.png`,
    company: 'BankBazaar.com',
    location: 'Mumbai, India',
    period: 'May 2024 – Aug 2024',
    description:
      'Tech: REST APIs, OpenAPI/Swagger, SQL, Data Analytics, API Integration, Documentation Automation.',
    highlights: [
      'Revamped API documentation using OpenAPI/Swagger, improving developer onboarding efficiency and reducing integration errors.',
      'Built internal analytics workflows to monitor feature adoption and performance metrics, supporting product decision-making with data-driven insights.',
    ],
  },
  {
    id: 3,
    title: 'Data Science Intern',
    num: '03',
    image: `${IMAGES_BASE}/Letsgrowmore-logo.webp`,
    company: "Let's Grow More LLC",
    location: 'Remote',
    period: '',
    description: '',
    highlights: [],
  },
];

const SPEED_DRAG = -0.1;

function getZindex(length: number, activeIndex: number): number[] {
  return Array.from({ length }, (_, i) =>
    i === activeIndex ? length : length - Math.abs(i - activeIndex)
  );
}

const DRAG_THRESHOLD = 8;

type CardRect = { left: number; top: number; width: number; height: number };

function WorkExperiencePage() {
  const [progress, setProgress] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
  const [openingCardRect, setOpeningCardRect] = useState<CardRect | null>(null);
  const [isModalGrown, setIsModalGrown] = useState(false);
  const startX = useRef(0);
  const hasDragged = useRef(false);

  const itemCount = WORK_ITEMS.length;
  const activeIndex = Math.min(
    Math.floor((progress / 100) * (itemCount - 1)),
    itemCount - 1
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
      setProgress((p) =>
        Math.max(0, Math.min(p + (x - startX.current) * SPEED_DRAG, 100))
      );
      startX.current = x;
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

  const handleCardClick = useCallback(
    (index: number, itemId: number, e: React.MouseEvent) => {
      if (hasDragged.current) return;
      setProgress((index / (itemCount - 1)) * 100);
      if (index === activeIndex) {
        const cardEl = (e.currentTarget as HTMLElement).closest('.carousel-item') as HTMLElement | null;
        const rect = cardEl?.getBoundingClientRect();
        if (rect) {
          setOpeningCardRect({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
          setIsModalGrown(false);
        } else {
          setOpeningCardRect(null);
          setIsModalGrown(true);
        }
        setSelectedDetailId(itemId);
      }
    },
    [itemCount, activeIndex]
  );

  useEffect(() => {
    if (selectedDetailId == null) return;
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsModalGrown(true));
    });
    return () => cancelAnimationFrame(t);
  }, [selectedDetailId]);

  const selectedItem = selectedDetailId != null ? WORK_ITEMS.find((i) => i.id === selectedDetailId) : null;

  useEffect(() => {
    if (selectedDetailId == null) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedDetailId(null);
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [selectedDetailId]);

  /* Holo: pointer tracking (event delegation, same as Projects) */
  const carouselRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (selectedDetailId == null) return;
    const modal = modalRef.current;
    if (!modal) return;

    const onPointerMove = (e: PointerEvent) => {
      const rect = modal.getBoundingClientRect();
      const hw = rect.width / 2;
      const hh = rect.height / 2;
      const ratioX = (e.clientX - (rect.x + hw)) / hw;
      const ratioY = (e.clientY - (rect.y + hh)) / hh;
      modal.style.setProperty('--ratio-x', String(ratioX));
      modal.style.setProperty('--ratio-y', String(ratioY));
      modal.style.setProperty('--correction', '0%');
      modal.classList.remove('work-experience-detail-modal--rotate');
    };

    const onPointerLeave = () => {
      modal.style.removeProperty('--ratio-x');
      modal.style.removeProperty('--ratio-y');
      modal.style.setProperty('--correction', '100%');
      modal.classList.add('work-experience-detail-modal--rotate');
    };

    modal.addEventListener('pointermove', onPointerMove, { passive: true });
    modal.addEventListener('pointerleave', onPointerLeave);
    return () => {
      modal.removeEventListener('pointermove', onPointerMove);
      modal.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [selectedDetailId]);

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const findCard = (el: EventTarget | null): HTMLElement | null =>
      (el as HTMLElement)?.closest?.('.work-experience-section .carousel-item') ?? null;

    const resetAllCards = () => {
      carousel.querySelectorAll<HTMLElement>('.carousel-item').forEach((card) => {
        card.style.removeProperty('--ratio-x');
        card.style.removeProperty('--ratio-y');
        card.style.setProperty('--correction', '100%');
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      const card = findCard(e.target);
      resetAllCards();
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
      resetAllCards();
    };

    carousel.addEventListener('pointermove', onPointerMove, { passive: true });
    carousel.addEventListener('pointerleave', onPointerLeave);
    return () => {
      carousel.removeEventListener('pointermove', onPointerMove);
      carousel.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <section className="work-experience-section">
      <div className="work-experience-section__header">
        <h1 className="work-experience-section__title">Work Experience</h1>
        <p className="work-experience-section__subtitle">
          Professional experience.
        </p>
      </div>
      <div
        ref={carouselRef}
        className="work-experience-section__carousel carousel"
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
      >
        {WORK_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className="carousel-item"
            style={
              {
                '--items': itemCount,
                '--zIndex': zIndexes[index],
                '--active': (index - activeIndex) / itemCount,
              } as React.CSSProperties
            }
            onClick={(e) => handleCardClick(index, item.id, e)}
          >
            <div className="carousel-box">
              <div className="carousel-box__holo-bg" aria-hidden="true" />
              <div className="carousel-box__holo-lines" aria-hidden="true" />
              <div className="carousel-box__holo-circles" aria-hidden="true" />
              {item.image && (
                <div className="carousel-item__logo">
                  <img src={item.image} alt="" />
                </div>
              )}
              <div className="carousel-item__subtitle">{item.title}</div>
              <div className="carousel-item__company">{item.company}</div>
              <div className="carousel-item__num">{item.num}</div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem != null && (
        <div
          className="work-experience-detail-overlay"
          onClick={() => {
            setSelectedDetailId(null);
            setOpeningCardRect(null);
            setIsModalGrown(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSelectedDetailId(null);
              setOpeningCardRect(null);
              setIsModalGrown(false);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close details"
        >
          <div
            ref={modalRef}
            className={`work-experience-detail-modal work-experience-detail-modal--rotate${isModalGrown ? ' work-experience-detail-modal--grown' : ''}`}
            style={
              openingCardRect && !isModalGrown
                ? {
                    position: 'fixed',
                    left: openingCardRect.left,
                    top: openingCardRect.top,
                    width: openingCardRect.width,
                    height: openingCardRect.height,
                  }
                : undefined
            }
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSelectedDetailId(null);
                setOpeningCardRect(null);
                setIsModalGrown(false);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-detail-title"
          >
            <div className="work-experience-detail-modal__holo-bg" aria-hidden="true" />
            <div className="work-experience-detail-modal__holo-lines" aria-hidden="true" />
            <div className="work-experience-detail-modal__holo-circles" aria-hidden="true" />
            <div className="work-experience-detail-modal__content">
              <h2 id="work-detail-title" className="work-experience-detail-modal__title">{selectedItem.title}</h2>
              <p className="work-experience-detail-modal__company">{selectedItem.company}</p>
              {selectedItem.location && (
                <p className="work-experience-detail-modal__location">{selectedItem.location}</p>
              )}
              {selectedItem.period && (
                <p className="work-experience-detail-modal__period">{selectedItem.period}</p>
              )}
              {selectedItem.description && (
                <p className="work-experience-detail-modal__description">{selectedItem.description}</p>
              )}
              {selectedItem.highlights && selectedItem.highlights.length > 0 && (
                <ul className="work-experience-detail-modal__highlights">
                  {selectedItem.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default WorkExperiencePage;
