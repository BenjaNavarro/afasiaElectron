import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import Header from '@/components/utils/Header';
import TablaPacientes from '@/components/tablas/tablaPacientes';
import CreacionPaciente from '@/components/forms/CreacionPaciente';
import { DB } from '@/assets/DataBase';
import LoadingComponent from '@/components/utils/LoadingComponent';
import EditarPaciente from '@/components/forms/EditarPaciente';
import { IPacient } from '@/assets/Constants';
import VerPaciente from '@/components/forms/VerPaciente';

export default function pacientes(props: any):JSX.Element {

    const [ NewPatient, setNewPatient ] = useState<boolean>(false);
    const [ Loading, setLoading ] = useState<boolean>(true);
    const [ Edit, setEdit ] = useState<boolean>(false);
    const [ DatosPaciente, setDatosPaciente ] = useState<boolean>(false);
    const [ Pacient, setPacient ] = useState<Partial<IPacient | null>>(null);
    const Pacientes = useLiveQuery( async () => {
        const pacientes:any[] = await DB.table("pacients").toArray();
        // console.log({pacientes});
        return pacientes;
    });

    useEffect(() => {
        if(!Pacientes) setLoading(true);
        else setLoading(false);
    },[ Pacientes ]);

    useEffect(() => {
        console.log({paciente:sessionStorage.getItem("paciente")});
    },[]);

    return (
        <div className='page-div'>
            {/* <Header selected="pacientes"/> */}
            <div className='flex flex-col self-center justify-center w-[90%] -mt-96 mb-20'>
                <label className='text-center w-full text-2xl text-slate-800 font-semibold mb-8'>Pacientes</label>
                <button className='w-40 h-10 self-start btn-principal' onClick={ _ => { setNewPatient(!NewPatient); setEdit(false); }} disabled={Loading}>
                    {NewPatient? "Cancelar" : "Crear Paciente"}
                </button>
            </div>
            {Loading ? <LoadingComponent/> 
                : NewPatient ? <CreacionPaciente/> 
                : Edit ? <EditarPaciente pacient={Pacient} setEdit={setEdit} setPacient={setPacient}/> 
                : DatosPaciente ? <VerPaciente pacient={Pacient} setDatosPaciente={setDatosPaciente} setEdit={setEdit} setPacient={setPacient}/>
                : <TablaPacientes Pacientes={Pacientes} setEdit={setEdit} setPacient={setPacient} setDatosPaciente={setDatosPaciente}/>
            }
        </div>
    );
}