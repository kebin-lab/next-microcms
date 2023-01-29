import styles from "./Footer.module.scss";
export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span>this is footer</span>
        <p className={styles.copyRight}>&copy; yuhei shibata</p>
      </div>
    </footer>
  );
};
