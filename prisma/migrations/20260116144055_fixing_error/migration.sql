-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- DropIndex
DROP INDEX "Wallet_userId_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
