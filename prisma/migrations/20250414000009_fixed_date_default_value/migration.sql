/*
  Warnings:

  - You are about to drop the column `accountId` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "accountId",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
