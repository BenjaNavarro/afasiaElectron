import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import Header from '@/components/utils/Header';
import TablaPacientes from '@/components/tablas/tablaPacientes';
import CreacionPaciente from '@/components/forms/CreacionPaciente';
import { DB } from '@/assets/DataBase';
import LoadingComponent from '@/components/utils/LoadingComponent';
import EditarPaciente from '@/components/forms/EditarPaciente';
import { IFormulario, IPacient } from '@/assets/Constants';
import VerPaciente from '@/components/forms/VerPaciente';
import Evaluaciones from '../components/tablas/evaluaciones';
import VerFormulario from '@/components/forms/VerFormulario';
import EditarFormulario from '@/components/forms/EditarFormulario';

export default function pacientes(props: any):JSX.Element {

    const [ NewPatient, setNewPatient ] = useState<boolean>(false);
    const [ Loading, setLoading ] = useState<boolean>(true);
    const [ Edit, setEdit ] = useState<boolean>(false);
    const [ VerEvaluaciones, setVerEvaluaciones ] = useState<boolean>(false);
    const [ DatosPaciente, setDatosPaciente ] = useState<boolean>(false);
    const [ VerForm, setVerForm ] = useState<boolean>(false);
    const [ EditForm, setEditForm ] = useState<boolean>(false);
    const [ Pacient, setPacient ] = useState<Partial<IPacient | null>>(null);
    const [ Form, setForm ] = useState<Partial<IFormulario | null>>(null);
    

    const Pacientes = useLiveQuery( async () => {
        const pacientes:any[] = await DB.table("pacients").toArray();
        // console.log({pacientes});
        return pacientes;
    });

    useEffect(() => {
        if(!Pacientes) setLoading(true);
        else setLoading(false);
    },[ Pacientes ]);

    // useEffect(() => {
    //     console.log({paciente:sessionStorage.getItem("paciente")});
    // },[]);

    return (
        <div className='page-div'>
            {/* <Header selected="pacientes"/> */}
            <div className='flex flex-col self-center justify-center w-[90%] mb-20 mt-20'>
                <label className='text-center w-full text-2xl text-slate-800 font-semibold mb-8'>Pacientes</label>
                {!Edit && !DatosPaciente && !VerEvaluaciones &&
                    <button className='w-40 h-10 self-start btn-principal' onClick={ _ => { setNewPatient(!NewPatient); setEdit(false); }} disabled={Loading}>
                        {NewPatient? "Cancelar" : "Crear Paciente"}
                    </button>
                }
            </div>
            {Loading ? <LoadingComponent/> 
                : NewPatient ? <CreacionPaciente Salir={() => setNewPatient(false)}/> 
                : Edit ? <EditarPaciente pacient={Pacient} setEdit={setEdit} setPacient={setPacient} Salir={() => { setNewPatient(false); setEdit(false); setPacient(null) }}/> 
                : DatosPaciente ? <VerPaciente pacient={Pacient} setDatosPaciente={setDatosPaciente} setEdit={setEdit} setPacient={setPacient}/>
                : VerForm ? <VerFormulario Salir={() => {setVerForm(false); setForm(null)}} Form={Form}/>
                : EditForm ? <EditarFormulario Salir={() => {setEditForm(false); setForm(null)}} Form={Form}/>
                : VerEvaluaciones ? <Evaluaciones Pacient={Pacient} Salir={() => {setVerEvaluaciones(false); setPacient(null)}} setForm={setForm} setVerForm={setVerForm} setEditForm={setEditForm}/>
                : <TablaPacientes Pacientes={Pacientes} setEdit={setEdit} setPacient={setPacient} setDatosPaciente={setDatosPaciente} setVerEvaluaciones={setVerEvaluaciones}/>
            }
        </div>
    );
}