import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './samples/node-api';
import './index.scss';
// import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');