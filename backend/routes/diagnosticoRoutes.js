const express = require("express");
const router = express.Router();
const controller = require("../controllers/diagnoaticoController");

router.get("/", controller.obtenerDiagnosticos);
router.get("/:id", controller.obtenerDiagnosticoPorId);
router.post("/", controller.crearDiagnostico);
router.put("/:id", controller.actualizarDiagnostico);
router.delete("/:id", controller.eliminarDiagnostico);

module.exports = router;
