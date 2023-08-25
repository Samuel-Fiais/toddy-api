/*
  Warnings:

  - Added the required column `cardDiscount` to the `total_sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `total_sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "conversion" INTEGER,
ADD COLUMN     "isBulk" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "total_sales" ADD COLUMN     "cardDiscount" MONEY NOT NULL,
ADD COLUMN     "paymentId" VARCHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE "payment_types" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "payment_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_types_alternateId_key" ON "payment_types"("alternateId");

-- AddForeignKey
ALTER TABLE "total_sales" ADD CONSTRAINT "total_sales_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
