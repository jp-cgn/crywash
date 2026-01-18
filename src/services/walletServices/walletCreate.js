import prisma from "../../db/prisma.js";

export const createWallet = async (userId) => {
  await prisma.wallet.create({
    data: {
      balance: 0,
      userId: userId,
    },
  });
};
