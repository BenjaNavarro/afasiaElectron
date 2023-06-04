import Dexie, { Table } from 'dexie';
import { IPacient } from './Constants';


export class DexieDBSchema extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    pacients!: Table<IPacient>; 

    constructor() {
        super('PacientsDatabase');
        this.version(1).stores({
            pacients: '++id, Nombre, RUT, FechaNacimiento, Email, Telefono, Genero, Direccion' // Primary key and indexed props
        });
    }
}

export const DB = new DexieDBSchema();