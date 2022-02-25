import styles from "../styles/components/BackgroundVideo.module.css";

export function BackgroundVideo() {
  return (
    <>
      <div className={styles.overlay} />
      <video
        className={styles.background}
        autoPlay
        muted
        loop
        src="https://github.com/Animesports/animesports/blob/main/public/videos/soccer_otz.mp4?raw=true"
      />
    </>
  );
}
