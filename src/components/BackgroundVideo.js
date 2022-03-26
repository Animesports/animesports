import { useState } from "react";
import { useEffect } from "react";
import styles from "../styles/components/BackgroundVideo.module.css";

export function BackgroundVideo() {
  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    setPageLoad(true);
  }, []);

  return (
    <>
      <div className={styles.overlay} />
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
    </>
  );
}
