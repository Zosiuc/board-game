const { prisma } = require('../../lib/prisma');

class TileService  {
    async addTile(id, game_id, x, y, color) {
        return prisma.tile.upsert({
            where: { id: id },
            create: {
                id: id,
                game_id: game_id,
                x: x,
                y: y,
                color: color
            },
            update: {
                game_id: game_id,
                x: x,
                y: y,
                color: color
            }
        });
    }

    async getTileById(id) {
        return  prisma.tile.findUnique({
            where: { id }
        });
    }

    async getGameTilesByGameId(game_id) {
        return  prisma.tile.findMany({
            where: { game_id }
        });
    }

    async updateTile(id, data) {
        return  prisma.tile.update({
            where: { id },
            data
        });
    }


}

module.exports = TileService;