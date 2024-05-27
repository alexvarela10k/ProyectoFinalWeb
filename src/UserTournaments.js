import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';  // Añade getDoc
import { auth } from './firebaseConfig';

const UserTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      const querySnapshot = await getDocs(collection(db, 'tournaments'));
      const tournamentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTournaments(tournamentsData);
    };

    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    fetchTournaments();
    return () => unsubscribe();
  }, []);

  const handleRegister = async (tournamentId) => {
    if (!user) {
      alert("Please log in to register for a tournament.");
      return;
    }

    const tournamentRef = doc(db, 'tournaments', tournamentId);
    const tournamentDoc = await getDoc(tournamentRef);  // Usa getDoc

    if (tournamentDoc.exists()) {
      const tournamentData = tournamentDoc.data();
      const updatedParticipants = tournamentData.participants
        ? [...tournamentData.participants, user.email]
        : [user.email];

      await updateDoc(tournamentRef, { participants: updatedParticipants });
      alert("You have successfully registered for the tournament.");
    }
  };

  return (
    <div>
      <h2>Available Tournaments</h2>
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            {tournament.name} - {tournament.deadline}
            <button onClick={() => handleRegister(tournament.id)}>Register</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTournaments;
;
