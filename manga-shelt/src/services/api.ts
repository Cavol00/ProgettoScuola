import type { Manga, LibraryItem, User } from '../types';



const JIKAN_URL = 'https://api.jikan.moe/v4';
const LOCAL_URL = 'http://localhost:3001';

// --- JIKAN API  ---
export const getTopManga = async (): Promise<Manga[]> => {
  const res = await fetch(`${JIKAN_URL}/top/manga`);
  const data = await res.json();
  return data.data;
};

// Ricerca manga per titolo
 
export async function searchManga(query: string): Promise<Manga[]> {
  const response = await fetch(`https://api.jikan.moe/v4/manga?q=${query}&limit=20`);
  const data = await response.json();
  return data.data;
}

// --- AUTH API  ---
export const loginUser = async (email: string, password: string): Promise<User | null> => {
  // Cerchiamo nel db.json se esiste un utente con quella email e password
  const res = await fetch(`${LOCAL_URL}/users?email=${email}&password=${password}`);
  const users = await res.json();
  return users.length > 0 ? users[0] : null;
};

// --- LIBRARY API LOCALE---

// Ottieni solo i manga dell'utente loggato
export const getLibrary = async (userId: string): Promise<LibraryItem[]> => {
  const res = await fetch(`${LOCAL_URL}/library?userId=${userId}`);
  return res.json();
};

// Aggiungi manga collegandolo all'utente
export const addToLibrary = async (manga: Manga, userId: string): Promise<void> => {
  const check = await fetch(`${LOCAL_URL}/library?userId=${userId}&mal_id=${manga.mal_id}`);
  const existing = await check.json();
  
  if (existing.length > 0) {
    throw new Error("Manga già presente nella libreria!");
  }

  const itemToSave = { ...manga, userId };
  await fetch(`${LOCAL_URL}/library`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemToSave)
  });
};

// Rimuovi dalla libreria
export const removeFromLibrary = async (id: number): Promise<void> => {
  await fetch(`${LOCAL_URL}/library/${id}`, { method: 'DELETE' });
};