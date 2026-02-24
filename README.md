<!-- ======================================== -->
<!--              PORTFOLIO 2026              -->
<!-- ======================================== -->

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0ea5e9,100:7c3aed&height=220&section=header&text=Vaibhav%20Chandgir%20Portfolio&fontSize=40&fontAlignY=38&animation=fadeIn" />
</p>

<p align="center">
  <b>Modern Developer Portfolio • AI Systems • Full-Stack Engineering • NYU Tandon</b>
</p>

<p align="center">
  🔗 <a href="https://vaibhavsadgir50.github.io/portfolio2026/">Live Website</a>
</p>

---

## 📸 Preview


<p align="center">
  <img src="/public/images/portfolio-home-screenshot.png" alt="Portfolio Screenshot"/>
</p>

---

## ✨ Overview

This project is a modern personal portfolio website designed to showcase my work in software engineering, AI-driven platforms, and scalable systems. The site provides a structured view of selected projects, skills, and experience through a clean, responsive interface built for both technical and non-technical audiences.

The portfolio follows a lightweight static-site architecture and is deployed using GitHub Pages, enabling fast global delivery without backend infrastructure. This approach ensures performance, simplicity, and seamless updates directly from version control.

---

## 🎯 Purpose

This portfolio was built to:

- Present technical work in a clear, recruiter-friendly format  
- Demonstrate frontend engineering and deployment workflows  
- Maintain a fast, serverless web presence  
- Provide a single hub for projects, research, and experimentation  
- Continuously evolve alongside my engineering work

---

## ⚙️ Tech Stack

### 🌐 Frontend
<p>
  <img src="https://skillicons.dev/icons?i=html,css,js" />
</p>

- **HTML5** — Semantic structure and accessibility  
- **CSS3** — Responsive layout and modern styling  
- **JavaScript** — Client-side interaction and behavior

---

### 🎨 UI / Design
<p>
  <img src="https://skillicons.dev/icons?i=figma" />
</p>

- Clean, minimal layout for readability  
- Responsive design optimized for desktop and mobile  
- Focus on clarity and project-first storytelling

---

### 🚀 Deployment & Version Control
<p>
  <img src="https://skillicons.dev/icons?i=github,git" />
</p>

- **GitHub Pages** — Static hosting and CI-based deployment  
- **Git** — Source control and version management

---

## 📂 Project Structure
```text
portfolio2026/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions: build + deploy to GitHub Pages
│
├── public/                         # Static assets (copied to dist as-is)
│   ├── PDF_Resume/
│   │   ├── Vaibhav_Chandgir_Resume.pdf
│   │   └── README.md
│   └── images/                     # Logos, profile image, project visuals
│
├── src/
│   ├── main.tsx                    # Application entry point (mounts React app)
│   ├── App.tsx                     # Layout, navigation, routing, site shell
│   ├── index.css                   # Global styling and section-level styles
│   ├── vite-env.d.ts
│   │
│   ├── components/                 # Reusable UI + visual system components
│   │   ├── Button.tsx
│   │   ├── NavLeverTubes.tsx
│   │   ├── SkillsNetwork.tsx
│   │   └── TubesBackground.tsx
│   │
│   ├── pages/                      # Individual portfolio sections
│   │   ├── index.ts                # Barrel exports for cleaner imports
│   │   ├── HomePage.tsx
│   │   ├── EducationPage.tsx
│   │   ├── WorkExperiencePage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── SkillsPage.tsx
│   │   └── ContactPage.tsx
│   │
│   └── utils/                      # Data + helper logic
│       ├── skillsData.ts
│       └── techIcons.ts
│
├── index.html                      # Root HTML template
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript config (application)
├── tsconfig.node.json              # TypeScript config (Node tooling)
└── vite.config.ts                  # Vite configuration (base: '/portfolio2026/')


```

## 🏗️ Architecture Notes

- Built using **React + TypeScript + Vite** for fast development and optimized static builds  
- Component-driven structure separates UI (`/components`) from page-level views (`/pages`)  
- Utility modules provide centralized data and icon mapping for maintainability  
- Static files under `/public` are served directly without transformation  
- Configured for GitHub Pages deployment using `base: '/portfolio2026/'` in Vite  
- CI/CD handled through GitHub Actions (`deploy.yml`) to automatically build and publish


---

## ⚙️ Development Workflow

1. Develop locally using Vite dev server  
2. Build optimized static output (`dist/`)  
3. GitHub Actions runs build pipeline  
4. Output is deployed automatically to GitHub Pages


---

## 🚀 Local Development

Install dependencies:

npm install

Run development server:

npm run dev

Build production version:

npm run build

Preview build locally:

npm run preview

## 🚀 Running Locally

Clone the repository:

git clone https://github.com/vaibhavsadgir50/portfolio2026.git  
cd portfolio2026


Open the site directly in your browser:

index.html

No dependencies or build tools are required since this is a static website.

---

## 🌍 Deployment

The website is automatically deployed using **GitHub Pages**.

Any push to the main branch updates the live site:
https://vaibhavsadgir50.github.io/portfolio2026/

---

## 📌 Key Characteristics

- Static, serverless architecture  
- Fast load times with minimal dependencies  
- Easy to maintain and extend  
- Hosted entirely on GitHub infrastructure  
- Designed for professional project presentation

---

## 🧠 Design Approach

This portfolio intentionally avoids heavy frameworks to prioritize:

- Performance and instant load times  
- Simplicity of deployment  
- Long-term maintainability  
- Clear presentation of engineering work rather than framework complexity

The goal was to build something closer to an engineered product than a template-based site.

---

## 📫 Contact

**Vaibhav Chandgir**  
M.S. Computer Engineering — NYU Tandon  

LinkedIn:  
https://linkedin.com/in/vaibhavchandgir

---

## 📄 License

This project is open for reference and learning purposes.
Feel free to explore the structure and adapt ideas for your own portfolio.
