import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


//service
import { VisitanteService } from 'src/app/services/visitantes/visitante.service';

//clase
import { Vehiculo } from 'src/app/models/vehiculo';

@Component({
  selector: 'app-lista-vehiculos',
  templateUrl: './lista-vehiculos.component.html',
  styleUrls: ['./lista-vehiculos.component.css']
})
export class ListaVehiculosComponent implements OnInit {
  vehiculoList: Vehiculo[] = [];
  public page:number=0;

  constructor( private visitanteService: VisitanteService, 
               private toastr: ToastrService ) { }

  ngOnInit(): void {   
    this.visitanteService.getvehiculo()
    .snapshotChanges()
    .subscribe(item => {
    this.vehiculoList= [];
    item.forEach(element => {
    let x:any = element.payload.toJSON(); 
    x["$key"] = element.key;
    this.vehiculoList.push(x as Vehiculo) ;
    });
  });
}

onEdit(vehiculo: Vehiculo){
  this.visitanteService.selectedVehiculo = Object.assign({},vehiculo);
}

onDelete($key: string){
  this.visitanteService.deletevehiculo($key);
  this.toastr.success('Vehiculo eliminado satisfatoriamente', 'Operación completada');
}

}
