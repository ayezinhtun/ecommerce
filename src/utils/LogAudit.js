// utils/logAudit.js
import { supabase } from '../supabaseClient';

export const logAudit = async ({ user_id, action, table_name, record_id }) => {
  // Convert record_id to string just in case
  const recordIdStr = record_id ? record_id.toString() : null;

  const { data, error } = await supabase.from('audit_logs').insert([
    {
      user_id,
      action,
      table_name,
      record_id: recordIdStr,
    },
  ]);

  if (error) {
    console.error('Audit log error:', error.message);
  } else {
    console.log('Audit log inserted:', data);
  }
};
