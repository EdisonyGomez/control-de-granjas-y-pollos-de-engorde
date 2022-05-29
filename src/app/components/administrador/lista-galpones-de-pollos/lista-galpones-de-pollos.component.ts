import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr'; 
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


//service
import { GalponService } from './../../../services/galpones/galpon.service';

//clase
import { Pollo } from './../../../models/pollo';

//Libreria PDF
import { IImg, Img, PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';


@Component({
  selector: 'app-lista-galpones-de-pollos',
  templateUrl: './lista-galpones-de-pollos.component.html',
  styleUrls: ['./lista-galpones-de-pollos.component.css'],
  providers: [DatePipe]
})
export class ListaGalponesDePollosComponent implements OnInit {
  polloList: Pollo[] = [];
  form: FormGroup;
  observacionesForm: FormGroup;
  galponForm: FormGroup;
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
    }),
     this.observacionesForm = this.fb.group({
      fecha1: ['',],
      fecha2: ['',],
    }),
    this.galponForm = this.fb.group({
      numero_galpon: ['',]
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

  }
  //Metodo para listar los gapones con firestore database
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



  //Metodo para eliminar un galpon de pollos usando firestore database
  onDelete2(id: string) {
    this.loading = true;
    this.polloService.eliminiarPollo(id).then(() => {
      this.loading = false;
      this.toastr.error('Galpón eliminado satisfatoriamente', 'Operación completada');
    }, error => {
      this.toastr.error('ocurrio un error', error);
    });
  }



  resetForm(polloForm?: NgForm) {
    if (polloForm != null)
      polloForm.reset();
  }

  

//---------------------------REPORTE DE MORTALIDAD----------------------------------------------------------
  async createPdf_mortalidad(){
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
        new Txt('Reporte de mortalidad:').bold().fontSize(14).margin([0, 30,0, 0]).end
      );

      pdf.add(
        new Table([
          [ new Txt('Número de Galpon').bold().end,
            new Txt('Fecha de ingreso').bold().end,
            new Txt('Muertes pre Sacrificio').bold().end,],
          ...this.extraerFechas(this.observacionesForm.value.fecha1, this.observacionesForm.value.fecha2).
                  map(p => ([p.numero_galpon, p.fecha_ingreso , p.muerte_pre_sacrificio]))

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
// ------------------------------------------------------------------------------------------------------------

//---------------------------REPORTE DE OBSERVACIONES----------------------------------------------------------
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
      new Txt('Reporte de observaciones:').bold().fontSize(14).margin([0, 30,0, 0]).end
    );

    pdf.add(
      new Table([
        [ new Txt('Número de Galpon').bold().end,
          new Txt('Fecha de ingreso').bold().end,
          new Txt('Fecha de egreso').bold().end,
          new Txt('Observaciones').bold().end,],
        ...this.extraerFechas(this.observacionesForm.value.fecha1, this.observacionesForm.value.fecha2).
                map(p => ([p.numero_galpon, p.fecha_ingreso , p.fecha_egreso, p.observaciones]))

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
// -------------------------------------------------------------------------------------------------------------

//----------------------REPORTE DE GALPON----------------------------------------------------------------
async createPdf_galpon(){
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
      new Txt('Reporte de galpon:').bold().fontSize(14).margin([0, 30,0, 0]).end
    );

    pdf.add(
      new Table([
        [ new Txt('Número de Galpon').bold().end,
          new Txt('Cantidad de pollos').bold().end,
          new Txt('Fecha de ingreso').bold().end,
          new Txt('Fecha de egreso').bold().end,
          new Txt('Peso al sacrificio').bold().end,
          new Txt('Muertes pre sacrificio').bold().end,
          new Txt('Vacunas y medicamentos').bold().end,
          new Txt('Observaciones').bold().end,],
        ...this.extraerGalpon(this.galponForm.value.numero_galpon).
                map(p => ([p.numero_galpon, p.numero_pollos, p.fecha_ingreso , p.fecha_egreso,
                           p.peso_sacrificio, p.muerte_pre_sacrificio,p.medicamentos, p.observaciones]))

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
      }).alignment('center').headerRows(1).end
    );
    
    pdf.create().open();
}
//-------------------------------------------------------------------------------------


// ---------------------FUNCION PARA COMPARAR LAS FECHAS-----------------------------------------------------------------------------
  extraerFechas(fecha1: Date, fecha2:Date): Pollo[]{
    let polloList2: Pollo[] = [];
  
    polloList2 = this.polloList.filter(pollo => pollo.fecha_ingreso > fecha1 && pollo.fecha_ingreso < fecha2);
    return polloList2
  
  }
// ---------------------FUNCION PARA COMPARAR LAS FECHAS-----------------------------------------------------------------------------


// ---------------------FUNCION PARA COMPARAR EL NUMERO DE GALPON-----------------------------------------------------------------------------
extraerGalpon(numero_galpon:number): Pollo[]{
  let polloList2: Pollo[] = [];

  polloList2 = this.polloList.filter(pollo => pollo.numero_galpon == numero_galpon);
  return polloList2

}
// ---------------------FUNCION PARA COMPÄRAR EL NUMERO DE GALPON-----------------------------------------------------------------------------




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
  
    pdf.add(await new Img('../../../../assets/img/icons/ufps.png').width(300).opacity(0.1).absolutePosition(150, 150).build().then(async img => {
      pdf.background(img);
    }));

    pdf.add(
      new Txt('Reporte de cantidad de huevos:').bold().fontSize(14).margin([0, 30,0, 0]).end
    );

    pdf.add(
      new Table([
        [ new Txt('Fecha').bold().end,
          new Txt('Lunes').bold().end,
          new Txt('Martes').bold().end,
          new Txt('Miercoles').bold().end,
          new Txt('Jueves').bold().end,
          new Txt('Viernes').bold().end,
          new Txt('Sabado').bold().end,
          new Txt('Domingo').bold().end,]
          ,
        // ...this.codornizList.map(p => ([p.observaciones, p.alimento, p.vermifumigaciones]))
        // ...this.extraerFechas(this.observacionesForm.value.fecha1,
        //    this.observacionesForm.value.fecha2).map(p => 
        //     ([p.fecha, p.lunes, p.martes, p.miercoles,
        //       p.jueves, p.viernes, p.sabado, p.domingo]))

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
      }).widths("*").alignment('center').headerRows(1).margin([-10, 33,0, 0]).end
    );
    
    pdf.create().open();
  }

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
