const express = require('express');
const { addTeam, updateTeam, addPlayer, updatePlayer } = require('../controllers/userController');

const router = express.Router();

router.post('/team', addTeam);

router.put('/team/:id', updateTeam);

router.post('/player', addPlayer);

router.put('/player/:id', updatePlayer);

module.exports = router;