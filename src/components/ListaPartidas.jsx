import React from 'react';
import './ListaPartidas.css'
import GamesList from './GamesList';
import CrearPartida from './CrearPartida';

function ListaPartidas({ onSubmit }) {

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