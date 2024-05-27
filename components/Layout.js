import Link from 'next/link';
import styles from './Layout.module.css';

export default function Layout({ children }) {
    return (
        <>
            <div className={styles.header}>
                <Link href="/"><b><h1>My Blog</h1></b></Link>
            </div>
            <div className={styles.container}>
                <main className={styles.box}>{children}</main>
            </div>
            <div className={styles.footer}>
                <p>Made with ❤️ and coffee</p>
            </div>
        </>
    );
}
