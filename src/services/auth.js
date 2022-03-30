import { v4 as uuid } from "uuid";

export async function signInRequest({ email, password }) {
  await delay();

  return {
    id: uuid(),
    data: {
      name: "Gabriel Bardasson",
      email: {
        address: "grabrielbardasson@animesports.cf",
        verified: false,
      },
      pix: "minhachavepixtop",
      password: "defaultpassword",
      admin: true,
    },
    config: {
      twosteps: false,
      video: true,
      darkmode: false,
    },
  };
}

export async function recoveryUserData({ id }) {
  await delay();

  return {
    id: uuid(),
    data: {
      name: "Gabriel Bardasson",
      email: {
        address: "grabrielbardasson@animesports.cf",
        verified: false,
      },
      pix: "minhachavepixtop",
      password: "defaultpassword",
      admin: true,
    },
    config: {
      twosteps: false,
      video: true,
      darkmode: false,
    },
  };
}

// Internet Delay Simulator
async function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      console.info("Response");
    }, 2000);
  });
}
