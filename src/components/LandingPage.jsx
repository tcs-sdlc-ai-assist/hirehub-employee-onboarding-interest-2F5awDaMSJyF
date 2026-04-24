import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/apply');
  };

  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <span className="hero__badge">Now Accepting Applications</span>
          <h1 className="hero__title">
            Join the Team That's Building the{' '}
            <span className="hero__title--highlight">Future</span>
          </h1>
          <p className="hero__subtitle">
            HireHub connects talented individuals with exciting opportunities.
            Express your interest today and take the first step toward an
            incredible career journey.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={handleApply}>
              Express Your Interest
            </button>
            <a href="#features" className="btn btn--secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="features__header">
          <h2 className="features__title">Why Join Us?</h2>
          <p className="features__subtitle">
            Discover what makes HireHub a great place to grow your career and
            make a lasting impact.
          </p>
        </div>
        <div className="features__grid">
          <div className="feature-card">
            <div className="feature-card__icon">🚀</div>
            <h3 className="feature-card__title">Innovation</h3>
            <p className="feature-card__description">
              Work on cutting-edge projects that push boundaries and shape the
              future of technology. We encourage creative thinking and bold ideas.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">📈</div>
            <h3 className="feature-card__title">Growth</h3>
            <p className="feature-card__description">
              Accelerate your career with mentorship programs, learning
              opportunities, and clear paths for professional advancement.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">🤝</div>
            <h3 className="feature-card__title">Culture</h3>
            <p className="feature-card__description">
              Join a diverse and inclusive team that values collaboration,
              transparency, and mutual respect in everything we do.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">🌍</div>
            <h3 className="feature-card__title">Impact</h3>
            <p className="feature-card__description">
              Make a real difference by contributing to products and services
              that positively affect millions of people around the world.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta__content">
          <h2 className="cta__title">Ready to Get Started?</h2>
          <p className="cta__subtitle">
            Take the first step toward joining our team. Submit your interest
            and we'll be in touch soon.
          </p>
          <button className="btn btn--secondary" onClick={handleApply}>
            Apply Now
          </button>
        </div>
      </section>
    </>
  );
}

export default LandingPage;