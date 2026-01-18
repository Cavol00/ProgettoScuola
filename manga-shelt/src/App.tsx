// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/navbar';
import { Home } from './pages/Home';
import { MangaDetails } from './pages/MangaDetails';
import { Library } from './pages/Library';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/libreria" element={<Library />} />
            <Route path="/login" element={<Login />} />
            <Route path="/manga/:id" element={<MangaDetails />} />
            <Route path="/profile" element={<Profile />} />

          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;