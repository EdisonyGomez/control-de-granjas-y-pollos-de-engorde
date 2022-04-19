import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-regristrar-usuario',
  templateUrl: './regristrar-usuario.component.html',
  styleUrls: ['./regristrar-usuario.component.css']
})
export class RegristrarUsuarioComponent implements OnInit {

  constructor(
    public autenticacionService: AutenticacionService
  ) { }
  ngOnInit(): void {
  }

}
