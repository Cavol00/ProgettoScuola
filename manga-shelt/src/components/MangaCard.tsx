import { Link } from 'react-router-dom';
import type { Manga } from '../types';
import { useAuth } from '../context/AuthContext';
import React from 'react';

interface Props {
  manga: Manga;
}

export function MangaCard({ manga }: Props) {
  const { user } = useAuth();

  const year = manga.published?.from ? new Date(manga.published.from).getFullYear() : 'N/A';
  const authors = manga.authors?.map(a => a.name).join(', ') || 'Sconosciuto';

  const addToLibrary = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Devi effettuare il login per aggiungere i preferiti!");
      return;
    }

    try {
      const checkRes = await fetch(`http://localhost:3001/library?id=${manga.mal_id}`);
      const checkData = await checkRes.json();

      if (checkData.length > 0) {
        alert("Questo manga è già nella tua libreria! 📚🚫");
        return; 
      }

      
    
      const mangaDaSalvare = {
        id: manga.mal_id, 
        userId: user.id,  
        title: manga.title,
        images: manga.images,
        score: manga.score,
        synopsis: manga.synopsis,
        type: manga.type,
        status: manga.status,
        year: year,
        authors: manga.authors
      };

      await fetch('http://localhost:3001/library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mangaDaSalvare)
      });

      alert("Manga aggiunto con successo! ✨");

    } catch (error) {
      console.error("Errore:", error);
      alert("C'è stato un errore nel server.");
    }
  };

  return (
    <div className="manga-card">

      {/* LATO SINISTRO: IMMAGINE (Cliccabile) */}
      <Link to={`/manga/${manga.mal_id}`} className="card-image" style={{ display: 'block', textDecoration: 'none' }}>
        <img src={manga.images.jpg.image_url} alt={manga.title} />

        {/* IL BOLLINO DEL VOTO */}
        {manga.score && (
          <div className="score-badge">★ {manga.score}</div>
        )}
      </Link>

      {/* LATO DESTRO: CONTENUTO */}
      <div className="card-content">

        {/* TITOLO (Cliccabile) */}
        <Link to={`/manga/${manga.mal_id}`} style={{ textDecoration: 'none' }}>
          <h3 className="card-title">{manga.title}</h3>
        </Link>

        {/* INFO TECNICHE */}
        <div className="card-meta">
          <span className="meta-label">Tipo: </span> {manga.type} &nbsp;|&nbsp;
          <span className="meta-label"> Stato: </span> {manga.status} &nbsp;|&nbsp;
          <span className="meta-label"> Anno: </span> {year}
        </div>

        {/* AUTORI */}
        <div className="card-authors">
          <span className="meta-label">Autori: </span> {authors}
        </div>

        {/* TRAMA */}
        <p className="card-synopsis">
          {manga.synopsis ? 
            (manga.synopsis.length > 100 ? manga.synopsis.substring(0, 100) + '...' : manga.synopsis) 
            : 'Trama non disponibile.'}
        </p>

        {/* TASTO AGGIUNGI */}
        <div style={{ marginTop: 'auto', textAlign: 'right' }}>
          <button className="add-button" onClick={addToLibrary}>
            + Aggiungi
          </button>
        </div>

      </div>
    </div>
  );
}