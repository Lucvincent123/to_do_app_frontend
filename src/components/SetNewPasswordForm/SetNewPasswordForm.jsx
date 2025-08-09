import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

import styles from './SetNewPasswordForm.module.css';

import Loading from '../Loading/Loading';

export default function SetNewPasswordForm({ token }) {
    // Navigation
    const navigate = useNavigate();
    // States
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // Handlers
    const togglePasswordVisibility = useCallback(() => {
        setShowPassword((prevState) => !prevState);
    }, []);

    const toggleConfirmPasswordVisibility = useCallback(() => {
        setShowConfirmPassword((prevState) => !prevState);
    }, []);

    const handleSetNewPassword = useCallback(
        async (event) => {
            event.preventDefault();
            setError(null); // Reset error state before registration attempt

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            setIsLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/reset-password`, {
                    method: 'PATCH',
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password }),
                });

                const json = await response.json();
                if (!response.ok) {
                    throw new Error(json.message || 'Reset password failed');
                }
                setIsLoading(false);
                navigate('/login', { replace: true });
            } catch (error) {
                setIsLoading(false);
                console.error('Reset password failed:', error);
                // Handle error, e.g., show a message to the user
                setError(error.message || 'An error occurred during reseting password');
            }
        },
        [password, confirmPassword, navigate, token],
    );
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
                <form onSubmit={handleSetNewPassword}>
                    <div className={styles.formGroup}>
                        <label htmlFor='password'>New password:</label>
                        <input
                            className={styles.input}
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <input
                        className={styles.showPassword}
                        type='checkbox'
                        id='showPassword'
                        value={showPassword}
                        onClick={togglePasswordVisibility}
                    />
                    <label className={styles.showPasswordLabel} htmlFor='showPassword'>
                        Show password
                    </label>
                    <div className={styles.formGroup}>
                        <label htmlFor='confirmPassword'>Confirm new password:</label>
                        <input
                            className={styles.input}
                            type={showConfirmPassword ? 'text' : 'password'}
                            id='confirmPassword'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            required
                        />
                    </div>
                    <input
                        className={styles.showPassword}
                        type='checkbox'
                        id='showConfirmPassword'
                        value={showConfirmPassword}
                        onClick={toggleConfirmPasswordVisibility}
                    />
                    <label className={styles.showPasswordLabel} htmlFor='showConfirmPassword'>
                        Show confirm password
                    </label>
                    <button type='submit' className={styles.button}>
                        Reset password
                    </button>
                </form>
                {error && <p className={styles.error}>* {error} *</p>}
            </div>
            {isLoading && <Loading />}
        </div>
    );
}
