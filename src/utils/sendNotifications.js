// utils/sendNotification.js
import { supabase } from '../supabaseClient';

export const sendNotification = async ({ user_id, message }) => {
  const { error } = await supabase.from('notifications').insert([
    { user_id, message }
  ]);

  if (error) {
    console.error('Notification insert error:', error.message);
  }
};
