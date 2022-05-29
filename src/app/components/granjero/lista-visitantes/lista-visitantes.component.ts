import { Component, OnInit } from '@angular/core';


//service
import { VisitanteService } from 'src/app/services/visitantes/visitante.service';
import { ToastrService } from 'ngx-toastr';

//Clase
import { Visitante } from 'src/app/models/visitante';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-lista-visitantes',
  templateUrl: './lista-visitantes.component.html',
  styleUrls: ['./lista-visitantes.component.css']
})

export class ListaVisitantesComponent implements OnInit {
  visitanteList: Visitante[] = [];
  public page: number = 0;
  loading = false; 
  form: FormGroup;
  id: string;
  constructor(private visitanteService: VisitanteService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showVisitantes();
   
  }

 
  
  //Función para listar los gapones con firestore database
  showVisitantes() {
    this.visitanteService.getvisitante().subscribe(doc => {
      this.visitanteList = [];
      doc.forEach((element: any) => {
        this.visitanteList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      })
    })
  }

   //Función para editar un galpon de codornices usando firestore database
   onEdit(visitante: Visitante) {
    this.visitanteService.addVisitanteEdit(visitante);
  }
  


  //Metodo para eliminar un galpon de codornices usando firestore database
  onDelete(id: string) {
    this.loading = true;
    this.visitanteService.eliminiarVisitante(id).then(() => {
      this.loading = false;
      this.toastr.success('Registro eliminado satisfatoriamente', 'Operación completada');
    }, error => {
      this.toastr.error('ocurrio un error', error);
    });
  }


}
