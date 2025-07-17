import io from "socket.io-client";

// Voor Development
//export const socket = io("http://localhost:3003");

// VOOR DEPLOYMENT
export const socket = io("https://board-game-zmco.onrender.com");
