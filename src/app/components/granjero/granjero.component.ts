import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-granjero',
  templateUrl: './granjero.component.html',
  styleUrls: ['./granjero.component.css']
})
export class GranjeroComponent implements OnInit {
  constructor(
    public autenticacionService: AutenticacionService  ) { 
      this.loadScripts();
    }

  ngOnInit(): void {
  }

   
loadScripts() {
  const dynamicScripts = [
   'assets/js/script.js'
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
