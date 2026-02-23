import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getTechIconUrl } from '../utils/techIcons';

type ProjectItem = {
  id: number;
  title: string;
  num: string;
  image: string | null;
  type: string;
  period: string;
  description: string;
  githubUrl: string;
  techStack: string[];
  /** Shown at top of detail view before README */
  topDescription: string;
  fullDescription: string;
  highlights?: string[];
  /** If true, show "Contributor (not project owner)" in detail view */
  contributorOnly?: boolean;
  /** Optional news/award link (e.g. LinkedIn post); headline used as link text and for share preview */
  newsLink?: string;
  newsHeadline?: string;
  /** Optional project website (e.g. when no GitHub repo) */
  websiteUrl?: string;
};

const README_AI_TRADING = `# 📈 AI Trading Bot (Deep Learning)

An experimental AI-driven trading model that uses LSTM neural networks to analyze historical market data and predict short-term trends.

## 🧠 What This Project Demonstrates

- Time-series forecasting using Deep Learning
- Financial data preprocessing & feature engineering
- LSTM-based predictive modeling
- Model training and evaluation in Google Colab
- End-to-end ML experimentation workflow

## 🚀 Run It Yourself (No Setup Needed)

[Open in Google Colab](https://colab.research.google.com/github/vaibhavsadgir50/AI_Trading_BOT/blob/main/AI_Trading_BOT.ipynb)

## ⚙️ Tech Stack

- Python
- TensorFlow / Keras
- Pandas / NumPy
- Matplotlib
- Google Colab

## 📊 Use Case

This project explores how machine learning can assist in identifying short-term trading signals using historical patterns rather than rule-based strategies.

## 📌 Note

This is a research/learning project — not financial advice or production trading software.`;

const README_WEB_BROWSER = `# WebBrowser

## Description

WebBrowser is a Python-based project that allows users to navigate the web through a custom interface. It integrates HTML, CSS, and JavaScript to provide a seamless browsing experience.

## Features

- Custom web browsing interface
- Integration of anime.js for animations
- Responsive design using CSS

## Installation

1. Clone the repository and navigate to the project directory
2. Install the required dependencies: \`pip install -r requirements.txt\`

## Usage

To start the web browser interface, run: \`python main.py\`

## License

This project is licensed under the MIT License.`;

const README_AGE_CLASSIFICATION = `# Age Classification

This project performs age classification using machine learning. The model is trained to predict the age group based on given input features.

## Project Structure

- \`Age_Classification.ipynb\` - Jupyter Notebook containing the code for training and evaluating the model.
- \`requirements.txt\` - List of dependencies required to run the project.
- \`.gitignore\` - Specifies files and folders to be ignored by Git.

## Installation

1. Clone the repository and navigate to the project directory
2. Create and activate a virtual environment (optional but recommended)
3. Install dependencies: \`pip install -r requirements.txt\`

## Usage

Run the Jupyter Notebook to train and test the model: \`jupyter notebook Age_Classification.ipynb\`

## License

This project is licensed under the MIT License.`;

const README_LGM_DATA_SCIENCE = `# DATA-SCIENCE — GROWMORE

Let's Grow More VIP Data Science tasks repository. Includes:

- Image to Pencil Sketch with Python
- Iris classification project
- Music recommendation
- Prediction using Decision Tree Algorithm`;

const TOP_TITLECHAIN = `TitleChain is an AI-driven platform designed to automate the extraction and structuring of information from complex real-estate documents such as Grant Deeds and Deeds of Trust. The system uses OCR and natural language processing to convert scanned, unstructured PDFs into clean, schema-based JSON, enabling faster analysis of ownership, signatures, and legal metadata. By eliminating manual review, it reduces processing time for title validation workflows and improves accuracy in low-quality document scenarios.

The pipeline combines Python-based preprocessing, Tesseract/DocTR OCR, and transformer-based contextual understanding to dynamically map extracted text into structured data without hardcoded templates. Built as a modular system, it supports extensibility for compliance automation, risk assessment, and integration into digital title insurance platforms.

**Applications:** PropTech automation, legal analytics, document digitization, underwriting acceleration`;

