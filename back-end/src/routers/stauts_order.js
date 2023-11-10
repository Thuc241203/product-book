import { Router } from "express";
import { create, list, showStatusOrderById, deleteStatusOrder, update } from "../controllers/status_order";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/status_order", list);
router.get("/status_order/:id", showStatusOrderById);
router.post("/status_order", checkPermission, create);
router.patch("/editStatusOrder", checkPermission, update);
router.delete("/status_order/:id", checkPermission, deleteStatusOrder);
export default router;
