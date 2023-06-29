import Dexie, { Table } from 'dexie';
import { IFormulario, IPacient } from './Constants';

export class DexieDBSchema extends Dexie {
    
    pacients!: Table<IPacient>; 
    forms!: Table<IFormulario>;

    constructor() {
        super('Database');
        this.version(2).stores({
            pacients: '++id, Nombre, RUT, FechaNacimiento, Email, Telefono, Genero, Direccion',
            forms: '++id, Numero, Diagnostico, FechaInicio, FechaTermino, SeveridadAfasia, Preguntas, Paciente, Observaciones, Archivo',
        });
    }
}

export const DB = new DexieDBSchema();