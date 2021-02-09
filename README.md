# Spotifind

> Once a day, with a click of a button, a user will be given a random small time music artist with a given song. You will be able to like the artist and see them on a monthly leaderboard, and see the random artists picked by previous days.

## Why?

> It's hard to find new artist you like, most find them through recommendations. Curated playlists created by platforms help, but you are spoiled with choice and fomo. Streaming platforms create value for artists through exposure and distribution of music, but smaller artists still tend to get looked over.

## Usage

1. Create `.env-cmdrc` file in the root dir based on `config_example.json`.
2. For developement
   * npm run dev:server
   * npm run dev:build
3. For production
   * npm run build
   * npm run build:local

## Requirements

- [NVM: Node Version Manager](https://heynode.com/tutorial/install-nodejs-locally-nvm)
   - Node >= 15.2.1
   - NPM >= 7.0.8
- [PostgreSQL](https://www.postgresql.org/download/)

## Dependencies

From within the root directory :

```sh
npm install
```
That's all folks :relaxed:
