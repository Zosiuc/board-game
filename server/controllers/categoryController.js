const services = require("../infra/config/services");

const {
    categoryService,
    gameService,
} = services;


async function handleGetCategories(socket) {
    try {
        const categories = await categoryService.getCategories();
        if (!categories.length) {
            console.error("No categories found.(controller)");
            return socket.emit("getCategoriesResponse", { categories: [] });
        }
        socket.emit("getCategoriesResponse", { categories });
    } catch (err) {
        console.error(`Error GetCategories Handler ${err.message}`);
        socket.emit("getCategoriesResponse", { error: err.message });
    }
}

async function handleChoseCategory(socket, {game_id,category_id}) {
    try {
        const category = await categoryService.getCategoryById(category_id);
        const game = await gameService.getGameById(game_id);
        socket.to(game.room_id).emit("categoryChosen", category);
    }catch(err) {
        console.error(`Error Chose Category Handler: ${err.message}`);
    }
}
async function handleNewCategory(socket, {game_id,category_name}) {
    try {
        await categoryService.addCategory(category_name);
        const category = await categoryService.getCategoryIdByName(category_name);
        const game = await gameService.getGameById(game_id);
        socket.to(game.room_id).emit("categoryCreated", category);
    }catch(err) {
        console.error(`Error New Category Handler: ${err.message}`);
    }
}

module.exports ={handleGetCategories,handleChoseCategory,handleNewCategory}






