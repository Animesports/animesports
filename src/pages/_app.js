import Head from "next/head";
import { useEffect } from "react";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { AdminProvider } from "../contexts/AdminContext";
import { AuthProvider } from "../contexts/AuthContext";
import { ConfigProvider } from "../contexts/ConfigContext";
import { PaymentProvider } from "../contexts/PaymentContext";
import { SeasonProvider } from "../contexts/SeasonContext";
import { SoccerProvider } from "../contexts/SoccerContext";
import "../styles/globals.css";
import socketIOClient from "socket.io-client";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const socket = socketIOClient("http://localhost:6060/", {
      transports: ["websocket"],
    });
    socket.on("hello", (data) => {
      console.info("hello:", data);
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SeasonProvider>
        <AuthProvider>
          <PaymentProvider>
            <ConfigProvider>
              <AdminProvider>
                <SoccerProvider>
                  <Component {...pageProps} />
                </SoccerProvider>
              </AdminProvider>
              <BackgroundVideo />
            </ConfigProvider>
          </PaymentProvider>
        </AuthProvider>
      </SeasonProvider>
    </>
  );
}

export default MyApp;
