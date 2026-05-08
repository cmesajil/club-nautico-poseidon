import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipRoutingModule } from './membership-routing-module';

// Importa tus componentes (asegúrate de que las rutas sean correctas)
import { PostularPage } from './pages/postular-page/postular-page';
import { PostularForm } from './components/postular-form/postular-form';

@NgModule({
  declarations: [
    // 1. Borra todo de aquí si son standalone
  ],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    // 2. Muévelos AQUÍ si tienen "standalone: true"
    PostularPage,
    PostularForm
  ],
})
export class MembershipModule { }