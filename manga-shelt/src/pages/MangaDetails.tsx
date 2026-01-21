import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import '../App.css';

interface MangaDetail {
  mal_id: number;
  title: string;
  images: { jpg: { large_image_url: string } };
  synopsis: string;
  score: number;
  genres: { name: string }[];
  status: string;
  year: number;
  authors: { name: string }[];
}

export const MangaDetails = () => {
  const { id } = useParams();
  const location = useLocation(); 
  
  const passedManga = location.state?.manga;

  const [manga, setManga] = useState<MangaDetail | null>(passedManga || null);
  const [loading, setLoading] = useState(!passedManga); // Se abbiamo i dati, non carichiamo!

  useEffect(() => {
    // Se abbiamo già i dati passati dalla Home, NON facciamo la fetch
    if (passedManga) {
      return; 
    }

    setLoading(true);
    fetch(`https://api.jikan.moe/v4/manga/${id}`)
      .then(res => res.json())
      .then(data => {
        setManga(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, passedManga]);

  if (loading) return <div className="loading">Caricamento dettagli... ⏳</div>;
  if (!manga) return <div className="error">Manga non trovato 😢</div>;

  return (
    <div className="details-container">
      <Link to="/" className="back-btn">⬅ Torna alla Home</Link>
      
      <div className="details-card">
        <div className="details-image">
           {/* Jikan a volte usa image_url o large_image_url */}
           <img 
             src={manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url} 
             alt={manga.title} 
           />
        </div>
        
        <div className="details-info">
          <h1>{manga.title}</h1>
          <div className="badges">
            <span className="badge-score">★ {manga.score}</span>
            <span className="badge-status">{manga.status}</span>
          </div>

          <div className="meta-grid">
             <p><strong>Autori:</strong> {manga.authors?.map(a => a.name).join(', ') || 'N/A'}</p>
             <p><strong>Generi:</strong> {manga.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
          </div>

          <h3>Trama</h3>
          <p className="synopsis-full">{manga.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default MangaDetails;