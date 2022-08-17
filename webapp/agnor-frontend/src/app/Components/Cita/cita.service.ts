import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Cita, CitaData, CitasPageable } from './interface/cita.interface';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  BASE_URL: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  findAll(page: number, limit: number): Observable<CitasPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<CitasPageable>(`${this.BASE_URL}/citas`, { params });
  }

  paginateByTitulo(page: number, size: number, titulo: string): Observable<CitaData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('titulo', titulo);
    titulo
    return this.http.get(`${this.BASE_URL}/citas`, { params }).pipe(
      map((citaData: any, CitaData) => citaData),
      catchError(err => throwError(err))
    )
  }

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.BASE_URL}/citas`);
  }

  getCita(id: string): Observable<Cita> {
    return this.http.get<Cita>(`${this.BASE_URL}/citas/${id}`);
  }

  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.BASE_URL}/citas/create`, cita);
  }

  deleteCita(id: number) {
    return this.http.delete<Cita>(`${this.BASE_URL}/citas/${id}/delete`);
  }

  updateCita(cita: Cita){
    return this.http.put<Cita>(`${this.BASE_URL}/citas/${cita.id}/update`, cita);
  }

}
