import { useEffect, useState } from 'react';
import { IFormulario, IPacient, Severidades } from '@/assets/Constants';
import ReactDatePicker from 'react-datepicker';
import { differenceInYears } from "date-fns";
import { formatoRUT } from '@/assets/Utils';

export default function FormularioEtapa1(props:any):JSX.Element {

    const Today = new Date();
    const [Paciente, setPaciente] = useState<Partial<IPacient | null | undefined>>(null);
    const [AddQuestion, setAddQuestion] = useState(false);
    const [NewQuestion, setNewQuestion] = useState("");

    // useEffect(() => {
    //     console.log({props});
    // }, []);

    useEffect(() => {
        // console.log({FechaNacimiento:props.Paciente.FechaNacimiento});
        if(props.Paciente) setPaciente(props.Paciente.Paciente);
    }, [props.Paciente]);

    const [Form, setForm] = useState<Partial<IFormulario>>({
        Numero:"",
        Diagnostico:"",
        FechaInicio: new Date(),
        FechaTermino: new Date(),
        SeveridadAfasia: 5,
        LenguajeEspontaneo: false,
        Preguntas: []
    });

    const handleAddQuestion = function(){
        const form: Partial<IFormulario> = Form;
        const preguntas: string[] | undefined = form.Preguntas?.slice();
        preguntas?.push(NewQuestion);
        form.Preguntas = preguntas;
        setForm(form);
        setNewQuestion("");
    }

    return (
        <div className='central-rounded-div flex-col p-4 ml-6'>
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
            {Form.Preguntas?.map((p,i) => {
                return( <label key={i}> {p} </label> );
            })}
            {AddQuestion &&
                <div className='flex flex-col'>
                    <div className='flex w-full my-1'>
                        <label className='label-form w-1/4'>Nueva Pregunta</label>
                        <input type='text' className='input-form w-3/4' value={NewQuestion} onChange={e => setNewQuestion(e.target.value)}/>
                    </div>
                    <button className='btn-principal w-40 h-10' onClick={() => handleAddQuestion()}>
                        Confirmar
                    </button>
                </div>
            }
            <div className='flex w-full justify-start'>
                <button className='btn-principal w-40 h-10' onClick={() => setAddQuestion(!AddQuestion)}>
                    {AddQuestion?"Cancelar":"Añadir Pregunta"}
                </button>
            </div>
        </div>
    );
}