import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GlobalProvider } from './contexts/global/';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GlobalProvider>
            <BrowserRouter basename='/to_do_app_frontend'>
                <App />
            </BrowserRouter>
        </GlobalProvider>
    </StrictMode>,
);
