import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import {  useNavigate, } from 'react-router-dom';




import styles from './LoginForm.module.css';

import Loading from '../Loading/Loading';




export default function LoginForm() {
    // Navigation
    const navigate = useNavigate();
    // States
    const [ showPassword, setShowPassword ] = useState(false);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    // Handlers
    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prevState => !prevState);
    }, []);

    const handleLogin = useCallback(async (event) => {
        event.preventDefault();
        setError(null); // Reset error state before login attempt
        // Implement login logic here
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });            
            const data = await response.json();
            setIsLoading(false);
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            // Handle successful login, e.g., store token, redirect, etc.
            console.log('Login successful:', data);
            // Redirect to home page after successful login
            navigate(`/dashboard/${data.userId}`, { replace: true });
        } catch (error) {
            setIsLoading(false);
            setError(error.message || 'An error occurred during login');
        }
    }, [username, password, navigate]);


    // Render

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <p className={styles.backLink}><Link to="/" className={styles.link}>&#9668; Back to home</Link></p>
                <h2 className={styles.title}>Login form</h2>
                <form onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username:</label>
                        <input className={styles.input} type="text" id="username" value={username} required onChange={e => setUsername(e.target.value) }/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password:</label>
                        <input className={styles.input} type={showPassword ? "text" : "password"} id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <input className={styles.showPassword} type="checkbox" id="showPassword" value={showPassword} onClick={togglePasswordVisibility}/>
                    <label className={styles.showPasswordLabel} htmlFor="showPassword">Show password</label>
                    <button type="submit" className={styles.button}>Login</button>
                </form>
                { error && <p className={styles.error}>* {error} *</p>}
                <p className={styles.footerText}>Forgot your password? <Link className={styles.link} to="/reset-password">Reset password</Link></p>
                <p className={styles.footerText}>Don't have an account? <Link className={styles.link} to="/register">Register here</Link></p>
            </div>
            {isLoading && <Loading />}
        </div>
    );
}