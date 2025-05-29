
const services = require("../../../infra/config/services");

const {
    gameService,
    teamService,
    strategyService,
    tileService,
    questionService,
    teamQueAnsService,
    moderatorService
} = services;

async function handleAddTeam(socket, {team_id, game_id, team_name, strategy_name}) {
    try {
        const game = await gameService.getGameById(game_id);
        const strategy = await strategyService.getStrategyByName(strategy_name);
        console.log("-handleAddTeam :");
        console.log("selected strategy:\n",strategy);
        if (!game) return socket.emit("teamAdded", [] );
        const team = await teamService.addTeam(team_id, team_name, strategy.id,  game.id, socket.id, strategy.color);
        await strategyService.updateStrategy(strategy.id, { isChosen:true })
        console.log("new team has added:\n",team);
        socket.join(game_id);
        console.log(`✅ Team ${team_id} heeft zich aangesloten bij game ${game_id}`);
        socket.emit("teamAdded", team);
        console.log("_______________________________");
    }catch(err) {
        console.error(`Error Adding Team: ${err.message}`);
        socket.to(game_id).emit("teamAdded", err);
    }
}

async function handleGetTeamById(socket,teamId) {
    try {
        const team = await teamService.getTeamById(teamId);
        if (!team) {
            console.error(`Error in "handleGetTeamById" By Getting team: ${teamId}`);
            return socket.emit("team", {})
        }
        socket.emit("team", { team });

    }catch(err) {
        console.error(`Error GetTeamById: ${err.message}`);
        socket.emit("team", {err:err.message});
    }
}
async function handleSameStrategyTeam(socket, {game_id,strategy_name}) {
    try {
        const strategy_id = await strategyService.getStrategyIdByName(strategy_name);
        const teams = await teamService.getTeamsByStrategyId(strategy_id);
        socket.to(game_id).emit("sameStrategyTeams", teams);
    }catch(err) {
        console.error(`Error Getting Same Strategy Teams : ${err.message}`);
    }
}
async function handleGetRoomTeams(socket, game_id) {
    try {
        const game = await gameService.getGameById(game_id);
        const teams = await teamService.getTeamsByGameId(game.id);
        socket.emit("sameRoomTeams", teams);
    }catch(err) {
        console.error(`Error Getting Same Room Teams : ${err.message}`);
    }
}
async function handleRollDice(io, team_id, game_id) {
    const dice = Math.floor(Math.random() * 6) + 1;
    const game = await gameService.getGameById(game_id);
    const team = await teamService.getTeamById(team_id);

    const tiles = await tileService.getAll(); // stored tiles
    let current = tiles.find(t => t.id === team.current_tileId);

    // count of steps
    for (let i = 0; i < dice; i++) {
        if (current?.nextId) {
            current = tiles.find(t => t.id === current.nextId);
        }
    }

    // team position update
    if (current) {
        //team.currentTileId = current.id;
        await teamService.updateTeam(team_id, {current_tileId:current.id});
    }

    // bring the next tiles (ex. 3 after)
    let possibleTiles = [];
    let checker = current;
    for (let j = 0; j < 5; j++) {
        if (checker?.nextId) {
            checker = tiles.find(t => t.id === checker.nextId);
            if (checker?.color === team.color) {
                possibleTiles.push(checker);
            }
        }
    }

    io.to(game.id).emit('dice_result', { dice, possibleTiles });
    console.log(`🎲 Team ${team_id} gooit het dobbelsteen: ${dice}`);
}

async function handleSelectTile(io, game_id, team_id, tile_id) {

    const game = await gameService.getGameById(game_id);
    const team = await teamService.getTeamById(team_id);

    await teamService.updateTeam(team_id, {current_tileId:tile_id});
    const questions = await questionService.getMyQuestions(game.category_id, team.strategy_id, game.lang)
    const rondomQuestionIndex = Math.floor(Math.random() * questions.length) + 1;
    const myQuestion = questions[rondomQuestionIndex];
    io.to(game_id).emit('question_sent', {myQuestion});
    console.log(`🧩 Team ${team_id} Kiest het tegel ${tile_id}`);
}

async function handleSubmitAnswer(io, socket, {gameId, teamId, questionId, answer, roundNumber}) {
    console.log(gameId, teamId, questionId, answer, roundNumber);
    const moderator = await  moderatorService.getModeratorByGameId(gameId);
    console.log(moderator);
    const queAnsTeam = await teamQueAnsService.addTeamQueAns(
        gameId,
        teamId,
        questionId,
        moderator.id,
        answer,
        roundNumber
    )

    const question = await questionService.getQuestionById(questionId);
    console.log(`📝 antwoord is ontvangt: ${answer}`);
    console.log(queAnsTeam);
    io.emit('new_answer', queAnsTeam, question);


}
module.exports = {
    handleAddTeam,
    handleGetTeamById,
    handleSameStrategyTeam,
    handleGetRoomTeams,
    handleRollDice,
    handleSelectTile,
    handleSubmitAnswer
}





