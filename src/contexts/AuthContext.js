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
  setUser: Function,
  sessionId: String,
});

export function AuthProvider({ children }) {
  const [isFetched, setIsFetched] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(new User());
  const [sessionId, setSessionId] = useState(null);

  function signIn({ email, password }) {
    return new Promise(async (resolve, reject) => {
      await signInRequest({ email, password }).then(
        ({ sessionId, user }) => {
          setCookie(undefined, "animesports.session", sessionId, {
            maxAge: 60 * 60 * (24 * 7), // Seven days
          });

          setSessionId(sessionId);
          setUser(user);

          resolve();
        },
        (err) => {
          reject(err);
        }
      );

      setIsFetched(true);
    });
  }

  function signOut({ reload }) {
    destroyCookie(undefined, "animesports.session");
    reload && Router.reload();
  }

  function signUp({ name, email, password }) {
    return new Promise(async (resolve, reject) => {
      await signUpRequest({ name, email, password }).then(resolve, (error) => {
        reject(error);
      });
    });
  }

  useEffect(async () => {
    const { ["animesports.session"]: sessionId } = parseCookies();

    if (sessionId) {
      await recoveryUserData({ sessionId }).then(
        (user) => {
          setSessionId(sessionId);
          setUser(user);
        },
        (err) => {
          signOut({ reload: false });
          console.info(err);
        }
      );
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
        setUser,
        sessionId,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
