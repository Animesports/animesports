import Router from "next/router";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { createContext, useState, useEffect } from "react";
import {
  recoveryUserData,
  signInRequest,
  signUpRequest,
} from "../services/auth";
import { User } from "../utils/Types";

export const authContext = createContext({
  isFetched: Boolean,
  isAuthenticated: Boolean,
  isAdmin: Boolean,
  signIn: Function,
  signUp: Function,
  signOut: Function,
  user: User,
});

export function AuthProvider({ children }) {
  const [isFetched, setIsFetched] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(new User());

  function signIn({ email, password }) {
    return new Promise(async (resolve, reject) => {
      await signInRequest({ email, password }).then((user) => {
        setCookie(undefined, "animesports.id", user.id, {
          maxAge: 60 * 60 * (24 * 7), // Seven days
        });

        setUser(user);

        resolve();
      }, reject);

      setIsFetched(true);
    });
  }

  function signOut() {
    destroyCookie(undefined, "animesports.id");
    Router.reload();
  }

  function signUp({ name, email, password }) {
    return new Promise(async (resolve, reject) => {
      await signUpRequest({ name, email, password }).then(resolve, (error) => {
        reject(error);
      });
    });
  }

  useEffect(async () => {
    const { ["animesports.id"]: id } = parseCookies();

    if (id) {
      await recoveryUserData({ id }).then((user) => {
        setUser(user);
      }, console.info);
    }

    setIsFetched(true);
  }, []);

  useEffect(() => {
    setIsAuthenticated(user.id !== String);
    setIsAdmin(user?.data?.admin || false);
  }, [user]);

  return (
    <authContext.Provider
      value={{
        isFetched,
        isAuthenticated,
        isAdmin,
        user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
