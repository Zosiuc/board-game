const {
    handleAddTeam,
    handleGetTeamById,
    handleGetRoomTeams,
    handleSameStrategyTeam,
    handleRollDice,
    handleSelectTile,
    handleSubmitAnswer
} = require("../../../controllers/teamController");


module.exports = function registerTeamEvents(io, socket) {
    socket.on("joinTeam", (team_id, team_name, strategy_name, game_id) => handleAddTeam(socket,{team_id, team_name, strategy_name, game_id}));

    socket.on("getTeam",(teamId) => handleGetTeamById(socket,teamId));
    socket.on("getSameStrategyTeams", (game_id,strategy_name) => handleSameStrategyTeam(socket, {game_id,strategy_name}));
    socket.on("getSameRoomTeams", (game_id) => handleGetRoomTeams(socket, game_id));
    socket.on('roll_dice', ({ gameId, teamId }) => handleRollDice(socket, gameId, teamId));
    socket.on('select_tile', ({gameId, teamId, tileId}) => handleSelectTile(io, gameId, teamId, tileId));
    socket.on('submit_answer', (gameId, teamId, questionId, answer, roundNumber) => handleSubmitAnswer(io, socket, {
        gameId,
        teamId,
        questionId,
        answer,
        roundNumber
    }));
}
