import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//clase
import { Granjero } from 'src/app/models/granjero';
import { Visitante } from 'src/app/models/visitante';

//service
import { VisitanteService } from 'src/app/services/visitantes/visitante.service';

@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.css']
})
export class VisitantesComponent implements OnInit {

  constructor(public visitanteService:VisitanteService) { }

  ngOnInit(): void {
    this.visitanteService.getvisitante();
    this.resetForm() ;
  }

  onSubmit(visitanteForm: NgForm): void {
    if(visitanteForm.value.$key == ""){
      this.visitanteService.insertvisitante(visitanteForm.value)
    }else{
     this.visitanteService.updatevisitante(visitanteForm.value) ;
     this.resetForm(visitanteForm) ;
    }
  }

  resetForm(visitanteForm?: NgForm){
    if (visitanteForm != null)
    visitanteForm.reset ();
    this.visitanteService.selectedVisitante = new Visitante();
}

  

}
