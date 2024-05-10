// Import the redis module
import * as redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

// Event handler for connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection errors
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Function to set a new school value
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
  }
  
  // Function to display the value for a given school key
  async function displaySchoolValue(schoolName) {
    const value = await getAsync(schoolName);
    console.log(value);
  }
c
  
  // Call the functions
  displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  displaySchoolValue('HolbertonSanFrancisco');
