import { Injectable } from '@angular/core';

//firebase
import { AngularFireDatabase,  AngularFireList } from '@angular/fire/compat/database';

//clases
import { Pollo } from '../../models/pollo';

import { Vehiculo } from './../../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class GalponService {

 //VISITANTE
 polloList!: AngularFireList<any>;
 selectedPollo: Pollo = new Pollo();
 
 //VEHICULO
 vehiculoList!: AngularFireList<any>;
 selectedVehiculo: Vehiculo = new Vehiculo();

 constructor(private firebase: AngularFireDatabase) { }
  
//-----------------------------------------------------------------
  //Get pollo
  getpollo(){
    return  this.polloList = this.firebase.list('pollos');
   }
  //Get vehiculo
  getvehiculo(){
    return  this.vehiculoList = this.firebase.list('vehiculos');
   }
//-----------------------------------------------------------------

 //Insertar pollo
   insertpollo(pollo: Pollo){
    this.polloList.push({      
      numero_galpon: pollo.numero_galpon,
      numero_pollos: pollo.numero_pollos,
      peso_sacrificio: pollo.peso_sacrificio,
      muerte_pre_sacrificio: pollo.muerte_pre_sacrificio,
      medicamentos: pollo.medicamentos,
      fecha_ingreso: pollo.fecha_ingreso,
      fecha_egreso: pollo.fecha_egreso,
      observaciones: pollo.observaciones      
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
 //Actualizar pollo
   updatepollo(pollo: Pollo){
       this.polloList.update(pollo.$key,{
        numero_galpon: pollo.numero_galpon,
        numero_pollos: pollo.numero_pollos,
        peso_sacrificio: pollo.peso_sacrificio,
        muerte_pre_sacrificio: pollo.muerte_pre_sacrificio,
        medicamentos: pollo.medicamentos,
        fecha_ingreso: pollo.fecha_ingreso,
        fecha_egreso: pollo.fecha_egreso,
        observaciones: pollo.observaciones
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
//Eliminar pollo
   deletepollo($key:string){
     this.polloList.remove($key);
   }

//Eliminar vehiculo
  deletevehiculo($key:string){
    this.vehiculoList.remove($key);
  }  
//-----------------------------------------------------------------



}
