import io from "socket.io-client";

//export const socket = io("http://localhost:3001");

// VOOR DEPLOYMENT
export const socket = io('https://board-game-zmco.onrender.com')
