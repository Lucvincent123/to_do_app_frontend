import { useCallback, useEffect, useMemo, useState } from 'react';

import styles from './EditTaskForm.module.css';
import './style.css';

export default function EditTaskForm({ setIsEditing, editingTask, refresh, setRefresh }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [due, setDue] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const statusList = useMemo(() => ['pending', 'in-progress', 'completed'], []);

    const clickStatusHandle = useCallback(
        (status) => {
            setStatus(status);

            statusList.forEach((value) => {
                const div = document.getElementById(`edit-task-form--${value}`);
                if (status === value) {
                    div.classList.add('checked');
                    console.log(div);
                } else {
                    div.classList.remove('checked');
                }
            });
            console.log(status);
        },
        [statusList],
    );

    const formatLocalTime = (due) => {
        if (!due) return '';

        const timeZero = new Date(due);
        if (isNaN(timeZero.getTime())) return '';

        const pad = (num) => String(num).padStart(2, '0');

        return `${timeZero.getFullYear()}-${pad(timeZero.getMonth() + 1)}-${pad(timeZero.getDate())}T${pad(
            timeZero.getHours(),
        )}:${pad(timeZero.getMinutes())}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task/${editingTask}`, {
                    headers: {
                        authorization: `Bearer ${
                            document.cookie
                                .split('; ')
                                .find((row) => row.startsWith('token='))
                                .split('=')[1]
                        }`,
                    },
                });
                const data = (await response.json()).data;
                setTitle(data.title);
                setDesc(data.description);
                setDue(data.dueDate);
                setStatus(data.status);
                clickStatusHandle(data.status);
                console.log(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [editingTask, clickStatusHandle]);

    const submitHandle = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task/${editingTask}`, {
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${
                        document.cookie
                            .split('; ')
                            .find((row) => row.startsWith('token='))
                            .split('=')[1]
                    }`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description: desc,
                    dueDate: due,
                    status,
                }),
            });
            const json = await response.json();
            if (!json.success) {
                setError(json.message);
            } else {
                setRefresh(!refresh);
                setIsEditing(false);
            }
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={submitHandle}>
                <h1 className={styles.title}>Modify task form</h1>
                <div className={styles.formGroup}>
                    <input
                        className={styles.input}
                        type='text'
                        id='title'
                        placeholder=' '
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                    <label className={styles.label} htmlFor='title'>
                        Title
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <textarea
                        className={styles.textarea}
                        id='description'
                        placeholder=' '
                        type='text'
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                    />
                    <label className={styles.label} htmlFor='description'>
                        Description
                    </label>
                </div>
                <div className={styles.formGroup} style={{ alignItems: 'center' }}>
                    <label htmlFor='due'>Due date</label>
                    <input
                        type='datetime-local'
                        id='due'
                        onChange={(e) => setDue(e.target.value)}
                        value={formatLocalTime(due)}
                    />
                </div>
                <div className={styles.statusGroup}>
                    {statusList.map((status, index) => (
                        <div
                            key={index}
                            className={styles.status}
                            id={`edit-task-form--${status}`}
                            onClick={() => clickStatusHandle(status)}
                        >
                            {status}
                        </div>
                    ))}
                </div>
                <div className={styles.buttonGroup}>
                    <button className={`${styles.submit} ${styles.button}`} type='submit'>
                        Edit
                    </button>
                    <button
                        className={`${styles.cancel} ${styles.button}`}
                        type='button'
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
}
