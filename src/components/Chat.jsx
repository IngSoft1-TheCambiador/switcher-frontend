import React, { useContext, useEffect, useState } from "react";
import './Chat.css'
import { AppContext } from "../App";
import { GET, POST, httpRequest } from "../services/HTTPServices";

function Chat() {
    const { clientId, lastMessage, gameId } = useContext(AppContext);
    const [mensajes, setMensajes] = useState([]);
    const [tempMsg, setTempMsg] = useState('');

    const imagenesFiguras = {
        h1: "fig01.svg",
        h2: "fig02.svg",
        h3: "fig03.svg",
        h4: "fig04.svg",
        h5: "fig05.svg",
        h6: "fig06.svg",
        h7: "fig07.svg",
        h8: "fig08.svg",
        h9: "fig09.svg",
        h10: "fig10.svg",
        h11: "fig11.svg",
        h12: "fig12.svg",
        h13: "fig13.svg",
        h14: "fig14.svg",
        h15: "fig15.svg",
        h16: "fig16.svg",
        h17: "fig17.svg",
        h18: "fig18.svg",
        s1: "fige01.svg",
        s2: "fige02.svg",
        s3: "fige03.svg",
        s4: "fige04.svg",
        s5: "fige05.svg",
        s6: "fige06.svg",
        s7: "fige07.svg",
    };

    const imagenesMovs = {
        mov1: "mov1.svg",
        mov2: "mov2.svg",
        mov3: "mov3.svg",
        mov4: "mov4.svg",
        mov5: "mov5.svg",
        mov6: "mov6.svg",
        mov7: "mov7.svg",
    };

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
            "service": `send_message?game_id=${gameId}&sender_id=${clientId}&txt=${encodeURIComponent(tempMsg)}`
        };

        await httpRequest(requestData);
    }

    // TODO: Usar para cuando se hace refresh o para cuando se abandona una partida y se vuelve a entrar
    async function getMessages() {
        const requestData = {
            "method": GET,
            "service": `get_messages?game_id=${gameId}`
        };

        const response = await httpRequest(requestData);

        console.log("GET_MESSAGES RESPONSE: ", response.json.message_list)
        console.log("GET_MESSAGES status: ", response.json.response_status)

        setMensajes(response.json.message_list);
    }

    useEffect(() => {
        if (lastMessage && lastMessage.data) {
            if (lastMessage.data.startsWith("NEW CHAT MSG:")) {
                // quito el "tag" ("NEW CHAT MSG:")
                console.log("mensaje broadcasteado para el chat: ", lastMessage.data);
                let msgObj = JSON.parse(lastMessage.data.substring(13));
                console.log("msgObj: ", msgObj);

                setMensajes([...mensajes, { sender: msgObj.sender_name, color: msgObj.sender_color, message: msgObj.message, time: msgObj.time }]);
            }
            else if (lastMessage.data.startsWith("LOG:")) {
                console.log("LOG broadcasteado para el chat: ", lastMessage.data);
                // quito el "tag" ("NEW CHAT MSG:")
                let logObj = JSON.parse(lastMessage.data.substring(4));
                console.log("logObj: ", logObj);

                setMensajes([...mensajes, { sender: "Log", color: "log", message: logObj.message, time: logObj.time, cards: logObj.cards }]);
            }
            else{
                getMessages();
            }
        }

    }, [lastMessage])

    const sendMsg = (e) => {
        e.preventDefault();
        if (tempMsg !== '') {
            sendMessage();
            setTempMsg('');
        }
    }


    function renderLogWithImg(msg, cards) {
        let msgArray = msg.split("&?&");
        if (msgArray.length === 1) {
            return (
                <>
                    {/* el 1er y unico elem seria el texto antes de la carta de fig usada */}
                    Log: {msgArray[0]}
                    <div className="log-img-container">
                        {cards.map((carta, i) => (
                            <div className="log-card-img">
                                {(carta.startsWith("h") || carta.startsWith("s")) &&
                                    <img key={i} src={imagenesFiguras[carta]} alt={`Figura: ${[carta]}`} />}
                            </div>
                        ))}
                    </div>
                </>
            )
        }
        else if (msgArray.length === 2) {
            return (
                <>
                    {/* el 1er elem seria el texto antes de las cartas de mov usadas */}
                    Log: {msgArray[0]}
                    <div className="log-img-container">
                        {cards.map((carta, i) => (
                            <>
                                {(carta.startsWith("mov")) &&
                                    <div className="log-card-img">
                                        <img key={i} src={imagenesMovs[carta]} alt={`Movimiento: ${[carta]}`} />
                                    </div>}
                            </>
                        ))}
                    </div>
                    {/* el 2do elem seria el texto antes de la carta de fig usada */}
                    Log: {msgArray[1]}
                    <div className="log-img-container">
                        {cards.map((carta, i) => (
                            <>
                                {(carta.startsWith("h") || carta.startsWith("s")) &&
                                    <div className="log-card-img">
                                        <img key={i} src={imagenesFiguras[carta]} alt={`Figura: ${[carta]}`} />
                                    </div>}
                            </>
                        ))}
                    </div>
                </>
            )
        }
    }

    return (
        <>
            {/* mensajes */}
            <div className="msg-scroller-container">
                <div className="mensajes">
                    {mensajes.map((mensaje, index) => (
                        <div key={index} className="mensaje" style={{ backgroundColor: parseColor(mensaje.color) }}>
                            {(mensaje.color === "log" && mensaje.cards !== undefined) ?
                                renderLogWithImg(mensaje.message, mensaje.cards)
                                :
                                `${mensaje.sender}: ${mensaje.message}`
                            }
                            <div style={{ fontSize: "small", alignSelf: "end" }}>
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