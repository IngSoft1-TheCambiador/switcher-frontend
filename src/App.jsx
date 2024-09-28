import React, { useState, useContext } from 'react';
import './App.css';
import './index.css';
import Inicio from './components/Inicio';
import ListaPartidas from './components/ListaPartidas';
import GamesList from './components/GamesList';
import { Route } from "wouter";
import AppProvider, { AppContext } from './contexts/Context';

const App = () =>
(
  <div className="container">
    <div className="row mt-5">
      <div className="col-12">
        <AppProvider>
          <AppContext.Consumer>
            {
              ({ gameId, setGameId, playerName, setPlayerName, gamesList, setGamesList }) => 
              (
               <div className="app-container">
                 <Route path="/">
                   <Inicio setName={setPlayerName}/>
                 </Route>
                 <Route path="/ListaPartidas">
                   { GamesList(gamesList) }
                 </Route>
               </div>
               )
            }
          </AppContext.Consumer>
        </AppProvider>
      </div>
    </div>
  </div>
)

export default App;
