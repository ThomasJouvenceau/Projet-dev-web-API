const express = require('express');
const adminController = require('../src/controllers/adminController');

const router = express.Router();

router.post('/create', adminController.createItem);
router.put('/update/:id', adminController.updateItem);
router.delete('/delete/:id', adminController.deleteItem);
router.post('/accept/:id', adminController.acceptUserModification);
router.post('/reject/:id', adminController.rejectUserModification);

module.exports = router;