const typeObj = typeof { aaa: "aa" };
import { clientEncoder } from "../utils/crypto";
/**
 *
 * @param {RequestInfo} url
 * @param {RequestInit} params
 * @returns {Promise<(string|Array| typeObj>}
 */
export async function Fetch(url, params) {
  return clientEncoder(process.env.NEXT_PUBLIC_KEY, async (client, server) => {
    return new Promise((resolve, reject) => {
      if (params.body && typeof params.body !== "string")
        params.body = JSON.stringify(params.body);

      if (params.body)
        params.body = JSON.stringify({
          encrypted: server.encrypt(params.body),
        });

      fetch(url, params).then(async (response) => {
        const text = await response.text();

        try {
          const data = JSON.parse(text);
          resolve(data);
        } catch {
          resolve(text);
        }
      }, reject);
    });
  });
}
