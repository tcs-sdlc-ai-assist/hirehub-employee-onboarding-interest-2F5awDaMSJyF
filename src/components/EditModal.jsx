import { useState } from 'react';
import { validateName, validateMobile, validateDepartment, ALLOWED_DEPARTMENTS } from '../utils/validators';

export function EditModal({ submission, onSave, onClose }) {
  const [formData, setFormData] = useState({
    fullName: submission.fullName || '',
    email: submission.email || '',
    mobile: submission.mobile || '',
    department: submission.department || '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    mobile: '',
    department: '',
  });

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
      mobile: validateMobile(formData.mobile),
      department: validateDepartment(formData.department),
    };

    setErrors(newErrors);

    return !newErrors.fullName && !newErrors.mobile && !newErrors.department;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave({
      fullName: formData.fullName,
      mobile: formData.mobile,
      department: formData.department,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">Edit Submission</h2>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal__body">
            <div className="form-group">
              <label className="form-group__label" htmlFor="edit-fullName">
                Full Name<span className="form-group__required">*</span>
              </label>
              <input
                id="edit-fullName"
                name="fullName"
                type="text"
                className={`form-group__input${errors.fullName ? ' form-group__input--error' : ''}`}
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className="form-group__error">{errors.fullName}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-group__label" htmlFor="edit-email">
                Email
              </label>
              <input
                id="edit-email"
                name="email"
                type="email"
                className="form-group__input"
                value={formData.email}
                disabled
              />
              <p className="form-group__hint">Email cannot be changed.</p>
            </div>

            <div className="form-group">
              <label className="form-group__label" htmlFor="edit-mobile">
                Mobile Number<span className="form-group__required">*</span>
              </label>
              <input
                id="edit-mobile"
                name="mobile"
                type="tel"
                className={`form-group__input${errors.mobile ? ' form-group__input--error' : ''}`}
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && (
                <p className="form-group__error">{errors.mobile}</p>
              )}
              <p className="form-group__hint">Enter 10-15 digits without spaces or dashes.</p>
            </div>

            <div className="form-group">
              <label className="form-group__label" htmlFor="edit-department">
                Department<span className="form-group__required">*</span>
              </label>
              <select
                id="edit-department"
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
          </div>

          <div className="modal__footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;