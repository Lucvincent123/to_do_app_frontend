import styles from './Sidebar.module.css';

import { Link } from 'react-router-dom';
import useGlobalState from '../../contexts/global';

export default function Sidebar({ setContent }) {
    const [globalState, , refresh, setRefresh] = useGlobalState();
    const user = globalState.user;

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <i className='fa-solid fa-circle-user fa-4x'></i>
                {user.available && (
                    <div className={styles.userInfo}>
                        <div className={styles.username}>{user.username}</div>
                        <div className={styles.id}>{user.id}</div>
                        <div className={styles.email}>{user.email}</div>
                    </div>
                )}
            </div>
            <ul className={styles.sidebarList}>
                <li className={styles.sidebarItem} onClick={() => setContent('all')}>
                    All tasks
                </li>
                <li className={styles.sidebarItem} onClick={() => setContent('pending')}>
                    Pending
                </li>
                <li className={styles.sidebarItem} onClick={() => setContent('in-progress')}>
                    In progress
                </li>
                <li className={styles.sidebarItem} onClick={() => setContent('completed')}>
                    Completed
                </li>
            </ul>
            <div className={styles.footer}>
                <Link to='/' className={styles.link} onClick={() => setRefresh(!refresh)}>
                    &#9668; Back to home
                </Link>
            </div>
        </div>
    );
}
