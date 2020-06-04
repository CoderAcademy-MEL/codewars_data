class UserStats {
  constructor(rawData) {
    this.name = rawData.username;
    this.honor = rawData.honor;
    this.leaderboardPosition = rawData.leaderboardPosition;
    this.score = rawData.ranks.overall.score;
    this.rank = rawData.ranks.overall.name;
    this.languages = UserStats.processLanguageData(rawData.ranks.languages);
  }

  static processLanguageData(languagesObj) {
    return Object.keys(languagesObj).map((key) => ({
      name: languagesObj[key].name,
      score: languagesObj[key].score,
      color: languagesObj[key].color,
      lang: key,
    }));
  }
}

module.exports = {
  UserStats,
};
