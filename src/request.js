const fetch = require('node-fetch');

class Request {
  constructor(username) {
    this.username = username;
  }

  async userData() {
    console.log(`Searching for ${this.username} on CodeWars...`);
    try {
      const BASE_URL = 'https://www.codewars.com/api/v1/';
      const response = await fetch(`${BASE_URL}/users/${this.username}`);

      if (!response.ok) {
        throw new Error(`Error with Codewars response was ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

module.exports = {
  Request,
};
