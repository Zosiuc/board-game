
const services = require("../infra/config/services");

const {
    teamQueAnsService
} = services;

async function handleSaveTeamQueAns(socket, {game_id,team_id,question_id,moderator_id,answer,points,feedback}) {
    try {
        const teamQueAns = await teamQueAnsService.addTeamQueAns({
            game_id: game_id,
            team_id: team_id,
            question_id: question_id,
            moderator_id: moderator_id,
            answer: answer,
            points: points,
            feedback: feedback
        });
        socket.to(game_id).emit("teamQueAnsSaved", teamQueAns);
    }catch (err){
        console.error(`Error Saving TeamQueAns: ${err}`);
    }
}

async function handleLoadTeamQueAns(socket, {game_id,team_id}) {
    try {
        const teamQueAns = await teamQueAnsService.getTeamQueAnsByTeamId(team_id);
        socket.to(game_id).emit("teamQueAnsLoaded", teamQueAns);
    }catch(err){
        console.error(`Error Loading TeamQueAns: ${err}`);
    }
}
async function handleTeamQueAnsById(socket, {game_id, id}) {
    try {
        const teamQueAns = await teamQueAnsService.getTeamQueAnsById(id);
        socket.to(game_id).emit("teamQueAnsById", teamQueAns);
    }catch(err){
        console.error(`Error Loading TeamQueAns by id: ${err}`);
    }
}



module.exports = {handleSaveTeamQueAns,handleLoadTeamQueAns,handleTeamQueAnsById}






