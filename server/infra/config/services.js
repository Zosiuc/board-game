const CategoryService = require("../../services/CategoryService");
const GameService = require("../../services/GameService");
const StrategyService = require("../../services/StrategyService");
const ModeratorService = require("../../services/ModeratorService");
const QuestionService = require("../../services/QuestionService");
const TeamService = require("../../services/TeamService");
const TeamQueAnsService = require("../../services/TeamQueAnsService");
const TileService = require("../../services/TileService");


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