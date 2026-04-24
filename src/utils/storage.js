const STORAGE_KEY = 'hirehub_submissions';

/**
 * Generates a UUID v4 string.
 * @returns {string}
 */
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Reads and parses all submissions from localStorage.
 * Falls back to empty array on corrupted or missing data.
 * @returns {Array<Object>}
 */
export function getSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.error('Corrupted submissions data: expected array. Resetting to empty.');
      saveSubmissions([]);
      return [];
    }
    return parsed;
  } catch (error) {
    console.error('Failed to parse submissions from localStorage:', error);
    saveSubmissions([]);
    return [];
  }
}

/**
 * Serializes and writes submissions array to localStorage.
 * @param {Array<Object>} submissions
 */
export function saveSubmissions(submissions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  } catch (error) {
    console.error('Failed to save submissions to localStorage:', error);
    throw new Error('Unable to save data. Storage may be full.');
  }
}

/**
 * Checks if an email already exists in submissions.
 * @param {string} email
 * @returns {boolean}
 */
export function isEmailDuplicate(email) {
  if (!email || !email.trim()) {
    return false;
  }
  const normalizedEmail = email.trim().toLowerCase();
  const submissions = getSubmissions();
  return submissions.some(
    (submission) => submission.email && submission.email.trim().toLowerCase() === normalizedEmail
  );
}

/**
 * Adds a new submission with generated UUID and ISO timestamp.
 * Returns true if successful, false if duplicate email.
 * @param {Object} submission - { fullName, email, mobile, department }
 * @returns {boolean}
 */
export function addSubmission(submission) {
  if (isEmailDuplicate(submission.email)) {
    return false;
  }

  const submissions = getSubmissions();

  const newSubmission = {
    id: generateId(),
    fullName: submission.fullName.trim(),
    email: submission.email.trim(),
    mobile: submission.mobile.trim(),
    department: submission.department.trim(),
    submittedAt: new Date().toISOString(),
  };

  submissions.push(newSubmission);
  saveSubmissions(submissions);
  return true;
}

/**
 * Updates a submission by id, merging provided updates.
 * Returns true if found and updated, false otherwise.
 * @param {string} id
 * @param {Object} updates - Partial submission fields to update
 * @returns {boolean}
 */
export function updateSubmission(id, updates) {
  const submissions = getSubmissions();
  const index = submissions.findIndex((submission) => submission.id === id);

  if (index === -1) {
    return false;
  }

  const sanitizedUpdates = {};
  if (updates.fullName !== undefined) {
    sanitizedUpdates.fullName = updates.fullName.trim();
  }
  if (updates.email !== undefined) {
    sanitizedUpdates.email = updates.email.trim();
  }
  if (updates.mobile !== undefined) {
    sanitizedUpdates.mobile = updates.mobile.trim();
  }
  if (updates.department !== undefined) {
    sanitizedUpdates.department = updates.department.trim();
  }
  if (updates.status !== undefined) {
    sanitizedUpdates.status = updates.status;
  }

  submissions[index] = { ...submissions[index], ...sanitizedUpdates };
  saveSubmissions(submissions);
  return true;
}

/**
 * Deletes a submission by id.
 * Returns true if found and deleted, false otherwise.
 * @param {string} id
 * @returns {boolean}
 */
export function deleteSubmission(id) {
  const submissions = getSubmissions();
  const filtered = submissions.filter((submission) => submission.id !== id);

  if (filtered.length === submissions.length) {
    return false;
  }

  saveSubmissions(filtered);
  return true;
}