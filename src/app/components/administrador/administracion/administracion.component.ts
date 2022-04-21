import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

//class
import { Pollo } from 'src/app/models/pollo';

import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { GalponService } from 'src/app/services/galpones/galpon.service';

//service
import { VisitanteService } from 'src/app/services/visitantes/visitante.service';
import { group } from 'console';



@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  providers: [DatePipe] 
})
export class AdministracionComponent implements OnInit {
  closeResult: string = '';
   date=new Date();

   form: FormGroup;
   loading = false;

  constructor(public polloService:GalponService,
              private modalService: NgbModal, 
              private toastr: ToastrService,    
              public datepipe: DatePipe,
              private fb: FormBuilder,
              public visitanteService:VisitanteService) {
                
                this.form = this.fb.group({
                  numero_galpon: ['', Validators.required],
                  numero_pollos: ['', Validators.required],
                  peso_sacrificio: ['', ],
                  muerte_pre_sacrificio: ['', ],
                  medicamentos: ['', ],
                  fecha_ingreso: ['', Validators.required],
                  fecha_egreso: ['', ],
                  observaciones: ['', ],                  
                })
              }

  ngOnInit(): void {
    this.datepipe.transform(this.date,"dd-MM-yyyy");
     this.polloService.getpollo();
    this.resetForm() ;
  }


  resetForm(polloForm?: NgForm){
    if (polloForm != null)
    polloForm.reset ();
    // this.polloService.selectedPollo = new Pollo();
}
resetForm2(form?: FormGroup){
  if (form != null)
  form.reset ();
}
  onSubmit2(){
    const pollo: Pollo ={
      numero_galpon: this.form.value.numero_galpon,
      numero_pollos: this.form.value.numero_pollos,
      peso_sacrificio: this.form.value.peso_sacrificio,
      muerte_pre_sacrificio: this.form.value.muerte_pre_sacrificio,
      medicamentos: this.form.value.medicamentos,
      fecha_ingreso: this.form.value.fecha_ingreso,
      fecha_egreso: this.form.value.fecha_egreso,
      observaciones: this.form.value.observaciones
    }
    this.loading =true;
    this.polloService.guardarPollo(pollo).then(()=> {
       this.loading=false; 
      this.toastr.success('Galpón creado satisfatoriamente', 'Operación completada'); 
      this.resetForm2(this.form);
    }, error => {
       this.loading=false; 

    this.toastr.error(error, 'algo pasó');
    })
  }

onSubmit(polloForm: NgForm): void {
  if(polloForm.value.$key == ""){
    this.polloService.insertpollo(polloForm.value);
    this.toastr.success('Galpón creado satisfatoriamente', 'Operación completada');
    this.resetForm(polloForm) ;
  }else{
   this.polloService.updatepollo(polloForm.value) ;
   this.toastr.success('Datos actualizados', 'Operación completada');
   this.resetForm(polloForm) ;
  }
}


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.resetForm() ;

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
