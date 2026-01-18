import { useEffect, useState } from 'react';
import { getTopManga, searchManga } from '../services/api';
import { MangaCard } from '../components/MangaCard';
import type { Manga } from '../types';

export function Home() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');

  const loadTop = async () => {
    setIsLoading(true);
    try {
      const data = await getTopManga();
      setMangas(data);
    } catch (error) {
      console.error("Errore caricamento", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    loadTop();
  }, []);

  // --- LA LOGICA DEL FILTRO ---
  const filteredMangas = mangas.filter((manga) => {
    
    const matchStatus = 
      filterStatus === 'All' ? true : 
      filterStatus === 'Publishing' ? manga.status === 'Publishing' :
      filterStatus === 'Finished' ? manga.status === 'Finished' : true;


    const matchType = 
      filterType === 'All' ? true :
      filterType === 'Manga' ? manga.type === 'Manga' :
      filterType === 'Manhwa' ? manga.type === 'Manhwa' : true;

    return matchStatus && matchType;
  });

  return (
    <div className="home-container">
      
      {/* BARRA DI RICERCA */}
      <div className="search-container">
        <form onSubmit={handleSearch} style={{ display: 'flex' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Cerca un manga (es. One Piece)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">Cerca</button>
        </form>
      </div>

      {/* --- BARRA DEI FILTRI (Nuova) --- */}
      <div className="filters-bar">
        <div className="filter-group">
          <label>Stato:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">Tutti</option>
            <option value="Publishing">In Corso</option>
            <option value="Finished">Terminato</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Tipo:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="All">Tutti</option>
            <option value="Manga">Giapponese (Manga)</option>
            <option value="Manhwa">Coreano (Manhwa)</option>
          </select>
        </div>
        
        {/* Tasto reset piccolino */}
        {(filterStatus !== 'All' || filterType !== 'All') && (
           <button 
             onClick={() => {setFilterStatus('All'); setFilterType('All')}}
             className="reset-btn"
            >
             Reset
           </button>
        )}
      </div>

      <h1>{searchTerm ? `Risultati per "${searchTerm}"` : 'Top Manga del Momento'}</h1>
      
      {isLoading ? (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>Caricamento in corso...</p>
      ) : (
        <div className="manga-grid">
          {filteredMangas.length > 0 ? (
            filteredMangas.map((manga) => (
              <MangaCard key={manga.mal_id} manga={manga} />
            ))
          ) : (
            <p>Nessun manga corrisponde ai filtri selezionati.</p>
          )}
        </div>
      )}
    </div>
  );
}