import styles from './GetStarted.module.css';

export default function GetStarted() {
    return (
        <div className={styles.background}>
            <h1 className={styles.title}>Get Started with Your To-Do App</h1>
            <button className={styles.button}>Start</button>
        </div>
    )
}