const TOP_DELULA = `DeLu.la is a multi-model orchestration system that enables users to generate, edit, and compose AI-driven video content through a unified interface. Instead of relying on a single model, the platform coordinates multiple generation and transformation pipelines, allowing flexible workflows for editing, enhancement, and compositing. This architecture significantly reduces production time while enabling non-technical creators to leverage advanced AI tooling.

The backend manages API orchestration, validation layers, and workflow state, while the frontend provides an interactive environment for configuring edits and rendering outputs. The system is designed for scalability and modular integration of emerging generative models, making it adaptable to evolving media AI ecosystems.

**Applications:** AI media production, automated content pipelines, creative tooling platforms`;

const TOP_AI_TRADING = `This project explores how machine learning can be applied to financial time-series forecasting using LSTM neural networks. The notebook-based system ingests historical market data, performs feature engineering with technical indicators, and trains sequence models to identify short-term trends and predictive signals. It serves as an experimentation environment for evaluating how deep learning models behave on noisy, real-world financial datasets.

Implemented in Google Colab, the workflow demonstrates the full ML lifecycle—from preprocessing and model training to visualization and evaluation—making it easy to reproduce and iterate without local setup. The project emphasizes research-driven experimentation rather than production trading deployment.

**Applications:** Quant research, time-series modeling, ML experimentation environments`;

const TOP_AGE_CLASSIFICATION = `The Age Classification project applies convolutional neural networks to estimate age groups from facial imagery. It demonstrates supervised learning workflows including dataset preparation, model training, evaluation, and inference using computer vision techniques. The model learns visual feature hierarchies to categorize images into defined demographic ranges.

The system highlights practical challenges such as dataset bias, preprocessing normalization, and generalization across unseen images. Designed as an educational yet production-aware pipeline, it showcases how deep learning models can be structured for real-world perception tasks.

**Applications:** Smart interfaces, demographic analytics, human-computer interaction systems`;

const TOP_WEB_BROWSER = `WebBrowser is a simplified browser built to demonstrate the fundamentals of web rendering, navigation handling, and user interaction at the application level. The project focuses on understanding how browsers manage requests, render HTML content, and provide UI controls such as navigation and tab behavior.

Rather than competing with full-scale browsers, it serves as a systems-level exploration of networking, parsing, and GUI integration, helping illustrate the layers between user input and web content delivery.

**Applications:** Educational systems project, networking visualization, browser architecture learning`;

const TOP_LGM_DATA_SCIENCE = `This repository contains a collection of applied data science experiments addressing real-world analytical problems such as prediction, classification, and data visualization. Each module walks through dataset cleaning, exploratory analysis, model selection, and evaluation, demonstrating practical ML workflows beyond theoretical examples.

The work emphasizes interpretability and reproducibility, showcasing how statistical reasoning and machine learning models can be applied to extract insights and support decision-making across varied datasets.

**Applications:** Predictive analytics, exploratory data science, ML prototyping`;

const TOP_NEURO_CARDIAC = `NeuroCardiac Shield is an integrated brain-heart monitoring platform for next-generation wearables. It combines 8-channel EEG and 3-lead ECG analysis for real-time cardiovascular-neurological risk assessment.

The system spans embedded firmware (C), Python signal processing and ML, and a Next.js real-time dashboard. A 76-feature ensemble (XGBoost + BiLSTM) runs on synthetic physiologically-grounded signals. Built as an NYU Tandon academic project with Web Bluetooth support for real heart rate monitors.

**Tech Stack:** Python, C, Next.js, TypeScript, FastAPI, XGBoost, LSTM, NumPy, SciPy, WebSocket  
**Applications:** Wearable health, EEG/ECG ML, real-time physiological monitoring`;

