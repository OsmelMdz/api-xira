import express from "express";
import {
    crearTipoLlamada,
    obtenerTiposLlamada,
    obtenerTipoLlamadaPorId,
    actualizarTipoLlamada,
    eliminarTipoLlamada
} from "../controllers/tipoLlamada.controller.js";

const router = express.Router();

router.post("/", crearTipoLlamada);
router.get("/", obtenerTiposLlamada);
router.get("/:id", obtenerTipoLlamadaPorId);
router.put("/:id", actualizarTipoLlamada);
router.delete("/:id", eliminarTipoLlamada);

export default router;
