const express = require('express');
const router = express.Router();
const { registerOrg, loginOrg } = require('../controllers/orgController');

router.post('/register', registerOrg);
router.post('/login', loginOrg);

module.exports = router;
