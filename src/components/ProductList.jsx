import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    supabase.from('products').select('*').then(({ data }) => setProducts(data));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: 10, width: 200 }}>
            <img src={p.image_url} alt={p.name} width="100%" />
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <strong>${p.price}</strong>
            <br />
            <button onClick={() => onAddToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
