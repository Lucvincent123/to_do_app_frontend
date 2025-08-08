import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

import styles from './RegisterForm.module.css';

import Loading from '../Loading/Loading';

export default function RegisterForm() {
    // Navigation
    const navigate = useNavigate();
    // States
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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

    const handleRegister = useCallback(
        async (event) => {
            event.preventDefault();
            setError(null); // Reset error state before registration attempt

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            setIsLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Registration failed');
                }
                setIsLoading(false);
                navigate('/login', { replace: true });
            } catch (error) {
                setIsLoading(false);
                console.error('Registration failed:', error);
                // Handle error, e.g., show a message to the user
                setError(error.message || 'An error occurred during registration');
            }
        },
        [username, email, password, confirmPassword, navigate],
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
                <h2 className={styles.title}>Register form</h2>
                <form onSubmit={handleRegister}>
                    <div className={styles.formGroup}>
                        <label htmlFor='username'>Username:</label>
                        <input
                            className={styles.input}
                            type='text'
                            id='username'
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='email'>Email:</label>
                        <input
                            className={styles.input}
                            type='email'
                            id='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='password'>Password:</label>
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
                        <label htmlFor='confirmPassword'>Confirm password:</label>
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
                        Register
                    </button>
                </form>
                {error && <p className={styles.error}>* {error} *</p>}
                <p className={styles.footerText}>
                    Already have an account?{' '}
                    <Link className={styles.link} to='/login'>
                        Login now
                    </Link>
                </p>
            </div>
            {isLoading && <Loading />}
        </div>
    );
}
