const { Router } = require("express");
const matchController = require("../controllers/match"); 
const checkAuth = require("../middlewares/Auth"); 

const router = new Router();

router.get("/matches", matchController.getAllMatches);
router.post("/matches", matchController.createMatch);
router.get("/matches/:id", matchController.getMatchById);
router.patch("/matches/:id", matchController.updateMatch);
router.delete("/matches/:id", matchController.deleteMatch);

module.exports = router;
