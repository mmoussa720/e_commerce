/*
  Warnings:

  - You are about to drop the column `accountId` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,3)`.
  - You are about to alter the column `quality` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(2,2)`.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "accountId",
ALTER COLUMN "price" SET DATA TYPE DECIMAL(6,3),
ALTER COLUMN "quality" SET DATA TYPE DECIMAL(2,2);
