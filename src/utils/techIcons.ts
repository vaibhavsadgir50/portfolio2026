const DEVICON_CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

/** Map tech label (lowercase) to devicon icon name. Uses -original.svg for colored logos. */
export const TECH_ICON_MAP: Record<string, string> = {
  'python': 'python',
  'tensorflow/keras': 'tensorflow',
  'tensorflow': 'tensorflow',
  'pandas': 'pandas',
  'numpy': 'numpy',
  'matplotlib': 'matplotlib',
  'google colab': 'google',
  'java-based gui / networking': 'java',
  'java': 'java',
  'http handling': 'nginx',
  'ui components': 'html5',
  'cnn architectures': 'pytorch',
  'tensorflow/pytorch': 'pytorch',
  'pytorch': 'pytorch',
  'opencv': 'opencv',
  'scikit-learn': 'scikitlearn',
  'matplotlib/seaborn': 'matplotlib',
  'seaborn': 'matplotlib',
  'jupyter': 'jupyter',
  'tesseract ocr': 'python',
  'doctr': 'python',
  'transformers': 'pytorch',
  'json schema mapping': 'javascript',
  'node.js': 'nodejs',
  'nodejs': 'nodejs',
  'typescript': 'typescript',
  'react/next.js': 'nextjs',
  'next.js': 'nextjs',
  'react': 'react',
  'cloud apis': 'amazonwebservices',
  'model orchestration': 'docker',
  'c': 'c',
  'fastapi': 'fastapi',
  'xgboost': 'python',
  'lstm': 'python',
  'websocket': 'nodejs',
  'yolov8': 'python',
  'easyocr': 'python',
  'onnx runtime': 'python',
  'qnn': 'android',
  'express': 'express',
  'tailwind css': 'tailwindcss',
  'tailwind': 'tailwindcss',
  'aws': 'amazonwebservices',
  'docker': 'docker',
  'rest apis': 'javascript',
  'rest api': 'javascript',
  'openapi/swagger': 'swagger',
  'swagger': 'swagger',
  'openapi': 'swagger',
  'sql': 'postgresql',
  'data analytics': 'pandas',
  'api integration': 'javascript',
  'documentation automation': 'javascript',
  'ai model integration': 'python',
  'video processing': 'python',
  'hibernate': 'hibernate',
  'spring boot': 'spring',
  'keras': 'tensorflow',
  'ci/cd': 'github',
  'google cloud platform': 'googlecloud',
  'gcp': 'googlecloud',
  'c++': 'cplusplus',
  'cpp': 'cplusplus',
  'json': 'javascript',
};

export function getTechIconUrl(tech: string): string {
  const key = tech.toLowerCase().trim();
  let name = TECH_ICON_MAP[key];
  if (!name) {
    for (const [mapKey, iconName] of Object.entries(TECH_ICON_MAP)) {
      if (key.includes(mapKey) || mapKey.includes(key)) {
        name = iconName;
        break;
      }
    }
  }
  name = name ?? 'python';
  return `${DEVICON_CDN}/${name}/${name}-original.svg`;
}
