import { useState } from "react";

/**
 *
 * @param {String} name
 * @returns {[Boolean, ]} animator
 */
export function useAnimate(name) {
  const [running, setRunning] = useState(false);
  return [
    running ? name ?? "animate" : null,
    (vaue) => {
      setRunning(vaue ?? !running);
    },
  ];
}

export function delay(miliseconds) {
  return new Promise((a) => {
    setTimeout(a, miliseconds);
  });
}

export function slice(text, opt) {
  if (typeof text !== "string") return text;
  return text.slice(opt.init ?? 0, opt.max ?? text.length);
}

export function firstWord(text, opt) {
  if (!text || typeof text !== "string") return text;
  text = text.replaceAll("-", " ");

  const splited = text.split(" ");
  const second = splited[opt?.s ? opt.s : 1];
  const lsecond = second && second.length >= opt.min;

  if (lsecond && opt.abb) {
    return `${splited[0].slice(0, 1)}. ${second}`;
  }

  if (opt.max && opt.max < splited[0].length && lsecond) {
    return `${splited[0].slice(0, 1)}. ${second}`;
  }

  return splited[0] ?? text;
}

export function low(text) {
  return text?.toLowerCase?.() ?? text;
}

export function aLow(array) {
  return array?.map((v) => v?.toLowerCase?.() ?? v) ?? [];
}

export function plural(number) {
  return {
    is: () => number !== 1,
    convert: (text, pl) => {
      return number === 1 ? text : text + (pl ?? "s");
    },
  };
}

export function currency() {
  return {
    getCents: (number) =>
      `00${(number - Math.trunc(number)).toFixed(2) * 100}`.slice(-2),
    getReals: (number) => Math.trunc(number),
    get: (number) =>
      `R$ ${currency().getReals(number)},${currency().getCents(number)}`,
  };
}

export function getConfigFromUser(user) {
  return {
    email: user.data.email.address,
    pix: user.data.pix,
    password: user.data.password,
    twosteps: user.config.twosteps,
    video: user.config.video,
    darkmode: user.config.darkmode,
  };
}

export function convertConfigToUser(config) {
  return {
    data: {
      email: {
        address: config.email,
      },
      pix: config.pix,
      password: config.password,
    },
    config: {
      twosteps: config.twosteps,
      video: config.video,
      darkmode: config.darkmode,
    },
  };
}

export function updateObject(reference, update) {
  const target = Object.assign({}, reference);
  for (const field in target) {
    if (update[field]) {
      if (typeof target[field] === "object") {
        target[field] = updateObject(target[field], update[field]);
      } else {
        target[field] = update[field];
      }
    }
  }
  return target;
}

export function hideEmailChars(emailString) {
  if (!emailString || typeof emailString !== "string") return null;

  const separator = emailString.substring(
    1,
    emailString.split("@")[0].length - 2
  );

  if (separator.length <= 0) {
    return emailString
      .split("@")
      .map((v, i) => {
        if (i === 1)
          return v
            .split(".")
            .map((v, i) => {
              if (i === 0) return Array(v.length + 1).join("*");
              return v;
            })
            .join(".");
        return v.replace(v.substring(0, 1), "*");
      })
      .join("@");
  }

  return emailString.replace(
    separator,
    Array(nummax(separator.length + 1, 8)).join("*")
  );
}

export function nummax(number, max) {
  if (number >= max) return max;
  return number;
}
