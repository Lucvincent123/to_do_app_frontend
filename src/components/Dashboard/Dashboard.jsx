import { useParams } from "react-router-dom";

import styles from './Dashboard.module.css';



export default function Dashboard() {
    const { userId } = useParams();
    return (
        <div className={styles.wrapper}>
            <h1>Dashboard {userId}</h1>
            <p>Welcome to your dashboard!</p>
        </div>
    );
}