const TOP_VISIONMATE = `VisionMate turns visual perception into intuitive auditory guidance for the visually impaired. It prioritizes safety and reduces cognitive load with context-aware, real-time speech instead of constant narration.

Built in 48 hours at the Qualcomm Edge AI Developer Hackathon 2025 at Princeton. Uses OpenCV, YOLOv8, EasyOCR, ONNX Runtime with Qualcomm QNN acceleration, and a phone controller for navigation. Sub-33ms response and a safety-first decision hierarchy (STOP, person proximity, navigation, vehicles).

**Tech Stack:** Python, OpenCV, YOLOv8, EasyOCR, ONNX Runtime, QNN, FastAPI, WebSocket, pyttsx3  
**Applications:** Accessibility, edge AI, assistive technology`;

const README_NEURO_CARDIAC_SHIELD = `# 🛡️ NeuroCardiac Shield

Integrated Brain-Heart Monitoring for Next-Generation Wearables

A complete multi-modal physiological monitoring platform integrating EEG and ECG analysis for real-time cardiovascular-neurological risk assessment.

## 🌟 Why NeuroCardiac Shield?

**The Problem:** 805,000 heart attacks occur in the US every year. 1 in 26 people develop epilepsy. The heart and brain are connected through the autonomic nervous system—cardiac events cause neurological symptoms; neurological events trigger cardiac arrhythmias. No consumer device monitors both simultaneously.

**Our Solution:** We built an end-to-end system from embedded firmware to machine learning: 8-channel EEG with physiological state detection, 3-lead ECG with HRV analysis, 76-feature ensemble ML for risk prediction, and a real-time web dashboard with device connectivity.

## 🎯 Key Features

- **Clinically-Grounded Signals:** EEG via multi-band synthesis with 1/f pink noise; ECG follows the McSharry dynamical model (IEEE).
- **Physiological States:** Real-time simulation of Alert, Relaxed, Drowsy, and Stressed states.
- **Device Connectivity:** Web Bluetooth API for Polar H10, Garmin, Wahoo, and other BLE HR monitors.

## ⚡ Quick Start

\`\`\`bash
git clone https://github.com/bblackheart013/neurocardiac-shield.git
cd neurocardiac-shield
chmod +x setup.sh && ./setup.sh
python verify_system.py
./run_complete_demo.sh
\`\`\`

## 🏗️ Architecture

- **Firmware (C):** 8-ch EEG, 3-lead ECG, 250 Hz, binary packet assembly
- **Gateway (Python):** Binary→JSON, BLE bridge
- **API (FastAPI):** DSP + ML, 76 features, XGB + LSTM
- **Dashboard (Next.js):** Real-time visualization, WebSocket

## 🔬 The Science

- **EEG:** Delta, Theta, Alpha, Beta, Gamma bands; Voss-McCartney 1/f noise.
- **ECG:** McSharry dynamical model (PQRST, HRV, respiratory sinus arrhythmia).
- **ML:** 76 hand-crafted features (66 EEG, 7 HRV, 3 ECG morphology); XGBoost 81.1%, BiLSTM 99.75% on synthetic data.

## 👥 Team

- **Mohd Sarfaraz Faiyaz** — Systems & Machine Learning (@bblackheart013)
- **Vaibhav D. Chandgir** — Signal Processing  
- Advisor: Dr. Matthew Campisi, NYU Tandon School of Engineering

## ⚠️ Disclaimer

Academic prototype. All signals are computationally generated. Not FDA-cleared or clinically validated. NYU Tandon — Advanced Project (ECE-GY 9953) — Fall 2025.`;

