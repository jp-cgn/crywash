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

export const deleteWallet = async (req, res) => {
  //console.log("!");
  try {
    const userId = req.user.id;
    const { walletId } = req.params;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!walletId) {
      return res.status(400).json({ message: "Wallet-Id wrong" });
    }

    const result = await prisma.wallet.updateMany({
      where: {
        id: walletId,
        userId: userId,
        status: 0,
      },
      data: {
        status: 99,
      },
    });

    if (result.count === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Wallet not found" });
    }
    return res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
