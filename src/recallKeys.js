require('dotenv').config();
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

(async () => {
    const key = await getAsync('API-KEY');
    const secret = await getAsync('API-SEC');

    console.log(`Public Key: ${key}`);
    console.log(`Secret Key: ${secret}`);

    client.quit();
})();