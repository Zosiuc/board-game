
const Repositories = require('../../infra/repositories/Repositories');

class CategoryRepository extends Repositories {
    constructor() {
        super("Category");
    }

    async addCategory(name) {
        try {
            await this.insert({name:name});
        }catch (err) {
            return console.error(`❌ Fout bij insert data van ${this.tableName} (domain laag):`, err)}
    }

    async getIdByName(name) {
        try {
            return await this.getId(name);
        }catch (err) {console.error(`❌ Fout bij getIdByName van ${this.tableName} (domain laag):`, err)}
    }

}

module.exports = CategoryRepository;
