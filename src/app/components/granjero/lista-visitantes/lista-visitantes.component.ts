import { Component, OnInit } from '@angular/core';


//service
import { VisitanteService } from 'src/app/services/visitantes/visitante.service';
import { ToastrService } from 'ngx-toastr';

//Clase
import { Visitante } from 'src/app/models/visitante';

import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-lista-visitantes',
  templateUrl: './lista-visitantes.component.html',
  styleUrls: ['./lista-visitantes.component.css']
})

export class ListaVisitantesComponent implements OnInit {
  visitanteList: Visitante[] = [];
  public page:number=0;
  
  constructor( private visitanteService: VisitanteService, 
               private toastr: ToastrService ) { }

  ngOnInit(): void {   
    this.visitanteService.getvisitante()
    .snapshotChanges()
    .subscribe(item => {
    this.visitanteList= [];
    item.forEach(element => {
    let x:any = element.payload.toJSON();
    x["$key"] = element.key;
    this.visitanteList.push(x as Visitante) ;
    });
  });
}

onEdit(visitante: Visitante){
  this.visitanteService.selectedVisitante= Object.assign({},visitante);
}

onDelete($key: string){
  this.visitanteService.deleteVisitante($key);
  this.toastr.success('Visitante eliminado satisfatoriamente', 'Operación completada');
}

}
