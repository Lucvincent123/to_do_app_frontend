import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

import styles from './Dashboard.module.css';

import Sidebar from "../Sidebar/Sidebar";
import TodoContent from "../TodoContent/TodoContent.jsx";
import AddTaskForm from "../AddTaskForm/AddTaskForm.jsx";



export default function Dashboard() {
    const { userId } = useParams();
    const [ content, setContent ] = useState('todo');
    const [ id, setId ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ isAdding, setIsAdding] = useState(false);
    const [ refresh, setRefresh] = useState(false);
    const sidebarWidth = 250;

    useEffect(() => {
        console.log("refresh")
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, {
                    headers: {
                        'authorization': `Bearer ${document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                console.log(data);
                setId(data._id);
                setUsername(data.username);
                setEmail(data.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUserData();
        
    }, [userId, refresh]);
    console.log("hello");
    console.log(content);
    return (
        <div className={styles.wrapper}>
            <Sidebar setContent={setContent} username={username} email={email} id={id} width={sidebarWidth}/>
            <TodoContent marginLeft={sidebarWidth} setIsAdding={setIsAdding} refresh={setRefresh}/>
            {isAdding && <AddTaskForm setIsAdding={setIsAdding}/>}
        </div>
    );
}