import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserData, Usuario, UsuariosPageable } from './interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  BASE_URL: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  findAll(page: number, limit: number): Observable<UsuariosPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<UsuariosPageable>(`${this.BASE_URL}/usuarios`, {params});
  }

  paginateByUser(page: number, size: number, username: string): Observable<UserData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('nombre', username);

    return this.http.get(`${this.BASE_URL}/usuarios`, {params}).pipe(
      map((userData: any,  UserData) => userData),
      catchError(err => throwError(err))
    )
  }
  
  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.BASE_URL}/usuarios`);
  }

  getUsuario(id: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.BASE_URL}/usuarios/${id}`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.BASE_URL}/usuarios/create`, usuario);
  }

  deleteUsuaroio(id: string): Observable<Usuario> {
    console.log(id);
    return this.http.delete<Usuario>(`${this.BASE_URL}/usuarios/delete?usarioID=${id}`);
  }

  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.BASE_URL}/usuarios/update?usuarioID=${id}`, usuario);
  }

}
