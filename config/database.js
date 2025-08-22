const mongoose = require('mongoose');
const redis = require('redis');
const {MONGO_URL , REDIS_URL} = require('./env');

const connectDB = async () => {
    await mongoose.connect(MONGO_URL,{useNewUrlParser : true , useUnifiedTopology:true});
    console.log("MongoDB Conneted");
    
}

const redisClient = redis.createClient({url:REDIS_URL});
redisClient.connect().then(()=>console.log('Redis Connected'));

module.exports = {connectDB,redisClient}