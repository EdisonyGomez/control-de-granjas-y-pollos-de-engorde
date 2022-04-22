import { Injectable } from '@angular/core';

//firebase
import { AngularFireDatabase,  AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

//clases
import { Pollo } from '../../models/pollo';

import { Vehiculo } from './../../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class GalponService {

 //POLLO
private pollo$ = new Subject<any>();

 polloList!: AngularFireList<any>;
 selectedPollo: Pollo ;
// selectedPollo: Pollo ;
 
 //VEHICULO
 vehiculoList!: AngularFireList<any>;
 selectedVehiculo: Vehiculo = new Vehiculo();

 constructor(private firebase: AngularFireDatabase,
             private fir: AngularFirestore ) { }



//-----------------------------------------------------------------
  //Get pollo con Realtime database
  getpollo(){
    return  this.polloList = this.firebase.list('pollos');
   }

  //Get pollo con firestore database
  getPollo2(): Observable<any>{
    return this.fir.collection('pollos', ref => ref.orderBy('fecha_ingreso','asc')).snapshotChanges();
    }
      


  //Get vehiculo
  getvehiculo(){
    return  this.vehiculoList = this.firebase.list('vehiculos');
   }
//-----------------------------------------------------------------

 //Insertar pollo con Realtime database
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

 //Insertar pollo con firestore database
   guardarPollo(pollo:Pollo): Promise<any>{
    return this.fir.collection('pollos').add(pollo);
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

       this.polloList.update(pollo.id,{
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

   //actualizar con firestore
   addPolloEdit(pollo: Pollo){
     this.pollo$.next(pollo);
   }

   getPolloEdit(): Observable<Pollo>{
     return this.pollo$.asObservable();
   }

   updatepollo2(id: string ,pollo: any): Promise<any>{
    return  this.fir.collection('pollos').doc(id).update(pollo);
  }

   //Actualizar Vehiculo
//    updatevehiculo(vehiculo: Vehiculo){
//     this.vehiculoList.update(vehiculo.id,{
//       placa: vehiculo.placa,      
//       nombre_propietario: vehiculo.nombre_propietario,
//       apellido_propietario: vehiculo.apellido_propietario 
//       });
// }
//-----------------------------------------------------------------
//Eliminar pollo con realtime database
   deletepollo(id:string){
     this.polloList.remove(id);
   }
   
 //Insertar pollo con firestore database
 eliminiarPollo(id: string): Promise<any>{
  return this.fir.collection('pollos').doc(id).delete();
  }

//Eliminar vehiculo
  deletevehiculo(id:string){
    this.vehiculoList.remove(id);
  }  
//-----------------------------------------------------------------



}
