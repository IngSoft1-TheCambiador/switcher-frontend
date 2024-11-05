import React, { useContext, useState } from "react";
import './Chat.css'
import { AppContext } from "../App";

function Chat({playerNames, playerColors}) {
    const {clientId} = useContext(AppContext);
    const [mensajes, setMensajes] = useState([]);
    const [tempMsg, setTempMsg] = useState('');
    const now = new Date();
    const hours = now.getHours();
    const min = now.getMinutes();

    function parseColor(color) {
        if (color === "r") return "#ff5757";
        else if (color === "g") return "#41d867";
        else if (color === "b") return "#38b6ff";
        else if (color === "y") return "#f8cf31";
        else if (color === "log") return "rgba(130, 130, 130, 0.6)";
    }

    // TODO:
        // implementar uso de useEffect para recibir mensajes y actualizar front

    // TODO: implementar llamada a endpoint para enviar mensajes 
        // (de momento esta funcion solo modifica el estado del cliente, para hacer pruebas sobre el estilo de los mensajes)
    const sendMessage = (e) => {
        e.preventDefault();
        if (tempMsg !== '') {
            setMensajes([...mensajes, {sender: playerNames[clientId], color: playerColors[clientId], message: tempMsg, time: `${hours}:${min}`}]);
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
                <input type="text" placeholder="Type something..." value={tempMsg} onChange={e => setTempMsg(e.target.value)} className="msg-textbox">
                </input>  
                <button onClick={sendMessage} style={{ display: 'none' }} aria-hidden="true" />
            </form>
        </>
    );
}

export default Chat;