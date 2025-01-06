/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `OnRampTransac` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OnRampTransac_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransac_token_key" ON "OnRampTransac"("token");
