import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/Context';
import { useLocation } from 'wouter';
import './ListaPartidas.css'
import GamesList from './GamesList';
import CrearPartida from './CrearPartida';

function ListaPartidas() {
  const [, navigate] = useLocation();

  const goToInicio = () => {
    navigate('/');
  };

  return (
    <div className="container-row">

      {/* Lista de Partidas */}
      <div className="container-listaP">
        <GamesList />
      </div>

      {/* Crear Partida */}
      <CrearPartida />

    </div>
  );
}

export default ListaPartidas;