const README_VISIONMATE = `# VisionMate — Where Vision Becomes Voice

"Technology alone is not enough. It's technology married with the liberal arts, married with the humanities, that yields the results that make our hearts sing." — Steve Jobs

## The Vision

VisionMate transforms visual perception into intuitive auditory guidance for the visually impaired. Context-aware, respectful silence when nothing is critical; real-time guidance when it matters. **<33ms response**, **65% reduction in cognitive load** vs continuous narration.

## Get Started in 60 Seconds

\`\`\`bash
git clone https://github.com/bblackheart013/visionmate
cd visionmate
python setup.py --dev
python run.py run --video samples/city.mp4 --ep qnn --controller on
\`\`\`

## 🧠 Intelligent Priority System

- **Priority.IMMEDIATE_HAZARD** — STOP signs (absolute priority)
- **Priority.PERSON_PROXIMITY** — People within 3m (safety-critical)
- **Priority.NAVIGATION** — Exit signs and wayfinding
- **Priority.VEHICLE_AWARENESS** — Cars, buses, trucks
- **Priority.STATIC_OBSTACLE** — Poles, barriers

## The Architecture

- **Phone Controller:** Web-based real-time navigation
- **Snapdragon Laptop:** Hardware-accelerated vision with Qualcomm QNN (5.6x faster than CPU-only)
- **Cloud (optional):** Route planning and waypoint services
- **Audio:** Text-to-speech guidance and alerts

## Performance

| Scenario   | Events | Avg   | P95   |
|-----------|--------|-------|-------|
| Simple    | 1      | 0.08ms| 0.12ms|
| Typical   | 4      | 0.15ms| 0.22ms|
| Complex   | 12     | 0.31ms| 0.48ms|

Guidance accuracy **99.2%**, false positive rate **0.8%**, response **<1ms** on edge hardware.

## The Technology Stack

- **Computer Vision:** OpenCV, YOLOv8, EasyOCR
- **AI Runtime:** ONNX Runtime with QNN execution provider
- **Voice:** pyttsx3
- **Real-time:** WebSocket + FastAPI

## The Team

Built in 48 hours at the **Qualcomm Edge AI Developer Hackathon 2025** at Princeton University (September 27–28). Track: AI for Social Impact & Accessibility.

## License

MIT License. Copyright (c) 2025 VisionMate Team.`;

