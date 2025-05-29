const { prisma } = require('../../lib/prisma');
class TeamQueAnsService {
    async addTeamQueAns(game_id, team_id, question_id, moderator_id, answer, round_number) {
        return  prisma.teamQueAns.create({
            data: {
                game_id:game_id,
                team_id:team_id,
                question_id:question_id,
                moderator_id:moderator_id,
                answer:answer,
                round_number:round_number
            }
        });
    }

    async getAllTeamQueAns() {
        return  prisma.teamQueAns.findMany();
    }

    async getTeamQueAnsById(id) {
        return  prisma.teamQueAns.findUnique({
            where: { id }
        });
    }

    async getTeamQueAnsByGameId(game_id) {
        return  prisma.teamQueAns.findMany({
            where: { game_id }
        });
    }

    async getTeamQueAnsByTeamId(team_id) {
        return  prisma.teamQueAns.findMany({
            where: { team_id }
        });
    }

    async getTeamQueAnsByModeratorId(moderator_id) {
        return  prisma.teamQueAns.findMany({
            where: { moderator_id }
        });
    }

    async getTeamQueAnsByQuestionId(question_id) {
        return  prisma.teamQueAns.findMany({
            where: { question_id }
        });
    }

    async updateTeamQueAns(teamQueAns) {
        return  prisma.teamQueAns.update({
            where: { id: teamQueAns.id },
            data: {
                game_id: teamQueAns.game_id,
                team_id: teamQueAns.team_id,
                question_id: teamQueAns.question_id,
                moderator_id: teamQueAns.moderator_id,
                answer: teamQueAns.answer,
                score: teamQueAns.score,
                feedback: teamQueAns.feedback,
                round_number: teamQueAns.round_number
            }
        });
    }

    async deleteTeamQueAns(teamQueAns) {
        try {
            await prisma.teamQueAns.delete({
                where: { id: teamQueAns.id }
            });
            return `TeamQueAns ${teamQueAns.id} Deleted Successfully`;
        } catch (err) {
            console.error("❌ Delete error:", err.message);
            return `TeamQueAns ${teamQueAns.id} Not Deleted`;
        }
    }


}


module.exports = TeamQueAnsService;

