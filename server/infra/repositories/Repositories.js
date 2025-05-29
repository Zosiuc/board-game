const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // nodig voor Supabase
    },
});


module.exports = pool;

class RepositoriesPostgres {
    constructor(tableName) {
        this.pool = pool;
        this.tableName = tableName;
    }


    async getId(name) {
        try {
            const sql = `SELECT id FROM ${this.tableName} WHERE name = $1`;
            const results = await this.query(sql, [name]);
            return results.length ? results[0].id :
                console.error(`"${name}" not found in "${this.tableName}"`);
        } catch (err) {
            console.error("❌ error by getId (infra laag):", err.message);
        }
    }

    async getById(id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id = $1`;
            const results = await this.query(sql, [id]);
            return results.length ? results[0] : null;
        } catch (err) {
            console.error("❌ error by getById (infra laag):", err.message);
        }
    }

    async getAll() {
        try {
            const sql = `SELECT * FROM ${this.tableName}`;
            return this.query(sql);
        } catch (err) {
            console.error("❌ error by getAll (infra laag):", err.message);
        }
    }

    async insert(data) {
        try {
            const keys = Object.keys(data);
            const values = Object.values(data);
            const columns = keys.join(', ');
            const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

            // Voorbeeld ON CONFLICT op basis van "id"
            const updateClause = keys
                .map((key, i) => `${key} = EXCLUDED.${key}`)
                .join(', ');

            const sql = `INSERT INTO ${this.tableName} (${columns}) 
                         VALUES (${placeholders})
                         ON CONFLICT (id) DO UPDATE SET ${updateClause}`;

            return await this.query(sql, values);
        } catch (err) {
            console.error("❌ Error bij insert data (infra laag):", err.message);
            throw err;
        }
    }

    async update(id, data) {
        try {
            const keys = Object.keys(data);
            const values = Object.values(data);
            const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
            const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${keys.length + 1}`;
            return await this.query(sql, [...values, id]);
        } catch (err) {
            console.error("❌ error by update data (infra laag):", err.message);
        }
    }

    async delete(id) {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE id = $1`;
            return await this.query(sql, [id]);
        } catch (err) {
            console.error("❌ error by delete data (infra laag):", err.message);
        }
    }
}

module.exports = RepositoriesPostgres;
