
const {
    handleStartGame,
    handleCreateGame,
    handleSaveGame,
    handleEndGame,
    handleLoadGame,
    handleLoadTiles
} = require("../../web/controllers/gameController.js");


module.exports =async function registerGameEvents (io, socket) {

    socket.on("createGame", (game_id,category_name,game_rounds,teams_count, lang) =>  handleCreateGame(io,socket, game_id,category_name,game_rounds,teams_count,lang));
    socket.on("startGame", (game_id) => handleStartGame(socket, game_id));
    socket.on("saveGame", (data) => handleSaveGame(socket, data));
    socket.on("loadGame", (game_id) => handleLoadGame(socket, game_id));
    socket.on("loadTiles", (game_id) => handleLoadTiles(socket, game_id));
    socket.on("endGame", (game_id) => handleEndGame(socket, game_id));
}
