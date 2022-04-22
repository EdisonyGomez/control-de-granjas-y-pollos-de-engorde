import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


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
  form: FormGroup;
  public page: number = 0;
  closeResult: string = '';
  date = new Date();
  loading = false;
  id: string;
  boton_enviar = false;
  constructor(public polloService: GalponService,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      numero_galpon: ['', Validators.required],
      numero_pollos: ['', Validators.required],
      peso_sacrificio: ['',],
      muerte_pre_sacrificio: ['',],
      medicamentos: ['',],
      fecha_ingreso: ['', Validators.required],
      fecha_egreso: ['',],
      observaciones: ['',],
    })
  }

  ngOnInit(): void {
    // this.datepipe.transform(this.date,"dd-MM-yyyy");
    this.showGalponesPollos();

    this.polloService.getPolloEdit().subscribe(data => {
      this.id = data.id;
      this.boton_enviar=false;
      console.log(data);
      this.form.patchValue({
        numero_galpon: data.numero_galpon,
        numero_pollos: data.numero_pollos,
        peso_sacrificio: data.peso_sacrificio,
        muerte_pre_sacrificio: data.muerte_pre_sacrificio,
        medicamentos: data.medicamentos,
        fecha_ingreso: data.fecha_ingreso,
        fecha_egreso: data.fecha_egreso,
        observaciones: data.observaciones
      })
    })
    //   this.resetForm() ;
    //   this.polloService.getpollo()
    //   .snapshotChanges()
    //   .subscribe(item => {
    //   this.polloList= [];
    //   item.forEach(element => {
    //   let x:any = element.payload.toJSON(); 
    //   x["$key"] = element.key;
    //   this.polloList.push(x as Pollo) ;
    //   });
    // });
  }
  //Metodo para listar los gapones con direstore database
  showGalponesPollos() {
    this.polloService.getPollo2().subscribe(doc => {
      this.polloList = [];
      doc.forEach((element: any) => {
        this.polloList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      })
    })

  }


  onEdit(pollo: Pollo) {
    this.polloService.selectedPollo = Object.assign({}, pollo);
  }

  //Metodo para editar un galpon de pollos usando firestore database
  onEdit2(pollo: Pollo) {
    this.polloService.addPolloEdit(pollo);
  }
  editarPollo() {
    const pollo: Pollo = {
      numero_galpon: this.form.value.numero_galpon,
      numero_pollos: this.form.value.numero_pollos,
      peso_sacrificio: this.form.value.peso_sacrificio,
      muerte_pre_sacrificio: this.form.value.muerte_pre_sacrificio,
      medicamentos: this.form.value.medicamentos,
      fecha_ingreso: this.form.value.fecha_ingreso,
      fecha_egreso: this.form.value.fecha_egreso,
      observaciones: this.form.value.observaciones
    }
    this.loading = true;
    this.polloService.updatepollo2(this.id, pollo).then(() => {
      this.loading = false;
      this.toastr.info('Datos actualizados satisfatoriamente', 'Operación completada');
      this.form.reset();
      this.boton_enviar = true;
    }, error => {
      this.loading = false;
      this.toastr.error('algo pasó',error);
    })
  }


  //Metodo para eliminar un galpon de pollos usando realtime database
  onDelete(id: string) {
    this.polloService.deletepollo(id);
    this.toastr.success('Galpón eliminado satisfatoriamente', 'Operación completada');
  }

  //Metodo para eliminar un galpon de pollos usando firestore database
  onDelete2(id: string) {
    this.polloService.eliminiarPollo(id).then(() => {
      this.toastr.error('Galpón eliminado satisfatoriamente', 'Operación completada');
    }, error => {
      this.toastr.error('ocurrio un error', error);
    });
  }

  // onSubmit(polloForm: NgForm): void {
  //   if(polloForm.value.id == ""){
  //     this.polloService.insertpollo(polloForm.value)
  //   }else{
  //    this.polloService.updatepollo(polloForm.value) ;
  //    this.resetForm(polloForm) ;
  //   }
  // }

  resetForm(polloForm?: NgForm) {
    if (polloForm != null)
      polloForm.reset();
    // this.polloService.selectedPollo = new Pollo();
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

}
