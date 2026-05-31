import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingLines from './components/FloatingLines';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/jobs" />;
  return children;
}

const authFloatingWaves = ['middle', 'bottom', 'top'];

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';
  const showAuthBackground = hideNavbar;

  return (
    <>
      {showAuthBackground && (
        <FloatingLines
          enabledWaves={authFloatingWaves}
          lineCount={8}
          lineDistance={8}
          bendRadius={8}
          bendStrength={-2}
          interactive
          parallax={true}
          animationSpeed={1}
          gradientStart="#ffffff"
          gradientMid="#6f6f6f"
          gradientEnd="#6a6a6a"
        />
      )}
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/post-job" element={
          <PrivateRoute role="employer"><PostJob /></PrivateRoute>
        } />
      </Routes>
    </>
  );
}
