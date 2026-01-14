import type { Manga } from '../types';

interface Props {
  manga: Manga;
  actionLabel?: string;     // Testo del bottone (es: "Aggiungi" o "Rimuovi")
  onAction?: (manga: Manga) => void; // Funzione da eseguire
  color?: string; // Colore del bottone
}

export function MangaCard({ manga, actionLabel, onAction, color }: Props) {
  return (
    <div className="card">
      <img src={manga.images.jpg.image_url} alt={manga.title} />
      <div className="card-content">
        <h3>{manga.title}</h3>
        <p>⭐ {manga.score ?? 'N.A.'}</p>
        
        {actionLabel && onAction && (
          <button 
            style={{ backgroundColor: color || '#646cff' }}
            onClick={() => onAction(manga)}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}