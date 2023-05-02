import { useState } from 'react';
import Header from '@/components/utils/Header';
import TablaPacientes from '@/components/tablas/tablaPacientes';
import CreacionPaciente from '@/components/forms/CreacionPaciente';

export default function pacientes(props: any):JSX.Element {

    const [NewPatient, setNewPatient] = useState<boolean>(false);

    return (
        <div className='page-div'>
            <Header selected="pacientes"/>
            <div className='flex flex-col self-center justify-center w-[90%] -mt-20 mb-20'>
                <label className='text-center w-full text-2xl text-slate-800 font-semibold mb-8'>Pacientes</label>
                <button className='w-40 h-10 self-start btn-principal' onClick={_ => setNewPatient(!NewPatient)}>
                    {NewPatient? "Cancelar" : "Crear Paciente"}
                </button>
            </div>
            {NewPatient ? <CreacionPaciente/> : <TablaPacientes/>}
        </div>
    );
}