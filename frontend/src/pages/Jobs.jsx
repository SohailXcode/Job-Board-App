import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Jobs() {
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  const fetchJobs = async () => {
    const res = await axios.get('http://localhost:5000/api/jobs');
    setJobs(res.data);
  };

  useEffect(() => { fetchJobs(); }, []);

  const apply = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/jobs/${id}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg(res.data.msg);
      setTimeout(() => setMsg(''), 2000);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error');
      setTimeout(() => setMsg(''), 2000);
    }
  };

  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchJobs();
  };

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h2>Available Jobs</h2>
      {msg && <p style={styles.msg}>{msg}</p>}
      <input
        placeholder="Search by title or company..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={styles.search}
      />
      <div style={styles.grid}>
        {filtered.map(job => (
          <div key={job._id} style={styles.card}>
            <h3>{job.title}</h3>
            <p>🏢 {job.company}</p>
            <p>📍 {job.location}</p>
            <span style={styles.badge}>{job.type}</span>
            <p style={styles.desc}>{job.description}</p>
            <p style={styles.meta}>👥 {job.applicants.length} applicants</p>
            {user?.role === 'student' && (
              <button onClick={() => apply(job._id)} style={styles.applyBtn}>Apply Now</button>
            )}
            {user?.role === 'employer' && (
              <button onClick={() => deleteJob(job._id)} style={styles.deleteBtn}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth:'1100px', margin:'0 auto', padding:'2rem' },
  search: { width:'100%', padding:'10px', marginBottom:'1.5rem', border:'1px solid #ddd', borderRadius:'8px', fontSize:'1rem' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1.5rem' },
  card: { background:'white', padding:'1.5rem', borderRadius:'10px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', display:'flex', flexDirection:'column', gap:'0.5rem' },
  badge: { background:'#dbeafe', color:'#1e40af', padding:'2px 8px', borderRadius:'20px', fontSize:'0.8rem', width:'fit-content' },
  desc: { color:'#666', fontSize:'0.9rem' },
  meta: { fontSize:'0.85rem', color:'#888' },
  applyBtn: { padding:'8px', background:'#16a34a', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' },
  deleteBtn: { padding:'8px', background:'#dc2626', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' },
  msg: { background:'#dcfce7', color:'#166534', padding:'10px', borderRadius:'6px', marginBottom:'1rem' }
};
