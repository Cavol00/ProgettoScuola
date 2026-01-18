import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from '../assets/logo.png'; 

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* 1. LATO SINISTRO: LOGO + SCRITTA */}
      <div className="navbar-brand">
        {/* 2. USA LA VARIABILE IMPORTATA (senza virgolette) */}
        <img src={logoImage} alt="Logo" className="logo-img" />
        <span className="logo-text">Manga Shelt</span>
      </div>

      {/* 2. CENTRO: LINK */}
      <div className="navbar-center">
        {/* Usa Link invece di <a> per non ricaricare la pagina */}
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/libreria" className="nav-link">La mia Libreria</Link>
      </div>

      {/* 3. LATO DESTRO: UTENTE + ESCI */}
      <div className="navbar-user">
        <span className="user-greeting">
          Ciao, <span className="user-name">{user ? user.name : 'Dario'}</span>
        </span>
        {/* Aggiungi l'evento onClick per il logout */}
        <button className="btn-logout-nav" onClick={handleLogout}>Esci</button>
      </div>
    </nav>
  );
}