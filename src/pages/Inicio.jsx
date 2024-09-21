import React from 'react';
import { useLocation } from 'wouter';

function Inicio() {
  const [, navigate] = useLocation();

  const goToListapartidas = () => {
    navigate('/ListaPartidas');
  };

  return (
    <div className="container">
      <h1>EL SWITCHER</h1>
      <button className="button" onClick={goToListapartidas}>Continuar</button>
    </div>
  );
}

export default Inicio;
