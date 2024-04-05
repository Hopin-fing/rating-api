-- CreateTable
CREATE TABLE "user" (
    "uuid" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "post" (
    "uuid" UUID NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "alias" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "meta_title" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "rating_name" TEXT NOT NULL,
    "article_image" TEXT NOT NULL,
    "category_uuid" UUID NOT NULL,
    "creator_uuid" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "last_editor_uuid" UUID NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "product" (
    "uuid" UUID NOT NULL,
    "images" TEXT[],
    "title" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "pros" TEXT[],
    "cons" TEXT[],
    "features" TEXT[],
    "main_feature" TEXT NOT NULL,
    "content_md" TEXT NOT NULL,
    "link_button" TEXT NOT NULL,
    "post_uuid" UUID NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "category" (
    "uuid" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "alias" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "question_answer" (
    "uuid" UUID NOT NULL,
    "question" TEXT,
    "answer" TEXT,
    "post_uuid" UUID NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_answer_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "assessments" (
    "uuid" UUID NOT NULL,
    "like" INTEGER NOT NULL,
    "dislike" INTEGER NOT NULL,
    "product_uuid" UUID NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "author" (
    "uuid" UUID NOT NULL,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "position" TEXT NOT NULL,
    "postUuid" UUID NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "author_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "post_alias_key" ON "post"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "assessments_product_uuid_key" ON "assessments"("product_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "author_postUuid_key" ON "author"("postUuid");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "category"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_post_uuid_fkey" FOREIGN KEY ("post_uuid") REFERENCES "post"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answer" ADD CONSTRAINT "question_answer_post_uuid_fkey" FOREIGN KEY ("post_uuid") REFERENCES "post"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_product_uuid_fkey" FOREIGN KEY ("product_uuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author" ADD CONSTRAINT "author_postUuid_fkey" FOREIGN KEY ("postUuid") REFERENCES "post"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
