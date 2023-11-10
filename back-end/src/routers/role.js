import { Router } from "express";
import { create, list, deleteRo, showRoleById, update } from "../controllers/role";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/role", list);
router.get("/role/:id", showRoleById);
router.post("/role",checkPermission, create);
router.patch("/editRole",checkPermission, update);
router.delete("/role/:id",checkPermission, deleteRo);
export default router;
