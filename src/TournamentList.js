import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import TournamentForm from './TournamentForm';

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      const querySnapshot = await getDocs(collection(db, 'tournaments'));
      const tournamentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTournaments(tournamentsData);
    };
    fetchTournaments();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'tournaments', id));
    setTournaments(tournaments.filter(tournament => tournament.id !== id));
  };

  return (
    <div>
      <h2>Lista de Torneos</h2>
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            {tournament.name} - {tournament.deadline}
            <button onClick={() => setSelectedTournamentId(tournament.id)}>Editar</button>
            <button onClick={() => handleDelete(tournament.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <TournamentForm
        tournamentId={selectedTournamentId}
        onSave={() => {
          setSelectedTournamentId(null);
          // Refresh the list of tournaments after save
          const fetchTournaments = async () => {
            const querySnapshot = await getDocs(collection(db, 'tournaments'));
            const tournamentsData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setTournaments(tournamentsData);
          };
          fetchTournaments();
        }}
      />
    </div>
  );
};

export default TournamentList;



