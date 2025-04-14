/*
  Warnings:

  - Added the required column `totalPrice` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "totalPrice" DECIMAL(8,3) NOT NULL;
