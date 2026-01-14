import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">Manga Shelt 📚</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/library">La mia Libreria</Link>
            <span className="user-name">Ciao, {user.name}</span>
            <button onClick={handleLogout} className="btn-logout">Esci</button>
          </>
        ) : (
          <Link to="/login" className="btn-login">Accedi</Link>
        )}
      </div>
    </nav>
  );
}