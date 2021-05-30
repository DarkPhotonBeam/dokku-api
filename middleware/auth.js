require('dotenv').config();
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

module.exports = async (req, res, next) => {
    try {
        const key = await getAsync('API-KEY');
        const secret = await getAsync('API-SEC');

        const keyHeader = req.header('API-KEY');
        const secretHeader = req.header('API-SEC');

        if (key && secret && key === keyHeader && secret === secretHeader)
        {
            next();
        } else {
            throw 'Invalid Headers';
        }
    } catch {
        res.status(403).json({
            error: 'Forbidden'
        });
    }
};