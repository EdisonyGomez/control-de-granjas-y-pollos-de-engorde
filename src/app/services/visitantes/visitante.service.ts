import { Injectable } from '@angular/core';

//firebase
import { AngularFireDatabase,  AngularFireList } from '@angular/fire/compat/database';

//clases
import { Visitante } from 'src/app/models/visitante';
import { Vehiculo } from './../../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {

  //VISITANTE
  visitanteList!: AngularFireList<any>; 
  selectedVisitante: Visitante = new Visitante();
  
  //VEHICULO
  vehiculoList!: AngularFireList<any>;
  selectedVehiculo: Vehiculo = new Vehiculo();


  constructor(private firebase: AngularFireDatabase) { }
//-----------------------------------------------------------------
  //Get visitante
  getvisitante(){
    return  this.visitanteList = this.firebase.list('visitantes');
   }
  //Get vehiculo
  getvehiculo(){
    return  this.vehiculoList = this.firebase.list('vehiculos');
   }
//-----------------------------------------------------------------

 //Insertar visitante
   insertvisitante(visitante: Visitante){
     this.visitanteList.push({

       nombre: visitante.nombre,      
       apellido: visitante.apellido,
       documento: visitante.documento 
      
     });
   }

   //Insertar vehiculo
   insertvehiculo(vehiculo: Vehiculo){
    this.vehiculoList.push({

      placa: vehiculo.placa,      
      nombre_propietario: vehiculo.nombre_propietario,
      apellido_propietario: vehiculo.apellido_propietario 
     
    });
  }
 //-----------------------------------------------------------------
 //Actualizar visitante
   updatevisitante(visitante: Visitante){
       this.visitanteList.update(visitante.$key,{
         nombre: visitante.nombre,      
         apellido: visitante.apellido,
         documento: visitante.documento,
         });
   }

   //Actualizar Vehiculo
   updatevehiculo(vehiculo: Vehiculo){
    this.vehiculoList.update(vehiculo.$key,{
      placa: vehiculo.placa,      
      nombre_propietario: vehiculo.nombre_propietario,
      apellido_propietario: vehiculo.apellido_propietario 
      });
}
//-----------------------------------------------------------------
//Eliminar visitante
   deleteVisitante($key:string){
     this.visitanteList.remove($key);
   }

//Eliminar vehiculo
  deletevehiculo($key:string){
    this.vehiculoList.remove($key);
  }  
//-----------------------------------------------------------------

}
