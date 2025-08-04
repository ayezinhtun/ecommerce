import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Orders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    supabase
      .from('orders')
      .select('*, order_items(*, products(*))')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching orders:', error);
          return;
        }
        setOrders(data);
      });
  }, [user]);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-muted">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-3 shadow-sm">
            <div className="card-header">
              <strong>Order #{order.id}</strong> — Total: ${order.total.toFixed(2)}
            </div>
            <ul className="list-group list-group-flush">
              {order.order_items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    {item.products.name} x {item.quantity}
                  </div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
