import { useState } from "react";
import { IFormulario, Severidades } from "@/assets/Constants";
import { ConfirmationAlert, ErrorAlert, LoadingAlert, SuccessAlert } from "@/assets/Alerts";
import { DB } from "@/assets/DataBase";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { FaCheck, FaPen, FaPlus, FaTimes, FaTrash } from "react-icons/fa";

registerLocale("es",es);

export default function EditarFormulario(props : any) : JSX.Element {

    const OriginalForm : IFormulario = props.Form.Form;

    const [ ModifiedForm, setModifiedForm ] = useState<Partial<IFormulario>>({
        Numero: OriginalForm.Numero || "",
        Paciente: OriginalForm.Paciente || "",
        Diagnostico: OriginalForm.Diagnostico || "",
        FechaInicio: OriginalForm.FechaInicio || new Date(),
        FechaTermino: OriginalForm.FechaTermino || new Date(),
        SeveridadAfasia: OriginalForm.SeveridadAfasia || 5,
        LenguajeEspontaneo: OriginalForm.LenguajeEspontaneo || false,
        Preguntas: OriginalForm.Preguntas || [],
        Observaciones: OriginalForm.Observaciones || "",
    });

    const [ AddQuestion, setAddQuestion ] = useState<boolean>(false);
    const [ NewQuestion, setNewQuestion ] = useState<string>("");
    const [ EditingQuestions, setEditingQuestions ] = useState<boolean[]>([]);

    async function ModificarForm() : Promise<void> {
        LoadingAlert();
        const Form = { ...ModifiedForm };
        const res = await DB.table("forms").put({Form, id: props.Form.id});
        if(res) SuccessAlert("","Se modificó el formulario").fire().then(res => { if(res.isConfirmed) window.location.reload() });
        else ErrorAlert("","No se pudo modificar el formulario").fire();
    }

    const handleAddQuestion = function() : void {
        let preguntas = ModifiedForm.Preguntas?.slice();
        if(preguntas){
            preguntas.push(NewQuestion);
            setModifiedForm({ ...ModifiedForm, Preguntas : preguntas });
            setNewQuestion("");
        }
    }

    const handleEditQuestion = (index : number) : void => {
        let array = EditingQuestions.slice();
        array[index] = !array[index];
        setEditingQuestions(array);
    }

    const handleRemoveQuestion = (index: number) : void => {
        let array = ModifiedForm.Preguntas?.slice();
        if(array){
            array.splice(index,1);
            setModifiedForm({ ...ModifiedForm, Preguntas: array });
        }
    }

    const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>, index : number) : void => {
        let array = ModifiedForm.Preguntas?.slice();
        if(array){
            array[index] = e.target.value;
            setModifiedForm({ ...ModifiedForm, Preguntas: array });
        }
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) : void => {
        if(e.key === "Enter" || e.keyCode === 13) handleAddQuestion();
    }

    return (
        <div className="central-rounded-div flex-col p-2 overflow-y-auto overflow-x-hidden max-h-none">
            <label className='w-full text-left text-xl font-bold pb-1 my-4 border-b border-dashed border-slate-800'> Editar Formulario </label>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Grado de Severidad</label>
                <select className='input-form w-3/4' value={ModifiedForm.SeveridadAfasia || 0} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> setModifiedForm({...ModifiedForm, SeveridadAfasia: Number(e.target.value)})}>
                    <optgroup label='Grados de Severidad'>
                        {Severidades.map((severidad:number,key:number) => <option key={key} value={severidad}>{severidad}</option>)}
                    </optgroup>
                </select>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Número</label>
                <input type='text' className='input-form w-3/4' value={ModifiedForm.Numero || ""} placeholder='Número de Ficha' 
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setModifiedForm({...ModifiedForm,Numero:e.target.value})}/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Diagnóstico</label>
                <textarea className='input-form w-3/4' value={ModifiedForm.Diagnostico || ""} placeholder='Diagnóstico de Paciente' 
                onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setModifiedForm({...ModifiedForm,Diagnostico:e.target.value})}/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Fecha Inicio</label>
                <ReactDatePicker selected={ModifiedForm.FechaInicio} onChange={(date: Date) => setModifiedForm({ ...ModifiedForm, FechaInicio: date })} className='input-form w-3/4' wrapperClassName='w-full'
                locale="es" dateFormat="dd/MM/yyyy" dropdownMode="select" peekNextMonth showMonthDropdown showYearDropdown placeholderText='Fecha Inicio'/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Fecha Término</label>
                <ReactDatePicker selected={ModifiedForm.FechaTermino} onChange={(date:Date) => setModifiedForm({...ModifiedForm, FechaTermino: date})} className='input-form w-3/4' wrapperClassName='w-full'
                locale="es" dateFormat="dd/MM/yyyy" dropdownMode="select" peekNextMonth showMonthDropdown showYearDropdown placeholderText='Fecha Término'/>
            </div>
            <div className='flex w-full my-1'>
                <label className='label-form w-1/4'>Lenguaje Espontáneo</label>
                <input type='checkbox' checked={ModifiedForm.LenguajeEspontaneo} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setModifiedForm({...ModifiedForm,LenguajeEspontaneo:e.target.checked})}/>
            </div>
            {ModifiedForm.Preguntas && ModifiedForm.Preguntas?.length > 0 && 
                <label className='text-lg font-bold text-left'>
                    Preguntas:
                </label>
            }
            {ModifiedForm.Preguntas?.map(( p : string, i : number ) => 
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
                <textarea className='input-form w-3/4' value={ModifiedForm.Observaciones || ""} placeholder='Observaciones del Paciente' onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setModifiedForm({ ...ModifiedForm, Observaciones : e.target.value })}/>
            </div>
            <div className="flex w-full justify-around my-1">
                <button className="btn-principal w-40 h-10" title="Volver" onClick={() => props.Salir()}>
                    Volver
                </button>
                <button className="btn-principal w-40 h-10" title="Terminar" onClick={() => {ConfirmationAlert("","Se modificará el formulario!").fire().then( res => { if(res.isConfirmed) ModificarForm() })}}>
                    Terminar
                </button>
            </div>
        </div>
    );
}