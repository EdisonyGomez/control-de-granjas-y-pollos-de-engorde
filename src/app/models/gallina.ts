export class Gallina {
    id?: string;
    fecha:Date; 
    cantidad_ponedoras: number;
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


    constructor(fecha: Date, cantidad_ponedoras: number, alimento: number,
                vermifumigaciones: string, lunes: number, martes: number, 
                miercoles:  number, jueves: number, viernes: number, sabado: number,
                domingo: number, observaciones: string){
    
    this.fecha = fecha;
    this.cantidad_ponedoras = cantidad_ponedoras;
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
