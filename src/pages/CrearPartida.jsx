import React from 'react';
import { useLocation } from 'wouter';
import './CrearPartida.css'

function CrearPartida({tempGameName, setTempGameName}) {
  const [, navigate] = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Chech Regex before chaning the page
    if (/^[a-zA-Z0-9]{1,15}$/.test(tempGameName)) {
      // setGameName(tempGameName);   ESTO NO ANDA no se por qué
      navigate('/Sala');

    // Invalid name: display a help message
    } else  if (tempGameName!="") {
      document.getElementById("invalid-gname").style.display = 'block';
    }
  };

  return (
    <div className="container-crearP">
      <h2>Crear Partida</h2>
      <form onSubmit={handleSubmit}>
      <input
        placeholder='Nombre'
        value={tempGameName}
        onChange={e => setTempGameName(e.target.value)}/>
      <div
        className="infoLabel"
        id="invalid-gname" >
        Ingrese un nombre alfanumerico de hasta 15 caracteres
      </div>
      <button
        className="button">
        Continuar
      </button>
      </form>
    </div>
  );
}

export default CrearPartida;