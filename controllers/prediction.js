const mlService = require('../services/mlService');

const getPrediction = async (req,res) => {
    const {symbol} = req.params;
    const prediction = await mlService.prediction(symbol);
    res.json({symbol,prediction});

};

module.exports = {getPrediction}