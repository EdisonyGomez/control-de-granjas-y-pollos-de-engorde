import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-clave-olvidada',
  templateUrl: './clave-olvidada.component.html',
  styleUrls: ['./clave-olvidada.component.css']
})
export class ClaveOlvidadaComponent implements OnInit {

  constructor(
    public authService: AutenticacionService  ) { }
  ngOnInit(): void {
  }

}
