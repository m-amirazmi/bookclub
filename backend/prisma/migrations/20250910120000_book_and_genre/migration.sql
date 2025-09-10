/*
  Warnings:

  - You are about to drop the column `publishedAt` on the `Book` table. All the data in the column will be lost.
  - Added the required column `publishedYear` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Book" DROP COLUMN "publishedAt",
ADD COLUMN     "publishedYear" INTEGER NOT NULL;
