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
          <div className="navbar-links">
            <Link to="/">Home</Link>

            {user ? (
              <>
                <Link to="/library">La mia Libreria</Link>

                {/* IL NOME ORA È UN LINK AL PROFILO */}
                <Link to="/profile" style={{ fontWeight: 'bold', color: '#ffd700' }}>
                  Ciao, {user.name}
                </Link>

                {/* Lasciamo il tasto esci o lo togliamo dato che c'è nel profilo? 
          Per ora lasciamolo per comodità */}
                <button onClick={logout} className="logout-button">Esci</button>
              </>
            ) : (
              <Link to="/login" className="login-button">Accedi</Link>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn-login">Accedi</Link>
        )}
      </div>
    </nav>
  );
}