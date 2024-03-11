import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Genero } from 'src/app/models/genero.model';

@Component({
  selector: 'app-cadastrar-genero',
  templateUrl: './cadastrar-genero.component.html',
  styleUrls: ['./cadastrar-genero.component.css']
})
export class CadastrarGeneroComponent {

  generos: Genero[] = [];
  //variaveis que vão receber os dados do FRONT
  generoNome: string = "";

  ultimoId: string = "";

  //"client" variavel para poder fazer as requisições para a "API"
  //"router" para acessar as rotas
  constructor(private client: HttpClient,
    private router: Router){
    }

    ngOnInit(): void{
      this.client.get<Genero[]>
        ("https://localhost:7035/api/genero/listar")
        .subscribe({
          next: (generos) =>{
            this.generos = generos          
        
        if(generos.length > 0){
          //obtendo o ultimo usuario da lista
          const ultimoGenero: Genero = generos[generos.length - 1]

          if(ultimoGenero.generoID !== undefined){
            this.ultimoId = (ultimoGenero.generoID += 1).toString()
            console.log("Ultimo generoId: ", this.ultimoId)
          } else{
            console.log("O ultimo usuario da lista não possui generoId")
          }
        } else{
          console.log("Lista de generos vazia")
        }
          },
          error: (erro) =>{
            console.log(erro)
          }
        });
      }

  //Função "cadastrar"
  cadastrar(): void{
    let genero: Genero ={
      generoID: Number.parseInt(this.ultimoId),
      generoNome: this.generoNome
    }
  
  //Fazendo requisição para a "API"
  this.client.post<Genero>
    ("https://localhost:7035/api/genero/cadastrar", genero)
    .subscribe({
      next: (filme) =>{
        this.router.navigate(['pages/genero/listar'])
      },
      error: (erro) =>{
        console.log(erro);
      }
    })
  }

}
