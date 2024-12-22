const { Router } = require("express");
const adminController = require("../controllers/admin"); 
const checkAuth = require("../middlewares/Auth"); 

const router = new Router();
router.get("/admins", checkAuth, adminController.getAllAdmins);
router.post("/admins", checkAuth, adminController.createAdmin);
router.get("/admins/:id", checkAuth, adminController.getAdminById);
router.patch("/admins/:id", checkAuth, adminController.updateAdmin);
router.delete("/admins/:id", checkAuth, adminController.deleteAdmin);

module.exports = router;