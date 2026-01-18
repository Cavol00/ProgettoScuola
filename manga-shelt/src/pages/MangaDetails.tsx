import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMangaById } from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { Manga, LibraryItem } from '../types';

export function MangaDetails() {
  const { id } = useParams(); 
  const [manga, setManga] = useState<Manga | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      getMangaById(id).then((data) => setManga(data));
    }
  }, [id]);

  const addToLibrary = async () => {
    if (!user || !manga) return alert("Devi fare il login!");

    const newItem: LibraryItem = {
      userId: user.id,
      mal_id: manga.mal_id,
      title: manga.title,
      images: manga.images,
      score: manga.score,
      type: manga.type,
      status: manga.status,
      synopsis: manga.synopsis,
      published: manga.published,
      authors: manga.authors
    };

    await fetch('http://localhost:3001/library', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    });
    alert("Aggiunto alla libreria!");
  };

  if (!manga) return <div style={{textAlign:'center', marginTop: '50px'}}>Caricamento...</div>;

  return (
    <div className="details-container">
      {/* INTESTAZIONE */}
      <div className="details-header">
        <h1>{manga.title}</h1>
        <span className="details-score">★ {manga.score || 'N/A'}</span>
      </div>

      <div className="details-grid">
        {/* COLONNA SINISTRA: FOTO E AZIONI */}
        <div className="details-sidebar">
          <img src={manga.images.jpg.image_url} alt={manga.title} className="details-cover" />
          
          <button className="add-button big-btn" onClick={addToLibrary}>
            + Aggiungi alla Libreria
          </button>

          <div className="info-box">
            <p><strong>Tipo:</strong> {manga.type}</p>
            <p><strong>Stato:</strong> {manga.status}</p>
            <p><strong>Volumi:</strong> {manga.volumes || '?'}</p>
            <p><strong>Capitoli:</strong> {manga.chapters || '?'}</p>
            <p><strong>Anno:</strong> {manga.published?.from ? new Date(manga.published.from).getFullYear() : 'N/A'}</p>
          </div>
        </div>

        {/* COLONNA DESTRA: TRAMA E INFO */}
        <div className="details-content">
          <h3>Trama</h3>
          <p className="details-synopsis">{manga.synopsis}</p>
          
          <div className="details-extra">
            <h3>Autori</h3>
            <p>{manga.authors.map(a => a.name).join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}