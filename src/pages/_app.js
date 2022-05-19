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

import { SocketProvider } from "../contexts/SocketContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SocketProvider>
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
      </SocketProvider>
    </>
  );
}

export default MyApp;
