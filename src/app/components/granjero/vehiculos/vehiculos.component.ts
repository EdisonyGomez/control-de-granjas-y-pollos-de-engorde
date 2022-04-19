import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VisitanteService } from 'src/app/services/visitantes/visitante.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
 
  constructor(public visitanteService:VisitanteService) { }

  ngOnInit(): void {
    this.visitanteService.getvehiculo();
    this.resetForm() ;
  }

  onSubmit(vehiculoForm: NgForm): void {
    if(vehiculoForm.value.$key == ""){
      this.visitanteService.insertvehiculo(vehiculoForm.value)
    }else{
     this.visitanteService.updatevehiculo(vehiculoForm.value) ;
     this.resetForm(vehiculoForm) ;
    }
  }

  resetForm(vehiculoForm?: NgForm){
    if (vehiculoForm != null)
    vehiculoForm.reset ();
    this.visitanteService.selectedVehiculo = new Vehiculo();
}

}
