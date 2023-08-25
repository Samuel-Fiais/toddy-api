/*
  Warnings:

  - You are about to drop the column `totalSalesId` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the `total_sales` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cardDiscount` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_totalSalesId_fkey";

-- DropForeignKey
ALTER TABLE "total_sales" DROP CONSTRAINT "total_sales_paymentId_fkey";

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "totalSalesId",
ADD COLUMN     "cardDiscount" MONEY NOT NULL,
ADD COLUMN     "paymentId" VARCHAR(36) NOT NULL;

-- DropTable
DROP TABLE "total_sales";

-- CreateTable
CREATE TABLE "sale-items" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "totalValue" MONEY NOT NULL,
    "totalSalesId" VARCHAR(36) NOT NULL,

    CONSTRAINT "sale-items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sale-items_alternateId_key" ON "sale-items"("alternateId");

-- AddForeignKey
ALTER TABLE "sale-items" ADD CONSTRAINT "sale-items_totalSalesId_fkey" FOREIGN KEY ("totalSalesId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
