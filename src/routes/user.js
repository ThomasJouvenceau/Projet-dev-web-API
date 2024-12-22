const { Router } = require("express");
const userController = require("../controllers/user"); 
const checkAuth = require("../middlewares/Auth"); 

const router = new Router();

router.get("/users", userController.getAll);
router.post("/users", checkAuth, userController.create);
router.get("/users/:id", userController.getOne);
router.patch("/users/:id", checkAuth, userController.update);
router.delete("/users/:id", checkAuth, userController.delete);
router.post("/users/:id/change-request", checkAuth, userController.sendChangeRequest);

module.exports = router;