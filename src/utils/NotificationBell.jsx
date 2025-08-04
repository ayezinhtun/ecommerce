// src/utils/NotificationBell.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotificationBell({ notifications }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/notifications')}
      className="btn btn-link position-relative"
      aria-label="Notifications"
    >
      🔔
      {notifications.length > 0 && (
        // <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle" style={{ fontSize: '0.75rem' }}>
        //   {notifications.length}
        // </span>
        <span className="badge bg-light text-primary">
  {notifications.filter(n => !n.read).length}
</span>
      )}
    </button>
  );
}

export default NotificationBell;
