const {handleSaveTeamQueAns, handleLoadTeamQueAns} = require("../../web/controllers/teamQueAnsController");


module.exports = function registerTeamQueAnsEvents(io, socket) {
    socket.on("saveTeamQueAns", (game_id,team_id,question_id,moderator_id,answer,points,feedback) => handleSaveTeamQueAns(socket, {game_id,team_id,question_id,moderator_id,answer,points,feedback}));
    socket.on("loadTeamQueAns", (game_id,team_id) => handleLoadTeamQueAns(socket, {game_id,team_id}));

}