const { Router } = require("express");
const equipeController = require("../controllers/equipe"); 
const checkAuth = require("../middlewares/Auth"); 

const router = new Router();

router.get("/equipes", equipeController.getAll);
router.post("/equipes", equipeController.create);
router.get("/equipes/:id", equipeController.getOne);
router.patch("/equipes/:id", checkAuth, equipeController.update);
router.delete("/equipes/:id", checkAuth, equipeController.delete);
router.post("/equipes/:id/change-request", checkAuth, equipeController.sendChangeRequest);

module.exports = router;