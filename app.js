const fetch = require('node-fetch');
const readlineSync = require('readline-sync');

const requestUserData = async (username) => {
  console.log(`Searching for ${username} on CodeWars...`);

  const BASE_URL = 'https://www.codewars.com/api/v1/';
  const response = await fetch(`${BASE_URL}/users/${username}`);
  const data = await response.json();

  return data;
};

const getUserInput = () => readlineSync.question('Please Enter a Username: ');

const getMenuOption = () => readlineSync.questionInt('> ');

const waitForKeyPress = () => readlineSync.keyIn('Press any key to continue...');

const displayMenu = (username) => {
  console.log(`CodeWars User: ${username}`);
  console.log('1. Stats');
  console.log('2. Languages');
  console.log('3. Quit');
};

const displayUserStats = (data) => {
  console.log(`Statistics for ${data.username}`);
  console.log(`Honor: ${data.honor}`);
  console.log(`Leaderboard Position: #${data.leaderboardPosition}`);
  console.log(`Rank Score: ${data.ranks.overall.score}`);
  console.log(`Rank: ${data.ranks.overall.name}`);

  waitForKeyPress();
};

const processLanguageData = (languages) => Object.keys(languages).map((key) => ({
  name: languages[key].name,
  score: languages[key].score,
  color: languages[key].color,
  lang: key,
}));

const displayLanguageStats = (languageObj) => {
  const languages = processLanguageData(languageObj);
  languages.forEach((language) => {
    const {
      lang, name, color, score,
    } = language;
    console.log(`${lang}: has the ${color} rank of ${name} with ${score} points!`);
  });

  waitForKeyPress();
};

const app = async () => {
  const username = getUserInput();
  const data = await requestUserData(username);

  let running = true;
  while (running) {
    displayMenu(data.username);
    const choice = getMenuOption();

    switch (choice) {
      case 1:
        displayUserStats(data);
        break;
      case 2:
        displayLanguageStats(data.ranks.languages);
        break;
      case 3:
        running = false;
        console.log('Goodbye!');
        break;
      default:
        console.log('Invalid Option');
    }
  }
};

app();
