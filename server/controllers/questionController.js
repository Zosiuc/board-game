
const services = require("../infra/config/services");

const {
    questionService,
    categoryService,
    gameService,
    strategyService,
    teamService
} = services;

async function handleAddQuestion(socket, {game_id, category_name, strategy_name, question, lang}) {
    try {
        const categoryNames = await categoryService.getCategories().map(category => {
            category.name
        });
        if (!categoryNames.includes(category_name)) {
            await categoryService.addCategory(category_name);
        }
        const strategyNames = await strategyService.getStrategies().map(strategy => {
            strategy.name
        });
        if (!strategyNames.includes(strategy_name)) {
            await strategyService.addStrategy(strategy_name);
        }
        const newQuestion = await questionService.addQuestion({
                category_id:await categoryService.getCategoryIdByName(category_name),
                strategy_id:await strategyService.getStrategyIdByName(strategy_name),
                question:question,
                lang:lang
            }
            );


        socket.to(game_id).emit("questionAdded", newQuestion);

    }catch(err) {console.error(`Error Adding Question Handler: ${err.message}`);}

}
async function handleGetQuestion(socket, {question_id}) {
    try {
        const question = await questionService.getQuestionById(question_id);
        socket.emit("myQuestion", question);
    }catch (err) {
        console.error(`Error GetQuestion Handler ${err.message}`);
    }
}

async function handleGetCategoryQuestions(socket, {game_id,category_name}) {
    try {
        const category = await categoryService.getCategoryIdByName(category_name);
        const questions = await questionService.getQuestionsByCategoryId(category.id);
        socket.to(game_id).emit("categoryQuestions", questions);
    }catch (err) {
        console.error(`Error Category Questions Handler ${err.message}`);
    }
}
async function handleGetStrategyQuestions(socket, {game_id,strategy_name}) {
    try {
        const strategy_id = await strategyService.getStrategyIdByName(strategy_name);
        const questions = await questionService.getQuestionsByStrategyId(strategy_id);
        socket.to(game_id).emit("strategyQuestions", questions);
    }catch(err) {
        console.error(`Error Category Questions Handler ${err.message}`);
    }
}
async function handleGetLangQuestions(socket, {game_id,lang}){
    try {
        const game = await gameService.getGameById(game_id);
        const questions = await questionService.getQuestionsByLang(lang);
        socket.to(game.room_id).emit("strategyQuestions", questions);

    }catch(err) {
        console.error(`Error Language Questions Handler ${err.message}`);
    }
}
async function handleGetMyQuestions(socket, {game_id, team_id, lang}) {
    try {
        const game = await gameService.getGameById(game_id);
        if (!game) {
            socket.emit('error', { message: "game not found" });
            return;
        }
        const team = await teamService.getTeamById(team_id);
        const myQuestions = await questionService.getMyQuestions(game.category_id, team.strategy_id, lang);
        if (!myQuestions.length) {
            socket.emit('error', { message: "questions group not found" });
            return;
        }
        const randomIndex = Math.floor(Math.random() * myQuestions.length);
        const question = myQuestions[randomIndex];
        socket.to(game_id).emit("receive_question", question.content);
        console.log(`🧠 question has send to team ${team.name}: \n${question}`);
    }catch(err) {
        console.error(`Error MyQuestions Handler ${err.message}`);
    }
}

module.exports = {handleGetQuestion,handleAddQuestion,handleGetCategoryQuestions,handleGetStrategyQuestions,handleGetLangQuestions,handleGetMyQuestions}






