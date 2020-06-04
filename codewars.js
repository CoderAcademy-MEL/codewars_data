const { Display } = require('./src/display');
const { Request } = require('./src/request');
const { UserStats } = require('./src/user_stats');

const app = async () => {
  const username = Display.getUserInput();
  const request = new Request(username);
  let user;
  let running = true;

  try {
    const data = await request.userData();

    if (data == null) {
      throw new Error(`No Data for User: ${username}`);
    }

    user = new UserStats(data);
  } catch (error) {
    console.error(error.message);
    running = false;
  }

  while (running) {
    Display.menu(user.name);
    const choice = Display.getOption();

    switch (choice) {
      case 1:
        Display.userStats(user);
        break;
      case 2: {
        Display.languageStats(user.languages);
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
