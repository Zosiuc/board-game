
const services = require("../../../infra/config/services");

const {
    gameService,
    teamQueAnsService
} = services;

async function handleSaveTeamQueAns(socket, {game_id,team_id,question_id,moderator_id,answer,points,feedback}) {
    try {
        const game = await gameService.getGameById(game_id);
        const teamQueAns = await teamQueAnsService.addTeamQueAns({
            game_id: game_id,
            team_id: team_id,
            question_id: question_id,
            moderator_id: moderator_id,
            answer: answer,
            points: points,
            feedback: feedback
        });
        socket.to(game.room_id).emit("teamQueAnsSaved", teamQueAns);
    }catch (err){
        console.error(`Error Saving TeamQueAns: ${err}`);
    }
}

async function handleLoadTeamQueAns(socket, {game_id,team_id}) {
    try {
        const game = await gameService.getGameById(game_id);
        const teamQueAns = await teamQueAnsService.getTeamQueAnsByTeamId(team_id);
        socket.to(game.room_id).emit("teamQueAnsLoaded", teamQueAns);
    }catch(err){
        console.error(`Error Loading TeamQueAns: ${err}`);
    }
}

module.exports = {handleSaveTeamQueAns,handleLoadTeamQueAns}






