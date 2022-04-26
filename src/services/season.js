import { Fetch } from "../utils/Fetch";

export function seasonRequest() {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/app/seasons`, {
      method: "GET",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${process.env.NEXT_PUBLIC_APP_ID}`,
      },
    }).then((season) => {
      if (season?.id) return resolve(season);
      reject();
    }, reject);
  });
}