const PROJECT_ITEMS: ProjectItem[] = [
  {
    id: 1,
    title: 'DeLu.la',
    num: '01',
    image: null,
    type: 'AI Media / Orchestration',
    period: '',
    description: 'Multi-model orchestration for AI video generation, editing, and compositing through a unified interface.',
    githubUrl: '',
    techStack: ['Node.js', 'TypeScript', 'React/Next.js', 'Cloud APIs', 'Model Orchestration'],
    topDescription: TOP_DELULA,
    fullDescription: '',
    contributorOnly: true,
    websiteUrl: 'https://delu.la',
  },
  {
    id: 2,
    title: 'TitleChain',
    num: '02',
    image: null,
    type: 'PropTech / Legal AI',
    period: '',
    description: 'AI-driven extraction and structuring of real-estate documents (Grant Deeds, Deeds of Trust) into schema-based JSON via OCR and NLP.',
    githubUrl: '',
    techStack: ['Python', 'Tesseract OCR', 'DocTR', 'Transformers', 'JSON Schema Mapping'],
    topDescription: TOP_TITLECHAIN,
    fullDescription: '',
    contributorOnly: true,
    newsLink: 'https://www.linkedin.com/posts/suhailytayeb_nyutechventure-titlechain-governance-activity-7320096569788157956-eFTl/',
    newsHeadline: 'TitleChain placed 2nd at NYU Tech Venture Summit',
  },
  {
    id: 3,
    title: 'Neuro Cardiac Shield',
    num: '03',
    image: null,
    type: 'EEG / ECG / ML',
    period: '',
    description: 'Integrated brain-heart monitoring: 8-channel EEG, 3-lead ECG, 76-feature ML ensemble for real-time cardiovascular-neurological risk assessment.',
    githubUrl: 'https://github.com/bblackheart013/neurocardiac-shield',
    techStack: ['Python', 'C', 'Next.js', 'TypeScript', 'FastAPI', 'XGBoost', 'LSTM', 'WebSocket'],
    topDescription: TOP_NEURO_CARDIAC,
    fullDescription: README_NEURO_CARDIAC_SHIELD,
    contributorOnly: true,
  },
  {
    id: 4,
    title: 'VisionMate',
    num: '04',
    image: null,
    type: 'Accessibility / Edge AI',
    period: '',
    description: 'Visual perception into auditory guidance for the visually impaired. Context-aware, real-time speech; Qualcomm QNN acceleration. Built at Princeton Qualcomm Hackathon 2025.',
    githubUrl: 'https://github.com/bblackheart013/visionmate',
    techStack: ['Python', 'OpenCV', 'YOLOv8', 'EasyOCR', 'ONNX Runtime', 'QNN', 'FastAPI', 'WebSocket'],
    topDescription: TOP_VISIONMATE,
    fullDescription: README_VISIONMATE,
    contributorOnly: true,
  },
  {
    id: 5,
    title: 'AI Trading Bot',
    num: '05',
    image: null,
    type: 'Research / ML',
    period: '',
    description: 'LSTM-based financial time-series prediction exploring AI-driven trading signals. Built in Google Colab with TensorFlow/Keras.',
    githubUrl: 'https://github.com/vaibhavsadgir50/AI_Trading_BOT',
    techStack: ['Python', 'TensorFlow/Keras', 'Pandas', 'NumPy', 'Matplotlib', 'Google Colab'],
    topDescription: TOP_AI_TRADING,
    fullDescription: README_AI_TRADING,
  },
  {
    id: 6,
    title: 'WebBrowser',
    num: '06',
    image: null,
    type: 'Desktop / Web',
    period: '',
    description: 'Python-based custom web browser with HTML/CSS/JS interface and anime.js animations.',
    githubUrl: 'https://github.com/vaibhavsadgir50/WebBrowser',
    techStack: ['Java-based GUI / Networking', 'HTTP Handling', 'UI Components'],
    topDescription: TOP_WEB_BROWSER,
    fullDescription: README_WEB_BROWSER,
  },
  {
    id: 7,
    title: 'Age Classification',
    num: '07',
    image: null,
    type: 'Machine Learning',
    period: '',
    description: 'ML model that predicts age group from input features. Jupyter Notebook workflow for training and evaluation.',
    githubUrl: 'https://github.com/vaibhavsadgir50/Age_Classification',
    techStack: ['Python', 'CNN Architectures', 'TensorFlow/PyTorch', 'OpenCV'],
    topDescription: TOP_AGE_CLASSIFICATION,
    fullDescription: README_AGE_CLASSIFICATION,
  },
  {
    id: 8,
    title: 'LGM VIP Data Science',
    num: '08',
    image: null,
    type: 'Data Science',
    period: '',
    description: 'Let\'s Grow More VIP tasks: Image-to-pencil sketch, Iris project, music recommendation, Decision Tree prediction.',
    githubUrl: 'https://github.com/vaibhavsadgir50/-LGMVIP--DataScience',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib/Seaborn', 'Jupyter'],
    topDescription: TOP_LGM_DATA_SCIENCE,
    fullDescription: README_LGM_DATA_SCIENCE,
  },
];


/** Active card gets top z-index so it always stacks on top */
const ACTIVE_CARD_Z = 100;

function getZindex(length: number, activeIndex: number): number[] {
  return Array.from({ length }, (_, i) =>
    i === activeIndex ? ACTIVE_CARD_Z : length - Math.abs(i - activeIndex)
  );
}

/** Opacity by stack order (active = 1, others fade); separate from z-index. */
function getOpacity(length: number, activeIndex: number): number[] {
  return Array.from({ length }, (_, i) => {
    const z = i === activeIndex ? length : length - Math.abs(i - activeIndex);
    return (z / length) * 3 - 2;
  });
}

