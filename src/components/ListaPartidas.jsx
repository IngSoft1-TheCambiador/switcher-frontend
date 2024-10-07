import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/Context';
import { useLocation } from 'wouter';
import './ListaPartidas.css'
import GamesList from './GamesList';
import CrearPartida from './CrearPartida';

function ListaPartidas({ onSubmit }) {
  const [, navigate] = useLocation();

  return (
    <div className="container-row">

      {/* Lista de Partidas */}
      <div className="container-listaP">
        <GamesList />
      </div>

      {/* Crear Partida */}
      <CrearPartida onSubmit={onSubmit} />

    </div>
  );
}

export default ListaPartidas;