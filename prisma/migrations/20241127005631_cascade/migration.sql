-- DropForeignKey
ALTER TABLE "SliderProduct" DROP CONSTRAINT "SliderProduct_productId_fkey";

-- AddForeignKey
ALTER TABLE "SliderProduct" ADD CONSTRAINT "SliderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
