import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { MangaCard } from '../components/MangaCard';
import '../App.css';

// Definiamo l'interfaccia 
interface Manga {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  score: number;
  synopsis: string;
  type: string;
  status: string;
  published: { from: string };
  authors: { name: string }[];
}

// FUNZIONE CHE FA LA CHIAMATA 
const fetchTopManga = async () => {
  const res = await fetch('https://api.jikan.moe/v4/top/manga');
  if (!res.ok) {
    throw new Error('Errore nella rete');
  }
  const data = await res.json();
  return data.data as Manga[]; // Restituiamo solo l'array dei manga
};

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: mangaList, isLoading, isError } = useQuery({
    queryKey: ['topManga'], 
    queryFn: fetchTopManga, 
    });

  const filteredManga = mangaList?.filter((manga) =>
    manga.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      
      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Cerca un manga nella lista..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <h1>Top Manga del Momento 🏆</h1>

      {/* GESTIONE STATI (Caricamento ed Errore) */}
      {isLoading && <p style={{textAlign: 'center'}}>Caricamento in corso... ⏳</p>}
      
      {isError && <p style={{textAlign: 'center', color: 'red'}}>Errore nel caricamento dei dati! ❌</p>}

      {/* GRIGLIA DEI MANGA */}
      <div className="manga-grid">
        {/* Usiamo filteredManga se esiste, altrimenti array vuoto */}
        {filteredManga?.map((manga) => (
          <MangaCard key={manga.mal_id} manga={manga} />
        ))}
      </div>
    </div>
  );
};

export default Home;