import { createContext, useState, Suspense, lazy } from 'react';
import Update from '@/components/update';
import nodeLogo from './assets/node.svg';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/utils/Loading';
const Home = lazy(()=>import("./pages/home"));
const Evaluacion = lazy(()=>import("./pages/evaluacion"));

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`);

export const ThemeContext:any = createContext("");

function App() {

    const user = localStorage.getItem('userLoged') ? JSON.parse(localStorage.getItem('userLoged')||""): "";

    const [Theme,setTheme] = useState<string>("light");

    const ToggleTheme = () => {
        setTheme((current)=>(current === "light"?"dark":"light"));
    };

    return(
        <Routes>
            <Route path="/" element={
                <Suspense fallback={<Loading/>}>
                    <ThemeContext.Provider value={{Theme,setTheme}}>
                        <Home/>
                    </ThemeContext.Provider>
                </Suspense>
            }/>
            <Route path='/evaluacion' element={
                <Suspense fallback={<Loading/>}>
                    <ThemeContext.Provider value={{Theme,setTheme}}>
                        <Evaluacion/>
                    </ThemeContext.Provider>
                </Suspense>
            }/>
        </Routes>
    );
}

export default App
