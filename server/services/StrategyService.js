const { prisma } = require('../lib/prisma');
const Strategy = require('../entities/Strategy');


class StrategyService {

    async addStrategy({ category_id, name, icon, color }) {
        try {
            await prisma.strategy.create({
                data: { category_id, name, icon, color }
            });
            return `Strategy: ${name} added successfully.`;
        } catch (err) {
            console.error("❌ Error adding strategy:", err.message);
            return `Strategy: ${name} not added.`;
        }
    }

    async getStrategyIdByName(name) {
        const strategy = await prisma.strategy.findUnique({
            where: { name }
        });
        return strategy?.id;
    }

    async getStrategyById(strategy_id) {
        return  prisma.strategy.findUnique({
            where: { id: strategy_id }
        });
    }

    async getStrategyByName(strategy_name) {
        try {

            return prisma.strategy.findUnique({
                where: { name: strategy_name}
            });
        }catch(err) {
            console.error(err);
        }
    }

    async getStrategies() {
        try {
            return await prisma.strategy.findMany();
            
        } catch (err) {
            console.error("❌ Error fetching strategies:", err);
            return [];
        }
    }

    async updateStrategy(strategy_id, data) {
        try {
            await prisma.strategy.update({
                where: { id: strategy_id },
                data
            });
            const updated = await prisma.strategy.findUnique({ where: { id: strategy_id } });
            return `Strategy ${updated?.name} updated successfully.`;
        } catch (err) {
            console.error("❌ Error updating strategy:", err.message);
            return `Strategy with id ${strategy_id} can't be updated.`;
        }
    }

    async removeStrategy(strategy_id) {
        try {
            const strategy = await prisma.strategy.findUnique({ where: { id: strategy_id } });
            if (!strategy) return `Strategy not found.`;

            await prisma.strategy.delete({ where: { id: strategy_id } });
            return `Strategy ${strategy?.name} deleted successfully.`;
        } catch (err) {
            console.error("❌ Error deleting strategy:", err.message);
            return `Strategy with id ${strategy_id} can't be deleted.`;
        }
    }

}


module.exports = StrategyService;


