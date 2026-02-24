const RESUME_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="hero-btn__icon" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
  </svg>
);

const GITHUB_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="hero-btn__icon" aria-hidden>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LINKEDIN_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="hero-btn__icon" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

function HomePage() {
  return (
    <section className="home-hero">
      <div className="home-hero__content">
        <div className="glass-card glass-card--no-holo">
          <div className="glass-card__text">
            <h1>Welcome</h1>
            <h2>Hey, I'm a Vaibhav Chandgir.</h2>
            <p style={{ marginBottom: '2em' }}>A computer engineer based in New York and shaped by New York University (NYU),focused on building intelligent and scalable software systems.</p>
            <p>
              This is my portfolio — explore my work.
            </p>
            <div className="home-hero__buttons">
              <a href="https://vaibhavsadgir50.github.io/portfolio2026/PDF_Resume/Vaibhav_Chandgir_Resume.pdf" className="hero-btn" target="_blank" rel="noopener noreferrer" aria-label="Resume">
                <span className="hero-btn__inner">
                  {RESUME_ICON}
                  <span className="hero-btn__label">Resume</span>
                </span>
              </a>
              <a href="https://github.com/vaibhavsadgir50" className="hero-btn" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <span className="hero-btn__inner">
                  {GITHUB_ICON}
                  <span className="hero-btn__label">GitHub</span>
                </span>
              </a>
              <a href="https://www.linkedin.com/in/vaibhavchandgir/" className="hero-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <span className="hero-btn__inner">
                  {LINKEDIN_ICON}
                  <span className="hero-btn__label">LinkedIn</span>
                </span>
              </a>
            </div>
          </div>
          <img
            src="https://vaibhavsadgir50.github.io/portfolio2026/images/face.png"
            alt="Vaibhav Chandgir"
            className="glass-card__image"
          />
        </div>
      </div>
    </section>
  );
}

export default HomePage;
