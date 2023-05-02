// import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header(props: any): JSX.Element {

    // useEffect(()=>{
    //     console.log({props});
    // },[]);

    return (
        <div className='backdrop-blur-md w-full h-12 px-16 pt-2 flex flex-row justify-center fixed top-0 left-0 hover:shadow hover:shadow-slate-600'>
            <Link to={'/'}>
                <label className={'text-slate-900 cursor-pointer hover:border-b-[0.5px] border-slate-900 mx-10 self-center '+(props.selected === "login"?" border-b border-slate-900 font-bold":null)}>
                    Login
                </label>
            </Link>
            <Link to={'/evaluacion'}>
                <label className={'text-slate-900 cursor-pointer hover:border-b-[0.5px] border-slate-900 mx-10 self-center '+(props.selected === "evaluacion"?" border-b border-slate-900 font-bold":null)}>
                    Evaluación
                </label>
            </Link>
            <Link to={'/pacientes'}>
                <label className={'text-slate-900 cursor-pointer hover:border-b-[0.5px] border-slate-900 mx-10 self-center '+(props.selected === "pacientes"?" border-b border-slate-900 font-bold":null)}>
                    Pacientes
                </label>
            </Link>
        </div>
    );
}