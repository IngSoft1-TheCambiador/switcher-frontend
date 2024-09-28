import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/Context';
import { useLocation } from 'wouter';
import './ListaPartidas.css'
import CrearPartida from './CrearPartida';

function ListaPartidas() {
  const { game } = useContext(AppContext);
  const [, navigate] = useLocation();

  const goToInicio = () => {
    navigate('/');
  };

  return (
    <div className="container-row">

      {/* Lista de Partidas */}
      <div className="container-listaP">
        <h2>Hola {game.playerName}!</h2>
        <h2>Partida 1</h2>
        <h2>Partida 2</h2>
        <button onClick={goToInicio}>Volver</button>
      </div>

      {/* Crear Partida */}
      <CrearPartida />

    </div>
  );
}

export default ListaPartidas;