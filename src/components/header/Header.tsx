import Link from "next/link";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/">shibattyo-blog</Link>
          <nav>
            <Link href="/profile">Profile</Link>
          </nav>
        </div>
      </header>
    </>
  );
};
