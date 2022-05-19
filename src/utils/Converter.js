import { GameDb } from "./Types";

export function convertGameToFetch(data) {
  const converted = {};
  for (const key in new GameDb()) {
    if (data[key]) {
      converted[new GameDb()[key]] = data[key];
    }
  }

  return converted;
}
