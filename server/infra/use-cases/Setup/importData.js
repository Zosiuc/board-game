const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const { prisma } = require('../../../lib/prisma');
const csvFilePath = path.join(__dirname, "../../../data/questionstable.csv");

if (!fs.existsSync(csvFilePath)) {
    console.error("❌ CSV-bestand niet gevonden:", csvFilePath);
    process.exit(1);
}

const importData = () => {
    const questionsArray = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csvParser({ separator: ";", mapHeaders: ({ header }) => header.trim() }))
            .on("data", (row) => {
                questionsArray.push({
                    strategy: row["Strategie"],
                    lang: "en",
                    question: row["QEnglish"],
                });
                questionsArray.push({
                    strategy: row["Strategie"],
                    lang: "nl",
                    question: row["QDutch"],
                });
                questionsArray.push({
                    strategy: row["Strategie"],
                    lang: "da",
                    question: row["QDanish"],
                });
            })
            .on("end", async () => {
                try {
                    // Voeg category 'general' toe of haal op als die al bestaat
                    const category = await prisma.category.create({
                        data: { name: 'general' }
                    });

                    const categoryId = category.id;

                    const uniqueStrategies = [
                        ...new Set(questionsArray.map((q) => q.strategy)),
                    ];

                    await Promise.all(
                        uniqueStrategies.map((strategy) =>
                            prisma.strategy.create({
                                data: {
                                    name: strategy,
                                    category_id: categoryId,
                                    icon: `/strategies/${strategy.replaceAll(" ", "-")}.png`,
                                    color: "#000000",
                                },
                            })
                        )
                    );

                    const knownStrategies = new Set([
                        "Domino House",
                        "Chance",
                        "Jysk",
                        "Klaphatten",
                        "Lunar",
                        "Megatrends",
                        "Safeline",
                        "Sales management",
                        "Top of the World",
                    ]);

                    for (const questionObject of questionsArray) {
                        if (!knownStrategies.has(questionObject.strategy)) continue;

                        const strategy = await prisma.strategy.findFirst({
                            where: {
                                name: questionObject.strategy,
                                category_id: categoryId,
                            },
                        });

                        if (!strategy) {
                            console.warn(
                                `⚠️ Strategie '${questionObject.strategy}' niet gevonden.`
                            );
                            continue;
                        }

                        await prisma.question.create({
                            data: {
                                category_id: categoryId,
                                strategy_id: strategy.id,
                                lang: questionObject.lang,
                                content: questionObject.question,
                            },
                        });
                    }

                    resolve();
                } catch (error) {
                    console.error("❌ Fout bij importeren:", error);
                    reject(error.message);
                }
            });
    });
};

importData()
    .then(() => {
        console.log("✅ Import voltooid!");
        prisma.$disconnect();
    })
    .catch((error) => {
        console.error("❌ Import mislukt:", error.message);
        prisma.$disconnect();
    });

module.exports = importData;
