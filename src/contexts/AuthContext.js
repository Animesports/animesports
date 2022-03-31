import Router from "next/router";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { recoveryUserData, signInRequest } from "../services/auth";
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

  async function signIn({ email, password }) {
    await signInRequest({ email, password }).then((user) => {
      setCookie(undefined, "animesports.id", user.id, {
        maxAge: 60 * 60 * (24 * 7), // Seven days
      });

      setUser(user);
    });
    setIsFetched(true);
  }

  async function signOut() {
    destroyCookie(undefined, "animesports.id");
    Router.reload();
  }

  async function signUp() {
    // SignUp steps
  }

  useEffect(async () => {
    const { ["animesports.id"]: id } = parseCookies();

    if (id) {
      await recoveryUserData({ id }).then((user) => {
        setUser(user);
      });
    }
    setIsFetched(true);
  }, []);

  useEffect(() => {
    setIsAuthenticated(user.id !== String);
    setIsAdmin(user?.data?.admin || false);
  }, [user]);

  useEffect(() => {
    console.info("admin:", isAdmin);
  }, [isAdmin]);

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
