import React from 'react'
import './App.css'
import { Route, Router } from 'wouter';
import { navigate } from 'wouter/use-browser-location';
import WaitRoom from './pages/WaitRoom';

function App() {

  // hardcodeado para testear
  let game_id = 2;

  // hardcodeado para testear
  function handleClick(){
    navigate('/SalaDeEspera/'+{game_id});
  }

  // hardcodeado para testear
  const players_list = [
    "juanceto01",
    "Juli",
    "Pepito",
  ]

  return (
    <div className='app-container'>
      <Route path="/">
        <button onClick={handleClick} >entrar a partida</button>
      </Route>
      {/* necesita un id, el tema es que toma cualquier cosa tmb (no pude ponerle regex), nec un entero (supongo que las partidas tienen id, ya que pueden repetirse nombres)
          otro problema es que pueden poner ellos en el path del navegador por ejemplo ".../SalaDeEspera/4" y puede estar llena, lo que si, supongo que
          no va a poder hacer nada ni va a contar como jugador para la partida, lo que me causa mas temor es que pueda toquetear cosas que no deba, pero
          capaz se puede hacer lo suficientemente robusto como para que no pueda iniciar la partida ni jugar nada ni ver cartas que no deba, etc. */}
      <Route path="/SalaDeEspera/:id">
        <WaitRoom players_data={players_list} />
      </Route>
    </div>
  )
}

export default App;
