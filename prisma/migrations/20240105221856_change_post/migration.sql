/*
  Warnings:

  - You are about to drop the column `authorUuid` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_authorUuid_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "authorUuid",
ADD COLUMN     "author_uuid" UUID;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_author_uuid_fkey" FOREIGN KEY ("author_uuid") REFERENCES "author"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
