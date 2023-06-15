import { useEffect } from 'react';
import Header from '@/components/utils/Header';

export default function Home(props:any):JSX.Element {
    
    useEffect(() => {
        console.log({paciente:sessionStorage.getItem("paciente")});
    },[])

    return (
        <div className='page-div'>
            <Header selected="login"/>
            Home
        </div>
    );
}