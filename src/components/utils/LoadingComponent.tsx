import React from 'react'
import { FaSpinner } from 'react-icons/fa';

export default function LoadingComponent(props:any):JSX.Element {
    return (
        <div className='central-rounded-div flex-col p-4 text-center'>
            <FaSpinner className='text-5xl self-center'/>
            <label className='w-full text-center self-center'>Cargando...</label>
        </div>
    );
}