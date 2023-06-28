import { IPacient } from '@/assets/Constants';
import { useEffect, useState } from 'react';

export default function VerPaciente(props: any): JSX.Element {

    const [Paciente, setPaciente] = useState<Readonly<IPacient | null | undefined>>(props.pacient);

    // useEffect( () => console.log({props}), []);

    return (
        <div className='central-rounded-div flex flex-col p-2'>
            <label className='w-full text-left text-xl font-bold pb-1 my-4 border-b border-dashed border-slate-800'> Ver Paciente </label>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Nombre Paciente</label>
                <label className='label-form text-center w-3/4'>{Paciente?.Nombre}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>RUT Paciente</label>
                <label className='label-form text-center w-3/4'>{Paciente?.RUT}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Correo Electrónico</label>
                <label className='label-form text-center w-3/4'>{Paciente?.Email}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Teléfono</label>
                <label className='label-form text-center w-3/4'>{Paciente?.Telefono}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Género</label>
                <label className='label-form text-center w-3/4'>{Paciente?.Genero}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Dirección</label>
                <label className='label-form text-center w-3/4'>{Paciente?.Direccion}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>RUT Paciente</label>
                <label className='label-form text-center w-3/4'>{Paciente?.FechaNacimiento?.toLocaleDateString()}</label>
            </div>
            <div className='flex w-full justify-evenly my-1'>
                <button className='btn-principal w-40 h-10' title='Cancelar' onClick={() => {props.setDatosPaciente(false); props.setPacient(null)}}>
                    Cancelar
                </button>
                <button className='button-submit w-40 h-10' title='Terminar'
                onClick={ _ => { props.setDatosPaciente(false);props.setEdit(true); } }>
                    Modificar
                </button>
            </div>
        </div>
    );
}