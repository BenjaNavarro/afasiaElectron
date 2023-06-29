import { useLiveQuery } from 'dexie-react-hooks';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { DB } from '@/assets/DataBase';
import { PromiseExtended } from 'dexie';
import { ConfirmationAlert, ErrorAlert, LoadingAlert, SuccessAlert } from '@/assets/Alerts';

export default function Evaluaciones(props : any) : JSX.Element {

    const { Pacient, Salir, setVerForm, setEditForm, setForm } = props;
    const evaluaciones : any[] | undefined = useLiveQuery( async() => {
        const RUT = Pacient.Paciente.RUT;
        let p : any[] = await DB.table("forms")
        // .where({"Paciente": Pacient.Paciente.RUT})
        .toArray();

        p = p.filter(e => e.Form.Paciente ===  RUT);
        // console.log({p});
        return p;
    });

    async function EliminarFormulario(id: string): Promise<PromiseExtended<void>> {
        LoadingAlert();
        await DB.table("forms").where("id").equals(id).delete().then(res => {
            if(res > 0) SuccessAlert("", "Se eliminó el paciente correctamente").fire().then( res => { if(res.isConfirmed) window.location.reload() });
            else ErrorAlert("", "Ocurrió un error al eliminar el paciente").fire();
        });
    }

    return(
        <>
            <label className='w-full text-center text-xl font-bold pb-1 my-4'>Evaluaciones { Pacient.Paciente.Nombre }</label>
            <div className='central-rounded-div flex-col'>
                {evaluaciones && evaluaciones.length < 1 ? <label className='w-full self-center text-center p-4'>El paciente no tiene evaluaciones aún.</label> :
                    <table className='table table-fixed w-full max-h-[500px] border-b border-slate-800'>
                        <thead className='table-header-group border-b border-slate-800'>
                            <tr className='table-row h-8 font-bold'>
                                <th className='border-r border-slate-800'>Número</th>
                                <th className='border-r border-slate-800'>Fecha Inicio</th>
                                <th className='border-r border-slate-800'>Fecha Término</th>
                                <th className=''>Opciones</th>
                            </tr>
                        </thead>
                        <tbody className='table-row-group'>
                            {evaluaciones?.map((evaluacion:any, index:number) => {
                                return(
                                    <tr className='table-row h-10 border-b border-slate-800 last:border-b-0' key={index}>
                                        <td className='border-r border-slate-800'>{evaluacion.Form.Numero}</td>
                                        <td className='border-r border-slate-800'>{new Date(evaluacion.Form.FechaInicio).toLocaleDateString()}</td>
                                        <td className='border-r border-slate-800'>{new Date(evaluacion.Form.FechaTermino).toLocaleDateString()}</td>
                                        <td className='flex flex-wrap justify-center items-center'>
                                            <button className='btn-tabla' title='Editar' onClick={() => {setForm(evaluacion); setEditForm(true)}}>
                                                <FaPen className='btn-icon'/>
                                            </button>
                                            <button className='btn-tabla' title='Eliminar' onClick={() => { ConfirmationAlert("","Eliminará al paciente!").fire().then( res => { if(res.isConfirmed) EliminarFormulario(evaluacion.id) }) }}>
                                                <FaTrash className='btn-icon'/>
                                            </button>
                                            <button className='btn-tabla' title='Ver' onClick={() => {setForm(evaluacion); setVerForm(true)}}>
                                                <FaEye className='btn-icon'/>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                }
                <div className='flex w-full justify-start my-1 px-2'>
                    <button className='btn-principal w-40 h-10' title='Cancelar' onClick={() => {Salir()}}>
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    );
}