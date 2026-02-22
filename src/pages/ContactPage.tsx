import Button from '../components/Button';

const EMAIL = 'your.email@example.com';
const LINKEDIN_URL = 'https://linkedin.com/in/yourprofile';
const GITHUB_URL = 'https://github.com/yourusername';

function ContactPage() {
  return (
    <section className="contact-section">
      <div className="contact-section__header">
        <h1 className="contact-section__title">Contact</h1>
        <p className="contact-section__subtitle">Let&apos;s connect.</p>
      </div>

      <div className="contact-section__content">
        <div className="glass-card glass-card--no-holo contact-section__card">
          <div className="glass-card__text">
            <h2 className="contact-section__heading">Get in touch</h2>
            <p className="contact-section__blurb">
              I&apos;m open to collaboration, opportunities, and conversations.
              Reach out via email or connect on LinkedIn and GitHub.
            </p>
            <div className="contact-section__links">
              <Button href={`mailto:${EMAIL}`} className="generate-button--small">
                Email me
              </Button>
              <Button
                href={LINKEDIN_URL}
                className="generate-button--small contact-section__link"
              >
                LinkedIn
              </Button>
              <Button
                href={GITHUB_URL}
                className="generate-button--small contact-section__link"
              >
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
