const axios = require('axios');

const fetchMarketData = async (symbol)=>{
    const response = await axios.get(``,
    {params : {vs_currency:'usd',days:'1'}
});
    return response.data;
}

module.exports = {fetchMarketData};
