import { useRef, useLayoutEffect, useState, useCallback } from 'react';

const baseUrl = import.meta.env.BASE_URL;
const EDUCATION_ITEMS = [
  {
    id: 'siem',
    name: 'SIEM, Nashik, India',
    logo: `${baseUrl}images/siem2.png`,
    subtitle: 'Bachelors in Computer Engineering',
    dateRange: 'Aug 2019 - May 2023',
    description:
      "Sandip Foundation's Institute of Engineering & Management. Bachelor's degree in Computer Engineering.",
  },
  {
    id: 'nyu',
    name: 'New York University',
    subtitle: 'Masters in computer engineering',
    dateRange: 'Aug 2024 - May 2026',
    logo: `${baseUrl}images/nyu_plain.png`,
    description:
      'Graduate program in Computer Engineering at NYU. Master of Science.',
  },
];

const FLIP_DURATION_MS = 500;

function EducationPage() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [flippingCardId, setFlippingCardId] = useState<string | null>(null);
  const [flipDirection, setFlipDirection] = useState<'to-back' | 'to-front'>('to-back');
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCardClick = useCallback(
    (itemId: string) => {
      if (flippingCardId !== null) return;
      const goingToBack = expandedId !== itemId;
      setFlipDirection(goingToBack ? 'to-back' : 'to-front');
      setFlippingCardId(itemId);
      flipTimeoutRef.current = setTimeout(() => {
        setExpandedId(goingToBack ? itemId : null);
        setFlippingCardId(null);
        flipTimeoutRef.current = null;
      }, FLIP_DURATION_MS);
    },
    [expandedId, flippingCardId]
  );

  useLayoutEffect(() => {
    return () => {
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    };
  }, []);

  useLayoutEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

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

      <div ref={cardsRef} className="education-section__cards">
        {EDUCATION_ITEMS.map((item) => {
          const isFlipping = flippingCardId === item.id;
          const flipClass =
            isFlipping && flipDirection === 'to-back'
              ? 'card--flip-to-back'
              : isFlipping && flipDirection === 'to-front'
                ? 'card--flip-to-front'
                : '';
          return (
            <div
              key={item.id}
              className={`card rotate ${flipClass}`.trim()}
              data-education-id={item.id}
              onClick={() => handleCardClick(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(item.id);
                }
              }}
              aria-expanded={expandedId === item.id}
              aria-label={`${item.name}, click to ${expandedId === item.id ? 'flip back' : 'view'} description`}
            >
              <div
                className="card-inner"
                style={{
                  transform: flippingCardId !== item.id ? `rotateY(${expandedId === item.id ? 180 : 0}deg)` : undefined,
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
                      {item.description ?? 'No description available.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default EducationPage;
