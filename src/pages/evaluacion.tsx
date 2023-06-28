import { useEffect, useRef, useState } from 'react';
import Header from '@/components/utils/Header';
import FormularioEtapa1 from '@/components/forms/FormularioEtapa1';
import VideoRecorder from '@/components/utils/VideoRecorder';
import { IFormulario, IPacient } from '@/assets/Constants';
import { Link, useLocation } from 'react-router-dom';
import { DB } from '@/assets/DataBase';
import LoadingComponent from '@/components/utils/LoadingComponent';
import Swal from 'sweetalert2';
import { BrowserWindow } from 'electron';
import { IndexableType } from 'dexie';
import { ErrorAlert, SuccessAlert } from '@/assets/Alerts';

export default function Evaluacion(props:any) : JSX.Element {

    const [ Paciente, setPaciente ] = useState<Partial<IPacient | null | undefined>>(null);
    const [ Loading, setLoading ] = useState<boolean>(true);
    const { state } = useLocation();
    const [ Form, setForm ] = useState<Partial<IFormulario>>({
        Numero:"",
        Paciente: Paciente?.RUT,
        Diagnostico:"",
        FechaInicio: new Date(),
        FechaTermino: new Date(),
        SeveridadAfasia: 5,
        LenguajeEspontaneo: false,
        Preguntas: [],
        Observaciones: "",
    });

    // Awaiting ==> Allowed ==> Recording ==> OnVideo
    //    ^           ^                         ^
    //   ||          ||========================||
    // NotAllowed/Error

    const StatusList = {
        AWAITING: "Awaiting",
        ALLOWED: "Allowed",
        RECORDING: "Recording",
        ONVIDEO: "OnVideo",
        NOTALLOWED: "NotAllowed",
        ERROR: "Error"
    };
    
    const [ Status, setStatus ] = useState<string>("Awaiting");
    const [ stream, setStream ] = useState<any>();
    const [ VideoChunks, setVideoChunks ] = useState<any[]>([]);
    const [ Video, setVideo ] = useState<string>("");
    const [ AddQuestion, setAddQuestion ] = useState<boolean>(false);
    const [ NewQuestion, setNewQuestion ] = useState<string>("");
    const [ EditingQuestions, setEditingQuestions ] = useState<boolean[]>([]);

    const mediaRecorder : any = useRef(null);
    const liveVideoFeed : any = useRef(null);
    // const anchorRef : any = useRef(null);
    
    useEffect(()=>{
        if(Status === StatusList.ALLOWED) GetUserPermission();
    },[Status]);

    async function GetUserPermission() : Promise<void> {
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

    async function StartRecording() : Promise<void> {
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

    const StopRecording = async function() : Promise<void> {
        try {
            mediaRecorder.current.stop();
            mediaRecorder.current.onstop = async() => {
                const videoBlob:Blob = new Blob(VideoChunks, { type: "video/mp4" });
                const videoURL:string = URL.createObjectURL(videoBlob);
                setVideo(videoURL);
                setVideoChunks([]);
                setStatus(StatusList.ONVIDEO);

                const a = document.createElement("a");
                a.href = videoURL;
                const Timestamp : string = new Date().getTime().toString();
                const fileName = Paciente?.RUT+"_"+Timestamp;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();

                const id : IndexableType = await DB.table("forms").add({ Form });
                
                if(id) SuccessAlert("","Se ha creado la evaluación").fire().then(res => { if(res.isConfirmed) window.location.reload()});
                else ErrorAlert("","No se pudo crear la evaluación").fire()
                // console.log({message: "OK"});
            }
        } catch (error) {
            setStatus(StatusList.ERROR);
            console.error({error});
        }
    }

    const SuccessCallback = (stream:MediaStream) : void => {
        liveVideoFeed.current.srcObject = stream;
        const VideoStream:MediaStream | null = new MediaStream([...stream.getVideoTracks(),...stream.getAudioTracks(),]);
        setStream(VideoStream);
    }

    const ErrorCallBack = (error:unknown) : void => {
        console.error({navigatorGetUserMediaError: error});
    };

    useEffect(() => {
        // console.log({state});

        async function LoadPaciente(){
            if(state.paciente) {
                const result = await DB.table("pacients").get(state.paciente);

                // console.log({result});
                
                if(result) {
                    setPaciente(result);
                    setLoading(false);
                }
            }
        }

        LoadPaciente();
    }, []);

    useEffect(() => {
        if(props.Paciente) setPaciente(props.Paciente.Paciente);
    }, [props.Paciente]);


    const handleAddQuestion = function() : void {
        let preguntas = Form.Preguntas?.slice();
        if(preguntas){
            preguntas.push(NewQuestion);
            setForm({ ...Form, Preguntas : preguntas });
            setNewQuestion("");
        }
    }

    const handleEditQuestion = (index : number) : void => {
        let array = EditingQuestions.slice();
        array[index] = !array[index];
        setEditingQuestions(array);
    }

    const handleRemoveQuestion = (index: number) : void => {
        let array = Form.Preguntas?.slice();
        if(array){
            array.splice(index,1);
            setForm({ ...Form, Preguntas: array });
        }
    }

    const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>, index : number) : void => {
        let array = Form.Preguntas?.slice();
        if(array){
            array[index] = e.target.value;
            setForm({ ...Form, Preguntas: array });
        }
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) : void => {
        if(e.key === "Enter" || e.keyCode === 13) handleAddQuestion();
    }

    return (
        <div className='page-div'>
            {/* <Header selected="evaluacion"/> */}
            <div className='flex w-full justify-start p-6'>
                <Link to="/pacientes" className="contents">
                    <button className='btn-principal w-40 h-10'>
                        Volver
                    </button>
                </Link>
            </div>
            <div className='flex flex-row justify-center w-full self-center'>
                {Loading ? <LoadingComponent/> :
                    <>
                        <FormularioEtapa1 Paciente={Paciente} handleAddQuestion={handleAddQuestion} handleEditInput={handleEditInput} handleRemoveQuestion={handleRemoveQuestion} 
                        handleEditQuestion={handleEditQuestion} handleEnterPress={handleEnterPress} Form={Form} setForm={setForm} setPaciente={setPaciente} EditingQuestions={EditingQuestions}
                        setEditingQuestions={setEditingQuestions} AddQuestion={AddQuestion} setAddQuestion={setAddQuestion} NewQuestion={NewQuestion} setNewQuestion={setNewQuestion}/>
                        <VideoRecorder GetUserPermission={GetUserPermission} StartRecording={StartRecording} StopRecording={StopRecording} Video={Video} stream={stream} Status={Status} 
                        setStatus={setStatus} liveVideoFeed={liveVideoFeed} Paciente={Paciente}/>
                    </>
                }
            </div>
        </div>
    );
}