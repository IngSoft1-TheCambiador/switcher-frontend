import React from "react";
import Tablero from "./Tablero";
import './GameLayout.css'

function GameLayout({ datos }){
    return(
        <div className="layout">
            <div className="board-side">
                <div className="bar">
                    asda
                </div>
                <div style={{justifySelf: "center", alignSelf: "center"}}>
                    <Tablero datos={datos} />
                </div>
                <div className="bar">
                    asda
                </div>
            </div>
            <div className="players">
                jugadores
            </div>

            {/*
            chat, si queres ponerlo, en el css en el grid template, en vez de "grid-template-columns: auto 25vw;" pone "grid-template-columns: auto 25vw 20vw;", el 20vw seria
            la 3er columna (correspondiente al chat)


            <div className="chat">
                chat
                <input type="text" placeholder="Type something">
                </input>
            </div>
            */}

        </div>
    )
}

export default GameLayout;