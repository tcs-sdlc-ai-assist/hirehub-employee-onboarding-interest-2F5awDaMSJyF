const ALLOWED_DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
];

/**
 * Validates full name field.
 * @param {string} name
 * @returns {string} Error message or empty string if valid.
 */
export function validateName(name) {
  if (!name || !name.trim()) {
    return 'Full name is required.';
  }

  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return 'Full name must be at least 2 characters.';
  }

  if (trimmed.length > 50) {
    return 'Full name must not exceed 50 characters.';
  }

  if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
    return 'Full name can only contain letters and spaces.';
  }

  return '';
}

/**
 * Validates email field.
 * @param {string} email
 * @returns {string} Error message or empty string if valid.
 */
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email is required.';
  }

  const trimmed = email.trim();

  if (trimmed.length > 100) {
    return 'Email must not exceed 100 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Invalid email address.';
  }

  return '';
}

/**
 * Validates mobile number field.
 * @param {string} mobile
 * @returns {string} Error message or empty string if valid.
 */
export function validateMobile(mobile) {
  if (!mobile || !mobile.trim()) {
    return 'Mobile number is required.';
  }

  const trimmed = mobile.trim();

  if (!/^\d+$/.test(trimmed)) {
    return 'Mobile number can only contain digits.';
  }

  if (trimmed.length < 10 || trimmed.length > 15) {
    return 'Mobile number must be between 10 and 15 digits.';
  }

  return '';
}

/**
 * Validates department selection.
 * @param {string} department
 * @returns {string} Error message or empty string if valid.
 */
export function validateDepartment(department) {
  if (!department || !department.trim()) {
    return 'Please select a department.';
  }

  if (!ALLOWED_DEPARTMENTS.includes(department.trim())) {
    return 'Please select a valid department.';
  }

  return '';
}

export { ALLOWED_DEPARTMENTS };