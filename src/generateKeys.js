require('dotenv').config();
const crypto = require('crypto');
const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_IP = process.env.REDIS_IP;
const client = redis.createClient(REDIS_PORT, REDIS_IP);

const strength = process.env.KEY_STRENGTH || 64;

const public_key = crypto.randomBytes(strength).toString('base64');
const secret_key = crypto.randomBytes(strength).toString('base64');

client.set('API-KEY', public_key, redis.print);
client.set('API-SEC', secret_key, redis.print);

console.log(`Your Public Key (API-KEY): ${public_key}`);
console.log(`Your Secret Key (API-SEC): ${secret_key}`);

client.quit();