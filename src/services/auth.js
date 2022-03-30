import { v4 as uuid } from "uuid";

export async function signInRequest({ email, password }) {
  await delay();

  return {
    id: uuid(),
    user: {
      name: "Gabriel Bardasson",
      email: {
        adress: "grabrielbardasson@animesports.cf",
        verified: false,
      },
      pix: "minhachavepixtop",
      password: "defaultpassword",
      admin: true,
    },
    config: {
      twosteps: false,
      video: false,
      darkmode: false,
    },
  };
}

export async function recoveryUserData({ id }) {
  await delay();

  return {
    id: uuid(),
    user: {
      name: "Gabriel Bardasson",
      email: {
        adress: "grabrielbardasson@animesports.cf",
        verified: false,
      },
      pix: "minhachavepixtop",
      password: "defaultpassword",
      admin: true,
    },
    config: {
      twosteps: false,
      video: false,
      darkmode: false,
    },
  };
}

// Internet Delay Simulator
async function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}
