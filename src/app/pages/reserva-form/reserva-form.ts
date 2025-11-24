import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reserva-form.html',
  styleUrls: ['./reserva-form.css'],
})
export class ReservaFormComponent implements OnInit {
  tripId!: number;

  viagem: any = null; 
  estaCarregandoViagem = true;
  erroViagem = '';

  dataInicio = '';
  dataFim = '';
  viajantes = 1;

  enviandoReserva = false;
  erroReserva = '';
  mensagemSucesso = '';

  userIdLogado = 1;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private reservationsService: ReservationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('tripId');
    this.tripId = Number(idParam);

    if (!this.tripId) {
      this.erroViagem = 'Viagem não encontrada.';
      this.estaCarregandoViagem = false;
      return;
    }

    this.buscarViagem();
  }

  private buscarViagem(): void {
    this.estaCarregandoViagem = true;
    this.erroViagem = '';

    this.http
      .get<any>(`http://localhost:3000/viagens/${this.tripId}`)
      .subscribe({
        next: (viagem) => {
          this.viagem = viagem;
          this.estaCarregandoViagem = false;
        },
        error: () => {
          this.erroViagem = 'Erro ao carregar dados da viagem.';
          this.estaCarregandoViagem = false;
        },
      });
  }

  get precoTotal(): number {
    if (!this.viagem) return 0;
    return (this.viagem.precoPorPessoa || 0) * this.viajantes;
  }

  onSubmit(): void {
    this.erroReserva = '';
    this.mensagemSucesso = '';

    if (!this.dataInicio || !this.dataFim) {
      this.erroReserva = 'Informe as datas de ida e volta.';
      return;
    }

    const inicio = new Date(this.dataInicio);
    const fim = new Date(this.dataFim);

    if (fim < inicio) {
      this.erroReserva = 'A data de volta deve ser após a data de ida.';
      return;
    }

    if (this.viajantes < 1) {
      this.erroReserva = 'Informe pelo menos 1 viajante.';
      return;
    }

    if (!this.viagem) {
      this.erroReserva = 'Viagem não encontrada.';
      return;
    }

    const novaReserva: any = {
      tripId: this.tripId,
      destination: this.viagem.titulo,
      country: this.viagem.pais,
      imageUrl: this.viagem.imagemUrl,
      startDate: this.dataInicio,
      endDate: this.dataFim,
      travelers: this.viajantes,
      totalPrice: this.precoTotal,
      status: 'Confirmada',
      userId: this.userIdLogado,
      createdAt: new Date().toISOString(),
    };

    this.enviandoReserva = true;

    this.reservationsService.create(novaReserva).subscribe({
      next: () => {
        this.enviandoReserva = false;
        this.mensagemSucesso = 'Reserva realizada com sucesso!';

        setTimeout(() => {
          this.router.navigate(['/minhas-reservas']);
        }, 1000);
      },
      error: () => {
        this.enviandoReserva = false;
        this.erroReserva = 'Erro ao salvar a reserva. Tente novamente.';
      },
    });
  }
}
