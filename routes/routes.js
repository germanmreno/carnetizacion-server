import express from "express";
import {
  getEmpleado,
  getEmpleados, registrarEmpleado,
} from "../controllers/CarnetController.js";

const router = express.Router();

router.get("/data", getEmpleados);
router.get("/data/:id", getEmpleado);
router.post("/registro", registrarEmpleado);

export default router;
