import { Routes } from '@angular/router';
import { MinhasReservasComponent } from './pages/minhas-reservas/minhas-reservas';
import { VoucherComponent } from './pages/voucher/voucher';
import { ReservaFormComponent } from './pages/reserva-form/reserva-form';

export const routes: Routes = [
  { path: 'minhas-reservas', component: MinhasReservasComponent },
  { path: 'voucher/:id', component: VoucherComponent },
  { path: 'reservar/:tripId', component: ReservaFormComponent },

  { path: '', redirectTo: 'minhas-reservas', pathMatch: 'full' },
];
