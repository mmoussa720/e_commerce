/*
  Warnings:

  - The required column `id` was added to the `orders` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "orders_productId_customerId_key";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");
