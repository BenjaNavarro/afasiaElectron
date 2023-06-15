import { useEffect, useRef, useState } from 'react';
import Header from '@/components/utils/Header';
import FormularioEtapa1 from '@/components/forms/FormularioEtapa1';
import VideoRecorder from '@/components/utils/VideoRecorder';
import { IPacient } from '@/assets/Constants';
import { useLocation } from 'react-router-dom';
import { DB } from '@/assets/DataBase';
import LoadingComponent from '@/components/utils/LoadingComponent';

export default function Evaluacion(props:any) : JSX.Element {

    const [ Paciente, setPaciente ] = useState<Partial<IPacient | null | undefined>>(null);
    const [ Loading, setLoading ] = useState<boolean>(true);
    const { state } = useLocation();

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

    return (
        <div className='page-div'>
            {/* <Header selected="evaluacion"/> */}
            <div className='flex flex-row justify-center w-full self-center'>
                {Loading ? <LoadingComponent/> :
                    <>
                        <FormularioEtapa1 Paciente={Paciente}/>
                        <VideoRecorder/>
                    </>
                }
            </div>
        </div>
    );
}