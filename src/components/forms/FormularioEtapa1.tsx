import React, { useEffect, useState } from 'react';
import { IFormulario, IPacient, Severidades } from '@/assets/Constants';
import ReactDatePicker from 'react-datepicker';
import { differenceInYears } from "date-fns";
import { formatoRUT } from '@/assets/Utils';
import { FaCheck, FaPen, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';

export default function FormularioEtapa1(props:any) : JSX.Element {

    const { Paciente, Form, setForm, EditingQuestions, handleEditInput, handleAddQuestion, handleEditQuestion, handleEnterPress, 
        AddQuestion, setAddQuestion, setNewQuestion, NewQuestion, handleRemoveQuestion } = props;

    const Today = new Date();

    return(
        <div className='central-rounded-div flex-col p-6 ml-6 overflow-y-auto overflow-x-hidden max-h-none'>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/3 text-center'>{Paciente?.Nombre}</label>
                <label className='label-form w-1/3 text-center'>{formatoRUT(Paciente?.RUT||"")}</label>
                <label className='label-form w-1/3 text-center'>{Paciente?.FechaNacimiento ? Math.abs(differenceInYears(Paciente?.FechaNacimiento, Today))+ " Años" : ""}</label>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Grado de Severidad</label>
                <select className='input-form w-3/4' value={Form.SeveridadAfasia || 0} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> setForm({...Form, SeveridadAfasia: Number(e.target.value)})}>
                    <optgroup label='Grados de Severidad'>
                        {Severidades.map((severidad:number,key:number) => <option key={key} value={severidad}>{severidad}</option>)}
                    </optgroup>
                </select>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Número</label>
                <input type='text' className='input-form w-3/4' value={Form.Numero || ""} placeholder='Número de Ficha' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setForm({...Form,Numero:e.target.value})}/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Diagnóstico</label>
                <textarea className='input-form w-3/4' value={Form.Diagnostico || ""} placeholder='Diagnóstico de Paciente' onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setForm({...Form,Diagnostico:e.target.value})}/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Fecha Inicio</label>
                <ReactDatePicker selected={Form.FechaInicio} onChange={(date: Date) => setForm({ ...Form, FechaInicio: date })} className='input-form w-3/4' wrapperClassName='w-full'/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Fecha Término</label>
                <ReactDatePicker selected={Form.FechaTermino} onChange={(date:Date) => setForm({...Form, FechaTermino: date})} className='input-form w-3/4' wrapperClassName='w-full'/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Lenguaje Espontáneo</label>
                <input type='checkbox' checked={Form.LenguajeEspontaneo} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setForm({...Form,LenguajeEspontaneo:e.target.checked})}/>
            </div>
            {Form.Preguntas && Form.Preguntas?.length > 0 && 
                <label className='text-lg font-bold text-left'>
                    Preguntas:
                </label>
            }
            {Form.Preguntas?.map(( p : string, i : number ) => 
                <div className='flex items-center w-full text-base' key={i}> 
                    <label className='text-left font-bold'> {i+1} </label>
                    {EditingQuestions[i] ?
                        <input className='w-full input-form mx-1 p-0' value={p} onChange={(e) => handleEditInput(e,i)}/>
                        :
                        <label className='w-full text-center'> {p} </label>
                    }
                    <button className='btn-tabla' title={EditingQuestions[i] ?'Terminar':'Editar'} onClick={() => handleEditQuestion(i)}>
                        {EditingQuestions[i] ?
                            <FaCheck className='btn-icon'/> : <FaPen className='btn-icon'/>
                        }
                    </button>
                    <button className='btn-tabla' title='Eliminar' onClick={() => handleRemoveQuestion(i)}>
                        <FaTrash className='btn-icon'/>
                    </button>
                </div> 
            )}
            <div className='flex w-full'>
                {AddQuestion ?
                    <>
                        <label className='label-form w-1/4'>Nueva Pregunta</label>
                        <input type='text' className='input-form w-3/4' value={NewQuestion} onChange={e => setNewQuestion(e.target.value)} onKeyDown={e => handleEnterPress(e)}
                        placeholder='Escriba una pregunta'/>
                        <button className='btn-tabla' onClick={() => handleAddQuestion()} disabled={!NewQuestion}>
                            <FaPlus className='btn-icon scale-100'/>
                        </button>
                        <button className='btn-tabla' onClick={() => setAddQuestion(false)}>
                            <FaTimes className="btn-icon"/>
                        </button>
                    </>
                    :
                    <button className='btn-principal w-full h-10' onClick={() => setAddQuestion(true)}>
                        Añadir Pregunta
                    </button>
                }
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Observaciones</label>
                <textarea className='input-form w-3/4' value={Form.Observaciones || ""} placeholder='Observaciones del Paciente' onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setForm({ ...Form, Observaciones : e.target.value })}/>
            </div>
        </div>
    );
}