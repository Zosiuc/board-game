const CategoryService = require("../../application/services/CategoryService");
const GameService = require("../../application/services/GameService");
const StrategyService = require("../../application/services/strategyService");
const ModeratorService = require("../../application/services/ModeratorService");
const QuestionService = require("../../application/services/QuestionService");
const TeamService = require("../../application/services/TeamService");
const TeamQueAnsService = require("../../application/services/TeamQueAnsService");
const TileService = require("../../application/services/tileService");


module.exports = {
    categoryService: new CategoryService(),
    gameService: new GameService(),
    strategyService: new StrategyService(),
    moderatorService: new ModeratorService(),
    questionService:new QuestionService(),
    teamService: new TeamService(),
    teamQueAnsService: new TeamQueAnsService(),
    tileService: new TileService(),
};