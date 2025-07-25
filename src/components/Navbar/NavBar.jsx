import styles from './NavBar.module.css';


export default function NavBar() {
    return (
        <nav className={styles.navbar_container}>
            <ul className={styles.navbar_list}>
                <li className={styles.navbar_item}>
                    <a className={styles.navbar_item_link} href="/">Home</a>
                </li>
                <li className={styles.navbar_item}>
                    <a className={styles.navbar_item_link} href="/about">About</a>
                </li>
                <li className={styles.navbar_item}>
                    <a className={styles.navbar_item_link} href="/contact">Contact</a>
                </li>
            </ul>
        </nav>
    );
}