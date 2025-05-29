const services = require("../../../infra/config/services");

const {
    categoryService,
    gameService,
    strategyService,
    moderatorService,
    questionService,
    teamService,
    teamQueAnsService
} = services;
/**
 * this module try our services
 */
const startGame = async () =>{

    await gameService.addGame("142we");
    const game = await gameService.loadGame("142we");

    await moderatorService.addModerator({name:"Jack",game_id:game.id});
    const moderator = await moderatorService.getModeratorByGameId(game.id);

    const categoryId = await categoryService.getCategoryIdByName("general");

    const strategyId1 = await strategyService.getStrategyIdByName("lunar");
    const strategyId2 = await strategyService.getStrategyIdByName("Chance");
    const strategyId3 = await strategyService.getStrategyIdByName("Domino House");

    console.log(await teamService.addTeam({id:"qwe-123",name:"Team3",strategy_id:strategyId3, game_id:game.id}));
    console.log(await teamService.addTeam({id:"asd-456",name:"Team1",strategy_id:strategyId1, game_id:game.id}));
    console.log(await teamService.addTeam({id:"htf-723",name:"Team2",strategy_id:strategyId2, game_id:game.id}));

    const lunarTeams = await teamService.getTeamsByStrategyId(strategyId1);
    const ChanceTeams = await teamService.getTeamsByStrategyId(strategyId2);

    const team1= await teamService.getTeamById("asd-456");
    const team2 = await teamService.getTeamById("htf-723");
    const team3 = await teamService.getTeamById("qwe-123");

    const question1 = await questionService.getQuestionById("300");

    console.log(await teamQueAnsService.addTeamQueAns({
        game_id:game.id,
        team_id:team1.id,
        question_id:question1.id,
        moderator_id:moderator.id,
        answer:"hallo, this is answer 1",
        points:"10",
        feedback:"this is feedback 1"
    }));

    const teamQueAns1 = await teamQueAnsService.getTeamQueAnsByQuestionId(question1.id);
    for (const one of teamQueAns1) {
        console.log(await teamQueAnsService.getTeamQueAnsById(one.id));
        //console.log(await teamQueAnsService.updateTeamQueAns({id:one.id,feedback:"this is updated feedback"}));
        //console.log(await  teamQueAnsService.deleteTeamQueAns(one));
    }

















}

startGame().catch(err=>{console.error(err.message)})