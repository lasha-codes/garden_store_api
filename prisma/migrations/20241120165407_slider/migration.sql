-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sliderId" TEXT;

-- CreateTable
CREATE TABLE "Slider" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sliderId_fkey" FOREIGN KEY ("sliderId") REFERENCES "Slider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
