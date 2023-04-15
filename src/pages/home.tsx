import { useEffect } from 'react';
import Header from '@/components/update/Header';

export default function home(props:any) {

    // useEffect(()=>{
    //     console.log({props});
    // },[]);

    return (
        <div className='page-div'>
            <Header selected="login"/>
            Login
        </div>
    )
}