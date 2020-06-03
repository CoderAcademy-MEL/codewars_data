const fetch = require('node-fetch');
const readlineSync = require('readline-sync');

const requestUserData = async (username) => {
  const BASE_URL = 'https://www.codewars.com/api/v1/';
  const response = await fetch(`${BASE_URL}/users/${username}`);
  const data = await response.json();

  return data;
};

const getUserInput = () => {
  const username = readlineSync.question('Please Enter a Username: ');
  console.log(`Searching for ${username} on CodeWars...`);
  return username;
};

const app = async () => {
  const username = getUserInput();
  const data = await requestUserData(username);

  console.log(data);
};

app();
