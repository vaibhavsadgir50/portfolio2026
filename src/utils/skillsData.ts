/** Skill groups for the Skills network. Languages & Core includes JSON, SQL (no separate Other group). */
export const GROUPS = [
  {
    name: 'Frontend',
    nodes: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    lineStyle: { width: 2, dash: [] as number[], color: 'rgba(97, 218, 251, 0.35)', round: true },
  },
  {
    name: 'Backend',
    nodes: ['Node.js', 'Express', 'FastAPI', 'WebSocket', 'REST APIs', 'Swagger', 'Hibernate', 'Spring Boot'],
    lineStyle: { width: 1.5, dash: [5, 5], color: 'rgba(0, 229, 255, 0.25)', round: true },
  },
  {
    name: 'DevOps & Cloud',
    nodes: ['AWS', 'Docker', 'CI/CD', 'Google Cloud Platform'],
    lineStyle: { width: 2, dash: [] as number[], color: 'rgba(255, 153, 0, 0.3)', round: true },
  },
  {
    name: 'Languages & Core',
    nodes: ['C++', 'Java', 'C', 'JSON', 'SQL'],
    lineStyle: { width: 1.5, dash: [6, 4], color: 'rgba(255, 255, 255, 0.2)', round: true },
  },
  {
    name: 'Data & ML',
    nodes: [
      'Python', 'Pandas', 'NumPy', 'Scikit-learn',
      'TensorFlow', 'Keras', 'PyTorch', 'OpenCV', 'YOLOv8', 'QNN', 'Tesseract OCR',
      'Google Colab', 'Matplotlib/Seaborn',
    ],
    lineStyle: { width: 2, dash: [4, 4], color: 'rgba(255, 109, 0, 0.3)', round: true },
  },
] as const;

export const GROUP_COLORS: Record<string, string> = {
  Frontend: '#61dafb',
  Backend: '#00e5ff',
  'DevOps & Cloud': '#ff9900',
  'Languages & Core': '#ffffff',
  'Data & ML': '#ff6d00',
};

/** Flat list of all skills from GROUPS (for canvas and display). */
export const ALL_SKILLS = GROUPS.flatMap((g) => g.nodes);
