import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

//class
import { Pollo } from 'src/app/models/pollo';
import { Gallina } from './../../../models/gallina';


import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { GalponService } from 'src/app/services/galpones/galpon.service';

//service
import { VisitanteService } from 'src/app/services/visitantes/visitante.service';
import { group } from 'console';
import { Codorniz } from 'src/app/models/codorniz';



@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  providers: [DatePipe] 
})
export class AdministracionComponent implements OnInit {
  closeResult: string = '';
   date=new Date();
   
   formPollo: FormGroup;
   formGallina: FormGroup;
   formCodorniz :FormGroup;
   loading = false;
   boton_enviar = false;
   
  constructor(public galponService:GalponService,
              private modalService: NgbModal, 
              private toastr: ToastrService,    
              public datepipe: DatePipe,
              private fb: FormBuilder,
              public visitanteService:VisitanteService) {
                
                this.formPollo = this.fb.group({
                  numero_galpon: ['', Validators.required],
                  numero_pollos: ['', Validators.required],
                  peso_sacrificio: ['', ],
                  muerte_pre_sacrificio: ['', ],
                  medicamentos: ['', ],
                  fecha_ingreso: ['', Validators.required],
                  fecha_egreso: ['', ],
                  observaciones: ['', ],                  
                })
                this.formGallina = this.fb.group({
                  fecha: ['', Validators.required],
                  cantidad_ponedoras: ['', Validators.required],
                  alimento: ['', ],
                  vermifumigaciones: ['', ],
                  observaciones: ['', ],
                  lunes: ['', ],
                  martes: ['', ],
                  miercoles: ['', ],   
                  jueves: ['', ],   
                  viernes: ['', ],                  
                  sabado: ['', ],                  
                  domingo: ['', ], 
                })
                this.formCodorniz = this.fb.group({
                  fecha: ['', Validators.required],
                  cantidad_codornices: ['', Validators.required],
                  alimento: ['', ],
                  vermifumigaciones: ['', ],
                  observaciones: ['', ],
                  lunes: ['', ],
                  martes: ['', ],
                  miercoles: ['', ],   
                  jueves: ['', ],   
                  viernes: ['', ],                  
                  sabado: ['', ],                  
                  domingo: ['', ], 
                })
              }

  ngOnInit(): void {
    this.datepipe.transform(this.date,"dd-MM-yyyy");
    //  this.galponService.getpollo();
  }



//llamado al servicio e insercion de datos
  onSubmitPollo(){
    const pollo: Pollo ={
      numero_galpon: this.formPollo.value.numero_galpon,
      numero_pollos: this.formPollo.value.numero_pollos,
      peso_sacrificio: this.formPollo.value.peso_sacrificio,
      muerte_pre_sacrificio: this.formPollo.value.muerte_pre_sacrificio,
      medicamentos: this.formPollo.value.medicamentos,
      fecha_ingreso: this.formPollo.value.fecha_ingreso,
      fecha_egreso: this.formPollo.value.fecha_egreso,
      observaciones: this.formPollo.value.observaciones
    }
    this.loading =true;
    this.galponService.guardarPollo(pollo).then(()=> {
       this.loading=false; 
       this.toastr.success('Galpón creado satisfatoriamente', 'Operación completada'); 
       this.formPollo.reset();
    }, error => {
       this.loading=false; 
       this.toastr.error(error, 'algo pasó');
    })
  }
  
  onSubmitGallina(){
    const gallina: Gallina ={
      fecha: this.formGallina.value.fecha,
      cantidad_ponedoras: this.formGallina.value.cantidad_ponedoras,
      alimento: this.formGallina.value.alimento,
      vermifumigaciones: this.formGallina.value.vermifumigaciones,
      observaciones: this.formGallina.value.observaciones,
      lunes: this.formGallina.value.lunes,
      martes: this.formGallina.value.martes,
      miercoles: this.formGallina.value.miercoles,
      jueves: this.formGallina.value.jueves,
      viernes: this.formGallina.value.viernes,
      sabado: this.formGallina.value.sabado,
      domingo: this.formGallina.value.domingo
    }
    this.loading =true;
    this.galponService.insertarGallina(gallina).then(()=> {
       this.loading=false; 
       this.toastr.success('Registro guardado satisfatoriamente', 'Operación completada'); 
       this.formGallina.reset();
    }, error => {
       this.loading=false; 
       this.toastr.error(error, 'algo pasó');
    })
  }
  onSubmitCodorniz(){
    const codorniz: Codorniz ={
      fecha: this.formCodorniz.value.fecha,
      cantidad_codornices: this.formCodorniz.value.cantidad_codornices,
      alimento: this.formCodorniz.value.alimento,
      vermifumigaciones: this.formCodorniz.value.vermifumigaciones,
      observaciones: this.formCodorniz.value.observaciones,
      lunes: this.formCodorniz.value.lunes,
      martes: this.formCodorniz.value.martes,
      miercoles: this.formCodorniz.value.miercoles,
      jueves: this.formCodorniz.value.jueves,
      viernes: this.formCodorniz.value.viernes,
      sabado: this.formCodorniz.value.sabado,
      domingo: this.formCodorniz.value.domingo
    }
    this.loading =true;
    this.galponService.insertarCodorniz(codorniz).then(()=> {
       this.loading=false; 
       this.toastr.success('Registro guardado satisfatoriamente', 'Operación completada'); 
       this.formCodorniz.reset();
    }, error => {
       this.loading=false; 
       this.toastr.error(error, 'algo pasó');
    })
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
