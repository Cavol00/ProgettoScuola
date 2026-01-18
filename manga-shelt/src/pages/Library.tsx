import React, { useEffect, useState } from 'react';
import '../App.css';
interface Manga {
  id: number;
  title: string;
  images: { jpg: { image_url: string } };
  score: number;
  synopsis: string;
}

export const Library = () => {
  const [library, setLibrary] = useState<Manga[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/library')
      .then(res => res.json())
      .then(data => setLibrary(data))
      .catch(err => console.error("Errore caricamento libreria:", err));
  }, []);

  const removeFromLibrary = (id: number) => {
    fetch(`http://localhost:3001/library/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setLibrary(prev => prev.filter(manga => manga.id !== id));
    })
    .catch(err => console.error("Errore durante la rimozione:", err));
  };

  return (
    <div className="home-container">
      <h1>La mia Collezione Personale 📖</h1>
      
      {library.length === 0 ? (
        <p style={{textAlign: 'center', marginTop: '50px', fontSize: '1.2rem'}}>
            La tua libreria è vuota. Corri ad aggiungere qualche manga!
        </p>
      ) : (
        <div className="manga-grid">
          {library.map((manga) => (
            // --- CARD SPECIFICA PER LA LIBRERIA ---
            <div key={manga.id} className="manga-card">
              <div className="card-image">
                <img src={manga.images.jpg.image_url} alt={manga.title} />
              </div>
              <div className="card-content">
                <h3 className="card-title">{manga.title}</h3>
                <span className="details-score">★ {manga.score}</span>
                <p className="card-synopsis">{manga.synopsis}</p>
                
                {/* TASTO RIMUOVI (Rosso/Rosa scuro) */}
                <button 
                    className="remove-btn" 
                    onClick={() => removeFromLibrary(manga.id)}
                >
                    Rimuovi dalla libreria
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library; // Assicurati che l'export sia corretto