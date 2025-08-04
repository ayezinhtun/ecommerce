import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { sendNotification } from '../utils/sendNotifications';
import { logAudit } from '../utils/LogAudit';  // Import here

export default function Checkout({ cartItems, user, onOrderPlaced }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setLoading(true);
    const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const { data: order, error } = await supabase
      .from('orders')
      .insert({ user_id: user.id, total })
      .select()
      .single();

    if (error) {
      alert('Failed to place order: ' + error.message);
      setLoading(false);
      return;
    }

    // Log the order creation in audit_logs
    await logAudit({
      user_id: user.id,
      action: 'Placed Order',
      table_name: 'orders',
      record_id: order.id,
    });


   await sendNotification({
  user_id: user.id,
  message: 'Your order has been placed successfully!',
});


    const items = cartItems.map((i) => ({
      order_id: order.id,
      product_id: i.id,
      quantity: i.quantity,
      price: i.price,
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(items);

    if (itemsError) {
      alert('Failed to save order items: ' + itemsError.message);
      setLoading(false);
      return;
    }

    alert('Order placed!');

    if (onOrderPlaced) onOrderPlaced();

    setLoading(false);
  };

  return (
    <button
      className="btn btn-success mt-3"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? 'Placing Order...' : 'Place Order'}
    </button>
  );
}
