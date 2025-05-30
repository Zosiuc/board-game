/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `moderatorId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `strategyId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Moderator` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Question` table. All the data in the column will be lost.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gameId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `correct` on the `TeamQueAns` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `TeamQueAns` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `TeamQueAns` table. All the data in the column will be lost.
  - The primary key for the `Tile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `lang` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `master_socket` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rounds` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teams_count` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_id` to the `Moderator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lang` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Strategy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Strategy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Strategy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_tileId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_id` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socket_id` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedback` to the `TeamQueAns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_id` to the `TeamQueAns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moderator_id` to the `TeamQueAns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_id` to the `TeamQueAns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `round_number` to the `TeamQueAns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `TeamQueAns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `TeamQueAns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clicked` to the `Tile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Tile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_id` to the `Tile` table without a default value. This is not possible if the table is not empty.
  - Made the column `teamId` on table `Tile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_moderatorId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_strategyId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_gameId_fkey";

-- DropForeignKey
ALTER TABLE "TeamQueAns" DROP CONSTRAINT "TeamQueAns_questionId_fkey";

-- DropForeignKey
ALTER TABLE "TeamQueAns" DROP CONSTRAINT "TeamQueAns_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Tile" DROP CONSTRAINT "Tile_teamId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "moderatorId",
DROP COLUMN "name",
DROP COLUMN "strategyId",
ADD COLUMN     "category_id" INTEGER,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lang" TEXT NOT NULL,
ADD COLUMN     "master_socket" TEXT NOT NULL,
ADD COLUMN     "rounds" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "strategy_id" INTEGER,
ADD COLUMN     "teams_count" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Game_id_seq";

-- AlterTable
ALTER TABLE "Moderator" DROP COLUMN "email",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "game_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "categoryId",
DROP COLUMN "text",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "lang" TEXT NOT NULL,
ADD COLUMN     "strategy_id" INTEGER;

-- AlterTable
ALTER TABLE "Strategy" ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP COLUMN "gameId",
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_tileId" TEXT NOT NULL,
ADD COLUMN     "game_id" TEXT NOT NULL,
ADD COLUMN     "points" INTEGER NOT NULL,
ADD COLUMN     "socket_id" TEXT NOT NULL,
ADD COLUMN     "strategy_id" INTEGER,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Team_id_seq";

-- AlterTable
ALTER TABLE "TeamQueAns" DROP COLUMN "correct",
DROP COLUMN "questionId",
DROP COLUMN "teamId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "feedback" TEXT NOT NULL,
ADD COLUMN     "game_id" TEXT NOT NULL,
ADD COLUMN     "moderator_id" INTEGER NOT NULL,
ADD COLUMN     "question_id" INTEGER NOT NULL,
ADD COLUMN     "round_number" INTEGER NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "team_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tile" DROP CONSTRAINT "Tile_pkey",
ADD COLUMN     "clicked" BOOLEAN NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "game_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET NOT NULL,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tile_id_seq";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_strategy_id_fkey" FOREIGN KEY ("strategy_id") REFERENCES "Strategy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moderator" ADD CONSTRAINT "Moderator_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_strategy_id_fkey" FOREIGN KEY ("strategy_id") REFERENCES "Strategy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD CONSTRAINT "Strategy_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQueAns" ADD CONSTRAINT "TeamQueAns_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQueAns" ADD CONSTRAINT "TeamQueAns_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQueAns" ADD CONSTRAINT "TeamQueAns_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQueAns" ADD CONSTRAINT "TeamQueAns_moderator_id_fkey" FOREIGN KEY ("moderator_id") REFERENCES "Moderator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_strategy_id_fkey" FOREIGN KEY ("strategy_id") REFERENCES "Strategy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tile" ADD CONSTRAINT "Tile_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tile" ADD CONSTRAINT "Tile_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
