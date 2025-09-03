-- CreateTable
CREATE TABLE "public"."Image" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "sha256" TEXT NOT NULL,
    "phash" TEXT,
    "mime" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "bytes" INTEGER NOT NULL,
    "storageKey" TEXT NOT NULL,
    "visibility" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_sha256_key" ON "public"."Image"("sha256");
