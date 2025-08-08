import NavBar from '../Navbar/NavBar';
import styles from './Contact.module.css';

export default function Contact() {
    return (
        <>
            <NavBar />
            <div className={styles.content}>
                <h1>Contact Page</h1>
            </div>
        </>
    );
}
