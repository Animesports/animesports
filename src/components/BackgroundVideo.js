import { useState, useContext } from "react";
import { configContext } from "../contexts/ConfigContext";
import { authContext } from "../contexts/AuthContext";
import styles from "../styles/components/BackgroundVideo.module.css";

export function BackgroundVideo() {
  const { config } = useContext(configContext);
  const { isFetched, isAuthenticated } = useContext(authContext);

  if (!isFetched || (isAuthenticated && config.video === false))
    return (
      <>
        <div className={styles.overlay} />

        <video
          key="background-video-off"
          id="video-background-off"
          className={styles.background}
          playsInline
          muted
          poster="/poster.webp"
        />
      </>
    );

  return (
    <>
      <div className={styles.overlay} />

      <video
        key="background-video-on"
        className={styles.background}
        autoPlay
        playsInline
        muted
        loop
        src="https://res.cloudinary.com/hugorodriguesqw/video/upload/v1653762511/animesports/background_video.webm"
        poster="/poster.webp"
      ></video>
    </>
  );
}
