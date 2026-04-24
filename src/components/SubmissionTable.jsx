import { ALLOWED_DEPARTMENTS } from '../utils/validators';

export function SubmissionTable({ submissions, onEdit, onDelete }) {
  const formatDate = (isoString) => {
    if (!isoString) return '—';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '—';
    }
  };

  if (!submissions || submissions.length === 0) {
    return (
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Submitted At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7">
                <div className="table__empty">
                  <div className="table__empty-icon">📭</div>
                  <p className="table__empty-text">No submissions yet.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Submitted At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={submission.id}>
              <td>{index + 1}</td>
              <td>{submission.fullName}</td>
              <td>{submission.email}</td>
              <td>{submission.mobile}</td>
              <td>
                <span className="badge badge--new">
                  {submission.department}
                </span>
              </td>
              <td>{formatDate(submission.submittedAt)}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="action-btn action-btn--edit"
                    onClick={() => onEdit(submission)}
                    aria-label={`Edit ${submission.fullName}`}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="action-btn action-btn--delete"
                    onClick={() => onDelete(submission.id)}
                    aria-label={`Delete ${submission.fullName}`}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubmissionTable;