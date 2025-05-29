const RepositoriesMySQL = require('../../infra/repositories/RepositoriesMySQL');
const Tile = require("../entities/Tile");



class TileRepository extends RepositoriesMySQL {
    constructor() {
        super("Tile");
    }

    async createTilesTable() {
        try {
            const sql =
                `CREATE TABLE IF NOT EXISTS Tile
                 (
                     id      CHAR(32)        PRIMARY KEY,
                     game_id CHAR(36)            NOT NULL,
                     x       INT,
                     y       INT,
                     color   VARCHAR(62),
                     clicked BOOLEAN         DEFAULT FALSE,
                     FOREIGN KEY (game_id) REFERENCES Game (id) ON DELETE CASCADE

                 )`;

            await this.createTable(sql);
        } catch (err) {
            console.error(`❌ Fout bij het sql van ${this.tableName} (domain laag):`, err.message)
        }
    }

    async getAllByGameId(game_id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE game_id = ? `;
            const results = await this.query(sql, [game_id]);
            if (results.length === 0) return null;
            return results.map(result => new Tile(
                result.id,
                result.game_id,
                result.x,
                result.y,
                result.color,
                result.clicked
            ));
        } catch (err) {
            console.error(`❌ Error in ${this.tableName} by getAllByGameId : `, err.message);
            return null;
        }
    }



}
module.exports = TileRepository;