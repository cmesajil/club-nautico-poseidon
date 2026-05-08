import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostularPage } from './pages/postular-page/postular-page';

const routes: Routes = [
  {
    path: 'postular', // La ruta completa será: /membership/postular
    component: PostularPage
  },
  // {
  //   path: 'estado/:id', // Por ejemplo, para ver cómo va su trámite
  //   component: EstadoSolicitudComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembershipRoutingModule {

}
