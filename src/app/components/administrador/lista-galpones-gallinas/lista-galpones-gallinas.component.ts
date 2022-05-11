import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


//service
import { GalponService } from './../../../services/galpones/galpon.service';

//clase
import { Gallina } from './../../../models/gallina';
@Component({
  selector: 'app-lista-galpones-gallinas',
  templateUrl: './lista-galpones-gallinas.component.html',
  styleUrls: ['./lista-galpones-gallinas.component.css'],
  providers: [DatePipe]

})
export class ListaGalponesGallinasComponent implements OnInit {

  gallinaList: Gallina[] = [];
  form: FormGroup;
  public page: number = 0;
  closeResult: string = '';
  date = new Date();
  loading = false;
  id: string;
  boton_enviar = false;

  constructor(public galponService: GalponService,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      cantidad_ponedoras: ['', Validators.required],
      alimento: ['',],
      vermifumigaciones: ['',],
      lunes:  ['',],
      martes:  ['',],
      miercoles:   ['',],
      jueves:  ['',],
      viernes:  ['',],
      sabado:  ['',],
      domingo:  ['',],
      observaciones:  ['',],
    })
  }

  ngOnInit(): void {
    this.showGalponesGallinas();

    this.galponService.getGallinaEdit().subscribe(data => {
      this.id = data.id;
      this.boton_enviar=false;
      console.log(data);
      this.form.patchValue({
        fecha: data.fecha,
        cantidad_ponedoras: data.cantidad_ponedoras,
        alimento: data.alimento,
        vermifumigaciones: data.vermifumigaciones,
        lunes: data.lunes,
        martes: data.martes,
        miercoles: data.miercoles,
        jueves:data.jueves,
        viernes:data.viernes,
        sabado:data.sabado,
        domingo:data.domingo,
        observaciones: data.observaciones
      })
    })
  }



   //Metodo para listar los gapones con firestore database
   showGalponesGallinas() {
    this.galponService.getGallina().subscribe(doc => {
      this.gallinaList = [];
      doc.forEach((element: any) => {
        this.gallinaList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      })
    })

  }
}
