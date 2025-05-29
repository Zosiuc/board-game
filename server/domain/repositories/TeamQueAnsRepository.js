const RepositoriesMySQL = require('../../infra/repositories/RepositoriesMySQL');
const TeamQueAns = require("../entities/TeamQueAns");

class TeamQueAnsRepository extends RepositoriesMySQL {
    constructor() {
        super("TeamQueAns");
    }

    async createTeamQueAnsTable() {
        try {
            const sql =
                `CREATE TABLE IF NOT EXISTS TeamQueAns
                 (
                     id           INT AUTO_INCREMENT PRIMARY KEY,
                     game_id      CHAR(36)            NOT NULL,
                     team_id      CHAR(36)            NOT NULL,
                     question_id  INT                 NOT NULL,
                     moderator_id INT                 NOT NULL,
                     answer       TEXT,
                     score        INT                          DEFAULT 0,
                     feedback     TEXT,
                     round_number INT,
                     created_at   TIMESTAMP                    DEFAULT CURRENT_TIMESTAMP,
                     updated_at   TIMESTAMP                    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                     FOREIGN KEY (game_id) REFERENCES Game (id) ON DELETE CASCADE,
                     FOREIGN KEY (team_id) REFERENCES Team (id) ON DELETE CASCADE,
                     FOREIGN KEY (question_id) REFERENCES Question (id) ON DELETE CASCADE,
                     FOREIGN KEY (moderator_id) REFERENCES Moderator (id) ON DELETE CASCADE

                 );`

            await this.createTable(sql);
        } catch (err) {
            console.error(`❌ Fout bij het sql van ${this.tableName} (domain laag):`, err.message)
        }
    }

    async getByGameId(game_id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE game_id = ?`;
            const results = await this.query(sql, [game_id]);
            if (results.length === 0) return null;
            return results.map(result => new TeamQueAns(
                    result.id,
                    result.game_id,
                    result.team_id,
                    result.question_id,
                    result.moderator_id,
                    result.answer,
                    result.points,
                    result.feedback,
                    result.created_at,
                    result.updated_at));

        } catch (err) {
            console.error(`❌ error in ${this.tableName} repo by getByGameId (domain laag): `, err.message)
        }

    }

    async getByTeamId(team_id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE team_id = ?`;
            const results = await this.query(sql, [team_id]);
            if (results.length === 0) return null;
            return results.map(result => new TeamQueAns(
                    result.id,
                    result.game_id,
                    result.team_id,
                    result.question_id,
                    result.moderator_id,
                    result.answer,
                    result.points,
                    result.feedback,
                    result.created_at,
                    result.updated_at));


        } catch (err) {
            console.error(`❌ error in ${this.tableName} repo  by getByTeamId (domain laag): `, err.message)
        }

    }

    async getByQuestionId(question_id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE question_id = ?`;
            const results = await this.query(sql, [question_id]);
            if (results.length === 0) return null;
            return results.map(result => new TeamQueAns(
                    result.id,
                    result.game_id,
                    result.team_id,
                    result.question_id,
                    result.moderator_id,
                    result.answer,
                    result.points,
                    result.feedback,
                    result.created_at,
                    result.updated_at));

        } catch (err) {
            console.error(`❌ error in ${this.tableName} repo  by getByQuestionId (domain laag): `, err.message)
        }

    }

    async getByModeratorId(moderator_id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE moderator_id = ?`;
            const results = await this.query(sql, [moderator_id]);
            if (results.length === 0) return null;

            return results.map(result => new TeamQueAns(
                result.id,
                result.game_id,
                result.team_id,
                result.question_id,
                result.moderator_id,
                result.answer,
                result.points,
                result.feedback,
                result.created_at,
                result.updated_at));

        } catch (err) {
            console.error(`❌ error in ${this.tableName} repo  by getByModeratorId (domain laag): `, err.message)
        }

    }

}

module.exports = TeamQueAnsRepository;
