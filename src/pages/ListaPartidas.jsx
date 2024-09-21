import React from 'react';
import { useLocation } from 'wouter';

function ListaPartidas() {
  const [, navigate] = useLocation();

  const goToInicio = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Partida 1</h2>
      <h2>Partida 2</h2>
      <button onClick={goToInicio}>Volver</button>
    </div>
  );
}

export default ListaPartidas;
