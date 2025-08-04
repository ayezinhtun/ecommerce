import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

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

    // Clear cart in parent component and localStorage
    if (onOrderPlaced) onOrderPlaced();

    setLoading(false);
  };

  return (
    <button
      className="btn btn-success mt-3"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          Placing Order...
        </>
      ) : (
        'Place Order'
      )}
    </button>
  );
}
