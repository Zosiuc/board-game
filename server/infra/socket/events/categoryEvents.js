const {
    handleNewCategory,
    handleChoseCategory,
    handleGetCategories
} = require("../../../controllers/categoryController");

module.exports = function registerCategoryEvents( io, socket ) {
    socket.on("getCategories", () => handleGetCategories(socket))
    socket.on("newCategory", (game_id,category_id) => handleNewCategory(socket, {game_id,category_id}));
    socket.on("choiceCategory", (game_id,category_name) => handleChoseCategory(socket, {game_id,category_name}));
}