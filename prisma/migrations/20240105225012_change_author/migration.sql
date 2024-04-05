/*
  Warnings:

  - You are about to drop the column `postUuid` on the `author` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "author_postUuid_key";

-- AlterTable
ALTER TABLE "author" DROP COLUMN "postUuid";
