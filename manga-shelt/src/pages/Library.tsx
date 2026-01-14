import { useEffect, useState } from 'react';
import { getLibrary, removeFromLibrary } from '../services/api';
import { MangaCard } from '../components/MangaCard';
import type { LibraryItem } from '../types';
import { useAuth } from '../context/AuthContext';

export function Library() {
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const { user } = useAuth();

  // Funzione per ricaricare la lista
  const loadData = () => {
    if (user) {
      getLibrary(user.id).then(setLibrary);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleRemove = async (manga: LibraryItem) => {
    if (manga.id) { // Assicuriamoci che abbia l'ID del database
      await removeFromLibrary(manga.id);
      loadData(); // Ricarica la lista dopo la cancellazione
    }
  };

  if (!user) return <p>Effettua il login per vedere la libreria.</p>;

  return (
    <div className="page">
      <h1>La mia Collezione Personale 📖</h1>
      {library.length === 0 ? <p>Nessun manga salvato.</p> : (
        <div className="grid">
          {library.map(manga => (
            <MangaCard 
              key={manga.id} 
              manga={manga} 
              actionLabel="Rimuovi 🗑️" 
              color="#e63946"
              onAction={() => handleRemove(manga)}
            />
          ))}
        </div>
      )}
    </div>
  );
}