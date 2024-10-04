import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) {}

  listarUsuario(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, usuario);
  }

  deletarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
