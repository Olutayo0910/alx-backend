// Import the Redis module
const redis = require('redis');

// Create a Redis client instance
const client = redis.createClient();

// Event handler for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection errors
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

/**
 * Function to set a new value in Redis for a given key
 * @param {string} key - The key to set
 * @param {string} value - The value to set
 */
function setNewValue(key, value) {
  client.set(key, value, (err, reply) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Value set successfully for key: ${key}`);
    }
  });
}

/**
 * Function to retrieve and display the value for a given key
 * @param {string} key - The key to retrieve
 */
function displayValue(key) {
  client.get(key, (err, reply) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Value for key ${key}: ${reply}`);
    }
  });
}

// Example usage
displayValue('Holberton');
setNewValue('HolbertonSanFrancisco', '100');
displayValue('HolbertonSanFrancisco');
