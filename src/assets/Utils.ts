
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

export function ValidaRUT(rutCompleto: string) : boolean {
    if (!rutCompleto || rutCompleto.replace(/\./g,"").length < 7) return false
    rutCompleto = rutCompleto.replace(/\./g,"")
    
    const Modulo11 : (T: any) => string | number = (T : string) : string | number => {
            let M : number = 0, S : number = 1,t : number = Number(T);
            for (; t; t = Math.floor(t / 10))
                S = (S + t % 10 * (9 - M++ % 6)) % 11;

            return S ? S - 1 : 'k';
    }

    if (!/^[0-9]+-[0-9kK]{1}$/.test(rutCompleto)) return false;

    let tmp : string[] = rutCompleto.split('-');
    let digv : string = tmp[1];
    let rut : string = tmp[0];

    if (rut.length < 7) return false;
    if (digv == 'K') digv = 'k';
    
    return (Modulo11(rut).toString() === digv);
}