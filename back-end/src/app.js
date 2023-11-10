import cors from "cors";
import express from "express";

import authRouter from "./routers/auth";
import roleRouter from "./routers/role";
import reviewRouter from "./routers/reviews";
import userRouter from "./routers/User";
import imageRouter from "./routers/uploadImage";
import statusOrderRouter from "./routers/stauts_order";
import category from "./routers/category";
import products from "./routers/products";
import carts from "./routers/carts";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", roleRouter);
app.use("/api", reviewRouter);
app.use("/api", userRouter);
app.use("/api", imageRouter);
app.use("/api", statusOrderRouter);
app.use("/api", category);
app.use("/api", products);
app.use("/api", carts);

export const viteNodeApp = app;
