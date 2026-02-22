import Button from '../components/Button';

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
            <Button href="https://vaibhavsadgir50.github.io/portfolio2026/PDF_Resume/Vaibhav_Chandgir_Resume.pdf" className="generate-button--small">Resume</Button>
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
