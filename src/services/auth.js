import Router from "next/router";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
import { Loading } from "../components/Loading";
import { authContext } from "../contexts/AuthContext";
import { User } from "../utils/Types";

/**
 * @param { acceptCallback} accept accept callback
 * @param { rejectCallback } reject reject callback
 * @returns {React.Component} only admin component
 */
export function OnlyAdminUsers(accept, reject) {
  const { isAdmin, user } = useContext(authContext);
  return OnlyRegisteredUsers(() => {
    if (isAdmin) return accept?.(user);
    return reject?.() ?? (Router.push("/soccer") && null);
  });
}

/**
 * @param {acceptCallback}  accept accept callback
 * @param {rejectCallback} reject reject callback
 * @returns {JSX.Element}  only registered component
 */
export function OnlyRegisteredUsers(accept, reject) {
  const { isFetched, isAuthenticated, user } = useContext(authContext);
  if (isFetched && isAuthenticated) return accept?.(user) ?? null;
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

// Local Types:
/**
 * @callback acceptCallback
 * @param {User}  user
 * Function executed when the user is accepted.
 */

/**
 * @callback rejectCallback
 * Function executed when user is rejected.
 */
