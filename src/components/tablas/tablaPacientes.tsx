import { useEffect, useState } from 'react';

export default function TablaPacientes(props: any): JSX.Element {
    
    const [ Pacientes, setPacientes ] = useState<any[]>(props.Pacientes||[]);

    useEffect(() => console.log({Pacientes}),[Pacientes] );

    return (
        <div className='central-rounded-div'>
            {Pacientes && Pacientes.length < 1 ? <label className='w-full self-center text-center'>No hay pacientes todavía</label> :
                <table className='table table-fixed w-full max-h-[500px]'>
                    <thead className='table-header-group border-b border-slate-800'>
                        <tr className='table-row h-8'>
                            <td className='border-r border-slate-800'>Nombre y Apellido</td>
                            <td className='border-r border-slate-800'>Rut</td>
                            <td className='border-r border-slate-800'>Fecha de Nacimiento (Edad)</td>
                            <td className=''>Opciones</td>
                        </tr>
                    </thead>
                    <tbody className='table-row-group'>
                        {Pacientes.map((paciente:any,i:number) => (
                                <tr className='table-row h-10 border-b border-slate-800 last:border-b-0' key={i}>
                                    <td className='border-r border-slate-800'>{paciente.Paciente.Nombre}</td>
                                    <td className='border-r border-slate-800'>{paciente.Paciente.RUT}</td>
                                    <td className='border-r border-slate-800'>{new Date(paciente.Paciente.FechaNacimiento).toLocaleDateString()}</td>
                                    <td></td>
                                </tr>
                            ))    
                        }
                    </tbody>
                </table>
            }
        </div>
    );
}