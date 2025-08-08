import { Link } from 'react-router-dom';

import useGlobalState from '../../contexts/global';

import styles from './NavBar.module.css';
import { useState } from 'react';

export default function NavBar() {
    const [globalState, , refresh, setRefresh] = useGlobalState();
    const [showUserInfo, setShowUserInfo] = useState(false);

    const toggleShowUserInfo = () => {
        setShowUserInfo(!showUserInfo);
    };

    const deleteToken = () => {
        document.cookie = 'token=; path=/; max-age=0;';
        setRefresh(!refresh);
    };
    console.log('render');
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarList}>
                <div className={styles.separateMenu}></div>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarItemText} to='/'>
                        Home
                    </Link>
                </li>
                <div className={styles.separateMenu}></div>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarItemText} to='/about'>
                        About
                    </Link>
                </li>
                <div className={styles.separateMenu}></div>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarItemText} to='/contact'>
                        Contact
                    </Link>
                </li>
                <div className={styles.separateMenu}></div>
                <li className={styles.navbarItem}>
                    <div className={styles.navbarItemText}>
                        More
                        <i className={`fa-solid fa-caret-down ${styles.caret}`}></i>
                        <ul className={styles.dropdownMenu}>
                            <li className={styles.dropdownItem}>
                                <Link className={styles.dropdownItemText} to='/link1'>
                                    Link 1
                                </Link>
                            </li>
                            <li className={styles.dropdownItem}>
                                <Link className={styles.dropdownItemText} to='/link2'>
                                    Link 2
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <div className={styles.separateMenu}></div>
            </ul>
            {globalState.user.available === false && (
                <ul className={styles.navbarList}>
                    <div className={styles.separateMenu}></div>
                    <li className={styles.navbarItem}>
                        <Link className={styles.navbarItemText} to='/login'>
                            Login
                        </Link>
                    </li>
                    <div className={styles.separateMenu}></div>
                    <li className={styles.navbarItem}>
                        <Link className={styles.navbarItemText} to='/register'>
                            Register
                        </Link>
                    </li>
                    <div className={styles.separateMenu}></div>
                </ul>
            )}

            {globalState.user.available && (
                <div className={styles.userMenu}>
                    <div className={styles.userNavbar} onClick={toggleShowUserInfo}>
                        <div className={styles.avatar}></div>
                        <h1 className={styles.username}>{`Welcome ${globalState.user.username}`}</h1>
                        {showUserInfo ? (
                            <i className={`fa-solid fa-caret-up ${styles.caret}`}></i>
                        ) : (
                            <i className={`fa-solid fa-caret-down ${styles.caret}`}></i>
                        )}
                    </div>
                    {showUserInfo && (
                        <div className={styles.userInfo}>
                            <p className={`${styles.userInfoItems} ${styles.userId}`}>{`ID: ${globalState.user.id}`}</p>
                            <p className={`${styles.userInfoItems} ${styles.email}`}>{globalState.user.email}</p>
                            <div className={`${styles.userInfoItems} ${styles.signout}`} onClick={deleteToken}>
                                <i className='fa-solid fa-right-from-bracket'></i>Sign out
                            </div>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
