// FILE: src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Assicurati che non ci siano graffe { } qui se App è export default
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)