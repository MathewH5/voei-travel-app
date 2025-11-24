import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReservationsService } from '../../services/reservations.service';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './voucher.html',
  styleUrls: ['./voucher.css'],
})
export class VoucherComponent implements OnInit {
  reserva?: Reservation;
  estaCarregando = true;
  erroCarregamento = '';

  constructor(
    private route: ActivatedRoute,
    private reservationsService: ReservationsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.erroCarregamento = 'Reserva não encontrada.';
      this.estaCarregando = false;
      return;
    }

    this.reservationsService.getById(id).subscribe({
      next: (reserva) => {
        this.reserva = reserva;
        this.estaCarregando = false;
      },
      error: () => {
        this.erroCarregamento = 'Erro ao carregar dados da reserva.';
        this.estaCarregando = false;
      },
    });
  }
}
