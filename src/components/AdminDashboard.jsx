import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubmissions, updateSubmission, deleteSubmission } from '../utils/storage';
import { SubmissionTable } from './SubmissionTable';
import { EditModal } from './EditModal';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [successBanner, setSuccessBanner] = useState('');
  const [errorBanner, setErrorBanner] = useState('');

  const loadSubmissions = () => {
    const data = getSubmissions();
    setSubmissions(data);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  useEffect(() => {
    let timer;
    if (successBanner) {
      timer = setTimeout(() => {
        setSuccessBanner('');
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

  const totalSubmissions = submissions.length;

  const uniqueDepartments = new Set(
    submissions.map((s) => s.department).filter(Boolean)
  ).size;

  const latestSubmissionDate = (() => {
    if (submissions.length === 0) return '—';
    try {
      const sorted = [...submissions].sort(
        (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
      );
      const latest = sorted[0];
      if (!latest.submittedAt) return '—';
      const date = new Date(latest.submittedAt);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return '—';
    }
  })();

  const handleLogout = () => {
    sessionStorage.removeItem('hirehub_admin_auth');
    navigate('/');
  };

  const handleEdit = (submission) => {
    setEditingSubmission(submission);
  };

  const handleEditSave = (updates) => {
    try {
      const result = updateSubmission(editingSubmission.id, updates);
      if (result) {
        setSuccessBanner('Submission updated successfully.');
      } else {
        setErrorBanner('Submission not found. It may have been deleted.');
      }
      setEditingSubmission(null);
      loadSubmissions();
    } catch (error) {
      setErrorBanner(error.message || 'Failed to update submission. Please try again.');
    }
  };

  const handleEditClose = () => {
    setEditingSubmission(null);
  };

  const handleDelete = (id) => {
    setDeletingId(id);
  };

  const handleDeleteConfirm = () => {
    try {
      const result = deleteSubmission(deletingId);
      if (result) {
        setSuccessBanner('Submission deleted successfully.');
      } else {
        setErrorBanner('Submission not found. It may have already been deleted.');
      }
      setDeletingId(null);
      loadSubmissions();
    } catch (error) {
      setErrorBanner(error.message || 'Failed to delete submission. Please try again.');
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingId(null);
  };

  const handleDeleteOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setDeletingId(null);
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard__header">
          <h1 className="dashboard__title">Admin Dashboard</h1>
          <div className="dashboard__actions">
            <button className="btn btn--secondary btn--small" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {successBanner && (
          <div className="banner banner--success">
            <span className="banner__icon">✅</span>
            <span className="banner__message">{successBanner}</span>
            <button
              className="banner__close"
              onClick={() => setSuccessBanner('')}
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

        <div className="stat-cards">
          <div className="stat-card stat-card--primary">
            <div className="stat-card__label">Total Submissions</div>
            <div className="stat-card__value">{totalSubmissions}</div>
          </div>
          <div className="stat-card stat-card--success">
            <div className="stat-card__label">Unique Departments</div>
            <div className="stat-card__value">{uniqueDepartments}</div>
          </div>
          <div className="stat-card stat-card--warning">
            <div className="stat-card__label">Latest Submission</div>
            <div className="stat-card__value" style={{ fontSize: 'var(--font-size-lg)' }}>
              {latestSubmissionDate}
            </div>
          </div>
        </div>

        <SubmissionTable
          submissions={submissions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {editingSubmission && (
          <EditModal
            submission={editingSubmission}
            onSave={handleEditSave}
            onClose={handleEditClose}
          />
        )}

        {deletingId && (
          <div className="modal-overlay" onClick={handleDeleteOverlayClick}>
            <div className="modal">
              <div className="modal__header">
                <h2 className="modal__title">Confirm Deletion</h2>
                <button
                  className="modal__close"
                  onClick={handleDeleteCancel}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
              <div className="modal__body">
                <p>Are you sure you want to delete this submission? This action cannot be undone.</p>
              </div>
              <div className="modal__footer">
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={handleDeleteCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;