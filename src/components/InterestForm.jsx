import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateName, validateEmail, validateMobile, validateDepartment, ALLOWED_DEPARTMENTS } from '../utils/validators';
import { addSubmission, isEmailDuplicate } from '../utils/storage';

export function InterestForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    department: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    mobile: '',
    department: '',
  });

  const [successBanner, setSuccessBanner] = useState(false);
  const [errorBanner, setErrorBanner] = useState('');

  useEffect(() => {
    let timer;
    if (successBanner) {
      timer = setTimeout(() => {
        setSuccessBanner(false);
      }, 4000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [successBanner]);

  useEffect(() => {
    let timer;
    if (errorBanner) {
      timer = setTimeout(() => {
        setErrorBanner('');
      }, 4000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [errorBanner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateName(formData.fullName),
      email: validateEmail(formData.email),
      mobile: validateMobile(formData.mobile),
      department: validateDepartment(formData.department),
    };

    if (!newErrors.email && isEmailDuplicate(formData.email)) {
      newErrors.email = 'This email has already been submitted.';
    }

    setErrors(newErrors);

    return !newErrors.fullName && !newErrors.email && !newErrors.mobile && !newErrors.department;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessBanner(false);
    setErrorBanner('');

    if (!validateForm()) {
      return;
    }

    try {
      const success = addSubmission({
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        department: formData.department,
      });

      if (!success) {
        setErrors((prev) => ({
          ...prev,
          email: 'This email has already been submitted.',
        }));
        return;
      }

      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        department: '',
      });
      setErrors({
        fullName: '',
        email: '',
        mobile: '',
        department: '',
      });
      setSuccessBanner(true);
    } catch (error) {
      setErrorBanner(error.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="interest-form-page">
      <div className="interest-form">
        <h1 className="interest-form__title">Express Your Interest</h1>
        <p className="interest-form__subtitle">
          Fill out the form below to let us know you're interested in joining our team.
        </p>

        {successBanner && (
          <div className="banner banner--success">
            <span className="banner__icon">✅</span>
            <span className="banner__message">
              Your interest has been submitted successfully! We'll be in touch soon.
            </span>
            <button
              className="banner__close"
              onClick={() => setSuccessBanner(false)}
              aria-label="Dismiss success message"
            >
              ✕
            </button>
          </div>
        )}

        {errorBanner && (
          <div className="banner banner--error">
            <span className="banner__icon">❌</span>
            <span className="banner__message">{errorBanner}</span>
            <button
              className="banner__close"
              onClick={() => setErrorBanner('')}
              aria-label="Dismiss error message"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-group__label" htmlFor="fullName">
              Full Name<span className="form-group__required">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className={`form-group__input${errors.fullName ? ' form-group__input--error' : ''}`}
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="form-group__error">{errors.fullName}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="email">
              Email<span className="form-group__required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`form-group__input${errors.email ? ' form-group__input--error' : ''}`}
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="form-group__error">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="mobile">
              Mobile Number<span className="form-group__required">*</span>
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              className={`form-group__input${errors.mobile ? ' form-group__input--error' : ''}`}
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && (
              <p className="form-group__error">{errors.mobile}</p>
            )}
            <p className="form-group__hint">Enter 10-15 digits without spaces or dashes.</p>
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="department">
              Department<span className="form-group__required">*</span>
            </label>
            <select
              id="department"
              name="department"
              className={`form-group__select${errors.department ? ' form-group__select--error' : ''}`}
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select a department</option>
              {ALLOWED_DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="form-group__error">{errors.department}</p>
            )}
          </div>

          <button type="submit" className="btn btn--primary btn--full">
            Submit Application
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
          <button
            className="btn btn--secondary btn--small"
            onClick={handleBackToHome}
            type="button"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterestForm;