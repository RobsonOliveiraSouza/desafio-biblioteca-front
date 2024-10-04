import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo } from './modelos/emprestimo';

@Injectable({
  providedIn: 'root',
})
export class EmprestimoService {
  private apiUrl = 'http://localhost:8080/emprestimo';

  constructor(private http: HttpClient) {}

  listarEmprestimo(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.apiUrl);
  }

  cadastrarEmprestimo(emprestimo: Emprestimo): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(this.apiUrl, emprestimo);
  }

  deletarEmprestimo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
