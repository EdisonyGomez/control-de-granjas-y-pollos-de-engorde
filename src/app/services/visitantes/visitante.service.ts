import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

//firebase
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabase,  AngularFireList } from '@angular/fire/compat/database';

//clases
import { Visitante } from 'src/app/models/visitante';
import { Vehiculo } from './../../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {

  //VISITANTE
  // visitanteList!: AngularFireList<any>; 
  // selectedVisitante: Visitante = new Visitante();
  private visitante$ = new Subject<any>();
  
  //VEHICULO
  vehiculoList!: AngularFireList<any>;
  selectedVehiculo: Vehiculo = new Vehiculo();
  private vehiculo$ = new Subject<any>();

  constructor(private fir: AngularFirestore,
            private  firebase:AngularFireDatabase ) { }
//-----------------------------------------------------------------
  //Get visitante
  // getvisitante(){
  //   return  this.visitanteList = this.firebase.list('visitantes');
  //  }
   getvisitante(): Observable<any>{
    return this.fir.collection('visitantes', ref => ref.orderBy('fecha_ingreso','desc')).snapshotChanges();
  }
  //Get vehiculo
  getvehiculo(){
    return  this.vehiculoList = this.firebase.list('vehiculos');
   }
  // getvehiculo(): Observable<any>{
  //   return this.fir.collection('vehiculos', ref => ref.orderBy('fecha_ingreso','desc')).snapshotChanges();
  // }
//-----------------------------------------------------------------

 //Insertar visitante
  //  insertvisitante(visitante: Visitante){
  //    this.visitanteList.push({

  //      nombre: visitante.nombre,      
  //      apellido: visitante.apellido,
  //      documento: visitante.documento ,
  //      fecha_ingreso: visitante.fecha_ingreso,
  //      hora_ingreso: visitante.hora_ingreso,
  //      rol: visitante.rol
      
  //    });
  //  }
  insertvisitante(visitante:Visitante): Promise<any>{
    return this.fir.collection('visitantes').add(visitante);
    }

  //  Insertar vehiculo
   insertvehiculo(vehiculo: Vehiculo){
    this.vehiculoList.push({

      placa: vehiculo.placa,      
      nombre_propietario: vehiculo.nombre_propietario,
      apellido_propietario: vehiculo.apellido_propietario 
     
    });
  }
  // insertvehiculo(vehiculo:Vehiculo): Promise<any>{
  //   return this.fir.collection('vehiculos').add(vehiculo);
  //   }
 //-----------------------------------------------------------------
 //Actualizar visitante
  //  updatevisitante(visitante: Visitante){
  //      this.visitanteList.update(visitante.$key,{
  //        nombre: visitante.nombre,      
  //        apellido: visitante.apellido,
  //        documento: visitante.documento,
  //        fecha_ingreso: visitante.fecha_ingreso,
  //          hora_ingreso: visitante.hora_ingreso,
  //          rol: visitante.rol
  //        });
  //  }
   addVisitanteEdit(visitante: Visitante){
    this.visitante$.next(visitante);
  }
  getVisitanteEdit(): Observable<Visitante>{
    return this.visitante$.asObservable();
  }

  updateVisitante(id: string ,visitante: any): Promise<any>{
   return  this.fir.collection('visitantes').doc(id).update(visitante);
 }

  //  Actualizar Vehiculo
   updatevehiculo(vehiculo: Vehiculo){
    this.vehiculoList.update(vehiculo.$key,{
      placa: vehiculo.placa,      
      nombre_propietario: vehiculo.nombre_propietario,
      apellido_propietario: vehiculo.apellido_propietario 
      });
}
//  addVehiculoEdit(vehiculo: Vehiculo){
//     this.vehiculo$.next(vehiculo);
//   }
//-----------------------------------------------------------------
//Eliminar visitante
  //  deleteVisitante($key:string){
  //    this.visitanteList.remove($key);
  //  }

//Eliminar vehiculo
  deletevehiculo($key:string){
    this.vehiculoList.remove($key);
  }  
  eliminiarVisitante($id: string): Promise<any>{
    return this.fir.collection('visitantes').doc($id).delete();
  }
//-----------------------------------------------------------------

}
