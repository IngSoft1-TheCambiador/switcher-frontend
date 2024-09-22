import React, { useState } from 'react';
import { useLocation } from 'wouter';
import './ListaPartidas.css'
import CrearPartida from './CrearPartida';

function ListaPartidas({ name, setGameName }) {
  const [tempGameName, setTempGameName] = useState('');
  const [, navigate] = useLocation();

  const goToInicio = () => {
    navigate('/');
  };

  return (
    <div className="container-row">

      {/* Lista de Partidas */}
      <div className="container-listaP">
        <h2>Hola {name}!</h2>
        <h2>Partida 1</h2>
        <h2>Partida 2</h2>
        <button onClick={goToInicio}>Volver</button>
      </div>

      {/* Crear Partida */}
      <CrearPartida tempGameName={tempGameName} setTempGameName={setTempGameName} />

    </div>
  );
}

export default ListaPartidas;
