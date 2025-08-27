const express = require('express');

const router = express.Router();
const {getMarketData} = require('../controllers/marketData');

router.get('/:symbol',getMarketData);

module.exports = router;
