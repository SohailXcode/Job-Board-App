import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { MagicCard } from '../components/MagicCard';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data.user, res.data.token);
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid credentials');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <MagicCard gradientColor="#D9D9D955" style={styles.card}>
          <div style={styles.header}>
          <h2 style={styles.title}>Login</h2>
          <p style={styles.description}>Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <p style={styles.error}>{error}</p>}

          <label style={styles.label}>
            Email
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <button type="submit" style={styles.button}>Sign In</button>
        </form>

        <div style={styles.meta}>
          <span>Don't have an account? </span>
          <Link to="/register" style={styles.link}>Register</Link>
        </div>
      </MagicCard>
    </div>
    </div>
  );
}

const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    background: 'transparent',
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '420px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
  },
  header: {
    marginBottom: '1.5rem',
  },
  title: {
    margin: 0,
    fontSize: '1.9rem',
    color: '#111827',
  },
  description: {
    marginTop: '0.5rem',
    color: '#6b7280',
    lineHeight: 1.6,
  },
  form: {
    display: 'grid',
    gap: '1rem',
  },
  label: {
    display: 'grid',
    gap: '0.55rem',
    color: '#374151',
    fontSize: '0.95rem',
  },
  input: {
    width: '100%',
    padding: '0.95rem 1rem',
    borderRadius: '0.85rem',
    border: '1px solid #d1d5db',
    background: '#ffffff',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '0.95rem 1rem',
    borderRadius: '0.85rem',
    border: 'none',
    background: '#2563eb',
    color: '#ffffff',
    fontWeight: 600,
    cursor: 'pointer',
  },
  meta: {
    marginTop: '1rem',
    textAlign: 'center',
    color: '#4b5563',
    fontSize: '0.95rem',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 600,
  },
  error: {
    color: '#dc2626',
    fontSize: '0.92rem',
  },
};
