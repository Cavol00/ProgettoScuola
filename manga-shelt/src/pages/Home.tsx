import { useEffect, useState } from 'react';
import { getTopManga, addToLibrary } from '../services/api';
import { MangaCard } from '../components/MangaCard';
import type { Manga } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getTopManga().then(setMangaList);
  }, []);

  const handleAdd = async (manga: Manga) => {
    if (!user) {
      alert("Devi fare il login per salvare i manga!");
      navigate('/login');
      return;
    }

    try {
      await addToLibrary(manga, user.id);
      alert("Aggiunto alla libreria!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="page">
      <h1>Classifica Globale 🌍</h1>
      <div className="grid">
        {mangaList.map(manga => (
          <MangaCard 
            key={manga.mal_id} 
            manga={manga} 
            actionLabel="Aggiungi +" 
            onAction={handleAdd}
          />
        ))}
      </div>
    </div>
  );
}