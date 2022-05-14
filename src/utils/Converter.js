import { GameDb, GameFetch } from "./Types";

export function convertGameToFetch(data) {
  const converted = {};
  for (const key in new GameDb()) {
    if (data[key]) {
      converted[new GameDb()[key]] = data[key];
    }
  }

  return converted;
}

export function convertGameFromFetch(data, original) {
  const converted = original;
  const schema = new GameFetch();
  for (const key in schema) {
    if (!Array.isArray(schema[key])) {
      converted[key] = data[key] ? data[key] : original[key];
    } else {
      schema[key]
        .filter((prop) => data[`${key}.${prop}`])
        .map((prop) => {
          converted[key][prop] = data[`${key}.${prop}`];
        });
    }
  }

  converted.date = new Date(converted.date);

  return converted;
}
