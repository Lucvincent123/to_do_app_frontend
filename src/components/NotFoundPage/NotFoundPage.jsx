import { Link } from 'react-router';
import path from '../../path';

export default function NotFoundPage() {
    return (
        <div>
            <h1>404 Not Found</h1>
            <Link to={path('/')}>&#9668; Back to home</Link>
        </div>
    );
}
