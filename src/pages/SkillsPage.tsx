import { useRef } from 'react';
import { getTechIconUrl } from '../utils/techIcons';
import SkillsNetwork from '../components/SkillsNetwork.tsx';
import { ALL_SKILLS } from '../utils/skillsData';

function SkillsPage() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="skills-section">
      <div className="skills-section__header">
        <h1 className="skills-section__title">Skills</h1>
        <p className="skills-section__subtitle">
          Technologies and tools 
        </p>
      </div>
      <div className="skills-section__network-wrap">
        <SkillsNetwork skills={ALL_SKILLS} getIconUrl={getTechIconUrl} />
      </div>
    </section>
  );
}

export default SkillsPage;
