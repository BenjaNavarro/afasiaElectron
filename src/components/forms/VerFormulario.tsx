import { IFormulario } from "@/assets/Constants";
import { formatoRUT } from "@/assets/Utils";
import { useEffect, useState } from "react";


export default function VerFormulario(props : any) : JSX.Element {

    const [Form, setForm] = useState<Readonly<IFormulario | null | undefined>> (props.Form.Form);

    useEffect( () => console.log({props}), []);

    return (
        <div className="central-rounded-div flex-col p-2">
            <label className='w-full text-left text-xl font-bold pb-1 my-4 border-b border-dashed border-slate-800'> Ver Formulario </label>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Número de Formulario</label>
                <label className='label-form text-center w-3/4'>{Form?.Numero}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Diagnóstico de Formulario</label>
                <label className='label-form text-center w-3/4'>{Form?.Diagnostico}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Severidad de Afásia</label>
                <label className='label-form text-center w-3/4'>{Form?.SeveridadAfasia}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Observaciones</label>
                <label className='label-form text-center w-3/4'>{Form?.Observaciones}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>RUT Paciente</label>
                <label className='label-form text-center w-3/4'>{formatoRUT(Form?.Paciente || "")}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Fecha de Inicio</label>
                <label className='label-form text-center w-3/4'>{Form?.FechaInicio.toLocaleDateString()}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Fecha de Término</label>
                <label className='label-form text-center w-3/4'>{Form?.FechaTermino.toLocaleDateString()}</label>
            </div>
            <div className='flex w-full my-1'>
                {Form?.Preguntas && Form?.Preguntas?.length > 0 &&
                    <label className="w-full text-center label-form">Preguntas:</label>
                }
                {Form?.Preguntas && Form.Preguntas.length > 0 ? Form?.Preguntas.map((pregunta : string, index : number) => {
                        return(
                            <label className="w-full text-center label-form" key={index}>{pregunta}</label>
                        )
                    })
                    : <label className="w-full text-center label-form">Sin Preguntas</label>
                }
            </div>
            <div className='flex w-full justify-start my-1'>
                <button className="btn-principal w-40 h-10" title="Volver" onClick={() => props.Salir()}>
                    Volver
                </button>
            </div>
        </div>
    );
}