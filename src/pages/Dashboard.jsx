import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import AddProductModal from './Addproductmodal';
import EditProductModal from './Editproductmodal';
import { logAudit } from '../utils/LogAudit';  // import audit logger
import { sendNotification } from '../utils/sendNotifications';


const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null); // track current user

  useEffect(() => {
    // get current user once
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (!error) setProducts(data);
    else console.error('Fetch error:', error);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (product) => {
    const { data, error } = await supabase.from('products').insert([product]).select().single();
    if (!error) {
      fetchProducts();
      setShowAddModal(false);

      // Log audit after successful insert
      if (user) {
        await logAudit({
          user_id: user.id,
          action: 'Added Product',
          table_name: 'products',
          record_id: data.id,
        });


          await sendNotification({
          user_id: user.id,
          message: 'Product Add by' + user.id,
        });
      }
    } else {
      alert('Error adding product');
    }
  };

  const handleUpdateProduct = async (product) => {
    const { error } = await supabase.from('products').update(product).eq('id', product.id);
    if (!error) {
      fetchProducts();
      setShowEditModal(false);

      // Log audit after successful update
      if (user) {
        await logAudit({
          user_id: user.id,
          action: 'Updated Product',
          table_name: 'products',
          record_id: product.id,
        });

        await sendNotification({
          user_id: user.id,
          message: 'Product update by' + user.id,
        });
      }
    } else {
      alert('Error updating product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      fetchProducts();

      // Log audit after successful delete
      if (user) {
        await logAudit({
          user_id: user.id,
          action: 'Deleted Product',
          table_name: 'products',
          record_id: id,
        });


        await sendNotification({
          user_id: user.id,
          message: 'Product delete by' + user.id,
        });
      }
    } else {
      alert('Error deleting product');
    }
  };

  const openEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  return (
    <div className="container mt-4">
      <h2>Product Dashboard</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>
        Add Product
      </button>
      <table className="table table-bordered">
        <thead>
          <tr><th>Name</th><th>Price</th><th>Description</th><th>Action</th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.description}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => openEdit(p)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      <AddProductModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddProduct}
      />
      <EditProductModal
        show={showEditModal}
        product={selectedProduct}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdateProduct}
      />
    </div>
  );
};

export default Dashboard;
