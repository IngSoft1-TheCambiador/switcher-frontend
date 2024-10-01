import React, { useContext, useEffect, useState } from 'react';
import './WaitRoom.css'
import { useLocation } from 'wouter';
import { AppContext } from '../contexts/Context';
import { PUT, PATCH, POST, GET, httpRequest } from '../services/HTTPServices.jsx';
import Layout from './Layout';

function WaitRoom() {
    
    const { game, setGame, lastMessage } = useContext(AppContext);
    const [ ready, setReady ] = useState(false);
    const [, navigate] = useLocation();
    const [ localID, setLocalID ] = useState(null);
    const [ localPlayers, setLocalPlayers ] = useState([]);
    const [ localOwnerID, setLocalOwnerID ] = useState(null);
    const [ localPlayerID, setLocalPlayerID ] = useState(null);
    const [ localMin, setLocalMin ] = useState(null);
    const [ localMax, setLocalMax ] = useState(null);
    const [ localStarted, setLocalStarted ] = useState(null);
    
    console.log("game.gameID in WaitRoom", game.gameID);
    
    if (typeof(game.gameID) === "number" && localID == null)
    {
      setLocalID(game.gameID);
    }
    
    console.log("game.ownerID in WaitRoom", game.gameID);
    
    if (typeof(game.ownerID) === "number" && localOwnerID == null)
    {
      setLocalOwnerID(game.ownerID);
    }
    
    console.log("localOwnerId in WaitRoom", localOwnerID);
    
    if (typeof(game.playerID) === "number" && localID == null)
    {
      setLocalPlayerID(game.playerID);
      
    }
    
    if (typeof(game.max) === "number" && localMax == null)
    {
      setLocalMax(game.max);
    }
    
    
    if (typeof(game.min) === "number" && localin == null)
    {
      setLocalMin(game.min);
    }
    
    if (typeof(game.gameID) === "number" && localID == null)
    {
      setLocalID(game.gameID);
    }
    
    if (game.started != undefined && game.started != null && localStarted == null)
    {
      console.log("eureka");
      setLocalStarted(game.started);
    }
    
    
    console.log("game.gameID in WaitRoom", game.gameID);
    console.log("game.ownerID in WaitRoom", game.ownerID);
    console.log("localOwnerID in WaitRoom", localOwnerID);
    console.log("localPlayerID in WaitRoom", localPlayerID);
    
    console.log("game.playersList in WaitRoom", game.playersList);
    
    if (typeof(game.playersList) === "object" && localPlayers == [])
    {
      console.log("rescuing players list");
      setLocalPlayers(Object.entries(game.playersList));
    } else if (typeof(game.playersList) === "object" && localPlayers.length <  Object.entries(game.playersList).length)
    {
      console.log("rescuing longer players list");
      setLocalPlayers(Object.entries(game.playersList));
    }
      

    async function getState() {

      const requestData = {
        "method": GET,
        "service": `game_state/?game_id=${localID}`
      };

      const response = await httpRequest(requestData).then(res => res.json).then(response => {return response});
      console.log("full response: ", response);      
      setGame({ ...game, playersList: response.player_names, ownerID: response.owner_id, min : response.min_players, max : response.max_players, started : response.initialized });
      return response;
    }
    
    async function startGame() {

      const requestData = {
        "method": PUT,
        "service": `start_game/?game_id=${localID}`
      };

      await httpRequest(requestData);
    }
    
    useEffect(() => 
      {
        if (localID != null)
        {
          getState();
        }
        
        if (localStarted != null)
        {
          navigate("/Juego");
        }
        else
        {
          console.log("game id is either null or undefined");
        }
      }
    , [lastMessage]);

    function handleOnMouseEnter()
    {
        if ((localMin <= localPlayers.length) && (localPlayers.length <= localMax) && localOwnerID == localPlayerID) {
            setReady(true);
        } else {
            setReady(false);
        }
    }
    
    function handleClick()
    {
        /*if ((localMin <= localPlayers.length) && (localPlayers.length <= localMax) && localOwnerID == localPlayerID)*/
        if (null == null) {
            console.log("Empezanding");
            startGame();
            navigate("/Juego");
        }
    }
    
    console.log("local id: ", localID);
    
    if (localStarted)
    { 
    
      const mockCurrent = 1;
  
      const mockPlayers = Array.from([
        {id : 1, name : "Jorge", color : "b", shapes : ['L', 'L', 'L']}, 
        {id : 2, name : "Hilda", color : "y", shapes : ['L', 'L', 'L']},
        {id : 3, name : "Esteban", color : "r", shapes : ['L', 'L', 'L']},
        {id : 4, name : "Lala", color : "g", shapes : ['L', 'L', 'L']},
      ]);
  
      const mockBoard = "rrrrrrrrggggggggbbbbbbbbyyyyyyyyqu";
        
          return (
            <Layout players={mockPlayers} currentPlayer={mockCurrent} board={mockBoard}/>
          );
        }
    
    return(
    <div className="waitroom-layout">
        <div className="room-name">
            NOMBRE PARTIDA
            <div className="room-setting">de 3 a 4 jugadores</div>
        </div>
        <div className="players-layout">
            <h2>JUGADORES</h2>
            <div>
                {        
                  localPlayers.map(([player_id,player_name]) => (
                    <li key={player_id} className="player">
                        {player_name}
                    </li>
                  ))
                }
            </div>
                <button
                  onMouseEnter={handleOnMouseEnter}
                  onClick={handleClick} 
                  className="can-start" >
                    Empezar Partida
                </button>
        </div>
    </div>
    )
}

export default WaitRoom;
