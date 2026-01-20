import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import walletRoutes from "./routes/wallet.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.send({ message: "Verbunden" });
});
app.use("/auth", authRoutes);
app.use("/wallet", walletRoutes);

app.listen(PORT, () => {
  console.log(PORT);
  console.log("testroute: http://localhost:3000/test");
});
