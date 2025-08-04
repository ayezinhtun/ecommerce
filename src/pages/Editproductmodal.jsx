import React, { useState, useEffect } from 'react';

const EditProductModal = ({ show, onClose, product, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setDescription(product.description || '');
    }
  }, [product]);

  const handleSubmit = () => {
    onSave({ id: product.id, name, price, description });
    onClose();
  };

  if (!show || !product) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input type="text" className="form-control mb-2" value={name} onChange={e => setName(e.target.value)} />
            <input type="number" className="form-control mb-2" value={price} onChange={e => setPrice(e.target.value)} />
            <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-success" onClick={handleSubmit}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
