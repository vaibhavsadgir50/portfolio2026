import Button from '../components/Button';

function HomePage() {
  return (
    <section className="home-hero">
      <div className="home-hero__content">
        <div className="glass-card glass-card--no-holo">
          <div className="glass-card__text">
            <h1>Welcome</h1>
            <h2>Hi, I'm a Vaibhav Chandgir.</h2>
            <p>
              This is my portfolio — explore my work, experience,
              and get in touch.
            </p>
          </div>
          <img
            src="/images/face.png"
            alt="Vaibhav Chandgir"
            className="glass-card__image"
          />
        </div>
        <Button href="/resume.pdf" className="generate-button--small">Resume</Button>
      </div>
    </section>
  );
}

export default HomePage;
