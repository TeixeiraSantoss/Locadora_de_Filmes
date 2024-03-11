import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from 'src/app/models/filme.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-disponiveis-filme',
  templateUrl: './disponiveis-filme.component.html',
  styleUrls: ['./disponiveis-filme.component.css']
})
export class DisponiveisFilmeComponent {
  filmes: Filme[] = []
  displayedColumns: string[] = ['filmeID','nome','classif_ind','ano_lanc','alugado',/*'genero,'*/'alugar','deletar','alterar'];

  
  constructor(private client: HttpClient,
    private router: Router){}

  ngOnInit(): void{
    this.client.get<Filme[]>
      ("https://localhost:7035/api/filme/listarDisponiveis")
      .subscribe({
        next: (filmes) =>{
          this.filmes = filmes
        },
        error: (erro) =>{
          console.log(erro)
        }
      })
  }
  
  deletar(filmeID: number){
    this.client.delete<Filme[]>
      (`https://localhost:7035/api/filme/deletar/${filmeID}`)
      .subscribe({
        next: (filmes) =>{
          this.filmes = filmes;         
          console.log("Filme deletado com sucesso") 
        },
        error: (erro) => {
          console.log(erro);
        }
      })
  }
}