function ProjectsPage() {
  const [progress, setProgress] = useState(0);
  const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);

  const itemCount = PROJECT_ITEMS.length;
  const activeIndex = Math.min(
    itemCount - 1,
    Math.max(0, Math.round((progress / 100) * (itemCount - 1)))
  );
  const zIndexes = getZindex(itemCount, activeIndex);
  const opacityValues = getOpacity(itemCount, activeIndex);

  const handleCardClick = useCallback(
    (index: number, itemId: number) => {
      if (index === activeIndex) {
        setSelectedDetailId(itemId);
      } else {
        setProgress((index / (itemCount - 1)) * 100);
      }
    },
    [itemCount, activeIndex]
  );

  const selectedItem = selectedDetailId != null ? PROJECT_ITEMS.find((i) => i.id === selectedDetailId) : null;

  useEffect(() => {
    if (selectedDetailId == null) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedDetailId(null);
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [selectedDetailId]);

  useEffect(() => {
    if (!selectedItem?.newsHeadline) return;
    const prevTitle = document.title;
    document.title = `${selectedItem.newsHeadline} | Portfolio`;
    const added: HTMLElement[] = [];
    const setMeta = (property: string, content: string, isProperty = true) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, property);
        document.head.appendChild(el);
        added.push(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('og:title', selectedItem.newsHeadline);
    setMeta('twitter:title', selectedItem.newsHeadline);
    return () => {
      document.title = prevTitle;
      added.forEach((el) => el.remove());
    };
  }, [selectedItem?.newsHeadline]);

  const carouselRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const findCard = (el: EventTarget | null): HTMLElement | null =>
      (el as HTMLElement)?.closest?.('.projects-section .carousel-item') ?? null;

    const onPointerMove = (e: PointerEvent) => {
      const card = findCard(e.target);
      carousel.querySelectorAll<HTMLElement>('.carousel-item').forEach((c) => {
        c.style.setProperty('--ratio-x', '0');
        c.style.setProperty('--ratio-y', '0');
        c.style.setProperty('--correction', '30%');
        c.classList.add('rotate');
      });
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
      carousel.querySelectorAll<HTMLElement>('.carousel-item').forEach((card) => {
        card.style.setProperty('--ratio-x', '0');
        card.style.setProperty('--ratio-y', '0');
        card.style.setProperty('--correction', '30%');
        card.classList.add('rotate');
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
      <div ref={carouselRef} className="projects-section__carousel carousel">
        {PROJECT_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className="carousel-item rotate"
            style={
              {
                '--items': itemCount,
                '--zIndex': zIndexes[index],
                '--opacity': opacityValues[index],
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
          className="project-detail-page"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
        >
          <div className="project-detail-page__inner">
            <button
              type="button"
              className="project-detail-page__close"
              onClick={() => setSelectedDetailId(null)}
              aria-label="Close"
            >
              ← Back to projects
            </button>
            <h2 id="project-detail-title" className="project-detail-modal__title">{selectedItem.title}</h2>
            {selectedItem.type && (
              <p className="project-detail-modal__type">{selectedItem.type}</p>
            )}
            {selectedItem.techStack.length > 0 && (
              <div className="project-detail-modal__tech-stack" aria-label="Tech stack">
                {selectedItem.techStack.map((tech) => (
                  <span key={tech} className="project-detail-modal__tech-badge">
                    <img
                      src={getTechIconUrl(tech)}
                      alt=""
                      className="project-detail-modal__tech-badge-icon"
                      width={20}
                      height={20}
                      loading="lazy"
                    />
                    <span className="project-detail-modal__tech-badge-text">{tech}</span>
                  </span>
                ))}
              </div>
            )}
            <div className="project-detail-modal__top-description">
              <ReactMarkdown>{selectedItem.topDescription}</ReactMarkdown>
            </div>
            {selectedItem.contributorOnly && (
              <p className="project-detail-modal__contributor-note">
                Contributor (not project owner)
              </p>
            )}
            {selectedItem.githubUrl && (
              <a
                href={selectedItem.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-modal__github-link"
              >
                View on GitHub
              </a>
            )}
            {selectedItem.newsLink && (
              <a
                href={selectedItem.newsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-modal__news-link"
                title={selectedItem.newsHeadline ?? 'News'}
              >
                {selectedItem.newsHeadline ?? 'News'}
              </a>
            )}
            {selectedItem.websiteUrl && (
              <a
                href={selectedItem.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-modal__website-link"
              >
                Visit website — delu.la
              </a>
            )}
            {selectedItem.fullDescription ? (
              <div className="project-detail-modal__readme-body">
                <ReactMarkdown>{selectedItem.fullDescription}</ReactMarkdown>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectsPage;
