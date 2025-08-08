// Import hooks
import { useEffect, useState } from 'react';

// Import css
import styles from './Dashboard.module.css';

// Import component
import Sidebar from '../Sidebar/Sidebar';
import TodoContent from '../TodoContent/TodoContent.jsx';
import AddTaskForm from '../AddTaskForm/AddTaskForm.jsx';
import useGlobalState from '../../contexts/global/index.js';

import { setUser, setEntry } from '../../contexts/global/actions.js';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [content, setContent] = useState('all');

    const [isAdding, setIsAdding] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const sidebarWidth = 250;
    const [globalState, globalDispatch] = useGlobalState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!globalState.user) {
            const tokenString = document.cookie.split('; ').find((row) => row.startsWith('token='));
            if (!tokenString) {
                globalDispatch(setEntry('/dashboard'));
                navigate('/login');
                return;
            }
            const token = tokenString.split('=')[1];
            if (!token) {
                globalDispatch(setEntry('/dashboard'));
                navigate('/login');
                return;
            }
            const fetchUserInfo = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/info/`, {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error();
                    }
                    const json = await response.json();
                    if (!json.success) {
                        throw new Error();
                    }
                    globalDispatch(
                        setUser({ id: json.data._id, username: json.data.username, email: json.data.email }),
                    );
                } catch {
                    globalDispatch(setEntry('/dashboard'));
                    navigate('/login');
                }
            };
            fetchUserInfo();
        }
    }, [globalDispatch, globalState.user, navigate]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <Sidebar setContent={setContent} />
            </div>
            <div className={styles.content}>
                {content === 'all' && (
                    <TodoContent
                        marginLeft={sidebarWidth}
                        setIsAdding={setIsAdding}
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />
                )}
            </div>
            {isAdding && <AddTaskForm setIsAdding={setIsAdding} refresh={refresh} setRefresh={setRefresh} />}
        </div>
    );
}
