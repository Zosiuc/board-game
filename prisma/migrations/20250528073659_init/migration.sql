/*
  Warnings:

  - You are about to drop the column `teamId` on the `Tile` table. All the data in the column will be lost.
  - Made the column `category_id` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `strategy_id` on table `Game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `strategy_id` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `strategy_id` on table `Team` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `team_id` to the `Tile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_strategy_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_strategy_id_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_strategy_id_fkey";

-- DropForeignKey
ALTER TABLE "Tile" DROP CONSTRAINT "Tile_teamId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "category_id" SET NOT NULL,
ALTER COLUMN "strategy_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "strategy_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "strategy_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tile" DROP COLUMN "teamId",
ADD COLUMN     "team_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_strategy_id_fkey" FOREIGN KEY ("strategy_id") REFERENCES "Strategy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_strategy_id_fkey" FOREIGN KEY ("strategy_id") REFERENCES "Strategy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_strategy_id_fkey" FOREIGN KEY ("strategy_id") REFERENCES "Strategy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tile" ADD CONSTRAINT "Tile_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
