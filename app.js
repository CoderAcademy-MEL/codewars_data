const fetch = require('node-fetch');
const readlineSync = require('readline-sync');

const requestUserData = async (username) => {
  const BASE_URL = 'https://www.codewars.com/api/v1/'
  const response = await fetch(`${BASE_URL}/users/${username}`);
  const data = await response.json();

  console.log(data);
}

const username = readlineSync.question('Please Enter a Username: ');
console.log(`Searching for ${username} on CodeWars...`);

requestUserData(username);