// Import hooks
import { useEffect, useState } from 'react';

// Import css
import styles from './TodoContent.module.css';

// Import components
import EditTaskForm from '../EditTaskForm/EditTaskForm';
import ConfirmForm from '../ConfirmForm/ConfirmForm';
import useGlobalState from '../../contexts/global';

export default function TodoContent({ marginLeft, setIsAdding, refresh, setRefresh }) {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTask, setEditingTask] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingTask, setDeletingTask] = useState('');
    const [globalState] = useGlobalState();
    const user = globalState.user;

    // Click delete button
    const deleteHandle = (taskId) => {
        console.log(taskId);
        setIsDeleting(true);
        setDeletingTask(taskId);
        console.log(deletingTask);
    };

    // Click edit button
    const editHandle = async (taskId) => {
        console.log(taskId);
        setIsEditing(true);
        setEditingTask(taskId);
    };

    useEffect(() => {
        // This effect could be used to fetch todo content for the user
        const fetchTodoContent = async () => {
            if (user.id === '') return;
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task/user/${user.id}`, {
                    headers: {
                        authorization: `Bearer ${
                            document.cookie
                                .split('; ')
                                .find((row) => row.startsWith('token='))
                                .split('=')[1]
                        }`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch todo content');
                }
                const data = (await response.json()).data;
                setTasks(data);
            } catch (error) {
                console.error('Error fetching todo content:', error);
            }
        };
        fetchTodoContent();
    }, [refresh, user.id]);

    return (
        <div className={styles.wrapper} style={{ left: `${marginLeft}px` }}>
            {/* header */}
            <div className={styles.header}>
                <h1 className={styles.title}>Todo Content</h1>
                <div className={styles.leftMenu}>
                    <button className={styles.headerButton} onClick={() => setIsAdding(true)}>
                        Add task
                    </button>
                    <button className={styles.headerButton} onClick={() => setRefresh(!refresh)}>
                        Refresh
                    </button>
                </div>
            </div>

            {/* body */}
            <ul className={styles.grid}>
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className={`${styles.task} ${
                            task.status === 'completed'
                                ? styles.completed
                                : task.status === 'in-progress'
                                ? styles.inProgress
                                : styles.pending
                        } `}
                    >
                        <h2 className={styles.taskTitle}>{task.title}</h2>

                        {task.description && (
                            <>
                                <div className={styles.separate}></div>
                                <label className={styles.taskDescriptionLabel}>Description:</label>
                                <p className={styles.taskDescription}>{task.description}</p>
                                <div className={styles.separate}></div>
                            </>
                        )}

                        {task.dueDate && (
                            <p className={styles.taskDate}>{`Due: _${new Date(
                                task.dueDate,
                            ).toLocaleTimeString()} __ ${new Date(task.dueDate).toLocaleDateString()}`}</p>
                        )}

                        <p className={styles.taskStatus}>{`Status: ${task.status}`}</p>
                        <div className={styles.cover}>
                            <div className={styles.button} onClick={() => editHandle(task._id)}>
                                <i className='fa-solid fa-pen'></i>
                            </div>
                            <div className={styles.button} onClick={() => deleteHandle(task._id)}>
                                <i className='fa-solid fa-trash'></i>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* footer */}
            <div className={styles.footer}>
                <p className={styles.footerText}>Total Tasks: {tasks.length}</p>
            </div>

            {/* edit form */}
            {isEditing && (
                <EditTaskForm
                    setIsEditing={setIsEditing}
                    editingTask={editingTask}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}

            {isDeleting && (
                <ConfirmForm
                    setIsDeleting={setIsDeleting}
                    deletingTask={deletingTask}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
        </div>
    );
}
