// pages/AuditLogs.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setLogs(data);
    };
    fetchLogs();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Audit Logs</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Table</th>
            <th>Record ID</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.user_id}</td>
              <td>{log.action}</td>
              <td>{log.table_name}</td>
              <td>{log.record_id}</td>
              <td>{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
