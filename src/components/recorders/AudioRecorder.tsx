import { useEffect, useState, useRef } from 'react';
import { FaMicrophone, FaCircle, FaStop, FaDownload } from "react-icons/fa";

export default function AudioRecorder(props:any){

    const mimeType = "audio/webm";

    const [permission, setPermission] = useState<Boolean>(false);
    const mediaRecorder = useRef<any>();
    const [recordingStatus, setRecordingStatus] = useState<String>("inactive");
    const [stream, setStream] = useState<any>();
    const [audioChunks, setAudioChunks] = useState<any[]>([]);
    const [audio, setAudio] = useState<any>();

    // useEffect(()=>{
    //     console.log({props});
    // },[]);

    async function getMicrophonePermission(){
        if ("MediaRecorder" in window) {
            console.log("On media recorder");
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({ audio: true, video: false});
                setPermission(true);
                setStream(streamData);
            } catch (err:any) {
                alert(err.message);
            }
        } else {
            console.error("The MediaRecorder API is not supported in your browser.");
            alert("The MediaRecorder API is not supported in your browser.");
        }
    }

    const startRecording = async () => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        if(!stream){

        }else{
            const media = new MediaRecorder(stream, { mimeType: mimeType });

            if(!media){
    
            }else{
                //set the MediaRecorder instance to the mediaRecorder ref
                mediaRecorder.current = media;
                //invokes the start method to start the recording process
                mediaRecorder.current.start();
                let localAudioChunks:any = [];
                mediaRecorder.current.dataavailable = (event:any) => {
                   if (typeof event.data === "undefined") return;
                   if (event.data.size === 0) return;
                   localAudioChunks.push(event.data);
                };
                setAudioChunks(localAudioChunks);
            }
        }

    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
        };
    };

    return (
        <div className='w-full bg-slate-50 text-slate-900 rounded flex justify-center'>
            <h1 className='text-xl font font-semibold text-center w-full self-center text-slate-900'>Grabar audio</h1>
            <div className='flex justify-center w-full'>
                {!permission?
                    <button className='w-40 h-10 text-center rounded-lg outline-1 outline-slate-800 text-slate-800' type='button'
                    onClick={async()=>{
                        await getMicrophonePermission();
                    }}>
                        <FaMicrophone className="hover:scale-105"/>
                    </button>
                :null}
                {permission && recordingStatus === "inactive" ? 
                    <button className='w-40 h-10 text-center rounded-lg outline-1 outline-slate-800 text-slate-800' 
                    onClick={startRecording} type="button">
                        <FaCircle className="hover:scale-105"/>
                    </button>
                :null}
                {recordingStatus === "recording" ? 
                    <button onClick={stopRecording} type="button">
                        <FaStop className='hover:scale-105'/>
                    </button>
                :null}
                {audio ?
                    <div className="flex flex-col w-1/2 justify-center">
                        <audio src={audio} controls/>
                        <a download href={audio} className='focus:outline focus:outline-slate-900 rounded text-slate-900 text-lg'>
                            <FaDownload className='hover:scale-105'/> 
                        </a>
                    </div>
                : null}
            </div>
        </div>
    );
}