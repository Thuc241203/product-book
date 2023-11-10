import { Router } from "express";
import { create, list, destroy, show, update, showProductsCate } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/category", list);
router.get("/category/:id", show);
router.get("/categoryProducts/:id", showProductsCate);
router.post("/category",checkPermission, create);
router.put("/category/:id",checkPermission, update);
router.delete("/category/:id",checkPermission, destroy);
export default router;
