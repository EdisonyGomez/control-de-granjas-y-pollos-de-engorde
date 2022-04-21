import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


//firebase
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';

//components
import { GranjeroComponent } from './components/granjero/granjero.component';
import { VisitantesComponent } from './components/granjero/visitantes/visitantes.component';
import { BarraLateralComponent } from './components/elements/barra-lateral/barra-lateral.component';
import { ListaVisitantesComponent } from './components/granjero/lista-visitantes/lista-visitantes.component';


//services
import { GranjeroService } from './services/granjero.service';
import { VisitanteService } from './services/visitantes/visitante.service';
import { GalponService } from 'src/app/services/galpones/galpon.service';


import { NavBarPrincipalComponent } from './components/elements/nav-bar-principal/nav-bar-principal.component';
import { VehiculosComponent } from './components/granjero/vehiculos/vehiculos.component';
import { ListaVehiculosComponent } from './components/granjero/lista-vehiculos/lista-vehiculos.component';

import { LoginComponent } from './components/login/login.component';
import { ClaveOlvidadaComponent } from './components/login/clave-olvidada/clave-olvidada.component';
import { VerificarCorreoComponent } from './components/login/verificar-correo/verificar-correo.component';
import { RegristrarUsuarioComponent } from './components/login/regristrar-usuario/regristrar-usuario.component';
import { AutenticacionService } from './services/autenticacion/autenticacion.service';
import { IngresoComponent } from './components/granjero/ingreso/ingreso.component';
import { AdministracionComponent } from './components/administrador/administracion/administracion.component';
import { ListaGalponesDePollosComponent } from './components/administrador/lista-galpones-de-pollos/lista-galpones-de-pollos.component';



@NgModule({
  declarations: [
    AppComponent,
    GranjeroComponent,
    NavBarPrincipalComponent,
    BarraLateralComponent,
    VisitantesComponent,
    ListaVisitantesComponent,
    VehiculosComponent,
    ListaVehiculosComponent,
    LoginComponent,
    ClaveOlvidadaComponent,
    VerificarCorreoComponent,
    RegristrarUsuarioComponent,
    IngresoComponent,
    AdministracionComponent,
    ListaGalponesDePollosComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,   
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    
    // ToastrModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

         provideFirebaseApp(() => initializeApp(environment.firebase)),
         provideAuth(() => getAuth()),
         provideDatabase(() => getDatabase())
    
  ],
  providers: [    
    AngularFireDatabase,
    GranjeroService,
    VisitanteService,
    AutenticacionService,
    GalponService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
