const services = require("../infra/config/services");
const tiles = require("../data/tiles.json")



const {gameService,categoryService,tileService} = services;


async function handleCreateGame(io,socket, game_id,category_name,game_rounds,teams_count, lang){
    try {
        const category_id = await categoryService.getCategoryIdByName(category_name);
        await gameService.addGame(game_id,category_id,game_rounds,teams_count,lang,socket.id);
        const game = await gameService.getGameById(game_id);
        if (!game.id) socket.emit("gameCreated", null);

        tiles.map(async (tile) => {
            await tileService.addTile(tile.id,game_id,tile.x,tile.y,tile.color)
        })


        socket.join(game_id); // Moderator toevoegen aan de room

        // Broadcast de room ID naar alle verbonden clients
        io.emit("game_id", game.id);
        socket.emit("createdGame", game);
        console.log(`🎲 Game in room ${game.id} aangemaakt`);
    } catch (err) {
        console.error("Fout bij aanmaken van game:", err);
        socket.emit("gameCreated", null);
        throw err;
    }
}
async function handleStartGame(io,socket, game_id) {
    try {
        await gameService.gameStarted(game_id);
        //socket.emit("gameStarted", {msg:'Game started !'});
        const clients = await io.in(game_id).fetchSockets();
        console.log(`Clients in room ${game_id}:`, clients.map(c => c.id));
        io.emit("gameStarted", 'Game started !');
    }catch(err){
        console.error(`Error Starting Game Handler: ${err.message}`);
        socket.emit("gameStarted", err);
        throw err;
    }
}

async function handleSaveGame(socket, data) {
    try {
        const game = await gameService.getGameById(data.game_id)
        socket.to(game.id).emit("gameSaved", game);
    }catch(err){
        console.error(`Error Saving Game Handler: ${err.message}`);
        throw err;
    }

}
async function handleLoadGame(socket, game_id) {
    try {
        const game = await gameService.getGameById(game_id);
        if (!game) { console.error("Could not get Game");return socket.emit("game", null);}
        //console.log("\n",game);
        socket.emit("game", game);
    }catch(err){
        console.error(`Error Loading Game Handler: ${err.message}`);
        return socket.emit("game", null);
    }
}
async function handleLoadTiles(socket, game_id) {
    try {
        const gameTiles = await tileService.getGameTilesByGameId(game_id);
        socket.emit("gameTiles", gameTiles);

    }catch(err){
        console.error(`Error Loading Game Handler: ${err.message}`);
        return socket.emit("gameTiles", null);
    }
}

async function handleEndGame(socket, game_id) {
    try {
        await gameService.endGame(game_id)
        const game = await gameService.getGameById(game_id)
        socket.to(game.id).emit("gameEnded", game);
    }catch(err){
        console.error(`Error End Game Handler: ${err.message}`);
        return err;
    }


}

module.exports ={handleCreateGame,handleStartGame,handleSaveGame,handleLoadGame,handleEndGame,handleLoadTiles}

/*const games = new Map(); // { gameId: { ...gameData } }

function createGame(gameId, gameData) {
    games.set(gameId, { ...gameData, teams: [] });
}

function addTeamToGame(gameId, teamData) {
    const game = games.get(gameId);
    if (game) {
        game.teams.push(teamData);
    }
}

function getGame(gameId) {
    return games.get(gameId);
}

function updateGame(gameId, newData) {
    const game = games.get(gameId);
    if (game) {
        games.set(gameId, { ...game, ...newData });
    }
}

module.exports = { createGame, addTeamToGame, getGame, updateGame };*/





