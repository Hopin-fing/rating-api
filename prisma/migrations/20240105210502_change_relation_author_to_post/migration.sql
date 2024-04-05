-- DropForeignKey
ALTER TABLE "author" DROP CONSTRAINT "author_postUuid_fkey";

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "authorUuid" UUID;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorUuid_fkey" FOREIGN KEY ("authorUuid") REFERENCES "author"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
