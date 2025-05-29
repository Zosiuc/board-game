const RepositoriesMySQL = require('../../infra/repositories/RepositoriesMySQL');
const Question = require('../entities/Question');


class QuestionRepository extends RepositoriesMySQL {
    constructor() {
        super("Question");
    }

    async createQuestionsTable() {
        try {
            const sql =
                `CREATE TABLE IF NOT EXISTS Question
                 (
                     id          INT AUTO_INCREMENT PRIMARY KEY,
                     category_id INT          NOT NULL,
                     strategy_id INT          NOT NULL,
                     lang        VARCHAR(25)  NOT NULL,
                     content    VARCHAR(1000) NOT NULL,
                     FOREIGN KEY (category_id) REFERENCES Category (id) ON DELETE CASCADE,
                     FOREIGN KEY (strategy_id) REFERENCES Strategy (id) ON DELETE CASCADE
                 )`;

            await this.createTable(sql);
        } catch (err) {
            console.error(`❌ Fout bij het sql van ${this.tableName} (domain laag):`, err.message);
            throw err;
        }
    }

    async addQuestion({category_id: categoryId, strategy_id: strategyId, lang: lang, content: content}) {
        try {
            return await this.insert({
                category_id: categoryId,
                strategy_id: strategyId,
                lang: lang,
                content: content
            });
        } catch (err) {
            console.error(`❌ Fout bij question insert van ${this.tableName} (domain laag):`, err.message);
            throw err;
        }
    }

    async getQuestionsByCategoryId(category_id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE category_id = ?`;
            const results = await this.query(sql, [category_id]);
            if (results.length === 0) return null;
            const questions = [];
            for (const result of results) {
                questions.push(new Question(result.id, result.category_id, result.strategy_id, result.content, result.lang));
            }
            return questions;
        } catch (err) {
            console.error(`❌ Fout bij getQuestionsByCategoryId  (domain laag):`, err.message);
            throw err;
        }
    }

    async getQuestionsByStrategyId(strategy_id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE strategy_id = ?`;
            const results = await this.query(sql, [strategy_id]);
            if (results.length === 0) return null;
            const questions = [];
            for (const result of results) {
                questions.push(new Question(result.id, result.category_id, result.strategy_id, result.content, result.lang));
            }
            return questions;

        } catch (err) {
            console.error(`❌ Fout bij getQuestionsByStrategyId  (domain laag):`, err.message);
            throw err;
        }
    }

    async getQuestionsByLang(lang) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE lang = ?`;
            const results = await this.query(sql, [lang]);
            if (results.length === 0) return null;
            const questions = [];
            for (const result of results) {
                questions.push(new Question(result.id, result.category_id, result.strategy_id, result.content, result.lang));
            }
            return questions;
        } catch (err) {
            console.error(`❌ Fout bij getQuestionsByLang  (domain laag):`, err.message);
            throw err
        }
    }

    async getMyQuestions(category_id, strategy_id, lang) {
        try {

            const sql = `SELECT * FROM ${this.tableName} WHERE category_id = ? AND strategy_id = ? AND lang = ?`;
            const results = await this.query(sql, [category_id, strategy_id, lang]);
            if (results.length === 0) return null;
            /*const questions = [];
            for (const result of results){
                questions.push( new Question(result.id, result.category_id, result.strategy_id, result.lang, result.question));
            }*/
            return results.map(result =>
                new Question(result.id, result.category_id, result.strategy_id, result.lang ,result.content));
        } catch (err) {
            console.error(`❌ Fout bij getQuestionsByLang  (domain laag):`, err.message);
            throw err;
        }
    }

    async  getRandomQuestion(strategyId, categoryId) {
        const [rows] = await this.query(
            `SELECT * FROM ${this.tableName} WHERE strategy_id = ? AND category_id = ? ORDER BY RAND() LIMIT 1`,
            [strategyId, categoryId]
        );
        return rows[0];
    }


}

module.exports = QuestionRepository;
