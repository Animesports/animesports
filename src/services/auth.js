import Router from "next/router";
import { useContext } from "react";
import { Loading } from "../components/Loading";
import { authContext } from "../contexts/AuthContext";
import { Fetch } from "../utils/Fetch";

export function signUpRequest({ email, name, password }) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/app/clients`, {
      method: "POST",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${process.env.NEXT_PUBLIC_APP_ID}`,
      },
      body: {
        email,
        password,
        name,
      },
    }).then((data) => {
      if (data.statusCode) return reject(data);
      if (data.success) return resolve(data);
      reject(data);
    }, reject);
  });
}

export function signInRequest({ email, password }) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/app/clients/validate`, {
      method: "POST",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${process.env.NEXT_PUBLIC_APP_ID}`,
      },
      body: {
        email,
        password,
      },
    }).then(({ valid, sessionId, client }) => {
      if (valid) return resolve({ sessionId, user: client });
      reject({ valid });
    }, reject);
  });
}

export function recoveryUserData({ sessionId }) {
  return new Promise((resolve, reject) => {
    Fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/clients`, {
      method: "GET",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_APP_TOKEN}@${sessionId}`,
      },
    }).then((data) => {
      if (data.statusCode) return reject(data);
      if (data.id) return resolve(data);
      return reject({ error: "unknown" });
    }, reject);
  });
}

export function OnlyAdminUsers(accept, reject) {
  const { isAdmin, user } = useContext(authContext);
  return OnlyRegisteredUsers(() => {
    if (isAdmin) return accept?.(user);
    return reject?.() ?? (Router.push("/soccer") && null);
  });
}

export function OnlyRegisteredUsers(accept, reject) {
  const { isFetched, isAuthenticated, user } = useContext(authContext);
  if (isFetched && isAuthenticated) return accept?.(user) ?? null;
  if (!isFetched) return <Loading />;
  return reject?.() ?? (Router.push("/login") && null);
}
