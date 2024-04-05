-- DropForeignKey
ALTER TABLE "author" DROP CONSTRAINT "author_postUuid_fkey";

-- AlterTable
ALTER TABLE "author" ALTER COLUMN "postUuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "author" ADD CONSTRAINT "author_postUuid_fkey" FOREIGN KEY ("postUuid") REFERENCES "post"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
