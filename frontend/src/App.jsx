// frontend/src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'Admin') return <Navigate to="/" replace />;
  return children;
};

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    return cart.reduce((acc, item) => acc + item.qty, 0);
  };

  return (
    <nav style={{ padding: '0 30px', height: '75px', background: '#1e293b', borderBottom: '1px solid #334155', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', marginRight: '35px', textDecoration: 'none', fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          📦 Nexus<span style={{ color: '#6366f1' }}>Store</span>
        </Link>
        {/* Catalog and Cart are now fully visible to both guest users and logged-in accounts */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Catalog</Link>
          <Link to="/cart" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '15px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🛒 Cart <span style={{ background: '#6366f1', padding: '2px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>{getCartCount()}</span>
          </Link>
          {user && <Link to="/orders" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>📦 Tracking</Link>}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user?.role === 'Admin' && <Link to="/admin" style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: '600', fontSize: '14px', background: 'rgba(245,158,11,0.1)', padding: '6px 12px', borderRadius: '6px' }}>⚙️ Admin Panel</Link>}
        {user ? (
          <>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>Welcome, <strong style={{ color: '#fff' }}>{user.name}</strong></span>
            <button onClick={() => { logout(); navigate('/login'); }} style={{ padding: '8px 16px', background: '#334155', color: '#fff', border: 'none', borderRadius: '8px' }}>Logout</button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link to="/login" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '15px', fontWeight: '600' }}>Login</Link>
            <Link to="/register" style={{ background: '#6366f1', color: '#fff', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)' }}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

function AppContent() {
  return (
    <Router>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <Routes>
          {/* Public Path: Removed ProtectedRoute wrapper from Catalog */}
          <Route path="/" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default function App() { return <AuthProvider><AppContent /></AuthProvider>; }
