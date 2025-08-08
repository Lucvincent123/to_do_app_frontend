import { Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './ResetPasswordForm.module.css';

export default function ResetPasswordForm() {
    // States
    const [email, setEmail] = useState('');

    // Handlers

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
                <form>
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
                        Send
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
        </div>
    );
}
