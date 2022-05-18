import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//service
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-regristrar-usuario',
  templateUrl: './regristrar-usuario.component.html',
  styleUrls: ['./regristrar-usuario.component.css']
})
export class RegristrarUsuarioComponent implements OnInit {

  loading = false;

  constructor(public authService: AutenticacionService,
              private toastr: ToastrService) {
    this.loadScripts();
  }

  ngOnInit(): void {
  }

//Metodo registrar usuario desde el servicio de autenricacnion
  registrarUsuario(email: string, password: string) {
    this.loading = true;
    this.authService.SignUp(email, password).then(() => {
      this.loading = false;

    }, error => {
      this.loading = false;
    })
  }

//Cargar Script externo
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
