const services = require("../infra/config/services");


const {
    strategyService,
    gameService,
} = services;


async function handleGetStrategies(socket) {
    try {
        const strategies = await strategyService.getStrategies();
        if (!strategies.length) {
            console.error("No strategies found.(controller)");
            return socket.emit("strategies", { strategies: [] });
        }
        //console.log(strategies);
        socket.emit("strategies", { strategies });
    }catch (err){
        console.error(`Error getting strategies`,err.message);
        socket.emit("strategies", { error: err.message });
    }

}
async function handleChoiceStrategy(socket, {game_id,strategy_id}) {
    try {
        const strategy = await strategyService.getStrategyById(strategy_id);
        const game = await gameService.getGameById(game_id);
        socket.to(game.room_id).emit("strategyChosen", strategy);
    }catch(err) {
        console.error(`Error Choice Strategy Handler ${err.message}`);
    }
}
async function handleNewStrategy(socket, {game_id,category_id,strategy_naam,icon,color}) {
    try {
        await strategyService.addStrategy({
            category_id: category_id,
            strategy_naam: strategy_naam,
            icon: icon,
            color: color
        });
        const strategy = await strategyService.getStrategyIdByName(strategy_naam);
        const game = await gameService.getGameById(game_id);
        socket.to(game.room_id).emit("strategyCreated", strategy);
    }catch (err){
        console.error(`Error Creating Strategy: ${err.message}`);
    }
}
module.exports = {handleGetStrategies,handleChoiceStrategy,handleNewStrategy}





