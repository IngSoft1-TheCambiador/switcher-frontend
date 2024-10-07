import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/Context';
import { useLocation } from 'wouter';

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
      <h1>EL SWITCHER </h1>
      <form onSubmit={checkName}>
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