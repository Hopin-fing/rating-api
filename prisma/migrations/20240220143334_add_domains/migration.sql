-- AlterTable
ALTER TABLE "post" ADD COLUMN     "domain_uuid" UUID;

-- CreateTable
CREATE TABLE "Domain" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_domain_uuid_fkey" FOREIGN KEY ("domain_uuid") REFERENCES "Domain"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
