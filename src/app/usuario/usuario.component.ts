import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from './../usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  
})
export class UsuarioComponent implements OnInit {
  usuario: any[] = [];
  usuarioForm: FormGroup;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarUsuario();
  }

  listarUsuario(): void {
    this.usuarioService.listarUsuario().subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        console.error('Erro ao listar usuário:', error);
      }
    );
  }

  cadastrarUsuario(): void {
    if (this.usuarioForm.valid) {
      this.usuarioService.cadastrarUsuario(this.usuarioForm.value).subscribe(
        (response) => {
          console.log('Usuário cadastrado:', response);
          this.listarUsuario();
          this.usuarioForm.reset();
        },
        (error) => {
          console.error('Erro ao cadastrar usuário:', error);
        }
      );
    }
  }

  deletarUsuario(id: number): void {
    this.usuarioService.deletarUsuario(id).subscribe(
      () => {
        console.log('Usuário deletado');
        this.listarUsuario();
      },
      (error) => {
        console.error('Erro ao deletar usuário:', error);
      }
    );
  }
}
