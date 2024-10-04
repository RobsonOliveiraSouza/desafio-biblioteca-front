import { Usuario } from './usuario';
import { Livro } from './livro';

export interface Emprestimo {
  id: number;
  usuario: Usuario;
  livro: Livro;
  dataEmprestimo: Date;
  dataDevolucao?: Date;
  status: string;
}
