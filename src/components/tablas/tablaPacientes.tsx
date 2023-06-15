import { ConfirmationAlert, ErrorAlert, LoadingAlert, SuccessAlert } from '@/assets/Alerts';
import { DB } from '@/assets/DataBase';
import { PromiseExtended } from 'dexie';
import { session } from 'electron';
import { useEffect, useState } from 'react';
import { FaEye, FaPen, FaTrash, FaVideo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { differenceInYears } from "date-fns";
import { formatoRUT } from '@/assets/Utils';

export default function TablaPacientes(props: any): JSX.Element {
    
    const Today = new Date();
    const [ Pacientes, setPacientes ] = useState<any[]>(props.Pacientes||[]);
    
    async function EliminarPaciente(id: string): Promise<PromiseExtended<void>> {
        LoadingAlert();
        await DB.table("pacients").where("id").equals(id).delete().then(res => {
            // console.log({res});
            if(res > 0) SuccessAlert("", "Se eliminó el paciente correctamente").fire().then( res => { if(res.isConfirmed) window.location.reload() });
            else ErrorAlert("", "Ocurrió un error al eliminar el paciente").fire();
        });
    }

    console.log({Pacientes});

    return (
        <div className='central-rounded-div'>
            {Pacientes && Pacientes.length < 1 ? <label className='w-full self-center text-center p-4'>No hay pacientes todavía</label> :
                <table className='table table-fixed w-full max-h-[500px]'>
                    <thead className='table-header-group border-b border-slate-800'>
                        <tr className='table-row h-8 font-bold'>
                            <td className='border-r border-slate-800'>Nombre y Apellido</td>
                            <td className='border-r border-slate-800'>Rut</td>
                            <td className='border-r border-slate-800'>Fecha de Nacimiento (Edad)</td>
                            <td className=''>Opciones</td>
                        </tr>
                    </thead>
                    <tbody className='table-row-group'>
                        {Pacientes.map(( paciente:any, i:number ) => (
                            <tr className='table-row h-10 border-b border-slate-800 last:border-b-0' key={i}>
                                <td className='border-r border-slate-800'>{paciente.Paciente.Nombre}</td>
                                <td className='border-r border-slate-800'>{formatoRUT(paciente.Paciente.RUT)}</td>
                                <td className='border-r border-slate-800'>{new Date(paciente.Paciente.FechaNacimiento).toLocaleDateString()} ({Math.abs(differenceInYears(new Date(paciente.Paciente.FechaNacimiento), Today))+" Años."})</td>
                                <td className='flex flex-wrap justify-center items-center'>
                                    <button className='btn-tabla' title='Editar Paciente' onClick={() => { props.setEdit(true); props.setPacient(paciente) }}>
                                        <FaPen className='btn-icon'/>
                                    </button>
                                    <button className='btn-tabla' title='Eliminar Paciente' 
                                    onClick={() => {  ConfirmationAlert("","Eliminará al paciente!").fire().then( res => { if(res.isConfirmed) EliminarPaciente(paciente.id) }) }}>
                                        <FaTrash className='btn-icon'/>
                                    </button>
                                    <button className='btn-tabla' title='Ver Paciente' onClick={() => {props.setDatosPaciente(true); props.setPacient(paciente)} }>
                                        <FaEye className='btn-icon'/>
                                    </button>
                                    <button className='btn-tabla' title='Iniciar Evaluación'>
                                        <Link to={"/evaluacion"} state={{ paciente: paciente.id }} className='contents'>
                                            <FaVideo className='btn-icon'/>
                                        </Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}