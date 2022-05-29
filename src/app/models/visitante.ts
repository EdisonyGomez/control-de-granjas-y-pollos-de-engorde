export class Visitante {
      id?: string ="" ;
      nombre: string ="";
      apellido:String ="";
      documento:number;
      fecha_ingreso: Date ;
      hora_ingreso: string="";
      rol: string="";

      
constructor(nombre: string, apellido: string, documento: number,
             hora_ingreso: string, rol: string){

this.nombre = nombre;
this.apellido = apellido;
this.documento= documento;
this.fecha_ingreso = new Date();
this.hora_ingreso=hora_ingreso;
this.rol=rol;
}




}