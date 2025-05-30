const services = require("../infra/config/services");
const {randomInt} = require("node:crypto");


const {
    tileService,
    teamService,
    questionService,
    gameService
} = services;

async function handleCreateTiles(socket, {id,x,y,color}) {
    try {
        await tileService.addTile({id,x,y,color});
        const tile = await tileService.getTileById(id);
        socket.emit("created_Tile", tile);

    }catch (err){
        console.error(`Error creating tiles: ${err}`);
    }
}

async function handleTileClick(socket, {game_id, team_id, tile}) {
    try {
        const game = await gameService.getGameById(game_id);
        console.log("game is found: ",game);
        const team = await teamService.getTeamById(team_id);
        console.log("team is found: ",team);
        await tileService.updateTile(tile.id, {id:tile.id,game_id:game_id,x:tile.x,y:tile.y,color:team.color,clicked:true});
        console.log("tile is updated");
        await teamService.updateTeam(team_id, {current_tileId:tile.id});
        console.log("team is updated");
        const myQuestions =  await questionService.getMyQuestions(game.category_id,team.strategy_id,game.lang);
        const rondomQuestionIndex = Math.floor(randomInt(myQuestions.length) + 1) ;
        const myQuestion = myQuestions[rondomQuestionIndex];
        console.log("question is submit", myQuestion);
        socket.emit("question", myQuestion);
    }catch (err) {
        console.error(`Error tile click: ${err}`);
    }
}
module.exports = {handleCreateTiles, handleTileClick};