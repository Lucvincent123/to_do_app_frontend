import styles from './NavBar.module.css';

import { Link } from 'react-router-dom';


export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarList}>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarItemText} to="/">Home</Link>
                </li>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarItemText} to="/about">About</Link>
                </li>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarItemText} to="/contact">Contact</Link>
                </li>
                <li className={styles.navbarItem}>
                    <div className={styles.navbarItemText}>
                        More
                        <i class={`fa-solid fa-caret-down ${styles.caretDown}`}></i>
                        <ul className={styles.dropdownMenu}>
                            <li className={styles.dropdownItem}>
                                <Link className={styles.dropdownItemText} to="/link1">Link hhdjj</Link>
                            </li>
                            <li className={styles.dropdownItem}>
                                <Link className={styles.dropdownItemText} to="/link2">Link 2</Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <ul className={styles.navbarList}>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarItemText} to="/login">Login</Link>
                </li>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarItemText} to="/register">Regiser</Link>
                </li>
            </ul>
        </nav>
    );
}