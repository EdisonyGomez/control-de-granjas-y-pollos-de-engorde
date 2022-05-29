import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

//clase
import { Visitante } from 'src/app/models/visitante';

//service
import { VisitanteService } from 'src/app/services/visitantes/visitante.service';

import { DatePipe, DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({ 
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.css'],
  providers: [DatePipe]
})
export class VisitantesComponent implements OnInit {
   
  form: FormGroup;
  date = new Date();
  loading = false;
  constructor(public visitanteService:VisitanteService,
              public datepipe: DatePipe,
              private toastr: ToastrService, 
              private fb: FormBuilder) { 
                this.form = this.fb.group({
                  nombre: ['', Validators.required],
                  apellido: ['', Validators.required],
                  documento: ['',],
                  fecha_ingreso: ['',],
                  hora_ingreso:  ['',],
                  rol:  ['',]
                })
              }
 
   
  ngOnInit(): void {
 
    this.datepipe.transform(this.date,"dd-MM-yyyy");
  }

 
  // onSubmit(visitanteForm: NgForm): void {
  //   if(visitanteForm.value.$key == ""){
  //     this.visitanteService.insertvisitante(visitanteForm.value)
  //   }else{
  //    this.visitanteService.updatevisitante(visitanteForm.value) ;
  //    this.resetForm(visitanteForm) ;
  //   }
  // }

  onSubmitVisitante(){
    const visitante: Visitante ={
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      documento: this.form.value.documento,
      fecha_ingreso: this.form.value.fecha_ingreso,
      hora_ingreso: this.form.value.hora_ingreso,
      rol: this.form.value.rol
    }
    this.loading =true;
    this.visitanteService.insertvisitante(visitante).then(()=> {
       this.loading=false; 
       this.toastr.success('Registro guardado satisfatoriamente', 'Operación completada'); 
       this.form.reset();
    }, error => {
       this.loading=false; 
       this.toastr.error(error, 'algo pasó');
    })
  }


  

}
