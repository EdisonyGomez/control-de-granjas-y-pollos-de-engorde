import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


//service
import { GalponService } from './../../../services/galpones/galpon.service';

//clase
import { Gallina } from './../../../models/gallina';

// Import pdfmake-wrapper and the fonts to use
import { IImg, Img, PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';

@Component({
  selector: 'app-lista-galpones-gallinas',
  templateUrl: './lista-galpones-gallinas.component.html',
  styleUrls: ['./lista-galpones-gallinas.component.css'],
  providers: [DatePipe]

})
export class ListaGalponesGallinasComponent implements OnInit {

  gallinaList: Gallina[] = [];
  form: FormGroup;
  observacionesForm: FormGroup;
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
    }),
    this.observacionesForm = this.fb.group({
      fecha1: ['',],
      fecha2: ['',],
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

   //Funcion para listar los gapones con firestore database
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

  
  //Funcion para editar un galpon de gallinas usando firestore database
  onEdit(gallina: Gallina) {
    this.galponService.addGallinaEdit(gallina);
  }
  editarGallina() {
    const gallina: Gallina = {
      fecha: this.form.value.fecha,
      cantidad_ponedoras: this.form.value.cantidad_ponedoras,
      alimento: this.form.value.alimento,
      vermifumigaciones: this.form.value.vermifumigaciones,
      lunes: this.form.value.lunes,
      martes: this.form.value.martes,
      miercoles: this.form.value.miercoles,
      jueves:this.form.value.jueves,
      viernes:this.form.value.viernes,
      sabado:this.form.value.sabado,
      domingo:this.form.value.domingo,
      observaciones: this.form.value.observaciones
    }
    this.loading = true;
    this.galponService.updateGallina(this.id, gallina).then(() => {
      this.loading = false;
      this.toastr.info('Datos actualizados satisfatoriamente', 'Operación completada');
      this.form.reset();
      this.boton_enviar = true;
    }, error => {
      this.loading = false;
      this.toastr.error('algo pasó',error);
    })
  }


  //Funcion para eliminar un galpon de gallinas usando firestore database
  onDelete(id: string) {
    this.loading = true;
    this.galponService.eliminiarGallina(id).then(() => {
      this.loading = false;
      this.toastr.error('Galpón eliminado satisfatoriamente', 'Operación completada');
    }, error => {
      this.toastr.error('ocurrio un error', error);
    });
  }



  //crear PDF Con PdfMakeWrapper
  async createPdf_observaciones(){
    const pdf = new PdfMakeWrapper();

      pdf.add(
        new Txt('Finca San Pablo').alignment('center').bold().color('tomato')
        .fontSize(30).decoration('underline').end
      );

      pdf.add(
      new Txt(new Date().toLocaleString()).alignment('right').end
      );
    
      pdf.add(await new Img('../../../../assets/img/icons/ufps.png').width(300).
          opacity(0.1).absolutePosition(150, 150).build().then(async img => {
        pdf.background(img);
      }));

      pdf.add(
        new Txt('Reporte de Observaciones:').bold().fontSize(14).margin([0, 30,0, 0]).end
      );

      pdf.add(
        new Table([
          [ new Txt('Fecha').bold().end,
            new Txt('Observaciones').bold().end,],
          // ...this.codornizList.map(p => ([p.observaciones, p.alimento, p.vermifumigaciones]))
          ...this.extraerFechas(this.observacionesForm.value.fecha1, this.observacionesForm.value.fecha2).
                    map(p => ([p.fecha, p.observaciones]))

        ]).layout({
          hLineWidth: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 2 : 1;
          },
          vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
          },
          hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
          },
          vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
          }       
        }).widths("*").alignment('center').headerRows(1).end
      );
      
      pdf.create().open();
  }
// ---------------------REPORTE DE OBSERVACIONES-----------------------------------

// ---------------------REPORTE DE HUEVOS INICIO-----------------------------------
   //funcion para crear el pdf
   async createPdf_huevos() {
    const pdf = new PdfMakeWrapper();

    pdf.add(
      new Txt('Finca San Pablo').alignment('center').bold().color('tomato')
      .fontSize(30).decoration('underline').end
    );

    pdf.add(
    new Txt(new Date().toLocaleString()).alignment('right').end
    );
  
    pdf.add(await new Img('../../../../assets/img/icons/ufps.png').width(300).
        opacity(0.1).absolutePosition(150, 150).build().then(async img => {
      pdf.background(img);
    }));

    pdf.add(
      new Txt('Reporte de cantidad de huevos:').bold().fontSize(14).margin([0, 30,0, 0]).end
    );

    pdf.add(
      new Table([
        [ 
          new Txt('Fecha').bold().end,
          new Txt('Lunes').bold().end,
          new Txt('Martes').bold().end,
          new Txt('Miercoles').bold().end,
          new Txt('Jueves').bold().end,
          new Txt('Viernes').bold().end,
          new Txt('Sabado').bold().end,
          new Txt('Domingo').bold().end,
          new Txt('Producción semana').bold().end,
      ]
          ,
        ...this.extraerFechas(this.observacionesForm.value.fecha1,
           this.observacionesForm.value.fecha2).map(p => 
            ([p.fecha, p.lunes, p.martes, p.miercoles,
              p.jueves, p.viernes, p.sabado, p.domingo,
             p.lunes + p.martes + p.miercoles +
             p.jueves + p.viernes + p.sabado + p.domingo])),
             [{text:'Total de producción',bold: true, colSpan: 3 }, {text:'-'}, {text:'-'},{text:'-'},{text:'-'},{text:'-'},{text:'-'},{text:'-'}, this.extraerFechas(this.observacionesForm.value.fecha1,
              this.observacionesForm.value.fecha2).reduce((sum, p)=> sum + (p.lunes + p.martes + p.miercoles +
                p.jueves + p.viernes + p.sabado + p.domingo), 0)]

      ]).layout({
        hLineWidth: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 2 : 1;
        },
        vLineWidth: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 2 : 1;
        },
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
        },
        vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
        }       
      }).alignment('center').headerRows(1).margin([-10, 15,0, 0]).end
    );    
    pdf.create().open();
  }
// --------------------------------------------------------------------------------


// -----------------Función para filtar fechas---------------------------------
extraerFechas(fecha1: Date, fecha2:Date): Gallina[]{
  let gallinaList2: Gallina[] = [];
  gallinaList2 = this.gallinaList.filter(gallina => gallina.fecha > fecha1 && gallina.fecha < fecha2);
  return gallinaList2
}
// --------------------------------------------------------------------------------


  //---- Abrir el modal----
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',
                                       "size": "lg",
                                      centered: true,
                                      backdrop: true,
                                      animation: true,
                                      keyboard: true,
                                      backdropClass: "modal-backdrop"  }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
// ---------------------------------
  
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
