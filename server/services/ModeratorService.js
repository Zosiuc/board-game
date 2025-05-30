const { prisma } = require('../lib/prisma');
const Moderator = require('../entities/Moderator');
class ModeratorService {

    async addModerator(name, game_id) {
        try {
            console.log("addModerator triggered");
            return await prisma.moderator.create({
                data: {
                    name: name,
                    game_id: game_id,
                },
                select:{
                    id: true
                }
            });

        } catch (err) {
            console.error("FOUT BIJ AANMAKEN MODERATOR:", err);
            throw err; // opnieuw gooien als je het hogerop wilt afhandelen
        }
    }

    async updateModerator(moderator) {
        return  prisma.moderator.update({
            where: { id: moderator.id },
            data: {
                name: moderator.name,
                game_id: moderator.game_id
            }
        });
    }

    async getModerator(id) {
        const result = await prisma.moderator.findUnique({
            where: { id:id }
        });
        return new Moderator(result?.id, result?.name, result?.game_id, result?.created_at);
    }

    async getModeratorByGameId(game_id) {
        return  prisma.moderator.findFirst({
            where: { game_id }
        });
    }
}

module.exports = ModeratorService;