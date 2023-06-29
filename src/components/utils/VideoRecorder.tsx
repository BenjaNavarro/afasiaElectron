import { useRef } from 'react';
import Swal from 'sweetalert2';

export default function VideoRecorder(props:any) {

    const { StartRecording, StopRecording, Video, stream, Status, setStatus, liveVideoFeed, Paciente } = props;
    const Timestamp : string = new Date().getTime().toString();
    const anchorRef : any = useRef(null);

    const StatusList = {
        AWAITING:"Awaiting",
        ALLOWED:"Allowed",
        RECORDING:"Recording",
        ONVIDEO:"OnVideo",
        NOTALLOWED:"NotAllowed",
        ERROR:"Error"
    };

    // const handleClick = () => {
    //     console.log({current:anchorRef});
        
    //     if(anchorRef?.click){
    //         anchorRef.click();
    //     }
    // }

    return (
        <div className='flex flex-col w-full px-6'>
            {[StatusList.ALLOWED,StatusList.RECORDING].includes(Status) ? 
                <video autoPlay width={640} height={480} ref={liveVideoFeed} className='border border-slate-800 shadow-md rounded-lg self-center'>
                    <source src={stream} type='video/webm'/>
                </video>
                :
                Status === StatusList.ONVIDEO &&
                    <video controls autoPlay={false} ref={null} width={640} height={480} className='border border-slate-800 shadow-md rounded-lg self-center'>
                        <source src={Video} type='video/mp4'/>
                    </video> 
            }
            <div className='flex flex-row w-full justify-center mt-8'>
                <button className='w-40 mx-4 h-10 btn-principal' 
                onClick={()=>{
                    if( Status === StatusList.AWAITING ){
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
                    { [ StatusList.ALLOWED, StatusList.RECORDING, StatusList.ONVIDEO ].includes(Status) ? "Desactivar Cámara" : "Obtener Permisos" }
                </button>
                { [ StatusList.ALLOWED, StatusList.RECORDING ].includes(Status) &&
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
                                text:'¿Desea terminar la Evaluación del Paciente?',
                                icon:'question',
                                confirmButtonText:'Sí',
                                showCancelButton:true,
                                cancelButtonText:'No'
                            }).then(((res:any) => {
                                if(res.isConfirmed) StopRecording();
                            }));
                        }
                    }}>
                        { Status !== StatusList.ALLOWED ? "Terminar" : "Comenzar" }
                    </button> 
                }
                </div>
                {/* {Video && Status === StatusList.ONVIDEO && anchorRef &&
                    <a className='' download={Paciente.Paciente.RUT+"_"+Timestamp} href={Video} ref={anchorRef} onClick={(e) => {console.log(e);
                    }}/>
                } */}
                {/* {Video && Status === StatusList.ONVIDEO &&
                    <div className='flex w-full justify-center mt-2'>
                        <button className='text-2xl mr-2 btn-transparente' title='Guardar Archivo'>
                            <a className='contents' download={Paciente.RUT+Date.now()} href={Video}>
                                <FaDownload className='hover:scale-105'/>
                            </a>
                        </button>
                    </div>
                } */}
        </div>
    );
}