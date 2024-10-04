import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmprestimoService } from './../emprestimo.service';
import { LivroService } from './../livro.service';
import { CommonModule } from '@angular/common';
import { Emprestimo } from '../modelos/emprestimo';
import { Livro } from '../modelos/livro';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class EmprestimoComponent implements OnInit {
  emprestimoForm: FormGroup;
  livros: Livro[] = [];
  emprestimos: Emprestimo[] = [];

  constructor(
    private emprestimoService: EmprestimoService,
    private livroService: LivroService,
    private fb: FormBuilder
  ) {
    this.emprestimoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      isbn: ['', Validators.required],
      dataEmprestimo: ['', Validators.required],
      status: ['EMPRESTADO', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarLivros();
    this.listarEmprestimos();
  }

  listarLivros(): void {
    this.livroService.listarLivro().subscribe(
      (data) => {
        this.livros = data;
      },
      (error) => {
        console.error('Erro ao listar livros:', error);
      }
    );
  }

  listarEmprestimos(): void {
    this.emprestimoService.listarEmprestimo().subscribe(
      (data) => {
        console.log('Dados de empréstimos recebidos:', data);
        this.emprestimos = data;
      },
      (error) => {
        console.error('Erro ao listar empréstimos:', error);
      }
    );
  }  

  cadastrarEmprestimo(): void {
    if (this.emprestimoForm.valid) {
      this.emprestimoService.cadastrarEmprestimo(this.emprestimoForm.value).subscribe(
        (response) => {
          console.log('Empréstimo cadastrado:', response);
          this.listarEmprestimos();
          this.emprestimoForm.reset();
        },
        (error) => {
          console.error('Erro ao cadastrar empréstimo:', error);
        }
      );
    }
  }

  deletarEmprestimo(id: number): void {
    this.emprestimoService.deletarEmprestimo(id).subscribe(
      () => {
        console.log('Empréstimo deletado');
        this.listarEmprestimos();
      },
      (error) => {
        console.error('Erro ao deletar empréstimo:', error);
      }
    );
  }
}
