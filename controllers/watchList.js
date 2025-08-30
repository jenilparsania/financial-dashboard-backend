const Watchlist = require('../models/Watchlist');

// Get user's watchlist
const getWatchlist = async (req, res) => {
    try {
        const userId = req.user.id;
        
        let watchlist = await Watchlist.findOne({ userId });
        
        if (!watchlist) {
            // Create empty watchlist if it doesn't exist
            watchlist = new Watchlist({
                userId,
                symbols: []
            });
            await watchlist.save();
        }
        
        res.json({
            success: true,
            data: watchlist
        });
    } catch (error) {
        console.error('Error getting watchlist:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get watchlist'
        });
    }
};

// Add symbol to watchlist
const addSymbol = async (req, res) => {
    try {
        const userId = req.user.id;
        const { symbol } = req.body;
        
        if (!symbol) {
            return res.status(400).json({
                success: false,
                error: 'Symbol is required'
            });
        }
        
        // Convert to uppercase for consistency
        const symbolUpper = symbol.toUpperCase();
        
        let watchlist = await Watchlist.findOne({ userId });
        
        if (!watchlist) {
            // Create new watchlist if it doesn't exist
            watchlist = new Watchlist({
                userId,
                symbols: [symbolUpper]
            });
        } else {
            // Check if symbol already exists
            if (watchlist.symbols.includes(symbolUpper)) {
                return res.status(400).json({
                    success: false,
                    error: 'Symbol already exists in watchlist'
                });
            }
            
            // Add symbol to existing watchlist
            watchlist.symbols.push(symbolUpper);
        }
        
        await watchlist.save();
        
        res.json({
            success: true,
            message: `Symbol ${symbolUpper} added to watchlist`,
            data: watchlist
        });
    } catch (error) {
        console.error('Error adding symbol to watchlist:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add symbol to watchlist'
        });
    }
};

// Remove symbol from watchlist
const removeSymbol = async (req, res) => {
    try {
        const userId = req.user.id;
        const { symbol } = req.params;
        
        if (!symbol) {
            return res.status(400).json({
                success: false,
                error: 'Symbol is required'
            });
        }
        
        // Convert to uppercase for consistency
        const symbolUpper = symbol.toUpperCase();
        
        const watchlist = await Watchlist.findOne({ userId });
        
        if (!watchlist) {
            return res.status(404).json({
                success: false,
                error: 'Watchlist not found'
            });
        }
        
        // Check if symbol exists in watchlist
        if (!watchlist.symbols.includes(symbolUpper)) {
            return res.status(404).json({
                success: false,
                error: 'Symbol not found in watchlist'
            });
        }
        
        // Remove symbol from watchlist
        watchlist.symbols = watchlist.symbols.filter(s => s !== symbolUpper);
        await watchlist.save();
        
        res.json({
            success: true,
            message: `Symbol ${symbolUpper} removed from watchlist`,
            data: watchlist
        });
    } catch (error) {
        console.error('Error removing symbol from watchlist:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to remove symbol from watchlist'
        });
    }
};

// Clear entire watchlist
const clearWatchlist = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const watchlist = await Watchlist.findOne({ userId });
        
        if (!watchlist) {
            return res.status(404).json({
                success: false,
                error: 'Watchlist not found'
            });
        }
        
        watchlist.symbols = [];
        await watchlist.save();
        
        res.json({
            success: true,
            message: 'Watchlist cleared successfully',
            data: watchlist
        });
    } catch (error) {
        console.error('Error clearing watchlist:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to clear watchlist'
        });
    }
};

// Add multiple symbols to watchlist
const addMultipleSymbols = async (req, res) => {
    try {
        const userId = req.user.id;
        const { symbols } = req.body;
        
        if (!symbols || !Array.isArray(symbols)) {
            return res.status(400).json({
                success: false,
                error: 'Symbols array is required'
            });
        }
        
        // Convert all symbols to uppercase
        const symbolsUpper = symbols.map(symbol => symbol.toUpperCase());
        
        let watchlist = await Watchlist.findOne({ userId });
        
        if (!watchlist) {
            // Create new watchlist if it doesn't exist
            watchlist = new Watchlist({
                userId,
                symbols: symbolsUpper
            });
        } else {
            // Add only symbols that don't already exist
            const newSymbols = symbolsUpper.filter(symbol => !watchlist.symbols.includes(symbol));
            watchlist.symbols.push(...newSymbols);
        }
        
        await watchlist.save();
        
        res.json({
            success: true,
            message: `${symbolsUpper.length} symbols added to watchlist`,
            data: watchlist
        });
    } catch (error) {
        console.error('Error adding multiple symbols to watchlist:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add symbols to watchlist'
        });
    }
};

module.exports = {
    getWatchlist,
    addSymbol,
    removeSymbol,
    clearWatchlist,
    addMultipleSymbols
};
