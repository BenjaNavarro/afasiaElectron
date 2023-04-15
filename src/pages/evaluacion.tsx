import { useEffect, useRef, useState } from 'react';
import Header from '@/components/update/Header';
import Swal from 'sweetalert2';
import { FaDownload } from 'react-icons/fa';

export default function Evaluacion(props:any) : JSX.Element {

    // Awaiting ==> Allowed ==> Recording ==> OnVideo
    //    11            ||========================||
    // NotAllowed/Error

    const [Status, setStatus] = useState<string>("Awaiting");
    const [stream, setStream] = useState<any>();
    const [VideoChunks, setVideoChunks] = useState<any[]>([]);
    const [Video, setVideo] = useState<string>("");
    const mediaRecorder:any = useRef(null);
    const liveVideoFeed:any = useRef(null);

    useEffect(()=>{
        console.log({Status});
        if(Status === "Allowed") GetUserPermission();
    },[Status]);

    async function GetUserPermission(){
        if("MediaRecorder" in window){
            try {
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                }).then(SuccessCallback).catch(ErrorCallBack);
            } catch (error) {
                console.error({error});
            }
        }else{
            setStatus("Error");
            console.warn("The MediaRecorder API is not supported in your browser.");
            Swal.fire({
                title:'',
                text:'No es posible acceder a cámara y video!',
                icon:'error',
            });
        }
    }

    async function StartRecording(){
        try {
            setStatus("Recording");
            const media:MediaRecorder = new MediaRecorder(stream, { mimeType:"video/webm" });
            mediaRecorder.current = media;
            if(mediaRecorder.current){
                mediaRecorder.current.start();
                let localVideoChunks:any[] = [];
                mediaRecorder.current.ondataavailable = (e:any) => {
                    if(typeof e.data === "undefined")return;
                    if(e.data.size === 0)return;
                    localVideoChunks.push(e.data);
                };
                setVideoChunks(localVideoChunks);
            }
        } catch (error) {
            setStatus("Error");
            console.error({error});
        }
    }

    const StopRecording = function(){
        // setRecording(false);
        try {
            mediaRecorder.current.stop();
            mediaRecorder.current.onstop = () => {
                const videoBlob:Blob = new Blob(VideoChunks, { type: "video/webm" });
                const videoURL:string = URL.createObjectURL(videoBlob);
                setVideo(videoURL);
                setVideoChunks([]);
                setStatus("OnVideo");
            }
        } catch (error) {
            setStatus("Error");
            console.error({error});
        }
    }

    const SuccessCallback = (stream:any) => {
        liveVideoFeed.current.srcObject = stream;
        setStream(stream);
    }

    const ErrorCallBack = (error:unknown) => {
        console.error({navigatorGetUserMediaError: error});
    };

    return (
        <div className='page-div'>
            <Header active="evaluacion"/>
            {["Allowed","Recording"].includes(Status) ? 
                <video autoPlay width={640} height={480} ref={liveVideoFeed} className='border border-slate-800 shadow-md rounded-lg self-center'/>
                :
                ["OnVideo"].includes(Status) ?
                    <video controls width={640} height={480} src={Video} className='border border-slate-800 shadow-md rounded-lg self-center'/> 
            :null}
            <div className='flex flex-row w-full justify-center mt-8'>
                <button className='w-40 mx-4 h-10 btn-principal' 
                onClick={()=>{
                    if(Status === "Awaiting"){
                        Swal.fire({
                            title:'',
                            text:'¿Desea Solicitar permisos de Cámara y video?',
                            icon:'question',
                            confirmButtonText:'Sí',
                            showCancelButton:true,
                            cancelButtonText:'No'
                        }).then(((res:any) => {
                            if(res.isConfirmed)setStatus("Allowed");
                            else setStatus("NotAllowed")
                        }));
                    }else{
                        Swal.fire({
                            title:'',
                            text:'¿Desea Desactivar cámara y video?',
                            icon:'question',
                            confirmButtonText:'Sí',
                            showCancelButton:true,
                            cancelButtonText:'No'
                        }).then((async (res:any) => {
                            if(res.isConfirmed)setStatus("Awaiting");
                        }));
                    }
                }}>
                    { ["Allowed","Recording","OnVideo"].includes(Status) ? "Desactivar Cámara" : "Obtener Permisos"}
                </button>
                { ["Allowed","Recording"].includes(Status) ?
                    <button className='w-40 mx-4 h-10 btn-principal'
                    onClick={()=>{
                        if(Status === "Allowed"){
                            Swal.fire({
                                title:'',
                                text:'¿Desea comenzar a grabar?',
                                icon:'question',
                                confirmButtonText:'Sí',
                                showCancelButton:true,
                                cancelButtonText:'No'
                            }).then((async(res:any) => {
                                if(res.isConfirmed) await StartRecording();
                            }));
                        }else{
                            Swal.fire({
                                title:'',
                                text:'¿Desea detener la grabación?',
                                icon:'question',
                                confirmButtonText:'Sí',
                                showCancelButton:true,
                                cancelButtonText:'No'
                            }).then(((res:any) => {
                                if(res.isConfirmed) StopRecording();
                            }));
                        }
                    }}>
                        { Status !== "Allowed" ? "Detener Grabación" : "Grabar" }
                    </button> 
                : null}
            </div>
            {Video && Status === "OnVideo" ?
                <div className='flex w-full justify-center mt-2'>
                    <button className='text-2xl mr-2 btn-transparente' title='Guardar Archivo'>
                        <a className='contents' download href={Video}>
                            <FaDownload className='hover:scale-105'/>
                        </a>
                    </button>
                </div>
            :null }
        </div>
    );
}