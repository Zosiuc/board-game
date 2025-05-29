import {StrictMode} from 'react';
import "./i18n"
import {createRoot} from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>
)

// TypeScript controleert of reportWebVitals een functie is
reportWebVitals();
