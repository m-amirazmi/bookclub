/*
  Warnings:

  - A unique constraint covering the columns `[bookId]` on the table `ReadingProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReadingProgress_bookId_key" ON "public"."ReadingProgress"("bookId");
