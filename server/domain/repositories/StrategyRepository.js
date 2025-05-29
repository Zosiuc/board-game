const RepositoriesMySQL = require('../../infra/repositories/RepositoriesMySQL');
const Strategy = require('../entities/Strategy');
class StrategyRepository extends RepositoriesMySQL {
    constructor() {
        super("Strategy");
    }


    async createStrategiesTable() {
        try {
            const sql = `
                CREATE TABLE IF NOT EXISTS Strategy
                (
                    id    INT AUTO_INCREMENT PRIMARY KEY,
                    category_id  INT,
                    name  CHAR(36) NOT NULL UNIQUE,
                    icon  VARCHAR(255) NOT NULL DEFAULT 'default_icon.png',
                    color VARCHAR(50)  NOT NULL DEFAULT '#FFFFFF',
                    FOREIGN KEY (category_id) REFERENCES Category (id) ON DELETE SET NULL
                );
            `;
            await this.createTable(sql);
        }catch (err) {console.error(`❌ Fout bij het sql van ${this.tableName} (domain laag):`, err)}
    }


    async getIdByName(name) {
        try {
            return await this.getId(name);
        }catch (err) {console.error(`❌ Fout bij getIdByName van ${this.tableName} (domain laag):`, err)}
    }
    async getStrategyByName(strategy_name) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE name = ?`;
            const results = await this.query(sql, [strategy_name]);
            return results.length ? new Strategy(results[0].id ,results[0].category_id, results[0].name, results[0].icon, results[0].color): null;
        }catch(err) {console.error("❌ error by getStrategyByName (infra laag): ", err.message )}

    }

}

module.exports = StrategyRepository;
