import React from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function Loading(props:any) {
    return (
        <div className='w-[1366px] lg:w-full justify-center h-screen flex flex-col bg-slate-50 text-slate-900'>
            <label className='w-full text-center text-slate-900'>
                <FaSpinner className='text-2xl rotate'/>
                Loading...
            </label>
        </div>
    );
};