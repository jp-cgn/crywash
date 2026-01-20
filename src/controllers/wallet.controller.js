import prisma from "../db/prisma.js";

export const createWallet = async (req, res) => {
  try {
    const userId = req.user.id;
    let { name } = req.body;
    name = name ?? "wallet";
    if (!userId) {
      console.log(userId);
      return res.status(401).json({ message: "Not authorized" });
    }
    const wallet = await prisma.wallet.create({
      data: {
        name: name,
        userId: userId,
      },
    });
    return res.status(201).json({ message: "Wallet created", wallet: wallet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const getWallets = async (req, res) => {
  try {
    let { page, pageSize } = req.query;
    page = Number(page);
    pageSize = Number(pageSize);
    if (!page || page < 1) {
      page = 1;
    }
    if (!pageSize || pageSize < 1 || pageSize > 100) {
      pageSize = 10;
    }
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(userId);

    const wallets = await prisma.wallet.findMany({
      where: { userId: userId, status: 0 },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return res.status(200).json({ wallets: wallets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
