import Router from "next/router";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { recoveryUserData, signInRequest } from "../services/auth";

export const authContext = createContext({
  user: {
    id: String,
    data: {
      name: String,
      email: {
        address: String,
        verified: Boolean,
      },
      pix: String,
      password: String,
      admin: Boolean,
    },
    config: {
      twosteps: Boolean,
      video: Boolean,
      darkmode: Boolean,
    },
  },
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({
    id: String,
    data: {
      name: String,
      email: {
        address: String,
        verified: Boolean,
      },
      pix: String,
      password: String,
      admin: Boolean,
    },
    config: {
      twosteps: Boolean,
      video: Boolean,
      darkmode: Boolean,
    },
  });

  async function signIn({ email, password }) {
    const { id, user } = await signInRequest({ email, password });

    setCookie(undefined, "animesports.id", id, {
      maxAge: 60 * 60 * (24 * 7), // Seven days
    });

    setUser(user);
  }

  async function signOut() {
    destroyCookie(undefined, "animesports.id");
    Router.reload();
  }

  async function signUp() {
    // SignUp steps
  }

  useEffect(() => {
    const { ["animesports.id"]: id } = parseCookies();

    if (id) {
      recoveryUserData({ id }).then((response) => {
        setUser(response);
      });
    }
  }, []);

  useEffect(() => {
    console.info(user);
    setIsAuthenticated(user !== null);
    setIsAdmin(user && user.admin);
  }, [user]);

  return (
    <authContext.Provider
      value={{
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
