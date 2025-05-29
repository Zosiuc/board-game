

const { prisma } = require('../../lib/prisma');

class QuestionService {


    async getRandomQuestion(strategyId, categoryId) {
        const questions = await prisma.question.findMany({
            where: {
                strategy_id: strategyId,
                category_id: categoryId,
            }
        });

        if (questions.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
    }

    async addQuestion({ category_id, strategy_id, lang, content }) {
        return  prisma.question.create({
            data: {
                category_id,
                strategy_id,
                lang,
                content
            }
        });
    }

    async getAllQuestions() {
        return  prisma.question.findMany();
    }

    async getQuestionsByCategoryId(category_id) {
        return  prisma.question.findMany({
            where: { category_id }
        });
    }

    async getQuestionsByStrategyId(strategy_id) {
        return  prisma.question.findMany({
            where: { strategy_id }
        });
    }

    async getQuestionsByLang(lang) {
        return  prisma.question.findMany({
            where: { lang }
        });
    }

    async getQuestionById(question_id) {
        return  prisma.question.findUnique({
            where: { id: question_id }
        });
    }

    async getMyQuestions(category_id, strategy_id, lang) {
        return  prisma.question.findMany({
            where: {
                category_id,
                strategy_id,
                lang
            }
        });
    }

    async updateQuestion(question) {
        return  prisma.question.update({
            where: { id: question.id },
            data: {
                category_id: question.category_id,
                strategy_id: question.strategy_id,
                lang: question.lang,
                content: question.content
            }
        });
    }

    async deleteQuestion(id) {
        return  prisma.question.delete({
            where: { id }
        });

    }
}



module.exports = QuestionService;


