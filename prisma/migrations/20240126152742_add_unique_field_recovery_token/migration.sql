/*
  Warnings:

  - A unique constraint covering the columns `[recoveryToken]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_recoveryToken_key" ON "user"("recoveryToken");
