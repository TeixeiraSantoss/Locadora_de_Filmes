import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent {

  usuarios: Usuario[] = [];

  cpf: string = "";
  nome: string = "";
  idade: string = "";

  ultimocpf: string = "";

  constructor(private client: HttpClient,
    private router: Router){
    }    

    ngOnInit(): void{
      this.client.get<Usuario[]>
        ("https://localhost:7035/api/usuario/listar")
        .subscribe({
          next: (usuarios) =>{
            this.usuarios = usuarios          

            if(usuarios.length > 0){
              //obtendo o ultimo usuario da lista
              const ultimoUsuario: Usuario = usuarios[usuarios.length - 1]

              if(ultimoUsuario.cpf !== undefined){
                this.ultimocpf = (ultimoUsuario.cpf += 1).toString();
                console.log("Ultimo cpf: ", this.ultimocpf)
              } else{
                console.log("O ultimo usuario da lista não possui CPF")
              }
            } else{
              console.log("Lista de usuarios vazia")
            }
          },
          error: (erro) =>{
            console.log(erro)
          }
        });
    }

    cadastrar(): void{
      let usuario: Usuario = {
        cpf: Number.parseInt(this.ultimocpf),
        nome: this.nome,
        idade: Number.parseInt(this.idade)
      }

      this.client.post<Usuario>
        ("https://localhost:7035/api/usuario/cadastrar", usuario)
        .subscribe({
          next: (usuario) =>{
            this.router.navigate(['pages/usuario/listar'])
          },
          error: (erro) =>{
            console.log(erro)
          }
        })
    }

}
