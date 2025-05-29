const services = require("../../../infra/config/services");
const {teamService} = require("../../config/services");


const {
    gameService,
    moderatorService,
    teamQueAnsService
} = services;

async function handleAddModerator(socket, name, game_id) {
    try {
        console.log("handleAddModerator triggered ");
        const result = await moderatorService.addModerator(name, game_id);
        if (!result) {
            return console.error("could not add moderator.");
        }
        console.log('moderator id: ', result.id);
        const moderatorAdded = await moderatorService.getModerator(result.id);
        console.log(`moderator \"${moderatorAdded.name}\" voor \"${moderatorAdded.game_id} \" is gecreëerd`);
        socket.emit("moderatorAdded", moderatorAdded.id);

    } catch (err) {
        console.error(`Error adding moderator "${name}" to ${game_id}: ${err.message}`);
        socket.emit("moderatorAdded", null);
        throw err;
    }
}

async function handleGetModerator(io, socket, moderator_id) {
    try {
        const moderator = await moderatorService.getModerator(moderator_id);
        if (!moderator) {
            console.error("could not get moderator");
            return socket.emit("moderator", null);
        }
        //console.log("Getting inserted ", moderator);
        socket.emit("moderator", moderator);

    } catch (err) {
        console.error(`Error getModerator Handler: ${err.message}`);
        socket.emit("moderator", null);
    }
}

async function handleGetModeratorByGameId(io, socket, game_id) {
    try {
        if (!game_id) { return console.error("Could not get game id"); }
        const moderator = await moderatorService.getModeratorByGameId(game_id);
        if (!moderator) {
            console.error("could not get moderator");
            return socket.emit("moderatorByGameId", null);
        }
        console.log(moderator)
        socket.emit("moderatorByGameId", moderator);
    }catch(err){
        console.error(`Error getModeratorByGameId: ${err.message}`);
    }
}

async function handleStartRound(io, game_id) {

    io.to(game_id).emit('round_started');
    console.log('🎯rond begint:', game_id);

}

async function handleJudgeAnswer(socket, queAnsTeams) {
    const game = await gameService.getGameById(queAnsTeams.game_id);
    if (!game) return console.error("game not found");
    console.log(queAnsTeams)

    await teamQueAnsService.updateTeamQueAns(queAnsTeams);

    const team = await teamService.getTeamById(queAnsTeams.team_id);

    if (team) {
        const newScore = team.points += queAnsTeams.score;
        await teamService.updateTeam(team.id, {points:newScore});
        // Send feedback naar team
        socket.emit('answer_feedback', {
            questionId: queAnsTeams.question_id,
            newScore,
            feedback:queAnsTeams.feedback
        });

        console.log(`✅ Feedback gestuurd naar team ${queAnsTeams.teamId}`);
    }

}

module.exports = {
    handleAddModerator,
    handleGetModerator,
    handleGetModeratorByGameId,
    handleStartRound,
    handleJudgeAnswer
}





