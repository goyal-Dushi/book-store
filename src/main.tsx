import { createRoot } from 'react-dom/client';
import App from './App';
import React from 'react';
import AlertProvider from '@context/AlertProvider';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <AlertProvider>
        <App />
        </AlertProvider>
    </React.StrictMode>
);
