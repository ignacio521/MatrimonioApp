import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { LugarBodaComponent } from './pages/lugar-boda/lugar-boda.component';
import { NuestrosRegalosComponent } from './pages/nuestros-regalos/nuestros-regalos.component';
import { ConfirmacionBodaComponent } from './pages/confirmacion-boda/confirmacion-boda.component';
import { CancionesSugeridasComponent } from './pages/canciones-sugeridas/canciones-sugeridas.component';
import { FotosInvitadosComponent } from './pages/fotos-invitados/fotos-invitados.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SobreNosotrosComponent,
    LugarBodaComponent,
    NuestrosRegalosComponent,
    ConfirmacionBodaComponent,
    CancionesSugeridasComponent,
    FotosInvitadosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
