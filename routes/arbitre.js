const { Router } = require("express");
const arbitreController = require("../controllers/arbitre"); 
const checkAuth = require("../middlewares/checkAuth"); 

const router = new Router();

router.get("/arbitres", arbitreController.getAllArbitres);
router.post("/arbitres", arbitreController.createArbitre);
router.get("/arbitres/:id", arbitreController.getArbitreById);
router.patch("/arbitres/:id", arbitreController.updateArbitre);
router.delete("/arbitres/:id", arbitreController.deleteArbitre);

module.exports = router;
