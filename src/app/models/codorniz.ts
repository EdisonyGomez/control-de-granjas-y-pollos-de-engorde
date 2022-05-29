export class Codorniz {
    id?: string;
    fecha:Date; 
    cantidad_codornices: number;
    alimento: number;
    vermifumigaciones: string;
    lunes: number;
    martes: number ;
    miercoles:  number;
    jueves: number;
    viernes: number;
    sabado: number;
    domingo: number;
    observaciones: string;
    total_huevos?: number;


    constructor(fecha: Date, cantidad_codornices: number, alimento: number,
                vermifumigaciones: string, lunes: number, martes: number, 
                miercoles:  number, jueves: number, viernes: number, sabado: number,
                domingo: number, observaciones: string, total_huevos: number){
    
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
    this.total_huevos = total_huevos;
    }
}
