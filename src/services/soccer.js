import { Fetch } from "../utils/Fetch";

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
