import React, { useContext, useEffect, useState } from "react";
import './Chat.css'
import { AppContext } from "../App";
import { POST, httpRequest } from "../services/HTTPServices";

function Chat({playerNames, playerColors}) {
    const {clientId, lastMessage, gameId} = useContext(AppContext);
    const [mensajes, setMensajes] = useState([]);
    const [tempMsg, setTempMsg] = useState('');


    function parseColor(color) {
        if (color === "r") return "#ff5757";
        else if (color === "g") return "#41d867";
        else if (color === "b") return "#38b6ff";
        else if (color === "y") return "#f8cf31";
        else if (color === "log") return "rgba(130, 130, 130, 0.6)";
    }

    async function sendMessage() {
        const requestData = {
            "method": POST,
            "service": `send_message?game_id=${gameId}&sender_id=${clientId}&txt=${tempMsg}`
        };

        await httpRequest(requestData);
    }

    // TODO: Agregar uso de endpoint para obtener los mensajes de la partida en la base de datos 
        // (se usaria para cuando el jugador haga refresh o salga y vuelva a entrar a la partida)
    
    // TODO: Agregar logs
    useEffect(() => {
        console.log(lastMessage.data);
        if (lastMessage.data.includes("message", "sender_id", "sender_name", "time")) {
            let msgObj = JSON.parse(lastMessage.data)
            setMensajes([...mensajes, {sender: msgObj.sender_name, color: playerColors[msgObj.sender_id], message: msgObj.message, time: msgObj.time}])
        }
    }, [lastMessage])

    const sendMsg = (e) => {
        e.preventDefault();
        if (tempMsg !== '') {
            sendMessage();
            setTempMsg('');
        }
    }

    return(
        <>
            {/* mensajes */}
            <div className="msg-scroller-container">
                <div className="mensajes">
                    {mensajes.map((mensaje, index) => (
                        <div key={index} className="mensaje" style={{ backgroundColor: parseColor(mensaje.color) }}>
                            {mensaje.sender}: {mensaje.message}
                            <div style={{fontSize: "small", alignSelf: "end"}}>
                                {mensaje.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* campo para escribir */}
            <form>
                <input type="text" placeholder="Type something..." value={tempMsg} onChange={e => setTempMsg(e.target.value)} className="msg-textbox" maxLength={100}>  
                </input>  
                <button onClick={sendMsg} style={{ display: 'none' }} aria-hidden="true" />
            </form>
        </>
    );
}

export default Chat;