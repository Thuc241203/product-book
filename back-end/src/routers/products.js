import { Router } from "express";
import { create, list, remote, show, update } from "../controllers/products";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/products", list);
router.get("/product/:id", show);
router.post("/products", checkPermission, create);
router.put("/product/:id", checkPermission, update);
router.delete("/product/:id", checkPermission, remote);
export default router;
