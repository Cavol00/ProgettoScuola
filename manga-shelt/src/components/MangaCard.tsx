// src/components/MangaCard.tsx
import type { Manga } from '../types';

interface Props {
  manga: Manga;
}

export function MangaCard({ manga }: Props) {
  const year = manga.published?.from ? new Date(manga.published.from).getFullYear() : 'N/A';
  const authors = manga.authors?.map(a => a.name).join(', ') || 'Sconosciuto';

  return (
    <>
      {/* LATO SX: Immagine */}
      <div className="card-image">
        <img src={manga.images.jpg.image_url} alt={manga.title} />
      </div>

      {/* LATO DX: Testi */}
      <div className="card-content">
        <h3 className="card-title">{manga.title}</h3>
        
        {/* Blocco Info con le etichette blu */}
        <div className="card-meta">
          <span className="meta-label">Tipo: </span> {manga.type} &nbsp;|&nbsp; 
          <span className="meta-label"> Stato: </span> {manga.status} &nbsp;|&nbsp; 
          <span className="meta-label"> Anno: </span> {year}
        </div>

        <div className="card-authors">
          <span className="meta-label">Autori: </span> {authors}
        </div>

        <p className="card-synopsis">
          {manga.synopsis || 'Trama non disponibile.'}
        </p>
      </div>
    </>
  );
}