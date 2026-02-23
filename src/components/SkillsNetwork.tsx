import { GROUPS, GROUP_COLORS } from '../utils/skillsData';

type Props = {
  skills: string[];
  getIconUrl: (skill: string) => string;
};

/** Skills chain per group (skills-animation style): Java — Python — SQL. Data & ML full width; movement on all. */
export default function SkillsNetwork({ skills, getIconUrl }: Props) {
  return (
    <div className="skills-section__groups">
      {GROUPS.map((group) => {
        const nodes = group.nodes.filter((s) => skills.includes(s));
        const lineColor = group.lineStyle.color;
        return (
          <div
            key={group.name}
            className={`skills-section__group ${group.name === 'Data & ML' ? 'skills-section__group--full-width' : ''}`}
            style={
              {
                '--group-color': GROUP_COLORS[group.name] ?? '#888',
                '--line-color': lineColor,
              } as React.CSSProperties
            }
          >
            <div className="skills-section__group-title">{group.name}</div>
            <div className="skills-section__chain" role="list">
              {nodes.map((skill, i) => (
                <span key={skill} className="skills-section__chain-inner">
                  {i > 0 && <span className="skills-section__connector" aria-hidden="true" />}
                  <span className="skills-section__node" role="listitem">
                    <span className="skills-section__node-circle">
                      <img src={getIconUrl(skill)} alt="" className="skills-section__node-icon" />
                    </span>
                    <span className="skills-section__node-label">{skill}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
