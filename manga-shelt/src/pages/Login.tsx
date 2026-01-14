import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await loginUser(email, password);
    
    if (user) {
      login(user);
      navigate('/'); // Vai alla home dopo il login
    } else {
      setError('Email o password non validi (Usa: demo@test.com / 123)');
    }
  };

  return (
    <div className="login-container">
      <h2>Accedi a Manga Shelt</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Entra</button>
      </form>
    </div>
  );
}