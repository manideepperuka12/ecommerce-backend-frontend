import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  
  // File Upload State Variables
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const { user } = useContext(AuthContext);
  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders', config);
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllOrders();
  }, []);

  // Multi-part file upload state logic handler
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Generate local virtual image string URL for instant frontend UI preview
    setPreviewUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const uploadConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post('http://localhost:5000/api/upload', formData, uploadConfig);
      
      // Assign the backend uploaded public file string URL target destination path to your image state
      setImage(data.imageUrl);
      alert('📸 Local image uploaded securely to backend folder storage!');
    } catch (error) {
      alert(error.response?.data?.message || 'File upload failed. Ensure file is a valid image (png/jpg/webp).');
      setPreviewUrl('');
    } finally {
      setUploading(false);
    }
  };

  const createProductHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload a product image first.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/products', 
        { name, price: Number(price), description, stock: Number(stock), imageUrl: image }, 
        config
      );
      alert('🎉 New custom product successfully registered to store catalogue!');
      setName(''); setPrice(''); setDescription(''); setStock(''); setImage(''); setPreviewUrl('');
    } catch (err) {
      alert('Product Creation Failed');
    }
  };

  const updateStatusHandler = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, config);
      alert('Order tracking updated!');
      window.location.reload();
    } catch (err) {
      alert('Status Update Failed');
    }
  };

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      {/* Form Area Configuration Layout Grid */}
      <div style={{ flex: '1 1 380px', border: '1px solid #e2e8f0', padding: '25px', borderRadius: '12px', background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)' }}>Create Store Product</h2>
        
        <form onSubmit={createProductHandler}>
          <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ display: 'block', width: '94%', margin: '12px 0', padding: '10px' }} />
          <input type="number" placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ display: 'block', width: '94%', margin: '12px 0', padding: '10px' }} />
          <input type="text" placeholder="Short Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ display: 'block', width: '94%', margin: '12px 0', padding: '10px' }} />
          <input type="number" placeholder="Inventory Units" value={stock} onChange={(e) => setStock(e.target.value)} required style={{ display: 'block', width: '94%', margin: '12px 0', padding: '10px' }} />
          
          {/* Integrated Image Upload Block Row Box */}
          <div style={{ margin: '18px 0', padding: '15px', border: '2px dashed #cbd5e1', borderRadius: '8px', background: '#f8fafc', width: '87%' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>
              🖼️ Product Display Graphic
            </label>
            <input 
              type="file" 
              accept="image/*"
              onChange={uploadFileHandler}
              style={{ display: 'block', width: '100%', fontSize: '13px' }}
            />
            {uploading && <p style={{ margin: '8px 0 0 0', color: 'var(--primary-color)', fontSize: '13px', fontWeight: '600' }} className="skeleton">Uploading image files...</p>}
            
            {/* Live Media Vector Thumbnail Preview Box */}
            {previewUrl && (
              <div style={{ marginTop: '12px', position: 'relative' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-muted)' }}>Image Preview:</p>
                <img 
                  src={previewUrl} 
                  alt="Upload preview placeholder" 
                  style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
                />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={uploading}
            style={{ 
              width: '100%', padding: '12px', background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%)', color: '#fff', border: 'none', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '15px'
            }}
          >
            🚀 Publish to Catalog Grid
          </button>
        </form>
      </div>

      {/* Tracking and Analytics Output Area Panel Grid */}
      <div style={{ flex: '2 1 500px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)' }}>Global Store Orders</h2>
        {orders.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No global orders placed yet.</p> : 
          orders.map((o) => (
            <div key={o._id} style={{ border: '1px solid var(--border-color)', padding: '18px', marginBottom: '15px', borderRadius: '8px', background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
              <p style={{ margin: '0 0 6px 0' }}><strong>Buyer Name:</strong> {o.user?.name || "Unknown User"} | <strong>Total Order Value:</strong> <span style={{ color: 'var(--secondary-color)', fontWeight: '700' }}>${o.totalPrice}</span></p>
              <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: 'var(--text-muted)' }}><strong>Tracking Status:</strong> {o.status}</p>
              <select 
                onChange={(e) => updateStatusHandler(o._id, e.target.value)} 
                defaultValue={o.status}
                style={{ padding: '6px 12px', fontSize: '14px' }}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default AdminDashboard;
