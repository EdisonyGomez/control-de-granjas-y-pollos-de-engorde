import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

//firebase
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';

//clases
import { Pollo } from '../../models/pollo';
import { Gallina } from './../../models/gallina';
import { Codorniz } from 'src/app/models/codorniz';


@Injectable({
  providedIn: 'root'
})
export class GalponService {

 //POLLO
private pollo$ = new Subject<any>();

//GALLINA
private gallina$ = new Subject<any>();

//CODORNIZ
private codorniz$ = new Subject<any>();

 constructor(private fir: AngularFirestore ) { }


  //Get pollo con firestore database
    getPollo2(): Observable<any>{
      return this.fir.collection('pollos', ref => ref.orderBy('fecha_ingreso','desc')).snapshotChanges();
    }
      

  //Get gallina
    getGallina(): Observable<any>{
      return this.fir.collection('gallinas', ref => ref.orderBy('fecha','desc')).snapshotChanges();
    }

     //Get codorniz
    getCodorniz(): Observable<any>{
      return this.fir.collection('codornices', ref => ref.orderBy('fecha','desc')).snapshotChanges();
    }
//-----------------------------------------------------------------

 //Insertar pollo con firestore database
   guardarPollo(pollo:Pollo): Promise<any>{
    return this.fir.collection('pollos').add(pollo);
    }
      
 //Insertar gallina con firestore database
   insertarGallina(gallina:Gallina): Promise<any>{
    return this.fir.collection('gallinas').add(gallina);
    }

 //Insertar codorniz con firestore database
   insertarCodorniz(codorniz:Codorniz): Promise<any>{
    return this.fir.collection('codornices').add(codorniz);
    }
 //-----------------------------------------------------------------

   //actualizar pollo con firestore
   addPolloEdit(pollo: Pollo){
     this.pollo$.next(pollo);
   }

   getPolloEdit(): Observable<Pollo>{
     return this.pollo$.asObservable();
   }

   updatepollo2(id: string ,pollo: any): Promise<any>{
    return  this.fir.collection('pollos').doc(id).update(pollo);
  }

   //actualizar gallina con firestore
   addGallinaEdit(gallina: Gallina){
    this.gallina$.next(gallina);
  }

  getGallinaEdit(): Observable<Gallina>{
    return this.gallina$.asObservable();
  }

  updateGallina(id: string ,gallina: any): Promise<any>{
   return  this.fir.collection('gallinas').doc(id).update(gallina);
 }


  //actualizar codorniz con firestore
  addCodornizEdit(codorniz: Codorniz){
    this.codorniz$.next(codorniz);
  }

  getCodornizEdit(): Observable<Codorniz>{
    return this.codorniz$.asObservable();
  }

  updateCodorniz(id: string ,codorniz: any): Promise<any>{
   return  this.fir.collection('codornices').doc(id).update(codorniz);
 }
//-----------------------------------------------------------------

   
 //TODO: Eliminar pollo con firestore database
  eliminiarPollo(id: string): Promise<any>{
    return this.fir.collection('pollos').doc(id).delete();
  }

//Eliminar gallina con firestore database
  eliminiarGallina(id:string){
    return this.fir.collection('gallinas').doc(id).delete();
  }  

  //Eliminar codorniz con firestore database
  eliminiarCodorniz(id:string){
    return this.fir.collection('codornices').doc(id).delete();
  } 
//-----------------------------------------------------------------



}
