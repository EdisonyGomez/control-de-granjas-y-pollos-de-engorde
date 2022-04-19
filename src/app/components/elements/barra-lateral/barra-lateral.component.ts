import { DOCUMENT } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';
// declare const main : any;
@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent implements OnInit { 

 


  constructor(public autenticacionService: AutenticacionService) {
    this.loadScripts();
   }

   
public ngOnInit() {
   
}

loadScripts() {
  const dynamicScripts = [
   'assets/js/script2.js'
  ];
  for (let i = 0; i < dynamicScripts.length; i++) {
    const node = document.createElement('script');
    node.src = dynamicScripts[i];
    node.type = 'text/javascript';
    node.async = false;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}

}
