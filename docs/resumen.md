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