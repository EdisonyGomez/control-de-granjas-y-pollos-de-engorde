import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';


//service
import { GalponService } from './../../../services/galpones/galpon.service';

//clase
import { Pollo } from './../../../models/pollo';

@Component({
  selector: 'app-lista-galpones-de-pollos',
  templateUrl: './lista-galpones-de-pollos.component.html',
  styleUrls: ['./lista-galpones-de-pollos.component.css']
})
export class ListaGalponesDePollosComponent implements OnInit {
  polloList: Pollo[] = [];
  public page:number=0;

  constructor(private galponService: GalponService, 
              private toastr: ToastrService) { }
          
  ngOnInit(): void {   
    this.galponService.getpollo()
    .snapshotChanges()
    .subscribe(item => {
    this.polloList= [];
    item.forEach(element => {
    let x:any = element.payload.toJSON(); 
    x["$key"] = element.key;
    this.polloList.push(x as Pollo) ;
    });
  });
}


onEdit(pollo: Pollo){
  this.galponService.selectedPollo = Object.assign({},pollo);
}

onDelete($key: string){
  this.galponService.deletepollo($key);
  this.toastr.success('Galpón eliminado satisfatoriamente', 'Operación completada');
}


}
 