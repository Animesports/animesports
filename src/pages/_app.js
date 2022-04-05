import Head from "next/head";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { AuthProvider } from "../contexts/AuthContext";
import { ConfigProvider } from "../contexts/ConfigContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AuthProvider>
        <ConfigProvider>
          <Component {...pageProps} />
          <BackgroundVideo />
        </ConfigProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
