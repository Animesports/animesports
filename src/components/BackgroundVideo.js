import { useState, useContext, useEffect } from "react";
import { configContext } from "../contexts/ConfigContext";
import { authContext } from "../contexts/AuthContext";
import styles from "../styles/components/BackgroundVideo.module.css";

export function BackgroundVideo() {
  const [pageLoad, setPageLoad] = useState(false);
  const { config } = useContext(configContext);
  const { isFetched, isAuthenticated } = useContext(authContext);

  useEffect(() => {
    setPageLoad(true);
  }, []);

  return (
    <>
      <div className={styles.overlay} />
      {config.video && (
        <video
          className={styles.background}
          autoPlay
          playsInline
          muted
          loop
          poster="/poster.webp"
        >
          {pageLoad && (
            <>
              <source
                src="https://github.com/Animesports/animesports/blob/main/public/videos/soccer_web.webm?raw=true"
                type="video/webm"
              ></source>
              <source
                src="https://github.com/Animesports/animesports/blob/main/public/videos/soccer_otz.mp4?raw=true"
                type="video/mp4"
              ></source>
            </>
          )}
        </video>
      )}

      {!config.video && (
        <img className={styles.default} src="/poster.webp" alt="bf" />
      )}
    </>
  );
}
