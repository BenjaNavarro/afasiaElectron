export interface IFormulario {
    Numero: string,
    Diagnostico: string,
    FechaInicio: Date,
    FechaTermino: Date,
    SeveridadAfasia:number,
    Preguntas: string[]
};

export interface IPacient {
    id:string,
    Nombre:string,
    RUT:string,
    FechaNacimiento:Date,
    Email:string,
    Telefono:string,
    Genero:string,
    Direccion:string,
};

export const Severidades: number[] = [ 0, 1, 2, 3, 4, 5 ];

export const GenderOptions = [ {value:"hombre",label:"Hombre"}, {value:"mujer",label:"Mujer"}, {value:"otro",label:"Otro"} ];