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
        src="/videos/soccer.mp4"
      />
    </>
  );
}
