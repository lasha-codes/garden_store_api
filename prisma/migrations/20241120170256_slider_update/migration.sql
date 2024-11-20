/*
  Warnings:

  - You are about to drop the column `sliderId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Slider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sliderId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sliderId";

-- DropTable
DROP TABLE "Slider";

-- CreateTable
CREATE TABLE "SliderProduct" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "SliderProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SliderProduct" ADD CONSTRAINT "SliderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
