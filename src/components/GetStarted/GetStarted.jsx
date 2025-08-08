import { useNavigate } from 'react-router-dom';

import styles from './GetStarted.module.css';

export default function GetStarted() {
    const navigate = useNavigate();

    return (
        <div className={styles.background}>
            <h1 className={styles.title}>Get started with your To-do app</h1>
            <button className={styles.button} onClick={() => navigate('/dashboard')}>
                Start
            </button>
        </div>
    );
}
