
const {handleCreateTiles, handleTileClick} = require("../../web/controllers/tilesController");


module.exports = function registerTilesEvents(io, socket) {
    socket.on("create_tiles", (id,x,y,color) => handleCreateTiles(socket, {id,x,y,color}));
    socket.on("team_tile_click", (game_id, team_id, tile) => handleTileClick(socket,{game_id,team_id,tile}));
}
