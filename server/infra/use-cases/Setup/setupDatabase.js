const pool = require("../../../infra/database/databaseStarter");

const services = require("../../../infra/config/services");


const {
    categoryService,
    gameService,
    strategyService,
    moderatorService,
    questionService,
    teamService,
    teamQueAnsService,
    tileService
} = services;

const setupDatabase = async() => {
    console.log("Setup script wordt uitgevoerd...");

    try {

        // Create Database
        try {
            const connection = await pool.getConnection();
            await connection.execute("CREATE DATABASE IF NOT EXISTS thebestseller;");
            console.log("✅ Database 'thebestseller' is aangemaakt!");
            connection.release();
        } catch (err) {
            console.error('❌ Fout bij het aanmaken van database:', err.message)
        }


        // Creat Tables
        await categoryService.createCategoriesTable();
        await gameService.createGamesTable();
        await strategyService.createStrategiesTable()
        await moderatorService.createModeratorsTable();
        await questionService.createQuestionsTable();
        await teamService.createTeamsTable();
        await teamQueAnsService.createTeamQueAnsTable();
        await tileService.createTilesTable();


    } catch (error) {
        console.error('❌ Fout bij het aanmaken van tabellen:', error.message);
    }
}

setupDatabase()
    .then( ()=> console.log(`Finished setup database.`))
    .catch((error) => console.error('❌ Setup failed:', error.message));
module.exports = setupDatabase;

