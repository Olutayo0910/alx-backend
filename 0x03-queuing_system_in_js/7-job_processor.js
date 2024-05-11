import kue from 'kue';

// Create a Redis client
const redisClient = kue.redis.createClient();

// Create a queue with Kue
const queue = kue.createQueue({ redis: redisClient });

// Array to store blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notifications
function sendNotification(phoneNumber, message, job, done) {
  // Track the progress of the job
  job.progress(0, 100);

  // If phoneNumber is blacklisted, fail the job
  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Log sending notification
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Track progress to 50%
  job.progress(50, 100);

  // Perform notification sending here (simulated by logging)
  
  // Simulated delay to mimic notification sending process
  setTimeout(() => {
    // Mark job as completed
    done();
  }, 1000);
}

// Process jobs in the queue
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});

console.log('Job processor is running...');
