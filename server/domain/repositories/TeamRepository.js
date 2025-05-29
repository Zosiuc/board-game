const RepositoriesMySQL = require('../../infra/repositories/RepositoriesMySQL');
const Team = require("../entities/Team");


class TeamRepository extends RepositoriesMySQL {
    constructor() {
        super("Team");
    }
    async createTeamsTable() {
        try {
            const sql =
                `CREATE TABLE IF NOT EXISTS Team
                 (
                     id          CHAR(36) UNIQUE PRIMARY KEY  DEFAULT (UUID()),
                     name        VARCHAR(35)         NOT NULL,
                     strategy_id INT      ,
                     game_id     CHAR(36)            NOT NULL DEFAULT (UUID()),
                     socket_id   VARCHAR(255) UNIQUE, 
                     points      INT DEFAULT 0,
                     color       VARCHAR(35)          NOT NULL,
                     current_tileId VARCHAR(255) ,
                     created_at  TIMESTAMP                    DEFAULT CURRENT_TIMESTAMP,
                     FOREIGN KEY (game_id) REFERENCES Game (id) ON DELETE CASCADE,
                     FOREIGN KEY (strategy_id) REFERENCES Strategy (id) ON DELETE SET NULL
                
                 )`;

            await this.createTable(sql);
        }catch(err) {console.error(`❌ Fout bij het sql van ${this.tableName} (domain laag):`, err.message)}
    }



    async getByName(name){
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE name = ?`;
            const results = await this.query(sql, [name]);
            if (results.length === 0) return null;
            return new Team(
                results[0].id,
                results[0].name,
                results[0].strategy_id,
                results[0].game_id,
                results[0].socket_id,
                results[0].points,
                results[0].color,
                results[0].current_tileId,
                results[0].created_at);
        }catch(err) {
            console.error(`❌ Fout bij getByName  (domain laag):`, err.message)
        }

    }

    async getTeamsByGameId(game_Id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE game_Id = ?`;
            const results = await this.query(sql, [game_Id]);
            if (results.length === 0) return null;
            return results.map(result => new Team(
                result.id,
                result.name,
                result.strategy_id,
                result.game_id,
                result.socket_id,
                result.points,
                result.color,
                result.current_tileId,
                result.created_at
            ));

        }catch(err) {
            console.error(`❌ Fout bij getByGameId  (domain laag):`, err.message)
        }
    }
    async getTeamsByStrategyId(strategy_id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE strategy_id = ?`;
            const results = await this.query(sql, [strategy_id]);
            if (results.length === 0) return null;
            return results.map(result => new Team(
                result.id,
                result.name,
                result.strategy_id,
                result.game_id,
                result.socket_id,
                result.points,
                result.color,
                result.current_tileId,
                result.created_at
            ));


        }catch(err) {
            console.error(`❌ Fout bij getTeamsByStrategyId  (domain laag):`, err.message);
            return null
        }
    }


}

module.exports = TeamRepository;
