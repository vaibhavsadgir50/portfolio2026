import { useEffect, useRef } from 'react';

function AwardsPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const updatePointerPosition = (e: PointerEvent) => {
      card.classList.remove('rotate');
      const rect = card.getBoundingClientRect();
      const hw = rect.width / 2;
      const hh = rect.height / 2;
      const ratioX = (e.clientX - (rect.x + hw)) / hw;
      const ratioY = (e.clientY - (rect.y + hh)) / hh;
      card.style.setProperty('--ratio-x', String(ratioX));
      card.style.setProperty('--ratio-y', String(ratioY));
    };

    const onLeave = () => {
      card.style.setProperty('--ratio-x', '0');
      card.style.setProperty('--ratio-y', '0');
      card.style.setProperty('--correction', '30%');
      card.classList.add('rotate');
    };

    card.addEventListener('pointermove', updatePointerPosition);
    card.addEventListener('pointerleave', onLeave);
    return () => {
      card.removeEventListener('pointermove', updatePointerPosition);
      card.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section className="awards-section">
      <div className="awards-section__header">
        <h1 className="awards-section__title">Awards</h1>
        <p className="awards-section__subtitle">Awards and recognition.</p>
      </div>

      <div className="awards-section__holo-wrap">
        <div ref={cardRef} className="card rotate">
          <div className="circles" />
          <div className="holo-bg" />
          <div className="holo-lines" />
          <div className="logo" />
        </div>
      </div>
    </section>
  );
}

export default AwardsPage;
