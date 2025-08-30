const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getWatchlist,
    addSymbol,
    removeSymbol,
    clearWatchlist,
    addMultipleSymbols
} = require('../controllers/watchList');

// All routes require authentication
router.use(auth);

// GET /api/watchlist - Get user's watchlist
router.get('/', getWatchlist);

// POST /api/watchlist - Add symbol to watchlist
router.post('/', addSymbol);

// POST /api/watchlist/multiple - Add multiple symbols to watchlist
router.post('/multiple', addMultipleSymbols);

// DELETE /api/watchlist/:symbol - Remove symbol from watchlist
router.delete('/:symbol', removeSymbol);

// DELETE /api/watchlist - Clear entire watchlist
router.delete('/', clearWatchlist);

module.exports = router;
