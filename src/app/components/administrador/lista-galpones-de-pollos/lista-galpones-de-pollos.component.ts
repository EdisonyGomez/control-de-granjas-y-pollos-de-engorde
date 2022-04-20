import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


//service
import { GalponService } from './../../../services/galpones/galpon.service';

//clase
import { Pollo } from './../../../models/pollo';

@Component({
  selector: 'app-lista-galpones-de-pollos',
  templateUrl: './lista-galpones-de-pollos.component.html',
  styleUrls: ['./lista-galpones-de-pollos.component.css'],
  providers: [DatePipe] 
})
export class ListaGalponesDePollosComponent implements OnInit {
  polloList: Pollo[] = [];
  public page:number=0;
  closeResult: string = '';
   date=new Date();
  constructor(public polloService: GalponService, 
              private toastr: ToastrService,     
              public datepipe: DatePipe,
              private modalService: NgbModal) { }
          
  ngOnInit(): void {  
    // this.datepipe.transform(this.date,"dd-MM-yyyy");
    this.resetForm() ;
    this.polloService.getpollo()
    .snapshotChanges()
    .subscribe(item => {
    this.polloList= [];
    item.forEach(element => {
    let x:any = element.payload.toJSON(); 
    x["$key"] = element.key;
    this.polloList.push(x as Pollo) ;
    });
  });
}
 

onEdit(pollo: Pollo){
  this.polloService.selectedPollo = Object.assign({},pollo);
}

onDelete($key: string){
  this.polloService.deletepollo($key);
  this.toastr.success('Galpón eliminado satisfatoriamente', 'Operación completada');
}

onSubmit(polloForm: NgForm): void {
  if(polloForm.value.$key == ""){
    this.polloService.insertpollo(polloForm.value)
  }else{
   this.polloService.updatepollo(polloForm.value) ;
   this.resetForm(polloForm) ;
  }
}

resetForm(polloForm?: NgForm){
  if (polloForm != null)
  polloForm.reset ();
  this.polloService.selectedPollo = new Pollo();
}

open(content:any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
} 
  
/**
 * Write code on Method
 *
 * @return response()
 */
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

}
 