import React, { useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { GenderOptions, IPacient } from '@/assets/Constants';
import { ConfirmationAlert, ErrorAlert, LoadingAlert, SuccessAlert } from '@/assets/Alerts';
import { DB } from '@/assets/DataBase';
registerLocale("es", es);

export default function EditarPaciente(props: any): JSX.Element {

    const OriginalPacient : IPacient = props.pacient.Paciente;

    const [ ModifiedPacient, setModifiedPacient ] = useState<Partial<IPacient>>({
        Nombre: OriginalPacient.Nombre || "",
        RUT: OriginalPacient.RUT || "",
        Email: OriginalPacient.Email || "",
        Telefono: OriginalPacient.Telefono || "",
        Genero: OriginalPacient.Genero || "",
        Direccion: OriginalPacient.Direccion || "",
        FechaNacimiento: OriginalPacient.FechaNacimiento || new Date()
    });

    async function ModificarPaciente() : Promise<void> {
        LoadingAlert();
        const Paciente = { ...ModifiedPacient };
        const res = await DB.table("pacients").put({Paciente, id: props.pacient.id});
        if(res) SuccessAlert("","Se modificó el paciente").fire().then(res => { if(res.isConfirmed) window.location.reload() });
        else ErrorAlert("","No se pudo modificar el paciente").fire();
    }

    return(
        <div className='central-rounded-div flex-col p-2'>
            <label className='w-full text-left text-xl font-bold pb-1 my-4 border-b border-dashed border-slate-800'> Editar Paciente </label>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Nombre Paciente</label>
                <input type='text' className='input-form w-3/4' value={ModifiedPacient?.Nombre || ""} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setModifiedPacient({...ModifiedPacient, Nombre:e.target.value})}
                placeholder='José González'/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>RUT Paciente</label>
                <input type='text' className='input-form w-3/4' value={ModifiedPacient?.RUT || ""} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setModifiedPacient({...ModifiedPacient,RUT:e.target.value})} 
                placeholder='11.111.111-1' required/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Correo Electrónico</label>
                <input className='input-form w-3/4' type='email' value={ModifiedPacient?.Email || ""} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setModifiedPacient({...ModifiedPacient,Email:e.target.value})} 
                placeholder='correo@correo.com'/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Teléfono</label>
                <input className='input-form w-3/4' type='phone' value={ModifiedPacient?.Telefono || ""} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setModifiedPacient({...ModifiedPacient,Telefono:e.target.value})} 
                placeholder='912345678'/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Género</label>
                <select className='input-form w-3/4' value={ModifiedPacient?.Genero || ""} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setModifiedPacient({...ModifiedPacient,Genero:e.target.value})}>
                    <option value="" hidden>Seleccione Género</option>
                    <optgroup label='Género'>
                        {GenderOptions.map((gender, key) => <option value={gender.value} key={key}>{gender.label}</option>)}
                    </optgroup>
                </select>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Dirección</label>
                <input className='input-form w-3/4' type='text' value={ModifiedPacient?.Direccion || ""} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setModifiedPacient({...ModifiedPacient,Direccion:e.target.value})}
                placeholder='Av. Valparaíso 123'/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4 mr-[6.5%]'>Fecha de Nacimiento</label>
                <ReactDatePicker selected={new Date(ModifiedPacient.FechaNacimiento||"")} locale="es" dateFormat="dd/MM/yyyy" dropdownMode="select" wrapperClassName="react-datepicker-wrapper" className='input-form w-full'
                onChange={(date:Date) => setModifiedPacient({...ModifiedPacient, FechaNacimiento: date})} placeholderText="Fecha inicial" peekNextMonth showMonthDropdown showYearDropdown/>
            </div>
            <div className='flex w-full justify-evenly my-1'>
                <button className='btn-principal w-40 h-10' title='Cancelar' onClick={() => {props.setEdit(false); props.setPacient(null)}}>
                    Cancelar
                </button>
                <button className='button-submit w-40 h-10' title='Terminar' disabled={ !ModifiedPacient.RUT || !ModifiedPacient.Nombre } 
                onClick={_ => ConfirmationAlert("", "¡Se modifirá el paciente con los nuevos datos ingresados!").fire().then((res) => { if(res.isConfirmed) ModificarPaciente() })}>
                    Finalizar
                </button>
            </div>
        </div>
    );
}