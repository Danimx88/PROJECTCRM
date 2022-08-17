import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Cliente, ClienteData, ClientesPageable } from './interface/cliente.interface';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  BASE_URL: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  findAll(page: number, limit: number): Observable<ClientesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<ClientesPageable>(`${this.BASE_URL}/clientes`, {params});
  }

  findAllC(page: number, size: number, grupo: number): Observable<ClienteData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('grupo', grupo);

    return this.http.get(`${this.BASE_URL}/clientes/coordinador`, {params}).pipe(
      map((clienteData: any,  ClienteData) => clienteData),
      catchError(err => throwError(err))
    )
  }

  findAllA(page: number, size: number, asignadoa: string): Observable<ClienteData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('asignadoa', asignadoa);

    return this.http.get(`${this.BASE_URL}/clientes/asesor`, {params}).pipe(
      map((clienteData: any,  ClienteData) => clienteData),
      catchError(err => throwError(err))
    )
  }
  

  paginateByName(page: number, size: number, nombre: string): Observable<ClienteData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('nombre', nombre);

    return this.http.get(`${this.BASE_URL}/clientes`, {params}).pipe(
      map((clienteData: any,  ClienteData) => clienteData),
      catchError(err => throwError(err))
    )
  }

  paginateByNameCo(page: number, size: number, nombre: string, grupo: number): Observable<ClienteData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('nombre', nombre);
    params = params.append('grupo', grupo);

    return this.http.get(`${this.BASE_URL}/clientes/coordinador`, {params}).pipe(
      map((clienteData: any,  ClienteData) => clienteData),
      catchError(err => throwError(err))
    )
  }

  paginateByNameAs(page: number, size: number, nombre: string, asignadoa: string): Observable<ClienteData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('nombre', nombre);
    params = params.append('asignadoa', asignadoa);

    return this.http.get(`${this.BASE_URL}/clientes/asesor`, {params}).pipe(
      map((clienteData: any,  ClienteData) => clienteData),
      catchError(err => throwError(err))
    )
  }
  
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.BASE_URL}/clientes/all`);
  }

  getCliente(id: string): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.BASE_URL}/clientes/${id}`);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.BASE_URL}/clientes/create`, cliente);
  }

  deleteCliente(id: number) {
   
    return this.http.delete(`${this.BASE_URL}/clientes/${id}/delete`);
  }

  updateCliente(cliente: Cliente) {

    return this.http.put<Cliente>(`${this.BASE_URL}/clientes/${cliente.id}/update`, cliente);
  }

}
