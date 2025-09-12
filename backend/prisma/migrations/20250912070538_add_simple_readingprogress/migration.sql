/*
  Warnings:

  - You are about to drop the `ReadingProgress` table. If the table is not empty, all the data it contains will be lost.
*/

-- DropForeignKey
ALTER TABLE "public"."ReadingProgress" DROP CONSTRAINT "ReadingProgress_bookId_fkey";

-- AlterTable
ALTER TABLE "public"."Book" ADD COLUMN "readingProgress" INTEGER;

-- DropTable
DROP TABLE "public"."ReadingProgress";

-- DropEnum
DROP TYPE "public"."ReadingStatus";
