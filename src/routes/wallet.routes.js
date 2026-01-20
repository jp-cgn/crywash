import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createWallet,
  deleteWallet,
  getWallets,
} from "../controllers/wallet.controller.js";

const router = express.Router();

router.get("/myWallets", authMiddleware, getWallets);
router.post("/create", authMiddleware, createWallet);
router.delete("/delete/:walletId", authMiddleware, deleteWallet);

export default router;
