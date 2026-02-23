import { useEffect, useRef, useState } from 'react';
import {
  HomePage,
  AwardsPage,
  EducationPage,
  WorkExperiencePage,
  ProjectsPage,
  SkillsPage,
  ContactPage,
} from './pages';
import TubesBackground from './components/TubesBackground';

const SECTION_IDS = ['home', 'education', 'work-experience', 'projects', 'skills', 'awards', 'contact'] as const;

function App() {
  const mainRef = useRef<HTMLElement>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const scrollToSection = (index: number) => {
    const main = mainRef.current;
    const el = document.getElementById(SECTION_IDS[index]);
    if (main && el) {
      main.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }
  };

  /* Track active section and progress bar from normal scroll */
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const updateFromScroll = () => {
      const scrollTop = main.scrollTop;
      const viewportMid = scrollTop + main.clientHeight / 2;
      let activeIdx = 0;
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (!el) continue;
        if (viewportMid >= el.offsetTop && viewportMid < el.offsetTop + el.offsetHeight) {
          activeIdx = i;
          break;
        }
        if (viewportMid < el.offsetTop) {
          activeIdx = Math.max(0, i - 1);
          break;
        }
        activeIdx = i;
      }
      setActiveSectionIndex(activeIdx);
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.setAttribute('data-active', i === activeIdx ? 'true' : 'false');
      });
    };

    main.addEventListener('scroll', updateFromScroll, { passive: true });
    const ro = new ResizeObserver(updateFromScroll);
    ro.observe(main);
    updateFromScroll();
    return () => {
      main.removeEventListener('scroll', updateFromScroll);
      ro.disconnect();
    };
  }, []);

  /* Holo card: pointer tracking for .glass-card that have the holo effect (exclude .glass-card--no-holo) */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.glass-card:not(.glass-card--no-holo)');
    const onPointerMove = (e: PointerEvent) => {
      const card = (e.currentTarget as HTMLElement);
      const rect = card.getBoundingClientRect();
      const hw = rect.width / 2;
      const hh = rect.height / 2;
      const ratioX = (e.clientX - (rect.x + hw)) / hw;
      const ratioY = (e.clientY - (rect.y + hh)) / hh;
      card.style.setProperty('--ratio-x', String(ratioX));
      card.style.setProperty('--ratio-y', String(ratioY));
      card.style.setProperty('--correction', '0%');
    };
    const onPointerLeave = (e: PointerEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.setProperty('--ratio-x', '0');
      card.style.setProperty('--ratio-y', '0');
      card.style.setProperty('--correction', '100%');
    };
    cards.forEach((card) => {
      card.addEventListener('pointermove', onPointerMove);
      card.addEventListener('pointerleave', onPointerLeave);
    });
    return () => {
      cards.forEach((card) => {
        card.removeEventListener('pointermove', onPointerMove);
        card.removeEventListener('pointerleave', onPointerLeave);
      });
    };
  }, []);

  return (
    <>
      <TubesBackground />
      <nav className="nav-lever" aria-label="Page navigation">
        <svg className="nav-lever__svg nav-lever__svg--defs" aria-hidden="true">
          <defs>
            <clipPath id="nav-lever-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0 0 L 0 1 L 1 1 Q 0.7 0.5 1 0 L 0 0 Z" />
            </clipPath>
          </defs>
        </svg>
        <div className="nav-lever__glass" style={{ clipPath: 'url(#nav-lever-clip)' }} aria-hidden="true" />
        <svg className="nav-lever__svg" viewBox="0 0 80 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="nav-lever__path"
            d="M 0 0 Q 56 50 0 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>
        <div className="nav-lever__links">
          {SECTION_IDS.map((id, index) => (
            <button
              key={id}
              type="button"
              className={`nav-lever__link${activeSectionIndex === index ? ' nav-lever__link--active' : ''}`}
              onClick={() => scrollToSection(index)}
              aria-current={activeSectionIndex === index ? 'true' : undefined}
            >
              {id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
      </nav>
      <div className="app-layout">
        <main ref={mainRef} className="main-scroll">
          <section id="home" className="scroll-section scroll-section--zoom">
            <HomePage />
          </section>
          <section id="education" className="scroll-section scroll-section--zoom">
            <EducationPage />
          </section>
          <section id="work-experience" className="scroll-section scroll-section--zoom">
            <WorkExperiencePage />
          </section>
          <section id="projects" className="scroll-section scroll-section--zoom">
            <ProjectsPage />
          </section>
          <section id="skills" className="scroll-section scroll-section--zoom">
            <SkillsPage />
          </section>
          <section id="awards" className="scroll-section scroll-section--zoom">
            <AwardsPage />
          </section>
          <section id="contact" className="scroll-section scroll-section--zoom">
            <ContactPage />
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
