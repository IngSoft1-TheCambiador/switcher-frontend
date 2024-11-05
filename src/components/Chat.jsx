import React, { useState } from "react";
import './Chat.css'


function Chat() {

    const [tempMsg, setTempMsg] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        // TO DO 
    }

    return(
        <>
            {/* mensajes  (pertenece a otro ticket)*/}
            <div>
                {/* TO DO */}
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