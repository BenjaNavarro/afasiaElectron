import { useState } from 'react';
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { IndexableType } from 'dexie';
import { differenceInYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { IPacient, GenderOptions } from '@/assets/Constants';
import { DB } from '@/assets/DataBase';
import { ConfirmationAlert, ErrorAlert, LoadingAlert, SuccessAlert } from '@/assets/Alerts';
import { ValidaRUT, formatoRUT } from '@/assets/Utils';
registerLocale("es", es);

export default function CreacionPaciente(props: any) : JSX.Element {
    
    const HOY = new Date();

    const [Paciente, setPaciente] = useState<Partial<IPacient>>({
        Nombre:"",
        RUT:"",
        Email:"",
        Telefono:"",
        Genero:"",
        Direccion:"",
        FechaNacimiento:new Date(),
    });

    const [ NameTouched, setNameTouched ] = useState<boolean>(false);
    const [ RutTouched, setRutTouched ] = useState<boolean>(false);
    const [ DateTouched, setDateTouched ] = useState<boolean>(false);

    async function CrearPaciente(): Promise<void> {
        LoadingAlert();
        const id : IndexableType = await DB.table("pacients").add({ Paciente });
        if(id) SuccessAlert("","Se ha creado el usuario").fire().then(res => { if(res.isConfirmed) window.location.reload()});
        else ErrorAlert("","No se pudo crear el usuario").fire();
    }

    return (
        <div className='central-rounded-div flex-col p-4'>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Nombre Paciente</label>
                <input type='text' className='input-form w-3/4' value={Paciente?.Nombre || ""} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPaciente({...Paciente,Nombre:e.target.value})}
                placeholder='José González' required onFocus={() => setNameTouched(true)}/>
            </div>
            {NameTouched && !Paciente.Nombre ?
                <label className='label-error'>
                    ¡Debe escribir un nombre!
                </label>
                : NameTouched && Paciente.Nombre && Paciente.Nombre.split(" ").length < 2 &&
                <label className='label-error'>
                    ¡Debe contener nombre y apellido!
                </label>
            }
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>RUT Paciente</label>
                <input type='text' className='input-form w-3/4' value={formatoRUT(Paciente?.RUT || "") || ""} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPaciente({...Paciente,RUT:formatoRUT(e.target.value)})} 
                placeholder='11.111.111-1' required onFocus={() => setRutTouched(true)}/>
            </div>
            {RutTouched && !Paciente.RUT ? 
                <label className='label-error'>
                    Debe escribir un RUT!
                </label>
                : Paciente.RUT && RutTouched && !ValidaRUT(Paciente.RUT) &&
                <label className='label-error'>
                    RUT debe ser válido!
                </label>
            }
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
                onChange={(date:Date) => setPaciente({...Paciente, FechaNacimiento: date})} placeholderText="Fecha inicial" peekNextMonth showMonthDropdown showYearDropdown onFocus={() => setDateTouched(true)}/>
            </div>
            {DateTouched && Math.abs(differenceInYears(Paciente.FechaNacimiento || new Date(), HOY )) < 18 &&
                <label className='label-error'>
                    Usuario debe ser mayor de edad!
                </label>
            }
            <div className='flex w-full justify-end my-1'>
                <button className='button-submit w-40 h-10' title='Crear Paciente' disabled={ !Paciente.RUT || !Paciente.Nombre || !ValidaRUT(Paciente.RUT) || Paciente.Nombre.split(" ").length < 2 || Math.abs(differenceInYears(Paciente.FechaNacimiento || new Date(), HOY )) < 18} 
                onClick={_ => ConfirmationAlert("", "¡Se creará el paciente con los datos ingresados!").fire().then( res => { if(res.isConfirmed) CrearPaciente() })}>
                    Finalizar
                </button>
            </div>
        </div>
    );
}