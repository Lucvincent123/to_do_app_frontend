import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';

import styles from './LoginForm.module.css';




export default function LoginForm() {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    
    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prevState => !prevState);
    }, []);

    const handleLogin = useCallback(async (event) => {
        event.preventDefault();
        // Implement login logic here
        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            console.log('Login successful:', data);
        } catch (error) {
            console.error('Login failed:', error);
        }
    }, [username, password]);



    return (
        <div className={styles.wrapper}>
            <div className={styles.loginForm}>
                <p className={styles.backLink}><Link to="/" className={styles.link}>&#9668; Back to home</Link></p>
                <h2 className={styles.title}>Login form</h2>
                <form onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username:</label>
                        <input className={styles.input} type="text" id="username" name="username" value={username} required onChange={(e) => setUsername(e.target.value) }/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password:</label>
                        <input className={styles.input} type={showPassword ? "text" : "password"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <input className={styles.showPassword} type="checkbox" name="showPassword" id="showPassword" value={showPassword} onClick={togglePasswordVisibility}/>
                    <label className={styles.showPasswordLabel} htmlFor="showPassword">Show password</label>
                    <button type="submit" className={styles.button}>Login</button>
                </form>
                <p className={styles.footerText}>Forgot your password? <Link className={styles.link} to="/reset-password">Reset password</Link></p>
                <p className={styles.footerText}>Don't have an account? <Link className={styles.link} to="/register">Register here</Link></p>
            </div>
        </div>
    );
}