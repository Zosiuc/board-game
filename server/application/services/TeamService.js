const { prisma } = require('../../lib/prisma');
const Team = require("../../domain/entities/Team");

class TeamService {
    async getAllTeams() {
        return  prisma.team.findMany();
    }

    async addTeam(id, name, strategy_id, game_id, socket_id, color) {
        return  prisma.team.upsert({
            where: { id: id },
            create: {
                id:id,
                name:name,
                strategy_id:strategy_id,
                game_id: game_id,
                socket_id: socket_id,
                color: color
            },
            update:{
                name:name,
                strategy_id:strategy_id,
                game_id: game_id,
                socket_id: socket_id,
                color: color
            }
        });
    }

    async getTeamById(id) {
        const result = await prisma.team.findUnique({
            where: { id }
        });
        return new Team(
            result.id,
            result.name,
            result.strategy_id,
            result.game_id,
            result.socket_id,
            result.points,
            result.color,
            result.current_tileId,
            result.created_at
        );
    }

    async getTeamByName(name) {
        return  prisma.team.findFirst({
            where: { name }
        });
    }

    async getTeamsByGameId(game_id) {
        return  prisma.team.findMany({
            where: { game_id }
        });
    }

    async getTeamsByStrategyId(strategy_id) {
        return  prisma.team.findMany({
            where: { strategy_id }
        });
    }

    async updateTeam(id, data) {
        return  prisma.team.update({
            where: { id },
            data
        });
    }

    async removeTeam(team) {
        try {
            await prisma.team.delete({
                where: { id: team.id }
            });
            return `Team ${team.name} Removed`;
        } catch (error) {
            console.error("❌ Delete Error:", error.message);
            return `Team ${team.name} Not Removed`;
        }
    }
}


module.exports = TeamService;

