import NavBar from '../Navbar/NavBar';
import styles from './About.module.css';

export default function About() {
    return (
        <>
            <NavBar />
            <div className={styles.content}>
                <h1>About Page</h1>
            </div>
        </>
    );
}
