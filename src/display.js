const readlineSync = require('readline-sync');

class Display {
  static getUserInput() {
    return readlineSync.question('Please Enter a Username: ');
  }

  static getOption() {
    return readlineSync.questionInt('> ');
  }

  static waitForKeyPress() { 
    return readlineSync.keyIn('Press any key to continue...'); 
  }

  static menu(username) {
    console.log(`CodeWars User: ${username}`);
    console.log('1. Stats');
    console.log('2. Languages');
    console.log('3. Quit');
  }

  static userStats(data) {
    console.log(`Statistics for ${data.username}`);
    console.log(`Honor: ${data.honor}`);
    console.log(`Leaderboard Position: #${data.leaderboardPosition}`);
    console.log(`Rank Score: ${data.ranks.overall.score}`);
    console.log(`Rank: ${data.ranks.overall.name}`);

    this.waitForKeyPress();
  }

  static languageStats(languages) {
    languages.forEach((language) => {
      const {
        lang, name, color, score,
      } = language;
      console.log(`${lang}: has the ${color} rank of ${name} with ${score} points!`);
    });

    this.waitForKeyPress();
  }
}

module.exports = {
  Display,
};
