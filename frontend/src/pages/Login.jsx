import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:'', password:'' });
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
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />
        <button onClick={handleSubmit} style={styles.btn}>Login</button>
        <p>No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh' },
  card: { background:'white', padding:'2rem', borderRadius:'10px', width:'400px', display:'flex', flexDirection:'column', gap:'1rem', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' },
  input: { padding:'10px', border:'1px solid #ddd', borderRadius:'6px' },
  btn: { padding:'10px', background:'#2563eb', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' },
  error: { color:'red', fontSize:'0.9rem' }
};
