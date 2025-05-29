const { prisma } = require('../../lib/prisma');
const Game = require('../../domain/entities/Game');

class GameService {

    async addGame(game_id, category_id, game_rounds, teams_count, lang, socket) {
        return prisma.game.create({
            data: {
                id: game_id,
                category_id: category_id,
                rounds: game_rounds,
                teams_count: teams_count,
                lang: lang,
                master_socket: socket
            }
        });
    }

    async getAllGames() {
        return  prisma.game.findMany();
    }

    async getGameById(id) {
        const result = await prisma.game.findUnique({
            where: { id }
        });
        if (!result) return null;
         return new Game(
                result?.id,
                result?.category_id,
                result?.master_socket,
                result?.rounds,
                result?.teams_count,
                result?.lang,
                result?.status,
                result?.created_at,

            );
    }

    async gameStarted(game_id) {
        await prisma.game.update({
            where: { id: game_id },
            data: { status: 'active' }
        });

        return  prisma.game.findUnique({
            where: { id: game_id }
        });
    }

    async getActiveGames() {
        return  prisma.game.findMany({
            where: { status: 'active' }
        });
    }

    async endGame(game_id) {
        await prisma.game.update({
            where: { id: game_id },
            data: { status: 'finished' }
        });

        return { success: true, message: "Game ended" };
    }
}

module.exports = GameService;
