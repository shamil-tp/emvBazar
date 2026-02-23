// controller/messageController.js
const reminderQueue = require('../queues/reminderQueue');

async function scheduleOneTimeReminder(user) {
  if (!user.dueDate) {
    console.log("No due date found. Skipping reminder.");
    return;
  }

  const delay = new Date(user.dueDate).getTime() - Date.now();

  if (delay <= 0) {
    console.log("Due date already passed. Not scheduling.");
    return;
  }

  await reminderQueue.add(
    'paymentReminder', // job name
    {
      username: user.username,
      phone: user.phone,
      dueDate: user.dueDate
    },
    {
      delay,
      attempts: 3,
      backoff: 5000
    }
  );

  console.log(`One-time reminder scheduled for ${user.username}`);
}

module.exports = { scheduleOneTimeReminder };