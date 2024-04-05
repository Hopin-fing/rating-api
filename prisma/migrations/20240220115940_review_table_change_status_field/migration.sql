/*
  Warnings:

  - The values [ACCEPTED] on the enum `ReviewStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReviewStatus_new" AS ENUM ('NEW', 'APPROVED', 'REJECTED');
ALTER TABLE "review" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "review" ALTER COLUMN "status" TYPE "ReviewStatus_new" USING ("status"::text::"ReviewStatus_new");
ALTER TYPE "ReviewStatus" RENAME TO "ReviewStatus_old";
ALTER TYPE "ReviewStatus_new" RENAME TO "ReviewStatus";
DROP TYPE "ReviewStatus_old";
ALTER TABLE "review" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;
