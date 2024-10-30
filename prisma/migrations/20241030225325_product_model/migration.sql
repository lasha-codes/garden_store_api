-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('dollar', 'euro', 'lari');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "images" TEXT[],
    "geo_title" TEXT NOT NULL,
    "eng_title" TEXT NOT NULL,
    "geo_description" TEXT NOT NULL,
    "eng_description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "color" TEXT,
    "qty" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
