// import { useEffect, useRef, useState } from 'react';
import Header from '@/components/utils/Header';
import FormularioEtapa1 from '@/components/forms/FormularioEtapa1';
import VideoRecorder from '@/components/utils/VideoRecorder';

export default function Evaluacion(props:any) : JSX.Element {

    return (
        <div className='page-div'>
            <Header selected="evaluacion"/>
            <div className='flex flex-row w-full self-center'>
                <FormularioEtapa1/>
                <VideoRecorder/>
            </div>
        </div>
    );
}