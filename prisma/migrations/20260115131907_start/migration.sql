-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passsword" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "walletId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "balance" INTEGER NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
