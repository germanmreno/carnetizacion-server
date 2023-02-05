import express from "express";
import {
  actualizarEmpleado,
  buscarEmpleado,
  getEmpleado,
  getEmpleados, loginUser, registerUser, registrarEmpleado,
} from "../controllers/CarnetController.js";

const router = express.Router();

router.post("/search", buscarEmpleado);
router.get("/data", getEmpleados);
router.get("/data/:id", getEmpleado);
router.get("/profile/:id", getEmpleado);
router.put("/profile/:id", actualizarEmpleado);
router.post("/registro", registrarEmpleado);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
