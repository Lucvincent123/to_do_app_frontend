import { useState } from 'react';

import styles from './AddTaskForm.module.css';
import useGlobalState from '../../contexts/global';

export default function AddTaskForm({ setIsAdding, refresh, setRefresh }) {
    const [globalState] = useGlobalState();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [due, setDue] = useState('');
    const [error, setError] = useState('');

    const submitHandle = async (event) => {
        event.preventDefault();
        const payload = JSON.stringify({
            title,
            description: desc,
            dueDate: due,
            userId: globalState.user.id,
        });

        console.log(payload);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task`, {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${
                        document.cookie
                            .split('; ')
                            .find((row) => row.startsWith('token='))
                            .split('=')[1]
                    }`,
                    'Content-Type': 'application/json',
                },
                body: payload,
            });

            const json = await response.json();
            if (!json.success) {
                setError(json.message);
            } else {
                setRefresh(!refresh);
                setIsAdding(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={submitHandle}>
                <h1 className={styles.title}>Add task form</h1>
                <div className={styles.formGroup}>
                    <input
                        className={styles.input}
                        type='text'
                        id='title'
                        placeholder=' '
                        onChange={(e) => setTitle(e.target.value)}
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
                    />
                    <label className={styles.label} htmlFor='description'>
                        Description
                    </label>
                </div>
                <div className={styles.formGroup} style={{ alignItems: 'center' }}>
                    <label htmlFor='due'>Due date</label>
                    <input type='datetime-local' id='due' onChange={(e) => setDue(e.target.value)} />
                </div>
                <div className={styles.buttonGroup}>
                    <button className={`${styles.submit} ${styles.button}`} type='submit'>
                        Create
                    </button>
                    <button
                        className={`${styles.cancel} ${styles.button}`}
                        type='button'
                        onClick={() => setIsAdding(false)}
                    >
                        Cancel
                    </button>
                </div>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
}
