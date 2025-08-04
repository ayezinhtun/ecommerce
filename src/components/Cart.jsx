import React from 'react';

const Cart = ({ cartItems, onRemove, onUpdateQuantity }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="card p-3 shadow-sm">
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-muted">Cart is empty.</p>
      ) : (
        <ul className="list-group mb-3">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{item.name}</strong> 

                {/* Quantity controls */}
                <button
                  className="btn btn-sm btn-secondary ms-3 me-1"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="btn btn-sm btn-secondary ms-1"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div>
                <span className="me-3">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr />
      <h4 className="text-end">Total: ${total.toFixed(2)}</h4>
    </div>
  );
};

export default Cart;
