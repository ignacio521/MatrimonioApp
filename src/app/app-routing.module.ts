import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LugarBodaComponent } from './pages/lugar-boda/lugar-boda.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { NuestrosRegalosComponent } from './pages/nuestros-regalos/nuestros-regalos.component';
import { ConfirmacionBodaComponent } from './pages/confirmacion-boda/confirmacion-boda.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'lugar', component: LugarBodaComponent },
  { path: 'regalos', component: NuestrosRegalosComponent },
  { path: 'confirmacion', component: ConfirmacionBodaComponent },
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
