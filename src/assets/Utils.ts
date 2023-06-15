
export function NumberWithCommas(x: number | string):string{
    if(x){
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
    }else return "";
}

export function formatoRUT(rut: string): string{
    if(!rut) return rut;

    const nuevoRut = rut.replace(/\./g,'').replace(/-/g, '').trim().toLowerCase();
    const ultimoDigito = nuevoRut.substr(-1, 1);
    const rutDigito = nuevoRut.substr(0, nuevoRut.length-1);
    let format = NumberWithCommas(rutDigito);
    
    if (rut.length!==0) return format.concat('-').concat(ultimoDigito);
    else return "";
}