
import { Injectable } from '@angular/core';

//firebase
import { AngularFireDatabase,  AngularFireList } from '@angular/fire/compat/database';


//models
import { Granjero } from './../models/granjero';

@Injectable({
  providedIn: 'root'
})
export class GranjeroService {


  ganjeroList!: AngularFireList<any>;
  selectedGranjero: Granjero = new Granjero();
  constructor(private firebase: AngularFireDatabase) { }


  getGranjero(){
   return  this.ganjeroList = this.firebase.list('granjeros');
  }

  insetGranjero(granjero: Granjero){
    this.ganjeroList.push({
      nombre: granjero.nombre,      
      apellido: granjero.apellido,
      direccion: granjero.direccion,
      cedula: granjero.cedula,
      telefono: granjero.telefono,
      tipo: granjero.tipo,
      id_lote: granjero.id_lote
    });
  }

  updateGranjero(granjero: Granjero){
      this.ganjeroList.update(granjero.id_granjero,{
        nombre: granjero.nombre,      
        apellido: granjero.apellido,
        direccion: granjero.direccion,
        cedula: granjero.cedula,
        telefono: granjero.telefono,
        tipo: granjero.tipo,
        id_lote: granjero.id_lote });
  }

  deleteGranjero(id_granjero:string){
    this.ganjeroList.remove(id_granjero);
  }

}
