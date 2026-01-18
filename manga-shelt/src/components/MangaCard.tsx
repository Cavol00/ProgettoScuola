import { Link } from 'react-router-dom';
import type { Manga, LibraryItem } from '../types';
import { useAuth } from '../context/AuthContext';

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
      alert("Devi effettuare il login!");
      return;
    }

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

    try {
      await fetch('http://localhost:3001/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      alert("Manga aggiunto con successo! 📚");
    } catch (error) {
      console.error(error);
      alert("Errore o Manga già presente!");
    }
  };

  return (
    <div className="manga-card">
      
      {/* LATO SINISTRO: IMMAGINE (Cliccabile) */}
      <Link to={`/manga/${manga.mal_id}`} className="card-image" style={{ display: 'block', textDecoration: 'none' }}>
        <img src={manga.images.jpg.image_url} alt={manga.title} />
        
        {/* IL BOLLINO DEL VOTO (È TORNATO!) */}
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
        
        {/* INFO TECNICHE (SONO TORNATE!) */}
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
          {manga.synopsis || 'Trama non disponibile.'}
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