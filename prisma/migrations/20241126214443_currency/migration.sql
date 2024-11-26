-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "currency" DROP NOT NULL,
ALTER COLUMN "currency" SET DEFAULT 'lari';
