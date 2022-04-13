import Head from "next/head";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { AdminProvider } from "../contexts/AdminContext";
import { AuthProvider } from "../contexts/AuthContext";
import { ConfigProvider } from "../contexts/ConfigContext";
import { PaymentProvider } from "../contexts/PaymentContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AuthProvider>
        <PaymentProvider>
          <ConfigProvider>
            <AdminProvider>
              <Component {...pageProps} />
            </AdminProvider>
            <BackgroundVideo />
          </ConfigProvider>
        </PaymentProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
