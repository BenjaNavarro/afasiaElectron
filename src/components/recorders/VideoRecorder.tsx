import { useEffect, useState, useRef } from 'react';
import { FaCamera, FaCircle } from "react-icons/fa";

export default function VideoRecorder(props:any){

    const [permission, setPermission] = useState<Boolean>(false);
    const [stream, setStream] = useState<any>();

    const getCameraPermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err:any) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    // useEffect(()=>{
    //     console.log({props});
    // });

    return (
        <div className='w-full bg-slate-50 text-slate-900 rounded flex justify-center'>
            <h1 className='text-xl font font-semibold text-center w-full self-center text-slate-900'>Grabar video</h1>
            <div className='flex justify-center w-full'>
                {!permission?
                    <button className='w-40 h-10 text-center rounded-lg outline-1 outline-slate-800 text-slate-800' 
                    onClick={async()=>{
                        await getCameraPermission();
                    }}>
                        <FaCamera className="focus:scale-105"/>
                    </button>
                :null}
                {permission ? 
                    <button className='w-40 h-10 text-center rounded-lg outline-1 outline-slate-800 text-slate-800' 
                    onClick={async()=>{
                    }}>
                        <FaCircle className="focus:scale-105"/>
                    </button>
                :null}
            </div>
        </div>
    );
}