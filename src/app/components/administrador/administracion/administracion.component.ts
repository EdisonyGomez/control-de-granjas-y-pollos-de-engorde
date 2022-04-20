import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

//class
import { Pollo } from 'src/app/models/pollo';

import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { GalponService } from 'src/app/services/galpones/galpon.service';

//service
import { VisitanteService } from 'src/app/services/visitantes/visitante.service';



@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  providers: [DatePipe] 
})
export class AdministracionComponent implements OnInit {
  closeResult: string = '';
   date=new Date();
  constructor(public polloService:GalponService,
              private modalService: NgbModal,     
              public datepipe: DatePipe,
              public visitanteService:VisitanteService) {
              
              }

  ngOnInit(): void {
    this.datepipe.transform(this.date,"dd-MM-yyyy");
     this.polloService.getpollo();
    this.resetForm() ;
  }


  resetForm(polloForm?: NgForm){
    if (polloForm != null)
    polloForm.reset ();
    this.polloService.selectedPollo = new Pollo();
}

onSubmit(polloForm: NgForm): void {
  if(polloForm.value.$key == ""){
    this.polloService.insertpollo(polloForm.value)
  }else{
   this.polloService.updatepollo(polloForm.value) ;
   this.resetForm(polloForm) ;
  }
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
