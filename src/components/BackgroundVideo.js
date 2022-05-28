import { useState, useContext, useEffect } from "react";
import { configContext } from "../contexts/ConfigContext";
import { authContext } from "../contexts/AuthContext";
import styles from "../styles/components/BackgroundVideo.module.css";

export function BackgroundVideo() {
  const { config } = useContext(configContext);
  const { isFetched, isAuthenticated } = useContext(authContext);

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
        {isFetched && (config.video || !isAuthenticated) && (
          <>
            <source
              src="https://res.cloudinary.com/hugorodriguesqw/video/upload/v1653762511/animesports/background_video.webm"
              type="video/webm"
            ></source>
          </>
        )}
      </video>
    </>
  );
}
