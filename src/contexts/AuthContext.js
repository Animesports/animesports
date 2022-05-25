import Router from "next/router";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { createContext, useState, useEffect } from "react";
import { Modal } from "../components/Modal";
import { VerifyEmail } from "../components/VerifyEmail";
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

  const [openEmail, setOpenEmail] = useState(false);

  function requireEmailConfirm() {
    setOpenEmail(true);
  }

  function signIn({ email, password }) {
    return new Promise(async (resolve, reject) => {
      await signInRequest({ email, password }).then(
        ({ sessionId, user }) => {
          setCookie(undefined, "animesports.session", sessionId, {
            maxAge: 60 * 60 * (24 * 2), // Two days
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
          console.info("SignIn:", user.id);
          setSessionId(sessionId);
          setUser(user);
        },
        (err) => {
          console.info("SignOut by error:", err);
          signOut({ reload: false });
        }
      );
    }

    setIsFetched(true);
  }, []);

  useEffect(() => {
    console.info("Changes in the user", user);
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
        requireEmailConfirm,
      }}
    >
      <Modal openOn={openEmail} functions={{ close: setOpenEmail }} customStyle>
        <VerifyEmail />
      </Modal>
      {children}
    </authContext.Provider>
  );
}
