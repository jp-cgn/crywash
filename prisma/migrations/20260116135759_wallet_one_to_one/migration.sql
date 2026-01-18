/*
  Warnings:

  - You are about to drop the column `walletId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `walletId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_walletId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "walletId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "walletId";

-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "balance" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");
