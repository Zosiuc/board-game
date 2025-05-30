const {
    handleAddModerator,
    handleGetModerator,
    handleGetModeratorByGameId,
    handleStartRound,
    handleJudgeAnswer,
    handleJoinGame
} = require("../../../controllers/moderatorController");



module.exports = function registerModeratorEvents(io, socket) {
    socket.on("addModerator", (name,game_id) => handleAddModerator(socket,name,game_id));
    socket.on("joinGame", (id) => handleJoinGame(socket,id));
    socket.on("getModerator", (moderator_id) => handleGetModerator(io,socket,moderator_id));
    socket.on("getModeratorByGameId", (game_id) => handleGetModeratorByGameId(io,socket,game_id));
    socket.on('start_round', (gameId) => handleStartRound(socket,gameId));
    socket.on('judge_answer', ( queAnsTeams) => handleJudgeAnswer(socket,queAnsTeams));
}