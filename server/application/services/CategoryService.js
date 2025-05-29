const { prisma } = require('../../lib/prisma');
const Category = require("../../domain/entities/Category");


class CategoryService {

    async  addCategory(name) {
        return prisma.category.upsert({
            where: { name: name },
            update: name,
            create: name,
        });
    }
    async getCategoryById(id) {
        const category = await prisma.category.findUnique({where: {id}});
        return new Category(category?.id, category?.name);
    }
    async  getCategoryIdByName(name) {
        const category = await prisma.category.findUnique({ where: { name } });
        if (!category) throw new Error(`Category ${name} not found`);
        return category?.id;
    }

    async getCategories() {
        try {
            const results = await  prisma.category.findMany();
            return results.map(result => new Category(result?.id,result?.name));
        } catch (err) {
            console.error(err);
            return [];
        }
    }


    async  removeCategory(id) {

    }
}


module.exports = CategoryService;
