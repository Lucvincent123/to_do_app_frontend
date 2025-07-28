import { useParams } from "react-router-dom";
import { useEffect } from 'react';

import styles from './Dashboard.module.css';



export default function Dashboard() {
    const { userId } = useParams();

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
                    headers: {
                        'authorization': `Bearer ${document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]}`
                    }
                });
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUserData();
        
    }, [userId]);

    return (
        <div className={styles.wrapper}>
            <h1>Dashboard {userId}</h1>
            <p>Welcome to your dashboard!</p>
        </div>
    );
}