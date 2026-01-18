import { useEffect, useState } from 'react';
import { getTopManga, searchManga } from '../services/api'; 
import { MangaCard } from '../components/MangaCard';
import type { Manga } from '../types';

export function Home() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);

  // Funzione per caricare i Top Manga (Default)
  const loadTop = async () => {
    setIsLoading(true);
    try {
      const data = await getTopManga();
      setMangas(data);
    } catch (error) {
      console.error("Errore caricamento top manga", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Funzione per cercare 
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (searchTerm.trim() === '') {
      loadTop();
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchManga(searchTerm);
      setMangas(results);
    } catch (error) {
      console.error("Errore ricerca", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Appena apri la pagina carica i top manga
  useEffect(() => {
    loadTop();
  }, []);

  return (
    <div className="home-container">
      {/* --- BARRA DI RICERCA --- */}
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <form onSubmit={handleSearch} style={{ display: 'inline-flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Cerca un manga (es. Naruto)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              width: '300px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          <button 
            type="submit" 
            style={{
              padding: '10px 20px',
              background: '#e50914', 
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cerca
          </button>
        </form>
      </div>

      {/* --- GRIGLIA DEI RISULTATI --- */}
      <h1>{searchTerm ? `Risultati per "${searchTerm}"` : 'Top Manga del Momento'}</h1>
      
      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Caricamento in corso...</p>
      ) : (
        <div className="manga-grid">
          {mangas.map((manga) => (
            <MangaCard key={manga.mal_id} manga={manga} />
          ))}
          {mangas.length === 0 && <p>Nessun manga trovato :(</p>}
        </div>
      )}
    </div>
  );
}