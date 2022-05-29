export class Pollo {
    id?: string;
    numero_galpon:number; 
    numero_pollos: number;
    peso_sacrificio: number;
    muerte_pre_sacrificio: number;
    medicamentos: string;
    fecha_ingreso: Date ;
    fecha_egreso:  Date;
    observaciones: string;


    constructor(numero_galpon: number, numero_pollos: number, peso_sacrificio: number,
                muerte_pre_sacrificio: number, medicamentos: string, observaciones: string){
    
    this.numero_galpon = numero_galpon;
    this.numero_pollos = numero_pollos;
    this.peso_sacrificio= peso_sacrificio;
    this.muerte_pre_sacrificio = muerte_pre_sacrificio;
    this.medicamentos=medicamentos;
    this.fecha_ingreso=new Date();
    this.fecha_egreso= new Date();
    this.observaciones=observaciones;
    }
}
