const fetch = require('node-fetch');
const { Display } = require('./src/display');

const requestUserData = async (username) => {
  console.log(`Searching for ${username} on CodeWars...`);
  try {
    const BASE_URL = 'https://www.codewars.com/api/v1/';
    const response = await fetch(`${BASE_URL}/users/${username}`);

    if (!response.ok) throw new Error('User not Found!');

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const processLanguageData = (languages) => Object.keys(languages).map((key) => ({
  name: languages[key].name,
  score: languages[key].score,
  color: languages[key].color,
  lang: key,
}));

const app = async () => {
  const username = Display.getUserInput();
  const data = await requestUserData(username);

  let running = true;

  if (data == null) {
    // If we failed to get data from the API we can't continue.
    running = false;
  }

  while (running) {
    Display.menu(data.username);
    const choice = Display.getOption();

    switch (choice) {
      case 1:
        Display.userStats(data);
        break;
      case 2: {
        const languages = processLanguageData(data.ranks.languages);
        Display.languageStats(languages);
        break;
      }
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
