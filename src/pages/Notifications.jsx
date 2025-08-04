import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function NotificationsPage({ notifications, user }) {
  const [localNotis, setLocalNotis] = useState([]);

useEffect(() => {
  setLocalNotis(notifications);

  const unreadIds = notifications
    .filter((n) => !n.read)
    .map((n) => n.id);

  if (unreadIds.length > 0) {
    supabase
      .from('notifications')
      .update({ read: true })
      .in('id', unreadIds)
      .then(({ error }) => {
        if (error) {
          console.error('Failed to mark notifications as read:', error);
        } else {
          // Update local state to mark all as read immediately
          setLocalNotis((prev) =>
            prev.map((n) => ({ ...n, read: true }))
          );
        }
      });
  }
}, [notifications]);


  return (
    <div>
      <h2>Notifications</h2>
      {localNotis.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul className="list-group">
          {localNotis.map((noti) => (
            <li
              key={noti.id}
              className={`list-group-item ${noti.read ? '' : 'fw-bold'}`}
            >
              {noti.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
