const express = require('express');
const router = express.Router();
const { registerDonor, loginDonor , logoutDonor , searchDonor} = require('../controllers/donorController');

router.post('/register', registerDonor);
router.post('/login', loginDonor);
router.post('/searchDonor' , searchDonor)
router.get('/logoutDonor' , logoutDonor)

module.exports = router;
