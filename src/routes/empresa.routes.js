import express from "express";
import {
    crearEmpresa,
    obtenerEmpresas,
    obtenerEmpresaPorId,
    actualizarEmpresa,
    eliminarEmpresa,
    buscarEmpresaPorNumero,
} from "../controllers/empresa.controller.js";
import subirImagen from "../middlewares/subirImagen.js";

const router = express.Router();

router.post("/", subirImagen.single("logoImagen"), crearEmpresa);
router.get("/", obtenerEmpresas);
router.get("/:id", obtenerEmpresaPorId);
router.put("/:id", subirImagen.single("logoImagen"), actualizarEmpresa);
router.delete("/:id", eliminarEmpresa);
router.get("/numero/:numero", buscarEmpresaPorNumero);

export default router;
