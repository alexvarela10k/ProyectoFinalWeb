import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import TournamentList from './TournamentList';
import UserTournaments from './UserTournaments';  // Importa el componente aquí
import Home from './Home';  // Asegúrate de tener este componente

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/tournaments" element={<TournamentList />} />
          <Route path="/user/tournaments" element={<UserTournaments />} />  {/* Usa el componente importado */}
          <Route path="/" element={<Home />} /> {/* Ruta principal */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;



