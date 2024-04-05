-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('NEW', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "status" "ReviewStatus" NOT NULL DEFAULT 'NEW';
