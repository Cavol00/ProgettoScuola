import { useState, useEffect } from 'react';
import './App.css';

// 1. INTERFACCIA: Spieghiamo a TypeScript com'è fatto un singolo Manga
// Jikan API ci restituisce oggetti fatti così:
interface Manga {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    }
  };
  score: number;
}

function App() {
  // 2. STATO TIPIZZATO: Diciamo a React che questa lista conterrà SOLO oggetti di tipo "Manga"
  // <Manga[]> significa "Array di Manga"
  const [mangaList, setMangaList] = useState<Manga[]>([]);

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/top/manga')
      .then((response) => response.json())
      .then((data) => {
        // Jikan restituisce un oggetto con una proprietà "data" che contiene l'array
        setMangaList(data.data);
      })
      .catch((error) => console.error("Errore:", error));
  }, []);

  return (
    <div className="container">
      <h1>📚 Manga Shelt (TS Version)</h1>
      
      <div className="grid">
        {mangaList.map((manga) => (
          <div key={manga.mal_id} className="card">
            
            <img 
              src={manga.images.jpg.image_url} 
              alt={manga.title} 
            />
            
            <h3>{manga.title}</h3>
            
            {/* Se il punteggio è null (capita), mostriamo 'N/A' */}
            <p>⭐ {manga.score ?? 'N/A'}</p>

            <button>Aggiungi alla Libreria</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;