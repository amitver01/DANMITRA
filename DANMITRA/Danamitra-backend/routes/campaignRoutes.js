const express = require('express');
const router = express.Router();
const { createCampaign, deleteCampaign , campaign } = require('../controllers/campaignController');

router.post('/create', createCampaign);
router.post('/delete', deleteCampaign);
router.get('/campaign', campaign);

module.exports = router;
