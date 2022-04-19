import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { LoginComponent } from './components/login/login.component';
import { GranjeroComponent } from './components/granjero/granjero.component';
import { IngresoComponent } from './components/granjero/ingreso/ingreso.component';
import { VehiculosComponent } from './components/granjero/vehiculos/vehiculos.component';
import { VisitantesComponent } from './components/granjero/visitantes/visitantes.component';
import { ClaveOlvidadaComponent } from './components/login/clave-olvidada/clave-olvidada.component';
import { BarraLateralComponent } from './components/elements/barra-lateral/barra-lateral.component';
import { VerificarCorreoComponent } from './components/login/verificar-correo/verificar-correo.component';
import { AdministracionComponent } from './components/administrador/administracion/administracion.component';
import { RegristrarUsuarioComponent } from './components/login/regristrar-usuario/regristrar-usuario.component';
import { ListaGalponesDePollosComponent } from './components/administrador/lista-galpones-de-pollos/lista-galpones-de-pollos.component';


// route guard
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['granjero']);

const routes: Routes = [
 
  // { path: '', component: AppComponent   },
 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
 
  { path: 'login', component:  LoginComponent ,
  ...canActivate(redirectLoggedInToHome) },
  // { path: 'granjero',
  { path: 'granjero', component: GranjeroComponent ,
  ...canActivate(redirectUnauthorizedToLogin),
    children:[
        { path: '', component:BarraLateralComponent  },
        { path: 'admin', component: AdministracionComponent },
        { path: 'ingreso', component: IngresoComponent },
        { path: 'vehiculos', component: VehiculosComponent },
        { path: 'visitantes', component: VisitantesComponent },
        { path: 'pollos', component: ListaGalponesDePollosComponent },


    ]},

  
 
  
   
  
  { path: 'registrar-usuario', component: RegristrarUsuarioComponent   },
  { path: 'verificar-correo', component: VerificarCorreoComponent   },
  { path: 'clave-olvidada', component: ClaveOlvidadaComponent   },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }