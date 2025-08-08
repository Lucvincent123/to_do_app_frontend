import styles from './ConfirmForm.module.css';

export default function ConfirmForm({ setIsDeleting, deletingTask, refresh, setRefresh }) {
    const confirmHandle = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task/${deletingTask}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${
                        document.cookie
                            .split('; ')
                            .find((row) => row.startsWith('token='))
                            .split('=')[1]
                    }`,
                },
            });
            const data = await response.json();
            console.log(data);
            setRefresh(!refresh);
        } catch (error) {
            console.error(error.message);
        }
        setIsDeleting(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <p className={styles.message}>Do you really want to delete this task?</p>
                <div className={styles.buttonGroup}>
                    <div
                        className={styles.button}
                        style={{ backgroundColor: 'var(--color-orange-dark)' }}
                        onClick={confirmHandle}
                    >
                        Yes
                    </div>
                    <div className={styles.button} onClick={() => setIsDeleting(false)}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    );
}
