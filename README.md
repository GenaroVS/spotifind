# Spotifind

> Once a day, with a click of a button, a user will be given a random small time music artist with a given song. You will be able to like the artist and see them on a monthly leaderboard, and see the random artists picked by previous days.

## Why?

> It's hard to find new artist you like, most find them through recommendations. Curated playlists created by platforms help, but you are spoiled with choice and fomo. Streaming platforms create value for artists through exposure and distribution of music, but smaller artists still tend to get looked over.

## Usage

1. Create `.env-cmdrc` file in the root dir based on `config_example.json`.
2. For Okta and Spotify fields, check requirements below.
3. For developement
   * npm run dev:server
   * npm run dev:build
4. For production
   * npm run build
   * npm run build:local

## Requirements

- [NVM: Node Version Manager](https://heynode.com/tutorial/install-nodejs-locally-nvm)
   - Node >= 15.2.1
   - NPM >= 7.0.8
- [PostgreSQL](https://www.postgresql.org/download/)
- You need to register a Spotify app to access it's API
  - [Spotify App credentials](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app)
- For user registration, I used Okta Authorization
  - Create a developer account with [Okta](https://www.okta.com/).
  - [Create Okta Application](https://developer.okta.com/docs/guides/sign-into-web-app/nodeexpress/create-okta-application/) and add credentials to .env.
  - You can generate a token: Okta Admin -> Security -> API -> Tokens -> Create Token

## Dependencies

From within the root directory :

```sh
npm install
```
That's all folks :relaxed:
