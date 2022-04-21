export class Pollo {
    $key?: string;
    numero_galpon:string; 
    numero_pollos: string;
    peso_sacrificio: string;
    muerte_pre_sacrificio: string;
    medicamentos: string;
    fecha_ingreso: Date ;
    fecha_egreso:  Date;
    observaciones: string;


    constructor(numero_galpon: string, numero_pollos: string, peso_sacrificio: string,
                muerte_pre_sacrificio: string, medicamentos: string, observaciones: string){
    
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
