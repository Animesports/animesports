const typeObj = typeof { aaa: "aa" };
import { clientEncoder } from "../utils/crypto";
/**
 *
 * @param {RequestInfo} url
 * @param {RequestInit} params
 * @returns {Promise<(string|Array| typeObj>}
 */
export async function Fetch(url, params, options) {
  return clientEncoder(process.env.NEXT_PUBLIC_KEY, async (client, server) => {
    return new Promise((resolve, reject) => {
      if (options?.encrypt) params.headers["x-api-key"] = client.export();

      if (params.body && typeof params.body !== "string")
        params.body = JSON.stringify(params.body);

      if (params.body)
        params.body = JSON.stringify({
          encrypted: server.encrypt(params.body),
        });

      fetch(url, params).then(async (response) => {
        const t = await response.text();
        const text = options?.encrypt ? client.decrypt(t) : t;

        console.info("New Fetch:", {
          url,
          receive: t,
          result: text,
        });

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
