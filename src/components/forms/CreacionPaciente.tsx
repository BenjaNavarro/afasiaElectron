import { Dispatch, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { IndexableType } from 'dexie';
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { IPacient, GenderOptions } from '@/assets/Constants';
import { DB } from '@/assets/DataBase';
registerLocale("es", es);

export default function CreacionPaciente(props: any): JSX.Element{

    const [Paciente, setPaciente] = useState<Partial<IPacient>>({
        Nombre:"",
        RUT:"",
        Email:"",
        Telefono:"",
        Genero:"",
        Direccion:"",
        FechaNacimiento:new Date(),
    });

    async function CrearPaciente(): Promise<void> {
        const id: IndexableType = await DB.table("pacients").add({ Paciente });
        console.log({id});
        if(id) console.log("success!");
        else console.log("failed!");
    }

    return (
        <div className='central-rounded-div flex-col p-4'>
            {/* <form className='contents'> */}
                <div className='flex w-full my-1'>
                    <label className='label-form w-1/4'>Nombre Paciente</label>
                    <input type='text' className='input-form w-3/4' value={Paciente?.Nombre || ""} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPaciente({...Paciente,Nombre:e.target.value})}
                    placeholder='José González' required/>
                </div>
                <div className='flex w-full my-1'>
                    <label className='label-form w-1/4'>RUT Paciente</label>
                    <input type='text' className='input-form w-3/4' value={Paciente?.RUT || ""} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPaciente({...Paciente,RUT:e.target.value})} 
                    placeholder='11.111.111-1' required/>
                </div>
                <div className='flex w-full my-1'>
                    <label className='label-form w-1/4'>Correo Electrónico</label>
                    <input className='input-form w-3/4' type='email' value={Paciente?.Email || ""} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPaciente({...Paciente,Email:e.target.value})} 
                    placeholder='correo@correo.com'/>
                </div>
                <div className='flex w-full my-1'>
                    <label className='label-form w-1/4'>Teléfono</label>
                    <input className='input-form w-3/4' type='phone' value={Paciente?.Telefono || ""} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPaciente({...Paciente,Telefono:e.target.value})} 
                    placeholder='912345678'/>
                </div>
                <div className='flex w-full my-1'>
                    <label className='label-form w-1/4'>Género</label>
                    <select className='input-form w-3/4' value={Paciente?.Genero || ""} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setPaciente({...Paciente,Genero:e.target.value})}>
                        <option value="" hidden>Seleccione Género</option>
                        <optgroup label='Género'>
                            {GenderOptions.map((gender, key) => <option value={gender.value} key={key}>{gender.label}</option>)}
                        </optgroup>
                    </select>
                </div>
                <div className='flex w-full my-1'>
                    <label className='label-form w-1/4'>Dirección</label>
                    <input className='input-form w-3/4' type='text' value={Paciente?.Direccion || ""} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPaciente({...Paciente,Direccion:e.target.value})}
                    placeholder='Av. Valparaíso 123'/>
                </div>
                <div className='flex w-full my-1'>
                    <label className='label-form w-1/4 mr-[6.5%]'>Fecha de Nacimiento</label>
                    <ReactDatePicker selected={new Date(Paciente.FechaNacimiento||"")} locale="es" dateFormat="dd/MM/yyyy" dropdownMode="select" wrapperClassName="react-datepicker-wrapper" className='input-form w-full'
                    onChange={(date:Date) => setPaciente({...Paciente, FechaNacimiento: date})} placeholderText="Fecha inicial" peekNextMonth showMonthDropdown showYearDropdown/>
                </div>
                <div className='flex w-full justify-end my-1'>
                    <button className='button-submit w-40 h-10' title='Crear Paciente' onClick={_ => CrearPaciente()} disabled={ !Paciente.RUT || !Paciente.Nombre }>
                        Finalizar
                    </button>
                </div>
            {/* </form> */}
        </div>
    );
}