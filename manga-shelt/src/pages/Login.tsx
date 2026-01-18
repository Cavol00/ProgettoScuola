import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [isRegistering, setIsRegistering] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      await register(name, email, password);
    } else {
      await login(email, password);
    }
    // Se tutto va bene, vai alla home
    navigate('/'); 
  };

  return (
    <div className="login-container" style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>{isRegistering ? 'Registrati' : 'Accedi'}</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Il campo Nome appare solo se ci stiamo registrando */}
        {isRegistering && (
          <input
            type="text"
            placeholder="Il tuo nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: '10px' }}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px' }}
        />

        <button type="submit" style={{ padding: '10px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
          {isRegistering ? 'Crea Account' : 'Entra'}
        </button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        {isRegistering ? 'Hai già un account? ' : 'Non hai un account? '}
        <span 
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Accedi qui' : 'Registrati qui'}
        </span>
      </p>
    </div>
  );
}