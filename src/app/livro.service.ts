import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private baseUrl = 'http://localhost:8080/livro';

  constructor(private http: HttpClient) {}

  listarLivro(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  cadastrarLivro(livro: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, livro);
  }

  deletarLivro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
