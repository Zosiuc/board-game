const {
    handleGetStrategies, handleChoiceStrategy, handleNewStrategy

} = require("../../../controllers/strategyControllers");


module.exports = function registerStrategyEvents(io, socket) {

    socket.on("getStrategies", () => handleGetStrategies(socket))
    socket.on("choiceStrategy", (game_id,strategy_id) => handleChoiceStrategy(socket, {game_id,strategy_id}));
    socket.on("newStrategy", (game_id,category_id,strategy_naam,icon,color) => handleNewStrategy(socket, {game_id,category_id,strategy_naam,icon,color}));

}
