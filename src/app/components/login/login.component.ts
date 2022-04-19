import { Component, OnInit } from '@angular/core';

//service
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AutenticacionService ) { 
    this.loadScripts();
  }

  ngOnInit(): void {
  }

  loadScripts() {
    const dynamicScripts = [
     'assets/js/login.js'
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
