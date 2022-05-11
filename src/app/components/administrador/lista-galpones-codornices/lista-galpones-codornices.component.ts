import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GalponService } from './../../../services/galpones/galpon.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Codorniz } from './../../../models/codorniz';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-galpones-codornices',
  templateUrl: './lista-galpones-codornices.component.html',
  styleUrls: ['./lista-galpones-codornices.component.css'],
  providers: [DatePipe]

})
export class ListaGalponesCodornicesComponent implements OnInit {

  codornizList: Codorniz[] = [];
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
      cantidad_codornices: ['', Validators.required],
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
    this.showGalponesCodornices();

    this.galponService.getCodornizEdit().subscribe(data => {
      this.id = data.id;
      this.boton_enviar=false;
      console.log(data);
      this.form.patchValue({
        fecha: data.fecha,
        cantidad_codornices: data.cantidad_codornices,
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
   showGalponesCodornices() {
    this.galponService.getCodorniz().subscribe(doc => {
      this.codornizList = [];
      doc.forEach((element: any) => {
        this.codornizList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      })
    })

  }

}
