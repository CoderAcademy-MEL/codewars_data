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

const getMenuOption = () => readlineSync.questionInt('> ');

const menu = (username) => {
  console.log(`CodeWars User: ${username}`);
  console.log('1. Stats');
  console.log('2. Languages');
  console.log('3. Quit');
}

const displayUserStats = (data) => {
  console.log(`Statistics for ${data.username}`);
  console.log(`Honor: ${data.honor}`);
  console.log(`Leaderboard Position: #${data.leaderboardPosition}`);
  console.log(`Rank Score: ${data.ranks.overall.score}`);
  console.log(`Rank: ${data.ranks.overall.name}`);
}

const displayLanguageStats = (languages) => {
  for(const langKey in languages) {
    const {name, color, score} = languages[langKey];
    console.log(`${langKey}: has the ${color} rank of ${name} with ${score} points!`);
  }
}

const app = async () => {
  const username = getUserInput();
  const data = await requestUserData(username);

  menu(data.username);
  const choice = getMenuOption();

  switch(choice) {
    case 1:
      displayUserStats(data);
      break;
    case 2:
      displayLanguageStats(data.ranks.languages);
      break;
    case 3:
      break;
    default:
      console.log('Invalid Option')
  }

  console.log('end');
};

app();
