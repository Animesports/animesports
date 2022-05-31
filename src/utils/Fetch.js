const typeObj = typeof { aaa: "aa" };
import { clientEncoder } from "../utils/crypto";

let encoder = null;

/**
 *
 * @param {RequestInfo} url
 * @param {RequestInit} params
 * @returns {Promise<(string|Array| typeObj>}
 */

export async function Fetch(url, params, options) {
  console.info("PRE FETCH:", params);

  if (!encoder) {
    clientEncoder(process.env.NEXT_PUBLIC_KEY, async (client, server) => {
      encoder = { client, server };
    });
  }

  return new Promise(
    (resolve, reject) => {
      if (options?.encrypt)
        params.headers["x-api-key"] = encoder.client.export();

      if (params.body && typeof params.body !== "string")
        params.body = JSON.stringify(params.body);

      if (params.body)
        params.body = JSON.stringify({
          encrypted: encoder.server.encrypt(params.body),
        });

      console.info("FETCHING:", params);
      fetch(url, params).then(async (response) => {
        const t = await response.text();
        const text = options?.encrypt ? encoder.client.decrypt(t) : t;

        try {
          const data = JSON.parse(text);
          resolve(data);
        } catch {
          resolve(text);
        }
      }, reject);
    },
    (aa) => {
      console.info("error", aa);
    }
  );
}
