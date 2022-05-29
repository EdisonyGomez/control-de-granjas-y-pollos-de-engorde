import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GalponService } from './../../../services/galpones/galpon.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Codorniz } from './../../../models/codorniz';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, DOCUMENT } from '@angular/common';

// Import pdfmake-wrapper and the fonts to use
import { IImg, Img, PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';


@Component({
  selector: 'app-lista-galpones-codornices',
  templateUrl: './lista-galpones-codornices.component.html',
  styleUrls: ['./lista-galpones-codornices.component.css'],
  providers: [DatePipe]

})
export class ListaGalponesCodornicesComponent implements OnInit {

 
  codornizList: Codorniz[] = [];
  form: FormGroup;
  observacionesForm: FormGroup;
  public page: number = 0;
  closeResult: string = '';
  date = new Date();
  loading = false; 
  id: string;
  observaciones: string;
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
    }),
    this.observacionesForm = this.fb.group({
      fecha1: ['',],
      fecha2: ['',],
    })
  }
  
  
  ngOnInit(): void {
    this.showGalponesCodornices();

    this.galponService.getCodornizEdit().subscribe(data => {
      this.id = data.id;
      this.observaciones = data.observaciones;
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

  extraerFechas(fecha1: Date, fecha2:Date): Codorniz[]{
    let codornizList2: Codorniz[] = [];
  
    codornizList2 = this.codornizList.filter(codorniz => codorniz.fecha > fecha1 && codorniz.fecha < fecha2);
    return codornizList2
  
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
        // ...this.codornizList.map(p => ([p.observaciones, p.alimento, p.vermifumigaciones]))
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
  
  //Función para editar un galpon de codornices usando firestore database
  onEdit(codorniz: Codorniz) {
    this.galponService.addCodornizEdit(codorniz);
  }
  editarCodorniz() {
    const codorniz: Codorniz = {
      fecha: this.form.value.fecha,
      cantidad_codornices: this.form.value.cantidad_codornices,
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
    this.galponService.updateCodorniz(this.id, codorniz).then(() => {
      this.loading = false;
      this.toastr.info('Datos actualizados satisfatoriamente', 'Operación completada');
      this.form.reset();
      this.boton_enviar = true;
    }, error => {
      this.loading = false;
      this.toastr.error('algo pasó',error);
    })
  }


  //Metodo para eliminar un galpon de codornices usando firestore database
  onDelete(id: string) {
    this.loading = true;
    this.galponService.eliminiarCodorniz(id).then(() => {
      this.loading = false;
      this.toastr.error('Galpón eliminado satisfatoriamente', 'Operación completada');
    }, error => {
      this.toastr.error('ocurrio un error', error);
    });
  }

 

  //Funcion que personaliza  y permite visualizar el modal
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