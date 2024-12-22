const { Router } = require("express");
const equipeController = require("../controllers/equipeController"); // à définir dans votre contrôleur
const checkAuth = require("../middlewares/checkAuth"); // middleware d'authentification (si nécessaire)

const router = new Router();

router.get("/equipes", equipeController.getAll);
router.post("/equipes", checkAuth, equipeController.create);
router.get("/equipes/:id", equipeController.getOne);
router.patch("/equipes/:id", checkAuth, equipeController.update);
router.delete("/equipes/:id", checkAuth, equipeController.delete);
router.post("/equipes/:id/change-request", checkAuth, equipeController.sendChangeRequest);

module.exports = router;