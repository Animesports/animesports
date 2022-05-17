import { Fetch } from "../utils/Fetch";

export function updateSoccerEntry({ id, entry }, sessionId) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/soccer/entry/${id}`, {
      method: "POST",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
      body: entry,
    }).then((result) => {
      if (result.acknowledged) return resolve(result);
      reject();
    }, reject);
  });
}

export function getAllSoccerGames() {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/app/soccer`, {
      method: "GET",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${process.env.NEXT_PUBLIC_APP_ID}`,
      },
    }).then((games) => {
      if (games) return resolve(games);
      reject();
    }, reject);
  });
}

export function teamsSearcher(teamName) {
  return new Promise((accept, reject) => {
    Fetch(
      `https://api-football-v1.p.rapidapi.com/v3/teams?search=${teamName}`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_SOCCER_KEY,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    ).then((result) => {
      if (!result?.response) return reject();
      accept(result.response.map(({ team }) => team));
    });
  });
}
