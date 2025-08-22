// this file is going to fetch and return market data for a specific financial symbol

const {redisClient} = require('../config/database')
const marketService = require('../services/marketService')

const getMarketData = async(req,res) => {
    const {symbol} = req.params;
    const cacheKey = `market-data:${symbol}`;
    const cached = await redisClient.get(cacheKey)
    // A unique key (market-data-${symbol}) is created to store or retrieve data for this symbol in Redis
    if(cached){
        return res.json(JSON.parse(cached))
    }

    const data = await marketService.fetchMarketData(symbol);
    await redisClient.setEx(cacheKey,60,JSON.stringify(data));
    /*
        the fetched data is stored in redis as setEx method,which sets expiration time of 60 sec. This ensures
        the data is cached temporarily to reduce redundant API calls 

    */
    res.json(data)

};

module.exports = {getMarketData};