import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import Header from '@/components/utils/Header';
import TablaPacientes from '@/components/tablas/tablaPacientes';
import CreacionPaciente from '@/components/forms/CreacionPaciente';
import { DB } from '@/assets/DataBase';
import LoadingComponent from '@/components/utils/LoadingComponent';

export default function pacientes(props: any):JSX.Element {

    const [NewPatient, setNewPatient] = useState<boolean>(false);
    const [Loading, setLoading] = useState<boolean>(true);
    const [Pacientes, setPacientes] = useState<any[] | undefined>(useLiveQuery( async () => {
        const pacientes:any[] = await DB.table("pacients").toArray();
        setLoading(false);
        return pacientes;
    }));
    // const Pacientes = useLiveQuery( async () => {
    //     const pacientes = await DB.table("pacients").toArray();
    //     setLoading(false);
    //     return pacientes;
    // });

    return (
        <div className='page-div'>
            <Header selected="pacientes"/>
            <div className='flex flex-col self-center justify-center w-[90%] -mt-20 mb-20'>
                <label className='text-center w-full text-2xl text-slate-800 font-semibold mb-8'>Pacientes</label>
                <button className='w-40 h-10 self-start btn-principal' onClick={_ => setNewPatient(!NewPatient)} disabled={Loading}>
                    {NewPatient? "Cancelar" : "Crear Paciente"}
                </button>
            </div>
            {Loading ? <LoadingComponent/> : NewPatient ? <CreacionPaciente/> : <TablaPacientes Pacientes={Pacientes}/>}
        </div>
    );
}