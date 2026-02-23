const { Worker } = require('bullmq');
const Redis = require('ioredis');
const axios = require('axios');
require('dotenv').config();

// ✅ FIXED Redis connection for Upstash + BullMQ
const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null, // REQUIRED for BullMQ
  tls: {}                     // REQUIRED for Upstash (rediss://)
});

// Send WhatsApp message function
async function sendWhatsAppMessage(phone, message) {
  await axios.post(
    process.env.WHATSAPP_API_URL,
    { to: phone, message },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`
      }
    }
  );
}

// Create Worker
const worker = new Worker(
  'reminderQueue',
  async (job) => {
    console.log("🔥 Processing job:", job.id);

    const { username, phone, dueDate } = job.data;

    const message = `Hello ${username}, your payment is due on ${new Date(
      dueDate
    ).toLocaleDateString()}. Please pay on time.`;

    await sendWhatsAppMessage(phone, message);

    console.log(`✅ Reminder sent to ${username}`);
  },
  { connection }
);

// Worker Events
worker.on('completed', (job) => {
  console.log(`🎉 Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed`, err);
});

console.log('🚀 Reminder worker running...');