import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// import { useAuth } from '../../contexts/auth';
import useGlobalState from '../../contexts/global';
import { useAuth } from '../../contexts/auth';
import { setEntry } from '../../contexts/global/actions';
import { useEffect } from 'react';
import path from '../../path';

export default function Protected({ children }) {
    const isAuthenticated = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [, globalDispatch] = useGlobalState();

    useEffect(() => {
        console.log(isAuthenticated);
        if (!isAuthenticated) navigate(path('/login'));
        globalDispatch(setEntry(location));
    }, [globalDispatch, isAuthenticated, location, navigate]);

    return children;
}
