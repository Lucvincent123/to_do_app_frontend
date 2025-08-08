import { Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import ResetPasswordForm from './components/ResetPasswordForm/ResetPasswordForm';
import Dashboard from './components/Dashboard/Dashboard';
import Protected from './components/Protected/Protected';
import Contact from './components/Contact/Contact';
import About from './components/About/About';

import useGlobalState from './contexts/global';
import { useEffect } from 'react';
import path from './path';
import { setUser } from './contexts/global/actions';

function App() {
    const [, globalDispatch, refresh] = useGlobalState();
    useEffect(() => {
        console.log('render');
        const tokenString = document.cookie.split('; ').find((row) => row.startsWith('token='));
        if (!tokenString) {
            globalDispatch(setUser({ available: false, id: '', username: '', email: '' }));
            return;
        }
        const token = tokenString.split('=')[1];
        if (!token) {
            globalDispatch(setUser({ available: false, id: '', username: '', email: '' }));
            return;
        }
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/info/`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const json = await response.json();
                if (!json.success) {
                    throw new Error(json.message);
                }
                globalDispatch(
                    setUser({
                        available: true,
                        id: json.data._id,
                        username: json.data.username,
                        email: json.data.email,
                    }),
                );
            } catch (error) {
                globalDispatch(setUser({ available: false, id: '', username: '', email: '' }));
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [refresh, globalDispatch]);
    return (
        <>
            <Routes>
                <Route path={path('/')} element={<HomePage />} />
                <Route path={path('/about')} element={<About />} />
                <Route path={path('/contact')} element={<Contact />} />
                <Route
                    path={path('/dashboard/')}
                    element={
                        <Protected>
                            <Dashboard />
                        </Protected>
                    }
                />
                <Route path={path('/login')} element={<LoginForm />} />
                <Route path={path('/register')} element={<RegisterForm />} />
                <Route path={path('/reset-password')} element={<ResetPasswordForm />} />
                <Route path={path('/*')} element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
