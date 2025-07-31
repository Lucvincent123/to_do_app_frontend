import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";


import styles from './TodoContent.module.css';


export default function TodoContent({ marginLeft, setIsAdding, refresh }) {
    const { userId } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // This effect could be used to fetch todo content for the user
        const fetchTodoContent = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch todo content');
                }
                const data = await response.json();
                console.log(data);
                setTasks(data);
            } catch (error) {
                console.error('Error fetching todo content:', error);
            }
        };
        fetchTodoContent();
                        
    }, [userId]);

    return (
        <div className={styles.wrapper} style={{ left: `${marginLeft}px` }}>
            <div className={styles.header}>
                <h1 className={styles.title}>Todo Content</h1>
                <div className={styles.leftMenu}>
                    <button className={styles.headerButton} onClick={() => setIsAdding(true)}>Add task</button>
                    <button className={styles.headerButton} onClick={() => refresh((prev) => !prev)}>Refresh</button>
                </div>
            </div>
            <ul className={styles.grid}>
                {tasks.map(task => (
                    <li key={task._id} className={`${styles.task} ${(task.status === 'completed' ? styles.completed : (task.status === 'in-progress' ? styles.inProgress : styles.pending))} `}>
                        <h2 className={styles.taskTitle}>{task.title}</h2>
                        <p className={styles.taskDescription}>{task.description}</p>
                        <p className={styles.taskDate}>{new Date(task.createdAt).toLocaleDateString()}</p>
                        <p className={styles.taskStatus}>{task.status}</p>
                    </li>  
                ))}
            </ul>
            <div className={styles.footer}>
                <p className={styles.footerText}>Total Tasks: {tasks.length}</p>
            </div>
        </div>
    );
}