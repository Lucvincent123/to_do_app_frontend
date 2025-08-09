import { Link } from 'react-router-dom';
import { useState } from 'react';

import Loading from '../Loading/Loading';

import styles from './ResetPasswordForm.module.css';

export default function ResetPasswordForm() {
    // States
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState('Send');

    // Handlers
    const submitHandle = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const json = await response.json();
            setIsLoading(false);
            if (!json.success) throw new Error(json.message);
            setSent('Resend');
        } catch (error) {
            setIsLoading(false);
            console.log(error.message);
        }
    };

    // Render

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <p className={styles.backLink}>
                    <Link to='/' className={styles.link}>
                        &#9668; Back to home
                    </Link>
                </p>
                <h2 className={styles.title}>Reset password form</h2>
                <form onSubmit={submitHandle}>
                    <div className={styles.formGroup}>
                        <label htmlFor='email'>Email:</label>
                        <input
                            className={styles.input}
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' className={styles.button}>
                        {sent}
                    </button>
                </form>
                <p className={styles.footerText}>
                    Suddenly remember your password?{' '}
                    <Link className={styles.link} to='/login'>
                        Login now
                    </Link>
                </p>
                <p className={styles.footerText}>
                    Don't have an account?{' '}
                    <Link className={styles.link} to='/register'>
                        Register here
                    </Link>
                </p>
            </div>
            {isLoading && <Loading />}
        </div>
    );
}
