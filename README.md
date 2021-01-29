# Spotifind

> Once a day, with a click of a button, a user will be given a random small time music artist with a given song. You will be able to like the artist and see them on a monthly leaderboard, and see the random artists picked by previous days.

## Why?

> It's hard to find new artist you like, most find them through recommendations. Curated playlists created by platforms help, but you are spoiled with choice and fomo. Streaming platforms create value for artists through exposure and distribution of music, but smaller artists still tend to get looked over.

## Usage

1. Create config.js in `server/spotify/` based on config_example.js
2. Create a .env-cmdrc file in the root dir with
   ``` json
   {
      "dev": {
         "DATABASE_URL": "postgresql://postgres:Ximena.1@localhost:5432/spotifind"
      },
      "prod": {
         "NODE_ENV": "production"
      }
   }
3. npm run build
4. npm run build:server
5. npm run start
   * Optional: development with webpack server

## Requirements

* Node >=15.2.1
* PostgreSQL

## Dependencies

From within the root directory:

```sh
npm install
```
That's all folks :relaxed:
