const RepositoriesMySQL = require('../../infra/repositories/RepositoriesMySQL');
const Moderator = require('../entities/Moderator');

class ModeratorRepository extends RepositoriesMySQL {
    constructor() {
        super("Moderator");
    }

    async createModeratorsTable() {
        try {
            const sql =
                `CREATE TABLE IF NOT EXISTS Moderator
                 (
                     id         INT AUTO_INCREMENT PRIMARY KEY,
                     name       VARCHAR(35)         NOT NULL,
                     game_id    CHAR(36) UNIQUE KEY NOT NULL DEFAULT (UUID()),
                     created_at TIMESTAMP                    DEFAULT CURRENT_TIMESTAMP,
                     FOREIGN KEY (game_id) REFERENCES Game (id)
                 )`;


            await this.createTable(sql);
        }catch (err) {
            console.error(`❌ Fout bij het sql van ${this.tableName} (domain laag):`, err);
            return err;
        }
    }
    async getModerator(id) {
        try {
            const results = await this.getById(id);
            //console.log("getModerator:", results)
            return new Moderator(results.id, results.name, results.game_id, results.created_at);
        }catch(err) {
            console.error("❌ error by getModerator (domain laag): ", err.message );
            return err;
        }
    }
    async getByGameId(game_id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE game_id = ?`;
            const results = await this.query(sql, [game_id]);
            if (results.length === 0)  {
                console.error("moderators not found");
                return null
            }

            return  new Moderator(results[0].id, results[0].name, results[0].game_id, results[0].created_at);
        }catch(err) {
            console.error("❌ error by getByGameId (domain laag): ", err.message );
            return err.message;
        }
    }
    async addModerator(name, game_id) {
        try {
            return await this.insert({name:name, game_id:game_id});
        }catch(err) {
            console.error(`❌ error by addModerator (domain laag)${name}-${game_id}: `, err.message );
            return err;
        }
    }

}

module.exports = ModeratorRepository;
