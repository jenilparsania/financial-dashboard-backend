const mongoose = require('mongoose');
const portfolioSchema = new mongoose.Schema({
    userId : String,
    holdings : [{symbol : String , quantity : Number,buyPrice: Number}],
});

module.exports = mongoose.model('Portfolio',portfolioSchema);
