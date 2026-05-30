import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav style={styles.nav}>
      <Link to="/jobs" style={styles.brand}>💼 JobBoard</Link>
      <div style={styles.links}>
        {!user && <>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
        </>}
        {user && <>
          <span style={styles.welcome}>Hi, {user.name} ({user.role})</span>
          {user.role === 'employer' && <Link to="/post-job" style={styles.link}>Post Job</Link>}
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </>}
      </div>
    </nav>
  );
}

const styles = {
  nav: { background:'#1e40af', padding:'1rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center' },
  brand: { color:'white', fontWeight:'bold', fontSize:'1.2rem', textDecoration:'none' },
  links: { display:'flex', alignItems:'center', gap:'1rem' },
  link: { color:'white', textDecoration:'none' },
  welcome: { color:'#bfdbfe', fontSize:'0.9rem' },
  logoutBtn: { background:'#dc2626', color:'white', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer' }
};
