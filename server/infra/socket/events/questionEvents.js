const {
    handleAddQuestion,
    handleGetCategoryQuestions,
    handleGetLangQuestions,
    handleGetMyQuestions,
    handleGetStrategyQuestions,
    handleGetQuestion
} = require("../../../controllers/questionController");

module.exports = function registerQuestionEvents(io, socket) {

    socket.on("addQuestion", (data) => handleAddQuestion(socket, {data}));
    socket.on("getQuestion", (question_id) => handleGetQuestion(socket, question_id));
    socket.on("categoryQuestions", (game_id,category_name) => handleGetCategoryQuestions(socket, {game_id,category_name}));
    socket.on("strategyQuestions", (game_id,strategy_id) => handleGetStrategyQuestions(socket, {game_id,strategy_id} ));
    socket.on("langQuestions", (game_id, lang) => handleGetLangQuestions(socket, {game_id,lang}));
    socket.on("request_question", (game_id, team_id, lang) => handleGetMyQuestions(socket, {game_id, team_id, lang}));

}
