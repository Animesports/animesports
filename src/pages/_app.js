import Head from "next/head";

import { BackgroundVideo } from "../components/BackgroundVideo";
import { AdminProvider } from "../contexts/AdminContext";
import { AuthProvider } from "../contexts/AuthContext";
import { ConfigProvider } from "../contexts/ConfigContext";
import { PaymentProvider } from "../contexts/PaymentContext";
import { SeasonProvider } from "../contexts/SeasonContext";
import { SoccerProvider } from "../contexts/SoccerContext";
import "../styles/globals.css";

import { SocketProvider } from "../contexts/SocketContext";
import { NotificationProvider } from "../contexts/NotificationContext";

import pack from "../../package.json";
import { CloudinaryContext } from "cloudinary-react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <span className="version">v{pack.version}</span>

      <CloudinaryContext cloudName="hugorodriguesqw">
        <SocketProvider>
          <SeasonProvider>
            <AuthProvider>
              <PaymentProvider>
                <ConfigProvider>
                  <AdminProvider>
                    <SoccerProvider>
                      <NotificationProvider>
                        <Component {...pageProps} />
                      </NotificationProvider>
                    </SoccerProvider>
                  </AdminProvider>
                  <BackgroundVideo />
                </ConfigProvider>
              </PaymentProvider>
            </AuthProvider>
          </SeasonProvider>
        </SocketProvider>
      </CloudinaryContext>
    </>
  );
}

export default MyApp;
