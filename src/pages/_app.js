import Head from "next/head";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>

      <BackgroundVideo />
    </>
  );
}

export default MyApp;
