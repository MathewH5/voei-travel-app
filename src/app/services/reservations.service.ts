import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private readonly apiUrl = 'http://localhost:3000/reservas';

  constructor(private http: HttpClient) {}


  getByUser(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}?userId=${userId}`);
  }

    create(reserva: any): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reserva);
  }
  
  getById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
