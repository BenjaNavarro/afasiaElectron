import { createContext, useState, Suspense, lazy } from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/utils/Loading';
const Home = lazy(()=>import("./pages/home"));
const Evaluacion = lazy(()=>import("./pages/evaluacion"));
const Pacientes = lazy(()=>import("./pages/pacientes"));

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`);

export const ThemeContext:any = createContext("");

export default function App() : JSX.Element {

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
                        <Navigate to={"/pacientes"}/>
                        {/* <Home/> */}
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
            <Route path='/pacientes' element={
                <Suspense fallback={<Loading/>}>
                    <ThemeContext.Provider value={{Theme,setTheme}}>
                        <Pacientes/>
                    </ThemeContext.Provider>
                </Suspense>
            }/>
        </Routes>
    );
}