import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PostJob() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:'', company:'', location:'', description:'', type:'Full-time' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg('✅ Job posted!');
      setTimeout(() => navigate('/jobs'), 1500);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error posting job');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Post a New Job</h2>
        {msg && <p>{msg}</p>}
        <input name="title" placeholder="Job Title" onChange={handleChange} style={styles.input} />
        <input name="company" placeholder="Company Name" onChange={handleChange} style={styles.input} />
        <input name="location" placeholder="Location" onChange={handleChange} style={styles.input} />
        <select name="type" onChange={handleChange} style={styles.input}>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
        </select>
        <textarea name="description" placeholder="Job Description" rows={4} onChange={handleChange} style={styles.input} />
        <button onClick={handleSubmit} style={styles.btn}>Post Job</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', padding:'2rem' },
  card: { background:'white', padding:'2rem', borderRadius:'10px', width:'500px', display:'flex', flexDirection:'column', gap:'1rem', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' },
  input: { padding:'10px', border:'1px solid #ddd', borderRadius:'6px', width:'100%' },
  btn: { padding:'10px', background:'#2563eb', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }
};
