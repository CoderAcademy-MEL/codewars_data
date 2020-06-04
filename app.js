const { Display } = require('./src/display');
const { Request } = require('./src/request');

const processLanguageData = (languages) => Object.keys(languages).map((key) => ({
  name: languages[key].name,
  score: languages[key].score,
  color: languages[key].color,
  lang: key,
}));

const app = async () => {
  const username = Display.getUserInput();
  const request = new Request(username);
  const data = await request.userData();

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
