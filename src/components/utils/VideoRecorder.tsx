import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaDownload } from 'react-icons/fa';

export default function VideoRecorder(props:any) {

    // Awaiting ==> Allowed ==> Recording ==> OnVideo
    //    11            ||========================||
    // NotAllowed/Error

    const StatusList = {
        AWAITING:"Awaiting",
        ALLOWED:"Allowed",
        RECORDING:"Recording",
        ONVIDEO:"OnVideo",
        NOTALLOWED:"NotAllowed",
        ERROR:"Error"
    };

    const [Status, setStatus] = useState<string>("Awaiting");
    const [stream, setStream] = useState<any>();
    const [VideoChunks, setVideoChunks] = useState<any[]>([]);
    const [Video, setVideo] = useState<string>("");
    const mediaRecorder:any = useRef(null);
    const liveVideoFeed:any = useRef(null);

    useEffect(()=>{
        console.log({Status});
        if(Status === StatusList.ALLOWED) GetUserPermission();
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
            setStatus(StatusList.ERROR);
            console.warn("The MediaRecorder API is not supported in your PC.");
            Swal.fire({
                title:'',
                text:'No es posible acceder a cámara y video!',
                icon:'error',
            });
        }
    }

    async function StartRecording(){
        try {
            setStatus(StatusList.RECORDING);
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
            setStatus(StatusList.ERROR);
            console.error({error});
        }
    }

    const StopRecording = function(){
        try {
            mediaRecorder.current.stop();
            mediaRecorder.current.onstop = () => {
                const videoBlob:Blob = new Blob(VideoChunks, { type: "video/mp4" });
                const videoURL:string = URL.createObjectURL(videoBlob);
                setVideo(videoURL);
                setVideoChunks([]);
                setStatus(StatusList.ONVIDEO);
            }
        } catch (error) {
            setStatus(StatusList.ERROR);
            console.error({error});
        }
    }

    const SuccessCallback = (stream:MediaStream) => {
        liveVideoFeed.current.srcObject = stream;
        const VideoStream:MediaStream | null = new MediaStream([...stream.getVideoTracks(),...stream.getAudioTracks(),]);
        setStream(VideoStream);
    }

    const ErrorCallBack = (error:unknown) => {
        console.error({navigatorGetUserMediaError: error});
    };

    return (
        <div className='flex flex-col w-full px-6'>
            {[StatusList.ALLOWED,StatusList.RECORDING].includes(Status) ? 
                <video autoPlay width={640} height={480} ref={liveVideoFeed} className='border border-slate-800 shadow-md rounded-lg self-center'>
                    <source src={stream} type='video/webm'/>
                </video>
                :
                Status === StatusList.ONVIDEO ?
                    <video controls autoPlay={false} ref={null} width={640} height={480} className='border border-slate-800 shadow-md rounded-lg self-center'>
                        <source src={Video} type='video/mp4'/>
                    </video> 
            :null}
            <div className='flex flex-row w-full justify-center mt-8'>
                <button className='w-40 mx-4 h-10 btn-principal' 
                onClick={()=>{
                    if(Status === StatusList.AWAITING){
                        Swal.fire({
                            title:'',
                            text:'¿Desea Solicitar permisos de Cámara y video?',
                            icon:'question',
                            confirmButtonText:'Sí',
                            showCancelButton:true,
                            cancelButtonText:'No'
                        }).then(((res:any) => {
                            if(res.isConfirmed) return setStatus(StatusList.ALLOWED);
                            else return setStatus(StatusList.NOTALLOWED);
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
                            if(res.isConfirmed) setStatus(StatusList.AWAITING);
                        }));
                    }
                }}>
                    { [StatusList.ALLOWED,StatusList.RECORDING,StatusList.ONVIDEO].includes(Status) ? "Desactivar Cámara" : "Obtener Permisos"}
                </button>
                { [StatusList.ALLOWED,StatusList.RECORDING].includes(Status) ?
                    <button className='w-40 mx-4 h-10 btn-principal'
                    onClick={()=>{
                        if(Status === StatusList.ALLOWED){
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
                        { Status !== StatusList.ALLOWED ? "Detener Grabación" : "Grabar" }
                    </button> 
                : null}
                </div>
                {Video && Status === StatusList.ONVIDEO ?
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