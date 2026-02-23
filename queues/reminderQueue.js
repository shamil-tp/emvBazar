const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis(process.env.UPSTASH_REDIS_URL, {
  maxRetriesPerRequest: null,
  tls: {}
});

const reminderQueue = new Queue('reminderQueue', {
  connection
});

module.exports = reminderQueue;