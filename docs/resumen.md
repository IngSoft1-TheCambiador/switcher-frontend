# Resumen del front

## ¿Cómo funcionan los websockets en el front?

En `App.jsx` (que sería el componente que contiene a todos los componentes de la aplicación) se establece la conexión con el back mediante websocket:

```js
const socketUrl = "ws://localhost:8000/ws/connect";
const { lastMessage, lastJsonMessage } = useWebSocket(
    socketUrl,
    {
      shouldReconnect: (closeEvent) => {
        true
      },

      retryOnError: true
});
```
`useWebSocket` toma una URL para conectarse con el back y algunas opciones, y devuelve un objeto con varios atributos, de los cuales nosotros extraemos `lastMessage` y `lastJsonMessage`. Estos se actualizan cada vez que el back manda un mensaje por la conexión de ws establecida con el front. Para que el front esté a la escucha de estos mensajes se usa el hook `useEffect`:

```js
useEffect(() => {
    // código a ejecutar
    // cuando llega un mensaje
}, [lastMessage]);
```

La semántica de `useEffect(function, [x1, ..., xn])` consiste en ejecutar la función `function` cada vez que cambia el valor de alguna de las variables `[x1, ..., xn]`.

Por ejemplo, en el componente de la sala de espera `WaitRoom.jsx`:

```js
useEffect(() => {
    if (lastMessage && lastMessage.data.includes("GAME CANCELLED BY OWNER") && ownerId !== clientId){
        const name = sessionStorage.getItem("playerName");
        sessionStorage.clear();
        sessionStorage.setItem("playerName", name);
        navigate("/ListaPartidas");
    } else {
        getGameState();
    }
}, [lastMessage]);
```
Cada vez que `lastMessage` se actualice (es decir, cada vez que el back manda un mensaje nuevo por la conexión de ws) se chequea si `lastMessage` contiene el string `"GAME CANCELLED BY OWNER"`. Si se da el caso, entonces el back está notificando al front que la partida fue cancelada, por lo tanto el front realiza las acciones requeridas.
Si el mensaje no contiene `"GAME CANCELLED BY OWNER"`, entonces el back esta avisando que es necesario actualizar la UI del sistema por otra razón, ya sea porque se unió un nuevo jugador o un jugador abandonó. Por lo tanto, el front llama a `getGameState()`, que se encarga de hacer fetch al endpoint `get_game_state` y actualizar la UI con los datos recibidos.

En toda la aplicación se sigue el mismo patrón: el back le manda notificaciones al front mediante ws y el front está a la escucha de estas notificaciones. Dependiendo del mensaje que reciba del back, el front hará fetch de un endpoint u otro y renderizará un componente u otro de manera acorde.

## ¿Qué sucede cuando se refresca la aplicación?

Para poder volver a obtener los datos al recargar la página, guardamos en `sessionStorage` (memoria de la máquina del usuario) únicamente aquellos datos más importantes:
- `playerName`, porque no hay forma de saber qué nombre le corresponde a cada usuario que está en la lista de partidas
- `gameId`
- `clientId`
- `currentPlayer`, porque para reiniciar el timer del front se compara `currentPlayer` del front (variable de estado) con el `current_player` del back, luego el `currentPlayer` del front debe persistir cuando se recarga la página
- `usedMoves`, porque en el back no se guarda información de los movimientos usados pero todavía no descartados, y esto debe persisitir cuando se recarga la página
- `winner`, porque cuando se gana una partida la misma se considera finalizada y se borran sus datos, luego no hay forma de volver a obtener el nombre del ganador al recargar la página

No es necesario persistir el resto de estado de la aplicación ya que con `playerName`, `gameId` y  `clientId` es suficiente para obtener el resto de datos mediante los endpoints.


Los datos guardados en `sessionStorage` persisten a lo largo de la vida de una pestaña. Es decir, son independientes para cada pestaña y son eliminados cuando la pestaña es cerrada o si la ventana del navegador es cerrada.
Notar que en ciertas situaciones se debe limpiar el  `sessionStorage` manualmente, por ejemplo, cuando se gana una partida o se abandona, hay que limpiar los campos `gameId` y `clientId`, pero conservar el campo `playerName`. Por ejemplo, en el botón de regreso de la pantalla de ganador (componente `Winner`):

```js
<button className='button-return' onClick={() => {
    const name = sessionStorage.getItem("playerName");
    // borro toda la data
    sessionStorage.clear();
    // vuelvo a setear playerName
    sessionStorage.setItem("playerName", name);
    // vuelvo a la lista de partidas
    navigate("/ListaPartidas");
}} >
    Volver
</button>
```

Al refrescar la aplicación, la conexión establecida mediante ws con el back se cierra. A su vez, se vuelven a renderizar los componentes, con lo que el siguiente código en `App.jsx` se vuelve a ejecutar:

```js
const socketUrl = "ws://localhost:8000/ws/connect";
const { lastMessage, lastJsonMessage } = useWebSocket(
    socketUrl,
    {
      shouldReconnect: (closeEvent) => {
        true
      },

      retryOnError: true
});
```

Por lo tanto se establece una nueva conexión ws con el back. Cuando se recibe el nuevo `socketId`, se chequea si hay `gameId` y  `clientId` guardados en `sessionStorage` (o sea, si el usuario recargó la página estando en una partida) y se actúa en consecuencia:

```js
useEffect(() => {

    /*

    ...

    */

    if (lastJsonMessage !== null && lastJsonMessage.socketId !== null && lastJsonMessage.socketId !== undefined) {
      setSocketId(lastJsonMessage.socketId);
    // veo si ya hay un clientId y un gameId en sessionStorage
      if (sessionStorage.getItem("clientId") !== null && sessionStorage.getItem("gameId") !== null) {
        console.log("SHOULD RECONNECT")
        console.log(gameId);
        console.log(clientId);
        // sincronizar con el timer del back
        getTime();
        // volver a registrar la conexión
        // en la partida
        handleRelink(lastJsonMessage.socketId);
      }
    }
}, [lastJsonMessage]);
```

Si se recarga la página sin estar en una partida no hay nada que hacer, lo único que se debe conservar es el `playerName`, que se guarda en `sessionStorage` al momento de setearse por el usuario.