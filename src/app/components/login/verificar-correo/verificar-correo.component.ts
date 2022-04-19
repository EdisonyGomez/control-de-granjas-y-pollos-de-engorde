import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent implements OnInit {

  constructor(
    public authService: AutenticacionService) { }
  ngOnInit(): void {
  }

}
