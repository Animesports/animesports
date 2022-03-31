import Router from "next/router";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
import { Loading } from "../components/Loading";
import { authContext } from "../contexts/AuthContext";

export function OnlyAdminUsers(accept, reject) {
  const { isAdmin } = useContext(authContext);
  return OnlyRegisteredUsers(() => {
    if (isAdmin) return accept?.();
    return reject?.() ?? (Router.push("/soccer") && null);
  });
}

export function OnlyRegisteredUsers(accept, reject) {
  const { isFetched, isAuthenticated } = useContext(authContext);
  if (isFetched && isAuthenticated) return accept?.() ?? null;
  if (!isFetched) return <Loading />;
  return reject?.() ?? (Router.push("/login") && null);
}

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
    setTimeout(resolve, 2000);
  });
}
