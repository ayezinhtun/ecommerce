import React, { useState } from 'react';

const AddProductModal = ({ show, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSave({ name, price, description });
    setName('');
    setPrice('');
    setDescription('');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Product</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input type="text" placeholder="Name" className="form-control mb-2" value={name} onChange={e => setName(e.target.value)} />
            <input type="number" placeholder="Price" className="form-control mb-2" value={price} onChange={e => setPrice(e.target.value)} />
            <textarea placeholder="Description" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
