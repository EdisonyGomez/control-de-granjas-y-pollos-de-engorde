export class Codorniz {
    id?: string;
    fecha:Date; 
    cantidad_codornices: string;
    alimento: string;
    vermifumigaciones: string;
    lunes: string;
    martes: string ;
    miercoles:  Date;
    jueves: string;
    viernes: string;
    sabado: string;
    domingo: string;
    observaciones: string;


    constructor(fecha: Date, cantidad_codornices: string, alimento: string,
                vermifumigaciones: string, lunes: string, martes: string, 
                miercoles:  Date, jueves: string, viernes: string, sabado: string,
                domingo: string, observaciones: string){
    
    this.fecha = fecha;
    this.cantidad_codornices = cantidad_codornices;
    this.alimento= alimento;
    this.vermifumigaciones = vermifumigaciones;
    this.lunes=lunes;
    this.martes = martes;
    this.miercoles= miercoles;
    this.jueves=jueves;
    this.viernes=viernes;
    this.sabado=sabado;
    this.domingo=domingo;
    this.observaciones=observaciones;

    }
}
