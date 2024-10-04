import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LivroService } from './../livro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LivroComponent implements OnInit {
  livros: any[] = [];
  livroForm: FormGroup;

  constructor(private livroService: LivroService, private fb: FormBuilder) {
    this.livroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      isbn: ['', Validators.required],
      dataPublicacao: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarLivro();
  }

  listarLivro(): void {
    this.livroService.listarLivro().subscribe(
      (data) => {
        this.livros = data;
      },
      (error) => {
        console.error('Erro ao listar livros:', error);
      }
    );
  }

  cadastrarLivro(): void {
    if (this.livroForm.valid) {
      const livroData = this.livroForm.value;
  
      livroData.dataPublicacao = new Date(livroData.dataPublicacao).toISOString().split('T')[0];
  
      this.livroService.cadastrarLivro(livroData).subscribe(
        (response) => {
          console.log('Livro cadastrado:', response);
          this.listarLivro();
          this.livroForm.reset();
        },
        (error) => {
          console.error('Erro ao cadastrar livro:', error);
        }
      );
    }
  }
  
  deletarLivro(id: number): void {
    this.livroService.deletarLivro(id).subscribe(
      () => {
        console.log('Livro deletado');
        this.listarLivro();
      },
      (error) => {
        console.error('Erro ao deletar livro:', error);
      }
    );
  }
}
