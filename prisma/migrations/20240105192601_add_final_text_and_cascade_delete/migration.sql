-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_post_uuid_fkey";

-- DropForeignKey
ALTER TABLE "question_answer" DROP CONSTRAINT "question_answer_post_uuid_fkey";

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "final_text" TEXT;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_post_uuid_fkey" FOREIGN KEY ("post_uuid") REFERENCES "post"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answer" ADD CONSTRAINT "question_answer_post_uuid_fkey" FOREIGN KEY ("post_uuid") REFERENCES "post"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
