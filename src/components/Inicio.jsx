import React, { useState } from 'react';
import { useLocation } from 'wouter';
import './Inicio.css';

function Inicio({ onSubmit }) {

  const [tempName, setTempName] = useState('');
  const [, navigate] = useLocation();

  const checkName = (e) => {
    e.preventDefault();

    // Chech Regex before chaning the page
    if (/^[a-zA-Z0-9]{1,10}$/.test(tempName)) {
      onSubmit(tempName);
      navigate('/ListaPartidas');

      // Invalid name: display a help message
    } else if (tempName != "") {
      document.getElementById("invalid-name").style.display = 'block';
    }
  };

  return (
    <div className="container">
      <div className='titles'>
        <div className='h1-inicio'>EL SWITCHER</div>
        <div className='h2-inicio'>Ingrese su nombre de jugador</div>
      </div>

      <form onSubmit={checkName} className='form'>
        <input
          placeholder='Nombre'
          value={tempName}
          onChange={e => setTempName(e.target.value)} />
        <div
          className="infoLabel"
          id="invalid-name" >
          Ingrese un nombre alfanumerico de hasta 10 caracteres
        </div>
        <button
          className="button">
          Continuar
        </button>
      </form>
    </div>
  );
}

export default Inicio;