import { Link } from 'react-router-dom';
import { useState, useCallback } from 'react';

import styles from './RegisterForm.module.css';



export default function RegisterForm() {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prevState => !prevState);
    }, []);

    const toggleConfirmPasswordVisibility = useCallback(() => {
        setShowConfirmPassword(prevState => !prevState);
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.Form}>
                <p className={styles.backLink}><Link to="/" className={styles.link}>&#9668; Back to home</Link></p>
                <h2 className={styles.title}>Register form</h2>
                <form>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username:</label>
                        <input className={styles.input} type="text" id="username" name="username" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input className={styles.input} type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password:</label>
                        <input className={styles.input} type={showPassword ? "text" : "password"} id="password" name="password" required />
                    </div>
                    <input className={styles.showPassword} type="checkbox" name="showPassword" id="showPassword" value={showPassword} onClick={togglePasswordVisibility}/>
                    <label className={styles.showPasswordLabel} htmlFor="showPassword">Show password</label>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm password:</label>
                        <input className={styles.input} type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" required />
                    </div>
                    <input className={styles.showPassword} type="checkbox" name="showConfirmPassword" id="showConfirmPassword" value={showConfirmPassword} onClick={toggleConfirmPasswordVisibility}/>
                    <label className={styles.showPasswordLabel} htmlFor="showConfirmPassword">Show confirm password</label>
                    <button type="submit" className={styles.button}>Register</button>
                </form>
                <p className={styles.footerText}>Already have an account? <Link className={styles.link} to="/login">Login now</Link></p>
                
            </div>
        </div>
    );
}