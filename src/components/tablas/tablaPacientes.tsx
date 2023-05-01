import { useEffect, useState } from 'react';

export default function TablaPacientes(props: any): JSX.Element {
    return (
        <div className='central-rounded-div'>
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
                    <tr className='table-row h-10 border-b border-slate-800'>
                        <td className='border-r border-slate-800'>Pedro García</td>
                        <td className='border-r border-slate-800'>7.234.432-k</td>
                        <td className='border-r border-slate-800'>23/08/1950</td>
                        <td></td>
                    </tr>
                    <tr className='table-row h-10 border-b border-slate-800'>
                        <td className='border-r border-slate-800'>Santiago Escobar</td>
                        <td className='border-r border-slate-800'>8.257.102-0</td>
                        <td className='border-r border-slate-800'>13/12/1949</td>
                        <td></td>
                    </tr>
                    <tr className='table-row h-10 border-b border-slate-800'>
                        <td className='border-r border-slate-800'>Felicindo Núñez</td>
                        <td className='border-r border-slate-800'>6.550.301-2</td>
                        <td className='border-r border-slate-800'>10/07/1946</td>
                        <td></td>
                    </tr>
                    <tr className='table-row h-10 border-b border-slate-800'>
                        <td className='border-r border-slate-800'>Armando Gutiérrez</td>
                        <td className='border-r border-slate-800'>5.501.638-8</td>
                        <td className='border-r border-slate-800'>01/03/1947</td>
                        <td></td>
                    </tr>
                    <tr className='table-row h-10 border-b border-slate-800'>
                        <td className='border-r border-slate-800'>Felipe Soto</td>
                        <td className='border-r border-slate-800'>5.553.731-9</td>
                        <td className='border-r border-slate-800'>20/05/1947</td>
                        <td></td>
                    </tr>
                    <tr className='table-row h-10 border-b border-slate-800'>
                        <td className='border-r border-slate-800'>José Fernández</td>
                        <td className='border-r border-slate-800'>5.021.601-9</td>
                        <td className='border-r border-slate-800'>30/04/1944</td>
                        <td></td>
                    </tr>
                    <tr className='table-row h-10 border-b border-slate-800'>
                        <td className='border-r border-slate-800'>Margarita Figueroa</td>
                        <td className='border-r border-slate-800'>6.537.446-3</td>
                        <td className='border-r border-slate-800'>09/10/1946</td>
                        <td></td>
                    </tr>
                    <tr className='table-row h-10 border-b border-slate-800'>
                        <td className='border-r border-slate-800'>Salomón Inostroza</td>
                        <td className='border-r border-slate-800'>6.300.778-7</td>
                        <td className='border-r border-slate-800'>26/02/1942</td>
                        <td></td>
                    </tr>
                    <tr className='table-row h-10'>
                        <td className='border-r border-slate-800'>Josefa Hernández</td>
                        <td className='border-r border-slate-800'>6.101.076-3</td>
                        <td className='border-r border-slate-800'>16/11/1943</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}