const typeObj = typeof { aaa: "aa" };

/**
 *
 * @param {RequestInfo} url
 * @param {RequestInit} params
 * @returns {Promise<(string|Array| typeObj>}
 */
export async function Fetch(url, params) {
  return new Promise((resolve, reject) => {
    if (params.body && typeof params.body !== "string")
      params.body = JSON.stringify(params.body);

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
}
