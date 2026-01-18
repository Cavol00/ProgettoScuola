import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import type { LibraryItem } from '../types';

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [recentManga, setRecentManga] = useState<LibraryItem[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:3001/library?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        const recents = data.slice(-4).reverse(); 
        setRecentManga(recents);
      })
      .catch(err => console.error(err));
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        {/* HEADER PULITO */}
        <div className="profile-header">
          <div className="profile-avatar">{initial}</div>
          <h2>{user.name}</h2>
          <p className="profile-email">{user.email}</p>
        </div>

        {/* SEZIONE: ULTIMI AGGIUNTI (Visuale) */}
        <div className="recent-section">
          <h3 className="section-title">Ultimi Aggiunti</h3>
          
          {recentManga.length > 0 ? (
            <div className="recent-grid">
              {recentManga.map((item) => (
                <Link to={`/manga/${item.mal_id}`} key={item.id} className="recent-item">
                  <img src={item.images.jpg.image_url} alt={item.title} />
                  <span className="recent-title">{item.title}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="empty-msg">Non hai ancora aggiunto nulla.</p>
          )}
        </div>

        {/* LOGOUT */}
        <div className="profile-actions">
          <button className="logout-btn" onClick={handleLogout}>
            Esci
          </button>
        </div>
      </div>
    </div>
  );
}