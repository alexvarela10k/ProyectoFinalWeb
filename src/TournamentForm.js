import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';

const TournamentForm = ({ tournamentId, onSave }) => {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [image, setImage] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(0);

  useEffect(() => {
    const fetchTournament = async () => {
      if (tournamentId) {
        const tournamentDoc = await getDoc(doc(db, 'tournaments', tournamentId));
        if (tournamentDoc.exists()) {
          const data = tournamentDoc.data();
          setName(data.name);
          setDeadline(data.deadline);
          setImage(data.image);
          setMaxParticipants(data.maxParticipants);
        }
      }
    };
    fetchTournament();
  }, [tournamentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tournamentData = { name, deadline, image, maxParticipants };

    try {
      if (tournamentId) {
        await updateDoc(doc(db, 'tournaments', tournamentId), tournamentData);
        console.log('Tournament updated successfully:', tournamentData);
      } else {
        await addDoc(collection(db, 'tournaments'), tournamentData);
        console.log('Tournament added successfully:', tournamentData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving tournament:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre del Torneo:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Fecha Límite de Inscripción:</label>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <label>Imagen:</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <label>Cantidad Máxima de Participantes:</label>
      <input
        type="number"
        value={maxParticipants}
        onChange={(e) => setMaxParticipants(e.target.value)}
      />
      <button type="submit">Guardar Torneo</button>
    </form>
  );
};

export default TournamentForm;





