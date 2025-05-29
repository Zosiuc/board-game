const RepositoriesMySQL = require('../../infra/repositories/RepositoriesMySQL');
const Game = require('../entities/Game');

class GameRepository extends RepositoriesMySQL {
    constructor() {
        super("Game");
    }

    async createGamesTable() {
        try {
            const sql =
                `CREATE TABLE Game
                 (
                     id          CHAR(36) UNIQUE KEY                    NOT NULL DEFAULT (UUID()),
                     category_id INT                                    NOT NULL,
                     master_socket VARCHAR(62)                          NOT NULL,
                     rounds      INT                                    NOT NULL,
                     teams_count INT                                    NOT NULL,
                     lang        VARCHAR(32),
                     status      ENUM ('waiting', 'active', 'finished') NOT NULL DEFAULT 'waiting',
                     created_at  TIMESTAMP                                       DEFAULT CURRENT_TIMESTAMP,
                     FOREIGN KEY (category_id) REFERENCES Category (id)
                 )`;


            await this.createTable(sql);
        } catch (err) {
            console.error(`❌ Fout bij het sql van ${this.tableName} (domain laag):`, err);
            return err;
        }
    };


    async getGameByGameId(game_id) {
        try {
            const results = await this.getById({id: game_id});
            return results.length ?
                new Game(results.id, results.category_id, results.master_socket, results.rounds,  results.teams_count,results.lang,  results.status, results.created_at) :
                null;
        } catch (err) {
            console.error(`❌ Error in ${this.tableName} by getGameByGameId (domain laag): `, err.message);
            return err;
        }
    }

    async updateGameStatus(id, status) {
        await this.update(id, {status: status});
    }

    async getActiveGames() {
        try {

            const sql = `SELECT * FROM games WHERE status = 'active'`;
            const results = await this.query(sql);
            return results.map(result => new Game(
                result.id,
                result.category_id,
                result.master_socket,
                result.rounds,
                result.teams_count,
                result.lang,
                result.status,
                result.created_at
            ));
        } catch (err) {
            console.error(`❌ Error in ${this.tableName} by getActiveGames (domain laag): `, err.message);
            return err;
        }

    }
}

module.exports = GameRepository;
