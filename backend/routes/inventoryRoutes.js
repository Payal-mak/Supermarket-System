import { Router } from "express";
import {
  getAllInventory,
  getInventoryByProduct,
  updateInventory,
  getStockMovements,
} from "../controllers/inventoryController.js";

const router = Router();

router.get("/", getAllInventory);
router.get("/:productId", getInventoryByProduct);
router.put("/:productId", updateInventory);
router.get("/movements/:productId", getStockMovements);

export default router;
