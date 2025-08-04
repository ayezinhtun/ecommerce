import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const useNotifications = (user_id) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user_id) return;

    // Fetch initial notifications
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        // .eq('user_id', user_id)
        .order('created_at', { ascending: false });

      if (error) console.error('Fetch error:', error.message);
      else setNotifications(data);
    };

    fetchNotifications();

    // Realtime listener for INSERT and UPDATE events
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*', // listen to all events
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user_id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setNotifications((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setNotifications((prev) =>
              prev.map((noti) =>
                noti.id === payload.new.id ? payload.new : noti
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user_id]);

  return notifications;
};

export default useNotifications;
