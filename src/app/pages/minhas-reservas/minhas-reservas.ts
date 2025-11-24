import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../../services/reservations.service';
import { Reservation } from '../../models/reservation.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minhas-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minhas-reservas.html',   // <<< ATENÇÃO AQUI
  styleUrls: ['./minhas-reservas.css'],    // <<< E AQUI
})
export class MinhasReservasComponent implements OnInit {
  reservasProximas: Reservation[] = [];
  reservasAnteriores: Reservation[] = [];

  abaAtiva: 'proximas' | 'anteriores' = 'proximas';

  estaCarregando = true;
  erroCarregamento = '';

  userIdLogado = 1;

  constructor(private reservationsService: ReservationsService,
    private router: Router) { }

  ngOnInit(): void {
    this.carregarReservas();
  }

  private carregarReservas(): void {
    this.estaCarregando = true;
    this.erroCarregamento = '';

    this.reservationsService.getByUser(this.userIdLogado).subscribe({
      next: (reservas) => {
        const hoje = new Date();

        this.reservasProximas = reservas.filter((r) => {
          const fim = new Date(r.endDate);
          return fim >= hoje && r.status !== 'Cancelada';
        });

        this.reservasAnteriores = reservas.filter((r) => {
          const fim = new Date(r.endDate);
          return fim < hoje || r.status === 'Cancelada';
        });

        this.estaCarregando = false;
      },
      error: () => {
        this.erroCarregamento = 'Erro ao carregar reservas.';
        this.estaCarregando = false;
      },
    });
  }

  trocarAba(aba: 'proximas' | 'anteriores') {
    this.abaAtiva = aba;
  }

  onCancelarReserva(reserva: Reservation) {
    const confirmado = confirm(
      `Deseja realmente cancelar a reserva para ${reserva.destination}?`
    );
    if (!confirmado) return;

    this.reservationsService.delete(reserva.id).subscribe({
      next: () => this.carregarReservas(),
      error: () => alert('Erro ao cancelar a reserva.'),
    });
  }

  onVerVoucher(reserva: Reservation) {
    this.router.navigate(['/voucher', reserva.id]);
  }
}
