import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//service
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-clave-olvidada',
  templateUrl: './clave-olvidada.component.html',
  styleUrls: ['./clave-olvidada.component.css']
})
export class ClaveOlvidadaComponent implements OnInit {

  loading = false;

  constructor(public authService: AutenticacionService,
              private toastr: ToastrService) {
  }
  ngOnInit(): void {
  }



  
  //Metodo registrar usuario desde el servicio de autenricacnion
  recuperarClave(passwordResetEmail: string) {
    this.loading = true;
    this.authService.ForgotPassword(passwordResetEmail).then(() => {
      this.loading = false;

    }, error => {
      this.loading = false;
    })
  }


}
