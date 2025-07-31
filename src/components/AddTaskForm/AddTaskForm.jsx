import { useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from "./AddTaskForm.module.css"

export default function AddTaskForm({ setIsAdding }) {
    const userId = useParams().userId
    const [ title, setTitle] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ due, setDue ] = useState("");

    const submitHandle = async (event) => {
        event.preventDefault();
        const payload = JSON.stringify({
                    title,
                    description: desc,
                    dueDate: due,
                    userId,
                })

        console.log(payload)
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: payload
            })

            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={submitHandle}>
                <h1 className={styles.title}>Add task form</h1>
                <div className={styles.formGroup}>
                    <input className={styles.input} type="text" id="title" placeholder=" " onChange={e => setTitle(e.target.value)} required/>
                    <label className={styles.label} for="title">Title</label>
                </div>
                <div className={styles.formGroup}>
                    <textarea className={styles.textarea} id="description" placeholder=" " type="text" onChange={e => setDesc(e.target.value)} />
                    <label className={styles.label} for="description">Title</label>
                </div>
                <div className={styles.formGroup} style={{alignItems: "center"}}>
                    <label for="due">Due date</label>
                    <input type="datetime-local" id="due" onChange={e => setDue(e.target.value)}/>
                </div>
                <div className={styles.buttonGroup}>
                    <button className={`${styles.submit} ${styles.button}`} type="submit">Create</button>
                    <button className={`${styles.cancel} ${styles.button}`} type="button" onClick={() => setIsAdding(false)}>Cancel</button>

                </div>
            </form>
        </div>
    );
}