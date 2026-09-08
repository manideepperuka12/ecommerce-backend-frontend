import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      login(data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid email or password credentials');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '40px', maxWidth: '900px', margin: '40px auto', background: '#1e293b', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
      <div style={{ flex: '1', minWidth: '300px', background: 'url("https://unsplash.com") no-repeat center/cover', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(99,102,241,0.3), rgba(15,23,42,0.85))', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '24px', fontWeight: '800' }}>Nexus Hardware</h3>
          <p style={{ margin: '8px 0 0 0', color: '#cbd5e1', fontSize: '14px' }}>Access your personalized gadget terminal and track processing orders.</p>
        </div>
      </div>
      <div style={{ flex: '1', padding: '50px 40px', minWidth: '320px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: '800', margin: '0 0 8px 0' }}>Welcome Back</h2>
        <p style={{ color: 'var(--text-muted)', margin: '0 0 30px 0' }}>Log in to view our premium catalog inventory matrix.</p>
        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Email Address</label>
            <input type="email" placeholder="name@nexus.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Secure Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%)', color: '#fff', border: 'none', fontSize: '16px', fontWeight: '700', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }}>Sign In Securely</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px', marginBotom: 0 }}>
          New customer? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none' }}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
