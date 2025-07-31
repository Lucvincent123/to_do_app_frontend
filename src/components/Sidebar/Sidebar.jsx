

import styles from './Sidebar.module.css';

export default function Sidebar({ setContent, username, email, id , width }) {


    console.log(id, username, email);


    return (
        <div className={styles.sidebar} style={{ width: `${width}px` }}>
            <div className={styles.sidebarHeader}>
                <i class="fa-solid fa-circle-user fa-4x"></i>
                <div className={styles.userInfo}>
                    <div className={styles.username}>{username}</div>
                    <div className={styles.id}>{id}</div>
                    <div className={styles.email}>{email}</div>
                </div>
            </div>
            <ul className={styles.sidebarList}>
                <li className={styles.sidebarItem} onClick={(() => setContent("todo"))}>To-do</li>
                <li className={styles.sidebarItem} onClick={(() => setContent("calendar"))}>Calendar</li>
                <li className={styles.sidebarItem} onClick={(() => setContent("voucher"))}>Voucher</li>
            </ul>
        </div>
    );
}