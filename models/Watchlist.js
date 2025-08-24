const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    userId : String,
    symbols : [String],
});

module.exports = mongoose.model('Watchlist',watchlistSchema);